<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Braces } from 'lucide-vue-next'
import { encode } from 'gpt-tokenizer/model/gpt-4o'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Prompt Template Renderer - Variable Substitution | Formatho',
  description:
    'Paste a prompt with {{variables}} and get an auto-generated form to fill each variable. Renders the final prompt with token count. Works with double braces, single braces, and $VAR syntax. Client-side.',
  keywords: ['prompt template renderer', 'prompt variable substitution', 'llm prompt template', 'prompt form generator', 'mustache prompt', 'jinja prompt'],
  ogType: 'website'
})

const template = ref('You are a {{role}} assistant specializing in {{domain}}.\n\nHelp me with: {{task}}\n\nContext:\n{{context}}')
const values = ref<Record<string, string>>({})

// auto-detect variables from template
const variables = computed(() => {
  const found = new Set<string>()
  // {{var}} or {{ var }} or {var} or $var or ${var}
  const patterns = [
    /\{\{\s*(\w+)\s*\}\}/g,   // {{var}}
    /\{(\w+)\}/g,               // {var} (single)
    /\$\{(\w+)\}/g,             // ${var}
    /\$(\w+)/g,                 // $var
  ]
  for (const p of patterns) {
    const matches = template.value.matchAll(p)
    for (const m of matches) {
      if (m[1] && m[1].length > 1) found.add(m[1]) // skip single-char vars
    }
  }
  return [...found].sort()
})

// initialize form values when variables change
function initValue(name: string) {
  if (!(name in values.value)) {
    values.value[name] = ''
  }
}

// render the template
const rendered = computed(() => {
  let text = template.value
  for (const v of variables.value) {
    const val = values.value[v] || `{{${v}}}`
    text = text.replaceAll(`{{${v}}}`, val)
    text = text.replaceAll(`{{ ${v} }}`, val)
    text = text.replaceAll(`{${v}}`, val)
    text = text.replaceAll(`\${${v}}`, val)
    text = text.replaceAll(`$${v}`, val)
  }
  return text
})

function formatVar(name: string): string {
  return '{{' + name + '}}'
}

const tokenCount = computed(() => rendered.value ? encode(rendered.value).length : 0)


const sample = `Analyze the following {{file_type}} file:

{{content}}

Focus on {{focus_area}}. Previous analysis noted: {{previous_notes}}.`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Braces class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Prompt Template Renderer</h1>
        <p class="text-sm text-muted-foreground">Auto-generate a form from your {{variables}} — fill values, get the final prompt</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Template</CardTitle>
          <Button variant="outline" size="sm" @click="template = sample">Sample</Button>
        </CardHeader>
        <CardContent class="space-y-3">
          <Textarea v-model="template" :rows="10" class="font-mono text-xs" placeholder="Write your prompt with {{variables}}..." aria-label="Prompt template" />
          <p class="text-xs text-muted-foreground">
            Supports: <code class="font-mono" v-text="'{{var}}'"></code>, <code class="font-mono" v-text="'{var}'"></code>, <code class="font-mono" v-text="'${var}'"></code>, <code class="font-mono" v-text="'$var'"></code>
          </p>
          <p v-if="variables.length" class="text-xs">
            Detected: <span v-for="v in variables" :key="v" class="inline-block font-mono text-primary bg-primary/10 rounded px-1.5 py-0.5 mr-1" v-text="formatVar(v)"></span>
          </p>
        </CardContent>
      </Card>

      <Card v-if="variables.length">
        <CardHeader><CardTitle class="text-lg">Variables ({{ variables.length }})</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div v-for="v in variables" :key="v" class="grid gap-1" @vue:mounted="initValue(v)">
            <Label :for="'var-' + v" class="font-mono text-xs"><span v-text="formatVar(v)"></span></Label>
            <Textarea
              :id="'var-' + v"
              v-model="values[v]"
              :rows="v === 'content' || v === 'context' ? 4 : 2"
              class="font-mono text-xs"
              :placeholder="'Value for ' + v"
              :aria-label="'Value for ' + v"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <Card v-if="rendered && variables.length">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Rendered prompt · {{ tokenCount }} tokens</CardTitle>
        <CopyButton :text="rendered" aria-label="Copy rendered prompt" />
      </CardHeader>
      <CardContent>
        <pre class="font-mono text-xs whitespace-pre-wrap break-words p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ rendered }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
