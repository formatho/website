<script setup lang="ts">
/**
 * Variant B: Social Proof Hero
 * 
 * Hypothesis: Adding social proof (usage statistics) will increase trust
 * and drive 15-20% higher tool engagement.
 * 
 * Test ID: hero-variant-b
 */
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

const searchQuery = ref('')

// Popular tools for quick access
const popularTools = [
  { name: 'JSON Formatter', route: '/tools/json-formatter' },
  { name: 'Base64 Encoder', route: '/tools/base64-string' },
  { name: 'UUID Generator', route: '/tools/uuid-generator' },
  { name: 'Hash Generator', route: '/tools/hash-text' },
]

// Stats (these should come from analytics in production)
const stats = {
  developers: '50,000+',
  toolsUsed: '2M+',
  toolsAvailable: 'Free',
  uptime: '99.9%',
  rating: '4.9/5',
}
</script>

<template>
  <section class="hero-variant-b relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="container mx-auto px-4 py-12 md:py-16 relative">
      <div class="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
        
        <!-- Logo + Title -->
        <div class="flex items-center gap-4" data-aos="fade-down">
          <img
            src="/logo.png?v=2"
            alt="Formatho"
            class="h-20 w-20 rounded-xl shadow-2xl ring-2 ring-primary/20"
          />
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
            Formatho
          </h1>
        </div>
        
        <!-- Tagline -->
        <p class="text-2xl md:text-3xl font-semibold text-foreground" data-aos="fade-down" data-aos-delay="100">
          The Privacy-First Developer Toolkit
        </p>

        <!-- Social Proof Bar -->
        <div class="w-full max-w-3xl" data-aos="fade-up" data-aos-delay="150">
          <div class="social-proof-bar">
            <span class="badge">🏆 TRUSTED BY 50,000+ DEVELOPERS WORLDWIDE</span>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-value">{{ stats.toolsUsed }}</span>
                <span class="stat-label">Tools Used</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ stats.toolsAvailable }}</span>
                <span class="stat-label">Tools</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ stats.uptime }}</span>
                <span class="stat-label">Uptime</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">⭐ {{ stats.rating }}</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Shortened Description -->
        <p class="text-base md:text-lg text-muted-foreground max-w-2xl" data-aos="fade-down" data-aos-delay="200">
          Fast, secure, privacy-first collection of developer utilities — 
          <strong>your data never leaves your browser.</strong>
        </p>
        
        <!-- Search Bar -->
        <div class="w-full max-w-2xl" data-aos="fade-up" data-aos-delay="250">
          <div class="relative">
            <Input
              class="w-full pl-12 pr-4 py-6 text-lg glass-card border-primary/20 focus:border-primary/50"
              type="text"
              placeholder="Search tools... (e.g., JSON, Base64, UUID)"
              v-model="searchQuery"
            />
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
          </div>
        </div>

        <!-- Popular Tools Quick Links -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-4" data-aos="fade-up" data-aos-delay="300">
          <span class="text-sm text-muted-foreground">Popular now:</span>
          <RouterLink
            v-for="tool in popularTools"
            :key="tool.route"
            :to="tool.route"
            class="popular-tool-link"
          >
            {{ tool.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.social-proof-bar {
  @apply bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4;
}

.social-proof-bar .badge {
  @apply inline-block text-sm font-semibold text-primary tracking-wide;
}

.stats-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}

.stat-item {
  @apply flex flex-col items-center;
}

.stat-value {
  @apply text-2xl md:text-3xl font-bold text-foreground;
}

.stat-label {
  @apply text-sm text-muted-foreground;
}

.popular-tool-link {
  @apply px-3 py-1.5 text-sm font-medium bg-primary/10 hover:bg-primary/20 rounded-full transition-colors;
}
</style>
