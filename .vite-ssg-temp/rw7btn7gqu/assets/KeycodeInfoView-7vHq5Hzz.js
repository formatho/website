import { defineComponent, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$5 } from "../main.mjs";
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
  __name: "KeycodeInfoView",
  __ssrInlineRender: true,
  setup(__props) {
    const keyInfo = ref(null);
    const handleKeyDown = (e) => {
      keyInfo.value = {
        key: e.key,
        keyCode: e.keyCode,
        code: e.code,
        which: e.which,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        location: e.location
      };
      e.preventDefault();
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Keycode Info</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Press Any Key`);
                      } else {
                        return [
                          createTextVNode("Press Any Key")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Press Any Key")
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
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    placeholder: "Click here and press any key...",
                    "aria-label": "Keycode detector - press any key",
                    class: "text-center text-xl h-16",
                    readonly: "",
                    "model-value": keyInfo.value?.key || ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), {
                      placeholder: "Click here and press any key...",
                      "aria-label": "Keycode detector - press any key",
                      class: "text-center text-xl h-16",
                      readonly: "",
                      "model-value": keyInfo.value?.key || ""
                    }, null, 8, ["model-value"])
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
                      createTextVNode("Press Any Key")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), {
                    placeholder: "Click here and press any key...",
                    "aria-label": "Keycode detector - press any key",
                    class: "text-center text-xl h-16",
                    readonly: "",
                    "model-value": keyInfo.value?.key || ""
                  }, null, 8, ["model-value"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (keyInfo.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Key</div><div class="text-3xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(keyInfo.value.key)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Key"),
                      createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.key), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Key"),
                    createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.key), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>KeyCode (deprecated)</div><div class="text-3xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(keyInfo.value.keyCode)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "KeyCode (deprecated)"),
                      createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.keyCode), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "KeyCode (deprecated)"),
                    createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.keyCode), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Code</div><div class="text-xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(keyInfo.value.code)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Code"),
                      createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(keyInfo.value.code), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Code"),
                    createVNode("div", { class: "text-xl font-mono font-bold" }, toDisplayString(keyInfo.value.code), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Which (deprecated)</div><div class="text-3xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(keyInfo.value.which)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Which (deprecated)"),
                      createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.which), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Which (deprecated)"),
                    createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.which), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Location</div><div class="text-3xl font-mono font-bold"${_scopeId2}>${ssrInterpolate(keyInfo.value.location)}</div><div class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(keyInfo.value.location === 0 ? "Standard" : keyInfo.value.location === 1 ? "Left" : keyInfo.value.location === 2 ? "Right" : "Numpad")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Location"),
                      createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.location), 1),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(keyInfo.value.location === 0 ? "Standard" : keyInfo.value.location === 1 ? "Left" : keyInfo.value.location === 2 ? "Right" : "Numpad"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Location"),
                    createVNode("div", { class: "text-3xl font-mono font-bold" }, toDisplayString(keyInfo.value.location), 1),
                    createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(keyInfo.value.location === 0 ? "Standard" : keyInfo.value.location === 1 ? "Left" : keyInfo.value.location === 2 ? "Right" : "Numpad"), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground mb-3"${_scopeId2}>Modifiers</div><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div class="${ssrRenderClass([
                      "p-2 rounded text-center",
                      keyInfo.value.ctrlKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                    ])}"${_scopeId2}> Ctrl: ${ssrInterpolate(keyInfo.value.ctrlKey ? "Yes" : "No")}</div><div class="${ssrRenderClass([
                      "p-2 rounded text-center",
                      keyInfo.value.altKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                    ])}"${_scopeId2}> Alt: ${ssrInterpolate(keyInfo.value.altKey ? "Yes" : "No")}</div><div class="${ssrRenderClass([
                      "p-2 rounded text-center",
                      keyInfo.value.shiftKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                    ])}"${_scopeId2}> Shift: ${ssrInterpolate(keyInfo.value.shiftKey ? "Yes" : "No")}</div><div class="${ssrRenderClass([
                      "p-2 rounded text-center",
                      keyInfo.value.metaKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                    ])}"${_scopeId2}> Meta: ${ssrInterpolate(keyInfo.value.metaKey ? "Yes" : "No")}</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-3" }, "Modifiers"),
                      createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                        createVNode("div", {
                          class: [
                            "p-2 rounded text-center",
                            keyInfo.value.ctrlKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                          ]
                        }, " Ctrl: " + toDisplayString(keyInfo.value.ctrlKey ? "Yes" : "No"), 3),
                        createVNode("div", {
                          class: [
                            "p-2 rounded text-center",
                            keyInfo.value.altKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                          ]
                        }, " Alt: " + toDisplayString(keyInfo.value.altKey ? "Yes" : "No"), 3),
                        createVNode("div", {
                          class: [
                            "p-2 rounded text-center",
                            keyInfo.value.shiftKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                          ]
                        }, " Shift: " + toDisplayString(keyInfo.value.shiftKey ? "Yes" : "No"), 3),
                        createVNode("div", {
                          class: [
                            "p-2 rounded text-center",
                            keyInfo.value.metaKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                          ]
                        }, " Meta: " + toDisplayString(keyInfo.value.metaKey ? "Yes" : "No"), 3)
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
                    createVNode("div", { class: "text-sm text-muted-foreground mb-3" }, "Modifiers"),
                    createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                      createVNode("div", {
                        class: [
                          "p-2 rounded text-center",
                          keyInfo.value.ctrlKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                        ]
                      }, " Ctrl: " + toDisplayString(keyInfo.value.ctrlKey ? "Yes" : "No"), 3),
                      createVNode("div", {
                        class: [
                          "p-2 rounded text-center",
                          keyInfo.value.altKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                        ]
                      }, " Alt: " + toDisplayString(keyInfo.value.altKey ? "Yes" : "No"), 3),
                      createVNode("div", {
                        class: [
                          "p-2 rounded text-center",
                          keyInfo.value.shiftKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                        ]
                      }, " Shift: " + toDisplayString(keyInfo.value.shiftKey ? "Yes" : "No"), 3),
                      createVNode("div", {
                        class: [
                          "p-2 rounded text-center",
                          keyInfo.value.metaKey ? "bg-green-500/10 text-green-600" : "bg-muted"
                        ]
                      }, " Meta: " + toDisplayString(keyInfo.value.metaKey ? "Yes" : "No"), 3)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/KeycodeInfoView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
