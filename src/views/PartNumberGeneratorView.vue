<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Hash } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Intelligent Part Number Generator | Formatho',
  description: 'Generate intelligent part numbers with configurable category, type, and sequence codes. Batch generation, uniqueness check, CSV export. Free, client-side.',
  keywords: ['part number generator', 'intelligent part number', 'pn format', 'part numbering system', 'categorised part numbers'],
  ogType: 'website'
})

const categoryCode = ref('ELC')
const categoryDesc = ref('Electrical')
const typeCode = ref('RES')
const typeDesc = ref('Resistor')
const sequenceStart = ref(1)
const sequencePad = ref(5)
const batchCount = ref(10)
const separator = ref('-')
const prefix = ref('')

const generated = ref<string[]>([])

const format = computed(() => {
  return `${prefix.value}${prefix.value ? separator.value : ''}${categoryCode.value}${separator.value}${typeCode.value}${separator.value}${String(sequenceStart.value).padStart(sequencePad.value, '0')}`
})

function generate() {
  const results: string[] = []
  const seen = new Set(generated.value)
  let seq = sequenceStart.value
  while (results.length < batchCount.value && results.length < 1000) {
    const num = `${prefix.value}${prefix.value ? separator.value : ''}${categoryCode.value}${separator.value}${typeCode.value}${separator.value}${String(seq).padStart(sequencePad.value, '0')}`
    if (!seen.has(num)) {
      results.push(num)
      seen.add(num)
    }
    seq++
  }
  generated.value = [...generated.value, ...results]
}

function clearAll() { generated.value = [] }

const exportCsv = computed(() => 'part_number\n' + generated.value.join('\n'))

const sampleCategories = [
  { code: 'ELC', desc: 'Electrical', types: ['RES', 'CAP', 'IND', 'IC', 'CON', 'SW', 'LED', 'PCB', 'CBL', 'FUS'] },
  { code: 'MEC', desc: 'Mechanical', types: ['SCR', 'NUT', 'WAS', 'BRK', 'SPR', 'GEA', 'SHF', 'BEA', 'SEA', 'CAS'] },
  { code: 'HYD', desc: 'Hydraulic', types: ['HOSE', 'FIT', 'PMP', 'VLV', 'CYL', 'FLT', 'TUB'] },
  { code: 'PNE', desc: 'Pneumatic', types: ['HOSE', 'FIT', 'VAL', 'CYL', 'FRL', 'SIL'] },
  { code: 'OPT', desc: 'Optical', types: ['LEN', 'MIR', 'FIL', 'PRM', 'DET'] },
  { code: 'CON', desc: 'Consumable', types: ['ADH', 'LUB', 'CLN', 'TAP', 'PAK'] },
]

const currentTypes = computed(() => {
  const cat = sampleCategories.find(c => c.code === categoryCode.value)
  return cat ? cat.types : []
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Hash class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Intelligent Part Number Generator</h1>
        <p class="text-sm text-muted-foreground">Generate categorised part numbers with configurable format</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label>Category code</Label>
            <Input v-model="categoryCode" class="font-mono text-xs uppercase" placeholder="ELC" aria-label="Category code" />
            <div class="flex flex-wrap gap-1">
              <button v-for="cat in sampleCategories" :key="cat.code"
                class="no-btn-hover text-[9px] px-1.5 py-0.5 border border-border rounded-full hover:border-primary/40 transition-colors"
                :class="{ 'bg-primary/10 border-primary/40': categoryCode === cat.code }"
                :title="cat.desc"
                @click="categoryCode = cat.code; categoryDesc = cat.desc; typeCode = cat.types[0]">{{ cat.code }}</button>
            </div>
          </div>
          <div class="grid gap-2">
            <Label>Type code</Label>
            <Input v-model="typeCode" class="font-mono text-xs uppercase" placeholder="RES" aria-label="Type code" />
            <div class="flex flex-wrap gap-1">
              <button v-for="t in currentTypes" :key="t"
                class="no-btn-hover text-[9px] px-1.5 py-0.5 border border-border rounded-full hover:border-primary/40 transition-colors"
                :class="{ 'bg-primary/10 border-primary/40': typeCode === t }"
                @click="typeCode = t">{{ t }}</button>
            </div>
          </div>
          <div class="space-y-3">
            <div class="grid gap-2">
              <Label>Start sequence</Label>
              <Input v-model.number="sequenceStart" type="number" min="1" aria-label="Starting sequence" />
            </div>
            <div class="grid gap-2">
              <Label>Padding</Label>
              <select v-model.number="sequencePad" class="flex h-10 rounded-md border border-input bg-background px-3 text-sm" aria-label="Padding">
                <option>3</option><option>4</option><option>5</option><option>6</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label>Separator</Label>
            <select v-model="separator" class="flex h-10 rounded-md border border-input bg-background px-3 text-sm" aria-label="Separator">
              <option value="-">Hyphen (-)</option>
              <option value=".">Period (.)</option>
              <option value="_">Underscore (_)</option>
              <option value="">None</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Prefix (optional)</Label>
            <Input v-model="prefix" class="font-mono text-xs uppercase" placeholder="ACME" aria-label="Prefix" />
          </div>
          <div class="grid gap-2">
            <Label>Batch count</Label>
            <Input v-model.number="batchCount" type="number" min="1" max="100" aria-label="Batch count" />
          </div>
        </div>

        <div class="p-3 bg-muted/40 rounded-lg border border-border text-center">
          <p class="text-xs text-muted-foreground mb-1">Next part number:</p>
          <p class="font-mono text-lg font-bold">{{ format }}</p>
        </div>

        <div class="flex gap-2">
          <Button @click="generate" :disabled="!categoryCode || !typeCode">Generate {{ batchCount }} numbers</Button>
          <Button variant="outline" @click="clearAll" :disabled="!generated.length">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="generated.length">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">{{ generated.length }} part numbers generated</CardTitle>
        <CopyButton :text="exportCsv" aria-label="Copy as CSV" />
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-1">
          <div v-for="pn in generated" :key="pn" class="flex items-center justify-between gap-1 p-1.5 border border-border rounded text-xs">
            <code class="font-mono font-semibold">{{ pn }}</code>
            <CopyButton :text="pn" variant="ghost" :aria-label="'Copy ' + pn" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
