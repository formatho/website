<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, Play, FileJson, AlertCircle, Loader2, BookOpen } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPublicClient, http, type Abi, type Address } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Smart Contract Reader - Call ABI View Functions | Formatho',
  description:
    'Paste a contract ABI, set any RPC endpoint and contract address, and call view and pure functions directly from your browser. Works on every EVM chain - Ethereum, Polygon, BSC, Arbitrum, Base. No key, no server, 100% client-side.',
  keywords: [
    'read smart contract online',
    'call contract function',
    'abi reader',
    'contract view functions',
    'eth_call tool',
    'read contract without etherscan'
  ],
  ogType: 'website'
})

const rpcUrl = ref('https://eth.llamarpc.com')
const contractAddress = ref('')
const abiText = ref('')
const expanded = ref<string | null>(null)
const args: Record<string, Record<string, string>> = {}
const results = ref<Record<string, { loading: boolean; error?: string; value?: string }>>({})
const copied = ref<string | null>(null)

const ERC20_ABI = [
  { type: 'function', name: 'name', stateMutability: 'view', outputs: [{ type: 'string', name: '' }] },
  { type: 'function', name: 'symbol', stateMutability: 'view', outputs: [{ type: 'string', name: '' }] },
  { type: 'function', name: 'decimals', stateMutability: 'view', outputs: [{ type: 'uint8', name: '' }] },
  { type: 'function', name: 'totalSupply', stateMutability: 'view', outputs: [{ type: 'uint256', name: '' }] },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ type: 'address', name: 'account' }],
    outputs: [{ type: 'uint256', name: '' }]
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'address', name: 'spender' }
    ],
    outputs: [{ type: 'uint256', name: '' }]
  }
]

interface AbiFunction {
  name: string
  stateMutability: string
  inputs: Array<{ type: string; name: string }>
  outputs: Array<{ type: string; name: string }>
}

const abiError = computed(() => {
  const text = abiText.value.trim()
  if (!text) return ''
  try {
    JSON.parse(text)
    return ''
  } catch (e) {
    return 'Invalid ABI JSON: ' + (e as Error).message
  }
})

const viewFunctions = computed<AbiFunction[]>(() => {
  const text = abiText.value.trim()
  if (!text || abiError.value) return []
  try {
    const parsed = JSON.parse(text)
    const items = Array.isArray(parsed) ? parsed : (parsed.abi ?? [])
    return items.filter(
      (i: { type?: string; stateMutability?: string; name?: string }) =>
        i.type === 'function' && (i.stateMutability === 'view' || i.stateMutability === 'pure')
    ) as AbiFunction[]
  } catch {
    return []
  }
})

const rpcPresets = [
  { label: 'Ethereum', url: 'https://eth.llamarpc.com' },
  { label: 'Polygon', url: 'https://polygon-rpc.com' },
  { label: 'BNB Chain', url: 'https://bsc-dataseed.binance.org' },
  { label: 'Arbitrum', url: 'https://arb1.arbitrum.io/rpc' },
  { label: 'Base', url: 'https://mainnet.base.org' },
  { label: 'Optimism', url: 'https://mainnet.optimism.io' }
]

function loadErc20Example() {
  abiText.value = JSON.stringify(ERC20_ABI, null, 2)
}

function getArg(fn: string, input: string) {
  return args[fn]?.[input] ?? ''
}

function setArg(fn: string, input: string, value: string) {
  if (!args[fn]) args[fn] = {}
  args[fn][input] = value
}

function convertArg(type: string, value: string): unknown {
  if (/^u?int/.test(type)) return BigInt(value)
  if (type === 'bool') return value === 'true'
  return value
}

function formatResult(value: unknown): string {
  if (typeof value === 'bigint') return value.toString()
  if (Array.isArray(value)) return JSON.stringify(value.map((v) => (typeof v === 'bigint' ? v.toString() : v)), null, 2)
  if (value && typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

async function callFunction(fn: AbiFunction) {
  const key = fn.name
  if (!contractAddress.value || !/^0x[0-9a-fA-F]{40}$/.test(contractAddress.value.trim())) {
    results.value[key] = { loading: false, error: 'Enter a valid contract address (0x...)' }
    return
  }
  results.value[key] = { loading: true }
  try {
    const client = createPublicClient({ transport: http(rpcUrl.value) })
    const parsedAbi = JSON.parse(abiText.value) as Abi
    const callArgs = fn.inputs.map((i) => convertArg(i.type, getArg(fn.name, `${i.type}:${i.name}`)))
    const result = await client.readContract({
      address: contractAddress.value.trim() as Address,
      abi: parsedAbi,
      functionName: fn.name,
      args: callArgs.length ? (callArgs as never) : undefined
    })
    results.value[key] = { loading: false, value: formatResult(result) }
  } catch (e) {
    results.value[key] = { loading: false, error: (e as Error).shortMessage || (e as Error).message }
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
        <BookOpen class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Smart Contract Reader</h1>
        <p class="text-sm text-muted-foreground">
          Paste an ABI, connect any RPC, call view functions — 100% from your browser
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Connection</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="rpc-url" class="text-sm font-medium text-muted-foreground mb-1 block">RPC endpoint</label>
            <Input id="rpc-url" v-model="rpcUrl" class="font-mono text-sm" placeholder="https://..." aria-label="RPC endpoint" />
            <div class="flex flex-wrap gap-1.5 mt-2">
              <button
                v-for="preset in rpcPresets"
                :key="preset.label"
                class="text-xs px-2 py-0.5 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
                :class="{ 'bg-primary/10 border-primary/40': rpcUrl === preset.url }"
                @click="rpcUrl = preset.url"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
          <div>
            <label for="contract-addr" class="text-sm font-medium text-muted-foreground mb-1 block">Contract address</label>
            <Input
              id="contract-addr"
              v-model="contractAddress"
              class="font-mono text-sm"
              placeholder="0x..."
              aria-label="Contract address"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="abi-input" class="text-sm font-medium text-muted-foreground">Contract ABI (JSON)</label>
            <button
              class="text-xs px-2 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
              @click="loadErc20Example"
            >
              Load ERC-20 example
            </button>
          </div>
          <Textarea
            id="abi-input"
            v-model="abiText"
            :rows="7"
            class="font-mono text-xs"
            placeholder='[{"type":"function","name":"totalSupply","stateMutability":"view",...}]'
            aria-label="Contract ABI"
          />
          <p v-if="abiError" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle class="w-3 h-3" /> {{ abiError }}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card v-if="viewFunctions.length">
      <CardHeader>
        <CardTitle class="text-lg">View functions ({{ viewFunctions.length }})</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="fn in viewFunctions" :key="fn.name" class="border border-border rounded-lg">
          <button
            class="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
            @click="expanded = expanded === fn.name ? null : fn.name"
          >
            <div class="min-w-0">
              <p class="font-mono text-sm font-semibold">
                {{ fn.name }}<span class="text-muted-foreground">({{ fn.inputs.map((i) => i.type).join(', ') }})</span>
              </p>
              <p class="text-xs text-muted-foreground">{{ fn.stateMutability }} &rarr; {{ fn.outputs.map((o) => o.type).join(', ') || 'void' }}</p>
            </div>
            <span
              v-if="results[fn.name]"
              class="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
              :class="results[fn.name].error ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'"
            >
              {{ results[fn.name].error ? 'error' : 'result' }}
            </span>
            <span v-else class="text-xs text-muted-400 flex-shrink-0 font-mono">call &darr;</span>
          </button>

          <div v-if="expanded === fn.name" class="px-4 pb-4 space-y-3 border-t border-border pt-3">
            <div v-if="fn.inputs.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="input in fn.inputs" :key="input.name">
                <label class="text-xs font-mono text-muted-foreground mb-1 block">
                  {{ input.name || input.type }} <span class="opacity-60">({{ input.type }})</span>
                </label>
                <Input
                  class="font-mono text-sm"
                  :placeholder="input.type"
                  :value="getArg(fn.name, `${input.type}:${input.name}`)"
                  @input="setArg(fn.name, `${input.type}:${input.name}`, ($event.target as HTMLInputElement).value)"
                />
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Button size="sm" :disabled="results[fn.name]?.loading" @click="callFunction(fn)">
                <Loader2 v-if="results[fn.name]?.loading" class="w-4 h-4 mr-1 animate-spin" />
                <Play v-else class="w-4 h-4 mr-1" />
                Call {{ fn.name }}
              </Button>
              <span class="text-xs text-muted-foreground">eth_call — read-only, no gas, no wallet needed</span>
            </div>

            <div v-if="results[fn.name]?.error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-xs text-red-600 font-mono break-all">{{ results[fn.name]?.error }}</p>
            </div>
            <div
              v-else-if="results[fn.name]?.value !== undefined"
              class="flex items-start justify-between gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <pre class="text-xs font-mono whitespace-pre-wrap break-all flex-1">{{ results[fn.name]?.value }}</pre>
              <Button variant="ghost" size="sm" :aria-label="'Copy result ' + fn.name" @click="copy(results[fn.name]!.value || '', fn.name)">
                <Check v-if="copied === fn.name" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div v-else-if="!abiText" class="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <FileJson class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <p class="text-sm text-muted-foreground">
        Paste a contract ABI to list its view and pure functions. Get the ABI from Etherscan's "Contract ABI" section,
        Foundry <code class="font-mono text-xs">forge inspect</code>, or your build artifacts.
      </p>
    </div>
  </div>
</template>
