<script setup lang="ts">
import { ref, computed } from 'vue'
import { parseUnits, formatUnits } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'

const textValue = ref('1.5')
const selectedUnit = ref<'ether' | 'gwei' | 'wei'>('ether')

const computedValues = computed(() => {
  try {
    if (!textValue.value) return { ether: '', gwei: '', wei: '' }

    // Convert to Wei first as base
    let weiValue: bigint
    if (selectedUnit.value === 'ether') {
      weiValue = parseUnits(textValue.value, 18)
    } else if (selectedUnit.value === 'gwei') {
      weiValue = parseUnits(textValue.value, 9)
    } else {
      weiValue = BigInt(textValue.value)
    }

    return {
      ether: formatUnits(weiValue, 18),
      gwei: formatUnits(weiValue, 9),
      wei: weiValue.toString()
    }
  } catch (e) {
    return { ether: 'Invalid Input', gwei: 'Invalid Input', wei: 'Invalid Input' }
  }
})

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">EVM Unit Converter</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Value</Label>
            <Input v-model="textValue" placeholder="Enter value..." aria-label="Value to convert" />
          </div>
          <div class="space-y-2">
            <Label>Unit</Label>
            <div class="flex gap-2">
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'ether' }"
                @click="selectedUnit = 'ether'"
                aria-label="Select Ether unit"
              >
                Ether
              </Button>
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'gwei' }"
                @click="selectedUnit = 'gwei'"
                aria-label="Select Gwei unit"
              >
                Gwei
              </Button>
              <Button
                variant="outline"
                :class="{ 'bg-primary text-primary-foreground': selectedUnit === 'wei' }"
                @click="selectedUnit = 'wei'"
                aria-label="Select Wei unit"
              >
                Wei
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Converted Values</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Ether (10^18 Wei)</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.ether" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.ether)" aria-label="Copy Ether value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Gwei (10^9 Wei)</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.gwei" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.gwei)" aria-label="Copy Gwei value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Wei</Label>
            <div class="flex gap-2">
              <Input readonly :value="computedValues.wei" />
              <Button variant="ghost" size="icon" @click="copyToClipboard(computedValues.wei)" aria-label="Copy Wei value">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
