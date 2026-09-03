<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { Copy, Check, Play, FileJson, AlertCircle, Loader2, BookOpen, X, Plus, Save, Trash2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPublicClient, http, type Abi, type Address } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'EVM Smart Contract Reader - Call ABI View Functions | Formatho',
  description:
    'Paste a contract ABI, set any RPC endpoint and contract address, and call view and pure functions directly from your browser. Multi-tab support for multiple contracts. Works on every EVM chain.',
  keywords: [
    'evm smart contract reader',
    'read smart contract online',
    'call contract function',
    'abi reader',
    'contract view functions',
    'eth_call tool',
    'read contract without etherscan',
    'multi contract reader'
  ],
  ogType: 'website'
})

// ─── Tab management ───
interface Tab {
  id: string
  name: string
  rpcUrl: string
  contractAddress: string
  abiText: string
  expanded: string | null
  args: Record<string, Record<number, string>>
  results: Record<string, { loading: boolean; error?: string; value?: string }>
}

let tabCounter = 0

function newTab(name?: string): Tab {
  tabCounter++
  return {
    id: `tab-${Date.now()}-${tabCounter}`,
    name: name || `Tab ${tabCounter}`,
    rpcUrl: 'https://eth.llamarpc.com',
    contractAddress: '',
    abiText: '',
    expanded: null,
    args: {},
    results: {}
  }
}

const tabs = ref<Tab[]>([newTab('Main')])
const activeTabId = ref(tabs.value[0].id)
const activeTab = computed(() => tabs.value.find(t => t.id === activeTabId.value) || tabs.value[0])
const showConnection = ref(true)

function addTab() {
  if (tabs.value.length >= 10) return
  const tab = newTab()
  tabs.value.push(tab)
  activeTabId.value = tab.id
  showConnection.value = true
}

function closeTab(id: string) {
  const idx = tabs.value.findIndex(t => t.id === id)
  if (idx === -1) return
  tabs.value.splice(idx, 1)
  if (tabs.value.length === 0) {
    tabs.value = [newTab('Main')]
  }
  if (activeTabId.value === id) {
    activeTabId.value = tabs.value[Math.max(0, idx - 1)].id
  }
}

function closeOtherTabs(id: string) {
  const tab = tabs.value.find(t => t.id === id)
  if (tab) tabs.value = [tab]
  activeTabId.value = id
}

// ─── localStorage persistence ───
const STORAGE_KEY = 'formatho-contract-reader-tabs'
const saveEnabled = ref(false)

function saveTabs() {
  if (!saveEnabled.value) return
  try {
    const data = {
      tabs: tabs.value.map(t => ({
        id: t.id,
        name: t.name,
        rpcUrl: t.rpcUrl,
        contractAddress: t.contractAddress,
        abiText: t.abiText,
        expanded: t.expanded,
        args: t.args
      })),
      activeTabId: activeTabId.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* storage full or unavailable */ }
}

function loadTabs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if (data.tabs?.length) {
      tabs.value = data.tabs.map((t: Partial<Tab>) => ({
        ...newTab(),
        ...t,
        results: {} // Don't persist results (they're stale)
      }))
      tabCounter = tabs.value.length
      if (data.activeTabId && tabs.value.some(t => t.id === data.activeTabId)) {
        activeTabId.value = data.activeTabId
      }
      saveEnabled.value = true
    }
  } catch { /* corrupted data, start fresh */ }
}

function clearSaved() {
  localStorage.removeItem(STORAGE_KEY)
  saveEnabled.value = false
  tabs.value = [newTab('Main')]
  activeTabId.value = tabs.value[0].id
}

// Auto-name tab from contract address
watch(() => activeTab.value?.contractAddress, (addr) => {
  if (addr && addr.length >= 10) {
    const tab = activeTab.value
    if (tab && (tab.name.startsWith('Tab ') || tab.name === 'Main')) {
      tab.name = addr.slice(0, 6) + '…' + addr.slice(-4)
    }
  }
}, { deep: true })

// Debounced save
let saveTimeout: ReturnType<typeof setTimeout> | null = null
watch(tabs, () => {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(saveTabs, 500)
}, { deep: true })

onMounted(loadTabs)

// ─── ABI & functions (per active tab) ───
const abiError = computed(() => {
  const raw = activeTab.value.abiText.trim()
  if (!raw) return ''
  try {
    JSON.parse(raw)
    return ''
  } catch (e) {
    return 'Invalid ABI JSON: ' + (e as Error).message
  }
})

interface AbiFunction {
  name: string
  sig: string
  stateMutability: string
  inputs: Array<{ type: string; name: string }>
  outputs: Array<{ type: string; name: string }>
  item: Record<string, unknown>
}

const viewFunctions = computed<AbiFunction[]>(() => {
  const tab = activeTab.value
  const raw = tab.abiText.trim()
  if (!raw || abiError.value) return []
  try {
    const parsed = JSON.parse(raw)
    const items = Array.isArray(parsed) ? parsed : (parsed.abi ?? [])
    return items
      .filter((i: { type?: string; stateMutability?: string }) =>
        i.type === 'function' && (i.stateMutability === 'view' || i.stateMutability === 'pure'))
      .map((item: Record<string, unknown>) => {
        const fn = item as unknown as { name: string; inputs?: Array<{ type: string; name: string }>; outputs?: Array<{ type: string; name: string }>; stateMutability: string }
        const inputs = fn.inputs ?? []
        const sig = `${fn.name}(${inputs.map((i) => i.type).join(',')})`
        return { name: fn.name, sig, stateMutability: fn.stateMutability, inputs, outputs: fn.outputs ?? [], item }
      })
  } catch { return [] }
})

// ─── Presets ───
const rpcPresets = [
  { label: 'Ethereum', url: 'https://eth.llamarpc.com' },
  { label: 'Polygon', url: 'https://polygon-rpc.com' },
  { label: 'BNB', url: 'https://bsc-dataseed.binance.org' },
  { label: 'Arbitrum', url: 'https://arb1.arbitrum.io/rpc' },
  { label: 'Base', url: 'https://mainnet.base.org' },
  { label: 'Optimism', url: 'https://mainnet.optimism.io' }
]

const ERC20_ABI = [
  { type: 'function', name: 'name', stateMutability: 'view', outputs: [{ type: 'string', name: '' }] },
  { type: 'function', name: 'symbol', stateMutability: 'view', outputs: [{ type: 'string', name: '' }] },
  { type: 'function', name: 'decimals', stateMutability: 'view', outputs: [{ type: 'uint8', name: '' }] },
  { type: 'function', name: 'totalSupply', stateMutability: 'view', outputs: [{ type: 'uint256', name: '' }] },
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ type: 'address', name: 'account' }], outputs: [{ type: 'uint256', name: '' }] },
  { type: 'function', name: 'allowance', stateMutability: 'view', inputs: [{ type: 'address', name: 'owner' }, { type: 'address', name: 'spender' }], outputs: [{ type: 'uint256', name: '' }] }
]

const UNISWAP_V2_FACTORY_ABI = [
  { type: 'function', name: 'getPair', stateMutability: 'view', inputs: [{ type: 'address', name: 'tokenA' }, { type: 'address', name: 'tokenB' }], outputs: [{ type: 'address', name: '' }] },
  { type: 'function', name: 'allPairsLength', stateMutability: 'view', outputs: [{ type: 'uint256', name: '' }] }
]

const uniswapPresets = [
  { label: 'V2 Factory', abi: UNISWAP_V2_FACTORY_ABI, address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' },
  { label: 'V2 Router', abi: [{ type: 'function', name: 'getAmountsOut', stateMutability: 'view', inputs: [{ type: 'uint256', name: 'amountIn' }, { type: 'address[]', name: 'path' }], outputs: [{ type: 'uint256[]', name: 'amounts' }] }, { type: 'function', name: 'factory', stateMutability: 'pure', outputs: [{ type: 'address', name: '' }] }], address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' },
  { label: 'V2 Pair', abi: [{ type: 'function', name: 'getReserves', stateMutability: 'view', outputs: [{ type: 'uint112', name: 'reserve0' }, { type: 'uint112', name: 'reserve1' }, { type: 'uint32', name: 'blockTimestampLast' }] }, { type: 'function', name: 'token0', stateMutability: 'view', outputs: [{ type: 'address', name: '' }] }, { type: 'function', name: 'token1', stateMutability: 'view', outputs: [{ type: 'address', name: '' }] }, { type: 'function', name: 'totalSupply', stateMutability: 'view', outputs: [{ type: 'uint256', name: '' }] }], address: '' },
]

function loadErc20() {
  activeTab.value.abiText = JSON.stringify(ERC20_ABI, null, 2)
}

function loadUniswap(preset: { abi: unknown[]; address: string }) {
  activeTab.value.abiText = JSON.stringify(preset.abi, null, 2)
  if (preset.address) activeTab.value.contractAddress = preset.address
}

// ─── Argument parsing & function calling (per tab) ───
function argLabel(input: { type: string; name: string }): string {
  return input.name || input.type
}

function getArg(tab: Tab, sig: string, idx: number): string {
  return tab.args[sig]?.[idx] ?? ''
}

function setArg(tab: Tab, sig: string, idx: number, value: string) {
  if (!tab.args[sig]) tab.args[sig] = {}
  tab.args[sig][idx] = value
}

function parseArg(input: { type: string; name: string }, raw: string): unknown {
  const label = argLabel(input)
  const type = input.type
  const v = raw.trim()
  if (v === '') throw new Error(`"${label}" (${type}) is required`)
  const isArray = /\[\]$/.test(type)
  const base = type.replace(/\[\]+$/, '')
  const parseOne = (s: string): unknown => {
    const t = s.trim()
    if (/^u?int/.test(base)) {
      if (!/^-?\d+$/.test(t)) throw new Error(`"${label}": "${s}" is not a valid integer for ${base}`)
      return BigInt(t)
    }
    if (base === 'bool') {
      if (t !== 'true' && t !== 'false') throw new Error(`"${label}": bool must be true or false`)
      return t === 'true'
    }
    if (base.startsWith('tuple')) {
      if (isArray) throw new Error(`"${label}": arrays of structs are not supported yet`)
      try { return JSON.parse(t) } catch { throw new Error(`"${label}": enter the struct as JSON`) }
    }
    return t
  }
  if (isArray) {
    const parts: string[] = []
    let depth = 0
    let current = ''
    for (const ch of v) {
      if (ch === '[' || ch === '{' || ch === '"') depth++
      if (ch === ']' || ch === '}' || ch === '"') depth--
      if (ch === ',' && depth === 0) { parts.push(current); current = '' } else { current += ch }
    }
    parts.push(current)
    return parts.map(parseOne)
  }
  return parseOne(v)
}

function formatResult(value: unknown): string {
  if (typeof value === 'bigint') return value.toString()
  if (value && typeof value === 'object') {
    return JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? v.toString() : v), 2)
  }
  return String(value)
}

async function callFunction(fn: AbiFunction) {
  const tab = activeTab.value
  const key = fn.sig
  if (!tab.contractAddress || !/^0x[0-9a-fA-F]{40}$/.test(tab.contractAddress.trim())) {
    tab.results[key] = { loading: false, error: 'Enter a valid contract address (0x...)' }
    return
  }
  try {
    const callArgs = fn.inputs.map((input, idx) => parseArg(input, getArg(tab, key, idx)))
    tab.results[key] = { loading: true }
    const client = createPublicClient({ transport: http(tab.rpcUrl) })
    const result = await client.readContract({
      address: tab.contractAddress.trim() as Address,
      abi: [fn.item] as Abi,
      functionName: fn.name,
      args: callArgs.length ? (callArgs as never) : undefined
    })
    tab.results[key] = { loading: false, value: formatResult(result) }
  } catch (e) {
    const err = e as Error
    tab.results[key] = { loading: false, error: err.shortMessage || err.message }
  }
}

const copied = ref<string | null>(null)
async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = null), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-4">
    <!-- Compact header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg">
          <BookOpen class="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">EVM Contract Reader</h1>
          <p class="text-xs text-muted-foreground">Call view functions on any contract — multi-tab, saved locally</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="no-btn-hover text-xs px-3 py-1.5 border rounded-lg flex items-center gap-1.5 transition-colors"
          :class="saveEnabled ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-foreground/30'"
          :title="saveEnabled ? 'Tabs saved to localStorage' : 'Enable tab saving'"
          @click="saveEnabled = !saveEnabled; saveTabs()"
        >
          <Save class="w-3.5 h-3.5" />
          {{ saveEnabled ? 'Saved' : 'Save' }}
        </button>
        <button
          v-if="saveEnabled"
          class="no-btn-hover text-xs px-2 py-1.5 border border-border rounded-lg text-muted-foreground hover:text-red-500 hover:border-red-500/30 transition-colors"
          title="Clear saved tabs"
          @click="clearSaved"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Tab bar -->
    <div class="flex items-end gap-1 border-b border-border mb-0 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="group relative flex items-center gap-2 px-4 py-2.5 text-sm rounded-t-lg border border-b-0 transition-colors whitespace-nowrap"
        :class="tab.id === activeTabId
          ? 'bg-background border-border text-foreground font-medium'
          : 'bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40'"
        @click="activeTabId = tab.id"
      >
        <input
          :value="tab.name"
          class="bg-transparent border-none outline-none text-inherit font-inherit w-auto min-w-[40px] max-w-[140px] truncate cursor-text focus:cursor-text"
          aria-label="Tab name"
          @input="tab.name = ($event.target as HTMLInputElement).value"
          @keydown.stop
          @click.stop
          @dblclick.stop
        />
        <span
          v-if="viewFunctions.length && tab.id === activeTabId"
          class="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full"
        >{{ viewFunctions.length }}</span>
        <span
          class="ml-1 p-0.5 rounded hover:bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity"
          :class="tab.id === activeTabId ? 'opacity-100' : ''"
          role="button"
          tabindex="0"
          :aria-label="'Close tab ' + tab.name"
          @click.stop="closeTab(tab.id)"
          @keydown.enter.stop="closeTab(tab.id)"
        >
          <X class="w-3.5 h-3.5" />
        </span>
      </button>
      <button
        class="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Add new tab"
        @click="addTab"
      >
        <Plus class="w-4 h-4" />
      </button>
    </div>

    <!-- Active tab content -->
    <div v-if="activeTab" class="border border-t-0 border-border rounded-b-xl p-4 space-y-4">
      <!-- Connection bar (collapsible) -->
      <div class="flex items-center justify-between">
        <button
          class="no-btn-hover text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          @click="showConnection = !showConnection"
        >
          {{ showConnection ? '▼' : '▶' }} Connection
          <span v-if="activeTab.contractAddress" class="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded">
            {{ activeTab.contractAddress.slice(0, 6) }}…{{ activeTab.contractAddress.slice(-4) }}
          </span>
        </button>
        <div class="flex gap-1.5 flex-wrap">
          <button class="no-btn-hover text-[10px] px-2 py-1 border border-border rounded-full hover:border-primary/40 transition-colors" @click="loadErc20">ERC-20</button>
          <button v-for="preset in uniswapPresets" :key="preset.label"
            class="no-btn-hover text-[10px] px-2 py-1 border border-border rounded-full hover:border-primary/40 transition-colors"
            @click="loadUniswap(preset)">Uni {{ preset.label }}</button>
        </div>
      </div>

      <div v-if="showConnection" class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">RPC endpoint</label>
          <Input v-model="activeTab.rpcUrl" class="font-mono text-xs h-9" placeholder="https://..." aria-label="RPC endpoint" />
          <div class="flex flex-wrap gap-1 mt-1.5">
            <button v-for="preset in rpcPresets" :key="preset.label"
              class="no-btn-hover text-[10px] px-2 py-0.5 border border-border rounded-full hover:border-primary/40 transition-colors"
              :class="{ 'bg-primary/10 border-primary/40': activeTab.rpcUrl === preset.url }"
              @click="activeTab.rpcUrl = preset.url">{{ preset.label }}</button>
          </div>
        </div>
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">Contract address</label>
          <Input v-model="activeTab.contractAddress" class="font-mono text-xs h-9" placeholder="0x..." aria-label="Contract address" />
        </div>
        <div>
          <label class="text-xs text-muted-foreground mb-1 block">ABI (JSON)</label>
          <Textarea v-model="activeTab.abiText" :rows="2" class="font-mono text-[10px]" placeholder='[{"type":"function",...}]' aria-label="Contract ABI" />
          <p v-if="abiError" class="text-[10px] text-red-500 mt-1">{{ abiError }}</p>
        </div>
      </div>

      <!-- Functions list (compact) -->
      <div v-if="viewFunctions.length" class="space-y-1.5">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-muted-foreground">{{ viewFunctions.length }} view functions</p>
          <p class="text-[10px] text-muted-foreground/60">eth_call · read-only · no gas</p>
        </div>
        <div
          v-for="fn in viewFunctions"
          :key="fn.sig"
          class="border border-border rounded-lg"
          :class="{ 'bg-primary/[0.02]': activeTab.expanded === fn.sig }"
        >
          <!-- Function header -->
          <button
            class="no-btn-hover w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left"
            @click="activeTab.expanded = activeTab.expanded === fn.sig ? null : fn.sig"
          >
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <code class="font-mono text-xs font-semibold text-foreground">{{ fn.name }}</code>
                <span class="font-mono text-[10px] text-muted-foreground">({{ fn.inputs.map(i => i.type).join(', ') }})</span>
              </div>
              <code class="font-mono text-[10px] text-muted-foreground/60">
                {{ fn.stateMutability }} → {{ fn.outputs.map(o => o.type).join(', ') || 'void' }}
              </code>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span v-if="activeTab.results[fn.sig]" class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                :class="activeTab.results[fn.sig].error ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'">
                {{ activeTab.results[fn.sig].error ? 'error' : 'result' }}
              </span>
              <span class="text-muted-foreground text-xs font-mono">{{ activeTab.expanded === fn.sig ? '▾' : '▸' }}</span>
            </div>
          </button>

          <!-- Expanded: args + call + result -->
          <div v-if="activeTab.expanded === fn.sig" class="px-3 pb-3 space-y-2.5 border-t border-border/50 pt-2.5">
            <div v-if="fn.inputs.length" class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div v-for="(input, idx) in fn.inputs" :key="idx">
                <label class="text-[10px] font-mono text-muted-foreground mb-0.5 block">
                  {{ argLabel(input) }} <span class="opacity-50">({{ input.type }})</span>
                </label>
                <Input
                  v-if="input.type !== 'bool'"
                  class="font-mono text-xs h-8"
                  :placeholder="input.type.endsWith('[]') ? 'comma sep' : input.type"
                  :model-value="getArg(activeTab, fn.sig, idx)"
                  @update:model-value="setArg(activeTab, fn.sig, idx, String($event ?? ''))"
                  @keyup.enter="callFunction(fn)"
                />
                <select
                  v-else
                  class="w-full h-8 rounded-md border border-input bg-transparent px-2 font-mono text-xs"
                  :value="getArg(activeTab, fn.sig, idx)"
                  @change="setArg(activeTab, fn.sig, idx, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="" disabled>select…</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Button size="sm" class="h-8 text-xs" :disabled="activeTab.results[fn.sig]?.loading" @click="callFunction(fn)">
                <Loader2 v-if="activeTab.results[fn.sig]?.loading" class="w-3.5 h-3.5 mr-1 animate-spin" />
                <Play v-else class="w-3.5 h-3.5 mr-1" />
                Call {{ fn.name }}
              </Button>
            </div>

            <div v-if="activeTab.results[fn.sig]?.error" class="p-2.5 bg-red-500/10 border border-red-500/20 rounded-md">
              <p class="text-xs text-red-600 font-mono break-all">{{ activeTab.results[fn.sig]?.error }}</p>
            </div>
            <div v-else-if="activeTab.results[fn.sig]?.value !== undefined"
              class="flex items-start justify-between gap-2 p-2.5 bg-green-500/10 border border-green-500/20 rounded-md">
              <pre class="text-xs font-mono whitespace-pre-wrap break-all flex-1 m-0">{{ activeTab.results[fn.sig]?.value }}</pre>
              <Button variant="ghost" size="sm" class="h-6 px-2 shrink-0" :aria-label="'Copy result ' + fn.name" @click="copy(activeTab.results[fn.sig]!.value || '', fn.sig)">
                <Check v-if="copied === fn.sig" class="w-3.5 h-3.5" />
                <Copy v-else class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!activeTab.abiText" class="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <FileJson class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div class="text-sm">
          <p class="text-muted-foreground">Paste a contract ABI to list view functions.</p>
          <p class="text-xs text-muted-foreground/70 mt-1">
            Get the ABI from Etherscan, Foundry <code class="font-mono">forge inspect</code>, or use the presets above.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
