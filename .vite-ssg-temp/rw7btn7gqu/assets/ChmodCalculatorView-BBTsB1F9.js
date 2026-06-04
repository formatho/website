import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "ChmodCalculatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const permissions = ref({
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      others: { read: false, write: false, execute: false }
    });
    const chmodValue = computed(() => {
      const calcSection = (p) => {
        return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
      };
      return String(calcSection(permissions.value.owner)) + String(calcSection(permissions.value.group)) + String(calcSection(permissions.value.others));
    });
    const symbolicValue = computed(() => {
      const calcSection = (p) => {
        return (p.read ? "r" : "-") + (p.write ? "w" : "-") + (p.execute ? "x" : "-");
      };
      return calcSection(permissions.value.owner) + calcSection(permissions.value.group) + calcSection(permissions.value.others);
    });
    const copyChmod = () => {
      navigator.clipboard.writeText(chmodValue.value);
    };
    const presetPermissions = [
      {
        name: "755",
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        others: { read: true, write: false, execute: true }
      },
      {
        name: "644",
        owner: { read: true, write: true, execute: false },
        group: { read: true, write: false, execute: false },
        others: { read: true, write: false, execute: false }
      },
      {
        name: "777",
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: true, execute: true },
        others: { read: true, write: true, execute: true }
      },
      {
        name: "700",
        owner: { read: true, write: true, execute: true },
        group: { read: false, write: false, execute: false },
        others: { read: false, write: false, execute: false }
      }
    ];
    const applyPreset = (preset) => {
      permissions.value = JSON.parse(JSON.stringify(preset));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Chmod Calculator</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Permissions`);
                      } else {
                        return [
                          createTextVNode("Permissions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Permissions")
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
                  _push3(`<table class="w-full text-center"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}></th><th${_scopeId2}>Read</th><th${_scopeId2}>Write</th><th${_scopeId2}>Execute</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(permissions.value, (perm, category) => {
                    _push3(`<tr${_scopeId2}><td class="py-2 font-semibold capitalize text-left"${_scopeId2}>${ssrInterpolate(category)}</td><td class="py-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(perm.read) ? ssrLooseContain(perm.read, null) : perm.read) ? " checked" : ""}${ssrRenderAttr("aria-label", category + " read permission")} class="w-5 h-5"${_scopeId2}></td><td class="py-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(perm.write) ? ssrLooseContain(perm.write, null) : perm.write) ? " checked" : ""}${ssrRenderAttr("aria-label", category + " write permission")} class="w-5 h-5"${_scopeId2}></td><td class="py-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(perm.execute) ? ssrLooseContain(perm.execute, null) : perm.execute) ? " checked" : ""}${ssrRenderAttr("aria-label", category + " execute permission")} class="w-5 h-5"${_scopeId2}></td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", { class: "w-full text-center" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th"),
                          createVNode("th", null, "Read"),
                          createVNode("th", null, "Write"),
                          createVNode("th", null, "Execute")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(permissions.value, (perm, category) => {
                          return openBlock(), createBlock("tr", { key: category }, [
                            createVNode("td", { class: "py-2 font-semibold capitalize text-left" }, toDisplayString(category), 1),
                            createVNode("td", { class: "py-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => perm.read = $event,
                                "aria-label": category + " read permission",
                                class: "w-5 h-5"
                              }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                                [vModelCheckbox, perm.read]
                              ])
                            ]),
                            createVNode("td", { class: "py-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => perm.write = $event,
                                "aria-label": category + " write permission",
                                class: "w-5 h-5"
                              }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                                [vModelCheckbox, perm.write]
                              ])
                            ]),
                            createVNode("td", { class: "py-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => perm.execute = $event,
                                "aria-label": category + " execute permission",
                                class: "w-5 h-5"
                              }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                                [vModelCheckbox, perm.execute]
                              ])
                            ])
                          ]);
                        }), 128))
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
                      createTextVNode("Permissions")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("table", { class: "w-full text-center" }, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th"),
                        createVNode("th", null, "Read"),
                        createVNode("th", null, "Write"),
                        createVNode("th", null, "Execute")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(permissions.value, (perm, category) => {
                        return openBlock(), createBlock("tr", { key: category }, [
                          createVNode("td", { class: "py-2 font-semibold capitalize text-left" }, toDisplayString(category), 1),
                          createVNode("td", { class: "py-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => perm.read = $event,
                              "aria-label": category + " read permission",
                              class: "w-5 h-5"
                            }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                              [vModelCheckbox, perm.read]
                            ])
                          ]),
                          createVNode("td", { class: "py-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => perm.write = $event,
                              "aria-label": category + " write permission",
                              class: "w-5 h-5"
                            }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                              [vModelCheckbox, perm.write]
                            ])
                          ]),
                          createVNode("td", { class: "py-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => perm.execute = $event,
                              "aria-label": category + " execute permission",
                              class: "w-5 h-5"
                            }, null, 8, ["onUpdate:modelValue", "aria-label"]), [
                              [vModelCheckbox, perm.execute]
                            ])
                          ])
                        ]);
                      }), 128))
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
                        _push4(`Result`);
                      } else {
                        return [
                          createTextVNode("Result")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Result")
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
                  _push3(`<div class="text-center"${_scopeId2}><div class="text-gray-900"${_scopeId2}>${ssrInterpolate(chmodValue.value)}</div><div class="text-2xl font-mono text-muted-foreground mt-2"${_scopeId2}>${ssrInterpolate(symbolicValue.value)}</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: copyChmod,
                    class: "w-full",
                    "aria-label": "Copy chmod command"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Copy chmod ${ssrInterpolate(chmodValue.value)}`);
                      } else {
                        return [
                          createTextVNode("Copy chmod " + toDisplayString(chmodValue.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}><div class="text-sm font-semibold"${_scopeId2}>Command:</div><div class="p-3 rounded bg-muted font-mono text-sm"${_scopeId2}> chmod ${ssrInterpolate(chmodValue.value)} file.txt </div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-gray-900" }, toDisplayString(chmodValue.value), 1),
                      createVNode("div", { class: "text-2xl font-mono text-muted-foreground mt-2" }, toDisplayString(symbolicValue.value), 1)
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      onClick: copyChmod,
                      class: "w-full",
                      "aria-label": "Copy chmod command"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy chmod " + toDisplayString(chmodValue.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "text-sm font-semibold" }, "Command:"),
                      createVNode("div", { class: "p-3 rounded bg-muted font-mono text-sm" }, " chmod " + toDisplayString(chmodValue.value) + " file.txt ", 1)
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
                      createTextVNode("Result")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("div", { class: "text-gray-900" }, toDisplayString(chmodValue.value), 1),
                    createVNode("div", { class: "text-2xl font-mono text-muted-foreground mt-2" }, toDisplayString(symbolicValue.value), 1)
                  ]),
                  createVNode(unref(_sfc_main$5), {
                    onClick: copyChmod,
                    class: "w-full",
                    "aria-label": "Copy chmod command"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Copy chmod " + toDisplayString(chmodValue.value), 1)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("div", { class: "text-sm font-semibold" }, "Command:"),
                    createVNode("div", { class: "p-3 rounded bg-muted font-mono text-sm" }, " chmod " + toDisplayString(chmodValue.value) + " file.txt ", 1)
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Common Presets`);
                      } else {
                        return [
                          createTextVNode("Common Presets")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Common Presets")
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
                  _push3(`<div class="flex gap-2 flex-wrap"${_scopeId2}><!--[-->`);
                  ssrRenderList(presetPermissions, (preset) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      key: preset.name,
                      variant: "outline",
                      onClick: ($event) => applyPreset(preset),
                      "aria-label": "Apply " + preset.name + " preset"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(preset.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(preset.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(presetPermissions, (preset) => {
                        return createVNode(unref(_sfc_main$5), {
                          key: preset.name,
                          variant: "outline",
                          onClick: ($event) => applyPreset(preset),
                          "aria-label": "Apply " + preset.name + " preset"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(preset.name), 1)
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
                      createTextVNode("Common Presets")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(presetPermissions, (preset) => {
                      return createVNode(unref(_sfc_main$5), {
                        key: preset.name,
                        variant: "outline",
                        onClick: ($event) => applyPreset(preset),
                        "aria-label": "Apply " + preset.name + " preset"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(preset.name), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ChmodCalculatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
