<template>
  <div v-if="related.length" class="max-w-5xl mx-auto px-4 pb-10">
    <div class="border-t border-border pt-6 mt-10">
      <p class="text-sm font-medium mb-3">Continue with</p>
      <div class="grid sm:grid-cols-3 gap-3">
        <RouterLink
          v-for="t in related" :key="t.route" :to="t.route"
          @click="trackClick(t.route)"
          class="group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <p class="text-sm font-medium group-hover:text-primary">{{ t.name }}</p>
          <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ t.description }}</p>
        </RouterLink>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="chipVisible && chipTool" class="fixed bottom-4 right-4 z-50 max-w-xs">
        <div class="relative border border-primary/40 bg-background rounded-lg shadow-lg p-4">
          <p class="text-xs text-muted-foreground">Nice — result copied. Next step:</p>
          <RouterLink :to="chipTool.route" @click="trackClick(chipTool.route, true)" class="text-sm font-medium text-primary hover:underline">
            {{ chipTool.name }} →
          </RouterLink>
          <button @click="chipVisible = false" class="absolute top-1 right-2 text-muted-foreground text-xs">×</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { relatedFor } from '@/data/relatedTools'
import { trackRelatedToolClick } from '@/utils/toolTracking'

const route = useRoute()
const related = computed(() => (route.path.startsWith('/tools/') && route.path !== '/tools/all' ? relatedFor(route.path) : []))
const chipVisible = ref(false)
const chipTool = computed(() => related.value[0] || null)
let chipTimer: ReturnType<typeof setTimeout> | null = null
let copyCount = 0

function onCopied() {
  copyCount++
  if (copyCount === 1 && chipTool.value) {
    chipVisible.value = true
    chipTimer = setTimeout(() => { chipVisible.value = false }, 8000)
  }
}
function trackClick(to: string, fromChip = false) {
  trackRelatedToolClick(route.path, to)
  if (fromChip) chipVisible.value = false
}
onMounted(() => window.addEventListener('formatho:tool-copied', onCopied as EventListener))
onUnmounted(() => {
  window.removeEventListener('formatho:tool-copied', onCopied as EventListener)
  if (chipTimer) clearTimeout(chipTimer)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
