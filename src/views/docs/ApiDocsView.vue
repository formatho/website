<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// API Base URL for try-it functionality
const apiBaseUrl = ref('http://localhost:18765')
const authToken = ref('')

// Active endpoint for try-it
const activeEndpoint = ref<string | null>(null)
const responseOutput = ref('')
const isLoading = ref(false)

// Endpoint categories
const categories = [
  { id: 'agents', name: 'Agents', icon: '🤖' },
  { id: 'todos', name: 'TODOs', icon: '📋' },
  { id: 'cron', name: 'Cron Jobs', icon: '⏰' },
  { id: 'chat', name: 'Chat', icon: '💬' },
  { id: 'auth', name: 'Authentication', icon: '🔐' },
  { id: 'orgs', name: 'Organizations', icon: '🏢' },
  { id: 'teams', name: 'Teams', icon: '👥' },
  { id: 'state', name: 'State Persistence', icon: '💾' },
  { id: 'payments', name: 'Payments', icon: '💳' },
  { id: 'analytics', name: 'Analytics', icon: '📊' },
  { id: 'system', name: 'System', icon: '⚙️' }
]

const activeCategory = ref('agents')

// Endpoints data
const endpoints: Record<string, Array<{
  method: string
  path: string
  name: string
  description: string
  auth: boolean
  params?: Array<{ name: string; type: string; required: boolean; description: string }>
  body?: string
  response?: string
  example?: { code: string; lang: string }[]
}>> = {
  agents: [
    {
      method: 'GET',
      path: '/api/agents',
      name: 'List Agents',
      description: 'Retrieve all agents. Supports organization filtering via X-Organization-ID header.',
      auth: false,
      params: [],
      response: `[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Assistant",
    "type": "assistant",
    "status": "running",
    "config": { "model": "gpt-4", "temperature": 0.7 },
    "created_at": "2026-03-22T10:00:00Z"
  }
]`,
      example: [
        { code: `// JavaScript (Fetch)
const response = await fetch('http://localhost:18765/api/agents', {
  headers: {
    'Content-Type': 'application/json',
    ...(orgId && { 'X-Organization-ID': orgId })
  }
});
const agents = await response.json();`, lang: 'javascript' },
        { code: `# Python (requests)
import requests

headers = {'Content-Type': 'application/json'}
if org_id:
    headers['X-Organization-ID'] = org_id

response = requests.get('http://localhost:18765/api/agents', headers=headers)
agents = response.json()`, lang: 'python' },
        { code: `// Go (net/http)
req, _ := http.NewRequest("GET", "http://localhost:18765/api/agents", nil)
req.Header.Set("Content-Type", "application/json")
if orgID != "" {
    req.Header.Set("X-Organization-ID", orgID)
}
resp, _ := http.DefaultClient.Do(req)
// Parse response...`, lang: 'go' }
      ]
    },
    {
      method: 'POST',
      path: '/api/agents',
      name: 'Create Agent',
      description: 'Create a new AI agent with the specified configuration.',
      auth: false,
      body: `{
  "name": "My Assistant",
  "type": "assistant",
  "config": {
    "model": "gpt-4",
    "temperature": 0.7,
    "max_tokens": 2000,
    "system_prompt": "You are a helpful assistant."
  }
}`,
      response: `{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Assistant",
  "type": "assistant",
  "status": "idle",
  "config": { "model": "gpt-4", "temperature": 0.7 },
  "created_at": "2026-03-22T10:00:00Z"
}`,
      example: [
        { code: `// JavaScript (Fetch)
const response = await fetch('http://localhost:18765/api/agents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Assistant',
    type: 'assistant',
    config: {
      model: 'gpt-4',
      temperature: 0.7,
      system_prompt: 'You are helpful.'
    }
  })
});
const agent = await response.json();`, lang: 'javascript' },
        { code: `# Python (requests)
import requests

agent = requests.post('http://localhost:18765/api/agents', json={
    'name': 'My Assistant',
    'type': 'assistant',
    'config': {
        'model': 'gpt-4',
        'temperature': 0.7,
        'system_prompt': 'You are helpful.'
    }
}).json()`, lang: 'python' },
        { code: `// Go
payload := map[string]interface{}{
    "name": "My Assistant",
    "type": "assistant",
    "config": map[string]interface{}{
        "model": "gpt-4",
        "temperature": 0.7,
    },
}
body, _ := json.Marshal(payload)
req, _ := http.NewRequest("POST", "http://localhost:18765/api/agents", bytes.NewReader(body))
resp, _ := http.DefaultClient.Do(req)`, lang: 'go' }
      ]
    },
    {
      method: 'GET',
      path: '/api/agents/:id',
      name: 'Get Agent',
      description: 'Retrieve a single agent by ID.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ],
      response: `{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Assistant",
  "type": "assistant",
  "status": "running",
  "config": { "model": "gpt-4" },
  "created_at": "2026-03-22T10:00:00Z"
}`
    },
    {
      method: 'PUT',
      path: '/api/agents/:id',
      name: 'Update Agent',
      description: 'Update an existing agent\'s configuration.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ],
      body: `{
  "name": "Updated Name",
  "config": {
    "temperature": 0.9
  }
}`
    },
    {
      method: 'DELETE',
      path: '/api/agents/:id',
      name: 'Delete Agent',
      description: 'Delete an agent permanently.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ]
    },
    {
      method: 'POST',
      path: '/api/agents/:id/start',
      name: 'Start Agent',
      description: 'Start an agent to begin processing tasks.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ]
    },
    {
      method: 'POST',
      path: '/api/agents/:id/stop',
      name: 'Stop Agent',
      description: 'Stop a running agent.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ]
    },
    {
      method: 'GET',
      path: '/api/agents/:id/logs',
      name: 'Get Agent Logs',
      description: 'Retrieve logs for a specific agent.',
      auth: false,
      params: [
        { name: 'id', type: 'string (UUID)', required: true, description: 'The agent ID' }
      ],
      response: `[
  {
    "timestamp": "2026-03-22T10:05:00Z",
    "level": "info",
    "message": "Agent started successfully"
  }
]`
    }
  ],
  todos: [
    {
      method: 'GET',
      path: '/api/todos',
      name: 'List TODOs',
      description: 'Retrieve all TODO items.',
      auth: false,
      response: `[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Implement feature X",
    "status": "pending",
    "priority": "high",
    "created_at": "2026-03-22T10:00:00Z"
  }
]`,
      example: [
        { code: `// JavaScript
const todos = await fetch('http://localhost:18765/api/todos').then(r => r.json());`, lang: 'javascript' },
        { code: `# Python
todos = requests.get('http://localhost:18765/api/todos').json()`, lang: 'python' },
        { code: `// Go
resp, _ := http.Get("http://localhost:18765/api/todos")`, lang: 'go' }
      ]
    },
    {
      method: 'POST',
      path: '/api/todos',
      name: 'Create TODO',
      description: 'Create a new TODO item.',
      auth: false,
      body: `{
  "title": "New Task",
  "description": "Task description",
  "priority": "high",
  "agent_id": "550e8400-e29b-41d4-a716-446655440000"
}`
    },
    {
      method: 'PUT',
      path: '/api/todos/:id',
      name: 'Update TODO',
      description: 'Update a TODO item.',
      auth: false,
      body: `{
  "title": "Updated Task",
  "status": "in_progress",
  "priority": "critical"
}`
    },
    {
      method: 'POST',
      path: '/api/todos/:id/start',
      name: 'Start TODO',
      description: 'Mark a TODO as started.',
      auth: false
    },
    {
      method: 'POST',
      path: '/api/todos/:id/cancel',
      name: 'Cancel TODO',
      description: 'Cancel a TODO item.',
      auth: false
    }
  ],
  cron: [
    {
      method: 'GET',
      path: '/api/cron',
      name: 'List Cron Jobs',
      description: 'Retrieve all scheduled cron jobs.',
      auth: false,
      response: `[
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Daily Report",
    "schedule": "0 9 * * *",
    "status": "active",
    "next_run": "2026-03-23T09:00:00Z"
  }
]`
    },
    {
      method: 'POST',
      path: '/api/cron',
      name: 'Create Cron Job',
      description: 'Create a new scheduled cron job.',
      auth: false,
      body: `{
  "name": "Daily Report",
  "schedule": "0 9 * * *",
  "agent_id": "550e8400-e29b-41d4-a716-446655440000",
  "action": "generate_report"
}`
    },
    {
      method: 'GET',
      path: '/api/cron/:id/history',
      name: 'Get Job History',
      description: 'Retrieve execution history for a cron job.',
      auth: false
    }
  ],
  chat: [
    {
      method: 'GET',
      path: '/api/agents/:id/chat',
      name: 'Get Chat History',
      description: 'Retrieve chat history for an agent.',
      auth: false,
      response: `{
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": "2026-03-22T10:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help?",
      "timestamp": "2026-03-22T10:00:01Z"
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/api/agents/:id/chat',
      name: 'Send Message',
      description: 'Send a message to an agent.',
      auth: false,
      body: `{
  "message": "What's the weather today?",
  "context": {}
}`
    },
    {
      method: 'DELETE',
      path: '/api/agents/:id/chat',
      name: 'Clear History',
      description: 'Clear chat history for an agent.',
      auth: false
    }
  ],
  auth: [
    {
      method: 'POST',
      path: '/api/auth/login',
      name: 'Login',
      description: 'Authenticate and receive a JWT token.',
      auth: false,
      body: `{
  "email": "user@example.com",
  "password": "your-password"
}`,
      response: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}`,
      example: [
        { code: `// JavaScript
const { token } = await fetch('http://localhost:18765/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
}).then(r => r.json());

// Use token in subsequent requests
fetch('/api/agents', {
  headers: { 'Authorization': \`Bearer \${token}\` }
});`, lang: 'javascript' }
      ]
    },
    {
      method: 'POST',
      path: '/api/auth/logout',
      name: 'Logout',
      description: 'Invalidate the current session.',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/auth/refresh',
      name: 'Refresh Token',
      description: 'Refresh an expired JWT token.',
      auth: true,
      body: `{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`
    },
    {
      method: 'GET',
      path: '/api/auth/me',
      name: 'Current User',
      description: 'Get the currently authenticated user.',
      auth: true,
      response: `{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin"
}`
    }
  ],
  orgs: [
    {
      method: 'GET',
      path: '/api/organizations',
      name: 'List Organizations',
      description: 'Retrieve all organizations for the current user.',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/organizations',
      name: 'Create Organization',
      description: 'Create a new organization.',
      auth: true,
      body: `{
  "name": "My Company",
  "slug": "my-company"
}`
    },
    {
      method: 'GET',
      path: '/api/organizations/:id',
      name: 'Get Organization',
      description: 'Retrieve organization details.',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/organizations/:id/members',
      name: 'Invite Member',
      description: 'Invite a user to join the organization.',
      auth: true,
      body: `{
  "email": "newuser@example.com",
  "role": "member"
}`
    }
  ],
  teams: [
    {
      method: 'POST',
      path: '/api/team/invitations',
      name: 'Create Invitation',
      description: 'Create a team invitation.',
      auth: true,
      body: `{
  "email": "teammate@example.com",
  "role": "member",
  "organization_id": "550e8400-e29b-41d4-a716-446655440020"
}`
    },
    {
      method: 'POST',
      path: '/api/team/invitations/accept',
      name: 'Accept Invitation',
      description: 'Accept a team invitation.',
      auth: true,
      body: `{
  "token": "invitation-token-here"
}`
    },
    {
      method: 'GET',
      path: '/api/team/permissions/check',
      name: 'Check Permission',
      description: 'Check if user has a specific permission.',
      auth: true,
      params: [
        { name: 'permission', type: 'string', required: true, description: 'Permission to check' },
        { name: 'org_id', type: 'string', required: true, description: 'Organization ID' }
      ]
    }
  ],
  state: [
    {
      method: 'POST',
      path: '/api/agent-state',
      name: 'Save State',
      description: 'Save agent state data for persistence.',
      auth: false,
      body: `{
  "agent_id": "550e8400-e29b-41d4-a716-446655440000",
  "state_key": "conversation_context",
  "state_data": {
    "last_message": "Hello",
    "context": {}
  }
}`
    },
    {
      method: 'GET',
      path: '/api/agent-state/:agentID',
      name: 'Get Agent State',
      description: 'Retrieve current state for an agent.',
      auth: false,
      response: `{
  "agent_id": "550e8400-e29b-41d4-a716-446655440000",
  "states": {
    "conversation_context": {
      "last_message": "Hello",
      "context": {}
    }
  },
  "updated_at": "2026-03-22T10:00:00Z"
}`
    },
    {
      method: 'GET',
      path: '/api/agent-state/:agentID/history',
      name: 'Get State History',
      description: 'Retrieve state change history for an agent.',
      auth: false
    },
    {
      method: 'GET',
      path: '/api/agent-state/:agentID/export',
      name: 'Export State',
      description: 'Export agent state as JSON file.',
      auth: false
    },
    {
      method: 'GET',
      path: '/api/agent-state/metrics',
      name: 'Get State Metrics',
      description: 'Get storage metrics for agent states.',
      auth: false
    }
  ],
  payments: [
    {
      method: 'POST',
      path: '/api/stripe/checkout',
      name: 'Create Checkout Session',
      description: 'Create a Stripe checkout session for subscription.',
      auth: true,
      body: `{
  "price_id": "price_1234567890",
  "success_url": "https://yourapp.com/success",
  "cancel_url": "https://yourapp.com/cancel"
}`,
      response: `{
  "session_id": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/..."
}`
    },
    {
      method: 'POST',
      path: '/api/stripe/portal',
      name: 'Create Portal Session',
      description: 'Create a Stripe billing portal session.',
      auth: true,
      response: `{
  "url": "https://billing.stripe.com/p/..."
}`
    },
    {
      method: 'GET',
      path: '/api/stripe/subscription',
      name: 'Get Subscription Status',
      description: 'Get current subscription status.',
      auth: true,
      response: `{
  "status": "active",
  "plan": "pro",
  "current_period_end": "2026-04-22T00:00:00Z"
}`
    },
    {
      method: 'GET',
      path: '/api/stripe/pricing',
      name: 'Get Pricing',
      description: 'Get available pricing plans.',
      auth: false,
      response: `{
  "plans": [
    {
      "id": "free",
      "name": "Free",
      "price": 0,
      "features": ["5 agents", "Basic support"]
    },
    {
      "id": "pro",
      "name": "Pro",
      "price": 29,
      "features": ["Unlimited agents", "Priority support"]
    }
  ]
}`
    }
  ],
  analytics: [
    {
      method: 'POST',
      path: '/api/analytics/track',
      name: 'Track Event',
      description: 'Track an analytics event.',
      auth: false,
      body: `{
  "event": "page_view",
  "properties": {
    "page": "/pricing",
    "referrer": "https://google.com"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/analytics/track/pricing-view',
      name: 'Track Pricing View',
      description: 'Track when a user views the pricing page.',
      auth: false,
      body: `{
  "session_id": "user-session-id"
}`
    },
    {
      method: 'GET',
      path: '/api/analytics/funnel',
      name: 'Get Conversion Funnel',
      description: 'Get conversion funnel analytics.',
      auth: true,
      response: `{
  "steps": [
    { "name": "Landing", "count": 1000 },
    { "name": "Pricing View", "count": 500 },
    { "name": "Checkout Start", "count": 100 },
    { "name": "Checkout Success", "count": 50 }
  ]
}`
    },
    {
      method: 'GET',
      path: '/api/analytics/dashboard',
      name: 'Get Dashboard',
      description: 'Get analytics dashboard data.',
      auth: true
    }
  ],
  system: [
    {
      method: 'GET',
      path: '/health',
      name: 'Health Check',
      description: 'Check if the API is running.',
      auth: false,
      response: `{
  "status": "ok",
  "timestamp": "2026-03-22T10:00:00Z"
}`
    },
    {
      method: 'GET',
      path: '/api/system/status',
      name: 'System Status',
      description: 'Get detailed system status.',
      auth: false,
      response: `{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 86400,
  "agents": { "total": 10, "running": 3 },
  "todos": { "total": 50, "pending": 20 }
}`
    },
    {
      method: 'GET',
      path: '/api/config',
      name: 'Get Config',
      description: 'Get current system configuration.',
      auth: false,
      response: `{
  "llm": {
    "provider": "openai",
    "model": "gpt-4"
  }
}`
    },
    {
      method: 'PUT',
      path: '/api/config',
      name: 'Update Config',
      description: 'Update system configuration.',
      auth: false,
      body: `{
  "llm": {
    "provider": "anthropic",
    "model": "claude-3-opus"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/config/test-llm',
      name: 'Test LLM Connection',
      description: 'Test the LLM provider connection.',
      auth: false,
      body: `{
  "provider": "openai",
  "model": "gpt-4"
}`
    }
  ]
}

// Get method color
const getMethodColor = (method: string) => {
  const colors: Record<string, string> = {
    GET: 'bg-green-500/10 text-green-600 border-green-500/20',
    POST: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    PUT: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    PATCH: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    DELETE: 'bg-red-500/10 text-red-600 border-red-500/20'
  }
  return colors[method] || 'bg-gray-500/10 text-gray-600 border-gray-500/20'
}

// Filter endpoints by category
const filteredEndpoints = computed(() => endpoints[activeCategory.value] || [])

// Copy to clipboard
const copyCode = async (code: string) => {
  await navigator.clipboard.writeText(code)
}

// Try it functionality
const tryEndpoint = async (endpoint: typeof endpoints['agents'][0]) => {
  isLoading.value = true
  activeEndpoint.value = endpoint.path
  responseOutput.value = ''

  try {
    const url = `${apiBaseUrl.value}${endpoint.path.replace(':id', '550e8400-e29b-41d4-a716-446655440000').replace(':agentID', '550e8400-e29b-41d4-a716-446655440000').replace(':userId', '550e8400-e29b-41d4-a716-446655440010')}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    if (authToken.value) {
      headers['Authorization'] = `Bearer ${authToken.value}`
    }

    const options: RequestInit = {
      method: endpoint.method,
      headers
    }

    if (endpoint.body && (endpoint.method === 'POST' || endpoint.method === 'PUT' || endpoint.method === 'PATCH')) {
      options.body = endpoint.body
    }

    const response = await fetch(url, options)
    const data = await response.json()
    responseOutput.value = JSON.stringify(data, null, 2)
  } catch (error) {
    responseOutput.value = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Check for saved API URL
  const savedUrl = localStorage.getItem('api_base_url')
  if (savedUrl) {
    apiBaseUrl.value = savedUrl
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
    <!-- Header -->
    <div class="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p class="text-slate-400 mt-1">Agent Orchestrator REST API Reference</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-400">API URL:</span>
              <Input
                v-model="apiBaseUrl"
                aria-label="API base URL"
                class="w-64 bg-slate-800 border-slate-700"
                placeholder="http://localhost:18765"
              />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-400">Auth Token:</span>
              <Input
                v-model="authToken"
                type="password"
                aria-label="Authentication token"
                class="w-64 bg-slate-800 border-slate-700"
                placeholder="Optional JWT token"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- Sidebar Navigation -->
        <div class="col-span-3">
          <div class="sticky top-32 space-y-2">
            <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Endpoints
            </h2>
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :aria-label="'Navigate to ' + cat.name + ' endpoints'"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                activeCategory === cat.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              ]"
            >
              <span class="text-xl">{{ cat.icon }}</span>
              <span class="font-medium">{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <!-- Endpoint List -->
        <div class="col-span-9 space-y-6">
          <!-- Auth Warning Banner -->
          <div v-if="endpoints[activeCategory]?.some(e => e.auth) && !authToken" class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <span class="text-yellow-500 text-xl">⚠️</span>
              <div>
                <h4 class="font-semibold text-yellow-400">Authentication Required</h4>
                <p class="text-yellow-300/80 text-sm mt-1">
                  Some endpoints in this section require authentication. Add your JWT token above to use the "Try It" feature.
                </p>
              </div>
            </div>
          </div>

          <!-- Endpoints -->
          <Card
            v-for="endpoint in filteredEndpoints"
            :key="endpoint.path + endpoint.method"
            class="bg-slate-900/50 border-slate-800 overflow-hidden"
          >
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Badge :class="getMethodColor(endpoint.method)" class="font-mono text-xs">
                    {{ endpoint.method }}
                  </Badge>
                  <code class="text-sm text-slate-300 font-mono">{{ endpoint.path }}</code>
                  <Badge v-if="endpoint.auth" variant="outline" class="text-xs border-purple-500/30 text-purple-400">
                    🔒 Auth Required
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  @click="tryEndpoint(endpoint)"
                  :disabled="isLoading"
                  aria-label="Try endpoint"
                  class="border-slate-700 hover:bg-slate-800"
                >
                  {{ isLoading && activeEndpoint === endpoint.path ? 'Loading...' : 'Try It' }}
                </Button>
              </div>
              <CardTitle class="text-lg mt-3">{{ endpoint.name }}</CardTitle>
              <CardDescription>{{ endpoint.description }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Parameters -->
              <div v-if="endpoint.params?.length" class="space-y-2">
                <h4 class="text-sm font-semibold text-slate-300">Parameters</h4>
                <div class="bg-slate-800/50 rounded-lg p-4 space-y-2">
                  <div v-for="param in endpoint.params" :key="param.name" class="flex items-start gap-4 text-sm">
                    <code class="text-blue-400 min-w-[150px]">{{ param.name }}</code>
                    <span class="text-slate-400">{{ param.type }}</span>
                    <span v-if="param.required" class="text-red-400 text-xs">required</span>
                    <span class="text-slate-400 flex-1">{{ param.description }}</span>
                  </div>
                </div>
              </div>

              <!-- Request Body -->
              <div v-if="endpoint.body" class="space-y-2">
                <h4 class="text-sm font-semibold text-slate-300">Request Body</h4>
                <div class="relative">
                  <pre class="bg-slate-800/50 rounded-lg p-4 overflow-x-auto text-sm"><code class="text-slate-300">{{ endpoint.body }}</code></pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    class="absolute top-2 right-2 h-8 w-8 p-0"
                    @click="copyCode(endpoint.body)"
                    aria-label="Copy request body code"
                  >
                    📋
                  </Button>
                </div>
              </div>

              <!-- Response -->
              <div v-if="endpoint.response" class="space-y-2">
                <h4 class="text-sm font-semibold text-slate-300">Response</h4>
                <pre class="bg-slate-800/50 rounded-lg p-4 overflow-x-auto text-sm"><code class="text-green-400">{{ endpoint.response }}</code></pre>
              </div>

              <!-- Code Examples -->
              <div v-if="endpoint.example?.length" class="space-y-2">
                <h4 class="text-sm font-semibold text-slate-300">Code Examples</h4>
                <Tabs default-value="javascript" class="w-full">
                  <TabsList class="bg-slate-800/50">
                    <TabsTrigger value="javascript" class="data-[state=active]:bg-slate-700">JavaScript</TabsTrigger>
                    <TabsTrigger value="python" class="data-[state=active]:bg-slate-700">Python</TabsTrigger>
                    <TabsTrigger value="go" class="data-[state=active]:bg-slate-700">Go</TabsTrigger>
                  </TabsList>
                  <TabsContent v-for="ex in endpoint.example" :key="ex.lang" :value="ex.lang">
                    <div class="relative">
                      <pre class="bg-slate-800/50 rounded-lg p-4 overflow-x-auto text-sm"><code class="text-slate-300">{{ ex.code }}</code></pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        class="absolute top-2 right-2 h-8 w-8 p-0"
                        @click="copyCode(ex.code)"
                        aria-label="Copy code example"
                      >
                        📋
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <!-- Try It Response -->
              <div v-if="activeEndpoint === endpoint.path && responseOutput" class="space-y-2">
                <h4 class="text-sm font-semibold text-slate-300">Response</h4>
                <pre class="bg-slate-800/50 rounded-lg p-4 overflow-x-auto text-sm max-h-64"><code :class="responseOutput.startsWith('Error') ? 'text-red-400' : 'text-green-400'">{{ responseOutput }}</code></pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
