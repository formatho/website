<script setup lang="ts">
// MascotsView.vue - Formatho Character Universe
// Note: AOS is initialized globally in main.ts

import { mascotSvgs } from '@/assets/mascot-assets'

interface Mascot {
  name: string
  role: string
  traits: string[]
  description: string
  signatureLine: string
  color: string
  glowColor: string
  svgKey: 'flowtho' | 'morpho' | 'memo' | 'nexo' | 'halo'
  textClass: string
}

const mascots: Mascot[] = [
  {
    name: 'Flowtho',
    role: 'The Guide (Peacock)',
    traits: ['Calm', 'Intelligent'],
    description: 'An elegant peacock that helps users flow through workflows with ease and clarity.',
    signatureLine: '"Let\'s make this flow."',
    color: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    svgKey: 'flowtho',
    textClass: 'text-cyan-400'
  },
  {
    name: 'Morpho',
    role: 'The Builder (Fox)',
    traits: ['Creative', 'Structured'],
    description: 'A clever fox that transforms prompts into fully-formed workflows and systems.',
    signatureLine: '"Let\'s morph this idea into a system."',
    color: 'violet',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    svgKey: 'morpho',
    textClass: 'text-violet-400'
  },
  {
    name: 'Memo',
    role: 'The Memory Keeper (Elephant)',
    traits: ['Organized', 'Observant'],
    description: 'A wise elephant that stores knowledge and tracks history across all interactions.',
    signatureLine: '"I remember this."',
    color: 'amber',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    svgKey: 'memo',
    textClass: 'text-amber-400'
  },
  {
    name: 'Nexo',
    role: 'The Connector (Crane)',
    traits: ['Social', 'Technical'],
    description: 'A graceful crane that connects apps, syncs data, and bridges disparate systems.',
    signatureLine: '"Let\'s connect that."',
    color: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    svgKey: 'nexo',
    textClass: 'text-emerald-400'
  },
  {
    name: 'Halo',
    role: 'The Onboarding Guide (Dove)',
    traits: ['Friendly', 'Welcoming'],
    description: 'A peaceful dove that guides new users through product tours and initial setup.',
    signatureLine: '"I\'ll guide you."',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    svgKey: 'halo',
    textClass: 'text-rose-400'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border/50">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <!-- Decorative Elements -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 py-20 md:py-32 relative">
        <div class="max-w-4xl mx-auto">
          <!-- Glassmorphic Hero Card -->
          <div
            class="glass-card p-12 md:p-16 text-center"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <!-- Decorative Top Line -->
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
            
            <!-- Title -->
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <span class="gradient-text">Meet the Formatho Team</span>
            </h1>
            
            <!-- Subtitle -->
            <p
              class="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              Where workflows take form. Guided by Flowtho.
            </p>
            
            <!-- Decorative Bottom Line -->
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Character Cards Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up" data-aos-duration="600">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">The Formatho Character Universe</h2>
          <p class="text-muted-foreground max-w-xl mx-auto">
            Five unique AI personalities designed to help you work smarter.
          </p>
        </div>

        <!-- Responsive Grid - 5 cards: 3 on top, 2 centered on bottom -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(mascot, index) in mascots"
            :key="mascot.name"
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            :class="{
              'lg:col-start-2': index === 3 // Center 4th card on bottom row
            }"
            data-aos="fade-up"
            data-aos-duration="600"
            :data-aos-delay="100 + (index * 100)"
          >
            <!-- Visual - High-Fidelity SVG -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                :style="{ background: `linear-gradient(135deg, ${mascot.glowColor.replace('0.3', '0.2')}, ${mascot.glowColor.replace('0.3', '0.1')})`, boxShadow: `0 0 40px ${mascot.glowColor}` }"
                v-html="mascotSvgs[mascot.svgKey]"
              />
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">{{ mascot.name }}</h3>
            <p :class="[mascot.textClass, 'text-sm text-center mb-4 font-medium']">{{ mascot.role }}</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span 
                v-for="trait in mascot.traits" 
                :key="trait"
                class="px-3 py-1 text-xs rounded-full border"
                :class="[
      `bg-${mascot.color}-500/10`,
      `border-${mascot.color}-500/20`,
      `text-${mascot.color}-300`
    ]"
              >
                {{ trait }}
              </span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              {{ mascot.description }}
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic" :class="[mascot.textClass, 'opacity-80']">
              {{ mascot.signatureLine }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Ensure high-fidelity SVGs render properly */
:deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
