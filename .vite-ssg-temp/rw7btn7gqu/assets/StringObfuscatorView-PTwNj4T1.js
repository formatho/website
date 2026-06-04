import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
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
  __name: "StringObfuscatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const outputText = ref("");
    const obfuscate = () => {
      if (!inputText.value) return;
      const zeroWidthChars = ["​", "‌", "‍", "\uFEFF"];
      outputText.value = inputText.value.split("").map((char) => {
        const prefix = zeroWidthChars[Math.floor(Math.random() * zeroWidthChars.length)];
        const suffix = zeroWidthChars[Math.floor(Math.random() * zeroWidthChars.length)];
        return prefix + char + suffix;
      }).join("");
    };
    const deobfuscate = () => {
      if (!inputText.value) return;
      outputText.value = inputText.value.replace(/[\u200B\u200C\u200D\uFEFF]/g, "");
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(outputText.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">String Obfuscator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Obfuscate/Deobfuscate Text`);
                      } else {
                        return [
                          createTextVNode("Obfuscate/Deobfuscate Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Obfuscate/Deobfuscate Text")
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
                        _push4(`Input`);
                      } else {
                        return [
                          createTextVNode("Input")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    placeholder: "Enter text...",
                    "aria-label": "Text to obfuscate or deobfuscate"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    onClick: obfuscate,
                    "aria-label": "Obfuscate text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Obfuscate`);
                      } else {
                        return [
                          createTextVNode("Obfuscate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    variant: "outline",
                    onClick: deobfuscate,
                    "aria-label": "Deobfuscate text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deobfuscate`);
                      } else {
                        return [
                          createTextVNode("Deobfuscate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: inputText.value,
                        "onUpdate:modelValue": ($event) => inputText.value = $event,
                        placeholder: "Enter text...",
                        "aria-label": "Text to obfuscate or deobfuscate"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_Button, {
                        onClick: obfuscate,
                        "aria-label": "Obfuscate text"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Obfuscate")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Button, {
                        variant: "outline",
                        onClick: deobfuscate,
                        "aria-label": "Deobfuscate text"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Deobfuscate")
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Obfuscate/Deobfuscate Text")
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
                        createTextVNode("Input")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      placeholder: "Enter text...",
                      "aria-label": "Text to obfuscate or deobfuscate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(_component_Button, {
                      onClick: obfuscate,
                      "aria-label": "Obfuscate text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Obfuscate")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      variant: "outline",
                      onClick: deobfuscate,
                      "aria-label": "Deobfuscate text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Deobfuscate")
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
      if (outputText.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Output`);
                        } else {
                          return [
                            createTextVNode("Output")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      "aria-label": "Copy output"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Copy`);
                        } else {
                          return [
                            createTextVNode("Copy")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Output")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Button, {
                        variant: "outline",
                        size: "sm",
                        onClick: copyOutput,
                        "aria-label": "Copy output"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy")
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
                    _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(outputText.value)}</div><div class="mt-2 text-sm text-muted-foreground"${_scopeId2}> Length: ${ssrInterpolate(outputText.value.length)} characters (visible: ${ssrInterpolate(outputText.value.replace(/[\u200B\u200C\u200D\uFEFF]/g, "").length)}) </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(outputText.value), 1),
                      createVNode("div", { class: "mt-2 text-sm text-muted-foreground" }, " Length: " + toDisplayString(outputText.value.length) + " characters (visible: " + toDisplayString(outputText.value.replace(/[\u200B\u200C\u200D\uFEFF]/g, "").length) + ") ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Output")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      "aria-label": "Copy output"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, toDisplayString(outputText.value), 1),
                    createVNode("div", { class: "mt-2 text-sm text-muted-foreground" }, " Length: " + toDisplayString(outputText.value.length) + " characters (visible: " + toDisplayString(outputText.value.replace(/[\u200B\u200C\u200D\uFEFF]/g, "").length) + ") ", 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`About Obfuscation`);
                      } else {
                        return [
                          createTextVNode("About Obfuscation")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("About Obfuscation")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm text-muted-foreground space-y-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>This tool uses zero-width characters to hide text within text.</p><p${_scopeId2}>The obfuscated text looks normal but contains invisible characters.</p><p${_scopeId2}>Use deobfuscation to reveal or clean hidden characters.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This tool uses zero-width characters to hide text within text."),
                    createVNode("p", null, "The obfuscated text looks normal but contains invisible characters."),
                    createVNode("p", null, "Use deobfuscation to reveal or clean hidden characters.")
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
                      createTextVNode("About Obfuscation")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-sm text-muted-foreground space-y-2" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This tool uses zero-width characters to hide text within text."),
                  createVNode("p", null, "The obfuscated text looks normal but contains invisible characters."),
                  createVNode("p", null, "Use deobfuscation to reveal or clean hidden characters.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/StringObfuscatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
