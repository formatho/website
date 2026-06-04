import { ref, onMounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { _ as _export_sfc, c as _sfc_main$1 } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
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
const _sfc_main = {
  __name: "AgentDetailView",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const agentId = route.params.id;
    const agent = ref(null);
    const stateHistory = ref([]);
    const isLoaded = ref(false);
    const error = ref("");
    async function fetchAgentDetails() {
      try {
        const response = await fetch(`http://localhost:18765/api/agents/${agentId}`);
        if (response.ok) {
          agent.value = await response.json();
          isLoaded.value = true;
        } else {
          error.value = "Agent not found";
        }
      } catch (err) {
        error.value = err.message;
      }
    }
    async function fetchStateHistory() {
      try {
        const response = await fetch(`http://localhost:18765/api/agent-state/${agentId}/history?limit=20`);
        if (response.ok) {
          const data = await response.json();
          stateHistory.value = data.history || [];
        }
      } catch (err) {
        console.error("Failed to fetch state history:", err);
      }
    }
    function formatTimestamp(timestamp) {
      if (!timestamp) return "N/A";
      return new Date(timestamp).toLocaleString();
    }
    function getVersionColor(version) {
      const versions = stateHistory.value.length;
      return version === versions ? "#2ecc71" : "#3498db";
    }
    function goBack() {
      router.push("/dashboard");
    }
    onMounted(() => {
      fetchAgentDetails();
      fetchStateHistory();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "agent-detail-view" }, _attrs))} data-v-837a78e5><header class="detail-header" data-v-837a78e5>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: goBack,
        variant: "outline",
        "aria-label": "Back to agents list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Back to Dashboard`);
          } else {
            return [
              createTextVNode("← Back to Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (agent.value) {
        _push(`<h1 data-v-837a78e5>${ssrInterpolate(agent.value.name)}</h1>`);
      } else {
        _push(`<h1 data-v-837a78e5>Loading...</h1>`);
      }
      _push(`</header>`);
      if (error.value) {
        _push(`<div class="error-state" data-v-837a78e5><p data-v-837a78e5>${ssrInterpolate(error.value)}</p></div>`);
      } else if (!isLoaded.value) {
        _push(`<div class="loading-state" data-v-837a78e5><p data-v-837a78e5>Loading agent details...</p></div>`);
      } else {
        _push(`<!--[--><section class="info-card" data-v-837a78e5><h2 data-v-837a78e5>📊 Agent Information</h2><div class="info-grid" data-v-837a78e5><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Agent ID:</span><span class="value" data-v-837a78e5>${ssrInterpolate(agent.value.id)}</span></div><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Name:</span><span class="value" data-v-837a78e5>${ssrInterpolate(agent.value.name)}</span></div><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Description:</span><span class="value" data-v-837a78e5>${ssrInterpolate(agent.value.description || "No description")}</span></div><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Status:</span><span class="${ssrRenderClass([agent.value.status, "status-badge"])}" data-v-837a78e5>${ssrInterpolate(agent.value.status || "Unknown")}</span></div><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Created:</span><span class="value" data-v-837a78e5>${ssrInterpolate(formatTimestamp(agent.value.createdAt))}</span></div><div class="info-item" data-v-837a78e5><span class="label" data-v-837a78e5>Last Run:</span><span class="value" data-v-837a78e5>${ssrInterpolate(agent.value.lastRun ? formatTimestamp(agent.value.lastRun) : "Never")}</span></div></div></section><section class="history-card" data-v-837a78e5><h2 data-v-837a78e5>📋 State History (${ssrInterpolate(stateHistory.value.length)} versions)</h2>`);
        if (stateHistory.value.length === 0) {
          _push(`<div class="empty-history" data-v-837a78e5><p data-v-837a78e5>No state history available yet.</p></div>`);
        } else {
          _push(`<table class="history-table" data-v-837a78e5><thead data-v-837a78e5><tr data-v-837a78e5><th data-v-837a78e5>Version</th><th data-v-837a78e5>Updated At</th><th data-v-837a78e5>State Data Preview</th><th data-v-837a78e5>Status</th></tr></thead><tbody data-v-837a78e5><!--[-->`);
          ssrRenderList(stateHistory.value, (state, index) => {
            _push(`<tr data-v-837a78e5><td data-v-837a78e5><span class="version-badge" style="${ssrRenderStyle({ backgroundColor: getVersionColor(state.version) })}" data-v-837a78e5> v${ssrInterpolate(state.version)}</span></td><td data-v-837a78e5>${ssrInterpolate(formatTimestamp(state.updatedAt))}</td><td class="state-preview" data-v-837a78e5>${ssrInterpolate(JSON.stringify(state.stateData).substring(0, 50))}...</td><td data-v-837a78e5><span class="${ssrRenderClass(["active", "status-badge"])}" data-v-837a78e5>Saved</span></td></tr>`);
          });
          _push(`<!--]--></tbody></table>`);
        }
        _push(`</section><section class="actions-card" data-v-837a78e5><h2 data-v-837a78e5>⚙️ Actions</h2><div class="action-buttons" data-v-837a78e5>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "outline",
          onClick: ($event) => _ctx.exportState(),
          "aria-label": "Export agent state history"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Export State History`);
            } else {
              return [
                createTextVNode("Export State History")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "destructive",
          onClick: ($event) => _ctx.deleteAgent(),
          "aria-label": "Delete this agent permanently"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Delete Agent`);
            } else {
              return [
                createTextVNode("Delete Agent")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section><!--]-->`);
      }
      _push(`<footer class="detail-footer" data-v-837a78e5><p data-v-837a78e5>Formatho Agent Orchestrator - Building tools that make money 💰🚀</p></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AgentDetailView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgentDetailView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-837a78e5"]]);
export {
  AgentDetailView as default
};
