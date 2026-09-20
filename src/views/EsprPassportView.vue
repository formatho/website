<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leaf, QrCode, Copy, Check, Download, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ESPR Digital Product Passport Builder - EU 2024/1781 | Formatho',
  description:
    'Build and validate a Digital Product Passport (DPP) prototype for the EU Ecodesign for Sustainable Products Regulation: identification, Article 7 sustainability parameters, operator data, QR data carrier, JSON export. Free, client-side.',
  keywords: ['espr digital product passport', 'dpp builder', 'ecodesign for sustainable products regulation', 'eu 2024/1781', 'product passport generator', 'dpp json', 'espr readiness'],
  ogType: 'website'
})

// ─── Passport model ───
const passport = ref({
  // Identification (Art. 9)
  uniqueCode: 'DPP-2026-000042-A7F3',
  gtin: '09506000134352',
  commodityCode: '6109100000',
  productName: 'Example Cotton T-Shirt',
  model: 'TS-CLASSIC-001',
  brand: 'Example Brand',
  // Operator (Art. 9(b))
  operatorName: 'Example Apparel GmbH',
  operatorVat: 'DE123456789',
  operatorAddress: 'Musterstraße 1, 10115 Berlin, Germany',
  operatorContact: 'compliance@example.com',
  // Article 7 sustainability parameters
  durability: 'Designed for ≥ 50 wash cycles (tested per ISO 6330)',
  energyUse: '',
  waterUse: '2 700 L/kg cotton (cradle-to-gate literature estimate)',
  recycledContent: '15',
  reparability: 'Not repairable — textile consumer good; care instructions provided',
  substancesOfConcern: 'None present above 0.1% w/w (Candidate List checked 2026-09)',
  carbonFootprint: '7.5 kg CO2e per unit (cradle-to-gate, ISO 14067)',
  endOfLife: 'Separate textile collection; monomaterial for recyclability',
  // Supply chain
  facilities: 'Cut & sew: TR-TR001 (Izmir); Fabric mill: TR-TR002 (Bursa)',
  // Data carrier / resolution
  resolverUrl: 'https://dpp.example-brand.com/passport/DPP-2026-000042-A7F3'
})

interface FieldDef {
  key: keyof typeof passport.value
  label: string
  critical: boolean
  check: (v: string) => string | null
}
const gtinCheckDigitValid = (gtin: string): boolean => {
  if (!/^\d{8}$|^\d{12,14}$/.test(gtin)) return false
  const digits = gtin.split('').map(Number)
  const check = digits.pop()!
  let sum = 0
  digits.reverse().forEach((d, i) => { sum += d * (i % 2 === 0 ? 3 : 1) })
  return (10 - (sum % 10)) % 10 === check
}

const FIELDS: FieldDef[] = [
  { key: 'uniqueCode', label: 'Unique passport code', critical: true, check: (v) => (v.length >= 6 ? null : 'a stable unique identifier is required (Art. 9(a))') },
  { key: 'gtin', label: 'GTIN', critical: true, check: (v) => (gtinCheckDigitValid(v) ? null : 'GTIN must be 8 or 12–14 digits with a valid check digit') },
  { key: 'commodityCode', label: 'Commodity code (CN 8-digit)', critical: true, check: (v) => (/^\d{8}$/.test(v) ? null : 'Combined Nomenclature codes are 8 digits') },
  { key: 'productName', label: 'Product name / description', critical: true, check: (v) => (v.trim() ? null : 'required') },
  { key: 'model', label: 'Model / type identifier', critical: false, check: (v) => null },
  { key: 'brand', label: 'Brand', critical: false, check: (v) => null },
  { key: 'operatorName', label: 'Responsible economic operator', critical: true, check: (v) => (v.trim() ? null : 'the EU operator responsible for the passport is required (Art. 9(b))') },
  { key: 'operatorVat', label: 'Operator VAT / registration', critical: true, check: (v) => (v.trim() ? null : 'required for traceability') },
  { key: 'operatorAddress', label: 'Operator address', critical: true, check: (v) => (v.trim() ? null : 'required') },
  { key: 'operatorContact', label: 'Operator contact', critical: false, check: (v) => (v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? 'should be a valid email' : null) },
  { key: 'durability', label: 'Durability / reliability (Art. 7)', critical: false, check: (v) => null },
  { key: 'energyUse', label: 'Energy use / efficiency (Art. 7)', critical: false, check: (v) => null },
  { key: 'waterUse', label: 'Water use (Art. 7)', critical: false, check: (v) => null },
  { key: 'recycledContent', label: 'Recycled content (% by mass)', critical: false, check: (v) => (v === '' ? null : (/^\d+(\.\d+)?$/.test(v) && Number(v) <= 100 ? null : 'percentage 0–100')) },
  { key: 'reparability', label: 'Reparability / maintenance', critical: false, check: (v) => null },
  { key: 'substancesOfConcern', label: 'Substances of concern', critical: false, check: (v) => null },
  { key: 'carbonFootprint', label: 'Carbon / environmental footprint', critical: false, check: (v) => null },
  { key: 'endOfLife', label: 'End-of-life handling', critical: false, check: (v) => null },
  { key: 'facilities', label: 'Supply chain facilities', critical: false, check: (v) => null },
  { key: 'resolverUrl', label: 'Resolver URL (data carrier target)', critical: true, check: (v) => (/^https:\/\/.+\..+/.test(v) ? null : 'must be a valid HTTPS URL — the QR resolves here') }
]

const errors = computed(() => {
  const map: Record<string, string | null> = {}
  for (const f of FIELDS) map[f.key] = f.check(passport.value[f.key])
  return map
})

const criticalTotal = FIELDS.filter((f) => f.critical).length
const criticalDone = FIELDS.filter((f) => f.critical && !errors.value[f.key]).length
const filledCount = FIELDS.filter((f) => String(passport.value[f.key]).trim() !== '').length
const completeness = computed(() => Math.round((criticalDone / criticalTotal) * 100))

const passportJson = computed(() => JSON.stringify({
  schema: 'https://example.org/schemas/dpp/v0.1-draft',
  regulation: '(EU) 2024/1781 — Ecodesign for Sustainable Products Regulation',
  disclaimer: 'Prototype Digital Product Passport. Binding DPP data sets are defined per product group by delegated acts under ESPR.',
  identification: {
    uniquePassportCode: passport.value.uniqueCode,
    gtin: passport.value.gtin,
    commodityCodeCN8: passport.value.commodityCode,
    productName: passport.value.productName,
    model: passport.value.model,
    brand: passport.value.brand
  },
  responsibleEconomicOperator: {
    name: passport.value.operatorName,
    vat: passport.value.operatorVat,
    address: passport.value.operatorAddress,
    contact: passport.value.operatorContact || undefined
  },
  sustainabilityParameters: {
    durability: passport.value.durability || undefined,
    energyUse: passport.value.energyUse || undefined,
    waterUse: passport.value.waterUse || undefined,
    recycledContentPercentByMass: passport.value.recycledContent !== '' ? Number(passport.value.recycledContent) : undefined,
    reparability: passport.value.reparability || undefined,
    substancesOfConcern: passport.value.substancesOfConcern || undefined,
    carbonFootprint: passport.value.carbonFootprint || undefined,
    endOfLife: passport.value.endOfLife || undefined
  },
  supplyChain: {
    facilities: passport.value.facilities || undefined
  },
  dataCarrier: {
    type: 'QR code (GS1 Digital Link or URI per delegated act)',
    resolverUrl: passport.value.resolverUrl
  },
  generatedAt: new Date().toISOString().slice(0, 10)
}, null, 2))

const qrDataUrl = ref('')
watch(() => passport.value.resolverUrl, async (url) => {
  qrDataUrl.value = ''
  if (!/^https:\/\/.+\..+/.test(url)) return
  try {
    const QRCode = (await import('qrcode')).default
    qrDataUrl.value = await QRCode.toDataURL(url, { width: 320, margin: 2, errorCorrectionLevel: 'M' })
  } catch { /* qrcode unavailable */ }
}, { immediate: true })

const copied = ref('')
async function copyJson() {
  try {
    await navigator.clipboard.writeText(passportJson.value)
    copied.value = 'json'
    setTimeout(() => { copied.value = '' }, 1500)
  } catch { /* clipboard unavailable */ }
}
function downloadJson() {
  const blob = new Blob([passportJson.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${passport.value.uniqueCode.replace(/[^a-zA-Z0-9-]/g, '_') || 'dpp'}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-4 space-y-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Leaf class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">ESPR Digital Product Passport Builder</h1>
        <p class="text-xs text-muted-foreground">Prototype and validate a product passport under the EU Ecodesign for Sustainable Products Regulation (2024/1781) — client-side, your data never uploads.</p>
      </div>
      <div class="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck class="w-4 h-4 text-green-600" /> 100% client-side
      </div>
    </div>

    <Tabs default-value="build" class="space-y-3">
      <TabsList>
        <TabsTrigger value="build">Passport</TabsTrigger>
        <TabsTrigger value="export">Export &amp; QR</TabsTrigger>
        <TabsTrigger value="readiness">ESPR readiness</TabsTrigger>
      </TabsList>

      <!-- BUILD -->
      <TabsContent value="build" class="space-y-4">
        <!-- completeness -->
        <Card :class="completeness === 100 ? 'border-green-500/40' : 'border-amber-500/40'">
          <CardContent class="pt-5 flex flex-wrap items-center gap-4">
            <div>
              <p class="text-xs uppercase text-muted-foreground">Critical fields</p>
              <p class="text-2xl font-bold font-mono" :class="completeness === 100 ? 'text-green-600' : 'text-amber-600'">{{ criticalDone }}/{{ criticalTotal }}</p>
            </div>
            <div class="h-2 flex-1 min-w-[120px] bg-muted rounded-full overflow-hidden">
              <div class="h-full transition-all" :class="completeness === 100 ? 'bg-green-500' : 'bg-amber-500'" :style="{ width: completeness + '%' }" />
            </div>
            <p class="text-xs text-muted-foreground">{{ filledCount }}/{{ FIELDS.length }} fields filled</p>
          </CardContent>
        </Card>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Identification — Art. 9</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <div v-for="f in FIELDS.filter(x => ['uniqueCode','gtin','commodityCode','productName','model','brand'].includes(x.key))" :key="f.key">
                <label class="text-xs text-muted-foreground mb-1 block">
                  {{ f.label }} <span v-if="f.critical" class="text-red-500">*</span>
                </label>
                <Input v-model="passport[f.key]" class="font-mono text-xs h-9" :aria-label="f.label" />
                <p v-if="errors[f.key]" class="text-[10px] text-red-500 mt-0.5">{{ errors[f.key] }}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Responsible operator — Art. 9(b)</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <div v-for="f in FIELDS.filter(x => ['operatorName','operatorVat','operatorAddress','operatorContact'].includes(x.key))" :key="f.key">
                <label class="text-xs text-muted-foreground mb-1 block">
                  {{ f.label }} <span v-if="f.critical" class="text-red-500">*</span>
                </label>
                <Input v-model="passport[f.key]" class="font-mono text-xs h-9" :aria-label="f.label" />
                <p v-if="errors[f.key]" class="text-[10px] text-red-500 mt-0.5">{{ errors[f.key] }}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Sustainability parameters — Art. 7</CardTitle></CardHeader>
          <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="f in FIELDS.filter(x => ['durability','energyUse','waterUse','recycledContent','reparability','substancesOfConcern','carbonFootprint','endOfLife'].includes(x.key))" :key="f.key">
              <label class="text-xs text-muted-foreground mb-1 block">{{ f.label }}</label>
              <Input v-model="passport[f.key]" class="font-mono text-xs h-9" :aria-label="f.label" />
              <p v-if="errors[f.key]" class="text-[10px] text-red-500 mt-0.5">{{ errors[f.key] }}</p>
            </div>
          </CardContent>
        </Card>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Supply chain &amp; data carrier</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <div v-for="f in FIELDS.filter(x => ['facilities','resolverUrl'].includes(x.key))" :key="f.key">
                <label class="text-xs text-muted-foreground mb-1 block">
                  {{ f.label }} <span v-if="f.critical" class="text-red-500">*</span>
                </label>
                <Input v-model="passport[f.key]" class="font-mono text-xs h-9" :aria-label="f.label" />
                <p v-if="errors[f.key]" class="text-[10px] text-red-500 mt-0.5">{{ errors[f.key] }}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Field status</CardTitle></CardHeader>
            <CardContent>
              <ul class="space-y-1.5 text-xs">
                <li v-for="f in FIELDS" :key="'s' + f.key" class="flex items-center gap-2">
                  <CheckCircle2 v-if="String(passport[f.key]).trim() && !errors[f.key]" class="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <AlertCircle v-else-if="f.critical" class="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <AlertCircle v-else class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span :class="f.critical ? 'text-foreground' : 'text-muted-foreground'">{{ f.label }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- EXPORT -->
      <TabsContent value="export" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium">Passport JSON</CardTitle>
            <div class="flex gap-2 mt-2">
              <Button variant="outline" size="sm" class="h-7 text-xs" @click="copyJson">
                <Check v-if="copied === 'json'" class="w-3.5 h-3.5 mr-1 text-green-600" />
                <Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy
              </Button>
              <Button variant="outline" size="sm" class="h-7 text-xs" @click="downloadJson">
                <Download class="w-3.5 h-3.5 mr-1" /> Download .json
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre class="text-[10px] font-mono whitespace-pre-wrap break-all border border-border rounded-lg p-3 max-h-[460px] overflow-y-auto bg-muted/20 m-0">{{ passportJson }}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium flex items-center gap-1.5"><QrCode class="w-4 h-4 text-primary" /> Data carrier (QR)</CardTitle></CardHeader>
          <CardContent class="space-y-3">
            <div v-if="qrDataUrl" class="flex flex-col items-center gap-2">
              <img :src="qrDataUrl" alt="Digital Product Passport QR code" width="320" height="320" class="border border-border rounded-lg bg-white p-2" />
              <a :href="qrDataUrl" download="dpp-qr.png" class="text-xs text-primary hover:underline">Download PNG</a>
            </div>
            <p v-else class="text-xs text-muted-foreground py-8 text-center">Enter a valid HTTPS resolver URL to render the data carrier.</p>
            <p class="text-[10px] text-muted-foreground leading-relaxed">
              ESPR requires a data carrier physically on the product (Art. 8(4)); QR codes are the expected default. The QR encodes the resolver URL — the passport JSON is served from your infrastructure at that address. Pair it with the <RouterLink to="/tools/gs1-digital-link" class="text-primary hover:underline">GS1 Digital Link builder</RouterLink> if you identify products with GS1 keys, and check the <RouterLink to="/tools/dpp-playground" class="text-primary hover:underline">DPP Playground</RouterLink> for an industry-specific gap analysis of your existing documents.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- READINESS -->
      <TabsContent value="readiness" class="space-y-4">
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Where ESPR stands</CardTitle></CardHeader>
          <CardContent class="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p><strong class="text-foreground">In force 18 July 2024.</strong> Regulation (EU) 2024/1781 replaces the ecodesign directive with a regulation covering nearly all physical goods placed on the EU market. Requirements arrive product group by product group through delegated acts, preceded by a working plan prioritising the first groups.</p>
            <p><strong class="text-foreground">Digital Product Passport (Arts. 8–10).</strong> Each regulated product will carry a data carrier (expected: QR) linking to passport data: identification, the responsible economic operator, and the Article 7 parameter values applicable to that product group (durability, energy, water, recycled content, reparability, substances of concern, environmental footprint, and more). Access is role-based — consumers see a subset; recyclers, market surveillance, and repairers see more.</p>
            <p><strong class="text-foreground">Interoperability.</strong> Passports must be machine-readable, structured, and discoverable via standards being developed with initiatives such as CEN/CENELEC and industry programs (including the WBCSD work this tool accompanies). This builder follows the regulation's core structure so you can prototype data flows now — the binding field-level data sets come from each delegated act.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Preparation checklist</CardTitle></CardHeader>
          <CardContent>
            <ul class="space-y-2 text-xs text-muted-foreground">
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Assign the responsible economic operator for each product line (EU presence is mandatory).</li>
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Inventory product identification: GTINs, commodity codes, model identifiers — clean them now.</li>
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Collect Article 7 parameter data per product: recycled content by mass, footprint studies, reparability documentation, substance screenings (cross-check the SCIP/Candidate List).</li>
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Map supply-chain facilities and unique identifiers for traceability entries.</li>
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Stand up a resolver: stable HTTPS URLs per passport, able to serve structured data and role-based views.</li>
              <li class="flex gap-2"><CheckCircle2 class="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Prototype the data carrier: QR on product or packaging, scannable at consumer distance.</li>
            </ul>
          </CardContent>
        </Card>

        <Card class="border-amber-500/30">
          <CardContent class="pt-5 flex items-start gap-2">
            <AlertCircle class="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <p class="text-xs text-muted-foreground leading-relaxed">
              This tool produces a <strong>prototype</strong> structured after the regulation's articles — it is not a delegated-act-conformant passport, and no validator can be until those acts land. Use it to mobilise data collection and resolver design today; treat the JSON as a draft schema for your engineering spikes.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
