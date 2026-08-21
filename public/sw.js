/**
 * Service Worker for Formatho
 * - Navigations (HTML): network-first. HTML is never served stale -
 *   hashed asset filenames mean a stale shell references missing JS.
 * - Static assets (/assets/*): cache-first, content-hashed + immutable.
 * - Everything else same-origin GET: stale-while-revalidate.
 */

const CACHE_NAME = 'formatho-v3-2026-08-21'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.png',
  '/logo.png'
]

// Install - cache core assets only
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

// Activate - clear ALL old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  )
})

// Fetch - strategy by request type
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Skip cross-origin
  if (url.origin !== location.origin) return

  // Content-hashed build assets: cache-first (immutable)
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request)
        if (cached) return cached
        const response = await fetch(request)
        if (response && response.status === 200) {
          cache.put(request, response.clone())
        }
        return response
      })
    )
    return
  }

  // Navigations and everything else: network-first with cache fallback.
  // Serving stale HTML breaks deploys (stale shell references removed
  // hashed assets) and can pin users to pages that no longer exist.
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)
      try {
        const response = await fetch(request)
        if (response && response.status === 200) {
          cache.put(request, response.clone())
        }
        return response
      } catch {
        // Network failed - fall back to cache if available
        return cached || Response.error()
      }
    })
  )
})
