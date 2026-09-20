<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shirt, Download, Copy, Check, ShieldCheck } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Textile DPP Builder — EU Digital Product Passport | Formatho',
  description:
    'Build a textile-specific Digital Product Passport: fiber composition, recycled content, country of origin, chemical treatments, care instructions. Free, client-side.',
  keywords: ['textile dpp builder', 'textile digital product passport', 'espr textile regulation', 'clothing passport eu', 'apparel dpp', 'fibre composition dpp', 'textile sustainability data'],
  ogType: 'website'
})

const form = ref({
  productName: '', gtin: '', brand: '', model: '',
  fiberComposition: [{ fiber: 'Cotton', pct: 80 }, { fiber: 'Elastane', pct: 20 }],
  recycledContent: [{ material: 'Cotton', pct: 0 }, { material: 'PET', pct: 0 }],
  countryOfOrigin: '', countryOfManufacture: '',
  chemicalTreatments: [] as string[],
  careInstructions: '',
  durabilityCycles: 30,
  expectedLifetimeYears: 2,
  carbonFootprint: 0,
  waterUse: 0,
  resolverUrl: ''
})

const chemicalOptions = ['Water repellent (PFC-free)', 'Water repellent (PFC-containing)', 'Flame retardant', 'Antimicrobial', 'Stain resistant', 'Anti-wrinkle', 'Dye - reactive', 'Dye - pigment', 'Printing - digital', 'Printing - screen']

function toggleChemical(c: string) {
  const i = form.value.chemicalTreatments.indexOf(c)
  if (i >= 0) form.value.chemicalTreatments.splice(i, 1)
  else form.value.chemicalTreatments.push(c)
}

function addFiber() { form.value.fiberComposition.push({ fiber: '', pct: 0 }) }

const totalFiberPct = computed(() => form.value.fiberComposition.reduce((s, f) => s + (Number(f.pct) || 0), 0))

const textileDpp = computed(() => JSON.stringify({
  schema: 'textile-dpp/v0.1-draft',
  regulation: '(EU) 2024/1781 — ESPR (textile delegated act expected 2027)',
  identification: {
    productName: form.value.productName || undefined,
    gtin: form.value.gtin || undefined,
    brand: form.value.brand || undefined,
    model: form.value.model || undefined
  },
  composition: {
    fibers: form.value.fiberComposition.filter(f => f.fiber).map(f => ({ type: f.fiber, percentByMass: f.pct })),
    totalPercent: totalFiberPct.value
  },
  recycledContent: form.value.recycledContent.filter(r => r.pct > 0).map(r => ({ material: r.material, percent: r.pct })) || undefined,
  origin: {
    countryOfOrigin: form.value.countryOfOrigin || undefined,
    countryOfManufacture: form.value.countryOfManufacture || undefined
  },
  chemicalTreatments: form.value.chemicalTreatments.length ? form.value.chemicalTreatments : undefined,
  care: { instructions: form.value.careInstructions || undefined },
  sustainability: {
    durability: { washCycles: form.value.durabilityCycles, expectedLifetimeYears: form.value.expectedLifetimeYears },
    carbonFootprintKgCO2e: form.value.carbonFootprint || undefined,
    waterUseLitres: form.value.waterUse || undefined
  },
  dataCarrier: form.value.resolverUrl ? { type: 'QR code', resolverUrl: form.value.resolverUrl } : undefined
}, null, 2))

function download() {
  const blob = new Blob([textileDpp.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'textile-dpp.json'
  a.click()
  URL.revokeObjectURL(a.href)
}
const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(textileDpp.value)
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-4 space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg"><Shirt class="w-5 h-5 text-primary" /></div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">Textile DPP Builder</h1>
          <p class="text-xs text-muted-foreground">Fiber composition, recycled content, chemicals, care — the textile-specific passport fields. Free, client-side.</p>
        </div>
      </div>
      <span class="flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck class="w-4 h-4 text-green-600" /> Nothing uploads</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Identification -->
      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Identification</h2>
          <Input v-model="form.productName" class="h-9 text-sm" placeholder="Product name (e.g. Organic Cotton T-Shirt)" aria-label="Product name" />
          <Input v-model="form.gtin" class="h-9 font-mono text-sm" placeholder="GTIN (14 digits)" aria-label="GTIN" />
          <div class="grid grid-cols-2 gap-2">
            <Input v-model="form.brand" class="h-9 text-sm" placeholder="Brand" aria-label="Brand" />
            <Input v-model="form.model" class="h-9 text-sm" placeholder="Model / style code" aria-label="Model" />
          </div>
        </CardContent>
      </Card>

      <!-- Origin -->
      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Origin & Manufacturing</h2>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-muted-foreground">Country of origin (materials)</label>
              <Input v-model="form.countryOfOrigin" class="h-9 text-sm" placeholder="IN" aria-label="Country of origin" />
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Country of manufacture</label>
              <Input v-model="form.countryOfManufacture" class="h-9 text-sm" placeholder="BD" aria-label="Country of manufacture" />
            </div>
          </div>
          <div>
            <label class="text-[10px] text-muted-foreground">Care instructions</label>
            <Input v-model="form.careInstructions" class="h-9 text-sm" placeholder="Machine wash 30°C, do not tumble dry" aria-label="Care instructions" />
          </div>
        </CardContent>
      </Card>

      <!-- Fiber composition -->
      <Card>
        <CardContent class="pt-5 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold">Fiber composition</h2>
            <span class="text-xs font-mono" :class="totalFiberPct === 100 ? 'text-green-600' : 'text-amber-600'">{{ totalFiberPct }}%</span>
          </div>
          <div v-for="(f, i) in form.fiberComposition" :key="i" class="flex gap-2">
            <Input v-model="f.fiber" class="h-8 text-xs flex-1" :placeholder="`Fiber ${i + 1}`" aria-label="Fiber type" />
            <Input v-model.number="f.pct" type="number" min="0" max="100" class="h-8 text-xs w-20" placeholder="%" aria-label="Percentage" />
          </div>
          <Button size="sm" variant="ghost" class="text-xs" @click="addFiber">+ Add fiber</Button>
        </CardContent>
      </Card>

      <!-- Sustainability -->
      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Sustainability & Durability</h2>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-muted-foreground">Durability (wash cycles to failure)</label>
              <Input v-model.number="form.durabilityCycles" type="number" min="1" class="h-8 text-xs" aria-label="Wash cycles" />
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Expected lifetime (years)</label>
              <Input v-model.number="form.expectedLifetimeYears" type="number" min="0.5" step="0.5" class="h-8 text-xs" aria-label="Lifetime years" />
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Carbon footprint (kg CO₂e)</label>
              <Input v-model.number="form.carbonFootprint" type="number" min="0" step="0.1" class="h-8 text-xs" aria-label="Carbon footprint" />
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Water use (litres)</label>
              <Input v-model.number="form.waterUse" type="number" min="0" class="h-8 text-xs" aria-label="Water use" />
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] text-muted-foreground">Recycled content (%)</label>
            <div v-for="(r, i) in form.recycledContent" :key="i" class="flex gap-2">
              <Input v-model="r.material" class="h-8 text-xs flex-1" aria-label="Recycled material" />
              <Input v-model.number="r.pct" type="number" min="0" max="100" class="h-8 text-xs w-20" aria-label="Recycled percentage" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Chemical treatments -->
      <Card class="lg:col-span-2">
        <CardContent class="pt-5">
          <h2 class="text-sm font-semibold mb-3">Chemical treatments</h2>
          <div class="flex flex-wrap gap-2">
            <button v-for="c in chemicalOptions" :key="c"
              class="text-xs px-3 py-1.5 rounded-full border transition-colors"
              :class="form.chemicalTreatments.includes(c) ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border text-muted-foreground hover:border-foreground/30'"
              @click="toggleChemical(c)">{{ c }}</button>
          </div>
        </CardContent>
      </Card>

      <!-- Resolver -->
      <Card class="lg:col-span-2">
        <CardContent class="pt-5">
          <label class="text-xs text-muted-foreground mb-1 block">Resolver URL (for the QR data carrier)</label>
          <Input v-model="form.resolverUrl" class="h-9 font-mono text-sm" placeholder="https://dpp.yourbrand.com/passport/…" aria-label="Resolver URL" />
        </CardContent>
      </Card>
    </div>

    <!-- Output -->
    <Card class="border-primary/30">
      <CardContent class="pt-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Textile DPP JSON</h2>
          <div class="flex gap-2">
            <Button size="sm" variant="ghost" @click="copy"><Check v-if="copied" class="w-3.5 h-3.5 mr-1 text-green-600" /><Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy</Button>
            <Button size="sm" variant="outline" @click="download"><Download class="w-3.5 h-3.5 mr-1" /> Download</Button>
          </div>
        </div>
        <pre class="text-[10px] font-mono whitespace-pre-wrap border border-border rounded-lg p-3 max-h-96 overflow-y-auto bg-muted/20 m-0">{{ textileDpp }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
