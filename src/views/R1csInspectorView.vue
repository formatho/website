<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, AlertCircle, CircuitBoard, Download } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'R1CS Viewer - Inspect Circom Circuit Files Online | Formatho',
  description:
    'Open and inspect Circom R1CS constraint files in your browser: wire count, constraints, public/private inputs, curve, and per-constraint signal terms with labels. Also reads .wtns witness files. Nothing is uploaded.',
  keywords: [
    'r1cs viewer',
    'r1cs info online',
    'inspect r1cs file',
    'circom constraint count',
    'snarkjs r1cs',
    'wtns viewer',
    'r1cs file format'
  ],
  ogType: 'website'
})

// ---------------- binary reader ----------------
class Reader {
  off = 0
  constructor(public dv: DataView) {}
  u32(): number {
    const v = this.dv.getUint32(this.off, true)
    this.off += 4
    return v
  }
  u64(): bigint {
    const v = this.dv.getBigUint64(this.off, true)
    this.off += 8
    return v
  }
  bytes(n: number): Uint8Array {
    const v = new Uint8Array(this.dv.buffer, this.dv.byteOffset + this.off, n)
    this.off += n
    return v
  }
  fieldLE(n8: number): bigint {
    const b = this.bytes(n8)
    let v = 0n
    for (let i = b.length - 1; i >= 0; i--) v = (v << 8n) | BigInt(b[i])
    return v
  }
  get remaining(): number {
    return this.dv.byteLength - this.off
  }
}

// x = mont * R^-1 mod p  (r1cs stores Fr values in little-endian Montgomery form)
function modPow(base: bigint, exp: bigint, p: bigint): bigint {
  let r = 1n
  let b = base % p
  let e = exp
  while (e > 0n) {
    if (e & 1n) r = (r * b) % p
    b = (b * b) % p
    e >>= 1n
  }
  return r
}
function fromMontgomery(mont: bigint, p: bigint, n8: number): bigint {
  const R = 1n << BigInt(8 * n8)
  const Rinv = modPow(R, p - 2n, p)
  return (mont * Rinv) % p
}

const KNOWN_PRIMES: Record<string, string> = {
  '21888242871839275222246405745257275088548364400416034343698204186575808495617': 'BN254 (bn128) — Groth16 default',
  '52435875175126190479447740508185965837690552500527637822603658699938581184513': 'BLS12-381 scalar field',
  '18446744069414584321': 'Goldilocks (Plonky3)'
}

interface Term { wire: number; value: bigint }
interface Constraint { a: Term[]; b: Term[]; c: Term[] }
interface ParsedR1cs {
  kind: 'r1cs'
  version: number
  prime: string
  primeHex: string
  curveName: string
  nVars: number
  nOutputs: number
  nPubInputs: number
  nPrvInputs: number
  nLabels: bigint
  nConstraints: number
  wireLabels: bigint[] // wire -> label
  annotations: Map<string, string> // label -> name
  constraints: Constraint[]
}
interface ParsedWtns {
  kind: 'wtns'
  version: number
  prime: string
  curveName: string
  witness: bigint[]
}

function parseR1csOrWtns(buf: ArrayBuffer): ParsedR1cs | ParsedWtns {
  const dv = new DataView(buf)
  const r = new Reader(dv)
  const magic = new TextDecoder().decode(r.bytes(4))
  if (magic === 'wtns') return parseWtns(r)
  if (magic !== 'r1cs') throw new Error('Not an R1CS or wtns file (bad magic). Expected a file produced by circom/snarkjs.')
  return parseR1cs(r)
}

function parseWtns(r: Reader): ParsedWtns {
  const version = r.u32()
  r.u32() // nSections
  // find header (type 1) and data (type 2)
  let header: Reader | null = null
  let data: Reader | null = null
  while (r.remaining > 0) {
    const type = r.u32()
    const size = Number(r.u64())
    const start = r.off
    if (type === 1) header = new Reader(new DataView(r.dv.buffer, r.dv.byteOffset + start, size))
    if (type === 2) data = new Reader(new DataView(r.dv.buffer, r.dv.byteOffset + start, size))
    r.off = start + size
  }
  if (!header || !data) throw new Error('Malformed wtns file: missing sections.')
  const n8 = header.u32()
  const prime = header.fieldLE(n8).toString()
  const nWitness = header.u32()
  const witness: bigint[] = []
  for (let i = 0; i < nWitness; i++) witness.push(fromMontgomery(data.fieldLE(n8), BigInt(prime), n8))
  return { kind: 'wtns', version, prime, curveName: KNOWN_PRIMES[prime] || 'Unknown field', witness }
}

function parseR1cs(r: Reader): ParsedR1cs {
  const version = r.u32()
  r.u32() // nSections
  const sections = new Map<number, { start: number; size: number }>()
  while (r.remaining > 0) {
    const type = r.u32()
    const size = Number(r.u64())
    sections.set(type, { start: r.off, size })
    r.off += size
  }

  const sec = (t: number) => {
    const s = sections.get(t)
    return s ? new Reader(new DataView(r.dv.buffer, r.dv.byteOffset + s.start, s.size)) : null
  }

  const h = sec(1)
  if (!h) throw new Error('Malformed R1CS: no header section.')
  const n8 = h.u32()
  const primeBig = h.fieldLE(n8)
  const prime = primeBig.toString()
  const nVars = h.u32()
  const nOutputs = h.u32()
  const nPubInputs = h.u32()
  const nPrvInputs = h.u32()
  const nLabels = h.u64()
  const nConstraints = h.u32()
  if (h.remaining > 0) {
    const m = h.u32() // custom gates (extended format)
    if (m > 0) throw new Error('This R1CS uses custom gates (plonk/extended format), which this viewer does not fully parse yet. Constraint stats may be incomplete.')
  }

  // wire -> label map
  let wireLabels: bigint[] = []
  const w2l = sec(3)
  if (w2l && w2l.remaining >= 4) {
    const n = w2l.u32()
    for (let i = 0; i < n && w2l.remaining >= 8; i++) wireLabels.push(w2l.u64())
  }

  // label -> annotation (signal names)
  const annotations = new Map<string, string>()
  const l2a = sec(4)
  if (l2a && l2a.remaining >= 4) {
    const n = l2a.u32()
    const dec = new TextDecoder('latin1')
    for (let i = 0; i < n && l2a.remaining > 12; i++) {
      const label = l2a.u64()
      const len = l2a.u32()
      if (len > 0 && len < 4096) annotations.set(label.toString(), dec.decode(l2a.bytes(len)))
    }
  }

  // constraints
  const constraints: Constraint[] = []
  const c = sec(2)
  if (c && nConstraints > 0) {
    const readLC = (): Term[] => {
      const n = c!.u32()
      const terms: Term[] = []
      for (let i = 0; i < n; i++) {
        const wire = c!.u32()
        const value = fromMontgomery(c!.fieldLE(n8), primeBig, n8)
        terms.push({ wire, value })
      }
      return terms
    }
    for (let i = 0; i < nConstraints; i++) {
      constraints.push({ a: readLC(), b: readLC(), c: readLC() })
    }
  }

  return {
    kind: 'r1cs',
    version,
    prime,
    primeHex: '0x' + primeBig.toString(16),
    curveName: KNOWN_PRIMES[prime] || 'Unknown field',
    nVars,
    nOutputs,
    nPubInputs,
    nPrvInputs,
    nLabels,
    nConstraints,
    wireLabels,
    annotations,
    constraints
  }
}

// Sample circuit: private squaring (out = prv^2 + 3*pub) compiled with 2
// constraints over BN254 — same fixture used to validate the parser, base64'd.
const SAMPLE_R1CS_B64 = 'cjFjcwEAAAAEAAAAAQAAAEQAAAAAAAAAIAAAAAEAAPCT9eFDkXC5eUjoMyhdWIGBtkVQuCmgMeFyTmQwBgAAAAEAAAABAAAAAQAAAAgAAAAAAAAAAgAAAAAAAAACAAAAFAEAAAAAAAABAAAABAAAAPv//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoOAQAAAAQAAAD7//9PHDSWrCnNYJ+Vdvw2LkZ5eG+jbmYv3weawXcKDgEAAAAFAAAA+///Txw0lqwpzWCflXb8Ni5GeXhvo25mL98HmsF3Cg4BAAAAAAAAAPv//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoOAgAAAAQAAAD7//9PHDSWrCnNYJ+Vdvw2LkZ5eG+jbmYv3weawXcKDgIAAADx///vVJzCBX1nIt7AY/WkitJraU7qSzOOnRfORGcfKgEAAAAFAAAA+///Txw0lqwpzWCflXb8Ni5GeXhvo25mL98HmsF3Cg4DAAAANAAAAAAAAAAGAAAACgAAAAAAAAALAAAAAAAAAAwAAAAAAAAADQAAAAAAAAAOAAAAAAAAAA8AAAAAAAAABAAAAHwAAAAAAAAABgAAAAoAAAAAAAAABgAAAG1haW4ueAsAAAAAAAAACAAAAG1haW4ub3V0DAAAAAAAAAAIAAAAbWFpbi5wdWINAAAAAAAAAAgAAABtYWluLnBydg4AAAAAAAAABwAAAG1haW4ueDIPAAAAAAAAAAsAAABtYWluLnJlc3VsdA=='
const SAMPLE_WTNS_B64 = 'd3RucwIAAAACAAAAAQAAACgAAAAAAAAAIAAAAAEAAPCT9eFDkXC5eUjoMyhdWIGBtkVQuCmgMeFyTmQwBgAAAAIAAADAAAAAAAAAAPv//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoOIv//37UJDSIHYjBxJpH8Ijdf1bG7i2Mq0hv3tmD4Awnb//9PnoFXMAG7MmiGbX8wiTpOSJ/sZVz42dNzZamAAdH//+/W6YOJVFX0prFaeJ7lxkA5fjNDKVeY46fomJUdVP7/v6psOYIizfd91KY3yUBEwHvfcsvZPzoIge/XTBhU/v+/qmw5giLN933UpjfJQETAe99yy9k/OgiB79dMGA=='

function loadSample(which: 'r1cs' | 'wtns') {
  parseError.value = ''
  parsed.value = null
  const b64 = which === 'r1cs' ? SAMPLE_R1CS_B64 : SAMPLE_WTNS_B64
  fileName.value = which === 'r1cs' ? 'example-squaring.r1cs' : 'example-squaring.wtns'
  try {
    const bin = atob(b64)
    const buf = new ArrayBuffer(bin.length)
    const arr = new Uint8Array(buf)
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i)
    parsed.value = parseR1csOrWtns(buf)
  } catch (e: any) {
    parseError.value = e?.message || 'Failed to load sample.'
  }
}

// ---------------- UI state ----------------
const fileName = ref('')
const parsed = ref<ParsedR1cs | ParsedWtns | null>(null)
const parseError = ref('')
const search = ref('')
const showCount = ref(100)
const dragging = ref(false)

async function handleFile(file: File) {
  parseError.value = ''
  parsed.value = null
  fileName.value = file.name
  try {
    parsed.value = parseR1csOrWtns(await file.arrayBuffer())
  } catch (e: any) {
    parseError.value = e?.message || 'Failed to parse the file.'
  }
}
function onFileInput(ev: Event) {
  const f = (ev.target as HTMLInputElement).files?.[0]
  if (f) handleFile(f)
}
function onDrop(ev: DragEvent) {
  dragging.value = false
  const f = ev.dataTransfer?.files?.[0]
  if (f) handleFile(f)
}

function wireName(wire: number, p: ParsedR1cs): string {
  const label = p.wireLabels[wire]
  if (label !== undefined) {
    const ann = p.annotations.get(label.toString())
    if (ann) return ann.replace(/^main\./, '')
  }
  if (wire === 0) return '1 (constant)'
  if (wire <= p.nOutputs) return `out${wire - 1}`
  if (wire <= p.nOutputs + p.nPubInputs) return `pub${wire - p.nOutputs - 1}`
  if (wire <= p.nOutputs + p.nPubInputs + p.nPrvInputs) return `prv${wire - p.nOutputs - p.nPubInputs - 1}`
  return `w${wire}`
}

function termText(t: Term, p: ParsedR1cs): string {
  const v = t.value
  if (v === 1n) return wireName(t.wire, p)
  if (v === 0n) return '0'
  return `${v}·${wireName(t.wire, p)}`
}

const filteredConstraints = computed(() => {
  const p = parsed.value
  if (!p || p.kind !== 'r1cs') return []
  if (!search.value.trim()) return p.constraints
  const q = search.value.toLowerCase()
  return p.constraints.filter((c) =>
    [...c.a, ...c.b, ...c.c].some((t) => wireName(t.wire, p).toLowerCase().includes(q))
  )
})

const stats = computed(() => {
  const p = parsed.value
  if (!p) return []
  if (p.kind === 'wtns') {
    return [
      ['Witness signals', String(p.witness.length)],
      ['Field', p.curveName],
      ['Version', String(p.version)]
    ]
  }
  return [
    ['Constraints', p.nConstraints.toLocaleString()],
    ['Wires (signals)', p.nVars.toLocaleString()],
    ['Labels', p.nLabels.toLocaleString()],
    ['Outputs', p.nOutputs.toLocaleString()],
    ['Public inputs', p.nPubInputs.toLocaleString()],
    ['Private inputs', p.nPrvInputs.toLocaleString()],
    ['Field', p.curveName],
    ['Version', String(p.version)]
  ]
})

function downloadJson() {
  if (!parsed.value) return
  const data =
    parsed.value.kind === 'wtns'
      ? { kind: 'wtns', witness: parsed.value.witness.map(String) }
      : {
          kind: 'r1cs',
          prime: parsed.value.prime,
          nVars: parsed.value.nVars,
          nOutputs: parsed.value.nOutputs,
          nPubInputs: parsed.value.nPubInputs,
          nPrvInputs: parsed.value.nPrvInputs,
          nConstraints: parsed.value.nConstraints,
          constraints: parsed.value.constraints.slice(0, showCount.value).map((c) => ({
            a: c.a.map((t) => ({ w: t.wire, v: t.value.toString() })),
            b: c.b.map((t) => ({ w: t.wire, v: t.value.toString() })),
            c: c.c.map((t) => ({ w: t.wire, v: t.value.toString() }))
          }))
        }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName.value.replace(/\.(r1cs|wtns)$/i, '') + '.json'
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <CircuitBoard class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">R1CS Circuit Inspector</h1>
        <p class="text-sm text-muted-foreground">
          Inspect Circom constraint files (.r1cs) and witnesses (.wtns) locally — no snarkjs install, no upload
        </p>
      </div>
    </div>

    <Card v-if="!parsed">
      <CardContent class="pt-6">
        <label
          class="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 cursor-pointer transition-colors hover:bg-muted/50"
          :class="dragging ? 'border-primary bg-primary/5' : 'border-border'"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
          @drop.prevent="onDrop"
        >
          <Upload class="w-8 h-8 text-muted-foreground" />
          <span class="font-semibold">{{ dragging ? 'Drop it here' : 'Click or drop a .r1cs or .wtns file' }}</span>
          <span class="text-xs text-muted-foreground">
            Works with files from circom, snarkjs, and coCircom (Taceo) — the r1cs format is shared.
          </span>
          <input type="file" accept=".r1cs,.wtns" class="sr-only" aria-label="Choose a .r1cs or .wtns file" @change="onFileInput" />
        </label>
        <p v-if="parseError" class="text-sm text-red-500 flex items-center gap-1 mt-3">
          <AlertCircle class="w-4 h-4 shrink-0" /> {{ parseError }}
        </p>
        <div class="flex items-center justify-center gap-3 mt-4 flex-wrap">
          <span class="text-xs text-muted-foreground">No file handy?</span>
          <Button variant="outline" size="sm" @click="loadSample('r1cs')">Load example circuit (.r1cs)</Button>
          <Button variant="outline" size="sm" @click="loadSample('wtns')">Load example witness (.wtns)</Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="parsed">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <p class="font-mono text-sm">{{ fileName }}</p>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="downloadJson"><Download class="w-4 h-4 mr-1" /> JSON</Button>
          <Button variant="outline" size="sm" @click="parsed = null; fileName = ''">New file</Button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card v-for="[label, value] in stats" :key="label">
          <CardContent class="pt-5 pb-4">
            <p class="text-xs text-muted-foreground uppercase tracking-wide">{{ label }}</p>
            <p class="text-lg font-bold mt-1 truncate" :title="value">{{ value }}</p>
          </CardContent>
        </Card>
      </div>

      <Card v-if="parsed.kind === 'r1cs'">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 flex-wrap gap-2">
          <CardTitle class="text-lg">Constraints ({{ filteredConstraints.length.toLocaleString() }})</CardTitle>
          <Input v-model="search" placeholder="Filter by signal name…" class="w-64" aria-label="Filter constraints by signal name" />
        </CardHeader>
        <CardContent class="space-y-2">
          <div
            v-for="(c, i) in filteredConstraints.slice(0, showCount)"
            :key="i"
            class="p-3 border border-border rounded-lg font-mono text-xs break-words"
          >
            <span class="text-muted-foreground">#{{ i }}:</span>
            <span class="text-blue-700">{{ c.a.map((t) => termText(t, parsed)).join(' + ') || '0' }}</span>
            <span class="text-muted-foreground"> × </span>
            <span class="text-blue-700">{{ c.b.map((t) => termText(t, parsed)).join(' + ') || '0' }}</span>
            <span class="text-muted-foreground"> = </span>
            <span class="text-blue-700">{{ c.c.map((t) => termText(t, parsed)).join(' + ') || '0' }}</span>
          </div>
          <Button v-if="filteredConstraints.length > showCount" variant="outline" class="w-full" @click="showCount += 200">
            Show more ({{ (filteredConstraints.length - showCount).toLocaleString() }} remaining)
          </Button>
        </CardContent>
      </Card>

      <Card v-else>
        <CardHeader><CardTitle class="text-lg">Witness values</CardTitle></CardHeader>
        <CardContent>
          <div class="border border-border rounded-lg overflow-auto max-h-[60vh]">
            <table class="w-full text-xs font-mono">
              <thead class="bg-muted/60 sticky top-0">
                <tr><th class="text-left p-2">Index</th><th class="text-left p-2">Value</th></tr>
              </thead>
              <tbody>
                <tr v-for="(w, i) in parsed.witness.slice(0, 500)" :key="i" class="border-t border-border/50">
                  <td class="p-2 text-muted-foreground">{{ i }}</td>
                  <td class="p-2 break-all">{{ w }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="parsed.witness.length > 500" class="text-xs text-muted-foreground mt-2">
            Showing first 500 of {{ parsed.witness.length.toLocaleString() }} signals. Use JSON export for the full witness.
          </p>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
