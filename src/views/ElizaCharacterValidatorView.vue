<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Bot class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">elizaOS Character Validator</h1>
        <p class="text-sm text-muted-foreground">Validate your character.json against the elizaOS schema: missing fields, type errors, empty bio/style, malformed messageExamples, and leaked secrets. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Character File (JSON)</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="input" rows="10" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder='{ "name": "trump", "bio": [...] }'></textarea>
        <div class="flex gap-2">
          <Button @click="validate">Validate</Button>
          <Button variant="outline" @click="input = sample; validate()">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card :class="result.errors.length ? 'border-red-500/40' : 'border-green-500/40'">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent class="text-sm">
          <p :class="result.errors.length ? 'text-red-600' : 'text-green-600'" class="font-medium">
            {{ result.errors.length ? result.errors.length + ' error(s), ' + result.warnings.length + ' warning(s)' : result.warnings.length ? 'Valid with ' + result.warnings.length + ' warning(s)' : 'Character file looks good' }}
          </p>
        </CardContent>
      </Card>

      <Card v-if="result.errors.length">
        <CardHeader><CardTitle>Errors</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-2">
          <p v-for="e in result.errors" :key="e" class="text-red-600">- {{ e }}</p>
        </CardContent>
      </Card>

      <Card v-if="result.warnings.length">
        <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-2">
          <p v-for="w in result.warnings" :key="w" class="text-orange-600">- {{ w }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Detected Fields</CardTitle></CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-2 text-xs">
            <span v-for="f in result.fields" :key="f" class="px-2 py-1 rounded bg-muted font-mono">{{ f }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>What is checked</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-1">
        <p>name (required), bio, lore, style (all/chat/post), messageExamples shape, postExamples, topics, adjectives, knowledge, plugins, clients, modelProvider - plus a security scan: API keys or secrets placed in settings.secrets belong in .env, not in a character file you might commit.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bot } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'elizaOS Character Validator - Check character.json | Formatho',
  description: 'Validate an elizaOS character file against the real schema: missing required fields, type errors, empty bio or style, malformed messageExamples, and leaked API keys. Free, client-side.',
  keywords: ['elizaos character validator', 'character.json validator', 'elizaos character file', 'elizaos agent config', 'elizaos schema check']
})

const input = ref('')
const error = ref('')
const result = ref<any>(null)

const sample = JSON.stringify({
  name: 'DebugBot',
  bio: ['A debugging assistant with strong opinions about stack traces.'],
  lore: ['Once fixed a production bug in a dream.'],
  style: { all: [], chat: ['concise', 'technical'] },
  messageExamples: [
    [
      { user: '{{user1}}', content: { text: 'why is my agent crashing?' } },
      { user: 'DebugBot', content: { text: 'Paste the stack trace and I will point at the line.' } }
    ]
  ],
  topics: ['debugging', 'elizaos'],
  adjectives: ['sharp', 'patient'],
  plugins: ['plugin-formatho'],
  clients: ['direct'],
  modelProvider: 'openai',
  settings: { secrets: { OPENAI_API_KEY: 'sk-live-LEAKED-KEY' } }
}, null, 2)

function isStrArr(v: any): boolean { return Array.isArray(v) && v.every(x => typeof x === 'string') }

function validate() {
  error.value = ''; result.value = null
  let c: any
  try { c = JSON.parse(input.value.trim()) } catch (e: any) { error.value = 'Invalid JSON: ' + e.message; return }
  if (typeof c !== 'object' || Array.isArray(c)) { error.value = 'Top level must be a JSON object.'; return }

  const errors: string[] = []
  const warnings: string[] = []

  // name
  if (c.name === undefined || c.name === null || c.name === '') errors.push('name is required and must be a non-empty string')
  else if (typeof c.name !== 'string') errors.push('name must be a string, got ' + typeof c.name)

  // bio
  if (c.bio === undefined || c.bio === null || c.bio === '' || (Array.isArray(c.bio) && !c.bio.length)) warnings.push('bio is empty or missing - the agent will have no personality base')
  else if (typeof c.bio !== 'string' && !isStrArr(c.bio)) errors.push('bio must be a string or string[], got ' + JSON.stringify(c.bio).slice(0, 50))

  // style
  if (c.style !== undefined) {
    if (typeof c.style === 'object' && !Array.isArray(c.style)) {
      const empty = (['all', 'chat', 'post'] as const).filter(k => c.style[k] !== undefined && (!isStrArr(c.style[k]) || !c.style[k].length))
      if (empty.length) warnings.push('style.' + empty.join(', style.') + ' is present but empty - agents read these as voice rules')
    } else if (!isStrArr(c.style)) errors.push('style must be an object (all/chat/post) or string[]')
  } else warnings.push('style is missing - consider style.chat and style.post for voice control')

  // messageExamples
  if (c.messageExamples !== undefined) {
    if (!Array.isArray(c.messageExamples)) errors.push('messageExamples must be an array of example conversations')
    else {
      c.messageExamples.forEach((ex: any, i: number) => {
        if (!Array.isArray(ex)) { errors.push('messageExamples[' + i + '] must be an array of messages'); return }
        ex.forEach((m: any, j: number) => {
          if (!m || typeof m.user !== 'string') errors.push('messageExamples[' + i + '][' + j + '] missing string user')
          if (!m || !m.content || typeof m.content.text !== 'string') errors.push('messageExamples[' + i + '][' + j + '] missing content.text')
          if (m && m.user && !/\{\{user/.test(m.user) && j === 0) warnings.push('messageExamples[' + i + '] first speaker is "' + m.user + '" - examples usually start with {{user1}}')
        })
      })
    }
  } else warnings.push('messageExamples missing - improves dialogue grounding')

  // string[] fields
  for (const k of ['postExamples', 'topics', 'adjectives', 'lore', 'plugins']) {
    if (c[k] !== undefined && !isStrArr(c[k])) errors.push(k + ' must be string[], got ' + typeof c[k])
  }
  // knowledge
  if (c.knowledge !== undefined && (typeof c.knowledge !== 'object' || Array.isArray(c.knowledge))) errors.push('knowledge must be an object with path[] and/or string[]')
  // clients
  const knownClients = ['direct', 'discord', 'telegram', 'twitter', 'auto', 'slack', 'farcaster', 'lens', 'irc']
  if (c.clients !== undefined) {
    if (!isStrArr(c.clients)) errors.push('clients must be string[]')
    else {
      const unknown = c.clients.filter((x: string) => !knownClients.includes(x.toLowerCase()))
      if (unknown.length) warnings.push('unknown client(s): ' + unknown.join(', ') + ' - check spelling or a plugin-provided client')
    }
  }
  // modelProvider
  if (c.modelProvider !== undefined && typeof c.modelProvider !== 'string') errors.push('modelProvider must be a string')

  // security: secrets in character file
  const secrets = c.settings?.secrets
  if (secrets && typeof secrets === 'object') {
    const keys = Object.keys(secrets)
    if (keys.length) errors.push('SECURITY: settings.secrets contains ' + keys.length + ' value(s) (' + keys.slice(0, 3).join(', ') + (keys.length > 3 ? '...' : '') + ') - secrets belong in .env, not in character.json which gets committed and shared')
  }
  if (typeof c.systemPrompt === 'string' && /sk-[a-zA-Z0-9]{20,}|api[_-]?key.{0,4}[:=]\s*['"][^'"]{8,}/i.test(c.systemPrompt)) errors.push('SECURITY: systemPrompt appears to embed an API key')

  result.value = { errors, warnings, fields: Object.keys(c) }
}

onMounted(() => { input.value = sample; validate() })
</script>
