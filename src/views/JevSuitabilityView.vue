<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap, CheckCircle2, XCircle, MinusCircle, ArrowRight } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Jev Suitability Test — Is Your Task Jev-Shaped? | Formatho',
  description:
    'Answer six questions to test whether your task fits Jev (TypeSafe System One): judgement not creation, bounded output, atomic, context-contained, fast-human, machine-consumed. Free, client-side.',
  keywords: ['jev suitability', 'is my task jev shaped', 'system one model test', 'when to use jev', 'jev vs llm', 'typesafe ai decision model'],
  ogType: 'website'
})

const taskDescription = ref('Route inbound support tickets to the right department based on the message content and customer tier.')

const criteria = [
  {
    key: 'judgement',
    title: 'Judgement, not creation',
    question: 'Is the AI deciding something rather than writing, summarizing, or composing content?',
    yes: 'The output picks a classification, detects a property, or scores a level.',
    no: 'If the deliverable is prose, code, or an explanation — that is generation, not judgement.'
  },
  {
    key: 'bounded',
    title: 'Bounded answer space',
    question: 'Can every possible answer be defined in advance?',
    yes: 'A fixed list of categories, a yes/no proposition, or an ordered scale covers all cases.',
    no: 'If answers are open-ended ("write a summary"), no predefined space exists.'
  },
  {
    key: 'atomic',
    title: 'One focused judgement',
    question: 'Can it be expressed as a single narrow question, not a multi-step plan?',
    yes: '"Is X present?", "Which of these?", "How severe?" — one call answers it.',
    no: 'Multi-stage reasoning with dependent steps belongs to a reasoning model (or several decomposed Jev calls).'
  },
  {
    key: 'context',
    title: 'Context-contained',
    question: 'Can everything needed be placed in the state you send?',
    yes: 'The records, messages, policies, or fields required fit in the request.',
    no: 'If judging requires external research or lookups you cannot include, Jev cannot do it.'
  },
  {
    key: 'fast-human',
    title: 'Fast human judgement',
    question: 'Could a knowledgeable expert answer in ~5 seconds given the context?',
    yes: 'A "gut-check" — they look at the state and immediately know.',
    no: 'If an expert would need to research, deliberate, or explain at length, it exceeds System One.'
  },
  {
    key: 'machine',
    title: 'Machine-consumed result',
    question: 'Will software use the answer directly to branch, route, or gate?',
    yes: 'The result feeds an if-statement, a router, or a threshold gate.',
    no: 'If a human reads the answer as prose, a plain LLM response may serve better.'
  }
] as const

const answers = ref<Record<string, 'yes' | 'no' | 'unsure'>>({})
for (const c of criteria) answers.value[c.key] = 'unsure'

const yesCount = computed(() => criteria.filter(c => answers.value[c.key] === 'yes').length)

const verdict = computed(() => {
  if (yesCount.value >= 5) {
    return {
      tone: 'green',
      headline: 'Excellent Jev candidate',
      detail: 'Your task has the System One shape: a bounded semantic judgement a fast expert could make, consumed by code. Express it as Noul (is X true?), Choice (which option?), or Score (where on the scale?) — or a fan-out of several, composed in your code.',
      action: 'Prototype it in the Jev Playground'
    }
  }
  if (yesCount.value >= 3) {
    return {
      tone: 'amber',
      headline: 'Partially Jev-shaped — decompose it',
      detail: 'Some criteria fit and some do not. Look for the narrow judgements hiding inside your task: the classification, the detection, the scoring step. Those go to Jev; the rest belongs to code, a reasoning model, or a human.',
      action: 'Decompose, then build the Jev parts in the Playground'
    }
  }
  return {
    tone: 'red',
    headline: 'Probably not a Jev task',
    detail: 'Too few criteria fit. If the task needs open-ended output, research, or multi-stage reasoning, use the right tool instead: an LLM for prose, a reasoning model for analysis, deterministic code for arithmetic, a human for strategy and risk.',
    action: 'Reconsider — or decompose until a judgement emerges'
  }
})

const suggestedPrimitive = computed(() => {
  // naive hint from the task text
  const t = taskDescription.value.toLowerCase()
  if (/classif|categor|route|department|intent|which|type/.test(t)) return 'Choice — one option wins from a fixed taxonomy; confidence gates the routing.'
  if (/sever|urgency|priority|score|rate|level|quality/.test(t)) return 'Score — an ordered scale of concrete situations; the answer can land between levels.'
  if (/detect|contain|is |does|presence|risk|safe/.test(t)) return 'Noul — a single yes/no probability; the number itself carries the uncertainty.'
  return 'Start with the narrowest yes/no question in your task — that is a Noul.'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center gap-2">
      <div class="p-1.5 bg-primary/10 rounded-lg"><Zap class="w-5 h-5 text-primary" /></div>
      <div>
        <h1 class="text-xl md:text-2xl font-bold">Jev Suitability Test</h1>
        <p class="text-xs text-muted-foreground">Six questions decide whether your task is Jev-shaped (TypeSafe System One) or belongs to a different tool. Everything runs locally.</p>
      </div>
    </div>

    <!-- Task -->
    <Card>
      <CardContent class="pt-5">
        <label class="text-xs text-muted-foreground mb-1 block">Describe the task you are considering</label>
        <Input v-model="taskDescription" class="text-sm h-10" aria-label="Task description" />
        <p class="text-[10px] text-muted-foreground mt-1.5">Suggested starting primitive for this task: <span class="text-foreground font-medium">{{ suggestedPrimitive }}</span></p>
      </CardContent>
    </Card>

    <!-- Criteria -->
    <div class="space-y-2">
      <Card v-for="c in criteria" :key="c.key" :class="{
        'border-green-500/40': answers[c.key] === 'yes',
        'border-red-500/30': answers[c.key] === 'no'
      }">
        <CardContent class="pt-4 pb-4">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <p class="text-sm font-semibold">{{ c.title }}</p>
              <p class="text-xs text-muted-foreground mt-0.5">{{ c.question }}</p>
            </div>
            <div class="flex gap-1 shrink-0">
              <button
                class="text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1"
                :class="answers[c.key] === 'yes' ? 'border-green-500 bg-green-500/10 text-green-700' : 'border-border text-muted-foreground hover:border-foreground/30'"
                :aria-label="c.title + ': yes'"
                @click="answers[c.key] = answers[c.key] === 'yes' ? 'unsure' : 'yes'"
              ><CheckCircle2 class="w-3.5 h-3.5" /> Yes</button>
              <button
                class="text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1"
                :class="answers[c.key] === 'no' ? 'border-red-500 bg-red-500/10 text-red-700' : 'border-border text-muted-foreground hover:border-foreground/30'"
                :aria-label="c.title + ': no'"
                @click="answers[c.key] = answers[c.key] === 'no' ? 'unsure' : 'no'"
              ><XCircle class="w-3.5 h-3.5" /> No</button>
              <button
                class="text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1"
                :class="answers[c.key] === 'unsure' ? 'border-primary/40 bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-foreground/30'"
                :aria-label="c.title + ': unsure'"
                @click="answers[c.key] = 'unsure'"
              ><MinusCircle class="w-3.5 h-3.5" /> ?</button>
            </div>
          </div>
          <p v-if="answers[c.key] !== 'unsure'" class="text-[11px] leading-relaxed px-3 py-2 rounded-lg"
            :class="answers[c.key] === 'yes' ? 'bg-green-500/5 text-muted-foreground' : 'bg-red-500/5 text-muted-foreground'">
            <template v-if="answers[c.key] === 'yes'">✓ {{ c.yes }}</template>
            <template v-else>✗ {{ c.no }}</template>
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Verdict -->
    <Card :class="{
      'border-green-500/50': verdict.tone === 'green',
      'border-amber-500/50': verdict.tone === 'amber',
      'border-red-500/40': verdict.tone === 'red'
    }">
      <CardContent class="pt-5 pb-5">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <div class="text-3xl font-black font-mono"
              :class="{ 'text-green-600': verdict.tone === 'green', 'text-amber-600': verdict.tone === 'amber', 'text-red-500': verdict.tone === 'red' }">
              {{ yesCount }}<span class="text-base text-muted-foreground">/6</span>
            </div>
            <h2 class="text-lg font-bold">{{ verdict.headline }}</h2>
          </div>
          <RouterLink
            v-if="verdict.tone !== 'red'"
            to="/tools/jev-playground"
            class="inline-flex items-center gap-1.5 text-xs px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
          >{{ verdict.action }} <ArrowRight class="w-3.5 h-3.5" /></RouterLink>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">{{ verdict.detail }}</p>
      </CardContent>
    </Card>

    <!-- Reference -->
    <Card>
      <CardHeader class="pb-2"><CardTitle class="text-sm font-medium">The decision table</CardTitle></CardHeader>
      <CardContent>
        <table class="w-full text-xs">
          <thead><tr class="border-b border-border text-left bg-muted/30"><th class="p-2">Need</th><th class="p-2">Prefer</th></tr></thead>
          <tbody class="text-muted-foreground">
            <tr v-for="row in [
              ['Exact calculation, lookup, known rule', 'Code'],
              ['Quick semantic judgement, classification, scoring, verification', 'Jev'],
              ['Complex multi-stage reasoning, research', 'Reasoning LLM'],
              ['Writing prose, generating code, explanations', 'LLM'],
              ['Objectives, strategy, acceptable risk', 'Human']
            ]" :key="row[0]" class="border-b border-border/40">
              <td class="p-2">{{ row[0] }}</td>
              <td class="p-2 font-medium text-foreground">{{ row[1] }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-[10px] text-muted-foreground mt-3">Shorthand: <em>code calculates, Jev judges, LLMs reason and create, humans determine objectives and risk.</em> Concept credit: TypeSafe AI's System One guidance.</p>
      </CardContent>
    </Card>
  </div>
</template>
