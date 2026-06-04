import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderVNode, ssrRenderAttr } from "vue/server-renderer";
import { Bot, CheckCircle2, LayoutDashboard, Lock, Code, Shield, Github, Download, ListTodo, Calendar, Settings, Cpu, Wand2, MessageSquare } from "lucide-vue-next";
import { _ as _sfc_main$3, d as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$1 } from "./Badge-wTrEnT9H.js";
import { c as _sfc_main$2, _ as _export_sfc } from "../main.mjs";
import "class-variance-authority";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
import "radix-vue";
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
  __name: "AgentOrchestratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const coreFeatures = [
      {
        icon: LayoutDashboard,
        title: "Desktop App (Electron)",
        description: "Native desktop application with premium light theme UI. Manage agents visually - no command line required. Works on macOS, Windows, and Linux.",
        status: "Complete"
      },
      {
        icon: Bot,
        title: "Agent Pool Management",
        description: "Run multiple agents concurrently with resource limits. Create, pause, resume, and kill agents from dashboard. Full CRUD operations.",
        status: "Complete"
      },
      {
        icon: ListTodo,
        title: "Persistent TODO Queue",
        description: "Agents work through tasks autonomously. TODOs survive restarts with SQLite persistence. Track progress in real-time with priorities.",
        status: "Complete"
      },
      {
        icon: Calendar,
        title: "Cron Scheduling",
        description: "Schedule agents to run at specific times with cron syntax. Daily reports, weekly summaries, monthly audits - fully automated.",
        status: "Complete"
      },
      {
        icon: Cpu,
        title: "Multi-LLM Support",
        description: "Configure different LLMs for different agents. Supports OpenAI, Anthropic, LM Studio, Ollama, and custom providers. Per-agent model selection.",
        status: "Complete"
      },
      {
        icon: Settings,
        title: "Skill System",
        description: "Give agents real capabilities: file operations, web scraping, API calls, notifications. Fine-grained permissions system.",
        status: "Complete"
      },
      {
        icon: Wand2,
        title: "REST API + WebSocket",
        description: "44 REST API endpoints for full control. WebSocket for real-time updates. SQLite database for persistence.",
        status: "Complete"
      },
      {
        icon: MessageSquare,
        title: "Optional Chat Interface",
        description: "Talk to agents when needed. Provide input, debug behavior, or just check in. Chat is optional - agents work in background.",
        status: "Planned"
      },
      {
        icon: Lock,
        title: "100% Local-First",
        description: "Your data stays on your machine. No cloud, no tracking, complete privacy. Works offline with local LLMs.",
        status: "Core"
      }
    ];
    const skills = [
      { name: "file.read/write", description: "Read and write local files" },
      { name: "web.fetch/search", description: "Scrape websites, search the web" },
      { name: "shell.run", description: "Execute shell commands (sandboxed)" },
      { name: "http.get/post", description: "Make HTTP requests to APIs" },
      { name: "notify.desktop", description: "Send desktop notifications" },
      { name: "git.clone/push", description: "Git operations" },
      { name: "image.generate", description: "Generate images (ComfyUI/DALL-E)" },
      { name: "email.send", description: "Send emails via SMTP" }
    ];
    const libraries = [
      {
        name: "go-llm-client",
        description: "Unified LLM interface (OpenAI, Anthropic, Ollama)",
        status: "Complete",
        stars: "6.5k",
        lines: "6,479",
        tests: "92+"
      },
      {
        name: "go-agent-pool",
        description: "Agent lifecycle & resource management",
        status: "Complete",
        stars: "-",
        lines: "1,511",
        tests: "21"
      },
      {
        name: "go-agent-skills",
        description: "Skill system with permissions",
        status: "Complete",
        stars: "-",
        lines: "1,761",
        tests: "22"
      },
      {
        name: "go-todo-queue",
        description: "Persistent TODO queue (SQLite)",
        status: "Complete",
        stars: "-",
        lines: "6,500",
        tests: "20+"
      },
      {
        name: "go-cron-agents",
        description: "Cron scheduler for agents",
        status: "Complete",
        stars: "-",
        lines: "3,365",
        tests: "28"
      },
      {
        name: "go-agent-config",
        description: "YAML/TOML/JSON configuration",
        status: "Complete",
        stars: "-",
        lines: "2,866",
        tests: "25"
      }
    ];
    const stats = [
      { label: "Lines of Code", value: "29,000+" },
      { label: "Unit Tests", value: "200+" },
      { label: "API Endpoints", value: "44" },
      { label: "UI Components", value: "15+" },
      { label: "Platforms", value: "3" },
      { label: "LLM Providers", value: "4+" }
    ];
    const downloads = [
      {
        platform: "macOS (Intel)",
        icon: "🍎",
        arch: "x64",
        format: "DMG",
        size: "~150MB",
        available: true
      },
      {
        platform: "macOS (Apple Silicon)",
        icon: "🍎",
        arch: "arm64",
        format: "DMG",
        size: "~150MB",
        available: true
      },
      {
        platform: "Windows",
        icon: "🪟",
        arch: "x64",
        format: "EXE",
        size: "~140MB",
        available: true
      },
      {
        platform: "Linux",
        icon: "🐧",
        arch: "x64",
        format: "AppImage",
        size: "~160MB",
        available: true
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full overflow-y-auto bg-background" }, _attrs))} data-v-3cad3710><section class="border-b border-border bg-gradient-to-b from-muted/20 via-muted/10 to-background" data-v-3cad3710><div class="container mx-auto px-6 py-16 md:py-24" data-v-3cad3710><div class="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto" data-v-3cad3710><div class="flex items-center gap-4" data-v-3cad3710><div class="p-3 rounded-xl bg-primary/10" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(Bot), { class: "text-gray-900" }, null, _parent));
      _push(`</div><div class="text-left" data-v-3cad3710><h1 class="text-4xl md:text-5xl font-bold tracking-tight" data-v-3cad3710>Agent Orchestrator</h1><p class="text-muted-foreground text-lg" data-v-3cad3710>by Formatho</p></div></div><p class="text-xl md:text-2xl font-semibold text-foreground" data-v-3cad3710> Team Collaboration for AI Agents • $29/month </p><p class="text-base md:text-lg text-muted-foreground max-w-2xl" data-v-3cad3710> Enterprise-grade AI agent management for teams. Coordinate agents, persist state, and collaborate securely. <strong data-v-3cad3710>No command line required. 100% private. Team-ready.</strong></p><div class="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full" data-v-3cad3710><span class="text-sm font-semibold text-primary" data-v-3cad3710>💰 Simple Pricing: $29/month per team</span></div><div class="flex flex-wrap gap-2 justify-center" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "default",
        class: "text-sm bg-green-600 hover:bg-green-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CheckCircle2), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` v0.1.0 Released `);
          } else {
            return [
              createVNode(unref(CheckCircle2), { class: "h-3 w-3 mr-1" }),
              createTextVNode(" v0.1.0 Released ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "secondary",
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` Electron Desktop App `);
          } else {
            return [
              createVNode(unref(LayoutDashboard), { class: "h-3 w-3 mr-1" }),
              createTextVNode(" Electron Desktop App ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "secondary",
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Lock), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` 100% Local `);
          } else {
            return [
              createVNode(unref(Lock), { class: "h-3 w-3 mr-1" }),
              createTextVNode(" 100% Local ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "secondary",
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Code), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` Open Source (MIT) `);
          } else {
            return [
              createVNode(unref(Code), { class: "h-3 w-3 mr-1" }),
              createTextVNode(" Open Source (MIT) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "secondary",
        class: "text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Shield), { class: "h-3 w-3 mr-1" }, null, _parent2, _scopeId));
            _push2(` Privacy First `);
          } else {
            return [
              createVNode(unref(Shield), { class: "h-3 w-3 mr-1" }),
              createTextVNode(" Privacy First ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap gap-3 justify-center mt-4" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        "aria-label": "View Agent Orchestrator on GitHub",
        as: "a",
        href: "https://github.com/formatho/agent-orchestrator",
        target: "_blank",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Github), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` View on GitHub `);
          } else {
            return [
              createVNode(unref(Github), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" View on GitHub ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        "aria-label": "Download Agent Orchestrator",
        variant: "outline",
        size: "lg",
        as: "a",
        href: "https://github.com/formatho/agent-orchestrator/releases",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Download v0.1.0 `);
          } else {
            return [
              createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" Download v0.1.0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><section class="container mx-auto px-6 py-8 bg-muted/30 border-b" data-v-3cad3710><div class="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto" data-v-3cad3710><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="text-center p-4" data-v-3cad3710><div class="text-gray-900" data-v-3cad3710>${ssrInterpolate(stat.value)}</div><div class="text-xs md:text-sm text-muted-foreground" data-v-3cad3710>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></section><section class="container mx-auto px-6 py-12 md:py-16" data-v-3cad3710><div class="text-center mb-8" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>Desktop Application</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Manage AI agents from a beautiful native desktop UI with premium light theme. No terminal needed - everything is visual and intuitive. </p></div><div class="max-w-4xl mx-auto" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        class: "overflow-hidden",
        style: { "border": "1px solid #d1d5db", "box-shadow": "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white p-2 flex items-center gap-2" style="${ssrRenderStyle({ "border-bottom": "1px solid #e5e7eb" })}" data-v-3cad3710${_scopeId}><div class="w-3 h-3 rounded-full bg-red-500" data-v-3cad3710${_scopeId}></div><div class="w-3 h-3 rounded-full bg-yellow-500" data-v-3cad3710${_scopeId}></div><div class="w-3 h-3 rounded-full bg-green-500" data-v-3cad3710${_scopeId}></div><span class="ml-4 text-sm font-medium" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-3cad3710${_scopeId}>Agent Orchestrator</span></div><div class="grid grid-cols-4 min-h-[300px]" style="${ssrRenderStyle({ "background-color": "#f9fafb" })}" data-v-3cad3710${_scopeId}><div class="p-4 space-y-2" style="${ssrRenderStyle({ "background-color": "#ffffff", "border-right": "1px solid #e5e7eb" })}" data-v-3cad3710${_scopeId}><div class="text-sm font-medium mb-4" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>Navigation</div><div class="flex items-center gap-2 p-2 rounded" style="${ssrRenderStyle({ "background-color": "rgb(6, 182, 212, 0.1)" })}" data-v-3cad3710${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bot), {
              class: "h-4 w-4",
              style: { "color": "#06b6d4" }
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" style="${ssrRenderStyle({ "color": "#06b6d4" })}" data-v-3cad3710${_scopeId}>Agents</span></div><div class="flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" data-v-3cad3710${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ListTodo), {
              class: "h-4 w-4",
              style: { "color": "#64748b" }
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>TODOs</span></div><div class="flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" data-v-3cad3710${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), {
              class: "h-4 w-4",
              style: { "color": "#64748b" }
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>Schedule</span></div><div class="flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" data-v-3cad3710${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Settings), {
              class: "h-4 w-4",
              style: { "color": "#64748b" }
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>Settings</span></div></div><div class="col-span-3 p-6" data-v-3cad3710${_scopeId}><div class="flex items-center justify-between mb-4" data-v-3cad3710${_scopeId}><h3 class="font-semibold" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>Active Agents</h3>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              size: "sm",
              style: { "background-color": "#06b6d4", "color": "white" },
              "aria-label": "Add new agent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`+ New Agent`);
                } else {
                  return [
                    createTextVNode("+ New Agent")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-3" data-v-3cad3710${_scopeId}><div class="flex items-center gap-3 p-3 rounded border" style="${ssrRenderStyle({ "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" })}" data-v-3cad3710${_scopeId}><div class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ "background-color": "#22c55e" })}" data-v-3cad3710${_scopeId}></div><div class="flex-1" data-v-3cad3710${_scopeId}><div class="font-medium text-sm" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>daily-report</div><div class="text-xs" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-3cad3710${_scopeId}>Generates sales report at 9am daily</div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              variant: "outline",
              class: "text-xs",
              style: { "border-color": "#22c55e", "color": "#22c55e" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Running `);
                } else {
                  return [
                    createTextVNode(" Running ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-3 p-3 rounded border" style="${ssrRenderStyle({ "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" })}" data-v-3cad3710${_scopeId}><div class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ "background-color": "#eab308" })}" data-v-3cad3710${_scopeId}></div><div class="flex-1" data-v-3cad3710${_scopeId}><div class="font-medium text-sm" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>code-reviewer</div><div class="text-xs" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-3cad3710${_scopeId}>Reviews PRs on GitHub</div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              variant: "outline",
              class: "text-xs",
              style: { "border-color": "#eab308", "color": "#eab308" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Idle `);
                } else {
                  return [
                    createTextVNode(" Idle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-3 p-3 rounded border" style="${ssrRenderStyle({ "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" })}" data-v-3cad3710${_scopeId}><div class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ "background-color": "#06b6d4" })}" data-v-3cad3710${_scopeId}></div><div class="flex-1" data-v-3cad3710${_scopeId}><div class="font-medium text-sm" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-3cad3710${_scopeId}>email-summarizer</div><div class="text-xs" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-3cad3710${_scopeId}>Summarizes inbox every morning</div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              variant: "outline",
              class: "text-xs",
              style: { "border-color": "#06b6d4", "color": "#06b6d4" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Scheduled `);
                } else {
                  return [
                    createTextVNode(" Scheduled ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "bg-white p-2 flex items-center gap-2",
                style: { "border-bottom": "1px solid #e5e7eb" }
              }, [
                createVNode("div", { class: "w-3 h-3 rounded-full bg-red-500" }),
                createVNode("div", { class: "w-3 h-3 rounded-full bg-yellow-500" }),
                createVNode("div", { class: "w-3 h-3 rounded-full bg-green-500" }),
                createVNode("span", {
                  class: "ml-4 text-sm font-medium",
                  style: { "color": "#64748b" }
                }, "Agent Orchestrator")
              ]),
              createVNode("div", {
                class: "grid grid-cols-4 min-h-[300px]",
                style: { "background-color": "#f9fafb" }
              }, [
                createVNode("div", {
                  class: "p-4 space-y-2",
                  style: { "background-color": "#ffffff", "border-right": "1px solid #e5e7eb" }
                }, [
                  createVNode("div", {
                    class: "text-sm font-medium mb-4",
                    style: { "color": "#1e293b" }
                  }, "Navigation"),
                  createVNode("div", {
                    class: "flex items-center gap-2 p-2 rounded",
                    style: { "background-color": "rgb(6, 182, 212, 0.1)" }
                  }, [
                    createVNode(unref(Bot), {
                      class: "h-4 w-4",
                      style: { "color": "#06b6d4" }
                    }),
                    createVNode("span", {
                      class: "text-sm font-medium",
                      style: { "color": "#06b6d4" }
                    }, "Agents")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" }, [
                    createVNode(unref(ListTodo), {
                      class: "h-4 w-4",
                      style: { "color": "#64748b" }
                    }),
                    createVNode("span", {
                      class: "text-sm font-medium",
                      style: { "color": "#1e293b" }
                    }, "TODOs")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" }, [
                    createVNode(unref(Calendar), {
                      class: "h-4 w-4",
                      style: { "color": "#64748b" }
                    }),
                    createVNode("span", {
                      class: "text-sm font-medium",
                      style: { "color": "#1e293b" }
                    }, "Schedule")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 p-2 rounded hover:shadow-md transition-shadow" }, [
                    createVNode(unref(Settings), {
                      class: "h-4 w-4",
                      style: { "color": "#64748b" }
                    }),
                    createVNode("span", {
                      class: "text-sm font-medium",
                      style: { "color": "#1e293b" }
                    }, "Settings")
                  ])
                ]),
                createVNode("div", { class: "col-span-3 p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h3", {
                      class: "font-semibold",
                      style: { "color": "#1e293b" }
                    }, "Active Agents"),
                    createVNode(unref(_sfc_main$2), {
                      size: "sm",
                      style: { "background-color": "#06b6d4", "color": "white" },
                      "aria-label": "Add new agent"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("+ New Agent")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", {
                      class: "flex items-center gap-3 p-3 rounded border",
                      style: { "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" }
                    }, [
                      createVNode("div", {
                        class: "w-2 h-2 rounded-full",
                        style: { "background-color": "#22c55e" }
                      }),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", {
                          class: "font-medium text-sm",
                          style: { "color": "#1e293b" }
                        }, "daily-report"),
                        createVNode("div", {
                          class: "text-xs",
                          style: { "color": "#64748b" }
                        }, "Generates sales report at 9am daily")
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: "outline",
                        class: "text-xs",
                        style: { "border-color": "#22c55e", "color": "#22c55e" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Running ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", {
                      class: "flex items-center gap-3 p-3 rounded border",
                      style: { "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" }
                    }, [
                      createVNode("div", {
                        class: "w-2 h-2 rounded-full",
                        style: { "background-color": "#eab308" }
                      }),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", {
                          class: "font-medium text-sm",
                          style: { "color": "#1e293b" }
                        }, "code-reviewer"),
                        createVNode("div", {
                          class: "text-xs",
                          style: { "color": "#64748b" }
                        }, "Reviews PRs on GitHub")
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: "outline",
                        class: "text-xs",
                        style: { "border-color": "#eab308", "color": "#eab308" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Idle ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", {
                      class: "flex items-center gap-3 p-3 rounded border",
                      style: { "background-color": "#ffffff", "border-color": "#e2e8f0", "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.05)" }
                    }, [
                      createVNode("div", {
                        class: "w-2 h-2 rounded-full",
                        style: { "background-color": "#06b6d4" }
                      }),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", {
                          class: "font-medium text-sm",
                          style: { "color": "#1e293b" }
                        }, "email-summarizer"),
                        createVNode("div", {
                          class: "text-xs",
                          style: { "color": "#64748b" }
                        }, "Summarizes inbox every morning")
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: "outline",
                        class: "text-xs",
                        style: { "border-color": "#06b6d4", "color": "#06b6d4" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Scheduled ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="container mx-auto px-6 py-12 md:py-16 border-t border-border" data-v-3cad3710><div class="text-center mb-8" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>See It In Action</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Watch how easy it is to manage AI agents with Agent Orchestrator&#39;s intuitive interface. </p></div><div class="max-w-4xl mx-auto" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-dashed border-primary/30" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "p-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center justify-center space-y-4" data-v-3cad3710${_scopeId2}><div class="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center" data-v-3cad3710${_scopeId2}><svg class="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24" data-v-3cad3710${_scopeId2}><path d="M8 5v14l11-7z" data-v-3cad3710${_scopeId2}></path></svg></div><div class="text-center" data-v-3cad3710${_scopeId2}><h3 class="text-xl font-semibold mb-2" data-v-3cad3710${_scopeId2}>Demo Video Coming Soon</h3><p class="text-sm text-muted-foreground max-w-md" data-v-3cad3710${_scopeId2}> We&#39;re preparing a comprehensive walkthrough showing team collaboration features, agent management, and real-world use cases. Check back in a few days! </p></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    variant: "secondary",
                    class: "mt-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24" data-v-3cad3710${_scopeId3}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" data-v-3cad3710${_scopeId3}></path></svg> Estimated: Week 2 (April 2026) `);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            class: "w-3 h-3 mr-1",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                          ])),
                          createTextVNode(" Estimated: Week 2 (April 2026) ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-center space-y-4" }, [
                      createVNode("div", { class: "w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-10 h-10 text-primary",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", { d: "M8 5v14l11-7z" })
                        ]))
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h3", { class: "text-xl font-semibold mb-2" }, "Demo Video Coming Soon"),
                        createVNode("p", { class: "text-sm text-muted-foreground max-w-md" }, " We're preparing a comprehensive walkthrough showing team collaboration features, agent management, and real-world use cases. Check back in a few days! ")
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: "secondary",
                        class: "mt-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-3 h-3 mr-1",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                          ])),
                          createTextVNode(" Estimated: Week 2 (April 2026) ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "p-12" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center justify-center space-y-4" }, [
                    createVNode("div", { class: "w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-10 h-10 text-primary",
                        fill: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", { d: "M8 5v14l11-7z" })
                      ]))
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h3", { class: "text-xl font-semibold mb-2" }, "Demo Video Coming Soon"),
                      createVNode("p", { class: "text-sm text-muted-foreground max-w-md" }, " We're preparing a comprehensive walkthrough showing team collaboration features, agent management, and real-world use cases. Check back in a few days! ")
                    ]),
                    createVNode(unref(_sfc_main$1), {
                      variant: "secondary",
                      class: "mt-2"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-3 h-3 mr-1",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                        ])),
                        createTextVNode(" Estimated: Week 2 (April 2026) ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="container mx-auto px-6 py-12 md:py-16 border-t border-border" data-v-3cad3710><div class="text-center mb-8" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>Download</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Available for macOS, Windows, and Linux. Self-contained applications with no external dependencies. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto" data-v-3cad3710><!--[-->`);
      ssrRenderList(downloads, (download) => {
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          key: download.platform,
          class: "hover:border-primary/50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-4xl mb-2" data-v-3cad3710${_scopeId2}>${ssrInterpolate(download.icon)}</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-lg" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(download.platform)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(download.platform), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(download.arch)} • ${ssrInterpolate(download.format)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(download.arch) + " • " + toDisplayString(download.format), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "text-4xl mb-2" }, toDisplayString(download.icon), 1),
                      createVNode(unref(_sfc_main$6), { class: "text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(download.platform), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(download.arch) + " • " + toDisplayString(download.format), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between mb-3" data-v-3cad3710${_scopeId2}><span class="text-sm text-muted-foreground" data-v-3cad3710${_scopeId2}>${ssrInterpolate(download.size)}</span>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "secondary",
                      class: "text-xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`v0.1.0`);
                        } else {
                          return [
                            createTextVNode("v0.1.0")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      as: "a",
                      href: "https://github.com/formatho/agent-orchestrator/releases",
                      target: "_blank",
                      "aria-label": "Download Agent Orchestrator",
                      class: "w-full",
                      disabled: !download.available
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Download), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Download `);
                        } else {
                          return [
                            createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Download ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(download.size), 1),
                        createVNode(unref(_sfc_main$1), {
                          variant: "secondary",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("v0.1.0")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$2), {
                        as: "a",
                        href: "https://github.com/formatho/agent-orchestrator/releases",
                        target: "_blank",
                        "aria-label": "Download Agent Orchestrator",
                        class: "w-full",
                        disabled: !download.available
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Download ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-4xl mb-2" }, toDisplayString(download.icon), 1),
                    createVNode(unref(_sfc_main$6), { class: "text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(download.platform), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(download.arch) + " • " + toDisplayString(download.format), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                      createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(download.size), 1),
                      createVNode(unref(_sfc_main$1), {
                        variant: "secondary",
                        class: "text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("v0.1.0")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$2), {
                      as: "a",
                      href: "https://github.com/formatho/agent-orchestrator/releases",
                      target: "_blank",
                      "aria-label": "Download Agent Orchestrator",
                      class: "w-full",
                      disabled: !download.available
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Download ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section class="container mx-auto px-6 py-12 md:py-16 border-t border-border" data-v-3cad3710><div class="text-center mb-12" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>Features</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Everything you need to manage autonomous AI agents. Open source, community-driven. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-3cad3710><!--[-->`);
      ssrRenderList(coreFeatures, (feature) => {
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          key: feature.title,
          class: "border-2 hover:border-primary/50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between" data-v-3cad3710${_scopeId2}><div class="flex items-center gap-3" data-v-3cad3710${_scopeId2}><div class="p-2 rounded-lg bg-primary/10" data-v-3cad3710${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(feature.icon), { class: "text-gray-900" }, null), _parent3, _scopeId2);
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-lg" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(feature.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(feature.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: feature.status === "Complete" ? "default" : feature.status === "Core" ? "secondary" : "outline",
                      class: [feature.status === "Complete" ? "bg-green-600 hover:bg-green-700" : "", "text-xs"]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(feature.status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(feature.status), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "p-2 rounded-lg bg-primary/10" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "text-gray-900" }))
                          ]),
                          createVNode(unref(_sfc_main$6), { class: "text-lg" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(feature.title), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode(unref(_sfc_main$1), {
                          variant: feature.status === "Complete" ? "default" : feature.status === "Core" ? "secondary" : "outline",
                          class: [feature.status === "Complete" ? "bg-green-600 hover:bg-green-700" : "", "text-xs"]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(feature.status), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant", "class"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "leading-relaxed" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(feature.description)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(feature.description), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$7), { class: "leading-relaxed" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(feature.description), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "p-2 rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "text-gray-900" }))
                        ]),
                        createVNode(unref(_sfc_main$6), { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(feature.title), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: feature.status === "Complete" ? "default" : feature.status === "Core" ? "secondary" : "outline",
                        class: [feature.status === "Complete" ? "bg-green-600 hover:bg-green-700" : "", "text-xs"]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(feature.status), 1)
                        ]),
                        _: 2
                      }, 1032, ["variant", "class"])
                    ])
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$7), { class: "leading-relaxed" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(feature.description), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section class="container mx-auto px-6 py-12 md:py-16 border-t border-border" data-v-3cad3710><div class="text-center mb-8" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>Built-in Skills</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Give agents real capabilities. All skills run with permission controls. </p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" data-v-3cad3710><!--[-->`);
      ssrRenderList(skills, (skill) => {
        _push(`<div class="p-4 border rounded-lg hover:border-primary/50 transition-colors" data-v-3cad3710><div class="text-gray-900" data-v-3cad3710>${ssrInterpolate(skill.name)}</div><div class="text-xs text-muted-foreground" data-v-3cad3710>${ssrInterpolate(skill.description)}</div></div>`);
      });
      _push(`<!--]--></div></section><section class="container mx-auto px-6 py-12 md:py-16 border-t border-border" data-v-3cad3710><div class="text-center mb-8" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight mb-4" data-v-3cad3710>Modular Go Libraries</h2><p class="text-muted-foreground max-w-2xl mx-auto" data-v-3cad3710> Each component is a standalone Go library. Use them independently or as a complete system. MIT licensed. 100% tested. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto" data-v-3cad3710><!--[-->`);
      ssrRenderList(libraries, (lib) => {
        _push(`<a${ssrRenderAttr("href", `https://github.com/formatho/${lib.name}`)} target="_blank" class="group" data-v-3cad3710>`);
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "h-full hover:border-primary/50 transition-colors cursor-pointer" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between mb-2" data-v-3cad3710${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-base group-hover:text-gray-900 transition-colors font-mono" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(lib.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(lib.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "default",
                      class: "text-xs bg-green-600 hover:bg-green-700"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Complete `);
                        } else {
                          return [
                            createTextVNode(" Complete ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="flex gap-2" data-v-3cad3710${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "outline",
                      class: "text-xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(lib.lines)} lines`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(lib.lines) + " lines", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "outline",
                      class: "text-xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(lib.tests)} tests`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(lib.tests) + " tests", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                        createVNode(unref(_sfc_main$6), { class: "text-base group-hover:text-gray-900 transition-colors font-mono" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(lib.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$1), {
                          variant: "default",
                          class: "text-xs bg-green-600 hover:bg-green-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Complete ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$1), {
                          variant: "outline",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(lib.lines) + " lines", 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$1), {
                          variant: "outline",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(lib.tests) + " tests", 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(lib.description)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(lib.description), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$7), { class: "text-sm" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(lib.description), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                      createVNode(unref(_sfc_main$6), { class: "text-base group-hover:text-gray-900 transition-colors font-mono" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(lib.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$1), {
                        variant: "default",
                        class: "text-xs bg-green-600 hover:bg-green-700"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Complete ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$1), {
                        variant: "outline",
                        class: "text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(lib.lines) + " lines", 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$1), {
                        variant: "outline",
                        class: "text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(lib.tests) + " tests", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$7), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(lib.description), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div></section><section class="container mx-auto px-6 py-16 border-t border-border" data-v-3cad3710><div class="text-center space-y-6" data-v-3cad3710><h2 class="text-3xl font-bold tracking-tight" data-v-3cad3710>Ready to Automate?</h2><p class="text-muted-foreground max-w-xl mx-auto" data-v-3cad3710> Agent Orchestrator is released and ready to use. Star the repo, download the app, or contribute to the open source libraries. </p><div class="flex flex-wrap gap-3 justify-center" data-v-3cad3710>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        as: "a",
        href: "https://github.com/formatho/agent-orchestrator",
        target: "_blank",
        size: "lg",
        "aria-label": "Star on GitHub"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Github), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Star on GitHub `);
          } else {
            return [
              createVNode(unref(Github), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" Star on GitHub ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "outline",
        size: "lg",
        as: "a",
        href: "https://github.com/formatho/agent-orchestrator/releases",
        target: "_blank",
        "aria-label": "Download latest release"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Download), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Download Latest `);
          } else {
            return [
              createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" Download Latest ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "outline",
        size: "lg",
        as: "a",
        href: "https://github.com/formatho",
        target: "_blank",
        "aria-label": "Contribute to Formatho"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Organization `);
          } else {
            return [
              createTextVNode(" View Organization ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AgentOrchestratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgentOrchestratorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3cad3710"]]);
export {
  AgentOrchestratorView as default
};
