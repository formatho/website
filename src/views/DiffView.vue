<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import * as Diff from 'diff'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useTwins } from '@/composables/useTwins'

const { summonTwin } = useTwins()

const originalText = ref('')
const modifiedText = ref('')
const diffResult = ref<any[]>([])

const computeDiff = () => {
  if (!originalText.value && !modifiedText.value) {
    diffResult.value = []
    return
  }
  const diffs = Diff.diffLines(originalText.value, modifiedText.value)
  diffResult.value = diffs
  
  // Summon Flowtho when diff is computed (both inputs have content)
  if (originalText.value && modifiedText.value) {
    summonTwin('flowtho', 'Process flows perfectly. Diff computed.', 'diff-success', {
      x: 'right',
      y: 'bottom'
    })
  }
}

watch([originalText, modifiedText], computeDiff)

const processedLines = computed(() => {
  const lines: { type: 'added' | 'removed' | 'unchanged'; value: string }[] = []

  diffResult.value.forEach((part) => {
    const split = part.value.split('\n')
    // If the part ends with a newline, split() creates an empty string at the end.
    // We remove it because the newline is the separator for the previous line.
    if (part.value.endsWith('\n')) {
      split.pop()
    }

    split.forEach((line: string) => {
      lines.push({
        type: part.added ? 'added' : part.removed ? 'removed' : 'unchanged',
        value: line
      })
    })
  })

  return lines
})

const fillSample = () => {
  originalText.value = `Hello World
This is a test file.
It has some lines.
Some deleted lines.
Unchanged footer.`
  modifiedText.value = `Hello World!
This is a test file.
It has changed lines.
New added lines.
Unchanged footer.`
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Diff Checker</h1>
      <Button variant="ghost" @click="fillSample" aria-label="Load sample diff comparison data">Load Sample</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Inputs Column -->
      <div class="flex flex-col gap-4 min-h-0">
        <Card class="flex-1 flex flex-col min-h-0">
          <CardHeader class="py-2">
            <CardTitle class="text-sm font-medium">Original Text</CardTitle>
          </CardHeader>
          <CardContent class="flex-1 min-h-0">
            <CodeEditor
              v-model="originalText"
              language="plaintext"
              min-height="200px"
              :line-numbers="'on'"
            />
          </CardContent>
        </Card>

        <Card class="flex-1 flex flex-col min-h-0">
          <CardHeader class="py-2">
            <CardTitle class="text-sm font-medium">Modified Text</CardTitle>
          </CardHeader>
          <CardContent class="flex-1 min-h-0">
            <CodeEditor
              v-model="modifiedText"
              language="plaintext"
              min-height="200px"
              :line-numbers="'on'"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Result Column -->
      <Card class="flex flex-col min-h-0 bg-background/50">
        <CardHeader class="py-2">
          <CardTitle class="text-sm font-medium">Difference</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto p-0">
          <div class="font-mono text-sm w-full min-w-max">
            <div
              v-for="(line, index) in processedLines"
              :key="index"
              class="flex w-full px-4 py-0.5 whitespace-pre"
              :class="{
                'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300': line.type === 'added',
                'bg-red-500/20 text-red-800 dark:text-red-300': line.type === 'removed',
                'text-muted-foreground': line.type === 'unchanged'
              }"
            >
              <span class="select-none w-6 inline-block opacity-50">{{
                line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '
              }}</span>
              <span>{{ line.value }}</span>
            </div>
            <!-- Show placeholder if empty -->
            <div
              v-if="processedLines.length === 0"
              class="p-4 text-muted-foreground italic text-center"
            >
              Enter text to see differences
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
