<script setup lang="ts">
import { ref, computed } from 'vue'
import { Type, Copy, Check, ArrowRightLeft } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const input = ref('')
const copied = ref<string | null>(null)

const cases = computed(() => {
  const text = input.value
  if (!text) return {}

  const words = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-\s]+/g, ' ')
    .trim()
    .split(' ')
    .filter((w) => w.length > 0)

  const upperWords = words.map((w) => w.toUpperCase())
  const lowerWords = words.map((w) => w.toLowerCase())
  const titleWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  const sentenceWords = words.map((w, i) =>
    i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()
  )

  return {
    UPPERCASE: upperWords.join(' '),
    lowercase: lowerWords.join(' '),
    'Title Case': titleWords.join(' '),
    'Sentence case': sentenceWords.join(' '),
    camelCase: words
      .map((w, i) =>
        i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join(''),
    PascalCase: titleWords.join(''),
    snake_case: lowerWords.join('_'),
    SCREAMING_SNAKE: upperWords.join('_'),
    'kebab-case': lowerWords.join('-'),
    'COBOL-CASE': upperWords.join('-'),
    'Train-Case': titleWords.join('-'),
    'dot.case': lowerWords.join('.'),
    'path/case': lowerWords.join('/')
  }
})

const copyCase = (type: string) => {
  const value = cases.value[type as keyof typeof cases.value]
  if (value) {
    navigator.clipboard.writeText(value)
  }
  copied.value = type
  setTimeout(() => (copied.value = null), 2000)
}

const swapCase = () => {
  input.value = input.value
    .split('')
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('')
}

const examples = [
  'hello world',
  'HELLO WORLD',
  'HelloWorld',
  'hello_world',
  'hello-world',
  'user_id'
]
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Type class="w-8 h-8" />
          Case Converter
        </h1>
        <p class="text-muted-foreground mt-2">
          Convert text between different cases: camelCase, snake_case, kebab-case, and more.
        </p>
      </div>

      <!-- Input -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Enter text to convert</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <CodeEditor
            v-model="input"
            language="plaintext"
            class="min-h-[128px]"
            placeholder="Enter text here..."
          />

          <div class="flex gap-2 flex-wrap">
            <Button @click="swapCase" variant="outline" size="sm">
              <ArrowRightLeft class="w-4 h-4 mr-2" />
              Swap Case
            </Button>
            <span class="text-sm text-muted-foreground py-2">Examples:</span>
            <Button
              v-for="example in examples"
              :key="example"
              @click="input = example"
              variant="ghost"
              size="sm"
              class="font-mono"
            >
              {{ example }}
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Results -->
      <Card v-if="Object.keys(cases).length > 0">
        <CardHeader>
          <CardTitle>Converted Cases</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div
            v-for="(value, type) in cases"
            :key="type"
            class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
          >
            <div class="flex-1">
              <div class="text-sm text-muted-foreground mb-1">{{ type }}</div>
              <div class="font-mono">{{ value }}</div>
            </div>
            <Button @click="copyCase(type)" variant="ghost" size="sm">
              <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div v-else class="text-center py-16 text-muted-foreground">
        <Type class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Enter text above to see case conversions</p>
      </div>
    </div>
  </div>
</template>
