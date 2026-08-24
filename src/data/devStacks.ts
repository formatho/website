/**
 * Developer persona/stack landing pages — curated tool listings for
 * specific ecosystems (OWASP, SAP, Okta, Ping Federate).
 * Route: /dev-tools/:stack
 */
export interface DevStackTool {
  name: string
  route: string
  desc: string
}

export interface DevStack {
  slug: string
  name: string
  tagline: string
  blurb: string
  whoFor: string
  tools: DevStackTool[]
  tips: string[]
}

export const devStacks: DevStack[] = [
  {
    slug: 'owasp',
    name: 'OWASP Security Tools',
    tagline: 'Test against OWASP Top 10 and Secure Headers Project',
    blurb: 'Free browser-based tools aligned with OWASP guidance: verify security headers against the OWASP Secure Headers Project, generate and evaluate Content-Security-Policies, test CORS configurations, analyze cookie security flags, and inspect JWT tokens for API security testing.',
    whoFor: 'Security engineers, penetration testers, and application security teams working with OWASP frameworks',
    tools: [
      { name: 'Security Headers Analyzer', route: '/tools/security-headers', desc: 'Check HSTS, CSP, X-Frame-Options against OWASP Secure Headers Project recommendations' },
      { name: 'CSP Generator', route: '/tools/csp-generator', desc: 'Build a Content-Security-Policy following the OWASP CSP Cheat Sheet' },
      { name: 'CSP Evaluator', route: '/tools/csp-evaluator', desc: 'Find CSP weaknesses: unsafe-inline, wildcards, missing directives' },
      { name: 'CORS Tester', route: '/tools/cors-tester', desc: 'Test cross-origin configurations — OWASP CORS Misconfiguration' },
      { name: 'Cookie Security Analyzer', route: '/tools/cookie-analyzer', desc: 'Check Secure, HttpOnly, SameSite flags per OWASP Session Management Cheat Sheet' },
      { name: 'JWT Debugger', route: '/tools/jwt', desc: 'Decode and verify tokens — OWASP API Security Top 10 #2 (Broken Authentication)' },
      { name: 'SAML Decoder', route: '/tools/saml-decoder', desc: 'Inspect SAML assertions for OWASP SAML Security concerns' },
      { name: 'Hash Generator', route: '/tools/hash-text', desc: 'Argon2id, bcrypt, PBKDF2 per OWASP Password Storage Cheat Sheet' },
      { name: 'Password Strength Analyzer', route: '/tools/password-strength-analyser', desc: 'Evaluate entropy per OWASP Authentication Cheat Sheet' },
      { name: 'Base64 Encoder/Decoder', route: '/tools/base64', desc: 'Decode encoded payloads in security testing' },
    ],
    tips: [
      'Start with the Security Headers Analyzer on your production domain — an A grade means all six OWASP-recommended headers are configured.',
      'Generate a CSP with Report-Only mode first, collect violations for a week, then enforce.',
      'Use the Cookie Analyzer on session cookies — HttpOnly + Secure + SameSite=Lax is the OWASP baseline.',
    ],
  },
  {
    slug: 'sap',
    name: 'SAP Developer Tools',
    tagline: 'API debugging, data conversion, and integration testing',
    blurb: 'Tools for SAP developers building integrations with PI/PO, CPI, BTP, and Gateway: format XML payloads, validate JSON APIs, convert data formats for IDoc processing, debug JWT tokens from BTP auth, and compare payload versions during transport.',
    whoFor: 'SAP ABAP/PI/CPI developers, integration consultants, and BTP application developers',
    tools: [
      { name: 'XML Formatter', route: '/tools/xml-formatter', desc: 'Pretty-print SAP PI/PO XML payloads for inspection' },
      { name: 'JSON Validator & Formatter', route: '/tools/json-lint', desc: 'Validate SAP API responses and CPI iFlow payloads' },
      { name: 'JSON to CSV Converter', route: '/tools/json-csv', desc: 'Export API data for business users who need spreadsheets' },
      { name: 'XML ↔ JSON Converter', route: '/tools/xml-json', desc: 'Convert between SAP PI XML and modern REST API JSON' },
      { name: 'JWT Debugger', route: '/tools/jwt', desc: 'Debug BTP XSUAA tokens and API auth' },
      { name: 'Base64 Encoder/Decoder', route: '/tools/base64', desc: 'Decode SAP API payloads and credentials' },
      { name: 'Diff Checker', route: '/tools/diff', desc: 'Compare payload versions between DEV/QA/PRD' },
      { name: 'URL Encoder/Decoder', route: '/tools/url-encoder', desc: 'Encode Gateway OData parameters safely' },
      { name: 'Date-Time Converter', route: '/tools/date-time-converter', desc: 'Convert SAP timestamps and ISO 8601 dates' },
      { name: 'UUID Generator', route: '/tools/uuid', desc: 'Generate correlation IDs for message tracking' },
    ],
    tips: [
      'Use the XML Formatter on PI/PO message monitoring payloads — the pretty-printed version makes mapping errors obvious.',
      'The JSON-to-CSV tool is perfect for extracting SAP API data for Excel-based business review.',
      'Diff two CPI iFlow payload versions to spot exactly what changed between transports.',
    ],
  },
  {
    slug: 'okta',
    name: 'Okta Developer Tools',
    tagline: 'SAML, OIDC, and token debugging for Okta integrations',
    blurb: 'Debug Okta authentication flows: decode SAML assertions from Okta apps, build OIDC authorize URLs with PKCE, inspect JWT access tokens from Okta authorization servers, and verify CORS settings on your Okta custom domain.',
    whoFor: 'Okta developers, identity engineers, and admins debugging SSO and API authentication',
    tools: [
      { name: 'SAML Decoder', route: '/tools/saml-decoder', desc: 'Decode SAML assertions from Okta SSO — AuthnRequest and Response messages' },
      { name: 'OIDC URL Builder', route: '/tools/oidc-url-builder', desc: 'Build Okta authorize URLs with PKCE, state, and nonce' },
      { name: 'JWT Debugger', route: '/tools/jwt', desc: 'Decode and verify Okta access tokens and ID tokens' },
      { name: 'Base64 Encoder/Decoder', route: '/tools/base64', desc: 'Decode SAML assertion payloads and Okta API credentials' },
      { name: 'Token Generator', route: '/tools/token-generator', desc: 'Generate SSWS token alternatives and API test tokens' },
      { name: 'Hash Generator', route: '/tools/hash-text', desc: 'Generate client secrets and signing keys' },
      { name: 'TOTP Generator', route: '/tools/otp-code-generator', desc: 'Test Okta MFA factors — generate TOTP codes from secrets' },
      { name: 'Cookie Security Analyzer', route: '/tools/cookie-analyzer', desc: 'Analyze Okta session cookies for security flags' },
      { name: 'CORS Tester', route: '/tools/cors-tester', desc: 'Test CORS on Okta custom domains and API endpoints' },
      { name: 'Security Headers Analyzer', route: '/tools/security-headers', desc: 'Check headers on your Okta custom domain' },
    ],
    tips: [
      'When debugging "Invalid SAML Assertion" errors, use the SAML Decoder on the SAMLResponse parameter from the browser\'s network tab.',
      'The OIDC Builder generates a valid PKCE pair — use it to test your /authorize redirect before wiring your app.',
      'Okta access tokens use RS256 by default — paste your authorization server\'s public key in the JWT Debugger to verify signatures.',
    ],
  },
  {
    slug: 'ping-federate',
    name: 'Ping Federate Tools',
    tagline: 'SAML, OIDC, and token debugging for Ping identity flows',
    blurb: 'Debug Ping Federate authentication: decode SAML assertions from Ping SP connections, build OIDC authorization URLs for PingOne, verify JWT tokens from Ping OAuth 2.0 authorization servers, and test CORS on your Ping-hosted endpoints.',
    whoFor: 'Ping Federate administrators, identity engineers, and integration developers',
    tools: [
      { name: 'SAML Decoder', route: '/tools/saml-decoder', desc: 'Decode SAML assertions from Ping Federate SP and IdP connections' },
      { name: 'OIDC URL Builder', route: '/tools/oidc-url-builder', desc: 'Build PingOne authorize URLs with PKCE and scopes' },
      { name: 'JWT Debugger', route: '/tools/jwt', desc: 'Verify Ping OAuth access tokens and refresh tokens' },
      { name: 'Base64 Encoder/Decoder', route: '/tools/base64', desc: 'Decode SAML messages and Ping API credentials' },
      { name: 'Hash Generator', route: '/tools/hash-text', desc: 'Generate signing secrets and verification hashes' },
      { name: 'TOTP Generator', route: '/tools/otp-code-generator', desc: 'Test PingID MFA factors' },
      { name: 'Cookie Analyzer', route: '/tools/cookie-analyzer', desc: 'Check Ping session cookie security flags' },
      { name: 'CORS Tester', route: '/tools/cors-tester', desc: 'Test CORS on Ping-hosted endpoints' },
      { name: 'JWT & Auth Toolkit', route: '/tools/jwt-suite', desc: 'Complete auth debugging suite with all identity tools' },
    ],
    tips: [
      'Ping Federate SAML responses use the POST binding by default — use the SAML Decoder on the form field value from your browser.',
      'For OAuth token debugging, the JWT Debugger verifies RS256 signatures with the public key from your Ping authorization server metadata.',
      'Use the OIDC Builder to construct the full /as/authorization.oauth2 URL with correct Ping parameter names.',
    ],
  },
]
