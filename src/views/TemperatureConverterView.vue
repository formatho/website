<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputValue = ref('')
const fromUnit = ref('celsius')
const toUnit = ref('fahrenheit')

const conversions: Record<string, (c: number) => number> = {
  celsius: (c) => c,
  fahrenheit: (c) => (c * 9) / 5 + 32,
  kelvin: (c) => c + 273.15,
  rankine: (c) => ((c + 273.15) * 9) / 5
}

const reverseConversions: Record<string, (n: number) => number> = {
  celsius: (n) => n,
  fahrenheit: (f) => ((f - 32) * 5) / 9,
  kelvin: (k) => k - 273.15,
  rankine: (r) => (r / 9) * 5 - 273.15
}

const result = computed(() => {
  const value = parseFloat(inputValue.value)
  if (isNaN(value)) return null

  // Convert to Celsius first, then to target unit
  const celsius = (reverseConversions[fromUnit.value] ?? ((n: number) => n))(value)
  return (conversions[toUnit.value] ?? ((c: number) => c))(celsius)
})

const units = [
  { value: 'celsius', label: 'Celsius (°C)' },
  { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
  { value: 'kelvin', label: 'Kelvin (K)' },
  { value: 'rankine', label: 'Rankine (°R)' }
]
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Temperature Converter</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Convert Temperature</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div class="grid gap-2">
            <Label>From</Label>
            <select
              v-model="fromUnit"
              aria-label="Convert from unit"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option v-for="unit in units" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Value</Label>
            <Input v-model="inputValue" type="number" aria-label="Temperature value" placeholder="Enter temperature..." />
          </div>
          <div class="grid gap-2">
            <Label>To</Label>
            <select
              v-model="toUnit"
              aria-label="Convert to unit"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option v-for="unit in units" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card v-if="result !== null">
      <CardContent class="pt-6 text-center">
        <div class="text-sm text-muted-foreground">Result</div>
        <div class="text-5xl font-bold">{{ result.toFixed(2) }}°</div>
        <div class="text-lg text-muted-foreground mt-2">
          {{ units.find((u) => u.value === toUnit)?.label }}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Common Conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Water Freezing</div>
            <div>0°C = 32°F = 273.15K</div>
          </div>
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Room Temperature</div>
            <div>20°C = 68°F = 293.15K</div>
          </div>
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Body Temperature</div>
            <div>37°C = 98.6°F = 310.15K</div>
          </div>
          <div class="p-3 rounded bg-muted">
            <div class="font-semibold">Water Boiling</div>
            <div>100°C = 212°F = 373.15K</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
