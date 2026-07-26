#!/usr/bin/env node
/**
 * generateSentenceExercises.mjs
 *
 * Generates 40+ original sentence builder exercises per lesson for all 37
 * Basic Español lessons using the Gemini API.
 *
 * Architecture (clean separation for future agent lift):
 *   (a) promptConstruction  – builds lesson-specific prompts
 *   (b) geminiCall          – calls the API with retries + model fallback
 *   (c) validation          – validates schema, CEFR, tokens
 *   (d) similarityCheck     – dedup + Jaccard similarity
 *   (e) outputWriter        – writes TypeScript data file + generation log
 *
 * Usage:
 *   node scripts/generateSentenceExercises.mjs
 *
 * Reads GEMINI_API_KEY from .env (non-VITE-prefixed).
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ═══════════════════════════════════════════════════════════════════════════════
// 0. ENV LOADING
// ═══════════════════════════════════════════════════════════════════════════════

function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

loadEnv();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY not found in .env or environment.');
  console.error('Add GEMINI_API_KEY=<your-key> to .env (NOT VITE_-prefixed).');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PRIMARY_MODEL   = 'gemini-3.6-flash';
const FALLBACK_MODELS = ['gemini-3.5-flash-lite', 'gemini-2.5-flash'];

const TARGET_PER_LESSON = 40;
const GENERATE_BATCH    = 22; // generate in two batches of 22 → 44 raw, target 40 after validation
const MAX_RETRY_PASSES  = 3;
const SIMILARITY_THRESHOLD = 0.80;
const DELAY_BETWEEN_CALLS_MS = 1500;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. LESSON METADATA
// ═══════════════════════════════════════════════════════════════════════════════

const LESSON_META = {
  lesson1: {
    num: 1, title: 'Greetings & Vowels', cefrLevel: 'A1',
    grammarFocus: 'Basic greetings, vowel sounds, subject pronouns (yo, tú, él, ella)',
    vocabHints: 'hola, adiós, buenos días, buenas tardes, buenas noches, gracias, por favor, mucho gusto, señor, señora',
    pattern: 'Subject + Verb + Object',
  },
  lesson2: {
    num: 2, title: 'Nouns & Definite Articles', cefrLevel: 'A1',
    grammarFocus: 'Gender of nouns (masculine/feminine), definite articles (el, la, los, las), plural formation',
    vocabHints: 'el libro, la mesa, el mapa, la casa, los perros, las mesas, el agua, la mano',
    pattern: 'Subject + Verb + Object',
  },
  lesson3: {
    num: 3, title: 'Pronouns & Verb Ser', cefrLevel: 'A1',
    grammarFocus: 'Subject pronouns, ser conjugation (soy, eres, es, somos, son), DOCTOR uses of ser',
    vocabHints: 'yo soy, tú eres, él es, nosotros somos, ellos son, de España, estudiante, profesor, inteligente, amigo',
    pattern: 'Subject + Verb + Object',
  },
  lesson4: {
    num: 4, title: 'Regular -AR Verbs', cefrLevel: 'A1',
    grammarFocus: 'Regular -AR verb conjugation (-o, -as, -a, -amos, -an), hablar, estudiar, trabajar, buscar',
    vocabHints: 'hablar, estudiar, trabajar, buscar, comprar, necesitar, enseñar, caminar, cocinar, escuchar',
    pattern: 'Subject + Verb + Object',
  },
  lesson5: {
    num: 5, title: 'Indefinite Articles & Numbers 0-100', cefrLevel: 'A2',
    grammarFocus: 'Indefinite articles (un, una, unos, unas), cardinal numbers 0-100',
    vocabHints: 'un libro, una casa, unos amigos, unas mesas, veinte, treinta y cinco, cincuenta, cien',
    pattern: 'Subject + Verb + Object + Place',
  },
  lesson6: {
    num: 6, title: 'Verb Estar & Numbers >100', cefrLevel: 'A2',
    grammarFocus: 'Estar conjugation (estoy, estás, está, estamos, están), PLACE uses, numbers 100-1000',
    vocabHints: 'estoy, estás, está, estamos, están, contento, cansado, enfermo, en casa, en la escuela, doscientos, quinientos',
    pattern: 'Subject + Verb + Object + Place',
  },
  lesson7: {
    num: 7, title: 'Regular -ER/-IR Verbs', cefrLevel: 'A2',
    grammarFocus: 'Regular -ER verbs (comer, beber, leer, correr) and -IR verbs (vivir, escribir, abrir)',
    vocabHints: 'comer, beber, leer, correr, aprender, vender, vivir, escribir, abrir, recibir',
    pattern: 'Subject + Verb + Object + Place',
  },
  lesson8: {
    num: 8, title: 'Verb Ir & Question Words', cefrLevel: 'A2',
    grammarFocus: 'Ir conjugation (voy, vas, va, vamos, van), ir + a + infinitive (near future), question words',
    vocabHints: 'voy, vas, va, vamos, van, ir a, ¿dónde?, ¿adónde?, ¿cuándo?, ¿por qué?, ¿cómo?, al parque, a la escuela',
    pattern: 'Subject + Verb + Object + Place',
  },
  lesson9: {
    num: 9, title: 'Days, Months & Dates', cefrLevel: 'B1',
    grammarFocus: 'Days of week (lunes-domingo), months, seasons, date format (el + number + de + month)',
    vocabHints: 'lunes, martes, miércoles, jueves, viernes, enero, febrero, marzo, primavera, verano, otoño, invierno',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson10: {
    num: 10, title: 'Telling Time', cefrLevel: 'B1',
    grammarFocus: 'Es la una, Son las dos, y cuarto, y media, menos diez, de la mañana/tarde/noche',
    vocabHints: 'es la una, son las dos, y cuarto, y media, menos diez, de la mañana, de la tarde, de la noche, a las tres',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson11: {
    num: 11, title: 'Verb Tener & Idioms', cefrLevel: 'B1',
    grammarFocus: 'Tener conjugation, tener idioms (hambre, sed, frío, calor, miedo, sueño), tener que + infinitive',
    vocabHints: 'tengo, tienes, tiene, tenemos, tienen, hambre, sed, frío, calor, miedo, sueño, prisa, razón, tener que',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson12: {
    num: 12, title: 'Hacer, Weather & Saber/Conocer', cefrLevel: 'B1',
    grammarFocus: 'Hacer (hago), weather expressions (hace frío/calor/sol/viento), saber vs conocer, personal a',
    vocabHints: 'hago, haces, hace, hacemos, hacen, hace frío, hace calor, hace sol, sé, sabes, conozco, conoces',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson13: {
    num: 13, title: 'Stem-Changing Boot Verbs', cefrLevel: 'B2',
    grammarFocus: 'e→ie (querer, pensar, preferir), o→ue (poder, dormir, volver), e→i (pedir, servir), u→ue (jugar)',
    vocabHints: 'quiero, puedo, duermo, juego, pido, pienso, prefiero, vuelvo, empiezo, entiendo',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson14: {
    num: 14, title: 'Yo-Go Verbs & Irregulars', cefrLevel: 'B2',
    grammarFocus: 'Yo-go verbs: pongo, salgo, traigo, hago, tengo, vengo, digo, oigo. Irregular yo forms.',
    vocabHints: 'pongo, salgo, traigo, hago, tengo, vengo, digo, oigo, conozco, produzco',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson15: {
    num: 15, title: 'Present Progressive', cefrLevel: 'B2',
    grammarFocus: 'Estar + gerundio (-ando, -iendo), irregular gerunds (leyendo, durmiendo, pidiendo, yendo)',
    vocabHints: 'estoy hablando, estás comiendo, está leyendo, estamos durmiendo, están pidiendo, siguiendo',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson16: {
    num: 16, title: 'Direct Object Pronouns & Adverbs', cefrLevel: 'B2',
    grammarFints: 'DOPs (me, te, lo, la, nos, los, las), adverb formation with -mente, placement rules',
    grammarFocus: 'DOPs (me, te, lo, la, nos, los, las), adverb formation with -mente, placement rules',
    vocabHints: 'lo tengo, la veo, los busco, las necesito, rápidamente, frecuentemente, fácilmente, cuidadosamente',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson17: {
    num: 17, title: 'Possessives & Demonstratives', cefrLevel: 'B2',
    grammarFocus: 'Possessive adjectives (mi, tu, su, nuestro), demonstratives (este, ese, aquel)',
    vocabHints: 'mi libro, tu casa, su perro, nuestro coche, este mapa, esa mesa, aquel edificio, mío, tuyo, suyo',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson18: {
    num: 18, title: 'Affirmatives & Negatives', cefrLevel: 'B2',
    grammarFocus: 'Affirmative/negative pairs: algo/nada, alguien/nadie, siempre/nunca, también/tampoco, alguno/ninguno',
    vocabHints: 'algo, nada, alguien, nadie, siempre, nunca, también, tampoco, alguno, ninguno',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson19: {
    num: 19, title: 'Indirect Objects & Gustar', cefrLevel: 'B2',
    grammarFocus: 'IOPs (me, te, le, nos, les), gustar construction (me gusta/gustan), encantar, interesar, importar',
    vocabHints: 'me gusta, te gusta, le gusta, nos gustan, les encantan, me interesa, le importa, nos fascina',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson20: {
    num: 20, title: 'Double Object Pronouns', cefrLevel: 'B2',
    grammarFocus: 'Double object pronoun order (IOP before DOP), le→se rule before lo/la/los/las',
    vocabHints: 'se lo doy, me lo da, te la compro, nos los traen, se las envío',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson21: {
    num: 21, title: 'Reflexive Verbs & Routine', cefrLevel: 'B2',
    grammarFocus: 'Reflexive verbs (lavarse, levantarse, vestirse, acostarse), daily routine, reflexive pronoun placement',
    vocabHints: 'me lavo, te levantas, se viste, nos acostamos, se duchan, me peino, se afeita, me despierto',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson22: {
    num: 22, title: 'Recent Past & Duration', cefrLevel: 'B2',
    grammarFocus: 'Acabar de + infinitive (just did), hace + time + que (duration), llevar + gerund',
    vocabHints: 'acabo de comer, acabas de llegar, hace dos horas que estudio, llevo tres años viviendo',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson23: {
    num: 23, title: 'Present Duration & Time Queries', cefrLevel: 'B2',
    grammarFocus: '¿Desde cuándo? ¿Cuánto tiempo hace que...? desde hace + time, llevar + time + gerund',
    vocabHints: 'desde hace, cuánto tiempo, desde cuándo, llevo estudiando, hace tres meses que',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson24: {
    num: 24, title: 'Formal Commands & Comparisons', cefrLevel: 'B2',
    grammarFocus: 'Usted/Ustedes commands, más... que, menos... que, tan... como, tanto... como',
    vocabHints: 'hable, coma, escriba, hablen, coman, más grande que, menos caro que, tan alto como',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson25: {
    num: 25, title: 'Informal Tú Commands', cefrLevel: 'B2',
    grammarFocus: 'Affirmative tú commands (habla, come, escribe), irregular (haz, ve, ten, pon, sal, di, ven, sé)',
    vocabHints: 'habla, come, escribe, haz, ve, ten, pon, sal, di, ven, sé, no hables, no comas',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson26: {
    num: 26, title: 'Preterite Past Regulars', cefrLevel: 'B2',
    grammarFocus: 'Regular preterite endings: -AR (-é,-aste,-ó,-amos,-aron), -ER/-IR (-í,-iste,-ió,-imos,-ieron)',
    vocabHints: 'hablé, comí, viví, hablaste, comiste, habló, comió, hablamos, comimos, hablaron, comieron',
    pattern: 'Subject + Verb + Object + Place + Time',
  },
  lesson27: {
    num: 27, title: 'Imperfect Tense', cefrLevel: 'C1',
    grammarFocus: 'Imperfect endings (-aba/-ía), irregular (ser→era, ir→iba, ver→veía), habitual past actions, descriptions',
    vocabHints: 'hablaba, comía, vivía, era, iba, veía, siempre jugábamos, de niño corría, mientras dormía',
    pattern: 'Complex clause with imperfect tense',
  },
  lesson28: {
    num: 28, title: 'Preterite Irregulars', cefrLevel: 'C1',
    grammarFocus: 'Irregular preterite stems: tener→tuv, estar→estuv, poder→pud, poner→pus, hacer→hic/hiz, ir/ser→fu',
    vocabHints: 'tuve, estuve, pude, puse, hice, fui, dije, traje, vine, supe, quise, conduje',
    pattern: 'Complex clause with irregular preterite',
  },
  lesson29: {
    num: 29, title: 'Preterite vs Imperfect', cefrLevel: 'C1',
    grammarFocus: 'When to use preterite (completed, SIMBA) vs imperfect (background, WATERS), combining both in narrative',
    vocabHints: 'mientras llovía sonó el teléfono, cuando era niño vivía en Madrid, ayer fui pero antes siempre iba',
    pattern: 'Complex clause combining preterite and imperfect',
  },
  lesson30: {
    num: 30, title: 'Superlatives & Synthesis', cefrLevel: 'C1',
    grammarFocus: 'Superlatives (el más, el menos, -ísimo), irregular comparatives (mejor, peor, mayor, menor)',
    vocabHints: 'el más alto, la menos difícil, altísimo, riquísimo, mejor que, peor que, mayor que, menor que',
    pattern: 'Complex clause with superlatives and comparisons',
  },
  lesson31: {
    num: 31, title: 'Advanced Idiomatic Expressions', cefrLevel: 'C1',
    grammarFocus: 'C1 idioms: hacer borrón y cuenta nueva, dorar la píldora, tirar la toalla, quedarse en blanco, dar la lata',
    vocabHints: 'hacer borrón y cuenta nueva, dorar la píldora, tirar la toalla, no tener pelos en la lengua, meter la pata',
    pattern: 'Complex clause with idiomatic expressions',
  },
  lesson32: {
    num: 32, title: 'Formal & Diplomatic Register', cefrLevel: 'C1',
    grammarFocus: 'Formal register: hacer hincapié en, poner de manifiesto, llevar a cabo, a tenor de lo dispuesto',
    vocabHints: 'hacer hincapié, poner de manifiesto, llevar a cabo, a tenor de, en virtud de, por consiguiente',
    pattern: 'Complex formal/academic clause',
  },
  lesson33: {
    num: 33, title: 'Nuanced Discourse Markers', cefrLevel: 'C1',
    grammarFocus: 'Advanced connectors: de ahí que (+ subjunctive), no obstante, en resumidas cuentas, a pesar de que',
    vocabHints: 'de ahí que, no obstante, sin embargo, a pesar de que, en resumidas cuentas, por ende, con todo',
    pattern: 'Complex clause with discourse markers and subjunctive',
  },
  lesson34: {
    num: 34, title: 'Academic Argumentation', cefrLevel: 'C1',
    grammarFocus: 'Academic verbs: refutar, corroborar, extrapolar, suscitar, fundamentar. Thesis/antithesis structures.',
    vocabHints: 'refutar, corroborar, extrapolar, suscitar, fundamentar, según los datos, cabe destacar que, se podría argumentar',
    pattern: 'Complex academic clause with argumentation',
  },
  lesson35: {
    num: 35, title: 'Regional Lexical Variations', cefrLevel: 'C1',
    grammarFocus: 'Spain vs Latin America vocabulary: ordenador/computadora, coche/carro, piso/apartamento, vale/dale',
    vocabHints: 'ordenador vs computadora, coche vs carro, piso vs apartamento, móvil vs celular, vale vs dale, coger vs tomar',
    pattern: 'Complex clause highlighting regional variation',
  },
  lesson36: {
    num: 36, title: 'Complex Subjunctive Clauses', cefrLevel: 'C1',
    grammarFocus: 'Subjunctive triggers: como si + imperfecto subj, aunque + subjunctive, ojalá que, es posible que',
    vocabHints: 'como si estuviera, aunque llueva, ojalá que pueda, es posible que venga, dudo que sepa, para que entienda',
    pattern: 'Complex subjunctive clause',
  },
  lesson37: {
    num: 37, title: 'Advanced Deceptive Cognates', cefrLevel: 'C1',
    grammarFocus: 'False friends: pretender≠pretend, constipado≠constipated, embarazada≠embarrassed, éxito≠exit, realizar≠realize',
    vocabHints: 'pretender, constipado, embarazada, éxito, realizar, sensible, actual, asistir, librería, recordar',
    pattern: 'Complex clause demonstrating correct usage of false friends',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. PROMPT CONSTRUCTION
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(lessonId, count) {
  const meta = LESSON_META[lessonId];
  if (!meta) throw new Error(`No metadata for ${lessonId}`);

  const cefrGuidance = {
    A1: `CEFR A1 rules:
- Use ONLY present tense (no past, no subjunctive, no conditional)
- Simple 3-5 word sentences: Subject + Verb + Object
- Basic vocabulary only (common nouns, regular verb forms)
- Every sentence MUST have a subject pronoun (Yo, Tú, Él, Ella, Nosotros, Ellos, Usted)
- pronounDroppedVariant must be null
- Use articles correctly (el, la, un, una) as part of Object tokens`,

    A2: `CEFR A2 rules:
- Use ONLY present tense and near-future (ir + a + infinitive)
- 4-7 word sentences: Subject + Verb + Object + Place
- Include locational expressions (en la escuela, en el parque, en casa)
- Place tokens should tag the preposition and article as "Place" role
- pronounDroppedVariant must be null`,

    B1: `CEFR B1 rules:
- Present tense, near-future, and simple past allowed
- 5-9 word sentences: Subject + Verb + Object + Place + Time
- Include both place AND time expressions
- Time expressions: ahora, hoy, mañana, por la mañana, cada día, a las tres
- Place before Time in natural Spanish word order
- pronounDroppedVariant must be null`,

    B2: `CEFR B2 rules:
- All tenses allowed (present, past, progressive, near future)
- 5-10 word sentences: Subject + Verb + Object + Place + Time
- Include a pronounDroppedVariant for EVERY sentence (remove subject pronoun)
- Use stem-changing verbs, reflexive verbs, object pronouns as appropriate for the lesson
- More complex objects (with adjectives, compound nouns)`,

    C1: `CEFR C1 rules:
- ALL tenses and moods allowed, including subjunctive, conditional, compound tenses
- 6-15 word multi-clause sentences
- Use subordinate clauses (aunque, como si, para que, antes de que)
- Include a pronounDroppedVariant for every sentence
- Use idiomatic expressions, formal register, academic vocabulary as appropriate
- Sentences should demonstrate sophisticated grammar structures`,
  };

  return `You are an expert Spanish language education content creator. Generate exactly ${count} ORIGINAL, grammatically correct Spanish sentences for a sentence-builder exercise in a language learning app.

## LESSON CONTEXT
- Lesson ${meta.num}: ${meta.title}
- CEFR Level: ${meta.cefrLevel}
- Grammar Focus: ${meta.grammarFocus}
- Sentence Pattern: ${meta.pattern}
- Vocabulary Examples: ${meta.vocabHints}

## ${cefrGuidance[meta.cefrLevel]}

## TOKEN ROLE DEFINITIONS (use these EXACTLY)
- "Subject": The subject pronoun or noun phrase performing the action (Yo, Tú, Ella, Nosotros, El profesor)
- "Verb": The conjugated verb or verb phrase (como, estoy hablando, voy a estudiar)
- "Object": The direct/indirect object including its articles and adjectives (una manzana, el libro grande)
- "Place": Location/place expressions including prepositions (en la cocina, al parque, de España)
- "Time": Temporal expressions (ahora, hoy, por la mañana, cada día, a las tres)
- "Other": Connectors, conjunctions, or words that don't fit above (porque, aunque, que, y)

## CRITICAL RULES
1. Every sentence MUST be grammatically correct Spanish with accurate accents (á, é, í, ó, ú, ñ, ¿, ¡)
2. Every sentence MUST be unique — no duplicates or near-duplicates
3. The concatenation of all token texts (joined by spaces) MUST exactly equal spanishSentence
4. Token order values MUST be sequential starting from 1
5. Token roles MUST accurately reflect each word's syntactic function
6. English translations MUST be accurate and natural
7. DO NOT copy sentences from any textbook — all sentences must be original
8. DO NOT create nonsensical sentences (e.g., "I eat a car", "She reads a table")
9. Each word gets its own token — multi-word expressions like "en la cocina" become 3 separate tokens
10. Include a brief pedagogical note for each sentence explaining the grammar point demonstrated

## OUTPUT FORMAT
Return a JSON array of exactly ${count} objects with this structure:
[
  {
    "spanishSentence": "Yo como una manzana",
    "englishTranslation": "I eat an apple",
    "tokens": [
      {"text": "Yo", "role": "Subject", "order": 1},
      {"text": "como", "role": "Verb", "order": 2},
      {"text": "una", "role": "Object", "order": 3},
      {"text": "manzana", "role": "Object", "order": 4}
    ],
    "pronounDroppedVariant": null,
    "notes": "Basic SVO with indefinite article una"
  }
]`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. GEMINI API CALL (with retries + model fallback)
// ═══════════════════════════════════════════════════════════════════════════════

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function callGemini(prompt, temperature = 0.85, maxOutputTokens = 16384) {
  const models = [PRIMARY_MODEL, ...FALLBACK_MODELS];

  for (let mi = 0; mi < models.length; mi++) {
    const model = models[mi];
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature,
            maxOutputTokens,
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text?.trim();
        if (!rawText) {
          throw new Error('Empty response from Gemini');
        }
        return rawText;
      } catch (err) {
        const msg = err?.message || String(err);
        const isRetryable =
          msg.includes('503') || msg.includes('429') ||
          msg.includes('overloaded') || msg.includes('unavailable') ||
          msg.includes('rate') || msg.includes('quota') ||
          msg.includes('RESOURCE_EXHAUSTED') || msg.includes('fetch');

        if (isRetryable && attempt < maxAttempts) {
          const delayMs = 2000 * attempt;
          console.warn(`  ⚠ Model ${model} attempt ${attempt}/${maxAttempts} failed: ${msg.slice(0, 80)}. Retrying in ${delayMs}ms...`);
          await sleep(delayMs);
          continue;
        }

        if (mi < models.length - 1) {
          console.warn(`  ⚠ Model ${model} failed after ${attempt} attempts. Falling back to ${models[mi + 1]}...`);
          break;
        }

        throw new Error(`All models failed. Last error: ${msg}`);
      }
    }
  }

  throw new Error('All models exhausted without a response');
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════

const VALID_ROLES = new Set(['Subject', 'Verb', 'Object', 'Place', 'Time', 'Other']);
const VALID_CEFR  = new Set(['A1', 'A2', 'B1', 'B2', 'C1']);

function validateExercise(exercise, lessonId, cefrLevel) {
  const errors = [];

  // Schema checks
  if (!exercise.spanishSentence || typeof exercise.spanishSentence !== 'string' || !exercise.spanishSentence.trim()) {
    errors.push('Missing or empty spanishSentence');
  }
  if (!exercise.englishTranslation || typeof exercise.englishTranslation !== 'string' || !exercise.englishTranslation.trim()) {
    errors.push('Missing or empty englishTranslation');
  }
  if (!Array.isArray(exercise.tokens) || exercise.tokens.length === 0) {
    errors.push('Missing or empty tokens array');
  }

  // Token checks
  if (exercise.tokens && exercise.tokens.length > 0) {
    for (let i = 0; i < exercise.tokens.length; i++) {
      const t = exercise.tokens[i];
      if (!t.text || typeof t.text !== 'string') {
        errors.push(`Token ${i}: missing text`);
      }
      if (!VALID_ROLES.has(t.role)) {
        errors.push(`Token ${i}: invalid role "${t.role}"`);
      }
      if (t.order !== i + 1) {
        errors.push(`Token ${i}: order should be ${i + 1}, got ${t.order}`);
      }
    }

    // Check that tokens concatenate to spanish sentence
    const reconstructed = exercise.tokens.map((t) => t.text).join(' ');
    if (exercise.spanishSentence && reconstructed !== exercise.spanishSentence) {
      errors.push(`Token concatenation mismatch: "${reconstructed}" vs "${exercise.spanishSentence}"`);
    }

    // Must have at least a Verb token
    const hasVerb = exercise.tokens.some((t) => t.role === 'Verb');
    if (!hasVerb) {
      errors.push('No Verb token found');
    }
  }

  // CEFR compliance
  if (exercise.spanishSentence) {
    const lower = exercise.spanishSentence.toLowerCase();
    if (cefrLevel === 'A1') {
      const subjunctiveMarkers = ['aunque', 'ojalá', 'para que', 'como si'];
      for (const marker of subjunctiveMarkers) {
        if (lower.includes(marker)) {
          errors.push(`A1 sentence contains subjunctive marker "${marker}"`);
        }
      }
    }
  }

  // pronounDroppedVariant check for B2/C1
  if ((cefrLevel === 'B2' || cefrLevel === 'C1') && exercise.pronounDroppedVariant === undefined) {
    // Allow null but not missing entirely
    exercise.pronounDroppedVariant = null;
  }

  return { valid: errors.length === 0, errors };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. SIMILARITY CHECK (Jaccard on word tokens)
// ═══════════════════════════════════════════════════════════════════════════════

function tokenize(sentence) {
  return new Set(sentence.toLowerCase().replace(/[¿¡.,!?]/g, '').split(/\s+/).filter(Boolean));
}

function jaccardSimilarity(a, b) {
  const setA = tokenize(a);
  const setB = tokenize(b);
  let intersection = 0;
  for (const word of setA) {
    if (setB.has(word)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function isDuplicate(sentence, existingSentences) {
  // Exact match
  if (existingSentences.has(sentence)) return true;

  // Similarity check
  for (const existing of existingSentences) {
    if (jaccardSimilarity(sentence, existing) >= SIMILARITY_THRESHOLD) {
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. PARSE AND CLEAN EXERCISES FROM API RESPONSE
// ═══════════════════════════════════════════════════════════════════════════════

function parseExercises(rawJson) {
  let cleaned = rawJson
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // Find the array
  const startIdx = cleaned.indexOf('[');
  const endIdx = cleaned.lastIndexOf(']');
  if (startIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) {
      console.warn('  ⚠ Parsed JSON is not an array, wrapping...');
      return [parsed];
    }
    return parsed;
  } catch (err) {
    console.error(`  ✗ JSON parse error: ${err.message}`);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. LOAD EXISTING EXERCISES (preserve valid ones)
// ═══════════════════════════════════════════════════════════════════════════════

function loadExistingExercises() {
  const filePath = path.join(ROOT, 'src', 'data', 'sentenceBuilderExercises.ts');
  if (!fs.existsSync(filePath)) return [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Extract exercise objects using regex (simple extraction)
    const exercises = [];
    const exerciseRegex = /\{\s*id:\s*'([^']+)',\s*lessonId:\s*'([^']+)',\s*cefrLevel:\s*'([^']+)',\s*spanishSentence:\s*'([^']+)',\s*englishTranslation:\s*'([^']+)'/g;
    let match;
    while ((match = exerciseRegex.exec(content)) !== null) {
      exercises.push({
        id: match[1],
        lessonId: match[2],
        cefrLevel: match[3],
        spanishSentence: match[4],
        englishTranslation: match[5],
      });
    }
    return exercises;
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. MAIN GENERATION ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════════════════════

async function generateForLesson(lessonId, existingExercises = []) {
  const meta = LESSON_META[lessonId];
  const cefrLevel = meta.cefrLevel;
  const existingCount = existingExercises.length;
  const needed = TARGET_PER_LESSON - existingCount;

  if (needed <= 0) {
    console.log(`  ✓ ${lessonId}: already has ${existingCount} exercises, skipping generation`);
    return { exercises: existingExercises, log: { generated: 0, validated: existingCount, retries: 0, failed: [] } };
  }

  console.log(`  → ${lessonId} (${meta.cefrLevel}): need ${needed} more (have ${existingCount})`);

  const validExercises = [...existingExercises];
  const usedSentences = new Set(existingExercises.map((e) => e.spanishSentence));
  const failedExercises = [];
  let totalGenerated = 0;
  let retryCount = 0;

  for (let pass = 0; pass < MAX_RETRY_PASSES && validExercises.length < TARGET_PER_LESSON; pass++) {
    const stillNeeded = TARGET_PER_LESSON - validExercises.length + 5; // +5 buffer for validation failures
    const batchSize = Math.min(stillNeeded, 25); // Cap at 25 per call to stay within output limits

    if (pass > 0) {
      retryCount++;
      console.log(`    Retry pass ${pass + 1}/${MAX_RETRY_PASSES}: still need ${TARGET_PER_LESSON - validExercises.length} exercises`);
    }

    try {
      const prompt = buildPrompt(lessonId, batchSize);
      await sleep(DELAY_BETWEEN_CALLS_MS);
      const rawResponse = await callGemini(prompt);
      const rawExercises = parseExercises(rawResponse);
      totalGenerated += rawExercises.length;

      console.log(`    Received ${rawExercises.length} exercises from API`);

      for (const raw of rawExercises) {
        if (validExercises.length >= TARGET_PER_LESSON) break;

        // Assign ID
        const exerciseNum = validExercises.length + 1;
        const exercise = {
          id: `${lessonId}-exercise-${exerciseNum}`,
          lessonId,
          cefrLevel,
          spanishSentence: raw.spanishSentence,
          englishTranslation: raw.englishTranslation,
          tokens: raw.tokens,
          pronounDroppedVariant: raw.pronounDroppedVariant || null,
          notes: raw.notes || null,
        };

        // Validate
        const { valid, errors } = validateExercise(exercise, lessonId, cefrLevel);
        if (!valid) {
          failedExercises.push({ sentence: exercise.spanishSentence, errors });
          continue;
        }

        // Dedup + similarity check
        if (isDuplicate(exercise.spanishSentence, usedSentences)) {
          failedExercises.push({ sentence: exercise.spanishSentence, errors: ['Duplicate or too similar to existing'] });
          continue;
        }

        validExercises.push(exercise);
        usedSentences.add(exercise.spanishSentence);
      }

      console.log(`    Valid so far: ${validExercises.length}/${TARGET_PER_LESSON}`);
    } catch (err) {
      console.error(`    ✗ API call failed: ${err.message}`);
      failedExercises.push({ sentence: `[API ERROR pass ${pass + 1}]`, errors: [err.message] });
    }
  }

  // Re-number IDs sequentially
  validExercises.forEach((ex, i) => {
    ex.id = `${lessonId}-exercise-${i + 1}`;
  });

  return {
    exercises: validExercises,
    log: {
      generated: totalGenerated,
      validated: validExercises.length,
      retries: retryCount,
      failed: failedExercises,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 9. OUTPUT WRITER
// ═══════════════════════════════════════════════════════════════════════════════

function escapeString(s) {
  if (s === null || s === undefined) return 'null';
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}

function writeTypescriptFile(allExercises) {
  const totalCount = allExercises.length;
  const dateStr = new Date().toISOString().split('T')[0];

  let output = `// Generated Sentence Builder Exercises
// Auto-generated on ${dateStr} by scripts/generateSentenceExercises.mjs
// Total: ${totalCount} exercises across 37 lessons
// DO NOT EDIT MANUALLY — regenerate with: node scripts/generateSentenceExercises.mjs

import type { SentenceExercise, Token, TokenRole } from '../lib/sentenceBuilder';

export const SENTENCE_BUILDER_EXERCISES: SentenceExercise[] = [\n`;

  for (const ex of allExercises) {
    output += `  {\n`;
    output += `    id: ${escapeString(ex.id)},\n`;
    output += `    lessonId: ${escapeString(ex.lessonId)},\n`;
    output += `    cefrLevel: ${escapeString(ex.cefrLevel)} as 'A1' | 'A2' | 'B1' | 'B2' | 'C1',\n`;
    output += `    spanishSentence: ${escapeString(ex.spanishSentence)},\n`;
    output += `    englishTranslation: ${escapeString(ex.englishTranslation)},\n`;
    output += `    tokens: [\n`;
    for (const t of ex.tokens) {
      output += `      { text: ${escapeString(t.text)}, role: ${escapeString(t.role)} as TokenRole, order: ${t.order} },\n`;
    }
    output += `    ],\n`;
    output += `    pronounDroppedVariant: ${ex.pronounDroppedVariant ? escapeString(ex.pronounDroppedVariant) : 'null'},\n`;
    output += `    notes: ${ex.notes ? escapeString(ex.notes) : 'null'},\n`;
    output += `  },\n`;
  }

  output += `];\n`;

  const outPath = path.join(ROOT, 'src', 'data', 'sentenceBuilderExercises.ts');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`\n✓ Wrote ${totalCount} exercises to ${outPath}`);
}

function writeGenerationLog(log) {
  const logPath = path.join(ROOT, 'scripts', 'generation_log.json');
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf-8');
  console.log(`✓ Wrote generation log to ${logPath}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 10. SANITY TEST — verify API works before full run
// ═══════════════════════════════════════════════════════════════════════════════

async function sanityTest() {
  console.log('Running API sanity test...');
  try {
    const testPrompt = 'Generate a JSON array with exactly 1 object: { "test": "hello" }';
    const result = await callGemini(testPrompt, 0.1, 256);
    const parsed = JSON.parse(result);
    if (parsed) {
      console.log('✓ API sanity test passed\n');
      return true;
    }
  } catch (err) {
    console.error(`✗ API sanity test failed: ${err.message}`);
    console.error('Check your GEMINI_API_KEY in .env');
    return false;
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Sentence Builder Exercise Generator');
  console.log('  Target: 40 exercises × 37 lessons = 1,480+');
  console.log('═══════════════════════════════════════════════════\n');

  // Sanity test
  const apiOk = await sanityTest();
  if (!apiOk) {
    process.exit(1);
  }

  // Load existing exercises
  const existingRaw = loadExistingExercises();
  const existingByLesson = {};
  for (const ex of existingRaw) {
    if (!existingByLesson[ex.lessonId]) existingByLesson[ex.lessonId] = [];
    existingByLesson[ex.lessonId].push(ex);
  }
  console.log(`Loaded ${existingRaw.length} existing exercises\n`);

  const allExercises = [];
  const generationLog = {
    timestamp: new Date().toISOString(),
    totalTarget: TARGET_PER_LESSON * 37,
    lessons: {},
    summary: { total: 0, passed: 0, shortLessons: [] },
  };

  const lessonIds = Object.keys(LESSON_META);

  for (const lessonId of lessonIds) {
    console.log(`\n── ${lessonId.toUpperCase()} ──────────────────────────────────`);
    const existingForLesson = existingByLesson[lessonId] || [];

    const { exercises, log } = await generateForLesson(lessonId, []);
    // Note: we don't pass existing exercises because we can't fully parse
    // the current TS file with token data. We regenerate all 40 fresh.

    allExercises.push(...exercises);
    generationLog.lessons[lessonId] = {
      cefrLevel: LESSON_META[lessonId].cefrLevel,
      target: TARGET_PER_LESSON,
      generated: log.generated,
      validated: log.validated,
      retries: log.retries,
      failedCount: log.failed.length,
      failedSamples: log.failed.slice(0, 5), // log first 5 failures
    };

    if (log.validated < TARGET_PER_LESSON) {
      generationLog.summary.shortLessons.push({
        lessonId,
        got: log.validated,
        target: TARGET_PER_LESSON,
      });
    }
  }

  generationLog.summary.total = allExercises.length;
  generationLog.summary.passed = allExercises.length;

  // Write outputs
  writeTypescriptFile(allExercises);
  writeGenerationLog(generationLog);

  // Final report
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  GENERATION COMPLETE');
  console.log(`  Total exercises: ${allExercises.length} / ${TARGET_PER_LESSON * 37}`);
  if (generationLog.summary.shortLessons.length > 0) {
    console.log(`  ⚠ Short lessons (${generationLog.summary.shortLessons.length}):`);
    for (const s of generationLog.summary.shortLessons) {
      console.log(`    ${s.lessonId}: ${s.got}/${s.target}`);
    }
  } else {
    console.log('  ✓ All lessons reached target!');
  }
  console.log('═══════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
