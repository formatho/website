#!/usr/bin/env node

/**
 * Increment Monthly Counter - Cron Job Script
 *
 * This script should be run every 3-7 minutes to increment the monthly visitor counter.
 * It uses traffic-aware incrementing (morning = faster growth, night = slower growth).
 */

const COUNTER_NAMESPACE = 'formatho.com'
const COUNTER_KEY = 'monthly-users'
const HIT_URL = `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
const GET_URL = `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
const SET_URL = `https://api.countapi.xyz/set/${COUNTER_NAMESPACE}/${COUNTER_KEY}`

// Timezone offset for IST (GMT+5:30)
const IST_OFFSET_HOURS = 5.5

/**
 * Get current hour in IST timezone
 */
function getCurrentISTHour(): number {
  const now = new Date()
  const utcHours = now.getUTCHours()
  const istHours = (utcHours + IST_OFFSET_HOURS) % 24
  return istHours
}

/**
 * Calculate traffic multiplier based on time of day
 * Morning (6-12): Higher traffic
 * Afternoon (12-18): Medium traffic
 * Evening (18-24): Medium-low traffic
 * Night (0-6): Low traffic
 */
function getTrafficMultiplier(hour: number): number {
  if (hour >= 6 && hour < 12) {
    // Morning: High traffic (1.5x)
    return 1.5
  } else if (hour >= 12 && hour < 18) {
    // Afternoon: Medium traffic (1.2x)
    return 1.2
  } else if (hour >= 18 && hour < 24) {
    // Evening: Medium-low traffic (1.0x)
    return 1.0
  } else {
    // Night (0-6): Low traffic (0.5x)
    return 0.5
  }
}

/**
 * Get random increment value (1-10) with traffic multiplier
 */
function getIncrementValue(): number {
  const hour = getCurrentISTHour()
  const multiplier = getTrafficMultiplier(hour)
  const baseIncrement = Math.floor(Math.random() * 10) + 1 // 1-10
  return Math.max(1, Math.round(baseIncrement * multiplier))
}

/**
 * Fetch current counter value
 */
async function getCurrentValue(): Promise<number | null> {
  try {
    const response = await fetch(GET_URL)
    if (!response.ok) return null
    const data = await response.json()
    return data.value ?? null
  } catch (error) {
    console.error('Failed to get current value:', error)
    return null
  }
}

/**
 * Set counter to specific value
 */
async function setCounterValue(value: number): Promise<boolean> {
  try {
    const response = await fetch(`${SET_URL}?value=${value}`)
    if (!response.ok) {
      console.error('Failed to set counter value')
      return false
    }
    const data = await response.json()
    console.log(`Counter updated to: ${data.value}`)
    return true
  } catch (error) {
    console.error('Failed to set counter value:', error)
    return false
  }
}

/**
 * Main function - Increment counter with traffic-aware logic
 */
async function main() {
  console.log('=== Monthly Counter Increment Job ===')
  console.log(`Time: ${new Date().toISOString()}`)

  const hour = getCurrentISTHour()
  const multiplier = getTrafficMultiplier(hour)
  const increment = getIncrementValue()

  console.log(`IST Hour: ${hour}`)
  console.log(`Traffic Multiplier: ${multiplier}x`)
  console.log(`Increment Value: ${increment}`)

  // Get current value
  const currentValue = await getCurrentValue()
  if (currentValue === null) {
    console.error('Could not fetch current counter value, aborting')
    process.exit(1)
  }

  console.log(`Current Counter: ${currentValue}`)

  // Calculate new value
  const newValue = currentValue + increment
  console.log(`New Counter: ${newValue}`)

  // Update counter
  const success = await setCounterValue(newValue)

  if (success) {
    console.log('✅ Counter updated successfully')
    process.exit(0)
  } else {
    console.log('❌ Failed to update counter')
    process.exit(1)
  }
}

// Run main function
main()
