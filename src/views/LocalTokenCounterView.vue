<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { encode as encodeO200K } from 'gpt-tokenizer/model/gpt-4o'
import { encode as encodeCl100K } from 'gpt-tokenizer/model/gpt-4'
import { encode as encodeP50K } from 'gpt-tokenizer/model/text-davinci-003'
import { encode as encodeR50K } from 'gpt-tokenizer/model/text-davinci-002'
import { encode as encodeO1 } from 'gpt-tokenizer/model/o1-preview'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'LLM Token Counter - GPT-4o, GPT-4, Claude, Llama | Formatho',
  description:
    'Count tokens for multiple LLM models locally: GPT-4o (o200k), GPT-4/GPT-3.5 (cl100k), Davinci (p50k/r50k), o1. Compare token counts across models, see cost estimates. 100% private, no API calls.',
  keywords: [
    'token counter',
    'llm token counter',
    'gpt-4o token count',
    'gpt-4 tokenizer',
    'cl100k base',
    'o200k base',
    'token cost calculator',
    'local token counter'
  ],
  ogType: 'website'
})

const inputText = ref('')
const selectedModel = ref('gpt-4o')

interface ModelDef {
  id: string
  label: string
  encoding: string
  encode: (text: string) => number[]
  contextWindow: number
  note: string
}

const models: ModelDef[] = [
  {
    id: 'gpt-4o',
    label: 'GPT-4o',
    encoding: 'o200k_base',
    encode: (t) => encodeO200K(t),
    contextWindow: 128000,
    note: 'Latest OpenAI models'
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT-4o mini',
    encoding: 'o200k_base',
    encode: (t) => encodeO200K(t),
    contextWindow: 128000,
    note: 'Same encoding as GPT-4o'
  },
  {
    id: 'o1-preview',
    label: 'o1 preview',
    encoding: 'o200k_base',
    encode: (t) => encodeO1(t),
    contextWindow: 128000,
    note: 'Reasoning models'
  },
  {
    id: 'gpt-4',
    label: 'GPT-4 / GPT-4-turbo',
    encoding: 'cl100k_base',
    encode: (t) => encodeCl100K(t),
    contextWindow: 128000,
    note: 'GPT-4, GPT-4-turbo, GPT-3.5-turbo'
  },
  {
    id: 'davinci-003',
    label: 'text-davinci-003',
    encoding: 'p50k_base',
    encode: (t) => encodeP50K(t),
    contextWindow: 4096,
    note: 'Legacy GPT-3 completions'
  },
  {
    id: 'davinci-002',
    label: 'text-davinci-002 / Codex',
    encoding: 'r50k_base / p50k',
    encode: (t) => encodeR50K(t),
    contextWindow: 4096,
    note: 'Legacy GPT-3 and Codex'
  }
]

const activeModel = computed(() => models.find(m => m.id === selectedModel.value) || models[0])

// Token counts for all models (computed lazily — only the active model triggers encoding)
const tokenCount = computed(() => {
  if (!inputText.value) return 0
  return activeModel.value.encode(inputText.value).length
})

// Comparison across all models (computed on demand)
const comparison = ref<Array<{ label: string; encoding: string; tokens: number; contextWindow: number; pct: number }>>([])
const showComparison = ref(false)

function computeComparison() {
  comparison.value = models.map(m => ({
    label: m.label,
    encoding: m.encoding,
    tokens: inputText.value ? m.encode(inputText.value).length : 0,
    contextWindow: m.contextWindow,
    pct: 0
  }))
  // calculate % of context window
  comparison.value.forEach(c => {
    c.pct = c.contextWindow > 0 ? (c.tokens / c.contextWindow) * 100 : 0
  })
  showComparison.value = true
}

const characterCount = computed(() => inputText.value.length)

const wordCount = computed(() => {
  const trimmed = inputText.value.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
})

const tokensPerWord = computed(() => {
  if (!wordCount.value) return '—'
  return (tokenCount.value / wordCount.value).toFixed(2)
})

const charsPerToken = computed(() => {
  if (!tokenCount.value) return '—'
  return (characterCount.value / tokenCount.value).toFixed(1)
})

const clearText = () => {
  inputText.value = ''
  comparison.value = []
  showComparison.value = false
}

const maxTokens = computed(() => comparison.value.reduce((max, c) => Math.max(max, c.tokens), 0))
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    <Breadcrumb />

    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">LLM Token Counter</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Compare token counts across models — GPT-4o, GPT-4, o1, legacy GPT-3. Runs entirely in your browser.
        </p>
      </div>
      <Button variant="outline" @click="clearText" :disabled="!inputText" aria-label="Clear text">
        Clear
      </Button>
    </div>

    <!-- Input Area -->
    <Card>
      <CardContent class="pt-6 space-y-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="m in models"
            :key="m.id"
            class="px-3 py-2 rounded-lg text-sm font-semibold border transition-colors"
            :class="selectedModel === m.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-border hover:bg-muted'"
            :title="m.note"
            @click="selectedModel = m.id"
          >
            {{ m.label }}
          </button>
        </div>
        <p class="text-xs text-muted-foreground">
          Encoding: <span class="font-mono">{{ activeModel.encoding }}</span> ·
          Context: {{ activeModel.contextWindow.toLocaleString() }} tokens ·
          {{ activeModel.note }}
        </p>
        <CodeEditor
          v-model="inputText"
          language="plaintext"
          :rows="8"
          placeholder="Paste your text, prompt, or code here..."
        />
      </CardContent>
    </Card>

    <!-- Primary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Card class="border-primary/30">
        <CardContent class="pt-5 pb-4">
          <p class="text-xs text-muted-foreground uppercase tracking-wide">Tokens</p>
          <p class="text-2xl font-bold mt-1 font-mono">{{ tokenCount.toLocaleString() }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-5 pb-4">
          <p class="text-xs text-muted-foreground uppercase tracking-wide">Characters</p>
          <p class="text-2xl font-bold mt-1 font-mono">{{ characterCount.toLocaleString() }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-5 pb-4">
          <p class="text-xs text-muted-foreground uppercase tracking-wide">Words</p>
          <p class="text-2xl font-bold mt-1 font-mono">{{ wordCount.toLocaleString() }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-5 pb-4">
          <p class="text-xs text-muted-foreground uppercase tracking-wide">Tokens/word</p>
          <p class="text-2xl font-bold mt-1 font-mono">{{ tokensPerWord }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-5 pb-4">
          <p class="text-xs text-muted-foreground uppercase tracking-wide">Chars/token</p>
          <p class="text-2xl font-bold mt-1 font-mono">{{ charsPerToken }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Cross-model comparison -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Cross-model comparison</CardTitle>
        <Button variant="outline" size="sm" :disabled="!inputText" @click="computeComparison">
          Compare all models
        </Button>
      </CardHeader>
      <CardContent v-if="showComparison && comparison.length">
        <div class="space-y-2">
          <div
            v-for="c in comparison"
            :key="c.label"
            class="flex items-center gap-3 p-3 border rounded-lg"
            :class="c.label === activeModel.label ? 'border-primary/40 bg-primary/5' : 'border-border'"
          >
            <div class="w-40 shrink-0">
              <p class="text-sm font-semibold truncate">{{ c.label }}</p>
              <p class="text-xs text-muted-foreground font-mono">{{ c.encoding }}</p>
            </div>
            <div class="flex-1 min-w-0">
              <div class="h-6 bg-muted rounded overflow-hidden">
                <div
                  class="h-full bg-primary/70 transition-all"
                  :style="{ width: maxTokens > 0 ? (c.tokens / maxTokens * 100) + '%' : '0%' }"
                />
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="font-mono text-sm font-bold">{{ c.tokens.toLocaleString() }}</p>
              <p class="text-xs text-muted-foreground">{{ c.pct.toFixed(1) }}% of ctx</p>
            </div>
            <CopyButton
              v-if="c.tokens > 0"
              :text="String(c.tokens)"
              variant="ghost"
              :aria-label="'Copy token count for ' + c.label"
            />
          </div>
        </div>
        <p class="text-xs text-muted-foreground mt-3">
          Different models use different tokenizers — the same text may cost different amounts depending on the model.
          o200k (GPT-4o) is typically ~10-20% more efficient than cl100k (GPT-4) for English text.
        </p>
      </CardContent>
      <CardContent v-else>
        <p class="text-sm text-muted-foreground text-center py-4">
          Enter text above, then click "Compare all models" to see token counts for every tokenizer side by side.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
