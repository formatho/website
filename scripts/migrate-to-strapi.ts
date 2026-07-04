/**
 * Migrate blog posts from blogPosts.ts to Strapi CMS
 * Uses admin API (content manager) instead of public API token
 * Usage: npx tsx scripts/migrate-to-strapi.ts
 */
import { blogPosts } from '../src/data/blogPosts'

const STRAPI_URL = 'https://cms.formatho.com'
const ADMIN_EMAIL = 'admin@formatho.com'
const ADMIN_PASSWORD = 'F0rmatho!2026'

async function getAdminToken() {
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  const data: any = await res.json()
  return data.data.token
}

async function main() {
  console.log('Logging in to Strapi admin...')
  const adminToken = await getAdminToken()
  console.log('Logged in. Starting migration...\n')

  console.log(`Found ${blogPosts.length} blog posts to migrate\n`)

  let success = 0
  let failed = 0

  for (const post of blogPosts) {
    // Use the content API with admin token
    const payload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.readTime || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : String(post.tags || ''),
      image: post.image || '',
      imageAlt: post.imageAlt || '',
      metaDescription: post.excerpt,
      ctaTitle: post.cta?.title || '',
      ctaDescription: post.cta?.description || '',
      ctaLink: post.cta?.link || '',
      ctaButtonText: post.cta?.buttonText || '',
      featured: false,
    }

    try {
      // Strapi v5 Content API with admin JWT
      const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::blog-post.blog-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      })

      const result: any = await res.json()

      if (res.ok) {
        success++
        if (success % 10 === 0) console.log(`✅ [${success}/${blogPosts.length}] ${post.slug}`)
      } else {
        failed++
        const msg = result?.error?.message || result?.message || JSON.stringify(result)
        console.error(`❌ ${post.slug}: ${msg}`)
      }
    } catch (err: any) {
      failed++
      console.error(`❌ ${post.slug}: ${err.message}`)
    }

    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\nMigration complete: ${success} success, ${failed} failed`)

  // Now publish all draft posts
  console.log('\nPublishing all posts...')
  const listRes = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::blog-post.blog-post?status=draft&limit=100`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  })
  const listData: any = await listRes.json()
  
  let published = 0
  for (const item of listData.results || []) {
    try {
      await fetch(`${STRAPI_URL}/content-manager/collection-types/api::blog-post.blog-post/${item.documentId}/actions/publish`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      published++
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 100))
  }
  console.log(`Published ${published} posts`)
}

main().catch(console.error)
