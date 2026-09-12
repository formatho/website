#!/usr/bin/env node
/* eslint-env node */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const BASE = 'https://formatho.com'

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function jsonldScript(id, obj) {
  return `<script type="application/ld+json" id="${id}">${JSON.stringify(obj)}</script>`
}

function inject(html, title, desc, canonical, extra = {}) {
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${esc(title)}"`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(desc)}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(desc)}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(title)}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(desc)}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
  if (extra.keywords) {
    const kw = esc(extra.keywords)
    if (out.includes('<meta name="keywords"')) {
      out = out.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${kw}"`)
    } else {
      out = out.replace('</head>', `    <meta name="keywords" content="${kw}">\n</head>`)
    }
  }
  if (extra.jsonLd) {
    // idempotent: drop previously injected scripts with the same ids first
    for (const s of extra.jsonLd) {
      const id = /id="([^"]+)"/.exec(s)?.[1]
      if (id) out = out.replace(new RegExp(`<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>`), '')
    }
    out = out.replace('</head>', extra.jsonLd.join('') + '</head>')
  }
  return out
}

function fix(dir, slug, title, desc, canonical, extra) {
  const fp = path.join(distDir, dir, slug + '.html')
  if (!fs.existsSync(fp)) { console.log('  miss: ' + dir + '/' + slug); return null }
  const html = fs.readFileSync(fp, 'utf8')
  fs.writeFileSync(fp, inject(html, title, desc, canonical, extra))
  console.log('  ok: ' + dir + '/' + slug + ' -> ' + title.slice(0, 45))
  return html
}

// Extract (href, tool-name) pairs from a rendered category page — the anchor
// cards wrap an <h3>, which footer/related plain links do not.
function parseToolLinks(html) {
  const re = /<a[^>]+href="(\/tools\/[^"]+)"[^>]*>(?:(?!<\/a>)[\s\S])*?<h3[^>]*>([^<]+)<\/h3>/g
  const seen = new Set()
  const items = []
  for (const m of html.matchAll(re)) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    items.push({ url: BASE + m[1], name: m[2].trim() })
  }
  return items
}

function breadcrumbLd(name, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: BASE + '/tools' },
      { '@type': 'ListItem', position: 3, name, item: url }
    ]
  }
}

function collectionLd(name, url, desc, toolItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${name} — Free Online Tools`,
    description: desc,
    url,
    isPartOf: { '@type': 'WebSite', name: 'Formatho', url: BASE + '/' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: toolItems.length,
      itemListElement: toolItems.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: t.url
      }))
    }
  }
}

const chains = [
  ['ethereum','Ethereum',1],['arbitrum','Arbitrum',42161],['base','Base',8453],
  ['optimism','Optimism',10],['polygon','Polygon PoS',137],['bnb-chain','BNB Smart Chain',56],
  ['avalanche','Avalanche C-Chain',43114],['zksync','zkSync Era',324],['linea','Linea',59144],
  ['blast','Blast',81457],['mantle','Mantle',5000],['cronos','Cronos',25],['ritual','Ritual',1979],['hyperevm','HyperEVM',999],['katana','Katana',747474],['monad','Monad',143],['robinhood','Robinhood Chain',4663],['unichain','Unichain',130],['stable','Stable',988],['tempo','Tempo',4217],['world-chain','World Chain',480],
]
console.log('EVM chains:')
for (const [s,n,id] of chains) {
  fix('evm-tools', s, `${n} Developer Tools - Secure MCP for AI Agents | Formatho`,
    `Secure ${n} developer tools: contract reader, vanity address generator, Keccak-256 hasher, ABI encoder, and unit converter. Works on ${n} (chain ID ${id}). 100% client-side.`,
    `${BASE}/evm-tools/${s}`,
    { jsonLd: [jsonldScript('json-ld-chain-breadcrumb', breadcrumbLd(`${n} Developer Tools`, `${BASE}/evm-tools/${s}`))] })
}

const stacks = [
  ['owasp','OWASP Security Tools','OWASP security tools: headers analyzer, CSP generator/evaluator, CORS tester, cookie analyzer, JWT debugger. 100% client-side.'],
  ['soc2','Open Source SOC 2 Compliance Tools','Open-source SOC 2 compliance tools: readiness checklist, policy generator, TLS checker. 100% client-side - audit evidence never leaves your browser. Source on GitHub.'],
  ['sap','SAP Developer Tools','Tools for SAP PI/PO, CPI, BTP, Gateway: XML formatter, JSON validator, CSV converter, JWT debugger, diff checker.'],
  ['okta','Okta Developer Tools','Debug Okta auth: SAML decoder, OIDC builder, JWT verifier, TOTP generator, cookie analyzer, CORS tester.'],
  ['ping-federate','Ping Federate Tools','Debug Ping Federate: SAML decoder, OIDC builder, JWT verifier, hash generator, TOTP generator.'],
]
console.log('Personas:')
for (const [s,n,d] of stacks) {
  fix('dev-tools', s, `${n} Tools - Secure MCP for AI Agents | Formatho`, d.slice(0,160), `${BASE}/dev-tools/${s}`)
}

// Curated per-category SEO. Title count {n} is filled from the page's real
// tool-link count so copy stays accurate as tools are added.
const catSeo = {
  web3: {
    name: 'Web3 & Blockchain',
    title: n => `Web3 & Blockchain Tools — ${n} Free EVM, ABI & Crypto Utilities | Formatho`,
    desc: 'Free web3 dev tools: EVM contract reader, vanity address generator, Keccak-256 hasher, ABI encoder, Uniswap math, multi-chain readers. No upload, client-side.',
    kw: 'web3 tools, blockchain developer tools, evm contract reader, abi encoder, keccak256 hasher, vanity address generator, free crypto tools'
  },
  security: {
    name: 'Security & Auth',
    title: n => `Security & Auth Tools — ${n} Free JWT, SAML & Hash Utilities | Formatho`,
    desc: 'JWT debugger, SAML decoder, OIDC builder, hash generators, RSA keys, encryption, TOTP, password strength. Free, private, all client-side.',
    kw: 'security tools, jwt debugger, saml decoder, oidc builder, hash generator, encryption online, totp generator, password strength checker'
  },
  'data-formats': {
    name: 'Data Formats',
    title: n => `JSON, YAML, XML & CSV Tools — ${n} Free Format Converters | Formatho`,
    desc: 'Validate, format, convert and diff JSON, YAML, XML, TOML, CSV. UUID, ULID, Base64, IBAN validators plus ISO 20022 tools. Free and private.',
    kw: 'json formatter, yaml validator, xml converter, csv tools, toml converter, uuid generator, base64 encoder, iso 20022 validator'
  },
  developer: {
    name: 'Developer Tools',
    title: n => `Developer Tools — ${n} Free SQL, Git, Regex & SQLite Utilities | Formatho`,
    desc: 'SQL formatter, SQLite browser, Git cheat sheet, regex tester, Docker converter, Mermaid viewer, diff checker. Free, private, in your browser.',
    kw: 'developer tools, sql formatter, sqlite browser, git cheat sheet, regex tester, docker compose converter, mermaid viewer, diff checker'
  },
  converters: {
    name: 'Converters & Calculators',
    title: n => `Converters & Calculators — ${n} Free Timestamp, Base & Color Tools | Formatho`,
    desc: 'Unix timestamp, date-time, number base, color, case, temperature converters. Math, ETA, percentage calculators. Free, instant, client-side.',
    kw: 'unit converter, timestamp converter, number base converter, color converter, case converter, percentage calculator, free online converters'
  },
  network: {
    name: 'Network & Web',
    title: n => `Network & Web Tools — ${n} Free Subnet, URL & HTTP Utilities | Formatho`,
    desc: 'IPv4 subnet calculator, MAC lookup, IPv6 ULA generator, URL encoder/parser, HTTP status codes, QR generator. Free, private, client-side.',
    kw: 'subnet calculator, ipv4 subnetting, mac address lookup, url encoder, http status codes, qr code generator, network tools online'
  }
}

console.log('Categories:')
for (const [slug, seo] of Object.entries(catSeo)) {
  const url = `${BASE}/category/${slug}`
  const fp = path.join(distDir, 'category', slug + '.html')
  if (!fs.existsSync(fp)) { console.log('  miss: category/' + slug); continue }
  const raw = fs.readFileSync(fp, 'utf8')
  const toolItems = parseToolLinks(raw)
  const title = seo.title(toolItems.length)
  const jsonLd = [
    jsonldScript('json-ld-category-breadcrumb', breadcrumbLd(seo.name, url)),
    jsonldScript('json-ld-category-collection', collectionLd(seo.name, url, seo.desc, toolItems))
  ]
  fs.writeFileSync(fp, inject(raw, title, seo.desc, url, { keywords: seo.kw, jsonLd }))
  console.log(`  ok: category/${slug} -> ${title.slice(0, 50)} (${toolItems.length} tools)`)
}

// The FAQPage JSON-LD lives in the index.html shell and therefore lands on
// every page. Keep it on the homepage only - sitewide duplicates look like
// markup spam to search engines.
console.log('Stripping sitewide FAQPage JSON-LD (homepage excluded):')
let stripped = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(fp); continue }
    if (!entry.name.endsWith('.html')) continue
    if (fp === path.join(distDir, 'index.html')) continue
    const html = fs.readFileSync(fp, 'utf8')
    const cleaned = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      (m, body) => (body.includes('"FAQPage"') || body.includes('@type":"FAQPage') ? '' : m))
    if (cleaned !== html) {
      fs.writeFileSync(fp, cleaned)
      stripped++
    }
  }
}
walk(distDir)
console.log(`  stripped from ${stripped} pages`)

// Static compliance pages
const staticPages = {
  'runtime': ['Formatho Runtime - Private Self-Hosted MCP Server for AI Agents', 'Self-hosted MCP server with a permissioned tool registry, metadata-only audit logging, and Docker deployment. Developer, security, and EVM tools for AI agents - inside your infrastructure.'],
  'security': ['Security - Vulnerability Disclosure | Formatho', 'Report security vulnerabilities to Formatho. Responsible disclosure program with safe harbor protections.'],
  'acceptable-use': ['Acceptable Use Policy - Formatho', 'Permitted and prohibited uses of Formatho tools including security and crypto tool guidelines.'],
  'privacy': ['Privacy Policy - Formatho', 'Zero cookies, zero tracking, all processing in your browser. No personal data collected.'],
  'about': ['About Formatho - Private Infrastructure for AI Agents | Formatho', 'Formatho builds private infrastructure for AI agents: a self-hosted MCP runtime and 230+ free browser tools. Zero data egress, permissioned, audit-logged.'],
  'terms': ['Terms of Service - Formatho', 'Terms of service for using Formatho browser tools and the Formatho Runtime MCP server.'],
  'contact': ['Contact Formatho - Support & Feedback | Formatho', 'Reach the Formatho team: GitHub issues for bugs and features, X for updates, email for security disclosures.'],
  'agents': ['Agent Browser - MCP Tools for AI Agents | Formatho', 'Browse the Formatho tool catalog from an AI agent perspective: what each tool does, how to call it via MCP, input and output formats.'],
}
console.log('Static compliance pages:')
for (const [slug, [title, desc]] of Object.entries(staticPages)) {
  fix('', slug, title, desc, BASE + '/' + slug)
}

// Redirect stubs and artifacts rendered by the SSG pass: never indexable,
// canonical points at the live target so crawlers collapse them.
console.log('Redirect stubs:')
const stubs = {
  'category': '/tools',
  'category/web-network': '/category/network',
  '': '/',
  '404': '/',
}
for (const [slug, target] of Object.entries(stubs)) {
  const fp = path.join(distDir, slug + '.html')
  if (!fs.existsSync(fp)) { console.log('  miss: ' + (slug || '(root)')); continue }
  let html = fs.readFileSync(fp, 'utf8')
  html = html
    .replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, nofollow"')
    .replace(/<meta name="googlebot" content="[^"]*"/, '<meta name="googlebot" content="noindex, nofollow"')
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${BASE}${target}"`)
  fs.writeFileSync(fp, html)
  console.log(`  ok: /${slug} -> noindex, canonical ${target}`)
}

console.log('Done.')
