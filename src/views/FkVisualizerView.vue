<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, RefreshCw, Key, Link2, Database, Table2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const inputSql = ref(`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  department_id INTEGER REFERENCES departments(id)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INTEGER REFERENCES departments(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);`)

interface ForeignKey {
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
  onDelete?: string
}

const foreignKeys = ref<ForeignKey[]>([])
const tables = ref<string[]>([])
const error = ref('')
const selectedTable = ref<string | null>(null)

const parseForeignKeys = () => {
  error.value = ''
  const fks: ForeignKey[] = []
  const tbls = new Set<string>()

  try {
    // Match CREATE TABLE statements
    const tableRegex = /CREATE\s+TABLE\s+[`"]?(\w+)[`"]?\s*\(([\s\S]*?)\)\s*;/gi
    let tableMatch

    while ((tableMatch = tableRegex.exec(inputSql.value)) !== null) {
      const tableName = tableMatch[1]
      const body = tableMatch[2]
      tbls.add(tableName)

      // Match inline REFERENCES in column definitions
      const colFkRegex = /(\w+)\s+\w+(?:\([^)]*\))?\s+[^,]*?REFERENCES\s+[`"]?(\w+)[`"]?\s*\((\w+)\)([^,]*)/gi
      let fkMatch
      while ((fkMatch = colFkRegex.exec(body)) !== null) {
        const onDeleteMatch = fkMatch[4]?.match(/ON\s+DELETE\s+(\w+)/i)
        fks.push({
          fromTable: tableName,
          fromColumn: fkMatch[1],
          toTable: fkMatch[2],
          toColumn: fkMatch[3],
          onDelete: onDeleteMatch?.[1]?.toUpperCase()
        })
      }

      // Match FOREIGN KEY constraint definitions
      const constraintFkRegex = /FOREIGN\s+KEY\s*\((\w+)\)\s+REFERENCES\s+[`"]?(\w+)[`"]?\s*\((\w+)\)([^,]*)/gi
      while ((fkMatch = constraintFkRegex.exec(body)) !== null) {
        const onDeleteMatch = fkMatch[4]?.match(/ON\s+DELETE\s+(\w+)/i)
        fks.push({
          fromTable: tableName,
          fromColumn: fkMatch[1],
          toTable: fkMatch[2],
          toColumn: fkMatch[3],
          onDelete: onDeleteMatch?.[1]?.toUpperCase()
        })
      }
    }

    tables.value = [...tbls]
    foreignKeys.value = fks

    if (tbls.size === 0) {
      error.value = 'No CREATE TABLE statements found.'
    }
  } catch (e: any) {
    error.value = e.message
  }
}

const relationships = computed(() => {
  // Build adjacency map
  const map: Record<string, { table: string; column: string; direction: 'out' | 'in' }[]> = {}

  for (const fk of foreignKeys.value) {
    if (!map[fk.fromTable]) map[fk.fromTable] = []
    map[fk.fromTable].push({ table: fk.toTable, column: `${fk.fromColumn} → ${fk.toTable}.${fk.toColumn}`, direction: 'out' })

    if (!map[fk.toTable]) map[fk.toTable] = []
    map[fk.toTable].push({ table: fk.fromTable, column: `${fk.toColumn} ← ${fk.fromTable}.${fk.fromColumn}`, direction: 'in' })
  }

  return map
})

const tableConnections = computed(() => {
  const connections: { table: string; count: number }[] = tables.value.map(t => ({
    table: t,
    count: (relationships.value[t] || []).length
  }))
  return connections.sort((a, b) => b.count - a.count)
})

const orphanedTables = computed(() => {
  return tables.value.filter(t => !relationships.value[t] || relationships.value[t].length === 0)
})

const mermaidOutput = computed(() => {
  if (!foreignKeys.value.length) return ''
  let out = 'graph LR\n'
  for (const fk of foreignKeys.value) {
    const label = fk.onDelete ? `|ON DELETE ${fk.onDelete}|` : ''
    out += `  ${fk.fromTable} -- ${fk.fromColumn}${label} --> ${fk.toTable}\n`
  }
  return out
})

const copyMermaid = async () => {
  try {
    await navigator.clipboard.writeText(mermaidOutput.value)
  } catch {}
}

parseForeignKeys()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Foreign Key Visualizer</h1>
        <p class="text-sm text-muted-foreground mt-1">See how your tables connect through foreign key relationships</p>
      </div>
      <Button @click="parseForeignKeys" aria-label="Parse and visualize foreign keys">
        <RefreshCw class="mr-2 h-4 w-4" /> Visualize
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- SQL Input -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">SQL Schema</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="inputSql"
            language="sql"
            class="h-full min-h-0"
            placeholder="Paste CREATE TABLE statements with FOREIGN KEY constraints..."
          />
        </CardContent>
      </Card>

      <!-- Visualization -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Relationship Map</CardTitle>
          <Button size="sm" variant="ghost" @click="copyMermaid" :disabled="!foreignKeys.length">
            <Copy class="h-3.5 w-3.5 mr-1" /> Mermaid
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto">
          <div v-if="error" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ error }}
          </div>
          <div v-else-if="!foreignKeys.length" class="flex items-center justify-center h-full text-muted-foreground text-sm">
            No foreign keys found. Add REFERENCES or FOREIGN KEY constraints to your schema.
          </div>
          <div v-else class="space-y-4">
            <!-- Connection Summary -->
            <div class="p-3 rounded-lg bg-muted/50">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <Database class="h-3.5 w-3.5" /> {{ tables.length }} Tables · {{ foreignKeys.length }} Foreign Keys
              </h4>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <div v-for="conn in tableConnections" :key="conn.table">
                  <button
                    class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs border transition-colors"
                    :class="selectedTable === conn.table ? 'border-blue-500 bg-blue-500/5' : 'border-foreground/10 hover:border-foreground/30'"
                    @click="selectedTable = selectedTable === conn.table ? null : conn.table"
                  >
                    <span class="font-mono font-medium">{{ conn.table }}</span>
                    <span class="text-muted-foreground ml-2">{{ conn.count }} link{{ conn.count !== 1 ? 's' : '' }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- FK Details -->
            <div>
              <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <Link2 class="h-3.5 w-3.5" /> Foreign Key Chains
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="(fk, i) in foreignKeys"
                  :key="i"
                  class="flex items-center gap-2 p-2 rounded-lg border border-foreground/10"
                  :class="{ 'ring-2 ring-blue-500/30': selectedTable === fk.fromTable || selectedTable === fk.toTable }"
                >
                  <Table2 class="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span class="text-xs font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600">{{ fk.fromTable }}</span>
                  <span class="text-xs font-mono text-muted-foreground">.{{ fk.fromColumn }}</span>
                  <span class="text-muted-foreground">→</span>
                  <span class="text-xs font-mono px-1.5 py-0.5 rounded bg-green-500/10 text-green-600">{{ fk.toTable }}</span>
                  <span class="text-xs font-mono text-muted-foreground">.{{ fk.toColumn }}</span>
                  <span v-if="fk.onDelete" class="ml-auto text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-500">
                    ON DELETE {{ fk.onDelete }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Orphaned Tables -->
            <div v-if="orphanedTables.length" class="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                ⚠️ Tables Without Relationships ({{ orphanedTables.length }})
              </h4>
              <div class="flex flex-wrap gap-1">
                <span v-for="t in orphanedTables" :key="t" class="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">
                  {{ t }}
                </span>
              </div>
            </div>

            <!-- Mermaid output -->
            <details>
              <summary class="text-xs font-medium text-muted-foreground cursor-pointer">📋 Mermaid Flowchart (copy to AI tools)</summary>
              <pre class="mt-2 p-3 rounded-lg bg-muted text-xs font-mono overflow-auto whitespace-pre">{{ mermaidOutput }}</pre>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
