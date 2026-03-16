<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputWord = ref('')

const numeronyms = computed(() => {
  if (!inputWord.value) return []

  const word = inputWord.value.trim()
  if (word.length < 4) return [{ original: word, numeronym: word }]

  const first = word[0] ?? ''
  const last = word[word.length - 1] ?? ''
  const middle = word.length - 2

  return [
    {
      original: word,
      numeronym: `${first}${middle}${last}`
    }
  ]
})

const commonNumeronyms = [
  { numeronym: 'i18n', meaning: 'internationalization' },
  { numeronym: 'l10n', meaning: 'localization' },
  { numeronym: 'k8s', meaning: 'Kubernetes' },
  { numeronym: 'a11y', meaning: 'accessibility' },
  { numeronym: 'w3c', meaning: 'World Wide Web Consortium' },
  { numeronym: 'c4s', meaning: 'Content for Scale' },
  { numeronym: 'd11n', meaning: 'digitalization' },
  { numeronym: 'v12n', meaning: 'virtualization' },
  { numeronym: 'p13n', meaning: 'personalization' },
  { numeronym: 'o11y', meaning: 'observability' },
  { numeronym: 'k9s', meaning: 'Kubernetes CLI' },
  { numeronym: 'g11n', meaning: 'globalization' }
]
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Numeronym Generator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Generate Numeronym</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Input Word</Label>
          <Input v-model="inputWord" placeholder="Enter a word (e.g., internationalization)" />
        </div>
      </CardContent>
    </Card>

    <div
      v-if="numeronyms.length > 0 && numeronyms[0]"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Original</div>
          <div class="text-3xl font-bold">{{ numeronyms[0]!.original }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Numeronym</div>
          <div class="text-gray-900">
            {{ numeronyms[0]!.numeronym }}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Common Numeronyms</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div
            v-for="item in commonNumeronyms"
            :key="item.numeronym"
            class="p-3 rounded bg-muted flex justify-between items-center"
          >
            <span class="text-gray-900">{{ item.numeronym }}</span>
            <span class="text-sm text-muted-foreground">{{ item.meaning }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
