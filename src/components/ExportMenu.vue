<script setup lang="ts">
import { ref } from 'vue'
import { FileText, FileType } from 'lucide-vue-next'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import FileSaver from 'file-saver'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  markdown: string
}>()

const isExporting = ref(false)

const handleExportPDF = async () => {
  isExporting.value = true
  try {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('preview-content')
    if (!element) return

    const opt = {
      margin: 10,
      filename: 'document.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    }

    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('PDF Export failed', error)
  } finally {
    isExporting.value = false
  }
}

const handleExportDOCX = async () => {
  isExporting.value = true
  try {
    const lines = props.markdown.split('\n')
    const children = lines.map((line) => {
      if (line.startsWith('# ')) {
        return new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1
        })
      }
      if (line.startsWith('## ')) {
        return new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2
        })
      }
      if (line.startsWith('### ')) {
        return new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3
        })
      }
      if (line.startsWith('- ')) {
        return new Paragraph({
          text: line.replace('- ', ''),
          bullet: { level: 0 }
        })
      }
      return new Paragraph({
        children: [new TextRun(line)]
      })
    })

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children
        }
      ]
    })

    const blob = await Packer.toBlob(doc)
    FileSaver.saveAs(blob, 'document.docx')
  } catch (error) {
    console.error('DOCX Export failed', error)
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="flex gap-2">
    <Button @click="handleExportPDF" :disabled="isExporting" variant="secondary" size="sm" aria-label="Export as PDF">
      <FileType class="mr-2 h-4 w-4" />
      {{ isExporting ? '...' : 'PDF' }}
    </Button>
    <Button @click="handleExportDOCX" :disabled="isExporting" variant="secondary" size="sm" aria-label="Export as DOCX">
      <FileText class="mr-2 h-4 w-4" />
      {{ isExporting ? '...' : 'DOCX' }}
    </Button>
  </div>
</template>
