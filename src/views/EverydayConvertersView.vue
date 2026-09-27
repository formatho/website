<template>
  <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Calculator class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">Everyday Converters</h1>
        <p class="text-sm text-muted-foreground">Six everyday converters in one tabbed page.</p>
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
        <p>Six focused converters, zero servers. Everything computes in your browser.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { Calculator } from 'lucide-vue-next'
const RomanNumeralConverter = defineAsyncComponent(() => import('@/views/RomanNumeralConverterView.vue'))
const TemperatureConverter = defineAsyncComponent(() => import('@/views/TemperatureConverterView.vue'))
const PercentageCalculator = defineAsyncComponent(() => import('@/views/PercentageCalculatorView.vue'))
const MathEvaluator = defineAsyncComponent(() => import('@/views/MathEvaluatorView.vue'))
const IntegerBaseConverter = defineAsyncComponent(() => import('@/views/IntegerBaseConverterView.vue'))
const ColorConverter = defineAsyncComponent(() => import('@/views/ColorConverterView.vue'))
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Everyday Converters - Roman, Temperature, Percent and More | Formatho',
  description: 'Six everyday converters in one tabbed page: roman numerals, temperature, percentages, math, number bases, colors.',
  keywords: ['roman numeral converter', 'temperature converter', 'percentage calculator', 'color converter', 'integer base converter']
})

const tabs = [
    ['Roman Numerals', RomanNumeralConverter],
    ['Temperature', TemperatureConverter],
    ['Percentage', PercentageCalculator],
    ['Math', MathEvaluator],
    ['Number Base', IntegerBaseConverter],
    ['Color', ColorConverter]
  ].map(([label, comp]) => ({ label, comp }))
const active = ref(tabs[0].label)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const currentComp = computed(() => tabs.find(t => t.label === active.value)?.comp)
</script>
