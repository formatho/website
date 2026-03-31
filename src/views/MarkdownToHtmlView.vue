<script setup lang="ts">
import { ref, watch } from 'vue'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor.vue'
import { Button } from '@/components/ui/button'

const markdownInput = ref('')
const htmlOutput = ref('')
const error = ref('')

const convertToHtml = async () => {
  if (!markdownInput.value.trim()) {
    htmlOutput.value = ''
    return
  }

  try {
    error.value = ''
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(markdownInput.value)

    htmlOutput.value = String(file)
  } catch (e: any) {
    error.value = e.message || 'Failed to convert markdown'
  }
}

watch(markdownInput, convertToHtml)

const copyHtml = () => {
  navigator.clipboard.writeText(htmlOutput.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Markdown to HTML Converter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Markdown Input</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="markdownInput"
            language="markdown"
            class="h-full"
            placeholder="Enter Markdown..."
          />
        </CardContent>
      </Card>

      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>HTML Output</CardTitle>
          <Button v-if="htmlOutput" variant="outline" size="sm" @click="copyHtml">Copy</Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            :model-value="htmlOutput"
            language="html"
            readonly
            class="h-full"
            placeholder="HTML output will appear here..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
