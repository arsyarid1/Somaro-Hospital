---
name: apple-design
description: Use when designing or implementing Apple-style user interfaces, web applications, landing pages, or digital products following Apple Human Interface Guidelines (HIG), minimalist typography, fluid spring animations, glassmorphism materials, bento grid layouts, and luxury digital craftsmanship.
argument-hint: "[component, page, or style guideline]"
license: MIT
metadata:
  author: somaro-design-kit
  version: "1.0.0"
---

# Apple Design System & Craftsmanship Skill

Comprehensive guidelines, design tokens, and implementation patterns for crafting modern web applications and interfaces inspired by Apple's design philosophy and the Apple Human Interface Guidelines (HIG).

---

## 1. Core Philosophy & Tenets

Apple design is not merely minimalism; it is **intentional deference**, **material authenticity**, and **emotional clarity**.

### The Three Foundational HIG Tenets:
1. **Clarity (Kejelasan):**
   - Text is legible at every size, icons are precise and lucent, adornments are subtle, and functional focus drives the layout.
   - Negative space (*whitespace*) is an active architectural element, not just empty area.
2. **Deference (Keramahan & Penghormatan Konten):**
   - Fluid motion and a crisp interface help users understand and interact with content without competing with it.
   - Subtle translucent materials reflect the underlying background without dominating.
3. **Depth (Kedalaman Visual):**
   - Distinct visual layers, subtle specular borders, and realistic lighting establish hierarchy and communicate relationships.

---

## 2. Visual Tokens & Specifications

### A. Typography Hierarchy
Always prioritize Apple system font stacks (`SF Pro Display`, `SF Pro Text`, `-apple-system`, `BlinkMacSystemFont`):

```css
/* Typography Scale */
--font-display-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);  /* Letter-spacing: -0.025em */
--font-headline:     clamp(1.75rem, 3vw + 0.5rem, 2.75rem); /* Letter-spacing: -0.02em */
--font-title:        1.25rem - 1.5rem;                       /* Letter-spacing: -0.015em */
--font-body:         0.9375rem - 1rem;                       /* Line-height: 1.5 - 1.6 */
--font-caption:      0.75rem - 0.8125rem;                    /* Letter-spacing: 0.01em */
```

- **Headings:** Use tight negative letter spacing (`tracking-tight` or `-0.02em`) with medium to bold weights (`font-semibold` / `font-bold`).
- **Body:** Use balanced tracking (`tracking-normal`) and relaxed line heights (`leading-relaxed`) for comfortable reading.
- **Micro-labels / Badges:** Uppercase, wide tracking (`tracking-widest` or `0.08em`), small sizes (`text-[10px]` - `text-xs`).

### B. Materials & Translucency (Frosted Glass)
Apple's signature frosted glass uses backdrop filters with subtle multi-layer borders:

```css
/* Ultra-thin Material (Navbar, Overlays) */
.glass-apple {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* Dark Mode Frosted Glass */
.glass-apple-dark {
  background: rgba(28, 28, 30, 0.72);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### C. Shadows & Specular Highlights
Apple cards do not use harsh drop shadows; they use ambient multi-stop diffusion:

```css
/* Multi-layer Ambient Shadows */
.shadow-apple {
  box-shadow: 
    0 2px 8px -2px rgba(0, 0, 0, 0.04),
    0 12px 32px -4px rgba(0, 0, 0, 0.06);
}

.shadow-apple-hover {
  box-shadow: 
    0 8px 16px -4px rgba(0, 0, 0, 0.04),
    0 24px 48px -8px rgba(0, 0, 0, 0.1);
}
```

### D. Continuous Curvature (Squircles)
- Cards & Modals: `rounded-3xl` (`24px` - `28px`).
- Buttons & Badges: `rounded-full` (`9999px`) or `rounded-2xl` (`16px`).
- Icons: `rounded-xl` (`12px` - `14px`).

---

## 3. Layout Patterns

### A. The Bento Grid
Showcase features through asymmetric modular cards with a dominant hero tile:
- **Card 1 (Hero Spotlight):** Spans 2 columns or larger height with high contrast / interactive element.
- **Cards 2 & 3 (Supporting):** Single columns focusing on concise metrics, icons, or quick toggles.
- **Card 4 (Detail):** Wide bottom tile with horizontal layout.

### B. Sticky Frosted Header
- Sticky header floating with `top-0` or `top-4` (floating pill style).
- Transparent on top of page, transitions to frosted blur upon scroll (`scrollY > 20px`).
- Contains logo on left, minimal pill links in center, primary rounded CTA on right.

---

## 4. Animation & Micro-interactions

### A. Apple Spring Physics (Framer Motion)
```ts
export const appleSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8
};

export const appleEase = [0.16, 1, 0.3, 1]; // Apple HIG cubic-bezier
```

### B. Micro-interactions
- **Hover Scale:** `hover:scale-[1.02] active:scale-[0.98]`
- **Smooth Elevation:** `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`
- **Fade Reveal:** Reveal content with subtle Y translation (8px - 16px), not jarring jumps.

---

## 5. Implementation Code Patterns (Tailwind CSS)

### Apple-Style Pill Button
```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold tracking-wide shadow-apple transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
  <span>Explore Features</span>
  <ChevronRight className="w-4 h-4 text-stone-300" />
</button>
```

### Apple-Style Interactive Card
```tsx
<div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/70 p-8 shadow-apple hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1 group">
  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900 group-hover:scale-110 transition-transform">
    <Icon className="w-6 h-6" />
  </div>
  <h3 className="text-xl font-bold text-stone-900 tracking-tight mt-6">
    Feature Title
  </h3>
  <p className="text-sm text-stone-500 leading-relaxed mt-2">
    Precise description crafted with clarity and deference.
  </p>
</div>
```

---

## 6. Design Audit & Quality Checklist

Before finalizing any UI screen claiming Apple-design quality:
- [ ] **Whitespace Breathing Room:** Is padding at least `p-6` to `p-10` on key container cards?
- [ ] **Font Contrast & Hierarchy:** Is there clear distinction between titles (`tracking-tight`) and captions (`tracking-wider`)?
- [ ] **Subtle Border Definition:** Are cards framed by light, translucent borders (`border-white/20` or `border-stone-200/60`) instead of heavy black lines?
- [ ] **Continuous Corner Radii:** Are corners smooth (`rounded-2xl` / `rounded-3xl`) without sharp edges?
- [ ] **Smooth Transitions:** Do all hover and press states have fluid damping (`active:scale-[0.98]`)?
- [ ] **Touch Target Safety:** Are interactive buttons and clickable areas at least `44x44px`?
