<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyButton } from '@/components/ui/copy-button'
import { GitCompare, Plus, Minus, RefreshCw } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'BOM Diff Tool - Compare Bills of Materials | Formatho',
  description: 'Compare two BOMs and see added, removed, and changed parts. Handles CSV/TSV with configurable part number column. Free, client-side.',
  keywords: ['bom diff', 'bill of materials comparison', 'bom changes', 'compare bom', 'bom revision diff', 'engineering change bom'],
  ogType: 'website'
})

const bomA = ref('')
const bomB = ref('')
const compared = ref(false)

interface Part {
  key: string
  description: string
  qty: string
  ref?: string
}

interface DiffRow {
  key: string
  description: string
  status: 'added' | 'removed' | 'changed' | 'same'
  qtyA?: string
  qtyB?: string
  changes: string[]
}

function parseBom(text: string): Map<string, Part> {
  const map = new Map<string, Part>()
  const lines = text.trim().split(/\r?\n/).filter(Boolean)
  if (!lines.length) return map
  // detect delimiter
  const first = lines[0]
  const delim = first.includes('\t') ? '\t' : first.includes(';') ? ';' : ','
  // detect if first row is header
  const hasHeader = /part|item|component/i.test(first)
  const dataLines = hasHeader ? lines.slice(1) : lines
  for (const line of dataLines) {
    const parts = line.split(delim).map(s => s.trim().replace(/^"|"$/g, ''))
    if (!parts[0]) continue
    const key = parts[0]
    map.set(key, {
      key,
      description: parts[1] || '',
      qty: parts[2] || '1',
      ref: parts[3] || undefined
    })
  }
  return map
}

const diffRows = ref<DiffRow[]>([])
const summary = ref({ added: 0, removed: 0, changed: 0, same: 0 })

function compare() {
  compared.value = true
  const a = parseBom(bomA.value)
  const b = parseBom(bomB.value)
  const rows: DiffRow[] = []
  let s = { added: 0, removed: 0, changed: 0, same: 0 }

  for (const [key, pa] of a) {
    const pb = b.get(key)
    if (!pb) {
      rows.push({ key, description: pa.description, status: 'removed', qtyA: pa.qty, changes: [] })
      s.removed++
    } else if (pa.qty !== pb.qty || pa.description !== pb.description) {
      const changes: string[] = []
      if (pa.qty !== pb.qty) changes.push(`qty: ${pa.qty} → ${pb.qty}`)
      if (pa.description !== pb.description) changes.push(`desc changed`)
      rows.push({ key, description: pa.description, status: 'changed', qtyA: pa.qty, qtyB: pb.qty, changes })
      s.changed++
    } else {
      rows.push({ key, description: pa.description, status: 'same', qtyA: pa.qty, changes: [] })
      s.same++
    }
  }
  for (const [key, pb] of b) {
    if (!a.has(key)) {
      rows.push({ key, description: pb.description, status: 'added', qtyB: pb.qty, changes: [] })
      s.added++
    }
  }
  diffRows.value = rows.sort((x, y) => {
    const order = { removed: 0, added: 1, changed: 2, same: 3 }
    return order[x.status] - order[y.status] || x.key.localeCompare(y.key)
  })
  summary.value = s
}

const exportText = computed(() => {
  return diffRows.value.map(r =>
    `${r.status.toUpperCase()},${r.key},"${r.description}",${r.qtyA || ''},${r.qtyB || ''},${r.changes.join('; ')}`
  ).join('\n')
})

const sample = `PART-001,Resistor 10kΩ,4,R1-R4
PART-002,Capacitor 100nF,2,C1-C2
PART-003,LED Green,1,D1
PART-004,IC MCU STM32,1,U1
PART-005,PCB Main Board,1,REF`

const sample2 = `PART-001,Resistor 10kΩ,8,R1-R8
PART-002,Capacitor 100nF,2,C1-C2
PART-003,LED Red,1,D1
PART-004,IC MCU STM32,1,U1
PART-006,Connector USB-C,1,J1
PART-007,Ferrite Bead,2,FB1-FB2`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><GitCompare class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">BOM Diff Tool</h1>
        <p class="text-sm text-muted-foreground">Compare two Bills of Materials — see added, removed, and changed parts</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-base">BOM A (original)</CardTitle>
          <Button variant="outline" size="sm" @click="bomA = sample">Sample</Button>
        </CardHeader>
        <CardContent>
          <Textarea v-model="bomA" :rows="8" class="font-mono text-xs" placeholder="PART-001,Description,Qty,Ref&#10;PART-002,Description,Qty,Ref" aria-label="BOM A" />
          <p class="text-xs text-muted-foreground mt-2">Format: part_number, description, qty, ref (CSV, TSV, or semicolon)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-base">BOM B (revised)</CardTitle>
          <Button variant="outline" size="sm" @click="bomB = sample2">Sample</Button>
        </CardHeader>
        <CardContent>
          <Textarea v-model="bomB" :rows="8" class="font-mono text-xs" placeholder="PART-001,Description,Qty,Ref&#10;PART-002,Description,Qty,Ref" aria-label="BOM B" />
        </CardContent>
      </Card>
    </div>

    <div class="flex gap-2">
      <Button @click="compare" :disabled="!bomA.trim() || !bomB.trim()">
        <GitCompare class="w-4 h-4 mr-1" /> Compare BOMs
      </Button>
      <Button variant="outline" @click="compared = false; diffRows = []" :disabled="!compared">Clear</Button>
    </div>

    <template v-if="compared && diffRows.length">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card class="border-red-500/30"><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Removed</p><p class="text-2xl font-bold text-red-600">{{ summary.removed }}</p></CardContent></Card>
        <Card class="border-green-500/30"><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Added</p><p class="text-2xl font-bold text-green-600">{{ summary.added }}</p></CardContent></Card>
        <Card class="border-amber-500/30"><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Changed</p><p class="text-2xl font-bold text-amber-600">{{ summary.changed }}</p></CardContent></Card>
        <Card><CardContent class="pt-5 pb-4"><p class="text-xs text-muted-foreground uppercase">Unchanged</p><p class="text-2xl font-bold">{{ summary.same }}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Differences ({{ diffRows.filter(r => r.status !== 'same').length }})</CardTitle>
          <CopyButton :text="exportText" variant="ghost" aria-label="Copy diff as CSV" />
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-border text-left">
                  <th class="p-2 w-20">Status</th>
                  <th class="p-2">Part Number</th>
                  <th class="p-2">Description</th>
                  <th class="p-2 text-right">Qty A</th>
                  <th class="p-2 text-right">Qty B</th>
                  <th class="p-2">Changes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in diffRows" :key="r.key" class="border-b border-border/40" :class="{
                  'bg-red-50': r.status === 'removed',
                  'bg-green-50': r.status === 'added',
                  'bg-amber-50': r.status === 'changed'
                }">
                  <td class="p-2">
                    <span class="inline-flex items-center gap-1 font-bold" :class="{
                      'text-red-600': r.status === 'removed',
                      'text-green-600': r.status === 'added',
                      'text-amber-600': r.status === 'changed',
                      'text-muted-foreground': r.status === 'same'
                    }">
                      <Minus v-if="r.status === 'removed'" class="w-3 h-3" />
                      <Plus v-if="r.status === 'added'" class="w-3 h-3" />
                      <RefreshCw v-if="r.status === 'changed'" class="w-3 h-3" />
                      {{ r.status }}
                    </span>
                  </td>
                  <td class="p-2 font-mono font-semibold">{{ r.key }}</td>
                  <td class="p-2">{{ r.description }}</td>
                  <td class="p-2 text-right font-mono">{{ r.qtyA || '—' }}</td>
                  <td class="p-2 text-right font-mono">{{ r.qtyB || '—' }}</td>
                  <td class="p-2 text-muted-foreground">{{ r.changes.join(', ') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
