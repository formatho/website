<script setup lang="ts">
import { computed, ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { tools } from '@/data/tools'
import { useSEO } from '@/composables/useSEO'
import { ArrowRight, Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

useSEO({
  title: 'All Developer Tools - Free & Private | Formatho',
  description: `Complete directory of ${tools.reduce((a, c) => a + c.items.length, 0)} free developer tools across ${tools.length} categories. All tools run 100% client-side in your browser.`,
  keywords: ['developer tools', 'free online tools', 'privacy first', 'client side tools'],
  ogType: 'website'
})

const search = ref('')

const filteredCategories = computed(() => {
  if (!search.value) return tools
  const q = search.value.toLowerCase()
  return tools
    .map((c) => ({
      ...c,
      items: c.items.filter(
        (t: { name: string; description: string }) =>
          t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      )
    }))
    .filter((c) => c.items.length > 0 || c.category.toLowerCase().includes(q))
})

const totalTools = computed(() => tools.reduce((sum: number, c: { items: unknown[] }) => sum + c.items.length, 0))
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="mt-6 mb-8">
      <h1 class="text-3xl md:text-4xl font-bold">All Tools</h1>
      <p class="text-sm text-muted-foreground mt-2">
        {{ totalTools }} free tools across {{ tools.length }} categories — all private, all client-side
      </p>
    </div>

    <div class="relative max-w-md mb-8">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        v-model="search"
        class="pl-10"
        placeholder="Search tools..."
        aria-label="Search all tools"
      />
    </div>

    <div v-for="category in filteredCategories" :key="category.slug" class="mb-10">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-2xl">{{ category.icon }}</span>
        <h2 class="text-xl font-bold">{{ category.category }}</h2>
        <RouterLink :to="category.route" class="text-xs text-muted-foreground hover:text-primary transition-colors ml-1">
          view all &rarr;
        </RouterLink>
      </div>
      <p class="text-sm text-muted-foreground mb-4 max-w-2xl">{{ category.blurb }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <RouterLink
          v-for="tool in category.items"
          :key="tool.route"
          :to="tool.route"
          class="group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-medium text-sm group-hover:text-primary transition-colors">{{ tool.name }}</p>
              <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ tool.description }}</p>
            </div>
            <ArrowRight class="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
          </div>
        </RouterLink>
      </div>
    </div>

    <div v-if="filteredCategories.length === 0" class="text-center py-16 text-muted-foreground">
      No tools match "{{ search }}". <button class="text-primary hover:underline" @click="search = ''">Clear search</button>
    </div>
  </div>
</template>
