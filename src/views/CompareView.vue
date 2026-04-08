<template>
  <div class="compare-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <span class="badge">Why Agent-Todo?</span>
          <h1 class="hero-title">
            The <span class="highlight">Privacy-First</span> Alternative to
            Workflow Automation Tools
          </h1>
          <p class="hero-subtitle">
            Built specifically for AI agents. No data harvesting. No vendor lock-in.
            Just clean, developer-friendly task management.
          </p>
          <div class="hero-cta">
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=compare_page" class="btn btn-primary">
              Try Agent-Todo Free
            </a>
            <a href="#comparison" class="btn btn-secondary">
              See Comparison
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Summary -->
    <section class="summary">
      <div class="container">
        <div class="summary-grid">
          <div class="summary-card">
            <div class="summary-icon">🔒</div>
            <h3>Privacy-First</h3>
            <p>Your data stays yours. No analytics, no tracking, no selling.</p>
          </div>
          <div class="summary-card">
            <div class="summary-icon">🤖</div>
            <h3>Agent-Native</h3>
            <p>Built for AI agents from day one. Not retrofitted.</p>
          </div>
          <div class="summary-card">
            <div class="summary-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Go backend with sub-millisecond response times.</p>
          </div>
          <div class="summary-card">
            <div class="summary-icon">🔓</div>
            <h3>Open Source</h3>
            <p>Audit the code. Self-host if you want. No black boxes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Comparison Table -->
    <section id="comparison" class="comparison">
      <div class="container">
        <h2>Feature Comparison</h2>
        <p class="section-subtitle">
          See how Agent-Todo stacks up against traditional workflow automation platforms
        </p>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="feature-header">Feature</th>
                <th class="agent-todo-header">
                  <div class="product-name">Agent-Todo</div>
                  <div class="product-tagline">For AI Agents</div>
                </th>
                <th>
                  <div class="product-name">Zapier</div>
                  <div class="product-tagline">General Automation</div>
                </th>
                <th>
                  <div class="product-name">n8n</div>
                  <div class="product-tagline">Workflow Automation</div>
                </th>
                <th>
                  <div class="product-name">Make</div>
                  <div class="product-tagline">Visual Automation</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Privacy & Data -->
              <tr class="category-row">
                <td colspan="5">
                  <span class="category-icon">🔒</span>
                  Privacy & Data
                </td>
              </tr>
              <tr>
                <td class="feature-name">No data harvesting</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">No usage analytics</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">Self-hostable</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">Open source</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>

              <!-- AI Agent Features -->
              <tr class="category-row">
                <td colspan="5">
                  <span class="category-icon">🤖</span>
                  AI Agent Support
                </td>
              </tr>
              <tr>
                <td class="feature-name">Native agent API</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">Agent authentication</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
              </tr>
              <tr>
                <td class="feature-name">Agent context tracking</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">Multi-agent coordination</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>

              <!-- Developer Experience -->
              <tr class="category-row">
                <td colspan="5">
                  <span class="category-icon">👨‍💻</span>
                  Developer Experience
                </td>
              </tr>
              <tr>
                <td class="feature-name">REST API</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
              </tr>
              <tr>
                <td class="feature-name">API-first design</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
              </tr>
              <tr>
                <td class="feature-name">SDK libraries</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
              </tr>
              <tr>
                <td class="feature-name">Webhook support</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
              </tr>

              <!-- Performance -->
              <tr class="category-row">
                <td colspan="5">
                  <span class="category-icon">⚡</span>
                  Performance
                </td>
              </tr>
              <tr>
                <td class="feature-name">Sub-100ms response</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
              </tr>
              <tr>
                <td class="feature-name">Edge deployment</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
              <tr>
                <td class="feature-name">Horizontal scaling</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
              </tr>

              <!-- Pricing -->
              <tr class="category-row">
                <td colspan="5">
                  <span class="category-icon">💰</span>
                  Pricing
                </td>
              </tr>
              <tr>
                <td class="feature-name">Free tier</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
              </tr>
              <tr>
                <td class="feature-name">Predictable pricing</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="partial"><span class="partial-icon">~</span></td>
              </tr>
              <tr>
                <td class="feature-name">No per-execution fees</td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
                <td class="check"><span class="check-icon">✓</span></td>
                <td class="cross"><span class="cross-icon">✗</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="legend">
          <div class="legend-item">
            <span class="check-icon">✓</span> Full support
          </div>
          <div class="legend-item">
            <span class="partial-icon">~</span> Partial/Limited
          </div>
          <div class="legend-item">
            <span class="cross-icon">✗</span> Not supported
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Comparison -->
    <section class="pricing-comparison">
      <div class="container">
        <h2>Pricing Comparison</h2>
        <p class="section-subtitle">
          Transparent pricing without surprises
        </p>

        <div class="pricing-grid">
          <!-- Agent-Todo -->
          <div class="pricing-card featured">
            <div class="pricing-badge">Recommended</div>
            <div class="pricing-header">
              <h3>Agent-Todo</h3>
              <div class="price">
                <span class="currency">$</span>
                <span class="amount">0</span>
                <span class="period">/month</span>
              </div>
              <p class="price-note">Free tier: 1000 tasks/month</p>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Unlimited agents</li>
              <li><span class="check">✓</span> Full API access</li>
              <li><span class="check">✓</span> No per-execution fees</li>
              <li><span class="check">✓</span> Open source</li>
              <li><span class="check">✓</span> Self-hostable</li>
              <li><span class="check">✓</span> No vendor lock-in</li>
            </ul>
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=compare_page" class="btn btn-primary btn-block">
              Get Started Free
            </a>
          </div>

          <!-- Zapier -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Zapier</h3>
              <div class="price">
                <span class="currency">$</span>
                <span class="amount">29</span>
                <span class="period">/month</span>
              </div>
              <p class="price-note">Starter: 750 tasks/month</p>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> 5000+ integrations</li>
              <li><span class="check">✓</span> Visual builder</li>
              <li><span class="cross">✗</span> Per-task pricing</li>
              <li><span class="cross">✗</span> No agent support</li>
              <li><span class="cross">✗</span> Closed source</li>
              <li><span class="cross">✗</span> Cloud-only</li>
            </ul>
            <a href="https://zapier.com" class="btn btn-secondary btn-block" target="_blank">
              Visit Zapier
            </a>
          </div>

          <!-- n8n -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>n8n</h3>
              <div class="price">
                <span class="currency">$</span>
                <span class="amount">20</span>
                <span class="period">/month</span>
              </div>
              <p class="price-note">Starter: 2500 workflows</p>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Self-hostable</li>
              <li><span class="check">✓</span> Open source</li>
              <li><span class="check">✓</span> Visual builder</li>
              <li><span class="cross">✗</span> No agent support</li>
              <li><span class="cross">✗</span> Complex setup</li>
              <li><span class="partial">~</span> Workflow-focused</li>
            </ul>
            <a href="https://n8n.io" class="btn btn-secondary btn-block" target="_blank">
              Visit n8n
            </a>
          </div>

          <!-- Make -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Make</h3>
              <div class="price">
                <span class="currency">$</span>
                <span class="amount">9</span>
                <span class="period">/month</span>
              </div>
              <p class="price-note">Core: 10,000 operations</p>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Visual builder</li>
              <li><span class="check">✓</span> Many integrations</li>
              <li><span class="cross">✗</span> Per-operation pricing</li>
              <li><span class="cross">✗</span> No agent support</li>
              <li><span class="cross">✗</span> Closed source</li>
              <li><span class="cross">✗</span> Cloud-only</li>
            </ul>
            <a href="https://make.com" class="btn btn-secondary btn-block" target="_blank">
              Visit Make
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Case Comparison -->
    <section class="use-cases">
      <div class="container">
        <h2>When to Choose Agent-Todo</h2>
        <div class="use-cases-grid">
          <div class="use-case">
            <div class="use-case-icon">🤖</div>
            <h3>AI Agent Workflows</h3>
            <p>
              Building autonomous AI agents that need persistent task tracking?
              Agent-Todo is purpose-built for this use case.
            </p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">🔒</div>
            <h3>Privacy-Sensitive Projects</h3>
            <p>
              Need to keep your data private? Self-host Agent-Todo or trust our
              zero-analytics policy.
            </p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">👨‍💻</div>
            <h3>Developer-First Teams</h3>
            <p>
              Prefer code over visual builders? Our API-first approach fits your
              workflow perfectly.
            </p>
          </div>
          <div class="use-case">
            <div class="use-case-icon">💰</div>
            <h3>Budget-Conscious Startups</h3>
            <p>
              Need predictable costs? No per-execution surprise bills. Free tier
              covers most use cases.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- When NOT to use -->
    <section class="not-for">
      <div class="container">
        <h2>When Another Tool Might Be Better</h2>
        <p class="section-subtitle">
          We're honest about our limitations. Agent-Todo might not be right if:
        </p>
        <div class="not-for-grid">
          <div class="not-for-card">
            <h4>You need 5000+ integrations</h4>
            <p>
              Zapier's massive integration library is unmatched. If you need to
              connect to obscure SaaS tools, they're your best bet.
            </p>
          </div>
          <div class="not-for-card">
            <h4>You prefer visual builders</h4>
            <p>
              n8n and Make excel at drag-and-drop workflow creation. Agent-Todo
              is API-first, not visual-first.
            </p>
          </div>
          <div class="not-for-card">
            <h4>You're not building AI agents</h4>
            <p>
              For traditional automation (email to Slack, form to CRM), Zapier
              or Make are more appropriate choices.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Ready to Give Your AI Agents a Memory?</h2>
        <p>
          Start free. No credit card required. Upgrade when you need more.
        </p>
        <div class="cta-buttons">
          <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=compare_page" class="btn btn-primary btn-large">
            Start Free Trial
          </a>
          <a href="https://github.com/formatho/agent-todo" class="btn btn-secondary btn-large" target="_blank">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed - static comparison page
</script>

<style scoped>
.compare-page {
  background: #fafafa;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 80px 0 100px;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero-title .highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

.btn-block {
  width: 100%;
}

/* Summary Section */
.summary {
  padding: 80px 0;
  background: white;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.summary-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.summary-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a1a2e;
}

.summary-card p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

/* Comparison Section */
.comparison {
  padding: 80px 0;
  background: #f8f9fa;
}

.comparison h2 {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 48px;
}

.comparison-table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.comparison-table th,
.comparison-table td {
  padding: 16px 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #1a1a2e;
}

.feature-header {
  text-align: left !important;
}

.agent-todo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.agent-todo-header .product-tagline {
  color: rgba(255, 255, 255, 0.8) !important;
}

.product-name {
  font-weight: 700;
  font-size: 16px;
}

.product-tagline {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.feature-name {
  text-align: left !important;
  font-weight: 500;
  color: #333;
}

.category-row td {
  background: #f0f0f0;
  font-weight: 600;
  color: #1a1a2e;
  text-align: left !important;
  padding: 12px 20px;
}

.category-icon {
  margin-right: 8px;
}

.check-icon,
.partial-icon,
.cross-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 14px;
}

.check .check-icon {
  background: #e8f5e9;
  color: #2e7d32;
}

.partial .partial-icon {
  background: #fff3e0;
  color: #f57c00;
}

.cross .cross-icon {
  background: #ffebee;
  color: #c62828;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

/* Pricing Section */
.pricing-comparison {
  padding: 80px 0;
  background: white;
}

.pricing-comparison h2 {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.pricing-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.pricing-card.featured {
  border: 2px solid #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.pricing-header {
  text-align: center;
  margin-bottom: 24px;
}

.pricing-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.price {
  margin-bottom: 8px;
}

.currency {
  font-size: 20px;
  color: #666;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
}

.period {
  font-size: 16px;
  color: #666;
}

.price-note {
  font-size: 14px;
  color: #888;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.pricing-features li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 15px;
}

.pricing-features li:last-child {
  border-bottom: none;
}

.pricing-features .check {
  color: #2e7d32;
  margin-right: 8px;
}

.pricing-features .cross {
  color: #c62828;
  margin-right: 8px;
}

.pricing-features .partial {
  color: #f57c00;
  margin-right: 8px;
}

/* Use Cases Section */
.use-cases {
  padding: 80px 0;
  background: #f8f9fa;
}

.use-cases h2 {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 48px;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.use-case {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.use-case:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.use-case-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.use-case h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.use-case p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

/* Not For Section */
.not-for {
  padding: 80px 0;
  background: white;
}

.not-for h2 {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.not-for-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.not-for-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 32px;
  border-left: 4px solid #f57c00;
}

.not-for-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.not-for-card p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 100px 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  text-align: center;
}

.cta h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .comparison h2,
  .pricing-comparison h2,
  .use-cases h2,
  .not-for h2 {
    font-size: 28px;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .cta h2 {
    font-size: 28px;
  }

  .cta-buttons {
    flex-direction: column;
  }
}
</style>
