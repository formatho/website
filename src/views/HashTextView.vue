<script setup lang="ts">
import { ref, watch } from 'vue'
import { Hash, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const input = ref('')
const hashResults = ref<Record<string, string>>({})
const copied = ref<string | null>(null)

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

const updateHashes = async () => {
  if (!input.value) {
    hashResults.value = {}
    return
  }

  hashResults.value = {
    MD5: md5(input.value),
    'SHA-1': await hashText(input.value, 'SHA-1'),
    'SHA-256': await hashText(input.value, 'SHA-256'),
    'SHA-384': await hashText(input.value, 'SHA-384'),
    'SHA-512': await hashText(input.value, 'SHA-512')
  }
}

watch(input, updateHashes, { immediate: true })

const copyHash = (type: string) => {
  const hash = hashResults.value[type]
  if (hash) {
    navigator.clipboard.writeText(hash)
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
          Hash Text
        </h1>
        <p class="text-muted-foreground mt-2">
          Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.
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

      <!-- Results -->
      <Card v-if="Object.keys(hashResults).length > 0">
        <CardHeader>
          <CardTitle>Hash Results</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="(hash, type) in hashResults"
            :key="type"
            class="p-4 bg-surface-hover rounded-lg border"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">{{ type }}</span>
              <Button @click="copyHash(type)" variant="ghost" size="sm">
                <component :is="copied === type ? Check : Copy" class="w-4 h-4" />
              </Button>
            </div>
            <div class="font-mono text-sm break-all">{{ hash }}</div>
          </div>
        </CardContent>
      </Card>

      <Card v-else class="border-dashed">
        <CardContent class="py-16 text-center text-muted-foreground">
          <Hash class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter text above to generate hashes</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
