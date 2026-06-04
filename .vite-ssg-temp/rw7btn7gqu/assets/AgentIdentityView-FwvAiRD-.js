import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Sparkles, Bot, Copy } from "lucide-vue-next";
import { e as _sfc_main$1, c as _sfc_main$2, h as _sfc_main$3, _ as _export_sfc } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
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
  __name: "AgentIdentityView",
  __ssrInlineRender: true,
  setup(__props) {
    const prefixes = [
      "Nexus",
      "Cipher",
      "Echo",
      "Protocol",
      "Quantum",
      "Aether",
      "Hyperion",
      "Chronos",
      "Zephyr",
      "Apex",
      "Zenith",
      "Vortex",
      "Prism",
      "Nebula",
      "Cipher-X",
      "Neural",
      "Synapse",
      "Cortex",
      "Stellar",
      "Void",
      "Astra",
      "Helix",
      "Fusion",
      "Delta",
      "Gamma",
      "Sigma",
      "Omega",
      "Alpha",
      "Beta"
    ];
    const roles = [
      "Senior Cloud Architect",
      "Behavioral Psychologist",
      "Rust Performance Engineer",
      "Creative Scriptwriter",
      "Data Science Lead",
      "DevOps Specialist",
      "UX Research Analyst",
      "Machine Learning Engineer",
      "Cybersecurity Expert",
      "Full-Stack Developer",
      "Product Manager",
      "Systems Administrator",
      "Blockchain Developer",
      "AI Research Scientist",
      "Database Administrator",
      "Network Security Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Cloud Solutions Architect",
      "DevSecOps Engineer",
      "Mobile App Developer",
      "Game Developer",
      "Data Engineer",
      "ML Ops Engineer",
      "SRE Engineer"
    ];
    const traits = [
      "Meticulous & Pedantic",
      "Highly Encouraging & Empathetic",
      "Sarcastic yet Brilliant",
      "Concise & Direct",
      "Analytical & Detail-Oriented",
      "Creative & imaginative",
      "Patient & Understanding",
      "Technical & Precise",
      "Friendly & approachable",
      "Professional & Formal",
      "Casual & Relaxed",
      "Witty & Humorous",
      "Methodical & Structured",
      "Innovative & Forward-Thinking",
      "Calm & Composed",
      "Energetic & enthusiastic",
      "Skeptical & questioning",
      "Diplomatic & tactful"
    ];
    const capabilities = [
      "debug complex software issues",
      "optimize database performance",
      "design scalable cloud architecture",
      "write clean, maintainable code",
      "analyze user behavior patterns",
      "implement security best practices",
      "create intuitive user interfaces",
      "deploy and manage CI/CD pipelines",
      "develop machine learning models",
      "conduct code reviews",
      "solve performance bottlenecks",
      "automate repetitive tasks",
      "provide technical mentorship",
      "architect distributed systems",
      "integrate third-party APIs",
      "build real-time applications",
      "optimize mobile app performance",
      "conduct security audits",
      "implement data encryption",
      "design microservices architecture"
    ];
    const constraints = [
      "Never uses bullet points",
      "Explains like I'm five",
      "Always provides code examples",
      "Uses military terminology",
      "Always includes analogies",
      "Prefers short, direct answers",
      "Uses technical jargon",
      "Never uses contractions",
      "Always provides step-by-step instructions",
      "Uses British English spelling",
      "Includes relevant emojis",
      "Never mentions AI or AI-related terms",
      "Always provides citations",
      "Uses bullet points only",
      "Responds in haiku format",
      "Always provides pros and cons",
      "Uses historical references",
      "Includes performance metrics",
      "Provides alternative solutions",
      "Uses formal academic tone",
      "Encourages critical thinking"
    ];
    const generatedAgent = ref(null);
    const copySuccess = ref(false);
    const isGenerating = ref(false);
    const generateAgent = () => {
      isGenerating.value = true;
      setTimeout(() => {
        const selectedName = prefixes[Math.floor(Math.random() * prefixes.length)];
        const selectedRole = roles[Math.floor(Math.random() * roles.length)];
        const selectedTrait = traits[Math.floor(Math.random() * traits.length)];
        const selectedCapability = capabilities[Math.floor(Math.random() * capabilities.length)];
        const selectedConstraint = constraints[Math.floor(Math.random() * constraints.length)];
        const systemPrompt = `You are ${selectedName}, a ${selectedRole}. Your personality is ${selectedTrait}. Your primary goal is to help the user with ${selectedCapability}. When responding, you must follow these rules: ${selectedConstraint}.`;
        generatedAgent.value = {
          name: selectedName,
          role: selectedRole,
          trait: selectedTrait,
          capability: selectedCapability,
          constraint: selectedConstraint,
          systemPrompt
        };
        isGenerating.value = false;
      }, 300);
    };
    const copySystemPrompt = async () => {
      if (!generatedAgent.value) return;
      try {
        await navigator.clipboard.writeText(generatedAgent.value.systemPrompt);
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy:", err);
        const textArea = document.createElement("textarea");
        textArea.value = generatedAgent.value.systemPrompt;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2e3);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))} data-v-027326ff>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center justify-between" data-v-027326ff><h1 class="text-3xl font-bold tracking-tight" data-v-027326ff>AI Agent Persona Generator</h1></div><div class="glass-card p-4 text-center border-l-4 border-primary" data-v-027326ff><div class="flex items-center justify-center gap-2 text-sm text-muted-foreground" data-v-027326ff><span class="text-xl" data-v-027326ff>🔒</span><span class="font-medium" data-v-027326ff>Privacy Check:</span><span data-v-027326ff>This tool runs 100% in your browser. No data is sent to any AI service.</span></div></div><div class="flex justify-center" data-v-027326ff>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        size: "lg",
        onClick: generateAgent,
        disabled: isGenerating.value,
        "aria-label": "Initialize new agent identity",
        class: "px-8 py-6 text-lg gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Sparkles), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isGenerating.value ? "Initializing..." : "Initialize New Agent")}`);
          } else {
            return [
              createVNode(unref(Sparkles), { class: "h-5 w-5" }),
              createTextVNode(" " + toDisplayString(isGenerating.value ? "Initializing..." : "Initialize New Agent"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (generatedAgent.value) {
        _push(`<div class="flex-1 flex flex-col gap-6 min-h-0" data-v-027326ff><div class="glass-card p-6 border-2 border-primary/30" data-v-027326ff><div class="flex items-center gap-3 mb-6" data-v-027326ff><div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center" data-v-027326ff>`);
        _push(ssrRenderComponent(unref(Bot), { class: "text-gray-900" }, null, _parent));
        _push(`</div><div data-v-027326ff><h2 class="text-gray-900" data-v-027326ff>${ssrInterpolate(generatedAgent.value.name)}</h2><p class="text-sm text-muted-foreground" data-v-027326ff>${ssrInterpolate(generatedAgent.value.role)}</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-027326ff><div class="space-y-1" data-v-027326ff><div class="text-xs font-medium text-muted-foreground uppercase tracking-wider" data-v-027326ff>Personality</div><div class="text-sm font-medium" data-v-027326ff>${ssrInterpolate(generatedAgent.value.trait)}</div></div><div class="space-y-1" data-v-027326ff><div class="text-xs font-medium text-muted-foreground uppercase tracking-wider" data-v-027326ff>Capability</div><div class="text-sm font-medium" data-v-027326ff>${ssrInterpolate(generatedAgent.value.capability)}</div></div><div class="space-y-1" data-v-027326ff><div class="text-xs font-medium text-muted-foreground uppercase tracking-wider" data-v-027326ff>Constraint</div><div class="text-sm font-medium" data-v-027326ff>${ssrInterpolate(generatedAgent.value.constraint)}</div></div></div></div><div class="glass-card flex-1 flex flex-col min-h-0" data-v-027326ff><div class="flex items-center justify-between p-4 pb-3" data-v-027326ff><h3 class="text-sm font-medium" data-v-027326ff>System Prompt</h3>`);
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "outline",
          size: "sm",
          onClick: copySystemPrompt,
          "aria-label": "Copy system prompt to clipboard",
          class: "gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(copySuccess.value ? "Copied!" : "Copy System Prompt")}`);
            } else {
              return [
                createVNode(unref(Copy), { class: "h-4 w-4" }),
                createTextVNode(" " + toDisplayString(copySuccess.value ? "Copied!" : "Copy System Prompt"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-1 min-h-0 p-4 pt-0" data-v-027326ff>`);
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          readonly: "",
          "model-value": generatedAgent.value.systemPrompt,
          "aria-label": "Generated system prompt",
          class: "h-full resize-none font-mono text-sm bg-muted/50"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-027326ff><div class="glass-card p-12 max-w-md text-center" data-v-027326ff>`);
        _push(ssrRenderComponent(unref(Bot), { class: "text-gray-900" }, null, _parent));
        _push(`<h3 class="text-xl font-bold mb-2" data-v-027326ff>Ready to Generate</h3><p class="text-sm text-muted-foreground" data-v-027326ff> Click &quot;Initialize New Agent&quot; to create a unique AI persona with custom traits, capabilities, and system prompts. </p></div></div>`);
      }
      _push(`<div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border" data-v-027326ff><h2 class="text-xl font-bold mb-4" data-v-027326ff>Related Tools</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-027326ff><a href="/local-token-counter" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-027326ff><h3 class="font-semibold mb-2" data-v-027326ff>Local Token Counter</h3><p class="text-sm text-muted-foreground" data-v-027326ff>Count tokens for GPT-4o with 100% privacy</p></a><a href="/agent-orchestrator" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-027326ff><h3 class="font-semibold mb-2" data-v-027326ff>Agent Orchestrator</h3><p class="text-sm text-muted-foreground" data-v-027326ff>Manage and deploy AI agents locally</p></a><a href="/tools/text-statistics" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-027326ff><h3 class="font-semibold mb-2" data-v-027326ff>Text Statistics</h3><p class="text-sm text-muted-foreground" data-v-027326ff>Analyze text with detailed metrics</p></a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/tools/AgentIdentityView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgentIdentityView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-027326ff"]]);
export {
  AgentIdentityView as default
};
