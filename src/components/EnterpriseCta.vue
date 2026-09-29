<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Building2 } from 'lucide-vue-next'

/**
 * A/B variant (backlog #2 iterate path, docs/CTA_AB_PLAN.md):
 * flag `formatho_cta_ab` OFF by default — goes live only if the Oct-5
 * gate decision is "iterate". QA override: localStorage formatho_cta_ab=a|b.
 * Variant rides on the mailto links via data-variant so the existing
 * enterprise_cta_click event can split A/B with zero new events.
 */
const variant = ref<'a' | 'b'>('a')
const abEnabled = ref(false)
onMounted(() => {
  try {
    const flag = localStorage.getItem('formatho_cta_ab')
    if (flag === 'a' || flag === 'b') {
      abEnabled.value = true
      variant.value = flag
    } else if (flag === 'on' || import.meta.env.VITE_CTA_AB === 'on') {
      abEnabled.value = true
      // Stable 50/50 by visitor hash (house-ads flag pattern)
      const seed = localStorage.getItem('formatho_cta_ab_seed')
      let s = seed
      if (!s) {
        s = Math.random().toString(36).slice(2, 10)
        localStorage.setItem('formatho_cta_ab_seed', s)
      }
      variant.value =
        [...s].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 997, 7) % 2 === 0 ? 'a' : 'b'
    }
  } catch {
    /* control */
  }
})
const copyB = computed(() => abEnabled.value && variant.value === 'b')
const variantAttr = computed(() => (abEnabled.value ? variant.value : undefined))
</script>

<template>
  <div
    class="mt-10 rounded-lg border border-border bg-muted/40 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
    :data-cta-variant="variantAttr"
  >
    <div class="flex items-start gap-3 flex-1">
      <Building2 class="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
      <div>
        <p v-if="!copyB" class="font-medium text-foreground">Need this on-premise or behind your firewall?</p>
        <p v-else class="font-medium text-foreground">Need this offline? Air-gap your SAML stack.</p>
        <p v-if="!copyB" class="text-sm text-muted-foreground mt-0.5">
          We ship a self-hosted enterprise edition of our identity tools (SAML, OIDC, JWT) —
          air-gapped, auditable, no data leaves your network.
          <a
            href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
            class="underline underline-offset-2 hover:text-foreground"
            >Contact us</a
          >
          for details.
        </p>
        <p v-else class="text-sm text-muted-foreground mt-0.5">
          We ship an air-gapped, self-hosted edition of our identity tools — auditable,
          no data leaves your network.
          <a
            href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
            class="underline underline-offset-2 hover:text-foreground"
            >Talk to us</a
          >
          about it.
        </p>
      </div>
    </div>
    <a
      v-if="!copyB"
      href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
      class="shrink-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Get the on-prem version
    </a>
    <a
      v-else
      href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
      class="shrink-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Talk to us
    </a>
  </div>
</template>
