<script setup>
// Main application container - uses Vue Router for navigation
import ExitIntentPopup from '@/components/ExitIntentPopup.vue'
import { useSEO } from '@/composables/useSEO'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading.value = true
  }
  next()
})

router.afterEach(() => {
  // Remove artificial delay for faster navigation
  isLoading.value = false
})

router.onError(() => {
  isLoading.value = false
})

// Initialize per-page SEO (auto-updates on route change)
useSEO()
</script>

<template>
  <div id="app">
    <div v-show="isLoading" class="global-progress-bar">
      <div class="progress-bar-value"></div>
    </div>
    <router-view />
    <!-- Global Exit Intent Popup - shows on mouse leave -->
    <ExitIntentPopup />
  </div>
</template>

<style scoped>
/* Route-change progress bar — only element in App.vue that needs custom CSS.
   Body/font/theme tokens live in src/style.css; never restyle them here. */
.global-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(59, 130, 246, 0.2);
  z-index: 9999;
  overflow: hidden;
}

.progress-bar-value {
  width: 100%;
  height: 100%;
  background-color: #3b82f6;
  animation: indeterminateAnimation 1.5s infinite linear;
  transform-origin: left;
}

@keyframes indeterminateAnimation {
  0% {
    transform: translateX(-100%) scaleX(0.5);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
