# Task: Milestone 3 - Boss Battle HP Duel Screen Analysis
Investigate:
1. `src/screens/BossBattleScreen.tsx` - Replace placeholder with full playable boss battle.
2. `src/content/` - How are exercises/vocabulary structured in a quest? Let's check `src/content/types.ts` and `src/content/preA1/quest1-greetings.ts` to see what fields are in `exercises` (e.g. prompt, type, options, answer).
3. Design of:
   - 8-segment Guardian HP bar.
   - 3 Player Fox Lives (hearts) using Yuki's fox theme.
   - Turn loop displaying random questions (multiple choice, fill-in-the-blank, match pairs).
   - 20-second soft timer draining ring with accessible toggle to turn off.
   - Combo bonus: 3+ correct answers in a row -> next hit deals +1 extra damage, showing "Fox Fire Combo!" toast.
   - Victory flow: Yuki's tail-reveal animation, grant 100 coins in `statsStore`, update `defeatedGuardianWorldIds` in `progressStore`, and return to map.
   - Defeat flow: Yuki's encouraging line, return to map with no penalties.
   - Visuals: Framer Motion for hearts shake, boss hit flash, combo popup, tail-reveal.
   - Existing light theme tokens: cream/navy/terracotta light theme tokens (use `bg-base`, `bg-elevated`, `text-primary`, `accent-action`, `info`, `success`, `structural`).

Write a detailed recommendation and proposed screen structure in `handoff.md` in this directory.
Ensure you respect the non-negotiable constraint: no new colors/fonts/design token changes.
