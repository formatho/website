<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const searchQuery = ref('')

const gitCommands = [
  {
    category: 'Setup',
    commands: [
      { cmd: 'git init', desc: 'Initialize a new Git repository' },
      { cmd: 'git clone <url>', desc: 'Clone a repository' },
      { cmd: 'git config --global user.name "<name>"', desc: 'Set global username' },
      { cmd: 'git config --global user.email "<email>"', desc: 'Set global email' }
    ]
  },
  {
    category: 'Basic Commands',
    commands: [
      { cmd: 'git status', desc: 'Show working directory status' },
      { cmd: 'git add <file>', desc: 'Add file to staging' },
      { cmd: 'git add .', desc: 'Add all files to staging' },
      { cmd: 'git commit -m "<message>"', desc: 'Commit staged changes' },
      { cmd: 'git push origin <branch>', desc: 'Push to remote' },
      { cmd: 'git pull origin <branch>', desc: 'Pull from remote' }
    ]
  },
  {
    category: 'Branching',
    commands: [
      { cmd: 'git branch', desc: 'List all branches' },
      { cmd: 'git branch <name>', desc: 'Create new branch' },
      { cmd: 'git checkout <branch>', desc: 'Switch to branch' },
      { cmd: 'git checkout -b <name>', desc: 'Create and switch to branch' },
      { cmd: 'git merge <branch>', desc: 'Merge branch into current' },
      { cmd: 'git branch -d <name>', desc: 'Delete branch' }
    ]
  },
  {
    category: 'History',
    commands: [
      { cmd: 'git log', desc: 'Show commit history' },
      { cmd: 'git log --oneline', desc: 'Show compact history' },
      { cmd: 'git diff', desc: 'Show unstaged changes' },
      { cmd: 'git diff --staged', desc: 'Show staged changes' },
      { cmd: 'git show <commit>', desc: 'Show commit details' }
    ]
  },
  {
    category: 'Undo Changes',
    commands: [
      { cmd: 'git reset <file>', desc: 'Unstage file' },
      { cmd: 'git reset --hard', desc: 'Reset to last commit' },
      { cmd: 'git revert <commit>', desc: 'Revert a commit' },
      { cmd: 'git stash', desc: 'Stash changes' },
      { cmd: 'git stash pop', desc: 'Apply stashed changes' }
    ]
  },
  {
    category: 'Remote',
    commands: [
      { cmd: 'git remote -v', desc: 'List remotes' },
      { cmd: 'git remote add origin <url>', desc: 'Add remote' },
      { cmd: 'git fetch origin', desc: 'Fetch from remote' }
    ]
  }
]

const filteredCommands = computed(() => {
  if (!searchQuery.value) return gitCommands

  return gitCommands
    .map((cat) => ({
      ...cat,
      commands: cat.commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }))
    .filter((cat) => cat.commands.length > 0)
})

const copyCommand = (cmd: string) => {
  navigator.clipboard.writeText(cmd)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Git Cheat Sheet</h1>
    </div>

    <Card>
      <CardContent class="pt-6">
        <Input v-model="searchQuery" placeholder="Search commands..." class="w-full" aria-label="Search Git commands" />
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="category in filteredCommands" :key="category.category">
        <CardHeader>
          <CardTitle class="text-lg">{{ category.category }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div
            v-for="(item, idx) in category.commands"
            :key="idx"
            class="p-2 rounded bg-muted hover:bg-muted/80 transition-colors group cursor-pointer"
            @click="copyCommand(item.cmd)"
          >
            <code class="text-sm font-mono break-all">{{ item.cmd }}</code>
            <div class="text-xs text-muted-foreground mt-1">{{ item.desc }}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
