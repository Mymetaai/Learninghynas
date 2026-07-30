/** @type {import('tailwindcss').Config} */
//
// STEP 1 — Design tokens for "The Wayfarer's Notebook".
// All visual identity lives here; do not scatter hardcoded colors/fonts
// across components.
//
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ── Color palette ────────────────────────────────────────────────
      colors: {
        // New system design tokens
        'bg-base': 'var(--bg-base)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-elevated-2': 'var(--bg-elevated-2)',
        'structural': 'var(--structural)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'accent-action': 'var(--accent-action)',
        'accent-action-hover': 'var(--accent-action-hover)',
        success: 'var(--success)',
        error: 'var(--error)',
        info: 'var(--info)',
        'streak-warm': 'var(--streak-warm)',

        // Legacy mappings as fallbacks to ensure compatibility
        ink: 'var(--text-primary)',
        paper: 'var(--bg-elevated)',
        pencil: 'var(--text-secondary)',
        terracotta: 'var(--accent-action)',
        'teal-deep': 'var(--info)',
        marigold: 'var(--accent-action)',
      },

      // ── Font families (Serene Lexicon system) ────────────────────────
      fontFamily: {
        // PRIMARY — use these in all new code:
        // font-serif  → Titles, headings. Playfair Display.
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        // font-sans   → Body text, UI copy. Inter.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // font-mono   → HUD/data: XP, timers, counters. JetBrains Mono.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // font-target → Spanish / target-language text. Atkinson Hyperlegible Next.
        target: ['"Atkinson Hyperlegible Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],

        // LEGACY aliases (backward-compat, will be removed later):
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hud: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
