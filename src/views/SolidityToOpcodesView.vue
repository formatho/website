<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

import SolidityWorker from '@/workers/solidity.worker?worker'

const sourceCode = ref(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Example {
    uint256 public value;

    constructor() {
        value = 100;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }
}
`)

const compilerVersion = ref('0.8.26')
const opcodes = ref('')
const bytecode = ref('')
const error = ref('')
const isCompiling = ref(false)
const isCompilerLoading = ref(false)
const compilerLoaded = ref(false)
const executionTrace = ref<Record<number, any>>({})
const currentState = ref<any>(null)

// Worker reference
let worker: Worker | null = null

const versions = ['0.8.26', '0.8.25', '0.8.24', '0.8.20', '0.8.0', '0.7.6', '0.6.12', '0.5.17']

const initWorker = () => {
  if (worker) return worker
  // Use Vite Import
  worker = new SolidityWorker()

  worker.onmessage = (e) => {
    const { action, output, trace, error: err } = e.data

    if (action === 'loaded') {
      compilerLoaded.value = true
      isCompilerLoading.value = false
    } else if (action === 'compiled') {
      isCompiling.value = false
      if (trace) {
        executionTrace.value = trace
      }
      processOutput(output)
    } else if (action === 'error') {
      isCompilerLoading.value = false
      isCompiling.value = false
      error.value = err
    }
  }
  return worker
}

const loadCompiler = async () => {
  if (compilerLoaded.value && worker) return

  isCompilerLoading.value = true
  error.value = ''

  const w = initWorker()

  // URL Mapping - Use unpkg for better CORS support
  const v = compilerVersion.value
  const url = `https://unpkg.com/solc@${v}/soljson.js`

  w.postMessage({ action: 'load', payload: { url } })
}

// Basic EVM Opcode Descriptions
const OPCODE_DESCRIPTIONS: Record<string, string> = {
  STOP: 'Halts execution.',
  ADD: 'Addition operation.',
  MUL: 'Multiplication operation.',
  SUB: 'Subtraction operation.',
  DIV: 'Integer division operation.',
  SDIV: 'Signed integer division operation (truncated).',
  MOD: 'Modulo remainder operation.',
  SMOD: 'Signed modulo remainder operation.',
  ADDMOD: 'Modulo addition operation.',
  MULMOD: 'Modulo multiplication operation.',
  EXP: 'Exponential operation.',
  SIGNEXTEND: "Extend length of two's complement signed integer.",
  LT: 'Less-than comparison.',
  GT: 'Greater-than comparison.',
  SLT: 'Signed less-than comparison.',
  SGT: 'Signed greater-than comparison.',
  EQ: 'Equality comparison.',
  ISZERO: 'Simple not operator.',
  AND: 'Bitwise AND operation.',
  OR: 'Bitwise OR operation.',
  XOR: 'Bitwise XOR operation.',
  NOT: 'Bitwise NOT operation.',
  BYTE: 'Retrieve single byte from word.',
  SHL: 'Logical shift left.',
  SHR: 'Logical shift right.',
  SAR: 'Arithmetic shift right.',
  SHA3: 'Compute Keccak-256 hash.',
  ADDRESS: 'Get address of currently executing account.',
  BALANCE: 'Get balance of the given account.',
  ORIGIN: 'Get execution origination address.',
  CALLER: 'Get caller address.',
  CALLVALUE: 'Get deposited value by the instruction/transaction responsible for this execution.',
  CALLDATALOAD: 'Get input data of current environment.',
  CALLDATASIZE: 'Get size of input data in current environment.',
  CALLDATACOPY: 'Copy input data in current environment to memory.',
  CODESIZE: 'Get size of code running in current environment.',
  CODECOPY: 'Copy code running in current environment to memory.',
  GASPRICE: 'Get price of gas in current environment.',
  EXTCODESIZE: "Get size of an account's code.",
  EXTCODECOPY: "Copy an account's code to memory.",
  RETURNDATASIZE: 'Get size of output data from the previous call from the current environment.',
  RETURNDATACOPY: 'Copy output data from the previous call to memory.',
  EXTCODEHASH: "Get hash of an account's code.",
  BLOCKHASH: 'Get the hash of one of the 256 most recent complete blocks.',
  COINBASE: "Get the block's beneficiary address.",
  TIMESTAMP: "Get the block's timestamp.",
  NUMBER: "Get the block's number.",
  DIFFICULTY: "Get the block's difficulty.",
  GASLIMIT: "Get the block's gas limit.",
  CHAINID: 'Get the chain ID.',
  SELFBALANCE: 'Get balance of currently executing account.',
  BASEFEE: 'Get the base fee.',
  POP: 'Remove item from stack.',
  MLOAD: 'Load word from memory.',
  MSTORE: 'Save word to memory.',
  MSTORE8: 'Save byte to memory.',
  SLOAD: 'Load word from storage.',
  SSTORE: 'Save word to storage.',
  JUMP: 'Alter the program counter.',
  JUMPI: 'Conditionally alter the program counter.',
  PC: 'Get the value of the program counter prior to the increment.',
  MSIZE: 'Get the size of active memory in bytes.',
  GAS: 'Get the amount of available gas, including the corresponding reduction for the cost of this instruction.',
  JUMPDEST: 'Mark a valid destination for jumps.',
  PUSH1: 'Place 1 byte item on stack.',
  PUSH2: 'Place 2-byte item on stack.',
  PUSH3: 'Place 3-byte item on stack.',
  PUSH4: 'Place 4-byte item on stack.',
  PUSH5: 'Place 5-byte item on stack.',
  PUSH6: 'Place 6-byte item on stack.',
  PUSH7: 'Place 7-byte item on stack.',
  PUSH8: 'Place 8-byte item on stack.',
  PUSH9: 'Place 9-byte item on stack.',
  PUSH10: 'Place 10-byte item on stack.',
  PUSH11: 'Place 11-byte item on stack.',
  PUSH12: 'Place 12-byte item on stack.',
  PUSH13: 'Place 13-byte item on stack.',
  PUSH14: 'Place 14-byte item on stack.',
  PUSH15: 'Place 15-byte item on stack.',
  PUSH16: 'Place 16-byte item on stack.',
  PUSH17: 'Place 17-byte item on stack.',
  PUSH18: 'Place 18-byte item on stack.',
  PUSH19: 'Place 19-byte item on stack.',
  PUSH20: 'Place 20-byte item on stack.',
  PUSH21: 'Place 21-byte item on stack.',
  PUSH22: 'Place 22-byte item on stack.',
  PUSH23: 'Place 23-byte item on stack.',
  PUSH24: 'Place 24-byte item on stack.',
  PUSH25: 'Place 25-byte item on stack.',
  PUSH26: 'Place 26-byte item on stack.',
  PUSH27: 'Place 27-byte item on stack.',
  PUSH28: 'Place 28-byte item on stack.',
  PUSH29: 'Place 29-byte item on stack.',
  PUSH30: 'Place 30-byte item on stack.',
  PUSH31: 'Place 31-byte item on stack.',
  PUSH32: 'Place 32-byte item on stack.',
  DUP1: 'Duplicate 1st stack item.',
  DUP2: 'Duplicate 2nd stack item.',
  DUP3: 'Duplicate 3rd stack item.',
  DUP4: 'Duplicate 4th stack item.',
  DUP5: 'Duplicate 5th stack item.',
  DUP6: 'Duplicate 6th stack item.',
  DUP7: 'Duplicate 7th stack item.',
  DUP8: 'Duplicate 8th stack item.',
  DUP9: 'Duplicate 9th stack item.',
  DUP10: 'Duplicate 10th stack item.',
  DUP11: 'Duplicate 11th stack item.',
  DUP12: 'Duplicate 12th stack item.',
  DUP13: 'Duplicate 13th stack item.',
  DUP14: 'Duplicate 14th stack item.',
  DUP15: 'Duplicate 15th stack item.',
  DUP16: 'Duplicate 16th stack item.',
  SWAP1: 'Exchange 1st and 2nd stack items.',
  SWAP2: 'Exchange 1st and 3rd stack items.',
  SWAP3: 'Exchange 1st and 4th stack items.',
  SWAP4: 'Exchange 1st and 5th stack items.',
  SWAP5: 'Exchange 1st and 6th stack items.',
  SWAP6: 'Exchange 1st and 7th stack items.',
  SWAP7: 'Exchange 1st and 8th stack items.',
  SWAP8: 'Exchange 1st and 9th stack items.',
  SWAP9: 'Exchange 1st and 10th stack items.',
  SWAP10: 'Exchange 1st and 11th stack items.',
  SWAP11: 'Exchange 1st and 12th stack items.',
  SWAP12: 'Exchange 1st and 13th stack items.',
  SWAP13: 'Exchange 1st and 14th stack items.',
  SWAP14: 'Exchange 1st and 15th stack items.',
  SWAP15: 'Exchange 1st and 16th stack items.',
  SWAP16: 'Exchange 1st and 17th stack items.',
  LOG0: 'Append log record with no topics.',
  LOG1: 'Append log record with 1 topic.',
  LOG2: 'Append log record with 2 topics.',
  LOG3: 'Append log record with 3 topics.',
  LOG4: 'Append log record with 4 topics.',
  CREATE: 'Create a new account with associated code.',
  CALL: 'Message-call into an account.',
  CALLCODE: "Message-call into this account with alternative account's code.",
  RETURN: 'Halt execution returning output data.',
  DELEGATECALL:
    "Message-call into this account with an alternative account's code, but persisting the current values for sender and value.",
  CREATE2: 'Create a new account with associated code at a predictable address.',
  STATICCALL: 'Static message-call into an account.',
  REVERT: 'Halt execution reverting state changes but returning data and remaining gas.',
  INVALID: 'Designated invalid instruction.',
  SELFDESTRUCT: 'Halt execution and register account for later deletion.'
}

interface OpcodeLine {
  instruction: string
  args?: string
  description: string
  pc: number
}

// Opcode Sizes (bytes) - Default is 1
const OPCODE_SIZES: Record<string, number> = {
  PUSH1: 2,
  PUSH2: 3,
  PUSH3: 4,
  PUSH4: 5,
  PUSH5: 6,
  PUSH6: 7,
  PUSH7: 8,
  PUSH8: 9,
  PUSH9: 10,
  PUSH10: 11,
  PUSH11: 12,
  PUSH12: 13,
  PUSH13: 14,
  PUSH14: 15,
  PUSH15: 16,
  PUSH16: 17,
  PUSH17: 18,
  PUSH18: 19,
  PUSH19: 20,
  PUSH20: 21,
  PUSH21: 22,
  PUSH22: 23,
  PUSH23: 24,
  PUSH24: 25,
  PUSH25: 26,
  PUSH26: 27,
  PUSH27: 28,
  PUSH28: 29,
  PUSH29: 30,
  PUSH30: 31,
  PUSH31: 32,
  PUSH32: 33
}

const parsedOpcodes = ref<OpcodeLine[]>([])

const processOutput = (output: any) => {
  if (output.errors) {
    const criticalErrors = output.errors.filter((e: any) => e.severity === 'error')
    if (criticalErrors.length > 0) {
      error.value = criticalErrors.map((e: any) => e.formattedMessage).join('\n')
      // Clear previous success data if failed
      opcodes.value = ''
      parsedOpcodes.value = []
      bytecode.value = ''
      executionTrace.value = {}
      currentState.value = null
      return
    }
  }

  const contractFile = output.contracts['contract.sol']
  if (contractFile) {
    const contractName = Object.keys(contractFile)[0] as string
    const contract = contractFile[contractName]
    if (contract && contract.evm && contract.evm.bytecode) {
      const rawOpcodes = contract.evm.bytecode.opcodes || ''
      const tokens = rawOpcodes.split(' ')

      const lines: OpcodeLine[] = []
      let currentPc = 0

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        if (token.startsWith('0x') && lines.length > 0) {
          const prevLine = lines[lines.length - 1]
          if (prevLine) prevLine.args = token
          // PC already incremented by the PUSH instruction size logic below
        } else {
          // New instruction
          lines.push({
            instruction: token,
            description: OPCODE_DESCRIPTIONS[token] || 'Unknown or Data',
            pc: currentPc
          })

          // Increment PC
          const size = OPCODE_SIZES[token] || 1
          currentPc += size
        }
      }

      parsedOpcodes.value = lines
      opcodes.value = 'parsed'
      bytecode.value = contract.evm.bytecode.object
    }
  } else {
    error.value = 'No contracts compiled.'
  }
}

const handleHover = (pc: number) => {
  // Look up trace
  if (executionTrace.value && executionTrace.value[pc]) {
    currentState.value = executionTrace.value[pc]
  } else {
    currentState.value = null
  }
}

const compile = async () => {
  if (!compilerLoaded.value) {
    loadCompiler()
    return
  }

  isCompiling.value = true
  error.value = ''
  opcodes.value = ''
  bytecode.value = ''

  const input = {
    language: 'Solidity',
    sources: {
      'contract.sol': {
        content: sourceCode.value
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['evm.bytecode.opcodes', 'evm.bytecode.object']
        }
      }
    }
  }

  if (worker) {
    worker.postMessage({ action: 'compile', payload: { input } })
  }
}

const resetWorker = () => {
  if (worker) {
    worker.terminate()
  }
  worker = null
  compilerLoaded.value = false
}

onUnmounted(() => {
  if (worker) {
    worker.terminate()
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-6 gap-6 overflow-y-auto bg-muted/30">
    <div class="prose dark:prose-invert max-w-none">
      <h1>Solidity to Opcodes</h1>
      <p class="text-slate-600 dark:text-slate-400">
        Compile Solidity code explicitly to view its EVM Opcodes, Bytecode, and execution trace.
        <br />
        <span class="text-xs text-muted-foreground"
          >Compiles in a Web Worker. Hover over opcodes to see the Execution Stack & Memory.</span
        >
      </p>
    </div>

    <!-- Trace Dashboard -->
    <div v-if="opcodes" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Stack -->
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-4 min-h-[150px]"
      >
        <h3 class="font-semibold text-xs uppercase text-slate-500 mb-2">Stack</h3>
        <div v-if="currentState" class="font-mono text-xs flex flex-col-reverse gap-1">
          <div
            v-for="(item, idx) in currentState.stack"
            :key="idx"
            class="bg-slate-100 dark:bg-slate-700 p-1 rounded px-2 w-full break-all"
          >
            {{ idx }}: 0x{{ item }}
          </div>
          <div v-if="currentState.stack.length === 0" class="text-slate-400 italic">Empty</div>
        </div>
        <div v-else class="text-slate-400 text-xs italic">Hover opcode to view state</div>
      </div>

      <!-- Memory -->
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-4 min-h-[150px]"
      >
        <h3 class="font-semibold text-xs uppercase text-slate-500 mb-2">Memory</h3>
        <div
          v-if="currentState"
          class="font-mono text-xs break-all text-slate-600 dark:text-slate-300"
        >
          {{ currentState.memory && currentState.memory !== '' ? currentState.memory : 'Empty' }}
        </div>
        <div v-else class="text-slate-400 text-xs italic">Hover opcode to view state</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px] lg:h-auto flex-1">
      <!-- Input Section -->
      <div class="flex flex-col gap-4 min-h-0">
        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 flex flex-col h-full overflow-hidden"
        >
          <div
            class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50"
          >
            <h2 class="font-semibold text-slate-900 dark:text-white">Solidity Source</h2>
            <div class="flex items-center gap-2">
              <!-- Version Selector -->
              <select
                v-model="compilerVersion"
                @change="resetWorker"
                class="text-xs p-1 rounded border dark:bg-slate-800 dark:border-slate-700"
              >
                <option v-for="v in versions" :key="v" :value="v">{{ v }}</option>
              </select>
            </div>
          </div>

          <div class="flex-1 relative">
            <CodeEditor
              v-model="sourceCode"
              language="solidity"
              min-height="100%"
              class="absolute inset-0"
            />
          </div>

          <div
            class="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
          >
            <Button
              @click="compile"
              :loading="isCompiling || isCompilerLoading"
              class="w-full"
            >
              {{ isCompilerLoading ? 'Loading Compiler...' : 'Compile & View Opcodes' }}
            </Button>
            <div
              v-if="error"
              class="mt-3 text-red-600 text-xs font-mono bg-red-50 dark:bg-red-900/10 p-2 rounded whitespace-pre-wrap max-h-32 overflow-auto"
            >
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <!-- Output Section -->
      <div class="flex flex-col gap-4 min-h-0">
        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 flex flex-col h-full overflow-hidden"
        >
          <div
            class="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
          >
            <h2 class="font-semibold text-slate-900 dark:text-white">EVM Opcodes</h2>
          </div>

          <div class="flex-1 overflow-auto p-4 bg-slate-50 dark:bg-black/20 font-mono text-xs">
            <div v-if="opcodes && parsedOpcodes.length > 0">
              <div
                v-for="(line, idx) in parsedOpcodes"
                :key="idx"
                class="group relative flex w-max hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-1 -mx-1 rounded cursor-help items-baseline"
                @mouseenter="handleHover(line.pc)"
              >
                <div class="w-8 text-slate-400 text-[10px] select-none text-right mr-3">
                  {{ line.pc }}
                </div>
                <div class="w-24 font-bold text-indigo-600 dark:text-indigo-400">
                  {{ line.instruction }}
                </div>
                <div class="text-slate-600 dark:text-slate-400">
                  {{ line.args }}
                </div>

                <!-- Tooltip -->
                <div
                  class="invisible group-hover:visible absolute left-full top-0 ml-4 z-50 w-64 bg-slate-800 text-white text-[10px] p-2 rounded shadow-lg border border-slate-700 pointer-events-none"
                >
                  <div class="font-bold mb-0.5">{{ line.instruction }}</div>
                  <div>{{ line.description }}</div>
                  <!-- Arrow -->
                  <div
                    class="absolute top-2 -left-1 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700"
                  ></div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="h-full flex flex-col items-center justify-center text-slate-400 text-sm italic"
            >
              {{ isCompiling ? 'Generating Opcodes...' : 'Compile source to see opcodes.' }}
            </div>
          </div>

          <!-- Bytecode Preview (Bottom) -->
          <div
            v-if="bytecode"
            class="h-32 border-t border-slate-200 dark:border-slate-700 p-4 overflow-auto bg-white dark:bg-slate-800"
          >
            <div class="text-[10px] uppercase font-bold text-slate-500 mb-1">Raw Bytecode</div>
            <div
              class="font-mono text-[10px] break-all text-slate-600 dark:text-slate-400 select-all"
            >
              {{ bytecode }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
