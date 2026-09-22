<script setup lang="ts">
import { ref, computed } from 'vue'
import { Shield, AlertCircle, AlertTriangle, CheckCircle2, Info, Search } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'SPF Record Analyzer — Lookup Count & Syntax Check | Formatho',
  description:
    'Parse and validate SPF records: mechanisms, qualifiers, the 10-DNS-lookup limit, redirect/include accounting, all-mechanism position and syntax errors. Optional DNS lookup. 100% client-side.',
  keywords: ['spf analyzer', 'spf record checker', 'spf validator', 'spf lookup limit', 'spf too many lookups', 'parse spf', 'spf include checker'],
  ogType: 'website'
})

const SAMPLE = 'v=spf1 include:_spf.google.com include:spf.protection.outlook.com include:mailgun.org ip4:203.0.113.10/29 -all'
const input = ref(SAMPLE)
const domain = ref('')
const lookupError = ref('')
const looking = ref(false)

interface Term {
  raw: string
  qualifier: string
  mechanism: string
  value: string
  lookups: number
  meaning: string
  warn?: string
}

interface Issue { level: 'error' | 'warning' | 'info'; text: string }

const MEANINGS: Record<string, string> = {
  all: 'Matches everything (must be last). -all = hard fail, ~all = soft fail, +all = allow all (never do this).',
  ip4: 'IPv4 address or range allowed to send.',
  ip6: 'IPv6 address or range allowed to send.',
  a: 'The A/AAAA records of the current domain are allowed to send.',
  mx: 'The MX hosts of the current domain are allowed to send.',
  ptr: 'Reverse-DNS lookup match. Discouraged: slow, unreliable, costly in lookups.',
  exists: 'Matches if the given name resolves to any address.',
  include: 'Evaluate the SPF record of another domain and pass if it passes. Costs a DNS lookup.',
  redirect: 'Replace evaluation with the SPF record of another domain.',
  exp: 'Explanation string for failure reports (modifier).',
}

const result = computed<{ terms: Term[]; issues: Issue[]; lookups: number } | null>(() => {
  const raw = input.value.trim()
  if (!raw) return null
  const issues: Issue[] = []
  const parts = raw.replace(/^["']|["']$/g, '').trim().split(/\s+/).filter(Boolean)

  if (!/^v=spf1$/i.test(parts[0])) {
    issues.push({ level: 'error', text: 'Record must start with v=spf1.' })
    return { terms: [], issues, lookups: 0 }
  }

  const terms: Term[] = []
  let lookups = 0
  let sawAll = false
  const seenMech = new Map<string, number>()

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i]
    if (/^(exp|redirect)=/i.test(p)) {
      const [m, v] = p.split('=')
      const mech = m.toLowerCase()
      const cost = mech === 'redirect' ? 1 : 0
      lookups += cost
      terms.push({ raw: p, qualifier: '', mechanism: mech, value: v, lookups: cost, meaning: MEANINGS[mech] || 'Modifier.' })
      if (mech === 'redirect') issues.push({ level: 'info', text: 'redirect makes the other record fully replace this one: mechanisms after it are never evaluated, and its own lookup count applies too.' })
      continue
    }
    const qm = p.match(/^([+\-~?])?(.+)$/)
    const qualifier = qm?.[1] || '+'
    const rest = qm?.[2] || p
    const cm = rest.match(/^([a-z0-9]+)(?::(.+))?$/i)
    const mech = (cm?.[1] || rest).toLowerCase()
    const value = cm?.[2] || ''
    let meaning = MEANINGS[mech]
    let warn: string | undefined
    const cost = ['include', 'a', 'mx', 'ptr', 'exists'].includes(mech) ? 1 : 0
    lookups += cost

    if (!meaning) {
      meaning = 'Unknown mechanism — receivers will treat this record as invalid (permerror).'
      issues.push({ level: 'error', text: `Unknown mechanism "${mech}" — SPF requires a valid mechanism or the whole record fails.` })
    }
    if (sawAll) {
      issues.push({ level: 'error', text: 'Mechanisms after "all" are unreachable — "all" must be the last mechanism.' })
    }
    if (mech === 'all') sawAll = true
    if (mech === 'ip4' && value && !/^\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?$/.test(value)) {
      warn = 'Invalid IPv4 address or CIDR.'
      issues.push({ level: 'error', text: `Invalid ip4 value "${value}".` })
    }
    if (mech === 'ip6' && value && !/^[0-9a-f:]+(\/\d{1,3})?$/i.test(value)) {
      warn = 'Invalid IPv6 address or CIDR.'
      issues.push({ level: 'error', text: `Invalid ip6 value "${value}".` })
    }
    if ((mech === 'include' || mech === 'a' || mech === 'mx' || mech === 'exists' || mech === 'redirect') && !value) {
      issues.push({ level: 'error', text: `${mech} requires a value (domain).` })
    }
    if (mech === 'ptr') warn = 'ptr is discouraged (RFC 7208): unreliable and expensive.'
    if (mech === 'all' && qualifier === '+') {
      issues.push({ level: 'error', text: '+all authorizes the entire internet to send as your domain. Almost certainly a mistake.' })
    }
    seenMech.set(mech, (seenMech.get(mech) || 0) + 1)

    terms.push({ raw: p, qualifier, mechanism: mech, value, lookups: cost, meaning, warn })
  }

  for (const [mech, n] of seenMech) {
    if (n > 1 && mech !== 'ip4' && mech !== 'ip6') {
      issues.push({ level: 'warning', text: `Mechanism "${mech}" appears ${n} times — consolidate duplicates to save lookups.` })
    }
  }
  if (!sawAll) issues.push({ level: 'warning', text: 'No "all" mechanism: the record ends with an implicit neutral (?all), so spoofed mail gets no fail signal. Add -all or ~all.' })
  if (lookups > 10) issues.push({ level: 'error', text: `${lookups} DNS lookups — SPF allows a maximum of 10 (RFC 7208). Receivers return permerror and your SPF stops protecting you. Flatten includes (keep ip4/ip6 blocks) to get under the limit.` })
  else if (lookups > 8) issues.push({ level: 'warning', text: `${lookups}/10 DNS lookups used — little headroom before records break. Consider flattening.` })
  else issues.push({ level: 'info', text: `${lookups}/10 DNS lookups used.` })

  return { terms, issues, lookups }
})

const qualColor: Record<string, string> = { '+': 'text-green-600', '-': 'text-red-600', '~': 'text-amber-600', '?': 'text-muted-foreground' }

async function lookup() {
  lookupError.value = ''
  const d = domain.value.trim().replace(/\.$/, '')
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d)) { lookupError.value = 'Enter a domain like example.com'; return }
  looking.value = true
  try {
    const res = await fetch(`https://dns.google/resolve?name=${d}&type=TXT`)
    const json = await res.json()
    const spf = (json.Answer || []).map((a: { data: string }) => a.data.replace(/"/g, '')).find((t: string) => t.startsWith('v=spf1'))
    if (!spf) lookupError.value = `No SPF record found for ${d} (no TXT starting with v=spf1).`
    else input.value = spf
  } catch {
    lookupError.value = 'DNS lookup failed. You can still paste the record.'
  } finally {
    looking.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <Shield class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">SPF Record Analyzer</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Paste an SPF record (or fetch one by domain) to break down every mechanism, check syntax against RFC 7208,
        and count your DNS lookups against the hard limit of 10. Parsed in your browser; the only network request
        is the optional DNS lookup via Google Public DNS.
      </p>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-lg">Record</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-2">
          <Input v-model="domain" placeholder="example.com (optional lookup)" @keyup.enter="lookup" class="flex-1" />
          <Button variant="outline" @click="lookup" :disabled="looking">
            <Search class="w-4 h-4 mr-2" /> {{ looking ? 'Looking up…' : 'Fetch SPF' }}
          </Button>
        </div>
        <p v-if="lookupError" class="text-sm text-red-600 flex items-start gap-2">
          <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" /> {{ lookupError }}
        </p>
        <Textarea v-model="input" rows="3" class="font-mono text-sm" placeholder="v=spf1 ... -all" />
        <Button variant="outline" size="sm" @click="input = SAMPLE">Load sample</Button>
      </CardContent>
    </Card>

    <template v-if="result">
      <Card>
        <CardContent class="pt-6 flex items-center gap-6">
          <div class="text-4xl font-bold" :class="result.lookups > 10 ? 'text-red-600' : result.lookups > 8 ? 'text-amber-600' : 'text-green-600'">
            {{ result.lookups }}<span class="text-lg text-muted-foreground">/10</span>
          </div>
          <div>
            <div class="font-semibold">DNS lookups used</div>
            <div class="text-sm text-muted-foreground">include, a, mx, ptr, exists and redirect each cost 1</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-lg">Mechanisms</CardTitle></CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left border-b"><th class="py-2 pr-4 font-medium">Term</th><th class="py-2 pr-4 font-medium">Lookups</th><th class="py-2 font-medium">Meaning</th></tr>
              </thead>
              <tbody>
                <tr v-for="(t, i) in result.terms" :key="i" class="border-b last:border-0 align-top">
                  <td class="py-2 pr-4 font-mono whitespace-nowrap">
                    <span class="font-bold" :class="qualColor[t.qualifier]">{{ t.qualifier }}</span>{{ t.mechanism }}<span v-if="t.value">:{{ t.value }}</span>
                  </td>
                  <td class="py-2 pr-4">{{ t.lookups }}</td>
                  <td class="py-2 text-muted-foreground">{{ t.meaning }} <span v-if="t.warn" class="text-amber-600">{{ t.warn }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card v-if="result.issues.length">
        <CardHeader><CardTitle class="text-lg">Findings</CardTitle></CardHeader>
        <CardContent class="space-y-2">
          <div v-for="(issue, i) in result.issues" :key="i" class="flex items-start gap-2 text-sm">
            <component
              :is="issue.level === 'error' ? AlertCircle : issue.level === 'warning' ? AlertTriangle : Info"
              class="w-4 h-4 mt-0.5 shrink-0"
              :class="issue.level === 'error' ? 'text-red-600' : issue.level === 'warning' ? 'text-amber-600' : 'text-blue-600'"
            />
            <span :class="issue.level === 'error' ? 'font-medium text-red-700' : ''">{{ issue.text }}</span>
          </div>
        </CardContent>
      </Card>
    </template>

    <Card>
      <CardHeader><CardTitle class="text-lg">About SPF</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-2">
        <p>SPF (Sender Policy Framework, RFC 7208) lists the servers allowed to send email for your domain, published as a TXT record. Receivers check it before accepting mail. It is one leg of email authentication, alongside DKIM (cryptographic signatures) and DMARC (the policy tying both together — try our DMARC parser).</p>
        <p>The 10-lookup limit is the classic killer: every include chain is walked by the receiver, and past 10 lookups your SPF simply errors out and stops protecting anything. The fix is flattening — replacing includes with their underlying ip4/ip6 blocks.</p>
      </CardContent>
    </Card>
  </div>
</template>
