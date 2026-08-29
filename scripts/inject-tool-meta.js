#!/usr/bin/env node

/**
 * Post-build script to inject tool-specific meta tags into generated HTML files
 * 
 * This script runs after vite-ssg build to add proper SEO meta tags to tool pages.
 * It reads route data and updates corresponding HTML files in dist/.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getFAQForRoute } from './faq-data.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com'
const twitterHandle = '@heyformatho'

/**
 * Extract tool routes from router/index.ts
 */
function extractToolRoutes() {
  // Read the single source of truth: src/data/routeMeta.ts
  // (no more fragile regex-parsing of the router source)
  const metaPath = path.join(__dirname, '..', 'src', 'data', 'routeMeta.ts')
  const metaContent = fs.readFileSync(metaPath, 'utf8')

  // Also read the router for path mappings
  const routerPath = path.join(__dirname, '..', 'src', 'router', 'index.ts')
  const routerContent = fs.readFileSync(routerPath, 'utf8')

  // Build name -> path map from the router
  const pathMap = {}
  const pathRegex = /path:\s*['"`](\/tools\/[^'"`]+)['"`],\s*\n\s*name:\s*['"`]([^'"`]+)['"`]/g
  let pm
  while ((pm = pathRegex.exec(routerContent)) !== null) {
    pathMap[pm[2]] = pm[1]
  }

  // Parse routeMeta entries (name -> {title, description, keywords})
  const routes = []
  const metaRegex = /'([^']+)':\s*\{\s*title:\s*'((?:[^'\\]|\\.)*)'\s*,\s*description:\s*'((?:[^'\\]|\\.)*)'(?:,\s*keywords:\s*'((?:[^'\\]|\\.)*)')?/g
  let mm
  while ((mm = metaRegex.exec(metaContent)) !== null) {
    const name = mm[1]
    const routePath = pathMap[name]
    if (routePath && !routePath.includes(':')) {
      routes.push({
        path: routePath,
        name,
        title: mm[2].replace(/\\'/g, "'"),
        description: mm[3].replace(/\\'/g, "'").replace(/\\n/g, ' '),
        keywords: mm[4] ? mm[4].replace(/\\'/g, "'") : ''
      })
    }
  }

  return routes
}

/**
 * Generate meta tags for a tool
 */
function generateMetaTags(tool) {
  const fullTitle = tool.title
    ? (tool.title.includes(siteName) ? tool.title : `${tool.title} - ${siteName}`)
    : `${siteName} - Privacy-First Developer Tools`
  const url = tool.path.startsWith('/') ? `${baseUrl}${tool.path}` : `${baseUrl}/${tool.path}`
  const image = `${baseUrl}/logo.png?v=2`

  return `
  <!-- Tool Page Meta Tags -->
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="title" content="${escapeHtml(fullTitle)}">
  <meta name="description" content="${escapeHtml(tool.description)}">
  ${tool.keywords ? `<meta name="keywords" content="${escapeHtml(tool.keywords)}">` : ''}

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(tool.description)}">
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${twitterHandle}">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(tool.description)}">
  <meta name="twitter:image" content="${image}">

  <!-- Canonical URL -->
  <link rel="canonical" href="${escapeHtml(url)}">

  <!-- SoftwareApplication Structured Data -->
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "url": url,
    "screenshot": url,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": tool.description,
    "featureList": "Runs 100% client-side. No data sent to servers. No signup required.",
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://formatho.com"
    }
  })}</script>

  <!-- BreadcrumbList Structured Data -->
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://formatho.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://formatho.com/tools" },
      { "@type": "ListItem", "position": 3, "name": tool.title, "item": url }
    ]
  })}</script>

  <!-- FAQPage Structured Data -->
  <script type="application/ld+json">${JSON.stringify(generateFAQSchema(tool.path))}</script>
`
}

/**
 * Generate FAQPage JSON-LD schema for a tool route
 */
function generateFAQSchema(routePath) {
  const faqs = getFAQForRoute(routePath)
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Update HTML file with tool-specific meta tags
 */
function updateToolHtml(htmlPath, tool) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8')

    // Generate new meta tags
    const newMetaTags = generateMetaTags(tool)

    // Meta tags to remove (we'll replace them with specific ones)
    const metaTagsToRemove = [
      /<title[^>]*>[^<]*<\/title>\s*/g,
      /<meta name="title"[^>]*>/g,
      /<meta name="description"[^>]*>/g,
      /<meta name="keywords"[^>]*>/g,
      /<meta property="og:type"[^>]*>/g,
      /<meta property="og:url"[^>]*>/g,
      /<meta property="og:title"[^>]*>/g,
      /<meta property="og:description"[^>]*>/g,
      /<meta property="og:image"[^>]*>/g,
      /<meta property="og:site_name"[^>]*>/g,
      /<meta name="twitter:card"[^>]*>/g,
      /<meta name="twitter:site"[^>]*>/g,
      /<meta name="twitter:url"[^>]*>/g,
      /<meta name="twitter:title"[^>]*>/g,
      /<meta name="twitter:description"[^>]*>/g,
      /<meta name="twitter:image"[^>]*>/g,
      /<link rel="canonical"[^>]*>/g
    ]

    // Remove existing meta tags
    metaTagsToRemove.forEach(regex => {
      html = html.replace(regex, '')
    })

    // Insert new meta tags before </head> - but skip the SoftwareApplication
    // schema if the SSG render (useSEO) already emitted one on this page
    let tags = newMetaTags
    if (/"@type":\s*"SoftwareApplication"/.test(html)) {
      tags = tags.replace(/\s*<script type="application\/ld\+json">\s*\{[\s\S]*?"SoftwareApplication"[\s\S]*?<\/script>/, '')
    }
    html = html.replace('</head>', `${tags}</head>`)

    // Write updated HTML back to file
    fs.writeFileSync(htmlPath, html)
    console.log(`✅ Updated: ${htmlPath}`)
    return true
  } catch (error) {
    console.error(`❌ Error updating ${htmlPath}:`, error.message)
    return false
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Injecting tool meta tags into built HTML files...\n')

  const distDir = path.join(__dirname, '..', 'dist')

  // Extract tool routes
  const toolRoutes = extractToolRoutes()
  console.log(`📋 Found ${toolRoutes.length} tool routes\n`)

  let updatedCount = 0

  toolRoutes.forEach(tool => {
    const htmlPath = path.join(distDir, `${tool.path}.html`)

    if (fs.existsSync(htmlPath)) {
      if (updateToolHtml(htmlPath, tool)) {
        updatedCount++
      }
    } else {
      console.log(`⚠️  File not found: ${htmlPath}`)
    }
  })

  console.log(`\n✅ Updated ${updatedCount} tool HTML files`)

  if (updatedCount < toolRoutes.length) {
    console.log(`⚠️  ${toolRoutes.length - updatedCount} tool pages were not updated`)
  }

  // Fix /tools index page canonical: SSG leaves the shell's `canonical → /`
  // on it, which makes Google treat /tools as a duplicate of the homepage
  // (GSC: "Duplicate, Google chose different canonical").
  for (const p of ['tools.html', 'tools/index.html']) {
    const idxPath = path.join(distDir, p)
    if (!fs.existsSync(idxPath)) continue
    let html = fs.readFileSync(idxPath, 'utf8')
    const before = html
    html = html
      .replace(/<link rel="canonical"[^>]*>/g, '<link rel="canonical" href="https://formatho.com/tools">')
      .replace(/<meta property="og:url"[^>]*>/g, '<meta property="og:url" content="https://formatho.com/tools">')
    if (html !== before) {
      fs.writeFileSync(idxPath, html)
      console.log(`✅ Fixed canonical on /tools (${p})`)
    }
  }
}

main()
