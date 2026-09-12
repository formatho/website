<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Split, Combine, EyeOff } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Shamir Secret Sharing - Split & Combine Online | Formatho',
  description:
    'Split secrets into N shares where any threshold K reconstructs the original. Visual polynomial interpolation, GF(257) arithmetic, educational threshold visualization. Free, client-side, your secret never leaves the browser.',
  keywords: ['shamir secret sharing', 'split secret into shares', 'threshold cryptography', 'secret sharing online', 'shamir splitter', 'k of n secret sharing', 'threshold scheme'],
  ogType: 'website'
})

// ---- Field arithmetic over GF(257) ----
const PRIME = 257n

function fieldAdd(a: bigint, b: bigint): bigint { return (a + b) % PRIME }
function fieldSub(a: bigint, b: bigint): bigint { return ((a - b) % PRIME + PRIME) % PRIME }
function fieldMul(a: bigint, b: bigint): bigint { return (a * b) % PRIME }
function fieldPow(a: bigint, e: bigint): bigint {
  let r = 1n
  let base = a % PRIME
  let exp = e
  while (exp > 0n) {
    if (exp & 1n) r = fieldMul(r, base)
    base = fieldMul(base, base)
    exp >>= 1n
  }
  return r
}
function fieldInv(a: bigint): bigint { return fieldPow(a, PRIME - 2n) }
function fieldDiv(a: bigint, b: bigint): bigint { return fieldMul(a, fieldInv(b)) }

// Convert string to array of field elements (each char mod PRIME)
function secretToField(secret: string): bigint[] {
  return [...secret].map(c => BigInt(c.charCodeAt(0) % 257))
}
function fieldToSecret(values: bigint[]): string {
  return values.map(v => String.fromCharCode(Number(v))).join('')
}

// ---- Split mode ----
const secret = ref('my-secret-api-key')
const totalShares = ref(5)
const threshold = ref(3)

interface Share { index: number; values: bigint[] }

const shares = ref<Share[]>([])

function textToShares(text: string, n: number, k: number): Share[] {
  const secretVals = secretToField(text)
  // generate random polynomial coefficients for each character
  const result: Share[] = Array.from({ length: n }, (_, i) => ({ index: i + 1, values: [] as bigint[] }))
  for (const s of secretVals) {
    // coefficients: [s, a1, a2, ..., a(k-1)] where a1..a(k-1) are random
    const coeffs: bigint[] = [s]
    for (let j = 1; j < k; j++) {
      coeffs.push(BigInt(Math.floor(Math.random() * 257)))
    }
    // evaluate polynomial at each share index x=1..n: f(x) = s + a1*x + a2*x^2 + ...
    for (let i = 0; i < n; i++) {
      const x = BigInt(i + 1)
      let y = 0n
      for (let j = 0; j < coeffs.length; j++) {
        y = fieldAdd(y, fieldMul(coeffs[j], fieldPow(x, BigInt(j))))
      }
      result[i].values.push(y)
    }
  }
  return result
}

function split() {
  shares.value = textToShares(secret.value, totalShares.value, threshold.value)
}

// ---- Combine mode ----
const combineInput = ref('')
const reconstructed = ref<string | null>(null)
const combineError = ref('')

function parseShares(text: string): Share[] {
  // format: one share per line, each line is "index: v1,v2,v3,..." or "index v1 v2 ..."
  const lines = text.trim().split('\n').filter(Boolean)
  return lines.map(line => {
    const [idxStr, valStr] = line.split(/[:\s]/, 2)
    const index = parseInt(idxStr)
    const rest = line.substring(idxStr.length).replace(/^[:\s]+/, '')
    const values = rest.split(/[,\s]+/).filter(Boolean).map(v => BigInt(parseInt(v, 10)))
    return { index, values }
  }).filter(s => s.index > 0 && s.values.length > 0)
}

function lagrangeInterpolate(sharesList: Share[], x: bigint): bigint[] {
  const k = sharesList.length
  const numVals = sharesList[0].values.length
  const result: bigint[] = []
  for (let v = 0; v < numVals; v++) {
    let secret = 0n
    for (let i = 0; i < k; i++) {
      let num = 1n
      let den = 1n
      for (let j = 0; j < k; j++) {
        if (i === j) continue
        const xi = BigInt(sharesList[i].index)
        const xj = BigInt(sharesList[j].index)
        num = fieldMul(num, fieldSub(x, xj))
        den = fieldMul(den, fieldSub(xi, xj))
      }
      const li = fieldDiv(num, den)
      secret = fieldAdd(secret, fieldMul(sharesList[i].values[v], li))
    }
    result.push(secret)
  }
  return result
}

function combine() {
  combineError.value = ''
  reconstructed.value = null
  try {
    const parsed = parseShares(combineInput.value)
    if (parsed.length < 2) {
      combineError.value = 'Need at least 2 shares. Paste shares in format: "1: 45,182,7" (one per line).'
      return
    }
    const vals = lagrangeInterpolate(parsed, 0n)
    reconstructed.value = fieldToSecret(vals)
  } catch (e: any) {
    combineError.value = e?.message || 'Failed to reconstruct'
  }
}

// ---- Visualization ----
const showViz = computed(() => shares.value.length > 0 && threshold.value <= 4)

const polyPoints = computed(() => {
  if (!showViz.value) return []
  // For the first character of the secret, compute f(x) for x = 0..totalShares
  const sVals = secretToField(secret.value)
  if (!sVals.length) return []
  const firstSecret = shares.value[0]?.values[0]
  if (firstSecret === undefined) return []
  const pts: Array<{ x: number; y: number }> = []
  for (let x = 0; x <= totalShares.value; x++) {
    if (x === 0) {
      // f(0) is the secret — recompute from shares if threshold allows
      if (shares.value.length >= threshold.value) {
        const rec = lagrangeInterpolate(shares.value.slice(0, threshold.value), 0n)
        pts.push({ x, y: Number(rec[0]) })
      }
    } else {
      const share = shares.value.find(s => s.index === x)
      if (share) pts.push({ x, y: Number(share.values[0]) })
    }
  }
  return pts
})

function formatShare(share: Share): string {
  return `${share.index}: ${share.values.map(String).join(',')}`
}

const allSharesText = computed(() => shares.value.map(formatShare).join('\n'))

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Split class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Shamir Secret Sharing</h1>
        <p class="text-sm text-muted-foreground">Split a secret into N shares — any {{ threshold }} of {{ totalShares }} reconstructs it</p>
      </div>
    </div>

    <Card class="border-primary/20">
      <CardContent class="pt-6 space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <EyeOff class="w-4 h-4" />
          <span>Your secret is split locally using GF(257) arithmetic. Nothing is transmitted.</span>
        </div>
      </CardContent>
    </Card>

    <Tabs default-value="split" class="space-y-4">
      <TabsList>
        <TabsTrigger value="split" class="flex items-center gap-2"><Split class="w-4 h-4" /> Split</TabsTrigger>
        <TabsTrigger value="combine" class="flex items-center gap-2"><Combine class="w-4 h-4" /> Combine</TabsTrigger>
      </TabsList>

      <TabsContent value="split" class="space-y-4">
        <Card>
          <CardContent class="pt-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="grid gap-2 md:col-span-1">
                <Label>Secret</Label>
                <Input v-model="secret" class="font-mono text-xs" placeholder="Your secret..." aria-label="Secret to split" />
              </div>
              <div class="grid gap-2">
                <Label>Total shares (N)</Label>
                <Input v-model.number="totalShares" type="number" min="2" max="20" aria-label="Total shares" />
              </div>
              <div class="grid gap-2">
                <Label>Threshold (K)</Label>
                <Input v-model.number="threshold" type="number" min="2" :max="totalShares" aria-label="Threshold" />
              </div>
            </div>
            <Button @click="split" :disabled="!secret || threshold < 2 || threshold > totalShares" class="w-full">
              Split Secret
            </Button>
          </CardContent>
        </Card>

        <Card v-if="shares.length">
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-lg">{{ shares.length }} shares generated · any {{ threshold }} reconstructs</CardTitle>
            <CopyButton :text="allSharesText" aria-label="Copy all shares" />
          </CardHeader>
          <CardContent class="space-y-2">
            <div
              v-for="share in shares"
              :key="share.index"
              class="flex items-center gap-3 p-3 border border-border rounded-lg"
            >
              <span class="font-mono text-sm font-bold text-primary w-6">{{ share.index }}</span>
              <code class="font-mono text-xs break-all flex-1">{{ share.values.map(String).join(', ') }}</code>
              <CopyButton :text="formatShare(share)" variant="ghost" :aria-label="'Copy share ' + share.index" />
            </div>
          </CardContent>
        </Card>

        <Card v-if="showViz && polyPoints.length">
          <CardHeader><CardTitle class="text-lg">Polynomial visualization (first character)</CardTitle></CardHeader>
          <CardContent>
            <p class="text-xs text-muted-foreground mb-3">
              Each share is a point (x, f(x)) on a random degree-{{ threshold - 1 }} polynomial. The secret is f(0) —
              you need exactly {{ threshold }} points to determine the polynomial and recover it.
            </p>
            <svg viewBox="0 0 400 180" class="w-full border border-border rounded-lg bg-muted/20">
              <!-- axes -->
              <line x1="30" y1="150" x2="380" y2="150" stroke="#999" stroke-width="1" />
              <line x1="30" y1="10" x2="30" y2="150" stroke="#999" stroke-width="1" />
              <!-- y-axis label -->
              <text x="15" y="80" font-size="10" fill="#666" text-anchor="middle" transform="rotate(-90,15,80)">f(x)</text>
              <!-- secret point at x=0 -->
              <circle v-for="(pt, si) in polyPoints.filter(p => p.x === 0)" :key="'sec' + si" :cx="30" :cy="150 - (pt.y / 257) * 130" r="6" fill="#e11d48" />
              <text v-if="polyPoints.find(p => p.x === 0)" x="20" :cy="150 - (polyPoints[0].y / 257) * 130 - 8" font-size="9" fill="#e11d48">secret</text>
              <!-- share points -->
              <g v-for="pt in polyPoints.filter(p => p.x > 0)" :key="pt.x">
                <circle :cx="30 + pt.x * 45" :cy="150 - (pt.y / 257) * 130" r="5" fill="#171717" />
                <text :x="30 + pt.x * 45" :y="165" font-size="10" fill="#666" text-anchor="middle">{{ pt.x }}</text>
              </g>
            </svg>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="combine" class="space-y-4">
        <Card>
          <CardHeader><CardTitle class="text-lg">Reconstruct secret from shares</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <p class="text-xs text-muted-foreground">
              Paste at least {{ threshold }} shares (one per line) in format:
              <code class="font-mono">index: value1,value2,value3</code>
            </p>
            <textarea
              v-model="combineInput"
              :rows="6"
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
              placeholder="1: 45,182,70&#10;3: 91,12,200&#10;5: 150,44,33"
              aria-label="Shares to combine"
            />
            <Button @click="combine" :disabled="!combineInput.trim()">Reconstruct Secret</Button>
            <p v-if="combineError" class="text-sm text-red-500">{{ combineError }}</p>
          </CardContent>
        </Card>

        <Card v-if="reconstructed !== null" class="border-green-500/40">
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-lg">Reconstructed secret</CardTitle>
            <CopyButton :text="reconstructed" aria-label="Copy reconstructed secret" />
          </CardHeader>
          <CardContent>
            <p class="font-mono text-lg font-bold break-all p-4 border border-border rounded-lg bg-muted/40">{{ reconstructed }}</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
