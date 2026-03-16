<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

interface BreadcrumbItem {
  name: string
  path: string
}

const route = useRoute()

// Generate breadcrumb items based on route
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  
  // Default breadcrumb items
  const items: BreadcrumbItem[] = [
    { name: 'Home', path: '/' }
  ]
  
  // Add tool page to breadcrumbs if not on home
  if (path && path !== '/') {
    // Extract tool name from path (e.g., '/json-yaml' -> 'JSON to YAML')
    const toolName = path.slice(1).split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ')
    
    items.push({
      name: toolName,
      path
    })
  }
  
  return items
})
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
