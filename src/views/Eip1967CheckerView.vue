<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layers, AlertCircle, Loader2, CheckCircle2, XCircle } from 'lucide-vue-next'
import { createPublicClient, http } from 'viem'
import { evmChains } from '@/data/evmChains'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'EIP-1967 Proxy Slot Checker Online | Formatho',
  description:
    'Check any contract for EIP-1967 proxy storage slots: implementation, admin, and beacon addresses read directly from the standardized slots across 21 EVM chains. Read-only, client-side.',
  keywords: ['eip1967 proxy checker', 'eip-1967 storage slot', 'proxy implementation slot', 'check proxy contract', 'eip1967 slot read', 'beacon proxy slot'],
  ogType: 'website'
})

const SLOTS = {
  implementation: '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
  admin: '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103',
  beacon: '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50',
  rollup: '0x6093de6cc199f8d9f89a758c186a136a8060981c9184fc590a2b1c1dc0b0d500'
} as const

const chain = ref(evmChains[0].slug)
const customRpc = ref('')
const address = ref('')
const loading = ref(false)
const error = ref('')
const results = ref<null | { key: string; label: string; slot: string; value: string; zero: boolean }[]>(null)

async function check() {
  loading.value = true
  error.value = ''
  results.value = null
  try {
    const c = evmChains.find((x) => x.slug === chain.value)!
    const transport = customRpc.value.trim() ? http(customRpc.value.trim()) : http(c.rpc)
    const client = createPublicClient({ transport })
    const addr = address.value.trim() as `0x${string}`
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) throw new Error('Invalid contract address.')

    const entries = await Promise.all(
      (Object.keys(SLOTS) as (keyof typeof SLOTS)[]).map(async (key) => {
        const raw = (await client.getStorageAt({ address: addr, slot: SLOTS[key] })) ?? '0x0'
        // storage is left-aligned 32 bytes; address lives in the low 20 bytes of the slot value
        const asBigInt = BigInt(raw)
        const value = asBigInt === 0n ? '' : ('0x' + asBigInt.toString(16).padStart(40, '0')) as string
        return {
          key,
          label: key === 'rollup' ? 'rollup storage (EIP-1967 extras)' : key,
          slot: SLOTS[key],
          value,
          zero: asBigInt === 0n
        }
      })
    )
    results.value = entries
  } catch (e: any) {
    error.value = e?.shortMessage || e?.message || 'Read failed — is the address a contract on this chain?'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Layers class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">EIP-1967 Proxy Slot Checker</h1>
        <p class="text-sm text-muted-foreground">Read the standardized proxy storage slots — implementation, admin, beacon</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardContent class="space-y-4 pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="chain">Chain</Label>
            <select id="chain" v-model="chain" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option v-for="c in evmChains" :key="c.slug" :value="c.slug">{{ c.name }}</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label for="rpc">Custom RPC (optional)</Label>
            <Input id="rpc" v-model="customRpc" class="font-mono text-xs" placeholder="https://…" aria-label="Custom RPC" />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="addr">Contract address</Label>
          <Input id="addr" v-model="address" class="font-mono text-xs" placeholder="0x…" aria-label="Contract address" />
        </div>
        <Button class="w-full" :disabled="loading" @click="check">
          <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" />
          {{ loading ? 'Reading slots…' : 'Check proxy slots' }}
        </Button>
        <p v-if="error" class="text-sm text-red-500 flex items-start gap-1">
          <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ error }}
        </p>
        <p class="text-xs text-muted-foreground">
          Read-only <span class="font-mono">eth_getStorageAt</span> calls. A zero implementation slot means the contract
          is either not an EIP-1967 proxy or uses a non-standard slot (older UUPS patterns predate the standard).
        </p>
      </CardContent>
    </Card>

    <Card v-if="results">
      <CardHeader><CardTitle class="text-lg">Slot results</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div v-for="r in results" :key="r.key" class="p-4 border border-border rounded-lg space-y-1">
          <div class="flex items-center gap-2">
            <CheckCircle2 v-if="!r.zero" class="w-4 h-4 text-green-600" />
            <XCircle v-else class="w-4 h-4 text-muted-foreground" />
            <p class="font-semibold text-sm capitalize">{{ r.label }}</p>
          </div>
          <p class="font-mono text-xs text-muted-foreground">slot: {{ r.slot }}</p>
          <p v-if="!r.zero" class="font-mono text-sm font-bold break-all">{{ r.value }}</p>
          <p v-else class="text-xs text-muted-foreground">empty (zero)</p>
        </div>
        <p class="text-xs text-muted-foreground">
          <span v-if="results.find((r) => r.key === 'implementation' && !r.zero)">
            This contract is an EIP-1967 proxy — the implementation slot points to the logic contract.
          </span>
          <span v-else>
            No EIP-1967 implementation slot set — not a standard proxy (or a transparent/non-standard proxy layout).
          </span>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
