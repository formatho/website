<template>
  <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Type class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">Text Encoding Playground</h1>
        <p class="text-sm text-muted-foreground">Unicode, NATO, numeronyms and ASCII art.</p>
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
        <p>All transforms run locally. Great for debugging encodings or just having fun with text.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { Type } from 'lucide-vue-next'
const TextToUnicode = defineAsyncComponent(() => import('@/views/TextToUnicodeView.vue'))
const TextToNatoAlphabet = defineAsyncComponent(() => import('@/views/TextToNatoAlphabetView.vue'))
const NumeronymGenerator = defineAsyncComponent(() => import('@/views/NumeronymGeneratorView.vue'))
const AsciiTextDrawer = defineAsyncComponent(() => import('@/views/AsciiTextDrawerView.vue'))
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Text Encoding Playground - Unicode, NATO and ASCII Art | Formatho',
  description: 'Convert text to Unicode escapes, NATO phonetic alphabet, numeronyms and ASCII art in one tabbed playground.',
  keywords: ['text to unicode', 'nato alphabet converter', 'numeronym generator', 'ascii art generator']
})

const tabs = [
    ['Unicode', TextToUnicode],
    ['NATO Alphabet', TextToNatoAlphabet],
    ['Numeronyms', NumeronymGenerator],
    ['ASCII Art', AsciiTextDrawer]
  ].map(([label, comp]) => ({ label, comp }))
const active = ref(tabs[0].label)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const currentComp = computed(() => tabs.find(t => t.label === active.value)?.comp)
</script>
