/**
 * Agent Council Orchestration Store
 * Manages council handoff simulation for the "Mission Control" experience
 */
import { reactive, computed, ref } from 'vue'
import { mascotMetadata, type MascotName } from '@/assets/mascot-assets'

// ============================================================
// Types
// ============================================================
export interface CouncilMessage {
  id: string
  agent: MascotName
  action: string
  timestamp: Date
  duration: number
}

interface AgentCouncilState {
  currentlyActiveAgent: MascotName | null
  isRunning: boolean
  messageQueue: CouncilMessage[]
  currentPhase: 'idle' | 'planning' | 'building' | 'connecting' | 'remembering' | 'guiding' | 'complete'
  sessionId: string | null
}

// ============================================================
// Handoff Sequences - Define realistic agent collaboration flows
// ============================================================
interface HandoffStep {
  agent: MascotName
  action: string
  phase: AgentCouncilState['currentPhase']
  minDelay: number
  maxDelay: number
}

const HANDOFF_SEQUENCES: HandoffStep[][] = [
  // Sequence 1: Full workflow orchestration
  [
    { agent: 'flowtho', action: 'Analyzing workflow requirements...', phase: 'planning', minDelay: 1500, maxDelay: 2000 },
    { agent: 'morpho', action: 'Designing system architecture...', phase: 'building', minDelay: 1800, maxDelay: 2500 },
    { agent: 'memo', action: 'Storing context and patterns...', phase: 'remembering', minDelay: 1200, maxDelay: 1800 },
    { agent: 'nexo', action: 'Connecting integrations...', phase: 'connecting', minDelay: 1500, maxDelay: 2200 },
    { agent: 'halo', action: 'Preparing onboarding flow...', phase: 'guiding', minDelay: 1000, maxDelay: 1500 }
  ],
  // Sequence 2: Quick iteration cycle
  [
    { agent: 'memo', action: 'Retrieving historical context...', phase: 'remembering', minDelay: 1000, maxDelay: 1500 },
    { agent: 'flowtho', action: 'Optimizing workflow steps...', phase: 'planning', minDelay: 1200, maxDelay: 1800 },
    { agent: 'morpho', action: 'Implementing changes...', phase: 'building', minDelay: 1500, maxDelay: 2000 },
    { agent: 'nexo', action: 'Syncing with external services...', phase: 'connecting', minDelay: 1200, maxDelay: 1800 }
  ],
  // Sequence 3: New user onboarding
  [
    { agent: 'halo', action: 'Welcome! Starting guided tour...', phase: 'guiding', minDelay: 1000, maxDelay: 1500 },
    { agent: 'flowtho', action: 'Mapping user journey...', phase: 'planning', minDelay: 1500, maxDelay: 2000 },
    { agent: 'memo', action: 'Saving user preferences...', phase: 'remembering', minDelay: 1200, maxDelay: 1600 },
    { agent: 'nexo', action: 'Setting up integrations...', phase: 'connecting', minDelay: 1400, maxDelay: 2000 }
  ]
]

// ============================================================
// Reactive State
// ============================================================
const state = reactive<AgentCouncilState>({
  currentlyActiveAgent: null,
  isRunning: false,
  messageQueue: [],
  currentPhase: 'idle',
  sessionId: null
})

// ============================================================
// Computed Properties
// ============================================================
export const currentlyActiveAgent = computed(() => state.currentlyActiveAgent)
export const isRunning = computed(() => state.isRunning)
export const messageQueue = computed(() => state.messageQueue)
export const currentPhase = computed(() => state.currentPhase)
export const sessionId = computed(() => state.sessionId)

// ============================================================
// Helper Functions
// ============================================================
const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

const randomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// ============================================================
// Store Actions
// ============================================================

/**
 * Trigger the council handoff simulation
 * Cycles through agents with realistic "thinking" delays
 */
async function triggerCouncil(): Promise<void> {
  if (state.isRunning) {
    console.warn('[AgentCouncil] Council already running')
    return
  }

  // Initialize session
  state.isRunning = true
  state.sessionId = generateId()
  state.messageQueue = []
  state.currentPhase = 'planning'

  // Pick a random sequence
  const sequence = HANDOFF_SEQUENCES[Math.floor(Math.random() * HANDOFF_SEQUENCES.length)]

  console.log(`[AgentCouncil] Starting session ${state.sessionId} with ${sequence.length} steps`)

  // Execute handoff sequence
  for (let i = 0; i < sequence.length; i++) {
    const step = sequence[i]
    const delay = randomDelay(step.minDelay, step.maxDelay)

    // Activate agent
    state.currentlyActiveAgent = step.agent
    state.currentPhase = step.phase

    // Add message to queue
    const message: CouncilMessage = {
      id: generateId(),
      agent: step.agent,
      action: step.action,
      timestamp: new Date(),
      duration: delay
    }
    state.messageQueue.push(message)

    // Wait for "thinking" time (non-blocking)
    await sleep(delay)

    // Brief pause before next agent
    if (i < sequence.length - 1) {
      await sleep(300)
    }
  }

  // Complete session
  state.currentlyActiveAgent = null
  state.currentPhase = 'complete'
  
  console.log(`[AgentCouncil] Session ${state.sessionId} complete`)
}

/**
 * Stop the council simulation
 */
function stopCouncil(): void {
  state.isRunning = false
  state.currentlyActiveAgent = null
  state.currentPhase = 'idle'
}

/**
 * Clear the message queue
 */
function clearQueue(): void {
  state.messageQueue = []
}

/**
 * Check if a specific agent is active
 */
function isAgentActive(agent: MascotName): boolean {
  return state.currentlyActiveAgent === agent
}

/**
 * Get metadata for active agent
 */
const activeAgentMetadata = computed(() => {
  if (!state.currentlyActiveAgent) return null
  return mascotMetadata[state.currentlyActiveAgent]
})

// ============================================================
// Export Store
// ============================================================
export function useAgentCouncil() {
  return {
    // State
    state,
    currentlyActiveAgent,
    isRunning,
    messageQueue,
    currentPhase,
    sessionId,
    activeAgentMetadata,
    
    // Actions
    triggerCouncil,
    stopCouncil,
    clearQueue,
    isAgentActive
  }
}

// Default export for convenience
export default useAgentCouncil
