<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><FlaskConical class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">Polyaxonfile Validator &amp; Matrix Builder</h1>
        <p class="text-sm text-muted-foreground">Lint polyaxonfile.yaml against the real spec, and build hyperparameter matrices with total-run counting. 100% client-side.</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button v-for="t in [['validator','Validate Polyaxonfile'],['builder','Matrix Builder']]" :key="t[0]" @click="tab = t[0]"
        class="px-4 py-2 rounded-md text-sm font-medium border transition-colors"
        :class="tab === t[0] ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">{{ t[1] }}</button>
    </div>

    <!-- VALIDATOR -->
    <div v-if="tab === 'validator'" class="space-y-4">
      <Card>
        <CardHeader><CardTitle>Paste polyaxonfile.yaml</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <textarea v-model="input" rows="12" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="version: 1&#10;kind: component&#10;..."></textarea>
          <div class="flex gap-2">
            <Button @click="validate">Validate</Button>
            <Button variant="outline" @click="input = sample; validate()">Load Sample</Button>
          </div>
          <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
        </CardContent>
      </Card>

      <div v-if="result" class="space-y-4">
        <Card :class="result.errors.length ? 'border-red-500/40' : 'border-green-500/40'">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent class="text-sm">
            <p :class="result.errors.length ? 'text-red-600' : 'text-green-600'" class="font-medium">
              {{ result.errors.length ? result.errors.length + ' error(s), ' + result.warnings.length + ' warning(s)' : result.warnings.length ? 'Valid with ' + result.warnings.length + ' warning(s)' : 'Polyaxonfile looks good' }}
            </p>
          </CardContent>
        </Card>
        <Card v-if="result.errors.length">
          <CardHeader><CardTitle>Errors</CardTitle></CardHeader>
          <CardContent class="text-sm space-y-1"><p v-for="e in result.errors" :key="e" class="text-red-600 font-mono text-xs">- {{ e }}</p></CardContent>
        </Card>
        <Card v-if="result.warnings.length">
          <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
          <CardContent class="text-sm space-y-1"><p v-for="w in result.warnings" :key="w" class="text-orange-600 font-mono text-xs">- {{ w }}</p></CardContent>
        </Card>
        <Card v-if="result.notes.length">
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent class="text-sm space-y-1"><p v-for="n in result.notes" :key="n" class="text-muted-foreground font-mono text-xs">- {{ n }}</p></CardContent>
        </Card>
      </div>
    </div>

    <!-- BUILDER -->
    <div v-else class="space-y-4">
      <Card>
        <CardHeader><CardTitle>Parameters</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div v-for="(p, i) in params" :key="i" class="flex flex-wrap items-center gap-2 border border-border rounded-md p-2">
            <input v-model="p.name" placeholder="param name" class="px-2 py-1 rounded border bg-background text-xs font-mono w-28" />
            <select v-model="p.kind" class="px-2 py-1 rounded border bg-background text-xs">
              <option value="values">categorical (values)</option>
              <option value="linspace">linspace (count)</option>
              <option value="range">range + step</option>
            </select>
            <template v-if="p.kind === 'values'">
              <input v-model="p.values" placeholder="0.001, 0.01, 0.1" class="px-2 py-1 rounded border bg-background text-xs font-mono flex-1 min-w-40" />
              <span class="text-xs text-muted-foreground">{{ countOf(p) }} options</span>
            </template>
            <template v-else-if="p.kind === 'linspace'">
              <input v-model.number="p.min" type="number" placeholder="min" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
              <input v-model.number="p.max" type="number" placeholder="max" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
              <input v-model.number="p.count" type="number" placeholder="count" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
            </template>
            <template v-else>
              <input v-model.number="p.min" type="number" placeholder="min" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
              <input v-model.number="p.max" type="number" placeholder="max" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
              <input v-model.number="p.step" type="number" placeholder="step" class="px-2 py-1 rounded border bg-background text-xs font-mono w-20" />
            </template>
            <button @click="params.splice(i, 1)" class="text-muted-foreground hover:text-red-500 text-sm px-1">×</button>
          </div>
          <Button variant="outline" @click="params.push({ name: 'param' + (params.length + 1), kind: 'values', values: '', min: 0, max: 1, count: 5, step: 0.1 })">Add parameter</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Search</CardTitle></CardHeader>
        <CardContent class="flex flex-wrap items-center gap-3 text-sm">
          <select v-model="algorithm" class="px-3 py-2 rounded-md border bg-background text-xs font-mono">
            <option>grid</option><option>random</option><option>bayes</option><option>hyperband</option>
          </select>
          <label class="flex items-center gap-2 text-xs">concurrency <input v-model.number="concurrency" type="number" min="1" class="px-2 py-1 rounded border bg-background font-mono w-16" /></label>
          <label v-if="algorithm !== 'grid'" class="flex items-center gap-2 text-xs">nExperiments <input v-model.number="nExperiments" type="number" min="1" class="px-2 py-1 rounded border bg-background font-mono w-16" /></label>
        </CardContent>
      </Card>

      <Card class="border-primary/30">
        <CardHeader><CardTitle>Total runs</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p class="text-2xl font-bold">{{ totalRuns }}</p>
          <p class="text-xs text-muted-foreground">{{ runNote }}</p>
          <label class="flex items-center gap-2 text-xs mt-2">cost per run (₹ or $) <input v-model.number="costPerRun" type="number" min="0" step="any" class="px-2 py-1 rounded border bg-background font-mono w-24" /></label>
          <p v-if="costPerRun > 0" class="text-sm font-medium">Estimated total: {{ (totalRuns * costPerRun).toFixed(2) }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Generated matrix block</CardTitle></CardHeader>
        <CardContent class="space-y-2">
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-96">{{ generatedYaml }}</pre>
          <Button variant="outline" @click="copyYaml">Copy YAML</Button>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>Polyaxon is a Kubernetes-native ML platform: experiments, hyperparameter search, distributed training and pipelines, all driven by polyaxonfile.yaml manifests. This page lints those manifests against the version-1 spec (v2 API) and builds matrix blocks with exact total-run counting for grid search.</p>
        <p>Everything parses in your browser - nothing uploaded.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { FlaskConical } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'
import * as yaml from 'js-yaml'

useSEO({
  title: 'Polyaxonfile Validator & Matrix Builder | Formatho',
  description: 'Lint polyaxonfile.yaml against the real spec: version and kind checks, input/output typing, matrix and early-stopping validation. Plus a hyperparameter matrix builder with total-run counting.',
  keywords: ['polyaxonfile validator', 'polyaxon yaml lint', 'polyaxon matrix', 'polyaxon hyperparameter tuning', 'polyaxon grid search runs', 'polyaxon bayes optimization']
})

const tab = ref('validator')
const input = ref('')
const error = ref('')
const result = ref<any>(null)

const sample = `version: 1
kind: operation
name: train-lr
params:
  learning_rate: 0.01
component:
  inputs:
    - name: learning_rate
      type: float
  run:
    container:
      image: polyaxon/polyaxon-quick-start
      command: [python3, model.py, "--lr={{ learning_rate }}"]
matrix:
  kind: grid
  concurrency: 2
  params:
    learning_rate:
      values: [0.001, 0.01, 0.1]
`

const V2_KINDS = ['component', 'operation', 'run', 'playlist', 'dashboard']
const LEGACY_KINDS = ['experiment', 'job', 'build', 'service', 'notebook', 'tensorboard', 'model']
const IO_TYPES = ['str', 'string', 'int', 'float', 'bool', 'dict', 'list', 'uri', 'url', 'path', 'image', 'dockerfile', 'artifact', 'event.artifacts', 'gcs', 's3', 'azure', 'wasb']
const DISCRETE = ['values', 'linspace', 'pchoice']

function validate() {
  error.value = ''; result.value = null
  let doc: any
  try { doc = yaml.load(input.value) } catch (e: any) { error.value = 'YAML parse error: ' + e.message; return }
  if (typeof doc !== 'object' || Array.isArray(doc)) { error.value = 'Top level must be a YAML mapping.'; return }

  const errors: string[] = []
  const warnings: string[] = []
  const notes: string[] = []

  if (doc.version === undefined) errors.push('version is required (current spec: version: 1)')
  else if (String(doc.version) === 'v1') warnings.push('version "v1" is the legacy 1.x polyaxonfile - Polyaxon 2.x expects version: 1')
  else if (doc.version !== 1) warnings.push('version ' + doc.version + ' is not the current spec (1) - verify against your Polyaxon CLI version')

  if (!doc.kind) errors.push('kind is required')
  else if (V2_KINDS.includes(doc.kind)) {
    if (doc.kind === 'component') {
      if (!doc.name) errors.push('component requires a name')
      if (!doc.spec && !doc.run) errors.push('component requires a spec (or top-level run section)')
    }
    if (doc.kind === 'operation' && !doc.component && !doc.run && !doc.spec) errors.push('operation requires a component reference, run section, or spec')
  } else if (LEGACY_KINDS.includes(doc.kind)) {
    warnings.push('kind "' + doc.kind + '" is legacy 1.x - Polyaxon 2.x uses component/operation/run/playlist/dashboard')
  } else {
    errors.push('unknown kind "' + doc.kind + '"')
  }

  for (const section of ['inputs', 'outputs']) {
    const arr = doc[section]
    if (arr === undefined) continue
    if (!Array.isArray(arr)) { errors.push(section + ' must be a list of {name, type, ...}'); continue }
    const seen = new Set<string>()
    arr.forEach((p: any, i: number) => {
      if (!p || typeof p !== 'object') { errors.push(section + '[' + i + '] must be a mapping'); return }
      if (!p.name) errors.push(section + '[' + i + '] missing name')
      else {
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(p.name)) errors.push(section + ' name "' + p.name + '" is not a valid identifier')
        if (seen.has(p.name)) errors.push(section + ' has duplicate name "' + p.name + '"')
        seen.add(p.name)
      }
      if (p.type && !IO_TYPES.includes(String(p.type))) warnings.push(section + '.' + p.name + ' type "' + p.type + '" is not a standard type')
    })
  }

  const matrix = doc.matrix || doc.hparams
  if (matrix) {
    if (!matrix.kind) errors.push('matrix requires kind (grid, random, bayes, hyperband)')
    else if (!['grid', 'random', 'bayes', 'hyperband'].includes(matrix.kind)) errors.push('matrix kind "' + matrix.kind + '" is not one of grid/random/bayes/hyperband')
    if (!matrix.params || !Object.keys(matrix.params).length) errors.push('matrix requires params')
    else {
      for (const [name, def] of Object.entries(matrix.params as Record<string, any>)) {
        const keys = Object.keys(def || {})
        if (!keys.length) { errors.push('matrix param "' + name + '" has no distribution'); continue }
        const k = keys[0]
        if (!DISCRETE.includes(k) && matrix.kind === 'grid') errors.push('grid param "' + name + '" needs a discrete distribution (values/linspace/pchoice), got "' + k + '"')
        if (k === 'linspace' && (!Array.isArray(def[k]) || def[k].length !== 3)) errors.push('matrix param "' + name + '": linspace must be [start, stop, num]')
        if (matrix.kind !== 'grid' && ['normal', 'uniform', 'quniform', 'qloguniform'].includes(k) && matrix.kind === 'hyperband' && k === 'values') warnings.push('hyperband with categorical "values" often underperforms - continuous spaces let it early-stop better')
      }
    }
    if (matrix.kind === 'random' && !matrix.nExperiments && !matrix.concurrency) warnings.push('random search: set nExperiments to bound total runs (otherwise it runs indefinitely until stopped)')
    if (matrix.kind === 'bayes' && !matrix.nExperiments) warnings.push('bayes search: set nExperiments - the optimizer needs a budget')
    if (matrix.concurrency > 5) notes.push('concurrency ' + matrix.concurrency + ' - ensure your queue has enough free slots or runs will queue')
  }

  const tune = doc.tuning || doc.earlyStopping
  if (tune) {
    if (!tune.metric) warnings.push('early stopping/tuning: metric is required to know what to optimize')
    if (tune.objective && !['maximize', 'minimize', 'max', 'min'].includes(String(tune.objective))) errors.push('tuning objective must be maximize or minimize')
  }

  if (doc.presets) notes.push('presets: ' + (Array.isArray(doc.presets) ? doc.presets.join(', ') : JSON.stringify(doc.presets)) + ' - verify they exist on your cluster')
  if (doc.connections) notes.push('connections: ' + (Array.isArray(doc.connections) ? doc.connections.join(', ') : JSON.stringify(doc.connections)) + ' - names must match registered connections on the cluster')

  result.value = { errors, warnings, notes }
}

// ---- builder ----
interface P { name: string; kind: string; values: string; min: number; max: number; count: number; step: number }
const params = ref<P[]>([
  { name: 'learning_rate', kind: 'linspace', values: '', min: 0.0001, max: 0.1, count: 5, step: 0.1 },
  { name: 'batch_size', kind: 'values', values: '16, 32, 64', min: 0, max: 1, count: 5, step: 0.1 }
])
const algorithm = ref('grid')
const concurrency = ref(2)
const nExperiments = ref(30)
const costPerRun = ref(0)

function countOf(p: P): number {
  if (p.kind === 'values') return p.values.split(',').map(s => s.trim()).filter(Boolean).length
  if (p.kind === 'linspace') return Math.max(0, p.count || 0)
  if (p.step > 0) return Math.max(0, Math.floor(((p.max - p.min) / p.step)) + 1)
  return 0
}

const totalRuns = computed(() => {
  if (algorithm.value === 'grid') return params.value.reduce((acc, p) => acc * countOf(p), 1)
  if (algorithm.value === 'hyperband') return (nExperiments.value || 0) * Math.max(1, concurrency.value)
  return nExperiments.value || 0
})

const runNote = computed(() => {
  if (algorithm.value === 'grid') return 'grid = product of all parameter option counts (' + params.value.map(p => p.name + ': ' + countOf(p)).join(' x ') + ')'
  if (algorithm.value === 'hyperband') return 'hyperband: budget = nExperiments x concurrency (brackets early-stop losing runs; actual completed runs may be lower)'
  return algorithm.value + ' runs exactly nExperiments unless you stop early'
})

const generatedYaml = computed(() => {
  const lines: string[] = ['matrix:', '  kind: ' + algorithm.value, '  concurrency: ' + concurrency.value]
  if (algorithm.value !== 'grid') lines.push('  nExperiments: ' + nExperiments.value)
  lines.push('  params:')
  for (const p of params.value) {
    lines.push('    ' + p.name + ':')
    if (p.kind === 'values') {
      const vals = p.values.split(',').map(s => s.trim()).filter(Boolean)
      lines.push('      values: [' + vals.join(', ') + ']')
    } else if (p.kind === 'linspace') {
      lines.push('      linspace: [' + p.min + ', ' + p.max + ', ' + p.count + ']')
    } else {
      lines.push('      range: [' + p.min + ', ' + p.max + ', ' + p.step + ']')
    }
  }
  return lines.join('\n')
})

function copyYaml() { navigator.clipboard.writeText(generatedYaml.value) }

onMounted(() => { input.value = sample; validate() })
</script>
