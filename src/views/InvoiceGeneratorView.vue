<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { FileText, Download, Plus, Trash2, RotateCcw } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Invoice Generator — Create & Download PDF Invoices | Formatho',
  description:
    'Create professional invoices in your browser and download them as PDF: line items, tax, discounts, multi-currency, notes. Draft auto-saves locally. 100% client-side — no invoice data ever leaves your machine.',
  keywords: ['invoice generator', 'create invoice online', 'invoice pdf download', 'free invoice maker', 'gst invoice generator', 'invoice template'],
  ogType: 'website'
})

const STORAGE_KEY = 'formatho:invoice-draft'

interface Item { desc: string; qty: number; rate: number }

const CURRENCIES: Record<string, string> = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', AED: 'د.إ', SGD: 'S$', JPY: '¥' }

const defaults = () => ({
  currency: 'INR',
  number: 'INV-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 900) + 100),
  date: new Date().toISOString().slice(0, 10),
  due: new Date(Date.now() + 15 * 864e5).toISOString().slice(0, 10),
  from: 'Your Company\nAddress Line 1\nCity, State, PIN\nGSTIN / Tax ID',
  to: 'Client Name\nCompany\nAddress\nGSTIN / Tax ID',
  taxRate: 18,
  discount: 0,
  notes: 'Payment terms: Net 15. Bank transfer details: …',
  items: [
    { desc: 'Consulting services — October', qty: 10, rate: 2500 },
    { desc: 'Prototype development', qty: 1, rate: 25000 },
  ] as Item[],
})

const inv = ref(defaults())
const savedAt = ref('')

try {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) { inv.value = JSON.parse(raw); savedAt.value = 'restored from your last draft' }
} catch { /* ignore */ }

watch(inv, (v) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); savedAt.value = 'draft saved locally' } catch { /* ignore */ }
}, { deep: true })

function addItem() { inv.value.items.push({ desc: '', qty: 1, rate: 0 }) }
function removeItem(i: number) { inv.value.items.splice(i, 1) }
function reset() { inv.value = defaults() }

const sym = computed(() => CURRENCIES[inv.value.currency] || '')
const fmt = (n: number) => sym.value + (isFinite(n) ? n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00')

const lineTotals = computed(() => inv.value.items.map((it) => (it.qty || 0) * (it.rate || 0)))
const subtotal = computed(() => lineTotals.value.reduce((s, v) => s + v, 0))
const discountAmt = computed(() => (subtotal.value * (inv.value.discount || 0)) / 100)
const taxable = computed(() => subtotal.value - discountAmt.value)
const taxAmt = computed(() => (taxable.value * (inv.value.taxRate || 0)) / 100)
const total = computed(() => taxable.value + taxAmt.value)

async function downloadPdf() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, M = 15
  let y = 20

  doc.setFont('helvetica', 'bold').setFontSize(24)
  doc.text('INVOICE', M, y)
  doc.setFontSize(10).setFont('helvetica', 'normal')
  doc.text(`#${inv.value.number}`, W - M, y, { align: 'right' })
  y += 6
  doc.setFontSize(9).setTextColor(110)
  doc.text(`Date: ${inv.value.date}    Due: ${inv.value.due}`, W - M, y, { align: 'right' })
  y += 10
  doc.setTextColor(0)

  // from / to
  doc.setFont('helvetica', 'bold').setFontSize(9)
  doc.text('FROM', M, y); doc.text('BILL TO', W / 2 + 10, y)
  doc.setFont('helvetica', 'normal')
  const fromLines = inv.value.from.split('\n').filter(Boolean)
  const toLines = inv.value.to.split('\n').filter(Boolean)
  const maxLines = Math.max(fromLines.length, toLines.length)
  for (let i = 0; i < maxLines; i++) {
    if (fromLines[i]) doc.text(String(fromLines[i]).slice(0, 48), M, y + 5 + i * 4.5)
    if (toLines[i]) doc.text(String(toLines[i]).slice(0, 48), W / 2 + 10, y + 5 + i * 4.5)
  }
  y += 8 + maxLines * 4.5 + 6

  // items table
  const cols = [M, M + 82, M + 118, M + 141, W - M]
  doc.setFillColor(243, 244, 246)
  doc.rect(M, y - 4.5, W - 2 * M, 7, 'F')
  doc.setFont('helvetica', 'bold').setFontSize(9)
  doc.text('DESCRIPTION', cols[0] + 1.5, y)
  doc.text('QTY', cols[2] + 1.5, y)
  doc.text('RATE', cols[3] + 1.5, y)
  doc.text('AMOUNT', W - M - 1.5, y, { align: 'right' })
  y += 8
  doc.setFont('helvetica', 'normal')
  inv.value.items.forEach((it, idx) => {
    const h = Math.max(6, Math.ceil(String(it.desc || '').length / 46) * 4.5)
    if (y + h > 250) { doc.addPage(); y = 20 }
    doc.text(String(it.desc || '—'), cols[0] + 1.5, y, { maxWidth: 76 })
    doc.text(String(it.qty || 0), cols[2] + 1.5, y)
    doc.text(fmt(it.rate || 0), cols[3] + 1.5, y)
    doc.text(fmt(lineTotals.value[idx]), W - M - 1.5, y, { align: 'right' })
    y += h + 1
    doc.setDrawColor(229, 231, 235)
    doc.line(M, y - 2, W - M, y - 2)
  })
  y += 6

  // totals
  const rows: [string, string, boolean][] = [
    ['Subtotal', fmt(subtotal.value), false],
    ...(inv.value.discount ? [[`Discount (${inv.value.discount}%)`, '-' + fmt(discountAmt.value), false]] : []),
    ...(inv.value.taxRate ? [[`Tax (${inv.value.taxRate}% GST/VAT)`, fmt(taxAmt.value), false]] : []),
    ['TOTAL DUE', fmt(total.value), true],
  ]
  for (const [label, val, bold] of rows) {
    if (bold) { doc.setFont('helvetica', 'bold').setFontSize(12) } else { doc.setFont('helvetica', 'normal').setFontSize(9.5) }
    doc.text(label, W - M - 55, y)
    doc.text(val, W - M, y, { align: 'right' })
    y += bold ? 8 : 5.5
  }
  doc.setFont('helvetica', 'normal').setFontSize(9)

  // notes
  if (inv.value.notes) {
    y = Math.max(y + 6, 250)
    doc.setFont('helvetica', 'bold').text('NOTES', M, y)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(inv.value.notes, W - 2 * M)
    doc.text(lines, M, y + 5)
  }

  doc.save(`${inv.value.number || 'invoice'}.pdf`)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="text-center space-y-3 mb-8">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <FileText class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">Invoice Generator</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Fill in the invoice, watch the preview update live, download a clean PDF. Your draft auto-saves in this
        browser and nothing is ever uploaded — the PDF is generated entirely on your device.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 items-start">
      <!-- FORM -->
      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3"><CardTitle class="text-base">Invoice details</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-3 gap-3">
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Invoice #</label><Input v-model="inv.number" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Date</label><Input type="date" v-model="inv.date" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Due</label><Input type="date" v-model="inv.due" class="text-sm" /></div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Currency</label>
                <select v-model="inv.currency" class="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                  <option v-for="(s, c) in CURRENCIES" :key="c" :value="c">{{ c }} {{ s }}</option>
                </select>
              </div>
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Tax % (GST/VAT)</label><Input type="number" v-model.number="inv.taxRate" min="0" class="text-sm" /></div>
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Discount %</label><Input type="number" v-model.number="inv.discount" min="0" max="100" class="text-sm" /></div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">From (your business)</label><Textarea v-model="inv.from" rows="4" class="text-sm leading-relaxed" /></div>
              <div><label class="block text-sm font-medium mb-1.5 text-foreground">Bill to</label><Textarea v-model="inv.to" rows="4" class="text-sm leading-relaxed" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-base">Line items</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <div v-for="(it, i) in inv.items" :key="i" class="grid grid-cols-[1fr_64px_110px_96px_32px] gap-2 items-center">
              <Input v-model="it.desc" placeholder="Item description" class="text-sm" />
              <Input v-model.number="it.qty" type="number" min="0" class="text-sm text-right" placeholder="Qty" />
              <Input v-model.number="it.rate" type="number" min="0" class="text-sm text-right" placeholder="Rate" />
              <span class="text-sm font-medium text-right whitespace-nowrap">{{ fmt(lineTotals[i]) }}</span>
              <Button variant="ghost" size="sm" @click="removeItem(i)" aria-label="Remove"><Trash2 class="w-4 h-4 text-muted-foreground" /></Button>
            </div>
            <div class="flex justify-between pt-2">
              <Button variant="outline" size="sm" @click="addItem"><Plus class="w-4 h-4 mr-1" /> Add item</Button>
              <Button variant="ghost" size="sm" @click="reset"><RotateCcw class="w-4 h-4 mr-1" /> Reset</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3"><CardTitle class="text-base">Notes & payment terms</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <Textarea v-model="inv.notes" rows="2" class="text-sm" />
          </CardContent>
        </Card>
      </div>

      <!-- PREVIEW -->
      <div class="lg:sticky lg:top-20 space-y-3">
        <div class="bg-white text-black rounded-lg border shadow-lg p-8 mx-auto max-w-[520px]" style="aspect-ratio: 1/1.414">
          <div class="flex justify-between items-start">
            <div>
              <div class="text-2xl font-bold tracking-tight">INVOICE</div>
              <div class="text-xs text-gray-500 mt-1">#{{ inv.number }}</div>
            </div>
            <div class="text-xs text-gray-600 text-right">
              <div>Date: {{ inv.date }}</div>
              <div>Due: {{ inv.due }}</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-6 text-[11px] leading-snug">
            <div>
              <div class="font-semibold text-gray-500 text-[10px] tracking-wide">FROM</div>
              <div class="whitespace-pre-line mt-1">{{ inv.from }}</div>
            </div>
            <div>
              <div class="font-semibold text-gray-500 text-[10px] tracking-wide">BILL TO</div>
              <div class="whitespace-pre-line mt-1">{{ inv.to }}</div>
            </div>
          </div>
          <table class="w-full mt-6 text-[11px]">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="py-1.5 px-2 font-semibold">Description</th>
                <th class="py-1.5 px-2 font-semibold text-right">Qty</th>
                <th class="py-1.5 px-2 font-semibold text-right">Rate</th>
                <th class="py-1.5 px-2 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(it, i) in inv.items" :key="i" class="border-b border-gray-200 align-top">
                <td class="py-1.5 px-2">{{ it.desc || '—' }}</td>
                <td class="py-1.5 px-2 text-right">{{ it.qty }}</td>
                <td class="py-1.5 px-2 text-right">{{ fmt(it.rate) }}</td>
                <td class="py-1.5 px-2 text-right">{{ fmt(lineTotals[i]) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-4 ml-auto w-48 text-[11px] space-y-1">
            <div class="flex justify-between"><span class="text-gray-600">Subtotal</span><span>{{ fmt(subtotal) }}</span></div>
            <div v-if="inv.discount" class="flex justify-between"><span class="text-gray-600">Discount ({{ inv.discount }}%)</span><span>-{{ fmt(discountAmt) }}</span></div>
            <div v-if="inv.taxRate" class="flex justify-between"><span class="text-gray-600">Tax ({{ inv.taxRate }}%)</span><span>{{ fmt(taxAmt) }}</span></div>
            <div class="flex justify-between text-sm font-bold pt-1 border-t border-gray-300"><span>Total due</span><span>{{ fmt(total) }}</span></div>
          </div>
          <div v-if="inv.notes" class="mt-6 text-[10px] text-gray-600">
            <div class="font-semibold text-gray-500 text-[9px] tracking-wide mb-0.5">NOTES</div>
            <div class="whitespace-pre-line">{{ inv.notes }}</div>
          </div>
        </div>
        <div class="flex items-center justify-between max-w-[520px] mx-auto">
          <span class="text-xs text-muted-foreground">{{ savedAt }}</span>
          <Button size="lg" @click="downloadPdf"><Download class="w-4 h-4 mr-2" /> Download PDF</Button>
        </div>
      </div>
    </div>
  </div>
</template>
