<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const width = ref(300)
const height = ref(200)
const bgColor = ref('#cccccc')
const textColor = ref('#333333')
const text = ref('')

const svgContent = computed(() => {
  const displayText = text.value || `${width.value} × ${height.value}`
  return `<svg width="${width.value}" height="${height.value}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor.value}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
        fill="${textColor.value}" font-family="monospace" font-size="16">
    ${displayText}
  </text>
</svg>`
})

const svgDataUrl = computed(() => {
  return `data:image/svg+xml,${encodeURIComponent(svgContent.value)}`
})

const downloadSvg = () => {
  const a = document.createElement('a')
  a.href = svgDataUrl.value
  a.download = `placeholder-${width.value}x${height.value}.svg`
  a.click()
}

const copySvg = () => {
  navigator.clipboard.writeText(svgContent.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">SVG Placeholder Generator</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Width (px)</Label>
              <Input v-model.number="width" type="number" min="1" max="2000" />
            </div>
            <div class="grid gap-2">
              <Label>Height (px)</Label>
              <Input v-model.number="height" type="number" min="1" max="2000" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Background Color</Label>
              <div class="flex gap-2">
                <input type="color" v-model="bgColor" class="w-12 h-10 rounded cursor-pointer" />
                <Input v-model="bgColor" class="font-mono" />
              </div>
            </div>
            <div class="grid gap-2">
              <Label>Text Color</Label>
              <div class="flex gap-2">
                <input type="color" v-model="textColor" class="w-12 h-10 rounded cursor-pointer" />
                <Input v-model="textColor" class="font-mono" />
              </div>
            </div>
          </div>
          <div class="grid gap-2">
            <Label>Custom Text (optional)</Label>
            <Input v-model="text" placeholder="Leave empty for dimensions" />
          </div>
          <div class="flex gap-2">
            <Button @click="downloadSvg" aria-label="Download SVG file">Download SVG</Button>
            <Button variant="outline" @click="copySvg" aria-label="Copy SVG code to clipboard">Copy SVG Code</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent class="flex justify-center items-center min-h-[200px]">
          <img :src="svgDataUrl" alt="Placeholder" class="max-w-full rounded shadow" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
