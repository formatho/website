import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import * as bcrypt from "bcryptjs";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$5 } from "./Label-Bp2OSpkW.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
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
  __name: "BcryptView",
  __ssrInlineRender: true,
  setup(__props) {
    const password = ref("");
    const saltRounds = ref(10);
    const hashResult = ref("");
    const hashToVerify = ref("");
    const passwordToVerify = ref("");
    const verifyResult = ref("");
    const generateHash = () => {
      if (!password.value) return;
      hashResult.value = bcrypt.hashSync(password.value, saltRounds.value);
    };
    const verifyHash = () => {
      if (!hashToVerify.value || !passwordToVerify.value) return;
      verifyResult.value = bcrypt.compareSync(passwordToVerify.value, hashToVerify.value) ? "valid" : "invalid";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Bcrypt Hash Generator/Verifier</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Hash`);
                      } else {
                        return [
                          createTextVNode("Generate Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate Hash")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    type: "password",
                    placeholder: "Enter password...",
                    "aria-label": "Password to hash"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Salt Rounds`);
                      } else {
                        return [
                          createTextVNode("Salt Rounds")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: saltRounds.value,
                    "onUpdate:modelValue": ($event) => saltRounds.value = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "4",
                    max: "20",
                    "aria-label": "Salt rounds"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: generateHash,
                    class: "w-full",
                    "aria-label": "Generate new hash"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Hash`);
                      } else {
                        return [
                          createTextVNode("Generate Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (hashResult.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Hash Result`);
                        } else {
                          return [
                            createTextVNode("Hash Result")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(CodeEditor, {
                      "model-value": hashResult.value,
                      language: "plaintext",
                      readonly: true,
                      "min-height": "80px",
                      "line-numbers": "off"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: password.value,
                        "onUpdate:modelValue": ($event) => password.value = $event,
                        type: "password",
                        placeholder: "Enter password...",
                        "aria-label": "Password to hash"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Salt Rounds")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: saltRounds.value,
                        "onUpdate:modelValue": ($event) => saltRounds.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "4",
                        max: "20",
                        "aria-label": "Salt rounds"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: generateHash,
                      class: "w-full",
                      "aria-label": "Generate new hash"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate Hash")
                      ]),
                      _: 1
                    }),
                    hashResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Hash Result")
                        ]),
                        _: 1
                      }),
                      createVNode(CodeEditor, {
                        "model-value": hashResult.value,
                        language: "plaintext",
                        readonly: true,
                        "min-height": "80px",
                        "line-numbers": "off"
                      }, null, 8, ["model-value"])
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Generate Hash")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      type: "password",
                      placeholder: "Enter password...",
                      "aria-label": "Password to hash"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Salt Rounds")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: saltRounds.value,
                      "onUpdate:modelValue": ($event) => saltRounds.value = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "4",
                      max: "20",
                      "aria-label": "Salt rounds"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: generateHash,
                    class: "w-full",
                    "aria-label": "Generate new hash"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Generate Hash")
                    ]),
                    _: 1
                  }),
                  hashResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Hash Result")
                      ]),
                      _: 1
                    }),
                    createVNode(CodeEditor, {
                      "model-value": hashResult.value,
                      language: "plaintext",
                      readonly: true,
                      "min-height": "80px",
                      "line-numbers": "off"
                    }, null, 8, ["model-value"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Verify Hash`);
                      } else {
                        return [
                          createTextVNode("Verify Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Verify Hash")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: passwordToVerify.value,
                    "onUpdate:modelValue": ($event) => passwordToVerify.value = $event,
                    type: "password",
                    "aria-label": "Password to verify",
                    placeholder: "Enter password to verify..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hash`);
                      } else {
                        return [
                          createTextVNode("Hash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: hashToVerify.value,
                    "onUpdate:modelValue": ($event) => hashToVerify.value = $event,
                    language: "plaintext",
                    "min-height": "80px",
                    "line-numbers": "off"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: verifyHash,
                    class: "w-full",
                    "aria-label": "Verify hash"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Verify`);
                      } else {
                        return [
                          createTextVNode("Verify")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (verifyResult.value) {
                    _push3(`<div class="${ssrRenderClass([
                      "p-4 rounded-md text-center font-medium",
                      verifyResult.value === "valid" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ])}"${_scopeId2}>${ssrInterpolate(verifyResult.value === "valid" ? "✓ Password matches hash" : "✗ Password does not match hash")}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: passwordToVerify.value,
                        "onUpdate:modelValue": ($event) => passwordToVerify.value = $event,
                        type: "password",
                        "aria-label": "Password to verify",
                        placeholder: "Enter password to verify..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Hash")
                        ]),
                        _: 1
                      }),
                      createVNode(CodeEditor, {
                        modelValue: hashToVerify.value,
                        "onUpdate:modelValue": ($event) => hashToVerify.value = $event,
                        language: "plaintext",
                        "min-height": "80px",
                        "line-numbers": "off"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      onClick: verifyHash,
                      class: "w-full",
                      "aria-label": "Verify hash"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Verify")
                      ]),
                      _: 1
                    }),
                    verifyResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: [
                        "p-4 rounded-md text-center font-medium",
                        verifyResult.value === "valid" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                      ]
                    }, toDisplayString(verifyResult.value === "valid" ? "✓ Password matches hash" : "✗ Password does not match hash"), 3)) : createCommentVNode("", true)
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
                      createTextVNode("Verify Hash")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: passwordToVerify.value,
                      "onUpdate:modelValue": ($event) => passwordToVerify.value = $event,
                      type: "password",
                      "aria-label": "Password to verify",
                      placeholder: "Enter password to verify..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Hash")
                      ]),
                      _: 1
                    }),
                    createVNode(CodeEditor, {
                      modelValue: hashToVerify.value,
                      "onUpdate:modelValue": ($event) => hashToVerify.value = $event,
                      language: "plaintext",
                      "min-height": "80px",
                      "line-numbers": "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    onClick: verifyHash,
                    class: "w-full",
                    "aria-label": "Verify hash"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Verify")
                    ]),
                    _: 1
                  }),
                  verifyResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: [
                      "p-4 rounded-md text-center font-medium",
                      verifyResult.value === "valid" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    ]
                  }, toDisplayString(verifyResult.value === "valid" ? "✓ Password matches hash" : "✗ Password does not match hash"), 3)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BcryptView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
