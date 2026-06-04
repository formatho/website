import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import yaml__default from "js-yaml";
import { FileJson, FileType } from "lucide-vue-next";
import { e as _sfc_main$1, c as _sfc_main$2 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JsonYamlView",
  __ssrInlineRender: true,
  setup(__props) {
    const jsonInput = ref("");
    const yamlInput = ref("");
    const error = ref("");
    const convertToYaml = () => {
      error.value = "";
      try {
        const obj = JSON.parse(jsonInput.value);
        yamlInput.value = yaml__default.dump(obj);
      } catch (e) {
        error.value = "Invalid JSON: " + e.message;
      }
    };
    const convertToJson = () => {
      error.value = "";
      try {
        const obj = yaml__default.load(yamlInput.value);
        jsonInput.value = JSON.stringify(obj, null, 2);
      } catch (e) {
        error.value = "Invalid YAML: " + e.message;
      }
    };
    const fillSample = () => {
      jsonInput.value = JSON.stringify(
        {
          name: "DevTools",
          version: 1,
          features: ["markdown", "json", "yaml"]
        },
        null,
        2
      );
      convertToYaml();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">JSON &lt;-&gt; YAML Converter</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample JSON/YAML data"
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileJson), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` JSON `);
                      } else {
                        return [
                          createVNode(unref(FileJson), { class: "h-4 w-4" }),
                          createTextVNode(" JSON ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    size: "sm",
                    onClick: convertToYaml,
                    "aria-label": "Convert JSON to YAML"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` To YAML -&gt; `);
                      } else {
                        return [
                          createTextVNode(" To YAML -> ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileJson), { class: "h-4 w-4" }),
                        createTextVNode(" JSON ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), {
                      size: "sm",
                      onClick: convertToYaml,
                      "aria-label": "Convert JSON to YAML"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" To YAML -> ")
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
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: '{"key": "value"}'
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: jsonInput.value,
                      "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                      language: "json",
                      class: "h-full",
                      placeholder: '{"key": "value"}'
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileJson), { class: "h-4 w-4" }),
                      createTextVNode(" JSON ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), {
                    size: "sm",
                    onClick: convertToYaml,
                    "aria-label": "Convert JSON to YAML"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" To YAML -> ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: '{"key": "value"}'
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileType), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` YAML `);
                      } else {
                        return [
                          createVNode(unref(FileType), { class: "h-4 w-4" }),
                          createTextVNode(" YAML ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    size: "sm",
                    onClick: convertToJson,
                    variant: "secondary",
                    "aria-label": "Convert YAML to JSON"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` &lt;- To JSON `);
                      } else {
                        return [
                          createTextVNode(" <- To JSON ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileType), { class: "h-4 w-4" }),
                        createTextVNode(" YAML ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), {
                      size: "sm",
                      onClick: convertToJson,
                      variant: "secondary",
                      "aria-label": "Convert YAML to JSON"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" <- To JSON ")
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
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "h-full",
                    placeholder: "key: value"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: yamlInput.value,
                      "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                      language: "yaml",
                      class: "h-full",
                      placeholder: "key: value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileType), { class: "h-4 w-4" }),
                      createTextVNode(" YAML ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), {
                    size: "sm",
                    onClick: convertToJson,
                    variant: "secondary",
                    "aria-label": "Convert YAML to JSON"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" <- To JSON ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: yamlInput.value,
                    "onUpdate:modelValue": ($event) => yamlInput.value = $event,
                    language: "yaml",
                    class: "h-full",
                    placeholder: "key: value"
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
      _push(`<div class="mt-8 p-6 bg-muted/20 rounded-lg border border-border"><h2 class="text-xl font-bold mb-4">Related Tools</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><a href="/tools/json-viewer" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">JSON Viewer</h3><p class="text-sm text-muted-foreground">Format and validate JSON data</p></a><a href="/tools/yaml-viewer" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">YAML Viewer</h3><p class="text-sm text-muted-foreground">Format and validate YAML data</p></a><a href="/tools/json-minify" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">JSON Minify</h3><p class="text-sm text-muted-foreground">Reduce JSON file size</p></a><a href="/tools/json-csv" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">JSON to CSV</h3><p class="text-sm text-muted-foreground">Convert JSON to CSV format</p></a><a href="/tools/xml-json" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">JSON to XML</h3><p class="text-sm text-muted-foreground">Convert JSON to XML format</p></a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonYamlView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
