import { defineComponent, ref, reactive, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { RouterLink } from "vue-router";
import { u as useSEO, i as useEmailCapture, _ as _export_sfc } from "../main.mjs";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
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
  __name: "GetVerifiedView",
  __ssrInlineRender: true,
  setup(__props) {
    useSEO({
      title: "Get Verified - RWA Verification Engine | Formatho",
      description: "The new standard for Real World Asset verification. Privacy-first, trustless verification for RWA tokenization. Coming soon.",
      keywords: ["RWA verification", "real world assets", "tokenization", "privacy-first", "blockchain verification", "get verified"],
      ogType: "website"
    });
    const { email, isValidEmail } = useEmailCapture();
    ref("get-verified");
    const fullName = ref("");
    const companyName = ref("");
    const lookingFor = ref("");
    const formError = ref("");
    const formSubmitting = ref(false);
    const formSuccess = ref(false);
    const isFormValid = () => {
      return fullName.value.trim() && companyName.value.trim() && email.value.trim() && lookingFor.value.trim() && isValidEmail.value;
    };
    const heroLines = [
      { text: "Reality", visible: false },
      { text: "is about to", visible: false },
      { text: "get on-chain.", visible: false }
    ];
    const activeRevealIndex = ref(-1);
    const revealPhase = ref("idle");
    const displayedText = ref("");
    const isSequenceComplete = ref(false);
    const revealStrings = [
      "Right now, we're building the bridge between the physical and the programmable...",
      "We're building a way to answer: Does the asset exist, and who actually owns it?",
      "We're building systems to verify that a registry document exists in reality, and matches the metadata perfectly.",
      "We're building a way to answer: Is the code secure and compliant?",
      "We're building automated checks to ensure your smart contract code matches known, bulletproof secure standards.",
      "We're building a way to answer: Does the token match reality?",
      "We're building cryptographic proofs that a wallet address belongs to the exact individual who signed the message.",
      "We're building the new standard for RWA trust."
    ];
    const sectionVisibility = reactive({
      hero: false,
      reveal: false,
      privacy: false,
      pillars: false,
      cta: false
    });
    const scrollY = ref(0);
    const mousePos = reactive({ x: 0, y: 0 });
    let sequenceTimer = null;
    const typeText = (text, index, charIndex = 0) => {
      if (index !== activeRevealIndex.value) return;
      if (charIndex <= text.length) {
        displayedText.value = text.slice(0, charIndex);
        revealPhase.value = "typing";
        sequenceTimer = setTimeout(() => typeText(text, index, charIndex + 1), 22);
      } else {
        revealPhase.value = "visible";
        const holdTime = index === revealStrings.length - 1 ? 3e3 : 2400;
        sequenceTimer = setTimeout(() => {
          if (index !== activeRevealIndex.value) return;
          revealPhase.value = "fading";
          sequenceTimer = setTimeout(() => {
            if (index === revealStrings.length - 1) {
              isSequenceComplete.value = true;
              revealPhase.value = "visible";
              displayedText.value = text;
              return;
            }
            activeRevealIndex.value++;
            displayedText.value = "";
            revealPhase.value = "typing";
            typeText(revealStrings[activeRevealIndex.value], activeRevealIndex.value);
          }, 500);
        }, holdTime);
      }
    };
    const startSequence = () => {
      activeRevealIndex.value = 0;
      displayedText.value = "";
      revealPhase.value = "typing";
      typeText(revealStrings[0], 0);
    };
    const handleScroll = () => {
      scrollY.value = window.scrollY;
      const sections = ["hero", "reveal", "privacy", "pillars", "cta"];
      sections.forEach((id) => {
        const el = document.getElementById(`${id}-section`);
        if (el) {
          const rect = el.getBoundingClientRect();
          sectionVisibility[id] = rect.top < window.innerHeight * 0.82;
        }
      });
    };
    const handleMouseMove = (e) => {
      mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    onMounted(() => {
      heroLines.forEach((_, i) => {
        setTimeout(() => {
          heroLines[i].visible = true;
        }, 300 + i * 200);
      });
      setTimeout(startSequence, 1400);
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      handleScroll();
    });
    onUnmounted(() => {
      if (sequenceTimer) clearTimeout(sequenceTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "get-verified-page min-h-screen bg-background overflow-hidden" }, _attrs))} data-v-dceeffa4><div class="fixed inset-0 pointer-events-none overflow-hidden z-0" data-v-dceeffa4><div class="floating-shape shape-ring-1 absolute -top-20 -right-20 w-[500px] h-[500px] border border-foreground/8 rounded-full" style="${ssrRenderStyle({ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15 + scrollY.value * 0.05}px)` })}" data-v-dceeffa4></div><div class="floating-shape shape-dots absolute top-1/3 -left-10 w-[200px] h-[200px]" style="${ssrRenderStyle({ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10 + scrollY.value * -0.08}px)` })}" data-v-dceeffa4><div class="absolute top-0 left-0 w-2 h-2 bg-foreground/10 rounded-full" data-v-dceeffa4></div><div class="absolute top-8 left-12 w-1.5 h-1.5 bg-foreground/8 rounded-full" data-v-dceeffa4></div><div class="absolute top-4 left-6 w-3 h-3 border border-foreground/10 rounded-full" data-v-dceeffa4></div><div class="absolute top-16 left-4 w-1 h-1 bg-foreground/15 rounded-full" data-v-dceeffa4></div><div class="absolute top-12 left-16 w-2 h-2 border border-foreground/6 rounded-full" data-v-dceeffa4></div></div><div class="floating-shape shape-ring-2 absolute -bottom-40 -left-40 w-[400px] h-[400px] border border-foreground/6 rounded-full" style="${ssrRenderStyle({ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8 + scrollY.value * -0.03}px)` })}" data-v-dceeffa4></div><div class="floating-shape shape-cross absolute top-2/3 right-[15%] opacity-[0.06]" style="${ssrRenderStyle({ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px) rotate(45deg)` })}" data-v-dceeffa4><div class="w-16 h-px bg-foreground" data-v-dceeffa4></div><div class="w-px h-16 bg-foreground absolute top-0 left-1/2 -translate-x-1/2" data-v-dceeffa4></div></div><div class="floating-shape shape-grid absolute bottom-[10%] right-[5%] opacity-[0.04]" style="${ssrRenderStyle({ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8 + scrollY.value * 0.02}px)` })}" data-v-dceeffa4><div class="grid grid-cols-4 gap-4" data-v-dceeffa4><!--[-->`);
      ssrRenderList(16, (n) => {
        _push(`<div class="w-1 h-1 bg-foreground rounded-full" data-v-dceeffa4></div>`);
      });
      _push(`<!--]--></div></div></div><section id="hero-section" class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6" data-v-dceeffa4><div class="text-center max-w-5xl" data-v-dceeffa4><h1 class="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] mb-8" data-v-dceeffa4><!--[-->`);
      ssrRenderList(heroLines, (line, i) => {
        _push(`<span class="${ssrRenderClass([line.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", "hero-line block transition-all duration-700 ease-out"])}" data-v-dceeffa4>`);
        if (i === 2) {
          _push(`<span class="gradient-text" data-v-dceeffa4>${ssrInterpolate(line.text)}</span>`);
        } else {
          _push(`<span data-v-dceeffa4>${ssrInterpolate(line.text)}</span>`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></h1><p class="${ssrRenderClass([heroLines[2]?.visible ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-4", "text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700 mb-8"])}" data-v-dceeffa4> The ultimate verification standard for Real World Asset tokenization is loading. </p><div class="${ssrRenderClass([heroLines[2]?.visible ? "opacity-60 translate-y-0 delay-700" : "opacity-0 translate-y-4", "inline-flex items-center gap-3 border border-foreground/20 rounded-full px-5 py-2 bg-background/80 backdrop-blur-sm transition-all duration-700"])}" data-v-dceeffa4><span class="relative flex h-2 w-2" data-v-dceeffa4><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40" data-v-dceeffa4></span><span class="relative inline-flex rounded-full h-2 w-2 bg-foreground" data-v-dceeffa4></span></span><span class="text-[10px] font-mono font-bold tracking-[3px] uppercase" data-v-dceeffa4>Building</span></div></div><div class="${ssrRenderClass([heroLines[2]?.visible ? "opacity-40" : "opacity-0", "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000"])}" data-v-dceeffa4><span class="text-[9px] font-mono tracking-[4px] uppercase" data-v-dceeffa4>Scroll</span><div class="w-px h-8 bg-foreground/30 relative overflow-hidden" data-v-dceeffa4><div class="w-full h-3 bg-foreground animate-scroll-line" data-v-dceeffa4></div></div></div></section><section id="reveal-section" class="relative z-10 py-32 md:py-40 px-6" data-v-dceeffa4><div class="max-w-3xl mx-auto" data-v-dceeffa4><div class="${ssrRenderClass([sectionVisibility.reveal ? "opacity-100" : "opacity-0", "flex items-center gap-4 mb-20 transition-all duration-700"])}" data-v-dceeffa4><div class="h-px w-8 bg-foreground/30" data-v-dceeffa4></div><span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60" data-v-dceeffa4>What we&#39;re building</span></div><div class="min-h-[200px] flex items-start" data-v-dceeffa4><p class="${ssrRenderClass([{
        "opacity-0 translate-y-3": revealPhase.value === "idle" || revealPhase.value === "fading",
        "opacity-100 translate-y-0": revealPhase.value === "typing" || revealPhase.value === "visible"
      }, "text-lg md:text-2xl lg:text-[1.75rem] font-semibold leading-[1.5] tracking-tight transition-all duration-500 ease-out"])}" data-v-dceeffa4><span class="text-muted-foreground/30 font-mono text-xs align-top mr-3 font-normal select-none" data-v-dceeffa4>${ssrInterpolate(activeRevealIndex.value >= 0 ? String(activeRevealIndex.value + 1).padStart(2, "0") : "")}</span><span data-v-dceeffa4>${ssrInterpolate(displayedText.value)}</span>`);
      if (revealPhase.value === "typing") {
        _push(`<span class="inline-block w-[2px] h-5 bg-foreground/70 ml-0.5 animate-pulse align-middle" data-v-dceeffa4></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><div class="mt-16 flex items-center gap-3" data-v-dceeffa4><div class="flex-1 h-px bg-foreground/10 relative overflow-hidden rounded-full" data-v-dceeffa4><div class="absolute left-0 top-0 h-full bg-foreground/40 transition-all duration-500 ease-out rounded-full" style="${ssrRenderStyle({ width: `${(activeRevealIndex.value + 1) / revealStrings.length * 100}%` })}" data-v-dceeffa4></div></div><span class="text-[10px] font-mono text-muted-foreground/40 tabular-nums" data-v-dceeffa4>${ssrInterpolate(activeRevealIndex.value >= 0 ? `${activeRevealIndex.value + 1}/${revealStrings.length}` : "")}</span></div>`);
      if (isSequenceComplete.value) {
        _push(`<div class="mt-8" data-v-dceeffa4><button class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-300" data-v-dceeffa4> ↻ Replay </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section id="privacy-section" class="relative z-10 py-32 md:py-40 px-6" data-v-dceeffa4><div class="max-w-4xl mx-auto" data-v-dceeffa4><div class="${ssrRenderClass([sectionVisibility.privacy ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12", "transition-all duration-1000 ease-out"])}" data-v-dceeffa4><div class="flex items-center gap-4 mb-20" data-v-dceeffa4><div class="h-px w-8 bg-foreground/30" data-v-dceeffa4></div><span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60" data-v-dceeffa4>Privacy Architecture</span></div><div class="mb-16" data-v-dceeffa4><h2 class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]" data-v-dceeffa4> We don&#39;t store <br data-v-dceeffa4>your data. <br data-v-dceeffa4><span class="text-muted-foreground/40" data-v-dceeffa4>We verify its truth.</span></h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20" data-v-dceeffa4><p class="text-base text-muted-foreground leading-[1.8]" data-v-dceeffa4> Our verification engine is built on a fundamental principle: sensitive information should never leave your control. We construct cryptographic proofs of validity, confirming identity, ownership, and compliance, without ever exposing the underlying data. </p><p class="text-base text-muted-foreground leading-[1.8]" data-v-dceeffa4> No centralized databases. No third-party custodians. No trust assumptions. Just math, verified on-chain, readable by anyone who needs to know, and invisible to everyone who doesn&#39;t. </p></div></div></div></section><section id="pillars-section" class="relative z-10 py-16 md:py-24 px-6" data-v-dceeffa4><div class="${ssrRenderClass([sectionVisibility.pillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12", "max-w-5xl mx-auto transition-all duration-1000 ease-out"])}" data-v-dceeffa4><div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10" data-v-dceeffa4><div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500" data-v-dceeffa4><div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors" data-v-dceeffa4><span class="text-lg" data-v-dceeffa4>ZK</span></div><h3 class="text-sm font-black tracking-wide uppercase mb-3" data-v-dceeffa4>Zero-Knowledge Proofs</h3><p class="text-sm text-muted-foreground leading-relaxed" data-v-dceeffa4>Verify without revealing. Prove existence without exposing contents.</p></div><div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500" data-v-dceeffa4><div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors" data-v-dceeffa4><span class="text-lg font-mono text-xs" data-v-dceeffa4>&lt;/&gt;</span></div><h3 class="text-sm font-black tracking-wide uppercase mb-3" data-v-dceeffa4>Client-Side First</h3><p class="text-sm text-muted-foreground leading-relaxed" data-v-dceeffa4>All processing happens locally. Your data never touches our servers.</p></div><div class="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors duration-500" data-v-dceeffa4><div class="w-10 h-10 border border-foreground/20 rounded-lg flex items-center justify-center mb-6 group-hover:border-foreground/40 transition-colors" data-v-dceeffa4><span class="text-lg" data-v-dceeffa4>✓</span></div><h3 class="text-sm font-black tracking-wide uppercase mb-3" data-v-dceeffa4>Audit-Ready</h3><p class="text-sm text-muted-foreground leading-relaxed" data-v-dceeffa4>Every verification generates a tamper-proof record. Compliance, built in.</p></div></div></div></section><section id="cta-section" class="relative z-10 py-32 md:py-40 px-6" data-v-dceeffa4><div class="${ssrRenderClass([sectionVisibility.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12", "max-w-xl mx-auto text-center transition-all duration-1000 ease-out"])}" data-v-dceeffa4><div class="flex items-center justify-center gap-4 mb-16" data-v-dceeffa4><div class="h-px w-8 bg-foreground/30" data-v-dceeffa4></div><span class="text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/60" data-v-dceeffa4>Early Access</span><div class="h-px w-8 bg-foreground/30" data-v-dceeffa4></div></div><h2 class="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.05]" data-v-dceeffa4> Get early access to the <span class="gradient-text" data-v-dceeffa4>verification engine.</span></h2><p class="text-sm text-muted-foreground mb-12 leading-relaxed" data-v-dceeffa4> Join the inner circle. Be the first to know when we launch, and shape how verification works for RWA. </p>`);
      if (!formSuccess.value) {
        _push(`<div class="max-w-md mx-auto text-left" data-v-dceeffa4><div class="space-y-4 mb-6" data-v-dceeffa4><div class="border border-foreground/20 rounded-xl overflow-hidden focus-within:border-foreground/50 transition-colors" data-v-dceeffa4><input${ssrRenderAttr("value", fullName.value)} type="text" placeholder="Full Name *" required class="w-full px-5 py-4 bg-transparent text-sm font-mono focus:outline-none placeholder:text-muted-foreground/30 border-b border-foreground/10" data-v-dceeffa4><input${ssrRenderAttr("value", companyName.value)} type="text" placeholder="Company Name *" required class="w-full px-5 py-4 bg-transparent text-sm font-mono focus:outline-none placeholder:text-muted-foreground/30 border-b border-foreground/10" data-v-dceeffa4><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="Email Address *" required class="w-full px-5 py-4 bg-transparent text-sm font-mono focus:outline-none placeholder:text-muted-foreground/30 border-b border-foreground/10" data-v-dceeffa4><textarea placeholder="What are you looking for? *" required rows="3" class="w-full px-5 py-4 bg-transparent text-sm font-mono focus:outline-none placeholder:text-muted-foreground/30 resize-none" data-v-dceeffa4>${ssrInterpolate(lookingFor.value)}</textarea></div></div><button${ssrIncludeBooleanAttr(!isFormValid() || formSubmitting.value) ? " disabled" : ""} class="w-full px-6 py-4 bg-foreground text-background text-[11px] font-bold tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed rounded-xl" data-v-dceeffa4>${ssrInterpolate(formSubmitting.value ? "Submitting..." : "Submit")}</button></div>`);
      } else {
        _push(`<div class="max-w-md mx-auto" data-v-dceeffa4><div class="inline-flex items-center gap-3 border border-foreground/30 rounded-full px-6 py-3" data-v-dceeffa4><span class="text-sm" data-v-dceeffa4>✓</span><span class="text-sm font-mono" data-v-dceeffa4>You&#39;re on the list. We&#39;ll be in touch.</span></div></div>`);
      }
      if (formError.value) {
        _push(`<p class="text-xs text-red-500/70 font-mono mt-4" data-v-dceeffa4>${ssrInterpolate(formError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-[9px] font-mono text-muted-foreground/25 tracking-[2px] uppercase mt-10" data-v-dceeffa4> No spam. We respect your inbox like we respect your data. </p></div></section><div class="relative z-10 py-16 text-center border-t border-foreground/8" data-v-dceeffa4>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/",
        class: "text-[10px] font-mono tracking-[3px] uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to Formatho `);
          } else {
            return [
              createTextVNode(" ← Back to Formatho ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/GetVerifiedView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GetVerifiedView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dceeffa4"]]);
export {
  GetVerifiedView as default
};
