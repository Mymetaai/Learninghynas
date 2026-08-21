export interface DailyQuote {
  quote: string;
  author: string;
  spanishTranslation?: string;
  date: string;
}

const CACHE_KEY = 'hyena-daily-quote-cache';

export const FALLBACK_PROVERBS: Array<Omit<DailyQuote, 'date'>> = [
  {
    quote: "He who reads much and walks much, goes far and knows much.",
    spanishTranslation: "El que lee mucho y anda mucho, ve mucho y sabe mucho.",
    author: "Miguel de Cervantes",
  },
  {
    quote: "Step by step, one goes very far.",
    spanishTranslation: "Poco a poco se anda lejos.",
    author: "Refrán Popular",
  },
  {
    quote: "Where there is a will, there is a way.",
    spanishTranslation: "Querer es poder.",
    author: "Proverbio Español",
  },
  {
    quote: "Practice makes the master.",
    spanishTranslation: "La práctica hace al maestro.",
    author: "Refrán Popular",
  },
  {
    quote: "Patience is bitter, but its fruit is sweet.",
    spanishTranslation: "La paciencia es amarga, pero su fruto es dulce.",
    author: "Proverbio",
  },
  {
    quote: "To learn a language is to have one more window from which to look at the world.",
    spanishTranslation: "Aprender un idioma es tener una ventana más para observar el mundo.",
    author: "Proverbio",
  },
  {
    quote: "There is no better teacher than experience.",
    spanishTranslation: "La experiencia es la madre de la ciencia.",
    author: "Refrán Popular",
  },
  {
    quote: "Actions speak louder than words.",
    spanishTranslation: "Obras son amores, y no buenas razones.",
    author: "Refrán Español",
  },
];

/**
 * Fetches the daily inspiration quote.
 * 1. Checks LocalStorage 24-hour cache
 * 2. Attempts fetching from ZenQuotes API
 * 3. Falls back gracefully to curated bilingual Spanish proverbs
 */
export async function fetchDailyInspiration(forceRefresh = false): Promise<DailyQuote> {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Check LocalStorage Cache
  if (!forceRefresh) {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached: DailyQuote = JSON.parse(raw);
        if (cached.date === todayStr && cached.quote) {
          return cached;
        }
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }

  // 2. Fetch from ZenQuotes API with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://zenquotes.io/api/today', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0] && data[0].q) {
        const item = data[0];
        const quoteObj: DailyQuote = {
          quote: item.q,
          author: item.a || 'Unknown',
          date: todayStr,
        };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(quoteObj));
        } catch {}
        return quoteObj;
      }
    }
  } catch (err) {
    console.warn('[ZenQuotes] API fetch failed or rate-limited, switching to curated Spanish proverb fallback:', err);
  }

  // 3. Fallback to Curated Spanish Proverb (Rotated by Day of Year)
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const fallbackIndex = forceRefresh
    ? Math.floor(Math.random() * FALLBACK_PROVERBS.length)
    : Math.abs(dayOfYear) % FALLBACK_PROVERBS.length;

  const fallback = FALLBACK_PROVERBS[fallbackIndex];
  const finalQuote: DailyQuote = {
    ...fallback,
    date: todayStr,
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(finalQuote));
  } catch {}

  return finalQuote;
}
