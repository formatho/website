#!/usr/bin/env node
/* eslint-env node */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { runtimeFaq, runtimeHowTo } from './faq-howto-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const BASE = 'https://formatho.com'

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
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


// ---------- Funnels: SEO meta for funnel pages ----------
console.log('Funnels:')
const funnelPages = [
  { file: 'funnels.html', title: 'Tool Funnels - Chained Workflows, Output Feeds Input | Formatho', desc: 'Guided multi-tool workflows where one tool output feeds the next: GTIN to EU DPP QR code, SPF to DMARC hardening. Free, 100% client-side.', path: '/funnels' },
  { file: 'funnels/eu-product-passport.html', title: 'EU Product Passport Funnel - GTIN to DPP QR Code | Formatho', desc: 'From barcode to a Digital Product Passport QR: validate your GTIN, build the GS1 Digital Link, score DPP readiness, draft the passport, generate the QR. Free, client-side.', path: '/funnels/eu-product-passport' },
  { file: 'funnels/email-auth-hardening.html', title: 'Email Auth Hardening Funnel - SPF to DMARC | Formatho', desc: 'The SPF to DMARC workflow: analyze your SPF record against the 10-lookup limit, then parse and grade your DMARC policy. Free, client-side.', path: '/funnels/email-auth-hardening' },
]
for (const fp of funnelPages) {
  const full = path.join(distDir, fp.file)
  if (!fs.existsSync(full)) { console.log('  miss: ' + fp.file); continue }
  const html = fs.readFileSync(full, 'utf8')
  fs.writeFileSync(full, inject(html, fp.title, fp.desc, BASE + fp.path))
  console.log('  ok: ' + fp.path + ' -> ' + fp.title.slice(0, 45))
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
  fix('evm-tools', s, `${n} Developer Tools | Formatho`.slice(0, 60),
    `Free ${n} dev tools: contract reader, calldata decoder, ABI encoder, unit converter. Chain ID ${id}. 100% client-side, nothing uploads.`,
    `${BASE}/evm-tools/${s}`,
    { jsonLd: [jsonldScript('json-ld-chain-breadcrumb', breadcrumbLd(`${n} Developer Tools`, `${BASE}/evm-tools/${s}`))] })
}

const stacks = [
  ['owasp','OWASP Security','OWASP security tools: headers analyzer, CSP generator/evaluator, CORS tester, cookie analyzer, JWT debugger. 100% client-side.'],
  ['soc2','Open Source SOC 2 Compliance Tools','Open-source SOC 2 compliance tools: readiness checklist, policy generator, TLS checker. Client-side; audit evidence never leaves your browser.'],
  ['sap','SAP Developer Tools','Tools for SAP PI/PO, CPI, BTP, Gateway: XML formatter, JSON validator, CSV converter, JWT debugger, diff checker. Free, private, and 100% client-side in your browser.'],
  ['okta','Okta Developer Tools','Debug Okta auth: SAML decoder, OIDC builder, JWT verifier, TOTP generator, cookie analyzer, CORS tester. Free, private, and 100% client-side in your browser.'],
  ['ping-federate','Ping Federate Tools','Debug Ping Federate: SAML decoder, OIDC builder, JWT verifier, hash generator, TOTP generator. Free, private, and 100% client-side in your browser.'],
]
console.log('Personas:')
for (const [s,n,d] of stacks) {
  fix('dev-tools', s, `${n} | Formatho`.slice(0, 60), d.slice(0, 155), `${BASE}/dev-tools/${s}`)
}

// Curated per-category SEO.
const catSeo = {
  web3: {
    name: 'Web3 & Blockchain',
    title: `Web3 & Blockchain Tools — EVM & ABI Utilities | Formatho`,
    desc: 'Free web3 dev tools: EVM contract reader, calldata decoder, ABI encoder, Keccak-256, Uniswap math. No upload, client-side.',
    kw: 'web3 tools, blockchain developer tools, evm contract reader, abi encoder, keccak256 hasher, vanity address generator, free crypto tools'
  },
  security: {
    name: 'Security & Auth',
    title: `Security & Auth Tools — JWT & SAML | Formatho`,
    desc: 'JWT debugger, SAML decoder, OIDC builder, hash generators, RSA keys, encryption, TOTP, password strength. Free, private, all client-side.',
    kw: 'security tools, jwt debugger, saml decoder, oidc builder, hash generator, encryption online, totp generator, password strength checker'
  },
  'data-formats': {
    name: 'Data Formats',
    title: `JSON, YAML, XML & CSV Tools — Converters | Formatho`,
    desc: 'Validate, format, convert and diff JSON, YAML, XML, TOML, CSV. UUID, ULID, Base64, IBAN validators plus ISO 20022 tools. Free and private.',
    kw: 'json formatter, yaml validator, xml converter, csv tools, toml converter, uuid generator, base64 encoder, iso 20022 validator'
  },
  developer: {
    name: 'Developer Tools',
    title: `Developer Tools — SQL, Git & Regex | Formatho`,
    desc: 'SQL formatter, SQLite browser, Git cheat sheet, regex tester, Docker converter, Mermaid viewer, diff checker. Free, private, in your browser.',
    kw: 'developer tools, sql formatter, sqlite browser, git cheat sheet, regex tester, docker compose converter, mermaid viewer, diff checker'
  },
  converters: {
    name: 'Converters & Calculators',
    title: `Converters & Calculators — Timestamp & Base Tools | Formatho`,
    desc: 'Unix timestamp, date-time, number base, color, case, temperature converters. Math, ETA, percentage calculators. Free, instant, client-side.',
    kw: 'unit converter, timestamp converter, number base converter, color converter, case converter, percentage calculator, free online converters'
  },
  network: {
    name: 'Network & Web',
    title: `Network & Web Tools — Subnet & URL | Formatho`,
    desc: 'IPv4 subnet calculator, MAC lookup, IPv6 ULA generator, URL encoder/parser, HTTP status codes, QR generator. Free, private, client-side.',
    kw: 'subnet calculator, ipv4 subnetting, mac address lookup, url encoder, http status codes, qr code generator, network tools online'
  },
  compliance: {
    name: 'Compliance & Standards',
    title: `Compliance & Standards Tools — DPP, ISO 20022, SOC 2 | Formatho`,
    desc: 'EU Digital Product Passport (ESPR), ISO 20022 payments, GS1 supply chain, SOC 2 readiness, and PLM/BOM tools. Free, private, client-side.',
    kw: 'compliance tools, dpp builder, espr passport, iso 20022 validator, pain.001 builder, gs1 digital link, soc 2 checklist, bom diff, bom cost rollup, part number generator, eu regulation tools'
  }
}

console.log('Categories:')
for (const [slug, seo] of Object.entries(catSeo)) {
  const url = `${BASE}/category/${slug}`
  const fp = path.join(distDir, 'category', slug + '.html')
  if (!fs.existsSync(fp)) { console.log('  miss: category/' + slug); continue }
  const raw = fs.readFileSync(fp, 'utf8')
  const toolItems = parseToolLinks(raw)
  const title = seo.title
  const jsonLd = [
    jsonldScript('json-ld-category-breadcrumb', breadcrumbLd(seo.name, url)),
    jsonldScript('json-ld-category-collection', collectionLd(seo.name, url, seo.desc, toolItems))
  ]
  fs.writeFileSync(fp, inject(raw, title, seo.desc, url, { keywords: seo.kw, jsonLd }))
  console.log(`  ok: category/${slug} -> ${title.slice(0, 50)} (${toolItems.length} tools)`)
}

// Two duplicate-FAQ sources must not land on every page: the index.html
// shell's homepage FAQ ("Is Formatho free to use?" …) and the generic tool
// FAQ formerly prepended to ~136 routes ("Is this tool free to use?" …).
// Strip blocks carrying either signature — tool-specific FAQPage JSON-LD
// is unique content and must survive. The homepage keeps its copy.
const GENERIC_FAQ_SIGNATURES = ['Is this tool free to use?', 'Is Formatho free to use?']
console.log('Stripping generic FAQPage JSON-LD (homepage excluded):')
let stripped = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(fp); continue }
    if (!entry.name.endsWith('.html')) continue
    if (fp === path.join(distDir, 'index.html')) continue
    const html = fs.readFileSync(fp, 'utf8')
    const cleaned = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      (m, body) => (GENERIC_FAQ_SIGNATURES.some((sig) => body.includes(sig)) ? '' : m))
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
  'runtime': ['Self-Hosted MCP Server — Docker, Private AI Agents', 'Run your own MCP server in Docker: Claude Code and Cursor get permissioned, audit-logged tool access in your network. Zero egress, one container.'],
  'security': ['Security - Vulnerability Disclosure | Formatho', 'Report security vulnerabilities to Formatho. Responsible disclosure with safe harbor protections and response commitments.'],
  'acceptable-use': ['Acceptable Use Policy - Formatho', 'Permitted and prohibited uses of Formatho tools: security testing only on systems you own or are explicitly authorized to test.'],
  'enterprise': ['Enterprise Agent-Ready Services | Formatho', 'We turn internal APIs into secure, MCP-accessible tools inside your infrastructure. Permissioned, audit-logged, zero egress by design.'],
  'privacy': ['Privacy Policy - Formatho', 'Tool processing is 100% in-browser; inputs never upload. Cookieless analytics plus Google AdSense with EEA consent. Full disclosures inside.'],
  'about': ['About Formatho - Private Infrastructure for AI Agents', 'Formatho builds private infrastructure for AI agents: a self-hosted MCP runtime and a free browser tool library. Zero data egress, audit-logged.'],
  'terms': ['Terms of Service - Formatho', 'Terms of service for using Formatho browser tools and the Formatho Runtime MCP server: acceptable use, liability, and changes.'],
  'contact': ['Contact Formatho - Support & Feedback | Formatho', 'Reach the Formatho team: GitHub issues for bugs and features, X for updates, email for security and partnership disclosures.'],
  'eliza-tools': ['elizaOS Developer Tools — Free, Private, Client-Side | Formatho', 'Free developer tools for elizaOS agent builders: pure-function plugin actions plus browser-side config validators. Zero network, zero tracking.'],
  'agents': ['Agent Browser - MCP Tools for AI Agents | Formatho', 'Browse the Formatho tool catalog from an AI agent perspective: what each tool does, how to call it via MCP, input and output formats.'],
}
console.log('Static compliance pages:')
for (const [slug, [title, desc]] of Object.entries(staticPages)) {
  fix('', slug, title, desc, BASE + '/' + slug)
}

// Runtime landing: FAQPage + HowTo JSON-LD matching the visible sections
{
  const fp = path.join(distDir, 'runtime.html')
  if (fs.existsSync(fp)) {
    let html = fs.readFileSync(fp, 'utf8')
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: runtimeFaq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
    const howToLd = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to run a self-hosted MCP server for AI agents',
      description: 'Deploy Formatho Runtime in Docker and connect Claude Code, Cursor, or Claude Desktop.',
      totalTime: 'PT5M',
      tool: [{ '@type': 'HowToTool', name: 'Docker + Formatho Runtime image' }],
      step: runtimeHowTo.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.split(/[,.]/)[0].slice(0, 60),
        text: s
      }))
    }
    const strip = (id) => {
      html = html.replace(new RegExp('<script type="application/ld\\+json" id="' + id + '">[\\s\\S]*?</script>'), '')
    }
    strip('json-ld-runtime-faq')
    strip('json-ld-runtime-howto')
    html = html.replace('</head>',
      `<script type="application/ld+json" id="json-ld-runtime-faq">${JSON.stringify(faqLd)}</script>` +
      `<script type="application/ld+json" id="json-ld-runtime-howto">${JSON.stringify(howToLd)}</script></head>`)

const softwareAppLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://formatho.com/runtime#softwareapp',
  name: 'Formatho Runtime',
  url: 'https://formatho.com/runtime',
  description:
    'Self-hosted MCP server for AI agents: one Docker container with 26 permissioned developer, security, and EVM tools, per-client API keys, rate limits, and metadata-only audit. Zero data egress.',
  softwareVersion: '0.3.0',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'MCP Server',
  operatingSystem: 'Linux, macOS, Windows',
  softwareRequirements: 'Docker',
  runtimePlatform: ['Docker', 'Linux', 'macOS', 'Windows'],
  featureList: [
    '26 deterministic developer, security, and EVM tools',
    'Zero data egress — tools are pure functions with no network, filesystem, or subprocess access',
    'Per-client API keys with allow/deny tool policies',
    'Per-key and per-tool rate limits',
    'Metadata-only audit log — tool, version, key, duration, byte sizes; payloads never recorded',
    'stdio and Streamable HTTP transports in one Docker image',
    'REST gateway exposing the same tools over plain HTTP for scripts and CI',
    'Listed in the MCP Registry as com.formatho/runtime'
  ],
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  downloadUrl: 'https://hub.docker.com/r/formatho/formatho-runtime',
  installUrl: 'https://formatho.com/runtime',
  releaseNotes: 'https://github.com/formatho/formatho-runtime/releases',
  sameAs: [
    'https://github.com/formatho/formatho-runtime',
    'https://hub.docker.com/r/formatho/formatho-runtime',
    'https://registry.modelcontextprotocol.io',
    'https://x.com/heyformatho',
    'https://linkedin.com/company/formatho'
  ],
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'MCP Registry ID', value: 'com.formatho/runtime' },
    { '@type': 'PropertyValue', name: 'Transports', value: 'stdio, Streamable HTTP, REST gateway' },
    { '@type': 'PropertyValue', name: 'Programming language', value: 'TypeScript' }
  ],
  keywords:
    'MCP server, self-hosted MCP server, private MCP server, AI agent tools, Claude Code, Cursor, Claude Desktop, Docker, zero data egress, audit logging',
  publisher: { '@type': 'Organization', name: 'Formatho', url: 'https://formatho.com/' },
  datePublished: '2026-09-06' // v0.3.0 release date (GitHub releases API, verified 2026-09-24)
}

strip('json-ld-runtime-softwareapp')
html = html.replace(
  '</head>',
  `${jsonldScript('json-ld-runtime-softwareapp', softwareAppLd)}</head>`
)

    fs.writeFileSync(fp, html)
    console.log('  ok: /runtime FAQPage + HowTo + SoftwareApplication JSON-LD')
  }
}

// Enterprise services page: FAQPage JSON-LD matching the visible section
{
  const fp = path.join(distDir, 'enterprise.html')
  if (fs.existsSync(fp)) {

    const faqs = [
      ['What does "agent-ready" actually mean?', 'An internal system is agent-ready when an AI agent can call it through a governed interface: typed schemas so the agent constructs valid requests, a permission model that says which agent may call what, rate limits that bound blast radius, and an audit trail that records every invocation without recording payloads.'],
      ['Where does our data go during the engagement?', 'Nowhere. The runtime we deploy runs inside your infrastructure and makes zero outbound requests — verifiable in the open-source code, not a contractual promise. Tool development happens against your staging systems; production access is issued by your team, to your team, and revocable by you.'],
      ['Do you host anything for us?', 'The default engagement is fully self-hosted: your containers, your network, your keys. A hosted trial tier exists for evaluation, but production deployments in these engagements are self-hosted by design.'],
      ['How is this different from hiring an MCP consultant?', 'The reference implementation is a maintained, open-source runtime with a published tool registry, MCP Registry listing, and a security model designed for review — not a one-off server somebody leaves behind. Engagements extend that foundation instead of starting from a blank file.'],
      ['What does an engagement cost?', 'Assessments are fixed-scope; pilots and production rollouts are sized by tool count and system complexity after the assessment. Every engagement ends with handover of all code and configuration — the open-source runtime guarantees there is no lock-in to price against.'],
      ['Which teams typically start?', 'Platform and developer-experience teams bringing internal tooling to agents, security teams that need governed tool access before broader agent adoption, and payments/fintech engineering groups operating under data-residency constraints.']
    ]
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    }
    let html = fs.readFileSync(fp, 'utf8')
    html = html.replace(/<script type="application\/ld\+json" id="json-ld-enterprise-faq">[\s\S]*?<\/script>/, '')
    html = html.replace('</head>', `<script type="application/ld+json" id="json-ld-enterprise-faq">${JSON.stringify(faqLd)}</script></head>`)
    fs.writeFileSync(fp, html)
    console.log('  ok: /enterprise FAQPage JSON-LD')
  }
}

// Redirect stubs and artifacts rendered by the SSG pass: never indexable,
// canonical points at the live target so crawlers collapse them.
console.log('Redirect stubs:')
const stubs = {
  'category': '/tools',
  'category/web-network': '/category/network',
  '': '/',
  '404': '/',
  // Internal admin screens that must never be indexed (near-empty, not
  // for the public)
  'tools/admin/ab-tests': '/',
  'tools/admin/beta-feedback': '/',
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
