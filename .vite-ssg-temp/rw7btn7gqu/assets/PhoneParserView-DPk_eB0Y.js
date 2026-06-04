import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, withDirectives, vModelSelect, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
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
  __name: "PhoneParserView",
  __ssrInlineRender: true,
  setup(__props) {
    const phoneNumber = ref("");
    const countryCode = ref("US");
    const parsePhone = (input, country) => {
      if (!input) return null;
      const cleaned = input.replace(/[^\d+]/g, "");
      if (country === "US") {
        const digits = cleaned.replace("+1", "").replace(/\D/g, "");
        if (digits.length === 10) {
          return {
            valid: true,
            international: `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
            national: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
            country: "United States",
            e164: `+1${digits}`
          };
        }
      }
      if (cleaned.startsWith("+") && cleaned.length >= 8) {
        return {
          valid: true,
          international: cleaned,
          national: cleaned,
          country: "International",
          e164: cleaned
        };
      }
      return {
        valid: false,
        international: input,
        national: input,
        country: "Unknown",
        e164: input
      };
    };
    const parsedPhone = computed(() => {
      return parsePhone(phoneNumber.value, countryCode.value);
    });
    const copyValue = (value) => {
      navigator.clipboard.writeText(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Phone Parser &amp; Formatter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Parse Phone Number`);
                      } else {
                        return [
                          createTextVNode("Parse Phone Number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Parse Phone Number")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone Number`);
                      } else {
                        return [
                          createTextVNode("Phone Number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: phoneNumber.value,
                    "onUpdate:modelValue": ($event) => phoneNumber.value = $event,
                    placeholder: "+1 (555) 123-4567",
                    class: "font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Country`);
                      } else {
                        return [
                          createTextVNode("Country")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option value="US"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "US") : ssrLooseEqual(countryCode.value, "US")) ? " selected" : ""}${_scopeId2}>United States</option><option value="UK"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "UK") : ssrLooseEqual(countryCode.value, "UK")) ? " selected" : ""}${_scopeId2}>United Kingdom</option><option value="DE"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "DE") : ssrLooseEqual(countryCode.value, "DE")) ? " selected" : ""}${_scopeId2}>Germany</option><option value="FR"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "FR") : ssrLooseEqual(countryCode.value, "FR")) ? " selected" : ""}${_scopeId2}>France</option><option value="IN"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "IN") : ssrLooseEqual(countryCode.value, "IN")) ? " selected" : ""}${_scopeId2}>India</option><option value="OTHER"${ssrIncludeBooleanAttr(Array.isArray(countryCode.value) ? ssrLooseContain(countryCode.value, "OTHER") : ssrLooseEqual(countryCode.value, "OTHER")) ? " selected" : ""}${_scopeId2}>Other</option></select></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Phone Number")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: phoneNumber.value,
                          "onUpdate:modelValue": ($event) => phoneNumber.value = $event,
                          placeholder: "+1 (555) 123-4567",
                          class: "font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Country")
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => countryCode.value = $event,
                          class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        }, [
                          createVNode("option", { value: "US" }, "United States"),
                          createVNode("option", { value: "UK" }, "United Kingdom"),
                          createVNode("option", { value: "DE" }, "Germany"),
                          createVNode("option", { value: "FR" }, "France"),
                          createVNode("option", { value: "IN" }, "India"),
                          createVNode("option", { value: "OTHER" }, "Other")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, countryCode.value]
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
                      createTextVNode("Parse Phone Number")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Phone Number")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: phoneNumber.value,
                        "onUpdate:modelValue": ($event) => phoneNumber.value = $event,
                        placeholder: "+1 (555) 123-4567",
                        class: "font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Country")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => countryCode.value = $event,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: "US" }, "United States"),
                        createVNode("option", { value: "UK" }, "United Kingdom"),
                        createVNode("option", { value: "DE" }, "Germany"),
                        createVNode("option", { value: "FR" }, "France"),
                        createVNode("option", { value: "IN" }, "India"),
                        createVNode("option", { value: "OTHER" }, "Other")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, countryCode.value]
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
      if (parsedPhone.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Valid</div><div class="${ssrRenderClass(["text-2xl font-bold", parsedPhone.value.valid ? "text-green-600" : "text-red-600"])}"${_scopeId2}>${ssrInterpolate(parsedPhone.value.valid ? "✓ Yes" : "✗ No")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Valid"),
                      createVNode("div", {
                        class: ["text-2xl font-bold", parsedPhone.value.valid ? "text-green-600" : "text-red-600"]
                      }, toDisplayString(parsedPhone.value.valid ? "✓ Yes" : "✗ No"), 3)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Valid"),
                    createVNode("div", {
                      class: ["text-2xl font-bold", parsedPhone.value.valid ? "text-green-600" : "text-red-600"]
                    }, toDisplayString(parsedPhone.value.valid ? "✓ Yes" : "✗ No"), 3)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-1"${_scopeId2}>Country</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(parsedPhone.value.country)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Country"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedPhone.value.country), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-1" }, "Country"),
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(parsedPhone.value.country), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-2"${_scopeId2}>E.164 Format</div><div class="font-mono text-lg"${_scopeId2}>${ssrInterpolate(parsedPhone.value.e164)}</div>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.e164),
                      "aria-label": "Copy E164 format"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` &gt;Copy`);
                        } else {
                          return [
                            createTextVNode(" >Copy")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "E.164 Format"),
                      createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.e164), 1),
                      createVNode(_component_Button, {
                        variant: "ghost",
                        size: "sm",
                        class: "mt-2",
                        onClick: ($event) => copyValue(parsedPhone.value.e164),
                        "aria-label": "Copy E164 format"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" >Copy")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "E.164 Format"),
                    createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.e164), 1),
                    createVNode(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.e164),
                      "aria-label": "Copy E164 format"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" >Copy")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-2"${_scopeId2}>National Format</div><div class="font-mono text-lg"${_scopeId2}>${ssrInterpolate(parsedPhone.value.national)}</div>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.national),
                      "aria-label": "Copy national format"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` &gt;Copy`);
                        } else {
                          return [
                            createTextVNode(" >Copy")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "National Format"),
                      createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.national), 1),
                      createVNode(_component_Button, {
                        variant: "ghost",
                        size: "sm",
                        class: "mt-2",
                        onClick: ($event) => copyValue(parsedPhone.value.national),
                        "aria-label": "Copy national format"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" >Copy")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "National Format"),
                    createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.national), 1),
                    createVNode(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.national),
                      "aria-label": "Copy national format"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" >Copy")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "md:col-span-2" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground mb-2"${_scopeId2}>International Format</div><div class="font-mono text-lg"${_scopeId2}>${ssrInterpolate(parsedPhone.value.international)}</div>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.international)
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
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "International Format"),
                      createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.international), 1),
                      createVNode(_component_Button, {
                        variant: "ghost",
                        size: "sm",
                        class: "mt-2",
                        onClick: ($event) => copyValue(parsedPhone.value.international)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Copy")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "International Format"),
                    createVNode("div", { class: "font-mono text-lg" }, toDisplayString(parsedPhone.value.international), 1),
                    createVNode(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: ($event) => copyValue(parsedPhone.value.international)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Copy")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PhoneParserView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
