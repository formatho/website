<script setup lang="ts">
import { ref, computed } from 'vue'
import { Barcode, CheckCircle2, XCircle, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'GTIN Validator & Check Digit Calculator — Barcode Check | Formatho',
  description: 'Validate GTIN-8/12/13/14 (EAN/UPC) barcodes: check digit verification, GS1 prefix decode to issuing country, and check digit generation. 100% client-side.',
  keywords: ['gtin validator', 'gtin check digit', 'ean 13 validator', 'upc check digit', 'barcode validator', 'gs1 prefix lookup', 'gtin calculator'],
  ogType: 'website'
})

const SAMPLE = '8901234567892'
const input = ref(SAMPLE)
const partial = ref('890123456789')

// GS1 prefix ranges (approximate, major markets)
const PREFIXES: [number, number, string][] = [
  [0, 19, 'USA/Canada (UPC)'],
  [30, 39, 'USA (drugs, NDC)'],
  [40, 49, 'Distribution (internal use)'],
  [50, 59, 'Coupons (USA)'],
  [60, 139, 'USA/Canada'],
  [300, 379, 'France & Monaco'],
  [380, 380, 'Bulgaria'],
  [383, 383, 'Slovenia'],
  [385, 385, 'Croatia'],
  [400, 440, 'Germany'],
  [450, 459, 'Japan'],
  [460, 469, 'Russia'],
  [470, 470, 'Kyrgyzstan'],
  [471, 471, 'Taiwan'],
  [474, 474, 'Estonia'],
  [475, 475, 'Latvia'],
  [477, 477, 'Lithuania'],
  [479, 479, 'Sri Lanka'],
  [480, 480, 'Philippines'],
  [484, 484, 'Moldova'],
  [485, 485, 'Armenia'],
  [489, 489, 'Hong Kong SAR'],
  [490, 499, 'Japan'],
  [500, 509, 'United Kingdom'],
  [520, 521, 'Greece'],
  [528, 528, 'Lebanon'],
  [529, 529, 'Cyprus'],
  [535, 535, 'Malta'],
  [539, 539, 'Ireland'],
  [540, 549, 'Belgium & Luxembourg'],
  [560, 560, 'Portugal'],
  [569, 569, 'Iceland'],
  [570, 579, 'Denmark'],
  [590, 590, 'Poland'],
  [594, 594, 'Romania'],
  [599, 599, 'Hungary'],
  [600, 601, 'South Africa'],
  [603, 603, 'Ghana'],
  [608, 608, 'Bahrain'],
  [609, 609, 'Mauritius'],
  [611, 611, 'Morocco'],
  [613, 613, 'Algeria'],
  [615, 615, 'Nigeria'],
  [616, 616, 'Kenya'],
  [618, 618, 'Ivory Coast'],
  [619, 619, 'Tunisia'],
  [620, 620, 'Tanzania'],
  [621, 621, 'Syria'],
  [622, 622, 'Egypt'],
  [625, 625, 'Jordan'],
  [626, 626, 'Iran'],
  [627, 627, 'Kuwait'],
  [628, 628, 'Saudi Arabia'],
  [629, 629, 'UAE'],
  [640, 649, 'Finland'],
  [690, 699, 'China'],
  [700, 709, 'Norway'],
  [729, 729, 'Israel'],
  [730, 739, 'Sweden'],
  [740, 745, 'Central America'],
  [750, 750, 'Mexico'],
  [754, 755, 'Canada'],
  [759, 759, 'Venezuela'],
  [760, 769, 'Switzerland & Liechtenstein'],
  [770, 771, 'Colombia'],
  [773, 773, 'Uruguay'],
  [775, 775, 'Peru'],
  [777, 777, 'Bolivia'],
  [779, 779, 'Argentina'],
  [780, 780, 'Chile'],
  [784, 784, 'Paraguay'],
  [786, 786, 'Ecuador'],
  [789, 790, 'Brazil'],
  [800, 839, 'Italy'],
  [840, 849, 'Spain'],
  [850, 850, 'Cuba'],
  [858, 858, 'Slovakia'],
  [859, 859, 'Czechia'],
  [860, 860, 'Serbia'],
  [865, 865, 'Mongolia'],
  [867, 867, 'North Korea'],
  [868, 869, 'Türkiye'],
  [870, 879, 'Netherlands'],
  [880, 880, 'South Korea'],
  [883, 883, 'Myanmar'],
  [884, 884, 'Cambodia'],
  [885, 885, 'Thailand'],
  [888, 888, 'Singapore'],
  [890, 890, 'India'],
  [893, 893, 'Vietnam'],
  [896, 896, 'Pakistan'],
  [899, 899, 'Indonesia'],
  [900, 919, 'Austria'],
  [930, 939, 'Australia'],
  [940, 949, 'New Zealand'],
  [950, 950, 'GS1 Global Office'],
  [955, 955, 'Malaysia'],
  [958, 958, 'Macau SAR'],
  [977, 977, 'ISSN (periodicals)'],
  [978, 979, 'ISBN (books)'],
  [980, 980, 'Refund receipts'],
  [981, 984, 'coupons'],
  [990, 999, 'coupons'],
]

function checkDigit(body: string): number {
  const digits = body.split('').map(Number)
  let sum = 0
  // GS1: from the right of the check position, weights 3,1,3,1...
  for (let i = 0; i < digits.length; i++) {
    const weight = (digits.length - i) % 2 === 0 ? 3 : 1
    sum += digits[i] * weight
  }
  return (10 - (sum % 10)) % 10
}

const clean = computed(() => input.value.replace(/[\s-]/g, ''))

const result = computed(() => {
  const v = clean.value
  if (!/^\d+$/.test(v)) return { ok: false, error: 'Digits only (spaces/dashes are fine).', format: '', country: '', expected: '' }
  const validLens = [8, 12, 13, 14]
  if (!validLens.includes(v.length)) {
    return { ok: false, error: `Length ${v.length} is not a valid GTIN length (8, 12, 13 or 14).`, format: '', country: '', expected: '' }
  }
  const body = v.slice(0, -1)
  const given = Number(v.slice(-1))
  const expected = checkDigit(body)
  // country from first 3 digits (pad)
  const p = Number(v.slice(0, 3).padStart(3, '0'))
  const hit = PREFIXES.find(([a, b]) => p >= a && p <= b)
  const format = v.length === 8 ? 'GTIN-8 (EAN-8)' : v.length === 12 ? 'GTIN-12 (UPC-A)' : v.length === 13 ? 'GTIN-13 (EAN-13)' : 'GTIN-14 (ITF-14, cases/cartons)'
  return {
    ok: given === expected,
    error: given === expected ? '' : `Check digit mismatch: last digit should be ${expected}, got ${given}.`,
    format,
    country: hit ? hit[2] : 'Unknown / reserved range',
    expected: String(expected),
  }
})

const generated = computed(() => {
  const v = partial.value.replace(/[\s-]/g, '')
  if (!/^\d{6,13}$/.test(v)) return ''
  return v + checkDigit(v)
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <Barcode class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">GTIN Validator & Check Digit Calculator</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Paste any GTIN, EAN or UPC barcode number to verify its check digit, identify the format and see which
        country's GS1 organization issued it. Or generate a valid check digit for your company prefix + item reference.
        100% client-side.
      </p>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Validate a barcode</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-2">
          <Input v-model="input" placeholder="e.g. 8901234567892" class="flex-1 font-mono" />
          <Button variant="outline" @click="input = SAMPLE">Sample</Button>
        </div>
        <div v-if="clean" class="space-y-2 text-sm">
          <div class="flex items-center gap-2 font-medium" :class="result.ok ? 'text-green-700' : 'text-red-700'">
            <component :is="result.ok ? CheckCircle2 : XCircle" class="w-5 h-5" />
            {{ result.ok ? 'Valid GTIN' : 'Invalid GTIN' }}
          </div>
          <p v-if="result.error" class="text-red-700">{{ result.error }}</p>
          <div v-if="result.format" class="rounded-lg border p-3 space-y-1 bg-muted/30">
            <div><span class="text-muted-foreground">Format:</span> <span class="font-medium">{{ result.format }}</span></div>
            <div><span class="text-muted-foreground">GS1 prefix origin:</span> <span class="font-medium">{{ result.country }}</span></div>
            <div class="font-mono text-muted-foreground">{{ clean.slice(0, -1) }}<span class="text-primary font-bold">{{ clean.slice(-1) }}</span></div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-lg">Generate a check digit</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <p class="text-sm text-muted-foreground">Enter your GS1 company prefix + item reference (without the final digit):</p>
        <Input v-model="partial" placeholder="e.g. 890123456789" class="font-mono" />
        <div v-if="generated" class="rounded-lg border p-3 bg-muted/30 text-lg font-mono">
          {{ generated.slice(0, -1) }}<span class="text-primary font-bold">{{ generated.slice(-1) }}</span>
          <span class="block text-xs text-muted-foreground font-sans mt-1">Full GTIN: {{ generated }}</span>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-lg">How the check digit works</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p class="flex items-start gap-2"><Info class="w-4 h-4 mt-0.5 shrink-0" /> Starting from the rightmost data digit, multiply alternately by 1 and 3, sum everything, and the check digit is what rounds the total up to the next multiple of 10.</p>
        <p>GTINs are the product identifiers required by Amazon, Flipkart, Walmart and every major retailer, and they anchor the EU Digital Product Passport. If you export to the EU, your GTIN will be the key the DPP data carrier resolves against.</p>
      </CardContent>
    </Card>
  </div>
</template>
