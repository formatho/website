import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { c as _sfc_main$1, _ as _export_sfc } from "../main.mjs";
import "./CardFooter-DjcCkgh0.js";
import { PlusIcon, SearchIcon, CalendarIcon, ClockIcon, EditIcon, Trash2Icon, FilterIcon } from "lucide-vue-next";
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
  __name: "TODOQueueView",
  __ssrInlineRender: true,
  setup(__props) {
    const tasks = ref([
      { id: "1", title: "Implement OAuth2 authentication flow", description: "Add secure OAuth2 login support for enterprise customers", priority: "critical", status: "in-progress", agentId: "3", agentName: "Backend Agent", dueDate: "2026-03-15", createdAt: "2026-03-08T10:00:00Z", tags: ["backend", "security"] },
      { id: "2", title: "Update API documentation", description: "Refresh endpoint documentation with new v2 endpoints", priority: "high", status: "pending", agentId: "4", agentName: "Documentation Agent", dueDate: "2026-03-12", createdAt: "2026-03-09T14:30:00Z", tags: ["documentation"] },
      { id: "3", title: "Fix mobile navigation bug", description: "Hamburger menu not closing on route change in Safari", priority: "medium", status: "blocked", agentId: "2", agentName: "Frontend Agent", createdAt: "2026-03-10T08:00:00Z", tags: ["frontend", "bug"] },
      { id: "4", title: "Optimize image compression pipeline", description: "Reduce processing time for large batch uploads", priority: "low", status: "pending", agentId: "5", agentName: "Performance Agent", createdAt: "2026-03-07T16:45:00Z", tags: ["performance", "optimization"] },
      { id: "5", title: "Add dark mode toggle", description: "Implement system preference detection and manual override", priority: "high", status: "in-progress", agentId: "2", agentName: "Frontend Agent", dueDate: "2026-03-14", createdAt: "2026-03-09T09:15:00Z", tags: ["frontend", "ui"] },
      { id: "6", title: "Setup CI/CD pipeline for mobile app", description: "Automate build and deployment for iOS and Android", priority: "critical", status: "pending", agentId: "6", agentName: "DevOps Agent", dueDate: "2026-03-18", createdAt: "2026-03-10T06:00:00Z", tags: ["devops", "mobile"] }
    ]);
    const searchQuery = ref("");
    const priorityFilter = ref("all");
    const statusFilter = ref("all");
    const sortBy = ref("priority");
    const sortOrder = ref("desc");
    const showFilters = ref(false);
    const filteredTasks = computed(() => {
      let result = [...tasks.value];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
          (task) => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query) || task.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      if (priorityFilter.value !== "all") {
        result = result.filter((task) => task.priority === priorityFilter.value);
      }
      if (statusFilter.value !== "all") {
        result = result.filter((task) => task.status === statusFilter.value);
      }
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortBy.value) {
          case "priority": {
            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            break;
          }
          case "dueDate":
            if (a.dueDate && b.dueDate) {
              comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else if (a.dueDate) {
              comparison = -1;
            } else if (b.dueDate) {
              comparison = 1;
            }
            break;
          case "createdAt":
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
        }
        return sortOrder.value === "asc" ? comparison : -comparison;
      });
      return result;
    });
    const totalTasks = computed(() => tasks.value.length);
    const completedTasks = computed(() => tasks.value.filter((t) => t.status === "completed").length);
    const pendingTasks = computed(() => tasks.value.filter((t) => t.status === "pending" || t.status === "in-progress").length);
    const criticalTasks = computed(() => tasks.value.filter((t) => t.priority === "critical" && t.status !== "completed").length);
    const progressPercentage = computed(() => {
      if (totalTasks.value === 0) return 0;
      return Math.round(completedTasks.value / totalTasks.value * 100);
    });
    const getPriorityColor = (priority) => {
      switch (priority) {
        case "critical":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        case "high":
          return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
        case "medium":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case "low":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      }
    };
    const getStatusIcon = (status) => {
      switch (status) {
        case "pending":
          return "circle";
        case "in-progress":
          return "play";
        case "completed":
          return "check-circle";
        case "blocked":
          return "alert-circle";
        default:
          return "circle";
      }
    };
    const formatDueDate = (date) => {
      if (!date) return null;
      const dueDate = new Date(date);
      const today = /* @__PURE__ */ new Date();
      if (dueDate < today) {
        return { text: "Overdue", color: "text-red-600 dark:text-red-400" };
      } else if (dueDate.getTime() === today.getTime()) {
        return { text: "Today", color: "text-orange-600 dark:text-orange-400" };
      } else if (dueDate.getTime() < today.getTime() + 7 * 24 * 60 * 60 * 1e3) {
        return { text: "Due in " + Math.round((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1e3)) + " days", color: "text-yellow-600 dark:text-yellow-400" };
      } else {
        return { text: dueDate.toLocaleDateString(), color: "text-gray-600 dark:text-gray-400" };
      }
    };
    const toggleTaskStatus = (taskId) => {
      const task = tasks.value.find((t) => t.id === taskId);
      if (!task) return;
      const statusMap = {
        "pending": "in-progress",
        "in-progress": "completed",
        "completed": "pending",
        "blocked": "pending"
      };
      task.status = statusMap[task.status];
    };
    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter((t) => t.id !== taskId);
    };
    const clearCompleted = () => {
      tasks.value = tasks.value.filter((t) => t.status !== "completed");
    };
    const resetFilters = () => {
      searchQuery.value = "";
      priorityFilter.value = "all";
      statusFilter.value = "all";
    };
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "f":
            e.preventDefault();
            showFilters.value = !showFilters.value;
            break;
          case "/":
            e.preventDefault();
            break;
        }
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_ActivityIcon = resolveComponent("ActivityIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-e463d724><div class="flex items-center justify-between" data-v-e463d724><div data-v-e463d724><h1 class="text-3xl font-bold text-gray-900 dark:text-white" data-v-e463d724>TODO Queue</h1><p class="text-gray-600 dark:text-gray-400 mt-1" data-v-e463d724>Manage and track tasks across all agents</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => _ctx.$router.push(`/agent-orchestrator/config`),
        "aria-label": "Add new task",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(` Add Task `);
          } else {
            return [
              createVNode(unref(PlusIcon), { class: "w-5 h-5" }),
              createTextVNode(" Add Task ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-4 gap-6" data-v-e463d724><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-e463d724><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-e463d724>Total Tasks</p><p class="text-3xl font-bold text-gray-900 dark:text-white mt-2" data-v-e463d724>${ssrInterpolate(totalTasks.value)}</p></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-e463d724><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-e463d724>In Progress</p><p class="text-3xl font-bold text-blue-600 mt-2" data-v-e463d724>${ssrInterpolate(pendingTasks.value)}</p></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-e463d724><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-e463d724>Completed</p><p class="text-3xl font-bold text-green-600 mt-2" data-v-e463d724>${ssrInterpolate(completedTasks.value)}</p></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-e463d724><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-e463d724>Critical</p><p class="text-3xl font-bold text-red-600 mt-2" data-v-e463d724>${ssrInterpolate(criticalTasks.value)}</p></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-e463d724><div class="flex items-center justify-between mb-3" data-v-e463d724><span class="text-sm font-medium text-gray-700 dark:text-gray-300" data-v-e463d724>Overall Progress</span><span class="text-sm font-bold text-blue-600" data-v-e463d724>${ssrInterpolate(progressPercentage.value)}%</span></div><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden" data-v-e463d724><div class="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500" style="${ssrRenderStyle({ width: `${progressPercentage.value}%` })}" data-v-e463d724></div></div><div class="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400" data-v-e463d724><span data-v-e463d724>${ssrInterpolate(completedTasks.value)} / ${ssrInterpolate(totalTasks.value)} tasks completed</span></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4" data-v-e463d724><div class="flex items-center gap-4 flex-wrap" data-v-e463d724><div class="relative flex-1 min-w-[200px] max-w-md" data-v-e463d724>`);
      _push(ssrRenderComponent(unref(SearchIcon), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search tasks..." class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-e463d724></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => showFilters.value = !showFilters.value,
        "aria-label": "Toggle filters",
        variant: showFilters.value ? "default" : "outline",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "filter",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` Filters `);
            if (showFilters.value) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "chevron-down",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "chevron-up",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              createVNode(_component_Icon, {
                name: "filter",
                class: "w-5 h-5"
              }),
              createTextVNode(" Filters "),
              showFilters.value ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "chevron-down",
                class: "w-4 h-4"
              })) : (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "chevron-up",
                class: "w-4 h-4"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<select class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-e463d724><option value="priority" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "priority") : ssrLooseEqual(sortBy.value, "priority")) ? " selected" : ""}>Sort by Priority</option><option value="dueDate" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "dueDate") : ssrLooseEqual(sortBy.value, "dueDate")) ? " selected" : ""}>Sort by Due Date</option><option value="createdAt" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "createdAt") : ssrLooseEqual(sortBy.value, "createdAt")) ? " selected" : ""}>Sort by Created</option></select>`);
      if (completedTasks.value > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: clearCompleted,
          "aria-label": "Clear completed tasks",
          variant: "ghost",
          class: "text-red-600 hover:text-red-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Clear Completed `);
            } else {
              return [
                createTextVNode(" Clear Completed ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (searchQuery.value || priorityFilter.value !== "all" || statusFilter.value !== "all") {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: resetFilters,
          "aria-label": "Reset all filters",
          variant: "ghost"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset Filters `);
            } else {
              return [
                createTextVNode(" Reset Filters ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showFilters.value) {
        _push(`<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4" data-v-e463d724><div data-v-e463d724><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-v-e463d724>Priority</label><select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-e463d724><option value="all" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "all") : ssrLooseEqual(priorityFilter.value, "all")) ? " selected" : ""}>All Priorities</option><option value="critical" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "critical") : ssrLooseEqual(priorityFilter.value, "critical")) ? " selected" : ""}>Critical</option><option value="high" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "high") : ssrLooseEqual(priorityFilter.value, "high")) ? " selected" : ""}>High</option><option value="medium" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "medium") : ssrLooseEqual(priorityFilter.value, "medium")) ? " selected" : ""}>Medium</option><option value="low" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "low") : ssrLooseEqual(priorityFilter.value, "low")) ? " selected" : ""}>Low</option></select></div><div data-v-e463d724><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-v-e463d724>Status</label><select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-e463d724><option value="all" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "all") : ssrLooseEqual(statusFilter.value, "all")) ? " selected" : ""}>All Statuses</option><option value="pending" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "pending") : ssrLooseEqual(statusFilter.value, "pending")) ? " selected" : ""}>Pending</option><option value="in-progress" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "in-progress") : ssrLooseEqual(statusFilter.value, "in-progress")) ? " selected" : ""}>In Progress</option><option value="completed" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "completed") : ssrLooseEqual(statusFilter.value, "completed")) ? " selected" : ""}>Completed</option><option value="blocked" data-v-e463d724${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "blocked") : ssrLooseEqual(statusFilter.value, "blocked")) ? " selected" : ""}>Blocked</option></select></div><div data-v-e463d724><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-v-e463d724>Sort Order</label>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: ($event) => sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc",
          variant: "outline",
          "aria-label": "Toggle sort order",
          class: "w-full flex items-center justify-between"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(sortOrder.value === "desc" ? "Descending (High → Low)" : "Ascending (Low → High)")} `);
              if (sortOrder.value === "desc") {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "chevron-down",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "chevron-up",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                createTextVNode(toDisplayString(sortOrder.value === "desc" ? "Descending (High → Low)" : "Ascending (Low → High)") + " ", 1),
                sortOrder.value === "desc" ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: "chevron-down",
                  class: "w-4 h-4"
                })) : (openBlock(), createBlock(_component_Icon, {
                  key: 1,
                  name: "chevron-up",
                  class: "w-4 h-4"
                }))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-3" data-v-e463d724><!--[-->`);
      ssrRenderList(filteredTasks.value, (task) => {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow" data-v-e463d724><div class="flex items-start justify-between" data-v-e463d724><div class="flex-1 min-w-0" data-v-e463d724><div class="flex items-center gap-3 mb-2" data-v-e463d724>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: ($event) => toggleTaskStatus(task.id),
          variant: "ghost",
          size: "icon",
          "aria-label": "Toggle task status: " + task.title,
          class: "text-gray-400 hover:text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: getStatusIcon(task.status),
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: getStatusIcon(task.status),
                  class: "w-4 h-4"
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<h3 class="${ssrRenderClass([
          "font-semibold text-gray-900 dark:text-white",
          task.status === "completed" ? "line-through text-gray-500 dark:text-gray-400" : ""
        ])}" data-v-e463d724>${ssrInterpolate(task.title)}</h3><span class="${ssrRenderClass(["px-2.5 py-0.5 rounded-full text-xs font-medium", getPriorityColor(task.priority)])}" data-v-e463d724>${ssrInterpolate(task.priority)}</span></div><p class="text-sm text-gray-600 dark:text-gray-400 mb-3" data-v-e463d724>${ssrInterpolate(task.description)}</p><div class="flex items-center gap-4 flex-wrap" data-v-e463d724>`);
        if (task.agentName) {
          _push(`<div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" data-v-e463d724>`);
          _push(ssrRenderComponent(_component_ActivityIcon, { class: "w-4 h-4" }, null, _parent));
          _push(` ${ssrInterpolate(task.agentName)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (task.dueDate) {
          _push(`<div class="${ssrRenderClass([formatDueDate(task.dueDate)?.color, "flex items-center gap-1.5 text-sm"])}" data-v-e463d724>`);
          _push(ssrRenderComponent(unref(CalendarIcon), { class: "w-4 h-4" }, null, _parent));
          _push(` ${ssrInterpolate(formatDueDate(task.dueDate)?.text)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" data-v-e463d724>`);
        _push(ssrRenderComponent(unref(ClockIcon), { class: "w-4 h-4" }, null, _parent));
        _push(` ${ssrInterpolate(new Date(task.createdAt).toLocaleDateString())}</div><div class="flex flex-wrap gap-1.5 mt-2" data-v-e463d724><!--[-->`);
        ssrRenderList(task.tags, (tag) => {
          _push(`<span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium capitalize" data-v-e463d724>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></div><div class="flex items-center gap-2 ml-4" data-v-e463d724>`);
        if (task.agentId) {
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            onClick: ($event) => _ctx.$router.push(`/agent-orchestrator/${task.agentId}`),
            variant: "ghost",
            size: "icon",
            "aria-label": "View agent details",
            class: "text-blue-600 hover:bg-blue-50",
            title: "View Agent"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(EditIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(EditIcon), { class: "w-4 h-4" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: ($event) => deleteTask(task.id),
          variant: "ghost",
          size: "icon",
          "aria-label": "Delete task",
          class: "text-red-600 hover:bg-red-50",
          title: "Delete Task"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Trash2Icon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Trash2Icon), { class: "w-4 h-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredTasks.value.length === 0) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center" data-v-e463d724>`);
        _push(ssrRenderComponent(unref(FilterIcon), { class: "w-16 h-16 text-gray-400 mx-auto mb-4" }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-v-e463d724>No tasks found</h3><p class="text-gray-600 dark:text-gray-400 mb-4" data-v-e463d724>Try adjusting your filters or search query</p>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: resetFilters,
          "aria-label": "Reset all filters"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset Filters `);
            } else {
              return [
                createTextVNode(" Reset Filters ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4" data-v-e463d724><p class="text-sm text-gray-600 dark:text-gray-400 mb-2" data-v-e463d724><strong data-v-e463d724>Keyboard shortcuts:</strong></p><div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500" data-v-e463d724><span data-v-e463d724><kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600" data-v-e463d724>Ctrl</kbd> + <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600" data-v-e463d724>F</kbd> Toggle filters</span><span data-v-e463d724><kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600" data-v-e463d724>/</kbd> Search tasks</span></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TODOQueueView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TODOQueueView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e463d724"]]);
export {
  TODOQueueView as default
};
