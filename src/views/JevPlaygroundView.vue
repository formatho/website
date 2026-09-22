<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Plus, Trash2, Play, Zap, Boxes, Gauge, AlertCircle, CheckCircle2, ShieldCheck, Key, Loader2, ExternalLink } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Jev Playground — Build System One Requests | Formatho',
  description:
    'Build Jev (TypeSafe System One) requests visually: state plus Noul, Choice, and Score questions. Live mock responses with probability distributions. Generates Python SDK code. Free, client-side.',
  keywords: ['jev playground', 'jev api builder', 'typesafe jev', 'system one model', 'jev request example', 'noul choice score', 'jev python sdk'],
  ogType: 'website'
})

// ─── State ───
const stateJson = ref(`{
  "ticket_message": "My flight was cancelled and I still have not received my money. This is the third time I am asking.",
  "refund_policy": "Cancelled flights are eligible for a full refund within 7 days.",
  "account": { "tier": "gold", "previous_refunds": 1 }
}`)

const stateError = computed(() => {
  try { JSON.parse(stateJson.value); return '' } catch (e) { return (e as Error).message }
})

interface BaseQ { id: string; type: 'noul' | 'choice' | 'score'; instructions: string }
interface NoulQ extends BaseQ { type: 'noul'; criteriaYes: string }
interface ChoiceQ extends BaseQ { type: 'choice'; options: Array<{ label: string; description: string }> }
interface ScoreQ extends BaseQ { type: 'score'; levels: string[] }
type Question = NoulQ | ChoiceQ | ScoreQ

const questions = ref<Question[]>([
  { id: 'refund_requested', type: 'noul', instructions: 'Does `ticket_message` request a refund?', criteriaYes: 'Yes only if the customer explicitly wants money returned.' },
  { id: 'request_type', type: 'choice', instructions: 'What is the main request in `ticket_message`?', options: [
    { label: 'refund', description: 'The customer wants money returned.' },
    { label: 'rebooking', description: 'The customer wants a replacement flight.' },
    { label: 'information', description: 'The customer is asking for information only.' }
  ] },
  { id: 'frustration', type: 'score', instructions: 'How frustrated does the customer appear in `ticket_message`?', levels: [
    'Calm and neutral.',
    'Concerned but civil.',
    'Very angry or using strong language.'
  ] }
])

const nextId = ref(4)
function addQuestion(type: Question['type']) {
  const id = `question_${nextId.value++}`
  if (type === 'noul') questions.value.push({ id, type, instructions: '', criteriaYes: '' })
  else if (type === 'choice') questions.value.push({ id, type, instructions: '', options: [{ label: 'option_a', description: '' }, { label: 'option_b', description: '' }] })
  else questions.value.push({ id, type, instructions: '', levels: ['Level 0 situation.', 'Level 1 situation.'] })
}
function removeQuestion(i: number) { questions.value.splice(i, 1) }

const copied = ref('')
async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => { copied.value = '' }, 1500)
  } catch { /* clipboard unavailable */ }
}

// ─── Question JSON (SDK shape) ───
function questionJson(q: Question): string {
  if (q.type === 'noul') {
    const criteria = q.criteriaYes ? `\n        "yes": ${JSON.stringify(q.criteriaYes)}` : ''
    return `  "${q.id}": {
    "type": "noul",
    "instructions": ${JSON.stringify(q.instructions)}${criteria ? `,${criteria}\n      ` : ''}
  }`
  }
  if (q.type === 'choice') {
    const entries = q.options.filter(o => o.label).map(o => `      ${JSON.stringify(o.label)}: ${JSON.stringify(o.description || o.label)}`).join(',\n')
    return `  "${q.id}": {
    "type": "choice",
    "instructions": ${JSON.stringify(q.instructions)},
    "criteria": {
${entries}
    }
  }`
  }
  const levels = q.levels.filter(Boolean).map(l => `      ${JSON.stringify(l)}`).join(',\n')
  return `  "${q.id}": {
    "type": "score",
    "instructions": ${JSON.stringify(q.instructions)},
    "criteria": [
${levels}
    ]
  }`
}

const questionsJson = computed(() => {
  const valid = questions.value.filter(q => q.instructions.trim())
  if (!valid.length) return '{}'
  return `{\n${valid.map(questionJson).join(',\n')}\n}`
})

// ─── Python SDK snippet ───
function pyConstructor(q: Question): string {
  if (q.type === 'noul') {
    const c = q.criteriaYes ? `,\n        criteria=${JSON.stringify(q.criteriaYes)}` : ''
    return `    "${q.id}": Noul(
        instructions=${JSON.stringify(q.instructions)}${c}
    )`
  }
  if (q.type === 'choice') {
    const entries = q.options.filter(o => o.label).map(o => `            ${JSON.stringify(o.label)}: ${JSON.stringify(o.description || o.label)}`).join(',\n')
    return `    "${q.id}": Choice(
        instructions=${JSON.stringify(q.instructions)},
        criteria={
${entries}
        }
    )`
  }
  const levels = q.levels.filter(Boolean).map(l => `            ${JSON.stringify(l)}`).join(',\n')
  return `    "${q.id}": Score(
        instructions=${JSON.stringify(q.instructions)},
        criteria=[
${levels}
        ]
    )`
}

const pythonCode = computed(() => {
  const valid = questions.value.filter(q => q.instructions.trim())
  const types = new Set(valid.map(q => q.type === 'noul' ? 'Noul' : q.type === 'choice' ? 'Choice' : 'Score'))
  const imports = [...types].sort().join(', ')
  return `from typesafe_sdk import TypeSafeClient${types.size ? ', ' + imports : ''}

state = ${JSON.stringify(JSON.parse(stateJson.value || '{}'), null, 4)}

with TypeSafeClient() as client:
    response = client.system_one(
        state=state,
        questions={
${valid.map(pyConstructor).join(',\n')}
        }
    )

# typed answers with probabilities and confidence
${valid.map(q => {
    if (q.type === 'noul') return `print(response.answers["${q.id}"].noul)      # 0-1 probability`
    if (q.type === 'choice') return `print(response.answers["${q.id}"].choice)  # winning option`
    return `print(response.answers["${q.id}"].score)    # position on scale`
  }).join('\n')}`
})

const requestValid = computed(() => !stateError.value && questions.value.some(q => q.instructions.trim()))

// ─── Mock response (local, no API call) ───
function seededRandom(seed: string): () => number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296 }
}
function mockDist(rand: () => number, n: number): number[] {
  const raw = Array.from({ length: n }, () => rand() ** 3)
  const sum = raw.reduce((a, b) => a + b, 0) || 1
  return raw.map(v => v / sum)
}

interface MockAnswer { id: string; type: string; headline: string; dist: Array<{ label: string; p: number }>; confidence: number }
const mockAnswers = ref<MockAnswer[]>([])

function generateMock() {
  const out: MockAnswer[] = []
  for (const q of questions.value) {
    if (!q.instructions.trim()) continue
    const rand = seededRandom(q.id + q.instructions)
    if (q.type === 'noul') {
      const p = Math.round((0.15 + rand() * 0.8) * 100) / 100
      out.push({ id: q.id, type: 'noul', headline: `noul = ${p}`, dist: [{ label: 'no', p: 1 - p }, { label: 'yes', p }], confidence: p })
    } else if (q.type === 'choice') {
      const opts = q.options.filter(o => o.label)
      const dist = mockDist(rand, opts.length)
      const winner = dist.indexOf(Math.max(...dist))
      const sorted = [...dist].sort((a, b) => b - a)
      const confidence = Math.round((sorted[0] - sorted[1]) * 100) / 100
      out.push({ id: q.id, type: 'choice', headline: `choice = "${opts[winner]?.label}"`, dist: opts.map((o, i) => ({ label: o.label, p: dist[i] })), confidence })
    } else {
      const n = q.levels.filter(Boolean).length
      const dist = mockDist(rand, n)
      const score = Math.round(dist.reduce((s, p, i) => s + p * i, 0) * 10) / 10
      const sorted = [...dist].sort((a, b) => b - a)
      out.push({ id: q.id, type: 'score', headline: `score = ${score} (of 0–${n - 1})`, dist: q.levels.filter(Boolean).map((l, i) => ({ label: `L${i}`, p: dist[i] })), confidence: Math.round((sorted[0] - sorted[1]) * 100) / 100 })
    }
  }
  mockAnswers.value = out
}
watch(requestValid, (v) => { if (v) generateMock() }, { immediate: true })

// ─── Live API mode (your key, direct to Jev — never touches our servers) ───
// Direct calls to api.typesafe.ai fail CORS (no Access-Control-Allow-Origin).
// Our proxy adds the header and passes through — the key still goes only to
// TypeSafe's servers, we just relay it.
const JEV_ENDPOINT = '/api/jev/systemone'
const apiKey = ref('')
const showKeyInput = ref(false)
const liveLoading = ref(false)
const liveError = ref('')
const liveAnswers = ref<MockAnswer[]>([])
const liveUsage = ref<{ input: number; output: number; latency: number } | null>(null)

// restore key from localStorage on mount (client only)
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('jev-api-key')
  if (saved) apiKey.value = saved
}

function saveKey() {
  try { localStorage.setItem('jev-api-key', apiKey.value) } catch { /* storage blocked */ }
  showKeyInput.value = false
}
function clearKey() {
  apiKey.value = ''
  try { localStorage.removeItem('jev-api-key') } catch { /* storage blocked */ }
}

function buildApiQuestions(): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const q of questions.value) {
    if (!q.instructions.trim()) continue
    if (q.type === 'noul') {
      out[q.id] = q.criteriaYes
        ? { type: 'noul', instructions: q.instructions, criteria: { true: q.criteriaYes } }
        : { type: 'noul', instructions: q.instructions }
    } else if (q.type === 'choice') {
      const criteria: Record<string, string | null> = {}
      for (const o of q.options.filter(o => o.label)) criteria[o.label] = o.description || null
      out[q.id] = { type: 'choice', instructions: q.instructions, criteria }
    } else {
      out[q.id] = { type: 'score', instructions: q.instructions, criteria: q.levels.filter(Boolean) }
    }
  }
  return out
}

async function runLive() {
  liveError.value = ''
  liveAnswers.value = []
  liveUsage.value = null
  if (!apiKey.value.trim()) { liveError.value = 'Enter your TypeSafe API key first.'; showKeyInput.value = true; return }
  if (!requestValid.value) { liveError.value = 'Fix the state or add a question first.'; return }

  saveKey()
  liveLoading.value = true
  const t0 = performance.now()
  try {
    const res = await fetch(JEV_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey.value}` },
      body: JSON.stringify({ state: JSON.parse(stateJson.value), model: 'jev-latest', questions: buildApiQuestions() })
    })
    const latency = Math.round(performance.now() - t0)

    if (res.status === 401) throw new Error('Invalid API key — check it at console.typesafe.ai')
    if (res.status === 422) {
      const d = await res.json().catch(() => ({}))
      throw new Error(`Validation: ${JSON.stringify(d).slice(0, 200)}`)
    }
    if (res.status === 429) throw new Error('Rate limited — wait a moment and retry')
    if (res.status === 529) throw new Error('Jev is overloaded — retry shortly')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    liveUsage.value = { input: data.usage?.input_tokens ?? 0, output: data.usage?.output_tokens ?? 0, latency }

    const out: MockAnswer[] = []
    for (const [id, answer] of Object.entries(data.answers || {})) {
      const a = answer as Record<string, unknown>
      if (a.type === 'noul') {
        const p = Number(a.noul) || 0
        out.push({ id, type: 'noul', headline: `noul = ${p}`, dist: [{ label: 'no', p: 1 - p }, { label: 'yes', p }], confidence: p })
      } else if (a.type === 'choice') {
        const probs = (a.probabilities || {}) as Record<string, number>
        const dist = Object.entries(probs).map(([label, p]) => ({ label, p }))
        out.push({ id, type: 'choice', headline: `choice = "${a.choice}"`, dist, confidence: Number(a.confidence) || 0 })
      } else if (a.type === 'score') {
        const probs = (a.probabilities || {}) as Record<string, number>
        const legend = (a.legend || {}) as Record<string, string>
        const dist = Object.entries(probs).map(([lvl, p]) => ({ label: `L${lvl}`, p }))
        out.push({ id, type: 'score', headline: `score = ${a.score}`, dist, confidence: Number(a.confidence) || 0 })
      }
    }
    liveAnswers.value = out
  } catch (e) {
    liveError.value = (e as Error).message
  } finally {
    liveLoading.value = false
  }
}
function fillSample() {
  stateJson.value = JSON.stringify({
    incident: {
      description: 'Tenant at 12 Oak Road reports the back door has been broken for two weeks. There is a child under 5 in the property and the temperature is dropping.',
      service: 'Supported Housing'
    },
    policy: {
      safeguarding: 'Any environmental risk to a child under 5 in a property we manage requires same-day escalation to the safeguarding team.'
    }
  }, null, 2)
  questions.value = [
    { id: 'safeguarding_risk', type: 'noul', instructions: 'Does `incident.description` indicate a safeguarding risk to a child?', criteriaYes: 'Yes if environmental conditions could harm a child under 5.' },
    { id: 'escalation_required', type: 'noul', instructions: 'Does the incident meet the escalation criteria in `policy.safeguarding`?', criteriaYes: '' },
    { id: 'owning_team', type: 'choice', instructions: 'Which team should own this incident?', options: [
      { label: 'safeguarding', description: 'Child protection or vulnerability concerns.' },
      { label: 'housing_repairs', description: 'Standard property maintenance.' },
      { label: 'tenancy_support', description: 'Tenant wellbeing, non-urgent.' }
    ] },
    { id: 'severity', type: 'score', instructions: 'How severe is the situation in `incident.description`?', levels: [
      'No operational impact.',
      'Degraded living conditions but workaround exists.',
      'Significant harm possible without urgent action.',
      'Immediate danger; action required today.'
    ] }
  ]
  nextId.value = 5
  generateMock()
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-4 space-y-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-primary/10 rounded-lg"><Zap class="w-5 h-5 text-primary" /></div>
        <div>
          <h1 class="text-xl md:text-2xl font-bold">Jev Playground</h1>
          <p class="text-xs text-muted-foreground">Build TypeSafe System One requests — state plus Noul, Choice, and Score questions. Everything runs locally.</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck class="w-4 h-4 text-green-600" /> Your key stays in your browser — calls go direct to Jev</span>
        <Button variant="outline" size="sm" @click="fillSample">Sample</Button>
      </div>
    </div>

    <Tabs default-value="build" class="space-y-3">
      <TabsList>
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="mock">Mock</TabsTrigger>
        <TabsTrigger value="live">Live ⚡</TabsTrigger>
        <TabsTrigger value="code">Python SDK</TabsTrigger>
        <TabsTrigger value="about">How Jev works</TabsTrigger>
      </TabsList>

      <!-- BUILD -->
      <TabsContent value="build" class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">State — what Jev evaluates</CardTitle></CardHeader>
          <CardContent>
            <textarea
              v-model="stateJson"
              rows="12"
              class="w-full font-mono text-xs p-3 border border-border rounded-lg bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="State JSON"
              spellcheck="false"
            />
            <p v-if="stateError" class="text-[10px] text-red-500 mt-1 font-mono">{{ stateError }}</p>
            <p v-else class="text-[10px] text-muted-foreground mt-1">Structured objects keep relationships explicit — questions can reference fields like <code class="font-mono">incident.description</code>.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium">Questions — typed, evaluated in parallel</CardTitle>
            <div class="flex gap-1.5 mt-2">
              <Button size="sm" variant="outline" class="h-7 text-xs" @click="addQuestion('noul')"><Plus class="w-3 h-3 mr-0.5" /> Noul</Button>
              <Button size="sm" variant="outline" class="h-7 text-xs" @click="addQuestion('choice')"><Plus class="w-3 h-3 mr-0.5" /> Choice</Button>
              <Button size="sm" variant="outline" class="h-7 text-xs" @click="addQuestion('score')"><Plus class="w-3 h-3 mr-0.5" /> Score</Button>
            </div>
          </CardHeader>
          <CardContent class="space-y-3 max-h-[520px] overflow-y-auto">
            <div v-for="(q, i) in questions" :key="i" class="border border-border rounded-lg p-3 space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase"
                  :class="{ 'bg-blue-100 text-blue-700': q.type === 'noul', 'bg-purple-100 text-purple-700': q.type === 'choice', 'bg-amber-100 text-amber-700': q.type === 'score' }">{{ q.type }}</span>
                <Input v-model="q.id" class="font-mono text-xs h-7 flex-1" aria-label="Question ID" />
                <Button variant="ghost" size="sm" class="h-7 px-1.5" aria-label="Remove question" @click="removeQuestion(i)"><Trash2 class="w-3.5 h-3.5 text-muted-foreground" /></Button>
              </div>
              <Input v-model="q.instructions" class="text-xs h-8" placeholder="Question Jev evaluates against the state…" aria-label="Instructions" />
              <template v-if="q.type === 'noul'">
                <Input v-model="q.criteriaYes" class="text-xs h-8" placeholder="Optional: what counts as yes" aria-label="Yes criteria" />
              </template>
              <template v-else-if="q.type === 'choice'">
                <div v-for="(opt, oi) in q.options" :key="oi" class="flex gap-1.5">
                  <Input v-model="opt.label" class="font-mono text-xs h-7 w-32 shrink-0" placeholder="label" aria-label="Option label" />
                  <Input v-model="opt.description" class="text-xs h-7 flex-1" placeholder="description" aria-label="Option description" />
                  <Button variant="ghost" size="sm" class="h-7 px-1" aria-label="Remove option" @click="q.options.splice(oi, 1)"><Trash2 class="w-3 h-3 text-muted-foreground" /></Button>
                </div>
                <Button size="sm" variant="ghost" class="h-6 text-xs" @click="q.options.push({ label: '', description: '' })"><Plus class="w-3 h-3 mr-0.5" /> option</Button>
              </template>
              <template v-else>
                <div v-for="(lvl, li) in q.levels" :key="li" class="flex gap-1.5 items-center">
                  <span class="text-[10px] font-mono text-muted-foreground w-5 shrink-0">L{{ li }}</span>
                  <Input v-model="q.levels[li]" class="text-xs h-7 flex-1" :placeholder="`Concrete situation for level ${li}…`" aria-label="Level description" />
                  <Button v-if="q.levels.length > 2" variant="ghost" size="sm" class="h-7 px-1" aria-label="Remove level" @click="q.levels.splice(li, 1)"><Trash2 class="w-3 h-3 text-muted-foreground" /></Button>
                </div>
                <div class="flex items-center gap-2">
                  <Button v-if="q.levels.length < 10" size="sm" variant="ghost" class="h-6 text-xs" @click="q.levels.push('')"><Plus class="w-3 h-3 mr-0.5" /> level</Button>
                  <span v-if="q.levels.some(l => /^(low|medium|high|minor|major)$/i.test(l.trim()))" class="text-[10px] text-amber-600 flex items-center gap-1">
                    <AlertCircle class="w-3 h-3" /> vague adjectives — describe concrete situations instead
                  </span>
                </div>
              </template>
            </div>
            <p v-if="!questions.length" class="text-xs text-muted-foreground text-center py-6">Add a Noul, Choice, or Score question to begin.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- MOCK -->
      <TabsContent value="mock" class="space-y-3">
        <Card class="border-primary/30">
          <CardContent class="pt-5 flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs text-muted-foreground max-w-xl">
              <strong class="text-foreground">Mock responses</strong> are generated locally with seeded randomness — no API call, no key, no data leaving this tab. They show the <em>shape</em> of Jev's typed answers. Use the <strong>Live ⚡</strong> tab for real Jev responses.
            </p>
            <Button size="sm" @click="generateMock" :disabled="!requestValid"><Play class="w-3.5 h-3.5 mr-1" /> Regenerate</Button>
          </CardContent>
        </Card>
        <div v-for="a in mockAnswers" :key="a.id" class="border border-border rounded-lg p-4">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase"
              :class="{ 'bg-blue-100 text-blue-700': a.type === 'noul', 'bg-purple-100 text-purple-700': a.type === 'choice', 'bg-amber-100 text-amber-700': a.type === 'score' }">{{ a.type }}</span>
            <code class="text-xs font-semibold">{{ a.id }}</code>
            <code class="ml-auto text-sm font-mono text-primary">{{ a.headline }}</code>
            <span v-if="a.type !== 'noul'" class="text-[10px] text-muted-foreground">confidence {{ a.confidence.toFixed(2) }}</span>
          </div>
          <div class="space-y-1">
            <div v-for="d in a.dist" :key="d.label" class="flex items-center gap-2 text-xs">
              <code class="w-24 text-right text-muted-foreground font-mono truncate">{{ d.label }}</code>
              <div class="flex-1 h-4 bg-muted rounded overflow-hidden">
                <div class="h-full bg-primary/60 transition-all" :style="{ width: (d.p * 100).toFixed(1) + '%' }" />
              </div>
              <code class="w-12 font-mono">{{ d.p.toFixed(2) }}</code>
            </div>
          </div>
        </div>
        <p v-if="!mockAnswers.length" class="text-xs text-muted-foreground text-center py-8">Fill in at least one question to see the response shape.</p>
      </TabsContent>

      <!-- LIVE -->
      <TabsContent value="live" class="space-y-3">
        <Card class="border-green-500/30">
          <CardContent class="pt-5 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-xs text-muted-foreground max-w-lg">
                <strong class="text-foreground">Real Jev responses.</strong> Your API key is stored in this browser's localStorage only and forwarded directly to the Jev API — Formatho never stores or logs it.
              </p>
              <div class="flex items-center gap-2">
                <template v-if="!showKeyInput && apiKey">
                  <span class="flex items-center gap-1.5 text-xs text-green-700"><Key class="w-3.5 h-3.5" /> ••••••••{{ apiKey.slice(-4) }}</span>
                  <Button variant="ghost" size="sm" class="h-7 text-xs" @click="showKeyInput = true">Change</Button>
                  <Button variant="ghost" size="sm" class="h-7 text-xs text-red-500" @click="clearKey">Remove</Button>
                </template>
                <template v-else>
                  <Input v-model="apiKey" type="password" class="font-mono text-xs h-8 w-56" placeholder="TypeSafe API key" aria-label="TypeSafe API key" />
                  <Button variant="outline" size="sm" class="h-7 text-xs" @click="saveKey">Save</Button>
                </template>
                <a href="https://console.typesafe.ai" target="_blank" rel="noopener noreferrer" class="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-0.5">
                  Get a key <ExternalLink class="w-3 h-3" />
                </a>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Button size="sm" @click="runLive" :disabled="liveLoading || !requestValid">
                <Loader2 v-if="liveLoading" class="w-3.5 h-3.5 mr-1 animate-spin" />
                <Play v-else class="w-3.5 h-3.5 mr-1" />
                {{ liveLoading ? 'Calling Jev…' : 'Run against Jev' }}
              </Button>
              <span v-if="liveUsage" class="text-xs text-muted-foreground font-mono">
                {{ liveUsage.latency }}ms · {{ liveUsage.input }} in / {{ liveUsage.output }} out tokens
              </span>
            </div>
          </CardContent>
        </Card>

        <Card v-if="liveError" class="border-red-500/40">
          <CardContent class="pt-5 flex items-start gap-2">
            <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p class="text-xs font-mono text-red-600">{{ liveError }}</p>
          </CardContent>
        </Card>

        <div v-for="a in liveAnswers" :key="a.id" class="border border-green-500/20 rounded-lg p-4">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase"
              :class="{ 'bg-blue-100 text-blue-700': a.type === 'noul', 'bg-purple-100 text-purple-700': a.type === 'choice', 'bg-amber-100 text-amber-700': a.type === 'score' }">{{ a.type }}</span>
            <code class="text-xs font-semibold">{{ a.id }}</code>
            <code class="ml-auto text-sm font-mono text-green-700">{{ a.headline }}</code>
            <span v-if="a.type !== 'noul'" class="text-[10px] text-muted-foreground">confidence {{ a.confidence.toFixed(2) }}</span>
          </div>
          <div class="space-y-1">
            <div v-for="d in a.dist" :key="d.label" class="flex items-center gap-2 text-xs">
              <code class="w-24 text-right text-muted-foreground font-mono truncate">{{ d.label }}</code>
              <div class="flex-1 h-4 bg-muted rounded overflow-hidden">
                <div class="h-full bg-green-500/60 transition-all" :style="{ width: (d.p * 100).toFixed(1) + '%' }" />
              </div>
              <code class="w-12 font-mono">{{ d.p.toFixed(2) }}</code>
            </div>
          </div>
        </div>
        <p v-if="!liveAnswers.length && !liveError && !liveLoading" class="text-xs text-muted-foreground text-center py-8">
          Enter your API key and hit "Run against Jev" to get real responses.
        </p>
      </TabsContent>

      <!-- CODE -->
      <TabsContent value="code" class="space-y-3">
        <Card>
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <CardTitle class="text-sm font-medium">Python — typesafe_sdk</CardTitle>
              <Button variant="outline" size="sm" class="h-7 text-xs" @click="copyText(pythonCode, 'py')">
                <Check v-if="copied === 'py'" class="w-3.5 h-3.5 mr-1 text-green-600" />
                <Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre class="text-[11px] font-mono whitespace-pre-wrap break-all border border-border rounded-lg p-3 max-h-[520px] overflow-y-auto bg-muted/20 m-0">{{ pythonCode }}</pre>
            <p class="text-[10px] text-muted-foreground mt-2">Run it from your terminal with your own credentials — this page never needs your API key. Verify the current SDK shape against <a href="https://docs.typesafe.ai" class="text-primary underline underline-offset-2" rel="noopener noreferrer" target="_blank">docs.typesafe.ai</a>.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <CardTitle class="text-sm font-medium">Questions JSON (SDK shape)</CardTitle>
              <Button variant="outline" size="sm" class="h-7 text-xs" @click="copyText(questionsJson, 'qj')">
                <Check v-if="copied === 'qj'" class="w-3.5 h-3.5 mr-1 text-green-600" />
                <Copy v-else class="w-3.5 h-3.5 mr-1" /> Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre class="text-[11px] font-mono whitespace-pre-wrap break-all border border-border rounded-lg p-3 max-h-80 overflow-y-auto bg-muted/20 m-0">{{ questionsJson }}</pre>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- ABOUT -->
      <TabsContent value="about" class="space-y-4">
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">The model in one line</CardTitle></CardHeader>
          <CardContent class="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p><strong class="text-foreground">State + typed questions in → probability distributions out.</strong> Jev (TypeSafe AI's System One model) doesn't generate text — you predefine the answer space, and it returns structured answers your code branches on. <em>Code calculates; Jev judges.</em></p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <div class="border border-border rounded-lg p-3">
                <p class="font-semibold text-foreground text-xs mb-1">Noul</p>
                <p>"Is this true?" → 0–1 probability. The probability itself carries the uncertainty; no separate confidence.</p>
              </div>
              <div class="border border-border rounded-lg p-3">
                <p class="font-semibold text-foreground text-xs mb-1">Choice</p>
                <p>One winner from up to 255 predefined options, with the full distribution and a confidence value.</p>
              </div>
              <div class="border rounded-lg p-3 border-border">
                <p class="font-semibold text-foreground text-xs mb-1">Score</p>
                <p>Position on 2–10 concrete levels; can land between them (probability-weighted). Design levels as situations, not adjectives.</p>
              </div>
            </div>
            <p class="pt-1"><strong class="text-foreground">Parallel and independent.</strong> Questions in one request evaluate against shared state without seeing each other — fan out semantic questions, compose answers in code. If B truly depends on A, make it a second request.</p>
            <p><strong class="text-foreground">Calibration ≠ correctness.</strong> "Zero hallucinations" means no output outside your schema — Jev can still judge wrongly with high confidence. Gate automation on confidence thresholds you validate against your own data. Check the <RouterLink to="/tools/jev-suitability" class="text-primary underline underline-offset-2">suitability tester</RouterLink> before sending a task to Jev at all.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
