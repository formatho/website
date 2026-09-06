/**
 * generate-markdown.js — post-build step: creates .md versions of prerendered
 * HTML pages for markdown content negotiation (Accept: text/markdown).
 *
 * Agents get clean, formatting-stripped text instead of scraping dense HTML.
 * Browsers still get HTML (default). Served by nginx content negotiation.
 *
 * Strategy: extract semantic content from each prerendered page — headings,
 * lists, links, code blocks, paragraphs — and emit clean markdown.
 * Tool pages get their About/How-to/FAQ sections; the homepage and /runtime
 * get their full marketing copy.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

const DIST = join(new URL('.', import.meta.url).pathname, '../dist')

// pages to convert (flat + tools + categories)
const pages = [
  ...readdirSync(DIST).filter(f => f.endsWith('.html') && !f.startsWith('og-')).map(f => ({ file: f, url: f === 'index.html' ? '/' : '/' + f.replace('.html', '') })),
  ...existsSync(join(DIST, 'tools')) ?
    readdirSync(join(DIST, 'tools')).filter(f => f.endsWith('.html')).map(f => ({
      file: join('tools', f),
      url: '/tools/' + f.replace('.html', '')
    })) : [],
  ...existsSync(join(DIST, 'category')) ?
    readdirSync(join(DIST, 'category')).filter(f => f.endsWith('.html')).map(f => ({
      file: join('category', f),
      url: '/category/' + f.replace('.html', '')
    })) : [],
  ...existsSync(join(DIST, 'runtime')) ? [{ file: 'runtime/index.html', url: '/runtime' }] : [],
]

function htmlToMarkdown(html) {
  // extract main content area (skip nav, footer, scripts)
  const bodyMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (!bodyMatch) return ''
  let content = bodyMatch[1]

  // remove scripts, styles, svg, noscript
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '')
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '')
  content = content.replace(/<svg[\s\S]*?<\/svg>/gi, '')
  content = content.replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  content = content.replace(/<!--[\s\S]*?-->/g, '')

  // headings
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${clean(t)}\n`)
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${clean(t)}\n`)
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${clean(t)}\n`)
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n#### ${clean(t)}\n`)

  // code blocks
  content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, t) => `\n\`\`\`\n${clean(t).trim()}\n\`\`\`\n`)
  content = content.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')

  // links (preserve href)
  content = content.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const t = clean(text).trim()
    if (!t) return ''
    const full = href.startsWith('http') ? href : `https://formatho.com${href}`
    return `[${t}](${full})`
  })

  // lists
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${clean(t).trim()}\n`)
  content = content.replace(/<\/?[uo]l[^>]*>/gi, '\n')

  // table rows → pipe format
  content = content.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_, t) => {
    const cells = [...t.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m => clean(m[1]).trim())
    return cells.length ? `| ${cells.join(' | ')} |\n` : ''
  })
  content = content.replace(/<\/?table[^>]*>/gi, '\n')
  content = content.replace(/<\/?thead[^>]*>/gi, '')

  // paragraphs and breaks
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n${clean(t).trim()}\n`)
  content = content.replace(/<br\s*\/?>/gi, '\n')
  content = content.replace(/<hr\s*\/?>/gi, '\n---\n')

  // strong/em
  content = content.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
  content = content.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')

  // strip remaining tags
  content = content.replace(/<\/?div[^>]*>/gi, '\n')
  content = content.replace(/<\/?span[^>]*>/gi, '')
  content = content.replace(/<\/?section[^>]*>/gi, '\n')
  content = content.replace(/<\/?[a-z][^>]*>/gi, '')

  // clean up whitespace
  content = content
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .split('\n').map(l => l.trim()).join('\n')
    .replace(/\n{3,}/g, '\n\n')

  return content.trim()
}

function clean(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

let count = 0
for (const page of pages) {
  const htmlPath = join(DIST, page.file)
  if (!existsSync(htmlPath)) continue

  const html = readFileSync(htmlPath, 'utf8')
  const title = (html.match(/<title>([^<]*)/) || [])[1] || page.url
  const md = `# ${title.replace(' | Formatho', '')}\n\n> ${page.url.startsWith('/tools/') ? 'Formatho tool' : 'Formatho'} — https://formatho.com${page.url}\n\n${htmlToMarkdown(html)}\n`

  const mdPath = htmlPath.replace('.html', '.md')
  writeFileSync(mdPath, md)
  count++
}

console.log(`Generated ${count} markdown files for content negotiation`)
