<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const json1 = ref('')
const json2 = ref('')
const diffResult = ref('')

interface DiffEntry {
  path: string
  type: 'added' | 'removed' | 'changed'
  oldValue?: any
  newValue?: any
}

const compareJson = (obj1: any, obj2: any, path = ''): DiffEntry[] => {
  const diffs: DiffEntry[] = []

  if (typeof obj1 !== typeof obj2) {
    diffs.push({ path, type: 'changed', oldValue: obj1, newValue: obj2 })
    return diffs
  }

  if (obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      diffs.push({ path, type: 'changed', oldValue: obj1, newValue: obj2 })
    }
    return diffs
  }

  if (typeof obj1 !== 'object') {
    if (obj1 !== obj2) {
      diffs.push({ path, type: 'changed', oldValue: obj1, newValue: obj2 })
    }
    return diffs
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = new Set([...keys1, ...keys2])

  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key

    if (!(key in obj1)) {
      diffs.push({ path: newPath, type: 'added', newValue: obj2[key] })
    } else if (!(key in obj2)) {
      diffs.push({ path: newPath, type: 'removed', oldValue: obj1[key] })
    } else {
      diffs.push(...compareJson(obj1[key], obj2[key], newPath))
    }
  }

  return diffs
}

const compare = () => {
  try {
    const parsed1 = JSON.parse(json1.value)
    const parsed2 = JSON.parse(json2.value)
    const diffs = compareJson(parsed1, parsed2)

    if (diffs.length === 0) {
      diffResult.value = '✓ JSON objects are identical'
    } else {
      diffResult.value = diffs
        .map((d) => {
          if (d.type === 'added') {
            return `+ ${d.path}: ${JSON.stringify(d.newValue)}`
          } else if (d.type === 'removed') {
            return `- ${d.path}: ${JSON.stringify(d.oldValue)}`
          } else {
            return `~ ${d.path}: ${JSON.stringify(d.oldValue)} → ${JSON.stringify(d.newValue)}`
          }
        })
        .join('\n')
    }
  } catch (e: any) {
    diffResult.value = `Error: ${e.message}`
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON Diff</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>JSON 1</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="json1"
            language="json"
            class="h-full"
            placeholder="Enter first JSON..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>JSON 2</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="json2"
            language="json"
            class="h-full"
            placeholder="Enter second JSON..."
          />
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Button @click="compare" class="w-full md:w-auto" aria-label="Compare JSON documents">Compare</Button>
        <div
          v-if="diffResult"
          class="p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap"
        >
          {{ diffResult }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
