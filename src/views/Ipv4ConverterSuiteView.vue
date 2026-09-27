<template>
  <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Network class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">IPv4 Converter Suite</h1>
        <p class="text-sm text-muted-foreground">Address format conversion and CIDR range expansion in one page.</p>
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
        <p>Everything runs locally in your browser. See also our IPv4 Subnet Calculator for mask math.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { Network } from 'lucide-vue-next'
const Ipv4AddressConverter = defineAsyncComponent(() => import('@/views/Ipv4AddressConverterView.vue'))
const Ipv4RangeExpander = defineAsyncComponent(() => import('@/views/Ipv4RangeExpanderView.vue'))
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'IPv4 Converter Suite - Address, Range and Mask Tools | Formatho',
  description: 'Convert IPv4 addresses across formats and expand CIDR ranges into host lists. Client-side networking tools.',
  keywords: ['ipv4 converter', 'ip address converter', 'cidr range expander', 'binary ip', 'hex ip']
})

const tabs = [
    ['Address Converter', Ipv4AddressConverter],
    ['Range Expander', Ipv4RangeExpander]
  ].map(([label, comp]) => ({ label, comp }))
const active = ref(tabs[0].label)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const currentComp = computed(() => tabs.find(t => t.label === active.value)?.comp)
</script>
