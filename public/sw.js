/**
 * Service Worker for Formatho
 * Simplified caching - stale-while-revalidate for all GET requests
 */

const CACHE_NAME = 'formatho-v2-2026-06-14'
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

// Fetch - stale-while-revalidate for everything
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Skip cross-origin
  if (url.origin !== location.origin) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)

      const fetchPromise = fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            cache.put(request, response.clone())
          }
          return response
        })
        .catch(() => {
          // Network failed - return cache if available
          return cached
        })

      // Return cached immediately if available, otherwise wait for network
      return cached || fetchPromise
    })
  )
})
