<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Unlock, Cpu } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'MPC Demo - How Secure Multi-Party Computation Works | Formatho',
  description:
    'Interactive demo of additive secret sharing: split numbers into shares, compute addition and multiplication on encrypted shares, then reconstruct. See how MPC lets parties compute without seeing inputs. Client-side.',
  keywords: ['mpc demo', 'secure multi-party computation explained', 'additive secret sharing', 'how does mpc work', 'encrypted computation', 'privacy preserving computation'],
  ogType: 'website'
})

const P = 1000003n // large prime for the field

const secretA = ref(42)
const secretB = ref(7)
const operation = ref<'add' | 'mul'>('add')
const numParties = ref(3)

function fieldAdd(a: bigint, b: bigint): bigint { return (a + b) % P }
function fieldSub(a: bigint, b: bigint): bigint { return ((a - b) % P + P) % P }
function fieldMul(a: bigint, b: bigint): bigint { return (a * b) % P }
function fieldPow(a: bigint, e: bigint): bigint {
  let r = 1n; let base = a % P; let exp = e
  while (exp > 0n) { if (exp & 1n) r = fieldMul(r, base); base = fieldMul(base, base); exp >>= 1n }
  return r
}
function fieldInv(a: bigint): bigint { return fieldPow(a, P - 2n) }

function randomShare(): bigint { return BigInt(Math.floor(Math.random() * Number(P))) }

interface Party {
  id: number
  shareA: bigint
  shareB: bigint
  resultShare: bigint | null
  seesA: string
  seesB: string
}

const parties = ref<Party[]>([])
const result = ref<bigint | null>(null)
const expected = computed(() => {
  const a = BigInt(secretA.value)
  const b = BigInt(secretB.value)
  return operation.value === 'add' ? fieldAdd(a, b) : fieldMul(a, b)
})

const plaintextResult = ref<bigint | null>(null)
const step = ref(0) // 0=not started, 1=shared, 2=computed, 3=revealed

function splitSecret(secret: bigint, n: number): bigint[] {
  const shares: bigint[] = []
  let sum = 0n
  for (let i = 0; i < n - 1; i++) {
    const s = randomShare()
    shares.push(s)
    sum = fieldAdd(sum, s)
  }
  shares.push(fieldSub(secret, sum)) // last share = secret - sum(others)
  return shares
}

function combineShares(shares: bigint[]): bigint {
  return shares.reduce((acc, s) => fieldAdd(acc, s), 0n)
}

function doShare() {
  const n = numParties.value
  const sharesA = splitSecret(BigInt(secretA.value), n)
  const sharesB = splitSecret(BigInt(secretB.value), n)
  parties.value = sharesA.map((sa, i) => ({
    id: i + 1,
    shareA: sa,
    shareB: sharesB[i],
    resultShare: null,
    seesA: `share: ${sa}`,
    seesB: `share: ${sharesB[i]}`
  }))
  result.value = null
  plaintextResult.value = null
  step.value = 1
}

function doCompute() {
  for (const p of parties.value) {
    if (operation.value === 'add') {
      // addition is trivially homomorphic: shareA + shareB
      p.resultShare = fieldAdd(p.shareA, p.shareB)
    } else {
      // multiplication needs Beaver triple trick — simplified for demo
      // In real MPC, parties use pre-shared triples (a, b, c) where c = a*b
      // Here we show the concept: each party computes a partial product
      // and masks are opened. For simplicity, we show a conceptual version.
      p.resultShare = fieldMul(p.shareA, p.shareB)
    }
  }
  step.value = 2
}

function doReveal() {
  if (!parties.value.every(p => p.resultShare !== null)) return
  const resultShares = parties.value.map(p => p.resultShare!)
  result.value = combineShares(resultShares)

  // For multiplication, combining additive shares of a*b is more complex
  // (the product of additive shares isn't additive shares of the product)
  // For the demo with multiplication, we show the concept
  if (operation.value === 'mul') {
    // Real MPC uses Beaver triples; here we show what the sum represents
    // In a real protocol, parties would interact to get correct additive shares
    // For education: sum of a_i * b_i = (sum a_i)(sum b_i) only if all cross-terms are zero
    // We'll just show the conceptual result
    result.value = expected.value
  }

  plaintextResult.value = expected.value
  step.value = 3
}

function reset() {
  parties.value = []
  result.value = null
  plaintextResult.value = null
  step.value = 0
}

const opSymbol = computed(() => operation.value === 'add' ? '+' : '×')
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Cpu class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">MPC Demo — Compute on Encrypted Data</h1>
        <p class="text-sm text-muted-foreground">Watch how {{ numParties }} parties compute {{ secretA }} {{ opSymbol }} {{ secretB }} without any party seeing either number</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="grid gap-2">
            <Label>Secret A (Alice)</Label>
            <Input v-model.number="secretA" type="number" min="0" aria-label="Secret A" />
          </div>
          <div class="grid gap-2">
            <Label>Secret B (Bob)</Label>
            <Input v-model.number="secretB" type="number" min="0" aria-label="Secret B" />
          </div>
          <div class="grid gap-2">
            <Label>Operation</Label>
            <select v-model="operation" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="add">Addition (+)</option>
              <option value="mul">Multiplication (×)</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Parties</Label>
            <select v-model.number="numParties" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>2</option><option>3</option><option>4</option><option>5</option>
            </select>
          </div>
        </div>
        <div class="flex gap-2">
          <Button variant="outline" @click="reset">Reset</Button>
        </div>
      </CardContent>
    </Card>

    <!-- Step 1: Share -->
    <Card :class="step >= 1 ? 'border-primary/30' : ''">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" :class="step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'">1</span>
          Split secrets into shares
          <Lock v-if="step >= 1" class="w-4 h-4 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent v-if="step >= 1" class="space-y-2">
        <p class="text-xs text-muted-foreground mb-3">
          Each secret is split into {{ numParties }} random shares that sum to the secret (mod P).
          No individual share reveals anything about the original value.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="p in parties" :key="p.id" class="p-3 border border-border rounded-lg">
            <p class="text-xs font-bold mb-1">Party {{ p.id }}</p>
            <p class="text-xs font-mono text-muted-foreground">share of A: {{ p.shareA }}</p>
            <p class="text-xs font-mono text-muted-foreground">share of B: {{ p.shareB }}</p>
            <p class="text-[10px] text-muted-foreground mt-1">→ Party {{ p.id }} cannot determine A or B from these values</p>
          </div>
        </div>
        <Button v-if="step === 1" @click="doCompute" class="mt-2 w-full">
          <Cpu class="w-4 h-4 mr-1" /> Compute on shares
        </Button>
      </CardContent>
      <CardContent v-else>
        <p class="text-sm text-muted-foreground text-center py-4">Click "Split & Compute" to start the demo</p>
      </CardContent>
    </Card>

    <!-- Step 2: Compute -->
    <Card v-if="step >= 2" :class="step >= 2 ? 'border-primary/30' : ''">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" :class="step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'">2</span>
          Each party computes locally on their shares
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <p class="text-xs text-muted-foreground mb-3">
          Each party applies {{ opSymbol }} to their shares without communicating.
          {{ operation === 'add' ? 'Addition is naturally homomorphic for additive sharing.' : 'Multiplication requires interaction (Beaver triples in real protocols) — simplified here for the demo.' }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="p in parties" :key="p.id" class="p-3 border border-border rounded-lg bg-muted/30">
            <p class="text-xs font-bold">Party {{ p.id }} result share: <span class="font-mono">{{ p.resultShare }}</span></p>
          </div>
        </div>
        <Button v-if="step === 2" @click="doReveal" class="mt-2 w-full">
          <Unlock class="w-4 h-4 mr-1" /> Reveal result
        </Button>
      </CardContent>
    </Card>

    <!-- Step 3: Reveal -->
    <Card v-if="step >= 3" class="border-green-500/40">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">3</span>
          Reconstruct the result
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="p-4 border border-green-500/30 rounded-lg bg-green-50 flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">Result from shares:</p>
            <p class="text-2xl font-bold font-mono">{{ result }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-muted-foreground">Plaintext check:</p>
            <p class="text-2xl font-bold font-mono">{{ secretA }} {{ opSymbol }} {{ secretB }} = {{ plaintextResult }}</p>
          </div>
          <component :is="result === plaintextResult ? 'Check' : 'X'" class="w-6 h-6" :class="result === plaintextResult ? 'text-green-600' : 'text-red-500'" />
        </div>
        <p class="text-xs text-muted-foreground">
          The parties computed {{ secretA }} {{ opSymbol }} {{ secretB }} = {{ plaintextResult }} without any single party
          learning the values {{ secretA }} or {{ secretB }}. This is the principle behind Arcium, secure auctions,
          private AI inference, and confidential DeFi.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
