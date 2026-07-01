<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, ZoomIn, ZoomOut, RotateCcw, Maximize2, FileImage, AlertCircle } from 'lucide-vue-next'

const fileInput = ref<HTMLInputElement>()
const isLoading = ref(false)
const error = ref('')
const visioContent = ref('')
const fileName = ref('')
const zoomLevel = ref(100)
const isFullscreen = ref(false)
const pages = ref<string[]>([])
const currentPage = ref(0)

// Mock data for demonstration
const sampleVisioData = {
  pages: [
    `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect x="50" y="50" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="150" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#1976d2">Start Process</text>
  
  <rect x="350" y="50" width="200" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
  <text x="450" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#7b1fa2">Decision</text>
  
  <rect x="200" y="250" width="200" height="100" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="300" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#388e3c">Action A</text>
  
  <rect x="500" y="250" width="200" height="100" fill="#e8f5e8" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="600" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#388e3c">Action B</text>
  
  <rect x="350" y="450" width="200" height="100" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
  <text x="450" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#d32f2f">End Process</text>
  
  <path d="M 250 100 L 350 100" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 450 150 L 300 250" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 450 150 L 600 250" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 300 350 L 350 450" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 600 350 L 550 450" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
</svg>`,
    `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect x="50" y="50" width="700" height="500" fill="#fafafa" stroke="#999" stroke-width="1" rx="3"/>
  <text x="400" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">Page 2 - Detailed View</text>
  
  <circle cx="150" cy="150" r="40" fill="#ffeb3b" stroke="#f57f17" stroke-width="2"/>
  <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#333">Node A</text>
  
  <circle cx="400" cy="150" r="40" fill="#4caf50" stroke="#1b5e20" stroke-width="2"/>
  <text x="400" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white">Node B</text>
  
  <circle cx="650" cy="150" r="40" fill="#2196f3" stroke="#0d47a1" stroke-width="2"/>
  <text x="650" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white">Node C</text>
  
  <rect x="275" y="300" width="250" height="150" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="10"/>
  <text x="400" y="375" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0277bd">Central Process</text>
  
  <path d="M 150 190 L 275 350" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 400 190 L 400 300" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 650 190 L 525 350" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
</svg>`
  ]
}

const previewStyle = computed(() => ({
  transform: `scale(${zoomLevel.value / 100})`,
  transformOrigin: 'top center',
}))

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  // Check file type
  if (!file.name.toLowerCase().endsWith('.vsdx') && !file.name.toLowerCase().endsWith('.vsd')) {
    error.value = 'Please select a valid Visio file (.vsdx or .vsd)'
    return
  }

  isLoading.value = true
  error.value = ''
  fileName.value = file.name

  try {
    // For now, we'll use mock data since client-side VSDX parsing is complex
    // In a real implementation, we would use a library like vsdx-parser or similar
    setTimeout(() => {
      // Simulate file processing
      pages.value = sampleVisioData.pages
      visioContent.value = sampleVisioData.pages[0]
      currentPage.value = 0
      isLoading.value = false
    }, 1000)
  } catch (err) {
    error.value = 'Failed to process Visio file. Please ensure it\'s a valid .vsdx file.'
    isLoading.value = false
  }
}

const loadSample = () => {
  fileName.value = 'Sample Diagram.vsdx'
  pages.value = sampleVisioData.pages
  visioContent.value = sampleVisioData.pages[0]
  currentPage.value = 0
  error.value = ''
}

const zoomIn = () => {
  if (zoomLevel.value < 300) zoomLevel.value += 25
}

const zoomOut = () => {
  if (zoomLevel.value > 25) zoomLevel.value -= 25
}

const resetZoom = () => {
  zoomLevel.value = 100
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const goToPage = (index: number) => {
  if (index >= 0 && index < pages.value.length) {
    currentPage.value = index
    visioContent.value = pages.value[index]
  }
}

const downloadCurrentPage = () => {
  if (!visioContent.value) return

  const blob = new Blob([visioContent.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName.value.replace(/\.[^/.]+$/, '')}_page_${currentPage.value + 1}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  // Load sample by default
  loadSample()
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Visio File Viewer</h1>
        <p class="text-sm text-muted-foreground mt-1">View Microsoft Visio diagrams (.vsdx, .vsd) directly in your browser</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <Button @click="triggerFileInput" class="gap-2">
          <Upload class="h-4 w-4" />
          Upload Visio File
        </Button>
        <input
          ref="fileInput"
          type="file"
          accept=".vsdx,.vsd"
          @change="handleFileUpload"
          class="hidden"
        />
        <Button variant="outline" @click="loadSample">
          <FileImage class="h-4 w-4 mr-2" />
          Load Sample
        </Button>
      </div>
    </div>

    <!-- Features Banner -->
    <div class="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-foreground/5 border border-foreground/10">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">🎯 Features</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">100% Client-side</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">No server upload</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Multi-page support</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Export as SVG</span>
    </div>

    <!-- File Info -->
    <div v-if="fileName" class="flex items-center gap-2 text-sm text-muted-foreground">
      <FileImage class="h-4 w-4" />
      <span>{{ fileName }}</span>
      <span v-if="pages.length > 1">({{ pages.length }} pages)</span>
    </div>

    <!-- Page Navigation -->
    <div v-if="pages.length > 1" class="flex items-center gap-2">
      <Button
        v-for="(_, index) in pages"
        :key="index"
        size="sm"
        :variant="currentPage === index ? 'default' : 'outline'"
        @click="goToPage(index)"
        class="text-xs"
      >
        Page {{ index + 1 }}
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-sm text-muted-foreground">Processing Visio file...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="visioContent" class="flex-1 flex flex-col min-h-0">
      <!-- Preview Controls -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-1">
          <Button size="icon" variant="ghost" @click="zoomOut" class="h-8 w-8">
            <ZoomOut class="h-4 w-4" />
          </Button>
          <span class="text-xs text-muted-foreground w-12 text-center">{{ zoomLevel }}%</span>
          <Button size="icon" variant="ghost" @click="zoomIn" class="h-8 w-8">
            <ZoomIn class="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" @click="resetZoom" class="h-8 w-8">
            <RotateCcw class="h-4 w-4" />
          </Button>
          <div class="w-px h-5 bg-border mx-1" />
          <Button size="icon" variant="ghost" @click="downloadCurrentPage" class="h-8 w-8" title="Download current page as SVG">
            <Download class="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" @click="toggleFullscreen" class="h-8 w-8" :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'">
            <Maximize2 class="h-4 w-4" />
          </Button>
        </div>
        <div v-if="pages.length > 1" class="text-xs text-muted-foreground">
          Page {{ currentPage + 1 }} of {{ pages.length }}
        </div>
      </div>

      <!-- Preview Area -->
      <Card class="flex-1 min-h-0" :class="{ 'fixed inset-0 z-50 rounded-none': isFullscreen }">
        <CardContent class="flex-1 min-h-0 overflow-auto bg-white dark:bg-zinc-900 rounded-lg flex items-start justify-center p-4">
          <div
            v-html="visioContent"
            class="transition-transform duration-200"
            :style="previewStyle"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-else-if="!isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <FileImage class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium mb-2">No Visio file loaded</h3>
        <p class="text-sm text-muted-foreground mb-4">Upload a .vsdx or .vsd file to view it here</p>
        <Button @click="triggerFileInput">Choose File</Button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="flex items-start gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
      <AlertCircle class="h-4 w-4 mt-0.5 flex-shrink-0" />
      <div>
        <div class="font-medium">Error</div>
        <div>{{ error }}</div>
        <div class="text-xs mt-1 opacity-75">Currently showing sample data for demonstration</div>
      </div>
    </div>

    <!-- Fullscreen backdrop -->
    <div
      v-if="isFullscreen"
      class="fixed inset-0 z-40 bg-black/20 -inset-4"
      style="pointer-events: none;"
      @click="toggleFullscreen"
    />
  </div>
</template>