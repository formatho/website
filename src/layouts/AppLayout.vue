<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import LiveSiteAnalytics from '@/components/LiveSiteAnalytics.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { tools } from '@/data/tools'

const route = useRoute()
const baseUrl = 'https://formatho.com/tools'

// Only show breadcrumb when not on home page
const showBreadcrumb = computed(() => route.path !== '/')

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
    <main id="main-content" class="flex-1 pt-16">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
