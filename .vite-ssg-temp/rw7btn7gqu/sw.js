/**
 * Service Worker for Formatho
 * Implements caching strategies for optimal performance
 */

/// <reference lib="webworker" />

const CACHE_NAME = 'formatho-v1'
const STATIC_CACHE = 'formatho-static-v1'
const DYNAMIC_CACHE = 'formatho-dynamic-v1'

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.png'
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, fallback to network
  cacheFirst: [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:woff|woff2|ttf|otf)$/,
    /\.(?:js|css)$/
  ],
  // Network first, fallback to cache
  networkFirst: [
    /\.(?:html)$/,
    /\.(?:json)$/
  ],
  // Stale while revalidate
  staleWhileRevalidate: [
    /\.(?:js|css)$/
  ]
}

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE
            )
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Determine caching strategy
  const strategy = getCacheStrategy(url.pathname)

  switch (strategy) {
    case 'cacheFirst':
      event.respondWith(cacheFirst(request))
      break
    case 'networkFirst':
      event.respondWith(networkFirst(request))
      break
    case 'staleWhileRevalidate':
      event.respondWith(staleWhileRevalidate(request))
      break
    default:
      event.respondWith(networkFirst(request))
  }
})

// Get appropriate cache strategy for resource
function getCacheStrategy(pathname: string): string {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    for (const pattern of patterns) {
      if (pattern.test(pathname)) {
        return strategy
      }
    }
  }
  return 'networkFirst'
}

// Cache first strategy
async function cacheFirst(request: Request): Promise<Response> {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW] Cache first failed:', error)
    return new Response('Network error', { status: 408 })
  }
}

// Network first strategy
async function networkFirst(request: Request): Promise<Response> {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error)
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    return new Response('Network error', { status: 408 })
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request: Request): Promise<Response> {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  })

  return cachedResponse || fetchPromise
}

// Background sync for offline actions
self.addEventListener('sync', (event: SyncEvent) => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  // Implement offline data sync logic here
  console.log('[SW] Syncing offline data...')
}

// Push notifications
self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() || {}
  
  const options = {
    body: data.body || 'New notification',
    icon: '/favicon.png',
    badge: '/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    (self as any).registration.showNotification(data.title || 'Formatho', options)
  )
})

// Type declarations
declare const self: ServiceWorkerGlobalScope

interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void
}

interface FetchEvent extends Event {
  request: Request
  respondWith(response: Promise<Response> | Response): void
}

interface SyncEvent extends Event {
  tag: string
  waitUntil(promise: Promise<any>): void
}

interface PushEvent extends Event {
  data?: {
    json(): any
  }
  waitUntil(promise: Promise<any>): void
}
