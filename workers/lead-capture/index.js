/**
 * Formatho lead capture — Cloudflare Worker.
 *
 * The site's newsletter form previously "succeeded" by writing the email to
 * the visitor's own localStorage while every backend endpoint 404'd. This
 * worker is the real backend: a POST /subscribe that validates, rate-limits,
 * and stores leads in a KV namespace. No cookies, no third parties — the
 * privacy policy's "zero tracking" claim only covers the tool pages, and
 * this endpoint receives exactly what the visitor typed into the form.
 *
 * Deploy (one-time, from this directory):
 *   1. wrangler kv:namespace create LEADS
 *   2. put the printed id into wrangler.toml
 *   3. wrangler deploy
 *   4. add a route in the Cloudflare dashboard: formatho.com/api/subscribe*
 *   5. set VITE_RESEND_API_ENDPOINT=https://formatho.com/api/subscribe in
 *      the site's build environment (see src/composables/useEmailCapture.ts)
 *
 * Exporting leads:
 *   GET /subscribe?key=$LEADS_ADMIN_KEY   → JSON array of all leads
 */

const ALLOWED_ORIGIN = 'https://formatho.com'
const MAX_LEADS = 50_000
const RATE_LIMIT = 5 // submissions per IP per hour

function json(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGIN, ...extraHeaders }
  })
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      })
    }

    const url = new URL(request.url)

    // Routed deployments keep the original path (/api/subscribe); a custom
    // domain would serve /subscribe. Accept both.
    if (url.pathname !== '/subscribe' && url.pathname !== '/api/subscribe') {
      return json(404, { error: 'not found' })
    }

    // Admin export
    if (request.method === 'GET') {
      if (!env.LEADS_ADMIN_KEY || url.searchParams.get('key') !== env.LEADS_ADMIN_KEY) {
        return json(401, { error: 'unauthorized' })
      }
      const list = await env.LEADS.list({ limit: 1000, prefix: 'lead:' })
      const leads = []
      for (const key of list.keys) {
        const raw = await env.LEADS.get(key.name)
        if (raw) leads.push(JSON.parse(raw))
      }
      leads.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
      return json(200, { count: leads.length, leads })
    }

    if (request.method !== 'POST') {
      return json(405, { error: 'method not allowed' })
    }

    // Rate limit per IP (best-effort; Cloudflare may reuse edges)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const rlKey = `rl:${ip}:${new Date().toISOString().slice(0, 13)}`
    const hits = Number((await env.LEADS.get(rlKey)) || 0) + 1
    await env.LEADS.put(rlKey, String(hits), { expirationTtl: 3600 })
    if (hits > RATE_LIMIT) {
      return json(429, { error: 'too many requests' })
    }

    let payload
    try {
      payload = await request.json()
    } catch {
      return json(400, { error: 'invalid JSON' })
    }

    const email = String(payload.email || '').trim().toLowerCase()
    if (!EMAIL_RE.test(email)) {
      return json(400, { error: 'invalid email' })
    }

    // Capacity guard — fail loudly instead of silently dropping
    const count = Number((await env.LEADS.get('meta:count')) || 0)
    if (count >= MAX_LEADS) {
      return json(503, { error: 'lead store full' })
    }

    const id = crypto.randomUUID()
    const record = {
      id,
      email,
      source: String(payload.source || 'unknown').slice(0, 120),
      referrer: String(payload.referrer || '').slice(0, 300),
      language: String(payload.language || '').slice(0, 16),
      createdAt: new Date().toISOString()
    }

    await env.LEADS.put(`lead:${id}`, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 400 })
    await env.LEADS.put('meta:count', String(count + 1))

    // Forward to Resend when configured — the worker holds the API key, not
    // the browser. Absence of RESEND_API_KEY just means KV-only storage.
    if (env.RESEND_API_KEY && env.LEADS_LIST_ID) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Formatho <updates@formatho.com>',
            to: [env.LEADS_LIST_ID],
            subject: 'New newsletter signup',
            text: `${email} (source: ${record.source})`
          })
        })
      } catch (e) {
        // Notification is best-effort; the KV record above is the source of truth.
        console.error('resend forward failed', e)
      }
    }

    return json(200, { ok: true, message: 'Thanks for subscribing!' })
  }
}
