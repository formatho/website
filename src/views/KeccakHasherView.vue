<script setup lang="ts">
import { ref, computed } from 'vue'
import { keccak256, toHex, stringToBytes } from 'viem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-vue-next'

const inputText = ref('')

const hash = computed(() => {
  if (!inputText.value) return ''
  try {
    return keccak256(toHex(stringToBytes(inputText.value)))
  } catch (e) {
    return 'Invalid Input'
  }
})

const copyHash = () => {
  if (hash.value) {
    navigator.clipboard.writeText(hash.value)
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Keccak-256 Hasher</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Label>Text to Hash</Label>
          <CodeEditor
            v-model="inputText"
            language="plaintext"
            class="min-h-[160px]"
            placeholder="Enter text to hash..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output (Byte32)</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Keccak-256 Hash</Label>
            <div class="flex gap-2">
              <Input readonly :value="hash" class="font-mono text-sm" />
              <Button variant="ghost" size="icon" @click="copyHash" aria-label="Copy hash">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
