<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
// REMOVED: import LiveSiteAnalytics from '@/components/LiveSiteAnalytics.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import QABadge from '@/components/QABadge.vue'
import ToolSEOContent from '@/components/ToolSEOContent.vue'
import { trackToolUsed, trackResultCopied } from '@/utils/toolTracking'
import BookmarkHint from '@/components/BookmarkHint.vue'
import { computed, watch, onMounted, onUnmounted, ref } from 'vue'
import { tools } from '@/data/tools'

const route = useRoute()

// Loading state for route transitions
const isLoading = ref(false)
let loadingTimeout: ReturnType<typeof setTimeout> | null = null
let isFirstLoad = ref(true)

// Only show breadcrumb when not on home page
const showBreadcrumb = computed(() => route.path !== '/')

// Detect page type for contextual skeleton loaders
const isToolPage = computed(() => route.path.startsWith('/tools/') && route.path !== '/tools/')
const isBlogPage = computed(() => route.path.startsWith('/blogs'))

// ─── GA4 Key Event: global tool action interceptor ───
// Detects primary action clicks (Format/Generate/Encode/etc.) and Copy
// clicks on any tool page without modifying individual tool components.
const ACTION_KEYWORDS = [
  'generate', 'format', 'encode', 'decode', 'convert', 'compress',
  'hash', 'run', 'execute', 'call', 'calculate', 'encrypt', 'decrypt',
  'validate', 'beautify', 'minify', 'lint', 'compare', 'diff',
  'look up', 'derive', 'compile', 'submit', 'start', 'process',
  'apply', 'transform', 'parse', 'analyze', 'check', 'test',
]
const COPY_KEYWORDS = ['copy']

function getToolSlug(): string {
  const seg = route.path.split('/').filter(Boolean)
  return seg[seg.length - 1] || ''
}

function getToolCategory(): string {
  // Look up from tools.ts by matching the route
  for (const cat of tools) {
    if (cat.items.some((t: { route: string }) => t.route === route.path)) {
      return cat.slug
    }
  }
  return 'unknown'
}

function handleClick(event: MouseEvent): void {
  if (!isToolPage.value) return

  const target = event.target as HTMLElement
  if (!target) return

  // Find the button element (click may hit a child icon/span)
  const btn = target.closest('button')
  if (!btn) return

  const text = (btn.textContent || '').toLowerCase().trim()
  if (!text) return

  const slug = getToolSlug()
  if (!slug) return

  // Copy buttons → tool_result_copied
  if (COPY_KEYWORDS.some((k) => text.includes(k))) {
    trackResultCopied(slug)
    return
  }

  // Primary action buttons → tool_used (session-guarded)
  if (ACTION_KEYWORDS.some((k) => text.includes(k))) {
    trackToolUsed(slug, getToolCategory())
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClick, { passive: true })
}

// Watch route changes to show skeleton during lazy-loaded navigation
watch(
  () => route.path,
  (to, from) => {
    if (to !== from && !isFirstLoad.value) {
      isLoading.value = true
      if (loadingTimeout) clearTimeout(loadingTimeout)
      // Safety: auto-hide after 800ms
      loadingTimeout = setTimeout(() => {
        isLoading.value = false
      }, 800)
    }
    isFirstLoad.value = false
  }
)

// Called when the new route component mounts
function onComponentReady() {
  isLoading.value = false
  if (loadingTimeout) clearTimeout(loadingTimeout)
}


let toolSchemaScript: HTMLScriptElement | null = null


function removeToolSchema() {
  if (toolSchemaScript?.parentNode) {
    toolSchemaScript.parentNode.removeChild(toolSchemaScript)
    toolSchemaScript = null
  }
}

onUnmounted(removeToolSchema)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Skip to Content Link - Accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
    >
      Skip to main content
    </a>

    <Navbar />
    <Breadcrumb v-if="showBreadcrumb" />
    <main id="main-content" class="flex-1 pt-16" :class="{ 'pt-[104px]': showBreadcrumb }">
      <!-- Skeleton Loader: Tool Pages (2-col editor layout) -->
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-100"
        enter-to-class="opacity-0"
        leave-active-class="hidden"
      >
        <div
          v-if="isLoading && isToolPage"
          class="animate-pulse p-4 gap-4 flex flex-col bg-muted/30"
          style="min-height: calc(100vh - 8rem)"
        >
          <!-- Title bar -->
          <div class="flex items-center justify-between">
            <div class="h-8 bg-muted-foreground/15 rounded-md w-64"></div>
            <div class="h-9 bg-muted-foreground/15 rounded-md w-28"></div>
          </div>
          <!-- Two-column editor grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
            <div class="border border-muted-foreground/10 rounded-xl p-4 space-y-3 flex flex-col">
              <div class="h-4 bg-muted-foreground/15 rounded w-32"></div>
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-muted-foreground/10 rounded w-full"></div>
                <div class="h-3 bg-muted-foreground/10 rounded w-3/4"></div>
                <div class="h-3 bg-muted-foreground/10 rounded w-5/6"></div>
                <div class="h-3 bg-muted-foreground/10 rounded w-2/3"></div>
              </div>
            </div>
            <div class="border border-muted-foreground/10 rounded-xl p-4 space-y-3 flex flex-col">
              <div class="h-4 bg-muted-foreground/15 rounded w-28"></div>
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-muted-foreground/10 rounded w-full"></div>
                <div class="h-3 bg-muted-foreground/10 rounded w-4/5"></div>
                <div class="h-3 bg-muted-foreground/10 rounded w-3/5"></div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Skeleton Loader: Blog Pages -->
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-100"
        enter-to-class="opacity-0"
        leave-active-class="hidden"
      >
        <div v-if="isLoading && isBlogPage" class="animate-pulse max-w-3xl mx-auto p-6 space-y-6">
          <div class="h-6 bg-muted rounded w-24"></div>
          <div class="h-10 bg-muted-foreground/15 rounded-lg w-3/4"></div>
          <div class="flex items-center gap-3">
            <div class="h-4 bg-muted rounded w-32"></div>
            <div class="h-4 bg-muted rounded w-20"></div>
          </div>
          <div class="space-y-3 pt-4">
            <div class="h-4 bg-muted-foreground/10 rounded w-full"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-full"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-5/6"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-full"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-3/4"></div>
          </div>
          <div class="h-48 bg-muted-foreground/10 rounded-xl"></div>
          <div class="space-y-3">
            <div class="h-4 bg-muted-foreground/10 rounded w-full"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-full"></div>
            <div class="h-4 bg-muted-foreground/10 rounded w-2/3"></div>
          </div>
        </div>
      </Transition>

      <!-- Skeleton Loader: Generic Pages -->
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-100"
        enter-to-class="opacity-0"
        leave-active-class="hidden"
      >
        <div
          v-if="isLoading && !isToolPage && !isBlogPage"
          class="animate-pulse max-w-5xl mx-auto p-6 space-y-6"
        >
          <div class="h-8 bg-muted rounded-md w-56"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="h-4 bg-muted rounded w-24"></div>
              <div class="h-12 bg-muted rounded-md"></div>
              <div class="h-4 bg-muted rounded w-32"></div>
              <div class="h-12 bg-muted rounded-md"></div>
              <div class="h-10 bg-muted rounded-md w-40"></div>
            </div>
            <div class="space-y-4">
              <div class="h-4 bg-muted rounded w-20"></div>
              <div class="h-32 bg-muted rounded-md"></div>
              <div class="h-4 bg-muted rounded w-48"></div>
            </div>
          </div>
        </div>
      </Transition>

      <RouterView v-show="!isLoading" @vue:mounted="onComponentReady" />
      <ToolSEOContent />
      <BookmarkHint />
    </main>
    <Footer />
    <QABadge />
  </div>
</template>
