<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Formatho - Free Developer Tools & AI Agent Platform',
  description:
    '100+ free developer tools that run entirely in your browser. Privacy-first, no data leaves your machine. AI agent orchestration, task management, and more.',
  keywords: [
    'developer tools',
    'free online tools',
    'privacy tools',
    'AI agents',
    'agent orchestration',
    'formatho',
    'client-side tools',
    'browser tools'
  ],
  ogType: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Formatho',
    url: 'https://formatho.com',
    logo: 'https://formatho.com/tools/logo.png',
    description:
      'Free developer tools and AI agent platform. Privacy-first, client-side processing.',
    sameAs: ['https://twitter.com/formatho', 'https://github.com/formatho']
  }
})
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { tools } from '../data/tools'
import TrustBadges from '@/components/TrustBadges.vue'
import HeroBackground from '@/components/HeroBackground.vue'

import FloatingCTA from '@/components/FloatingCTA.vue'
import { useTwins } from '@/composables/useTwins'

// Summon Halo for onboarding welcome
const { summonTwin: _summonTwin } = useTwins()

onMounted(() => {
  // Mascot welcome removed
})

// Note: AOS is initialized globally in main.ts to avoid conflicts

const searchQuery = ref('')

// Prefetch route chunk on hover for instant navigation
const router = useRouter()
const prefetchedRoutes = new Set<string>()

const prefetchRoute = (route: string) => {
  if (prefetchedRoutes.has(route)) return
  prefetchedRoutes.add(route)

  setTimeout(() => {
    try {
      const resolved = router.resolve(route)
      const matched = resolved.matched[resolved.matched.length - 1]
      if (matched?.components?.default && typeof matched.components.default === 'function') {
        ;(matched.components.default as Function)()
      }
    } catch (e) {
      // ignore
    }
  }, 100)
}

// Filter tools based on search query
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) {
    return tools
  }

  const query = searchQuery.value.toLowerCase()
  return tools.filter((category) =>
    category.items.some(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        category.category.toLowerCase().includes(query)
    )
  )
})

const _popularTools = [
  { name: 'JSON ↔ YAML', path: '/json-yaml', tag: 'Convert', emoji: '🔄' },
  { name: 'Base64', path: '/base64', tag: 'Encode', emoji: '🔐' },
  { name: 'JWT Decoder', path: '/jwt', tag: 'Security', emoji: '🎫' },
  { name: 'UUID Gen', path: '/uuid', tag: 'Generate', emoji: '🆔' },
  { name: 'SQL Format', path: '/sql', tag: 'Format', emoji: '🗃️' },
  { name: 'Regex Test', path: '/regex-tester', tag: 'Test', emoji: '🔍' },
  { name: 'Hash Gen', path: '/hash-text', tag: 'Crypto', emoji: '🔒' },
  { name: 'QR Code', path: '/qr-code-generator', tag: 'Generate', emoji: '📱' },
  { name: 'Crontab', path: '/crontab-generator', tag: 'Schedule', emoji: '⏰' },
  { name: 'Markdown', path: '/markdown', tag: 'Editor', emoji: '📝' },
  { name: 'Color Pick', path: '/color-converter', tag: 'Design', emoji: '🎨' },
  { name: 'Diff Tool', path: '/diff', tag: 'Compare', emoji: '📊' }
]
</script>

<template>
  <div class="min-h-screen home-view">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border/30 bg-white" data-v-8d4ed633="">
      <!-- Isolated Procedural Background (SSG-safe, hydrates on client) -->
      <HeroBackground />

      <!-- Contrast vignette: radial black 60% → 0% at 75% width -->
      <div class="hero-vignette"></div>

      <!-- Master Grid: 1440px max, centered. Padding: 24px mobile / 48px tablet / 96px desktop -->
      <div class="hero-grid-wrapper relative" data-v-8d4ed633="">
        <!-- Hero CSS Grid: background and content overlap in same row/column -->
        <div class="hero-grid" data-v-8d4ed633="">
          <!-- Background container occupies same grid cell as content -->
          <div class="hero-bg-cell" data-v-8d4ed633="">
            <!-- (HeroBackground component already rendered above outside grid) -->
          </div>
          <!-- Text content cell — fractional 3-col grid, center max 1024px -->
          <div class="hero-content-cell" data-v-8d4ed633="">
            <div class="hero-text-container" data-v-8d4ed633="">
              <!-- Clean, centered hero layout -->
              <div class="flex flex-col items-center text-center" data-v-8d4ed633="">
                <h1
                  class="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-6"
                  data-v-8d4ed633=""
                >
                  Formatho
                </h1>
                <!-- Subheading -->
                <h2
                  class="text-2xl md:text-4xl font-semibold text-gray-700 max-w-3xl leading-tight mb-6"
                  data-v-8d4ed633=""
                >
                  100+ Free Developer Tools. Zero Tracking.
                </h2>
                <!-- Description -->
                <p
                  class="text-base md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10"
                  data-v-8d4ed633=""
                >
                  JSON formatter, Base64 encoder, JWT debugger, hash generator, and more.
                  <strong class="text-gray-900">Everything runs in your browser.</strong> No server
                  uploads. No sign-up. No data collection.
                </p>
                <!-- Trust Badges - cleaner horizontal layout -->
                <div
                  class="flex flex-wrap gap-4 justify-center items-center"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div
                    class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                    data-v-8d4ed633=""
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-700" data-v-8d4ed633="">
                      Data never leaves browser
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-v-8d4ed633=""
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-700" data-v-8d4ed633="">
                      Zero tracking, zero storage
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-v-8d4ed633=""
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <path d="M3 9h18M9 21V9"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-700" data-v-8d4ed633="">
                      100% client-side processing
                    </span>
                  </div>
                </div>
              </div>
              <!-- Conversion CTA -->
              <div class="flex flex-col sm:flex-row gap-4 items-center mt-4" data-v-8d4ed633="">
                <RouterLink to="/tools" data-v-8d4ed633="">
                  <button class="cta-btn" data-v-8d4ed633="">⚡ Explore All Tools</button>
                </RouterLink>
              </div>

              <!-- Social Proof Stats -->
              <div
                class="flex flex-wrap gap-8 justify-center items-center mt-8 text-center"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div>
                  <div class="text-3xl font-bold text-primary">100+</div>
                  <div class="text-xs text-muted-foreground">Free developer tools</div>
                </div>
                <div class="w-px h-10 bg-foreground"></div>
                <div>
                  <div class="text-3xl font-bold text-primary">Zero</div>
                  <div class="text-xs text-muted-foreground">Data collected</div>
                </div>
                <div class="w-px h-10 bg-foreground"></div>
                <div>
                  <div class="text-3xl font-bold text-primary">0</div>
                  <div class="text-xs text-muted-foreground">Sign-ups needed</div>
                </div>
                <div class="w-px h-10 bg-foreground"></div>
                <div>
                  <div class="text-3xl font-bold text-primary">100%</div>
                  <div class="text-xs text-muted-foreground">Client-side</div>
                </div>
              </div>

              <div class="w-full max-w-2xl mt-6" data-v-8d4ed633="">
                <div class="relative" data-v-8d4ed633="">
                  <Input
                    class="w-full pl-12 pr-4 py-6 text-lg font-mono border-2 border-foreground bg-transparent focus:border-foreground focus:ring-0"
                    type="text"
                    aria-label="Search developer tools"
                    placeholder="> SEARCH_TOOLS [ e.g. json, base64 ] _"
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
            <!-- /hero-text-container -->
          </div>
          <!-- /hero-content-cell -->
        </div>
        <!-- /hero-grid -->
      </div>
      <!-- /hero-grid-wrapper -->
    </section>

    <!-- Tools Grid -->
    <section class="container mx-auto px-4 py-10 md:py-14" data-v-8d4ed633="">
      <div class="space-y-12" data-v-8d4ed633="">
        <!-- Categories with tools -->
        <div
          v-for="category in filteredTools"
          :key="category.category"
          class="space-y-6"
          data-v-8d4ed633=""
        >
          <div class="flex items-center gap-4 border-b-2 border-foreground pb-2" data-v-8d4ed633="">
            <h2 class="text-2xl md:text-3xl font-black tracking-tight uppercase" data-v-8d4ed633="">
              {{ category.category }}
            </h2>
            <div class="flex-1" data-v-8d4ed633=""></div>
            <span
              class="text-xs font-mono tracking-widest text-muted-foreground"
              data-v-8d4ed633=""
            >
              [ {{ String(category.items.length).padStart(2, '0') }} TOOLS ]
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
                class="h-full p-6 cursor-pointer border border-foreground transition-all duration-150 ease-out hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px]"
                data-aos="fade-up"
                :data-aos-delay="(toolIndex % 4) * 50"
                data-v-8d4ed633=""
              >
                <div class="flex flex-col h-full" data-v-8d4ed633="">
                  <!-- Icon with dynamic Lucide component -->
                  <div class="mb-4" data-v-8d4ed633="">
                    <div class="p-3 border border-foreground/20 w-fit" data-v-8d4ed633="">
                      <component
                        :is="LucideIcons[tool.iconName] || LucideIcons.Wrench"
                        class="w-6 h-6 text-gray-900"
                        stroke-width="2"
                      />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1" data-v-8d4ed633="">
                    <h3 class="text-lg font-semibold mb-2 transition-colors" data-v-8d4ed633="">
                      {{ tool.name }}
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed" data-v-8d4ed633="">
                      {{ tool.description }}
                    </p>
                  </div>

                  <!-- Arrow Icon -->
                  <div class="flex items-center text-gray-900 mt-auto pt-4" data-v-8d4ed633="">
                    <span class="text-xs tracking-widest uppercase font-semibold">EXECUTE</span>
                    <svg
                      class="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-v-8d4ed633=""
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 17L17 7M17 7H7M17 7V17"
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

<style scoped>
.home-view *,
.home-view *::before,
.home-view *::after {
}
</style>
