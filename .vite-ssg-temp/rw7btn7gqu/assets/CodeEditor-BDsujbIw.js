import { defineComponent, ref, watch, computed, onMounted, nextTick, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CodeEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    language: { default: "json" },
    readonly: { type: Boolean, default: false },
    minHeight: { default: "120px" },
    maxHeight: { default: "500px" },
    lineNumbers: { default: "on" },
    wordWrap: { default: "on" },
    fontSize: { default: 14 },
    showMinimap: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const textarea = ref(null);
    const content = ref(props.modelValue);
    const isFocused = ref(false);
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== content.value) {
          content.value = newValue;
        }
      }
    );
    const lineCount = computed(() => {
      return content.value.split("\n").length;
    });
    const adjustHeight = () => {
      const el = textarea.value;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = Math.max(parseInt(props.minHeight), el.scrollHeight) + "px";
    };
    onMounted(() => {
      adjustHeight();
    });
    watch(content, () => {
      nextTick(adjustHeight);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["code-editor-wrapper rounded-lg overflow-hidden border transition-colors duration-200", isFocused.value ? "border-slate-500" : "border-slate-700"]
      }, _attrs))} data-v-ef8ff5f1><div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700" data-v-ef8ff5f1><span class="text-xs text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-700/50" data-v-ef8ff5f1>${ssrInterpolate(__props.language.toUpperCase())}</span><span class="text-xs text-slate-500" data-v-ef8ff5f1>${ssrInterpolate(lineCount.value)} lines </span></div><div class="flex bg-slate-900" style="${ssrRenderStyle({ minHeight: __props.minHeight, maxHeight: __props.readonly ? __props.minHeight : __props.maxHeight, overflow: "auto" })}" data-v-ef8ff5f1>`);
      if (__props.lineNumbers === "on") {
        _push(`<div class="flex-shrink-0 py-4 px-2 text-right select-none bg-slate-900/50 border-r border-slate-700/50" style="${ssrRenderStyle({ fontSize: __props.fontSize + "px" })}" data-v-ef8ff5f1><!--[-->`);
        ssrRenderList(lineCount.value, (i) => {
          _push(`<div class="text-slate-600 leading-6 font-mono" data-v-ef8ff5f1>${ssrInterpolate(i)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<textarea${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""} class="${ssrRenderClass([
        "w-full py-4 px-3 bg-transparent text-slate-200 resize-none outline-none",
        "font-mono leading-6 placeholder:text-slate-600",
        __props.readonly ? "cursor-default" : ""
      ])}" style="${ssrRenderStyle({ fontSize: __props.fontSize + "px", minHeight: __props.minHeight })}"${ssrRenderAttr("placeholder", __props.readonly ? "No content" : "Type here...")} spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" data-v-ef8ff5f1>${ssrInterpolate(content.value)}</textarea></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CodeEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CodeEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef8ff5f1"]]);
export {
  CodeEditor as C
};
