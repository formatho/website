<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Download, Copy, Check, FileSpreadsheet } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DPP Supplier Data Request Generator | Formatho',
  description:
    'Generate a structured data request for your suppliers: which DPP fields you need, in what format, with deadlines. Export as CSV or JSON. Free, client-side.',
  keywords: ['dpp supplier data request', 'digital product passport supplier', 'espr supply chain data', 'dpp data template', 'supplier compliance dpp', 'battery passport supplier request'],
  ogType: 'website'
})

const supplierName = ref('')
const productName = ref('')
const deadline = ref('2026-12-01')
const selectedFields = ref<Set<string>>(new Set())

const fieldGroups: Record<string, Array<{ id: string; field: string; format: string; desc: string }>> = {
  'Identification': [
    { id: 'gtin', field: 'GTIN / product identifier', format: '14-digit GTIN', desc: 'Global Trade Item Number' },
    { id: 'model', field: 'Model / type identifier', format: 'string', desc: 'Manufacturer model number' },
    { id: 'serial', field: 'Serial number format', format: 'string or pattern', desc: 'How serials are assigned' },
    { id: 'batch', field: 'Batch / lot format', format: 'string', desc: 'Production batch ID scheme' },
  ],
  'Composition & Materials': [
    { id: 'materials', field: 'Material composition', format: 'JSON array with % by mass', desc: 'All materials >1% by weight' },
    { id: 'crm', field: 'Critical raw materials', format: 'JSON list', desc: 'Li, Co, Ni, graphite content' },
    { id: 'origin', field: 'Country of origin (CRMs)', format: 'ISO 3166 country codes', desc: 'Where each CRM was extracted' },
    { id: 'substances', field: 'Substances of concern', format: 'JSON list with CAS numbers', desc: 'SVHC above 0.1% w/w' },
  ],
  'Sustainability': [
    { id: 'carbon', field: 'Carbon footprint', format: 'kg CO2e (cradle-to-gate)', desc: 'Per functional unit' },
    { id: 'carbon_method', field: 'Carbon methodology', format: 'standard reference + version', desc: 'ISO 14067 or PEF method' },
    { id: 'recycled', field: 'Recycled content', format: '% by material', desc: 'Post-consumer recycled share' },
    { id: 'energy', field: 'Energy use in production', format: 'kWh per unit', desc: 'Manufacturing energy' },
  ],
  'Performance & Durability': [
    { id: 'lifetime', field: 'Expected lifetime', format: '{ cycles, years }', desc: 'To 80% original performance' },
    { id: 'capacity', field: 'Rated capacity / performance', format: 'number + unit', desc: 'Battery Ah, power kW, etc.' },
    { id: 'warranty', field: 'Warranty terms', format: 'text + duration', desc: 'Commercial warranty' },
  ],
  'Conformity': [
    { id: 'ce', field: 'CE marking status', format: 'boolean + DoC reference', desc: 'EU Declaration of Conformity' },
    { id: 'tests', field: 'Safety test reports', format: 'document references', desc: 'UN 38.3, IEC, EN standards' },
    { id: 'certifications', field: 'Certifications (ISO 9001/14001)', format: 'certificate references', desc: 'Quality and environmental mgmt' },
  ],
  'End of Life': [
    { id: 'recycling', field: 'Recycling process', format: 'text description', desc: 'Recommended EOL route' },
    { id: 'recovery', field: 'Material recovery rates', format: '% per material', desc: 'Co/Li/Ni or other CRMs' },
    { id: 'dismantle', field: 'Dismantling instructions', format: 'document URL', desc: 'Safe removal procedure' },
  ]
}

function toggle(id: string) {
  if (selectedFields.value.has(id)) selectedFields.value.delete(id)
  else selectedFields.value.add(id)
}
const allFields = computed(() => Object.values(fieldGroups).flat())
const selectedCount = computed(() => selectedFields.value.size)

const requestJson = computed(() => JSON.stringify({
  requestType: 'DPP-SUPPLIER-DATA-REQUEST',
  version: '1.0',
  supplier: supplierName.value || '[supplier name]',
  product: productName.value || '[product name]',
  deadline: deadline.value,
  regulation: 'EU Regulation 2024/1781 (ESPR) — Digital Product Passport',
  fields: allFields.value.filter(f => selectedFields.value.has(f.id)).map(f => ({
    id: f.id, field: f.field, format: f.format, description: f.desc
  })),
  note: 'Please provide data in the specified format. This data is required for EU Digital Product Passport compliance.',
  requestedAt: new Date().toISOString().slice(0, 10)
}, null, 2))

const requestCsv = computed(() => {
  const rows = [['Field ID', 'Field Name', 'Expected Format', 'Description', 'Regulation']]
  for (const f of allFields.value.filter(f => selectedFields.value.has(f.id))) {
    rows.push([f.id, f.field, f.format, f.desc, 'ESPR DPP'])
  }
  return rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
})

function downloadJson() {
  const blob = new Blob([requestJson.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `dpp-data-request-${(supplierName.value || 'supplier').toLowerCase().replace(/\s+/g, '-')}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}
function downloadCsv() {
  const blob = new Blob([requestCsv.value], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `dpp-data-request-${(supplierName.value || 'supplier').toLowerCase().replace(/\s+/g, '-')}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}
const copied = ref(false)
async function copyJson() {
  try {
    await navigator.clipboard.writeText(requestJson.value)
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-4 space-y-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Send class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">DPP Supplier Data Request</h1>
        <p class="text-xs text-muted-foreground">Generate a structured request for the passport fields you need from suppliers. Free, client-side.</p>
      </div>
    </div>

    <!-- Supplier info -->
    <Card>
      <CardContent class="pt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">Supplier name</label>
          <Input v-model="supplierName" class="h-9" placeholder="ABC Components GmbH" aria-label="Supplier name" />
        </div>
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">Product / component</label>
          <Input v-model="productName" class="h-9" placeholder="Li-ion Cell LFP-100Ah" aria-label="Product name" />
        </div>
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">Response deadline</label>
          <Input v-model="deadline" type="date" class="h-9" aria-label="Deadline" />
        </div>
      </CardContent>
    </Card>

    <!-- Field selection -->
    <div v-for="(fields, group) in fieldGroups" :key="group" class="space-y-1">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2">{{ group }}</h2>
      <div v-for="f in fields" :key="f.id"
        class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors"
        :class="selectedFields.has(f.id) ? 'bg-primary/5 border-primary/30' : 'border-border hover:border-foreground/20'"
        @click="toggle(f.id)">
        <div class="w-4 h-4 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center"
          :class="selectedFields.has(f.id) ? 'bg-primary border-primary' : 'border-muted-foreground/40'">
          <Check v-if="selectedFields.has(f.id)" class="w-3 h-3 text-primary-foreground" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium">{{ f.field }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ f.desc }} · <code class="font-mono text-[10px]">{{ f.format }}</code></p>
        </div>
      </div>
    </div>

    <!-- Export -->
    <Card class="border-primary/30">
      <CardContent class="pt-5 flex flex-wrap items-center gap-3">
        <span class="text-sm font-semibold">{{ selectedCount }} fields selected</span>
        <div class="ml-auto flex gap-2">
          <Button size="sm" variant="outline" @click="downloadCsv"><FileSpreadsheet class="w-3.5 h-3.5 mr-1" /> CSV</Button>
          <Button size="sm" variant="outline" @click="downloadJson"><Download class="w-3.5 h-3.5 mr-1" /> JSON</Button>
          <Button size="sm" variant="ghost" @click="copyJson">
            <Check v-if="copied" class="w-3.5 h-3.5 mr-1 text-green-600" />
            <Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Preview -->
    <Card v-if="selectedCount > 0">
      <CardContent class="pt-5">
        <p class="text-xs text-muted-foreground mb-2">Request preview:</p>
        <pre class="text-[10px] font-mono whitespace-pre-wrap border border-border rounded-lg p-3 max-h-64 overflow-y-auto bg-muted/20 m-0">{{ requestJson }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
