<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const decimalValue = ref('')
const binaryValue = ref('')
const octalValue = ref('')
const hexadecimalValue = ref('')

const updateFromDecimal = () => {
  const num = parseInt(decimalValue.value, 10)
  if (isNaN(num)) {
    binaryValue.value = ''
    octalValue.value = ''
    hexadecimalValue.value = ''
    return
  }
  binaryValue.value = num.toString(2)
  octalValue.value = num.toString(8)
  hexadecimalValue.value = num.toString(16).toUpperCase()
}

const updateFromBinary = () => {
  const num = parseInt(binaryValue.value, 2)
  if (isNaN(num)) {
    decimalValue.value = ''
    octalValue.value = ''
    hexadecimalValue.value = ''
    return
  }
  decimalValue.value = num.toString(10)
  octalValue.value = num.toString(8)
  hexadecimalValue.value = num.toString(16).toUpperCase()
}

const updateFromOctal = () => {
  const num = parseInt(octalValue.value, 8)
  if (isNaN(num)) {
    decimalValue.value = ''
    binaryValue.value = ''
    hexadecimalValue.value = ''
    return
  }
  decimalValue.value = num.toString(10)
  binaryValue.value = num.toString(2)
  hexadecimalValue.value = num.toString(16).toUpperCase()
}

const updateFromHex = () => {
  const num = parseInt(hexadecimalValue.value, 16)
  if (isNaN(num)) {
    decimalValue.value = ''
    binaryValue.value = ''
    octalValue.value = ''
    return
  }
  decimalValue.value = num.toString(10)
  binaryValue.value = num.toString(2)
  octalValue.value = num.toString(8)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Integer Base Converter</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Convert Between Bases</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Decimal (base 10)</Label>
            <Input
              v-model="decimalValue"
              @input="updateFromDecimal"
              aria-label="Decimal number input"
              placeholder="Enter decimal number..."
              class="font-mono"
            />
          </div>
          <div class="grid gap-2">
            <Label>Binary (base 2)</Label>
            <Input
              v-model="binaryValue"
              @input="updateFromBinary"
              aria-label="Binary number input"
              placeholder="Enter binary number..."
              class="font-mono"
            />
          </div>
          <div class="grid gap-2">
            <Label>Octal (base 8)</Label>
            <Input
              v-model="octalValue"
              @input="updateFromOctal"
              aria-label="Octal number input"
              placeholder="Enter octal number..."
              class="font-mono"
            />
          </div>
          <div class="grid gap-2">
            <Label>Hexadecimal (base 16)</Label>
            <Input
              v-model="hexadecimalValue"
              @input="updateFromHex"
              aria-label="Hexadecimal number input"
              placeholder="Enter hex number..."
              class="font-mono"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
