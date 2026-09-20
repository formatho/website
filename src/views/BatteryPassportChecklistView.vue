<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Battery, CheckCircle2, Circle, Download, AlertCircle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'EU Battery Passport Checklist — 71 Data Points | Formatho',
  description:
    'Interactive checklist for the EU Battery Passport (Regulation 2023/1542 Annex XIII): all mandatory data points by battery type — EV (46), LMT (49), industrial >2kWh (32). Track readiness before 18 Feb 2027.',
  keywords: ['battery passport checklist', 'eu battery regulation 2023/1542', 'annex xiii data points', 'ev battery passport', 'battery dpp requirements', 'battery passport 2027', 'lmt battery', 'industrial battery passport'],
  ogType: 'website'
})

type BatteryType = 'ev' | 'lmt' | 'industrial'

const batteryType = ref<BatteryType>('ev')

interface DataPoint { id: string; field: string; desc: string; mandatory: boolean; category: string }
const checked = ref<Set<string>>(new Set())

const categories: Record<string, string> = {
  identity: 'General & Identification',
  chemistry: 'Chemistry & Composition',
  carbon: 'Carbon Footprint',
  circularity: 'Recycled Content & Circularity',
  performance: 'Performance & Durability',
  safety: 'Safety Measures',
  supply: 'Supply Chain & Due Diligence',
  eol: 'End of Life & Recycling',
  soh: 'State of Health & Diagnostics'
}

const dataPoints: Record<BatteryType, DataPoint[]> = {
  ev: [
    // identity
    { id: 'ev-01', field: 'Manufacturer name', desc: 'Legal name of the battery manufacturer', mandatory: true, category: 'identity' },
    { id: 'ev-02', field: 'Manufacturer address', desc: 'Registered place of business', mandatory: true, category: 'identity' },
    { id: 'ev-03', field: 'Battery category', desc: 'EV (electric vehicle)', mandatory: true, category: 'identity' },
    { id: 'ev-04', field: 'Battery model/identifier', desc: 'Commercial model designation', mandatory: true, category: 'identity' },
    { id: 'ev-05', field: 'Serial number', desc: 'Unique serial for traceability', mandatory: true, category: 'identity' },
    { id: 'ev-06', field: 'Manufacturing date', desc: 'Date of manufacture (YYYY-MM-DD)', mandatory: true, category: 'identity' },
    { id: 'ev-07', field: 'Manufacturing place', desc: 'Geographic location of manufacturing site', mandatory: true, category: 'identity' },
    { id: 'ev-08', field: 'Weight', desc: 'Total battery weight in kg', mandatory: true, category: 'identity' },
    // chemistry
    { id: 'ev-09', field: 'Battery chemistry', desc: 'Cell chemistry (e.g., NMC, LFP, NCA)', mandatory: true, category: 'chemistry' },
    { id: 'ev-10', field: 'Hazardous substances', desc: 'List of hazardous substances above thresholds', mandatory: true, category: 'chemistry' },
    { id: 'ev-11', field: 'Critical raw materials', desc: 'CRM content (lithium, cobalt, nickel, natural graphite)', mandatory: true, category: 'chemistry' },
    { id: 'ev-12', field: 'Recycled content share', desc: 'Percentage of recycled content per material (Co, Li, Ni, Pb)', mandatory: true, category: 'circularity' },
    // carbon
    { id: 'ev-13', field: 'Carbon footprint', desc: 'Total carbon footprint in kg CO2e/kWh (declared per EU methodology)', mandatory: true, category: 'carbon' },
    { id: 'ev-14', field: 'Carbon footprint class', desc: 'Performance class label', mandatory: true, category: 'carbon' },
    { id: 'ev-15', field: 'Carbon footprint methodology', desc: 'Reference to the applied calculation method', mandatory: true, category: 'carbon' },
    // performance
    { id: 'ev-16', field: 'Rated capacity', desc: 'Nominal capacity in Ah', mandatory: true, category: 'performance' },
    { id: 'ev-17', field: 'Rated voltage', desc: 'Nominal voltage in V', mandatory: true, category: 'performance' },
    { id: 'ev-18', field: 'Energy efficiency', desc: 'Round-trip energy efficiency at reference conditions', mandatory: true, category: 'performance' },
    { id: 'ev-19', field: 'Power capability', desc: 'Peak and continuous power (kW)', mandatory: true, category: 'performance' },
    { id: 'ev-20', field: 'Expected lifetime', desc: 'Expected service life (cycles and/or calendar years)', mandatory: true, category: 'performance' },
    { id: 'ev-21', field: 'Cycle life', desc: 'Number of complete charge-discharge cycles to 80% SoH', mandatory: true, category: 'performance' },
    { id: 'ev-22', field: 'Temperature range', desc: 'Operating and charging temperature ranges', mandatory: true, category: 'performance' },
    { id: 'ev-23', field: 'Self-discharge rate', desc: 'Rate of charge loss in storage', mandatory: true, category: 'performance' },
    // safety
    { id: 'ev-24', field: 'Safety test report reference', desc: 'Reference to applicable safety test reports', mandatory: true, category: 'safety' },
    { id: 'ev-25', field: 'Thermal propagation test', desc: 'Result of thermal propagation safety test', mandatory: true, category: 'safety' },
    { id: 'ev-26', field: 'UN 38.3 test summary', desc: 'Transport safety test summary', mandatory: true, category: 'safety' },
    // supply chain
    { id: 'ev-27', field: 'Due diligence policy', desc: 'Reference to supply chain due diligence policy', mandatory: true, category: 'supply' },
    { id: 'ev-28', field: 'Origin of critical materials', desc: 'Country of origin for lithium, cobalt, nickel, natural graphite', mandatory: true, category: 'supply' },
    { id: 'ev-29', field: 'Sub-supplier list', desc: 'List of processing facilities for CRMs', mandatory: true, category: 'supply' },
    { id: 'ev-30', field: 'Recycled source verification', desc: 'Verification of recycled content sources', mandatory: true, category: 'supply' },
    // SoH / diagnostics
    { id: 'ev-31', field: 'SoH access protocol', desc: 'How to read State of Health via OBD or BLE', mandatory: true, category: 'soh' },
    { id: 'ev-32', field: 'Remaining capacity indicator', desc: 'Current SoC/SoH reading method', mandatory: true, category: 'soh' },
    { id: 'ev-33', field: 'Expected evolution of SoH', desc: 'Degradation model reference', mandatory: true, category: 'soh' },
    { id: 'ev-34', field: 'Battery management system info', desc: 'BMS firmware version and data access', mandatory: true, category: 'soh' },
    // eol
    { id: 'ev-35', field: 'Dismantling information', desc: 'Safe removal and dismantling instructions', mandatory: true, category: 'eol' },
    { id: 'ev-36', field: 'Recycling process reference', desc: 'Recommended recycling route', mandatory: true, category: 'eol' },
    { id: 'ev-37', field: 'Material recovery rates', desc: 'Expected recovery rates for Co, Li, Ni', mandatory: true, category: 'eol' },
    { id: 'ev-38', field: 'Second-life suitability', desc: 'Suitability for repurposing/second-life applications', mandatory: true, category: 'eol' },
    { id: 'ev-39', field: 'Waste management instructions', desc: 'Proper disposal channels', mandatory: true, category: 'eol' },
    // dynamic
    { id: 'ev-40', field: 'Current State of Health', desc: 'Live SoH reading (dynamic — updated via BMS)', mandatory: true, category: 'soh' },
    { id: 'ev-41', field: 'Operating environment history', desc: 'Exposure to extreme conditions (dynamic)', mandatory: true, category: 'soh' },
    { id: 'ev-42', field: 'Usage history', desc: 'Charge/discharge patterns summary (dynamic)', mandatory: true, category: 'soh' },
    { id: 'ev-43', field: 'Warranty status', desc: 'Warranty terms and current status', mandatory: true, category: 'identity' },
    { id: 'ev-44', field: 'EU Declaration of Conformity', desc: 'Reference to DoC document', mandatory: true, category: 'identity' },
    { id: 'ev-45', field: 'CE marking', desc: 'Conformity marking present', mandatory: true, category: 'identity' },
    { id: 'ev-46', field: 'QR/ Data Carrier', desc: 'Machine-readable link to this passport', mandatory: true, category: 'identity' }
  ],
  lmt: [
    { id: 'lmt-01', field: 'Manufacturer name', desc: 'Legal name of the battery manufacturer', mandatory: true, category: 'identity' },
    { id: 'lmt-02', field: 'Manufacturer address', desc: 'Registered place of business', mandatory: true, category: 'identity' },
    { id: 'lmt-03', field: 'Battery category', desc: 'LMT (light means of transport)', mandatory: true, category: 'identity' },
    { id: 'lmt-04', field: 'Battery model', desc: 'Commercial model designation', mandatory: true, category: 'identity' },
    { id: 'lmt-05', field: 'Serial number', desc: 'Unique serial number', mandatory: true, category: 'identity' },
    { id: 'lmt-06', field: 'Manufacturing date', desc: 'Date of manufacture', mandatory: true, category: 'identity' },
    { id: 'lmt-07', field: 'Manufacturing place', desc: 'Geographic location', mandatory: true, category: 'identity' },
    { id: 'lmt-08', field: 'Weight', desc: 'Battery weight in kg', mandatory: true, category: 'identity' },
    { id: 'lmt-09', field: 'Battery chemistry', desc: 'Cell chemistry type', mandatory: true, category: 'chemistry' },
    { id: 'lmt-10', field: 'Hazardous substances', desc: 'Substances above threshold limits', mandatory: true, category: 'chemistry' },
    { id: 'lmt-11', field: 'Critical raw materials', desc: 'CRM content list', mandatory: true, category: 'chemistry' },
    { id: 'lmt-12', field: 'Recycled content', desc: 'Recycled content share per material', mandatory: true, category: 'circularity' },
    { id: 'lmt-13', field: 'Carbon footprint', desc: 'kg CO2e/kWh per EU methodology', mandatory: true, category: 'carbon' },
    { id: 'lmt-14', field: 'Carbon footprint class', desc: 'Performance class', mandatory: true, category: 'carbon' },
    { id: 'lmt-15', field: 'Rated capacity', desc: 'Ah', mandatory: true, category: 'performance' },
    { id: 'lmt-16', field: 'Rated voltage', desc: 'V', mandatory: true, category: 'performance' },
    { id: 'lmt-17', field: 'Energy efficiency', desc: 'Round-trip efficiency', mandatory: true, category: 'performance' },
    { id: 'lmt-18', field: 'Expected lifetime', desc: 'Cycles and/or calendar years', mandatory: true, category: 'performance' },
    { id: 'lmt-19', field: 'Temperature range', desc: 'Operating range', mandatory: true, category: 'performance' },
    { id: 'lmt-20', field: 'Safety test references', desc: 'Applicable safety reports', mandatory: true, category: 'safety' },
    { id: 'lmt-21', field: 'UN 38.3 summary', desc: 'Transport safety', mandatory: true, category: 'safety' },
    { id: 'lmt-22', field: 'Due diligence policy', desc: 'Supply chain policy reference', mandatory: true, category: 'supply' },
    { id: 'lmt-23', field: 'Material origin', desc: 'Country of origin for CRMs', mandatory: true, category: 'supply' },
    { id: 'lmt-24', field: 'SoH access protocol', desc: 'How to read SoH', mandatory: true, category: 'soh' },
    { id: 'lmt-25', field: 'Current SoH', desc: 'Live reading (dynamic)', mandatory: true, category: 'soh' },
    { id: 'lmt-26', field: 'Dismantling information', desc: 'Safe removal instructions', mandatory: true, category: 'eol' },
    { id: 'lmt-27', field: 'Recycling process', desc: 'Recommended route', mandatory: true, category: 'eol' },
    { id: 'lmt-28', field: 'Second-life suitability', desc: 'Repurposing potential', mandatory: true, category: 'eol' },
    { id: 'lmt-29', field: 'Warranty status', desc: 'Terms and current status', mandatory: true, category: 'identity' },
    { id: 'lmt-30', field: 'EU DoC reference', desc: 'Declaration of Conformity', mandatory: true, category: 'identity' },
    { id: 'lmt-31', field: 'CE marking', desc: 'Conformity marking', mandatory: true, category: 'identity' },
    { id: 'lmt-32', field: 'Data carrier (QR)', desc: 'Link to passport', mandatory: true, category: 'identity' },
    { id: 'lmt-33', field: 'Capacity fade indicator', desc: 'How capacity degrades over time', mandatory: true, category: 'soh' },
    { id: 'lmt-34', field: 'Charging protocol', desc: 'Supported charging methods', mandatory: true, category: 'performance' },
    { id: 'lmt-35', field: 'Cell format', desc: 'Cylindrical, prismatic, pouch', mandatory: true, category: 'chemistry' },
    { id: 'lmt-36', field: 'Module configuration', desc: 'Cell-to-pack arrangement', mandatory: true, category: 'chemistry' },
    { id: 'lmt-37', field: 'BMS data access', desc: 'How to read BMS data', mandatory: true, category: 'soh' },
    { id: 'lmt-38', field: 'Sub-supplier facilities', desc: 'CRM processing sites', mandatory: true, category: 'supply' },
    { id: 'lmt-39', field: 'Recovery rates', desc: 'Expected Co/Li/Ni recovery', mandatory: true, category: 'eol' },
    { id: 'lmt-40', field: 'Waste instructions', desc: 'Disposal channels', mandatory: true, category: 'eol' },
    { id: 'lmt-41', field: 'Usage history', desc: 'Charge/discharge summary (dynamic)', mandatory: true, category: 'soh' },
    { id: 'lmt-42', field: 'Extreme event log', desc: 'Thermal/physical incidents (dynamic)', mandatory: true, category: 'soh' },
    { id: 'lmt-43', field: 'Expected SoH evolution', desc: 'Degradation model', mandatory: true, category: 'soh' },
    { id: 'lmt-44', field: 'Material recovery method', desc: 'Hydrometallurgical, pyrometallurgical, or direct', mandatory: true, category: 'eol' },
    { id: 'lmt-45', field: 'Performance class', desc: 'Durability and efficiency class', mandatory: true, category: 'performance' },
    { id: 'lmt-46', field: 'Batch/lot number', desc: 'Production batch identifier', mandatory: true, category: 'identity' },
    { id: 'lmt-47', field: 'Quality management cert', desc: 'ISO 9001 or equivalent reference', mandatory: true, category: 'supply' },
    { id: 'lmt-48', field: 'Environmental management cert', desc: 'ISO 14001 or equivalent reference', mandatory: true, category: 'supply' },
    { id: 'lmt-49', field: 'User manual reference', desc: 'Installation and use documentation', mandatory: true, category: 'identity' }
  ],
  industrial: [
    { id: 'ind-01', field: 'Manufacturer name', desc: 'Legal entity name', mandatory: true, category: 'identity' },
    { id: 'ind-02', field: 'Manufacturer address', desc: 'Place of business', mandatory: true, category: 'identity' },
    { id: 'ind-03', field: 'Battery category', desc: 'Industrial >2kWh', mandatory: true, category: 'identity' },
    { id: 'ind-04', field: 'Battery model', desc: 'Model designation', mandatory: true, category: 'identity' },
    { id: 'ind-05', field: 'Serial number', desc: 'Unique identifier', mandatory: true, category: 'identity' },
    { id: 'ind-06', field: 'Manufacturing date', desc: 'Production date', mandatory: true, category: 'identity' },
    { id: 'ind-07', field: 'Manufacturing place', desc: 'Site location', mandatory: true, category: 'identity' },
    { id: 'ind-08', field: 'Weight', desc: 'Total weight kg', mandatory: true, category: 'identity' },
    { id: 'ind-09', field: 'Battery chemistry', desc: 'Cell chemistry', mandatory: true, category: 'chemistry' },
    { id: 'ind-10', field: 'Hazardous substances', desc: 'Substances above limits', mandatory: true, category: 'chemistry' },
    { id: 'ind-11', field: 'Critical raw materials', desc: 'CRM content', mandatory: true, category: 'chemistry' },
    { id: 'ind-12', field: 'Carbon footprint', desc: 'kg CO2e/kWh', mandatory: true, category: 'carbon' },
    { id: 'ind-13', field: 'Rated capacity', desc: 'Ah', mandatory: true, category: 'performance' },
    { id: 'ind-14', field: 'Rated voltage', desc: 'V', mandatory: true, category: 'performance' },
    { id: 'ind-15', field: 'Expected lifetime', desc: 'Cycles / years', mandatory: true, category: 'performance' },
    { id: 'ind-16', field: 'Temperature range', desc: 'Operating range', mandatory: true, category: 'performance' },
    { id: 'ind-17', field: 'Safety test references', desc: 'Safety compliance', mandatory: true, category: 'safety' },
    { id: 'ind-18', field: 'UN 38.3 summary', desc: 'Transport safety', mandatory: true, category: 'safety' },
    { id: 'ind-19', field: 'Due diligence policy', desc: 'Supply chain policy', mandatory: true, category: 'supply' },
    { id: 'ind-20', field: 'Material origin', desc: 'CRM countries of origin', mandatory: true, category: 'supply' },
    { id: 'ind-21', field: 'Dismantling information', desc: 'Removal instructions', mandatory: true, category: 'eol' },
    { id: 'ind-22', field: 'Recycling process', desc: 'Recycling route', mandatory: true, category: 'eol' },
    { id: 'ind-23', field: 'EU DoC reference', desc: 'Declaration of Conformity', mandatory: true, category: 'identity' },
    { id: 'ind-24', field: 'Data carrier (QR)', desc: 'Passport link', mandatory: true, category: 'identity' },
    { id: 'ind-25', field: 'Recycled content', desc: 'Recycled share per material', mandatory: true, category: 'circularity' },
    { id: 'ind-26', field: 'Sub-supplier facilities', desc: 'Processing sites', mandatory: true, category: 'supply' },
    { id: 'ind-27', field: 'Warranty terms', desc: 'Warranty information', mandatory: true, category: 'identity' },
    { id: 'ind-28', field: 'BMS data access', desc: 'How to read diagnostics', mandatory: true, category: 'soh' },
    { id: 'ind-29', field: 'Expected SoH evolution', desc: 'Degradation reference', mandatory: true, category: 'soh' },
    { id: 'ind-30', field: 'Material recovery rates', desc: 'Co/Li/Ni recovery', mandatory: true, category: 'eol' },
    { id: 'ind-31', field: 'Waste management', desc: 'Disposal instructions', mandatory: true, category: 'eol' },
    { id: 'ind-32', field: 'Quality certifications', desc: 'ISO 9001/14001 references', mandatory: true, category: 'supply' }
  ]
}

const currentPoints = computed(() => dataPoints[batteryType.value])
const groupedPoints = computed(() => {
  const groups: Record<string, DataPoint[]> = {}
  for (const p of currentPoints.value) {
    if (!groups[p.category]) groups[p.category] = []
    groups[p.category].push(p)
  }
  return groups
})
const progress = computed(() => {
  const total = currentPoints.value.length
  const done = currentPoints.value.filter(p => checked.value.has(p.id)).length
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
})

function toggle(id: string) {
  if (checked.value.has(id)) checked.value.delete(id)
  else checked.value.add(id)
}
function switchType(t: BatteryType) {
  batteryType.value = t
}
function exportProgress() {
  const data = {
    batteryType: batteryType.value,
    total: progress.value.total,
    completed: progress.value.done,
    checked: [...checked.value],
    gaps: currentPoints.value.filter(p => !checked.value.has(p.id)).map(p => ({ field: p.field, desc: p.desc, category: categories[p.category] })),
    exportedAt: new Date().toISOString().slice(0, 10)
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `battery-passport-readiness-${batteryType.value}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-4 space-y-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Battery class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">EU Battery Passport Checklist</h1>
        <p class="text-xs text-muted-foreground">All mandatory data points (Annex XIII, Regulation 2023/1542) — track readiness before 18 Feb 2027. Client-side.</p>
      </div>
    </div>

    <!-- Type picker -->
    <div class="flex flex-wrap gap-2">
      <button v-for="t in (['ev','lmt','industrial'] as BatteryType[])" :key="t"
        class="px-4 py-2 text-sm rounded-lg border transition-colors"
        :class="batteryType === t ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-border hover:border-foreground/30'"
        @click="switchType(t)">
        {{ t === 'ev' ? 'EV Battery (46 pts)' : t === 'lmt' ? 'LMT Battery (49 pts)' : 'Industrial >2kWh (32 pts)' }}
      </button>
    </div>

    <!-- Progress -->
    <Card :class="progress.pct === 100 ? 'border-green-500/50' : 'border-amber-500/40'">
      <CardContent class="pt-5 flex items-center gap-4">
        <div class="text-3xl font-black font-mono" :class="progress.pct === 100 ? 'text-green-600' : 'text-amber-600'">{{ progress.pct }}%</div>
        <div class="flex-1">
          <div class="h-2 bg-muted rounded-full overflow-hidden">
            <div class="h-full transition-all" :class="progress.pct === 100 ? 'bg-green-500' : 'bg-amber-500'" :style="{ width: progress.pct + '%' }" />
          </div>
          <p class="text-xs text-muted-foreground mt-1">{{ progress.done }} / {{ progress.total }} data points ready</p>
        </div>
        <Button size="sm" variant="outline" @click="exportProgress"><Download class="w-3.5 h-3.5 mr-1" /> Export</Button>
      </CardContent>
    </Card>

    <!-- Checklist by category -->
    <div v-for="(points, cat) in groupedPoints" :key="cat" class="space-y-1">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-4 mb-2">{{ categories[cat] || cat }}</h2>
      <div v-for="p in points" :key="p.id"
        class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors"
        :class="checked.has(p.id) ? 'bg-green-500/5 border-green-500/30' : 'border-border hover:border-foreground/20'"
        @click="toggle(p.id)">
        <component :is="checked.has(p.id) ? CheckCircle2 : Circle" class="w-5 h-5 shrink-0 mt-0.5" :class="checked.has(p.id) ? 'text-green-600' : 'text-muted-foreground'" />
        <div class="min-w-0">
          <p class="text-sm font-medium" :class="checked.has(p.id) ? 'text-green-800' : ''">{{ p.field }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ p.desc }}</p>
        </div>
        <span v-if="p.mandatory" class="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold shrink-0">MANDATORY</span>
      </div>
    </div>

    <!-- Info -->
    <Card class="mt-6">
      <CardContent class="pt-5 text-xs text-muted-foreground leading-relaxed space-y-2">
        <p><strong class="text-foreground">Deadline: 18 February 2027.</strong> Battery passports become mandatory for EV, LMT, and industrial batteries above 2kWh under Regulation (EU) 2023/1542. The data carrier (QR code) must link to a resolver serving this structured data.</p>
        <p>The data points above are derived from Annex XIII of the Battery Regulation. Approximately 20% are dynamic (State of Health, usage history) — these require a live BMS connection, not just a static document. The ~80% static fields are what you can prepare now.</p>
        <p>Use our <RouterLink to="/tools/espr-passport" class="text-primary underline underline-offset-2">ESPR Passport builder</RouterLink> to structure the data, and the <RouterLink to="/tools/gs1-digital-link" class="text-primary underline underline-offset-2">GS1 Digital Link builder</RouterLink> for the QR data carrier. Your checklist data stays in this browser.</p>
      </CardContent>
    </Card>
  </div>
</template>
