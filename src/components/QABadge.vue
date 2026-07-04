<script setup lang="ts">
import { computed } from 'vue'

// Only show on QA environment
const isVisible = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'qa.formatho.com'
})

const commit = __GIT_COMMIT__
const commitUrl = `https://github.com/formatho/website/commit/${commit}`
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 z-[9999] bg-yellow-400 text-black text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-black flex items-center gap-2"
  >
    <span class="w-2 h-2 bg-black rounded-full animate-pulse"></span>
    <span>QA</span>
    <span class="opacity-60">·</span>
    <a :href="commitUrl" target="_blank" rel="noopener" class="hover:underline">
      {{ commit }}
    </a>
  </div>
</template>
