#!/usr/bin/env node

/**
 * Broken Link Detection Script
 * Verifies that all internal links point to valid routes
 */

import { readFileSync } from 'fs'
import { join } from 'path'

// Extract routes from router file
function getRouterRoutes() {
  const routerPath = join(__dirname, '../src/router/index.ts')
  const routerContent = readFileSync(routerPath, 'utf-8')

  const routes = new Set<string>()
  const routeMatches = routerContent.matchAll(/path:\s*['"`]([^'"`]+)['"`]/g)
  for (const match of routeMatches) {
    routes.add(match[1])
  }
  return routes
}

// Extract tool routes from data file
function getToolRoutes() {
  const toolsPath = join(__dirname, '../src/data/tools.ts')
  const toolsContent = readFileSync(toolsPath, 'utf-8')

  const routes = new Set<string>()
  const routeMatches = toolsContent.matchAll(/route:\s*['"`]([^'"`]+)['"`]/g)
  for (const match of routeMatches) {
    routes.add(match[1])
  }
  return routes
}

// Extract internal links from Vue files
function getInternalLinks() {
  const { execSync } = require('child_process')
  const result = execSync("grep -r 'to=\"/' ../src --include='*.vue' -o | grep -v node_modules | sed 's/.*to=\"\\([^\"]*\\)\".*/\\1/' | sort -u", {
    cwd: __dirname,
    encoding: 'utf-8'
  })
  const links = result.trim().split('\n').filter(Boolean)
  return new Set(links)
}

// Main verification
async function verifyLinks() {
  console.log('🔍 Checking for broken internal links...\n')

  const routerRoutes = getRouterRoutes()
  const toolRoutes = getToolRoutes()
  const internalLinks = getInternalLinks()

  const allValidRoutes = new Set([...routerRoutes, ...toolRoutes])
  const brokenLinks: string[] = []

  console.log(`Found ${internalLinks.size} internal links`)
  console.log(`Found ${routerRoutes.size} router routes`)
  console.log(`Found ${toolRoutes.size} tool routes\n`)

  for (const link of internalLinks) {
    // Handle dynamic routes (with :params)
    const linkPattern = link.replace(/:[^/]+/g, '[^/]+')
    const isValid = [...allValidRoutes].some(route =>
      route === link || new RegExp(`^${linkPattern}$`).test(route)
    )

    if (!isValid) {
      brokenLinks.push(link)
    }
  }

  if (brokenLinks.length > 0) {
    console.log('❌ Broken internal links found:')
    brokenLinks.forEach(link => console.log(`  - ${link}`))
    process.exit(1)
  } else {
    console.log('✅ All internal links are valid!')
    console.log('\nRoutes found:')
    ;[...allValidRoutes].sort().forEach(route => console.log(`  ✓ ${route}`))
  }
}

verifyLinks().catch(console.error)
