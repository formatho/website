<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Scissors } from 'lucide-vue-next'
import { encode } from 'gpt-tokenizer/model/gpt-4o'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Context Window Splitter - RAG Chunking Tool | Formatho',
  description:
    'Split long text into RAG-ready chunks by tokens, sentences, or paragraphs. See overlap, chunk sizes, and context window usage for each model. Client-side.',
  keywords: ['context window splitter', 'rag chunking', 'text chunker', 'llm text splitting', 'rag segmentation', 'document chunking tool'],
  ogType: 'website'
})

const inputText = ref('')
const strategy = ref<'tokens' | 'sentences' | 'paragraphs'>('tokens')
const chunkSize = ref(512)
const overlap = ref(50)
const splitDone = ref(false)

interface Chunk {
  index: number
  text: string
  tokens: number
  startWord: number
  endWord: number
}

const chunks = ref<Chunk[]>([])

const totalTokens = computed(() => inputText.value ? encode(inputText.value).length : 0)

function splitByTokens(): Chunk[] {
  const tokens = encode(inputText.value)
  const result: Chunk[] = []
  const step = Math.max(1, chunkSize.value - overlap.value)
  const words = inputText.value.split(/\s+/)
  for (let i = 0; i < tokens.length; i += step) {
    // approximate the text back from token positions
    const startWord = Math.floor((i / tokens.length) * words.length)
    const endWord = Math.min(words.length, Math.floor(((i + chunkSize.value) / tokens.length) * words.length))
    const text = words.slice(startWord, endWord).join(' ')
    if (text.trim()) {
      result.push({
        index: result.length,
        text,
        tokens: encode(text).length,
        startWord,
        endWord
      })
    }
    if (i + chunkSize.value >= tokens.length) break
  }
  return result
}

function splitBySentences(): Chunk[] {
  const sentences = inputText.value.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [inputText.value]
  const result: Chunk[] = []
  let current: string[] = []
  let currentTokens = 0
  let startWord = 0
  let wordCount = 0

  for (const sent of sentences) {
    const sentTokens = encode(sent).length
    wordCount += sent.split(/\s+/).length
    if (currentTokens + sentTokens > chunkSize.value && current.length) {
      const text = current.join(' ')
      result.push({ index: result.length, text, tokens: encode(text).length, startWord, endWord: wordCount })
      // overlap: keep last few sentences
      const keepCount = Math.max(1, Math.floor(current.length * overlap.value / 100))
      current = current.slice(-keepCount)
      currentTokens = encode(current.join(' ')).length
      startWord = wordCount - current.join(' ').split(/\s+/).length
    }
    current.push(sent)
    currentTokens += sentTokens
  }
  if (current.length) {
    const text = current.join(' ')
    result.push({ index: result.length, text, tokens: encode(text).length, startWord, endWord: wordCount })
  }
  return result
}

function splitByParagraphs(): Chunk[] {
  const paragraphs = inputText.value.split(/\n\s*\n/)
  const result: Chunk[] = []
  let current: string[] = []
  let currentTokens = 0
  let startWord = 0
  let wordCount = 0

  for (const para of paragraphs) {
    const paraTokens = encode(para).length
    wordCount += para.split(/\s+/).length
    if (currentTokens + paraTokens > chunkSize.value && current.length) {
      const text = current.join('\n\n')
      result.push({ index: result.length, text, tokens: encode(text).length, startWord, endWord: wordCount })
      current = []
      currentTokens = 0
      startWord = wordCount
    }
    current.push(para)
    currentTokens += paraTokens
  }
  if (current.length) {
    const text = current.join('\n\n')
    result.push({ index: result.length, text, tokens: encode(text).length, startWord, endWord: wordCount })
  }
  return result
}

function doSplit() {
  if (!inputText.value.trim()) return
  chunks.value = strategy.value === 'tokens' ? splitByTokens()
    : strategy.value === 'sentences' ? splitBySentences()
    : splitByParagraphs()
  splitDone.value = true
}

function clearAll() {
  inputText.value = ''
  chunks.value = []
  splitDone.value = false
}

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Scissors class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Context Window Splitter</h1>
        <p class="text-sm text-muted-foreground">Chunk long text for RAG pipelines — by tokens, sentences, or paragraphs</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Textarea v-model="inputText" :rows="8" class="font-mono text-xs" placeholder="Paste long text, documents, or knowledge base content to chunk..." aria-label="Text to split" />
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="grid gap-2">
            <Label>Strategy</Label>
            <select v-model="strategy" :class="selectClass">
              <option value="tokens">By tokens</option>
              <option value="sentences">By sentences</option>
              <option value="paragraphs">By paragraphs</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Chunk size (tokens)</Label>
            <Input v-model.number="chunkSize" type="number" min="64" max="8192" aria-label="Chunk size in tokens" />
          </div>
          <div class="grid gap-2">
            <Label>Overlap {{ strategy === 'sentences' ? '(%)' : '(tokens)' }}</Label>
            <Input v-model.number="overlap" type="number" min="0" :max="strategy === 'sentences' ? 50 : chunkSize" aria-label="Overlap" />
          </div>
          <div class="flex items-end gap-2">
            <Button @click="doSplit" :disabled="!inputText" class="flex-1">Split</Button>
            <Button variant="outline" @click="clearAll" :disabled="!inputText">Clear</Button>
          </div>
        </div>
        <p v-if="inputText" class="text-xs text-muted-foreground">
          Total: {{ totalTokens.toLocaleString() }} tokens · {{ inputText.split(/\s+/).length.toLocaleString() }} words
        </p>
      </CardContent>
    </Card>

    <div v-if="splitDone && chunks.length" class="space-y-3">
      <Card>
        <CardContent class="flex items-center gap-4 pt-5">
          <p class="text-sm"><strong>{{ chunks.length }}</strong> chunks</p>
          <p class="text-sm text-muted-foreground">avg {{ Math.round(chunks.reduce((s, c) => s + c.tokens, 0) / chunks.length) }} tokens/chunk</p>
          <p class="text-sm text-muted-foreground">largest: {{ Math.max(...chunks.map(c => c.tokens)) }} tokens</p>
        </CardContent>
      </Card>
      <Card v-for="chunk in chunks" :key="chunk.index">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-sm font-mono">Chunk {{ chunk.index + 1 }} · {{ chunk.tokens }} tokens · words {{ chunk.startWord }}–{{ chunk.endWord }}</CardTitle>
          <CopyButton :text="chunk.text" variant="ghost" :aria-label="'Copy chunk ' + (chunk.index + 1)" />
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-words p-3 border border-border rounded-lg bg-muted/40 max-h-48 overflow-auto line-clamp-6">{{ chunk.text }}</pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
