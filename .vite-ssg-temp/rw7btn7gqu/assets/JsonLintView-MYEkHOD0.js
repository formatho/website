import { defineComponent, onMounted, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, useSSRContext, watch, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { Trash2, Check, AlertCircle, Copy } from "lucide-vue-next";
import { c as _sfc_main$2, h as _sfc_main$3 } from "../main.mjs";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToolPageLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: { default: "" },
    placeholder: { default: "Enter your content here..." }
  },
  emits: ["input", "clear"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    onMounted(() => {
      const existingLd = document.getElementById("tool-json-ld");
      if (existingLd) existingLd.remove();
      const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: props.title,
        description: props.description || `${props.title} - Free online privacy-first developer tool by Formatho`,
        url: `https://formatho.com/tools${window.location.pathname}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        creator: {
          "@type": "Organization",
          name: "Formatho",
          url: "https://formatho.com"
        }
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "tool-json-ld";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    const emit = __emit;
    const inputValue = ref("");
    const outputValue = ref("");
    const error = ref("");
    const isCopied = ref(false);
    const isValid = ref(false);
    const inputStateClass = computed(() => {
      if (error.value) return "border-destructive focus:ring-destructive";
      if (isValid.value) return "border-success focus:ring-success";
      return "border-border focus:ring-primary";
    });
    const handleInput = (value) => {
      inputValue.value = value;
      error.value = "";
      emit("input", value);
    };
    const handleClear = () => {
      inputValue.value = "";
      outputValue.value = "";
      error.value = "";
      isValid.value = false;
      emit("clear");
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(outputValue.value);
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };
    __expose({
      setInput: (value) => {
        inputValue.value = value;
      },
      setOutput: (value) => {
        outputValue.value = value;
      },
      setError: (message) => {
        error.value = message;
        isValid.value = false;
      },
      setValid: () => {
        error.value = "";
        isValid.value = true;
      },
      reset: () => {
        handleClear();
      },
      getInput: () => inputValue.value,
      getOutput: () => outputValue.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><div class="border-b border-border/50 bg-muted/30"><div class="container mx-auto px-4 py-8"><div class="max-w-6xl mx-auto"><div class="flex items-start justify-between"><div class="space-y-2"><h1 class="text-3xl md:text-4xl font-bold gradient-text">${ssrInterpolate(__props.title)}</h1>`);
      if (__props.description) {
        _push(`<p class="text-muted-foreground text-sm md:text-base">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (inputValue.value || outputValue.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "ghost",
          size: "sm",
          onClick: handleClear,
          class: "flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive",
          "aria-label": "Clear all input and output"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span class="hidden sm:inline"${_scopeId}>Clear</span>`);
            } else {
              return [
                createVNode(unref(Trash2), { class: "w-4 h-4" }),
                createVNode("span", { class: "hidden sm:inline" }, "Clear")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="container mx-auto px-4 py-8"><div class="max-w-6xl mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="flex flex-col space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold flex items-center gap-2"><span>Input</span>`);
      if (isValid.value) {
        _push(`<span class="flex items-center gap-1 text-xs text-success">`);
        _push(ssrRenderComponent(unref(Check), { class: "w-3 h-3" }, null, _parent));
        _push(` Valid </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2>`);
      if (inputValue.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "ghost",
          size: "sm",
          onClick: handleClear,
          class: "h-8 px-2",
          "aria-label": "Clear input"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Trash2), { class: "w-4 h-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        modelValue: inputValue.value,
        "onUpdate:modelValue": ($event) => inputValue.value = $event,
        placeholder: __props.placeholder,
        class: ["min-h-[400px] font-mono text-sm resize-none custom-scrollbar", inputStateClass.value],
        onInput: ($event) => handleInput($event.target.value)
      }, null, _parent));
      _push(`</div>`);
      if (error.value) {
        _push(`<div class="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">`);
        _push(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }, null, _parent));
        _push(`<div class="flex-1"><p class="text-sm font-semibold text-destructive">Error</p><p class="text-sm text-destructive/90 mt-1">${ssrInterpolate(error.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between text-xs text-muted-foreground"><span>${ssrInterpolate(inputValue.value.length)} characters</span><span>${ssrInterpolate(inputValue.value.split("\n").length)} lines</span></div></div><div class="flex flex-col space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Output</h2>`);
      if (outputValue.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "outline",
          size: "sm",
          onClick: handleCopy,
          class: "h-8 flex items-center gap-2",
          "aria-label": "Copy output to clipboard"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!isCopied.value) {
                _push2(ssrRenderComponent(unref(Copy), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Check), { class: "w-4 h-4 text-success" }, null, _parent2, _scopeId));
              }
              _push2(`<span class="hidden sm:inline"${_scopeId}>${ssrInterpolate(isCopied.value ? "Copied!" : "Copy")}</span>`);
            } else {
              return [
                !isCopied.value ? (openBlock(), createBlock(unref(Copy), {
                  key: 0,
                  class: "w-4 h-4"
                })) : (openBlock(), createBlock(unref(Check), {
                  key: 1,
                  class: "w-4 h-4 text-success"
                })),
                createVNode("span", { class: "hidden sm:inline" }, toDisplayString(isCopied.value ? "Copied!" : "Copy"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative flex-1 min-h-[400px]"><div class="${ssrRenderClass([{ "bg-muted/30": !outputValue.value }, "w-full h-full p-4 font-mono text-sm bg-card/50 border border-border rounded-lg custom-scrollbar overflow-auto"])}">`);
      if (outputValue.value) {
        _push(`<pre class="whitespace-pre-wrap break-all">${ssrInterpolate(outputValue.value)}</pre>`);
      } else {
        _push(`<p class="text-muted-foreground/50 italic">Output will appear here...</p>`);
      }
      _push(`</div></div><div class="flex items-center justify-between text-xs text-muted-foreground"><span>${ssrInterpolate(outputValue.value.length)} characters</span><span>${ssrInterpolate(outputValue.value.split("\n").length)} lines</span></div></div></div>`);
      if (_ctx.$slots.options) {
        _push(`<div class="mt-8 pt-8 border-t border-border">`);
        ssrRenderSlot(_ctx.$slots, "options", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.content) {
        _push(`<div class="mt-8">`);
        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg"><svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><div><p class="text-sm font-semibold text-green-800 dark:text-green-300">100% Client-Side Processing</p><p class="text-xs text-green-700 dark:text-green-400/70">Your data never leaves your browser. Zero server processing, zero tracking.</p></div></div><div class="mt-8"><h3 class="text-lg font-bold mb-4">Related Tools</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-3">`);
      ssrRenderSlot(_ctx.$slots, "related-tools", {}, () => {
        _push(`<div class="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-center"><p class="text-xs text-muted-foreground">Add related tools via slot</p></div>`);
      }, _push, _parent);
      _push(`</div></div><div class="mt-12 rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 md:p-8"><div class="flex flex-col md:flex-row items-center gap-6"><div class="flex-1 text-center md:text-left"><h3 class="text-xl font-bold mb-2">🤖 Give Your AI Agents Persistent Memory</h3><p class="text-muted-foreground text-sm"> Your agents forget tasks between sessions. Agent Todo gives them a persistent task queue with REST API, priority management, and agent identity tracking. Free forever for solo developers. </p></div><a href="https://todo.formatho.com" target="blank" rel="noopener" class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"> Try Agent Todo Free → </a></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ToolPageLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JsonLintView",
  __ssrInlineRender: true,
  setup(__props) {
    const toolLayout = ref();
    const input = ref("");
    let output = "";
    const processJson = (value) => {
      if (!value.trim()) {
        toolLayout.value?.setOutput("");
        toolLayout.value?.setValid();
        return;
      }
      try {
        const parsed = JSON.parse(value);
        output = JSON.stringify(parsed, null, 2);
        toolLayout.value?.setOutput(output);
        toolLayout.value?.setValid();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
        toolLayout.value?.setError(errorMessage);
        toolLayout.value?.setOutput("");
      }
    };
    watch(input, (newValue) => {
      processJson(newValue);
    });
    const handleInput = (value) => {
      input.value = value;
    };
    const fillSample = () => {
      const sample = '{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York"}}';
      input.value = sample;
      processJson(sample);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        ref_key: "toolLayout",
        ref: toolLayout,
        title: "JSON Linter",
        description: "Validate, format, and beautify your JSON code instantly. Detect and fix syntax errors with real-time validation.",
        placeholder: "Paste or type your JSON here...",
        onInput: handleInput,
        onClear: () => {
          input.value = "";
        }
      }, _attrs), {
        options: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              onClick: fillSample,
              class: "gap-2",
              "aria-label": "Load sample JSON"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Load Sample JSON `);
                } else {
                  return [
                    createTextVNode(" Load Sample JSON ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Features</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="p-4 glass-card"${_scopeId}><div class="text-gray-900"${_scopeId}>Real-time Validation</div><p class="text-sm text-muted-foreground"${_scopeId}> Instantly detects and highlights JSON syntax errors as you type. </p></div><div class="p-4 glass-card"${_scopeId}><div class="text-gray-900"${_scopeId}>Format &amp; Beautify</div><p class="text-sm text-muted-foreground"${_scopeId}> Automatically formats your JSON with proper indentation. </p></div><div class="p-4 glass-card"${_scopeId}><div class="text-gray-900"${_scopeId}>100% Client-Side</div><p class="text-sm text-muted-foreground"${_scopeId}> Your JSON never leaves your browser. Complete privacy. </p></div></div></div><div class="space-y-3"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Common Use Cases</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div class="p-4 border border-border rounded-lg"${_scopeId}><div class="font-mono text-sm mb-2 text-muted-foreground"${_scopeId}>// API Response</div><pre class="text-xs bg-muted p-3 rounded overflow-x-auto"${_scopeId}><code${_scopeId}>{
  &quot;status&quot;: &quot;success&quot;,
  &quot;data&quot;: {...}
}</code></pre></div><div class="p-4 border border-border rounded-lg"${_scopeId}><div class="font-mono text-sm mb-2 text-muted-foreground"${_scopeId}>// Configuration</div><pre class="text-xs bg-muted p-3 rounded overflow-x-auto"${_scopeId}><code${_scopeId}>{
  &quot;app&quot;: {
    &quot;name&quot;: &quot;MyApp&quot;,
    &quot;version&quot;: &quot;1.0.0&quot;
  }
}</code></pre></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", null, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    onClick: fillSample,
                    class: "gap-2",
                    "aria-label": "Load sample JSON"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Load Sample JSON ")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold" }, "Features"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "p-4 glass-card" }, [
                      createVNode("div", { class: "text-gray-900" }, "Real-time Validation"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Instantly detects and highlights JSON syntax errors as you type. ")
                    ]),
                    createVNode("div", { class: "p-4 glass-card" }, [
                      createVNode("div", { class: "text-gray-900" }, "Format & Beautify"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Automatically formats your JSON with proper indentation. ")
                    ]),
                    createVNode("div", { class: "p-4 glass-card" }, [
                      createVNode("div", { class: "text-gray-900" }, "100% Client-Side"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Your JSON never leaves your browser. Complete privacy. ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("h3", { class: "text-lg font-semibold" }, "Common Use Cases"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "p-4 border border-border rounded-lg" }, [
                      createVNode("div", { class: "font-mono text-sm mb-2 text-muted-foreground" }, "// API Response"),
                      createVNode("pre", { class: "text-xs bg-muted p-3 rounded overflow-x-auto" }, [
                        createVNode("code", null, '{\n  "status": "success",\n  "data": {...}\n}')
                      ])
                    ]),
                    createVNode("div", { class: "p-4 border border-border rounded-lg" }, [
                      createVNode("div", { class: "font-mono text-sm mb-2 text-muted-foreground" }, "// Configuration"),
                      createVNode("pre", { class: "text-xs bg-muted p-3 rounded overflow-x-auto" }, [
                        createVNode("code", null, '{\n  "app": {\n    "name": "MyApp",\n    "version": "1.0.0"\n  }\n}')
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonLintView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
