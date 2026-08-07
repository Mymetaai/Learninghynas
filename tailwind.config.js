/** @type {import('tailwindcss').Config} */
//
// Serene Lexicon Design System — TheLearningHyena
// All visual identity lives here; do not scatter hardcoded colors/fonts
// across components. Use canonical hex values (#7D927D, #2F353B, etc.) in code.
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
        serif: ['"Fraunces"', '"Playfair Display"', 'ui-serif', 'serif'],
        sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        fraunces: ['"Fraunces"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        target: ['"Atkinson Hyperlegible Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],

        // LEGACY aliases
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hud: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
