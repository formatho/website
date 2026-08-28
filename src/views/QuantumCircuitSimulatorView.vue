<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import {
  Calculator,
  Copy,
  Check,
  Trash2,
  Play,
  RotateCcw,
  Plus,
  Minus,
  BookOpen,
  Download
} from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Quantum gate types
type GateType = 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'SWAP' | 'T' | 'S' | 'RX' | 'RY' | 'RZ' | 'MEASURE'

interface QuantumGate {
  type: GateType
  target: number
  control?: number
  parameter?: number // for rotation gates
}

interface CircuitStep {
  gates: QuantumGate[]
}

const numQubits = ref(3)
const circuit = ref<CircuitStep[]>([
  { gates: [{ type: 'H', target: 0 }] },
  { gates: [{ type: 'CNOT', target: 1, control: 0 }] }
])
const copied = ref(false)
const measurementResults = ref<number[]>([])
const isSimulating = ref(false)
const showExamples = ref(true)

// Example quantum circuits
interface ExampleCircuit {
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  qubits: number
  circuit: CircuitStep[]
}

const exampleCircuits: ExampleCircuit[] = [
  {
    name: 'Bell State',
    description: 'Creates entangled qubits (maximal correlation)',
    difficulty: 'beginner',
    qubits: 2,
    circuit: [
      {
        gates: [{ type: 'H', target: 0 }]
      },
      {
        gates: [{ type: 'CNOT', target: 1, control: 0 }]
      }
    ]
  },
  {
    name: 'GHZ State',
    description: '3-qubit Greenberger-Horne-Zeilinger state',
    difficulty: 'intermediate',
    qubits: 3,
    circuit: [
      {
        gates: [{ type: 'H', target: 0 }]
      },
      {
        gates: [{ type: 'CNOT', target: 1, control: 0 }]
      },
      {
        gates: [{ type: 'CNOT', target: 2, control: 0 }]
      }
    ]
  },
  {
    name: 'Quantum Teleportation',
    description: 'Teleport quantum state using entanglement',
    difficulty: 'advanced',
    qubits: 3,
    circuit: [
      {
        gates: [{ type: 'H', target: 1 }]
      },
      {
        gates: [{ type: 'CNOT', target: 2, control: 1 }]
      },
      {
        gates: [
          { type: 'CNOT', target: 1, control: 0 },
          { type: 'H', target: 0 }
        ]
      },
      {
        gates: [
          { type: 'MEASURE', target: 0 },
          { type: 'MEASURE', target: 1 }
        ]
      }
    ]
  },
  {
    name: 'Superposition',
    description: 'Put all qubits in superposition state',
    difficulty: 'beginner',
    qubits: 3,
    circuit: [
      {
        gates: [
          { type: 'H', target: 0 },
          { type: 'H', target: 1 },
          { type: 'H', target: 2 }
        ]
      }
    ]
  },
  {
    name: 'Quantum Fourier Transform',
    description: 'Simple QFT on 3 qubits',
    difficulty: 'advanced',
    qubits: 3,
    circuit: [
      {
        gates: [{ type: 'H', target: 0 }]
      },
      {
        gates: [
          { type: 'H', target: 1 },
          { type: 'RX', target: 0, parameter: Math.PI / 4 }
        ]
      },
      {
        gates: [
          { type: 'H', target: 2 },
          { type: 'RX', target: 1, parameter: Math.PI / 2 },
          { type: 'RX', target: 0, parameter: Math.PI / 4 }
        ]
      }
    ]
  }
]

const loadExampleCircuit = (example: ExampleCircuit) => {
  numQubits.value = example.qubits
  circuit.value = JSON.parse(JSON.stringify(example.circuit)) // Deep copy
  measurementResults.value = []
  showExamples.value = false
}

// Complex number class for quantum state
class Complex {
  constructor(
    public real: number,
    public imag: number
  ) {}

  add(other: Complex): Complex {
    return new Complex(this.real + other.real, this.imag + other.imag)
  }

  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    )
  }

  magnitude(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag)
  }

  toString(): string {
    if (Math.abs(this.imag) < 1e-10) return this.real.toFixed(3)
    if (Math.abs(this.real) < 1e-10) return `${this.imag.toFixed(3)}i`
    return `${this.real.toFixed(3)} + ${this.imag.toFixed(3)}i`
  }
}

// Quantum state vector
class QuantumState {
  private amplitudes: Complex[]

  constructor(numQubits: number) {
    const size = 1 << numQubits
    this.amplitudes = Array(size)
      .fill(0)
      .map(() => new Complex(0, 0))
    this.amplitudes[0] = new Complex(1, 0) // |0⟩ state
  }

  get size(): number {
    return this.amplitudes.length
  }

  get(index: number): Complex {
    return this.amplitudes[index]
  }

  set(index: number, value: Complex): void {
    this.amplitudes[index] = value
  }

  normalize(): void {
    const norm = Math.sqrt(this.amplitudes.reduce((sum, amp) => sum + amp.magnitude() ** 2, 0))
    if (norm > 0) {
      this.amplitudes.forEach((amp) => {
        amp.real /= norm
        amp.imag /= norm
      })
    }
  }

  measure(): number[] {
    const probabilities = this.amplitudes.map((amp) => amp.magnitude() ** 2)
    const results: number[] = []

    for (let i = 0; i < probabilities.length; i++) {
      if (Math.random() < probabilities[i]) {
        results.push(i)
        break
      }
    }

    return results.length > 0 ? results : [0]
  }

  toString(): string {
    let result = ''
    for (let i = 0; i < this.amplitudes.length; i++) {
      const amp = this.amplitudes[i]
      if (amp.magnitude() > 1e-10) {
        const binary = i.toString(2).padStart(Math.log2(this.amplitudes.length), '0')
        const coeff = amp.toString()
        result += `${coeff}|${binary}⟩`
        if (i < this.amplitudes.length - 1 && this.amplitudes[i + 1].magnitude() > 1e-10) {
          result += ' + '
        }
      }
    }
    return result || '|0...0⟩'
  }
}

// Quantum gates
const gates = {
  H: (target: number, state: QuantumState, numQubits: number): void => {
    const size = state.size
    const newState = new QuantumState(Math.log2(size))

    for (let i = 0; i < size; i++) {
      const bit = (i >> (numQubits - 1 - target)) & 1
      const idx0 = i & ~(1 << (numQubits - 1 - target))
      const idx1 = idx0 | (1 << (numQubits - 1 - target))

      if (bit === 0) {
        const amp0 = state.get(i)
        const amp1 = state.get(idx1)
        newState.set(
          idx0,
          amp0
            .multiply(new Complex(1 / Math.sqrt(2), 0))
            .add(amp1.multiply(new Complex(1 / Math.sqrt(2), 0)))
        )
      }
    }

    // Copy back to original state (simplified)
    for (let i = 0; i < size; i++) {
      state.set(i, newState.get(i))
    }
  },

  X: (target: number, state: QuantumState, numQubits: number): void => {
    const size = state.size
    const newState = new QuantumState(Math.log2(size))

    for (let i = 0; i < size; i++) {
      const flipped = i ^ (1 << (numQubits - 1 - target))
      newState.set(flipped, state.get(i))
    }

    for (let i = 0; i < size; i++) {
      state.set(i, newState.get(i))
    }
  },

  MEASURE: (target: number, state: QuantumState, numQubits: number): number => {
    const size = state.size
    let prob0 = 0

    for (let i = 0; i < size; i++) {
      const bit = (i >> (numQubits - 1 - target)) & 1
      if (bit === 0) {
        prob0 += state.get(i).magnitude() ** 2
      }
    }

    return Math.random() < prob0 ? 0 : 1
  }
}

const addGate = (type: GateType, target: number, control?: number, parameter?: number) => {
  if (circuit.value.length === 0) {
    circuit.value.push({ gates: [] })
  }

  const lastStep = circuit.value[circuit.value.length - 1]

  // Check if gate conflicts with existing gates in same step
  const hasTargetConflict = lastStep.gates.some(
    (gate) => gate.target === target || gate.control === target
  )
  const hasControlConflict =
    control && lastStep.gates.some((gate) => gate.target === control || gate.control === control)

  if (hasTargetConflict || hasControlConflict) {
    circuit.value.push({ gates: [] })
  }

  circuit.value[circuit.value.length - 1].gates.push({
    type,
    target,
    control,
    parameter
  })
}

const simulateCircuit = () => {
  isSimulating.value = true
  setTimeout(() => {
    try {
      const state = new QuantumState(numQubits.value)

      // Apply each step
      for (const step of circuit.value) {
        for (const gate of step.gates) {
          if (gate.type === 'MEASURE') {
            const result = gates.MEASURE(gate.target, state, numQubits.value)
            measurementResults.value.push(result)
          } else if (gates[gate.type as keyof typeof gates]) {
            // @ts-ignore
            gates[gate.type as keyof typeof gates](
              gate.target,
              state,
              numQubits.value,
              gate.control,
              gate.parameter
            )
          }
        }
      }

      // Final measurement
      const finalResults = state.measure()
      measurementResults.value = finalResults.map((result) => {
        const binary = result.toString(2).padStart(numQubits.value, '0')
        return parseInt(binary.split('').reverse().join(''), 2)
      })
    } catch (error) {
      console.error('Simulation error:', error)
    } finally {
      isSimulating.value = false
    }
  }, 100)
}

const clearCircuit = () => {
  circuit.value = [{ gates: [] }]
  measurementResults.value = []
}

const addStep = () => {
  circuit.value.push({ gates: [] })
}

const removeStep = (index: number) => {
  if (circuit.value.length > 1) {
    circuit.value.splice(index, 1)
  }
}

const copyResults = () => {
  const results = measurementResults.value.map((r) => r.toString()).join(', ')
  navigator.clipboard.writeText(results || 'No results')
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const gateLabels: Record<GateType, string> = {
  H: 'Hadamard',
  X: 'Pauli-X',
  Y: 'Pauli-Y',
  Z: 'Pauli-Z',
  CNOT: 'CNOT',
  SWAP: 'SWAP',
  T: 'T-Gate',
  S: 'S-Gate',
  RX: 'RX(θ)',
  RY: 'RY(θ)',
  RZ: 'RZ(θ)',
  MEASURE: 'Measure'
}

const currentResults = computed(() => {
  return measurementResults.value.map((result, index) => {
    const binary = result.toString(2).padStart(numQubits.value, '0')
    return {
      qubit: index,
      result: result,
      binary: binary
    }
  })
})
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Calculator class="w-8 h-8" />
          Quantum Circuit Simulator
        </h1>
        <p class="text-muted-foreground mt-2">
          Design and simulate quantum circuits with real quantum gates. Perfect for learning quantum
          computing concepts.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Circuit Design Panel -->
        <div class="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Circuit Design</CardTitle>
              <CardDescription> Drag and drop gates to build your quantum circuit </CardDescription>
            </CardHeader>
            <CardContent>
              <!-- Qubit Controls -->
              <div class="mb-4 flex items-center gap-4">
                <label class="text-sm font-medium">Qubits:</label>
                <div class="flex items-center gap-2">
                  <Button
                    @click="numQubits = Math.max(1, numQubits - 1)"
                    size="sm"
                    variant="outline"
                  >
                    <Minus class="w-4 h-4" />
                  </Button>
                  <span class="font-mono">{{ numQubits }}</span>
                  <Button
                    @click="numQubits = Math.min(8, numQubits + 1)"
                    size="sm"
                    variant="outline"
                  >
                    <Plus class="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <!-- Circuit Display -->
              <div class="border rounded-lg p-4 bg-surface">
                <!-- Qubit lines -->
                <div class="space-y-4 mb-4">
                  <div v-for="qubit in numQubits" :key="qubit" class="flex items-center gap-2">
                    <span class="text-sm font-mono w-8">q{{ qubit - 1 }}</span>
                    <div class="flex-1 h-8 border-t border-b-2 border-gray-300 relative">
                      <!-- Gates will be placed here -->
                    </div>
                  </div>
                </div>

                <!-- Steps -->
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-medium">Circuit Steps</h3>
                    <Button @click="addStep" size="sm" variant="outline">
                      <Plus class="w-4 h-4" />
                      Add Step
                    </Button>
                  </div>

                  <div
                    v-for="(step, stepIndex) in circuit"
                    :key="stepIndex"
                    class="mb-2 p-2 border rounded"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium">Step {{ stepIndex + 1 }}</span>
                      <Button
                        v-if="circuit.length > 1"
                        @click="removeStep(stepIndex)"
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 class="w-4 h-4" />
                      </Button>
                    </div>

                    <div class="flex flex-wrap gap-1">
                      <Button
                        v-for="gate in step.gates"
                        :key="`${gate.type}-${gate.target}`"
                        size="sm"
                        variant="secondary"
                        class="text-xs"
                      >
                        {{ gateLabels[gate.type] }} (q{{ gate.target }})
                        <span v-if="gate.control !== undefined"> - q{{ gate.control }}</span>
                      </Button>
                      <Button
                        v-if="step.gates.length === 0"
                        @click="addGate('H', 0)"
                        size="sm"
                        variant="outline"
                        class="text-xs opacity-50"
                      >
                        + Add Gate
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Gate Palette -->
                <div>
                  <h3 class="text-sm font-medium mb-2">Available Gates</h3>
                  <div class="grid grid-cols-4 gap-2">
                    <Button @click="addGate('H', 0)" size="sm" variant="outline" class="text-xs">
                      H
                    </Button>
                    <Button @click="addGate('X', 0)" size="sm" variant="outline" class="text-xs">
                      X
                    </Button>
                    <Button @click="addGate('Y', 0)" size="sm" variant="outline" class="text-xs">
                      Y
                    </Button>
                    <Button @click="addGate('Z', 0)" size="sm" variant="outline" class="text-xs">
                      Z
                    </Button>
                    <Button
                      @click="addGate('CNOT', 0, 1)"
                      size="sm"
                      variant="outline"
                      class="text-xs"
                    >
                      CNOT
                    </Button>
                    <Button
                      @click="addGate('SWAP', 0, 1)"
                      size="sm"
                      variant="outline"
                      class="text-xs"
                    >
                      SWAP
                    </Button>
                    <Button @click="addGate('T', 0)" size="sm" variant="outline" class="text-xs">
                      T
                    </Button>
                    <Button @click="addGate('S', 0)" size="sm" variant="outline" class="text-xs">
                      S
                    </Button>
                    <Button
                      @click="addGate('MEASURE', 0)"
                      size="sm"
                      variant="outline"
                      class="text-xs"
                    >
                      Measure
                    </Button>
                  </div>
                </div>

                <!-- Control Buttons -->
                <div class="flex gap-2 mt-4">
                  <Button @click="simulateCircuit" :disabled="isSimulating" class="flex-1">
                    <Play class="w-4 h-4 mr-2" />
                    {{ isSimulating ? 'Simulating...' : 'Run Simulation' }}
                  </Button>
                  <Button @click="showExamples = true" variant="outline">
                    <BookOpen class="w-4 h-4 mr-2" />
                    Examples
                  </Button>
                  <Button @click="clearCircuit" variant="outline">
                    <RotateCcw class="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <!-- Examples Modal -->
                <div
                  v-if="showExamples"
                  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  @click="showExamples = false"
                >
                  <div
                    class="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
                    @click.stop
                  >
                    <div class="flex justify-between items-center mb-4">
                      <h3 class="text-xl font-bold">Example Quantum Circuits</h3>
                      <Button @click="showExamples = false" variant="ghost" size="sm">✕</Button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        v-for="example in exampleCircuits"
                        :key="example.name"
                        class="p-4 border rounded-lg hover:bg-surface-hover cursor-pointer transition-colors"
                        @click="loadExampleCircuit(example)"
                      >
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="font-semibold">{{ example.name }}</h4>
                          <span
                            class="text-xs px-2 py-1 rounded-full"
                            :class="{
                              'bg-green-100 text-green-800': example.difficulty === 'beginner',
                              'bg-yellow-100 text-yellow-800':
                                example.difficulty === 'intermediate',
                              'bg-red-100 text-red-800': example.difficulty === 'advanced'
                            }"
                          >
                            {{ example.difficulty }}
                          </span>
                        </div>
                        <p class="text-sm text-muted-foreground mb-2">{{ example.description }}</p>
                        <div class="text-xs text-muted-foreground">
                          <span class="font-medium">{{ example.qubits }}</span> qubits
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Results Panel -->
        <Card>
          <CardHeader>
            <CardTitle>Measurement Results</CardTitle>
            <CardDescription> Quantum state measurement outcomes </CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="measurementResults.length > 0" class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Results:</span>
                <Button @click="copyResults" variant="ghost" size="sm" aria-label="Copy results">
                  <component :is="copied ? Check : Copy" class="w-4 h-4" />
                </Button>
              </div>

              <div
                v-for="result in currentResults"
                :key="result.qubit"
                class="p-3 bg-surface-hover rounded-lg border"
              >
                <div class="text-sm text-muted-foreground">Qubit {{ result.qubit }}</div>
                <div class="font-mono text-lg font-bold">{{ result.binary }}</div>
                <div class="text-xs text-muted-foreground">{{ result.result }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              <Calculator class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p class="text-sm">Run simulation to see results</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Information Panel -->
      <Card class="mt-6">
        <CardHeader>
          <CardTitle>About Quantum Circuits</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 class="font-medium mb-2">Common Gates:</h4>
              <ul class="space-y-1 text-muted-foreground">
                <li><strong>H (Hadamard):</strong> Creates superposition states</li>
                <li><strong>X, Y, Z:</strong> Pauli gates for qubit rotations</li>
                <li><strong>CNOT:</strong> Controlled-NOT for entanglement</li>
                <li><strong>T, S:</strong> Phase gates for complex amplitudes</li>
                <li><strong>Measure:</strong> Collapses quantum state to classical bit</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">Key Concepts:</h4>
              <ul class="space-y-1 text-muted-foreground">
                <li><strong>Qubits:</strong> Quantum bits that can be in superposition</li>
                <li><strong>Superposition:</strong> Qubits can be 0 and 1 simultaneously</li>
                <li><strong>Entanglement:</strong> Correlated quantum states</li>
                <li><strong>Measurement:</strong> Collapses quantum state to classical</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
