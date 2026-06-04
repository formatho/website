import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useSEO, _ as _export_sfc } from "../main.mjs";
import { u as useStructuredData } from "./useStructuredData-TTou69kz.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "lucide-vue-next";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
import "radix-vue";
import "class-variance-authority";
import "unified";
import "remark-parse";
import "remark-gfm";
import "remark-rehype";
import "rehype-raw";
import "rehype-highlight";
import "rehype-stringify";
import "docx";
import "file-saver";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgentTodoLandingView",
  __ssrInlineRender: true,
  setup(__props) {
    useSEO({
      title: "Agent-Todo: Task Management Built for AI Agents | Formatho",
      description: "Persistent TODO system for AI agents. Stop losing context between sessions. Keep your AI workforce organized with task queues, priority management, and real-time tracking. Free to start.",
      keywords: ["AI agent tasks", "agent todo", "AI task management", "agent orchestration", "persistent task queue", "AI workflow", "agent productivity"],
      ogType: "website",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Agent-Todo by Formatho",
        description: "Persistent task management system built specifically for AI agents. Task queues, priority management, real-time tracking.",
        url: "https://formatho.com/tools/agent-todo",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        creator: {
          "@type": "Organization",
          name: "Formatho",
          url: "https://formatho.com"
        }
      }
    });
    const { addBreadcrumbStructuredData } = useStructuredData();
    addBreadcrumbStructuredData([
      { name: "Home", url: "https://formatho.com/tools/" },
      { name: "Agent-Todo", url: "https://formatho.com/tools/agent-todo" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "agent-todo-landing" }, _attrs))} data-v-94aacd42><section class="hero" data-v-94aacd42><div class="container" data-v-94aacd42><div class="hero-inner" data-v-94aacd42><p class="hero-eyebrow" data-v-94aacd42>AGENT-TODO</p><h1 class="hero-title" data-v-94aacd42> Task Management<br data-v-94aacd42>Built for <span class="highlight" data-v-94aacd42>AI Agents</span></h1><p class="hero-subtitle" data-v-94aacd42> The persistent TODO system your AI workforce deserves. Stop losing context between sessions. Keep your agents organized and productive. </p><div class="hero-cta" data-v-94aacd42><a href="https://todo.formatho.com/?utm_source=formatho&amp;utm_medium=website&amp;utm_campaign=agent_todo_landing" class="btn btn-primary" data-v-94aacd42> Get Started Free — 2 Min Setup </a><a href="#demo" class="btn btn-secondary" data-v-94aacd42> Watch Demo </a></div></div><div class="hero-stats" data-v-94aacd42><div class="stat" data-v-94aacd42><div class="stat-number" data-v-94aacd42>1000+</div><div class="stat-label" data-v-94aacd42>Tasks Managed Daily</div></div><div class="stat" data-v-94aacd42><div class="stat-number" data-v-94aacd42>50+</div><div class="stat-label" data-v-94aacd42>Active Agents</div></div><div class="stat" data-v-94aacd42><div class="stat-number" data-v-94aacd42>99.9%</div><div class="stat-label" data-v-94aacd42>Uptime</div></div></div></div></section><section class="problem" data-v-94aacd42><div class="container" data-v-94aacd42><p class="section-eyebrow" data-v-94aacd42>THE PROBLEM</p><h2 data-v-94aacd42>The Problem with AI Agents</h2><div class="problems-grid" data-v-94aacd42><div class="problem-item" data-v-94aacd42><span class="problem-index" data-v-94aacd42>01</span><h3 data-v-94aacd42>Memory Loss</h3><p data-v-94aacd42>Agents forget tasks between sessions. No persistent memory = no accountability.</p></div><div class="problem-item" data-v-94aacd42><span class="problem-index" data-v-94aacd42>02</span><h3 data-v-94aacd42>Context Switching</h3><p data-v-94aacd42>Traditional task managers aren&#39;t designed for autonomous AI workers.</p></div><div class="problem-item" data-v-94aacd42><span class="problem-index" data-v-94aacd42>03</span><h3 data-v-94aacd42>No Visibility</h3><p data-v-94aacd42>Can&#39;t see what your agents are working on or track their progress.</p></div></div></div></section><section class="solution" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>The Solution: Agent-Todo</h2><div class="spec-matrix" data-v-94aacd42><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>[ + ]</span><h3 data-v-94aacd42>Persistent Storage</h3><p data-v-94aacd42>Tasks survive agent restarts. Your AI workforce remembers everything.</p></div><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>&gt;_</span><h3 data-v-94aacd42>API-First Design</h3><p data-v-94aacd42>Full REST API for seamless integration with any AI framework.</p></div><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>///</span><h3 data-v-94aacd42>Lightning Fast</h3><p data-v-94aacd42>Built with Go for speed. Sub-millisecond response times.</p></div><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>[ # ]</span><h3 data-v-94aacd42>Secure</h3><p data-v-94aacd42>API key authentication. Your data stays private.</p></div><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>[ % ]</span><h3 data-v-94aacd42>Analytics</h3><p data-v-94aacd42>Track agent performance, task completion rates, and productivity.</p></div><div class="spec-cell" data-v-94aacd42><span class="spec-symbol" data-v-94aacd42>[ @ ]</span><h3 data-v-94aacd42>Multi-Agent Support</h3><p data-v-94aacd42>Manage hundreds of agents from a single dashboard.</p></div></div></div></section><section class="how-it-works" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>How It Works</h2><div class="gantt-track" data-v-94aacd42><div class="gantt-node" data-v-94aacd42><div class="gantt-square" data-v-94aacd42>1</div><div class="gantt-label" data-v-94aacd42><h3 data-v-94aacd42>Create an Account</h3><p data-v-94aacd42>Sign up in seconds. No credit card required.</p></div></div><div class="gantt-node" data-v-94aacd42><div class="gantt-square" data-v-94aacd42>2</div><div class="gantt-label" data-v-94aacd42><h3 data-v-94aacd42>Get Your API Key</h3><p data-v-94aacd42>Generate an API key for your agents to use.</p></div></div><div class="gantt-node" data-v-94aacd42><div class="gantt-square" data-v-94aacd42>3</div><div class="gantt-label" data-v-94aacd42><h3 data-v-94aacd42>Integrate</h3><p data-v-94aacd42>Add agent-todo to your AI workflow with a simple API call.</p></div></div><div class="gantt-node" data-v-94aacd42><div class="gantt-square" data-v-94aacd42>4</div><div class="gantt-label" data-v-94aacd42><h3 data-v-94aacd42>Track &amp; Manage</h3><p data-v-94aacd42>Monitor your agents&#39; tasks and productivity in real-time.</p></div></div></div></div></section><section class="code-example" id="demo" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>Simple Integration</h2><div class="terminal" data-v-94aacd42><div class="terminal-bar" data-v-94aacd42><span class="terminal-dot" data-v-94aacd42></span><span class="terminal-dot" data-v-94aacd42></span><span class="terminal-dot" data-v-94aacd42></span></div><div class="terminal-body" data-v-94aacd42><pre data-v-94aacd42><code data-v-94aacd42># Create a task for your agent
curl -X POST https://todo.formatho.com/api/tasks \\
  -H &quot;X-API-Key: your_api_key&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -d &#39;{
    &quot;title&quot;: &quot;Analyze user feedback&quot;,
    &quot;priority&quot;: &quot;high&quot;,
    &quot;agent_id&quot;: &quot;agent-123&quot;
  }&#39;

# Agent marks task complete
curl -X PATCH https://todo.formatho.com/api/tasks/{id}/status \\
  -H &quot;X-API-Key: your_api_key&quot; \\
  -d &#39;{&quot;status&quot;: &quot;completed&quot;}&#39;</code></pre></div></div></div></section><section class="pricing" id="pricing" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>Simple Pricing</h2><div class="pricing-brutal-grid" data-v-94aacd42><div class="pricing-col" data-v-94aacd42><h3 data-v-94aacd42>Free</h3><div class="price" data-v-94aacd42>$0<span data-v-94aacd42>/month</span></div><ul class="features-list" data-v-94aacd42><li data-v-94aacd42>+ 3 agents</li><li data-v-94aacd42>+ 100 tasks/day</li><li data-v-94aacd42>+ Basic analytics</li><li data-v-94aacd42>+ Community support</li></ul><a href="https://todo.formatho.com/?utm_source=formatho&amp;utm_medium=website&amp;utm_campaign=agent_todo_landing" class="btn btn-outline" data-v-94aacd42> Get Started </a></div><div class="pricing-col pricing-col-featured" data-v-94aacd42><h3 data-v-94aacd42>Pro</h3><div class="price" data-v-94aacd42>$49<span data-v-94aacd42>/month</span></div><ul class="features-list" data-v-94aacd42><li data-v-94aacd42>+ 25 agents</li><li data-v-94aacd42>+ Unlimited tasks</li><li data-v-94aacd42>+ Advanced analytics</li><li data-v-94aacd42>+ Priority support</li><li data-v-94aacd42>+ Custom integrations</li></ul><a href="https://todo.formatho.com/?utm_source=formatho&amp;utm_medium=website&amp;utm_campaign=agent_todo_landing" class="btn btn-white" data-v-94aacd42> Get Started Free </a></div><div class="pricing-col" data-v-94aacd42><h3 data-v-94aacd42>Enterprise</h3><div class="price" data-v-94aacd42>Custom</div><ul class="features-list" data-v-94aacd42><li data-v-94aacd42>+ Unlimited agents</li><li data-v-94aacd42>+ Dedicated support</li><li data-v-94aacd42>+ SLA guarantee</li><li data-v-94aacd42>+ Custom features</li><li data-v-94aacd42>+ On-premise option</li></ul><a href="mailto:hello@formatho.com" class="btn btn-outline" data-v-94aacd42> Contact Sales </a></div></div></div></section><section class="testimonials" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>What Developers Say</h2><div class="quotes-list" data-v-94aacd42><div class="quote" data-v-94aacd42><span class="quote-mark" data-v-94aacd42>“</span><p class="quote-text" data-v-94aacd42>Finally, a task manager that understands AI agents. My agents are 10x more productive now.</p><div class="quote-author" data-v-94aacd42><strong data-v-94aacd42>Alex Chen</strong> — AI Engineer at TechCorp </div></div><div class="quote" data-v-94aacd42><span class="quote-mark" data-v-94aacd42>“</span><p class="quote-text" data-v-94aacd42>The API is so simple. Integrated with our Claude agents in under an hour.</p><div class="quote-author" data-v-94aacd42><strong data-v-94aacd42>Sarah Miller</strong> — Founder at AgentLabs </div></div><div class="quote" data-v-94aacd42><span class="quote-mark" data-v-94aacd42>“</span><p class="quote-text" data-v-94aacd42>Persistent tasks changed everything. No more agents forgetting what they were working on.</p><div class="quote-author" data-v-94aacd42><strong data-v-94aacd42>Mike Johnson</strong> — CTO at DataDriven </div></div></div></div></section><section class="final-cta" data-v-94aacd42><div class="container" data-v-94aacd42><h2 data-v-94aacd42>Ready to Supercharge Your AI Agents?</h2><p data-v-94aacd42>Join developers who are already managing their AI workforce with agent-todo.</p><a href="https://todo.formatho.com/?utm_source=formatho&amp;utm_medium=website&amp;utm_campaign=agent_todo_landing" class="btn btn-white btn-large" data-v-94aacd42> Get Started Free </a><p class="cta-note" data-v-94aacd42>No credit card required · Setup in 5 minutes</p></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AgentTodoLandingView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgentTodoLandingView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94aacd42"]]);
export {
  AgentTodoLandingView as default
};
