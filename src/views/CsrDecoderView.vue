<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><FileKey class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">CSR Decoder (PKCS#10)</h1>
        <p class="text-sm text-muted-foreground">Decode a Certificate Signing Request: subject, SANs, public key, extensions, signature. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Paste CSR (PEM)</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="pem" rows="8" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="-----BEGIN CERTIFICATE REQUEST-----"></textarea>
        <div class="flex gap-2">
          <Button @click="decode">Decode CSR</Button>
          <Button variant="outline" @click="pem = sample; decode()">Load Sample</Button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
    </Card>

    <div v-if="result" class="space-y-4">
      <Card :class="result.verified === true ? 'border-green-500/40' : result.verified === false ? 'border-red-500/40' : ''">
        <CardHeader><CardTitle>Signature</CardTitle></CardHeader>
        <CardContent class="text-sm">
          <p v-if="result.verified === true" class="text-green-600 font-medium">Valid - self-signature matches the embedded public key</p>
          <p v-else-if="result.verified === false" class="text-red-600 font-medium">Invalid - signature does not match (CSR was modified?)</p>
          <p v-else class="text-muted-foreground">Not verified ({{ result.verifyNote }})</p>
          <p class="text-muted-foreground mt-1">Algorithm: {{ result.sigAlg }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Subject</CardTitle></CardHeader>
        <CardContent>
          <table class="w-full text-sm">
            <tr v-for="(v, k) in result.subject" :key="k"><td class="pr-4 text-muted-foreground align-top">{{ k }}</td><td class="font-mono break-all">{{ v }}</td></tr>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Public Key</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Algorithm:</span> {{ result.keyAlg }}</p>
          <p v-if="result.keyBits"><span class="text-muted-foreground">Size:</span> {{ result.keyBits }} bits</p>
        </CardContent>
      </Card>

      <Card v-if="result.sans.length">
        <CardHeader><CardTitle>Subject Alternative Names ({{ result.sans.length }})</CardTitle></CardHeader>
        <CardContent><ul class="text-sm font-mono space-y-1"><li v-for="s in result.sans" :key="s">{{ s }}</li></ul></CardContent>
      </Card>

      <Card v-if="result.extensions.length">
        <CardHeader><CardTitle>Extensions (extensionRequest)</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <div v-for="e in result.extensions" :key="e.name">
            <span class="font-medium">{{ e.name }}</span>
            <span v-if="e.critical" class="ml-2 text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">critical</span>
            <p class="text-muted-foreground font-mono text-xs whitespace-pre-wrap">{{ e.value }}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Version:</span> {{ result.version }}</p>
          <p v-if="result.challenge"><span class="text-muted-foreground">Challenge password:</span> {{ result.challenge }}</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>A Certificate Signing Request (CSR, PKCS#10) is what you send a Certificate Authority to get an SSL/TLS certificate. This decoder parses it entirely in your browser - nothing is uploaded.</p>
        <p>Check exactly what a CSR contains before submitting it: subject fields, SANs (which domains it covers), key strength and requested extensions.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileKey } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'CSR Decoder - Check PKCS#10 Certificate Signing Requests | Formatho',
  description: 'Decode a Certificate Signing Request (PKCS#10) in your browser: subject, SANs, public key, extensions and signature verification. Nothing uploaded.',
  keywords: ['csr decoder', 'decode csr', 'check csr', 'pkcs#10', 'certificate signing request decoder', 'csr checker', 'openssl req text', 'csr san decoder']
})

const sample = `-----BEGIN CERTIFICATE REQUEST-----
MIIDRzCCAi8CAQAwgZUxCzAJBgNVBAYTAkRFMQ8wDQYDVQQIDAZCZXJsaW4xDzAN
BgNVBAcMBkJlcmxpbjEVMBMGA1UECgwMRXhhbXBsZSBHbWJIMREwDwYDVQQLDAhQ
bGF0Zm9ybTEYMBYGA1UEAwwPYXBpLmV4YW1wbGUuY29tMSAwHgYJKoZIhvcNAQkB
FhFhZG1pbkBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAKf1OxJqHwTKLmu/PWIDBMOAoxjHKrT/b+TfN3fQCbDXt1wv2gu0+ZRBtPgJ
phtJPdsPxA9EzWTxuFdULEunHJj4M7sLNEG1huhAAJ7dA7CtscdavIfKxLhLI35f
aBL1Z2479b3EVLa0SOyph0CZqrLDY7kcM8bd8CZjIYdJCawcdH7qFLI7FTY7/hFm
z08rWCg4qdkfDgxR4CsgFLmbGh0wkMwKNyAFDN+dFt9VHIo/2CDvcR2J2xUIZgwz
v6nvxcqzDR80IHZoWJHh6+T2I/q9s0B60tsyahZfH4kyGgb3O82LAHRIaXcfsp+1
bnrUNdc522dhStodf4LEhqYGqRcCAwEAAaBsMGoGCSqGSIb3DQEJDjFdMFswLQYD
VR0RBCYwJIIPYXBpLmV4YW1wbGUuY29tggtleGFtcGxlLmNvbYcEwKgBCjALBgNV
HQ8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMA0GCSqGSIb3
DQEBCwUAA4IBAQAa4gKQldQuq3cg9hIAoJOgjlj1iM+++coyDT/AAyizzyPdVuUL
14pf2AGAgzTrMmStuTI2XC/9M4j4wWm5yKn07T4yM7cRpJwOek7L/AU7DMIkUp2U
Hw8SQvjM2Z8wvAY/a4vrCVdbmFJyB/M2r8XwaPvjMaKIsQTVe/EX/Rh/N4IhiDY1
8VUzTy8cTbQNyZo+i1uo8KBmp7amT04BS/irJm1HQYUF1ASYUol4Pv/k8vNtdjNC
cmKJEhx9l+6brIwTlZ+jK0lBz6hiwXGG6CoYdE9cp704xqok9DPOtoHGZkAQHNvK
96LZ6ai/iq0xyv/g9adYve0ARz8n7yk/LFkI
-----END CERTIFICATE REQUEST-----`

const pem = ref('')
const error = ref('')
const result = ref<any>(null)

// --- minimal DER parser ---
function der(bytes: Uint8Array) {
  const list: any[] = []
  let i = 0
  while (i < bytes.length) {
    const tag = bytes[i]
    let len = bytes[i + 1]
    let hdr = 2
    if (len & 0x80) {
      const n = len & 0x7f
      len = 0
      for (let k = 0; k < n; k++) len = len * 256 + bytes[i + 2 + k]
      hdr = 2 + n
    }
    list.push({ tag, start: i + hdr, end: i + hdr + len, raw: bytes.slice(i, i + hdr + len) })
    i += hdr + len
  }
  return list
}
function children(node: any) { return der(node.raw.slice(node.raw.length - (node.end - node.start))) }
function oid(bytes: Uint8Array) {
  let s = Math.floor(bytes[0] / 40) + '.' + (bytes[0] % 40)
  let v = 0
  for (let i = 1; i < bytes.length; i++) { v = v * 128 + (bytes[i] & 0x7f); if (!(bytes[i] & 0x80)) { s += '.' + v; v = 0 } }
  return s
}
const NAME_OIDS: Record<string, string> = { '2.5.4.3': 'CN', '2.5.4.6': 'C', '2.5.4.7': 'L', '2.5.4.8': 'ST', '2.5.4.10': 'O', '2.5.4.11': 'OU', '2.5.4.5': 'serialNumber', '1.2.840.113549.1.9.1': 'emailAddress', '0.9.2342.19200300.100.1.25': 'DC' }
const SIG_OIDS: Record<string, string> = { '1.2.840.113549.1.1.5': 'sha1WithRSAEncryption', '1.2.840.113549.1.1.11': 'sha256WithRSAEncryption', '1.2.840.113549.1.1.12': 'sha384WithRSAEncryption', '1.2.840.113549.1.1.13': 'sha512WithRSAEncryption', '1.2.840.10045.4.3.2': 'ecdsa-with-SHA256', '1.2.840.10045.4.3.3': 'ecdsa-with-SHA384', '1.2.840.10045.4.3.4': 'ecdsa-with-SHA512', '1.3.101.112': 'Ed25519' }
const EXT_OIDS: Record<string, string> = { '2.5.29.17': 'subjectAltName', '2.5.29.15': 'keyUsage', '2.5.29.19': 'basicConstraints', '2.5.29.37': 'extendedKeyUsage', '2.5.29.14': 'subjectKeyIdentifier' }
const EKU_OIDS: Record<string, string> = { '1.3.6.1.5.5.7.3.1': 'serverAuth', '1.3.6.1.5.5.7.3.2': 'clientAuth', '1.3.6.1.5.5.7.3.3': 'codeSigning', '1.3.6.1.5.5.7.3.4': 'emailProtection' }
const KU_BITS = ['digitalSignature', 'nonRepudiation', 'keyEncipherment', 'dataEncipherment', 'keyAgreement', 'keyCertSign', 'cRLSign']

async function decode() {
  error.value = ''; result.value = null
  const b64 = pem.value.replace(/-----(BEGIN|END)[^-]+-----/g, '').replace(/\s+/g, '')
  if (!b64) { error.value = 'Paste a CSR first.'; return }
  let bytes: Uint8Array
  try { bytes = new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0))) } catch { error.value = 'Invalid base64 in PEM.'; return }

  try {
    const [csr] = der(bytes)
    if (!csr || csr.tag !== 0x30) throw new Error('Not a DER SEQUENCE - is this a CSR?')
    const top = children(csr)
    if (top.length !== 3) throw new Error('Expected CertificationRequest with 3 fields')
    const [cri, sigAlgNode, sigNode] = top

    // signature algorithm
    const sigAlg = SIG_OIDS[oid(children(sigAlgNode)[0].raw.slice(children(sigAlgNode)[0].raw.length - (children(sigAlgNode)[0].end - children(sigAlgNode)[0].start)))] || 'unknown OID'

    // CRI: version, subject, spki, [0] attributes
    const criKids = children(cri)
    const version = new DataView(criKids[0].raw.buffer, criKids[0].raw.byteOffset).getInt8(criKids[0].raw.length - 1) + 1
    const subject: Record<string, string> = {}
    for (const rdn of children(criKids[1])) {
      for (const atv of children(rdn)) {
        const [o, v] = children(atv)
        const nameOid = oid(o.raw.slice(o.raw.length - (o.end - o.start)))
        const txt = new TextDecoder().decode(v.raw.slice(v.raw.length - (v.end - v.start)))
        const key = NAME_OIDS[nameOid] || nameOid
        subject[key] = subject[key] ? subject[key] + ', ' + txt : txt
      }
    }
    // SPKI
    const [algNode, keyBitsNode] = children(criKids[2])
    const algOid = oid(children(algNode)[0].raw.slice(children(algNode)[0].raw.length - (children(algNode)[0].end - children(algNode)[0].start)))
    let keyAlg = algOid === '1.2.840.113549.1.1.1' ? 'RSA' : algOid === '1.2.840.10045.2.1' ? 'EC' : algOid === '1.3.101.112' ? 'Ed25519' : algOid
    let keyBits = 0
    if (algOid === '1.2.840.113549.1.1.1') {
      const rs = children(keyBitsNode)[0]
      keyBits = (rs.end - rs.start - 1) * 8
    } else if (algOid === '1.2.840.10045.2.1' && children(algNode)[1]) {
      const curveOid = oid(children(algNode)[1].raw.slice(children(algNode)[1].raw.length - (children(algNode)[1].end - children(algNode)[1].start)))
      keyAlg = 'EC (' + (curveOid === '1.2.840.10045.3.1.7' ? 'P-256' : curveOid === '1.3.132.0.34' ? 'P-384' : curveOid === '1.3.132.0.35' ? 'P-521' : curveOid) + ')'
    }

    // attributes: [0] context tag
    const sans: string[] = []
    const extensions: { name: string; critical: boolean; value: string }[] = []
    let challenge = ''
    if (criKids[3]) {
      const attrs = children(criKids[3])
      for (const attrSet of attrs) {
        for (const attr of children(attrSet)) {
          const [o, vals] = children(attr)
          const aOid = oid(o.raw.slice(o.raw.length - (o.end - o.start)))
          if (aOid === '1.2.840.113549.1.9.14') {
            const extSeq = children(children(vals)[0])[0]
            for (const ext of children(extSeq)) {
              const [eo, ev] = children(ext)
              const eOid = oid(eo.raw.slice(eo.raw.length - (eo.end - eo.start)))
              let critical = false; let payload = ev
              if (ev.tag === 0x01) { critical = new DataView(ev.raw.buffer, ev.raw.byteOffset).getInt8(ev.raw.length - 1) !== 0; payload = children(ext)[2] }
              const data = payload.raw.slice(payload.raw.length - (payload.end - payload.start))
              const name = EXT_OIDS[eOid] || eOid
              let value = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(':')
              if (name === 'subjectAltName') {
                for (const gn of children(children(payload)[0])) {
                  const gnData = gn.raw.slice(gn.raw.length - (gn.end - gn.start))
                  if (gn.tag === 0x82) sans.push('DNS:' + new TextDecoder().decode(gnData))
                  else if (gn.tag === 0x81) sans.push('email:' + new TextDecoder().decode(gnData))
                  else if (gn.tag === 0x86) sans.push('URI:' + new TextDecoder().decode(gnData))
                  else if (gn.tag === 0x87 && gnData.length === 4) sans.push('IP:' + Array.from(gnData).join('.'))
                  else sans.push('other (tag ' + gn.tag.toString(16) + ')')
                }
                value = sans.join(', ')
              } else if (name === 'keyUsage') {
                const bits = data[data.length - 1]
                const unused = data.length > 1 ? data[data.length - 2] : 0
                const nbits = 8 - unused
                value = KU_BITS.slice(0, nbits).filter((_, i) => bits & (1 << (7 - i - (8 - nbits)))).join(', ') || 'none'
              } else if (name === 'extendedKeyUsage') {
                value = children(children(payload)[0]).map(c => { const d = c.raw.slice(c.raw.length - (c.end - c.start)); const k = EKU_OIDS[oid(d)] || oid(d); return k }).join(', ')
              } else if (name === 'basicConstraints') {
                value = data.length ? 'CA' : 'end-entity'
              } else if (name === 'subjectKeyIdentifier') {
                value = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(':')
              }
              extensions.push({ name, critical, value })
            }
          } else if (aOid === '1.2.840.113549.1.9.7') {
            challenge = new TextDecoder().decode(children(children(vals)[0])[0].raw.slice(0))
          }
        }
      }
    }

    // verify RSA self-signature via WebCrypto
    let verified: boolean | null = null
    let verifyNote = ''
    const spki = new Uint8Array(criKids[2].raw)
    const sigBytes = sigNode.raw.slice(sigNode.raw.length - (sigNode.end - sigNode.start) + 1)
    if (algOid === '1.2.840.113549.1.1.1' && (SIG_OIDS['1.2.840.113549.1.1.11'] === sigAlg || SIG_OIDS['1.2.840.113549.1.1.12'] === sigAlg || SIG_OIDS['1.2.840.113549.1.1.13'] === sigAlg)) {
      try {
        const hash = sigAlg.includes('384') ? 'SHA-384' : sigAlg.includes('512') ? 'SHA-512' : 'SHA-256'
        const key = await crypto.subtle.importKey('spki', spki, { name: 'RSASSA-PKCS1-v1_5', hash }, false, ['verify'])
        verified = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sigBytes, new Uint8Array(cri.raw))
      } catch (e: any) { verifyNote = 'verify failed: ' + e.message }
    } else {
      verifyNote = 'only sha2xxWithRSA signatures are verified automatically'
    }

    result.value = { version, subject, keyAlg, keyBits, sans, extensions, challenge, sigAlg, verified, verifyNote }
  } catch (e: any) {
    error.value = 'Could not parse CSR: ' + e.message
  }
}
</script>
