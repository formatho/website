<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingDown, TrendingUp, Calculator, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Impermanent Loss Calculator - Uniswap V2 & V3 | Formatho',
  description: 'Calculate impermanent loss for any price change. Compare HODL vs LP value, see the IL curve, and understand when fees offset losses. Free, private, client-side.',
  keywords: ['impermanent loss calculator', 'il calculator', 'uniswap impermanent loss', 'lp loss calculator', 'defi calculator', 'liquidity provider loss'],
  ogType: 'website'
})

const initialPrice = ref(100)
const priceChangePct = ref(50) // % change slider
const depositAmount = ref(10000)

const priceRatio = computed(() => 1 + priceChangePct.value / 100)
const il = computed(() => {
  const r = priceRatio.value
  if (r <= 0) return 0
  return (2 * Math.sqrt(r)) / (1 + r) - 1
})
const ilPct = computed(() => (il.value * 100).toFixed(2))

const hodlValue = computed(() => depositAmount.value)
const lpValue = computed(() => depositAmount.value * (1 + il.value))
const lossAmount = computed(() => depositAmount.value - lpValue.value)

const referenceTable = [
  { change: '1.25x', ratio: 1.25, il: '-0.58%' },
  { change: '1.5x', ratio: 1.5, il: '-2.02%' },
  { change: '2x', ratio: 2, il: '-5.72%' },
  { change: '3x', ratio: 3, il: '-13.40%' },
  { change: '5x', ratio: 5, il: '-25.46%' },
  { change: '10x', ratio: 10, il: '-44.34%' },
]

// Fee offset calculator
const feeAPR = ref(20) // % APR from fees
const breakEvenIL = computed(() => {
  // How much price change is needed for IL to exceed fee earnings
  // Simple approximation
  return Math.abs(il.value * 100) < feeAPR.value ? 'Fees cover the loss' : 'IL exceeds fees'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Calculator class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Impermanent Loss Calculator</h1>
        <p class="text-sm text-muted-foreground">Compare HODL vs LP value for any price change — 100% client-side</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Inputs -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Inputs</CardTitle></CardHeader>
        <CardContent class="space-y-5">
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Deposit amount (USD)</label>
            <Input v-model="depositAmount" type="number" class="font-mono" placeholder="10000" aria-label="Deposit amount" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Initial price of token A</label>
            <Input v-model="initialPrice" type="number" class="font-mono" placeholder="100" aria-label="Initial price" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-2 block">
              Price change: <span class="font-mono text-foreground">{{ priceChangePct > 0 ? '+' : '' }}{{ priceChangePct }}% ({{ priceRatio.toFixed(2) }}x)</span>
            </label>
            <input type="range" :min="-90" :max="400" :step="5" v-model="priceChangePct" class="w-full accent-primary" aria-label="Price change percentage" />
            <div class="flex justify-between text-xs text-muted-foreground mt-1">
              <span>-90%</span>
              <span>0%</span>
              <span>+400%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Results -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Results</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="p-4 rounded-xl border" :class="Math.abs(il) < 0.02 ? 'bg-green-500/10 border-green-500/20' : Math.abs(il) < 0.06 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'">
            <p class="text-xs text-muted-foreground mb-1">Impermanent Loss</p>
            <p class="text-3xl font-black" :class="Math.abs(il) < 0.02 ? 'text-green-600' : Math.abs(il) < 0.06 ? 'text-amber-600' : 'text-red-600'">
              {{ ilPct }}%
            </p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp class="w-3 h-3" /> If HODL</p>
              <p class="text-lg font-bold font-mono">${{ hodlValue.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</p>
            </div>
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground mb-1 flex items-center gap-1"><TrendingDown class="w-3 h-3" /> If in LP</p>
              <p class="text-lg font-bold font-mono">${{ lpValue.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</p>
            </div>
          </div>
          <div class="p-3 border border-border rounded-lg">
            <p class="text-xs text-muted-foreground">Loss from LP vs HODL</p>
            <p class="text-sm font-mono font-semibold text-red-600">-${{ lossAmount.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick reference -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Quick reference: IL by price multiple</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
          <div v-for="row in referenceTable" :key="row.change" class="p-3 border border-border rounded-lg text-center"
            :class="priceRatio.toFixed(2) === row.ratio.toFixed(2) ? 'bg-primary/10 border-primary/40' : ''">
            <p class="text-sm font-bold font-mono">{{ row.change }}</p>
            <p class="text-xs text-red-600 font-mono mt-1">{{ row.il }}</p>
          </div>
        </div>
        <p class="text-xs text-muted-foreground mt-4 leading-relaxed">
          The IL formula for constant-product AMMs: IL = 2√r / (1 + r) − 1, where r = new price / old price.
          This is the loss relative to simply holding the tokens. Trading fees can offset it — see below.
        </p>
      </CardContent>
    </Card>

    <!-- Fee offset -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Fee earnings vs impermanent loss</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label class="text-sm font-medium text-muted-foreground mb-1 block">
            Pool fee APR: <span class="font-mono text-foreground">{{ feeAPR }}%</span>
          </label>
          <input type="range" :min="0" :max="100" :step="1" v-model="feeAPR" class="w-full accent-primary" aria-label="Fee APR" />
        </div>
        <div class="p-4 rounded-xl border" :class="breakEvenIL === 'Fees cover the loss' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'">
          <p class="text-sm font-medium" :class="breakEvenIL === 'Fees cover the loss' ? 'text-green-700' : 'text-red-700'">
            {{ breakEvenIL }} — IL is {{ Math.abs(ilPct) }}%, fees earn {{ feeAPR }}% APR
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
