<script setup lang="ts">
import { Key, ArrowRight, ShieldCheck, FileCode, Hash, Lock, Clock, KeyRound, Binary } from 'lucide-vue-next'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'JWT & Auth Toolkit - Decode, Verify, Sign | Formatho',
  description:
    'A complete JWT and authentication toolkit: decode and verify tokens, inspect claims, build OIDC authorize URLs, decode SAML, generate secure tokens, and debug auth flows. All free, all client-side.',
  keywords: ['jwt toolkit', 'jwt suite', 'auth tools', 'token debugging', 'oauth tools', 'oidc tools', 'saml tools', 'jwt verify', 'auth debugging'],
  ogType: 'website'
})

const tools = [
  {
    icon: Key,
    title: 'JWT Debugger',
    desc: 'Decode header, payload, and claims. Verify HS256/HS384/HS512 with a secret or RS256/ES256 with a public key. See expiry status at a glance.',
    route: '/tools/jwt',
    tag: 'Core',
  },
  {
    icon: FileCode,
    title: 'SAML Decoder',
    desc: 'Decode SAML AuthnRequest and Response messages (Redirect and POST bindings) with pretty-printed XML. For Okta, Entra ID, Shibboleth debugging.',
    route: '/tools/saml-decoder',
    tag: 'Protocol',
  },
  {
    icon: ArrowRight,
    title: 'OIDC URL Builder + PKCE',
    desc: 'Build OAuth 2.0 / OpenID Connect authorize URLs with scopes, state, nonce, and S256 PKCE code challenges. Works with Okta, Auth0, Entra ID, Keycloak.',
    route: '/tools/oidc-url-builder',
    tag: 'Protocol',
  },
  {
    icon: Binary,
    title: 'Base64 Encoder/Decoder',
    desc: 'JWT headers and payloads are Base64URL-encoded. Encode or decode instantly to inspect the raw segments.',
    route: '/tools/base64',
    tag: 'Utility',
  },
  {
    icon: KeyRound,
    title: 'Token Generator',
    desc: 'Generate cryptographically secure random tokens and API secrets (hex, base64, custom alphabet) for testing auth flows.',
    route: '/tools/token-generator',
    tag: 'Utility',
  },
  {
    icon: Lock,
    title: 'Basic Auth Generator',
    desc: 'Build HTTP Basic Authentication headers for testing API endpoints that require username/password auth.',
    route: '/tools/basic-auth-generator',
    tag: 'Utility',
  },
  {
    icon: Clock,
    title: 'TOTP Generator',
    desc: 'Generate time-based OTP codes from a secret — useful for testing 2FA/MFA flows in your auth pipeline.',
    route: '/tools/otp-code-generator',
    tag: '2FA',
  },
  {
    icon: Hash,
    title: 'Hash Generator',
    desc: 'Generate SHA-256, SHA-512, HMAC, Argon2id, bcrypt, and PBKDF2 hashes — the same algorithms used in password storage and token signing.',
    route: '/tools/hash-text',
    tag: 'Crypto',
  },
  {
    icon: ShieldCheck,
    title: 'Password Strength Analyzer',
    desc: 'Check password entropy and get improvement suggestions before using it as a signing secret.',
    route: '/tools/password-strength-analyser',
    tag: 'Security',
  },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="mt-6 mb-10">
      <p class="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">Toolkit</p>
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        JWT &amp; Auth Toolkit
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed max-w-3xl">
        Everything you need to debug authentication flows — decode and verify JWTs,
        inspect SAML messages, build OIDC URLs, and generate secure tokens.
        All tools are free, private, and run entirely in your browser.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
      <RouterLink
        v-for="tool in tools"
        :key="tool.route"
        :to="tool.route"
        class="group border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <div class="flex items-start gap-4">
          <div class="p-2.5 bg-primary/10 rounded-lg shrink-0">
            <component :is="tool.icon" class="w-5 h-5 text-foreground" stroke-width="1.5" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h2 class="text-lg font-bold group-hover:text-primary transition-colors">{{ tool.title }}</h2>
              <span v-if="tool.tag" class="text-[10px] font-medium px-2 py-0.5 bg-muted border border-border rounded-full text-muted-foreground uppercase tracking-wide">
                {{ tool.tag }}
              </span>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ tool.desc }}</p>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- Educational section for SEO -->
    <div class="border-t border-border pt-8">
      <h2 class="text-xl font-bold mb-4">Common JWT debugging tasks</h2>
      <div class="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          <strong class="text-foreground">Why is my token expired?</strong>
          Paste it in the JWT Debugger and check the expiry banner — it shows exactly when the token
          expires and how long ago it expired. The <code class="font-mono text-xs">exp</code> claim
          is a Unix timestamp; the Claims Breakdown translates it to your local time.
        </p>
        <p>
          <strong class="text-foreground">How do I verify a token's signature?</strong>
          For HS256 tokens, paste the shared secret in the verification section. For RS256/ES256,
          paste the PEM public key. Verification uses the browser's native Web Crypto API —
          your secret never leaves your machine.
        </p>
        <p>
          <strong class="text-foreground">What claims should I check?</strong>
          The registered claims (<code class="font-mono text-xs">iss</code>, <code class="font-mono text-xs">sub</code>,
          <code class="font-mono text-xs">aud</code>, <code class="font-mono text-xs">exp</code>,
          <code class="font-mono text-xs">iat</code>, <code class="font-mono text-xs">nbf</code>)
          each have a standard meaning. The Claims Breakdown labels each one and explains what it controls.
        </p>
      </div>
    </div>
  </div>
</template>
