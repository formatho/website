<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { X, Sparkles } from 'lucide-vue-next'

const isVisible = ref(true)
const isDismissed = ref(false)

const dismissBanner = () => {
  isDismissed.value = true
  isVisible.value = false
  // Remember dismissal in session storage
  sessionStorage.setItem('urgency-banner-dismissed', 'true')
}

onMounted(() => {
  // Check if previously dismissed in this session
  if (sessionStorage.getItem('urgency-banner-dismissed')) {
    isVisible.value = false
    isDismissed.value = true
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="isVisible"
      class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center text-sm font-medium overflow-hidden"
    >
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      <div class="relative flex items-center justify-center gap-3">
        <Sparkles class="w-4 h-4" />
        <span>
          <span class="font-bold">🎉 New:</span> 
          Multi-chain crypto tools • Agent identity generator • Token counter
        </span>
        <a 
          href="/beta" 
          class="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-xs font-bold"
        >
          Try Beta →
        </a>
        <button
          @click="dismissBanner"
          class="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>
