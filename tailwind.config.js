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

      // ── Font families (self-hosted via @fontsource or Google Fonts) ──
      fontFamily: {
        // Display: titles only. Fraunces, heavy weight.
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        // Body: story text, UI copy. Inter.
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Target: Any Spanish/target language text. Atkinson Hyperlegible Next.
        target: ['"Atkinson Hyperlegible Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // HUD/data: XP, timers, counters. JetBrains Mono.
        hud: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
