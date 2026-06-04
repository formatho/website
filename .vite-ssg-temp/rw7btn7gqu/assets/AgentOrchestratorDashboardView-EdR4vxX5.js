import { defineComponent, ref, computed, watch, onMounted, onUnmounted, unref, useSSRContext, mergeProps, createVNode, resolveDynamicComponent, resolveComponent, withCtx, createTextVNode } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { XIcon, InfoIcon, Loader2Icon, MoreVerticalIcon, EyeIcon, UserIcon, ShieldIcon, MailIcon, UserMinusIcon, UsersIcon, SearchIcon, LayoutDashboard } from "lucide-vue-next";
import { g as cn, c as _sfc_main$5, _ as _export_sfc } from "../main.mjs";
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InvitationModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    organizationId: {},
    isLoading: { type: Boolean, default: false },
    defaultRole: { default: "member" }
  },
  emits: ["update:isOpen", "invite", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const email = ref("");
    const role = ref(props.defaultRole);
    const emailError = ref("");
    const modalRef = ref(null);
    const isValidEmail = computed(() => {
      if (!email.value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.value);
    });
    const canSubmit = computed(() => {
      return isValidEmail.value && !props.isLoading;
    });
    const roleDescriptions = {
      admin: "Can manage team members, view all analytics, and configure agents",
      member: "Can create tasks, run agents, and view basic analytics",
      viewer: "Can only view dashboards and reports, no write access"
    };
    const handleSubmit = () => {
      if (!canSubmit.value) return;
      emailError.value = "";
      emit("invite", { email: email.value, role: role.value });
    };
    const close = () => {
      emit("update:isOpen", false);
    };
    const resetForm = () => {
      email.value = "";
      role.value = props.defaultRole;
      emailError.value = "";
    };
    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        resetForm();
        setTimeout(() => {
          const emailInput = modalRef.value?.querySelector('input[type="email"]');
          emailInput?.focus();
        }, 100);
      }
    });
    const handleKeydown = (e) => {
      if (!props.isOpen) return;
      if (e.key === "Escape") {
        close();
      }
      if (e.key === "Enter" && canSubmit.value) {
        handleSubmit();
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">`);
          if (__props.isOpen) {
            _push2(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700"><h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white"> Invite Team Member </h2><button class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close modal">`);
            _push2(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
            _push2(`</button></div><form class="px-6 py-4 space-y-4"><div><label for="invite-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Email Address </label><input id="invite-email"${ssrRenderAttr("value", email.value)} type="email" placeholder="colleague@example.com"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="${ssrRenderClass(unref(cn)(
              "w-full px-4 py-2.5 rounded-lg border transition-colors",
              "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
              "placeholder-gray-400 dark:placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              emailError.value ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
            ))}">`);
            if (emailError.value) {
              _push2(`<p class="mt-1 text-sm text-red-600 dark:text-red-400">${ssrInterpolate(emailError.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div><label for="invite-role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Role </label><select id="invite-role"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="${ssrRenderClass(unref(cn)(
              "w-full px-4 py-2.5 rounded-lg border transition-colors",
              "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
              "border-gray-300 dark:border-gray-600",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            ))}"><option value="member"${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "member") : ssrLooseEqual(role.value, "member")) ? " selected" : ""}>Member</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "admin") : ssrLooseEqual(role.value, "admin")) ? " selected" : ""}>Admin</option><option value="viewer"${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "viewer") : ssrLooseEqual(role.value, "viewer")) ? " selected" : ""}>Viewer</option></select></div><div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="flex items-start gap-2">`);
            _push2(ssrRenderComponent(unref(InfoIcon), { class: "w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }, null, _parent));
            _push2(`<p class="text-sm text-blue-800 dark:text-blue-200">${ssrInterpolate(roleDescriptions[role.value])}</p></div></div></form><div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"><button type="button"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""} class="${ssrRenderClass(unref(cn)(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-200 dark:hover:bg-gray-700",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            ))}"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(!canSubmit.value) ? " disabled" : ""} class="${ssrRenderClass(unref(cn)(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              "bg-blue-600 text-white",
              "hover:bg-blue-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-2"
            ))}">`);
            if (__props.isLoading) {
              _push2(ssrRenderComponent(unref(Loader2Icon), { class: "w-4 h-4 animate-spin" }, null, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.isLoading ? "Sending..." : "Send Invite")}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/team/InvitationModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RoleBadge",
  __ssrInlineRender: true,
  props: {
    role: {},
    size: { default: "md" }
  },
  setup(__props) {
    const props = __props;
    const sizeClasses = computed(() => {
      switch (props.size) {
        case "sm":
          return "px-2 py-0.5 text-xs";
        case "lg":
          return "px-3 py-1 text-base";
        default:
          return "px-2.5 py-0.5 text-sm";
      }
    });
    const roleClasses = computed(() => {
      switch (props.role) {
        case "owner":
          return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
        case "admin":
          return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
        case "member":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
        case "viewer":
          return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      }
    });
    const roleLabel = computed(() => {
      return props.role.charAt(0).toUpperCase() + props.role.slice(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "inline-flex items-center font-medium rounded-full capitalize",
          sizeClasses.value,
          roleClasses.value
        )
      }, _attrs))}>${ssrInterpolate(roleLabel.value)}</span>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/team/RoleBadge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TeamMemberCard",
  __ssrInlineRender: true,
  props: {
    member: {},
    canManage: { type: Boolean, default: false },
    isCurrentUser: { type: Boolean, default: false }
  },
  emits: ["update-role", "remove", "resend-invite"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const showMenu = ref(false);
    const displayName = computed(() => {
      return props.member.name || props.member.email.split("@")[0];
    });
    const initials = computed(() => {
      const name = displayName.value;
      return name.charAt(0).toUpperCase();
    });
    const statusColor = computed(() => {
      switch (props.member.status) {
        case "active":
          return "bg-green-500";
        case "pending":
          return "bg-yellow-500";
        case "inactive":
          return "bg-gray-400";
        default:
          return "bg-gray-400";
      }
    });
    const formattedDate = computed(() => {
      const date = props.member.joinedAt || props.member.invitedAt;
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    });
    const statusText = computed(() => {
      switch (props.member.status) {
        case "active":
          return "Active";
        case "pending":
          return "Pending";
        case "inactive":
          return "Inactive";
        default:
          return "";
      }
    });
    computed(() => {
      return props.canManage && !props.isCurrentUser && props.member.role !== "owner";
    });
    const availableRoles = ["admin", "member", "viewer"];
    const roleIcons = {
      owner: ShieldIcon,
      admin: ShieldIcon,
      member: UserIcon,
      viewer: EyeIcon
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg",
          "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        )
      }, _attrs))}><div class="flex items-center gap-3"><div class="relative">`);
      if (__props.member.avatar) {
        _push(`<div class="w-10 h-10 rounded-full bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${__props.member.avatar})` })}"></div>`);
      } else {
        _push(`<div class="${ssrRenderClass(unref(cn)(
          "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm",
          "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
        ))}">${ssrInterpolate(initials.value)}</div>`);
      }
      _push(`<span class="${ssrRenderClass(unref(cn)(
        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
        statusColor.value
      ))}"></span></div><div class="flex flex-col"><div class="flex items-center gap-2"><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(displayName.value)}</span>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        role: __props.member.role,
        size: "sm"
      }, null, _parent));
      _push(`</div><span class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.member.email)}</span><span class="text-xs text-gray-400 dark:text-gray-500">${ssrInterpolate(__props.member.joinedAt ? "Joined" : "Invited")} ${ssrInterpolate(formattedDate.value)} • ${ssrInterpolate(statusText.value)}</span></div></div>`);
      if (__props.canManage && !__props.isCurrentUser && __props.member.role !== "owner") {
        _push(`<div class="relative"><button class="${ssrRenderClass(unref(cn)(
          "p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ))}" aria-label="Member actions">`);
        _push(ssrRenderComponent(unref(MoreVerticalIcon), { class: "w-5 h-5 text-gray-500 dark:text-gray-400" }, null, _parent));
        _push(`</button>`);
        if (showMenu.value) {
          _push(`<div class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"><div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"> Change Role </div><!--[-->`);
          ssrRenderList(availableRoles, (role) => {
            _push(`<button class="${ssrRenderClass(unref(cn)(
              "w-full flex items-center gap-2 px-3 py-2 text-sm",
              "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              __props.member.role === role && "bg-gray-100 dark:bg-gray-700"
            ))}">`);
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(roleIcons[role]), { class: "w-4 h-4" }, null), _parent);
            _push(`<span class="capitalize">${ssrInterpolate(role)}</span>`);
            if (__props.member.role === role) {
              _push(`<span class="ml-auto text-blue-600">✓</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</button>`);
          });
          _push(`<!--]--><div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>`);
          if (__props.member.status === "pending") {
            _push(`<button class="${ssrRenderClass(unref(cn)(
              "w-full flex items-center gap-2 px-3 py-2 text-sm",
              "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            ))}">`);
            _push(ssrRenderComponent(unref(MailIcon), { class: "w-4 h-4" }, null, _parent));
            _push(`<span>Resend Invite</span></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="${ssrRenderClass(unref(cn)(
            "w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600",
            "hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          ))}">`);
          _push(ssrRenderComponent(unref(UserMinusIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`<span>Remove</span></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/team/TeamMemberCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TeamMemberList",
  __ssrInlineRender: true,
  props: {
    members: {},
    organizationId: {},
    currentUserId: {},
    isLoading: { type: Boolean, default: false },
    canManage: { type: Boolean, default: false }
  },
  emits: ["update-role", "remove", "resend-invite"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref("");
    const roleFilter = ref("all");
    const statusFilter = ref("all");
    const sortBy = ref("recent");
    const filteredMembers = computed(() => {
      let result = [...props.members];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
          (m) => m.email.toLowerCase().includes(query) || m.name?.toLowerCase().includes(query)
        );
      }
      if (roleFilter.value !== "all") {
        result = result.filter((m) => m.role === roleFilter.value);
      }
      if (statusFilter.value !== "all") {
        result = result.filter((m) => m.status === statusFilter.value);
      }
      switch (sortBy.value) {
        case "recent":
          result.sort((a, b) => {
            const dateA = new Date(a.joinedAt || a.invitedAt).getTime();
            const dateB = new Date(b.joinedAt || b.invitedAt).getTime();
            return dateB - dateA;
          });
          break;
        case "name":
          result.sort((a, b) => {
            const nameA = a.name || a.email;
            const nameB = b.name || b.email;
            return nameA.localeCompare(nameB);
          });
          break;
        case "role": {
          const roleOrder = ["owner", "admin", "member", "viewer"];
          result.sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
          break;
        }
      }
      return result;
    });
    const memberCount = computed(() => props.members.length);
    const filteredCount = computed(() => filteredMembers.value.length);
    const handleUpdateRole = (memberId, role) => {
      emit("update-role", { memberId, role });
    };
    const handleRemove = (memberId) => {
      emit("remove", memberId);
    };
    const handleResendInvite = (memberId) => {
      emit("resend-invite", memberId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(UsersIcon), { class: "w-5 h-5 text-gray-500 dark:text-gray-400" }, null, _parent));
      _push(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"> Team Members <span class="text-gray-500 dark:text-gray-400 font-normal"> (${ssrInterpolate(memberCount.value)}) </span></h3></div><div class="relative">`);
      _push(ssrRenderComponent(unref(SearchIcon), { class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search members..." class="${ssrRenderClass(unref(cn)(
        "pl-9 pr-4 py-2 rounded-lg border transition-colors w-full sm:w-64",
        "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
        "border-gray-300 dark:border-gray-600",
        "placeholder-gray-400 dark:placeholder-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ))}"></div></div><div class="flex flex-wrap items-center gap-3"><select class="${ssrRenderClass(unref(cn)(
        "px-3 py-1.5 rounded-lg border text-sm transition-colors",
        "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300",
        "border-gray-300 dark:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-blue-500"
      ))}"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "all") : ssrLooseEqual(roleFilter.value, "all")) ? " selected" : ""}>All Roles</option><option value="owner"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "owner") : ssrLooseEqual(roleFilter.value, "owner")) ? " selected" : ""}>Owner</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "admin") : ssrLooseEqual(roleFilter.value, "admin")) ? " selected" : ""}>Admin</option><option value="member"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "member") : ssrLooseEqual(roleFilter.value, "member")) ? " selected" : ""}>Member</option><option value="viewer"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "viewer") : ssrLooseEqual(roleFilter.value, "viewer")) ? " selected" : ""}>Viewer</option></select><select class="${ssrRenderClass(unref(cn)(
        "px-3 py-1.5 rounded-lg border text-sm transition-colors",
        "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300",
        "border-gray-300 dark:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-blue-500"
      ))}"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "all") : ssrLooseEqual(statusFilter.value, "all")) ? " selected" : ""}>Any Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "active") : ssrLooseEqual(statusFilter.value, "active")) ? " selected" : ""}>Active</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "pending") : ssrLooseEqual(statusFilter.value, "pending")) ? " selected" : ""}>Pending</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "inactive") : ssrLooseEqual(statusFilter.value, "inactive")) ? " selected" : ""}>Inactive</option></select><select class="${ssrRenderClass(unref(cn)(
        "px-3 py-1.5 rounded-lg border text-sm transition-colors",
        "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300",
        "border-gray-300 dark:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-blue-500"
      ))}"><option value="recent"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "recent") : ssrLooseEqual(sortBy.value, "recent")) ? " selected" : ""}>Most Recent</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "name") : ssrLooseEqual(sortBy.value, "name")) ? " selected" : ""}>Name</option><option value="role"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "role") : ssrLooseEqual(sortBy.value, "role")) ? " selected" : ""}>Role</option></select></div>`);
      if (__props.isLoading) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(unref(Loader2Icon), { class: "w-8 h-8 text-blue-600 animate-spin" }, null, _parent));
        _push(`</div>`);
      } else if (__props.members.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-12 text-center"><div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">`);
        _push(ssrRenderComponent(unref(UsersIcon), { class: "w-8 h-8 text-gray-400" }, null, _parent));
        _push(`</div><h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1"> No team members yet </h4><p class="text-gray-500 dark:text-gray-400 max-w-sm"> Invite team members to collaborate on agents and tasks. </p></div>`);
      } else if (filteredMembers.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-12 text-center"><div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">`);
        _push(ssrRenderComponent(unref(SearchIcon), { class: "w-8 h-8 text-gray-400" }, null, _parent));
        _push(`</div><h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1"> No members found </h4><p class="text-gray-500 dark:text-gray-400 max-w-sm"> Try adjusting your search or filters. </p></div>`);
      } else {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(filteredMembers.value, (member) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: member.id,
            member,
            "can-manage": __props.canManage,
            "is-current-user": member.id === __props.currentUserId,
            onUpdateRole: (role) => handleUpdateRole(member.id, role),
            onRemove: ($event) => handleRemove(member.id),
            onResendInvite: ($event) => handleResendInvite(member.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (filteredMembers.value.length > 0 && (searchQuery.value || roleFilter.value !== "all" || statusFilter.value !== "all")) {
        _push(`<p class="text-sm text-gray-500 dark:text-gray-400 text-center"> Showing ${ssrInterpolate(filteredCount.value)} of ${ssrInterpolate(memberCount.value)} members </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/team/TeamMemberList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgentOrchestratorDashboardView",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const agents = ref([]);
    const activities = ref([]);
    const socket = ref(null);
    const isConnected = ref(false);
    const isTeamModalOpen = ref(false);
    const organizationId = ref("org-123");
    const teamMembers = ref([]);
    const isLoadingMembers = ref(false);
    const isInviting = ref(false);
    const currentUserId = ref("user-1");
    const totalAgents = ref(0);
    const runningAgents = ref(0);
    const totalTasksCompleted = ref(0);
    const avgCpuUsage = ref(0);
    const avgMemoryUsage = ref(0);
    const navigateToAnalytics = () => {
      router.push("/agent-orchestrator/analytics");
    };
    const connectWebSocket = () => {
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      socket.value = new WebSocket(`${wsProtocol}//localhost:8080/ws`);
      socket.value.onopen = () => {
        isConnected.value = true;
        console.log("WebSocket connected");
      };
      socket.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };
      socket.value.onerror = (error) => {
        console.error("WebSocket error:", error);
        isConnected.value = false;
      };
      socket.value.onclose = () => {
        isConnected.value = false;
        setTimeout(connectWebSocket, 3e3);
      };
    };
    const handleWebSocketMessage = (data) => {
      switch (data.type) {
        case "agents_updated":
          agents.value = data.payload;
          updateStats();
          break;
        case "activity_updated":
          activities.value = [data.payload, ...activities.value].slice(0, 50);
          break;
        case "status_changed": {
          const agentIndex = agents.value.findIndex((a) => a.id === data.agentId);
          if (agentIndex !== -1) {
            agents.value[agentIndex].status = data.status;
            updateStats();
          }
          break;
        }
      }
    };
    const updateStats = () => {
      totalAgents.value = agents.value.length;
      runningAgents.value = agents.value.filter((a) => a.status === "running").length;
      totalTasksCompleted.value = agents.value.reduce((sum, a) => sum + a.tasksCompleted, 0);
      if (agents.value.length > 0) {
        avgCpuUsage.value = Math.round(agents.value.reduce((sum, a) => sum + a.cpuUsage, 0) / agents.value.length);
        avgMemoryUsage.value = Math.round(agents.value.reduce((sum, a) => sum + a.memoryUsage, 0) / agents.value.length);
      }
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "running":
          return "bg-green-500";
        case "stopped":
          return "bg-gray-500";
        case "error":
          return "bg-red-500";
        case "idle":
          return "bg-yellow-500";
        default:
          return "bg-gray-500";
      }
    };
    const getStatusBadgeColor = (status) => {
      switch (status) {
        case "running":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case "stopped":
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
        case "error":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        case "idle":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    };
    const navigateToAgentDetail = (agentId) => {
      router.push(`/agent-orchestrator/${agentId}`);
    };
    const handleInvite = async (payload) => {
      isInviting.value = true;
      try {
        const response = await fetch(`/api/team/${organizationId.value}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Failed to invite member");
        const data = await response.json();
        if (data.success) {
          teamMembers.value.unshift({
            id: "pending-" + Date.now(),
            email: payload.email,
            role: payload.role,
            status: "pending",
            invitedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
          isTeamModalOpen.value = false;
        }
      } catch (error) {
        console.error("Error inviting member:", error);
      } finally {
        isInviting.value = false;
      }
    };
    const handleRoleUpdate = async ({ memberId, role }) => {
      try {
        const response = await fetch(`/api/team/${organizationId.value}/members/${memberId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role })
        });
        if (!response.ok) throw new Error("Failed to update role");
        const member = teamMembers.value.find((m) => m.id === memberId);
        if (member) {
          member.role = role;
        }
      } catch (error) {
        console.error("Error updating member role:", error);
      }
    };
    const handleRemoveMember = async (memberId) => {
      if (!confirm("Are you sure you want to remove this team member?")) return;
      try {
        const response = await fetch(`/api/team/${organizationId.value}/members/${memberId}`, {
          method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to remove member");
        teamMembers.value = teamMembers.value.filter((m) => m.id !== memberId);
      } catch (error) {
        console.error("Error removing member:", error);
      }
    };
    const handleResendInvite = async (memberId) => {
      try {
        const response = await fetch(`/api/team/${organizationId.value}/members/${memberId}/resend`, {
          method: "POST"
        });
        if (!response.ok) throw new Error("Failed to resend invitation");
        alert("Invitation resent successfully!");
      } catch (error) {
        console.error("Error resending invitation:", error);
      }
    };
    const simulateData = () => {
      agents.value = [
        { id: "1", name: "Content Writer Agent", status: "running", type: "content", lastActive: (/* @__PURE__ */ new Date()).toISOString(), tasksCompleted: 42, cpuUsage: 35, memoryUsage: 128 },
        { id: "2", name: "Data Analyst Agent", status: "idle", type: "analysis", lastActive: new Date(Date.now() - 6e4).toISOString(), tasksCompleted: 18, cpuUsage: 5, memoryUsage: 96 },
        { id: "3", name: "Code Reviewer Agent", status: "running", type: "development", lastActive: (/* @__PURE__ */ new Date()).toISOString(), tasksCompleted: 73, cpuUsage: 42, memoryUsage: 156 },
        { id: "4", name: "Research Bot", status: "error", type: "research", lastActive: new Date(Date.now() - 3e5).toISOString(), tasksCompleted: 5, cpuUsage: 0, memoryUsage: 0 },
        { id: "5", name: "Translation Agent", status: "stopped", type: "translation", lastActive: new Date(Date.now() - 864e5).toISOString(), tasksCompleted: 127, cpuUsage: 0, memoryUsage: 0 }
      ];
      activities.value = [
        { id: "1", timestamp: (/* @__PURE__ */ new Date()).toISOString(), agentId: "3", agentName: "Code Reviewer Agent", action: "task_completed", details: "Reviewed PR #245" },
        { id: "2", timestamp: new Date(Date.now() - 12e4).toISOString(), agentId: "1", agentName: "Content Writer Agent", action: "task_started", details: "Started writing blog post about AI agents" },
        { id: "3", timestamp: new Date(Date.now() - 3e5).toISOString(), agentId: "4", agentName: "Research Bot", action: "error", details: "API rate limit exceeded" },
        { id: "4", timestamp: new Date(Date.now() - 6e5).toISOString(), agentId: "2", agentName: "Data Analyst Agent", action: "task_completed", details: "Analyzed sales data for Q1" }
      ];
      updateStats();
    };
    onMounted(() => {
      connectWebSocket();
      setTimeout(() => {
        if (!isConnected.value) {
          simulateData();
        }
      }, 2e3);
    });
    onUnmounted(() => {
      if (socket.value) {
        socket.value.close();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-38bf0e26><div class="flex items-center justify-between" data-v-38bf0e26><div data-v-38bf0e26><h1 class="text-3xl font-bold text-gray-900 dark:text-white" data-v-38bf0e26>Agent Dashboard</h1><p class="text-gray-600 dark:text-gray-400 mt-1" data-v-38bf0e26>Monitor and manage your AI agents in real-time</p></div><div class="flex items-center gap-3" data-v-38bf0e26>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        onClick: navigateToAnalytics,
        size: "sm",
        "aria-label": "Open analytics dashboard",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Analytics `);
          } else {
            return [
              createVNode(unref(LayoutDashboard), { class: "w-4 h-4" }),
              createTextVNode(" Analytics ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md" data-v-38bf0e26><span class="${ssrRenderClass([
        "w-2.5 h-2.5 rounded-full",
        isConnected.value ? "bg-green-500" : "bg-red-500"
      ])}" data-v-38bf0e26></span><span class="text-sm text-gray-600 dark:text-gray-400" data-v-38bf0e26>${ssrInterpolate(isConnected.value ? "Connected" : "Disconnected")}</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-38bf0e26><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-38bf0e26><div class="flex items-center justify-between" data-v-38bf0e26><div data-v-38bf0e26><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-38bf0e26>Total Agents</p><p class="text-3xl font-bold text-gray-900 dark:text-white mt-2" data-v-38bf0e26>${ssrInterpolate(totalAgents.value)}</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heart",
        class: "w-8 h-8 text-blue-600"
      }, null, _parent));
      _push(`</div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-38bf0e26><div class="flex items-center justify-between" data-v-38bf0e26><div data-v-38bf0e26><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-38bf0e26>Running</p><p class="text-3xl font-bold text-green-600 mt-2" data-v-38bf0e26>${ssrInterpolate(runningAgents.value)}/${ssrInterpolate(totalAgents.value)}</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "play-circle",
        class: "w-8 h-8 text-green-600"
      }, null, _parent));
      _push(`</div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-38bf0e26><div class="flex items-center justify-between" data-v-38bf0e26><div data-v-38bf0e26><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-38bf0e26>Tasks Completed</p><p class="text-3xl font-bold text-purple-600 mt-2" data-v-38bf0e26>${ssrInterpolate(totalTasksCompleted.value)}</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "terminal",
        class: "w-8 h-8 text-purple-600"
      }, null, _parent));
      _push(`</div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" data-v-38bf0e26><div class="flex items-center justify-between" data-v-38bf0e26><div data-v-38bf0e26><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-v-38bf0e26>Avg CPU Usage</p><p class="text-3xl font-bold text-orange-600 mt-2" data-v-38bf0e26>${ssrInterpolate(avgCpuUsage.value)}%</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "cpu",
        class: "w-8 h-8 text-orange-600"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-v-38bf0e26><div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between" data-v-38bf0e26><h2 class="text-lg font-semibold text-gray-900 dark:text-white" data-v-38bf0e26>Active Agents</h2><div class="flex gap-2" data-v-38bf0e26>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        onClick: ($event) => isTeamModalOpen.value = true,
        "aria-label": "Open team collaboration",
        class: "bg-purple-600 hover:bg-purple-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 👥 Team Collaboration (Pro) `);
          } else {
            return [
              createTextVNode(" 👥 Team Collaboration (Pro) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        onClick: simulateData,
        size: "sm",
        "aria-label": "Simulate demo data"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Refresh Data `);
          } else {
            return [
              createTextVNode(" Refresh Data ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="overflow-x-auto" data-v-38bf0e26><table class="w-full" data-v-38bf0e26><thead class="bg-gray-50 dark:bg-gray-900" data-v-38bf0e26><tr data-v-38bf0e26><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Agent</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Type</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>CPU/Mem</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Tasks</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Last Active</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-v-38bf0e26>Actions</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700" data-v-38bf0e26><!--[-->`);
      ssrRenderList(agents.value, (agent) => {
        _push(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors" data-v-38bf0e26><td class="px-6 py-4" data-v-38bf0e26><div class="flex items-center" data-v-38bf0e26><div class="${ssrRenderClass([getStatusColor(agent.status), "w-2 h-2 rounded-full mr-3"])}" data-v-38bf0e26></div><span class="text-sm font-medium text-gray-900 dark:text-white" data-v-38bf0e26>${ssrInterpolate(agent.name)}</span></div></td><td class="px-6 py-4" data-v-38bf0e26><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeColor(agent.status)])}" data-v-38bf0e26>${ssrInterpolate(agent.status)}</span></td><td class="px-6 py-4 text-sm text-gray-900 dark:text-white capitalize" data-v-38bf0e26>${ssrInterpolate(agent.type)}</td><td class="px-6 py-4" data-v-38bf0e26><div class="flex items-center gap-2" data-v-38bf0e26><span class="text-xs text-gray-500 dark:text-gray-400" data-v-38bf0e26>CPU: ${ssrInterpolate(agent.cpuUsage)}%</span><span class="text-xs text-gray-500 dark:text-gray-400" data-v-38bf0e26>Mem: ${ssrInterpolate(agent.memoryUsage)}MB</span></div></td><td class="px-6 py-4 text-sm text-gray-900 dark:text-white" data-v-38bf0e26>${ssrInterpolate(agent.tasksCompleted)}</td><td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400" data-v-38bf0e26>${ssrInterpolate(formatTime(agent.lastActive))}</td><td class="px-6 py-4 text-right text-sm font-medium" data-v-38bf0e26>`);
        _push(ssrRenderComponent(unref(_sfc_main$5), {
          onClick: ($event) => navigateToAgentDetail(agent.id),
          variant: "link",
          class: "text-blue-600 hover:text-blue-900 p-0",
          "aria-label": "View agent details"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View`);
            } else {
              return [
                createTextVNode("View")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (agents.value.length === 0) {
        _push(`<div class="px-6 py-12 text-center" data-v-38bf0e26>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heart",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-500 dark:text-gray-400" data-v-38bf0e26>No agents found. Start an agent to get started.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-v-38bf0e26><div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between" data-v-38bf0e26><h2 class="text-lg font-semibold text-gray-900 dark:text-white" data-v-38bf0e26>Activity Feed</h2>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "clock",
        class: "w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`</div><div class="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto" data-v-38bf0e26><!--[-->`);
      ssrRenderList(activities.value, (activity) => {
        _push(`<div class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" data-v-38bf0e26><div class="flex items-start gap-3" data-v-38bf0e26>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "activity",
          class: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
        }, null, _parent));
        _push(`<div class="flex-1 min-w-0" data-v-38bf0e26><p class="text-sm font-medium text-gray-900 dark:text-white" data-v-38bf0e26>${ssrInterpolate(activity.agentName)}</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5" data-v-38bf0e26>${ssrInterpolate(activity.action.replace("_", " "))}: ${ssrInterpolate(activity.details)}</p><p class="text-xs text-gray-500 dark:text-gray-500 mt-1" data-v-38bf0e26>${ssrInterpolate(new Date(activity.timestamp).toLocaleString())}</p></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (activities.value.length === 0) {
        _push(`<div class="px-6 py-12 text-center" data-v-38bf0e26>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "activity",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-500 dark:text-gray-400" data-v-38bf0e26>No activity recorded yet.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-v-38bf0e26><div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between" data-v-38bf0e26><h2 class="text-lg font-semibold text-gray-900 dark:text-white" data-v-38bf0e26>Team Collaboration</h2>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        onClick: ($event) => isTeamModalOpen.value = true,
        size: "sm",
        "aria-label": "Invite team member"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Invite Member `);
          } else {
            return [
              createTextVNode(" + Invite Member ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-6" data-v-38bf0e26>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        "organization-id": organizationId.value,
        "current-user-id": currentUserId.value,
        "is-loading": isLoadingMembers.value,
        "can-manage": true,
        onUpdateRole: handleRoleUpdate,
        onRemove: handleRemoveMember,
        onResendInvite: handleResendInvite
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "is-open": isTeamModalOpen.value,
        "onUpdate:isOpen": ($event) => isTeamModalOpen.value = $event,
        "organization-id": organizationId.value,
        "is-loading": isInviting.value,
        onInvite: handleInvite
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AgentOrchestratorDashboardView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AgentOrchestratorDashboardView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38bf0e26"]]);
export {
  AgentOrchestratorDashboardView as default
};
