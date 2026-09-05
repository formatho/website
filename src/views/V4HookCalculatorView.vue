<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Anchor, CheckCircle2 } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Uniswap v4 Hook Permission Calculator | Formatho',
  description:
    'Compute the Uniswap v4 hook permission bits encoded in a hook address: pick which of the 14 hook calls your contract implements and get the required address prefix, or decode any hook address. Client-side.',
  keywords: ['uniswap v4 hook calculator', 'v4 hook permissions', 'hook address prefix', 'v4 permission bits', 'uniswap v4 hook address mining'],
  ogType: 'website'
})

// Exact bit layout from v4-core Hooks.sol (flags live in the top 14 bits of the address)
const FLAGS: { name: string; label: string; bit: number }[] = [
  { name: 'beforeInitialize', label: 'beforeInitialize', bit: 13 },
  { name: 'afterInitialize', label: 'afterInitialize', bit: 12 },
  { name: 'beforeAddLiquidity', label: 'beforeAddLiquidity', bit: 11 },
  { name: 'afterAddLiquidity', label: 'afterAddLiquidity', bit: 10 },
  { name: 'beforeRemoveLiquidity', label: 'beforeRemoveLiquidity', bit: 9 },
  { name: 'afterRemoveLiquidity', label: 'afterRemoveLiquidity', bit: 8 },
  { name: 'beforeSwap', label: 'beforeSwap', bit: 7 },
  { name: 'afterSwap', label: 'afterSwap', bit: 6 },
  { name: 'beforeDonate', label: 'beforeDonate', bit: 5 },
  { name: 'afterDonate', label: 'afterDonate', bit: 4 },
  { name: 'beforeSwapReturnsDelta', label: 'beforeSwapReturnsDelta', bit: 3 },
  { name: 'afterSwapReturnsDelta', label: 'afterSwapReturnsDelta', bit: 2 },
  { name: 'afterAddLiquidityReturnsDelta', label: 'afterAddLiquidityReturnsDelta', bit: 1 },
  { name: 'afterRemoveLiquidityReturnsDelta', label: 'afterRemoveLiquidityReturnsDelta', bit: 0 }
]

// LiquidityFirewallHook deployment: all five hooks -> 0x1780 (ground truth)
const selected = ref<Record<string, boolean>>({
  beforeInitialize: false,
  afterInitialize: true,
  beforeAddLiquidity: false,
  afterAddLiquidity: true,
  beforeRemoveLiquidity: true,
  afterRemoveLiquidity: true,
  beforeSwap: true,
  afterSwap: false,
  beforeDonate: false,
  afterDonate: false,
  beforeSwapReturnsDelta: false,
  afterSwapReturnsDelta: false,
  afterAddLiquidityReturnsDelta: false,
  afterRemoveLiquidityReturnsDelta: false
})

const permissionBits = computed(() => {
  let v = 0
  for (const f of FLAGS) if (selected.value[f.name]) v += 1 << f.bit
  return v
})

const suffix = computed(() => permissionBits.value.toString(16).toUpperCase().padStart(4, '0'))

// decode a pasted hook address
const decodeInput = ref('0x3EED3A09dc6cfb2F49496666F782aA94CE959780')
const decodedFlags = computed(() => {
  const a = decodeInput.value.trim()
  if (!/^0x[0-9a-fA-F]{40}$/.test(a)) return null
  const field = Number(BigInt(a) & 0x3fffn) // low 14 bits: ALL_HOOK_MASK
  return FLAGS.map((f) => ({ ...f, on: ((field >> f.bit) & 1) === 1 })).filter((f) => f.on)
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Anchor class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Uniswap v4 Hook Permission Calculator</h1>
        <p class="text-sm text-muted-foreground">Which hook calls does your contract implement? Get the required address suffix.</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Your hook implements…</CardTitle></CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <label v-for="f in FLAGS" :key="f.name" class="flex items-center gap-3 p-2.5 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
            <input v-model="selected[f.name]" type="checkbox" :aria-label="f.label" />
            <span class="font-mono text-xs">{{ f.label }}</span>
          </label>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-6 border-primary/30">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Required address suffix (low 14 bits)</CardTitle>
        <CopyButton :text="suffix" aria-label="Copy suffix" />
      </CardHeader>
      <CardContent class="space-y-2">
        <p class="font-mono text-2xl font-black">…{{ suffix }}</p>
        <p class="text-xs text-muted-foreground">
          bits: {{ permissionBits.toString(2).padStart(14, '0') }} (14-bit permission field) — the PoolManager checks
          uint160(address) &amp; bit, so the address's LOW 14 bits must equal this value; HookMiner salts a CREATE2
          deployment until they do. A hook must implement a call if — and only if — its bit is set.
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-lg">Decode a hook address</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div class="grid gap-2">
          <Label for="hookaddr">Hook address</Label>
          <Input id="hookaddr" v-model="decodeInput" class="font-mono text-xs" aria-label="Hook address to decode" />
        </div>
        <div v-if="decodedFlags" class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <span v-for="f in decodedFlags" :key="f.name" class="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-muted">
              <CheckCircle2 class="w-3 h-3" /> {{ f.label }}
            </span>
            <span v-if="!decodedFlags.length" class="text-xs text-muted-foreground">No permissions — a plain address (or a no-hook pool).</span>
          </div>
        </div>
        <p v-else class="text-xs text-red-500">Enter a full 20-byte address.</p>
        <p class="text-xs text-muted-foreground">
          Example: 0x3EED…9780 decodes to the five-call firewall (afterInitialize, afterAdd/RemoveLiquidity, beforeSwap,
          beforeRemoveLiquidity) — its low 14 bits are 0x1780.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
