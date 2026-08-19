# 🗺️ PROJECT SYSTEM MAP: TheLearningHyena — The Unearthly Vault

This document provides a comprehensive, high-level architectural blueprint of **TheLearningHyena** web application codebase. It maps out directory structures, navigation routes, global state stores, TypeScript data models, backend Supabase database schemas, and end-to-end user data flows.

---

## 1. 🗂️ High-Level Directory Tree

An annotated tree of `src/` detailing all major modules, screens, components, stores, types, hooks, services, assets, and utility pipelines.

```
src/
├── App.tsx                        # Main root component (Clerk Auth, Lamp Landing page, sound synthesis, route switcher)
├── main.tsx                       # React application entry point mounting to DOM
├── routes.ts                      # Legacy route definitions
├── index.css                      # Global Tailwind CSS & custom dark theme styling rules
├── app/
│   └── routes.ts                  # Single source of truth for screen routes, labels, icons & lazy-loaded components
├── components/
│   ├── AppShell.tsx               # Primary application container layout (Top header HUD, navigation tab bar, theme provider)
│   ├── HUD.tsx                    # Persistent top bar (XP, Coins, Streak counter, active theme badge, user avatar)
│   ├── ChibiPet.tsx               # Interactive 2D/3D mascot companion on dashboard with dynamic reactions
│   ├── GachaCard.tsx              # Anime collectible card component (rarity badges, holographic foil effect, flip state)
│   ├── SpotlightCards.tsx         # Interactive card grid layout with spotlight hover effect
│   ├── FillInBlanksQuiz.tsx       # Interactive fill-in-the-blank exercise component
│   ├── SentenceBuilderExercise.tsx # Interactive word-block sentence assembly component with token verification
│   ├── FeynmanDrill.tsx           # Active recall drill where user explains concepts to the mascot
│   ├── UnifiedVocabTrainer.tsx    # Comprehensive vocabulary hub (Flashcards, Quizzes, SRS Spaced Repetition)
│   ├── AutoFlashcardsPlayer.tsx   # Automated slideshow flashcard deck player
│   ├── FlashcardFan.tsx           # Fan-deck interactive card selector
│   ├── InkRevealCard.tsx          # Ink-reveal scratch animation card for vocabulary definitions
│   ├── Kitsune3D.tsx              # 3D Canvas element rendering Kitsune mascot model
│   ├── GlobalSpanishKeyboard.tsx  # Global floating virtual keyboard overlay with Spanish accent keys (á, é, í, ó, ú, ñ, ¡, ¿)
│   ├── SpanishVirtualKeyboard.tsx # Compact embedded Spanish virtual keyboard
│   ├── AccountUpgradeModal.tsx    # Modal prompting anonymous guests to sync progress via Clerk authentication
│   ├── InstallPrompt.tsx          # PWA (Progressive Web App) install banner modal
│   ├── LandingEntry.tsx           # Initial entry landing view wrapper
│   ├── ShimmerText.tsx            # Animated shimmer text display component
│   ├── DynamicText.tsx            # Dynamic typewriter/rotating header text utility
│   ├── TypewriterText.tsx         # Letter-by-letter typewriter animation component
│   ├── analytics/
│   │   └── UserActivityDashboard.tsx # Comprehensive analytics view (Apple Activity rings, 30-day heatmap, weekly charts)
│   ├── auth/                      # Authentication-related utility components
│   ├── effects/
│   │   ├── DigitalRain.tsx        # Matrix-style digital rain background effect
│   │   ├── Lightning.tsx          # Dynamic lightning flash canvas effect for boss battles
│   │   └── Vortex.tsx             # Animated particle vortex overlay for gacha summoning altar
│   ├── exercises/
│   │   ├── ExerciseEngine.tsx     # Centralized engine rendering various interactive exercise types
│   │   ├── ExerciseCard.tsx       # Standard card frame for exercises
│   │   ├── MultipleChoice.tsx     # Multiple-choice option selection exercise
│   │   ├── FillBlank.tsx          # Text fill-in-the-blank input exercise
│   │   ├── MatchPairs.tsx         # Matching word pairs drag/click exercise
│   │   ├── TranslationInput.tsx   # Direct Spanish-to-English / English-to-Spanish translation entry
│   │   ├── ListeningExercise.tsx  # Audio listening comprehension prompt & input
│   │   ├── ReorderList.tsx        # Drag-to-reorder sentence tokens exercise
│   │   └── DragDrop.tsx           # Drag-and-drop word matching component
│   ├── shop/
│   │   ├── SummoningAltar.tsx     # Interactive Gacha Shrine summoning altar with animated orb pulls
│   │   └── CardRevealModal.tsx    # High-impact card summon reveal modal with legendary particle explosions
│   └── StoryScreenEnrichment/
│       ├── MascotAside.tsx        # Mascot commentary box explaining grammar & cultural context
│       ├── PassportStamp.tsx      # Stamp animation applied to profile upon completing a story chapter
│       ├── RecallChip.tsx         # Active recall memory chip prompting self-testing during reading
│       ├── SceneReact.tsx         # Story character emotion reaction overlay
│       ├── TranslateFlip.tsx      # Interactive line card flip revealing English translation
│       └── WordPopupMemory.tsx    # Vocabulary popup displaying definitions and first-seen story context
├── screens/
│   ├── LearnScreen.tsx            # Primary Home Dashboard (AI study suggestion, daily quest summary, level progress)
│   ├── WorldMapScreen.tsx         # Explorable interactive world map with region nodes, sentinels & boss gateways
│   ├── BasicEspanolScreen.tsx     # 37-Lesson curriculum viewer (Syllabus checklist, sentence builder, master exams)
│   ├── QuestPreviewScreen.tsx     # Pre-quest briefing view (Objectives, vocabulary preview, enemy stats)
│   ├── QuestJourneyScreen.tsx     # 24-Level book quest reader and interactive exercise runner
│   ├── StoryScreen.tsx            # Library reader (Slot-machine sentence formulas, mascot notes, passport stamps)
│   ├── PracticeViewScreen.tsx     # Training Grounds hub (Weak spot drills, SRS flashcards, sentence builders)
│   ├── PracticeScreen.tsx         # Alternative training session runner
│   ├── ConversationScreen.tsx     # AI Companion roleplay chat (Elena, Mateo, Diego) powered by Google Gemini API
│   ├── SpeakingScreen.tsx         # Voice Arena challenge screen with speech recognition & pronunciation feedback
│   ├── DailyQuestScreen.tsx       # Daily Quest dashboard with dynamic task generation & progress tracking
│   ├── ShopScreen.tsx             # Gacha Shrine & Shop (Power-ups, themes, companion auras, card booster packs)
│   ├── ProfileScreen.tsx          # User Profile (Lifetime activity summary, passport stamp collection, badges, reset controls)
│   ├── QuestCompletionScreen.tsx  # Celebration screen granting XP, Coins, and streak updates upon quest finish
│   ├── BossBattleScreen.tsx       # Set-piece boss battle encounter with boss HP bars and timed exercise mechanics
│   ├── WhyUsScreen.tsx            # Value proposition and product feature showcase view
│   └── index.ts                   # Export barrel for all screen components
├── state/
│   ├── statsStore.ts              # Core user stats (XP, Coins, Streak, Weekly activity, Daily history, Learned vocab)
│   ├── shopStore.ts               # Shop catalog state, inventory, theme switching, card booster draw logic
│   ├── entitlementStore.ts        # Canonical entitlements store (Consumables, themes, auras, card inventory)
│   ├── progressStore.ts           # World map unlock progress, completed quest IDs, defeated guardians
│   ├── questStore.ts              # 24-Level book quest journey progress, star ratings, and high scores
│   ├── storyProgressStore.ts      # Story completion status, stamped stories, and word encounter tracking
│   ├── dailyQuestStore.ts         # Dynamic daily quest generator and real-time task progress listener
│   ├── trainingStore.ts           # Mistake tracking for Weak Spots drill & FSRS Spaced Repetition cards
│   ├── authStore.ts               # Client authentication state (Clerk user ID, anonymous mode, email)
│   ├── companionStore.ts          # Static dialogue trees & Gemini AI chat sessions for Elena, Mateo, Diego
│   ├── activeImmersionStore.ts    # AI Active Immersion sessions (Daily plan, Conversation, Vocab group, Roleplay)
│   ├── scenarioStore.ts           # Real-world scenario chat sessions (Escenarios Reales) with Gemini integration
│   ├── settingsStore.ts           # Global application settings (English/Hinglish translations, logo variants)
│   └── index.ts                   # Export barrel for state stores
├── types/
│   ├── story.ts                   # Interfaces for Story, StoryLine, StoryVocab, StoryGrammarNote, LibraryStory
│   ├── entitlement.ts             # Interfaces for ShopCatalogItem, UserEntitlements, ConsumableKey, ItemRarity
│   └── database.types.ts          # Supabase database schema TypeScript definitions
├── hooks/
│   ├── useActiveStudyTimer.ts     # Passive timer tracking active study seconds and updating weekly/daily stats
│   ├── useUserData.ts             # Hook for loading and caching user progress
│   ├── useVocabDeck.ts            # Hook for managing vocabulary decks by CEFR level
│   └── usePWA.ts                  # Hook for PWA installation status and update triggers
├── lib/
│   ├── supabaseClient.ts          # Supabase client creation with Clerk JWT authentication & background store sync
│   ├── database.types.ts          # Supabase table & row types definition
│   ├── fsrs.ts                    # Free Spaced Repetition Scheduler (FSRS) algorithm implementation
│   ├── fsrs.test.ts               # Unit test suite for FSRS scheduler algorithm
│   ├── sentenceBuilder.ts         # Helper utility for tokenizing sentences and evaluating student word arrangements
│   └── utils.ts                   # General utility functions (tailwind merge, classnames)
├── utils/
│   ├── geminiService.ts           # Service layer communicating with Google Gemini API for AI chat & translations
│   ├── audioFeedback.ts           # Web Audio API sound synthesizer (switch clicks, fanfare, level-up chimes)
│   └── hinglish.ts                # Translator utility converting English explanations into Hinglish
├── content/
│   ├── worlds.ts                  # World map regions, quest nodes, and guardian definitions
│   ├── companions.ts              # Companion character profiles (Elena, Mateo, Diego) and dialogue trees
│   ├── scenarios.ts               # Escenarios Reales real-world roleplay scenario definitions
│   ├── c1/                        # C1 level quest contents
│   └── preA1/                     # Pre-A1 beginner quest files (Quests 1 to 25)
├── data/
│   ├── shopCatalog.ts             # Shop catalog definitions (Power-ups, themes, auras, card packs)
│   ├── gachaData.ts               # One Piece & Demon Slayer collectible card database (rarities, art paths)
│   ├── syllabusLessonsData.ts     # Complete 37-lesson curriculum data across 8 course parts
│   ├── speakingChallenges.ts     # Voice Arena challenges and target pronunciation phrases
│   ├── storyMascotLines.ts        # Mascot commentary text lines for library stories
│   ├── feynmanConceptsData.ts     # Feynman technique drill concept definitions
│   ├── vaultInsightsData.ts       # Vault insights and tips database
│   ├── yuki-chatbot-knowledge-base.json # Knowledge base for Yuki AI assistant
│   └── vocab/                     # Vocabulary JSON datasets (a1.json, a2.json, b1.json, b2.json, c1.json)
└── pipeline/                      # Content processing scripts (Python extractor, generator, QA validator)
```

---

## 2. 🧭 Routing & Navigation Map

The app uses `react-router-dom` with centralized route definitions in `src/app/routes.ts`. Primary tabs are visible in the top navigation bar (`AppShell.tsx`), while secondary screens are flow-driven.

| Route ID | Path | Navigation Label | Icon | Target Screen Component | Nav Bar Visible | Function & Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `learn` | `/learn` | Learn | `Home` | [LearnScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/LearnScreen.tsx) | **Yes** (Order 0) | **Primary Home Dashboard**: AI study suggestions, daily quest summary, active streak, and level overview. |
| `practice` | `/practice` | Practice | `Swords` | [PracticeViewScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/PracticeViewScreen.tsx) | **Yes** (Order 1) | **Training Grounds**: Reusable exercise engine, weak spot drills, sentence builders & FSRS flashcards. |
| `library` | `/library` | Library | `BookOpen` | [StoryScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/StoryScreen.tsx) | **Yes** (Order 2) | **Stories Library**: Immersive reading experience with slot-machine grammar formulas & passport stamps. |
| `shop` | `/shop` | Gacha Shrine | `ShoppingBag` | [ShopScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/ShopScreen.tsx) | **Yes** (Order 3) | **Summoning Altar & Shop**: Power-ups, themes, companion auras, sound packs & One Piece / Demon Slayer gacha draws. |
| `dashboard` | `/` | Dashboard | `LayoutDashboard` | [LearnScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/LearnScreen.tsx) | No | Root path redirecting to home dashboard. |
| `map` | `/map` | Adventure Map | `Map` | [WorldMapScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/WorldMapScreen.tsx) | No | **World Map**: Explorable region nodes, sentinels, and world guardian gateways. |
| `basic-espanol`| `/basic-espanol`| Basic Español | `GraduationCap` | [BasicEspanolScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/BasicEspanolScreen.tsx) | No | **Curriculum Hub**: 37 structured lessons, interactive sentence builders, and master exam challenges. |
| `quests` | `/quests` | Quests | `ScrollText` | [QuestPreviewScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/QuestPreviewScreen.tsx) | No | Pre-quest briefing view with objectives, vocabulary list, and enemy stats. |
| `quest-journey`| `/quest-journey`| Quest Journey | `Swords` | [QuestJourneyScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/QuestJourneyScreen.tsx) | No | 24-Level book quest reader and interactive exercise challenge runner. |
| `stories` | `/stories` | Stories | `BookOpen` | [StoryScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/StoryScreen.tsx) | No | Alternative story reader route. |
| `training` | `/training` | Training Grounds | `Dumbbell` | [PracticeScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/PracticeScreen.tsx) | No | Training session execution runner. |
| `companion` | `/companion` | AI Companion | `MessageCircle` | [ConversationScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/ConversationScreen.tsx) | No | **AI Companion Roleplay**: Interactive conversation with Elena, Mateo, Diego & Yuki powered by Gemini API. |
| `voice` | `/voice` | Voice Arena | `Mic` | [SpeakingScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/SpeakingScreen.tsx) | No | **Voice Arena**: Speech recognition pronunciation practice & speaking challenges. |
| `daily` | `/daily` | Today's Quest | `Sun` | [DailyQuestScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/DailyQuestScreen.tsx) | No | Dedicated Daily Quest dashboard with dynamic tasks & bonus claims. |
| `profile` | `/profile` | Profile | `User` | [ProfileScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/ProfileScreen.tsx) | No | **User Profile**: Lifetime study analytics, passport stamp collection, syllabus badges, and reset options. |
| `quest-complete`|`/quest-complete`| Quest Complete | `Award` | [QuestCompletionScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/QuestCompletionScreen.tsx)| No | Celebration screen displaying earned XP, coins, streak bonus, and new unlocked content. |
| `boss` | `/boss` | Boss Battle | `Sword` | [BossBattleScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/BossBattleScreen.tsx) | No | Set-piece boss battle encounter with timed combat mechanics and boss HP. |
| `why-us` | `/why-us` | Why Us | `Trophy` | [WhyUsScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/WhyUsScreen.tsx) | No | Product feature showcase and educational methodology overview. |

---

## 3. 📦 State Management & Data Stores

The application uses **Zustand** with `persist` middleware for lightweight, modular global state management across 13 dedicated stores.

```
                                  ┌──────────────────────────┐
                                  │      React App Shell     │
                                  └────────────┬─────────────┘
                                               │
    ┌───────────────────────────┬──────────────┼──────────────┬───────────────────────────┐
    ▼                           ▼              ▼              ▼                           ▼
┌──────────────┐       ┌────────────────┐ ┌───────────┐ ┌───────────┐       ┌───────────────────────────┐
│  statsStore  │       │ entitlementStore│ │ shopStore │ │ questStore│       │   activeImmersionStore    │
└──────┬───────┘       └───────┬────────┘ └─────┬─────┘ └─────┬─────┘       └─────────────┬─────────────┘
       │                       │                │             │                           │
       └───────────────────────┴────────────────┴─────────────┴───────────────────────────┴──► Supabase Sync
```

### Summary of Stores

#### 1. `useStatsStore`
- **File Path**: [src/state/statsStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/statsStore.ts)
- **Key State Variables**: `xp` (number), `coins` (number), `streak` (number), `lastActiveDate` (string), `learnedVocab` (`LearnedVocabEntry[]`), `collectedCardIds` (`string[]`), `claimedQuestRewards` (`string[]`), `claimedExamIds` (`string[]`), `earnedBadges` (`Record<string, boolean>`), `completedLessons` (`Record<string, boolean>`), `weeklyActivity` (`WeeklyActivityItem[]`), `dailyHistory` (`Record<string, DailyActivityRecord>`), `activeSeconds` (number), `weekStartDate` (string).
- **Key Actions & Dispatches**:
  - `grantQuestRewards(questId, xp, coins)`: Grants XP/coins for quest completion (idempotent).
  - `addRewards(xp, coins)`: General reward dispatch for companion chats, training, and daily quests.
  - `learnVocab(words, questId)`: Deduplicates and records newly learned Spanish vocabulary.
  - `spendCoins(amount)`: Deducts coins if balance is sufficient.
  - `collectCard(cardId)` / `collectAllCards(cardIds)`: Adds cards to collection.
  - `claimExamReward(examId, xp, coins, coursePart)`: Unlocks course part master exam rewards & badges.
  - `toggleLessonComplete(lessonKey)`: Updates syllabus lesson completion checklist.
  - `tickActiveStudyTime(secondsElapsed)`: Accumulates study seconds into daily minutes & weekly activity.
  - `checkPassiveStreakStatus()`: Recalculates streak; consumes `streak_freeze` item if a day was missed.
  - `resetAllProgress()`: Clears local state and localStorage without affecting Supabase.
- **Persistence Strategy**: `localStorage` key `'wayfarer-stats'`. Background subscriber syncs to Supabase (`syncUserStats`, `syncLearnedVocab`).

#### 2. `useShopStore`
- **File Path**: [src/state/shopStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/shopStore.ts)
- **Key State Variables**: `inventory` (`UserEntitlements`), `totalCardsDrawn` (number), `lastDrawResult` (`{ cardId, franchise, isDuplicate, refundedCoins } | null`).
- **Key Actions & Dispatches**:
  - `buyPowerUp(itemKey, cost)`: Spends coins to purchase streak freezes, hint tokens, or boss retries.
  - `buyConsumable(itemId)` / `buyAura(itemId)` / `buyTheme(itemId)` / `buySoundPack(packId, cost)`: Item purchases.
  - `setActiveTheme(themeId)`: Equips visual UI theme (sets `data-theme` attribute on `<html>`).
  - `drawCardBooster(franchise, availableCardIds, cost)`: Performs gacha card pull with duplicate refund logic.
  - `unlockBonusPack(packId, cost)`: Unlocks extra story/card booster packs.
  - `usePowerUpItem(itemKey)`: Decrements consumable count.
- **Persistence Strategy**: `localStorage` key `'hyena-shop-store'`.

#### 3. `useEntitlementStore`
- **File Path**: [src/state/entitlementStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/entitlementStore.ts)
- **Key State Variables**: `consumables` (`Record<ConsumableKey, number>`), `unlockedThemes` (`string[]`), `unlockedAuras` (`string[]`), `ownedCards` (`string[]`), `unlockedPacks` (`string[]`), `activeThemeId` (string), `activeAuraId` (string | null).
- **Key Actions & Dispatches**: `purchaseItem()`, `purchaseGachaCard()`, `useConsumable()`, `setActiveTheme()`, `setActiveAura()`, `syncFromSupabase()`, `resetEntitlements()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-canonical-entitlements'`. Syncs with Supabase table `user_entitlements`.

#### 4. `useProgressStore`
- **File Path**: [src/state/progressStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/progressStore.ts)
- **Key State Variables**: `allUnlocked` (boolean), `completedQuestIds` (`string[]`), `defeatedGuardianWorldIds` (`string[]`), `defeatedSentinelIds` (`string[]`).
- **Key Actions & Dispatches**: `completeQuest()`, `defeatGuardian()`, `defeatSentinel()`, `isQuestUnlocked()`, `unlockAll()`, `reset()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-progress'`.

#### 5. `useQuestStore`
- **File Path**: [src/state/questStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/questStore.ts)
- **Key State Variables**: `allUnlocked` (boolean), `activeLevelId` (string), `levelResults` (`Record<string, LevelResult>`), `completedLevelIds` (`string[]`).
- **Key Actions & Dispatches**: `setActiveLevelId()`, `completeLevel(levelId, stars, score, xp, coins)`, `isLevelUnlocked()`, `getLevelStars()`, `unlockAllLevels()`, `resetQuestProgress()`.
- **Persistence Strategy**: `localStorage` key `'hyena-quest-store'`.

#### 6. `useStoryProgressStore`
- **File Path**: [src/state/storyProgressStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/storyProgressStore.ts)
- **Key State Variables**: `storyProgress` (`Record<string, StoryProgressEntry>`), `wordEncounters` (`Record<string, WordEncounterEntry>`).
- **Key Actions & Dispatches**: `markStoryStamped(storyId, title, vocabList)` (awards +25 XP / +15 Coins), `recordWordEncounter()`, `getWordEncounter()`, `getStoryStatus()`, `resetStoryProgress()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-story-progress'`.

#### 7. `useDailyQuestStore`
- **File Path**: [src/state/dailyQuestStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/dailyQuestStore.ts)
- **Key State Variables**: `currentQuest` (`UserDailyQuest | null`), `isLoading` (boolean), `dailyBonusClaimed` (boolean).
- **Key Actions & Dispatches**:
  - `loadTodayQuest(userId)`: Fetches today's quest from Supabase `daily_quests` or dynamically generates a personalized quest scaling with user level & streak.
  - `updateTaskProgress(type, increment)`: Updates task counters (`vocab_review`, `sentence_builder`, `lesson_progress`, `ai_companion`, `streak_maintain`), awards task XP, and triggers daily bonus (+75 XP / +30 Coins) when all tasks finish.
  - `claimDailyBonus()`: Manual bonus claim fallback.
  - `resetDailyQuests()`: Clears daily quest state.
- **Persistence Strategy**: `localStorage` key `'wayfarer-daily-quest-store'`. Syncs with Supabase table `daily_quests`.

#### 8. `useTrainingStore`
- **File Path**: [src/state/trainingStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/trainingStore.ts)
- **Key State Variables**: `mistakes` (`MistakeEntry[]`), `srsCards` (`SRSCard[]`), `trainingSessionsCompleted` (number), `lastActiveLevel` (string), `lastActiveCategory` (string), `categoryProgressIndex` (`Record<string, number>`), `masteredWordIds` (`Record<string, boolean>`).
- **Key Actions & Dispatches**: `recordMistake()`, `markReviewedCorrectly()` (clears mistake after 2 correct reviews), `grantTrainingRewards(correct, total)`, `getOrCreateSRSCard()`, `reviewSRSCard(wordId, rating)`, `getDueSRSCards()`, `getSRSCardsByState()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-training'`.

#### 9. `useAuthStore`
- **File Path**: [src/state/authStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/authStore.ts)
- **Key State Variables**: `isAuthenticated` (boolean), `isAnonymous` (boolean), `userEmail` (string | null), `loginMethod` (string | null), `userId` (string | null).
- **Key Actions & Dispatches**: `login(email, method)`, `logout()`, `setUserId()`, `setIsAnonymous()`.
- **Persistence Strategy**: `localStorage` key `'thelearninghyena-auth'`.

#### 10. `useCompanionStore`
- **File Path**: [src/state/companionStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/companionStore.ts)
- **Key State Variables**: `activeCompanionId` (string), `conversations` (`Record<string, CompanionConversation>`), `isTyping` (boolean).
- **Key Actions & Dispatches**: `setActiveCompanion()`, `sendUserMessage(companionId, text, nextNodeId)` (awards +10 XP / +5 Coins, evaluates friendship level-up, delegates free-text to Gemini API or static dialogue tree), `resetConversations()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-companions'`.

#### 11. `useActiveImmersionStore`
- **File Path**: [src/state/activeImmersionStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/activeImmersionStore.ts)
- **Key State Variables**: `activeMode` (`ImmersionMode | null`), `selectedTopic` (string | null), `selectedAccent` (string | null), `selectedLevel` (`'beginner' | 'intermediate'`), `sessions` (`Record<string, ImmersionSessionState>`), `isTyping` (boolean).
- **Key Actions & Dispatches**: `setMode()`, `setTopic()`, `setAccent()`, `startSession()`, `sendMessage()`, `retryLastMessage()`, `addLearnedWord()`, `resetAllImmersionSessions()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-active-immersion'`. Syncs message logs to Supabase table `immersion_chat_messages`.

#### 12. `useScenarioStore`
- **File Path**: [src/state/scenarioStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/scenarioStore.ts)
- **Key State Variables**: `activeScenarioId` (string | null), `conversations` (`Record<string, ScenarioConversationState>`), `isTyping` (boolean).
- **Key Actions & Dispatches**: `selectScenario()`, `sendUserMessage()`, `retryLastMessage()`, `restartScenario()`, `addLearnedWord()`.
- **Persistence Strategy**: `localStorage` key `'wayfarer-scenarios'`.

#### 13. `useSettingsStore`
- **File Path**: [src/state/settingsStore.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/state/settingsStore.ts)
- **Key State Variables**: `language` (`'en' | 'hinglish'`), `logoVariant` (`'executive' | 'uploaded' | 'chibi'`).
- **Key Actions & Dispatches**: `setLanguage()`, `setLogoVariant()`.
- **Persistence Strategy**: `localStorage` key `'thelearninghyena-settings'`.

---

## 4. 🧬 Core TypeScript Types & Data Models

Essential interfaces imported from `src/types/` and state files.

```typescript
// ── USER STATS & ACTIVITY MODELS ─────────────────────────────────────────────

export interface DailyActivityRecord {
  date: string;              // YYYY-MM-DD
  minutes: number;           // Active study minutes logged
  xpEarned: number;          // Total XP earned on date
  lessonsCompleted: number;  // Lessons completed on date
}

export interface WeeklyActivityItem {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  minutes: number;
}

export interface LearnedVocabEntry {
  word: string;     // Spanish word, e.g. "hola"
  questId: string;  // Quest/session where word was learned
  date: string;     // ISO date string (YYYY-MM-DD)
}

// ── STORY & LIBRARY MODELS ───────────────────────────────────────────────────

export interface StoryLine {
  text: string;     // Spanish sentence text
  formula: string;  // Grammar breakdown (Subject, Verb, Object, Place, Time)
}

export interface StoryVocab {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface StoryGrammarNote {
  term: string;
  translation: string;
  explanation: string;
  example: string;
}

export interface Story {
  id: string;
  lesson?: number;                           // 1-37
  cefr_badge?: 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'C1';
  title: string;
  description: string;
  lines?: StoryLine[];
  vocabulary: StoryVocab[];
  new_grammar_point?: string;
  grammar_note?: StoryGrammarNote;
  mascot_asset_id?: string;
}

export interface StoryProgressEntry {
  status: 'unread' | 'read' | 'stamped';
  readAt: string;
}

export interface WordEncounterEntry {
  storyId: string;
  storyTitle: string;
  firstSeenAt: string;
}

// ── SHOP & ENTITLEMENT MODELS ────────────────────────────────────────────────

export type EntitlementType = 'consumable' | 'theme' | 'companion_aura' | 'gacha_card' | 'content_pack';
export type ConsumableKey = 'streak_freeze' | 'hint_token' | 'boss_retry';
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ShopCategory = 'powerups' | 'themes' | 'auras' | 'gacha' | 'packs';
export type GachaSet = 'one_piece' | 'demon_slayer';

export interface ShopCatalogItem {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  type: EntitlementType;
  priceInCoins: number;
  rarity: ItemRarity;
  icon: string;
  previewColor?: string;
  cssVariables?: Record<string, string>;
  consumableKey?: ConsumableKey;
  franchise?: GachaSet;
  effect?: string;
}

export interface UserEntitlements {
  consumables: Record<ConsumableKey, number>;
  unlockedThemes: string[];
  unlockedAuras: string[];
  ownedCards: string[];
  unlockedPacks: string[];
  activeThemeId: string;
  activeAuraId: string | null;
  unlockedSoundPacks?: string[];
  activeSoundPackId?: string;
}

// ── DYNAMIC DAILY QUEST MODELS ───────────────────────────────────────────────

export type QuestTaskType = 'vocab_review' | 'sentence_builder' | 'lesson_progress' | 'ai_companion' | 'streak_maintain';

export interface QuestTask {
  id: string;
  type: QuestTaskType;
  description: string;
  target_count: number;
  current_count: number;
  xp_reward: number;
  completed: boolean;
  action_route?: string;
}

export interface UserDailyQuest {
  id?: string;
  user_id?: string;
  quest_date: string;
  tasks: QuestTask[];
  total_xp_reward: number;
  completed_task_ids: string[];
  all_completed: boolean;
  generated_at: string;
}

// ── MISTAKE & FSRS SPACED REPETITION MODELS ───────────────────────────────────

export interface MistakeEntry {
  word: string;
  correctAnswer: string;
  wrongAnswer: string;
  exerciseType: 'multiple-choice' | 'fill-blank' | 'match' | 'translation' | 'listening' | 'reorder' | 'drag-drop';
  date: string;
  reviewedCorrectly: number; // Clears when count reaches 2
}

export interface SRSCard {
  wordId: string;
  word: string;
  translation: string;
  level: string;
  category: string;
  due: string;              // Next review ISO date
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number;            // 0: New, 1: Learning, 2: Review, 3: Relearning
  last_review?: string;
}
```

---

## 5. 🗄️ Database & Backend Schema (Supabase)

The backend relies on Supabase PostgreSQL (`szctbtxwzffnvnoqugyy.supabase.co`) with Row Level Security (RLS) policies configured for Clerk JWT authentication.

### Table Schemas & Definitions

```
 ┌───────────────────────────┐          ┌───────────────────────────┐
 │       user_progress       │          │        user_stats         │
 ├───────────────────────────┤          ├───────────────────────────┤
 │ user_id (PK, TEXT)        │          │ id (PK, UUID)             │
 │ xp (INT)                  │          │ user_id (FK, UUID/TEXT)   │
 │ level (INT)               │          │ streak (INT)              │
 │ kitsune_coins (INT)       │          │ coins (INT)               │
 │ streak_days (INT)         │          │ xp (INT), level (INT)     │
 │ weekly_activity (JSONB)   │          │ completed_lessons (JSONB) │
 └───────────────────────────┘          └───────────────────────────┘
               ▲                                      ▲
               │                                      │
 ┌─────────────┴─────────────┐          ┌─────────────┴─────────────┐
 │     user_entitlements     │          │    learned_vocabulary     │
 ├───────────────────────────┤          ├───────────────────────────┤
 │ user_id (PK, TEXT)        │          │ id (PK, UUID)             │
 │ streak_freeze (INT)       │          │ user_id (FK, UUID/TEXT)   │
 │ hint_token (INT)          │          │ word (TEXT)               │
 │ boss_retry (INT)          │          │ meaning (TEXT)            │
 │ owned_cards (JSONB)       │          │ date_learned (TIMESTAMPTZ)│
 │ unlocked_themes (JSONB)   │          └───────────────────────────┘
 └───────────────────────────┘
```

#### 1. `public.user_progress`
- **Columns**:
  - `user_id`: `TEXT PRIMARY KEY` (Clerk User ID string)
  - `xp`: `INTEGER NOT NULL DEFAULT 0`
  - `level`: `INTEGER NOT NULL DEFAULT 1`
  - `kitsune_coins`: `INTEGER NOT NULL DEFAULT 500`
  - `streak_days`: `INTEGER NOT NULL DEFAULT 0`
  - `weekly_activity`: `JSONB DEFAULT '[]'::jsonb`
  - `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- **RLS Policies**: Authenticated users can `SELECT`, `INSERT`, `UPDATE` where `user_id = auth.uid()::text OR user_id = (auth.jwt() ->> 'sub')`.

#### 2. `public.user_stats`
- **Columns**:
  - `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id`: `UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE`
  - `streak`: `INTEGER DEFAULT 1`, `coins`: `INTEGER DEFAULT 100`, `xp`: `INTEGER DEFAULT 0`, `level`: `INTEGER DEFAULT 1`
  - `completed_lessons`: `JSONB DEFAULT '{}'::jsonb`
  - `earned_badges`: `JSONB DEFAULT '{}'::jsonb`
  - `claimed_quest_rewards`: `TEXT[] DEFAULT '{}'`
  - `claimed_exam_ids`: `TEXT[] DEFAULT '{}'`
  - `collected_card_ids`: `TEXT[] DEFAULT '{}'`
  - `last_active_date`: `TEXT`
  - `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`
- **Indexes**: `idx_user_stats_user_id` on `user_id`.

#### 3. `public.learned_vocabulary`
- **Columns**:
  - `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id`: `UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `word`: `TEXT NOT NULL`
  - `meaning`: `TEXT`
  - `quest_id`: `TEXT`
  - `date`: `TEXT`
  - `learned_at` / `date_learned`: `TIMESTAMPTZ DEFAULT NOW()`
  - `last_reviewed_at`: `TIMESTAMPTZ`, `review_count`: `INT`, `next_review_date`: `TIMESTAMPTZ`
- **Constraints**: `UNIQUE (user_id, word)`.
- **Indexes**: `idx_learned_vocabulary_user_id` on `user_id`.

#### 4. `public.immersion_chat_messages`
- **Columns**:
  - `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id`: `UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `session_key`: `TEXT NOT NULL`
  - `mode`: `TEXT NOT NULL`, `topic`: `TEXT NOT NULL`
  - `sender`: `TEXT CHECK (sender IN ('user', 'assistant'))`
  - `text`: `TEXT NOT NULL`, `translation`: `TEXT`
  - `quick_replies`: `JSONB`, `new_vocab_words`: `JSONB`, `structured_content`: `JSONB`, `metadata`: `JSONB`
  - `timestamp`: `TEXT`, `created_at`: `TIMESTAMPTZ DEFAULT NOW()`

#### 5. `public.daily_quests`
- **Columns**:
  - `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id`: `TEXT NOT NULL`
  - `quest_date`: `TEXT NOT NULL` (YYYY-MM-DD)
  - `tasks`: `JSONB NOT NULL`
  - `total_xp_reward`: `INTEGER DEFAULT 100`
  - `completed_task_ids`: `TEXT[] DEFAULT '{}'`
  - `all_completed`: `BOOLEAN DEFAULT FALSE`
  - `generated_at`: `TIMESTAMPTZ DEFAULT NOW()`
- **Constraints**: `UNIQUE (user_id, quest_date)`.

#### 6. `public.sentence_builder_exercises`
- **Columns**:
  - `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id`: `UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `lesson_id`: `TEXT NOT NULL`
  - `cefr_level`: `TEXT CHECK (cefr_level IN ('A1','A2','B1','B2','C1'))`
  - `spanish_sentence`: `TEXT NOT NULL`, `english_translation`: `TEXT NOT NULL`
  - `tokens`: `JSONB NOT NULL`
  - `pronoun_dropped_variant`: `TEXT`, `notes`: `TEXT`

#### 7. `public.user_entitlements`
- **Columns**:
  - `user_id`: `TEXT PRIMARY KEY`
  - `streak_freeze`: `INT DEFAULT 0`, `hint_token`: `INT DEFAULT 0`, `boss_retry`: `INT DEFAULT 0`
  - `owned_cards`: `JSONB DEFAULT '[]'::jsonb`
  - `unlocked_themes`: `JSONB DEFAULT '["theme_parchment"]'::jsonb`
  - `unlocked_auras`: `JSONB DEFAULT '[]'::jsonb`
  - `unlocked_packs`: `JSONB DEFAULT '[]'::jsonb`
  - `unlocked_sound_packs`: `JSONB DEFAULT '["default"]'::jsonb`
  - `active_theme`: `TEXT DEFAULT 'theme_parchment'`
  - `active_aura`: `TEXT DEFAULT NULL`
  - `active_sound_pack`: `TEXT DEFAULT 'default'`
  - `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`

### Active Client Queries & Mutations ([src/lib/supabaseClient.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/lib/supabaseClient.ts))
- **`syncLocalStoresToSupabase(userId, token)`**: Upserts `user_progress` (`user_id`, `xp`, `level`, `kitsune_coins`, `streak_days`, `weekly_activity`) with Clerk JWT authentication.
- **`syncUserEntitlements(entitlements, userId)`**: Upserts `user_entitlements` table with active consumables, owned cards, themes, and sound packs.
- **`fetchTodayDailyQuest(userId, questDate)`**: Queries `daily_quests` via `.select('*').eq('user_id', targetId).eq('quest_date', todayStr).maybeSingle()`.
- **`syncDailyQuest(dailyQuestPayload, userId)`**: Upserts `daily_quests` table on conflict `(user_id, quest_date)`.

---

## 6. 🔄 End-to-End User Workflows

Detailed step-by-step data flows across key application features.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                   1. AUTH & LOGIN FLOW                      │
       │  Lamp Pull ──► WebAudio Sound ──► Clerk Modal ──► Dashboard  │
       └─────────────────────────────────────────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       │               2. LESSON COMPLETION WORKFLOW                 │
       │  Exercise ──► grantQuestRewards() ──► Stats & Streak Sync   │
       └─────────────────────────────────────────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       │              3. STORY PROGRESSION & MASTERY                 │
       │  Story Line ──► markStoryStamped() ──► Badge / Boss Battle   │
       └─────────────────────────────────────────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       │               4. GACHA CARD SUMMONING FLOW                  │
       │  20 Coins ──► drawCardBooster() ──► Duplicate Check / Reveal │
       └─────────────────────────────────────────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       │              5. ANALYTICS & STREAK RESET FLOW               │
       │  Timer Tick ──► Heatmap Log ──► Reset Progress (Clear Store) │
       └─────────────────────────────────────────────────────────────┘
```

### 1. Auth & Login Flow
1. **Unauthenticated Entry**: The user lands on [App.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/App.tsx) rendered inside `<SignedOut>`. `<LampLanding />` presents a full-screen dark room with an interactive pull-cord fixture.
2. **Pull-Cord Gesture**: The user drags the brass bead vertically using `framer-motion` (`dragY` / `dragX`). Web Audio API synthesizes a vintage dual-oscillator cord click sound (`playSwitchSound()`).
3. **Illumination Trigger**: Upon crossing `PULL_THRESHOLD = 34` pixels, `isOn` becomes `true`. SVG ambient light cone and background glow illuminate smoothly.
4. **Clerk Sign-In**: After 600ms, the illuminated `<SignInButton>` card appears. Clicking opens Clerk's sign-in modal.
5. **Welcome Transition**: Upon authentication, `<SignedIn>` mounts `<WelcomeTransition>`, showing a 2.5-second cinematic loading transition.
6. **Dashboard Render**: `showDashboard` sets to `true`, rendering `<AppShell>` and defaulting to `/learn` ([LearnScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/LearnScreen.tsx)).

### 2. Lesson Completion -> XP/Coin Award -> State Update
1. **Exercise Execution**: The user completes questions inside [PracticeViewScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/PracticeViewScreen.tsx) or [BasicEspanolScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/BasicEspanolScreen.tsx) via `<ExerciseEngine />`.
2. **Reward Dispatch**: On final answer submit, the component dispatches `grantTrainingRewards(correct, total)` or `addRewards(xp, coins)` to `useStatsStore`.
3. **Task Progress Listener**: `useDailyQuestStore.getState().updateTaskProgress('vocab_review' | 'lesson_progress', count)` increments the task counter.
4. **Streak Calculation**: `calculateConsecutiveStreak()` evaluates continuous active dates in `dailyHistory` and `weeklyActivity`, updating the streak count.
5. **Cloud Synchronization**: If authenticated, `syncUserStats(uid)` sends updated XP, coins, streak, and weekly activity to Supabase `user_progress` via Clerk JWT token.

### 3. Story Progression & Mastery Challenge Triggers
1. **Story Engagement**: The user reads a story chapter in [StoryScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/StoryScreen.tsx). Lines display slot-machine formula breakdowns (`StoryLine.formula`), vocabulary highlights (`WordPopupMemory`), and mascot notes (`MascotAside`).
2. **Completion & Stamping**: Clicking "Complete Story" invokes `useStoryProgressStore.getState().markStoryStamped(storyId, title, vocabList)`.
3. **Reward & Encounter Logging**: `markStoryStamped` awards +25 XP and +15 Coins to `useStatsStore`, updates `storyProgress[storyId]` status to `'stamped'`, and logs new word lemmas into `wordEncounters`.
4. **Mastery Exam & Boss Gateway**: When all lessons in a course part (e.g. Part 1-8 in `BasicEspanolScreen`) are complete, `claimExamReward()` grants a course badge (`earnedBadges`) and unlocks the set-piece [BossBattleScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/BossBattleScreen.tsx).

### 4. Card Summoning -> Inventory & Drop-Rate Calculation
1. **Shrine Access**: The user enters [ShopScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/ShopScreen.tsx) and selects a franchise set (`one_piece` or `demon_slayer`) at the [SummoningAltar.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/components/shop/SummoningAltar.tsx).
2. **Draw Request**: The user clicks "Summon 1 Card" (Cost: 20 Coins).
3. **Draw Execution**: `useShopStore.getState().drawCardBooster(franchise, availableCardIds, 20)` (or `useEntitlementStore.getState().purchaseGachaCard(...)`):
   - Verifies `coins >= 20` via `statsStore.spendCoins(20)`.
   - Selects a card ID uniformly at random from `availableCardIds`.
   - Checks if `cardId` exists in `inventory.ownedCards`.
   - **If Duplicate**: Refunds 5 coins (`stats.addRewards(0, 5)`), sets `isDuplicate: true`.
   - **If New**: Appends `cardId` to `inventory.ownedCards` and `statsStore.collectedCardIds`.
4. **Reveal Modal**: Mounts [CardRevealModal.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/components/shop/CardRevealModal.tsx) / `<PackOpeningOverlay />` displaying holographic artwork, rarity tags, and particle effects.

### 5. Analytics & Streak Tracking -> Reset Action Flow
1. **Passive Study Timer**: [useActiveStudyTimer.ts](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/hooks/useActiveStudyTimer.ts) ticks active study seconds. Every 60 seconds, `tickActiveStudyTime(60)` updates `weeklyActivity` (Mon-Sun array) and `dailyHistory[YYYY-MM-DD]`.
2. **Streak Maintenance & Freeze Protection**:
   - `checkPassiveStreakStatus()` runs on application launch.
   - If a day without activity is detected, it checks `useEntitlementStore.getState().consumables.streak_freeze`.
   - If `streak_freeze > 0`, decrements freeze count by 1 and preserves streak; otherwise streak resets to 0.
3. **Analytics Visualization**: [UserActivityDashboard.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/components/analytics/UserActivityDashboard.tsx) calculates metrics via `selectUserActivityMetrics(state)` to render Apple Activity rings, 30-day heatmaps, and weekly study time charts.
4. **Reset Progress Flow**:
   - In [ProfileScreen.tsx](file:///C:/Users/ROHITGUPTA/Downloads/Lang/Web/src/screens/ProfileScreen.tsx), clicking "Reset All Progress" calls `resetAllProgress()` from `statsStore.ts`.
   - Removes `localStorage` key `'wayfarer-stats'`.
   - Resets XP to 0, coins to 100, streak to 0, `learnedVocab` to `[]`, `weeklyActivity` to zeroed defaults, and `dailyHistory` to `{}`.
   - Resets shop inventory (`resetShopInventory()`), story progress (`resetStoryProgress()`), quest progress (`resetQuestProgress()`), daily quests (`resetDailyQuests()`), and active immersion sessions.
