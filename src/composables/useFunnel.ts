// Funnel context: any tool opened with ?funnel=<slug>&step=<n> becomes
// funnel-aware — the global FunnelBar (in AppLayout) shows where the user is
// and where to go next. No per-tool wiring required.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { funnels } from '@/data/funnels'

export function useFunnel() {
  const route = useRoute()

  const slug = computed(() => String(route.query.funnel || ''))
  const stepNum = computed(() => {
    const n = Number(route.query.step)
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 0
  })

  const funnel = computed(() => funnels.find((f) => f.slug === slug.value) || null)
  const active = computed(() => !!funnel.value && stepNum.value >= 1 && stepNum.value <= funnel.value.steps.length)
  const step = computed(() => (active.value ? funnel.value!.steps[stepNum.value - 1] : null))
  const total = computed(() => funnel.value?.steps.length || 0)
  const isLast = computed(() => active.value && stepNum.value === total.value)
  const nextStep = computed(() => (active.value && !isLast.value ? funnel.value!.steps[stepNum.value] : null))

  const withCtx = (path: string, step: number) => `${path}?funnel=${slug.value}&step=${step}`
  const nextUrl = computed(() =>
    nextStep.value ? withCtx(nextStep.value.toolRoute, stepNum.value + 1) : `/funnels/${slug.value}`
  )
  const prevUrl = computed(() =>
    stepNum.value > 1 ? withCtx(funnel.value!.steps[stepNum.value - 2].toolRoute, stepNum.value - 1) : `/funnels/${slug.value}`
  )

  return { slug, stepNum, funnel, active, step, total, isLast, nextStep, nextUrl, prevUrl, withCtx }
}
