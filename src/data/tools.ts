export const tools = [
  {
    category: 'Blockchain',
    items: [
      {
        name: 'Vanity Address Generator',
        description: 'Generate Ethereum addresses with a custom prefix or suffix. Keys are created in your browser and never transmitted.',
        route: '/tools/vanity-eth',
        iconName: 'Sparkles'
      },
      {
        name: 'Cosmos Account Reader',
        description: 'ATOM and token balances, delegations, and rewards for any Cosmos SDK account - plus a bech32 converter for every chain prefix.',
        route: '/tools/cosmos-reader',
        iconName: 'Globe'
      },
      {
        name: 'Solana Account Reader',
        description: 'Look up Solana accounts, decode SPL token accounts, and derive PDAs - client-side via any Solana RPC.',
        route: '/tools/solana-account-reader',
        iconName: 'Search'
      },
      {
        name: 'Polkadot Substrate Reader',
        description: 'Substrate chain info, raw storage queries, and SS58 address conversion for Polkadot, Kusama, and local nodes.',
        route: '/tools/polkadot-reader',
        iconName: 'Network'
      },
      {
        name: 'Cardano Address Reader',
        description: 'ADA balance, UTxO count, and stake info for any Cardano address via the keyless Koios API.',
        route: '/tools/cardano-reader',
        iconName: 'Coins'
      },
      {
        name: 'EVM Contract Reader',
        description: 'Paste an ABI and call view functions on any deployed contract via your own RPC endpoint. Works on every EVM chain.',
        route: '/tools/contract-reader',
        iconName: 'BookOpen'
      },
      {
        name: 'Function Selector Calculator',
        description: 'Compute 4-byte Solidity function selectors from signatures with Keccak-256. Batch mode for ABI work.',
        route: '/tools/function-selector',
        iconName: 'FunctionSquare'
      },
      {
        name: 'ENS Namehash Calculator',
        description: 'Derive EIP-137 namehash and labelhash values for any ENS name, with the full derivation chain.',
        route: '/tools/ens-namehash',
        iconName: 'Network'
      },
      {
        name: 'Cosmos Address Generator',
        description: 'Generate addresses for Cosmos Hub (ATOM), Osmosis (OSMO), Juno (JUNO), Akash (AKT), Injective (INJ), Kava, Stargaze, Secret Network and more from BIP39 seed phrases.',
        route: '/tools/cosmos-address-generator',
        iconName: 'Globe'
      },
      {
        name: 'Multi-Chain Wallet',
        description: 'Generate keys & addresses for multiple blockchains from one mnemonic, derive addresses from keys, and validate checksums.',
        route: '/tools/multi-chain-keys',
        iconName: 'Link'
      },
      {
        name: 'Address Checksum (EIP-55)',
        description: 'Validate and checksum Ethereum addresses. Prevent spoofed address attacks.',
        route: '/tools/address-checksum',
        iconName: 'Shield'
      },
      {
        name: 'EVM Unit Converter',
        description: 'Convert between Wei, Gwei, and Ether.',
        route: '/tools/evm-converter',
        iconName: 'ArrowRightLeft'
      },
      {
        name: 'Keccak-256 Hasher',
        description: 'Generate Keccak-256 hashes for Ethereum.',
        route: '/tools/keccak256',
        iconName: 'Hash'
      },
      {
        name: 'Solidity to Opcodes',
        description: 'Compile Solidity to EVM opcodes.',
        route: '/tools/solidity-to-opcodes',
        iconName: 'Code'
      },
      {
        name: 'ABI Encoder & Decoder',
        description: 'Encode/decode Solidity ABI parameters, function selectors, and transaction calldata.',
        route: '/tools/abi-encoder',
        iconName: 'Binary'
      },
      {
        name: 'RWA Asset Swap',
        description: 'Swap RWA tokens, stablecoins, and native assets across 15+ EVM chains. Cross-chain routing via LI.FI.',
        route: '/tools/rwa-swap',
        iconName: 'Zap'
      },
      {
        name: 'RWA Tokenization Lab',
        description: 'Deploy ERC-20 mirror tokens for stocks (AAPL, AMZN), fractional ownership contracts, and custom tokenization contracts on-chain via MetaMask or Rabby.',
        route: '/tools/rwa-deploy-lab',
        iconName: 'Building2'
      },
      {
        name: 'Private Key to Address Converter',
        description: 'Derive addresses for Ethereum, Bitcoin, Solana, and more from a private key. Runs entirely in browser.',
        route: '/tools/address-from-key',
        iconName: 'KeyRound'
      },
      {
        name: 'BLS12-381 Signature Generator & Verifier',
        description: 'Generate BLS12-381 signatures, verify signatures, and aggregate multiple signatures into one. 100% client-side, privacy-first.',
        route: '/tools/bls-signature',
        iconName: 'Signature'
      }
    ]
  },
  {
    category: 'Crypto & Security',
    items: [
      {
        name: 'SAML Request & Response Decoder',
        description: 'Decode SAML AuthnRequest and Response messages - base64 plus raw-deflate - with pretty-printed XML. Essential for Okta, Entra ID and Shibboleth debugging. 100% client-side.',
        route: '/tools/saml-decoder',
        iconName: 'FileCode'
      },
      {
        name: 'OIDC Authorization URL & PKCE Generator',
        description: 'Build OAuth 2.0 / OIDC authorize URLs with state, nonce and S256 PKCE code challenges. Works with Okta, Auth0, Entra ID, Keycloak.',
        route: '/tools/oidc-url-builder',
        iconName: 'Link2'
      },
      {
        name: 'Token Generator',
        description: 'Generate secure random tokens with customizable length and character sets.',
        route: '/tools/token-generator',
        iconName: 'Key'
      },
      {
        name: 'Hash Text',
        description: 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side Argon2id password hashing for maximum security.',
        route: '/tools/hash-text',
        iconName: 'Hash'
      },
      {
        name: 'Bcrypt',
        description: 'Generate and verify Bcrypt password hashes.',
        route: '/tools/bcrypt',
        iconName: 'Lock'
      },
      {
        name: 'UUID Generator',
        description: 'Generate UUIDs (Universally Unique Identifiers). Supports v1, v4, and more.',
        route: '/tools/uuid',
        iconName: 'Fingerprint'
      },
      {
        name: 'ULID Generator',
        description: 'Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers).',
        route: '/tools/ulid-generator',
        iconName: 'Fingerprint'
      },
      {
        name: 'Encrypt/Decrypt',
        description: 'Encrypt and decrypt text using various algorithms.',
        route: '/tools/encryption',
        iconName: 'LockKeyhole'
      },
      {
        name: 'BIP39 Passphrase',
        description: 'Generate BIP39 mnemonic phrases for cryptocurrency wallets.',
        route: '/tools/bip39-generator',
        iconName: 'Wallet'
      },
      {
        name: 'HMAC Generator',
        description: 'Generate HMAC hash codes with various algorithms.',
        route: '/tools/hmac-generator',
        iconName: 'Hash'
      },
      {
        name: 'RSA Key Pair',
        description: 'Generate RSA public/private key pairs.',
        route: '/tools/rsa-key-pair-generator',
        iconName: 'KeyRound'
      },
      {
        name: 'Password Strength',
        description: 'Analyze password strength and get improvement suggestions.',
        route: '/tools/password-strength-analyser',
        iconName: 'ShieldCheck'
      },
      {
        name: 'AI Crypto Price Forecasts',
        description: '30-day crypto price predictions using Google TimesFM 2.5. Privacy-first AI forecasts for BTC, ETH, SOL, and more.',
        route: '/tools/crypto-forecasts',
        iconName: 'TrendingUp'
      },
      {
        name: 'TOTP Generator',
        description: 'Generate TOTP codes from secrets. Privacy-first tool.',
        route: '/tools/otp-code-generator',
        iconName: 'Clock'
      },
      {
        name: 'PDF Signature Checker',
        description: 'Check and validate digital signatures in PDF files. Privacy-first tool.',
        route: '/tools/pdf-signature-checker',
        iconName: 'FileCheck'
      }
    ]
  },
  {
    category: 'Converters',
    items: [
      {
        name: 'Unix Timestamp Converter',
        description: 'Convert Unix timestamps to human-readable dates. Live clock with seconds-since counter and current time in both formats.',
        route: '/tools/unix-timestamp',
        iconName: 'Timer'
      },
      {
        name: 'Date-Time Converter',
        description: 'Convert dates and times between different formats and timezones.',
        route: '/tools/date-time-converter',
        iconName: 'Calendar'
      },
      {
        name: 'Integer Base Converter',
        description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
        route: '/tools/integer-base-converter',
        iconName: 'Binary'
      },
      {
        name: 'Roman Numerals',
        description: 'Convert between Roman numerals and Arabic numbers.',
        route: '/tools/roman-numeral-converter',
        iconName: 'Hash'
      },
      {
        name: 'Base64 String',
        description: 'Encode and decode Base64 strings instantly.',
        route: '/tools/base64',
        iconName: 'FileCode'
      },
      {
        name: 'Base64 File',
        description: 'Convert files to and from Base64 encoding.',
        route: '/tools/base64-file-converter',
        iconName: 'FileCode'
      },
      {
        name: 'Color Converter',
        description: 'Convert colors between HEX, RGB, HSL, and other formats.',
        route: '/tools/color-converter',
        iconName: 'Palette'
      },
      {
        name: 'Case Converter',
        description: 'Convert text between different cases (camelCase, snake_case, etc.).',
        route: '/tools/case-converter',
        iconName: 'CaseSensitive'
      },
      {
        name: 'Text to NATO',
        description: 'Convert text to NATO phonetic alphabet.',
        route: '/tools/text-to-nato-alphabet',
        iconName: 'Radio'
      },
      {
        name: 'Text to Binary',
        description: 'Convert text to binary and vice versa.',
        route: '/tools/text-to-binary',
        iconName: 'Binary'
      },
      {
        name: 'JSON <> YAML',
        description: 'Convert JSON to YAML and YAML to JSON instantly.',
        route: '/tools/json-yaml',
        iconName: 'FileJson'
      },
      {
        name: 'JSON <> CSV',
        description: 'Convert JSON to CSV and CSV to JSON format instantly.',
        route: '/tools/json-csv',
        iconName: 'FileSpreadsheet'
      },
      {
        name: 'Temperature',
        description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine.',
        route: '/tools/temperature-converter',
        iconName: 'Thermometer'
      },
      {
        name: 'XML ↔ JSON',
        description: 'Bi-directional XML to JSON converter with real-time conversion and clipboard support.',
        route: '/tools/xml-json',
        iconName: 'Code'
      },
      {
        name: 'BPMN to Visio',
        description: 'Convert BPMN process diagrams into Microsoft Visio compatible formats.',
        route: '/tools/bpmn-to-visio',
        iconName: 'Workflow'
      },
      {
        name: 'Visio File Viewer',
        description: 'View Microsoft Visio diagrams (.vsdx, .vsd) directly in your browser.',
        route: '/tools/visio-viewer',
        iconName: 'FileImage'
      },
      {
        name: 'json-to-toml',
        description: 'json-to-toml - free, privacy-first, and 100% client-side.',
        route: '/tools/json-to-toml',
        iconName: 'ArrowLeftRight'
      },
      {
        name: 'List Converter',
        description: 'Convert lists between different formats (comma, newline, JSON, etc).',
        route: '/tools/list-converter',
        iconName: 'List'
      },
      {
        name: 'Markdown to HTML Converter',
        description: 'Convert Markdown to HTML with syntax highlighting.',
        route: '/tools/markdown-to-html',
        iconName: 'FileCode'
      },
      {
        name: 'Text to Unicode Converter',
        description: 'Convert text to Unicode code points and HTML entities.',
        route: '/tools/text-to-unicode',
        iconName: 'Languages'
      },
      {
        name: 'TOML to JSON Converter',
        description: 'Convert TOML configuration files to JSON format.',
        route: '/tools/toml-to-json',
        iconName: 'ArrowLeftRight'
      },
      {
        name: 'TOML to YAML Converter',
        description: 'Convert TOML configuration files to YAML format.',
        route: '/tools/toml-to-yaml',
        iconName: 'ArrowLeftRight'
      },
      {
        name: 'YAML to TOML Converter',
        description: 'Convert YAML configuration files to TOML format.',
        route: '/tools/yaml-to-toml',
        iconName: 'ArrowLeftRight'
      }
    ]
  },
  {
    category: 'Web & Network',
    items: [
      {
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URL strings.',
        route: '/tools/url-encoder',
        iconName: 'Link'
      },
      {
        name: 'HTML Entities',
        description: 'Encode and decode HTML entities.',
        route: '/tools/html-entities',
        iconName: 'Code'
      },
      {
        name: 'URL Parser',
        description: 'Parse and analyze URLs to extract components.',
        route: '/tools/url-parser',
        iconName: 'Link'
      },
      {
        name: 'Device Information',
        description: 'View your browser and device information.',
        route: '/tools/device-information',
        iconName: 'Monitor'
      },
      {
        name: 'Basic Auth Generator',
        description: 'Generate HTTP Basic Authentication headers.',
        route: '/tools/basic-auth-generator',
        iconName: 'Key'
      },
      {
        name: 'Meta Tag Generator',
        description: 'Generate HTML meta tags for SEO.',
        route: '/tools/meta-tag-generator',
        iconName: 'Tag'
      },
      {
        name: 'JWT Debugger',
        description: 'Decode and inspect JWT tokens instantly.',
        route: '/tools/jwt',
        iconName: 'Key'
      },
      {
        name: 'Keycode Info',
        description: 'Find keyboard keycodes for JavaScript events.',
        route: '/tools/keycode-info',
        iconName: 'Keyboard'
      },
      {
        name: 'Slugify',
        description: 'Convert text to URL-friendly slugs.',
        route: '/tools/slugify-string',
        iconName: 'Link'
      },
      {
        name: 'User Agent Parser',
        description: 'Parse and analyze user agent strings.',
        route: '/tools/user-agent-parser',
        iconName: 'Smartphone'
      },
      {
        name: 'HTTP Status Codes',
        description: 'Reference for HTTP status codes and their meanings.',
        route: '/tools/http-status-codes',
        iconName: 'Server'
      },
      {
        name: 'JSON Diff',
        description: 'Compare two JSON objects and see differences.',
        route: '/tools/json-diff',
        iconName: 'GitCompare'
      }
    ]
  },
  {
    category: 'Images & Media',
    items: [
      {
        name: 'QR Code Generator',
        description: 'Generate QR codes from text or URLs.',
        route: '/tools/qr-code-generator',
        iconName: 'QrCode'
      },
      {
        name: 'WiFi QR Code',
        description: 'Generate QR codes for WiFi network credentials.',
        route: '/tools/wifi-qr-code-generator',
        iconName: 'Wifi'
      },
      {
        name: 'Image Compressor',
        description: 'Compress and optimize images.',
        route: '/tools/image',
        iconName: 'ImageDown'
      },
      {
        name: 'Camera Recorder',
        description: 'Record video from your webcam.',
        route: '/tools/camera-recorder',
        iconName: 'Video'
      }
    ]
  },
  {
    category: 'Development',
    items: [
      {
        name: 'Git Cheat Sheet',
        description: 'Quick reference for common Git commands.',
        route: '/tools/git-memo',
        iconName: 'GitBranch'
      },
      {
        name: 'Crontab Generator',
        description: 'Generate cron expressions with a visual builder.',
        route: '/tools/crontab-generator',
        iconName: 'Clock'
      },
      {
        name: 'JSON Viewer',
        description: 'Format and visualize JSON data.',
        route: '/tools/json-viewer',
        iconName: 'FileJson'
      },
      {
        name: 'JSON Minify',
        description: 'Minify JSON to reduce size.',
        route: '/tools/json-minify',
        iconName: 'Minimize'
      },
      {
        name: 'SQL Formatter',
        description: 'Format and beautify SQL queries.',
        route: '/tools/sql',
        iconName: 'Database'
      },
      {
        name: 'SQL to ER Diagram',
        description: 'Convert CREATE TABLE SQL into interactive ER diagrams with relationship mapping.',
        route: '/tools/sql-to-er-diagram',
        iconName: 'Table2'
      },
      {
        name: 'SQL Query Plan',
        description: 'Visualize SQL execution plans and get optimization tips.',
        route: '/tools/sql-query-plan-visualizer',
        iconName: 'Zap'
      },
      {
        name: 'SQL Dialect Converter',
        description: 'Convert SQL between PostgreSQL, MySQL, SQLite, T-SQL, BigQuery, and more.',
        route: '/tools/sql-dialect-converter',
        iconName: 'Repeat'
      },
      {
        name: 'Foreign Key Visualizer',
        description: 'Map foreign key relationships and find orphaned tables in your schema.',
        route: '/tools/foreign-key-visualizer',
        iconName: 'Link2'
      },
      {
        name: 'Chmod Calculator',
        description: 'Calculate Unix file permissions.',
        route: '/tools/chmod-calculator',
        iconName: 'Lock'
      },
      {
        name: 'Docker to Compose',
        description: 'Convert docker run commands to docker-compose.',
        route: '/tools/docker-run-to-compose',
        iconName: 'Container'
      },
      {
        name: 'XML Formatter',
        description: 'Format and prettify XML documents.',
        route: '/tools/xml-formatter',
        iconName: 'FileCode'
      },
      {
        name: 'YAML Viewer',
        description: 'YAML linter and validator. Format, validate, and beautify YAML documents with real-time syntax checking.',
        route: '/tools/yaml-viewer',
        iconName: 'FileCode'
      },
      {
        name: 'Regex Tester',
        description: 'Test and debug regular expressions.',
        route: '/tools/regex-tester',
        iconName: 'Regex'
      },
      {
        name: 'Mermaid Diagram Viewer',
        description: 'Render Mermaid diagrams in real-time. Flowcharts, sequence diagrams, class diagrams, gantt charts, and more.',
        route: '/tools/mermaid-viewer',
        iconName: 'GitBranch'
      },
      {
        name: 'benchmark-builder',
        description: 'benchmark-builder - free, privacy-first, and 100% client-side.',
        route: '/tools/benchmark-builder',
        iconName: 'Gauge'
      },
      {
        name: 'BPMN Viewer',
        description: 'Visualize BPMN 2.0 diagrams and export them as PDF. Free, privacy-first BPMN viewer that runs entirely in your browser.',
        route: '/tools/bpmn',
        iconName: 'Workflow'
      },
      {
        name: 'email-normalizer',
        description: 'email-normalizer - free, privacy-first, and 100% client-side.',
        route: '/tools/email-normalizer',
        iconName: 'Mail'
      },
      {
        name: 'html-wysiwyg-editor',
        description: 'html-wysiwyg-editor - free, privacy-first, and 100% client-side.',
        route: '/tools/html-wysiwyg-editor',
        iconName: 'Code'
      },
      {
        name: 'mime-types',
        description: 'mime-types - free, privacy-first, and 100% client-side.',
        route: '/tools/mime-types',
        iconName: 'FileType'
      },
      {
        name: 'Random Port Generator',
        description: 'Generate random port numbers for development.',
        route: '/tools/random-port-generator',
        iconName: 'Dices'
      },
      {
        name: 'Regex Cheat Sheet',
        description: 'Regular expression patterns and syntax reference.',
        route: '/tools/regex-memo',
        iconName: 'Regex'
      },
      {
        name: 'safelink-decoder',
        description: 'safelink-decoder - free, privacy-first, and 100% client-side.',
        route: '/tools/safelink-decoder',
        iconName: 'Link2'
      }
    ]
  },
  {
    category: 'Network Tools',
    items: [
      {
        name: 'IPv4 Subnet Calculator',
        description: 'Calculate IPv4 subnets, network ranges, and available hosts.',
        route: '/tools/ipv4-subnet-calculator',
        iconName: 'Calculator'
      },
      {
        name: 'IPv4 Address Converter',
        description: 'Convert IPv4 addresses between formats.',
        route: '/tools/ipv4-address-converter',
        iconName: 'ArrowRightLeft'
      },
      {
        name: 'IPv4 Range Expander',
        description: 'Expand IPv4 address ranges into individual IPs.',
        route: '/tools/ipv4-range-expander',
        iconName: 'Expand'
      },
      {
        name: 'MAC Address Lookup',
        description: 'Look up MAC address vendor information.',
        route: '/tools/mac-address-lookup',
        iconName: 'Search'
      },
      {
        name: 'MAC Address Generator',
        description: 'Generate random MAC addresses.',
        route: '/tools/mac-address-generator',
        iconName: 'Fingerprint'
      },
      {
        name: 'IPv6 ULA Generator',
        description: 'Generate IPv6 Unique Local Addresses.',
        route: '/tools/ipv6-ula-generator',
        iconName: 'Globe'
      }
    ]
  },
  {
    category: 'Math & Calculators',
    items: [
      {
        name: 'Math Evaluator',
        description: 'Evaluate mathematical expressions.',
        route: '/tools/math-evaluator',
        iconName: 'Calculator'
      },
      {
        name: 'Quantum Circuit Simulator',
        description: 'Design and simulate quantum circuits with real quantum gates. Perfect for learning quantum computing concepts.',
        route: '/tools/quantum-circuit-simulator',
        iconName: 'Calculator'
      },
      {
        name: 'ETA Calculator',
        description: 'Calculate estimated time of arrival.',
        route: '/tools/eta-calculator',
        iconName: 'Clock'
      },
      {
        name: 'Percentage Calculator',
        description: 'Calculate percentages, increases, and decreases.',
        route: '/tools/percentage-calculator',
        iconName: 'Percent'
      },
      {
        name: 'chronometer',
        description: 'chronometer - free, privacy-first, and 100% client-side.',
        route: '/tools/chronometer',
        iconName: 'Timer'
      }
    ]
  },
  {
    category: 'Text Tools',
    items: [
      {
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for designs.',
        route: '/tools/lorem',
        iconName: 'Text'
      },
      {
        name: 'Markdown Editor',
        description: 'Edit and preview Markdown files in real-time.',
        route: '/tools/markdown',
        iconName: 'FileText'
      },
      {
        name: 'Diff Checker',
        description: 'Compare two texts and see differences.',
        route: '/tools/diff',
        iconName: 'GitCompare'
      },
      {
        name: 'Text Statistics',
        description: 'Count characters, words, sentences, and paragraphs.',
        route: '/tools/text-statistics',
        iconName: 'BarChart3'
      },
      {
        name: 'Emoji Picker',
        description: 'Browse and copy emojis.',
        route: '/tools/emoji-picker',
        iconName: 'Smile'
      },
      {
        name: 'String Obfuscator',
        description: 'Obfuscate strings to hide sensitive data.',
        route: '/tools/string-obfuscator',
        iconName: 'EyeOff'
      },
      {
        name: 'ASCII Art',
        description: 'Convert text to ASCII art.',
        route: '/tools/ascii-text-drawer',
        iconName: 'Type'
      },
      {
        name: 'numeronym-generator',
        description: 'numeronym-generator - free, privacy-first, and 100% client-side.',
        route: '/tools/numeronym-generator',
        iconName: 'Hash'
      },
      {
        name: 'SVG Placeholder Generator',
        description: 'Generate SVG placeholder images.',
        route: '/tools/svg-placeholder-generator',
        iconName: 'Image'
      }
    ]
  },
  {
    category: 'Data Validation',
    items: [
      {
        name: 'Phone Parser',
        description: 'Parse and format phone numbers.',
        route: '/tools/phone-parser',
        iconName: 'Phone'
      },
      {
        name: 'IBAN Validator',
        description: 'Validate and parse International Bank Account Numbers.',
        route: '/tools/iban-validator',
        iconName: 'CheckCircle'
      },
      {
        name: 'JSON Linter',
        description: 'Validate and lint JSON code.',
        route: '/tools/json-lint',
        iconName: 'CheckCircle'
      },
      {
        name: 'YAML Linter',
        description: 'Validate and lint YAML code.',
        route: '/tools/yaml-lint',
        iconName: 'CheckCircle'
      }
    ]
  },
  {
    category: 'Artificial Intelligence',
    items: [
      {
        name: 'Agent Identity Generator',
        description: 'Instantly generate unique personas, traits, and system prompts for AI agents.',
        route: '/tools/agent-identity-generator',
        iconName: 'UserCircle'
      },
      {
        name: 'Local Token Counter',
        description: 'Client-side LLM token counter. 100% private, no API calls.',
        route: '/tools/local-token-counter',
        iconName: 'Hash'
      }
    ]
  }
]
