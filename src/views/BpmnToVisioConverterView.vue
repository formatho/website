<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { Upload, Download, FileCode, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import { useTwins } from '@/composables/useTwins'

const { summonTwin } = useTwins()

const bpmnInput = ref('')
const error = ref('')
const isConverting = ref(false)
const conversionSuccess = ref(false)
const visioBlob = ref<Blob | null>(null)
const fileName = ref('diagram')

// Auto-load comprehensive example BPMN on page load
onMounted(() => {
  fillSample()
})

// Summon Flowtho on successful conversion
watch(conversionSuccess, (success) => {
  if (success && visioBlob.value) {
    summonTwin('flowtho', 'Automation complete. Your Visio flow is ready.', 'bpmn-success', {
      x: 'right',
      y: 80
    })
  }
})

// Enhanced BPMN element type mapping to Visio shapes
const bpmnToVisioMap: Record<string, string> = {
  // Tasks (Activities)
  task: 'Process',
  userTask: 'Process',
  serviceTask: 'Process',
  scriptTask: 'Process',
  businessRuleTask: 'Decision',
  manualTask: 'Process',
  sendTask: 'Process',
  receiveTask: 'Process',
  multiInstanceTask: 'Process',
  adHocTask: 'Process',

  // Events
  startEvent: 'Terminator',
  endEvent: 'Terminator',
  intermediateCatchEvent: 'Process',
  intermediateThrowEvent: 'Process',
  boundaryEvent: 'Process',
  compensateEvent: 'Process',
  conditionalEvent: 'Process',
  errorEvent: 'Process',
  escalationEvent: 'Process',
  messageEvent: 'Process',
  signalEvent: 'Process',
  timerEvent: 'Process',

  // Gateways
  exclusiveGateway: 'Decision',
  parallelGateway: 'Process',
  inclusiveGateway: 'Decision',
  eventBasedGateway: 'Decision',
  complexGateway: 'Decision',

  // Subprocesses
  subProcess: 'Process',
  adHocSubProcess: 'Process',
  transaction: 'Process',
  callActivity: 'Process',
  callChoreography: 'Process',

  // Data Objects
  dataObject: 'Document',
  dataInput: 'Document',
  dataOutput: 'Document',
  dataStoreReference: 'Database',
  dataObjectReference: 'Document',

  // Artifacts
  group: 'Process',
  textAnnotation: 'Comment',
  association: 'Process',

  // Lanes and Pools
  lane: 'Process',
  pool: 'Process'
}

// Enhanced shape properties for better visual mapping
const bpmnShapeProperties: Record<string, { width: number; height: number; master?: string }> = {
  startEvent: { width: 1.5, height: 1.5, master: 'Rounded rectangle' },
  endEvent: { width: 1.5, height: 1.5, master: 'Rounded rectangle' },
  task: { width: 3, height: 1.5, master: 'Process' },
  userTask: { width: 3, height: 1.5, master: 'Process' },
  serviceTask: { width: 3, height: 1.5, master: 'Process' },
  exclusiveGateway: { width: 1.5, height: 1.5, master: 'Decision' },
  parallelGateway: { width: 1.5, height: 1.5, master: 'Decision' },
  dataObject: { width: 2.5, height: 1.5, master: 'Document' },
  textAnnotation: { width: 3, height: 1.5, master: 'Comment' }
}

// Parse BPMN XML and extract elements
const parseBpmn = (xml: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  // Check for parsing errors
  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('Invalid XML format: ' + parseError.textContent?.substring(0, 100))
  }

  // Verify it's a BPMN file
  const definitions = doc.querySelector('definitions, bpmn\\:definitions')
  if (!definitions) {
    throw new Error('Invalid BPMN format: No BPMN definitions found')
  }

  const elements: BpmnElement[] = []

  // Extract tasks
  const taskTypes = [
    'task',
    'userTask',
    'serviceTask',
    'scriptTask',
    'businessRuleTask',
    'manualTask',
    'sendTask',
    'receiveTask'
  ]

  taskTypes.forEach((type) => {
    const tasks = doc.querySelectorAll(type + ', bpmn\\:' + type)
    tasks.forEach((task, index) => {
      elements.push({
        id: task.getAttribute('id') || `${type}-${index}`,
        name: task.getAttribute('name') || type.replace(/([A-Z])/g, ' $1').trim(),
        type: type,
        visioType: bpmnToVisioMap[type] || 'Process'
      })
    })
  })

  // Extract events
  const eventTypes = ['startEvent', 'endEvent', 'intermediateCatchEvent', 'intermediateThrowEvent']
  eventTypes.forEach((type) => {
    const events = doc.querySelectorAll(type + ', bpmn\\:' + type)
    events.forEach((event, index) => {
      elements.push({
        id: event.getAttribute('id') || `${type}-${index}`,
        name: event.getAttribute('name') || type.replace(/([A-Z])/g, ' $1').trim(),
        type: type,
        visioType: bpmnToVisioMap[type] || 'Terminator'
      })
    })
  })

  // Extract gateways
  const gatewayTypes = [
    'exclusiveGateway',
    'parallelGateway',
    'inclusiveGateway',
    'eventBasedGateway',
    'complexGateway'
  ]
  gatewayTypes.forEach((type) => {
    const gateways = doc.querySelectorAll(type + ', bpmn\\:' + type)
    gateways.forEach((gateway, index) => {
      elements.push({
        id: gateway.getAttribute('id') || `${type}-${index}`,
        name: gateway.getAttribute('name') || type.replace(/([A-Z])/g, ' $1').trim(),
        type: type,
        visioType: bpmnToVisioMap[type] || 'Decision'
      })
    })
  })

  // Extract sequence flows
  const flows = doc.querySelectorAll('sequenceFlow, bpmn\\:sequenceFlow')
  const sequenceFlows: SequenceFlow[] = []
  flows.forEach((flow, index) => {
    sequenceFlows.push({
      id: flow.getAttribute('id') || `flow-${index}`,
      name: flow.getAttribute('name') || '',
      sourceRef: flow.getAttribute('sourceRef') || '',
      targetRef: flow.getAttribute('targetRef') || ''
    })
  })

  return { elements, sequenceFlows, processName: extractProcessName(doc) }
}

const extractProcessName = (doc: Document): string => {
  const process = doc.querySelector('process, bpmn\\:process')
  if (process) {
    const name = process.getAttribute('name')
    if (name) return name
    const id = process.getAttribute('id')
    if (id) return id
  }
  return 'BPMN-Diagram'
}

// Generate Visio VDX XML
const generateVisioXml = (data: {
  elements: BpmnElement[]
  sequenceFlows: SequenceFlow[]
  processName: string
}): string => {
  const { elements, sequenceFlows, processName } = data

  // Enhanced shape properties for better visual mapping
  const bpmnShapeProperties: Record<string, { width: number; height: number; master?: string }> = {
    startEvent: { width: 1.5, height: 1.5, master: 'Rounded rectangle' },
    endEvent: { width: 1.5, height: 1.5, master: 'Rounded rectangle' },
    task: { width: 3, height: 1.5, master: 'Process' },
    userTask: { width: 3, height: 1.5, master: 'Process' },
    serviceTask: { width: 3, height: 1.5, master: 'Process' },
    exclusiveGateway: { width: 1.5, height: 1.5, master: 'Decision' },
    parallelGateway: { width: 1.5, height: 1.5, master: 'Decision' },
    dataObject: { width: 2.5, height: 1.5, master: 'Document' },
    textAnnotation: { width: 3, height: 1.5, master: 'Comment' }
  }

  // Enhanced layout algorithm - flow-based positioning
  const elementPositions = new Map<string, { x: number; y: number }>()

  // Group elements by type for better organization
  const startEvents = elements.filter((el) => el.type === 'startEvent')
  const endEvents = elements.filter((el) => el.type === 'endEvent')
  const tasks = elements.filter((el) => el.type.includes('Task'))
  const gateways = elements.filter((el) => el.type.includes('Gateway'))
  const otherElements = elements.filter(
    (el) =>
      !startEvents.includes(el) &&
      !endEvents.includes(el) &&
      !tasks.includes(el) &&
      !gateways.includes(el)
  )

  // Position elements in logical flow order
  let yPos = 8

  // Position start events at the left
  startEvents.forEach((el, index) => {
    elementPositions.set(el.id, { x: 1, y: yPos - (startEvents.length - 1 - index) * 2 })
  })

  // Position tasks in the middle columns
  tasks.forEach((el, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    elementPositions.set(el.id, { x: 4 + col * 3, y: 8 - row * 2 })
  })

  // Position gateways
  gateways.forEach((el, index) => {
    const row = Math.floor(index / 2)
    const col = index % 2
    elementPositions.set(el.id, { x: 7 + col * 3, y: 8 - row * 2 })
  })

  // Position end events at the right
  endEvents.forEach((el, index) => {
    elementPositions.set(el.id, { x: 13, y: yPos - (endEvents.length - 1 - index) * 2 })
  })

  // Position other elements
  otherElements.forEach((el, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    elementPositions.set(el.id, { x: 10 + col * 1.5, y: 4 - row * 1.5 })
  })

  // Fallback for any unpositioned elements
  elements.forEach((el, index) => {
    if (!elementPositions.has(el.id)) {
      const row = Math.floor(index / 4)
      const col = index % 4
      elementPositions.set(el.id, {
        x: 1 + col * 3,
        y: 8 - row * 2
      })
    }
  })

  const _now = new Date().toISOString()

  // Build shapes XML
  let shapesXml = ''
  elements.forEach((el, index) => {
    const pos = elementPositions.get(el.id) || { x: 1, y: 1 }
    const shapeId = index + 1
    shapesXml += `
      <Shape ID="${shapeId}" Type="${el.visioType}" LineStyle="3" FillStyle="3" TextStyle="3">
        <Cell N="PinX" V="${pos.x}"/>
        <Cell N="PinY" V="${pos.y}"/>
        <Cell N="Width" V="${bpmnShapeProperties[el.type]?.width || 1.5}"/>
        <Cell N="Height" V="${bpmnShapeProperties[el.type]?.height || 0.75}"/>
        <Cell N="FillForegnd" V="${
          el.type === 'startEvent'
            ? '#10B981'
            : el.type === 'endEvent'
              ? '#EF4444'
              : el.type === 'exclusiveGateway'
                ? '#3B82F6'
                : el.type === 'parallelGateway'
                  ? '#8B5CF6'
                  : el.type === 'task'
                    ? '#F59E0B'
                    : el.type === 'userTask'
                      ? '#06B6D4'
                      : el.type === 'serviceTask'
                        ? '#84CC16'
                        : '#FFFFFF'
        }"/>
        <Cell N="FillBkgnd" V="${
          el.type === 'startEvent'
            ? '#10B981'
            : el.type === 'endEvent'
              ? '#EF4444'
              : el.type === 'exclusiveGateway'
                ? '#3B82F6'
                : el.type === 'parallelGateway'
                  ? '#8B5CF6'
                  : el.type === 'task'
                    ? '#F59E0B'
                    : el.type === 'userTask'
                      ? '#06B6D4'
                      : el.type === 'serviceTask'
                        ? '#84CC16'
                        : '#F8FAFC'
        }"/>
        <Cell N="LineWeight" V="0.01041666666666667"/>
        <Cell N="LineColor" V="${
          el.type === 'startEvent'
            ? '#059669'
            : el.type === 'endEvent'
              ? '#DC2626'
              : el.type === 'exclusiveGateway'
                ? '#2563EB'
                : el.type === 'parallelGateway'
                  ? '#7C3AED'
                  : el.type === 'task'
                    ? '#D97706'
                    : el.type === 'userTask'
                      ? '#0891B2'
                      : el.type === 'serviceTask'
                        ? '#65A30D'
                        : '#94A3B8'
        }"/>
        <Text><cp IX="0"/><pp IX="0/>${escapeXml(el.name)}</Text>
        <Section N="Geometry" IX="0">
          <Row T="RelMoveTo"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="1"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="1"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="0"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
        </Section>
      </Shape>`
  })

  // Build connectors XML for sequence flows
  let connectorsXml = ''
  sequenceFlows.forEach((flow, index) => {
    const sourcePos = elementPositions.get(flow.sourceRef)
    const targetPos = elementPositions.get(flow.targetRef)

    if (sourcePos && targetPos) {
      const connectorId = elements.length + index + 1
      connectorsXml += `
      <Shape ID="${connectorId}" Type="Shape" LineStyle="1" FillStyle="1" TextStyle="1">
        <Cell N="PinX" V="${(sourcePos.x + targetPos.x) / 2}"/>
        <Cell N="PinY" V="${(sourcePos.y + targetPos.y) / 2}"/>
        <Cell N="BeginX" V="${sourcePos.x + 0.75}"/>
        <Cell N="BeginY" V="${sourcePos.y}"/>
        <Cell N="EndX" V="${targetPos.x - 0.75}"/>
        <Cell N="EndY" V="${targetPos.y}"/>
        <Cell N="LineColor" V="#94A3B8"/>
        <Section N="Geometry" IX="0">
          <Row T="MoveTo"><Cell N="X" V="0" F="Width*0"/><Cell N="Y" V="0.5" F="Height*0.5"/></Row>
          <Row T="LineTo"><Cell N="X" V="1" F="Width*1"/><Cell N="Y" V="0.5" F="Height*0.5"/></Row>
        </Section>
      </Shape>`
    }
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
  <Colors>
    <ColorEntry IX="0" RGB="#000000"/>
    <ColorEntry IX="1" RGB="#FFFFFF"/>
    <ColorEntry IX="2" RGB="#FF0000"/>
    <ColorEntry IX="3" RGB="#00FF00"/>
    <ColorEntry IX="4" RGB="#0000FF"/>
    <ColorEntry IX="5" RGB="#FFFF00"/>
    <ColorEntry IX="6" RGB="#FF00FF"/>
    <ColorEntry IX="7" RGB="#00FFFF"/>
    <ColorEntry IX="8" RGB="#800000"/>
    <ColorEntry IX="9" RGB="#008000"/>
    <ColorEntry IX="10" RGB="#000080"/>
    <ColorEntry IX="11" RGB="#808000"/>
    <ColorEntry IX="12" RGB="#800080"/>
    <ColorEntry IX="13" RGB="#008080"/>
    <ColorEntry IX="14" RGB="#C0C0C0"/>
    <ColorEntry IX="15" RGB="#E6E6E6"/>
    <ColorEntry IX="16" RGB="#CDCDCD"/>
    <ColorEntry IX="17" RGB="#B3B3B3"/>
    <ColorEntry IX="18" RGB="#9A9A9A"/>
    <ColorEntry IX="19" RGB="#808080"/>
    <ColorEntry IX="20" RGB="#666666"/>
    <ColorEntry IX="21" RGB="#4D4D4D"/>
    <ColorEntry IX="22" RGB="#333333"/>
    <ColorEntry IX="23" RGB="#1A1A1A"/>
  </Colors>
  <StyleSheets>
    <StyleSheet ID="0" Name="Normal">
      <Line>
        <LineWeight>0.01041666666666667</LineWeight>
        <LineColor>0</LineColor>
        <LinePattern>1</LinePattern>
        <Rounding>0</Rounding>
        <BeginArrow>0</BeginArrow>
        <EndArrow>0</EndArrow>
      </Line>
      <Fill>
        <FillForegnd>1</FillForegnd>
        <FillBkgnd>0</FillBkgnd>
        <FillPattern>1</FillPattern>
        <ShdwForegnd>0</ShdwForegnd>
        <ShdwBkgnd>1</ShdwBkgnd>
        <ShdwPattern>0</ShdwPattern>
      </Fill>
      <Text>
        <Font>Calibri</Font>
        <Size>0.1666666666666667</Size>
        <Color>0</Color>
        <Style>0</Style>
        <Case>0</Case>
        <Pos>0</Pos>
        <Strikethru>0</Strikethru>
        <DoubleStrikethrough>0</DoubleStrikethrough>
        <Overline>0</Overline>
        <DoubleUnderline>0</DoubleUnderline>
        <SmallCaps>0</SmallCaps>
        <Outline>0</Outline>
        <Shadow>0</Shadow>
        <VerticalText>0</VerticalText>
        <Letterspace>0</Letterspace>
        <ColorTrans>0</ColorTrans>
      </Text>
    </StyleSheet>
  </StyleSheets>
  <Pages>
    <Page ID="0" Name="${escapeXml(processName)}" NameU="${escapeXml(processName)}">
      <PageProps>
        <PageWidth>11</PageWidth>
        <PageHeight>8.5</PageHeight>
        <ShdwOffsetX>0.125</ShdwOffsetX>
        <ShdwOffsetY>-0.125</ShdwOffsetY>
        <PageScale Unit="IN">1</PageScale>
        <DrawingScale Unit="IN">1</DrawingScale>
        <DrawingSizeType>0</DrawingSizeType>
        <DrawingScaleType>0</DrawingScaleType>
        <InhibitSnap>0</InhibitSnap>
      </PageProps>
      <PageSheet>
        <PageProps>
          <PageWidth>11</PageWidth>
          <PageHeight>8.5</PageHeight>
          <ShdwOffsetX>0.125</ShdwOffsetX>
          <ShdwOffsetY>-0.125</ShdwOffsetY>
          <PageScale Unit="IN">1</PageScale>
          <DrawingScale Unit="IN">1</DrawingScale>
          <DrawingSizeType>0</DrawingSizeType>
          <DrawingScaleType>0</DrawingScaleType>
          <InhibitSnap>0</InhibitSnap>
        </PageProps>
      </PageSheet>
      <Shapes>${shapesXml}${connectorsXml}
      </Shapes>
    </Page>
  </Pages>
</VisioDocument>`
}

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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

const handleConvert = () => {
  error.value = ''
  conversionSuccess.value = false
  visioBlob.value = null

  if (!bpmnInput.value.trim()) {
    error.value = 'Please enter BPMN XML or upload a .bpmn file'
    return
  }

  isConverting.value = true

  try {
    const parsedData = parseBpmn(bpmnInput.value)

    if (parsedData.elements.length === 0) {
      throw new Error('No BPMN elements found. Please check your BPMN XML.')
    }

    const visioXml = generateVisioXml(parsedData)

    // Create blob
    visioBlob.value = new Blob([visioXml], { type: 'application/vnd.ms-visio' })
    fileName.value = parsedData.processName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'diagram'
    conversionSuccess.value = true
  } catch (err: any) {
    error.value = err.message || 'Failed to convert BPMN to Visio format'
    console.error('Conversion error:', err)
  } finally {
    isConverting.value = false
  }
}

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (!file.name.endsWith('.bpmn') && !file.name.endsWith('.xml')) {
    error.value = 'Please upload a valid BPMN file (.bpmn or .xml)'
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    const content = event.target?.result as string
    bpmnInput.value = content
    error.value = ''
    conversionSuccess.value = false
    visioBlob.value = null
  }
  reader.onerror = () => {
    error.value = 'Failed to read file'
  }
  reader.readAsText(file)
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
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             targetNamespace="http://formatho.com/bpmn/sample">
  <!-- Enhanced BPMN showcasing all Phase 1 features -->
  <process id="CustomerOrderWorkflow" name="Customer Order Processing System">
    
    <!-- === START EVENTS === -->
    <startEvent id="start_order" name="New Order Received"/>
    <startEvent id="start_emergency" name="Emergency Order">
      <timerEventDefinition/>
    </startEvent>
    
    <!-- === DATA OBJECTS (demonstrates Phase 1 enhancements) -->
    <dataObject id="order_data" name="Order Details"/>
    <dataObject id="customer_data" name="Customer Information"/>
    <dataObject id="inventory_data" name="Inventory Data"/>
    <dataStoreReference id="database" name="Customer Database"/>
    
    <!-- === TASKS (multiple types to showcase color coding) -->
    <userTask id="validate_order" name="Validate Customer Order"/>
    <serviceTask id="check_inventory" name="Check Inventory"/>
    <scriptTask id="calculate_total" name="Calculate Total Cost"/>
    <businessRuleTask id="apply_discount" name="Apply Business Rules"/>
    <manualTask id="manual_review" name="Manual Review Required"/>
    <sendTask id="send_confirmation" name="Send Order Confirmation"/>
    <receiveTask id="receive_payment" name="Receive Payment"/>
    
    <!-- === GATEWAYS (multiple types to showcase layout) -->
    <exclusiveGateway id="inventory_decision" name="In Stock?"/>
    <parallelGateway id="parallel_process" name="Parallel Processing"/>
    <inclusiveGateway id="approval_decision" name="Approval Decision"/>
    <eventBasedGateway id="payment_gateway" name="Payment Method"/>
    <complexGateway id="complex_validation" name="Complex Validation"/>
    
    <!-- === INTERMEDIATE EVENTS (showcasing event support) -->
    <intermediateCatchEvent id="payment_timeout" name="Payment Timeout">
      <timerEventDefinition/>
    </intermediateCatchEvent>
    <intermediateThrowEvent id="notification_sent" name="Notification Sent"/>
    <boundaryEvent id="cancel_event" name="Order Cancelled" attachedToRef="validate_order">
      <errorEventDefinition/>
    </boundaryEvent>
    <intermediateCatchEvent id="escalation_event" name="Escalation Required">
      <escalationEventDefinition/>
    </intermediateCatchEvent>
    <intermediateThrowEvent id="message_event" name="Order Shipped">
      <messageEventDefinition/>
    </intermediateThrowEvent>
    <intermediateCatchEvent id="signal_event" name="Signal Received">
      <signalEventDefinition/>
    </intermediateCatchEvent>
    
    <!-- === SUBPROCESS (demonstrating extended element support) -->
    <subProcess id="fulfillment_process" name="Order Fulfillment">
      <startEvent id="fulfillment_start" name="Start Fulfillment"/>
      <serviceTask id="pick_items" name="Pick Items"/>
      <serviceTask id="pack_items" name="Pack Items"/>
      <endEvent id="fulfillment_end" name="Fulfillment Complete"/>
      <sequenceFlow id="flow_fulfillment_1" sourceRef="fulfillment_start" targetRef="pick_items"/>
      <sequenceFlow id="flow_fulfillment_2" sourceRef="pick_items" targetRef="pack_items"/>
      <sequenceFlow id="flow_fulfillment_3" sourceRef="pack_items" targetRef="fulfillment_end"/>
    </subProcess>
    
    <callActivity id="call_shipping" name="Call Shipping Service"/>
    
    <!-- === SEQUENCE FLOWS (with names to showcase flow layout) -->
    <sequenceFlow id="flow_start" sourceRef="start_order" targetRef="validate_order"/>
    <sequenceFlow id="flow_emergency" sourceRef="start_emergency" targetRef="manual_review"/>
    <sequenceFlow id="flow_1" sourceRef="validate_order" targetRef="check_inventory"/>
    <sequenceFlow id="flow_2" sourceRef="check_inventory" targetRef="calculate_total"/>
    <sequenceFlow id="flow_3" sourceRef="calculate_total" targetRef="apply_discount"/>
    <sequenceFlow id="flow_4" sourceRef="apply_discount" targetRef="inventory_decision"/>
    <sequenceFlow id="flow_in_stock" sourceRef="inventory_decision" targetRef="parallel_process">In Stock</sequenceFlow>
    <sequenceFlow id="flow_out_of_stock" sourceRef="inventory_decision" targetRef="notification_sent">Out of Stock</sequenceFlow>
    <sequenceFlow id="flow_parallel_1" sourceRef="parallel_process" targetRef="receive_payment"/>
    <sequenceFlow id="flow_parallel_2" sourceRef="parallel_process" targetRef="send_confirmation"/>
    <sequenceFlow id="flow_5" sourceRef="receive_payment" targetRef="approval_decision"/>
    <sequenceFlow id="flow_6" sourceRef="send_confirmation" targetRef="approval_decision"/>
    <sequenceFlow id="flow_approved" sourceRef="approval_decision" targetRef="call_shipping">Approved</sequenceFlow>
    <sequenceFlow id="flow_rejected" sourceRef="approval_decision" targetRef="manual_review">Needs Review</sequenceFlow>
    <sequenceFlow id="flow_7" sourceRef="call_shipping" targetRef="notification_sent"/>
    <sequenceFlow id="flow_8" sourceRef="manual_review" targetRef="complex_validation"/>
    <sequenceFlow id="flow_9" sourceRef="complex_validation" targetRef="payment_gateway"/>
    <sequenceFlow id="flow_card" sourceRef="payment_gateway" targetRef="receive_payment">Card Payment</sequenceFlow>
    <sequenceFlow id="flow_cash" sourceRef="payment_gateway" targetRef="manual_review">Cash Payment</sequenceFlow>
    
    <!-- === END EVENTS (demonstrating multiple end points) -->
    <endEvent id="end_success" name="Order Completed"/>
    <endEvent id="end_failed" name="Order Failed"/>
    <endEvent id="end_cancelled" name="Order Cancelled"/>
    
    <!-- === TEXT ANNOTATION (showcasing artifact support) -->
    <textAnnotation id="note1" textFormat="text/plain">Note: Emergency orders skip validation and go directly to manual review.</textAnnotation>
    <textAnnotation id="note2" textFormat="text/plain">Parallel processing: payment and confirmation can happen simultaneously.</textAnnotation>
    
    <!-- === ASSOCIATIONS (connecting annotations to elements) -->
    <association id="assoc1" sourceRef="note1" targetRef="manual_review"/>
    <association id="assoc2" sourceRef="note2" targetRef="parallel_process"/>
    
    <!-- === GROUPS (demonstrating group support) -->
    <group id="validation_group" name="Validation Group">
      <!-- Group contains related elements visually -->
    </group>
    <group id="fulfillment_group" name="Fulfillment Group">
      <!-- Group contains fulfillment-related elements -->
    </group>
    
  </process>
  
  <!-- Additional process to demonstrate lane support -->
  <process id="SupportProcess" name="Customer Support Process" isExecutable="false">
    <laneSet>
      <lane id="customer_lane" name="Customer">
        <startEvent id="support_start" name="Support Request"/>
        <userTask id="customer_task" name="Provide Details"/>
        <sequenceFlow id="support_flow_1" sourceRef="support_start" targetRef="customer_task"/>
      </lane>
      <lane id="support_lane" name="Support Agent">
        <serviceTask id="support_agent" name="Review Request"/>
        <endEvent id="support_end" name="Issue Resolved"/>
        <sequenceFlow id="support_flow_2" sourceRef="customer_task" targetRef="support_agent"/>
        <sequenceFlow id="support_flow_3" sourceRef="support_agent" targetRef="support_end"/>
      </lane>
    </laneSet>
  </process>
</definitions>`
  error.value = ''
  conversionSuccess.value = false
  visioBlob.value = null
}

const reset = () => {
  bpmnInput.value = ''
  error.value = ''
  conversionSuccess.value = false
  visioBlob.value = null
  fileName.value = 'diagram'
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">BPMN to Visio Converter</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Convert BPMN 2.0 process diagrams to Microsoft Visio (.vdx) format
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost" @click="fillSample" aria-label="Load sample BPMN XML"
          >Load Sample</Button
        >
        <Button v-if="bpmnInput" variant="outline" @click="reset" aria-label="Reset BPMN input"
          >Reset</Button
        >
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-4 flex-1 min-h-0">
      <!-- Input Section -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium flex items-center gap-2">
              <FileCode class="h-4 w-4" />
              BPMN XML Input
            </CardTitle>
            <label class="cursor-pointer">
              <Button
                variant="secondary"
                size="sm"
                aria-label="Upload BPMN file"
                class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg"
              >
                <Upload class="mr-2 h-4 w-4" />
                Upload .bpmn File
              </Button>
              <input type="file" accept=".bpmn,.xml" class="hidden" @change="handleFileUpload" />
            </label>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="bpmnInput"
            language="xml"
            class="min-h-[256px] md:h-full"
            placeholder="Paste your BPMN XML here, or upload a .bpmn file above..."
          />
        </CardContent>
      </Card>
    </div>

    <!-- Error Display -->
    <Card v-if="error" class="border-red-300 bg-red-50">
      <CardContent class="py-3 flex items-center gap-3">
        <AlertCircle class="h-5 w-5 text-red-600 shrink-0" />
        <p class="text-sm text-red-700 font-medium">{{ error }}</p>
      </CardContent>
    </Card>

    <!-- Action Bar -->
    <div class="flex justify-center py-2">
      <Button
        @click="handleConvert"
        :disabled="isConverting || !bpmnInput.trim()"
        size="lg"
        aria-label="Convert BPMN to Visio"
        class="px-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-slate-800 hover:bg-slate-700"
      >
        <span v-if="isConverting">Converting...</span>
        <span v-else>Convert to Visio</span>
      </Button>
    </div>

    <!-- Success & Download Section -->
    <Card v-if="conversionSuccess && visioBlob" class="border-green-300 bg-green-50">
      <CardContent class="py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <CheckCircle2 class="h-6 w-6 text-green-600 shrink-0" />
            <div>
              <p class="text-sm font-semibold text-green-800">Conversion Successful!</p>
              <p class="text-xs text-green-600">Your Visio file is ready for download</p>
            </div>
          </div>
          <Button
            @click="handleDownload"
            aria-label="Download Visio file"
            class="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-green-600 hover:bg-green-700"
          >
            <Download class="mr-2 h-4 w-4" />
            Download Visio (.vdx)
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Info Section -->
    <div class="mt-auto pt-4 border-t border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div class="flex items-start gap-2">
          <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <span>100% client-side processing - your data never leaves the browser</span>
        </div>
        <div class="flex items-start gap-2">
          <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <span>Supports tasks, events, gateways, and sequence flows</span>
        </div>
        <div class="flex items-start gap-2">
          <CheckCircle2 class="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <span>Outputs Microsoft Visio VDX format (.vdx)</span>
        </div>
      </div>
    </div>

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
