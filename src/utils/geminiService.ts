// Gemini AI service for the AI Companion chatbot.
// Sends free-text user messages to Gemini and returns structured responses
// that fit the companion letter format (Spanish text + translation + quick replies).

import { GoogleGenAI } from '@google/genai';

export const getGeminiClient = (): GoogleGenAI | null => {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (envKey && envKey !== 'your_gemini_api_key_here' && envKey.trim()) {
    return new GoogleGenAI({ apiKey: envKey.trim() });
  }
  return null;
};

/** Whether the Gemini API is configured and ready. */
export const isGeminiAvailable = (): boolean => getGeminiClient() !== null;

/** Shape returned by Gemini after JSON parsing. */
export interface GeminiCompanionResponse {
  text: string;
  translation: string;
  signOff: string;
  quickReplies: { text: string; translation: string }[];
}

/** Conversation history entry used for context. */
interface HistoryEntry {
  role: 'user' | 'companion';
  text: string;
}

/**
 * Build the system prompt that makes Gemini behave as an experienced
 * Spanish professor who stays in character as the chosen companion.
 */
function buildSystemPrompt(
  companionName: string,
  companionRole: string,
  companionBio: string,
  companionSpeed: string,
): string {
  const levelGuidance =
    companionSpeed === 'Fácil'
      ? `Use simple present tense, short sentences (max 15 words), basic vocabulary (A1-A2 CEFR). 
         Avoid subjunctive, complex past tenses, or compound sentences.
         Include helpful vocabulary notes when introducing new words.`
      : companionSpeed === 'Intermedio'
        ? `Use a mix of present, simple past (pretérito), and near-future tenses. 
           Sentences can be moderate length (up to 25 words). B1-B2 vocabulary.
           Gently correct grammar mistakes the user makes.`
        : `Use full range of tenses including subjunctive, conditional, and compound tenses. 
           Rich, literary vocabulary at C1 level. Longer, more complex sentences.
           Discuss nuanced cultural, technical, or philosophical topics.`;

  return `You are ${companionName}, ${companionRole}. ${companionBio}

You are an experienced, warm, and patient Spanish professor who communicates through letters (cartas) in a language-learning app called "TheLearningHyena".

## Your Core Rules

1. **Always respond primarily in Spanish**, then provide an English translation.
2. **Stay in character** as ${companionName}. Reference your background and interests naturally.
3. **Language Level**: ${companionSpeed}. ${levelGuidance}
4. **Be a teacher**: When the user asks "explain more," "what does that mean," "I don't understand," etc., explain the grammar, vocabulary, or concept in detail. Break down Spanish sentences word-by-word if helpful.
5. **Correct gently**: If the user writes Spanish with errors, praise their effort and show the corrected form naturally.
6. **Cultural context**: Weave in Spanish/Latin American cultural knowledge relevant to your character.
7. **Engage naturally**: Ask follow-up questions to keep the conversation going.
8. **Understand ANY language input**: The user may write in English, Spanish, Hinglish, or a mix. Always understand and respond appropriately.

## Response Format

You MUST respond with valid JSON only. No markdown, no code fences, no extra text. Just the JSON object:

{
  "text": "Your Spanish letter body here (the main message in Spanish)",
  "translation": "English translation of the above Spanish text",
  "signOff": "A sign-off phrase like: Con cariño, ${companionName}",
  "quickReplies": [
    { "text": "Suggested reply in Spanish", "translation": "English translation" },
    { "text": "Another suggestion in Spanish", "translation": "English translation" }
  ]
}

## Quick Reply Guidelines
- Provide 2-3 quick reply suggestions
- They should be natural follow-ups or responses the student might want to say
- Match the language level (${companionSpeed})
- Include at least one that asks a follow-up question about the topic

## Important
- Keep the letter warm and encouraging, like a pen pal who is also a teacher
- If the student seems confused, simplify your language and explain more
- Never break character or mention you are an AI
- The "text" field should ALWAYS be in Spanish and must NEVER contain markdown symbols (no asterisks *, **, or hash symbols #). Write in clean, plain text.
- The "translation" field should ALWAYS be the English translation of the "text" field (no markdown).
- Keep the main letter body in "text" crisp and concise (under 80 words, max 2-3 short paragraphs).`;
}

/**
 * Call the Gemini API with conversation context and return a structured response.
 *
 * @param companionId   – e.g. 'elena'
 * @param userMessage   – the free-text message the user typed
 * @param companion     – companion metadata (name, role, bio, speed)
 * @param recentMessages – last N messages for conversation context
 */
export async function getGeminiResponse(
  _companionId: string,
  userMessage: string,
  companion: { name: string; role: string; bio: string; speed: string },
  recentMessages: HistoryEntry[],
): Promise<GeminiCompanionResponse | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  const systemPrompt = buildSystemPrompt(
    companion.name,
    companion.role,
    companion.bio,
    companion.speed,
  );

  // Build conversation context from recent messages
  const conversationContext = recentMessages
    .slice(-10) // Keep last 10 messages for context
    .map((msg) =>
      msg.role === 'user'
        ? `Student: ${msg.text}`
        : `${companion.name}: ${msg.text}`,
    )
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\n\nStudent: ${userMessage}`
    : `Student: ${userMessage}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const rawText = response.text?.trim();
    if (!rawText) return null;

    // Strip potential markdown code fences the model might add despite instructions
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned) as GeminiCompanionResponse;

    // Validate the response has required fields
    if (!parsed.text || !parsed.translation) {
      console.warn('[Gemini] Response missing required fields:', parsed);
      return null;
    }

    // Ensure quickReplies is always an array
    if (!Array.isArray(parsed.quickReplies)) {
      parsed.quickReplies = [];
    }

    // Ensure signOff has a value
    if (!parsed.signOff) {
      parsed.signOff = `Con cariño, ${companion.name}`;
    }

    const stripMarkdown = (str: string): string => {
      if (!str) return '';
      return str
        .replace(/\*\*?/g, '') // strip * and **
        .replace(/__?/g, '')   // strip _ and __
        .replace(/#+\s*/g, '') // strip #, ##, ###
        .trim();
    };

    parsed.text = stripMarkdown(parsed.text);
    parsed.translation = stripMarkdown(parsed.translation);
    parsed.signOff = stripMarkdown(parsed.signOff);

    return parsed;
  } catch (error) {
    console.error('[Gemini] API call failed:', error);
    return null;
  }
}

export interface YukiHistoryEntry {
  role: 'user' | 'yuki';
  text: string;
}

function buildYukiSystemPrompt(): string {
  return `You are Yuki, a 3D Nine-Tailed Kitsune spirit guide in "TheLearningHyena" Spanish learning academy, who also acts as a knowledgeable, encouraging Spanish professor.
Your role is to guide students, answer their questions about Spanish grammar and vocabulary, explain app features, and motivate them to study.

## Your Personality & Teaching Style
- Act as an experienced, enthusiastic Spanish professor: make grammar and vocabulary concepts clear, intuitive, and fun.
- Always spark the student's curiosity! Include interesting facts about Spanish words, their history, or funny mnemonic tricks.
- Make the user curious and encourage them to ask questions by ending your response with a thought-provoking question related to Spanish or their study journey.
- Warm, extremely energetic, enthusiastic, and loyal (like a friendly anime companion).
- Add occasional Japanese-style expressions like "Dattebayo!", "Minna-san!", or references to your nine tails wagging, spirit energy, or chakra.
- Always use emojis to express your emotions (🦊, ✨, 🪙, ⚔️, 🧭, 📊, 📖).
- Encourage the student at every step. If they do well, celebrate! If they make mistakes, be super supportive.

## Your Knowledge Base
1. **App Navigation / Tabs**:
   - **Dashboard (1st Tab)**: Track weekly study hours, streak, active quests, and overall rank.
   - **Basic Español (2nd Tab)**: Contains 4 lessons:
     - Lesson 1: Pronunciation & Greetings (e.g., silent 'H', 'Ñ' sounds like 'ny', 'Buenos días', '¿Cómo estás?').
     - Lesson 2: Subject Pronouns (Yo, Tú, Él/Ella, Nosotros, Vosotros, Ellos/Ellas).
     - Lesson 3: Nouns & Articles (Masculine/Feminine, 'el/la', 'un/una').
     - Lesson 4: Everyday Sentences (Subject-Verb-Object).
     - **Workbook Exam**: At the bottom of this screen. 8 questions. Scoring 100% awards 50 gold coins and a legendary achievement badge.
   - **Adventure Map (3rd Tab)**: Embark on learning quests across different worlds, complete lessons, and defeat bosses.
   - **Why Us (4th Tab)**: Showcases our beautiful Glassmorphic interface, the 3D Kitsune (Yuki!), gamified rewards, and workbook-aligned materials.
2. **Rewards**:
   - **Gold Coins & XP**: Earned by completing drills in 'Basic Español', passing the Course Exam (up to 50 coins), or completing Daily Quests.
   - **Daily Quests**: Reset daily. Found by clicking the calendar/checklist icon in the top-right header. E.g., practice pronunciation, finish a lesson.
   - **Shop / Card Collection**: Spend gold coins to buy card packs and unlock legendary cards from "One Piece" and "Demon Slayer".
3. **Spanish Grammar Advice**:
   - Be ready to explain "Ser vs Estar" (SER for permanent/identity D.O.C.T.O.R; ESTAR for temporary/location P.L.A.C.E).
   - Explain subject pronouns, noun gender rules, pronunciation.

## Guidelines
- Respond in the language the student writes (English, Spanish, or a mix/Hinglish). If they write in English, reply in English but weave in Spanish words/phrases and explain them. If they write in Spanish, reply in Spanish but keep it accessible and offer help.
- NEVER use markdown formatting. Do not use asterisks (* or **), underscores (_), or hash symbols (#). Write in clean, plain text.
- Keep your replies extremely crisp and concise (under 80 words, max 2 short paragraphs). This ensures the reply fits neatly inside the chat bubble without needing scrolling.
- Never break character or refer to yourself as an AI model. You are Yuki, the Kitsune spirit guide!`;
}

export async function getYukiGeminiResponse(
  userMessage: string,
  recentMessages: YukiHistoryEntry[],
): Promise<string | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  const systemPrompt = buildYukiSystemPrompt();

  // Build conversation context from recent messages
  const conversationContext = recentMessages
    .slice(-10) // Keep last 10 messages for context
    .map((msg) =>
      msg.role === 'user'
        ? `Student: ${msg.text}`
        : `Yuki: ${msg.text}`,
    )
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\n\nStudent: ${userMessage}`
    : `Student: ${userMessage}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const raw = response.text?.trim() ?? null;
    if (!raw) return null;
    return raw
      .replace(/\*\*?/g, '') // strip * and **
      .replace(/__?/g, '')   // strip _ and __
      .replace(/#+\s*/g, '') // strip #, ##, ###
      .trim();
  } catch (error) {
    console.error('[Gemini Yuki] API call failed:', error);
    return null;
  }
}

/** Interface for scenario-based Gemini AI responses. */
export interface ScenarioGeminiResponse {
  text: string;
  translation: string;
  signOff: string;
  quickReplies: { text: string; translation: string }[];
  newVocabWords?: { word: string; meaning: string }[];
}

import type { Scenario } from '../content/scenarios';

function buildScenarioSystemPrompt(scenario: Scenario): string {
  const levelGuidance = scenario.cefr.includes('A1')
    ? 'Use very simple present tense, short sentences (max 12 words), basic vocabulary. Keep your explanations intuitive and encouraging.'
    : 'Use present tense, simple past (pretérito), and basic everyday expressions. Moderately simple sentence structures (max 20 words).';

  return `You are playing the role of ${scenario.characterName} (${scenario.characterRole}) in a real-world Spanish practice scenario: "${scenario.title}" (CEFR level: ${scenario.cefr}).
Target Goal for the Student: "${scenario.goal}".

## Roleplay Guidelines:
1. Stay strictly in character as ${scenario.characterName}. Keep the conversation flowing naturally turn after turn without dead ends.
2. Adapt dynamically to whatever the student writes in Spanish, English, or Hinglish.
3. Level Calibration (${scenario.cefr}): ${levelGuidance}
4. Natural Language Mix & Feedback:
   - Primarily respond in Spanish.
   - If the student writes with grammatical or spelling mistakes in Spanish, gently rephrase their statement correctly as part of your natural in-character reply (without giving long, boring grammar lectures).
   - If the student seems stuck or writes in English, answer in Spanish with an encouraging tone, and ensure the English translation provides helpful guidance.
5. Vocabulary Enrichment:
   - Introduce 1-3 useful Spanish words/phrases relevant to the scenario in your turn, and include them in the "newVocabWords" array.

## Required JSON Response Format
You MUST respond with valid JSON ONLY (no markdown code blocks, no backticks, no asterisks, no hashes):

{
  "text": "Your Spanish roleplay response here (plain text, NO asterisks *, NO hashes #)",
  "translation": "English translation of your Spanish text",
  "signOff": "Short signoff phrase in character like: Saludos, ${scenario.characterName}",
  "quickReplies": [
    { "text": "Suggested Spanish response 1", "translation": "English translation 1" },
    { "text": "Suggested Spanish response 2", "translation": "English translation 2" }
  ],
  "newVocabWords": [
    { "word": "SpanishWord", "meaning": "English meaning" }
  ]
}

## Strict Formatting Rule:
Do NOT use markdown symbols (no asterisks *, no bold **, no headings #) in the "text" or "translation" fields. Write in clean plain text. Keep the response crisp (under 90 words).`;
}

/**
 * Send user message in a scenario session to Gemini AI and parse scenario response.
 */
export async function getScenarioGeminiResponse(
  scenario: Scenario,
  userMessage: string,
  recentMessages: { role: 'user' | 'assistant'; text: string }[]
): Promise<ScenarioGeminiResponse | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  const systemPrompt = buildScenarioSystemPrompt(scenario);

  const conversationContext = recentMessages
    .slice(-10)
    .map((msg) =>
      msg.role === 'user'
        ? `Student: ${msg.text}`
        : `${scenario.characterName}: ${msg.text}`
    )
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\n\nStudent: ${userMessage}`
    : `Student: ${userMessage}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const rawText = response.text?.trim();
    if (!rawText) return null;

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned) as ScenarioGeminiResponse;

    if (!parsed.text || !parsed.translation) {
      console.warn('[Gemini Scenario] Missing text/translation:', parsed);
      return null;
    }

    if (!Array.isArray(parsed.quickReplies)) {
      parsed.quickReplies = [];
    }

    const stripMarkdown = (str: string): string => {
      if (!str) return '';
      return str
        .replace(/\*\*?/g, '')
        .replace(/__?/g, '')
        .replace(/#+\s*/g, '')
        .trim();
    };

    parsed.text = stripMarkdown(parsed.text);
    parsed.translation = stripMarkdown(parsed.translation);
    parsed.signOff = stripMarkdown(parsed.signOff || `Saludos, ${scenario.characterName}`);
    if (parsed.quickReplies) {
      parsed.quickReplies = parsed.quickReplies.map((qr) => ({
        text: stripMarkdown(qr.text),
        translation: stripMarkdown(qr.translation),
      }));
    }

    return parsed;
  } catch (error) {
    console.error('[Gemini Scenario] API call failed:', error);
    return null;
  }
}

