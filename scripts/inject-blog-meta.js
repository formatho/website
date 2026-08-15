#!/usr/bin/env node
/* eslint-env node */

/**
 * Post-build script to inject blog-specific meta tags into generated HTML files
 * 
 * This script runs after vite-ssg build to add proper SEO meta tags to blog pages.
 * It fetches blog post data from Strapi CMS and updates the HTML files.
 * 
 * IMPORTANT: This script must be run AFTER vite-ssg build
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'https://cms.formatho.com'

/**
 * Fetch all blog posts from Strapi CMS
 */
async function fetchBlogPosts() {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=date&fields[4]=tags&fields[5]=image&fields[6]=imageAlt&pagination[pageSize]=200&sort=date:desc`
  )

  if (!res.ok) {
    throw new Error(`Strapi returned ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()
  const posts = Array.isArray(data) ? data : data.data || []

  // Normalize tags from comma-separated string to array
  return posts.map((s) => ({
    title: s.title,
    slug: s.slug,
    excerpt: s.excerpt || '',
    date: s.date || '',
    image: s.image || '',
    imageAlt: s.imageAlt || '',
    tags: s.tags ? s.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
  }))
}

/**
 * SEO overrides for specific blog posts.
 * Ensures optimized titles (45-58 chars) and descriptions (120-155 chars).
 */
const blogSEOOverrides = {
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
 * Get SEO-optimized title and description for a blog post.
 * Falls back to Strapi data if no override exists.
 */
function getBlogSEO(slug, fallbackTitle, fallbackExcerpt) {
  const override = blogSEOOverrides[slug]
  if (override) {
    return { title: override.seoTitle, description: override.seoDescription }
  }
  return { title: fallbackTitle, description: fallbackExcerpt }
}

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com'
const twitterHandle = '@heyformatho'

/**
 * Generate meta tags for a blog post
 */
function generateMetaTags(post) {
  const seo = getBlogSEO(post.slug, post.title, post.excerpt)
  const fullTitle = seo.title.includes(siteName) ? seo.title : `${seo.title} - ${siteName}`
  const url = `${baseUrl}/blogs/${post.slug}`
  const image = post.image 
    ? (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`)
    : `${baseUrl}/logo.png`
  
  const keywords = post.tags.join(', ')
  
  // Generate JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": seo.title,
    "image": image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://formatho.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "description": seo.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url
  }
  
  return `
  <!-- Blog Post SEO Meta Tags (injected by inject-blog-meta.js) -->
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(seo.description)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <meta name="author" content="${siteName}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(seo.description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="og:locale" content="en_US">
  <meta property="article:published_time" content="${post.date}">
  <meta property="article:modified_time" content="${post.date}">
  <meta property="article:author" content="${siteName}">
  <meta property="article:section" content="${escapeHtml(post.tags[0] || 'Technology')}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${twitterHandle}">
  <meta name="twitter:creator" content="${twitterHandle}">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(seo.description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  
  <!-- Canonical URL (self-referencing, absolute HTTPS) -->
  <link rel="canonical" href="${escapeHtml(url)}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
`
}

/**
 * Generate meta tags for the blog listing page
 */
function generateBlogListingMetaTags(blogPosts) {
  const title = 'Developer Guides, Tutorials, and AI Insights | Formatho Blog'
  const description = 'Explore expert developer guides, tutorials, and technical insights from the Formatho team. Deep dives into AI agent orchestration, blockchain, RWA tokenization, and privacy-first tools with zero fluff.'
  const url = `${baseUrl}/blogs`
  
  // Generate Blog listing schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Formatho Blog",
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://formatho.com"
    },
    "blogPost": blogPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "url": `${baseUrl}/blogs/${post.slug}`
    }))
  }
  
  return `
  <!-- Blog Listing SEO Meta Tags (injected by inject-blog-meta.js) -->
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="formatho blog, developer tools, privacy-first, ai agents, tutorials, guides">
  <meta name="author" content="${siteName}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${baseUrl}/logo.png">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${twitterHandle}">
  <meta name="twitter:creator" content="${twitterHandle}">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}/logo.png">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${escapeHtml(url)}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(blogSchema)}</script>
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
 * Meta tag patterns to remove before adding new ones
 */
const metaTagPatterns = [
  // Title tag (a single guarded title is re-inserted with the meta block)
  /<title[^>]*>[^<]*<\/title>\s*/g,
  // Standard meta tags
  /<meta name="title"[^>]*>\s*/g,
  /<meta name="description"[^>]*>\s*/g,
  /<meta name="keywords"[^>]*>\s*/g,
  /<meta name="author"[^>]*>\s*/g,
  
  // Open Graph tags
  /<meta property="og:type"[^>]*>\s*/g,
  /<meta property="og:url"[^>]*>\s*/g,
  /<meta property="og:title"[^>]*>\s*/g,
  /<meta property="og:description"[^>]*>\s*/g,
  /<meta property="og:image"[^>]*>\s*/g,
  /<meta property="og:site_name"[^>]*>\s*/g,
  /<meta property="og:locale"[^>]*>\s*/g,
  /<meta property="article:[^"]*"[^>]*>\s*/g,
  
  // Twitter tags
  /<meta name="twitter:card"[^>]*>\s*/g,
  /<meta name="twitter:site"[^>]*>\s*/g,
  /<meta name="twitter:creator"[^>]*>\s*/g,
  /<meta name="twitter:url"[^>]*>\s*/g,
  /<meta name="twitter:title"[^>]*>\s*/g,
  /<meta name="twitter:description"[^>]*>\s*/g,
  /<meta name="twitter:image"[^>]*>\s*/g,
  
  // Canonical link
  /<link rel="canonical"[^>]*>\s*/g,
  
  // JSON-LD scripts (remove old blog-related ones)
  /<script type="application\/ld\+json">\s*{[^}]*"@type":\s*"Blog[^}]*}[^<]*<\/script>\s*/gi,
  /<script type="application\/ld\+json">\s*{[^}]*"@type":\s*"Article[^}]*}[^<]*<\/script>\s*/gi
]

/**
 * Update HTML file with blog-specific meta tags
 */
function updateHtml(htmlPath, metaTags) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8')
    
    // Remove existing meta tags that we'll replace
    metaTagPatterns.forEach(pattern => {
      html = html.replace(pattern, '')
    })
    
    // Insert new meta tags before </head>
    html = html.replace('</head>', `${metaTags}</head>`)
    
    // Write updated HTML back to file
    fs.writeFileSync(htmlPath, html)
    return true
  } catch (error) {
    console.error(`Error updating ${htmlPath}:`, error.message)
    return false
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔧 Injecting blog meta tags into built HTML files...\n')
  
  let blogPosts
  try {
    blogPosts = await fetchBlogPosts()
    console.log(`📚 Fetched ${blogPosts.length} blog posts from Strapi\n`)
  } catch (error) {
    console.warn(`⚠️  Failed to fetch blog posts from Strapi: ${error.message}`)
    console.warn('   Skipping blog meta injection. Build continues.')
    return
  }
  
  const distDir = path.join(__dirname, '..', 'dist', 'blogs')
  let updatedCount = 0
  let errorCount = 0
  
  // Update blog listing page (blogs.html)
  const blogsHtmlPath = path.join(__dirname, '..', 'dist', 'blogs.html')
  if (fs.existsSync(blogsHtmlPath)) {
    const listingMetaTags = generateBlogListingMetaTags(blogPosts)
    
    if (updateHtml(blogsHtmlPath, listingMetaTags)) {
      console.log(`✅ Updated blog listing: ${blogsHtmlPath}`)
      updatedCount++
    } else {
      console.error(`❌ Failed to update blog listing: ${blogsHtmlPath}`)
      errorCount++
    }
  } else {
    console.log(`⚠️  Blog listing not found: ${blogsHtmlPath}`)
  }
  
  // Update individual blog post pages
  for (const post of blogPosts) {
    // Primary path structure (flat HTML files in /blogs/ directory)
    const htmlPath = path.join(distDir, `${post.slug}.html`)
    
    // Alternate path structure (directory with index.html)
    const altHtmlPath = path.join(distDir, `${post.slug}`, 'index.html')
    
    let targetPath = null
    if (fs.existsSync(htmlPath)) {
      targetPath = htmlPath
    } else if (fs.existsSync(altHtmlPath)) {
      targetPath = altHtmlPath
    }
    
    if (targetPath) {
      const metaTags = generateMetaTags(post)
      
      if (updateHtml(targetPath, metaTags)) {
        console.log(`✅ Updated: ${post.slug}`)
        updatedCount++
      } else {
        console.error(`❌ Failed: ${post.slug}`)
        errorCount++
      }
    } else {
      console.log(`⚠️  HTML not found for: ${post.slug}`)
    }
  }
  
  console.log(`\n📊 Summary:`)
  console.log(`   ✅ Updated: ${updatedCount} files`)
  console.log(`   ❌ Errors: ${errorCount} files`)
  console.log(`   ⚠️  Missing: ${blogPosts.length - updatedCount + errorCount} files`)
  
  if (updatedCount === 0) {
    console.log('\n💡 Tip: Make sure to run this script AFTER vite-ssg build')
    console.log('   Run: npm run build (which includes this script automatically)')
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
