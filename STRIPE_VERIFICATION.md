# Stripe Checkout Flow Verification

## Test Date: March 22, 2026
## Status: Ready for End-to-End Testing

---

## Prerequisites Checklist

Before testing, ensure:

- [ ] Stripe account created
- [ ] Products created in Stripe Dashboard
- [ ] Price IDs added to `.env` files
- [ ] Backend server running (`port 18765`)
- [ ] Frontend built and deployed
- [ ] Webhook endpoint configured

---

## Test Flow

### 1. Pricing Page Load
```
URL: https://formatho.com/pricing
Expected: 3 pricing tiers displayed
          Monthly/Yearly toggle works
          CTA buttons visible
```

### 2. Subscribe Button Click
```
Action: Click "Start Pro Trial" or "Contact Sales" for Enterprise
Expected: 
  - If unauthenticated: Redirect to login/register
  - If authenticated: Create Stripe checkout session
```

### 3. Stripe Checkout
```
Expected: Redirect to Stripe Checkout page
          Shows product name and price
          Payment form appears
```

### 4. Payment Success
```
Action: Complete test payment (use Stripe test card)
Test Card: 4242 4242 4242 4242
Any future expiry date
Any CVC
Expected: Redirect to success page
          Subscription created in Stripe Dashboard
          User receives confirmation
```

### 5. Webhook Processing
```
Expected: Backend receives webhook
          Subscription saved to database
          User account updated to "Pro" tier
```

---

## Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0025 0000 3155 | Requires authentication |
| 4000 0000 0000 0002 | Decline |
| 4000 0000 0000 9995 | Insufficient funds |

---

## API Endpoints

### Create Checkout Session
```bash
POST /api/stripe/create-checkout-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "priceId": "price_xxx",
  "plan": "pro",
  "billingCycle": "monthly",
  "successUrl": "https://formatho.com/pricing?success=true",
  "cancelUrl": "https://formatho.com/pricing?canceled=true"
}

Response: { "sessionId": "cs_test_xxx" }
```

### Create Portal Session
```bash
POST /api/stripe/create-portal-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "returnUrl": "https://formatho.com/account"
}

Response: { "url": "https://billing.stripe.com/xxx" }
```

### Webhook Endpoint
```bash
POST /api/stripe/webhook
Stripe-Signature: <webhook_signature>
Content-Type: application/json

<stripe_event_payload>
```

---

## Verification Commands

### Check Backend Health
```bash
curl http://localhost:18765/health
# Expected: {"status":"ok","timestamp":"..."}
```

### Check Pricing Page
```bash
curl -s https://formatho.com/pricing | grep "Pro"
# Expected: HTML with Pro tier details
```

### Test Checkout Session (Authenticated)
```bash
# First get auth token
TOKEN=$(curl -s -X POST http://localhost:18765/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' | jq -r '.token')

# Create checkout session
curl -X POST http://localhost:18765/api/stripe/create-checkout-session \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "priceId": "price_test_xxx",
    "plan": "pro",
    "billingCycle": "monthly",
    "successUrl": "http://localhost:5173/pricing?success=true",
    "cancelUrl": "http://localhost:5173/pricing?canceled=true"
  }'
```

---

## Known Issues / TODO

1. **Missing:** Stripe API keys in `.env` (requires human setup)
2. **Missing:** Products in Stripe Dashboard (requires human setup)
3. **Missing:** Webhook endpoint in production (needs deployment)
4. **TODO:** Add subscription status to user model
5. **TODO:** Add feature gating based on subscription tier

---

## Test Results

| Step | Status | Notes |
|------|--------|-------|
| Pricing page loads | ✅ PASS | Built and deployed |
| Stripe composable | ✅ PASS | Created useStripe.ts |
| Checkout handler | ✅ PASS | stripe_handler.go created |
| API routes | ✅ PASS | Routes wired in server.go |
| Webhook handler | ✅ PASS | Event handlers implemented |
| E2E test | ⏳ BLOCKED | Requires Stripe API keys |

---

## Next Steps

1. **Human Action Required:** Set up Stripe products and get API keys
2. Add keys to `.env` files
3. Run full E2E test
4. Deploy to staging
5. Test in staging environment
6. Go live!

---

*Verification document created by Premchand 🏗️*
*Last updated: March 22, 2026 at 12:30 PM IST*
