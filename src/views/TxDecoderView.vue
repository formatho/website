<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { FileSearch, AlertCircle } from 'lucide-vue-next'
import { parseTransaction, type TransactionSerializable } from 'viem'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Ethereum Transaction Decoder - Raw Tx Hex | Formatho',
  description:
    'Decode a raw signed Ethereum transaction (legacy, EIP-1559, EIP-2930, EIP-4844): type, nonce, gas, to, value, calldata selector, and signature fields. 100% client-side.',
  keywords: ['ethereum transaction decoder', 'raw transaction decoder', 'decode signed tx hex', 'eip1559 transaction decode', 'tx hex decoder', 'eth transaction parse'],
  ogType: 'website'
})

const rawTx = ref('')
const error = ref('')
const decoded = ref<{ fields: [string, string][]; selector: string } | null>(null)

function decode() {
  error.value = ''
  decoded.value = null
  const hex = rawTx.value.trim()
  if (!hex.startsWith('0x') || hex.length < 10) {
    error.value = 'Paste a raw signed transaction: 0x-prefixed RLP hex from a wallet or broadcast.'
    return
  }
  try {
    const tx = parseTransaction(hex as `0x${string}`) as Record<string, unknown> & { to?: string; data?: string }
    const skip = new Set(['sidecars', 'yParity'])
    const fields: [string, string][] = []
    let selector = ''
    for (const [k, v] of Object.entries(tx)) {
      if (skip.has(k) || v === undefined) continue
      let display: string
      if (typeof v === 'bigint') display = v.toString()
      else if (typeof v === 'boolean' || typeof v === 'number') display = String(v)
      else if (typeof v === 'string') display = v
      else display = JSON.stringify(v)
      fields.push([k, display])
      if (k === 'data' && typeof v === 'string' && v.length >= 10) selector = v.slice(0, 10)
    }
    decoded.value = { fields, selector }
  } catch (e: any) {
    error.value = e?.message?.slice(0, 200) || 'Could not parse — not a valid signed transaction.'
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FileSearch class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Ethereum Transaction Decoder</h1>
        <p class="text-sm text-muted-foreground">Raw signed tx hex → typed fields, decoded locally (legacy / 1559 / 2930 / 4844)</p>
      </div>
    </div>

    <Card class="mb-6">
      <CardContent class="space-y-4 pt-6">
        <div class="grid gap-2">
          <Label for="rawtx">Raw transaction (RLP hex)</Label>
          <Textarea id="rawtx" v-model="rawTx" :rows="5" class="font-mono text-xs" placeholder="0x02f8b30101…" aria-label="Raw transaction hex" />
        </div>
        <Button class="w-full" @click="decode">Decode transaction</Button>
        <p v-if="error" class="text-sm text-red-500 flex items-start gap-1">
          <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="decoded">
      <CardHeader><CardTitle class="text-lg">Decoded transaction</CardTitle></CardHeader>
      <CardContent class="space-y-2">
        <div v-for="[k, v] in decoded.fields" :key="k" class="flex items-start justify-between gap-3 p-3 border border-border rounded-lg">
          <div class="min-w-0">
            <p class="text-xs text-muted-foreground font-mono">{{ k }}</p>
            <p class="font-mono text-sm break-all">{{ v }}</p>
            <p v-if="k === 'data' && decoded.selector" class="text-xs text-primary mt-1">
              calldata selector: {{ decoded.selector }} — decode the arguments in the Calldata Decoder
            </p>
          </div>
          <CopyButton v-if="v.length > 12" :text="v" variant="ghost" :aria-label="'Copy ' + k" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
