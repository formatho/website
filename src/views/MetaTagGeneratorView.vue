<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const title = ref('')
const description = ref('')
const keywords = ref('')
const author = ref('')
const viewport = ref('width=device-width, initial-scale=1')
const charset = ref('UTF-8')
const ogTitle = ref('')
const ogDescription = ref('')
const ogImage = ref('')
const twitterCard = ref('summary_large_image')

const generatedTags = computed(() => {
  let tags = ''

  // Basic meta tags
  tags += `<meta charset="${charset.value}">\n`
  tags += `<meta name="viewport" content="${viewport.value}">\n`
  tags += `<title>${title.value}</title>\n`

  if (description.value) {
    tags += `<meta name="description" content="${description.value}">\n`
  }
  if (keywords.value) {
    tags += `<meta name="keywords" content="${keywords.value}">\n`
  }
  if (author.value) {
    tags += `<meta name="author" content="${author.value}">\n`
  }

  // Open Graph tags
  tags += '\n<!-- Open Graph / Facebook -->\n'
  tags += `<meta property="og:type" content="website">\n`
  if (ogTitle.value || title.value) {
    tags += `<meta property="og:title" content="${ogTitle.value || title.value}">\n`
  }
  if (ogDescription.value || description.value) {
    tags += `<meta property="og:description" content="${ogDescription.value || description.value}">\n`
  }
  if (ogImage.value) {
    tags += `<meta property="og:image" content="${ogImage.value}">\n`
  }

  // Twitter tags
  tags += '\n<!-- Twitter -->\n'
  tags += `<meta name="twitter:card" content="${twitterCard.value}">\n`
  if (ogTitle.value || title.value) {
    tags += `<meta name="twitter:title" content="${ogTitle.value || title.value}">\n`
  }
  if (ogDescription.value || description.value) {
    tags += `<meta name="twitter:description" content="${ogDescription.value || description.value}">\n`
  }
  if (ogImage.value) {
    tags += `<meta name="twitter:image" content="${ogImage.value}">\n`
  }

  return tags
})

const copyTags = () => {
  navigator.clipboard.writeText(generatedTags.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Meta Tag Generator</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Basic Meta Tags</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label>Title</Label>
            <Input v-model="title" placeholder="Page title..." />
          </div>
          <div class="grid gap-2">
            <Label>Description</Label>
            <Input v-model="description" placeholder="Page description..." />
          </div>
          <div class="grid gap-2">
            <Label>Keywords</Label>
            <Input v-model="keywords" placeholder="keyword1, keyword2..." />
          </div>
          <div class="grid gap-2">
            <Label>Author</Label>
            <Input v-model="author" placeholder="Author name..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph & Twitter</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-2">
            <Label>OG Title (optional, defaults to title)</Label>
            <Input v-model="ogTitle" placeholder="Open Graph title..." />
          </div>
          <div class="grid gap-2">
            <Label>OG Description (optional)</Label>
            <Input v-model="ogDescription" placeholder="Open Graph description..." />
          </div>
          <div class="grid gap-2">
            <Label>OG Image URL</Label>
            <Input v-model="ogImage" placeholder="https://example.com/image.jpg" />
          </div>
          <div class="grid gap-2">
            <Label>Twitter Card Type</Label>
            <select
              v-model="twitterCard"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader class="flex-row items-center justify-between">
        <CardTitle>Generated Meta Tags</CardTitle>
        <Button variant="outline" size="sm" @click="copyTags" aria-label="Copy meta tags">Copy</Button>
      </CardHeader>
      <CardContent>
        <CodeEditor
          :model-value="generatedTags"
          language="html"
          readonly
          class="min-h-[300px]"
        />
      </CardContent>
    </Card>
  </div>
</template>
