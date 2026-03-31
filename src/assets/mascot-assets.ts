/**
 * Formatho Origami Character SVG Assets
 * Premium, enterprise-grade geometric mascots
 * All SVGs use viewBox="0 0 24 24" with fill="currentColor" and stroke="none"
 */

// ============================================================
// FLOWTHO - The Guide
// A geometric, folded wave representing flow and guidance
// ============================================================
export const flowthoSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Base wave fold -->
  <path d="M2 16L6 12L10 16L14 8L18 14L22 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Secondary wave (depth layer) -->
  <path d="M2 20L6 16L10 20L14 12L18 18L22 14" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
  <!-- Fold accent -->
  <path d="M6 12L6 8L10 12" fill="currentColor" opacity="0.2"/>
  <path d="M14 8L14 4L18 8" fill="currentColor" opacity="0.2"/>
  <!-- Flow particles -->
  <circle cx="4" cy="14" r="1" fill="currentColor" opacity="0.6"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8"/>
  <circle cx="20" cy="12" r="1" fill="currentColor" opacity="0.6"/>
</svg>`

// ============================================================
// MORPHO - The Builder
// A sharp, angular origami fox head representing transformation
// ============================================================
export const morphoSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Fox head base -->
  <path d="M12 3L4 9V15L12 21L20 15V9L12 3Z" fill="currentColor" opacity="0.15"/>
  <!-- Left ear (folded) -->
  <path d="M4 9L2 4L8 7L4 9Z" fill="currentColor" opacity="0.8"/>
  <path d="M3 6L4 9L6 8" fill="currentColor" opacity="0.3"/>
  <!-- Right ear (folded) -->
  <path d="M20 9L22 4L16 7L20 9Z" fill="currentColor" opacity="0.8"/>
  <path d="M21 6L20 9L18 8" fill="currentColor" opacity="0.3"/>
  <!-- Snout -->
  <path d="M12 12L9 15L12 18L15 15L12 12Z" fill="currentColor" opacity="0.6"/>
  <!-- Eyes -->
  <circle cx="9" cy="11" r="1" fill="currentColor"/>
  <circle cx="15" cy="11" r="1" fill="currentColor"/>
  <!-- Fold lines -->
  <path d="M12 3L12 12" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <path d="M8 7L12 12L16 7" stroke="currentColor" stroke-width="0.5" opacity="0.3" fill="none"/>
</svg>`

// ============================================================
// MEMO - The Memory Keeper
// A blocky, folded origami elephant representing memory
// ============================================================
export const memoSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Body base (folded cube) -->
  <path d="M12 6L18 10V18L12 22L6 18V10L12 6Z" fill="currentColor" opacity="0.15"/>
  <!-- Top face -->
  <path d="M12 6L18 10L12 14L6 10L12 6Z" fill="currentColor" opacity="0.3"/>
  <!-- Left face -->
  <path d="M6 10L12 14V22L6 18V10Z" fill="currentColor" opacity="0.25"/>
  <!-- Right face -->
  <path d="M18 10L12 14V22L18 18V10Z" fill="currentColor" opacity="0.2"/>
  <!-- Trunk (geometric fold) -->
  <path d="M12 14L10 18L12 20L14 16L12 14Z" fill="currentColor" opacity="0.5"/>
  <!-- Memory blocks (data representation) -->
  <rect x="10" y="9" width="2" height="2" fill="currentColor" opacity="0.8"/>
  <rect x="12" y="9" width="2" height="2" fill="currentColor" opacity="0.6"/>
  <rect x="11" y="11" width="2" height="2" fill="currentColor" opacity="0.7"/>
  <!-- Fold accents -->
  <path d="M12 6L12 14" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
  <path d="M6 10L18 10" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
</svg>`

// ============================================================
// NEXO - The Connector
// A sleek, geometric origami crane representing connection
// ============================================================
export const nexoSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Body spine -->
  <path d="M12 4V20" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
  <!-- Left wing (folded) -->
  <path d="M12 8L4 12L8 16L12 12" fill="currentColor" opacity="0.3"/>
  <path d="M12 10L6 12L10 14L12 12" fill="currentColor" opacity="0.5"/>
  <!-- Right wing (folded) -->
  <path d="M12 8L20 12L16 16L12 12" fill="currentColor" opacity="0.25"/>
  <path d="M12 10L18 12L14 14L12 12" fill="currentColor" opacity="0.4"/>
  <!-- Head/neck -->
  <path d="M12 4L10 6L12 8L14 6L12 4Z" fill="currentColor" opacity="0.7"/>
  <!-- Beak -->
  <path d="M12 4L12 2L14 4L12 4Z" fill="currentColor" opacity="0.9"/>
  <!-- Tail -->
  <path d="M12 16L10 20L12 22L14 20L12 16Z" fill="currentColor" opacity="0.4"/>
  <!-- Connection nodes -->
  <circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.6"/>
  <circle cx="16" cy="14" r="1" fill="currentColor" opacity="0.6"/>
  <!-- Fold lines -->
  <path d="M12 8L12 16" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
</svg>`

// ============================================================
// HALO - The Onboarding Guide
// A soft, glowing, folded origami dove representing guidance
// ============================================================
export const haloSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer glow rings -->
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.15"/>
  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.25"/>
  <!-- Body (folded teardrop) -->
  <path d="M12 4C16 4 18 8 18 12C18 16 15 20 12 20C9 20 6 16 6 12C6 8 8 4 12 4Z" fill="currentColor" opacity="0.15"/>
  <!-- Left wing fold -->
  <path d="M12 10L4 12L8 16L12 12L12 10Z" fill="currentColor" opacity="0.4"/>
  <path d="M10 11L6 12L9 14L10 11Z" fill="currentColor" opacity="0.6"/>
  <!-- Right wing fold -->
  <path d="M12 10L20 12L16 16L12 12L12 10Z" fill="currentColor" opacity="0.35"/>
  <path d="M14 11L18 12L15 14L14 11Z" fill="currentColor" opacity="0.55"/>
  <!-- Head -->
  <circle cx="12" cy="7" r="2" fill="currentColor" opacity="0.5"/>
  <!-- Eye -->
  <circle cx="12" cy="7" r="0.8" fill="currentColor" opacity="0.9"/>
  <!-- Halo ring -->
  <ellipse cx="12" cy="4" rx="3" ry="1" stroke="currentColor" stroke-width="1" fill="none" opacity="0.7"/>
  <!-- Inner glow accent -->
  <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
  <!-- Soft fold lines -->
  <path d="M12 8L12 18" stroke="currentColor" stroke-width="0.5" opacity="0.25"/>
</svg>`

// ============================================================
// CSS KEYFRAME ANIMATIONS (as string for reference)
// ============================================================
export const mascotAnimations = `
/* Flowtho - Gentle wave breathing animation */
@keyframes wave-breathe {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
}

/* Morpho - Fast folding/unfolding flicker */
@keyframes fox-morph {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  25% {
    opacity: 0.85;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.01);
  }
  75% {
    opacity: 0.9;
    transform: scale(0.99);
  }
}

/* Nexo - Crane wing flap pivot */
@keyframes crane-flap {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(3deg);
  }
}

/* Memo - Memory pulse */
@keyframes memory-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.03);
    filter: brightness(1.1);
  }
}

/* Halo - Soft glow float */
@keyframes dove-glow {
  0%, 100% {
    transform: translateY(0);
    filter: drop-shadow(0 0 8px currentColor);
  }
  50% {
    transform: translateY(-3px);
    filter: drop-shadow(0 0 16px currentColor);
  }
}
`

// ============================================================
// Export all SVGs as a map for easy access
// ============================================================
export const mascotSvgs = {
  flowtho: flowthoSvg,
  morpho: morphoSvg,
  memo: memoSvg,
  nexo: nexoSvg,
  halo: haloSvg
}

// Type exports for TypeScript
export type MascotName = 'flowtho' | 'morpho' | 'memo' | 'nexo' | 'halo'
