// Funnel data handoff: each step's tool saves its output into a
// sessionStorage store scoped to the funnel slug. The next step's tool
// reads the previous output to prefill its input. Works alongside
// useFunnel (?funnel=<slug>&step=<n>) — no backend, fully client-side.
import { useRoute } from 'vue-router'
import { funnels } from '@/data/funnels'

const keyFor = (slug: string) => `formatho_funnel_ctx_${slug}`
const MAX_AGE_MS = 1000 * 60 * 60 * 4 // stale contexts expire after 4h

interface StoredCtx {
  savedAt: number
  outputs: Record<number, string> // step number -> output payload
}

function read(slug: string): StoredCtx | null {
  try {
    const raw = sessionStorage.getItem(keyFor(slug))
    if (!raw) return null
    const ctx = JSON.parse(raw) as StoredCtx
    if (Date.now() - ctx.savedAt > MAX_AGE_MS) {
      sessionStorage.removeItem(keyFor(slug))
      return null
    }
    return ctx
  } catch {
    return null
  }
}

function write(slug: string, ctx: StoredCtx) {
  try {
    sessionStorage.setItem(keyFor(slug), JSON.stringify(ctx))
  } catch { /* storage unavailable */ }
}

export function useFunnelHandoff() {
  const route = useRoute()
  const slug = String(route.query.funnel || '')
  const stepNum = Number(route.query.step)
  const inFunnel = !!(slug && funnels.some((f) => f.slug === slug))

  /** Save this step's output (call whenever the tool produces a result). */
  function saveOutput(value: string) {
    if (!inFunnel || !value) return
    const ctx = read(slug) || { savedAt: Date.now(), outputs: {} }
    ctx.savedAt = Date.now()
    ctx.outputs[stepNum] = value
    write(slug, ctx)
  }

  /** Previous step's saved output, if any — prefill input from this. */
  function previousOutput(): string | null {
    if (!inFunnel) return null
    const ctx = read(slug)
    return ctx?.outputs[stepNum - 1] || null
  }

  return { inFunnel, saveOutput, previousOutput }
}
