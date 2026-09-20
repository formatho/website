<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Leaf, Download, Copy, Check, Info } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Battery Carbon Footprint Declaration | Formatho',
  description:
    'Build the carbon footprint declaration for an EU battery passport: cradle-to-gate kg CO₂e/kWh per the delegated regulation methodology. Free, client-side.',
  keywords: ['battery carbon footprint', 'ev battery co2', 'battery passport carbon declaration', 'kg co2e kwh battery', 'eu battery regulation carbon', 'battery lca calculator'],
  ogType: 'website'
})

const form = ref({
  model: '', chemistry: 'NMC', capacityKWh: 60,
  // lifecycle stages (kg CO2e per stage)
  rawMaterials: 2400, cellManufacturing: 900, moduleAssembly: 300, packAssembly: 200,
  transportToEU: 400,
  // declared values
  methodologyVersion: 'Commission Delegated Regulation (EU) 2024/1787',
  declaredValue: 0, // computed
  performanceClass: ''
})

const totalCO2 = computed(() => {
  const stages = ['rawMaterials', 'cellManufacturing', 'moduleAssembly', 'packAssembly', 'transportToEU'] as const
  return stages.reduce((s, k) => s + (Number(form.value[k]) || 0), 0)
})
const co2PerKWh = computed(() => form.value.capacityKWh > 0 ? Math.round((totalCO2.value / form.value.capacityKWh) * 10) / 10 : 0)

const classRanges = [
  { max: 50, label: 'A' }, { max: 65, label: 'B' }, { max: 80, label: 'C' },
  { max: 95, label: 'D' }, { max: 110, label: 'E' }, { max: Infinity, label: 'F' }
]
const performanceClass = computed(() => classRanges.find(r => co2PerKWh.value <= r.max)?.label || 'F')

const declaration = computed(() => JSON.stringify({
  type: 'battery-carbon-footprint-declaration',
  regulation: 'Regulation (EU) 2023/1542, Art. 7 + Commission Delegated Regulation (EU) 2024/1787',
  model: form.value.model || '[battery model]',
  chemistry: form.value.chemistry,
  declaredCapacityKWh: form.value.capacityKWh,
  carbonFootprint: {
    totalKgCO2e: totalCO2.value,
    kgCO2ePerKWh: co2PerKWh.value,
    performanceClass: performanceClass.value,
    methodology: form.value.methodologyVersion,
    boundary: 'cradle-to-gate (raw material acquisition through pack assembly)'
  },
  lifecycleStages: {
    rawMaterialAcquisition: form.value.rawMaterials,
    cellManufacturing: form.value.cellManufacturing,
    moduleAssembly: form.value.moduleAssembly,
    packAssembly: form.value.packAssembly,
    transportToEU: form.value.transportToEU
  },
  declaredAt: new Date().toISOString().slice(0, 10)
}, null, 2))

function download() {
  const blob = new Blob([declaration.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'battery-carbon-footprint-declaration.json'
  a.click()
  URL.revokeObjectURL(a.href)
}
const copied = ref(false)
async function copy() {
  try { await navigator.clipboard.writeText(declaration.value); copied.value = true; setTimeout(() => copied.value = false, 1500) } catch { /* clipboard unavailable */}
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 space-y-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Leaf class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">Battery Carbon Footprint Declaration</h1>
        <p class="text-xs text-muted-foreground">Structure the mandatory carbon footprint for an EU battery passport. Free, client-side.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Battery details</h2>
          <Input v-model="form.model" class="h-9 text-sm" placeholder="Battery model (e.g. BP-60-NMC)" aria-label="Battery model" />
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-muted-foreground">Chemistry</label>
              <select v-model="form.chemistry" class="w-full h-9 rounded-md border border-input bg-background px-2 text-sm" aria-label="Chemistry">
                <option>NMC</option><option>LFP</option><option>NCA</option><option>LTO</option><option>Na-ion</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Capacity (kWh)</label>
              <Input v-model.number="form.capacityKWh" type="number" min="1" class="h-9 text-sm" aria-label="Capacity kWh" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Lifecycle stages (kg CO₂e)</h2>
          <div v-for="key in ['rawMaterials', 'cellManufacturing', 'moduleAssembly', 'packAssembly', 'transportToEU']" :key="key" class="grid grid-cols-2 gap-2 items-center">
            <label class="text-[10px] text-muted-foreground capitalize">{{ key.replace(/([A-Z])/g, ' $1').toLowerCase() }}</label>
            <Input v-model.number="(form as any)[key]" type="number" min="0" class="h-8 text-xs" :aria-label="key" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Result -->
    <Card class="border-primary/30">
      <CardContent class="pt-5">
        <div class="flex flex-wrap items-center gap-6 mb-4">
          <div>
            <p class="text-xs text-muted-foreground uppercase">Total</p>
            <p class="text-3xl font-black font-mono">{{ totalCO2.toLocaleString() }} <span class="text-sm font-normal">kg CO₂e</span></p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground uppercase">Per kWh</p>
            <p class="text-3xl font-black font-mono text-primary">{{ co2PerKWh }} <span class="text-sm font-normal">kg CO₂e/kWh</span></p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground uppercase">Class</p>
            <p class="text-3xl font-black font-mono" :class="performanceClass <= 'B' ? 'text-green-600' : performanceClass <= 'D' ? 'text-amber-600' : 'text-red-500'">{{ performanceClass }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="ghost" @click="copy"><Check v-if="copied" class="w-3.5 h-3.5 mr-1 text-green-600" /><Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy JSON</Button>
          <Button size="sm" variant="outline" @click="download"><Download class="w-3.5 h-3.5 mr-1" /> Download</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-5">
        <pre class="text-[10px] font-mono whitespace-pre-wrap border border-border rounded-lg p-3 max-h-64 overflow-y-auto bg-muted/20 m-0">{{ declaration }}</pre>
        <p class="text-[10px] text-muted-foreground mt-2 flex items-start gap-1.5">
          <Info class="w-3 h-3 shrink-0 mt-0.5" />
          Values shown are estimates for planning. The binding carbon footprint declaration must follow the Commission Delegated Regulation methodology and be verified by a notified body. Use this tool to structure the data, then commission a verified LCA.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
