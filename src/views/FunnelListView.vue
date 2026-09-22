<script setup lang="ts">
import { funnels } from '@/data/funnels'
import { useSEO } from '@/composables/useSEO'
import { ArrowRight, Workflow, Timer } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

useSEO({
  title: 'Tool Funnels — Chained Workflows, Output to Input | Formatho',
  description:
    'Guided multi-tool workflows where one tool output feeds the next: from GTIN to a printable EU DPP QR code, or SPF to DMARC email hardening. Free, 100% client-side.',
  keywords: ['tool funnels', 'chained tools', 'developer workflow', 'dpp workflow', 'spf dmarc workflow'],
  ogType: 'website'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-8">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <Workflow class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">Tool Funnels</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Single tools are great; real work is a chain. Each funnel takes you through the tools in order —
        the output of one step is exactly the input the next step needs. 100% client-side.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card v-for="f in funnels" :key="f.slug" class="hover:shadow-md transition-shadow">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg">{{ f.name }}</CardTitle>
          <p class="text-sm text-muted-foreground">{{ f.tagline }}</p>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-xs text-muted-foreground"><strong>For:</strong> {{ f.audience }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="(s, i) in f.steps" :key="i" class="text-xs font-medium px-2 py-1 rounded-full bg-muted inline-flex items-center gap-1">
              {{ i + 1 }}. {{ s.toolName }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t">
            <span class="text-xs text-muted-foreground flex items-center gap-1">
              <Timer class="w-3.5 h-3.5" /> ~{{ f.steps.reduce((t, s) => t + (s.minutes || 0), 0) }} min total
            </span>
            <a :href="`/funnels/${f.slug}`" class="text-sm font-semibold inline-flex items-center gap-1 hover:underline">
              Start funnel <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
