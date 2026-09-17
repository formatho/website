<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check, MailCheck, AlertCircle, AlertTriangle, CheckCircle2, Search, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'DMARC Record Parser & Validator — Check SPF Alignment | Formatho',
  description:
    'Parse and validate DMARC TXT records in your browser: policy strength, rua/ruf reporting, pct sampling, adkim/aspf alignment and common misconfigurations. Optional DNS lookup. 100% client-side.',
  keywords: [
    'dmarc parser',
    'dmarc record checker',
    'dmarc validator',
    'dmarc lookup',
    'parse dmarc txt record',
    'dmarc policy check',
    'dmarc rua',
    'email authentication'
  ],
  ogType: 'website'
})

const SAMPLE = 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@example.com, mailto:agg@dmarc.service.net; sp=reject; adkim=s; aspf=r; pct=100; ri=86400'

const input = ref(SAMPLE)
const domain = ref('')
const lookupError = ref('')
const looking = ref(false)
const copied = ref(false)

interface Tag {
  tag: string
  value: string
  valid: boolean
  meaning: string
}

interface Issue {
  level: 'error' | 'warning' | 'info'
  text: string
}

const TAG_MEANINGS: Record<string, string> = {
  v: 'Protocol version. Must be DMARC1 and must be the first tag.',
  p: 'Policy for the domain: none (monitor only), quarantine (spam folder), or reject.',
  sp: 'Policy for subdomains. Defaults to the p value when absent.',
  np: 'Policy for non-existent subdomains (RFC 7489bis/PSD extension).',
  pct: 'Percentage of messages the policy applies to (0-100).',
  rua: 'Addresses receiving aggregate (rua) reports, comma-separated. URI mailto: format.',
  ruf: 'Addresses receiving failure (forensic) reports. Often unsupported by receivers.',
  adkim: 'DKIM identifier alignment: relaxed (r, default) or strict (s).',
  aspf: 'SPF identifier alignment: relaxed (r, default) or strict (s).',
  fo: 'Failure reporting options: 0, 1, d, s combinations for ruf reports.',
  rf: 'Report format. Only afrf is defined.',
  ri: 'Report interval in seconds (default 86400). Receivers may ignore it.',
}

const parseResult = computed<{ tags: Tag[]; issues: Issue[] } | null>(() => {
  const raw = input.value.trim()
  if (!raw) return null

  const issues: Issue[] = []
  // Accept a full dig/host output or a bare record; extract the v=... part.
  let record = raw
  const vm = raw.match(/v\s*=\s*DMARC1\b/i)
  if (vm && (raw.includes('"') || /text/i.test(raw))) {
    // Possibly a dig answer: join quoted TXT chunks.
    const quoted = raw.match(/"([^"]*)"(?:\s*"([^"]*)")*/)
    if (quoted) {
      const chunks = raw.match(/"([^"]*)"/g) || []
      record = chunks.map((c) => c.replace(/"/g, '')).join('')
    }
  }
  record = record.replace(/^["']|["']$/g, '').trim()

  const parts = record.split(';').map((p) => p.trim()).filter(Boolean)
  const tags: Tag[] = []
  const seen = new Set<string>()

  for (const part of parts) {
    const eq = part.indexOf('=')
    const tag = (eq === -1 ? part : part.slice(0, eq)).trim().toLowerCase()
    const value = eq === -1 ? '' : part.slice(eq + 1).trim()
    let valid = true
    let meaning = TAG_MEANINGS[tag] || ''

    if (!/^[a-z][a-z0-9-]*$/.test(tag) || eq === -1) {
      valid = false
      meaning = 'Unrecognized or malformed tag.'
    } else if (seen.has(tag)) {
      valid = false
      issues.push({ level: 'error', text: `Duplicate tag "${tag}" defined more than once.` })
    } else if (!TAG_MEANINGS[tag]) {
      valid = true
      meaning = 'Unknown extension tag (not in RFC 7489). Verify it against your DMARC provider docs.'
      issues.push({ level: 'info', text: `Unknown tag "${tag}" — not part of RFC 7489.` })
    } else {
      // per-tag validation
      if (tag === 'v' && !/^DMARC1$/i.test(value)) { valid = false; issues.push({ level: 'error', text: 'v must be exactly DMARC1.' }) }
      if (tag === 'p' && !['none', 'quarantine', 'reject'].includes(value.toLowerCase())) { valid = false; issues.push({ level: 'error', text: `Invalid policy "${value}": p must be none, quarantine, or reject.` }) }
      if (tag === 'sp' && !['none', 'quarantine', 'reject'].includes(value.toLowerCase())) { valid = false; issues.push({ level: 'error', text: `Invalid sp "${value}": must be none, quarantine, or reject.` }) }
      if (tag === 'np' && !['none', 'quarantine', 'reject'].includes(value.toLowerCase())) { valid = false; issues.push({ level: 'error', text: `Invalid np "${value}": must be none, quarantine, or reject.` }) }
      if (tag === 'pct' && (!/^\d{1,3}$/.test(value) || +value > 100)) { valid = false; issues.push({ level: 'error', text: `Invalid pct "${value}": must be an integer 0-100.` }) }
      if ((tag === 'adkim' || tag === 'aspf') && !['r', 's'].includes(value.toLowerCase())) { valid = false; issues.push({ level: 'error', text: `Invalid ${tag} "${value}": must be r (relaxed) or s (strict).` }) }
      if (tag === 'rf' && !/^afrf$/i.test(value)) { valid = false; issues.push({ level: 'error', text: `Invalid rf "${value}": only afrf is defined.` }) }
      if (tag === 'ri' && (!/^\d+$/.test(value) || +value === 0)) { valid = false; issues.push({ level: 'error', text: `Invalid ri "${value}": must be seconds (positive integer).` }) }
      if (tag === 'fo' && !/^(0|1|d|s)(,(0|1|d|s))*$/i.test(value)) { valid = false; issues.push({ level: 'error', text: `Invalid fo "${value}": combination of 0, 1, d, s.` }) }
      if ((tag === 'rua' || tag === 'ruf') && !value.split(',').every((u) => /^mailto:/i.test(u.trim()))) { valid = false; issues.push({ level: 'error', text: `Invalid ${tag} URI: each address must start with mailto:.` }) }
    }

    if (!meaning) meaning = TAG_MEANINGS[tag] || ''
    seen.add(tag)
    tags.push({ tag, value, valid, meaning })
  }

  // ordering
  if (tags.length && tags[0].tag !== 'v') {
    issues.push({ level: 'error', text: 'v=DMARC1 must be the first tag in the record.' })
  }
  // required tags
  if (!seen.has('v')) issues.push({ level: 'error', text: 'Missing required tag v=DMARC1.' })
  if (!seen.has('p')) issues.push({ level: 'error', text: 'Missing required tag p (policy: none, quarantine, or reject).' })
  const pTag = tags.find((t) => t.tag === 'p')
  if (pTag) {
    const p = pTag.value.toLowerCase()
    if (p === 'none') {
      issues.push({ level: 'warning', text: 'p=none is monitor-only: no protection, DMARC reports only. Most orgs move to quarantine or reject after a monitoring phase.' })
      if (!seen.has('rua')) issues.push({ level: 'error', text: 'p=none without rua means you learn nothing at all: no reports are collected. Add rua.' })
    }
    if (!seen.has('rua') && p !== 'none') {
      issues.push({ level: 'warning', text: 'No rua tag: you get no aggregate reports, so you cannot measure alignment failures before enforcing.' })
    }
    const pctTag = tags.find((t) => t.tag === 'pct')
    if (pctTag && pctTag.valid && +pctTag.value < 100 && p !== 'none') {
      issues.push({ level: 'warning', text: `pct=${pctTag.value} applies the ${p} policy to only ${pctTag.value}% of mail: the rest gets no DMARC action. Roll out to 100 once tuning is done.` })
    }
    if (p === 'reject' && pctTag && pctTag.valid && +pctTag.value < 100) {
      issues.push({ level: 'info', text: 'Partial reject rollout detected: a deliberate canary stage is fine, just remember to finish it.' })
    }
  }
  if (seen.has('ruf')) {
    issues.push({ level: 'info', text: 'ruf (forensic reports) is optional and many receivers no longer send them; they can also leak message content to the report address.' })
  }
  if (tags.length > 2 && tags[1] && tags[1].tag !== 'p' && seen.has('p')) {
    issues.push({ level: 'info', text: 'p should appear directly after v=DMARC1 (RFC 7489 ordering convention).' })
  }

  return { tags, issues }
})

const policyGrade = computed<{ grade: string; label: string; color: string } | null>(() => {
  if (!parseResult.value) return null
  const t = parseResult.value.tags
  const p = t.find((x) => x.tag === 'p')?.value.toLowerCase()
  const pct = +(t.find((x) => x.tag === 'pct')?.value ?? '100')
  if (!p) return null
  if (p === 'reject' && pct === 100) return { grade: 'A', label: 'Enforcing: reject at 100%', color: 'text-green-600' }
  if (p === 'reject') return { grade: 'B', label: `Reject, partial rollout (${pct}%)`, color: 'text-emerald-600' }
  if (p === 'quarantine' && pct === 100) return { grade: 'C', label: 'Enforcing: quarantine at 100%', color: 'text-amber-600' }
  if (p === 'quarantine') return { grade: 'D', label: `Quarantine, partial rollout (${pct}%)`, color: 'text-amber-600' }
  return { grade: 'F', label: 'Monitor-only (p=none)', color: 'text-red-600' }
})

async function lookup() {
  lookupError.value = ''
  const d = domain.value.trim().replace(/^_dmarc\./i, '').replace(/\.$/, '')
  if (!d || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d)) {
    lookupError.value = 'Enter a domain like example.com'
    return
  }
  looking.value = true
  try {
    const res = await fetch(`https://dns.google/resolve?name=_dmarc.${d}&type=TXT`)
    const json = await res.json()
    const rec = (json.Answer || []).find((a: { type: number }) => a.type === 16)
    if (!rec) {
      lookupError.value = `No TXT record found at _dmarc.${d} — DMARC is not published for this domain.`
    } else {
      input.value = rec.data.replace(/^"|"$/g, '')
    }
  } catch (e) {
    lookupError.value = 'DNS lookup failed (network error). You can still paste the record directly.'
  } finally {
    looking.value = false
  }
}

function copyRecord() {
  navigator.clipboard.writeText(input.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-6">
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <MailCheck class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">DMARC Record Parser & Validator</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Paste a DMARC TXT record (or look one up by domain) to parse every tag, validate values against RFC 7489,
        and get a plain-English readout of policy strength and common misconfigurations. Records are parsed entirely
        in your browser — nothing is uploaded. The DNS lookup is the only network request, sent to Google Public DNS.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Record</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-2">
          <Input v-model="domain" placeholder="example.com (optional DNS lookup)" @keyup.enter="lookup" class="flex-1" />
          <Button variant="outline" @click="lookup" :disabled="looking">
            <Search class="w-4 h-4 mr-2" /> {{ looking ? 'Looking up…' : 'Look up _dmarc record' }}
          </Button>
        </div>
        <p v-if="lookupError" class="text-sm text-red-600 flex items-start gap-2">
          <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" /> {{ lookupError }}
        </p>
        <Textarea v-model="input" rows="4" class="font-mono text-sm" placeholder="v=DMARC1; p=quarantine; rua=mailto:..." />
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="input = SAMPLE">Load sample</Button>
          <Button variant="outline" size="sm" @click="copyRecord">
            <component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" /> {{ copied ? 'Copied' : 'Copy' }}
          </Button>
        </div>
      </CardContent>
    </Card>

    <template v-if="parseResult">
      <Card v-if="policyGrade">
        <CardContent class="flex items-center gap-4 pt-6">
          <div class="text-4xl font-bold" :class="policyGrade.color">{{ policyGrade.grade }}</div>
          <div>
            <div class="font-semibold">Policy strength</div>
            <div class="text-sm text-muted-foreground">{{ policyGrade.label }}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-lg">Parsed tags</CardTitle></CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left border-b">
                  <th class="py-2 pr-4 font-medium">Tag</th>
                  <th class="py-2 pr-4 font-medium">Value</th>
                  <th class="py-2 font-medium">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in parseResult.tags" :key="t.tag" class="border-b last:border-0 align-top">
                  <td class="py-2 pr-4 font-mono font-semibold">
                    <component :is="t.valid ? CheckCircle2 : AlertCircle" class="inline w-4 h-4 mr-1" :class="t.valid ? 'text-green-600' : 'text-red-600'" />
                    {{ t.tag }}
                  </td>
                  <td class="py-2 pr-4 font-mono break-all">{{ t.value || '—' }}</td>
                  <td class="py-2 text-muted-foreground">{{ t.meaning }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card v-if="parseResult.issues.length">
        <CardHeader><CardTitle class="text-lg">Findings</CardTitle></CardHeader>
        <CardContent class="space-y-2">
          <div v-for="(issue, i) in parseResult.issues" :key="i" class="flex items-start gap-2 text-sm">
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
      <CardHeader><CardTitle class="text-lg">About DMARC</CardTitle></CardHeader>
      <CardContent class="text-sm text-muted-foreground space-y-3">
        <p>
          DMARC (Domain-based Message Authentication, Reporting & Conformance, RFC 7489) tells receiving mail servers
          what to do when SPF and DKIM checks fail for your domain: monitor (p=none), quarantine (spam-folder), or
          reject. Published as a TXT record at <code class="font-mono">_dmarc.yourdomain.com</code>.
        </p>
        <p>
          Typical rollout: start at p=none with rua reporting to measure legitimate mail that fails alignment, fix
          SPF/DKIM, move to quarantine, then reject at pct=100. The rua aggregate reports are how you see who is
          spoofing your domain and which legitimate senders are misconfigured.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
