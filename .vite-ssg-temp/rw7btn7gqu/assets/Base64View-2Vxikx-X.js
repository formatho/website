import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { f as useTwins, e as _sfc_main$1, c as _sfc_main$2 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "Base64View",
  __ssrInlineRender: true,
  setup(__props) {
    const { summonTwin } = useTwins();
    const inputText = ref("");
    const base64Text = ref("");
    const error = ref("");
    const fillSample = () => {
      inputText.value = "Hello World";
      encodeToBase64();
    };
    const encodeToBase64 = () => {
      try {
        base64Text.value = btoa(inputText.value);
        error.value = "";
        if (inputText.value) {
          summonTwin("memo", "Data parsed and secured.", "base64-encode-success", {
            x: "right",
            y: "bottom"
          });
        }
      } catch (e) {
      }
    };
    const decodeFromBase64 = () => {
      try {
        inputText.value = atob(base64Text.value);
        error.value = "";
        summonTwin("memo", "Data parsed and secured.", "base64-decode-success", {
          x: "right",
          y: "bottom"
        });
      } catch (e) {
        error.value = "Invalid Base64";
      }
    };
    watch(inputText, encodeToBase64);
    watch(base64Text, decodeFromBase64);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Base64 Encoder/Decoder</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample Base64 data"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Load Sample`);
          } else {
            return [
              createTextVNode("Load Sample")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Plain Text`);
                      } else {
                        return [
                          createTextVNode("Plain Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Plain Text")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      language: "plaintext",
                      "min-height": "200px",
                      "line-numbers": "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Plain Text")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Base64 Output`);
                      } else {
                        return [
                          createTextVNode("Base64 Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Base64 Output")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: base64Text.value,
                    "onUpdate:modelValue": ($event) => base64Text.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: base64Text.value,
                      "onUpdate:modelValue": ($event) => base64Text.value = $event,
                      language: "plaintext",
                      "min-height": "200px",
                      "line-numbers": "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Base64 Output")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: base64Text.value,
                    "onUpdate:modelValue": ($event) => base64Text.value = $event,
                    language: "plaintext",
                    "min-height": "200px",
                    "line-numbers": "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(`<div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border"><h2 class="text-xl font-bold mb-4">Related Tools</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><a href="/tools/hash-text" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">Hash Generator</h3><p class="text-sm text-muted-foreground">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p></a><a href="/tools/encryption" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">Text Encryption</h3><p class="text-sm text-muted-foreground">Encrypt and decrypt text with various algorithms</p></a><a href="/tools/jwt" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">JWT Debugger</h3><p class="text-sm text-muted-foreground">Decode and inspect JWT tokens</p></a><a href="/tools/token-generator" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">Token Generator</h3><p class="text-sm text-muted-foreground">Generate secure random tokens</p></a><a href="/tools/base64-file-converter" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">Base64 File Converter</h3><p class="text-sm text-muted-foreground">Encode/decode files to/from Base64</p></a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Base64View.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
