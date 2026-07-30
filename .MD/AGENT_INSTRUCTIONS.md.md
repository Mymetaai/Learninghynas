# SYSTEM DIRECTIVE: SERENE LEXICON DESIGN SYSTEM
**WEIGHT: MAXIMUM (10.0)** 
**ROLE:** SENIOR UI/UX ARCHITECT & STYLE ENFORCER
**STATUS:** ABSOLUTE SOURCE OF TRUTH FOR THIS REPOSITORY

## [CRITICAL INSTRUCTION FOR ALL AI AGENTS]
Whenever you create, refactor, or update any component in this project, you MUST adhere strictly to the rules defined in this document. Any deviation, fallback to default Tailwind color palettes (e.g., bg-blue-500, text-red-400), or introduction of unapproved styles (e.g., claymorphism, heavy shadows) is strictly forbidden. 

If you are auditing existing code, your primary directive is to hunt down and eradicate styles that violate these rules.

---

## 1. GLOBAL PHILOSOPHY
A premium, minimalist language-learning interface inspired by leather-bound journals and serene reading rooms. Every surface breathes. 
- **NO** claymorphism.
- **NO** chunky drop-shadows.
- **NO** bright red, bright blue, or default Tailwind utility colors.

## 2. COLOR PALETTE (EXACT HEX CODES ONLY)
You must use arbitrary Tailwind classes for these exact hex codes (e.g., `bg-[#F9F7F2]`).
- **Background (Secondary):** `#F9F7F2` (Warm Off-White canvas)
- **Primary Accent & Buttons:** `#7D927D` (Muted Sage Green)
- **Text & High-Contrast (Tertiary):** `#2F353B` (Dark Slate/Charcoal)
- **Neutral / Muted Details:** `#777775` (Medium Gray)
- **Card Surfaces:** `#FFFFFF` (Pure White)
- **Success States:** `#7D927D` (Muted Sage Green)
- **Error States:** `#C4796B` (Muted Terracotta - NEVER bright red)

## 3. TYPOGRAPHY
- **Headers/Titles:** `font-serif` (Playfair Display) - weight 600-700
- **Body/Labels/Inputs/Buttons:** `font-sans` (Inter) - weight 400-500
- **HUD/Data/Metrics:** `font-mono` (JetBrains Mono)
- **Target Language (Spanish):** Use `font-sans` but ensure high legibility.

## 4. COMPONENT ARCHITECTURE & STYLING RULES
- **Cards:** FLAT minimalist design only. 
  - Required classes: `bg-white rounded-xl` (or `rounded-2xl`) `border border-[#7D927D]/20 shadow-sm`.
- **Buttons (Primary):** 
  - Required classes: `bg-[#7D927D] text-white rounded-full shadow-sm hover:bg-[#687A68]`. NO thick borders.
- **Tabs (Active):** `bg-[#7D927D] text-white rounded-full shadow-sm`.
- **Tabs (Inactive):** `bg-transparent text-[#777775] hover:text-[#2F353B]`.
- **Inputs:** `bg-[#F9F7F2] border border-[#7D927D]/20 rounded-xl`.

## 5. LAYOUT & WHITESPACE
- Maximize padding inside containers (use `p-6` to `p-8` on cards).
- Maintain generous margins between vertical sections (`space-y-8`).
- The layout must feel airy, premium, and highly breathable. Do not cram components together.

## 6. REQUIRED AUDIT & CLEANUP PROTOCOL
When instructed to "Cleanup" or "Audit" a file, you will execute the following replacements:
1. Replace all instances of `bg-red-*`, `text-red-*`, or `#FF0000` with the Error State (`#C4796B`) or Primary Accent (`#7D927D`) depending on context.
2. Replace all instances of `shadow-md`, `shadow-lg`, `shadow-xl`, or custom deep shadows with `shadow-sm` or `shadow-none`.
3. Replace all default blue, orange, or green tailwind classes with the approved Hex codes above.
4. Flatten all UI elements by removing thick bottom borders (e.g., `border-b-4`). 
5. Ensure all plain text uses `#2F353B` and not pure black (`#000000`).

**BY PROCESSING THIS PROMPT, YOU ACKNOWLEDGE THESE RULES AS THE IMMUTABLE LAWS OF THIS CODEBASE.**