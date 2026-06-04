import { defineComponent, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { FileType, Upload } from "lucide-vue-next";
import { c as _sfc_main$1 } from "../main.mjs";
import { _ as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "BpmnView",
  __ssrInlineRender: true,
  setup(__props) {
    const file = ref(null);
    const bpmnXml = ref("");
    const error = ref("");
    const isExporting = ref(false);
    const viewerContainer = ref(null);
    let viewer = null;
    const formatSize = (bytes) => {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const handleFileUpload = (e) => {
      const target = e.target;
      const selected = target.files?.[0];
      if (!selected) return;
      if (!selected.name.endsWith(".bpmn") && !selected.name.endsWith(".xml")) {
        error.value = "Please upload a valid BPMN file (.bpmn or .xml)";
        return;
      }
      file.value = selected;
      error.value = "";
      const reader = new FileReader();
      reader.onload = async (e2) => {
        const content = e2.target?.result;
        bpmnXml.value = content;
        await renderBpmn(content);
      };
      reader.onerror = () => {
        error.value = "Failed to read file";
      };
      reader.readAsText(selected);
    };
    const renderBpmn = async (xml) => {
      if (!viewerContainer.value) return;
      try {
        if (!viewer) {
          const BpmnViewer = (await import("bpmn-js/lib/Viewer.js")).default;
          viewer = new BpmnViewer({
            container: viewerContainer.value,
            width: "100%",
            height: "100%"
          });
        }
        await viewer.importXML(xml);
        const canvas = viewer.get("canvas");
        canvas.zoom("fit-viewport");
        error.value = "";
      } catch (err) {
        error.value = `Failed to render BPMN: ${err.message || "Invalid BPMN file"}`;
        console.error("BPMN rendering error:", err);
      }
    };
    const handleExportPDF = async () => {
      if (!viewerContainer.value || !viewer) return;
      isExporting.value = true;
      try {
        const uniqueId = Date.now().toString(36);
        const baseFilename = file.value?.name.replace(/\.(bpmn|xml)$/, "") || "bpmn-diagram";
        const pdfFilename = `formatho.com-${baseFilename}-${uniqueId}.pdf`;
        const { svg } = await viewer.saveSVG();
        const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load SVG"));
          img.src = url;
        });
        const width = img.naturalWidth || 800;
        const height = img.naturalHeight || 600;
        const canvas = document.createElement("canvas");
        const scale = 2;
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Could not get canvas context");
        }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = await import("jspdf");
        const isPortrait = height > width;
        const pdf = new jsPDF({
          orientation: isPortrait ? "portrait" : "landscape",
          unit: "px",
          format: [width, height]
        });
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(pdfFilename);
      } catch (error2) {
        console.error("PDF Export failed", error2);
      } finally {
        isExporting.value = false;
      }
    };
    const resetViewer = () => {
      file.value = null;
      bpmnXml.value = "";
      error.value = "";
      if (viewer) {
        viewer.clear();
      }
    };
    onMounted(() => {
    });
    onUnmounted(() => {
      if (viewer) {
        viewer.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">BPMN Viewer</h1>`);
      if (file.value) {
        _push(`<div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: handleExportPDF,
          disabled: isExporting.value,
          variant: "secondary",
          size: "sm",
          "aria-label": "Export BPMN as PDF"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(FileType), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(isExporting.value ? "Exporting..." : "Export PDF")}`);
            } else {
              return [
                createVNode(unref(FileType), { class: "mr-2 h-4 w-4" }),
                createTextVNode(" " + toDisplayString(isExporting.value ? "Exporting..." : "Export PDF"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          onClick: resetViewer,
          variant: "outline",
          size: "sm",
          "aria-label": "Load new BPMN file"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` New File `);
            } else {
              return [
                createTextVNode(" New File ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!file.value) {
        _push(`<div class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-card text-card-foreground p-8"><div class="flex flex-col items-center gap-4 text-center max-w-sm"><div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(Upload), { class: "h-8 w-8 text-muted-foreground" }, null, _parent));
        _push(`</div><div class="space-y-1"><h3 class="font-semibold text-lg">Upload a BPMN file</h3><p class="text-sm text-muted-foreground"> Upload a BPMN 2.0 XML file to visualize and export as PDF </p></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          class: "w-full relative",
          "aria-label": "Select BPMN file"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Select BPMN File <input type="file" accept=".bpmn,.xml" class="absolute inset-0 opacity-0 cursor-pointer"${_scopeId}>`);
            } else {
              return [
                createTextVNode(" Select BPMN File "),
                createVNode("input", {
                  type: "file",
                  accept: ".bpmn,.xml",
                  class: "absolute inset-0 opacity-0 cursor-pointer",
                  onChange: handleFileUpload
                }, null, 32)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="flex-1 flex flex-col gap-4 min-h-0">`);
        _push(ssrRenderComponent(unref(_sfc_main$2), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "py-3 flex items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-3"${_scopeId2}><div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(FileType), { class: "text-gray-900" }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><p class="font-medium text-sm"${_scopeId2}>${ssrInterpolate(file.value.name)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(formatSize(file.value.size))}</p></div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "ghost",
                      size: "sm",
                      class: "relative",
                      "aria-label": "Change BPMN file"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Change File <input type="file" accept=".bpmn,.xml" class="absolute inset-0 opacity-0 cursor-pointer"${_scopeId3}>`);
                        } else {
                          return [
                            createTextVNode(" Change File "),
                            createVNode("input", {
                              type: "file",
                              accept: ".bpmn,.xml",
                              class: "absolute inset-0 opacity-0 cursor-pointer",
                              onChange: handleFileUpload
                            }, null, 32)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                          createVNode(unref(FileType), { class: "text-gray-900" })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium text-sm" }, toDisplayString(file.value.name), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatSize(file.value.size)), 1)
                        ])
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        variant: "ghost",
                        size: "sm",
                        class: "relative",
                        "aria-label": "Change BPMN file"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Change File "),
                          createVNode("input", {
                            type: "file",
                            accept: ".bpmn,.xml",
                            class: "absolute inset-0 opacity-0 cursor-pointer",
                            onChange: handleFileUpload
                          }, null, 32)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$3), { class: "py-3 flex items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                        createVNode(unref(FileType), { class: "text-gray-900" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-sm" }, toDisplayString(file.value.name), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatSize(file.value.size)), 1)
                      ])
                    ]),
                    createVNode(unref(_sfc_main$1), {
                      variant: "ghost",
                      size: "sm",
                      class: "relative",
                      "aria-label": "Change BPMN file"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Change File "),
                        createVNode("input", {
                          type: "file",
                          accept: ".bpmn,.xml",
                          class: "absolute inset-0 opacity-0 cursor-pointer",
                          onChange: handleFileUpload
                        }, null, 32)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (error.value) {
          _push(ssrRenderComponent(unref(_sfc_main$2), { class: "border-destructive" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "py-3" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(error.value)}</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "text-sm text-destructive" }, toDisplayString(error.value), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$3), { class: "py-3" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-sm text-destructive" }, toDisplayString(error.value), 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-1 min-h-0 overflow-hidden" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Diagram Preview`);
                        } else {
                          return [
                            createTextVNode("Diagram Preview")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "text-sm" }, {
                        default: withCtx(() => [
                          createTextVNode("Diagram Preview")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "h-full p-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-full h-full bg-background"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        ref_key: "viewerContainer",
                        ref: viewerContainer,
                        class: "w-full h-full bg-background"
                      }, null, 512)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "py-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode("Diagram Preview")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$3), { class: "h-full p-0" }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      ref_key: "viewerContainer",
                      ref: viewerContainer,
                      class: "w-full h-full bg-background"
                    }, null, 512)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BpmnView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
