<script setup lang="ts">
import { ref, computed } from 'vue'
import { Palette, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const hex = ref('#FF5733')
const copied = ref<string | null>(null)

// Parse HEX to RGB
const hexToRgb = (hexStr: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr)
  return result
    ? {
        r: parseInt(result[1] ?? '0', 16),
        g: parseInt(result[2] ?? '0', 16),
        b: parseInt(result[3] ?? '0', 16)
      }
    : null
}

// RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

// RGB to CMYK
const rgbToCmyk = (r: number, g: number, b: number) => {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  const rr = r / 255
  const gg = g / 255
  const bb = b / 255
  const k = 1 - Math.max(rr, gg, bb)
  const c = (1 - rr - k) / (1 - k)
  const m = (1 - gg - k) / (1 - k)
  const y = (1 - bb - k) / (1 - k)

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  }
}

const rgb = computed(() => hexToRgb(hex.value) ?? { r: 0, g: 0, b: 0 })
const hsl = computed(() => rgbToHsl(rgb.value.r, rgb.value.g, rgb.value.b))
const cmyk = computed(() => rgbToCmyk(rgb.value.r, rgb.value.g, rgb.value.b))

const formats = computed(() => ({
  HEX: hex.value.toUpperCase(),
  'HEX (no #)': hex.value.replace('#', '').toUpperCase(),
  RGB: `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`,
  RGBA: `rgba(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b}, 1)`,
  HSL: `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`,
  HSLA: `hsla(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%, 1)`,
  CMYK: `cmyk(${cmyk.value.c}%, ${cmyk.value.m}%, ${cmyk.value.y}%, ${cmyk.value.k}%)`,
  'CSS Variable': `--color: ${hex.value};`,
  'Tailwind Class': `bg-[${hex.value}]`
}))

const presets = [
  { name: 'Red', color: '#FF0000' },
  { name: 'Green', color: '#00FF00' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Yellow', color: '#FFFF00' },
  { name: 'Cyan', color: '#00FFFF' },
  { name: 'Magenta', color: '#FF00FF' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Black', color: '#000000' },
  { name: 'Orange', color: '#FF5733' },
  { name: 'Purple', color: '#800080' },
  { name: 'Pink', color: '#FFC0CB' },
  { name: 'Brown', color: '#8B4513' }
]

const copyFormat = (type: string) => {
  const value = formats.value[type as keyof typeof formats.value]
  if (value) {
    navigator.clipboard.writeText(value)
  }
  copied.value = type
  setTimeout(() => (copied.value = null), 2000)
}

const randomColor = () => {
  hex.value =
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Palette class="w-8 h-8" />
          Color Converter
        </h1>
        <p class="text-muted-foreground mt-2">
          Convert colors between HEX, RGB, HSL, CMYK, and more.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Input -->
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Select or enter a color</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Color Picker -->
            <div class="flex gap-4">
              <input
                v-model="hex"
                type="color"
                class="w-20 h-20 cursor-pointer rounded-lg border"
              />
              <input
                v-model="hex"
                type="text"
                placeholder="#000000"
                class="flex-1 px-3 py-2 border rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Preview -->
            <div
              class="h-24 rounded-lg border flex items-center justify-center text-2xl font-bold"
              :style="{ backgroundColor: hex, color: hsl.l > 50 ? '#000' : '#FFF' }"
            >
              {{ hex.toUpperCase() }}
            </div>

            <!-- Random & Presets -->
            <div class="space-y-2">
              <Button @click="randomColor" variant="outline" class="w-full">
                🎲 Random Color
              </Button>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="preset in presets"
                  :key="preset.name"
                  @click="hex = preset.color"
                  variant="ghost"
                  size="icon"
                  class="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                  :style="{ backgroundColor: preset.color }"
                  :title="preset.name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Outputs -->
        <Card>
          <CardHeader>
            <CardTitle>Converted Formats</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div
              v-for="(value, type) in formats"
              :key="type"
              class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
            >
              <div class="flex-1">
                <div class="text-sm text-muted-foreground mb-1">{{ type }}</div>
                <div class="font-mono">{{ value }}</div>
              </div>
              <Button @click="copyFormat(type)" variant="ghost" size="sm">
                <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Color Values -->
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>Color Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 bg-surface-hover rounded-lg text-center">
              <div class="text-sm text-muted-foreground mb-2">Red</div>
              <div class="text-2xl font-bold" :style="{ color: '#FF0000' }">{{ rgb.r }}</div>
            </div>
            <div class="p-4 bg-surface-hover rounded-lg text-center">
              <div class="text-sm text-muted-foreground mb-2">Green</div>
              <div class="text-2xl font-bold" :style="{ color: '#00FF00' }">{{ rgb.g }}</div>
            </div>
            <div class="p-4 bg-surface-hover rounded-lg text-center">
              <div class="text-sm text-muted-foreground mb-2">Blue</div>
              <div class="text-2xl font-bold" :style="{ color: '#0000FF' }">{{ rgb.b }}</div>
            </div>
            <div class="p-4 bg-surface-hover rounded-lg text-center">
              <div class="text-sm text-muted-foreground mb-2">Lightness</div>
              <div class="text-2xl font-bold">{{ hsl.l ?? 0 }}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
