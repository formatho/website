<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { funnels } from '@/data/funnels'
import { useSEO } from '@/composables/useSEO'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ArrowRight, ArrowDown, ArrowRightCircle, PackageCheck, ExternalLink, Timer, Workflow } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const route = useRoute()
const slug = computed(() => (route.params.slug as string) || route.path.split('/').filter(Boolean).pop() || '')
const funnel = computed(() => funnels.find((f) => f.slug === slug.value))
const siblings = computed(() => funnels.filter((f) => f.slug !== funnel.value?.slug))

useSEO({
  title: funnel.value ? `${funnel.value.name} Funnel — Tool Chain | Formatho` : 'Tool Funnels | Formatho',
  description: funnel.value?.seoDescription || 'Chained tool workflows.',
  keywords: funnel.value?.keywords || ['tool funnels'],
  ogType: 'website',
  canonicalUrl: funnel.value ? `https://formatho.com/funnels/${funnel.value.slug}` : undefined
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8" v-if="funnel">
    <Breadcrumb />
    <div class="mt-4 space-y-2">
      <div class="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <Workflow class="w-3.5 h-3.5" /> Funnel · {{ funnel.steps.length }} steps · ~{{ funnel.steps.reduce((t, s) => t + (s.minutes || 0), 0) }} min
      </div>
      <h1 class="text-3xl font-bold tracking-tight">{{ funnel.name }}</h1>
      <p class="text-muted-foreground">{{ funnel.tagline }}</p>
      <p class="text-sm text-muted-foreground"><strong>For:</strong> {{ funnel.audience }}</p>
    </div>

    <div class="space-y-0 mt-8">
      <template v-for="(s, i) in funnel.steps" :key="i">
        <Card>
          <CardContent class="pt-6 space-y-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-xs font-semibold text-muted-foreground">STEP {{ i + 1 }}</div>
                <h2 class="text-lg font-semibold mt-0.5">{{ s.title }}</h2>
                <div class="text-sm text-primary font-medium mt-0.5">{{ s.toolName }}</div>
              </div>
              <span v-if="s.minutes" class="text-xs text-muted-foreground flex items-center gap-1 shrink-0"><Timer class="w-3.5 h-3.5" /> {{ s.minutes }} min</span>
            </div>
            <div class="grid sm:grid-cols-2 gap-2 text-sm">
              <div class="rounded-lg bg-muted/50 p-3">
                <div class="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1"><ArrowRightCircle class="w-3.5 h-3.5" /> WHAT YOU BRING</div>
                {{ s.input }}
              </div>
              <div class="rounded-lg bg-primary/5 p-3">
                <div class="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1"><PackageCheck class="w-3.5 h-3.5" /> WHAT YOU LEAVE WITH</div>
                {{ s.output }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <Button @click="() => $router.push(`/tools/${s.toolRoute.split('/tools/')[1]}?funnel=${funnel.slug}&step=${i + 1}`)">
                Open {{ s.toolName }} <ArrowRight class="w-4 h-4 ml-2" />
              </Button>
              <a :href="`${s.toolRoute}?funnel=${funnel.slug}&step=${i + 1}`" target="_blank" class="text-xs text-muted-foreground inline-flex items-center gap-1 hover:underline">
                <ExternalLink class="w-3 h-3" /> new tab
              </a>
            </div>
          </CardContent>
        </Card>
        <div v-if="i < funnel.steps.length - 1" class="flex justify-center py-1">
          <div class="flex flex-col items-center text-muted-foreground">
            <ArrowDown class="w-4 h-4" />
            <span class="text-xs max-w-[240px] text-center mt-1">output of step {{ i + 1 }} feeds step {{ i + 2 }}</span>
          </div>
        </div>
      </template>
    </div>

    <div v-if="siblings.length" class="mt-12">
      <h3 class="text-sm font-semibold text-muted-foreground mb-3">Other funnels</h3>
      <div class="flex flex-wrap gap-2">
        <a v-for="f in siblings" :key="f.slug" :href="`/funnels/${f.slug}`"
          class="text-sm px-3 py-2 rounded-lg border hover:bg-muted inline-flex items-center gap-1">
          {{ f.name }} <ArrowRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>
