<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Bot,
  ExternalLink,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
  ChevronRight
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const API_BASE = 'https://api.formatho.com/api/v1'

interface Agent {
  id: number
  chain_id: number
  address: string
  owner: string
  name?: string
  metadata?: {
    description?: string
  }
  first_seen: number
  last_updated: number
  total_reputation?: number
  avg_score?: number
}

interface Pagination {
  limit: number
  offset: number
  count: number
  total_count: number
  sort_by: string
}

interface AgentResponse {
  agents: Agent[]
  pagination: Pagination
}

interface IndexerStatus {
  id: number
  chain_id: number
  last_block: number
  last_indexed_at: string
  status: string
  total_agents: number
  total_records: number
  registry_addr?: string
  reputation_addr?: string
}

const agents = ref<Agent[]>([])
const pagination = ref<Pagination>({
  limit: 20,
  offset: 0,
  count: 0,
  total_count: 0,
  sort_by: 'reputation'
})
const indexerStatus = ref<IndexerStatus | null>(null)
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const copiedAddress = ref<string | null>(null)
const copyTimeout = ref<number | null>(null)
const sortBy = ref('reputation')

const totalPages = computed(() => Math.ceil(pagination.value.total_count / pagination.value.limit))

const fetchAgents = async () => {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams({
      limit: pagination.value.limit.toString(),
      offset: pagination.value.offset.toString(),
      sort_by: sortBy.value
    })

    const response = await fetch(`${API_BASE}/agents?${params}`)
    if (!response.ok) throw new Error('Failed to fetch agents')
    const data: AgentResponse = await response.json()

    agents.value = data.agents
    pagination.value = data.pagination
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const fetchIndexerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE}/indexer/status`)
    if (!response.ok) throw new Error('Failed to fetch indexer status')
    const data: { indexers: IndexerStatus[] } = await response.json()
    if (data.indexers && data.indexers.length > 0) {
      indexerStatus.value = data.indexers[0] ?? null
    }
  } catch (e: any) {
    console.error('Failed to fetch indexer status:', e)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    pagination.value.offset = (currentPage.value - 1) * pagination.value.limit
    fetchAgents()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    pagination.value.offset = (currentPage.value - 1) * pagination.value.limit
    fetchAgents()
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  pagination.value.offset = (page - 1) * pagination.value.limit
  fetchAgents()
}

const changeSort = (newSort: string) => {
  sortBy.value = newSort
  currentPage.value = 1
  pagination.value.offset = 0
  fetchAgents()
}

const refresh = () => {
  fetchAgents()
  fetchIndexerStatus()
}

const shortenAddress = (address: string) => {
  if (!address || address === '0x0000000000000000000000000000000000000000') return 'N/A'
  return `${address.slice(0, 8)}...${address.slice(-6)}`
}

const openEtherscan = (address: string) => {
  window.open(`https://etherscan.io/address/${address}`, '_blank')
}

const copyAddress = async (address: string) => {
  try {
    await navigator.clipboard.writeText(address)
    copiedAddress.value = address

    // Clear previous timeout if exists
    if (copyTimeout.value) {
      clearTimeout(copyTimeout.value)
    }

    // Reset copied state after 2 seconds
    copyTimeout.value = window.setTimeout(() => {
      copiedAddress.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy address:', err)
  }
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'synced':
      return 'success'
    case 'syncing':
      return 'warning'
    case 'error':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const formatStatus = (status: string) => {
  return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'
}

onMounted(() => {
  fetchAgents()
  fetchIndexerStatus()
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <Bot class="h-8 w-8" />
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Agent Browser</h1>
          <p class="text-sm text-muted-foreground">
            Explore AI Agents on the blockchain with reputation tracking
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" @click="refresh" :disabled="loading" aria-label="Refresh agents list">
        <RefreshCw :class="{ 'animate-spin': loading }" class="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>

    <!-- Sort Controls -->
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">Sort by:</span>
      <div class="flex gap-2">
        <Button
          :variant="sortBy === 'reputation' ? 'default' : 'outline'"
          size="sm"
          @click="changeSort('reputation')"
        >
          <TrendingUp class="h-4 w-4 mr-2" />
          Reputation
        </Button>
        <Button
          :variant="sortBy === 'created' ? 'default' : 'outline'"
          size="sm"
          @click="changeSort('created')"
        >
          Newly Created
        </Button>
        <Button
          :variant="sortBy === 'updated' ? 'default' : 'outline'"
          size="sm"
          @click="changeSort('updated')"
        >
          Last Updated
        </Button>
        <Button
          :variant="sortBy === 'first_seen' ? 'default' : 'outline'"
          size="sm"
          @click="changeSort('first_seen')"
        >
          First Seen
        </Button>
      </div>
    </div>

    <!-- Indexer Status Card -->
    <Card v-if="indexerStatus" class="border-primary/20">
      <CardHeader class="pb-3">
        <CardTitle class="text-sm font-medium flex items-center gap-2">
          <TrendingUp class="h-4 w-4" />
          Network Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <!-- First Row: Key Metrics -->
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div class="text-muted-foreground text-xs">Total Agents</div>
              <div class="text-2xl font-bold">{{ formatNumber(indexerStatus.total_agents) }}</div>
            </div>
            <div>
              <div class="text-muted-foreground text-xs">Last Block</div>
              <div class="text-lg font-semibold">{{ formatNumber(indexerStatus.last_block) }}</div>
            </div>
            <div>
              <div class="text-muted-foreground text-xs">Status</div>
              <Badge :variant="getStatusVariant(indexerStatus.status)" class="text-xs">
                {{ formatStatus(indexerStatus.status) }}
              </Badge>
            </div>
          </div>

          <!-- Second Row: Records and Contracts -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2">
            <div>
              <div class="text-muted-foreground text-xs">Reputation Records</div>
              <div class="font-semibold">{{ formatNumber(indexerStatus.total_records) }}</div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 min-w-0">
                <div class="text-muted-foreground text-xs">Registry Contract</div>
                <div
                  v-if="indexerStatus.registry_addr"
                  class="font-mono text-xs font-medium truncate flex items-center gap-1"
                >
                  <span class="truncate">{{ indexerStatus.registry_addr }}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-5 w-5 p-0 shrink-0"
                    @click="copyAddress(indexerStatus.registry_addr)"
                    :title="
                      copiedAddress === indexerStatus.registry_addr ? 'Copied!' : 'Copy address'
                    "
                  >
                    <Check
                      v-if="copiedAddress === indexerStatus.registry_addr"
                      class="h-3 w-3 text-green-500"
                    />
                    <Copy v-else class="h-3 w-3" />
                  </Button>
                </div>
                <div v-else class="text-muted-foreground text-xs">N/A</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 min-w-0">
                <div class="text-muted-foreground text-xs">Reputation Contract</div>
                <div
                  v-if="indexerStatus.reputation_addr"
                  class="font-mono text-xs font-medium truncate flex items-center gap-1"
                >
                  <span class="truncate">{{ indexerStatus.reputation_addr }}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-5 w-5 p-0 shrink-0"
                    @click="copyAddress(indexerStatus.reputation_addr)"
                    :title="
                      copiedAddress === indexerStatus.reputation_addr ? 'Copied!' : 'Copy address'
                    "
                  >
                    <Check
                      v-if="copiedAddress === indexerStatus.reputation_addr"
                      class="h-3 w-3 text-green-500"
                    />
                    <Copy v-else class="h-3 w-3" />
                  </Button>
                </div>
                <div v-else class="text-muted-foreground text-xs">N/A</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Error Message -->
    <Card v-if="error" class="border-destructive">
      <CardContent class="pt-6">
        <p class="text-destructive">{{ error }}</p>
      </CardContent>
    </Card>

    <!-- Loading State -->
    <div v-if="loading && agents.length === 0" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <RefreshCw class="h-8 w-8 animate-spin mx-auto mb-4" />
        <p class="text-muted-foreground">Loading agents...</p>
      </div>
    </div>

    <!-- Agents Grid -->
    <div v-else class="flex-1 overflow-auto">
      <div class="grid gap-3">
        <RouterLink
          v-for="agent in agents"
          :key="agent.id"
          :to="{ name: 'agent-detail', params: { address: agent.address } }"
          class="block"
        >
          <Card class="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent class="pt-6">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-2">
                    <Bot class="text-gray-900" />
                    <h3 class="text-lg font-semibold truncate">
                      {{ agent.name || shortenAddress(agent.address) }}
                    </h3>
                    <Badge variant="secondary" class="text-xs"> #{{ agent.id }} </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-6 w-6 p-0"
                      @click.prevent="copyAddress(agent.address)"
                      :title="copiedAddress === agent.address ? 'Copied!' : 'Copy address'"
                    >
                      <Check
                        v-if="copiedAddress === agent.address"
                        class="h-3 w-3 text-green-500"
                      />
                      <Copy v-else class="h-3 w-3" />
                    </Button>
                  </div>
                  <p
                    v-if="agent.metadata?.description"
                    class="text-sm text-muted-foreground mb-3 line-clamp-2"
                  >
                    {{ agent.metadata.description }}
                  </p>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div class="text-muted-foreground text-xs">Chain ID</div>
                      <div class="font-medium">{{ agent.chain_id }}</div>
                    </div>
                    <div>
                      <div class="text-muted-foreground text-xs">First Seen</div>
                      <div class="font-medium">Block {{ formatNumber(agent.first_seen) }}</div>
                    </div>
                    <div>
                      <div class="text-muted-foreground text-xs">Owner</div>
                      <div class="font-medium font-mono text-xs">
                        {{ shortenAddress(agent.owner) }}
                      </div>
                    </div>
                    <div v-if="agent.total_reputation !== undefined">
                      <div class="text-muted-foreground text-xs">Reputation</div>
                      <div class="font-medium">
                        {{ agent.total_reputation }}
                        <span v-if="agent.avg_score" class="text-muted-foreground text-xs">
                          (avg: {{ agent.avg_score.toFixed(2) }})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <Button variant="outline" size="sm" @click.prevent="openEtherscan(agent.address)" aria-label="View on Etherscan">
                    <ExternalLink class="h-4 w-4 mr-2" />
                    Etherscan
                  </Button>
                  <ChevronRight class="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </RouterLink>

        <!-- Empty State -->
        <Card v-if="agents.length === 0 && !loading">
          <CardContent class="py-12 text-center">
            <Bot class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p class="text-muted-foreground">No agents found</p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Pagination -->
    <Card v-if="pagination.total_count > 0">
      <CardContent class="pt-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-muted-foreground">
            Showing {{ pagination.offset + 1 }}-{{ pagination.offset + pagination.count }} of
            {{ formatNumber(pagination.total_count) }} agents
          </div>

          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" :disabled="currentPage === 1" @click="prevPage" aria-label="Previous page">
              Previous
            </Button>

            <div class="flex items-center gap-1">
              <Button
                v-for="page in Math.min(5, totalPages)"
                :key="page"
                :variant="page === currentPage ? 'default' : 'outline'"
                size="sm"
                class="w-8"
                @click="goToPage(page)"
              >
                {{ page }}
              </Button>
              <span v-if="totalPages > 5" class="px-2 text-sm text-muted-foreground">
                of {{ totalPages }}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
