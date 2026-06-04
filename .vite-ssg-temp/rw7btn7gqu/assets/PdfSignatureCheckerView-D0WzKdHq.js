import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { c as _sfc_main$5 } from "../main.mjs";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "PdfSignatureCheckerView",
  __ssrInlineRender: true,
  setup(__props) {
    const file = ref(null);
    const signatures = ref([]);
    const loading = ref(false);
    const error = ref("");
    const handleFileUpload = async (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        file.value = target.files[0];
        await checkSignatures();
      }
    };
    const checkSignatures = async () => {
      if (!file.value) return;
      loading.value = true;
      error.value = "";
      signatures.value = [];
      try {
        const arrayBuffer = await file.value.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const decoder = new TextDecoder("latin1");
        const content = decoder.decode(bytes);
        const sigRegex = /\/Type\s*\/Sig[^]*?\/Name\s*\(([^)]*)\)[^]*?\/Date\s*\(([^)]*)\)/gi;
        let match;
        while ((match = sigRegex.exec(content)) !== null) {
          signatures.value.push({
            name: match[1] || "Unknown",
            date: match[2] || "Unknown",
            reason: "",
            location: "",
            valid: null
            // Would need proper crypto validation
          });
        }
        if (signatures.value.length === 0 && content.includes("/Sig")) {
          signatures.value.push({
            name: "Signature Present",
            date: "Details not extractable",
            reason: "PDF contains digital signature(s)",
            location: "",
            valid: null
          });
        }
        if (signatures.value.length === 0) {
          error.value = "No digital signatures found in this PDF";
        }
      } catch (e) {
        error.value = "Failed to read PDF file";
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">PDF Signature Checker</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Check PDF Signatures`);
                      } else {
                        return [
                          createTextVNode("Check PDF Signatures")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Check PDF Signatures")
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
                  _push3(`<div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"${_scopeId2}><input type="file" accept=".pdf" class="hidden" id="pdf-upload"${_scopeId2}><label for="pdf-upload" class="cursor-pointer"${_scopeId2}><div class="text-muted-foreground mb-2"${_scopeId2}>Click to upload PDF or drag and drop</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    as: "span",
                    "aria-label": "Select PDF file for signature check"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Select PDF File`);
                      } else {
                        return [
                          createTextVNode("Select PDF File")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</label></div>`);
                  if (file.value) {
                    _push3(`<div class="text-sm text-muted-foreground"${_scopeId2}> File: ${ssrInterpolate(file.value.name)} (${ssrInterpolate((file.value.size / 1024).toFixed(2))} KB) </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (loading.value) {
                    _push3(`<div class="text-center py-4"${_scopeId2}>Checking signatures...</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (error.value) {
                    _push3(`<div class="p-4 text-sm text-orange-600 bg-orange-500/10 rounded-md"${_scopeId2}>${ssrInterpolate(error.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (signatures.value.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}><h3 class="font-semibold"${_scopeId2}>Signatures Found (${ssrInterpolate(signatures.value.length)})</h3><!--[-->`);
                    ssrRenderList(signatures.value, (sig, index) => {
                      _push3(`<div class="p-4 rounded-lg bg-muted"${_scopeId2}><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Name:</span> ${ssrInterpolate(sig.name)}</div><div${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Date:</span> ${ssrInterpolate(sig.date)}</div>`);
                      if (sig.reason) {
                        _push3(`<div class="col-span-2"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Reason:</span> ${ssrInterpolate(sig.reason)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center" }, [
                      createVNode("input", {
                        type: "file",
                        accept: ".pdf",
                        onChange: handleFileUpload,
                        class: "hidden",
                        id: "pdf-upload"
                      }, null, 32),
                      createVNode("label", {
                        for: "pdf-upload",
                        class: "cursor-pointer"
                      }, [
                        createVNode("div", { class: "text-muted-foreground mb-2" }, "Click to upload PDF or drag and drop"),
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          as: "span",
                          "aria-label": "Select PDF file for signature check"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Select PDF File")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    file.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-muted-foreground"
                    }, " File: " + toDisplayString(file.value.name) + " (" + toDisplayString((file.value.size / 1024).toFixed(2)) + " KB) ", 1)) : createCommentVNode("", true),
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-4"
                    }, "Checking signatures...")) : createCommentVNode("", true),
                    error.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "p-4 text-sm text-orange-600 bg-orange-500/10 rounded-md"
                    }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                    signatures.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "space-y-3"
                    }, [
                      createVNode("h3", { class: "font-semibold" }, "Signatures Found (" + toDisplayString(signatures.value.length) + ")", 1),
                      (openBlock(true), createBlock(Fragment, null, renderList(signatures.value, (sig, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "p-4 rounded-lg bg-muted"
                        }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            createVNode("div", null, [
                              createVNode("span", { class: "text-muted-foreground" }, "Name:"),
                              createTextVNode(" " + toDisplayString(sig.name), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("span", { class: "text-muted-foreground" }, "Date:"),
                              createTextVNode(" " + toDisplayString(sig.date), 1)
                            ]),
                            sig.reason ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "col-span-2"
                            }, [
                              createVNode("span", { class: "text-muted-foreground" }, "Reason:"),
                              createTextVNode(" " + toDisplayString(sig.reason), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
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
                      createTextVNode("Check PDF Signatures")
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
                      accept: ".pdf",
                      onChange: handleFileUpload,
                      class: "hidden",
                      id: "pdf-upload"
                    }, null, 32),
                    createVNode("label", {
                      for: "pdf-upload",
                      class: "cursor-pointer"
                    }, [
                      createVNode("div", { class: "text-muted-foreground mb-2" }, "Click to upload PDF or drag and drop"),
                      createVNode(unref(_sfc_main$5), {
                        variant: "outline",
                        as: "span",
                        "aria-label": "Select PDF file for signature check"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Select PDF File")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  file.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-sm text-muted-foreground"
                  }, " File: " + toDisplayString(file.value.name) + " (" + toDisplayString((file.value.size / 1024).toFixed(2)) + " KB) ", 1)) : createCommentVNode("", true),
                  loading.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-4"
                  }, "Checking signatures...")) : createCommentVNode("", true),
                  error.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "p-4 text-sm text-orange-600 bg-orange-500/10 rounded-md"
                  }, toDisplayString(error.value), 1)) : createCommentVNode("", true),
                  signatures.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "space-y-3"
                  }, [
                    createVNode("h3", { class: "font-semibold" }, "Signatures Found (" + toDisplayString(signatures.value.length) + ")", 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(signatures.value, (sig, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "p-4 rounded-lg bg-muted"
                      }, [
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "text-muted-foreground" }, "Name:"),
                            createTextVNode(" " + toDisplayString(sig.name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "text-muted-foreground" }, "Date:"),
                            createTextVNode(" " + toDisplayString(sig.date), 1)
                          ]),
                          sig.reason ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-span-2"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Reason:"),
                            createTextVNode(" " + toDisplayString(sig.reason), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PdfSignatureCheckerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
