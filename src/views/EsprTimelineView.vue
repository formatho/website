<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ESPR DPP Timeline — Delegated Acts Schedule | Formatho',
  description:
    'Interactive timeline of the EU Ecodesign for Sustainable Products Regulation: battery passport 2027, textile DPP, electronics, construction — every category and deadline on one page. Free.',
  keywords: ['espr timeline', 'dpp timeline', 'digital product passport deadline', 'espr delegated acts schedule', 'battery passport 2027', 'textile dpp date', 'eu regulation 2024/1781 timeline'],
  ogType: 'website'
})

type Status = 'done' | 'active' | 'upcoming' | 'planned'
interface Milestone { date: string; year: number; title: string; desc: string; status: Status; category: string }

const milestones: Milestone[] = [
  { date: '18 Jul 2024', year: 2024, title: 'ESPR enters into force', desc: 'Regulation (EU) 2024/1781 becomes law, replacing the Ecodesign Directive with a regulation covering nearly all physical goods on the EU market.', status: 'done', category: 'regulation' },
  { date: '2025', year: 2025, title: 'First working plan', desc: 'European Commission adopts the first working plan prioritising product groups for delegated acts — textiles, batteries (via separate regulation), electronics, furniture, tyres, construction.', status: 'done', category: 'regulation' },
  { date: '2025–2026', year: 2026, title: 'Delegated acts drafted', desc: 'Draft delegated acts per product group define the exact DPP data fields, data carrier requirements, and timelines. Consultations with industry and member states.', status: 'active', category: 'regulation' },
  { date: '2026–2027', year: 2027, title: 'First delegated acts adopted', desc: 'Textiles and electronics expected among the first ESPR delegated acts with DPP requirements. Standards bodies (CEN/CENELEC) publish interoperability specs.', status: 'upcoming', category: 'regulation' },
  { date: '18 Feb 2027', year: 2027, title: 'Battery passport mandatory', desc: 'Regulation (EU) 2023/1542 (separate from ESPR) requires battery passports for EV, LMT, and industrial batteries >2kWh. QR code on the battery must link to a resolver.', status: 'upcoming', category: 'battery' },
  { date: '2027', year: 2027, title: 'Textile DPP expected', desc: 'Textiles widely expected as the first ESPR category with mandatory DPP. Large retailers (H&M, Zara) already requesting supplier data ahead of regulation.', status: 'upcoming', category: 'textile' },
  { date: '2027–2028', year: 2028, title: 'Electronics DPP phased', desc: 'Consumer electronics expected to follow textiles. RoHS, WEEE, and energy label data feeding into the passport. Interoperability with existing CE marking.', status: 'planned', category: 'electronics' },
  { date: '2028–2029', year: 2029, title: 'Construction products', desc: 'Construction Products Regulation (CPR) revision aligns with ESPR. Declaration of Performance (DoP) already required; DPP-style data carrier next.', status: 'planned', category: 'construction' },
  { date: '2029–2030', year: 2030, title: 'Remaining categories', desc: 'Furniture, tyres, chemicals, and other product groups receive delegated acts on a rolling basis. Most physical goods on the EU market covered by 2030.', status: 'planned', category: 'other' }
]

const filter = ref<string>('all')
const filtered = computed(() => filter.value === 'all' ? milestones : milestones.filter(m => m.category === filter.value || m.category === 'regulation'))

const statusColors: Record<Status, string> = {
  done: 'bg-green-500',
  active: 'bg-blue-500 animate-pulse',
  upcoming: 'bg-amber-500',
  planned: 'bg-muted-foreground/30'
}
const statusLabels: Record<Status, string> = {
  done: 'In force',
  active: 'In progress',
  upcoming: 'Expected',
  planned: 'Planned'
}
const statusIcon: Record<Status, typeof CheckCircle2> = {
  done: CheckCircle2,
  active: Clock,
  upcoming: AlertCircle,
  planned: Circle
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 space-y-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Calendar class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">ESPR & DPP Timeline</h1>
        <p class="text-xs text-muted-foreground">Every delegated act, deadline, and product category on one page. Free, no signup.</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap gap-1.5">
      <button v-for="f in ['all','battery','textile','electronics','construction']" :key="f"
        class="text-xs px-3 py-1.5 rounded-full border transition-colors capitalize"
        :class="filter === f ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-border text-muted-foreground hover:border-foreground/30'"
        @click="filter = f">
        {{ f }}
      </button>
    </div>

    <!-- Timeline -->
    <div class="relative pl-6">
      <!-- vertical line -->
      <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>

      <div v-for="m in filtered" :key="m.title" class="relative mb-8">
        <!-- dot -->
        <div class="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full border-2 border-background" :class="statusColors[m.status]"></div>

        <Card>
          <CardContent class="pt-4 pb-4">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted font-semibold">{{ m.date }}</span>
              <span v-if="m.category !== 'regulation'" class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold capitalize">{{ m.category }}</span>
              <component :is="statusIcon[m.status]" class="w-3.5 h-3.5 ml-auto shrink-0"
                :class="{ 'text-green-600': m.status === 'done', 'text-blue-500': m.status === 'active', 'text-amber-500': m.status === 'upcoming', 'text-muted-foreground': m.status === 'planned' }" />
              <span class="text-[10px] text-muted-foreground">{{ statusLabels[m.status] }}</span>
            </div>
            <h2 class="text-sm font-bold mb-1">{{ m.title }}</h2>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ m.desc }}</p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- CTA -->
    <Card class="border-primary/30">
      <CardContent class="pt-5 text-xs text-muted-foreground leading-relaxed">
        <p class="mb-3"><strong class="text-foreground">Prepare now:</strong> the deadline that matters most is <strong class="text-red-600">18 February 2027</strong> for battery passports. Use the <RouterLink to="/tools/battery-passport-checklist" class="text-primary underline underline-offset-2">Battery Passport Checklist</RouterLink> (71 data points by type), prototype the full passport with the <RouterLink to="/tools/espr-passport" class="text-primary underline underline-offset-2">ESPR builder</RouterLink>, or run a gap analysis with the <RouterLink to="/tools/dpp-playground" class="text-primary underline underline-offset-2">DPP Playground</RouterLink>.</p>
        <p class="text-[10px]">Timeline based on Regulation (EU) 2024/1781 (ESPR), Regulation (EU) 2023/1542 (Batteries), and Commission working plans as of September 2026. Delegated act dates are expected dates, not legal deadlines — verify against the official EUR-Lex publication for each act.</p>
      </CardContent>
    </Card>
  </div>
</template>
