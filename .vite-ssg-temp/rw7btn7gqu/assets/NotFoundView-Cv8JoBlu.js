import { defineComponent, onMounted, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import { f as useTwins, c as _sfc_main$1 } from "../main.mjs";
import { ArrowLeft, Home } from "lucide-vue-next";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFoundView",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { summonTwin } = useTwins();
    useHead({
      meta: [
        { name: "robots", content: "noindex, nofollow" }
      ]
    });
    onMounted(() => {
      summonTwin("morpho", "I folded this wrong. This page doesn't exist.", "404-error", {
        x: "center",
        y: 100
      });
    });
    const goBack = () => {
      router.back();
    };
    const goHome = () => {
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center p-4" }, _attrs))}><div class="max-w-lg w-full text-center"><h1 class="text-8xl md:text-9xl font-bold text-muted-foreground/20 mb-4" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100"> 404 </h1><h2 class="text-2xl md:text-3xl font-bold mb-4" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"> Page Not Found </h2><p class="text-muted-foreground mb-8" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300"> The page you&#39;re looking for doesn&#39;t exist or has been moved. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: goBack,
        variant: "outline",
        class: "gap-2",
        "aria-label": "Go back to previous page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Go Back `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
              createTextVNode(" Go Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: goHome,
        class: "gap-2",
        "aria-label": "Go to home page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Home), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Back to Home `);
          } else {
            return [
              createVNode(unref(Home), { class: "w-4 h-4" }),
              createTextVNode(" Back to Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-12 pt-8 border-t border-border" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500"><p class="text-sm text-muted-foreground mb-4">Looking for something specific?</p><div class="flex flex-wrap justify-center gap-4 text-sm">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` All Tools `);
          } else {
            return [
              createTextVNode(" All Tools ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/about",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About `);
          } else {
            return [
              createTextVNode(" About ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/contact",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact `);
          } else {
            return [
              createTextVNode(" Contact ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/NotFoundView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
