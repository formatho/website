<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Play, Coins, AlertCircle, Loader2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Cardano Address Reader - ADA Balance & UTxO | Formatho',
  description:
    'Look up any Cardano address - ADA balance, UTxO count, delegation and transaction history summary - using the free public Koios API. No API key needed, queries go straight from your browser.',
  keywords: [
    'cardano address reader',
    'check ada balance',
    'cardano address viewer',
    'cardano utxo lookup',
    'ada wallet balance check',
    'cardano address explorer'
  ],
  ogType: 'website'
})

const address = ref('')
const loading = ref(false)
const error = ref('')
const info = ref<null | {
  balanceAda: string
  utxoCount: string
  stakeAddress?: string
  scriptAddress: boolean
}>(null)
const tip = ref('')
const copied = ref<string | null>(null)

const LOVELACE = 1_000_000

interface KoiosAddressInfo {
  address: string
  balance: string
  utxo_count: number
  script_address: boolean
  stake_address?: string | null
  first_tx_height?: number
  last_tx_height?: number
}

async function lookup() {
  error.value = ''
  info.value = null
  const addr = address.value.trim()
  if (!addr.startsWith('addr1') && !addr.startsWith('addr_test1')) {
    error.value = 'Enter a Cardano Shelley address (starts with addr1 or addr_test1)'
    return
  }
  loading.value = true
  try {
    const res = await fetch(
      `https://api.koios.rest/api/v1/address_info?_address=${encodeURIComponent(addr)}`
    )
    if (!res.ok) throw new Error(`Koios returned ${res.status}`)
    const rows = (await res.json()) as KoiosAddressInfo[]
    if (!rows.length) {
      error.value = 'Address not found on Cardano mainnet (or it has no transaction history yet)'
      return
    }
    const row = rows[0]
    info.value = {
      balanceAda: (Number(row.balance) / LOVELACE).toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ADA',
      utxoCount: String(row.utxo_count),
      stakeAddress: row.stake_address ?? undefined,
      scriptAddress: Boolean(row.script_address)
    }
    fetch('https://api.koios.rest/api/v1/tip')
      .then((r) => r.json())
      .then((t: Array<{ block_no: number }>) => {
        if (t[0]?.block_no) tip.value = `Chain tip: block ${t[0].block_no}`
      })
      .catch(() => {})
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Coins class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Cardano Address Reader</h1>
        <p class="text-sm text-muted-foreground">
          ADA balance, UTxO count, and stake info — via the free Koios API, keyless and client-side
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Address lookup (mainnet)</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label for="ada-addr" class="text-sm font-medium text-muted-foreground mb-1 block">Cardano address</label>
          <Input
            id="ada-addr"
            v-model="address"
            class="font-mono text-sm"
            placeholder="addr1qy…"
            aria-label="Cardano address"
            @keyup.enter="lookup"
          />
        </div>
        <div class="flex items-center gap-4">
          <Button size="sm" :disabled="loading" @click="lookup">
            <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
            <Play v-else class="w-4 h-4 mr-1" />
            Look up address
          </Button>
          <span v-if="tip" class="text-xs text-muted-foreground font-mono">{{ tip }}</span>
        </div>
        <p v-if="error" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="info">
      <CardHeader>
        <CardTitle class="text-lg">Address info</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="p-3 border border-border rounded-lg">
          <p class="text-sm text-muted-foreground mb-1">Balance</p>
          <p class="font-mono text-lg font-semibold text-primary">{{ info.balanceAda }}</p>
        </div>
        <div v-for="(v, k) in {
          'UTxO count': info.utxoCount,
          'Script address': info.scriptAddress ? 'yes (Plutus)' : 'no',
          'Stake address': info.stakeAddress || '(none)'
        }" :key="k" class="flex items-start justify-between gap-4 p-3 border border-border rounded-lg">
          <span class="text-sm text-muted-foreground flex-shrink-0">{{ k }}</span>
          <code class="font-mono text-xs break-all text-right">{{ v }}</code>
        </div>
        <div v-if="info.stakeAddress" class="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
          <code class="font-mono text-xs break-all">{{ info.stakeAddress }}</code>
          <Button variant="ghost" size="sm" aria-label="Copy stake address" @click="copy(info.stakeAddress!, 'stake')">
            <Check v-if="copied === 'stake'" class="w-4 h-4" />
            <Copy v-else class="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <div class="mt-6 flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <Coins class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <p class="text-sm text-muted-foreground">
        Queries use the free public Koios API directly from your browser - no key, no signup, nothing logged here.
        Cardano smart contracts (Plutus) run validation on-chain rather than exposing readable view functions,
        so on-chain scripts are inspected via transaction datums and redeemers on explorers.
      </p>
    </div>
  </div>
</template>
