<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Terminal } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'OpenAI API Request Builder - curl, Python, JS | Formatho',
  description:
    'Build OpenAI chat/completions API requests visually: model, messages, temperature, tools. Generate ready-to-run curl, Python, and JavaScript code. Client-side, no API key needed.',
  keywords: ['openai api builder', 'chat completions curl', 'openai request generator', 'llm api code generator', 'gpt-4o api call', 'openai python example'],
  ogType: 'website'
})

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const model = ref('gpt-4o')
const messages = ref<Message[]>([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' }
])
const temperature = ref(1)
const maxTokens = ref<number | null>(null)
const topP = ref(1)
const stream = ref(false)

const models = [
  { id: 'gpt-4o', label: 'GPT-4o' },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { id: 'gpt-4-turbo', label: 'GPT-4 turbo' },
  { id: 'gpt-4', label: 'GPT-4' },
  { id: 'o1-preview', label: 'o1 preview' },
  { id: 'o1-mini', label: 'o1 mini' }
]

function addMessage() {
  messages.value.push({ role: 'user', content: '' })
}

function removeMessage(i: number) {
  messages.value.splice(i, 1)
}

const payload = computed(() => {
  const p: Record<string, unknown> = {
    model: model.value,
    messages: messages.value.filter(m => m.content.trim()),
    temperature: temperature.value,
  }
  if (maxTokens.value) p.max_tokens = maxTokens.value
  if (topP.value !== 1) p.top_p = topP.value
  if (stream.value) p.stream = true
  return p
})

const jsonOutput = computed(() => JSON.stringify(payload.value, null, 2))

const curlOutput = computed(() => {
  return `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '${JSON.stringify(payload.value)}'`
})

const pythonOutput = computed(() => {
  return `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
${JSON.stringify(payload.value, null, 4).split('\n').map(l => '    ' + l).join('\n').trim()}
)

print(response.choices[0].message.content)`
})

const jsOutput = computed(() => {
  return `import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.chat.completions.create(
${JSON.stringify(payload.value, null, 4).split('\n').map(l => '  ' + l).join('\n').trim()}
);

console.log(response.choices[0].message.content);`
})

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Terminal class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">OpenAI API Request Builder</h1>
        <p class="text-sm text-muted-foreground">Build chat/completions requests visually — copy as curl, Python, or JavaScript</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Configuration</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="grid gap-2">
            <Label>Model</Label>
            <select v-model="model" :class="selectClass">
              <option v-for="m in models" :key="m.id" :value="m.id">{{ m.label }}</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label>Temperature ({{ temperature }})</Label>
            <Input v-model.number="temperature" type="number" min="0" max="2" step="0.1" aria-label="Temperature" />
          </div>
          <div class="grid gap-2">
            <Label>Max tokens</Label>
            <Input v-model.number="maxTokens" type="number" min="1" placeholder="auto" aria-label="Max tokens" />
          </div>
          <div class="grid gap-2">
            <Label>Stream</Label>
            <label class="flex items-center gap-2 h-10">
              <input v-model="stream" type="checkbox" class="accent-primary" /> Enable streaming
            </label>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Messages</CardTitle>
        <Button variant="outline" size="sm" @click="addMessage"><Plus class="w-4 h-4 mr-1" /> Add</Button>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="(msg, i) in messages" :key="i" class="flex gap-2 items-start">
          <select v-model="msg.role" :class="selectClass + ' w-32 shrink-0'" :aria-label="'Role for message ' + (i + 1)">
            <option value="system">system</option>
            <option value="user">user</option>
            <option value="assistant">assistant</option>
          </select>
          <Textarea v-model="msg.content" :rows="2" class="font-mono text-xs flex-1" :placeholder="'Message ' + (i + 1)" :aria-label="'Content for message ' + (i + 1)" />
          <Button variant="ghost" size="sm" :aria-label="'Remove message ' + (i + 1)" @click="removeMessage(i)">
            <Trash2 class="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-lg">Generated code</CardTitle></CardHeader>
      <CardContent>
        <Tabs default-value="json">
          <TabsList>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="curl">curl</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="json">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="jsonOutput" variant="ghost" aria-label="Copy JSON" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ jsonOutput }}</pre>
            </div>
          </TabsContent>
          <TabsContent value="curl">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="curlOutput" variant="ghost" aria-label="Copy curl" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ curlOutput }}</pre>
            </div>
          </TabsContent>
          <TabsContent value="python">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="pythonOutput" variant="ghost" aria-label="Copy Python" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ pythonOutput }}</pre>
            </div>
          </TabsContent>
          <TabsContent value="js">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="jsOutput" variant="ghost" aria-label="Copy JavaScript" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ jsOutput }}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>
