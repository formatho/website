<script setup lang="ts">
/**
 * Prominent authorized-use reminder on dual-use pages (security, crypto,
 * blockchain tooling). Shows on tool routes whose category is Security &
 * Auth or Web3 & Blockchain, plus the EVM chain pages and security persona
 * hubs. Links the Acceptable Use Policy, which prohibits using these tools
 * against systems or assets without authorization.
 */
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ShieldAlert } from 'lucide-vue-next'
import { tools } from '@/data/tools'

const route = useRoute()

const dualUseRoutes = new Set<string>()
for (const category of tools) {
  if (category.category === 'Security & Auth' || category.category === 'Web3 & Blockchain') {
    for (const tool of category.items) dualUseRoutes.add(tool.route)
  }
}

const isDualUse = computed(() => {
  const path = route.path
  if (dualUseRoutes.has(path)) return true
  if (/^\/evm-tools\/[^/]+$/.test(path)) return true
  if (/^\/dev-tools\/(owasp|okta|ping-federate)$/.test(path)) return true
  return false
})
</script>

<template>
  <div
    v-if="isDualUse"
    class="mx-auto w-full max-w-7xl px-4 pt-3"
  >
    <RouterLink
      to="/acceptable-use"
      class="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 hover:border-amber-400 transition-colors dark:bg-amber-950/20 dark:border-amber-900/30"
    >
      <ShieldAlert class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p class="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
        <strong>Authorized use only.</strong> Use this tool solely on systems, tokens, and assets you
        own or are explicitly permitted to test — credential extraction, signature forging, and
        unauthorized access are prohibited by our
        <span class="underline underline-offset-2">Acceptable Use Policy</span>.
      </p>
    </RouterLink>
  </div>
</template>
