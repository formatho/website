import { watch } from 'vue'
import { useRoute } from 'vue-router'

// Domain must match the actual deployment location
const domain = 'https://formatho.com/tools'
const siteName = 'Formatho'
const defaultImage = `${domain}/logo.png`
const twitterHandle = '@heyformatho'

// Check if running in browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

interface MetaTags {
  title: string
  description: string
  keywords?: string
  image?: string
  path?: string
}

function updateMetaTag(
  selector: string,
  attribute: string,
  value: string,
  tagName: 'meta' | 'link' = 'meta'
) {
  if (!isBrowser) return

  let element = document.querySelector(selector) as HTMLElement
  if (!element) {
    element = document.createElement(tagName)
    if (tagName === 'meta') {
      const nameMatch = selector.match(/name="([^"]+)"/)
      const propertyMatch = selector.match(/property="([^"]+)"/)
      if (nameMatch && nameMatch[1]) {
        element.setAttribute('name', nameMatch[1])
      }
      if (propertyMatch && propertyMatch[1]) {
        element.setAttribute('property', propertyMatch[1])
      }
    } else if (tagName === 'link') {
      const relMatch = selector.match(/rel="([^"]+)"/)
      if (relMatch && relMatch[1]) {
        element.setAttribute('rel', relMatch[1])
      }
    }
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

function updateMetaTags(meta: MetaTags) {
  if (!isBrowser) return

  const url = `${domain}${meta.path || '/'}`
  const fullTitle = meta.title.includes(siteName) ? meta.title : `${meta.title} - ${siteName}`

  // Update title
  document.title = fullTitle

  // Primary meta tags
  updateMetaTag('meta[name="title"]', 'content', fullTitle)
  updateMetaTag('meta[name="description"]', 'content', meta.description)
  if (meta.keywords) {
    updateMetaTag('meta[name="keywords"]', 'content', meta.keywords)
  }

  // Canonical URL
  updateMetaTag('link[rel="canonical"]', 'href', url, 'link')

  // Open Graph tags
  updateMetaTag('meta[property="og:title"]', 'content', fullTitle)
  updateMetaTag('meta[property="og:description"]', 'content', meta.description)
  updateMetaTag('meta[property="og:url"]', 'content', url)
  updateMetaTag('meta[property="og:image"]', 'content', meta.image || defaultImage)

  // Twitter Card tags
  updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image')
  updateMetaTag('meta[name="twitter:site"]', 'content', twitterHandle)
  updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle)
  updateMetaTag('meta[name="twitter:description"]', 'content', meta.description)
  updateMetaTag('meta[name="twitter:url"]', 'content', url)
  updateMetaTag('meta[name="twitter:image"]', 'content', meta.image || defaultImage)

  // Open Graph additional tags
  updateMetaTag('meta[property="og:type"]', 'content', 'website')
  updateMetaTag('meta[property="og:site_name"]', 'content', siteName)
}

export function useMeta() {
  // Skip during SSR
  if (!isBrowser) return

  const route = useRoute()

  watch(
    () => route.path,
    () => {
      const meta = route.meta as unknown as MetaTags | undefined
      if (meta && meta.title && meta.description) {
        updateMetaTags({
          ...meta,
          path: route.path
        })
      } else {
        // Fallback to default if route meta is missing
        console.warn(`Route ${route.path} is missing title or description in meta`)
      }
    },
    { immediate: true }
  )
}
