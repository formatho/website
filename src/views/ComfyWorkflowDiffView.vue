<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><GitCompare class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">ComfyUI Workflow Diff</h1>
        <p class="text-sm text-muted-foreground">Compare two ComfyUI workflows (API or canvas format): added/removed nodes, changed settings, prompt edits. 100% client-side.</p>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>Workflow A (old)</CardTitle></CardHeader>
        <CardContent><textarea v-model="a" rows="8" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="paste JSON"></textarea></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Workflow B (new)</CardTitle></CardHeader>
        <CardContent><textarea v-model="b" rows="8" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="paste JSON"></textarea></CardContent>
      </Card>
    </div>

    <div class="flex gap-2">
      <Button @click="diff">Compare</Button>
      <Button variant="outline" @click="loadSample">Load Example Pair</Button>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

    <div v-if="result" class="space-y-4">
      <Card>
        <CardHeader><CardTitle>Changes</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-2">
          <p class="text-muted-foreground">{{ result.added }} added, {{ result.removed }} removed, {{ result.changed }} changed nodes</p>
          <div v-if="!result.items.length" class="text-green-600">Workflows are equivalent.</div>
          <div v-for="it in result.items" :key="it.key" class="border-b border-border/50 pb-2">
            <p class="font-medium">{{ it.title }}</p>
            <p v-for="line in it.lines" :key="line" class="font-mono text-xs whitespace-pre-wrap" :class="line.startsWith('+') ? 'text-green-600' : line.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'">{{ line }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>Useful for "what did I change between generations" - seed, steps, CFG, prompt tweaks, model swaps and node additions show up as precise per-field diffs. Both formats accepted on either side.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GitCompare } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ComfyUI Workflow Diff - Compare Two Workflows | Formatho',
  description: 'Diff two ComfyUI workflow JSONs: added and removed nodes, changed sampler settings, seed, CFG and prompt edits. Free, client-side.',
  keywords: ['comfyui workflow diff', 'compare comfyui workflows', 'comfyui json diff', 'comfyui what changed']
})

const a = ref('')
const b = ref('')
const error = ref('')
const result = ref<any>(null)

function normalize(data: any): Map<string, { type: string; inputs: Record<string, any> }> {
  const out = new Map<string, { type: string; inputs: Record<string, any> }>()
  if (Array.isArray(data?.nodes)) {
    const links = new Map((data.links || []).map((l: any) => [l[0], l]))
    for (const n of data.nodes) {
      const inputs: Record<string, any> = {}
      for (const inp of n.inputs || []) {
        if (inp.link != null) { const l = links.get(inp.link); if (l) inputs[inp.name] = [String(l[1]), l[2]] }
      }
      const widgets = n.widgets_values || []
      const widgetNames = (n.inputs || []).filter((i: any) => i.widget).map((i: any) => i.name)
      if (widgetNames.length === widgets.length) widgetNames.forEach((wn: string, i: number) => { inputs[wn] = widgets[i] })
      else widgets.forEach((w: any, i: number) => { inputs['widget_' + i] = w })
      out.set(String(n.type) + '#' + n.id, { type: n.type, inputs })
    }
  } else {
    for (const [id, v] of Object.entries(data)) {
      const nv: any = v
      if (nv && nv.class_type) out.set(String(nv.class_type) + '#' + id, { type: nv.class_type, inputs: nv.inputs || {} })
    }
  }
  return out
}

function diff() {
  error.value = ''; result.value = null
  let da: any, db: any
  try { da = JSON.parse(a.value.trim()); db = JSON.parse(b.value.trim()) } catch (e: any) { error.value = 'Invalid JSON: ' + e.message; return }
  const ma = normalize(da), mb = normalize(db)
  const items: { key: string; title: string; lines: string[] }[] = []
  let added = 0, removed = 0, changed = 0

  for (const [key, node] of ma) {
    if (!mb.has(key)) { removed++; items.push({ key, title: 'Removed: ' + key, lines: ['- ' + node.type] }); continue }
    const nb = mb.get(key)!
    if (node.type !== nb.type) { changed++; items.push({ key, title: 'Changed type: ' + key, lines: ['- ' + node.type, '+ ' + nb.type] }); continue }
    const lines: string[] = []
    const keys = new Set([...Object.keys(node.inputs), ...Object.keys(nb.inputs)])
    for (const k of keys) {
      const va = JSON.stringify(node.inputs[k]), vb = JSON.stringify(nb.inputs[k])
      if (va !== vb) {
        if (node.inputs[k] === undefined) lines.push('+ ' + k + ' = ' + vb)
        else if (nb.inputs[k] === undefined) lines.push('- ' + k + ' = ' + va)
        else lines.push('- ' + k + ' = ' + va, '+ ' + k + ' = ' + vb)
      }
    }
    if (lines.length) { changed++; items.push({ key, title: 'Changed: ' + key, lines }) }
  }
  for (const [key, node] of mb) {
    if (!ma.has(key)) { added++; items.push({ key, title: 'Added: ' + key, lines: ['+ ' + node.type] }) }
  }

  result.value = { added, removed, changed, items }
}

function loadSample() {
  const base: any = {
    '3': { class_type: 'KSampler', inputs: { seed: 42, steps: 20, cfg: 7, sampler_name: 'euler', scheduler: 'normal', denoise: 1 } },
    '1': { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: 'sd_xl_base_1.0.safetensors' } },
    '5': { class_type: 'CLIPTextEncode', inputs: { text: 'a lighthouse on a cliff at dusk' } }
  }
  const mod = JSON.parse(JSON.stringify(base))
  mod['3'].inputs.seed = 999
  mod['3'].inputs.steps = 30
  mod['3'].inputs.sampler_name = 'dpmpp_2m'
  mod['5'].inputs.text = 'a lighthouse on a cliff at dawn, gold light'
  mod['9'] = { class_type: 'LoraLoader', inputs: { lora_name: 'detail_tweaker.safetensors', strength_model: 0.6 } }
  a.value = JSON.stringify(base, null, 2)
  b.value = JSON.stringify(mod, null, 2)
  diff()
}
</script>
