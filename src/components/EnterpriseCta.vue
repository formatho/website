<script setup lang="ts">
import { Building2 } from 'lucide-vue-next'
</script>

<template>
  <div
    class="mt-10 rounded-lg border border-border bg-muted/40 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
  >
    <div class="flex items-start gap-3 flex-1">
      <Building2 class="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
      <div>
        <p class="font-medium text-foreground">Need this on-premise or behind your firewall?</p>
        <p class="text-sm text-muted-foreground mt-0.5">
          We ship a self-hosted enterprise edition of our identity tools (SAML, OIDC, JWT) —
          air-gapped, auditable, no data leaves your network.
          <a
            href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
            class="underline underline-offset-2 hover:text-foreground"
            >Contact us</a
          >
          for details.
        </p>
      </div>
    </div>
    <a
      href="mailto:support@formatho.com?subject=On-prem%20identity%20tools"
      class="shrink-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Get the on-prem version
    </a>
  </div>
</template>
