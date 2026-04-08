<template>
  <div class="agent-todo-landing">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Task Management Built for
            <span class="highlight">AI Agents</span>
          </h1>
          <p class="hero-subtitle">
            The persistent TODO system your AI workforce deserves. Stop losing context between sessions.
            Keep your agents organized and productive.
          </p>
          <div class="hero-cta">
            <a href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=agent_todo_landing" class="btn btn-primary">
              Start Free Trial
            </a>
            <a href="#demo" class="btn btn-secondary">
              Watch Demo
            </a>
          </div>
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
      </div>
    </section>

    <!-- Problem Section -->
    <section class="problem">
      <div class="container">
        <h2>The Problem with AI Agents</h2>
        <div class="problems-grid">
          <div class="problem-card">
            <div class="problem-icon">🧠</div>
            <h3>Memory Loss</h3>
            <p>Agents forget tasks between sessions. No persistent memory = no accountability.</p>
          </div>
          <div class="problem-card">
            <div class="problem-icon">🔄</div>
            <h3>Context Switching</h3>
            <p>Traditional task managers aren't designed for autonomous AI workers.</p>
          </div>
          <div class="problem-card">
            <div class="problem-icon">📊</div>
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
              Start Free Trial
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
          Start Free Trial
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(90deg, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-large {
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
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

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Problem Section */
.problem {
  padding: 5rem 0;
  background: #f8f9fa;
}

.problem h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.problem-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.problem-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.problem-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.problem-card p {
  color: #718096;
  line-height: 1.6;
}

/* Solution Section */
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
  border-radius: 50%;
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
  border-radius: 12px;
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
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
}

.pricing-card.featured {
  border: 3px solid #667eea;
  transform: scale(1.05);
}

.popular-badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: -12px;
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
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .pricing-card.featured {
    transform: none;
  }
}
</style>
