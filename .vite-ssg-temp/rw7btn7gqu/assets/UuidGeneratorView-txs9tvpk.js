import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { v4 } from "uuid";
import { RefreshCw, Copy } from "lucide-vue-next";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
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
  __name: "UuidGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const count = ref(1);
    const uuids = ref([]);
    const generate = () => {
      uuids.value = Array.from({ length: count.value }, () => v4());
    };
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };
    const copyAll = () => {
      navigator.clipboard.writeText(uuids.value.join("\n"));
    };
    generate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">UUID Generator</h1></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "h-fit" }, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "grid gap-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity`);
                      } else {
                        return [
                          createTextVNode("Quantity")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    type: "number",
                    modelValue: count.value,
                    "onUpdate:modelValue": ($event) => count.value = $event,
                    modelModifiers: { number: true },
                    min: "1",
                    max: "100",
                    "aria-label": "Number of UUIDs to generate"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate new UUIDs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RefreshCw), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Generate `);
                      } else {
                        return [
                          createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Generate ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "secondary",
                    onClick: copyAll,
                    class: "w-full",
                    disabled: uuids.value.length === 0
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Copy All `);
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Copy All ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Quantity")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        type: "number",
                        modelValue: count.value,
                        "onUpdate:modelValue": ($event) => count.value = $event,
                        modelModifiers: { number: true },
                        min: "1",
                        max: "100",
                        "aria-label": "Number of UUIDs to generate"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: generate,
                      class: "w-full",
                      "aria-label": "Generate new UUIDs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Generate ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "secondary",
                      onClick: copyAll,
                      class: "w-full",
                      disabled: uuids.value.length === 0
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Copy All ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$4), { class: "grid gap-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Quantity")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      type: "number",
                      modelValue: count.value,
                      "onUpdate:modelValue": ($event) => count.value = $event,
                      modelModifiers: { number: true },
                      min: "1",
                      max: "100",
                      "aria-label": "Number of UUIDs to generate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: generate,
                    class: "w-full",
                    "aria-label": "Generate new UUIDs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RefreshCw), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Generate ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$7), {
                    variant: "secondary",
                    onClick: copyAll,
                    class: "w-full",
                    disabled: uuids.value.length === 0
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Copy All ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "md:col-span-2 h-full flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generated UUIDs`);
                      } else {
                        return [
                          createTextVNode("Generated UUIDs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generated UUIDs")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(uuids.value, (uuid, index) => {
                    _push3(`<div class="flex items-center justify-between p-3 rounded-md border border-border bg-muted/50 text-card-foreground shadow-sm hover:bg-muted transition-colors group"${_scopeId2}><code class="text-sm font-mono"${_scopeId2}>${ssrInterpolate(uuid)}</code>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      variant: "ghost",
                      size: "icon",
                      onClick: ($event) => copyToClipboard(uuid),
                      class: "opacity-0 group-hover:opacity-100 transition-opacity"
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
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(uuids.value, (uuid, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex items-center justify-between p-3 rounded-md border border-border bg-muted/50 text-card-foreground shadow-sm hover:bg-muted transition-colors group"
                        }, [
                          createVNode("code", { class: "text-sm font-mono" }, toDisplayString(uuid), 1),
                          createVNode(unref(_sfc_main$7), {
                            variant: "ghost",
                            size: "icon",
                            onClick: ($event) => copyToClipboard(uuid),
                            class: "opacity-0 group-hover:opacity-100 transition-opacity"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Copy), { class: "h-4 w-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]);
                      }), 128))
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
                      createTextVNode("Generated UUIDs")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(uuids.value, (uuid, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "flex items-center justify-between p-3 rounded-md border border-border bg-muted/50 text-card-foreground shadow-sm hover:bg-muted transition-colors group"
                      }, [
                        createVNode("code", { class: "text-sm font-mono" }, toDisplayString(uuid), 1),
                        createVNode(unref(_sfc_main$7), {
                          variant: "ghost",
                          size: "icon",
                          onClick: ($event) => copyToClipboard(uuid),
                          class: "opacity-0 group-hover:opacity-100 transition-opacity"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/UuidGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
