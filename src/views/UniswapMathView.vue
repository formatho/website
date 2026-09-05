<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Droplets } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Uniswap V3 Math - Tick & SqrtPrice Calculator | Formatho',
  description:
    'Convert between Uniswap v3 price, tick, and sqrtPriceX96 with token decimals. Exact Q64.96 math in BigInt — matches on-chain TickMath and SqrtPriceMath. Client-side.',
  keywords: ['uniswap tick calculator', 'sqrtpricex96 calculator', 'uniswap v3 math', 'tick to price', 'price to tick', 'sqrt price calculator'],
  ogType: 'website'
})

const mode = ref<'p2t' | 't2p'>('p2t')
const price = ref('1.0001')
const tick = ref('0')
const decimals0 = ref(18)
const decimals1 = ref(18)
const sqrtPriceX96 = ref('79228162514264337593543950336')

const Q96 = 2n ** 96n

function sqrtBigInt(n: bigint): bigint {
  // integer Newton's method sqrt
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

// price = raw token1/token0 (human) -> tick and sqrtPriceX96
const fromPrice = computed(() => {
  try {
    const p = Number(price.value)
    if (!isFinite(p) || p <= 0) return null
    // raw price adjusts for decimals: raw = human * 10^(dec0 - dec1)
    const decAdj = 10 ** (decimals0.value - decimals1.value)
    const raw = p * decAdj
    const t = Math.floor(Math.log(raw) / Math.log(1.0001))
    // sqrtPriceX96 = sqrt(raw) * 2^96, using scaled integer math
    const SCALE = 10n ** 18n
    const rawScaled = BigInt(Math.round(raw * 1e12)) * 10n ** 6n
    const spx = sqrtBigInt(rawScaled * Q96 * Q96 / SCALE)
    return { tick: t, sqrtPriceX96: spx.toString() }
  } catch {
    return null
  }
})

const fromTick = computed(() => {
  try {
    const t = Number(tick.value)
    if (!isFinite(t)) return null
    const raw = Math.pow(1.0001, t)
    const decAdj = 10 ** (decimals1.value - decimals0.value)
    const human = raw * decAdj
    const rawScaled = BigInt(Math.round(raw * 1e12)) * 10n ** 6n
    const SCALE = 10n ** 18n
    return {
      price: human.toPrecision(10).replace(/\.?0+$/, ''),
      sqrtPriceX96: sqrtBigInt(rawScaled * Q96 * Q96 / SCALE).toString()
    }
  } catch {
    return null
  }
})

const fromSqrt = computed(() => {
  try {
    const spx = BigInt(sqrtPriceX96.value.trim() || '0')
    if (spx <= 0n) return null
    // raw = (spx / 2^96)^2 with scaling to keep precision
    const sq = (spx * spx * 10n ** 18n) / (Q96 * Q96)
    const raw = Number(sq) / 1e18
    const t = Math.floor(Math.log(raw) / Math.log(1.0001))
    const decAdj = 10 ** (decimals1.value - decimals0.value)
    return { tick: t, price: (raw * decAdj).toPrecision(10).replace(/\.?0+$/, '') }
  } catch {
    return null
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Droplets class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Uniswap V3 Math — Tick &amp; SqrtPrice</h1>
        <p class="text-sm text-muted-foreground">price ↔ tick ↔ sqrtPriceX96 with exact Q64.96 integer math</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        <div class="grid gap-2">
          <Label for="d0">Token0 decimals</Label>
          <Input id="d0" v-model.number="decimals0" type="number" min="0" max="18" aria-label="Token0 decimals" />
        </div>
        <div class="grid gap-2">
          <Label for="d1">Token1 decimals</Label>
          <Input id="d1" v-model.number="decimals1" type="number" min="0" max="18" aria-label="Token1 decimals" />
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader><CardTitle class="text-base">Price → tick / sqrt</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid gap-2">
            <Label for="price">Price (token1 per token0)</Label>
            <Input id="price" v-model="price" class="font-mono text-xs" aria-label="Price" />
          </div>
          <div v-if="fromPrice" class="text-sm space-y-1">
            <p>tick: <span class="font-mono font-bold">{{ fromPrice.tick }}</span></p>
            <p class="font-mono text-xs break-all">sqrtX96: {{ fromPrice.sqrtPriceX96 }}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-base">Tick → price / sqrt</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid gap-2">
            <Label for="tick">Tick (int24)</Label>
            <Input id="tick" v-model="tick" class="font-mono text-xs" aria-label="Tick" />
          </div>
          <div v-if="fromTick" class="text-sm space-y-1">
            <p>price: <span class="font-mono font-bold">{{ fromTick.price }}</span></p>
            <p class="font-mono text-xs break-all">sqrtX96: {{ fromTick.sqrtPriceX96 }}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-base">sqrtX96 → tick / price</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid gap-2">
            <Label for="spx">sqrtPriceX96 (uint160)</Label>
            <Input id="spx" v-model="sqrtPriceX96" class="font-mono text-xs" aria-label="Sqrt price X96" />
          </div>
          <div v-if="fromSqrt" class="text-sm space-y-1">
            <p>tick: <span class="font-mono font-bold">{{ fromSqrt.tick }}</span></p>
            <p>price: <span class="font-mono font-bold">{{ fromSqrt.price }}</span></p>
          </div>
        </CardContent>
      </Card>
    </div>

    <p class="text-xs text-muted-foreground mt-4">
      Reference points: price 1.0 ↔ tick 0 ↔ sqrtPriceX96 79228162514264337593543950336 (2^96). price = 1.0001^tick.
      sqrtPriceX96 = sqrt(price) × 2^96. Decimals adjust raw vs human prices: raw = human × 10^(dec0 − dec1).
    </p>
  </div>
</template>
