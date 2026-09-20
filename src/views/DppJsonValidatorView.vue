<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileJson, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DPP JSON Validator — Digital Product Passport | Formatho',
  description:
    'Validate a Digital Product Passport JSON payload: check required fields, sustainability parameters, operator data, and data carrier. Free, client-side, nothing uploads.',
  keywords: ['dpp validator', 'digital product passport json', 'validate dpp data', 'espr passport schema', 'dpp structure check', 'passport data validation'],
  ogType: 'website'
})

const input = ref('')
const copied = ref(false)

interface FieldCheck { path: string; expected: string; status: 'ok' | 'missing' | 'invalid' | 'warn'; message?: string }

const results = ref<FieldCheck[] | null>(null)
const parseError = ref('')
const passportData = ref<Record<string, unknown> | null>(null)

const SAMPLE = JSON.stringify({
  identification: {
    uniquePassportCode: 'DPP-2026-000042',
    gtin: '09506000134352',
    commodityCodeCN8: '8507600090',
    productName: 'Li-ion Traction Battery Pack 60kWh',
    model: 'BP-60-LFP',
    brand: 'Example Motors'
  },
  operator: {
    name: 'Example Battery GmbH',
    vatNumber: 'DE123456789',
    address: 'Industriestrasse 1, 10115 Berlin, Germany',
    contactEmail: 'compliance@example.com'
  },
  batteryPassport: {
    category: 'EV',
    chemistry: 'LFP',
    ratedCapacityAh: 160,
    ratedVoltageV: 400,
    weightKg: 420,
    carbonFootprint: {
      valueKgCO2ePerKWh: 62,
      performanceClass: 'B',
      methodologyVersion: '2026-1'
    },
    recycledContent: {
      cobaltPct: 16,
      lithiumPct: 6,
      nickelPct: 6
    },
    criticalRawMaterials: ['lithium', 'cobalt', 'natural graphite'],
    countryOfOrigin: { lithium: 'CL', cobalt: 'CD', graphite: 'CN' },
    expectedLifetime: { cycles: 3000, years: 10 },
    stateOfHealthProtocol: 'ISO 15118-4 via OBD-II port'
  },
  conformity: {
    declarationOfConformity: 'DoC-2026-DE-00042',
    ceMarking: true,
    safetyTestReferences: ['UN38.3-2026-0123', 'IEC62660-1'],
    dueDiligencePolicy: 'DDP-2026-EXAMPLE'
  },
  circularity: {
    dismantlingInstructions: 'https://example.com/dismantle/BP-60',
    recyclingProcess: 'hydrometallurgical',
    recoveryRates: { cobaltPct: 90, lithiumPct: 70, nickelPct: 95 },
    secondLifeSuitability: 'suitable_for_stationary_storage'
  },
  dataCarrier: {
    type: 'QR code (GS1 Digital Link)',
    resolverUrl: 'https://dpp.example-motors.com/passport/DPP-2026-000042'
  }
}, null, 2)

const RULES: Array<{ path: string; check: (d: Record<string, unknown>) => 'ok' | 'missing' | 'invalid' | 'warn'; expected: string; hint?: string }> = [
  { path: 'identification', check: d => d.identification ? 'ok' : 'missing', expected: 'object', hint: 'GTIN, model, serial, commodity code' },
  { path: 'identification.uniquePassportCode', check: d => (d.identification as any)?.uniquePassportCode ? 'ok' : 'missing', expected: 'string — unique passport ID' },
  { path: 'identification.gtin', check: d => {
      const g = (d.identification as any)?.gtin
      if (!g) return 'missing'
      if (!/^\d{8}$|^\d{12,14}$/.test(String(g))) return 'invalid'
      return 'ok'
    }, expected: '8 or 12-14 digit GTIN', hint: 'Must have valid check digit' },
  { path: 'identification.productName', check: d => (d.identification as any)?.productName ? 'ok' : 'missing', expected: 'string — product description' },
  { path: 'operator', check: d => d.operator ? 'ok' : 'missing', expected: 'object', hint: 'EU economic operator' },
  { path: 'operator.name', check: d => (d.operator as any)?.name ? 'ok' : 'missing', expected: 'string — legal name' },
  { path: 'operator.vatNumber', check: d => (d.operator as any)?.vatNumber || (d.operator as any)?.vat ? 'ok' : 'missing', expected: 'string — VAT/registration' },
  { path: 'operator.address', check: d => (d.operator as any)?.address ? 'ok' : 'missing', expected: 'string — registered address' },
  { path: 'batteryPassport', check: d => d.batteryPassport ? 'ok' : (d.identification ? 'warn' : 'missing'), expected: 'object (battery products)', hint: 'Required for batteries; optional for other products' },
  { path: 'batteryPassport.chemistry', check: d => (d.batteryPassport as any)?.chemistry ? 'ok' : 'missing', expected: 'string (NMC, LFP, NCA…)' },
  { path: 'batteryPassport.ratedCapacityAh', check: d => {
      const v = (d.batteryPassport as any)?.ratedCapacityAh
      if (v === undefined) return 'missing'
      if (typeof v !== 'number' || v <= 0) return 'invalid'
      return 'ok'
    }, expected: 'number > 0' },
  { path: 'batteryPassport.ratedVoltageV', check: d => {
      const v = (d.batteryPassport as any)?.ratedVoltageV
      if (v === undefined) return 'missing'
      if (typeof v !== 'number' || v <= 0) return 'invalid'
      return 'ok'
    }, expected: 'number > 0' },
  { path: 'batteryPassport.weightKg', check: d => {
      const v = (d.batteryPassport as any)?.weightKg
      if (v === undefined) return 'missing'
      if (typeof v !== 'number' || v <= 0) return 'invalid'
      return 'ok'
    }, expected: 'number > 0' },
  { path: 'batteryPassport.carbonFootprint', check: d => (d.batteryPassport as any)?.carbonFootprint ? 'ok' : 'missing', expected: 'object', hint: 'Mandatory for batteries from Feb 2027' },
  { path: 'batteryPassport.carbonFootprint.valueKgCO2ePerKWh', check: d => {
      const v = (d.batteryPassport as any)?.carbonFootprint?.valueKgCO2ePerKWh
      if (v === undefined) return 'missing'
      if (typeof v !== 'number' || v < 0) return 'invalid'
      return 'ok'
    }, expected: 'number ≥ 0 (kg CO2e/kWh)' },
  { path: 'batteryPassport.recycledContent', check: d => (d.batteryPassport as any)?.recycledContent ? 'ok' : 'missing', expected: 'object — recycled share per material' },
  { path: 'batteryPassport.criticalRawMaterials', check: d => Array.isArray((d.batteryPassport as any)?.criticalRawMaterials) && (d.batteryPassport as any).criticalRawMaterials.length > 0 ? 'ok' : 'missing', expected: 'array — CRM list' },
  { path: 'batteryPassport.countryOfOrigin', check: d => (d.batteryPassport as any)?.countryOfOrigin ? 'ok' : 'missing', expected: 'object — CRM countries' },
  { path: 'batteryPassport.expectedLifetime', check: d => (d.batteryPassport as any)?.expectedLifetime ? 'ok' : 'missing', expected: 'object — cycles/years' },
  { path: 'conformity', check: d => d.conformity ? 'ok' : 'missing', expected: 'object' },
  { path: 'conformity.ceMarking', check: d => (d.conformity as any)?.ceMarking === true ? 'ok' : 'missing', expected: 'boolean — true' },
  { path: 'conformity.safetyTestReferences', check: d => Array.isArray((d.conformity as any)?.safetyTestReferences) && (d.conformity as any).safetyTestReferences.length > 0 ? 'ok' : 'missing', expected: 'array of test report refs' },
  { path: 'circularity', check: d => d.circularity ? 'ok' : 'warn', expected: 'object', hint: 'End-of-life and recycling data' },
  { path: 'dataCarrier', check: d => d.dataCarrier ? 'ok' : 'missing', expected: 'object', hint: 'QR code + resolver URL — Art. 8(4)' },
  { path: 'dataCarrier.resolverUrl', check: d => {
      const u = (d.dataCarrier as any)?.resolverUrl
      if (!u) return 'missing'
      if (!/^https:\/\/.+\..+/.test(String(u))) return 'invalid'
      return 'ok'
    }, expected: 'https URL — passport resolver' },
]

function validate() {
  parseError.value = ''
  results.value = null
  passportData.value = null
  if (!input.value.trim()) return
  try {
    const data = JSON.parse(input.value)
    passportData.value = data
    results.value = RULES.map(r => ({
      path: r.path,
      expected: r.expected,
      status: r.check(data),
      message: r.hint
    }))
  } catch (e) {
    parseError.value = 'Invalid JSON: ' + (e as Error).message
  }
}

const summary = computed(() => {
  if (!results.value) return null
  const ok = results.value.filter(r => r.status === 'ok').length
  const missing = results.value.filter(r => r.status === 'missing').length
  const invalid = results.value.filter(r => r.status === 'invalid').length
  const warn = results.value.filter(r => r.status === 'warn').length
  return { ok, missing, invalid, warn, total: results.value.length }
})

async function copyJson() {
  try {
    await navigator.clipboard.writeText(input.value)
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-4 space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg"><FileJson class="w-5 h-5 text-primary" /></div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">DPP JSON Validator</h1>
          <p class="text-xs text-muted-foreground">Validate a Digital Product Passport payload against the expected structure. Free, client-side.</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck class="w-4 h-4 text-green-600" /> Nothing uploads</span>
        <Button variant="outline" size="sm" @click="input = SAMPLE">Sample</Button>
      </div>
    </div>

    <Tabs default-value="input" class="space-y-3">
      <TabsList>
        <TabsTrigger value="input">Input</TabsTrigger>
        <TabsTrigger value="results" :disabled="!results">Results ({{ summary?.ok || 0 }}/{{ summary?.total || 0 }})</TabsTrigger>
      </TabsList>

      <TabsContent value="input" class="space-y-3">
        <Card>
          <CardContent class="pt-5 space-y-3">
            <textarea
              v-model="input"
              rows="16"
              class="w-full font-mono text-xs p-3 border border-border rounded-lg bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder='Paste your DPP JSON payload here…'
              aria-label="DPP JSON to validate"
              spellcheck="false"
            />
            <div class="flex items-center gap-3">
              <Button size="sm" :disabled="!input.trim()" @click="validate">Validate DPP</Button>
              <Button v-if="input" size="sm" variant="ghost" @click="copyJson">
                <Check v-if="copied" class="w-3.5 h-3.5 mr-1 text-green-600" />
                <Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy
              </Button>
            </div>
            <p v-if="parseError" class="text-xs text-red-600 font-mono">{{ parseError }}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="results" class="space-y-3">
        <!-- Summary -->
        <Card v-if="summary" :class="summary.invalid === 0 && summary.missing < 3 ? 'border-green-500/50' : 'border-amber-500/40'">
          <CardContent class="pt-5">
            <div class="flex flex-wrap gap-6 text-sm">
              <div><span class="text-2xl font-bold font-mono text-green-600">{{ summary.ok }}</span> <span class="text-muted-foreground">valid</span></div>
              <div><span class="text-2xl font-bold font-mono text-red-500">{{ summary.missing }}</span> <span class="text-muted-foreground">missing</span></div>
              <div><span class="text-2xl font-bold font-mono text-red-600">{{ summary.invalid }}</span> <span class="text-muted-foreground">invalid</span></div>
              <div><span class="text-2xl font-bold font-mono text-amber-500">{{ summary.warn }}</span> <span class="text-muted-foreground">warnings</span></div>
            </div>
          </CardContent>
        </Card>

        <!-- Field checks -->
        <div class="space-y-1">
          <div v-for="r in results" :key="r.path"
            class="flex items-start gap-3 p-2.5 border rounded-lg"
            :class="{
              'bg-green-500/5 border-green-500/20': r.status === 'ok',
              'bg-red-500/5 border-red-500/20': r.status === 'missing' || r.status === 'invalid',
              'bg-amber-500/5 border-amber-500/20': r.status === 'warn'
            }">
            <component :is="r.status === 'ok' ? CheckCircle2 : AlertCircle" class="w-4 h-4 shrink-0 mt-0.5"
              :class="{ 'text-green-600': r.status === 'ok', 'text-red-500': r.status === 'missing' || r.status === 'invalid', 'text-amber-500': r.status === 'warn' }" />
            <div class="min-w-0 flex-1">
              <code class="text-xs font-mono font-semibold">{{ r.path }}</code>
              <p class="text-[10px] text-muted-foreground mt-0.5">expected: {{ r.expected }}<span v-if="r.message"> · {{ r.message }}</span></p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
              :class="{
                'bg-green-100 text-green-700': r.status === 'ok',
                'bg-red-100 text-red-600': r.status === 'missing',
                'bg-red-100 text-red-700': r.status === 'invalid',
                'bg-amber-100 text-amber-700': r.status === 'warn'
              }">{{ r.status }}</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>

    <Card>
      <CardContent class="pt-5 text-xs text-muted-foreground leading-relaxed space-y-2">
        <p><strong class="text-foreground">What this validates:</strong> the structural shape of a Digital Product Passport under ESPR (Regulation 2024/1781) — identification, operator, battery-specific data (Annex XIII), conformity, circularity, and the data carrier. The binding field-level schema will come via delegated acts per product group.</p>
        <p>Build a passport with the <RouterLink to="/tools/espr-passport" class="text-primary underline underline-offset-2">ESPR builder</RouterLink>, check your readiness with the <RouterLink to="/tools/battery-passport-checklist" class="text-primary underline underline-offset-2">Battery Passport checklist</RouterLink>, or encode the QR with the <RouterLink to="/tools/gs1-digital-link" class="text-primary underline underline-offset-2">GS1 Digital Link builder</RouterLink>.</p>
      </CardContent>
    </Card>
  </div>
</template>
