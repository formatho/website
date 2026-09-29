/* eslint-env node */
import { writeFileSync, readFileSync } from 'fs'
import { localPosts } from './blog-upgrade/local-posts.mjs'
import { resolve } from 'path'
import { execSync } from 'node:child_process'

const domain = 'https://formatho.com'
const strapiUrl = process.env.VITE_STRAPI_URL || 'https://cms.formatho.com'

/**
 * Git-derived lastmod for recrawl signalling: Google ignores IndexNow, so a
 * <lastmod> that moves with real content changes is the standing recrawl
 * nudge. Date = last commit touching the route's view file OR the shared
 * content sources (faq-data.js content kits, routeMeta titles). Cached per
 * file-set; silently omitted when git is unavailable (previous behavior).
 */
const gitDateCache = new Map()
function gitLastmod(files) {
  const key = files.join('|')
  if (gitDateCache.has(key)) return gitDateCache.get(key)
  let date
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.map(f => `'${f}'`).join(' ')}`, {
      cwd: process.cwd(), stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000
    }).toString().trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out
  } catch { /* no git / no commits — omit lastmod */ }
  gitDateCache.set(key, date)
  return date
}

/** Map /tools/x -> src/views/<Name>.vue via the router's import() lines
 *  (handles both single-line '@/views/' and multiline commented '../views/' formats) */
function parseToolViewMap() {
  const content = readFileSync(resolve(process.cwd(), 'src', 'router', 'index.ts'), 'utf8')
  const map = new Map()
  const re = /path:\s*['"`](\/tools\/[^'"`]+)['"`][\s\S]{0,150}?component:[\s\S]{0,150}?import\(\s*(?:\/\*[\s\S]*?\*\/\s*)?['"`](?:@\/|\.\.\/|\.\/)views\/([^'"`]+)['"`]/g
  let m
  while ((m = re.exec(content)) !== null) map.set(m[1], m[2])
  return map
}

/**
 * Last commit whose diff touched the route's own kit block in faq-data.js
 * (git -G matches the diff lines containing the route slug). Slightly
 * under-signaling by design — stable lastmods are what earn Google trust.
 */
function kitBlockDate(routePath) {
  const slug = routePath.split('/').pop()
  const key = `kit:${routePath}`
  if (gitDateCache.has(key)) return gitDateCache.get(key)
  let date
  try {
    const out = execSync(`git log -1 --format=%cs -G "tools/${slug}" -- scripts/faq-data.js`, {
      cwd: process.cwd(), stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000
    }).toString().trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out
  } catch { /* git unavailable — omit */ }
  gitDateCache.set(key, date)
  return date
}

/**
 * Fetch blog post slugs from Strapi CMS (with retries — a failed fetch
 * would silently drop every blog URL from the sitemap)
 */
async function fetchBlogSlugs(attempt = 1, maxAttempts = 3) {
  try {
    const res = await fetch(
      `${strapiUrl}/api/blog-posts?fields[0]=slug&fields[1]=date&pagination[pageSize]=200`,
      { signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) {
      throw new Error(`Strapi returned ${res.status}`)
    }
    const data = await res.json()
    const posts = Array.isArray(data) ? data : data.data || []
    const entries = posts.map((p) => ({ slug: p.slug, date: p.date })).filter((p) => p.slug)
    if (entries.length === 0) {
      throw new Error('Strapi returned an empty blog list')
    }
    return entries
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
        (m) => ({ slug: m[1], date: undefined })
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
  const routeRegex = /path:\s*['"`]\/?(tools\/[^'"`]+)['"`]/g

  // Collect redirect-only paths to exclude (they waste crawl budget)
  const redirectRegex = /path:\s*['"`]\/?(tools\/[^'"`]+)['"`],\s*(?:name:\s*[^,]+,\s*)?redirect:/g
  const redirectPaths = new Set()
  let redirMatch
  while ((redirMatch = redirectRegex.exec(content)) !== null) {
    redirectPaths.add('/' + redirMatch[1])
  }

  let match
  while ((match = routeRegex.exec(content)) !== null) {
    routes.push('/' + match[1])
  }

  return [...new Set(routes)].filter(r => !r.includes('/admin/') && !redirectPaths.has(r))
}

/**
 * Parse funnel detail slugs from src/data/funnels.ts so new funnels
 * flow into the sitemap automatically (quoted values only — the
 * `slug: string` interface field is never matched)
 */
function parseFunnelSlugs() {
  const funnelsPath = resolve(process.cwd(), 'src', 'data', 'funnels.ts')
  const content = readFileSync(funnelsPath, 'utf8')
  const slugs = []
  const slugRegex = /^\s+slug:\s*['"`]([^'"`]+)['"`]/gm
  let match
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1])
  }
  return [...new Set(slugs)]
}

// Static pages
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/tools', priority: '1.0', changefreq: 'weekly' },
  { path: '/category/web3', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/security', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/data-formats', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/developer', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/converters', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/network', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/compliance', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/runtime', priority: '0.9', changefreq: 'weekly' },
  { path: '/eliza-tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/funnels', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/agents', priority: '0.8', changefreq: 'monthly' },
  { path: '/enterprise', priority: '0.9', changefreq: 'monthly' },
  ...['owasp', 'soc2', 'sap', 'okta', 'ping-federate'].map(slug => ({ path: `/dev-tools/${slug}`, priority: '0.8', changefreq: 'weekly' })),
  ...[
    'ethereum', 'arbitrum', 'base', 'optimism', 'polygon', 'bnb-chain',
    'avalanche', 'zksync', 'linea', 'blast', 'mantle', 'cronos', 'ritual', 'hyperevm', 'katana', 'monad', 'robinhood', 'unichain', 'stable', 'tempo', 'world-chain'
  ].map(slug => ({ path: `/evm-tools/${slug}`, priority: '0.8', changefreq: 'weekly' })),
]

async function main() {
// Dynamically generate blog routes — parked posts (thin content, noindexed
// at build) are excluded so the sitemap advertises only indexable URLs
const { parked } = JSON.parse(
  readFileSync(resolve(process.cwd(), 'scripts', 'parked-posts.json'), 'utf8')
)
const parkedSet = new Set(parked)
const fetchedEntries = (await fetchBlogSlugs()).filter((p) => !parkedSet.has(p.slug))
const localBySlug = new Map(localPosts.map((p) => [p.slug, p.date]))
const fetchedBySlug = new Map(fetchedEntries.map((p) => [p.slug, p.date]))
// Dedupe by slug: a post present in BOTH Strapi and localPosts must be
// emitted once (duplicate <loc> violates the sitemap protocol and wastes
// crawl budget). Strapi date wins, local date is the fallback.
const blogEntries = [...new Set([...fetchedBySlug.keys(), ...localPosts.map((p) => p.slug)])]
  .filter((slug) => !parkedSet.has(slug) || localBySlug.has(slug))
  .map((slug) => ({ slug, date: fetchedBySlug.get(slug) ?? localBySlug.get(slug) }))
const blogRoutes = blogEntries.map((p, i) => ({
  path: `/blogs/${p.slug}`,
  priority: i < 10 ? '0.8' : '0.7',
  changefreq: 'monthly',
  lastmod: /^\d{4}-\d{2}-\d{2}/.test(p.date || '') ? p.date.slice(0, 10) : undefined,
}))

// Dynamically generate tool routes
const toolPaths = parseToolRoutes()
const toolViewMap = parseToolViewMap()
// faq-data.js content renders ONLY on routes that have a kit/FAQ entry —
// per-route kit dates via pickaxe so one kit edit doesn't stamp every page.
const { toolSEOContent, toolSpecificFAQ } = await import('./faq-data.js')
const kitRoutes = new Set([...Object.keys(toolSEOContent), ...Object.keys(toolSpecificFAQ)])
// /tools/all duplicates /tools (same catalog page) — exclude from sitemap
const toolRoutes = toolPaths.filter((p) => p !== '/tools/all').map((p) => {
  const view = toolViewMap.get(p)
  const viewDate = view ? gitLastmod([`src/views/${view}`]) : undefined
  const candidates = [viewDate, kitRoutes.has(p) ? kitBlockDate(p) : undefined].filter(Boolean)
  return {
    path: p,
    priority: p === '/tools/markdown' || p === '/tools/bpmn' || p === '/tools/bpmn-to-visio' ? '0.9' : '0.8',
    changefreq: 'monthly',
    lastmod: candidates.length ? candidates.sort().pop() : undefined,
  }
})

// Funnel detail routes — data-driven from src/data/funnels.ts
const funnelSlugs = parseFunnelSlugs()
const funnelRoutes = funnelSlugs.map((slug) => ({
  path: `/funnels/${slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}))

// Filter out admin routes - they should NOT be in the public sitemap
// Dedupe by path — belt-and-braces so no source combination can ever
// emit the same <loc> twice
const allRoutes = [...staticRoutes, ...funnelRoutes, ...blogRoutes, ...toolRoutes]
const routePaths = new Set()
const routes = allRoutes.filter((r) => {
  if (r.path.includes('/admin/')) return false
  if (routePaths.has(r.path)) return false
  routePaths.add(r.path)
  return true
})

// Safety check: never write a suspiciously small sitemap (CI environments
// where Strapi is unreachable and the fallback also fails would produce
// an empty file that replaces the committed version)
const MIN_EXPECTED_URLS = 50
if (routes.some((r) => r.path.includes('undefined'))) {
  console.error('⛔ ABORTED: a route path contains "undefined" — a slug/date mapping broke upstream.')
  console.error('   Offenders:', routes.filter((r) => r.path.includes('undefined')).slice(0, 3).map((r) => r.path))
  process.exit(1)
}
if (routes.length < MIN_EXPECTED_URLS) {
  console.error(`⛔ ABORTED: only ${routes.length} URLs (expected 50+). Keeping existing sitemap.`)
  console.error(`   Blog slugs: ${blogEntries.length}, tools: ${toolPaths.length}, static: ${staticRoutes.length}`)
  process.exit(1)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${domain}${route.path}</loc>${route.lastmod ? `
    <lastmod>${route.lastmod}</lastmod>` : ''}
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
console.log(`   ${funnelRoutes.length} funnel detail slugs (from src/data/funnels.ts)`)
console.log(`   ${blogRoutes.length} blog posts (fetched from Strapi)`)
console.log(`   ${toolRoutes.length} tool routes (auto-detected from router)`)
console.log(`   Total: ${routes.length} URLs`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
