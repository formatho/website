<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Copy, Check, FileCode2, AlertCircle, ArrowRightLeft } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'SAML Request & Response Decoder to XML | Formatho',
  description:
    'Decode SAML AuthnRequest, LogoutRequest and Response messages. Base64 plus raw-deflate decompression with pretty-printed XML. 100% client-side - no SAML message ever leaves your browser.',
  keywords: [
    'saml decoder',
    'saml request decoder',
    'saml response decoder',
    'decode saml assertion',
    'base64 deflate saml',
    'saml authnrequest',
    'saml tracing',
    'okta saml decoder'
  ],
  ogType: 'website'
})

// Realistic sample payload (Redirect binding: raw-deflate + Base64) so the
// tool demonstrates itself the moment it opens. Swapped, not clobbered:
// user input is only replaced when it is empty or still the other sample.
const SAMPLE_ENCODED = 'fZFbawIxEIX/Ssj73uI9uAuLUhBsKdr2oS9lzI4YyGWbybb23xdXRPtgX2fON3PmzJzAGiHrLh7cBj87pMiO1jiSfaPkXXDSA2mSDiySjEpu68e1FGkugQhD1N7xG6b9n2mDj155w9lqWfIPsZ/BRA2KZLobNskQx5DM9gOVNAWOdhPIp2ooOHvDQNq7kos052xF1OHKUQQXSy5yMU7yaSKKl3wmi5HM83fOlkhRO4g9dYixJZllRD7FI9jWYKq8zU52T0XO6sslC++osxi2GL60wtfN+opD26Z7HyzEg7/yoIhX83OMvbNQ3QPm2R9ZD7XyCSyuls/eaPXDHnr5/QiLtOgruknOkyVa0KZumoBEnNXG+O9FQIhY8hg65Fl1WXv75OoX'
const SAMPLE_XML = '<saml2:AuthnRequest xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="_2f9a7c31-8b4d-4e6a-9f3c-d1e5b7a08c42" Version="2.0" IssueInstant="2026-08-21T09:15:00Z" Destination="https://sso.example.com/saml/sso" AssertionConsumerServiceURL="https://app.formatho.com/saml/acs"><saml2:Issuer>https://app.formatho.com</saml2:Issuer><samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress" AllowCreate="true"/></saml2:AuthnRequest>'

const input = ref(SAMPLE_ENCODED)
const output = ref('')
const error = ref('')
const mode = ref<'decode' | 'encode'>('decode')

watch(mode, (to, from) => {
  const prevSample = from === 'decode' ? SAMPLE_ENCODED : SAMPLE_XML
  const nextSample = to === 'decode' ? SAMPLE_ENCODED : SAMPLE_XML
  if (!input.value.trim() || input.value.trim() === prevSample) {
    input.value = nextSample
  }
})
const copied = ref(false)

// Strip whitespace that often wraps Redirect-binding payloads
const clean = (s: string) => s.replace(/\s+/g, '')

// Indenting formatter for decoded SAML XML
function formatXml(xml: string): string {
  let out = ''
  let depth = 0
  const parts = xml.replace(/>\s*</g, '><').split(/(?=<)/)
  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('</')) {
      depth = Math.max(0, depth - 1)
      out += '  '.repeat(depth) + part + '\n'
    } else if (part.startsWith('<?') || part.startsWith('<!')) {
      out += '  '.repeat(depth) + part + '\n'
    } else {
      out += '  '.repeat(depth) + part + '\n'
      // if it's an opening tag with children coming, bump depth
      const m = part.match(/^<([a-zA-Z:][^>\s]*)[^>]*>(?![\s\S]*<\/\1>)?/)
      if (m && !/\/>$/.test(part) && part.includes('>') && !xml.includes(`</${m[1]}>`)) {
        // self-contained or leaf: no depth change handled above
      }
      if (m && !/\/>$/.test(part)) {
        // check whether closing tag appears later at all
        const closing = `</${m[1]}>`
        const idx = xml.indexOf(closing)
        if (idx !== -1) depth++
      }
    }
  }
  return out.trim()
}

async function run() {
  error.value = ''
  output.value = ''
  copied.value = false
  const raw = clean(input.value)
  if (!raw) return

  try {
    if (mode.value === 'decode') {
      const bytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0))
      let text: string
      // Try raw-deflate (HTTP-Redirect binding) then plain UTF-8 (POST binding)
      try {
        const ds = new DecompressionStream('deflate-raw')
        const stream = new Blob([bytes]).stream().pipeThrough(ds)
        text = await new Response(stream).text()
      } catch {
        text = new TextDecoder().decode(bytes)
      }
      if (!text.startsWith('<')) {
        throw new Error('Decoded content is not XML — check the input payload')
      }
      output.value = formatXml(text)
    } else {
      const encoded = new TextEncoder().encode(input.value)
      const cs = new CompressionStream('deflate-raw')
      const stream = new Blob([encoded]).stream().pipeThrough(cs)
      const buf = new Uint8Array(await new Response(stream).arrayBuffer())
      let bin = ''
      for (const b of buf) bin += String.fromCharCode(b)
      output.value = btoa(bin)
    }
  } catch (e: any) {
    error.value = e?.message || 'Could not process this payload'
  }
}

onMounted(() => {
  // Demonstrate immediately: decode the prefilled sample (client only -
  // DecompressionStream is a browser API)
  if (typeof window !== 'undefined' && 'DecompressionStream' in window) {
    run()
  }
})

async function copyOutput() {
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FileCode2 class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">SAML Request &amp; Response Decoder</h1>
        <p class="text-sm text-muted-foreground">
          Base64 + raw-deflate, pretty-printed XML — all client-side
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <Button
        :variant="mode === 'decode' ? 'default' : 'outline'"
        size="sm"
        @click="mode = 'decode'"
      >
        Decode
      </Button>
      <Button
        :variant="mode === 'encode' ? 'default' : 'outline'"
        size="sm"
        @click="mode = 'encode'"
      >
        Encode
      </Button>
      <ArrowRightLeft class="w-4 h-4 text-muted-foreground ml-1" />
    </div>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">
          {{ mode === 'decode' ? 'Base64 SAML payload (SAMLRequest / SAMLResponse)' : 'SAML XML' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          v-model="input"
          :rows="8"
          class="font-mono text-xs"
          :placeholder="mode === 'decode' ? 'fZLNbsIwEIRfxeQ...' : '<saml2:AuthnRequest ...>'"
          aria-label="SAML input"
        />
        <Button class="mt-3" @click="run">
          {{ mode === 'decode' ? 'Decode SAML message' : 'Encode to Redirect binding' }}
        </Button>
        <p v-if="error" class="text-xs text-red-500 flex items-center gap-1 mt-2">
          <AlertCircle class="w-3 h-3" /> {{ error }}
        </p>
      </CardContent>
    </Card>

    <Card v-if="output">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">{{ mode === 'decode' ? 'Decoded XML' : 'Encoded payload' }}</CardTitle>
        <Button variant="outline" size="sm" @click="copyOutput">
          <Check v-if="copied" class="w-4 h-4 mr-1" />
          <Copy v-else class="w-4 h-4 mr-1" />
          {{ copied ? 'Copied' : 'Copy' }}
        </Button>
      </CardHeader>
      <CardContent>
        <pre class="font-mono text-xs whitespace-pre-wrap break-all max-h-[32rem] overflow-auto p-3 border border-border rounded-lg bg-muted/50">{{ output }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
