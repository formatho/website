<script setup lang="ts">
// Global funnel context bar. Renders on any tool page opened with
// ?funnel=<slug>&step=<n> — shows where the user is in the chain and
// where to go next. Mounted once in AppLayout; no per-tool wiring.
import { useRouter } from 'vue-router'
import { Workflow, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-vue-next'
import { useFunnel } from '@/composables/useFunnel'

const { active, funnel, step, stepNum, total, isLast, nextStep, nextUrl, prevUrl } = useFunnel()
const router = useRouter()
</script>

<template>
  <div v-if="active && funnel && step" class="border-b bg-primary/5" data-testid="funnel-bar">
    <div class="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <span class="inline-flex items-center gap-1.5 font-semibold">
        <Workflow class="w-4 h-4 text-primary" />
        {{ funnel.name }}
      </span>
      <span class="text-muted-foreground">
        Step {{ stepNum }} of {{ total }}: <strong class="text-foreground">{{ step.title }}</strong>
      </span>
      <span class="hidden md:inline text-xs text-muted-foreground">→ {{ step.output.split('.')[0] }}</span>
      <span class="flex-1"></span>
      <a :href="prevUrl" class="text-xs text-muted-foreground inline-flex items-center gap-1 hover:underline" @click.prevent="router.push(prevUrl)">
        <ArrowLeft class="w-3.5 h-3.5" /> {{ stepNum > 1 ? 'Previous' : 'Funnel' }}
      </a>
      <button
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
        data-testid="funnel-next"
        @click="router.push(nextUrl)"
      >
        <component :is="isLast ? CheckCircle2 : ArrowRight" class="w-3.5 h-3.5" />
        {{ isLast ? `Finish: back to funnel` : `Continue to ${nextStep?.toolName}` }}
      </button>
    </div>
    <!-- step progress dots -->
    <div class="max-w-4xl mx-auto px-4 pb-2 flex gap-1.5">
      <div
        v-for="(s, i) in funnel.steps"
        :key="i"
        class="h-1 flex-1 rounded-full"
        :class="i + 1 < stepNum ? 'bg-primary' : i + 1 === stepNum ? 'bg-primary/60' : 'bg-border'"
      ></div>
    </div>
  </div>
</template>
