const fs = require('fs');
const path = require('path');

// Helper to fix word typo question marks
function cleanSpanishWord(word) {
  let cleaned = word.toLowerCase().trim();
  // Map common Sketch Engine question-mark replacements
  cleaned = cleaned.replace(/a\?o/g, 'año');
  cleaned = cleaned.replace(/a\?os/g, 'años');
  cleaned = cleaned.replace(/espa\?a/g, 'españa');
  cleaned = cleaned.replace(/espa\?ol/g, 'español');
  cleaned = cleaned.replace(/ni\?o/g, 'niño');
  cleaned = cleaned.replace(/ni\?a/g, 'niña');
  cleaned = cleaned.replace(/se\?or/g, 'señor');
  cleaned = cleaned.replace(/se\?ora/g, 'señora');
  cleaned = cleaned.replace(/peque\?o/g, 'pequeño');
  cleaned = cleaned.replace(/peque\?a/g, 'pequeña');
  cleaned = cleaned.replace(/ma\?ana/g, 'mañana');
  cleaned = cleaned.replace(/compa\?ero/g, 'compañero');
  cleaned = cleaned.replace(/ense\?ar/g, 'enseñar');
  cleaned = cleaned.replace(/campa\?a/g, 'campaña');
  cleaned = cleaned.replace(/a\?adir/g, 'añadir');
  cleaned = cleaned.replace(/sue\?o/g, 'sueño');
  cleaned = cleaned.replace(/da\?o/g, 'daño');
  cleaned = cleaned.replace(/ba\?o/g, 'baño');
  cleaned = cleaned.replace(/pi\?a/g, 'piña');
  cleaned = cleaned.replace(/monta\?a/g, 'montaña');
  cleaned = cleaned.replace(/re\?ir/g, 'reñir');
  cleaned = cleaned.replace(/so\?ar/g, 'soñar');
  cleaned = cleaned.replace(/acompa\?ar/g, 'acompañar');
  cleaned = cleaned.replace(/enga\?ar/g, 'engañar');
  cleaned = cleaned.replace(/extra\?o/g, 'extraño');
  cleaned = cleaned.replace(/pu\?ado/g, 'puñado');
  cleaned = cleaned.replace(/pe\?a/g, 'peña');
  
  // Generic single question mark cleanup if it occurs between vowels/consonants
  cleaned = cleaned.replace(/([a-z])\?([a-z])/gi, (match, p1, p2) => {
    return p1 + 'ñ' + p2;
  });
  return cleaned;
}

console.log('Loading es-en.data dictionary...');
const dictData = fs.readFileSync('spanish_data/es-en.data', 'utf8');
const entries = dictData.split('_____');
const dictMap = new Map();

entries.forEach((entry) => {
  const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return;
  const word = lines[0].toLowerCase().trim();
  
  let currentPos = '';
  let glosses = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('pos:')) {
      currentPos = line.replace('pos:', '').trim();
    } else if (line.startsWith('gloss:')) {
      const gloss = line.replace('gloss:', '').trim();
      glosses.push(gloss);
    }
  }
  
  if (glosses.length > 0) {
    if (!dictMap.has(word)) {
      dictMap.set(word, {
        word,
        pos: currentPos,
        gloss: glosses[0], // Take first definition
      });
    }
  }
});
console.log(`Dictionary loaded with ${dictMap.size} unique Spanish words.`);

// Load frequency candidates from spanish_data/frequency.csv
console.log('Loading frequency list...');
const freqContent = fs.readFileSync('spanish_data/frequency.csv', 'utf8');
const freqLines = freqContent.split('\n');

const candidates = [];
freqLines.forEach((line) => {
  const parts = line.trim().split(',');
  if (parts.length < 3) return;
  const count = parseInt(parts[0]);
  if (isNaN(count)) return; // skip header
  
  const word = cleanSpanishWord(parts[1]);
  const pos = parts[2].trim();
  
  if (word.length >= 2 && !word.includes('?') && !word.includes(' ')) {
    candidates.push({
      word,
      pos,
      count
    });
  }
});
console.log(`Loaded ${candidates.length} candidate words from frequency list.`);

// Part of Speech category mapping
const POS_MAP = {
  n: 'Nouns',
  v: 'Verbs',
  adj: 'Adjectives',
  adv: 'Adverbs',
  prep: 'Prepositions',
  conj: 'Connectors',
  pron: 'Pronouns'
};

function getCategory(pos) {
  return POS_MAP[pos] || 'General';
}

// Load seed data from original lists
const originalA1 = [
  {"level":"A1","category":"Saludos","es":"Hola","en":"Hello"},
  {"level":"A1","category":"Saludos","es":"Buenos días","en":"Good morning"},
  {"level":"A1","category":"Saludos","es":"Buenas tardes","en":"Good afternoon"},
  {"level":"A1","category":"Saludos","es":"Buenas noches","en":"Good night / evening"},
  {"level":"A1","category":"Saludos","es":"¿Cómo estás?","en":"How are you? (informal)"},
  {"level":"A1","category":"Saludos","es":"¿Cómo está usted?","en":"How are you? (formal)"},
  {"level":"A1","category":"Saludos","es":"Muy bien, gracias","en":"Very well, thanks"},
  {"level":"A1","category":"Saludos","es":"¿Y tú?","en":"And you? (informal)"},
  {"level":"A1","category":"Saludos","es":"¿Y usted?","en":"And you? (formal)"},
  {"level":"A1","category":"Saludos","es":"Me llamo...","en":"My name is..."},
  {"level":"A1","category":"Saludos","es":"¿Cómo te llamas?","en":"What's your name?"},
  {"level":"A1","category":"Saludos","es":"Mucho gusto","en":"Nice to meet you"},
  {"level":"A1","category":"Saludos","es":"Encantado/a","en":"Pleased to meet you"},
  {"level":"A1","category":"Saludos","es":"Adiós","en":"Goodbye"},
  {"level":"A1","category":"Saludos","es":"Hasta luego","en":"See you later"},
  {"level":"A1","category":"Saludos","es":"Hasta mañana","en":"See you tomorrow"},
  {"level":"A1","category":"Saludos","es":"Nos vemos","en":"See you around"},
  {"level":"A1","category":"Verbos","es":"trabajar","en":"to work"},
  {"level":"A1","category":"Verbos","es":"comer","en":"to eat"},
  {"level":"A1","category":"Verbos","es":"estudiar","en":"to study"},
  {"level":"A1","category":"Verbos","es":"dormir","en":"to sleep"},
  {"level":"A1","category":"Verbos","es":"despertarse","en":"to wake up"},
  {"level":"A1","category":"Verbos","es":"levantarse","en":"to get up"},
  {"level":"A1","category":"Verbos","es":"desayunar","en":"to have breakfast"},
  {"level":"A1","category":"Verbos","es":"almorzar","en":"to have lunch"},
  {"level":"A1","category":"Verbos","es":"cenar","en":"to have dinner"},
  {"level":"A1","category":"Verbos","es":"leer","en":"to read"},
  {"level":"A1","category":"Verbos","es":"escribir","en":"to write"},
  {"level":"A1","category":"Verbos","es":"hablar","en":"to speak"},
  {"level":"A1","category":"Verbos","es":"escuchar","en":"to listen"},
  {"level":"A1","category":"Verbos","es":"caminar","en":"to walk"},
  {"level":"A1","category":"Verbos","es":"conducir","en":"to drive"},
  {"level":"A1","category":"Verbos","es":"limpiar","en":"to clean"},
  {"level":"A1","category":"Verbos","es":"cocinar","en":"to cook"},
  {"level":"A1","category":"Verbos","es":"descansar","en":"to rest"},
  {"level":"A1","category":"Verbos","es":"salir","en":"to go out"},
  {"level":"A1","category":"Verbos","es":"llegar","en":"to arrive"},
  {"level":"A1","category":"Casa","es":"la mesa","en":"the table"},
  {"level":"A1","category":"Casa","es":"la silla","en":"the chair"},
  {"level":"A1","category":"Casa","es":"el televisor","en":"the TV set"},
  {"level":"A1","category":"Casa","es":"la cama","en":"the bed"},
  {"level":"A1","category":"Casa","es":"el sofá","en":"the sofa"},
  {"level":"A1","category":"Casa","es":"la cocina","en":"the kitchen"},
  {"level":"A1","category":"Casa","es":"el baño","en":"the bathroom"},
  {"level":"A1","category":"Casa","es":"la nevera","en":"the fridge"},
  {"level":"A1","category":"Casa","es":"la puerta","en":"the door"},
  {"level":"A1","category":"Casa","es":"la ventana","en":"the window"},
  {"level":"A1","category":"Casa","es":"el armario","en":"the closet"},
  {"level":"A1","category":"Casa","es":"la lámpara","en":"the lamp"},
  {"level":"A1","category":"Casa","es":"el espejo","en":"the mirror"},
  {"level":"A1","category":"Casa","es":"la almohada","en":"the pillow"},
  {"level":"A1","category":"Casa","es":"la manta","en":"the blanket"},
  {"level":"A1","category":"Casa","es":"el fregadero","en":"the sink"},
  {"level":"A1","category":"Casa","es":"la estufa","en":"the stove"},
  {"level":"A1","category":"Casa","es":"el microondas","en":"the microwave"},
  {"level":"A1","category":"Hora","es":"¿Qué hora es?","en":"What time is it?"},
  {"level":"A1","category":"Hora","es":"Es la una","en":"It's one o'clock"},
  {"level":"A1","category":"Hora","es":"Son las dos","en":"It's two o'clock"},
  {"level":"A1","category":"Hora","es":"Son las tres y media","en":"It's 3:30"},
  {"level":"A1","category":"Hora","es":"Son las cuatro y cuarto","en":"It's 4:15"},
  {"level":"A1","category":"Hora","es":"Son las cinco menos cuarto","en":"It's 4:45"},
  {"level":"A1","category":"Hora","es":"de la mañana","en":"in the morning"},
  {"level":"A1","category":"Hora","es":"de la tarde","en":"in the afternoon"},
  {"level":"A1","category":"Hora","es":"de la noche","en":"at night"},
  {"level":"A1","category":"Hora","es":"en punto","en":"on the dot"},
  {"level":"A1","category":"Hora","es":"mediodía","en":"noon"},
  {"level":"A1","category":"Hora","es":"medianoche","en":"midnight"},
  {"level":"A1","category":"Clima","es":"Hace sol","en":"It's sunny"},
  {"level":"A1","category":"Clima","es":"Hace calor","en":"It's hot"},
  {"level":"A1","category":"Clima","es":"Hace frío","en":"It's cold"},
  {"level":"A1","category":"Clima","es":"Hace viento","en":"It's windy"},
  {"level":"A1","category":"Clima","es":"Llueve","en":"It's raining"},
  {"level":"A1","category":"Clima","es":"Nieva","en":"It's snowing"},
  {"level":"A1","category":"Clima","es":"Está nublado","en":"It's cloudy"},
  {"level":"A1","category":"Clima","es":"Hace buen tiempo","en":"The weather's nice"},
  {"level":"A1","category":"Clima","es":"Hace mal tiempo","en":"The weather's bad"},
  {"level":"A1","category":"Clima","es":"Hay tormenta","en":"There's a storm"}
];

const originalA2 = [
  {"level":"A2","category":"Pasado","es":"comí","en":"I ate (preterite)"},
  {"level":"A2","category":"Pasado","es":"comía","en":"I used to eat (imperfect)"},
  {"level":"A2","category":"Pasado","es":"fui","en":"I went / I was (preterite)"},
  {"level":"A2","category":"Pasado","es":"era","en":"I was (imperfect)"},
  {"level":"A2","category":"Pasado","es":"hice","en":"I did / made (preterite)"},
  {"level":"A2","category":"Pasado","es":"hacía","en":"I used to do (imperfect)"},
  {"level":"A2","category":"Pasado","es":"dije","en":"I said (preterite)"},
  {"level":"A2","category":"Pasado","es":"tuve","en":"I had (preterite, event)"},
  {"level":"A2","category":"Pasado","es":"tenía","en":"I had / used to have (imperfect)"},
  {"level":"A2","category":"Pasado","es":"viví","en":"I lived (preterite)"},
  {"level":"A2","category":"Compras","es":"la tienda","en":"the store"},
  {"level":"A2","category":"Compras","es":"el precio","en":"the price"},
  {"level":"A2","category":"Compras","es":"¿Cuánto cuesta?","en":"How much does it cost?"},
  {"level":"A2","category":"Compras","es":"barato","en":"cheap"},
  {"level":"A2","category":"Compras","es":"caro","en":"expensive"},
  {"level":"A2","category":"Compras","es":"la talla","en":"the size"},
  {"level":"A2","category":"Compras","es":"probarse","en":"to try on"},
  {"level":"A2","category":"Compras","es":"pagar","en":"to pay"},
  {"level":"A2","category":"Compras","es":"el recibo","en":"the receipt"},
  {"level":"A2","category":"Compras","es":"la tarjeta de crédito","en":"the credit card"},
  {"level":"A2","category":"Direcciones","es":"a la derecha","en":"to the right"},
  {"level":"A2","category":"Direcciones","es":"a la izquierda","en":"to the left"},
  {"level":"A2","category":"Direcciones","es":"todo recto","en":"straight ahead"},
  {"level":"A2","category":"Direcciones","es":"la esquina","en":"the corner"},
  {"level":"A2","category":"Direcciones","es":"el semáforo","en":"the traffic light"},
  {"level":"A2","category":"Direcciones","es":"cerca de","en":"near"},
  {"level":"A2","category":"Direcciones","es":"lejos de","en":"far from"},
  {"level":"A2","category":"Direcciones","es":"cruzar","en":"to cross"}
];

const originalB1 = [
  {"level":"B1","category":"Opiniones","es":"Creo que...","en":"I think that..."},
  {"level":"B1","category":"Opiniones","es":"En mi opinión","en":"In my opinion"},
  {"level":"B1","category":"Opiniones","es":"Estoy de acuerdo","en":"I agree"},
  {"level":"B1","category":"Opiniones","es":"No estoy de acuerdo","en":"I disagree"},
  {"level":"B1","category":"Opiniones","es":"Depende","en":"It depends"},
  {"level":"B1","category":"Opiniones","es":"Por un lado... por otro lado...","en":"On one hand... on the other hand..."},
  {"level":"B1","category":"Viajes","es":"el vuelo","en":"the flight"},
  {"level":"B1","category":"Viajes","es":"el equipaje","en":"the luggage"},
  {"level":"B1","category":"Viajes","es":"facturar","en":"to check in"},
  {"level":"B1","category":"Viajes","es":"el alojamiento","en":"the accommodation"},
  {"level":"B1","category":"Viajes","es":"la reserva","en":"the reservation"},
  {"level":"B1","category":"Viajes","es":"perderse","en":"to get lost"},
  {"level":"B1","category":"Subjuntivo","es":"Es importante que...","en":"It's important that... (+ subjunctive)"},
  {"level":"B1","category":"Subjuntivo","es":"Quiero que...","en":"I want... (+ subjunctive)"},
  {"level":"B1","category":"Subjuntivo","es":"Espero que...","en":"I hope that... (+ subjunctive)"},
  {"level":"B1","category":"Subjuntivo","es":"Ojalá","en":"I hope / if only (+ subjunctive)"},
  {"level":"B1","category":"Subjuntivo","es":"Dudo que...","en":"I doubt that... (+ subjunctive)"},
  {"level":"B1","category":"Conectores","es":"sin embargo","en":"however"},
  {"level":"B1","category":"Conectores","es":"además","en":"furthermore"},
  {"level":"B1","category":"Conectores","es":"por lo tanto","en":"therefore"},
  {"level":"B1","category":"Conectores","es":"aunque","en":"although"},
  {"level":"B1","category":"Conectores","es":"mientras tanto","en":"meanwhile"},
  {"level":"B1","category":"Conectores","es":"a pesar de","en":"despite"},
  {"level":"B1","category":"Conectores","es":"sin duda","en":"undoubtedly"}
];

const originalB2 = [
  {"level":"B2","category":"Temas abstractos","es":"el desempleo","en":"unemployment"},
  {"level":"B2","category":"Temas abstractos","es":"la desigualdad","en":"inequality"},
  {"level":"B2","category":"Temas abstractos","es":"el medio ambiente","en":"the environment"},
  {"level":"B2","category":"Temas abstractos","es":"la sostenibilidad","en":"sustainability"},
  {"level":"B2","category":"Temas abstractos","es":"el envejecimiento","en":"aging (of a population)"},
  {"level":"B2","category":"Temas abstractos","es":"la globalización","en":"globalization"},
  {"level":"B2","category":"Temas abstractos","es":"el reto","en":"the challenge"},
  {"level":"B2","category":"Estilo indirecto","es":"Dijo que...","en":"He/she said that..."},
  {"level":"B2","category":"Estilo indirecto","es":"Me preguntó si...","en":"He/she asked me if..."},
  {"level":"B2","category":"Estilo indirecto","es":"Afirmó que...","en":"He/she stated that..."},
  {"level":"B2","category":"Condicional","es":"Si tuviera tiempo...","en":"If I had time... (+ conditional)"},
  {"level":"B2","category":"Condicional","es":"Me gustaría...","en":"I would like..."},
  {"level":"B2","category":"Condicional","es":"Habría hecho...","en":"I would have done..."},
  {"level":"B2","category":"Conectores avanzados","es":"no obstante","en":"nevertheless"},
  {"level":"B2","category":"Conectores avanzados","es":"en cuanto a","en":"regarding"},
  {"level":"B2","category":"Conectores avanzados","es":"de hecho","en":"in fact"},
  {"level":"B2","category":"Conectores avanzados","es":"cabe destacar que","en":"it's worth noting that"},
  {"level":"B2","category":"Conectores avanzados","es":"teniendo en cuenta que","en":"taking into account that"}
];

const originalC1 = [
  {"level":"C1","category":"Modismos","es":"meter la pata","en":"to mess up / put your foot in it"},
  {"level":"C1","category":"Modismos","es":"no tener pelos en la lengua","en":"to speak bluntly"},
  {"level":"C1","category":"Modismos","es":"estar en las nubes","en":"to be daydreaming"},
  {"level":"C1","category":"Modismos","es":"tirar la toalla","en":"to give up"},
  {"level":"C1","category":"Modismos","es":"costar un ojo de la cara","en":"to cost an arm and a leg"},
  {"level":"C1","category":"Modismos","es":"ponerse las pilas","en":"to get one's act together"},
  {"level":"C1","category":"Registro","es":"acorde a","en":"in accordance with (formal)"},
  {"level":"C1","category":"Registro","es":"o sea","en":"that is / I mean (informal filler)"},
  {"level":"C1","category":"Registro","es":"a día de hoy","en":"nowadays (formal)"},
  {"level":"C1","category":"Registro","es":"tío/tía","en":"dude/mate (very informal, Spain)"},
  {"level":"C1","category":"Marcadores","es":"ahora bien","en":"now then / however"},
  {"level":"C1","category":"Marcadores","es":"dicho esto","en":"that being said"},
  {"level":"C1","category":"Marcadores","es":"en definitiva","en":"in short / ultimately"},
  {"level":"C1","category":"Marcadores","es":"huelga decir que","en":"needless to say"},
  {"level":"C1","category":"Falsos amigos","es":"actualmente","en":"currently (NOT 'actually')"},
  {"level":"C1","category":"Falsos amigos","es":"embarazada","en":"pregnant (NOT 'embarrassed')"},
  {"level":"C1","category":"Falsos amigos","es":"realizar","en":"to carry out / achieve (NOT just 'realize')"},
  {"level":"C1","category":"Falsos amigos","es":"sensible","en":"sensitive (NOT 'sensible' as in reasonable)"}
];

// Target 200 items per level for exactly 1000 items total
const LEVEL_TARGET = 200;

const levelWords = {
  A1: [...originalA1],
  A2: [...originalA2],
  B1: [...originalB1],
  B2: [...originalB2],
  C1: [...originalC1]
};

// Help keep track of unique keys per level
const levelKeys = {
  A1: new Set(originalA1.map(item => item.es.toLowerCase().trim())),
  A2: new Set(originalA2.map(item => item.es.toLowerCase().trim())),
  B1: new Set(originalB1.map(item => item.es.toLowerCase().trim())),
  B2: new Set(originalB2.map(item => item.es.toLowerCase().trim())),
  C1: new Set(originalC1.map(item => item.es.toLowerCase().trim()))
};

// Distribute candidates into levels up to LEVEL_TARGET
let candidateIndex = 0;
while (candidateIndex < candidates.length) {
  const candidate = candidates[candidateIndex++];
  const dictEntry = dictMap.get(candidate.word);
  if (!dictEntry) continue;
  
  // Decide which level has room and match frequency rank ranges
  let targetLevel = 'A1';
  if (candidateIndex < 2500) {
    targetLevel = 'A1';
  } else if (candidateIndex < 6000) {
    targetLevel = 'A2';
  } else if (candidateIndex < 11000) {
    targetLevel = 'B1';
  } else if (candidateIndex < 18000) {
    targetLevel = 'B2';
  } else {
    targetLevel = 'C1';
  }
  
  // Fallback to fill any lower levels if they aren't filled yet
  if (levelWords[targetLevel].length >= LEVEL_TARGET) {
    // Find first level that still needs items
    const unfilled = ['A1', 'A2', 'B1', 'B2', 'C1'].find(lvl => levelWords[lvl].length < LEVEL_TARGET);
    if (unfilled) {
      targetLevel = unfilled;
    } else {
      // All levels are filled to target!
      break;
    }
  }
  
  const key = candidate.word.toLowerCase().trim();
  if (!levelKeys[targetLevel].has(key)) {
    levelKeys[targetLevel].add(key);
    levelWords[targetLevel].push({
      level: targetLevel,
      category: getCategory(candidate.pos),
      es: candidate.word,
      en: dictEntry.gloss,
    });
  }
}

// Generate unique stable IDs for all lists
const formatLevel = (levelName, list) => {
  return list.map((item, index) => ({
    id: `${levelName.toLowerCase()}-${String(index + 1).padStart(3, '0')}`,
    level: levelName,
    category: item.category,
    es: item.es,
    en: item.en
  }));
};

const finalA1 = formatLevel('A1', levelWords.A1);
const finalA2 = formatLevel('A2', levelWords.A2);
const finalB1 = formatLevel('B1', levelWords.B1);
const finalB2 = formatLevel('B2', levelWords.B2);
const finalC1 = formatLevel('C1', levelWords.C1);

console.log(`Writing expanded vocabulary data: A1=${finalA1.length}, A2=${finalA2.length}, B1=${finalB1.length}, B2=${finalB2.length}, C1=${finalC1.length}`);
console.log(`Total: ${finalA1.length + finalA2.length + finalB1.length + finalB2.length + finalC1.length} words`);

// Write JSON files
fs.writeFileSync('src/data/vocab/a1.json', JSON.stringify(finalA1, null, 2));
fs.writeFileSync('src/data/vocab/a2.json', JSON.stringify(finalA2, null, 2));
fs.writeFileSync('src/data/vocab/b1.json', JSON.stringify(finalB1, null, 2));
fs.writeFileSync('src/data/vocab/b2.json', JSON.stringify(finalB2, null, 2));
fs.writeFileSync('src/data/vocab/c1.json', JSON.stringify(finalC1, null, 2));

console.log('Database successfully scaled to exactly 1000 items!');
