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

  private generateSentenceData(cefrLevel: CEFRLevel, _grammarFocus: string) {
    // This would normally call the Generator Agent with DSPy + Gemini
    // For now, we use template-based generation with varied vocabulary
    return {
      subject: this.getRandomSubject(cefrLevel),
      subject_en: this.getRandomSubjectEN(cefrLevel),
      verb: this.getRandomVerb(cefrLevel),
      verb_en: this.getRandomVerbEN(cefrLevel),
      object: this.getRandomObject(cefrLevel),
      object_en: this.getRandomObjectEN(cefrLevel),
      place: this.getRandomPlace(cefrLevel),
      place_en: this.getRandomPlaceEN(cefrLevel),
      time: this.getRandomTime(cefrLevel),
      time_en: this.getRandomTimeEN(cefrLevel),
    };
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
    // Remove the subject pronoun (typically the first word)
    const words = sentence.split(' ');
    if (words.length > 1) {
      return words.slice(1).join(' ');
    }
    return null;
  }

  private validateCEFRLevel(exercise: SentenceExercise): string[] {
    const errors: string[] = [];
    const sentence = exercise.spanishSentence.toLowerCase();

    // A1: No subjunctive, no complex clauses
    if (exercise.cefrLevel === 'A1') {
      if (sentence.includes('aunque') || sentence.includes('si')) {
        errors.push('A1 sentences should not contain subjunctive triggers');
      }
    }

    // A2: Present tense only
    if (exercise.cefrLevel === 'A2') {
      const pastTenseIndicators = ['comí', 'fui', 'estuve', 'hice', 'hablé'];
      if (pastTenseIndicators.some((ind) => sentence.includes(ind))) {
        errors.push('A2 sentences should use present tense only');
      }
    }

    // C1: Subjunctive allowed
    // No errors for C1 - complex structures are expected

    return errors;
  }

  // ─── Vocabulary Helpers ─────────────────────────────────────────────────────

  private getRandomSubject(cefrLevel: CEFRLevel): string {
    const subjects = {
      A1: ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos'],
      A2: ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos', 'Usted', 'Ustedes'],
      B1: ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos', 'Usted', 'Ustedes'],
      B2: ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos', 'Usted', 'Ustedes'],
      C1: ['Yo', 'Tú', 'Él', 'Ella', 'Nosotros', 'Ellos', 'Usted', 'Ustedes'],
    };
    const list = subjects[cefrLevel];
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomSubjectEN(_cefrLevel: CEFRLevel): string {
    const subjects = ['I', 'You', 'He', 'She', 'We', 'They'];
    return subjects[Math.floor(Math.random() * subjects.length)];
  }

  private getRandomVerb(cefrLevel: CEFRLevel): string {
    const verbs = {
      A1: ['como', 'leo', 'veo', 'tengo', 'soy', 'estoy', 'hablo', 'estudio'],
      A2: ['como', 'leo', 'veo', 'tengo', 'soy', 'estoy', 'hablo', 'estudio', 'trabajo', 'busco'],
      B1: ['como', 'leo', 'veo', 'tengo', 'soy', 'estoy', 'hablo', 'estudio', 'trabajo', 'busco', 'quiero', 'puedo'],
      B2: ['como', 'leo', 'veo', 'tengo', 'soy', 'estoy', 'hablo', 'estudio', 'trabajo', 'busco', 'quiero', 'puedo', 'necesito', 'decido'],
      C1: ['como', 'leo', 'veo', 'tengo', 'soy', 'estoy', 'hablo', 'estudio', 'trabajo', 'busco', 'quiero', 'puedo', 'necesito', 'decido', 'prefiero', 'debido a'],
    };
    const list = verbs[cefrLevel];
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomVerbEN(_cefrLevel: CEFRLevel): string {
    const verbs = ['eat', 'read', 'see', 'have', 'am', 'are', 'speak', 'study', 'work', 'search for', 'want', 'can', 'need to', 'decide to', 'prefer to', 'due to'];
    return verbs[Math.floor(Math.random() * verbs.length)];
  }

  private getRandomObject(cefrLevel: CEFRLevel): string {
    const objects = {
      A1: ['una manzana', 'un libro', 'una casa', 'un coche', 'una mesa', 'un perro', 'una galleta', 'un lápiz'],
      A2: ['una manzana', 'un libro', 'una casa', 'un coche', 'una mesa', 'un perro', 'una galleta', 'un lápiz', 'una camisa', 'un mapa'],
      B1: ['una manzana', 'un libro', 'una casa', 'un coche', 'una mesa', 'un perro', 'una galleta', 'un lápiz', 'una camisa', 'un mapa', 'una tarea', 'un examen'],
      B2: ['una manzana', 'un libro', 'una casa', 'un coche', 'una mesa', 'un perro', 'una galleta', 'un lápiz', 'una camisa', 'un mapa', 'una tarea', 'un examen', 'una solución', 'una respuesta'],
      C1: ['una manzana', 'un libro', 'una casa', 'un coche', 'una mesa', 'un perro', 'una galleta', 'un lápiz', 'una camisa', 'un mapa', 'una tarea', 'un examen', 'una solución', 'una respuesta', 'una conclusión', 'una hipótesis'],
    };
    const list = objects[cefrLevel];
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomObjectEN(_cefrLevel: CEFRLevel): string {
    const objects = ['an apple', 'a book', 'a house', 'a car', 'a table', 'a dog', 'a cookie', 'a pencil', 'a shirt', 'a map', 'a task', 'an exam', 'a solution', 'an answer', 'a conclusion', 'a hypothesis'];
    return objects[Math.floor(Math.random() * objects.length)];
  }

  private getRandomPlace(cefrLevel: CEFRLevel): string {
    const places = {
      A1: ['en casa', 'en la escuela', 'en el parque', 'en la cocina', 'en el baño'],
      A2: ['en casa', 'en la escuela', 'en el parque', 'en la cocina', 'en el baño', 'en el supermercado', 'en la biblioteca'],
      B1: ['en casa', 'en la escuela', 'en el parque', 'en la cocina', 'en el baño', 'en el supermercado', 'en la biblioteca', 'en el gimnasio', 'en el hospital'],
      B2: ['en casa', 'en la escuela', 'en el parque', 'en la cocina', 'en el baño', 'en el supermercado', 'en la biblioteca', 'en el gimnasio', 'en el hospital', 'en la universidad', 'en el trabajo'],
      C1: ['en casa', 'en la escuela', 'en el parque', 'en la cocina', 'en el baño', 'en el supermercado', 'en la biblioteca', 'en el gimnasio', 'en el hospital', 'en la universidad', 'en el trabajo', 'en el gobierno', 'en la empresa'],
    };
    const list = places[cefrLevel];
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomPlaceEN(_cefrLevel: CEFRLevel): string {
    const places = ['at home', 'at school', 'in the park', 'in the kitchen', 'in the bathroom', 'at the supermarket', 'at the library', 'at the gym', 'at the hospital', 'at university', 'at work', 'at the government', 'at the company'];
    return places[Math.floor(Math.random() * places.length)];
  }

  private getRandomTime(cefrLevel: CEFRLevel): string {
    const times = {
      A1: ['ahora', 'hoy', 'mañana', 'esta noche'],
      A2: ['ahora', 'hoy', 'mañana', 'esta noche', 'por la mañana', 'por la tarde'],
      B1: ['ahora', 'hoy', 'mañana', 'esta noche', 'por la mañana', 'por la tarde', 'a las 3', 'cada día'],
      B2: ['ahora', 'hoy', 'mañana', 'esta noche', 'por la mañana', 'por la tarde', 'a las 3', 'cada día', 'últimamente', 'frecuentemente'],
      C1: ['ahora', 'hoy', 'mañana', 'esta noche', 'por la mañana', 'por la tarde', 'a las 3', 'cada día', 'últimamente', 'frecuentemente', 'en el transcurso de la semana', 'durante el período de prueba'],
    };
    const list = times[cefrLevel];
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomTimeEN(_cefrLevel: CEFRLevel): string {
    const times = ['now', 'today', 'tomorrow', 'tonight', 'in the morning', 'in the afternoon', 'at 3 o\'clock', 'every day', 'lately', 'frequently', 'throughout the week', 'during the trial period'];
    return times[Math.floor(Math.random() * times.length)];
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