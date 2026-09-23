<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link2, QrCode, Copy, Check, Plus, Trash2, AlertCircle, CheckCircle2, FileJson } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'
import { useFunnelHandoff } from '@/composables/useFunnelHandoff'
import { onMounted } from 'vue'

useSEO({
  title: 'GS1 Digital Link Builder & Parser - GTIN URLs | Formatho',
  description:
    'Build and decode GS1 Digital Link URLs: turn GTIN, serial, lot, and expiry into a web URL (and QR code), or parse one back. Check-digit and date validation. Free, client-side.',
  keywords: ['gs1 digital link', 'gs1 digital link builder', 'gtin url', 'gs1 qr code', 'element string', 'ai 01 gtin', 'fmd serialisation', 'product url'],
  ogType: 'website'
})

// ─── GS1 Application Identifiers (curated common set) ───
interface AiDef {
  ai: string
  label: string
  kind: 'gtin' | 'date' | 'datetime' | 'alnum'
  fixed?: number
  placeholder: string
  description: string
}
const AI_DEFS: AiDef[] = [
  { ai: '01', label: 'GTIN', kind: 'gtin', fixed: 14, placeholder: '09506000134352', description: 'Global Trade Item Number' },
  { ai: '02', label: 'Contained GTIN', kind: 'gtin', fixed: 14, placeholder: '09506000134352', description: 'GTIN of contained trade items' },
  { ai: '10', label: 'Batch / Lot', kind: 'alnum', placeholder: 'ABC123', description: 'Batch or lot number' },
  { ai: '11', label: 'Production date', kind: 'date', fixed: 6, placeholder: '251231', description: 'YYMMDD' },
  { ai: '13', label: 'Packaging date', kind: 'date', fixed: 6, placeholder: '251231', description: 'YYMMDD' },
  { ai: '15', label: 'Best-before date', kind: 'date', fixed: 6, placeholder: '251231', description: 'YYMMDD' },
  { ai: '17', label: 'Expiry date', kind: 'date', fixed: 6, placeholder: '251231', description: 'YYMMDD' },
  { ai: '21', label: 'Serial number', kind: 'alnum', placeholder: 'SN123456', description: 'Serial number (unique per item)' },
  { ai: '22', label: 'Consumer product variant', kind: 'alnum', placeholder: 'VARIANT', description: 'cpv' },
  { ai: '235', label: 'TPX', kind: 'alnum', placeholder: 'TPX-VALUE', description: 'Third-party controlled extension' },
  { ai: '240', label: 'Additional product ID', kind: 'alnum', placeholder: 'ADDITIONAL', description: 'Additional product identification assigned by the brand owner' },
  { ai: '241', label: 'Customer part number', kind: 'alnum', placeholder: 'PART-NO', description: 'Customer part number' },
  { ai: '250', label: 'Secondary serial number', kind: 'alnum', placeholder: 'SERIAL2', description: 'Additional serial number' },
  { ai: '253', label: 'GDTI', kind: 'alnum', fixed: 17, placeholder: '09506000134352001', description: 'Document type + serial' },
  { ai: '254', label: 'GLN extension', kind: 'alnum', placeholder: 'EXT', description: 'GLN extension component' },
  { ai: '255', label: 'GCN', kind: 'alnum', fixed: 15, placeholder: '0950600013435 001', description: 'Coupon number + serial' },
  { ai: '30', label: 'Variable count', kind: 'alnum', fixed: 8, placeholder: '12', description: 'Count of items (variable measure trade item)' },
  { ai: '310y', label: 'Net weight (kg)', kind: 'alnum', fixed: 7, placeholder: '0012500', description: 'Metric net weight, y = decimal position (e.g. 3103 = 12.50 kg)' },
  { ai: '410', label: 'Ship-to GLN', kind: 'alnum', fixed: 13, placeholder: '0950600013435', description: 'GLN of ship-to location' },
  { ai: '414', label: 'GLN', kind: 'alnum', fixed: 13, placeholder: '0950600013435', description: 'Global Location Number' },
  { ai: '417', label: 'Party GLN', kind: 'alnum', fixed: 13, placeholder: '0950600013435', description: 'GLN of receiving party' },
  { ai: '7003', label: 'Expiry date + time', kind: 'datetime', fixed: 10, placeholder: '2512312359', description: 'YYMMDDHHMM' },
  { ai: '7005', label: 'Catch area', kind: 'alnum', placeholder: 'NORTH SEA', description: 'Catch area for fishery products' },
  { ai: '8005', label: 'Price per unit', kind: 'alnum', fixed: 6, placeholder: '001299', description: 'Price per unit of measure' },
  { ai: '8017', label: 'GSRN provider', kind: 'alnum', fixed: 18, placeholder: '095060001343520012', description: 'Service relation: provider' },
  { ai: '8018', label: 'GSRN recipient', kind: 'alnum', fixed: 18, placeholder: '095060001343520012', description: 'Service relation: recipient' },
  { ai: '8020', label: 'Payment slip reference', kind: 'alnum', placeholder: 'REF123456', description: 'Reference on payment slip' },
  { ai: '91', label: 'Internal AI 91', kind: 'alnum', placeholder: 'VALUE', description: 'Internal company use (1-90)' },
  { ai: '92', label: 'Internal AI 92', kind: 'alnum', placeholder: 'VALUE', description: 'Internal company use (1-90)' },
  { ai: '93', label: 'Internal AI 93', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' },
  { ai: '94', label: 'Internal AI 94', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' },
  { ai: '95', label: 'Internal AI 95', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' },
  { ai: '96', label: 'Internal AI 96', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' },
  { ai: '98', label: 'Internal AI 98', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' },
  { ai: '99', label: 'Internal AI 99', kind: 'alnum', placeholder: 'VALUE', description: 'Company internal information' }
]
const AI_BY_CODE = new Map(AI_DEFS.map((d) => [d.ai, d]))

// ─── Validation helpers ───
function gtinCheckDigitValid(gtin: string): boolean {
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(gtin)) return false
  const digits = gtin.split('').map(Number)
  const check = digits.pop()!
  let sum = 0
  digits.reverse().forEach((d, i) => { sum += d * (i % 2 === 0 ? 3 : 1) })
  return (10 - (sum % 10)) % 10 === check
}

function validateDate6(v: string): string | null {
  if (!/^\d{6}$/.test(v)) return 'must be 6 digits (YYMMDD)'
  const yy = Number(v.slice(0, 2))
  const mm = Number(v.slice(2, 4))
  const dd = Number(v.slice(4, 6))
  if (mm < 1 || mm > 12) return 'invalid month'
  if (dd < 1 || dd > 31) return 'invalid day'
  return null
}

function validateValue(def: AiDef, v: string): string | null {
  if (!v) return 'required'
  if (def.kind === 'gtin') {
    if (!/^\d{8}$|^\d{12,14}$/.test(v)) return 'GTIN must be 8 or 12-14 digits'
    if (!gtinCheckDigitValid(v)) return 'check digit is invalid'
  } else if (def.kind === 'date') {
    return validateDate6(v)
  } else if (def.kind === 'datetime') {
    if (!/^\d{10}$/.test(v)) return 'must be 10 digits (YYMMDDHHMM)'
    const d = validateDate6(v.slice(0, 6))
    if (d) return d
    const hh = Number(v.slice(6, 8))
    const mi = Number(v.slice(8, 10))
    if (hh > 23 || mi > 59) return 'invalid time'
  } else if (def.fixed && v.length !== def.fixed) {
    return `must be exactly ${def.fixed} characters`
  }
  // GS1 DL reserves some characters that require percent-encoding
  if (/[/%?#]/.test(v)) return 'contains reserved URL characters — remove them or they will be encoded'
  return null
}

// ─── Builder state ───
interface Row { ai: string; value: string }
const domain = ref('https://example.com')
const rows = ref<Row[]>([
  { ai: '01', value: '09506000134352' },
  { ai: '21', value: 'SN123456' },
  { ai: '17', value: '251231' }
])
const copied = ref('')

const addRow = () => rows.value.push({ ai: '10', value: '' })
const removeRow = (i: number) => rows.value.splice(i, 1)

const rowErrors = computed(() => rows.value.map((r) => {
  const def = AI_BY_CODE.get(r.ai)
  if (!def) return 'unknown AI'
  return validateValue(def, r.value)
}))

const builderUrl = computed(() => {
  if (!/^https?:\/\/.+/.test(domain.value)) return ''
  const parts: string[] = []
  for (const r of rows.value) {
    if (!r.value) continue
    parts.push(`${r.ai}/${encodeURIComponent(r.value)}`)
  }
  if (!parts.length) return ''
  return `${domain.value.replace(/\/+$/, '')}/${parts.join('/')}`
})

const elementString = computed(() =>
  rows.value.filter((r) => r.value).map((r) => `(${r.ai})${r.value}`).join('')
)

const qrDataUrl = ref('')
const { inFunnel, saveOutput, previousOutput } = useFunnelHandoff()
// Funnel handoff: prefill GTIN row from the previous step's output (e.g. a
// validated GTIN from GTIN Validator), and publish the built URL as this
// step's output so the next tool (QR generator) can pick it up.
onMounted(() => {
  if (!inFunnel) return
  const prev = previousOutput()
  if (!prev) return
  const gtin = prev.match(/\b(\d{8}|\d{12,14})\b/)?.[1]
  if (gtin) {
    const row = rows.value.find((r) => r.ai === '01')
    if (row) row.value = gtin.padStart(14, '0')
    else rows.value.unshift({ ai: '01', value: gtin.padStart(14, '0') })
  }
})
watch(builderUrl, (url) => {
  if (inFunnel && url) saveOutput(url)
})
watch(builderUrl, async (url) => {
  qrDataUrl.value = ''
  if (!url) return
  try {
    const QRCode = (await import('qrcode')).default
    qrDataUrl.value = await QRCode.toDataURL(url, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M'
    })
  } catch { /* qrcode unavailable */ }
}, { immediate: true })

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => { copied.value = '' }, 1500)
  } catch { /* clipboard unavailable */ }
}

function fillSample() {
  domain.value = 'https://example.com'
  rows.value = [
    { ai: '01', value: '09506000134352' },
    { ai: '21', value: 'SN123456' },
    { ai: '10', value: 'LOT2025A' },
    { ai: '17', value: '251231' }
  ]
}

// ─── Parser state ───
const parseInput = ref('https://example.com/01/09506000134352/21/SN123456/17/251231/10/LOT2025A')

interface ParsedEntry { ai: string; value: string; label: string; note: string; error: string | null }
const parsed = ref<ParsedEntry[] | null>(null)
const parseError = ref('')
const parsedBase = ref('')

function parse() {
  parseError.value = ''
  parsed.value = null
  parsedBase.value = ''
  const raw = parseInput.value.trim()
  if (!raw) return

  const entries: Array<{ ai: string; value: string }> = []

  // Element string form: (01)0950…(21)ABC
  if (raw.includes('(')) {
    const re = /\((\d{2,4})\)([^()]*)/g
    let m: RegExpExecArray | null
    while ((m = re.exec(raw))) entries.push({ ai: m[1], value: m[2] })
    if (!entries.length) { parseError.value = 'No (AI)value pairs found in element string'; return }
  } else {
    // URL form
    const urlLike = /^https?:\/\/[^/\s]+\/(.+)$/i.exec(raw)
    const path = urlLike ? urlLike[1] : raw.replace(/^\//, '')
    parsedBase.value = urlLike ? raw.slice(0, raw.length - path.length - 1) : ''
    const segs = decodeURIComponent(path).split('/').filter(Boolean)
    if (segs.length < 2 || segs.length % 2 !== 0) {
      parseError.value = 'Path must be AI/value pairs: /01/GTIN/21/SERIAL…'
      return
    }
    for (let i = 0; i < segs.length; i += 2) {
      if (!/^\d{2,4}$/.test(segs[i])) {
        parseError.value = `"${segs[i]}" is not a numeric Application Identifier`
        return
      }
      entries.push({ ai: segs[i], value: segs[i + 1] })
    }
  }

  const out: ParsedEntry[] = []
  for (const e of entries) {
    const def = AI_BY_CODE.get(e.ai)
    let label = 'Unknown AI'
    let error: string | null = null
    let note = ''
    if (def) {
      label = def.label
      error = validateValue(def, e.value)
      note = def.description
      if (def.kind === 'gtin' && !error) {
        // normalize display: show as GTIN-13/14
        note += ` (valid check digit, ${e.value.length}-digit)`
      }
    } else {
      error = 'not a curated AI — verify against the GS1 AI list'
    }
    out.push({ ai: e.ai, value: e.value, label, note, error })
  }

  const hasGtin = out.some((o) => o.ai === '01')
  if (!hasGtin && entries.length) out.unshift({
    ai: '—', value: '', label: 'No primary GTIN (AI 01)',
    note: 'A GS1 Digital Link normally identifies an item with AI 01 first',
    error: null
  })

  parsed.value = out
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-4 space-y-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg"><Link2 class="w-5 h-5 text-primary" /></div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">GS1 Digital Link Builder &amp; Parser</h1>
          <p class="text-xs text-muted-foreground">Turn GTIN + serial/lot/expiry into a web URL and QR — or decode one back. Runs entirely in your browser.</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
      </div>
    </div>

    <Tabs default-value="build" class="space-y-3">
      <TabsList>
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="parse">Parse &amp; Validate</TabsTrigger>
      </TabsList>

      <!-- BUILD -->
      <TabsContent value="build" class="space-y-4">
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Stem URL and key-value pairs</CardTitle></CardHeader>
          <CardContent class="space-y-3">
            <div>
              <label class="text-xs text-muted-foreground mb-1 block">Stem URL (your product page domain)</label>
              <Input v-model="domain" class="font-mono text-xs h-9" placeholder="https://example.com" aria-label="Stem URL" />
            </div>

            <div class="space-y-2">
              <div v-for="(row, i) in rows" :key="i" class="flex flex-col sm:flex-row gap-2">
                <select
                  v-model="row.ai"
                  class="h-9 rounded-md border border-input bg-background px-2 text-xs font-mono w-full sm:w-64 shrink-0"
                  :aria-label="'Application Identifier ' + (i + 1)"
                >
                  <option v-for="def in AI_DEFS" :key="def.ai" :value="def.ai">{{ def.ai }} — {{ def.label }}</option>
                </select>
                <Input
                  v-model="row.value"
                  class="font-mono text-xs h-9 flex-1"
                  :placeholder="AI_BY_CODE.get(row.ai)?.placeholder || 'value'"
                  :aria-label="'Value for AI ' + row.ai"
                />
                <Button variant="ghost" size="sm" class="h-9 px-2 shrink-0" aria-label="Remove pair" @click="removeRow(i)">
                  <Trash2 class="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <p v-for="(err, i) in rowErrors" :key="'e' + i" class="text-[10px] ml-1"
                 :class="err && rows[i].value ? 'text-red-500' : 'text-transparent'">
                {{ err || '.' }}
              </p>
            </div>

            <Button variant="outline" size="sm" @click="addRow"><Plus class="w-3.5 h-3.5 mr-1" /> Add pair</Button>
          </CardContent>
        </Card>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card class="border-primary/30">
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium flex items-center gap-1.5"><Link2 class="w-4 h-4 text-primary" /> GS1 Digital Link URI</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <div class="flex items-start justify-between gap-2 p-3 bg-muted/30 border border-border rounded-lg">
                <code class="text-xs font-mono break-all">{{ builderUrl || '— fill in pairs above —' }}</code>
                <Button v-if="builderUrl" variant="ghost" size="sm" class="h-7 px-2 shrink-0" aria-label="Copy URL" @click="copyText(builderUrl, 'url')">
                  <Check v-if="copied === 'url'" class="w-3.5 h-3.5 text-green-600" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </Button>
              </div>
              <div>
                <p class="text-[10px] uppercase text-muted-foreground mb-1">Equivalent GS1 element string</p>
                <div class="flex items-start justify-between gap-2">
                  <code class="text-xs font-mono break-all text-muted-foreground">{{ elementString || '—' }}</code>
                  <Button v-if="elementString" variant="ghost" size="sm" class="h-7 px-2 shrink-0" aria-label="Copy element string" @click="copyText(elementString, 'es')">
                    <Check v-if="copied === 'es'" class="w-3.5 h-3.5 text-green-600" />
                    <Copy v-else class="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium flex items-center gap-1.5"><QrCode class="w-4 h-4 text-primary" /> QR code (GS1 Digital Link in QR)</CardTitle></CardHeader>
            <CardContent>
              <div v-if="qrDataUrl" class="flex flex-col items-center gap-2">
                <img :src="qrDataUrl" alt="GS1 Digital Link QR code" width="320" height="320" class="border border-border rounded-lg bg-white p-2" />
                <a :href="qrDataUrl" :download="'gs1-digital-link-qr.png'" class="text-xs text-primary hover:underline">Download PNG</a>
              </div>
              <p v-else class="text-xs text-muted-foreground py-8 text-center">QR preview appears when the link is valid.</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- PARSE -->
      <TabsContent value="parse" class="space-y-4">
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">Decode a Digital Link or element string</CardTitle></CardHeader>
          <CardContent class="space-y-3">
            <Input
              v-model="parseInput"
              class="font-mono text-xs h-9"
              placeholder="https://example.com/01/09506000134352/21/SN123456 — or (01)09506000134352(21)SN123456"
              aria-label="Digital Link or element string to parse"
              @keyup.enter="parse"
            />
            <Button size="sm" :disabled="!parseInput.trim()" @click="parse"><FileJson class="w-3.5 h-3.5 mr-1" /> Decode</Button>
          </CardContent>
        </Card>

        <Card v-if="parseError" class="border-red-500/40">
          <CardContent class="pt-5 flex items-start gap-2">
            <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p class="text-xs font-mono text-red-600">{{ parseError }}</p>
          </CardContent>
        </Card>

        <Card v-if="parsed">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium">Decoded identifiers</CardTitle>
            <p v-if="parsedBase" class="text-xs font-mono text-muted-foreground">{{ parsedBase }}</p>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-border text-left bg-muted/30">
                    <th class="p-2">AI</th>
                    <th class="p-2">Meaning</th>
                    <th class="p-2">Value</th>
                    <th class="p-2">Validation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(e, i) in parsed" :key="i" class="border-b border-border/40">
                    <td class="p-2 font-mono font-semibold">{{ e.ai }}</td>
                    <td class="p-2">
                      <p class="font-medium">{{ e.label }}</p>
                      <p class="text-[10px] text-muted-foreground">{{ e.note }}</p>
                    </td>
                    <td class="p-2 font-mono break-all">{{ e.value }}</td>
                    <td class="p-2">
                      <span v-if="!e.error" class="inline-flex items-center gap-1 text-green-600"><CheckCircle2 class="w-3.5 h-3.5" /> valid</span>
                      <span v-else class="inline-flex items-center gap-1 text-red-600"><AlertCircle class="w-3.5 h-3.5" /> {{ e.error }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Info -->
    <Card>
      <CardContent class="pt-5 space-y-2 text-xs text-muted-foreground">
        <p><strong class="text-foreground">What is a GS1 Digital Link?</strong> A standard (GS1 Digital Link URI Syntax) for expressing GS1 identifiers — the numbers behind barcodes — as web URLs. Instead of a barcode that only a scanner understands, every product can carry a link like <code class="font-mono">https://example.com/01/09506000134352/21/SN123456</code> where <code class="font-mono">01</code> is the GTIN, <code class="font-mono">21</code> the serial number, <code class="font-mono">17</code> expiry, and <code class="font-mono">10</code> the batch. Scanned by any phone camera, it opens your product page with the identity data intact.</p>
        <p><strong class="text-foreground">Why it matters:</strong> EU FMD serialisation, DSCSA in the US, and consumer transparency programs all drive GTIN+serial marking; Digital Link is the bridge from those identifiers to the web. The QR code you generate here is scannable by any standard camera app.</p>
      </CardContent>
    </Card>
  </div>
</template>
