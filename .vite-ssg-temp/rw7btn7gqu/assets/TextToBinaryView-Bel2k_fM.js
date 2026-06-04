import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2, a as _sfc_main$4, b as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$3 } from "../main.mjs";
import { Binary, ArrowRightLeft, Check, Copy } from "lucide-vue-next";
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
  __name: "TextToBinaryView",
  __ssrInlineRender: true,
  setup(__props) {
    const textInput = ref("Hello World");
    const binaryInput = ref(
      "01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100"
    );
    const mode = ref("text-to-binary");
    const copied = ref(false);
    const textToBinary = (text) => {
      return text.split("").map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    };
    const binaryToText = (binary) => {
      const bytes = binary.replace(/[^01]/g, "").match(/.{8}/g) || [];
      return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
    };
    const binaryOutput = computed(() => {
      if (!textInput.value) return "";
      return textToBinary(textInput.value);
    });
    const textOutput = computed(() => {
      if (!binaryInput.value) return "";
      return binaryToText(binaryInput.value);
    });
    const copyOutput = () => {
      const output = mode.value === "text-to-binary" ? binaryOutput.value : textOutput.value;
      navigator.clipboard.writeText(output);
      copied.value = true;
      setTimeout(() => copied.value = false, 2e3);
    };
    const swapMode = () => {
      if (mode.value === "text-to-binary") {
        const binary = textToBinary(textInput.value);
        binaryInput.value = binary;
        mode.value = "binary-to-text";
      } else {
        const text = binaryToText(binaryInput.value);
        textInput.value = text;
        mode.value = "text-to-binary";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CardDescription = resolveComponent("CardDescription");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Binary), { class: "w-8 h-8" }, null, _parent));
      _push(` Text to Binary </h1><p class="text-muted-foreground mt-2">Convert text to binary and binary to text.</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    variant: mode.value === "text-to-binary" ? "default" : "outline",
                    onClick: ($event) => mode.value = "text-to-binary",
                    "aria-label": "Convert text to binary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Text → Binary `);
                      } else {
                        return [
                          createTextVNode(" Text → Binary ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    onClick: swapMode,
                    variant: "ghost",
                    "aria-label": "Swap conversion mode"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowRightLeft), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowRightLeft), { class: "w-4 h-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    variant: mode.value === "binary-to-text" ? "default" : "outline",
                    onClick: ($event) => mode.value = "binary-to-text",
                    "aria-label": "Convert binary to text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Binary → Text `);
                      } else {
                        return [
                          createTextVNode(" Binary → Text ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-center gap-4" }, [
                      createVNode(unref(_sfc_main$3), {
                        variant: mode.value === "text-to-binary" ? "default" : "outline",
                        onClick: ($event) => mode.value = "text-to-binary",
                        "aria-label": "Convert text to binary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Text → Binary ")
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick"]),
                      createVNode(unref(_sfc_main$3), {
                        onClick: swapMode,
                        variant: "ghost",
                        "aria-label": "Swap conversion mode"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowRightLeft), { class: "w-4 h-4" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        variant: mode.value === "binary-to-text" ? "default" : "outline",
                        onClick: ($event) => mode.value = "binary-to-text",
                        "aria-label": "Convert binary to text"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Binary → Text ")
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "py-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-center gap-4" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: mode.value === "text-to-binary" ? "default" : "outline",
                      onClick: ($event) => mode.value = "text-to-binary",
                      "aria-label": "Convert text to binary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Text → Binary ")
                      ]),
                      _: 1
                    }, 8, ["variant", "onClick"]),
                    createVNode(unref(_sfc_main$3), {
                      onClick: swapMode,
                      variant: "ghost",
                      "aria-label": "Swap conversion mode"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowRightLeft), { class: "w-4 h-4" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      variant: mode.value === "binary-to-text" ? "default" : "outline",
                      onClick: ($event) => mode.value = "binary-to-text",
                      "aria-label": "Convert binary to text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Binary → Text ")
                      ]),
                      _: 1
                    }, 8, ["variant", "onClick"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (mode.value === "text-to-binary") {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Input (Text)`);
                        } else {
                          return [
                            createTextVNode("Input (Text)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Enter text to convert to binary`);
                        } else {
                          return [
                            createTextVNode("Enter text to convert to binary")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input (Text)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Enter text to convert to binary")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(CodeEditor, {
                      modelValue: textInput.value,
                      "onUpdate:modelValue": ($event) => textInput.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "Enter text..."
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(CodeEditor, {
                        modelValue: textInput.value,
                        "onUpdate:modelValue": ($event) => textInput.value = $event,
                        language: "plaintext",
                        class: "min-h-[128px]",
                        placeholder: "Enter text..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Input (Text)")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Enter text to convert to binary")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(CodeEditor, {
                      modelValue: textInput.value,
                      "onUpdate:modelValue": ($event) => textInput.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "Enter text..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Output (Binary)`);
                        } else {
                          return [
                            createTextVNode("Output (Binary)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Output (Binary)")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(binaryOutput)) {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="p-4 bg-surface-hover rounded-lg border font-mono text-sm break-all"${_scopeId2}>${ssrInterpolate(unref(binaryOutput))}</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$3), {
                        onClick: copyOutput,
                        class: "w-full",
                        "aria-label": "Copy binary output"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                            _push4(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy Binary")}`);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                              createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Binary"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="text-center py-8 text-muted-foreground"${_scopeId2}> Enter text above to convert </div>`);
                    }
                  } else {
                    return [
                      unref(binaryOutput) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border font-mono text-sm break-all" }, toDisplayString(unref(binaryOutput)), 1),
                        createVNode(unref(_sfc_main$3), {
                          onClick: copyOutput,
                          class: "w-full",
                          "aria-label": "Copy binary output"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Binary"), 1)
                          ]),
                          _: 1
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-8 text-muted-foreground"
                      }, " Enter text above to convert "))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Output (Binary)")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    unref(binaryOutput) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border font-mono text-sm break-all" }, toDisplayString(unref(binaryOutput)), 1),
                      createVNode(unref(_sfc_main$3), {
                        onClick: copyOutput,
                        class: "w-full",
                        "aria-label": "Copy binary output"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Binary"), 1)
                        ]),
                        _: 1
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-muted-foreground"
                    }, " Enter text above to convert "))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (textInput.value) {
          _push(ssrRenderComponent(unref(_sfc_main$1), null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Character Breakdown`);
                          } else {
                            return [
                              createTextVNode("Character Breakdown")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Character Breakdown")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="w-full text-sm"${_scopeId2}><thead${_scopeId2}><tr class="border-b"${_scopeId2}><th class="text-left py-2 px-4"${_scopeId2}>Character</th><th class="text-left py-2 px-4"${_scopeId2}>ASCII Code</th><th class="text-left py-2 px-4"${_scopeId2}>Binary</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                      ssrRenderList(textInput.value.split(""), (char, index) => {
                        _push3(`<tr class="border-b"${_scopeId2}><td class="py-2 px-4 font-mono text-lg"${_scopeId2}>${ssrInterpolate(char === " " ? "␣" : char)}</td><td class="py-2 px-4 font-mono"${_scopeId2}>${ssrInterpolate(char.charCodeAt(0))}</td><td class="py-2 px-4 font-mono"${_scopeId2}>${ssrInterpolate(char.charCodeAt(0).toString(2).padStart(8, "0"))}</td></tr>`);
                      });
                      _push3(`<!--]--></tbody></table></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "w-full text-sm" }, [
                            createVNode("thead", null, [
                              createVNode("tr", { class: "border-b" }, [
                                createVNode("th", { class: "text-left py-2 px-4" }, "Character"),
                                createVNode("th", { class: "text-left py-2 px-4" }, "ASCII Code"),
                                createVNode("th", { class: "text-left py-2 px-4" }, "Binary")
                              ])
                            ]),
                            createVNode("tbody", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(textInput.value.split(""), (char, index) => {
                                return openBlock(), createBlock("tr", {
                                  key: index,
                                  class: "border-b"
                                }, [
                                  createVNode("td", { class: "py-2 px-4 font-mono text-lg" }, toDisplayString(char === " " ? "␣" : char), 1),
                                  createVNode("td", { class: "py-2 px-4 font-mono" }, toDisplayString(char.charCodeAt(0)), 1),
                                  createVNode("td", { class: "py-2 px-4 font-mono" }, toDisplayString(char.charCodeAt(0).toString(2).padStart(8, "0")), 1)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Character Breakdown")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full text-sm" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b" }, [
                              createVNode("th", { class: "text-left py-2 px-4" }, "Character"),
                              createVNode("th", { class: "text-left py-2 px-4" }, "ASCII Code"),
                              createVNode("th", { class: "text-left py-2 px-4" }, "Binary")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(textInput.value.split(""), (char, index) => {
                              return openBlock(), createBlock("tr", {
                                key: index,
                                class: "border-b"
                              }, [
                                createVNode("td", { class: "py-2 px-4 font-mono text-lg" }, toDisplayString(char === " " ? "␣" : char), 1),
                                createVNode("td", { class: "py-2 px-4 font-mono" }, toDisplayString(char.charCodeAt(0)), 1),
                                createVNode("td", { class: "py-2 px-4 font-mono" }, toDisplayString(char.charCodeAt(0).toString(2).padStart(8, "0")), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Input (Binary)`);
                        } else {
                          return [
                            createTextVNode("Input (Binary)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Enter binary (spaces between bytes optional)`);
                        } else {
                          return [
                            createTextVNode("Enter binary (spaces between bytes optional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input (Binary)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Enter binary (spaces between bytes optional)")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(CodeEditor, {
                      modelValue: binaryInput.value,
                      "onUpdate:modelValue": ($event) => binaryInput.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "01001000 01100101 01101100 01101100 01101111..."
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(CodeEditor, {
                        modelValue: binaryInput.value,
                        "onUpdate:modelValue": ($event) => binaryInput.value = $event,
                        language: "plaintext",
                        class: "min-h-[128px]",
                        placeholder: "01001000 01100101 01101100 01101100 01101111..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Input (Binary)")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Enter binary (spaces between bytes optional)")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(CodeEditor, {
                      modelValue: binaryInput.value,
                      "onUpdate:modelValue": ($event) => binaryInput.value = $event,
                      language: "plaintext",
                      class: "min-h-[128px]",
                      placeholder: "01001000 01100101 01101100 01101100 01101111..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Output (Text)`);
                        } else {
                          return [
                            createTextVNode("Output (Text)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Output (Text)")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(textOutput)) {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="p-4 bg-surface-hover rounded-lg border font-mono text-xl break-all"${_scopeId2}>${ssrInterpolate(unref(textOutput))}</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$3), {
                        onClick: copyOutput,
                        class: "w-full",
                        "aria-label": "Copy text output"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                            _push4(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy Text")}`);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                              createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Text"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="text-center py-8 text-muted-foreground"${_scopeId2}> Enter binary above to convert </div>`);
                    }
                  } else {
                    return [
                      unref(textOutput) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border font-mono text-xl break-all" }, toDisplayString(unref(textOutput)), 1),
                        createVNode(unref(_sfc_main$3), {
                          onClick: copyOutput,
                          class: "w-full",
                          "aria-label": "Copy text output"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Text"), 1)
                          ]),
                          _: 1
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-8 text-muted-foreground"
                      }, " Enter binary above to convert "))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Output (Text)")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    unref(textOutput) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "p-4 bg-surface-hover rounded-lg border font-mono text-xl break-all" }, toDisplayString(unref(textOutput)), 1),
                      createVNode(unref(_sfc_main$3), {
                        onClick: copyOutput,
                        class: "w-full",
                        "aria-label": "Copy text output"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Text"), 1)
                        ]),
                        _: 1
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-muted-foreground"
                    }, " Enter binary above to convert "))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TextToBinaryView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
