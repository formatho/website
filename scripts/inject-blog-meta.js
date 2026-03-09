#!/usr/bin/env node

/**
 * Post-build script to inject blog-specific meta tags into generated HTML files
 * 
 * This script runs after vite-ssg build to add proper SEO meta tags to blog pages.
 * It reads blog post data and updates the corresponding HTML files in dist/blogs/.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Blog post data (extracted from blogPosts.ts)
const blogPosts = [
  {
    id: 28,
    title: "India's #1 Privacy-First Developer Toolkit — The 2026 Blueprint for Data Sovereignty",
    excerpt: 'Discover how Formatho became India\'s leading privacy-first developer toolkit with 100+ tools that run entirely in your browser. Zero data uploads. 100% free. No sign-up ever.',
    date: '2026-03-09',
    tags: ['Privacy', 'Developer Tools', 'Data Security', 'Formatho'],
    slug: 'india-privacy-first-developer-toolkit-2026',
    image: '/images/blog/blog-01/developer-workspace.jpg'
  },
  {
    id: 29,
    title: 'Generate UUIDs Without Internet Connection: The 2026 Masterclass',
    excerpt: 'Learn why generating UUIDs offline is critical for security. Discover how client-side UUID generation protects your database primary keys from prediction attacks.',
    date: '2026-03-10',
    tags: ['UUID', 'Security', 'Offline Tools', 'Databases'],
    slug: 'generate-uuids-without-internet-connection-2026',
    image: '/images/blog/blog-10/unique-id.jpg'
  }
  // Add more blog posts as needed - this is a subset for demonstration
]

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com/tools'
const twitterHandle = '@heyformatho'

/**
 * Generate meta tags for a blog post
 */
function generateMetaTags(post) {
  const fullTitle = `${post.title} - ${siteName}`
  const url = `${baseUrl}/blogs/${post.slug}`
  const image = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/logo.png`
  
  return `
  <!-- Blog Post Meta Tags -->
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="title" content="${escapeHtml(fullTitle)}">
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <meta name="keywords" content="${escapeHtml(post.tags.join(', '))}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="article:published_time" content="${post.date}">
  <meta property="article:tag" content="${escapeHtml(post.tags.join(', '))}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${twitterHandle}">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${escapeHtml(url)}">
`
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Update HTML file with blog-specific meta tags
 */
function updateBlogHtml(htmlPath, post) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8')
    
    // Generate new meta tags
    const newMetaTags = generateMetaTags(post)
    
    // Find and replace the title tag
    const titleRegex = /<title>[^<]*<\/title>/
    if (titleRegex.test(html)) {
      html = html.replace(titleRegex, `<title>${escapeHtml(post.title)} - ${siteName}</title>`)
    }
    
    // Find the </head> tag and insert new meta tags before it
    // But first, remove existing meta tags that we'll replace
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
  console.log('🔧 Injecting blog meta tags into built HTML files...\n')
  
  const distDir = path.join(__dirname, '..', 'dist', 'blogs')
  let updatedCount = 0
  
  blogPosts.forEach(post => {
    const htmlPath = path.join(distDir, `${post.slug}.html`)
    
    if (fs.existsSync(htmlPath)) {
      if (updateBlogHtml(htmlPath, post)) {
        updatedCount++
      }
    } else {
      console.log(`⚠️  File not found: ${htmlPath}`)
    }
  })
  
  console.log(`\n✅ Updated ${updatedCount} blog HTML files`)
  
  if (updatedCount < blogPosts.length) {
    console.log(`⚠️  ${blogPosts.length - updatedCount} blog posts were not updated`)
    console.log('   Make sure to add all blog posts to the blogPosts array in this script')
  }
}

main()
