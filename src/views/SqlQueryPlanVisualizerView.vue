<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, RefreshCw, ArrowRight, Zap, Clock, Filter } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { format } from 'sql-formatter'

const inputSql = ref(`SELECT u.email, u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.role_id = 1 AND p.published = true
GROUP BY u.email, u.name
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC
LIMIT 20;`)

interface PlanStep {
  id: number
  operation: string
  table: string
  cost: 'low' | 'medium' | 'high'
  description: string
  icon: string
}

const steps = ref<PlanStep[]>([])
const formattedSql = ref('')

const analyzeQuery = () => {
  // Format the SQL first
  try {
    formattedSql.value = format(inputSql.value, { language: 'postgresql' })
  } catch {
    formattedSql.value = inputSql.value
  }

  const parsed: PlanStep[] = []
  const sql = inputSql.value.toUpperCase()
  let stepId = 1

  // Detect LIMIT
  const hasLimit = /\bLIMIT\b/.test(sql)

  // Detect ORDER BY
  if (/\bORDER\s+BY\b/.test(sql)) {
    parsed.push({
      id: stepId++,
      operation: 'Sort',
      table: 'result set',
      cost: 'high',
      description: 'Sorts the result set by the specified column(s). Consider adding an index on the ORDER BY columns to avoid in-memory sort.',
      icon: '🔄'
    })
  }

  // Detect GROUP BY
  if (/\bGROUP\s+BY\b/.test(sql)) {
    parsed.push({
      id: stepId++,
      operation: 'Aggregate (HashAggregate)',
      table: 'grouped columns',
      cost: 'medium',
      description: 'Groups rows and computes aggregates (COUNT, SUM, etc.). Ensure grouping columns are indexed for large datasets.',
      icon: '📊'
    })
  }

  // Detect HAVING
  if (/\bHAVING\b/.test(sql)) {
    parsed.push({
      id: stepId++,
      operation: 'Filter (HAVING)',
      table: 'aggregated results',
      cost: 'low',
      description: 'Filters groups after aggregation. Cannot use indexes — applied in-memory.',
      icon: '🔍'
    })
  }

  // Detect JOINs
  const joinMatches = inputSql.value.matchAll(/\b(LEFT\s+|RIGHT\s+|INNER\s+|OUTER\s+|FULL\s+)*JOIN\s+(\w+)/gi)
  const joinTables: string[] = []
  for (const m of joinMatches) {
    const joinType = (m[1] || 'INNER').trim().toUpperCase()
    const table = m[2]
    joinTables.push(table)
    parsed.push({
      id: stepId++,
      operation: `${joinType} JOIN → ${table}`,
      table,
      cost: joinType.includes('LEFT') || joinType.includes('FULL') ? 'high' : 'medium',
      description: `${joinType} join with "${table}". Ensure join columns have indexes. ${joinType.includes('LEFT') || joinType.includes('FULL') ? 'Outer joins may scan unmatched rows.' : ''}`,
      icon: '🔗'
    })
  }

  // Detect WHERE
  if (/\bWHERE\b/.test(sql)) {
    const whereMatch = inputSql.value.match(/\bWHERE\b\s+(.*?)(?=\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|\bHAVING\b|;|$)/is)
    const whereClause = whereMatch ? whereMatch[1].trim().substring(0, 80) : ''
    parsed.push({
      id: stepId++,
      operation: 'Filter (WHERE)',
      table: 'scan',
      cost: whereClause.includes('LIKE') || whereMatch?.[1].includes('OR ') ? 'high' : 'low',
      description: `Filters rows${whereClause ? `: ${whereClause}...` : ''}. Use indexes on filter columns. Avoid leading wildcards in LIKE.`,
      icon: '🔍'
    })
  }

  // Detect FROM (base table scan)
  const fromMatch = inputSql.value.match(/\bFROM\s+(\w+)/i)
  if (fromMatch) {
    const scanType = /\bWHERE\b/.test(sql) || joinTables.length > 0 ? 'Index Scan' : 'Sequential Scan'
    parsed.unshift({
      id: 0,
      operation: scanType,
      table: fromMatch[1],
      cost: scanType === 'Sequential Scan' ? 'high' : 'low',
      description: `${scanType === 'Sequential Scan' ? 'Full table scan' : 'Index lookup'} on "${fromMatch[1]}". ${scanType === 'Sequential Scan' ? '⚠️ Consider adding indexes for better performance.' : '✅ Uses index for efficient access.'}`,
      icon: scanType === 'Sequential Scan' ? '⚠️' : '✅'
    })
  }

  // Detect SELECT columns
  parsed.push({
    id: stepId++,
    operation: 'Project (SELECT)',
    table: 'output',
    cost: 'low',
    description: 'Selects requested columns for the final output. Only selecting needed columns reduces memory usage.',
    icon: '📤'
  })

  // Detect LIMIT
  if (hasLimit) {
    parsed.push({
      id: stepId++,
      operation: 'Limit',
      table: 'output',
      cost: 'low',
      description: 'Restricts the number of output rows. Helps reduce data transfer.',
      icon: '✂️'
    })
  }

  steps.value = parsed
}

const costColor = (cost: string) => {
  switch (cost) {
    case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20'
    case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    default: return 'text-green-500 bg-green-500/10 border-green-500/20'
  }
}

const optimizationTips = computed(() => {
  const tips: { severity: 'warning' | 'info' | 'success'; text: string }[] = []
  const sql = inputSql.value.toUpperCase()

  if (/\bSELECT\s+\*/.test(sql)) {
    tips.push({ severity: 'warning', text: 'Avoid SELECT * — only select columns you need to reduce memory and network transfer.' })
  }
  if (/LIKE\s+'%/.test(sql) && !/LIKE\s+'[^%]/.test(inputSql.value)) {
    tips.push({ severity: 'warning', text: 'Leading wildcard in LIKE (e.g. \'%term\') prevents index usage. Consider full-text search.' })
  }
  if (/\bOR\b/.test(sql)) {
    tips.push({ severity: 'info', text: 'OR conditions can prevent index usage. Consider UNION ALL for better performance on large tables.' })
  }
  if (/\bORDER\s+BY\b/.test(sql) && !/\bLIMIT\b/.test(sql)) {
    tips.push({ severity: 'warning', text: 'ORDER BY without LIMIT sorts the entire result set. Add LIMIT to reduce sorting overhead.' })
  }
  if (/\bCOUNT\(/.test(sql) && /\bGROUP\s+BY\b/.test(sql)) {
    tips.push({ severity: 'info', text: 'COUNT with GROUP BY requires scanning all matching rows. Consider materialized views for frequent aggregations.' })
  }
  if (!/\bWHERE\b/.test(sql) && /\bFROM\b/.test(sql)) {
    tips.push({ severity: 'warning', text: 'No WHERE clause — this scans the entire table. Add filters to reduce rows processed.' })
  }
  if (/\bJOIN\b/.test(sql)) {
    tips.push({ severity: 'info', text: 'Ensure JOIN columns have indexes. Composite indexes covering JOIN + WHERE columns are most effective.' })
  }
  if (/\bSUBQUERY\b|\(SELECT/.test(inputSql.value)) {
    tips.push({ severity: 'info', text: 'Subquery detected. Consider rewriting as a JOIN or CTE for better optimizer hints.' })
  }
  if (tips.length === 0) {
    tips.push({ severity: 'success', text: 'Query looks well-structured. Make sure filter and join columns are indexed.' })
  }

  return tips
})

const copyFormatted = async () => {
  try {
    await navigator.clipboard.writeText(formattedSql.value)
  } catch {}
}

analyzeQuery()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">SQL Query Plan Visualizer</h1>
        <p class="text-sm text-muted-foreground mt-1">Understand how your query executes and get optimization tips</p>
      </div>
      <Button @click="analyzeQuery" aria-label="Analyze SQL query plan">
        <Zap class="mr-2 h-4 w-4" /> Analyze Query
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- SQL Input -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">SQL Query</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 flex flex-col gap-3">
          <CodeEditor
            v-model="inputSql"
            language="sql"
            class="flex-1 min-h-0"
            placeholder="Enter your SQL query..."
          />
          <div class="flex items-center gap-2">
            <Button size="sm" variant="outline" @click="copyFormatted">
              <Copy class="h-3.5 w-3.5 mr-1" /> Copy Formatted
            </Button>
          </div>
          <details>
            <summary class="text-xs text-muted-foreground cursor-pointer">📋 Formatted Query</summary>
            <pre class="mt-2 p-3 rounded-lg bg-muted text-xs font-mono overflow-auto whitespace-pre">{{ formattedSql }}</pre>
          </details>
        </CardContent>
      </Card>

      <!-- Execution Plan -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle class="text-sm font-medium">Execution Plan & Analysis</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto space-y-3">
          <!-- Steps -->
          <div v-if="steps.length" class="space-y-2">
            <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <Clock class="h-3.5 w-3.5" /> Execution Steps (logical order)
            </div>
            <div
              v-for="(step, i) in steps"
              :key="step.id"
              class="flex items-start gap-3"
            >
              <!-- Connector line -->
              <div class="flex flex-col items-center">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  :class="costColor(step.cost)"
                >
                  {{ i + 1 }}
                </div>
                <div v-if="i < steps.length - 1" class="w-px h-8 bg-foreground/10 mt-1"></div>
              </div>
              <!-- Step content -->
              <div class="flex-1 pb-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-medium">{{ step.icon }} {{ step.operation }}</span>
                  <span v-if="step.table !== 'output' && step.table !== 'result set'" class="text-xs text-muted-foreground font-mono">
                    on {{ step.table }}
                  </span>
                  <span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded" :class="costColor(step.cost)">
                    {{ step.cost }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground mt-0.5">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <!-- Optimization Tips -->
          <div class="mt-4 p-3 rounded-lg bg-muted/50">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <Filter class="h-3.5 w-3.5" /> Optimization Tips
            </h4>
            <div class="space-y-1.5">
              <div
                v-for="(tip, i) in optimizationTips"
                :key="i"
                class="text-xs flex items-start gap-2"
              >
                <span>{{ tip.severity === 'warning' ? '⚠️' : tip.severity === 'success' ? '✅' : '💡' }}</span>
                <span>{{ tip.text }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
