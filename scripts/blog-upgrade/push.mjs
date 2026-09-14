#!/usr/bin/env node
/* eslint-env node */
/**
 * Push deepened content for the previously thin blog posts to Strapi.
 * Reads STRAPI_TOKEN from the environment (.env is not auto-loaded —
 * run with: node --env-file=../../.env scripts/blog-upgrade/push.mjs
 * or export STRAPI_TOKEN first). Verifies each write by reading back.
 */
import { part1 } from './part1.mjs'
import { part2 } from './part2.mjs'
import { part3 } from './part3.mjs'

const STRAPI_URL = 'https://cms.formatho.com'
const TOKEN = process.env.STRAPI_TOKEN
if (!TOKEN) {
  console.error('STRAPI_TOKEN not set')
  process.exit(1)
}

const overrides = { ...part1, ...part2, ...part3 }
const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` }

function words(html) {
  return String(html).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
}

async function main() {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?pagination[pageSize]=200&fields[0]=slug&fields[1]=documentId`,
    { headers, signal: AbortSignal.timeout(30000) }
  )
  const { data } = await res.json()
  const bySlug = new Map(data.map((p) => [p.slug, p.documentId]))

  let ok = 0
  for (const [slug, content] of Object.entries(overrides)) {
    const documentId = bySlug.get(slug)
    if (!documentId) { console.log(`  ✗ ${slug}: no CMS entry`); continue }
    const put = await fetch(`${STRAPI_URL}/api/blog-posts/${documentId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { content } }),
      signal: AbortSignal.timeout(30000)
    })
    if (!put.ok) {
      console.log(`  ✗ ${slug}: HTTP ${put.status} ${(await put.text()).slice(0, 120)}`)
      continue
    }
    console.log(`  ✓ ${slug}: ${words(content)} words`)
    ok++
  }
  console.log(`\n${ok}/${Object.keys(overrides).length} posts updated`)
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
