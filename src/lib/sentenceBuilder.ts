/**
 * Sentence Builder Module
 *
 * Generates original Spanish sentences for the Basic Español tab
 * using a structured approach that follows the five-agent workflow:
 * Extractor → Generator → Mixer → QA/Validator → Langfuse
 */

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ─── Types ─────────────────────────────────────────────────────────────────────

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type TokenRole = 'Subject' | 'Verb' | 'Object' | 'Place' | 'Time' | 'Other';

export interface Token {
  text: string;
  role: TokenRole;
  order: number;
}

export interface SentenceExercise {
  id: string;
  lessonId: string;
  cefrLevel: CEFRLevel;
  spanishSentence: string;
  englishTranslation: string;
  tokens: Token[];
  pronounDroppedVariant?: string | null;
  notes?: string | null;
}

export interface LessonGrammarPattern {
  lessonId: string;
  lessonNumber: number;
  partNumber: number;
  title: string;
  cefrLevel: CEFRLevel;
  grammarFocus: string[];
  vocabulary: string[];
  wordOrderPattern: string;
}

// ─── CEFR Level Mapping ───────────────────────────────────────────────────────

export const CEFR_LEVEL_MAP: Record<string, CEFRLevel> = {
  // Part 1: A1
  lesson1: 'A1', lesson2: 'A1', lesson3: 'A1', lesson4: 'A1',
  // Part 2: A2
  lesson5: 'A2', lesson6: 'A2', lesson7: 'A2', lesson8: 'A2',
  // Part 3: B1
  lesson9: 'B1', lesson10: 'B1', lesson11: 'B1', lesson12: 'B1',
  // Part 4: B2
  lesson13: 'B2', lesson14: 'B2', lesson15: 'B2', lesson16: 'B2',
  // Part 5: B2
  lesson17: 'B2', lesson18: 'B2', lesson19: 'B2', lesson20: 'B2', lesson21: 'B2',
  // Part 6: B2
  lesson22: 'B2', lesson23: 'B2', lesson24: 'B2', lesson25: 'B2', lesson26: 'B2',
  // Part 7: C1
  lesson27: 'C1', lesson28: 'C1', lesson29: 'C1', lesson30: 'C1',
  // Part 8: C1
  lesson31: 'C1', lesson32: 'C1', lesson33: 'C1', lesson34: 'C1', lesson35: 'C1', lesson36: 'C1', lesson37: 'C1',
};

// ─── Word Order Patterns by CEFR Level ────────────────────────────────────────

export const WORD_ORDER_PATTERNS: Record<CEFRLevel, string[]> = {
  A1: ['Subject + Verb + Object'],
  A2: ['Subject + Verb + Object + Place'],
  B1: ['Subject + Verb + Object + Place + Time'],
  B2: ['Subject + Verb + Object + Place + Time', 'Pronoun Drop'],
  C1: ['Subject + Verb + Object + Place + Time', 'Pronoun Drop', 'Complex Clauses', 'Subjunctive'],
};

// ─── Sentence Templates by CEFR Level ─────────────────────────────────────────

interface SentenceTemplate {
  pattern: string;
  template: string;
  englishTemplate: string;
  roles: TokenRole[];
  notes?: string;
}

const SENTENCE_TEMPLATES: Record<CEFRLevel, SentenceTemplate[]> = {
  A1: [
    {
      pattern: 'SVO',
      template: '{subject} {verb} {object}',
      englishTemplate: '{subject_en} {verb_en} {object_en}',
      roles: ['Subject', 'Verb', 'Object'],
      notes: 'Basic subject-verb-object structure',
    },
    {
      pattern: 'SVO',
      template: '{subject} {verb} {object}',
      englishTemplate: '{subject_en} {verb_en} {object_en}',
      roles: ['Subject', 'Verb', 'Object'],
      notes: 'Present tense only',
    },
  ],
  A2: [
    {
      pattern: 'SVO + Place',
      template: '{subject} {verb} {object} {place}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en}',
      roles: ['Subject', 'Verb', 'Object', 'Place'],
      notes: 'Adding location to basic sentences',
    },
  ],
  B1: [
    {
      pattern: 'SVO + Place + Time',
      template: '{subject} {verb} {object} {place} {time}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en} {time_en}',
      roles: ['Subject', 'Verb', 'Object', 'Place', 'Time'],
      notes: 'Place before time (natural Spanish word order)',
    },
  ],
  B2: [
    {
      pattern: 'SVO + Place + Time',
      template: '{subject} {verb} {object} {place} {time}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en} {time_en}',
      roles: ['Subject', 'Verb', 'Object', 'Place', 'Time'],
      notes: 'Full word order with pronoun drop variant',
    },
    {
      pattern: 'Pronoun Drop',
      template: '{verb} {object} {place} {time}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en} {time_en}',
      roles: ['Verb', 'Object', 'Place', 'Time'],
      notes: 'Subject pronoun dropped (verb ending makes subject clear)',
    },
  ],
  C1: [
    {
      pattern: 'Complex Clause',
      template: '{subject} {verb} {object} {place} {time}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en} {time_en}',
      roles: ['Subject', 'Verb', 'Object', 'Place', 'Time'],
      notes: 'Complex objects and subordinate clauses',
    },
    {
      pattern: 'Subjunctive',
      template: '{subject} {verb} {object} {place} {time}',
      englishTemplate: '{subject_en} {verb_en} {object_en} {place_en} {time_en}',
      roles: ['Subject', 'Verb', 'Object', 'Place', 'Time'],
      notes: 'Subjunctive mood for hypothetical situations',
    },
  ],
};

// ─── Sentence Builder Module ──────────────────────────────────────────────────

export class SentenceBuilderModule {
  private static instance: SentenceBuilderModule;

  private constructor() {}

  static getInstance(): SentenceBuilderModule {
    if (!SentenceBuilderModule.instance) {
      SentenceBuilderModule.instance = new SentenceBuilderModule();
    }
    return SentenceBuilderModule.instance;
  }

  /**
   * Generate a single sentence exercise for a given lesson
   */
  generateExercise(
    lessonId: string,
    cefrLevel: CEFRLevel,
    grammarFocus: string
  ): SentenceExercise {
    const template = this.getTemplateForLevel(cefrLevel);
    const sentenceData = this.generateSentenceData(cefrLevel, grammarFocus);

    // Build the Spanish sentence
    const spanishSentence = this.buildSentence(template.template, sentenceData);
    const englishTranslation = this.buildSentence(
      template.englishTemplate,
      sentenceData
    );

    // Generate tokens with roles
    const tokens = this.generateTokens(spanishSentence, template.roles);

    // Generate pronoun-dropped variant for B2/C1
    const pronounDroppedVariant =
      cefrLevel === 'B2' || cefrLevel === 'C1'
        ? this.generatePronounDroppedVariant(spanishSentence, cefrLevel)
        : null;

    return {
      id: generateUUID(),
      lessonId,
      cefrLevel,
      spanishSentence,
      englishTranslation,
      tokens,
      pronounDroppedVariant,
      notes: template.notes,
    };
  }

  /**
   * Generate multiple exercises for a lesson
   */
  generateExercises(
    lessonId: string,
    cefrLevel: CEFRLevel,
    grammarFocus: string,
    count: number = 30
  ): SentenceExercise[] {
    const exercises: SentenceExercise[] = [];
    const usedSentences = new Set<string>();

    for (let i = 0; i < count; i++) {
      let exercise: SentenceExercise;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        exercise = this.generateExercise(lessonId, cefrLevel, grammarFocus);
        attempts++;
      } while (
        usedSentences.has(exercise.spanishSentence) &&
        attempts < maxAttempts
      );

      if (attempts < maxAttempts) {
        usedSentences.add(exercise.spanishSentence);
        exercises.push(exercise);
      }
    }

    return exercises;
  }

  /**
   * Validate a sentence exercise
   */
  validateExercise(exercise: SentenceExercise): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check sentence is not empty
    if (!exercise.spanishSentence || exercise.spanishSentence.length === 0) {
      errors.push('Spanish sentence is empty');
    }

    // Check English translation is not empty
    if (!exercise.englishTranslation || exercise.englishTranslation.length === 0) {
      errors.push('English translation is empty');
    }

    // Check CEFR level is valid
    if (!['A1', 'A2', 'B1', 'B2', 'C1'].includes(exercise.cefrLevel)) {
      errors.push(`Invalid CEFR level: ${exercise.cefrLevel}`);
    }

    // Check tokens are valid
    if (!exercise.tokens || exercise.tokens.length === 0) {
      errors.push('No tokens generated');
    } else {
      // Check token order is sequential
      for (let i = 0; i < exercise.tokens.length; i++) {
        if (exercise.tokens[i].order !== i + 1) {
          errors.push(`Token order mismatch at position ${i}`);
        }
      }

      // Check token roles are valid
      const validRoles = ['Subject', 'Verb', 'Object', 'Place', 'Time', 'Other'];
      for (const token of exercise.tokens) {
        if (!validRoles.includes(token.role)) {
          errors.push(`Invalid token role: ${token.role}`);
        }
      }
    }

    // Check CEFR compliance
    const cefrChecks = this.validateCEFRLevel(exercise);
    errors.push(...cefrChecks);

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // ─── Private Methods ────────────────────────────────────────────────────────

  private getTemplateForLevel(cefrLevel: CEFRLevel): SentenceTemplate {
    const templates = SENTENCE_TEMPLATES[cefrLevel];
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  }

  private buildSentence(template: string, data: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
      result = result.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return result;
  }

  private generateTokens(
    sentence: string,
    roles: TokenRole[]
  ): Token[] {
    const words = sentence.split(' ');
    return words.map((word, index) => ({
      text: word,
      role: roles[index] || 'Other',
      order: index + 1,
    }));
  }

  private generatePronounDroppedVariant(
    sentence: string,
    _cefrLevel: CEFRLevel
  ): string | null {
    const words = sentence.split(' ');
    if (words.length > 1) {
      return words.slice(1).join(' ');
    }
    return null;
  }

  private validateCEFRLevel(exercise: SentenceExercise): string[] {
    const errors: string[] = [];
    const sentence = exercise.spanishSentence.toLowerCase();

    if (exercise.cefrLevel === 'A1') {
      if (sentence.includes('aunque') || sentence.includes('ojalá')) {
        errors.push('A1 sentences should not contain subjunctive triggers');
      }
    }

    if (exercise.cefrLevel === 'A2') {
      const pastTenseIndicators = ['estuve', 'hice'];
      if (pastTenseIndicators.some((ind) => sentence.includes(ind))) {
        errors.push('A2 sentences should use present tense only');
      }
    }

    return errors;
  }

  private generateSentenceData(cefrLevel: CEFRLevel, _grammarFocus: string) {
    // Conjugation-aware generation ensuring subject-verb agreement
    const subjects = cefrLevel === 'A1'
      ? ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos']
      : ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos', 'Usted', 'Ustedes'];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    // Verb conjugation tables
    const VERBS: Record<string, Record<string, { es: string; en: string }>> = {
      comer: {
        Yo: { es: 'como', en: 'eat' }, Tú: { es: 'comes', en: 'eat' },
        Él: { es: 'come', en: 'eats' }, Ella: { es: 'come', en: 'eats' },
        Nosotros: { es: 'comemos', en: 'eat' }, Ellos: { es: 'comen', en: 'eat' },
      },
      hablar: {
        Yo: { es: 'hablo', en: 'speak' }, Tú: { es: 'hablas', en: 'speak' },
        Él: { es: 'habla', en: 'speaks' }, Ella: { es: 'habla', en: 'speaks' },
        Nosotros: { es: 'hablamos', en: 'speak' }, Ellos: { es: 'hablan', en: 'speak' },
      },
      estudiar: {
        Yo: { es: 'estudio', en: 'study' }, Tú: { es: 'estudias', en: 'study' },
        Él: { es: 'estudia', en: 'studies' }, Ella: { es: 'estudia', en: 'studies' },
        Nosotros: { es: 'estudiamos', en: 'study' }, Ellos: { es: 'estudian', en: 'study' },
      },
      leer: {
        Yo: { es: 'leo', en: 'read' }, Tú: { es: 'lees', en: 'read' },
        Él: { es: 'lee', en: 'reads' }, Ella: { es: 'lee', en: 'reads' },
        Nosotros: { es: 'leemos', en: 'read' }, Ellos: { es: 'leen', en: 'read' },
      },
      tener: {
        Yo: { es: 'tengo', en: 'have' }, Tú: { es: 'tienes', en: 'have' },
        Él: { es: 'tiene', en: 'has' }, Ella: { es: 'tiene', en: 'has' },
        Nosotros: { es: 'tenemos', en: 'have' }, Ellos: { es: 'tienen', en: 'have' },
      },
      ver: {
        Yo: { es: 'veo', en: 'see' }, Tú: { es: 'ves', en: 'see' },
        Él: { es: 've', en: 'sees' }, Ella: { es: 've', en: 'sees' },
        Nosotros: { es: 'vemos', en: 'see' }, Ellos: { es: 'ven', en: 'see' },
      },
      necesitar: {
        Yo: { es: 'necesito', en: 'need' }, Tú: { es: 'necesitas', en: 'need' },
        Él: { es: 'necesita', en: 'needs' }, Ella: { es: 'necesita', en: 'needs' },
        Nosotros: { es: 'necesitamos', en: 'need' }, Ellos: { es: 'necesitan', en: 'need' },
      },
      comprar: {
        Yo: { es: 'compro', en: 'buy' }, Tú: { es: 'compras', en: 'buy' },
        Él: { es: 'compra', en: 'buys' }, Ella: { es: 'compra', en: 'buys' },
        Nosotros: { es: 'compramos', en: 'buy' }, Ellos: { es: 'compran', en: 'buy' },
      },
    };

    // Semantically valid verb-object pairings
    const VERB_OBJECTS: Record<string, { es: string; en: string }[]> = {
      comer: [
        { es: 'una manzana', en: 'an apple' }, { es: 'una galleta', en: 'a cookie' },
        { es: 'el almuerzo', en: 'lunch' }, { es: 'una ensalada', en: 'a salad' },
      ],
      hablar: [
        { es: 'español', en: 'Spanish' }, { es: 'francés', en: 'French' },
        { es: 'inglés', en: 'English' },
      ],
      estudiar: [
        { es: 'español', en: 'Spanish' }, { es: 'lecciones', en: 'lessons' },
        { es: 'matemáticas', en: 'mathematics' },
      ],
      leer: [
        { es: 'un libro', en: 'a book' }, { es: 'el periódico', en: 'the newspaper' },
        { es: 'una revista', en: 'a magazine' },
      ],
      tener: [
        { es: 'un perro', en: 'a dog' }, { es: 'una casa', en: 'a house' },
        { es: 'un coche', en: 'a car' }, { es: 'tres libros', en: 'three books' },
      ],
      ver: [
        { es: 'una película', en: 'a movie' }, { es: 'el mapa', en: 'the map' },
        { es: 'las estrellas', en: 'the stars' },
      ],
      necesitar: [
        { es: 'un lápiz', en: 'a pencil' }, { es: 'ayuda', en: 'help' },
        { es: 'agua', en: 'water' },
      ],
      comprar: [
        { es: 'una camisa', en: 'a shirt' }, { es: 'un libro', en: 'a book' },
        { es: 'una mesa', en: 'a table' },
      ],
    };

    const PLACES = [
      { es: 'en casa', en: 'at home' }, { es: 'en la escuela', en: 'at school' },
      { es: 'en el parque', en: 'in the park' }, { es: 'en la cocina', en: 'in the kitchen' },
      { es: 'en la biblioteca', en: 'at the library' }, { es: 'en el supermercado', en: 'at the supermarket' },
    ];

    const TIMES = [
      { es: 'ahora', en: 'now' }, { es: 'hoy', en: 'today' },
      { es: 'mañana', en: 'tomorrow' }, { es: 'por la mañana', en: 'in the morning' },
      { es: 'cada día', en: 'every day' }, { es: 'esta noche', en: 'tonight' },
    ];

    const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    const verbKey = pick(Object.keys(VERBS));
    const verbTable = VERBS[verbKey];
    // Map Usted/Ustedes to their conjugation equivalents
    const resolvedSubj = subject === 'Usted' ? 'Él' : subject === 'Ustedes' ? 'Ellos' : subject;
    const verbData = verbTable[resolvedSubj] || verbTable['Yo'];

    const objects = VERB_OBJECTS[verbKey] || [{ es: 'algo', en: 'something' }];
    const obj = pick(objects);
    const place = pick(PLACES);
    const time = pick(TIMES);

    const subjectEN =
      subject === 'Yo' ? 'I' : subject === 'Tú' ? 'You'
      : subject === 'Él' ? 'He' : subject === 'Ella' ? 'She'
      : subject === 'Nosotros' ? 'We' : subject === 'Usted' ? 'You'
      : subject === 'Ustedes' ? 'You all' : 'They';

    return {
      subject, subject_en: subjectEN,
      verb: verbData.es, verb_en: verbData.en,
      object: obj.es, object_en: obj.en,
      place: place.es, place_en: place.en,
      time: time.es, time_en: time.en,
    };
  }
}

// ─── Export Singleton ─────────────────────────────────────────────────────────

export const sentenceBuilder = SentenceBuilderModule.getInstance();

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Generate exercises for a specific lesson
 */
export function generateLessonExercises(
  lessonId: string,
  cefrLevel: CEFRLevel,
  grammarFocus: string,
  count: number = 30
): SentenceExercise[] {
  return sentenceBuilder.generateExercises(lessonId, cefrLevel, grammarFocus, count);
}

/**
 * Validate a sentence exercise
 */
export function validateExercise(exercise: SentenceExercise) {
  return sentenceBuilder.validateExercise(exercise);
}

/**
 * Get CEFR level for a lesson
 */
export function getCEFRLevel(lessonId: string): CEFRLevel {
  return CEFR_LEVEL_MAP[lessonId] || 'A1';
}