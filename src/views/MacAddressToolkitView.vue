<template>
  <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10">
        <Network class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">MAC Address Toolkit</h1>
        <p class="text-sm text-muted-foreground">Vendor lookup and random MAC generation.</p>
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
        <p>Lookup uses an offline OUI table bundled with the page. No requests leave your browser.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { Network } from 'lucide-vue-next'
const MacAddressLookup = defineAsyncComponent(() => import('@/views/MacAddressLookupView.vue'))
const MacAddressGenerator = defineAsyncComponent(() => import('@/views/MacAddressGeneratorView.vue'))
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'MAC Address Toolkit - Vendor Lookup and Generator | Formatho',
  description: 'Look up MAC address vendors by OUI and generate random MAC addresses. Tabbed, client-side.',
  keywords: ['mac address lookup', 'mac vendor lookup', 'random mac generator', 'oui lookup']
})

const tabs = [
    ['Vendor Lookup', MacAddressLookup],
    ['MAC Generator', MacAddressGenerator]
  ].map(([label, comp]) => ({ label, comp }))
const active = ref(tabs[0].label)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const currentComp = computed(() => tabs.find(t => t.label === active.value)?.comp)
</script>
