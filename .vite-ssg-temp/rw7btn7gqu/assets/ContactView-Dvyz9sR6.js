import { defineComponent, computed, onMounted, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { Github, ExternalLink } from "lucide-vue-next";
import { d as useAnalytics } from "../main.mjs";
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
  __name: "ContactView",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { trackContactFormSubmitted } = useAnalytics();
    const planFromQuery = computed(() => route.query.plan);
    onMounted(() => {
      if (planFromQuery.value && ["pro", "enterprise"].includes(planFromQuery.value)) {
        trackContactFormSubmitted(planFromQuery.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-12" }, _attrs))}><div class="max-w-4xl mx-auto"><h1 class="text-5xl font-bold mb-8 text-center">Contact Us</h1><p class="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-12"> Have questions, feedback, or want to contribute? We&#39;d love to hear from you. </p><div class="grid md:grid-cols-2 gap-6 mb-12"><div class="glass-card p-6 hover:border-primary/50 transition-all"><div class="flex items-start gap-4"><div class="p-3 rounded-xl bg-primary/10 shrink-0">`);
      _push(ssrRenderComponent(unref(Github), { class: "text-gray-900" }, null, _parent));
      _push(`</div><div><h3 class="text-xl font-bold mb-2">Open Source</h3><p class="text-muted-foreground mb-4"> Formatho is open source. Report bugs, request features, or contribute code on GitHub. </p><a href="https://github.com/formatho/website" target="_blank" rel="noopener noreferrer" class="text-gray-900"> Visit GitHub Repository `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "w-4 h-4" }, null, _parent));
      _push(`</a></div></div></div><div class="glass-card p-6 hover:border-primary/50 transition-all"><div class="flex items-start gap-4"><div class="p-3 rounded-xl bg-primary/10 shrink-0"><svg class="text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg></div><div><h3 class="text-xl font-bold mb-2">Community</h3><p class="text-muted-foreground mb-4"> Join our community to discuss features, share ideas, and connect with other developers. </p><a href="https://github.com/formatho/website/discussions" target="_blank" rel="noopener noreferrer" class="text-gray-900"> Join Discussions `);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "w-4 h-4" }, null, _parent));
      _push(`</a></div></div></div></div><div class="glass-card p-8 md:p-12"><h2 class="text-2xl font-bold mb-6">Get in Touch</h2><div class="space-y-6 text-muted-foreground"><p class="leading-relaxed"><strong class="text-foreground">For General Inquiries:</strong> We&#39;re a small team dedicated to building privacy-first tools. While we may not be able to respond to every message, we read all feedback and use it to improve our services. </p><p class="leading-relaxed"><strong class="text-foreground">For Bug Reports:</strong> Please open an issue on our GitHub repository. Include as much detail as possible: browser version, steps to reproduce, and expected vs actual behavior. </p><p class="leading-relaxed"><strong class="text-foreground">For Feature Requests:</strong> We love hearing ideas for new tools or improvements! Submit feature requests via GitHub Issues or Discussions. </p><p class="leading-relaxed"><strong class="text-foreground">For Business Inquiries:</strong> While Formatho is primarily a free, open-source project, we&#39;re open to partnerships and collaborations that align with our privacy-first mission. </p></div><div class="mt-8 pt-8 border-t border-border"><h3 class="text-lg font-semibold mb-4">Response Time</h3><p class="text-muted-foreground"> We typically respond to GitHub issues within 24-48 hours. For urgent matters affecting site functionality, please mark your issue as &quot;critical&quot; on GitHub. </p></div></div><div class="mt-12"><h2 class="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2><div class="space-y-4"><div class="glass-card p-6"><h3 class="font-semibold mb-2">Is Formatho really 100% private?</h3><p class="text-sm text-muted-foreground"> Yes! All data processing happens locally in your browser. Your data never leaves your device. See our Privacy Policy for details. </p></div><div class="glass-card p-6"><h3 class="font-semibold mb-2">Are these tools free to use?</h3><p class="text-sm text-muted-foreground"> Yes, all our tools are completely free and open-source. No accounts required, no limitations. </p></div><div class="glass-card p-6"><h3 class="font-semibold mb-2">Can I contribute to Formatho?</h3><p class="text-sm text-muted-foreground"> Absolutely! We welcome contributions. Check our GitHub repository for open issues and contribution guidelines. </p></div></div></div><div class="mt-8 flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/about",
        class: "text-sm text-muted-foreground hover:text-gray-900 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About Us → `);
          } else {
            return [
              createTextVNode(" About Us → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/privacy",
        class: "text-sm text-muted-foreground hover:text-gray-900 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Privacy Policy → `);
          } else {
            return [
              createTextVNode(" Privacy Policy → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_RouterLink, {
        to: "/terms",
        class: "text-sm text-muted-foreground hover:text-gray-900 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms of Service → `);
          } else {
            return [
              createTextVNode(" Terms of Service → ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ContactView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
