#!/usr/bin/env node

/**
 * Post-build script to inject JSON-LD structured data into key landing pages
 * that don't get structured data from other inject scripts.
 * 
 * Pages covered: about, contact
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, '..', 'dist')

const pages = [
  {
    path: 'about.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Formatho",
      "url": "https://formatho.com/about",
      "description": "Learn about Formatho - our mission to build privacy-first developer tools and AI agent orchestration solutions.",
      "publisher": {
        "@type": "Organization",
        "name": "Formatho",
        "url": "https://formatho.com",
        "logo": { "@type": "ImageObject", "url": "https://formatho.com/tools/logo.png" },
        "sameAs": ["https://twitter.com/heyformatho", "https://github.com/nnn-gif/tools"]
      }
    },
    breadcrumbs: [
      { name: "Home", url: "https://formatho.com/" },
      { name: "About", url: "https://formatho.com/about" }
    ]
  },
  {
    path: 'contact.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Formatho",
      "url": "https://formatho.com/contact",
      "description": "Get in touch with the Formatho team for support, partnerships, or feedback.",
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: [
      { name: "Home", url: "https://formatho.com/" },
      { name: "Contact", url: "https://formatho.com/contact" }
    ]
  }
]

function generateBreadcrumbs(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": entries.map((entry, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": entry.name,
      "item": entry.url
    }))
  }
}

function injectSchema(htmlPath, page) {
  const fullPath = path.join(distDir, page.path)
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Not found: ${page.path}`)
    return false
  }

  let html = fs.readFileSync(fullPath, 'utf8')

  const schemaTag = `\n  <script type="application/ld+json">${JSON.stringify(page.schema)}</script>`
  const breadcrumbTag = `\n  <script type="application/ld+json">${JSON.stringify(generateBreadcrumbs(page.breadcrumbs))}</script>`

  html = html.replace('</head>', `${schemaTag}${breadcrumbTag}\n</head>`)

  fs.writeFileSync(fullPath, html)
  console.log(`✅ Injected: ${page.path}`)
  return true
}

console.log('🔧 Injecting structured data into landing pages...\n')

let updated = 0
for (const page of pages) {
  if (injectSchema(null, page)) updated++
}

console.log(`\n✅ Updated ${updated}/${pages.length} pages`)
