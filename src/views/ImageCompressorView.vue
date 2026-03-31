<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload, Download } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

const file = ref<File | null>(null)
const previewUrl = ref('')
const compressedUrl = ref('')
const quality = ref([0.8]) // Slider uses array
const scale = ref([100])
const originalSize = ref(0)
const compressedSize = ref(0)
const isProcessing = ref(false)

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selected = target.files?.[0]
  if (!selected) return

  file.value = selected
  originalSize.value = selected.size
  previewUrl.value = URL.createObjectURL(selected)
  processImage()
}

const processImage = () => {
  if (!file.value) return
  isProcessing.value = true

  const img = new Image()
  img.src = previewUrl.value
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Slider returns array, take first value
    const s = scale.value?.[0] ?? 100
    const q = quality.value?.[0] ?? 0.8

    const width = img.width * (s / 100)
    const height = img.height * (s / 100)

    canvas.width = width
    canvas.height = height

    ctx?.drawImage(img, 0, 0, width, height)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        if (compressedUrl.value) URL.revokeObjectURL(compressedUrl.value)

        compressedUrl.value = URL.createObjectURL(blob)
        compressedSize.value = blob.size
        isProcessing.value = false
      },
      file.value?.type || 'image/jpeg',
      q
    )
  }
}

const downloadCompressed = () => {
  if (!compressedUrl.value) return
  const link = document.createElement('a')
  link.href = compressedUrl.value
  link.download = `compressed_${file.value?.name}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const compressionRatio = computed(() => {
  if (originalSize.value === 0 || compressedSize.value === 0) return 0
  return Math.round((1 - compressedSize.value / originalSize.value) * 100)
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Image Compressor</h1>
    </div>

    <div
      v-if="!file"
      class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-card text-card-foreground p-8"
    >
      <div class="flex flex-col items-center gap-4 text-center max-w-sm">
        <div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <Upload class="h-8 w-8 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <h3 class="font-semibold text-lg">Upload an image</h3>
          <p class="text-sm text-muted-foreground">Drag and drop or click to upload</p>
        </div>
        <Button class="w-full relative">
          Select File
          <input
            type="file"
            accept="image/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="handleFileUpload"
          />
        </Button>
      </div>
    </div>

    <div v-else class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
      <!-- Controls -->
      <Card class="flex flex-col h-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-8">
          <div class="grid gap-4">
            <div class="flex items-center justify-between">
              <Label>Quality</Label>
              <span class="text-sm text-muted-foreground"
                >{{ Math.round((quality?.[0] ?? 0.8) * 100) }}%</span
              >
            </div>
            <Slider
              v-model="quality"
              :min="0.1"
              :max="1"
              :step="0.1"
              @update:modelValue="processImage"
            />
          </div>

          <div class="grid gap-4">
            <div class="flex items-center justify-between">
              <Label>Scale (Resize)</Label>
              <span class="text-sm text-muted-foreground">{{ scale?.[0] ?? 100 }}%</span>
            </div>
            <Slider
              v-model="scale"
              :min="10"
              :max="100"
              :step="10"
              @update:modelValue="processImage"
            />
          </div>

          <div class="rounded-lg bg-muted p-4 space-y-3 mt-4">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Original</span>
              <span class="font-mono">{{ formatSize(originalSize) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Compressed</span>
              <span class="font-mono font-bold text-success">{{ formatSize(compressedSize) }}</span>
            </div>
            <div class="flex justify-between text-sm border-t border-border/50 pt-2">
              <span class="text-muted-foreground">Savings</span>
              <span class="font-mono font-bold">{{ compressionRatio }}%</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <Button @click="downloadCompressed" :loading="isProcessing" class="w-full">
              <Download class="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" class="w-full relative">
              New Image
              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="handleFileUpload"
              />
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Preview -->
      <div class="lg:col-span-2 grid grid-cols-2 gap-4 h-full min-h-0">
        <Card class="flex flex-col overflow-hidden">
          <CardHeader class="py-2">
            <CardTitle class="text-sm text-center text-muted-foreground uppercase"
              >Original</CardTitle
            >
          </CardHeader>
          <div
            class="flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard"
          >
            <img :src="previewUrl" class="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
        </Card>
        <Card class="flex flex-col overflow-hidden">
          <CardHeader class="py-2">
            <CardTitle class="text-sm text-center text-muted-foreground uppercase"
              >Compressed</CardTitle
            >
          </CardHeader>
          <div
            class="flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard"
          >
            <div
              v-if="isProcessing"
              class="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm"
            >
              <span class="text-sm font-medium animate-pulse">Processing...</span>
            </div>
            <img :src="compressedUrl" class="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-checkerboard {
  background-image:
    linear-gradient(45deg, #808080 25%, transparent 25%),
    linear-gradient(-45deg, #808080 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #808080 75%),
    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
  background-color: transparent;
  opacity: 0.1;
}
</style>
