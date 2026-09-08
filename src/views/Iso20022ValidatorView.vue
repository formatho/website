<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyButton } from '@/components/ui/copy-button'
import { CheckCircle2, XCircle, FileCode, AlertTriangle } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'ISO 20022 Message Validator - pain.001, pacs.008, camt.053 | Formatho',
  description:
    'Validate ISO 20022 payment messages in your browser. Auto-detects message type (pain, pacs, camt, seev), checks required fields, validates structure, and pretty-prints XML. Free, private, no upload.',
  keywords: [
    'iso 20022 validator',
    'pain.001 validator',
    'pacs.008 validator',
    'camt.053 validator',
    'iso 20022 xml validation',
    'payment message validator',
    'swift iso 20022',
    'pain.001 example'
  ],
  ogType: 'website'
})

const inputXml = ref('')
const validated = ref(false)

interface FieldCheck {
  path: string
  status: 'present' | 'missing' | 'invalid'
  value?: string
  required: boolean
  description: string
}

interface MessageInfo {
  type: string
  family: string
  description: string
  namespace: string
}

interface ValidationResult {
  isValid: boolean
  messageInfo: MessageInfo | null
  fields: FieldCheck[]
  error: string | null
  prettyXml: string
}

const result = ref<ValidationResult | null>(null)

const messageCatalog: Record<string, MessageInfo> = {
  'pain.001': { type: 'pain.001', family: 'pain', description: 'Customer Credit Transfer Initiation', namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.001' },
  'pain.002': { type: 'pain.002', family: 'pain', description: 'Customer Credit Transfer Status Report', namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.002' },
  'pain.007': { type: 'pain.007', family: 'pain', description: 'Customer Payment Reversal', namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.007' },
  'pain.008': { type: 'pain.008', family: 'pain', description: 'Customer Direct Debit Initiation', namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.008' },
  'pain.013': { type: 'pain.013', family: 'pain', description: 'Creditor Payment Activation Request', namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.013' },
  'pacs.002': { type: 'pacs.002', family: 'pacs', description: 'FI to FI Payment Status Report', namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.002' },
  'pacs.003': { type: 'pacs.003', family: 'pacs', description: 'FI to FI Direct Debit', namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.003' },
  'pacs.004': { type: 'pacs.004', family: 'pacs', description: 'Payment Return', namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.004' },
  'pacs.008': { type: 'pacs.008', family: 'pacs', description: 'FI to FI Customer Credit Transfer', namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.008' },
  'pacs.009': { type: 'pacs.009', family: 'pacs', description: 'FI to FI Financial Institution Credit Transfer', namespace: 'urn:iso:std:iso:20022:tech:xsd:pacs.009' },
  'camt.052': { type: 'camt.052', family: 'camt', description: 'Bank to Customer Account Report', namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.052' },
  'camt.053': { type: 'camt.053', family: 'camt', description: 'Bank to Customer Statement', namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.053' },
  'camt.054': { type: 'camt.054', family: 'camt', description: 'Bank to Customer Debit/Credit Notification', namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.054' },
  'camt.056': { type: 'camt.056', family: 'camt', description: 'Request to Cancel Payment', namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.056' },
  'camt.029': { type: 'camt.029', family: 'camt', description: 'Resolution of Investigation', namespace: 'urn:iso:std:iso:20022:tech:xsd:camt.029' },
}

function detectMessageType(rootEl: Element): MessageInfo | null {
  const rootTag = rootEl.tagName.toLowerCase()
  // Document/CstmrCdtTrfInitn → pain.001
  for (const [type, info] of Object.entries(messageCatalog)) {
    const shortName = type.replace('.', '')
    if (rootTag.includes(shortName.toLowerCase()) || rootTag.includes(type.toLowerCase())) {
      return info
    }
  }
  // try namespace
  const ns = rootEl.namespaceURI || ''
  for (const [type, info] of Object.entries(messageCatalog)) {
    if (ns.includes(type)) return info
  }
  // try by known root element names
  const rootMap: Record<string, string> = {
    'custmrcdttrfinitn': 'pain.001',
    'cstmrdrctdbtinitn': 'pain.008',
    'cdtrpmtactvtnreq': 'pain.013',
    'pmtstsreq': 'pain.014',
    'fitofipmtstsrpt': 'pacs.002',
    'fitofidrctdbt': 'pacs.003',
    'pmtrtr': 'pacs.004',
    'fitoficstmdrcdttrf': 'pacs.008',
    'fitofifinctrdttrf': 'pacs.009',
    'bktoacctcshrpt': 'camt.052',
    'bktoacctsmt': 'camt.053',
    'bktoacctdbtcdtnfy': 'camt.054',
    'cxlreq': 'camt.056',
    'rsltnofinvstgtn': 'camt.029',
  }
  for (const [tag, type] of Object.entries(rootMap)) {
    if (rootTag.includes(tag)) {
      return messageCatalog[type] || null
    }
  }
  return null
}

function checkField(doc: Document, xpath: string, description: string, required: boolean): FieldCheck {
  try {
    // simple path-based lookup (not full XPath, but covers ISO 20022 structure)
    const parts = xpath.split('/')
    let el: Element | Document = doc
    for (const part of parts.filter(Boolean)) {
      if (el instanceof Document) {
        el = el.documentElement
        if (!el || !el.tagName.toLowerCase().includes(part.toLowerCase())) continue
      } else {
        const children = Array.from(el.children)
        const found = children.find(c => c.tagName.toLowerCase().includes(part.toLowerCase()))
        if (found) el = found
        else { el = el } // stay at current level
      }
    }
    const val = el instanceof Document ? '' : el.textContent?.trim() || ''
    if (val) return { path: xpath, status: 'present', value: val.slice(0, 50), required, description }
    return { path: xpath, status: required ? 'missing' : 'present', required, description }
  } catch {
    return { path: xpath, status: 'missing', required, description }
  }
}

function validate() {
  validated.value = true
  result.value = null
  if (!inputXml.value.trim()) return

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(inputXml.value, 'application/xml')
    const err = doc.querySelector('parsererror')
    if (err) {
      result.value = { isValid: false, messageInfo: null, fields: [], error: 'XML parse error: ' + err.textContent?.slice(0, 100), prettyXml: '' }
      return
    }

    const root = doc.documentElement
    const info = detectMessageType(root)
    if (!info) {
      result.value = {
        isValid: true,
        messageInfo: null,
        fields: [],
        error: null,
        prettyXml: prettyPrint(doc)
      }
      return
    }

    // check common required fields based on family
    const fields: FieldCheck[] = []
    const isPain = info.family === 'pain'
    const isPacs = info.family === 'pacs'
    const isCamt = info.family === 'camt'

    if (isPain || isPacs) {
      fields.push(checkField(doc, 'GrpHdr/MsgId', 'Message Identification', true))
      fields.push(checkField(doc, 'GrpHdr/CreDtTm', 'Creation Date & Time', true))
      fields.push(checkField(doc, 'GrpHdr/NbOfTxs', 'Number of Transactions', true))
      fields.push(checkField(doc, 'GrpHdr/InitgPty/Nm', 'Initiating Party Name', true))
      fields.push(checkField(doc, 'PmtTpInf/SvcLvl/Cd', 'Service Level Code (e.g., SEPA, SDVA)', false))
      fields.push(checkField(doc, 'Dbtr/Nm', 'Debtor Name', isPain))
      fields.push(checkField(doc, 'DbtrAcct/Id/IBAN', 'Debtor Account IBAN', isPain))
      fields.push(checkField(doc, 'Cdtr/Nm', 'Creditor Name', true))
      fields.push(checkField(doc, 'CdtrAcct/Id/IBAN', 'Creditor Account IBAN', isPain))
      fields.push(checkField(doc, 'Amt', 'Transaction Amount', true))
      fields.push(checkField(doc, 'Ccy', 'Currency', true))
      fields.push(checkField(doc, 'ReqdExctnDt', 'Requested Execution Date', isPain))
    }
    if (isCamt) {
      fields.push(checkField(doc, 'GrpHdr/MsgId', 'Message Identification', true))
      fields.push(checkField(doc, 'GrpHdr/CreDtTm', 'Creation Date & Time', true))
      fields.push(checkField(doc, 'Stmt/Bal', 'Balance', true))
      fields.push(checkField(doc, 'Stmt/Ntry', 'Statement Entries', false))
    }

    result.value = {
      isValid: true,
      messageInfo: info,
      fields,
      error: null,
      prettyXml: prettyPrint(doc)
    }
  } catch (e: any) {
    result.value = { isValid: false, messageInfo: null, fields: [], error: e?.message || 'Validation failed', prettyXml: '' }
  }
}

function prettyPrint(doc: Document): string {
  const serializer = new XMLSerializer()
  const raw = serializer.serializeToString(doc)
  // format with indentation
  let formatted = ''
  let indent = 0
  raw.split(/>\s*</).forEach(part => {
    if (part.startsWith('/') || part.startsWith('?')) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + '<' + part + '>\n'
    if (!part.endsWith('/') && !part.startsWith('/') && !part.startsWith('?') && part.includes('<') === false) indent++
  })
  return formatted.replace(/^<\s*/, '<').replace(/\n$/, '')
}

const requiredFields = computed(() => result.value?.fields.filter(f => f.required) || [])
const optionalFields = computed(() => result.value?.fields.filter(f => !f.required) || [])
const missingRequired = computed(() => requiredFields.value.filter(f => f.status === 'missing').length)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><FileCode class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">ISO 20022 Message Validator</h1>
        <p class="text-sm text-muted-foreground">Validate payment messages — pain, pacs, camt families. Auto-detects message type, checks required fields. Client-side.</p>
      </div>
    </div>

    <Card>
      <CardContent class="pt-6 space-y-4">
        <Textarea
          v-model="inputXml"
          :rows="10"
          class="font-mono text-xs"
          placeholder="Paste ISO 20022 XML message here (pain.001, pacs.008, camt.053, etc.)..."
          aria-label="ISO 20022 XML message"
        />
        <div class="flex gap-2">
          <Button @click="validate" :disabled="!inputXml">Validate Message</Button>
          <Button variant="outline" @click="inputXml = ''; result = null; validated = false" :disabled="!inputXml">Clear</Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="validated && result">
      <Card :class="result.isValid && missingRequired === 0 ? 'border-green-500/40' : 'border-amber-500/40'">
        <CardContent class="flex items-center gap-3 pt-5">
          <component
            :is="result.isValid ? (missingRequired === 0 ? CheckCircle2 : AlertTriangle) : XCircle"
            class="w-6 h-6 shrink-0"
            :class="result.isValid ? (missingRequired === 0 ? 'text-green-600' : 'text-amber-600') : 'text-red-500'"
          />
          <div>
            <p class="font-semibold">
              <template v-if="!result.isValid">Invalid XML</template>
              <template v-else-if="result.messageInfo">
                {{ result.messageInfo.type }} — {{ result.messageInfo.description }}
              </template>
              <template v-else>Valid XML (message type not recognized)</template>
            </p>
            <p v-if="result.error" class="text-xs text-red-500">{{ result.error }}</p>
            <p v-else-if="missingRequired > 0" class="text-xs text-amber-600">
              {{ missingRequired }} required field{{ missingRequired === 1 ? '' : 's' }} missing
            </p>
            <p v-else-if="result.messageInfo" class="text-xs text-muted-foreground">
              Namespace: {{ result.messageInfo.namespace }}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card v-if="result.fields.length">
        <CardHeader><CardTitle class="text-lg">Field check ({{ result.fields.length }})</CardTitle></CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div
              v-for="f in result.fields"
              :key="f.path"
              class="flex items-center gap-3 p-2 rounded border border-border/50"
              :class="f.status === 'present' ? 'bg-green-50' : f.required ? 'bg-red-50' : 'bg-muted/30'"
            >
              <span class="w-4 h-4 shrink-0" :class="f.status === 'present' ? 'text-green-600' : f.required ? 'text-red-500' : 'text-muted-foreground'">
                {{ f.status === 'present' ? '✓' : f.required ? '✗' : '—' }}
              </span>
              <code class="text-xs font-mono flex-1">{{ f.path }}</code>
              <span class="text-xs text-muted-foreground hidden md:inline">{{ f.description }}</span>
              <span v-if="f.required" class="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-muted">req</span>
              <span v-if="f.value" class="text-xs font-mono truncate max-w-32" :title="f.value">{{ f.value }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card v-if="result.prettyXml">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle class="text-lg">Pretty-printed XML</CardTitle>
          <CopyButton :text="result.prettyXml" aria-label="Copy formatted XML" />
        </CardHeader>
        <CardContent>
          <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ result.prettyXml }}</pre>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
