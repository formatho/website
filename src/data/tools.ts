/**
 * Tool directory - the single source of truth for tool categorization.
 * 6 categories, 122 tools. Consumed by: HomeView, ToolsView (directory),
 * CategoryView, GlobalSearch, AppLayout, useSEO, generate-llms-txt.
 * Tool page URLs are defined in router/index.ts and NEVER change here.
 */
export interface ToolItem {
  name: string
  description: string
  route: string
  iconName: string
}

export interface ToolCategory {
  category: string
  slug: string
  route: string
  icon: string
  blurb: string
  items: ToolItem[]
}

export const categoryMeta = {
  'web3': { name: 'Web3 & Blockchain', slug: 'web3', route: '/category/web3', icon: '🔗', blurb: 'EVM contract reader with Uniswap presets, vanity address generator, multi-chain readers for Solana, Polkadot, Cardano and Cosmos, Keccak-256 hasher, ABI tools, ENS calculator, and chain-specific tool pages.' },
  'security': { name: 'Security & Auth', slug: 'security', route: '/category/security', icon: '🔐', blurb: 'Hash generators, JWT debugger, SAML decoder, OIDC builder, encryption, TOTP, password analysis, and credential tools - all client-side.' },
  'data': { name: 'Data Formats', slug: 'data-formats', route: '/category/data-formats', icon: '📊', blurb: 'JSON, YAML, XML, TOML, and CSV validators, formatters, converters, and diff tools. Plus UUID, ULID, Base64, and IBAN validators.' },
  'dev': { name: 'Developer Tools', slug: 'developer', route: '/category/developer', icon: '🛠️', blurb: 'SQL formatting and schema tools, Git and regex references, Docker conversion, Mermaid viewer, image compression, and Markdown editor.' },
  'converters': { name: 'Converters & Calculators', slug: 'converters', route: '/category/converters', icon: '🔄', blurb: 'Unix timestamp, date-time, number base, color, case, temperature, NATO alphabet, binary, and unicode converters. Plus math, ETA, and percentage calculators.' },
  'network': { name: 'Network & Web', slug: 'network', route: '/category/network', icon: '🌐', blurb: 'IPv4 subnet calculator, MAC address tools, IPv6 ULA generator, URL encoder/parser, HTTP status codes, QR code generator, and device info.' },
} as const

export const tools: ToolCategory[] = [
  {
    category: 'Web3 & Blockchain',
    slug: 'web3',
    route: '/category/web3',
    icon: '🔗',
    blurb: 'EVM contract reader with Uniswap presets, vanity address generator, multi-chain readers for Solana, Polkadot, Cardano and Cosmos, Keccak-256 hasher, ABI tools, ENS calculator, and chain-specific tool pages.',
    items: [
      { name: 'Impermanent Loss Calculator', description: 'Calculate IL for any price change. Compare HODL vs LP value with fee offset analysis.', route: '/tools/impermanent-loss', iconName: 'TrendingDown' },
      { name: 'ERC-4626 Vault Calculator', description: 'Convert vault shares to assets, calculate share price and projected returns for Morpho, Yearn, and any ERC-4626 vault.', route: '/tools/vault-calculator', iconName: 'Landmark' },
      { name: 'APY Calculator', description: 'Convert APR to APY with any compounding frequency. Compare DeFi yields accurately.', route: '/tools/apy-calculator', iconName: 'Percent' },
      { name: 'Vanity Address Generator', description: 'Generate Ethereum addresses with a custom prefix or suffix. Keys are created in your browser and never transmitted.', route: '/tools/vanity-eth', iconName: 'Sparkles' },
      { name: 'EVM Contract Reader', description: 'Paste an ABI and call view functions on any deployed contract via your own RPC endpoint. Works on every EVM chain.', route: '/tools/contract-reader', iconName: 'BookOpen' },
      { name: 'Solana Account Reader', description: 'Look up Solana accounts, decode SPL token accounts, and derive PDAs - client-side via any Solana RPC.', route: '/tools/solana-account-reader', iconName: 'Search' },
      { name: 'Polkadot Substrate Reader', description: 'Substrate chain info, raw storage queries, and SS58 address conversion for Polkadot, Kusama, and local nodes.', route: '/tools/polkadot-reader', iconName: 'Network' },
      { name: 'Cardano Address Reader', description: 'ADA balance, UTxO count, and stake info for any Cardano address via the keyless Koios API.', route: '/tools/cardano-reader', iconName: 'Coins' },
      { name: 'Cosmos Account Reader', description: 'ATOM and token balances, delegations, and rewards for any Cosmos SDK account - plus a bech32 converter for every chain prefix.', route: '/tools/cosmos-reader', iconName: 'Globe' },
      { name: 'Function Selector Calculator', description: 'Compute 4-byte Solidity function selectors from signatures with Keccak-256. Batch mode for ABI work.', route: '/tools/function-selector', iconName: 'FunctionSquare' },
      { name: 'ENS Namehash Calculator', description: 'Derive EIP-137 namehash and labelhash values for any ENS name, with the full derivation chain.', route: '/tools/ens-namehash', iconName: 'Network' },
      { name: 'Cosmos Address Generator', description: 'Generate addresses for Cosmos Hub (ATOM), Osmosis (OSMO), Juno (JUNO), Akash (AKT), Injective (INJ), Kava, Stargaze, Secret Network and more from BIP39 seed phrases.', route: '/tools/cosmos-address-generator', iconName: 'Globe' },
      { name: 'Multi-Chain Wallet', description: 'Generate keys & addresses for multiple blockchains from one mnemonic, derive addresses from keys, and validate checksums.', route: '/tools/multi-chain-keys', iconName: 'Link' },
      { name: 'Address Checksum (EIP-55)', description: 'Validate and checksum Ethereum addresses. Prevent spoofed address attacks.', route: '/tools/address-checksum', iconName: 'Shield' },
      { name: 'EVM Unit Converter', description: 'Convert between Wei, Gwei, and Ether.', route: '/tools/evm-converter', iconName: 'ArrowRightLeft' },
      { name: 'Keccak-256 Hasher', description: 'Generate Keccak-256 hashes for Ethereum.', route: '/tools/keccak256', iconName: 'Hash' },
      { name: 'Solidity to Opcodes', description: 'Compile Solidity to EVM opcodes.', route: '/tools/solidity-to-opcodes', iconName: 'Code' },
      { name: 'ABI Encoder & Decoder', description: 'Encode/decode Solidity ABI parameters, function selectors, and transaction calldata.', route: '/tools/abi-encoder', iconName: 'Binary' },
      { name: 'RWA Asset Swap', description: 'Swap RWA tokens, stablecoins, and native assets across 15+ EVM chains. Cross-chain routing via LI.FI.', route: '/tools/rwa-swap', iconName: 'Zap' },
      { name: 'RWA Tokenization Lab', description: 'Deploy ERC-20 mirror tokens for stocks (AAPL, AMZN), fractional ownership contracts, and custom tokenization contracts on-chain via MetaMask or Rabby.', route: '/tools/rwa-deploy-lab', iconName: 'Building2' },
      { name: 'Private Key to Address Converter', description: 'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser.', route: '/tools/address-from-key', iconName: 'KeyRound' },
      { name: 'BLS12-381 Signature Generator & Verifier', description: 'Generate BLS12-381 signatures, verify signatures, and aggregate multiple signatures into one. 100% client-side, privacy-first.', route: '/tools/bls-signature', iconName: 'Signature' },
      { name: 'BIP39 Passphrase', description: 'Generate BIP39 mnemonic phrases for cryptocurrency wallets.', route: '/tools/bip39-generator', iconName: 'Wallet' },
      { name: 'AI Crypto Price Forecasts', description: '30-day crypto price predictions using Google TimesFM 2.5. Privacy-first AI forecasts for BTC, ETH, SOL, and more.', route: '/tools/crypto-forecasts', iconName: 'TrendingUp' },
    ]
  },
  {
    category: 'Security & Auth',
    slug: 'security',
    route: '/category/security',
    icon: '🔐',
    blurb: 'Hash generators, JWT debugger, SAML decoder, OIDC builder, encryption, TOTP, password analysis, and credential tools - all client-side.',
    items: [
      { name: 'Security Headers Analyzer', description: 'Check HSTS, CSP, X-Frame-Options and more on any URL. Graded A-F with fix recommendations.', route: '/tools/security-headers', iconName: 'ShieldCheck' },
      { name: 'CSP Generator', description: 'Build Content-Security-Policy headers visually. Configure directives and copy the header.', route: '/tools/csp-generator', iconName: 'Shield' },
      { name: 'CSP Evaluator', description: 'Analyze a CSP header for weaknesses: unsafe-inline, wildcards, missing directives, bypass risks.', route: '/tools/csp-evaluator', iconName: 'ScanSearch' },
      { name: 'CORS Tester', description: 'Test cross-origin requests from your browser. See Access-Control-Allow-Origin, methods and headers.', route: '/tools/cors-tester', iconName: 'Globe' },
      { name: 'Cookie Security Analyzer', description: 'Check Set-Cookie headers for Secure, HttpOnly, SameSite, prefixes and domain scope.', route: '/tools/cookie-analyzer', iconName: 'Cookie' },
      { name: 'JWT & Auth Toolkit', description: 'Complete auth debugging suite: decode and verify JWTs, inspect claims, build OIDC URLs, decode SAML, generate tokens. All client-side.', route: '/tools/jwt-suite', iconName: 'Key' },
      { name: 'SAML Request & Response Decoder', description: 'Decode SAML AuthnRequest and Response messages - base64 plus raw-deflate - with pretty-printed XML. Essential for Okta, Entra ID and Shibboleth debugging. 100% client-side.', route: '/tools/saml-decoder', iconName: 'FileCode' },
      { name: 'OIDC Authorization URL & PKCE Generator', description: 'Build OAuth 2.0 / OIDC authorize URLs with state, nonce and S256 PKCE code challenges. Works with Okta, Auth0, Entra ID, Keycloak.', route: '/tools/oidc-url-builder', iconName: 'Link2' },
      { name: 'JWT Debugger', description: 'Decode and inspect JWT tokens instantly.', route: '/tools/jwt', iconName: 'Key' },
      { name: 'Hash Text', description: 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side Argon2id password hashing for maximum security.', route: '/tools/hash-text', iconName: 'Hash' },
      { name: 'Bcrypt', description: 'Generate and verify Bcrypt password hashes.', route: '/tools/bcrypt', iconName: 'Lock' },
      { name: 'Encrypt/Decrypt', description: 'Encrypt and decrypt text using various algorithms.', route: '/tools/encryption', iconName: 'LockKeyhole' },
      { name: 'HMAC Generator', description: 'Generate HMAC hash codes with various algorithms.', route: '/tools/hmac-generator', iconName: 'Hash' },
      { name: 'RSA Key Pair', description: 'Generate RSA public/private key pairs.', route: '/tools/rsa-key-pair-generator', iconName: 'KeyRound' },
      { name: 'Password Strength', description: 'Analyze password strength and get improvement suggestions.', route: '/tools/password-strength-analyser', iconName: 'ShieldCheck' },
      { name: 'TOTP Generator', description: 'Generate TOTP codes from secrets. Privacy-first tool.', route: '/tools/otp-code-generator', iconName: 'Clock' },
      { name: 'PDF Signature Checker', description: 'Check and validate digital signatures in PDF files. Privacy-first tool.', route: '/tools/pdf-signature-checker', iconName: 'FileCheck' },
      { name: 'Token Generator', description: 'Generate secure random tokens with customizable length and character sets.', route: '/tools/token-generator', iconName: 'Key' },
      { name: 'Basic Auth Generator', description: 'Generate HTTP Basic Authentication headers.', route: '/tools/basic-auth-generator', iconName: 'Key' },
      { name: 'String Obfuscator', description: 'Obfuscate strings to hide sensitive data.', route: '/tools/string-obfuscator', iconName: 'EyeOff' },
    ]
  },
  {
    category: 'Data Formats',
    slug: 'data-formats',
    route: '/category/data-formats',
    icon: '📊',
    blurb: 'JSON, YAML, XML, TOML, and CSV validators, formatters, converters, and diff tools. Plus UUID, ULID, Base64, and IBAN validators.',
    items: [
      { name: 'JSON Viewer', description: 'Format and visualize JSON data.', route: '/tools/json-viewer', iconName: 'FileJson' },
      { name: 'JSON Linter', description: 'Validate and lint JSON code.', route: '/tools/json-lint', iconName: 'CheckCircle' },
      { name: 'JSON Minify', description: 'Minify JSON to reduce size.', route: '/tools/json-minify', iconName: 'Minimize' },
      { name: 'JSON <> YAML', description: 'Convert JSON to YAML and YAML to JSON instantly.', route: '/tools/json-yaml', iconName: 'FileJson' },
      { name: 'JSON <> CSV', description: 'Convert JSON to CSV and CSV to JSON format instantly.', route: '/tools/json-csv', iconName: 'FileSpreadsheet' },
      { name: 'JSON Diff', description: 'Compare two JSON objects and see differences.', route: '/tools/json-diff', iconName: 'GitCompare' },
      { name: 'XML Formatter', description: 'Format and prettify XML documents.', route: '/tools/xml-formatter', iconName: 'FileCode' },
      { name: 'XML ↔ JSON', description: 'Bi-directional XML to JSON converter with real-time conversion and clipboard support.', route: '/tools/xml-json', iconName: 'Code' },
      { name: 'YAML Linter', description: 'Validate and lint YAML code.', route: '/tools/yaml-lint', iconName: 'CheckCircle' },
      { name: 'YAML Viewer', description: 'YAML linter and validator. Format, validate, and beautify YAML documents with real-time syntax checking.', route: '/tools/yaml-viewer', iconName: 'FileCode' },
      { name: 'TOML to JSON Converter', description: 'Convert TOML configuration files to JSON format.', route: '/tools/toml-to-json', iconName: 'ArrowLeftRight' },
      { name: 'JSON to TOML Converter', description: 'json-to-toml - free, privacy-first, and 100% client-side.', route: '/tools/json-to-toml', iconName: 'ArrowLeftRight' },
      { name: 'TOML to YAML Converter', description: 'Convert TOML configuration files to YAML format.', route: '/tools/toml-to-yaml', iconName: 'ArrowLeftRight' },
      { name: 'YAML to TOML Converter', description: 'Convert YAML configuration files to TOML format.', route: '/tools/yaml-to-toml', iconName: 'ArrowLeftRight' },
      { name: 'UUID Generator', description: 'Generate UUIDs (Universally Unique Identifiers). Supports v1, v4, and more.', route: '/tools/uuid', iconName: 'Fingerprint' },
      { name: 'ULID Generator', description: 'Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers).', route: '/tools/ulid-generator', iconName: 'Fingerprint' },
      { name: 'Base64 String', description: 'Encode and decode Base64 strings instantly.', route: '/tools/base64', iconName: 'FileCode' },
      { name: 'Base64 File', description: 'Convert files to and from Base64 encoding.', route: '/tools/base64-file-converter', iconName: 'FileCode' },
      { name: 'Phone Parser', description: 'Parse and format phone numbers.', route: '/tools/phone-parser', iconName: 'Phone' },
      { name: 'IBAN Validator', description: 'Validate and parse International Bank Account Numbers.', route: '/tools/iban-validator', iconName: 'CheckCircle' },
      { name: 'Email Normalizer', description: 'email-normalizer - free, privacy-first, and 100% client-side.', route: '/tools/email-normalizer', iconName: 'Mail' },
      { name: 'List Converter', description: 'Convert lists between different formats (comma, newline, JSON, etc).', route: '/tools/list-converter', iconName: 'List' },
    ]
  },
  {
    category: 'Developer Tools',
    slug: 'developer',
    route: '/category/developer',
    icon: '🛠️',
    blurb: 'SQL formatting and schema tools, Git and regex references, Docker conversion, Mermaid viewer, image compression, and Markdown editor.',
    items: [
      { name: 'Git Cheat Sheet', description: 'Quick reference for common Git commands.', route: '/tools/git-memo', iconName: 'GitBranch' },
      { name: 'Crontab Generator', description: 'Generate cron expressions with a visual builder.', route: '/tools/crontab-generator', iconName: 'Clock' },
      { name: 'SQL Formatter', description: 'Format and beautify SQL queries.', route: '/tools/sql', iconName: 'Database' },
      { name: 'SQL to ER Diagram', description: 'Convert CREATE TABLE SQL into interactive ER diagrams with relationship mapping.', route: '/tools/sql-to-er-diagram', iconName: 'Table2' },
      { name: 'SQL Query Plan', description: 'Visualize SQL execution plans and get optimization tips.', route: '/tools/sql-query-plan-visualizer', iconName: 'Zap' },
      { name: 'SQL Dialect Converter', description: 'Convert SQL between PostgreSQL, MySQL, SQLite, T-SQL, BigQuery, and more.', route: '/tools/sql-dialect-converter', iconName: 'Repeat' },
      { name: 'Foreign Key Visualizer', description: 'Map foreign key relationships and find orphaned tables in your schema.', route: '/tools/foreign-key-visualizer', iconName: 'Link2' },
      { name: 'Chmod Calculator', description: 'Calculate Unix file permissions.', route: '/tools/chmod-calculator', iconName: 'Lock' },
      { name: 'Docker to Compose', description: 'Convert docker run commands to docker-compose.', route: '/tools/docker-run-to-compose', iconName: 'Container' },
      { name: 'Regex Tester', description: 'Test and debug regular expressions.', route: '/tools/regex-tester', iconName: 'Regex' },
      { name: 'Regex Cheat Sheet', description: 'Regular expression patterns and syntax reference.', route: '/tools/regex-memo', iconName: 'Regex' },
      { name: 'Mermaid Diagram Viewer', description: 'Render Mermaid diagrams in real-time. Flowcharts, sequence diagrams, class diagrams, gantt charts, and more.', route: '/tools/mermaid-viewer', iconName: 'GitBranch' },
      { name: 'Performance Benchmark', description: 'benchmark-builder - free, privacy-first, and 100% client-side.', route: '/tools/benchmark-builder', iconName: 'Gauge' },
      { name: 'BPMN Viewer', description: 'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser.', route: '/tools/bpmn', iconName: 'Workflow' },
      { name: 'BPMN to Visio', description: 'Convert BPMN process diagrams into Microsoft Visio compatible formats.', route: '/tools/bpmn-to-visio', iconName: 'Workflow' },
      { name: 'Visio File Viewer', description: 'View Microsoft Visio diagrams (.vsdx, .vsd) directly in your browser.', route: '/tools/visio-viewer', iconName: 'FileImage' },
      { name: 'Html Wysiwyg Editor', description: 'html-wysiwyg-editor - free, privacy-first, and 100% client-side.', route: '/tools/html-wysiwyg-editor', iconName: 'Code' },
      { name: 'MIME Type Lookup', description: 'mime-types - free, privacy-first, and 100% client-side.', route: '/tools/mime-types', iconName: 'FileType' },
      { name: 'Markdown Editor', description: 'Edit and preview Markdown files in real-time.', route: '/tools/markdown', iconName: 'FileText' },
      { name: 'Markdown to HTML Converter', description: 'Convert Markdown to HTML with syntax highlighting.', route: '/tools/markdown-to-html', iconName: 'FileCode' },
      { name: 'Text Diff Checker', description: 'Compare two texts and see differences.', route: '/tools/diff', iconName: 'GitCompare' },
      { name: 'Text Statistics', description: 'Count characters, words, sentences, and paragraphs.', route: '/tools/text-statistics', iconName: 'BarChart3' },
      { name: 'Image Compressor', description: 'Compress and optimize images.', route: '/tools/image', iconName: 'ImageDown' },
      { name: 'Camera Recorder', description: 'Record video from your webcam.', route: '/tools/camera-recorder', iconName: 'Video' },
      { name: 'SVG Placeholder Generator', description: 'Generate SVG placeholder images.', route: '/tools/svg-placeholder-generator', iconName: 'Image' },
      { name: 'Agent Identity Generator', description: 'Instantly generate unique personas, traits, and system prompts for AI agents.', route: '/tools/agent-identity-generator', iconName: 'UserCircle' },
      { name: 'Local Token Counter', description: 'Client-side LLM token counter. 100% private, no API calls.', route: '/tools/local-token-counter', iconName: 'Hash' },
      { name: 'Meta Tag Generator', description: 'Generate HTML meta tags for SEO.', route: '/tools/meta-tag-generator', iconName: 'Tag' },
    ]
  },
  {
    category: 'Converters & Calculators',
    slug: 'converters',
    route: '/category/converters',
    icon: '🔄',
    blurb: 'Unix timestamp, date-time, number base, color, case, temperature, NATO alphabet, binary, and unicode converters. Plus math, ETA, and percentage calculators.',
    items: [
      { name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates. Live clock with seconds-since counter and current time in both formats.', route: '/tools/unix-timestamp', iconName: 'Timer' },
      { name: 'Date-Time Converter', description: 'Convert dates and times between different formats and timezones.', route: '/tools/date-time-converter', iconName: 'Calendar' },
      { name: 'Integer Base Converter', description: 'Convert numbers between binary, octal, decimal, and hexadecimal.', route: '/tools/integer-base-converter', iconName: 'Binary' },
      { name: 'Roman Numerals', description: 'Convert between Roman numerals and Arabic numbers.', route: '/tools/roman-numeral-converter', iconName: 'Hash' },
      { name: 'Color Converter', description: 'Convert colors between HEX, RGB, HSL, and other formats.', route: '/tools/color-converter', iconName: 'Palette' },
      { name: 'Case Converter', description: 'Convert text between different cases (camelCase, snake_case, etc.).', route: '/tools/case-converter', iconName: 'CaseSensitive' },
      { name: 'Text to NATO', description: 'Convert text to NATO phonetic alphabet.', route: '/tools/text-to-nato-alphabet', iconName: 'Radio' },
      { name: 'Text to Binary', description: 'Convert text to binary and vice versa.', route: '/tools/text-to-binary', iconName: 'Binary' },
      { name: 'Text to Unicode Converter', description: 'Convert text to Unicode code points and HTML entities.', route: '/tools/text-to-unicode', iconName: 'Languages' },
      { name: 'Temperature', description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine.', route: '/tools/temperature-converter', iconName: 'Thermometer' },
      { name: 'Math Evaluator', description: 'Evaluate mathematical expressions.', route: '/tools/math-evaluator', iconName: 'Calculator' },
      { name: 'ETA Calculator', description: 'Calculate estimated time of arrival.', route: '/tools/eta-calculator', iconName: 'Clock' },
      { name: 'Percentage Calculator', description: 'Calculate percentages, increases, and decreases.', route: '/tools/percentage-calculator', iconName: 'Percent' },
      { name: 'Chronometer', description: 'chronometer - free, privacy-first, and 100% client-side.', route: '/tools/chronometer', iconName: 'Timer' },
      { name: 'Quantum Circuit Simulator', description: 'Design and simulate quantum circuits with real quantum gates. Perfect for learning quantum computing concepts.', route: '/tools/quantum-circuit-simulator', iconName: 'Calculator' },
      { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for designs.', route: '/tools/lorem', iconName: 'Text' },
      { name: 'Emoji Picker', description: 'Browse and copy emojis.', route: '/tools/emoji-picker', iconName: 'Smile' },
      { name: 'ASCII Art', description: 'Convert text to ASCII art.', route: '/tools/ascii-text-drawer', iconName: 'Type' },
      { name: 'Numeronym Generator', description: 'numeronym-generator - free, privacy-first, and 100% client-side.', route: '/tools/numeronym-generator', iconName: 'Hash' },
      { name: 'Keycode Info', description: 'Find keyboard keycodes for JavaScript events.', route: '/tools/keycode-info', iconName: 'Keyboard' },
    ]
  },
  {
    category: 'Network & Web',
    slug: 'network',
    route: '/category/network',
    icon: '🌐',
    blurb: 'IPv4 subnet calculator, MAC address tools, IPv6 ULA generator, URL encoder/parser, HTTP status codes, QR code generator, and device info.',
    items: [
      { name: 'IPv4 Subnet Calculator', description: 'Calculate IPv4 subnets, network ranges, and available hosts.', route: '/tools/ipv4-subnet-calculator', iconName: 'Calculator' },
      { name: 'IPv4 Address Converter', description: 'Convert IPv4 addresses between formats.', route: '/tools/ipv4-address-converter', iconName: 'ArrowRightLeft' },
      { name: 'IPv4 Range Expander', description: 'Expand IPv4 address ranges into individual IPs.', route: '/tools/ipv4-range-expander', iconName: 'Expand' },
      { name: 'MAC Address Lookup', description: 'Look up MAC address vendor information.', route: '/tools/mac-address-lookup', iconName: 'Search' },
      { name: 'MAC Address Generator', description: 'Generate random MAC addresses.', route: '/tools/mac-address-generator', iconName: 'Fingerprint' },
      { name: 'IPv6 ULA Generator', description: 'Generate IPv6 Unique Local Addresses.', route: '/tools/ipv6-ula-generator', iconName: 'Globe' },
      { name: 'URL Encoder/Decoder', description: 'Encode and decode URL strings.', route: '/tools/url-encoder', iconName: 'Link' },
      { name: 'URL Parser', description: 'Parse and analyze URLs to extract components.', route: '/tools/url-parser', iconName: 'Link' },
      { name: 'HTML Entities', description: 'Encode and decode HTML entities.', route: '/tools/html-entities', iconName: 'Code' },
      { name: 'Device Information', description: 'View your browser and device information.', route: '/tools/device-information', iconName: 'Monitor' },
      { name: 'User Agent Parser', description: 'Parse and analyze user agent strings.', route: '/tools/user-agent-parser', iconName: 'Smartphone' },
      { name: 'HTTP Status Codes', description: 'Reference for HTTP status codes and their meanings.', route: '/tools/http-status-codes', iconName: 'Server' },
      { name: 'Slugify', description: 'Convert text to URL-friendly slugs.', route: '/tools/slugify-string', iconName: 'Link' },
      { name: 'QR Code Generator', description: 'Generate QR codes from text or URLs.', route: '/tools/qr-code-generator', iconName: 'QrCode' },
      { name: 'WiFi QR Code', description: 'Generate QR codes for WiFi network credentials.', route: '/tools/wifi-qr-code-generator', iconName: 'Wifi' },
      { name: 'Random Port Generator', description: 'Generate random port numbers for development.', route: '/tools/random-port-generator', iconName: 'Dices' },
      { name: 'Outlook Safelink Decoder', description: 'safelink-decoder - free, privacy-first, and 100% client-side.', route: '/tools/safelink-decoder', iconName: 'Link2' },
    ]
  },
]
