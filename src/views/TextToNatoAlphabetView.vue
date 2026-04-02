<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const natoAlphabet: Record<string, string> = {
  A: 'Alpha',
  B: 'Bravo',
  C: 'Charlie',
  D: 'Delta',
  E: 'Echo',
  F: 'Foxtrot',
  G: 'Golf',
  H: 'Hotel',
  I: 'India',
  J: 'Juliett',
  K: 'Kilo',
  L: 'Lima',
  M: 'Mike',
  N: 'November',
  O: 'Oscar',
  P: 'Papa',
  Q: 'Quebec',
  R: 'Romeo',
  S: 'Sierra',
  T: 'Tango',
  U: 'Uniform',
  V: 'Victor',
  W: 'Whiskey',
  X: 'X-ray',
  Y: 'Yankee',
  Z: 'Zulu',
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine'
}

const inputText = ref('')

const natoOutput = computed(() => {
  return inputText.value
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char === ' ') return '[space]'
      return natoAlphabet[char] || char
    })
    .join(' ')
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Text to NATO Alphabet</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Convert Text to NATO Phonetic Alphabet</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-4">
        <div class="grid gap-2">
          <Label>Input Text</Label>
          <Input v-model="inputText" aria-label="Text to convert to NATO alphabet" placeholder="Enter text to convert..." />
        </div>

        <div v-if="natoOutput" class="space-y-2">
          <Label>NATO Phonetic Alphabet</Label>
          <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
            {{ natoOutput }}
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Reference Table -->
    <Card>
      <CardHeader>
        <CardTitle>Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 text-sm">
          <div
            v-for="(word, letter) in natoAlphabet"
            :key="letter"
            class="p-2 rounded bg-muted text-center"
          >
            <div class="font-bold">{{ letter }}</div>
            <div class="text-xs text-muted-foreground">{{ word }}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
