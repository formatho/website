import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, vModelText, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { Fingerprint, RefreshCw, Check, Copy, Trash2 } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ULIDGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const ulids = ref([]);
    const count = ref(10);
    const copied = ref(null);
    const generateUlid = () => {
      const now = Date.now();
      const time = [];
      let timestamp = now;
      for (let i = 0; i < 10; i++) {
        const char = ENCODING[timestamp % 32];
        time.unshift(char ?? "0");
        timestamp = Math.floor(timestamp / 32);
      }
      const random = [];
      const randomBytes = new Uint8Array(16);
      crypto.getRandomValues(randomBytes);
      for (let i = 0; i < 16; i++) {
        const byte = randomBytes[i];
        const char = byte !== void 0 ? ENCODING[byte % 32] : "0";
        random.push(char ?? "0");
      }
      return time.join("") + random.join("");
    };
    const parseUlid = (ulid) => {
      const timeComponent = ulid.slice(0, 10);
      let timestamp = 0;
      for (let i = 0; i < timeComponent.length; i++) {
        const char = timeComponent[i] ?? "0";
        const value = ENCODING.indexOf(char);
        timestamp = timestamp * 32 + value;
      }
      return {
        timestamp,
        date: new Date(timestamp).toISOString()
      };
    };
    const generate = () => {
      ulids.value = Array.from({ length: count.value }, () => generateUlid());
    };
    const generateOne = () => {
      ulids.value.unshift(generateUlid());
    };
    const clear = () => {
      ulids.value = [];
    };
    const copyUlid = (index) => {
      const ulid = ulids.value[index];
      if (ulid) {
        navigator.clipboard.writeText(ulid);
        copied.value = index;
        setTimeout(() => copied.value = null, 2e3);
      }
    };
    const copyAll = () => {
      navigator.clipboard.writeText(ulids.value.join("\n"));
      copied.value = -1;
      setTimeout(() => copied.value = null, 2e3);
    };
    generate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Fingerprint), { class: "w-8 h-8" }, null, _parent));
      _push(` ULID Generator </h1><p class="text-muted-foreground mt-2"> Generate Universally Unique Lexicographically Sortable Identifiers. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate ULIDs`);
                      } else {
                        return [
                          createTextVNode("Generate ULIDs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate ULIDs")
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
                  _push3(`<div class="flex gap-4 items-end"${_scopeId2}><div class="flex-1"${_scopeId2}><label class="block text-sm mb-2"${_scopeId2}>Count</label><input${ssrRenderAttr("value", count.value)} type="number" min="1" max="1000" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: generate,
                    class: "flex-1",
                    "aria-label": "Generate ULID"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Generate ${ssrInterpolate(count.value)}`);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Generate " + toDisplayString(count.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: generateOne,
                    variant: "outline",
                    class: "flex-1",
                    "aria-label": "Generate one ULID"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` + Generate One `);
                      } else {
                        return [
                          createTextVNode(" + Generate One ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-end" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("label", { class: "block text-sm mb-2" }, "Count"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => count.value = $event,
                          type: "number",
                          min: "1",
                          max: "1000",
                          class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            count.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode(unref(_sfc_main$5), {
                        onClick: generate,
                        class: "flex-1",
                        "aria-label": "Generate ULID"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Generate " + toDisplayString(count.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        onClick: generateOne,
                        variant: "outline",
                        class: "flex-1",
                        "aria-label": "Generate one ULID"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" + Generate One ")
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
                      createTextVNode("Generate ULIDs")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4 items-end" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("label", { class: "block text-sm mb-2" }, "Count"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => count.value = $event,
                        type: "number",
                        min: "1",
                        max: "1000",
                        class: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          count.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      onClick: generate,
                      class: "flex-1",
                      "aria-label": "Generate ULID"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Generate " + toDisplayString(count.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      onClick: generateOne,
                      variant: "outline",
                      class: "flex-1",
                      "aria-label": "Generate one ULID"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" + Generate One ")
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated ULIDs`);
                      } else {
                        return [
                          createTextVNode("Generated ULIDs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(ulids.value.length)} ULID(s)`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(ulids.value.length) + " ULID(s)", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  if (ulids.value.length > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      onClick: copyAll,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Copy all ULIDs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                          _push4(` ${ssrInterpolate(copied.value === -1 ? "Copied!" : "Copy All")}`);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (ulids.value.length > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      onClick: clear,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Clear all ULIDs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Clear `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Clear ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Generated ULIDs")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(ulids.value.length) + " ULID(s)", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        ulids.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                          key: 0,
                          onClick: copyAll,
                          variant: "outline",
                          size: "sm",
                          "aria-label": "Copy all ULIDs"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                            createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        ulids.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                          key: 1,
                          onClick: clear,
                          variant: "outline",
                          size: "sm",
                          "aria-label": "Clear all ULIDs"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Clear ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (ulids.value.length > 0) {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(ulids.value, (ulid, index) => {
                      _push3(`<div class="flex items-center justify-between p-3 bg-surface-hover rounded-lg border"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="font-mono text-lg"${_scopeId2}>${ssrInterpolate(ulid)}</div><div class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(parseUlid(ulid).date)}</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        onClick: ($event) => copyUlid(index),
                        variant: "ghost",
                        size: "sm",
                        "aria-label": "Copy ULID " + (index + 1)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }, null), _parent4, _scopeId3);
                          } else {
                            return [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="text-center py-8 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Fingerprint), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Click &quot;Generate&quot; to create ULIDs</p></div>`);
                  }
                } else {
                  return [
                    ulids.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(ulids.value, (ulid, index) => {
                        return openBlock(), createBlock("div", {
                          key: ulid,
                          class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                        }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "font-mono text-lg" }, toDisplayString(ulid), 1),
                            createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(parseUlid(ulid).date), 1)
                          ]),
                          createVNode(unref(_sfc_main$5), {
                            onClick: ($event) => copyUlid(index),
                            variant: "ghost",
                            size: "sm",
                            "aria-label": "Copy ULID " + (index + 1)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label"])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-muted-foreground"
                    }, [
                      createVNode(unref(Fingerprint), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                      createVNode("p", null, 'Click "Generate" to create ULIDs')
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Generated ULIDs")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(ulids.value.length) + " ULID(s)", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      ulids.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                        key: 0,
                        onClick: copyAll,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Copy all ULIDs"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value === -1 ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value === -1 ? "Copied!" : "Copy All"), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      ulids.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$5), {
                        key: 1,
                        onClick: clear,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Clear all ULIDs"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Clear ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  ulids.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(ulids.value, (ulid, index) => {
                      return openBlock(), createBlock("div", {
                        key: ulid,
                        class: "flex items-center justify-between p-3 bg-surface-hover rounded-lg border"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "font-mono text-lg" }, toDisplayString(ulid), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(parseUlid(ulid).date), 1)
                        ]),
                        createVNode(unref(_sfc_main$5), {
                          onClick: ($event) => copyUlid(index),
                          variant: "ghost",
                          size: "sm",
                          "aria-label": "Copy ULID " + (index + 1)
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(copied.value === index ? unref(Check) : unref(Copy)), { class: "w-4 h-4" }))
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-muted-foreground"
                  }, [
                    createVNode(unref(Fingerprint), { class: "w-12 h-12 mx-auto mb-2 opacity-50" }),
                    createVNode("p", null, 'Click "Generate" to create ULIDs')
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "mt-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`About ULIDs`);
                      } else {
                        return [
                          createTextVNode("About ULIDs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("About ULIDs")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-4 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Format</div><div class="text-muted-foreground"${_scopeId2}>26 characters</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Encoding</div><div class="text-muted-foreground"${_scopeId2}>Crockford&#39;s Base32</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Time Component</div><div class="text-muted-foreground"${_scopeId2}>First 10 chars (48 bits)</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Random Component</div><div class="text-muted-foreground"${_scopeId2}>Last 16 chars (80 bits)</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Timestamp Precision</div><div class="text-muted-foreground"${_scopeId2}>Milliseconds</div></div><div${_scopeId2}><div class="font-semibold"${_scopeId2}>Sortability</div><div class="text-muted-foreground"${_scopeId2}>Lexicographically sortable</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Format"),
                        createVNode("div", { class: "text-muted-foreground" }, "26 characters")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Encoding"),
                        createVNode("div", { class: "text-muted-foreground" }, "Crockford's Base32")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Time Component"),
                        createVNode("div", { class: "text-muted-foreground" }, "First 10 chars (48 bits)")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Random Component"),
                        createVNode("div", { class: "text-muted-foreground" }, "Last 16 chars (80 bits)")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Timestamp Precision"),
                        createVNode("div", { class: "text-muted-foreground" }, "Milliseconds")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "font-semibold" }, "Sortability"),
                        createVNode("div", { class: "text-muted-foreground" }, "Lexicographically sortable")
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
                      createTextVNode("About ULIDs")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Format"),
                      createVNode("div", { class: "text-muted-foreground" }, "26 characters")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Encoding"),
                      createVNode("div", { class: "text-muted-foreground" }, "Crockford's Base32")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Time Component"),
                      createVNode("div", { class: "text-muted-foreground" }, "First 10 chars (48 bits)")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Random Component"),
                      createVNode("div", { class: "text-muted-foreground" }, "Last 16 chars (80 bits)")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Timestamp Precision"),
                      createVNode("div", { class: "text-muted-foreground" }, "Milliseconds")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold" }, "Sortability"),
                      createVNode("div", { class: "text-muted-foreground" }, "Lexicographically sortable")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ULIDGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
