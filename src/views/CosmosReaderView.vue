<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Play, Globe, ArrowRightLeft, AlertCircle, Loader2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as bech32 from 'bech32'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Cosmos Account Reader & Address Converter | Formatho',
  description:
    'Look up any Cosmos SDK account - atom and token balances, account number and sequence, delegations and rewards - via public LCD endpoints. Includes a bech32 address converter for every Cosmos chain prefix. 100% client-side.',
  keywords: [
    'cosmos account reader',
    'cosmos balance checker',
    'cosmos address converter',
    'bech32 converter',
    'atom balance check',
    'osmosis address converter',
    'cosmos lcd explorer'
  ],
  ogType: 'website'
})

const lcdUrl = ref('https://cosmos-rest.publicnode.com')
const address = ref('')
const loading = ref(false)
const error = ref('')
const info = ref<null | {
  chainId: string
  balances: Array<{ denom: string; display: string }>
  accountNumber?: string
  sequence?: string
  delegations: Array<{ validator: string; amount: string }>
  rewards: Array<{ validator: string; amount: string }>
}>(null)
const copied = ref<string | null>(null)

const presets = [
  { label: 'Cosmos Hub', url: 'https://cosmos-rest.publicnode.com' },
  { label: 'Osmosis', url: 'https://osmosis-rest.publicnode.com' },
  { label: 'Cosmos (official)', url: 'https://api.cosmos.network' },
  { label: 'Osmosis (official)', url: 'https://lcd.osmosis.zone' }
]

// Known denom display metadata (micro units -> human)
const DENOMS: Record<string, { exponent: number; symbol: string }> = {
  uatom: { exponent: 6, symbol: 'ATOM' },
  uosmo: { exponent: 6, symbol: 'OSMO' },
  ujuno: { exponent: 6, symbol: 'JUNO' },
  uakt: { exponent: 6, symbol: 'AKT' },
  ustars: { exponent: 6, symbol: 'STARS' },
  ukava: { exponent: 6, symbol: 'KAVA' },
  uinj: { exponent: 18, symbol: 'INJ' },
  uscrt: { exponent: 6, symbol: 'SCRT' },
  ucre: { exponent: 6, symbol: 'CRE' },
  uumee: { exponent: 6, symbol: 'UMEE' }
}

function displayAmount(denom: string, amount: string): string {
  const meta = DENOMS[denom]
  if (!meta) return `${amount} ${denom}`
  const value = Number(amount) / Math.pow(10, meta.exponent)
  return `${value.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${meta.symbol}`
}

async function getJson(path: string): Promise<unknown> {
  const res = await fetch(lcdUrl.value.replace(/\/$/, '') + path)
  if (!res.ok) throw new Error(`LCD returned ${res.status} for ${path}`)
  return res.json()
}

async function lookup() {
  error.value = ''
  info.value = null
  const addr = address.value.trim()
  if (!/^[a-z0-9]{1,20}1[a-z0-9]{30,}$/.test(addr)) {
    error.value = 'Enter a valid bech32 Cosmos address (e.g. cosmos1...)'
    return
  }
  loading.value = true
  try {
    const [nodeInfo, balancesRes, accountRes, delegationsRes, rewardsRes] = await Promise.all([
      getJson('/cosmos/base/tendermint/v1beta1/node_info').catch(() => null),
      getJson(`/cosmos/bank/v1beta1/balances/${addr}`),
      getJson(`/cosmos/auth/v1beta1/accounts/${addr}`).catch(() => null),
      getJson(`/cosmos/staking/v1beta1/delegations/${addr}`).catch(() => null),
      getJson(`/cosmos/distribution/v1beta1/delegators/${addr}/rewards`).catch(() => null)
    ])

    const balances = ((balancesRes as { balances?: Array<{ denom: string; amount: string }> }).balances || []).map(
      (b) => ({ denom: b.denom, display: displayAmount(b.denom, b.amount) })
    )

    const account = (accountRes as { account?: { account_number?: string; sequence?: string } })?.account
    const dels =
      ((delegationsRes as { delegation_responses?: Array<{ delegation: { validator_address: string; shares: string } }> })
        ?.delegation_responses || []).map((d) => {
        const vali = d.delegation.validator_address
        const operator = vali
        return {
          validator: operator,
          amount: d.delegation.shares ? Number(d.delegation.shares).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' shares' : '-'
        }
      })
    const rewards =
      ((rewardsRes as { rewards?: Array<{ validator_address: string; reward: Array<{ denom: string; amount: string }> }> })
        ?.rewards || [])
        .filter((r) => r.reward?.length)
        .map((r) => ({
          validator: r.validator_address,
          amount: r.reward.map((rr) => displayAmount(rr.denom, rr.amount)).join(', ')
        }))

    info.value = {
      chainId: (nodeInfo as { default_node_info?: { network?: string } })?.default_node_info?.network || '-',
      balances,
      accountNumber: account?.account_number,
      sequence: account?.sequence,
      delegations: dels,
      rewards
    }
  } catch (e) {
    error.value =
      (e as Error).message +
      ' — check the endpoint (it must be an LCD/REST URL and allow browser access)'
  } finally {
    loading.value = false
  }
}

// Bech32 prefix converter
const convInput = ref('')
const convResults = ref<string[]>([])
const convError = ref('')

const PREFIXES = [
  'cosmos', 'osmo', 'juno', 'akash', 'stars', 'kava', 'inj',
  'cre', 'umee', 'secret', 'iov', 'regen', 'terra', 'xpla', 'dydx', 'neutron'
]

function convert() {
  convError.value = ''
  convResults.value = []
  const input = convInput.value.trim()
  if (!input) {
    convError.value = 'Enter a bech32 address'
    return
  }
  try {
    const decoded = bech32.decode(input, 200)
    convResults.value = PREFIXES.filter((p) => p !== decoded.prefix).map(
      (p) => `${p}: ${bech32.encode(p, decoded.words)}`
    )
  } catch (e) {
    convError.value = (e as Error).message
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
        <Globe class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Cosmos Account Reader &amp; Address Converter</h1>
        <p class="text-sm text-muted-foreground">
          Balances, account info, delegations — plus every-chain bech32 conversion, from your browser
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Account lookup</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="cosmos-lcd" class="text-sm font-medium text-muted-foreground mb-1 block">LCD endpoint</label>
            <Input id="cosmos-lcd" v-model="lcdUrl" class="font-mono text-sm" placeholder="https://..." aria-label="Cosmos LCD endpoint" />
            <div class="flex flex-wrap gap-1.5 mt-2">
              <button
                v-for="preset in presets"
                :key="preset.label"
                class="no-btn-hover text-xs px-2 py-0.5 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
                :class="{ 'bg-primary/10 border-primary/40': lcdUrl === preset.url }"
                @click="lcdUrl = preset.url"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
          <div>
            <label for="cosmos-addr" class="text-sm font-medium text-muted-foreground mb-1 block">Account address</label>
            <Input
              id="cosmos-addr"
              v-model="address"
              class="font-mono text-sm"
              placeholder="cosmos1... (any chain prefix)"
              aria-label="Cosmos account address"
              @keyup.enter="lookup"
            />
          </div>
        </div>
        <Button size="sm" :disabled="loading" @click="lookup">
          <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
          <Play v-else class="w-4 h-4 mr-1" />
          Look up account
        </Button>
        <p v-if="error" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="info" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Account info <span class="text-sm font-normal text-muted-foreground">({{ info.chainId }})</span></CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-if="info.balances.length">
          <p class="text-sm text-muted-foreground mb-2">Balances</p>
          <div class="space-y-1">
            <div v-for="b in info.balances" :key="b.denom" class="flex items-center justify-between gap-4 p-2.5 border border-border rounded-lg">
              <code class="font-mono text-xs text-muted-foreground hidden sm:block">{{ b.denom }}</code>
              <p class="font-mono text-sm font-semibold">{{ b.display }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-muted-foreground">No token balances on this network.</p>

        <div v-if="info.accountNumber" class="flex items-center justify-between gap-4 p-3 border border-border rounded-lg">
          <span class="text-sm text-muted-foreground">Account # / sequence</span>
          <code class="font-mono text-xs">{{ info.accountNumber }} / {{ info.sequence }}</code>
        </div>

        <div v-if="info.delegations.length">
          <p class="text-sm text-muted-foreground mb-2">Delegations ({{ info.delegations.length }})</p>
          <div class="space-y-1">
            <div v-for="d in info.delegations.slice(0, 10)" :key="d.validator" class="flex items-center justify-between gap-4 p-2.5 border border-border rounded-lg">
              <code class="font-mono text-xs break-all">{{ d.validator }}</code>
              <span class="font-mono text-xs whitespace-nowrap">{{ d.amount }}</span>
            </div>
          </div>
        </div>

        <div v-if="info.rewards.length">
          <p class="text-sm text-muted-foreground mb-2">Pending rewards</p>
          <div class="space-y-1">
            <div v-for="r in info.rewards.slice(0, 10)" :key="r.validator" class="flex items-center justify-between gap-4 p-2.5 border border-border rounded-lg">
              <code class="font-mono text-xs break-all">{{ r.validator }}</code>
              <span class="font-mono text-xs whitespace-nowrap">{{ r.amount }}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <ArrowRightLeft class="w-4 h-4" /> Bech32 address converter
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          The same key has a different bech32 prefix on every Cosmos chain. Paste any address to convert it to all common prefixes — computed locally.
        </p>
        <div class="flex gap-3 items-end">
          <div class="flex-1">
            <label for="conv-in" class="text-sm font-medium text-muted-foreground mb-1 block">Address (any prefix)</label>
            <Input id="conv-in" v-model="convInput" class="font-mono text-sm" placeholder="cosmos1… / osmo1… / juno1…" aria-label="Address to convert" @keyup.enter="convert" />
          </div>
          <Button size="sm" @click="convert">Convert</Button>
        </div>
        <p v-if="convError" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ convError }}
        </p>
        <div v-if="convResults.length" class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <div v-for="(r, i) in convResults" :key="i" class="flex items-center justify-between gap-2 p-2 border border-border rounded-lg">
            <code class="font-mono text-xs break-all">{{ r }}</code>
            <button
              class="no-btn-hover p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
              :aria-label="'Copy ' + r.split(':')[0] + ' address'"
              @click="copy(r.split(': ')[1], 'conv' + i)"
            >
              <Check v-if="copied === 'conv' + i" class="w-3.5 h-3.5" />
              <Copy v-else class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
