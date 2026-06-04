import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
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
  __name: "IbanValidatorView",
  __ssrInlineRender: true,
  setup(__props) {
    const ibanInput = ref("");
    const countryLengths = {
      AL: 28,
      AD: 24,
      AT: 20,
      AZ: 28,
      BE: 16,
      BH: 22,
      BA: 20,
      BR: 29,
      BG: 22,
      CR: 21,
      HR: 21,
      CY: 28,
      CZ: 24,
      DK: 18,
      DO: 28,
      EE: 20,
      FO: 18,
      FI: 18,
      FR: 27,
      GE: 22,
      DE: 22,
      GI: 23,
      GR: 27,
      GL: 18,
      GT: 28,
      HU: 28,
      IS: 26,
      IE: 22,
      IL: 23,
      IT: 27,
      JO: 30,
      KZ: 20,
      KW: 30,
      LV: 21,
      LB: 28,
      LI: 21,
      LT: 20,
      LU: 20,
      MK: 19,
      MT: 31,
      MR: 27,
      MU: 30,
      MC: 27,
      MD: 24,
      ME: 22,
      NL: 18,
      NO: 15,
      PK: 24,
      PS: 29,
      PL: 28,
      PT: 25,
      QA: 29,
      RO: 24,
      SM: 27,
      SA: 24,
      RS: 22,
      SK: 24,
      SI: 19,
      ES: 24,
      SE: 24,
      CH: 21,
      TN: 24,
      TR: 26,
      AE: 23,
      GB: 22,
      VG: 24
    };
    const validateIban = (iban) => {
      if (!iban) return null;
      const cleaned = iban.replace(/\s/g, "").toUpperCase();
      if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleaned)) {
        return {
          valid: false,
          countryCode: "",
          checkDigits: "",
          bban: "",
          formatted: cleaned
        };
      }
      const countryCode = cleaned.slice(0, 2);
      const checkDigits = cleaned.slice(2, 4);
      const bban = cleaned.slice(4);
      const expectedLength = countryLengths[countryCode];
      if (expectedLength && cleaned.length !== expectedLength) {
        return {
          valid: false,
          countryCode,
          checkDigits,
          bban,
          formatted: formatIban(cleaned)
        };
      }
      const rearranged = bban + countryCode + checkDigits;
      const numeric = rearranged.split("").map((c) => {
        const code = c.charCodeAt(0);
        return code >= 65 && code <= 90 ? (code - 55).toString() : c;
      }).join("");
      let remainder = 0;
      for (let i = 0; i < numeric.length; i++) {
        const char = numeric[i];
        remainder = (remainder * 10 + parseInt(char ?? "0")) % 97;
      }
      const valid = remainder === 1;
      return {
        valid,
        countryCode,
        checkDigits,
        bban,
        formatted: formatIban(cleaned),
        bankCode: bban.slice(0, 4),
        accountNumber: bban.slice(4)
      };
    };
    const formatIban = (iban) => {
      return iban.replace(/(.{4})/g, "$1 ").trim();
    };
    const ibanInfo = computed(() => {
      return validateIban(ibanInput.value);
    });
    const copyIban = () => {
      if (ibanInfo.value?.formatted) {
        navigator.clipboard.writeText(ibanInfo.value.formatted.replace(/\s/g, ""));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">IBAN Validator &amp; Parser</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Validate IBAN`);
                      } else {
                        return [
                          createTextVNode("Validate IBAN")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Validate IBAN")
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
                        _push4(`IBAN`);
                      } else {
                        return [
                          createTextVNode("IBAN")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: ibanInput.value,
                    "onUpdate:modelValue": ($event) => ibanInput.value = $event,
                    placeholder: "DE89 3704 0044 0532 0130 00",
                    class: "font-mono uppercase",
                    "aria-label": "IBAN input for validation"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("IBAN")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: ibanInput.value,
                        "onUpdate:modelValue": ($event) => ibanInput.value = $event,
                        placeholder: "DE89 3704 0044 0532 0130 00",
                        class: "font-mono uppercase",
                        "aria-label": "IBAN input for validation"
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
                      createTextVNode("Validate IBAN")
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
                        createTextVNode("IBAN")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: ibanInput.value,
                      "onUpdate:modelValue": ($event) => ibanInput.value = $event,
                      placeholder: "DE89 3704 0044 0532 0130 00",
                      class: "font-mono uppercase",
                      "aria-label": "IBAN input for validation"
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
      if (ibanInfo.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Valid</div><div class="${ssrRenderClass(["text-3xl font-bold", ibanInfo.value.valid ? "text-green-600" : "text-red-600"])}"${_scopeId2}>${ssrInterpolate(ibanInfo.value.valid ? "✓ Valid" : "✗ Invalid")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Valid"),
                      createVNode("div", {
                        class: ["text-3xl font-bold", ibanInfo.value.valid ? "text-green-600" : "text-red-600"]
                      }, toDisplayString(ibanInfo.value.valid ? "✓ Valid" : "✗ Invalid"), 3)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Valid"),
                    createVNode("div", {
                      class: ["text-3xl font-bold", ibanInfo.value.valid ? "text-green-600" : "text-red-600"]
                    }, toDisplayString(ibanInfo.value.valid ? "✓ Valid" : "✗ Invalid"), 3)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Country</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(ibanInfo.value.countryCode || "Unknown")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Country"),
                      createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(ibanInfo.value.countryCode || "Unknown"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Country"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(ibanInfo.value.countryCode || "Unknown"), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Check Digits</div><div class="text-2xl font-mono"${_scopeId2}>${ssrInterpolate(ibanInfo.value.checkDigits || "-")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Check Digits"),
                      createVNode("div", { class: "text-2xl font-mono" }, toDisplayString(ibanInfo.value.checkDigits || "-"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Check Digits"),
                    createVNode("div", { class: "text-2xl font-mono" }, toDisplayString(ibanInfo.value.checkDigits || "-"), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>BBAN</div><div class="text-xl font-mono break-all"${_scopeId2}>${ssrInterpolate(ibanInfo.value.bban || "-")}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "BBAN"),
                      createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(ibanInfo.value.bban || "-"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "BBAN"),
                    createVNode("div", { class: "text-xl font-mono break-all" }, toDisplayString(ibanInfo.value.bban || "-"), 1)
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
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Formatted</div><div class="text-xl font-mono"${_scopeId2}>${ssrInterpolate(ibanInfo.value.formatted)}</div>`);
                    if (ibanInfo.value.formatted) {
                      _push3(ssrRenderComponent(_component_Button, {
                        variant: "ghost",
                        size: "sm",
                        class: "mt-2",
                        onClick: copyIban
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Copy `);
                          } else {
                            return [
                              createTextVNode(" Copy ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Formatted"),
                      createVNode("div", { class: "text-xl font-mono" }, toDisplayString(ibanInfo.value.formatted), 1),
                      ibanInfo.value.formatted ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        variant: "ghost",
                        size: "sm",
                        class: "mt-2",
                        onClick: copyIban
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Copy ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Formatted"),
                    createVNode("div", { class: "text-xl font-mono" }, toDisplayString(ibanInfo.value.formatted), 1),
                    ibanInfo.value.formatted ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      variant: "ghost",
                      size: "sm",
                      class: "mt-2",
                      onClick: copyIban
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Copy ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/IbanValidatorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
