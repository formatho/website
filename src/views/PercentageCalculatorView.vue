<script setup lang="ts">
import { ref, computed } from 'vue'
import { Percent, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Type 1: What is X% of Y?
const percent1 = ref('')
const value1 = ref('')

// Type 2: X is what % of Y?
const value2a = ref('')
const value2b = ref('')

// Type 3: X is Y% of what?
const value3a = ref('')
const value3b = ref('')

// Type 4: Percentage increase/decrease
const fromValue = ref('')
const toValue = ref('')

const copied = ref<string | null>(null)

const result1 = computed(() => {
  if (!percent1.value || !value1.value) return null
  return (parseFloat(percent1.value) / 100) * parseFloat(value1.value)
})

const result2 = computed(() => {
  if (!value2a.value || !value2b.value) return null
  return (parseFloat(value2a.value) / parseFloat(value2b.value)) * 100
})

const result3 = computed(() => {
  if (!value3a.value || !value3b.value) return null
  return parseFloat(value3a.value) / (parseFloat(value3b.value) / 100)
})

const result4 = computed(() => {
  if (!fromValue.value || !toValue.value) return null
  const from = parseFloat(fromValue.value)
  const to = parseFloat(toValue.value)
  return ((to - from) / from) * 100
})

const copyResult = (id: string, value: number) => {
  navigator.clipboard.writeText(value.toFixed(2))
  copied.value = id
  setTimeout(() => (copied.value = null), 2000)
}

const formatNumber = (num: number) => {
  return num.toFixed(2)
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Percent class="w-8 h-8" />
          Percentage Calculator
        </h1>
        <p class="text-muted-foreground mt-2">
          Calculate percentages, percentage change, and more.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Type 1 -->
        <Card>
          <CardHeader>
            <CardTitle>What is X% of Y?</CardTitle>
            <CardDescription>Find a percentage of a value</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm mb-2">Percentage</label>
                <div class="relative">
                  <input
                    v-model="percent1"
                    type="number"
                    placeholder="25"
                    class="w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >%</span
                  >
                </div>
              </div>
              <div class="text-lg font-bold mb-2">of</div>
              <div class="flex-1">
                <label class="block text-sm mb-2">Value</label>
                <input
                  v-model="value1"
                  type="number"
                  placeholder="200"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div
              v-if="result1 !== null"
              class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
            >
              <div>
                <div class="text-sm text-muted-foreground">Result</div>
                <div class="text-2xl font-bold">{{ formatNumber(result1) }}</div>
              </div>
              <Button @click="copyResult('1', result1)" variant="ghost" size="sm" aria-label="Copy result">
                <component :is="copied === '1' ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Type 2 -->
        <Card>
          <CardHeader>
            <CardTitle>X is what % of Y?</CardTitle>
            <CardDescription>Find what percentage one value is of another</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm mb-2">Value</label>
                <input
                  v-model="value2a"
                  type="number"
                  placeholder="50"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="text-lg font-bold mb-2">is what % of</div>
              <div class="flex-1">
                <label class="block text-sm mb-2">Total</label>
                <input
                  v-model="value2b"
                  type="number"
                  placeholder="200"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div
              v-if="result2 !== null"
              class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
            >
              <div>
                <div class="text-sm text-muted-foreground">Result</div>
                <div class="text-2xl font-bold">{{ formatNumber(result2) }}%</div>
              </div>
              <Button @click="copyResult('2', result2)" variant="ghost" size="sm" aria-label="Copy result">
                <component :is="copied === '2' ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Type 3 -->
        <Card>
          <CardHeader>
            <CardTitle>X is Y% of what?</CardTitle>
            <CardDescription>Find the original value</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm mb-2">Value</label>
                <input
                  v-model="value3a"
                  type="number"
                  placeholder="50"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="text-lg font-bold mb-2">is</div>
              <div class="flex-1">
                <label class="block text-sm mb-2">Percentage</label>
                <div class="relative">
                  <input
                    v-model="value3b"
                    type="number"
                    placeholder="25"
                    class="w-full px-3 py-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >%</span
                  >
                </div>
              </div>
            </div>

            <div
              v-if="result3 !== null"
              class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
            >
              <div>
                <div class="text-sm text-muted-foreground">Result</div>
                <div class="text-2xl font-bold">{{ formatNumber(result3) }}</div>
              </div>
              <Button @click="copyResult('3', result3)" variant="ghost" size="sm" aria-label="Copy result">
                <component :is="copied === '3' ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Type 4 -->
        <Card>
          <CardHeader>
            <CardTitle>Percentage Change</CardTitle>
            <CardDescription>Calculate percentage increase or decrease</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm mb-2">From</label>
                <input
                  v-model="fromValue"
                  type="number"
                  placeholder="100"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="text-lg font-bold mb-2">→</div>
              <div class="flex-1">
                <label class="block text-sm mb-2">To</label>
                <input
                  v-model="toValue"
                  type="number"
                  placeholder="150"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div
              v-if="result4 !== null"
              class="p-4 bg-surface-hover rounded-lg border flex items-center justify-between"
            >
              <div>
                <div class="text-sm text-muted-foreground">Change</div>
                <div
                  class="text-2xl font-bold"
                  :class="result4 >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ result4 >= 0 ? '+' : '' }}{{ formatNumber(result4) }}%
                </div>
              </div>
              <Button @click="copyResult('4', result4)" variant="ghost" size="sm" aria-label="Copy result">
                <component :is="copied === '4' ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
