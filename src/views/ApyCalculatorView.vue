<script setup lang="ts">
import { ref, computed } from 'vue'
import { Percent } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'APY Calculator - Convert APR to APY | Formatho',
  description: 'Convert APR to APY with any compounding frequency (daily, weekly, monthly, continuous). Compare DeFi yields accurately. Free, private, client-side.',
  keywords: ['apy calculator', 'apr to apy', 'apy to apr', 'defi yield calculator', 'compounding calculator', 'apy converter'],
  ogType: 'website'
})

const apr = ref(20)
const frequency = ref('365')
const principal = ref(10000)
const days = ref(365)

const frequencies = [
  { label: 'Annually', n: 1 },
  { label: 'Monthly', n: 12 },
  { label: 'Weekly', n: 52 },
  { label: 'Daily', n: 365 },
  { label: 'Continuously', n: Infinity },
]

const n = computed(() => frequency.value === 'continuous' ? Infinity : Number(frequency.value))

const apy = computed(() => {
  const r = apr.value / 100
  if (n.value === Infinity) return Math.exp(r) - 1
  return Math.pow(1 + r / n.value, n.value) - 1
})

const apyPct = computed(() => (apy.value * 100).toFixed(2))

const finalAmount = computed(() => {
  const dailyRate = apr.value / 100 / 365
  return principal.value * Math.pow(1 + dailyRate, days.value * (n.value === Infinity ? 1 : 1))
})

const earned = computed(() => finalAmount.value - principal.value)

// Reverse: APY to APR
const inputApy = ref(22)
const reverseApr = computed(() => {
  const apyValue = inputApy.value / 100
  if (n.value === Infinity) return (Math.log(apyValue + 1)) * 100
  return (n.value * (Math.pow(apyValue + 1, 1 / n.value) - 1)) * 100
})

const comparisonTable = computed(() =>
  frequencies.map(f => {
    const fn = f.n
    const r = apr.value / 100
    const result = fn === Infinity ? Math.exp(r) - 1 : Math.pow(1 + r / fn, fn) - 1
    return { label: f.label, apy: (result * 100).toFixed(2) }
  })
)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Percent class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">APY Calculator</h1>
        <p class="text-sm text-muted-foreground">Convert APR to APY with any compounding frequency — for DeFi yields</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- APR to APY -->
      <Card>
        <CardHeader><CardTitle class="text-lg">APR → APY</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">APR (%)</label>
            <Input v-model="apr" type="number" class="font-mono" placeholder="20" aria-label="APR percentage" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-2 block">Compounding frequency</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="f in frequencies" :key="f.label"
                class="no-btn-hover text-xs px-3 py-1.5 border rounded-full transition-colors"
                :class="String(f.n) === frequency || (f.n === Infinity && frequency === 'continuous') ? 'bg-primary/10 border-primary/40' : 'border-border hover:border-foreground/30'"
                @click="frequency = f.n === Infinity ? 'continuous' : String(f.n)">
                {{ f.label }}
              </button>
            </div>
          </div>
          <div class="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p class="text-xs text-muted-foreground mb-1">Effective APY</p>
            <p class="text-3xl font-black font-mono text-primary">{{ apyPct }}%</p>
          </div>
        </CardContent>
      </Card>

      <!-- Investment projection -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Investment projection</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm font-medium text-muted-foreground mb-1 block">Principal ($)</label>
              <Input v-model="principal" type="number" class="font-mono" placeholder="10000" aria-label="Principal" />
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground mb-1 block">Days</label>
              <Input v-model="days" type="number" class="font-mono" placeholder="365" aria-label="Days" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground">Final amount</p>
              <p class="text-lg font-bold font-mono">${{ finalAmount.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}</p>
            </div>
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground">Interest earned</p>
              <p class="text-lg font-bold font-mono text-green-600">${{ earned.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Comparison table -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">APY by compounding frequency (at {{ apr }}% APR)</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div v-for="row in comparisonTable" :key="row.label" class="p-3 border border-border rounded-lg text-center">
            <p class="text-xs text-muted-foreground">{{ row.label }}</p>
            <p class="text-sm font-bold font-mono mt-1">{{ row.apy }}%</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Reverse calculator -->
    <Card>
      <CardHeader><CardTitle class="text-lg">APY → APR (reverse)</CardTitle></CardHeader>
      <CardContent>
        <div class="flex flex-col sm:flex-row items-end gap-4">
          <div class="flex-1">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">APY (%)</label>
            <Input v-model="inputApy" type="number" class="font-mono" placeholder="22" aria-label="APY percentage" />
          </div>
          <div class="flex-1 p-3 border border-border rounded-lg bg-muted/50">
            <p class="text-xs text-muted-foreground">Required APR (at current frequency)</p>
            <p class="text-lg font-bold font-mono">{{ reverseApr.toFixed(2) }}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
