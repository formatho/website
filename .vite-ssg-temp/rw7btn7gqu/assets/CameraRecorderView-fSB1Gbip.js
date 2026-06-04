import { defineComponent, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4 } from "./CardFooter-DjcCkgh0.js";
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
  __name: "CameraRecorderView",
  __ssrInlineRender: true,
  setup(__props) {
    const videoRef = ref(null);
    const stream = ref(null);
    const isRecording = ref(false);
    const recordedChunks = ref([]);
    const mediaRecorder = ref(null);
    const recordedVideoUrl = ref("");
    const facingMode = ref("user");
    const startCamera = async () => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode.value },
          audio: true
        });
        if (videoRef.value) {
          videoRef.value.srcObject = stream.value;
        }
      } catch (e) {
        console.error("Failed to start camera:", e);
      }
    };
    const stopCamera = () => {
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null;
      }
    };
    const toggleCamera = async () => {
      facingMode.value = facingMode.value === "user" ? "environment" : "user";
      stopCamera();
      await startCamera();
    };
    const startRecording = () => {
      if (!stream.value) return;
      recordedChunks.value = [];
      mediaRecorder.value = new MediaRecorder(stream.value);
      mediaRecorder.value.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.value.push(e.data);
        }
      };
      mediaRecorder.value.onstop = () => {
        const blob = new Blob(recordedChunks.value, { type: "video/webm" });
        recordedVideoUrl.value = URL.createObjectURL(blob);
      };
      mediaRecorder.value.start();
      isRecording.value = true;
    };
    const stopRecording = () => {
      if (mediaRecorder.value) {
        mediaRecorder.value.stop();
        isRecording.value = false;
      }
    };
    const downloadRecording = () => {
      const a = document.createElement("a");
      a.href = recordedVideoUrl.value;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
    };
    onMounted(() => {
      startCamera();
    });
    onUnmounted(() => {
      stopCamera();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Camera Recorder</h1></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Camera`);
                      } else {
                        return [
                          createTextVNode("Camera")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Camera")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex-1 min-h-0 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<video autoplay playsinline class="w-full rounded-lg bg-black" style="${ssrRenderStyle({ "max-height": "400px" })}"${_scopeId2}></video><div class="flex gap-2 flex-wrap"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: startCamera,
                    variant: "outline",
                    size: "sm",
                    "aria-label": "Start camera"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start Camera`);
                      } else {
                        return [
                          createTextVNode("Start Camera")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    onClick: toggleCamera,
                    variant: "outline",
                    size: "sm",
                    "aria-label": "Toggle front/back camera"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Toggle Camera`);
                      } else {
                        return [
                          createTextVNode("Toggle Camera")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!isRecording.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      onClick: startRecording,
                      size: "sm",
                      class: "bg-red-500 hover:bg-red-600"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Start Recording `);
                        } else {
                          return [
                            createTextVNode(" Start Recording ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      onClick: stopRecording,
                      size: "sm",
                      "aria-label": "Stop recording"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Stop Recording `);
                        } else {
                          return [
                            createTextVNode(" Stop Recording ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("video", {
                      ref_key: "videoRef",
                      ref: videoRef,
                      autoplay: "",
                      playsinline: "",
                      class: "w-full rounded-lg bg-black",
                      style: { "max-height": "400px" }
                    }, null, 512),
                    createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                      createVNode(unref(_sfc_main$5), {
                        onClick: startCamera,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Start camera"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Start Camera")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        onClick: toggleCamera,
                        variant: "outline",
                        size: "sm",
                        "aria-label": "Toggle front/back camera"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Toggle Camera")
                        ]),
                        _: 1
                      }),
                      !isRecording.value ? (openBlock(), createBlock(unref(_sfc_main$5), {
                        key: 0,
                        onClick: startRecording,
                        size: "sm",
                        class: "bg-red-500 hover:bg-red-600"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Start Recording ")
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(_sfc_main$5), {
                        key: 1,
                        onClick: stopRecording,
                        size: "sm",
                        "aria-label": "Stop recording"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Stop Recording ")
                        ]),
                        _: 1
                      }))
                    ])
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
                      createTextVNode("Camera")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("video", {
                    ref_key: "videoRef",
                    ref: videoRef,
                    autoplay: "",
                    playsinline: "",
                    class: "w-full rounded-lg bg-black",
                    style: { "max-height": "400px" }
                  }, null, 512),
                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                    createVNode(unref(_sfc_main$5), {
                      onClick: startCamera,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Start camera"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Start Camera")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      onClick: toggleCamera,
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Toggle front/back camera"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Toggle Camera")
                      ]),
                      _: 1
                    }),
                    !isRecording.value ? (openBlock(), createBlock(unref(_sfc_main$5), {
                      key: 0,
                      onClick: startRecording,
                      size: "sm",
                      class: "bg-red-500 hover:bg-red-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Start Recording ")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(_sfc_main$5), {
                      key: 1,
                      onClick: stopRecording,
                      size: "sm",
                      "aria-label": "Stop recording"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Stop Recording ")
                      ]),
                      _: 1
                    }))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (recordedVideoUrl.value) {
        _push(ssrRenderComponent(unref(_sfc_main$1), { class: "flex flex-col min-h-0" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Recording`);
                        } else {
                          return [
                            createTextVNode("Recording")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: downloadRecording,
                      "aria-label": "Download recording"
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
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Recording")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        variant: "outline",
                        size: "sm",
                        onClick: downloadRecording,
                        "aria-label": "Download recording"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Download")
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
                    _push3(`<video${ssrRenderAttr("src", recordedVideoUrl.value)} controls class="w-full rounded-lg" style="${ssrRenderStyle({ "max-height": "400px" })}"${_scopeId2}></video>`);
                  } else {
                    return [
                      createVNode("video", {
                        src: recordedVideoUrl.value,
                        controls: "",
                        class: "w-full rounded-lg",
                        style: { "max-height": "400px" }
                      }, null, 8, ["src"])
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
                        createTextVNode("Recording")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), {
                      variant: "outline",
                      size: "sm",
                      onClick: downloadRecording,
                      "aria-label": "Download recording"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Download")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex-1 min-h-0" }, {
                  default: withCtx(() => [
                    createVNode("video", {
                      src: recordedVideoUrl.value,
                      controls: "",
                      class: "w-full rounded-lg",
                      style: { "max-height": "400px" }
                    }, null, 8, ["src"])
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/CameraRecorderView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
