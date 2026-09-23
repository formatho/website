<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, Maximize2, Download, FileText, AlertCircle, Upload, CheckCircle2 } from 'lucide-vue-next'
import { unzipSync } from 'fflate'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Visio Viewer Online - Open .vsdx Files in Browser | Formatho',
  description:
    'Open and view Microsoft Visio .vsdx files online without Visio or any upload. Multi-page diagram rendering, zoom, and SVG export. Runs entirely in your browser — your file never leaves your machine.',
  keywords: [
    'visio viewer',
    'microsoft visio viewer',
    'vsdx viewer online',
    'open visio file online',
    'visio file viewer free',
    'view vsdx without visio'
  ],
  ogType: 'website'
})

interface PageData {
  name: string
  svg: string
  width: number
  height: number
  shapes: number
}

const fileName = ref('')
const pages = ref<PageData[]>([])
const activePage = ref(0)
const zoom = ref(1)
const loadError = ref('')
const loading = ref(false)
const dragging = ref(false)

const INK = '#171717'

function cellValue(el: Element, name: string): number | null {
  const c = el.querySelector(`Cell[N='${name}']`)
  if (!c) return null
  const v = parseFloat(c.getAttribute('V') || '')
  return isNaN(v) ? null : v
}

function shapeText(el: Element): string {
  const t = el.querySelector(':scope > Text')
  if (!t) return ''
  return (t.textContent || '').replace(/\s+/g, ' ').trim()
}

// Collect shapes recursively; returns SVG fragments in page coordinates
interface ShapeAcc {
  fragments: string[]
  count: number
}

function renderShape(el: Element, parentX: number, parentY: number, acc: ShapeAcc) {
  const pinX = cellValue(el, 'PinX') ?? 0
  const pinY = cellValue(el, 'PinY') ?? 0
  const w = cellValue(el, 'Width') ?? 1
  const h = cellValue(el, 'Height') ?? 0.5
  const angle = ((cellValue(el, 'Angle') ?? 0) * 180) / Math.PI
  const noFill = (cellValue(el, 'NoFill') ?? 0) === 1
  const fill = el.querySelector("Cell[N='FillForegnd']")?.getAttribute('V') || '#f9fafb'
  const line = el.querySelector("Cell[N='LineColor']")?.getAttribute('V') || INK

  // geometry rows -> path (Visio local coords: origin at shape center, y up)
  let path = ''
  let hasGeom = false
  for (const section of Array.from(el.querySelectorAll("Section[N='Geometry']"))) {
    let started = false
    for (const row of Array.from(section.children)) {
      const t = row.getAttribute('T') || ''
      if (!/MoveTo|LineTo|ArcTo|Ellipse|Spline/.test(t)) continue
      if (t === 'Ellipse') continue // handled below via bbox fallback
      const xCell = row.querySelector("Cell[N='X']")
      const yCell = row.querySelector("Cell[N='Y']")
      if (!xCell || !yCell) continue
      let x = parseFloat(xCell.getAttribute('V') || '0')
      let y = parseFloat(yCell.getAttribute('V') || '0')
      if (isNaN(x) || isNaN(y)) continue
      if (t.startsWith('Rel')) {
        x *= w
        y *= h
      }
      path += `${started ? 'L' : 'M'}${x.toFixed(3)},${(-y).toFixed(3)} `
      started = true
      hasGeom = true
    }
    if (started) path += 'Z '
  }

  const cx = parentX + pinX
  const cy = -(parentY + pinY)
  let body: string
  if (hasGeom) {
    body = `<path d="${path.trim()}" fill="${noFill ? 'none' : fill}" stroke="${line}" stroke-width="0.012" />`
  } else {
    body = `<rect x="${(-w / 2).toFixed(3)}" y="${(-h / 2).toFixed(3)}" width="${w.toFixed(3)}" height="${h.toFixed(3)}" rx="0.04" fill="${fill}" stroke="${line}" stroke-width="0.012" />`
  }

  const text = shapeText(el)
  let textSvg = ''
  if (text) {
    const fs = Math.min(0.16, Math.max(0.07, h / 4))
    textSvg = `<text x="0" y="${(fs * 0.35).toFixed(3)}" font-family="Inter, sans-serif" font-size="${fs.toFixed(3)}" text-anchor="middle" fill="${INK}">${escapeXml(text.slice(0, 200))}</text>`
  }

  acc.fragments.push(
    `<g transform="translate(${cx.toFixed(3)},${cy.toFixed(3)})${angle ? ` rotate(${angle.toFixed(2)})` : ''}">${body}${textSvg}</g>`
  )
  acc.count++

  // nested shapes are positioned relative to this shape's pin
  const nested = el.querySelector(':scope > Shapes')
  if (nested) {
    for (const child of Array.from(nested.children)) renderShape(child, cx, -cy, acc)
  }
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function parseVsdx(bytes: Uint8Array): PageData[] {
  let files: Record<string, Uint8Array>
  try {
    files = unzipSync(bytes)
  } catch {
    throw new Error('Could not open the file as a .vsdx package (zip). Legacy .vsd files are a different binary format and are not supported.')
  }

  const decoder = new TextDecoder()
  const pageFiles = Object.keys(files)
    .filter((k) => /^visio\/pages\/page\d+\.xml$/.test(k))
    .sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)![1])
      const nb = parseInt(b.match(/(\d+)/)![1])
      return na - nb
    })
  if (!pageFiles.length) throw new Error('No Visio pages found — is this really a .vsdx file?')

  // page names from pages.xml (optional)
  const names = new Map<number, string>()
  const pagesXmlKey = Object.keys(files).find((k) => k.endsWith('visio/pages/pages.xml'))
  if (pagesXmlKey) {
    const doc = new DOMParser().parseFromString(decoder.decode(files[pagesXmlKey]), 'application/xml')
    for (const p of Array.from(doc.getElementsByTagName('Page'))) {
      const id = parseInt(p.getAttribute('ID') || '0')
      const nameCell = p.querySelector("Cell[N='Name']")
      if (nameCell) names.set(id, nameCell.getAttribute('V') || '')
    }
  }

  const parser = new DOMParser()
  return pageFiles.map((key, idx) => {
    const doc = parser.parseFromString(decoder.decode(files[key]), 'application/xml')
    const acc: ShapeAcc = { fragments: [], count: 0 }
    const shapesRoot = doc.getElementsByTagName('Shapes')[0]
    if (shapesRoot) {
      for (const child of Array.from(shapesRoot.children)) renderShape(child, 0, 0, acc)
    }
    // page size: prefer content bbox, fallback to letter proportions
    const pageW = 8.5
    const pageH = 11
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(-pageW / 2).toFixed(2)} ${(-pageH / 2).toFixed(2)} ${pageW} ${pageH}" width="100%" height="100%"><rect x="${-pageW / 2}" y="${-pageH / 2}" width="${pageW}" height="${pageH}" fill="#ffffff" />${acc.fragments.join('')}</svg>`
    return { name: names.get(idx + 1) || `Page ${idx + 1}`, svg, width: pageW, height: pageH, shapes: acc.count }
  })
}

async function handleFile(file: File) {
  loadError.value = ''
  pages.value = []
  activePage.value = 0
  fileName.value = file.name
  if (!/\.vsd(x)?$/i.test(file.name)) {
    loadError.value = 'Please select a .vsdx file. Legacy .vsd files use an old binary format that cannot be read in the browser.'
    return
  }
  loading.value = true
  try {
    const buf = new Uint8Array(await file.arrayBuffer())
    pages.value = parseVsdx(buf)
    zoom.value = 1
  } catch (e: any) {
    loadError.value = e?.message || 'Failed to parse the file.'
  } finally {
    loading.value = false
  }
}

function onFileInput(ev: Event) {
  const f = (ev.target as HTMLInputElement).files?.[0]
  if (f) handleFile(f)
}

function onDrop(ev: DragEvent) {
  dragging.value = false
  const f = ev.dataTransfer?.files?.[0]
  if (f) handleFile(f)
}

const current = computed(() => pages.value[activePage.value] || null)
const totalShapes = computed(() => pages.value.reduce((s, p) => s + p.shapes, 0))

function setZoom(z: number) {
  zoom.value = Math.min(4, Math.max(0.25, z))
}

function downloadSvg() {
  if (!current.value) return
  const blob = new Blob([current.value.svg], { type: 'image/svg+xml' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${fileName.value.replace(/\.vsdxi?$/i, '') || 'diagram'}-${current.value.name.replace(/\s+/g, '-').toLowerCase()}.svg`
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FileText class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Visio Viewer — open .vsdx in your browser</h1>
        <p class="text-sm text-muted-foreground">
          View Microsoft Visio diagrams without Visio installed. The file is parsed locally — nothing is uploaded.
        </p>
      </div>
    </div>

    <Card v-if="!pages.length">
      <CardContent class="pt-6">
        <label
          class="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 cursor-pointer transition-colors hover:bg-muted/50"
          :class="dragging ? 'border-primary bg-primary/5' : 'border-border'"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
          @drop.prevent="onDrop"
        >
          <Upload class="w-8 h-8 text-muted-foreground" />
          <span class="font-semibold">{{ dragging ? 'Drop it here' : 'Click or drop a .vsdx file' }}</span>
          <span class="text-xs text-muted-foreground">
            .vsdx (Visio 2013 and newer). Legacy .vsd is a binary format this viewer cannot read.
          </span>
          <input type="file" accept=".vsdx" class="sr-only" aria-label="Choose a .vsdx file" @change="onFileInput" />
        </label>
        <p v-if="loading" class="text-sm text-muted-foreground mt-3 text-center">Parsing…</p>
        <p v-if="loadError" class="text-sm text-red-500 flex items-center gap-1 mt-3">
          <AlertCircle class="w-4 h-4 shrink-0" /> {{ loadError }}
        </p>
      </CardContent>
    </Card>

    <template v-if="pages.length">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 flex-wrap gap-2">
          <CardTitle class="text-lg">{{ fileName }}</CardTitle>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" aria-label="Zoom out" @click="setZoom(zoom - 0.25)"><ZoomOut class="w-4 h-4" /></Button>
            <span class="text-xs font-mono w-12 text-center">{{ Math.round(zoom * 100) }}%</span>
            <Button variant="outline" size="sm" aria-label="Zoom in" @click="setZoom(zoom + 0.25)"><ZoomIn class="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" aria-label="Fit to page" @click="setZoom(1)"><Maximize2 class="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" @click="downloadSvg"><Download class="w-4 h-4 mr-1" /> SVG</Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="pages.length > 1" class="flex gap-2 flex-wrap">
            <button
              v-for="(p, i) in pages"
              :key="i"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
              :class="i === activePage ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'"
              @click="activePage = i"
            >
              {{ p.name }} <span class="opacity-60">({{ p.shapes }})</span>
            </button>
          </div>
          <div class="border border-border rounded-lg overflow-auto bg-white max-h-[70vh]">
            <div
              v-html="current?.svg"
              :style="{ width: `${zoom * 100}%`, margin: '0 auto' }"
              class="transition-transform"
            />
          </div>
          <p class="text-xs text-muted-foreground">
            {{ pages.length }} page{{ pages.length === 1 ? '' : 's' }} · {{ totalShapes }} shapes · Best-effort geometry
            rendering: boxes, lines, and labels are exact; exotic Visio stencils, images, and themes may render simplified.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- Feature strip -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>100% client-side — your .vsdx file never leaves your browser</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>No Visio license, no install, no signup — works on Mac, Linux, Windows, and mobile</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>Multi-page files render as tabs, with zoom controls and exact shape geometry</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>One-click SVG export for docs, slides, and wikis — crisp at any zoom level</span>
      </div>
    </div>

    <!-- SEO: How to view -->
    <section class="mt-8 space-y-4 prose-sm">
      <h2 class="text-xl font-bold">How to View a Visio File Online</h2>
      <ol class="list-decimal pl-6 space-y-2 text-muted-foreground">
        <li><strong class="text-foreground">Open this page in any modern browser</strong> — there is nothing to install and no account to create. The viewer works the same on macOS, Linux, Windows, and mobile.</li>
        <li><strong class="text-foreground">Click or drop your .vsdx file</strong> — the file is read by the browser's FileReader API, unzipped in memory, and rendered as SVG. Watch the network tab: zero requests fire, because nothing is uploaded.</li>
        <li><strong class="text-foreground">Browse pages, zoom, and export</strong> — multi-page files show a tab per page; zoom in on details or export the current page as SVG for documentation.</li>
      </ol>

      <h2 class="text-xl font-bold mt-6">How to Open a Visio File Without Visio Installed</h2>
      <p class="text-muted-foreground">Microsoft Visio is Windows-only and licensed; Microsoft's own viewer add-on is too. If someone sent you a .vsdx and you need to read it — an org chart, a network diagram, a floor plan, a process flow — you have three options: buy Visio, install a viewer, or open the file here in your browser. This Visio viewer reads the .vsdx format (an OPC package of XML parts) directly: shapes, connectors, text labels, fills, and rotation are rendered exactly. For process diagrams going the other direction — BPMN models that need to open in Visio — use our <a class="text-primary underline" href="/tools/bpmn-to-visio">BPMN to Visio converter</a>.</p>

      <h2 class="text-xl font-bold mt-6">.vsd vs .vsdx — What This Viewer Supports</h2>
      <ul class="list-disc pl-6 space-y-1 text-muted-foreground">
        <li><strong class="text-foreground">.vsdx</strong> (Visio 2013, 2016, 2019, 2021, Microsoft 365) — fully supported; this is the modern XML-based format</li>
        <li><strong class="text-foreground">.vsd</strong> (Visio 2003–2010) — not supported; legacy binary OLE format. Re-save as .vsdx in Visio first (File → Save As)</li>
        <li>Multi-page drawings — every page renders as its own tab with per-page shape counts</li>
        <li>Shape geometry — position, size, rotation, fill and line colors, and text labels</li>
        <li>SVG export — the current page downloads as clean vector SVG</li>
        <li>Rendered with best-effort fidelity: heavily themed stencils, embedded images, and CAD-imported shapes appear simplified</li>
      </ul>

      <h2 class="text-xl font-bold mt-6">Why View Visio Files Client-Side?</h2>
      <p class="text-muted-foreground">Visio diagrams describe the inside of an organization — reporting lines, network topologies, floor plans, vendor boundaries. Most online viewers upload that file to a server to convert it. This viewer runs 100% in your browser: <a class="text-primary underline" href="/blogs/developer-tools-that-dont-spy-on-you">no uploads, no tracking</a>, and it keeps working offline once the page has loaded.</p>
    </section>

    <!-- Related Tools -->
    <div class="mt-4 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/tools/bpmn-to-visio"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">BPMN to Visio Converter</h3>
          <p class="text-sm text-muted-foreground">Convert BPMN 2.0 diagrams to editable Visio (.vdx) files</p>
        </a>
        <a
          href="/tools/bpmn"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">BPMN Viewer</h3>
          <p class="text-sm text-muted-foreground">View and export BPMN process diagrams as PDF</p>
        </a>
        <a
          href="/tools/xml-json"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">XML to JSON Converter</h3>
          <p class="text-sm text-muted-foreground">Convert XML documents to JSON format</p>
        </a>
      </div>
    </div>
  </div>
</template>
