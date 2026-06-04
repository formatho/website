import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
  __name: "Ipv6UlaGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const generatedUla = ref("");
    const generateULA = () => {
      const randomBytes = new Uint8Array(5);
      crypto.getRandomValues(randomBytes);
      const b0 = randomBytes[0] ?? 0;
      const b1 = randomBytes[1] ?? 0;
      const b2 = randomBytes[2] ?? 0;
      const b3 = randomBytes[3] ?? 0;
      const b4 = randomBytes[4] ?? 0;
      const parts = [
        "fd" + b0.toString(16).padStart(2, "0"),
        b1.toString(16).padStart(2, "0") + b2.toString(16).padStart(2, "0"),
        b3.toString(16).padStart(2, "0") + b4.toString(16).padStart(2, "0")
      ];
      generatedUla.value = parts.join(":") + "::/48";
    };
    const copyUla = () => {
      navigator.clipboard.writeText(generatedUla.value);
    };
    generateULA();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">IPv6 ULA Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate IPv6 Unique Local Address`);
                      } else {
                        return [
                          createTextVNode("Generate IPv6 Unique Local Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate IPv6 Unique Local Address")
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
                        _push4(`Generated ULA Prefix`);
                      } else {
                        return [
                          createTextVNode("Generated ULA Prefix")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><div class="flex-1 p-4 rounded-lg bg-muted font-mono text-xl text-center break-all"${_scopeId2}>${ssrInterpolate(generatedUla.value)}</div></div></div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: generateULA,
                    class: "flex-1",
                    "aria-label": "Generate new ULA"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate New`);
                      } else {
                        return [
                          createTextVNode("Generate New")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    variant: "outline",
                    onClick: copyUla,
                    "aria-label": "Copy ULA address"
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Generated ULA Prefix")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("div", { class: "flex-1 p-4 rounded-lg bg-muted font-mono text-xl text-center break-all" }, toDisplayString(generatedUla.value), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$6), {
                        onClick: generateULA,
                        class: "flex-1",
                        "aria-label": "Generate new ULA"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Generate New")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        variant: "outline",
                        onClick: copyUla,
                        "aria-label": "Copy ULA address"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy")
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
                      createTextVNode("Generate IPv6 Unique Local Address")
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
                        createTextVNode("Generated ULA Prefix")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("div", { class: "flex-1 p-4 rounded-lg bg-muted font-mono text-xl text-center break-all" }, toDisplayString(generatedUla.value), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$6), {
                      onClick: generateULA,
                      class: "flex-1",
                      "aria-label": "Generate new ULA"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate New")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      variant: "outline",
                      onClick: copyUla,
                      "aria-label": "Copy ULA address"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`About IPv6 ULA`);
                      } else {
                        return [
                          createTextVNode("About IPv6 ULA")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("About IPv6 ULA")
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
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>Unique Local Addresses (ULA)</strong> are IPv6 addresses for local communications. </p><p${_scopeId2}> Prefix: <code class="bg-muted px-1 rounded"${_scopeId2}>fc00::/7</code> (currently <code class="bg-muted px-1 rounded"${_scopeId2}>fd00::/8</code>) </p><p${_scopeId2}>They are not routable on the global internet, similar to IPv4 private addresses.</p><p${_scopeId2}>Useful for internal networks, testing, and private communications.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Unique Local Addresses (ULA)"),
                      createTextVNode(" are IPv6 addresses for local communications. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Prefix: "),
                      createVNode("code", { class: "bg-muted px-1 rounded" }, "fc00::/7"),
                      createTextVNode(" (currently "),
                      createVNode("code", { class: "bg-muted px-1 rounded" }, "fd00::/8"),
                      createTextVNode(") ")
                    ]),
                    createVNode("p", null, "They are not routable on the global internet, similar to IPv4 private addresses."),
                    createVNode("p", null, "Useful for internal networks, testing, and private communications.")
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
                      createTextVNode("About IPv6 ULA")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "text-sm text-muted-foreground space-y-2" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Unique Local Addresses (ULA)"),
                    createTextVNode(" are IPv6 addresses for local communications. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" Prefix: "),
                    createVNode("code", { class: "bg-muted px-1 rounded" }, "fc00::/7"),
                    createTextVNode(" (currently "),
                    createVNode("code", { class: "bg-muted px-1 rounded" }, "fd00::/8"),
                    createTextVNode(") ")
                  ]),
                  createVNode("p", null, "They are not routable on the global internet, similar to IPv4 private addresses."),
                  createVNode("p", null, "Useful for internal networks, testing, and private communications.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Ipv6UlaGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
