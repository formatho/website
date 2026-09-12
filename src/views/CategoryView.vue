<script setup lang="ts">
/**
 * Generic category landing page - one component serves all 6 categories.
 * Reads tools from the shared directory (tools.ts), renders an SEO-friendly
 * grid with per-category metadata, and shows sibling categories for
 * internal linking.
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tools } from '@/data/tools'
import { evmChains } from '@/data/evmChains'
import { useSEO } from '@/composables/useSEO'
import Breadcrumb from '@/components/Breadcrumb.vue'
import CategoryIcon from '@/components/CategoryIcon.vue'
import { ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const category = computed(() => {
  // Match by slug param or by extracting from the route path (SSG-safe)
  const pathSlug = route.path.split('/').pop()
  return tools.find((c) => c.slug === slug.value || c.slug === pathSlug)
})
const siblings = computed(() => tools.filter((c) => c.slug !== slug.value))

// Group tools by subcategory when present
const groupedTools = computed(() => {
  if (!category.value) return []
  const groups: Array<{ name: string; items: typeof category.value.items }> = []
  const ungrouped: typeof category.value.items = []
  
  for (const tool of category.value.items) {
    const sub = (tool as { subcategory?: string }).subcategory
    if (sub) {
      let group = groups.find(g => g.name === sub)
      if (!group) {
        group = { name: sub, items: [] }
        groups.push(group)
      }
      group.items.push(tool)
    } else {
      ungrouped.push(tool)
    }
  }
  
  if (ungrouped.length > 0) {
    groups.push({ name: 'All Tools', items: ungrouped })
  }
  
  return groups
})

const catName = computed(() => category.value?.category || 'Tools')
const catBlurb = computed(() => category.value?.blurb || '')

// SPA-side SEO mirrors the curated copy injected at build time by
// scripts/inject-specialty-meta.js — titles carry the live tool count.
const CAT_SEO: Record<string, { title: (n: number) => string; desc: string; kw: string }> = {
  'web3': {
    title: n => `Web3 & Blockchain Tools — ${n} Free EVM, ABI & Crypto Utilities | Formatho`,
    desc: 'Free web3 dev tools: EVM contract reader, vanity address generator, Keccak-256 hasher, ABI encoder, Uniswap math, multi-chain readers. No upload, client-side.',
    kw: 'web3 tools, blockchain developer tools, evm contract reader, abi encoder, keccak256 hasher, vanity address generator, free crypto tools'
  },
  'security': {
    title: n => `Security & Auth Tools — ${n} Free JWT, SAML & Hash Utilities | Formatho`,
    desc: 'JWT debugger, SAML decoder, OIDC builder, hash generators, RSA keys, encryption, TOTP, password strength. Free, private, all client-side.',
    kw: 'security tools, jwt debugger, saml decoder, oidc builder, hash generator, encryption online, totp generator, password strength checker'
  },
  'data-formats': {
    title: n => `JSON, YAML, XML & CSV Tools — ${n} Free Format Converters | Formatho`,
    desc: 'Validate, format, convert and diff JSON, YAML, XML, TOML, CSV. UUID, ULID, Base64, IBAN validators plus ISO 20022 tools. Free and private.',
    kw: 'json formatter, yaml validator, xml converter, csv tools, toml converter, uuid generator, base64 encoder, iso 20022 validator'
  },
  'developer': {
    title: n => `Developer Tools — ${n} Free SQL, Git, Regex & SQLite Utilities | Formatho`,
    desc: 'SQL formatter, SQLite browser, Git cheat sheet, regex tester, Docker converter, Mermaid viewer, diff checker. Free, private, in your browser.',
    kw: 'developer tools, sql formatter, sqlite browser, git cheat sheet, regex tester, docker compose converter, mermaid viewer, diff checker'
  },
  'converters': {
    title: n => `Converters & Calculators — ${n} Free Timestamp, Base & Color Tools | Formatho`,
    desc: 'Unix timestamp, date-time, number base, color, case, temperature converters. Math, ETA, percentage calculators. Free, instant, client-side.',
    kw: 'unit converter, timestamp converter, number base converter, color converter, case converter, percentage calculator, free online converters'
  },
  'network': {
    title: n => `Network & Web Tools — ${n} Free Subnet, URL & HTTP Utilities | Formatho`,
    desc: 'IPv4 subnet calculator, MAC lookup, IPv6 ULA generator, URL encoder/parser, HTTP status codes, QR generator. Free, private, client-side.',
    kw: 'subnet calculator, ipv4 subnetting, mac address lookup, url encoder, http status codes, qr code generator, network tools online'
  }
}

const seo = computed(() => {
  const curated = CAT_SEO[slug.value]
  const n = category.value?.items.length ?? 0
  if (curated) return { title: curated.title(n), desc: curated.desc, kw: curated.kw }
  return {
    title: `${catName.value} - Free Online Tools | Formatho`,
    desc: `${catBlurb.value} All tools are free, private, and run entirely in your browser.`,
    kw: `${catName.value.toLowerCase()}, free online tools, developer tools, privacy first`
  }
})

// Getters keep the config fresh: the router reuses this component across
// categories and useSEO re-reads config on every route change.
useSEO({
  get title() { return seo.value.title },
  get description() { return seo.value.desc },
  get keywords() { return seo.value.kw.split(', ') },
  ogType: 'website',
  get canonicalUrl() { return `https://formatho.com/category/${slug.value}` }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <Breadcrumb />
      <div class="flex items-center gap-3 mt-4">
        <CategoryIcon :slug="category?.slug || ''" :size="36" />
        <div>
          <h1 class="text-3xl md:text-4xl font-bold">{{ catName }}</h1>
          <p class="text-sm text-muted-foreground mt-1">{{ category?.items.length }} tools — free, private, runs in your browser</p>
        </div>
      </div>
      <p class="text-base text-muted-foreground leading-relaxed mt-4 max-w-3xl">{{ catBlurb }}</p>
    </div>

    <!-- Tools grid (grouped by subcategory when available) -->
    <div v-if="category">
      <div v-for="group in groupedTools" :key="group.name" class="mb-10">
        <h2 v-if="groupedTools.length > 1" class="text-xl font-bold mb-4 text-muted-foreground">{{ group.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RouterLink
            v-for="tool in group.items"
            :key="tool.route"
            :to="tool.route"
            class="group border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">{{ tool.name }}</h3>
                <p class="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{{ tool.description }}</p>
              </div>
              <ArrowRight class="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- EVM chain quick links (only on web3 category) -->
    <div v-if="category?.slug === 'web3'" class="mb-12">
      <h2 class="text-xl font-bold mb-4">Browse by chain</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <RouterLink
          v-for="chain in evmChains"
          :key="chain.slug"
          :to="`/evm-tools/${chain.slug}`"
          class="group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
        >
          <p class="text-sm font-medium group-hover:text-primary transition-colors">{{ chain.name }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ chain.tokenSymbol }} · ID {{ chain.chainId }}</p>
        </RouterLink>
      </div>
    </div>

    <!-- Sibling categories (internal links) -->
    <div class="border-t border-border pt-8">
      <h2 class="text-xl font-bold mb-4">Browse other categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <RouterLink
          v-for="sib in siblings"
          :key="sib.slug"
          :to="sib.route"
          class="group border border-border rounded-lg p-4 hover:border-primary/50 transition-colors text-center"
        >
          <CategoryIcon :slug="sib.slug" :size="20" />
          <p class="text-sm font-medium group-hover:text-primary transition-colors">{{ sib.category }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ sib.items.length }} tools</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
