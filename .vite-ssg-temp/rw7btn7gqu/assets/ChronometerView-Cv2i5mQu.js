import { defineComponent, ref, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$3 } from "../main.mjs";
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
  __name: "ChronometerView",
  __ssrInlineRender: true,
  setup(__props) {
    const time = ref(0);
    const isRunning = ref(false);
    const isPaused = ref(false);
    let interval = null;
    const start = () => {
      isRunning.value = true;
      isPaused.value = false;
      interval = window.setInterval(() => {
        time.value += 10;
      }, 10);
    };
    const pause = () => {
      isPaused.value = true;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    const resume = () => {
      isPaused.value = false;
      interval = window.setInterval(() => {
        time.value += 10;
      }, 10);
    };
    const reset = () => {
      isRunning.value = false;
      isPaused.value = false;
      time.value = 0;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    const formatTime = (ms) => {
      const hours = Math.floor(ms / 36e5);
      const minutes = Math.floor(ms % 36e5 / 6e4);
      const seconds = Math.floor(ms % 6e4 / 1e3);
      const milliseconds = Math.floor(ms % 1e3 / 10);
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };
    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Chronometer</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-8 pb-8 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-6xl md:text-8xl font-mono font-bold tracking-tight"${_scopeId2}>${ssrInterpolate(formatTime(time.value))}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-6xl md:text-8xl font-mono font-bold tracking-tight" }, toDisplayString(formatTime(time.value)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pt-8 pb-8 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-6xl md:text-8xl font-mono font-bold tracking-tight" }, toDisplayString(formatTime(time.value)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-2 justify-center flex-wrap"${_scopeId2}>`);
                  if (!isRunning.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      onClick: start,
                      size: "lg",
                      "aria-label": "Start chronometer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Start`);
                        } else {
                          return [
                            createTextVNode("Start")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isRunning.value && !isPaused.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      onClick: pause,
                      variant: "secondary",
                      size: "lg",
                      "aria-label": "Pause chronometer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Pause`);
                        } else {
                          return [
                            createTextVNode("Pause")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isRunning.value && isPaused.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      onClick: resume,
                      size: "lg",
                      "aria-label": "Resume chronometer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Resume`);
                        } else {
                          return [
                            createTextVNode("Resume")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isRunning.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      onClick: reset,
                      variant: "destructive",
                      size: "lg",
                      "aria-label": "Reset chronometer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Reset`);
                        } else {
                          return [
                            createTextVNode("Reset")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2 justify-center flex-wrap" }, [
                      !isRunning.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 0,
                        onClick: start,
                        size: "lg",
                        "aria-label": "Start chronometer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Start")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      isRunning.value && !isPaused.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 1,
                        onClick: pause,
                        variant: "secondary",
                        size: "lg",
                        "aria-label": "Pause chronometer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Pause")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      isRunning.value && isPaused.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 2,
                        onClick: resume,
                        size: "lg",
                        "aria-label": "Resume chronometer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Resume")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      isRunning.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 3,
                        onClick: reset,
                        variant: "destructive",
                        size: "lg",
                        "aria-label": "Reset chronometer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reset")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-2 justify-center flex-wrap" }, [
                    !isRunning.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 0,
                      onClick: start,
                      size: "lg",
                      "aria-label": "Start chronometer"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Start")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    isRunning.value && !isPaused.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 1,
                      onClick: pause,
                      variant: "secondary",
                      size: "lg",
                      "aria-label": "Pause chronometer"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Pause")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    isRunning.value && isPaused.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 2,
                      onClick: resume,
                      size: "lg",
                      "aria-label": "Resume chronometer"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Resume")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    isRunning.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 3,
                      onClick: reset,
                      variant: "destructive",
                      size: "lg",
                      "aria-label": "Reset chronometer"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Reset")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ChronometerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
