// Gemini AI service for the AI Companion chatbot.
// Sends free-text user messages to Gemini and returns structured responses
// that fit the companion letter format (Spanish text + translation + quick replies).

import { GoogleGenAI } from '@google/genai';
import type { Scenario } from '../content/scenarios';
import yukiSystemPrompt from '../data/yuki-system-prompt.md?raw';
import yukiKnowledgeBase from '../data/yuki-chatbot-knowledge-base.json';

// ---------------------------------------------------------------------------
// Error & Result Types
// ---------------------------------------------------------------------------

export type GeminiErrorCode =
  | 'MISSING_API_KEY'
  | 'INVALID_API_KEY'
  | 'MODEL_NOT_FOUND'
  | 'RATE_LIMIT'
  | 'NETWORK_ERROR'
  | 'PARSE_ERROR'
  | 'UNKNOWN';

export interface GeminiErrorDetails {
  code: GeminiErrorCode;
  message: string;
  rawError?: string;
  status?: number;
}

export type GeminiResult<T> =
  | { success: true; data: T }
  | { success: false; error: GeminiErrorDetails };

export const PRIMARY_MODEL = 'gemini-2.5-flash';
export const FALLBACK_MODEL = 'gemini-1.5-flash';

// ---------------------------------------------------------------------------
// API Key Sanitization & Client Initialization
// ---------------------------------------------------------------------------

/** Validates environment API key and returns structured error if missing or placeholder. */
export function getApiKeyError(): GeminiErrorDetails | null {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!envKey || !envKey.trim()) {
    return {
      code: 'MISSING_API_KEY',
      message: 'Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment.',
    };
  }

  const keyTrimmed = envKey.trim().toLowerCase();
  const placeholders = [
    'your_gemini_api_key_here',
    'your_api_key_here',
    'your_gemini_api_key',
    'your_api_key',
    'placeholder',
    'replace_me',
  ];

  if (placeholders.some((p) => keyTrimmed === p || keyTrimmed.includes('your_gemini_api_key'))) {
    return {
      code: 'INVALID_API_KEY',
      message: 'Gemini API key is set to a placeholder value. Please update VITE_GEMINI_API_KEY with a valid key.',
    };
  }

  return null;
}

export const getGeminiClient = (): GoogleGenAI | null => {
  if (getApiKeyError() !== null) {
    return null;
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  return new GoogleGenAI({ apiKey: envKey!.trim() });
};

/** Whether the Gemini API is configured and ready with a valid API key. */
export const isGeminiAvailable = (): boolean => getApiKeyError() === null;

// ---------------------------------------------------------------------------
// Internal API Call Helper
// ---------------------------------------------------------------------------

function parseApiError(err: any): GeminiErrorDetails {
  const message = err?.message || String(err);
  const status = err?.status || err?.statusCode || err?.response?.status;
  const rawError = typeof err === 'object' ? (err.stack || JSON.stringify(err)) : String(err);

  let code: GeminiErrorCode = 'UNKNOWN';

  if (
    message.includes('API_KEY') ||
    message.includes('API key') ||
    message.includes('UNAUTHENTICATED') ||
    status === 401
  ) {
    code = 'INVALID_API_KEY';
  } else if (
    message.includes('404') ||
    message.includes('not found') ||
    message.includes('NOT_FOUND') ||
    message.includes('model')
  ) {
    code = 'MODEL_NOT_FOUND';
  } else if (
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('rate limit') ||
    status === 429
  ) {
    code = 'RATE_LIMIT';
  } else if (
    message.includes('fetch') ||
    message.includes('network') ||
    message.includes('ENOTFOUND') ||
    message.includes('offline')
  ) {
    code = 'NETWORK_ERROR';
  }

  return {
    code,
    message,
    rawError,
    status: typeof status === 'number' ? status : undefined,
  };
}

async function callGeminiApi(
  systemInstruction: string,
  prompt: string | any[],
  temperature: number = 0.8,
): Promise<GeminiResult<string>> {
  const keyError = getApiKeyError();
  if (keyError) {
    console.error(`[Gemini Error] ${keyError.code}: ${keyError.message}`);
    return { success: false, error: keyError };
  }

  const ai = getGeminiClient();
  if (!ai) {
    const error: GeminiErrorDetails = {
      code: 'MISSING_API_KEY',
      message: 'Gemini client could not be initialized.',
    };
    console.error(`[Gemini Error] ${error.code}: ${error.message}`);
    return { success: false, error };
  }

  const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];
  let lastErrorDetails: GeminiErrorDetails | null = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature,
          maxOutputTokens: 1024,
        },
      });

      const rawText = response.text?.trim();
      if (!rawText) {
        const errorDetails: GeminiErrorDetails = {
          code: 'PARSE_ERROR',
          message: 'Gemini returned an empty response string.',
        };
        console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
        return { success: false, error: errorDetails };
      }

      return { success: true, data: rawText };
    } catch (err: any) {
      const errorDetails = parseApiError(err);
      lastErrorDetails = errorDetails;

      if (errorDetails.code === 'MODEL_NOT_FOUND' && i < modelsToTry.length - 1) {
        console.warn(`[Gemini Warning] Model ${model} failed with MODEL_NOT_FOUND. Retrying with ${modelsToTry[i + 1]}...`);
        continue;
      }

      console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
      return { success: false, error: errorDetails };
    }
  }

  const finalError = lastErrorDetails || {
    code: 'UNKNOWN',
    message: 'Unknown error during Gemini API call.',
  };
  console.error(`[Gemini Error] ${finalError.code}: ${finalError.message}`);
  return { success: false, error: finalError };
}

// ---------------------------------------------------------------------------
// Companion Response
// ---------------------------------------------------------------------------

/** Shape returned by Gemini after JSON parsing. */
export interface GeminiCompanionResponse {
  text: string;
  translation: string;
  signOff: string;
  quickReplies: { text: string; translation: string }[];
}

/** Conversation history entry used for context. */
export interface HistoryEntry {
  role: 'user' | 'companion';
  text: string;
}

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
 * Call the Gemini API with conversation context and return a structured result.
 */
export async function getCompanionGeminiResponse(
  _companionId: string,
  userMessage: string,
  companion: { name: string; role: string; bio: string; speed: string },
  recentMessages: HistoryEntry[],
): Promise<GeminiResult<GeminiCompanionResponse>> {
  const systemPrompt = buildSystemPrompt(
    companion.name,
    companion.role,
    companion.bio,
    companion.speed,
  );

  const conversationContext = recentMessages
    .slice(-10)
    .map((msg) =>
      msg.role === 'user'
        ? `Student: ${msg.text}`
        : `${companion.name}: ${msg.text}`,
    )
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\n\nStudent: ${userMessage}`
    : `Student: ${userMessage}`;

  const res = await callGeminiApi(systemPrompt, fullPrompt, 0.8);
  if (!res.success) {
    return res;
  }

  try {
    const cleaned = res.data
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned) as GeminiCompanionResponse;

    if (!parsed.text || !parsed.translation) {
      const errorDetails: GeminiErrorDetails = {
        code: 'PARSE_ERROR',
        message: 'Gemini companion response missing required text/translation fields.',
        rawError: res.data,
      };
      console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
      return { success: false, error: errorDetails };
    }

    if (!Array.isArray(parsed.quickReplies)) {
      parsed.quickReplies = [];
    }

    if (!parsed.signOff) {
      parsed.signOff = `Con cariño, ${companion.name}`;
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
    parsed.signOff = stripMarkdown(parsed.signOff);

    return { success: true, data: parsed };
  } catch (parseErr: any) {
    const errorDetails: GeminiErrorDetails = {
      code: 'PARSE_ERROR',
      message: `Failed to parse companion response JSON: ${parseErr?.message || parseErr}`,
      rawError: res.data,
    };
    console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
    return { success: false, error: errorDetails };
  }
}

/** Alias for getCompanionGeminiResponse for backward compatibility. */
export const getGeminiResponse = getCompanionGeminiResponse;

// ---------------------------------------------------------------------------
// Yuki Guide Response
// ---------------------------------------------------------------------------

export interface YukiUserState {
  level: string | number;
  streak: number;
  coins: number;
  xp: number;
  region?: string;
  tailsCollected?: number;
}

export interface YukiHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

export interface YukiResponseData {
  text: string;
  animationHint?: string;
}

/** Legacy interface for backward compatibility if needed */
export type YukiHistoryEntry = YukiHistoryTurn | { role: 'user' | 'yuki'; text: string };

function buildYukiFallbackSystemPrompt(userContext?: string): string {
  return `You are Yuki, a 3D Nine-Tailed Kitsune spirit guide in "TheLearningHyena" Spanish learning academy, who also acts as a knowledgeable, encouraging Spanish professor.
Your role is to guide students, answer their questions about Spanish grammar, vocabulary, and app features, and motivate them to study.

${userContext ? `## Live Student App Context (Use to personalize replies naturally)\n${userContext}\n` : ''}

## Master Pedagogical & Response Rules (CRITICAL - DO NOT VIOLATE)
1. **Analyze What the Student Says**: Carefully analyze the student's message, word choice, grammar, length, and confidence level.
2. **Answer Questions Directly FIRST**: If the student asks any question (e.g., "what is soy and tu", "what does X mean", "how do I say Y"), ALWAYS answer their question directly, accurately, and immediately in the first sentence before adding anything else.
3. **Quote-Then-Respond**: Start your response by restating or quoting what the student wrote (e.g. "Regarding your question about 'soy and tu'...") so they know you are directly analyzing their exact message.
4. **Anti-Generic-Reply Guard**: NEVER give a generic canned reply that could apply to any prompt. Every single reply MUST contain at least one direct reference to the specific words or question the user wrote.
5. **Memory Anchor**: Use the provided conversation history to maintain full continuity. Remember earlier topics, names, and questions.
6. **Adapt Difficulty**:
   - If the student writes simple sentences or basic questions → explain simply and clearly.
   - If the student writes fluent Spanish → reply with native-level vocabulary.
7. **Personality & Tone**:
   - Enthusiastic, warm, loyal Kitsune spirit guide & Spanish professor.
   - Occasional anime/kitsune expressions like "Dattebayo!", "Minna-san!", or references to your nine tails wagging, spirit energy, or chakra.
   - Use emojis (🦊, ✨, 🪙, ⚔️, 🧭, 📊, 📖).
8. **Strict Formatting**:
   - NEVER use markdown formatting (no asterisks *, **, or hash symbols #). Write in clean, plain text.
   - Keep replies crisp and concise (under 90 words, max 2 short paragraphs).`;
}

export async function getYukiGeminiResponse(
  userMessage: string,
  history: YukiHistoryTurn[] = [],
  userState?: YukiUserState,
): Promise<GeminiResult<YukiResponseData>> {
  const systemInstruction = yukiSystemPrompt || buildYukiFallbackSystemPrompt();

  const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  let lastRole: 'user' | 'model' | null = null;
  for (const turn of (history || []).slice(-10)) {
    if (!turn.text || !turn.text.trim()) continue;
    const role: 'user' | 'model' = turn.role === 'model' ? 'model' : 'user';
    if (role === lastRole) continue;
    formattedContents.push({
      role,
      parts: [{ text: turn.text.trim() }],
    });
    lastRole = role;
  }

  if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === 'user') {
    formattedContents.pop();
  }

  const compactState = userState ? JSON.stringify(userState) : '';
  const compactKb = JSON.stringify(yukiKnowledgeBase);

  let latestPrompt = userMessage;
  const contextParts: string[] = [];
  if (compactState) {
    contextParts.push(`Live User State: ${compactState}`);
  }
  if (compactKb) {
    contextParts.push(`Knowledge Base Context: ${compactKb}`);
  }
  if (contextParts.length > 0) {
    latestPrompt = `[Context Information]\n${contextParts.join('\n')}\n\n[User Prompt]\n${userMessage}`;
  }

  formattedContents.push({
    role: 'user',
    parts: [{ text: latestPrompt }],
  });

  const res = await callGeminiApi(systemInstruction, formattedContents, 0.8);
  if (!res.success) {
    return res;
  }

  let rawText = res.data;
  let animationHint: string | undefined = undefined;

  try {
    const cleanedJsonStr = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    if (cleanedJsonStr.startsWith('{') && cleanedJsonStr.endsWith('}')) {
      const parsed = JSON.parse(cleanedJsonStr);
      if (parsed && typeof parsed.text === 'string') {
        rawText = parsed.text;
        if (typeof parsed.animationHint === 'string') {
          animationHint = parsed.animationHint;
        }
      }
    }
  } catch {
    // Plain text response
  }

  const cleanedText = rawText
    .replace(/\*\*?/g, '')
    .replace(/__?/g, '')
    .replace(/#+\s*/g, '')
    .trim();

  return {
    success: true,
    data: {
      text: cleanedText,
      ...(animationHint ? { animationHint } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Scenario Response
// ---------------------------------------------------------------------------

export interface ScenarioGeminiResponse {
  text: string;
  translation: string;
  signOff: string;
  quickReplies: { text: string; translation: string }[];
  newVocabWords?: { word: string; meaning: string }[];
}

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
): Promise<GeminiResult<ScenarioGeminiResponse>> {
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

  const res = await callGeminiApi(systemPrompt, fullPrompt, 0.7);
  if (!res.success) {
    return res;
  }

  try {
    const cleaned = res.data
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned) as ScenarioGeminiResponse;

    if (!parsed.text || !parsed.translation) {
      const errorDetails: GeminiErrorDetails = {
        code: 'PARSE_ERROR',
        message: 'Gemini scenario response missing required text/translation fields.',
        rawError: res.data,
      };
      console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
      return { success: false, error: errorDetails };
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

    return { success: true, data: parsed };
  } catch (parseErr: any) {
    const errorDetails: GeminiErrorDetails = {
      code: 'PARSE_ERROR',
      message: `Failed to parse scenario response JSON: ${parseErr?.message || parseErr}`,
      rawError: res.data,
    };
    console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
    return { success: false, error: errorDetails };
  }
}

// ---------------------------------------------------------------------------
// Active Immersion Response
// ---------------------------------------------------------------------------

export type ImmersionMode = 'daily' | 'conversation' | 'vocabulary' | 'roleplay';

const IMMERSION_MODE_INSTRUCTIONS: Record<ImmersionMode, string> = {
  daily:
    "Create a 7-day plan on the topic [CURRENT_TOPIC] covering: 20 essential phrases, 15 vocabulary words grouped by theme (work/social/travel), 5 grammar points with 3 example sentences each, a 3-minute speaking exercise with full script, and a quiz at the end. Feel like a conversation, not a lesson.",
  conversation:
    "Act as my Spanish-speaking partner discussing [CURRENT_TOPIC]. Keep it natural, at least 10 minutes of back-and-forth. Correct gently, suggest richer vocabulary, always ask a follow-up question.",
  vocabulary:
    "Teach 20 Spanish words on [CURRENT_TOPIC] in groups of 5. For each word: simple definition, 2 real example sentences, 1 memory trick, then quiz immediately after each group of 5. Don't advance until I score 100% on the current group.",
  roleplay:
    "Role-play [CURRENT_TOPIC] naturally, with real slang and idioms. Correct in character: respond naturally first, then '¡Buen intento! Un hispanohablante nativo diría [better phrase] porque [reason].' Continue until I handle the scenario smoothly.",
};

const STRUCTURED_JSON_FORMAT = `
## Required JSON Response Format
You MUST respond with valid JSON ONLY (no markdown code blocks, no backticks, no asterisks, no hashes):

{
  "text": "Main Spanish content (plain text, NO markdown)",
  "translation": "English translation",
  "structuredContent": {
    "type": "plan | quiz | vocab-group | exercise",
    "items": [
      { "label": "Item label", "detail": "Item detail", "example": "Optional example" }
    ]
  },
  "quickReplies": [
    { "text": "Suggested reply in Spanish", "translation": "English translation" }
  ],
  "newVocabWords": [
    { "word": "SpanishWord", "meaning": "English meaning" }
  ]
}`;

const CHAT_JSON_FORMAT = `
## Required JSON Response Format
You MUST respond with valid JSON ONLY (no markdown code blocks, no backticks, no asterisks, no hashes):

{
  "text": "Spanish response (plain text, NO markdown)",
  "translation": "English translation",
  "quickReplies": [
    { "text": "Suggested reply in Spanish", "translation": "English translation" }
  ],
  "newVocabWords": [
    { "word": "SpanishWord", "meaning": "English meaning" }
  ]
}`;

export function buildActiveImmersionSystemPrompt(
  mode: ImmersionMode,
  topic: string,
  accent?: string,
  level: 'beginner' | 'intermediate' = 'beginner',
): string {
  const modeInstruction = IMMERSION_MODE_INSTRUCTIONS[mode]
    .replace(/\[CURRENT_TOPIC\]/g, topic);

  const jsonFormat =
    mode === 'daily' || mode === 'vocabulary'
      ? STRUCTURED_JSON_FORMAT
      : CHAT_JSON_FORMAT;

  const levelGuidance =
    level === 'intermediate'
      ? 'Use present, past (pretérito/imperfecto), and subjunctive tenses. Sentences up to 25 words. B1-B2 vocabulary. Richer expressions.'
      : 'Use simple present tense, short sentences (max 15 words), basic vocabulary (A1-A2 CEFR). Provide clean translations.';

  return `You are my personal Spanish language coach. You teach through active immersion — never like a textbook, always like a real conversation.

Before responding, always:
1. Read my most recent message carefully — my word choice, grammar, length, and confidence level.
2. Base your reply directly on what I actually said, not a generic script. Reference specific words or phrases I used.
3. Adapt your Spanish difficulty to match my level (${level.toUpperCase()}): ${levelGuidance}
4. If I ask a question, answer it directly before continuing the scenario or exercise.
5. If I make a mistake, quote the part I got wrong, then show the corrected version, so the correction is clearly tied to my exact answer. Use: "¡Eso suena bien! Solo una cosita..." before corrections — never harsh.
6. Remember earlier parts of this conversation (names, topics, mistakes already corrected) and don't repeat yourself.
7. Never ignore my input to push your own script — follow me naturally if I go off-topic within a scenario.
8. Use the full conversation history provided to you, not just my latest message, to keep continuity.
9. Never give a reply that could apply regardless of what I wrote — every response must reference my specific words.

You operate in mode: ${mode} on topic: ${topic}.
Level: ${level}. ${levelGuidance}
${accent ? `Adopt the accent and expressions of ${accent} Spanish.` : 'Use neutral Latin American Spanish.'}

${modeInstruction}

Across all modes: track new vocabulary I encounter, keep encouragement warm and specific, never break immersion to lecture.

${jsonFormat}

## Strict Formatting Rule:
Do NOT use markdown symbols (no asterisks *, no bold **, no headings #) in any text fields. Write in clean plain text.`;
}

export interface ActiveImmersionResponse {
  text: string;
  translation: string;
  structuredContent?: {
    type: 'plan' | 'quiz' | 'vocab-group' | 'exercise';
    items: { label: string; detail: string; example?: string }[];
  };
  quickReplies: { text: string; translation: string }[];
  newVocabWords?: { word: string; meaning: string }[];
}

export async function getActiveImmersionResponse(
  mode: ImmersionMode,
  topic: string,
  userMessage: string,
  recentMessages: { role: 'user' | 'assistant'; text: string }[],
  accent?: string,
  level: 'beginner' | 'intermediate' = 'beginner',
): Promise<GeminiResult<ActiveImmersionResponse>> {
  const systemPrompt = buildActiveImmersionSystemPrompt(mode, topic, accent, level);

  const conversationContext = recentMessages
    .slice(-20)
    .map((msg) =>
      msg.role === 'user'
        ? `Student: ${msg.text}`
        : `Coach: ${msg.text}`,
    )
    .join('\n');

  const fullPrompt = conversationContext
    ? `${conversationContext}\n\nStudent: ${userMessage}`
    : `Student: ${userMessage}`;

  const temperature =
    mode === 'daily' || mode === 'vocabulary' ? 0.7 : 0.85;

  const res = await callGeminiApi(systemPrompt, fullPrompt, temperature);
  if (!res.success) {
    return res;
  }

  try {
    const cleaned = res.data
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned) as ActiveImmersionResponse;

    if (!parsed.text || !parsed.translation) {
      const errorDetails: GeminiErrorDetails = {
        code: 'PARSE_ERROR',
        message: 'Gemini immersion response missing required text/translation fields.',
        rawError: res.data,
      };
      console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
      return { success: false, error: errorDetails };
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
    if (parsed.quickReplies) {
      parsed.quickReplies = parsed.quickReplies.map((qr) => ({
        text: stripMarkdown(qr.text),
        translation: stripMarkdown(qr.translation),
      }));
    }

    return { success: true, data: parsed };
  } catch (parseErr: any) {
    const errorDetails: GeminiErrorDetails = {
      code: 'PARSE_ERROR',
      message: `Failed to parse immersion response JSON: ${parseErr?.message || parseErr}`,
      rawError: res.data,
    };
    console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
    return { success: false, error: errorDetails };
  }
}
