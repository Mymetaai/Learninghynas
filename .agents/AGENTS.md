# Workspace Customizations & UI Guidelines

## UI/UX & Component Resources
- **21st.dev**: Check [21st.dev](https://21st.dev/) (or `21st-cli`) for existing components (modals, complex inputs, layouts) before building from scratch.
- **Uiverse**: Reference [Uiverse](https://uiverse.io/) for sleek, animated CSS/Tailwind UI elements such as custom buttons, inputs, checkboxes, loaders, hover effects, and card styles.

## Design Constraints (Non-Negotiable)
- All components pulled or adapted from **Uiverse** or **21st.dev** must be restyled to align with the project's established design tokens and cream/navy/terracotta light theme.
- **Design Tokens**:
  - `bg-base`
  - `bg-elevated`
  - `text-primary`
  - `accent-action`
  - `info`
  - `success`
  - `structural`
- Do not introduce new color palettes, fonts, or styling languages.

## Animations & Transitions
- Use `framer-motion` for complex page transitions, micro-interactions (e.g., node pulses, character transitions), and dynamic UI elements, matching the guidelines in `.agents/skills/motion-framer/SKILL.md`.
