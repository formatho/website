<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/ui/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Zap } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'pain.001 Message Builder - ISO 20022 Credit Transfer | Formatho',
  description:
    'Build ISO 20022 pain.001 Customer Credit Transfer Initiation messages visually. Fill in debtor, creditor, amount, remittance info → get valid XML. Free, client-side, no upload.',
  keywords: ['pain.001 builder', 'iso 20022 message generator', 'pain.001 example xml', 'credit transfer initiation', 'sepa pain.001', 'swift payment message'],
  ogType: 'website'
})

// Group Header
const msgId = ref(`MSG${Date.now().toString(36).toUpperCase()}`)
const creDtTm = ref(new Date().toISOString().slice(0, 19))
const nbOfTxs = ref('1')
const initgPtyName = ref('Formatho Corp')
const initgPtyId = ref('FORMATHOXXX')

// Debtor
const dbtrName = ref('John Doe')
const dbtrIBAN = ref('DE89370400440532013000')
const dbtrBIC = ref('COBADEFFXXX')

// Creditor
const cdtrName = ref('Jane Smith')
const cdtrIBAN = ref('FR1420041010050500013M02606')
const cdtrBIC = ref('BNPAFRPPXXX')

// Transaction
const amount = ref('1500.00')
const currency = ref('EUR')
const remittanceInfo = ref('Invoice INV-2026-001')
const reqdExctnDt = ref(new Date().toISOString().slice(0, 10))
const serviceLevel = ref('SEPA')
const purpose = ref('')

const selectClass = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

const xmlOutput = computed(() => {
  const now = creDtTm.value
  const msgIdSafe = msgId.value || 'MSG001'
  const dbtrNameSafe = escapeXml(dbtrName.value || 'Debtor')
  const cdtrNameSafe = escapeXml(cdtrName.value || 'Creditor')
  const remit = escapeXml(remittanceInfo.value || '')
  const purposeXml = purpose.value ? `\n    <Purp><Cd>${purpose.value}</Cd></Purp>` : ''
  const svcLvlXml = serviceLevel.value ? `\n      <SvcLvl><Cd>${serviceLevel.value}</Cd></SvcLvl>` : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${msgIdSafe}</MsgId>
      <CreDtTm>${now}</CreDtTm>
      <NbOfTxs>${nbOfTxs.value || '1'}</NbOfTxs>
      <CtrlSum>${amount.value || '0.00'}</CtrlSum>
      <InitgPty>
        <Nm>${escapeXml(initgPtyName.value || 'Initiator')}</Nm>
        <Id>
          <OrgId>
            <BICOrBEI>${initgPtyId.value || 'INITIATORXXX'}</BICOrBEI>
          </OrgId>
        </Id>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-${msgIdSafe}-01</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt>${reqdExctnDt.value}</ReqdExctnDt>${svcLvlXml}
      <Dbtr>
        <Nm>${dbtrNameSafe}</Nm>
        <PstlAdr>
          <Ctry>DE</Ctry>
        </PstlAdr>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${dbtrIBAN.value}</IBAN>
        </Id>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          <BICFi>${dbtrBIC.value}</BICFi>
        </FinInstnId>
      </DbtrAgt>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>${msgIdSafe}-E2E-01</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="${currency.value}">${amount.value || '0.00'}</InstdAmt>
        </Amt>${purposeXml}
        <CdtrAgt>
          <FinInstnId>
            <BICFi>${cdtrBIC.value}</BICFi>
          </FinInstnId>
        </CdtrAgt>
        <Cdtr>
          <Nm>${cdtrNameSafe}</Nm>
          <PstlAdr>
            <Ctry>FR</Ctry>
          </PstlAdr>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>${cdtrIBAN.value}</IBAN>
          </Id>
        </CdtrAcct>
        <RmtInf>
          <Ustrd>${remit}</Ustrd>
        </RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`
})

const jsonOutput = computed(() => {
  return JSON.stringify({
    message_type: 'pain.001.001.09',
    group_header: {
      msgId: msgId.value,
      creDtTm: creDtTm.value,
      nbOfTxs: Number(nbOfTxs.value),
      ctrlSum: Number(amount.value),
      initgPty: { nm: initgPtyName.value, id: initgPtyId.value }
    },
    debtor: {
      nm: dbtrName.value,
      iban: dbtrIBAN.value,
      bic: dbtrBIC.value
    },
    creditor: {
      nm: cdtrName.value,
      iban: cdtrIBAN.value,
      bic: cdtrBIC.value
    },
    transaction: {
      amount: Number(amount.value),
      currency: currency.value,
      reqdExctnDt: reqdExctnDt.value,
      serviceLevel: serviceLevel.value,
      remittanceInfo: remittanceInfo.value
    }
  }, null, 2)
})

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function loadSample() {
  msgId.value = `MSG-${Date.now().toString(36).toUpperCase()}`
  creDtTm.value = new Date().toISOString().slice(0, 19)
  dbtrName.value = 'Acme Corporation'
  dbtrIBAN.value = 'DE89370400440532013000'
  dbtrBIC.value = 'COBADEFFXXX'
  cdtrName.value = 'Global Supplier GmbH'
  cdtrIBAN.value = 'FR1420041010050500013M02606'
  cdtrBIC.value = 'BNPAFRPPXXX'
  amount.value = '15750.50'
  currency.value = 'EUR'
  remittanceInfo.value = 'Purchase Order PO-2026-042, Net 30 terms'
  serviceLevel.value = 'SEPA'
  purpose.value = 'GDDS'
}

function clearAll() {
  msgId.value = ''
  dbtrName.value = ''
  dbtrIBAN.value = ''
  dbtrBIC.value = ''
  cdtrName.value = ''
  cdtrIBAN.value = ''
  cdtrBIC.value = ''
  amount.value = ''
  remittanceInfo.value = ''
  purpose.value = ''
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg"><Zap class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">pain.001 Message Builder</h1>
        <p class="text-sm text-muted-foreground">Build ISO 20022 Customer Credit Transfer Initiation XML — fill the form, copy the result</p>
      </div>
    </div>

    <div class="flex gap-2">
      <Button variant="outline" size="sm" @click="loadSample">Load sample</Button>
      <Button variant="outline" size="sm" @click="clearAll">Clear all</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Group Header -->
      <Card>
        <CardHeader><CardTitle class="text-base">Group Header</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid gap-1"><Label class="text-xs">MsgId</Label><Input v-model="msgId" class="font-mono text-xs" aria-label="Message ID" /></div>
          <div class="grid gap-1"><Label class="text-xs">CreDtTm</Label><Input v-model="creDtTm" class="font-mono text-xs" aria-label="Creation datetime" /></div>
          <div class="grid gap-1"><Label class="text-xs">NbOfTxs</Label><Input v-model="nbOfTxs" type="number" min="1" class="font-mono text-xs" aria-label="Number of transactions" /></div>
          <div class="grid gap-1"><Label class="text-xs">Initiating Party</Label><Input v-model="initgPtyName" class="text-xs" aria-label="Initiating party name" /></div>
          <div class="grid gap-1"><Label class="text-xs">Party BIC</Label><Input v-model="initgPtyId" class="font-mono text-xs" aria-label="Initiating party BIC" /></div>
        </CardContent>
      </Card>

      <!-- Debtor & Creditor -->
      <Card>
        <CardHeader><CardTitle class="text-base">Debtor → Creditor</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid gap-1"><Label class="text-xs">Debtor Name</Label><Input v-model="dbtrName" class="text-xs" aria-label="Debtor name" /></div>
          <div class="grid gap-1"><Label class="text-xs">Debtor IBAN</Label><Input v-model="dbtrIBAN" class="font-mono text-xs" aria-label="Debtor IBAN" /></div>
          <div class="grid gap-1"><Label class="text-xs">Debtor BIC</Label><Input v-model="dbtrBIC" class="font-mono text-xs" aria-label="Debtor BIC" /></div>
          <div class="grid gap-1"><Label class="text-xs">Creditor Name</Label><Input v-model="cdtrName" class="text-xs" aria-label="Creditor name" /></div>
          <div class="grid gap-1"><Label class="text-xs">Creditor IBAN</Label><Input v-model="cdtrIBAN" class="font-mono text-xs" aria-label="Creditor IBAN" /></div>
          <div class="grid gap-1"><Label class="text-xs">Creditor BIC</Label><Input v-model="cdtrBIC" class="font-mono text-xs" aria-label="Creditor BIC" /></div>
        </CardContent>
      </Card>

      <!-- Transaction -->
      <Card>
        <CardHeader><CardTitle class="text-base">Transaction</CardTitle></CardHeader>
        <CardContent class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="grid gap-1"><Label class="text-xs">Amount</Label><Input v-model="amount" type="number" step="0.01" class="font-mono text-xs" aria-label="Amount" /></div>
            <div class="grid gap-1">
              <Label class="text-xs">Currency</Label>
              <select v-model="currency" :class="selectClass"><option>EUR</option><option>USD</option><option>GBP</option><option>CHF</option><option>JPY</option></select>
            </div>
          </div>
          <div class="grid gap-1">
            <Label class="text-xs">Service Level</Label>
            <select v-model="serviceLevel" :class="selectClass">
              <option value="">None</option>
              <option>SEPA</option>
              <option>SDVA</option>
              <option>URGP</option>
              <option>NURG</option>
              <option>PRPT</option>
            </select>
          </div>
          <div class="grid gap-1">
            <Label class="text-xs">Purpose Code</Label>
            <select v-model="purpose" :class="selectClass">
              <option value="">None</option>
              <option value="ACCT">ACCT — Account Management</option>
              <option value="CASH">CASH — Cash Management Transfer</option>
              <option value="CHAR">CHAR — Charity Payment</option>
              <option value="COMC">COMC — Commercial Payment</option>
              <option value="CPKC">CPKC — Car Park Charges</option>
              <option value="GDDS">GDDS — Purchase/Sale of Goods</option>
              <option value="SALA">SALA — Salary Payment</option>
              <option value="TREA">TREA — Treasury Payment</option>
            </select>
          </div>
          <div class="grid gap-1"><Label class="text-xs">ReqdExctnDt</Label><Input v-model="reqdExctnDt" type="date" class="font-mono text-xs" aria-label="Requested execution date" /></div>
          <div class="grid gap-1"><Label class="text-xs">Remittance Info</Label><Textarea v-model="remittanceInfo" :rows="2" class="text-xs" aria-label="Remittance information" /></div>
        </CardContent>
      </Card>
    </div>

    <!-- Output -->
    <Card>
      <CardHeader><CardTitle class="text-lg">Generated message</CardTitle></CardHeader>
      <CardContent>
        <Tabs default-value="xml">
          <TabsList>
            <TabsTrigger value="xml">XML (pain.001)</TabsTrigger>
            <TabsTrigger value="json">JSON (summary)</TabsTrigger>
          </TabsList>
          <TabsContent value="xml">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="xmlOutput" variant="ghost" aria-label="Copy XML" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ xmlOutput }}</pre>
            </div>
          </TabsContent>
          <TabsContent value="json">
            <div class="relative">
              <div class="absolute top-2 right-2"><CopyButton :text="jsonOutput" variant="ghost" aria-label="Copy JSON" /></div>
              <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ jsonOutput }}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>
