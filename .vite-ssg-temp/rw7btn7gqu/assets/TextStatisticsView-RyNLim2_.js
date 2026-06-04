import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import "../main.mjs";
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
  __name: "TextStatisticsView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const stats = computed(() => {
      const text = inputText.value;
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, "").length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
      const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
      const lines = text.split("\n").length;
      const wordList = text.trim() ? text.trim().split(/\s+/) : [];
      const totalWordLength = wordList.reduce((sum, word) => sum + word.length, 0);
      const averageWordLength = words > 0 ? totalWordLength / words : 0;
      const averageSentenceLength = sentences > 0 ? words / sentences : 0;
      const readingTime = Math.ceil(words / 200);
      const speakingTime = Math.ceil(words / 150);
      return {
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        lines,
        averageWordLength,
        averageSentenceLength,
        readingTime,
        speakingTime
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Text Statistics</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input Text`);
                      } else {
                        return [
                          createTextVNode("Input Text")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input Text")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "Enter or paste text here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      language: "plaintext",
                      class: "h-full",
                      placeholder: "Enter or paste text here..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("Input Text")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "Enter or paste text here..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`Statistics`);
                      } else {
                        return [
                          createTextVNode("Statistics")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Statistics")
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
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Characters</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.characters.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Characters (no spaces)</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.charactersNoSpaces.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Words</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.words.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Sentences</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.sentences.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Paragraphs</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.paragraphs.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Lines</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.lines.toLocaleString())}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Avg Word Length</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.averageWordLength.toFixed(1))}</div></div><div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Avg Sentence Length</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.averageSentenceLength.toFixed(1))} words </div></div><div class="p-4 rounded-lg bg-muted col-span-2"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Reading Time</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.readingTime)} min</div></div><div class="p-4 rounded-lg bg-muted col-span-2"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}>Speaking Time</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(stats.value.speakingTime)} min</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Characters"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.characters.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Characters (no spaces)"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.charactersNoSpaces.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Words"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.words.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Sentences"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.sentences.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Paragraphs"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.paragraphs.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Lines"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.lines.toLocaleString()), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Avg Word Length"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.averageWordLength.toFixed(1)), 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Avg Sentence Length"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.averageSentenceLength.toFixed(1)) + " words ", 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted col-span-2" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Reading Time"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.readingTime) + " min", 1)
                      ]),
                      createVNode("div", { class: "p-4 rounded-lg bg-muted col-span-2" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, "Speaking Time"),
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.speakingTime) + " min", 1)
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
                      createTextVNode("Statistics")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Characters"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.characters.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Characters (no spaces)"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.charactersNoSpaces.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Words"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.words.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Sentences"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.sentences.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Paragraphs"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.paragraphs.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Lines"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.lines.toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Avg Word Length"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.averageWordLength.toFixed(1)), 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Avg Sentence Length"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.averageSentenceLength.toFixed(1)) + " words ", 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted col-span-2" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Reading Time"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.readingTime) + " min", 1)
                    ]),
                    createVNode("div", { class: "p-4 rounded-lg bg-muted col-span-2" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Speaking Time"),
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(stats.value.speakingTime) + " min", 1)
                    ])
                  ])
                ]),
                _: 2
              }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TextStatisticsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
