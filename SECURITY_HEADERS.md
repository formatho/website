# Security Headers Implementation

This document describes the security headers implemented for the Formatho platform.

## Implemented Headers

### 1. Content Security Policy (CSP) - Report-Only Mode
**Status:** Monitoring mode (Report-Only)

The CSP is currently in report-only mode to monitor violations before enforcing strict policy. After confirming no violations are present, change from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.

**Policy:**
```
default-src 'self' 'unsafe-inline' 'unsafe-eval'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://cdn.jsdelivr.net https://unpkg.com https://cloud.umami.is
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com
img-src 'self' data: blob: https: http:
font-src 'self' data: https://fonts.gstatic.com
connect-src 'self' https://www.google-analytics.com https://cloud.umami.is https://*.li.fi https://li.fi https://remix.ethereum.org
frame-src 'self' https://www.google.com
base-uri 'self'
form-action 'self'
frame-ancestors 'self'
```

**Whitelisted External Sources:**
- Google Analytics & Tag Manager
- AdSense (googleads.g.doubleclick.net)
- Google Fonts
- Cloudflare CDN (unpkg.com, jsdelivr.net)
- Umami Analytics
- LI.FI (for blockchain swap routing)
- Remix IDE (for Solidity development)

### 2. Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Purpose:** Forces all connections to HTTPS for 1 year, including all subdomains, and enables HSTS preloading for browser hardening.

**Note:** Your hosting provider must perform an immediate HTTPS redirect at the network edge (HTTP → HTTPS) for this to take effect on first visit.

### 3. X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```

**Purpose:** Prevents MIME type sniffing, reducing exploit vectors.

### 4. X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```

**Purpose:** Prevents clickjacking attacks by only allowing framing from same origin.

### 5. X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```

**Purpose:** Enables browser XSS filtering (legacy protection for older browsers).

### 6. Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```

**Purpose:** Controls how much referrer information is sent to external sites, protecting user privacy.

### 7. Permissions-Policy
```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()
```

**Purpose:** Disables access to sensitive browser features unless explicitly needed.

## Deployment

### Netlify
Headers are configured in `public/_headers` and automatically applied.

### Vercel
Headers are configured in `vercel.json` and automatically applied.

### Other Platforms
Add the headers to your server configuration or reverse proxy (nginx, Apache, etc.).

## Monitoring CSP Violations

To monitor CSP violations:
1. Check browser console for CSP reports
2. Set up a CSP reporting endpoint at `/csp-report`
3. After 2 weeks of monitoring with no violations, change to enforcement mode

### To Enable Enforcement Mode
Change `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in:
- `public/_headers` (Netlify)
- `vercel.json` (Vercel)

## Security Principles

These headers implement the following security principles:
1. **Zero Trust:** Only allow scripts from explicitly whitelisted sources
2. **HTTPS First:** Force encrypted connections everywhere
3. **Privacy First:** Minimize data leakage through referrer control
4. **Least Privilege:** Disable unnecessary browser features

## References
- [MDN HTTP Headers Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
