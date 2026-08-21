/**
 * Service Worker Registration
 * Enables caching and offline support for better performance
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')

      console.log('✅ Service Worker registered:', registration.scope)

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (!newWorker) return

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🆕 New version available! Refresh to update.')
          }
        })
      })
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  })

  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 Service Worker updated, reloading page...')
    window.location.reload()
  })

  // Check for service worker updates when a tab regains focus, so
  // returning visitors pick up a new deployment immediately instead of
  // waiting for the browser's periodic (up to 24h) update check
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker.getRegistration()?.then((reg) => reg?.update())
    }
  })
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.unregister()
    console.log('✅ Service Worker unregistered')
  } catch (error) {
    console.error('❌ Service Worker unregistration failed:', error)
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return
  }

  try {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    )
    console.log('✅ All caches cleared')
  } catch (error) {
    console.error('❌ Cache clearing failed:', error)
  }
}

/**
 * Get cache size
 */
export async function getCacheSize(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return 0
  }

  try {
    const cacheNames = await caches.keys()
    let totalSize = 0

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName)
      const keys = await cache.keys()
      
      for (const request of keys) {
        const response = await cache.match(request)
        if (response) {
          const blob = await response.blob()
          totalSize += blob.size
        }
      }
    }

    return totalSize
  } catch (error) {
    console.error('❌ Failed to calculate cache size:', error)
    return 0
  }
}
