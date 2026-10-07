<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Workflow class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">ComfyUI Workflow Inspector</h1>
        <p class="text-sm text-muted-foreground">Paste any ComfyUI workflow JSON (API or canvas format): see models required, sampler settings, resolution and possible custom nodes. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Workflow JSON</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="input" rows="10" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder='{"1": {"class_type": ... }  or  {"nodes": [...], "links": [...]}'></textarea>
        <div class="flex gap-2">
          <Button @click="inspect">Inspect</Button>
          <Button variant="outline" @click="input = sample; inspect()">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card>
        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Format:</span> {{ result.format }}</p>
          <p><span class="text-muted-foreground">Nodes:</span> {{ result.nodeCount }}</p>
          <p v-if="result.linkCount !== null"><span class="text-muted-foreground">Links:</span> {{ result.linkCount }}</p>
          <p v-if="result.latent"><span class="text-muted-foreground">Generation size:</span> {{ result.latent }}</p>
        </CardContent>
      </Card>

      <Card v-if="result.models.length">
        <CardHeader><CardTitle>Models Required ({{ result.models.length }})</CardTitle></CardHeader>
        <CardContent>
          <table class="w-full text-xs">
            <tr v-for="m in result.models" :key="m.file" class="border-b border-border/50">
              <td class="py-1 pr-3 text-muted-foreground whitespace-nowrap">{{ m.folder }}</td>
              <td class="py-1 font-mono break-all">{{ m.file }}</td>
            </tr>
          </table>
          <p class="text-xs text-muted-foreground mt-2">Place these files in the matching folders under ComfyUI/models/ or the workflow will fail to queue.</p>
        </CardContent>
      </Card>

      <Card v-if="result.samplers.length">
        <CardHeader><CardTitle>Sampling</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-2">
          <div v-for="s in result.samplers" :key="s.label" class="border-b border-border/50 pb-2">
            <p class="font-medium">{{ s.label }}</p>
            <p class="text-muted-foreground font-mono text-xs whitespace-pre-wrap">{{ s.detail }}</p>
          </div>
        </CardContent>
      </Card>

      <Card v-if="result.prompts.length">
        <CardHeader><CardTitle>Prompts ({{ result.prompts.length }})</CardTitle></CardHeader>
        <CardContent class="space-y-2 text-sm">
          <details v-for="(p, i) in result.prompts" :key="i">
            <summary class="cursor-pointer font-medium">Node {{ p.node }} ({{ p.chars }} chars){{ p.kind ? ' - ' + p.kind : '' }}</summary>
            <p class="mt-2 text-muted-foreground whitespace-pre-wrap">{{ p.text }}</p>
          </details>
        </CardContent>
      </Card>

      <Card v-if="result.customNodes.length">
        <CardHeader><CardTitle>Possible Custom Nodes ({{ result.customNodes.length }})</CardTitle></CardHeader>
        <CardContent class="text-sm">
          <p class="text-muted-foreground mb-2">These node types are not in the built-in node list - they likely come from custom node packs. Install them via ComfyUI Manager before running.</p>
          <ul class="font-mono text-xs space-y-1"><li v-for="c in result.customNodes" :key="c">{{ c }}</li></ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Nodes</CardTitle></CardHeader>
        <CardContent>
          <table class="w-full text-xs">
            <tr v-for="n in result.nodeList" :key="n.id" class="border-b border-border/50">
              <td class="py-1 pr-3 text-muted-foreground">#{{ n.id }}</td>
              <td class="py-1 font-mono">{{ n.type }}</td>
            </tr>
          </table>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>ComfyUI workflows ship in two JSON shapes: the API/prompt format (numeric ids with class_type, what gets POSTed to /prompt) and the canvas format (nodes + links arrays, what the editor saves). This inspector reads both and tells you what the workflow needs before you try to run it.</p>
        <p>Nothing is uploaded - parsing happens entirely in your browser.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Workflow } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ComfyUI Workflow Inspector - Check Any Workflow JSON | Formatho',
  description: 'Paste a ComfyUI workflow (API or canvas format): models required, sampler and CFG settings, resolution, and which nodes need custom node packs. Free, client-side.',
  keywords: ['comfyui workflow inspector', 'comfyui workflow viewer', 'comfyui json checker', 'comfyui api format', 'comfyui workflow analyzer', 'what models does this comfyui workflow need']
})

const input = ref('')
const error = ref('')
const result = ref<any>(null)

const sample = JSON.stringify({
  '3': { class_type: 'KSampler', inputs: { seed: 42, steps: 20, cfg: 7, sampler_name: 'euler', scheduler: 'normal', denoise: 1, model: ['1', 0], positive: ['5', 0], negative: ['6', 0], latent_image: ['2', 0] } },
  '1': { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: 'sd_xl_base_1.0.safetensors' } },
  '2': { class_type: 'EmptyLatentImage', inputs: { width: 1024, height: 1024, batch_size: 1 } },
  '4': { class_type: 'VAELoader', inputs: { vae_name: 'sdxl_vae.safetensors' } },
  '5': { class_type: 'CLIPTextEncode', inputs: { text: 'a lighthouse on a cliff at dusk, cinematic', clip: ['1', 1] } },
  '6': { class_type: 'CLIPTextEncode', inputs: { text: 'blurry, watermark', clip: ['1', 1] } },
  '7': { class_type: 'VAEDecode', inputs: { samples: ['3', 0], vae: ['1', 2] } },
  '8': { class_type: 'SaveImage', inputs: { filename_prefix: 'lighthouse', images: ['7', 0] } }
}, null, 2)

const BUILTIN = new Set(['KSampler', 'KSamplerAdvanced', 'CheckpointLoaderSimple', 'CheckpointLoader', 'CLIPLoader', 'CLIPVisionLoader', 'UNETLoader', 'VAELoader', 'DualCLIPLoader', 'LoraLoader', 'LoraLoaderModelOnly', 'ControlNetLoader', 'ControlNetLoaderAdvanced', 'IPAdapterUnifiedLoader', 'CLIPTextEncode', 'CLIPSetLastLayer', 'CLIPVisionEncode', 'ConditioningCombine', 'ConditioningConcat', 'ConditioningAverage', 'ConditioningSetTimestepRange', 'ConditioningZeroOut', 'EmptyLatentImage', 'EmptySD3LatentImage', 'EmptyHunyuanLatentVideo', 'EmptyLTXVLatentVideo', 'LatentUpscale', 'LatentUpscaleBy', 'VAEDecode', 'VAEEncode', 'VAEDecodeTiled', 'VAEEncodeTiled', 'SaveImage', 'PreviewImage', 'SaveAnimatedWEBP', 'SaveVideo', 'CreateVideo', 'LoadImage', 'LoadImageMask', 'LoadImageOutput', 'ImageScale', 'ImageScaleBy', 'ImageUpscaleWithModel', 'ImageInvert', 'ImageBatch', 'ImagePadForOutpaint', 'InpaintModelConditioning', 'SetLatentNoiseMask', 'LatentComposite', 'LatentBlend', 'MaskToImage', 'ImageToMask', 'ImageColorToMask', 'SolidMask', 'InvertMask', 'CropMask', 'CombineMasks', 'MaskComposite', 'GrowMask', 'ThresholdMask', 'ModelSamplingSD3', 'ModelSamplingAuraFlow', 'ModelSamplingFlux', 'ModelSamplingLTXV', 'ModelSamplingStableCascade', 'LTXVConditioning', 'LTXVImgToVideo', 'LTXVImgToVideoInplace', 'LTXVPreprocess', 'LTXVScaleDown', 'LTXVShiftLatent', 'LTXVDualCFGGuider', 'CFGGuider', 'DualCFGGuider', 'PerpNegGuider', 'VideoLinearCFGGuidance', 'VideoTriangleCFGGuidance', 'RandomNoise', 'DisableNoise', 'SamplerCustom', 'SamplerCustomAdvanced', 'KSamplerSelect', 'BasicScheduler', 'KarrasScheduler', 'ExponentialScheduler', 'PolyexponentialScheduler', 'VanillaScheduler', 'SDTurboScheduler', 'VPScheduler', 'BetaSamplingScheduler', 'ManualSigmas', 'SplitSigmas', 'SplitSigmasDenoise', 'FlipSigmas', 'FluxGuidance', 'CFGNorm', 'RescaleCFG', 'ModelMergeSimple', 'ModelMergeBlocks', 'CLIPMergeSimple', 'UNETLoader', 'PrimitiveNode', 'Reroute', 'Note', 'MarkdownNote', 'ImageCompositeMasked', 'ConditioningUpscale'])

function apiNodes(data: any): any[] {
  return Object.entries(data).map(([id, v]: any) => ({ id, type: v.class_type, inputs: v.inputs || {} }))
}
function uiNodes(data: any): any[] {
  return (data.nodes || []).map((n: any) => {
    const inputs: Record<string, any> = {}
    const links = new Map((data.links || []).map((l: any) => [l[0], l]))
    for (const inp of n.inputs || []) {
      if (inp.link != null) { const l = links.get(inp.link); if (l) inputs[inp.name] = [String(l[1]), l[2]] }
    }
    const widgets = n.widgets_values || []
    const widgetNames = (n.inputs || []).filter((i: any) => i.widget).map((i: any) => i.name)
    widgetNames.forEach((wn: string, i: number) => { if (i < widgets.length) inputs[wn] = widgets[i] })
    return { id: String(n.id), type: n.type, inputs, widgetsRaw: widgets }
  })
}

function inspect() {
  error.value = ''; result.value = null
  let data: any
  try { data = JSON.parse(input.value.trim()) } catch (e: any) { error.value = 'Invalid JSON: ' + e.message; return }

  const isApi = !Array.isArray(data.nodes) && typeof data === 'object' && Object.values(data).some((v: any) => v && v.class_type)
  const nodes = isApi ? apiNodes(data) : uiNodes(data)
  if (!nodes.length) { error.value = 'No nodes found - paste a ComfyUI workflow JSON (API or canvas format).' ; return }

  const models: { folder: string; file: string }[] = []
  const samplers: { label: string; detail: string }[] = []
  const prompts: { node: string; text: string; chars: number; kind?: string }[] = []
  const customNodes: string[] = []
  let latent = ''

  for (const n of nodes) {
    const i = n.inputs
    if (n.type === 'CheckpointLoaderSimple' || n.type === 'CheckpointLoader') models.push({ folder: 'checkpoints', file: String(i.ckpt_name || '') })
    if (n.type === 'CLIPLoader' || n.type === 'DualCLIPLoader') models.push({ folder: 'text_encoders', file: String(i.clip_name || '') })
    if (n.type === 'UNETLoader') models.push({ folder: 'diffusion_models', file: String(i.unet_name || '') })
    if (n.type === 'VAELoader') models.push({ folder: 'vae', file: String(i.vae_name || '') })
    if (n.type === 'LoraLoader' || n.type === 'LoraLoaderModelOnly') models.push({ folder: 'loras', file: String(i.lora_name || '') })
    if (n.type === 'ControlNetLoader') models.push({ folder: 'controlnet', file: String(i.control_net_name || '') })
    if (n.type === 'CLIPVisionLoader') models.push({ folder: 'clip_vision', file: String(i.clip_name || '') })
    if (n.type === 'ImageUpscaleWithModel') models.push({ folder: 'upscale_models', file: String(i.model_name || '') })
    if (n.type === 'KSampler') samplers.push({ label: 'KSampler #' + n.id, detail: `steps: ${i.steps}, cfg: ${i.cfg}, sampler: ${i.sampler_name}, scheduler: ${i.scheduler}, denoise: ${i.denoise}, seed: ${i.seed}` })
    if (n.type === 'KSamplerAdvanced') samplers.push({ label: 'KSamplerAdvanced #' + n.id, detail: `steps: ${i.steps}, cfg: ${i.cfg}, sampler: ${i.sampler_name}, scheduler: ${i.scheduler}, denoise: ${i.denoise}` })
    if (n.type === 'SamplerCustomAdvanced') samplers.push({ label: 'SamplerCustomAdvanced #' + n.id, detail: 'custom sampling path: guider + sampler + sigma schedule nodes' })
    if (n.type === 'SamplerCustom') samplers.push({ label: 'SamplerCustom #' + n.id, detail: `cfg: ${i.cfg}, noise: ${JSON.stringify(i.noise)}` })
    if (n.type === 'CLIPTextEncode' && i.text) {
      const t = String(i.text)
      const neg = /blurry|watermark|worst quality|low quality|deformed|cartoon|illustration|3d render|text/i.test(t)
      prompts.push({ node: n.id, text: t, chars: t.length, kind: neg ? 'negative' : 'positive' })
    }
    if (n.type === 'EmptyLatentImage' || n.type === 'EmptySD3LatentImage') latent = `${i.width} x ${i.height} x ${i.batch_size || 1}`
    if (n.type === 'EmptyLTXVLatentVideo' || n.type === 'EmptyHunyuanLatentVideo') {
      const secs = Number(i.length) && i.frame_rate ? (Number(i.length) / 24).toFixed(1) : ''
      latent = `${i.width} x ${i.height}, ${i.length} frames${secs ? ' (~' + secs + 's at 24fps)' : ''}`
    }
    if (!BUILTIN.has(n.type)) customNodes.push(n.type)
  }

  result.value = {
    format: isApi ? 'API / prompt format' : 'Canvas / workflow format',
    nodeCount: nodes.length,
    linkCount: isApi ? null : (data.links || []).length,
    models: models.filter(m => m.file && m.file !== 'null' && m.file !== 'undefined'),
    samplers, prompts, customNodes: [...new Set(customNodes)].sort(),
    latent: latent || null,
    nodeList: nodes.map(n => ({ id: n.id, type: n.type })).sort((a, b) => Number(a.id) - Number(b.id))
  }
}

onMounted(() => { input.value = sample; inspect() })
</script>
