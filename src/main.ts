import './polyfill'

import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import { routes } from './router'

const baseUrl = 'https://formatho.com/tools'
const siteName = 'Formatho'
const defaultImage = `${baseUrl}/logo.png`
const twitterHandle = '@heyformatho'

// Types for route meta
interface RouteMeta {
  title?: string
  description?: string
  keywords?: string
  image?: string
}

function updateOrCreateMeta(
  selector: string,
  attribute: string,
  value: string,
  tagName: 'meta' | 'link' = 'meta'
) {
  if (typeof document === 'undefined') return

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

/**
 * Update meta tags for a route - works both during SSG build and client-side
 */
function updateMetaForRoute(path: string, meta: RouteMeta) {
  const title = meta.title
  const description = meta.description
  const keywords = meta.keywords
  const image = meta.image || defaultImage

  // Build the full title
  const fullTitle =
    title && !title.includes(siteName)
      ? `${title} - ${siteName}`
      : title || `${siteName} - Privacy-First Developer Tools`

  // Clean path for URLs
  let cleanPath = path
  if (cleanPath.endsWith('/') && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1)
  }
  const finalUrl = `${baseUrl}${cleanPath}`

  // 1. Update Title
  if (typeof document !== 'undefined') {
    document.title = fullTitle
  }

  // 2. Update Primary Meta Tags
  updateOrCreateMeta('meta[name="title"]', 'content', fullTitle)
  if (description) {
    updateOrCreateMeta('meta[name="description"]', 'content', description)
  }
  if (keywords) {
    updateOrCreateMeta('meta[name="keywords"]', 'content', keywords)
  }

  // 3. Update Canonical URL
  updateOrCreateMeta('link[rel="canonical"]', 'href', finalUrl, 'link')

  // 4. Update Open Graph Tags
  updateOrCreateMeta('meta[property="og:type"]', 'content', 'website')
  updateOrCreateMeta('meta[property="og:url"]', 'content', finalUrl)
  updateOrCreateMeta('meta[property="og:title"]', 'content', fullTitle)
  if (description) {
    updateOrCreateMeta('meta[property="og:description"]', 'content', description)
  }
  updateOrCreateMeta('meta[property="og:image"]', 'content', image)
  updateOrCreateMeta('meta[property="og:site_name"]', 'content', siteName)

  // 5. Update Twitter Card Tags
  updateOrCreateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
  updateOrCreateMeta('meta[name="twitter:site"]', 'content', twitterHandle)
  updateOrCreateMeta('meta[name="twitter:url"]', 'content', finalUrl)
  updateOrCreateMeta('meta[name="twitter:title"]', 'content', fullTitle)
  if (description) {
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', description)
  }
  updateOrCreateMeta('meta[name="twitter:image"]', 'content', image)
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: '/tools/'
  },
  ({ router, isClient }) => {
    // SSR: Set meta tags before rendering during build
    if (!isClient) {
      router.beforeEach((to, _from, next) => {
        const meta = to.meta as RouteMeta
        if (meta && (meta.title || meta.description)) {
          updateMetaForRoute(to.path, meta)
        }
        next()
      })
    }

    // Client-side: Update meta tags on navigation
    router.afterEach((to) => {
      const meta = to.meta as RouteMeta
      if (meta && (meta.title || meta.description)) {
        updateMetaForRoute(to.path, meta)
      }
    })

    // AOS initialization moved to App.vue onMounted hook
    // This ensures Vue virtual DOM has painted data-aos elements before AOS.init()
    // SPA refresh is handled in App.vue via router.afterEach()

    // Core Web Vitals - Performance Monitoring (client-side only)
    if (isClient) {
      // Register service worker for caching and offline support
      import('./utils/serviceWorker').then(({ registerServiceWorker }) => {
        registerServiceWorker()
      })

      // Monitor Core Web Vitals in development
      if (import.meta.env.DEV) {
        import('./composables/useCoreWebVitals').then(({ useCoreWebVitals }) => {
          const { logMetrics } = useCoreWebVitals()
          // Log metrics after page load
          window.addEventListener('load', () => {
            setTimeout(logMetrics, 1000)
          })
        })

        // Monitor performance budget
        import('./utils/performanceBudget').then(({ logPerformanceBudget, monitorLongTasks }) => {
          window.addEventListener('load', () => {
            setTimeout(() => {
              logPerformanceBudget()
              monitorLongTasks()
            }, 2000)
          })
        })
      }
    }
  }
)
