<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Play, Network, AlertCircle, Loader2, ArrowRightLeft } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Polkadot Substrate Reader & SS58 Converter | Formatho',
  description:
    'Query any Substrate chain - Polkadot, Kusama, Westend or your local node - via RPC: storage entries, runtime version, chain info. Includes an SS58 address format converter. Runs entirely from your browser.',
  keywords: [
    'polkadot storage query',
    'substrate rpc reader',
    'polkadot address converter',
    'ss58 converter',
    'kusama address converter',
    'substrate state_getStorage',
    'polkadot rpc explorer'
  ],
  ogType: 'website'
})

const rpcUrl = ref('wss://rpc.polkadot.io')
const loading = ref(false)
const error = ref('')
const chainInfo = ref<null | Record<string, string>>(null)
const storageKey = ref('')
const storageResult = ref('')
const storageError = ref('')

const presets = [
  { label: 'Polkadot', url: 'wss://rpc.polkadot.io' },
  { label: 'Kusama', url: 'wss://kusama-rpc.polkadot.io' },
  { label: 'Westend', url: 'wss://westend-rpc.polkadot.io' },
  { label: 'Local (9944)', url: 'ws://127.0.0.1:9944' }
]

// SS58 conversion state
const ss58Input = ref('')
const ss58Prefix = ref('0')
const ss58Results = ref<string[]>([])
const ss58Error = ref('')
const copiedIdx = ref<number | null>(null)


async function rpc<T>(method: string, params: unknown[] = []): Promise<T> {
  // Substrate RPC over HTTP - most endpoints expose both ws and http on the same URL
  const httpUrl = rpcUrl.value.replace(/^ws/, 'http')
  const res = await fetch(httpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message || data.error.data || 'RPC error')
  return data.result as T
}

async function fetchChainInfo() {
  error.value = ''
  chainInfo.value = null
  loading.value = true
  try {
    const [chain, version, props] = await Promise.all([
      rpc<string>('system_chain'),
      rpc<{ specName: string; specVersion: string }>('chain_getRuntimeVersion' as never).catch(() => null),
      rpc<Record<string, unknown>>('system_properties').catch(() => null)
    ])
    const info: Record<string, string> = { Chain: chain }
    if (version) info['Runtime'] = `${version.specName} v${version.specVersion}`
    if (props) {
      if (props.tokenSymbol) info['Token'] = String(props.tokenSymbol)
      if (props.ss58Format) info['SS58 format'] = String(props.ss58Format)
    }
    chainInfo.value = info
  } catch (e) {
    error.value = (e as Error).message + ' — note: browser (CORS) access must be enabled on the endpoint'
  } finally {
    loading.value = false
  }
}

async function queryStorage() {
  storageError.value = ''
  storageResult.value = ''
  const key = storageKey.value.trim()
  if (!key) {
    storageError.value = 'Enter a storage key (0x-prefixed hex)'
    return
  }
  try {
    const result = await rpc<string | null>('state_getStorage', [key])
    storageResult.value = result === null ? '(null - storage entry empty or pruned)' : result
  } catch (e) {
    storageError.value = (e as Error).message
  }
}

function convertSs58() {
  ss58Error.value = ''
  ss58Results.value = []
  const input = ss58Input.value.trim()
  if (!input) {
    ss58Error.value = 'Enter a Substrate address'
    return
  }
  try {
    const decoded = decodeAddress(input)
    const prefixes = [0, 2, 42, 5, 63, 1284, 2032, 2254]
    const target = parseInt(ss58Prefix.value, 10)
    const list = prefixes.includes(target) ? [target, ...prefixes.filter((p) => p !== target)] : [target, ...prefixes]
    ss58Results.value = [...new Set(list)].map((p) => `${p}: ${encodeAddress(decoded, p)}`)
  } catch (e) {
    ss58Error.value = (e as Error).message
  }
}

async function copy(text: string, idx: number) {
  try {
    await navigator.clipboard.writeText(text)
    copiedIdx.value = idx
    setTimeout(() => (copiedIdx.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Network class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Polkadot Substrate Reader &amp; SS58 Converter</h1>
        <p class="text-sm text-muted-foreground">
          Chain info, raw storage queries, and address format conversion — from your browser
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Chain connection</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label for="dot-rpc" class="text-sm font-medium text-muted-foreground mb-1 block">RPC endpoint</label>
          <Input id="dot-rpc" v-model="rpcUrl" class="font-mono text-sm" placeholder="wss://..." aria-label="Substrate RPC endpoint" />
          <div class="flex flex-wrap gap-1.5 mt-2">
            <button
              v-for="preset in presets"
              :key="preset.label"
              class="no-btn-hover text-xs px-2 py-0.5 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
              :class="{ 'bg-primary/10 border-primary/40': rpcUrl === preset.url }"
              @click="rpcUrl = preset.url"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
        <Button size="sm" :disabled="loading" @click="fetchChainInfo">
          <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
          <Play v-else class="w-4 h-4 mr-1" />
          Fetch chain info
        </Button>
        <p v-if="error" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="chainInfo" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Chain info</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div v-for="(v, k) in chainInfo" :key="k" class="flex items-center justify-between gap-4 p-3 border border-border rounded-lg">
          <span class="text-sm text-muted-foreground">{{ k }}</span>
          <code class="font-mono text-xs">{{ v }}</code>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Raw storage query (state_getStorage)</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div>
          <label for="storage-key" class="text-sm font-medium text-muted-foreground mb-1 block">Storage key (hex)</label>
          <Input
            id="storage-key"
            v-model="storageKey"
            class="font-mono text-sm"
            placeholder="0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e986d419bc5 (system.account prefix)"
            aria-label="Storage key"
            @keyup.enter="queryStorage"
          />
          <p class="text-xs text-muted-foreground mt-1">
            Storage keys are the Keccak-256 (or Blake2) hash of module and storage name, plus any key encodings.
          </p>
        </div>
        <Button size="sm" @click="queryStorage">
          <Play class="w-4 h-4 mr-1" /> Query storage
        </Button>
        <p v-if="storageError" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ storageError }}
        </p>
        <div v-if="storageResult" class="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <pre class="font-mono text-xs whitespace-pre-wrap break-all">{{ storageResult }}</pre>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <ArrowRightLeft class="w-4 h-4" /> SS58 address converter
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          The same account has a different address on every Substrate network. Paste any format and see it in all common network prefixes.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="ss58-in" class="text-sm font-medium text-muted-foreground mb-1 block">Address (any network)</label>
            <Input id="ss58-in" v-model="ss58Input" class="font-mono text-sm" placeholder="1abc… / Dabc… / 5abc…" aria-label="Substrate address" />
          </div>
          <div>
            <label for="ss58-prefix" class="text-sm font-medium text-muted-foreground mb-1 block">Highlight prefix</label>
            <select id="ss58-prefix" v-model="ss58Prefix" class="w-full h-9 rounded-md border border-input bg-transparent px-3 font-mono text-sm">
              <option value="0">Polkadot (0)</option>
              <option value="2">Kusama (2)</option>
              <option value="42">Generic Substrate (42)</option>
            </select>
            <Button size="sm" class="mt-3" @click="convertSs58">Convert</Button>
          </div>
        </div>
        <p v-if="ss58Error" class="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle class="w-3 h-3" /> {{ ss58Error }}
        </p>
        <div v-if="ss58Results.length" class="space-y-1">
          <div
            v-for="(r, i) in ss58Results"
            :key="i"
            class="flex items-center justify-between gap-3 p-2.5 border border-border rounded-lg"
            :class="{ 'bg-primary/5': r.startsWith(ss58Prefix + ':') }"
          >
            <code class="font-mono text-xs break-all">{{ r }}</code>
            <Button variant="ghost" size="sm" :aria-label="'Copy address ' + i" @click="copy(r.split(': ')[1], i)">
              <Check v-if="copiedIdx === i" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
