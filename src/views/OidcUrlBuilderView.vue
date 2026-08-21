<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { Copy, Check, Link2, RefreshCw, ShieldCheck } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'OIDC Authorization URL & PKCE Generator - OAuth 2.0 | Formatho',
  description:
    'Build OAuth 2.0 / OpenID Connect authorization URLs with scopes, state, nonce and S256 PKCE code challenges. Works with Okta, Auth0, Azure AD, Keycloak and any OIDC provider. 100% client-side.',
  keywords: [
    'oidc url builder',
    'oauth authorization url',
    'pkce generator',
    'code verifier generator',
    'code challenge s256',
    'okta authorize url',
    'auth0 authorize url',
    'openid connect playground'
  ],
  ogType: 'website'
})

const issuer = ref('https://your-org.okta.com/oauth2/default')
const clientId = ref('0oa1abc2def3ghi4jkl5')
const redirectUri = ref('http://localhost:5173/callback')
const responseType = ref('code')
const scope = ref('openid profile email')
const state = ref('')
const nonce = ref('')
const usePkce = ref(true)
const verifier = ref('')
const copiedField = ref<string | null>(null)

function randomUrlSafe(bytes: number): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  let bin = ''
  for (const b of arr) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function regenerate() {
  if (!state.value) state.value = randomUrlSafe(16)
  if (!nonce.value) nonce.value = randomUrlSafe(16)
  if (usePkce.value) verifier.value = randomUrlSafe(64) // 86-char verifier, within 43-128 limit
}

async function sha256Base64Url(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  let bin = ''
  const bytes = new Uint8Array(digest)
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const baseUrl = computed(() => {
  let u = issuer.value.trim().replace(/\/+$/, '')
  if (!/^https?:\/\//.test(u)) u = 'https://' + u
  return u + '/v1/authorize'
})

// Async URL assembly - computed() cannot be async, so use a plain watcher
const authorizeUrlText = ref('')
watchEffect(async () => {
  const params = new URLSearchParams()
  params.set('response_type', responseType.value)
  params.set('client_id', clientId.value)
  params.set('redirect_uri', redirectUri.value)
  params.set('scope', scope.value)
  if (state.value) params.set('state', state.value)
  if (nonce.value) params.set('nonce', nonce.value)
  if (usePkce.value && verifier.value) {
    const challenge = await sha256Base64Url(verifier.value)
    params.set('code_challenge', challenge)
    params.set('code_challenge_method', 'S256')
  }
  authorizeUrlText.value = baseUrl.value + '?' + params.toString()
})

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = key
    setTimeout(() => (copiedField.value = null), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

regenerate()

function refreshAll() {
  state.value = randomUrlSafe(16)
  nonce.value = randomUrlSafe(16)
  if (usePkce.value) verifier.value = randomUrlSafe(64)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg">
        <Link2 class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">OIDC Authorization URL &amp; PKCE Generator</h1>
        <p class="text-sm text-muted-foreground">
          Build /authorize URLs with S256 PKCE — Okta, Auth0, Entra ID, Keycloak, any OIDC IdP
        </p>
      </div>
    </div>

    <Card class="mb-6">
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Provider &amp; client</CardTitle>
        <Button variant="outline" size="sm" @click="refreshAll">
          <RefreshCw class="w-4 h-4 mr-1" /> New state/nonce/verifier
        </Button>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-1.5">
          <Label for="issuer">Issuer / authorization server</Label>
          <Input id="issuer" v-model="issuer" class="font-mono text-sm" placeholder="https://your-org.okta.com/oauth2/default" />
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-1.5">
            <Label for="clientId">Client ID</Label>
            <Input id="clientId" v-model="clientId" class="font-mono text-sm" />
          </div>
          <div class="space-y-1.5">
            <Label for="redirectUri">Redirect URI</Label>
            <Input id="redirectUri" v-model="redirectUri" class="font-mono text-sm" />
          </div>
          <div class="space-y-1.5">
            <Label for="responseType">response_type</Label>
            <Input id="responseType" v-model="responseType" class="font-mono text-sm" />
          </div>
          <div class="space-y-1.5">
            <Label for="scope">scope (space separated)</Label>
            <Input id="scope" v-model="scope" class="font-mono text-sm" />
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="usePkce" class="accent-primary" />
          Add PKCE (S256) — recommended for SPAs and mobile apps
        </label>
      </CardContent>
    </Card>

    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <ShieldCheck class="w-4 h-4 text-primary" /> PKCE values
        </CardTitle>
      </CardHeader>
      <CardContent v-if="usePkce" class="space-y-3">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <Label for="verifier">code_verifier</Label>
            <Button variant="ghost" size="sm" aria-label="Copy verifier" @click="copy(verifier, 'verifier')">
              <Check v-if="copiedField === 'verifier'" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
            </Button>
          </div>
          <Textarea id="verifier" :model-value="verifier" readonly :rows="2" class="font-mono text-xs" />
        </div>
        <p class="text-xs text-muted-foreground">
          Send this as <code class="font-mono">code_verifier</code> in your token request.
        </p>
      </CardContent>
      <CardContent v-else class="text-sm text-muted-foreground">PKCE disabled.</CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle class="text-lg">Authorization URL</CardTitle>
        <Button variant="outline" size="sm" @click="copy(authorizeUrlText, 'url')">
          <Check v-if="copiedField === 'url'" class="w-4 h-4 mr-1" />
          <Copy v-else class="w-4 h-4 mr-1" />
          {{ copiedField === 'url' ? 'Copied' : 'Copy URL' }}
        </Button>
      </CardHeader>
      <CardContent class="space-y-4">
        <pre class="font-mono text-xs whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/50">{{ authorizeUrlText }}</pre>
        <a :href="authorizeUrlText" target="_blank" rel="noopener noreferrer">
          <Button size="sm">Open in new tab</Button>
        </a>
        <div class="text-xs text-muted-foreground space-y-1">
          <p>Then exchange the code at <code class="font-mono">{{ baseUrl.replace('/authorize', '/token') }}</code>:</p>
          <pre class="font-mono whitespace-pre-wrap break-all">{{ 'grant_type=authorization_code&client_id=' + clientId + '&code_verifier=' + (usePkce ? verifier : '') + '&redirect_uri=' + encodeURIComponent(redirectUri) }}</pre>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
