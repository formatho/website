<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from './composables/useMeta'
import { useStructuredData } from './composables/useStructuredData'

const router = useRouter()

// Initialize dynamic meta tags
useMeta()

// Initialize structured data (JSON-LD)
useStructuredData()

// CRITICAL FIX: Initialize AOS in App.vue onMounted hook
// This ensures Vue virtual DOM has painted data-aos elements before AOS.init()
onMounted(() => {
  // Wait for next tick to ensure DOM is fully painted
  setTimeout(() => {
    if (typeof (window as any).AOS !== 'undefined') {
      const AOS = (window as any).AOS

      // Initialize AOS with bidirectional scrolling
      AOS.init({
        once: false,    // Allow elements to animate multiple times
        mirror: true,    // Enable reverse/bidirectional scroll animations
        offset: 50,      // Offset (in px) from the original trigger point
        duration: 400,    // Animation duration in milliseconds
        easing: 'ease-out-cubic',
      })

      console.log('✅ AOS initialized in App.vue onMounted')
    }
  }, 100) // 100ms delay to ensure Vue has painted the DOM
})

// SPA Refresh Hack: Refresh AOS on route changes
router.afterEach((to, from) => {
  // Only refresh if it's a different route (not just hash changes)
  if (to.path !== from.path) {
    setTimeout(() => {
      if (typeof (window as any).AOS !== 'undefined') {
        const AOS = (window as any).AOS
        AOS.refresh()
        console.log('✅ AOS refreshed for route:', to.path)
      }
    }, 150) // 150ms delay to ensure DOM is updated
  }
})
</script>

<template>
  <RouterView />
</template>
