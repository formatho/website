<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const inputText = ref('')
const font = ref('standard')

const asciiFonts: Record<string, Record<string, string>> = {
  standard: {
    A: '  █████  \n ██   ██ \n ███████ \n ██   ██ \n ██   ██ ',
    B: ' ██████  \n ██   ██ \n ██████  \n ██   ██ \n ██████  ',
    C: '  ██████ \n ██      \n ██      \n ██      \n  ██████ ',
    D: ' ██████  \n ██   ██ \n ██   ██ \n ██   ██ \n ██████  ',
    E: ' ███████ \n ██      \n █████   \n ██      \n ███████ ',
    H: ' ██   ██ \n ██   ██ \n ███████ \n ██   ██ \n ██   ██ ',
    I: ' ██ \n ██ \n ██ \n ██ \n ██ ',
    L: ' ██      \n ██      \n ██      \n ██      \n ███████ ',
    M: ' ███   ███ \n ████ ████ \n ██ ███ ██ \n ██     ██ \n ██     ██ ',
    N: ' ███    ██ \n ████   ██ \n ██ ██  ██ \n ██  ██ ██ \n ██   ████ ',
    O: '  █████  \n ██   ██ \n ██   ██ \n ██   ██ \n  █████  ',
    R: ' ██████  \n ██   ██ \n ██████  \n ██ ██   \n ██  ██  ',
    S: ' ███████ \n ██      \n ███████ \n      ██ \n ███████ ',
    T: ' ███████ \n   ██   \n   ██   \n   ██   \n   ██   ',
    W: ' ██     ██ \n ██     ██ \n ██  █  ██ \n ██ ███ ██ \n  ██ █ ██  ',
    Y: ' ██    ██ \n  ██  ██  \n   ████   \n    ██    \n    ██    ',
    ' ': '   \n   \n   \n   \n   '
  }
}

const generateAscii = () => {
  if (!inputText.value) return

  const chars = inputText.value.toUpperCase().split('')
  const lines = ['', '', '', '', '']

  for (const char of chars) {
    const fontMap = asciiFonts[font.value] ?? asciiFonts.standard
    const art = fontMap?.[char] ?? ''
    const charLines = art.split('\n')

    for (let i = 0; i < 5; i++) {
      lines[i] += (charLines[i] || '').padEnd(10)
    }
  }

  return lines.join('\n')
}

const copyAscii = () => {
  const ascii = generateAscii()
  if (ascii) {
    navigator.clipboard.writeText(ascii)
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">ASCII Text Drawer</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Generate ASCII Art Text</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Text</Label>
          <Input v-model="inputText" placeholder="Enter text..." maxlength="20" />
        </div>
        <div class="flex gap-2">
          <Button @click="generateAscii">Generate</Button>
          <Button variant="outline" @click="copyAscii" aria-label="Copy ASCII art">Copy</Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="inputText" class="flex flex-col min-h-0 flex-1">
      <CardHeader>
        <CardTitle>ASCII Art</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 min-h-0 overflow-auto">
        <pre class="text-xs md:text-sm font-mono bg-muted p-4 rounded-lg whitespace-pre">{{
          generateAscii()
        }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
