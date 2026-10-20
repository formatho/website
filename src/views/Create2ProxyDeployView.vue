<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-primary/10"><Rocket class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl font-bold">CREATE2 Proxy Deployer (0x4e59b4...956C)</h1>
        <p class="text-sm text-muted-foreground">Connect MetaMask, check if the deterministic deployment proxy exists on your chain, and deploy it if missing. Then deploy your own contracts to the same address on every chain.</p>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>What this contract does</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p><strong class="text-foreground">0x4e59b44847b379578588920cA78FbF26c0B4956C</strong> is Arachnid's deterministic deployment proxy: a tiny contract that sits at the same address on every EVM chain and deploys other contracts with CREATE2. Because it was signed by a fixed one-time-use account (nonce 0, pre-EIP-155 tx with no chain id), anyone can deploy it to any new chain and always get the identical address.</p>
        <p>Why it matters: with the proxy in place, your contract address = keccak256(0xff, proxy, salt, keccak256(initCode)) - the same on every chain, forever. Multichain tooling, deterministic routers and vanity deployments all build on this.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>1. Connect wallet and check your chain</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <Button v-if="!account" @click="connect">Connect MetaMask</Button>
        <div v-if="account" class="text-sm space-y-1">
          <p><span class="text-muted-foreground">Account:</span> <span class="font-mono">{{ account }}</span></p>
          <p><span class="text-muted-foreground">Chain:</span> {{ chainName }} ({{ chainId }})</p>
          <p v-if="checking">Checking proxy deployment...</p>
          <p v-if="proxyStatus === 'deployed'" class="text-green-600 font-medium">Proxy is DEPLOYED on this chain ✓ (code size {{ codeSize }} bytes) - you can skip to step 3.</p>
          <p v-else-if="proxyStatus === 'missing'" class="text-red-600 font-medium">Proxy is NOT deployed on this chain - follow steps 2a and 2b below.</p>
          <p v-else-if="proxyStatus === 'error'" class="text-red-600">Could not check: {{ checkError }}</p>
        </div>
        <p v-if="noWallet" class="text-sm text-orange-600">No MetaMask (or EIP-1193 wallet) detected. Install MetaMask, or deploy manually - the presigned transaction is in the code section below.</p>
      </CardContent>
    </Card>

    <div v-if="proxyStatus === 'missing'">
      <Card class="mb-4">
        <CardHeader><CardTitle>2a. Fund the one-time signer</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>The proxy is deployed by a presigned transaction from <span class="font-mono">0x3fab184622dc19b6109349b94811493bf2a45362</span> - a one-time account whose private key was destroyed. The transaction burns ~68,131 gas at 100 gwei (~0.0068 ETH). Send it a little more than that:</p>
          <div class="flex items-center gap-2">
            <input v-model="fundAmount" class="px-3 py-2 rounded-md border bg-background font-mono text-xs w-32" />
            <span class="text-muted-foreground">ETH to</span>
            <span class="font-mono text-xs">0x3fab...5362</span>
            <Button @click="fund" :disabled="!account">Send via MetaMask</Button>
          </div>
          <p v-if="fundTx" class="text-xs text-muted-foreground font-mono break-all">Funding tx: {{ fundTx }}</p>
          <p class="text-xs text-muted-foreground">Wait for the funding transaction to confirm before step 2b.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>2b. Broadcast the presigned deployment</CardTitle></CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>MetaMask cannot broadcast transactions signed by other accounts, so this page sends the presigned raw transaction through a public RPC. Everything happens from your browser.</p>
          <div class="flex items-center gap-2 flex-wrap">
            <select v-model="rpc" class="px-3 py-2 rounded-md border bg-background text-xs font-mono">
              <option v-for="(url, id) in RPCS" :key="id" :value="url">{{ CHAIN_NAMES[id] }} ({{ id }})</option>
              <option value="custom">custom RPC...</option>
            </select>
            <input v-if="rpc === 'custom'" v-model="customRpc" placeholder="https://your-rpc" class="px-3 py-2 rounded-md border bg-background font-mono text-xs flex-1 min-w-48" />
            <Button @click="broadcast" :disabled="!rpcUrl">Broadcast deployment tx</Button>
          </div>
          <p v-if="deployResult" :class="deployResult.ok ? 'text-green-600' : 'text-red-600'" class="text-xs font-mono break-all">{{ deployResult.text }}</p>
          <p class="text-xs text-muted-foreground">If the public RPC rejects raw transactions, paste the raw tx from the code section into your block explorer's broadcast page.</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle>3. Deploy your contract through the proxy</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div>
          <label class="text-xs text-muted-foreground">Init code (creation bytecode, 0x...)</label>
          <textarea v-model="initCode" rows="3" class="w-full mt-1 p-2 rounded-md border bg-background text-xs font-mono" placeholder="0x6080604052..."></textarea>
        </div>
        <div>
          <label class="text-xs text-muted-foreground">Salt (hex without 0x, up to 64 chars, or any string)</label>
          <input v-model="saltInput" class="w-full mt-1 px-3 py-2 rounded-md border bg-background text-xs font-mono" placeholder="my-salt" />
        </div>
        <div v-if="computedAddr" class="p-4 rounded-lg border border-primary/30 bg-primary/5">
          <p class="text-xs text-muted-foreground mb-1">Deterministic address (identical on every chain once the proxy is deployed)</p>
          <p class="font-mono font-bold break-all">{{ computedAddr.addr }}</p>
          <p class="text-xs text-muted-foreground font-mono mt-2">salt used: {{ computedAddr.saltBytes }}</p>
        </div>
        <Button v-if="computedAddr && account" @click="deployViaProxy">Deploy via MetaMask (to 0x4e59b4...956C)</Button>
        <p v-if="proxyDeployResult" :class="proxyDeployResult.ok ? 'text-green-600' : 'text-red-600'" class="text-xs font-mono break-all">{{ proxyDeployResult.text }}</p>
        <p class="text-xs text-muted-foreground">The transaction goes to the proxy address with data = init code + 32-byte salt. Constructor msg.value: the ETH you send with the tx is passed through to your constructor.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>The code</CardTitle></CardHeader>
      <CardContent class="space-y-4 text-sm">
        <div>
          <p class="font-medium mb-1">Proxy source (proxy.sol)</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">contract Proxy {
  constructor() payable {}

  function deploy(bytes memory code, uint256 salt)
    public payable returns (address addr)
  {
    assembly {
      addr := create2(callvalue(), add(code, 0x20), mload(code), salt)
      if iszero(extcodesize(addr)) { revert(0, 0) }
    }
  }

  fallback() external payable {
    bytes memory code; uint256 salt;
    assembly {
      code := mload(0x40)
      calldatacopy(code, 0, sub(calldatasize(), 32))
      salt := calldataload(sub(calldatasize(), 32))
    }
    deploy(code, salt);
  }
}</pre>
        </div>
        <div>
          <p class="font-medium mb-1">Presigned deployment transaction (works on any chain - no chain id, nonce 0)</p>
          <pre class="bg-muted p-3 rounded-md text-xs font-mono overflow-auto">{{ RAW_TX }}</pre>
        </div>
        <div>
          <p class="font-medium mb-1">Constants</p>
          <table class="w-full text-xs font-mono">
            <tr class="border-b border-border/50"><td class="py-1 pr-3 text-muted-foreground">proxy address</td><td class="py-1 break-all">0x4e59b44847b379578588920cA78FbF26c0B4956C</td></tr>
            <tr class="border-b border-border/50"><td class="py-1 pr-3 text-muted-foreground">signer (fund this)</td><td class="py-1 break-all">0x3fab184622dc19b6109349b94811493bf2a45362</td></tr>
            <tr class="border-b border-border/50"><td class="py-1 pr-3 text-muted-foreground">gas price / limit</td><td class="py-1">100 gwei / 100,000 (actual ~68,131)</td></tr>
            <tr class="border-b border-border/50"><td class="py-1 pr-3 text-muted-foreground">source</td><td class="py-1">github.com/Arachnid/deterministic-deployment-proxy</td></tr>
          </table>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>Everything runs in your browser: address computation is local, transactions go through your own wallet, and the raw broadcast uses the public RPC you choose. No data leaves this page except the transactions you sign.</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Rocket } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSEO } from '@/composables/useSEO'
import { getContractAddress, keccak256, toBytes } from 'viem'

useSEO({
  title: 'CREATE2 Proxy Deployer - Deploy 0x4e59b4 on Any Chain | Formatho',
  description: 'Connect MetaMask and deploy the deterministic deployment proxy (0x4e59b44847b379578588920cA78FbF26c0B4956C) to any EVM chain, then deploy your contracts to the same address everywhere via CREATE2.',
  keywords: ['create2 proxy deployer', 'deterministic deployment proxy', '0x4e59b44847b379578588920cA78FbF26c0B4956C', 'arachnid create2', 'deploy create2 factory any chain', 'deterministic contract address metamask']
})

const PROXY = '0x4e59b44847b379578588920cA78FbF26c0B4956C'
const SIGNER = '0x3fab184622dc19b6109349b94811493bf2a45362'
const RAW_TX = '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222'
const RPCS: Record<string, string> = {
  '1': 'https://ethereum-rpc.publicnode.com',
  '10': 'https://optimism-rpc.publicnode.com',
  '56': 'https://bsc-rpc.publicnode.com',
  '100': 'https://gnosis-rpc.publicnode.com',
  '137': 'https://polygon-bor-rpc.publicnode.com',
  '8453': 'https://base-rpc.publicnode.com',
  '42161': 'https://arbitrum-one-rpc.publicnode.com',
  '43114': 'https://avalanche-cchain-rpc.publicnode.com'
}
const CHAIN_NAMES: Record<string, string> = {
  '1': 'Ethereum', '10': 'Optimism', '56': 'BNB Chain', '100': 'Gnosis',
  '137': 'Polygon', '8453': 'Base', '42161': 'Arbitrum One', '43114': 'Avalanche'
}

const account = ref('')
const chainId = ref('')
const chainName = computed(() => CHAIN_NAMES[parseInt(chainId.value, 16).toString()] || 'Unknown chain')
const noWallet = ref(false)
const checking = ref(false)
const proxyStatus = ref<'idle' | 'deployed' | 'missing' | 'error'>('idle')
const codeSize = ref(0)
const checkError = ref('')
const fundAmount = ref('0.0075')
const fundTx = ref('')
const rpc = ref('https://ethereum-rpc.publicnode.com')
const customRpc = ref('')
const rpcUrl = computed(() => (rpc.value === 'custom' ? customRpc.value.trim() : rpc.value))
const deployResult = ref<{ ok: boolean; text: string } | null>(null)
const initCode = ref('')
const saltInput = ref('')
const proxyDeployResult = ref<{ ok: boolean; text: string } | null>(null)

function eth(): any { return (window as any).ethereum }

async function connect() {
  if (!eth()) { noWallet.value = true; return }
  try {
    const accs = await eth().request({ method: 'eth_requestAccounts' })
    account.value = accs[0]
    chainId.value = await eth().request({ method: 'eth_chainId' })
    if (!RPCS[parseInt(chainId.value, 16).toString()]) rpc.value = 'custom'
    else rpc.value = RPCS[parseInt(chainId.value, 16).toString()]
    check()
    eth().on?.('chainChanged', () => window.location.reload())
  } catch (e: any) { checkError.value = e.message }
}

async function check() {
  checking.value = true; proxyStatus.value = 'idle'; checkError.value = ''
  try {
    const code: string = await eth().request({ method: 'eth_getCode', params: [PROXY, 'latest'] })
    codeSize.value = (code.length - 2) / 2
    proxyStatus.value = code && code !== '0x' ? 'deployed' : 'missing'
  } catch (e: any) { proxyStatus.value = 'error'; checkError.value = e.message }
  checking.value = false
}

async function fund() {
  try {
    const wei = BigInt(Math.floor(parseFloat(fundAmount.value || '0') * 1e6)) * 1000000000000n
    fundTx.value = await eth().request({ method: 'eth_sendTransaction', params: [{ from: account.value, to: SIGNER, value: '0x' + wei.toString(16) }] })
  } catch (e: any) { deployResult.value = { ok: false, text: 'Funding failed: ' + e.message } }
}

async function broadcast() {
  deployResult.value = null
  if (!rpcUrl.value) { deployResult.value = { ok: false, text: 'Pick an RPC first.' }; return }
  try {
    const res = await fetch(rpcUrl.value, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_sendRawTransaction', params: [RAW_TX] }) })
    const j = await res.json()
    if (j.result) { deployResult.value = { ok: true, text: 'Deployment tx broadcast: ' + j.result + ' - wait for confirmation, then reconnect to re-check.' } }
    else { deployResult.value = { ok: false, text: 'RPC error: ' + (j.error?.message || JSON.stringify(j)) + ' (insufficient funds = the signer is not funded yet; already known = someone broadcast it already; replacement/nonce errors usually mean it is already mined)' } }
  } catch (e: any) { deployResult.value = { ok: false, text: 'Request failed: ' + e.message + ' - try a different RPC or broadcast via your block explorer.' } }
}

const computedAddr = computed(() => {
  try {
    const ic = initCode.value.trim()
    if (!/^0x[0-9a-fA-F]+$/.test(ic) || ic.length < 10) return null
    const s = saltInput.value.trim()
    let saltBytes: `0x${string}`
    if (/^0x[0-9a-fA-F]{0,64}$/.test(s) && (s.length - 2) % 2 === 0 && s.startsWith('0x')) {
      saltBytes = ('0x' + s.slice(2).padStart(64, '0')) as `0x${string}`
    } else if (/^[0-9a-fA-F]{1,64}$/.test(s) && !s.includes(' ')) {
      saltBytes = ('0x' + s.padStart(64, '0')) as `0x${string}`
    } else if (s) {
      saltBytes = keccak256(toBytes(s))
    } else {
      saltBytes = '0x' + '0'.repeat(64) as `0x${string}`
    }
    const addr = getContractAddress({ opcode: 'CREATE2', from: PROXY as `0x${string}`, salt: saltBytes, bytecodeHash: keccak256(toBytes(ic)) })
    return { addr, saltBytes, data: (ic.slice(2).length % 2 ? ic : ic) + saltBytes.slice(2) }
  } catch { return null }
})

async function deployViaProxy() {
  proxyDeployResult.value = null
  if (!computedAddr.value) return
  try {
    const hash = await eth().request({ method: 'eth_sendTransaction', params: [{ from: account.value, to: PROXY, data: '0x' + initCode.value.trim().slice(2) + computedAddr.value.saltBytes.slice(2) }] })
    proxyDeployResult.value = { ok: true, text: 'Deployment sent: ' + hash + ' - your contract will appear at ' + computedAddr.value.addr }
  } catch (e: any) { proxyDeployResult.value = { ok: false, text: 'Failed: ' + e.message } }
}

onMounted(() => { if (!eth()) noWallet.value = true })
</script>
