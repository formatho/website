<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Cloud class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">CloudHSM Key List &amp; EVM Address</h1>
        <p class="text-sm text-muted-foreground">List keys in AWS CloudHSM, inspect their attributes, and derive the EVM wallet address from an secp256k1 public key. 100% client-side.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Step 1 - How to list keys in CloudHSM</CardTitle></CardHeader>
      <CardContent class="text-sm space-y-4">
        <div>
          <p class="font-medium mb-1">Option A: cloudhsm-cli (Client SDK 3)</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">cloudhsm-cli key list
cloudhsm-cli key list --attribute label,key-class,key-type,curve
cloudhsm-cli key describe --handle &lt;handle&gt;</pre>
          <p class="text-muted-foreground mt-1">key list outputs JSON - paste it in Step 2 below.</p>
        </div>
        <div>
          <p class="font-medium mb-1">Option B: key_mgmt_tool (Client SDK command line)</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">./key_mgmt_tool listKeys
./key_mgmt_tool listAttributes -handle &lt;handle&gt;
./key_mgmt_tool exportPubKey -handle &lt;handle&gt; -f pem</pre>
        </div>
        <div>
          <p class="font-medium mb-1">Option C: PKCS#11 with opensc</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">pkcs11-tool --module /opt/cloudhsm/lib/libcloudhsm_pkcs11.so --list-objects
pkcs11-tool --module ... --read-object --type pubkey --id &lt;id&gt; -o pub.der
openssl ec -pubin -inform DER -in pub.der -out pub.pem</pre>
        </div>
        <div>
          <p class="font-medium mb-1">Generating an EVM-compatible key in the HSM</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">cloudhsm-cli key generate-pair key-type ecc curve secp256k1 label evm-custody-key \
  public-usage verify private-usage sign</pre>
          <p class="text-muted-foreground mt-1">EVM uses the secp256k1 curve - the same one as Ethereum. RSA or P-256 keys cannot produce EVM addresses.</p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>Step 2 - Key attributes (paste key list JSON output)</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="keyListJson" rows="8" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="Paste cloudhsm-cli key list output here (JSON array or single key)..."></textarea>
        <div class="flex gap-2">
          <Button @click="parseKeys">Show Attributes</Button>
          <Button variant="outline" @click="keyListJson = sampleKeyList; parseKeys()">Load Sample</Button>
        </div>
        <p v-if="keyError" class="text-sm text-red-500">{{ keyError }}</p>
      </CardContent>
    </Card>

    <div v-if="keys" class="space-y-3">
      <Card v-for="k in keys" :key="k.handle" :class="k.evm ? 'border-primary/50 ring-1 ring-primary/20' : ''">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 flex-wrap text-base">
            {{ k.label || 'Key' }}
            <span v-if="k.evm" class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wide">evm capable</span>
            <span v-else class="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wide">not evm</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table class="w-full text-xs">
            <tr v-for="(v, attr) in k.attrs" :key="attr" class="border-b border-border/50">
              <td class="py-1 pr-3 text-muted-foreground align-top font-mono whitespace-nowrap">{{ attr }}</td>
              <td class="py-1 font-mono break-all">{{ v }}</td>
            </tr>
          </table>
          <p v-if="k.note" class="text-xs text-muted-foreground mt-2">{{ k.note }}</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>Step 3 - Derive the EVM address from the public key</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <textarea v-model="pubInput" rows="4" class="w-full p-3 rounded-md border bg-background text-xs font-mono" placeholder="Public key hex (compressed 0x02/03... or uncompressed 0x04...) or PEM"></textarea>
        <div class="flex gap-2">
          <Button @click="derive">Derive Address</Button>
          <Button variant="outline" @click="pubInput = '0237b0bb7a8288d38ed49a524b5dc98cff3eb5ca824c9f9dc0dfdb3d9cd600f299'; derive()">Load Sample</Button>
        </div>
        <p v-if="pubError" class="text-sm text-red-500">{{ pubError }}</p>
        <div v-if="address" class="p-4 rounded-lg border border-green-500/40 bg-green-500/5">
          <p class="text-xs text-muted-foreground mb-1">EVM address (EIP-55 checksummed)</p>
          <p class="font-mono font-bold break-all">{{ address }}</p>
        </div>
        <p class="text-xs text-muted-foreground">The private key never leaves the HSM - the address is computed from the public key only (keccak-256 of the uncompressed point, last 20 bytes). Signing must happen inside the HSM via PKCS#11 or JCE.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>AWS CloudHSM holds keys in FIPS-validated hardware; private keys are non-extractable. For EVM custody you generate an secp256k1 pair in the HSM, list it to find the handle and attributes, export only the public key, and derive the on-chain address from it locally. This page does both inspection steps in your browser - no data leaves this tab.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Cloud } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { keccak_256 } from '@noble/hashes/sha3'

useSEO({
  title: 'CloudHSM Key List & EVM Address Deriver | Formatho',
  description: 'List keys in AWS CloudHSM (cloudhsm-cli, key_mgmt_tool, PKCS#11), inspect key attributes, and derive the EVM wallet address from an secp256k1 public key. Free, client-side.',
  keywords: ['cloudhsm list keys', 'cloudhsm key list', 'aws cloudhsm evm address', 'cloudhsm ethereum wallet', 'cloudhsm secp256k1', 'hsm evm custody', 'derive evm address from public key', 'cloudhsm key attributes']
})

const sampleKeyList = JSON.stringify([
  {
    handle: 524001,
    label: 'evm-custody-key',
    'key-class': 'private-key',
    'key-type': 'ecc',
    curve: 'secp256k1',
    size: 256,
    sign: true,
    decrypt: false,
    extractable: false,
    sensitive: true,
    token: true,
    'date-created': '2026-10-12T10:14:03Z'
  },
  {
    handle: 524002,
    label: 'evm-custody-key',
    'key-class': 'public-key',
    'key-type': 'ecc',
    curve: 'secp256k1',
    size: 256,
    verify: true,
    encrypt: false,
    extractable: true,
    token: true,
    'date-created': '2026-10-12T10:14:03Z'
  },
  {
    handle: 524003,
    label: 'tls-server-key',
    'key-class': 'private-key',
    'key-type': 'rsa',
    size: 2048,
    sign: true,
    decrypt: true,
    extractable: false,
    token: true
  }
], null, 2)

const keyListJson = ref('')
const keyError = ref('')
const keys = ref<any[] | null>(null)
const pubInput = ref('')
const pubError = ref('')
const address = ref('')

function parseKeys() {
  keyError.value = ''; keys.value = null
  let data: any
  try { data = JSON.parse(keyListJson.value.trim()) } catch (e: any) { keyError.value = 'Invalid JSON: ' + e.message; return }
  const arr = Array.isArray(data) ? data : [data]
  const objects = arr.filter((x: any) => x && typeof x === 'object')
  if (!objects.length) { keyError.value = 'No key objects found in the JSON.'; return }
  keys.value = objects.map((o: any) => {
    const t = JSON.stringify(o).toLowerCase()
    const isEcc = t.includes('ecc') || t.includes('secp256k1') || t.includes('ec ')
    const isPriv = t.includes('private')
    const evm = isEcc && (t.includes('secp256k1') || t.includes('256k1'))
    let note = ''
    if (evm && isPriv) note = 'secp256k1 private key - EVM compatible. Export the matching public key (Step 3) to derive its address.'
    else if (isEcc && !t.includes('256k1')) note = 'ECC key but not secp256k1 - EVM requires the secp256k1 curve.'
    else if (!isEcc) note = 'Not an ECC key - RSA and symmetric keys cannot derive EVM addresses.'
    else note = 'secp256k1 public key - paste its hex in Step 3 to derive the address.'
    if (String(o.extractable) === 'false' && isPriv) note += ' Note: extractable=false means the private key never leaves the HSM - that is correct for custody.'
    return { handle: o.handle ?? o.id ?? JSON.stringify(o).length, label: o.label, attrs: o, evm, note }
  })
}

function toChecksumAddress(addrHex: string): string {
  const low = addrHex.toLowerCase()
  const h = Buffer.from(keccak_256(Buffer.from(low, 'ascii'))).toString('hex')
  let out = '0x'
  for (let i = 0; i < 40; i++) out += parseInt(h[i], 16) >= 8 ? low[i].toUpperCase() : low[i]
  return out
}

function derive() {
  pubError.value = ''; address.value = ''
  const raw = pubInput.value.trim()
  if (!raw) { pubError.value = 'Paste a public key first.'; return }
  let pub: Uint8Array | null = null
  try {
    if (raw.includes('BEGIN')) {
      // PEM (SPKI or SEC1): decode base64 body, take the trailing EC point (65 or 33 bytes)
      const b64 = raw.replace(/-----(BEGIN|END)[^-]+-----/g, '').replace(/\s+/g, '')
      const der = new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)))
      if (der.length >= 65 && der[der.length - 65] === 4) pub = der.slice(der.length - 65)
      else if (der.length >= 33 && (der[der.length - 33] === 2 || der[der.length - 33] === 3)) pub = der.slice(der.length - 33)
      else if (der[0] === 4 && der.length === 65) pub = der
    } else {
      const hex = raw.replace(/^0x/, '')
      if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2) { pubError.value = 'Not valid hex or PEM.'; return }
      pub = new Uint8Array(hex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
    }
    if (!pub) { pubError.value = 'Could not find an EC point in the input.'; return }
    // decompress if needed
    const point = pub[0] === 2 || pub[0] === 3
      ? secp256k1.Point.fromHex(Buffer.from(pub).toString('hex'))
      : pub[0] === 4 && pub.length === 65
        ? secp256k1.Point.fromHex(Buffer.from(pub).toString('hex'))
        : null
    if (!point) { pubError.value = 'Public key must be 33 bytes (compressed) or 65 bytes (uncompressed).' ; return }
    const uncompressed = point.toBytes(false)
    const hash = keccak_256(uncompressed.slice(1))
    const addrHex = Buffer.from(hash.slice(-20)).toString('hex')
    address.value = toChecksumAddress(addrHex)
  } catch (e: any) {
    pubError.value = 'Could not derive: ' + e.message
  }
}

onMounted(() => { keyListJson.value = sampleKeyList; parseKeys() })
</script>
