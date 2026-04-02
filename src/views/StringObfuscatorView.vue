<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputText = ref('')
const outputText = ref('')

const obfuscate = () => {
  if (!inputText.value) return

  // Use zero-width characters to obfuscate
  const zeroWidthChars = ['\u200B', '\u200C', '\u200D', '\uFEFF']

  outputText.value = inputText.value
    .split('')
    .map((char) => {
      // Add random zero-width characters around each character
      const prefix = zeroWidthChars[Math.floor(Math.random() * zeroWidthChars.length)]
      const suffix = zeroWidthChars[Math.floor(Math.random() * zeroWidthChars.length)]
      return prefix + char + suffix
    })
    .join('')
}

const deobfuscate = () => {
  if (!inputText.value) return

  // Remove zero-width characters (eslint-disable for intentional unicode chars)
  // eslint-disable-next-line no-misleading-character-class
  outputText.value = inputText.value.replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
}

const copyOutput = () => {
  navigator.clipboard.writeText(outputText.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">String Obfuscator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Obfuscate/Deobfuscate Text</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Input</Label>
          <Input v-model="inputText" placeholder="Enter text..." aria-label="Text to obfuscate or deobfuscate" />
        </div>

        <div class="flex gap-2">
          <Button @click="obfuscate" aria-label="Obfuscate text">Obfuscate</Button>
          <Button variant="outline" @click="deobfuscate" aria-label="Deobfuscate text">Deobfuscate</Button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="outputText">
      <CardHeader class="flex-row items-center justify-between">
        <CardTitle>Output</CardTitle>
        <Button variant="outline" size="sm" @click="copyOutput" aria-label="Copy output">Copy</Button>
      </CardHeader>
      <CardContent>
        <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
          {{ outputText }}
        </div>
        <div class="mt-2 text-sm text-muted-foreground">
          Length: {{ outputText.length }} characters (visible:
          {{ outputText.replace(/[\u200B\u200C\u200D\uFEFF]/g, '').length }})
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>About Obfuscation</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>This tool uses zero-width characters to hide text within text.</p>
        <p>The obfuscated text looks normal but contains invisible characters.</p>
        <p>Use deobfuscation to reveal or clean hidden characters.</p>
      </CardContent>
    </Card>
  </div>
</template>
