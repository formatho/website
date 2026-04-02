<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bot, Sparkles, Copy, RefreshCw, Shield } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'

// Large arrays for agent generation
const prefixes = [
  'Nexus', 'Cipher', 'Echo', 'Protocol', 'Quantum', 'Aether', 'Hyperion',
  'Chronos', 'Zephyr', 'Apex', 'Zenith', 'Vortex', 'Prism', 'Nebula',
  'Cipher-X', 'Neural', 'Synapse', 'Cortex', 'Stellar', 'Void', 'Astra',
  'Helix', 'Fusion', 'Delta', 'Gamma', 'Sigma', 'Omega', 'Alpha', 'Beta'
]

const roles = [
  'Senior Cloud Architect', 'Behavioral Psychologist', 'Rust Performance Engineer',
  'Creative Scriptwriter', 'Data Science Lead', 'DevOps Specialist',
  'UX Research Analyst', 'Machine Learning Engineer', 'Cybersecurity Expert',
  'Full-Stack Developer', 'Product Manager', 'Systems Administrator',
  'Blockchain Developer', 'AI Research Scientist', 'Database Administrator',
  'Network Security Engineer', 'Frontend Developer', 'Backend Developer',
  'Cloud Solutions Architect', 'DevSecOps Engineer', 'Mobile App Developer',
  'Game Developer', 'Data Engineer', 'ML Ops Engineer', 'SRE Engineer'
]

const traits = [
  'Meticulous & Pedantic', 'Highly Encouraging & Empathetic', 'Sarcastic yet Brilliant',
  'Concise & Direct', 'Analytical & Detail-Oriented', 'Creative & imaginative',
  'Patient & Understanding', 'Technical & Precise', 'Friendly & approachable',
  'Professional & Formal', 'Casual & Relaxed', 'Witty & Humorous',
  'Methodical & Structured', 'Innovative & Forward-Thinking', 'Calm & Composed',
  'Energetic & enthusiastic', 'Skeptical & questioning', 'Diplomatic & tactful'
]

const capabilities = [
  'debug complex software issues', 'optimize database performance',
  'design scalable cloud architecture', 'write clean, maintainable code',
  'analyze user behavior patterns', 'implement security best practices',
  'create intuitive user interfaces', 'deploy and manage CI/CD pipelines',
  'develop machine learning models', 'conduct code reviews',
  'solve performance bottlenecks', 'automate repetitive tasks',
  'provide technical mentorship', 'architect distributed systems',
  'integrate third-party APIs', 'build real-time applications',
  'optimize mobile app performance', 'conduct security audits',
  'implement data encryption', 'design microservices architecture'
]

const constraints = [
  'Never uses bullet points', 'Explains like I\'m five', 'Always provides code examples',
  'Uses military terminology', 'Always includes analogies', 'Prefers short, direct answers',
  'Uses technical jargon', 'Never uses contractions', 'Always provides step-by-step instructions',
  'Uses British English spelling', 'Includes relevant emojis', 'Never mentions AI or AI-related terms',
  'Always provides citations', 'Uses bullet points only', 'Responds in haiku format',
  'Always provides pros and cons', 'Uses historical references', 'Includes performance metrics',
  'Provides alternative solutions', 'Uses formal academic tone', 'Encourages critical thinking'
]

// State
const generatedAgent = ref<{
  name: string
  role: string
  trait: string
  capability: string
  constraint: string
  systemPrompt: string
} | null>(null)

const copySuccess = ref(false)
const isGenerating = ref(false)

// Generator function
const generateAgent = () => {
  isGenerating.value = true

  // Simulate generation animation
  setTimeout(() => {
    const selectedName = prefixes[Math.floor(Math.random() * prefixes.length)]
    const selectedRole = roles[Math.floor(Math.random() * roles.length)]
    const selectedTrait = traits[Math.floor(Math.random() * traits.length)]
    const selectedCapability = capabilities[Math.floor(Math.random() * capabilities.length)]
    const selectedConstraint = constraints[Math.floor(Math.random() * constraints.length)]

    // Construct system prompt
    const systemPrompt = `You are ${selectedName}, a ${selectedRole}. Your personality is ${selectedTrait}. Your primary goal is to help the user with ${selectedCapability}. When responding, you must follow these rules: ${selectedConstraint}.`

    generatedAgent.value = {
      name: selectedName,
      role: selectedRole,
      trait: selectedTrait,
      capability: selectedCapability,
      constraint: selectedConstraint,
      systemPrompt
    }

    isGenerating.value = false
  }, 300)
}

// Copy system prompt
const copySystemPrompt = async () => {
  if (!generatedAgent.value) return

  try {
    await navigator.clipboard.writeText(generatedAgent.value.systemPrompt)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = generatedAgent.value!.systemPrompt
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />
    
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">AI Agent Persona Generator</h1>
    </div>

    <!-- Privacy Notice -->
    <div class="glass-card p-4 text-center border-l-4 border-primary">
      <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span class="text-xl">🔒</span>
        <span class="font-medium">Privacy Check:</span>
        <span>This tool runs 100% in your browser. No data is sent to any AI service.</span>
      </div>
    </div>

    <!-- Initialize Button -->
    <div class="flex justify-center">
      <Button 
        size="lg" 
        @click="generateAgent" 
        :disabled="isGenerating"
        aria-label="Initialize new agent identity"
        class="px-8 py-6 text-lg gap-2"
      >
        <Sparkles class="h-5 w-5" />
        {{ isGenerating ? 'Initializing...' : 'Initialize New Agent' }}
      </Button>
    </div>

    <!-- Generated Result -->
    <div v-if="generatedAgent" class="flex-1 flex flex-col gap-6 min-h-0">
      <!-- Agent Profile -->
      <div class="glass-card p-6 border-2 border-primary/30">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot class="text-gray-900" />
          </div>
          <div>
            <h2 class="text-gray-900">{{ generatedAgent.name }}</h2>
            <p class="text-sm text-muted-foreground">{{ generatedAgent.role }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-1">
            <div class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Personality</div>
            <div class="text-sm font-medium">{{ generatedAgent.trait }}</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capability</div>
            <div class="text-sm font-medium">{{ generatedAgent.capability }}</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Constraint</div>
            <div class="text-sm font-medium">{{ generatedAgent.constraint }}</div>
          </div>
        </div>
      </div>

      <!-- System Prompt Box -->
      <div class="glass-card flex-1 flex flex-col min-h-0">
        <div class="flex items-center justify-between p-4 pb-3">
          <h3 class="text-sm font-medium">System Prompt</h3>
          <Button 
            variant="outline" 
            size="sm" 
            @click="copySystemPrompt"
            aria-label="Copy system prompt to clipboard"
            class="gap-2"
          >
            <Copy class="h-4 w-4" />
            {{ copySuccess ? 'Copied!' : 'Copy System Prompt' }}
          </Button>
        </div>
        <div class="flex-1 min-h-0 p-4 pt-0">
          <Textarea
            readonly
            :model-value="generatedAgent.systemPrompt"
            aria-label="Generated system prompt"
            class="h-full resize-none font-mono text-sm bg-muted/50"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="glass-card p-12 max-w-md text-center">
        <Bot class="text-gray-900" />
        <h3 class="text-xl font-bold mb-2">Ready to Generate</h3>
        <p class="text-sm text-muted-foreground">
          Click "Initialize New Agent" to create a unique AI persona with custom traits, capabilities, and system prompts.
        </p>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border">
      <h2 class="text-xl font-bold mb-4">Related Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/local-token-counter"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Local Token Counter</h3>
          <p class="text-sm text-muted-foreground">Count tokens for GPT-4o with 100% privacy</p>
        </a>
        <a
          href="/agent-orchestrator"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Agent Orchestrator</h3>
          <p class="text-sm text-muted-foreground">Manage and deploy AI agents locally</p>
        </a>
        <a
          href="/text-statistics"
          class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"
        >
          <h3 class="font-semibold mb-2">Text Statistics</h3>
          <p class="text-sm text-muted-foreground">Analyze text with detailed metrics</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
