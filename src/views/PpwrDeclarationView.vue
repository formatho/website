<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Download, Copy, Check } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'PPWR Declaration of Conformity Generator | Formatho',
  description:
    'Generate an EU Declaration of Conformity for packaging under PPWR Regulation (EU) 2025/40, structured per Annex VIII. Free, client-side.',
  keywords: ['ppwr declaration of conformity', 'eu packaging regulation 2025/40', 'packaging doc generator', 'ppwr annex viii', 'eu declaration of conformity packaging', 'packaging compliance'],
  ogType: 'website'
})

const form = ref({
  manufacturerName: '', manufacturerAddress: '',
  packagingType: 'Primary (sales packaging)',
  material: 'Plastic', recyclabilityClaim: true,
  contactName: '', contactEmail: '',
  standards: ['EN 13430 (recyclability)', 'EN 13427 (requirements)'],
  placeOfIssue: '', dateOfIssue: new Date().toISOString().slice(0, 10)
})

const materialOptions = ['Plastic', 'Paper/Cardboard', 'Metal', 'Glass', 'Wood', 'Composite', 'Multi-material']
const typeOptions = ['Primary (sales packaging)', 'Secondary (grouped)', 'Tertiary (transport)', 'Transport packaging >40L', 'Household composite']

const declaration = computed(() => `EU DECLARATION OF CONFORMITY
Packaging and Packaging Waste Regulation (PPWR)
Regulation (EU) 2025/40 — Annex VIII

1. Packaging type: ${form.value.packagingType}

2. Model / identification: [model or product reference]

3. Manufacturer:
   Name: ${form.value.manufacturerName || '[legal name]'}
   Address: ${form.value.manufacturerAddress || '[registered address]'}
   Established in the EU

4. This declaration of conformity is issued under the sole responsibility of the manufacturer.

5. The object of the declaration described above is in conformity with the relevant Union legislation:
   Regulation (EU) 2025/40 of the European Parliament and of the Council
   of 19 December 2024 on packaging and packaging waste

6. References to the harmonised standards or technical specifications applied:
   ${form.value.standards.filter(Boolean).join('\n   ')}

7. Notified body: [if applicable, name, number, certificate reference]
   [or state: Not applicable — self-declaration]

8. Additional information:
   Material: ${form.value.material}
   Recyclability design for recycling criteria: ${form.value.recyclabilityClaim ? 'considered' : 'not yet assessed'}
   The packaging is designed for reuse/recycling in accordance with Article 8 of the PPWR.

Signed for and on behalf of:
${form.value.manufacturerName || '[manufacturer name]'}
${form.value.placeOfIssue || '[place of issue]'}, ${form.value.dateOfIssue}
${form.value.contactName || '[name, function]'}
${form.value.contactEmail || '[email]'}`)

function download() {
  const blob = new Blob([declaration.value], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'ppwr-declaration-of-conformity.txt'
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
      <div class="p-1.5 bg-primary/10 rounded-lg"><Package class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">PPWR Declaration of Conformity</h1>
        <p class="text-xs text-muted-foreground">Generate a packaging DoC per PPWR Regulation (EU) 2025/40, Annex VIII. Free, client-side.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Manufacturer</h2>
          <Input v-model="form.manufacturerName" class="h-9 text-sm" placeholder="Legal name" aria-label="Manufacturer name" />
          <Input v-model="form.manufacturerAddress" class="h-9 text-sm" placeholder="Registered address" aria-label="Manufacturer address" />
          <div class="grid grid-cols-2 gap-2">
            <Input v-model="form.contactName" class="h-9 text-sm" placeholder="Signatory name" aria-label="Signatory" />
            <Input v-model="form.contactEmail" type="email" class="h-9 text-sm" placeholder="Email" aria-label="Contact email" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-5 space-y-3">
          <h2 class="text-sm font-semibold">Packaging details</h2>
          <div>
            <label class="text-[10px] text-muted-foreground">Packaging type</label>
            <select v-model="form.packagingType" class="w-full h-9 rounded-md border border-input bg-background px-2 text-sm" aria-label="Packaging type">
              <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] text-muted-foreground">Material</label>
            <select v-model="form.material" class="w-full h-9 rounded-md border border-input bg-background px-2 text-sm" aria-label="Material">
              <option v-for="m in materialOptions" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <input v-model="form.recyclabilityClaim" type="checkbox" id="recyclability" class="rounded" />
            <label for="recyclability">Design for recycling criteria considered</label>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-muted-foreground">Place of issue</label>
              <Input v-model="form.placeOfIssue" class="h-9 text-sm" placeholder="Berlin" aria-label="Place of issue" />
            </div>
            <div>
              <label class="text-[10px] text-muted-foreground">Date</label>
              <Input v-model="form.dateOfIssue" type="date" class="h-9 text-sm" aria-label="Date of issue" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card class="border-primary/30">
      <CardContent class="pt-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Declaration preview</h2>
          <div class="flex gap-2">
            <Button size="sm" variant="ghost" @click="copy"><Check v-if="copied" class="w-3.5 h-3.5 mr-1 text-green-600" /><Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy</Button>
            <Button size="sm" variant="outline" @click="download"><Download class="w-3.5 h-3.5 mr-1" /> Download</Button>
          </div>
        </div>
        <pre class="text-[10px] font-mono whitespace-pre-wrap border border-border rounded-lg p-4 max-h-96 overflow-y-auto bg-muted/20 m-0">{{ declaration }}</pre>
        <p class="text-[10px] text-muted-foreground">Prototype structured after Annex VIII of Regulation (EU) 2025/40. Verify against the published regulation text and your notified body's requirements before signing.</p>
      </CardContent>
    </Card>
  </div>
</template>
