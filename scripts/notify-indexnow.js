#!/usr/bin/env node
/* eslint-env node */
/**
 * Pings IndexNow (Bing, DuckDuckGo, Yandex and other IndexNow partners)
 * with every URL in the sitemap so content changes are indexed near-
 * instantly instead of waiting for organic recrawl.
 *
 * Usage: node scripts/notify-indexnow.js
 * - Key: the committed public/<32-hex>.txt key file (required by the
 *   protocol to be served at https://host/<key>.txt)
 * - URLs: dist/sitemap.xml when present (build context), else fetched
 *   from the live sitemap
 * - Batches of 1000 (API limit), 429 handled with Retry-After backoff
 */
import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve } from 'path'

const HOST = 'formatho.com'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

// Locate the committed key file: public/<32-hex>.txt
function findKey() {
  const dir = resolve(process.cwd(), 'public')
  const match = readdirSync(dir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  if (!match) throw new Error('IndexNow key file (public/<32-hex>.txt) not found')
  return { key: match.replace('.txt', ''), keyFile: match }
}

async function loadUrls() {
  const local = resolve(process.cwd(), 'dist', 'sitemap.xml')
  if (existsSync(local)) {
    const source = readFileSync(local, 'utf8')
    return { urls: [...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]), from: 'dist/sitemap.xml' }
  }
  // CI deploy job runs on a fresh runner with no dist/ - use the live sitemap
  // (the deploy just shipped it)
  // Cloudflare blocks default fetch UAs on this zone - send a browser UA
  const res = await fetch(`https://${HOST}/sitemap.xml`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Formatho-Deploy/1.0)' },
    signal: AbortSignal.timeout(20000)
  })
  if (!res.ok) throw new Error(`live sitemap fetch failed: ${res.status}`)
  const source = await res.text()
  return { urls: [...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]), from: 'live sitemap' }
}

async function submitBatch(batch, key, attempt = 1) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${key}.txt`,
      urlList: batch
    })
  })
  if (res.status === 429 && attempt <= 5) {
    const wait = Number(res.headers.get('retry-after') || 2 ** attempt)
    console.warn(`429 - retrying in ${wait}s (attempt ${attempt})`)
    await new Promise((r) => setTimeout(r, wait * 1000))
    return submitBatch(batch, key, attempt + 1)
  }
  return res.status
}

async function main() {
  const { key, keyFile } = findKey()
  const { urls, from } = await loadUrls()
  console.log(`IndexNow: ${urls.length} URLs (${from}), key ${keyFile}`)
  const batches = []
  for (let i = 0; i < urls.length; i += 1000) batches.push(urls.slice(i, i + 1000))
  for (const [i, batch] of batches.entries()) {
    const status = await submitBatch(batch, key)
    // 200 OK, 202 Accepted are successes; 422 = key file unreachable
    const ok = status === 200 || status === 202
    console.log(`batch ${i + 1}/${batches.length}: ${status} ${ok ? 'OK' : 'CHECK KEY FILE'}`)
    if (!ok && status === 422) {
      console.error(`key file unreachable: https://${HOST}/${key}.txt must return 200 with the key as body`)
      process.exit(1)
    }
  }
}

main().catch((e) => {
  console.error('IndexNow ping failed:', e.message)
  process.exit(1)
})
