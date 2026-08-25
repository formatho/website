<script setup lang="ts">
import { ref, computed } from 'vue'
import { Landmark, ArrowRightLeft } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ERC-4626 Vault Calculator - Shares to Assets | Formatho',
  description: 'Convert between ERC-4626 vault shares and underlying assets. Calculate share price, APY, and returns for Yearn, Morpho, Beefy, and any ERC-4626 compliant vault. Free, private, client-side.',
  keywords: ['erc4626 calculator', 'vault shares to assets', 'vault calculator', 'morpho vault calculator', 'yearn vault calculator', 'defi vault shares', 'share price calculator'],
  ogType: 'website'
})

// Vault state
const totalAssets = ref(1000000)
const totalShares = ref(1000000)
const userShares = ref(1000)
const timeDays = ref(365)
const assetsGrowthPct = ref(10) // annual growth %

const sharePrice = computed(() => (totalShares.value > 0 ? totalAssets.value / totalShares.value : 0))
const userAssets = computed(() => userShares.value * sharePrice.value)

// Projected returns
const dailyGrowth = computed(() => assetsGrowthPct.value / 100 / 365)
const projectedAssets = computed(() => totalAssets.value * Math.pow(1 + dailyGrowth.value, timeDays.value))
const projectedSharePrice = computed(() => (totalShares.value > 0 ? projectedAssets.value / totalShares.value : 0))
const projectedUserValue = computed(() => userShares.value * projectedSharePrice.value)
const profit = computed(() => projectedUserValue.value - userAssets.value)

// Reverse calculator: deposit → shares
const depositAmount = ref(1000)
const sharesReceived = computed(() => (sharePrice.value > 0 ? depositAmount.value / sharePrice.value : 0))

function fmt(n: number, decimals = 4): string {
  if (!isFinite(n)) return '—'
  if (n >= 1_000_000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: decimals })
  return n.toFixed(decimals + 4)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><Landmark class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">ERC-4626 Vault Calculator</h1>
        <p class="text-sm text-muted-foreground">Convert shares ↔ assets, calculate APY and returns — works with any ERC-4626 vault</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Vault state -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Vault state</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Total assets in vault</label>
            <Input v-model="totalAssets" type="number" class="font-mono" placeholder="1000000" aria-label="Total assets" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Total shares outstanding</label>
            <Input v-model="totalShares" type="number" class="font-mono" placeholder="1000000" aria-label="Total shares" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Your shares</label>
            <Input v-model="userShares" type="number" class="font-mono" placeholder="1000" aria-label="Your shares" />
          </div>
        </CardContent>
      </Card>

      <!-- Current position -->
      <Card>
        <CardHeader><CardTitle class="text-lg">Your position</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p class="text-xs text-muted-foreground mb-1">Share price (assets per share)</p>
            <p class="text-2xl font-bold font-mono">{{ fmt(sharePrice, 6) }}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground">Your shares</p>
              <p class="text-lg font-bold font-mono">{{ fmt(userShares, 2) }}</p>
            </div>
            <div class="p-3 border border-border rounded-lg">
              <p class="text-xs text-muted-foreground">Asset value</p>
              <p class="text-lg font-bold font-mono">{{ fmt(userAssets, 2) }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Projection -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Return projection</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Annual vault yield (%)</label>
            <Input v-model="assetsGrowthPct" type="number" class="font-mono" placeholder="10" aria-label="Annual yield" />
          </div>
          <div>
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Time horizon (days)</label>
            <Input v-model="timeDays" type="number" class="font-mono" placeholder="365" aria-label="Days" />
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-3 border border-border rounded-lg">
            <p class="text-xs text-muted-foreground">Current value</p>
            <p class="text-sm font-bold font-mono">{{ fmt(userAssets, 2) }}</p>
          </div>
          <div class="p-3 border border-border rounded-lg">
            <p class="text-xs text-muted-foreground">Projected value</p>
            <p class="text-sm font-bold font-mono text-green-600">{{ fmt(projectedUserValue, 2) }}</p>
          </div>
          <div class="p-3 border border-border rounded-lg">
            <p class="text-xs text-muted-foreground">Profit</p>
            <p class="text-sm font-bold font-mono text-green-600">+{{ fmt(profit, 2) }}</p>
          </div>
          <div class="p-3 border border-border rounded-lg">
            <p class="text-xs text-muted-foreground">Future share price</p>
            <p class="text-sm font-bold font-mono">{{ fmt(projectedSharePrice, 6) }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Deposit calculator -->
    <Card>
      <CardHeader><CardTitle class="text-lg flex items-center gap-2"><ArrowRightLeft class="w-4 h-4" /> Deposit → shares conversion</CardTitle></CardHeader>
      <CardContent>
        <div class="flex flex-col sm:flex-row items-end gap-4">
          <div class="flex-1">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">Deposit amount (assets)</label>
            <Input v-model="depositAmount" type="number" class="font-mono" placeholder="1000" aria-label="Deposit amount" />
          </div>
          <div class="flex-1 p-3 border border-border rounded-lg bg-muted/50">
            <p class="text-xs text-muted-foreground">Shares you receive</p>
            <p class="text-lg font-bold font-mono">{{ fmt(sharesReceived, 6) }}</p>
          </div>
        </div>
        <p class="text-xs text-muted-foreground mt-4 leading-relaxed">
          ERC-4626 formula: shares = assets × totalShares / totalAssets. This works for any compliant vault including Morpho, Yearn V3, Beefy, Balancer, and Rari.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
