<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const numberInput = ref('')
const romanOutput = ref('')
const romanInput = ref('')
const numberOutput = ref<number | null>(null)
const error = ref('')

const intToRoman = (num: number): string => {
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  let roman = ''
  let i = 0
  while (num > 0) {
    const currentVal = val[i] ?? 1
    const currentSym = syms[i] ?? 'I'
    const div = Math.floor(num / currentVal)
    num = num % currentVal
    roman += currentSym.repeat(div)
    i++
  }
  return roman
}

const romanToInt = (s: string): number => {
  const map: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let result = 0
  for (let i = 0; i < s.length; i++) {
    const current = map[s[i] ?? ''] ?? 0
    const next = map[s[i + 1] ?? ''] ?? 0
    if (next && current < next) {
      result += next - current
      i++
    } else {
      result += current
    }
  }
  return result
}

const convertToRoman = () => {
  error.value = ''
  const num = parseInt(numberInput.value, 10)
  if (isNaN(num) || num < 1 || num > 3999) {
    error.value = 'Please enter a number between 1 and 3999'
    romanOutput.value = ''
    return
  }
  romanOutput.value = intToRoman(num)
}

const convertToNumber = () => {
  error.value = ''
  if (!romanInput.value) {
    error.value = 'Please enter a Roman numeral'
    numberOutput.value = null
    return
  }
  const roman = romanInput.value.toUpperCase().trim()
  if (!/^[MDCLXVI]+$/.test(roman)) {
    error.value = 'Invalid Roman numeral characters'
    numberOutput.value = null
    return
  }
  numberOutput.value = romanToInt(roman)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Roman Numeral Converter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Number to Roman</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Number (1-3999)</Label>
            <Input
              v-model="numberInput"
              type="number"
              min="1"
              max="3999"
              placeholder="Enter number..."
            />
          </div>
          <Button @click="convertToRoman" class="w-full" aria-label="Convert number to Roman numeral">Convert</Button>
          <div v-if="romanOutput" class="p-4 rounded-lg bg-muted">
            <div class="text-sm text-muted-foreground mb-1">Roman Numeral</div>
            <div class="text-3xl font-bold font-mono">{{ romanOutput }}</div>
          </div>
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Roman to Number</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 space-y-4">
          <div class="grid gap-2">
            <Label>Roman Numeral</Label>
            <Input
              v-model="romanInput"
              placeholder="Enter Roman numeral (e.g., XIV)..."
              class="uppercase"
            />
          </div>
          <Button @click="convertToNumber" class="w-full" aria-label="Convert Roman numeral to number">Convert</Button>
          <div v-if="numberOutput !== null" class="p-4 rounded-lg bg-muted">
            <div class="text-sm text-muted-foreground mb-1">Number</div>
            <div class="text-3xl font-bold">{{ numberOutput }}</div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
