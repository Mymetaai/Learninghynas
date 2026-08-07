# Project: Spanish Learning Web Application — Executive Adult Redesign

## Architecture
- **Frontend Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Dark Glassmorphism CSS Variables (`data-theme` attribute on `document.documentElement`)
- **Typography**: Refined adult typography (`Fraunces` executive serif, `Outfit` modern sans, `Inter` body sans, `JetBrains Mono` code)
- **State Management**: Zustand stores (`statsStore.ts`, `shopStore.ts`, `settingsStore.ts`) persisted to `localStorage`
- **Backend Sync**: Supabase client (`supabaseClient.ts`, `useUserData.ts`) syncing user progress, inventory, themes, and stats
- **Active Time Tracking**: `useActiveStudyTimer.ts` background focus/visibility tracking

## Feature Inventory
Every feature from user requirements (R1 - R4 + Acceptance Criteria) is assigned to a milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Executive Dark Glassmorphism CSS System | Base background `#0F172A`, Frosted Glass cards `rgba(30, 41, 59, 0.7)` with `backdrop-filter: blur(16px)`, Emerald Gold `#D97706` & Emerald `#10B981` accents, font imports in `index.html` & `index.css` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Tailwind Font & Glass Utilities | Update `tailwind.config.js` for `Fraunces` and `Outfit`; overhaul `.clay-card`, `.glass-surface`, `.nav-glass`, `.ios-glass-panel` utilities to dark glass | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Logo Variant State Management | Extend `settingsStore.ts` with `logoVariant: 'executive' \| 'uploaded' \| 'chibi'`, defaulting to `'executive'` (`/adult-hyena-logo.jpg`) | M2 | ORIGINAL_REQUEST §R2 |
| 4 | Header Logo & HUD Selector Toggle | Update logo in `HUD.tsx`, `LandingEntry.tsx`, `WhyUsScreen.tsx`, and `index.html` to default to `/adult-hyena-logo.jpg` with responsive sizing, amber border outline, and selector dropdown | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Refined Companion Mascot (`ChibiPet.tsx`) | Overhaul Yuki companion into mature executive persona ("Executive AI Companion / Senior Language Advisor"), sleek status indicators (pulsing emerald dot), dark slate glass drawer | M2 | ORIGINAL_REQUEST §R2 |
| 6 | Executive Analytics Dashboard (`HomeScreen.tsx`) | Redesign Weekly Activity Graph, Lexicon Growth, Vault Insights, Recommended Lessons, Slip-ups into Apple Watch / Executive Financial style high-contrast metrics | M3 | ORIGINAL_REQUEST §R3 |
| 7 | High-Contrast XP Ring Gauges (`AppleActivityCard.tsx`) | Redesign concentric ring gauges (XP, Course Mastery, Vocab) and central CEFR badge into executive high-contrast dark slate aesthetics | M3 | ORIGINAL_REQUEST §R3 |
| 8 | Active Study & Supabase Sync Non-Regression | Verify `useActiveStudyTimer.ts` focus/visibility tracking and Supabase `user_progress` background sync function seamlessly | M3 | ORIGINAL_REQUEST §R3 |
| 9 | Executive Theme Grid & Theme Overrides (`ShopScreen.tsx`) | Update themes grid and CSS theme overrides for `aztec-gold` and `madrid-midnight` in `src/index.css` & `ShopScreen.tsx` to reflect executive dark aesthetics | M4 | ORIGINAL_REQUEST §R4 |
| 10 | TypeScript Build Verification & Git Push | Run `npm run build` (0 TS/Vite errors), verify feature non-regression, git commit, and push to GitHub `main` branch on `https://github.com/Mymetaai/Learninghynas.git` | M5 | ORIGINAL_REQUEST §Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Executive Dark Glassmorphism Design System | Overhaul `index.html`, `src/index.css`, `tailwind.config.js`, `AppShell.tsx` for R1 | none | DONE |
| 2 | M2: Refined Adult Logo & Mascot Integration | Update `settingsStore.ts`, `HUD.tsx`, `LandingEntry.tsx`, `WhyUsScreen.tsx`, `ChibiPet.tsx` for R2 | M1 | DONE |
| 3 | M3: Executive Data Analytics & Progress Dashboard | Redesign `HomeScreen.tsx` & `AppleActivityCard.tsx`, verify timer & Supabase sync for R3 | M1 | DONE |
| 4 | M4: Shop & Theme Integration | Update `ShopScreen.tsx` themes grid and CSS overrides for `aztec-gold` & `madrid-midnight` for R4 | M1 | DONE |
| 5 | M5: Verification, Build & GitHub Push | Execute npm run build, verify 0 errors, git commit & push to GitHub main branch | M1, M2, M3, M4 | DONE |

## Interface Contracts
### settingsStore ↔ HUD / Landing / WhyUs
- `settingsStore`: Exposes `logoVariant: 'executive' | 'uploaded' | 'chibi'` and `setLogoVariant`.
- `HUD`: Renders active logo from `LOGO_VARIANTS[logoVariant].src` with amber outline and provides a dropdown selector to update `logoVariant`.

### statsStore ↔ HomeScreen / AppleActivityCard / useActiveStudyTimer
- `useActiveStudyTimer`: Ticks every 1000ms on focus/visible, invoking `statsStore.tickActiveStudyTime(deltaSec)`.
- `statsStore`: Maintains `weeklyActivity` array, `xp`, `streak`, `coins`.
- `HomeScreen` & `AppleActivityCard`: Read stats store and render high-contrast executive charts and ring gauges.

## Code Layout
- `index.html`: Web page entry point, favicon link, Google Fonts imports
- `src/index.css`: `:root` dark glass CSS variables, font imports, glass utility classes, `aztec-gold` & `madrid-midnight` theme definitions
- `tailwind.config.js`: Tailwind typography font families (`serif: Fraunces`, `sans: Outfit/Inter`)
- `src/state/settingsStore.ts`: User settings store (language, sound, logoVariant)
- `src/components/HUD.tsx`: Header navigation bar, executive logo display & selector toggle
- `src/components/LandingEntry.tsx`: Hero entry component with executive logo badge
- `src/screens/WhyUsScreen.tsx`: Feature comparison screen with executive logo badge
- `src/components/ChibiPet.tsx`: Companion mascot drawer with mature persona framing & status indicators
- `src/screens/HomeScreen.tsx`: Executive analytics dashboard, Weekly Activity graph, Vault insights
- `src/components/AppleActivityCard.tsx`: Concentric XP & mastery ring gauges
- `src/hooks/useActiveStudyTimer.ts`: Background study timer tracking hook
- `src/screens/ShopScreen.tsx`: Gamified shop screen, executive theme grid
- `src/hooks/useUserData.ts`: Supabase background synchronization hook
