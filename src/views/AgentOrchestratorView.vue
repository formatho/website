<script setup lang="ts">
import {
  Bot,
  Cpu,
  Clock,
  ListTodo,
  Download,
  Github,
  Lock,
  Code,
  LayoutDashboard,
  Calendar,
  FileText,
  Wand2,
  Settings,
  RefreshCw,
  MessageSquare,
  Database,
  Shield
} from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const coreFeatures = [
  {
    icon: LayoutDashboard,
    title: 'Desktop App (Electron)',
    description: 'Native desktop application with beautiful UI. Manage agents visually - no command line required. Works on macOS, Windows, and Linux.',
    status: 'In Development'
  },
  {
    icon: Wand2,
    title: 'Text-to-Agent Creation',
    description: 'Describe what you want in plain English. "Create an agent that emails me a daily report at 9am" and it just works.',
    status: 'Planned'
  },
  {
    icon: Bot,
    title: 'Agent Pool Management',
    description: 'Run multiple agents concurrently with resource limits. Create, pause, resume, and kill agents from the dashboard.',
    status: 'Planned'
  },
  {
    icon: ListTodo,
    title: 'Persistent TODO Queue',
    description: 'Agents work through tasks autonomously. TODOs survive restarts with SQLite persistence. Track progress in real-time.',
    status: 'Planned'
  },
  {
    icon: Calendar,
    title: 'Cron Scheduling',
    description: 'Schedule agents to run at specific times. Daily reports, weekly summaries, monthly audits - fully automated.',
    status: 'Planned'
  },
  {
    icon: Cpu,
    title: 'Multi-LLM Support',
    description: 'Configure different LLMs for different agents. Use GPT-4 for complex reasoning, Claude for writing, local models for speed.',
    status: 'In Development'
  },
  {
    icon: Settings,
    title: 'Skill System',
    description: 'Give agents real capabilities: file operations, web scraping, API calls, notifications. Sandbox with permissions.',
    status: 'Planned'
  },
  {
    icon: MessageSquare,
    title: 'Optional Chat Interface',
    description: 'Talk to agents when needed. Provide input, debug behavior, or just check in. Chat is optional - agents work in background.',
    status: 'Planned'
  },
  {
    icon: Lock,
    title: '100% Local-First',
    description: 'Your data stays on your machine. No cloud, no tracking, complete privacy. Works offline.',
    status: 'Core'
  }
]

const skills = [
  { name: 'file.read/write', description: 'Read and write local files' },
  { name: 'web.fetch/search', description: 'Scrape websites, search the web' },
  { name: 'shell.run', description: 'Execute shell commands (sandboxed)' },
  { name: 'http.get/post', description: 'Make HTTP requests to APIs' },
  { name: 'notify.desktop', description: 'Send desktop notifications' },
  { name: 'git.clone/push', description: 'Git operations' },
  { name: 'image.generate', description: 'Generate images (ComfyUI/DALL-E)' },
  { name: 'email.send', description: 'Send emails via SMTP' }
]

const libraries = [
  { name: 'go-llm-client', description: 'Unified LLM interface (OpenAI, Anthropic, Ollama)', status: 'In Development', stars: '0' },
  { name: 'go-agent-pool', description: 'Agent lifecycle & resource management', status: 'Planned', stars: '-' },
  { name: 'go-agent-skills', description: 'Skill system with permissions', status: 'Planned', stars: '-' },
  { name: 'go-todo-queue', description: 'Persistent TODO queue (SQLite)', status: 'Planned', stars: '-' },
  { name: 'go-cron-agents', description: 'Cron scheduler for agents', status: 'Planned', stars: '-' },
  { name: 'go-agent-config', description: 'YAML/JSON configuration', status: 'Planned', stars: '-' }
]

const roadmap = [
  { week: '1-2', title: 'Core Libraries', items: ['go-llm-client', 'go-agent-pool'] },
  { week: '3-4', title: 'Skills & Persistence', items: ['go-agent-skills', 'go-todo-queue'] },
  { week: '5', title: 'Scheduling', items: ['go-cron-agents', 'go-agent-config'] },
  { week: '6', title: 'Electron MVP', items: ['Desktop UI', 'Agent dashboard', 'TODO panel'] },
  { week: '7+', title: 'Launch', items: ['Public release', 'HN launch', 'Community'] }
]
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
            <div class="text-left">
              <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                Agent Orchestrator
              </h1>
              <p class="text-muted-foreground text-lg">by Formatho</p>
            </div>
          </div>

          <!-- Tagline -->
          <p class="text-xl md:text-2xl font-semibold text-foreground">
            Desktop app for managing autonomous AI agents
          </p>

          <!-- Description -->
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl">
            A local-first Electron application with beautiful UI. 
            Describe what you want, agents work in background, check results later.
            <strong>No command line required.</strong>
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" class="text-sm">
              <LayoutDashboard class="h-3 w-3 mr-1" />
              Electron Desktop App
            </Badge>
            <Badge variant="secondary" class="text-sm">
              <Lock class="h-3 w-3 mr-1" />
              100% Local
            </Badge>
            <Badge variant="secondary" class="text-sm">
              <Code class="h-3 w-3 mr-1" />
              Open Source
            </Badge>
            <Badge variant="secondary" class="text-sm">
              <Shield class="h-3 w-3 mr-1" />
              Privacy First
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

    <!-- Desktop App Preview -->
    <section class="container mx-auto px-6 py-12 md:py-16">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Desktop Application</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Manage AI agents from a beautiful native desktop UI. 
          No terminal needed - everything is visual and intuitive.
        </p>
      </div>

      <!-- Mock UI Preview -->
      <div class="max-w-4xl mx-auto">
        <Card class="overflow-hidden border-2">
          <div class="bg-muted/50 p-2 flex items-center gap-2 border-b">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="ml-4 text-sm text-muted-foreground">Agent Orchestrator</span>
          </div>
          <div class="grid grid-cols-4 min-h-[300px]">
            <!-- Sidebar -->
            <div class="bg-muted/30 border-r p-4 space-y-2">
              <div class="text-sm font-medium text-muted-foreground mb-4">Navigation</div>
              <div class="flex items-center gap-2 p-2 bg-primary/10 rounded text-sm">
                <Bot class="h-4 w-4" /> Agents
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm text-muted-foreground">
                <ListTodo class="h-4 w-4" /> TODOs
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm text-muted-foreground">
                <Calendar class="h-4 w-4" /> Schedule
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm text-muted-foreground">
                <Settings class="h-4 w-4" /> Settings
              </div>
            </div>
            <!-- Main Content -->
            <div class="col-span-3 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold">Active Agents</h3>
                <Button size="sm">+ New Agent</Button>
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-muted/50 rounded">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm">daily-report</div>
                    <div class="text-xs text-muted-foreground">Generates sales report at 9am daily</div>
                  </div>
                  <Badge variant="outline" class="text-xs">Running</Badge>
                </div>
                <div class="flex items-center gap-3 p-3 bg-muted/50 rounded">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm">code-reviewer</div>
                    <div class="text-xs text-muted-foreground">Reviews PRs on GitHub</div>
                  </div>
                  <Badge variant="outline" class="text-xs">Idle</Badge>
                </div>
                <div class="flex items-center gap-3 p-3 bg-muted/50 rounded">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm">email-summarizer</div>
                    <div class="text-xs text-muted-foreground">Summarizes inbox every morning</div>
                  </div>
                  <Badge variant="outline" class="text-xs">Scheduled</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <!-- All Planned Features -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Planned Features</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Everything we're building for the first release. Open source, community-driven.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="feature in coreFeatures" :key="feature.title" class="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary/10">
                  <component :is="feature.icon" class="h-5 w-5 text-primary" />
                </div>
                <CardTitle class="text-lg">{{ feature.title }}</CardTitle>
              </div>
              <Badge 
                :variant="feature.status === 'In Development' ? 'default' : feature.status === 'Core' ? 'secondary' : 'outline'" 
                class="text-xs"
              >
                {{ feature.status }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="leading-relaxed">{{ feature.description }}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Skills -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Built-in Skills</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Give agents real capabilities. All skills run with permission controls.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div v-for="skill in skills" :key="skill.name" class="p-4 border rounded-lg hover:border-primary/50 transition-colors">
          <div class="font-mono text-sm text-primary mb-1">{{ skill.name }}</div>
          <div class="text-xs text-muted-foreground">{{ skill.description }}</div>
        </div>
      </div>
    </section>

    <!-- Roadmap -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Development Roadmap</h2>
        <p class="text-muted-foreground">Building in public. Follow progress on GitHub.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        <div v-for="phase in roadmap" :key="phase.week" class="p-4 border rounded-lg">
          <div class="text-sm font-medium text-primary mb-2">Week {{ phase.week }}</div>
          <div class="font-semibold mb-2">{{ phase.title }}</div>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li v-for="item in phase.items" :key="item">• {{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Modular Libraries -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Modular Go Libraries</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Each component is a standalone Go library. Use them independently or as a complete system.
          MIT licensed.
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
                <CardTitle class="text-base group-hover:text-primary transition-colors font-mono">
                  {{ lib.name }}
                </CardTitle>
                <div class="flex items-center gap-2">
                  <Badge variant="outline" class="text-xs">{{ lib.status }}</Badge>
                  <Badge variant="secondary" class="text-xs">{{ lib.stars }} ★</Badge>
                </div>
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
          Agent Orchestrator is in active development. Star the repo to follow progress
          or contribute to the open source libraries.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <Button as="a" href="https://github.com/formatho/agent-orchestrator" target="_blank" size="lg">
            <Github class="h-4 w-4 mr-2" />
            Star on GitHub
          </Button>
          <Button variant="outline" size="lg" as="a" href="https://github.com/formatho" target="_blank">
            View Organization
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
