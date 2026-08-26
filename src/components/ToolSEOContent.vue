<script setup lang="ts">
/**
 * Tool SEO content + FAQ, rendered below the router view on tool pages.
 * Data comes from scripts/faq-data.js - the same source the post-build
 * script uses for FAQPage structured data, so visible content and schema
 * always match. Only renders on routes present in the dataset.
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toolSEOContent, toolSpecificFAQ, generalToolFAQ } from '../../scripts/faq-data'

const route = useRoute()
const seoContent = computed(() => toolSEOContent[route.path])
const visibleFaqs = computed(() => {
  const specific = toolSpecificFAQ[route.path] || []
  return specific.length > 0 ? [...specific, ...generalToolFAQ.slice(0, 2)] : []
})
const toolTitle = computed(() => {
  const seg = route.path.split('/').filter(Boolean).pop() || 'Tool'
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
})
</script>

<template>
  <div v-if="seoContent" class="max-w-4xl mx-auto px-4 py-12 space-y-10">
    <div>
      <h2 class="text-2xl font-bold mb-3">About the {{ toolTitle }}</h2>
      <p v-if="seoContent.quote" class="leading-relaxed mb-3 text-foreground">
        {{ seoContent.quote }}
      </p>
      <p v-for="(para, i) in seoContent.intro" :key="i" class="text-muted-foreground leading-relaxed mb-3">
        {{ para }}
      </p>
      <ul v-if="seoContent.features?.length" class="space-y-2 mb-3">
        <li v-for="(feat, i) in seoContent.features" :key="i" class="flex items-start gap-2 text-muted-foreground">
          <span class="text-primary mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
          <span class="leading-relaxed">{{ feat }}</span>
        </li>
      </ul>
    </div>
    <div v-if="seoContent.useCases?.length">
      <h2 class="text-2xl font-bold mb-3">Use cases and examples</h2>
      <p v-for="(para, i) in seoContent.useCases" :key="i" class="text-muted-foreground leading-relaxed mb-3">
        {{ para }}
      </p>
      <pre v-if="seoContent.code" class="p-4 bg-muted rounded-lg overflow-x-auto text-xs font-mono whitespace-pre">{{ seoContent.code.content }}</pre>
    </div>
    <div>
      <h2 class="text-2xl font-bold mb-3">How to use</h2>
      <ol class="list-decimal list-inside space-y-2 text-muted-foreground">
        <li v-for="(step, i) in seoContent.howTo" :key="i">{{ step }}</li>
      </ol>
    </div>
    <div v-if="visibleFaqs.length">
      <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div class="space-y-2">
        <details v-for="(faq, i) in visibleFaqs" :key="i" class="group border border-border rounded-lg">
          <summary class="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between gap-4">
            {{ faq.question }}
            <span class="text-muted-foreground transition-transform group-open:rotate-180">&#9662;</span>
          </summary>
          <p class="px-4 pb-4 text-muted-foreground leading-relaxed">{{ faq.answer }}</p>
        </details>
      </div>
    </div>
  </div>
</template>
