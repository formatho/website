<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Hammer, AlertCircle } from 'lucide-vue-next'
import { getContractAddress, keccak256, toBytes } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Create2 Address Calculator Online | Formatho',
  description:
    'Compute the deterministic CREATE2 contract address from factory, salt, and init code hash (keccak256 of creation code). Supports 0x salts and plain strings. 100% client-side.',
  keywords: ['create2 address calculator', 'create2 calculator', 'deterministic deployment address', 'create2 address formula', 'init code hash calculator'],
  ogType: 'website'
})

const factory = ref('0x4e59b44847b379578588920cA78FbF26c0B4956C')
const salt = ref('my-salt')
const initCodeHash = ref('')

const computedAddress = computed(() => {
  try {
    const f = factory.value.trim() as `0x${string}`
    if (!/^0x[0-9a-fA-F]{40}$/.test(f)) throw new Error('Factory must be a 20-byte address.')

    // salt: 0x-hex (32 bytes) or arbitrary string -> keccak
    let saltBytes: `0x${string}`
    const s = salt.value.trim()
    if (/^0x[0-9a-fA-F]{0,64}$/.test(s) && (s.length - 2) % 2 === 0) {
      const hex = s.slice(2).padStart(64, '0')
      saltBytes = ('0x' + hex) as `0x${string}`
    } else if (s) {
      saltBytes = keccak256(toBytes(s))
    } else {
      saltBytes = '0x' + '0'.repeat(64)
    }

    // init code hash: 32-byte hex, or compute from pasted code
    let h = initCodeHash.value.trim() as `0x${string}`
    if (/^0x[0-9a-fA-F]+$/.test(h) && h.length > 66) {
      h = keccak256(toBytes(h))
    } else if (!/^0x[0-9a-fA-F]{64}$/.test(h)) {
      throw new Error('Init code hash must be 32 bytes (0x + 64 hex), or paste the full init code and it will be hashed.')
    }

    const addr = getContractAddress({
      opcode: 'CREATE2',
      from: f,
      salt: saltBytes,
      bytecodeHash: h
    })
    return { addr, saltBytes, hashUsed: h }
  } catch {
    return null
  }
})

const computedError = computed(() => {
  const validInputs =
    /^0x[0-9a-fA-F]{40}$/.test(factory.value.trim()) &&
    (initCodeHash.value.trim().length > 0)
  if (!computedAddress.value && validInputs) return 'Init code hash must be 32 bytes (0x + 64 hex), or paste full init code.'
  if (!computedAddress.value && !/^0x[0-9a-fA-F]{40}$/.test(factory.value.trim())) return 'Factory must be a 20-byte address.'
  if (!computedAddress.value) return 'Init code hash must be 32 bytes (0x + 64 hex), or paste the full init code.'
  return ''
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Hammer class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">CREATE2 Address Calculator</h1>
        <p class="text-sm text-muted-foreground">factory + salt + keccak(init code) → deterministic address, computed locally</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Inputs</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label for="factory">Factory address (deployer)</Label>
          <Input id="factory" v-model="factory" class="font-mono text-xs" aria-label="Factory address" />
        </div>
        <div class="grid gap-2">
          <Label for="salt">Salt (0x 32-byte hex, or any string — keccak-hashed to 32 bytes)</Label>
          <Input id="salt" v-model="salt" class="font-mono text-xs" aria-label="Salt" />
        </div>
        <div class="grid gap-2">
          <Label for="ich">Init code hash (32 bytes) — or paste the full init code and it is hashed</Label>
          <Input id="ich" v-model="initCodeHash" class="font-mono text-xs" placeholder="0x…64 hex chars, or full creation code" aria-label="Init code hash or code" />
        </div>
        <p class="text-xs text-muted-foreground">
          address = keccak256(0xff ‖ factory ‖ salt ‖ keccak256(initCode))[12:]
        </p>
      </CardContent>
    </Card>

    <p v-if="computedError" class="text-sm text-red-500 flex items-center gap-1 mb-4">
      <AlertCircle class="w-4 h-4 shrink-0" /> {{ computedError }}
    </p>

    <Card v-if="computedAddress" class="border-primary/30">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">CREATE2 address</CardTitle>
        <CopyButton :text="computedAddress.addr" aria-label="Copy address" />
      </CardHeader>
      <CardContent class="space-y-2">
        <p class="font-mono text-lg font-bold break-all">{{ computedAddress.addr }}</p>
        <div class="text-xs text-muted-foreground font-mono space-y-1 pt-2 border-t border-border">
          <p>salt used: {{ computedAddress.saltBytes }}</p>
          <p>hash used: {{ computedAddress.hashUsed }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
