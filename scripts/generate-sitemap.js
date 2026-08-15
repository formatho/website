/* eslint-env node */
import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'

const domain = 'https://formatho.com'
const strapiUrl = process.env.VITE_STRAPI_URL || 'https://cms.formatho.com'
const currentDate = new Date().toISOString().split('T')[0]

/**
 * Fetch blog post slugs from Strapi CMS (with retries — a failed fetch
 * would silently drop every blog URL from the sitemap)
 */
async function fetchBlogSlugs(attempt = 1, maxAttempts = 3) {
  try {
    const res = await fetch(
      `${strapiUrl}/api/blog-posts?fields[0]=slug&pagination[pageSize]=200`,
      { signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) {
      throw new Error(`Strapi returned ${res.status}`)
    }
    const data = await res.json()
    const posts = Array.isArray(data) ? data : data.data || []
    const slugs = posts.map((p) => p.slug).filter(Boolean)
    if (slugs.length === 0) {
      throw new Error('Strapi returned an empty blog list')
    }
    return slugs
  } catch (err) {
    if (attempt < maxAttempts) {
      console.warn(
        `⚠️  Attempt ${attempt}/${maxAttempts} failed: ${err.message}. Retrying in 3s...`
      )
      await new Promise((r) => setTimeout(r, 3000))
      return fetchBlogSlugs(attempt + 1, maxAttempts)
    }
    console.warn(`⚠️  Failed to fetch blog slugs from Strapi after ${maxAttempts} attempts: ${err.message}`)
    console.warn('⚠️  Falling back to previously committed sitemap blog entries to avoid dropping URLs')
    // Fall back to the blog URLs already in the committed sitemap rather
    // than emitting a sitemap with zero blog entries
    try {
      const existing = readFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), 'utf8')
      return [...existing.matchAll(/<loc>https:\/\/formatho\.com\/blogs\/([^<]+)<\/loc>/g)].map(
        (m) => m[1]
      )
    } catch {
      return []
    }
  }
}

/**
 * Parse tool routes from src/router/index.ts
 */
function parseToolRoutes() {
  const routerPath = resolve(process.cwd(), 'src', 'router', 'index.ts')
  const content = readFileSync(routerPath, 'utf8')

  const routes = []
  const routeRegex = /path:\s*['"`](tools\/[^'"`]+)['"`]/g
  let match
  while ((match = routeRegex.exec(content)) !== null) {
    routes.push('/' + match[1])
  }

  return [...new Set(routes)].filter(r => !r.includes('/admin/')) // dedupe & exclude admin
}

// Static pages
const staticRoutes = [
  { path: '/tools', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/agent-identity-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/agents', priority: '0.8', changefreq: 'monthly' },
]

async function main() {
// Dynamically generate blog routes
const blogSlugs = await fetchBlogSlugs()
const blogRoutes = blogSlugs.map((slug, i) => ({
  path: `/blogs/${slug}`,
  priority: i < 10 ? '0.8' : '0.7',
  changefreq: 'monthly',
}))

// Dynamically generate tool routes
const toolPaths = parseToolRoutes()
const toolRoutes = toolPaths.map((p) => ({
  path: p,
  priority: p === '/tools/markdown' || p === '/tools/bpmn' || p === '/tools/bpmn-to-visio' ? '0.9' : '0.8',
  changefreq: 'monthly',
}))

// Filter out admin routes - they should NOT be in the public sitemap
const allRoutes = [...staticRoutes, ...blogRoutes, ...toolRoutes]
const routes = allRoutes.filter(r => !r.path.includes('/admin/'))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

const outputPath = resolve(process.cwd(), 'public/sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf-8')

console.log(`✅ Sitemap generated at ${outputPath}`)
console.log(`   ${staticRoutes.length} static pages`)
console.log(`   ${blogRoutes.length} blog posts (fetched from Strapi)`)
console.log(`   ${toolRoutes.length} tool routes (auto-detected from router)`)
console.log(`   Total: ${routes.length} URLs`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
