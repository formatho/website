<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Database, Play, Upload, Download, FilePlus2, FlaskConical, Table2, Trash2,
  RefreshCw, Loader2, AlertCircle, Copy, Check, ChevronLeft, ChevronRight,
  Pencil, Eye, Key, Zap, ShieldCheck
} from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'SQLite Browser - Open & Query .db Files Online | Formatho',
  description:
    'Open SQLite databases in your browser: browse tables, run SQL, edit cells, import CSV, export .db files. Powered by WebAssembly SQLite — no upload, fully client-side.',
  keywords: ['sqlite browser', 'sqlite viewer', 'open sqlite online', 'sqlite online', 'run sql in browser', 'db browser online', 'db file viewer', 'sqlite editor'],
  ogType: 'website'
})

// ─── sql.js (SQLite WASM) loader ───
const SQLJS_VERSION = '1.13.0'
const SQLJS_BASE = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist`

interface SqlJsDb {
  exec(sql: string): Array<{ columns: string[]; values: unknown[][] }>
  run(sql: string, params?: unknown[]): void
  export(): Uint8Array
  close(): void
}
interface SqlJsModule {
  Database: new (data?: Uint8Array) => SqlJsDb
}

let db: SqlJsDb | null = null
let sqlJsPromise: Promise<void> | null = null

const wasmStatus = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const wasmError = ref('')

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.head.appendChild(s)
  })
}

async function ensureWasm(): Promise<boolean> {
  if (db && wasmStatus.value === 'ready') return true
  if (!sqlJsPromise) {
    wasmStatus.value = 'loading'
    wasmError.value = ''
    sqlJsPromise = (async () => {
      await loadScriptOnce(`${SQLJS_BASE}/sql-wasm.js`)
      const w = window as unknown as { initSqlJs?: (cfg: Record<string, unknown>) => Promise<SqlJsModule> }
      if (!w.initSqlJs) throw new Error('sql.js failed to initialize')
      // Explicit binary fetch with mirror fallback — Emscripten's streaming
      // loader hangs in some embedded webviews.
      const mirrors = [
        `${SQLJS_BASE}/sql-wasm.wasm`,
        `https://unpkg.com/sql.js@${SQLJS_VERSION}/dist/sql-wasm.wasm`
      ]
      let wasmBinary: ArrayBuffer | null = null
      let lastErr: Error | null = null
      for (const url of mirrors) {
        try {
          const res = await fetch(url, { cache: 'force-cache' })
          if (!res.ok) throw new Error('HTTP ' + res.status)
          wasmBinary = await res.arrayBuffer()
          break
        } catch (e) { lastErr = e as Error }
      }
      if (!wasmBinary) throw new Error('wasm download failed (' + (lastErr?.message || 'network') + ')')
      SqlJs = await w.initSqlJs({ wasmBinary })
    })().catch((e: Error) => {
      wasmStatus.value = 'error'
      wasmError.value = e.message
      sqlJsPromise = null
      throw e
    })
  }
  try {
    await sqlJsPromise
    if (!db) db = createDb()
    wasmStatus.value = 'ready'
    return true
  } catch (e) {
    wasmStatus.value = 'error'
    wasmError.value = (e as Error).message || String(e)
    return false
  }
}
let SqlJs: SqlJsModule | null = null

function createDb(bytes?: Uint8Array): SqlJsDb {
  return new SqlJs!.Database(bytes)
}

// ─── State ───
const dbLoaded = ref(false)
const dbFileName = ref('untitled.db')
const pendingChanges = ref(0)
const activeTab = ref('browse')

interface SchemaObj { name: string; type: string; sql: string | null; rowCount?: number }
const schemaTables = ref<SchemaObj[]>([])
const schemaViews = ref<SchemaObj[]>([])
const schemaIndexes = ref<SchemaObj[]>([])
const schemaTriggers = ref<SchemaObj[]>([])
const dbPageCount = ref(0)
const dbPageSize = ref(0)

const busy = ref(false)
const actionError = ref('')

// Browse state
const selectedTable = ref('')
const browseColumns = ref<string[]>([])
const browseRows = ref<unknown[][]>([])
const browseTotal = ref(0)
const browsePage = ref(0)
const pageSize = ref(25)
const browseError = ref('')
const editMode = ref(false)
const columnTypes = ref<Record<string, string>>({})
const cellErrors = ref<Record<string, string>>({})

// Query state
const queryText = ref('')
const queryResults = ref<Array<{ columns: string[]; rows: unknown[][] }>>([])
const queryError = ref('')
const queryMs = ref(0)

// Schema tab
const copiedKey = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const csvInput = ref<HTMLInputElement | null>(null)

function qid(name: string): string {
  return '"' + name.replace(/"/g, '""') + '"'
}

function resetDbState() {
  schemaTables.value = []
  schemaViews.value = []
  schemaIndexes.value = []
  schemaTriggers.value = []
  selectedTable.value = ''
  browseColumns.value = []
  browseRows.value = []
  browseTotal.value = 0
  browsePage.value = 0
  editMode.value = false
  queryResults.value = []
  queryError.value = ''
  actionError.value = ''
  pendingChanges.value = 0
}

function refreshSchema() {
  if (!db) return
  const tables: SchemaObj[] = []
  const views: SchemaObj[] = []
  const indexes: SchemaObj[] = []
  const triggers: SchemaObj[] = []
  try {
    const res = db.exec("SELECT type, name, sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name")
    for (const set of res) {
      for (const row of set.values) {
        const type = String(row[0])
        const name = String(row[1])
        const sql = row[2] as string | null
        const entry: SchemaObj = { type, name, sql }
        if (type === 'table') {
          try {
            const c = db.exec(`SELECT COUNT(*) FROM ${qid(name)}`)
            entry.rowCount = Number(c[0]?.values?.[0]?.[0] ?? 0)
          } catch { /* virtual/computed tables */ }
          tables.push(entry)
        } else if (type === 'view') views.push(entry)
        else if (type === 'index') indexes.push(entry)
        else if (type === 'trigger') triggers.push(entry)
      }
    }
  } catch (e) {
    actionError.value = 'Schema read failed: ' + (e as Error).message
  }
  schemaTables.value = tables
  schemaViews.value = views
  schemaIndexes.value = indexes
  schemaTriggers.value = triggers
  try {
    dbPageCount.value = Number(db.exec('PRAGMA page_count')[0]?.values?.[0]?.[0] ?? 0)
    dbPageSize.value = Number(db.exec('PRAGMA page_size')[0]?.values?.[0]?.[0] ?? 0)
  } catch { /* ignore */ }
}

// ─── Actions ───
async function newDb() {
  if (!(await ensureWasm())) return
  db!.close()
  db = createDb()
  resetDbState()
  dbFileName.value = 'untitled.db'
  dbLoaded.value = true
  activeTab.value = 'query'
  queryText.value = 'CREATE TABLE notes (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  body TEXT,\n  created TEXT DEFAULT (datetime(\'now\'))\n);'
  refreshSchema()
}

async function openFile() {
  fileInput.value?.click()
}

async function importCsv() {
  csvInput.value?.click()
}

async function onDbFileChosen(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (!(await ensureWasm())) return
  busy.value = true
  actionError.value = ''
  try {
    const buf = new Uint8Array(await file.arrayBuffer())
    db!.close()
    db = createDb(buf)
    db.exec('PRAGMA schema_version') // throws on invalid/corrupt file
    resetDbState()
    dbFileName.value = file.name
    dbLoaded.value = true
    refreshSchema()
    if (schemaTables.value.length) openTable(schemaTables.value[0].name)
    else activeTab.value = 'query'
  } catch (err) {
    actionError.value = 'Could not open file as SQLite database: ' + (err as Error).message
    try { db!.close() } catch { /* already dead */ }
    db = createDb()
    dbLoaded.value = false
  } finally {
    busy.value = false
  }
}

const SAMPLE_SQL = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT NOT NULL, location TEXT);
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary REAL,
  hired TEXT
);
CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT, lead_id INTEGER REFERENCES employees(id), budget REAL, status TEXT);
CREATE INDEX idx_employees_dept ON employees(department_id);
CREATE VIEW v_eng_salaries AS
  SELECT e.name, e.salary, d.name AS department
  FROM employees e JOIN departments d ON d.id = e.department_id
  WHERE d.name = 'Engineering';
INSERT INTO departments (id, name, location) VALUES
  (1, 'Engineering', 'Berlin'),
  (2, 'Marketing', 'London'),
  (3, 'Sales', 'New York'),
  (4, 'Design', 'Lisbon');
INSERT INTO employees (id, name, department_id, salary, hired) VALUES
  (1, 'Alice Johnson', 1, 95000, '2021-03-15'),
  (2, 'Bob Smith', 2, 65000, '2020-07-22'),
  (3, 'Carol White', 1, 88000, '2019-11-01'),
  (4, 'David Brown', 3, 55000, '2022-01-10'),
  (5, 'Eve Davis', 1, 102000, '2018-06-30'),
  (6, 'Frank Miller', 4, 70000, '2023-02-01'),
  (7, 'Grace Lee', 2, 68000, '2021-09-12'),
  (8, 'Henry Wilson', 3, 51000, '2022-05-19');
INSERT INTO projects (id, name, lead_id, budget, status) VALUES
  (1, 'Runtime v1', 1, 250000, 'active'),
  (2, 'Q4 Campaign', 2, 80000, 'active'),
  (3, 'Site Redesign', 6, 120000, 'done'),
  (4, 'Sales Push', 4, 40000, 'planned'),
  (5, 'Agent Toolkit', 5, 300000, 'active');
`

async function loadSample() {
  if (!(await ensureWasm())) return
  db!.close()
  db = createDb()
  db.exec(SAMPLE_SQL)
  resetDbState()
  dbFileName.value = 'sample.db'
  dbLoaded.value = true
  refreshSchema()
  openTable('employees')
  queryText.value = 'SELECT d.name AS department, COUNT(*) AS headcount, ROUND(AVG(e.salary), 0) AS avg_salary\nFROM employees e JOIN departments d ON d.id = e.department_id\nGROUP BY d.name\nORDER BY avg_salary DESC;'
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function exportDb() {
  if (!db) return
  const data = db.export()
  triggerDownload(new Blob([data as unknown as BlobPart], { type: 'application/x-sqlite3' }),
    dbFileName.value.endsWith('.db') ? dbFileName.value : dbFileName.value + '.db')
  pendingChanges.value = 0
}

// ─── Browse tab ───
function openTable(name: string) {
  selectedTable.value = name
  browsePage.value = 0
  editMode.value = false
  activeTab.value = 'browse'
  loadBrowse()
}

function openViewInQuery(name: string) {
  activeTab.value = 'query'
  queryText.value = `SELECT * FROM ${qid(name)} LIMIT 50;`
}

function loadBrowse() {
  if (!db || !selectedTable.value) return
  browseError.value = ''
  cellErrors.value = {}
  try {
    const offset = browsePage.value * pageSize.value
    const res = db.exec(`SELECT rowid AS __rowid__, * FROM ${qid(selectedTable.value)} LIMIT ${pageSize.value} OFFSET ${offset}`)
    if (res[0]) {
      browseColumns.value = res[0].columns
      browseRows.value = res[0].values
    } else {
      browseColumns.value = []
      browseRows.value = []
    }
    const total = db.exec(`SELECT COUNT(*) FROM ${qid(selectedTable.value)}`)
    browseTotal.value = Number(total[0]?.values?.[0]?.[0] ?? 0)
    // declared column types for smart value parsing on edit
    const types: Record<string, string> = {}
    const ti = db.exec(`PRAGMA table_info(${qid(selectedTable.value)})`)
    if (ti[0]) {
      for (const row of ti[0].values) {
        types[String(row[1])] = String(row[2] ?? '')
      }
    }
    columnTypes.value = types
  } catch (e) {
    browseError.value = (e as Error).message
    browseColumns.value = []
    browseRows.value = []
  }
}

const totalPages = computed(() => Math.max(1, Math.ceil(browseTotal.value / pageSize.value)))
const pageStart = computed(() => (browseTotal.value === 0) ? 0 : browsePage.value * pageSize.value + 1)
const pageEnd = computed(() => Math.min(browseTotal.value, (browsePage.value + 1) * pageSize.value))

function cellDisplay(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  if (isBlob(v)) return 'BLOB ' + v.length + 'B'
  return String(v)
}

// Vue's template compiler does not whitelist typed-array globals, so
// `instanceof Uint8Array` inside the template resolves to undefined.
function isBlob(v: unknown): v is Uint8Array {
  return v instanceof Uint8Array
}

function commitEdit(rowIndex: number, colIndex: number, raw: string) {
  if (!db || !selectedTable.value) return
  const row = browseRows.value[rowIndex]
  const rowid = row?.[0] as number | undefined
  const col = browseColumns.value[colIndex]
  if (rowid === undefined || !col) return
  const declared = columnTypes.value[col] ?? ''
  let val: string | number | null
  if (raw === '') val = null
  else if (!/TEXT|CHAR|CLOB/i.test(declared) && raw.trim() !== '' && !isNaN(Number(raw))) val = Number(raw)
  else val = raw
  const key = rowIndex + ':' + colIndex
  try {
    db.run(`UPDATE ${qid(selectedTable.value)} SET ${qid(col)} = ? WHERE rowid = ?`, [val, rowid])
    cellErrors.value = { ...cellErrors.value, [key]: '' }
    pendingChanges.value++
    loadBrowse()
  } catch (e) {
    cellErrors.value = { ...cellErrors.value, [key]: (e as Error).message }
  }
}

function deleteRow(rowIndex: number) {
  if (!db || !selectedTable.value) return
  const row = browseRows.value[rowIndex]
  const rowid = row?.[0] as number | undefined
  if (rowid === undefined) return
  if (!window.confirm('Delete row with rowid ' + rowid + '?')) return
  db.run(`DELETE FROM ${qid(selectedTable.value)} WHERE rowid = ?`, [rowid])
  pendingChanges.value++
  refreshSchema()
  loadBrowse()
}

// ─── Query tab ───
function runQuery() {
  if (!db || !queryText.value.trim()) return
  const t0 = performance.now()
  try {
    const sets = db.exec(queryText.value)
    queryResults.value = sets.map(s => ({ columns: s.columns, rows: s.values }))
    queryError.value = ''
    pendingChanges.value++
    refreshSchema()
  } catch (e) {
    queryResults.value = []
    queryError.value = (e as Error).message
  }
  queryMs.value = Math.round((performance.now() - t0) * 10) / 10
}

// ─── CSV import ───
function parseCsv(text: string): string[][] {
  const firstLine = text.split(/\r?\n/)[0] || ''
  const candidates = [',', ';', '\t', '|']
  let delim = ','
  let maxCount = 0
  for (const d of candidates) {
    const count = firstLine.split(d).length - 1
    if (count > maxCount) { maxCount = count; delim = d }
  }
  const rows: string[][] = []
  let cur: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { field += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === delim && !inQuotes) {
      cur.push(field.trim()); field = ''
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++
      cur.push(field.trim()); field = ''
      if (cur.some(c => c !== '')) rows.push(cur)
      cur = []
    } else field += ch
  }
  cur.push(field.trim())
  if (cur.some(c => c !== '')) rows.push(cur)
  return rows
}

function inferSqlType(values: string[]): string {
  const nonEmpty = values.filter(v => v !== '')
  if (!nonEmpty.length) return 'TEXT'
  if (nonEmpty.every(v => /^-?\d+$/.test(v))) return 'INTEGER'
  if (nonEmpty.every(v => !isNaN(Number(v)))) return 'REAL'
  return 'TEXT'
}

async function importCsvFile(file: File) {
  if (!(await ensureWasm())) return
  busy.value = true
  actionError.value = ''
  try {
    const text = await file.text()
    const rows = parseCsv(text)
    if (rows.length < 2) throw new Error('CSV needs a header row and at least one data row')
    const header = rows[0]
    const data = rows.slice(1)
    const base = (file.name.replace(/\.(csv|tsv|txt)$/i, '').replace(/[^a-zA-Z0-9_]/g, '_').replace(/^(\d)/, 't$1') || 'imported')
    let tableName = base
    let suffix = 2
    const existing = new Set([...schemaTables.value, ...schemaViews.value].map(o => o.name.toLowerCase()))
    while (existing.has(tableName.toLowerCase())) tableName = base + '_' + suffix++
    const seen = new Set<string>()
    const colNames = header.map((h, i) => {
      let n = (h || '').replace(/[^a-zA-Z0-9_]/g, '_').replace(/^(\d)/, 'c$1') || ('c' + (i + 1))
      while (seen.has(n.toLowerCase())) n += '_'
      seen.add(n.toLowerCase())
      return n
    })
    const colTypes = colNames.map((_, i) => inferSqlType(data.map(r => r[i] ?? '')))
    db!.run('BEGIN')
    try {
      db!.run(`CREATE TABLE ${qid(tableName)} (${colNames.map((c, i) => qid(c) + ' ' + colTypes[i]).join(', ')});`)
      const placeholders = colNames.map(() => '?').join(', ')
      const stmt = `INSERT INTO ${qid(tableName)} VALUES (${placeholders});`
      for (const r of data) {
        const params = colNames.map((_, i) => {
          const v = r[i] ?? ''
          if (v === '') return null
          if (colTypes[i] !== 'TEXT' && !isNaN(Number(v))) return Number(v)
          return v
        })
        db!.run(stmt, params)
      }
      db!.run('COMMIT')
    } catch (inner) {
      try { db!.run('ROLLBACK') } catch { /* already rolled back */ }
      throw inner
    }
    pendingChanges.value++
    refreshSchema()
    openTable(tableName)
  } catch (e) {
    actionError.value = 'CSV import failed: ' + (e as Error).message
  } finally {
    busy.value = false
  }
}

// ─── Export helpers ───
function download(name: string, content: string, mime: string) {
  triggerDownload(new Blob([content], { type: mime }), name)
}

function csvEscape(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v)
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}

function resultCsv(columns: string[], rows: unknown[][], key: string) {
  download(dbFileName.value.replace(/\.db$/i, '') + '-result' + key + '.csv',
    [columns.map(csvEscape).join(','), ...rows.map(r => r.map(csvEscape).join(','))].join('\n'),
    'text/csv')
}

function resultJson(columns: string[], rows: unknown[][], key: string) {
  const objs = rows.map(r => Object.fromEntries(columns.map((c, i) => [c, r[i] === undefined ? null : r[i]])))
  download(dbFileName.value.replace(/\.db$/i, '') + '-result' + key + '.json', JSON.stringify(objs, null, 2), 'application/json')
}

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = '' }, 1500)
  } catch { /* clipboard unavailable */ }
}

function formatBytes(n: number): string {
  if (!n) return '—'
  if (n < 1024) return n + ' B'
  if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
  return (n / 1048576).toFixed(1) + ' MB'
}

onBeforeUnmount(() => {
  try { db?.close() } catch { /* ignore */ }
  db = null
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4 space-y-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg"><Database class="w-5 h-5 text-primary" /></div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">SQLite Browser</h1>
          <p class="text-xs text-muted-foreground">Open, query, and edit SQLite databases — runs entirely in your browser</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck class="w-4 h-4 text-green-600" />
        No upload · WebAssembly SQLite
      </div>
    </div>

    <!-- Hidden file inputs -->
    <input ref="fileInput" type="file" accept=".db,.sqlite,.sqlite3" class="hidden" aria-label="SQLite database file" @change="onDbFileChosen" />
    <input ref="csvInput" type="file" accept=".csv,.tsv,.txt" class="hidden" aria-label="CSV file to import" @change="(e: Event) => { const i = e.target as HTMLInputElement; const f = i.files?.[0]; i.value = ''; if (f) importCsvFile(f) }" />

    <!-- WASM loading / error banner -->
    <Card v-if="wasmStatus === 'loading'" class="border-primary/30">
      <CardContent class="flex items-center gap-3 pt-5 text-sm">
        <Loader2 class="w-4 h-4 animate-spin text-primary" />
        Loading SQLite engine (WebAssembly, ~1 MB from CDN)…
      </CardContent>
    </Card>
    <Card v-else-if="wasmStatus === 'error'" class="border-red-500/40">
      <CardContent class="flex items-start gap-3 pt-5 text-sm">
        <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
        <div>
          <p class="font-medium text-red-600">Failed to load the SQLite engine</p>
          <p class="text-xs text-muted-foreground">{{ wasmError }} — check your network or content blockers, then retry.</p>
        </div>
      </CardContent>
    </Card>

    <Card v-if="actionError" class="border-red-500/40">
      <CardContent class="flex items-start gap-3 pt-5 text-sm">
        <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
        <p class="font-mono text-xs text-red-600 break-all">{{ actionError }}</p>
      </CardContent>
    </Card>

    <!-- No database: launcher -->
    <Card v-if="!dbLoaded && wasmStatus !== 'error'">
      <CardContent class="pt-6 pb-6">
        <div class="text-center space-y-4 py-8">
          <Database class="w-12 h-12 mx-auto text-primary/60" />
          <div>
            <h2 class="text-lg font-semibold">Open a database to get started</h2>
            <p class="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Everything runs locally with SQLite compiled to WebAssembly. Your file never leaves this browser tab.
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-2 pt-2">
            <Button :disabled="busy" @click="openFile">
              <Upload class="w-4 h-4 mr-1.5" /> Open .db file
            </Button>
            <Button variant="outline" :disabled="busy" @click="importCsv">
              <FilePlus2 class="w-4 h-4 mr-1.5" /> Import CSV
            </Button>
            <Button variant="outline" :disabled="busy" @click="newDb">
              <Database class="w-4 h-4 mr-1.5" /> New database
            </Button>
            <Button variant="outline" :disabled="busy" @click="loadSample">
              <FlaskConical class="w-4 h-4 mr-1.5" /> Sample database
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Database workspace -->
    <template v-if="dbLoaded">
      <!-- Toolbar -->
      <div class="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" @click="openFile"><Upload class="w-3.5 h-3.5 mr-1" /> Open</Button>
        <Button size="sm" variant="outline" @click="importCsv"><FilePlus2 class="w-3.5 h-3.5 mr-1" /> Import CSV</Button>
        <Button size="sm" variant="outline" @click="newDb"><Database class="w-3.5 h-3.5 mr-1" /> New</Button>
        <Button size="sm" variant="outline" @click="exportDb" :class="{ 'border-amber-500/50': pendingChanges > 0 }">
          <Download class="w-3.5 h-3.5 mr-1" /> Export .db
        </Button>
        <Button size="sm" variant="ghost" @click="refreshSchema(); loadBrowse()"><RefreshCw class="w-3.5 h-3.5" /></Button>
        <span v-if="pendingChanges > 0" class="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 font-medium">
          {{ pendingChanges }} change{{ pendingChanges === 1 ? '' : 's' }} — export to save
        </span>
        <span class="ml-auto text-xs text-muted-foreground font-mono truncate max-w-[200px]" :title="dbFileName">{{ dbFileName }}</span>
        <span class="text-xs text-muted-foreground">{{ formatBytes(dbPageCount * dbPageSize) }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-start">
        <!-- Sidebar -->
        <Card class="md:sticky md:top-20">
          <CardContent class="pt-4 pb-4 space-y-3 max-h-[70vh] overflow-y-auto">
            <div>
              <p class="text-[10px] font-semibold uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                <Table2 class="w-3 h-3" /> Tables ({{ schemaTables.length }})
              </p>
              <div v-if="!schemaTables.length" class="text-xs text-muted-foreground/70 px-1">No tables yet</div>
              <button
                v-for="t in schemaTables" :key="'t-' + t.name"
                class="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-left text-xs transition-colors"
                :class="selectedTable === t.name && activeTab === 'browse' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/60'"
                @click="openTable(t.name)"
              >
                <span class="truncate font-mono">{{ t.name }}</span>
                <span class="text-[10px] text-muted-foreground shrink-0">{{ t.rowCount?.toLocaleString() ?? '?' }}</span>
              </button>
            </div>
            <div v-if="schemaViews.length">
              <p class="text-[10px] font-semibold uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                <Eye class="w-3 h-3" /> Views
              </p>
              <button
                v-for="v in schemaViews" :key="'v-' + v.name"
                class="w-full px-2 py-1.5 rounded-md text-left text-xs font-mono truncate hover:bg-muted/60 transition-colors"
                @click="openViewInQuery(v.name)"
              >{{ v.name }}</button>
            </div>
            <div v-if="schemaIndexes.length">
              <p class="text-[10px] font-semibold uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                <Key class="w-3 h-3" /> Indexes
              </p>
              <button
                v-for="ix in schemaIndexes" :key="'i-' + ix.name"
                class="w-full px-2 py-1 rounded text-left text-[11px] font-mono truncate text-muted-foreground hover:text-foreground transition-colors"
                @click="activeTab = 'schema'"
              >{{ ix.name }}</button>
            </div>
            <div v-if="schemaTriggers.length">
              <p class="text-[10px] font-semibold uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                <Zap class="w-3 h-3" /> Triggers
              </p>
              <button
                v-for="tr in schemaTriggers" :key="'tr-' + tr.name"
                class="w-full px-2 py-1 rounded text-left text-[11px] font-mono truncate text-muted-foreground hover:text-foreground transition-colors"
                @click="activeTab = 'schema'"
              >{{ tr.name }}</button>
            </div>
          </CardContent>
        </Card>

        <!-- Main -->
        <Tabs v-model="activeTab" class="space-y-3">
          <TabsList>
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="query">Query</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
          </TabsList>

          <!-- BROWSE -->
          <TabsContent value="browse" class="space-y-3">
            <Card v-if="!selectedTable" class="border-dashed">
              <CardContent class="pt-5 text-sm text-muted-foreground">
                Select a table from the sidebar to browse its rows.
              </CardContent>
            </Card>
            <template v-else>
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-sm font-semibold font-mono">{{ selectedTable }}</h2>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{{ browseTotal.toLocaleString() }} rows</span>
                <div class="ml-auto flex items-center gap-2">
                  <button
                    class="text-xs px-2.5 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors"
                    :class="editMode ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-foreground/30'"
                    @click="editMode = !editMode"
                  >
                    <Pencil class="w-3 h-3" /> {{ editMode ? 'Editing' : 'Edit' }}
                  </button>
                  <select
                    class="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    aria-label="Rows per page"
                    :value="pageSize"
                    @change="pageSize = Number(($event.target as HTMLSelectElement).value); browsePage = 0; loadBrowse()"
                  >
                    <option :value="25">25 / page</option>
                    <option :value="50">50 / page</option>
                    <option :value="100">100 / page</option>
                  </select>
                </div>
              </div>

              <Card v-if="browseError" class="border-red-500/40">
                <CardContent class="pt-5"><p class="font-mono text-xs text-red-600 break-all">{{ browseError }}</p></CardContent>
              </Card>

              <div v-else class="border border-border rounded-xl overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-border bg-muted/30 text-left">
                      <th v-if="editMode" class="p-2 w-10"></th>
                      <th
                        v-for="(c, ci) in browseColumns" :key="c + ci"
                        class="p-2 font-semibold whitespace-nowrap"
                        :class="c === '__rowid__' ? 'text-muted-foreground/50' : ''"
                      >{{ c === '__rowid__' ? 'rowid' : c }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, ri) in browseRows" :key="String(row[0]) + '-' + ri" class="border-b border-border/40 hover:bg-primary/[0.03]">
                      <td v-if="editMode" class="p-1.5 text-center">
                        <button class="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500" title="Delete row" @click="deleteRow(ri)">
                          <Trash2 class="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td
                        v-for="(cell, ci) in row" :key="ci"
                        class="p-0 align-top"
                        :class="ci === 0 ? 'text-muted-foreground/50 font-mono' : ''"
                      >
                        <template v-if="editMode && ci > 0">
                          <input
                            class="w-full min-w-[80px] bg-transparent px-2 py-1.5 font-mono outline-none focus:bg-primary/5 border-b border-transparent focus:border-primary/40"
                            :class="cellErrors[ri + ':' + ci] ? 'border-red-500/60' : ''"
                            :value="cellDisplay(cell)"
                            :title="cellErrors[ri + ':' + ci] || ''"
                            @change="commitEdit(ri, ci, ($event.target as HTMLInputElement).value)"
                          />
                        </template>
                        <template v-else>
                          <div class="px-2 py-1.5 max-w-[280px] truncate font-mono" :title="cellDisplay(cell)">
                            <span v-if="cell === null" class="italic text-muted-foreground/50">NULL</span>
                            <span v-else-if="isBlob(cell)" class="text-purple-600">BLOB {{ cell.length }}B</span>
                            <span v-else>{{ cell }}</span>
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="!browseRows.length">
                      <td :colspan="browseColumns.length + (editMode ? 1 : 0)" class="p-6 text-center text-muted-foreground text-xs">
                        Table is empty
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div v-if="browseTotal > 0" class="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>Showing {{ pageStart.toLocaleString() }}–{{ pageEnd.toLocaleString() }} of {{ browseTotal.toLocaleString() }}</span>
                <div class="flex items-center gap-1">
                  <Button size="sm" variant="outline" class="h-7 px-2" :disabled="browsePage === 0" @click="browsePage--; loadBrowse()">
                    <ChevronLeft class="w-3.5 h-3.5" />
                  </Button>
                  <span class="px-2 font-mono">{{ browsePage + 1 }} / {{ totalPages }}</span>
                  <Button size="sm" variant="outline" class="h-7 px-2" :disabled="browsePage >= totalPages - 1" @click="browsePage++; loadBrowse()">
                    <ChevronRight class="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </template>
          </TabsContent>

          <!-- QUERY -->
          <TabsContent value="query" class="space-y-3">
            <Card>
              <CardContent class="pt-4 pb-4 space-y-3">
                <Textarea
                  v-model="queryText"
                  :rows="8"
                  class="font-mono text-xs"
                  placeholder="SELECT * FROM employees WHERE salary > 60000;&#10;&#10;-- Cmd/Ctrl + Enter to run&#10;-- multiple statements allowed; each result set is shown"
                  aria-label="SQL query editor"
                  @keydown.meta.enter.prevent="runQuery"
                  @keydown.ctrl.enter.prevent="runQuery"
                />
                <div class="flex items-center gap-2">
                  <Button size="sm" :disabled="!queryText.trim()" @click="runQuery">
                    <Play class="w-3.5 h-3.5 mr-1" /> Run
                    <span class="ml-2 text-[10px] text-muted-foreground hidden sm:inline">⌘↵</span>
                  </Button>
                  <span v-if="queryMs > 0 || queryResults.length" class="text-xs text-muted-foreground font-mono">{{ queryMs }} ms</span>
                </div>
              </CardContent>
            </Card>

            <Card v-if="queryError" class="border-red-500/40">
              <CardContent class="pt-5">
                <p class="font-mono text-xs text-red-600 whitespace-pre-wrap break-all">{{ queryError }}</p>
              </CardContent>
            </Card>

            <div v-for="(res, idx) in queryResults" :key="idx" class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <p class="text-xs text-muted-foreground">
                  Result {{ idx + 1 }} · <span class="font-mono">{{ res.rows.length.toLocaleString() }} row{{ res.rows.length === 1 ? '' : 's' }}</span>
                </p>
                <div class="flex gap-1.5">
                  <Button size="sm" variant="outline" class="h-7 text-xs" @click="resultCsv(res.columns, res.rows, idx > 0 ? '-' + (idx + 1) : '')">CSV</Button>
                  <Button size="sm" variant="outline" class="h-7 text-xs" @click="resultJson(res.columns, res.rows, idx > 0 ? '-' + (idx + 1) : '')">JSON</Button>
                </div>
              </div>
              <div class="border border-border rounded-xl overflow-x-auto max-h-[50vh] overflow-y-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-border bg-muted/30 text-left sticky top-0">
                      <th v-for="c in res.columns" :key="c" class="p-2 font-semibold font-mono whitespace-nowrap">{{ c }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, ri) in res.rows" :key="ri" class="border-b border-border/40 hover:bg-primary/[0.03]">
                      <td v-for="(c, ci) in res.columns" :key="c + ci" class="p-2 max-w-[280px] truncate font-mono" :title="cellDisplay(r[ci])">
                        <span v-if="r[ci] === null" class="italic text-muted-foreground/50">NULL</span>
                        <span v-else-if="isBlob(r[ci])" class="text-purple-600">BLOB {{ r[ci].length }}B</span>
                        <span v-else>{{ r[ci] }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Card v-if="!queryResults.length && !queryError" class="border-dashed">
              <CardContent class="pt-5 text-xs text-muted-foreground">
                Run a query to see results. Every SQL statement SQLite supports works here — CREATE TABLE, INSERT, UPDATE, JOINs, CTEs, window functions, PRAGMA.
              </CardContent>
            </Card>
          </TabsContent>

          <!-- SCHEMA -->
          <TabsContent value="schema" class="space-y-3">
            <div v-for="obj in [...schemaTables, ...schemaViews, ...schemaIndexes, ...schemaTriggers]" :key="obj.type + '-' + obj.name" class="border border-border rounded-xl">
              <div class="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/50 bg-muted/20">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase"
                    :class="{
                      'bg-blue-100 text-blue-700': obj.type === 'table',
                      'bg-green-100 text-green-700': obj.type === 'view',
                      'bg-amber-100 text-amber-700': obj.type === 'index',
                      'bg-purple-100 text-purple-700': obj.type === 'trigger'
                    }">{{ obj.type }}</span>
                  <span class="text-xs font-mono font-semibold truncate">{{ obj.name }}</span>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <button
                    v-if="obj.type === 'table'"
                    class="text-[10px] px-2 py-1 border border-border rounded-md hover:border-primary/40 transition-colors"
                    @click="openTable(obj.name)"
                  >Browse</button>
                  <button class="p-1.5 rounded hover:bg-muted" :aria-label="'Copy DDL for ' + obj.name" @click="copyText(obj.sql || '-- no DDL (auto ' + obj.type + ')', 'ddl-' + obj.name)">
                    <Check v-if="copiedKey === 'ddl-' + obj.name" class="w-3.5 h-3.5 text-green-600" />
                    <Copy v-else class="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <pre class="p-3 text-[11px] font-mono whitespace-pre-wrap break-all m-0">{{ obj.sql || '(auto-generated ' + obj.type + ')' }}</pre>
            </div>
            <Card v-if="!schemaTables.length && !schemaViews.length" class="border-dashed">
              <CardContent class="pt-5 text-xs text-muted-foreground">
                No schema objects. Run CREATE TABLE in the Query tab, or import a CSV.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </template>
  </div>
</template>
