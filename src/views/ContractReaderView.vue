<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
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
    'Paste a contract ABI, set any RPC endpoint and contract address, and call view and pure functions directly from your browser. Works on every EVM chain. No key, no server, 100% client-side.',
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
const args = reactive<Record<string, Record<number, string>>>({})
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

interface AbiInput {
  type: string
  name: string
}

interface AbiFunction {
  name: string
  // Canonical signature - unique per overload, used for all state keys
  sig: string
  stateMutability: string
  inputs: AbiInput[]
  outputs: AbiInput[]
  // The raw ABI item is kept so each call can be made with a single-item
  // ABI, which disambiguates Solidity overloads for viem
  item: Record<string, unknown>
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
    return items
      .filter(
        (i: { type?: string; stateMutability?: string; name?: string }) =>
          i.type === 'function' && (i.stateMutability === 'view' || i.stateMutability === 'pure')
      )
      .map((item: Record<string, unknown>) => {
        const fn = item as unknown as {
          name: string
          inputs?: AbiInput[]
          outputs?: AbiInput[]
          stateMutability: string
        }
        const inputs = fn.inputs ?? []
        const sig = `${fn.name}(${inputs.map((i) => i.type).join(',')})`
        return {
          name: fn.name,
          sig,
          stateMutability: fn.stateMutability,
          inputs,
          outputs: fn.outputs ?? [],
          item
        }
      })
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

function argPlaceholder(type: string): string {
  if (type.startsWith('tuple')) return 'JSON array of values'
  if (type.endsWith('[]')) return 'comma separated values'
  return type
}

function argLabel(input: AbiInput): string {
  return input.name || input.type
}

function getArg(sig: string, idx: number): string {
  return args[sig]?.[idx] ?? ''
}

function setArg(sig: string, idx: number, value: string) {
  if (!args[sig]) args[sig] = {}
  args[sig][idx] = value
}

/**
 * Convert one raw string input to the value viem expects, with
 * friendly validation errors. Supports ints, bools, arrays (comma
 * separated) and single tuples (JSON).
 */
function parseArg(input: AbiInput, raw: string): unknown {
  const label = argLabel(input)
  const type = input.type
  const v = raw.trim()

  if (v === '') {
    throw new Error(`"${label}" (${type}) is required`)
  }

  const isArray = /\[\]$/.test(type)
  const base = type.replace(/\[\]+$/, '')

  const parseOne = (s: string): unknown => {
    const t = s.trim()
    if (/^u?int/.test(base)) {
      if (!/^-?\d+$/.test(t)) {
        throw new Error(`"${label}": "${s}" is not a valid integer for ${base}`)
      }
      return BigInt(t)
    }
    if (base === 'bool') {
      if (t !== 'true' && t !== 'false') {
        throw new Error(`"${label}": bool must be true or false`)
      }
      return t === 'true'
    }
    if (base.startsWith('tuple')) {
      if (isArray) {
        throw new Error(`"${label}": arrays of structs are not supported yet - use a script for this call`)
      }
      try {
        return JSON.parse(t)
      } catch {
        throw new Error(`"${label}": enter the struct as JSON, e.g. ["PRICE", "1", "0x00..."]`)
      }
    }
    return t
  }

  if (isArray) {
    // Split on top-level commas only, so JSON tuples inside arrays stay intact
    const parts: string[] = []
    let depth = 0
    let current = ''
    for (const ch of v) {
      if (ch === '[' || ch === '{' || ch === '"') depth++
      if (ch === ']' || ch === '}' || ch === '"') depth--
      if (ch === ',' && depth === 0) {
        parts.push(current)
        current = ''
      } else {
        current += ch
      }
    }
    parts.push(current)
    return parts.map(parseOne)
  }
  return parseOne(v)
}

function formatResult(value: unknown): string {
  if (typeof value === 'bigint') return value.toString()
  if (value && typeof value === 'object') {
    // Decoded structs (tuples) contain BigInts at any depth (price, timestamp, ...)
    // and JSON.stringify throws "Do not know how to serialize a BigInt" without a replacer
    return JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? v.toString() : v), 2)
  }
  return String(value)
}

function rpcHint(message: string): string {
  if (/fetch|network|CORS|ERR_/i.test(message)) {
    return message + ' — check the RPC URL: it must be HTTPS and allow browser (CORS) requests'
  }
  return message
}

async function callFunction(fn: AbiFunction) {
  const key = fn.sig
  if (!contractAddress.value || !/^0x[0-9a-fA-F]{40}$/.test(contractAddress.value.trim())) {
    results.value[key] = { loading: false, error: 'Enter a valid contract address (0x...)' }
    return
  }

  try {
    const callArgs = fn.inputs.map((input, idx) => parseArg(input, getArg(key, idx)))
    results.value[key] = { loading: true }
    const client = createPublicClient({ transport: http(rpcUrl.value) })
    const result = await client.readContract({
      address: contractAddress.value.trim() as Address,
      // Single-item ABI disambiguates overloaded functions for viem
      abi: [fn.item] as Abi,
      functionName: fn.name,
      args: callArgs.length ? (callArgs as never) : undefined
    })
    results.value[key] = { loading: false, value: formatResult(result) }
  } catch (e) {
    const err = e as Error
    results.value[key] = { loading: false, error: rpcHint(err.shortMessage || err.message) }
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
                class="no-btn-hover text-xs px-2 py-0.5 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
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
              class="no-btn-hover text-xs px-2 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 transition-colors"
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
        <div v-for="fn in viewFunctions" :key="fn.sig" class="border border-border rounded-lg">
          <button
            class="no-btn-hover w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
            @click="expanded = expanded === fn.sig ? null : fn.sig"
          >
            <div class="min-w-0">
              <p class="font-mono text-sm font-semibold">
                {{ fn.name }}<span class="text-muted-foreground">({{ fn.inputs.map((i) => i.type).join(', ') }})</span>
              </p>
              <p class="text-xs text-muted-foreground">{{ fn.stateMutability }} &rarr; {{ fn.outputs.map((o) => o.type).join(', ') || 'void' }}</p>
            </div>
            <span
              v-if="results[fn.sig]"
              class="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
              :class="results[fn.sig].error ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'"
            >
              {{ results[fn.sig].error ? 'error' : 'result' }}
            </span>
            <span v-else class="text-xs text-muted-400 flex-shrink-0 font-mono">call &darr;</span>
          </button>

          <div v-if="expanded === fn.sig" class="px-4 pb-4 space-y-3 border-t border-border pt-3">
            <div v-if="fn.inputs.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="(input, inputIdx) in fn.inputs" :key="`${fn.sig}:${inputIdx}`">
                <label class="text-xs font-mono text-muted-foreground mb-1 block">
                  {{ argLabel(input) }} <span class="opacity-60">({{ input.type }})</span>
                </label>
                <select
                  v-if="input.type === 'bool'"
                  class="w-full h-9 rounded-md border border-input bg-transparent px-3 font-mono text-sm"
                  :value="getArg(fn.sig, inputIdx)"
                  @change="setArg(fn.sig, inputIdx, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="" disabled>select…</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <Input
                  v-else
                  class="font-mono text-sm"
                  :placeholder="argPlaceholder(input.type)"
                  :model-value="getArg(fn.sig, inputIdx)"
                  @update:model-value="setArg(fn.sig, inputIdx, String($event ?? ''))"
                  @keyup.enter="callFunction(fn)"
                />
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Button size="sm" :disabled="results[fn.sig]?.loading" @click="callFunction(fn)">
                <Loader2 v-if="results[fn.sig]?.loading" class="w-4 h-4 mr-1 animate-spin" />
                <Play v-else class="w-4 h-4 mr-1" />
                Call {{ fn.name }}
              </Button>
              <span class="text-xs text-muted-foreground">eth_call — read-only, no gas, no wallet needed</span>
            </div>

            <div v-if="results[fn.sig]?.error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-xs text-red-600 font-mono break-all">{{ results[fn.sig]?.error }}</p>
            </div>
            <div
              v-else-if="results[fn.sig]?.value !== undefined"
              class="flex items-start justify-between gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <pre class="text-xs font-mono whitespace-pre-wrap break-all flex-1">{{ results[fn.sig]?.value }}</pre>
              <Button variant="ghost" size="sm" :aria-label="'Copy result ' + fn.name" @click="copy(results[fn.sig]!.value || '', fn.sig)">
                <Check v-if="copied === fn.sig" class="w-4 h-4" />
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
