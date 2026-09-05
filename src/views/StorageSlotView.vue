<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Database } from 'lucide-vue-next'
import { keccak256, toHex, pad, concat } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Solidity Storage Slot Calculator - Mapping & Array Slots | Formatho',
  description:
    'Compute Solidity storage slots: mapping keys (keccak(h(k) . p)), dynamic array elements, and simple variable slots. Exact keccak256 math identical to the EVM. Client-side.',
  keywords: ['solidity storage slot calculator', 'mapping slot calculator', 'solidity slot layout', 'keccak storage slot', 'evm storage slot', 'sload slot compute'],
  ogType: 'website'
})

type Kind = 'simple' | 'mapping' | 'array'
const kind = ref<Kind>('mapping')
const slot = ref('0')
const mappingKey = ref('alice')
const mappingKeyType = ref('address')
const arrayIndex = ref('0')

function computeMappingSlot(key: string, keyType: string, slotNum: bigint): `0x${string}` {
  const k = key.trim()
  let encoded: Uint8Array
  if (keyType === 'address') {
    encoded = /^0x[0-9a-fA-F]{40}$/.test(k)
      ? toHex(pad(k as `0x${string}`, { size: 32 }))
      : toHex(k, { size: 32 }) // non-address text still hashes deterministically
  } else if (keyType === 'uint256') {
    encoded = toHex(BigInt(k || '0'), { size: 32 })
  } else {
    encoded = toHex(k, { size: 32 })
  }
  const slotBytes = toHex(slotNum, { size: 32 })
  return keccak256(concat([encoded, slotBytes]))
}

const result = computed<{ slot: string; explain: string } | { error: string } | null>(() => {
  try {
    const p = BigInt(slot.value || '0')
    if (p < 0n) return { error: 'Slot must be a non-negative integer.' }
    if (kind.value === 'simple') {
      return { slot: toHex(p, { size: 32 }), explain: `Simple variable at declared position ${p} — slot is just the index, zero-padded to 32 bytes.` }
    }
    if (kind.value === 'mapping') {
      const h = computeMappingSlot(mappingKey.value, mappingKeyType.value, p)
      return {
        slot: h,
        explain: `Mapping value slot = keccak256(abi.encode(key) . p) with p = ${p}. This is the slot an SLOAD/eth_getStorageAt must target.`
      }
    }
    // dynamic array element: keccak(p) + index
    const base = keccak256(toHex(p, { size: 32 }))
    const elem = BigInt(base) + BigInt(arrayIndex.value || '0')
    return {
      slot: toHex(elem, { size: 32 }),
      explain: `Array element slot = keccak256(p) + index, with p = ${p}, index = ${arrayIndex.value}. The array length itself lives at slot p.`
    }
  } catch (e: any) {
    return { error: e?.message || 'Invalid input.' }
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Database class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Solidity Storage Slot Calculator</h1>
        <p class="text-sm text-muted-foreground">Exact slot computation for variables, mappings, and dynamic arrays</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Layout</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="k in (['simple', 'mapping', 'array'] as Kind[])"
            :key="k"
            class="px-4 py-2 rounded-lg text-sm font-semibold border capitalize transition-colors"
            :class="kind === k ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'"
            @click="kind = k"
          >
            {{ k === 'simple' ? 'Simple variable' : k === 'mapping' ? 'Mapping value' : 'Array element' }}
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="slot">Base slot p (declared position)</Label>
            <Input id="slot" v-model="slot" class="font-mono text-xs" aria-label="Base slot" />
          </div>
          <div v-if="kind === 'mapping'" class="grid gap-2">
            <Label for="ktype">Key type</Label>
            <select id="ktype" v-model="mappingKeyType" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="address">address</option>
              <option value="uint256">uint256</option>
              <option value="string">string / bytes32</option>
            </select>
          </div>
          <div v-if="kind === 'mapping'" class="grid gap-2">
            <Label for="mkey">Key value</Label>
            <Input id="mkey" v-model="mappingKey" class="font-mono text-xs" aria-label="Mapping key" />
          </div>
          <div v-if="kind === 'array'" class="grid gap-2">
            <Label for="aidx">Element index</Label>
            <Input id="aidx" v-model="arrayIndex" class="font-mono text-xs" aria-label="Array index" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card v-if="result">
      <CardContent class="pt-6 space-y-3">
        <template v-if="'slot' in result">
          <div class="flex items-center justify-between gap-3">
            <p class="font-mono text-sm font-bold break-all">{{ result.slot }}</p>
            <CopyButton :text="result.slot" variant="ghost" aria-label="Copy slot" />
          </div>
          <p class="text-xs text-muted-foreground">{{ result.explain }}</p>
        </template>
        <p v-else class="text-sm text-red-500">{{ result.error }}</p>
      </CardContent>
    </Card>
  </div>
</template>
