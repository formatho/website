<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, RefreshCw, Download, Table2, Key, Link2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const inputSql = ref(`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);`)

interface Column {
  name: string
  type: string
  nullable: boolean
  isPrimary: boolean
  isForeign: boolean
  references?: string
}

interface Table {
  name: string
  columns: Column[]
}

const tables = ref<Table[]>([])
const error = ref('')
const hoveredTable = ref<string | null>(null)

const parseSql = () => {
  error.value = ''
  const parsed: Table[] = []

  try {
    // Match CREATE TABLE statements
    const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?\s*\(([\s\S]*?)\)\s*;/gi
    let tableMatch

    while ((tableMatch = tableRegex.exec(inputSql.value)) !== null) {
      const tableName = tableMatch[1]
      const body = tableMatch[2]
      const columns: Column[] = []

      // Split by commas, but respect parentheses
      const parts = body.split(/,(?![^()]*\))/g)

      for (const part of parts) {
        const trimmed = part.trim()
        if (!trimmed) continue

        // Skip constraint-only lines
        if (/^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT|KEY)\s/i.test(trimmed)) {
          // Handle inline FK in constraint
          const fkMatch = trimmed.match(/FOREIGN\s+KEY\s*\((\w+)\)\s+REFERENCES\s+[`"]?(\w+)[`"]?\s*\((\w+)\)/i)
          if (fkMatch) {
            const col = columns.find(c => c.name === fkMatch[1])
            if (col) {
              col.isForeign = true
              col.references = `${fkMatch[2]}.${fkMatch[3]}`
            }
          }
          continue
        }

        // Parse column definition
        const colMatch = trimmed.match(/^[`"]?(\w+)[`"]?\s+(.+)$/)
        if (!colMatch) continue

        const colName = colMatch[1]
        let colType = colMatch[2]

        // Check for inline constraints
        const isPrimary = /\bPRIMARY\s+KEY\b/i.test(colType)
        const isNullable = !/\bNOT\s+NULL\b/i.test(colType)
        const fkMatch = colType.match(/REFERENCES\s+[`"]?(\w+)[`"]?\s*\((\w+)\)/i)

        // Clean type
        colType = colType.replace(/\b(PRIMARY\s+KEY|NOT\s+NULL|UNIQUE|DEFAULT\s+\S+|REFERENCES\s+.*|ON\s+DELETE\s+\w+|ON\s+UPDATE\s+\w+|AUTOINCREMENT|AUTO_INCREMENT)\b/gi, '').trim()

        columns.push({
          name: colName,
          type: colType,
          nullable: isNullable && !isPrimary,
          isPrimary,
          isForeign: !!fkMatch,
          references: fkMatch ? `${fkMatch[1]}.${fkMatch[2]}` : undefined
        })
      }

      parsed.push({ name: tableName, columns })
    }

    if (parsed.length === 0) {
      error.value = 'No CREATE TABLE statements found. Make sure your SQL includes CREATE TABLE definitions.'
    }

    tables.value = parsed
  } catch (e: any) {
    error.value = e.message || 'Failed to parse SQL'
    tables.value = []
  }
}

const foreignKeys = computed(() => {
  const fks: { from: string; to: string; fromTable: string; toTable: string }[] = []
  for (const table of tables.value) {
    for (const col of table.columns) {
      if (col.isForeign && col.references) {
        const [refTable, refCol] = col.references.split('.')
        fks.push({
          from: `${table.name}.${col.name}`,
          to: col.references,
          fromTable: table.name,
          toTable: refTable
        })
      }
    }
  }
  return fks
})

const tablePositions = computed(() => {
  const positions: Record<string, { x: number; y: number }> = {}
  const cols = Math.ceil(Math.sqrt(tables.value.length))
  const cardW = 220
  const cardH = 200
  const gapX = 280
  const gapY = 260

  tables.value.forEach((table, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    positions[table.name] = { x: col * gapX + 20, y: row * gapY + 20 }
  })

  return positions
})

const svgWidth = computed(() => {
  if (!tables.value.length) return 800
  const cols = Math.ceil(Math.sqrt(tables.value.length))
  return cols * 280 + 40
})

const svgHeight = computed(() => {
  if (!tables.value.length) return 400
  const rows = Math.ceil(tables.value.length / Math.ceil(Math.sqrt(tables.value.length)))
  return rows * 260 + 40
})

const erMermaid = computed(() => {
  if (!tables.value.length) return ''
  let output = 'erDiagram\n'
  for (const table of tables.value) {
    for (const col of table.columns) {
      const pk = col.isPrimary ? 'PK' : col.isForeign ? 'FK' : ''
      const nullable = col.nullible ? '' : ' NOT NULL'
      output += `  ${table.name} {\n    ${col.type.replace(/\(.*\)/, '').trim() || 'string'} ${col.name} ${pk}${pk ? ' ' : ''}${nullable}\n  }\n`
    }
  }
  for (const fk of foreignKeys.value) {
    output += `  ${fk.fromTable} ||--o{ ${fk.toTable} : "${fk.from.split('.')[1]}"\n`
  }
  return output
})

const downloadMermaid = () => {
  const blob = new Blob([erMermaid.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'er-diagram.mmd'
  a.click()
  URL.revokeObjectURL(url)
}

const copyMermaid = async () => {
  try {
    await navigator.clipboard.writeText(erMermaid.value)
  } catch {}
}

const relatedTables = (tableName: string): string[] => {
  return foreignKeys.value
    .filter(fk => fk.fromTable === tableName || fk.toTable === tableName)
    .map(fk => fk.fromTable === tableName ? fk.toTable : fk.fromTable)
}

parseSql()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">SQL to ER Diagram</h1>
        <p class="text-sm text-muted-foreground mt-1">Paste your CREATE TABLE statements to generate an interactive ER diagram</p>
      </div>
      <Button @click="parseSql" aria-label="Parse SQL and generate ER diagram">
        <RefreshCw class="mr-2 h-4 w-4" /> Generate Diagram
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- SQL Input -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">SQL Schema (CREATE TABLE)</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="inputSql"
            language="sql"
            class="h-full min-h-0"
            placeholder="Paste your CREATE TABLE statements..."
          />
        </CardContent>
      </Card>

      <!-- ER Diagram Preview -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">ER Diagram</CardTitle>
          <div class="flex gap-1">
            <Button size="sm" variant="ghost" @click="copyMermaid" :disabled="!tables.length">
              <Copy class="h-3.5 w-3.5 mr-1" /> Mermaid
            </Button>
            <Button size="sm" variant="ghost" @click="downloadMermaid" :disabled="!tables.length">
              <Download class="h-3.5 w-3.5 mr-1" /> .mmd
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto bg-white dark:bg-zinc-900 rounded-lg">
          <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md m-2">
            {{ error }}
          </div>
          <div v-else-if="!tables.length" class="flex items-center justify-center h-full text-muted-foreground text-sm">
            Click "Generate Diagram" to visualize your schema
          </div>
          <div v-else class="p-4 space-y-4">
            <!-- Table Cards -->
            <div class="flex flex-wrap gap-4">
              <div
                v-for="table in tables"
                :key="table.name"
                class="border-2 rounded-xl overflow-hidden shadow-sm transition-all"
                :class="hoveredTable === table.name ? 'border-blue-500 shadow-md' : 'border-foreground/15'"
                @mouseenter="hoveredTable = table.name"
                @mouseleave="hoveredTable = null"
              >
                <!-- Table Header -->
                <div class="px-4 py-2 font-bold text-sm flex items-center gap-2"
                  :class="hoveredTable === table.name ? 'bg-blue-500 text-white' : 'bg-foreground/5'"
                >
                  <Table2 class="h-4 w-4" />
                  {{ table.name }}
                </div>
                <!-- Columns -->
                <div class="divide-y divide-foreground/5">
                  <div
                    v-for="col in table.columns"
                    :key="col.name"
                    class="px-4 py-1.5 text-xs flex items-center justify-between gap-2"
                  >
                    <div class="flex items-center gap-1.5">
                      <Key v-if="col.isPrimary" class="h-3 w-3 text-amber-500" />
                      <Link2 v-else-if="col.isForeign" class="h-3 w-3 text-blue-500" />
                      <span class="font-mono">{{ col.name }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-muted-foreground text-[10px]">{{ col.type.replace(/\(.*\)/, '') }}</span>
                      <span v-if="col.isForeign" class="text-[9px] text-blue-500 font-medium">
                        →{{ col.references }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Relationships Summary -->
            <div v-if="foreignKeys.length" class="mt-4 p-3 rounded-lg bg-muted/50">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <Link2 class="h-3.5 w-3.5" /> Foreign Key Relationships
              </h4>
              <div class="space-y-1">
                <div v-for="fk in foreignKeys" :key="fk.from" class="text-xs font-mono">
                  <span class="text-blue-600">{{ fk.from }}</span>
                  <span class="text-muted-foreground"> → </span>
                  <span class="text-green-600">{{ fk.to }}</span>
                </div>
              </div>
            </div>

            <!-- Mermaid output -->
            <details class="mt-2">
              <summary class="text-xs font-medium text-muted-foreground cursor-pointer">📋 Mermaid ER Syntax (copy to AI tools)</summary>
              <pre class="mt-2 p-3 rounded-lg bg-muted text-xs font-mono overflow-auto whitespace-pre">{{ erMermaid }}</pre>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
