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
  '/tools/uuid-generator': [
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
  '/tools/sql-formatter': [
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
