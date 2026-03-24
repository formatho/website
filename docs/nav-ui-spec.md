# Navigation UI Specification

> **Document Created:** March 24, 2026  
> **Purpose:** Audit and document Tailwind CSS classes for top navigation bar standardization

---

## Component Location

- **File:** `src/components/Navbar.vue`
- **Type:** Vue 3 Single File Component with `<script setup>`
- **Framework:** Vue Router (`RouterLink`)

---

## Standard Nav Links

Applies to: Home, About Us, Tools (dropdown trigger), GitHub, Blogs

### Tailwind Classes

```
text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-white rounded-lg py-2 px-3
```

### Class Breakdown

| Class | Purpose | CSS Variable/Value |
|-------|---------|-------------------|
| `text-sm` | Font size (14px) | — |
| `font-medium` | Font weight (500) | — |
| `text-muted-foreground` | Text color | `hsl(215 16% 47%)` → `#64748b` (Slate-500) |
| `transition-all` | Transition all properties | — |
| `duration-300` | Transition duration (300ms) | — |
| `hover:-translate-y-0.5` | Lift effect on hover (-2px) | — |
| `hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]` | Subtle shadow on hover | — |
| `hover:bg-white` | White background on hover | `#ffffff` |
| `rounded-lg` | Border radius | `var(--radius)` → `0.5rem` |
| `py-2` | Vertical padding (8px) | — |
| `px-3` | Horizontal padding (12px) | — |

### Mobile Variant (same classes, block display)

```
block px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-white rounded-lg
```

---

## Primary CTA Button (Pricing)

### Tailwind Classes

```
text-sm font-medium bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg rounded-lg py-2 px-3
```

### Class Breakdown

| Class | Purpose | CSS Variable/Value |
|-------|---------|-------------------|
| `text-sm` | Font size (14px) | — |
| `font-medium` | Font weight (500) | — |
| `bg-primary` | Background color | `hsl(0 0% 9%)` → `#171717` (Premium Black) |
| `text-primary-foreground` | Text color | `hsl(0 0% 100%)` → `#ffffff` (White) |
| `transition-all` | Transition all properties | — |
| `duration-300` | Transition duration (300ms) | — |
| `hover:-translate-y-0.5` | Lift effect on hover (-2px) | — |
| `hover:shadow-lg` | Large shadow on hover | `0 10px 15px -3px rgba(0,0,0,0.1)` |
| `rounded-lg` | Border radius | `var(--radius)` → `0.5rem` |
| `py-2` | Vertical padding (8px) | — |
| `px-3` | Horizontal padding (12px) | — |

### Mobile Variant

```
block px-3 py-2 text-sm font-medium bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg rounded-lg mt-2
```

Note: Mobile variant adds `mt-2` (margin-top: 8px) for spacing in the mobile menu.

---

## Key Differences

| Property | Standard Nav Link | Primary CTA Button |
|----------|------------------|-------------------|
| Background | Transparent → `hover:bg-white` | `bg-primary` (#171717) |
| Text Color | `text-muted-foreground` (#64748b) | `text-primary-foreground` (#ffffff) |
| Hover Shadow | Subtle (`0_2px_8px_rgba(0,0,0,0.05)`) | Larger (`shadow-lg`) |
| Visual Weight | Low (text only) | High (solid button) |

---

## CSS Variables Reference

From `src/style.css`:

```css
:root {
  --primary: 0 0% 9%;           /* #171717 - Premium black */
  --primary-foreground: 0 0% 100%; /* #ffffff - White */
  --muted-foreground: 215 16% 47%; /* #64748b - Slate-500 */
  --radius: 0.5rem;
}
```

---

## Proposed Change: Pricing to Standard Link

To convert the Pricing button to match standard navigation links, replace:

```diff
- class="text-sm font-medium bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg rounded-lg py-2 px-3"
+ class="text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-white rounded-lg py-2 px-3"
```

### Desktop (line ~132 in Navbar.vue)

```vue
<RouterLink
  to="/pricing"
  class="text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-white rounded-lg py-2 px-3"
>
  Pricing
</RouterLink>
```

### Mobile (line ~207 in Navbar.vue)

```vue
<RouterLink
  to="/pricing"
  @click="isMobileMenuOpen = false"
  class="block px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-white rounded-lg"
>
  Pricing
</RouterLink>
```

---

## Files Affected

| File | Change Required |
|------|----------------|
| `src/components/Navbar.vue` | Update Pricing `RouterLink` classes (2 instances: desktop + mobile) |

---

## Validation Checklist

Before deploying the change:

- [ ] Visual: Pricing link matches other nav items
- [ ] Hover: Standard hover state (bg-white + subtle shadow)
- [ ] Click: Navigation works correctly
- [ ] Mobile: Mobile menu variant also updated
- [ ] Accessibility: Contrast ratio meets WCAG AA (current: #64748b on white = 4.54:1 ✓)

---

*Document prepared for Task: Top Navigation UI Standardization*
