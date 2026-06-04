import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$4, h as _sfc_main$6 } from "../main.mjs";
import { FileJson, Copy } from "lucide-vue-next";
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
  __name: "XmlJsonConverter",
  __ssrInlineRender: true,
  setup(__props) {
    const DOMParser = window.DOMParser;
    const xmlInput = ref("");
    const jsonInput = ref("");
    const error = ref("");
    const xmlToJson = (xml) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      const parseNode = (node) => {
        const obj = {};
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          return text || null;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node;
          if (element.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let i = 0; i < element.attributes.length; i++) {
              const attr = element.attributes[i];
              if (attr) {
                obj["@attributes"][attr.name] = attr.value;
              }
            }
          }
          const childNodes = Array.from(element.childNodes).filter(
            (n) => n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
          );
          if (childNodes.length === 0) {
            return obj["@attributes"] || "";
          }
          const firstChild = childNodes[0];
          if (childNodes.length === 1 && firstChild?.nodeType === Node.TEXT_NODE) {
            return firstChild.textContent?.trim() || "";
          }
          for (const child of childNodes) {
            if (child.nodeType === Node.ELEMENT_NODE) {
              const childElement = child;
              const childName = childElement.nodeName;
              const childValue = parseNode(child);
              if (obj[childName] !== void 0) {
                if (!Array.isArray(obj[childName])) {
                  obj[childName] = [obj[childName]];
                }
                obj[childName].push(childValue);
              } else {
                obj[childName] = childValue;
              }
            }
          }
        }
        return obj;
      };
      const result = parseNode(doc.documentElement);
      return { [doc.documentElement.nodeName]: result };
    };
    const jsonToXml = (json) => {
      const buildXml = (obj, tagName = "root") => {
        if (obj === null || obj === void 0) return "";
        let xml = "";
        if (Array.isArray(obj)) {
          for (const item of obj) {
            xml += `  <${tagName}>${buildXml(item, "item")}</${tagName}>`;
          }
          return xml;
        }
        for (const [key, value] of Object.entries(obj)) {
          if (key === "@attributes") {
            for (const [attrName, attrValue] of Object.entries(value)) {
              xml += ` ${attrName}="${attrValue}"`;
            }
            continue;
          }
          const isObject = typeof value === "object" && value !== null && !Array.isArray(value);
          const isArray = Array.isArray(value);
          if (isArray) {
            xml += `
  <${key}>`;
            for (const item of value) {
              xml += `
    <item>${buildXml(item)}</item>`;
            }
            xml += `
  </${key}>`;
          } else if (isObject) {
            xml += `
  <${key}>${buildXml(value, "item")}</${key}>`;
          } else if (value !== null && value !== void 0) {
            xml += `
  <${key}>${value}</${key}>`;
          }
        }
        return xml;
      };
      return `<?xml version="1.0" encoding="UTF-8"?>
${buildXml(json)}`;
    };
    const detectAndAutoConvert = (content, targetFormat) => {
      if (!content.trim()) return false;
      if (targetFormat === "json") {
        try {
          const parser = new DOMParser();
          parser.parseFromString(content, "text/xml");
          return true;
        } catch {
          return false;
        }
      }
      if (targetFormat === "xml") {
        try {
          JSON.parse(content);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    };
    const handleXmlInput = (event) => {
      const textarea = event.target;
      const content = textarea.value;
      if (detectAndAutoConvert(content, "xml")) {
        try {
          const jsonObj = JSON.parse(content);
          const xml = jsonToXml(jsonObj);
          xmlInput.value = xml;
          jsonInput.value = JSON.stringify(jsonObj, null, 2);
          error.value = "Auto-converted JSON to XML";
          setTimeout(() => {
            error.value = "";
          }, 2e3);
        } catch (e) {
          error.value = "Invalid JSON format for auto-conversion";
        }
      }
    };
    const handleJsonInput = (event) => {
      const textarea = event.target;
      const content = textarea.value;
      if (detectAndAutoConvert(content, "json")) {
        try {
          const parsed = xmlToJson(content);
          jsonInput.value = JSON.stringify(parsed, null, 2);
          xmlInput.value = content;
          error.value = "Auto-converted XML to JSON";
          setTimeout(() => {
            error.value = "";
          }, 2e3);
        } catch (e) {
          error.value = "Invalid XML format for auto-conversion";
        }
      }
    };
    const convertXmlToJson = () => {
      error.value = "";
      try {
        if (!xmlInput.value.trim()) {
          jsonInput.value = "";
          return;
        }
        const parsed = xmlToJson(xmlInput.value);
        jsonInput.value = JSON.stringify(parsed, null, 2);
      } catch (e) {
        error.value = e.message || "Invalid XML format";
        jsonInput.value = "";
      }
    };
    const convertJsonToXml = () => {
      error.value = "";
      try {
        if (!jsonInput.value.trim()) {
          xmlInput.value = "";
          return;
        }
        const jsonObj = JSON.parse(jsonInput.value);
        xmlInput.value = jsonToXml(jsonObj);
      } catch (e) {
        error.value = e.message || "Invalid JSON format";
        xmlInput.value = "";
      }
    };
    const copyXmlToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(xmlInput.value);
        error.value = "";
      } catch (e) {
        error.value = "Failed to copy XML to clipboard";
      }
    };
    const copyJsonToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(jsonInput.value);
        error.value = "";
      } catch (e) {
        error.value = "Failed to copy JSON to clipboard";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">XML :left_right_arrow: JSON Converter</h1></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileJson), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` XML Input `);
                      } else {
                        return [
                          createVNode(unref(FileJson), { class: "h-4 w-4" }),
                          createTextVNode(" XML Input ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    size: "sm",
                    onClick: convertXmlToJson,
                    "aria-label": "Convert XML to JSON",
                    class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` To JSON → `);
                      } else {
                        return [
                          createTextVNode(" To JSON → ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    size: "icon",
                    variant: "outline",
                    onClick: copyXmlToClipboard,
                    class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileJson), { class: "h-4 w-4" }),
                        createTextVNode(" XML Input ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$4), {
                        size: "sm",
                        onClick: convertXmlToJson,
                        "aria-label": "Convert XML to JSON",
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" To JSON → ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), {
                        size: "icon",
                        variant: "outline",
                        onClick: copyXmlToClipboard,
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: xmlInput.value,
                    "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                    onInput: handleXmlInput,
                    class: "h-full resize-none font-mono",
                    placeholder: "Enter XML...\n<root>\n<name>Formatho</name>\n</root>"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      modelValue: xmlInput.value,
                      "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                      onInput: handleXmlInput,
                      class: "h-full resize-none font-mono",
                      placeholder: "Enter XML...\n<root>\n<name>Formatho</name>\n</root>"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileJson), { class: "h-4 w-4" }),
                      createTextVNode(" XML Input ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$4), {
                      size: "sm",
                      onClick: convertXmlToJson,
                      "aria-label": "Convert XML to JSON",
                      class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" To JSON → ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), {
                      size: "icon",
                      variant: "outline",
                      onClick: copyXmlToClipboard,
                      class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), {
                    modelValue: xmlInput.value,
                    "onUpdate:modelValue": ($event) => xmlInput.value = $event,
                    onInput: handleXmlInput,
                    class: "h-full resize-none font-mono",
                    placeholder: "Enter XML...\n<root>\n<name>Formatho</name>\n</root>"
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileJson), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` JSON Output `);
                      } else {
                        return [
                          createVNode(unref(FileJson), { class: "h-4 w-4" }),
                          createTextVNode(" JSON Output ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    size: "sm",
                    variant: "secondary",
                    onClick: convertJsonToXml,
                    "aria-label": "Convert JSON to XML",
                    class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` ← To XML `);
                      } else {
                        return [
                          createTextVNode(" ← To XML ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    size: "icon",
                    variant: "outline",
                    onClick: copyJsonToClipboard,
                    "aria-label": "Copy JSON to clipboard",
                    class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg",
                    disabled: !jsonInput.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileJson), { class: "h-4 w-4" }),
                        createTextVNode(" JSON Output ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$4), {
                        size: "sm",
                        variant: "secondary",
                        onClick: convertJsonToXml,
                        "aria-label": "Convert JSON to XML",
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" ← To XML ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), {
                        size: "icon",
                        variant: "outline",
                        onClick: copyJsonToClipboard,
                        "aria-label": "Copy JSON to clipboard",
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg",
                        disabled: !jsonInput.value
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "h-4 w-4" })
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
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    onInput: handleJsonInput,
                    class: "h-full resize-none font-mono",
                    placeholder: "JSON output will appear here..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      modelValue: jsonInput.value,
                      "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                      onInput: handleJsonInput,
                      class: "h-full resize-none font-mono",
                      placeholder: "JSON output will appear here..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(FileJson), { class: "h-4 w-4" }),
                      createTextVNode(" JSON Output ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$4), {
                      size: "sm",
                      variant: "secondary",
                      onClick: convertJsonToXml,
                      "aria-label": "Convert JSON to XML",
                      class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" ← To XML ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), {
                      size: "icon",
                      variant: "outline",
                      onClick: copyJsonToClipboard,
                      "aria-label": "Copy JSON to clipboard",
                      class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg",
                      disabled: !jsonInput.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), {
                    modelValue: jsonInput.value,
                    "onUpdate:modelValue": ($event) => jsonInput.value = $event,
                    onInput: handleJsonInput,
                    class: "h-full resize-none font-mono",
                    placeholder: "JSON output will appear here..."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/tools/XmlJsonConverter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
