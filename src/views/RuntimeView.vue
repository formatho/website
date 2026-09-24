<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Terminal, ShieldCheck, Server, Boxes, FileSearch, Lock, Key, Gauge, Workflow, ArrowRight, Check } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Self-Hosted MCP Server — Docker, Private AI Agents | Formatho',
  description:
    'Run your own MCP server in Docker: Claude Code, Cursor and Claude Desktop get permissioned, audit-logged tool access inside your network. 26 tools, policy engine, zero data egress.',
  keywords: [
    'self hosted mcp server',
    'mcp server docker',
    'private ai agent tools',
    'claude code mcp server',
    'cursor mcp',
    'claude desktop mcp',
    'mcp gateway',
    'model context protocol server',
    'enterprise mcp',
    'ai agent tool security'
  ],
  ogType: 'website'
})

const steps = [
  { icon: Terminal, title: 'AI Agent', desc: 'Claude Code, Cursor, Claude Desktop — or any MCP client, inside your infrastructure.' },
  { icon: Server, title: 'MCP Server', desc: 'One Docker image. Streamable HTTP + stdio transports, no SaaS in the middle.' },
  { icon: Key, title: 'API keys & policy', desc: 'Per-client keys, allow/deny policies, and rate limits on every tool.' },
  { icon: Boxes, title: 'Tool Registry', desc: 'Every tool declares permissions, version, and schemas. 26 deterministic tools shipped.' },
  { icon: FileSearch, title: 'Audit Log', desc: 'Every invocation logged as metadata. Payloads never recorded.' }
]

const clients = [
  {
    name: 'Claude Code',
    blurb: 'One command registers the runtime as an MCP server:',
    code: `claude mcp add formatho -- \\
  docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime`
  },
  {
    name: 'Cursor',
    blurb: 'Add the server to .cursor/mcp.json (project) or ~/.cursor/mcp.json (global):',
    code: `{
  "mcpServers": {
    "formatho": {
      "command": "docker",
      "args": ["run", "-i", "--rm",
               "-v", "formatho-audit:/data",
               "formatho/formatho-runtime"]
    }
  }
}`
  },
  {
    name: 'Claude Desktop',
    blurb: 'In Settings → Developer → Edit Config, add to claude_desktop_config.json:',
    code: `{
  "mcpServers": {
    "formatho": {
      "command": "docker",
      "args": ["run", "-i", "--rm",
               "-v", "formatho-audit:/data",
               "formatho/formatho-runtime"]
    }
  }
}`
  },
  {
    name: 'elizaOS agents',
    blurb: 'Point @elizaos/plugin-mcp at the HTTP endpoint — all 26 tools become agent actions:',
    code: `# in your elizaOS project
elizaos plugins add @elizaos/plugin-mcp
# MCP endpoint: http://localhost:8787/mcp

# Also see the free native plugin: /eliza-tools`
  },
  {
    name: 'Any MCP client (HTTP)',
    blurb: 'Run the gateway and point clients at the Streamable HTTP endpoint:',
    code: `docker run -p 8787:8787 -e FORMATHO_HOST=0.0.0.0 \\
  -v formatho-audit:/data formatho/formatho-runtime

# MCP endpoint:  http://localhost:8787/mcp
# REST gateway:  http://localhost:8787/api/tools/*`
  }
]

const quickStart = [
  'Pull and run the image: docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime (stdio transport, zero configuration).',
  'Register it with your agent — claude mcp add formatho for Claude Code, or the mcpServers entry for Cursor and Claude Desktop.',
  'Ask your agent to use a tool — convert, hash, decode — and watch the invocation land in the metadata-only audit log.',
  'When you need network reach, API keys, or rate limits, switch to the Streamable HTTP deployment and set policies per key.'
]

const capabilities = [
  { icon: Key, title: 'API keys & permissions', desc: 'Issue a key per client or per team. Allow and deny tool access with the policy engine; revoke instantly.' },
  { icon: Gauge, title: 'Rate limiting', desc: 'Per-key and per-tool limits stop a runaway agent loop before it costs anything.' },
  { icon: Workflow, title: 'REST gateway', desc: 'The same tools are exposed over plain REST — for scripts, CI, and systems that do not speak MCP.' },
  { icon: ShieldCheck, title: 'Zero data egress', desc: 'Tools are pure functions: no outbound network, no filesystem writes, no secret access — by construction.' },
  { icon: FileSearch, title: 'Metadata-only audit', desc: 'Tool, version, key, duration, byte sizes. What was called — never what was sent.' },
  { icon: Boxes, title: 'Listed in the MCP Registry', desc: 'Published as com.formatho/runtime — versioned, with OCI package metadata on Docker Hub.' }
]

const toolFamilies = [
  ['Data formats', 'JSON format/validate/minify, Base64+URL encoding, slugs, list conversion'],
  ['Security & tokens', 'SHA-2 + Keccak-256 hashing, HMAC, UUID/ULID, JWT decode, TOTP'],
  ['Web3 / EVM', 'Function selectors, CREATE2, EIP-1967 proxy slots, storage slots, calldata decode, v4 hook permissions'],
  ['DeFi math', 'Exact EIP-4626 vault share/asset math with spec rounding'],
  ['Developer', 'Timestamps, regex matching, case conversion, slugs, registry metadata']
]

const faqs = [
  { q: 'What is a self-hosted MCP server?', a: 'An MCP (Model Context Protocol) server runs inside your own infrastructure — a container you start, on a host you control — and gives AI agents like Claude Code, Cursor, and Claude Desktop controlled access to tools. Nothing routes through a vendor: connections terminate on your network, and you decide which tools each agent may call.' },
  { q: 'How do I connect Claude Code to a self-hosted MCP server?', a: 'One command: claude mcp add formatho -- docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime. Claude Code launches the container as a stdio MCP server and the Formatho tools appear in its tool list immediately.' },
  { q: 'How do I add an MCP server to Cursor?', a: 'Add an mcpServers entry to .cursor/mcp.json (per project) or ~/.cursor/mcp.json (global) with the docker run command as shown above — Cursor connects on startup and the tools are selectable in agent mode.' },
  { q: 'Can agents send my data to a third party through this server?', a: 'No — that is the point of the design. The tool registry refuses to register any tool that declares network, filesystem, secret, or subprocess access. Tools are pure functions over their inputs, so there is no channel for payloads to leave your environment.' },
  { q: 'What gets logged in the audit trail?', a: 'Metadata only: which tool, which version, which API key, duration, and payload byte sizes. The content of requests and responses is never written to disk, keeping the audit useful for compliance without becoming a data-loss vector itself.' },
  { q: 'Self-hosted or the hosted tier — which should I use?', a: 'Self-host when data must not leave your network or you want the policy engine under your control — it is one Docker command. The hosted tier (mcp.formatho.com) exists for trying the tools and for teams without container infrastructure; payloads transit the hosted endpoint, so regulated data belongs self-hosted.' },
  { q: 'What do I need to run it?', a: 'Docker on any Linux, macOS, or Windows host. The stdio transport needs no ports or configuration; the Streamable HTTP deployment binds a port and supports API keys, policies, and rate limits. Image size is small and the dependency chain is three pinned packages.' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="container mx-auto px-4 py-16 md:py-24 relative">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <p class="text-xs font-semibold tracking-[3px] uppercase text-muted-foreground">Formatho Runtime · v0.3</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            The self-hosted MCP server for AI agents
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Give Claude Code, Cursor, and Claude Desktop a permissioned toolset — 26 deterministic developer,
            security, and EVM tools — running in a Docker container on your infrastructure.
            API keys, policies, rate limits, metadata-only audit. Payloads never leave your network.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <code class="text-sm font-mono px-4 py-2.5 border border-foreground rounded-lg bg-muted/50 text-left">
              docker run -i --rm -v formatho-audit:/data formatho/formatho-runtime
            </code>
            <a
              href="https://github.com/formatho/formatho-runtime"
              class="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-foreground/20 rounded-lg font-semibold hover:bg-muted transition-colors"
              rel="noopener"
            >
              GitHub <ArrowRight class="w-4 h-4" />
            </a>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-muted-foreground pt-2">
            <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4" /> Zero data egress</span>
            <span class="flex items-center gap-1.5"><FileSearch class="w-4 h-4" /> Metadata-only audit</span>
            <span class="flex items-center gap-1.5"><Key class="w-4 h-4" /> API keys &amp; policies</span>
            <span class="flex items-center gap-1.5"><Server class="w-4 h-4" /> One container</span>
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

    <!-- Connect an agent -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">Connect your agent</h2>
        <p class="text-sm text-muted-foreground mb-8 max-w-2xl">
          The same server, four ways in. Pick your client; everything below is copy-paste ready.
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="c in clients" :key="c.name" class="border border-border rounded-lg p-5 bg-background">
            <h3 class="font-bold text-sm mb-1">{{ c.name }}</h3>
            <p class="text-xs text-muted-foreground mb-3">{{ c.blurb }}</p>
            <pre class="font-mono text-[11px] whitespace-pre-wrap break-all p-3 border border-border rounded-lg bg-muted/30 m-0">{{ c.code }}</pre>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mt-6">
          Full quickstart, the security model, and the tool-development guide live in the
          <a href="https://github.com/formatho/formatho-runtime" class="underline underline-offset-4" rel="noopener">GitHub repo</a>
          — image on <a href="https://hub.docker.com/r/formatho/formatho-runtime" class="underline underline-offset-4" rel="noopener">Docker Hub</a>
          — listed in the <a href="https://registry.modelcontextprotocol.io" class="underline underline-offset-4" rel="noopener">MCP Registry</a> as <code class="font-mono text-xs">com.formatho/runtime</code>.
        </p>
      </div>
    </section>

    <!-- Quick start -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">Quick start</h2>
        <ol class="space-y-4">
          <li v-for="(s, i) in quickStart" :key="i" class="flex gap-4">
            <span class="w-7 h-7 rounded-full bg-foreground text-background font-bold text-xs flex items-center justify-center shrink-0">{{ i + 1 }}</span>
            <p class="text-sm text-muted-foreground leading-relaxed pt-1">{{ s }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">Built for teams handing tools to agents</h2>
        <p class="text-sm text-muted-foreground mb-8 max-w-2xl">
          The runtime is what a browser tool site looks like when the audience is an engineering team
          and the user is an AI agent.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="cap in capabilities" :key="cap.title" class="border border-foreground/10 rounded-lg p-5 bg-background">
            <component :is="cap.icon" class="w-5 h-5 mb-3" />
            <h3 class="font-bold text-sm mb-1.5">{{ cap.title }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ cap.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">The catalog — 26 tools</h2>
        <p class="text-sm text-muted-foreground mb-8 max-w-2xl">
          Deterministic tools — the same math powering this site's browser tools, re-implemented headlessly
          and validated against identical ground truths. The public
          <RouterLink to="/tools" class="underline underline-offset-4">browser tools</RouterLink>
          remain free; the runtime is how agents get them privately.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

    <!-- FAQ -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">Frequently asked questions</h2>
        <div class="space-y-2">
          <details v-for="(f, i) in faqs" :key="i" class="group border border-border rounded-lg">
            <summary class="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between gap-4">
              {{ f.q }}
              <span class="text-muted-foreground transition-transform group-open:rotate-180">&#9662;</span>
            </summary>
            <p class="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{{ f.a }}</p>
          </details>
        </div>
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
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/enterprise"
            class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
          >
            Enterprise services <ArrowRight class="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-3 border border-foreground/20 rounded-lg font-semibold hover:bg-muted transition-colors"
          >
            Talk to Formatho Engineering
          </RouterLink>
          <a
            href="https://hub.docker.com/r/formatho/formatho-runtime"
            class="inline-flex items-center gap-2 px-8 py-3 border border-foreground/20 rounded-lg font-semibold hover:bg-muted transition-colors"
            rel="noopener"
          >
            <Check class="w-4 h-4" /> Get the image
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
