# Setup: UI/UX Skills for Antigravity + the prompt to use them

## Step 1 — Install ui-ux-pro-max (confirmed Antigravity support)

```bash
npm install -g ui-ux-pro-max-cli
cd /path/to/learning-hyena
uipro init --ai antigravity
```

This installs to `.agents/skills/ui-ux-pro-max/`. It auto-activates whenever
you ask for UI/UX work — no slash command needed on Antigravity.

## Step 2 — Get 21st.dev components into your agent

Go to https://21st.dev/mcp and click the **MCP** tab (not Claude/Cursor/etc,
since Antigravity isn't a listed preset). Copy the JSON config shown there
and add it wherever Antigravity manages MCP servers/tools. If Antigravity
doesn't yet support custom MCP servers, fall back to the CLI:

```bash
npx 21st-cli login
npx 21st-cli add <component-name>
```

You'll need a free 21st.dev account; search is free, installing components
is 2/day free then paid.

## Step 3 — motion-framer (uncertain native support, two options)

**Try first:** copy the skill folder directly into Antigravity's skill
directory, mirroring the pattern ui-ux-pro-max uses:

```bash
mkdir -p .agents/skills/motion-framer
curl -o .agents/skills/motion-framer/SKILL.md \
  https://raw.githubusercontent.com/freshtechbro/claudedesignskills/main/.claude/skills/motion-framer/SKILL.md
```

**If Antigravity doesn't pick it up automatically:** it's still just a
markdown file — reference it directly in prompts (see below), and
Antigravity can read it as project documentation even without treating it
as a formal "skill."

---

## The prompt to give Antigravity

```
Use the ui-ux-pro-max skill for every UI/UX task in this project from now
on — design system reasoning, color/typography choices, and anti-pattern
checks should all go through it, not ad-hoc choices.

Before building any new UI component from scratch, check 21st.dev first
(via the MCP tool or `21st-cli add`) for an existing, well-built component
that fits — buttons, cards, modals, form inputs, etc. Only build custom
when nothing suitable exists there. Always still restyle whatever you pull
in to match our existing design tokens (see below) — don't ship a
21st.dev component in its default theme.

For animations and micro-interactions (the Guardian node pulse, the
tail-reveal moment, hover/tap states on shop items, page transitions),
follow the patterns in .agents/skills/motion-framer/SKILL.md — use Motion
(Framer Motion) components, not raw CSS transitions, for anything beyond a
simple hover color change.

Non-negotiable constraint: do NOT let any of these tools introduce a new
color palette, font, or design language. This project already has an
established cream/navy/terracotta light theme with existing tokens
(bg-base, bg-elevated, text-primary, accent-action, info, success,
structural). Every component pulled from 21st.dev or generated via
ui-ux-pro-max must be restyled to use these existing tokens before it's
considered done. If ui-ux-pro-max's design system generator suggests a
different palette or font, ignore that suggestion and keep our existing
one — only use its structural/pattern/accessibility recommendations, not
its color output.

Apply this to [describe the specific screen — e.g. "the Shop tab" or "the
Guardian Battle screen we just spec'd"].
```

Fill in the last line with whatever specific screen you're pointing it at
— don't run this prompt against the whole app at once, or you'll get 6
screens' worth of half-integrated changes to review at the same time.
