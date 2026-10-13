<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><PackageCheck class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">elizaOS Plugin Manifest Linter</h1>
        <p class="text-sm text-muted-foreground">Lint your plugin package.json against elizaOS registry conventions: name rules, keywords, dual-format build fields, and registry asset reminders. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>package.json</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="input" rows="10" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder='{ "name": "plugin-my-tool", ... }'></textarea>
        <div class="flex gap-2">
          <Button @click="lint">Lint Manifest</Button>
          <Button variant="outline" @click="input = sample; lint()">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card :class="result.errors.length ? 'border-red-500/40' : 'border-green-500/40'">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent class="text-sm">
          <p :class="result.errors.length ? 'text-red-600' : 'text-green-600'" class="font-medium">
            {{ result.errors.length ? result.errors.length + ' error(s), ' + result.warnings.length + ' warning(s)' : result.warnings.length ? 'Registry-ready with ' + result.warnings.length + ' warning(s)' : 'Manifest follows registry conventions' }}
          </p>
        </CardContent>
      </Card>
      <Card v-if="result.errors.length">
        <CardHeader><CardTitle>Errors</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="e in result.errors" :key="e" class="text-red-600">- {{ e }}</p></CardContent>
      </Card>
      <Card v-if="result.warnings.length">
        <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="w in result.warnings" :key="w" class="text-orange-600">- {{ w }}</p></CardContent>
      </Card>
      <Card v-if="result.infos.length">
        <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1"><p v-for="i in result.infos" :key="i" class="text-muted-foreground">- {{ i }}</p></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>Registry conventions checked</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-1">
        <p>Package name must start with <span class="font-mono">plugin-</span> (scoped <span class="font-mono">@scope/plugin-x</span> allowed). Description must be real, not a placeholder. Keywords must include <span class="font-mono">plugin</span> and <span class="font-mono">elizaos</span>. The registry expects a dual-format build: ESM <span class="font-mono">dist/index.js</span> plus CJS <span class="font-mono">dist/index.cjs</span> exposed via <span class="font-mono">exports</span>, with types. Registry listing also needs <span class="font-mono">images/logo.jpg</span> (400x400, max 500KB) and <span class="font-mono">images/banner.jpg</span> (1280x640, max 1MB).</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PackageCheck } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'elizaOS Plugin Manifest Linter - package.json Check | Formatho',
  description: 'Lint your plugin package.json against elizaOS registry conventions: plugin- name prefix, elizaos keywords, dual-format build fields, semver, and registry asset requirements. Free, client-side.',
  keywords: ['elizaos plugin linter', 'elizaos package.json', 'elizaos registry conventions', 'plugin manifest check', 'elizaos publish requirements']
})

const input = ref('')
const error = ref('')
const result = ref<any>(null)

const sample = JSON.stringify({
  name: 'agent-helper',
  version: '0.0.0',
  description: 'TODO',
  main: 'src/index.ts',
  type: 'module',
  scripts: { dev: 'bun run --watch src/index.ts' },
  dependencies: { '@elizaos/core': '^1.0.0' }
}, null, 2)

function semverValid(v: any): boolean { return typeof v === 'string' && /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(v) }

function lint() {
  error.value = ''; result.value = null
  let p: any
  try { p = JSON.parse(input.value.trim()) } catch (e: any) { error.value = 'Invalid JSON: ' + e.message; return }
  if (typeof p !== 'object' || Array.isArray(p)) { error.value = 'Top level must be a JSON object.'; return }

  const errors: string[] = []
  const warnings: string[] = []
  const infos: string[] = []

  // name
  if (!p.name || typeof p.name !== 'string') errors.push('name is required')
  else {
    const bare = p.name.startsWith('@') ? p.name.split('/')[1] || '' : p.name
    if (!bare.startsWith('plugin-')) errors.push('name "' + p.name + '" must start with "plugin-" (scoped like @scope/plugin-x is allowed) - the registry rejects other names')
    if (/\s|[A-Z]/.test(p.name)) errors.push('name must be lowercase with no spaces')
    if (/template|starter|example|boilerplate|sample/i.test(p.name)) warnings.push('name contains placeholder words (template/starter/example) - registry reviewers reject placeholder packages')
  }
  // version
  if (!p.version) errors.push('version is required')
  else if (!semverValid(p.version)) errors.push('version "' + p.version + '" is not valid semver (x.y.z)')
  else if (p.version === '0.0.0') warnings.push('version 0.0.0 is the scaffold default - bump before publishing')
  // description
  if (!p.description || typeof p.description !== 'string') errors.push('description is required for the registry listing')
  else {
    if (/^todo|placeholder|fix me|tbd/i.test(p.description)) errors.push('description is a placeholder - write a real one, reviewers check this')
    if (p.description.trim().length < 20) warnings.push('description is very short (' + p.description.trim().length + ' chars) - say what the plugin does')
  }
  // keywords
  const kw = Array.isArray(p.keywords) ? p.keywords.map((k: any) => String(k)) : []
  if (!kw.includes('plugin')) warnings.push('keywords missing "plugin"')
  if (!kw.includes('elizaos')) warnings.push('keywords missing "elizaos"')
  // main / exports
  if (p.main === undefined) warnings.push('main is missing - point it at dist/index.js')
  else if (p.main === 'src/index.ts') warnings.push('main points at src/index.ts - the published package must reference the built dist/index.js')
  else if (p.main !== 'dist/index.js') warnings.push('main is "' + p.main + '" - registry convention is dist/index.js')
  if (p.exports && typeof p.exports === 'object' && !JSON.stringify(p.exports).includes('.cjs')) infos.push('exports has no CJS entry - elizaOS supports both runtimes; build dist/index.js (ESM) and dist/index.cjs, expose require via exports')
  if (!p.types && !p.typings) infos.push('no types field - add "types": "dist/index.d.ts" and emit declarations in your build')
  // deps
  const deps = { ...(p.dependencies || {}), ...(p.peerDependencies || {}) }
  if (!('@elizaos/core' in deps)) warnings.push('@elizaos/core not found in dependencies or peerDependencies - every plugin builds on it')
  else if (p.dependencies && '@elizaos/core' in p.dependencies) infos.push('@elizaos/core in dependencies - peerDependencies is often preferred so hosts share one core')
  // scripts
  if (!p.scripts || !p.scripts.build) warnings.push('scripts.build missing - the registry build must be reproducible')
  if (!p.scripts || !p.scripts.test) infos.push('scripts.test missing - shipping tests strengthens registry review')
  // files
  if (!Array.isArray(p.files) || !p.files.includes('dist')) warnings.push('files does not include "dist" - npm may publish without your build output')
  if (p.type !== 'module') infos.push('type is not "module" - ESM output expects it')

  infos.push('Registry listing assets (not checkable from manifest): images/logo.jpg 400x400 max 500KB, images/banner.jpg 1280x640 max 1MB')

  result.value = { errors, warnings, infos }
}

onMounted(() => { input.value = sample; lint() })
</script>
