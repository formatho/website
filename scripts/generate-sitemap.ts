import { writeFileSync } from 'fs'
import { tools } from '../src/data/tools'

const BASE_URL = 'https://formatho.com'

function generateSitemap(): string {
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/tools', changefreq: 'weekly', priority: '0.9' },
    { url: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { url: '/docs/api', changefreq: 'monthly', priority: '0.7' },
    { url: '/beta', changefreq: 'monthly', priority: '0.7' },
    { url: '/beta-feedback', changefreq: 'monthly', priority: '0.5' },
    { url: '/about', changefreq: 'monthly', priority: '0.6' },
  ]

  const toolPages: Array<{ url: string; changefreq: string; priority: string }> = []

  for (const category of tools) {
    for (const tool of category.items) {
      toolPages.push({
        url: tool.route,
        changefreq: 'monthly',
        priority: '0.8',
      })
    }
  }

  const allPages = [...staticPages, ...toolPages]
  const today = new Date().toISOString().split('T')[0]

  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`
}

const sitemap = generateSitemap()
writeFileSync('public/sitemap.xml', sitemap)
console.log(`✅ Generated sitemap.xml with ${sitemap.split('<url>').length - 1} URLs`)
