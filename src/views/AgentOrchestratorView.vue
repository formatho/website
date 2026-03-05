<script setup lang="ts">
import {
  Bot,
  Cpu,
  Clock,
  ListTodo,
  Download,
  Github,
  Lock,
  Code
} from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Bot,
    title: 'Spin Up Agents with Text',
    description: 'Describe what you want in plain English. The orchestrator creates and configures agents automatically.'
  },
  {
    icon: ListTodo,
    title: 'Persistent TODO Queue',
    description: 'Agents work through tasks autonomously. TODOs survive restarts with SQLite persistence.'
  },
  {
    icon: Clock,
    title: 'Cron Scheduling',
    description: 'Schedule agents to run at specific times. Perfect for recurring reports and automation.'
  },
  {
    icon: Cpu,
    title: 'Multi-LLM Support',
    description: 'Configure different LLMs for different agents. Mix OpenAI, Anthropic, and local models.'
  },
  {
    icon: Lock,
    title: '100% Local-First',
    description: 'Your data stays on your machine. No cloud, no tracking, complete privacy.'
  },
  {
    icon: Code,
    title: 'Open Source Libraries',
    description: 'Built from modular Go libraries. Use them independently or as a complete system.'
  }
]

const libraries = [
  { name: 'go-llm-client', description: 'Unified LLM interface', stars: '0' },
  { name: 'go-agent-pool', description: 'Agent lifecycle management', stars: 'Coming' },
  { name: 'go-agent-skills', description: 'Skills with permissions', stars: 'Coming' },
  { name: 'go-todo-queue', description: 'Persistent TODO queue', stars: 'Coming' },
  { name: 'go-cron-agents', description: 'Cron scheduler', stars: 'Coming' },
  { name: 'go-agent-config', description: 'Configuration management', stars: 'Coming' }
]

const codeExample = `# Create an agent with just text
formatho create "Every morning at 9am, fetch sales
from Stripe API and email a PDF report to the team"

# That's it. The agent:
# - Parses your request
# - Creates necessary skills
# - Schedules the cron job
# - Starts working

# View all agents
formatho list

# Check agent TODOs
formatho todos <agent-id>

# Talk to an agent (optional)
formatho chat <agent-id>`
</script>

<template>
  <div class="flex flex-col h-full overflow-y-auto bg-background">
    <!-- Hero Section -->
    <section class="border-b border-border bg-gradient-to-b from-muted/20 via-muted/10 to-background">
      <div class="container mx-auto px-6 py-16 md:py-24">
        <div class="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <!-- Logo & Title -->
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-xl bg-primary/10">
              <Bot class="h-12 w-12 text-primary" />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
              Agent Orchestrator
            </h1>
          </div>

          <!-- Tagline -->
          <p class="text-xl md:text-2xl font-semibold text-foreground">
            Spin up AI workers. Let them run. Check results later.
          </p>

          <!-- Description -->
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl">
            A local-first desktop app for managing autonomous AI agents.
            Describe what you want in text, and agents work on it in the background.
            No cloud required.
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" class="text-sm">
              <Download class="h-3 w-3 mr-1" />
              Desktop App
            </Badge>
            <Badge variant="secondary" class="text-sm">
              <Lock class="h-3 w-3 mr-1" />
              100% Local
            </Badge>
            <Badge variant="secondary" class="text-sm">
              <Code class="h-3 w-3 mr-1" />
              Open Source
            </Badge>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-3 justify-center mt-4">
            <Button as="a" href="https://github.com/formatho/agent-orchestrator" target="_blank" size="lg">
              <Github class="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
            <Button variant="outline" size="lg" disabled>
              <Download class="h-4 w-4 mr-2" />
              Download (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-6 py-12 md:py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Key Features</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to run autonomous AI agents locally.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="feature in features" :key="feature.title" class="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-primary/10">
                <component :is="feature.icon" class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-lg">{{ feature.title }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="leading-relaxed">{{ feature.description }}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- How It Works -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-xl font-bold text-primary">1</div>
          <h3 class="font-semibold text-lg">Describe Your Task</h3>
          <p class="text-muted-foreground text-sm">Type what you want in plain English. The system understands context.</p>
        </div>
        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-xl font-bold text-primary">2</div>
          <h3 class="font-semibold text-lg">Agent Works</h3>
          <p class="text-muted-foreground text-sm">The agent breaks down your task into TODOs and works through them autonomously.</p>
        </div>
        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-xl font-bold text-primary">3</div>
          <h3 class="font-semibold text-lg">Check Results</h3>
          <p class="text-muted-foreground text-sm">Review completed work, provide feedback, or let the agent iterate.</p>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Simple CLI</h2>
        <p class="text-muted-foreground">Create and manage agents from your terminal</p>
      </div>

      <div class="max-w-2xl mx-auto">
        <Card class="bg-zinc-900 border-zinc-800">
          <CardContent class="p-4">
            <pre class="text-sm text-zinc-100 overflow-x-auto font-mono whitespace-pre-wrap">{{ codeExample }}</pre>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Libraries -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Modular Go Libraries</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Each component is a standalone library you can use independently.
          MIT licensed, production-ready.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <a
          v-for="lib in libraries"
          :key="lib.name"
          :href="`https://github.com/formatho/${lib.name}`"
          target="_blank"
          class="group"
        >
          <Card class="h-full hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <CardTitle class="text-base group-hover:text-primary transition-colors">
                  {{ lib.name }}
                </CardTitle>
                <Badge variant="outline" class="text-xs">{{ lib.stars }} ★</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription class="text-sm">{{ lib.description }}</CardDescription>
            </CardContent>
          </Card>
        </a>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-6 py-16 border-t border-border">
      <div class="text-center space-y-6">
        <h2 class="text-3xl font-bold tracking-tight">Ready to Automate?</h2>
        <p class="text-muted-foreground max-w-xl mx-auto">
          Agent Orchestrator is currently in development. Star the repo to follow progress
          or contribute to the open source libraries.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <Button as="a" href="https://github.com/formatho/agent-orchestrator" target="_blank" size="lg">
            <Github class="h-4 w-4 mr-2" />
            Star on GitHub
          </Button>
          <Button variant="outline" size="lg" as="a" href="https://github.com/formatho" target="_blank">
            View All Libraries
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
