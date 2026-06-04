import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Clock, Check, Copy } from "lucide-vue-next";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { c as _sfc_main$6 } from "../main.mjs";
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
  __name: "CrontabGeneratorView",
  __ssrInlineRender: true,
  setup(__props) {
    const minute = ref("0");
    const hour = ref("*");
    const dayOfMonth = ref("*");
    const month = ref("*");
    const dayOfWeek = ref("*");
    const copied = ref(false);
    const cronExpression = computed(() => {
      return `${minute.value} ${hour.value} ${dayOfMonth.value} ${month.value} ${dayOfWeek.value}`;
    });
    const humanReadable = computed(() => {
      const parts = [];
      if (minute.value !== "*") parts.push(`at minute ${minute.value}`);
      if (hour.value !== "*") parts.push(`at hour ${hour.value}`);
      if (dayOfMonth.value !== "*") parts.push(`on day ${dayOfMonth.value} of the month`);
      if (month.value !== "*") parts.push(`in month ${month.value}`);
      if (dayOfWeek.value !== "*")
        parts.push(
          `on ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][parseInt(dayOfWeek.value)]}`
        );
      if (parts.length === 0) return "Every minute";
      if (minute.value === "*" && hour.value === "*" && dayOfMonth.value === "*" && month.value === "*" && dayOfWeek.value === "*") {
        return "Every minute";
      }
      return parts.join(", ");
    });
    const presets = [
      { label: "Every minute", cron: "* * * * *" },
      { label: "Hourly", cron: "0 * * * *" },
      { label: "Daily (midnight)", cron: "0 0 * * *" },
      { label: "Daily (6 AM)", cron: "0 6 * * *" },
      { label: "Weekly (Sunday midnight)", cron: "0 0 * * 0" },
      { label: "Monthly (1st)", cron: "0 0 1 * *" },
      { label: "Every 5 minutes", cron: "*/5 * * * *" },
      { label: "Every 15 minutes", cron: "*/15 * * * *" },
      { label: "Every 30 minutes", cron: "*/30 * * * *" },
      { label: "Every 6 hours", cron: "0 */6 * * *" },
      { label: "Weekdays (9 AM)", cron: "0 9 * * 1-5" },
      { label: "Weekends (10 AM)", cron: "0 10 * * 0,6" }
    ];
    const applyPreset = (cron) => {
      const parts = cron.split(" ");
      minute.value = parts[0] ?? "*";
      hour.value = parts[1] ?? "*";
      dayOfMonth.value = parts[2] ?? "*";
      month.value = parts[3] ?? "*";
      dayOfWeek.value = parts[4] ?? "*";
    };
    const copyCron = () => {
      navigator.clipboard.writeText(cronExpression.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 2e3);
    };
    const specialChars = [
      { char: "*", desc: "Any value" },
      { char: ",", desc: "List separator" },
      { char: "-", desc: "Range" },
      { char: "/", desc: "Step values" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-6 py-8" }, _attrs))}><div class="max-w-5xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-8 h-8" }, null, _parent));
      _push(` Crontab Generator </h1><p class="text-muted-foreground mt-2">Generate and understand cron expressions.</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "lg:col-span-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cron Expression Builder`);
                      } else {
                        return [
                          createTextVNode("Cron Expression Builder")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Configure each field`);
                      } else {
                        return [
                          createTextVNode("Configure each field")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Cron Expression Builder")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Configure each field")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-5 gap-4"${_scopeId2}><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Minute</label><input${ssrRenderAttr("value", minute.value)} type="text" aria-label="Minute (0-59)" placeholder="0-59" class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="text-xs text-muted-foreground mt-1 text-center"${_scopeId2}>0-59</div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Hour</label><input${ssrRenderAttr("value", hour.value)} type="text" aria-label="Hour (0-23)" placeholder="0-23" class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="text-xs text-muted-foreground mt-1 text-center"${_scopeId2}>0-23</div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Day</label><input${ssrRenderAttr("value", dayOfMonth.value)} type="text" aria-label="Day of month (1-31)" placeholder="1-31" class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="text-xs text-muted-foreground mt-1 text-center"${_scopeId2}>1-31</div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Month</label><input${ssrRenderAttr("value", month.value)} type="text" aria-label="Month (1-12)" placeholder="1-12" class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="text-xs text-muted-foreground mt-1 text-center"${_scopeId2}>1-12</div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Weekday</label><input${ssrRenderAttr("value", dayOfWeek.value)} type="text" aria-label="Day of week (0-6)" placeholder="0-6" class="w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId2}><div class="text-xs text-muted-foreground mt-1 text-center"${_scopeId2}>0-6</div></div></div><div${_scopeId2}><label class="block text-sm font-medium mb-2"${_scopeId2}>Quick Presets</label><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(presets, (preset) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      key: preset.label,
                      onClick: ($event) => applyPreset(preset.cron),
                      variant: "outline",
                      size: "sm",
                      "aria-label": "Apply preset: " + preset.label
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(preset.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div><div class="p-4 bg-surface-hover rounded-lg"${_scopeId2}><div class="text-sm font-medium mb-2"${_scopeId2}>Special Characters</div><div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList(specialChars, (char) => {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}><code class="bg-primary/10 px-2 py-1 rounded"${_scopeId2}>${ssrInterpolate(char.char)}</code><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(char.desc)}</span></div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-5 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Minute"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => minute.value = $event,
                          type: "text",
                          "aria-label": "Minute (0-59)",
                          placeholder: "0-59",
                          class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, minute.value]
                        ]),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-59")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Hour"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => hour.value = $event,
                          type: "text",
                          "aria-label": "Hour (0-23)",
                          placeholder: "0-23",
                          class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, hour.value]
                        ]),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-23")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Day"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => dayOfMonth.value = $event,
                          type: "text",
                          "aria-label": "Day of month (1-31)",
                          placeholder: "1-31",
                          class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, dayOfMonth.value]
                        ]),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "1-31")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Month"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => month.value = $event,
                          type: "text",
                          "aria-label": "Month (1-12)",
                          placeholder: "1-12",
                          class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, month.value]
                        ]),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "1-12")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium mb-2" }, "Weekday"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => dayOfWeek.value = $event,
                          type: "text",
                          "aria-label": "Day of week (0-6)",
                          placeholder: "0-6",
                          class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, dayOfWeek.value]
                        ]),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-6")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Quick Presets"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                          return createVNode(unref(_sfc_main$6), {
                            key: preset.label,
                            onClick: ($event) => applyPreset(preset.cron),
                            variant: "outline",
                            size: "sm",
                            "aria-label": "Apply preset: " + preset.label
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(preset.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label"]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                      createVNode("div", { class: "text-sm font-medium mb-2" }, "Special Characters"),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(specialChars, (char) => {
                          return createVNode("div", {
                            key: char.char,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode("code", { class: "bg-primary/10 px-2 py-1 rounded" }, toDisplayString(char.char), 1),
                            createVNode("span", { class: "text-muted-foreground" }, toDisplayString(char.desc), 1)
                          ]);
                        }), 64))
                      ])
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
                      createTextVNode("Cron Expression Builder")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Configure each field")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-5 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Minute"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => minute.value = $event,
                        type: "text",
                        "aria-label": "Minute (0-59)",
                        placeholder: "0-59",
                        class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, minute.value]
                      ]),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-59")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Hour"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => hour.value = $event,
                        type: "text",
                        "aria-label": "Hour (0-23)",
                        placeholder: "0-23",
                        class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, hour.value]
                      ]),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-23")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Day"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => dayOfMonth.value = $event,
                        type: "text",
                        "aria-label": "Day of month (1-31)",
                        placeholder: "1-31",
                        class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, dayOfMonth.value]
                      ]),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "1-31")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Month"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => month.value = $event,
                        type: "text",
                        "aria-label": "Month (1-12)",
                        placeholder: "1-12",
                        class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, month.value]
                      ]),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "1-12")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium mb-2" }, "Weekday"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => dayOfWeek.value = $event,
                        type: "text",
                        "aria-label": "Day of week (0-6)",
                        placeholder: "0-6",
                        class: "w-full px-3 py-2 border rounded-md font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, dayOfWeek.value]
                      ]),
                      createVNode("div", { class: "text-xs text-muted-foreground mt-1 text-center" }, "0-6")
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium mb-2" }, "Quick Presets"),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(presets, (preset) => {
                        return createVNode(unref(_sfc_main$6), {
                          key: preset.label,
                          onClick: ($event) => applyPreset(preset.cron),
                          variant: "outline",
                          size: "sm",
                          "aria-label": "Apply preset: " + preset.label
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(preset.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "aria-label"]);
                      }), 64))
                    ])
                  ]),
                  createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                    createVNode("div", { class: "text-sm font-medium mb-2" }, "Special Characters"),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(specialChars, (char) => {
                        return createVNode("div", {
                          key: char.char,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("code", { class: "bg-primary/10 px-2 py-1 rounded" }, toDisplayString(char.char), 1),
                          createVNode("span", { class: "text-muted-foreground" }, toDisplayString(char.desc), 1)
                        ]);
                      }), 64))
                    ])
                  ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Result`);
                      } else {
                        return [
                          createTextVNode("Result")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Result")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 bg-surface-hover rounded-lg"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Cron Expression</div><div class="font-mono text-xl text-center"${_scopeId2}>${ssrInterpolate(cronExpression.value)}</div></div><div class="p-4 bg-surface-hover rounded-lg"${_scopeId2}><div class="text-sm text-muted-foreground mb-2"${_scopeId2}>Human Readable</div><div class="capitalize"${_scopeId2}>${ssrInterpolate(humanReadable.value)}</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    onClick: copyCron,
                    class: "w-full",
                    "aria-label": "Copy cron expression"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" }, null), _parent4, _scopeId3);
                        _push4(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy Expression")}`);
                      } else {
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                          createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Expression"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Cron Expression"),
                      createVNode("div", { class: "font-mono text-xl text-center" }, toDisplayString(cronExpression.value), 1)
                    ]),
                    createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Human Readable"),
                      createVNode("div", { class: "capitalize" }, toDisplayString(humanReadable.value), 1)
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      onClick: copyCron,
                      class: "w-full",
                      "aria-label": "Copy cron expression"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                        createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Expression"), 1)
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Result")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Cron Expression"),
                    createVNode("div", { class: "font-mono text-xl text-center" }, toDisplayString(cronExpression.value), 1)
                  ]),
                  createVNode("div", { class: "p-4 bg-surface-hover rounded-lg" }, [
                    createVNode("div", { class: "text-sm text-muted-foreground mb-2" }, "Human Readable"),
                    createVNode("div", { class: "capitalize" }, toDisplayString(humanReadable.value), 1)
                  ]),
                  createVNode(unref(_sfc_main$6), {
                    onClick: copyCron,
                    class: "w-full",
                    "aria-label": "Copy cron expression"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(copied.value ? unref(Check) : unref(Copy)), { class: "w-4 h-4 mr-2" })),
                      createTextVNode(" " + toDisplayString(copied.value ? "Copied!" : "Copy Expression"), 1)
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
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/CrontabGeneratorView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
