<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Copy, Check, FileKey2, AlertCircle, Download } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'SAML Metadata Generator - SP & IdP XML Online | Formatho',
  description:
    'Generate SAML 2.0 SP and IdP metadata XML: entityID, ACS/SLO endpoints, NameID format, signing certificates. Runs entirely in your browser — your URLs and certificates are never uploaded.',
  keywords: [
    'saml metadata generator',
    'sp metadata generator',
    'idp metadata generator',
    'saml 2.0 metadata xml',
    'assertion consumer service url',
    'generate saml metadata online'
  ],
  ogType: 'website'
})

type Side = 'sp' | 'idp'
const side = ref<Side>('sp')

const entityID = ref('https://sp.example.com/saml/metadata')
const acsUrl = ref('https://sp.example.com/saml/acs')
const sloUrl = ref('https://sp.example.com/saml/sls')
const ssoUrl = ref('https://idp.example.com/saml/sso')
const nameIdFormat = ref('urn:oasis:names:tc:SAML:2.0:nameid-format:persistent')
const certPem = ref('')
const wantAssertionsSigned = ref(true)
const authnRequestsSigned = ref(false)
const validDays = ref(0)

const copied = ref(false)

const NAME_ID_FORMATS = [
  'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
  'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
  'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
]

function certBase64(): string {
  const match = certPem.value.replace(/\r/g, '').match(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/)
  if (!match) return ''
  return match[1].replace(/\s/g, '')
}

const certError = computed(() => {
  if (!certPem.value.trim()) return ''
  return certBase64() ? '' : 'No -----BEGIN CERTIFICATE----- PEM block found.'
})

const entityError = computed(() => {
  return entityID.value.trim() ? '' : 'entityID is required.'
})

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const metadata = computed(() => {
  if (!entityID.value.trim() || certError.value) return ''
  const b64 = certBase64()
  const keyDescriptor = b64
    ? `  <KeyDescriptor use="signing">\n    <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n      <ds:X509Data><ds:X509Certificate>${b64}</ds:X509Certificate></ds:X509Data>\n    </ds:KeyInfo>\n  </KeyDescriptor>\n`
    : ''
  const slo = sloUrl.value.trim()
    ? `  <SingleLogoutService\n    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n    Location="${esc(sloUrl.value.trim())}"/>\n`
    : ''
  const nid = `  <NameIDFormat>${esc(nameIdFormat.value)}</NameIDFormat>\n`
  const validUntilAttr = validDays.value > 0 ? ` validUntil="${new Date(Date.now() + validDays.value * 86400000).toISOString()}" cacheDuration="P${validDays.value}D"` : ''

  let body: string
  if (side.value === 'sp') {
    const acs = acsUrl.value.trim()
      ? `  <AssertionConsumerService\n    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n    Location="${esc(acsUrl.value.trim())}"\n    index="0" isDefault="true"/>\n`
      : ''
    body = `<SPSSODescriptor${validUntilAttr} AuthnRequestsSigned="${authnRequestsSigned.value}" WantAssertionsSigned="${wantAssertionsSigned.value}" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n${keyDescriptor}${slo}${nid}${acs}  </SPSSODescriptor>`
  } else {
    const sso = `  <SingleSignOnService\n    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n    Location="${esc(ssoUrl.value.trim())}"/>\n`
    body = `<IDPSSODescriptor${validUntilAttr} WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n${keyDescriptor}${slo}${nid}  </IDPSSODescriptor>`
  }
  return `<?xml version="1.0"?>\n<EntityDescriptor\n  xmlns="urn:oasis:names:tc:SAML:2.0:metadata"\n  entityID="${esc(entityID.value.trim())}">\n${body}\n</EntityDescriptor>\n`
})

const outputError = computed(() => {
  if (!metadata.value) {
    if (entityError.value) return entityError.value
    if (certError.value) return certError.value
  }
  return ''
})

async function copy() {
  try {
    await navigator.clipboard.writeText(metadata.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

function download() {
  const blob = new Blob([metadata.value], { type: 'application/xml' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${side.value}-metadata.xml`
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-lg">
        <FileKey2 class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">SAML Metadata Generator</h1>
        <p class="text-sm text-muted-foreground">Generate SP or IdP SAML 2.0 metadata XML — client-side, nothing uploaded</p>
      </div>
    </div>

    <div class="flex gap-2" role="tablist" aria-label="Metadata type">
      <button
        v-for="s in (['sp', 'idp'] as Side[])"
        :key="s"
        role="tab"
        :aria-selected="side === s"
        class="px-4 py-2 rounded-lg text-sm font-semibold border transition-colors uppercase"
        :class="side === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'"
        @click="side = s"
      >
        {{ s === 'sp' ? 'Service Provider (SP)' : 'Identity Provider (IdP)' }}
      </button>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">{{ side === 'sp' ? 'SP' : 'IdP' }} details</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label for="entity">entityID (usually your metadata URL)</Label>
          <Input id="entity" v-model="entityID" class="font-mono text-xs" aria-label="Entity ID" />
        </div>
        <div v-if="side === 'sp'" class="grid gap-2">
          <Label for="acs">Assertion Consumer Service (ACS) URL</Label>
          <Input id="acs" v-model="acsUrl" class="font-mono text-xs" aria-label="ACS URL" />
        </div>
        <div v-else class="grid gap-2">
          <Label for="sso">Single Sign-On (SSO) redirect URL</Label>
          <Input id="sso" v-model="ssoUrl" class="font-mono text-xs" aria-label="SSO URL" />
        </div>
        <div class="grid gap-2">
          <Label for="slo">Single Logout (SLO) URL (optional)</Label>
          <Input id="slo" v-model="sloUrl" class="font-mono text-xs" aria-label="SLO URL" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="nid">NameID format</Label>
            <select id="nid" v-model="nameIdFormat" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono">
              <option v-for="f in NAME_ID_FORMATS" :key="f" :value="f">{{ f.split('nameid-format:')[1] }}</option>
            </select>
          </div>
          <div class="grid gap-2">
            <Label for="valid">validUntil (days, 0 = omit)</Label>
            <Input id="valid" v-model.number="validDays" type="number" min="0" max="3650" aria-label="Valid for days" />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="cert">Signing certificate (PEM, optional)</Label>
          <Textarea id="cert" v-model="certPem" :rows="5" class="font-mono text-xs" placeholder="-----BEGIN CERTIFICATE-----" aria-label="Signing certificate PEM" />
          <p v-if="certError" class="text-xs text-red-500 flex items-center gap-1"><AlertCircle class="w-3 h-3" />{{ certError }}</p>
        </div>
        <div v-if="side === 'sp'" class="flex gap-6">
          <label class="flex items-center gap-2 text-sm"><input v-model="authnRequestsSigned" type="checkbox" /> AuthnRequestsSigned</label>
          <label class="flex items-center gap-2 text-sm"><input v-model="wantAssertionsSigned" type="checkbox" /> WantAssertionsSigned</label>
        </div>
      </CardContent>
    </Card>

    <Card v-if="metadata">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Metadata XML</CardTitle>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="download"><Download class="w-4 h-4 mr-1" /> XML</Button>
          <Button variant="outline" size="sm" aria-label="Copy metadata" @click="copy">
            <Check v-if="copied" class="w-4 h-4" /><Copy v-else class="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre class="font-mono text-xs whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/40 max-h-96 overflow-auto">{{ metadata }}</pre>
      </CardContent>
    </Card>
    <p v-else-if="outputError" class="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle class="w-4 h-4 shrink-0" /> {{ outputError }}
    </p>
  </div>
</template>
