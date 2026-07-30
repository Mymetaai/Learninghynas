# Antigravity System Prompt: "TheLearningHyena" Web App UI Generation

## [Context & Objective]
You are an expert frontend developer AI using Stitch MCP to scaffold and generate a high-fidelity, responsive Web App prototype for a language learning platform called "TheLearningHyena". 

Your task is to generate a complete React/Next.js component architecture based on the specifications below. The app must be segregated into 4 primary routing tabs. Generate the layouts so they are modular, allowing seamless navigation between the parent tabs and their nested sub-views.

## [Global Design System - STRICTLY ENFORCE ON ALL SCREENS]
- **Aesthetic:** Warm, cozy pastel, claymorphic theme. All cards, buttons, and containers must use 28px rounded squircle corners.
- **Colors:** 
  - Background: Warm cream canvas (`#FAF6F0`)
  - Typography: Rich espresso (`#2C1E11`) for primary text, slightly lighter for secondary.
  - Accents: Soft pastel coral peach (for active states/primary buttons), mint green (for success triggers/progress), and pale lavender (for secondary details).
- **Component Depth (Claymorphism):** Apply 4px solid dark-tinted bottom dropshadows on all buttons and interactive cards to create a thick, physical, pushable video-game appearance.
- **Global Header:** A sticky, unified top navigation container. 
  - **Left:** Logo reading "🐾 TheLearningHyena" alongside global user stats (XP, Coins, Streak).
  - **Right:** Exactly 4 crisp, pill-shaped navigation tabs: `[🏠 Learn]`, `[⚔️ Practice]`, `[📚 Library]`, and `[🦊 Shop]`. The active tab must feature a soft coral fill.

---

## [SCREEN 1: The "🏠 Learn" View (Home Base)]
**Active State:** The `[🏠 Learn]` tab is highlighted.
**Layout Structure:** A top-level sub-navigation menu allowing the user to toggle between three main sub-views: Dashboard, Quest Journey, and Basic Español.

**1A. Dashboard Sub-view:**
- **Welcome Header:** Friendly greeting (e.g., "¡Hola! 👋 Time to level up.").
- **Grid Layout:** 
  - **Progress Card:** Circular progress ring showing current CEFR level (e.g., A1) and XP progress bar.
  - **AI Study Insights Card:** Include a list of "Weak spots to review" and "Strong areas".
  - **AI Fun Facts Widget:** A dedicated, dynamically styled automated AI card that presents an interesting linguistic or cultural fact of the day.
  - **Recommended Next:** A vertical list of action items (Continue Learning, Practice, Conversation) with circular arrow buttons.

**1B. Quest Journey Sub-view:**
- **Layout:** A grid or pathway of lesson modules (e.g., "First Steps", "Identity & Essence").
- **Card Styling:** Each module is a card displaying the lesson title, page numbers, vocabulary count, and XP reward. Locked modules should be slightly faded with a lock icon.

**1C. Basic Español Sub-view:**
- **Layout:** A left-hand sidebar for Course Modules (Lesson 1, 2, 3) and a main content area for the active lesson.
- **Content Area:** Rich text formatting for grammar rules (e.g., "The 5 Pure Spanish Vowels") with clear phonetic tables and audio trigger placeholders.

---

## [SCREEN 2: The "⚔️ Practice" View (Active Study)]
**Active State:** The `[⚔️ Practice]` tab is highlighted.
**Layout Structure:** Sub-navigation menu for Training Grounds, Voice Arena, and AI Companion.

**2A. Training Grounds Sub-view:**
- **Layout:** A multi-column grid of thick, tactile option blocks for different drill types (Grammar Blitz, Conjugation Blitz, Listening Reps, Speaking Reps, Vocab Drill, Auto Flashcards).
- **Design:** Each block features an icon, a title, a short description, and a massive interactive primary action button at the bottom labeled "Start [Drill Name]".

**2B. Voice Arena Sub-view:**
- **Layout:** Split view. 
  - **Left:** A scrollable list of speaking exercises categorized by CEFR level. 
  - **Right:** The active pronunciation focus card featuring the target phrase in Spanish and English, a "Listen Pronunciation" button, and a large, prominent microphone button centered at the bottom to record speech.

**2C. AI Companion Sub-view:**
- **Layout:** A grid of "Real-Life Scenarios" cards (e.g., Greetings, Shopping, Hotel Check-in).
- **Card Styling:** Each scenario card must show an illustration, the AI character's name/role, the CEFR level tag, the specific goal (e.g., "Book a room"), and an "Initiate ->" button.

---

## [SCREEN 3: The "📚 Library" View (Casual Reading)]
**Active State:** The `[📚 Library]` tab is highlighted.
**Layout Structure:** A dedicated reading hub for stories.

- **Header/Filter Bar:** A horizontal row of rounded bubble buttons for filtering by reading level: `[All Stories]`, `[Nursery]`, `[A1]`, `[A2]`, `[B1]`.
- **Main Layout:** A clean 3x4 grid of story booklet cards.
- **Card Details:** Each booklet card must be styled to resemble a soft, pastel book cover. Include:
  - Level tag (e.g., "PRE-A1 / NURSERY").
  - Bold title (e.g., "El Perro Alegre").
  - A short text snippet description.
  - A chip tracking the vocabulary count.
  - An explicit text button anchor on the bottom right reading "Read Story →" (or "Leer Historia →").

---

## [SCREEN 4: The "🦊 Shop" View (Rewards Ecosystem)]
**Active State:** The `[🦊 Shop]` tab is highlighted.
**Layout Structure:** A split vertical layout for the Kitsune Store and the Card Album.

- **Top Banner:** A decorative storefront header labeled "Kitsune Shop" displaying the user's current coin balance (e.g., "🪙 96 KC").

**4A. Summoning Altar (Gacha/Store Section):**
- **Layout:** A large, prominent cozy 3D placeholder graphic box representing the "Summoning Altar".
- **Details:** Include a playful text lore box explaining drop rates (Legendary, Epic, Rare, Common) and a massive, thick pill-shaped button that reads "✦ SUMMON CARD (20 COINS)".

**4B. Card Album Section:**
- **Header:** Title reading "Card Album" with filter pills (All, Common, Rare, Epic, Legendary).
- **Layout:** A responsive grid of rounded character cards. 
- **Card Styling:** Each card shows a cute companion avatar illustration with a thick, brightly colored border matching their rarity level (e.g., Gold for Legendary, Purple for Epic).

## [Implementation Instructions for Stitch MCP]
1. Use semantic HTML and modern CSS/Tailwind to enforce the claymorphic dropshadows.
2. Ensure all 4 main tabs render independently but share the global sticky header.
3. Use placeholder data to populate the grids and tables so the layout density can be accurately evaluated.