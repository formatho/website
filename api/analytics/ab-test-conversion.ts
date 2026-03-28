/**
 * A/B Test Conversion Tracking Endpoint
 * 
 * Tracks conversion events for A/B tests including:
 * - impressions (page views)
 * - clicks (CTA button clicks)
 * - sign_up (user registrations)
 * - trial_start (trial activations)
 * - beta_application (beta signup)
 * 
 * Environment Variables:
 * - DATABASE_URL: PostgreSQL connection URL (optional, falls back to logging)
 */

interface ConversionEvent {
  testId: string
  variantId: string
  metricName: string
  value: number
  timestamp: string
  userId?: string
  sessionId?: string
  metadata?: Record<string, any>
}

interface ConversionResponse {
  success: boolean
  message: string
  recordedAt?: string
}

// In-memory store for development (use database in production)
const conversionStore: ConversionEvent[] = []

export default async function handler(
  request: Request
): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body: ConversionEvent = await request.json()
    const { testId, variantId, metricName, value, userId, sessionId, metadata } = body

    // Validate required fields
    if (!testId || !variantId || !metricName) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields: testId, variantId, metricName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const event: ConversionEvent = {
      testId,
      variantId,
      metricName,
      value: value ?? 1,
      timestamp: new Date().toISOString(),
      userId,
      sessionId,
      metadata
    }

    // Store the event
    const databaseUrl = process.env.DATABASE_URL
    
    if (databaseUrl) {
      // Production: Store in database
      await storeInDatabase(event, databaseUrl)
    } else {
      // Development: Store in memory and log
      conversionStore.push(event)
      console.log('[A/B Test Conversion]', JSON.stringify(event))
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Conversion recorded',
        recordedAt: event.timestamp 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Conversion tracking error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to record conversion' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// Database storage (placeholder - implement based on your schema)
async function storeInDatabase(event: ConversionEvent, databaseUrl: string): Promise<void> {
  // Example PostgreSQL implementation:
  // const client = new Client({ connectionString: databaseUrl })
  // await client.connect()
  // await client.query(`
  //   INSERT INTO ab_test_conversions (test_id, variant_id, metric_name, value, user_id, session_id, metadata, created_at)
  //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  // `, [event.testId, event.variantId, event.metricName, event.value, event.userId, event.sessionId, JSON.stringify(event.metadata), event.timestamp])
  // await client.end()
  
  console.log('[DB Storage] Would store:', event)
}

// GET endpoint to retrieve results (for dashboard)
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const testId = url.searchParams.get('testId')

  if (!testId) {
    return new Response(
      JSON.stringify({ success: false, message: 'testId parameter required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Filter events for this test
  const testEvents = conversionStore.filter(e => e.testId === testId)

  // Aggregate by variant
  const results = testEvents.reduce((acc, event) => {
    const key = event.variantId
    if (!acc[key]) {
      acc[key] = {
        variantId: key,
        impressions: 0,
        clicks: 0,
        signUps: 0,
        trialStarts: 0,
        betaApplications: 0,
        conversions: []
      }
    }

    switch (event.metricName) {
      case 'impression':
        acc[key].impressions += event.value
        break
      case 'click':
      case 'primary_cta_click':
      case 'secondary_cta_click':
        acc[key].clicks += event.value
        break
      case 'sign_up':
        acc[key].signUps += event.value
        break
      case 'trial_start':
        acc[key].trialStarts += event.value
        break
      case 'beta_application':
        acc[key].betaApplications += event.value
        break
      default:
        acc[key].conversions.push(event)
    }

    return acc
  }, {} as Record<string, any>)

  // Calculate conversion rates
  Object.values(results).forEach((variant: any) => {
    variant.conversionRate = variant.impressions > 0 
      ? ((variant.signUps + variant.trialStarts + variant.betaApplications) / variant.impressions * 100).toFixed(2)
      : 0
    variant.clickRate = variant.impressions > 0
      ? (variant.clicks / variant.impressions * 100).toFixed(2)
      : 0
  })

  return new Response(
    JSON.stringify({
      success: true,
      testId,
      totalEvents: testEvents.length,
      results: Object.values(results)
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
