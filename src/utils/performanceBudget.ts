/**
 * Performance Budget Checker
 * Analyze bundle sizes and performance metrics against defined budgets
 */

interface PerformanceBudget {
  resourceType: string
  budget: number // in KB
  current: number // in KB
  status: 'pass' | 'warn' | 'fail'
  recommendation?: string
}

interface _BundleAnalysis {
  name: string
  size: number
  gzipSize: number
}

// Performance budgets (in KB)
const BUDGETS: Record<string, number> = {
  'html': 50,
  'css': 100,
  'javascript': 500, // Main bundle
  'images': 1000,
  'fonts': 100,
  'total': 2000
}

// Warning thresholds (80% of budget)
const WARNING_THRESHOLD = 0.8

/**
 * Analyze current resource sizes
 */
export function analyzeResourceSizes(): Map<string, number> {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return new Map()
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  const resourceSizes = new Map<string, number>()

  resources.forEach((resource) => {
    const url = new URL(resource.name)
    const extension = url.pathname.split('.').pop()?.toLowerCase() || 'unknown'
    const size = (resource.transferSize || resource.encodedBodySize || 0) / 1024 // Convert to KB

    const currentSize = resourceSizes.get(extension) || 0
    resourceSizes.set(extension, currentSize + size)
  })

  return resourceSizes
}

/**
 * Check performance budgets
 */
export function checkPerformanceBudget(): PerformanceBudget[] {
  const resourceSizes = analyzeResourceSizes()
  const budgets: PerformanceBudget[] = []

  // Map resource types to budgets
  const resourceTypeMap: Record<string, string> = {
    'html': 'html',
    'css': 'css',
    'js': 'javascript',
    'png': 'images',
    'jpg': 'images',
    'jpeg': 'images',
    'webp': 'images',
    'gif': 'images',
    'svg': 'images',
    'woff': 'fonts',
    'woff2': 'fonts',
    'ttf': 'fonts'
  }

  // Calculate total size
  let totalSize = 0
  resourceSizes.forEach((size, type) => {
    const budgetType = resourceTypeMap[type] || 'javascript'
    const budget = BUDGETS[budgetType]
    totalSize += size

    if (budget) {
      const status = 
        size > budget ? 'fail' :
        size > budget * WARNING_THRESHOLD ? 'warn' : 'pass'

      budgets.push({
        resourceType: `${type.toUpperCase()} files`,
        budget,
        current: Math.round(size * 100) / 100,
        status,
        recommendation: status !== 'pass' ? 
          `Consider reducing ${type} file sizes or lazy loading` : undefined
      })
    }
  })

  // Add total budget
  budgets.push({
    resourceType: 'Total Page Size',
    budget: BUDGETS.total,
    current: Math.round(totalSize * 100) / 100,
    status: 
      totalSize > BUDGETS.total ? 'fail' :
      totalSize > BUDGETS.total * WARNING_THRESHOLD ? 'warn' : 'pass',
    recommendation: totalSize > BUDGETS.total * WARNING_THRESHOLD ?
      'Optimize resource loading and enable compression' : undefined
  })

  return budgets
}

/**
 * Generate performance report
 */
export function generatePerformanceReport(): string {
  const budgets = checkPerformanceBudget()
  
  let report = '# Performance Budget Report\n\n'
  report += `Generated: ${new Date().toISOString()}\n\n`
  report += '## Resource Sizes\n\n'
  report += '| Resource Type | Budget (KB) | Current (KB) | Status |\n'
  report += '|--------------|------------|--------------|--------|\n'

  budgets.forEach((item) => {
    const statusEmoji = 
      item.status === 'pass' ? '✅' :
      item.status === 'warn' ? '⚠️' : '❌'
    
    report += `| ${item.resourceType} | ${item.budget} | ${item.current} | ${statusEmoji} ${item.status} |\n`
    
    if (item.recommendation) {
      report += `  - **Recommendation:** ${item.recommendation}\n`
    }
  })

  return report
}

/**
 * Get optimization recommendations
 */
export function getOptimizationRecommendations(): string[] {
  const budgets = checkPerformanceBudget()
  const recommendations: string[] = []

  budgets.forEach((item) => {
    if (item.status !== 'pass' && item.recommendation) {
      recommendations.push(`${item.resourceType}: ${item.recommendation}`)
    }
  })

  // Add general recommendations
  if (recommendations.length === 0) {
    recommendations.push('✅ All resources are within budget limits')
  } else {
    recommendations.unshift('📝 Optimization recommendations:')
  }

  return recommendations
}

/**
 * Log performance budget status
 */
export function logPerformanceBudget() {
  const budgets = checkPerformanceBudget()
  
  console.group('📊 Performance Budget Status')
  
  budgets.forEach((item) => {
    const icon = 
      item.status === 'pass' ? '✅' :
      item.status === 'warn' ? '⚠️' : '❌'
    
    console.log(
      `${icon} ${item.resourceType}: ${item.current}KB / ${item.budget}KB`
    )
    
    if (item.recommendation) {
      console.log(`   → ${item.recommendation}`)
    }
  })
  
  console.groupEnd()
}

/**
 * Monitor long tasks (CPU-intensive operations)
 */
export function monitorLongTasks(threshold: number = 50): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > threshold) {
          console.warn(
            `⚠️ Long task detected: ${entry.duration}ms`,
            entry
          )
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    console.warn('Long task monitoring not supported')
  }
}

/**
 * Estimate page load time
 */
export function estimatePageLoadTime(): number | null {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  
  if (!navigation) {
    return null
  }

  return navigation.loadEventEnd - navigation.fetchStart
}

/**
 * Check if resource hints are being used
 */
export function checkResourceHints(): {
  preload: string[]
  prefetch: string[]
  preconnect: string[]
} {
  if (typeof document === 'undefined') {
    return { preload: [], prefetch: [], preconnect: [] }
  }

  const hints = {
    preload: Array.from(document.querySelectorAll('link[rel="preload"]'))
      .map((link) => (link as HTMLLinkElement).href),
    prefetch: Array.from(document.querySelectorAll('link[rel="prefetch"]'))
      .map((link) => (link as HTMLLinkElement).href),
    preconnect: Array.from(document.querySelectorAll('link[rel="preconnect"]'))
      .map((link) => (link as HTMLLinkElement).href)
  }

  return hints
}
