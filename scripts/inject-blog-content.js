#!/usr/bin/env node
/* eslint-env node */
/**
 * Inline the full article body into each prerendered blog page.
 *
 * vite-ssg renders BlogPostView in its "Loading…" state (content is fetched
 * from Strapi client-side), so the static HTML crawlers see first was an
 * empty shell. This script fetches every post — including its HTML content —
 * and swaps the loading placeholder for the complete article: header, date,
 * read time, byline, tags, featured image, body, and an author box.
 *
 * Posts listed in parked-posts.json get noindex instead (thin content that
 * must not compete for index budget until deepened).
 *
 * Runs after inject-blog-meta.js. Idempotent.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { part1 } from './blog-upgrade/part1.mjs'
import { part2 } from './blog-upgrade/part2.mjs'
import { part3 } from './blog-upgrade/part3.mjs'
import { localPosts } from './blog-upgrade/local-posts.mjs'

// Deepened content for posts that are thin in the CMS (read-only token).
// Same overrides src/data/strapi.ts applies to the client-side fetch.
const overrides = { ...part1, ...part2, ...part3 }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const blogsDir = path.join(distDir, 'blogs')
const STRAPI_URL = process.env.VITE_STRAPI_URL || 'https://cms.formatho.com'
const MARKER = 'data-blog-prerender'

const { parked } = JSON.parse(fs.readFileSync(path.join(__dirname, 'parked-posts.json'), 'utf8'))
const parkedSet = new Set(parked)

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

const CACHE_PATH = path.join(__dirname, 'blog-content-cache.json')

async function fetchPosts() {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?fields[0]=title&fields[1]=slug&fields[2]=content&fields[3]=date&fields[4]=readTime&fields[5]=tags&fields[6]=image&fields[7]=imageAlt&pagination[pageSize]=200&sort=date:desc`,
    { signal: AbortSignal.timeout(60000) }
  )
  if (!res.ok) throw new Error(`Strapi returned ${res.status}`)
  const data = await res.json()
  return Array.isArray(data) ? data : data.data || []
}

// cms.formatho.com sits behind Cloudflare, which 403s CI runner IPs
// intermittently — same cache pattern as blog-meta-cache.json: refresh the
// committed cache whenever a build can reach Strapi, fall back to it when
// this build cannot.
async function fetchPostsWithCache() {
  try {
    const posts = await fetchPosts()
    fs.writeFileSync(CACHE_PATH, JSON.stringify(posts))
    console.log(`inject-blog-content: fetched ${posts.length} posts from Strapi (cache refreshed)`)
    return posts
  } catch (e) {
    if (fs.existsSync(CACHE_PATH)) {
      const posts = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
      console.warn(`⚠️  inject-blog-content: Strapi unreachable (${e.message}) — using content cache (${posts.length} posts)`)
      return posts
    }
    throw e
  }
}

function articleHtml(post) {
  // Strapi sends tags as a comma string; localPosts ship arrays
  const tags = (Array.isArray(post.tags) ? post.tags : String(post.tags || '').split(',')).map((t) => t.trim()).filter(Boolean)
  const tagHtml = tags
    .map((t) => `<span class="text-xs tracking-widest uppercase text-muted-foreground">${esc(t)}</span>`)
    .join('')
  const date = (post.date || '').slice(0, 10)
  const imageHtml = post.image
    ? `<div class="border-b border-foreground/10"><div class="container mx-auto px-4 md:px-8 py-8 md:py-12"><img src="${esc(post.image)}" alt="${esc(post.imageAlt || post.title)}" width="1200" height="675" class="w-full max-h-[60vh] object-cover grayscale" loading="lazy"></div></div>`
    : ''
  return `<div data-blog-prerender="${esc(post.slug)}">
      <header class="min-h-[50vh] flex flex-col justify-end border-b border-foreground/10">
        <div class="container mx-auto px-4 md:px-8 pb-12 md:pb-20">
          <div class="flex items-center flex-wrap gap-6 mb-8">
            <p class="text-xs tracking-widest text-muted-foreground uppercase">${esc(date)}</p>
            <p class="text-xs tracking-widest text-muted-foreground uppercase">${esc(post.readTime || '')}</p>
            <p class="text-xs tracking-widest text-muted-foreground uppercase">By Formatho Editorial</p>
          </div>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none max-w-5xl">${esc(post.title)}</h1>
          <div class="flex flex-wrap gap-4 mt-8">${tagHtml}</div>
        </div>
      </header>
      ${imageHtml}
      <div class="container mx-auto px-4 md:px-8 py-12 md:py-24">
        <article class="max-w-4xl mx-auto">
          <div class="prose-editorial" data-blog-prerender-body>${post.content || ''}</div>
        </article>
        <div class="max-w-4xl mx-auto mt-12 pt-8 border-t border-foreground/10">
          <p class="text-sm text-muted-foreground leading-relaxed">
            <strong class="text-foreground">Formatho Editorial</strong> — written and maintained by the
            team behind <a href="https://formatho.com">formatho.com</a>, a library of free,
            privacy-first developer tools that run entirely in your browser. Every guide is tested
            against the tools it describes. Corrections and suggestions:
            <a href="https://github.com/formatho">github.com/formatho</a>.
          </p>
        </div>
      </div>
    </div>`
}

// The SSG "Loading…" placeholder BlogPostView renders before hydration
const LOADING_RE = /<div class="flex items-center justify-center min-h-\[60vh\]"[^>]*><div class="text-center"[^>]*><div class="animate-pulse[^"]*"[^>]*>Loading\.\.\.<\/div><\/div><\/div>/

async function main() {
  if (!fs.existsSync(blogsDir)) {
    console.log('inject-blog-content: no dist/blogs — skipping')
    return
  }

  let posts
  try {
    posts = await fetchPostsWithCache()
  } catch (e) {
    console.warn(`⚠️  inject-blog-content: Strapi unreachable and no content cache (${e.message}) — blog shells left as-is`)
    return
  }

  const bySlug = new Map(posts.map((p) => [p.slug, p]))
  for (const p of localPosts) if (!bySlug.has(p.slug)) bySlug.set(p.slug, p)
  let injected = 0
  let parkedCount = 0
  let missing = 0

  for (const file of fs.readdirSync(blogsDir)) {
    if (!file.endsWith('.html')) continue
    const slug = file.replace('.html', '')
    const fp = path.join(blogsDir, file)
    let html = fs.readFileSync(fp, 'utf8')

    if (html.includes(MARKER)) { injected++; continue }

    if (parkedSet.has(slug)) {
      html = html
        .replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, follow"')
        .replace(/<meta name="googlebot" content="[^"]*"/, '<meta name="googlebot" content="noindex, follow"')
      fs.writeFileSync(fp, html)
      parkedCount++
      continue
    }

    const post = bySlug.get(slug)
    if (!post) { missing++; continue }
    if (overrides[slug]) post.content = overrides[slug]
    if (!post.content) { missing++; continue }
    if (!LOADING_RE.test(html)) { missing++; continue }

    html = html.replace(LOADING_RE, articleHtml(post))
    fs.writeFileSync(fp, html)
    injected++
  }

  console.log(`inject-blog-content: ${injected} inlined (${Object.keys(overrides).length} with deepened overrides), ${parkedCount} parked (noindex), ${missing} skipped`)
}

main()
