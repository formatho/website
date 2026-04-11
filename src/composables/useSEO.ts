import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { tools } from '@/data/tools'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
  jsonLd?: Record<string, unknown>
}

const BASE_URL = 'https://formatho.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`

export function useSEO(config?: SEOConfig) {
  const route = useRoute()

  function updateMeta(name: string, content: string) {
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function updateProperty(prop: string, content: string) {
    let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', prop)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function setCanonical(url: string) {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      document.head.appendChild(el)
    }
    el.setAttribute('href', url)
  }

  function setJsonLd(data: Record<string, unknown>) {
    let el = document.getElementById('json-ld-page') as HTMLScriptElement | null
    if (el) el.remove()
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'json-ld-page'
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
  }

  function getToolByRoute(path: string) {
    for (const category of tools) {
      for (const tool of category.items) {
        if (tool.route === path) return { tool, category }
      }
    }
    return null
  }

  function generateToolJsonLd(tool: any, category: any) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}${tool.route}`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
      },
      creator: {
        '@type': 'Organization',
        name: 'Formatho',
        url: BASE_URL,
      },
    }
  }

  function applySEO() {
    const path = route.path
    const toolInfo = getToolByRoute(path)

    if (toolInfo) {
      // Tool page SEO
      const { tool, category } = toolInfo
      const title = `${tool.name} - Free Online Tool | Formatho`
      const description = `${tool.description}. Free, privacy-first ${tool.name} tool. No data leaves your browser. 100% client-side processing.`
      const keywords = [
        tool.name,
        category.category,
        'developer tool',
        'online tool',
        'free tool',
        'privacy',
        'client-side',
      ]
      const canonical = `${BASE_URL}${path}`

      document.title = title
      updateMeta('description', description)
      updateMeta('keywords', keywords.join(', '))
      setCanonical(canonical)
      updateProperty('og:title', title)
      updateProperty('og:description', description)
      updateProperty('og:url', canonical)
      updateProperty('og:type', 'website')
      updateProperty('og:image', DEFAULT_OG_IMAGE)
      updateProperty('og:site_name', 'Formatho')
      updateMeta('twitter:title', title)
      updateMeta('twitter:description', description)

      // Add structured data for tool
      setJsonLd(generateToolJsonLd(tool, category))
    } else if (config) {
      // Custom page SEO
      if (config.title) document.title = config.title
      if (config.description) updateMeta('description', config.description)
      if (config.keywords) updateMeta('keywords', config.keywords.join(', '))
      if (config.canonicalUrl) setCanonical(config.canonicalUrl)
      if (config.ogType) updateProperty('og:type', config.ogType)
      if (config.ogImage) updateProperty('og:image', config.ogImage)
      if (config.jsonLd) setJsonLd(config.jsonLd)
    }

    // Update OG URL for all pages
    updateProperty('og:url', `${BASE_URL}${path}`)
  }

  // Apply on route change
  watch(() => route.path, applySEO, { immediate: true })

  return { applySEO }
}
