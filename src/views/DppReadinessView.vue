<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClipboardCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DPP Readiness Score — Is Your Export Product Ready? | Formatho',
  description:
    'Answer a few questions about your product, documents and data practices and get a 0-100 EU Digital Product Passport readiness score with a prioritized action list. 100% client-side.',
  keywords: ['dpp readiness', 'digital product passport score', 'dpp readiness check', 'eu dpp compliance', 'textile dpp readiness', 'export eu checklist'],
  ogType: 'website'
})

interface Q { id: string; label: string; weight: number; group: string; hint?: string }

const QUESTIONS: Q[] = [
  { id: 'gtin', label: 'Your product has a GTIN (or another GS1 identifier)', weight: 10, group: 'Identification', hint: 'Every retailer and the DPP data carrier key off a GS1 identifier' },
  { id: 'uid_type', label: 'You can assign a unique ID per batch/serial if required', weight: 5, group: 'Identification' },
  { id: 'composition', label: 'You have a tested material/fibre composition breakdown', weight: 10, group: 'Materials' },
  { id: 'origin', label: 'Country of origin is documented (CoO available)', weight: 8, group: 'Materials' },
  { id: 'recycled', label: 'Recycled/organic content is certified (GRS, GOTS, RCS…)', weight: 5, group: 'Materials' },
  { id: 'chemicals', label: 'REACH/RSL test reports exist for the product', weight: 10, group: 'Chemicals' },
  { id: 'carbon', label: 'You have (or can get) a carbon footprint / LCA figure', weight: 8, group: 'Sustainability', hint: 'PCF is required for batteries, fast becoming standard elsewhere' },
  { id: 'energy', label: 'Energy/efficiency data is available (if applicable)', weight: 4, group: 'Sustainability' },
  { id: 'suppliers', label: 'You can name your Tier-1 (and key Tier-2) suppliers', weight: 10, group: 'Supply chain' },
  { id: 'due_diligence', label: 'A supply-chain due diligence policy exists', weight: 6, group: 'Supply chain' },
  { id: 'repair', label: 'Repair/care/end-of-life instructions exist for the product', weight: 8, group: 'Circularity' },
  { id: 'eos', label: 'End-of-life / recycling guidance is documented', weight: 5, group: 'Circularity' },
  { id: 'conformity', label: 'Declaration of Conformity / CE (where applicable) is in place', weight: 6, group: 'Conformity' },
  { id: 'digital', label: 'Product data is stored digitally (not just paper/PDF in email)', weight: 5, group: 'Infrastructure', hint: 'The passport is a structured dataset — scattered PDFs slow you down' },
]

const INDUSTRY_DEADLINES: Record<string, { name: string; deadline: string }> = {
  textile: { name: 'Textile & Apparel', deadline: 'Delegated act expected ~2027 under ESPR — retailers already ask for the data' },
  battery: { name: 'Batteries', deadline: 'Battery passport mandatory 18 Feb 2027 (LMT, EV, >2kWh industrial)' },
  electronics: { name: 'Electronics', deadline: 'ESPR working plan 2025-2030 — RoHS/WEEE data needed now' },
  construction: { name: 'Construction', deadline: 'DoP already required; CPR 2024/3110 digital formats next' },
  other: { name: 'Other', deadline: 'Your category will get a delegated act — start with the data basics' },
}

const industry = ref('')
const answers = ref<Record<string, boolean>>({})
const shown = ref(false)

const score = computed(() => {
  const total = QUESTIONS.reduce((s, q) => s + q.weight, 0)
  const got = QUESTIONS.reduce((s, q) => s + (answers.value[q.id] ? q.weight : 0), 0)
  return Math.round((got / total) * 100)
})

const grade = computed(() => {
  const s = score.value
  if (s >= 85) return { label: 'Passport-ready', color: 'text-green-600', bar: 'bg-green-600' }
  if (s >= 60) return { label: 'On the way', color: 'text-amber-600', bar: 'bg-amber-600' }
  if (s >= 35) return { label: 'Early stage', color: 'text-orange-600', bar: 'bg-orange-600' }
  return { label: 'Start from identification', color: 'text-red-600', bar: 'bg-red-600' }
})

const priorities = computed(() => QUESTIONS.filter((q) => !answers.value[q.id]).sort((a, b) => b.weight - a.weight))
const grouped = computed(() => {
  const map = new Map<string, Q[]>()
  for (const q of QUESTIONS) {
    if (!map.has(q.group)) map.set(q.group, [])
    map.get(q.group)!.push(q)
  }
  return [...map.entries()]
})
const deadline = computed(() => INDUSTRY_DEADLINES[industry.value] || null)

function toggle(id: string) {
  answers.value = { ...answers.value, [id]: !answers.value[id] }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <ClipboardCheck class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">DPP Readiness Score</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        How ready is your export product for the EU Digital Product Passport? Tick what is already true today —
        your answers never leave the browser — and get a score with a prioritized action list.
      </p>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Your industry</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <button
            v-for="(v, k) in INDUSTRY_DEADLINES"
            :key="k"
            @click="industry = k"
            class="p-3 rounded-xl border text-sm font-medium transition-colors hover:bg-muted"
            :class="industry === k ? 'border-primary bg-primary/5' : ''"
          >{{ v.name }}</button>
        </div>
        <p v-if="deadline" class="text-xs text-muted-foreground mt-3">{{ deadline.deadline }}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-lg">Check what already applies</CardTitle></CardHeader>
      <CardContent class="space-y-1">
        <div v-for="[group, qs] in grouped" :key="group">
          <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4 mb-1">{{ group }}</div>
          <button
            v-for="q in qs"
            :key="q.id"
            @click="toggle(q.id)"
            class="w-full flex items-start gap-2 p-3 rounded-lg border mb-1 text-left text-sm transition-colors hover:bg-muted"
            :class="answers[q.id] ? 'border-primary bg-primary/5' : ''"
          >
            <CheckCircle2 class="w-4 h-4 mt-0.5 shrink-0" :class="answers[q.id] ? 'text-green-600' : 'text-muted-foreground'" />
            <span>
              <span :class="answers[q.id] ? 'line-through decoration-foreground/40' : 'font-medium'">{{ q.label }}</span>
              <span v-if="q.hint" class="block text-xs text-muted-foreground mt-0.5">{{ q.hint }}</span>
            </span>
          </button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <div v-if="!shown" class="text-center">
          <Button size="lg" @click="shown = true">Calculate readiness score <ArrowRight class="w-4 h-4 ml-2" /></Button>
        </div>
        <template v-else>
          <div class="flex items-center gap-6">
            <div class="text-5xl font-bold" :class="grade.color">{{ score }}<span class="text-xl text-muted-foreground">/100</span></div>
            <div class="flex-1">
              <div class="font-semibold" :class="grade.color">{{ grade.label }}</div>
              <div class="h-3 rounded-full bg-muted overflow-hidden mt-2">
                <div class="h-full rounded-full transition-all" :class="grade.bar" :style="{ width: score + '%' }"></div>
              </div>
            </div>
          </div>
          <div v-if="priorities.length" class="pt-4 border-t">
            <div class="text-sm font-semibold mb-2 flex items-center gap-2"><AlertTriangle class="w-4 h-4 text-amber-600" /> Do these first (highest impact)</div>
            <ul class="space-y-1 text-sm">
              <li v-for="q in priorities.slice(0, 5)" :key="q.id" class="flex items-start gap-2">
                <span class="font-mono text-xs mt-0.5 text-muted-foreground shrink-0">+{{ q.weight }}</span>
                <span>{{ q.label }} <span class="text-muted-foreground">({{ q.group }})</span></span>
              </li>
            </ul>
            <p v-if="priorities.length > 5" class="text-xs text-muted-foreground mt-2">+{{ priorities.length - 5 }} more — full checklist on the DPP Playground.</p>
          </div>
          <p v-else class="text-sm text-green-700 font-medium pt-4 border-t">
            Everything checked — you have the raw material for a complete passport. Next step is structuring it (try the DPP Playground to generate the draft).
          </p>
          <div class="text-xs text-muted-foreground pt-2 border-t flex items-center justify-between flex-wrap gap-2">
            <span>Want this turned into a full draft passport with gap analysis? Use the <a class="underline" href="/tools/dpp-playground">DPP Playground</a>.</span>
            <Button variant="outline" size="sm" @click="shown = false">Recalculate</Button>
          </div>
        </template>
      </CardContent>
    </Card>
  </div>
</template>
