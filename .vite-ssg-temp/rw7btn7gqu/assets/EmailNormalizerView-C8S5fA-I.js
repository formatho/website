import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
  __name: "EmailNormalizerView",
  __ssrInlineRender: true,
  setup(__props) {
    const emailInput = ref("");
    const normalizedEmail = computed(() => {
      if (!emailInput.value) return "";
      return emailInput.value.toLowerCase().trim();
    });
    const analysis = computed(() => {
      const email = normalizedEmail.value;
      if (!email) return null;
      const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const parts = email.split("@");
      const localPart = parts[0] || "";
      const domain = parts[1] || "";
      return {
        normalized: email,
        validFormat,
        localPart,
        domain,
        length: email.length,
        hasPlus: localPart.includes("+"),
        hasDot: localPart.includes(".")
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Email Normalizer</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Normalize Email Address`);
                      } else {
                        return [
                          createTextVNode("Normalize Email Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Normalize Email Address")
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
                        _push4(`Input Email`);
                      } else {
                        return [
                          createTextVNode("Input Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: emailInput.value,
                    "onUpdate:modelValue": ($event) => emailInput.value = $event,
                    placeholder: "Enter email address...",
                    "aria-label": "Email address to normalize"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input Email")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: emailInput.value,
                        "onUpdate:modelValue": ($event) => emailInput.value = $event,
                        placeholder: "Enter email address...",
                        "aria-label": "Email address to normalize"
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
                      createTextVNode("Normalize Email Address")
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
                        createTextVNode("Input Email")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: emailInput.value,
                      "onUpdate:modelValue": ($event) => emailInput.value = $event,
                      placeholder: "Enter email address...",
                      "aria-label": "Email address to normalize"
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
      if (analysis.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Normalized Email</div><div class="text-xl font-mono font-bold break-all"${_scopeId2}>${ssrInterpolate(analysis.value.normalized)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Normalized Email"),
                      createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(analysis.value.normalized), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Normalized Email"),
                    createVNode("div", { class: "text-xl font-mono font-bold break-all" }, toDisplayString(analysis.value.normalized), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Valid Format</div><div class="${ssrRenderClass([
                      "text-2xl font-bold",
                      analysis.value.validFormat ? "text-green-600" : "text-red-600"
                    ])}"${_scopeId2}>${ssrInterpolate(analysis.value.validFormat ? "✓ Yes" : "✗ No")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Valid Format"),
                      createVNode("div", {
                        class: [
                          "text-2xl font-bold",
                          analysis.value.validFormat ? "text-green-600" : "text-red-600"
                        ]
                      }, toDisplayString(analysis.value.validFormat ? "✓ Yes" : "✗ No"), 3)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Valid Format"),
                    createVNode("div", {
                      class: [
                        "text-2xl font-bold",
                        analysis.value.validFormat ? "text-green-600" : "text-red-600"
                      ]
                    }, toDisplayString(analysis.value.validFormat ? "✓ Yes" : "✗ No"), 3)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Local Part</div><div class="text-xl font-mono break-all"${_scopeId2}>${ssrInterpolate(analysis.value.localPart)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Local Part"),
                      createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(analysis.value.localPart), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Local Part"),
                    createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(analysis.value.localPart), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Domain</div><div class="text-xl font-mono break-all"${_scopeId2}>${ssrInterpolate(analysis.value.domain)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Domain"),
                      createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(analysis.value.domain), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Domain"),
                    createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(analysis.value.domain), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-3"${_scopeId2}>Analysis</div><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div class="p-2 rounded bg-muted"${_scopeId2}>Length: ${ssrInterpolate(analysis.value.length)} chars</div><div class="${ssrRenderClass([
                      "p-2 rounded",
                      analysis.value.hasPlus ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                    ])}"${_scopeId2}> Has +: ${ssrInterpolate(analysis.value.hasPlus ? "Yes" : "No")}</div><div class="${ssrRenderClass([
                      "p-2 rounded",
                      analysis.value.hasDot ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                    ])}"${_scopeId2}> Has dot: ${ssrInterpolate(analysis.value.hasDot ? "Yes" : "No")}</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-3" }, "Analysis"),
                      createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                        createVNode("div", { class: "p-2 rounded bg-muted" }, "Length: " + toDisplayString(analysis.value.length) + " chars", 1),
                        createVNode("div", {
                          class: [
                            "p-2 rounded",
                            analysis.value.hasPlus ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                          ]
                        }, " Has +: " + toDisplayString(analysis.value.hasPlus ? "Yes" : "No"), 3),
                        createVNode("div", {
                          class: [
                            "p-2 rounded",
                            analysis.value.hasDot ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                          ]
                        }, " Has dot: " + toDisplayString(analysis.value.hasDot ? "Yes" : "No"), 3)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-3" }, "Analysis"),
                    createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                      createVNode("div", { class: "p-2 rounded bg-muted" }, "Length: " + toDisplayString(analysis.value.length) + " chars", 1),
                      createVNode("div", {
                        class: [
                          "p-2 rounded",
                          analysis.value.hasPlus ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                        ]
                      }, " Has +: " + toDisplayString(analysis.value.hasPlus ? "Yes" : "No"), 3),
                      createVNode("div", {
                        class: [
                          "p-2 rounded",
                          analysis.value.hasDot ? "bg-blue-500/10 text-blue-600" : "bg-muted"
                        ]
                      }, " Has dot: " + toDisplayString(analysis.value.hasDot ? "Yes" : "No"), 3)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/EmailNormalizerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
