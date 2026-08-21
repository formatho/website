<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, FunctionSquare, AlertCircle } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { keccak256, toBytes } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Solidity Function Selector Calculator | Formatho',
  description:
    'Calculate Solidity function selectors (4-byte signatures) from function signatures using Keccak-256. Batch mode for ABI development and Foundry cast sig. 100% client-side - nothing is uploaded.',
  keywords: [
    'function selector calculator',
    'solidity selector',
    '4-byte signature',
    'keccak256 selector',
    'cast sig',
    'abi selector',
    'ethers interface id'
  ],
  ogType: 'website'
})

const input = ref('transfer(address,uint256)\napprove(address,uint256)\nbalanceOf(address)')

const copiedRow = ref<string | null>(null)
const copiedAll = ref(false)

const signatureRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*\(.*\)$/

const rows = computed(() => {
  return input.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((sig) => {
      if (!signatureRegex.test(sig)) {
        return { sig, selector: '', error: 'Invalid signature format' }
      }
      try {
        const hash = keccak256(toBytes(sig))
        return { sig, selector: hash.slice(0, 10), error: '' }
      } catch {
        return { sig, selector: '', error: 'Could not hash signature' }
      }
    })
})

const validRows = computed(() => rows.value.filter((r) => !r.error))

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedRow.value = key
    setTimeout(() => (copiedRow.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

async function copyAll() {
  const text = validRows.value.map((r) => `${r.selector}  ${r.sig}`).join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copiedAll.value = true
    setTimeout(() => (copiedAll.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FunctionSquare class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Solidity Function Selector Calculator</h1>
        <p class="text-sm text-muted-foreground">
          4-byte selectors via Keccak-256 — batch mode, all client-side
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Function signatures (one per line)</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          v-model="input"
          :rows="6"
          class="font-mono text-sm"
          placeholder="transfer(address,uint256)"
          aria-label="Function signatures"
        />
      </CardContent>
    </Card>

    <Card v-if="rows.length">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Selectors ({{ validRows.length }})</CardTitle>
        <Button v-if="validRows.length" variant="outline" size="sm" @click="copyAll">
          <Check v-if="copiedAll" class="w-4 h-4 mr-1" />
          <Copy v-else class="w-4 h-4 mr-1" />
          {{ copiedAll ? 'Copied' : 'Copy all' }}
        </Button>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div
            v-for="row in rows"
            :key="row.sig"
            class="flex items-center justify-between gap-4 p-3 border border-border rounded-lg"
          >
            <div class="min-w-0 flex-1">
              <p class="font-mono text-sm font-semibold text-primary break-all">
                {{ row.selector || '—' }}
              </p>
              <p class="font-mono text-xs text-muted-foreground truncate">{{ row.sig }}</p>
              <p v-if="row.error" class="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle class="w-3 h-3" /> {{ row.error }}
              </p>
            </div>
            <Button
              v-if="row.selector"
              variant="ghost"
              size="sm"
              :aria-label="'Copy selector for ' + row.sig"
              @click="copy(row.selector, row.sig)"
            >
              <Check v-if="copiedRow === row.sig" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
