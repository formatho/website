<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, Network } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { keccak256, toBytes, toHex } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ENS Namehash Calculator Online - Labelhash & Namehash | Formatho',
  description:
    'Calculate ENS namehash and labelhash values for any ENS name using Keccak-256, per EIP-137. See the full derivation chain node by node. 100% client-side.',
  keywords: [
    'ens namehash calculator',
    'namehash calculator',
    'labelhash',
    'eip-137 namehash',
    'ens resolution',
    'keccak256 ens'
  ],
  ogType: 'website'
})

const name = ref('vitalik.eth')
const copied = ref<string | null>(null)

const labels = computed(() => {
  const normalized = name.value
    .trim()
    .toLowerCase()
    .replace(/\.+$/, '')
    .split('.')
    .filter(Boolean)
  return normalized
})

interface NamehashStep {
  label: string
  labelhash: string
  node: string
}

const steps = computed<NamehashStep[]>(() => {
  if (labels.value.length === 0) return []
  const result: NamehashStep[] = []
  let node = new Uint8Array(32)
  try {
    for (const label of labels.value) {
      const labelHash = keccak256(toBytes(label))
      const combined = new Uint8Array([...node, ...toBytes(labelHash)])
      node = toBytes(keccak256(combined))
      result.push({ label, labelhash: labelHash, node: toHex(node) })
    }
  } catch {
    return []
  }
  return result
})

const namehash = computed(() => (steps.value.length ? steps.value[steps.value.length - 1].node : ''))

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
        <Network class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">ENS Namehash Calculator</h1>
        <p class="text-sm text-muted-foreground">
          EIP-137 namehash and labelhash derivation — all client-side
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">ENS name</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          v-model="name"
          class="font-mono"
          placeholder="vitalik.eth"
          aria-label="ENS name"
        />
      </CardContent>
    </Card>

    <Card v-if="namehash" class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Namehash</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
          <code class="font-mono text-sm font-semibold break-all">{{ namehash }}</code>
          <Button variant="ghost" size="sm" aria-label="Copy namehash" @click="copy(namehash, 'root')">
            <Check v-if="copied === 'root'" class="w-4 h-4" />
            <Copy v-else class="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="steps.length">
      <CardHeader>
        <CardTitle class="text-lg">Derivation chain (EIP-137)</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="p-3 border border-border rounded-lg space-y-2"
          >
            <div class="flex items-center justify-between gap-4">
              <p class="font-semibold text-sm">
                {{ step.label }}
                <span class="text-muted-foreground font-normal">labelhash:</span>
              </p>
              <Button variant="ghost" size="sm" :aria-label="'Copy labelhash for ' + step.label" @click="copy(step.labelhash, 'lh' + i)">
                <Check v-if="copied === 'lh' + i" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
              </Button>
            </div>
            <code class="font-mono text-xs break-all block">{{ step.labelhash }}</code>
            <p class="text-xs text-muted-foreground">node after this label:</p>
            <code class="font-mono text-xs break-all block text-muted-foreground">{{ step.node }}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
