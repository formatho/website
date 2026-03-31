<script setup lang="ts">
import { ref } from 'vue'
import { LoremIpsum } from 'lorem-ipsum'
import { Copy, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const count = ref(3)
const units = ref('paragraphs')
const generatedText = ref('')

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

const generate = () => {
  if (units.value === 'paragraphs') {
    generatedText.value = lorem.generateParagraphs(count.value)
  } else if (units.value === 'sentences') {
    generatedText.value = lorem.generateSentences(count.value)
  } else {
    generatedText.value = lorem.generateWords(count.value)
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedText.value)
}

// Initial Generation
generate()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
      <!-- Controls -->
      <Card class="h-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div class="grid gap-2">
            <Label>Count</Label>
            <Input type="number" v-model.number="count" min="1" max="100" />
          </div>
          <div class="grid gap-2">
            <Label>Units</Label>
            <Select v-model="units">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="words">Words</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button @click="generate" class="w-full" aria-label="Generate lorem ipsum text">
            <RefreshCw class="mr-2 h-4 w-4" />
            Generate
          </Button>
        </CardContent>
      </Card>

      <!-- Output -->
      <Card class="md:col-span-2 h-full flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Generated Text</CardTitle>
          <Button variant="outline" size="sm" @click="copyToClipboard" :disabled="!generatedText">
            <Copy class="mr-2 h-4 w-4" />
            Copy
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 pt-4">
          <CodeEditor
            :model-value="generatedText"
            language="markdown"
            readonly
            class="h-full"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
