import { defineComponent, ref, onMounted, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import Papa from "papaparse";
import { c as _sfc_main$1, _ as _export_sfc } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
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
  __name: "AnalyticsDashboardView",
  __ssrInlineRender: true,
  setup(__props) {
    const timeRange = ref("7d");
    const analyticsData = ref([]);
    const taskTypeDistribution = ref([
      { name: "Content Generation", value: 45 },
      { name: "Code Review", value: 30 },
      { name: "Data Analysis", value: 25 }
    ]);
    const agentPerformance = ref([
      { agentName: "Content Bot Alpha", score: 95 },
      { agentName: "Code Reviewer Beta", score: 88 },
      { agentName: "Data Analyst Gamma", score: 92 }
    ]);
    const generateMockData = () => {
      const days = timeRange.value === "7d" ? 7 : timeRange.value === "30d" ? 30 : 90;
      analyticsData.value = Array.from({ length: days }, (_, i) => {
        const date = /* @__PURE__ */ new Date();
        date.setDate(date.getDate() - (days - i - 1));
        return {
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          cpuUsage: Math.floor(Math.random() * 40) + 30,
          // 30-70%
          memoryUsage: Math.floor(Math.random() * 30) + 40,
          // 40-70%
          tasksCompleted: Math.floor(Math.random() * 20) + 5
          // 5-25 tasks
        };
      });
    };
    const onTimeRangeChange = (range) => {
      timeRange.value = range;
      generateMockData();
    };
    onMounted(() => {
      generateMockData();
    });
    const exportToCSV = () => {
      const csv = Papa.unparse({
        fields: ["Date", "CPU Usage (%)", "Memory Usage (%)", "Tasks Completed"],
        data: analyticsData.value.map((item) => [item.date, item.cpuUsage, item.memoryUsage, item.tasksCompleted])
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `analytics-export-${timeRange.value}.csv`;
      link.click();
    };
    const exportToJSON = () => {
      const json = JSON.stringify(analyticsData.value, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `analytics-export-${timeRange.value}.json`;
      link.click();
    };
    const totalTasksCompleted = computed(() => analyticsData.value.reduce((sum, item) => sum + item.tasksCompleted, 0));
    const avgCpuUsage = computed(() => Math.round(analyticsData.value.reduce((sum, item) => sum + item.cpuUsage, 0) / analyticsData.value.length));
    const avgMemoryUsage = computed(() => Math.round(analyticsData.value.reduce((sum, item) => sum + item.memoryUsage, 0) / analyticsData.value.length));
    const recentActivity = computed(() => [...analyticsData.value].reverse().slice(0, 10));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))} data-v-85ab959b><header class="bg-white dark:bg-gray-800 shadow-sm" data-v-85ab959b><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-85ab959b><h1 class="text-3xl font-bold text-gray-900 dark:text-white" data-v-85ab959b>Analytics Dashboard</h1><p class="mt-2 text-gray-600 dark:text-gray-400" data-v-85ab959b>Monitor agent performance, task completion trends, and collaboration insights</p></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-85ab959b><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8" data-v-85ab959b><div class="inline-flex rounded-md shadow-sm" role="group" data-v-85ab959b>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => onTimeRangeChange("7d"),
        "aria-label": "Show last 7 days",
        variant: timeRange.value === "7d" ? "default" : "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Last 7 Days `);
          } else {
            return [
              createTextVNode(" Last 7 Days ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => onTimeRangeChange("30d"),
        "aria-label": "Show last 30 days",
        variant: timeRange.value === "30d" ? "default" : "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Last 30 Days `);
          } else {
            return [
              createTextVNode(" Last 30 Days ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => onTimeRangeChange("90d"),
        "aria-label": "Show last 90 days",
        variant: timeRange.value === "90d" ? "default" : "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Last 90 Days `);
          } else {
            return [
              createTextVNode(" Last 90 Days ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-2" data-v-85ab959b>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: exportToCSV,
        "aria-label": "Export analytics as CSV",
        class: "bg-green-600 hover:bg-green-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Export CSV `);
          } else {
            return [
              createTextVNode(" Export CSV ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: exportToJSON,
        class: "bg-purple-600 hover:bg-purple-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Export JSON `);
          } else {
            return [
              createTextVNode(" Export JSON ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-85ab959b><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><div class="flex items-center justify-between mb-4" data-v-85ab959b><h3 class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-85ab959b>Total Tasks</h3><span class="text-2xl" data-v-85ab959b>📊</span></div><div class="flex items-baseline gap-2" data-v-85ab959b><span class="text-3xl font-bold text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(totalTasksCompleted.value)}</span><span class="text-sm text-green-600" data-v-85ab959b>+12.5%</span></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><div class="flex items-center justify-between mb-4" data-v-85ab959b><h3 class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-85ab959b>Avg CPU Usage</h3><span class="text-2xl" data-v-85ab959b>⚡</span></div><div class="flex items-baseline gap-2" data-v-85ab959b><span class="text-3xl font-bold text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(avgCpuUsage.value)}%</span><span class="text-sm text-green-600" data-v-85ab959b>-3.2%</span></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><div class="flex items-center justify-between mb-4" data-v-85ab959b><h3 class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-85ab959b>Avg Memory</h3><span class="text-2xl" data-v-85ab959b>💾</span></div><div class="flex items-baseline gap-2" data-v-85ab959b><span class="text-3xl font-bold text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(avgMemoryUsage.value)}%</span><span class="text-sm text-green-600" data-v-85ab959b>+1.8%</span></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><div class="flex items-center justify-between mb-4" data-v-85ab959b><h3 class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-85ab959b>Active Agents</h3><span class="text-2xl" data-v-85ab959b>🤖</span></div><div class="flex items-baseline gap-2" data-v-85ab959b><span class="text-3xl font-bold text-gray-900 dark:text-white" data-v-85ab959b>23</span><span class="text-sm text-green-600" data-v-85ab959b>+4 new</span></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-v-85ab959b><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-v-85ab959b>Performance Overview</h3><svg viewBox="0 0 500 200" class="w-full h-48" data-v-85ab959b><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<line${ssrRenderAttr("x1", 40)}${ssrRenderAttr("y1", 40 + i * 35)}${ssrRenderAttr("x2", 460)}${ssrRenderAttr("y2", 40 + i * 35)} stroke="#e5e7eb" stroke-width="1" data-v-85ab959b></line>`);
      });
      _push(`<!--]--><polyline${ssrRenderAttr("points", analyticsData.value.map((d, i) => {
        const x = 40 + i / Math.max(analyticsData.value.length - 1, 1) * 420;
        const y = 160 - (d.cpuUsage - 30) / 40 * 120;
        return `${x},${y}`;
      }).join(" "))} fill="none" stroke="#3b82f6" stroke-width="2" data-v-85ab959b></polyline><polyline${ssrRenderAttr("points", analyticsData.value.map((d, i) => {
        const x = 40 + i / Math.max(analyticsData.value.length - 1, 1) * 420;
        const y = 160 - (d.memoryUsage - 40) / 30 * 120;
        return `${x},${y}`;
      }).join(" "))} fill="none" stroke="#f59e0b" stroke-width="2" data-v-85ab959b></polyline><!--[-->`);
      ssrRenderList(analyticsData.value.slice(-15), (d, i) => {
        _push(`<rect${ssrRenderAttr("x", 40 + i / Math.max(analyticsData.value.length - 1, 1) * 420 - 8)}${ssrRenderAttr("y", 160 - d.tasksCompleted / 25 * 120)} width="16" height="120" fill="#10b981" opacity="0.3" data-v-85ab959b></rect>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList([0, 25, 50, 75, 100], (val) => {
        _push(`<text x="35"${ssrRenderAttr("y", 160 - val / 100 * 120 + 4)} text-anchor="end" class="text-xs fill-gray-600" data-v-85ab959b>${ssrInterpolate(val)}%</text>`);
      });
      _push(`<!--]--><rect x="430" y="10" width="12" height="12" fill="#3b82f6" rx="2" data-v-85ab959b></rect><text x="450" y="19" class="text-xs fill-gray-700" data-v-85ab959b>CPU Usage</text><rect x="430" y="28" width="12" height="12" fill="#f59e0b" rx="2" data-v-85ab959b></rect><text x="450" y="37" class="text-xs fill-gray-700" data-v-85ab959b>Memory Usage</text><rect x="430" y="46" width="12" height="12" fill="#10b981" rx="2" opacity="0.3" data-v-85ab959b></rect><text x="450" y="55" class="text-xs fill-gray-700" data-v-85ab959b>Tasks</text></svg></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between" data-v-85ab959b><div class="flex-1 pr-4" data-v-85ab959b><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-v-85ab959b>Task Distribution</h3><p class="text-sm text-gray-600 dark:text-gray-400" data-v-85ab959b>Breakdown of tasks by type over selected period</p></div><div style="${ssrRenderStyle({
        background: `conic-gradient(
                #3b82f6 0deg ${taskTypeDistribution.value[0].value * 3.6}deg,
                #10b981 ${taskTypeDistribution.value[0].value * 3.6}deg ${(taskTypeDistribution.value[0].value + taskTypeDistribution.value[1].value) * 3.6}deg,
                #f59e0b ${(taskTypeDistribution.value[0].value + taskTypeDistribution.value[1].value) * 3.6}deg 360deg
              )`
      })}" class="w-48 h-48 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-lg" data-v-85ab959b></div><div class="space-y-2" data-v-85ab959b><!--[-->`);
      ssrRenderList(taskTypeDistribution.value, (item, i) => {
        _push(`<div class="flex items-center gap-2" data-v-85ab959b><div style="${ssrRenderStyle({ backgroundColor: i === 0 ? "#3b82f6" : i === 1 ? "#10b981" : "#f59e0b" })}" class="w-4 h-4 rounded-full" data-v-85ab959b></div><span class="text-sm text-gray-700 dark:text-gray-300" data-v-85ab959b>${ssrInterpolate(item.name)}</span><span class="text-sm font-semibold text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(item.value)}%</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-v-85ab959b><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-v-85ab959b>Agent Performance</h3><div class="space-y-2" data-v-85ab959b><!--[-->`);
      ssrRenderList(agentPerformance.value, (item, i) => {
        _push(`<div class="flex items-center gap-3" data-v-85ab959b><span class="text-xs text-gray-600 dark:text-gray-400 w-32 truncate" data-v-85ab959b>${ssrInterpolate(item.agentName)}</span><div class="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative" data-v-85ab959b><div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${item.score}%` })}" data-v-85ab959b></div><span class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white" data-v-85ab959b>${ssrInterpolate(item.score)}% </span></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between" data-v-85ab959b><div class="flex-1 pr-4" data-v-85ab959b><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-v-85ab959b>Task Categories</h3><p class="text-sm text-gray-600 dark:text-gray-400" data-v-85ab959b>Distribution of tasks across different categories</p></div><div style="${ssrRenderStyle({
        background: `conic-gradient(
                #3b82f6 0deg ${taskTypeDistribution.value[0].value * 3.6}deg,
                #10b981 ${taskTypeDistribution.value[0].value * 3.6}deg ${(taskTypeDistribution.value[0].value + taskTypeDistribution.value[1].value) * 3.6}deg,
                #f59e0b ${(taskTypeDistribution.value[0].value + taskTypeDistribution.value[1].value) * 3.6}deg 360deg
              )`
      })}" class="w-48 h-48 rounded-full flex items-center justify-center shadow-lg relative" data-v-85ab959b><div class="absolute inset-0 bg-white dark:bg-gray-800 m-auto rounded-full" style="${ssrRenderStyle({ "width": "65%", "height": "65%" })}" data-v-85ab959b></div><div class="text-center relative z-10" data-v-85ab959b><div class="text-lg font-bold text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(taskTypeDistribution.value.reduce((sum, d) => sum + d.value, 0))}% </div><div class="text-xs text-gray-500" data-v-85ab959b>Total</div></div></div></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-v-85ab959b><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-v-85ab959b>Recent Activity</h3><div class="overflow-x-auto" data-v-85ab959b><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" data-v-85ab959b><thead class="bg-gray-50 dark:bg-gray-700" data-v-85ab959b><tr data-v-85ab959b><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-85ab959b>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-85ab959b>CPU Usage</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-85ab959b>Memory Usage</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-85ab959b>Tasks Completed</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" data-v-85ab959b><!--[-->`);
      ssrRenderList(recentActivity.value, (item, index) => {
        _push(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors" data-v-85ab959b><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" data-v-85ab959b>${ssrInterpolate(item.date)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" data-v-85ab959b><span class="${ssrRenderClass([
          "inline-block px-2 py-1 rounded-full text-xs",
          item.cpuUsage > 70 ? "bg-red-100 text-red-800" : item.cpuUsage > 50 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
        ])}" data-v-85ab959b>${ssrInterpolate(item.cpuUsage)}%</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" data-v-85ab959b><span class="${ssrRenderClass([
          "inline-block px-2 py-1 rounded-full text-xs",
          item.memoryUsage > 70 ? "bg-red-100 text-red-800" : item.memoryUsage > 50 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
        ])}" data-v-85ab959b>${ssrInterpolate(item.memoryUsage)}%</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" data-v-85ab959b>${ssrInterpolate(item.tasksCompleted)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400" data-v-85ab959b> Data is refreshed automatically every 5 minutes | Pro features available in Agent Orchestrator </div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AnalyticsDashboardView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AnalyticsDashboardView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85ab959b"]]);
export {
  AnalyticsDashboardView as default
};
