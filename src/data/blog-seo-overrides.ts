/**
 * SEO-optimized metadata overrides for blog posts.
 * 
 * These ensure exactly one <title> and one meta description per page,
 * with titles between 45-58 characters and descriptions between 120-155 characters.
 * Self-referencing canonical links are always absolute HTTPS URLs.
 * 
 * Used by:
 * - BlogPostView.vue (client-side rendering)
 * - inject-blog-meta.js (SSG build-time injection)
 */

export interface BlogSEOMeta {
  /** SEO-optimized title (45-58 chars, under 550px) — NOT suffixed with site name */
  seoTitle: string
  /** Meta description (120-155 chars, under 950px) */
  seoDescription: string
  /** Self-referencing canonical URL (absolute HTTPS) */
  canonical?: string
}

/**
 * Override map keyed by blog post slug.
 * For posts not listed here, the Strapi title/excerpt will be used as fallback.
 */
export const blogSEOOverrides: Record<string, BlogSEOMeta> = {
  'optimizing-agent-workflows-task-orchestration-productivity': {
    seoTitle: 'Optimizing AI Agent Workflows and Task Orchestration',
    seoDescription: 'A deep dive into managing AI agent workloads, task orchestration, and preventing task loss between sessions. Build a productive digital workforce with Formatho.'
  },
  'future-of-rwa-tokenization-5-megatrends-reshaping-finance-2030': {
    seoTitle: 'The Future of RWA Tokenization: 5 Megatrends by 2030',
    seoDescription: 'Discover the five megatrends reshaping finance and real-world asset tokenization by 2030. An institutional guide to smart contract compliance and programmable capital.'
  },
  'generate-qr-codes-without-tracking-pixels': {
    seoTitle: 'Tracking Pixels: The Complete Privacy-First Guide',
    seoDescription: 'Learn how to implement data tracking without compromising user privacy. Explore privacy-first QR code generation and client-side analytics for modern developers.'
  },
  'convert-json-to-yaml-no-upload': {
    seoTitle: 'Convert JSON to YAML in 1 Second with Zero Uploads',
    seoDescription: 'A practical guide for DevOps engineers on converting JSON to YAML instantly. Learn why browser-native, client-side tools protect your sensitive configuration data.'
  },
  'decode-jwt-tokens-without-server-exposure': {
    seoTitle: 'Decode and Inspect JWT Tokens Without Server Exposure',
    seoDescription: 'Master JSON Web Token debugging without sending sensitive payloads to external servers. Explore 100% client-side security tools designed for developers.'
  },
  'sql-formatter-security': {
    seoTitle: 'SQL Formatter for Security: Spot Code Vulnerabilities',
    seoDescription: 'Learn SQL formatting best practices to make complex queries readable and identify security vulnerabilities in plain sight. Run browser-native database tools for free.'
  },
  'encode-decode-base64-files-never-leave-browser': {
    seoTitle: "A Developer's Guide to Encoding and Decoding Base64",
    seoDescription: 'The complete developer guide to Base64 strings and file encoding. Why your data and files should never leave your browser when debugging application code.'
  },
  'uuid-generator-masterclass': {
    seoTitle: 'UUID Generator Masterclass: UUID v1 vs v4 Explained',
    seoDescription: 'Everything you need to know about Universally Unique Identifiers. Compare UUID v1 versus v4 and learn when to use ULIDs in your database architecture.'
  },
  'india-privacy-first-developer-toolkit-2026': {
    seoTitle: "India's #1 Privacy-First Developer Toolkit Blueprint",
    seoDescription: 'Explore the 2026 blueprint for data sovereignty and privacy-first software development. Discover over one hundred free, client-side developer utilities.'
  }
}

/**
 * Get SEO metadata for a blog post slug.
 * Returns override if available, otherwise null (caller falls back to Strapi data).
 */
export function getBlogSEO(slug: string): BlogSEOMeta | null {
  const override = blogSEOOverrides[slug]
  if (override) {
    return {
      ...override,
      canonical: override.canonical || `https://formatho.com/blogs/${slug}`
    }
  }
  return null
}

/**
 * Validate a title meets SEO requirements.
 * Returns the title if valid, or null if it needs fixing.
 */
export function validateTitle(title: string): boolean {
  const len = title.length
  return len >= 45 && len <= 58
}

/**
 * Validate a meta description meets SEO requirements.
 */
export function validateDescription(desc: string): boolean {
  const len = desc.length
  return len >= 120 && len <= 155
}
