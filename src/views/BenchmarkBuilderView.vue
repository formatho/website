<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const codeInput = ref('')
const results = ref<{ name: string; time: number; error?: string }[]>([])
const iterations = ref(1000)

const runBenchmark = async () => {
  results.value = []

  if (!codeInput.value.trim()) return

  try {
    // Create a function from the code
    const fn = new Function(
      'iterations',
      `
      const start = performance.now();
      ${codeInput.value}
      const end = performance.now();
      return end - start;
    `
    )

    // Run the benchmark
    const time = fn(iterations) as number
    results.value.push({
      name: 'Benchmark',
      time
    })
  } catch (e: any) {
    results.value.push({
      name: 'Error',
      time: 0,
      error: e.message
    })
  }
}

const runComparison = async () => {
  results.value = []

  // Split by "// ---" for multiple implementations
  const implementations = codeInput.value.split(/\/\/\s*---+\s*/).filter((s) => s.trim())

  if (implementations.length === 0) return

  for (let i = 0; i < implementations.length; i++) {
    const code = implementations[i]
    const nameMatch = code?.match(/\/\/\s*name:\s*(.+)/i)
    const name = nameMatch?.[1]?.trim() ?? `Implementation ${i + 1}`

    try {
      const fn = new Function(
        'iterations',
        `
        const start = performance.now();
        ${code}
        const end = performance.now();
        return end - start;
      `
      )

      const time = fn(iterations) as number
      results.value.push({ name, time })
    } catch (e: any) {
      results.value.push({ name, time: 0, error: e.message })
    }
  }

  // Sort by time
  results.value.sort((a, b) => a.time - b.time)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Benchmark Builder</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Code Benchmark</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Iterations</Label>
          <input
            v-model.number="iterations"
            type="number"
            aria-label="Number of iterations"
            min="1"
            class="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div class="grid gap-2">
          <Label>JavaScript Code</Label>
          <Textarea
            v-model="codeInput"
            rows="8"
            aria-label="JavaScript code to benchmark"
            placeholder="// Enter JavaScript code to benchmark
// Use 'iterations' variable for loop count
for (let i = 0; i < iterations; i++) {
  // your code here
}

// For comparison, separate implementations with // ---"
            class="font-mono text-sm"
          />
        </div>

        <div class="flex gap-2">
          <Button @click="runBenchmark" aria-label="Run performance benchmark">Run Benchmark</Button>
          <Button variant="outline" @click="runComparison" aria-label="Compare implementations">Compare Implementations</Button>
        </div>
      </CardContent>
    </Card>

    <div v-if="results.length > 0" class="space-y-2">
      <Card v-for="(result, idx) in results" :key="idx">
        <CardContent class="pt-6">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold">{{ result.name }}</div>
              <div v-if="result.error" class="text-sm text-destructive">{{ result.error }}</div>
            </div>
            <div v-if="!result.error" class="text-right">
              <div class="text-2xl font-bold font-mono">{{ result.time.toFixed(3) }} ms</div>
              <div class="text-sm text-muted-foreground">
                {{ (result.time / iterations).toFixed(6) }} ms/op
              </div>
            </div>
          </div>
          <div v-if="!result.error && results.length > 1" class="mt-2">
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all"
                :style="{ width: `${(result.time / (results[0]?.time ?? 1)) * 100}%` }"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
