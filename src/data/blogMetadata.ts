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
    title: 'Building Battle-Tested Microservices: A Production Readiness Checklist',
    excerpt:
      'Everything you need to ship microservices with confidence. From circuit breakers to observability, this checklist covers production readiness.',
    date: '2026-03-27',
    readTime: '8 min',
    tags: ['Microservices', 'Backend', 'Production', 'Checklist', 'Architecture'],
    slug: 'building-battle-tested-microservices-a-production-readiness-checklist',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
    imageAlt: 'Modern microservices architecture with interconnected services'
  },
  {
    id: 39,
    title: 'Privacy-First Development: Building User Trust in 2026',
    excerpt:
      'Why privacy-first development is no longer optional. Learn how to build products that respect user data while delivering exceptional experiences.',
    date: '2026-03-27',
    readTime: '7 min',
    tags: ['Privacy', 'Security', 'Product Development', 'Trust', 'Best Practices'],
    slug: 'privacy-first-development-building-user-trust-in-2026',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop',
    imageAlt: 'Privacy shield representing data protection and user trust'
  }
]
