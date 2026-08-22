/**
 * FAQ data for structured data injection.
 * Each entry maps a route path to its FAQ Q&A pairs.
 * Used by inject-tool-meta.js to add FAQPage JSON-LD.
 */

export const generalToolFAQ = [
  {
    question: `Is this tool free to use?`,
    answer: `Yes! This tool is 100% free. No signup, no credit card, no limits. It's part of Formatho's privacy-first developer toolkit.`
  },
  {
    question: `Is my data safe? Does this tool send data to a server?`,
    answer: `Absolutely. This tool runs entirely in your browser. Your data never leaves your device. Zero server-side processing, zero tracking.`
  },
  {
    question: `Does this tool work offline?`,
    answer: `Once the page loads, the tool works completely offline since all processing happens client-side in your browser.`
  },
  {
    question: `Do I need to install any software?`,
    answer: `No installation required. Simply open the tool in any modern web browser and start using it immediately.`
  }
]

export const toolSpecificFAQ = {
  '/tools/json-viewer': [
    {
      question: 'How do I format and validate JSON?',
      answer: 'Paste your JSON into the viewer and it automatically formats, validates, and displays it in a readable tree structure. Syntax errors are highlighted instantly.'
    },
    {
      question: 'Can I use this JSON viewer with large files?',
      answer: 'Yes, the Formatho JSON viewer handles large JSON files efficiently with virtualized rendering, all client-side in your browser.'
    }
  ],
  '/tools/base64': [
    {
      question: 'How do I encode text to Base64?',
      answer: 'Paste your text into the input field and the Base64 encoded output appears instantly. Decoding works the same way in reverse.'
    },
    {
      question: 'Is Base64 encoding secure?',
      answer: 'Base64 is an encoding scheme, not encryption. It provides no security. Use it for data transport, not for protecting sensitive information.'
    }
  ],
  '/tools/uuid': [
    {
      question: 'What UUID versions are supported?',
      answer: 'The Formatho UUID generator supports UUID v1 (timestamp-based), v4 (random), v5 (namespace + SHA-1), and v7 (timestamp + random). All generated locally in your browser.'
    },
    {
      question: 'Are generated UUIDs unique?',
      answer: 'Yes. UUID v4 uses 122 bits of randomness making collisions astronomically unlikely. UUID v1 combines timestamp with MAC address for uniqueness.'
    }
  ],
  '/tools/jwt': [
    {
      question: 'Is it safe to paste my JWT token?',
      answer: 'Yes. The JWT decoder runs entirely in your browser. Your token is never sent to any server. It is decoded locally using JavaScript.'
    },
    {
      question: 'What JWT algorithms are supported?',
      answer: 'The decoder supports HS256, HS384, HS512, RS256, RS384, RS512, and none algorithms for header and payload decoding.'
    }
  ],
  '/tools/hash-text': [
    {
      question: 'What hash algorithms are available?',
      answer: 'Formatho supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, Argon2id, bcrypt, and PBKDF2 — all computed locally in your browser.'
    },
    {
      question: 'Can I use this for password hashing?',
      answer: 'Yes. Use Argon2id or bcrypt for password hashing. These are slow key-derivation functions designed to resist brute-force attacks.'
    }
  ],
  '/tools/sql': [
    {
      question: 'What SQL dialects are supported?',
      answer: 'The SQL formatter supports standard SQL, MySQL, PostgreSQL, SQLite, MS SQL Server, Oracle, and more with proper keyword capitalization and indentation.'
    }
  ],
  '/tools/qr-code-generator': [
    {
      question: 'Can I generate QR codes for WiFi networks?',
      answer: 'Yes. The QR code generator supports WiFi credentials, URLs, text, email, phone, SMS, and vCard QR code types.'
    },
    {
      question: 'What size QR codes can I generate?',
      answer: 'You can generate QR codes from 128x128 to 1024x1024 pixels with customizable colors and error correction levels.'
    }
  ],
  '/tools/regex-tester': [
    {
      question: 'What regex flavors are supported?',
      answer: 'The regex tester uses JavaScript regex engine supporting global, case-insensitive, multiline, and other standard flags.'
    }
  ],
  '/tools/bcrypt': [
    {
      question: 'What bcrypt cost factor should I use?',
      answer: 'A cost factor of 12-14 is recommended for production use as of 2026. Higher values are more secure but slower.'
    }
  ],
  '/tools/json-yaml': [
    {
      question: 'Can I convert between JSON and YAML bidirectionally?',
      answer: 'Yes. Paste JSON to get YAML output, or paste YAML to get JSON. The converter handles both directions automatically.'
    }
  ]
}

/**
 * Get FAQ entries for a given route path
 */
export function getFAQForRoute(routePath) {
  const specific = toolSpecificFAQ[routePath] || []
  return [...generalToolFAQ, ...specific]
}


/**
 * Visible SEO content rendered on tool pages below the tool.
 * Keyed by route path. Shared by the Vue app (ToolPageLayout) so the
 * visible page always matches the FAQPage structured data above.
 */
export const toolSEOContent = {
  '/tools/base64': {
    intro: [
      'Base64 is an encoding scheme that represents binary data using 64 ASCII characters, making it safe to transmit through systems that only handle text — email attachments, JSON payloads, data URIs, and HTTP headers. Developers reach for Base64 constantly: embedding images in CSS, encoding API credentials, or packaging binary files into JSON.',
      'This encoder and decoder runs entirely in your browser. Nothing you paste is ever uploaded, logged, or stored — important when you are encoding API keys, tokens, or customer data. It fully supports UTF-8, so emojis and non-Latin text encode and decode correctly.'
    ],
    howTo: [
      'Paste or type your text into the input field on the left.',
      'The Base64-encoded result appears instantly in the output panel.',
      'To decode, paste Base64 into the input and switch to decode mode.',
      'Click Copy to copy the result to your clipboard.'
    ]
  },
  '/tools/jwt': {
    intro: [
      'JSON Web Tokens (JWTs) carry authentication and claims data between services. When debugging auth flows, you need to see what is actually inside a token: which algorithm signed it, when it expires, which scopes and roles were granted. Decoding a JWT is safe — the payload is only Base64URL-encoded, not encrypted.',
      'This debugger decodes the header and payload entirely in your browser. Tokens are never sent to a server, which matters because production JWTs are bearer credentials — anyone holding one can act as that user until it expires.'
    ],
    howTo: [
      'Paste your JWT (the three dot-separated parts) into the input.',
      'The header and payload decode instantly into readable JSON.',
      'Check the exp and iat claims to see if the token is still valid.',
      'Inspect roles, scopes, and issuer claims before trusting the token.'
    ]
  },
  '/tools/uuid': {
    intro: [
      'A UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across systems without any coordinating authority. Version 4 UUIDs use random values and are the default choice for database primary keys, distributed system IDs, API request tracing, and file names where collisions are unacceptable.',
      'Generate single UUIDs or batches in one click. Everything happens locally with the browser crypto API — statistically you would need to generate billions of UUIDs before seeing a duplicate.'
    ],
    howTo: [
      'Choose the UUID version you need (v4 for random IDs, v1 for time-based).',
      'Set the quantity to generate one or hundreds at once.',
      'Click Generate — results appear instantly.',
      'Copy individual UUIDs or the whole batch to your clipboard.'
    ]
  },
  '/tools/json-lint': {
    intro: [
      'Invalid JSON is one of the most common causes of broken API integrations, failing CI pipelines, and crashed configs. A single trailing comma, unquoted key, or unmatched bracket is all it takes — and the error message from your database or runtime rarely tells you where.',
      'Paste any JSON to validate it instantly, with the exact error position highlighted. Valid JSON is beautified into a readable, indented form. Your payloads never leave the browser, so it is safe to paste production data, tokens, and private configs.'
    ],
    howTo: [
      'Paste your JSON into the editor.',
      'Syntax errors are flagged instantly with their location.',
      'Valid JSON is automatically formatted and indented.',
      'Copy the cleaned result or minify it for production use.'
    ]
  },
  '/tools/json-yaml': {
    intro: [
      'JSON and YAML are the two dominant configuration formats. YAML rules Kubernetes manifests, docker-compose files, Ansible playbooks, and GitHub Actions workflows, while most APIs and tools emit JSON. Converting between them is a daily task for DevOps engineers and anyone maintaining infrastructure as code.',
      'This converter translates in both directions with full support for nested objects and arrays. Conversion happens entirely client-side, so proprietary configs and internal service definitions stay on your machine.'
    ],
    howTo: [
      'Paste JSON or YAML into the input panel.',
      'The converted output appears in real time.',
      'Use the swap button to change the conversion direction.',
      'Copy the result straight into your Kubernetes or compose file.'
    ]
  },
  '/tools/diff': {
    intro: [
      'Comparing two versions of text by eye is slow and error-prone. A proper diff highlights exactly what was added, removed, or changed — essential for reviewing code changes, comparing log files, checking contract or config modifications, and merging content edits.',
      'Paste both versions and see a line-by-line comparison with additions and deletions highlighted side by side. The comparison runs locally in your browser, so sensitive code and documents are never uploaded.'
    ],
    howTo: [
      'Paste the original text in the left panel.',
      'Paste the changed text in the right panel.',
      'Differences appear instantly — added and removed lines are highlighted.',
      'Use the result to review exactly what changed between versions.'
    ]
  },
  '/tools/sql': {
    intro: [
      'Minified or hand-written SQL quickly becomes unreadable: long JOIN chains, nested subqueries, and dense WHERE clauses hide bugs and make code review harder. A formatted query makes missing conditions, Cartesian joins, and logic errors visible at a glance.',
      'Paste any SQL statement to format and beautify it with standard indentation, respecting keywords, subqueries, and CTEs. Works with SELECT, INSERT, UPDATE, DELETE, and DDL statements from PostgreSQL, MySQL, SQLite, and SQL Server dialects.'
    ],
    howTo: [
      'Paste your SQL query into the editor.',
      'The formatted query appears instantly with clean indentation.',
      'Review the readable version to spot logic issues.',
      'Copy the beautified SQL back into your code or ticket.'
    ]
  },
  '/tools/regex-tester': {
    intro: [
      'Regular expressions are powerful and notoriously tricky — an unescaped dot, greedy quantifier, or wrong anchor silently changes what your pattern matches. Testing against real input strings before deploying is the only reliable way to confirm a pattern does what you think.',
      'This tester shows matches in real time as you type, with capture groups, match indices, and flag controls (global, case-insensitive, multiline). Pattern and input stay in your browser, safe for testing against production log samples or user data.'
    ],
    howTo: [
      'Enter your regular expression in the pattern field.',
      'Choose the flags you need (g, i, m) or write them inline.',
      'Type or paste test strings — matches highlight as you type.',
      'Inspect capture groups to verify what each part of your pattern captures.'
    ]
  },
  '/tools/url-encoder': {
    intro: [
      'URLs can only contain a limited set of characters, so spaces, ampersands, emojis, and non-Latin text must be percent-encoded before going into a query string — and decoded when read back on the other side. Encoding bugs cause broken links, truncated parameters, and injection vulnerabilities.',
      'Encode or decode URLs and query parameters instantly. Supports both full-URI encoding and the form-encoding used for query string values, where spaces become plus signs.'
    ],
    howTo: [
      'Paste the URL or parameter value to encode or decode.',
      'Pick the encoding mode: full URI or query-string component.',
      'The converted result appears instantly.',
      'Copy the safe URL back into your code, link, or request.'
    ]
  },
  '/tools/hash-text': {
    intro: [
      'Hash functions convert input into a fixed-length fingerprint used for integrity checks, deduplication, password storage, and content addressing. SHA-256 remains the general-purpose default, while Argon2id and bcrypt are the modern standards for password hashing because they are deliberately slow and memory-hard.',
      'Generate SHA-1, SHA-256, SHA-384, SHA-512, MD5, Argon2id, bcrypt, PBKDF2, BLAKE2b, and Poseidon hashes from any text. All hashing runs in your browser — passwords and secrets never touch a server.'
    ],
    howTo: [
      'Type or paste the text to hash.',
      'Choose the algorithm you need for your use case.',
      'The hash appears instantly and updates as you type.',
      'Copy the hex or base64 digest for checksums or storage.'
    ]
  },
  '/tools/bcrypt': {
    intro: [
      'bcrypt is the battle-tested password hashing algorithm. Its configurable cost factor lets you keep hashing slow as hardware gets faster, and its built-in salt defeats rainbow tables. It remains a safe, well-understood choice for authenticating users in Node.js, Python, and Go applications.',
      'Generate bcrypt hashes with your chosen cost factor (4–31) and verify existing hashes against a candidate password. Hashing happens locally in your browser, so real passwords never leave your machine.'
    ],
    howTo: [
      'Enter the password you want to hash.',
      'Pick a cost factor — 10–12 is the common production range.',
      'Copy the resulting hash into your database or seed script.',
      'Use the verify tab to check a password against an existing hash.'
    ]
  },
  '/tools/qr-code-generator': {
    intro: [
      'QR codes bridge the physical and digital world: restaurant menus, WiFi sharing, event tickets, payment links, and app downloads. A good generator lets you control size, colors, and error correction so the code scans reliably on screens and print.',
      'Create QR codes for URLs, plain text, WiFi credentials, email addresses, and phone numbers. Download as PNG or SVG. The code is rendered entirely in your browser — no server logs your URLs.'
    ],
    howTo: [
      'Choose the content type: URL, text, WiFi, email, or phone.',
      'Enter the value the code should carry.',
      'Adjust size, colors, and error correction if needed.',
      'Download the PNG or SVG and print or embed it.'
    ]
  },
  '/tools/image': {
    intro: [
      'Large images are the single biggest drag on page speed, and AI image generators routinely produce files several times larger than needed. Compressing images before uploading to your website, CMS, or app often cuts 60–80% of the file size with no visible quality loss.',
      'Compress JPG, PNG, and WebP images in batches directly in your browser, with optional resizing and format conversion. Photos never leave your device — important for unreleased product shots and personal images.'
    ],
    howTo: [
      'Drop images or click to select files (batch supported).',
      'Choose the quality level and optional target width.',
      'Preview the compressed result and size savings.',
      'Download the optimized images individually or together.'
    ]
  },
  '/tools/unix-timestamp': {
    intro: [
      'Unix timestamps — seconds or milliseconds since January 1, 1970 — are the standard way databases, logs, and APIs represent time. They are compact and timezone-neutral, but completely unreadable to humans, so converting back and forth is a constant task during debugging and log analysis.',
      'See the current timestamp ticking live, convert any epoch value to a human-readable date in your timezone, or go the other way from a date picker. Includes millisecond and second precision.'
    ],
    howTo: [
      'Read the live current timestamp at the top of the page.',
      'Paste an epoch value to convert it to a readable date and time.',
      'Or pick a date and time to get its Unix timestamp.',
      'Note whether your value is in seconds or milliseconds.'
    ]
  },
  '/tools/lorem': {
    intro: [
      'Lorem ipsum is the standard placeholder text used in design mockups, wireframes, and CMS previews. It has a natural distribution of word lengths and sentence sizes, so layouts look realistic without the distraction of real copy.',
      'Generate exactly the amount you need — paragraphs, sentences, or words — with one click and paste it straight into your design tool or template.'
    ],
    howTo: [
      'Choose the unit: paragraphs, sentences, or words.',
      'Set how many you need.',
      'Click Generate to produce fresh placeholder text.',
      'Copy the output into your mockup or template.'
    ]
  },
  '/tools/crontab-generator': {
    intro: [
      'Cron expressions control scheduled jobs on nearly every Linux server, yet the five-field syntax (minute hour day-of-month month day-of-week) is easy to get wrong — especially with steps, ranges, and the often-confused day fields.',
      'Build cron expressions with a visual editor that shows plain-English summaries of the schedule as you configure it, so you can verify the job will really run when you expect. Common presets like daily at midnight and every 5 minutes are one click away.'
    ],
    howTo: [
      'Pick a preset or set each field: minutes, hours, day, month, weekday.',
      'Read the plain-English summary to verify the schedule.',
      'Copy the generated cron expression.',
      'Add it to your crontab or Kubernetes CronJob manifest.'
    ]
  },
  '/tools/case-converter': {
    intro: [
      'Programming conventions use different letter cases for different things: camelCase for JavaScript variables, snake_case for Python and SQL, kebab-case for URLs and CSS, PascalCase for classes, and CONSTANT_CASE for environment variables. Moving text between these formats is constant friction when porting code or generating configs.',
      'Paste any text and convert it to every case convention at once — UPPER, lower, Title Case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. Handles spaces, hyphens, and underscores as word boundaries.'
    ],
    howTo: [
      'Paste your text or identifier into the input.',
      'Every case variant appears instantly.',
      'Click any result to copy it.',
      'Paste the correctly-cased version into your code.'
    ]
  },
  '/tools/keccak256': {
    intro: [
      'Keccak-256 is the hash function at the core of Ethereum and EVM chains: it computes contract addresses from public keys, verifies signatures, generates commit-reveal hashes, and powers Solidity keccak256() calls. It is not the same as standard SHA-3 — Ethereum adopted Keccak before NIST finalized SHA-3 with different padding.',
      'Hash UTF-8 text, hex, or Base64 input and get the exact 0x-prefixed digest Solidity produces. Everything runs client-side, so seed material and preimages never leave your browser.'
    ],
    howTo: [
      'Choose the input format: UTF-8 text, hex, or Base64.',
      'Paste your input.',
      'The Keccak-256 digest appears instantly in 0x-hex form.',
      'Copy it into your contract test or verification script.'
    ]
  },
  '/tools/evm-converter': {
    intro: [
      'EVM chains express value in wei, the smallest unit (10^-18 ether). Gas prices are quoted in gwei, wallets display ether, and smart contracts operate in wei — so developers constantly convert between the three while debugging transactions and reading contract state.',
      'Convert instantly between wei, gwei, and ether (and other denominations like finney and szabo). Precise BigInt arithmetic handles 18-decimal values without floating-point errors. Works for every EVM chain: Ethereum, Polygon, Arbitrum, Base, Optimism, and L2s.'
    ],
    howTo: [
      'Enter an amount in any unit — wei, gwei, or ether.',
      'All other denominations update instantly.',
      'Verify gas costs by converting gwei prices to ether.',
      'Copy the exact value for your transaction or contract call.'
    ]
  },
  '/tools/saml-decoder': {
    intro: [
      'When a SAML flow breaks, the evidence is hidden inside a giant base64 blob on the URL or in an HTML form field. HTTP-Redirect bindings deflate-compress the XML before base64-encoding it; POST bindings base64-encode it directly. Either way, what you get in browser dev tools is unreadable - and pasting production SAML assertions into a random website is a real security risk, since assertions can contain names, emails, and group memberships that act as access tokens.',
      'This decoder runs entirely in your browser using the native DecompressionStream API: raw-deflate decompression plus base64 decoding, then pretty-printed XML showing the AuthnRequest, Subject, conditions, and every attribute statement. Nothing is uploaded, and it also encodes XML back into Redirect-binding format for testing your own SP.'
    ],
    howTo: [
      'Copy the SAMLRequest or SAMLResponse parameter value from the URL or form.',
      'Paste it in and click Decode - deflate and base64 are handled automatically.',
      'Inspect the pretty-printed XML: issuer, NameID, attributes, and conditions.',
      'Switch to Encode to turn SAML XML back into a Redirect-binding payload.'
    ]
  },
  '/tools/oidc-url-builder': {
    intro: [
      'Almost every OAuth 2.0 / OpenID Connect bug in a new app traces back to the authorization request: a missing scope, a wrong redirect_uri, or a PKCE verifier that does not match the challenge sent in the authorize URL. Assembling that URL by hand invites typos in exactly the parameters the identity provider compares strictly.',
      'This builder assembles the full /authorize URL with state, nonce, and an S256 PKCE pair generated with your browser\u2019s secure random generator. The code_verifier stays on your machine and is never transmitted - copy it into your token request when the authorization code comes back. Works with Okta, Auth0, Microsoft Entra ID, Keycloak, Google, and any standards-compliant OIDC provider.'
    ],
    howTo: [
      'Enter your issuer URL (e.g. https://your-org.okta.com/oauth2/default) and client ID.',
      'Set the redirect URI and scopes exactly as registered with your provider.',
      'Leave PKCE on for SPAs and mobile apps - the S256 challenge is computed via Web Crypto.',
      'Copy the authorization URL, complete the login, then exchange the code with the shown token request and code_verifier.'
    ]
  },
  '/tools/contract-reader': {
    intro: [
      'Reading a deployed smart contract normally means trusting Etherscan with your RPC traffic or writing a script. But a read-only call is just an eth_call RPC request - the browser can make it directly. Paste the contract ABI, point the tool at any RPC endpoint, and call every view and pure function: token names and balances, owner addresses, config values, or any public getter.',
      'Because it uses eth_call, every request is read-only: no wallet connection, no gas, no signing, and no way to spend anything. Requests go straight from your browser to the RPC endpoint you choose - Formatho never sees your traffic. Works identically on Ethereum, Polygon, BNB Chain, Arbitrum, Base, Optimism, and every other EVM network.'
    ],
    howTo: [
      'Paste the contract ABI JSON (from Etherscan, forge inspect, or build artifacts).',
      'Pick a chain preset or paste any RPC endpoint, and enter the contract address.',
      'Expand a view function, fill in its arguments if it has any.',
      'Click Call - the result appears instantly, straight from your RPC.'
    ]
  },
  '/tools/function-selector': {
    intro: [
      'Every Ethereum smart contract function is identified on-chain by its 4-byte selector: the first four bytes of the Keccak-256 hash of its canonical signature. When a wallet or dapp calls transfer(address,uint256), the calldata starts with 0xa9059cbb — that value is the selector. Selector collisions and interface matching make this small hash a daily concern for Solidity developers and auditors.',
      'Paste one or many function signatures to compute their selectors instantly. This matches exactly what Solidity keccak256(abi.encodeWithSignature(...)), Foundry cast sig, and ethers.js Interface.getSighash produce — the hashing runs entirely in your browser.'
    ],
    howTo: [
      'Enter one function signature per line, e.g. transfer(address,uint256).',
      'Each 4-byte selector is computed instantly with Keccak-256.',
      'Verify the selector matches the calldata prefix in your transaction.',
      'Use Copy all to export selector + signature pairs for your notes or ABI work.'
    ]
  },
  '/tools/ens-namehash': {
    intro: [
      'The Ethereum Name Service resolves human-readable names like vitalik.eth through the EIP-137 namehash algorithm: a recursive Keccak-256 construction that turns a dotted name into a 32-byte node used as the storage key in ENS registry contracts. Getting namehash right by hand is error-prone because every label is hashed separately and combined in order.',
      'This calculator shows the full derivation chain — each label, its labelhash, and the node value after combining it — so you can verify exactly what the ENS registry will look up. Everything is computed locally in your browser.'
    ],
    howTo: [
      'Type an ENS name such as vitalik.eth.',
      'The final namehash appears immediately at the top.',
      'Inspect the derivation chain to see each labelhash and intermediate node.',
      'Copy the namehash for use in your contract calls or tests.'
    ]
  },
  '/tools/vanity-eth': {
    intro: [
      'A vanity Ethereum address contains a pattern you choose — it starts with 0xdead or ends in beef. Generating one is simple brute force: create keypairs until an address matches. Each hex character multiplies the expected work by 16, so 4 characters average around 65,000 attempts and each additional character multiplies that by 16.',
      'One key, every EVM chain: an address generated here is valid on Ethereum, Polygon, BNB Smart Chain, Arbitrum, Base, Optimism, Avalanche, and every other EVM network - they all share the same address format.',
      "The critical risk with online vanity generators is that most run on a server — the private key exists on someone else's machine. This generator runs entirely in your browser inside a Web Worker: keys are created with your device's secure random generator and are never transmitted, logged, or stored."
    ],
    howTo: [
      'Enter a prefix (after 0x) and/or suffix of hex characters.',
      'Click Start — generation runs in a background worker at full speed.',
      'Watch the attempt counter and rate; matches appear as they are found.',
      'Copy the address and private key once a match is found.'
    ]
  },
  '/tools/markdown': {
    intro: [
      'Markdown is the writing format of modern development: READMEs, documentation sites, pull requests, issues, and static site generators all use it. A live side-by-side editor shows exactly how your Markdown will render while you write it.',
      'This editor supports the full GitHub-Flavored Markdown feature set: tables, task lists, fenced code blocks with syntax highlighting, and inline HTML. Files stay in your browser — nothing is synced or uploaded.'
    ],
    howTo: [
      'Type Markdown in the left pane.',
      'The rendered preview updates live on the right.',
      'Use tables, code fences, and task lists just like on GitHub.',
      'Copy the HTML or keep your Markdown for your README.'
    ]
  }
}

/**
 * Additional tool-specific FAQs (rendered visibly and injected as FAQPage
 * structured data). Keyed by route path.
 */
const websiteAgentToolFAQs = {
  '/tools/saml-decoder': [
    {
      question: 'What is the difference between SAML Redirect and POST binding?',
      answer: 'The Redirect binding packs the XML message into the URL: raw-deflate compression followed by Base64, then URL-encoding. The POST binding puts only Base64 (no compression) into an HTML form field. This decoder auto-detects both - if deflate decompression fails it retries as plain Base64.'
    },
    {
      question: 'Is it safe to paste production SAML assertions here?',
      answer: 'Yes. Decoding happens entirely in your browser - assertions are never uploaded to any server. That said, SAML assertions are bearer credentials, so avoid pasting them into tools that cannot prove client-side processing.'
    },
    {
      question: 'Why does my decoded SAML show as broken XML?',
      answer: 'The message was likely truncated by URL length limits or copy-paste. Grab the full parameter (SAMLRequest or SAMLResponse) from your browser devtools network tab rather than the visible URL bar.'
    }
  ],
  '/tools/oidc-url-builder': [
    {
      question: 'What is PKCE and when do I need it?',
      answer: 'PKCE (Proof Key for Code Exchange) binds the authorization code to a verifier secret so intercepted codes cannot be exchanged. It is required for public clients (SPAs, mobile apps) and recommended for all OAuth 2.1 flows. This builder generates the verifier and computes the S256 code challenge with Web Crypto.'
    },
    {
      question: 'Does this work with Okta, Auth0, Entra ID, and Keycloak?',
      answer: 'Yes. The /authorize endpoint parameters are standardized by OpenID Connect, so the generated URL works with any compliant provider - fill in the authorization endpoint URL from your provider app settings.'
    },
    {
      question: 'Are the state, nonce, and verifier safe to generate here?',
      answer: 'They are generated with your browser crypto.getRandomValues and never leave the page - nothing is transmitted or logged. For production apps, generate them in your own code; use this tool to understand and debug the flow.'
    }
  ]
}

const newToolFAQs = {
  '/tools/contract-reader': [
    {
      question: 'How is this different from Etherscan read contract?',
      answer: 'No account limits, no site-specific delays, and your queries go directly from your browser to the RPC you choose. It also works on any EVM chain and with private or paid RPC endpoints, including local development nodes like anvil or Hardhat.'
    },
    {
      question: 'Can this spend my funds or move assets?',
      answer: 'No. The tool only sends eth_call requests, which are strictly read-only. No wallet is connected and nothing is signed, so there is no way for it - or any function it lists - to transfer or spend anything.'
    },
    {
      question: 'Where do I get a contract ABI?',
      answer: 'From Etherscan contract page (Code tab), foundry forge inspect <contract> --json, Hardhat artifacts, or the artifacts your build tool emits. Standard interfaces like ERC-20 are also one click away with the example loader.'
    },
    {
      question: 'Can I use a local development node?',
      answer: 'Yes. Point the RPC field at http://127.0.0.1:8545 (anvil, Hardhat, or ganache) and read your locally deployed contracts the same way.'
    }
  ],
  '/tools/function-selector': [
    {
      question: 'What is a Solidity function selector?',
      answer: 'The first 4 bytes of the Keccak-256 hash of the function signature, e.g. 0xa9059cbb for transfer(address,uint256). It identifies which function a transaction calls in the calldata.'
    },
    {
      question: 'Does this match Foundry cast sig and ethers.js output?',
      answer: 'Yes. Selector computation is standardized: Keccak-256 of the canonical signature string, first 4 bytes. Results match cast sig, ethers.js getSighash, and web3.js encodeFunctionSignature.'
    },
    {
      question: 'Why do two of my functions have the same selector?',
      answer: 'It is rare but possible - 4 bytes allow collisions. The compiler warns on collisions within one contract; across contracts it is usually harmless unless an ABI proxy forwards calls.'
    }
  ],
  '/tools/ens-namehash': [
    {
      question: 'What is the difference between namehash and labelhash?',
      answer: 'A labelhash is the Keccak-256 of a single label like eth. The namehash combines labelhashes recursively from the root, producing the 32-byte node the ENS registry uses as its key.'
    },
    {
      question: 'Does the calculator normalize names?',
      answer: 'It lowercases labels and strips trailing dots, which covers standard names. Full ENS normalization (ENSIP-15) handles Unicode edge cases; for those, verify with the official ENS normalization library.'
    }
  ],
  '/tools/vanity-eth': [
    {
      question: 'Is it safe to use a vanity address for real funds?',
      answer: 'This generator never transmits keys - everything happens in your browser. Still, best practice for meaningful funds is a hardware wallet or air-gapped generation. Treat browser-generated keys as suitable for testing and throwaway accounts.'
    },
    {
      question: 'How long does it take to find a match?',
      answer: 'Each hex character multiplies expected attempts by 16: 4 characters average ~65k attempts, 5 around 1M, 6 around 16M. At typical browser speeds of thousands of keys per second, 4-5 characters take seconds to minutes; 7+ can take hours or longer.'
    },
    {
      question: 'Does this work for Polygon, BSC, Base, and other EVM chains?',
      answer: 'Yes. All EVM chains use the same address derivation, so a vanity address generated here works identically on Ethereum, Polygon, BNB Smart Chain, Arbitrum, Base, Optimism, Avalanche, and every EVM network.'
    },
    {
      question: 'Can I use uppercase letters in my pattern?',
      answer: 'Patterns match case-insensitively against the lowercase hex address. The displayed address uses proper EIP-55 checksum casing. Matching checksum-case exactly would multiply the work enormously per character.'
    }
  ]
}

const extraFAQs = {
  '/tools/diff': [
    {
      question: 'Can I compare code from different programming languages?',
      answer: 'Yes. The diff is line-based and language-agnostic, so it works for code, configs, logs, JSON, and plain text of any kind.'
    },
    {
      question: 'Does the diff detect moved lines or only additions and deletions?',
      answer: 'It highlights added and removed lines. A block moved between the two versions shows as a deletion at the old location and an addition at the new one.'
    }
  ],
  '/tools/url-encoder': [
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer: 'encodeURI keeps URL structure characters like :, /, ? and & intact, for encoding a full URL. encodeURIComponent escapes those too, which is what you need for individual query parameter values.'
    },
    {
      question: 'Why do spaces sometimes become %20 and sometimes +?',
      answer: '%20 is standard percent-encoding used in paths and by encodeURI. The plus form comes from the older application/x-www-form-urlencoded format used in HTML form submissions and query strings. Both decode back to a space.'
    }
  ],
  '/tools/image': [
    {
      question: 'What image formats can I compress?',
      answer: 'JPG, PNG, and WebP. You can also convert between formats — for example turning a PNG screenshot into a much smaller WebP file.'
    },
    {
      question: 'Is there a file size or count limit?',
      answer: 'No hard limit — the tool uses your browser resources, so very large batches depend on your device memory. Files are processed one at a time and never uploaded.'
    }
  ],
  '/tools/unix-timestamp': [
    {
      question: 'How do I know if a timestamp is in seconds or milliseconds?',
      answer: 'Count the digits: 10 digits means seconds, 13 means milliseconds. A 13-digit value used as seconds would be a date tens of thousands of years in the future, which is a common bug.'
    },
    {
      question: 'What timezone does the conversion use?',
      answer: 'The readable output uses your browser local timezone. The timestamp itself is timezone-independent — it always represents the same instant worldwide.'
    }
  ],
  '/tools/crontab-generator': [
    {
      question: 'How do I run a cron job every 10 minutes?',
      answer: 'Use */10 in the minute field with * for the rest: */10 * * * *. The generator produces this for you with the every-N-minutes preset.'
    },
    {
      question: 'What is the difference between day-of-month and day-of-week fields?',
      answer: 'If both are restricted (not *), cron runs the job when EITHER matches, not both. To be safe, keep one of them as * — this trips up even experienced admins.'
    }
  ],
  '/tools/case-converter': [
    {
      question: 'How are word boundaries detected in my input?',
      answer: 'Spaces, hyphens, underscores, and camelCase capitalization changes are all treated as word boundaries, so "user-profile-page" and "userProfilePage" convert to the same words.'
    }
  ],
  '/tools/keccak256': [
    {
      question: 'Is Keccak-256 the same as SHA3-256?',
      answer: 'No. Ethereum uses the original Keccak submission. NIST later standardized SHA-3 with different padding, so SHA3-256 libraries produce different digests than Solidity keccak256().'
    },
    {
      question: 'Why does my Solidity hash not match the tool output?',
      answer: 'The most common cause is encoding: Solidity keccak256(abi.encodePacked(...)) hashes raw bytes. Make sure you select the same input format (UTF-8 vs hex) here, and remember a string and its hex bytes hash differently.'
    }
  ],
  '/tools/evm-converter': [
    {
      question: 'Why do I get different results than a JavaScript calculator?',
      answer: 'JavaScript numbers lose precision beyond 15–16 digits, and wei values have up to 18 decimals. This tool uses BigInt arithmetic, so every digit is exact.'
    },
    {
      question: 'Does this work for Polygon, Arbitrum, and other EVM chains?',
      answer: 'Yes. Every EVM-compatible chain uses the same wei/gwei/ether denomination system, so the conversions are identical across Ethereum, Polygon, Arbitrum, Base, Optimism, and other L2s.'
    }
  ],
  '/tools/markdown': [
    {
      question: 'Which Markdown flavor is supported?',
      answer: 'GitHub-Flavored Markdown (GFM): tables, task lists, fenced code blocks with syntax highlighting, strikethrough, and autolinking — the same rendering you see in GitHub READMEs.'
    }
  ],
  '/tools/lorem': [
    {
      question: 'Can I generate a specific number of words?',
      answer: 'Yes — switch the unit to words and set the exact count. Paragraph and sentence counts are also adjustable.'
    }
  ],
  '/tools/json-lint': [
    {
      question: 'Does the validator support comments in JSON?',
      answer: 'Yes, JSON5-style comments are accepted so you can validate config files that include them. Standard JSON must be comment-free, and the validator tells you when a comment is the only issue.'
    }
  ]
}

// Merge extra FAQs into the exported map
Object.assign(toolSpecificFAQ, extraFAQs, newToolFAQs, websiteAgentToolFAQs)


/**
 * Content kits prioritized by real Search Console impressions (2026-08):
 * pages already earning impressions but lacking content, pushing pos 40+ -> 15.
 */
const gscContent = {
  '/tools/token-generator': {
    intro: [
      'API keys, session tokens, secrets for CI pipelines and service-to-service auth all need high-quality randomness. A token generator should use a cryptographic random source - not Math.random(), which is predictable and never safe for authentication material.',
      'This generator uses the browser Web Crypto API (crypto.getRandomValues), the same source browsers use for TLS. Choose hex or base64 output, any length, or define a custom alphabet - useful for URLs-safe tokens or license-key formats like XXXX-XXXX-XXXX.'
    ],
    howTo: [
      'Pick the output format: hex, base64, or a custom alphabet.',
      'Set the token length in characters (32-64 is typical for API keys).',
      'Generate one token or a batch.',
      'Copy the result straight into your config or secrets manager.'
    ]
  },
  '/tools/eta-calculator': {
    intro: [
      'ETA (estimated time of arrival) is the practical output of distance, speed, and time math: when will this delivery arrive, when does this download finish, when does this batch job complete. Doing it by hand invites arithmetic slips exactly when the answer matters.',
      'Enter distance and average speed - or remaining units and completion rate - and get the arrival time in your local timezone plus the raw duration. Everything computes locally in your browser. ETA-Berechnung: Entfernung und Geschwindigkeit eingeben, Ankunftszeit sofort erhalten.'
    ],
    howTo: [
      'Enter the distance to cover and the average speed you expect.',
      'Or enter remaining work units and the completion rate.',
      'Read the total duration and the estimated arrival time.',
      'Adjust the start time if the trip or job begins later.'
    ]
  },
  '/tools/address-checksum': {
    intro: [
      'Ethereum addresses are 20-byte hex values, and the raw form is case-insensitive - which makes a typo completely silent. If one character is wrong, your funds go to a valid-looking but wrong address, forever. EIP-55 checksumming fixes this: the casing of each letter encodes a hash of the address itself.',
      'Paste any Ethereum address to verify its EIP-55 checksum or convert it to the checksummed form. A mistyped address produces a different casing pattern and fails validation instantly - catching errors before a transaction does. The checksum is computed with Keccak-256 entirely in your browser.'
    ],
    howTo: [
      'Paste the Ethereum address (0x...).',
      'The tool reports whether the EIP-55 checksum is valid.',
      'Copy the properly checksummed form of the address.',
      'Use checksummed addresses in contracts and configs to catch typos.'
    ]
  },
  '/tools/solidity-to-opcodes': {
    intro: [
      'Every Solidity function compiles down to EVM opcodes - and the gap between what you wrote and what executes is where gas costs and security bugs live. Reading the opcodes shows which functions actually cost 21k gas, where the compiler inserted expensive memory operations, and what a constructor or modifier really does.',
      'Paste Solidity source and compile to EVM assembly and bytecode with selectable solc versions. Everything runs in your browser - no code upload. To inspect the reverse direction, decode deployed bytecode with a disassembler or decompiler and verify it against your source.'
    ],
    howTo: [
      'Paste or type your Solidity contract.',
      'Choose the solc compiler version that matches your target.',
      'Compile - the opcode listing appears with the bytecode.',
      'Inspect the assembly per function to understand gas and logic.'
    ]
  },
  '/tools/sql-to-er-diagram': {
    intro: [
      'A CREATE TABLE script describes your schema, but understanding it - especially a schema you inherited - requires seeing it: which tables exist, what keys link them, where the joins live. An ER diagram turns DDL into a picture your whole team can read.',
      'Paste CREATE TABLE statements and get an interactive entity-relationship diagram with primary and foreign keys mapped automatically. Export as Mermaid to drop the diagram into docs, PRs, or an AI assistant. Parsing happens client-side - proprietary schemas never leave your machine.'
    ],
    howTo: [
      'Paste your CREATE TABLE statements (one or many).',
      'The diagram renders with tables as nodes and foreign keys as edges.',
      'Inspect any relationship by selecting a table.',
      'Export as Mermaid for docs, GitHub markdown, or AI tools.'
    ]
  },
  '/tools/date-time-converter': {
    intro: [
      'ISO 8601, Unix timestamps, RFC 2822, human-readable local time - every API, database, and log format seems to pick a different one. Converting between them by hand is trivial to get wrong, especially across timezones and daylight-saving boundaries.',
      'Paste a date in any common format and get every other representation at once: Unix seconds and milliseconds, ISO 8601 with and without offset, UTC, and your local time. Everything converts in your browser.'
    ],
    howTo: [
      'Paste a date, timestamp, or ISO string.',
      'All formats update instantly - Unix, ISO 8601, UTC, local.',
      'Check the timezone interpretation carefully (Z, +00:00, or naive).',
      'Copy the format your target system expects.'
    ]
  },
  '/tools/keccak256': {
    intro: [
      'Keccak-256 is the hash at the core of Ethereum: contract addresses derive from it, signatures commit with it, and Solidity keccak256() calls it. It is not SHA-3 - Ethereum adopted Keccak before NIST finalized SHA-3 with different padding, so SHA-3 libraries produce different digests.',
      'Hash UTF-8 text, hex, or Base64 input and get the exact 0x-prefixed digest Solidity produces. Seed phrases, preimages, and commit-reveal values never leave your browser.'
    ],
    howTo: [
      'Select the input format: UTF-8 text, hex, or Base64.',
      'Paste your input - the hash updates as you type.',
      'Verify the digest matches keccak256() in your contract test.',
      'Copy the 0x-prefixed result.'
    ]
  },
  '/tools/rsa-key-pair-generator': {
    intro: [
      'RSA keys still secure a huge share of TLS, JWT signing (RS256), and SSH infrastructure. Generating a pair for testing - without sending anything to a server - is a regular need for anyone wiring up auth or inspecting certificate tooling.',
      'Generate RSA key pairs locally in your browser at 2048 or 4096 bits, and download or copy the public and private PEM files. Key generation happens with Web Crypto on your device; nothing is transmitted. For production keys, use a managed HSM or your platform key store.'
    ],
    howTo: [
      'Choose the key size - 2048 for most tests, 4096 for realistic weight.',
      'Click generate - the pair appears as PEM blocks.',
      'Copy or download the public and private keys.',
      'Use them for local RS256 JWT signing tests or TLS lab setups.'
    ]
  },
  '/tools/device-information': {
    intro: [
      'Support teams, QA engineers, and bug reporters constantly need to know exactly what a user is running: which browser, which OS, what screen size, what locale. A device-information page reads all of it from your browser in one glance - the same data your user agent string and JavaScript environment expose.',
      'View your user agent, platform, screen dimensions, viewport, color depth, CPU cores, connection type, timezone, and language settings. Useful for verifying UA-based routing, reproducing bug reports, or checking what fingerprinting data your browser reveals.'
    ],
    howTo: [
      'Open the page - every value is read automatically.',
      'Copy your full user agent string if support asked for it.',
      'Compare viewport vs screen size to verify responsive behavior.',
      'Check the timezone and locale values your browser sends.'
    ]
  },
  '/tools/string-obfuscator': {
    intro: [
      'Homoglyph obfuscation replaces characters with visually identical alternatives from other alphabets - a Latin "a" becomes a Cyrillic "а". The text reads the same to humans but is materially different to any string matcher, which makes it a standard technique for testing profanity filters, plagiarism detection, and string-matching code.',
      'Transform any text using homoglyph substitution and invisible characters. Everything renders locally in your browser - useful for security research, filter testing, and understanding why naive string matching fails.'
    ],
    howTo: [
      'Paste the text to obfuscate.',
      'Choose the transformation - homoglyphs, zero-width characters, or both.',
      'Copy the result - it looks identical but differs underneath.',
      'Test how your filters and validators handle it.'
    ]
  },
  '/tools/mermaid-viewer': {
    intro: [
      'ChatGPT, Claude, Copilot and every serious AI assistant now emit diagrams as Mermaid code - but pasting ```mermaid blocks into a chat gives you no way to actually view, fix, or export the diagram. "How do I view mermaid diagrams" is the natural next question.',
      'Paste any Mermaid code to render flowcharts, sequence diagrams, ER models, and Gantt charts instantly. Debug syntax errors with inline messages, iterate on the source in the editor, and export the result. Rendering is 100% client-side.'
    ],
    howTo: [
      'Copy the Mermaid code your AI assistant or teammate produced.',
      'Paste it into the editor - the diagram renders immediately.',
      'Fix any syntax errors using the inline error messages.',
      'Export or screenshot the diagram for docs and presentations.'
    ]
  }
}

const gscFAQs = {
  '/tools/token-generator': [
    {
      question: 'Are these tokens safe to use as API keys?',
      answer: 'Yes. They are generated with crypto.getRandomValues, the browser cryptographic random source. For production systems, prefer generating secrets server-side or in a secrets manager so nothing transits a browser.'
    },
    {
      question: 'How long should an API token be?',
      answer: '32 characters of hex (128 bits) is the practical minimum for API keys; 64 hex characters is common. For 256-bit keys use 64 hex characters or 43 base64 characters.'
    },
    {
      question: 'What is the difference between a token and a UUID?',
      answer: 'A UUID encodes structure (version bits, sometimes a timestamp) and is not meant to be secret. A random token is unstructured and unpredictable - use tokens for secrets, UUIDs for identifiers.'
    }
  ],
  '/tools/eta-calculator': [
    {
      question: 'How do I calculate ETA from distance and speed?',
      answer: 'Divide the distance by the average speed to get travel time, then add it to the departure time. This tool does both steps and accounts for the start time you set.'
    },
    {
      question: 'Wie berechne ich die voraussichtliche Ankunftszeit (ETA)?',
      answer: 'ETA-Berechnung: Entfernung durch Durchschnittsgeschwindigkeit teilen ergibt die Fahrzeit; addiert zur Startzeit ergibt sich die Ankunftszeit. Dieses Werkzeug rechnet beides automatisch. (To calculate ETA: divide distance by average speed to get duration, then add it to your departure time.)'
    },
    {
      question: 'Can I use it for download or job completion times?',
      answer: 'Yes - treat remaining data or work units as the distance and the transfer or processing rate as the speed. The same math gives the completion time.'
    }
  ],
  '/tools/address-checksum': [
    {
      question: 'What is an EIP-55 checksummed address?',
      answer: 'An Ethereum address where each letter is capitalized according to a hash of the address itself (EIP-55). Any single-character typo changes the expected casing, so checksum validation catches the error before funds are sent.'
    },
    {
      question: 'Is an all-lowercase address invalid?',
      answer: 'No - lowercase is the raw, valid form. Checksum validation only applies when the address mixes upper and lower case. Tools and exchanges increasingly require the checksummed form because it is self-verifying.'
    }
  ],
  '/tools/solidity-to-opcodes': [
    {
      question: 'Can I convert bytecode back to Solidity source?',
      answer: 'Not exactly - bytecode does not preserve source details like names and comments. You can disassemble bytecode to opcodes and use a decompiler for pseudo-source, then verify behavior against your original source by comparing compiled outputs.'
    },
    {
      question: 'Which solc version should I pick?',
      answer: 'Match the version your project pins in its build config (foundry.toml, hardhat.config). Comparing the same source under different versions is also useful for spotting behavior or gas changes across compiler releases.'
    }
  ],
  '/tools/sql-to-er-diagram': [
    {
      question: 'Which SQL dialects can I paste?',
      answer: 'Standard CREATE TABLE syntax works - PostgreSQL, MySQL, SQLite, and SQL Server definitions all parse. Dialect-specific types are shown as declared; relationships come from FOREIGN KEY ... REFERENCES clauses.'
    },
    {
      question: 'Can I export the diagram?',
      answer: 'Yes, as Mermaid code. Mermaid renders natively in GitHub markdown, Notion, Obsidian, and most documentation tools, so the diagram stays maintainable alongside your schema.'
    }
  ],
  '/tools/date-time-converter': [
    {
      question: 'What does the Z at the end of a timestamp mean?',
      answer: 'Z means UTC - zero offset from coordinated universal time ("Zulu"). 2024-02-26T13:06:54Z and 2024-02-26T13:06:54+00:00 are the same instant expressed two ways.'
    },
    {
      question: 'Why do Unix timestamps come in two lengths?',
      answer: 'Seconds since 1970 is the classic format (10 digits); many systems, including JavaScript dates, use milliseconds (13 digits). Mixing them up shifts a date by about 53,000 years, which is a common bug.'
    }
  ],
  '/tools/keccak256': [
    {
      question: 'Is Keccak-256 the same as SHA3-256?',
      answer: 'No. Ethereum uses the original Keccak submission; NIST later standardized SHA-3 with different padding. SHA3-256 libraries produce different digests than Solidity keccak256().'
    },
    {
      question: 'Why does my Solidity hash not match?',
      answer: 'The usual cause is encoding: keccak256 hashes raw bytes, so a string and its hex representation hash differently. Match the input format here (UTF-8 vs hex) to what abi.encodePacked produces.'
    }
  ],
  '/tools/rsa-key-pair-generator': [
    {
      question: 'Is it safe to generate RSA keys in a browser?',
      answer: 'For tests, demos, and lab setups - yes; generation uses the Web Crypto API and keys never leave your device. For production, use a hardware security module, key vault, or your platform-managed key store.'
    },
    {
      question: 'What are RSA key pairs used for?',
      answer: 'TLS certificates, RS256-signed JWTs, SSH authentication, and document signing. The public key is shared freely; the private key must be kept secret.'
    }
  ],
  '/tools/device-information': [
    {
      question: 'What information can a website see about my device?',
      answer: 'Your user agent string, platform, screen and viewport size, color depth, CPU cores, device memory, timezone, languages, and connection type. This page shows exactly that set - it is the same data any site can read without permissions.'
    },
    {
      question: 'Why is my viewport size different from my screen size?',
      answer: 'Screen size is the physical display; viewport is the area the browser gives the page - smaller because of the browser UI, zoom level, and device pixel ratio. Responsive designs key off the viewport, which is why both numbers matter when debugging layouts.'
    },
    {
      question: 'Is showing this information a privacy risk?',
      answer: 'This page reads values locally and displays them to you - nothing is transmitted or logged. The point is transparency: these are the signals your browser hands to every site you visit.'
    }
  ],
  '/tools/string-obfuscator': [
    {
      question: 'What are homoglyphs?',
      answer: 'Characters from different alphabets that look identical - like the Latin "a" and the Cyrillic "а". Text built with homoglyphs reads normally but differs at the byte level, defeating exact string matching.'
    },
    {
      question: 'Why would I obfuscate a string?',
      answer: 'Commonly to test content filters, profanity detection, plagiarism checkers, and URL validators - systems that must be robust against lookalike-character evasion. Security researchers use it to probe where naive matching breaks.'
    },
    {
      question: 'Does the obfuscated text behave differently?',
      answer: 'Yes. Search, diff, copy-detection, and validation logic that compares strings will not match the original. Visually it is indistinguishable, which is precisely the point - and the risk when it is used against you.'
    }
  ],
  '/tools/mermaid-viewer': [
    {
      question: 'How do I view mermaid diagrams from ChatGPT or Claude?',
      answer: 'Copy the mermaid code block the assistant produced, paste it into the editor here, and the diagram renders instantly. No plugins or local installs needed.'
    },
    {
      question: 'Which diagram types are supported?',
      answer: 'The full Mermaid set: flowcharts, sequence diagrams, ER diagrams, class diagrams, state diagrams, Gantt charts, pie charts, and mind maps.'
    },
    {
      question: 'Can I fix errors in generated diagrams?',
      answer: 'Yes - syntax errors are shown inline with the line number. AI assistants frequently produce small mistakes like unquoted labels; edit the source until the diagram renders, then export.'
    }
  ]
}

Object.assign(toolSEOContent, gscContent)
const gscFAQList = {}
for (const [route, faqs] of Object.entries(gscFAQs)) {
  if (Array.isArray(faqs) && faqs.length) gscFAQList[route] = faqs
}
Object.assign(toolSpecificFAQ, gscFAQList)
