#!/usr/bin/env node
/* eslint-env node */
/**
 * Generates public/llms.txt - the llms.ai convention for AI assistants:
 * a plain-text map of the site's content so LLMs can discover and cite it.
 * Runs as part of the build, before vite-ssg.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE = 'https://formatho.com'

const CATEGORY_BLURBS = {
  Blockchain: 'Web3 and blockchain tools: Keccak-256 hashing, ABI encoding, EVM unit conversion, vanity address generation, and chain readers for EVM, Solana, Polkadot, Cardano, and Cosmos.',
  'Crypto & Security': 'Hashing (Argon2id, bcrypt, SHA), encryption, RSA keys, password analysis - all client-side.',
  Converters: 'Data format converters: JSON, YAML, TOML, XML, CSV, Base64, timestamps, and case conversions.',
  'Web & Network': 'JWT decoding, URL encoding, user-agent parsing, HTTP references.',
  'Images & Media': 'Image compression, QR code generation, camera recording.',
  Development: 'SQL formatting and schema tools, Git and regex references, Docker conversions.',
  'Network Tools': 'IPv4 subnetting, MAC address tools, IPv6 ULA generation.',
  'Math & Calculators': 'Percentage, ETA, and math expression evaluation.',
  'Text Tools': 'Case conversion, text statistics, ASCII art, placeholder text.',
  'Data Validation': 'Phone number parsing, IBAN validation, email normalization.',
  'Artificial Intelligence': 'LLM token counting, agent identity generation, Mermaid diagram viewing.'
}

const router = readFileSync(resolve(process.cwd(), 'src', 'data', 'tools.ts'), 'utf8')
const itemRe = /\{ name: '([^']+)', description: '((?:[^'\\]|\\.)*)', route: '(\/tools\/[^']+)', iconName: '[^']+' \}/g
const catRe = /category: '([^']+)',[^\]]*?items: \[/g

const categories = []
const catMatches = [...router.matchAll(catRe)]
let cursor = 0
for (const cm of catMatches) {
  const start = cm.index + cm[0].length
  const end = catMatches[cursor + 1] ? catMatches[cursor + 1].index : router.length
  const section = router.slice(start, end)
  const items = [...section.matchAll(itemRe)].map((m) => ({
    name: m[1],
    desc: m[2].replace(/\\'/g, "'"),
    route: m[3]
  }))
  if (items.length) categories.push({ name: cm[1], items })
  cursor++
}

const lines = []
lines.push('# Formatho')
lines.push('')
lines.push('> Privacy-first developer tools that run 100% client-side in your browser. Free forever, no sign-up, zero tracking. Nothing you enter is uploaded, logged, or stored.')
lines.push('')
lines.push('Every tool page states what the tool does, how to use it step by step, and answers common questions. Free, private, runs in your browser.')
lines.push('')
lines.push('## Tools')
for (const cat of categories) {
  lines.push('')
  lines.push(`### ${cat.name}`)
  lines.push(CATEGORY_BLURBS[cat.name] || '')
  for (const item of cat.items) {
    lines.push(`- [${item.name}]: ${BASE}${item.route} — ${item.desc}`)
  }
}
lines.push('')
lines.push('## Developer Stack Tools')
lines.push('Persona-specific tool pages:')
const stackDescriptions = {
  'owasp': 'OWASP-aligned security tools — headers analyzer, CSP generator, CORS tester, cookie analyzer',
  'soc2': 'Open-source SOC 2 compliance tools — readiness checklist, policy generator, TLS checker, security headers. Client-side, free, source on GitHub',
  'sap': 'SAP developer tools — XML formatter, JSON validator, CSV converter for PI/PO, CPI, BTP',
  'okta': 'Okta developer tools — SAML decoder, OIDC builder, JWT verifier for SSO debugging',
  'ping-federate': 'Ping Federate tools — SAML decoder, OIDC builder, JWT verifier for identity flows',
}
for (const [stack, desc] of Object.entries(stackDescriptions)) {
  lines.push(`- [${stack.replace('-', ' ')} tools]: ${BASE}/dev-tools/${stack} — ${desc}`)
}
lines.push('')
lines.push('## Formatho Runtime (MCP for AI agents)')
lines.push('Self-hosted MCP server exposing these tools to AI agents privately — Docker deployment, permissioned tool registry, metadata-only audit logging:')
lines.push('- Formatho Runtime: ' + BASE + '/runtime')
lines.push('- Docker image: docker.io/formatho/formatho-runtime')
lines.push('- Source: https://github.com/formatho/formatho-runtime')
lines.push('- MCP connect: docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime')
lines.push('')
lines.push('## EVM Chain Tools')
lines.push('Chain-specific developer tool pages with pre-configured RPC endpoints, chain IDs, and token addresses:')
const chains = ['ethereum', 'arbitrum', 'base', 'optimism', 'polygon', 'bnb-chain', 'avalanche', 'zksync', 'linea', 'blast', 'mantle', 'cronos', 'ritual', 'hyperevm', 'katana', 'monad', 'robinhood', 'unichain', 'stable', 'tempo', 'world-chain']
for (const chain of chains) {
  lines.push(`- [${chain.replace('-', ' ')} tools]: ${BASE}/evm-tools/${chain}`)
}
lines.push('')
lines.push('## Guides')
lines.push(`- [Blog - developer guides and tutorials]: ${BASE}/blogs — Deep dives on AI agents, blockchain, RWA tokenization, and privacy-first tools.`)

// Blog posts from cache (same source as sitemap fallback)
try {
  const cached = JSON.parse(readFileSync(resolve(process.cwd(), 'scripts', 'blog-meta-cache.json'), 'utf8'))
  if (cached.length > 0) {
    lines.push('')
    lines.push('### Blog posts')
    for (const post of cached) {
      const excerpt = (post.excerpt || '').replace(/\n/g, ' ').slice(0, 120)
      lines.push(`- [${post.title}]: ${BASE}/blogs/${post.slug}${excerpt ? ' — ' + excerpt : ''}`)
    }
  }
} catch { /* no cache available */ }
lines.push('')

writeFileSync(resolve(process.cwd(), 'public', 'llms.txt'), lines.join('\n') + '\n')
const total = categories.reduce((a, c) => a + c.items.length, 0)
console.log(`llms.txt generated: ${categories.length} categories, ${total} tools`)
