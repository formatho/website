<script setup lang="ts">
/**
 * CommitBadge — Bottom-right floating button showing live commit SHA.
 * Black button, dark yellow text, links to GitHub commit page.
 * Format: Commit: #commitID
 */
declare const __GIT_COMMIT_SHA__: string

const commitSha = typeof __GIT_COMMIT_SHA__ !== 'undefined' ? __GIT_COMMIT_SHA__ : 'unknown'
const githubUrl = `https://github.com/formatho/website/commit/${commitSha}`
const ariaLabel = `View commit ${commitSha} on GitHub`
const titleLabel = `Commit ${commitSha}`
</script>

<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-3 right-3 z-[200] px-2.5 py-1 rounded-md bg-black font-mono text-[10px] leading-tight shadow-md hover:bg-gray-800 transition-colors"
    style="color: #eab308"
    :aria-label="ariaLabel"
    :title="titleLabel"
  >
    Commit: #{{ commitSha }}
  </a>
</template>
