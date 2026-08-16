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
Object.assign(toolSpecificFAQ, extraFAQs)
