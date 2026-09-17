#!/usr/bin/env node
/* eslint-env node */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const dist = 'dist'
const rows = []
let longT = 0, shortD = 0, longD = 0, ok = 0

const files = []
const walk = (d) => { for (const f of readdirSync(d, { withFileTypes: true })) { const p = join(d, f.name); f.isDirectory() ? walk(p) : f.name.endsWith('.html') && files.push(p) } }
walk(dist)

for (const fp of files) {
  const src = readFileSync(fp, 'utf8')
  const tm = src.match(/<title>([^<]+)<\/title>/)
  const dm = src.match(/<meta name="description" content="([^"]*)"/)
  if (!tm || !dm) continue
  const rel = fp.replace('dist/', '').replace('.html', '')
  const t = tm[1].length, d = dm[1].length
  const cat = rel.startsWith('tools/') ? 'tool' : rel.startsWith('blogs/') ? 'blog' : rel.startsWith('category/') ? 'cat' : rel.startsWith('evm-tools/') ? 'evm' : rel.startsWith('dev-tools/') ? 'dev' : 'static'
  if (t > 60) { longT++; rows.push([rel, cat, t, d, 'TITLE>' + t]) }
  else if (d > 155) { longD++; rows.push([rel, cat, t, d, 'DESC>' + d]) }
  else if (d < 120) { shortD++; rows.push([rel, cat, t, d, 'DESC<' + d]) }
  else ok++
}
console.log(`total pages: ${rows.length + ok} | ok: ${ok} | title>60: ${longT} | desc>155: ${longD} | desc<120: ${shortD}`)
const byCat = {}
for (const [, cat] of rows) byCat[cat] = (byCat[cat] || 0) + 1
console.log('violations by category:', JSON.stringify(byCat))
console.log('\n=== first 15 violations ===')
rows.slice(0, 15).forEach(([rel, , t, d, why]) => console.log(`  ${why.padEnd(10)} ${rel.slice(0, 55)} (t=${t}, d=${d})`))
