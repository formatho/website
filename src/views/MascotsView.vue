<script setup lang="ts">
// MascotsView.vue - Formatho Character Universe
// Note: AOS is initialized globally in main.ts

interface Mascot {
  name: string
  role: string
  traits: string[]
  description: string
  signatureLine: string
  color: string
  glowColor: string
  icon: string
}

const mascots: Mascot[] = [
  {
    name: 'Flowtho',
    role: 'The Guide',
    traits: ['Calm', 'Intelligent'],
    description: 'Helps users move through workflows with ease and clarity.',
    signatureLine: '"Let\'s make this flow."',
    color: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    icon: 'wave'
  },
  {
    name: 'Morpho',
    role: 'The Builder',
    traits: ['Creative', 'Structured'],
    description: 'Converts prompts into fully-formed workflows and systems.',
    signatureLine: '"Let\'s morph this idea into a system."',
    color: 'violet',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    icon: 'shape'
  },
  {
    name: 'Memo',
    role: 'The Memory Keeper',
    traits: ['Organized', 'Observant'],
    description: 'Stores knowledge and tracks history across all interactions.',
    signatureLine: '"I remember this."',
    color: 'amber',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    icon: 'cube'
  },
  {
    name: 'Nexo',
    role: 'The Connector',
    traits: ['Social', 'Technical'],
    description: 'Connects apps, syncs data, and bridges disparate systems.',
    signatureLine: '"Let\'s connect that."',
    color: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    icon: 'network'
  },
  {
    name: 'Halo',
    role: 'The Onboarding Guide',
    traits: ['Friendly', 'Welcoming'],
    description: 'Guides new users through product tours and initial setup.',
    signatureLine: '"I\'ll guide you."',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    icon: 'circle'
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
          <!-- Flowtho - The Guide -->
          <div
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <!-- Visual -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                :style="{ background: `linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.1))`, boxShadow: `0 0 40px rgba(6, 182, 212, 0.3)` }"
              >
                <!-- Wave SVG -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20C4 20 8 12 12 20C16 28 20 12 24 20C28 28 32 12 36 20" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 28C4 28 8 20 12 28C16 36 20 20 24 28C28 36 32 20 36 28" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
                </svg>
              </div>
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">Flowtho</h3>
            <p class="text-cyan-400 text-sm text-center mb-4 font-medium">The Guide</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span class="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">Calm</span>
              <span class="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">Intelligent</span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              Helps users move through workflows with ease and clarity.
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic text-cyan-400/80">"Let's make this flow."</p>
          </div>

          <!-- Morpho - The Builder -->
          <div
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <!-- Visual -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                :style="{ background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1))`, boxShadow: `0 0 40px rgba(139, 92, 246, 0.3)` }"
              >
                <!-- Transforming Shape SVG -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="20,4 36,20 20,36 4,20" stroke="#8b5cf6" stroke-width="2.5" fill="none"/>
                  <circle cx="20" cy="20" r="8" stroke="#8b5cf6" stroke-width="2" fill="none" opacity="0.5"/>
                </svg>
              </div>
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">Morpho</h3>
            <p class="text-violet-400 text-sm text-center mb-4 font-medium">The Builder</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span class="px-3 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">Creative</span>
              <span class="px-3 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">Structured</span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              Converts prompts into fully-formed workflows and systems.
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic text-violet-400/80">"Let's morph this idea into a system."</p>
          </div>

          <!-- Memo - The Memory Keeper -->
          <div
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            <!-- Visual -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                :style="{ background: `linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))`, boxShadow: `0 0 40px rgba(245, 158, 11, 0.3)` }"
              >
                <!-- Cube SVG -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
                  <path d="M20 4V20M20 20L6 12M20 20L34 12" stroke="#f59e0b" stroke-width="2" opacity="0.5"/>
                </svg>
              </div>
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">Memo</h3>
            <p class="text-amber-400 text-sm text-center mb-4 font-medium">The Memory Keeper</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span class="px-3 py-1 text-xs rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">Organized</span>
              <span class="px-3 py-1 text-xs rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">Observant</span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              Stores knowledge and tracks history across all interactions.
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic text-amber-400/80">"I remember this."</p>
          </div>

          <!-- Nexo - The Connector -->
          <div
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300 lg:col-start-1 lg:col-end-2 lg:[&:nth-child(4)]:lg:col-start-2"
            style="grid-column: auto"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
            <!-- Visual -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                :style="{ background: `linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))`, boxShadow: `0 0 40px rgba(16, 185, 129, 0.3)` }"
              >
                <!-- Network/Nodes SVG -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="12" r="4" stroke="#10b981" stroke-width="2" fill="none"/>
                  <circle cx="32" cy="12" r="4" stroke="#10b981" stroke-width="2" fill="none"/>
                  <circle cx="20" cy="28" r="4" stroke="#10b981" stroke-width="2" fill="none"/>
                  <line x1="11" y1="14" x2="17" y2="26" stroke="#10b981" stroke-width="2" opacity="0.5"/>
                  <line x1="29" y1="14" x2="23" y2="26" stroke="#10b981" stroke-width="2" opacity="0.5"/>
                  <line x1="12" y1="12" x2="28" y2="12" stroke="#10b981" stroke-width="2" opacity="0.5"/>
                </svg>
              </div>
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">Nexo</h3>
            <p class="text-emerald-400 text-sm text-center mb-4 font-medium">The Connector</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span class="px-3 py-1 text-xs rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Social</span>
              <span class="px-3 py-1 text-xs rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Technical</span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              Connects apps, syncs data, and bridges disparate systems.
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic text-emerald-400/80">"Let's connect that."</p>
          </div>

          <!-- Halo - The Onboarding Guide -->
          <div
            class="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="500"
          >
            <!-- Visual -->
            <div class="flex justify-center mb-6">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                :style="{ background: `linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(244, 63, 94, 0.1))`, boxShadow: `0 0 40px rgba(244, 63, 94, 0.3)` }"
              >
                <!-- Glowing Circle SVG -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="12" stroke="#f43f5e" stroke-width="2.5" fill="none"/>
                  <circle cx="20" cy="20" r="6" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.5"/>
                  <circle cx="20" cy="20" r="16" stroke="#f43f5e" stroke-width="1" fill="none" opacity="0.3"/>
                </svg>
              </div>
            </div>
            
            <!-- Name & Role -->
            <h3 class="text-xl font-bold text-center mb-1">Halo</h3>
            <p class="text-rose-400 text-sm text-center mb-4 font-medium">The Onboarding Guide</p>
            
            <!-- Traits -->
            <div class="flex justify-center gap-2 mb-4">
              <span class="px-3 py-1 text-xs rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">Friendly</span>
              <span class="px-3 py-1 text-xs rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">Welcoming</span>
            </div>
            
            <!-- Description -->
            <p class="text-muted-foreground text-sm text-center mb-4">
              Guides new users through product tours and initial setup.
            </p>
            
            <!-- Signature Line -->
            <p class="text-center text-sm italic text-rose-400/80">"I'll guide you."</p>
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

/* Center last two cards on large screens */
@media (min-width: 1024px) {
  .grid > div:nth-child(4) {
    grid-column: 1 / 2;
    grid-row: 2;
  }
  .grid > div:nth-child(5) {
    grid-column: 2 / 3;
    grid-row: 2;
  }
}
</style>
