<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { tools } from '../data/tools'
import EmailCapture from '@/components/EmailCapture.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'

// Note: AOS is initialized globally in main.ts to avoid conflicts

const searchQuery = ref('')

// Filter tools based on search query
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) {
    return tools
  }

  const query = searchQuery.value.toLowerCase()
  return tools.filter(category =>
    category.items.some(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      category.category.toLowerCase().includes(query)
    )
  )
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background"
      data-v-8d4ed633=""
    >
      <div class="absolute inset-0 bg-grid-pattern opacity-5" data-v-8d4ed633=""></div>
      <div class="container mx-auto px-4 py-12 md:py-16 relative" data-v-8d4ed633="">
        <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto" data-v-8d4ed633="">
          <div class="flex items-center gap-4" data-aos="fade-down" data-aos-delay="0" data-v-8d4ed633="">
            <img
              src="/logo.png"
              alt="Formatho"
              class="h-20 w-20 rounded-xl shadow-2xl ring-2 ring-primary/20"
              data-v-8d4ed633=""
            />
            <h1 class="text-5xl md:text-7xl font-bold tracking-tight gradient-text" data-v-8d4ed633="">
              Formatho
            </h1>
          </div>
          <p class="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl leading-tight" data-aos="fade-down" data-aos-delay="100" data-v-8d4ed633="">
            The Privacy-First Developer Toolkit
          </p>
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed" data-aos="fade-down" data-aos-delay="200" data-v-8d4ed633="">
            Fast, secure, privacy-first collection of 100+ developer utilities and content productivity
            tools — built to solve everyday formatting, conversion, and debugging problems directly
            in your browser.
          </p>
          <div class="flex flex-wrap gap-4 justify-center items-center mt-6" data-v-8d4ed633="">
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="0"
              data-v-8d4ed633=""
            >
              <span class="text-gray-900" data-v-8d4ed633="">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </span>
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> Your data never leaves your browser </span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="50"
              data-v-8d4ed633=""
            >
              <span class="text-gray-900" data-v-8d4ed633="">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="5" r="3"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                </svg>
              </span>
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> Zero tracking, zero storage </span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full"
              data-aos="fade-up"
              data-aos-delay="100"
              data-v-8d4ed633=""
            >
              <span class="text-gray-900" data-v-8d4ed633="">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              </span>
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> 100% client-side processing </span>
            </div>
          </div>
          <div class="w-full max-w-2xl mt-6" data-v-8d4ed633="">
            <div class="relative" data-v-8d4ed633="">
              <Input
                class="w-full pl-12 pr-4 py-6 text-lg glass-card border-primary/20 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                placeholder="Search tools... (e.g., JSON, Base64, UUID)"
                v-model="searchQuery"
                data-v-8d4ed633=""
              />
              <Search
                class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground"
                data-v-8d4ed633=""
              />
            </div>
          </div>
          
          <!-- Newsletter Signup in Hero -->
          <div class="w-full max-w-xl mt-6">
            <EmailCapture
              source="homepage"
              variant="hero"
              placeholder="Get updates delivered to your inbox"
              buttonText="Subscribe"
              :show-icon="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- Tools Grid -->
    <section class="container mx-auto px-4 py-10 md:py-14" data-v-8d4ed633="">
      <div class="space-y-12" data-v-8d4ed633="">
        <!-- Categories with tools -->
        <div
          v-for="(category, categoryIndex) in filteredTools"
          :key="category.category"
          class="space-y-6"
          data-v-8d4ed633=""
        >
          <div class="flex items-center gap-4" data-v-8d4ed633="">
            <h2
              class="text-2xl md:text-3xl font-bold tracking-tight"
              data-v-8d4ed633=""
            >
              {{ category.category }}
            </h2>
            <div class="flex-1 h-px bg-gradient-to-r from-border to-transparent" data-v-8d4ed633=""></div>
            <span class="text-sm text-muted-foreground font-medium" data-v-8d4ed633="">
              {{ category.items.length }} tools
            </span>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-v-8d4ed633=""
          >
            <RouterLink
              v-for="(tool, toolIndex) in category.items"
              :key="tool.name"
              :to="tool.route"
              class="premium-card-hover"
              data-v-8d4ed633=""
            >
              <div
                class="glass-card h-full p-6 cursor-pointer"
                data-aos="fade-up"
                :data-aos-delay="(toolIndex % 4) * 50"
                data-v-8d4ed633=""
              >
                <div class="flex flex-col h-full" data-v-8d4ed633="">
                  <!-- Icon with dynamic Lucide component -->
                  <div class="mb-4" data-v-8d4ed633="">
                    <div
                      class="p-3 rounded-xl bg-primary/10 transition-all w-fit"
                      data-v-8d4ed633=""
                    >
                      <component
                        :is="LucideIcons[tool.iconName] || LucideIcons.Wrench"
                        class="w-6 h-6 text-gray-900"
                        stroke-width="2"
                      />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1" data-v-8d4ed633="">
                    <h3
                      class="text-lg font-semibold mb-2 transition-colors"
                      data-v-8d4ed633=""
                    >
                      {{ tool.name }}
                    </h3>
                    <p
                      class="text-sm text-muted-foreground leading-relaxed"
                      data-v-8d4ed633=""
                    >
                      {{ tool.description }}
                    </p>
                  </div>

                  <!-- Arrow Icon -->
                  <div class="text-gray-900" data-v-8d4ed633="">
                    Open tool
                    <svg
                      class="w-4 h-4 ml-1 hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-v-8d4ed633=""
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Developers Choose Formatho -->
    <section
      class="container mx-auto px-4 py-16 border-t border-border/50"
      data-v-8d4ed633=""
    >
      <div class="max-w-4xl mx-auto" data-v-8d4ed633="">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center" data-v-8d4ed633="">
          Why Developers Choose Formatho
        </h2>
        <div class="grid md:grid-cols-3 gap-8" data-v-8d4ed633="">
          <div class="space-y-4" data-v-8d4ed633="">
            <h3 class="text-gray-900" data-v-8d4ed633="">Privacy-First Architecture</h3>
            <p class="text-muted-foreground" data-v-8d4ed633="">
              Every tool runs 100% client-side in your browser. No uploads, no database
              storage, and zero third-party analytics. Your sensitive data never leaves your
              device.
            </p>
          </div>
          <div class="space-y-4" data-v-8d4ed633="">
            <h3 class="text-gray-900" data-v-8d4ed633="">Lightning Fast Performance</h3>
            <p class="text-muted-foreground" data-v-8d4ed633="">
              Zero server latency means instant results. Tools execute directly in your browser's
              JavaScript engine, giving you millisecond-level response times for all
              operations.
            </p>
          </div>
          <div class="space-y-4" data-v-8d4ed633="">
            <h3 class="text-gray-900" data-v-8d4ed633="">Developer Focused</h3>
            <p class="text-muted-foreground" data-v-8d4ed633="">
              Built by developers, for developers. Clean interfaces, keyboard shortcuts, and
              powerful features that solve real-world problems in your daily workflow.
            </p>
          </div>
        </div>
        <div class="mt-12 text-center" data-v-8d4ed633="">
          <p class="text-muted-foreground mb-4" data-v-8d4ed633=""> Not seeing what you need?</p>
          <a
            href="mailto:support@formatho.com"
            class="text-gray-900"
            data-v-8d4ed633=""
          >
            Suggest a tool
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
