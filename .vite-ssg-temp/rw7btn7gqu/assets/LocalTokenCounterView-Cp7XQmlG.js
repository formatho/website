import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { encode } from "gpt-tokenizer/model/gpt-4o";
import { e as _sfc_main$1, c as _sfc_main$2, _ as _export_sfc } from "../main.mjs";
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
  __name: "LocalTokenCounterView",
  __ssrInlineRender: true,
  setup(__props) {
    const inputText = ref("");
    const tokenCount = computed(() => {
      return encode(inputText.value).length;
    });
    const characterCount = computed(() => {
      return inputText.value.length;
    });
    const wordCount = computed(() => {
      const trimmed = inputText.value.trim();
      if (!trimmed) return 0;
      return trimmed.split(/\s+/).length;
    });
    const clearText = () => {
      inputText.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))} data-v-e65ffe64>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center justify-between" data-v-e65ffe64><h1 class="text-3xl font-bold tracking-tight" data-v-e65ffe64>Local Token Counter</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "outline",
        onClick: clearText,
        disabled: !inputText.value,
        "aria-label": "Clear text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Clear Text `);
          } else {
            return [
              createTextVNode(" Clear Text ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="glass-card p-4 text-center border-l-4 border-primary" data-v-e65ffe64><div class="flex items-center justify-center gap-2 text-sm text-muted-foreground" data-v-e65ffe64><span class="text-xl" data-v-e65ffe64>🔒</span><span class="font-medium" data-v-e65ffe64>Privacy Check:</span><span data-v-e65ffe64>This tool runs 100% in your browser. No data is sent to our servers.</span></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex-1 flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
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
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: inputText.value,
                    "onUpdate:modelValue": ($event) => inputText.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "Paste your text here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: inputText.value,
                      "onUpdate:modelValue": ($event) => inputText.value = $event,
                      language: "plaintext",
                      class: "h-full",
                      placeholder: "Paste your text here..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Input Text")
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
                    class: "h-full",
                    placeholder: "Paste your text here..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-e65ffe64><div class="glass-card p-6 text-center border-2 border-primary/30" data-v-e65ffe64><div class="text-gray-900" data-v-e65ffe64>${ssrInterpolate(tokenCount.value.toLocaleString())}</div><div class="text-sm font-medium text-muted-foreground uppercase tracking-wider" data-v-e65ffe64> Tokens </div></div><div class="glass-card p-6 text-center" data-v-e65ffe64><div class="text-4xl font-bold mb-2" data-v-e65ffe64>${ssrInterpolate(characterCount.value.toLocaleString())}</div><div class="text-sm font-medium text-muted-foreground uppercase tracking-wider" data-v-e65ffe64> Characters </div></div><div class="glass-card p-6 text-center" data-v-e65ffe64><div class="text-4xl font-bold mb-2" data-v-e65ffe64>${ssrInterpolate(wordCount.value.toLocaleString())}</div><div class="text-sm font-medium text-muted-foreground uppercase tracking-wider" data-v-e65ffe64> Words </div></div></div><div class="glass-card p-4" data-v-e65ffe64><div class="flex items-center gap-2 text-sm text-muted-foreground" data-v-e65ffe64><span class="font-medium" data-v-e65ffe64>Model:</span><span class="font-mono bg-muted px-2 py-1 rounded" data-v-e65ffe64>GPT-4o (o200k_base encoding)</span></div></div><div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border" data-v-e65ffe64><h2 class="text-xl font-bold mb-4" data-v-e65ffe64>Related Tools</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-e65ffe64><a href="/tools/text-statistics" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-e65ffe64><h3 class="font-semibold mb-2" data-v-e65ffe64>Text Statistics</h3><p class="text-sm text-muted-foreground" data-v-e65ffe64>Analyze text with detailed statistics including reading time</p></a><a href="/tools/json-viewer" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-e65ffe64><h3 class="font-semibold mb-2" data-v-e65ffe64>JSON Formatter</h3><p class="text-sm text-muted-foreground" data-v-e65ffe64>Format, validate, and minify JSON data</p></a><a href="/tools/case-converter" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all" data-v-e65ffe64><h3 class="font-semibold mb-2" data-v-e65ffe64>Text Transform</h3><p class="text-sm text-muted-foreground" data-v-e65ffe64>Convert text case, encoding, and format</p></a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/LocalTokenCounterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LocalTokenCounterView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e65ffe64"]]);
export {
  LocalTokenCounterView as default
};
