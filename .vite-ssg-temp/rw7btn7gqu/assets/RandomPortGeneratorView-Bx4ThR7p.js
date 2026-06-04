import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "RandomPortGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const port = ref(0);
    const excludedPorts = ref([]);
    const minPort = ref(1024);
    const maxPort = ref(65535);
    const generatePort = () => {
      const availablePorts = [];
      for (let i = minPort.value; i <= maxPort.value; i++) {
        if (!excludedPorts.value.includes(i)) {
          availablePorts.push(i);
        }
      }
      if (availablePorts.length === 0) {
        port.value = 0;
        return;
      }
      const randomIndex = Math.floor(Math.random() * availablePorts.length);
      port.value = availablePorts[randomIndex] ?? 0;
    };
    const copyPort = () => {
      navigator.clipboard.writeText(port.value.toString());
    };
    generatePort();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Random Port Generator</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Settings`);
                      } else {
                        return [
                          createTextVNode("Settings")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Settings")
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
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Min Port`);
                      } else {
                        return [
                          createTextVNode("Min Port")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input${ssrRenderAttr("value", minPort.value)} type="number" min="1" max="65535" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Max Port`);
                      } else {
                        return [
                          createTextVNode("Max Port")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input${ssrRenderAttr("value", maxPort.value)} type="number" min="1" max="65535" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: generatePort,
                    class: "w-full",
                    "aria-label": "Generate random port"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Port`);
                      } else {
                        return [
                          createTextVNode("Generate Port")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Min Port")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => minPort.value = $event,
                          type: "number",
                          min: "1",
                          max: "65535",
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            minPort.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Max Port")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => maxPort.value = $event,
                          type: "number",
                          min: "1",
                          max: "65535",
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            maxPort.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: generatePort,
                      class: "w-full",
                      "aria-label": "Generate random port"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate Port")
                      ]),
                      _: 1
                    })
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
                      createTextVNode("Settings")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Min Port")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => minPort.value = $event,
                        type: "number",
                        min: "1",
                        max: "65535",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          minPort.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Max Port")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => maxPort.value = $event,
                        type: "number",
                        min: "1",
                        max: "65535",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          maxPort.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$6), {
                    onClick: generatePort,
                    class: "w-full",
                    "aria-label": "Generate random port"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate Port")
                    ]),
                    _: 1
                  })
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
                        _push4(`Generated Port`);
                      } else {
                        return [
                          createTextVNode("Generated Port")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generated Port")
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
                  _push3(`<div class="text-center"${_scopeId2}><div class="text-gray-900"${_scopeId2}>${ssrInterpolate(port.value)}</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: copyPort,
                    variant: "outline",
                    class: "w-full"
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
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-gray-900" }, toDisplayString(port.value), 1)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: copyPort,
                      variant: "outline",
                      class: "w-full"
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
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Generated Port")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("div", { class: "text-gray-900" }, toDisplayString(port.value), 1)
                  ]),
                  createVNode(unref(_sfc_main$6), {
                    onClick: copyPort,
                    variant: "outline",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy")
                    ]),
                    _: 1
                  })
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
                        _push4(`Common Port Ranges`);
                      } else {
                        return [
                          createTextVNode("Common Port Ranges")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Common Port Ranges")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm"${_scopeId2}><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Well-Known Ports</div><div class="text-muted-foreground"${_scopeId2}>0 - 1023 (system use)</div></div><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Registered Ports</div><div class="text-muted-foreground"${_scopeId2}>1024 - 49151</div></div><div class="p-3 rounded bg-muted"${_scopeId2}><div class="font-semibold"${_scopeId2}>Dynamic/Private Ports</div><div class="text-muted-foreground"${_scopeId2}>49152 - 65535</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm" }, [
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Well-Known Ports"),
                        createVNode("div", { class: "text-muted-foreground" }, "0 - 1023 (system use)")
                      ]),
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Registered Ports"),
                        createVNode("div", { class: "text-muted-foreground" }, "1024 - 49151")
                      ]),
                      createVNode("div", { class: "p-3 rounded bg-muted" }, [
                        createVNode("div", { class: "font-semibold" }, "Dynamic/Private Ports"),
                        createVNode("div", { class: "text-muted-foreground" }, "49152 - 65535")
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
                      createTextVNode("Common Port Ranges")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm" }, [
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Well-Known Ports"),
                      createVNode("div", { class: "text-muted-foreground" }, "0 - 1023 (system use)")
                    ]),
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Registered Ports"),
                      createVNode("div", { class: "text-muted-foreground" }, "1024 - 49151")
                    ]),
                    createVNode("div", { class: "p-3 rounded bg-muted" }, [
                      createVNode("div", { class: "font-semibold" }, "Dynamic/Private Ports"),
                      createVNode("div", { class: "text-muted-foreground" }, "49152 - 65535")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RandomPortGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
