<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Search, Sparkles } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { tools } from '../data/tools'
import TrustBadges from '@/components/TrustBadges.vue'

import FloatingCTA from '@/components/FloatingCTA.vue'
import { useTwins } from '@/composables/useTwins'

// Summon Halo for onboarding welcome
const { summonTwin } = useTwins()

onMounted(() => {
  // Mascot welcome removed
})

// Note: AOS is initialized globally in main.ts to avoid conflicts

const searchQuery = ref('')

// Prefetch route chunk on hover for instant navigation
const router = useRouter()
const prefetchRoute = (route: string) => {
  const resolved = router.resolve(route)
  const matched = resolved.matched[0]
  if (matched?.components?.default && typeof matched.components.default === 'function') {
    matched.components.default()
  }
}

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
      
      <!-- Animated Gradient Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
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
            100+ free developer tools that run entirely in your browser. No signup, no tracking,
            no data leaves your machine. Plus <RouterLink to="/agent-todo" class="text-primary font-semibold hover:underline">Agent Todo</RouterLink> and
            <RouterLink to="/agent-orchestrator" class="text-primary font-semibold hover:underline">Agent Orchestrator</RouterLink> for AI-powered workflows.
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
          <!-- Conversion CTA -->
          <div class="flex flex-col sm:flex-row gap-4 items-center mt-4" data-v-8d4ed633="">
            <RouterLink to="/agent-orchestrator" data-v-8d4ed633="">
              <button class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg" data-v-8d4ed633="">
                🚀 Try Agent Orchestrator Free
              </button>
            </RouterLink>
            <RouterLink to="/agent-todo" data-v-8d4ed633="">
              <button class="px-8 py-3 border border-primary/30 rounded-lg font-medium text-lg hover:bg-primary/5 transition-colors" data-v-8d4ed633="">
                📋 Agent Todo — Task Management
              </button>
            </RouterLink>
          </div>

          <div class="w-full max-w-2xl mt-6" data-v-8d4ed633="">
            <div class="relative" data-v-8d4ed633="">
              <Input
                class="w-full pl-12 pr-4 py-6 text-lg glass-card border-primary/20 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                aria-label="Search developer tools"
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
          
          <!-- Trust Badges -->
          <div class="w-full mt-8">
            <TrustBadges />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Agent Todo Section -->
    <section class="container mx-auto px-4 py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">Built for AI Agents, Not Humans</h2>
        <p class="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Todoist and Asana were built for people. Agent Todo is built for the agents that work for them.</p>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-border">
                <th class="py-3 px-4 font-semibold">Feature</th>
                <th class="py-3 px-4 font-semibold text-center text-primary">Agent Todo</th>
                <th class="py-3 px-4 font-semibold text-center text-muted-foreground">Todoist / Asana</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b border-border/50">
                <td class="py-3 px-4">REST API for agents</td>
                <td class="py-3 px-4 text-center">✅ Native</td>
                <td class="py-3 px-4 text-center text-muted-foreground">❌ Bolted on</td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4">Agent identity & tracking</td>
                <td class="py-3 px-4 text-center">✅ Built-in</td>
                <td class="py-3 px-4 text-center text-muted-foreground">❌ No concept</td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4">Priority queues for agents</td>
                <td class="py-3 px-4 text-center">✅ Yes</td>
                <td class="py-3 px-4 text-center text-muted-foreground">❌ Manual</td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4">Status lifecycle (pending → blocked → done)</td>
                <td class="py-3 px-4 text-center">✅ Full workflow</td>
                <td class="py-3 px-4 text-center text-muted-foreground">⚠️ Basic</td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4">Free tier</td>
                <td class="py-3 px-4 text-center">✅ Free forever</td>
                <td class="py-3 px-4 text-center text-muted-foreground">⚠️ Limited</td>
              </tr>
              <tr>
                <td class="py-3 px-4">Setup time</td>
                <td class="py-3 px-4 text-center">2 minutes</td>
                <td class="py-3 px-4 text-center text-muted-foreground">30+ minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mt-8">
          <a href="https://todo.formatho.com" target="_blank" rel="noopener">
            <button class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg">
              Start Free — No Credit Card
            </button>
          </a>
        </div>
      </div>
    </section>

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
              @mouseenter="prefetchRoute(tool.route)"
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
                  <div class="flex items-center text-gray-900" data-v-8d4ed633="">
                    <span>Open tool</span>
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

    <!-- Floating CTA for Mobile -->
    <FloatingCTA />
  </div>
</template>
