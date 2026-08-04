# Project: Spanish Learning Web Application Gamification & Theme System

## Architecture
- **Frontend Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables (`data-theme` attribute on `document.documentElement`)
- **State Management**: Zustand stores (`statsStore.ts`, `shopStore.ts`) persisted to `localStorage`
- **Backend Sync**: Supabase client (`supabaseClient.ts`, `useUserData.ts`) syncing user progress, inventory, themes, and stats
- **Audio Engine**: Custom Web Audio API synthesizer (`audioFeedback.ts`) supporting 4 theme packs

## Feature Inventory
Every feature from user requirements (R1 - R6) is assigned to a milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Streak Freeze & Streak Repair System | Functional streak_freeze & streak_repair items; protect daily streak on missed days; buy streak repair | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Anime Gacha Booster Packs | 4 pack tiers (Common, Rare, Epic, Legendary), 3D flip animation, battle stats, One Piece & Demon Slayer power effects, card collection inventory | M2 | ORIGINAL_REQUEST §R2 |
| 3 | Hint Tokens in Quizzes | Integrate hint token consumption across ExerciseCard, SentenceBuilderExercise, PracticeScreen; eliminate wrong choices / highlight word hints | M3 | ORIGINAL_REQUEST §R3 |
| 4 | Sound Pack Themes | 4 unlockable sound packs (Anime Hero, Castilian Coach, Latin Salsa, Chibi Yuki); Web Audio synth feedback for correct/incorrect/success | M4 | ORIGINAL_REQUEST §R4 |
| 5 | 10-Theme UI Override System | 10 custom data-themes in index.css (madrid-midnight, ibiza-sunset, andalusia-olive, caribbean-coral, barcelona-gaudi, fiesta-neon, matador-crimson, siesta-mint, tulum-teal, aztec-gold); preview, buy, equip, persist | M5 | ORIGINAL_REQUEST §R5 |
| 6 | Supabase Migration, Build & Push | Migration SQL for themes/inventory/hints; zero TypeScript errors on npm run build; git commit and push to main | M6 | ORIGINAL_REQUEST §R6 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Streak Freeze & Streak Repair System | Extend statsStore & shopStore for freeze/repair, streak protection logic, purchase actions | none | PLANNED |
| 2 | M2: Anime Gacha Booster Packs | Gacha Altar UI, 4 pack tiers, 3D flip card opening overlay, battle stats, One Piece & Demon Slayer special effects, card inventory | M1 | PLANNED |
| 3 | M3: Hint Tokens in Quizzes & Exercises | Add hint token count to statsStore, "Use Hint Token" button in ExerciseCard & SentenceBuilderExercise, option elimination logic | M1 | PLANNED |
| 4 | M4: Voice & Audio Sound Pack Themes | Audio engine (audioFeedback.ts), 4 sound packs, Web Audio synthesis, shop purchase/equip UI | M1 | PLANNED |
| 5 | M5: 10-Theme UI Override System | 10 CSS theme definitions in index.css, DOM data-theme binding in AppShell, theme shop UI, persistence | M1 | PLANNED |
| 6 | M6: Supabase Migration, Build & Git Push | Migration SQL schema updates, npm run build verification, git commit and push to main branch | M1, M2, M3, M4, M5 | PLANNED |

## Interface Contracts
### shopStore ↔ statsStore
- `shopStore`: Manages shop catalog items (Streak Freeze, Streak Repair, Hint Tokens, Gacha Packs, Sound Packs, UI Themes), prices, purchase verification.
- `statsStore`: Single source of truth for user currency (`coins`), streak state (`streak`, `streakFreezeCount`, `streakRepairCount`), hint tokens (`hintTokens`), unlocked gacha cards (`collectedCardIds`), equipped sound pack (`equippedSoundPack`), equipped UI theme (`equippedTheme`).

## Code Layout
- `src/state/statsStore.ts`: User stats store (coins, streak, inventory, themes, audio)
- `src/state/shopStore.ts`: Shop catalog & booster pack definitions
- `src/utils/audioFeedback.ts`: Sound pack manager & Web Audio API synthesizer
- `src/screens/ShopScreen.tsx`: Gamified Shop UI, Gacha Altar, Booster Packs, Sound Packs, Theme Store
- `src/screens/PracticeScreen.tsx`: Quiz session container
- `src/components/ExerciseCard.tsx`: Multiple choice exercise card with Hint Token integration
- `src/components/SentenceBuilderExercise.tsx`: Sentence builder exercise with Hint Token integration
- `src/components/PackOpeningOverlay.tsx`: 3D card flip & gacha pack opening modal
- `src/components/GachaCard.tsx`: 3D holographic card component with battle stats & power animations
- `src/index.css`: 10 CSS theme definitions using `[data-theme="..."]`
- `supabase/migrations/`: Database schema migration files
