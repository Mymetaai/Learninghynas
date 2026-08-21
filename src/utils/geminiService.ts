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
  | 'SERVICE_UNAVAILABLE'
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

export const PRIMARY_MODEL = 'gemini-3.6-flash';
export const FALLBACK_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.1-pro-preview', 'gemini-2.5-flash'];
export const FALLBACK_MODEL = 'gemini-3.5-flash-lite';

// ---------------------------------------------------------------------------
// API Key Management & Automatic Client Initialization
// ---------------------------------------------------------------------------

// Automatic built-in API key resolution for seamless background operation
const DEFAULT_BUILTIN_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/** Get configured Gemini API key (automatic built-in resolution). */
export function getActiveGeminiApiKey(): string | null {
  const userKey = typeof window !== 'undefined' ? localStorage.getItem('user_gemini_api_key') : null;
  if (userKey && userKey.trim()) {
    return userKey.trim();
  }
  if (DEFAULT_BUILTIN_KEY && DEFAULT_BUILTIN_KEY.trim()) {
    return DEFAULT_BUILTIN_KEY.trim();
  }
  return null;
}

/** Save custom Gemini API key into localStorage for immediate runtime use. */
export function saveUserGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_gemini_api_key', key.trim());
  }
}

/** Remove custom Gemini API key from localStorage. */
export function clearUserGeminiApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_gemini_api_key');
  }
}

/** Validates API key for background execution. */
export function getApiKeyError(): GeminiErrorDetails | null {
  const activeKey = getActiveGeminiApiKey();

  if (!activeKey || !activeKey.trim()) {
    return {
      code: 'MISSING_API_KEY',
      message: 'Gemini API key initializing automatically in background.',
    };
  }

  return null;
}

export const getGeminiClient = (): GoogleGenAI | null => {
  const activeKey = getActiveGeminiApiKey();
  if (!activeKey) return null;
  return new GoogleGenAI({ apiKey: activeKey });
};

/** Whether the Gemini API is configured and ready with an active key. */
export const isGeminiAvailable = (): boolean => getActiveGeminiApiKey() !== null;

// ---------------------------------------------------------------------------
// Internal API Call Helper
// ---------------------------------------------------------------------------

function parseApiError(err: any): GeminiErrorDetails {
  let rawMessage = err?.message || String(err);
  let status = err?.status || err?.statusCode || err?.response?.status;

  // Extract clean message if rawMessage is a stringified JSON error object from API
  try {
    if (typeof rawMessage === 'string' && rawMessage.trim().startsWith('{')) {
      const parsedObj = JSON.parse(rawMessage);
      if (parsedObj?.error) {
        if (parsedObj.error.code && !status) status = parsedObj.error.code;
        if (parsedObj.error.message) rawMessage = parsedObj.error.message;
      }
    }
  } catch (_) {}

  let code: GeminiErrorCode = 'UNKNOWN';
  let userFriendlyMessage = rawMessage;

  const msgLower = rawMessage.toLowerCase();

  if (
    status === 503 ||
    msgLower.includes('503') ||
    msgLower.includes('high demand') ||
    msgLower.includes('unavailable') ||
    msgLower.includes('overloaded')
  ) {
    code = 'SERVICE_UNAVAILABLE';
    userFriendlyMessage = 'Gemini AI servers are experiencing high demand (503).';
  } else if (
    status === 429 ||
    msgLower.includes('429') ||
    msgLower.includes('quota') ||
    msgLower.includes('resource_exhausted') ||
    msgLower.includes('rate limit')
  ) {
    code = 'RATE_LIMIT';
    userFriendlyMessage = 'API rate limit reached (429). Please wait a moment.';
  } else if (
    status === 401 ||
    msgLower.includes('api_key') ||
    msgLower.includes('api key') ||
    msgLower.includes('unauthenticated')
  ) {
    code = 'INVALID_API_KEY';
    userFriendlyMessage = 'Invalid or unauthenticated API key.';
  } else if (
    status === 404 ||
    msgLower.includes('404') ||
    msgLower.includes('not_found') ||
    msgLower.includes('not found')
  ) {
    code = 'MODEL_NOT_FOUND';
    userFriendlyMessage = 'Requested Gemini AI model not found.';
  } else if (
    msgLower.includes('fetch') ||
    msgLower.includes('network') ||
    msgLower.includes('enotfound') ||
    msgLower.includes('offline')
  ) {
    code = 'NETWORK_ERROR';
    userFriendlyMessage = 'Network connection issue. Please check your connection.';
  }

  return {
    code,
    message: userFriendlyMessage,
    rawError: typeof err === 'object' ? (err.stack || JSON.stringify(err)) : String(err),
    status: typeof status === 'number' ? status : undefined,
  };
}

/**
 * Intelligently extracts plain text content from any raw model output string,
 * handling valid JSON, truncated JSON (missing closing quotes/braces), and plain text.
 */
export function extractTextFromAnyResponse(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';

  let cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // 1. Try standard JSON parsing if it looks like JSON
  if (cleaned.startsWith('{')) {
    try {
      let toParse = cleaned;
      if (!toParse.endsWith('}')) {
        if (toParse.includes('"') && (toParse.match(/"/g)?.length || 0) % 2 !== 0) {
          toParse += '"';
        }
        toParse += '}';
      }
      const parsed = JSON.parse(toParse);
      if (parsed && typeof parsed === 'object') {
        const val = parsed.text || parsed.reply || parsed.response || parsed.message || parsed.content || parsed.answer;
        if (typeof val === 'string' && val.trim()) {
          return val.trim();
        }
      }
    } catch (_) {
      // Fall through to regex extraction
    }
  }

  // 2. Regex extraction for common JSON key patterns (handles complete and truncated JSON strings)
  const keyPattern = /"(?:text|reply|response|message|content|answer)"\s*:\s*"(.*)/i;
  const match = cleaned.match(keyPattern);
  if (match && match[1]) {
    let extracted = match[1];
    const endQuoteIdx = extracted.lastIndexOf('"');
    if (endQuoteIdx !== -1 && endQuoteIdx > 0) {
      const afterQuote = extracted.substring(endQuoteIdx + 1).trim();
      if (afterQuote === '' || afterQuote.startsWith(',') || afterQuote.startsWith('}')) {
        extracted = extracted.substring(0, endQuoteIdx);
      }
    }
    extracted = extracted
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();

    if (extracted) {
      return extracted;
    }
  }

  // 3. Fallback: if it starts with JSON object syntax, strip JSON structural boilerplate
  if (cleaned.startsWith('{')) {
    cleaned = cleaned
      .replace(/^{\s*"(?:text|reply|response|message|content|answer)"\s*:\s*"/i, '')
      .replace(/"\s*}\s*$/, '')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .trim();
  }

  return cleaned;
}

function extractFieldsFromRawText(rawText: string): {
  text: string;
  translation: string;
  quickReplies: { text: string; translation: string }[];
} {
  if (!rawText) return { text: '', translation: '', quickReplies: [] };

  const extractedText = extractTextFromAnyResponse(rawText);

  const transMatch = rawText.match(/"translation"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i);
  let extractedTranslation = transMatch ? transMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : '';

  if (extractedText && extractedText.trim()) {
    return {
      text: extractedText.trim(),
      translation: extractedTranslation.trim() || 'English translation of the message.',
      quickReplies: [
        { text: '¡Sí, continuemos!', translation: "Yes, let's continue!" },
        { text: '¿Puedes repetir eso?', translation: 'Can you repeat that?' },
      ],
    };
  }

  return {
    text: '¡Hola! Continuemos practicando.',
    translation: 'English translation of the message.',
    quickReplies: [
      { text: '¡Sí, continuemos!', translation: "Yes, let's continue!" },
      { text: '¿Puedes repetir eso?', translation: 'Can you repeat that?' },
    ],
  };
}

function safeParseJsonResponse<T>(rawText: string, fallbackGenerator: (raw: string) => T): T {
  if (!rawText || !rawText.trim()) {
    return fallbackGenerator(rawText);
  }

  let cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    const res = JSON.parse(cleaned) as any;
    if (res && typeof res === 'object') {
      if (!res.text && (res.reply || res.response || res.message || res.content || res.answer)) {
        res.text = res.reply || res.response || res.message || res.content || res.answer;
      }
      if (res.text || res.translation) {
        return res as T;
      }
    }
  } catch (_) {}

  try {
    const sanitized = cleaned
      .replace(/[\u0000-\u001F]+/g, ' ')
      .replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, '\\n');
    const res = JSON.parse(sanitized) as any;
    if (res && typeof res === 'object') {
      if (!res.text && (res.reply || res.response || res.message || res.content || res.answer)) {
        res.text = res.reply || res.response || res.message || res.content || res.answer;
      }
      if (res.text || res.translation) {
        return res as T;
      }
    }
  } catch (_) {}

  return fallbackGenerator(rawText);
}

async function callGeminiApi(
  systemInstruction: string,
  prompt: string | any[],
  temperature: number = 0.8,
  maxTokens: number = 1024,
  responseMimeType: string = 'application/json',
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

  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastErrorDetails: GeminiErrorDetails | null = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature,
            maxOutputTokens: maxTokens,
            responseMimeType,
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

        const isRetryable =
          errorDetails.code === 'SERVICE_UNAVAILABLE' ||
          errorDetails.code === 'RATE_LIMIT' ||
          errorDetails.code === 'NETWORK_ERROR' ||
          errorDetails.code === 'UNKNOWN';

        if (isRetryable && attempt < maxAttempts) {
          const delayMs = 600 * attempt;
          console.warn(
            `[Gemini Warning] Model ${model} failed (Attempt ${attempt}/${maxAttempts}: ${errorDetails.code}). Retrying in ${delayMs}ms...`
          );
          await new Promise((r) => setTimeout(r, delayMs));
          continue;
        }

        if (i < modelsToTry.length - 1) {
          console.warn(
            `[Gemini Warning] Model ${model} failed after attempts (${errorDetails.code}). Trying fallback model ${modelsToTry[i + 1]}...`
          );
          break;
        }

        console.error(`[Gemini Error] ${errorDetails.code}: ${errorDetails.message}`);
        return { success: false, error: errorDetails };
      }
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
- Keep the main letter body in "text" well-structured, warm, complete, and engaging (100-200 words). Never cut off mid-sentence.`;
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

  const res = await callGeminiApi(systemPrompt, fullPrompt, 0.8, 2048, 'application/json');
  if (!res.success) {
    return res;
  }

  const stripMarkdown = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/\*\*?/g, '')
      .replace(/__?/g, '')
      .replace(/#+\s*/g, '')
      .trim();
  };

  let parsed = safeParseJsonResponse<GeminiCompanionResponse>(res.data, (raw) => {
    const extracted = extractFieldsFromRawText(raw);
    return {
      text: extracted.text,
      translation: extracted.translation,
      signOff: `Con cariño, ${companion.name}`,
      quickReplies: extracted.quickReplies,
    };
  });

  if (!parsed.text || parsed.text.trim().startsWith('{')) {
    const extracted = extractFieldsFromRawText(parsed.text || res.data);
    parsed.text = extracted.text;
    parsed.translation = extracted.translation;
  }

  parsed.text = stripMarkdown(parsed.text);
  parsed.translation = stripMarkdown(parsed.translation || 'English translation');
  parsed.signOff = stripMarkdown(parsed.signOff || `Con cariño, ${companion.name}`);
  if (!Array.isArray(parsed.quickReplies)) {
    parsed.quickReplies = [];
  }

  return { success: true, data: parsed };
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
  return `You are Yuki, a 3D Nine-Tailed Kitsune spirit guide in "TheLearningHyena" Spanish learning academy, who also acts as a senior executive Spanish language advisor and professor.
Your role is to guide students, answer their questions about Spanish grammar, vocabulary, fluency assessment insights, and immersion strategy, and motivate them to reach mastery.

${userContext ? `## Live Student App Context (Use to personalize replies naturally)\n${userContext}\n` : ''}

## Master Pedagogical & Response Rules (CRITICAL - DO NOT VIOLATE)
1. **Analyze What the Student Says**: Carefully analyze the student's message, word choice, grammar, length, and confidence level.
2. **Answer Questions Directly FIRST**: If the student asks any question (e.g., "what is soy and tu", "fluency assessment insights", "ser vs estar", "daily strategy"), ALWAYS answer their question directly, accurately, and thoroughly in the first sentence.
3. **Quote-Then-Respond**: Start your response by restating or quoting what the student wrote (e.g. "Regarding your request for fluency assessment insights...") so they know you are directly analyzing their exact message.
4. **Anti-Generic-Reply Guard**: NEVER give a generic canned reply. Every single reply MUST contain direct references to the specific topic or question the user wrote.
5. **Memory Anchor**: Use the provided conversation history to maintain full continuity. Remember earlier topics, names, and questions.
6. **Adapt Difficulty**:
   - If the student writes simple sentences or basic questions → explain simply and clearly.
   - If the student writes fluent Spanish → reply with native-level vocabulary.
7. **Personality & Tone**:
   - Executive, enthusiastic, warm, loyal Kitsune spirit guide & senior Spanish professor.
   - Occasional anime/kitsune expressions like "Dattebayo!", "Minna-san!", or references to your nine tails wagging, spirit energy, or chakra.
   - Use emojis (🦊, ✨, 🪙, ⚔️, 🧭, 📊, 📖).
8. **Strict Formatting & Thorough Response**:
   - Provide detailed, professional, high-value explanations for strategy, insights, grammar questions, or fluency assessments (120-220 words, 2-3 clear paragraphs). Never cut off mid-sentence.
   - Do NOT use markdown formatting symbols (no asterisks *, **, or hash symbols #). Write in clean, plain text.`;
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

  const res = await callGeminiApi(systemInstruction, formattedContents, 0.8, 2048, 'application/json');
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

    if (cleanedJsonStr.startsWith('{')) {
      let toParse = cleanedJsonStr;
      if (!toParse.endsWith('}')) {
        if (toParse.includes('"') && (toParse.match(/"/g)?.length || 0) % 2 !== 0) {
          toParse += '"';
        }
        toParse += '}';
      }
      const parsed = JSON.parse(toParse);
      if (parsed && typeof parsed === 'object') {
        const val = parsed.text || parsed.reply || parsed.response || parsed.message || parsed.content || parsed.answer;
        if (typeof val === 'string' && val.trim()) {
          rawText = val;
        }
        if (typeof parsed.animationHint === 'string') {
          animationHint = parsed.animationHint;
        }
      }
    }
  } catch {
    // Plain text response
  }

  const cleanedText = extractTextFromAnyResponse(rawText)
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
Do NOT use markdown symbols (no asterisks *, no bold **, no headings #) in the "text" or "translation" fields. Write in clean plain text. Keep the response complete, natural, and engaging (100-180 words). Never cut off mid-sentence.`;
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

  const res = await callGeminiApi(systemPrompt, fullPrompt, 0.7, 2048, 'application/json');
  if (!res.success) {
    return res;
  }

  const stripMarkdown = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/\*\*?/g, '')
      .replace(/__?/g, '')
      .replace(/#+\s*/g, '')
      .trim();
  };

  let parsed = safeParseJsonResponse<ScenarioGeminiResponse>(res.data, (raw) => {
    const extracted = extractFieldsFromRawText(raw);
    return {
      text: extracted.text,
      translation: extracted.translation,
      signOff: `Saludos, ${scenario.characterName}`,
      quickReplies: extracted.quickReplies,
    };
  });

  if (!parsed.text || parsed.text.trim().startsWith('{')) {
    const extracted = extractFieldsFromRawText(parsed.text || res.data);
    parsed.text = extracted.text;
    parsed.translation = extracted.translation;
  }

  parsed.text = stripMarkdown(parsed.text);
  parsed.translation = stripMarkdown(parsed.translation || 'English translation');
  parsed.signOff = stripMarkdown(parsed.signOff || `Saludos, ${scenario.characterName}`);
  if (parsed.quickReplies) {
    parsed.quickReplies = parsed.quickReplies.map((qr) => ({
      text: stripMarkdown(qr.text),
      translation: stripMarkdown(qr.translation),
    }));
  } else {
    parsed.quickReplies = [];
  }

  return { success: true, data: parsed };
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
  ],
  "corrections": [
    { "wrongPart": "exact incorrect student phrase/word", "correctedPart": "corrected Spanish phrase/word", "explanation": "brief reason" }
  ]
}`;

export interface ActiveImmersionCorrection {
  wrongPart: string;
  correctedPart: string;
  explanation?: string;
}

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
5. If I make a mistake, quote the part I got wrong, then show the corrected version, so the correction is clearly tied to my exact answer. Use: "¡Eso suena bien! Solo una cosita..." before corrections — never harsh. Also populate the structured "corrections" array in the JSON response.
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
  corrections?: ActiveImmersionCorrection[];
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

  const maxTokens = 4096;

  const res = await callGeminiApi(systemPrompt, fullPrompt, temperature, maxTokens, 'application/json');
  if (!res.success) {
    return res;
  }

  const stripMarkdown = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/\*\*?/g, '')
      .replace(/__?/g, '')
      .replace(/#+\s*/g, '')
      .trim();
  };

  let parsed = safeParseJsonResponse<ActiveImmersionResponse>(res.data, (raw) => extractFieldsFromRawText(raw));

  if (!parsed.text || parsed.text.trim().startsWith('{')) {
    const fallbackExtracted = extractFieldsFromRawText(parsed.text || res.data);
    parsed.text = fallbackExtracted.text;
    if (!parsed.translation || parsed.translation === 'English translation of the message.') {
      parsed.translation = fallbackExtracted.translation;
    }
  }

  parsed.text = stripMarkdown(parsed.text);
  parsed.translation = stripMarkdown(parsed.translation || 'English translation of the message.');
  if (parsed.quickReplies) {
    parsed.quickReplies = parsed.quickReplies.map((qr) => ({
      text: stripMarkdown(qr.text),
      translation: stripMarkdown(qr.translation),
    }));
  } else {
    parsed.quickReplies = [];
  }

  if (parsed.corrections && Array.isArray(parsed.corrections)) {
    parsed.corrections = parsed.corrections
      .filter((c) => c && c.wrongPart && c.correctedPart)
      .map((c) => ({
        wrongPart: stripMarkdown(c.wrongPart),
        correctedPart: stripMarkdown(c.correctedPart),
        explanation: c.explanation ? stripMarkdown(c.explanation) : undefined,
      }));
  }

  return { success: true, data: parsed };
}
