<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const generatedUla = ref('')

const generateULA = () => {
  // Generate a random ULA prefix
  // ULA prefix is fd00::/8 with 40 random bits
  const randomBytes = new Uint8Array(5)
  crypto.getRandomValues(randomBytes)

  // ULA prefix starts with fd
  const b0 = randomBytes[0] ?? 0
  const b1 = randomBytes[1] ?? 0
  const b2 = randomBytes[2] ?? 0
  const b3 = randomBytes[3] ?? 0
  const b4 = randomBytes[4] ?? 0

  const parts = [
    'fd' + b0.toString(16).padStart(2, '0'),
    b1.toString(16).padStart(2, '0') + b2.toString(16).padStart(2, '0'),
    b3.toString(16).padStart(2, '0') + b4.toString(16).padStart(2, '0')
  ]

  generatedUla.value = parts.join(':') + '::/48'
}

const copyUla = () => {
  navigator.clipboard.writeText(generatedUla.value)
}

// Generate initial ULA
generateULA()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">IPv6 ULA Generator</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Generate IPv6 Unique Local Address</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Generated ULA Prefix</Label>
          <div class="flex gap-2">
            <div class="flex-1 p-4 rounded-lg bg-muted font-mono text-xl text-center break-all">
              {{ generatedUla }}
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <Button @click="generateULA" class="flex-1" aria-label="Generate new ULA">Generate New</Button>
          <Button variant="outline" @click="copyUla" aria-label="Copy ULA address">Copy</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>About IPv6 ULA</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>
          <strong>Unique Local Addresses (ULA)</strong> are IPv6 addresses for local communications.
        </p>
        <p>
          Prefix: <code class="bg-muted px-1 rounded">fc00::/7</code> (currently
          <code class="bg-muted px-1 rounded">fd00::/8</code>)
        </p>
        <p>They are not routable on the global internet, similar to IPv4 private addresses.</p>
        <p>Useful for internal networks, testing, and private communications.</p>
      </CardContent>
    </Card>
  </div>
</template>
