/**
 * Homepage citable SEO content: long-form category descriptions (50-80 words)
 * and homepage FAQ. Used by HomeView for visible text and FAQPage JSON-LD.
 */

export interface HomeCategoryDetail {
  slug: string
  title: string
  body: string
}

export const homeIntro: string[] = [
  'Formatho is a free, privacy-first suite of developer tools that run entirely in your browser. It covers data formats (JSON, YAML, XML, CSV, TOML), security utilities (JWT, SAML, hash generators, TOTP), Web3 and blockchain helpers (Keccak-256, ABI encoding, ENS namehash, multi-chain address readers), and everyday converters like timestamps, number bases, and color codes. Nothing you paste is ever uploaded, logged, or tracked, and no sign-up is required.'
]

export const homeCategoryDetail: HomeCategoryDetail[] = [
  {
    slug: 'data-formats',
    title: 'Data format tools',
    body: 'Formatho\'s data format tools format, validate, minify, and convert JSON, YAML, XML, TOML, and CSV without uploading files to a server. Developers use them to pretty-print API responses, fix indentation errors, convert JSON to YAML for Kubernetes manifests, and diff two documents line by line. Because parsing happens client-side in JavaScript, confidential payloads such as auth tokens or customer records never leave the machine, making the tools safe for production data.'
  },
  {
    slug: 'security',
    title: 'Security and authentication tools',
    body: 'The security suite includes a JWT debugger that decodes header, payload, and signature claims, a SAML response decoder, an OIDC URL builder, TOTP secret generators, and hash calculators for MD5, SHA-1, SHA-256, SHA-512, and Keccak-256. Security engineers use them to inspect tokens before trusting them, verify checksums, generate QR-based 2FA secrets, and analyze password strength. Every operation is local, so secrets and private keys are never transmitted to any server.'
  },
  {
    slug: 'web3',
    title: 'Web3 and blockchain tools',
    body: 'Web3 developers get a Keccak-256 hasher, Solidity function-selector calculator, ABI encoder and decoder, EIP-55 address checksum validator, ENS namehash calculator, and EVM unit converter for wei, gwei, and ether. Chain readers query accounts on Solana, Polkadot, Cardano, and Cosmos directly from the browser through user-supplied RPC endpoints, and the vanity address generator derives custom-prefix Ethereum addresses with keys that never leave the browser. DeFi calculators cover impermanent loss and ERC-4626 vault math.'
  },
  {
    slug: 'developer',
    title: 'General developer tools',
    body: 'Everyday development utilities include an SQL formatter and dialect converter, regex tester with live match highlighting, Git cheat-sheet, Docker run-to-compose converter, Mermaid diagram viewer, Markdown editor with preview, and an image compressor that shrinks PNG and JPEG files locally. These tools remove the friction of context-switching between websites and extensions: everything loads instantly, works offline after first load, and processes files in the browser rather than uploading them to a conversion service.'
  },
  {
    slug: 'converters',
    title: 'Converters and calculators',
    body: 'The converter collection handles Unix timestamps to human dates, number-base conversion between binary, decimal, octal, and hexadecimal, text case changes, temperature units, NATO phonetic alphabet spelling, binary text encoding, and unicode escaping. Calculators cover percentages, averages, and ETA estimates. Each converter accepts input in either direction, shows results as you type, and explains the conversion being applied, which makes them useful for learning as well as for quick lookups during debugging.'
  },
  {
    slug: 'network',
    title: 'Network and web tools',
    body: 'Network utilities include an IPv4 subnet calculator with CIDR notation support, MAC address formatter and vendor lookup, IPv6 unique-local-address generator, URL encoder and decoder, URL parser that splits scheme, host, path, and query parameters, an HTTP status-code reference, a CORS tester for checking cross-origin headers, a TLS checker, and a QR code generator. Sysadmins and web developers use them while configuring firewalls, debugging API requests, and generating scannable links for deployments.'
  }
]

export const homeFAQ = [
  {
    question: 'Are Formatho tools really free?',
    answer: 'Yes. All tools on Formatho are completely free with no sign-up, no credit card, and no usage limits. The site is supported without selling user data because there is no user data to sell — nothing is collected.'
  },
  {
    question: 'How does Formatho protect my data?',
    answer: 'Every tool runs entirely client-side in your browser using JavaScript and WebAssembly. Text you paste, files you drop, and keys you generate are processed locally and never transmitted to Formatho servers. There are no analytics on tool inputs and no server-side processing of your content.'
  },
  {
    question: 'Do Formatho tools work offline?',
    answer: 'After the first load, most tools continue to work offline because all logic ships with the page and runs locally. This makes Formatho reliable on flaky connections, in air-gapped environments, and when handling sensitive data you do not want near a network.'
  },
  {
    question: 'Which developer tools does Formatho include?',
    answer: 'Formatho covers six categories: data formats (JSON, YAML, XML, CSV, TOML), security and auth (JWT, SAML, hashing, TOTP), Web3 (Keccak-256, ABI, ENS, multi-chain readers), developer utilities (SQL, regex, Git, Docker, Mermaid), converters (timestamps, bases, case, color), and network tools (subnet calculator, URL encoder, QR codes).'
  },
  {
    question: 'Can I use Formatho for production or confidential data?',
    answer: 'Yes — that is the design goal. Because inputs never leave your device, tools like the JSON formatter, JWT debugger, and private-key converter are safe for production payloads, customer records, and secrets. Nothing is logged, stored, or shared.'
  }
]
