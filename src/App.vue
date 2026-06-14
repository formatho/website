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

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global Progress Bar */
.global-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(59, 130, 246, 0.2); /* Tailwind blue-500 with opacity */
  z-index: 9999;
  overflow: hidden;
}

.progress-bar-value {
  width: 100%;
  height: 100%;
  background-color: #3b82f6; /* Tailwind blue-500 */
  animation: indeterminateAnimation 1.5s infinite linear;
  transform-origin: left;
}

@keyframes indeterminateAnimation {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
}

/* Utility Classes */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-view,
  .agent-detail-view {
    padding: 1rem;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
