/* eslint-env node */
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const routes = [
  // Home - highest priority
  { path: '/', priority: '1.0', changefreq: 'weekly' },

  // Main site pages
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },

  // Blog posts (37 total)
  { path: '/blogs/india-privacy-first-developer-toolkit-2026', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/generate-uuids-without-internet-connection-2026', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/generate-qr-codes-without-tracking-pixels', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/test-regex-patterns-securely-2026', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/100-developer-tools-all-free-all-private', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/encode-decode-base64-files-never-leave-browser', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/format-sql-queries-without-cloud-uploads', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/decode-jwt-tokens-without-server-exposure', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/convert-json-to-yaml-no-upload', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/developer-tools-that-dont-spy-on-you', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/uuid-v1-vs-v4', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/bcrypt-password-hashing-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/base64-encoding-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/ulids-vs-uuids', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/jwt-tokens-complete-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/sql-formatting-best-practices', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/qr-codes-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/regex-practical-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/ethereum-units-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/crontab-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/http-status-codes-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/json-yaml-toml-comparison', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/password-security-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/ipv4-subnetting-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/case-conversion-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/cryptographic-hashes-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/markdown-tips-tricks', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/git-commands-cheat-sheet', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/color-formats-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/docker-run-to-compose', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/bip39-mnemonic-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/encoding-vs-encryption', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/unix-file-permissions', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs/ai-agent-orchestration-career-blueprint-2026', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/meta-ai-restructuring-applied-superintelligence-2026', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/ai-job-safety-22-careers-anthropic-research', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/when-ai-stops-feeling-like-software-and-starts-feeling-like-a-real-employee', priority: '0.8', changefreq: 'monthly' },

  // Document tools
  { path: '/markdown', priority: '0.9', changefreq: 'monthly' },
  { path: '/bpmn', priority: '0.9', changefreq: 'monthly' },
  { path: '/bpmn-to-visio', priority: '0.9', changefreq: 'monthly' },
  
  // Crypto & Security
  { path: '/token-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/hash-text', priority: '0.8', changefreq: 'monthly' },
  { path: '/bcrypt', priority: '0.8', changefreq: 'monthly' },
  { path: '/uuid', priority: '0.8', changefreq: 'monthly' },
  { path: '/ulid-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/encryption', priority: '0.8', changefreq: 'monthly' },
  { path: '/bip39-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/hmac-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/rsa-key-pair-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/password-strength-analyser', priority: '0.8', changefreq: 'monthly' },
  
  // Converters
  { path: '/date-time-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/integer-base-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/roman-numeral-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/base64', priority: '0.8', changefreq: 'monthly' },
  { path: '/base64-file-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/color-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/case-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/text-to-nato-alphabet', priority: '0.8', changefreq: 'monthly' },
  { path: '/text-to-binary', priority: '0.8', changefreq: 'monthly' },
  { path: '/text-to-unicode', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-yaml', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-csv', priority: '0.8', changefreq: 'monthly' },
  { path: '/yaml-to-toml', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-to-toml', priority: '0.8', changefreq: 'monthly' },
  { path: '/list-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/toml-to-json', priority: '0.8', changefreq: 'monthly' },
  { path: '/toml-to-yaml', priority: '0.8', changefreq: 'monthly' },
  { path: '/xml-to-json', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-to-xml', priority: '0.8', changefreq: 'monthly' },
  { path: '/markdown-to-html', priority: '0.8', changefreq: 'monthly' },
  { path: '/temperature-converter', priority: '0.8', changefreq: 'monthly' },
  
  // Web
  { path: '/url-encoder', priority: '0.8', changefreq: 'monthly' },
  { path: '/html-entities', priority: '0.8', changefreq: 'monthly' },
  { path: '/url-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/device-information', priority: '0.8', changefreq: 'monthly' },
  { path: '/basic-auth-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/meta-tag-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/otp-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/mime-types', priority: '0.8', changefreq: 'monthly' },
  { path: '/jwt', priority: '0.8', changefreq: 'monthly' },
  { path: '/keycode-info', priority: '0.8', changefreq: 'monthly' },
  { path: '/slugify-string', priority: '0.8', changefreq: 'monthly' },
  { path: '/html-wysiwyg-editor', priority: '0.8', changefreq: 'monthly' },
  { path: '/user-agent-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/http-status-codes', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-diff', priority: '0.8', changefreq: 'monthly' },
  { path: '/safelink-decoder', priority: '0.8', changefreq: 'monthly' },
  
  // Images & Media
  { path: '/qr-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/wifi-qr-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/svg-placeholder-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/image', priority: '0.8', changefreq: 'monthly' },
  { path: '/camera-recorder', priority: '0.8', changefreq: 'monthly' },
  
  // Development
  { path: '/git-memo', priority: '0.8', changefreq: 'monthly' },
  { path: '/random-port-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/crontab-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-viewer', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-minify', priority: '0.8', changefreq: 'monthly' },
  { path: '/sql', priority: '0.8', changefreq: 'monthly' },
  { path: '/chmod-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/docker-run-to-compose', priority: '0.8', changefreq: 'monthly' },
  { path: '/xml-formatter', priority: '0.8', changefreq: 'monthly' },
  { path: '/yaml-viewer', priority: '0.8', changefreq: 'monthly' },
  { path: '/email-normalizer', priority: '0.8', changefreq: 'monthly' },
  { path: '/regex-tester', priority: '0.8', changefreq: 'monthly' },
  { path: '/regex-memo', priority: '0.8', changefreq: 'monthly' },
  
  // Network
  { path: '/ipv4-subnet-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/ipv4-address-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/ipv4-range-expander', priority: '0.8', changefreq: 'monthly' },
  { path: '/mac-address-lookup', priority: '0.8', changefreq: 'monthly' },
  { path: '/mac-address-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/ipv6-ula-generator', priority: '0.8', changefreq: 'monthly' },
  
  // Math
  { path: '/math-evaluator', priority: '0.8', changefreq: 'monthly' },
  { path: '/eta-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/percentage-calculator', priority: '0.8', changefreq: 'monthly' },
  
  // Measurement
  { path: '/chronometer', priority: '0.8', changefreq: 'monthly' },
  { path: '/benchmark-builder', priority: '0.8', changefreq: 'monthly' },
  
  // Text
  { path: '/diff', priority: '0.8', changefreq: 'monthly' },
  { path: '/lorem', priority: '0.8', changefreq: 'monthly' },
  { path: '/text-statistics', priority: '0.8', changefreq: 'monthly' },
  { path: '/emoji-picker', priority: '0.8', changefreq: 'monthly' },
  { path: '/string-obfuscator', priority: '0.8', changefreq: 'monthly' },
  { path: '/numeronym-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/ascii-text-drawer', priority: '0.8', changefreq: 'monthly' },
  
  // Data Validation
  { path: '/phone-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/iban-validator', priority: '0.8', changefreq: 'monthly' },
  { path: '/json-lint', priority: '0.8', changefreq: 'monthly' },
  { path: '/yaml-lint', priority: '0.8', changefreq: 'monthly' },
  
  // Blockchain
  { path: '/evm-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/keccak256', priority: '0.8', changefreq: 'monthly' },
  { path: '/address-checksum', priority: '0.8', changefreq: 'monthly' },
  { path: '/multi-chain-keys', priority: '0.8', changefreq: 'monthly' },
  { path: '/address-from-key', priority: '0.8', changefreq: 'monthly' },
  { path: '/solidity-to-opcodes', priority: '0.8', changefreq: 'monthly' },
  
  // AI
  { path: '/agent-orchestrator', priority: '0.9', changefreq: 'monthly' },
  { path: '/agent-identity-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/agents', priority: '0.8', changefreq: 'monthly' }
]

const domain = 'https://formatho.com/tools'
const currentDate = new Date().toISOString().split('T')[0]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

const outputPath = resolve(process.cwd(), 'public/sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf-8')

console.log(`✅ Sitemap generated successfully at ${outputPath}`)
console.log(`   Generated ${routes.length} URLs with date: ${currentDate}`)
