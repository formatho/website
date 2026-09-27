<template>
  <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Wrench class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">Quick Utilities</h1>
        <p class="text-sm text-muted-foreground">QR codes, timers, emoji and more small helpers.</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button v-for="t in tabs" :key="t.label" @click="active = t.label"
        class="px-4 py-2 rounded-md text-sm font-medium border transition-colors"
        :class="active === t.label ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">
        {{ t.label }}
      </button>
    </div>

    <div v-if="mounted">
      <component :is="currentComp" />
    </div>
    <p v-else class="text-muted-foreground">Loading tool…</p>

    <Card>
      <CardHeader><CardTitle>About this page</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        <p>Small utilities bundled into one page. Camera recording uses your browser APIs only; nothing is uploaded.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { Wrench } from 'lucide-vue-next'
const WifiQrCodeGenerator = defineAsyncComponent(() => import('@/views/WifiQrCodeGeneratorView.vue'))
const SvgPlaceholderGenerator = defineAsyncComponent(() => import('@/views/SvgPlaceholderGeneratorView.vue'))
const Chronometer = defineAsyncComponent(() => import('@/views/ChronometerView.vue'))
const EmojiPicker = defineAsyncComponent(() => import('@/views/EmojiPickerView.vue'))
const KeycodeInfo = defineAsyncComponent(() => import('@/views/KeycodeInfoView.vue'))
const CameraRecorder = defineAsyncComponent(() => import('@/views/CameraRecorderView.vue'))
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Quick Utilities - QR, Timer, Emoji and Keycodes | Formatho',
  description: 'SVG placeholders, WiFi QR codes, camera recorder, chronometer, emoji picker and keycode info in one page.',
  keywords: ['wifi qr code generator', 'svg placeholder', 'online chronometer', 'emoji picker', 'keycode tester']
})

const tabs = [
    ['WiFi QR Code', WifiQrCodeGenerator],
    ['SVG Placeholder', SvgPlaceholderGenerator],
    ['Chronometer', Chronometer],
    ['Emoji Picker', EmojiPicker],
    ['Keycodes', KeycodeInfo],
    ['Camera Recorder', CameraRecorder]
  ].map(([label, comp]) => ({ label, comp }))
const active = ref(tabs[0].label)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const currentComp = computed(() => tabs.find(t => t.label === active.value)?.comp)
</script>
