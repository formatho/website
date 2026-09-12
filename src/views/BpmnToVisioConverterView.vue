<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeEditor from '@/components/CodeEditor.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Upload, Download, FileCode, CheckCircle2, AlertCircle, Copy, Check,
  ZoomIn, ZoomOut, Maximize2, Loader2, Info
} from 'lucide-vue-next'
import { useTwins } from '@/composables/useTwins'

const { summonTwin } = useTwins()

const bpmnInput = ref('')
const error = ref('')
const previewError = ref('')
const isConverting = ref(false)
const conversionSuccess = ref(false)
const visioBlob = ref<Blob | null>(null)
const visioXml = ref('')
const fileName = ref('diagram')
const isRendering = ref(false)
const copiedVdx = ref(false)

// Conversion summary
interface Summary {
  layoutMode: 'di' | 'auto'
  tasks: number
  events: number
  gateways: number
  other: number
  flows: number
  warnings: string[]
}
const summary = ref<Summary | null>(null)

// ─── bpmn-js live preview ───
const previewContainer = ref<HTMLDivElement | null>(null)
let viewer: { importXML(xml: string): Promise<unknown>; get(name: string): unknown; destroy(): void } | null = null
let renderTimer: ReturnType<typeof setTimeout> | null = null

async function ensureViewer() {
  if (viewer || !previewContainer.value) return
  const BpmnViewer = (await import('bpmn-js/lib/Viewer')).default
  viewer = new BpmnViewer({
    container: previewContainer.value,
    width: '100%',
    height: '100%'
  })
}

function schedulePreview() {
  if (renderTimer) clearTimeout(renderTimer)
  if (!bpmnInput.value.trim()) { previewError.value = ''; return }
  renderTimer = setTimeout(renderPreview, 600)
}

async function renderPreview() {
  if (!bpmnInput.value.trim()) return
  await ensureViewer()
  if (!viewer) return
  isRendering.value = true
  try {
    await viewer.importXML(bpmnInput.value)
    fitPreview()
    previewError.value = ''
  } catch (e) {
    previewError.value = (e as Error).message || 'Invalid BPMN XML'
  } finally {
    isRendering.value = false
  }
}

function fitPreview() {
  const canvas = viewer?.get('canvas') as { zoom(type: string | number, center?: unknown): number } | undefined
  canvas?.zoom('fit-viewport', 'auto')
}

function zoomPreview(dir: 1 | -1) {
  const canvas = viewer?.get('canvas') as { zoom(type: string | number, center?: unknown): number } | undefined
  if (!canvas) return
  const current = canvas.zoom()
  canvas.zoom(Math.min(4, Math.max(0.2, current + dir * 0.2)), 'auto')
}

onBeforeUnmount(() => {
  if (renderTimer) clearTimeout(renderTimer)
  viewer?.destroy()
  viewer = null
})

watch(bpmnInput, schedulePreview)

// ─── BPMN parsing ───
interface BpmnElement {
  id: string
  name: string
  type: string
  visioType: string
}
interface SequenceFlow {
  id: string
  name: string
  sourceRef: string
  targetRef: string
}
interface DiShape { x: number; y: number; width: number; height: number }
interface DiEdge { points: Array<{ x: number; y: number }> }

const bpmnToVisioMap: Record<string, string> = {
  task: 'Process', userTask: 'Process', serviceTask: 'Process', scriptTask: 'Process',
  businessRuleTask: 'Decision', manualTask: 'Process', sendTask: 'Process', receiveTask: 'Process',
  startEvent: 'Terminator', endEvent: 'Terminator',
  intermediateCatchEvent: 'Process', intermediateThrowEvent: 'Process', boundaryEvent: 'Process',
  exclusiveGateway: 'Decision', parallelGateway: 'Process', inclusiveGateway: 'Decision',
  eventBasedGateway: 'Decision', complexGateway: 'Decision',
  subProcess: 'Process', callActivity: 'Process'
}

// Base sizes in inches — DI values override these when present
const shapeSizes: Record<string, { width: number; height: number }> = {
  startEvent: { width: 0.9, height: 0.9 },
  endEvent: { width: 0.9, height: 0.9 },
  intermediateCatchEvent: { width: 0.9, height: 0.9 },
  intermediateThrowEvent: { width: 0.9, height: 0.9 },
  boundaryEvent: { width: 0.9, height: 0.9 }
}

function shapeSize(type: string): { width: number; height: number } {
  return shapeSizes[type] || (type.includes('Gateway') ? { width: 1.1, height: 1.1 } : { width: 2.4, height: 0.9 })
}

function colorFor(type: string): { fill: string; line: string } {
  if (type === 'startEvent') return { fill: '#10B981', line: '#059669' }
  if (type === 'endEvent') return { fill: '#EF4444', line: '#DC2626' }
  if (type === 'exclusiveGateway') return { fill: '#3B82F6', line: '#2563EB' }
  if (type === 'parallelGateway') return { fill: '#8B5CF6', line: '#7C3AED' }
  if (type === 'userTask') return { fill: '#06B6D4', line: '#0891B2' }
  if (type === 'serviceTask') return { fill: '#84CC16', line: '#65A30D' }
  if (type === 'task') return { fill: '#F59E0B', line: '#D97706' }
  return { fill: '#F8FAFC', line: '#94A3B8' }
}

const NODE_TYPES = [
  // tasks
  'task', 'userTask', 'serviceTask', 'scriptTask', 'businessRuleTask',
  'manualTask', 'sendTask', 'receiveTask',
  // events
  'startEvent', 'endEvent', 'intermediateCatchEvent', 'intermediateThrowEvent', 'boundaryEvent',
  // gateways
  'exclusiveGateway', 'parallelGateway', 'inclusiveGateway', 'eventBasedGateway', 'complexGateway',
  // activities
  'subProcess', 'callActivity'
]

function parseBpmn(xml: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const parseErr = doc.querySelector('parsererror')
  if (parseErr) throw new Error('Invalid XML format: ' + parseErr.textContent?.substring(0, 100))
  if (!doc.querySelector('definitions, bpmn\\:definitions')) {
    throw new Error('Invalid BPMN format: No BPMN definitions found')
  }

  const warnings: string[] = []
  const elements: BpmnElement[] = []

  for (const type of NODE_TYPES) {
    doc.querySelectorAll(type + ', bpmn\\:' + type).forEach((node, index) => {
      elements.push({
        id: node.getAttribute('id') || `${type}-${index}`,
        name: node.getAttribute('name') || type.replace(/([A-Z])/g, ' $1').trim(),
        type,
        visioType: bpmnToVisioMap[type] || 'Process'
      })
    })
  }

  const sequenceFlows: SequenceFlow[] = []
  doc.querySelectorAll('sequenceFlow, bpmn\\:sequenceFlow').forEach((flow, index) => {
    sequenceFlows.push({
      id: flow.getAttribute('id') || `flow-${index}`,
      name: flow.getAttribute('name') || '',
      sourceRef: flow.getAttribute('sourceRef') || '',
      targetRef: flow.getAttribute('targetRef') || ''
    })
  })

  // Dangling flows reference elements we don't render
  const ids = new Set(elements.map((e) => e.id))
  const renderableFlows = sequenceFlows.filter((f) => {
    if (ids.has(f.sourceRef) && ids.has(f.targetRef)) return true
    warnings.push(`Flow "${f.name || f.id}" skipped: references an element that is not converted (data objects, annotations, and lane sets are not exported as Visio shapes)`)
    return false
  })

  // BPMN Diagram Interchange — exact coordinates from the source modeler
  const diShapes = new Map<string, DiShape>()
  doc.querySelectorAll('BPMNShape, bpmndi\\:BPMNShape').forEach((s) => {
    const ref = s.getAttribute('bpmnElement') || ''
    const bounds = s.querySelector('Bounds, omgdc\\:Bounds')
    if (!ref || !bounds) return
    diShapes.set(ref, {
      x: Number(bounds.getAttribute('x') || 0),
      y: Number(bounds.getAttribute('y') || 0),
      width: Number(bounds.getAttribute('width') || 0),
      height: Number(bounds.getAttribute('height') || 0)
    })
  })
  const diEdges = new Map<string, DiEdge>()
  doc.querySelectorAll('BPMNEdge, bpmndi\\:BPMNEdge').forEach((edge) => {
    const ref = edge.getAttribute('bpmnElement') || ''
    const points = [...edge.querySelectorAll('waypoint, omgdi\\:waypoint')].map((w) => ({
      x: Number(w.getAttribute('x') || 0),
      y: Number(w.getAttribute('y') || 0)
    }))
    if (ref && points.length >= 2) diEdges.set(ref, { points })
  })

  const layoutMode: 'di' | 'auto' = [...diShapes.keys()].some((k) => ids.has(k)) ? 'di' : 'auto'

  return { elements, sequenceFlows: renderableFlows, processName: extractProcessName(doc), diShapes, diEdges, layoutMode, warnings }
}

function extractProcessName(doc: Document): string {
  const process = doc.querySelector('process, bpmn\\:process')
  return process?.getAttribute('name') || process?.getAttribute('id') || 'BPMN-Diagram'
}

// ─── Layout ───
// BPMN DI is pixel-space with Y growing downward; VDX is inch-space with
// PinY growing up from the page bottom.
const PX_PER_IN = 96

interface LaidOutElement extends BpmnElement {
  cx: number // center X in inches
  cy: number // center Y in inches (Visio, up-positive)
  width: number
  height: number
}

function layoutDi(elements: BpmnElement[], diShapes: Map<string, DiShape>): { nodes: LaidOutElement[]; pageW: number; pageH: number } {
  const nodes: LaidOutElement[] = []
  let maxX = 0
  let maxY = 0
  for (const el of elements) {
    const di = diShapes.get(el.id)
    if (!di || !di.width || !di.height) continue
    const w = di.width / PX_PER_IN
    const h = di.height / PX_PER_IN
    maxX = Math.max(maxX, di.x / PX_PER_IN + w)
    maxY = Math.max(maxY, di.y / PX_PER_IN + h)
    nodes.push({ ...el, width: w, height: h, cx: di.x / PX_PER_IN + w / 2, cy: 0 }) // cy set after pageH known
  }
  const pageW = Math.max(8.5, maxX + 0.75)
  const pageH = Math.max(11, maxY + 0.75)
  for (const n of nodes) {
    const di = diShapes.get(n.id)!
    n.cy = pageH - (di.y / PX_PER_IN + n.height / 2)
  }
  return { nodes, pageW, pageH }
}

// Layered auto-layout: nodes are assigned a column from their longest
// distance out of a start event, then spread vertically within the column.
function layoutAuto(elements: BpmnElement[], flows: SequenceFlow[]): { nodes: LaidOutElement[]; pageW: number; pageH: number } {
  const byId = new Map(elements.map((e) => [e.id, e]))
  const outgoing = new Map<string, string[]>()
  const indegree = new Map<string, number>()
  for (const e of elements) { outgoing.set(e.id, []); indegree.set(e.id, 0) }
  for (const f of flows) {
    if (!byId.has(f.sourceRef) || !byId.has(f.targetRef)) continue
    outgoing.get(f.sourceRef)!.push(f.targetRef)
    indegree.set(f.targetRef, (indegree.get(f.targetRef) || 0) + 1)
  }

  // longest-path layering (relaxed to handle cycles)
  const layer = new Map<string, number>()
  const queue = elements.filter((e) => (indegree.get(e.id) || 0) === 0).map((e) => e.id)
  for (const id of queue) layer.set(id, 0)
  let guard = 0
  while (queue.length && guard++ < 5000) {
    const id = queue.shift()!
    const l = layer.get(id) || 0
    for (const next of outgoing.get(id) || []) {
      if ((layer.get(next) || -1) < l + 1) {
        layer.set(next, l + 1)
        queue.push(next)
      }
    }
  }
  // any node missed by the traversal (pure cycles) gets appended
  let extraCol = Math.max(-1, ...[...layer.values()]) + 1
  for (const e of elements) if (!layer.has(e.id)) layer.set(e.id, extraCol++)

  // columns → nodes
  const columns = new Map<number, BpmnElement[]>()
  for (const el of elements) {
    const l = layer.get(el.id) || 0
    if (!columns.has(l)) columns.set(l, [])
    columns.get(l)!.push(el)
  }

  const colGap = 0.6
  const rowGap = 0.4
  const nodes: LaidOutElement[] = []
  let x = 0.75
  let maxColHeight = 0
  for (const l of [...columns.keys()].sort((a, b) => a - b)) {
    const colNodes = columns.get(l)!
    let y = 0
    let colWidth = 0
    for (const el of colNodes) {
      const size = shapeSize(el.type)
      colWidth = Math.max(colWidth, size.width)
      const cy = -(y + size.height / 2) // temporary: down-positive within column
      nodes.push({ ...el, width: size.width, height: size.height, cx: 0, cy })
      y += size.height + rowGap
    }
    const colHeight = y - rowGap
    maxColHeight = Math.max(maxColHeight, colHeight)
    for (const n of nodes) {
      if (layer.get(n.id) === l) n.cx = x + colWidth / 2
    }
    x += colWidth + colGap
  }

  const pageW = Math.max(8.5, x + 0.75)
  const pageH = Math.max(11, maxColHeight + 1.5)
  for (const n of nodes) n.cy = pageH / 2 - n.cy // center columns vertically, flip to up-positive
  return { nodes, pageW, pageH }
}

// ─── VDX generation ───
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
const inch = (n: number) => Math.round(n * 10000) / 10000

function generateVisioXml(data: {
  elements: BpmnElement[]
  sequenceFlows: SequenceFlow[]
  processName: string
  diShapes: Map<string, DiShape>
  diEdges: Map<string, DiEdge>
  layoutMode: 'di' | 'auto'
}): string {
  const { sequenceFlows, processName, diShapes, diEdges, layoutMode } = data
  const { nodes, pageW, pageH } = layoutMode === 'di'
    ? layoutDi(data.elements, diShapes)
    : layoutAuto(data.elements, sequenceFlows)

  const posById = new Map(nodes.map((n) => [n.id, n]))

  const shapesXml = nodes.map((el, i) => {
    const c = colorFor(el.type)
    return `
      <Shape ID="${i + 1}" Type="Shape" LineStyle="3" FillStyle="3" TextStyle="3">
        <Cell N="PinX" V="${inch(el.cx)}"/>
        <Cell N="PinY" V="${inch(el.cy)}"/>
        <Cell N="Width" V="${inch(el.width)}"/>
        <Cell N="Height" V="${inch(el.height)}"/>
        <Cell N="FillForegnd" V="${c.fill}"/>
        <Cell N="FillBkgnd" V="${c.fill}"/>
        <Cell N="LineWeight" V="0.01041666666666667"/>
        <Cell N="LineColor" V="${c.line}"/>
        <Cell N="Char.Size" V="0.1388888888888889"/>
        <Text><cp IX="0"/>${escapeXml(el.name)}</Text>
        <Section N="Geometry" IX="0">
          <Row T="RelMoveTo" IX="1"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo" IX="2"><Cell N="X" V="1"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo" IX="3"><Cell N="X" V="1"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo" IX="4"><Cell N="X" V="0"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo" IX="5"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
        </Section>
      </Shape>`
  }).join('')

  // Connectors — exact waypoints when the BPMN supplies them
  let connectorsXml = ''
  sequenceFlows.forEach((flow, index) => {
    const source = posById.get(flow.sourceRef)
    const target = posById.get(flow.targetRef)
    if (!source || !target) return

    const id = nodes.length + index + 1
    let pts: Array<{ x: number; y: number }> // Visio inch-space, up-positive
    const diEdge = diEdges.get(flow.id)
    if (layoutMode === 'di' && diEdge) {
      pts = diEdge.points.map((p) => ({ x: p.x / PX_PER_IN, y: pageH - p.y / PX_PER_IN }))
    } else {
      pts = [
        { x: source.cx + source.width / 2, y: source.cy },
        { x: target.cx - target.width / 2, y: target.cy }
      ]
      // anchor to vertical edges when the flow runs bottom-up or top-down
      if (Math.abs(target.cy - source.cy) > Math.abs(target.cx - source.cx)) {
        pts = [
          { x: source.cx, y: source.cy + (target.cy > source.cy ? source.height / 2 : -source.height / 2) },
          { x: target.cx, y: target.cy + (target.cy > source.cy ? -target.height / 2 : target.height / 2) }
        ]
      }
    }

    const minX = Math.min(...pts.map((p) => p.x))
    const maxX = Math.max(...pts.map((p) => p.x))
    const minY = Math.min(...pts.map((p) => p.y))
    const maxY = Math.max(...pts.map((p) => p.y))
    const w = Math.max(0.05, maxX - minX)
    const h = Math.max(0.05, maxY - minY)
    const geomRows = pts.map((p, i) => {
      const lx = (p.x - minX) / w
      const ly = (maxY - p.y) / h
      return i === 0
        ? `<Row T="MoveTo" IX="1"><Cell N="X" V="${inch(lx)}" F="Width*${inch(lx)}"/><Cell N="Y" V="${inch(ly)}" F="Height*${inch(ly)}"/></Row>`
        : `<Row T="LineTo" IX="${i + 1}"><Cell N="X" V="${inch(lx)}" F="Width*${inch(lx)}"/><Cell N="Y" V="${inch(ly)}" F="Height*${inch(ly)}"/></Row>`
    }).join('')

    connectorsXml += `
      <Shape ID="${id}" Type="Shape" LineStyle="1" FillStyle="1" TextStyle="1">
        <Cell N="PinX" V="${inch((minX + maxX) / 2)}"/>
        <Cell N="PinY" V="${inch((minY + maxY) / 2)}"/>
        <Cell N="Width" V="${inch(w)}"/>
        <Cell N="Height" V="${inch(h)}"/>
        <Cell N="LineColor" V="#64748B"/>
        <Cell N="EndArrow" V="4"/>
        <Cell N="EndArrowSize" V="2"/>
        <Cell N="Char.Size" V="0.1111111111111111"/>
        <Cell N="Char.Color" V="#475569"/>
        ${flow.name ? `<Text><cp IX="0"/>${escapeXml(flow.name)}</Text>` : ''}
        <Section N="Geometry" IX="0">
          ${geomRows}
        </Section>
      </Shape>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<VisioDocument xmlns="http://schemas.microsoft.com/visio/2003/core"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               metric="0" DocLangID="1033" version="11.0">
  <DocumentSettings TopPage="0" DefaultTextStyle="0" DefaultLineStyle="0" DefaultFillStyle="0">
    <GlueSettings>9</GlueSettings>
    <SnapSettings>65847</SnapSettings>
    <SnapExtensions>13</SnapExtensions>
    <SnapAngles/>
    <DynamicGridEnabled>0</DynamicGridEnabled>
    <ProtectStyles>0</ProtectStyles>
    <ProtectShapes>0</ProtectShapes>
    <ProtectMasters>0</ProtectMasters>
    <ProtectBkgnds>0</ProtectBkgnds>
  </DocumentSettings>
  <Pages>
    <Page ID="0" Name="${escapeXml(processName)}" NameU="${escapeXml(processName)}">
      <PageSheet>
        <Cell N="PageWidth" V="${inch(pageW)}"/>
        <Cell N="PageHeight" V="${inch(pageH)}"/>
        <Cell N="ShdwOffsetX" V="0.125"/>
        <Cell N="ShdwOffsetY" V="-0.125"/>
        <Cell N="PageScale" V="1" U="IN"/>
        <Cell N="DrawingScale" V="1" U="IN"/>
        <Cell N="DrawingSizeType" V="3"/>
        <Cell N="DrawingScaleType" V="0"/>
        <Cell N="InhibitSnap" V="0"/>
      </PageSheet>
      <Shapes>${shapesXml}${connectorsXml}
      </Shapes>
    </Page>
  </Pages>
</VisioDocument>`
}

// ─── Actions ───
const handleConvert = () => {
  error.value = ''
  conversionSuccess.value = false
  visioBlob.value = null
  visioXml.value = ''
  summary.value = null

  if (!bpmnInput.value.trim()) {
    error.value = 'Please enter BPMN XML or upload a .bpmn file'
    return
  }

  isConverting.value = true
  try {
    const parsed = parseBpmn(bpmnInput.value)
    if (parsed.elements.length === 0) {
      throw new Error('No BPMN elements found. Please check your BPMN XML.')
    }

    const xml = generateVisioXml(parsed)
    visioXml.value = xml
    visioBlob.value = new Blob([xml], { type: 'application/vnd.ms-visio' })
    fileName.value = parsed.processName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'diagram'

    summary.value = {
      layoutMode: parsed.layoutMode,
      tasks: parsed.elements.filter((e) => e.type.includes('Task') || e.type === 'callActivity' || e.type === 'subProcess').length,
      events: parsed.elements.filter((e) => e.type.includes('Event')).length,
      gateways: parsed.elements.filter((e) => e.type.includes('Gateway')).length,
      other: parsed.elements.filter((e) => !e.type.includes('Task') && !e.type.includes('Event') && !e.type.includes('Gateway') && e.type !== 'callActivity' && e.type !== 'subProcess').length,
      flows: parsed.sequenceFlows.length,
      warnings: parsed.warnings.slice(0, 8)
    }
    conversionSuccess.value = true
  } catch (err) {
    error.value = (err as Error).message || 'Failed to convert BPMN to Visio format'
  } finally {
    isConverting.value = false
  }
}

async function copyVdx() {
  if (!visioXml.value) return
  try {
    await navigator.clipboard.writeText(visioXml.value)
    copiedVdx.value = true
    setTimeout(() => { copiedVdx.value = false }, 1500)
  } catch { /* clipboard unavailable */ }
}

function readFileAsText(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    bpmnInput.value = (e.target?.result as string) || ''
    error.value = ''
    conversionSuccess.value = false
    visioBlob.value = null
    summary.value = null
  }
  reader.onerror = () => { error.value = 'Failed to read file' }
  reader.readAsText(file)
}

const handleFileUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!/\.(bpmn|xml)$/i.test(file.name)) {
    error.value = 'Please upload a valid BPMN file (.bpmn or .xml)'
    return
  }
  readFileAsText(file)
}

// Drag & drop
const isDragging = ref(false)
function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  if (!/\.(bpmn|xml)$/i.test(file.name)) {
    error.value = 'Please drop a .bpmn or .xml file'
    return
  }
  readFileAsText(file)
}

const handleDownload = () => {
  if (!visioBlob.value) return
  const url = URL.createObjectURL(visioBlob.value)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName.value}.vdx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const fillSample = () => {
  bpmnInput.value = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             targetNamespace="http://formatho.com/bpmn/sample">
  <process id="OrderProcess" name="Order Fulfillment">
    <startEvent id="start" name="Order Received"/>
    <userTask id="validate" name="Validate Order"/>
    <serviceTask id="inventory" name="Check Inventory"/>
    <exclusiveGateway id="in_stock" name="In Stock?"/>
    <parallelGateway id="fork" name="Fork"/>
    <userTask id="payment" name="Take Payment"/>
    <serviceTask id="ship" name="Ship Order"/>
    <parallelGateway id="join" name="Join"/>
    <endEvent id="done" name="Order Complete"/>
    <endEvent id="backorder" name="Backorder"/>
    <sequenceFlow id="f1" sourceRef="start" targetRef="validate"/>
    <sequenceFlow id="f2" sourceRef="validate" targetRef="inventory"/>
    <sequenceFlow id="f3" name="yes" sourceRef="in_stock" targetRef="fork"/>
    <sequenceFlow id="f4" name="no" sourceRef="in_stock" targetRef="backorder"/>
    <sequenceFlow id="f5" sourceRef="inventory" targetRef="in_stock"/>
    <sequenceFlow id="f6" sourceRef="fork" targetRef="payment"/>
    <sequenceFlow id="f7" sourceRef="fork" targetRef="ship"/>
    <sequenceFlow id="f8" sourceRef="payment" targetRef="join"/>
    <sequenceFlow id="f9" sourceRef="ship" targetRef="join"/>
    <sequenceFlow id="f10" sourceRef="join" targetRef="done"/>
  </process>
  <bpmndi:BPMNDiagram id="diagram">
    <bpmndi:BPMNPlane bpmnElement="OrderProcess">
      <bpmndi:BPMNShape bpmnElement="start"><omgdc:Bounds x="150" y="200" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="validate"><omgdc:Bounds x="240" y="185" width="120" height="60"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="inventory"><omgdc:Bounds x="410" y="185" width="120" height="60"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="in_stock"><omgdc:Bounds x="580" y="183" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="fork"><omgdc:Bounds x="690" y="183" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="payment"><omgdc:Bounds x="800" y="90" width="120" height="60"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="ship"><omgdc:Bounds x="800" y="280" width="120" height="60"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="join"><omgdc:Bounds x="990" y="183" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="done"><omgdc:Bounds x="1100" y="190" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="backorder"><omgdc:Bounds x="580" y="380" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="f1"><omgdi:waypoint x="186" y="218"/><omgdi:waypoint x="240" y="215"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f2"><omgdi:waypoint x="360" y="215"/><omgdi:waypoint x="410" y="215"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f3"><omgdi:waypoint x="630" y="208"/><omgdi:waypoint x="690" y="208"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f4"><omgdi:waypoint x="605" y="233"/><omgdi:waypoint x="605" y="380"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f5"><omgdi:waypoint x="530" y="215"/><omgdi:waypoint x="580" y="208"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f6"><omgdi:waypoint x="715" y="183"/><omgdi:waypoint x="715" y="120"/><omgdi:waypoint x="800" y="120"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f7"><omgdi:waypoint x="715" y="233"/><omgdi:waypoint x="715" y="310"/><omgdi:waypoint x="800" y="310"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f8"><omgdi:waypoint x="920" y="120"/><omgdi:waypoint x="1015" y="120"/><omgdi:waypoint x="1015" y="183"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f9"><omgdi:waypoint x="920" y="310"/><omgdi:waypoint x="1015" y="310"/><omgdi:waypoint x="1015" y="233"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="f10"><omgdi:waypoint x="1040" y="208"/><omgdi:waypoint x="1100" y="208"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
  error.value = ''
  conversionSuccess.value = false
  visioBlob.value = null
  summary.value = null
}

// Sample without BPMNDI — exercises the layered auto-layout path
const fillSampleNoDi = () => {
  fillSample()
  bpmnInput.value = bpmnInput.value.replace(/<bpmndi:BPMNDiagram[\s\S]*?<\/bpmndi:BPMNDiagram>\s*/, '')
}

const reset = () => {
  bpmnInput.value = ''
  error.value = ''
  previewError.value = ''
  conversionSuccess.value = false
  visioBlob.value = null
  visioXml.value = ''
  summary.value = null
  fileName.value = 'diagram'
}

onMounted(() => {
  fillSample()
})

// Summon Flowtho on successful conversion
watch(conversionSuccess, (success) => {
  if (success && visioBlob.value) {
    summonTwin('flowtho', 'Conversion done. Your Visio file is ready.', 'bpmn-success', {
      x: 'right',
      y: 80
    })
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4 space-y-4">
    <Breadcrumb />

    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight">BPMN to Visio Converter</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Convert BPMN 2.0 diagrams to Microsoft Visio (.vdx) — live preview, exact layout preserved
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost" size="sm" @click="fillSample" aria-label="Load sample with layout data">Sample (with DI)</Button>
        <Button variant="ghost" size="sm" @click="fillSampleNoDi" aria-label="Load sample without layout data">Sample (no DI)</Button>
        <Button v-if="bpmnInput" variant="outline" size="sm" @click="reset" aria-label="Reset BPMN input">Reset</Button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Input -->
      <Card
        class="flex flex-col min-h-0"
        :class="isDragging ? 'border-primary border-dashed ring-2 ring-primary/20' : ''"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between gap-2">
            <CardTitle class="text-sm font-medium flex items-center gap-2">
              <FileCode class="h-4 w-4" />
              BPMN XML
              <span v-if="isDragging" class="text-[10px] text-primary font-semibold">drop to load</span>
            </CardTitle>
            <label class="cursor-pointer">
              <Button variant="secondary" size="sm" aria-label="Upload BPMN file">
                <Upload class="mr-2 h-4 w-4" />
                Upload .bpmn
              </Button>
              <input type="file" accept=".bpmn,.xml" class="hidden" @change="handleFileUpload" />
            </label>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="bpmnInput"
            language="xml"
            class="min-h-[280px] h-[420px] lg:h-full"
            placeholder="Paste your BPMN 2.0 XML here, upload a .bpmn file, or drag one onto this panel…"
          />
        </CardContent>
      </Card>

      <!-- Output panel -->
      <Card class="flex flex-col min-h-0">
        <CardContent class="pt-4 flex-1 min-h-0">
          <Tabs default-value="preview" class="h-full flex flex-col">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="summary" :disabled="!summary">Summary</TabsTrigger>
                <TabsTrigger value="vdx" :disabled="!visioXml">VDX XML</TabsTrigger>
              </TabsList>
              <div class="flex items-center gap-1">
                <Button variant="ghost" size="sm" class="h-7 px-2" aria-label="Zoom out" :disabled="!bpmnInput.trim()" @click="zoomPreview(-1)">
                  <ZoomOut class="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" class="h-7 px-2" aria-label="Zoom in" :disabled="!bpmnInput.trim()" @click="zoomPreview(1)">
                  <ZoomIn class="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" class="h-7 px-2" aria-label="Fit to viewport" :disabled="!bpmnInput.trim()" @click="fitPreview">
                  <Maximize2 class="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <TabsContent value="preview" class="flex-1 min-h-0 mt-3">
              <div class="relative h-[420px] lg:h-full min-h-[360px] border border-border rounded-lg bg-white overflow-hidden">
                <div ref="previewContainer" class="absolute inset-0" aria-label="BPMN diagram live preview"></div>
                <div v-if="isRendering" class="absolute inset-0 flex items-center justify-center bg-white/70">
                  <Loader2 class="w-5 h-5 animate-spin text-primary" />
                </div>
                <div v-else-if="previewError" class="absolute inset-0 flex items-start gap-2 p-4 overflow-auto">
                  <AlertCircle class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p class="text-xs text-red-600 font-mono break-all">{{ previewError }}</p>
                </div>
                <div v-else-if="!bpmnInput.trim()" class="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                  Paste BPMN XML to see a live preview
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" class="flex-1 min-h-0 mt-3 overflow-y-auto max-h-[460px]">
              <div v-if="summary" class="space-y-4">
                <div class="grid grid-cols-3 gap-2">
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold font-mono">{{ summary.tasks }}</p>
                    <p class="text-[10px] uppercase text-muted-foreground">Tasks & activities</p>
                  </div>
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold font-mono">{{ summary.events }}</p>
                    <p class="text-[10px] uppercase text-muted-foreground">Events</p>
                  </div>
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold font-mono">{{ summary.gateways }}</p>
                    <p class="text-[10px] uppercase text-muted-foreground">Gateways</p>
                  </div>
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold font-mono">{{ summary.flows }}</p>
                    <p class="text-[10px] uppercase text-muted-foreground">Sequence flows</p>
                  </div>
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold font-mono">{{ summary.other }}</p>
                    <p class="text-[10px] uppercase text-muted-foreground">Other nodes</p>
                  </div>
                  <div class="border border-border rounded-lg p-3 text-center">
                    <p class="text-xs font-semibold mt-1.5" :class="summary.layoutMode === 'di' ? 'text-green-600' : 'text-amber-600'">
                      {{ summary.layoutMode === 'di' ? 'DI layout preserved' : 'Auto layout' }}
                    </p>
                    <p class="text-[10px] uppercase text-muted-foreground">Positioning</p>
                  </div>
                </div>
                <div v-if="summary.layoutMode === 'di'" class="flex items-start gap-2 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <p class="text-xs text-muted-foreground">
                    Your file includes BPMN Diagram Interchange coordinates — the Visio output reproduces the exact
                    positions and connector routes from your modeler (Camunda, bpmn.io, Signavio).
                  </p>
                </div>
                <div v-else class="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <Info class="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p class="text-xs text-muted-foreground">
                    No layout data found in the XML — shapes were arranged automatically with a layered
                    left-to-right layout. Export with Diagram Interchange from your modeler for exact positioning.
                  </p>
                </div>
                <div v-if="summary.warnings.length" class="space-y-1.5">
                  <p class="text-xs font-semibold text-muted-foreground uppercase">Warnings</p>
                  <div v-for="(w, i) in summary.warnings" :key="i" class="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle class="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <span>{{ w }}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vdx" class="flex-1 min-h-0 mt-3">
              <div v-if="visioXml" class="space-y-2">
                <div class="flex justify-end">
                  <Button variant="outline" size="sm" class="h-7 text-xs" @click="copyVdx">
                    <Check v-if="copiedVdx" class="w-3.5 h-3.5 mr-1 text-green-600" />
                    <Copy v-else class="w-3.5 h-3.5 mr-1" />
                    {{ copiedVdx ? 'Copied' : 'Copy VDX XML' }}
                  </Button>
                </div>
                <pre class="text-[10px] font-mono whitespace-pre-wrap break-all border border-border rounded-lg p-3 max-h-[380px] overflow-y-auto bg-muted/20 m-0">{{ visioXml }}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>

    <!-- Error -->
    <Card v-if="error" class="border-red-300 bg-red-50">
      <CardContent class="py-3 flex items-center gap-3">
        <AlertCircle class="h-5 w-5 text-red-600 shrink-0" />
        <p class="text-sm text-red-700 font-medium">{{ error }}</p>
      </CardContent>
    </Card>

    <!-- Action bar -->
    <div class="flex flex-wrap items-center justify-center gap-3 py-1">
      <Button
        @click="handleConvert"
        :disabled="isConverting || !bpmnInput.trim()"
        size="lg"
        aria-label="Convert BPMN to Visio"
        class="px-8 rounded-lg bg-slate-800 hover:bg-slate-700"
      >
        <Loader2 v-if="isConverting" class="w-4 h-4 mr-2 animate-spin" />
        <span>{{ isConverting ? 'Converting…' : 'Convert to Visio' }}</span>
      </Button>
      <Button
        v-if="conversionSuccess && visioBlob"
        @click="handleDownload"
        size="lg"
        aria-label="Download Visio file"
        class="rounded-lg bg-green-600 hover:bg-green-700"
      >
        <Download class="mr-2 h-4 w-4" />
        Download {{ fileName }}.vdx
      </Button>
    </div>

    <!-- Feature strip -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>100% client-side — diagrams never leave your browser</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>Exact layout: BPMN Diagram Interchange positions and connector routes preserved</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>Live preview renders as you edit; summary shows exactly what converts</span>
      </div>
      <div class="flex items-start gap-2">
        <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
        <span>Outputs Visio VDX (.vdx) — opens in Visio 2010+ and Visio for the web, shapes stay editable</span>
      </div>
    </div>

    <!-- SEO: How to convert -->
    <section class="mt-8 space-y-4 prose-sm">
      <h2 class="text-xl font-bold">How to Convert BPMN to Visio</h2>
      <ol class="list-decimal pl-6 space-y-2 text-muted-foreground">
        <li><strong class="text-foreground">Export or copy your BPMN 2.0 XML</strong> — from Camunda Modeler, bpmn.io, Signavio, or any BPMN editor (File → Export → BPMN 2.0 XML). Keep the <code class="font-mono text-xs">BPMNDiagram</code> section so your layout carries over.</li>
        <li><strong class="text-foreground">Paste, upload, or drag the .bpmn file above</strong> — the live preview shows the rendered diagram while the converter parses tasks, events, gateways, and sequence flows entirely in your browser.</li>
        <li><strong class="text-foreground">Convert and download the .vdx file</strong> — open it in Microsoft Visio (2010+) or Visio for the web; shapes remain fully editable with names, colors, and connector labels.</li>
      </ol>

      <h2 class="text-xl font-bold mt-6">Layout Preservation (BPMN DI)</h2>
      <p class="text-muted-foreground">Most BPMN exports embed layout coordinates in a <code class="font-mono text-xs">BPMNDiagram</code> section (the Diagram Interchange). This converter reads those coordinates — shape positions, sizes, and connector waypoints — and reproduces them exactly in the Visio output. If your XML has no DI section, a layered left-to-right auto-layout is applied instead and the summary tells you so.</p>

      <h2 class="text-xl font-bold mt-6">How to Import BPMN into Visio</h2>
      <p class="text-muted-foreground">Visio has no built-in BPMN import. The usual path is the one above: convert the BPMN XML to Visio's VDX format first, then open the file directly (File → Open) — no Visio add-in or stencil install needed. If you only need to view a BPMN diagram, try our <a class="text-primary underline" href="/tools/bpmn">BPMN Viewer</a> instead.</p>

      <h2 class="text-xl font-bold mt-6">What This BPMN to Visio Converter Supports</h2>
      <ul class="list-disc pl-6 space-y-1 text-muted-foreground">
        <li>BPMN 2.0 XML from Camunda, bpmn.io, Flowable, Activiti, Signavio and Bizagi exports</li>
        <li>All task types (user, service, script, business rule, manual, send, receive), sub-processes and call activities</li>
        <li>Start, end, intermediate, and boundary events; exclusive, parallel, inclusive, event-based, and complex gateways</li>
        <li>Sequence flows with labels — connector routes follow BPMN DI waypoints when present</li>
        <li>Output: Visio VDX (.vdx), compatible with Visio 2010, 2013, 2016, 2019, 2021 and Microsoft 365</li>
      </ul>

      <h2 class="text-xl font-bold mt-6">Why Convert Client-Side?</h2>
      <p class="text-muted-foreground">Process diagrams often describe internal business logic — approval chains, system boundaries, vendors. Uploading them to an online converter server sends that picture of your operations to a third party. This converter runs 100% in your browser: <a class="text-primary underline" href="/blogs/developer-tools-that-dont-spy-on-you">no uploads, no tracking</a>, works offline once loaded.</p>
    </section>

    <!-- Related Tools -->
    <div class="mt-4 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/tools/bpmn"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">BPMN Viewer</h3>
          <p class="text-sm text-muted-foreground">View and export BPMN diagrams as PDF</p>
        </a>
        <a
          href="/tools/xml-json"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">XML to JSON Converter</h3>
          <p class="text-sm text-muted-foreground">Convert XML documents to JSON format</p>
        </a>
        <a
          href="/tools/xml-formatter"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">XML Formatter</h3>
          <p class="text-sm text-muted-foreground">Format and beautify XML documents</p>
        </a>
      </div>
    </div>
  </div>
</template>
