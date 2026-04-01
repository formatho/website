<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAddress, isAddress } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'

const address = ref('')

const validationResult = computed(() => {
  if (!address.value) return { status: 'empty', checksum: '' }

  if (isAddress(address.value)) {
    return {
      status: 'valid',
      checksum: getAddress(address.value)
    }
  }

  return { status: 'invalid', checksum: '' }
})

const copyChecksum = () => {
  if (validationResult.value.status === 'valid') {
    navigator.clipboard.writeText(validationResult.value.checksum)
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Address Checksum</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Label>Ethereum Address</Label>
          <Input
            v-model="address"
            placeholder="0x..."
            aria-label="Ethereum address input"
            class="font-mono"
            :class="{
              'border-green-500': validationResult.status === 'valid',
              'border-destructive': validationResult.status === 'invalid'
            }"
          />
          <div v-if="validationResult.status === 'invalid'" class="text-xs text-destructive">
            Invalid Ethereum Address
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Checksum Address (EIP-55)</Label>
            <div class="flex gap-2 relative">
              <Input readonly :value="validationResult.checksum" class="font-mono" />
              <Button
                variant="ghost"
                size="icon"
                @click="copyChecksum" aria-label="Copy checksummed address"
                :disabled="validationResult.status !== 'valid'"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
