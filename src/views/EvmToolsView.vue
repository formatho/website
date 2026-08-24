<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { evmChains, evmChainTools } from '@/data/evmChains'
import { useSEO } from '@/composables/useSEO'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ArrowRight, Copy, Check, ExternalLink } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const copied = ref('')

const chain = computed(() => evmChains.find(c => c.slug === route.params.chain))
const siblings = computed(() => evmChains.filter(c => c.slug !== chain.value?.slug))

if (chain.value) {
  useSEO({
    title: `${chain.value.name} Developer Tools - Free & Private | Formatho`,
    description: `Free ${chain.value.name} developer tools: contract reader, vanity address generator, Keccak-256 hasher, ABI encoder, and unit converter. Works on ${chain.value.name} (chain ID ${chain.value.chainId}) and every EVM chain. 100% client-side.`,
    keywords: [`${chain.value.name.toLowerCase()} tools`, `${chain.value.name.toLowerCase()} developer tools`, `${chain.value.tokenSymbol.toLowerCase()} tools`, 'evm tools', `${chain.value.name.toLowerCase()} contract reader`, `${chain.value.name.toLowerCase()} rpc`],
    ogType: 'website',
    canonicalUrl: `https://formatho.com/evm-tools/${chain.value.slug}`
  })
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = ''), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8" v-if="chain">
    <Breadcrumb />

    <!-- Header -->
    <div class="mt-6 mb-8">
      <p class="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">EVM Tools</p>
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {{ chain.name }} Developer Tools
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed max-w-3xl">{{ chain.blurb }}</p>
    </div>

    <!-- Chain info card -->
    <Card class="mb-8">
      <CardHeader><CardTitle class="text-lg">Chain details</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p class="text-xs text-muted-foreground mb-1">Chain ID</p>
            <code class="text-sm font-semibold">{{ chain.chainId }}</code>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">Native token</p>
            <code class="text-sm font-semibold">{{ chain.nativeToken }} ({{ chain.tokenSymbol }})</code>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">Type</p>
            <code class="text-sm font-semibold">{{ chain.type }}</code>
          </div>
          <div>
            <p class="text-xs text-muted-foreground mb-1">Gas</p>
            <p class="text-sm font-semibold">{{ chain.gasNote }}</p>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <div class="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
            <div class="min-w-0">
              <p class="text-xs text-muted-foreground">RPC endpoint</p>
              <code class="text-xs break-all">{{ chain.rpc }}</code>
            </div>
            <button class="no-btn-hover p-2 rounded hover:bg-muted transition-colors shrink-0" aria-label="Copy RPC" @click="copy(chain.rpc, 'rpc')">
              <Check v-if="copied === 'rpc'" class="w-4 h-4 text-green-600" /><Copy v-else class="w-4 h-4" />
            </button>
          </div>
          <a :href="chain.explorer" target="_blank" rel="noopener noreferrer"
            class="flex items-center justify-between gap-3 p-3 border border-border rounded-lg hover:border-primary/40 transition-colors">
            <div>
              <p class="text-xs text-muted-foreground">Block explorer</p>
              <code class="text-xs">{{ chain.explorer }}</code>
            </div>
            <ExternalLink class="w-4 h-4 text-muted-foreground shrink-0" />
          </a>
        </div>
      </CardContent>
    </Card>

    <!-- Tools grid -->
    <h2 class="text-xl font-bold mb-4">Tools for {{ chain.name }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <RouterLink
        v-for="tool in evmChainTools"
        :key="tool.route"
        :to="tool.route"
        class="group border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <h3 class="font-semibold text-sm group-hover:text-primary transition-colors mb-1">{{ tool.name }}</h3>
        <p class="text-xs text-muted-foreground leading-relaxed">{{ tool.desc }}</p>
      </RouterLink>
    </div>

    <!-- Popular tokens -->
    <Card v-if="chain.popularTokens.length" class="mb-8">
      <CardHeader><CardTitle class="text-lg">Popular tokens on {{ chain.name }}</CardTitle></CardHeader>
      <CardContent class="space-y-2">
        <div v-for="token in chain.popularTokens" :key="token.address"
          class="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
          <div class="min-w-0">
            <p class="font-mono text-sm font-semibold">{{ token.symbol }}</p>
            <code class="text-xs text-muted-foreground break-all">{{ token.address }}</code>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs text-muted-foreground">{{ token.decimals }} dec</span>
            <button class="no-btn-hover p-1.5 rounded hover:bg-muted transition-colors" :aria-label="'Copy ' + token.symbol" @click="copy(token.address, token.symbol)">
              <Check v-if="copied === token.symbol" class="w-3.5 h-3.5 text-green-600" /><Copy v-else class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Other chains -->
    <div class="border-t border-border pt-8">
      <h2 class="text-xl font-bold mb-4">Other EVM chains</h2>
      <p class="text-sm text-muted-foreground mb-4">All tools work on every EVM chain — pick yours:</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <RouterLink
          v-for="sib in siblings"
          :key="sib.slug"
          :to="`/evm-tools/${sib.slug}`"
          class="group border border-border rounded-lg p-3 hover:border-primary/50 transition-colors text-center"
        >
          <p class="text-sm font-medium group-hover:text-primary transition-colors">{{ sib.name }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">ID {{ sib.chainId }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
