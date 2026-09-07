<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyButton } from '@/components/ui/copy-button'
import { CheckCircle2, XCircle, FileJson } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'LLM JSON Output Validator & Extractor | Formatho',
  description:
    'Paste any LLM output — extract JSON from markdown fences, prose, or mixed content. Validate syntax, pretty-print, see data types and structure. Handles model output edge cases. Client-side.',
  keywords: ['llm json validator', 'extract json from ai output', 'model output json parser', 'json from chatgpt', 'validate llm structured output', 'json extractor from text'],
  ogType: 'website'
})

const inputText = ref('')
const validated = ref(false)

interface Result {
  valid: boolean
  json: unknown | null
  error: string | null
  extractedFrom: string
  typeInfo: string
  keyCount: number
  depth: number
}

const result = ref<Result | null>(null)

// Extract JSON from various LLM output formats
function extractJson(text: string): { json: string; source: string } | null {
  // 1. try direct parse
  try { JSON.parse(text); return { json: text, source: 'direct' } } catch { /* not valid JSON */ }

  // 2. extract from markdown code fences ```json ... ``` or ``` ... ```
  const fenceMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n```/)
  if (fenceMatch) {
    try { JSON.parse(fenceMatch[1]); return { json: fenceMatch[1], source: 'markdown fence' } } catch { /* not valid JSON */ }
  }

  // 3. find first { or [ and matching last } or ]
  const start = text.search(/[{[]/)
  if (start >= 0) {
    const openChar = text[start]
    const closeChar = openChar === '{' ? '}' : ']'
    const lastClose = text.lastIndexOf(closeChar)
    if (lastClose > start) {
      const candidate = text.slice(start, lastClose + 1)
      try { JSON.parse(candidate); return { json: candidate, source: 'embedded object' } } catch { /* not valid JSON */ }
    }
  }

  // 4. try to fix common LLM issues: trailing commas, smart quotes
  let fixed = text.trim()
    .replace(/,\s*([}\]])/g, '$1')  // trailing commas
    .replace(/[\u201c\u201d]/g, '"')  // smart quotes
    .replace(/[\u2018\u2019]/g, "'")  // smart apostrophes
    .replace(/\n/g, ' ')              // newlines in strings
  try { JSON.parse(fixed); return { json: fixed, source: 'auto-fixed' } } catch { /* not valid JSON */ }

  // 5. same fixes on fenced content
  if (fenceMatch) {
    fixed = fenceMatch[1]
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/[\u201c\u201d]/g, '"')
    try { JSON.parse(fixed); return { json: fixed, source: 'markdown fence (fixed)' } } catch { /* not valid JSON */ }
  }

  return null
}

function analyze(data: unknown): { typeInfo: string; keyCount: number; depth: number } {
  const getType = (v: unknown): string => {
    if (v === null) return 'null'
    if (Array.isArray(v)) return `array[${v.length}]`
    switch (typeof v) {
      case 'string': return 'string'
      case 'number': return Number.isInteger(v) ? 'integer' : 'float'
      case 'boolean': return 'boolean'
      case 'object': return 'object'
      default: return typeof v
    }
  }

  const getDepth = (v: unknown, d: number = 0): number => {
    if (v === null || typeof v !== 'object') return d
    const values = Array.isArray(v) ? v : Object.values(v as Record<string, unknown>)
    if (!values.length) return d + 1
    return Math.max(...values.map(v2 => getDepth(v2, d + 1)))
  }

  const countKeys = (v: unknown): number => {
    if (v === null || typeof v !== 'object') return 0
    if (Array.isArray(v)) return v.reduce((s: number, item) => s + countKeys(item), 0)
    return Object.keys(v).length + Object.values(v).reduce((s: number, val) => s + countKeys(val), 0)
  }

  return {
    typeInfo: getType(data),
    keyCount: countKeys(data),
    depth: getDepth(data)
  }
}

function validate() {
  validated.value = true
  result.value = null
  if (!inputText.value.trim()) return

  const extracted = extractJson(inputText.value)
  if (!extracted) {
    result.value = { valid: false, json: null, error: 'No valid JSON found — check for unclosed brackets or malformed syntax', extractedFrom: '', typeInfo: '', keyCount: 0, depth: 0 }
    return
  }

  try {
    const parsed = JSON.parse(extracted.json)
    const info = analyze(parsed)
    result.value = {
      valid: true,
      json: parsed,
      error: null,
      extractedFrom: extracted.source,
      ...info
    }
  } catch (e: any) {
    result.value = { valid: false, json: null, error: e?.message || 'Parse failed', extractedFrom: extracted.source, typeInfo: '', keyCount: 0, depth: 0 }
  }
}

const prettyOutput = computed(() => {
  if (!result.value?.valid || !result.value.json) return ''
  return JSON.stringify(result.value.json, null, 2)
})

function clearAll() {
  inputText.value = ''
  result.value = null
  validated.value = false
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><FileJson class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">LLM JSON Output Validator</h1>
        <p class="text-sm text-muted-foreground">Extract and validate JSON from any AI model output — handles fences, prose, and edge cases</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Textarea
          v-model="inputText"
          :rows="8"
          class="font-mono text-xs"
          placeholder="Paste model output here — can include markdown fences, explanation text, or raw JSON..."
          aria-label="LLM output to validate"
        />
        <div class="flex gap-2">
          <Button @click="validate" :disabled="!inputText">Extract & Validate</Button>
          <Button variant="outline" @click="clearAll" :disabled="!inputText">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="validated && result">
      <Card :class="result.valid ? 'border-green-500/40' : 'border-red-500/40'">
        <CardContent class="flex items-center gap-3 pt-5">
          <component :is="result.valid ? CheckCircle2 : XCircle" class="w-6 h-6 shrink-0" :class="result.valid ? 'text-green-600' : 'text-red-500'" />
          <div>
            <p class="font-semibold">{{ result.valid ? 'Valid JSON' : 'Invalid JSON' }}</p>
            <p v-if="result.valid" class="text-xs text-muted-foreground">
              Type: {{ result.typeInfo }} · Keys: {{ result.keyCount }} · Depth: {{ result.depth }} · Extracted from: {{ result.extractedFrom }}
            </p>
            <p v-else class="text-xs text-red-500">{{ result.error }}</p>
          </div>
        </CardContent>
      </Card>

      <Card v-if="result.valid && prettyOutput">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Extracted JSON</CardTitle>
          <CopyButton :text="prettyOutput" aria-label="Copy extracted JSON" />
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ prettyOutput }}</pre>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
