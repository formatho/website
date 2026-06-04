import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { c as _sfc_main$1 } from "../main.mjs";
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
  __name: "BetaFeedbackView",
  __ssrInlineRender: true,
  props: {
    betaTesterId: {},
    email: {}
  },
  setup(__props) {
    const props = __props;
    const feedbackType = ref("general");
    const rating = ref(0);
    const title = ref("");
    const description = ref("");
    const email = ref(props.email || "");
    const name = ref("");
    const priority = ref("medium");
    const browser = ref("");
    const stepsToReproduce = ref("");
    const expectedBehavior = ref("");
    const actualBehavior = ref("");
    const files = ref([]);
    const isSubmitting = ref(false);
    const submitted = ref(false);
    const error = ref("");
    computed(() => feedbackType.value === "bug");
    if (typeof navigator !== "undefined") {
      browser.value = navigator.userAgent;
    }
    const feedbackTypes = [
      { value: "bug", label: "🐛 Bug Report", icon: "🐛" },
      { value: "feature", label: "💡 Feature Request", icon: "💡" },
      { value: "testimonial", label: "⭐ Testimonial", icon: "⭐" },
      { value: "general", label: "💬 General Feedback", icon: "💬" }
    ];
    const priorities = [
      { value: "low", label: "Low - Minor issue", color: "gray" },
      { value: "medium", label: "Medium - Affects workflow", color: "yellow" },
      { value: "high", label: "High - Blocking work", color: "orange" },
      { value: "critical", label: "Critical - System down", color: "red" }
    ];
    const removeFile = (index) => {
      files.value.splice(index, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto p-6" }, _attrs))}>`);
      if (submitted.value) {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">✅</div><h2 class="text-2xl font-bold mb-2">Thank You!</h2><p class="text-muted-foreground mb-6"> Your feedback has been submitted successfully. We&#39;ll review it and get back to you soon. </p>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: ($event) => {
            submitted.value = false;
            title.value = "";
            description.value = "";
            rating.value = 0;
          },
          "aria-label": "Submit another feedback"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit Another `);
            } else {
              return [
                createTextVNode(" Submit Another ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<form class="space-y-6"><div class="text-center mb-8"><h1 class="text-3xl font-bold mb-2">Beta Feedback</h1><p class="text-muted-foreground">Help us improve Formatho by sharing your experience</p></div><div class="space-y-3"><label class="text-sm font-medium">Feedback Type *</label><div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
        ssrRenderList(feedbackTypes, (type) => {
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            key: type.value,
            type: "button",
            onClick: ($event) => feedbackType.value = type.value,
            variant: feedbackType.value === type.value ? "default" : "outline",
            class: "p-4 h-auto flex-col",
            "aria-label": "Select " + type.label + " feedback type"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="text-2xl mb-1"${_scopeId}>${ssrInterpolate(type.icon)}</div><div class="text-sm font-medium"${_scopeId}>${ssrInterpolate(type.label.split(" ")[1])}</div>`);
              } else {
                return [
                  createVNode("div", { class: "text-2xl mb-1" }, toDisplayString(type.icon), 1),
                  createVNode("div", { class: "text-sm font-medium" }, toDisplayString(type.label.split(" ")[1]), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
        if (feedbackType.value === "testimonial" || feedbackType.value === "general") {
          _push(`<div class="space-y-3"><label class="text-sm font-medium">Overall Rating</label><div class="flex gap-2"><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(ssrRenderComponent(unref(_sfc_main$1), {
              key: i,
              type: "button",
              onClick: ($event) => rating.value = i,
              "aria-label": "Rate " + i + " out of 5 stars",
              variant: "ghost",
              class: "text-3xl hover:scale-110"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(i <= rating.value ? "⭐" : "☆")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(i <= rating.value ? "⭐" : "☆"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Name</label><input${ssrRenderAttr("value", name.value)} type="text" aria-label="Your name" placeholder="Your name" class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Email *</label><input${ssrRenderAttr("value", email.value)} type="email" required aria-label="Your email address" placeholder="your@email.com" class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"></div></div><div class="space-y-2"><label class="text-sm font-medium">Title *</label><input${ssrRenderAttr("value", title.value)} type="text" required aria-label="Feedback title" placeholder="Brief summary of your feedback" class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"></div>`);
        if (feedbackType.value === "bug" || feedbackType.value === "feature") {
          _push(`<div class="space-y-3"><label class="text-sm font-medium">Priority</label><div class="grid grid-cols-2 md:grid-cols-4 gap-2"><!--[-->`);
          ssrRenderList(priorities, (p) => {
            _push(ssrRenderComponent(unref(_sfc_main$1), {
              key: p.value,
              type: "button",
              onClick: ($event) => priority.value = p.value,
              variant: priority.value === p.value ? "default" : "outline",
              size: "sm",
              "aria-label": "Set priority to " + p.label
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(p.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(p.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-2"><label class="text-sm font-medium">Description *</label><textarea required rows="5" aria-label="Feedback description"${ssrRenderAttr("placeholder", feedbackType.value === "bug" ? "Describe what happened..." : feedbackType.value === "feature" ? "Describe the feature you'd like..." : feedbackType.value === "testimonial" ? "Share your experience with Formatho..." : "Share your thoughts...")} class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none">${ssrInterpolate(description.value)}</textarea></div>`);
        if (feedbackType.value === "bug") {
          _push(`<div class="space-y-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg"><h3 class="font-semibold text-red-600">Bug Details</h3><div class="space-y-2"><label class="text-sm font-medium">Steps to Reproduce</label><textarea rows="3" aria-label="Steps to reproduce" placeholder="1. Go to...
2. Click on...
3. See error..." class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none">${ssrInterpolate(stepsToReproduce.value)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Expected Behavior</label><input${ssrRenderAttr("value", expectedBehavior.value)} type="text" aria-label="Expected behavior" placeholder="What should have happened?" class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Actual Behavior</label><input${ssrRenderAttr("value", actualBehavior.value)} type="text" aria-label="Actual behavior" placeholder="What actually happened?" class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-2"><label class="text-sm font-medium">Attachments (optional)</label><div class="border-2 border-dashed border-border rounded-lg p-6 text-center"><input type="file" multiple accept="image/*,.pdf,.txt" aria-label="Upload file attachments" class="hidden" id="file-upload"><label for="file-upload" class="cursor-pointer"><div class="text-4xl mb-2">📎</div><p class="text-sm text-muted-foreground"> Click to upload screenshots or files (max 5) </p></label></div>`);
        if (files.value.length > 0) {
          _push(`<div class="space-y-2"><!--[-->`);
          ssrRenderList(files.value, (file, index) => {
            _push(`<div class="flex items-center justify-between p-2 bg-muted rounded"><span class="text-sm truncate">${ssrInterpolate(file.name)}</span>`);
            _push(ssrRenderComponent(unref(_sfc_main$1), {
              type: "button",
              onClick: ($event) => removeFile(index),
              variant: "ghost",
              size: "icon",
              "aria-label": "Remove file",
              class: "text-red-500 hover:text-red-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` ✕ `);
                } else {
                  return [
                    createTextVNode(" ✕ ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (error.value) {
          _push(`<div class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"><p class="text-sm text-red-600">${ssrInterpolate(error.value)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          type: "submit",
          loading: isSubmitting.value,
          size: "lg",
          "aria-label": "Submit feedback",
          class: "w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit Feedback `);
            } else {
              return [
                createTextVNode(" Submit Feedback ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p class="text-xs text-muted-foreground text-center"> Your feedback helps us improve. We may contact you for follow-up questions. </p></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BetaFeedbackView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
