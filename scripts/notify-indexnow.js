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
// endpoint list defined below as ENDPOINTS

// Locate the committed key file: public/<32-hex>.txt
function findKey() {
  const dir = resolve(process.cwd(), 'public')
  const match = readdirSync(dir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  if (!match) throw new Error('IndexNow key file (public/<32-hex>.txt) not found')
  return { key: match.replace('.txt', ''), keyFile: match }
}

async function loadUrls() {
  const sources = ['dist/sitemap.xml', 'public/sitemap.xml']
  for (const src of sources) {
    const local = resolve(process.cwd(), src)
    if (existsSync(local)) {
      const body = readFileSync(local, 'utf8')
      const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      if (urls.length) return { urls, from: src }
    }
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

const ENDPOINTS = [
  'https://yandex.com/indexnow',
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
]

async function submitBatch(batch, key, attempt = 1) {
  // Try each endpoint; succeed if any accepts
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: HOST,
          key,
          keyLocation: `https://${HOST}/${key}.txt`,
          urlList: batch
        }),
        signal: AbortSignal.timeout(20000)
      })
      if (res.status === 200 || res.status === 202) {
        return res.status
      }
      if (res.status === 429 && attempt <= 5) {
        const wait = Number(res.headers.get('retry-after') || 2 ** attempt)
        console.warn(`429 from ${endpoint} - retrying in ${wait}s`)
        await new Promise((r) => setTimeout(r, wait * 1000))
        return submitBatch(batch, key, attempt + 1)
      }
      console.warn(`${endpoint}: ${res.status}`)
    } catch (err) {
      console.warn(`${endpoint}: ${err.message}`)
    }
  }
  return 0
}

async function main() {
  const { key, keyFile } = findKey()
  const { urls, from } = await loadUrls()
  console.log(`IndexNow: ${urls.length} URLs (${from}), key ${keyFile}`)
  const batches = []
  for (let i = 0; i < urls.length; i += 1000) batches.push(urls.slice(i, i + 1000))
  for (const [i, batch] of batches.entries()) {
    const status = await submitBatch(batch, key)
    // 200 OK / 202 Accepted are the only successes
    if (status === 200 || status === 202) {
      console.log(`batch ${i + 1}/${batches.length}: ${status} OK`)
      continue
    }
    if (status === 422) {
      console.error(`key file unreachable: https://${HOST}/${key}.txt must return 200 with the key as body`)
    } else if (status === 403) {
      console.error(
        `403 Forbidden: IndexNow could not validate the key. The key file is correct - ` +
        `this is almost always a WAF/CDN (Cloudflare) bot-protection rule blocking ` +
        `IndexNow's validation crawler from fetching the key file. Allow bots to ` +
        `fetch /*.txt or disable AI-bot blocking for this host.`
      )
    } else {
      console.error(`unexpected IndexNow response: ${status}`)
    }
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('IndexNow ping failed:', e.message)
  process.exit(1)
})
