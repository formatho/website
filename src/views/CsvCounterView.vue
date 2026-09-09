<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyButton } from '@/components/ui/copy-button'
import { Table, ScanSearch } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CSV Row & Column Counter - Online, Private | Formatho',
  description:
    'Count rows, columns, and cells in CSV data instantly. Handles quoted fields, embedded commas, custom delimiters. Shows per-column stats and detects header row. Client-side, no upload.',
  keywords: ['csv row counter', 'csv column count', 'count csv lines', 'csv dimensions', 'csv row count online', 'how many rows in csv'],
  ogType: 'website'
})

const inputText = ref('')
const delimiter = ref(',')
const hasHeader = ref(true)
const analyzed = ref(false)

interface Column {
  index: number
  name: string
  nonEmpty: number
  empty: number
  unique: number
  type: string
}

interface Stats {
  rows: number
  dataRows: number
  columns: number
  totalCells: number
  emptyCells: number
  columns_detail: Column[]
  errors: string[]
}

const stats = ref<Stats | null>(null)

function detectDelimiter(text: string): string {
  const firstLine = text.split('\n')[0] || ''
  const candidates = [',', ';', '\t', '|']
  let best = ','
  let maxCount = 0
  for (const d of candidates) {
    const count = firstLine.split(d).length - 1
    if (count > maxCount) { maxCount = count; best = d }
  }
  return best
}

function parseCsvLine(line: string, delim: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === delim && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current.trim())
  return fields
}

function detectType(values: string[]): string {
  const nonEmpty = values.filter(Boolean)
  if (!nonEmpty.length) return 'empty'
  const isNum = nonEmpty.every(v => !isNaN(Number(v.replace(/[$€£,]/g, ''))))
  if (isNum) {
    const hasDecimal = nonEmpty.some(v => v.includes('.'))
    return hasDecimal ? 'decimal' : 'integer'
  }
  const isDate = nonEmpty.every(v => !isNaN(Date.parse(v)) && /\d{4}-\d{2}-\d{2}|\/\d{1,2}\/\d{1,2}|\d{1,2}-\w{3}/.test(v))
  if (isDate) return 'date'
  const isBool = nonEmpty.every(v => /^(true|false|yes|no|0|1)$/i.test(v))
  if (isBool) return 'boolean'
  return 'text'
}

function analyze() {
  analyzed.value = true
  stats.value = null
  if (!inputText.value.trim()) return

  const delim = delimiter.value === 'auto' ? detectDelimiter(inputText.value) : delimiter.value
  const lines = inputText.value.split(/\r?\n/).filter(l => l.trim())
  const errors: string[] = []

  const parsed = lines.map((line, idx) => {
    const fields = parseCsvLine(line, delim)
    return { lineNum: idx + 1, fields }
  })

  const numCols = Math.max(...parsed.map(p => p.fields.length))
  const colCount = new Array(numCols).fill(0)
  parsed.forEach(p => colCount[p.fields.length - 1]++)
  // warn about inconsistent column counts
  const expectedCols = parsed[0]?.fields.length || 0
  parsed.forEach(p => {
    if (p.fields.length !== expectedCols) {
      errors.push(`Line ${p.lineNum}: ${p.fields.length} columns (expected ${expectedCols})`)
    }
  })

  // build column stats
  const columns: Column[] = []
  const headerFields = hasHeader.value ? parsed[0]?.fields || [] : []
  for (let c = 0; c < numCols; c++) {
    const values = parsed.slice(hasHeader.value ? 1 : 0).map(p => p.fields[c] || '')
    const nonEmpty = values.filter(v => v !== '').length
    const unique = new Set(values.filter(Boolean)).size
    const name = headerFields[c] || `Column ${c + 1}`
    columns.push({
      index: c,
      name,
      nonEmpty,
      empty: values.length - nonEmpty,
      unique,
      type: detectType(values)
    })
  }

  const dataRows = hasHeader.value ? parsed.length - 1 : parsed.length
  const totalCells = dataRows * numCols
  const emptyCells = columns.reduce((s, c) => s + c.empty, 0)

  stats.value = {
    rows: parsed.length,
    dataRows,
    columns: numCols,
    totalCells,
    emptyCells,
    columns_detail: columns,
    errors: errors.slice(0, 5)
  }
}

function clearAll() {
  inputText.value = ''
  stats.value = null
  analyzed.value = false
}

const sample = `id,name,department,salary,hire_date
1,Alice Johnson,Engineering,95000,2021-03-15
2,Bob Smith,Marketing,65000,2020-07-22
3,Carol White,Engineering,88000,2019-11-01
4,David Brown,Sales,55000,2022-01-10
5,Eve Davis,Engineering,102000,2018-06-30`

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Table class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CSV Row &amp; Column Counter</h1>
        <p class="text-sm text-muted-foreground">Count rows, columns, cells, and analyze column types — handles quoted fields and custom delimiters</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Textarea
          v-model="inputText"
          :rows="8"
          class="font-mono text-xs"
          placeholder="Paste CSV data here..."
          aria-label="CSV data to analyze"
        />
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex gap-2">
            <select v-model="delimiter" :class="selectClass + ' w-32'" aria-label="Delimiter">
              <option value=",">Comma</option>
              <option value=";">Semicolon</option>
              <option value="&#9;">Tab</option>
              <option value="|">Pipe</option>
              <option value="auto">Auto-detect</option>
            </select>
            <label class="flex items-center gap-2 text-sm px-2">
              <input v-model="hasHeader" type="checkbox" /> First row is header
            </label>
          </div>
          <div class="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" @click="inputText = sample">Sample</Button>
            <Button @click="analyze" :disabled="!inputText">Analyze</Button>
            <Button variant="outline" @click="clearAll" :disabled="!inputText">Clear</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <template v-if="analyzed && stats">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card class="border-primary/30">
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Rows</p>
            <p class="text-2xl font-bold font-mono">{{ stats.rows.toLocaleString() }}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Data rows</p>
            <p class="text-2xl font-bold font-mono">{{ stats.dataRows.toLocaleString() }}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Columns</p>
            <p class="text-2xl font-bold font-mono">{{ stats.columns }}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Total cells</p>
            <p class="text-2xl font-bold font-mono">{{ stats.totalCells.toLocaleString() }}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase">Empty cells</p>
            <p class="text-2xl font-bold font-mono">{{ stats.emptyCells.toLocaleString() }}</p>
          </CardContent>
        </Card>
      </div>

      <Card v-if="stats.errors.length" class="border-amber-500/40">
        <CardContent class="flex items-start gap-3 pt-5">
          <ScanSearch class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-semibold text-amber-700">Inconsistent column counts detected</p>
            <p v-for="e in stats.errors" :key="e" class="text-xs text-muted-foreground">{{ e }}</p>
          </div>
        </CardContent>
      </Card>

      <Card v-if="stats.columns_detail.length">
        <CardHeader>
          <CardTitle class="text-lg">Column details</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-border text-left">
                  <th class="p-2">#</th>
                  <th class="p-2">Name</th>
                  <th class="p-2">Type</th>
                  <th class="p-2 text-right">Non-empty</th>
                  <th class="p-2 text-right">Empty</th>
                  <th class="p-2 text-right">Unique</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="col in stats.columns_detail" :key="col.index" class="border-b border-border/50">
                  <td class="p-2 text-muted-foreground font-mono">{{ col.index + 1 }}</td>
                  <td class="p-2 font-semibold">{{ col.name }}</td>
                  <td class="p-2">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase" :class="{
                      'bg-blue-100 text-blue-700': col.type === 'integer' || col.type === 'decimal',
                      'bg-green-100 text-green-700': col.type === 'text',
                      'bg-purple-100 text-purple-700': col.type === 'date',
                      'bg-amber-100 text-amber-700': col.type === 'boolean',
                      'bg-gray-100 text-gray-500': col.type === 'empty'
                    }">{{ col.type }}</span>
                  </td>
                  <td class="p-2 text-right font-mono">{{ col.nonEmpty.toLocaleString() }}</td>
                  <td class="p-2 text-right font-mono text-muted-foreground">{{ col.empty.toLocaleString() }}</td>
                  <td class="p-2 text-right font-mono">{{ col.unique.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
