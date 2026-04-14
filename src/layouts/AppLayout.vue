<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import LiveSiteAnalytics from '@/components/LiveSiteAnalytics.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { computed, watch, onMounted, onUnmounted, ref } from 'vue'
import { tools } from '@/data/tools'

const route = useRoute()
const baseUrl = 'https://formatho.com/tools'

// Loading state for route transitions
const isLoading = ref(false)
let loadingTimeout: ReturnType<typeof setTimeout> | null = null
let isFirstLoad = ref(true)

// Only show breadcrumb when not on home page
const showBreadcrumb = computed(() => route.path !== '/')

// Watch route changes to show skeleton during lazy-loaded navigation
watch(() => route.path, (to, from) => {
  if (to !== from && !isFirstLoad.value) {
    isLoading.value = true
    if (loadingTimeout) clearTimeout(loadingTimeout)
    // Safety: auto-hide after 2s
    loadingTimeout = setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
  isFirstLoad.value = false
})

// Called when the new route component mounts
function onComponentReady() {
  isLoading.value = false
  if (loadingTimeout) clearTimeout(loadingTimeout)
}

// Find tool data for current route
function findTool(path: string) {
  for (const category of tools) {
    for (const item of category.items) {
      if (item.route === path) return { ...item, category: category.category }
    }
  }
  return null
}

let toolSchemaScript: HTMLScriptElement | null = null

function injectToolSchema() {
  if (typeof document === 'undefined') return
  removeToolSchema()

  const tool = findTool(route.path)
  if (!tool) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${baseUrl}${tool.route}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Formatho',
      url: 'https://formatho.com'
    }
  }

  toolSchemaScript = document.createElement('script')
  toolSchemaScript.type = 'application/ld+json'
  toolSchemaScript.setAttribute('data-tool-schema', 'true')
  toolSchemaScript.textContent = JSON.stringify(schema)
  document.head.appendChild(toolSchemaScript)
}

function removeToolSchema() {
  if (toolSchemaScript?.parentNode) {
    toolSchemaScript.parentNode.removeChild(toolSchemaScript)
    toolSchemaScript = null
  }
}

onMounted(injectToolSchema)
watch(() => route.path, injectToolSchema)
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
      <!-- Skeleton Loader Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-100"
        enter-to-class="opacity-0"
        leave-active-class="hidden"
      >
        <div v-if="isLoading" class="animate-pulse p-6 space-y-6 max-w-5xl mx-auto">
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
    </main>
    <Footer />
    <LiveSiteAnalytics />
  </div>
</template>
