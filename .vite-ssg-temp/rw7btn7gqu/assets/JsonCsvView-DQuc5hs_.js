import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import Papa from "papaparse";
import { FileJson, FileSpreadsheet, Download } from "lucide-vue-next";
import FileSaver from "file-saver";
import { c as _sfc_main$1 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5, c as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JsonCsvView",
  __ssrInlineRender: true,
  setup(__props) {
    const jsonInput = ref("");
    const csvInput = ref("");
    const error = ref("");
    const convertToCsv = () => {
      error.value = "";
      try {
        const obj = JSON.parse(jsonInput.value);
        const data = Array.isArray(obj) ? obj : [obj];
        csvInput.value = Papa.unparse(data);
      } catch (e) {
        error.value = "Invalid JSON: " + e.message;
      }
    };
    const convertToJson = () => {
      error.value = "";
      try {
        const result = Papa.parse(csvInput.value, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        if (result.errors && result.errors.length > 0) {
          error.value = "CSV Error: " + (result.errors?.[0]?.message || "Unknown error");
          return;
        }
        jsonInput.value = JSON.stringify(result.data, null, 2);
      } catch (e) {
        error.value = "Conversion Error: " + e.message;
      }
    };
    const downloadCsv = () => {
      if (!csvInput.value) return;
      const blob = new Blob([csvInput.value], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, "export.csv");
    };
    const fillSample = () => {
      jsonInput.value = JSON.stringify(
        [
          { name: "John Doe", age: 30, city: "New York" },
          { name: "Jane Smith", age: 25, city: "London" },
          { name: "Bob Johnson", age: 35, city: "Paris" }
        ],
        null,
        2
      );
      convertToCsv();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">JSON &lt;-&gt; CSV Converter</h1>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample JSON data"
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
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileJson), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` JSON (Array) `);
                      } else {
                        return [
                          createVNode(unref(FileJson), { class: "h-4 w-4" }),
                          createTextVNode(" JSON (Array) ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "sm",
                    onClick: convertToCsv,
                    "aria-label": "Convert JSON to CSV"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` To CSV -&gt; `);
                      } else {
                        return [
                          createTextVNode(" To CSV -> ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileJson), { class: "h-4 w-4" }),
                        createTextVNode(" JSON (Array) ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "sm",
                      onClick: convertToCsv,
                      "aria-label": "Convert JSON to CSV"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" To CSV -> ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: '[{"name": "Alice", "age": 25}, ...]'
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: jsonInput.value,
                      "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                      language: "json",
                      class: "h-full",
                      placeholder: '[{"name": "Alice", "age": 25}, ...]'
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "px-6 pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Convert JSON data to CSV format and vice versa. `);
                } else {
                  return [
                    createTextVNode(" Convert JSON data to CSV format and vice versa. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileJson), { class: "h-4 w-4" }),
                      createTextVNode(" JSON (Array) ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), {
                    size: "sm",
                    onClick: convertToCsv,
                    "aria-label": "Convert JSON to CSV"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" To CSV -> ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    language: "json",
                    class: "h-full",
                    placeholder: '[{"name": "Alice", "age": 25}, ...]'
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "px-6 pb-4" }, {
                default: withCtx(() => [
                  createTextVNode(" Convert JSON data to CSV format and vice versa. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileSpreadsheet), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` CSV `);
                      } else {
                        return [
                          createVNode(unref(FileSpreadsheet), { class: "h-4 w-4" }),
                          createTextVNode(" CSV ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "sm",
                    onClick: convertToJson,
                    variant: "secondary",
                    "aria-label": "Convert CSV to JSON"
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
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    size: "icon",
                    variant: "outline",
                    onClick: downloadCsv,
                    disabled: !csvInput.value,
                    "aria-label": "Download CSV file"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileSpreadsheet), { class: "h-4 w-4" }),
                        createTextVNode(" CSV ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$1), {
                        size: "sm",
                        onClick: convertToJson,
                        variant: "secondary",
                        "aria-label": "Convert CSV to JSON"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" <- To JSON ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1), {
                        size: "icon",
                        variant: "outline",
                        onClick: downloadCsv,
                        disabled: !csvInput.value,
                        "aria-label": "Download CSV file"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: csvInput.value,
                    "onUpdate:modelValue": ($event) => csvInput.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "name,age,city..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: csvInput.value,
                      "onUpdate:modelValue": ($event) => csvInput.value = $event,
                      language: "plaintext",
                      class: "h-full",
                      placeholder: "name,age,city..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileSpreadsheet), { class: "h-4 w-4" }),
                      createTextVNode(" CSV ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$1), {
                      size: "sm",
                      onClick: convertToJson,
                      variant: "secondary",
                      "aria-label": "Convert CSV to JSON"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" <- To JSON ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "icon",
                      variant: "outline",
                      onClick: downloadCsv,
                      disabled: !csvInput.value,
                      "aria-label": "Download CSV file"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Download), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: csvInput.value,
                    "onUpdate:modelValue": ($event) => csvInput.value = $event,
                    language: "plaintext",
                    class: "h-full",
                    placeholder: "name,age,city..."
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/JsonCsvView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
