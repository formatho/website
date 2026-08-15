export interface BlogMetadata {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  image?: string
  imageAlt?: string
}

export const blogMetadata: BlogMetadata[] = [
  {
    id: 60,
    title: 'Quantum Computing: The Next Frontier That Will Reshape Our Digital World',
    excerpt: 'Explore the quantum revolution - from IBM, Google, and Microsoft\'s race to breakthroughs, to how quantum computing threatens current encryption, SSH keys, and blockchain infrastructure.',
    date: '2026-06-29',
    readTime: '15 min',
    tags: ['Quantum Computing', 'Cryptography', 'Technology', 'Security', 'Future Tech', 'Innovation'],
    slug: 'quantum-computing-reshaping-digital-world',
    image: '/images/blog/blog-60/quantum-computing.jpg',
    imageAlt: 'Quantum computing visualization showing qubits and quantum circuits'
  },
  {
    id: 58,
    title: 'Real Estate Tokenization in 2026: Legal Frameworks, SM REITs, and Smart Contract Compliance',
    excerpt: 'Explore how real estate tokenization works in 2026 — from SPV structures and SEBI SM REIT regulations to ERC-3643 compliance-by-design token standards. A practical guide to the legal architecture behind tokenized property.',
    date: '2026-06-05',
    readTime: '9 min',
    tags: ['Real Estate', 'Tokenization', 'RWA', 'Legal', 'SM REIT', 'SEBI', 'Smart Contracts', 'ERC-3643'],
    slug: 'real-estate-tokenization-legal-frameworks-sm-reits-2026',
    image: '/images/blog/blog-58/real-estate-tokenization-1.jpg',
    imageAlt: 'Real estate tokenization — legal frameworks and smart contract compliance in 2026'
  },
  {
    id: 57,
    title: 'The Future of RWA Tokenization: 5 Megatrends Reshaping Finance by 2030',
    excerpt: 'Discover how Real World Asset (RWA) tokenization is bridging the gap between traditional finance and blockchain. Explore 2030 market predictions for real estate, institutional adoption, and fractional ownership.',
    date: '2026-06-06',
    readTime: '10 min',
    tags: ['RWA', 'Tokenization', 'Blockchain', 'Finance', 'Real Estate', 'Institutional', 'DeFi'],
    slug: 'future-of-rwa-tokenization-5-megatrends-reshaping-finance-2030',
    image: '/images/blog/blog-57/rwa-megatrends-1.jpg',
    imageAlt: 'The future of RWA tokenization — 5 megatrends reshaping global finance by 2030'
  },
  {
    id: 56,
    title: 'The Structural Reconfiguration of Finance: Institutional Guide to Real-World Asset (RWA) Tokenization in 2026',
    excerpt: 'The IMF calls it a structural reconfiguration of global finance. With $441B in represented value and $27.65B actively trading on-chain, RWA tokenization is no longer theoretical. This institutional guide breaks down the mechanics, regulations, and systemic risks of tokenized finance in 2026.',
    date: '2026-06-04',
    readTime: '14 min',
    tags: ['RWA', 'Tokenization', 'Blockchain', 'Finance', 'Institutional', 'IMF', 'Regulation'],
    slug: 'structural-reconfiguration-finance-rwa-tokenization-2026',
    image: '/images/blog/blog-56/rwa-tokenization.jpg',
    imageAlt: 'Real-World Asset tokenization — institutional finance meets blockchain'
  },
  {
    id: 55,
    title: 'Why RWA, AI, and Privacy Tokens Are Outperforming Bitcoin in 2026',
    excerpt: 'Discover how institutional investors are shifting from Bitcoin to Real World Assets (RWA), AI infrastructure, and privacy tokens in the 2026 crypto cycle. Explore the market dynamics driving this major shift in investor preferences.',
    date: '2026-05-28',
    readTime: '7 min',
    tags: ['Crypto', 'Bitcoin', 'RWA', 'AI', 'Privacy Tokens', 'Investment', 'Finance'],
    slug: 'why-rwa-ai-privacy-tokens-outperforming-bitcoin-2026',
    image: '/images/blog/blog-12/header-image.jpg',
    imageAlt: 'Financial chart showing RWA, AI, and privacy tokens outperforming Bitcoin in 2026'
  },
  {
    id: 46,
    title: 'CLARITY Act Victory: Regulatory Clarity for $3T Crypto Market',
    excerpt: 'The cryptocurrency industry just achieved a monumental legislative breakthrough that could reshape the future of digital assets in the United States.',
    date: '2026-05-20',
    readTime: '8 min',
    tags: ['Crypto', 'Legislation', 'Regulation', 'Developers', 'Blockchain'],
    slug: 'clarity-act-victory-regulatory-clarity-3t-crypto-market',
    image: '/images/blog/blog-38/blockchain-regulation.jpg',
    imageAlt: 'Blockchain technology and regulatory framework for cryptocurrency'
  },
  {
    id: 54,
    title: 'EIP-7702: How Ethereum\'s Pectra Upgrade Finally Bridges EOAs and Smart Contracts',
    excerpt: 'EIP-7702 is the most significant change to Ethereum accounts since the network launched. It lets regular wallets temporarily become smart contracts — enabling batching, sponsorship, and privilege de-escalation without migrating to a new address. Here is what every developer needs to know.',
    date: '2026-05-18',
    readTime: '10 min',
    tags: ['Blockchain', 'Ethereum', 'EIP-7702', 'Account Abstraction', 'Smart Contracts', 'Pectra'],
    slug: 'eip-7702-ethereum-pectra-eoa-smart-contract-upgrade',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
    imageAlt: 'Ethereum EIP-7702 bridging EOAs and smart contracts in the Pectra upgrade'
  },
  {
    id: 53,
    title: 'ERC-7730: The Clear Signing Standard That Will Transform How You Verify Ethereum Transactions',
    excerpt: 'Blind signing is the silent killer of Ethereum security. ERC-7730 introduces a structured, human-readable format for transaction display that makes hardware wallet verification actually reliable. Here is why it matters for every developer building on Ethereum.',
    date: '2026-05-12',
    readTime: '9 min',
    tags: ['Blockchain', 'Ethereum', 'Security', 'ERC-7730', 'Wallets', 'Smart Contracts'],
    slug: 'erc-7730-clear-signing-ethereum-standard',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
    imageAlt: 'Ethereum transaction clear signing with ERC-7730 structured data display'
  },
  {
    id: 52,
    title: 'AI Meets Blockchain: How Agent Orchestration Could Transform Web3 Development',
    excerpt:
      'After analyzing 25+ research papers, 5,750+ community reactions, and 12 competitor solutions, we found a critical gap in blockchain infrastructure: no general-purpose multi-agent orchestration. Here\'s what this means for Web3 developers.',
    date: '2026-04-16',
    readTime: '10 min',
    tags: ['Blockchain', 'Web3', 'AI Agents', 'DeFi', 'Agent Orchestration', 'Research'],
    slug: 'ai-meets-blockchain-agent-orchestration-web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
    imageAlt: 'Blockchain network visualization with AI agent orchestration nodes connecting across Web3 infrastructure'
  },
  {
    id: 51,
    title: 'Beyond the Chatbot: The Rise of Agentic Orchestration and Digital Workforce',
    excerpt:
      'The chatbot era is ending. Discover how multi-agent orchestration, digital twins, and browser-native workflows are transforming enterprise AI from conversation tools to autonomous digital workforces.',
    date: '2026-04-14',
    readTime: '9 min',
    tags: ['AI Agents', 'Orchestration', 'Productivity', 'Enterprise AI', 'Browser Automation'],
    slug: 'beyond-the-chatbot-agentic-orchestration-digital-workforce',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
    imageAlt: 'Digital workforce coordination with multi-agent AI orchestration system'
  },
  {
    id: 50,
    title: 'Privacy-First Developer Tools: Why Your Data Should Never Leave Your Browser',
    excerpt:
      'The data harvesting problem in developer tooling is real. Learn why privacy-first tools matter in 2026 and how client-side processing protects your code, configs, and credentials.',
    date: '2026-03-18',
    readTime: '8 min',
    tags: ['Privacy', 'Security', 'Developer Tools', 'Open Source', 'Best Practices'],
    slug: 'privacy-first-developer-tools-2026',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop',
    imageAlt: 'Privacy shield representing data protection in developer tools'
  },
  {
    id: 49,
    title: 'JSON to YAML Converter: A Practical Guide for DevOps Engineers',
    excerpt:
      'Master JSON to YAML conversion for Docker Compose, Kubernetes, and CI/CD configs. Learn when to use each format and avoid common conversion pitfalls.',
    date: '2026-03-17',
    readTime: '7 min',
    tags: ['JSON', 'YAML', 'DevOps', 'Tutorial', 'Developer Tools'],
    slug: 'json-to-yaml-converter-tools',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
    imageAlt: 'Data format conversion between JSON and YAML'
  },
  {
    id: 48,
    title: 'JWT Decoder Security Guide: Inspect Tokens Without Risk',
    excerpt:
      'Deep dive into JWT structure, common vulnerabilities, and why you should never paste tokens into online decoders. Learn to inspect JWTs safely.',
    date: '2026-03-16',
    readTime: '8 min',
    tags: ['JWT', 'Security', 'Authentication', 'Tutorial', 'Developer Tools'],
    slug: 'jwt-decoder-security-guide',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=225&fit=crop',
    imageAlt: 'JWT token security and authentication'
  },
  {
    id: 47,
    title: 'SQL Formatter for Security: Spot Vulnerabilities in Plain Sight',
    excerpt:
      'Unformatted SQL is a security blind spot. Learn how proper formatting reveals injection vulnerabilities, improves code reviews, and makes your database layer safer.',
    date: '2026-03-15',
    readTime: '7 min',
    tags: ['SQL', 'Security', 'Database', 'Tutorial', 'Developer Tools'],
    slug: 'sql-formatter-security',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop',
    imageAlt: 'SQL query formatting for security review'
  },
  {
    id: 46,
    title: 'Base64 Encoder/Decoder: The Complete Developer Guide',
    excerpt:
      'Everything you need to know about Base64 encoding — what it is, when to use it (and when not to), common pitfalls, and why your encoding tool should be client-side.',
    date: '2026-03-14',
    readTime: '8 min',
    tags: ['Base64', 'Encoding', 'Tutorial', 'Security', 'Developer Tools'],
    slug: 'base64-encoder-decoder-complete-guide',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    imageAlt: 'Base64 encoding and decoding visualization'
  },
  {
    id: 45,
    title: 'From Dead Capital to Programmable Gold: 5 Shifts Redefining the Global Economy in 2026',
    excerpt: 'The global financial architecture is currently undergoing its most significant structural upgrade since the advent of electronic trading. We have entered the era of The Great Migration, where trillions of dollars in "dead capital"—illiquid assets like private credit, commercial real estate, and bespoke commodities—are being liberated from the friction of analog, intermediary-centric systems.',
    date: '2026-04-20',
    readTime: '7 min',
    tags: ['Blockchain', 'DeFi', 'Finance', 'AI', 'Tokenization', 'Global Economy'],
    slug: 'from-dead-capital-to-programmable-gold-2026',
    image: '/images/blog/blog-11/blockchain-settlement.jpg',
    imageAlt: 'Financial transformation from traditional capital to programmable gold tokens'
  },
  {
    id: 44,
    title: 'We Built 100+ Privacy-First Developer Tools. Here\'s What We Learned.',
    excerpt:
      'The story behind Formatho\'s 100+ developer tools — the architecture decisions, the hard trade-offs, and why we chose client-side processing over data harvesting.',
    date: '2026-03-13',
    readTime: '9 min',
    tags: ['Developer Tools', 'Launch', 'Privacy', 'Productivity', 'Open Source'],
    slug: '100-plus-developer-tools-launch',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
    imageAlt: '100+ privacy-first developer tools launch'
  },
  {
    id: 43,
    title: 'Regex Tester Security: Patterns That Protect and Patterns That Kill',
    excerpt:
      'Regular expressions can validate input or bring your server to its knees. Learn about ReDoS attacks, safe regex patterns, and why client-side testing matters.',
    date: '2026-03-12',
    readTime: '8 min',
    tags: ['Regex', 'Security', 'Tutorial', 'Developer Tools', 'Testing'],
    slug: 'regex-tester-security',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop',
    imageAlt: 'Regular expression testing for security'
  },
  {
    id: 42,
    title: 'QR Codes Without Tracking: Privacy-First QR Generation',
    excerpt:
      'Most free QR code generators track your data. Learn the privacy risks of online QR tools and how client-side generation keeps your information safe.',
    date: '2026-03-11',
    readTime: '7 min',
    tags: ['QR Codes', 'Privacy', 'Security', 'Tutorial', 'Developer Tools'],
    slug: 'qr-codes-without-tracking',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=225&fit=crop',
    imageAlt: 'Privacy-first QR code generation without tracking'
  },
  {
    id: 41,
    title: 'UUID Generator Masterclass: Everything You Need to Know About Unique Identifiers',
    excerpt:
      'Complete guide to UUIDs — from v1 to v5, security implications of predictable IDs, and how to generate unique identifiers safely in JavaScript and Node.js.',
    date: '2026-03-10',
    readTime: '8 min',
    tags: ['UUID', 'Security', 'JavaScript', 'Tutorial', 'Developer Tools'],
    slug: 'uuid-generator-masterclass',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
    imageAlt: 'Unique identifier generation and UUID variants'
  },
  {
    id: 59,
    title: '5 Privacy-Focused Developer Tools You Need in 2026',
    excerpt:
      'Discover 5 essential privacy-first developer tools for 2026. From client-side converters to end-to-end encrypted notes, protect your data without sacrificing productivity.',
    date: '2026-06-01',
    readTime: '12 min',
    tags: ['Privacy', 'Developer Tools', 'Security', 'Data Protection'],
    slug: '5-privacy-focused-developer-tools',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
    imageAlt: 'Privacy-first development with secure developer tools'
  }
]
