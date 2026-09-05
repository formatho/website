#!/usr/bin/env node
/* eslint-env node */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

function inject(html, title, desc, canonical) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${title}"`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
}

function fix(dir, slug, title, desc, canonical) {
  const fp = path.join(distDir, dir, slug + '.html')
  if (!fs.existsSync(fp)) { console.log('  miss: ' + dir + '/' + slug); return }
  fs.writeFileSync(fp, inject(fs.readFileSync(fp, 'utf8'), title, desc, canonical))
  console.log('  ok: ' + dir + '/' + slug + ' -> ' + title.slice(0, 45))
}

const chains = [
  ['ethereum','Ethereum',1],['arbitrum','Arbitrum',42161],['base','Base',8453],
  ['optimism','Optimism',10],['polygon','Polygon PoS',137],['bnb-chain','BNB Smart Chain',56],
  ['avalanche','Avalanche C-Chain',43114],['zksync','zkSync Era',324],['linea','Linea',59144],
  ['blast','Blast',81457],['mantle','Mantle',5000],['cronos','Cronos',25],['ritual','Ritual',1979],['hyperevm','HyperEVM',999],['katana','Katana',747474],['monad','Monad',143],['robinhood','Robinhood Chain',4663],['unichain','Unichain',130],['stable','Stable',988],['tempo','Tempo',4217],['world-chain','World Chain',480],
]
console.log('EVM chains:')
for (const [s,n,id] of chains) {
  fix('evm-tools', s, `${n} Developer Tools - Free & Private | Formatho`,
    `Free ${n} developer tools: contract reader, vanity address generator, Keccak-256 hasher, ABI encoder, and unit converter. Works on ${n} (chain ID ${id}). 100% client-side.`,
    `https://formatho.com/evm-tools/${s}`)
}

const stacks = [
  ['owasp','OWASP Security Tools','Free OWASP security tools: headers analyzer, CSP generator/evaluator, CORS tester, cookie analyzer, JWT debugger. 100% client-side.'],
  ['soc2','Open Source SOC 2 Compliance Tools','Free open-source SOC 2 compliance tools: readiness checklist, policy generator, TLS checker. 100% client-side - audit evidence never leaves your browser. Source on GitHub.'],
  ['sap','SAP Developer Tools','Tools for SAP PI/PO, CPI, BTP, Gateway: XML formatter, JSON validator, CSV converter, JWT debugger, diff checker.'],
  ['okta','Okta Developer Tools','Debug Okta auth: SAML decoder, OIDC builder, JWT verifier, TOTP generator, cookie analyzer, CORS tester.'],
  ['ping-federate','Ping Federate Tools','Debug Ping Federate: SAML decoder, OIDC builder, JWT verifier, hash generator, TOTP generator.'],
]
console.log('Personas:')
for (const [s,n,d] of stacks) {
  fix('dev-tools', s, `${n} - Free Online | Formatho`, d.slice(0,160), `https://formatho.com/dev-tools/${s}`)
}

const cats = [
  ['web3','Web3 & Blockchain'],['security','Security & Auth'],['data-formats','Data Formats'],
  ['developer','Developer Tools'],['converters','Converters & Calculators'],['network','Network & Web'],
]
console.log('Categories:')
for (const [s,n] of cats) {
  fix('category', s, `${n} - Free Online Tools | Formatho`,
    `Free ${n} for developers. All tools run 100% client-side in your browser.`,
    `https://formatho.com/category/${s}`)
}

console.log('Done.')


// Static compliance pages
const staticPages = {
  'runtime': ['Formatho Runtime - Private Self-Hosted MCP Server for AI Agents', 'Self-hosted MCP server with a permissioned tool registry, metadata-only audit logging, and Docker deployment. Developer, security, and EVM tools for AI agents - inside your infrastructure.'],
  'security': ['Security - Vulnerability Disclosure | Formatho', 'Report security vulnerabilities to Formatho. Responsible disclosure program with safe harbor protections.'],
  'acceptable-use': ['Acceptable Use Policy - Formatho', 'Permitted and prohibited uses of Formatho tools including security and crypto tool guidelines.'],
  'privacy': ['Privacy Policy - Formatho', 'Zero cookies, zero tracking, all processing in your browser. No personal data collected.'],
}
console.log('Static compliance pages:')
for (const [slug, [title, desc]] of Object.entries(staticPages)) {
  fix('', slug, title, desc, 'https://formatho.com/' + slug)
}
