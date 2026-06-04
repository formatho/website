import { defineComponent, ref, computed, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { RouterLink } from "vue-router";
import { Bot, RefreshCw, TrendingUp, Check, Copy, ExternalLink, ChevronRight } from "lucide-vue-next";
import { c as _sfc_main$1 } from "../main.mjs";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, d as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { _ as _sfc_main$6 } from "./Badge-wTrEnT9H.js";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
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
const API_BASE = "https://api.formatho.com/api/v1";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgentsView",
  __ssrInlineRender: true,
  setup(__props) {
    const agents = ref([]);
    const pagination = ref({
      limit: 20,
      offset: 0,
      count: 0,
      total_count: 0,
      sort_by: "reputation"
    });
    const indexerStatus = ref(null);
    const loading = ref(false);
    const error = ref("");
    const currentPage = ref(1);
    const copiedAddress = ref(null);
    const copyTimeout = ref(null);
    const sortBy = ref("reputation");
    const totalPages = computed(() => Math.ceil(pagination.value.total_count / pagination.value.limit));
    const fetchAgents = async () => {
      loading.value = true;
      error.value = "";
      try {
        const params = new URLSearchParams({
          limit: pagination.value.limit.toString(),
          offset: pagination.value.offset.toString(),
          sort_by: sortBy.value
        });
        const response = await fetch(`${API_BASE}/agents?${params}`);
        if (!response.ok) throw new Error("Failed to fetch agents");
        const data = await response.json();
        agents.value = data.agents;
        pagination.value = data.pagination;
      } catch (e) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    };
    const fetchIndexerStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/indexer/status`);
        if (!response.ok) throw new Error("Failed to fetch indexer status");
        const data = await response.json();
        if (data.indexers && data.indexers.length > 0) {
          indexerStatus.value = data.indexers[0] ?? null;
        }
      } catch (e) {
        console.error("Failed to fetch indexer status:", e);
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        pagination.value.offset = (currentPage.value - 1) * pagination.value.limit;
        fetchAgents();
      }
    };
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        pagination.value.offset = (currentPage.value - 1) * pagination.value.limit;
        fetchAgents();
      }
    };
    const goToPage = (page) => {
      currentPage.value = page;
      pagination.value.offset = (page - 1) * pagination.value.limit;
      fetchAgents();
    };
    const changeSort = (newSort) => {
      sortBy.value = newSort;
      currentPage.value = 1;
      pagination.value.offset = 0;
      fetchAgents();
    };
    const refresh = () => {
      fetchAgents();
      fetchIndexerStatus();
    };
    const shortenAddress = (address) => {
      if (!address || address === "0x0000000000000000000000000000000000000000") return "N/A";
      return `${address.slice(0, 8)}...${address.slice(-6)}`;
    };
    const openEtherscan = (address) => {
      window.open(`https://etherscan.io/address/${address}`, "_blank");
    };
    const copyAddress = async (address) => {
      try {
        await navigator.clipboard.writeText(address);
        copiedAddress.value = address;
        if (copyTimeout.value) {
          clearTimeout(copyTimeout.value);
        }
        copyTimeout.value = window.setTimeout(() => {
          copiedAddress.value = null;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy address:", err);
      }
    };
    const formatNumber = (num) => {
      return new Intl.NumberFormat().format(num);
    };
    const getStatusVariant = (status) => {
      switch (status?.toLowerCase()) {
        case "synced":
          return "success";
        case "syncing":
          return "warning";
        case "error":
          return "destructive";
        default:
          return "secondary";
      }
    };
    const formatStatus = (status) => {
      return status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown";
    };
    onMounted(() => {
      fetchAgents();
      fetchIndexerStatus();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}><div class="flex items-center justify-between gap-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Bot), { class: "h-8 w-8" }, null, _parent));
      _push(`<div><h1 class="text-3xl font-bold tracking-tight">Agent Browser</h1><p class="text-sm text-muted-foreground"> Explore AI Agents on the blockchain with reputation tracking </p></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "outline",
        size: "sm",
        onClick: refresh,
        disabled: loading.value,
        "aria-label": "Refresh agents list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RefreshCw), {
              class: [{ "animate-spin": loading.value }, "h-4 w-4 mr-2"]
            }, null, _parent2, _scopeId));
            _push2(` Refresh `);
          } else {
            return [
              createVNode(unref(RefreshCw), {
                class: [{ "animate-spin": loading.value }, "h-4 w-4 mr-2"]
              }, null, 8, ["class"]),
              createTextVNode(" Refresh ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-2"><span class="text-sm text-muted-foreground">Sort by:</span><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: sortBy.value === "reputation" ? "default" : "outline",
        size: "sm",
        onClick: ($event) => changeSort("reputation"),
        "aria-label": "Sort by reputation"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Reputation `);
          } else {
            return [
              createVNode(unref(TrendingUp), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" Reputation ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: sortBy.value === "created" ? "default" : "outline",
        size: "sm",
        onClick: ($event) => changeSort("created"),
        "aria-label": "Sort by newest"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Newly Created `);
          } else {
            return [
              createTextVNode(" Newly Created ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: sortBy.value === "updated" ? "default" : "outline",
        size: "sm",
        onClick: ($event) => changeSort("updated"),
        "aria-label": "Sort by last updated"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Last Updated `);
          } else {
            return [
              createTextVNode(" Last Updated ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: sortBy.value === "first_seen" ? "default" : "outline",
        size: "sm",
        onClick: ($event) => changeSort("first_seen"),
        "aria-label": "Sort by first seen"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` First Seen `);
          } else {
            return [
              createTextVNode(" First Seen ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (indexerStatus.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), { class: "border-primary/20" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "pb-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(TrendingUp), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Network Status `);
                        } else {
                          return [
                            createVNode(unref(TrendingUp), { class: "h-4 w-4" }),
                            createTextVNode(" Network Status ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(TrendingUp), { class: "h-4 w-4" }),
                          createTextVNode(" Network Status ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="grid grid-cols-3 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Total Agents</div><div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(formatNumber(indexerStatus.value.total_agents))}</div></div><div${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Last Block</div><div class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(formatNumber(indexerStatus.value.last_block))}</div></div><div${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Status</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      variant: getStatusVariant(indexerStatus.value.status),
                      class: "text-xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(formatStatus(indexerStatus.value.status))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(formatStatus(indexerStatus.value.status)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2"${_scopeId2}><div${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Reputation Records</div><div class="font-semibold"${_scopeId2}>${ssrInterpolate(formatNumber(indexerStatus.value.total_records))}</div></div><div class="flex items-center gap-2"${_scopeId2}><div class="flex-1 min-w-0"${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Registry Contract</div>`);
                    if (indexerStatus.value.registry_addr) {
                      _push3(`<div class="font-mono text-xs font-medium truncate flex items-center gap-1"${_scopeId2}><span class="truncate"${_scopeId2}>${ssrInterpolate(indexerStatus.value.registry_addr)}</span>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1), {
                        variant: "ghost",
                        size: "sm",
                        class: "h-5 w-5 p-0 shrink-0",
                        onClick: ($event) => copyAddress(indexerStatus.value.registry_addr),
                        "aria-label": "Copy registry address",
                        title: copiedAddress.value === indexerStatus.value.registry_addr ? "Copied!" : "Copy address"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (copiedAddress.value === indexerStatus.value.registry_addr) {
                              _push4(ssrRenderComponent(unref(Check), { class: "h-3 w-3 text-green-500" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(Copy), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              copiedAddress.value === indexerStatus.value.registry_addr ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "h-3 w-3 text-green-500"
                              })) : (openBlock(), createBlock(unref(Copy), {
                                key: 1,
                                class: "h-3 w-3"
                              }))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="text-muted-foreground text-xs"${_scopeId2}>N/A</div>`);
                    }
                    _push3(`</div></div><div class="flex items-center gap-2"${_scopeId2}><div class="flex-1 min-w-0"${_scopeId2}><div class="text-muted-foreground text-xs"${_scopeId2}>Reputation Contract</div>`);
                    if (indexerStatus.value.reputation_addr) {
                      _push3(`<div class="font-mono text-xs font-medium truncate flex items-center gap-1"${_scopeId2}><span class="truncate"${_scopeId2}>${ssrInterpolate(indexerStatus.value.reputation_addr)}</span>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1), {
                        variant: "ghost",
                        size: "sm",
                        class: "h-5 w-5 p-0 shrink-0",
                        onClick: ($event) => copyAddress(indexerStatus.value.reputation_addr),
                        "aria-label": "Copy reputation address",
                        title: copiedAddress.value === indexerStatus.value.reputation_addr ? "Copied!" : "Copy address"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (copiedAddress.value === indexerStatus.value.reputation_addr) {
                              _push4(ssrRenderComponent(unref(Check), { class: "h-3 w-3 text-green-500" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(Copy), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              copiedAddress.value === indexerStatus.value.reputation_addr ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "h-3 w-3 text-green-500"
                              })) : (openBlock(), createBlock(unref(Copy), {
                                key: 1,
                                class: "h-3 w-3"
                              }))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="text-muted-foreground text-xs"${_scopeId2}>N/A</div>`);
                    }
                    _push3(`</div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "grid grid-cols-3 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Total Agents"),
                            createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(indexerStatus.value.total_agents)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Last Block"),
                            createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(formatNumber(indexerStatus.value.last_block)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Status"),
                            createVNode(unref(_sfc_main$6), {
                              variant: getStatusVariant(indexerStatus.value.status),
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatStatus(indexerStatus.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["variant"])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation Records"),
                            createVNode("div", { class: "font-semibold" }, toDisplayString(formatNumber(indexerStatus.value.total_records)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "text-muted-foreground text-xs" }, "Registry Contract"),
                              indexerStatus.value.registry_addr ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "font-mono text-xs font-medium truncate flex items-center gap-1"
                              }, [
                                createVNode("span", { class: "truncate" }, toDisplayString(indexerStatus.value.registry_addr), 1),
                                createVNode(unref(_sfc_main$1), {
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-5 w-5 p-0 shrink-0",
                                  onClick: ($event) => copyAddress(indexerStatus.value.registry_addr),
                                  "aria-label": "Copy registry address",
                                  title: copiedAddress.value === indexerStatus.value.registry_addr ? "Copied!" : "Copy address"
                                }, {
                                  default: withCtx(() => [
                                    copiedAddress.value === indexerStatus.value.registry_addr ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "h-3 w-3 text-green-500"
                                    })) : (openBlock(), createBlock(unref(Copy), {
                                      key: 1,
                                      class: "h-3 w-3"
                                    }))
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "title"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-muted-foreground text-xs"
                              }, "N/A"))
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation Contract"),
                              indexerStatus.value.reputation_addr ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "font-mono text-xs font-medium truncate flex items-center gap-1"
                              }, [
                                createVNode("span", { class: "truncate" }, toDisplayString(indexerStatus.value.reputation_addr), 1),
                                createVNode(unref(_sfc_main$1), {
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-5 w-5 p-0 shrink-0",
                                  onClick: ($event) => copyAddress(indexerStatus.value.reputation_addr),
                                  "aria-label": "Copy reputation address",
                                  title: copiedAddress.value === indexerStatus.value.reputation_addr ? "Copied!" : "Copy address"
                                }, {
                                  default: withCtx(() => [
                                    copiedAddress.value === indexerStatus.value.reputation_addr ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "h-3 w-3 text-green-500"
                                    })) : (openBlock(), createBlock(unref(Copy), {
                                      key: 1,
                                      class: "h-3 w-3"
                                    }))
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "title"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-muted-foreground text-xs"
                              }, "N/A"))
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$3), { class: "pb-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(TrendingUp), { class: "h-4 w-4" }),
                        createTextVNode(" Network Status ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$5), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-3 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "text-muted-foreground text-xs" }, "Total Agents"),
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatNumber(indexerStatus.value.total_agents)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-muted-foreground text-xs" }, "Last Block"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(formatNumber(indexerStatus.value.last_block)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-muted-foreground text-xs" }, "Status"),
                          createVNode(unref(_sfc_main$6), {
                            variant: getStatusVariant(indexerStatus.value.status),
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(formatStatus(indexerStatus.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation Records"),
                          createVNode("div", { class: "font-semibold" }, toDisplayString(formatNumber(indexerStatus.value.total_records)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Registry Contract"),
                            indexerStatus.value.registry_addr ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "font-mono text-xs font-medium truncate flex items-center gap-1"
                            }, [
                              createVNode("span", { class: "truncate" }, toDisplayString(indexerStatus.value.registry_addr), 1),
                              createVNode(unref(_sfc_main$1), {
                                variant: "ghost",
                                size: "sm",
                                class: "h-5 w-5 p-0 shrink-0",
                                onClick: ($event) => copyAddress(indexerStatus.value.registry_addr),
                                "aria-label": "Copy registry address",
                                title: copiedAddress.value === indexerStatus.value.registry_addr ? "Copied!" : "Copy address"
                              }, {
                                default: withCtx(() => [
                                  copiedAddress.value === indexerStatus.value.registry_addr ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "h-3 w-3 text-green-500"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "h-3 w-3"
                                  }))
                                ]),
                                _: 1
                              }, 8, ["onClick", "title"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-muted-foreground text-xs"
                            }, "N/A"))
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation Contract"),
                            indexerStatus.value.reputation_addr ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "font-mono text-xs font-medium truncate flex items-center gap-1"
                            }, [
                              createVNode("span", { class: "truncate" }, toDisplayString(indexerStatus.value.reputation_addr), 1),
                              createVNode(unref(_sfc_main$1), {
                                variant: "ghost",
                                size: "sm",
                                class: "h-5 w-5 p-0 shrink-0",
                                onClick: ($event) => copyAddress(indexerStatus.value.reputation_addr),
                                "aria-label": "Copy reputation address",
                                title: copiedAddress.value === indexerStatus.value.reputation_addr ? "Copied!" : "Copy address"
                              }, {
                                default: withCtx(() => [
                                  copiedAddress.value === indexerStatus.value.reputation_addr ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "h-3 w-3 text-green-500"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "h-3 w-3"
                                  }))
                                ]),
                                _: 1
                              }, 8, ["onClick", "title"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-muted-foreground text-xs"
                            }, "N/A"))
                          ])
                        ])
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
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), { class: "border-destructive" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-destructive"${_scopeId2}>${ssrInterpolate(error.value)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-destructive" }, toDisplayString(error.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-destructive" }, toDisplayString(error.value), 1)
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
      if (loading.value && agents.value.length === 0) {
        _push(`<div class="flex-1 flex items-center justify-center"><div class="text-center">`);
        _push(ssrRenderComponent(unref(RefreshCw), { class: "h-8 w-8 animate-spin mx-auto mb-4" }, null, _parent));
        _push(`<p class="text-muted-foreground">Loading agents...</p></div></div>`);
      } else {
        _push(`<div class="flex-1 overflow-auto"><div class="grid gap-3"><!--[-->`);
        ssrRenderList(agents.value, (agent) => {
          _push(ssrRenderComponent(unref(RouterLink), {
            key: agent.id,
            to: { name: "agent-detail", params: { address: agent.address } },
            class: "block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "hover:shadow-md transition-shadow cursor-pointer h-full" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "pt-6" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-start justify-between gap-4"${_scopeId3}><div class="flex-1 min-w-0"${_scopeId3}><div class="flex items-center gap-2 mb-2"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(Bot), { class: "text-gray-900" }, null, _parent4, _scopeId3));
                            _push4(`<h3 class="text-lg font-semibold truncate"${_scopeId3}>${ssrInterpolate(agent.name || shortenAddress(agent.address))}</h3>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$6), {
                              variant: "secondary",
                              class: "text-xs"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` #${ssrInterpolate(agent.id)}`);
                                } else {
                                  return [
                                    createTextVNode(" #" + toDisplayString(agent.id), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$1), {
                              variant: "ghost",
                              size: "sm",
                              class: "h-6 w-6 p-0",
                              onClick: ($event) => copyAddress(agent.address),
                              "aria-label": "Copy agent address",
                              title: copiedAddress.value === agent.address ? "Copied!" : "Copy address"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (copiedAddress.value === agent.address) {
                                    _push5(ssrRenderComponent(unref(Check), { class: "h-3 w-3 text-green-500" }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(ssrRenderComponent(unref(Copy), { class: "h-3 w-3" }, null, _parent5, _scopeId4));
                                  }
                                } else {
                                  return [
                                    copiedAddress.value === agent.address ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "h-3 w-3 text-green-500"
                                    })) : (openBlock(), createBlock(unref(Copy), {
                                      key: 1,
                                      class: "h-3 w-3"
                                    }))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                            if (agent.metadata?.description) {
                              _push4(`<p class="text-sm text-muted-foreground mb-3 line-clamp-2"${_scopeId3}>${ssrInterpolate(agent.metadata.description)}</p>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"${_scopeId3}><div${_scopeId3}><div class="text-muted-foreground text-xs"${_scopeId3}>Chain ID</div><div class="font-medium"${_scopeId3}>${ssrInterpolate(agent.chain_id)}</div></div><div${_scopeId3}><div class="text-muted-foreground text-xs"${_scopeId3}>First Seen</div><div class="font-medium"${_scopeId3}>Block ${ssrInterpolate(formatNumber(agent.first_seen))}</div></div><div${_scopeId3}><div class="text-muted-foreground text-xs"${_scopeId3}>Owner</div><div class="font-medium font-mono text-xs"${_scopeId3}>${ssrInterpolate(shortenAddress(agent.owner))}</div></div>`);
                            if (agent.total_reputation !== void 0) {
                              _push4(`<div${_scopeId3}><div class="text-muted-foreground text-xs"${_scopeId3}>Reputation</div><div class="font-medium"${_scopeId3}>${ssrInterpolate(agent.total_reputation)} `);
                              if (agent.avg_score) {
                                _push4(`<span class="text-muted-foreground text-xs"${_scopeId3}> (avg: ${ssrInterpolate(agent.avg_score.toFixed(2))}) </span>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div></div><div class="flex items-center gap-2"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$1), {
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => openEtherscan(agent.address),
                              "aria-label": "View on Etherscan"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(ExternalLink), { class: "h-4 w-4 mr-2" }, null, _parent5, _scopeId4));
                                  _push5(` Etherscan `);
                                } else {
                                  return [
                                    createVNode(unref(ExternalLink), { class: "h-4 w-4 mr-2" }),
                                    createTextVNode(" Etherscan ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5 text-muted-foreground" }, null, _parent4, _scopeId3));
                            _push4(`</div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                    createVNode(unref(Bot), { class: "text-gray-900" }),
                                    createVNode("h3", { class: "text-lg font-semibold truncate" }, toDisplayString(agent.name || shortenAddress(agent.address)), 1),
                                    createVNode(unref(_sfc_main$6), {
                                      variant: "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" #" + toDisplayString(agent.id), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$1), {
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-6 w-6 p-0",
                                      onClick: withModifiers(($event) => copyAddress(agent.address), ["prevent"]),
                                      "aria-label": "Copy agent address",
                                      title: copiedAddress.value === agent.address ? "Copied!" : "Copy address"
                                    }, {
                                      default: withCtx(() => [
                                        copiedAddress.value === agent.address ? (openBlock(), createBlock(unref(Check), {
                                          key: 0,
                                          class: "h-3 w-3 text-green-500"
                                        })) : (openBlock(), createBlock(unref(Copy), {
                                          key: 1,
                                          class: "h-3 w-3"
                                        }))
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick", "title"])
                                  ]),
                                  agent.metadata?.description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-sm text-muted-foreground mb-3 line-clamp-2"
                                  }, toDisplayString(agent.metadata.description), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3 text-sm" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-muted-foreground text-xs" }, "Chain ID"),
                                      createVNode("div", { class: "font-medium" }, toDisplayString(agent.chain_id), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-muted-foreground text-xs" }, "First Seen"),
                                      createVNode("div", { class: "font-medium" }, "Block " + toDisplayString(formatNumber(agent.first_seen)), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-muted-foreground text-xs" }, "Owner"),
                                      createVNode("div", { class: "font-medium font-mono text-xs" }, toDisplayString(shortenAddress(agent.owner)), 1)
                                    ]),
                                    agent.total_reputation !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation"),
                                      createVNode("div", { class: "font-medium" }, [
                                        createTextVNode(toDisplayString(agent.total_reputation) + " ", 1),
                                        agent.avg_score ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-muted-foreground text-xs"
                                        }, " (avg: " + toDisplayString(agent.avg_score.toFixed(2)) + ") ", 1)) : createCommentVNode("", true)
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(unref(_sfc_main$1), {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: withModifiers(($event) => openEtherscan(agent.address), ["prevent"]),
                                    "aria-label": "View on Etherscan"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ExternalLink), { class: "h-4 w-4 mr-2" }),
                                      createTextVNode(" Etherscan ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(unref(ChevronRight), { class: "h-5 w-5 text-muted-foreground" })
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                  createVNode(unref(Bot), { class: "text-gray-900" }),
                                  createVNode("h3", { class: "text-lg font-semibold truncate" }, toDisplayString(agent.name || shortenAddress(agent.address)), 1),
                                  createVNode(unref(_sfc_main$6), {
                                    variant: "secondary",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" #" + toDisplayString(agent.id), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$1), {
                                    variant: "ghost",
                                    size: "sm",
                                    class: "h-6 w-6 p-0",
                                    onClick: withModifiers(($event) => copyAddress(agent.address), ["prevent"]),
                                    "aria-label": "Copy agent address",
                                    title: copiedAddress.value === agent.address ? "Copied!" : "Copy address"
                                  }, {
                                    default: withCtx(() => [
                                      copiedAddress.value === agent.address ? (openBlock(), createBlock(unref(Check), {
                                        key: 0,
                                        class: "h-3 w-3 text-green-500"
                                      })) : (openBlock(), createBlock(unref(Copy), {
                                        key: 1,
                                        class: "h-3 w-3"
                                      }))
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick", "title"])
                                ]),
                                agent.metadata?.description ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-muted-foreground mb-3 line-clamp-2"
                                }, toDisplayString(agent.metadata.description), 1)) : createCommentVNode("", true),
                                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3 text-sm" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-muted-foreground text-xs" }, "Chain ID"),
                                    createVNode("div", { class: "font-medium" }, toDisplayString(agent.chain_id), 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-muted-foreground text-xs" }, "First Seen"),
                                    createVNode("div", { class: "font-medium" }, "Block " + toDisplayString(formatNumber(agent.first_seen)), 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-muted-foreground text-xs" }, "Owner"),
                                    createVNode("div", { class: "font-medium font-mono text-xs" }, toDisplayString(shortenAddress(agent.owner)), 1)
                                  ]),
                                  agent.total_reputation !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation"),
                                    createVNode("div", { class: "font-medium" }, [
                                      createTextVNode(toDisplayString(agent.total_reputation) + " ", 1),
                                      agent.avg_score ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-muted-foreground text-xs"
                                      }, " (avg: " + toDisplayString(agent.avg_score.toFixed(2)) + ") ", 1)) : createCommentVNode("", true)
                                    ])
                                  ])) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$1), {
                                  variant: "outline",
                                  size: "sm",
                                  onClick: withModifiers(($event) => openEtherscan(agent.address), ["prevent"]),
                                  "aria-label": "View on Etherscan"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ExternalLink), { class: "h-4 w-4 mr-2" }),
                                    createTextVNode(" Etherscan ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(ChevronRight), { class: "h-5 w-5 text-muted-foreground" })
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$2), { class: "hover:shadow-md transition-shadow cursor-pointer h-full" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                createVNode(unref(Bot), { class: "text-gray-900" }),
                                createVNode("h3", { class: "text-lg font-semibold truncate" }, toDisplayString(agent.name || shortenAddress(agent.address)), 1),
                                createVNode(unref(_sfc_main$6), {
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" #" + toDisplayString(agent.id), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$1), {
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-6 w-6 p-0",
                                  onClick: withModifiers(($event) => copyAddress(agent.address), ["prevent"]),
                                  "aria-label": "Copy agent address",
                                  title: copiedAddress.value === agent.address ? "Copied!" : "Copy address"
                                }, {
                                  default: withCtx(() => [
                                    copiedAddress.value === agent.address ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "h-3 w-3 text-green-500"
                                    })) : (openBlock(), createBlock(unref(Copy), {
                                      key: 1,
                                      class: "h-3 w-3"
                                    }))
                                  ]),
                                  _: 2
                                }, 1032, ["onClick", "title"])
                              ]),
                              agent.metadata?.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-muted-foreground mb-3 line-clamp-2"
                              }, toDisplayString(agent.metadata.description), 1)) : createCommentVNode("", true),
                              createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3 text-sm" }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-muted-foreground text-xs" }, "Chain ID"),
                                  createVNode("div", { class: "font-medium" }, toDisplayString(agent.chain_id), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-muted-foreground text-xs" }, "First Seen"),
                                  createVNode("div", { class: "font-medium" }, "Block " + toDisplayString(formatNumber(agent.first_seen)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-muted-foreground text-xs" }, "Owner"),
                                  createVNode("div", { class: "font-medium font-mono text-xs" }, toDisplayString(shortenAddress(agent.owner)), 1)
                                ]),
                                agent.total_reputation !== void 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("div", { class: "text-muted-foreground text-xs" }, "Reputation"),
                                  createVNode("div", { class: "font-medium" }, [
                                    createTextVNode(toDisplayString(agent.total_reputation) + " ", 1),
                                    agent.avg_score ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-muted-foreground text-xs"
                                    }, " (avg: " + toDisplayString(agent.avg_score.toFixed(2)) + ") ", 1)) : createCommentVNode("", true)
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$1), {
                                variant: "outline",
                                size: "sm",
                                onClick: withModifiers(($event) => openEtherscan(agent.address), ["prevent"]),
                                "aria-label": "View on Etherscan"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ExternalLink), { class: "h-4 w-4 mr-2" }),
                                  createTextVNode(" Etherscan ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(ChevronRight), { class: "h-5 w-5 text-muted-foreground" })
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (agents.value.length === 0 && !loading.value) {
          _push(ssrRenderComponent(unref(_sfc_main$2), null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "py-12 text-center" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Bot), { class: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(`<p class="text-muted-foreground"${_scopeId2}>No agents found</p>`);
                    } else {
                      return [
                        createVNode(unref(Bot), { class: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
                        createVNode("p", { class: "text-muted-foreground" }, "No agents found")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$5), { class: "py-12 text-center" }, {
                    default: withCtx(() => [
                      createVNode(unref(Bot), { class: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
                      createVNode("p", { class: "text-muted-foreground" }, "No agents found")
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
      }
      if (pagination.value.total_count > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$2), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="text-sm text-muted-foreground"${_scopeId2}> Showing ${ssrInterpolate(pagination.value.offset + 1)}-${ssrInterpolate(pagination.value.offset + pagination.value.count)} of ${ssrInterpolate(formatNumber(pagination.value.total_count))} agents </div><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "outline",
                      size: "sm",
                      disabled: currentPage.value === 1,
                      onClick: prevPage,
                      "aria-label": "Previous page"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Previous `);
                        } else {
                          return [
                            createTextVNode(" Previous ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex items-center gap-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(Math.min(5, totalPages.value), (page) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$1), {
                        key: page,
                        variant: page === currentPage.value ? "default" : "outline",
                        size: "sm",
                        class: "w-8",
                        onClick: ($event) => goToPage(page),
                        "aria-label": "Go to page " + page
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(page)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(page), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (totalPages.value > 5) {
                      _push3(`<span class="px-2 text-sm text-muted-foreground"${_scopeId2}> of ${ssrInterpolate(totalPages.value)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      variant: "outline",
                      size: "sm",
                      disabled: currentPage.value === totalPages.value,
                      onClick: nextPage,
                      "aria-label": "Next page"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Next `);
                        } else {
                          return [
                            createTextVNode(" Next ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "text-sm text-muted-foreground" }, " Showing " + toDisplayString(pagination.value.offset + 1) + "-" + toDisplayString(pagination.value.offset + pagination.value.count) + " of " + toDisplayString(formatNumber(pagination.value.total_count)) + " agents ", 1),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(_sfc_main$1), {
                            variant: "outline",
                            size: "sm",
                            disabled: currentPage.value === 1,
                            onClick: prevPage,
                            "aria-label": "Previous page"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Previous ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(Math.min(5, totalPages.value), (page) => {
                              return openBlock(), createBlock(unref(_sfc_main$1), {
                                key: page,
                                variant: page === currentPage.value ? "default" : "outline",
                                size: "sm",
                                class: "w-8",
                                onClick: ($event) => goToPage(page),
                                "aria-label": "Go to page " + page
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(page), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant", "onClick", "aria-label"]);
                            }), 128)),
                            totalPages.value > 5 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "px-2 text-sm text-muted-foreground"
                            }, " of " + toDisplayString(totalPages.value), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(unref(_sfc_main$1), {
                            variant: "outline",
                            size: "sm",
                            disabled: currentPage.value === totalPages.value,
                            onClick: nextPage,
                            "aria-label": "Next page"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Next ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5), { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-muted-foreground" }, " Showing " + toDisplayString(pagination.value.offset + 1) + "-" + toDisplayString(pagination.value.offset + pagination.value.count) + " of " + toDisplayString(formatNumber(pagination.value.total_count)) + " agents ", 1),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(_sfc_main$1), {
                          variant: "outline",
                          size: "sm",
                          disabled: currentPage.value === 1,
                          onClick: prevPage,
                          "aria-label": "Previous page"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(Math.min(5, totalPages.value), (page) => {
                            return openBlock(), createBlock(unref(_sfc_main$1), {
                              key: page,
                              variant: page === currentPage.value ? "default" : "outline",
                              size: "sm",
                              class: "w-8",
                              onClick: ($event) => goToPage(page),
                              "aria-label": "Go to page " + page
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(page), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant", "onClick", "aria-label"]);
                          }), 128)),
                          totalPages.value > 5 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "px-2 text-sm text-muted-foreground"
                          }, " of " + toDisplayString(totalPages.value), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode(unref(_sfc_main$1), {
                          variant: "outline",
                          size: "sm",
                          disabled: currentPage.value === totalPages.value,
                          onClick: nextPage,
                          "aria-label": "Next page"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AgentsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
