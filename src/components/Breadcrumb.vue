<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

interface BreadcrumbItem {
  name: string
  path: string
}

const route = useRoute()
let structuredDataScript: HTMLScriptElement | null = null

const baseUrl = 'https://formatho.com/tools'

// Generate breadcrumb items based on route
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  
  // Default breadcrumb items
  const items: BreadcrumbItem[] = [
    { name: 'Home', path: '/' }
  ]
  
  // Add tool page to breadcrumbs if not on home
  if (path && path !== '/') {
    // Use route meta title if available, otherwise derive from path
    const toolName = (route.meta?.title as string)?.replace(/\s*[-|]\s*Formatho.*$/, '')
      || path.slice(1).split('-').map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ')
    
    items.push({
      name: toolName,
      path
    })
  }
  
  return items
})

function injectBreadcrumbStructuredData() {
  if (typeof document === 'undefined') return
  removeStructuredData()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`
    }))
  }

  structuredDataScript = document.createElement('script')
  structuredDataScript.type = 'application/ld+json'
  structuredDataScript.setAttribute('data-breadcrumb', 'true')
  structuredDataScript.textContent = JSON.stringify(structuredData)
  document.head.appendChild(structuredDataScript)
}

function removeStructuredData() {
  if (structuredDataScript?.parentNode) {
    structuredDataScript.parentNode.removeChild(structuredDataScript)
    structuredDataScript = null
  }
}

onMounted(injectBreadcrumbStructuredData)
watch(() => route.path, injectBreadcrumbStructuredData)
onUnmounted(removeStructuredData)
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb navigation">
    <a
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
      :href="item.path"
      class="flex items-center hover:text-gray-900 transition-colors"
      :class="{ 'text-gray-900': index === breadcrumbs.length - 1 }"
    >
      <Home v-if="index === 0" class="w-4 h-4" />
      <span v-else>{{ item.name }}</span>
      <ChevronRight v-if="index < breadcrumbs.length - 1" class="w-4 h-4" />
    </a>
  </nav>
</template>
