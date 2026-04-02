<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const searchQuery = ref('')

const regexPatterns = [
  {
    category: 'Character Classes',
    patterns: [
      { pattern: '.', desc: 'Any character except newline' },
      { pattern: '\\d', desc: 'Digit (0-9)' },
      { pattern: '\\D', desc: 'Non-digit' },
      { pattern: '\\w', desc: 'Word character (a-z, A-Z, 0-9, _)' },
      { pattern: '\\W', desc: 'Non-word character' },
      { pattern: '\\s', desc: 'Whitespace (space, tab, newline)' },
      { pattern: '\\S', desc: 'Non-whitespace' }
    ]
  },
  {
    category: 'Anchors',
    patterns: [
      { pattern: '^', desc: 'Start of string' },
      { pattern: '$', desc: 'End of string' },
      { pattern: '\\b', desc: 'Word boundary' },
      { pattern: '\\B', desc: 'Non-word boundary' }
    ]
  },
  {
    category: 'Quantifiers',
    patterns: [
      { pattern: '*', desc: 'Zero or more' },
      { pattern: '+', desc: 'One or more' },
      { pattern: '?', desc: 'Zero or one (optional)' },
      { pattern: '{n}', desc: 'Exactly n times' },
      { pattern: '{n,}', desc: 'n or more times' },
      { pattern: '{n,m}', desc: 'Between n and m times' }
    ]
  },
  {
    category: 'Groups',
    patterns: [
      { pattern: '(...)', desc: 'Capturing group' },
      { pattern: '(?:...)', desc: 'Non-capturing group' },
      { pattern: '(?=...)', desc: 'Positive lookahead' },
      { pattern: '(?!...)', desc: 'Negative lookahead' }
    ]
  },
  {
    category: 'Common Patterns',
    patterns: [
      { pattern: '[a-zA-Z]', desc: 'Any letter' },
      { pattern: '[0-9]', desc: 'Any digit' },
      { pattern: '[a-zA-Z0-9]', desc: 'Alphanumeric' },
      { pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', desc: 'Email' },
      { pattern: '^https?:\\/\\/[\\S]+$', desc: 'URL' },
      { pattern: '^\\d{4}-\\d{2}-\\d{2}$', desc: 'Date (YYYY-MM-DD)' }
    ]
  }
]

const filteredPatterns = computed(() => {
  if (!searchQuery.value) return regexPatterns

  return regexPatterns
    .map((cat) => ({
      ...cat,
      patterns: cat.patterns.filter(
        (p) =>
          p.pattern.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          p.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }))
    .filter((cat) => cat.patterns.length > 0)
})

const copyPattern = (pattern: string) => {
  navigator.clipboard.writeText(pattern)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Regex Cheat Sheet</h1>
    </div>

    <Card>
      <CardContent class="pt-6">
        <Input v-model="searchQuery" aria-label="Search regex patterns" placeholder="Search patterns..." class="w-full" />
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="category in filteredPatterns" :key="category.category">
        <CardHeader>
          <CardTitle class="text-lg">{{ category.category }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div
            v-for="(item, idx) in category.patterns"
            :key="idx"
            class="p-2 rounded bg-muted hover:bg-muted/80 transition-colors cursor-pointer group"
            @click="copyPattern(item.pattern)"
          >
            <code class="text-sm font-mono break-all">{{ item.pattern }}</code>
            <div class="text-xs text-muted-foreground mt-1">{{ item.desc }}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
