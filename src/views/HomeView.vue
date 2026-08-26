<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import { homeIntro, homeCategoryDetail, homeFAQ } from '@/data/homeSEO'

// FAQPage JSON-LD for homepage FAQ (matches visible text in src/data/homeSEO.ts)
const faqLd = document.createElement('script')
faqLd.type = 'application/ld+json'
faqLd.id = 'json-ld-home-faq'
faqLd.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFAQ.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
})
document.head.appendChild(faqLd)

useSEO({
  title: 'Free Developer Tools and AI Platform | Formatho',
  description: '100+ free, client-side developer and blockchain utilities—including JSON formatters, Base64 encoders, JWT debuggers, SQL formatters, UUID generators, hash generators, QR codes, regex testers, and more—with zero data tracking and no sign-up required.',
  keywords: ['developer tools', 'free online tools', 'JSON formatter', 'Base64 encoder', 'JWT debugger', 'SQL formatter', 'UUID generator', 'hash generator', 'QR code generator', 'regex tester', 'privacy tools', 'AI agents', 'agent orchestration', 'formatho', 'client-side tools', 'browser tools', 'blockchain tools', 'ethereum tools', 'crypto tools'],
  ogType: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Formatho',
    url: 'https://formatho.com',
    logo: 'https://formatho.com/tools/logo.png',
    description: 'Free developer tools and AI agent platform. Privacy-first, client-side processing.',
    sameAs: [
      'https://twitter.com/formatho',
      'https://github.com/formatho'
    ]
  }
})
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
// Import only the icons we actually use (59 icons) instead of the entire library
import {
  ArrowRightLeft,
  BarChart3,
  Binary,
  Building2,
  Calculator,
  Calendar,
  CaseSensitive,
  CheckCircle,
  Clock,
  Code,
  Container,
  Database,
  Expand,
  EyeOff,
  FileCode,
  FileImage,
  FileJson,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  GitBranch,
  GitCompare,
  Globe,
  Hash,
  ImageDown,
  Key,
  Keyboard,
  KeyRound,
  Link,
  Link2,
  Lock,
  LockKeyhole,
  Minimize,
  Monitor,
  Palette,
  Percent,
  Phone,
  QrCode,
  Radio,
  Regex,
  Repeat,
  Search as SearchIcon,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Smile,
  Table2,
  Tag,
  Text,
  Thermometer,
  Timer,
  Type,
  UserCircle,
  Video,
  Wallet,
  Wifi,
  Workflow,
  Zap,
  Wrench,
} from 'lucide-vue-next'
import { tools } from '../data/tools'
import CategoryIcon from '@/components/CategoryIcon.vue'
import { trackSearchTools } from '@/utils/toolTracking'

// Create icon map for dynamic lookup (much smaller bundle than importing *)
const iconMap = {
  ArrowRightLeft,
  BarChart3,
  Binary,
  Building2,
  Calculator,
  Calendar,
  CaseSensitive,
  CheckCircle,
  Clock,
  Code,
  Container,
  Database,
  Expand,
  EyeOff,
  FileCode,
  FileImage,
  FileJson,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  GitBranch,
  GitCompare,
  Globe,
  Hash,
  ImageDown,
  Key,
  Keyboard,
  KeyRound,
  Link,
  Link2,
  Lock,
  LockKeyhole,
  Minimize,
  Monitor,
  Palette,
  Percent,
  Phone,
  QrCode,
  Radio,
  Regex,
  Repeat,
  Search: SearchIcon,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Smile,
  Table2,
  Tag,
  Text,
  Thermometer,
  Timer,
  Type,
  UserCircle,
  Video,
  Wallet,
  Wifi,
  Workflow,
  Zap,
  Wrench,
} as const
import TrustBadges from '@/components/TrustBadges.vue'

import FloatingCTA from '@/components/FloatingCTA.vue'
import { useTwins } from '@/composables/useTwins'

// Summon Halo for onboarding welcome
const { summonTwin: _summonTwin } = useTwins()

onMounted(() => {
  // Mascot welcome removed
})

// Note: AOS is initialized globally in main.ts to avoid conflicts

const popularTools = computed(() => {
  const featured = [
    '/tools/base64', '/tools/jwt', '/tools/uuid', '/tools/json-lint',
    '/tools/regex-tester', '/tools/sql', '/tools/hash-text', '/tools/diff',
    '/tools/json-yaml', '/tools/keccak256', '/tools/contract-reader', '/tools/unix-timestamp'
  ]
  const all = tools.flatMap((c) => c.items)
  return featured.map((r) => all.find((t) => t.route === r)).filter(Boolean)
})

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  const results = tools.flatMap((c) => c.items).filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  ).slice(0, 24)
  // GA4: fire search_tools when a query yields results (result_count only)
  if (results.length > 0 && q.length >= 2) {
    trackSearchTools(results.length)
  }
  return results
})

const toolCount = tools.reduce((sum: number, cat: { items: unknown[] }) => sum + cat.items.length, 0)
const categoryCount = tools.length

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
const _filteredTools_old = computed(() => {
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
  { name: 'Diff Tool', path: '/diff', tag: 'Compare', emoji: '📊' },
]
</script>

<template>
  <div class="min-h-screen home-view">
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
              width="80"
              height="80"
              class="h-20 w-20 rounded-xl shadow-2xl ring-2 ring-primary/20"
              data-v-8d4ed633=""
            />
            <p class="text-5xl md:text-7xl font-bold tracking-tight gradient-text" data-v-8d4ed633="">
              Formatho
            </p>
          </div>
          <h1 class="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl leading-tight" data-aos="fade-down" data-aos-delay="100" data-v-8d4ed633="">
            The complete developer toolkit that runs entirely in your browser
          </h1>
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed" data-aos="fade-down" data-aos-delay="200" data-v-8d4ed633="">
            Format SQL and YAML, decode JWTs, hash with Keccak-256, lint Helm charts, generate vanity addresses — built for <strong class="text-foreground">blockchain, DevOps, enterprise, security, and SRE</strong> workflows. No uploads, no accounts, no tracking.
          </p>
          <div class="flex flex-wrap gap-4 justify-center items-center mt-6" data-v-8d4ed633="">
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-foreground"
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
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> {{ toolCount }} free tools </span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-foreground"
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
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> No uploads, ever </span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-foreground"
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
              <span class="text-sm font-medium text-foreground" data-v-8d4ed633=""> Runs offline once loaded </span>
            </div>
          </div>
          <!-- Conversion CTA -->
          <div class="flex flex-col sm:flex-row gap-4 items-center mt-4" data-v-8d4ed633="">
            <RouterLink to="/tools" data-v-8d4ed633="">
              <button class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg" data-v-8d4ed633="">
                Browse All Tools
              </button>
            </RouterLink>
            <RouterLink to="/category/blockchain" data-v-8d4ed633="">
              <button class="px-6 py-3 bg-foreground/10 border border-foreground text-foreground rounded-lg font-semibold text-lg hover:bg-foreground hover:text-background transition-colors" data-v-8d4ed633="">
                Web3 &amp; Blockchain Suite
              </button>
            </RouterLink>
          </div>

          <!-- Social Proof Stats -->
          <div class="flex flex-wrap gap-8 justify-center items-center mt-8 text-center" data-aos="fade-up" data-aos-delay="150">
            <div>
              <div class="text-3xl font-bold text-primary">{{ toolCount }}</div>
              <div class="text-xs text-muted-foreground">Tools across {{ categoryCount }} categories</div>
            </div>
            <div class="w-px h-10 bg-foreground"></div>
            <div>
              <div class="text-3xl font-bold text-primary">60+</div>
              <div class="text-xs text-muted-foreground">Guides &amp; tutorials</div>
            </div>
            <div class="w-px h-10 bg-foreground"></div>
            <div>
              <div class="text-3xl font-bold text-primary">0</div>
              <div class="text-xs text-muted-foreground">Servers involved</div>
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
      </div>
    </section>

    <!-- Category Cards -->
    <section class="container mx-auto px-4 py-10 md:py-14" data-v-8d4ed633="">
      <div v-if="searchQuery" class="mb-6">
        <h2 class="text-lg font-bold mb-4">Search results for "{{ searchQuery }}"</h2>
        <div v-if="filteredTools.length === 0" class="text-muted-foreground text-sm p-8 border border-border rounded-xl text-center">
          No tools match "{{ searchQuery }}". Try a different term.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <RouterLink
            v-for="tool in searchResults"
            :key="tool.route"
            :to="tool.route"
            class="group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <p class="font-medium text-sm group-hover:text-primary transition-colors">{{ tool.name }}</p>
            <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ tool.description }}</p>
          </RouterLink>
        </div>
      </div>

      <div v-else>
        <h2 class="text-2xl md:text-3xl font-bold mb-2">Browse by category</h2>
        <p class="text-sm text-muted-foreground mb-8">{{ toolCount }} free tools across {{ categoryCount }} categories — all private, no sign-up</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <RouterLink
            v-for="category in tools"
            :key="category.slug"
            :to="category.route"
            class="group border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <div class="flex items-center gap-3 mb-3">
              <CategoryIcon :slug="category.slug" :size="28" />
              <div>
                <h3 class="text-lg font-bold group-hover:text-primary transition-colors">{{ category.category }}</h3>
                <p class="text-xs text-muted-foreground">{{ category.items.length }} tools</p>
              </div>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed line-clamp-2">{{ category.blurb }}</p>
          </RouterLink>
        </div>

        <!-- Popular tools -->
        <h3 class="text-lg font-bold mb-4">Popular tools</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <RouterLink
            v-for="tool in popularTools"
            :key="tool.route"
            :to="tool.route"
            class="group border border-border rounded-lg p-3 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
          >
            <p class="text-xs font-medium group-hover:text-primary transition-colors">{{ tool.name }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
    <!-- Citable SEO content -->
    <section class="container mx-auto px-4 py-10 md:py-14 border-t border-border" aria-label="About Formatho">
      <h2 class="text-2xl md:text-3xl font-bold mb-6">What is Formatho?</h2>
      <p v-for="(para, i) in homeIntro" :key="i" class="text-muted-foreground leading-relaxed mb-4 max-w-4xl">{{ para }}</p>

      <div class="mt-10 space-y-8">
        <div v-for="cat in homeCategoryDetail" :key="cat.slug">
          <h3 class="text-lg font-bold mb-2">{{ cat.title }}</h3>
          <p class="text-muted-foreground leading-relaxed max-w-4xl">{{ cat.body }}</p>
        </div>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold mt-14 mb-6">Frequently asked questions</h2>
      <div class="space-y-4 max-w-4xl">
        <div v-for="faq in homeFAQ" :key="faq.question" class="border border-border rounded-xl p-5">
          <h3 class="font-bold mb-2">{{ faq.question }}</h3>
          <p class="text-muted-foreground leading-relaxed">{{ faq.answer }}</p>
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
