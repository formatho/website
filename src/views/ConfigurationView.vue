<template>
  <div class="agent-config-view">
    <!-- Header -->
    <header class="config-header">
      <h1><Icon name="settings" /> Agent Configuration</h1>
      <p>Configure LLM endpoints, API keys, and agent behavior settings</p>
    </header>

    <!-- Main Content -->
    <div class="config-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading configuration...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <Icon name="alert-circle" />
        <p>{{ error }}</p>
        <button @click="loadConfig" class="retry-btn">Retry</button>
      </div>

      <!-- Configuration Form -->
      <div v-else class="config-form-wrapper">
        <!-- LLM Configuration Section -->
        <section class="config-section">
          <h2><Icon name="bot" /> LLM Settings</h2>
          
          <form @submit.prevent="saveConfig" class="config-form">
            <div class="form-group">
              <label for="llmProvider">LLM Provider</label>
              <select id="llmProvider" v-model="config.llm.provider" required>
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="ollama">Ollama (Local)</option>
                <option value="lmstudio">LM Studio</option>
              </select>
            </div>

            <div class="form-group">
              <label for="apiKey">API Key</label>
              <input 
                type="password" 
                id="apiKey" 
                v-model="config.llm.apiKey" 
                placeholder="Enter your API key"
              />
              <small>Required for cloud providers (OpenAI, Anthropic)</small>
            </div>

            <div class="form-group">
              <label for="baseUrl">Base URL</label>
              <input 
                type="url" 
                id="baseUrl" 
                v-model="config.llm.baseUrl" 
                placeholder="https://api.openai.com/v1"
              />
              <small>For custom endpoints or local servers</small>
            </div>

            <div class="form-group">
              <label for="model">Default Model</label>
              <input 
                type="text" 
                id="model" 
                v-model="config.llm.model" 
                placeholder="e.g., gpt-4, claude-3"
              />
            </div>

            <!-- Temperature Settings -->
            <div class="form-row">
              <div class="form-group">
                <label for="temperature">Temperature: {{ config.llm.temperature }}</label>
                <input 
                  type="range" 
                  id="temperature" 
                  v-model.number="config.llm.temperature" 
                  min="0" 
                  max="2" 
                  step="0.1"
                />
              </div>

              <div class="form-group">
                <label for="maxTokens">Max Tokens: {{ config.llm.maxTokens }}</label>
                <input 
                  type="number" 
                  id="maxTokens" 
                  v-model.number="config.llm.maxTokens" 
                  min="100" 
                  max="8192"
                />
              </div>
            </div>

            <!-- System Prompt -->
            <div class="form-group full-width">
              <label for="systemPrompt">System Prompt</label>
              <textarea 
                id="systemPrompt" 
                v-model="config.llm.systemPrompt" 
                rows="4"
                placeholder="Define the agent's behavior and personality..."
              ></textarea>
            </div>

            <!-- Test Connection -->
            <button type="button" @click="testLLMConnection" class="btn btn-secondary">
              <Icon name="wifi" /> Test LLM Connection
            </button>
            
            <p v-if="connectionStatus" :class="'status ' + connectionStatus.type">
              {{ connectionStatus.message }}
            </p>
          </form>
        </section>

        <!-- Agent Behavior Settings -->
        <section class="config-section">
          <h2><Icon name="settings-2" /> Agent Behavior</h2>
          
          <form @submit.prevent="saveConfig" class="config-form">
            <div class="form-group">
              <label for="maxConcurrentAgents">Maximum Concurrent Agents: {{ config.agent.maxConcurrentAgents }}</label>
              <input 
                type="range" 
                id="maxConcurrentAgents" 
                v-model.number="config.agent.maxConcurrentAgents" 
                min="1" 
                max="20" 
              />
            </div>

            <div class="form-group">
              <label for="heartbeatInterval">Heartbeat Interval (seconds): {{ config.agent.heartbeatInterval }}</label>
              <input 
                type="number" 
                id="heartbeatInterval" 
                v-model.number="config.agent.heartbeatInterval" 
                min="5" 
                max="300"
              />
            </div>

            <div class="form-group">
              <label for="retryAttempts">Retry Attempts: {{ config.agent.retryAttempts }}</label>
              <input 
                type="number" 
                id="retryAttempts" 
                v-model.number="config.agent.retryAttempts" 
                min="0" 
                max="10"
              />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="config.agent.autoStart" />
                Auto-start agents on creation
              </label>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.agent.logLevel === 'debug'"
                  @change="config.agent.logLevel = $event.target.checked ? 'debug' : 'info'"
                />
                Enable debug logging
              </label>
            </div>
          </form>
        </section>

        <!-- Storage Settings -->
        <section class="config-section">
          <h2><Icon name="database" /> Storage Configuration</h2>
          
          <form @submit.prevent="saveConfig" class="config-form">
            <div class="form-group">
              <label for="dataDir">Data Directory: {{ config.storage.dataDir }}</label>
              <input 
                type="text" 
                id="dataDir" 
                v-model="config.storage.dataDir" 
                placeholder="/var/lib/formatho/data"
              />
            </div>

            <div class="form-group">
              <label for="logRetentionDays">Log Retention (days): {{ config.storage.logRetentionDays }}</label>
              <input 
                type="number" 
                id="logRetentionDays" 
                v-model.number="config.storage.logRetentionDays" 
                min="1" 
                max="365"
              />
            </div>

            <div class="form-group">
              <label for="maxLogSize">Max Log Size (MB): {{ config.storage.maxLogSize }}</label>
              <input 
                type="number" 
                id="maxLogSize" 
                v-model.number="config.storage.maxLogSize" 
                min="10" 
                max="1024"
              />
            </div>

            <!-- Backup Settings -->
            <h3>Backup Settings</h3>
            <div class="form-group">
              <label for="backupInterval">Backup Interval (hours): {{ config.storage.backupIntervalHours }}</label>
              <input 
                type="number" 
                id="backupInterval" 
                v-model.number="config.storage.backupIntervalHours" 
                min="1" 
                max="720"
              />
            </div>

            <div class="form-group">
              <label for="maxBackups">Max Backups to Keep: {{ config.storage.maxBackups }}</label>
              <input 
                type="number" 
                id="maxBackups" 
                v-model.number="config.storage.maxBackups" 
                min="1" 
                max="50"
              />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="config.storage.autoBackup" />
                Enable automatic backups
              </label>
            </div>
          </form>
        </section>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button type="submit" form="configForm" @click="saveConfig" class="btn btn-primary">
            <Icon name="save" /> Save Configuration
          </button>
          <button type="button" @click="loadConfig" class="btn btn-secondary">
            <Icon name="refresh" /> Reset to Defaults
          </button>
        </div>

        <!-- Success Message -->
        <p v-if="successMessage" class="success-message">
          <Icon name="check-circle" /> {{ successMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import Icon from '../components/Icon.vue'

const router = useRouter()

// State
const loading = ref(true)
const error = ref<string | null>(null)
const successMessage = ref('')
const connectionStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

// Configuration state
interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'ollama' | 'lmstudio'
  apiKey: string
  baseUrl: string
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

interface AgentConfig {
  maxConcurrentAgents: number
  heartbeatInterval: number
  retryAttempts: number
  autoStart: boolean
  logLevel: 'info' | 'debug' | 'error'
}

interface StorageConfig {
  dataDir: string
  logRetentionDays: number
  maxLogSize: number
  backupIntervalHours: number
  maxBackups: number
  autoBackup: boolean
}

const config = ref({
  llm: {
    provider: 'openai' as LLMConfig['provider'],
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: 'You are a helpful AI assistant.'
  } as LLMConfig,
  agent: {
    maxConcurrentAgents: 5,
    heartbeatInterval: 30,
    retryAttempts: 3,
    autoStart: true,
    logLevel: 'info' as const
  } as AgentConfig,
  storage: {
    dataDir: '/var/lib/formatho/data',
    logRetentionDays: 30,
    maxLogSize: 100,
    backupIntervalHours: 24,
    maxBackups: 5,
    autoBackup: true
  } as StorageConfig
})

// Load configuration on mount
const loadConfig = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/config', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to load configuration')
    }
    
    config.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
}

// Save configuration
const saveConfig = async () => {
  try {
    const response = await fetch('/api/config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config.value)
    })
    
    if (!response.ok) {
      throw new Error('Failed to save configuration')
    }
    
    successMessage.value = 'Configuration saved successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
}

// Test LLM connection
const testLLMConnection = async () => {
  try {
    const response = await fetch('/api/config/test-llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config.value)
    })
    
    const result = await response.json()
    
    if (result.success) {
      connectionStatus.value = {
        type: 'success',
        message: `Connected successfully to ${result.provider}! Model: ${result.model}`
      }
    } else {
      connectionStatus.value = {
        type: 'error',
        message: result.error || 'Connection test failed'
      }
    }
  } catch (err) {
    connectionStatus.value = {
      type: 'error',
      message: err instanceof Error ? err.message : 'Network error'
    }
  }
}

// Reset to defaults
const resetToDefaults = () => {
  config.value = {
    llm: {
      provider: 'openai',
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o',
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt: 'You are a helpful AI assistant.'
    },
    agent: {
      maxConcurrentAgents: 5,
      heartbeatInterval: 30,
      retryAttempts: 3,
      autoStart: true,
      logLevel: 'info'
    },
    storage: {
      dataDir: '/var/lib/formatho/data',
      logRetentionDays: 30,
      maxLogSize: 100,
      backupIntervalHours: 24,
      maxBackups: 5,
      autoBackup: true
    }
  }
}

// Navigation handlers
const handleGoHome = () => {
  router.push('/')
}

const handleGoDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.agent-config-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.config-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.config-header h1 {
  font-size: 1.75rem;
  color: var(--color-text-primary);
  margin: 0;
}

.config-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Loading & Error States */
.loading-container,
.error-container {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Configuration Sections */
.config-section {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.config-section h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: var(--color-text-primary);
}

.config-section h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

/* Form Styles */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

label {
  font-weight: 600;
  color: var(--color-text-primary);
}

input[type="text"],
input[type="url"],
input[type="number"],
input[type="password"],
select,
textarea {
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--color-surface-secondary);
  color: var(--color-text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

small {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
}

.full-width {
  grid-column: 1 / -1;
}

/* Status Messages */
.status {
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
}

.status.success {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
}

.success-message {
  padding: 1rem;
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .agent-config-view {
    padding: 1rem;
  }
  
  .config-header h1 {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
