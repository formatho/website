<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { devStacks } from '@/data/devStacks'
import { useSEO } from '@/composables/useSEO'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { ArrowRight, Lightbulb } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const stack = computed(() => devStacks.find(s => s.slug === route.params.stack))
const siblings = computed(() => devStacks.filter(s => s.slug !== stack.value?.slug))

useSEO({
  title: stack.value ? `${stack.value.name} - Free Online Tools | Formatho` : 'Developer Tools | Formatho',
  description: stack.value ? `${stack.value.blurb} Free, private, 100% client-side.` : 'Free developer tools.',
  keywords: stack.value ? [stack.value.name.toLowerCase(), `${stack.value.slug} tools`] : ['developer tools'],
  ogType: 'website',
  canonicalUrl: stack.value ? `https://formatho.com/dev-tools/${stack.value.slug}` : undefined
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8" v-if="stack">
    <Breadcrumb />

    <!-- Header -->
    <div class="mt-6 mb-8">
      <p class="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">Developer Tools</p>
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-3">{{ stack.name }}</h1>
      <p class="text-lg text-muted-foreground mb-2">{{ stack.tagline }}</p>
      <p class="text-base text-muted-foreground leading-relaxed max-w-3xl">{{ stack.blurb }}</p>
      <p class="text-sm text-primary mt-3 font-medium">{{ stack.whoFor }}</p>
    </div>

    <!-- Tools grid -->
    <h2 class="text-xl font-bold mb-4">Tools for {{ stack.name.split(' ')[0] }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <RouterLink
        v-for="tool in stack.tools"
        :key="tool.route"
        :to="tool.route"
        class="group border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold text-sm group-hover:text-primary transition-colors">{{ tool.name }}</h3>
          <ArrowRight class="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
        </div>
        <p class="text-xs text-muted-foreground leading-relaxed mt-1">{{ tool.desc }}</p>
      </RouterLink>
    </div>

    <!-- Tips -->
    <Card class="mb-10">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2"><Lightbulb class="w-4 h-4" /> Tips</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <p v-for="(tip, i) in stack.tips" :key="i" class="text-sm text-muted-foreground leading-relaxed">
          <strong class="text-foreground">{{ i + 1 }}.</strong> {{ tip }}
        </p>
      </CardContent>
    </Card>

    <!-- Other stacks -->
    <div class="border-t border-border pt-8">
      <h2 class="text-xl font-bold mb-4">Other tool stacks</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RouterLink
          v-for="sib in siblings"
          :key="sib.slug"
          :to="`/dev-tools/${sib.slug}`"
          class="group border border-border rounded-lg p-4 hover:border-primary/50 transition-colors text-center"
        >
          <p class="text-sm font-medium group-hover:text-primary transition-colors">{{ sib.name }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
