<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Terminal, ShieldCheck, Boxes, ArrowRight, Check, Lock, Server, Bot, Hash, FunctionSquare, BadgeCheck, Braces, Binary, Clock, Link2, Type, KeyRound, FileCheck } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'elizaOS Developer Tools — Free, Private, Client-Side | Formatho',
  description:
    'Free developer tools for elizaOS agent builders: pure-function utilities in the plugin-formatho elizaOS plugin plus browser-side character validators. Zero network, zero tracking, works offline.',
  keywords: [
    'elizaos tools',
    'elizaos plugin',
    'plugin-formatho',
    'elizaos developer tools',
    'eliza character file validator',
    'env file checker',
    'keccak256 online',
    'solidity function selector',
    'eip-55 checksum',
    'jwt decode',
    'private developer tools'
  ],
  ogType: 'website'
})

const actions = [
  { icon: Hash, name: 'keccak256', prompt: 'keccak256: hello world', out: '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad' },
  { icon: FunctionSquare, name: 'function selector', prompt: 'selector: transfer(address,uint256)', out: '0xa9059cbb' },
  { icon: BadgeCheck, name: 'EIP-55 checksum', prompt: 'checksum: 0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed', out: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed' },
  { icon: Braces, name: 'JSON validate & format', prompt: 'json: {"a":1}', out: 'pretty-printed or the exact parse error' },
  { icon: Binary, name: 'base64 + URL-safe', prompt: 'base64: hello eliza', out: 'aGVsbG8gZWxpemE= (and url-safe variant)' },
  { icon: Clock, name: 'unix timestamp ↔ ISO', prompt: 'timestamp: 1760000000', out: '2025-10-09T08:53:20.000Z' },
  { icon: Link2, name: 'URL encode & decode', prompt: 'url: https://formatho.com/?q=a b', out: 'percent-encoded or decoded form' },
  { icon: Type, name: 'HTML entities', prompt: 'entities: Café & Co', out: 'Caf&eacute; &amp; Co — encode or decode' },
  { icon: KeyRound, name: 'JWT decode', prompt: 'jwt: eyJhbGciOi...', out: 'header + payload, decoded locally — never validated online' }
]

const guarantees = [
  'Zero network — no fetch, no APIs, no telemetry',
  'Zero filesystem — nothing is read or written',
  'Zero secrets — no env vars, no keys, no config',
  'Pure functions: values in, values out — auditable in one sitting'
]

const browserTools = [
  { icon: Bot, title: 'Character-file validator', desc: 'Validate your elizaOS character config against the real schema: missing required fields, type errors, empty style/bio, bad messageExamples.', soon: true },
  { icon: ShieldCheck, title: '.env hygiene checker', desc: 'Client-side scan of agent .env files: duplicate keys, empty values, quote issues, and known elizaOS variable names. Nothing is ever uploaded.', soon: true },
  { icon: FileCheck, title: 'Plugin manifest linter', desc: 'Lint your plugin package.json against the elizaOS registry conventions: name scope, version, and description rules.', soon: true }
]

</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12">
    <header class="mb-12 text-center">
      <div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Bot class="h-7 w-7 text-primary" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight">elizaOS Developer Tools</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Free, private, client-side utilities for elizaOS agent builders — from the
        <code class="rounded bg-muted px-1.5 py-0.5 text-sm">plugin-formatho</code> native plugin to browser-side config checkers.
        Everything runs on your machine. No tracking, ever.
      </p>
    </header>

    <!-- Plugin section -->
    <section class="mb-14">
      <div class="mb-6 flex items-center gap-3">
        <Boxes class="h-6 w-6 text-primary" />
        <h2 class="text-2xl font-semibold">The native plugin: 9 pure-function actions</h2>
      </div>
      <p class="mb-6 text-muted-foreground">
        Install once and your elizaOS agent gains everyday dev utilities as native actions — no Docker, no API keys, no config.
        Every action is a synchronous pure function.
      </p>
      <div class="mb-6 rounded-lg border bg-muted/50 p-4 font-mono text-sm">
        <div class="mb-2 text-muted-foreground"># add to any elizaOS project</div>
        <div>elizaos plugins add plugin-formatho</div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="a in actions" :key="a.name" class="rounded-lg border bg-card p-4">
          <div class="mb-2 flex items-center gap-2">
            <component :is="a.icon" class="h-4 w-4 text-primary" />
            <span class="font-medium">{{ a.name }}</span>
          </div>
          <div class="mb-2 rounded bg-muted/60 px-2 py-1 font-mono text-xs text-muted-foreground">{{ a.prompt }}</div>
          <div class="truncate font-mono text-xs">{{ a.out }}</div>
        </div>
      </div>
    </section>

    <!-- Browser tools section -->
    <section class="mb-14">
      <div class="mb-6 flex items-center gap-3">
        <Terminal class="h-6 w-6 text-primary" />
        <h2 class="text-2xl font-semibold">Browser tools for agent configs</h2>
      </div>
      <div class="grid gap-4 sm:grid-cols-3">
        <div v-for="t in browserTools" :key="t.title" class="rounded-lg border bg-card p-4">
          <div class="mb-3 flex items-center justify-between">
            <component :is="t.icon" class="h-5 w-5 text-primary" />
            <span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">coming soon</span>
          </div>
          <div class="mb-1 font-medium">{{ t.title }}</div>
          <p class="text-sm text-muted-foreground">{{ t.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Full runtime section -->
    <section class="mb-14 rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8">
      <div class="mb-4 flex items-center gap-3">
        <Server class="h-6 w-6 text-primary" />
        <h2 class="text-2xl font-semibold">Want all 26 tools + audit logs?</h2>
      </div>
      <p class="mb-6 text-muted-foreground">
        The full Formatho runtime gives your elizaOS agent 26 tools — web3, security, data formats, compliance —
        behind a self-hosted MCP server with per-client keys, policies, and audit logs. Works with elizaOS agents
        today via <code class="rounded bg-muted px-1.5 py-0.5 text-sm">@elizaos/plugin-mcp</code>:
      </p>
      <div class="mb-6 rounded-lg border bg-muted/50 p-4 font-mono text-sm">
        <div class="mb-2 text-muted-foreground"># self-hosted, works with elizaOS agents</div>
        <div>docker run -p 3000:3000 formatho/formatho-runtime</div>
      </div>
      <RouterLink to="/runtime" class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90">
        Explore the runtime <ArrowRight class="h-4 w-4" />
      </RouterLink>
    </section>

    <!-- Privacy note -->
    <section class="rounded-xl border p-6 sm:p-8">
      <div class="mb-4 flex items-center gap-3">
        <Lock class="h-6 w-6 text-primary" />
        <h2 class="text-xl font-semibold">Why private?</h2>
      </div>
      <p class="mb-4 text-muted-foreground">
        Agent configs, JWTs, and .env contents are the keys to your infrastructure. Pasting them into a random
        web tool means sending secrets over the network. Formatho tools never do that.
      </p>
      <ul class="grid gap-2 sm:grid-cols-2">
        <li v-for="g in guarantees" :key="g" class="flex items-start gap-2 text-sm">
          <Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {{ g }}
        </li>
      </ul>
    </section>
  </div>
</template>
