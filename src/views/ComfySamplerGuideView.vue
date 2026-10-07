<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><SlidersHorizontal class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">ComfyUI Sampler & Scheduler Guide</h1>
        <p class="text-sm text-muted-foreground">What each sampler and sigma scheduler does, when to use it, and how steps/CFG/denoise interact. Plain-language reference.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Quick answers</CardTitle></CardHeader>
      <CardContent class="text-sm space-y-2 text-muted-foreground">
        <p><strong class="text-foreground">Just want a good default?</strong> <span class="font-mono">dpmpp_2m</span> + <span class="font-mono">karras</span>, 25-30 steps, CFG 5-7.</p>
        <p><strong class="text-foreground">Fastest usable result?</strong> <span class="font-mono">euler</span> or <span class="font-mono">lcm</span> at 4-8 steps with low CFG (1-2).</p>
        <p><strong class="text-foreground">Video (LTX/Hunyuan/Wan)?</strong> <span class="font-mono">euler_ancestral</span> or <span class="font-mono">res_multistep</span> with the model-recommended steps; keep CFG near 1-3 for distilled checkpoints.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>Samplers</CardTitle></CardHeader>
      <CardContent>
        <input v-model="q" placeholder="filter..." class="w-full max-w-xs mb-4 px-3 py-2 text-sm rounded-md border bg-background" />
        <div class="space-y-3">
          <div v-for="s in filtered" :key="s.name" class="border-b border-border/50 pb-3">
            <p class="font-mono font-medium">{{ s.name }}</p>
            <p class="text-sm text-muted-foreground">{{ s.desc }}</p>
            <p class="text-xs mt-1"><span class="text-muted-foreground">Use when:</span> {{ s.use }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>Schedulers (sigma schedules)</CardTitle></CardHeader>
      <CardContent class="text-sm space-y-2">
        <p v-for="s in schedulers" :key="s.name"><span class="font-mono font-medium">{{ s.name }}</span> - <span class="text-muted-foreground">{{ s.desc }}</span></p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>How steps, CFG and denoise actually interact</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p><strong class="text-foreground">Steps</strong> is how many denoising passes the sampler makes. More steps = finer refinement, diminishing returns past the model sweet spot (SD1.5/SDXL: 20-30; distilled models: 4-8).</p>
        <p><strong class="text-foreground">CFG</strong> scales how hard the model steers toward your prompt each step. Too low: ignores the prompt. Too high (8+ on SDXL, 3+ on video models): oversaturated, burnt, rigid. Flux/LTX style models often want CFG 1-3 because they were distilled with guidance baked in.</p>
        <p><strong class="text-foreground">Denoise</strong> (img2img and refiners) is how much of the step budget actually changes the image. 1.0 = full generation, 0.5 = roughly half the schedule runs, keeping composition. Lower denoise needs fewer steps to be effective: effective steps = steps x denoise.</p>
        <p><strong class="text-foreground">Seed</strong> fixes the starting noise. Same seed + same everything else = same image; change seed only to explore variations.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        <p>Samplers are numerical solvers for the diffusion ODE/SDE - deterministic ones (euler, dpmpp_2m) give reproducible results for a seed; ancestral ones (euler_ancestral, dpmpp_2m_sde) inject noise each step for more varied texture at the cost of exact reproducibility.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SlidersHorizontal } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ComfyUI Sampler Guide - Samplers, Schedulers, CFG Explained | Formatho',
  description: 'Plain-language reference for ComfyUI samplers (euler, dpmpp_2m, dpmpp_2m_sde, lcm, res_multistep), sigma schedulers, and how steps, CFG, denoise and seed interact.',
  keywords: ['comfyui sampler guide', 'which comfyui sampler', 'euler vs dpmpp_2m', 'comfyui scheduler explained', 'comfyui cfg settings', 'comfyui karras vs normal']
})

const q = ref('')
const samplers = [
  { name: 'euler', desc: 'The simplest solver: one correction per step. Deterministic - same seed, same image.', use: 'Fast drafts, video, and any time you want reproducibility. Excellent quality per step at 20-30 steps.' },
  { name: 'euler_ancestral', desc: 'Euler plus fresh noise injected each step. Results vary slightly run to run even with a fixed seed.', use: 'Richer textures, video models (LTX, Hunyuan), and when deterministic looks too sterile.' },
  { name: 'heun', desc: 'Second-order solver: two evaluations per step, roughly halves the steps needed for equal quality.', use: 'Quality-focused stills when compute is fine; use ~2/3 of your usual steps.' },
  { name: 'dpm_2 / dpm_2_ancestral', desc: 'Second-order multistep family. Better convergence than euler, similar ancestral trade-off.', use: 'Still images where detail matters.' },
  { name: 'dpmpp_2m', desc: 'Probability-flow predictor-corrector, multistep. The community default: fast, stable, deterministic.', use: 'Everyday default for SD1.5/SDXL with karras scheduler at 25-30 steps.' },
  { name: 'dpmpp_2m_sde', desc: 'dpmpp_2m with stochastic (SDE) corrections. Grain and texture appear earlier in the schedule.', use: 'Photoreal skin, fabric, organic detail; slightly slower, non-reproducible.' },
  { name: 'dpmpp_3m_sde', desc: 'Third-order SDE variant. Even smoother convergence, best at high step counts.', use: 'Final quality renders at 30-40 steps.' },
  { name: 'ddim', desc: 'The classic deterministic solver from the original DDIM paper. Conservative and predictable.', use: 'Older SD1.5 workflows, training-style pipelines.' },
  { name: 'uni_pc', desc: 'Unified predictor-corrector designed for few-step convergence.', use: 'Low step counts (5-10) on non-LCM models.' },
  { name: 'lcm', desc: 'Solver for LCM-distilled models that generate in 2-8 steps at very low CFG.', use: 'LCM LoRA/model combos and real-time previews.' },
  { name: 'res_multistep', desc: 'Multistep sampler tuned for video diffusion models.', use: 'LTX and Hunyuan video with their recommended step ranges.' },
  { name: 'ddpm', desc: 'The original diffusion sampler with full noise scheduling per step.', use: 'Educational comparisons; rarely the practical choice.' }
]
const schedulers = [
  { name: 'normal', desc: 'Linear spacing across the sigma range. The neutral default.' },
  { name: 'karras', desc: 'Exponentially spreads sigmas toward the end of the schedule, spending more steps on fine detail. Best general companion to dpmpp samplers.' },
  { name: 'exponential', desc: 'Aggressive decay; concentrates steps early. Good for high-noise-heavy styles and few-step runs.' },
  { name: 'sgm_uniform', desc: 'Uniform spacing with the SGM tail; commonly used for video and SDXL turbo variants.' },
  { name: 'simple', desc: 'Short, coarse schedule; pairs with turbo/lightning models.' },
  { name: 'beta', desc: 'Beta-distributed sigmas; an alternative tail-heavy curve for artistic variance.' },
  { name: 'vp', desc: 'Variance-preserving schedule from score-based diffusion papers; research workflows.' }
]
const filtered = computed(() => samplers.filter(s => !q.value || s.name.includes(q.value.toLowerCase()) || s.desc.toLowerCase().includes(q.value.toLowerCase())))
</script>
