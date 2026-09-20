<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, Package, Factory, FileCheck2, AlertTriangle, CheckCircle2, Download, ArrowRight, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DPP Playground — Digital Product Passport Builder | Formatho',
  description:
    'Build a draft EU Digital Product Passport: pick your industry (textile, battery, electronics...), list the documents you already have, and get the passport draft plus exactly what information is missing. 100% client-side.',
  keywords: [
    'digital product passport',
    'dpp tool',
    'dpp playground',
    'eu dpp regulation',
    'espr 2024/1781',
    'battery passport',
    'textile dpp',
    'export compliance eu'
  ],
  ogType: 'website'
})

interface Field { key: string; label: string; group: string; required: boolean; note?: string }
interface Industry {
  id: string
  name: string
  regulation: string
  timing: string
  fields: Field[]
  docs: { id: string; label: string; satisfies: string[] }[]
}

const INDUSTRIES: Industry[] = [
  {
    id: 'textile',
    name: 'Textile & Apparel',
    regulation: 'ESPR (EU) 2024/1781 — textiles delegated act',
    timing: 'DPP expected ~2027 for apparel; prepare now for retailer data requests',
    fields: [
      { key: 'product_id', label: 'Unique product identifier (GTIN/model ID)', group: 'Identification', required: true },
      { key: 'owner', label: 'Economic operator (manufacturer/importer) details', group: 'Identification', required: true },
      { key: 'composition', label: 'Fibre composition by weight (%)', group: 'Materials', required: true, note: 'e.g. 80% cotton, 20% polyester' },
      { key: 'origin', label: 'Country of origin ("made in")', group: 'Materials', required: true },
      { key: 'recycled', label: 'Recycled content share', group: 'Materials', required: false },
      { key: 'chemicals', label: 'Restricted substances compliance (REACH, azo dyes)', group: 'Chemicals', required: true },
      { key: 'water', label: 'Water use / footprint', group: 'Sustainability', required: false },
      { key: 'carbon', label: 'Carbon footprint (PCF)', group: 'Sustainability', required: false },
      { key: 'durability', label: 'Durability / wear-test results', group: 'Circularity', required: false },
      { key: 'repair', label: 'Repair & disassembly instructions', group: 'Circularity', required: true },
      { key: 'care', label: 'Care instructions', group: 'Circularity', required: true },
      { key: 'eos', label: 'End-of-life / recycling guidance', group: 'Circularity', required: true },
      { key: 'supply', label: 'Tier-1 (and key Tier-2) supplier traceability', group: 'Supply chain', required: true },
      { key: 'conformity', label: 'EU Declaration of Conformity / CE where applicable', group: 'Conformity', required: true },
    ],
    docs: [
      { id: 'tech_pack', label: 'Tech pack / product spec sheet', satisfies: ['product_id', 'composition'] },
      { id: 'composition_cert', label: 'Fibre composition certificate / test report', satisfies: ['composition', 'chemicals'] },
      { id: 'origin_decl', label: 'Certificate of Origin', satisfies: ['origin'] },
      { id: 'grs_gots', label: 'GRS / GOTS / RCS recycled or organic certificate', satisfies: ['recycled', 'supply'] },
      { id: 'reach', label: 'REACH / RSL test report', satisfies: ['chemicals'] },
      { id: 'lca', label: 'LCA or PCF report', satisfies: ['carbon', 'water'] },
      { id: 'durability_test', label: 'Durability / wash-cycle test report', satisfies: ['durability'] },
      { id: 'repair_guide', label: 'Repair / care instructions document', satisfies: ['repair', 'care'] },
      { id: 'eol', label: 'End-of-life or recycling guidance', satisfies: ['eos'] },
      { id: 'supplier_list', label: 'Supplier / factory list (with addresses)', satisfies: ['supply'] },
      { id: 'doc', label: 'Declaration of Conformity', satisfies: ['conformity'] },
    ],
  },
  {
    id: 'battery',
    name: 'Batteries (EV / industrial / LMT)',
    regulation: 'Battery Regulation (EU) 2023/1542',
    timing: 'Battery passport mandatory from 18 Feb 2027 for LMT, EV and >2kWh industrial batteries',
    fields: [
      { key: 'product_id', label: 'Battery passport ID + manufacturer ID', group: 'Identification', required: true },
      { key: 'model', label: 'Model / batch / serial number', group: 'Identification', required: true },
      { key: 'chemistry', label: 'Battery chemistry & capacity (kWh)', group: 'Technical', required: true },
      { key: 'composition', label: 'Critical raw materials (Li, Co, Ni, graphite) with origin', group: 'Materials', required: true },
      { key: 'recycled', label: 'Recycled content share (Co, Li, Ni, Pb)', group: 'Materials', required: true },
      { key: 'carbon', label: 'Carbon footprint (declared per kWh)', group: 'Sustainability', required: true },
      { key: 'due_diligence', label: 'Supply-chain due diligence policy (Annex X risk areas)', group: 'Supply chain', required: true },
      { key: 'child_labour', label: 'Child labour / forced labour due diligence statement', group: 'Supply chain', required: true },
      { key: 'conformity', label: 'EU Declaration of Conformity + CE', group: 'Conformity', required: true },
      { key: 'eos', label: 'Dismantling / removal / recycling information', group: 'Circularity', required: true },
      { key: 'safety', label: 'Safety measures (Annex V)', group: 'Conformity', required: true },
    ],
    docs: [
      { id: 'spec', label: 'Technical datasheet', satisfies: ['model', 'chemistry'] },
      { id: 'bom', label: 'Bill of materials with material origin', satisfies: ['composition'] },
      { id: 'recycled_cert', label: 'Recycled content verification', satisfies: ['recycled'] },
      { id: 'pcf', label: 'Carbon footprint study (per EF method)', satisfies: ['carbon'] },
      { id: 'dd_policy', label: 'Due diligence policy report (OECD-aligned)', satisfies: ['due_diligence', 'child_labour'] },
      { id: 'doc', label: 'EU Declaration of Conformity', satisfies: ['conformity', 'safety'] },
      { id: 'eol', label: 'Dismantling / recycling instructions', satisfies: ['eos'] },
      { id: 'supplier_list', label: 'Supplier / smelter list', satisfies: ['due_diligence'] },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    regulation: 'ESPR (EU) 2024/1781 — electronics under working plan 2025-2030',
    timing: 'Delegated acts phased; RoHS/WEEE/energy-label data needed now',
    fields: [
      { key: 'product_id', label: 'Unique product identifier', group: 'Identification', required: true },
      { key: 'owner', label: 'Manufacturer details', group: 'Identification', required: true },
      { key: 'materials', label: 'Material composition / critical raw materials', group: 'Materials', required: true },
      { key: 'rohs', label: 'RoHS restricted-substances compliance', group: 'Chemicals', required: true },
      { key: 'reach', label: 'REACH SVHC declaration', group: 'Chemicals', required: true },
      { key: 'energy', label: 'Energy class / consumption data', group: 'Sustainability', required: true },
      { key: 'carbon', label: 'Carbon footprint (PCF)', group: 'Sustainability', required: false },
      { key: 'repair', label: 'Repair info, spare parts availability, disassembly', group: 'Circularity', required: true },
      { key: 'eos', label: 'WEEE / recycling information', group: 'Circularity', required: true },
      { key: 'conformity', label: 'Declaration of Conformity + CE marking', group: 'Conformity', required: true },
      { key: 'software', label: 'Software/firmware update support period', group: 'Technical', required: false },
    ],
    docs: [
      { id: 'spec', label: 'Technical datasheet / BOM', satisfies: ['product_id', 'materials'] },
      { id: 'rohs_cert', label: 'RoHS test report / certificate', satisfies: ['rohs'] },
      { id: 'reach', label: 'REACH SVHC declaration (IPC-1752A)', satisfies: ['reach'] },
      { id: 'energy_label', label: 'EU energy label registration', satisfies: ['energy'] },
      { id: 'pcf', label: 'PCF / LCA report', satisfies: ['carbon'] },
      { id: 'repair_manual', label: 'Repair manual / spare parts list', satisfies: ['repair'] },
      { id: 'weee', label: 'WEEE registration & recycling info', satisfies: ['eos'] },
      { id: 'doc', label: 'Declaration of Conformity', satisfies: ['conformity'] },
    ],
  },
  {
    id: 'construction',
    name: 'Construction Products',
    regulation: 'CPR (EU) 2024/3110 — digital formats phased',
    timing: 'DoP already required; DPP-style data carrier next',
    fields: [
      { key: 'product_id', label: 'Product type / AVCP system', group: 'Identification', required: true },
      { key: 'dop', label: 'Declaration of Performance (DoP)', group: 'Conformity', required: true },
      { key: 'harmonised', label: 'Harmonised standard / ETA reference', group: 'Conformity', required: true },
      { key: 'materials', label: 'Material composition & origin', group: 'Materials', required: true },
      { key: 'carbon', label: 'GWP / EPD (environmental product declaration)', group: 'Sustainability', required: true },
      { key: 'durability', label: 'Durability / service life data', group: 'Circularity', required: false },
      { key: 'eos', label: 'End-of-life / recyclability', group: 'Circularity', required: false },
    ],
    docs: [
      { id: 'dop', label: 'Declaration of Performance', satisfies: ['dop', 'harmonised'] },
      { id: 'epd', label: 'EPD (EN 15804)', satisfies: ['carbon'] },
      { id: 'spec', label: 'Technical datasheet / BOM', satisfies: ['product_id', 'materials'] },
      { id: 'test', label: 'Test reports (hEN methods)', satisfies: ['durability'] },
      { id: 'eol', label: 'End-of-life documentation', satisfies: ['eos'] },
    ],
  },
  {
    id: 'tyres',
    name: 'Tyres',
    regulation: 'ESPR working plan — tyres among first delegated acts',
    timing: 'DPP expected among the first ESPR categories',
    fields: [
      { key: 'product_id', label: 'Tyre ID / DOT code', group: 'Identification', required: true },
      { key: 'composition', label: 'Materials (natural/synthetic rubber, silica) & retreadability', group: 'Materials', required: true },
      { key: 'rolling', label: 'Rolling resistance class', group: 'Sustainability', required: true },
      { key: 'wet', label: 'Wet grip class', group: 'Conformity', required: true },
      { key: 'noise', label: 'Noise class', group: 'Conformity', required: true },
      { key: 'carbon', label: 'Carbon footprint', group: 'Sustainability', required: false },
      { key: 'eos', label: 'End-of-life / retreading info', group: 'Circularity', required: true },
    ],
    docs: [
      { id: 'spec', label: 'Tyre spec / labelling sheet', satisfies: ['product_id', 'rolling', 'wet', 'noise'] },
      { id: 'materials', label: 'Material composition sheet', satisfies: ['composition'] },
      { id: 'pcf', label: 'PCF study', satisfies: ['carbon'] },
      { id: 'eol', label: 'Retreading / recycling documentation', satisfies: ['eos'] },
    ],
  },
  {
    id: 'furniture',
    name: 'Furniture',
    regulation: 'ESPR (EU) 2024/1781 — furniture in working plan',
    timing: 'Delegated act expected later in the plan',
    fields: [
      { key: 'product_id', label: 'Unique product identifier', group: 'Identification', required: true },
      { key: 'materials', label: 'Materials & surface treatments', group: 'Materials', required: true },
      { key: 'chemicals', label: 'Chemical compliance (formaldehyde, flame retardants)', group: 'Chemicals', required: true },
      { key: 'carbon', label: 'Carbon footprint', group: 'Sustainability', required: false },
      { key: 'repair', label: 'Spare parts & repairability info', group: 'Circularity', required: true },
      { key: 'eos', label: 'End-of-life / recyclability', group: 'Circularity', required: true },
      { key: 'conformity', label: 'General Product Safety / DoC', group: 'Conformity', required: true },
    ],
    docs: [
      { id: 'spec', label: 'Product spec / BOM', satisfies: ['product_id', 'materials'] },
      { id: 'chem_test', label: 'Chemical emissions test report', satisfies: ['chemicals'] },
      { id: 'pcf', label: 'PCF / LCA study', satisfies: ['carbon'] },
      { id: 'repair', label: 'Spare parts list / repair guide', satisfies: ['repair'] },
      { id: 'eol', label: 'End-of-life info', satisfies: ['eos'] },
      { id: 'doc', label: 'Declaration of Conformity', satisfies: ['conformity'] },
    ],
  },
]

const step = ref<1 | 2 | 3>(1)
const industryId = ref('')
const productName = ref('')
const productNote = ref('')
const ownedDocs = ref<string[]>([])
const copied = ref(false)

const industry = computed(() => INDUSTRIES.find((i) => i.id === industryId.value) || null)

const satisfied = computed(() => {
  if (!industry.value) return new Set<string>()
  const s = new Set<string>()
  for (const d of industry.value.docs) {
    if (ownedDocs.value.includes(d.id)) d.satisfies.forEach((f) => s.add(f))
  }
  return s
})

const gaps = computed(() => {
  if (!industry.value) return { required: [] as Field[], optional: [] as Field[] }
  const missing = industry.value.fields.filter((f) => !satisfied.value.has(f.key))
  return {
    required: missing.filter((f) => f.required),
    optional: missing.filter((f) => !f.required),
  }
})

const coverage = computed(() => {
  if (!industry.value) return 0
  const req = industry.value.fields.filter((f) => f.required)
  const ok = req.filter((f) => satisfied.value.has(f.key))
  return req.length ? Math.round((ok.length / req.length) * 100) : 0
})

const passportJson = computed(() => {
  if (!industry.value) return ''
  const obj: Record<string, unknown> = {
    schema: 'draft-eu-dpp/v0',
    product: { name: productName.value || 'Unnamed product', industry: industry.value.name },
    regulation: industry.value.regulation,
    data_fields: Object.fromEntries(
      industry.value.fields.map((f) => [
        f.key,
        satisfied.value.has(f.key)
          ? { status: 'documented', sources: industry.value.docs.filter((d) => ownedDocs.value.includes(d.id) && d.satisfies.includes(f.key)).map((d) => d.label) }
          : { status: f.required ? 'missing (required)' : 'missing (optional)' },
      ])
    ),
    notes: productNote.value || undefined,
    generated: new Date().toISOString(),
    disclaimer: 'Draft generated client-side for planning purposes. Not a regulatory submission.',
  }
  return JSON.stringify(obj, null, 2)
})

function toggleDoc(id: string) {
  ownedDocs.value = ownedDocs.value.includes(id)
    ? ownedDocs.value.filter((d) => d !== id)
    : [...ownedDocs.value, id]
}
function copyJson() {
  navigator.clipboard.writeText(passportJson.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
function downloadJson() {
  const blob = new Blob([passportJson.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `dpp-draft-${(productName.value || 'product').toLowerCase().replace(/\s+/g, '-')}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}
const grouped = computed(() => {
  if (!industry.value) return []
  const map = new Map<string, Field[]>()
  for (const f of industry.value.fields) {
    if (!map.has(f.group)) map.set(f.group, [])
    map.get(f.group)!.push(f)
  }
  return [...map.entries()]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <Package class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">DPP Playground — Digital Product Passport Builder</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto font-medium">
        Give us one export product and the documents you already have. We'll create the product passport and identify exactly what information is missing.
      </p>
      <p class="text-xs text-muted-foreground max-w-2xl mx-auto">
        Everything runs in your browser — no product data is uploaded anywhere.
      </p>
    </div>

    <!-- Step 1: industry -->
    <Card>
      <CardHeader><CardTitle class="text-lg flex items-center gap-2"><Factory class="w-4 h-4" /> 1. Pick your industry</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="ind in INDUSTRIES"
            :key="ind.id"
            @click="industryId = ind.id; step = 2"
            class="p-4 rounded-xl border text-left transition-colors"
            :class="industryId === ind.id ? 'border-primary bg-primary/5' : 'hover:bg-muted hover:border-foreground/40'"
          >
            <div class="font-semibold text-sm">{{ ind.name }}</div>
            <div class="text-xs text-muted-foreground mt-1">{{ ind.timing }}</div>
          </button>
        </div>
        <p v-if="industry" class="text-xs text-muted-foreground mt-4 pt-4 border-t">
          Regulation: {{ industry.regulation }}
        </p>
      </CardContent>
    </Card>

    <!-- Step 2: product + docs -->
    <template v-if="industry">
      <Card>
        <CardHeader><CardTitle class="text-lg flex items-center gap-2"><Package class="w-4 h-4" /> 2. Your export product</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-3">
            <Input v-model="productName" placeholder="Product name (e.g. Cotton crew-neck T-shirt)" />
            <Input :model-value="industry.name" disabled />
          </div>
          <Textarea v-model="productNote" rows="2" placeholder="Optional notes: target market, HS code, current buyers…" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-lg flex items-center gap-2"><FileCheck2 class="w-4 h-4" /> 3. Documents you already have</CardTitle></CardHeader>
        <CardContent>
          <div class="grid sm:grid-cols-2 gap-2">
            <button
              v-for="d in industry.docs"
              :key="d.id"
              @click="toggleDoc(d.id)"
              class="flex items-start gap-2 p-3 rounded-lg border text-left text-sm transition-colors"
              :class="ownedDocs.includes(d.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted hover:border-foreground/40'"
            >
              <component :is="ownedDocs.includes(d.id) ? CheckCircle2 : FileCheck2" class="w-4 h-4 mt-0.5 shrink-0" :class="ownedDocs.includes(d.id) ? 'text-green-600' : 'text-muted-foreground'" />
              <span>{{ d.label }}</span>
            </button>
          </div>
          <div class="mt-4 pt-4 border-t flex items-center justify-between">
            <div class="text-sm text-muted-foreground">
              Required-field coverage: <span class="font-bold" :class="coverage >= 80 ? 'text-green-600' : coverage >= 50 ? 'text-amber-600' : 'text-red-600'">{{ coverage }}%</span>
            </div>
            <Button @click="step = 3">Create passport <ArrowRight class="w-4 h-4 ml-2" /></Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- Step 3: results -->
    <template v-if="step === 3 && industry">
      <Card>
        <CardHeader><CardTitle class="text-lg">Product passport (draft)</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-4">
            <div v-for="[group, fields] in grouped" :key="group">
              <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{{ group }}</div>
              <div class="space-y-1">
                <div v-for="f in fields" :key="f.key" class="flex items-start gap-2 text-sm">
                  <component :is="satisfied.has(f.key) ? CheckCircle2 : AlertTriangle" class="w-4 h-4 mt-0.5 shrink-0" :class="satisfied.has(f.key) ? 'text-green-600' : f.required ? 'text-red-600' : 'text-muted-foreground'" />
                  <span :class="satisfied.has(f.key) ? '' : f.required ? 'text-red-700' : 'text-muted-foreground'">
                    {{ f.label }} <span v-if="!satisfied.has(f.key)" class="text-xs">— {{ f.required ? 'missing' : 'not yet provided' }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" @click="copyJson"><component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" /> {{ copied ? 'Copied' : 'Copy JSON' }}</Button>
            <Button variant="outline" size="sm" @click="downloadJson"><Download class="w-4 h-4 mr-2" /> Download JSON</Button>
          </div>
        </CardContent>
      </Card>

      <Card v-if="gaps.required.length || gaps.optional.length">
        <CardHeader><CardTitle class="text-lg">Exactly what's missing</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div v-if="gaps.required.length">
            <div class="text-sm font-semibold text-red-700 mb-2">Required to complete the passport ({{ gaps.required.length }})</div>
            <ul class="space-y-1 text-sm">
              <li v-for="f in gaps.required" :key="f.key" class="flex items-start gap-2">
                <AlertTriangle class="w-4 h-4 mt-0.5 text-red-600 shrink-0" />
                <span><strong>{{ f.group }}:</strong> {{ f.label }}<span v-if="f.note" class="text-muted-foreground"> — {{ f.note }}</span></span>
              </li>
            </ul>
          </div>
          <div v-if="gaps.optional.length">
            <div class="text-sm font-semibold text-muted-foreground mb-2">Nice to have ({{ gaps.optional.length }})</div>
            <ul class="space-y-1 text-sm text-muted-foreground">
              <li v-for="f in gaps.optional" :key="f.key" class="flex items-start gap-2">
                <Info class="w-4 h-4 mt-0.5 shrink-0" />
                <span>{{ f.label }}</span>
              </li>
            </ul>
          </div>
          <p v-if="!gaps.required.length && gaps.optional.length" class="text-sm text-green-700 font-medium pt-2 border-t">
            All required fields are covered by your documents. The remaining optional items would strengthen the passport for tenders and retailer scorecards.
          </p>
        </CardContent>
      </Card>
    </template>

    <Card>
      <CardHeader><CardTitle class="text-lg">What is a DPP?</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-3">
        <p>
          The EU Digital Product Passport is a structured data record for a physical product: identification, composition,
          sustainability metrics, circularity info and supply-chain data, carried via a QR/data-matrix code under the
          Ecodesign for Sustainable Products Regulation (EU) 2024/1781. Batteries get the first mandatory passport
          (Regulation 2023/1542, from February 2027); textiles and other categories follow via delegated acts.
        </p>
        <p>
          Exporters to the EU will need this data even before the legal deadlines: large retailers already request it in
          supplier onboarding. This playground turns the regulation into a concrete checklist for your actual product.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
