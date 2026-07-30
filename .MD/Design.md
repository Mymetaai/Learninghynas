Serene Lexicon Design System — TheLearningHyena

Philosophy
A premium, minimalist language-learning interface inspired by leather-bound journals and serene reading rooms. Every surface breathes. No claymorphism, no chunky drop-shadows, no bright red.

Color Palette
- Background (Secondary): `#F9F7F2` — Warm Off-White canvas
- Primary Accent / Buttons: `#7D927D` — Muted Sage Green
- Text & High-Contrast (Tertiary): `#2F353B` — Dark Slate/Charcoal
- Neutral / Muted Details: `#777775` — Medium Gray
- Card Surfaces: `#FFFFFF` — Pure White, delicate 1px border of `rgba(125,146,125,0.2)`
- Success states: `#7D927D` (same as primary)
- Error states: `#C4796B` — Muted Terracotta (never bright red)

Typography
- Headers/Titles: Playfair Display (serif) — weight 600-700
- Body/Labels/Inputs: Inter (sans-serif) — weight 400-500
- HUD/Data: JetBrains Mono (monospace)
- Target Language: Atkinson Hyperlegible Next

Component Styling Rules
- FLAT minimalist design only
- Cards: `rounded-xl` or `rounded-2xl`, `bg-white`, `border border-[#7D927D]/20`, `shadow-sm`
- Buttons: `rounded-full`, `bg-[#7D927D]`, `text-white`, `shadow-sm`, NO thick borders
- Active tab indicator: `bg-[#7D927D]`, `text-white`, `rounded-full`, subtle shadow
- Inactive tabs: `text-[#777775]`, hover → `text-[#2F353B]`
- Inputs: `bg-[#F9F7F2]`, `border border-[#7D927D]/20`, `rounded-xl`, subtle focus ring
- No claymorphism, no chunky box-shadows, no `border-2`, no bright colors

Whitespace
- Maximize padding (`p-6` to `p-8` on cards)
- Generous margins between sections (`space-y-8`)
- Airy, premium, breathable layout

Animations
- Subtle hover lifts (`translateY(-2px)`, `shadow-md`)
- Smooth transitions (`transition-all duration-200`)
- Framer Motion for page transitions and micro-interactions