<script setup lang="ts">
import { ref, computed } from 'vue'
import { encode } from 'gpt-tokenizer/model/gpt-4o'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'

const inputText = ref('')

// Computed properties for statistics
const tokenCount = computed(() => {
  return encode(inputText.value).length
})

const characterCount = computed(() => {
  return inputText.value.length
})

const wordCount = computed(() => {
  const trimmed = inputText.value.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
})

const clearText = () => {
  inputText.value = ''
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />
    
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Local Token Counter</h1>
      <Button variant="outline" @click="clearText" :disabled="!inputText">
        Clear Text
      </Button>
    </div>

    <!-- Privacy Notice -->
    <div class="glass-card p-4 text-center border-l-4 border-primary">
      <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span class="text-xl">🔒</span>
        <span class="font-medium">Privacy Check:</span>
        <span>This tool runs 100% in your browser. No data is sent to our servers.</span>
      </div>
    </div>

    <!-- Input Area -->
    <Card class="flex-1 flex flex-col min-h-0">
      <CardHeader class="pb-3">
        <CardTitle class="text-sm font-medium">Input Text</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 min-h-0">
        <Textarea
          v-model="inputText"
          class="h-full resize-none font-mono text-base"
          placeholder="Paste your text here..."
        />
      </CardContent>
    </Card>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Token Count (Primary Metric) -->
      <div class="glass-card p-6 text-center border-2 border-primary/30">
        <div class="text-gray-900">
          {{ tokenCount.toLocaleString() }}
        </div>
        <div class="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Tokens
        </div>
      </div>

      <!-- Character Count -->
      <div class="glass-card p-6 text-center">
        <div class="text-4xl font-bold mb-2">
          {{ characterCount.toLocaleString() }}
        </div>
        <div class="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Characters
        </div>
      </div>

      <!-- Word Count -->
      <div class="glass-card p-6 text-center">
        <div class="text-4xl font-bold mb-2">
          {{ wordCount.toLocaleString() }}
        </div>
        <div class="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Words
        </div>
      </div>
    </div>

    <!-- Model Info -->
    <div class="glass-card p-4">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <span class="font-medium">Model:</span>
        <span class="font-mono bg-muted px-2 py-1 rounded">GPT-4o (o200k_base encoding)</span>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/text-statistics"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Text Statistics</h3>
          <p class="text-sm text-muted-foreground">Analyze text with detailed statistics including reading time</p>
        </a>
        <a
          href="/json-formatter"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">JSON Formatter</h3>
          <p class="text-sm text-muted-foreground">Format, validate, and minify JSON data</p>
        </a>
        <a
          href="/text-transform"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Text Transform</h3>
          <p class="text-sm text-muted-foreground">Convert text case, encoding, and format</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
