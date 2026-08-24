<script setup lang="ts">
/**
 * Subtle bookmark prompt shown on tool pages after ~8 seconds of use.
 * Tracks engagement as a GA4 Key Event (bookmark_hint_click).
 * Dismissed state persists in localStorage — never nags twice.
 */
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bookmark, X } from 'lucide-vue-next'
import { trackBookmarkHintClick } from '@/utils/toolTracking'

const route = useRoute()
const show = ref(false)
const dismissed = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const toolSlug = computed(() => {
  const seg = route.path.split('/').filter(Boolean)
  return seg[seg.length - 1] || ''
})

const isToolPage = computed(() => route.path.startsWith('/tools/') && route.path !== '/tools/')

onMounted(() => {
  if (!isToolPage.value) return
  const key = `bm-hint-${toolSlug.value}`
  if (localStorage.getItem(key)) return // already dismissed
  timer = setTimeout(() => {
    if (isToolPage.value && !dismissed.value) {
      show.value = true
    }
  }, 8000)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

function handleClick() {
  trackBookmarkHintClick(toolSlug.value)
  dismiss()
}

function dismiss() {
  show.value = false
  dismissed.value = true
  try {
    localStorage.setItem(`bm-hint-${toolSlug.value}`, '1')
  } catch {
    /* storage unavailable */
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed bottom-6 right-6 z-40 max-w-xs border border-border rounded-xl bg-background shadow-lg p-4"
        role="complementary"
        aria-label="Bookmark this tool"
      >
        <button
          class="absolute top-2 right-2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss bookmark prompt"
          @click="dismiss"
        >
          <X class="w-3.5 h-3.5" />
        </button>
        <div class="flex items-start gap-3">
          <div class="p-2 bg-primary/10 rounded-lg shrink-0">
            <Bookmark class="w-4 h-4 text-foreground" stroke-width="1.5" />
          </div>
          <div>
            <p class="text-sm font-semibold mb-1">Bookmark this tool</p>
            <p class="text-xs text-muted-foreground leading-relaxed mb-2">
              Press {{ navigator.platform.includes('Mac') ? '⌘D' : 'Ctrl+D' }} to save for quick access.
            </p>
            <button
              class="no-btn-hover text-xs font-medium text-primary hover:underline"
              @click="handleClick"
            >
              Got it, bookmarked
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
