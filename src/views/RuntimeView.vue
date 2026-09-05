<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Terminal, ShieldCheck, Server, Boxes, FileSearch, Lock } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Formatho Runtime - Private Self-Hosted MCP Server for AI Agents',
  description:
    'Run Formatho tools inside your own infrastructure. A self-hosted MCP server with a permissioned tool registry, metadata-only audit logging, and Docker deployment. Your agents\u2019 payloads never leave your environment.',
  keywords: [
    'private mcp server',
    'self-hosted mcp',
    'docker mcp server',
    'enterprise mcp',
    'ai agent tools',
    'ai tool sandbox',
    'mcp security',
    'self-hosted ai tools',
    'developer mcp tools',
    'evm mcp tools'
  ],
  ogType: 'website'
})

const steps = [
  { icon: Terminal, title: 'AI Agent', desc: 'Claude, Cursor, or any MCP client — inside your infrastructure.' },
  { icon: Server, title: 'MCP Server', desc: 'One command, one Docker image. No SaaS in the middle.' },
  { icon: Boxes, title: 'Tool Registry', desc: 'Every tool declares permissions, version, and schemas.' },
  { icon: Lock, title: 'Pure-Function Tools', desc: 'No network, no filesystem, no secrets — by construction.' },
  { icon: FileSearch, title: 'Audit Log', desc: 'Every invocation logged as metadata. Payloads never recorded.' }
]

const toolFamilies = [
  ['Data', 'JSON format/validate/minify, Base64, URL, slugs'],
  ['Security', 'SHA-2 family hashing, UUID, random strings, JWT decode'],
  ['Web3 / EVM', 'Keccak-256, function selectors, CREATE2, storage slots, calldata decode, v4 hook permissions'],
  ['DeFi', 'Exact EIP-4626 vault math (spec rounding)'],
  ['Dev', 'Timestamp conversion, registry metadata']
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="container mx-auto px-4 py-16 md:py-24 relative">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <p class="text-xs font-semibold tracking-[3px] uppercase text-muted-foreground">Formatho Runtime</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Private infrastructure for AI tools and agents
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Give AI agents the Formatho tool catalog — developer, security, data, and EVM tools — without
            sending sensitive payloads to third-party services. Self-hosted, MCP-native, permissioned, audit-logged.
          </p>
          <div class="flex flex-wrap gap-4 justify-center pt-2">
            <code class="text-sm font-mono px-4 py-2.5 border border-foreground rounded-lg bg-muted/50">
              docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime
            </code>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-muted-foreground pt-2">
            <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4" /> Zero ambient permissions</span>
            <span class="flex items-center gap-1.5"><FileSearch class="w-4 h-4" /> Metadata-only audit</span>
            <span class="flex items-center gap-1.5"><Server class="w-4 h-4" /> Runs where your data lives</span>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center">How it works</h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div v-for="(s, i) in steps" :key="s.title" class="border border-foreground/10 rounded-lg p-5 relative">
            <p class="text-xs font-mono text-muted-foreground mb-3">0{{ i + 1 }}</p>
            <component :is="s.icon" class="w-6 h-6 mb-3" />
            <h3 class="font-bold text-sm mb-1.5">{{ s.title }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Connect -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">Connect an agent</h2>
        <p class="text-sm text-muted-foreground mb-6">
          One command registers the runtime with Claude Code; Claude Desktop and Cursor take the same server in
          their MCP settings.
        </p>
        <pre class="font-mono text-xs whitespace-pre-wrap break-all p-4 border border-border rounded-lg bg-background">claude mcp add formatho -- \
  docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime</pre>
        <p class="text-sm text-muted-foreground mt-6">
          Full quickstart, the security model, and the tool-development guide live in the
          <a href="https://github.com/formatho/formatho-runtime" class="underline underline-offset-4" rel="noopener">GitHub repo</a>
          — image on <a href="https://hub.docker.com/r/formatho/formatho-runtime" class="underline underline-offset-4" rel="noopener">Docker Hub</a>.
        </p>
      </div>
    </section>

    <!-- Tools -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">The catalog</h2>
        <p class="text-sm text-muted-foreground mb-8 max-w-2xl">
          Phase 1 ships 20 deterministic tools — the same math powering this site's browser tools, re-implemented
          headlessly and validated against identical ground truths. The public
          <RouterLink to="/tools" class="underline underline-offset-4">140+ browser tools</RouterLink>
          remain free; the runtime is how agents get them privately.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="[family, list] in toolFamilies" :key="family" class="border border-foreground/10 rounded-lg p-5">
            <h3 class="font-bold text-sm mb-2">{{ family }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed font-mono">{{ list }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Security model -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">Security model</h2>
        <ul class="space-y-3 text-sm">
          <li class="flex gap-3"><ShieldCheck class="w-5 h-5 shrink-0" /><span><strong>Permissions by construction.</strong> The registry refuses to register any tool claiming network, filesystem, secret, or subprocess access. Tools are pure functions — there is nothing to escape.</span></li>
          <li class="flex gap-3"><FileSearch class="w-5 h-5 shrink-0" /><span><strong>Audit without exposure.</strong> Every invocation logs tool, version, duration, and byte sizes. Payloads are never written to disk.</span></li>
          <li class="flex gap-3"><Boxes class="w-5 h-5 shrink-0" /><span><strong>Formatho Verified, not "audited".</strong> Per-tool checklists (source, dependencies, network behavior reviewed). The word <em>audited</em> is reserved for formal security audits.</span></li>
          <li class="flex gap-3"><Lock class="w-5 h-5 shrink-0" /><span><strong>Small supply chain.</strong> Three runtime dependencies, all pinned: the MCP SDK, zod, and noble hashes.</span></li>
        </ul>
      </div>
    </section>

    <!-- Services CTA -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center max-w-2xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">Need your internal systems agent-ready?</h2>
        <p class="text-sm text-muted-foreground mb-6">
          We turn internal APIs and workflows into secure, MCP-accessible tools — deployed inside your
          infrastructure. That is what Formatho Runtime was built for.
        </p>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
        >
          Talk to Formatho Engineering
        </RouterLink>
      </div>
    </section>
  </div>
</template>
