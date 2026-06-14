<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, ArrowRight, Repeat } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { format } from 'sql-formatter'

const inputSql = ref(`SELECT u.id, u.email, u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= '2024-01-01'
  AND o.status = 'completed'
ORDER BY o.total DESC
LIMIT 100;`)

const fromDialect = ref('postgresql')
const toDialect = ref('mysql')

const dialects = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'bigquery', label: 'Google BigQuery' },
  { value: 'redshift', label: 'Amazon Redshift' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'tsql', label: 'SQL Server (T-SQL)' },
  { value: 'trino', label: 'Trino / Presto' },
  { value: 'spark', label: 'Apache Spark SQL' },
]

const convertedSql = ref('')
const error = ref('')
const changes = ref<string[]>([])

// Dialect-specific keyword mappings
const dialectMappings: Record<string, Record<string, string>> = {
  postgresql_to_mysql: {
    'SERIAL PRIMARY KEY': 'INT AUTO_INCREMENT PRIMARY KEY',
    'SERIAL': 'INT AUTO_INCREMENT',
    'BIGSERIAL': 'BIGINT AUTO_INCREMENT',
    'TIMESTAMP WITHOUT TIME ZONE': 'DATETIME',
    'TIMESTAMP WITH TIME ZONE': 'TIMESTAMP',
    'BOOLEAN': 'TINYINT(1)',
    'TRUE': '1',
    'FALSE': '0',
    '::INT': '',
    '::TEXT': '',
    'ILIKE': 'LIKE',
    'RETURNING': '',
    'NOW()': 'NOW()',
    'CURRENT_DATE': 'CURDATE()',
    'SUBSTRING(': 'SUBSTRING(',
    '||': 'CONCAT(',
    'LIMIT $1 OFFSET $2': 'LIMIT $2, $1',
  },
  mysql_to_postgresql: {
    'AUTO_INCREMENT': 'SERIAL',
    'INT AUTO_INCREMENT PRIMARY KEY': 'SERIAL PRIMARY KEY',
    'TINYINT(1)': 'BOOLEAN',
    'DATETIME': 'TIMESTAMP',
    'IFNULL(': 'COALESCE(',
    'CURDATE()': 'CURRENT_DATE',
    'GROUP_CONCAT(': 'STRING_AGG(',
    'NOW()': 'NOW()',
    '\\bLIMIT\\s+(\\d+),\\s*(\\d+)': 'LIMIT $2 OFFSET $1',
  },
  postgresql_to_sqlite: {
    'SERIAL PRIMARY KEY': 'INTEGER PRIMARY KEY AUTOINCREMENT',
    'SERIAL': 'INTEGER',
    'TIMESTAMP WITHOUT TIME ZONE': 'TEXT',
    'TIMESTAMP WITH TIME ZONE': 'TEXT',
    'BOOLEAN': 'INTEGER',
    'TRUE': '1',
    'FALSE': '0',
    '::INT': '',
    '::TEXT': '',
    'ILIKE': 'LIKE',
    'RETURNING': '',
    'NOW()': \"datetime('now')\",
    'CURRENT_DATE': \"date('now')\",
  },
  tsql_to_postgresql: {
    'GETDATE()': 'NOW()',
    'TOP ': 'LIMIT ',
    'ISNULL(': 'COALESCE(',
    'CHARINDEX(': 'POSITION(',
    'LEN(': 'LENGTH(',
    'GETUTCDATE()': 'NOW() AT TIME ZONE \\'UTC\\'',
    'NVARCHAR': 'VARCHAR',
    'NTEXT': 'TEXT',
  },
}

const convert = () => {
  error.value = ''
  changes.value = []

  let result = inputSql.value

  // Step 1: Format with sql-formatter (handles basic syntax normalization)
  try {
    result = format(result, {
      language: toDialect.value as any,
      keywordCase: 'upper',
    })
  } catch {
    // If formatter doesn't support target dialect, just format as standard SQL
    try {
      result = format(result, { language: 'sql', keywordCase: 'upper' })
    } catch (e: any) {
      error.value = `Format error: ${e.message}`
    }
  }

  // Step 2: Apply dialect-specific transformations
  const mappingKey = `${fromDialect.value}_to_${toDialect.value}`
  const mapping = dialectMappings[mappingKey]

  if (mapping) {
    for (const [from, to] of Object.entries(mapping)) {
      if (result.includes(from) || new RegExp(from, 'i').test(result)) {
        const before = result
        if (from.startsWith('\\b')) {
          result = result.replace(new RegExp(from, 'gi'), to)
        } else {
          result = result.split(from).join(to)
        }
        if (before !== result) {
          changes.value.push(`Converted: ${from} → ${to}`)
        }
      }
    }
  }

  // Handle LIMIT position change for MySQL (move LIMIT to end if not already)
  if (toDialect.value === 'mysql' && fromDialect.value === 'postgresql') {
    // PostgreSQL: LIMIT n OFFSET m → MySQL: LIMIT m, n
    const limitOffsetMatch = result.match(/LIMIT\s+(\d+)\s+OFFSET\s+(\d+)/i)
    if (limitOffsetMatch) {
      result = result.replace(/LIMIT\s+\d+\s+OFFSET\s+\d+/i, `LIMIT ${limitOffsetMatch[2]}, ${limitOffsetMatch[1]}`)
      changes.value.push(`Converted: LIMIT n OFFSET m → LIMIT m, n (MySQL syntax)`)
    }
  }

  // Handle TOP n → LIMIT n for T-SQL to others
  if (fromDialect.value === 'tsql') {
    const topMatch = result.match(/SELECT\s+TOP\s+(\d+)/i)
    if (topMatch) {
      result = result.replace(/SELECT\s+TOP\s+\d+\s+/i, 'SELECT ')
      result = result.trimEnd().replace(/;?\s*$/, ` LIMIT ${topMatch[1]};`)
      changes.value.push(`Converted: TOP n → LIMIT n`)
    }
  }

  convertedSql.value = result

  if (changes.value.length === 0 && fromDialect.value !== toDialect.value) {
    changes.value.push('No dialect-specific conversions needed — the SQL is compatible as-is.')
  }
}

const copyConverted = async () => {
  try {
    await navigator.clipboard.writeText(convertedSql.value)
  } catch {}
}

const swapDialects = () => {
  const temp = fromDialect.value
  fromDialect.value = toDialect.value
  toDialect.value = temp
  convert()
}

convert()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">SQL Dialect Converter</h1>
        <p class="text-sm text-muted-foreground mt-1">Convert SQL queries between PostgreSQL, MySQL, SQLite, SQL Server, and more</p>
      </div>
    </div>

    <!-- Dialect Selectors -->
    <div class="flex items-center gap-3 flex-wrap">
      <div class="space-y-1">
        <Label class="text-xs">From</Label>
        <Select v-model="fromDialect">
          <SelectTrigger class="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="d in dialects" :key="d.value" :value="d.value">{{ d.label }}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="pt-5">
        <Button size="icon" variant="outline" @click="swapDialects" title="Swap dialects">
          <Repeat class="h-4 w-4" />
        </Button>
      </div>

      <div class="space-y-1">
        <Label class="text-xs">To</Label>
        <Select v-model="toDialect">
          <SelectTrigger class="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="d in dialects" :key="d.value" :value="d.value">{{ d.label }}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="pt-5">
        <Button @click="convert">
          <ArrowRight class="mr-2 h-4 w-4" /> Convert
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Input -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Input SQL ({{ dialects.find(d => d.value === fromDialect)?.label }})</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="inputSql"
            language="sql"
            class="h-full min-h-0"
            placeholder="Paste your SQL here..."
          />
        </CardContent>
      </Card>

      <!-- Output -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Converted ({{ dialects.find(d => d.value === toDialect)?.label }})</CardTitle>
          <Button variant="ghost" size="icon" @click="copyConverted" :disabled="!convertedSql">
            <Copy class="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 flex flex-col gap-3">
          <div v-if="error" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ error }}
          </div>
          <CodeEditor
            :model-value="convertedSql"
            language="sql"
            readonly
            class="flex-1 min-h-0"
          />
          <!-- Changes Applied -->
          <div v-if="changes.length" class="p-2 rounded-lg bg-muted/50">
            <h4 class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Changes Applied</h4>
            <div class="space-y-0.5">
              <div v-for="(change, i) in changes" :key="i" class="text-xs text-muted-foreground font-mono">
                • {{ change }}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <p class="text-xs text-muted-foreground">
      ⚠️ Automated conversion handles common syntax differences. Always review the output — complex queries, stored procedures, and database-specific functions may need manual adjustment.
    </p>
  </div>
</template>
