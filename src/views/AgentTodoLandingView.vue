<template>
  <div class="agent-todo-landing">
    <!-- ============================================ -->
    <!-- HERO — Brutalist, Left-aligned, Purple        -->
    <!-- ============================================ -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <p class="hero-eyebrow">AGENT-TODO</p>
          <h1 class="hero-title">
            Task Management<br />Built for <span class="highlight">AI Agents</span>
          </h1>
          <p class="hero-subtitle">
            The persistent TODO system your AI workforce deserves. Stop losing context between sessions.
            Keep your agents organized and productive.
          </p>
          <div class="hero-cta">
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=agent_todo_landing" class="btn btn-primary">
              Get Started Free — 2 Min Setup
            </a>
            <a href="#demo" class="btn btn-secondary">
              Watch Demo
            </a>
          </div>
        </div>

        <!-- Stats: Bottom-anchored grid with vertical dividers -->
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Tasks Managed Daily</div>
          </div>
          <div class="stat">
            <div class="stat-number">50+</div>
            <div class="stat-label">Active Agents</div>
          </div>
          <div class="stat">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">Uptime</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- PROBLEM — White bg, 3-col grid, no cards      -->
    <!-- ============================================ -->
    <section class="problem">
      <div class="container">
        <p class="section-eyebrow">THE PROBLEM</p>
        <h2>The Problem with AI Agents</h2>
        <div class="problems-grid">
          <div class="problem-item">
            <span class="problem-index">01</span>
            <h3>Memory Loss</h3>
            <p>Agents forget tasks between sessions. No persistent memory = no accountability.</p>
          </div>
          <div class="problem-item">
            <span class="problem-index">02</span>
            <h3>Context Switching</h3>
            <p>Traditional task managers aren't designed for autonomous AI workers.</p>
          </div>
          <div class="problem-item">
            <span class="problem-index">03</span>
            <h3>No Visibility</h3>
            <p>Can't see what your agents are working on or track their progress.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section class="solution">
      <div class="container">
        <h2>The Solution: Agent-Todo</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">✓</div>
            <h3>Persistent Storage</h3>
            <p>Tasks survive agent restarts. Your AI workforce remembers everything.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔌</div>
            <h3>API-First Design</h3>
            <p>Full REST API for seamless integration with any AI framework.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with Go for speed. Sub-millisecond response times.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>API key authentication. Your data stays private.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📈</div>
            <h3>Analytics</h3>
            <p>Track agent performance, task completion rates, and productivity.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🌐</div>
            <h3>Multi-Agent Support</h3>
            <p>Manage hundreds of agents from a single dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <h2>How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up in seconds. No credit card required.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Get Your API Key</h3>
            <p>Generate an API key for your agents to use.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Integrate</h3>
            <p>Add agent-todo to your AI workflow with a simple API call.</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>Track & Manage</h3>
            <p>Monitor your agents' tasks and productivity in real-time.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="code-example">
      <div class="container">
        <h2>Simple Integration</h2>
        <div class="code-block">
          <pre><code># Create a task for your agent
curl -X POST https://todo.formatho.com/api/tasks \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Analyze user feedback",
    "priority": "high",
    "agent_id": "agent-123"
  }'

# Agent marks task complete
curl -X PATCH https://todo.formatho.com/api/tasks/{id}/status \
  -H "X-API-Key: your_api_key" \
  -d '{"status": "completed"}'</code></pre>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="pricing" id="pricing">
      <div class="container">
        <h2>Simple Pricing</h2>
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Free</h3>
            <div class="price">$0<span>/month</span></div>
            <ul class="features-list">
              <li>✓ 3 agents</li>
              <li>✓ 100 tasks/day</li>
              <li>✓ Basic analytics</li>
              <li>✓ Community support</li>
            </ul>
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=agent_todo_landing" class="btn btn-outline">
              Get Started
            </a>
          </div>
          <div class="pricing-card featured">
            <div class="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div class="price">$49<span>/month</span></div>
            <ul class="features-list">
              <li>✓ 25 agents</li>
              <li>✓ Unlimited tasks</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ Custom integrations</li>
            </ul>
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=agent_todo_landing" class="btn btn-primary">
              Get Started Free
            </a>
          </div>
          <div class="pricing-card">
            <h3>Enterprise</h3>
            <div class="price">Custom</div>
            <ul class="features-list">
              <li>✓ Unlimited agents</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
              <li>✓ Custom features</li>
              <li>✓ On-premise option</li>
            </ul>
            <a href="mailto:hello@formatho.com" class="btn btn-outline">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2>What Developers Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial">
            <p class="testimonial-text">
              "Finally, a task manager that understands AI agents. My agents are 10x more productive now."
            </p>
            <div class="testimonial-author">
              <strong>Alex Chen</strong>
              <span>AI Engineer at TechCorp</span>
            </div>
          </div>
          <div class="testimonial">
            <p class="testimonial-text">
              "The API is so simple. Integrated with our Claude agents in under an hour."
            </p>
            <div class="testimonial-author">
              <strong>Sarah Miller</strong>
              <span>Founder at AgentLabs</span>
            </div>
          </div>
          <div class="testimonial">
            <p class="testimonial-text">
              "Persistent tasks changed everything. No more agents forgetting what they were working on."
            </p>
            <div class="testimonial-author">
              <strong>Mike Johnson</strong>
              <span>CTO at DataDriven</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="container">
        <h2>Ready to Supercharge Your AI Agents?</h2>
        <p>Join developers who are already managing their AI workforce with agent-todo.</p>
        <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=agent_todo_landing" class="btn btn-primary btn-large">
          Get Started Free
        </a>
        <p class="cta-note">No credit card required • Setup in 5 minutes</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Agent-Todo Landing Page
// Created: March 24, 2026
</script>

<style scoped>
.agent-todo-landing {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.agent-todo-landing * {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #718096;
  margin-bottom: 0.5rem;
}

/* ===== HERO ===== */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0 0;
  display: flex;
  flex-direction: column;
}

.hero-inner {
  max-width: 700px;
}

.hero-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1;
  letter-spacing: -0.03em;
}

.highlight {
  background: linear-gradient(90deg, #ff9a3c, #ff6b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: none;
  cursor: pointer;
}

.btn-primary {
  background: white;
  color: #764ba2;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  opacity: 0.85;
}

.btn-large {
  padding: 1.5rem 3rem;
  font-size: 1rem;
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}

/* Stats — bottom-anchored grid with vertical dividers */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: auto;
}

.stat {
  padding: 2rem;
  text-align: left;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.stat:last-child {
  border-right: none;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  display: block;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.7;
  margin-top: 0.5rem;
}

/* ===== PROBLEM ===== */
.problem {
  padding: 5rem 0;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.problem h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 3rem;
  color: #1a202c;
  letter-spacing: -0.02em;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.problem-item {
  padding: 2rem;
  border-right: 1px solid #2d3748;
}

.problem-item:last-child {
  border-right: none;
}

.problem-index {
  font-size: 3rem;
  font-weight: 200;
  font-family: 'Monaco', 'Menlo', monospace;
  color: #cbd5e0;
  display: block;
  margin-bottom: 1rem;
  line-height: 1;
}

.problem-item h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  color: #1a202c;
}

.problem-item p {
  color: #718096;
  line-height: 1.6;
}

/* ===== SOLUTION ===== */
.solution {
  padding: 5rem 0;
}

.solution h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 1.5rem;
}

.feature-icon {
  font-size: 2rem;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.feature p {
  color: #718096;
  line-height: 1.6;
}

/* How It Works */
.how-it-works {
  padding: 5rem 0;
  background: #f8f9fa;
}

.how-it-works h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  text-align: center;
  padding: 2rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.step p {
  color: #718096;
}

/* Code Example */
.code-example {
  padding: 5rem 0;
}

.code-example h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.code-block {
  background: #1a202c;
  padding: 2rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Pricing */
.pricing {
  padding: 5rem 0;
  background: #f8f9fa;
}

.pricing h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  border: 1px solid #e2e8f0;
}

.pricing-card.featured {
  border: 2px solid #667eea;
}

.popular-badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 2rem;
}

.price span {
  font-size: 1rem;
  font-weight: normal;
  color: #718096;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features-list li {
  padding: 0.5rem 0;
  color: #4a5568;
}

/* Testimonials */
.testimonials {
  padding: 5rem 0;
}

.testimonials h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial {
  background: white;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

.testimonial-text {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
}

.testimonial-author strong {
  color: #2d3748;
  font-size: 1rem;
}

.testimonial-author span {
  color: #718096;
  font-size: 0.9rem;
}

/* Final CTA */
.final-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 0;
  text-align: center;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 900;
}

.final-cta p {
  font-size: 1.2rem;
  opacity: 0.95;
  margin-bottom: 2rem;
}

.cta-note {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 1rem;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-cta {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .stat {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat:last-child {
    border-bottom: none;
  }

  .problems-grid {
    grid-template-columns: 1fr;
  }

  .problem-item {
    border-right: none;
    border-bottom: 1px solid #2d3748;
  }

  .problem-item:last-child {
    border-bottom: none;
  }
}
</style>
