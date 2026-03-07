export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  content: string
  cta?: {
    title: string
    description: string
    link: string
    buttonText: string
  }
  relatedTools?: { name: string; description: string; link: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'UUID v1 vs v4: Which Should You Use?',
    excerpt: 'Understanding the key differences between UUID versions and when to use each for your projects.',
    date: '2026-03-07',
    readTime: '6 min',
    tags: ['UUID', 'Databases', 'Best Practices'],
    slug: 'uuid-v1-vs-v4',
    content: `<p>When generating unique identifiers in your applications, UUIDs (Universally Unique Identifiers) are often the go-to solution. But did you know there are different versions, each with distinct characteristics?</p>
<h2>What is a UUID?</h2>
<p>A UUID is a 128-bit number used to identify information in computer systems. The standard representation is 32 hexadecimal digits, displayed in five groups separated by hyphens.</p>
<h2>UUID v1: Time-Based</h2>
<p>Version 1 UUIDs are generated using the host's MAC address and the current timestamp.</p>
<ul><li><strong>Pros:</strong> Sortable by time, can determine creation order</li><li><strong>Cons:</strong> Privacy concerns (exposes MAC address)</li></ul>
<h2>UUID v4: Random</h2>
<p>Version 4 UUIDs are generated using random or pseudo-random numbers. They have 122 random bits.</p>
<ul><li><strong>Pros:</strong> No privacy concerns, no dependency on machine state</li><li><strong>Cons:</strong> Not sortable by time</li></ul>
<h2>When to Use Which?</h2>
<p>Use v1 when you need chronological ordering. Use v4 when privacy is important.</p>
<h2>Conclusion</h2>
<p>For most web applications, UUID v4 is the default choice due to its simplicity and privacy benefits.</p>`,
    cta: {
      title: 'Need to generate UUIDs?',
      description: 'Use our free UUID Generator to create v1, v4, and other UUID versions instantly.',
      link: '/uuid',
      buttonText: 'Try UUID Generator'
    },
    relatedTools: [
      { name: 'ULID Generator', description: 'Time-sortable unique identifiers', link: '/ulid-generator' },
      { name: 'Token Generator', description: 'Generate secure random tokens', link: '/token-generator' }
    ]
  },
  {
    id: 2,
    title: 'How Bcrypt Hashing Keeps Your User Passwords Safe',
    excerpt: 'A deep dive into bcrypt, the industry-standard password hashing algorithm.',
    date: '2026-03-06',
    readTime: '8 min',
    tags: ['Security', 'Passwords', 'Bcrypt'],
    slug: 'bcrypt-password-hashing-guide',
    content: `<p>Password security is the foundation of user trust. Storing passwords in plain text is a recipe for disaster. Enter bcrypt.</p>
<h2>What is Bcrypt?</h2>
<p>Bcrypt is a password hashing function designed in 1999. It's based on the Blowfish cipher and was specifically created to be slow—which is exactly what you want for password hashing.</p>
<h2>Why Slower is Better</h2>
<p>When an attacker obtains your password database, they'll try to crack the hashes. A slow hashing algorithm means each guess takes longer, dramatically increasing the cost of an attack.</p>
<h2>Key Features of Bcrypt</h2>
<ul><li><strong>Built-in Salt:</strong> Bcrypt automatically generates a unique salt for each password</li><li><strong>Adaptive Cost:</strong> The work factor is configurable (recommend 12+)</li><li><strong>Proven Track Record:</strong> 25+ years of cryptanalysis, still unbroken</li></ul>
<h2>Best Practices</h2>
<ul><li>Use a cost factor of at least 12</li><li>Never store plain-text passwords</li><li>Use a long, random pepper in addition to bcrypt</li></ul>
<h2>Conclusion</h2>
<p>Bcrypt remains the gold standard for password hashing. It's battle-tested and widely supported.</p>`,
    cta: {
      title: 'Test Bcrypt Hashing',
      description: 'Generate and verify bcrypt password hashes with our free, client-side tool.',
      link: '/bcrypt',
      buttonText: 'Try Bcrypt Generator'
    },
    relatedTools: [
      { name: 'Hash Text', description: 'MD5, SHA-1, SHA-256 hashing', link: '/hash-text' },
      { name: 'Password Strength Analyzer', description: 'Check password security', link: '/password-strength-analyser' }
    ]
  },
  {
    id: 3,
    title: "A Developer's Guide to Encoding and Decoding Base64",
    excerpt: 'Everything you need to know about Base64 encoding, from basic concepts to advanced use cases.',
    date: '2026-03-05',
    readTime: '7 min',
    tags: ['Encoding', 'Base64', 'Web Dev'],
    slug: 'base64-encoding-guide',
    content: `<p>Base64 is everywhere in web development—from embedding images in HTML to JWT tokens to email attachments.</p>
<h2>What is Base64?</h2>
<p>Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format. It uses 64 characters (A-Z, a-z, 0-9, +, /) plus = for padding.</p>
<h2>How It Works</h2>
<p>Base64 takes 3 bytes (24 bits) of binary data and converts them into 4 Base64 characters (6 bits each).</p>
<h2>Common Use Cases</h2>
<ul><li><strong>Data URLs:</strong> Embed small images directly in HTML/CSS</li><li><strong>JWT Tokens:</strong> Uses Base64URL encoding for header, payload, and signature</li><li><strong>Email Attachments:</strong> Binary attachments are Base64-encoded</li></ul>
<h2>Important Security Notes</h2>
<p><strong>Base64 is NOT encryption!</strong> It's trivially reversible. Never use Base64 to hide sensitive data.</p>
<h2>Conclusion</h2>
<p>Base64 is an essential tool in every developer's toolkit. Understanding when and how to use it will help you work with APIs and handle binary data.</p>`,
    cta: {
      title: 'Encode or Decode Base64',
      description: 'Use our free Base64 encoder/decoder that runs entirely in your browser.',
      link: '/base64',
      buttonText: 'Try Base64 Tool'
    },
    relatedTools: [
      { name: 'JWT Decoder', description: 'Decode and inspect JWT tokens', link: '/jwt' },
      { name: 'URL Encoder', description: 'Encode/decode URL strings', link: '/url-encoder' }
    ]
  },
  {
    id: 4,
    title: 'Why You Should Use ULIDs Instead of UUIDs in Your Database',
    excerpt: 'Discover how ULIDs combine the benefits of UUIDs with time-based sorting.',
    date: '2026-03-04',
    readTime: '6 min',
    tags: ['ULID', 'UUID', 'Databases'],
    slug: 'ulids-vs-uuids',
    content: `<p>UUIDs are great for uniqueness, but they have one major drawback: they're random. This causes problems in databases. ULIDs solve this elegantly.</p>
<h2>The Problem with UUID v4</h2>
<p>Random UUIDs create several database issues:</p>
<ul><li><strong>Fragmented indexes:</strong> Random insertion scatters data across B-tree pages</li><li><strong>Poor locality:</strong> Related records aren't stored near each other</li><li><strong>Slower writes:</strong> Each insert requires traversing the index tree</li></ul>
<h2>Enter ULIDs</h2>
<p>ULIDs are 128-bit identifiers that are:</p>
<ul><li><strong>Time-sortable:</strong> The first 48 bits are a timestamp</li><li><strong>URL-safe:</strong> Uses Crockford's Base32 encoding</li><li><strong>Monotonic:</strong> IDs generated in the same millisecond are ordered</li></ul>
<h2>Comparison</h2>
<table><tr><th>Feature</th><th>UUID v4</th><th>ULID</th></tr><tr><td>Sortable</td><td>No</td><td>Yes</td></tr><tr><td>URL-safe</td><td>Needs encoding</td><td>Yes</td></tr><tr><td>Length</td><td>36 chars</td><td>26 chars</td></tr></table>
<h2>Conclusion</h2>
<p>ULIDs give you the uniqueness of UUIDs with the ordering benefits of auto-increment integers.</p>`,
    cta: {
      title: 'Generate ULIDs',
      description: 'Try our ULID Generator to create time-sortable unique identifiers.',
      link: '/ulid-generator',
      buttonText: 'Try ULID Generator'
    },
    relatedTools: [
      { name: 'UUID Generator', description: 'Generate v1, v4 UUIDs', link: '/uuid' },
      { name: 'Token Generator', description: 'Secure random tokens', link: '/token-generator' }
    ]
  },
  {
    id: 5,
    title: 'Understanding JWT Tokens: A Complete Guide',
    excerpt: 'Learn how JSON Web Tokens work and common security pitfalls to avoid.',
    date: '2026-03-03',
    readTime: '9 min',
    tags: ['JWT', 'Authentication', 'Security'],
    slug: 'jwt-tokens-complete-guide',
    content: `<p>JSON Web Tokens (JWT) have become the standard for stateless authentication in modern web applications.</p>
<h2>What is a JWT?</h2>
<p>A JWT is a compact, URL-safe token format consisting of three Base64URL-encoded parts: header.payload.signature</p>
<h2>Common Claims</h2>
<ul><li><strong>iss:</strong> Issuer - who issued the token</li><li><strong>sub:</strong> Subject - who the token is about</li><li><strong>exp:</strong> Expiration - when token expires</li><li><strong>iat:</strong> Issued At - when token was created</li></ul>
<h2>Security Best Practices</h2>
<ul><li>Always verify the signature</li><li>Check exp and nbf claims</li><li>Never store sensitive data in JWTs (they're not encrypted!)</li><li>Use short expiration times</li></ul>
<h2>Conclusion</h2>
<p>JWTs are powerful but require careful implementation. Always validate tokens server-side.</p>`,
    cta: {
      title: 'Debug Your JWTs',
      description: 'Decode and inspect JWT tokens with our free client-side tool.',
      link: '/jwt',
      buttonText: 'Try JWT Decoder'
    },
    relatedTools: [
      { name: 'Base64 Encoder', description: 'Encode/decode Base64', link: '/base64' },
      { name: 'Hash Text', description: 'Generate hashes for secrets', link: '/hash-text' }
    ]
  },
  {
    id: 6,
    title: 'SQL Formatting Best Practices for Readable Code',
    excerpt: 'Learn why properly formatted SQL matters and discover the conventions that make your queries easier to read.',
    date: '2026-03-02',
    readTime: '5 min',
    tags: ['SQL', 'Best Practices', 'Code Quality'],
    slug: 'sql-formatting-best-practices',
    content: `<p>SQL is code, and like all code, it should be readable. Well-formatted SQL is easier to debug, review, and maintain.</p>
<h2>Why SQL Formatting Matters</h2>
<ul><li><strong>Code reviews:</strong> Reviewers can spot errors faster</li><li><strong>Debugging:</strong> Identify issues at a glance</li><li><strong>Collaboration:</strong> Team members understand each other's queries</li></ul>
<h2>Key Formatting Rules</h2>
<ul><li>Keywords on new lines</li><li>Consistent indentation</li><li>Uppercase keywords</li><li>One column per line for long lists</li></ul>
<h2>Conclusion</h2>
<p>Consistent SQL formatting is a sign of professional code. Use a formatter to standardize your queries.</p>`,
    cta: {
      title: 'Format Your SQL',
      description: 'Paste your SQL and get beautifully formatted output instantly.',
      link: '/sql',
      buttonText: 'Try SQL Formatter'
    },
    relatedTools: [
      { name: 'JSON Viewer', description: 'Format and view JSON', link: '/json-viewer' },
      { name: 'YAML Viewer', description: 'Format and view YAML', link: '/yaml-viewer' }
    ]
  },
  {
    id: 7,
    title: 'QR Codes Explained: How They Work and When to Use Them',
    excerpt: 'Discover the technology behind QR codes and learn best practices.',
    date: '2026-03-01',
    readTime: '6 min',
    tags: ['QR Codes', 'Mobile', 'Marketing'],
    slug: 'qr-codes-explained',
    content: `<p>QR codes (Quick Response codes) have become ubiquitous—from restaurant menus to payment systems.</p>
<h2>What is a QR Code?</h2>
<p>A QR code is a two-dimensional barcode that can store various types of data. Unlike traditional barcodes, QR codes store data in both dimensions.</p>
<h2>Error Correction Levels</h2>
<ul><li><strong>L (Low):</strong> 7% recovery - clean environments</li><li><strong>M (Medium):</strong> 15% recovery - standard use</li><li><strong>Q (Quartile):</strong> 25% recovery - some wear expected</li><li><strong>H (High):</strong> 30% recovery - logos/overlays</li></ul>
<h2>Common Use Cases</h2>
<ul><li>URLs - direct users to websites</li><li>vCards - share contact information</li><li>WiFi - share network credentials</li><li>Payments - mobile payment systems</li></ul>
<h2>Conclusion</h2>
<p>QR codes are versatile tools for bridging physical and digital experiences.</p>`,
    cta: {
      title: 'Generate QR Codes',
      description: 'Create QR codes for URLs, text, WiFi, and more with our free generator.',
      link: '/qr-code-generator',
      buttonText: 'Try QR Generator'
    },
    relatedTools: [
      { name: 'WiFi QR Generator', description: 'QR codes for WiFi networks', link: '/wifi-qr-code-generator' }
    ]
  },
  {
    id: 8,
    title: 'Regular Expressions: A Practical Cheat Sheet',
    excerpt: 'Master regex with this practical guide covering common patterns and real-world examples.',
    date: '2026-02-28',
    readTime: '7 min',
    tags: ['Regex', 'Text Processing', 'Reference'],
    slug: 'regex-practical-guide',
    content: `<p>Regular expressions (regex) are powerful pattern matching tools. Mastering a few key patterns will cover 90% of your use cases.</p>
<h2>Basic Syntax</h2>
<ul><li><code>.</code> - Any character</li><li><code>\\d</code> - Digit (0-9)</li><li><code>\\w</code> - Word character</li><li><code>\\s</code> - Whitespace</li><li><code>^</code> - Start of string</li><li><code>$</code> - End of string</li></ul>
<h2>Quantifiers</h2>
<ul><li><code>*</code> - 0 or more</li><li><code>+</code> - 1 or more</li><li><code>?</code> - 0 or 1 (optional)</li><li><code>{n}</code> - Exactly n</li></ul>
<h2>Common Patterns</h2>
<ul><li><strong>Email:</strong> [\\w.-]+@[\\w.-]+\\.\\w+</li><li><strong>Phone (US):</strong> \\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}</li><li><strong>URL:</strong> https?:\\/\\/[\\w.-]+</li></ul>
<h2>Conclusion</h2>
<p>Regex is a skill that improves with practice. Always test thoroughly!</p>`,
    cta: {
      title: 'Test Your Regex',
      description: 'Build and test regular expressions with real-time matching feedback.',
      link: '/regex-tester',
      buttonText: 'Try Regex Tester'
    },
    relatedTools: [
      { name: 'Regex Cheat Sheet', description: 'Quick regex reference', link: '/regex-memo' },
      { name: 'Slugify String', description: 'Create URL-safe slugs', link: '/slugify-string' }
    ]
  },
  {
    id: 9,
    title: 'Ethereum Unit Converter: Wei, Gwei, and Ether Explained',
    excerpt: 'Understanding Ethereum denominations is crucial for blockchain development.',
    date: '2026-02-27',
    readTime: '5 min',
    tags: ['Ethereum', 'Web3', 'Blockchain'],
    slug: 'ethereum-units-explained',
    content: `<p>Working with Ethereum requires understanding its denomination system.</p>
<h2>The Hierarchy</h2>
<p>1 Ether = 1,000,000,000,000,000,000 Wei (10^18)<br/>1 Ether = 1,000,000,000 Gwei (10^9)<br/>1 Gwei = 1,000,000,000 Wei (10^9)</p>
<h2>Complete Denomination Table</h2>
<table><tr><th>Unit</th><th>Wei Value</th><th>Common Use</th></tr><tr><td>Wei</td><td>1</td><td>Contract internals</td></tr><tr><td>Gwei</td><td>10^9</td><td>Gas prices</td></tr><tr><td>Ether</td><td>10^18</td><td>Standard unit</td></tr></table>
<h2>Conclusion</h2>
<p>Understanding Ethereum units prevents costly errors. Always double-check conversions.</p>`,
    cta: {
      title: 'Convert Ethereum Units',
      description: 'Instantly convert between Wei, Gwei, and Ether.',
      link: '/evm-converter',
      buttonText: 'Try EVM Converter'
    },
    relatedTools: [
      { name: 'Keccak-256 Hasher', description: 'Ethereum-standard hashing', link: '/keccak256' },
      { name: 'Address Checksum', description: 'EIP-55 address validation', link: '/address-checksum' }
    ]
  },
  {
    id: 10,
    title: 'Crontab Generator: Mastering Scheduled Tasks',
    excerpt: 'Learn how cron expressions work and best practices for scheduling automated tasks.',
    date: '2026-02-26',
    readTime: '6 min',
    tags: ['Cron', 'Automation', 'DevOps'],
    slug: 'crontab-guide',
    content: `<p>Cron is the time-based job scheduler in Unix-like systems.</p>
<h2>Cron Expression Syntax</h2>
<p>* * * * * = minute hour day-of-month month day-of-week</p>
<h2>Special Characters</h2>
<ul><li><code>*</code> - Any value</li><li><code>,</code> - Value list</li><li><code>-</code> - Range</li><li><code>/</code> - Step</li></ul>
<h2>Common Patterns</h2>
<ul><li><strong>Every minute:</strong> * * * * *</li><li><strong>Every hour:</strong> 0 * * * *</li><li><strong>Every day at midnight:</strong> 0 0 * * *</li><li><strong>Every 15 minutes:</strong> */15 * * * *</li></ul>
<h2>Conclusion</h2>
<p>Cron is powerful when used correctly. Always test expressions before deploying.</p>`,
    cta: {
      title: 'Generate Cron Expressions',
      description: 'Build cron expressions visually and see when they will run.',
      link: '/crontab-generator',
      buttonText: 'Try Crontab Generator'
    },
    relatedTools: [
      { name: 'Date-Time Converter', description: 'Convert timestamps', link: '/date-time-converter' }
    ]
  },
  {
    id: 11,
    title: 'Understanding HTTP Status Codes Every Developer Should Know',
    excerpt: 'A comprehensive guide to HTTP status codes and how to use them correctly.',
    date: '2026-02-25',
    readTime: '7 min',
    tags: ['HTTP', 'API', 'Web Dev'],
    slug: 'http-status-codes-guide',
    content: `<p>HTTP status codes are the language of web APIs. Using the right status code helps clients understand what happened.</p>
<h2>Status Code Categories</h2>
<ul><li><strong>1xx:</strong> Informational</li><li><strong>2xx:</strong> Success</li><li><strong>3xx:</strong> Redirection</li><li><strong>4xx:</strong> Client Error</li><li><strong>5xx:</strong> Server Error</li></ul>
<h2>Essential Codes</h2>
<ul><li><strong>200 OK:</strong> Standard success</li><li><strong>201 Created:</strong> Resource created</li><li><strong>400 Bad Request:</strong> Malformed request</li><li><strong>401 Unauthorized:</strong> Authentication required</li><li><strong>403 Forbidden:</strong> Not allowed</li><li><strong>404 Not Found:</strong> Resource doesn't exist</li><li><strong>500 Internal Error:</strong> Generic server error</li></ul>
<h2>Conclusion</h2>
<p>Proper status codes make your API intuitive and debuggable.</p>`,
    cta: {
      title: 'HTTP Status Code Reference',
      description: 'Quick reference for all HTTP status codes with examples.',
      link: '/http-status-codes',
      buttonText: 'View Status Codes'
    },
    relatedTools: [
      { name: 'URL Parser', description: 'Parse and analyze URLs', link: '/url-parser' }
    ]
  },
  {
    id: 12,
    title: 'JSON vs YAML vs TOML: Which Config Format Should You Use?',
    excerpt: 'Compare the three most popular configuration file formats.',
    date: '2026-02-24',
    readTime: '6 min',
    tags: ['JSON', 'YAML', 'Config'],
    slug: 'json-yaml-toml-comparison',
    content: `<p>Configuration files are everywhere in modern development. JSON, YAML, and TOML each have their strengths.</p>
<h2>JSON</h2>
<p>Pros: Universal support, strict syntax, fast parsing<br/>Cons: No comments, verbose</p>
<h2>YAML</h2>
<p>Pros: Human-readable, comments, anchors<br/>Cons: Whitespace-sensitive, complex spec</p>
<h2>TOML</h2>
<p>Pros: Clear syntax, comments, adopted in Rust/Python<br/>Cons: Less common in JS/Go</p>
<h2>When to Use Each</h2>
<ul><li><strong>JSON:</strong> APIs, package.json, strict data exchange</li><li><strong>YAML:</strong> Kubernetes, CI/CD, complex configs</li><li><strong>TOML:</strong> Rust, Python, simple configs</li></ul>
<h2>Conclusion</h2>
<p>Choose based on your ecosystem and needs.</p>`,
    cta: {
      title: 'Convert Between Formats',
      description: 'Convert JSON to YAML, YAML to JSON, and more.',
      link: '/json-yaml',
      buttonText: 'Try JSON-YAML Converter'
    },
    relatedTools: [
      { name: 'JSON Linter', description: 'Validate JSON', link: '/json-lint' },
      { name: 'YAML Linter', description: 'Validate YAML', link: '/yaml-lint' }
    ]
  },
  {
    id: 13,
    title: 'Password Security: How Strong is Your Password Really?',
    excerpt: 'Learn what makes a password secure and how attackers crack them.',
    date: '2026-02-23',
    readTime: '6 min',
    tags: ['Security', 'Passwords', 'Authentication'],
    slug: 'password-security-guide',
    content: `<p>"Password123" might meet your password policy requirements, but it's still incredibly weak.</p>
<h2>How Passwords Get Cracked</h2>
<ul><li><strong>Brute force:</strong> Try every combination</li><li><strong>Dictionary attack:</strong> Common words and variations</li><li><strong>Rainbow tables:</strong> Pre-computed hash lookups</li><li><strong>Credential stuffing:</strong> Reused passwords from breaches</li></ul>
<h2>What Makes Passwords Strong</h2>
<ul><li><strong>Length:</strong> Each character exponentially increases complexity</li><li><strong>Character variety:</strong> Mixed case, numbers, symbols</li><li><strong>Uniqueness:</strong> Different for each account</li></ul>
<h2>Password Policies That Work</h2>
<ul><li>Minimum 12 characters (not 8)</li><li>Check against breach databases</li><li>Encourage password managers</li></ul>
<h2>Conclusion</h2>
<p>Password security is about length and uniqueness, not arbitrary complexity rules.</p>`,
    cta: {
      title: 'Analyze Your Password',
      description: 'Check how strong your password is with our client-side analyzer.',
      link: '/password-strength-analyser',
      buttonText: 'Try Password Analyzer'
    },
    relatedTools: [
      { name: 'Bcrypt Generator', description: 'Hash passwords securely', link: '/bcrypt' },
      { name: 'Token Generator', description: 'Generate secure tokens', link: '/token-generator' }
    ]
  },
  {
    id: 14,
    title: 'IPv4 Subnetting Made Simple',
    excerpt: 'Master IPv4 subnetting with this practical guide.',
    date: '2026-02-22',
    readTime: '8 min',
    tags: ['Networking', 'IPv4', 'DevOps'],
    slug: 'ipv4-subnetting-guide',
    content: `<p>IPv4 subnetting is fundamental to networking.</p>
<h2>CIDR Notation</h2>
<p>192.168.1.0/24 means 24 bits for network, 8 bits for hosts = 256 addresses (254 usable)</p>
<h2>Common Subnet Masks</h2>
<table><tr><th>CIDR</th><th>Mask</th><th>Usable Hosts</th></tr><tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr><tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr><tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr><tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr></table>
<h2>Private IP Ranges</h2>
<ul><li>10.0.0.0/8</li><li>172.16.0.0/12</li><li>192.168.0.0/16</li></ul>
<h2>Conclusion</h2>
<p>Subnetting becomes intuitive with practice.</p>`,
    cta: {
      title: 'Calculate Subnets',
      description: 'Visual subnet calculator with all network details.',
      link: '/ipv4-subnet-calculator',
      buttonText: 'Try Subnet Calculator'
    },
    relatedTools: [
      { name: 'IPv4 Address Converter', description: 'Convert IP formats', link: '/ipv4-address-converter' }
    ]
  },
  {
    id: 15,
    title: 'Case Conversion: camelCase, snake_case, and Beyond',
    excerpt: 'Navigate the world of text case conventions.',
    date: '2026-02-21',
    readTime: '5 min',
    tags: ['Naming', 'Conventions', 'Code Style'],
    slug: 'case-conversion-guide',
    content: `<p>Different programming languages have different naming conventions.</p>
<h2>Common Cases</h2>
<table><tr><th>Case</th><th>Example</th><th>Used In</th></tr><tr><td>camelCase</td><td>userName</td><td>JavaScript, Java</td></tr><tr><td>PascalCase</td><td>UserName</td><td>Classes, React</td></tr><tr><td>snake_case</td><td>user_name</td><td>Python, Ruby</td></tr><tr><td>kebab-case</td><td>user-name</td><td>URLs, CSS</td></tr></table>
<h2>Conclusion</h2>
<p>Follow your language's conventions and be consistent.</p>`,
    cta: {
      title: 'Convert Text Cases',
      description: 'Convert between any case format instantly.',
      link: '/case-converter',
      buttonText: 'Try Case Converter'
    },
    relatedTools: [
      { name: 'Slugify String', description: 'Create URL-safe slugs', link: '/slugify-string' }
    ]
  },
  {
    id: 16,
    title: 'Understanding Cryptographic Hashes: MD5, SHA-1, SHA-256',
    excerpt: 'Learn how cryptographic hash functions work and which ones are safe.',
    date: '2026-02-20',
    readTime: '7 min',
    tags: ['Cryptography', 'Hashing', 'Security'],
    slug: 'cryptographic-hashes-guide',
    content: `<p>Hash functions are the unsung heroes of cryptography.</p>
<h2>What is a Hash Function?</h2>
<p>A hash function takes any input and produces a fixed-size output. Key properties: deterministic, fast, one-way, collision-resistant.</p>
<h2>Common Hash Algorithms</h2>
<table><tr><th>Algorithm</th><th>Status</th></tr><tr><td>MD5</td><td>Broken - don't use</td></tr><tr><td>SHA-1</td><td>Broken - don't use</td></tr><tr><td>SHA-256</td><td>Secure - recommended</td></tr><tr><td>SHA-512</td><td>Secure</td></tr></table>
<h2>When to Use Each</h2>
<ul><li><strong>File integrity:</strong> SHA-256</li><li><strong>Passwords:</strong> bcrypt, Argon2 (NOT SHA!)</li><li><strong>Digital signatures:</strong> SHA-256</li></ul>
<h2>Conclusion</h2>
<p>Use SHA-256 or stronger for general hashing. For passwords, use bcrypt or Argon2.</p>`,
    cta: {
      title: 'Generate Hashes',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly.',
      link: '/hash-text',
      buttonText: 'Try Hash Generator'
    },
    relatedTools: [
      { name: 'Bcrypt Generator', description: 'Secure password hashing', link: '/bcrypt' },
      { name: 'HMAC Generator', description: 'Keyed-hash message auth', link: '/hmac-generator' }
    ]
  },
  {
    id: 17,
    title: 'Markdown Tips and Tricks for Better Documentation',
    excerpt: 'Level up your Markdown skills with advanced formatting and best practices.',
    date: '2026-02-19',
    readTime: '6 min',
    tags: ['Markdown', 'Documentation', 'Writing'],
    slug: 'markdown-tips-tricks',
    content: `<p>Markdown has become the standard for technical documentation.</p>
<h2>Essential Syntax</h2>
<p># H1, ## H2, ### H3<br/>**bold**, *italic*, ~~strikethrough~~<br/>[link](url), ![image](src)</p>
<h2>Advanced Features</h2>
<ul><li>Task lists: - [x] done, - [ ] pending</li><li>Tables with | separators</li><li>Code blocks with syntax highlighting</li></ul>
<h2>Conclusion</h2>
<p>Markdown is simple to learn but has powerful extensions.</p>`,
    cta: {
      title: 'Write in Markdown',
      description: 'Full-featured Markdown editor with live preview.',
      link: '/markdown',
      buttonText: 'Try Markdown Editor'
    },
    relatedTools: [
      { name: 'Markdown to HTML', description: 'Convert Markdown to HTML', link: '/markdown-to-html' }
    ]
  },
  {
    id: 18,
    title: 'Git Commands You Should Know by Heart',
    excerpt: 'Essential Git commands for everyday development.',
    date: '2026-02-18',
    readTime: '7 min',
    tags: ['Git', 'Version Control', 'Dev Tools'],
    slug: 'git-commands-cheat-sheet',
    content: `<p>Git is essential for modern development.</p>
<h2>Essential Commands</h2>
<p>git init, git clone, git add, git commit, git push, git pull</p>
<h2>Branching</h2>
<p>git branch, git checkout -b, git merge, git branch -d</p>
<h2>Undoing Changes</h2>
<p>git restore, git reset, git revert</p>
<h2>Conclusion</h2>
<p>These commands cover 95% of daily Git work.</p>`,
    cta: {
      title: 'Git Command Reference',
      description: 'Complete Git cheat sheet with examples.',
      link: '/git-memo',
      buttonText: 'View Git Cheat Sheet'
    },
    relatedTools: [
      { name: 'Diff Tool', description: 'Compare text differences', link: '/diff' }
    ]
  },
  {
    id: 19,
    title: 'Understanding Color Formats: HEX, RGB, HSL Explained',
    excerpt: 'Navigate color formats for web development.',
    date: '2026-02-17',
    readTime: '5 min',
    tags: ['CSS', 'Colors', 'Design'],
    slug: 'color-formats-guide',
    content: `<p>Colors are fundamental to web design.</p>
<h2>HEX Colors</h2>
<p>#RRGGBB format, most common in CSS</p>
<h2>RGB and RGBA</h2>
<p>rgb(255, 0, 0), rgba(255, 0, 0, 0.5) for alpha</p>
<h2>HSL</h2>
<p>Hue (0-360), Saturation (%), Lightness (%) - intuitive for variations</p>
<h2>Conclusion</h2>
<p>HSL is often most intuitive for design systems, while HEX is most compact.</p>`,
    cta: {
      title: 'Convert Colors',
      description: 'Convert between HEX, RGB, HSL and more.',
      link: '/color-converter',
      buttonText: 'Try Color Converter'
    },
    relatedTools: []
  },
  {
    id: 20,
    title: 'Docker Run to Docker Compose: A Migration Guide',
    excerpt: 'Learn how to convert docker run commands to docker-compose.yml.',
    date: '2026-02-16',
    readTime: '6 min',
    tags: ['Docker', 'DevOps', 'Containers'],
    slug: 'docker-run-to-compose',
    content: `<p>Docker compose is better than docker run for reproducible deployments.</p>
<h2>Flag Mapping</h2>
<table><tr><th>Docker Run</th><th>Compose</th></tr><tr><td>-p 80:80</td><td>ports: - "80:80"</td></tr><tr><td>-v /path:/path</td><td>volumes: - /path:/path</td></tr><tr><td>-e VAR=value</td><td>environment: VAR: value</td></tr></table>
<h2>Conclusion</h2>
<p>Docker Compose makes your setup reproducible and version-controllable.</p>`,
    cta: {
      title: 'Convert Docker Commands',
      description: 'Convert docker run to docker-compose.yml automatically.',
      link: '/docker-run-to-compose',
      buttonText: 'Try Converter'
    },
    relatedTools: [
      { name: 'Git Cheat Sheet', description: 'Git command reference', link: '/git-memo' }
    ]
  },
  {
    id: 21,
    title: 'BIP39 Mnemonic Phrases: Understanding Seed Words',
    excerpt: 'Learn how BIP39 mnemonic phrases work for cryptocurrency wallets.',
    date: '2026-02-15',
    readTime: '6 min',
    tags: ['Crypto', 'BIP39', 'Security'],
    slug: 'bip39-mnemonic-guide',
    content: `<p>BIP39 mnemonic phrases are the standard for cryptocurrency wallet backups.</p>
<h2>How It Works</h2>
<p>Generate entropy, add checksum, map to 2048-word list</p>
<h2>Word Count and Security</h2>
<table><tr><th>Words</th><th>Security</th></tr><tr><td>12</td><td>128 bits</td></tr><tr><td>24</td><td>256 bits</td></tr></table>
<h2>Security Warning</h2>
<p>Anyone with your mnemonic can access your wallet. Never share or photograph seed words.</p>
<h2>Conclusion</h2>
<p>BIP39 mnemonics make wallet backup accessible while maintaining strong security.</p>`,
    cta: {
      title: 'Generate BIP39 Mnemonics',
      description: 'Create BIP39 mnemonic phrases for testing.',
      link: '/bip39-generator',
      buttonText: 'Try BIP39 Generator'
    },
    relatedTools: [
      { name: 'Multi-Chain Keys', description: 'Keys from one mnemonic', link: '/multi-chain-keys' }
    ]
  },
  {
    id: 22,
    title: 'Text Encoding vs Encryption: Know the Difference',
    excerpt: 'A critical distinction - encoding is not encryption.',
    date: '2026-02-14',
    readTime: '5 min',
    tags: ['Security', 'Encryption', 'Encoding'],
    slug: 'encoding-vs-encryption',
    content: `<p>One of the most common security mistakes is treating encoding as encryption.</p>
<h2>Encoding</h2>
<p>Purpose: Data representation, compatibility. No key required. Always reversible. Examples: Base64, URL encoding.</p>
<h2>Encryption</h2>
<p>Purpose: Confidentiality, security. Key required. Only reversible with key. Examples: AES, RSA.</p>
<h2>Quick Test</h2>
<p>Ask yourself: "Can anyone reverse this without a secret?" If yes, it's encoding, not encryption.</p>
<h2>Conclusion</h2>
<p>Never confuse encoding with encryption. Encoding is about format; encryption is about security.</p>`,
    cta: {
      title: 'Try Both Tools',
      description: 'Encode with Base64 or encrypt with AES.',
      link: '/base64',
      buttonText: 'Try Tools'
    },
    relatedTools: [
      { name: 'Base64 Encoder', description: 'Encode/decode Base64', link: '/base64' },
      { name: 'Text Encryption', description: 'AES encryption', link: '/encryption' }
    ]
  },
  {
    id: 23,
    title: 'Understanding Unix File Permissions: chmod Calculator',
    excerpt: 'Demystify Unix file permissions with this guide.',
    date: '2026-02-13',
    readTime: '5 min',
    tags: ['Linux', 'Permissions', 'DevOps'],
    slug: 'unix-file-permissions',
    content: `<p>Unix file permissions control who can read, write, and execute files.</p>
<h2>Permission Categories</h2>
<ul><li><strong>User (u):</strong> File owner</li><li><strong>Group (g):</strong> File's group members</li><li><strong>Others (o):</strong> Everyone else</li></ul>
<h2>The Three Permissions</h2>
<ul><li><strong>Read (r=4):</strong> View contents</li><li><strong>Write (w=2):</strong> Modify contents</li><li><strong>Execute (x=1):</strong> Run as program</li></ul>
<h2>Common Values</h2>
<ul><li>755: Executable scripts, directories</li><li>644: Configuration files</li><li>600: Private files (SSH keys)</li></ul>
<h2>Conclusion</h2>
<p>Understanding permissions prevents security issues. Use least privilege.</p>`,
    cta: {
      title: 'Calculate Permissions',
      description: 'Visual chmod calculator for any permission combination.',
      link: '/chmod-calculator',
      buttonText: 'Try Chmod Calculator'
    },
    relatedTools: [
      { name: 'Git Cheat Sheet', description: 'Git commands', link: '/git-memo' }
    ]
  }
]

// Sort by date descending
blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
