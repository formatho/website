<script setup lang="ts">
// MascotsView.vue - Council of Agents UI
// Pentagonal layout with interactive agent nodes

import { ref } from 'vue'
import { mascotSvgs, mascotMetadata, type MascotName } from '@/assets/mascot-assets'
import { useAgentCouncil } from '@/store/useAgentCouncil'
import AgentLog from '@/components/AgentLog.vue'

// Agent Council Store Integration
const council = useAgentCouncil()
const { isRunning, triggerCouncil, stopCouncil, isAgentActive } = council

// Local state for manual selection
const selectedAgent = ref<MascotName | null>(null)

// Mascot Data
interface Mascot {
  name: string
  role: string
  traits: string[]
  description: string
  signatureLine: string
  color: string
  glowColor: string
  svgKey: MascotName
  textClass: string
  skills?: string[]
  capabilities?: string[]
}

const mascots: Mascot[] = [
  {
    name: 'Flowtho',
    role: 'The Guide (Peacock)',
    traits: ['Calm', 'Intelligent'],
    description: 'An elegant peacock that helps users flow through workflows with ease and clarity.',
    signatureLine: '"Let\'s make this flow."',
    color: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    svgKey: 'flowtho',
    textClass: 'text-cyan-400',
    skills: mascotMetadata.flowtho.skills,
    capabilities: mascotMetadata.flowtho.capabilities
  },
  {
    name: 'Morpho',
    role: 'The Builder (Fox)',
    traits: ['Creative', 'Structured'],
    description: 'A clever fox that transforms prompts into fully-formed workflows and systems.',
    signatureLine: '"Let\'s morph this idea into a system."',
    color: 'orange',
    glowColor: 'rgba(234, 88, 12, 0.3)',
    svgKey: 'morpho',
    textClass: 'text-orange-400',
    skills: mascotMetadata.morpho.skills,
    capabilities: mascotMetadata.morpho.capabilities
  },
  {
    name: 'Memo',
    role: 'The Memory Keeper (Elephant)',
    traits: ['Organized', 'Observant'],
    description: 'A wise elephant that stores knowledge and tracks history across all interactions.',
    signatureLine: '"I remember this."',
    color: 'amber',
    glowColor: 'rgba(217, 119, 6, 0.3)',
    svgKey: 'memo',
    textClass: 'text-amber-400',
    skills: mascotMetadata.memo.skills,
    capabilities: mascotMetadata.memo.capabilities
  },
  {
    name: 'Nexo',
    role: 'The Connector (Crane)',
    traits: ['Social', 'Technical'],
    description: 'A graceful crane that connects apps, syncs data, and bridges disparate systems.',
    signatureLine: '"Let\'s connect that."',
    color: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    svgKey: 'nexo',
    textClass: 'text-emerald-400',
    skills: mascotMetadata.nexo.skills,
    capabilities: mascotMetadata.nexo.capabilities
  },
  {
    name: 'Halo',
    role: 'The Onboarding Guide (Dove)',
    traits: ['Friendly', 'Welcoming'],
    description: 'A peaceful dove that guides new users through product tours and initial setup.',
    signatureLine: '"I\'ll guide you."',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    svgKey: 'halo',
    textClass: 'text-rose-400',
    skills: mascotMetadata.halo.skills,
    capabilities: mascotMetadata.halo.capabilities
  }
]

// Agent Interaction Handlers
const selectAgent = (mascotKey: MascotName) => {
  if (isRunning.value) return
  selectedAgent.value = mascotKey
}

const isSelected = (mascotKey: MascotName) => {
  return selectedAgent.value === mascotKey || isAgentActive(mascotKey)
}

const isThinking = (mascotKey: MascotName) => {
  return isAgentActive(mascotKey)
}

const handleCouncilToggle = async () => {
  if (isRunning.value) {
    stopCouncil()
  } else {
    selectedAgent.value = null
    await triggerCouncil()
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border/50">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 py-20 md:py-32 relative">
        <div class="max-w-4xl mx-auto">
          <div class="glass-card p-12 md:p-16 text-center" data-aos="fade-up" data-aos-duration="600">
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
              <span class="gradient-text">Council of Agents</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
              Five digital twins. One orchestration OS.
            </p>
            
            <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pentagonal Council Layout -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up" data-aos-duration="600">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">The Agent Council</h2>
          <p class="text-muted-foreground max-w-xl mx-auto mb-6">
            Click any agent to explore, or start the council to see agents collaborate.
          </p>
          
          <!-- Council Control Button -->
          <button
            @click="handleCouncilToggle"
            class="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            :class="[
              isRunning 
                ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30' 
                : 'bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30'
            ]"
          >
            <span v-if="isRunning" class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Stop Council
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Council
            </span>
          </button>
        </div>

        <!-- Council Grid + Log Panel -->
        <div class="flex flex-col lg:flex-row gap-8 items-start">
          <!-- Pentagonal Grid -->
          <div class="flex-1 w-full">
            <div class="pentagonal-council">
              <div
                v-for="(mascot, index) in mascots"
                :key="mascot.name"
                class="council-node"
                :class="[
                  `council-node-${index + 1}`,
                  { 'node-selected': isSelected(mascot.svgKey) },
                  { 'node-thinking': isThinking(mascot.svgKey) }
                ]"
                @click="selectAgent(mascot.svgKey)"
                data-aos="fade-up"
                data-aos-duration="600"
                :data-aos-delay="100 + (index * 100)"
              >
                <div
                  class="agent-orb"
                  :style="{ 
                    '--agent-glow': mascot.glowColor,
                    '--agent-color': mascot.color
                  }"
                >
                  <div class="orb-glow"></div>
                  <div class="orb-content" v-html="mascotSvgs[mascot.svgKey]"></div>
                  <div v-if="isThinking(mascot.svgKey)" class="thinking-indicator">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                  </div>
                </div>
                
                <div class="agent-info">
                  <h3 class="text-lg font-bold">{{ mascot.name }}</h3>
                  <p :class="[mascot.textClass, 'text-sm font-medium']">{{ mascot.role }}</p>
                  <div v-if="isSelected(mascot.svgKey)" class="skills-container">
                    <span v-for="skill in mascot.skills" :key="skill" class="skill-tag">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Fallback -->
            <div class="mobile-council md:hidden">
              <div
                v-for="(mascot, index) in mascots"
                :key="mascot.name"
                class="mobile-node glass-card p-6"
                :class="{ 'node-selected': isSelected(mascot.svgKey) }"
                @click="selectAgent(mascot.svgKey)"
                data-aos="fade-up"
                data-aos-duration="600"
                :data-aos-delay="100 + (index * 50)"
              >
                <div class="flex items-center gap-4">
                  <div 
                    class="w-16 h-16 rounded-xl flex items-center justify-center"
                    :style="{ 
                      background: `linear-gradient(135deg, ${mascot.glowColor.replace('0.3', '0.2')}, ${mascot.glowColor.replace('0.3', '0.1')})`,
                      boxShadow: `0 0 30px ${mascot.glowColor}`
                    }"
                    v-html="mascotSvgs[mascot.svgKey]"
                  ></div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold">{{ mascot.name }}</h3>
                    <p :class="[mascot.textClass, 'text-sm']">{{ mascot.role }}</p>
                  </div>
                </div>
                
                <div v-if="isSelected(mascot.svgKey)" class="mt-4 pt-4 border-t border-border/50">
                  <p class="text-muted-foreground text-sm mb-3">{{ mascot.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in mascot.skills" :key="skill" class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">{{ skill }}</span>
                  </div>
                  <p class="mt-3 text-sm italic" :class="mascot.textClass">{{ mascot.signatureLine }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Agent Log Panel (Desktop) -->
          <div class="hidden lg:block lg:w-80">
            <AgentLog />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Pentagonal Council Layout */
.pentagonal-council {
  display: none;
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 700px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .pentagonal-council {
    display: block;
  }
}

.mobile-council {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .mobile-council {
    display: none;
  }
}

.council-node {
  position: absolute;
  width: 140px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.council-node-1 { top: 0%; left: 50%; transform: translateX(-50%); }
.council-node-2 { top: 38%; left: 5%; }
.council-node-3 { top: 38%; right: 5%; }
.council-node-4 { top: 75%; left: 18%; }
.council-node-5 { top: 75%; right: 18%; }

.council-node:hover {
  transform: scale(1.08);
  z-index: 10;
}

.council-node-1:hover { transform: translateX(-50%) scale(1.08); }

.agent-orb {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%);
  transition: all 0.3s ease;
}

.orb-glow {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--agent-glow) 0%, transparent 70%);
  opacity: 0.5;
  transition: all 0.3s ease;
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.orb-content {
  width: 70%;
  height: 70%;
  position: relative;
  z-index: 1;
}

:deep(.orb-content svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.node-selected .agent-orb {
  transform: scale(1.1);
}

.node-selected .orb-glow {
  opacity: 1;
  animation: selected-glow 1.5s ease-in-out infinite;
}

@keyframes selected-glow {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

.node-thinking .orb-glow {
  animation: thinking-pulse 0.6s ease-in-out infinite;
}

@keyframes thinking-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.thinking-indicator {
  position: absolute;
  bottom: -20px;
  display: flex;
  gap: 6px;
}

.thinking-dot {
  width: 8px;
  height: 8px;
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

.agent-info {
  text-align: center;
  margin-top: 1rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-top: 8px;
  animation: skills-fade-in 0.3s ease;
}

@keyframes skills-fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.skill-tag {
  padding: 2px 8px;
  font-size: 10px;
  border-radius: 12px;
  background: var(--agent-glow);
  color: white;
  white-space: nowrap;
}

@media (max-width: 380px) {
  .mobile-node {
    padding: 1rem;
  }
  
  .mobile-node .w-16 {
    width: 48px;
    height: 48px;
  }
  
  .agent-info h3 {
    font-size: 14px;
  }
  
  .skills-container {
    gap: 2px;
  }
  
  .skill-tag {
    font-size: 8px;
    padding: 2px 6px;
  }
}
</style>
