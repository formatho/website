import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
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
  __name: "NumeronymGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputWord = ref("");
    const numeronyms = computed(() => {
      if (!inputWord.value) return [];
      const word = inputWord.value.trim();
      if (word.length < 4) return [{ original: word, numeronym: word }];
      const first = word[0] ?? "";
      const last = word[word.length - 1] ?? "";
      const middle = word.length - 2;
      return [
        {
          original: word,
          numeronym: `${first}${middle}${last}`
        }
      ];
    });
    const commonNumeronyms = [
      { numeronym: "i18n", meaning: "internationalization" },
      { numeronym: "l10n", meaning: "localization" },
      { numeronym: "k8s", meaning: "Kubernetes" },
      { numeronym: "a11y", meaning: "accessibility" },
      { numeronym: "w3c", meaning: "World Wide Web Consortium" },
      { numeronym: "c4s", meaning: "Content for Scale" },
      { numeronym: "d11n", meaning: "digitalization" },
      { numeronym: "v12n", meaning: "virtualization" },
      { numeronym: "p13n", meaning: "personalization" },
      { numeronym: "o11y", meaning: "observability" },
      { numeronym: "k9s", meaning: "Kubernetes CLI" },
      { numeronym: "g11n", meaning: "globalization" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Numeronym Generator</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Generate Numeronym`);
                      } else {
                        return [
                          createTextVNode("Generate Numeronym")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Generate Numeronym")
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
                        _push4(`Input Word`);
                      } else {
                        return [
                          createTextVNode("Input Word")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: inputWord.value,
                    "onUpdate:modelValue": ($event) => inputWord.value = $event,
                    placeholder: "Enter a word (e.g., internationalization)",
                    "aria-label": "Word to convert to numeronym"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Input Word")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: inputWord.value,
                        "onUpdate:modelValue": ($event) => inputWord.value = $event,
                        placeholder: "Enter a word (e.g., internationalization)",
                        "aria-label": "Word to convert to numeronym"
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
                      createTextVNode("Generate Numeronym")
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
                        createTextVNode("Input Word")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: inputWord.value,
                      "onUpdate:modelValue": ($event) => inputWord.value = $event,
                      placeholder: "Enter a word (e.g., internationalization)",
                      "aria-label": "Word to convert to numeronym"
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
      if (numeronyms.value.length > 0 && numeronyms.value[0]) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Original</div><div class="text-3xl font-bold"${_scopeId2}>${ssrInterpolate(numeronyms.value[0].original)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Original"),
                      createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(numeronyms.value[0].original), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Original"),
                    createVNode("div", { class: "text-3xl font-bold" }, toDisplayString(numeronyms.value[0].original), 1)
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
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Numeronym</div><div class="text-gray-900"${_scopeId2}>${ssrInterpolate(numeronyms.value[0].numeronym)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Numeronym"),
                      createVNode("div", { class: "text-gray-900" }, toDisplayString(numeronyms.value[0].numeronym), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "pt-6 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm text-muted-foreground" }, "Numeronym"),
                    createVNode("div", { class: "text-gray-900" }, toDisplayString(numeronyms.value[0].numeronym), 1)
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Common Numeronyms`);
                      } else {
                        return [
                          createTextVNode("Common Numeronyms")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Common Numeronyms")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(commonNumeronyms, (item) => {
                    _push3(`<div class="p-3 rounded bg-muted flex justify-between items-center"${_scopeId2}><span class="text-gray-900"${_scopeId2}>${ssrInterpolate(item.numeronym)}</span><span class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.meaning)}</span></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(commonNumeronyms, (item) => {
                        return createVNode("div", {
                          key: item.numeronym,
                          class: "p-3 rounded bg-muted flex justify-between items-center"
                        }, [
                          createVNode("span", { class: "text-gray-900" }, toDisplayString(item.numeronym), 1),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(item.meaning), 1)
                        ]);
                      }), 64))
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
                      createTextVNode("Common Numeronyms")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(commonNumeronyms, (item) => {
                      return createVNode("div", {
                        key: item.numeronym,
                        class: "p-3 rounded bg-muted flex justify-between items-center"
                      }, [
                        createVNode("span", { class: "text-gray-900" }, toDisplayString(item.numeronym), 1),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(item.meaning), 1)
                      ]);
                    }), 64))
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/NumeronymGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
