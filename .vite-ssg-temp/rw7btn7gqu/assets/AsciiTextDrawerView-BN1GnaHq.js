import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$6, c as _sfc_main$7 } from "../main.mjs";
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
  __name: "AsciiTextDrawerView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const font = ref("standard");
    const asciiFonts = {
      standard: {
        A: "  █████  \n ██   ██ \n ███████ \n ██   ██ \n ██   ██ ",
        B: " ██████  \n ██   ██ \n ██████  \n ██   ██ \n ██████  ",
        C: "  ██████ \n ██      \n ██      \n ██      \n  ██████ ",
        D: " ██████  \n ██   ██ \n ██   ██ \n ██   ██ \n ██████  ",
        E: " ███████ \n ██      \n █████   \n ██      \n ███████ ",
        H: " ██   ██ \n ██   ██ \n ███████ \n ██   ██ \n ██   ██ ",
        I: " ██ \n ██ \n ██ \n ██ \n ██ ",
        L: " ██      \n ██      \n ██      \n ██      \n ███████ ",
        M: " ███   ███ \n ████ ████ \n ██ ███ ██ \n ██     ██ \n ██     ██ ",
        N: " ███    ██ \n ████   ██ \n ██ ██  ██ \n ██  ██ ██ \n ██   ████ ",
        O: "  █████  \n ██   ██ \n ██   ██ \n ██   ██ \n  █████  ",
        R: " ██████  \n ██   ██ \n ██████  \n ██ ██   \n ██  ██  ",
        S: " ███████ \n ██      \n ███████ \n      ██ \n ███████ ",
        T: " ███████ \n   ██   \n   ██   \n   ██   \n   ██   ",
        W: " ██     ██ \n ██     ██ \n ██  █  ██ \n ██ ███ ██ \n  ██ █ ██  ",
        Y: " ██    ██ \n  ██  ██  \n   ████   \n    ██    \n    ██    ",
        " ": "   \n   \n   \n   \n   "
      }
    };
    const generateAscii = () => {
      if (!inputText.value) return;
      const chars = inputText.value.toUpperCase().split("");
      const lines = ["", "", "", "", ""];
      for (const char of chars) {
        const fontMap = asciiFonts[font.value] ?? asciiFonts.standard;
        const art = fontMap?.[char] ?? "";
        const charLines = art.split("\n");
        for (let i = 0; i < 5; i++) {
          lines[i] += (charLines[i] || "").padEnd(10);
        }
      }
      return lines.join("\n");
    };
    const copyAscii = () => {
      const ascii = generateAscii();
      if (ascii) {
        navigator.clipboard.writeText(ascii);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">ASCII Text Drawer</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate ASCII Art Text`);
                      } else {
                        return [
                          createTextVNode("Generate ASCII Art Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate ASCII Art Text")
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
                        _push4(`Text`);
                      } else {
                        return [
                          createTextVNode("Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    placeholder: "Enter text...",
                    maxlength: "20",
                    "aria-label": "Text to convert to ASCII"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    onClick: generateAscii,
                    "aria-label": "Generate ASCII art"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate`);
                      } else {
                        return [
                          createTextVNode("Generate")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    variant: "outline",
                    onClick: copyAscii,
                    "aria-label": "Copy ASCII art"
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
                          createTextVNode("Text")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: inputText.value,
                        "onUpdate:modelValue": ($event) => inputText.value = $event,
                        placeholder: "Enter text...",
                        maxlength: "20",
                        "aria-label": "Text to convert to ASCII"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$7), {
                        onClick: generateAscii,
                        "aria-label": "Generate ASCII art"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Generate")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        onClick: copyAscii,
                        "aria-label": "Copy ASCII art"
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
                      createTextVNode("Generate ASCII Art Text")
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
                        createTextVNode("Text")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      placeholder: "Enter text...",
                      maxlength: "20",
                      "aria-label": "Text to convert to ASCII"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$7), {
                      onClick: generateAscii,
                      "aria-label": "Generate ASCII art"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Generate")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      variant: "outline",
                      onClick: copyAscii,
                      "aria-label": "Copy ASCII art"
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
      if (inputText.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0 flex-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`ASCII Art`);
                        } else {
                          return [
                            createTextVNode("ASCII Art")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("ASCII Art")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-auto" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<pre class="text-xs md:text-sm font-mono bg-muted p-4 rounded-lg whitespace-pre"${_scopeId2}>${ssrInterpolate(generateAscii())}</pre>`);
                  } else {
                    return [
                      createVNode("pre", { class: "text-xs md:text-sm font-mono bg-muted p-4 rounded-lg whitespace-pre" }, toDisplayString(generateAscii()), 1)
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
                        createTextVNode("ASCII Art")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-auto" }, {
                  default: withCtx(() => [
                    createVNode("pre", { class: "text-xs md:text-sm font-mono bg-muted p-4 rounded-lg whitespace-pre" }, toDisplayString(generateAscii()), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AsciiTextDrawerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
