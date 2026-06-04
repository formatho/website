import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, d as _sfc_main$2 } from "./CardFooter-DjcCkgh0.js";
import { a as _sfc_main$3, c as _sfc_main$4 } from "../main.mjs";
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
  __name: "EmojiPickerView",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const selectedEmoji = ref("");
    const copied = ref(false);
    const emojiCategories = [
      {
        name: "Smileys",
        emojis: [
          { emoji: "😀", name: "Grinning Face" },
          { emoji: "😃", name: "Grinning Face with Big Eyes" },
          { emoji: "😄", name: "Grinning Face with Smiling Eyes" },
          { emoji: "😁", name: "Beaming Face with Smiling Eyes" },
          { emoji: "😅", name: "Grinning Face with Sweat" },
          { emoji: "😂", name: "Face with Tears of Joy" },
          { emoji: "🤣", name: "Rolling on the Floor Laughing" },
          { emoji: "😊", name: "Smiling Face with Smiling Eyes" },
          { emoji: "😇", name: "Smiling Face with Halo" },
          { emoji: "🙂", name: "Slightly Smiling Face" },
          { emoji: "😉", name: "Winking Face" },
          { emoji: "😍", name: "Heart Eyes" },
          { emoji: "🥰", name: "Smiling Face with Hearts" },
          { emoji: "😘", name: "Face Blowing a Kiss" },
          { emoji: "😎", name: "Smiling Face with Sunglasses" },
          { emoji: "🤔", name: "Thinking Face" },
          { emoji: "😴", name: "Sleeping Face" },
          { emoji: "🥺", name: "Pleading Face" }
        ]
      },
      {
        name: "Gestures",
        emojis: [
          { emoji: "👍", name: "Thumbs Up" },
          { emoji: "👎", name: "Thumbs Down" },
          { emoji: "👏", name: "Clapping Hands" },
          { emoji: "🙌", name: "Raising Hands" },
          { emoji: "🤝", name: "Handshake" },
          { emoji: "✌️", name: "Victory Hand" },
          { emoji: "🤞", name: "Crossed Fingers" },
          { emoji: "👌", name: "OK Hand" },
          { emoji: "🤙", name: "Call Me Hand" },
          { emoji: "💪", name: "Flexed Biceps" },
          { emoji: "✋", name: "Raised Hand" },
          { emoji: "👋", name: "Waving Hand" }
        ]
      },
      {
        name: "Hearts",
        emojis: [
          { emoji: "❤️", name: "Red Heart" },
          { emoji: "🧡", name: "Orange Heart" },
          { emoji: "💛", name: "Yellow Heart" },
          { emoji: "💚", name: "Green Heart" },
          { emoji: "💙", name: "Blue Heart" },
          { emoji: "💜", name: "Purple Heart" },
          { emoji: "🖤", name: "Black Heart" },
          { emoji: "🤍", name: "White Heart" },
          { emoji: "💔", name: "Broken Heart" },
          { emoji: "❣️", name: "Heart Exclamation" },
          { emoji: "💕", name: "Two Hearts" },
          { emoji: "💖", name: "Sparkling Heart" }
        ]
      },
      {
        name: "Animals",
        emojis: [
          { emoji: "🐶", name: "Dog Face" },
          { emoji: "🐱", name: "Cat Face" },
          { emoji: "🐭", name: "Mouse Face" },
          { emoji: "🐹", name: "Hamster" },
          { emoji: "🐰", name: "Rabbit Face" },
          { emoji: "🦊", name: "Fox" },
          { emoji: "🐻", name: "Bear" },
          { emoji: "🐼", name: "Panda" },
          { emoji: "🦁", name: "Lion" },
          { emoji: "🐯", name: "Tiger Face" },
          { emoji: "🦄", name: "Unicorn" },
          { emoji: "🐸", name: "Frog" }
        ]
      },
      {
        name: "Objects",
        emojis: [
          { emoji: "💻", name: "Laptop" },
          { emoji: "📱", name: "Mobile Phone" },
          { emoji: "⌨️", name: "Keyboard" },
          { emoji: "🖥️", name: "Desktop Computer" },
          { emoji: "🖱️", name: "Computer Mouse" },
          { emoji: "💾", name: "Floppy Disk" },
          { emoji: "📷", name: "Camera" },
          { emoji: "📚", name: "Books" },
          { emoji: "📝", name: "Memo" },
          { emoji: "📎", name: "Paperclip" },
          { emoji: "✂️", name: "Scissors" },
          { emoji: "📦", name: "Package" }
        ]
      }
    ];
    const filteredCategories = computed(() => {
      if (!searchQuery.value) return emojiCategories;
      return emojiCategories.map((cat) => ({
        ...cat,
        emojis: cat.emojis.filter(
          (e) => e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })).filter((cat) => cat.emojis.length > 0);
    });
    const copyEmoji = (emoji) => {
      navigator.clipboard.writeText(emoji);
      selectedEmoji.value = emoji;
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Emoji Picker</h1>`);
      if (copied.value) {
        _push(`<div class="text-sm text-green-600">Copied!</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: "Search emojis...",
                    class: "w-full",
                    "aria-label": "Search emojis"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), {
                      modelValue: searchQuery.value,
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      placeholder: "Search emojis...",
                      class: "w-full",
                      "aria-label": "Search emojis"
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
                    placeholder: "Search emojis...",
                    class: "w-full",
                    "aria-label": "Search emojis"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(filteredCategories.value, (category) => {
        _push(`<div class="space-y-2"><h3 class="text-lg font-semibold">${ssrInterpolate(category.name)}</h3>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pt-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(category.emojis, (item) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        key: item.emoji,
                        onClick: ($event) => copyEmoji(item.emoji),
                        variant: "ghost",
                        size: "icon",
                        class: "text-2xl p-2",
                        title: item.name
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.emoji)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.emoji), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(category.emojis, (item) => {
                          return openBlock(), createBlock(unref(_sfc_main$4), {
                            key: item.emoji,
                            onClick: ($event) => copyEmoji(item.emoji),
                            variant: "ghost",
                            size: "icon",
                            class: "text-2xl p-2",
                            title: item.name
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.emoji), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "title"]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), { class: "pt-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(category.emojis, (item) => {
                        return openBlock(), createBlock(unref(_sfc_main$4), {
                          key: item.emoji,
                          onClick: ($event) => copyEmoji(item.emoji),
                          variant: "ghost",
                          size: "icon",
                          class: "text-2xl p-2",
                          title: item.name
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.emoji), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "title"]);
                      }), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/EmojiPickerView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
