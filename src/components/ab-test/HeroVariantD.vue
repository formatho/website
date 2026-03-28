<script setup lang="ts">
/**
 * Variant D: Minimal CTA-Focused Hero
 * 
 * Hypothesis: Reducing visual clutter and focusing on a single, prominent
 * CTA will increase tool discovery by 30%.
 * 
 * Test ID: hero-variant-d
 */
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Search } from 'lucide-vue-next'
import { tools } from '../../data/tools'

const searchQuery = ref('')

// Filtered tools for search
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) return []
  const query = searchQuery.value.toLowerCase()
  const results: any[] = []
  
  tools.forEach(category => {
    category.items.forEach(tool => {
      if (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      ) {
        results.push({ ...tool, category: category.category })
      }
    })
  })
  
  return results.slice(0, 5) // Show top 5 results
})

// Example search queries
const exampleQueries = [
  'convert JSON to YAML',
  'generate UUID',
  'encode Base64',
  'format SQL',
]
</script>

<template>
  <section class="hero-variant-d min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="container mx-auto px-4 py-16 relative">
      <div class="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
        
        <!-- Logo -->
        <div class="logo-container" data-aos="fade-down">
          <img
            src="/logo.png"
            alt="Formatho"
            class="h-24 w-24 rounded-2xl shadow-2xl ring-4 ring-primary/20"
          />
        </div>

        <!-- Title -->
        <div class="title-block" data-aos="fade-up" data-aos-delay="100">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
            <span class="text-foreground">Privacy-First</span>
            <br />
            <span class="gradient-text">Developer Tools</span>
          </h1>
        </div>

        <!-- Tagline -->
        <p class="text-xl md:text-2xl text-muted-foreground font-light" data-aos="fade-up" data-aos-delay="150">
          100+ tools. Zero data collection. 100% free.
        </p>

        <!-- Large Search Input -->
        <div class="search-container w-full max-w-2xl" data-aos="fade-up" data-aos-delay="200">
          <div class="search-wrapper">
            <Search class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="hero-search-input"
              placeholder="What do you want to do today?"
              autocomplete="off"
            />
          </div>
          
          <!-- Search Examples -->
          <p class="search-examples">
            Try: 
            <span v-for="(query, i) in exampleQueries" :key="query">
              "<button @click="searchQuery = query" class="example-link">{{ query }}</button>"
              <span v-if="i < exampleQueries.length - 1"> or </span>
            </span>
          </p>

          <!-- Search Results Dropdown -->
          <div v-if="filteredTools.length > 0" class="search-results">
            <RouterLink
              v-for="tool in filteredTools"
              :key="tool.route"
              :to="tool.route"
              class="search-result-item"
            >
              <div class="result-name">{{ tool.name }}</div>
              <div class="result-category">{{ tool.category }}</div>
            </RouterLink>
          </div>
        </div>

        <!-- Single CTA Button -->
        <RouterLink to="/tools" class="hero-cta" data-aos="fade-up" data-aos-delay="250">
          <span class="icon">🔧</span>
          EXPLORE ALL TOOLS
          <span class="arrow">→</span>
        </RouterLink>

        <!-- Minimal Trust Badges -->
        <div class="trust-badges-compact" data-aos="fade-up" data-aos-delay="300">
          <span class="badge">
            <span class="badge-icon">🛡️</span>
            No tracking
          </span>
          <span class="badge">
            <span class="badge-icon">🔒</span>
            Client-side
          </span>
          <span class="badge">
            <span class="badge-icon">⚡</span>
            Fast
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.logo-container {
  @apply mb-4;
}

.title-block {
  @apply leading-tight;
}

.search-container {
  @apply relative;
}

.search-wrapper {
  @apply relative;
}

.search-icon {
  @apply absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-muted-foreground;
}

.hero-search-input {
  @apply w-full pl-16 pr-8 py-6 text-xl bg-background border-2 border-border rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none;
  font-size: 1.25rem;
}

.hero-search-input::placeholder {
  @apply text-muted-foreground;
}

.search-examples {
  @apply mt-4 text-sm text-muted-foreground;
}

.example-link {
  @apply text-primary hover:underline cursor-pointer bg-transparent border-0 p-0;
  font-family: inherit;
  font-size: inherit;
}

.search-results {
  @apply absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50;
}

.search-result-item {
  @apply flex items-center justify-between px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border/50 last:border-0;
}

.result-name {
  @apply font-semibold text-foreground;
}

.result-category {
  @apply text-sm text-muted-foreground;
}

.hero-cta {
  @apply inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold text-xl rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-2xl;
}

.hero-cta:hover .arrow {
  @apply translate-x-1;
}

.hero-cta .arrow {
  @apply transition-transform inline-block;
}

.trust-badges-compact {
  @apply flex items-center justify-center gap-6;
}

.badge {
  @apply inline-flex items-center gap-2 text-sm text-muted-foreground;
}

.badge-icon {
  @apply text-base;
}
</style>
