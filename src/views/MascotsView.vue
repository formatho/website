<script setup lang="ts">
// MascotsView.vue - Council of Agents Dashboard
// AgentGPT-style AI workspace with Bento Box grid layout
// Version: 2.0.0 - Complete UI Overhaul

import { ref, computed } from 'vue'
import { mascotSvgs, mascotMetadata, type MascotName } from '@/assets/mascot-assets'
import { useAgentCouncil } from '@/store/useAgentCouncil'
import AgentLog from '@/components/AgentLog.vue'

// Agent Council Store Integration
const council = useAgentCouncil()
const { isRunning, triggerCouncil, stopCouncil, isAgentActive, messageQueue, currentPhase } = council

// Command Center State
const workflowPrompt = ref('')
const isSubmitting = ref(false)

// Mascot Data
interface Mascot {
  name: string
  role: string
  description: string
  signatureLine: string
  color: string
  glowColor: string
  svgKey: MascotName
  textClass: string
  skills: string[]
  capabilities: string[]
}

const mascots: Mascot[] = [
  {
    name: 'Flowtho',
    role: 'Workflow Orchestrator',
    description: 'Guides users through complex workflows with clarity and precision.',
    signatureLine: '"Let\'s make this flow."',
    color: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    svgKey: 'flowtho',
    textClass: 'text-cyan-400',
    skills: mascotMetadata.flowtho.skills,
    capabilities: mascotMetadata.flowtho.capabilities
  },
  {
    name: 'Morpho',
    role: 'System Architect',
    description: 'Transforms ideas into fully-formed systems and code.',
    signatureLine: '"Let\'s morph this idea into a system."',
    color: 'orange',
    glowColor: 'rgba(234, 88, 12, 0.4)',
    svgKey: 'morpho',
    textClass: 'text-orange-400',
    skills: mascotMetadata.morpho.skills,
    capabilities: mascotMetadata.morpho.capabilities
  },
  {
    name: 'Memo',
    role: 'Context Manager',
    description: 'Stores knowledge and tracks history across all interactions.',
    signatureLine: '"I remember this."',
    color: 'amber',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    svgKey: 'memo',
    textClass: 'text-amber-400',
    skills: mascotMetadata.memo.skills,
    capabilities: mascotMetadata.memo.capabilities
  },
  {
    name: 'Nexo',
    role: 'Integration Specialist',
    description: 'Connects apps, syncs data, and bridges disparate systems.',
    signatureLine: '"Let\'s connect that."',
    color: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    svgKey: 'nexo',
    textClass: 'text-emerald-400',
    skills: mascotMetadata.nexo.skills,
    capabilities: mascotMetadata.nexo.capabilities
  },
  {
    name: 'Halo',
    role: 'User Success Guide',
    description: 'Guides new users through onboarding and product tours.',
    signatureLine: '"I\'ll guide you."',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    svgKey: 'halo',
    textClass: 'text-rose-400',
    skills: mascotMetadata.halo.skills,
    capabilities: mascotMetadata.halo.capabilities
  }
]

// Check if agent is active or thinking
const isThinking = (mascotKey: MascotName) => {
  return isAgentActive(mascotKey)
}

// Command Center Submit
const handleSubmit = async () => {
  if (!workflowPrompt.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  await triggerCouncil()
  
  // Clear input after simulation starts
  setTimeout(() => {
    workflowPrompt.value = ''
    isSubmitting.value = false
  }, 1000)
}

// Stop council
const handleStop = () => {
  stopCouncil()
  isSubmitting.value = false
}

// Phase label
const phaseLabel = computed(() => {
  const labels: Record<string, string> = {
    idle: 'Ready',
    planning: 'Planning',
    building: 'Building',
    connecting: 'Connecting',
    remembering: 'Processing',
    guiding: 'Guiding',
    complete: 'Complete',
    generate_task: 'Done'
  }
  return labels[currentPhase.value] || 'Ready'
})
</script>

<template>
  <div class="mascot-dashboard">
    <!-- Background Gradient -->
    <div class="dashboard-bg">
      <div class="bg-gradient-overlay"></div>
      <div class="bg-grid-pattern"></div>
      <div class="bg-glow bg-glow-1"></div>
      <div class="bg-glow bg-glow-2"></div>
    </div>

    <!-- Main Layout: Sidebar + Content -->
    <div class="dashboard-layout">
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <!-- Logo/Brand -->
        <div class="sidebar-header">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">Formatho</span>
            <span class="brand-subtitle">Agent Council</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <a href="#" class="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>Dashboard</span>
          </a>
          <a href="/tools" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <span>Tools</span>
          </a>
          <a href="/blogs" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>Documentation</span>
          </a>
        </nav>

        <!-- Agent Log (Moved from main content) -->
        <div class="sidebar-log">
          <div class="log-header">
            <div class="log-status">
              <span class="status-dot" :class="{ active: isRunning }"></span>
              <span>Council Log</span>
            </div>
            <span class="phase-badge">{{ phaseLabel }}</span>
          </div>
          
          <AgentLog />
        </div>

        <!-- Footer -->
        <div class="sidebar-footer">
          <a href="https://formatho.com" target="_blank" class="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>About Formatho</span>
          </a>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <!-- Command Center -->
        <section class="command-center">
          <h1 class="command-title">What workflow are we building today?</h1>
          <p class="command-subtitle">Describe your automation goal and the agent council will collaborate to design it.</p>
          
          <div class="command-input-wrapper">
            <div class="command-input-container">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <textarea
                v-model="workflowPrompt"
                placeholder="E.g., Build a system that monitors my inbox and creates tasks in Todoist..."
                class="command-input"
                rows="2"
                @keydown.enter.prevent="handleSubmit"
                :disabled="isRunning"
              ></textarea>
            </div>
            
            <div class="command-actions">
              <button
                v-if="!isRunning"
                @click="handleSubmit"
                :disabled="!workflowPrompt.trim()"
                class="submit-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <span>Start Council</span>
              </button>
              <button
                v-else
                @click="handleStop"
                class="stop-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="6" y="6" width="12" height="12" rx="2"/>
                </svg>
                <span>Stop</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Digital Twin Grid (Bento Box) -->
        <section class="agents-grid">
          <div class="grid-header">
            <h2>Digital Twin Council</h2>
            <span class="agent-count">5 Active Agents</span>
          </div>
          
          <div class="bento-grid">
            <!-- Flowtho - Large Card -->
            <div 
              class="agent-card card-large"
              :class="{ 'card-active': isThinking('flowtho') }"
              :style="{ '--agent-glow': 'rgba(6, 182, 212, 0.4)' }"
            >
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="agent-icon" v-html="mascotSvgs.flowtho"></div>
                <div class="agent-info">
                  <h3 class="agent-name text-cyan-400">Flowtho</h3>
                  <p class="agent-role">Workflow Orchestrator</p>
                  <p class="agent-desc">Guides users through complex workflows with clarity and precision.</p>
                </div>
                <div class="agent-skills">
                  <span class="skill-tag">Workflow Design</span>
                  <span class="skill-tag">Process Optimization</span>
                  <span class="skill-tag">User Onboarding</span>
                </div>
              </div>
              <div v-if="isThinking('flowtho')" class="thinking-indicator">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
              </div>
            </div>

            <!-- Morpho -->
            <div 
              class="agent-card"
              :class="{ 'card-active': isThinking('morpho') }"
              :style="{ '--agent-glow': 'rgba(234, 88, 12, 0.4)' }"
            >
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="agent-icon" v-html="mascotSvgs.morpho"></div>
                <div class="agent-info">
                  <h3 class="agent-name text-orange-400">Morpho</h3>
                  <p class="agent-role">System Architect</p>
                  <p class="agent-desc">Transforms ideas into fully-formed systems.</p>
                </div>
                <div class="agent-skills">
                  <span class="skill-tag">Code Gen</span>
                  <span class="skill-tag">Architecture</span>
                </div>
              </div>
              <div v-if="isThinking('morpho')" class="thinking-indicator">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
              </div>
            </div>

            <!-- Memo -->
            <div 
              class="agent-card"
              :class="{ 'card-active': isThinking('memo') }"
              :style="{ '--agent-glow': 'rgba(217, 119, 6, 0.4)' }"
            >
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="agent-icon" v-html="mascotSvgs.memo"></div>
                <div class="agent-info">
                  <h3 class="agent-name text-amber-400">Memo</h3>
                  <p class="agent-role">Context Manager</p>
                  <p class="agent-desc">Stores knowledge and tracks history.</p>
                </div>
                <div class="agent-skills">
                  <span class="skill-tag">Memory</span>
                  <span class="skill-tag">Context</span>
                </div>
              </div>
              <div v-if="isThinking('memo')" class="thinking-indicator">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
              </div>
            </div>

            <!-- Nexo -->
            <div 
              class="agent-card"
              :class="{ 'card-active': isThinking('nexo') }"
              :style="{ '--agent-glow': 'rgba(16, 185, 129, 0.4)' }"
            >
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="agent-icon" v-html="mascotSvgs.nexo"></div>
                <div class="agent-info">
                  <h3 class="agent-name text-emerald-400">Nexo</h3>
                  <p class="agent-role">Integration Specialist</p>
                  <p class="agent-desc">Connects apps and bridges systems.</p>
                </div>
                <div class="agent-skills">
                  <span class="skill-tag">APIs</span>
                  <span class="skill-tag">Sync</span>
                </div>
              </div>
              <div v-if="isThinking('nexo')" class="thinking-indicator">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
              </div>
            </div>

            <!-- Halo -->
            <div 
              class="agent-card"
              :class="{ 'card-active': isThinking('halo') }"
              :style="{ '--agent-glow': 'rgba(244, 63, 94, 0.4)' }"
            >
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="agent-icon" v-html="mascotSvgs.halo"></div>
                <div class="agent-info">
                  <h3 class="agent-name text-rose-400">Halo</h3>
                  <p class="agent-role">User Success Guide</p>
                  <p class="agent-desc">Guides new users through onboarding.</p>
                </div>
                <div class="agent-skills">
                  <span class="skill-tag">Onboarding</span>
                  <span class="skill-tag">Tours</span>
                </div>
              </div>
              <div v-if="isThinking('halo')" class="thinking-indicator">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   MASCOT DASHBOARD - Dark Theme AI Workspace
   AgentGPT-style UI with glassmorphism
   ============================================ */

/* Base Dashboard Container */
.mascot-dashboard {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Background Layers */
.dashboard-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d12 100%);
}

.bg-gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
}

.bg-grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: glow-drift 20s ease-in-out infinite;
}

.bg-glow-1 {
  top: -20%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
}

.bg-glow-2 {
  bottom: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%);
  animation-delay: -10s;
}

@keyframes glow-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

/* ============================================
   DASHBOARD LAYOUT - CSS Grid
   ============================================ */
.dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  gap: 0;
}

/* ============================================
   LEFT SIDEBAR
   ============================================ */
.sidebar {
  display: flex;
  flex-direction: column;
  background: rgba(15, 15, 20, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.5rem;
  gap: 1.5rem;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-icon svg {
  width: 22px;
  height: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: #64748b;
}

/* Sidebar Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.nav-item svg {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

.nav-item.active svg {
  opacity: 1;
}

/* Sidebar Log Section */
.sidebar-log {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
}

.log-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #64748b;
  transition: all 0.3s ease;
}

.status-dot.active {
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  animation: pulse-dot 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.phase-badge {
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Override AgentLog styling for sidebar */
.sidebar-log :deep(.agent-log) {
  background: rgba(20, 20, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  max-height: 400px;
}

/* Sidebar Footer */
.sidebar-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link svg {
  width: 14px;
  height: 14px;
}

.footer-link:hover {
  color: #94a3b8;
}

/* ============================================
   MAIN CONTENT AREA
   ============================================ */
.main-content {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  gap: 2.5rem;
  max-width: 1200px;
}

/* ============================================
   COMMAND CENTER
   ============================================ */
.command-center {
  text-align: center;
  padding: 2rem 0;
}

.command-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.command-subtitle {
  font-size: 1rem;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.command-input-wrapper {
  max-width: 700px;
  margin: 0 auto;
}

.command-input-container {
  position: relative;
  background: rgba(20, 20, 28, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.command-input-container:focus-within {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.3);
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.command-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  font-size: 0.9375rem;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
}

.command-input::placeholder {
  color: #475569;
}

.command-input:disabled {
  opacity: 0.6;
}

.command-actions {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  gap: 1rem;
}

.submit-btn,
.stop-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.submit-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn svg,
.stop-btn svg {
  width: 18px;
  height: 18px;
}

.stop-btn {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.stop-btn:hover {
  background: rgba(239, 68, 68, 0.25);
}

/* ============================================
   DIGITAL TWIN GRID - BENTO BOX
   ============================================ */
.agents-grid {
  flex: 1;
}

.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.grid-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.agent-count {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

/* Bento Grid Layout - 3 columns */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
}

/* Agent Cards with Glassmorphism */
.agent-card {
  position: relative;
  background: rgba(20, 20, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}

.agent-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

/* Large card for Flowtho */
.card-large {
  grid-column: span 2;
}

/* Card glow effect */
.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--agent-glow), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.agent-card:hover .card-glow,
.card-active .card-glow {
  opacity: 1;
}

/* Active card animation */
.card-active {
  border-color: var(--agent-glow);
  animation: card-pulse 1.5s ease-in-out infinite;
}

@keyframes card-pulse {
  0%, 100% { 
    box-shadow: 0 0 0 0 var(--agent-glow);
  }
  50% { 
    box-shadow: 0 0 30px 5px var(--agent-glow);
  }
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

/* Agent Icon */
.agent-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.agent-icon :deep(svg) {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px var(--agent-glow));
}

/* Agent Info */
.agent-info {
  flex: 1;
}

.agent-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  letter-spacing: -0.01em;
}

.agent-role {
  font-size: 0.8125rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.agent-desc {
  font-size: 0.8125rem;
  color: #94a3b8;
  line-height: 1.5;
}

/* Agent Skills */
.agent-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.skill-tag {
  font-size: 0.6875rem;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Thinking Indicator */
.thinking-indicator {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 4px;
}

.thinking-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--agent-glow);
  animation: dot-bounce 1.4s ease-in-out infinite;
}

.thinking-dot:nth-child(2) { animation-delay: 0.2s; }
.thinking-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

/* Large screens */
@media (max-width: 1200px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .card-large {
    grid-column: span 2;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
  
  .main-content {
    padding: 1.5rem;
  }
  
  .command-title {
    font-size: 1.75rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    gap: 2rem;
  }
  
  .command-center {
    padding: 1rem 0;
  }
  
  .command-title {
    font-size: 1.5rem;
  }
  
  .command-subtitle {
    font-size: 0.875rem;
  }
  
  .command-input-container {
    padding: 0.875rem 1rem;
  }
  
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .card-large {
    grid-column: span 1;
  }
  
  .agent-card {
    padding: 1rem;
  }
  
  .agent-icon {
    width: 48px;
    height: 48px;
  }
  
  .agent-name {
    font-size: 1rem;
  }
  
  .grid-header h2 {
    font-size: 1.125rem;
  }
  
  .submit-btn,
  .stop-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
}

/* Small mobile */
@media (max-width: 380px) {
  .command-title {
    font-size: 1.25rem;
  }
  
  .agent-skills {
    gap: 0.25rem;
  }
  
  .skill-tag {
    font-size: 0.625rem;
    padding: 0.2rem 0.5rem;
  }
}

/* ============================================
   SCROLLBAR STYLING
   ============================================ */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.5);
}
</style>
