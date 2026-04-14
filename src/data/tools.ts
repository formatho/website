export const tools = [
  {
    category: 'Blockchain',
    items: [
      {
        name: 'Multi-Chain Wallet',
        description: 'Generate keys & addresses for multiple blockchains from one mnemonic, derive addresses from keys, and validate checksums.',
        route: '/tools/multi-chain-keys',
        iconName: 'Link'
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
      }
    ]
  },
  {
    category: 'Crypto & Security',
    items: [
      {
        name: 'Token Generator',
        description: 'Generate secure random tokens with customizable length and character sets.',
        route: '/tools/token-generator',
        iconName: 'Key'
      },
      {
        name: 'Hash Text',
        description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.',
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
      }
    ]
  },
  {
    category: 'Converters',
    items: [
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
      },
      {
        name: 'URL Parser',
        description: 'Parse URLs into components and safely encode/decode query strings.',
        route: '/tools/url-parser',
        iconName: 'Link'
      },
      {
        name: 'User Agent Parser',
        description: 'Parse and analyze user agent strings.',
        route: '/tools/user-agent-parser',
        iconName: 'Smartphone'
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
        name: 'Chmod Calculator',
        description: 'Calculate Unix file permissions.',
        route: '/tools/chmod-calculator',
        iconName: 'Lock'
      },
      {
        name: 'Docker to Compose',
        description: 'Convert docker run commands to docker-compose.',
        route: '/tools/docker-run-to-compose-converter',
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
        description: 'Format and validate YAML documents.',
        route: '/tools/yaml-viewer',
        iconName: 'FileCode'
      },
      {
        name: 'Regex Tester',
        description: 'Test and debug regular expressions.',
        route: '/tools/regex-tester',
        iconName: 'Regex'
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
        name: 'Agent Orchestrator',
        description: 'Spin up AI workers with text. Manage AI agents locally.',
        route: '/tools/agent-orchestrator',
        iconName: 'Bot'
      },
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
