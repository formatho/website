<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const htmlContent = ref('')
const editorRef = ref<HTMLDivElement | null>(null)

const execCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value)
  editorRef.value?.focus()
}

const getHtml = () => {
  if (editorRef.value) {
    htmlContent.value = editorRef.value.innerHTML
  }
}

const copyHtml = () => {
  navigator.clipboard.writeText(htmlContent.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">WYSIWYG HTML Editor</h1>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-2 bg-muted rounded-lg" role="toolbar" aria-label="Text formatting toolbar">
      <Button variant="outline" size="sm" @click="execCommand('bold')" aria-label="Bold"><b>B</b></Button>
      <Button variant="outline" size="sm" @click="execCommand('italic')" aria-label="Italic"><i>I</i></Button>
      <Button variant="outline" size="sm" @click="execCommand('underline')" aria-label="Underline"><u>U</u></Button>
      <Button variant="outline" size="sm" @click="execCommand('strikeThrough')" aria-label="Strikethrough"><s>S</s></Button>
      <div class="w-px h-8 bg-border mx-1"></div>
      <Button variant="outline" size="sm" @click="execCommand('justifyLeft')" aria-label="Align left">Left</Button>
      <Button variant="outline" size="sm" @click="execCommand('justifyCenter')" aria-label="Align center">Center</Button>
      <Button variant="outline" size="sm" @click="execCommand('justifyRight')" aria-label="Align right">Right</Button>
      <div class="w-px h-8 bg-border mx-1"></div>
      <Button variant="outline" size="sm" @click="execCommand('insertUnorderedList')"
        aria-label="Bullet list">• List</Button
      >
      <Button variant="outline" size="sm" @click="execCommand('insertOrderedList')" aria-label="Numbered list">1. List</Button>
      <div class="w-px h-8 bg-border mx-1"></div>
      <Button variant="outline" size="sm" @click="execCommand('formatBlock', 'h1')" aria-label="Heading 1">H1</Button>
      <Button variant="outline" size="sm" @click="execCommand('formatBlock', 'h2')" aria-label="Heading 2">H2</Button>
      <Button variant="outline" size="sm" @click="execCommand('formatBlock', 'h3')" aria-label="Heading 3">H3</Button>
      <Button variant="outline" size="sm" @click="execCommand('formatBlock', 'p')" aria-label="Paragraph">P</Button>
      <div class="w-px h-8 bg-border mx-1"></div>
      <Button variant="outline" size="sm" @click="execCommand('removeFormat')" aria-label="Clear formatting">Clear</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Editor -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>Editor</CardTitle>
          <Button variant="outline" size="sm" @click="getHtml" aria-label="Get HTML output">Get HTML</Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <div
            ref="editorRef"
            contenteditable="true"
            class="h-full p-4 rounded-lg border border-input bg-background overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring"
            @input="getHtml"
          ></div>
        </CardContent>
      </Card>

      <!-- HTML Output -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>HTML Output</CardTitle>
          <Button variant="outline" size="sm" @click="copyHtml" :disabled="!htmlContent"
            aria-label="Copy HTML to clipboard">Copy</Button
          >
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <Textarea
            :model-value="htmlContent"
            readonly
            class="h-full resize-none font-mono text-sm"
            placeholder="HTML will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
