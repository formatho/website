import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6 } from "../main.mjs";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
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
  __name: "UserAgentParserView",
  __ssrInlineRender: true,
  setup(__props) {
    const userAgent = ref("");
    const parsedInfo = computed(() => {
      const ua = userAgent.value || (typeof navigator !== "undefined" ? navigator.userAgent : "");
      const browserPatterns = [
        { name: "Edge", pattern: /Edge\/(\d+)/ },
        { name: "Opera", pattern: /OPR\/(\d+)/ },
        { name: "Chrome", pattern: /Chrome\/(\d+)/ },
        { name: "Firefox", pattern: /Firefox\/(\d+)/ },
        { name: "Safari", pattern: /Version\/(\d+).*Safari/ },
        { name: "IE", pattern: /MSIE (\d+)/ }
      ];
      const osPatterns = [
        { name: "Windows 11", pattern: /Windows NT 11/ },
        { name: "Windows 10", pattern: /Windows NT 10/ },
        { name: "Windows", pattern: /Windows/ },
        { name: "macOS", pattern: /Mac OS X/ },
        { name: "Linux", pattern: /Linux/ },
        { name: "Android", pattern: /Android/ },
        { name: "iOS", pattern: /iPhone|iPad/ }
      ];
      const devicePatterns = [
        { name: "Mobile", pattern: /Mobile/ },
        { name: "Tablet", pattern: /Tablet|iPad/ },
        { name: "Desktop", pattern: /./ }
      ];
      let browser = "Unknown";
      let browserVersion = "";
      for (const { name, pattern } of browserPatterns) {
        const match = ua.match(pattern);
        if (match) {
          browser = name;
          browserVersion = match[1] ?? "";
          break;
        }
      }
      let os = "Unknown";
      for (const { name, pattern } of osPatterns) {
        if (pattern.test(ua)) {
          os = name;
          break;
        }
      }
      let device = "Unknown";
      for (const { name, pattern } of devicePatterns) {
        if (pattern.test(ua)) {
          device = name;
          break;
        }
      }
      return {
        browser,
        browserVersion,
        os,
        device,
        userAgent: ua
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">User Agent Parser</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Parse User Agent String`);
                      } else {
                        return [
                          createTextVNode("Parse User Agent String")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Parse User Agent String")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`User Agent String`);
                      } else {
                        return [
                          createTextVNode("User Agent String")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: userAgent.value,
                    "onUpdate:modelValue": ($event) => userAgent.value = $event,
                    "aria-label": "User agent string to parse",
                    placeholder: "Enter user agent or leave empty to use your browser's..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("User Agent String")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: userAgent.value,
                        "onUpdate:modelValue": ($event) => userAgent.value = $event,
                        "aria-label": "User agent string to parse",
                        placeholder: "Enter user agent or leave empty to use your browser's..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Parse User Agent String")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("User Agent String")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: userAgent.value,
                      "onUpdate:modelValue": ($event) => userAgent.value = $event,
                      "aria-label": "User agent string to parse",
                      placeholder: "Enter user agent or leave empty to use your browser's..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Browser</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(parsedInfo.value.browser)}</div><div class="text-sm text-muted-foreground"${_scopeId2}>v${ssrInterpolate(parsedInfo.value.browserVersion)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Browser"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.browser), 1),
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "v" + toDisplayString(parsedInfo.value.browserVersion), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Browser"),
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.browser), 1),
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "v" + toDisplayString(parsedInfo.value.browserVersion), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Operating System</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(parsedInfo.value.os)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Operating System"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.os), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Operating System"),
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.os), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Device Type</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(parsedInfo.value.device)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Device Type"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.device), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, "Device Type"),
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedInfo.value.device), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Full User Agent`);
                      } else {
                        return [
                          createTextVNode("Full User Agent")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Full User Agent")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(parsedInfo.value.userAgent)}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(parsedInfo.value.userAgent), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Full User Agent")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(parsedInfo.value.userAgent), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/UserAgentParserView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
