<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { EyeOff, ScanSearch, ShieldCheck } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'PII Redactor - Remove Personal Data Before AI | Formatho',
  description:
    'Scan text for PII before sending to an LLM: emails, phones, SSNs, credit cards, API keys, IPs. Mask or replace sensitive data client-side. Your data never leaves your browser.',
  keywords: ['pii redactor', 'data redaction tool', 'remove personal data', 'llm privacy', 'scrub pii before ai', 'sensitive data masker', 'text anonymizer'],
  ogType: 'website'
})

type Mode = 'mask' | 'redact' | 'placeholder'

const inputText = ref('')
const mode = ref<Mode>('mask')
const placeholder = ref('[REDACTED]')
const scanned = ref(false)

interface PiiType {
  id: string
  label: string
  pattern: RegExp
  maskKeep?: number
  color: string
}

const detectors: PiiType[] = [
  { id: 'email', label: 'Email', pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, maskKeep: 2, color: 'text-blue-600' },
  { id: 'phone', label: 'Phone', pattern: /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, maskKeep: 4, color: 'text-green-600' },
  { id: 'ssn', label: 'SSN', pattern: /\b\d{3}-\d{2}-\d{4}\b/g, color: 'text-red-600' },
  { id: 'credit_card', label: 'Credit Card', pattern: /\b(?:\d[ -]*?){13,16}\b/g, color: 'text-red-600' },
  { id: 'ip', label: 'IP Address', pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g, color: 'text-amber-600' },
  { id: 'openai_key', label: 'OpenAI API Key', pattern: /\bsk-[a-zA-Z0-9]{20,}\b/g, color: 'text-purple-600' },
  { id: 'aws_key', label: 'AWS Access Key', pattern: /\bAKIA[0-9A-Z]{16}\b/g, color: 'text-purple-600' },
  { id: 'github_token', label: 'GitHub Token', pattern: /\bghp_[a-zA-Z0-9]{36}\b/g, color: 'text-purple-600' },
  { id: 'slack_token', label: 'Slack Token', pattern: /\bxox[baprs]-[a-zA-Z0-9-]+\b/g, color: 'text-purple-600' },
  { id: 'iban', label: 'IBAN', pattern: /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g, color: 'text-indigo-600' },
  { id: 'url_params', label: 'URL with Query Params', pattern: /https?:\/\/[^\s]+\?[^\s]+/g, color: 'text-cyan-600' },
]

const findings = computed(() => {
  if (!scanned.value || !inputText.value) return []
  const results: Array<{ type: string; label: string; match: string; color: string; count: number }> = []
  for (const det of detectors) {
    const matches = inputText.value.match(det.pattern)
    if (matches) {
      results.push({
        type: det.id,
        label: det.label,
        match: matches[0].slice(0, 40),
        color: det.color,
        count: matches.length
      })
    }
  }
  return results
})

const totalFindings = computed(() => findings.value.reduce((s, f) => s + f.count, 0))

const outputText = computed(() => {
  if (!scanned.value || !inputText.value) return ''
  let text = inputText.value
  for (const det of detectors) {
    text = text.replace(det.pattern, (match) => {
      if (mode.value === 'redact') return '[REDACTED]'
      if (mode.value === 'placeholder') return placeholder.value || '[REDACTED]'
      // mask mode: keep first N chars
      if (det.maskKeep && match.length > det.maskKeep + 3) {
        return match.slice(0, det.maskKeep) + '•'.repeat(Math.min(match.length - det.maskKeep, 8))
      }
      return match.slice(0, 1) + '•'.repeat(Math.min(match.length - 1, 8))
    })
  }
  return text
})

function scan() {
  scanned.value = true
}

function clearAll() {
  inputText.value = ''
  scanned.value = false
}

</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><EyeOff class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">PII Redactor</h1>
        <p class="text-sm text-muted-foreground">Scrub personal data before sending text to any AI model — all client-side</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Label for="pii-input">Paste text containing sensitive data</Label>
        <Textarea id="pii-input" v-model="inputText" :rows="8" class="font-mono text-xs" placeholder="Paste emails, phone numbers, API keys, or any text with PII..." aria-label="Text to scan for PII" />
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex gap-2">
            <button v-for="m in (['mask', 'redact', 'placeholder'] as Mode[])" :key="m" class="px-3 py-2 rounded-lg text-sm font-semibold border transition-colors capitalize" :class="mode === m ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'" @click="mode = m">
              {{ m }}
            </button>
          </div>
          <input v-if="mode === 'placeholder'" v-model="placeholder" class="flex h-10 w-40 rounded-md border border-input bg-background px-3 text-sm font-mono" placeholder="[REDACTED]" aria-label="Replacement text" />
          <Button @click="scan" :disabled="!inputText">Scan & Redact</Button>
          <Button variant="outline" @click="clearAll" :disabled="!inputText && !scanned">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <div v-if="scanned" class="space-y-4">
      <Card :class="totalFindings > 0 ? 'border-amber-500/40' : 'border-green-500/40'">
        <CardContent class="flex items-center gap-3 pt-5">
          <component :is="totalFindings > 0 ? ScanSearch : ShieldCheck" class="w-5 h-5" :class="totalFindings > 0 ? 'text-amber-600' : 'text-green-600'" />
          <div>
            <p class="font-semibold">{{ totalFindings }} item{{ totalFindings === 1 ? '' : 's' }} detected</p>
            <p class="text-xs text-muted-foreground">{{ totalFindings === 0 ? 'No PII patterns found — text looks clean for AI processing.' : 'Review the redacted output below before pasting into an LLM.' }}</p>
          </div>
        </CardContent>
      </Card>

      <div v-if="findings.length" class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div v-for="f in findings" :key="f.type" class="p-3 border border-border rounded-lg">
          <p class="text-xs font-semibold" :class="f.color">{{ f.label }}</p>
          <p class="text-lg font-bold font-mono">{{ f.count }}</p>
          <p class="text-xs text-muted-foreground font-mono truncate">{{ f.match }}</p>
        </div>
      </div>

      <Card v-if="outputText">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Redacted output</CardTitle>
          <CopyButton :text="outputText" aria-label="Copy redacted text" />
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ outputText }}</pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
