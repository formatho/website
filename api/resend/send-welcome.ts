/**
 * Welcome Email API - Resend Integration
 * 
 * Handles sending welcome email sequence to new subscribers.
 * Called after successful subscription.
 * 
 * Environment Variables Required:
 * - RESEND_API_KEY: Your Resend API key
 * - RESEND_FROM_EMAIL: Sender email (e.g., "Formatho <hello@formatho.com>")
 */

interface SendWelcomeRequest {
  email: string
  name?: string
  source: string
  interested_in?: string
}

interface SendWelcomeResponse {
  success: boolean
  message: string
  emailId?: string
}

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
    const body: SendWelcomeRequest = await request.json()
    const { email, name, source, interested_in } = body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Resend API key from environment
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Formatho <hello@formatho.com>'
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return new Response(
        JSON.stringify({ success: false, message: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send welcome email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email,
        subject: 'Welcome to Formatho! 🎉',
        html: generateWelcomeEmailHtml(email, name, source, interested_in),
        text: generateWelcomeEmailText(email, name, source, interested_in),
        tags: [
          { name: 'source', value: source },
          { name: 'type', value: 'welcome' }
        ]
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Resend API error:', errorData)
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to send welcome email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const result = await response.json()
    
    // Log successful email
    console.log('Welcome email sent:', { 
      email, 
      source, 
      timestamp: new Date().toISOString(),
      emailId: result.id 
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        emailId: result.id 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Welcome email error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function generateWelcomeEmailHtml(
  email: string,
  name?: string,
  source?: string,
  interestedIn?: string
): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'
  const unsubscribeUrl = `https://formatho.com/unsubscribe?email=${encodeURIComponent(email)}`
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Formatho</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #6366f1; margin-bottom: 10px;">Welcome to Formatho! 🎉</h1>
    <p style="color: #666; font-size: 18px;">Thanks for subscribing, ${greeting}!</p>
  </div>
  
  <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
    <h2 style="color: #1e293b; margin-top: 0;">You're now part of the Formatho community</h2>
    <p style="color: #475569;">
      You'll be the first to know about:
    </p>
    <ul style="color: #475569; padding-left: 20px;">
      <li><strong>Agent Orchestrator launch</strong> - Our upcoming AI-powered automation platform</li>
      <li><strong>New privacy-first tools</strong> - Free tools that run 100% client-side</li>
      <li><strong>Privacy tips for developers</strong> - Best practices for data protection</li>
      <li><strong>Exclusive early access</strong> - Be first to try new features</li>
    </ul>
  </div>
  
  <div style="margin-bottom: 25px;">
    <h3 style="color: #1e293b;">🚀 Get Started with Our Top Tools</h3>
    <p style="color: #475569;">While you wait, try these popular tools:</p>
    <table style="width: 100%;">
      <tr>
        <td style="padding: 10px 0;">
          <a href="https://formatho.com/json-yaml" style="display: block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-decoration: none; color: #1e293b;">
            <strong>🔄 JSON ↔ YAML Converter</strong>
            <span style="color: #64748b; font-size: 14px;"> - Most popular</span>
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <a href="https://formatho.com/base64" style="display: block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-decoration: none; color: #1e293b;">
            <strong>🔐 Base64 Encoder/Decoder</strong>
            <span style="color: #64748b; font-size: 14px;"> - Essential for developers</span>
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <a href="https://formatho.com/uuid" style="display: block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-decoration: none; color: #1e293b;">
            <strong>🎲 UUID Generator</strong>
            <span style="color: #64748b; font-size: 14px;"> - Quick unique IDs</span>
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <a href="https://formatho.com/jwt" style="display: block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-decoration: none; color: #1e293b;">
            <strong>🔑 JWT Debugger</strong>
            <span style="color: #64748b; font-size: 14px;"> - Decode and verify tokens</span>
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <a href="https://formatho.com/diff" style="display: block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-decoration: none; color: #1e293b;">
            <strong>📊 Diff Checker</strong>
            <span style="color: #64748b; font-size: 14px;"> - Compare text easily</span>
          </a>
        </td>
      </tr>
    </table>
  </div>
  
  <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; padding: 25px; color: white; margin-bottom: 25px;">
    <h3 style="margin-top: 0; color: white;">🎁 Special Offer: First 100 Subscribers</h3>
    <p style="margin-bottom: 15px; opacity: 0.9;">
      As one of our early subscribers, you'll get <strong>50% off your first month</strong> of Agent Orchestrator when we launch!
    </p>
    <p style="margin-bottom: 0; opacity: 0.9;">
      We'll send you an exclusive code when we're ready to launch.
    </p>
  </div>
  
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 13px;">
    <p style="margin-bottom: 10px;">
      <strong>What to expect:</strong> We'll email you about Agent Orchestrator updates, new tools, and privacy tips. Usually 1-2 emails per week max.
    </p>
    <p style="margin-bottom: 0;">
      No spam, ever. Unsubscribe anytime. We never sell your data.<br>
      <a href="${unsubscribeUrl}" style="color: #6366f1;">Unsubscribe</a> | 
      <a href="https://formatho.com/privacy" style="color: #6366f1;">Privacy Policy</a>
    </p>
  </div>
  
</body>
</html>
`
}

function generateWelcomeEmailText(
  email: string,
  name?: string,
  source?: string,
  interestedIn?: string
): string {
  const greeting = name ? `Hi ${name}` : 'Hi there'
  const unsubscribeUrl = `https://formatho.com/unsubscribe?email=${encodeURIComponent(email)}`
  
  return `
Welcome to Formatho! 🎉

${greeting},

Thanks for subscribing! You're now part of the Formatho community.

You'll be the first to know about:
• Agent Orchestrator launch - Our upcoming AI-powered automation platform
• New privacy-first tools - Free tools that run 100% client-side
• Privacy tips for developers - Best practices for data protection
• Exclusive early access - Be first to try new features

🚀 GET STARTED WITH OUR TOP TOOLS:

• JSON ↔ YAML Converter: https://formatho.com/json-yaml
• Base64 Encoder/Decoder: https://formatho.com/base64
• UUID Generator: https://formatho.com/uuid
• JWT Debugger: https://formatho.com/jwt
• Diff Checker: https://formatho.com/diff

🎁 SPECIAL OFFER: FIRST 100 SUBSCRIBERS

As one of our early subscribers, you'll get 50% off your first month of Agent Orchestrator when we launch!

We'll send you an exclusive code when we're ready to launch.

---

What to expect: We'll email you about Agent Orchestrator updates, new tools, and privacy tips. Usually 1-2 emails per week max.

No spam, ever. Unsubscribe anytime. We never sell your data.

Unsubscribe: ${unsubscribeUrl}
Privacy Policy: https://formatho.com/privacy

Thanks,
The Formatho Team
https://formatho.com
`
}
