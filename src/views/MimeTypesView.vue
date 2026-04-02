<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const inputText = ref('')
const searchType = ref('extension')

const mimeTypes: Record<string, { mime: string; name: string }> = {
  txt: { mime: 'text/plain', name: 'Plain Text' },
  html: { mime: 'text/html', name: 'HTML Document' },
  css: { mime: 'text/css', name: 'Cascading Style Sheets' },
  js: { mime: 'application/javascript', name: 'JavaScript' },
  json: { mime: 'application/json', name: 'JSON Data' },
  xml: { mime: 'application/xml', name: 'XML Document' },
  pdf: { mime: 'application/pdf', name: 'PDF Document' },
  zip: { mime: 'application/zip', name: 'ZIP Archive' },
  tar: { mime: 'application/x-tar', name: 'TAR Archive' },
  gz: { mime: 'application/gzip', name: 'GZIP Archive' },
  png: { mime: 'image/png', name: 'PNG Image' },
  jpg: { mime: 'image/jpeg', name: 'JPEG Image' },
  jpeg: { mime: 'image/jpeg', name: 'JPEG Image' },
  gif: { mime: 'image/gif', name: 'GIF Image' },
  svg: { mime: 'image/svg+xml', name: 'SVG Image' },
  webp: { mime: 'image/webp', name: 'WebP Image' },
  ico: { mime: 'image/x-icon', name: 'Icon Image' },
  mp3: { mime: 'audio/mpeg', name: 'MP3 Audio' },
  wav: { mime: 'audio/wav', name: 'WAV Audio' },
  ogg: { mime: 'audio/ogg', name: 'OGG Audio' },
  mp4: { mime: 'video/mp4', name: 'MP4 Video' },
  webm: { mime: 'video/webm', name: 'WebM Video' },
  avi: { mime: 'video/x-msvideo', name: 'AVI Video' },
  doc: { mime: 'application/msword', name: 'Word Document' },
  docx: {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: 'Word Document (OOXML)'
  },
  xls: { mime: 'application/vnd.ms-excel', name: 'Excel Spreadsheet' },
  xlsx: {
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'Excel Spreadsheet (OOXML)'
  },
  ppt: { mime: 'application/vnd.ms-powerpoint', name: 'PowerPoint Presentation' },
  pptx: {
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    name: 'PowerPoint (OOXML)'
  }
}

const result = computed(() => {
  const query = inputText.value.toLowerCase().trim()
  if (!query) return null

  if (searchType.value === 'extension') {
    return mimeTypes[query] || null
  } else {
    // Search by MIME type
    for (const [ext, info] of Object.entries(mimeTypes)) {
      if (info.mime.toLowerCase().includes(query)) {
        return { ...info, extension: ext }
      }
    }
    return null
  }
})

const allTypes = computed(() => {
  return Object.entries(mimeTypes).map(([ext, info]) => ({ extension: ext, ...info }))
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">MIME Type Lookup</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="searchType" aria-label="Search by file extension" value="extension" />
            <span>By Extension</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="searchType" aria-label="Search by MIME type" value="mime" />
            <span>By MIME Type</span>
          </label>
        </div>
        <Input
          v-model="inputText"
          aria-label="Search MIME types"
          :placeholder="
            searchType === 'extension'
              ? 'Enter file extension (e.g., pdf, jpg)...'
              : 'Enter MIME type (e.g., image/png)...'
          "
        />
      </CardContent>
    </Card>

    <div v-if="result" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card v-if="'extension' in result">
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Extension</div>
          <div class="text-2xl font-bold">.{{ result.extension }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">MIME Type</div>
          <div class="text-lg font-mono">{{ result.mime }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Name</div>
          <div class="text-xl font-semibold">{{ result.name }}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Common MIME Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          <div
            v-for="type in allTypes"
            :key="type.extension"
            class="p-2 rounded bg-muted flex justify-between"
          >
            <span class="font-mono">.{{ type.extension }}</span>
            <span class="text-muted-foreground">{{ type.mime }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
