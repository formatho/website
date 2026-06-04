import { defineComponent, ref, computed, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
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
  __name: "BetaFeedbackAdmin",
  __ssrInlineRender: true,
  setup(__props) {
    const feedback = ref([]);
    const loading = ref(true);
    const selectedFeedback = ref(null);
    const filter = ref({
      status: "",
      type: "",
      priority: ""
    });
    const stats = ref({
      total: 0,
      by_type: {},
      by_status: {},
      by_priority: {},
      average_rating: 0,
      recent_count: 0
    });
    const filteredFeedback = computed(() => {
      return feedback.value.filter((f) => {
        if (filter.value.status && f.status !== filter.value.status) return false;
        if (filter.value.type && f.type !== filter.value.type) return false;
        if (filter.value.priority && f.priority !== filter.value.priority) return false;
        return true;
      });
    });
    onMounted(async () => {
      await Promise.all([
        fetchFeedback(),
        fetchStats()
      ]);
    });
    async function fetchFeedback() {
      try {
        const response = await fetch("http://localhost:18766/api/beta-feedback");
        const data = await response.json();
        feedback.value = data.feedback || [];
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        loading.value = false;
      }
    }
    async function fetchStats() {
      try {
        const response = await fetch("http://localhost:18766/api/beta-feedback/stats");
        stats.value = await response.json();
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }
    const statusColors = {
      new: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800"
    };
    const priorityColors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    const typeIcons = {
      bug: "🐛",
      feature: "💡",
      testimonial: "⭐",
      general: "💬"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto p-6" }, _attrs))} data-v-28c9f65e><div class="mb-8" data-v-28c9f65e><h1 class="text-3xl font-bold mb-2" data-v-28c9f65e>Beta Feedback Dashboard</h1><p class="text-muted-foreground" data-v-28c9f65e>Review and manage feedback from beta testers</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-v-28c9f65e><div class="p-4 bg-card border border-border rounded-lg" data-v-28c9f65e><div class="text-2xl font-bold" data-v-28c9f65e>${ssrInterpolate(stats.value.total)}</div><div class="text-sm text-muted-foreground" data-v-28c9f65e>Total Feedback</div></div><div class="p-4 bg-card border border-border rounded-lg" data-v-28c9f65e><div class="text-2xl font-bold" data-v-28c9f65e>${ssrInterpolate(stats.value.by_status?.new || 0)}</div><div class="text-sm text-muted-foreground" data-v-28c9f65e>New</div></div><div class="p-4 bg-card border border-border rounded-lg" data-v-28c9f65e><div class="text-2xl font-bold" data-v-28c9f65e>${ssrInterpolate(stats.value.recent_count)}</div><div class="text-sm text-muted-foreground" data-v-28c9f65e>Last 7 Days</div></div><div class="p-4 bg-card border border-border rounded-lg" data-v-28c9f65e><div class="text-2xl font-bold" data-v-28c9f65e>${ssrInterpolate(stats.value.average_rating?.toFixed(1) || "N/A")}</div><div class="text-sm text-muted-foreground" data-v-28c9f65e>Avg Rating</div></div></div><div class="flex gap-4 mb-6" data-v-28c9f65e><select aria-label="Filter by status" class="px-4 py-2 border border-border rounded-lg bg-background" data-v-28c9f65e><option value="" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.status) ? ssrLooseContain(filter.value.status, "") : ssrLooseEqual(filter.value.status, "")) ? " selected" : ""}>All Statuses</option><option value="new" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.status) ? ssrLooseContain(filter.value.status, "new") : ssrLooseEqual(filter.value.status, "new")) ? " selected" : ""}>New</option><option value="in_progress" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.status) ? ssrLooseContain(filter.value.status, "in_progress") : ssrLooseEqual(filter.value.status, "in_progress")) ? " selected" : ""}>In Progress</option><option value="resolved" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.status) ? ssrLooseContain(filter.value.status, "resolved") : ssrLooseEqual(filter.value.status, "resolved")) ? " selected" : ""}>Resolved</option><option value="closed" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.status) ? ssrLooseContain(filter.value.status, "closed") : ssrLooseEqual(filter.value.status, "closed")) ? " selected" : ""}>Closed</option></select><select aria-label="Filter by type" class="px-4 py-2 border border-border rounded-lg bg-background" data-v-28c9f65e><option value="" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "") : ssrLooseEqual(filter.value.type, "")) ? " selected" : ""}>All Types</option><option value="bug" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "bug") : ssrLooseEqual(filter.value.type, "bug")) ? " selected" : ""}>Bug</option><option value="feature" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "feature") : ssrLooseEqual(filter.value.type, "feature")) ? " selected" : ""}>Feature</option><option value="testimonial" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "testimonial") : ssrLooseEqual(filter.value.type, "testimonial")) ? " selected" : ""}>Testimonial</option><option value="general" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "general") : ssrLooseEqual(filter.value.type, "general")) ? " selected" : ""}>General</option></select><select aria-label="Filter by priority" class="px-4 py-2 border border-border rounded-lg bg-background" data-v-28c9f65e><option value="" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.priority) ? ssrLooseContain(filter.value.priority, "") : ssrLooseEqual(filter.value.priority, "")) ? " selected" : ""}>All Priorities</option><option value="low" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.priority) ? ssrLooseContain(filter.value.priority, "low") : ssrLooseEqual(filter.value.priority, "low")) ? " selected" : ""}>Low</option><option value="medium" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.priority) ? ssrLooseContain(filter.value.priority, "medium") : ssrLooseEqual(filter.value.priority, "medium")) ? " selected" : ""}>Medium</option><option value="high" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.priority) ? ssrLooseContain(filter.value.priority, "high") : ssrLooseEqual(filter.value.priority, "high")) ? " selected" : ""}>High</option><option value="critical" data-v-28c9f65e${ssrIncludeBooleanAttr(Array.isArray(filter.value.priority) ? ssrLooseContain(filter.value.priority, "critical") : ssrLooseEqual(filter.value.priority, "critical")) ? " selected" : ""}>Critical</option></select></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12" data-v-28c9f65e><div class="text-2xl" data-v-28c9f65e>Loading...</div></div>`);
      } else if (filteredFeedback.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-28c9f65e><div class="text-6xl mb-4" data-v-28c9f65e>📭</div><p class="text-muted-foreground" data-v-28c9f65e>No feedback found</p></div>`);
      } else {
        _push(`<div class="space-y-4" data-v-28c9f65e><!--[-->`);
        ssrRenderList(filteredFeedback.value, (item) => {
          _push(`<div class="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer" data-v-28c9f65e><div class="flex items-start justify-between mb-3" data-v-28c9f65e><div class="flex items-center gap-3" data-v-28c9f65e><span class="text-2xl" data-v-28c9f65e>${ssrInterpolate(typeIcons[item.type])}</span><div data-v-28c9f65e><h3 class="font-semibold" data-v-28c9f65e>${ssrInterpolate(item.title)}</h3><p class="text-sm text-muted-foreground" data-v-28c9f65e>${ssrInterpolate(item.name || "Anonymous")} • ${ssrInterpolate(item.email)}</p></div></div><div class="flex gap-2" data-v-28c9f65e><span class="${ssrRenderClass(["px-2 py-1 rounded text-xs font-medium", statusColors[item.status]])}" data-v-28c9f65e>${ssrInterpolate(item.status)}</span><span class="${ssrRenderClass(["px-2 py-1 rounded text-xs font-medium", priorityColors[item.priority]])}" data-v-28c9f65e>${ssrInterpolate(item.priority)}</span></div></div><p class="text-sm text-muted-foreground mb-3 line-clamp-2" data-v-28c9f65e>${ssrInterpolate(item.description)}</p><div class="flex items-center justify-between text-sm" data-v-28c9f65e><span class="text-muted-foreground" data-v-28c9f65e>${ssrInterpolate(new Date(item.created_at).toLocaleDateString())}</span>`);
          if (item.rating > 0) {
            _push(`<div class="flex gap-1" data-v-28c9f65e><!--[-->`);
            ssrRenderList(5, (i) => {
              _push(`<span data-v-28c9f65e>${ssrInterpolate(i <= item.rating ? "⭐" : "☆")}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (selectedFeedback.value) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-v-28c9f65e><div class="bg-background max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6" data-v-28c9f65e><div class="flex items-start justify-between mb-4" data-v-28c9f65e><div data-v-28c9f65e><div class="flex items-center gap-2 mb-2" data-v-28c9f65e><span class="text-2xl" data-v-28c9f65e>${ssrInterpolate(typeIcons[selectedFeedback.value.type])}</span><h2 class="text-xl font-bold" data-v-28c9f65e>${ssrInterpolate(selectedFeedback.value.title)}</h2></div><p class="text-sm text-muted-foreground" data-v-28c9f65e> From: ${ssrInterpolate(selectedFeedback.value.name || "Anonymous")} (${ssrInterpolate(selectedFeedback.value.email)}) </p></div><button aria-label="Close feedback detail" class="text-2xl hover:text-red-500" data-v-28c9f65e>✕</button></div><div class="space-y-4" data-v-28c9f65e><div data-v-28c9f65e><h3 class="font-semibold mb-2" data-v-28c9f65e>Description</h3><p class="text-sm" data-v-28c9f65e>${ssrInterpolate(selectedFeedback.value.description)}</p></div>`);
        if (selectedFeedback.value.rating > 0) {
          _push(`<div data-v-28c9f65e><h3 class="font-semibold mb-2" data-v-28c9f65e>Rating</h3><div class="flex gap-1" data-v-28c9f65e><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<span class="text-2xl" data-v-28c9f65e>${ssrInterpolate(i <= selectedFeedback.value.rating ? "⭐" : "☆")}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-4" data-v-28c9f65e><div data-v-28c9f65e><h3 class="font-semibold mb-2" data-v-28c9f65e>Status</h3><select${ssrRenderAttr("value", selectedFeedback.value.status)} aria-label="Update feedback status" class="px-4 py-2 border border-border rounded-lg bg-background" data-v-28c9f65e><option value="new" data-v-28c9f65e>New</option><option value="in_progress" data-v-28c9f65e>In Progress</option><option value="resolved" data-v-28c9f65e>Resolved</option><option value="closed" data-v-28c9f65e>Closed</option></select></div><div data-v-28c9f65e><h3 class="font-semibold mb-2" data-v-28c9f65e>Priority</h3><span class="${ssrRenderClass(["px-3 py-2 rounded-lg text-sm font-medium", priorityColors[selectedFeedback.value.priority]])}" data-v-28c9f65e>${ssrInterpolate(selectedFeedback.value.priority)}</span></div></div>`);
        if (selectedFeedback.value.resolution) {
          _push(`<div data-v-28c9f65e><h3 class="font-semibold mb-2" data-v-28c9f65e>Resolution</h3><p class="text-sm" data-v-28c9f65e>${ssrInterpolate(selectedFeedback.value.resolution)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-sm text-muted-foreground" data-v-28c9f65e> Submitted: ${ssrInterpolate(new Date(selectedFeedback.value.created_at).toLocaleString())}</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/BetaFeedbackAdmin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BetaFeedbackAdmin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28c9f65e"]]);
export {
  BetaFeedbackAdmin as default
};
