import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, withDirectives, vModelSelect, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import CryptoJS from "crypto-js";
import { a as _sfc_main$6, h as _sfc_main$7, c as _sfc_main$8 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "EncryptionView",
  __ssrInlineRender: true,
  setup(__props) {
    const plaintext = ref("");
    const secretKey = ref("");
    const ciphertext = ref("");
    const decryptText = ref("");
    const decryptKey = ref("");
    const decryptResult = ref("");
    const algorithm = ref("AES");
    const error = ref("");
    const encrypt = () => {
      try {
        error.value = "";
        if (!plaintext.value || !secretKey.value) return;
        switch (algorithm.value) {
          case "AES":
            ciphertext.value = CryptoJS.AES.encrypt(plaintext.value, secretKey.value).toString();
            break;
          case "DES":
            ciphertext.value = CryptoJS.DES.encrypt(plaintext.value, secretKey.value).toString();
            break;
          case "TripleDES":
            ciphertext.value = CryptoJS.TripleDES.encrypt(plaintext.value, secretKey.value).toString();
            break;
          case "Rabbit":
            ciphertext.value = CryptoJS.Rabbit.encrypt(plaintext.value, secretKey.value).toString();
            break;
          case "RC4":
            ciphertext.value = CryptoJS.RC4.encrypt(plaintext.value, secretKey.value).toString();
            break;
        }
      } catch (e) {
        error.value = "Encryption failed";
      }
    };
    const decrypt = () => {
      try {
        error.value = "";
        if (!decryptText.value || !decryptKey.value) return;
        switch (algorithm.value) {
          case "AES":
            decryptResult.value = CryptoJS.AES.decrypt(decryptText.value, decryptKey.value).toString(
              CryptoJS.enc.Utf8
            );
            break;
          case "DES":
            decryptResult.value = CryptoJS.DES.decrypt(decryptText.value, decryptKey.value).toString(
              CryptoJS.enc.Utf8
            );
            break;
          case "TripleDES":
            decryptResult.value = CryptoJS.TripleDES.decrypt(
              decryptText.value,
              decryptKey.value
            ).toString(CryptoJS.enc.Utf8);
            break;
          case "Rabbit":
            decryptResult.value = CryptoJS.Rabbit.decrypt(decryptText.value, decryptKey.value).toString(
              CryptoJS.enc.Utf8
            );
            break;
          case "RC4":
            decryptResult.value = CryptoJS.RC4.decrypt(decryptText.value, decryptKey.value).toString(
              CryptoJS.enc.Utf8
            );
            break;
        }
        if (!decryptResult.value) {
          error.value = "Decryption failed - wrong key or invalid ciphertext";
        }
      } catch (e) {
        error.value = "Decryption failed";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Text Encryption/Decryption</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Encrypt`);
                      } else {
                        return [
                          createTextVNode("Encrypt")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Encrypt")
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
                        _push4(`Algorithm`);
                      } else {
                        return [
                          createTextVNode("Algorithm")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<select aria-label="Encryption algorithm" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId2}><option value="AES"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "AES") : ssrLooseEqual(algorithm.value, "AES")) ? " selected" : ""}${_scopeId2}>AES</option><option value="DES"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "DES") : ssrLooseEqual(algorithm.value, "DES")) ? " selected" : ""}${_scopeId2}>DES</option><option value="TripleDES"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "TripleDES") : ssrLooseEqual(algorithm.value, "TripleDES")) ? " selected" : ""}${_scopeId2}>TripleDES</option><option value="Rabbit"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "Rabbit") : ssrLooseEqual(algorithm.value, "Rabbit")) ? " selected" : ""}${_scopeId2}>Rabbit</option><option value="RC4"${ssrIncludeBooleanAttr(Array.isArray(algorithm.value) ? ssrLooseContain(algorithm.value, "RC4") : ssrLooseEqual(algorithm.value, "RC4")) ? " selected" : ""}${_scopeId2}>RC4</option></select></div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Secret Key`);
                      } else {
                        return [
                          createTextVNode("Secret Key")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: secretKey.value,
                    "onUpdate:modelValue": ($event) => secretKey.value = $event,
                    type: "password",
                    placeholder: "Enter secret key...",
                    "aria-label": "Encryption key"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Plaintext`);
                      } else {
                        return [
                          createTextVNode("Plaintext")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    modelValue: plaintext.value,
                    "onUpdate:modelValue": ($event) => plaintext.value = $event,
                    placeholder: "Enter text to encrypt...",
                    "aria-label": "Text to encrypt",
                    rows: "4"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    onClick: encrypt,
                    class: "w-full",
                    "aria-label": "Encrypt text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Encrypt`);
                      } else {
                        return [
                          createTextVNode("Encrypt")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (ciphertext.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Ciphertext`);
                        } else {
                          return [
                            createTextVNode("Ciphertext")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "model-value": ciphertext.value,
                      readonly: "",
                      "aria-label": "Encrypted ciphertext",
                      class: "font-mono text-sm",
                      rows: "3"
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
                          createTextVNode("Algorithm")
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => algorithm.value = $event,
                        "aria-label": "Encryption algorithm",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      }, [
                        createVNode("option", { value: "AES" }, "AES"),
                        createVNode("option", { value: "DES" }, "DES"),
                        createVNode("option", { value: "TripleDES" }, "TripleDES"),
                        createVNode("option", { value: "Rabbit" }, "Rabbit"),
                        createVNode("option", { value: "RC4" }, "RC4")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, algorithm.value]
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Secret Key")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: secretKey.value,
                        "onUpdate:modelValue": ($event) => secretKey.value = $event,
                        type: "password",
                        placeholder: "Enter secret key...",
                        "aria-label": "Encryption key"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Plaintext")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: plaintext.value,
                        "onUpdate:modelValue": ($event) => plaintext.value = $event,
                        placeholder: "Enter text to encrypt...",
                        "aria-label": "Text to encrypt",
                        rows: "4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      onClick: encrypt,
                      class: "w-full",
                      "aria-label": "Encrypt text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Encrypt")
                      ]),
                      _: 1
                    }),
                    ciphertext.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Ciphertext")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        "model-value": ciphertext.value,
                        readonly: "",
                        "aria-label": "Encrypted ciphertext",
                        class: "font-mono text-sm",
                        rows: "3"
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
                      createTextVNode("Encrypt")
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
                        createTextVNode("Algorithm")
                      ]),
                      _: 1
                    }),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => algorithm.value = $event,
                      "aria-label": "Encryption algorithm",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    }, [
                      createVNode("option", { value: "AES" }, "AES"),
                      createVNode("option", { value: "DES" }, "DES"),
                      createVNode("option", { value: "TripleDES" }, "TripleDES"),
                      createVNode("option", { value: "Rabbit" }, "Rabbit"),
                      createVNode("option", { value: "RC4" }, "RC4")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, algorithm.value]
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Secret Key")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: secretKey.value,
                      "onUpdate:modelValue": ($event) => secretKey.value = $event,
                      type: "password",
                      placeholder: "Enter secret key...",
                      "aria-label": "Encryption key"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Plaintext")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: plaintext.value,
                      "onUpdate:modelValue": ($event) => plaintext.value = $event,
                      placeholder: "Enter text to encrypt...",
                      "aria-label": "Text to encrypt",
                      rows: "4"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$8), {
                    onClick: encrypt,
                    class: "w-full",
                    "aria-label": "Encrypt text"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Encrypt")
                    ]),
                    _: 1
                  }),
                  ciphertext.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Ciphertext")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      "model-value": ciphertext.value,
                      readonly: "",
                      "aria-label": "Encrypted ciphertext",
                      class: "font-mono text-sm",
                      rows: "3"
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
                        _push4(`Decrypt`);
                      } else {
                        return [
                          createTextVNode("Decrypt")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Decrypt")
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
                        _push4(`Secret Key`);
                      } else {
                        return [
                          createTextVNode("Secret Key")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: decryptKey.value,
                    "onUpdate:modelValue": ($event) => decryptKey.value = $event,
                    type: "password",
                    placeholder: "Enter secret key...",
                    "aria-label": "Decryption key"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ciphertext`);
                      } else {
                        return [
                          createTextVNode("Ciphertext")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    modelValue: decryptText.value,
                    "onUpdate:modelValue": ($event) => decryptText.value = $event,
                    placeholder: "Enter ciphertext to decrypt...",
                    "aria-label": "Ciphertext to decrypt",
                    rows: "4",
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    onClick: decrypt,
                    class: "w-full",
                    "aria-label": "Decrypt text"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Decrypt`);
                      } else {
                        return [
                          createTextVNode("Decrypt")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (decryptResult.value) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Plaintext`);
                        } else {
                          return [
                            createTextVNode("Plaintext")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      "model-value": decryptResult.value,
                      readonly: "",
                      "aria-label": "Decrypted plaintext",
                      rows: "3"
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
                          createTextVNode("Secret Key")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: decryptKey.value,
                        "onUpdate:modelValue": ($event) => decryptKey.value = $event,
                        type: "password",
                        placeholder: "Enter secret key...",
                        "aria-label": "Decryption key"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Ciphertext")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: decryptText.value,
                        "onUpdate:modelValue": ($event) => decryptText.value = $event,
                        placeholder: "Enter ciphertext to decrypt...",
                        "aria-label": "Ciphertext to decrypt",
                        rows: "4",
                        class: "font-mono text-sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      onClick: decrypt,
                      class: "w-full",
                      "aria-label": "Decrypt text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Decrypt")
                      ]),
                      _: 1
                    }),
                    decryptResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Plaintext")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        "model-value": decryptResult.value,
                        readonly: "",
                        "aria-label": "Decrypted plaintext",
                        rows: "3"
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
                      createTextVNode("Decrypt")
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
                        createTextVNode("Secret Key")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: decryptKey.value,
                      "onUpdate:modelValue": ($event) => decryptKey.value = $event,
                      type: "password",
                      placeholder: "Enter secret key...",
                      "aria-label": "Decryption key"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Ciphertext")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: decryptText.value,
                      "onUpdate:modelValue": ($event) => decryptText.value = $event,
                      placeholder: "Enter ciphertext to decrypt...",
                      "aria-label": "Ciphertext to decrypt",
                      rows: "4",
                      class: "font-mono text-sm"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$8), {
                    onClick: decrypt,
                    class: "w-full",
                    "aria-label": "Decrypt text"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Decrypt")
                    ]),
                    _: 1
                  }),
                  decryptResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Plaintext")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      "model-value": decryptResult.value,
                      readonly: "",
                      "aria-label": "Decrypted plaintext",
                      rows: "3"
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
      _push(`</div>`);
      if (error.value) {
        _push(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">${ssrInterpolate(error.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/EncryptionView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
