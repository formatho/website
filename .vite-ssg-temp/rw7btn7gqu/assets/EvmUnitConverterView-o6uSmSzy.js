import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { parseUnits, formatUnits } from "viem";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
import { Copy } from "lucide-vue-next";
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
  __name: "EvmUnitConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const textValue = ref("1.5");
    const selectedUnit = ref("ether");
    const computedValues = computed(() => {
      try {
        if (!textValue.value) return { ether: "", gwei: "", wei: "" };
        let weiValue;
        if (selectedUnit.value === "ether") {
          weiValue = parseUnits(textValue.value, 18);
        } else if (selectedUnit.value === "gwei") {
          weiValue = parseUnits(textValue.value, 9);
        } else {
          weiValue = BigInt(textValue.value);
        }
        return {
          ether: formatUnits(weiValue, 18),
          gwei: formatUnits(weiValue, 9),
          wei: weiValue.toString()
        };
      } catch (e) {
        return { ether: "Invalid Input", gwei: "Invalid Input", wei: "Invalid Input" };
      }
    });
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">EVM Unit Converter</h1></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input")
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
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Value`);
                      } else {
                        return [
                          createTextVNode("Value")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: textValue.value,
                    "onUpdate:modelValue": ($event) => textValue.value = $event,
                    placeholder: "Enter value...",
                    "aria-label": "Value to convert"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Unit`);
                      } else {
                        return [
                          createTextVNode("Unit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    class: { "bg-primary text-primary-foreground": selectedUnit.value === "ether" },
                    onClick: ($event) => selectedUnit.value = "ether",
                    "aria-label": "Select Ether unit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ether `);
                      } else {
                        return [
                          createTextVNode(" Ether ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    class: { "bg-primary text-primary-foreground": selectedUnit.value === "gwei" },
                    onClick: ($event) => selectedUnit.value = "gwei",
                    "aria-label": "Select Gwei unit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Gwei `);
                      } else {
                        return [
                          createTextVNode(" Gwei ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    class: { "bg-primary text-primary-foreground": selectedUnit.value === "wei" },
                    onClick: ($event) => selectedUnit.value = "wei",
                    "aria-label": "Select Wei unit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Wei `);
                      } else {
                        return [
                          createTextVNode(" Wei ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Value")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: textValue.value,
                        "onUpdate:modelValue": ($event) => textValue.value = $event,
                        placeholder: "Enter value...",
                        "aria-label": "Value to convert"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Unit")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          class: { "bg-primary text-primary-foreground": selectedUnit.value === "ether" },
                          onClick: ($event) => selectedUnit.value = "ether",
                          "aria-label": "Select Ether unit"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ether ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          class: { "bg-primary text-primary-foreground": selectedUnit.value === "gwei" },
                          onClick: ($event) => selectedUnit.value = "gwei",
                          "aria-label": "Select Gwei unit"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Gwei ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          class: { "bg-primary text-primary-foreground": selectedUnit.value === "wei" },
                          onClick: ($event) => selectedUnit.value = "wei",
                          "aria-label": "Select Wei unit"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Wei ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"])
                      ])
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
                      createTextVNode("Input")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Value")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: textValue.value,
                      "onUpdate:modelValue": ($event) => textValue.value = $event,
                      placeholder: "Enter value...",
                      "aria-label": "Value to convert"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Unit")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        class: { "bg-primary text-primary-foreground": selectedUnit.value === "ether" },
                        onClick: ($event) => selectedUnit.value = "ether",
                        "aria-label": "Select Ether unit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Ether ")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        class: { "bg-primary text-primary-foreground": selectedUnit.value === "gwei" },
                        onClick: ($event) => selectedUnit.value = "gwei",
                        "aria-label": "Select Gwei unit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Gwei ")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        class: { "bg-primary text-primary-foreground": selectedUnit.value === "wei" },
                        onClick: ($event) => selectedUnit.value = "wei",
                        "aria-label": "Select Wei unit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Wei ")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ])
                  ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Converted Values`);
                      } else {
                        return [
                          createTextVNode("Converted Values")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Converted Values")
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
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ether (10^18 Wei)`);
                      } else {
                        return [
                          createTextVNode("Ether (10^18 Wei)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    readonly: "",
                    value: computedValues.value.ether
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "ghost",
                    size: "icon",
                    onClick: ($event) => copyToClipboard(computedValues.value.ether),
                    "aria-label": "Copy Ether value"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Gwei (10^9 Wei)`);
                      } else {
                        return [
                          createTextVNode("Gwei (10^9 Wei)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    readonly: "",
                    value: computedValues.value.gwei
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "ghost",
                    size: "icon",
                    onClick: ($event) => copyToClipboard(computedValues.value.gwei),
                    "aria-label": "Copy Gwei value"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Wei`);
                      } else {
                        return [
                          createTextVNode("Wei")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    readonly: "",
                    value: computedValues.value.wei
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "ghost",
                    size: "icon",
                    onClick: ($event) => copyToClipboard(computedValues.value.wei),
                    "aria-label": "Copy Wei value"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Ether (10^18 Wei)")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$6), {
                          readonly: "",
                          value: computedValues.value.ether
                        }, null, 8, ["value"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: ($event) => copyToClipboard(computedValues.value.ether),
                          "aria-label": "Copy Ether value"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Gwei (10^9 Wei)")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$6), {
                          readonly: "",
                          value: computedValues.value.gwei
                        }, null, 8, ["value"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: ($event) => copyToClipboard(computedValues.value.gwei),
                          "aria-label": "Copy Gwei value"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Wei")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$6), {
                          readonly: "",
                          value: computedValues.value.wei
                        }, null, 8, ["value"]),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: ($event) => copyToClipboard(computedValues.value.wei),
                          "aria-label": "Copy Wei value"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
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
                      createTextVNode("Converted Values")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Ether (10^18 Wei)")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        readonly: "",
                        value: computedValues.value.ether
                      }, null, 8, ["value"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "ghost",
                        size: "icon",
                        onClick: ($event) => copyToClipboard(computedValues.value.ether),
                        "aria-label": "Copy Ether value"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Gwei (10^9 Wei)")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        readonly: "",
                        value: computedValues.value.gwei
                      }, null, 8, ["value"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "ghost",
                        size: "icon",
                        onClick: ($event) => copyToClipboard(computedValues.value.gwei),
                        "aria-label": "Copy Gwei value"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Wei")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        readonly: "",
                        value: computedValues.value.wei
                      }, null, 8, ["value"]),
                      createVNode(unref(_sfc_main$7), {
                        variant: "ghost",
                        size: "icon",
                        onClick: ($event) => copyToClipboard(computedValues.value.wei),
                        "aria-label": "Copy Wei value"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/EvmUnitConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
