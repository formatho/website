import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
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
  __name: "SafelinkDecoderView",
  __ssrInlineRender: true,
  setup(__props) {
    const safelinkUrl = ref("");
    const decodedUrl = computed(() => {
      if (!safelinkUrl.value) return null;
      try {
        const url = new URL(safelinkUrl.value);
        if (url.hostname.includes("safelink.protection.outlook.com")) {
          const encodedUrl = url.searchParams.get("url");
          if (encodedUrl) {
            return decodeURIComponent(encodedUrl);
          }
        }
        return null;
      } catch (e) {
        return null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Outlook Safelink Decoder</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Decode Safelink`);
                      } else {
                        return [
                          createTextVNode("Decode Safelink")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Decode Safelink")
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
                        _push4(`Outlook Safelink URL`);
                      } else {
                        return [
                          createTextVNode("Outlook Safelink URL")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: safelinkUrl.value,
                    "onUpdate:modelValue": ($event) => safelinkUrl.value = $event,
                    "aria-label": "Safelink URL to decode",
                    placeholder: "Paste Outlook safelink URL here...",
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Outlook Safelink URL")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: safelinkUrl.value,
                        "onUpdate:modelValue": ($event) => safelinkUrl.value = $event,
                        "aria-label": "Safelink URL to decode",
                        placeholder: "Paste Outlook safelink URL here...",
                        class: "font-mono text-sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Decode Safelink")
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
                        createTextVNode("Outlook Safelink URL")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: safelinkUrl.value,
                      "onUpdate:modelValue": ($event) => safelinkUrl.value = $event,
                      "aria-label": "Safelink URL to decode",
                      placeholder: "Paste Outlook safelink URL here...",
                      class: "font-mono text-sm"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (decodedUrl.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Decoded URL`);
                        } else {
                          return [
                            createTextVNode("Decoded URL")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Decoded URL")
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
                    _push3(`<div class="p-4 rounded-lg bg-muted font-mono text-sm break-all"${_scopeId2}><a${ssrRenderAttr("href", decodedUrl.value)} target="_blank" rel="noopener noreferrer" class="text-gray-900"${_scopeId2}>${ssrInterpolate(decodedUrl.value)}</a></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, [
                        createVNode("a", {
                          href: decodedUrl.value,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "text-gray-900"
                        }, toDisplayString(decodedUrl.value), 9, ["href"])
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
                        createTextVNode("Decoded URL")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "p-4 rounded-lg bg-muted font-mono text-sm break-all" }, [
                      createVNode("a", {
                        href: decodedUrl.value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "text-gray-900"
                      }, toDisplayString(decodedUrl.value), 9, ["href"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (safelinkUrl.value && !decodedUrl.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-4 rounded-lg bg-orange-500/10 text-orange-600 text-sm"${_scopeId2}> Invalid Outlook safelink or not a safelink URL </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-4 rounded-lg bg-orange-500/10 text-orange-600 text-sm" }, " Invalid Outlook safelink or not a safelink URL ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "p-4 rounded-lg bg-orange-500/10 text-orange-600 text-sm" }, " Invalid Outlook safelink or not a safelink URL ")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/SafelinkDecoderView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
