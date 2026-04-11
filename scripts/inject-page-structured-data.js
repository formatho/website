#!/usr/bin/env node

/**
 * Post-build script to inject JSON-LD structured data into key landing pages
 * that don't get structured data from other inject scripts.
 * 
 * Pages covered: about, contact, pricing, agent-todo, agent-orchestrator, compare, docs/api
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, '..', 'dist')

const pages = [
  {
    path: 'about/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Formatho",
      "url": "https://formatho.com/tools/about",
      "description": "Learn about Formatho - our mission to build privacy-first developer tools and AI agent orchestration solutions.",
      "publisher": {
        "@type": "Organization",
        "name": "Formatho",
        "url": "https://formatho.com",
        "logo": { "@type": "ImageObject", "url": "https://formatho.com/tools/logo.png" },
        "sameAs": ["https://twitter.com/heyformatho", "https://github.com/nnn-gif/tools"]
      }
    },
    breadcrumbs: ["Home", "About"]
  },
  {
    path: 'contact/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Formatho",
      "url": "https://formatho.com/tools/contact",
      "description": "Get in touch with the Formatho team for support, partnerships, or feedback.",
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: ["Home", "Contact"]
  },
  {
    path: 'pricing/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Pricing - Formatho",
      "url": "https://formatho.com/tools/pricing",
      "description": "Formatho pricing plans. Free tools and Pro plans starting at $29/month for AI agent orchestration.",
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: ["Home", "Pricing"]
  },
  {
    path: 'agent-todo/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Agent Todo - AI Task Management",
      "url": "https://formatho.com/tools/agent-todo",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "description": "AI-powered task management for agent orchestration. Assign, track, and automate tasks across AI agents.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: ["Home", "Agent Todo"]
  },
  {
    path: 'agent-orchestrator/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Agent Orchestrator - AI Agent Management",
      "url": "https://formatho.com/tools/agent-orchestrator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "description": "Enterprise-grade AI agent management platform. Orchestrate, monitor, and scale AI agent workflows for teams.",
      "offers": { "@type": "Offer", "price": "29", "priceCurrency": "USD" },
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: ["Home", "Agent Orchestrator"]
  },
  {
    path: 'compare/index.html',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Agent-Todo vs Competitors",
      "url": "https://formatho.com/tools/compare",
      "description": "Compare Agent-Todo with Zapier, n8n, and Make. Privacy-first, developer-friendly AI agent task management.",
      "publisher": { "@type": "Organization", "name": "Formatho" }
    },
    breadcrumbs: ["Home", "Compare"]
  }
]

function generateBreadcrumbs(names) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": names.map((name, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": name
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
