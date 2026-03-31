<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTwins } from '@/composables/useTwins'
import CodeEditor from '@/components/CodeEditor.vue'

const { summonTwin } = useTwins()

// Tutorial steps
const currentStep = ref(0)
const isAnimating = ref(false)

const steps = [
  {
    id: 0,
    title: 'Welcome to Agent Orchestrator',
    description: 'Learn how to create and manage AI agents that work autonomously on your machine.',
    icon: '🏠',
    component: 'welcome'
  },
  {
    id: 1,
    title: 'Create Your First Agent',
    description: 'An agent is an AI worker with a specific role and capabilities.',
    icon: '🤖',
    component: 'create-agent'
  },
  {
    id: 2,
    title: 'Assign a Task',
    description: 'Give your agent work to do via the TODO queue.',
    icon: '📝',
    component: 'assign-task'
  },
  {
    id: 3,
    title: 'Monitor Progress',
    description: 'Watch your agent work in real-time through logs.',
    icon: '📊',
    component: 'monitor'
  },
  {
    id: 4,
    title: 'Review Results',
    description: 'Check completed work and iterate.',
    icon: '✅',
    component: 'review'
  }
]

// Agent creation simulation
const agentName = ref('')
const agentModel = ref('llama3.2')
const agentPrompt = ref('')
const agentCreated = ref(false)
const agentCreating = ref(false)

// Task assignment simulation
const taskTitle = ref('')
const taskDescription = ref('')
const taskAssigned = ref(false)
const taskAssigning = ref(false)

// Progress tracking
const progress = ref(0)
const logs = ref<string[]>([])
const taskComplete = ref(false)

// Computed
const currentStepData = computed(() => steps[currentStep.value])
const progressPercent = computed(() => ((currentStep.value + 1) / steps.length) * 100)

// Navigation
const nextStep = async () => {
  if (currentStep.value < steps.length - 1) {
    isAnimating.value = true
    setTimeout(() => {
      currentStep.value++
      isAnimating.value = false
    }, 300)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    isAnimating.value = true
    setTimeout(() => {
      currentStep.value--
      isAnimating.value = false
    }, 300)
  }
}

// Simulate agent creation
const createAgent = async () => {
  if (!agentName.value || !agentPrompt.value) return
  
  agentCreating.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  agentCreated.value = true
  agentCreating.value = false
}

// Simulate task assignment
const assignTask = async () => {
  if (!taskTitle.value) return
  
  taskAssigning.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  taskAssigned.value = true
  taskAssigning.value = false
  
  // Start progress simulation
  simulateProgress()
}

// Simulate agent working
const simulateProgress = () => {
  const interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval)
      taskComplete.value = true
      return
    }
    
    progress.value += Math.random() * 15
    if (progress.value > 100) progress.value = 100
    
    // Add random log entries
    const logMessages = [
      'Analyzing task requirements...',
      'Loading model context...',
      'Processing input data...',
      'Generating response...',
      'Validating output...',
      'Formatting results...'
    ]
    
    if (Math.random() > 0.5) {
      logs.value.push(logMessages[Math.floor(Math.random() * logMessages.length)])
    }
  }, 500)
}

// Reset tutorial
const resetTutorial = () => {
  currentStep.value = 0
  agentName.value = ''
  agentPrompt.value = ''
  agentCreated.value = false
  taskTitle.value = ''
  taskDescription.value = ''
  taskAssigned.value = false
  progress.value = 0
  logs.value = []
  taskComplete.value = false
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    nextStep()
  } else if (e.key === 'ArrowLeft') {
    prevStep()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Summon Halo on first visit to tutorial
  const hasVisitedTutorial = localStorage.getItem('formatho-tutorial-visited')
  if (!hasVisitedTutorial) {
    localStorage.setItem('formatho-tutorial-visited', 'true')
    summonTwin('halo', "Welcome to Formatho. Let's build something.", 'tutorial-first-visit', {
      x: 'center',
      y: 100
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
    <!-- Header -->
    <header class="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <RouterLink to="/" class="flex items-center gap-2">
              <img src="/logo.png" alt="Formatho" class="h-8 w-8 rounded-lg" />
              <span class="font-bold text-lg">Agent Orchestrator</span>
            </RouterLink>
            <span class="text-muted-foreground">|</span>
            <span class="text-sm text-muted-foreground">Interactive Tutorial</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="flex items-center gap-4">
            <div class="text-sm text-muted-foreground">
              Step {{ currentStep + 1 }} of {{ steps.length }}
            </div>
            <div class="w-48 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary transition-all duration-300 ease-out"
                :style="{ width: `${progressPercent}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Step Indicators -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-2">
          <template v-for="(step, index) in steps" :key="step.id">
            <Button
              @click="currentStep = index"
              :variant="currentStep === index ? 'default' : index < currentStep ? 'default' : 'outline'"
              size="icon"
              :class="[
                'w-12 h-12 rounded-full text-xl transition-all duration-300',
                currentStep === index ? 'scale-110 shadow-lg' : '',
                index < currentStep ? 'bg-green-500 text-white hover:bg-green-600' : ''
              ]"
            >
              <span v-if="index < currentStep">✓</span>
              <span v-else>{{ step.icon }}</span>
            </Button>
            <div 
              v-if="index < steps.length - 1"
              :class="[
                'w-12 h-1 rounded-full transition-all duration-300',
                index < currentStep ? 'bg-green-500' : 'bg-muted'
              ]"
            ></div>
          </template>
        </div>
      </div>

      <!-- Step Content -->
      <div 
        :class="[
          'max-w-4xl mx-auto transition-all duration-300',
          isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
        ]"
      >
        <!-- Welcome Step -->
        <div v-if="currentStep === 0" class="text-center space-y-8">
          <div class="text-8xl mb-6">🚀</div>
          <h1 class="text-4xl font-bold">Welcome to Agent Orchestrator</h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            In this interactive tutorial, you'll learn how to create AI agents that work autonomously on your machine.
          </p>
          
          <div class="grid md:grid-cols-3 gap-6 mt-12">
            <div class="p-6 rounded-xl bg-card border border-border">
              <div class="text-3xl mb-3">🤖</div>
              <h3 class="font-semibold mb-2">Create Agents</h3>
              <p class="text-sm text-muted-foreground">Define AI workers with specific roles and capabilities</p>
            </div>
            <div class="p-6 rounded-xl bg-card border border-border">
              <div class="text-3xl mb-3">📝</div>
              <h3 class="font-semibold mb-2">Assign Tasks</h3>
              <p class="text-sm text-muted-foreground">Add work to the TODO queue and let agents pick it up</p>
            </div>
            <div class="p-6 rounded-xl bg-card border border-border">
              <div class="text-3xl mb-3">📊</div>
              <h3 class="font-semibold mb-2">Monitor Progress</h3>
              <p class="text-sm text-muted-foreground">Watch agents work in real-time through live logs</p>
            </div>
          </div>
          
          <div class="pt-8">
            <Button
              @click="nextStep"
              size="lg"
              class="px-8 shadow-lg shadow-primary/20"
            >
              Start Tutorial
              <span class="ml-2">→</span>
            </Button>
          </div>
        </div>

        <!-- Create Agent Step -->
        <div v-else-if="currentStep === 1" class="space-y-8">
          <div class="text-center">
            <div class="text-6xl mb-4">🤖</div>
            <h1 class="text-3xl font-bold">Create Your First Agent</h1>
            <p class="text-muted-foreground mt-2">An agent is an AI worker with a specific role and capabilities.</p>
          </div>

          <div class="max-w-xl mx-auto">
            <div v-if="!agentCreated" class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-medium">Agent Name</label>
                <input
                  v-model="agentName"
                  type="text"
                  placeholder="e.g., research-assistant"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">Model</label>
                <select
                  v-model="agentModel"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="llama3.2">Llama 3.2 (Fast)</option>
                  <option value="qwen2.5:14b">Qwen 2.5 14B (Balanced)</option>
                  <option value="llama3.1:70b">Llama 3.1 70B (Powerful)</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">System Prompt</label>
                <CodeEditor
                  v-model="agentPrompt"
                  language="markdown"
                  class="min-h-[100px]"
                  placeholder="e.g., You are a research assistant. Help users find and summarize information."
                />
              </div>

              <Button
                @click="createAgent"
                :disabled="!agentName || !agentPrompt || agentCreating"
                class="w-full"
              >
                {{ agentCreating ? 'Creating...' : 'Create Agent' }}
              </Button>
            </div>

            <div v-else class="text-center space-y-4">
              <div class="text-6xl">✅</div>
              <h3 class="text-xl font-semibold">Agent Created!</h3>
              <div class="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-left">
                <p class="font-mono text-sm">
                  <span class="text-green-600">Name:</span> {{ agentName }}<br>
                  <span class="text-green-600">Model:</span> {{ agentModel }}<br>
                  <span class="text-green-600">Status:</span> <span class="text-yellow-600">idle</span>
                </p>
              </div>
              <p class="text-muted-foreground text-sm">
                Your agent is now ready to accept tasks!
              </p>
              <Button
                @click="nextStep"
              >
                Next: Assign a Task →
              </Button>
            </div>
          </div>
        </div>

        <!-- Assign Task Step -->
        <div v-else-if="currentStep === 2" class="space-y-8">
          <div class="text-center">
            <div class="text-6xl mb-4">📝</div>
            <h1 class="text-3xl font-bold">Assign a Task</h1>
            <p class="text-muted-foreground mt-2">Give your agent work to do via the TODO queue.</p>
          </div>

          <div class="max-w-xl mx-auto">
            <div v-if="!taskAssigned" class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-medium">Task Title</label>
                <input
                  v-model="taskTitle"
                  type="text"
                  placeholder="e.g., Research Formatho's privacy features"
                  class="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">Description (Optional)</label>
                <CodeEditor
                  v-model="taskDescription"
                  language="markdown"
                  class="min-h-[75px]"
                  placeholder="Add more details about what you want the agent to do..."
                />
              </div>

              <div class="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                <span class="text-2xl">🤖</span>
                <div>
                  <p class="text-sm font-medium">Assigned to:</p>
                  <p class="text-sm text-muted-foreground">{{ agentName || 'research-assistant' }}</p>
                </div>
              </div>

              <Button
                @click="assignTask"
                :disabled="!taskTitle || taskAssigning"
                class="w-full"
              >
                {{ taskAssigning ? 'Assigning...' : 'Assign Task' }}
              </Button>
            </div>

            <div v-else class="text-center space-y-4">
              <div class="text-6xl">✅</div>
              <h3 class="text-xl font-semibold">Task Assigned!</h3>
              <div class="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p class="font-mono text-sm text-left">
                  <span class="text-blue-600">Task:</span> {{ taskTitle }}<br>
                  <span class="text-blue-600">Agent:</span> {{ agentName || 'research-assistant' }}<br>
                  <span class="text-blue-600">Status:</span> <span class="text-yellow-600">pending</span>
                </p>
              </div>
              <Button
                @click="nextStep"
              >
                Next: Monitor Progress →
              </Button>
            </div>
          </div>
        </div>

        <!-- Monitor Step -->
        <div v-else-if="currentStep === 3" class="space-y-8">
          <div class="text-center">
            <div class="text-6xl mb-4">📊</div>
            <h1 class="text-3xl font-bold">Monitor Progress</h1>
            <p class="text-muted-foreground mt-2">Watch your agent work in real-time.</p>
          </div>

          <div class="max-w-2xl mx-auto space-y-6">
            <!-- Progress Bar -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Progress</span>
                <span>{{ Math.round(progress) }}%</span>
              </div>
              <div class="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex justify-center">
              <div 
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium',
                  taskComplete 
                    ? 'bg-green-500/20 text-green-600' 
                    : 'bg-yellow-500/20 text-yellow-600'
                ]"
              >
                {{ taskComplete ? '✓ Completed' : '⏳ Processing...' }}
              </div>
            </div>

            <!-- Logs -->
            <div class="rounded-lg border border-border bg-gray-900 p-4 font-mono text-sm">
              <div class="flex items-center gap-2 mb-3 text-gray-400">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="ml-2">Agent Logs</span>
              </div>
              <div class="space-y-1 text-gray-300 max-h-48 overflow-y-auto">
                <p v-if="logs.length === 0" class="text-gray-500">Waiting for agent to start...</p>
                <p v-for="(log, index) in logs" :key="index" class="animate-pulse">
                  <span class="text-green-400">[{{ new Date().toLocaleTimeString() }}]</span> {{ log }}
                </p>
                <p v-if="taskComplete" class="text-green-400">
                  ✓ Task completed successfully!
                </p>
              </div>
            </div>

            <Button
              v-if="taskComplete"
              @click="nextStep"
              class="w-full"
            >
              Next: Review Results →
            </Button>
          </div>
        </div>

        <!-- Review Step -->
        <div v-else-if="currentStep === 4" class="space-y-8 text-center">
          <div class="text-8xl mb-6">🎉</div>
          <h1 class="text-4xl font-bold">Tutorial Complete!</h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            You've learned the basics of Agent Orchestrator. Now you're ready to create your own AI workforce!
          </p>

          <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
            <div class="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h3 class="font-semibold text-green-600 mb-2">What You Learned</h3>
              <ul class="text-sm text-left space-y-2 text-muted-foreground">
                <li>✓ Create AI agents with specific roles</li>
                <li>✓ Assign tasks via TODO queue</li>
                <li>✓ Monitor agent progress in real-time</li>
                <li>✓ Review completed work</li>
              </ul>
            </div>
            <div class="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h3 class="font-semibold text-blue-600 mb-2">Next Steps</h3>
              <ul class="text-sm text-left space-y-2 text-muted-foreground">
                <li>→ Explore advanced agent configurations</li>
                <li>→ Enable skills for real-world tasks</li>
                <li>→ Set up scheduled cron jobs</li>
                <li>→ Build multi-agent workflows</li>
              </ul>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <RouterLink
              to="/agent-orchestrator"
              class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg"
            >
              Launch Agent Orchestrator
            </RouterLink>
            <Button
              @click="resetTutorial"
              variant="secondary"
            >
              Restart Tutorial
            </Button>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center max-w-4xl mx-auto mt-12 pt-8 border-t border-border">
        <Button
          @click="prevStep"
          :disabled="currentStep === 0"
          variant="ghost"
        >
          ← Previous
        </button>
        
        <div class="text-sm text-muted-foreground">
          Use ← → arrow keys to navigate
        </div>
        
        <button
          @click="nextStep"
          :disabled="currentStep === steps.length - 1"
          class="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
        >
          Next →
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
