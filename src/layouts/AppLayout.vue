<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  FileCode,
  FileJson,
  FileDiff,
  Binary,
  KeyRound,
  Database,
  Fingerprint,
  Type,
  FileType,
  Image,
  PanelLeftClose,
  PanelLeftOpen,
  Network,
  Calculator,
  Hash,
  ShieldCheck,
  Bot,
  Lock,
  Link,
  Globe,
  TextCursor,
  Smile,
  Phone,
  CreditCard,
  Settings,
  Calendar,
  GitBranch,
  Braces,
  Shield,
  Key,
  Clock,
  Search,
  CaseSensitive,
  QrCode
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const route = useRoute()
const isHomePage = computed(() => route.name === 'home')

const storedState = localStorage.getItem('sidebarCollapsed')
const isCollapsed = ref(storedState === null ? true : storedState === 'true')

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebarCollapsed', String(isCollapsed.value))
}
</script>

<template>
  <div class="flex h-screen w-screen bg-background text-foreground overflow-hidden">
    <!-- Sidebar -->
    <aside
      v-if="!isHomePage"
      class="flex-shrink-0 border-r border-border bg-muted/10 transition-all duration-300 ease-in-out flex flex-col"
      :class="isCollapsed ? 'w-16' : 'w-64'"
    >
      <div
        class="flex h-14 items-center border-b border-border px-4 transition-all"
        :class="isCollapsed ? 'justify-center' : 'justify-between'"
      >
        <div
          class="flex items-center gap-2 font-bold text-lg overflow-hidden whitespace-nowrap"
          v-if="!isCollapsed"
        >
          <img src="/logo.png" alt="Formatho" class="h-8 w-8 rounded-lg flex-shrink-0" />
          Formatho
        </div>
        <!-- Logo for collapsed state -->
        <img v-else src="/logo.png" alt="Formatho" class="h-8 w-8 rounded-lg flex-shrink-0" />

        <Button
          v-if="!isCollapsed"
          variant="ghost"
          size="icon"
          @click="toggleSidebar"
          class="flex-shrink-0"
        >
          <PanelLeftClose class="h-5 w-5" />
        </Button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden">
        <!-- Crypto & Security -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Crypto</h3>
          <div class="space-y-1">
            <RouterLink to="/token-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Token Generator' : ''">
              <Key class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Token Generator</span>
            </RouterLink>
            <RouterLink to="/hash-text" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Hash Text' : ''">
              <Hash class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Hash Text</span>
            </RouterLink>
            <RouterLink to="/bcrypt" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Bcrypt' : ''">
              <Lock class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Bcrypt</span>
            </RouterLink>
            <RouterLink to="/uuid" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'UUID' : ''">
              <Fingerprint class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">UUID</span>
            </RouterLink>
            <RouterLink to="/ulid-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'ULID' : ''">
              <Fingerprint class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">ULID</span>
            </RouterLink>
            <RouterLink to="/encryption" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Encrypt/Decrypt' : ''">
              <Lock class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Encrypt/Decrypt</span>
            </RouterLink>
            <RouterLink to="/bip39-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'BIP39' : ''">
              <ShieldCheck class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">BIP39</span>
            </RouterLink>
            <RouterLink to="/hmac-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'HMAC' : ''">
              <Hash class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">HMAC</span>
            </RouterLink>
            <RouterLink to="/rsa-key-pair-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'RSA Keys' : ''">
              <KeyRound class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">RSA Keys</span>
            </RouterLink>
            <RouterLink to="/password-strength-analyser" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Password Strength' : ''">
              <Shield class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Password Strength</span>
            </RouterLink>
          </div>
        </div>

        <!-- Converters -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Converters</h3>
          <div class="space-y-1">
            <RouterLink to="/date-time-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Date-Time' : ''">
              <Calendar class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Date-Time</span>
            </RouterLink>
            <RouterLink to="/integer-base-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Base Converter' : ''">
              <Binary class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Base Converter</span>
            </RouterLink>
            <RouterLink to="/roman-numeral-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Roman Numerals' : ''">
              <Calculator class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Roman Numerals</span>
            </RouterLink>
            <RouterLink to="/base64" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Base64' : ''">
              <Binary class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Base64</span>
            </RouterLink>
            <RouterLink to="/base64-file-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Base64 File' : ''">
              <FileCode class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Base64 File</span>
            </RouterLink>
            <RouterLink to="/color-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Color' : ''">
              <Palette class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Color</span>
            </RouterLink>
            <RouterLink to="/case-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Case' : ''">
              <CaseSensitive class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Case</span>
            </RouterLink>
            <RouterLink to="/json-yaml" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'JSON <> YAML' : ''">
              <FileJson class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">JSON &lt;&gt; YAML</span>
            </RouterLink>
            <RouterLink to="/json-csv" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'JSON <> CSV' : ''">
              <FileJson class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">JSON &lt;&gt; CSV</span>
            </RouterLink>
            <RouterLink to="/temperature-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Temperature' : ''">
              <TextCursor class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Temperature</span>
            </RouterLink>
            <RouterLink to="/xml-to-json" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'XML <> JSON' : ''">
              <Braces class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">XML &lt;&gt; JSON</span>
            </RouterLink>
          </div>
        </div>

        <!-- Web -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Web</h3>
          <div class="space-y-1">
            <RouterLink to="/url-encoder" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'URL Encode' : ''">
              <Link class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">URL Encode</span>
            </RouterLink>
            <RouterLink to="/url-parser" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'URL Parser' : ''">
              <Link class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">URL Parser</span>
            </RouterLink>
            <RouterLink to="/jwt" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'JWT Debugger' : ''">
              <KeyRound class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">JWT Debugger</span>
            </RouterLink>
            <RouterLink to="/http-status-codes" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'HTTP Codes' : ''">
              <Globe class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">HTTP Codes</span>
            </RouterLink>
            <RouterLink to="/otp-code-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'OTP Generator' : ''">
              <Key class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">OTP Generator</span>
            </RouterLink>
            <RouterLink to="/user-agent-parser" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'User Agent' : ''">
              <Globe class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">User Agent</span>
            </RouterLink>
          </div>
        </div>

        <!-- Images -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Images</h3>
          <div class="space-y-1">
            <RouterLink to="/qr-code-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'QR Code' : ''">
              <QrCode class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">QR Code</span>
            </RouterLink>
            <RouterLink to="/image" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Image Tools' : ''">
              <Image class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Image Tools</span>
            </RouterLink>
          </div>
        </div>

        <!-- Development -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Development</h3>
          <div class="space-y-1">
            <RouterLink to="/git-memo" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Git Cheat Sheet' : ''">
              <GitBranch class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Git Cheat Sheet</span>
            </RouterLink>
            <RouterLink to="/crontab-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Crontab' : ''">
              <Clock class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Crontab</span>
            </RouterLink>
            <RouterLink to="/json-viewer" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'JSON Viewer' : ''">
              <Braces class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">JSON Viewer</span>
            </RouterLink>
            <RouterLink to="/sql" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'SQL Formatter' : ''">
              <Database class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">SQL Formatter</span>
            </RouterLink>
            <RouterLink to="/chmod-calculator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Chmod' : ''">
              <Settings class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Chmod</span>
            </RouterLink>
            <RouterLink to="/regex-tester" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Regex Tester' : ''">
              <Search class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Regex Tester</span>
            </RouterLink>
          </div>
        </div>

        <!-- Network -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Network</h3>
          <div class="space-y-1">
            <RouterLink to="/ipv4-subnet-calculator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'IPv4 Subnet' : ''">
              <Network class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">IPv4 Subnet</span>
            </RouterLink>
            <RouterLink to="/mac-address-generator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'MAC Generator' : ''">
              <Network class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">MAC Generator</span>
            </RouterLink>
          </div>
        </div>

        <!-- Math -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Math</h3>
          <div class="space-y-1">
            <RouterLink to="/math-evaluator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Math Evaluator' : ''">
              <Calculator class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Math Evaluator</span>
            </RouterLink>
            <RouterLink to="/percentage-calculator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Percentage' : ''">
              <Calculator class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Percentage</span>
            </RouterLink>
          </div>
        </div>

        <!-- Text -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Text</h3>
          <div class="space-y-1">
            <RouterLink to="/markdown" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Markdown Editor' : ''">
              <FileCode class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Markdown Editor</span>
            </RouterLink>
            <RouterLink to="/diff" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Diff Checker' : ''">
              <FileDiff class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Diff Checker</span>
            </RouterLink>
            <RouterLink to="/lorem" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Lorem Ipsum' : ''">
              <Type class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Lorem Ipsum</span>
            </RouterLink>
            <RouterLink to="/text-statistics" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Text Stats' : ''">
              <TextCursor class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Text Stats</span>
            </RouterLink>
            <RouterLink to="/emoji-picker" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Emoji Picker' : ''">
              <Smile class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Emoji Picker</span>
            </RouterLink>
          </div>
        </div>

        <!-- Data -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Data</h3>
          <div class="space-y-1">
            <RouterLink to="/phone-parser" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Phone Parser' : ''">
              <Phone class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Phone Parser</span>
            </RouterLink>
            <RouterLink to="/iban-validator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'IBAN Validator' : ''">
              <CreditCard class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">IBAN Validator</span>
            </RouterLink>
            <RouterLink to="/json-lint" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'JSON Linter' : ''">
              <FileJson class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">JSON Linter</span>
            </RouterLink>
            <RouterLink to="/yaml-lint" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'YAML Linter' : ''">
              <FileType class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">YAML Linter</span>
            </RouterLink>
          </div>
        </div>

        <!-- Blockchain -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">Blockchain</h3>
          <div class="space-y-1">
            <RouterLink to="/evm-converter" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'EVM Converter' : ''">
              <Calculator class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">EVM Converter</span>
            </RouterLink>
            <RouterLink to="/keccak256" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Keccak Hasher' : ''">
              <Hash class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Keccak Hasher</span>
            </RouterLink>
            <RouterLink to="/address-checksum" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Address Checksum' : ''">
              <ShieldCheck class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Address Checksum</span>
            </RouterLink>
            <RouterLink to="/multi-chain-keys" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Multi-Chain Keys' : ''">
              <KeyRound class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Multi-Chain Keys</span>
            </RouterLink>
            <RouterLink to="/solidity-to-opcodes" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Solidity Opcodes' : ''">
              <FileCode class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Solidity Opcodes</span>
            </RouterLink>
          </div>
        </div>

        <!-- AI -->
        <div>
          <h3 class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground h-4" :class="isCollapsed ? 'opacity-0' : 'opacity-100'">AI</h3>
          <div class="space-y-1">
            <RouterLink to="/agent-orchestrator" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Agent Orchestrator' : ''">
              <Bot class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Agent Orchestrator</span>
            </RouterLink>
            <RouterLink to="/agent-identity" class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground [&.router-link-active]:bg-secondary [&.router-link-active]:text-foreground transition-all overflow-hidden whitespace-nowrap" :title="isCollapsed ? 'Agent Identity' : ''">
              <Bot class="h-5 w-5 flex-shrink-0" />
              <span :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100'" class="transition-all duration-200">Agent Identity</span>
            </RouterLink>
          </div>
        </div>
      </nav>

      <!-- Footer Actions: Sidebar Toggle -->
      <div class="p-4 border-t border-border">
        <Button
          v-if="isCollapsed"
          variant="ghost"
          size="icon"
          @click="toggleSidebar"
          class="w-full"
        >
          <PanelLeftOpen class="h-5 w-5" />
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden bg-background">
      <RouterView />
    </main>
  </div>
</template>
