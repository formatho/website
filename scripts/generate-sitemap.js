/* eslint-env node */
import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'

const domain = 'https://formatho.com'
const currentDate = new Date().toISOString().split('T')[0]

/**
 * Parse blog post slugs from src/data/blogPosts.ts
 */
function parseBlogSlugs() {
  const blogPostsPath = resolve(process.cwd(), 'src', 'data', 'blogPosts.ts')
  const content = readFileSync(blogPostsPath, 'utf8')

  const slugs = []
  const slugRegex = /slug:\s*'([^']+)'/g
  let match
  while ((match = slugRegex.exec(content)) !== null) {
    // Skip type definition lines
    if (match[1] === 'string') continue
    slugs.push(match[1])
  }

  return slugs
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

  return [...new Set(routes)] // dedupe
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

// Dynamically generate blog routes
const blogSlugs = parseBlogSlugs()
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

const routes = [...staticRoutes, ...blogRoutes, ...toolRoutes]

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
console.log(`   ${blogRoutes.length} blog posts (auto-detected from blogPosts.ts)`)
console.log(`   ${toolRoutes.length} tool routes (auto-detected from router)`)
console.log(`   Total: ${routes.length} URLs`)
