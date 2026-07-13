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

// Detect environment based on hostname
function isProductionEnvironment(): boolean {
  if (typeof window === 'undefined') return true // SSR default to production
  const hostname = window.location.hostname
  // Production domains
  const productionDomains = ['formatho.com', 'www.formatho.com']
  return productionDomains.includes(hostname)
}

// Create a map for O(1) tool lookups instead of O(n) scanning
const toolMap = new Map<string, { tool: any; category: any }>()
for (const category of tools) {
  for (const tool of category.items) {
    toolMap.set(tool.route, { tool, category })
  }
}

export function useSEO(config?: SEOConfig) {
  const route = useRoute()
  const isBrowser = typeof document !== 'undefined'

  function updateMeta(name: string, content: string) {
    if (!isBrowser) return
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function setRobotsMeta() {
    if (!isBrowser) return
    const isProduction = isProductionEnvironment()
    // Production: index, follow | QA/Staging: noindex, nofollow
    const robotsContent = isProduction ? 'index, follow' : 'noindex, nofollow'
    updateMeta('robots', robotsContent)
  }

  function updateProperty(prop: string, content: string) {
    if (!isBrowser) return
    let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', prop)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function setCanonical(url: string) {
    if (!isBrowser) return
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      document.head.appendChild(el)
    }
    el.setAttribute('href', url)
  }

  function setJsonLd(data: Record<string, unknown>) {
    if (!isBrowser) return
    let el = document.getElementById('json-ld-page') as HTMLScriptElement | null
    if (el) el.remove()
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'json-ld-page'
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
  }

  function setBreadcrumbSchema(data: Record<string, unknown>) {
    if (!isBrowser) return
    let el = document.getElementById('json-ld-breadcrumb') as HTMLScriptElement | null
    if (el) el.remove()
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'json-ld-breadcrumb'
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
  }

  function getToolByRoute(path: string) {
    // O(1) lookup instead of O(n) scanning
    return toolMap.get(path) || null
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
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150'
      },
      creator: {
        '@type': 'Organization',
        name: 'Formatho',
        url: BASE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'Formatho',
        url: BASE_URL
      }
    }
  }

  function generateBreadcrumbSchema(path: string, toolName?: string, categoryName?: string) {
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL
      }
    ]

    if (toolName && categoryName) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${BASE_URL}/category/${categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      })
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: `${BASE_URL}${path}`
      })
    } else if (path.startsWith('/category/')) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: categoryName || 'Category',
        item: `${BASE_URL}${path}`
      })
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    }
  }

  function applySEO() {
    if (!isBrowser) return
    const path = route.path
    const toolInfo = getToolByRoute(path)

    // Set robots meta based on environment (production vs QA)
    setRobotsMeta()

    // Set self-referencing canonical URL for all pages
    const canonicalUrl = config?.canonicalUrl || `${BASE_URL}${path}`
    setCanonical(canonicalUrl)

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
        'client-side'
      ]

      document.title = title
      updateMeta('description', description)
      updateMeta('keywords', keywords.join(', '))
      updateProperty('og:title', title)
      updateProperty('og:description', description)
      updateProperty('og:url', canonicalUrl)
      updateProperty('og:type', 'website')
      updateProperty('og:image', DEFAULT_OG_IMAGE)
      updateProperty('og:site_name', 'Formatho')
      updateMeta('twitter:title', title)
      updateMeta('twitter:description', description)

      // Add structured data for tool
      setJsonLd(generateToolJsonLd(tool, category))

      // Add breadcrumb schema for tool
      setBreadcrumbSchema(generateBreadcrumbSchema(path, tool.name, category.category))
    } else if (config) {
      // Custom page SEO
      if (config.title) document.title = config.title
      if (config.description) updateMeta('description', config.description)
      if (config.keywords) updateMeta('keywords', config.keywords.join(', '))
      if (config.ogType) updateProperty('og:type', config.ogType)
      if (config.ogImage) updateProperty('og:image', config.ogImage)
      if (config.jsonLd) setJsonLd(config.jsonLd)

      // Add breadcrumb schema for category pages
      if (path.startsWith('/category/')) {
        const categoryName = config.title?.replace(' \\| Formatho', '').replace(' \\| Formatho', '') || 'Category'
        setBreadcrumbSchema(generateBreadcrumbSchema(path, undefined, categoryName))
      }
    }

    // Update OG URL for all pages
    updateProperty('og:url', canonicalUrl)
  }

  // Apply on route change
  watch(() => route.path, applySEO, { immediate: true })

  return { applySEO }
}
