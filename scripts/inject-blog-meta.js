#!/usr/bin/env node

/**
 * Post-build script to inject blog-specific meta tags into generated HTML files
 * 
 * This script runs after vite-ssg build to add proper SEO meta tags to blog pages.
 * It imports blog post data directly from blogPosts.ts and updates the HTML files.
 * 
 * IMPORTANT: This script must be run AFTER vite-ssg build
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import blog posts from TypeScript (we'll parse the file since TS imports are complex in Node)
const blogPostsPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts')
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8')

// Parse blog posts from TypeScript file
// Extract the blogPosts array using regex (simple approach, works for this format)
function parseBlogPosts(content) {
  const posts = []
  
  // Match each blog post object
  const postRegex = /{\s*id:\s*(\d+),\s*title:\s*`([^`]+)`|'([^']+)'|"([^"]+)",\s*excerpt:\s*`([^`]+)`|'([^']+)'|"([^"]+)",\s*date:\s*'([^']+)',\s*readTime:\s*'([^']+)',\s*tags:\s*\[([^\]]+)\],\s*slug:\s*'([^']+)',\s*image:\s*(?:`([^`]+)`|'([^']+)'|"([^"]+)")/g
  
  // Simpler approach: extract slugs and map to known data
  const slugRegex = /slug:\s*'([^']+)'/g
  const titleRegex = /title:\s*`([^`]+)`/g
  const excerptRegex = /excerpt:\s*`([^`]+)`/g
  const dateRegex = /date:\s*'([^']+)'/g
  const tagsRegex = /tags:\s*\[([^\]]+)\]/g
  
  // Extract all slugs
  const slugs = []
  let match
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1])
  }
  
  // For each slug, extract corresponding data
  // Reset regex indexes
  slugRegex.lastIndex = 0
  
  // Use a different approach - split by post objects
  const postBlocks = content.split(/{\s*id:/).slice(1)
  
  for (const block of postBlocks) {
    try {
      const idMatch = block.match(/^(\d+)/)
      const titleMatch = block.match(/title:\s*`([^`]+)`/)
      const excerptMatch = block.match(/excerpt:\s*`([^`]+)`/)
      const dateMatch = block.match(/date:\s*'([^']+)'/)
      const slugMatch = block.match(/slug:\s*'([^']+)'/)
      const imageMatch = block.match(/image:\s*(?:`([^`]+)`|'([^']+)'|"([^"]+)")/)
      const tagsMatch = block.match(/tags:\s*\[([^\]]+)\]/)
      
      if (idMatch && titleMatch && slugMatch) {
        posts.push({
          id: parseInt(idMatch[1]),
          title: titleMatch[1],
          excerpt: excerptMatch ? excerptMatch[1] : '',
          date: dateMatch ? dateMatch[1] : '',
          slug: slugMatch[1],
          image: imageMatch ? (imageMatch[1] || imageMatch[2] || imageMatch[3] || '') : '',
          tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : []
        })
      }
    } catch (e) {
      // Skip malformed blocks
      continue
    }
  }
  
  return posts
}

const blogPosts = parseBlogPosts(blogPostsContent)

const siteName = 'Formatho'
const baseUrl = 'https://formatho.com/tools'
const twitterHandle = '@heyformatho'

/**
 * Generate meta tags for a blog post
 */
function generateMetaTags(post) {
  const fullTitle = `${post.title} - ${siteName}`
  const url = `${baseUrl}/blogs/${post.slug}`
  const image = post.image 
    ? (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`)
    : `${baseUrl}/logo.png`
  
  const keywords = post.tags.join(', ')
  
  // Generate JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
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
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url
  }
  
  return `
  <!-- Blog Post SEO Meta Tags (injected by inject-blog-meta.js) -->
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="title" content="${escapeHtml(fullTitle)}">
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <meta name="author" content="${siteName}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
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
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${escapeHtml(url)}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
`
}

/**
 * Generate meta tags for the blog listing page
 */
function generateBlogListingMetaTags() {
  const title = 'Blog - Formatho'
  const description = 'Developer guides, tutorials, and insights from the Formatho team. Learn about privacy-first development, AI agents, and more.'
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
  <meta name="title" content="${escapeHtml(title)}">
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
function updateHtml(htmlPath, metaTags, customTitle = null) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8')
    
    // Remove existing meta tags that we'll replace
    metaTagPatterns.forEach(pattern => {
      html = html.replace(pattern, '')
    })
    
    // Update title tag if provided
    if (customTitle) {
      const titleRegex = /<title>[^<]*<\/title>/
      if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `<title>${escapeHtml(customTitle)}</title>`)
      }
    }
    
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
function main() {
  console.log('🔧 Injecting blog meta tags into built HTML files...\n')
  console.log(`📚 Found ${blogPosts.length} blog posts to process\n`)
  
  const distDir = path.join(__dirname, '..', 'dist', 'blogs')
  let updatedCount = 0
  let errorCount = 0
  
  // Update blog listing page (index.html)
  const indexHtmlPath = path.join(distDir, 'index.html')
  if (fs.existsSync(indexHtmlPath)) {
    const listingTitle = 'Blog - Formatho'
    const listingMetaTags = generateBlogListingMetaTags()
    
    if (updateHtml(indexHtmlPath, listingMetaTags, listingTitle)) {
      console.log(`✅ Updated blog listing: ${indexHtmlPath}`)
      updatedCount++
    } else {
      console.error(`❌ Failed to update blog listing: ${indexHtmlPath}`)
      errorCount++
    }
  } else {
    console.log(`⚠️  Blog listing not found: ${indexHtmlPath}`)
  }
  
  // Update individual blog post pages
  blogPosts.forEach(post => {
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
      const fullTitle = `${post.title} - ${siteName}`
      const metaTags = generateMetaTags(post)
      
      if (updateHtml(targetPath, metaTags, fullTitle)) {
        console.log(`✅ Updated: ${post.slug}`)
        updatedCount++
      } else {
        console.error(`❌ Failed: ${post.slug}`)
        errorCount++
      }
    } else {
      console.log(`⚠️  HTML not found for: ${post.slug}`)
      console.log(`   Expected: ${htmlPath} or ${altHtmlPath}`)
    }
  })
  
  console.log(`\n📊 Summary:`)
  console.log(`   ✅ Updated: ${updatedCount} files`)
  console.log(`   ❌ Errors: ${errorCount} files`)
  console.log(`   ⚠️  Missing: ${blogPosts.length - updatedCount + errorCount} files`)
  
  if (updatedCount === 0) {
    console.log('\n💡 Tip: Make sure to run this script AFTER vite-ssg build')
    console.log('   Run: npm run build (which includes this script automatically)')
  }
}

main()
