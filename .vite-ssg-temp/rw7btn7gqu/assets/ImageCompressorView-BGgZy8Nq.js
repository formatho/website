import { defineComponent, computed, unref, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext, ref, createTextVNode, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Upload, Download } from "lucide-vue-next";
import { g as cn, f as useTwins, c as _sfc_main$2, _ as _export_sfc } from "../main.mjs";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
import { useForwardPropsEmits, SliderRoot, SliderRange, SliderThumb } from "radix-vue";
import { _ as _sfc_main$7 } from "./Label-Bp2OSpkW.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
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
  __name: "Slider",
  __ssrInlineRender: true,
  props: {
    name: {},
    defaultValue: {},
    modelValue: {},
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    inverted: { type: Boolean },
    min: {},
    max: {},
    step: {},
    minStepsBetweenThumbs: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue", "valueCommit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SliderRoot), mergeProps({
        class: unref(cn)("relative flex w-full touch-none select-none items-center", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SliderRange), { class: "absolute h-full bg-primary" }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(__props.modelValue, (_2, key) => {
              _push2(ssrRenderComponent(unref(SliderThumb), {
                key,
                class: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(unref(SliderRange), { class: "absolute h-full bg-primary" }),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.modelValue, (_2, key) => {
                return openBlock(), createBlock(unref(SliderThumb), {
                  key,
                  class: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                });
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/slider/Slider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageCompressorView",
  __ssrInlineRender: true,
  setup(__props) {
    const { summonTwin } = useTwins();
    const file = ref(null);
    const previewUrl = ref("");
    const compressedUrl = ref("");
    const quality = ref([0.8]);
    const scale = ref([100]);
    const originalSize = ref(0);
    const compressedSize = ref(0);
    const isProcessing = ref(false);
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
      file.value = selected;
      originalSize.value = selected.size;
      previewUrl.value = URL.createObjectURL(selected);
      processImage();
    };
    const processImage = () => {
      if (!file.value) return;
      isProcessing.value = true;
      const img = new Image();
      img.src = previewUrl.value;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const s = scale.value?.[0] ?? 100;
        const q = quality.value?.[0] ?? 0.8;
        const width = img.width * (s / 100);
        const height = img.height * (s / 100);
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            if (compressedUrl.value) URL.revokeObjectURL(compressedUrl.value);
            compressedUrl.value = URL.createObjectURL(blob);
            compressedSize.value = blob.size;
            isProcessing.value = false;
            summonTwin("flowtho", "Process flows perfectly. Optimization complete.", "image-compress-success", {
              x: "right",
              y: "bottom"
            });
          },
          file.value?.type || "image/jpeg",
          q
        );
      };
    };
    const downloadCompressed = () => {
      if (!compressedUrl.value) return;
      const link = document.createElement("a");
      link.href = compressedUrl.value;
      link.download = `compressed_${file.value?.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const compressionRatio = computed(() => {
      if (originalSize.value === 0 || compressedSize.value === 0) return 0;
      return Math.round((1 - compressedSize.value / originalSize.value) * 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))} data-v-34ce7e04><div class="flex items-center justify-between" data-v-34ce7e04><h1 class="text-3xl font-bold tracking-tight" data-v-34ce7e04>Image Compressor</h1></div>`);
      if (!file.value) {
        _push(`<div class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-card text-card-foreground p-8" data-v-34ce7e04><div class="flex flex-col items-center gap-4 text-center max-w-sm" data-v-34ce7e04><div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center" data-v-34ce7e04>`);
        _push(ssrRenderComponent(unref(Upload), { class: "h-8 w-8 text-muted-foreground" }, null, _parent));
        _push(`</div><div class="space-y-1" data-v-34ce7e04><h3 class="font-semibold text-lg" data-v-34ce7e04>Upload an image</h3><p class="text-sm text-muted-foreground" data-v-34ce7e04>Drag and drop or click to upload</p></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          class: "w-full relative",
          "aria-label": "Select image file to compress"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Select File <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" data-v-34ce7e04${_scopeId}>`);
            } else {
              return [
                createTextVNode(" Select File "),
                createVNode("input", {
                  type: "file",
                  accept: "image/*",
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
        _push(`<div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0" data-v-34ce7e04>`);
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col h-full lg:col-span-1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Settings`);
                        } else {
                          return [
                            createTextVNode("Settings")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Settings")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "grid gap-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid gap-4" data-v-34ce7e04${_scopeId2}><div class="flex items-center justify-between" data-v-34ce7e04${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Quality`);
                        } else {
                          return [
                            createTextVNode("Quality")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-muted-foreground" data-v-34ce7e04${_scopeId2}>${ssrInterpolate(Math.round((quality.value?.[0] ?? 0.8) * 100))}%</span></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      modelValue: quality.value,
                      "onUpdate:modelValue": [($event) => quality.value = $event, processImage],
                      min: 0.1,
                      max: 1,
                      step: 0.1
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="grid gap-4" data-v-34ce7e04${_scopeId2}><div class="flex items-center justify-between" data-v-34ce7e04${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Scale (Resize)`);
                        } else {
                          return [
                            createTextVNode("Scale (Resize)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-muted-foreground" data-v-34ce7e04${_scopeId2}>${ssrInterpolate(scale.value?.[0] ?? 100)}%</span></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      modelValue: scale.value,
                      "onUpdate:modelValue": [($event) => scale.value = $event, processImage],
                      min: 10,
                      max: 100,
                      step: 10
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="rounded-lg bg-muted p-4 space-y-3 mt-4" data-v-34ce7e04${_scopeId2}><div class="flex justify-between text-sm" data-v-34ce7e04${_scopeId2}><span class="text-muted-foreground" data-v-34ce7e04${_scopeId2}>Original</span><span class="font-mono" data-v-34ce7e04${_scopeId2}>${ssrInterpolate(formatSize(originalSize.value))}</span></div><div class="flex justify-between text-sm" data-v-34ce7e04${_scopeId2}><span class="text-muted-foreground" data-v-34ce7e04${_scopeId2}>Compressed</span><span class="font-mono font-bold text-success" data-v-34ce7e04${_scopeId2}>${ssrInterpolate(formatSize(compressedSize.value))}</span></div><div class="flex justify-between text-sm border-t border-border/50 pt-2" data-v-34ce7e04${_scopeId2}><span class="text-muted-foreground" data-v-34ce7e04${_scopeId2}>Savings</span><span class="font-mono font-bold" data-v-34ce7e04${_scopeId2}>${ssrInterpolate(compressionRatio.value)}%</span></div></div><div class="flex flex-col gap-2" data-v-34ce7e04${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      onClick: downloadCompressed,
                      loading: isProcessing.value,
                      class: "w-full",
                      "aria-label": "Download compressed image"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Download), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Download `);
                        } else {
                          return [
                            createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Download ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      variant: "outline",
                      class: "w-full relative",
                      "aria-label": "Select new image"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` New Image <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" data-v-34ce7e04${_scopeId3}>`);
                        } else {
                          return [
                            createTextVNode(" New Image "),
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              class: "absolute inset-0 opacity-0 cursor-pointer",
                              onChange: handleFileUpload
                            }, null, 32)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid gap-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Quality")
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(Math.round((quality.value?.[0] ?? 0.8) * 100)) + "%", 1)
                        ]),
                        createVNode(unref(_sfc_main$1), {
                          modelValue: quality.value,
                          "onUpdate:modelValue": [($event) => quality.value = $event, processImage],
                          min: 0.1,
                          max: 1,
                          step: 0.1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid gap-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Scale (Resize)")
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(scale.value?.[0] ?? 100) + "%", 1)
                        ]),
                        createVNode(unref(_sfc_main$1), {
                          modelValue: scale.value,
                          "onUpdate:modelValue": [($event) => scale.value = $event, processImage],
                          min: 10,
                          max: 100,
                          step: 10
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "rounded-lg bg-muted p-4 space-y-3 mt-4" }, [
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Original"),
                          createVNode("span", { class: "font-mono" }, toDisplayString(formatSize(originalSize.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Compressed"),
                          createVNode("span", { class: "font-mono font-bold text-success" }, toDisplayString(formatSize(compressedSize.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm border-t border-border/50 pt-2" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Savings"),
                          createVNode("span", { class: "font-mono font-bold" }, toDisplayString(compressionRatio.value) + "%", 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode(unref(_sfc_main$2), {
                          onClick: downloadCompressed,
                          loading: isProcessing.value,
                          class: "w-full",
                          "aria-label": "Download compressed image"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Download ")
                          ]),
                          _: 1
                        }, 8, ["loading"]),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          class: "w-full relative",
                          "aria-label": "Select new image"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" New Image "),
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              class: "absolute inset-0 opacity-0 cursor-pointer",
                              onChange: handleFileUpload
                            }, null, 32)
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createTextVNode("Settings")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$6), { class: "grid gap-8" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Quality")
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(Math.round((quality.value?.[0] ?? 0.8) * 100)) + "%", 1)
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        modelValue: quality.value,
                        "onUpdate:modelValue": [($event) => quality.value = $event, processImage],
                        min: 0.1,
                        max: 1,
                        step: 0.1
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Scale (Resize)")
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(scale.value?.[0] ?? 100) + "%", 1)
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        modelValue: scale.value,
                        "onUpdate:modelValue": [($event) => scale.value = $event, processImage],
                        min: 10,
                        max: 100,
                        step: 10
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "rounded-lg bg-muted p-4 space-y-3 mt-4" }, [
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Original"),
                        createVNode("span", { class: "font-mono" }, toDisplayString(formatSize(originalSize.value)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Compressed"),
                        createVNode("span", { class: "font-mono font-bold text-success" }, toDisplayString(formatSize(compressedSize.value)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm border-t border-border/50 pt-2" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Savings"),
                        createVNode("span", { class: "font-mono font-bold" }, toDisplayString(compressionRatio.value) + "%", 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(unref(_sfc_main$2), {
                        onClick: downloadCompressed,
                        loading: isProcessing.value,
                        class: "w-full",
                        "aria-label": "Download compressed image"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Download ")
                        ]),
                        _: 1
                      }, 8, ["loading"]),
                      createVNode(unref(_sfc_main$2), {
                        variant: "outline",
                        class: "w-full relative",
                        "aria-label": "Select new image"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" New Image "),
                          createVNode("input", {
                            type: "file",
                            accept: "image/*",
                            class: "absolute inset-0 opacity-0 cursor-pointer",
                            onChange: handleFileUpload
                          }, null, 32)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="lg:col-span-2 grid grid-cols-2 gap-4 h-full min-h-0" data-v-34ce7e04>`);
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col overflow-hidden" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "py-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Original`);
                        } else {
                          return [
                            createTextVNode("Original")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                        default: withCtx(() => [
                          createTextVNode("Original")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard" data-v-34ce7e04${_scopeId}><img${ssrRenderAttr("src", previewUrl.value)} alt="Image preview before compression" class="absolute inset-0 w-full h-full object-contain p-2" data-v-34ce7e04${_scopeId}></div>`);
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "py-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode("Original")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard" }, [
                  createVNode("img", {
                    src: previewUrl.value,
                    alt: "Image preview before compression",
                    class: "absolute inset-0 w-full h-full object-contain p-2"
                  }, null, 8, ["src"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col overflow-hidden" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "py-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Compressed`);
                        } else {
                          return [
                            createTextVNode("Compressed")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                        default: withCtx(() => [
                          createTextVNode("Compressed")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard" data-v-34ce7e04${_scopeId}>`);
              if (isProcessing.value) {
                _push2(`<div class="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm" data-v-34ce7e04${_scopeId}><span class="text-sm font-medium animate-pulse" data-v-34ce7e04${_scopeId}>Processing...</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<img${ssrRenderAttr("src", compressedUrl.value)} alt="Compressed image preview" class="absolute inset-0 w-full h-full object-contain p-2" data-v-34ce7e04${_scopeId}></div>`);
            } else {
              return [
                createVNode(unref(_sfc_main$4), { class: "py-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "text-sm text-center text-muted-foreground uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode("Compressed")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex-1 bg-muted/20 relative m-2 border rounded-md overflow-hidden bg-checkerboard" }, [
                  isProcessing.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm"
                  }, [
                    createVNode("span", { class: "text-sm font-medium animate-pulse" }, "Processing...")
                  ])) : createCommentVNode("", true),
                  createVNode("img", {
                    src: compressedUrl.value,
                    alt: "Compressed image preview",
                    class: "absolute inset-0 w-full h-full object-contain p-2"
                  }, null, 8, ["src"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ImageCompressorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageCompressorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34ce7e04"]]);
export {
  ImageCompressorView as default
};
