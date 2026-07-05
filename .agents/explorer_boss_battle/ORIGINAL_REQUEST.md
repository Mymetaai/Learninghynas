## 2026-07-05T10:01:15Z
You are a teamwork_preview_explorer. Your working directory is c:\Users\ROHITGUPTA\OneDrive - Bar Code India Ltd\Desktop\Web\.agents\explorer_boss_battle.
Your task is to analyze `src/screens/BossBattleScreen.tsx` and design a playable boss battle "HP Duel" screen.
Also inspect the quest exercise formats in `src/content/types.ts` and `src/content/` (like `src/content/preA1/quest1-greetings.ts`) so you know how to retrieve and render multiple choice, fill-in-blank, and match pairs questions.
Ensure your design specifies:
- 8-segment Guardian HP bar and hit flash effect.
- 3 Player Fox Lives (hearts) using Yuki's fox theme and damage shake effect.
- Question retrieval from the world's quests: `world.quests.flatMap(q => q.exercises)`.
- 20-second soft timer shown as a draining ring, and a toggle to turn it off.
- Combo bonus: 3+ correct answers in a row deals +1 extra damage on the next hit, displaying "Fox Fire Combo!" toast/badge.
- Victory Flow: Yuki's tail-reveal animation, grant 100 coins in `statsStore`, mark guardian as defeated in `progressStore`, return to map (next region unlocked, "Challenge Again" shown).
- Defeat Flow: encouraging message, return to map with no penalties.
- Premium visuals using Framer Motion (use `motion-framer/SKILL.md` patterns) and modern Tailwind styling.
- Strictly adhere to non-negotiable constraints: no new colors/fonts/design token changes (cream/navy/terracotta light theme tokens).

Write a detailed fix strategy and proposed code layout to `c:\Users\ROHITGUPTA\OneDrive - Bar Code India Ltd\Desktop\Web\.agents\explorer_boss_battle\handoff.md`.
When completed, send a message to the orchestrator (conversation ID: f06c0f2a-983c-435c-880f-ec2bfc745c7e) with your handoff.md path.
