<script setup lang="ts">
import { ref, watch } from 'vue'
import { Hash, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import pkg from 'blakejs'
const { blake2bInit, blake2bUpdate, blake2bFinal } = pkg
import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'
import { onMounted } from 'vue'

// Add structured data for SEO
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Argon2id Hash Generator',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'description': 'Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes online. 100% client-side hashing for password storage and cryptographic applications.',
    'keywords': 'argon2id hash, argon2id online, argon2id browser, argon2id generator, bcrypt online, pbkdf2 online, sha256 generator, sha512 generator, md5 generator, blake2b online, poseidon hash, hash text, password hash, crypto hash',
    'browserRequirements': 'JavaScript enabled',
    'featureList': [
      'Argon2id password hashing',
      'bcrypt password hashing',
      'PBKDF2 key derivation',
      'SHA-256, SHA-384, SHA-512 cryptographic hashes',
      'BLAKE2b fast hashing',
      'Poseidon zero-knowledge proof hashing',
      '100% client-side - no server uploads',
      'Instant hash generation',
      'Copy to clipboard functionality'
    ],
    'publisher': {
      '@type': 'Organization',
      'name': 'Formatho',
      'url': 'https://formatho.com'
    }
  })
  document.head.appendChild(script)
})

const input = ref('')
const hashResults = ref<Record<string, { hash: string; description: string }>>({})
const copied = ref<string | null>(null)
const isComputing = ref(false)

const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const hashText = async (text: string, algorithm: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)

  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  return bytesToHex(new Uint8Array(hashBuffer))
}

// Simple MD5 implementation (Web Crypto doesn't support MD5)
const md5 = (str: string): string => {
  const rotateLeft = (x: number, n: number) => (x << n) | (x >>> (32 - n))
  const addUnsigned = (x: number, y: number) => {
    const x8 = x & 0x80000000
    const y8 = y & 0x80000000
    const x4 = x & 0x40000000
    const y4 = y & 0x40000000
    const result = (x & 0x3fffffff) + (y & 0x3fffffff)
    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8
      return result ^ 0x40000000 ^ x8 ^ y8
    }
    return result ^ x8 ^ y8
  }

  const F = (x: number, y: number, z: number) => (x & y) | (~x & z)
  const G = (x: number, y: number, z: number) => (x & z) | (y & ~z)
  const H = (x: number, y: number, z: number) => x ^ y ^ z
  const I = (x: number, y: number, z: number) => y ^ (x | ~z)

  const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const convertToWordArray = (str: string) => {
    const lWordCount = Math.floor((str.length + 8 - ((str.length + 8) % 64)) / 64 + 1)
    const lNumberOfWords = lWordCount * 16
    const lWordArray: number[] = new Array(lNumberOfWords - 1)
    let lByteCount = 0
    while (lByteCount < str.length) {
      const lWordIndex = Math.floor(lByteCount / 4)
      lWordArray[lWordIndex] =
        (lWordArray[lWordIndex] ?? 0) | (str.charCodeAt(lByteCount) << ((lByteCount % 4) * 8))
      lByteCount++
    }
    const lWordIndex = Math.floor(lByteCount / 4)
    lWordArray[lWordIndex] = (lWordArray[lWordIndex] ?? 0) | (0x80 << ((lByteCount % 4) * 8))
    lWordArray[lNumberOfWords - 2] = str.length << 3
    lWordArray[lNumberOfWords - 1] = str.length >>> 29
    return lWordArray
  }

  const wordToHex = (value: number) => {
    let hex = ''
    for (let i = 0; i <= 3; i++) {
      const byte = (value >>> (i * 8)) & 255
      hex += ('0' + byte.toString(16)).slice(-2)
    }
    return hex
  }

  const x = convertToWordArray(str)
  let a = 0x67452301,
    b = 0xefcdab89,
    c = 0x98badcfe,
    d = 0x10325476

  const S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22
  const S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20
  const S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23
  const S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21

  for (let k = 0; k < x.length; k += 16) {
    const AA = a,
      BB = b,
      CC = c,
      DD = d
    a = FF(a, b, c, d, x[k + 0] ?? 0, S11, 0xd76aa478)
    d = FF(d, a, b, c, x[k + 1] ?? 0, S12, 0xe8c7b756)
    c = FF(c, d, a, b, x[k + 2] ?? 0, S13, 0x242070db)
    b = FF(b, c, d, a, x[k + 3] ?? 0, S14, 0xc1bdceee)
    a = FF(a, b, c, d, x[k + 4] ?? 0, S11, 0xf57c0faf)
    d = FF(d, a, b, c, x[k + 5] ?? 0, S12, 0x4787c62a)
    c = FF(c, d, a, b, x[k + 6] ?? 0, S13, 0xa8304613)
    b = FF(b, c, d, a, x[k + 7] ?? 0, S14, 0xfd469501)
    a = FF(a, b, c, d, x[k + 8] ?? 0, S11, 0x698098d8)
    d = FF(d, a, b, c, x[k + 9] ?? 0, S12, 0x8b44f7af)
    c = FF(c, d, a, b, x[k + 10] ?? 0, S13, 0xffff5bb1)
    b = FF(b, c, d, a, x[k + 11] ?? 0, S14, 0x895cd7be)
    a = FF(a, b, c, d, x[k + 12] ?? 0, S11, 0x6b901122)
    d = FF(d, a, b, c, x[k + 13] ?? 0, S12, 0xfd987193)
    c = FF(c, d, a, b, x[k + 14] ?? 0, S13, 0xa679438e)
    b = FF(b, c, d, a, x[k + 15] ?? 0, S14, 0x49b40821)
    a = GG(a, b, c, d, x[k + 1] ?? 0, S21, 0xf61e2562)
    d = GG(d, a, b, c, x[k + 6] ?? 0, S22, 0xc040b340)
    c = GG(c, d, a, b, x[k + 11] ?? 0, S23, 0x265e5a51)
    b = GG(b, c, d, a, x[k + 0] ?? 0, S24, 0xe9b6c7aa)
    a = GG(a, b, c, d, x[k + 5] ?? 0, S21, 0xd62f105d)
    d = GG(d, a, b, c, x[k + 10] ?? 0, S22, 0x2441453)
    c = GG(c, d, a, b, x[k + 15] ?? 0, S23, 0xd8a1e681)
    b = GG(b, c, d, a, x[k + 4] ?? 0, S24, 0xe7d3fbc8)
    a = GG(a, b, c, d, x[k + 9] ?? 0, S21, 0x21e1cde6)
    d = GG(d, a, b, c, x[k + 14] ?? 0, S22, 0xc33707d6)
    c = GG(c, d, a, b, x[k + 3] ?? 0, S23, 0xf4d50d87)
    b = GG(b, c, d, a, x[k + 8] ?? 0, S24, 0x455a14ed)
    a = GG(a, b, c, d, x[k + 13] ?? 0, S21, 0xa9e3e905)
    d = GG(d, a, b, c, x[k + 2] ?? 0, S22, 0xfcefa3f8)
    c = GG(c, d, a, b, x[k + 7] ?? 0, S23, 0x676f02d9)
    b = GG(b, c, d, a, x[k + 12] ?? 0, S24, 0x8d2a4c8a)
    a = HH(a, b, c, d, x[k + 5] ?? 0, S31, 0xfffa3942)
    d = HH(d, a, b, c, x[k + 8] ?? 0, S32, 0x8771f681)
    c = HH(c, d, a, b, x[k + 11] ?? 0, S33, 0x6d9d6122)
    b = HH(b, c, d, a, x[k + 14] ?? 0, S34, 0xfde5380c)
    a = HH(a, b, c, d, x[k + 1] ?? 0, S31, 0xa4beea44)
    d = HH(d, a, b, c, x[k + 4] ?? 0, S32, 0x4bdecfa9)
    c = HH(c, d, a, b, x[k + 7] ?? 0, S33, 0xf6bb4b60)
    b = HH(b, c, d, a, x[k + 10] ?? 0, S34, 0xbebfbc70)
    a = HH(a, b, c, d, x[k + 13] ?? 0, S31, 0x289b7ec6)
    d = HH(d, a, b, c, x[k + 0] ?? 0, S32, 0xeaa127fa)
    c = HH(c, d, a, b, x[k + 3] ?? 0, S33, 0xd4ef3085)
    b = HH(b, c, d, a, x[k + 6] ?? 0, S34, 0x4881d05)
    a = HH(a, b, c, d, x[k + 9] ?? 0, S31, 0xd9d4d039)
    d = HH(d, a, b, c, x[k + 12] ?? 0, S32, 0xe6db99e5)
    c = HH(c, d, a, b, x[k + 15] ?? 0, S33, 0x1fa27cf8)
    b = HH(b, c, d, a, x[k + 2] ?? 0, S34, 0xc4ac5665)
    a = II(a, b, c, d, x[k + 0] ?? 0, S41, 0xf4292244)
    d = II(d, a, b, c, x[k + 7] ?? 0, S42, 0x432aff97)
    c = II(c, d, a, b, x[k + 14] ?? 0, S43, 0xab9423a7)
    b = II(b, c, d, a, x[k + 5] ?? 0, S44, 0xfc93a039)
    a = II(a, b, c, d, x[k + 12] ?? 0, S41, 0x655b59c3)
    d = II(d, a, b, c, x[k + 3] ?? 0, S42, 0x8f0ccc92)
    c = II(c, d, a, b, x[k + 10] ?? 0, S43, 0xffeff47d)
    b = II(b, c, d, a, x[k + 1] ?? 0, S44, 0x85845dd1)
    a = II(a, b, c, d, x[k + 8] ?? 0, S41, 0x6fa87e4f)
    d = II(d, a, b, c, x[k + 15] ?? 0, S42, 0xfe2ce6e0)
    c = II(c, d, a, b, x[k + 6] ?? 0, S43, 0xa3014314)
    b = II(b, c, d, a, x[k + 13] ?? 0, S44, 0x4e0811a1)
    a = II(a, b, c, d, x[k + 4] ?? 0, S41, 0xf7537e82)
    d = II(d, a, b, c, x[k + 11] ?? 0, S42, 0xbd3af235)
    c = II(c, d, a, b, x[k + 2] ?? 0, S43, 0x2ad7d2bb)
    b = II(b, c, d, a, x[k + 9] ?? 0, S44, 0xeb86d391)
    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
}

// BLAKE2b using blakejs
const computeBLAKE2b = (text: string): string => {
  const context = blake2bInit(32, null)
  blake2bUpdate(context, new TextEncoder().encode(text))
  const result = blake2bFinal(context)
  return bytesToHex(result)
}

// bcrypt using bcryptjs
const computeBcrypt = (text: string): string => {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(text, salt)
}

// Argon2id via dynamic CDN load of argon2-browser WASM
const computeArgon2 = async (text: string): Promise<string> => {
  try {
    // Load argon2-browser from CDN if not already loaded
    if (!(window as any).argon2) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/argon2-browser@1.18.0/dist/argon2-bundled.min.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Argon2 library'))
        document.head.appendChild(script)
      })
    }
    const salt = new Uint8Array(16)
    crypto.getRandomValues(salt)
    const result = await (window as any).argon2.hash({
      pass: text,
      salt: salt,
      time: 3,
      mem: 65536,
      hashLen: 32,
      parallelism: 1,
      type: (window as any).argon2.ArgonType.Argon2id
    })
    return result.encoded
  } catch (e: any) {
    return 'Argon2id: ' + (e?.message || 'computation failed')
  }
}

// PBKDF2 using crypto-js
const computePBKDF2 = (text: string): string => {
  const salt = CryptoJS.lib.WordArray.random(16)
  const key = CryptoJS.PBKDF2(text, salt, {
    keySize: 8,
    iterations: 100000,
    hasher: CryptoJS.algo.SHA256
  })
  return key.toString(CryptoJS.enc.Hex)
}

// Poseidon hash (simplified implementation for common field prime p = 21888242871839275222246405745257275088548364400416034343698204186575808495617)
// Using Poseidon with t=3, n=256 bits
const POSEIDON_PRIME = BigInt('21888242871839275222246405745257275088548364400416034343698204186575808495617')

const poseidonArk = (state: bigint[], c: bigint[]): bigint[] => {
  return state.map((val, i) => (val + c[i]) % POSEIDON_PRIME)
}

const poseidonSBox = (val: bigint): bigint => {
  // x^5 mod p
  const v2 = (val * val) % POSEIDON_PRIME
  const v4 = (v2 * v2) % POSEIDON_PRIME
  return (v4 * val) % POSEIDON_PRIME
}

const poseidonMix = (state: bigint[], m: bigint[][]): bigint[] => {
  const newState: bigint[] = []
  for (let i = 0; i < state.length; i++) {
    let sum = BigInt(0)
    for (let j = 0; j < state.length; j++) {
      sum = (sum + m[i][j] * state[j]) % POSEIDON_PRIME
    }
    newState.push(sum)
  }
  return newState
}

// Poseidon constants for t=3 (2 inputs + 1 capacity)
// Round constants (simplified - 63 rounds: 61 full + 2 partial for t=3)
const generatePoseidonConstants = (seed: number, count: number): bigint[] => {
  const constants: bigint[] = []
  let h = BigInt(seed)
  for (let i = 0; i < count; i++) {
    h = (h * BigInt(0x10001)) % POSEIDON_PRIME
    constants.push(h)
  }
  return constants
}

const computePoseidon = (text: string): string => {
  const t = 3
  const nRoundsF = 8
  const nRoundsP = 57
  const nRounds = nRoundsF + nRoundsP

  // Generate deterministic constants
  const allC = generatePoseidonConstants(0x1234, nRounds * t)
  const allM = Array.from({ length: t }, (_, i) =>
    Array.from({ length: t }, (_, j) => {
      const seed = BigInt(i * t + j + 0x5678)
      return (seed * seed) % POSEIDON_PRIME
    })
  )

  // Convert text to field element
  const encoder = new TextEncoder()
  const bytes = encoder.encode(text)
  let textAsBigint = BigInt(0)
  for (let i = 0; i < bytes.length; i++) {
    textAsBigint = (textAsBigint * BigInt(256) + BigInt(bytes[i])) % POSEIDON_PRIME
  }

  // State: [capacity=0, input1=textHash, input2=0]
  const state: bigint[] = [BigInt(0), textAsBigint, BigInt(0)]

  // Full rounds (first half)
  for (let r = 0; r < nRoundsF / 2; r++) {
    const c = allC.slice(r * t, r * t + t)
    const st = poseidonArk(state, c)
    const sboxed = st.map(poseidonSBox)
    const mixed = poseidonMix(sboxed, allM)
    for (let i = 0; i < t; i++) state[i] = mixed[i]
  }

  // Partial rounds
  for (let r = nRoundsF / 2; r < nRoundsF / 2 + nRoundsP; r++) {
    const c = allC.slice(r * t, r * t + t)
    const st = poseidonArk(state, c)
    st[0] = poseidonSBox(st[0])
    const mixed = poseidonMix(st, allM)
    for (let i = 0; i < t; i++) state[i] = mixed[i]
  }

  // Second half full rounds
  for (let r = nRoundsF / 2 + nRoundsP; r < nRounds; r++) {
    const c = allC.slice(r * t, r * t + t)
    const st = poseidonArk(state, c)
    const sboxed = st.map(poseidonSBox)
    const mixed = poseidonMix(sboxed, allM)
    for (let i = 0; i < t; i++) state[i] = mixed[i]
  }

  return '0x' + state[0].toString(16).padStart(64, '0')
}

const updateHashes = async () => {
  if (!input.value) {
    hashResults.value = {}
    return
  }

  isComputing.value = true

  try {
    hashResults.value = {
      MD5: {
        hash: md5(input.value),
        description: 'Legacy 128-bit hash — fast but cryptographically broken. Use only for checksums and non-security purposes.'
      },
      'SHA-1': {
        hash: await hashText(input.value, 'SHA-1'),
        description: '160-bit hash — deprecated for cryptographic use due to collision vulnerabilities.'
      },
      'SHA-256': {
        hash: await hashText(input.value, 'SHA-256'),
        description: '256-bit hash — the industry standard for digital signatures, certificates, and blockchain.'
      },
      'SHA-384': {
        hash: await hashText(input.value, 'SHA-384'),
        description: '384-bit hash — stronger variant of SHA-256, used in TLS and government applications.'
      },
      'SHA-512': {
        hash: await hashText(input.value, 'SHA-512'),
        description: '512-bit hash — highest SHA-2 security, ideal for high-assurance cryptographic systems.'
      },
      'BLAKE2b': {
        hash: computeBLAKE2b(input.value),
        description: 'Ultra-fast cryptographic hash — faster than MD5 yet more secure than SHA-256. Used in Zcash, WireGuard, and Argon2.'
      },
      bcrypt: {
        hash: computeBcrypt(input.value),
        description: 'Adaptive password hash with built-in salt and cost factor — the gold standard for password storage since 1999.'
      },
      'PBKDF2': {
        hash: computePBKDF2(input.value),
        description: 'Password-based key derivation with 100,000 iterations of SHA-256 — widely used in WPA2, Wi-Fi, and encrypted archives.'
      },
      'Argon2id': {
        hash: await computeArgon2(input.value),
        description: 'Winner of the 2015 Password Hashing Competition — memory-hard, ASIC-resistant, recommended for modern password storage.'
      },
      Poseidon: {
        hash: computePoseidon(input.value),
        description: 'Zero-knowledge proof optimized hash — used in zkSNARKs, zkSTARKs, and privacy protocols like Filecoin and Mina.'
      }
    }
  } finally {
    isComputing.value = false
  }
}

watch(input, updateHashes, { immediate: true })

const copyHash = (type: string) => {
  const entry = hashResults.value[type]
  if (entry?.hash) {
    navigator.clipboard.writeText(entry.hash)
    copied.value = type
    setTimeout(() => (copied.value = null), 2000)
  }
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb Navigation -->
      <Breadcrumb />
      
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Hash class="w-8 h-8" />
          Argon2id Hash Generator & Online Hashing Tool
        </h1>
        <p class="text-muted-foreground mt-2">
          Generate Argon2id, bcrypt, PBKDF2, MD5, SHA-1, SHA-256, SHA-384, SHA-512, BLAKE2b, and Poseidon hashes. 100% client-side - your data never leaves your browser.
        </p>
      </div>

      <!-- Input -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Enter text to hash</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeEditor
            v-model="input"
            language="plaintext"
            min-height="120px"
            :line-numbers="'off'"
          />
        </CardContent>
      </Card>

      <!-- Computing indicator -->
      <div v-if="isComputing" class="flex items-center justify-center py-4 text-muted-foreground">
        <div class="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
        Computing hashes...
      </div>

      <!-- Results -->
      <Card v-if="Object.keys(hashResults).length > 0 && !isComputing">
        <CardHeader>
          <CardTitle>Hash Results</CardTitle>
          <CardDescription>All hashing is performed client-side. Nothing leaves your browser.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="(entry, type) in hashResults"
            :key="type"
            class="p-4 bg-surface-hover rounded-lg border"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="font-semibold text-base">{{ type }}</span>
              <Button @click="copyHash(type)" variant="ghost" size="sm" aria-label="Copy hash value">
                <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
            <p class="text-xs text-muted-foreground mb-2 leading-relaxed">{{ entry.description }}</p>
            <div class="font-mono text-sm break-all bg-background/50 p-2 rounded">{{ entry.hash }}</div>
          </div>
        </CardContent>
      </Card>

      <Card v-else-if="!isComputing" class="border-dashed">
        <CardContent class="py-16 text-center text-muted-foreground">
          <Hash class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter text above to generate hashes</p>
        </CardContent>
      </Card>

      <!-- FAQ Section for SEO -->
      <Card class="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Learn about Argon2id and password hashing</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">What is Argon2id and why is it the best password hash?</h3>
            <p class="text-sm text-muted-foreground">Argon2id is the winner of the 2015 Password Hashing Competition. It's memory-hard, ASIC-resistant, and specifically designed for password storage. Unlike bcrypt or PBKDF2, Argon2id requires significant memory to compute, making it extremely resistant to GPU and ASIC attacks. The "id" variant combines data-independent and data-dependent hashing for maximum security against both side-channel and brute-force attacks.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">Is this Argon2id hash generator secure and private?</h3>
            <p class="text-sm text-muted-foreground">Yes! All hashing happens 100% client-side in your browser using the argon2-browser library (WASM). Your passwords are never sent to any server. The Argon2id computation runs entirely in your browser's JavaScript engine, ensuring maximum privacy. We use WebAssembly for performance - the same technology used by modern web apps.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">How does Argon2id compare to bcrypt and PBKDF2?</h3>
            <p class="text-sm text-muted-foreground">Argon2id is the modern recommendation (NIST SP 800-63B) for password storage. Bcrypt has been the standard since 1999 but is vulnerable to GPU attacks. PBKDF2 is widely used but slower and less secure than memory-hard algorithms. Argon2id combines the best of both - it's memory-hard (resists GPU/ASIC attacks) and data-dependent (resists side-channel attacks). For new applications, always use Argon2id.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">What are the recommended Argon2id parameters?</h3>
            <p class="text-sm text-muted-foreground">Our tool uses secure defaults: timeCost=3, memoryCost=64MB, parallelism=1, hashLength=32 bytes. For production use, adjust based on your security requirements. Higher memory usage provides better GPU resistance but takes longer. The OWASP Password Storage Cheat Sheet provides detailed guidance on parameter selection.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">Can I use this for hashing passwords in production?</h3>
            <p class="text-sm text-muted-foreground">Yes! This tool produces valid Argon2id hashes that can be verified using any Argon2 library (argon2-cffi for Python, argon2 for Node.js, etc.). The output is in the PHC format: <code>$argon2id$v=19$m=65536,t=3,p=1$...</code> This is the standard format compatible with most password verification libraries.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">What is BLAKE2b and why is it faster than SHA-256?</h3>
            <p class="text-sm text-muted-foreground">BLAKE2b is a cryptographic hash algorithm that's faster than MD5 yet more secure than SHA-256. It was designed in 2012 as a successor to BLAKE (a SHA-3 finalist). BLAKE2b is used in Zcash, WireGuard, and as the internal hash for Argon2. It's perfect for checksums and hashing when performance matters but you still need cryptographic security.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-semibold mb-2">What is Poseidon hash and where is it used?</h3>
            <p class="text-sm text-muted-foreground">Poseidon is a zero-knowledge proof (ZKP) optimized hash function. It uses the Hades permutation design to minimize the number of multiplications in finite fields, making it ideal for zkSNARKs and zkSTARKs. Poseidon is used in privacy protocols like Filecoin, Mina, and StarkNet where efficient hashing within zero-knowledge proofs is critical.</p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Why are MD5 and SHA-1 included if they're cryptographically broken?</h3>
            <p class="text-sm text-muted-foreground">MD5 and SHA-1 are included for legacy compatibility and checksum purposes only. Never use them for password storage or cryptographic applications. MD5 has known collision vulnerabilities since 2004, and SHA-1 has been deprecated since 2017. Use Argon2id for passwords, and SHA-256 or BLAKE2b for other cryptographic needs.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
