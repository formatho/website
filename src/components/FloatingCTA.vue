<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import EmailCapture from './EmailCapture.vue'

const isVisible = ref(false)
const isDismissed = ref(false)
const scrollThreshold = 300

const handleScroll = () => {
  if (isDismissed.value) return
  
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // Show when scrolled past threshold or near bottom (80% down)
  if (scrollY > scrollThreshold || scrollY > (documentHeight - windowHeight) * 0.8) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

const dismissCTA = () => {
  isDismissed.value = true
  isVisible.value = false
  // Remember dismissal in session storage
  sessionStorage.setItem('floating-cta-dismissed', 'true')
}

onMounted(() => {
  // Check if previously dismissed in this session
  if (sessionStorage.getItem('floating-cta-dismissed')) {
    isDismissed.value = true
  } else {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t-2 border-primary shadow-2xl md:hidden"
    >
      <div class="container mx-auto">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-semibold text-foreground">
            Stay updated with Formatho
          </p>
          <button
            @click="dismissCTA"
            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X class="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <EmailCapture
          source="floating-cta"
          variant="compact"
          placeholder="Your email"
          buttonText="Subscribe"
          :show-icon="false"
        />
      </div>
    </div>
  </Transition>
</template>
