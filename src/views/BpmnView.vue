<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Upload, FileType } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// @ts-ignore - bpmn-js doesn't have official TypeScript types

const file = ref<File | null>(null)
const bpmnXml = ref('')
const error = ref('')
const isExporting = ref(false)
const viewerContainer = ref<HTMLDivElement | null>(null)
let viewer: any = null

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

  if (!selected.name.endsWith('.bpmn') && !selected.name.endsWith('.xml')) {
    error.value = 'Please upload a valid BPMN file (.bpmn or .xml)'
    return
  }

  file.value = selected
  error.value = ''

  const reader = new FileReader()
  reader.onload = async (e) => {
    const content = e.target?.result as string
    bpmnXml.value = content
    await renderBpmn(content)
  }
  reader.onerror = () => {
    error.value = 'Failed to read file'
  }
  reader.readAsText(selected)
}

const renderBpmn = async (xml: string) => {
  if (!viewerContainer.value) return

  try {
    // Create viewer if it doesn't exist
    if (!viewer) {
      const BpmnViewer = (await import('bpmn-js/lib/Viewer')).default
      viewer = new BpmnViewer({
        container: viewerContainer.value,
        width: '100%',
        height: '100%'
      })
    }

    // Import the BPMN diagram
    await viewer.importXML(xml)

    // Fit diagram to viewport
    const canvas = viewer.get('canvas')
    canvas.zoom('fit-viewport')

    error.value = ''
  } catch (err: any) {
    error.value = `Failed to render BPMN: ${err.message || 'Invalid BPMN file'}`
    console.error('BPMN rendering error:', err)
  }
}

const handleExportPDF = async () => {
  if (!viewerContainer.value || !viewer) return

  isExporting.value = true
  try {
    // Generate unique ID (timestamp-based)
    const uniqueId = Date.now().toString(36)

    // Extract base filename without extension
    const baseFilename = file.value?.name.replace(/\.(bpmn|xml)$/, '') || 'bpmn-diagram'

    // Format: formatho.com-filename-id.pdf
    const pdfFilename = `formatho.com-${baseFilename}-${uniqueId}.pdf`

    // Export SVG using bpmn-js built-in method
    const { svg } = await viewer.saveSVG()

    // Create a blob from the SVG
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    // Load SVG as image
    const img = new Image()

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Failed to load SVG'))
      img.src = url
    })

    // Get dimensions from the loaded image
    const width = img.naturalWidth || 800
    const height = img.naturalHeight || 600

    // Create canvas and draw the image
    const canvas = document.createElement('canvas')
    const scale = 2 // Higher resolution
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    // Fill white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.scale(scale, scale)
    ctx.drawImage(img, 0, 0, width, height)

    URL.revokeObjectURL(url)

    // Get image data from canvas
    const imgData = canvas.toDataURL('image/png')

    // Create PDF using jsPDF directly
    const { jsPDF } = await import('jspdf')
    const isPortrait = height > width

    // Create PDF with exact dimensions to fit the diagram
    const pdf = new jsPDF({
      orientation: isPortrait ? 'portrait' : 'landscape',
      unit: 'px',
      format: [width, height]
    })

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)

    // Save the PDF
    pdf.save(pdfFilename)
  } catch (error) {
    console.error('PDF Export failed', error)
  } finally {
    isExporting.value = false
  }
}

const resetViewer = () => {
  file.value = null
  bpmnXml.value = ''
  error.value = ''
  if (viewer) {
    viewer.clear()
  }
}

onMounted(() => {
  // Viewer will be created when first diagram is loaded
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">BPMN Viewer</h1>
      <div v-if="file" class="flex gap-2">
        <Button @click="handleExportPDF" :disabled="isExporting" variant="secondary" size="sm">
          <FileType class="mr-2 h-4 w-4" />
          {{ isExporting ? 'Exporting...' : 'Export PDF' }}
        </Button>
        <Button @click="resetViewer" variant="outline" size="sm"> New File </Button>
      </div>
    </div>

    <!-- Upload State -->
    <div
      v-if="!file"
      class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-card text-card-foreground p-8"
    >
      <div class="flex flex-col items-center gap-4 text-center max-w-sm">
        <div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <Upload class="h-8 w-8 text-muted-foreground" />
        </div>
        <div class="space-y-1">
          <h3 class="font-semibold text-lg">Upload a BPMN file</h3>
          <p class="text-sm text-muted-foreground">
            Upload a BPMN 2.0 XML file to visualize and export as PDF
          </p>
        </div>
        <Button class="w-full relative">
          Select BPMN File
          <input
            type="file"
            accept=".bpmn,.xml"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="handleFileUpload"
          />
        </Button>
      </div>
    </div>

    <!-- Viewer State -->
    <div v-else class="flex-1 flex flex-col gap-4 min-h-0">
      <!-- File Info -->
      <Card>
        <CardContent class="py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileType class="text-gray-900" />
            </div>
            <div>
              <p class="font-medium text-sm">{{ file.name }}</p>
              <p class="text-xs text-muted-foreground">{{ formatSize(file.size) }}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" class="relative">
            Change File
            <input
              type="file"
              accept=".bpmn,.xml"
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="handleFileUpload"
            />
          </Button>
        </CardContent>
      </Card>

      <!-- Error Display -->
      <Card v-if="error" class="border-destructive">
        <CardContent class="py-3">
          <p class="text-sm text-destructive">{{ error }}</p>
        </CardContent>
      </Card>

      <!-- BPMN Viewer -->
      <Card class="flex-1 min-h-0 overflow-hidden">
        <CardHeader class="py-3">
          <CardTitle class="text-sm">Diagram Preview</CardTitle>
        </CardHeader>
        <CardContent class="h-full p-0">
          <div ref="viewerContainer" class="w-full h-full bg-background"></div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style>
/* BPMN.js styles */
.bjs-container {
  background-color: transparent !important;
}

.djs-container {
  font-family: inherit !important;
}
</style>
