<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Home, ArrowLeft, Search as SearchIcon } from 'lucide-vue-next'
import { useTwins } from '@/composables/useTwins'
import { tools } from '@/data/tools'

const router = useRouter()
const { summonTwin } = useTwins()
const searchQuery = ref('')

// Flatten tools for search
const allTools = computed(() => {
  const flat: Array<{ name: string; route: string; category: string; icon?: string }> = []
  for (const category of tools) {
    for (const tool of category.items) {
      flat.push({
        name: tool.name,
        route: tool.route,
        category: category.category,
        icon: tool.iconName
      })
    }
  }
  return flat
})

// Filter tools based on search
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) return []
  const query = searchQuery.value.toLowerCase()
  return allTools.value.filter(tool =>
    tool.name.toLowerCase().includes(query) ||
    tool.category.toLowerCase().includes(query)
  ).slice(0, 6) // Show max 6 results
})

// Popular tools for quick access
const popularTools = computed(() => {
  return allTools.value.filter(tool =>
    ['json-yaml', 'base64', 'jwt', 'uuid', 'sql', 'regex-tester', 'hash-text', 'qr-code-generator'].includes(tool.route.replace('/tools/', ''))
  )
})

const handleToolClick = (route: string) => {
  router.push(route)
}

// Prevent Google from indexing 404 pages (fixes soft 404 in Search Console)
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

onMounted(() => {
  // Summon Morpho for 404 error
  summonTwin('morpho', 'I folded this wrong. This page doesn\'t exist.', '404-error', {
    x: 'center',
    y: 100
  })
})

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-lg w-full text-center">
      <!-- Error Code -->
      <h1
        class="text-8xl md:text-9xl font-bold text-muted-foreground/20 mb-4"
      >
        404
      </h1>

      <!-- Error Message -->
      <h2
        class="text-2xl md:text-3xl font-bold mb-4"
      >
        Page Not Found
      </h2>

      <p
        class="text-muted-foreground mb-8"
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button @click="goBack" variant="outline" class="gap-2" aria-label="Go back to previous page">
          <ArrowLeft class="w-4 h-4" />
          Go Back
        </Button>
        <Button @click="goHome" class="gap-2" aria-label="Go to home page">
          <Home class="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <!-- Search Box -->
      <div
        class="mt-8 max-w-md mx-auto"
      >
        <div class="relative">
          <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search for tools..."
            class="w-full pl-12 pr-4 py-3 text-lg border-2 border-foreground"
            aria-label="Search for tools"
          />
        </div>

        <!-- Search Results -->
        <div v-if="filteredTools.length > 0" class="mt-4 text-left bg-background border border-border rounded-lg overflow-hidden">
          <div
            v-for="tool in filteredTools"
            :key="tool.route"
            @click="handleToolClick(tool.route)"
            class="px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 transition-colors"
          >
            <div class="font-semibold text-foreground">{{ tool.name }}</div>
            <div class="text-xs text-muted-foreground">{{ tool.category }}</div>
          </div>
        </div>

        <!-- Popular Tools (shown when no search) -->
        <div v-if="!searchQuery && popularTools.length > 0" class="mt-6 text-left">
          <p class="text-sm text-muted-foreground mb-3">Popular Tools</p>
          <div class="grid grid-cols-2 gap-2">
            <router-link
              v-for="tool in popularTools.slice(0, 6)"
              :key="tool.route"
              :to="tool.route"
              class="px-3 py-2 bg-muted/50 hover:bg-muted rounded-md text-sm text-foreground hover:underline transition-colors"
            >
              {{ tool.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Helpful Links -->
      <div
        class="mt-8 pt-6 border-t border-border"
      >
        <p class="text-sm text-muted-foreground mb-3">Browse by Category</p>
        <div class="flex flex-wrap justify-center gap-3 text-sm">
          <router-link to="/" class="text-primary hover:underline">
            All Tools
          </router-link>
          <router-link to="/category/blockchain" class="text-primary hover:underline">
            Blockchain
          </router-link>
          <router-link to="/category/crypto-security" class="text-primary hover:underline">
            Crypto & Security
          </router-link>
          <router-link to="/category/development" class="text-primary hover:underline">
            Development
          </router-link>
          <router-link to="/about" class="text-primary hover:underline">
            About
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
