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

  // Tools listing
  { path: '/tools', priority: '0.9', changefreq: 'weekly' },

  // Document tools
  { path: '/tools/markdown', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools/bpmn', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools/bpmn-to-visio', priority: '0.9', changefreq: 'monthly' },
  
  // Crypto & Security
  { path: '/tools/token-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/hash-text', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/bcrypt', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/uuid', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/ulid-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/encryption', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/bip39-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/hmac-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/rsa-key-pair-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/password-strength-analyser', priority: '0.8', changefreq: 'monthly' },
  
  // Converters
  { path: '/tools/date-time-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/integer-base-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/roman-numeral-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/base64', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/base64-file-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/color-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/case-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/text-to-nato-alphabet', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/text-to-binary', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/text-to-unicode', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-yaml', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-csv', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/yaml-to-toml', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-to-toml', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/list-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/toml-to-json', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/toml-to-yaml', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/xml-to-json', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-to-xml', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/markdown-to-html', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/temperature-converter', priority: '0.8', changefreq: 'monthly' },
  
  // Web
  { path: '/tools/url-encoder', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/html-entities', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/url-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/device-information', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/basic-auth-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/meta-tag-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/otp-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/mime-types', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/jwt', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/keycode-info', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/slugify-string', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/html-wysiwyg-editor', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/user-agent-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/http-status-codes', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-diff', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/safelink-decoder', priority: '0.8', changefreq: 'monthly' },
  
  // Images & Media
  { path: '/tools/qr-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/wifi-qr-code-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/svg-placeholder-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/image', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/camera-recorder', priority: '0.8', changefreq: 'monthly' },
  
  // Development
  { path: '/tools/git-memo', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/random-port-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/crontab-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-viewer', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-minify', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/sql', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/chmod-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/docker-run-to-compose', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/xml-formatter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/yaml-viewer', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/email-normalizer', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/regex-tester', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/regex-memo', priority: '0.8', changefreq: 'monthly' },
  
  // Network
  { path: '/tools/ipv4-subnet-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/ipv4-address-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/ipv4-range-expander', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/mac-address-lookup', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/mac-address-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/ipv6-ula-generator', priority: '0.8', changefreq: 'monthly' },
  
  // Math
  { path: '/tools/math-evaluator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/eta-calculator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/percentage-calculator', priority: '0.8', changefreq: 'monthly' },
  
  // Measurement
  { path: '/tools/chronometer', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/benchmark-builder', priority: '0.8', changefreq: 'monthly' },
  
  // Text
  { path: '/tools/diff', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/lorem', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/text-statistics', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/emoji-picker', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/string-obfuscator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/numeronym-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/ascii-text-drawer', priority: '0.8', changefreq: 'monthly' },
  
  // Data Validation
  { path: '/tools/phone-parser', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/iban-validator', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/json-lint', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/yaml-lint', priority: '0.8', changefreq: 'monthly' },
  
  // Blockchain
  { path: '/tools/evm-converter', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/keccak256', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/address-checksum', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/multi-chain-keys', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/address-from-key', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/solidity-to-opcodes', priority: '0.8', changefreq: 'monthly' },
  
  // AI
  { path: '/agent-orchestrator', priority: '0.9', changefreq: 'monthly' },
  { path: '/agent-identity-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/agents', priority: '0.8', changefreq: 'monthly' }
]

const domain = 'https://formatho.com'
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
