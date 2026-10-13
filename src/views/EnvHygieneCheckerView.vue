<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><FileCog class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">.env Hygiene Checker</h1>
        <p class="text-sm text-muted-foreground">Paste an agent .env file: duplicate keys, empty values, quote and whitespace issues, and known elizaOS variable recognition. Scanned entirely in your browser - nothing is uploaded.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>.env contents</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="input" rows="10" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="OPENAI_API_KEY=sk-...&#10;DISCORD_API_TOKEN=..."></textarea>
        <div class="flex gap-2">
          <Button @click="scan">Scan</Button>
          <Button variant="outline" @click="input = sample; scan()">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card>
        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Keys:</span> {{ result.keyCount }}</p>
          <p><span class="text-muted-foreground">elizaOS variables recognized:</span> {{ result.known.join(', ') || 'none' }}</p>
          <p><span class="text-muted-foreground">Issues:</span> <span :class="result.errors.length ? 'text-red-600 font-medium' : ''">{{ result.errors.length }} errors</span>, {{ result.warnings.length }} warnings, {{ result.infos.length }} notes</p>
        </CardContent>
      </Card>

      <Card v-if="result.errors.length">
        <CardHeader><CardTitle>Errors</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="e in result.errors" :key="e" class="text-red-600 font-mono text-xs">- {{ e }}</p></CardContent>
      </Card>
      <Card v-if="result.warnings.length">
        <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="w in result.warnings" :key="w" class="text-orange-600 font-mono text-xs">- {{ w }}</p></CardContent>
      </Card>
      <Card v-if="result.infos.length">
        <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="i in result.infos" :key="i" class="text-muted-foreground font-mono text-xs">- {{ i }}</p></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>Common agent startup failures trace back to .env files: a duplicate key silently overriding the one you edited, a value wrapped in mismatched quotes, a key with invisible trailing whitespace. This scanner finds those before the agent does.</p>
        <p>Reminder: .env files must be in .gitignore. If a secret ever landed in a commit, rotate it - history lives forever.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FileCog } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: '.env Hygiene Checker - Scan Agent Config Files | Formatho',
  description: 'Client-side scanner for agent .env files: duplicate keys, empty values, quote and whitespace issues, and known elizaOS variable names. Nothing is ever uploaded.',
  keywords: ['env file checker', 'env linter', 'dotenv validator', 'elizaos env variables', 'env hygiene', 'duplicate env keys']
})

const input = ref('')
const error = ref('')
const result = ref<any>(null)

const sample = `# elizaOS agent config
OPENAI_API_KEY=sk-example-key-123
OPENAI_API_KEY=sk-old-key-overridden
DISCORD_API_TOKEN =
ELEVENLABS_API_KEY="xi-voice-key
twitter_api_key=abc123
TWITTER_USERNAME
WALLET_SECRET_KEY=0xdeadbeef
GOOD_SETTING="quoted value"`

const KNOWN = new Set(['OPENAI_API_KEY', 'OPENAI_BASE_URL', 'OPENAI_MODEL', 'ANTHROPIC_API_KEY', 'ANTHROPIC_API_URL', 'CLAUDE_API_KEY', 'ELEVENLABS_API_KEY', 'XI_API_KEY', 'DEEPSEEK_API_KEY', 'GROK_API_KEY', 'XAI_API_KEY', 'HEURIST_API_KEY', 'HEURIST_BASE_URL', 'GOOGLE_GENERATIVE_AI_API_KEY', 'GEMINI_API_KEY', 'LLAMACLOUD_API_KEY', 'TOGETHER_API_KEY', 'NINJA_API_KEY', 'OPENROUTER_API_KEY', 'MISTRAL_API_KEY', 'DISCORD_API_TOKEN', 'DISCORD_BOT_TOKEN', 'DISCORD_APPLICATION_ID', 'TELEGRAM_API_TOKEN', 'TELEGRAM_BOT_TOKEN', 'TWITTER_API_KEY', 'TWITTER_API_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_SECRET', 'TWITTER_USERNAME', 'TWITTER_PASSWORD', 'TWITTER_EMAIL', 'SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN', 'SLACK_SIGNING_SECRET', 'NEYNAR_API_KEY', 'FARCASTER_MNEMONIC', 'REDIS_URL', 'POSTGRES_URL', 'SUPABASE_URL', 'WALLET_SECRET_KEY', 'EVM_PRIVATE_KEY', 'SOLANA_PRIVATE_KEY', 'BIRDEYE_API_KEY', 'TAVILY_API_KEY', 'SERPER_API_KEY', 'COINMARKETCAP_API_KEY', 'COINGECKO_API_KEY', 'ALCHEMY_API_KEY', 'INFURA_API_KEY', 'MORALIS_API_KEY'])

function scan() {
  error.value = ''; result.value = null
  const text = input.value
  if (!text.trim()) { error.value = 'Paste a .env file first.'; return }
  const errors: string[] = []
  const warnings: string[] = []
  const infos: string[] = []
  const seen = new Map<string, number>()
  const known: string[] = []
  let keyCount = 0
  const lines = text.split(/\r?\n/)

  if (text.charCodeAt(0) === 0xfeff) warnings.push('line 1: file starts with a BOM - dotenv parsers may read a broken first key')
  if (text.includes('\r\n')) infos.push('file uses CRLF line endings - fine, but keep it consistent')

  lines.forEach((line, idx) => {
    const n = idx + 1
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const work = trimmed.startsWith('export ') ? trimmed.slice(7) : trimmed
    const eq = work.indexOf('=')
    if (eq === -1) { warnings.push('line ' + n + ': "' + work + '" has no = - dotenv skips it'); return }
    let key = work.slice(0, eq)
    let value = work.slice(eq + 1)
    keyCount++
    if (line !== line.trimEnd()) warnings.push('line ' + n + ': trailing whitespace')
    if (/\s/.test(key)) { errors.push('line ' + n + ': key "' + key + '" contains whitespace'); return }
    if (/^"(.*)"$/s.test(value) || /^'(.*)'$/s.test(value)) {
      value = value.slice(1, -1)
    } else {
      if (/^"/.test(value) || /^'/.test(value)) errors.push('line ' + n + ': ' + key + ' value starts with a quote but does not close it')
      if (value !== value.trim()) warnings.push('line ' + n + ': ' + key + ' value has leading/trailing whitespace (kept literally by dotenv)')
      if (/\s#/.test(value)) infos.push('line ' + n + ': ' + key + ' value contains " #" - some parsers treat it as an inline comment, quote the value to be safe')
      if (value.includes(' ')) infos.push('line ' + n + ': ' + key + ' value contains spaces unquoted - wrap in quotes for safety')
    }
    if (!value) { warnings.push('line ' + n + ': ' + key + ' is empty'); return }
    if (key !== key.toUpperCase() && /[a-z]/.test(key) && !key.includes('(')) warnings.push('line ' + n + ': key "' + key + '" is lowercase - convention is UPPER_SNAKE_CASE')
    if (seen.has(key)) { errors.push('line ' + n + ': duplicate key ' + key + ' (first defined on line ' + seen.get(key) + ' - dotenv keeps the LAST value, the earlier one is dead)') } else seen.set(key, n)
    if (KNOWN.has(key)) known.push(key)
    if (/KEY|TOKEN|SECRET|PASSWORD|MNEMONIC/i.test(key)) infos.push(key + ' looks like a credential - confirm .env is gitignored and never logged')
  })

  result.value = { keyCount, known: [...new Set(known)], errors, warnings, infos }
}

onMounted(() => { input.value = sample; scan() })
</script>
