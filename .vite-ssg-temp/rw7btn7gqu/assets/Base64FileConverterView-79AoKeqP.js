import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$6 } from "./Label-Bp2OSpkW.js";
import { c as _sfc_main$5 } from "../main.mjs";
import "radix-vue";
import "class-variance-authority";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "lucide-vue-next";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
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
  __name: "Base64FileConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const fileInput = ref(null);
    const base64Output = ref("");
    const error = ref("");
    const fileName = ref("");
    const handleFileUpload = async (event) => {
      const target = event.target;
      error.value = "";
      base64Output.value = "";
      if (target.files && target.files[0]) {
        const file = target.files[0];
        fileInput.value = file;
        fileName.value = file.name;
        await convertToBase64();
      }
    };
    const convertToBase64 = async () => {
      if (!fileInput.value) return;
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          base64Output.value = result.split(",")[1] ?? "";
        };
        reader.onerror = () => {
          error.value = "Failed to read file";
        };
        reader.readAsDataURL(fileInput.value);
      } catch (e) {
        error.value = "Failed to convert file to Base64";
      }
    };
    const copyToClipboard = () => {
      navigator.clipboard.writeText(base64Output.value);
    };
    const downloadAsText = () => {
      const blob = new Blob([base64Output.value], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.value}.base64.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Base64 File Converter</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Convert File to Base64`);
                      } else {
                        return [
                          createTextVNode("Convert File to Base64")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Convert File to Base64")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"${_scopeId2}><input type="file" class="hidden" id="file-upload"${_scopeId2}><label for="file-upload" class="cursor-pointer"${_scopeId2}><div class="text-muted-foreground mb-2"${_scopeId2}>Click to select a file</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    as: "span",
                    "aria-label": "Select file to convert"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Select File`);
                      } else {
                        return [
                          createTextVNode("Select File")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</label></div>`);
                  if (fileName.value) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}>Selected: ${ssrInterpolate(fileName.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (error.value) {
                    _push3(`<div class="p-4 text-sm text-destructive bg-destructive/10 rounded-md"${_scopeId2}>${ssrInterpolate(error.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (base64Output.value) {
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="flex justify-between items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
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
                    _push3(`<div class="flex gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: copyToClipboard,
                      "aria-label": "Copy Base64 output"
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
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: downloadAsText,
                      "aria-label": "Download as text file"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Download`);
                        } else {
                          return [
                            createTextVNode("Download")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                    _push3(ssrRenderComponent(CodeEditor, {
                      "model-value": base64Output.value,
                      language: "plaintext",
                      readonly: "",
                      class: "min-h-[250px]"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}> Size: ${ssrInterpolate((base64Output.value.length / 1024).toFixed(2))} KB </div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center" }, [
                      createVNode("input", {
                        type: "file",
                        onChange: handleFileUpload,
                        class: "hidden",
                        id: "file-upload"
                      }, null, 32),
                      createVNode("label", {
                        for: "file-upload",
                        class: "cursor-pointer"
                      }, [
                        createVNode("div", { class: "text-muted-foreground mb-2" }, "Click to select a file"),
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          as: "span",
                          "aria-label": "Select file to convert"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Select File")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    fileName.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-muted-foreground"
                    }, "Selected: " + toDisplayString(fileName.value), 1)) : createCommentVNode("", true),
                    error.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-4 text-sm text-destructive bg-destructive/10 rounded-md"
                    }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                    base64Output.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-3"
                    }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Base64 Output")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(_sfc_main$5), {
                            variant: "outline",
                            size: "sm",
                            onClick: copyToClipboard,
                            "aria-label": "Copy Base64 output"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Copy")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            variant: "outline",
                            size: "sm",
                            onClick: downloadAsText,
                            "aria-label": "Download as text file"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Download")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(CodeEditor, {
                        "model-value": base64Output.value,
                        language: "plaintext",
                        readonly: "",
                        class: "min-h-[250px]"
                      }, null, 8, ["model-value"]),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, " Size: " + toDisplayString((base64Output.value.length / 1024).toFixed(2)) + " KB ", 1)
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Convert File to Base64")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center" }, [
                    createVNode("input", {
                      type: "file",
                      onChange: handleFileUpload,
                      class: "hidden",
                      id: "file-upload"
                    }, null, 32),
                    createVNode("label", {
                      for: "file-upload",
                      class: "cursor-pointer"
                    }, [
                      createVNode("div", { class: "text-muted-foreground mb-2" }, "Click to select a file"),
                      createVNode(unref(_sfc_main$5), {
                        variant: "outline",
                        as: "span",
                        "aria-label": "Select file to convert"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Select File")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  fileName.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-sm text-muted-foreground"
                  }, "Selected: " + toDisplayString(fileName.value), 1)) : createCommentVNode("", true),
                  error.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-4 text-sm text-destructive bg-destructive/10 rounded-md"
                  }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                  base64Output.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-3"
                  }, [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode("Base64 Output")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          size: "sm",
                          onClick: copyToClipboard,
                          "aria-label": "Copy Base64 output"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Copy")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          size: "sm",
                          onClick: downloadAsText,
                          "aria-label": "Download as text file"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Download")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode(CodeEditor, {
                      "model-value": base64Output.value,
                      language: "plaintext",
                      readonly: "",
                      class: "min-h-[250px]"
                    }, null, 8, ["model-value"]),
                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Size: " + toDisplayString((base64Output.value.length / 1024).toFixed(2)) + " KB ", 1)
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Base64FileConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
