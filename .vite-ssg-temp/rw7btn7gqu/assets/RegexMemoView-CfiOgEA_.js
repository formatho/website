import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2, a as _sfc_main$4, b as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$3 } from "../main.mjs";
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
  __name: "RegexMemoView",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const regexPatterns = [
      {
        category: "Character Classes",
        patterns: [
          { pattern: ".", desc: "Any character except newline" },
          { pattern: "\\d", desc: "Digit (0-9)" },
          { pattern: "\\D", desc: "Non-digit" },
          { pattern: "\\w", desc: "Word character (a-z, A-Z, 0-9, _)" },
          { pattern: "\\W", desc: "Non-word character" },
          { pattern: "\\s", desc: "Whitespace (space, tab, newline)" },
          { pattern: "\\S", desc: "Non-whitespace" }
        ]
      },
      {
        category: "Anchors",
        patterns: [
          { pattern: "^", desc: "Start of string" },
          { pattern: "$", desc: "End of string" },
          { pattern: "\\b", desc: "Word boundary" },
          { pattern: "\\B", desc: "Non-word boundary" }
        ]
      },
      {
        category: "Quantifiers",
        patterns: [
          { pattern: "*", desc: "Zero or more" },
          { pattern: "+", desc: "One or more" },
          { pattern: "?", desc: "Zero or one (optional)" },
          { pattern: "{n}", desc: "Exactly n times" },
          { pattern: "{n,}", desc: "n or more times" },
          { pattern: "{n,m}", desc: "Between n and m times" }
        ]
      },
      {
        category: "Groups",
        patterns: [
          { pattern: "(...)", desc: "Capturing group" },
          { pattern: "(?:...)", desc: "Non-capturing group" },
          { pattern: "(?=...)", desc: "Positive lookahead" },
          { pattern: "(?!...)", desc: "Negative lookahead" }
        ]
      },
      {
        category: "Common Patterns",
        patterns: [
          { pattern: "[a-zA-Z]", desc: "Any letter" },
          { pattern: "[0-9]", desc: "Any digit" },
          { pattern: "[a-zA-Z0-9]", desc: "Alphanumeric" },
          { pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", desc: "Email" },
          { pattern: "^https?:\\/\\/[\\S]+$", desc: "URL" },
          { pattern: "^\\d{4}-\\d{2}-\\d{2}$", desc: "Date (YYYY-MM-DD)" }
        ]
      }
    ];
    const filteredPatterns = computed(() => {
      if (!searchQuery.value) return regexPatterns;
      return regexPatterns.map((cat) => ({
        ...cat,
        patterns: cat.patterns.filter(
          (p) => p.pattern.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })).filter((cat) => cat.patterns.length > 0);
    });
    const copyPattern = (pattern) => {
      navigator.clipboard.writeText(pattern);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Regex Cheat Sheet</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    "aria-label": "Search regex patterns",
                    placeholder: "Search patterns...",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), {
                      modelValue: searchQuery.value,
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      "aria-label": "Search regex patterns",
                      placeholder: "Search patterns...",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    "aria-label": "Search regex patterns",
                    placeholder: "Search patterns...",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(filteredPatterns.value, (category) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          key: category.category
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-lg" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.category)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.category), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(category.category), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "space-y-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(category.patterns, (item, idx) => {
                      _push3(`<div class="p-2 rounded bg-muted hover:bg-muted/80 transition-colors cursor-pointer group"${_scopeId2}><code class="text-sm font-mono break-all"${_scopeId2}>${ssrInterpolate(item.pattern)}</code><div class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(item.desc)}</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(category.patterns, (item, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "p-2 rounded bg-muted hover:bg-muted/80 transition-colors cursor-pointer group",
                          onClick: ($event) => copyPattern(item.pattern)
                        }, [
                          createVNode("code", { class: "text-sm font-mono break-all" }, toDisplayString(item.pattern), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(item.desc), 1)
                        ], 8, ["onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(category.category), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$2), { class: "space-y-2" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(category.patterns, (item, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "p-2 rounded bg-muted hover:bg-muted/80 transition-colors cursor-pointer group",
                        onClick: ($event) => copyPattern(item.pattern)
                      }, [
                        createVNode("code", { class: "text-sm font-mono break-all" }, toDisplayString(item.pattern), 1),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(item.desc), 1)
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RegexMemoView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
