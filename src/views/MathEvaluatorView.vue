<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calculator, Copy, Check, Trash2 } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const expression = ref('')
const history = ref<Array<{ expr: string; result: string }>>([])
const copied = ref(false)

const evaluateExpression = (expr: string): string => {
  try {
    // Create a safe evaluation context
    const mathFunctions = {
      abs: Math.abs,
      ceil: Math.ceil,
      floor: Math.floor,
      round: Math.round,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      pow: Math.pow,
      log: Math.log,
      log10: Math.log10,
      log2: Math.log2,
      exp: Math.exp,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      asin: Math.asin,
      acos: Math.acos,
      atan: Math.atan,
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      PI: Math.PI,
      E: Math.E
    }

    // Replace math functions
    let processed = expr
    for (const name of Object.keys(mathFunctions)) {
      const regex = new RegExp(name, 'gi')
      processed = processed.replace(regex, `Math.${name}`)
    }

    // Replace ^ with **
    processed = processed.replace(/\^/g, '**')

    // Evaluate
    const result = Function(`"use strict"; return (${processed})`)()

    if (typeof result === 'number' && !isNaN(result)) {
      // Round to avoid floating point issues
      return Number.isInteger(result) ? result.toString() : result.toFixed(10).replace(/\.?0+$/, '')
    }

    return 'Error'
  } catch {
    return 'Error'
  }
}

const result = computed(() => {
  if (!expression.value.trim()) return ''
  return evaluateExpression(expression.value)
})

const addToHistory = () => {
  if (expression.value && result.value && result.value !== 'Error') {
    history.value.unshift({
      expr: expression.value,
      result: result.value
    })
    if (history.value.length > 10) {
      history.value.pop()
    }
  }
}

const copyResult = () => {
  navigator.clipboard.writeText(result.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const insertChar = (char: string) => {
  expression.value += char
}

const clearExpression = () => {
  expression.value = ''
}

const backspace = () => {
  expression.value = expression.value.slice(0, -1)
}

const useHistoryItem = (item: { expr: string; result: string }) => {
  expression.value = item.expr
}

const buttons = [
  ['7', '8', '9', '/', '(', ')'],
  ['4', '5', '6', '*', 'PI', 'E'],
  ['1', '2', '3', '-', 'sqrt(', 'pow('],
  ['0', '.', '%', '+', '^', 'abs(']
]

const functions = [
  'sin(',
  'cos(',
  'tan(',
  'log(',
  'log10(',
  'log2(',
  'ceil(',
  'floor(',
  'round(',
  'exp(',
  'cbrt(',
  'min('
]
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Calculator class="w-8 h-8" />
          Math Evaluator
        </h1>
        <p class="text-muted-foreground mt-2">
          Evaluate mathematical expressions with support for functions and constants.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calculator -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle>Expression</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Input -->
            <div class="relative">
              <input
                v-model="expression"
                @keyup.enter="addToHistory"
                type="text"
                placeholder="Enter expression..."
                class="w-full px-3 py-4 border rounded-lg font-mono text-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button @click="backspace" variant="ghost" size="sm">←</Button>
                <Button @click="clearExpression" variant="ghost" size="sm" aria-label="Clear expression">
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <!-- Result -->
            <div class="p-4 bg-surface-hover rounded-lg border">
              <div class="text-sm text-muted-foreground mb-1">Result</div>
              <div class="font-mono text-3xl font-bold flex items-center justify-between">
                <span>{{ result || '—' }}</span>
                <Button
                  v-if="result && result !== 'Error'"
                  @click="copyResult"
                  variant="ghost"
                  size="sm"
                >
                  <component :is="copied ? Check : Copy" class="w-5 h-5" />
                </Button>
              </div>
            </div>

            <!-- Calculator Buttons -->
            <div class="space-y-2">
              <div v-for="row in buttons" :key="row.join()" class="flex gap-2">
                <Button
                  v-for="btn in row"
                  :key="btn"
                  @click="insertChar(btn)"
                  variant="outline"
                  class="flex-1 h-12 text-lg font-mono"
                >
                  {{ btn }}
                </Button>
              </div>
              <Button @click="addToHistory" class="w-full h-12"> = Calculate </Button>
            </div>

            <!-- Functions -->
            <div>
              <div class="text-sm text-muted-foreground mb-2">Functions</div>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="fn in functions"
                  :key="fn"
                  @click="insertChar(fn)"
                  variant="outline"
                  size="sm"
                  class="font-mono"
                >
                  {{ fn }}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- History -->
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Recent calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="history.length > 0" class="space-y-2">
              <Button
                v-for="(item, index) in history"
                :key="index"
                @click="useHistoryItem(item)"
                variant="ghost"
                class="w-full p-4 h-auto bg-surface-hover rounded-lg border text-left hover:bg-surface transition-colors flex-col items-start"
              >
                <div class="font-mono text-sm text-muted-foreground">{{ item.expr }}</div>
                <div class="font-mono text-lg font-bold">= {{ item.result }}</div>
              </Button>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              <Calculator class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p class="text-sm">No calculations yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
