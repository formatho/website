<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShieldCheck, Terminal, Workflow, FileSearch, ArrowRight, Server, Gauge, Lock } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Enterprise Agent-Ready Services — MCP Integration | Formatho',
  description:
    'Formatho Engineering turns internal APIs and workflows into secure, MCP-accessible tools — deployed inside your infrastructure. Assessment to production, zero data egress by design.',
  keywords: ['enterprise ai agent integration', 'agent ready infrastructure', 'mcp integration services', 'self hosted mcp server enterprise', 'ai agent tool development', 'internal api mcp'],
  ogType: 'website'
})

const services = [
  {
    icon: Workflow,
    title: 'Internal API → MCP tool development',
    desc: 'We wrap your internal services as permissioned MCP tools: typed schemas, capability declarations, and error contracts your agents can act on — built on the same registry that powers Formatho Runtime.',
    points: ['Zod-validated input/output schemas', 'Deny-by-default capability declarations', 'Error shapes agents can self-correct from']
  },
  {
    icon: Server,
    title: 'Self-hosted runtime deployment',
    desc: 'We deploy and harden the runtime in your environment — Docker or Kubernetes, inside your VPC — with API-key issuance, policy files, and rate limits per agent and per team.',
    points: ['Docker / Kubernetes / VPC deployment', 'Per-agent keys and policy engine', 'Rate limits that stop runaway loops']
  },
  {
    icon: FileSearch,
    title: 'Governance & audit alignment',
    desc: 'Metadata-only audit trails designed for security review: what was called, by which key, when — never what was sent. We map the trail to your compliance vocabulary (SOC 2 evidence, internal review boards).',
    points: ['JSONL audit streams, payload-free by construction', 'SOC 2 / internal-review evidence mapping', 'Egress verification: the firewall test documented']
  },
  {
    icon: ShieldCheck,
    title: 'Agent-readiness assessment',
    desc: 'A two-week audit of which internal systems can safely become agent tools — and which cannot yet. You get a ranked roadmap with the capability gaps and data-classification boundaries made explicit.',
    points: ['Data classification per candidate system', 'Ranked tool roadmap with effort estimates', 'Buy/build/hosted recommendation per service']
  }
]

const phases = [
  { n: '01', title: 'Assessment', weeks: 'Weeks 1–2', desc: 'Inventory candidate systems, classify data boundaries, produce the ranked agent-readiness roadmap.' },
  { n: '02', title: 'Pilot', weeks: 'Weeks 3–6', desc: 'One or two high-value tools built and deployed in your environment, with policies and audit wired for review.' },
  { n: '03', title: 'Production', weeks: 'Weeks 7–10', desc: 'Expanded toolset, per-team keys and quotas, runbooks, and a security-review package your engineers can verify line by line.' },
  { n: '04', title: 'Handover', weeks: 'Ongoing', desc: 'Everything is yours: open-source runtime, tool code, policy files. Optional support retainers; no lock-in by construction.' }
]

const faqs = [
  { q: 'What does "agent-ready" actually mean?', a: 'An internal system is agent-ready when an AI agent can call it through a governed interface: typed schemas so the agent constructs valid requests, a permission model that says which agent may call what, rate limits that bound blast radius, and an audit trail that records every invocation without recording payloads. It is the difference between letting an agent loose on your API and giving it tools.' },
  { q: 'Where does our data go during the engagement?', a: 'Nowhere. The runtime we deploy runs inside your infrastructure and makes zero outbound requests — that is verifiable in the open-source code, not a contractual promise. Tool development happens against your staging systems; production access is issued by your team, to your team, and revocable by you.' },
  { q: 'Do you host anything for us?', a: 'The default engagement is fully self-hosted: your containers, your network, your keys. A hosted trial tier exists for evaluation, but production deployments in these engagements are self-hosted by design — that is the product thesis, and it is also what security teams sign off on fastest.' },
  { q: 'How is this different from hiring an MCP consultant?', a: 'The reference implementation is a maintained, open-source runtime with a published tool registry, MCP Registry listing, and a security model designed for review — not a one-off server somebody leaves behind. Engagements extend that foundation instead of starting from a blank file, so your team inherits an upgrade path, not an artifact.' },
  { q: 'What does an engagement cost?', a: 'Assessments are fixed-scope; pilots and production rollouts are sized by tool count and system complexity after the assessment. Every engagement ends with handover of all code and configuration — the open-source runtime guarantees there is no lock-in to price against.' },
  { q: 'Which teams typically start?', a: 'Platform and developer-experience teams bringing internal tooling to agents, security teams that need governed tool access before broader agent adoption, and payments/fintech engineering groups that already operate under data-residency constraints and recognize the zero-egress pattern.' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="container mx-auto px-4 py-16 md:py-24 relative">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <p class="text-xs font-semibold tracking-[3px] uppercase text-muted-foreground">Formatho Engineering Services</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Make your internal systems agent-ready
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We turn internal APIs and workflows into secure, MCP-accessible tools — deployed inside
            your infrastructure, permissioned per agent, audit-logged without recording payloads.
            Built on the open-source Formatho Runtime; verified, not trusted.
          </p>
          <div class="flex flex-wrap gap-4 justify-center pt-2">
            <RouterLink
              to="/contact"
              class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
            >
              Start with an assessment <ArrowRight class="w-4 h-4" />
            </RouterLink>
            <RouterLink
              to="/runtime"
              class="inline-flex items-center gap-2 px-8 py-3 border border-foreground/20 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              See the runtime
            </RouterLink>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-muted-foreground pt-2">
            <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4" /> Zero data egress by design</span>
            <span class="flex items-center gap-1.5"><Lock class="w-4 h-4" /> Your infra, your keys</span>
            <span class="flex items-center gap-1.5"><Terminal class="w-4 h-4" /> Open-source foundation</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center">What we do</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="s in services" :key="s.title" class="border border-foreground/10 rounded-xl p-6">
            <component :is="s.icon" class="w-6 h-6 mb-4" />
            <h3 class="font-bold mb-2">{{ s.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed mb-4">{{ s.desc }}</p>
            <ul class="space-y-1.5">
              <li v-for="p in s.points" :key="p" class="flex items-start gap-2 text-xs text-muted-foreground">
                <span class="text-primary mt-0.5 shrink-0">&#10003;</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagement phases -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">How an engagement runs</h2>
        <p class="text-sm text-muted-foreground mb-10 max-w-2xl">
          Fixed-scope start, verifiable checkpoints, and a handover that leaves everything in your
          repository — the same no-lock-in discipline the runtime is built on.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div v-for="ph in phases" :key="ph.n" class="border border-foreground/10 rounded-lg p-5 bg-background">
            <p class="text-xs font-mono text-muted-foreground mb-2">{{ ph.weeks }}</p>
            <p class="text-2xl font-black mb-2">{{ ph.n }}</p>
            <h3 class="font-bold text-sm mb-1.5">{{ ph.title }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ ph.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Formatho -->
    <section class="py-16 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">Why teams pick us</h2>
        <ul class="space-y-4 text-sm">
          <li class="flex gap-3"><Gauge class="w-5 h-5 shrink-0" /><span><strong>The reference implementation is public.</strong> The runtime your tools run on is open source with a three-dependency supply chain, an MCP Registry listing, and a security model written to be audited. Your security team reads the same code that runs in production.</span></li>
          <li class="flex gap-3"><ShieldCheck class="w-5 h-5 shrink-0" /><span><strong>Zero egress is structural, not contractual.</strong> The registry refuses tools that declare network, filesystem, or secret access — so "could a compromised tool exfiltrate?" has a testable answer: there is no channel.</span></li>
          <li class="flex gap-3"><FileSearch class="w-5 h-5 shrink-0" /><span><strong>Audit designed for review boards.</strong> Metadata-only logs (tool, key, duration, sizes) give compliance a trail while ensuring the log itself can never become the incident.</span></li>
          <li class="flex gap-3"><Terminal class="w-5 h-5 shrink-0" /><span><strong>Tool engineering at catalog scale.</strong> The free Formatho tool suite is the same discipline — 160+ deterministic, client-side tools — applied to the browser; engagements apply it to your systems.</span></li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-muted/30 border-b border-border/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">Frequently asked questions</h2>
        <div class="space-y-2">
          <details v-for="(f, i) in faqs" :key="i" class="group border border-border rounded-lg bg-background">
            <summary class="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between gap-4">
              {{ f.q }}
              <span class="text-muted-foreground transition-transform group-open:rotate-180">&#9662;</span>
            </summary>
            <p class="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center max-w-2xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">Start with the two-week assessment</h2>
        <p class="text-sm text-muted-foreground mb-6">
          You get a ranked agent-readiness roadmap for your internal systems — whether or not the
          engagement continues past it.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
          >
            Talk to Formatho Engineering <ArrowRight class="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/blogs/secure-ai-agent-stack-zero-data-egress"
            class="inline-flex items-center gap-2 px-8 py-3 border border-foreground/20 rounded-lg font-semibold hover:bg-muted transition-colors"
          >
            Read the approach
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
