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
    id: 44,
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
    id: 43,
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
    id: 42,
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
    id: 41,
    title: 'From Chaos to Order: Managing AI Agent Workloads',
    excerpt:
      'How persistent task management transformed our AI operations from scattered to systematic. Real results: 90% reduction in duplicate work, 3x faster task completion.',
    date: '2026-03-25',
    readTime: '6 min',
    tags: ['AI Agents', 'Workflow Management', 'Task Management', 'Automation', 'Productivity'],
    slug: 'from-chaos-to-order-managing-ai-agent-workloads',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    imageAlt: 'Organized AI agent workflow with persistent task management system'
  },
  {
    id: 40,
    title: 'Agent-Todo vs Traditional Task Managers: What\'s Different?',
    excerpt:
      'Why AI agents need purpose-built task management. Compare Agent-Todo with Todoist, Asana, and Trello — API-first design, agent memory, and 10x better automation.',
    date: '2026-03-26',
    readTime: '8 min',
    tags: ['AI Agents', 'Task Management', 'Comparison', 'Productivity', 'Automation'],
    slug: 'building-battle-tested-microservices-a-production-readiness-checklist',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    imageAlt: 'Split screen showing traditional task manager UI versus API code interface'
  },
  {
    id: 39,
    title: 'Why AI Agents Need Their Own Task Management System',
    excerpt:
      'Your AI agents forget everything between sessions. Discover how persistent task management transforms agent productivity with 10x output gains.',
    date: '2026-03-26',
    readTime: '7 min',
    tags: ['AI Agents', 'Task Management', 'Productivity', 'Privacy', 'Automation'],
    slug: 'privacy-first-development-building-user-trust-in-2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    imageAlt: 'AI agents managing tasks in a persistent queue system'
  }
]
