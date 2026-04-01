<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const router = useRouter()
const route = useRoute()
const agentId = route.params.id
const agent = ref(null)
const stateHistory = ref([])
const isLoaded = ref(false)
const error = ref('')

// Fetch agent details from backend
async function fetchAgentDetails() {
  try {
    const response = await fetch(`http://localhost:18765/api/agents/${agentId}`)
    if (response.ok) {
      agent.value = await response.json()
      isLoaded.value = true
    } else {
      error.value = 'Agent not found'
    }
  } catch (err) {
    error.value = err.message
  }
}

// Fetch state history for the agent
async function fetchStateHistory() {
  try {
    const response = await fetch(`http://localhost:18765/api/agent-state/${agentId}/history?limit=20`)
    if (response.ok) {
      const data = await response.json()
      stateHistory.value = data.history || []
    }
  } catch (err) {
    console.error('Failed to fetch state history:', err)
  }
}

// Format timestamp for display
function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleString()
}

// Get version badge color based on version number
function getVersionColor(version) {
  const versions = stateHistory.value.length
  return version === versions ? '#2ecc71' : '#3498db'
}

// Navigate back to dashboard
function goBack() {
  router.push('/dashboard')
}

onMounted(() => {
  fetchAgentDetails()
  fetchStateHistory()
})
</script>

<template>
  <div class="agent-detail-view">
    <!-- Header -->
    <header class="detail-header">
      <Button @click="goBack" variant="outline" aria-label="Back to agents list">← Back to Dashboard</Button>
      <h1 v-if="agent">{{ agent.name }}</h1>
      <h1 v-else>Loading...</h1>
    </header>

    <!-- Error State -->
    <div v-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <!-- Loading State -->
    <div v-else-if="!isLoaded" class="loading-state">
      <p>Loading agent details...</p>
    </div>

    <!-- Agent Details -->
    <template v-else>
      <!-- Main Info Card -->
      <section class="info-card">
        <h2>📊 Agent Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Agent ID:</span>
            <span class="value">{{ agent.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">{{ agent.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Description:</span>
            <span class="value">{{ agent.description || 'No description' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Status:</span>
            <span class="status-badge" :class="agent.status">
              {{ agent.status || 'Unknown' }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">Created:</span>
            <span class="value">{{ formatTimestamp(agent.createdAt) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Last Run:</span>
            <span class="value">{{ agent.lastRun ? formatTimestamp(agent.lastRun) : 'Never' }}</span>
          </div>
        </div>
      </section>

      <!-- State History Card -->
      <section class="history-card">
        <h2>📋 State History ({{ stateHistory.length }} versions)</h2>
        
        <div v-if="stateHistory.length === 0" class="empty-history">
          <p>No state history available yet.</p>
        </div>

        <table v-else class="history-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Updated At</th>
              <th>State Data Preview</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(state, index) in stateHistory" :key="index">
              <td>
                <span class="version-badge" :style="{ backgroundColor: getVersionColor(state.version) }">
                  v{{ state.version }}
                </span>
              </td>
              <td>{{ formatTimestamp(state.updatedAt) }}</td>
              <td class="state-preview">{{ JSON.stringify(state.stateData).substring(0, 50) }}...</td>
              <td><span class="status-badge" :class="'active'">Saved</span></td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Action Buttons -->
      <section class="actions-card">
        <h2>⚙️ Actions</h2>
        <div class="action-buttons">
          <Button variant="outline" @click="exportState()" aria-label="Export agent state history">Export State History</Button>
          <Button variant="destructive" @click="deleteAgent()" aria-label="Delete this agent permanently">Delete Agent</Button>
        </div>
      </section>
    </template>

    <!-- Footer -->
    <footer class="detail-footer">
      <p>Formatho Agent Orchestrator - Building tools that make money 💰🚀</p>
    </footer>
  </div>
</template>

<style scoped>
.agent-detail-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e1e4e8;
}

.btn-back {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.detail-header h1 {
  flex-grow: 1;
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.error-state, .loading-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-state p { color: #e74c3c; font-weight: bold; }
.loading-state p { color: #7f8c8d; }

.info-card, .history-card, .actions-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.info-card h2, .history-card h2, .actions-card h2 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  color: #7f8c8d;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.value {
  color: #2c3e50;
  font-weight: 600;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.active { background-color: #d4edda; color: #155724; }
.status-badge.paused { background-color: #fff3cd; color: #856404; }
.status-badge.failed { background-color: #f8d7da; color: #721c24; }

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th, .history-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e1e4e8;
}

.history-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.version-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-size: 0.85rem;
  display: inline-block;
}

.state-preview {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-action {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-export { background-color: #9b59b6; color: white; }
.btn-delete { background-color: #e74c3c; color: white; }

.btn-action:hover { opacity: 0.9; transform: translateY(-1px); }

.detail-footer {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.empty-history {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}
</style>
