<script setup lang="ts">
import { ref, computed } from 'vue'
import { FileCheck2, Copy, Check, Download, Plus, Trash2, AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'PINT AE Invoice Builder & Validator — UAE E-Invoicing | Formatho',
  description:
    'Build PINT AE XML invoices for the UAE e-invoicing mandate (Peppol), or paste existing XML to validate: TRN format, VAT categories, required fields and totals math. 100% client-side.',
  keywords: ['pint ae', 'uae e-invoicing', 'peppol invoice uae', 'pint ae validator', 'uae invoice xml', 'ubl invoice uae', 'fta e-invoice format'],
  ogType: 'website'
})

type Mode = 'build' | 'validate'
const mode = ref<Mode>('build')

// ---------- Builder ----------
interface Line { name: string; qty: number; price: number; vat: number }
const inv = ref({
  supplierName: 'Your Company LLC',
  supplierTrn: '100123456700003',
  buyerName: 'Client Company LLC',
  buyerTrn: '',
  number: 'INV-2026-001',
  issue: new Date().toISOString().slice(0, 10),
  due: new Date(Date.now() + 15 * 864e5).toISOString().slice(0, 10),
  currency: 'AED',
  lines: [
    { name: 'Consulting services', qty: 1, price: 10000, vat: 5 },
  ] as Line[],
})

const lineAmt = (l: Line) => (l.qty || 0) * (l.price || 0)
const netTotal = computed(() => inv.value.lines.reduce((s, l) => s + lineAmt(l), 0))
const vatTotal = computed(() => inv.value.lines.reduce((s, l) => s + lineAmt(l) * ((l.vat || 0) / 100), 0))
const grand = computed(() => netTotal.value + vatTotal.value)
const n2 = (x: number) => x.toFixed(2)

const xml = computed(() => {
  const v = inv.value
  const lines = v.lines.map((l, i) => `    <cac:InvoiceLine>
      <cbc:ID>${i + 1}</cbc:ID>
      <cbc:InvoicedQuantity unitCode="C62">${l.qty}</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="${v.currency}">${n2(lineAmt(l))}</cbc:LineExtensionAmount>
      <cac:Item><cbc:Name>${esc(l.name)}</cbc:Name>
        <cac:ClassifiedTaxCategory><cbc:ID>${l.vat ? 'S' : 'Z'}</cbc:ID><cbc:Percent>${l.vat}</cbc:Percent></cac:ClassifiedTaxCategory>
      </cac:Item>
      <cac:Price><cbc:PriceAmount currencyID="${v.currency}">${n2(l.price)}</cbc:PriceAmount></cac:Price>
    </cac:InvoiceLine>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- PINT AE draft — UAE e-invoicing (Peppol PINT, UAE localization). Validate with your Access Point before production use. -->
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:peppol:pint:ae-1</cbc:CustomizationID>
  <cbc:ProfileID>urn:peppol:bis:5.0</cbc:ProfileID>
  <cbc:ID>${esc(v.number)}</cbc:ID>
  <cbc:IssueDate>${v.issue}</cbc:IssueDate>
  <cbc:DueDate>${v.due}</cbc:DueDate>
  <cbc:DocumentCurrencyCode>${v.currency}</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:IndustryIdentifierCode schemeID="AE:TRN">${esc(v.supplierTrn)}</cbc:IndustryIdentifierCode>
      <cac:PartyName><cbc:Name>${esc(v.supplierName)}</cbc:Name></cac:PartyName>
      <cac:PostalAddress><cbc:CountrySubentityCode>AE</cbc:CountrySubentityCode>
        <cac:Country><cbc:IdentificationCode>AE</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme><cbc:CompanyID>${esc(v.supplierTrn)}</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyName><cbc:Name>${esc(v.buyerName)}</cbc:Name></cac:PartyName>
      ${v.buyerTrn ? `<cac:PartyTaxScheme><cbc:CompanyID>${esc(v.buyerTrn)}</cbc:CompanyID><cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme></cac:PartyTaxScheme>` : ''}
      <cac:PostalAddress><cac:Country><cbc:IdentificationCode>AE</cbc:IdentificationCode></cac:Country></cac:PostalAddress>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="${v.currency}">${n2(vatTotal.value)}</cbc:TaxAmount>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="${v.currency}">${n2(netTotal.value)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="${v.currency}">${n2(netTotal.value)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="${v.currency}">${n2(grand.value)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="${v.currency}">${n2(grand.value)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
${lines}
</Invoice>`
})

function esc(s: string) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c) }
const copied = ref(false)
function copyXml() { navigator.clipboard.writeText(xml.value); copied.value = true; setTimeout(() => (copied.value = false), 1500) }
function downloadXml() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([xml.value], { type: 'application/xml' }))
  a.download = `${inv.value.number || 'invoice'}-pint-ae.xml`
  a.click(); URL.revokeObjectURL(a.href)
}

// ---------- Validator ----------
const pasted = ref('')
interface Finding { level: 'error' | 'warning' | 'info' | 'ok'; text: string }

const findings = computed<Finding[] | null>(() => {
  const raw = pasted.value.trim()
  if (!raw) return null
  const out: Finding[] = []
  const doc = new DOMParser().parseFromString(raw, 'application/xml')
  if (doc.querySelector('parsererror')) {
    return [{ level: 'error', text: 'Not well-formed XML: ' + (doc.querySelector('parsererror')?.textContent || '').slice(0, 120) }]
  }
  const root = doc.documentElement
  if (root.nodeName !== 'Invoice') out.push({ level: 'error', text: `Root element is <${root.nodeName}> — PINT AE requires <Invoice> (credit notes use <CreditNote>).` })
  const t = (tag: string) => root.getElementsByTagNameNS('*', tag)[0]?.textContent?.trim() || ''

  const cust = t('CustomizationID')
  if (!cust) out.push({ level: 'error', text: 'Missing cbc:CustomizationID — PINT AE invoices must declare the UAE customization identifier.' })
  else if (!/pint/i.test(cust)) out.push({ level: 'warning', text: `CustomizationID "${cust}" does not reference PINT — verify this is the UAE PINT AE profile.` })
  else if (!/\bae\b/i.test(cust)) out.push({ level: 'warning', text: `CustomizationID "${cust}" is PINT but not the AE (UAE) localization.` })

  if (!t('ID')) out.push({ level: 'error', text: 'Missing invoice number (cbc:ID).' })
  if (!t('IssueDate')) out.push({ level: 'error', text: 'Missing cbc:IssueDate.' })
  const cur = t('DocumentCurrencyCode')
  if (!cur) out.push({ level: 'error', text: 'Missing cbc:DocumentCurrencyCode.' })
  else if (cur !== 'AED') out.push({ level: 'info', text: `Currency is ${cur} — UAE VAT invoices are typically AED.` })

  const parties = ['AccountingSupplierParty', 'AccountingCustomerParty']
  for (const p of parties) {
    const el = root.getElementsByTagNameNS('*', p)[0]
    if (!el) { out.push({ level: 'error', text: `Missing ${p}.` }); continue }
    const name = el.getElementsByTagNameNS('*', 'Name')[0]?.textContent?.trim()
    if (!name) out.push({ level: 'error', text: `${p}: missing party name.` })
    const trn = el.getElementsByTagNameNS('*', 'CompanyID')[0]?.textContent?.trim() || ''
    if (!trn) out.push({ level: p.includes('Supplier') ? 'error' : 'warning', text: `${p}: no TRN (CompanyID) — ${p.includes('Supplier') ? 'mandatory for UAE suppliers' : 'required for B2B UAE buyers'} (15 digits).` })
    else if (!/^\d{15}$/.test(trn)) out.push({ level: 'warning', text: `${p}: TRN "${trn}" is not 15 digits — UAE TRNs are 15 characters.` })
  }

  const lineEls = [...root.getElementsByTagNameNS('*', 'InvoiceLine')]
  if (!lineEls.length) out.push({ level: 'error', text: 'No invoice lines (cac:InvoiceLine) found.' })
  const VAT_CATS = ['S', 'Z', 'E', 'O', 'K', 'G', 'AE', 'L', 'M']
  lineEls.forEach((le, i) => {
    const cat = le.getElementsByTagNameNS('*', 'ClassifiedTaxCategory')[0]?.getElementsByTagNameNS('*', 'ID')[0]?.textContent?.trim() || ''
    if (cat && !VAT_CATS.includes(cat)) out.push({ level: 'error', text: `Line ${i + 1}: VAT category "${cat}" is not a valid code (S, Z, E, O, K, G…).` })
    if (cat === 'S') {
      const pct = Number(le.getElementsByTagNameNS('*', 'Percent')[0]?.textContent)
      if (pct !== 5) out.push({ level: 'warning', text: `Line ${i + 1}: standard rate is ${pct}% — UAE VAT standard rate is 5%.` })
    }
  })

  const num = (tag: string) => Number(t(tag))
  const lineSum = lineEls.reduce((s, le) => s + Number(le.getElementsByTagNameNS('*', 'LineExtensionAmount')[0]?.textContent || 0), 0)
  const ext = num('LineExtensionAmount')
  if (!ext) out.push({ level: 'error', text: 'Missing totals (cbc:LineExtensionAmount in LegalMonetaryTotal).' })
  else if (Math.abs(ext - lineSum) > 0.01) out.push({ level: 'error', text: `Totals mismatch: line amounts sum to ${n2(lineSum)} but LineExtensionAmount is ${n2(ext)}.` })
  else out.push({ level: 'ok', text: 'Line amounts reconcile with the stated total.' })

  const tax = num('TaxAmount')
  const excl = num('TaxExclusiveAmount')
  const incl = num('TaxInclusiveAmount')
  const payable = num('PayableAmount')
  if (excl && incl && Math.abs(excl + tax - incl) > 0.01) out.push({ level: 'error', text: `Tax math mismatch: ${n2(excl)} + ${n2(tax)} ≠ ${n2(incl)} (TaxInclusiveAmount).` })
  else if (incl) out.push({ level: 'ok', text: 'Tax arithmetic checks out.' })
  if (payable && incl && Math.abs(payable - incl) > 0.01) out.push({ level: 'error', text: 'PayableAmount does not match TaxInclusiveAmount.' })

  if (!out.some((f) => f.level === 'error' || f.level === 'warning')) out.push({ level: 'ok', text: 'All structural checks passed. Note: full PINT AE validation (Schematron rules) happens at your Peppol Access Point — this is a pre-flight check, not a substitute.' })
  return out
})
const errorCount = computed(() => findings.value?.filter((f) => f.level === 'error').length ?? 0)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="text-center space-y-3 mb-8">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <FileCheck2 class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">PINT AE Invoice Builder & Validator</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        The UAE's 2026 e-invoicing mandate requires structured Peppol PINT AE XML — PDFs won't count. Build a draft
        invoice in that format, or paste existing XML for a pre-flight check (TRN, VAT categories, totals math).
        Everything runs in your browser.
      </p>
    </div>

    <div class="flex justify-center gap-2 mb-6">
      <button class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" :class="mode === 'build' ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'" @click="mode = 'build'">Builder</button>
      <button class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" :class="mode === 'validate' ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'" @click="mode = 'validate'">Validator</button>
    </div>

    <template v-if="mode === 'build'">
      <div class="grid lg:grid-cols-2 gap-6 items-start">
        <div class="space-y-4">
          <Card>
            <CardHeader class="pb-3"><CardTitle class="text-base">Parties</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <div><label class="block text-sm font-medium mb-1.5">Supplier name</label><Input v-model="inv.supplierName" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5">Supplier TRN (15 digits)</label><Input v-model="inv.supplierTrn" class="text-sm font-mono" /></div>
              <div><label class="block text-sm font-medium mb-1.5">Buyer name</label><Input v-model="inv.buyerName" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5">Buyer TRN (B2B)</label><Input v-model="inv.buyerTrn" class="text-sm font-mono" /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-3"><CardTitle class="text-base">Invoice</CardTitle></CardHeader>
            <CardContent class="grid grid-cols-2 gap-3">
              <div><label class="block text-sm font-medium mb-1.5">Number</label><Input v-model="inv.number" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5">Currency</label>
                <select v-model="inv.currency" class="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                  <option>AED</option><option>USD</option><option>EUR</option><option>SAR</option><option>INR</option><option>GBP</option>
                </select>
              </div>
              <div><label class="block text-sm font-medium mb-1.5">Issue date</label><Input type="date" v-model="inv.issue" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5">Due date</label><Input type="date" v-model="inv.due" class="text-sm" /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-3"><CardTitle class="text-base">Lines</CardTitle></CardHeader>
            <CardContent class="space-y-2">
              <div v-for="(l, i) in inv.lines" :key="i" class="grid grid-cols-[1fr_64px_110px_70px_32px] gap-2 items-center">
                <Input v-model="l.name" placeholder="Item or service" class="text-sm" />
                <Input v-model.number="l.qty" type="number" min="0" class="text-sm text-right" />
                <Input v-model.number="l.price" type="number" min="0" class="text-sm text-right" />
                <Input v-model.number="l.vat" type="number" min="0" max="100" class="text-sm text-right" />
                <Button variant="ghost" size="sm" @click="inv.lines.splice(i, 1)"><Trash2 class="w-4 h-4 text-muted-foreground" /></Button>
              </div>
              <Button variant="outline" size="sm" @click="inv.lines.push({ name: '', qty: 1, price: 0, vat: 5 })"><Plus class="w-4 h-4 mr-1" /> Add line</Button>
            </CardContent>
          </Card>
        </div>
        <div class="lg:sticky lg:top-20 space-y-3">
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-base">PINT AE XML</CardTitle></CardHeader>
            <CardContent class="space-y-3">
              <pre class="text-[11px] leading-relaxed bg-muted/50 rounded-lg p-3 overflow-auto max-h-[420px] font-mono whitespace-pre">{{ xml }}</pre>
              <div class="text-sm space-y-1">
                <div class="flex justify-between"><span class="text-muted-foreground">Net</span><span class="font-mono">{{ inv.currency }} {{ n2(netTotal) }}</span></div>
                <div class="flex justify-between"><span class="text-muted-foreground">VAT</span><span class="font-mono">{{ inv.currency }} {{ n2(vatTotal) }}</span></div>
                <div class="flex justify-between font-semibold"><span>Total</span><span class="font-mono">{{ inv.currency }} {{ n2(grand) }}</span></div>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" @click="copyXml"><component :is="copied ? Check : Copy" class="w-4 h-4 mr-1" /> {{ copied ? 'Copied' : 'Copy' }}</Button>
                <Button size="sm" @click="downloadXml"><Download class="w-4 h-4 mr-1" /> Download XML</Button>
                <Button variant="outline" size="sm" @click="pasted = xml.value; mode = 'validate'">Validate it</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>

    <template v-else>
      <Card>
        <CardHeader class="pb-3"><CardTitle class="text-base">Paste PINT AE / UBL invoice XML</CardTitle></CardHeader>
        <CardContent class="space-y-4">
          <Textarea v-model="pasted" rows="10" class="font-mono text-xs" placeholder='<?xml version="1.0"?><Invoice …>' />
          <template v-if="findings">
            <div v-if="errorCount" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {{ errorCount }} blocking issue{{ errorCount > 1 ? 's' : '' }} — fix before sending to your Access Point.
            </div>
            <div class="space-y-1.5">
              <div v-for="(f, i) in findings" :key="i" class="flex items-start gap-2 text-sm">
                <component
                  :is="f.level === 'error' ? AlertCircle : f.level === 'warning' ? AlertTriangle : f.level === 'ok' ? CheckCircle2 : Info"
                  class="w-4 h-4 mt-0.5 shrink-0"
                  :class="f.level === 'error' ? 'text-red-600' : f.level === 'warning' ? 'text-amber-600' : f.level === 'ok' ? 'text-green-600' : 'text-blue-600'"
                />
                <span :class="f.level === 'error' ? 'font-medium text-red-700' : f.level === 'ok' ? 'text-green-700' : ''">{{ f.text }}</span>
              </div>
            </div>
          </template>
          <p v-else class="text-xs text-muted-foreground">Checks: XML well-formedness, PINT AE customization ID, required UBL elements, UAE TRN format (15 digits), VAT category codes and 5% standard rate, line-total and tax arithmetic.</p>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
