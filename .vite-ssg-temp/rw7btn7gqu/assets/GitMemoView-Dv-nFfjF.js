import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2, a as _sfc_main$4, b as _sfc_main$5 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$3 } from "../main.mjs";
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
  __name: "GitMemoView",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const gitCommands = [
      {
        category: "Setup",
        commands: [
          { cmd: "git init", desc: "Initialize a new Git repository" },
          { cmd: "git clone <url>", desc: "Clone a repository" },
          { cmd: 'git config --global user.name "<name>"', desc: "Set global username" },
          { cmd: 'git config --global user.email "<email>"', desc: "Set global email" }
        ]
      },
      {
        category: "Basic Commands",
        commands: [
          { cmd: "git status", desc: "Show working directory status" },
          { cmd: "git add <file>", desc: "Add file to staging" },
          { cmd: "git add .", desc: "Add all files to staging" },
          { cmd: 'git commit -m "<message>"', desc: "Commit staged changes" },
          { cmd: "git push origin <branch>", desc: "Push to remote" },
          { cmd: "git pull origin <branch>", desc: "Pull from remote" }
        ]
      },
      {
        category: "Branching",
        commands: [
          { cmd: "git branch", desc: "List all branches" },
          { cmd: "git branch <name>", desc: "Create new branch" },
          { cmd: "git checkout <branch>", desc: "Switch to branch" },
          { cmd: "git checkout -b <name>", desc: "Create and switch to branch" },
          { cmd: "git merge <branch>", desc: "Merge branch into current" },
          { cmd: "git branch -d <name>", desc: "Delete branch" }
        ]
      },
      {
        category: "History",
        commands: [
          { cmd: "git log", desc: "Show commit history" },
          { cmd: "git log --oneline", desc: "Show compact history" },
          { cmd: "git diff", desc: "Show unstaged changes" },
          { cmd: "git diff --staged", desc: "Show staged changes" },
          { cmd: "git show <commit>", desc: "Show commit details" }
        ]
      },
      {
        category: "Undo Changes",
        commands: [
          { cmd: "git reset <file>", desc: "Unstage file" },
          { cmd: "git reset --hard", desc: "Reset to last commit" },
          { cmd: "git revert <commit>", desc: "Revert a commit" },
          { cmd: "git stash", desc: "Stash changes" },
          { cmd: "git stash pop", desc: "Apply stashed changes" }
        ]
      },
      {
        category: "Remote",
        commands: [
          { cmd: "git remote -v", desc: "List remotes" },
          { cmd: "git remote add origin <url>", desc: "Add remote" },
          { cmd: "git fetch origin", desc: "Fetch from remote" }
        ]
      }
    ];
    const filteredCommands = computed(() => {
      if (!searchQuery.value) return gitCommands;
      return gitCommands.map((cat) => ({
        ...cat,
        commands: cat.commands.filter(
          (c) => c.cmd.toLowerCase().includes(searchQuery.value.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })).filter((cat) => cat.commands.length > 0);
    });
    const copyCommand = (cmd) => {
      navigator.clipboard.writeText(cmd);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Git Cheat Sheet</h1></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: "Search commands...",
                    class: "w-full",
                    "aria-label": "Search Git commands"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), {
                      modelValue: searchQuery.value,
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      placeholder: "Search commands...",
                      class: "w-full",
                      "aria-label": "Search Git commands"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: "Search commands...",
                    class: "w-full",
                    "aria-label": "Search Git commands"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(filteredCommands.value, (category) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          key: category.category
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-lg" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.category)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.category), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(category.category), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(category.commands, (item, idx) => {
                      _push3(`<div class="p-2 rounded bg-muted hover:bg-muted/80 transition-colors group cursor-pointer"${_scopeId2}><code class="text-sm font-mono break-all"${_scopeId2}>${ssrInterpolate(item.cmd)}</code><div class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(item.desc)}</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(category.commands, (item, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "p-2 rounded bg-muted hover:bg-muted/80 transition-colors group cursor-pointer",
                          onClick: ($event) => copyCommand(item.cmd)
                        }, [
                          createVNode("code", { class: "text-sm font-mono break-all" }, toDisplayString(item.cmd), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(item.desc), 1)
                        ], 8, ["onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(category.category), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$2), { class: "space-y-3" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(category.commands, (item, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "p-2 rounded bg-muted hover:bg-muted/80 transition-colors group cursor-pointer",
                        onClick: ($event) => copyCommand(item.cmd)
                      }, [
                        createVNode("code", { class: "text-sm font-mono break-all" }, toDisplayString(item.cmd), 1),
                        createVNode("div", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(item.desc), 1)
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/GitMemoView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
