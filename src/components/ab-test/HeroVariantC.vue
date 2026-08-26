<script setup lang="ts">
/**
 * Variant C: Problem-Solution Hero
 * 
 * Hypothesis: Leading with the pain point ("tired of...") and offering
 * a clear solution will increase conversion by 25%.
 * 
 * Test ID: hero-variant-c
 */
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {  } from '@/components/ui/button'

const showAllTools = ref(false)

// Top tool categories for quick scan
const topCategories = [
  { icon: '✓', name: 'JSON/YAML converters' },
  { icon: '✓', name: 'Base64 & hashing' },
  { icon: '✓', name: 'SQL formatters' },
  { icon: '✓', name: 'JWT debugger' },
  { icon: '✓', name: 'UUID generators' },
  { icon: '✓', name: 'QR codes' },
]

// Testimonials (rotate or use dynamic data in production)
const testimonial = {
  quote: "Finally, a tool that doesn't steal my data!",
  author: "Developer",
  year: "2024",
}
</script>

<template>
  <section class="hero-variant-c relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-primary/5">
    <div class="container mx-auto px-4 py-12 md:py-20 relative">
      <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        
        <!-- Pain Point Headline -->
        <div class="alert-banner" data-aos="fade-down">
          <span class="icon">⚠️</span>
          <span class="text">TIRED OF UPLOADING YOUR DATA TO RANDOM WEBSITES?</span>
        </div>

        <!-- Main Value Prop Card -->
        <div class="value-prop-card" data-aos="fade-up" data-aos-delay="100">
          <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stop compromising your data.
          </h1>
          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Formatho gives you <strong class="text-foreground">privacy-first developer tools</strong> that run 
            <strong class="text-foreground">ENTIRELY</strong> in your browser. 
            No uploads. No tracking. No databases. Just instant, private tools.
          </p>
        </div>

        <!-- Dual CTAs -->
        <div class="cta-group" data-aos="fade-up" data-aos-delay="200">
          <RouterLink to="/tools" class="cta-primary">
            <span class="icon">🔧</span>
            START USING FREE TOOLS
            <span class="arrow">→</span>
          </RouterLink>
          <button 
            @click="showAllTools = !showAllTools" 
            class="cta-secondary"
          >
            <span class="icon">📖</span>
            SEE ALL TOOLS
          </button>
        </div>

        <!-- Tool Categories Grid -->
        <div class="tool-categories-grid" data-aos="fade-up" data-aos-delay="300">
          <div 
            v-for="cat in topCategories" 
            :key="cat.name" 
            class="category-item"
          >
            <span class="icon">{{ cat.icon }}</span>
            <span class="name">{{ cat.name }}</span>
          </div>
        </div>

        <!-- Testimonial -->
        <div class="testimonial-quote" data-aos="fade-up" data-aos-delay="400">
          <span class="quote-icon">💬</span>
          <blockquote class="quote">"{{ testimonial.quote }}"</blockquote>
          <cite class="author">— {{ testimonial.author }}, {{ testimonial.year }}</cite>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.alert-banner {
  @apply inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full;
}

.alert-banner .icon {
  @apply text-2xl;
}

.alert-banner .text {
  @apply text-sm md:text-base font-semibold text-amber-600 dark:text-amber-400 tracking-wide;
}

.value-prop-card {
  @apply bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12;
}

.cta-group {
  @apply flex flex-col sm:flex-row items-center justify-center gap-4;
}

.cta-primary {
  @apply inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl;
}

.cta-primary .arrow {
  @apply transition-transform group-hover:translate-x-1;
}

.cta-secondary {
  @apply inline-flex items-center gap-3 px-8 py-4 bg-background border-2 border-border font-semibold text-lg rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all;
}

.tool-categories-grid {
  @apply grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl;
}

.category-item {
  @apply flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg text-sm;
}

.category-item .icon {
  @apply text-green-500 font-bold;
}

.category-item .name {
  @apply text-muted-foreground font-medium;
}

.testimonial-quote {
  @apply flex flex-col items-center gap-2 pt-8 border-t border-border/50;
}

.quote-icon {
  @apply text-3xl opacity-50;
}

.quote {
  @apply text-lg md:text-xl text-foreground italic;
}

.author {
  @apply text-sm text-muted-foreground not-italic;
}
</style>
