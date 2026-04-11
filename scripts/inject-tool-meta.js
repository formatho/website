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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com/tools'
const twitterHandle = '@heyformatho'

/**
 * Extract tool routes from router/index.ts
 */
function extractToolRoutes() {
  const routerPath = path.join(__dirname, '..', 'src', 'router', 'index.ts')
  const routerContent = fs.readFileSync(routerPath, 'utf8')

  const routes = []
  const routeRegex = /{\s*path:\s*['"`](.*?)['"`],\s*name:\s*['"`](.*?)['"`],\s*component:.*?,\s*meta:\s*{\s*title:\s*['"`](.*?)['"`],\s*description:\s*['"`](.*?)['"`](?:,\s*keywords:\s*['"`](.*?)['"`])?\s*}/gs

  let match
  while ((match = routeRegex.exec(routerContent)) !== null) {
    const routePath = match[1]
    const routeName = match[2]
    const title = match[3]
    const description = match[4]
    const keywords = match[5] || ''

    if (routePath && routePath !== 'blogs' && !routePath.includes(':')) {
      routes.push({
        path: routePath,
        name: routeName,
        title,
        description,
        keywords
      })
    }
  }

  return routes
}

/**
 * Generate meta tags for a tool
 */
function generateMetaTags(tool) {
  const fullTitle = tool.title ? `${tool.title} - ${siteName}` : `${siteName} - Privacy-First Developer Tools`
  const url = `${baseUrl}/${tool.path}`
  const image = `${baseUrl}/logo.png`

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
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": tool.description,
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://formatho.com/tools/" },
      { "@type": "ListItem", "position": 2, "name": tool.title, "item": url }
    ]
  })}</script>
`
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

    // Find and replace title tag
    const titleRegex = /<title>[^<]*<\/title>/
    if (titleRegex.test(html)) {
      html = html.replace(titleRegex, `<title>${escapeHtml(tool.title || 'Formatho - Privacy-First Developer Tools')} - ${siteName}</title>`)
    }

    // Meta tags to remove (we'll replace them with specific ones)
    const metaTagsToRemove = [
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

    // Insert new meta tags before </head>
    html = html.replace('</head>', `${newMetaTags}</head>`)

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
}

main()
