export interface DictionaryPhonetic {
  text?: string;
  audio?: string;
}

export interface DictionaryDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
}

export interface DictionaryMeaning {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: DictionaryPhonetic[];
  meanings: DictionaryMeaning[];
  audioUrl?: string;
}

const CACHE_KEY = 'hyena-dictionary-cache';
const MAX_CACHE_ENTRIES = 500;

interface CacheStorage {
  [word: string]: {
    entry: DictionaryEntry;
    timestamp: number;
  };
}

function getCache(): CacheStorage {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: CacheStorage): void {
  try {
    const entries = Object.entries(cache);
    if (entries.length > MAX_CACHE_ENTRIES) {
      // Evict oldest entries past 500 words
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const pruned = Object.fromEntries(entries.slice(entries.length - MAX_CACHE_ENTRIES));
      localStorage.setItem(CACHE_KEY, JSON.stringify(pruned));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch {
    // Ignore localStorage write quota errors
  }
}

/**
 * Fetches definition and phonetics for a Spanish word using the Spanish locale endpoint.
 * Returns Promise<DictionaryEntry | null> (capped at ~500 cached entries).
 */
export async function fetchWordDefinition(word: string): Promise<DictionaryEntry | null> {
  const normalized = word.trim().toLowerCase().replace(/[¿?¡!,.]/g, '');
  if (!normalized) return null;

  const cache = getCache();
  if (cache[normalized]) {
    return cache[normalized].entry;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    // Query the Spanish locale endpoint: /api/v2/entries/es/{word}
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(normalized)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        const item = data[0];
        const audioUrl = item.phonetics?.find((p: any) => p.audio && p.audio.trim().length > 0)?.audio;

        const entry: DictionaryEntry = {
          word: item.word || normalized,
          phonetic: item.phonetic || item.phonetics?.[0]?.text,
          phonetics: item.phonetics || [],
          meanings: item.meanings || [],
          audioUrl,
        };

        cache[normalized] = { entry, timestamp: Date.now() };
        saveCache(cache);
        return entry;
      }
    }
  } catch (err) {
    console.warn(`[DictionaryService] Lookup failed for '${normalized}':`, err);
  }

  return null;
}

/**
 * Plays Spanish pronunciation for a word, prioritizing API audio and falling back to Web Speech Synthesis (es-ES / es-MX).
 */
export function playSpanishPronunciation(word: string, audioUrl?: string): void {
  if (!word || typeof window === 'undefined') return;

  const cleanWord = word.replace(/[¿?¡!,.]/g, '').trim();

  // 1. Try audio URL if available
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => {
        fallbackWebSpeech(cleanWord);
      });
      return;
    } catch {
      // Fall through to Web Speech
    }
  }

  fallbackWebSpeech(cleanWord);
}

function fallbackWebSpeech(text: string): void {
  if (!('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (v) => v.lang.startsWith('es') || v.lang.includes('ES') || v.lang.includes('MX')
    );
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('[DictionaryService] Web Speech error:', err);
  }
}
