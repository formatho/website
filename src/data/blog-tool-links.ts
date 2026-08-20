/**
 * Blog post -> related tool links, rendered as "Try these tools" cards at the
 * end of each article. Internal links from tool-aligned blog content to the
 * tools themselves is the highest-leverage internal linking on the site.
 *
 * Keys must match the Strapi slug exactly (URL path).
 */
export interface BlogToolLink {
  name: string
  path: string
}

export const blogToolLinks: Record<string, BlogToolLink[]> = {
  // JSON / YAML
  'json-to-yaml-converter-tools': [
    { name: 'JSON ↔ YAML Converter', path: '/tools/json-yaml' },
    { name: 'JSON Validator & Formatter', path: '/tools/json-lint' }
  ],
  'convert-json-to-yaml-no-upload': [
    { name: 'JSON ↔ YAML Converter', path: '/tools/json-yaml' },
    { name: 'YAML Validator', path: '/tools/yaml-lint' }
  ],
  'json-yaml-toml-comparison': [
    { name: 'JSON ↔ YAML Converter', path: '/tools/json-yaml' },
    { name: 'JSON to TOML Converter', path: '/tools/json-to-toml' },
    { name: 'TOML to YAML Converter', path: '/tools/toml-to-yaml' }
  ],

  // JWT
  'jwt-decoder-security-guide': [
    { name: 'JWT Decoder', path: '/tools/jwt' },
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' }
  ],
  'decode-jwt-tokens-without-server-exposure': [
    { name: 'JWT Decoder', path: '/tools/jwt' }
  ],
  'jwt-tokens-complete-guide': [
    { name: 'JWT Decoder', path: '/tools/jwt' },
    { name: 'Token Generator', path: '/tools/token-generator' }
  ],

  // SQL
  'sql-formatter-security': [
    { name: 'SQL Formatter', path: '/tools/sql' },
    { name: 'SQL to ER Diagram', path: '/tools/sql-to-er-diagram' }
  ],
  'format-sql-queries-without-cloud-uploads': [
    { name: 'SQL Formatter', path: '/tools/sql' },
    { name: 'SQL Dialect Converter', path: '/tools/sql-dialect-converter' }
  ],
  'sql-formatting-best-practices': [
    { name: 'SQL Formatter', path: '/tools/sql' },
    { name: 'JSON to CSV Converter', path: '/tools/json-csv' }
  ],

  // Base64 / encoding
  'base64-encoder-decoder-complete-guide': [
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' },
    { name: 'Base64 File Converter', path: '/tools/base64-file-converter' }
  ],
  'encode-decode-base64-files-never-leave-browser': [
    { name: 'Base64 File Converter', path: '/tools/base64-file-converter' },
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' }
  ],
  'base64-encoding-guide': [
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' },
    { name: 'URL Encoder/Decoder', path: '/tools/url-encoder' }
  ],
  'encoding-vs-encryption': [
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' },
    { name: 'AES Encryption Tool', path: '/tools/encryption' }
  ],

  // Regex
  'regex-tester-security': [
    { name: 'Regex Tester', path: '/tools/regex-tester' },
    { name: 'Regex Cheat Sheet', path: '/tools/regex-memo' }
  ],
  'test-regex-patterns-securely-2026': [
    { name: 'Regex Tester', path: '/tools/regex-tester' }
  ],
  'regex-practical-guide': [
    { name: 'Regex Cheat Sheet', path: '/tools/regex-memo' },
    { name: 'Regex Tester', path: '/tools/regex-tester' }
  ],

  // QR codes
  'qr-codes-without-tracking': [
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'WiFi QR Code Generator', path: '/tools/wifi-qr-code-generator' }
  ],
  'generate-qr-codes-without-tracking-pixels': [
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' }
  ],
  'qr-codes-explained': [
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'WiFi QR Code Generator', path: '/tools/wifi-qr-code-generator' }
  ],

  // UUID / ULID
  'uuid-generator-masterclass': [
    { name: 'UUID Generator', path: '/tools/uuid' },
    { name: 'ULID Generator', path: '/tools/ulid-generator' }
  ],
  'generate-uuids-without-internet-connection-2026': [
    { name: 'UUID Generator', path: '/tools/uuid' }
  ],
  'uuid-v1-vs-v4': [
    { name: 'UUID Generator', path: '/tools/uuid' }
  ],
  'ulids-vs-uuids': [
    { name: 'ULID Generator', path: '/tools/ulid-generator' },
    { name: 'UUID Generator', path: '/tools/uuid' }
  ],

  // Passwords / hashing
  'bcrypt-password-hashing-guide': [
    { name: 'Bcrypt Hash Generator', path: '/tools/bcrypt' },
    { name: 'Hash Generator', path: '/tools/hash-text' }
  ],
  'password-security-guide': [
    { name: 'Password Strength Analyzer', path: '/tools/password-strength-analyser' },
    { name: 'Bcrypt Hash Generator', path: '/tools/bcrypt' }
  ],
  'cryptographic-hashes-guide': [
    { name: 'Hash Generator (SHA-256 & more)', path: '/tools/hash-text' },
    { name: 'Keccak-256 Hasher', path: '/tools/keccak256' }
  ],

  // Ethereum / blockchain
  'ethereum-units-explained': [
    { name: 'Ethereum Unit Converter', path: '/tools/evm-converter' }
  ],
  'eip-7702-ethereum-pectra-eoa-smart-contract-upgrade': [
    { name: 'Keccak-256 Hasher', path: '/tools/keccak256' },
    { name: 'ABI Encoder/Decoder', path: '/tools/abi-encoder' },
    { name: 'Function Selector Calculator', path: '/tools/function-selector' }
  ],
  'erc-7730-clear-signing-ethereum-standard': [
    { name: 'Ethereum Address Checksum (EIP-55)', path: '/tools/address-checksum' },
    { name: 'Keccak-256 Hasher', path: '/tools/keccak256' }
  ],
  'bip39-mnemonic-guide': [
    { name: 'BIP39 Mnemonic Generator', path: '/tools/bip39-generator' },
    { name: 'Multi-Chain Wallet Generator', path: '/tools/multi-chain-keys' }
  ],

  // Dev tooling guides
  'crontab-guide': [
    { name: 'Crontab Generator', path: '/tools/crontab-generator' }
  ],
  'http-status-codes-guide': [
    { name: 'HTTP Status Codes Reference', path: '/tools/http-status-codes' }
  ],
  'ipv4-subnetting-guide': [
    { name: 'IPv4 Subnet Calculator', path: '/tools/ipv4-subnet-calculator' }
  ],
  'case-conversion-guide': [
    { name: 'Case Converter', path: '/tools/case-converter' }
  ],
  'markdown-tips-tricks': [
    { name: 'Markdown Editor', path: '/tools/markdown' },
    { name: 'Markdown to HTML Converter', path: '/tools/markdown-to-html' }
  ],
  'git-commands-cheat-sheet': [
    { name: 'Git Cheat Sheet', path: '/tools/git-memo' }
  ],
  'color-formats-guide': [
    { name: 'Color Converter', path: '/tools/color-converter' }
  ],
  'docker-run-to-compose': [
    { name: 'Docker Run to Compose Converter', path: '/tools/docker-run-to-compose' }
  ],
  'unix-file-permissions': [
    { name: 'Chmod Calculator', path: '/tools/chmod-calculator' }
  ],

  // Site/toolkit roundups -> hub
  '5-privacy-focused-developer-tools': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'Hash Generator', path: '/tools/hash-text' },
    { name: 'JWT Decoder', path: '/tools/jwt' }
  ],
  'privacy-first-developer-tools-2026': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'Base64 Encoder/Decoder', path: '/tools/base64' },
    { name: 'AES Encryption Tool', path: '/tools/encryption' }
  ],
  'developer-tools-that-dont-spy-on-you': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'Image Compressor', path: '/tools/image' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' }
  ],
  '100-developer-tools-all-free-all-private': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'JSON Validator', path: '/tools/json-lint' },
    { name: 'UUID Generator', path: '/tools/uuid' }
  ],
  '100-plus-developer-tools-launch': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'Diff Checker', path: '/tools/diff' }
  ],
  'india-privacy-first-developer-toolkit-2026': [
    { name: 'All 100+ Tools', path: '/tools' },
    { name: 'Encryption Tool', path: '/tools/encryption' }
  ]
}
