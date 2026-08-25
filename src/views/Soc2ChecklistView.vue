<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClipboardCheck, CheckCircle2, Circle, ArrowRight } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'SOC 2 Compliance Readiness Checklist | Formatho',
  description: 'Interactive SOC 2 readiness checklist covering all 5 Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy). Track your progress with linked tools for each control.',
  keywords: ['soc 2 checklist', 'soc 2 readiness', 'soc 2 compliance', 'soc 2 audit prep', 'trust service criteria', 'soc 2 controls'],
  ogType: 'website'
})

interface ChecklistItem {
  id: string
  label: string
  desc: string
  toolRoute?: string
  toolName?: string
}

interface Criterion {
  name: string
  icon: string
  desc: string
  items: ChecklistItem[]
}

const criteria: Criterion[] = [
  {
    name: 'Security (CC6)', icon: '🔐',
    desc: 'Protection against unauthorized access, use, or disclosure',
    items: [
      { id: 'sec-1', label: 'TLS/SSL encryption enforced', desc: 'All traffic uses HTTPS with valid certificates', toolRoute: '/tools/tls-checker', toolName: 'TLS Certificate Checker' },
      { id: 'sec-2', label: 'Security headers configured', desc: 'HSTS, CSP, X-Frame-Options, X-Content-Type-Options', toolRoute: '/tools/security-headers', toolName: 'Security Headers Analyzer' },
      { id: 'sec-3', label: 'Content-Security-Policy in place', desc: 'Prevents XSS, clickjacking, and data injection', toolRoute: '/tools/csp-generator', toolName: 'CSP Generator' },
      { id: 'sec-4', label: 'CORS properly configured', desc: 'Cross-origin access restricted to known origins', toolRoute: '/tools/cors-tester', toolName: 'CORS Tester' },
      { id: 'sec-5', label: 'Session cookies secured', desc: 'Secure, HttpOnly, SameSite flags set', toolRoute: '/tools/cookie-analyzer', toolName: 'Cookie Security Analyzer' },
      { id: 'sec-6', label: 'Authentication mechanism', desc: 'JWT, SAML, or OIDC with proper validation', toolRoute: '/tools/jwt', toolName: 'JWT Debugger' },
      { id: 'sec-7', label: 'Multi-factor authentication', desc: 'TOTP or hardware keys for admin access', toolRoute: '/tools/otp-code-generator', toolName: 'TOTP Generator' },
      { id: 'sec-8', label: 'Password policies enforced', desc: 'Strong password requirements and hashing', toolRoute: '/tools/password-strength-analyser', toolName: 'Password Strength Analyzer' },
      { id: 'sec-9', label: 'Data encrypted at rest', desc: 'AES-256 or equivalent for stored data', toolRoute: '/tools/encryption', toolName: 'Encrypt/Decrypt Tool' },
      { id: 'sec-10', label: 'API keys and secrets managed', desc: 'Secure generation, storage, and rotation', toolRoute: '/tools/token-generator', toolName: 'Token Generator' },
    ]
  },
  {
    name: 'Availability (A1)', icon: '⚡',
    desc: 'System operational and accessible as committed',
    items: [
      { id: 'av-1', label: 'Uptime monitoring', desc: 'Automated alerts for service disruption' },
      { id: 'av-2', label: 'Incident response plan', desc: 'Documented procedures for outages' },
      { id: 'av-3', label: 'Backup and recovery', desc: 'Tested backup procedures with RTO/RPO' },
      { id: 'av-4', label: 'Capacity planning', desc: 'Monitoring and alerting for resource limits' },
      { id: 'av-5', label: 'Disaster recovery plan', desc: 'Documented DR with regular testing' },
    ]
  },
  {
    name: 'Processing Integrity (PI1)', icon: '⚙️',
    desc: 'System processing is complete, valid, accurate, and authorized',
    items: [
      { id: 'pi-1', label: 'Input validation', desc: 'Data validation at all entry points', toolRoute: '/tools/json-lint', toolName: 'JSON Validator' },
      { id: 'pi-2', label: 'Error handling', desc: 'Graceful errors without data leakage' },
      { id: 'pi-3', label: 'Data integrity checks', desc: 'Checksums or hashes for critical data', toolRoute: '/tools/hash-text', toolName: 'Hash Generator' },
      { id: 'pi-4', label: 'Audit logging', desc: 'All processing logged with timestamps' },
      { id: 'pi-5', label: 'Change management', desc: 'Documented approval process for changes' },
    ]
  },
  {
    name: 'Confidentiality (C1)', icon: '🔒',
    desc: 'Information designated as confidential is protected',
    items: [
      { id: 'conf-1', label: 'Data classification policy', desc: 'Documents labeled by sensitivity level' },
      { id: 'conf-2', label: 'Access controls', desc: 'Role-based access to confidential data' },
      { id: 'conf-3', label: 'Encryption in transit', desc: 'TLS for all data transmission', toolRoute: '/tools/tls-checker', toolName: 'TLS Certificate Checker' },
      { id: 'conf-4', label: 'Encryption at rest', desc: 'Encrypted storage for sensitive data', toolRoute: '/tools/encryption', toolName: 'Encrypt/Decrypt Tool' },
      { id: 'conf-5', label: 'Data retention policy', desc: 'Defined retention and deletion schedule' },
      { id: 'conf-6', label: 'NDAs with sub-processors', desc: 'Contractual confidentiality obligations' },
    ]
  },
  {
    name: 'Privacy (P1)', icon: '🛡️',
    desc: 'Personal information is collected, used, and disclosed in accordance with commitments',
    items: [
      { id: 'priv-1', label: 'Privacy policy published', desc: 'Clear notice about data collection and use' },
      { id: 'priv-2', label: 'Consent mechanism', desc: 'Opt-in/opt-out for data processing' },
      { id: 'priv-3', label: 'Data subject rights', desc: 'Process for access, correction, deletion' },
      { id: 'priv-4', label: 'Cookie consent', desc: 'Tracking cookies require consent', toolRoute: '/tools/cookie-analyzer', toolName: 'Cookie Security Analyzer' },
      { id: 'priv-5', label: 'Data minimization', desc: 'Only collect data necessary for purpose' },
      { id: 'priv-6', label: 'Third-party data sharing', desc: 'Documented sub-processor list' },
    ]
  }
]

const checked = ref<Set<string>>(new Set())

function toggle(id: string) {
  if (checked.value.has(id)) checked.value.delete(id)
  else checked.value.add(id)
}

const totalItems = computed(() => criteria.reduce((sum, c) => sum + c.items.length, 0))
const completedCount = computed(() => checked.value.size)
const progressPct = computed(() => Math.round((completedCount.value / totalItems.value) * 100))
const readinessGrade = computed(() => {
  if (progressPct.value >= 90) return { grade: 'A', label: 'Audit Ready', color: 'text-green-600' }
  if (progressPct.value >= 75) return { grade: 'B', label: 'Nearly Ready', color: 'text-green-600' }
  if (progressPct.value >= 50) return { grade: 'C', label: 'In Progress', color: 'text-amber-600' }
  if (progressPct.value >= 25) return { grade: 'D', label: 'Early Stage', color: 'text-amber-600' }
  return { grade: 'F', label: 'Not Started', color: 'text-red-600' }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb />
    <div class="flex items-center gap-3 mt-4 mb-6">
      <div class="p-2 bg-primary/10 rounded-lg"><ClipboardCheck class="w-6 h-6 text-primary" /></div>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">SOC 2 Compliance Readiness Checklist</h1>
        <p class="text-sm text-muted-foreground">All 5 Trust Service Criteria with linked tools for each control</p>
      </div>
    </div>

    <!-- Progress -->
    <Card class="mb-8">
      <CardContent class="pt-6">
        <div class="flex items-center gap-6 mb-4">
          <div class="text-4xl font-black" :class="readinessGrade.color">{{ readinessGrade.grade }}</div>
          <div class="flex-1">
            <p class="text-lg font-semibold">{{ completedCount }} / {{ totalItems }} controls complete</p>
            <p class="text-sm" :class="readinessGrade.color">{{ readinessGrade.label }} — {{ progressPct }}%</p>
            <div class="w-full h-2 bg-muted rounded-full mt-2">
              <div class="h-2 rounded-full transition-all duration-300" :class="progressPct >= 75 ? 'bg-green-500' : progressPct >= 50 ? 'bg-amber-500' : 'bg-red-500'" :style="{ width: progressPct + '%' }" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Criteria -->
    <div v-for="criterion in criteria" :key="criterion.name" class="mb-6">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ criterion.icon }}</span>
            <div>
              <CardTitle class="text-lg">{{ criterion.name }}</CardTitle>
              <p class="text-xs text-muted-foreground mt-0.5">{{ criterion.desc }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-2">
          <div v-for="item in criterion.items" :key="item.id"
            class="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            :class="{ 'bg-green-500/5 border-green-500/20': checked.has(item.id) }"
            @click="toggle(item.id)">
            <component :is="checked.has(item.id) ? CheckCircle2 : Circle"
              class="w-5 h-5 mt-0.5 shrink-0" :class="checked.has(item.id) ? 'text-green-600' : 'text-muted-foreground'" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium" :class="{ 'line-through text-muted-foreground': checked.has(item.id) }">{{ item.label }}</p>
              <p class="text-xs text-muted-foreground mt-0.5">{{ item.desc }}</p>
              <RouterLink v-if="item.toolRoute" :to="item.toolRoute"
                class="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1.5" @click.stop>
                Use {{ item.toolName }} <ArrowRight class="w-3 h-3" />
              </RouterLink>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
