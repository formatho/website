<script setup lang="ts">
/**
 * HouseAd — Backlog #4 phase-1 slot (CRO, revenue agent).
 * Zero third-party: rotates our own offers (paid API tier) through the
 * below-output slot defined in workspace-revenue/docs/ADS_PLAN.md.
 *
 * Feature-flagged OFF by default; gates = #3 traffic data + owner GO.
 * Enable per-session for QA: localStorage.setItem('formatho_house_ads','on')
 *
 * Never place on identity (SAML/OIDC/JWT) pages — those feed B2B path (#2).
 */
import { computed, onMounted, ref } from 'vue'
import { Zap } from 'lucide-vue-next'
import { trackHouseAd } from '@/utils/conversionTracking'

const props = defineProps<{ slot?: string }>()
const slotId = computed(() => props.slot ?? 'below_output')

const enabled = ref(false)
onMounted(() => {
  try {
    enabled.value = localStorage.getItem('formatho_house_ads') === 'on'
  } catch {
    enabled.value = false
  }
  if (enabled.value) trackHouseAd('house_ad_view', slotId.value)
})

function onClick() {
  trackHouseAd('house_ad_click', slotId.value)
}
</script>

<template>
  <div
    v-if="enabled"
    class="mt-10 rounded-lg border border-border bg-muted/40 px-5 py-4 flex items-start gap-3"
    :data-house-ad-slot="slotId"
  >
    <Zap class="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
    <p class="text-sm text-muted-foreground">
      <span class="font-medium text-foreground">Building on this tool?</span>
      Formatho's API tier gives you the same conversions with rate-limited free
      keys and a paid plan for production volume —
      <a
        href="https://formatho.com/runtime"
        class="underline underline-offset-2 hover:text-foreground"
        @click="onClick"
        >see the API tier</a
      >.
    </p>
  </div>
</template>
