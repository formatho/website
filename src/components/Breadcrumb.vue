<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface BreadcrumbItem {
  label: string
  path: string
  isLast: boolean
}

const route = useRoute()
let structuredDataScript: HTMLScriptElement | null = null

// Pretty-name mapping for known segments
const segmentLabels: Record<string, string> = {
  tools: 'Tools',
  blogs: 'Blog',
  about: 'About',
  docs: 'Docs',
  api: 'API',
  beta: 'Beta',
  compare: 'Compare',
  converters: 'Converters',
  encoders: 'Encoders',
  decoders: 'Decoders',
  generators: 'Generators',
  formatters: 'Formatters',
  validators: 'Validators',
  hash: 'Hash & Crypto',
  network: 'Network',
  security: 'Security',
  images: 'Images',
  web3: 'Web3',
  text: 'Text',
  blockchain: 'Blockchain',
  colors: 'Colors'
}

function labelForSegment(segment: string, indexPath: string): string {
  // Check known labels first
  if (segmentLabels[segment.toLowerCase()]) return segmentLabels[segment.toLowerCase()]
  // For tool slugs, use route meta title or pretty-case the slug
  const metaTitle = route.meta?.title as string | undefined
  if (metaTitle) {
    const cleaned = metaTitle.replace(/\s*[-|–—]\s*(Formatho|Agent Orchestrator|Formatho).*$/i, '').trim()
    if (cleaned && cleaned.length < 60) return cleaned
  }
  // Pretty-case: base64-encoder → Base64 Encoder
  return segment
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  if (path === '/') return []

  const segments = path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []

  // Home
  items.push({ label: 'HOME', path: '/', isLast: false })

  // Build intermediate paths
  let accumulated = ''
  segments.forEach((seg, i) => {
    accumulated += `/${seg}`
    const isLast = i === segments.length - 1
    const label = isLast ? labelForSegment(seg, accumulated) : (segmentLabels[seg.toLowerCase()] || labelForSegment(seg, accumulated))
    items.push({
      label: isLast ? label.toUpperCase() : label.toUpperCase(),
      path: accumulated,
      isLast
    })
  })

  return items
})

// Structured data for SEO
function injectStructuredData() {
  if (typeof document === 'undefined') return
  removeStructuredData()
  if (breadcrumbs.value.length === 0) return

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://formatho.com${item.path}`
    }))
  }

  structuredDataScript = document.createElement('script')
  structuredDataScript.type = 'application/ld+json'
  structuredDataScript.setAttribute('data-breadcrumb', 'true')
  structuredDataScript.textContent = JSON.stringify(structuredData)
  document.head.appendChild(structuredDataScript)
}

function removeStructuredData() {
  if (structuredDataScript?.parentNode) {
    structuredDataScript.parentNode.removeChild(structuredDataScript)
    structuredDataScript = null
  }
}

onMounted(injectStructuredData)
watch(() => route.path, injectStructuredData)
onUnmounted(removeStructuredData)
</script>

<template>
  <nav
    v-if="breadcrumbs.length > 0"
    aria-label="Breadcrumb navigation"
    class="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100"
  >
    <ol class="flex items-center justify-start gap-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
        class="flex items-center"
      >
        <!-- Separator (slash before every item except HOME) -->
        <span
          v-if="index > 0"
          class="text-[11px] tracking-widest text-gray-300 mx-2 select-none font-bold"
          aria-hidden="true"
        >/</span>

        <!-- Breadcrumb link or current page -->
        <RouterLink
          v-if="!item.isLast"
          :to="item.path"
          class="text-[11px] uppercase tracking-[0.15em] text-gray-500 hover:text-black hover:underline underline-offset-2 transition-colors duration-150 whitespace-nowrap"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="text-[11px] uppercase tracking-[0.15em] text-black font-bold whitespace-nowrap"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
