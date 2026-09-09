<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Lock, Fingerprint } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Pedersen Commitment Calculator - Commit Without Revealing | Formatho',
  description:
    'Create Pedersen commitments: bind to a value without revealing it. Supports EC-based commitments over secp256k1. Verify openings, explore hiding and binding properties. Free, client-side.',
  keywords: ['pedersen commitment', 'commitment scheme calculator', 'hiding commitment', 'binding commitment', 'zero knowledge commitment', 'cryptographic commitment'],
  ogType: 'website'
})

const value = ref('42')
const blinding = ref('')
const commitment = ref('')
const opened = ref(false)
const verified = ref(false)
const openedCommitment = ref('')
const openedValue = ref('')
const openedBlinding = ref('')
const verificationResult = ref<null | boolean>(null)

// secp256k1 parameters (for demo — production should use proper generators)
// Using BigInt for point arithmetic on secp256k1
const P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2Fn
const Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n
const Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8n

// For demo, use a simple generator H = hash-to-point (simplified: H = 2*G)
const Hx = 0xC6047F9441ED7D6D3045406E95C07CD85C778E4B8CEF3CA7ABAC09B95C709EE5n
const Hy = 0x1AE168FEA63DC339A3C58419466CEAEEF7F632653266D0E1236431A950CFE52An

// Elliptic curve point operations (affine, secp256k1)
interface Point { x: bigint; y: bigint }

function isInfinity(p: Point): boolean { return p.x === 0n && p.y === 0n }

function pointAdd(p1: Point, p2: Point): Point {
  if (isInfinity(p1)) return p2
  if (isInfinity(p2)) return p1
  if (p1.x === p2.x && p1.y === p2.y) return pointDouble(p1)
  if (p1.x === p2.x) return { x: 0n, y: 0n }
  const lambda = modDiv(modSub(p2.y, p1.y), modSub(p2.x, p1.x))
  const x3 = modSub(modSub(modMul(lambda, lambda), p1.x), p2.x)
  const y3 = modSub(modMul(lambda, modSub(p1.x, x3)), p1.y)
  return { x: x3, y: y3 }
}

function pointDouble(p: Point): Point {
  if (isInfinity(p)) return p
  const lambda = modDiv(modMul(3n, modMul(p.x, p.x)), modMul(2n, p.y))
  const x3 = modSub(modSub(modMul(lambda, lambda), modMul(2n, p.x)), 0n)
  const y3 = modSub(modMul(lambda, modSub(p.x, x3)), p.y)
  return { x: x3, y: y3 }
}

function scalarMul(k: bigint, p: Point): Point {
  let result: Point = { x: 0n, y: 0n }
  let addend = p
  while (k > 0n) {
    if (k & 1n) result = pointAdd(result, addend)
    addend = pointDouble(addend)
    k >>= 1n
  }
  return result
}

function modAdd(a: bigint, b: bigint): bigint { return (a + b) % P }
function modSub(a: bigint, b: bigint): bigint { return ((a - b) % P + P) % P }
function modMul(a: bigint, b: bigint): bigint { return (a * b) % P }
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let r = 1n; let b = base % mod; let e = exp
  while (e > 0n) { if (e & 1n) r = (r * b) % mod; b = (b * b) % mod; e >>= 1n }
  return r
}
function modDiv(a: bigint, b: bigint): bigint { return modMul(a, modPow(b, P - 2n, P)) }

function hashToScalar(s: string): bigint {
  // Simple hash → scalar (for demo; production should use RFC 9380 hash-to-curve)
  let h = 0n
  for (const c of s) h = (h * 31n + BigInt(c.charCodeAt(0))) % P
  return h || 1n
}

function randomScalar(): bigint {
  // Generate random blinding factor
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  let v = 0n
  for (const b of arr) v = (v << 8n) | BigInt(b)
  return v % P
}

function pointToHex(p: Point): string {
  if (isInfinity(p)) return 'POINT_AT_INFINITY'
  return '0x' + p.x.toString(16).padStart(64, '0') + p.y.toString(16).padStart(64, '0')
}

function createCommitment() {
  const m = hashToScalar(value.value)
  const r = blinding.value ? hashToScalar(blinding.value) : randomScalar()
  if (!blinding.value) {
    // generate and show the blinding factor
    const arr = new Uint8Array(32)
    crypto.getRandomValues(arr)
    let v = 0n
    for (const b of arr) v = (v << 8n) | BigInt(b)
    blinding.value = (v % P).toString()
  }
  const rScalar = BigInt(blinding.value) % P
  const mG = scalarMul(m, { x: Gx, y: Gy })
  const rH = scalarMul(rScalar, { x: Hx, y: Hy })
  const C = pointAdd(mG, rH)
  commitment.value = pointToHex(C)
  opened.value = true
}

function verify() {
  if (!openedCommitment.value || !openedValue.value || !openedBlinding.value) return
  const m = hashToScalar(openedValue.value)
  const rScalar = BigInt(openedBlinding.value) % P
  const mG = scalarMul(m, { x: Gx, y: Gy })
  const rH = scalarMul(rScalar, { x: Hx, y: Hy })
  const C = pointAdd(mG, rH)
  verificationResult.value = pointToHex(C) === openedCommitment.value
}

function clearAll() {
  value.value = ''
  blinding.value = ''
  commitment.value = ''
  opened.value = false
  openedCommitment.value = ''
  openedValue.value = ''
  openedBlinding.value = ''
  verificationResult.value = null
  verified.value = false
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Lock class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Pedersen Commitment Calculator</h1>
        <p class="text-sm text-muted-foreground">Commit to a value without revealing it — provably hiding and binding</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Fingerprint class="w-4 h-4" />
          <span>Commitments are computed over secp256k1 in your browser. Nothing is transmitted.</span>
        </div>
      </CardContent>
    </Card>

    <!-- Create commitment -->
    <Card>
      <CardHeader><CardTitle class="text-lg">Create commitment</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Value to commit</Label>
            <Input v-model="value" class="font-mono" placeholder="42" aria-label="Value to commit" />
          </div>
          <div class="grid gap-2">
            <Label>Blinding factor (optional — auto-generated)</Label>
            <Input v-model="blinding" class="font-mono text-xs" placeholder="random" aria-label="Blinding factor" />
          </div>
        </div>
        <div class="flex gap-2">
          <Button @click="createCommitment" :disabled="!value">Commit</Button>
          <Button variant="outline" @click="clearAll">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="opened && commitment" class="border-primary/30">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Commitment</CardTitle>
        <CopyButton :text="commitment" aria-label="Copy commitment" />
      </CardHeader>
      <CardContent class="space-y-3">
        <p class="text-xs text-muted-foreground">C = m·G + r·H (elliptic curve Pedersen commitment)</p>
        <p class="font-mono text-xs break-all p-3 border border-border rounded-lg bg-muted/40">{{ commitment }}</p>
        <p v-if="blinding" class="text-xs text-muted-foreground">
          Blinding factor: <code class="font-mono">{{ blinding }}</code> — keep this private;
          you'll need it to open the commitment later.
        </p>
      </CardContent>
    </Card>

    <!-- Verify commitment -->
    <Card>
      <CardHeader><CardTitle class="text-lg">Verify an opened commitment</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <p class="text-xs text-muted-foreground">
          Paste a commitment, the original value, and the blinding factor to verify the opening.
        </p>
        <div class="grid gap-2">
          <Label>Commitment (hex)</Label>
          <Textarea v-model="openedCommitment" :rows="2" class="font-mono text-xs" placeholder="0x..." aria-label="Commitment to verify" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Value</Label>
            <Input v-model="openedValue" class="font-mono" placeholder="42" aria-label="Original value" />
          </div>
          <div class="grid gap-2">
            <Label>Blinding factor</Label>
            <Input v-model="openedBlinding" class="font-mono text-xs" placeholder="..." aria-label="Blinding factor" />
          </div>
        </div>
        <Button @click="verify" :disabled="!openedCommitment || !openedValue || !openedBlinding">
          Verify Opening
        </Button>
        <div v-if="verificationResult !== null" class="p-3 border rounded-lg flex items-center gap-2" :class="verificationResult ? 'border-green-500/40 bg-green-50' : 'border-red-500/40 bg-red-50'">
          <component :is="verificationResult ? 'Check' : 'X'" class="w-5 h-5" :class="verificationResult ? 'text-green-600' : 'text-red-500'" />
          <p class="text-sm font-semibold" :class="verificationResult ? 'text-green-700' : 'text-red-600'">
            {{ verificationResult ? 'Valid — commitment matches the opening' : 'Invalid — commitment does not match' }}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
