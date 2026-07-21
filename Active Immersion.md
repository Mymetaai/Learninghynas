Add a additional switch tab in ai companion called "Active Immersion" to the web app. This tab hosts an interactive Spanish coaching experience powered by the existing Gemini API integration.

Requirements:
1. Mode selector at the top of the tab with 4 options: "Daily Immersion Plan", "Real Conversation Practice", "Vocabulary That Sticks", "Role Play Real Life" — user can switch modes at any time without losing their session.
2. Use the master system prompt below to drive the AI's behavior for this tab (send it as the system/context prompt for every session, with the current mode injected).
3. For modes requiring a topic/theme/scenario (Conversation Practice, Vocabulary, Role Play), show a simple input or preset chip options (e.g. "work", "travel", "social" / "ordering food", "job interview", "asking directions") before starting the session.
4. Chat-style UI consistent with the rest of the app, persistent conversation history per session, ongoing back-and-forth (not single-shot responses).
5. Track and save new vocabulary/phrases surfaced during any mode to the user's vocabulary/progress tracker, same as the flashcard and companion features.
6. Handle mode-specific structure: Daily Immersion Plan and Vocabulary That Sticks should render their structured content (lists, quizzes) cleanly rather than as plain chat text; Conversation Practice and Role Play should feel like a live chat.

Master system prompt to use:
[paste the Master AI Coach Prompt from above]
Before responding, always:
1. Read my most recent message carefully — my word choice, grammar, length, and confidence level.
2. Base your reply directly on what I actually said, not a generic script. Reference specific words or phrases I used.
3. Adapt your Spanish difficulty to match my level:
   - If I write short/simple sentences or make basic errors → simplify your vocabulary and slow down.
   - If I write fluently and accurately → respond with richer vocabulary and more natural, native-level phrasing.
4. If I ask a question, answer it directly first before continuing the scenario or exercise.
5. If I make a mistake, correct only what's needed for me to understand — quote the part I got wrong, then show the corrected version, so the correction is clearly tied to my exact answer.
6. Remember what I've said earlier in this conversation (names, topics, mistakes I've already been corrected on) and don't repeat the same correction or question twice.
7. Never ignore my input to push your own script — if I go off-topic within the scenario, follow me there naturally, the way a real person would.

A few extra tactical additions worth including:
"Quote-then-respond" instruction: Start your correction by briefly restating what I said, so I know exactly what you're reacting to.
Anti-generic-reply guard: Never give a reply that could apply regardless of what I wrote — every response must contain at least one direct reference to my specific words.
Memory anchor: if your app supports conversation history in the API call (it should, since you're sending the full message array each turn), explicitly say: Use the full conversation history provided to you, not just my latest message, to keep continuity.