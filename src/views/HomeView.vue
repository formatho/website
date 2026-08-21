<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

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

    <!-- Tools Grid -->
    <section class="container mx-auto px-4 py-10 md:py-14" data-v-8d4ed633="">
      <div class="space-y-12" data-v-8d4ed633="">
        <!-- Categories with tools -->
        <div
          v-for="(category) in filteredTools"
          :key="category.category"
          class="space-y-6"
          data-v-8d4ed633=""
        >
          <div class="flex items-center gap-4 border-b-2 border-foreground pb-2" data-v-8d4ed633="">
            <h2
              class="text-2xl md:text-3xl font-black tracking-tight uppercase"
              data-v-8d4ed633=""
            >
              {{ category.category }}
            </h2>
            <div class="flex-1" data-v-8d4ed633=""></div>
            <span class="text-xs font-mono tracking-widest text-muted-foreground" data-v-8d4ed633="">
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
                    <div
                      class="p-3 border border-foreground/20 w-fit"
                      data-v-8d4ed633=""
                    >
                      <component
                        :is="iconMap[tool.iconName as keyof typeof iconMap] || Wrench"
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
