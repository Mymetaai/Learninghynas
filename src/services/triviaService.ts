export interface TriviaQuestion {
  id: string;
  category: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

/**
 * Safely decodes HTML entities (e.g. &quot;, &#039;, &eacute;, &aacute;, &amp;)
 * Supports browser DOM and fallback regex replacement for non-DOM contexts.
 */
export function decodeHtml(html: string): string {
  if (!html) return '';
  try {
    if (typeof document !== 'undefined') {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  } catch {
    // Fallback if document is unavailable
  }

  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&aacute;/g, 'á')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&uuml;/g, 'ü')
    .replace(/&iexcl;/g, '¡')
    .replace(/&iquest;/g, '¿');
}

/**
 * Curated Spanish and Hispanic Culture, Geography, History, and Literature fallbacks
 */
export const FALLBACK_TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'fallback-geo-1',
    category: 'Spanish Geography',
    question: 'What is the capital city of Spain?',
    correctAnswer: 'Madrid',
    options: ['Barcelona', 'Madrid', 'Seville', 'Valencia'],
  },
  {
    id: 'fallback-cult-2',
    category: 'Hispanic Culture & Festivals',
    question: 'Which famous festival in Buñol involves participants throwing tons of overripe tomatoes?',
    correctAnswer: 'La Tomatina',
    options: ['San Fermín', 'La Tomatina', 'Las Fallas', 'Día de Muertos'],
  },
  {
    id: 'fallback-lit-3',
    category: 'Spanish Literature',
    question: 'Who wrote the masterpiece novel "Don Quixote de la Mancha"?',
    correctAnswer: 'Miguel de Cervantes',
    options: ['Gabriel García Márquez', 'Federico García Lorca', 'Miguel de Cervantes', 'Pablo Neruda'],
  },
  {
    id: 'fallback-arch-4',
    category: 'Spanish Architecture',
    question: 'Which master architect designed the iconic Basilica de la Sagrada Família in Barcelona?',
    correctAnswer: 'Antoni Gaudí',
    options: ['Santiago Calatrava', 'Antoni Gaudí', 'Pablo Picasso', 'Diego Velázquez'],
  },
  {
    id: 'fallback-hist-5',
    category: 'Hispanic Heritage',
    question: 'The ancient Moorish palace and fortress complex "The Alhambra" is located in which Spanish city?',
    correctAnswer: 'Granada',
    options: ['Cordoba', 'Granada', 'Toledo', 'Malaga'],
  },
  {
    id: 'fallback-art-6',
    category: 'Hispanic Arts & Music',
    question: 'Which world-renowned, passionate folk art form combining cante (singing), toque (guitar), and baile (dance) originated in Andalusia?',
    correctAnswer: 'Flamenco',
    options: ['Salsa', 'Tango', 'Flamenco', 'Bachata'],
  },
  {
    id: 'fallback-geo-7',
    category: 'Latin American Geography',
    question: 'Which mountain range runs along the western coast of South America and is the longest continental mountain range in the world?',
    correctAnswer: 'The Andes',
    options: ['The Pyrenees', 'The Sierra Madre', 'The Andes', 'The Alps'],
  },
  {
    id: 'fallback-food-8',
    category: 'Spanish Gastronomy',
    question: 'Which traditional rice dish cooked in a shallow wide pan with saffron is considered a culinary symbol of Spain?',
    correctAnswer: 'Paella',
    options: ['Gazpacho', 'Tortilla Española', 'Paella', 'Churros con Chocolate'],
  },
];

/**
 * Fetches multiple choice cultural and geography questions from OpenTDB API.
 * Falls back to curated Hispanic & Spanish culture trivia questions on network failure or rate-limits.
 */
export async function fetchCulturalTrivia(amount = 5): Promise<TriviaQuestion[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // OpenTDB Category 22 = Geography
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=22&type=multiple`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();

      if (data.results && Array.isArray(data.results) && data.results.length > 0) {
        return data.results.map((q: any, idx: number) => {
          const correct = decodeHtml(q.correct_answer);
          const incorrect = (q.incorrect_answers || []).map((ans: string) => decodeHtml(ans));
          const options = [correct, ...incorrect].sort(() => 0.5 - Math.random());

          return {
            id: `opentdb-${idx}-${Date.now()}`,
            category: decodeHtml(q.category) || 'World Geography',
            question: decodeHtml(q.question),
            correctAnswer: correct,
            options,
          };
        });
      }
    }
  } catch (err) {
    console.warn('[OpenTDB] Fetch failed, using curated Spanish & Hispanic culture trivia fallback:', err);
  }

  // Shuffle and pick `amount` fallback questions
  const shuffledFallback = [...FALLBACK_TRIVIA_QUESTIONS]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(amount, FALLBACK_TRIVIA_QUESTIONS.length))
    .map((q, idx) => ({
      ...q,
      id: `fallback-${idx}-${Date.now()}`,
      options: [...q.options].sort(() => 0.5 - Math.random()),
    }));

  return shuffledFallback;
}
