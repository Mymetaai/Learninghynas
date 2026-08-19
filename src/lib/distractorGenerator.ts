import { ALL_SYLLABUS_LESSONS } from '../data/syllabusLessonsData';

/**
 * Returns `count` random Spanish distractor words excluding the correct answer.
 */
export function getSmartDistractors(correctWord: string, count = 3): string[] {
  const wordPool: string[] = [];
  const targetLower = (correctWord || '').toLowerCase().trim();

  // 1. Pool words from all syllabus lessons
  Object.values(ALL_SYLLABUS_LESSONS).forEach((lesson) => {
    if (lesson.vocabularyTable) {
      lesson.vocabularyTable.forEach((v) => {
        if (v.spanish) {
          const clean = v.spanish.toLowerCase().replace(/[¿?¡!...]/g, '').trim();
          if (clean && clean !== targetLower) {
            wordPool.push(v.spanish.trim());
          }
        }
      });
    }
  });

  // 2. Fallback core vocabulary list if pool is small
  const fallbackWords = [
    'casa',
    'perro',
    'libro',
    'mesa',
    'amigo',
    'tiempo',
    'hombre',
    'mujer',
    'coche',
    'agua',
    'feliz',
    'bueno',
    'trabajo',
    'familia',
    'ciudad',
    'noche',
    'mañana',
    'tarde',
    'palabra',
    'mundo',
    'vida',
    'amable',
    'inteligente',
    'gracias',
  ];

  fallbackWords.forEach((w) => {
    if (w.toLowerCase() !== targetLower) {
      wordPool.push(w);
    }
  });

  // 3. Filter duplicates & pick `count` random items
  const uniquePool = Array.from(new Set(wordPool));
  const shuffled = uniquePool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Returns a shuffled array containing the correct answer + 3 real Spanish distractors.
 */
export function createMultipleChoiceOptions(correctAnswer: string): string[] {
  const distractors = getSmartDistractors(correctAnswer, 3);
  const options = [correctAnswer, ...distractors];
  return options.sort(() => 0.5 - Math.random());
}
