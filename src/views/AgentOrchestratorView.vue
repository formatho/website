<script setup lang="ts">
import {
  Bot,
  Cpu,
  ListTodo,
  Download,
  Github,
  Lock,
  Code,
  LayoutDashboard,
  Calendar,
  Wand2,
  Settings,
  MessageSquare,
  Shield,
  CheckCircle2
} from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const coreFeatures = [
  {
    icon: LayoutDashboard,
    title: 'Desktop App (Electron)',
    description: 'Native desktop application with beautiful dark theme UI. Manage agents visually - no command line required. Works on macOS, Windows, and Linux.',
    status: 'Complete'
  },
  {
    icon: Bot,
    title: 'Agent Pool Management',
    description: 'Run multiple agents concurrently with resource limits. Create, pause, resume, and kill agents from the dashboard. Full CRUD operations.',
    status: 'Complete'
  },
  {
    icon: ListTodo,
    title: 'Persistent TODO Queue',
    description: 'Agents work through tasks autonomously. TODOs survive restarts with SQLite persistence. Track progress in real-time with priorities.',
    status: 'Complete'
  },
  {
    icon: Calendar,
    title: 'Cron Scheduling',
    description: 'Schedule agents to run at specific times with cron syntax. Daily reports, weekly summaries, monthly audits - fully automated.',
    status: 'Complete'
  },
  {
    icon: Cpu,
    title: 'Multi-LLM Support',
    description: 'Configure different LLMs for different agents. Supports OpenAI, Anthropic, LM Studio, Ollama, and custom providers. Per-agent model selection.',
    status: 'Complete'
  },
  {
    icon: Settings,
    title: 'Skill System',
    description: 'Give agents real capabilities: file operations, web scraping, API calls, notifications. Fine-grained permissions system.',
    status: 'Complete'
  },
  {
    icon: Wand2,
    title: 'REST API + WebSocket',
    description: '44 REST API endpoints for full control. WebSocket for real-time updates. SQLite database for persistence.',
    status: 'Complete'
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
    description: 'Your data stays on your machine. No cloud, no tracking, complete privacy. Works offline with local LLMs.',
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
  { name: 'go-llm-client', description: 'Unified LLM interface (OpenAI, Anthropic, Ollama)', status: 'Complete', stars: '6.5k', lines: '6,479', tests: '92+' },
  { name: 'go-agent-pool', description: 'Agent lifecycle & resource management', status: 'Complete', stars: '-', lines: '1,511', tests: '21' },
  { name: 'go-agent-skills', description: 'Skill system with permissions', status: 'Complete', stars: '-', lines: '1,761', tests: '22' },
  { name: 'go-todo-queue', description: 'Persistent TODO queue (SQLite)', status: 'Complete', stars: '-', lines: '6,500', tests: '20+' },
  { name: 'go-cron-agents', description: 'Cron scheduler for agents', status: 'Complete', stars: '-', lines: '3,365', tests: '28' },
  { name: 'go-agent-config', description: 'YAML/TOML/JSON configuration', status: 'Complete', stars: '-', lines: '2,866', tests: '25' }
]

const stats = [
  { label: 'Lines of Code', value: '29,000+' },
  { label: 'Unit Tests', value: '200+' },
  { label: 'API Endpoints', value: '44' },
  { label: 'UI Components', value: '15+' },
  { label: 'Platforms', value: '3' },
  { label: 'LLM Providers', value: '4+' }
]

const downloads = [
  { 
    platform: 'macOS (Intel)', 
    icon: '🍎',
    arch: 'x64',
    format: 'DMG',
    size: '~150MB',
    available: true
  },
  { 
    platform: 'macOS (Apple Silicon)', 
    icon: '🍎',
    arch: 'arm64',
    format: 'DMG',
    size: '~150MB',
    available: true
  },
  { 
    platform: 'Windows', 
    icon: '🪟',
    arch: 'x64',
    format: 'EXE',
    size: '~140MB',
    available: true
  },
  { 
    platform: 'Linux', 
    icon: '🐧',
    arch: 'x64',
    format: 'AppImage',
    size: '~160MB',
    available: true
  }
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
            Manage agents, schedule tasks, and automate workflows.
            <strong>No command line required. 100% private.</strong>
          </p>

          <!-- Status Badges -->
          <div class="flex flex-wrap gap-2 justify-center">
            <Badge variant="default" class="text-sm bg-green-600 hover:bg-green-700">
              <CheckCircle2 class="h-3 w-3 mr-1" />
              v0.1.0 Released
            </Badge>
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
              Open Source (MIT)
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
            <Button variant="outline" size="lg" as="a" href="https://github.com/formatho/agent-orchestrator/releases" target="_blank">
              <Download class="h-4 w-4 mr-2" />
              Download v0.1.0
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="container mx-auto px-6 py-8 bg-muted/30 border-b">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
        <div v-for="stat in stats" :key="stat.label" class="text-center p-4">
          <div class="text-2xl md:text-3xl font-bold text-primary">{{ stat.value }}</div>
          <div class="text-xs md:text-sm text-muted-foreground">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Desktop App Preview -->
    <section class="container mx-auto px-6 py-12 md:py-16">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Desktop Application</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Manage AI agents from a beautiful native desktop UI with dark theme. 
          No terminal needed - everything is visual and intuitive.
        </p>
      </div>

      <!-- Mock UI Preview -->
      <div class="max-w-4xl mx-auto">
        <Card class="overflow-hidden border-2">
          <div class="bg-slate-900 p-2 flex items-center gap-2 border-b border-slate-700">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="ml-4 text-sm text-slate-400">Agent Orchestrator</span>
          </div>
          <div class="grid grid-cols-4 min-h-[300px] bg-slate-950">
            <!-- Sidebar -->
            <div class="bg-slate-900 border-r border-slate-700 p-4 space-y-2">
              <div class="text-sm font-medium text-slate-500 mb-4">Navigation</div>
              <div class="flex items-center gap-2 p-2 bg-blue-500/20 rounded text-sm text-blue-400">
                <Bot class="h-4 w-4" /> Agents
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-slate-800 rounded text-sm text-slate-400">
                <ListTodo class="h-4 w-4" /> TODOs
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-slate-800 rounded text-sm text-slate-400">
                <Calendar class="h-4 w-4" /> Schedule
              </div>
              <div class="flex items-center gap-2 p-2 hover:bg-slate-800 rounded text-sm text-slate-400">
                <Settings class="h-4 w-4" /> Settings
              </div>
            </div>
            <!-- Main Content -->
            <div class="col-span-3 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-white">Active Agents</h3>
                <Button size="sm" class="bg-blue-600 hover:bg-blue-700">+ New Agent</Button>
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm text-white">daily-report</div>
                    <div class="text-xs text-slate-400">Generates sales report at 9am daily</div>
                  </div>
                  <Badge variant="outline" class="text-xs border-green-500 text-green-400">Running</Badge>
                </div>
                <div class="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm text-white">code-reviewer</div>
                    <div class="text-xs text-slate-400">Reviews PRs on GitHub</div>
                  </div>
                  <Badge variant="outline" class="text-xs border-yellow-500 text-yellow-400">Idle</Badge>
                </div>
                <div class="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-800">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div class="flex-1">
                    <div class="font-medium text-sm text-white">email-summarizer</div>
                    <div class="text-xs text-slate-400">Summarizes inbox every morning</div>
                  </div>
                  <Badge variant="outline" class="text-xs border-blue-500 text-blue-400">Scheduled</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <!-- Downloads -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Download</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Available for macOS, Windows, and Linux. Self-contained applications with no external dependencies.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card v-for="download in downloads" :key="download.platform" class="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div class="text-4xl mb-2">{{ download.icon }}</div>
            <CardTitle class="text-lg">{{ download.platform }}</CardTitle>
            <CardDescription>{{ download.arch }} • {{ download.format }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-muted-foreground">{{ download.size }}</span>
              <Badge variant="secondary" class="text-xs">v0.1.0</Badge>
            </div>
            <Button 
              as="a" 
              href="https://github.com/formatho/agent-orchestrator/releases" 
              target="_blank" 
              class="w-full"
              :disabled="!download.available"
            >
              <Download class="h-4 w-4 mr-2" />
              Download
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- All Features -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Features</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage autonomous AI agents. Open source, community-driven.
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
                :variant="feature.status === 'Complete' ? 'default' : feature.status === 'Core' ? 'secondary' : 'outline'" 
                :class="feature.status === 'Complete' ? 'bg-green-600 hover:bg-green-700' : ''"
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

    <!-- Modular Libraries -->
    <section class="container mx-auto px-6 py-12 md:py-16 border-t border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Modular Go Libraries</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Each component is a standalone Go library. Use them independently or as a complete system.
          MIT licensed. 100% tested.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <a
          v-for="lib in libraries"
          :key="lib.name"
          :href="`https://github.com/formatho/${lib.name}`"
          target="_blank"
          class="group"
        >
          <Card class="h-full hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between mb-2">
                <CardTitle class="text-base group-hover:text-primary transition-colors font-mono">
                  {{ lib.name }}
                </CardTitle>
                <Badge 
                  variant="default" 
                  class="text-xs bg-green-600 hover:bg-green-700"
                >
                  Complete
                </Badge>
              </div>
              <div class="flex gap-2">
                <Badge variant="outline" class="text-xs">{{ lib.lines }} lines</Badge>
                <Badge variant="outline" class="text-xs">{{ lib.tests }} tests</Badge>
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
          Agent Orchestrator is released and ready to use. Star the repo, download the app,
          or contribute to the open source libraries.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <Button as="a" href="https://github.com/formatho/agent-orchestrator" target="_blank" size="lg">
            <Github class="h-4 w-4 mr-2" />
            Star on GitHub
          </Button>
          <Button variant="outline" size="lg" as="a" href="https://github.com/formatho/agent-orchestrator/releases" target="_blank">
            <Download class="h-4 w-4 mr-2" />
            Download Latest
          </Button>
          <Button variant="outline" size="lg" as="a" href="https://github.com/formatho" target="_blank">
            View Organization
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
