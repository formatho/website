<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldCheck, Copy, Check, Network, Lock, ArrowRight, KeyRound } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DKMS Key Derivation Visualizer - Ritual Agents | Formatho',
  description: 'Visualize how Ritual Chain agents derive identity keys via DKMS (Decentralized Key Management). See the derivation chain from TEE-held master keys to agent-specific signing keys. Free, private, client-side.',
  keywords: ['dkms visualizer', 'ritual agent keys', 'decentralized key management', 'tee key derivation', 'agent identity keys', 'ritual chain dkms'],
  ogType: 'website'
})

const agentId = ref('my-agent-001')
const purpose = ref('signing')
const copied = ref('')

// DKMS derivation path visualization
const derivationSteps = computed(() => [
  {
    level: 0,
    title: 'TEE Master Root',
    subtitle: 'Hardware-protected seed',
    description: 'The root secret is generated inside a Trusted Execution Environment. It never leaves the enclave and is never exposed to the host OS or operator.',
    icon: Lock,
    key: '(sealed inside TEE)',
    color: 'bg-red-500/10 border-red-500/20'
  },
  {
    level: 1,
    title: 'Chain-derived Master',
    subtitle: 'DKMS precompile (0x081B)',
    description: `The master key is deterministically derived from the TEE root using the DKMS precompile. This key is chain-specific and tied to the Ritual network.`,
    icon: Network,
    key: `keccak256(tee_root ‖ "ritual-chain")`,
    color: 'bg-amber-500/10 border-amber-500/20'
  },
  {
    level: 2,
    title: `Agent Identity: ${agentId.value || 'agent-id'}`,
    subtitle: 'Agent-specific derivation',
    description: `Each agent gets its own keypair derived from the master using the agent ID as the derivation path. Two agents never share keys, even if managed by the same TEE.`,
    icon: KeyRound,
    key: `keccak256(master ‖ "${agentId.value || 'agent-id'}")`,
    color: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    level: 3,
    title: `Purpose Key: ${purpose.value}`,
    subtitle: 'Signing / encryption / auth',
    description: `The final key is derived for a specific purpose. Signing keys cannot be used for encryption, and vice versa — this separation is enforced by the derivation path.`,
    icon: ShieldCheck,
    key: `keccak256(agent_key ‖ "${purpose.value}")`,
    color: 'bg-green-500/10 border-green-500/20'
  }
])

const purposes = ['signing', 'encryption', 'authentication', 'payments', 'attestation']

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = ''), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><KeyRound class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">DKMS Key Derivation Visualizer</h1>
        <p class="text-sm text-muted-foreground">How Ritual agents derive identity keys — visual reference</p>
      </div>
    </div>

    <!-- Inputs -->
    <Card class="mb-6">
      <CardHeader><CardTitle class="text-lg">Derivation parameters</CardTitle></CardHeader>
      <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-muted-foreground mb-1 block">Agent ID</label>
          <Input v-model="agentId" class="font-mono text-sm" placeholder="my-agent-001" aria-label="Agent ID" />
          <p class="text-xs text-muted-foreground mt-1">The unique identifier for your agent on Ritual</p>
        </div>
        <div>
          <label class="text-sm font-medium text-muted-foreground mb-2 block">Key purpose</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="p in purposes" :key="p"
              class="no-btn-hover text-xs px-3 py-1.5 border rounded-full transition-colors"
              :class="purpose === p ? 'bg-primary/10 border-primary/40' : 'border-border hover:border-foreground/30'"
              @click="purpose = p">
              {{ p }}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Derivation chain -->
    <div class="space-y-0">
      <div v-for="(step, i) in derivationSteps" :key="i" class="relative">
        <!-- Connector arrow -->
        <div v-if="i > 0" class="flex justify-center py-2">
          <div class="flex flex-col items-center gap-1">
            <ArrowRight class="w-5 h-5 text-muted-foreground rotate-90" />
          </div>
        </div>

        <!-- Step card -->
        <div class="border rounded-xl p-5" :class="step.color">
          <div class="flex items-start gap-4">
            <div class="p-2.5 rounded-lg bg-background/50 shrink-0">
              <component :is="step.icon" class="w-5 h-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-muted-foreground">Level {{ step.level }}</span>
                <h3 class="text-base font-bold">{{ step.title }}</h3>
              </div>
              <p class="text-xs text-muted-foreground mb-2">{{ step.subtitle }}</p>
              <p class="text-sm text-muted-foreground leading-relaxed mb-3">{{ step.description }}</p>
              <div class="flex items-center justify-between gap-2 p-2 bg-background/70 border border-border/30 rounded-lg">
                <code class="text-xs font-mono text-foreground break-all">{{ step.key }}</code>
                <button class="no-btn-hover p-1 rounded hover:bg-muted shrink-0" aria-label="Copy derivation" @click="copy(step.key, 'step' + i)">
                  <Check v-if="copied === 'step' + i" class="w-3.5 h-3.5 text-green-600" /><Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security properties -->
    <Card class="mt-8">
      <CardHeader><CardTitle class="text-lg">Security properties</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div v-for="prop in [
          { title: 'Keys never leave the TEE', desc: 'All derivation happens inside the enclave. The host OS, operator, and even the Ritual Foundation cannot extract the private keys.' },
          { title: 'Deterministic derivation', desc: 'The same inputs always produce the same keys. If a TEE restarts, it regenerates the same keys from the sealed root — agents keep their identity across revivals.' },
          { title: 'Purpose isolation', desc: 'Signing keys, encryption keys, and authentication keys are derived with different paths. A compromised signing key cannot decrypt secrets.' },
          { title: 'Agent isolation', desc: 'Each agent derives from its own path. One compromised agent does not affect others, even if they share the same TEE.' },
        ]" :key="prop.title" class="flex items-start gap-3">
          <ShieldCheck class="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
          <div>
            <p class="text-sm font-medium">{{ prop.title }}</p>
            <p class="text-xs text-muted-foreground leading-relaxed mt-0.5">{{ prop.desc }}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
