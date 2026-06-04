import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { c as _sfc_main$5 } from "../main.mjs";
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
  __name: "XmlFormatterView",
  __ssrInlineRender: true,
  setup(__props) {
    const xmlInput = ref("");
    const formattedOutput = ref("");
    const error = ref("");
    const indentSize = ref(2);
    const formatXml = () => {
      try {
        error.value = "";
        if (!xmlInput.value.trim()) {
          formattedOutput.value = "";
          return;
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlInput.value, "text/xml");
        const errorNode = doc.querySelector("parsererror");
        if (errorNode) {
          error.value = "Invalid XML";
          formattedOutput.value = "";
          return;
        }
        const serialize = (node, indent) => {
          const indentStr = " ".repeat(indent);
          let result = "";
          if (node.nodeType === Node.DOCUMENT_NODE) {
            for (const child of Array.from(node.childNodes)) {
              result += serialize(child, indent);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            const children = Array.from(element.childNodes).filter(
              (n) => n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
            );
            result += `${indentStr}<${element.tagName}`;
            for (let i = 0; i < element.attributes.length; i++) {
              const attr = element.attributes[i];
              if (attr) {
                result += ` ${attr.name}="${attr.value}"`;
              }
            }
            if (children.length === 0) {
              result += "/>\n";
            } else if (children.length === 1 && children[0]?.nodeType === Node.TEXT_NODE) {
              const child = children[0];
              result += `>${child?.textContent?.trim() ?? ""}</${element.tagName}>
`;
            } else {
              result += ">\n";
              for (const child of children) {
                result += serialize(child, indent + indentSize.value);
              }
              result += `${indentStr}</${element.tagName}>
`;
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text) {
              result += `${indentStr}${text}
`;
            }
          }
          return result;
        };
        formattedOutput.value = serialize(doc, 0);
      } catch (e) {
        error.value = e.message || "Failed to format XML";
        formattedOutput.value = "";
      }
    };
    const copyOutput = () => {
      navigator.clipboard.writeText(formattedOutput.value);
    };
    watch([xmlInput, indentSize], formatXml);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">XML Formatter</h1></div><div class="flex items-center gap-4"><label class="flex items-center gap-2 text-sm"> Indent: <input${ssrRenderAttr("value", indentSize.value)} type="number" min="1" max="8" class="w-16 h-10 rounded-md border border-input bg-background px-3 py-2"> spaces </label></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input XML`);
                      } else {
                        return [
                          createTextVNode("Input XML")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Input XML")
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
                    modelValue: xmlInput.value,
                    "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                    language: "xml",
                    class: "h-full",
                    placeholder: "Enter XML to format..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: xmlInput.value,
                      "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                      language: "xml",
                      class: "h-full",
                      placeholder: "Enter XML to format..."
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
                      createTextVNode("Input XML")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: xmlInput.value,
                    "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                    language: "xml",
                    class: "h-full",
                    placeholder: "Enter XML to format..."
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Formatted XML`);
                      } else {
                        return [
                          createTextVNode("Formatted XML")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !formattedOutput.value,
                    "aria-label": "Copy formatted XML"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` &gt;Copy`);
                      } else {
                        return [
                          createTextVNode(" >Copy")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Formatted XML")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyOutput,
                      disabled: !formattedOutput.value,
                      "aria-label": "Copy formatted XML"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" >Copy")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    "model-value": formattedOutput.value,
                    language: "xml",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Formatted XML will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      "model-value": formattedOutput.value,
                      language: "xml",
                      readonly: "",
                      class: "h-full",
                      placeholder: "Formatted XML will appear here..."
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Formatted XML")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), {
                    variant: "outline",
                    size: "sm",
                    onClick: copyOutput,
                    disabled: !formattedOutput.value,
                    "aria-label": "Copy formatted XML"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" >Copy")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    "model-value": formattedOutput.value,
                    language: "xml",
                    readonly: "",
                    class: "h-full",
                    placeholder: "Formatted XML will appear here..."
                  }, null, 8, ["model-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/XmlFormatterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
