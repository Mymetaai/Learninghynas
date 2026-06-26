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
        // Primary text / full-page background (near-black, warm).
        ink: "#1F2421",
        // Card / journal-page surface — used on cards, never a full page.
        paper: "#F1E9D8",
        // Secondary text, disabled states.
        pencil: "#7A7066",
        // Primary accent — buttons, current path, flame icon.
        terracotta: "#C1502E",
        // Secondary accent — info states, water / night motifs.
        "teal-deep": "#1C5C5C",
        // Highlight accent — XP, coins, correct-answer glow.
        marigold: "#E8A33D",
      },

      // ── Font families (self-hosted via @fontsource — see main.tsx) ──
      fontFamily: {
        // Display: titles only. Fraunces, heavy weight.
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        // Body: story text, UI copy. Inter.
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // HUD/data: XP, timers, counters. JetBrains Mono.
        hud: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
