<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Repeat class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">ComfyUI API-Workflow Converter</h1>
        <p class="text-sm text-muted-foreground">Convert between the API/prompt format and the canvas workflow format. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Input JSON</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="input" rows="10" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="Paste API format or canvas workflow format..."></textarea>
        <div class="flex gap-2">
          <Button @click="convert('toWorkflow')">API → Canvas workflow</Button>
          <Button @click="convert('toApi')">Canvas → API format</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <Card v-if="output">
      <CardHeader><CardTitle>Output ({{ detected }})</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <p class="text-xs text-muted-foreground">{{ note }}</p>
        <pre class="text-xs font-mono bg-muted p-3 rounded-md overflow-auto max-h-96">{{ output }}</pre>
        <Button variant="outline" @click="copy">Copy JSON</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>About the two formats</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p><strong>API format:</strong> numeric node ids with class_type and inputs - what you POST to /prompt and what most scripts and API examples use.</p>
        <p><strong>Canvas format:</strong> nodes + links arrays with positions and widget values - what ComfyUI saves and loads in the editor.</p>
        <p>Honest limitation: widget order in the canvas format is not stored per-widget in the API format. This converter emits values in input-key order, which is correct for most standard nodes. If a node shows a shifted widget value after loading, drag the value into the right slot once and re-save. Newer ComfyUI frontends can also load API JSON directly.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Repeat } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ComfyUI API to Workflow Converter - Both Directions | Formatho',
  description: 'Convert ComfyUI API/prompt format JSON to the canvas workflow format and back. Widget values, links and node positions rebuilt. Free, client-side.',
  keywords: ['comfyui api to workflow', 'comfyui workflow converter', 'comfyui api format convert', 'comfyui prompt json to workflow', 'comfyui canvas format']
})

const input = ref('')
const output = ref('')
const error = ref('')
const detected = ref('')
const note = ref('')

function detect(data: any): 'api' | 'ui' | 'unknown' {
  if (Array.isArray(data?.nodes)) return 'ui'
  if (typeof data === 'object' && Object.values(data).some((v: any) => v && typeof v === 'object' && v.class_type)) return 'api'
  return 'unknown'
}

function convert(direction: 'toWorkflow' | 'toApi') {
  error.value = ''; output.value = ''
  let data: any
  try { data = JSON.parse(input.value.trim()) } catch (e: any) { error.value = 'Invalid JSON: ' + e.message; return }
  const fmt = detect(data)
  if (fmt === 'unknown') { error.value = 'Could not detect format - expected API format or canvas workflow format.'; return }

  if (direction === 'toWorkflow') {
    if (fmt !== 'api') { error.value = 'Input is already canvas format. Use the other button to convert to API format.'; return }
    detected.value = 'canvas workflow format'
    note.value = 'Load via drag-drop or Workflow > Open. Nodes are auto-laid-out in dependency layers; rearrange as needed.'
    const entries = Object.entries(data)
    // topological layering for layout
    const deps = new Map<string, Set<string>>()
    for (const [id, v] of entries as [string, any][]) {
      const d = new Set<string>()
      for (const val of Object.values(v.inputs || {})) {
        if (Array.isArray(val) && typeof val[0] !== 'undefined') d.add(String(val[0]))
      }
      deps.set(id, d)
    }
    const layer = new Map<string, number>()
    const resolve = (id: string, seen = new Set<string>()): number => {
      if (layer.has(id)) return layer.get(id)!
      if (seen.has(id)) return 0
      seen.add(id)
      let l = 0
      for (const d of deps.get(id) || []) l = Math.max(l, resolve(d, seen) + 1)
      layer.set(id, l)
      return l
    }
    entries.forEach(([id]) => resolve(id))
    const colCount = new Map<number, number>()
    const nodes: any[] = []
    const links: any[] = []
    let linkId = 1
    const slotOf = (id: string) => 0
    for (const [id, v] of entries as [string, any][]) {
      const l = layer.get(id) || 0
      const col = colCount.get(l) || 0
      colCount.set(l, col + 1)
      const nodeInputs: any[] = []
      const widgets: any[] = []
      for (const [k, val] of Object.entries(v.inputs || {})) {
        if (Array.isArray(val) && typeof val[0] !== 'undefined') {
          const origin = String(val[0])
          const lid = linkId++
          links.push([lid, Number(origin), val[1], Number(id), nodeInputs.length, '*'])
          nodeInputs.push({ name: k, type: '*', link: lid })
        } else {
          nodeInputs.push({ name: k, type: '*', widget: true })
          widgets.push(val)
        }
      }
      nodes.push({
        id: Number(id), type: v.class_type,
        pos: [l * 420, col * 320], size: [400, 300],
        flags: {}, order: l * 100 + col, mode: 0,
        inputs: nodeInputs,
        outputs: [{ name: 'OUTPUT', type: '*', links: links.filter(li => li[1] === Number(id)).map(li => li[0]), slot_index: 0 }],
        properties: { 'Node name for S&R': v.class_type },
        widgets_values: widgets
      })
    }
    output.value = JSON.stringify({ last_node_id: Math.max(...nodes.map(n => n.id)), last_link_id: linkId - 1, nodes, links, groups: [], config: {}, extra: {}, version: 0.4 }, null, 2)
  } else {
    if (fmt !== 'ui') { error.value = 'Input is already API format. Use the other button to convert to canvas format.'; return }
    detected.value = 'API format'
    note.value = 'Linked inputs are exact. Widget values map by name where the node stores them; otherwise they land positionally - verify before queueing.'
    const linkMap = new Map((data.links || []).map((l: any) => [l[0], l]))
    const api: any = {}
    for (const n of data.nodes || []) {
      const inputs: Record<string, any> = {}
      for (const inp of n.inputs || []) {
        if (inp.link != null) {
          const l = linkMap.get(inp.link)
          if (l) inputs[inp.name] = [String(l[1]), l[2]]
        }
      }
      const widgets = n.widgets_values || []
      const widgetNames = (n.inputs || []).filter((i: any) => i.widget).map((i: any) => i.name)
      if (widgetNames.length === widgets.length) {
        widgetNames.forEach((wn: string, i: number) => { inputs[wn] = widgets[i] })
      } else if (widgets.length) {
        widgets.forEach((w: any, i: number) => { inputs['widget_' + i] = w })
      }
      api[String(n.id)] = { class_type: n.type, inputs }
    }
    output.value = JSON.stringify(api, null, 2)
  }
}

function copy() { navigator.clipboard.writeText(output.value) }
</script>
