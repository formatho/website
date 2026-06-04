import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, vModelText, vModelSelect, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Calendar, RefreshCw, Check, Copy, Clock } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "DateTimeConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputDate = ref("");
    const inputFormat = ref("auto");
    const copied = ref(null);
    const now = computed(() => /* @__PURE__ */ new Date());
    const setCurrentTime = () => {
      inputDate.value = now.value.toISOString();
    };
    const parsedDate = computed(() => {
      if (!inputDate.value) return null;
      try {
        if (inputFormat.value === "unix") {
          return new Date(parseInt(inputDate.value) * 1e3);
        } else if (inputFormat.value === "unix-ms") {
          return new Date(parseInt(inputDate.value));
        } else {
          return new Date(inputDate.value);
        }
      } catch {
        return null;
      }
    });
    const formats = computed(() => {
      if (!parsedDate.value) return {};
      const d = parsedDate.value;
      return {
        "ISO 8601": d.toISOString(),
        UTC: d.toUTCString(),
        "Local Date": d.toLocaleDateString(),
        "Local Time": d.toLocaleTimeString(),
        "Local DateTime": d.toLocaleString(),
        "Date String": d.toDateString(),
        "Time String": d.toTimeString(),
        "Unix Timestamp (seconds)": Math.floor(d.getTime() / 1e3).toString(),
        "Unix Timestamp (ms)": d.getTime().toString(),
        Year: d.getFullYear().toString(),
        "Month (1-12)": (d.getMonth() + 1).toString(),
        Day: d.getDate().toString(),
        "Day of Week": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()],
        "Hours (0-23)": d.getHours().toString(),
        Minutes: d.getMinutes().toString(),
        Seconds: d.getSeconds().toString(),
        Milliseconds: d.getMilliseconds().toString(),
        "Timezone Offset (min)": d.getTimezoneOffset().toString(),
        "Custom (YYYY-MM-DD)": `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        "Custom (DD/MM/YYYY)": `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
        "Custom (MM/DD/YYYY)": `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`,
        "ISO Date": d.toISOString().split("T")[0],
        "ISO Time": d.toISOString().split("T")[1]?.split(".")[0] ?? ""
      };
    });
    const copyFormat = (type) => {
      const value = formats.value[type];
      if (value !== void 0) {
        navigator.clipboard.writeText(value);
      }
      copied.value = type;
      setTimeout(() => copied.value = null, 2e3);
    };
    const presets = [
      { label: "Now (ISO)", value: () => (/* @__PURE__ */ new Date()).toISOString() },
      { label: "Today 00:00", value: () => new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)).toISOString() },
      { label: "Tomorrow", value: () => new Date(Date.now() + 864e5).toISOString() },
      { label: "Yesterday", value: () => new Date(Date.now() - 864e5).toISOString() },
      { label: "Week from now", value: () => new Date(Date.now() + 7 * 864e5).toISOString() }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "w-8 h-8" }, null, _parent));
      _push(` Date Time Converter </h1><p class="text-muted-foreground mt-2">Convert dates and times between different formats.</p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mb-6" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Enter a date, time, or timestamp`);
                      } else {
                        return [
                          createTextVNode("Enter a date, time, or timestamp")
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
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Enter a date, time, or timestamp")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4"${_scopeId2}><div class="flex-1"${_scopeId2}><input${ssrRenderAttr("value", inputDate.value)} type="text" placeholder="Enter date, e.g., 2024-01-15 or 1705312800" class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div><select class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><option value="auto"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "auto") : ssrLooseEqual(inputFormat.value, "auto")) ? " selected" : ""}${_scopeId2}>Auto Detect</option><option value="unix"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "unix") : ssrLooseEqual(inputFormat.value, "unix")) ? " selected" : ""}${_scopeId2}>Unix (seconds)</option><option value="unix-ms"${ssrIncludeBooleanAttr(Array.isArray(inputFormat.value) ? ssrLooseContain(inputFormat.value, "unix-ms") : ssrLooseEqual(inputFormat.value, "unix-ms")) ? " selected" : ""}${_scopeId2}>Unix (ms)</option></select></div><div class="flex gap-2 flex-wrap"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: setCurrentTime,
                    variant: "outline",
                    size: "sm",
                    "aria-label": "Set to current time"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Current Time `);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Current Time ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(presets, (preset) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: preset.label,
                      onClick: ($event) => inputDate.value = preset.value(),
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Set to " + preset.label
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(preset.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("div", { class: "flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => inputDate.value = $event,
                          type: "text",
                          placeholder: "Enter date, e.g., 2024-01-15 or 1705312800",
                          class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, inputDate.value]
                        ])
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                        class: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, [
                        createVNode("option", { value: "auto" }, "Auto Detect"),
                        createVNode("option", { value: "unix" }, "Unix (seconds)"),
                        createVNode("option", { value: "unix-ms" }, "Unix (ms)")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, inputFormat.value]
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: setCurrentTime,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Set to current time"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Current Time ")
                        ]),
                        _: 1
                      }),
                      (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: preset.label,
                          onClick: ($event) => inputDate.value = preset.value(),
                          variant: "outline",
                          size: "sm",
                          "aria-label": "Set to " + preset.label
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"]);
                      }), 64))
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
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Enter a date, time, or timestamp")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("div", { class: "flex-1" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => inputDate.value = $event,
                        type: "text",
                        placeholder: "Enter date, e.g., 2024-01-15 or 1705312800",
                        class: "w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, inputDate.value]
                      ])
                    ]),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => inputFormat.value = $event,
                      class: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    }, [
                      createVNode("option", { value: "auto" }, "Auto Detect"),
                      createVNode("option", { value: "unix" }, "Unix (seconds)"),
                      createVNode("option", { value: "unix-ms" }, "Unix (ms)")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, inputFormat.value]
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                    createVNode(unref(_sfc_main$6), {
                      onClick: setCurrentTime,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Set to current time"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Current Time ")
                      ]),
                      _: 1
                    }),
                    (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                      return createVNode(unref(_sfc_main$6), {
                        key: preset.label,
                        onClick: ($event) => inputDate.value = preset.value(),
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Set to " + preset.label
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(preset.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "aria-label"]);
                    }), 64))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (parsedDate.value && Object.keys(formats.value).length > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Converted Formats`);
                        } else {
                          return [
                            createTextVNode("Converted Formats")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Converted Formats")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(formats.value, (value, type) => {
                      _push3(`<div class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="text-sm text-muted-foreground mb-1"${_scopeId2}>${ssrInterpolate(type)}</div><div class="font-mono"${_scopeId2}>${ssrInterpolate(value)}</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$6), {
                        onClick: ($event) => copyFormat(type),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy date format"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(formats.value, (value, type) => {
                        return openBlock(), createBlock("div", {
                          key: type,
                          class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                        }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                            createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            onClick: ($event) => copyFormat(type),
                            variant: "ghost",
                            size: "sm",
                            "aria-label": "Copy date format"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]);
                      }), 128))
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
                        createTextVNode("Converted Formats")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$5), { class: "space-y-3" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(formats.value, (value, type) => {
                      return openBlock(), createBlock("div", {
                        key: type,
                        class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, toDisplayString(type), 1),
                          createVNode("div", { class: "font-mono" }, toDisplayString(value), 1)
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          onClick: ($event) => copyFormat(type),
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy date format"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === type ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (inputDate.value && !parsedDate.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "border-red-500" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "py-8 text-center text-red-500" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Invalid date format `);
                  } else {
                    return [
                      createTextVNode(" Invalid date format ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), { class: "py-8 text-center text-red-500" }, {
                  default: withCtx(() => [
                    createTextVNode(" Invalid date format ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="text-center py-16 text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Clock), { class: "w-16 h-16 mx-auto mb-4 opacity-50" }, null, _parent));
        _push(`<p>Enter a date above to see conversions</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/DateTimeConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
