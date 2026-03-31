<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'

const inputText = ref('')

interface Stats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  averageWordLength: number
  averageSentenceLength: number
  readingTime: number
  speakingTime: number
}

const stats = computed<Stats>(() => {
  const text = inputText.value

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length
  const lines = text.split('\n').length

  const wordList = text.trim() ? text.trim().split(/\s+/) : []
  const totalWordLength = wordList.reduce((sum, word) => sum + word.length, 0)
  const averageWordLength = words > 0 ? totalWordLength / words : 0

  const averageSentenceLength = sentences > 0 ? words / sentences : 0

  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(words / 200)
  // Average speaking speed: 150 words per minute
  const speakingTime = Math.ceil(words / 150)

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    averageWordLength,
    averageSentenceLength,
    readingTime,
    speakingTime
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Text Statistics</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="inputText"
            language="plaintext"
            class="h-full"
            placeholder="Enter or paste text here..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-y-auto">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Characters</div>
              <div class="text-2xl font-bold">{{ stats.characters.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Characters (no spaces)</div>
              <div class="text-2xl font-bold">{{ stats.charactersNoSpaces.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Words</div>
              <div class="text-2xl font-bold">{{ stats.words.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Sentences</div>
              <div class="text-2xl font-bold">{{ stats.sentences.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Paragraphs</div>
              <div class="text-2xl font-bold">{{ stats.paragraphs.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Lines</div>
              <div class="text-2xl font-bold">{{ stats.lines.toLocaleString() }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Avg Word Length</div>
              <div class="text-2xl font-bold">{{ stats.averageWordLength.toFixed(1) }}</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Avg Sentence Length</div>
              <div class="text-2xl font-bold">
                {{ stats.averageSentenceLength.toFixed(1) }} words
              </div>
            </div>
            <div class="p-4 rounded-lg bg-muted col-span-2">
              <div class="text-sm text-muted-foreground">Reading Time</div>
              <div class="text-2xl font-bold">{{ stats.readingTime }} min</div>
            </div>
            <div class="p-4 rounded-lg bg-muted col-span-2">
              <div class="text-sm text-muted-foreground">Speaking Time</div>
              <div class="text-2xl font-bold">{{ stats.speakingTime }} min</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
