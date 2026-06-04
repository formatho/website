import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
  __name: "TemperatureConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputValue = ref("");
    const fromUnit = ref("celsius");
    const toUnit = ref("fahrenheit");
    const conversions = {
      celsius: (c) => c,
      fahrenheit: (c) => c * 9 / 5 + 32,
      kelvin: (c) => c + 273.15,
      rankine: (c) => (c + 273.15) * 9 / 5
    };
    const reverseConversions = {
      celsius: (n) => n,
      fahrenheit: (f) => (f - 32) * 5 / 9,
      kelvin: (k) => k - 273.15,
      rankine: (r) => r / 9 * 5 - 273.15
    };
    const result = computed(() => {
      const value = parseFloat(inputValue.value);
      if (isNaN(value)) return null;
      const celsius = (reverseConversions[fromUnit.value] ?? ((n) => n))(value);
      return (conversions[toUnit.value] ?? ((c) => c))(celsius);
    });
    const units = [
      { value: "celsius", label: "Celsius (°C)" },
      { value: "fahrenheit", label: "Fahrenheit (°F)" },
      { value: "kelvin", label: "Kelvin (K)" },
      { value: "rankine", label: "Rankine (°R)" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Temperature Converter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert Temperature`);
                      } else {
                        return [
                          createTextVNode("Convert Temperature")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Convert Temperature")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`From`);
                      } else {
                        return [
                          createTextVNode("From")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select aria-label="Convert from unit" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList(units, (unit) => {
                    _push3(`<option${ssrRenderAttr("value", unit.value)}${ssrIncludeBooleanAttr(Array.isArray(fromUnit.value) ? ssrLooseContain(fromUnit.value, unit.value) : ssrLooseEqual(fromUnit.value, unit.value)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(unit.label)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="grid gap-2"${_scopeId2}>`);
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
                    modelValue: inputValue.value,
                    "onUpdate:modelValue": ($event) => inputValue.value = $event,
                    type: "number",
                    "aria-label": "Temperature value",
                    placeholder: "Enter temperature..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`To`);
                      } else {
                        return [
                          createTextVNode("To")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select aria-label="Convert to unit" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList(units, (unit) => {
                    _push3(`<option${ssrRenderAttr("value", unit.value)}${ssrIncludeBooleanAttr(Array.isArray(toUnit.value) ? ssrLooseContain(toUnit.value, unit.value) : ssrLooseEqual(toUnit.value, unit.value)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(unit.label)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("From")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => fromUnit.value = $event,
                          "aria-label": "Convert from unit",
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(units, (unit) => {
                            return createVNode("option", {
                              key: unit.value,
                              value: unit.value
                            }, toDisplayString(unit.label), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, fromUnit.value]
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Value")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: inputValue.value,
                          "onUpdate:modelValue": ($event) => inputValue.value = $event,
                          type: "number",
                          "aria-label": "Temperature value",
                          placeholder: "Enter temperature..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("To")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => toUnit.value = $event,
                          "aria-label": "Convert to unit",
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(units, (unit) => {
                            return createVNode("option", {
                              key: unit.value,
                              value: unit.value
                            }, toDisplayString(unit.label), 9, ["value"]);
                          }), 64))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, toUnit.value]
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Convert Temperature")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("From")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => fromUnit.value = $event,
                        "aria-label": "Convert from unit",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(units, (unit) => {
                          return createVNode("option", {
                            key: unit.value,
                            value: unit.value
                          }, toDisplayString(unit.label), 9, ["value"]);
                        }), 64))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, fromUnit.value]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Value")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: inputValue.value,
                        "onUpdate:modelValue": ($event) => inputValue.value = $event,
                        type: "number",
                        "aria-label": "Temperature value",
                        placeholder: "Enter temperature..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("To")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => toUnit.value = $event,
                        "aria-label": "Convert to unit",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(units, (unit) => {
                          return createVNode("option", {
                            key: unit.value,
                            value: unit.value
                          }, toDisplayString(unit.label), 9, ["value"]);
                        }), 64))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, toUnit.value]
                      ])
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
      if (result.value !== null) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Result</div><div class="text-5xl font-bold"${_scopeId2}>${ssrInterpolate(result.value.toFixed(2))}°</div><div class="text-lg text-muted-foreground mt-2"${_scopeId2}>${ssrInterpolate(units.find((u) => u.value === toUnit.value)?.label)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                      createVNode("div", { class: "text-5xl font-bold" }, toDisplayString(result.value.toFixed(2)) + "°", 1),
                      createVNode("div", { class: "text-lg text-muted-foreground mt-2" }, toDisplayString(units.find((u) => u.value === toUnit.value)?.label), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Result"),
                    createVNode("div", { class: "text-5xl font-bold" }, toDisplayString(result.value.toFixed(2)) + "°", 1),
                    createVNode("div", { class: "text-lg text-muted-foreground mt-2" }, toDisplayString(units.find((u) => u.value === toUnit.value)?.label), 1)
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
                        _push4(`Common Conversions`);
                      } else {
                        return [
                          createTextVNode("Common Conversions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Common Conversions")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm"${_scopeId2}><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Water Freezing</div><div${_scopeId2}>0°C = 32°F = 273.15K</div></div><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Room Temperature</div><div${_scopeId2}>20°C = 68°F = 293.15K</div></div><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Body Temperature</div><div${_scopeId2}>37°C = 98.6°F = 310.15K</div></div><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Water Boiling</div><div${_scopeId2}>100°C = 212°F = 373.15K</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm" }, [
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Water Freezing"),
                        createVNode("div", null, "0°C = 32°F = 273.15K")
                      ]),
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Room Temperature"),
                        createVNode("div", null, "20°C = 68°F = 293.15K")
                      ]),
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Body Temperature"),
                        createVNode("div", null, "37°C = 98.6°F = 310.15K")
                      ]),
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Water Boiling"),
                        createVNode("div", null, "100°C = 212°F = 373.15K")
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
                      createTextVNode("Common Conversions")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm" }, [
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Water Freezing"),
                      createVNode("div", null, "0°C = 32°F = 273.15K")
                    ]),
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Room Temperature"),
                      createVNode("div", null, "20°C = 68°F = 293.15K")
                    ]),
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Body Temperature"),
                      createVNode("div", null, "37°C = 98.6°F = 310.15K")
                    ]),
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Water Boiling"),
                      createVNode("div", null, "100°C = 212°F = 373.15K")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TemperatureConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
