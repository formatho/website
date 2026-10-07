<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Box class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">Safetensors Header Reader</h1>
        <p class="text-sm text-muted-foreground">Drop a .safetensors model file: read its JSON header - metadata, base model, LoRA rank, tensor list - without loading gigabytes. Only the first bytes are read, entirely in your browser.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Model File</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <input type="file" accept=".safetensors" @change="onFile" class="text-sm" />
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card>
        <CardHeader><CardTitle>File</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Name:</span> <span class="font-mono">{{ result.name }}</span></p>
          <p><span class="text-muted-foreground">File size:</span> {{ result.sizeMB }} MB</p>
          <p><span class="text-muted-foreground">Header size:</span> {{ result.headerKB }} KB</p>
          <p><span class="text-muted-foreground">Tensors:</span> {{ result.tensorCount }}</p>
          <p><span class="text-muted-foreground">Data types:</span> {{ result.dtypes }}</p>
        </CardContent>
      </Card>

      <Card v-if="Object.keys(result.metadata).length">
        <CardHeader><CardTitle>Metadata ({{ Object.keys(result.metadata).length }} keys)</CardTitle></CardHeader>
        <CardContent>
          <table class="w-full text-xs">
            <tr v-for="(v, k) in result.metadata" :key="k" class="border-b border-border/50">
              <td class="py-1 pr-3 text-muted-foreground align-top font-mono whitespace-nowrap">{{ k }}</td>
              <td class="py-1 font-mono break-all">{{ v }}</td>
            </tr>
          </table>
          <p class="text-xs text-muted-foreground mt-2">Keys starting with ss_ come from kohya-ss style LoRA training. ss_network_dim is the LoRA rank; ss_base_model_version tells you what base it was trained on.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Tensors</CardTitle></CardHeader>
        <CardContent>
          <p class="text-xs text-muted-foreground mb-2">Showing {{ result.shownTensors }} of {{ result.tensorCount }}</p>
          <table class="w-full text-xs">
            <tr v-for="t in result.tensors" :key="t.name" class="border-b border-border/50">
              <td class="py-1 pr-3 font-mono break-all">{{ t.name }}</td>
              <td class="py-1 text-muted-foreground whitespace-nowrap">{{ t.dtype }}</td>
              <td class="py-1 text-muted-foreground whitespace-nowrap font-mono text-right">{{ t.shape }}</td>
            </tr>
          </table>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>Safetensors files begin with an 8-byte little-endian length followed by that many bytes of plain JSON - the header lists every tensor (name, dtype, shape) and optional metadata. This tool reads only those bytes via blob slices: your multi-gigabyte checkpoint never leaves disk, and nothing is uploaded anywhere.</p>
        <p>Use it to check which base model a LoRA was trained on, verify a download is intact, or see what a checkpoint contains before committing VRAM.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Box } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Safetensors Header Reader - Inspect Model Metadata | Formatho',
  description: 'Read the JSON header of any .safetensors file in your browser: LoRA metadata, base model version, network rank, tensor names and dtypes. No upload, only header bytes read.',
  keywords: ['safetensors reader', 'safetensors metadata viewer', 'lora metadata reader', 'read safetensors header', 'safetensors inspector', 'what is in my safetensors file']
})

const error = ref('')
const result = ref<any>(null)

async function onFile(ev: Event) {
  error.value = ''; result.value = null
  const file = (ev.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!file.name.endsWith('.safetensors')) { error.value = 'Please choose a .safetensors file.'; return }
  try {
    const lenBuf = new Uint8Array(await file.slice(0, 8).arrayBuffer())
    const dv = new DataView(lenBuf.buffer)
    let headerLen = 0n
    for (let i = 0; i < 8; i++) headerLen |= BigInt(lenBuf[i]) << BigInt(8 * i)
    const headerLenNum = Number(headerLen)
    if (headerLenNum <= 0 || headerLenNum > 100 * 1024 * 1024) { error.value = 'Invalid safetensors header length - file may be corrupt.'; return }
    const headerBuf = new Uint8Array(await file.slice(8, 8 + headerLenNum).arrayBuffer())
    const header = JSON.parse(new TextDecoder().decode(headerBuf))
    const meta = header.__metadata__ && typeof header.__metadata__ === 'object' ? header.__metadata__ : {}
    const tensors = Object.entries(header).filter(([k]: any) => k !== '__metadata__')
    const dtypes = [...new Set(tensors.map(([, t]: any) => (t as any).dtype))].join(', ')
    result.value = {
      name: file.name,
      sizeMB: (file.size / 1048576).toFixed(1),
      headerKB: (headerLenNum / 1024).toFixed(1),
      tensorCount: tensors.length,
      dtypes: dtypes || 'none',
      metadata: meta,
      tensors: tensors.slice(0, 200).map(([name, t]: any) => ({ name, dtype: t.dtype, shape: (t.shape || []).join(' x ') })),
      shownTensors: Math.min(tensors.length, 200)
    }
  } catch (e: any) {
    error.value = 'Could not read header: ' + e.message
  }
}
</script>
