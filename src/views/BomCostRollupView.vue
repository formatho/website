<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyButton } from '@/components/ui/copy-button'
import { Calculator } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'BOM Cost Roll-up Calculator - Multi-Level | Formatho',
  description: 'Calculate total cost of multi-level Bills of Materials. Handles indented BOMs with quantities and unit costs. Shows cost per assembly level and grand total. Free, client-side.',
  keywords: ['bom cost calculator', 'bill of materials cost', 'multi-level bom cost', 'rolled up cost', 'assembly cost calculator', 'product cost estimate'],
  ogType: 'website'
})

const bomText = ref('')
const calculated = ref(false)

interface BomRow {
  level: number
  partNumber: string
  description: string
  qty: number
  unitCost: number
  extendedCost: number
  children: BomRow[]
  rolledCost: number
}

function parseIndentedBom(text: string): BomRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean)
  if (!lines.length) return []
  const delim = lines[0].includes('\t') ? '\t' : ','
  const hasHeader = /level|part|item/i.test(lines[0])
  const dataLines = hasHeader ? lines.slice(1) : lines

  const rows: BomRow[] = []
  const stack: BomRow[][] = [[]]

  for (const line of dataLines) {
    const parts = line.split(delim).map(s => s.trim().replace(/^"|"$/g, ''))
    if (parts.length < 4) continue

    const level = parseInt(parts[0]) || 0
    const partNumber = parts[1] || ''
    const description = parts[2] || ''
    const qty = parseFloat(parts[3]) || 1
    const unitCost = parseFloat(parts[4]) || 0

    const row: BomRow = {
      level, partNumber, description, qty, unitCost,
      extendedCost: qty * unitCost,
      children: [],
      rolledCost: 0
    }

    while (stack.length > level + 1) stack.pop()
    if (!stack[level]) stack[level] = []
    stack[level].push(row)
    if (stack.length === level + 1) stack.push(row.children)
  }

  return stack[0] || []
}

function rollupCost(rows: BomRow[]): number {
  let total = 0
  for (const r of rows) {
    const childCost = rollupCost(r.children)
    r.rolledCost = r.extendedCost + childCost
    total += r.rolledCost
  }
  return total
}

function flatten(rows: BomRow[], depth = 0): Array<BomRow & { depth: number }> {
  const out: Array<BomRow & { depth: number }> = []
  for (const r of rows) {
    out.push({ ...r, depth })
    out.push(...flatten(r.children, depth + 1))
  }
  return out
}

const root = ref<BomRow[]>([])
const totalCost = ref(0)
const partCount = ref(0)

function calculate() {
  calculated.value = true
  root.value = parseIndentedBom(bomText.value)
  totalCost.value = rollupCost(root.value)
  partCount.value = flatten(root.value).length
}

const flatRows = computed(() => flatten(root.value))

const exportText = computed(() => {
  return flatRows.value.map(r =>
    `${'  '.repeat(r.depth)}${r.partNumber},"${r.description}",${r.qty},${r.unitCost.toFixed(4)},${r.extendedCost.toFixed(2)},${r.rolledCost.toFixed(2)}`
  ).join('\n') + `\n\nTOTAL,${totalCost.value.toFixed(2)}`
})

const sample = `0,ASSY-001,Top Assembly,1,0
1,MEC-001,Chassis,1,45.50
1,PCB-001,Main PCB,2,12.75
2,IC-001,MCU STM32,2,4.20
2,RES-001,Resistor 10k,24,0.02
2,CAP-001,Capacitor 100nF,16,0.05
2,CON-001,USB-C Connector,2,0.80
1,FST-001,Screws M3,8,0.15
0,DOC-001,Manual,1,1.50
0,PCK-001,Packaging,1,2.25`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Calculator class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">BOM Cost Roll-up Calculator</h1>
        <p class="text-sm text-muted-foreground">Calculate multi-level assembly costs from indented BOM data</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">Format: level, part_number, description, qty, unit_cost</p>
          <Button variant="outline" size="sm" @click="bomText = sample">Sample</Button>
        </div>
        <Textarea v-model="bomText" :rows="10" class="font-mono text-xs" placeholder="0,ASSY-001,Top Assembly,1,0&#10;1,MEC-001,Chassis,1,45.50&#10;1,PCB-001,Main PCB,2,12.75&#10;2,IC-001,MCU,2,4.20" aria-label="BOM data" />
        <div class="flex gap-2">
          <Button @click="calculate" :disabled="!bomText.trim()">Calculate Costs</Button>
          <Button variant="outline" @click="calculated = false; root = []" :disabled="!calculated">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="calculated && flatRows.length">
      <div class="grid grid-cols-3 gap-3">
        <Card class="border-primary/30">
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Total cost</p>
            <p class="text-3xl font-bold font-mono">${{ totalCost.toFixed(2) }}</p>
          </CardContent>
        </Card>
        <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Line items</p><p class="text-2xl font-bold font-mono">{{ partCount }}</p></CardContent></Card>
        <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Top level</p><p class="text-2xl font-bold font-mono">{{ root.length }}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Indented BOM with rolled-up costs</CardTitle>
          <CopyButton :text="exportText" variant="ghost" aria-label="Copy costed BOM" />
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-border text-left">
                  <th class="p-2">Part</th>
                  <th class="p-2">Description</th>
                  <th class="p-2 text-right">Qty</th>
                  <th class="p-2 text-right">Unit Cost</th>
                  <th class="p-2 text-right">Extended</th>
                  <th class="p-2 text-right font-bold">Rolled-up</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in flatRows" :key="r.partNumber + r.depth" class="border-b border-border/40" :class="r.depth === 0 ? 'bg-muted/20 font-semibold' : ''">
                  <td class="p-2 font-mono" :style="{ paddingLeft: (r.depth * 20 + 8) + 'px' }">
                    {{ r.depth > 0 ? '└ ' : '' }}{{ r.partNumber }}
                  </td>
                  <td class="p-2">{{ r.description }}</td>
                  <td class="p-2 text-right font-mono">{{ r.qty }}</td>
                  <td class="p-2 text-right font-mono">${{ r.unitCost.toFixed(2) }}</td>
                  <td class="p-2 text-right font-mono">${{ r.extendedCost.toFixed(2) }}</td>
                  <td class="p-2 text-right font-mono font-bold" :class="r.depth === 0 ? 'text-primary' : ''">
                    ${{ r.rolledCost.toFixed(2) }}
                  </td>
                </tr>
                <tr class="border-t-2 border-border">
                  <td colspan="5" class="p-2 text-right font-bold">TOTAL</td>
                  <td class="p-2 text-right font-mono font-bold text-primary text-sm">${{ totalCost.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-muted-foreground mt-3">
            <strong>Rolled-up cost</strong> = part's own extended cost + all child assembly costs. Top-level rows show the full product cost.
          </p>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
