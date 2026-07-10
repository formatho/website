<script setup lang="ts">
/**
 * CommitBadge — Bottom-right floating button showing live commit SHA.
 * Black button, dark yellow text, links to GitHub Actions page.
 * Format: Commit: #commitID
 */
declare const __GIT_COMMIT_SHA__: string

const commitSha = typeof __GIT_COMMIT_SHA__ !== 'undefined' ? __GIT_COMMIT_SHA__ : 'unknown'
const githubUrl = `https://github.com/formatho/website/actions`
const ariaLabel = `View latest commit ${commitSha} on GitHub`
const titleLabel = `Commit ${commitSha}`
</script>

<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-3 right-3 z-[200] bg-black shadow-md hover:bg-gray-800 transition-colors"
    style="color: #eab308; padding: 8px 16px; font-size: 16px; border-radius: 5px; font-weight: 700"
    :aria-label="ariaLabel"
    :title="titleLabel"
  >
    Commit: #{{ commitSha }}
  </a>
</template>
