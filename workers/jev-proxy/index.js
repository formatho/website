/**
 * Jev API CORS proxy — Cloudflare Worker.
 *
 * api.typesafe.ai does not send Access-Control-Allow-Origin, so browser-based
 * tools (the Jev Playground Live mode) cannot call it directly. This worker
 * adds the missing CORS headers and forwards the request. The API key passes
 * through in the Authorization header — it is never logged, stored, or
 * inspected.
 *
 * Deploy: cd workers/jev-proxy && wrangler deploy
 */

const ALLOWED_ORIGINS = [
  'https://formatho.com',
  'https://www.formatho.com',
  'http://localhost:5173',
  'http://localhost:5199'
]

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request)
      })
    }

    if (request.method !== 'POST') {
      return json(405, { error: 'method not allowed' }, request)
    }

    const origin = request.headers.get('Origin') || ''
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json(403, { error: 'origin not allowed' }, request)
    }

    // Forward to the Jev API
    const url = new URL(request.url)
    const targetPath = '/v1' + url.pathname.replace(/^\/api\/jev/, '')
    const upstream = 'https://api.typesafe.ai' + targetPath

    try {
      const res = await fetch(upstream, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: request.headers.get('Authorization') || ''
        },
        body: await request.text()
      })

      const body = await res.text()
      return new Response(body, {
        status: res.status,
        headers: {
          ...corsHeaders(request),
          'Content-Type': 'application/json'
        }
      })
    } catch (e) {
      return json(502, { error: 'upstream unreachable: ' + e.message }, request)
    }
  }
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*'
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true'
  }
}

function json(status, body, request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' }
  })
}
