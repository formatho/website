# Stripe Setup Guide - Formatho Monetization

## Overview
This guide walks through setting up Stripe products and price IDs for Formatho's subscription tiers.

## Products to Create

| Product | Price | Billing |
|---------|-------|---------|
| Formatho Free | $0 | N/A |
| Formatho Pro | $19/month or $190/year | Subscription |
| Formatho Enterprise | $99/month or $990/year | Subscription |

---

## Option 1: Stripe Dashboard Setup (Recommended)

### Step 1: Create Products

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click **"Add product"**

#### Product 1: Formatho Pro
```
Name: Formatho Pro
Description: For power users and professionals

Pricing:
- $19.00 / month (Recurring)
- $190.00 / year (Recurring)

Features to list:
- Access to 100+ developer tools
- Pro crypto tools (multi-chain keys, EVM)
- API access (10,000 requests/month)
- Priority email support
```

#### Product 2: Formatho Enterprise
```
Name: Formatho Enterprise
Description: For teams and organizations

Pricing:
- $99.00 / month (Recurring)
- $990.00 / year (Recurring)

Features to list:
- Everything in Pro
- Unlimited API requests
- Team collaboration (up to 50 users)
- SSO / SAML integration
- 99.9% SLA guarantee
```

### Step 2: Get Price IDs

After creating products, copy the **Price IDs** (start with `price_`) for each:

1. Go to each product
2. Copy the Price ID for monthly and yearly options
3. Update the `.env` file below

---

## Option 2: Stripe CLI Setup (Programmatic)

If you have Stripe CLI installed:

```bash
# Login to Stripe
stripe login

# Create Pro Product
stripe products create \
  --name="Formatho Pro" \
  --description="For power users and professionals"

# Create Pro Prices
stripe prices create \
  --product=prod_XXXXX \
  --unit-amount=1900 \
  --currency=usd \
  --recurring[interval]=month

stripe prices create \
  --product=prod_XXXXX \
  --unit-amount=19000 \
  --currency=usd \
  --recurring[interval]=year

# Create Enterprise Product
stripe products create \
  --name="Formatho Enterprise" \
  --description="For teams and organizations"

# Create Enterprise Prices
stripe prices create \
  --product=prod_YYYYY \
  --unit-amount=9900 \
  --currency=usd \
  --recurring[interval]=month

stripe prices create \
  --product=prod_YYYYY \
  --unit-amount=99000 \
  --currency=usd \
  --recurring[interval]=year
```

---

## Environment Variables

### Frontend (.env for formatho-site)
Create `/Users/studio/sandbox/formatho/formatho-site/.env`:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here

# Price IDs - Pro
VITE_STRIPE_PRO_MONTHLY_PRICE_ID=price_your_monthly_pro_id
VITE_STRIPE_PRO_YEARLY_PRICE_ID=price_your_yearly_pro_id

# Price IDs - Enterprise
VITE_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_your_monthly_enterprise_id
VITE_STRIPE_ENTERPRISE_YEARLY_PRICE_ID=price_your_yearly_enterprise_id
```

### Backend (.env for agent-orchestrator)
Create `/Users/studio/sandbox/formatho/agent-orchestrator/backend/.env`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_webhook_secret_here
FRONTEND_URL=https://formatho.com
```

**Get your API keys from:** https://dashboard.stripe.com/test/apikeys

---

## Webhook Setup

### Step 1: Create Webhook Endpoint
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://api.formatho.com/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

### Step 2: Test with Stripe CLI (Local Development)
```bash
# Forward webhooks to local server
stripe listen --forward-to localhost:18765/api/stripe/webhook

# This will print a webhook signing secret for testing
```

---

## Test Mode vs Production

| Environment | Use For | Keys From |
|-------------|---------|-----------|
| Test Mode | Development | https://dashboard.stripe.com/test/apikeys |
| Live Mode | Production | https://dashboard.stripe.com/apikeys |

**IMPORTANT:** Always test with test mode first!

---

## Verification Checklist

- [ ] Pro product created with monthly price ($19)
- [ ] Pro product created with yearly price ($190)
- [ ] Enterprise product created with monthly price ($99)
- [ ] Enterprise product created with yearly price ($990)
- [ ] All 4 price IDs copied to `.env` files
- [ ] Webhook endpoint created
- [ ] Webhook signing secret added to backend `.env`
- [ ] Test checkout completed successfully
- [ ] Subscription created in Stripe Dashboard

---

## Next Steps

1. Complete Stripe Dashboard setup
2. Update `.env` files with real price IDs
3. Run `npm run build` to rebuild frontend
4. Test checkout flow
5. Deploy to production

---

*Created by Premchand 🏗️*
*Date: March 22, 2026*
