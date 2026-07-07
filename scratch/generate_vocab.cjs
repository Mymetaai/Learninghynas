const fs = require('fs');
const path = require('path');

const SPANISH_DATA_DIR = path.join(__dirname, '..', 'spanish_data');
const ES_EN_FILE = path.join(SPANISH_DATA_DIR, 'es-en.data');
const SENTENCES_FILE = path.join(SPANISH_DATA_DIR, 'sentences.tsv');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'content', 'preA1');

// Pre-defined plain-pronunciation rules for Spanish words.
function generatePronunciation(word) {
  // Simple heuristic phonetic mapper for Spanish
  let w = word.toLowerCase().trim();
  w = w.replace(/ñ/g, 'ny');
  w = w.replace(/ll/g, 'y');
  w = w.replace(/h/g, '');
  w = w.replace(/qu/g, 'k');
  w = w.replace(/v/g, 'b');
  w = w.replace(/z/g, 's');
  w = w.replace(/ce/g, 'se');
  w = w.replace(/ci/g, 'si');
  w = w.replace(/j/g, 'h');
  w = w.replace(/g([ei])/g, 'h$1');
  w = w.replace(/ch/g, 'ch');
  
  // Clean up stress and capitalization
  return w.toUpperCase();
}

// Manual corrections for meanings/pronunciations to ensure high-quality stubs.
const manualVocabularyData = {
  "hola": { meaning: "hello", pronunciation: "OH-lah", audioCue: "Stress the first syllable: OH-lah." },
  "adiós": { meaning: "goodbye", pronunciation: "ah-DYOHS", audioCue: "The 'd' is soft, almost like 'th' in 'this'." },
  "gracias": { meaning: "thank you", pronunciation: "GRAH-syahs", audioCue: "The 'c' sounds like 's' in Latin America." },
  "bien": { meaning: "well / good", pronunciation: "byehn", audioCue: "The 'ie' glides like 'ye' in 'yes'." },
  "mañana": { meaning: "tomorrow / morning", pronunciation: "mah-NYAH-nah", audioCue: "The 'ñ' sounds like 'ny' in 'canyon'." },
  "cero": { meaning: "zero", pronunciation: "SEH-roh", audioCue: "The 'c' before 'e' is a soft 's' sound." },
  "uno": { meaning: "one", pronunciation: "OO-noh", audioCue: "Stress the first syllable: OO-noh." },
  "dos": { meaning: "two", pronunciation: "dohs", audioCue: "Short and crisp 'o' sound." },
  "tres": { meaning: "three", pronunciation: "trehs", audioCue: "Roll the 'tr' slightly." },
  "cuatro": { meaning: "four", pronunciation: "KWAH-troh", audioCue: "The 'cu' glides like English 'w'." },
  "cinco": { meaning: "five", pronunciation: "SEEN-koh", audioCue: "The first 'c' is soft, second 'c' is hard." },
  "seis": { meaning: "six", pronunciation: "sayss", audioCue: "Glides from 'eh' to 'ee'." },
  "siete": { meaning: "seven", pronunciation: "SYEH-teh", audioCue: "Stress the first syllable: SYEH-teh." },
  "ocho": { meaning: "eight", pronunciation: "OH-choh", audioCue: "The 'ch' is identical to English 'ch'." },
  "nueve": { meaning: "nine", pronunciation: "NWEH-beh", audioCue: "The 'v' is soft, sounding like 'b'." },
  "diez": { meaning: "ten", pronunciation: "dyehss", audioCue: "The 'z' sounds like 's'." },
  "once": { meaning: "eleven", pronunciation: "OHN-seh", audioCue: "Stress the first syllable: OHN-seh." },
  "doce": { meaning: "twelve", pronunciation: "DOH-seh", audioCue: "Stress the first syllable: DOH-seh." },
  "trece": { meaning: "thirteen", pronunciation: "TREH-seh", audioCue: "Stress the first syllable: TREH-seh." },
  "catorce": { meaning: "fourteen", pronunciation: "kah-TOHR-seh", audioCue: "Stress the middle syllable: kah-TOHR-seh." },
  "quince": { meaning: "fifteen", pronunciation: "KEEN-seh", audioCue: "The 'qu' makes a hard 'k' sound." },
  "dieciséis": { meaning: "sixteen", pronunciation: "dyeh-see-SAYSS", audioCue: "Stress the final syllable: dyeh-see-SAYSS." },
  "diecisiete": { meaning: "seventeen", pronunciation: "dyeh-see-SYEH-teh", audioCue: "Stress the third syllable." },
  "dieciocho": { meaning: "eighteen", pronunciation: "dyeh-see-OH-choh", audioCue: "Stress the third syllable." },
  "diecinueve": { meaning: "nineteen", pronunciation: "dyeh-see-NWEH-beh", audioCue: "The 'v' is soft like 'b'." },
  "veinte": { meaning: "twenty", pronunciation: "BAYN-teh", audioCue: "The 'v' is pronounced as a soft 'b'." },
  "rojo": { meaning: "red", pronunciation: "ROH-hoh", audioCue: "The 'j' is a breathy sound, like 'h' in English." },
  "azul": { meaning: "blue", pronunciation: "ah-SOOL", audioCue: "Stress the last syllable: ah-SOOL." },
  "verde": { meaning: "green", pronunciation: "BEHR-deh", audioCue: "The 'v' sounds close to a soft 'b'." },
  "amarillo": { meaning: "yellow", pronunciation: "ah-mah-REE-yoh", audioCue: "The double 'll' sounds like 'y' in 'yes'." },
  "naranja": { meaning: "orange", pronunciation: "nah-RAHN-hah", audioCue: "The 'j' is breathy like 'h'." },
  "rosa": { meaning: "pink / rose", pronunciation: "ROH-sah", audioCue: "Roll the starting 'r' slightly." },
  "marrón": { meaning: "brown", pronunciation: "mah-RROHN", audioCue: "Roll the double 'rr' strongly." },
  "blanco": { meaning: "white", pronunciation: "BLAHN-koh", audioCue: "Stress the first syllable." },
  "negro": { meaning: "black", pronunciation: "NEH-groh", audioCue: "Stress the first syllable." },
  "morado": { meaning: "purple", pronunciation: "moh-RAH-doh", audioCue: "Stress the middle syllable." },
  "gris": { meaning: "gray", pronunciation: "greess", audioCue: "One short syllable: greess." },
  "color": { meaning: "color", pronunciation: "koh-LOHR", audioCue: "Stress the last syllable: koh-LOHR." },
  "colores": { meaning: "colors", pronunciation: "koh-LOH-rehs", audioCue: "Stress the middle syllable." },
  "padre": { meaning: "father", pronunciation: "PAH-dreh", audioCue: "Stress the first syllable." },
  "madre": { meaning: "mother", pronunciation: "MAH-dreh", audioCue: "Stress the first syllable." },
  "mamá": { meaning: "mom / mother", pronunciation: "mah-MAH", audioCue: "Accent on the final syllable: mah-MAH." },
  "papá": { meaning: "dad / father", pronunciation: "pah-PAH", audioCue: "Accent on the final syllable: pah-PAH." },
  "hermano": { meaning: "brother", pronunciation: "ehr-MAH-noh", audioCue: "The 'h' is silent." },
  "hermana": { meaning: "sister", pronunciation: "ehr-MAH-nah", audioCue: "The 'h' is silent." },
  "hijo": { meaning: "son", pronunciation: "EE-hoh", audioCue: "The 'h' is silent; 'j' is breathy." },
  "hija": { meaning: "daughter", pronunciation: "EE-hah", audioCue: "The 'h' is silent; 'j' is breathy." },
  "familia": { meaning: "family", pronunciation: "fah-MEE-lyah", audioCue: "The 'li' glides into a 'y' sound." },
  "abuelo": { meaning: "grandfather", pronunciation: "ah-BWEH-loh", audioCue: "The 'ue' glides like 'we' in 'well'." },
  "abuela": { meaning: "grandmother", pronunciation: "ah-BWEH-lah", audioCue: "The 'ue' glides like 'we' in 'well'." },
  "tío": { meaning: "uncle", pronunciation: "TEE-oh", audioCue: "Stress the 'i' clearly." },
  "tía": { meaning: "aunt", pronunciation: "TEE-ah", audioCue: "Stress the 'i' clearly." },
  "primo": { meaning: "cousin (male)", pronunciation: "PREE-moh", audioCue: "Stress the first syllable." },
  "prima": { meaning: "cousin (female)", pronunciation: "PREE-mah", audioCue: "Stress the first syllable." },
  "bebé": { meaning: "baby", pronunciation: "beh-BEH", audioCue: "Accent on the final syllable: beh-BEH." },
  "niño": { meaning: "boy / child", pronunciation: "NEEN-yoh", audioCue: "The 'ñ' sounds like 'ny' in 'canyon'." },
  "niña": { meaning: "girl / child", pronunciation: "NEEN-yah", audioCue: "The 'ñ' sounds like 'ny' in 'canyon'." },
  "perro": { meaning: "dog", pronunciation: "PEH-rroh", audioCue: "The double 'rr' is rolled/trilled." },
  "gato": { meaning: "cat", pronunciation: "GAH-toh", audioCue: "A single 't' — crisp, not like English." },
  "caballo": { meaning: "horse", pronunciation: "kah-BAH-yoh", audioCue: "The double 'll' makes a 'y' sound." },
  "vaca": { meaning: "cow", pronunciation: "BAH-kah", audioCue: "The 'v' sounds exactly like 'b' in Spanish." },
  "oveja": { meaning: "sheep", pronunciation: "oh-BEH-hah", audioCue: "The 'v' is soft like 'b'; 'j' is breathy." },
  "gallina": { meaning: "hen / chicken", pronunciation: "gah-YEE-nah", audioCue: "The double 'll' makes a 'y' sound." },
  "ratón": { meaning: "mouse", pronunciation: "rah-TOHN", audioCue: "Roll the starting 'r'; stress final 'o'." },
  "pájaro": { meaning: "bird", pronunciation: "PAH-hah-roh", audioCue: "Accent on the first 'á': PAH-hah-roh." },
  "pez": { meaning: "fish", pronunciation: "pehs", audioCue: "The 'z' is soft, like 's' in English." },
  "animal": { meaning: "animal", pronunciation: "ah-nee-MAHL", audioCue: "Stress the final syllable: ah-nee-MAHL." },
  "sol": { meaning: "sun", pronunciation: "sohl", audioCue: "Single crisp syllable: sohl." },
  "luna": { meaning: "moon", pronunciation: "LOO-nah", audioCue: "Stress the first syllable." },
  "cielo": { meaning: "sky / heaven", pronunciation: "SYEH-loh", audioCue: "The 'c' is soft; 'ie' glides." },
  "mar": { meaning: "sea", pronunciation: "mahr", audioCue: "Single crisp syllable: mahr." },
  "árbol": { meaning: "tree", pronunciation: "AHR-bohl", audioCue: "Accent on the first 'á': AHR-bohl." },
  "flor": { meaning: "flower", pronunciation: "flohr", audioCue: "Single crisp syllable: flohr." },
  "agua": { meaning: "water", pronunciation: "AH-gwah", audioCue: "The 'g' is soft; stress first syllable." },
  "pan": { meaning: "bread", pronunciation: "pahn", audioCue: "Short, crisp 'a' sound, like 'ah'." },
  "casa": { meaning: "house", pronunciation: "KAH-sah", audioCue: "Stress the first syllable: KAH-sah." },
  "libro": { meaning: "book", pronunciation: "LEE-broh", audioCue: "Stress the first syllable: LEE-broh." },
  "lápiz": { meaning: "pencil", pronunciation: "LAH-pees", audioCue: "Accent on the 'á'; 'z' sounds like 's'." },
  "mesa": { meaning: "table", pronunciation: "MEH-sah", audioCue: "Stress the first syllable: MEH-sah." },
  "silla": { meaning: "chair", pronunciation: "SEE-yah", audioCue: "The double 'll' makes a 'y' sound." }
};

const questsDef = [
  {
    num: 5,
    title: "Meeting Friends",
    subtitle: "Learn basic social terms",
    topicFocus: ["greetings"],
    words: ["amigo", "amiga", "señor", "señora", "por favor", "de nada", "cómo", "estás", "bien", "mal"]
  },
  {
    num: 6,
    title: "Counting to Ten",
    subtitle: "Count objects from one to ten",
    topicFocus: ["numbers"],
    words: ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"]
  },
  {
    num: 7,
    title: "Counting to Twenty",
    subtitle: "Count objects from eleven to twenty",
    topicFocus: ["numbers"],
    words: ["once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"]
  },
  {
    num: 8,
    title: "Warm Colors",
    subtitle: "Describe warm-colored objects",
    topicFocus: ["colors"],
    words: ["rojo", "amarillo", "naranja", "rosa", "marrón", "blanco", "negro"]
  },
  {
    num: 9,
    title: "Cool Colors",
    subtitle: "Describe cool-colored objects",
    topicFocus: ["colors"],
    words: ["azul", "verde", "morado", "gris", "color", "colores"]
  },
  {
    num: 10,
    title: "My Close Family",
    subtitle: "Name parents and siblings",
    topicFocus: ["family"],
    words: ["padre", "madre", "papá", "mamá", "hermano", "hermana", "hijo", "hija", "familia"]
  },
  {
    num: 11,
    title: "My Extended Family",
    subtitle: "Name grandparents and relatives",
    topicFocus: ["family"],
    words: ["abuelo", "abuela", "tío", "tía", "primo", "prima", "bebé", "niño", "niña"]
  },
  {
    num: 12,
    title: "Pets and Farm Animals",
    subtitle: "Talk about domestic animals",
    topicFocus: ["animals"],
    words: ["perro", "gato", "caballo", "vaca", "oveja", "gallina", "ratón", "pájaro", "animal"]
  },
  {
    num: 13,
    title: "Wild and Water Animals",
    subtitle: "Talk about wild animals and fish",
    topicFocus: ["animals"],
    words: ["león", "tigre", "oso", "pez", "mono", "elefante", "tortuga", "rana", "selva"]
  },
  {
    num: 14,
    title: "Inside the Classroom",
    subtitle: "Name common school items",
    topicFocus: ["classroom-objects"],
    words: ["libro", "lápiz", "bolígrafo", "papel", "mesa", "silla", "escuela", "profesor", "clase"]
  },
  {
    num: 15,
    title: "Objects at Home",
    subtitle: "Name household items and parts of a house",
    topicFocus: ["classroom-objects"],
    words: ["casa", "puerta", "ventana", "cama", "cocina", "baño", "sala", "llave", "reloj"]
  },
  {
    num: 16,
    title: "Basic Food",
    subtitle: "Talk about staple foods",
    topicFocus: ["food"],
    words: ["pan", "queso", "carne", "arroz", "huevo", "fruta", "manzana", "plátano", "comida"]
  },
  {
    num: 17,
    title: "Drinks and Breakfast",
    subtitle: "Talk about beverages",
    topicFocus: ["food"],
    words: ["agua", "leche", "café", "té", "jugo", "bebida", "azúcar", "sal", "desayuno"]
  },
  {
    num: 18,
    title: "Essential Present Verbs 1",
    subtitle: "Talk about state and presence",
    topicFocus: ["verbs"],
    words: ["ser", "estar", "tener", "querer", "hacer", "ir", "yo", "tú", "él", "ella"]
  },
  {
    num: 19,
    title: "Essential Present Verbs 2",
    subtitle: "Talk about actions and communication",
    topicFocus: ["verbs"],
    words: ["comer", "beber", "hablar", "ver", "leer", "escribir", "saber", "gustar", "nosotros", "ellos"]
  },
  {
    num: 20,
    title: "Describing Things",
    subtitle: "Use common basic adjectives",
    topicFocus: ["adjectives"],
    words: ["grande", "pequeño", "bueno", "malo", "nuevo", "viejo", "fácil", "difícil", "bonito", "feo"]
  },
  {
    num: 21,
    title: "Days of the Week",
    subtitle: "Name the days of the week",
    topicFocus: ["time"],
    words: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo", "día", "semana"]
  },
  {
    num: 22,
    title: "My Body",
    subtitle: "Learn basic body parts",
    topicFocus: ["body"],
    words: ["cabeza", "mano", "pie", "ojo", "boca", "nariz", "brazo", "pierna", "cuerpo"]
  },
  {
    num: 23,
    title: "Places in Town",
    subtitle: "Name locations around town",
    topicFocus: ["places"],
    words: ["calle", "tienda", "hospital", "parque", "hotel", "restaurante", "playa", "ciudad", "pueblo"]
  },
  {
    num: 24,
    title: "Weather and Nature",
    subtitle: "Describe weather and outdoor environments",
    topicFocus: ["nature"],
    words: ["sol", "luna", "cielo", "mar", "árbol", "flor", "lluvia", "viento", "calor", "frío"]
  },
  {
    num: 25,
    title: "Course Summary Review",
    subtitle: "Comprehensive review of Pre-A1 vocabulary",
    topicFocus: ["review"],
    words: ["hola", "adiós", "gracias", "uno", "rojo", "mamá", "perro", "casa", "pan", "ser", "grande"]
  }
];

// Helper to parse Wiktionary glosses file (es-en.data)
function parseDictionary() {
  console.log("Parsing Wiktionary data...");
  const dict = {};
  if (!fs.existsSync(ES_EN_FILE)) {
    console.warn("es-en.data not found, using fallbacks.");
    return dict;
  }
  const content = fs.readFileSync(ES_EN_FILE, 'utf-8');
  const blocks = content.split('_____\n');
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 2) continue;
    const word = lines[0].trim();
    if (!word) continue;
    
    // Find gloss line
    const glossLine = lines.find(l => l.trim().startsWith('gloss:'));
    if (glossLine) {
      const meaning = glossLine.replace('gloss:', '').trim();
      // Clean up meaning (remove brackets/notes)
      let cleaned = meaning.replace(/\{\{[^}]*\}\}/g, '').trim();
      cleaned = cleaned.replace(/^\(([^)]*)\)\s*/g, '').trim();
      cleaned = cleaned.split(';')[0].trim(); // first meaning
      dict[word.toLowerCase()] = cleaned;
    }
  }
  return dict;
}

// Helper to parse Tatoeba sentence pairs
function parseSentences() {
  console.log("Parsing Tatoeba sentences...");
  const sentenceMap = {};
  if (!fs.existsSync(SENTENCES_FILE)) {
    console.warn("sentences.tsv not found, using fallbacks.");
    return sentenceMap;
  }
  const content = fs.readFileSync(SENTENCES_FILE, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    const cols = line.split('\t');
    if (cols.length < 2) continue;
    const eng = cols[0].trim();
    const esp = cols[1].trim();
    if (!eng || !esp) continue;
    
    // Skip very long sentences to keep Pre-A1 simple
    if (eng.length > 50 || esp.length > 50) continue;
    
    // Extract lemmas or words from Spanish sentence to index it
    const words = esp.toLowerCase().replace(/[¡!¿?.,;()"]/g, '').split(/\s+/);
    for (const w of words) {
      if (w.length < 2) continue;
      if (!sentenceMap[w]) {
        sentenceMap[w] = [];
      }
      sentenceMap[w].push({ esp, eng });
    }
  }
  return sentenceMap;
}

function run() {
  const dict = parseDictionary();
  const sentenceMap = parseSentences();
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const qDef of questsDef) {
    const vocabList = [];
    const storySentences = [];
    
    // Ingest vocabulary words
    for (const word of qDef.words) {
      const lowerWord = word.toLowerCase();
      // Check manual stubs first, then dictionary, then fallback
      const manual = manualVocabularyData[lowerWord];
      const meaning = manual ? manual.meaning : (dict[lowerWord] || lowerWord);
      const pronunciation = manual ? manual.pronunciation : generatePronunciation(word);
      const audioCue = manual ? manual.audioCue : `Stress is on the phonetic syllable.`;
      
      // Find Tatoeba example
      let example = "Mi " + word + ".";
      let exampleTranslation = "My " + meaning + ".";
      const matches = sentenceMap[lowerWord] || [];
      if (matches.length > 0) {
        // Prefer shortest sentence
        matches.sort((a, b) => a.esp.length - b.esp.length);
        example = matches[0].esp;
        exampleTranslation = matches[0].eng;
      }
      
      vocabList.push({
        word,
        meaning,
        pronunciation,
        example,
        exampleTranslation,
        audioCue,
        levelIntroduced: "Pre-A1",
        topic: qDef.topicFocus[0]
      });
      
      // Build story sentences from examples
      if (storySentences.length < 5) {
        storySentences.push(example);
      }
    }
    
    // Make sure we have 6 story lines
    while (storySentences.length < 6) {
      storySentences.push("¡Hola! Vamos a practicar.");
    }
    
    // Build programmatic exercises
    const exercises = [
      {
        id: `q${qDef.num}-mc-1`,
        type: 'multiple-choice',
        prompt: `How do you say "${vocabList[0].meaning}"?`,
        answer: vocabList[0].word,
        options: [vocabList[0].word, vocabList[1].word, vocabList[2].word, vocabList[3].word].filter(Boolean)
      },
      {
        id: `q${qDef.num}-mc-2`,
        type: 'multiple-choice',
        prompt: `What does "${vocabList[1].word}" mean?`,
        answer: vocabList[1].meaning,
        options: [vocabList[1].meaning, vocabList[0].meaning, vocabList[2].meaning, vocabList[3].meaning].filter(Boolean)
      },
      {
        id: `q${qDef.num}-fill-1`,
        type: 'fill-blank',
        prompt: `${vocabList[2].example.replace(new RegExp(vocabList[2].word, 'gi'), '___')} (${vocabList[2].meaning})`,
        answer: vocabList[2].word,
        distractorPool: [vocabList[0].word, vocabList[1].word, vocabList[3].word].filter(Boolean)
      },
      {
        id: `q${qDef.num}-match-1`,
        type: 'match',
        prompt: 'Match the words to their meanings',
        answer: vocabList.slice(0, 4).map(v => `${v.word}↔${v.meaning}`).join('|'),
        options: [...vocabList.slice(0, 4).map(v => v.word), ...vocabList.slice(0, 4).map(v => v.meaning)]
      },
      {
        id: `q${qDef.num}-tr-1`,
        type: 'translation',
        direction: 'es-en',
        prompt: vocabList[3].example,
        answer: vocabList[3].exampleTranslation,
        distractorPool: [vocabList[0].exampleTranslation, vocabList[1].exampleTranslation].filter(Boolean)
      },
      {
        id: `q${qDef.num}-listen-1`,
        type: 'listening',
        prompt: `You hear: "${vocabList[4] ? vocabList[4].pronunciation : vocabList[0].pronunciation}". Which word is it?`,
        answer: vocabList[4] ? vocabList[4].word : vocabList[0].word,
        options: [
          vocabList[4] ? vocabList[4].word : vocabList[0].word,
          vocabList[0].word,
          vocabList[1].word,
          vocabList[2].word
        ].filter((v, idx, arr) => arr.indexOf(v) === idx)
      }
    ];

    // Build the quest TypeScript code content
    const code = `// AUTO-GENERATED Pre-A1 Quest ${qDef.num}: "${qDef.title}"
import type { Quest } from '../types';

export const preA1Quest${qDef.num}: Quest = {
  id: 'pre-a1-q${qDef.num}',
  title: '${qDef.title}',
  subtitle: '${qDef.subtitle}',
  estimatedMinutes: 6,
  topicFocus: ${JSON.stringify(qDef.topicFocus)},

  storyLines: ${JSON.stringify(storySentences, null, 2)},

  vocabulary: ${JSON.stringify(vocabList, null, 2)},

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: '${vocabList[0].word} (${vocabList[0].pronunciation})'
    }
  ],

  exercises: ${JSON.stringify(exercises, null, 2)},

  rewards: { xp: 40, coins: 10 }
};
`;

    const filePath = path.join(OUTPUT_DIR, `quest${qDef.num}-gen.ts`);
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`Generated: quest${qDef.num}-gen.ts`);
  }
  console.log("Pre-A1 Quests generation completed successfully!");
}

run();
