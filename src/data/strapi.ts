/**
 * Strapi CMS API client for Formatho blog
 * Fetches blog posts from cms.formatho.com
 */

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://cms.formatho.com'

// No token needed — public role has find/findOne permissions

export interface StrapiBlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string
  image: string
  imageAlt: string
  metaDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaLink: string
  ctaButtonText: string
  featured: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  image?: string
  imageAlt?: string
  content: string
  metaDescription?: string
  cta?: {
    title: string
    description: string
    link: string
    buttonText: string
  }
  relatedTools?: { name: string; description: string; link: string }[]
}

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

/**
 * Map Strapi response to BlogPost interface
 */
function mapStrapiPost(s: StrapiBlogPost): BlogPost {
  const post: BlogPost = {
    id: s.id,
    title: s.title,
    excerpt: s.excerpt,
    date: s.date,
    readTime: s.readTime,
    tags: s.tags ? s.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    slug: s.slug,
    content: s.content,
  }

  if (s.image) post.image = s.image
  if (s.imageAlt) post.imageAlt = s.imageAlt
  if (s.metaDescription) post.metaDescription = s.metaDescription

  if (s.ctaTitle || s.ctaDescription || s.ctaLink || s.ctaButtonText) {
    post.cta = {
      title: s.ctaTitle || '',
      description: s.ctaDescription || '',
      link: s.ctaLink || '',
      buttonText: s.ctaButtonText || '',
    }
  }

  return post
}

/**
 * Fetch all blog posts metadata (for listing page)
 */
export async function fetchBlogMetadata(): Promise<BlogMetadata[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=date&fields[4]=readTime&fields[5]=tags&fields[6]=image&fields[7]=imageAlt&pagination[pageSize]=100&sort=date:desc`
  )

  if (!res.ok) {
    console.error('Failed to fetch blog metadata:', res.status)
    return []
  }

  const data = await res.json()

  // Strapi v5 returns array directly or {data: [...]} depending on config
  const posts = Array.isArray(data) ? data : data.data || []

  return posts.map((s: StrapiBlogPost): BlogMetadata => ({
    id: s.id,
    title: s.title,
    excerpt: s.excerpt,
    date: s.date,
    readTime: s.readTime,
    tags: s.tags ? s.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    slug: s.slug,
    image: s.image || undefined,
    imageAlt: s.imageAlt || undefined,
  }))
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`
  )

  if (!res.ok) {
    console.error('Failed to fetch blog post:', res.status)
    return null
  }

  const data = await res.json()
  const posts = Array.isArray(data) ? data : data.data || []

  if (!posts || posts.length === 0) {
    return null
  }

  return mapStrapiPost(posts[0])
}

/**
 * Fetch all blog slugs (for SSG route generation)
 */
export async function fetchAllSlugs(): Promise<string[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?fields[0]=slug&pagination[pageSize]=200`
  )

  if (!res.ok) {
    console.error('Failed to fetch blog slugs:', res.status)
    return []
  }

  const data = await res.json()
  const posts = Array.isArray(data) ? data : data.data || []

  return posts.map((p: StrapiBlogPost) => p.slug)
}
