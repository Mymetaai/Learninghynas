import type { Story, StoryLine, StoryVocab, StoryGrammarNote } from '../types/story';

export type { Story, StoryLine, StoryVocab, StoryGrammarNote };
export type LibraryStory = Story;

// Database of 50 progressive Spanish stories from Nursery to Expert (C1) level.
// Each story contains translation, dynamic vocabulary terms, and detailed grammar notes.

export const LIBRARY_STORIES: LibraryStory[] = [
  // ── NURSERY LEVEL (Pre-A1) ──
  // Tier 1: tener / ser + noun + adj
  {
    id: 's1',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'El Perro Alegre',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['perro', 'pequeño', 'alegre'],
    recycled_vocab: [],
    mascot_line: 'That perro pequeño is super cute!',
    word_encounters_seed: ['perro', 'pequeño', 'alegre'],
    description: 'A simple story about a happy dog playing in the park.',
    storyLines: [
      'Tengo un perro pequeño.',
      'El perro es bonito.',
      'Tengo un amigo alegre.'
    ],
    storyTranslations: [
      'I have a small dog.',
      'The dog is pretty.',
      'I have a happy friend.'
    ],
    vocabulary: [
      { word: 'perro', meaning: 'dog', pronunciation: 'PEH-rroh' },
      { word: 'pequeño', meaning: 'small', pronunciation: 'peh-KEH-nyoh' },
      { word: 'alegre', meaning: 'happy', pronunciation: 'ah-LEH-greh' }
    ],
    grammarNotes: [
      { title: 'Tengo y Es (Have & Is)', explanation: 'Use "tengo" for "I have" and "es" for "it is" followed by a noun and adjective.', exampleFromStory: 'Tengo un perro pequeño.' }
    ],
    lines: [
      { text: "Tengo un perro pequeño.", formula: "Tengo (Verb) + un perro pequeño (Object)" },
      { text: "El perro es bonito.", formula: "El perro (Subject) + es (Verb) + bonito (Object)" },
      { text: "Tengo un amigo alegre.", formula: "Tengo (Verb) + un amigo alegre (Object)" }
    ],
    grammar_note: {
      term: "Tengo y Es (Have & Is)",
      translation: "Tengo y Es (Have & Is)",
      explanation: "Use \"tengo\" for \"I have\" and \"es\" for \"it is\" followed by a noun and adjective.",
      example: "Tengo un perro pequeño."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's6',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'Mi Casa Grande',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['casa', 'blanca', 'grande'],
    recycled_vocab: ['pequeño'],
    mascot_line: 'A white and big casa sounds so peaceful!',
    word_encounters_seed: ['casa', 'blanca', 'grande'],
    description: 'Describing a big house with a white door and green garden.',
    storyLines: [
      'Esta es mi casa.',
      'La casa es blanca y grande.',
      'Tengo una mesa pequeña.'
    ],
    storyTranslations: [
      'This is my house.',
      'The house is white and big.',
      'I have a small table.'
    ],
    vocabulary: [
      { word: 'casa', meaning: 'house', pronunciation: 'KAH-sah' },
      { word: 'blanca', meaning: 'white', pronunciation: 'BLAHN-kah' },
      { word: 'grande', meaning: 'big', pronunciation: 'GRAHN-deh' }
    ],
    grammarNotes: [
      { title: 'Ser with Nouns and Adjectives', explanation: 'Use "es" with an adjective matching the noun gender.', exampleFromStory: 'La casa es blanca y grande.' }
    ],
    lines: [
      { text: "Esta es mi casa.", formula: "Esta (Verb) + es mi casa (Object)" },
      { text: "La casa es blanca y grande.", formula: "La casa (Subject) + es (Verb) + blanca y grande (Object)" },
      { text: "Tengo una mesa pequeña.", formula: "Tengo (Verb) + una mesa pequeña (Object)" }
    ],
    grammar_note: {
      term: "Ser with Nouns and Adjectives",
      translation: "Ser with Nouns and Adjectives",
      explanation: "Use \"es\" with an adjective matching the noun gender.",
      example: "La casa es blanca y grande."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's8',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'La Luna y el Sol',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['luna', 'sol', 'bonito'],
    recycled_vocab: ['blanca', 'grande'],
    mascot_line: 'La luna y el sol make the sky magical!',
    word_encounters_seed: ['luna', 'sol', 'bonito'],
    description: 'The white moon and big sun in the sky.',
    storyLines: [
      'La luna es blanca.',
      'El sol es grande.',
      'Tengo un día bonito.'
    ],
    storyTranslations: [
      'The moon is white.',
      'The sun is big.',
      'I have a pretty day.'
    ],
    vocabulary: [
      { word: 'luna', meaning: 'moon', pronunciation: 'LOO-nah' },
      { word: 'sol', meaning: 'sun', pronunciation: 'sol' },
      { word: 'bonito', meaning: 'pretty', pronunciation: 'boh-NEE-toh' }
    ],
    grammarNotes: [
      { title: 'Describing Things with Ser', explanation: 'Use "es" to state inherent properties like colors and sizes.', exampleFromStory: 'La luna es blanca.' }
    ],
    lines: [
      { text: "La luna es blanca.", formula: "La luna (Subject) + es (Verb) + blanca (Object)" },
      { text: "El sol es grande.", formula: "El sol (Subject) + es (Verb) + grande (Object)" },
      { text: "Tengo un día bonito.", formula: "Tengo (Verb) + un día bonito (Object)" }
    ],
    grammar_note: {
      term: "Describing Things with Ser",
      translation: "Describing Things with Ser",
      explanation: "Use \"es\" to state inherent properties like colors and sizes.",
      example: "La luna es blanca."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's51',
    lesson: 9,
    cefr_badge: 'A1',
    title: 'El Libro Rojo',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['libro', 'rojo', 'nuevo'],
    recycled_vocab: ['tengo', 'es', 'grande'],
    mascot_line: 'A red and new book is full of stories!',
    word_encounters_seed: ['libro', 'rojo', 'nuevo'],
    description: 'Describing a new red book on a big desk.',
    storyLines: [
      'Tengo un libro nuevo.',
      'El libro es rojo.',
      'Tengo una mesa grande.'
    ],
    storyTranslations: [
      'I have a new book.',
      'The book is red.',
      'I have a big table.'
    ],
    vocabulary: [
      { word: 'libro', meaning: 'book', pronunciation: 'LEE-broh' },
      { word: 'rojo', meaning: 'red', pronunciation: 'ROH-hoh' },
      { word: 'nuevo', meaning: 'new', pronunciation: 'NWEH-boh' }
    ],
    grammarNotes: [
      { title: 'Tengo y Es (Have & Is)', explanation: 'Use "tengo" for "I have" and "es" for "it is" followed by a noun and adjective.', exampleFromStory: 'Tengo un libro nuevo.' }
    ],
    lines: [
      { text: "Tengo un libro nuevo.", formula: "Tengo (Verb) + un libro nuevo (Object)" },
      { text: "El libro es rojo.", formula: "El (Verb) + libro es rojo (Object)" },
      { text: "Tengo una mesa grande.", formula: "Tengo (Verb) + una mesa grande (Object)" }
    ],
    grammar_note: {
      term: "Tengo y Es (Have & Is)",
      translation: "Tengo y Es (Have & Is)",
      explanation: "Use \"tengo\" for \"I have\" and \"es\" for \"it is\" followed by a noun and adjective.",
      example: "Tengo un libro nuevo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's52',
    lesson: 9,
    cefr_badge: 'A1',
    title: 'La Flor Amarilla',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['flor', 'amarilla', 'linda'],
    recycled_vocab: ['tengo', 'es', 'pequeña'],
    mascot_line: 'Yellow flowers make any room bright!',
    word_encounters_seed: ['flor', 'amarilla', 'linda'],
    description: 'A pretty yellow flower in a small garden.',
    storyLines: [
      'Tengo una flor linda.',
      'La flor es amarilla.',
      'Tengo una casa pequeña.'
    ],
    storyTranslations: [
      'I have a pretty flower.',
      'The flower is yellow.',
      'I have a small house.'
    ],
    vocabulary: [
      { word: 'flor', meaning: 'flower', pronunciation: 'flohr' },
      { word: 'amarilla', meaning: 'yellow', pronunciation: 'ah-mah-REE-lyah' },
      { word: 'linda', meaning: 'pretty', pronunciation: 'LEEN-dah' }
    ],
    grammarNotes: [
      { title: 'Ser with Feminine Adjectives', explanation: 'Adjectives ending in -o change to -a to match feminine nouns like la flor.', exampleFromStory: 'La flor es amarilla.' }
    ],
    lines: [
      { text: "Tengo una flor linda.", formula: "Tengo (Verb) + una flor linda (Object)" },
      { text: "La flor es amarilla.", formula: "La (Verb) + flor es amarilla (Object)" },
      { text: "Tengo una casa pequeña.", formula: "Tengo (Verb) + una casa pequeña (Object)" }
    ],
    grammar_note: {
      term: "Ser with Feminine Adjectives",
      translation: "Ser with Feminine Adjectives",
      explanation: "Adjectives ending in -o change to -a to match feminine nouns like la flor.",
      example: "La flor es amarilla."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's53',
    lesson: 9,
    cefr_badge: 'A1',
    title: 'El Gato Negro',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['negro', 'amigo', 'viejo'],
    recycled_vocab: ['gato', 'tengo', 'es'],
    mascot_line: 'Black cats are so sleek and mysterious!',
    word_encounters_seed: ['negro', 'amigo', 'viejo'],
    description: 'Describing a black cat and an old friend.',
    storyLines: [
      'Tengo un gato negro.',
      'El gato es bonito.',
      'Tengo un amigo viejo.'
    ],
    storyTranslations: [
      'I have a black cat.',
      'The cat is pretty.',
      'I have an old friend.'
    ],
    vocabulary: [
      { word: 'negro', meaning: 'black', pronunciation: 'NEH-groh' },
      { word: 'amigo', meaning: 'friend', pronunciation: 'ah-MEE-goh' },
      { word: 'viejo', meaning: 'old', pronunciation: 'BYEH-hoh' }
    ],
    grammarNotes: [
      { title: 'Tengo + Noun + Adjective', explanation: 'Use "tengo" followed by a noun and its modifying adjective.', exampleFromStory: 'Tengo un gato negro.' }
    ],
    lines: [
      { text: "Tengo un gato negro.", formula: "Tengo (Verb) + un gato negro (Object)" },
      { text: "El gato es bonito.", formula: "El (Verb) + gato es bonito (Object)" },
      { text: "Tengo un amigo viejo.", formula: "Tengo (Verb) + un amigo viejo (Object)" }
    ],
    grammar_note: {
      term: "Tengo + Noun + Adjective",
      translation: "Tengo + Noun + Adjective",
      explanation: "Use \"tengo\" followed by a noun and its modifying adjective.",
      example: "Tengo un gato negro."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's61',
    lesson: 11,
    cefr_badge: 'A1',
    title: 'El Coche Azul',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['coche', 'azul', 'rápido'],
    recycled_vocab: ['tengo', 'es', 'bonito'],
    mascot_line: 'Fast blue cars zooming down the road!',
    word_encounters_seed: ['coche', 'azul', 'rápido'],
    description: 'Describing a fast blue car.',
    storyLines: [
      'Tengo un coche azul.',
      'El coche es rápido.',
      'Tengo un juguete bonito.'
    ],
    storyTranslations: [
      'I have a blue car.',
      'The car is fast.',
      'I have a pretty toy.'
    ],
    vocabulary: [
      { word: 'coche', meaning: 'car', pronunciation: 'KOH-cheh' },
      { word: 'azul', meaning: 'blue', pronunciation: 'ah-THOOL' },
      { word: 'rápido', meaning: 'fast', pronunciation: 'RAH-pee-doh' }
    ],
    grammarNotes: [
      { title: 'Tengo y Es (Have & Is)', explanation: 'Use "tengo" for possession and "es" for describing static qualities.', exampleFromStory: 'Tengo un coche azul.' }
    ],
    lines: [
      { text: "Tengo un coche azul.", formula: "Tengo (Verb) + un coche azul (Object)" },
      { text: "El coche es rápido.", formula: "El (Verb) + coche es rápido (Object)" },
      { text: "Tengo un juguete bonito.", formula: "Tengo (Verb) + un juguete bonito (Object)" }
    ],
    grammar_note: {
      term: "Tengo y Es (Have & Is)",
      translation: "Tengo y Es (Have & Is)",
      explanation: "Use \"tengo\" for possession and \"es\" for describing static qualities.",
      example: "Tengo un coche azul."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's62',
    lesson: 12,
    cefr_badge: 'A1',
    title: 'La Silla Amarilla',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['silla', 'cómoda', 'madera'],
    recycled_vocab: ['amarilla', 'es', 'casa'],
    mascot_line: 'A comfy yellow chair in the living room!',
    word_encounters_seed: ['silla', 'cómoda', 'madera'],
    description: 'A comfortable yellow wooden chair in the house.',
    storyLines: [
      'Esta es mi silla.',
      'La silla es amarilla y cómoda.',
      'Tengo una silla de madera.'
    ],
    storyTranslations: [
      'This is my chair.',
      'The chair is yellow and comfortable.',
      'I have a wooden chair.'
    ],
    vocabulary: [
      { word: 'silla', meaning: 'chair', pronunciation: 'SEE-lyah' },
      { word: 'cómoda', meaning: 'comfortable', pronunciation: 'KOH-moh-dah' },
      { word: 'madera', meaning: 'wood', pronunciation: 'mah-DEH-rah' }
    ],
    grammarNotes: [
      { title: 'Feminine Agreement (Amarilla y Cómoda)', explanation: 'Feminine nouns like la silla take feminine adjectives ending in -a.', exampleFromStory: 'La silla es amarilla y cómoda.' }
    ],
    lines: [
      { text: "Esta es mi silla.", formula: "Esta (Verb) + es mi silla (Object)" },
      { text: "La silla es amarilla y cómoda.", formula: "La (Verb) + silla es amarilla y cómoda (Object)" },
      { text: "Tengo una silla de madera.", formula: "Tengo (Verb) + una silla de madera (Object)" }
    ],
    grammar_note: {
      term: "Feminine Agreement (Amarilla y Cómoda)",
      translation: "Feminine Agreement (Amarilla y Cómoda)",
      explanation: "Feminine nouns like la silla take feminine adjectives ending in -a.",
      example: "La silla es amarilla y cómoda."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's63',
    lesson: 12,
    cefr_badge: 'A1',
    title: 'El Árbol Alto',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['alto', 'fresco', 'parque'],
    recycled_vocab: ['árbol', 'es', 'grande'],
    mascot_line: 'Tall green trees offering fresh shade!',
    word_encounters_seed: ['alto', 'fresco', 'parque'],
    description: 'Describing a tall tree in a fresh park.',
    storyLines: [
      'El árbol es alto.',
      'Tengo un parque fresco.',
      'El árbol es grande.'
    ],
    storyTranslations: [
      'The tree is tall.',
      'I have a fresh park.',
      'The tree is big.'
    ],
    vocabulary: [
      { word: 'alto', meaning: 'tall', pronunciation: 'AHL-toh' },
      { word: 'fresco', meaning: 'fresh/cool', pronunciation: 'FREHS-koh' },
      { word: 'parque', meaning: 'park', pronunciation: 'PAR-keh' }
    ],
    grammarNotes: [
      { title: 'Ser for Physical Qualities', explanation: 'Use "es" to describe permanent traits such as height (alto).', exampleFromStory: 'El árbol es alto.' }
    ],
    lines: [
      { text: "El árbol es alto.", formula: "El (Verb) + árbol es alto (Object)" },
      { text: "Tengo un parque fresco.", formula: "Tengo (Verb) + un parque fresco (Object)" },
      { text: "El árbol es grande.", formula: "El (Verb) + árbol es grande (Object)" }
    ],
    grammar_note: {
      term: "Ser for Physical Qualities",
      translation: "Ser for Physical Qualities",
      explanation: "Use \"es\" to describe permanent traits such as height (alto).",
      example: "El árbol es alto."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's64',
    lesson: 12,
    cefr_badge: 'A1',
    title: 'La Puerta Verde',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['puerta', 'verde', 'limpia'],
    recycled_vocab: ['casa', 'es', 'bonita'],
    mascot_line: 'A clean green door welcoming visitors!',
    word_encounters_seed: ['puerta', 'verde', 'limpia'],
    description: 'Describing a clean green front door.',
    storyLines: [
      'Tengo una puerta verde.',
      'La puerta es limpia.',
      'Es una casa bonita.'
    ],
    storyTranslations: [
      'I have a green door.',
      'The door is clean.',
      'It is a pretty house.'
    ],
    vocabulary: [
      { word: 'puerta', meaning: 'door', pronunciation: 'PWER-tah' },
      { word: 'verde', meaning: 'green', pronunciation: 'BEHR-deh' },
      { word: 'limpia', meaning: 'clean', pronunciation: 'LEEM-pyah' }
    ],
    grammarNotes: [
      { title: 'Gender Invariant Adjectives (Verde)', explanation: 'Adjectives ending in -e like "verde" do not change form between masculine and feminine.', exampleFromStory: 'Tengo una puerta verde.' }
    ],
    lines: [
      { text: "Tengo una puerta verde.", formula: "Tengo (Verb) + una puerta verde (Object)" },
      { text: "La puerta es limpia.", formula: "La (Verb) + puerta es limpia (Object)" },
      { text: "Es una casa bonita.", formula: "Es (Verb) + una casa bonita (Object)" }
    ],
    grammar_note: {
      term: "Gender Invariant Adjectives (Verde)",
      translation: "Gender Invariant Adjectives (Verde)",
      explanation: "Adjectives ending in -e like \"verde\" do not change form between masculine and feminine.",
      example: "Tengo una puerta verde."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's73',
    lesson: 15,
    cefr_badge: 'A1',
    title: 'La Mochila Nueva',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['mochila', 'nueva', 'pesada'],
    recycled_vocab: ['tengo', 'es', 'grande'],
    mascot_line: 'A shiny new backpack for adventures!',
    word_encounters_seed: ['mochila', 'nueva', 'pesada'],
    description: 'Describing a new heavy backpack.',
    storyLines: [
      'Tengo una mochila nueva.',
      'La mochila es grande.',
      'La mochila es pesada.'
    ],
    storyTranslations: [
      'I have a new backpack.',
      'The backpack is big.',
      'The backpack is heavy.'
    ],
    vocabulary: [
      { word: 'mochila', meaning: 'backpack', pronunciation: 'moh-CHEE-lah' },
      { word: 'nueva', meaning: 'new', pronunciation: 'NWEH-bah' },
      { word: 'pesada', meaning: 'heavy', pronunciation: 'peh-SAH-dah' }
    ],
    grammarNotes: [
      { title: 'Feminine Agreement (Nueva, Pesada)', explanation: 'La mochila is feminine, so adjectives become nueva and pesada.', exampleFromStory: 'Tengo una mochila nueva.' }
    ],
    lines: [
      { text: "Tengo una mochila nueva.", formula: "Tengo (Verb) + una mochila nueva (Object)" },
      { text: "La mochila es grande.", formula: "La (Verb) + mochila es grande (Object)" },
      { text: "La mochila es pesada.", formula: "La (Verb) + mochila es pesada (Object)" }
    ],
    grammar_note: {
      term: "Feminine Agreement (Nueva, Pesada)",
      translation: "Feminine Agreement (Nueva, Pesada)",
      explanation: "La mochila is feminine, so adjectives become nueva and pesada.",
      example: "Tengo una mochila nueva."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's74',
    lesson: 15,
    cefr_badge: 'A1',
    title: 'El Zapato Marrón',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['zapato', 'marrón', 'sucio'],
    recycled_vocab: ['tengo', 'es', 'viejo'],
    mascot_line: 'Old brown shoes tell many stories!',
    word_encounters_seed: ['zapato', 'marrón', 'sucio'],
    description: 'Describing old brown dirty shoes.',
    storyLines: [
      'Tengo un zapato marrón.',
      'El zapato es viejo.',
      'El zapato es sucio.'
    ],
    storyTranslations: [
      'I have a brown shoe.',
      'The shoe is old.',
      'The shoe is dirty.'
    ],
    vocabulary: [
      { word: 'zapato', meaning: 'shoe', pronunciation: 'thah-PAH-toh' },
      { word: 'marrón', meaning: 'brown', pronunciation: 'mah-RROHN' },
      { word: 'sucio', meaning: 'dirty', pronunciation: 'SOO-syoh' }
    ],
    grammarNotes: [
      { title: 'Color Adjectives (Marrón)', explanation: 'Marrón does not change form for gender — el zapato marrón, la mesa marrón.', exampleFromStory: 'Tengo un zapato marrón.' }
    ],
    lines: [
      { text: "Tengo un zapato marrón.", formula: "Tengo (Verb) + un zapato marrón (Object)" },
      { text: "El zapato es viejo.", formula: "El (Verb) + zapato es viejo (Object)" },
      { text: "El zapato es sucio.", formula: "El (Verb) + zapato es sucio (Object)" }
    ],
    grammar_note: {
      term: "Color Adjectives (Marrón)",
      translation: "Color Adjectives (Marrón)",
      explanation: "Marrón does not change form for gender — el zapato marrón, la mesa marrón.",
      example: "Tengo un zapato marrón."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's75',
    lesson: 15,
    cefr_badge: 'A1',
    title: 'La Ventana Abierta',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 1,
    new_grammar_point: 'tener / ser + noun + adjective',
    new_vocab: ['ventana', 'abierta', 'viento'],
    recycled_vocab: ['casa', 'es', 'fresco'],
    mascot_line: 'Cool wind blowing through an open window!',
    word_encounters_seed: ['ventana', 'abierta', 'viento'],
    description: 'An open window letting in cool wind.',
    storyLines: [
      'La ventana es grande.',
      'La ventana está abierta.',
      'El viento es fresco.'
    ],
    storyTranslations: [
      'The window is big.',
      'The window is open.',
      'The wind is cool.'
    ],
    vocabulary: [
      { word: 'ventana', meaning: 'window', pronunciation: 'behn-TAH-nah' },
      { word: 'abierta', meaning: 'open', pronunciation: 'ah-BYEHR-tah' },
      { word: 'viento', meaning: 'wind', pronunciation: 'BYEHN-toh' }
    ],
    grammarNotes: [
      { title: 'Está vs Es (State vs Trait)', explanation: 'Está abierta = is open (temporary state), es grande = is big (permanent trait).', exampleFromStory: 'La ventana está abierta.' }
    ],
    lines: [
      { text: "La ventana es grande.", formula: "La (Verb) + ventana es grande (Object)" },
      { text: "La ventana está abierta.", formula: "La (Verb) + ventana está abierta (Object)" },
      { text: "El viento es fresco.", formula: "El (Verb) + viento es fresco (Object)" }
    ],
    grammar_note: {
      term: "Está vs Es (State vs Trait)",
      translation: "Está vs Es (State vs Trait)",
      explanation: "Está abierta = is open (temporary state), es grande = is big (permanent trait).",
      example: "La ventana está abierta."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 2: -ar verb, 3rd person singular
  {
    id: 's2',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'La Manzana Roja',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['manzana', 'camina', 'jardín'],
    recycled_vocab: ['es', 'roja', 'dulce'],
    mascot_line: 'Fresh apples during a garden walk!',
    word_encounters_seed: ['manzana', 'camina', 'jardín'],
    description: 'Enjoying a sweet red apple while walking in the garden.',
    storyLines: [
      'La manzana es roja.',
      'María toma la fruta dulce.',
      'Ella camina en el jardín.'
    ],
    storyTranslations: [
      'The apple is red.',
      'María takes the sweet fruit.',
      'She walks in the garden.'
    ],
    vocabulary: [
      { word: 'manzana', meaning: 'apple', pronunciation: 'mahn-THAH-nah' },
      { word: 'camina', meaning: 'walks', pronunciation: 'kah-MEE-nah' },
      { word: 'jardín', meaning: 'garden', pronunciation: 'har-DEEN' }
    ],
    grammarNotes: [
      { title: '3rd Person -ar Verbs', explanation: '-ar verbs end in -a in the 3rd person singular (camina = walks).', exampleFromStory: 'Ella camina en el jardín.' }
    ],
    lines: [
      { text: "La manzana es roja.", formula: "La (Verb) + manzana es roja (Object)" },
      { text: "María toma la fruta dulce.", formula: "María (Subject) + tom (Verb) + a la fruta dulce (Place)" },
      { text: "Ella camina en el jardín.", formula: "Ella (Subject) + camina (Verb) + en el jardín (Place)" }
    ],
    grammar_note: {
      term: "3rd Person -ar Verbs",
      translation: "3rd Person -ar Verbs",
      explanation: "-ar verbs end in -a in the 3rd person singular (camina = walks).",
      example: "Ella camina en el jardín."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's4',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'El Pájaro Azul',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['pájaro', 'canta', 'árbol'],
    recycled_vocab: ['azul', 'verde', 'casa'],
    mascot_line: 'That pájaro azul has a beautiful singing voice!',
    word_encounters_seed: ['pájaro', 'canta', 'árbol'],
    description: 'A blue bird singing a beautiful song in a green tree.',
    storyLines: [
      'Un pájaro azul canta.',
      'Canta en un árbol verde.',
      'El pájaro vuela en la casa.'
    ],
    storyTranslations: [
      'A blue bird sings.',
      'It sings in a green tree.',
      'The bird flies in the house.'
    ],
    vocabulary: [
      { word: 'pájaro', meaning: 'bird', pronunciation: 'PAH-hah-roh' },
      { word: 'canta', meaning: 'sings', pronunciation: 'KAHN-tah' },
      { word: 'árbol', meaning: 'tree', pronunciation: 'AR-bohl' }
    ],
    grammarNotes: [
      { title: 'Canta (Sings)', explanation: 'Action verbs ending in -a describe what he, she, or it does (canta = he/she/it sings).', exampleFromStory: 'Un pájaro azul canta.' }
    ],
    lines: [
      { text: "Un pájaro azul canta.", formula: "Un (Verb) + pájaro azul canta (Object)" },
      { text: "Canta en un árbol verde.", formula: "Canta (Verb) + en un árbol verde (Object)" },
      { text: "El pájaro vuela en la casa.", formula: "El (Verb) + pájaro vuela (Object) + en la casa (Place)" }
    ],
    grammar_note: {
      term: "Canta (Sings)",
      translation: "Canta (Sings)",
      explanation: "Action verbs ending in -a describe what he, she, or it does (canta = he/she/it sings).",
      example: "Un pájaro azul canta."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's3',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'El Gato Dormilón',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['gato', 'juega', 'pelota'],
    recycled_vocab: ['pequeño', 'camina', 'casa'],
    mascot_line: 'Cats playing with balls never gets old!',
    word_encounters_seed: ['gato', 'juega', 'pelota'],
    description: 'A small cat playing with a ball inside the house.',
    storyLines: [
      'El gato es pequeño.',
      'El gato juega con la pelota.',
      'El gato camina por la casa.'
    ],
    storyTranslations: [
      'The cat is small.',
      'The cat plays with the ball.',
      'The cat walks through the house.'
    ],
    vocabulary: [
      { word: 'gato', meaning: 'cat', pronunciation: 'GAH-toh' },
      { word: 'juega', meaning: 'plays', pronunciation: 'HWEH-gah' },
      { word: 'pelota', meaning: 'ball', pronunciation: 'peh-LOH-tah' }
    ],
    grammarNotes: [
      { title: 'Juega (Plays)', explanation: 'Juega describes a 3rd-person singular subject playing.', exampleFromStory: 'El gato juega con la pelota.' }
    ],
    lines: [
      { text: "El gato es pequeño.", formula: "El (Verb) + gato es pequeño (Object)" },
      { text: "El gato juega con la pelota.", formula: "El (Verb) + gato juega con la pelota (Object)" },
      { text: "El gato camina por la casa.", formula: "El (Verb) + gato camina (Object) + por la casa (Place)" }
    ],
    grammar_note: {
      term: "Juega (Plays)",
      translation: "Juega (Plays)",
      explanation: "Juega describes a 3rd-person singular subject playing.",
      example: "El gato juega con la pelota."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's54',
    lesson: 9,
    cefr_badge: 'A1',
    title: 'La Niña Canta',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['niña', 'canta', 'canción'],
    recycled_vocab: ['casa', 'bonita', 'jardín'],
    mascot_line: 'Singing songs in the garden brings so much joy!',
    word_encounters_seed: ['niña', 'canta', 'canción'],
    description: 'A young girl singing a happy song in the garden.',
    storyLines: [
      'La niña es pequeña.',
      'La niña canta una canción.',
      'Ella camina en el jardín.'
    ],
    storyTranslations: [
      'The girl is small.',
      'The girl sings a song.',
      'She walks in the garden.'
    ],
    vocabulary: [
      { word: 'niña', meaning: 'girl', pronunciation: 'NEE-nyah' },
      { word: 'canta', meaning: 'sings', pronunciation: 'KAHN-tah' },
      { word: 'canción', meaning: 'song', pronunciation: 'kahn-THYOHN' }
    ],
    grammarNotes: [
      { title: '3rd Person Singular -ar Verbs (Canta, Camina)', explanation: '-ar verbs end in -a in the 3rd person singular (canta = he/she sings, camina = he/she walks).', exampleFromStory: 'La niña canta una canción.' }
    ],
    lines: [
      { text: "La niña es pequeña.", formula: "La (Verb) + niña es pequeña (Object)" },
      { text: "La niña canta una canción.", formula: "La (Verb) + niña canta una canción (Object)" },
      { text: "Ella camina en el jardín.", formula: "Ella (Subject) + camina (Verb) + en el jardín (Place)" }
    ],
    grammar_note: {
      term: "3rd Person Singular -ar Verbs (Canta, Camina)",
      translation: "3rd Person Singular -ar Verbs (Canta, Camina)",
      explanation: "-ar verbs end in -a in the 3rd person singular (canta = he/she sings, camina = he/she walks).",
      example: "La niña canta una canción."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's55',
    lesson: 10,
    cefr_badge: 'A1',
    title: 'El Oso Camina',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['oso', 'bosque', 'busca'],
    recycled_vocab: ['grande', 'camina', 'comida'],
    mascot_line: 'Bears walking through green forests searching for honey!',
    word_encounters_seed: ['oso', 'bosque', 'busca'],
    description: 'A big bear walking through the forest looking for food.',
    storyLines: [
      'El oso es grande.',
      'El oso camina por el bosque.',
      'El oso busca comida dulce.'
    ],
    storyTranslations: [
      'The bear is big.',
      'The bear walks through the forest.',
      'The bear searches for sweet food.'
    ],
    vocabulary: [
      { word: 'oso', meaning: 'bear', pronunciation: 'OH-soh' },
      { word: 'bosque', meaning: 'forest', pronunciation: 'BOHS-keh' },
      { word: 'busca', meaning: 'searches/looks for', pronunciation: 'BOOS-kah' }
    ],
    grammarNotes: [
      { title: 'Action Verbs (Camina, Busca)', explanation: 'Verbs ending in -a describe third-person singular actions in present tense.', exampleFromStory: 'El oso busca comida dulce.' }
    ],
    lines: [
      { text: "El oso es grande.", formula: "El (Verb) + oso es grande (Object)" },
      { text: "El oso camina por el bosque.", formula: "El (Verb) + oso camina por el bosque (Object)" },
      { text: "El oso busca comida dulce.", formula: "El (Verb) + oso busca comida dulce (Object)" }
    ],
    grammar_note: {
      term: "Action Verbs (Camina, Busca)",
      translation: "Action Verbs (Camina, Busca)",
      explanation: "Verbs ending in -a describe third-person singular actions in present tense.",
      example: "El oso busca comida dulce."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's56',
    lesson: 10,
    cefr_badge: 'A1',
    title: 'El Niño Baila',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['niño', 'baila', 'música'],
    recycled_vocab: ['alegre', 'casa', 'juega'],
    mascot_line: 'Dancing to happy music at home!',
    word_encounters_seed: ['niño', 'baila', 'música'],
    description: 'A happy boy dancing to music in the house.',
    storyLines: [
      'El niño es alegre.',
      'El niño baila con la música.',
      'Él juega en la casa.'
    ],
    storyTranslations: [
      'The boy is happy.',
      'The boy dances with the music.',
      'He plays in the house.'
    ],
    vocabulary: [
      { word: 'niño', meaning: 'boy', pronunciation: 'NEE-nyoh' },
      { word: 'baila', meaning: 'dances', pronunciation: 'BYE-lah' },
      { word: 'música', meaning: 'music', pronunciation: 'MOO-see-kah' }
    ],
    grammarNotes: [
      { title: '3rd Person Verb Endings (Baila)', explanation: 'Regular -ar verbs conjugate to -a for third-person singular subjects (Él baila).', exampleFromStory: 'El niño baila con la música.' }
    ],
    lines: [
      { text: "El niño es alegre.", formula: "El (Verb) + niño es alegre (Object)" },
      { text: "El niño baila con la música.", formula: "El (Verb) + niño baila con la música (Object)" },
      { text: "Él juega en la casa.", formula: "Él (Subject) + juega (Verb) + en la casa (Place)" }
    ],
    grammar_note: {
      term: "3rd Person Verb Endings (Baila)",
      translation: "3rd Person Verb Endings (Baila)",
      explanation: "Regular -ar verbs conjugate to -a for third-person singular subjects (Él baila).",
      example: "El niño baila con la música."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's65',
    lesson: 12,
    cefr_badge: 'A1',
    title: 'El Gato Salta',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['salta', 'cama', 'suave'],
    recycled_vocab: ['gato', 'pequeño', 'casa'],
    mascot_line: 'Cats jumping onto soft beds for a afternoon nap!',
    word_encounters_seed: ['salta', 'cama', 'suave'],
    description: 'A small cat jumping onto a soft bed.',
    storyLines: [
      'El gato es pequeño.',
      'El gato salta en la cama.',
      'La cama es suave.'
    ],
    storyTranslations: [
      'The cat is small.',
      'The cat jumps on the bed.',
      'The bed is soft.'
    ],
    vocabulary: [
      { word: 'salta', meaning: 'jumps', pronunciation: 'SAHL-tah' },
      { word: 'cama', meaning: 'bed', pronunciation: 'KAH-mah' },
      { word: 'suave', meaning: 'soft', pronunciation: 'SWAH-beh' }
    ],
    grammarNotes: [
      { title: '3rd Person Singular Verb (Salta)', explanation: 'Regular -ar verb saltar conjugates to salta for third-person singular subjects.', exampleFromStory: 'El gato salta en la cama.' }
    ],
    lines: [
      { text: "El gato es pequeño.", formula: "El (Verb) + gato es pequeño (Object)" },
      { text: "El gato salta en la cama.", formula: "El (Verb) + gato salta (Object) + en la cama (Place)" },
      { text: "La cama es suave.", formula: "La (Verb) + cama es suave (Object)" }
    ],
    grammar_note: {
      term: "3rd Person Singular Verb (Salta)",
      translation: "3rd Person Singular Verb (Salta)",
      explanation: "Regular -ar verb saltar conjugates to salta for third-person singular subjects.",
      example: "El gato salta en la cama."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's66',
    lesson: 13,
    cefr_badge: 'A1',
    title: 'La Madre Cocina',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['madre', 'cocina', 'sopa'],
    recycled_vocab: ['comida', 'sabrosa', 'casa'],
    mascot_line: 'Delicious soup cooking in the kitchen!',
    word_encounters_seed: ['madre', 'cocina', 'sopa'],
    description: 'A mother cooking tasty soup in the kitchen.',
    storyLines: [
      'La madre está en la casa.',
      'Ella cocina una sopa rica.',
      'La sopa es caliente.'
    ],
    storyTranslations: [
      'The mother is in the house.',
      'She cooks a tasty soup.',
      'The soup is hot.'
    ],
    vocabulary: [
      { word: 'madre', meaning: 'mother', pronunciation: 'MAH-dreh' },
      { word: 'cocina', meaning: 'cooks', pronunciation: 'koh-SEE-nah' },
      { word: 'sopa', meaning: 'soup', pronunciation: 'SOH-pah' }
    ],
    grammarNotes: [
      { title: 'Action Verb Cocina', explanation: 'Cocinar becomes cocina when describing actions by "ella" or "la madre".', exampleFromStory: 'Ella cocina una sopa rica.' }
    ],
    lines: [
      { text: "La madre está en la casa.", formula: "La (Verb) + madre está (Object) + en la casa (Place)" },
      { text: "Ella cocina una sopa rica.", formula: "Ella (Subject) + cocina (Verb) + una sopa rica (Object)" },
      { text: "La sopa es caliente.", formula: "La (Verb) + sopa es caliente (Object)" }
    ],
    grammar_note: {
      term: "Action Verb Cocina",
      translation: "Action Verb Cocina",
      explanation: "Cocinar becomes cocina when describing actions by \"ella\" or \"la madre\".",
      example: "Ella cocina una sopa rica."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's67',
    lesson: 13,
    cefr_badge: 'A1',
    title: 'El Padre Trabaja',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['padre', 'trabaja', 'oficina'],
    recycled_vocab: ['día', 'grande', 'camina'],
    mascot_line: 'Working hard at a big office desk!',
    word_encounters_seed: ['padre', 'trabaja', 'oficina'],
    description: 'A father working at the office all day.',
    storyLines: [
      'El padre camina a la oficina.',
      'Él trabaja todo el día.',
      'La oficina es grande.'
    ],
    storyTranslations: [
      'The father walks to the office.',
      'He works all day.',
      'The office is big.'
    ],
    vocabulary: [
      { word: 'padre', meaning: 'father', pronunciation: 'PAH-dreh' },
      { word: 'trabaja', meaning: 'works', pronunciation: 'trah-BAH-hah' },
      { word: 'oficina', meaning: 'office', pronunciation: 'oh-fee-SEE-nah' }
    ],
    grammarNotes: [
      { title: '3rd Person Verb Trabaja', explanation: 'Trabajar conjugates to trabaja for third-person singular subjects (él/padre).', exampleFromStory: 'Él trabaja todo el día.' }
    ],
    lines: [
      { text: "El padre camina a la oficina.", formula: "El (Verb) + padre camina (Object) + a la oficina (Place)" },
      { text: "Él trabaja todo el día.", formula: "Él (Subject) + trabaja (Verb) + todo el día (Object)" },
      { text: "La oficina es grande.", formula: "La (Verb) + oficina es grande (Object)" }
    ],
    grammar_note: {
      term: "3rd Person Verb Trabaja",
      translation: "3rd Person Verb Trabaja",
      explanation: "Trabajar conjugates to trabaja for third-person singular subjects (él/padre).",
      example: "Él trabaja todo el día."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's68',
    lesson: 13,
    cefr_badge: 'A1',
    title: 'La Niña Dibuja',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['dibuja', 'papel', 'sol'],
    recycled_vocab: ['niña', 'amarillo', 'bonito'],
    mascot_line: 'Drawing colorful suns on white paper!',
    word_encounters_seed: ['dibuja', 'papel', 'sol'],
    description: 'A young girl drawing a bright sun on paper.',
    storyLines: [
      'La niña dibuja un sol.',
      'Dibuja en un papel blanco.',
      'El dibujo es bonito.'
    ],
    storyTranslations: [
      'The girl draws a sun.',
      'She draws on white paper.',
      'The drawing is pretty.'
    ],
    vocabulary: [
      { word: 'dibuja', meaning: 'draws', pronunciation: 'dee-BOO-hah' },
      { word: 'papel', meaning: 'paper', pronunciation: 'pah-PEHL' },
      { word: 'sol', meaning: 'sun', pronunciation: 'sol' }
    ],
    grammarNotes: [
      { title: 'Dibujar Conjugation (Dibuja)', explanation: 'Dibujar becomes dibuja in 3rd person singular present tense.', exampleFromStory: 'La niña dibuja un sol.' }
    ],
    lines: [
      { text: "La niña dibuja un sol.", formula: "La (Verb) + niña dibuja un sol (Object)" },
      { text: "Dibuja en un papel blanco.", formula: "Dibuja (Verb) + en un papel blanco (Object)" },
      { text: "El dibujo es bonito.", formula: "El (Verb) + dibujo es bonito (Object)" }
    ],
    grammar_note: {
      term: "Dibujar Conjugation (Dibuja)",
      translation: "Dibujar Conjugation (Dibuja)",
      explanation: "Dibujar becomes dibuja in 3rd person singular present tense.",
      example: "La niña dibuja un sol."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's76',
    lesson: 15,
    cefr_badge: 'A1',
    title: 'El Abuelo Descansa',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['abuelo', 'descansa', 'sofá'],
    recycled_vocab: ['casa', 'grande', 'día'],
    mascot_line: 'Grandpa resting on a cozy sofa after a long day!',
    word_encounters_seed: ['abuelo', 'descansa', 'sofá'],
    description: 'Grandfather resting on the sofa at home.',
    storyLines: [
      'El abuelo descansa en el sofá.',
      'El sofá es grande.',
      'El abuelo descansa todo el día.'
    ],
    storyTranslations: [
      'Grandpa rests on the sofa.',
      'The sofa is big.',
      'Grandpa rests all day.'
    ],
    vocabulary: [
      { word: 'abuelo', meaning: 'grandfather', pronunciation: 'ah-BWEH-loh' },
      { word: 'descansa', meaning: 'rests', pronunciation: 'dehs-KAHN-sah' },
      { word: 'sofá', meaning: 'sofa', pronunciation: 'soh-FAH' }
    ],
    grammarNotes: [
      { title: 'Descansar Conjugation', explanation: 'Descansar becomes descansa in 3rd person singular present tense.', exampleFromStory: 'El abuelo descansa en el sofá.' }
    ],
    lines: [
      { text: "El abuelo descansa en el sofá.", formula: "El (Verb) + abuelo descansa (Object) + en el sofá (Place)" },
      { text: "El sofá es grande.", formula: "El (Verb) + sofá es grande (Object)" },
      { text: "El abuelo descansa todo el día.", formula: "El (Verb) + abuelo descansa todo el día (Object)" }
    ],
    grammar_note: {
      term: "Descansar Conjugation",
      translation: "Descansar Conjugation",
      explanation: "Descansar becomes descansa in 3rd person singular present tense.",
      example: "El abuelo descansa en el sofá."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's77',
    lesson: 16,
    cefr_badge: 'A1',
    title: 'La Abuela Planta',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['abuela', 'planta', 'tomate'],
    recycled_vocab: ['jardín', 'roja', 'bonita'],
    mascot_line: 'Grandma planting red tomatoes in the garden!',
    word_encounters_seed: ['abuela', 'planta', 'tomate'],
    description: 'Grandmother planting tomatoes in the garden.',
    storyLines: [
      'La abuela planta en el jardín.',
      'Ella planta un tomate.',
      'La planta es bonita.'
    ],
    storyTranslations: [
      'Grandma plants in the garden.',
      'She plants a tomato.',
      'The plant is pretty.'
    ],
    vocabulary: [
      { word: 'abuela', meaning: 'grandmother', pronunciation: 'ah-BWEH-lah' },
      { word: 'planta', meaning: 'plants', pronunciation: 'PLAHN-tah' },
      { word: 'tomate', meaning: 'tomato', pronunciation: 'toh-MAH-teh' }
    ],
    grammarNotes: [
      { title: 'Plantar Conjugation', explanation: 'Plantar becomes planta for third-person singular subjects.', exampleFromStory: 'La abuela planta en el jardín.' }
    ],
    lines: [
      { text: "La abuela planta en el jardín.", formula: "La (Verb) + abuela planta (Object) + en el jardín (Place)" },
      { text: "Ella planta un tomate.", formula: "Ella (Subject) + planta (Verb) + un tomate (Object)" },
      { text: "La planta es bonita.", formula: "La (Verb) + planta es bonita (Object)" }
    ],
    grammar_note: {
      term: "Plantar Conjugation",
      translation: "Plantar Conjugation",
      explanation: "Plantar becomes planta for third-person singular subjects.",
      example: "La abuela planta en el jardín."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's78',
    lesson: 16,
    cefr_badge: 'A1',
    title: 'El Bebé Llora',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 2,
    new_grammar_point: '-ar verb, 3rd person singular',
    new_vocab: ['bebé', 'llora', 'hambre'],
    recycled_vocab: ['leche', 'madre', 'pequeño'],
    mascot_line: 'A hungry baby crying for warm milk!',
    word_encounters_seed: ['bebé', 'llora', 'hambre'],
    description: 'A small baby crying because it is hungry.',
    storyLines: [
      'El bebé es pequeño.',
      'El bebé llora.',
      'El bebé tiene hambre.'
    ],
    storyTranslations: [
      'The baby is small.',
      'The baby cries.',
      'The baby is hungry.'
    ],
    vocabulary: [
      { word: 'bebé', meaning: 'baby', pronunciation: 'beh-BEH' },
      { word: 'llora', meaning: 'cries', pronunciation: 'LYOH-rah' },
      { word: 'hambre', meaning: 'hunger', pronunciation: 'AHM-breh' }
    ],
    grammarNotes: [
      { title: 'Llorar Conjugation', explanation: 'Llorar becomes llora for third-person singular subjects.', exampleFromStory: 'El bebé llora.' }
    ],
    lines: [
      { text: "El bebé es pequeño.", formula: "El (Verb) + bebé es pequeño (Object)" },
      { text: "El bebé llora.", formula: "El (Verb) + bebé llora (Object)" },
      { text: "El bebé tiene hambre.", formula: "El (Verb) + bebé tiene hambre (Object)" }
    ],
    grammar_note: {
      term: "Llorar Conjugation",
      translation: "Llorar Conjugation",
      explanation: "Llorar becomes llora for third-person singular subjects.",
      example: "El bebé llora."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 3: Adjective agreement + gustar intro
  {
    id: 's5',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'La Mariposa Bonita',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['mariposa', 'gusta', 'flor'],
    recycled_vocab: ['bonita', 'grande', 'amarilla'],
    mascot_line: 'Butterflies loving yellow flowers!',
    word_encounters_seed: ['mariposa', 'gusta', 'flor'],
    description: 'A beautiful butterfly that likes yellow flowers.',
    storyLines: [
      'La mariposa es bonita.',
      'Le gusta la flor amarilla.',
      'Le gustan las flores grandes y amarillas.'
    ],
    storyTranslations: [
      'The butterfly is pretty.',
      'It likes the yellow flower.',
      'It likes big, yellow flowers.'
    ],
    vocabulary: [
      { word: 'mariposa', meaning: 'butterfly', pronunciation: 'mah-ree-POH-sah' },
      { word: 'gusta', meaning: 'likes', pronunciation: 'GOOS-tah' },
      { word: 'flor', meaning: 'flower', pronunciation: 'flohr' }
    ],
    grammarNotes: [
      { title: 'Gustan with Plural Nouns', explanation: 'Use "le gusta" for singular nouns (la flor) and "le gustan" for plural nouns (las flores).', exampleFromStory: 'Le gustan las flores grandes y amarillas.' }
    ],
    lines: [
      { text: "La mariposa es bonita.", formula: "La (Verb) + mariposa es bonita (Object)" },
      { text: "Le gusta la flor amarilla.", formula: "Le (Verb) + gust (Object) + a la flor amarilla (Place)" },
      { text: "Le gustan las flores grandes y amarillas.", formula: "Le (Verb) + gustan las flores grandes y amarillas (Object)" }
    ],
    grammar_note: {
      term: "Gustan with Plural Nouns",
      translation: "Gustan with Plural Nouns",
      explanation: "Use \"le gusta\" for singular nouns (la flor) and \"le gustan\" for plural nouns (las flores).",
      example: "Le gustan las flores grandes y amarillas."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's7',
    lesson: 1,
    cefr_badge: 'Pre-A1',
    title: 'El Pez Pequeño',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['pez', 'agua', 'fría'],
    recycled_vocab: ['pequeño', 'gusta', 'grande'],
    mascot_line: 'Swimming in clean cold water looks refreshing!',
    word_encounters_seed: ['pez', 'agua', 'fría'],
    description: 'A small fish swimming in cold water.',
    storyLines: [
      'Un pez pequeño nada en el agua.',
      'Al pez le gusta el agua fría.',
      'Le gustan los ríos grandes y limpios.'
    ],
    storyTranslations: [
      'A small fish swims in the water.',
      'The fish likes the cold water.',
      'It likes big, clean rivers.'
    ],
    vocabulary: [
      { word: 'pez', meaning: 'fish', pronunciation: 'peth' },
      { word: 'agua', meaning: 'water', pronunciation: 'AH-gwah' },
      { word: 'fría', meaning: 'cold', pronunciation: 'FREE-ah' }
    ],
    grammarNotes: [
      { title: 'Al Pez Le Gusta (The Fish Likes)', explanation: 'In Spanish, "al pez le gusta" literally means "the water is pleasing to the fish".', exampleFromStory: 'Al pez le gusta el agua fría.' }
    ],
    lines: [
      { text: "Un pez pequeño nada en el agua.", formula: "Un (Verb) + pez pequeño nada (Object) + en el agua (Place)" },
      { text: "Al pez le gusta el agua fría.", formula: "Al pez le gusta el agua fría (Place)" },
      { text: "Le gustan los ríos grandes y limpios.", formula: "Le (Verb) + gustan los ríos grandes y limpios (Object)" }
    ],
    grammar_note: {
      term: "Al Pez Le Gusta (The Fish Likes)",
      translation: "Al Pez Le Gusta (The Fish Likes)",
      explanation: "In Spanish, \"al pez le gusta\" literally means \"the water is pleasing to the fish\".",
      example: "Al pez le gusta el agua fría."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's10',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'El Perro y la Pelota',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['mañana'],
    recycled_vocab: ['perro', 'grande', 'gusta', 'pelota', 'roja', 'bonita'],
    mascot_line: 'Pretty mornings with a happy dog!',
    word_encounters_seed: ['mañana', 'perro', 'pelota'],
    description: 'A dog enjoying the red ball on a pretty morning.',
    storyLines: [
      'Me gusta mi perro grande.',
      'A mi perro le gusta la pelota roja.',
      'Nos gustan las mañanas bonitas.'
    ],
    storyTranslations: [
      'I like my big dog.',
      'My dog likes the red ball.',
      'We like pretty mornings.'
    ],
    vocabulary: [
      { word: 'mañana', meaning: 'morning', pronunciation: 'mah-NYAH-nah' },
      { word: 'perro', meaning: 'dog', pronunciation: 'PEH-rroh' },
      { word: 'pelota', meaning: 'ball', pronunciation: 'peh-LOH-tah' }
    ],
    grammarNotes: [
      { title: 'Me Gusta vs Nos Gustan', explanation: 'Me gusta = I like; Nos gustan = We like (with plural noun).', exampleFromStory: 'Nos gustan las mañanas bonitas.' }
    ],
    lines: [
      { text: "Me gusta mi perro grande.", formula: "Me (Verb) + gusta mi perro grande (Object)" },
      { text: "A mi perro le gusta la pelota roja.", formula: "A (Verb) + mi perro le gust (Object) + a la pelota roja (Place)" },
      { text: "Nos gustan las mañanas bonitas.", formula: "Nos (Verb) + gustan las mañanas bonitas (Object)" }
    ],
    grammar_note: {
      term: "Me Gusta vs Nos Gustan",
      translation: "Me Gusta vs Nos Gustan",
      explanation: "Me gusta = I like; Nos gustan = We like (with plural noun).",
      example: "Nos gustan las mañanas bonitas."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's57',
    lesson: 10,
    cefr_badge: 'A1',
    title: 'El Perro y la Comida',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['comida', 'carne', 'sabrosa'],
    recycled_vocab: ['perro', 'gusta', 'grande'],
    mascot_line: 'Dogs loving tasty meat treats!',
    word_encounters_seed: ['comida', 'carne', 'sabrosa'],
    description: 'A big dog enjoying tasty meat.',
    storyLines: [
      'Al perro le gusta la comida.',
      'Le gusta la carne sabrosa.',
      'Le gustan las frutas dulces.'
    ],
    storyTranslations: [
      'The dog likes the food.',
      'It likes tasty meat.',
      'It likes sweet fruits.'
    ],
    vocabulary: [
      { word: 'comida', meaning: 'food', pronunciation: 'koh-MEE-dah' },
      { word: 'carne', meaning: 'meat', pronunciation: 'KAR-neh' },
      { word: 'sabrosa', meaning: 'tasty', pronunciation: 'sah-BROH-sah' }
    ],
    grammarNotes: [
      { title: 'Al Perro Le Gusta (The Dog Likes)', explanation: 'Structure: Al [noun] le gusta + singular noun / le gustan + plural noun.', exampleFromStory: 'Al perro le gusta la comida.' }
    ],
    lines: [
      { text: "Al perro le gusta la comida.", formula: "Al (Verb) + perro le gust (Object) + a la comida (Place)" },
      { text: "Le gusta la carne sabrosa.", formula: "Le (Verb) + gust (Object) + a la carne sabrosa (Place)" },
      { text: "Le gustan las frutas dulces.", formula: "Le (Verb) + gustan las frutas dulces (Object)" }
    ],
    grammar_note: {
      term: "Al Perro Le Gusta (The Dog Likes)",
      translation: "Al Perro Le Gusta (The Dog Likes)",
      explanation: "Structure: Al [noun] le gusta + singular noun / le gustan + plural noun.",
      example: "Al perro le gusta la comida."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's58',
    lesson: 10,
    cefr_badge: 'A1',
    title: 'La Gata y la Leche',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['gata', 'leche', 'blanca'],
    recycled_vocab: ['gusta', 'fresca', 'pequeña'],
    mascot_line: 'Cats drinking fresh white milk!',
    word_encounters_seed: ['gata', 'leche', 'blanca'],
    description: 'A small female cat that likes fresh white milk.',
    storyLines: [
      'A la gata le gusta la leche.',
      'Le gusta la leche blanca y fresca.',
      'Le gustan los platos pequeños.'
    ],
    storyTranslations: [
      'The cat likes milk.',
      'She likes fresh white milk.',
      'She likes small bowls.'
    ],
    vocabulary: [
      { word: 'gata', meaning: 'female cat', pronunciation: 'GAH-tah' },
      { word: 'leche', meaning: 'milk', pronunciation: 'LEH-cheh' },
      { word: 'blanca', meaning: 'white', pronunciation: 'BLAHN-kah' }
    ],
    grammarNotes: [
      { title: 'Gustan with Plural Objects', explanation: 'Use "le gustan" when the liked items are plural (los platos pequeños).', exampleFromStory: 'Le gustan los platos pequeños.' }
    ],
    lines: [
      { text: "A la gata le gusta la leche.", formula: "A la gata le gusta la leche (Place)" },
      { text: "Le gusta la leche blanca y fresca.", formula: "Le (Verb) + gust (Object) + a la leche blanca y fresca (Place)" },
      { text: "Le gustan los platos pequeños.", formula: "Le (Verb) + gustan los platos pequeños (Object)" }
    ],
    grammar_note: {
      term: "Gustan with Plural Objects",
      translation: "Gustan with Plural Objects",
      explanation: "Use \"le gustan\" when the liked items are plural (los platos pequeños).",
      example: "Le gustan los platos pequeños."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's59',
    lesson: 11,
    cefr_badge: 'A1',
    title: 'El Sol de la Tarde',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['calor', 'tarde', 'brillante'],
    recycled_vocab: ['sol', 'gusta', 'día'],
    mascot_line: 'Warm bright sunshine in the afternoon!',
    word_encounters_seed: ['calor', 'tarde', 'brillante'],
    description: 'Enjoying bright sun heat in the afternoon.',
    storyLines: [
      'Nos gusta el sol brillante.',
      'Al niño le gusta el calor de la tarde.',
      'Le gustan los días calurosos.'
    ],
    storyTranslations: [
      'We like the bright sun.',
      'The boy likes the afternoon warmth.',
      'He likes warm days.'
    ],
    vocabulary: [
      { word: 'calor', meaning: 'heat/warmth', pronunciation: 'kah-LOHR' },
      { word: 'tarde', meaning: 'afternoon', pronunciation: 'TAR-deh' },
      { word: 'brillante', meaning: 'bright', pronunciation: 'bree-LYAHN-teh' }
    ],
    grammarNotes: [
      { title: 'Nos Gusta vs Le Gusta', explanation: 'Nos gusta = We like; Al niño le gusta = The boy likes.', exampleFromStory: 'Al niño le gusta el calor de la tarde.' }
    ],
    lines: [
      { text: "Nos gusta el sol brillante.", formula: "Nos (Verb) + gusta el sol brillante (Object)" },
      { text: "Al niño le gusta el calor de la tarde.", formula: "Al niño le gusta el calor de la (Place) + tarde (Time)" },
      { text: "Le gustan los días calurosos.", formula: "Le (Verb) + gustan los días calurosos (Object)" }
    ],
    grammar_note: {
      term: "Nos Gusta vs Le Gusta",
      translation: "Nos Gusta vs Le Gusta",
      explanation: "Nos gusta = We like; Al niño le gusta = The boy likes.",
      example: "Al niño le gusta el calor de la tarde."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's60',
    lesson: 11,
    cefr_badge: 'A1',
    title: 'Las Aves del Jardín',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['aves', 'árboles', 'verdes'],
    recycled_vocab: ['canta', 'gusta', 'jardín'],
    mascot_line: 'Birds singing in green trees!',
    word_encounters_seed: ['aves', 'árboles', 'verdes'],
    description: 'Birds that like green trees in a peaceful garden.',
    storyLines: [
      'A las aves les gustan los árboles verdes.',
      'Les gusta cantar en la mañana.',
      'Les gustan las flores hermosas.'
    ],
    storyTranslations: [
      'Birds like green trees.',
      'They like to sing in the morning.',
      'They like beautiful flowers.'
    ],
    vocabulary: [
      { word: 'aves', meaning: 'birds', pronunciation: 'AH-behs' },
      { word: 'árboles', meaning: 'trees', pronunciation: 'AR-boh-lehs' },
      { word: 'verdes', meaning: 'green', pronunciation: 'BEHR-dehs' }
    ],
    grammarNotes: [
      { title: 'Plural Subject + Gustar (A las aves les gustan)', explanation: 'Plural indirect subject ("a las aves") uses "les gustan" for plural liked objects ("los árboles").', exampleFromStory: 'A las aves les gustan los árboles verdes.' }
    ],
    lines: [
      { text: "A las aves les gustan los árboles verdes.", formula: "A (Verb) + las aves les gustan los árboles verdes (Object)" },
      { text: "Les gusta cantar en la mañana.", formula: "Les (Verb) + gusta cantar en la (Object) + mañana (Time)" },
      { text: "Les gustan las flores hermosas.", formula: "Les (Verb) + gustan las flores hermosas (Object)" }
    ],
    grammar_note: {
      term: "Plural Subject + Gustar (A las aves les gustan)",
      translation: "Plural Subject + Gustar (A las aves les gustan)",
      explanation: "Plural indirect subject (\"a las aves\") uses \"les gustan\" for plural liked objects (\"los árboles\").",
      example: "A las aves les gustan los árboles verdes."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's69',
    lesson: 14,
    cefr_badge: 'A1',
    title: 'El Conejo y las Zanahorias',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['conejo', 'zanahorias', 'anaranjadas'],
    recycled_vocab: ['gusta', 'dulces', 'jardín'],
    mascot_line: 'Rabbits munching on sweet orange carrots!',
    word_encounters_seed: ['conejo', 'zanahorias', 'anaranjadas'],
    description: 'A white rabbit that loves sweet orange carrots in the garden.',
    storyLines: [
      'Al conejo le gusta el jardín.',
      'Le gustan las zanahorias anaranjadas.',
      'Las zanahorias son dulces.'
    ],
    storyTranslations: [
      'The rabbit likes the garden.',
      'He likes orange carrots.',
      'Carrots are sweet.'
    ],
    vocabulary: [
      { word: 'conejo', meaning: 'rabbit', pronunciation: 'koh-NEH-hoh' },
      { word: 'zanahorias', meaning: 'carrots', pronunciation: 'thah-nah-OH-ryahs' },
      { word: 'anaranjadas', meaning: 'orange', pronunciation: 'ah-nah-rahn-HAH-dahs' }
    ],
    grammarNotes: [
      { title: 'Plural Adjective Agreement (Zanahorias Anaranjadas)', explanation: 'Feminine plural noun zanahorias requires feminine plural adjective anaranjadas.', exampleFromStory: 'Le gustan las zanahorias anaranjadas.' }
    ],
    lines: [
      { text: "Al conejo le gusta el jardín.", formula: "Al conejo le gusta el jardín (Place)" },
      { text: "Le gustan las zanahorias anaranjadas.", formula: "Le (Verb) + gustan las zanahorias anaranjadas (Object)" },
      { text: "Las zanahorias son dulces.", formula: "Las (Verb) + zanahorias son dulces (Object)" }
    ],
    grammar_note: {
      term: "Plural Adjective Agreement (Zanahorias Anaranjadas)",
      translation: "Plural Adjective Agreement (Zanahorias Anaranjadas)",
      explanation: "Feminine plural noun zanahorias requires feminine plural adjective anaranjadas.",
      example: "Le gustan las zanahorias anaranjadas."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's70',
    lesson: 14,
    cefr_badge: 'A1',
    title: 'El Ratón y el Queso',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['ratón', 'queso', 'amarillo'],
    recycled_vocab: ['gusta', 'pequeño', 'sabroso'],
    mascot_line: 'Tiny mice sniffing tasty yellow cheese!',
    word_encounters_seed: ['ratón', 'queso', 'amarillo'],
    description: 'A small mouse that likes tasty yellow cheese.',
    storyLines: [
      'El ratón es pequeño.',
      'Al ratón le gusta el queso amarillo.',
      'El queso es sabroso.'
    ],
    storyTranslations: [
      'The mouse is small.',
      'The mouse likes yellow cheese.',
      'The cheese is tasty.'
    ],
    vocabulary: [
      { word: 'ratón', meaning: 'mouse', pronunciation: 'rah-TOHN' },
      { word: 'queso', meaning: 'cheese', pronunciation: 'KEH-soh' },
      { word: 'amarillo', meaning: 'yellow', pronunciation: 'ah-mah-REE-lyoh' }
    ],
    grammarNotes: [
      { title: 'Al Ratón Le Gusta', explanation: 'Use "al [singular noun] le gusta" to state what an animal or person likes.', exampleFromStory: 'Al ratón le gusta el queso amarillo.' }
    ],
    lines: [
      { text: "El ratón es pequeño.", formula: "El (Verb) + ratón es pequeño (Object)" },
      { text: "Al ratón le gusta el queso amarillo.", formula: "Al ratón le gusta el queso amarillo (Place)" },
      { text: "El queso es sabroso.", formula: "El (Verb) + queso es sabroso (Object)" }
    ],
    grammar_note: {
      term: "Al Ratón Le Gusta",
      translation: "Al Ratón Le Gusta",
      explanation: "Use \"al [singular noun] le gusta\" to state what an animal or person likes.",
      example: "Al ratón le gusta el queso amarillo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's71',
    lesson: 14,
    cefr_badge: 'A1',
    title: 'La Niña y el Helado',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['helado', 'frío', 'chocolate'],
    recycled_vocab: ['niña', 'gusta', 'dulce'],
    mascot_line: 'Cold chocolate ice cream on a sunny summer day!',
    word_encounters_seed: ['helado', 'frío', 'chocolate'],
    description: 'A young girl who likes cold chocolate ice cream.',
    storyLines: [
      'A la niña le gusta el helado.',
      'Le gusta el helado de chocolate.',
      'El helado es frío y dulce.'
    ],
    storyTranslations: [
      'The girl likes ice cream.',
      'She likes chocolate ice cream.',
      'The ice cream is cold and sweet.'
    ],
    vocabulary: [
      { word: 'helado', meaning: 'ice cream', pronunciation: 'eh-LAH-doh' },
      { word: 'frío', meaning: 'cold', pronunciation: 'FREE-oh' },
      { word: 'chocolate', meaning: 'chocolate', pronunciation: 'choh-koh-LAH-teh' }
    ],
    grammarNotes: [
      { title: 'A La Niña Le Gusta', explanation: 'Structure "A la [noun] le gusta" clarifies who receives pleasure from the item.', exampleFromStory: 'A la niña le gusta el helado.' }
    ],
    lines: [
      { text: "A la niña le gusta el helado.", formula: "A la niña le gusta el helado (Place)" },
      { text: "Le gusta el helado de chocolate.", formula: "Le (Verb) + gusta el helado de chocolate (Object)" },
      { text: "El helado es frío y dulce.", formula: "El (Verb) + helado es frío y dulce (Object)" }
    ],
    grammar_note: {
      term: "A La Niña Le Gusta",
      translation: "A La Niña Le Gusta",
      explanation: "Structure \"A la [noun] le gusta\" clarifies who receives pleasure from the item.",
      example: "A la niña le gusta el helado."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's72',
    lesson: 14,
    cefr_badge: 'A1',
    title: 'Los Niños y la Playa',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['playa', 'arena', 'cálida'],
    recycled_vocab: ['niños', 'les gusta', 'mar'],
    mascot_line: 'Playing in warm sand at the ocean beach!',
    word_encounters_seed: ['playa', 'arena', 'cálida'],
    description: 'Children who love the warm sand at the beach.',
    storyLines: [
      'A los niños les gusta la playa.',
      'Les gusta la arena cálida.',
      'Les gustan las olas del mar.'
    ],
    storyTranslations: [
      'Children like the beach.',
      'They like the warm sand.',
      'They like the ocean waves.'
    ],
    vocabulary: [
      { word: 'playa', meaning: 'beach', pronunciation: 'PLY-ah' },
      { word: 'arena', meaning: 'sand', pronunciation: 'ah-REH-nah' },
      { word: 'cálida', meaning: 'warm', pronunciation: 'KAH-lee-dah' }
    ],
    grammarNotes: [
      { title: 'A los Niños Les Gusta', explanation: 'Plural indirect subject ("a los niños") uses "les gusta" for singular nouns (la playa, la arena).', exampleFromStory: 'A los niños les gusta la playa.' }
    ],
    lines: [
      { text: "A los niños les gusta la playa.", formula: "A (Verb) + los niños les gust (Object) + a la playa (Place)" },
      { text: "Les gusta la arena cálida.", formula: "Les (Verb) + gust (Object) + a la arena cálida (Place)" },
      { text: "Les gustan las olas del mar.", formula: "Les (Verb) + gustan las olas del mar (Object)" }
    ],
    grammar_note: {
      term: "A los Niños Les Gusta",
      translation: "A los Niños Les Gusta",
      explanation: "Plural indirect subject (\"a los niños\") uses \"les gusta\" for singular nouns (la playa, la arena).",
      example: "A los niños les gusta la playa."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's79',
    lesson: 16,
    cefr_badge: 'A1',
    title: 'El Pato y el Lago',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['pato', 'lago', 'tranquilo'],
    recycled_vocab: ['gusta', 'agua', 'limpia'],
    mascot_line: 'Ducks gliding across a peaceful lake!',
    word_encounters_seed: ['pato', 'lago', 'tranquilo'],
    description: 'A duck that likes a calm, quiet lake.',
    storyLines: [
      'Al pato le gusta el lago.',
      'El lago es tranquilo.',
      'Le gusta el agua limpia.'
    ],
    storyTranslations: [
      'The duck likes the lake.',
      'The lake is calm.',
      'It likes clean water.'
    ],
    vocabulary: [
      { word: 'pato', meaning: 'duck', pronunciation: 'PAH-toh' },
      { word: 'lago', meaning: 'lake', pronunciation: 'LAH-goh' },
      { word: 'tranquilo', meaning: 'calm/quiet', pronunciation: 'trahn-KEE-loh' }
    ],
    grammarNotes: [
      { title: 'Masculine Adjective Agreement (Tranquilo)', explanation: 'El lago is masculine, so the adjective takes the -o ending.', exampleFromStory: 'El lago es tranquilo.' }
    ],
    lines: [
      { text: "Al pato le gusta el lago.", formula: "Al pato le gusta el lago (Place)" },
      { text: "El lago es tranquilo.", formula: "El (Verb) + lago es tranquilo (Object)" },
      { text: "Le gusta el agua limpia.", formula: "Le (Verb) + gusta el agua limpia (Object)" }
    ],
    grammar_note: {
      term: "Masculine Adjective Agreement (Tranquilo)",
      translation: "Masculine Adjective Agreement (Tranquilo)",
      explanation: "El lago is masculine, so the adjective takes the -o ending.",
      example: "El lago es tranquilo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's80',
    lesson: 16,
    cefr_badge: 'A1',
    title: 'La Familia y la Cena',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    tier: 3,
    new_grammar_point: 'adjective agreement + gustar intro',
    new_vocab: ['familia', 'cena', 'juntos'],
    recycled_vocab: ['gusta', 'comida', 'caliente'],
    mascot_line: 'Family dinners together are the best!',
    word_encounters_seed: ['familia', 'cena', 'juntos'],
    description: 'A family enjoying a warm dinner together.',
    storyLines: [
      'A la familia le gusta la cena.',
      'Les gusta comer juntos.',
      'La comida es caliente.'
    ],
    storyTranslations: [
      'The family likes dinner.',
      'They like to eat together.',
      'The food is hot.'
    ],
    vocabulary: [
      { word: 'familia', meaning: 'family', pronunciation: 'fah-MEE-lyah' },
      { word: 'cena', meaning: 'dinner', pronunciation: 'SEH-nah' },
      { word: 'juntos', meaning: 'together', pronunciation: 'HOON-tohs' }
    ],
    grammarNotes: [
      { title: 'Collective Subject (A la Familia)', explanation: 'Even though familia is singular, we use les gusta for the implied plural group.', exampleFromStory: 'Les gusta comer juntos.' }
    ],
    lines: [
      { text: "A la familia le gusta la cena.", formula: "A la familia le gusta la cena (Place)" },
      { text: "Les gusta comer juntos.", formula: "Les (Verb) + gusta comer juntos (Object)" },
      { text: "La comida es caliente.", formula: "La (Verb) + comida es caliente (Object)" }
    ],
    grammar_note: {
      term: "Collective Subject (A la Familia)",
      translation: "Collective Subject (A la Familia)",
      explanation: "Even though familia is singular, we use les gusta for the implied plural group.",
      example: "Les gusta comer juntos."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // ── A1 LEVEL ──
  // Tier 1: regular present -ar/-er/-ir, yo/tú/él/nosotros
  {
    id: 's9',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'Una Taza de Café',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['café', 'leche', 'azúcar'],
    recycled_vocab: ['quiero', 'con', 'por favor'],
    mascot_line: 'Fresh coffee with milk is the best morning start!',
    word_encounters_seed: ['café', 'leche', 'azúcar'],
    description: 'Ordering a coffee and pastry at a local Spanish cafe.',
    storyLines: [
      'Buenos días. Quiero un café con leche, por favor.',
      '¿Lo quiere con azúcar o con miel, señor?',
      'Con un poco de azúcar y un cruasán caliente. Gracias.'
    ],
    storyTranslations: [
      'Good morning. I would like a coffee with milk, please.',
      'Would you like it with sugar or with honey, sir?',
      'With a little sugar and a hot croissant. Thank you.'
    ],
    vocabulary: [
      { word: 'café', meaning: 'coffee', pronunciation: 'kah-FEH' },
      { word: 'leche', meaning: 'milk', pronunciation: 'LEH-cheh' },
      { word: 'azúcar', meaning: 'sugar', pronunciation: 'ah-THOO-kar' }
    ],
    grammarNotes: [
      { title: 'Quiero (I want)', explanation: 'First-person singular of "querer" (to want), commonly used to order food politely.', exampleFromStory: 'Quiero un café con leche, por favor.' }
    ],
    lines: [
      { text: "Buenos días. Quiero un café con leche, por favor.", formula: "Buenos (Verb) + días. Quiero un café con leche, por favor (Object)" },
      { text: "¿Lo quiere con azúcar o con miel, señor?", formula: "¿Lo (Verb) + quiere con azúcar o con miel, señor? (Object)" },
      { text: "Con un poco de azúcar y un cruasán caliente. Gracias.", formula: "Con (Verb) + un poco de azúcar y un cruasán caliente. Gracias (Object)" }
    ],
    grammar_note: {
      term: "Quiero (I want)",
      translation: "Quiero (I want)",
      explanation: "First-person singular of \"querer\" (to want), commonly used to order food politely.",
      example: "Quiero un café con leche, por favor."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's10_a1',
    title: 'El Desayuno con Amigos',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['desayuno', 'tostadas', 'aceite'],
    recycled_vocab: ['amigos', 'plaza', 'día'],
    mascot_line: 'Having breakfast with friends at the plaza!',
    word_encounters_seed: ['desayuno', 'tostadas', 'aceite'],
    description: 'Meeting friends for breakfast at the square.',
    storyLines: [
      'Hoy desayuno con mis amigos en la plaza.',
      'Comemos tostadas con tomate y aceite.',
      'Hablamos de nuestros planes para el día.'
    ],
    storyTranslations: [
      'Today I have breakfast with my friends in the plaza.',
      'We eat toast with tomato and oil.',
      'We talk about our plans for the day.'
    ],
    vocabulary: [
      { word: 'desayuno', meaning: 'breakfast', pronunciation: 'deh-sah-YOO-noh' },
      { word: 'tostadas', meaning: 'toast', pronunciation: 'tohs-TAH-dahs' },
      { word: 'aceite', meaning: 'oil', pronunciation: 'ah-THEY-teh' }
    ],
    grammarNotes: [
      { title: 'Con (With)', explanation: 'Preposition indicating accompaniment or combination.', exampleFromStory: 'Comemos tostadas con tomate y aceite.' }
    ]
  },
  {
    id: 's12',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'La Clase de Español',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['clase', 'verbos', 'compañeros'],
    recycled_vocab: ['español', 'hablo', 'días'],
    mascot_line: 'Spanish class is where the magic happens!',
    word_encounters_seed: ['clase', 'verbos', 'compañeros'],
    description: 'Studying verbs and talking to classmates in Spanish class.',
    storyLines: [
      'Mi clase de español empieza a las nueve.',
      'Estudiamos verbos difíciles todos los días.',
      'Hablo español con mis compañeros de clase.'
    ],
    storyTranslations: [
      'My Spanish class starts at nine.',
      'We study difficult verbs every day.',
      'I speak Spanish with my classmates.'
    ],
    vocabulary: [
      { word: 'clase', meaning: 'class', pronunciation: 'KLAH-seh' },
      { word: 'verbos', meaning: 'verbs', pronunciation: 'BEHR-bohs' },
      { word: 'compañeros', meaning: 'classmates/companions', pronunciation: 'kom-pah-NYEH-rohs' }
    ],
    grammarNotes: [
      { title: 'A las (At)', explanation: 'Used to specify a time of day in Spanish.', exampleFromStory: 'Mi clase de español empieza a las nueve.' }
    ],
    lines: [
      { text: "Mi clase de español empieza a las nueve.", formula: "Mi (Verb) + clase de español empieza a las nueve (Object)" },
      { text: "Estudiamos verbos difíciles todos los días.", formula: "Estudiamos (Verb) + verbos difíciles todos los días (Object)" },
      { text: "Hablo español con mis compañeros de clase.", formula: "Hablo (Verb) + español con mis compañeros de clase (Object)" }
    ],
    grammar_note: {
      term: "A las (At)",
      translation: "A las (At)",
      explanation: "Used to specify a time of day in Spanish.",
      example: "Mi clase de español empieza a las nueve."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's81',
    lesson: 17,
    cefr_badge: 'A2',
    title: 'La Carta para Mamá',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['carta', 'escribo', 'bonitas'],
    recycled_vocab: ['mamá', 'día', 'palabras'],
    mascot_line: 'Writing sweet letters to Mom is always a good idea!',
    word_encounters_seed: ['carta', 'escribo', 'bonitas'],
    description: 'Writing a letter with beautiful words for Mom.',
    storyLines: [
      'Yo escribo una carta para mamá.',
      'Escribo palabras bonitas.',
      'Mamá lee la carta todos los días.'
    ],
    storyTranslations: [
      'I write a letter for Mom.',
      'I write beautiful words.',
      'Mom reads the letter every day.'
    ],
    vocabulary: [
      { word: 'carta', meaning: 'letter', pronunciation: 'KAR-tah' },
      { word: 'escribo', meaning: 'I write', pronunciation: 'ehs-KREE-boh' },
      { word: 'bonitas', meaning: 'beautiful', pronunciation: 'boh-NEE-tahs' }
    ],
    grammarNotes: [
      { title: 'Yo Escribo (I Write)', explanation: 'Escribir conjugates to escribo in first person singular.', exampleFromStory: 'Yo escribo una carta para mamá.' }
    ],
    lines: [
      { text: "Yo escribo una carta para mamá.", formula: "Yo (Subject) + escribo (Verb) + una carta para mamá (Object)" },
      { text: "Escribo palabras bonitas.", formula: "Escribo (Verb) + palabras bonitas (Object)" },
      { text: "Mamá lee la carta todos los días.", formula: "Mamá (Verb) + lee la carta todos los días (Object)" }
    ],
    grammar_note: {
      term: "Yo Escribo (I Write)",
      translation: "Yo Escribo (I Write)",
      explanation: "Escribir conjugates to escribo in first person singular.",
      example: "Yo escribo una carta para mamá."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's82',
    lesson: 17,
    cefr_badge: 'A2',
    title: 'El Mercado del Pueblo',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['mercado', 'compro', 'vendedor'],
    recycled_vocab: ['frutas', 'frescas', 'mañana'],
    mascot_line: 'Fresh fruits from the village market every morning!',
    word_encounters_seed: ['mercado', 'compro', 'vendedor'],
    description: 'Buying fresh fruits at the village market.',
    storyLines: [
      'Cada mañana voy al mercado.',
      'Compro frutas frescas del vendedor.',
      'El vendedor vende naranjas y manzanas.'
    ],
    storyTranslations: [
      'Every morning I go to the market.',
      'I buy fresh fruits from the vendor.',
      'The vendor sells oranges and apples.'
    ],
    vocabulary: [
      { word: 'mercado', meaning: 'market', pronunciation: 'mehr-KAH-doh' },
      { word: 'compro', meaning: 'I buy', pronunciation: 'KOHM-proh' },
      { word: 'vendedor', meaning: 'vendor', pronunciation: 'behn-deh-DOHR' }
    ],
    grammarNotes: [
      { title: 'Yo Compro vs Él Vende', explanation: 'First person -ar: compro; third person -er: vende.', exampleFromStory: 'Compro frutas frescas del vendedor.' }
    ],
    lines: [
      { text: "Cada mañana voy al mercado.", formula: "Cada (Verb) + voy (Object) + al mercado (Place) + mañana (Time)" },
      { text: "Compro frutas frescas del vendedor.", formula: "Compro (Verb) + frutas frescas del vendedor (Object)" },
      { text: "El vendedor vende naranjas y manzanas.", formula: "El (Verb) + vendedor vende naranjas y manzanas (Object)" }
    ],
    grammar_note: {
      term: "Yo Compro vs Él Vende",
      translation: "Yo Compro vs Él Vende",
      explanation: "First person -ar: compro; third person -er: vende.",
      example: "Compro frutas frescas del vendedor."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's83',
    lesson: 17,
    cefr_badge: 'A2',
    title: 'La Música en Casa',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['guitarra', 'toco', 'canciones'],
    recycled_vocab: ['música', 'casa', 'noche'],
    mascot_line: 'Playing guitar songs at home in the evening!',
    word_encounters_seed: ['guitarra', 'toco', 'canciones'],
    description: 'Playing guitar and singing songs at home.',
    storyLines: [
      'Por la noche toco la guitarra en casa.',
      'Toco canciones bonitas.',
      'Mi hermana canta las canciones conmigo.'
    ],
    storyTranslations: [
      'In the evening I play the guitar at home.',
      'I play beautiful songs.',
      'My sister sings the songs with me.'
    ],
    vocabulary: [
      { word: 'guitarra', meaning: 'guitar', pronunciation: 'gee-TAH-rrah' },
      { word: 'toco', meaning: 'I play (instrument)', pronunciation: 'TOH-koh' },
      { word: 'canciones', meaning: 'songs', pronunciation: 'kahn-THYOH-nehs' }
    ],
    grammarNotes: [
      { title: 'Tocar Conjugation (Toco/Canta)', explanation: 'Yo toco = I play; ella canta = she sings. Different subjects, different endings.', exampleFromStory: 'Por la noche toco la guitarra en casa.' }
    ],
    lines: [
      { text: "Por la noche toco la guitarra en casa.", formula: "Por (Verb) + la noche toco la guitarra (Object) + en casa (Place)" },
      { text: "Toco canciones bonitas.", formula: "Toco (Verb) + canciones bonitas (Object)" },
      { text: "Mi hermana canta las canciones conmigo.", formula: "Mi (Verb) + hermana canta las canciones conmigo (Object)" }
    ],
    grammar_note: {
      term: "Tocar Conjugation (Toco/Canta)",
      translation: "Tocar Conjugation (Toco/Canta)",
      explanation: "Yo toco = I play; ella canta = she sings. Different subjects, different endings.",
      example: "Por la noche toco la guitarra en casa."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's84',
    lesson: 17,
    cefr_badge: 'A2',
    title: 'El Parque por la Tarde',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['corremos', 'jugamos', 'banco'],
    recycled_vocab: ['parque', 'tarde', 'amigos'],
    mascot_line: 'Running and playing in the park with friends!',
    word_encounters_seed: ['corremos', 'jugamos', 'banco'],
    description: 'Running and playing with friends in the park.',
    storyLines: [
      'Por la tarde vamos al parque.',
      'Corremos y jugamos con nuestros amigos.',
      'Descansamos en un banco grande.'
    ],
    storyTranslations: [
      'In the afternoon we go to the park.',
      'We run and play with our friends.',
      'We rest on a big bench.'
    ],
    vocabulary: [
      { word: 'corremos', meaning: 'we run', pronunciation: 'koh-RREH-mohs' },
      { word: 'jugamos', meaning: 'we play', pronunciation: 'hoo-GAH-mohs' },
      { word: 'banco', meaning: 'bench', pronunciation: 'BAHN-koh' }
    ],
    grammarNotes: [
      { title: 'Nosotros Form (-emos/-amos)', explanation: 'Nosotros conjugation: corremos (we run), jugamos (we play).', exampleFromStory: 'Corremos y jugamos con nuestros amigos.' }
    ],
    lines: [
      { text: "Por la tarde vamos al parque.", formula: "Por (Verb) + la  vamos (Object) + al parque (Place) + tarde (Time)" },
      { text: "Corremos y jugamos con nuestros amigos.", formula: "Corremos (Verb) + y jugamos con nuestros amigos (Object)" },
      { text: "Descansamos en un banco grande.", formula: "Descansamos (Verb) + en un banco grande (Object)" }
    ],
    grammar_note: {
      term: "Nosotros Form (-emos/-amos)",
      translation: "Nosotros Form (-emos/-amos)",
      explanation: "Nosotros conjugation: corremos (we run), jugamos (we play).",
      example: "Corremos y jugamos con nuestros amigos."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's85',
    lesson: 18,
    cefr_badge: 'A2',
    title: 'La Cena de Viernes',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['viernes', 'cenamos', 'pizza'],
    recycled_vocab: ['familia', 'cena', 'juntos'],
    mascot_line: 'Friday night family pizza dinners are the best!',
    word_encounters_seed: ['viernes', 'cenamos', 'pizza'],
    description: 'Family eating pizza together on Friday night.',
    storyLines: [
      'Los viernes cenamos juntos en familia.',
      'Comemos pizza y bebemos zumo.',
      'Mi padre cocina la pizza en casa.'
    ],
    storyTranslations: [
      'On Fridays we dine together as a family.',
      'We eat pizza and drink juice.',
      'My father cooks the pizza at home.'
    ],
    vocabulary: [
      { word: 'viernes', meaning: 'Friday', pronunciation: 'BYEHR-nehs' },
      { word: 'cenamos', meaning: 'we dine', pronunciation: 'seh-NAH-mohs' },
      { word: 'pizza', meaning: 'pizza', pronunciation: 'PEE-thah' }
    ],
    grammarNotes: [
      { title: 'Nosotros Cenamos', explanation: 'Cenar conjugates to cenamos in nosotros form (we dine).', exampleFromStory: 'Los viernes cenamos juntos en familia.' }
    ],
    lines: [
      { text: "Los viernes cenamos juntos en familia.", formula: "Los (Verb) + viernes cenamos juntos en familia (Object)" },
      { text: "Comemos pizza y bebemos zumo.", formula: "Comemos (Verb) + pizza y bebemos zumo (Object)" },
      { text: "Mi padre cocina la pizza en casa.", formula: "Mi (Verb) + padre cocina la pizza (Object) + en casa (Place)" }
    ],
    grammar_note: {
      term: "Nosotros Cenamos",
      translation: "Nosotros Cenamos",
      explanation: "Cenar conjugates to cenamos in nosotros form (we dine).",
      example: "Los viernes cenamos juntos en familia."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's86',
    lesson: 18,
    cefr_badge: 'A2',
    title: 'El Estudiante Nuevo',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['estudiante', 'aprendo', 'profesor'],
    recycled_vocab: ['clase', 'español', 'habla'],
    mascot_line: 'A new student learning Spanish from a great teacher!',
    word_encounters_seed: ['estudiante', 'aprendo', 'profesor'],
    description: 'A new student learning Spanish in class.',
    storyLines: [
      'Soy un estudiante nuevo.',
      'Aprendo español en la clase.',
      'El profesor habla despacio.'
    ],
    storyTranslations: [
      'I am a new student.',
      'I learn Spanish in class.',
      'The teacher speaks slowly.'
    ],
    vocabulary: [
      { word: 'estudiante', meaning: 'student', pronunciation: 'ehs-too-DYAHN-teh' },
      { word: 'aprendo', meaning: 'I learn', pronunciation: 'ah-PREHN-doh' },
      { word: 'profesor', meaning: 'teacher', pronunciation: 'proh-feh-SOHR' }
    ],
    grammarNotes: [
      { title: 'Aprender Conjugation (Aprendo)', explanation: 'Regular -er verb: yo aprendo, él/ella aprende.', exampleFromStory: 'Aprendo español en la clase.' }
    ],
    lines: [
      { text: "Soy un estudiante nuevo.", formula: "Soy (Verb) + un estudiante nuevo (Object)" },
      { text: "Aprendo español en la clase.", formula: "Aprendo (Verb) + español (Object) + en la clase (Place)" },
      { text: "El profesor habla despacio.", formula: "El profesor (Subject) + habla (Verb) + despacio (Object)" }
    ],
    grammar_note: {
      term: "Aprender Conjugation (Aprendo)",
      translation: "Aprender Conjugation (Aprendo)",
      explanation: "Regular -er verb: yo aprendo, él/ella aprende.",
      example: "Aprendo español en la clase."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's87',
    lesson: 18,
    cefr_badge: 'A2',
    title: 'El Correo Electrónico',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['correo', 'envío', 'recibo'],
    recycled_vocab: ['amigo', 'escribo', 'día'],
    mascot_line: 'Sending and receiving emails to stay connected!',
    word_encounters_seed: ['correo', 'envío', 'recibo'],
    description: 'Sending and receiving emails from friends.',
    storyLines: [
      'Cada día envío un correo a mi amigo.',
      'Él recibe el correo por la mañana.',
      'Recibo una respuesta por la tarde.'
    ],
    storyTranslations: [
      'Every day I send an email to my friend.',
      'He receives the email in the morning.',
      'I receive a reply in the afternoon.'
    ],
    vocabulary: [
      { word: 'correo', meaning: 'email/mail', pronunciation: 'koh-RREH-oh' },
      { word: 'envío', meaning: 'I send', pronunciation: 'ehn-BEE-oh' },
      { word: 'recibo', meaning: 'I receive', pronunciation: 'rreh-THEE-boh' }
    ],
    grammarNotes: [
      { title: 'Enviar vs Recibir', explanation: 'Envío = I send (-iar verb); recibo = I receive (-ir verb). Both first person.', exampleFromStory: 'Cada día envío un correo a mi amigo.' }
    ],
    lines: [
      { text: "Cada día envío un correo a mi amigo.", formula: "envío (Verb) + un correo a mi amigo (Object) + cada día (Time)" },
      { text: "Él recibe el correo por la mañana.", formula: "Él (Subject) + recibe (Verb) + el correo por la (Object) + mañana (Time)" },
      { text: "Recibo una respuesta por la tarde.", formula: "Recibo (Verb) + una respuesta por la (Object) + tarde (Time)" }
    ],
    grammar_note: {
      term: "Enviar vs Recibir",
      translation: "Enviar vs Recibir",
      explanation: "Envío = I send (-iar verb); recibo = I receive (-ir verb). Both first person.",
      example: "Cada día envío un correo a mi amigo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's88',
    lesson: 18,
    cefr_badge: 'A2',
    title: 'La Biblioteca Silenciosa',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 1,
    new_grammar_point: 'regular present, -ar/-er/-ir, yo/tú/él',
    new_vocab: ['biblioteca', 'leo', 'silencio'],
    recycled_vocab: ['libro', 'grande', 'mesa'],
    mascot_line: 'Reading quietly in the big library!',
    word_encounters_seed: ['biblioteca', 'leo', 'silencio'],
    description: 'Reading books quietly in the library.',
    storyLines: [
      'Voy a la biblioteca por la tarde.',
      'Leo un libro grande en la mesa.',
      'Hay mucho silencio en la biblioteca.'
    ],
    storyTranslations: [
      'I go to the library in the afternoon.',
      'I read a big book at the table.',
      'There is a lot of silence in the library.'
    ],
    vocabulary: [
      { word: 'biblioteca', meaning: 'library', pronunciation: 'bee-blyoh-TEH-kah' },
      { word: 'leo', meaning: 'I read', pronunciation: 'LEH-oh' },
      { word: 'silencio', meaning: 'silence', pronunciation: 'see-LEHN-thyoh' }
    ],
    grammarNotes: [
      { title: 'Leer Conjugation (Leo)', explanation: 'Leer (to read) conjugates to leo in first person singular.', exampleFromStory: 'Leo un libro grande en la mesa.' }
    ],
    lines: [
      { text: "Voy a la biblioteca por la tarde.", formula: "Voy (Verb) + a la biblioteca por la (Place) + tarde (Time)" },
      { text: "Leo un libro grande en la mesa.", formula: "Leo (Verb) + un libro grande (Object) + en la mesa (Place)" },
      { text: "Hay mucho silencio en la biblioteca.", formula: "Hay (Verb) + mucho silencio (Object) + en la biblioteca (Place)" }
    ],
    grammar_note: {
      term: "Leer Conjugation (Leo)",
      translation: "Leer Conjugation (Leo)",
      explanation: "Leer (to read) conjugates to leo in first person singular.",
      example: "Leo un libro grande en la mesa."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 2: hay + prepositions of place
  {
    id: 's11',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'El Supermercado',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['tarde', 'naranjas', 'euros'],
    recycled_vocab: ['supermercado', 'comprar', 'leche'],
    mascot_line: 'Supermarket trips are great for practicing food words!',
    word_encounters_seed: ['tarde', 'naranjas', 'euros'],
    description: 'Buying fresh fruit and milk at the neighborhood store.',
    storyLines: [
      'Voy al supermercado por la tarde.',
      'Hay muchas naranjas, plátanos y leche.',
      'Pago diez euros en la caja.'
    ],
    storyTranslations: [
      'I go to the supermarket in the afternoon.',
      'There are many oranges, bananas, and milk.',
      'I pay ten euros at the register.'
    ],
    vocabulary: [
      { word: 'tarde', meaning: 'afternoon', pronunciation: 'TAR-deh' },
      { word: 'naranjas', meaning: 'oranges', pronunciation: 'nah-RAHN-hahs' },
      { word: 'euros', meaning: 'euros', pronunciation: 'EW-rohs' }
    ],
    grammarNotes: [
      { title: 'Hay (There is / There are)', explanation: 'Used to state the presence or existence of items.', exampleFromStory: 'Hay muchas naranjas, plátanos y leche.' }
    ],
    lines: [
      { text: "Voy al supermercado por la tarde.", formula: "Voy (Verb) + al supermercado por la (Place) + tarde (Time)" },
      { text: "Hay muchas naranjas, plátanos y leche.", formula: "Hay (Verb) + muchas naranjas, plátanos y leche (Object)" },
      { text: "Pago diez euros en la caja.", formula: "Pago (Verb) + diez euros (Object) + en la caja (Place)" }
    ],
    grammar_note: {
      term: "Hay (There is / There are)",
      translation: "Hay (There is / There are)",
      explanation: "Used to state the presence or existence of items.",
      example: "Hay muchas naranjas, plátanos y leche."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's16',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'La Ropa Nueva',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['invierno', 'chaqueta', 'tienda'],
    recycled_vocab: ['frío', 'comprar', 'azul'],
    mascot_line: 'A warm wool jacket for cold winter days!',
    word_encounters_seed: ['invierno', 'chaqueta', 'tienda'],
    description: 'Shopping for a warm jacket for the cold winter weather.',
    storyLines: [
      'El invierno está muy frío este año.',
      'Hay una chaqueta de lana en la tienda.',
      'Busco una chaqueta azul en la tienda.'
    ],
    storyTranslations: [
      'The winter is very cold this year.',
      'There is a wool jacket in the shop.',
      'I look for a blue jacket in the shop.'
    ],
    vocabulary: [
      { word: 'invierno', meaning: 'winter', pronunciation: 'een-BYEHR-noh' },
      { word: 'chaqueta', meaning: 'jacket', pronunciation: 'chah-KEH-tah' },
      { word: 'tienda', meaning: 'store', pronunciation: 'TYEHN-dah' }
    ],
    grammarNotes: [
      { title: 'Prepositions of Place (En la tienda)', explanation: 'Preposition "en" means "in" or "at" a place.', exampleFromStory: 'Hay una chaqueta de lana en la tienda.' }
    ],
    lines: [
      { text: "El invierno está muy frío este año.", formula: "El (Verb) + invierno está muy frío (Object) + este año (Time)" },
      { text: "Hay una chaqueta de lana en la tienda.", formula: "Hay (Verb) + una chaqueta de lana (Object) + en la tienda (Place)" },
      { text: "Busco una chaqueta azul en la tienda.", formula: "Busco (Verb) + una chaqueta azul (Object) + en la tienda (Place)" }
    ],
    grammar_note: {
      term: "Prepositions of Place (En la tienda)",
      translation: "Prepositions of Place (En la tienda)",
      explanation: "Preposition \"en\" means \"in\" or \"at\" a place.",
      example: "Hay una chaqueta de lana en la tienda."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's89',
    lesson: 19,
    cefr_badge: 'A2',
    title: 'El Parque de la Ciudad',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['fuente', 'cerca', 'detrás'],
    recycled_vocab: ['parque', 'árboles', 'banco'],
    mascot_line: 'A fountain near the trees in the city park!',
    word_encounters_seed: ['fuente', 'cerca', 'detrás'],
    description: 'Describing locations of things in the city park.',
    storyLines: [
      'Hay una fuente grande en el parque.',
      'Hay bancos cerca de los árboles.',
      'Detrás de la fuente hay flores rojas.'
    ],
    storyTranslations: [
      'There is a big fountain in the park.',
      'There are benches near the trees.',
      'Behind the fountain there are red flowers.'
    ],
    vocabulary: [
      { word: 'fuente', meaning: 'fountain', pronunciation: 'FWEHN-teh' },
      { word: 'cerca', meaning: 'near', pronunciation: 'THEHR-kah' },
      { word: 'detrás', meaning: 'behind', pronunciation: 'deh-TRAHS' }
    ],
    grammarNotes: [
      { title: 'Prepositions of Place', explanation: 'Cerca de = near; detrás de = behind.', exampleFromStory: 'Hay bancos cerca de los árboles.' }
    ],
    lines: [
      { text: "Hay una fuente grande en el parque.", formula: "Hay (Verb) + una fuente grande (Object) + en el parque (Place)" },
      { text: "Hay bancos cerca de los árboles.", formula: "Hay (Verb) + bancos cerca de los árboles (Object)" },
      { text: "Detrás de la fuente hay flores rojas.", formula: "Detrás (Verb) + de la fuente hay flores rojas (Place)" }
    ],
    grammar_note: {
      term: "Prepositions of Place",
      translation: "Prepositions of Place",
      explanation: "Cerca de = near; detrás de = behind.",
      example: "Hay bancos cerca de los árboles."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's90',
    lesson: 19,
    cefr_badge: 'A2',
    title: 'La Cocina de la Casa',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['nevera', 'encima', 'debajo'],
    recycled_vocab: ['cocina', 'mesa', 'silla'],
    mascot_line: 'Finding things above and below in the kitchen!',
    word_encounters_seed: ['nevera', 'encima', 'debajo'],
    description: 'Locating items around the kitchen.',
    storyLines: [
      'Hay una nevera grande en la cocina.',
      'Encima de la mesa hay un plato.',
      'Debajo de la silla hay un gato.'
    ],
    storyTranslations: [
      'There is a big fridge in the kitchen.',
      'On top of the table there is a plate.',
      'Under the chair there is a cat.'
    ],
    vocabulary: [
      { word: 'nevera', meaning: 'fridge', pronunciation: 'neh-BEH-rah' },
      { word: 'encima', meaning: 'on top', pronunciation: 'ehn-THEE-mah' },
      { word: 'debajo', meaning: 'under/below', pronunciation: 'deh-BAH-hoh' }
    ],
    grammarNotes: [
      { title: 'Encima de / Debajo de', explanation: 'Encima de = on top of; debajo de = under/below.', exampleFromStory: 'Encima de la mesa hay un plato.' }
    ],
    lines: [
      { text: "Hay una nevera grande en la cocina.", formula: "Hay (Verb) + una nevera grande (Object) + en la cocina (Place)" },
      { text: "Encima de la mesa hay un plato.", formula: "Encima (Verb) + de la mesa hay un plato (Place)" },
      { text: "Debajo de la silla hay un gato.", formula: "Debajo (Verb) + de la silla hay un gato (Place)" }
    ],
    grammar_note: {
      term: "Encima de / Debajo de",
      translation: "Encima de / Debajo de",
      explanation: "Encima de = on top of; debajo de = under/below.",
      example: "Encima de la mesa hay un plato."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's91',
    lesson: 19,
    cefr_badge: 'A2',
    title: 'La Habitación de Hotel',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['baño', 'al lado', 'ventana'],
    recycled_vocab: ['habitación', 'cama', 'grande'],
    mascot_line: 'A cozy hotel room with a view!',
    word_encounters_seed: ['baño', 'al lado', 'ventana'],
    description: 'Describing the layout of a hotel room.',
    storyLines: [
      'Hay una cama grande en la habitación.',
      'El baño está al lado de la cama.',
      'Hay una ventana al lado de la mesa.'
    ],
    storyTranslations: [
      'There is a big bed in the room.',
      'The bathroom is next to the bed.',
      'There is a window next to the table.'
    ],
    vocabulary: [
      { word: 'baño', meaning: 'bathroom', pronunciation: 'BAH-nyoh' },
      { word: 'al lado', meaning: 'next to', pronunciation: 'ahl LAH-doh' },
      { word: 'ventana', meaning: 'window', pronunciation: 'behn-TAH-nah' }
    ],
    grammarNotes: [
      { title: 'Al Lado De (Next To)', explanation: 'Al lado de is used to describe adjacent positions.', exampleFromStory: 'El baño está al lado de la cama.' }
    ],
    lines: [
      { text: "Hay una cama grande en la habitación.", formula: "Hay (Verb) + una cama grande (Object) + en la habitación (Place)" },
      { text: "El baño está al lado de la cama.", formula: "El (Verb) + baño está (Object) + al lado de la cama (Place)" },
      { text: "Hay una ventana al lado de la mesa.", formula: "Hay (Verb) + una ventana (Object) + al lado de la mesa (Place)" }
    ],
    grammar_note: {
      term: "Al Lado De (Next To)",
      translation: "Al Lado De (Next To)",
      explanation: "Al lado de is used to describe adjacent positions.",
      example: "El baño está al lado de la cama."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's92',
    lesson: 19,
    cefr_badge: 'A2',
    title: 'El Salón de Clase',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['pizarra', 'delante', 'entre'],
    recycled_vocab: ['clase', 'sillas', 'mesas'],
    mascot_line: 'A busy classroom with desks and a big board!',
    word_encounters_seed: ['pizarra', 'delante', 'entre'],
    description: 'Describing what is in a classroom.',
    storyLines: [
      'Hay una pizarra delante de la clase.',
      'Hay mesas entre las sillas.',
      'Hay muchos libros en las mesas.'
    ],
    storyTranslations: [
      'There is a blackboard in front of the class.',
      'There are tables between the chairs.',
      'There are many books on the tables.'
    ],
    vocabulary: [
      { word: 'pizarra', meaning: 'blackboard', pronunciation: 'pee-THAH-rrah' },
      { word: 'delante', meaning: 'in front of', pronunciation: 'deh-LAHN-teh' },
      { word: 'entre', meaning: 'between', pronunciation: 'EHN-treh' }
    ],
    grammarNotes: [
      { title: 'Delante de / Entre', explanation: 'Delante de = in front of; entre = between.', exampleFromStory: 'Hay una pizarra delante de la clase.' }
    ],
    lines: [
      { text: "Hay una pizarra delante de la clase.", formula: "Hay (Verb) + una pizarra delante (Object) + de la clase (Place)" },
      { text: "Hay mesas entre las sillas.", formula: "Hay (Verb) + mesas entre las sillas (Object)" },
      { text: "Hay muchos libros en las mesas.", formula: "Hay (Verb) + muchos libros en las mesas (Object)" }
    ],
    grammar_note: {
      term: "Delante de / Entre",
      translation: "Delante de / Entre",
      explanation: "Delante de = in front of; entre = between.",
      example: "Hay una pizarra delante de la clase."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's93',
    lesson: 20,
    cefr_badge: 'A2',
    title: 'La Calle Principal',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['calle', 'farmacia', 'panadería'],
    recycled_vocab: ['tienda', 'cerca', 'hay'],
    mascot_line: 'Shops and bakeries lining the main street!',
    word_encounters_seed: ['calle', 'farmacia', 'panadería'],
    description: 'Describing shops on the main street.',
    storyLines: [
      'En la calle principal hay una farmacia.',
      'Hay una panadería cerca de la farmacia.',
      'Hay muchas tiendas en la calle.'
    ],
    storyTranslations: [
      'On the main street there is a pharmacy.',
      'There is a bakery near the pharmacy.',
      'There are many shops on the street.'
    ],
    vocabulary: [
      { word: 'calle', meaning: 'street', pronunciation: 'KAH-lyeh' },
      { word: 'farmacia', meaning: 'pharmacy', pronunciation: 'fahr-MAH-thyah' },
      { word: 'panadería', meaning: 'bakery', pronunciation: 'pah-nah-deh-REE-ah' }
    ],
    grammarNotes: [
      { title: 'Hay + Location', explanation: 'Hay + noun + location describes what exists where.', exampleFromStory: 'En la calle principal hay una farmacia.' }
    ],
    lines: [
      { text: "En la calle principal hay una farmacia.", formula: "En la calle principal hay una farmacia (Place)" },
      { text: "Hay una panadería cerca de la farmacia.", formula: "Hay (Verb) + una panadería cerca (Object) + de la farmacia (Place)" },
      { text: "Hay muchas tiendas en la calle.", formula: "Hay (Verb) + muchas tiendas (Object) + en la calle (Place)" }
    ],
    grammar_note: {
      term: "Hay + Location",
      translation: "Hay + Location",
      explanation: "Hay + noun + location describes what exists where.",
      example: "En la calle principal hay una farmacia."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's94',
    lesson: 20,
    cefr_badge: 'A2',
    title: 'El Dormitorio de Mi Hermano',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['dormitorio', 'póster', 'estantería'],
    recycled_vocab: ['hermano', 'encima', 'libros'],
    mascot_line: 'Posters and bookshelves in a cool bedroom!',
    word_encounters_seed: ['dormitorio', 'póster', 'estantería'],
    description: 'Describing items in a brother\'s bedroom.',
    storyLines: [
      'En el dormitorio de mi hermano hay un póster.',
      'Hay una estantería con muchos libros.',
      'Encima de la cama hay una mochila.'
    ],
    storyTranslations: [
      'In my brother\'s bedroom there is a poster.',
      'There is a bookshelf with many books.',
      'On top of the bed there is a backpack.'
    ],
    vocabulary: [
      { word: 'dormitorio', meaning: 'bedroom', pronunciation: 'dohr-mee-TOH-ryoh' },
      { word: 'póster', meaning: 'poster', pronunciation: 'POHS-tehr' },
      { word: 'estantería', meaning: 'bookshelf', pronunciation: 'ehs-tahn-teh-REE-ah' }
    ],
    grammarNotes: [
      { title: 'Possession (De mi hermano)', explanation: 'Spanish uses "de + person" instead of apostrophe-s.', exampleFromStory: 'En el dormitorio de mi hermano hay un póster.' }
    ],
    lines: [
      { text: "En el dormitorio de mi hermano hay un póster.", formula: "En el dormitorio de mi hermano hay un póster (Place)" },
      { text: "Hay una estantería con muchos libros.", formula: "Hay (Verb) + una estantería con muchos libros (Object)" },
      { text: "Encima de la cama hay una mochila.", formula: "Encima (Verb) + de la cama hay una mochila (Place)" }
    ],
    grammar_note: {
      term: "Possession (De mi hermano)",
      translation: "Possession (De mi hermano)",
      explanation: "Spanish uses \"de + person\" instead of apostrophe-s.",
      example: "En el dormitorio de mi hermano hay un póster."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's95',
    lesson: 20,
    cefr_badge: 'A2',
    title: 'La Plaza del Pueblo',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['iglesia', 'enfrente', 'estatua'],
    recycled_vocab: ['plaza', 'fuente', 'cerca'],
    mascot_line: 'A beautiful church facing the village square!',
    word_encounters_seed: ['iglesia', 'enfrente', 'estatua'],
    description: 'Describing landmarks around the village square.',
    storyLines: [
      'Hay una iglesia enfrente de la plaza.',
      'Hay una estatua cerca de la fuente.',
      'Hay muchas personas en la plaza.'
    ],
    storyTranslations: [
      'There is a church facing the square.',
      'There is a statue near the fountain.',
      'There are many people in the square.'
    ],
    vocabulary: [
      { word: 'iglesia', meaning: 'church', pronunciation: 'ee-GLEH-syah' },
      { word: 'enfrente', meaning: 'facing/opposite', pronunciation: 'ehn-FREHN-teh' },
      { word: 'estatua', meaning: 'statue', pronunciation: 'ehs-TAH-twah' }
    ],
    grammarNotes: [
      { title: 'Enfrente De (Facing)', explanation: 'Enfrente de indicates something is opposite or facing another location.', exampleFromStory: 'Hay una iglesia enfrente de la plaza.' }
    ],
    lines: [
      { text: "Hay una iglesia enfrente de la plaza.", formula: "Hay (Verb) + una iglesia enfrente (Object) + de la plaza (Place)" },
      { text: "Hay una estatua cerca de la fuente.", formula: "Hay (Verb) + una estatua cerca (Object) + de la fuente (Place)" },
      { text: "Hay muchas personas en la plaza.", formula: "Hay (Verb) + muchas personas (Object) + en la plaza (Place)" }
    ],
    grammar_note: {
      term: "Enfrente De (Facing)",
      translation: "Enfrente De (Facing)",
      explanation: "Enfrente de indicates something is opposite or facing another location.",
      example: "Hay una iglesia enfrente de la plaza."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's96',
    lesson: 20,
    cefr_badge: 'A2',
    title: 'El Jardín de la Escuela',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 2,
    new_grammar_point: 'hay + prepositions of place',
    new_vocab: ['escuela', 'columpio', 'tobogán'],
    recycled_vocab: ['jardín', 'detrás', 'hay'],
    mascot_line: 'Swings and slides in the school garden!',
    word_encounters_seed: ['escuela', 'columpio', 'tobogán'],
    description: 'A school garden with playground equipment.',
    storyLines: [
      'Detrás de la escuela hay un jardín.',
      'Hay un columpio y un tobogán.',
      'Hay muchos niños en el jardín.'
    ],
    storyTranslations: [
      'Behind the school there is a garden.',
      'There is a swing and a slide.',
      'There are many children in the garden.'
    ],
    vocabulary: [
      { word: 'escuela', meaning: 'school', pronunciation: 'ehs-KWEH-lah' },
      { word: 'columpio', meaning: 'swing', pronunciation: 'koh-LOOM-pyoh' },
      { word: 'tobogán', meaning: 'slide', pronunciation: 'toh-boh-GAHN' }
    ],
    grammarNotes: [
      { title: 'Detrás De (Behind)', explanation: 'Detrás de describes location behind something.', exampleFromStory: 'Detrás de la escuela hay un jardín.' }
    ],
    lines: [
      { text: "Detrás de la escuela hay un jardín.", formula: "Detrás (Verb) + de la escuela hay un jardín (Place)" },
      { text: "Hay un columpio y un tobogán.", formula: "Hay (Verb) + un columpio y un tobogán (Object)" },
      { text: "Hay muchos niños en el jardín.", formula: "Hay (Verb) + muchos niños (Object) + en el jardín (Place)" }
    ],
    grammar_note: {
      term: "Detrás De (Behind)",
      translation: "Detrás De (Behind)",
      explanation: "Detrás de describes location behind something.",
      example: "Detrás de la escuela hay un jardín."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 3: ir a + infinitive (near future)
  {
    id: 's14',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'El Fin de Semana',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['sábado', 'cine', 'domingo'],
    recycled_vocab: ['familia', 'película', 'casa'],
    mascot_line: 'Popcorn and movies on Saturday night!',
    word_encounters_seed: ['sábado', 'cine', 'domingo'],
    description: 'A relaxing weekend plans including cinema and dining.',
    storyLines: [
      'El sábado voy a ir al cine con mi familia.',
      'Vamos a ver una película divertida.',
      'El domingo vamos a descansar en casa.'
    ],
    storyTranslations: [
      'On Saturday I am going to go to the cinema with my family.',
      'We are going to watch a funny movie.',
      'On Sunday we are going to rest at home.'
    ],
    vocabulary: [
      { word: 'sábado', meaning: 'Saturday', pronunciation: 'SAH-bah-doh' },
      { word: 'cine', meaning: 'cinema', pronunciation: 'THEE-neh' },
      { word: 'domingo', meaning: 'Sunday', pronunciation: 'doh-MEEN-goh' }
    ],
    grammarNotes: [
      { title: 'Ir a + Infinitive', explanation: 'Formed with conjugated verb "ir" + "a" + infinitive to express near future plans.', exampleFromStory: 'Vamos a ver una película divertida.' }
    ],
    lines: [
      { text: "El sábado voy a ir al cine con mi familia.", formula: "voy (Verb) + a ir (Object) + al cine con mi familia (Place) + el sábado (Time)" },
      { text: "Vamos a ver una película divertida.", formula: "Vamos (Verb) + a ver una película divertida (Object)" },
      { text: "El domingo vamos a descansar en casa.", formula: "vamos (Verb) + a descansar (Object) + en casa (Place) + el domingo (Time)" }
    ],
    grammar_note: {
      term: "Ir a + Infinitive",
      translation: "Ir a + Infinitive",
      explanation: "Formed with conjugated verb \"ir\" + \"a\" + infinitive to express near future plans.",
      example: "Vamos a ver una película divertida."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's15',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: 'Un Regalo Especial',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['cumpleaños', 'libro', 'deseos'],
    recycled_vocab: ['amigo', 'carta', 'bonita'],
    mascot_line: 'A handwritten letter makes any birthday gift special!',
    word_encounters_seed: ['cumpleaños', 'libro', 'deseos'],
    description: 'Buying a birthday book gift for a close friend.',
    storyLines: [
      'Es el cumpleaños de mi mejor amigo.',
      'Voy a comprar un libro de aventuras para él.',
      'Voy a escribir una carta bonita.'
    ],
    storyTranslations: [
      'It is my best friend\'s birthday.',
      'I am going to buy an adventure book for him.',
      'I am going to write a pretty letter.'
    ],
    vocabulary: [
      { word: 'cumpleaños', meaning: 'birthday', pronunciation: 'koom-pleh-AH-nyohs' },
      { word: 'libro', meaning: 'book', pronunciation: 'LEE-broh' },
      { word: 'deseos', meaning: 'wishes', pronunciation: 'deh-SEH-ohs' }
    ],
    grammarNotes: [
      { title: 'Near Future (Voy a comprar)', explanation: 'Expresses future intentions using "ir a" + verb.', exampleFromStory: 'Voy a comprar un libro...' }
    ],
    lines: [
      { text: "Es el cumpleaños de mi mejor amigo.", formula: "Es (Verb) + el cumpleaños de mi mejor amigo (Object)" },
      { text: "Voy a comprar un libro de aventuras para él.", formula: "Voy (Verb) + a comprar un libro de aventuras para él (Object)" },
      { text: "Voy a escribir una carta bonita.", formula: "Voy (Verb) + a escribir una carta bonita (Object)" }
    ],
    grammar_note: {
      term: "Near Future (Voy a comprar)",
      translation: "Near Future (Voy a comprar)",
      explanation: "Expresses future intentions using \"ir a\" + verb.",
      example: "Voy a comprar un libro..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's97',
    lesson: 21,
    cefr_badge: 'A2',
    title: 'El Viaje a Barcelona',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['Barcelona', 'visitar', 'museo'],
    recycled_vocab: ['vamos', 'familia', 'ir'],
    mascot_line: 'Planning a trip to visit museums in Barcelona!',
    word_encounters_seed: ['Barcelona', 'visitar', 'museo'],
    description: 'Planning a family trip to Barcelona.',
    storyLines: [
      'Vamos a viajar a Barcelona.',
      'Vamos a visitar un museo famoso.',
      'Mi familia va a comer paella.'
    ],
    storyTranslations: [
      'We are going to travel to Barcelona.',
      'We are going to visit a famous museum.',
      'My family is going to eat paella.'
    ],
    vocabulary: [
      { word: 'Barcelona', meaning: 'Barcelona', pronunciation: 'bar-theh-LOH-nah' },
      { word: 'visitar', meaning: 'to visit', pronunciation: 'bee-see-TAR' },
      { word: 'museo', meaning: 'museum', pronunciation: 'moo-SEH-oh' }
    ],
    grammarNotes: [
      { title: 'Vamos a + Infinitive', explanation: 'Nosotros form of ir a + infinitive for group future plans.', exampleFromStory: 'Vamos a viajar a Barcelona.' }
    ],
    lines: [
      { text: "Vamos a viajar a Barcelona.", formula: "Vamos (Verb) + a viajar a Barcelona (Object)" },
      { text: "Vamos a visitar un museo famoso.", formula: "Vamos (Verb) + a visitar un museo famoso (Object)" },
      { text: "Mi familia va a comer paella.", formula: "Mi (Verb) + familia va a comer paella (Object)" }
    ],
    grammar_note: {
      term: "Vamos a + Infinitive",
      translation: "Vamos a + Infinitive",
      explanation: "Nosotros form of ir a + infinitive for group future plans.",
      example: "Vamos a viajar a Barcelona."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's98',
    lesson: 21,
    cefr_badge: 'A2',
    title: 'La Fiesta de Cumpleaños',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['fiesta', 'invitar', 'pastel'],
    recycled_vocab: ['cumpleaños', 'amigos', 'comprar'],
    mascot_line: 'Birthday parties with cake and friends!',
    word_encounters_seed: ['fiesta', 'invitar', 'pastel'],
    description: 'Planning a birthday party.',
    storyLines: [
      'Voy a hacer una fiesta de cumpleaños.',
      'Voy a invitar a todos mis amigos.',
      'Mi madre va a comprar un pastel grande.'
    ],
    storyTranslations: [
      'I am going to have a birthday party.',
      'I am going to invite all my friends.',
      'My mother is going to buy a big cake.'
    ],
    vocabulary: [
      { word: 'fiesta', meaning: 'party', pronunciation: 'FYEHS-tah' },
      { word: 'invitar', meaning: 'to invite', pronunciation: 'een-bee-TAR' },
      { word: 'pastel', meaning: 'cake', pronunciation: 'pahs-TEHL' }
    ],
    grammarNotes: [
      { title: 'Different Subjects with Ir a', explanation: 'Voy a = I am going to; va a = he/she is going to.', exampleFromStory: 'Mi madre va a comprar un pastel grande.' }
    ],
    lines: [
      { text: "Voy a hacer una fiesta de cumpleaños.", formula: "Voy (Verb) + a hacer una fiesta de cumpleaños (Object)" },
      { text: "Voy a invitar a todos mis amigos.", formula: "Voy (Verb) + a invitar a todos mis amigos (Object)" },
      { text: "Mi madre va a comprar un pastel grande.", formula: "Mi (Verb) + madre va a comprar un pastel grande (Object)" }
    ],
    grammar_note: {
      term: "Different Subjects with Ir a",
      translation: "Different Subjects with Ir a",
      explanation: "Voy a = I am going to; va a = he/she is going to.",
      example: "Mi madre va a comprar un pastel grande."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's99',
    lesson: 21,
    cefr_badge: 'A2',
    title: 'El Examen de Mañana',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['examen', 'estudiar', 'preparar'],
    recycled_vocab: ['mañana', 'noche', 'biblioteca'],
    mascot_line: 'Studying hard tonight for tomorrow\'s test!',
    word_encounters_seed: ['examen', 'estudiar', 'preparar'],
    description: 'Preparing for an exam tomorrow.',
    storyLines: [
      'Mañana voy a tener un examen.',
      'Esta noche voy a estudiar mucho.',
      'Voy a preparar mis notas en la biblioteca.'
    ],
    storyTranslations: [
      'Tomorrow I am going to have an exam.',
      'Tonight I am going to study a lot.',
      'I am going to prepare my notes in the library.'
    ],
    vocabulary: [
      { word: 'examen', meaning: 'exam', pronunciation: 'ehk-SAH-mehn' },
      { word: 'estudiar', meaning: 'to study', pronunciation: 'ehs-too-DYAR' },
      { word: 'preparar', meaning: 'to prepare', pronunciation: 'preh-pah-RAR' }
    ],
    grammarNotes: [
      { title: 'Ir a + Infinitive for Plans', explanation: 'Use ir a + infinitive to express planned future actions.', exampleFromStory: 'Voy a preparar mis notas en la biblioteca.' }
    ],
    lines: [
      { text: "Mañana voy a tener un examen.", formula: "voy (Verb) + a tener un examen (Object) + mañana (Time)" },
      { text: "Esta noche voy a estudiar mucho.", formula: "voy (Verb) + a estudiar mucho (Object) + esta noche (Time)" },
      { text: "Voy a preparar mis notas en la biblioteca.", formula: "Voy (Verb) + a preparar mis notas (Object) + en la biblioteca (Place)" }
    ],
    grammar_note: {
      term: "Ir a + Infinitive for Plans",
      translation: "Ir a + Infinitive for Plans",
      explanation: "Use ir a + infinitive to express planned future actions.",
      example: "Voy a preparar mis notas en la biblioteca."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's100',
    lesson: 21,
    cefr_badge: 'A2',
    title: 'Las Vacaciones de Verano',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['vacaciones', 'nadar', 'verano'],
    recycled_vocab: ['playa', 'familia', 'vamos'],
    mascot_line: 'Summer vacation swimming at the beach!',
    word_encounters_seed: ['vacaciones', 'nadar', 'verano'],
    description: 'Summer holiday plans at the beach.',
    storyLines: [
      'En verano vamos a ir a la playa.',
      'Vamos a nadar en el mar.',
      'Las vacaciones van a ser divertidas.'
    ],
    storyTranslations: [
      'In summer we are going to go to the beach.',
      'We are going to swim in the sea.',
      'The vacation is going to be fun.'
    ],
    vocabulary: [
      { word: 'vacaciones', meaning: 'vacation', pronunciation: 'bah-kah-THYOH-nehs' },
      { word: 'nadar', meaning: 'to swim', pronunciation: 'nah-DAR' },
      { word: 'verano', meaning: 'summer', pronunciation: 'beh-RAH-noh' }
    ],
    grammarNotes: [
      { title: 'Van a Ser (Going to Be)', explanation: 'Third person plural of ir a + ser for describing future states.', exampleFromStory: 'Las vacaciones van a ser divertidas.' }
    ],
    lines: [
      { text: "En verano vamos a ir a la playa.", formula: "En (Verb) + verano vamos a ir (Object) + a la playa (Place)" },
      { text: "Vamos a nadar en el mar.", formula: "Vamos (Verb) + a nadar (Object) + en el mar (Place)" },
      { text: "Las vacaciones van a ser divertidas.", formula: "Las (Verb) + vacaciones van a ser divertidas (Object)" }
    ],
    grammar_note: {
      term: "Van a Ser (Going to Be)",
      translation: "Van a Ser (Going to Be)",
      explanation: "Third person plural of ir a + ser for describing future states.",
      example: "Las vacaciones van a ser divertidas."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's101',
    lesson: 22,
    cefr_badge: 'A2',
    title: 'La Mudanza',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['mudanza', 'pintar', 'nuevo'],
    recycled_vocab: ['casa', 'habitación', 'grande'],
    mascot_line: 'Moving to a new house and painting rooms!',
    word_encounters_seed: ['mudanza', 'pintar', 'nuevo'],
    description: 'Moving into a new house.',
    storyLines: [
      'Vamos a tener una casa nueva.',
      'Voy a pintar mi habitación de azul.',
      'La mudanza va a ser el sábado.'
    ],
    storyTranslations: [
      'We are going to have a new house.',
      'I am going to paint my room blue.',
      'The move is going to be on Saturday.'
    ],
    vocabulary: [
      { word: 'mudanza', meaning: 'move/moving', pronunciation: 'moo-DAHN-thah' },
      { word: 'pintar', meaning: 'to paint', pronunciation: 'peen-TAR' },
      { word: 'nuevo', meaning: 'new', pronunciation: 'NWEH-boh' }
    ],
    grammarNotes: [
      { title: 'Va a Ser (Going to Be)', explanation: 'Va a + ser describes when something is going to happen.', exampleFromStory: 'La mudanza va a ser el sábado.' }
    ],
    lines: [
      { text: "Vamos a tener una casa nueva.", formula: "Vamos (Verb) + a tener una casa nueva (Object)" },
      { text: "Voy a pintar mi habitación de azul.", formula: "Voy (Verb) + a pintar mi habitación de azul (Object)" },
      { text: "La mudanza va a ser el sábado.", formula: "La (Verb) + mudanza va a ser (Object) + el sábado (Time)" }
    ],
    grammar_note: {
      term: "Va a Ser (Going to Be)",
      translation: "Va a Ser (Going to Be)",
      explanation: "Va a + ser describes when something is going to happen.",
      example: "La mudanza va a ser el sábado."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's102',
    lesson: 22,
    cefr_badge: 'A2',
    title: 'El Concierto del Viernes',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['concierto', 'cantar', 'escenario'],
    recycled_vocab: ['viernes', 'música', 'amigos'],
    mascot_line: 'A live music concert on Friday night!',
    word_encounters_seed: ['concierto', 'cantar', 'escenario'],
    description: 'Going to a concert on Friday.',
    storyLines: [
      'El viernes vamos a ir a un concierto.',
      'El cantante va a cantar en el escenario.',
      'Mis amigos van a bailar con la música.'
    ],
    storyTranslations: [
      'On Friday we are going to go to a concert.',
      'The singer is going to sing on stage.',
      'My friends are going to dance to the music.'
    ],
    vocabulary: [
      { word: 'concierto', meaning: 'concert', pronunciation: 'kohn-THYEHR-toh' },
      { word: 'cantar', meaning: 'to sing', pronunciation: 'kahn-TAR' },
      { word: 'escenario', meaning: 'stage', pronunciation: 'ehs-theh-NAH-ryoh' }
    ],
    grammarNotes: [
      { title: 'Ellos Van a + Infinitive', explanation: 'Third person plural: van a bailar = they are going to dance.', exampleFromStory: 'Mis amigos van a bailar con la música.' }
    ],
    lines: [
      { text: "El viernes vamos a ir a un concierto.", formula: "vamos (Verb) + a ir a un concierto (Object) + el viernes (Time)" },
      { text: "El cantante va a cantar en el escenario.", formula: "El (Verb) + cantante va a cantar (Object) + en el escenario (Place)" },
      { text: "Mis amigos van a bailar con la música.", formula: "Mis (Verb) + amigos van a bailar con la música (Object)" }
    ],
    grammar_note: {
      term: "Ellos Van a + Infinitive",
      translation: "Ellos Van a + Infinitive",
      explanation: "Third person plural: van a bailar = they are going to dance.",
      example: "Mis amigos van a bailar con la música."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's103',
    lesson: 22,
    cefr_badge: 'A2',
    title: 'El Proyecto de Ciencias',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['proyecto', 'presentar', 'ciencias'],
    recycled_vocab: ['clase', 'profesor', 'preparar'],
    mascot_line: 'Presenting a science project in class!',
    word_encounters_seed: ['proyecto', 'presentar', 'ciencias'],
    description: 'Preparing a science project for class.',
    storyLines: [
      'Voy a presentar un proyecto de ciencias.',
      'Voy a hablar sobre los animales.',
      'El profesor va a dar una nota.'
    ],
    storyTranslations: [
      'I am going to present a science project.',
      'I am going to talk about animals.',
      'The teacher is going to give a grade.'
    ],
    vocabulary: [
      { word: 'proyecto', meaning: 'project', pronunciation: 'proh-YEHK-toh' },
      { word: 'presentar', meaning: 'to present', pronunciation: 'preh-sehn-TAR' },
      { word: 'ciencias', meaning: 'sciences', pronunciation: 'THYEHN-thyahs' }
    ],
    grammarNotes: [
      { title: 'Multiple Ir a Statements', explanation: 'Chain future plans by starting each sentence with ir a + infinitive.', exampleFromStory: 'Voy a presentar un proyecto de ciencias.' }
    ],
    lines: [
      { text: "Voy a presentar un proyecto de ciencias.", formula: "Voy (Verb) + a presentar un proyecto de ciencias (Object)" },
      { text: "Voy a hablar sobre los animales.", formula: "Voy (Verb) + a hablar sobre los animales (Object)" },
      { text: "El profesor va a dar una nota.", formula: "El profesor (Subject) + va (Verb) + a dar una nota (Object)" }
    ],
    grammar_note: {
      term: "Multiple Ir a Statements",
      translation: "Multiple Ir a Statements",
      explanation: "Chain future plans by starting each sentence with ir a + infinitive.",
      example: "Voy a presentar un proyecto de ciencias."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's104',
    lesson: 22,
    cefr_badge: 'A2',
    title: 'La Cena Especial',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 3,
    new_grammar_point: 'ir a + infinitive (near future)',
    new_vocab: ['restaurante', 'reservar', 'menú'],
    recycled_vocab: ['cena', 'familia', 'ir'],
    mascot_line: 'Reserving a table at a fancy restaurant!',
    word_encounters_seed: ['restaurante', 'reservar', 'menú'],
    description: 'Making dinner reservations at a restaurant.',
    storyLines: [
      'Vamos a cenar en un restaurante.',
      'Voy a reservar una mesa para cuatro.',
      'Vamos a elegir del menú especial.'
    ],
    storyTranslations: [
      'We are going to dine at a restaurant.',
      'I am going to reserve a table for four.',
      'We are going to choose from the special menu.'
    ],
    vocabulary: [
      { word: 'restaurante', meaning: 'restaurant', pronunciation: 'rrehs-tow-RAHN-teh' },
      { word: 'reservar', meaning: 'to reserve', pronunciation: 'rreh-sehr-BAR' },
      { word: 'menú', meaning: 'menu', pronunciation: 'meh-NOO' }
    ],
    grammarNotes: [
      { title: 'Ir a with Para', explanation: 'Combine ir a + infinitive with para to express purpose.', exampleFromStory: 'Voy a reservar una mesa para cuatro.' }
    ],
    lines: [
      { text: "Vamos a cenar en un restaurante.", formula: "Vamos (Verb) + a cenar en un restaurante (Object)" },
      { text: "Voy a reservar una mesa para cuatro.", formula: "Voy (Verb) + a reservar una mesa para cuatro (Object)" },
      { text: "Vamos a elegir del menú especial.", formula: "Vamos (Verb) + a elegir del menú especial (Object)" }
    ],
    grammar_note: {
      term: "Ir a with Para",
      translation: "Ir a with Para",
      explanation: "Combine ir a + infinitive with para to express purpose.",
      example: "Voy a reservar una mesa para cuatro."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 4: reflexives + question words
  {
    id: 's13',
    lesson: 2,
    cefr_badge: 'Pre-A1',
    title: '¿Qué Hora Es?',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['perdone', 'tren', 'once'],
    recycled_vocab: ['hora', 'mañana', 'sale'],
    mascot_line: 'Catching the train right on time!',
    word_encounters_seed: ['perdone', 'tren', 'once'],
    description: 'Asking for the time to make sure you are not late for the train.',
    storyLines: [
      'Perdone, señor, ¿qué hora es?',
      '¿A qué hora sale el tren de la mañana?',
      'Son las diez y media. El tren sale a las once.'
    ],
    storyTranslations: [
      'Excuse me, sir, what time is it?',
      'At what time does the morning train leave?',
      'It is half past ten. The train leaves at eleven.'
    ],
    vocabulary: [
      { word: 'perdone', meaning: 'excuse me', pronunciation: 'pehr-DOH-neh' },
      { word: 'tren', meaning: 'train', pronunciation: 'trehn' },
      { word: 'once', meaning: 'eleven', pronunciation: 'OHN-theh' }
    ],
    grammarNotes: [
      { title: 'Question Words (¿Qué / ¿A qué...?)', explanation: 'Spanish question words carry written accent marks (¿Qué?).', exampleFromStory: '¿A qué hora sale el tren?' }
    ],
    lines: [
      { text: "Perdone, señor, ¿qué hora es?", formula: "Perdone, (Verb) + señor, ¿qué hora es? (Object)" },
      { text: "¿A qué hora sale el tren de la mañana?", formula: "¿A (Verb) + qué hora sale el tren (Object) + de la ? (Place) + mañana (Time)" },
      { text: "Son las diez y media. El tren sale a las once.", formula: "Son (Verb) + las diez y media. El tren sale a las once (Object)" }
    ],
    grammar_note: {
      term: "Question Words (¿Qué / ¿A qué...?)",
      translation: "Question Words (¿Qué / ¿A qué...?)",
      explanation: "Spanish question words carry written accent marks (¿Qué?).",
      example: "¿A qué hora sale el tren?"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's17',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'En la Estación',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['billete', 'vuelta', 'cuesta'],
    recycled_vocab: ['estación', 'tren', 'Madrid'],
    mascot_line: 'Round-trip train tickets mean a brand new adventure!',
    word_encounters_seed: ['billete', 'vuelta', 'cuesta'],
    description: 'Buying a travel ticket at the train station counter.',
    storyLines: [
      '¿Cómo se llama esta estación de tren?',
      'Quiero un billete para Madrid, por favor.',
      '¿Cuánto cuesta el billete de ida y vuelta?'
    ],
    storyTranslations: [
      'What is this train station called?',
      'I want a ticket to Madrid, please.',
      'How much does the round-trip ticket cost?'
    ],
    vocabulary: [
      { word: 'billete', meaning: 'ticket', pronunciation: 'bee-LYEH-teh' },
      { word: 'vuelta', meaning: 'return', pronunciation: 'BWEL-tah' },
      { word: 'cuesta', meaning: 'costs', pronunciation: 'KWEHS-tah' }
    ],
    grammarNotes: [
      { title: 'Reflexive Verb Llamarse (Se llama)', explanation: '"¿Cómo se llama?" literally translates to "How is it called?".', exampleFromStory: '¿Cómo se llama esta estación?' }
    ],
    lines: [
      { text: "¿Cómo se llama esta estación de tren?", formula: "¿Cómo (Verb) + se llama esta estación de tren? (Object)" },
      { text: "Quiero un billete para Madrid, por favor.", formula: "Quiero (Verb) + un billete para Madrid, por favor (Object)" },
      { text: "¿Cuánto cuesta el billete de ida y vuelta?", formula: "¿Cuánto (Verb) + cuesta el billete de ida y vuelta? (Object)" }
    ],
    grammar_note: {
      term: "Reflexive Verb Llamarse (Se llama)",
      translation: "Reflexive Verb Llamarse (Se llama)",
      explanation: "\"¿Cómo se llama?\" literally translates to \"How is it called?\".",
      example: "¿Cómo se llama esta estación?"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's105',
    lesson: 23,
    cefr_badge: 'A2',
    title: 'La Rutina de María',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['despierta', 'ducha', 'peina'],
    recycled_vocab: ['mañana', 'casa', 'día'],
    mascot_line: 'María\'s morning routine starts with a shower!',
    word_encounters_seed: ['despierta', 'ducha', 'peina'],
    description: 'María\'s daily morning routine.',
    storyLines: [
      'María se despierta a las siete.',
      'Se ducha con agua caliente.',
      'Se peina delante del espejo.'
    ],
    storyTranslations: [
      'María wakes up at seven.',
      'She showers with hot water.',
      'She combs her hair in front of the mirror.'
    ],
    vocabulary: [
      { word: 'despierta', meaning: 'wakes up', pronunciation: 'dehs-PYEHR-tah' },
      { word: 'ducha', meaning: 'shower', pronunciation: 'DOO-chah' },
      { word: 'peina', meaning: 'combs (hair)', pronunciation: 'PAY-nah' }
    ],
    grammarNotes: [
      { title: 'Reflexive Verbs (Se despierta)', explanation: 'Se + verb indicates the action is done to oneself: se despierta = she wakes herself up.', exampleFromStory: 'María se despierta a las siete.' }
    ],
    lines: [
      { text: "María se despierta a las siete.", formula: "María (Subject) + se (Verb) + despierta a las siete (Object)" },
      { text: "Se ducha con agua caliente.", formula: "Se (Verb) + ducha con agua caliente (Object)" },
      { text: "Se peina delante del espejo.", formula: "Se (Verb) + peina delante del espejo (Object)" }
    ],
    grammar_note: {
      term: "Reflexive Verbs (Se despierta)",
      translation: "Reflexive Verbs (Se despierta)",
      explanation: "Se + verb indicates the action is done to oneself: se despierta = she wakes herself up.",
      example: "María se despierta a las siete."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's106',
    lesson: 23,
    cefr_badge: 'A2',
    title: '¿Dónde Vives?',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['dónde', 'vives', 'ciudad'],
    recycled_vocab: ['casa', 'calle', 'cerca'],
    mascot_line: 'Where do you live? In a beautiful city!',
    word_encounters_seed: ['dónde', 'vives', 'ciudad'],
    description: 'Asking and answering where someone lives.',
    storyLines: [
      '¿Dónde vives tú?',
      'Vivo en una ciudad grande.',
      'Mi casa está cerca de la calle principal.'
    ],
    storyTranslations: [
      'Where do you live?',
      'I live in a big city.',
      'My house is near the main street.'
    ],
    vocabulary: [
      { word: 'dónde', meaning: 'where', pronunciation: 'DOHN-deh' },
      { word: 'vives', meaning: 'you live', pronunciation: 'BEE-behs' },
      { word: 'ciudad', meaning: 'city', pronunciation: 'thyoo-DAHD' }
    ],
    grammarNotes: [
      { title: 'Question Word ¿Dónde?', explanation: '¿Dónde? = Where? Always carries an accent mark in questions.', exampleFromStory: '¿Dónde vives tú?' }
    ],
    lines: [
      { text: "¿Dónde vives tú?", formula: "¿Dónde (Verb) + vives tú? (Object)" },
      { text: "Vivo en una ciudad grande.", formula: "Vivo (Verb) + en una ciudad grande (Object)" },
      { text: "Mi casa está cerca de la calle principal.", formula: "Mi (Verb) + casa está cerca (Object) + de la calle principal (Place)" }
    ],
    grammar_note: {
      term: "Question Word ¿Dónde?",
      translation: "Question Word ¿Dónde?",
      explanation: "¿Dónde? = Where? Always carries an accent mark in questions.",
      example: "¿Dónde vives tú?"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's107',
    lesson: 23,
    cefr_badge: 'A2',
    title: 'El Espejo del Baño',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['espejo', 'lava', 'viste'],
    recycled_vocab: ['baño', 'mañana', 'ropa'],
    mascot_line: 'Getting ready in the bathroom mirror!',
    word_encounters_seed: ['espejo', 'lava', 'viste'],
    description: 'Morning routine in the bathroom.',
    storyLines: [
      'Cada mañana me lavo la cara.',
      'Me visto con ropa limpia.',
      'Me miro en el espejo del baño.'
    ],
    storyTranslations: [
      'Every morning I wash my face.',
      'I dress in clean clothes.',
      'I look at myself in the bathroom mirror.'
    ],
    vocabulary: [
      { word: 'espejo', meaning: 'mirror', pronunciation: 'ehs-PEH-hoh' },
      { word: 'lava', meaning: 'wash', pronunciation: 'LAH-bah' },
      { word: 'viste', meaning: 'dress', pronunciation: 'BEES-teh' }
    ],
    grammarNotes: [
      { title: 'Me Lavo / Me Visto', explanation: 'First person reflexive: me + verb stem shows doing something to yourself.', exampleFromStory: 'Cada mañana me lavo la cara.' }
    ],
    lines: [
      { text: "Cada mañana me lavo la cara.", formula: "Cada (Verb) + me lavo la cara (Object) + mañana (Time)" },
      { text: "Me visto con ropa limpia.", formula: "Me (Verb) + visto con ropa limpia (Object)" },
      { text: "Me miro en el espejo del baño.", formula: "Me (Verb) + miro (Object) + en el espejo del baño (Place)" }
    ],
    grammar_note: {
      term: "Me Lavo / Me Visto",
      translation: "Me Lavo / Me Visto",
      explanation: "First person reflexive: me + verb stem shows doing something to yourself.",
      example: "Cada mañana me lavo la cara."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's108',
    lesson: 23,
    cefr_badge: 'A2',
    title: '¿Cuántos Hermanos Tienes?',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['cuántos', 'hermanos', 'mayor'],
    recycled_vocab: ['familia', 'años', 'tengo'],
    mascot_line: 'Counting brothers and sisters in the family!',
    word_encounters_seed: ['cuántos', 'hermanos', 'mayor'],
    description: 'Asking about siblings.',
    storyLines: [
      '¿Cuántos hermanos tienes?',
      'Tengo dos hermanos y una hermana.',
      'Mi hermano mayor se llama Carlos.'
    ],
    storyTranslations: [
      'How many siblings do you have?',
      'I have two brothers and one sister.',
      'My older brother is called Carlos.'
    ],
    vocabulary: [
      { word: 'cuántos', meaning: 'how many', pronunciation: 'KWAHN-tohs' },
      { word: 'hermanos', meaning: 'siblings/brothers', pronunciation: 'ehr-MAH-nohs' },
      { word: 'mayor', meaning: 'older', pronunciation: 'mah-YOHR' }
    ],
    grammarNotes: [
      { title: '¿Cuántos? + Se Llama', explanation: '¿Cuántos? = How many?; Se llama = is called (reflexive).', exampleFromStory: 'Mi hermano mayor se llama Carlos.' }
    ],
    lines: [
      { text: "¿Cuántos hermanos tienes?", formula: "¿Cuántos (Verb) + hermanos tienes? (Object)" },
      { text: "Tengo dos hermanos y una hermana.", formula: "Tengo (Verb) + dos hermanos y una hermana (Object)" },
      { text: "Mi hermano mayor se llama Carlos.", formula: "Mi (Verb) + hermano mayor se llama Carlos (Object)" }
    ],
    grammar_note: {
      term: "¿Cuántos? + Se Llama",
      translation: "¿Cuántos? + Se Llama",
      explanation: "¿Cuántos? = How many?; Se llama = is called (reflexive).",
      example: "Mi hermano mayor se llama Carlos."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's109',
    lesson: 24,
    cefr_badge: 'A2',
    title: 'La Mañana del Lunes',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['lunes', 'levanta', 'acuesta'],
    recycled_vocab: ['mañana', 'noche', 'temprano'],
    mascot_line: 'Monday mornings mean early wake-ups!',
    word_encounters_seed: ['lunes', 'levanta', 'acuesta'],
    description: 'Getting up early and going to bed on Monday.',
    storyLines: [
      'El lunes me levanto temprano.',
      '¿A qué hora te acuestas?',
      'Me acuesto a las diez de la noche.'
    ],
    storyTranslations: [
      'On Monday I get up early.',
      'What time do you go to bed?',
      'I go to bed at ten at night.'
    ],
    vocabulary: [
      { word: 'lunes', meaning: 'Monday', pronunciation: 'LOO-nehs' },
      { word: 'levanta', meaning: 'gets up', pronunciation: 'leh-BAHN-tah' },
      { word: 'acuesta', meaning: 'goes to bed', pronunciation: 'ah-KWEHS-tah' }
    ],
    grammarNotes: [
      { title: 'Reflexive Pair (Levantarse/Acostarse)', explanation: 'Me levanto = I get up; me acuesto = I go to bed. Both reflexive.', exampleFromStory: 'El lunes me levanto temprano.' }
    ],
    lines: [
      { text: "El lunes me levanto temprano.", formula: "El (Verb) + lunes me levanto (Object) + temprano (Time)" },
      { text: "¿A qué hora te acuestas?", formula: "¿A (Verb) + qué hora te acuestas? (Object)" },
      { text: "Me acuesto a las diez de la noche.", formula: "Me (Verb) + acuesto a las diez (Object) + de la noche (Place)" }
    ],
    grammar_note: {
      term: "Reflexive Pair (Levantarse/Acostarse)",
      translation: "Reflexive Pair (Levantarse/Acostarse)",
      explanation: "Me levanto = I get up; me acuesto = I go to bed. Both reflexive.",
      example: "El lunes me levanto temprano."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's110',
    lesson: 24,
    cefr_badge: 'A2',
    title: '¿Cómo Te Sientes?',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    tier: 4,
    new_grammar_point: 'reflexives + question words',
    new_vocab: ['sientes', 'cansado', 'contento'],
    recycled_vocab: ['hoy', 'bien', 'día'],
    mascot_line: 'How are you feeling today? Happy and well!',
    word_encounters_seed: ['sientes', 'cansado', 'contento'],
    description: 'Asking and answering how someone feels.',
    storyLines: [
      '¿Cómo te sientes hoy?',
      'Me siento un poco cansado.',
      'Pero estoy contento porque es un buen día.'
    ],
    storyTranslations: [
      'How do you feel today?',
      'I feel a little tired.',
      'But I am happy because it is a good day.'
    ],
    vocabulary: [
      { word: 'sientes', meaning: 'you feel', pronunciation: 'SYEHN-tehs' },
      { word: 'cansado', meaning: 'tired', pronunciation: 'kahn-SAH-doh' },
      { word: 'contento', meaning: 'happy/content', pronunciation: 'kohn-TEHN-toh' }
    ],
    grammarNotes: [
      { title: 'Sentirse (Reflexive Feeling)', explanation: '¿Cómo te sientes? = How do you feel? Me siento = I feel (reflexive).', exampleFromStory: 'Me siento un poco cansado.' }
    ],
    lines: [
      { text: "¿Cómo te sientes hoy?", formula: "¿Cómo (Verb) + te sientes ? (Object) + hoy (Time)" },
      { text: "Me siento un poco cansado.", formula: "Me (Verb) + siento un poco cansado (Object)" },
      { text: "Pero estoy contento porque es un buen día.", formula: "Pero (Verb) + estoy contento porque es un buen día (Object)" }
    ],
    grammar_note: {
      term: "Sentirse (Reflexive Feeling)",
      translation: "Sentirse (Reflexive Feeling)",
      explanation: "¿Cómo te sientes? = How do you feel? Me siento = I feel (reflexive).",
      example: "Me siento un poco cansado."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // ── A2 LEVEL ──
  // Tier 1: direct object pronouns + informal commands
  {
    id: 's18',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'Llegada al Hotel',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['reserva', 'habitación', 'vistas'],
    recycled_vocab: ['tengo', 'mar', 'desayuno'],
    mascot_line: 'A hotel room with sea views? Sign me up!',
    word_encounters_seed: ['reserva', 'habitación', 'vistas'],
    description: 'Checking in at a hotel desk and asking for room keys.',
    storyLines: [
      'Hola, buenas tardes. Tengo una reserva a nombre de Juan Gómez.',
      'Bienvenido. Sí, aquí la tengo. Habitación doscientos cuatro, con vistas al mar.',
      'Perfecto. Tómala y sube a la habitación.'
    ],
    storyTranslations: [
      'Hello, good afternoon. I have a reservation under the name of Juan Gomez.',
      'Welcome. Yes, here I have it. Room two hundred and four, with sea views.',
      'Perfect. Take it and go up to the room.'
    ],
    vocabulary: [
      { word: 'reserva', meaning: 'reservation', pronunciation: 'reh-SEHR-bah' },
      { word: 'habitación', meaning: 'room', pronunciation: 'ah-bee-tah-THYOHN' },
      { word: 'vistas', meaning: 'views', pronunciation: 'BEES-tahs' }
    ],
    grammarNotes: [
      { title: 'Direct Object Pronouns (La tengo / Tómala)', explanation: '"La" replaces feminine singular nouns (la llave/reserva). Imperatives attach pronouns to the end (Tómala).', exampleFromStory: 'Aquí la tengo. Tómala...' }
    ],
    lines: [
      { text: "Hola, buenas tardes. Tengo una reserva a nombre de Juan Gómez.", formula: "Hola, (Verb) + buenas tardes. Tengo una reserva a nombre de Juan Gómez (Object)" },
      { text: "Bienvenido. Sí, aquí la tengo. Habitación doscientos cuatro, con vistas al mar.", formula: "Bienvenido. (Verb) + Sí, aquí la tengo. Habitación doscientos cuatro, con vistas (Object) + al mar (Place)" },
      { text: "Perfecto. Tómala y sube a la habitación.", formula: "Perfecto. (Verb) + Tómala y sube (Object) + a la habitación (Place)" }
    ],
    grammar_note: {
      term: "Direct Object Pronouns (La tengo / Tómala)",
      translation: "Direct Object Pronouns (La tengo / Tómala)",
      explanation: "\"La\" replaces feminine singular nouns (la llave/reserva). Imperatives attach pronouns to the end (Tómala).",
      example: "Aquí la tengo. Tómala..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's21',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'Una Cena en Barcelona',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['ración', 'vino', 'botella'],
    recycled_vocab: ['cenar', 'agua', 'casa'],
    mascot_line: 'Patatas bravas and tapas are unmatched!',
    word_encounters_seed: ['ración', 'vino', 'botella'],
    description: 'Ordering traditional tapas and wine in Barcelona.',
    storyLines: [
      'Para cenar, queremos una ración de patatas bravas.',
      '¿La botella de vino? Tráigala a la mesa.',
      'Muy bien, trágala con dos vasos de agua.'
    ],
    storyTranslations: [
      'For dinner, we want a portion of patatas bravas.',
      'The bottle of wine? Bring it to the table.',
      'Very well, bring it with two glasses of water.'
    ],
    vocabulary: [
      { word: 'ración', meaning: 'portion/plate', pronunciation: 'rah-THYOHN' },
      { word: 'vino', meaning: 'wine', pronunciation: 'BEE-noh' },
      { word: 'botella', meaning: 'bottle', pronunciation: 'boh-TEH-lyah' }
    ],
    grammarNotes: [
      { title: 'Commands with Object Pronouns (Tráigala)', explanation: 'Object pronouns attach directly to affirmative commands.', exampleFromStory: 'Tráigala a la mesa.' }
    ],
    lines: [
      { text: "Para cenar, queremos una ración de patatas bravas.", formula: "Para (Verb) + cenar, queremos una ración de patatas bravas (Object)" },
      { text: "¿La botella de vino? Tráigala a la mesa.", formula: "¿La (Verb) + botella de vino? Tráigala (Object) + a la mesa (Place)" },
      { text: "Muy bien, trágala con dos vasos de agua.", formula: "Muy (Verb) + bien, trágala con dos vasos de agua (Object)" }
    ],
    grammar_note: {
      term: "Commands with Object Pronouns (Tráigala)",
      translation: "Commands with Object Pronouns (Tráigala)",
      explanation: "Object pronouns attach directly to affirmative commands.",
      example: "Tráigala a la mesa."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's111',
    lesson: 24,
    cefr_badge: 'A2',
    title: 'En el Restaurante',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['cuenta', 'propina', 'camarero'],
    recycled_vocab: ['mesa', 'comida', 'trae'],
    mascot_line: 'Ordering like a pro at a Spanish restaurant!',
    word_encounters_seed: ['cuenta', 'propina', 'camarero'],
    description: 'Asking for the bill at a restaurant.',
    storyLines: [
      'Camarero, tráigame la cuenta, por favor.',
      'La comida estuvo deliciosa. Póngala en la mesa.',
      'Deja la propina encima de la cuenta.'
    ],
    storyTranslations: [
      'Waiter, bring me the bill, please.',
      'The food was delicious. Put it on the table.',
      'Leave the tip on top of the bill.'
    ],
    vocabulary: [
      { word: 'cuenta', meaning: 'bill/check', pronunciation: 'KWEHN-tah' },
      { word: 'propina', meaning: 'tip', pronunciation: 'proh-PEE-nah' },
      { word: 'camarero', meaning: 'waiter', pronunciation: 'kah-mah-REH-roh' }
    ],
    grammarNotes: [
      { title: 'Formal Command + Pronoun (Tráigame)', explanation: 'Formal commands attach pronouns: tráiga + me = tráigame.', exampleFromStory: 'Tráigame la cuenta, por favor.' }
    ],
    lines: [
      { text: "Camarero, tráigame la cuenta, por favor.", formula: "Camarero, (Verb) + tráigame la cuenta, por favor (Object)" },
      { text: "La comida estuvo deliciosa. Póngala en la mesa.", formula: "La (Verb) + comida estuvo deliciosa. Póngala (Object) + en la mesa (Place)" },
      { text: "Deja la propina encima de la cuenta.", formula: "Dej (Verb) + a la propina encima de la cuenta (Place)" }
    ],
    grammar_note: {
      term: "Formal Command + Pronoun (Tráigame)",
      translation: "Formal Command + Pronoun (Tráigame)",
      explanation: "Formal commands attach pronouns: tráiga + me = tráigame.",
      example: "Tráigame la cuenta, por favor."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's112',
    lesson: 24,
    cefr_badge: 'A2',
    title: 'La Tienda de Ropa',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['probárselo', 'talla', 'camiseta'],
    recycled_vocab: ['tienda', 'quiero', 'azul'],
    mascot_line: 'Trying on clothes in the perfect size!',
    word_encounters_seed: ['probárselo', 'talla', 'camiseta'],
    description: 'Trying on a shirt at a clothing store.',
    storyLines: [
      'Quiero esta camiseta azul. ¿Puedo probármela?',
      '¿La tiene en talla mediana?',
      'Sí, pruébatela en el probador.'
    ],
    storyTranslations: [
      'I want this blue shirt. Can I try it on?',
      'Do you have it in medium size?',
      'Yes, try it on in the fitting room.'
    ],
    vocabulary: [
      { word: 'probárselo', meaning: 'to try it on', pronunciation: 'proh-BAR-seh-loh' },
      { word: 'talla', meaning: 'size', pronunciation: 'TAH-lyah' },
      { word: 'camiseta', meaning: 'shirt/t-shirt', pronunciation: 'kah-mee-SEH-tah' }
    ],
    grammarNotes: [
      { title: 'Reflexive + Object Pronoun (Probármela)', explanation: 'Probár + me + la = probármela: try it on for myself.', exampleFromStory: '¿Puedo probármela?' }
    ],
    lines: [
      { text: "Quiero esta camiseta azul. ¿Puedo probármela?", formula: "Quiero (Verb) + esta camiseta azul. ¿Puedo probármela? (Object)" },
      { text: "¿La tiene en talla mediana?", formula: "¿La (Verb) + tiene en talla mediana? (Object)" },
      { text: "Sí, pruébatela en el probador.", formula: "Sí, (Verb) + pruébatela (Object) + en el probador (Place)" }
    ],
    grammar_note: {
      term: "Reflexive + Object Pronoun (Probármela)",
      translation: "Reflexive + Object Pronoun (Probármela)",
      explanation: "Probár + me + la = probármela: try it on for myself.",
      example: "¿Puedo probármela?"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's113',
    lesson: 25,
    cefr_badge: 'A2',
    title: 'El Médico',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['médico', 'receta', 'pastillas'],
    recycled_vocab: ['dolor', 'cabeza', 'toma'],
    mascot_line: 'Visiting the doctor and getting a prescription!',
    word_encounters_seed: ['médico', 'receta', 'pastillas'],
    description: 'Getting medicine from the doctor.',
    storyLines: [
      'El médico me da una receta.',
      'Toma estas pastillas dos veces al día.',
      'Tómalas con agua después de comer.'
    ],
    storyTranslations: [
      'The doctor gives me a prescription.',
      'Take these pills twice a day.',
      'Take them with water after eating.'
    ],
    vocabulary: [
      { word: 'médico', meaning: 'doctor', pronunciation: 'MEH-dee-koh' },
      { word: 'receta', meaning: 'prescription', pronunciation: 'rreh-THEH-tah' },
      { word: 'pastillas', meaning: 'pills', pronunciation: 'pahs-TEE-lyahs' }
    ],
    grammarNotes: [
      { title: 'Informal Command + Pronoun (Tómalas)', explanation: 'Toma + las = tómalas. Accent added to keep stress.', exampleFromStory: 'Tómalas con agua después de comer.' }
    ],
    lines: [
      { text: "El médico me da una receta.", formula: "El (Verb) + médico me da una receta (Object)" },
      { text: "Toma estas pastillas dos veces al día.", formula: "Toma (Verb) + estas pastillas dos veces (Object) + al día (Place)" },
      { text: "Tómalas con agua después de comer.", formula: "Tómalas (Verb) + con agua después de comer (Object)" }
    ],
    grammar_note: {
      term: "Informal Command + Pronoun (Tómalas)",
      translation: "Informal Command + Pronoun (Tómalas)",
      explanation: "Toma + las = tómalas. Accent added to keep stress.",
      example: "Tómalas con agua después de comer."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's114',
    lesson: 25,
    cefr_badge: 'A2',
    title: 'El Mercado de Frutas',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['kilo', 'fresas', 'bolsa'],
    recycled_vocab: ['mercado', 'comprar', 'frutas'],
    mascot_line: 'Fresh strawberries by the kilo from the market!',
    word_encounters_seed: ['kilo', 'fresas', 'bolsa'],
    description: 'Buying strawberries at the fruit market.',
    storyLines: [
      'Quiero un kilo de fresas, por favor.',
      'Póngalas en esta bolsa grande.',
      '¿Las quiere maduras o verdes?'
    ],
    storyTranslations: [
      'I want a kilo of strawberries, please.',
      'Put them in this big bag.',
      'Do you want them ripe or green?'
    ],
    vocabulary: [
      { word: 'kilo', meaning: 'kilogram', pronunciation: 'KEE-loh' },
      { word: 'fresas', meaning: 'strawberries', pronunciation: 'FREH-sahs' },
      { word: 'bolsa', meaning: 'bag', pronunciation: 'BOHL-sah' }
    ],
    grammarNotes: [
      { title: 'Formal Command + Las (Póngalas)', explanation: 'Pónga + las = póngalas: put them. Las replaces fresas.', exampleFromStory: 'Póngalas en esta bolsa grande.' }
    ],
    lines: [
      { text: "Quiero un kilo de fresas, por favor.", formula: "Quiero (Verb) + un kilo de fresas, por favor (Object)" },
      { text: "Póngalas en esta bolsa grande.", formula: "Póngalas (Verb) + en esta bolsa grande (Object)" },
      { text: "¿Las quiere maduras o verdes?", formula: "¿Las (Verb) + quiere maduras o verdes? (Object)" }
    ],
    grammar_note: {
      term: "Formal Command + Las (Póngalas)",
      translation: "Formal Command + Las (Póngalas)",
      explanation: "Pónga + las = póngalas: put them. Las replaces fresas.",
      example: "Póngalas en esta bolsa grande."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's115',
    lesson: 25,
    cefr_badge: 'A2',
    title: 'La Lavandería',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['lavandería', 'ropa sucia', 'planchar'],
    recycled_vocab: ['llevar', 'mañana', 'recoger'],
    mascot_line: 'Clean and pressed clothes ready to go!',
    word_encounters_seed: ['lavandería', 'planchar', 'ropa'],
    description: 'Dropping off clothes at the laundry.',
    storyLines: [
      'Llevo mi ropa sucia a la lavandería.',
      'Lávela y plánchela, por favor.',
      'La recogeré mañana por la tarde.'
    ],
    storyTranslations: [
      'I take my dirty clothes to the laundry.',
      'Wash it and iron it, please.',
      'I will pick it up tomorrow afternoon.'
    ],
    vocabulary: [
      { word: 'lavandería', meaning: 'laundry', pronunciation: 'lah-bahn-deh-REE-ah' },
      { word: 'ropa sucia', meaning: 'dirty clothes', pronunciation: 'RROH-pah SOO-thyah' },
      { word: 'planchar', meaning: 'to iron', pronunciation: 'plahn-CHAR' }
    ],
    grammarNotes: [
      { title: 'Chained Commands (Lávela y Plánchela)', explanation: 'Multiple formal commands with attached pronouns can be chained.', exampleFromStory: 'Lávela y plánchela, por favor.' }
    ],
    lines: [
      { text: "Llevo mi ropa sucia a la lavandería.", formula: "Llevo (Verb) + mi ropa sucia (Object) + a la lavandería (Place)" },
      { text: "Lávela y plánchela, por favor.", formula: "Lávela (Verb) + y plánchela, por favor (Object)" },
      { text: "La recogeré mañana por la tarde.", formula: "La (Verb) + recogeré (Object) + por la tarde (Place) + mañana (Time)" }
    ],
    grammar_note: {
      term: "Chained Commands (Lávela y Plánchela)",
      translation: "Chained Commands (Lávela y Plánchela)",
      explanation: "Multiple formal commands with attached pronouns can be chained.",
      example: "Lávela y plánchela, por favor."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's116',
    lesson: 25,
    cefr_badge: 'A2',
    title: 'El Taxi al Centro',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['taxista', 'dirección', 'cambio'],
    recycled_vocab: ['centro', 'llévame', 'por favor'],
    mascot_line: 'Taking a taxi ride to the city center!',
    word_encounters_seed: ['taxista', 'dirección', 'cambio'],
    description: 'Giving directions to a taxi driver.',
    storyLines: [
      'Taxista, lléveme al centro, por favor.',
      'Aquí tiene la dirección. Sígala por esta calle.',
      '¿Tiene cambio de veinte euros?'
    ],
    storyTranslations: [
      'Driver, take me to the center, please.',
      'Here is the address. Follow it along this street.',
      'Do you have change for twenty euros?'
    ],
    vocabulary: [
      { word: 'taxista', meaning: 'taxi driver', pronunciation: 'tahk-SEES-tah' },
      { word: 'dirección', meaning: 'address/direction', pronunciation: 'dee-rehk-THYOHN' },
      { word: 'cambio', meaning: 'change', pronunciation: 'KAHM-byoh' }
    ],
    grammarNotes: [
      { title: 'Formal Command (Lléveme, Sígala)', explanation: 'Lléve + me = lléveme; siga + la = sígala. Formal usted commands.', exampleFromStory: 'Lléveme al centro, por favor.' }
    ],
    lines: [
      { text: "Taxista, lléveme al centro, por favor.", formula: "Taxista, (Verb) + lléveme (Object) + al centro, por favor (Place)" },
      { text: "Aquí tiene la dirección. Sígala por esta calle.", formula: "Aquí (Verb) + tiene la dirección. Sígala por esta calle (Object)" },
      { text: "¿Tiene cambio de veinte euros?", formula: "¿Tiene (Verb) + cambio de veinte euros? (Object)" }
    ],
    grammar_note: {
      term: "Formal Command (Lléveme, Sígala)",
      translation: "Formal Command (Lléveme, Sígala)",
      explanation: "Lléve + me = lléveme; siga + la = sígala. Formal usted commands.",
      example: "Lléveme al centro, por favor."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's117',
    lesson: 26,
    cefr_badge: 'A2',
    title: 'El Correo Postal',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['paquete', 'sello', 'enviar'],
    recycled_vocab: ['correo', 'carta', 'dirección'],
    mascot_line: 'Sending packages and postcards from abroad!',
    word_encounters_seed: ['paquete', 'sello', 'enviar'],
    description: 'Sending a package at the post office.',
    storyLines: [
      'Quiero enviar este paquete a México.',
      'Póngale un sello y envíelo hoy.',
      'La carta, envíela por correo urgente.'
    ],
    storyTranslations: [
      'I want to send this package to Mexico.',
      'Put a stamp on it and send it today.',
      'The letter, send it by express mail.'
    ],
    vocabulary: [
      { word: 'paquete', meaning: 'package', pronunciation: 'pah-KEH-teh' },
      { word: 'sello', meaning: 'stamp', pronunciation: 'SEH-lyoh' },
      { word: 'enviar', meaning: 'to send', pronunciation: 'ehn-BYAR' }
    ],
    grammarNotes: [
      { title: 'Command + Le/Lo (Póngale, Envíelo)', explanation: 'Le = indirect object (to it); lo = direct object (it). Both attach to commands.', exampleFromStory: 'Póngale un sello y envíelo hoy.' }
    ],
    lines: [
      { text: "Quiero enviar este paquete a México.", formula: "Quiero (Verb) + enviar este paquete a México (Object)" },
      { text: "Póngale un sello y envíelo hoy.", formula: "Póngale (Verb) + un sello y envíelo (Object) + hoy (Time)" },
      { text: "La carta, envíela por correo urgente.", formula: "La (Verb) + carta, envíela por correo urgente (Object)" }
    ],
    grammar_note: {
      term: "Command + Le/Lo (Póngale, Envíelo)",
      translation: "Command + Le/Lo (Póngale, Envíelo)",
      explanation: "Le = indirect object (to it); lo = direct object (it). Both attach to commands.",
      example: "Póngale un sello y envíelo hoy."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's118',
    lesson: 26,
    cefr_badge: 'A2',
    title: 'El Alquiler de Bicicletas',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 1,
    new_grammar_point: 'direct object pronouns + informal commands',
    new_vocab: ['bicicleta', 'alquilar', 'casco'],
    recycled_vocab: ['parque', 'horas', 'devolver'],
    mascot_line: 'Renting bikes to explore the park trails!',
    word_encounters_seed: ['bicicleta', 'alquilar', 'casco'],
    description: 'Renting a bicycle for the day.',
    storyLines: [
      'Quiero alquilar una bicicleta por tres horas.',
      'Póngase el casco antes de salir.',
      'Devuélvala en esta estación antes de las seis.'
    ],
    storyTranslations: [
      'I want to rent a bicycle for three hours.',
      'Put on the helmet before leaving.',
      'Return it at this station before six.'
    ],
    vocabulary: [
      { word: 'bicicleta', meaning: 'bicycle', pronunciation: 'bee-thee-KLEH-tah' },
      { word: 'alquilar', meaning: 'to rent', pronunciation: 'ahl-kee-LAR' },
      { word: 'casco', meaning: 'helmet', pronunciation: 'KAHS-koh' }
    ],
    grammarNotes: [
      { title: 'Reflexive Command (Póngase) + Object Command (Devuélvala)', explanation: 'Póngase = put on yourself; devuélvala = return it. Both formal commands.', exampleFromStory: 'Póngase el casco antes de salir.' }
    ],
    lines: [
      { text: "Quiero alquilar una bicicleta por tres horas.", formula: "Quiero (Verb) + alquilar una bicicleta por tres horas (Object)" },
      { text: "Póngase el casco antes de salir.", formula: "Póngase (Verb) + el casco antes de salir (Object)" },
      { text: "Devuélvala en esta estación antes de las seis.", formula: "Devuélvala (Verb) + en esta estación antes de las seis (Object)" }
    ],
    grammar_note: {
      term: "Reflexive Command (Póngase) + Object Command (Devuélvala)",
      translation: "Reflexive Command (Póngase) + Object Command (Devuélvala)",
      explanation: "Póngase = put on yourself; devuélvala = return it. Both formal commands.",
      example: "Póngase el casco antes de salir."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 2: preterite, regular, simple past narration
  {
    id: 's19',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'Buscando la Estación',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['estación', 'recto', 'esquina'],
    recycled_vocab: ['calle', 'metro', 'banco'],
    mascot_line: 'Asking directions in Spanish feels so empowering!',
    word_encounters_seed: ['estación', 'recto', 'esquina'],
    description: 'Asking a passerby for directions to the nearby subway station.',
    storyLines: [
      'Ayer caminé por esta calle buscando la estación.',
      'Disculpe, ¿sabe dónde está la estación de metro?',
      'Caminé recto y giré a la izquierda en la esquina.'
    ],
    storyTranslations: [
      'Yesterday I walked along this street looking for the station.',
      'Excuse me, do you know where the metro station is?',
      'I walked straight and turned left at the corner.'
    ],
    vocabulary: [
      { word: 'estación', meaning: 'station', pronunciation: 'ehs-tah-THYOHN' },
      { word: 'recto', meaning: 'straight ahead', pronunciation: 'REK-toh' },
      { word: 'esquina', meaning: 'corner', pronunciation: 'ehs-KEE-nah' }
    ],
    grammarNotes: [
      { title: 'Preterite Regular -ar (Caminé, Giré)', explanation: 'Regular -ar verbs end in -é in the 1st person singular past (yo caminé).', exampleFromStory: 'Caminé recto y giré a la izquierda.' }
    ],
    lines: [
      { text: "Ayer caminé por esta calle buscando la estación.", formula: "caminé (Verb) + por esta calle buscando la estación (Object) + ayer (Time)" },
      { text: "Disculpe, ¿sabe dónde está la estación de metro?", formula: "Disculpe, (Verb) + ¿sabe dónde está la estación de metro? (Object)" },
      { text: "Caminé recto y giré a la izquierda en la esquina.", formula: "Caminé (Verb) + recto y giré a la izquierda (Object) + en la esquina (Place)" }
    ],
    grammar_note: {
      term: "Preterite Regular -ar (Caminé, Giré)",
      translation: "Preterite Regular -ar (Caminé, Giré)",
      explanation: "Regular -ar verbs end in -é in the 1st person singular past (yo caminé).",
      example: "Caminé recto y giré a la izquierda."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's24',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'La Llave Perdida',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['llave', 'bolso', 'bolsillos'],
    recycled_vocab: ['habitación', 'busqué', 'perdí'],
    mascot_line: 'Finding lost keys is always such a relief!',
    word_encounters_seed: ['llave', 'bolso', 'bolsillos'],
    description: 'Searching the pockets and bag for a missing room key.',
    storyLines: [
      'Ayer perdí la llave de mi habitación.',
      'Busqué la llave en el bolso y en los bolsillos.',
      'Busqué en todas partes y la encontré.'
    ],
    storyTranslations: [
      'Yesterday I lost my room key.',
      'I looked for the key in the bag and in the pockets.',
      'I looked everywhere and I found it.'
    ],
    vocabulary: [
      { word: 'llave', meaning: 'key', pronunciation: 'LYAH-beh' },
      { word: 'bolso', meaning: 'bag/purse', pronunciation: 'BOL-soh' },
      { word: 'bolsillos', meaning: 'pockets', pronunciation: 'bol-SEE-lyohs' }
    ],
    grammarNotes: [
      { title: 'Preterite Narration (Perdí, Busqué, Encontré)', explanation: 'Used to narrate past actions completed at a specific point in time.', exampleFromStory: 'Busqué en todas partes y la encontré.' }
    ],
    lines: [
      { text: "Ayer perdí la llave de mi habitación.", formula: "perdí (Verb) + la llave de mi habitación (Object) + ayer (Time)" },
      { text: "Busqué la llave en el bolso y en los bolsillos.", formula: "Busqué (Verb) + la llave (Object) + en el bolso y en los bolsillos (Place)" },
      { text: "Busqué en todas partes y la encontré.", formula: "Busqué (Verb) + en todas partes y la encontré (Object)" }
    ],
    grammar_note: {
      term: "Preterite Narration (Perdí, Busqué, Encontré)",
      translation: "Preterite Narration (Perdí, Busqué, Encontré)",
      explanation: "Used to narrate past actions completed at a specific point in time.",
      example: "Busqué en todas partes y la encontré."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's25',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'Comprando Recuerdos',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['recuerdos', 'postales', 'cerámica'],
    recycled_vocab: ['tienda', 'compré', 'familia'],
    mascot_line: 'Postcards and ceramics make wonderful souvenirs.',
    word_encounters_seed: ['recuerdos', 'postales', 'cerámica'],
    description: 'Buying local postcards and souvenirs at a market stand.',
    storyLines: [
      'Ayer compré recuerdos para mi familia.',
      'Encontré postales y figuras de cerámica hermosas.',
      'Compré tres postales y una taza decorada.'
    ],
    storyTranslations: [
      'Yesterday I bought souvenirs for my family.',
      'I found beautiful postcards and ceramic figures.',
      'I bought three postcards and a decorated mug.'
    ],
    vocabulary: [
      { word: 'recuerdos', meaning: 'souvenirs/memories', pronunciation: 'reh-KWER-dohs' },
      { word: 'postales', meaning: 'postcards', pronunciation: 'pohs-TAH-lehs' },
      { word: 'cerámica', meaning: 'ceramics', pronunciation: 'theh-RAH-mee-kah' }
    ],
    grammarNotes: [
      { title: '1st Person Preterite (Compré)', explanation: 'Use "compré" to say "I bought" in the completed past.', exampleFromStory: 'Ayer compré recuerdos para mi familia.' }
    ],
    lines: [
      { text: "Ayer compré recuerdos para mi familia.", formula: "compré (Verb) + recuerdos para mi familia (Object) + ayer (Time)" },
      { text: "Encontré postales y figuras de cerámica hermosas.", formula: "Encontré (Verb) + postales y figuras de cerámica hermosas (Object)" },
      { text: "Compré tres postales y una taza decorada.", formula: "Compré (Verb) + tres postales y una taza decorada (Object)" }
    ],
    grammar_note: {
      term: "1st Person Preterite (Compré)",
      translation: "1st Person Preterite (Compré)",
      explanation: "Use \"compré\" to say \"I bought\" in the completed past.",
      example: "Ayer compré recuerdos para mi familia."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's119',
    lesson: 26,
    cefr_badge: 'A2',
    title: 'El Paseo por la Playa',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['conchas', 'recogí', 'puesta de sol'],
    recycled_vocab: ['playa', 'caminé', 'arena'],
    mascot_line: 'Collecting seashells at sunset on the beach!',
    word_encounters_seed: ['conchas', 'recogí', 'puesta de sol'],
    description: 'Walking along the beach and collecting shells.',
    storyLines: [
      'Ayer caminé por la playa al atardecer.',
      'Recogí muchas conchas bonitas en la arena.',
      'Vi una puesta de sol increíble.'
    ],
    storyTranslations: [
      'Yesterday I walked along the beach at sunset.',
      'I collected many pretty shells in the sand.',
      'I saw an incredible sunset.'
    ],
    vocabulary: [
      { word: 'conchas', meaning: 'shells', pronunciation: 'KOHN-chahs' },
      { word: 'recogí', meaning: 'I collected', pronunciation: 'rreh-koh-HEE' },
      { word: 'puesta de sol', meaning: 'sunset', pronunciation: 'PWEHS-tah deh sohl' }
    ],
    grammarNotes: [
      { title: 'Preterite -er/-ir (Recogí, Vi)', explanation: 'Regular -er/-ir preterite: yo recogí, yo vi. Completed single past actions.', exampleFromStory: 'Recogí muchas conchas bonitas en la arena.' }
    ],
    lines: [
      { text: "Ayer caminé por la playa al atardecer.", formula: "caminé (Verb) + por la playa (Object) + al atardecer (Place) + ayer (Time)" },
      { text: "Recogí muchas conchas bonitas en la arena.", formula: "Recogí (Verb) + muchas conchas bonitas (Object) + en la arena (Place)" },
      { text: "Vi una puesta de sol increíble.", formula: "Vi (Verb) + una puesta de sol increíble (Object)" }
    ],
    grammar_note: {
      term: "Preterite -er/-ir (Recogí, Vi)",
      translation: "Preterite -er/-ir (Recogí, Vi)",
      explanation: "Regular -er/-ir preterite: yo recogí, yo vi. Completed single past actions.",
      example: "Recogí muchas conchas bonitas en la arena."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's120',
    lesson: 26,
    cefr_badge: 'A2',
    title: 'La Visita al Museo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['cuadros', 'guió', 'explicó'],
    recycled_vocab: ['museo', 'visité', 'famoso'],
    mascot_line: 'A guided tour through a famous art museum!',
    word_encounters_seed: ['cuadros', 'guió', 'explicó'],
    description: 'A guided visit to a museum.',
    storyLines: [
      'Ayer visité un museo de arte famoso.',
      'Un guía nos guió por las salas de cuadros.',
      'Nos explicó la historia de cada pintura.'
    ],
    storyTranslations: [
      'Yesterday I visited a famous art museum.',
      'A guide led us through the painting rooms.',
      'He explained the history of each painting.'
    ],
    vocabulary: [
      { word: 'cuadros', meaning: 'paintings', pronunciation: 'KWAH-drohs' },
      { word: 'guió', meaning: 'guided/led', pronunciation: 'gee-OH' },
      { word: 'explicó', meaning: 'explained', pronunciation: 'ehks-plee-KOH' }
    ],
    grammarNotes: [
      { title: '3rd Person Preterite (Guió, Explicó)', explanation: 'Third person singular preterite: -ar → -ó (explicó), -ir → -ió.', exampleFromStory: 'Un guía nos guió por las salas.' }
    ],
    lines: [
      { text: "Ayer visité un museo de arte famoso.", formula: "visité (Verb) + un museo de arte famoso (Object) + ayer (Time)" },
      { text: "Un guía nos guió por las salas de cuadros.", formula: "Un (Verb) + guía nos guió por las salas de cuadros (Object)" },
      { text: "Nos explicó la historia de cada pintura.", formula: "Nos (Verb) + explicó la historia de cada pintura (Object)" }
    ],
    grammar_note: {
      term: "3rd Person Preterite (Guió, Explicó)",
      translation: "3rd Person Preterite (Guió, Explicó)",
      explanation: "Third person singular preterite: -ar → -ó (explicó), -ir → -ió.",
      example: "Un guía nos guió por las salas."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's121',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'El Viaje en Tren',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['viajé', 'llegó', 'durmió'],
    recycled_vocab: ['tren', 'Madrid', 'horas'],
    mascot_line: 'A long train journey through the Spanish countryside!',
    word_encounters_seed: ['viajé', 'llegó', 'durmió'],
    description: 'Taking a long train ride.',
    storyLines: [
      'Viajé en tren de Barcelona a Madrid.',
      'El tren llegó a las cinco de la tarde.',
      'Mi hermano durmió durante todo el viaje.'
    ],
    storyTranslations: [
      'I traveled by train from Barcelona to Madrid.',
      'The train arrived at five in the afternoon.',
      'My brother slept during the entire trip.'
    ],
    vocabulary: [
      { word: 'viajé', meaning: 'I traveled', pronunciation: 'byah-HEH' },
      { word: 'llegó', meaning: 'arrived', pronunciation: 'lyeh-GOH' },
      { word: 'durmió', meaning: 'slept', pronunciation: 'door-MYOH' }
    ],
    grammarNotes: [
      { title: 'Stem-Changing Preterite (Durmió)', explanation: 'Dormir changes stem in preterite 3rd person: durmió (not dormió).', exampleFromStory: 'Mi hermano durmió durante todo el viaje.' }
    ],
    lines: [
      { text: "Viajé en tren de Barcelona a Madrid.", formula: "Viajé (Verb) + en tren de Barcelona a Madrid (Object)" },
      { text: "El tren llegó a las cinco de la tarde.", formula: "El (Verb) + tren llegó a las cinco de la (Object) + tarde (Time)" },
      { text: "Mi hermano durmió durante todo el viaje.", formula: "Mi (Verb) + hermano durmió durante todo el viaje (Object)" }
    ],
    grammar_note: {
      term: "Stem-Changing Preterite (Durmió)",
      translation: "Stem-Changing Preterite (Durmió)",
      explanation: "Dormir changes stem in preterite 3rd person: durmió (not dormió).",
      example: "Mi hermano durmió durante todo el viaje."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's122',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'La Fiesta de Anoche',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['bailé', 'conocí', 'anoche'],
    recycled_vocab: ['fiesta', 'amigos', 'noche'],
    mascot_line: 'Dancing and meeting new people at a party!',
    word_encounters_seed: ['bailé', 'conocí', 'anoche'],
    description: 'Dancing and meeting people at a party.',
    storyLines: [
      'Anoche fui a una fiesta con mis amigos.',
      'Bailé toda la noche con la música.',
      'Conocí a muchas personas interesantes.'
    ],
    storyTranslations: [
      'Last night I went to a party with my friends.',
      'I danced all night to the music.',
      'I met many interesting people.'
    ],
    vocabulary: [
      { word: 'bailé', meaning: 'I danced', pronunciation: 'bai-LEH' },
      { word: 'conocí', meaning: 'I met', pronunciation: 'koh-noh-THEE' },
      { word: 'anoche', meaning: 'last night', pronunciation: 'ah-NOH-cheh' }
    ],
    grammarNotes: [
      { title: 'Preterite Time Markers (Anoche)', explanation: 'Anoche = last night, a time marker that triggers preterite.', exampleFromStory: 'Anoche fui a una fiesta con mis amigos.' }
    ],
    lines: [
      { text: "Anoche fui a una fiesta con mis amigos.", formula: "fui (Verb) + a una fiesta con mis amigos (Object) + anoche (Time)" },
      { text: "Bailé toda la noche con la música.", formula: "Bailé (Verb) + tod (Object) + a la noche con la música (Place)" },
      { text: "Conocí a muchas personas interesantes.", formula: "Conocí (Verb) + a muchas personas interesantes (Object)" }
    ],
    grammar_note: {
      term: "Preterite Time Markers (Anoche)",
      translation: "Preterite Time Markers (Anoche)",
      explanation: "Anoche = last night, a time marker that triggers preterite.",
      example: "Anoche fui a una fiesta con mis amigos."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's123',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'El Primer Día de Trabajo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['empecé', 'oficina', 'presentar'],
    recycled_vocab: ['trabajo', 'compañeros', 'llegé'],
    mascot_line: 'First day at a new job meeting colleagues!',
    word_encounters_seed: ['empecé', 'oficina', 'presentar'],
    description: 'Starting a new job at an office.',
    storyLines: [
      'Empecé mi nuevo trabajo el lunes.',
      'Llegué a la oficina a las ocho.',
      'Me presenté a todos mis compañeros.'
    ],
    storyTranslations: [
      'I started my new job on Monday.',
      'I arrived at the office at eight.',
      'I introduced myself to all my colleagues.'
    ],
    vocabulary: [
      { word: 'empecé', meaning: 'I started', pronunciation: 'ehm-peh-THEH' },
      { word: 'oficina', meaning: 'office', pronunciation: 'oh-fee-THEE-nah' },
      { word: 'presentar', meaning: 'to introduce', pronunciation: 'preh-sehn-TAR' }
    ],
    grammarNotes: [
      { title: 'Spelling Change Preterite (Empecé, Llegué)', explanation: 'Empezar → empecé (z→c); llegar → llegué (g→gu) to preserve pronunciation.', exampleFromStory: 'Empecé mi nuevo trabajo el lunes.' }
    ],
    lines: [
      { text: "Empecé mi nuevo trabajo el lunes.", formula: "Empecé (Verb) + mi nuevo trabajo (Object) + el lunes (Time)" },
      { text: "Llegué a la oficina a las ocho.", formula: "Llegué (Verb) + a la oficina a las ocho (Place)" },
      { text: "Me presenté a todos mis compañeros.", formula: "Me (Verb) + presenté a todos mis compañeros (Object)" }
    ],
    grammar_note: {
      term: "Spelling Change Preterite (Empecé, Llegué)",
      translation: "Spelling Change Preterite (Empecé, Llegué)",
      explanation: "Empezar → empecé (z→c); llegar → llegué (g→gu) to preserve pronunciation.",
      example: "Empecé mi nuevo trabajo el lunes."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's124',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'La Excursión al Campo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['excursión', 'monté', 'fotografías'],
    recycled_vocab: ['campo', 'montaña', 'tomé'],
    mascot_line: 'Hiking in the countryside and taking photos!',
    word_encounters_seed: ['excursión', 'monté', 'fotografías'],
    description: 'A day trip to the countryside.',
    storyLines: [
      'El sábado hice una excursión al campo.',
      'Monté a caballo por la montaña.',
      'Tomé muchas fotografías del paisaje.'
    ],
    storyTranslations: [
      'On Saturday I went on a trip to the countryside.',
      'I rode a horse through the mountain.',
      'I took many photographs of the landscape.'
    ],
    vocabulary: [
      { word: 'excursión', meaning: 'day trip', pronunciation: 'ehks-koor-SYOHN' },
      { word: 'monté', meaning: 'I rode', pronunciation: 'mohn-TEH' },
      { word: 'fotografías', meaning: 'photographs', pronunciation: 'foh-toh-grah-FEE-ahs' }
    ],
    grammarNotes: [
      { title: 'Preterite Irregular (Hice)', explanation: 'Hacer → hice in first person preterite. Common irregular.', exampleFromStory: 'El sábado hice una excursión al campo.' }
    ],
    lines: [
      { text: "El sábado hice una excursión al campo.", formula: "hice (Verb) + una excursión (Object) + al campo (Place) + el sábado (Time)" },
      { text: "Monté a caballo por la montaña.", formula: "Monté (Verb) + a caballo (Object) + por la montaña (Place)" },
      { text: "Tomé muchas fotografías del paisaje.", formula: "Tomé (Verb) + muchas fotografías del paisaje (Object)" }
    ],
    grammar_note: {
      term: "Preterite Irregular (Hice)",
      translation: "Preterite Irregular (Hice)",
      explanation: "Hacer → hice in first person preterite. Common irregular.",
      example: "El sábado hice una excursión al campo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's125',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'La Cocina Española',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['cociné', 'tortilla', 'ingredientes'],
    recycled_vocab: ['cocina', 'huevos', 'patatas'],
    mascot_line: 'Cooking a traditional Spanish tortilla from scratch!',
    word_encounters_seed: ['cociné', 'tortilla', 'ingredientes'],
    description: 'Cooking a Spanish tortilla at home.',
    storyLines: [
      'Ayer cociné una tortilla española.',
      'Compré los ingredientes en el mercado.',
      'Usé huevos, patatas y cebolla.'
    ],
    storyTranslations: [
      'Yesterday I cooked a Spanish tortilla.',
      'I bought the ingredients at the market.',
      'I used eggs, potatoes, and onion.'
    ],
    vocabulary: [
      { word: 'cociné', meaning: 'I cooked', pronunciation: 'koh-thee-NEH' },
      { word: 'tortilla', meaning: 'Spanish omelette', pronunciation: 'tohr-TEE-lyah' },
      { word: 'ingredientes', meaning: 'ingredients', pronunciation: 'een-greh-DYEHN-tehs' }
    ],
    grammarNotes: [
      { title: 'Sequential Past Actions', explanation: 'Use preterite to list completed actions in order: cociné, compré, usé.', exampleFromStory: 'Ayer cociné una tortilla española.' }
    ],
    lines: [
      { text: "Ayer cociné una tortilla española.", formula: "cociné (Verb) + una tortilla española (Object) + ayer (Time)" },
      { text: "Compré los ingredientes en el mercado.", formula: "Compré (Verb) + los ingredientes (Object) + en el mercado (Place)" },
      { text: "Usé huevos, patatas y cebolla.", formula: "Usé (Verb) + huevos, patatas y cebolla (Object)" }
    ],
    grammar_note: {
      term: "Sequential Past Actions",
      translation: "Sequential Past Actions",
      explanation: "Use preterite to list completed actions in order: cociné, compré, usé.",
      example: "Ayer cociné una tortilla española."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's126',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'El Partido de Fútbol',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 2,
    new_grammar_point: 'preterite, regular, simple past narration',
    new_vocab: ['partido', 'ganó', 'goles'],
    recycled_vocab: ['fútbol', 'equipo', 'vimos'],
    mascot_line: 'Cheering for the winning team at the match!',
    word_encounters_seed: ['partido', 'ganó', 'goles'],
    description: 'Watching a football match.',
    storyLines: [
      'Ayer vimos un partido de fútbol.',
      'El equipo local ganó tres a uno.',
      'Metieron tres goles en la segunda parte.'
    ],
    storyTranslations: [
      'Yesterday we watched a football match.',
      'The local team won three to one.',
      'They scored three goals in the second half.'
    ],
    vocabulary: [
      { word: 'partido', meaning: 'match/game', pronunciation: 'pahr-TEE-doh' },
      { word: 'ganó', meaning: 'won', pronunciation: 'gah-NOH' },
      { word: 'goles', meaning: 'goals', pronunciation: 'GOH-lehs' }
    ],
    grammarNotes: [
      { title: '3rd Person Plural Preterite (Metieron)', explanation: 'Meter → metieron. Third person plural preterite -ieron ending.', exampleFromStory: 'Metieron tres goles en la segunda parte.' }
    ],
    lines: [
      { text: "Ayer vimos un partido de fútbol.", formula: "vimos (Verb) + un partido de fútbol (Object) + ayer (Time)" },
      { text: "El equipo local ganó tres a uno.", formula: "El (Verb) + equipo loc (Object) + al ganó tres a uno (Place)" },
      { text: "Metieron tres goles en la segunda parte.", formula: "Metieron (Verb) + tres goles (Object) + en la segunda parte (Place)" }
    ],
    grammar_note: {
      term: "3rd Person Plural Preterite (Metieron)",
      translation: "3rd Person Plural Preterite (Metieron)",
      explanation: "Meter → metieron. Third person plural preterite -ieron ending.",
      example: "Metieron tres goles en la segunda parte."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 3: imperfect for background, preterite/imperfect contrast
  {
    id: 's20',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'El Taxi a Madrid',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['aeropuerto', 'tráfico', 'vuelo'],
    recycled_vocab: ['horas', 'calle', 'vuelo'],
    mascot_line: 'Taxis through city traffic are great for listening practice.',
    word_encounters_seed: ['aeropuerto', 'tráfico', 'vuelo'],
    description: 'Hailing a taxi cab to the airport and discussing the traffic.',
    storyLines: [
      'Había mucho tráfico cuando tomé el taxi al aeropuerto.',
      'El sol brillaba mientras viajábamos por la autovía.',
      'Llegué a tiempo porque mi vuelo salía en tres horas.'
    ],
    storyTranslations: [
      'There was a lot of traffic when I took the taxi to the airport.',
      'The sun was shining while we were traveling along the highway.',
      'I arrived on time because my flight was leaving in three hours.'
    ],
    vocabulary: [
      { word: 'aeropuerto', meaning: 'airport', pronunciation: 'ah-eh-roh-PWER-toh' },
      { word: 'tráfico', meaning: 'traffic', pronunciation: 'TRAH-fee-koh' },
      { word: 'vuelo', meaning: 'flight', pronunciation: 'BWEL-oh' }
    ],
    grammarNotes: [
      { title: 'Imperfect Background (Había / Brillaba)', explanation: 'Imperfect describes background scenes (había/brillaba) interrupted by preterite actions (tomé/llegué).', exampleFromStory: 'Había mucho tráfico cuando tomé el taxi...' }
    ],
    lines: [
      { text: "Había mucho tráfico cuando tomé el taxi al aeropuerto.", formula: "Había (Verb) + mucho tráfico cuando tomé el taxi (Object) + al aeropuerto (Place)" },
      { text: "El sol brillaba mientras viajábamos por la autovía.", formula: "El sol (Subject) + brillaba (Verb) + mientras viajábamos (Object) + por la autovía (Place)" },
      { text: "Llegué a tiempo porque mi vuelo salía en tres horas.", formula: "Llegué (Verb) + a tiempo porque mi vuelo salía en tres horas (Object)" }
    ],
    grammar_note: {
      term: "Imperfect Background (Había / Brillaba)",
      translation: "Imperfect Background (Había / Brillaba)",
      explanation: "Imperfect describes background scenes (había/brillaba) interrupted by preterite actions (tomé/llegué).",
      example: "Había mucho tráfico cuando tomé el taxi..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's26',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'El Clima en España',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['paraguas', 'abrigo', 'viaje'],
    recycled_vocab: ['tiempo', 'lluvia', 'frío'],
    mascot_line: 'Rain in northern Spain means cozy umbrella walks.',
    word_encounters_seed: ['paraguas', 'abrigo', 'viaje'],
    description: 'Checking the weather forecast to plan a trip pack list.',
    storyLines: [
      'Hacía mucho frío cuando salí de viaje.',
      'Llovía bastante mientras caminaba por la ciudad.',
      'Llevaba un buen abrigo y un paraguas grande.'
    ],
    storyTranslations: [
      'It was very cold when I left on my trip.',
      'It was raining quite a bit while I was walking through the city.',
      'I was wearing a good coat and a big umbrella.'
    ],
    vocabulary: [
      { word: 'paraguas', meaning: 'umbrella', pronunciation: 'pah-RAH-gwahs' },
      { word: 'abrigo', meaning: 'coat', pronunciation: 'ah-BREE-goh' },
      { word: 'viaje', meaning: 'trip', pronunciation: 'BYAH-heh' }
    ],
    grammarNotes: [
      { title: 'Imperfect Weather Description (Hacía frío)', explanation: 'Use imperfect ("hacía frío", "llovía") for past weather background conditions.', exampleFromStory: 'Hacía mucho frío cuando salí...' }
    ],
    lines: [
      { text: "Hacía mucho frío cuando salí de viaje.", formula: "Hacía (Verb) + mucho frío cuando salí de viaje (Object)" },
      { text: "Llovía bastante mientras caminaba por la ciudad.", formula: "Llovía (Verb) + bastante mientras caminaba (Object) + por la ciudad (Place)" },
      { text: "Llevaba un buen abrigo y un paraguas grande.", formula: "Llevaba (Verb) + un buen abrigo y un paraguas grande (Object)" }
    ],
    grammar_note: {
      term: "Imperfect Weather Description (Hacía frío)",
      translation: "Imperfect Weather Description (Hacía frío)",
      explanation: "Use imperfect (\"hacía frío\", \"llovía\") for past weather background conditions.",
      example: "Hacía mucho frío cuando salí..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's127',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'La Niñez en el Pueblo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['pueblo', 'jugaba', 'vecinos'],
    recycled_vocab: ['niño', 'casa', 'todos'],
    mascot_line: 'Childhood memories of playing in the village!',
    word_encounters_seed: ['pueblo', 'jugaba', 'vecinos'],
    description: 'Childhood memories of a village.',
    storyLines: [
      'Cuando era niño, vivía en un pueblo pequeño.',
      'Jugaba con los vecinos todos los días.',
      'Un día llegó una familia nueva al pueblo.'
    ],
    storyTranslations: [
      'When I was a child, I lived in a small village.',
      'I played with the neighbors every day.',
      'One day a new family arrived in the village.'
    ],
    vocabulary: [
      { word: 'pueblo', meaning: 'village/town', pronunciation: 'PWEH-bloh' },
      { word: 'jugaba', meaning: 'used to play', pronunciation: 'hoo-GAH-bah' },
      { word: 'vecinos', meaning: 'neighbors', pronunciation: 'beh-THEE-nohs' }
    ],
    grammarNotes: [
      { title: 'Imperfect for Habits (Jugaba, Vivía)', explanation: 'Imperfect describes habitual past actions: jugaba = used to play.', exampleFromStory: 'Jugaba con los vecinos todos los días.' }
    ],
    lines: [
      { text: "Cuando era niño, vivía en un pueblo pequeño.", formula: "Cuando (Verb) + era niño, vivía en un pueblo pequeño (Object)" },
      { text: "Jugaba con los vecinos todos los días.", formula: "Jugaba (Verb) + con los vecinos todos los días (Object)" },
      { text: "Un día llegó una familia nueva al pueblo.", formula: "Un (Verb) + día llegó una familia nueva (Object) + al pueblo (Place)" }
    ],
    grammar_note: {
      term: "Imperfect for Habits (Jugaba, Vivía)",
      translation: "Imperfect for Habits (Jugaba, Vivía)",
      explanation: "Imperfect describes habitual past actions: jugaba = used to play.",
      example: "Jugaba con los vecinos todos los días."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's128',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'El Primer Viaje',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['nervioso', 'emocionado', 'avión'],
    recycled_vocab: ['viaje', 'aeropuerto', 'primer'],
    mascot_line: 'Nervous and excited for the very first plane ride!',
    word_encounters_seed: ['nervioso', 'emocionado', 'avión'],
    description: 'The first time flying on an airplane.',
    storyLines: [
      'Estaba muy nervioso porque era mi primer vuelo.',
      'El avión despegó mientras yo miraba por la ventana.',
      'Estaba emocionado cuando vi las nubes.'
    ],
    storyTranslations: [
      'I was very nervous because it was my first flight.',
      'The plane took off while I was looking out the window.',
      'I was excited when I saw the clouds.'
    ],
    vocabulary: [
      { word: 'nervioso', meaning: 'nervous', pronunciation: 'nehr-BYOH-soh' },
      { word: 'emocionado', meaning: 'excited', pronunciation: 'eh-moh-thyoh-NAH-doh' },
      { word: 'avión', meaning: 'airplane', pronunciation: 'ah-BYOHN' }
    ],
    grammarNotes: [
      { title: 'Preterite vs Imperfect (Despegó vs Miraba)', explanation: 'Preterite for sudden action (despegó), imperfect for ongoing state (miraba).', exampleFromStory: 'El avión despegó mientras yo miraba por la ventana.' }
    ],
    lines: [
      { text: "Estaba muy nervioso porque era mi primer vuelo.", formula: "Estaba (Verb) + muy nervioso porque era mi primer vuelo (Object)" },
      { text: "El avión despegó mientras yo miraba por la ventana.", formula: "El (Verb) + avión despegó mientras yo miraba (Object) + por la ventana (Place)" },
      { text: "Estaba emocionado cuando vi las nubes.", formula: "Estaba (Verb) + emocionado cuando vi las nubes (Object)" }
    ],
    grammar_note: {
      term: "Preterite vs Imperfect (Despegó vs Miraba)",
      translation: "Preterite vs Imperfect (Despegó vs Miraba)",
      explanation: "Preterite for sudden action (despegó), imperfect for ongoing state (miraba).",
      example: "El avión despegó mientras yo miraba por la ventana."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's129',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'Los Veranos de la Abuela',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['abuela', 'galletas', 'contaba'],
    recycled_vocab: ['verano', 'casa', 'historias'],
    mascot_line: 'Summer at grandma\'s house with cookies and stories!',
    word_encounters_seed: ['abuela', 'galletas', 'contaba'],
    description: 'Spending summers at grandmother\'s house.',
    storyLines: [
      'Cada verano iba a la casa de mi abuela.',
      'Ella siempre hacía galletas para nosotros.',
      'Por la noche nos contaba historias antiguas.'
    ],
    storyTranslations: [
      'Every summer I went to my grandmother\'s house.',
      'She always made cookies for us.',
      'At night she told us old stories.'
    ],
    vocabulary: [
      { word: 'abuela', meaning: 'grandmother', pronunciation: 'ah-BWEH-lah' },
      { word: 'galletas', meaning: 'cookies', pronunciation: 'gah-LYEH-tahs' },
      { word: 'contaba', meaning: 'used to tell', pronunciation: 'kohn-TAH-bah' }
    ],
    grammarNotes: [
      { title: 'Imperfect for Repeated Past (Iba, Hacía)', explanation: 'Imperfect for regularly repeated actions: iba = used to go; hacía = used to make.', exampleFromStory: 'Cada verano iba a la casa de mi abuela.' }
    ],
    lines: [
      { text: "Cada verano iba a la casa de mi abuela.", formula: "Cada (Verb) + verano iba (Object) + a la casa de mi abuela (Place)" },
      { text: "Ella siempre hacía galletas para nosotros.", formula: "Ella (Subject) + hacía (Verb) + galletas para nosotros (Object) + siempre (Time)" },
      { text: "Por la noche nos contaba historias antiguas.", formula: "Por la noche nos contaba historias antiguas (Place)" }
    ],
    grammar_note: {
      term: "Imperfect for Repeated Past (Iba, Hacía)",
      translation: "Imperfect for Repeated Past (Iba, Hacía)",
      explanation: "Imperfect for regularly repeated actions: iba = used to go; hacía = used to make.",
      example: "Cada verano iba a la casa de mi abuela."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's130',
    lesson: 27,
    cefr_badge: 'B1',
    title: 'El Mercado Antiguo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['vendedores', 'gritaban', 'olía'],
    recycled_vocab: ['mercado', 'frutas', 'gente'],
    mascot_line: 'The old market alive with vendors and aromas!',
    word_encounters_seed: ['vendedores', 'gritaban', 'olía'],
    description: 'Describing an old market scene.',
    storyLines: [
      'El mercado estaba lleno de gente.',
      'Los vendedores gritaban los precios de las frutas.',
      'Todo olía a especias y pan fresco.'
    ],
    storyTranslations: [
      'The market was full of people.',
      'The vendors were shouting the prices of the fruits.',
      'Everything smelled like spices and fresh bread.'
    ],
    vocabulary: [
      { word: 'vendedores', meaning: 'vendors', pronunciation: 'behn-deh-DOH-rehs' },
      { word: 'gritaban', meaning: 'were shouting', pronunciation: 'gree-TAH-bahn' },
      { word: 'olía', meaning: 'smelled', pronunciation: 'oh-LEE-ah' }
    ],
    grammarNotes: [
      { title: 'Imperfect Description (Estaba, Gritaban, Olía)', explanation: 'Imperfect paints a descriptive past scene with ongoing states.', exampleFromStory: 'Los vendedores gritaban los precios.' }
    ],
    lines: [
      { text: "El mercado estaba lleno de gente.", formula: "El (Verb) + mercado estaba lleno de gente (Object)" },
      { text: "Los vendedores gritaban los precios de las frutas.", formula: "Los (Verb) + vendedores gritaban los precios de las frutas (Object)" },
      { text: "Todo olía a especias y pan fresco.", formula: "Todo (Verb) + olía a especias y pan fresco (Object)" }
    ],
    grammar_note: {
      term: "Imperfect Description (Estaba, Gritaban, Olía)",
      translation: "Imperfect Description (Estaba, Gritaban, Olía)",
      explanation: "Imperfect paints a descriptive past scene with ongoing states.",
      example: "Los vendedores gritaban los precios."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's131',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'La Escuela de Antes',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['uniforme', 'llevaba', 'estricto'],
    recycled_vocab: ['escuela', 'profesor', 'clase'],
    mascot_line: 'School days with uniforms and strict teachers!',
    word_encounters_seed: ['uniforme', 'llevaba', 'estricto'],
    description: 'Remembering school days.',
    storyLines: [
      'Cuando iba a la escuela, llevaba uniforme.',
      'El profesor era muy estricto con nosotros.',
      'Un día un alumno nuevo llegó a la clase.'
    ],
    storyTranslations: [
      'When I went to school, I wore a uniform.',
      'The teacher was very strict with us.',
      'One day a new student arrived in class.'
    ],
    vocabulary: [
      { word: 'uniforme', meaning: 'uniform', pronunciation: 'oo-nee-FOHR-meh' },
      { word: 'llevaba', meaning: 'used to wear', pronunciation: 'lyeh-BAH-bah' },
      { word: 'estricto', meaning: 'strict', pronunciation: 'ehs-TREEK-toh' }
    ],
    grammarNotes: [
      { title: 'Imperfect/Preterite Mix', explanation: 'Imperfect for ongoing habit (llevaba, era) vs preterite for single event (llegó).', exampleFromStory: 'Un día un alumno nuevo llegó a la clase.' }
    ],
    lines: [
      { text: "Cuando iba a la escuela, llevaba uniforme.", formula: "Cuando (Verb) + iba (Object) + a la escuela, llevaba uniforme (Place)" },
      { text: "El profesor era muy estricto con nosotros.", formula: "El profesor (Subject) + era (Verb) + muy estricto con nosotros (Object)" },
      { text: "Un día un alumno nuevo llegó a la clase.", formula: "Un (Verb) + día un alumno nuevo llegó (Object) + a la clase (Place)" }
    ],
    grammar_note: {
      term: "Imperfect/Preterite Mix",
      translation: "Imperfect/Preterite Mix",
      explanation: "Imperfect for ongoing habit (llevaba, era) vs preterite for single event (llegó).",
      example: "Un día un alumno nuevo llegó a la clase."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's132',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'La Tormenta de Verano',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['tormenta', 'relámpagos', 'corrimos'],
    recycled_vocab: ['llovía', 'verano', 'casa'],
    mascot_line: 'Running inside when the summer storm hit!',
    word_encounters_seed: ['tormenta', 'relámpagos', 'corrimos'],
    description: 'A sudden summer storm.',
    storyLines: [
      'Hacía mucho calor cuando llegó la tormenta.',
      'Llovía muy fuerte y había relámpagos.',
      'Corrimos rápido a la casa.'
    ],
    storyTranslations: [
      'It was very hot when the storm arrived.',
      'It was raining heavily and there was lightning.',
      'We ran quickly to the house.'
    ],
    vocabulary: [
      { word: 'tormenta', meaning: 'storm', pronunciation: 'tohr-MEHN-tah' },
      { word: 'relámpagos', meaning: 'lightning', pronunciation: 'rreh-LAHM-pah-gohs' },
      { word: 'corrimos', meaning: 'we ran', pronunciation: 'koh-RREE-mohs' }
    ],
    grammarNotes: [
      { title: 'Imperfect Background + Preterite Action', explanation: 'Imperfect sets the scene (hacía calor, llovía), preterite for sudden events (llegó, corrimos).', exampleFromStory: 'Hacía mucho calor cuando llegó la tormenta.' }
    ],
    lines: [
      { text: "Hacía mucho calor cuando llegó la tormenta.", formula: "Hacía (Verb) + mucho calor cuando llegó la tormenta (Object)" },
      { text: "Llovía muy fuerte y había relámpagos.", formula: "Llovía (Verb) + muy fuerte y había relámpagos (Object)" },
      { text: "Corrimos rápido a la casa.", formula: "Corrimos (Verb) + rápido (Object) + a la casa (Place)" }
    ],
    grammar_note: {
      term: "Imperfect Background + Preterite Action",
      translation: "Imperfect Background + Preterite Action",
      explanation: "Imperfect sets the scene (hacía calor, llovía), preterite for sudden events (llegó, corrimos).",
      example: "Hacía mucho calor cuando llegó la tormenta."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's133',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'Las Tardes de Domingo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['paseábamos', 'helado', 'quiosco'],
    recycled_vocab: ['domingo', 'familia', 'parque'],
    mascot_line: 'Sunday strolls with ice cream in the park!',
    word_encounters_seed: ['paseábamos', 'helado', 'quiosco'],
    description: 'Habitual Sunday afternoon walks.',
    storyLines: [
      'Los domingos paseábamos por el parque.',
      'Siempre comprábamos un helado en el quiosco.',
      'Un domingo encontramos un gatito perdido.'
    ],
    storyTranslations: [
      'On Sundays we used to walk through the park.',
      'We always bought an ice cream at the kiosk.',
      'One Sunday we found a lost kitten.'
    ],
    vocabulary: [
      { word: 'paseábamos', meaning: 'we used to stroll', pronunciation: 'pah-seh-AH-bah-mohs' },
      { word: 'helado', meaning: 'ice cream', pronunciation: 'eh-LAH-doh' },
      { word: 'quiosco', meaning: 'kiosk', pronunciation: 'KYOHS-koh' }
    ],
    grammarNotes: [
      { title: 'Nosotros Imperfect (-ábamos)', explanation: 'Paseábamos, comprábamos: nosotros imperfect -ar verbs end in -ábamos.', exampleFromStory: 'Los domingos paseábamos por el parque.' }
    ],
    lines: [
      { text: "Los domingos paseábamos por el parque.", formula: "Los (Verb) + domingos paseábamos por el parque (Object)" },
      { text: "Siempre comprábamos un helado en el quiosco.", formula: "comprábamos (Verb) + un helado (Object) + en el quiosco (Place) + siempre (Time)" },
      { text: "Un domingo encontramos un gatito perdido.", formula: "Un (Verb) + domingo encontramos un gatito perdido (Object)" }
    ],
    grammar_note: {
      term: "Nosotros Imperfect (-ábamos)",
      translation: "Nosotros Imperfect (-ábamos)",
      explanation: "Paseábamos, comprábamos: nosotros imperfect -ar verbs end in -ábamos.",
      example: "Los domingos paseábamos por el parque."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's134',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'El Abuelo y la Radio',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 3,
    new_grammar_point: 'imperfect for background, preterite/imperfect contrast',
    new_vocab: ['radio', 'escuchaba', 'sillón'],
    recycled_vocab: ['abuelo', 'noticias', 'mañana'],
    mascot_line: 'Grandpa listening to the radio in his armchair!',
    word_encounters_seed: ['radio', 'escuchaba', 'sillón'],
    description: 'Grandfather\'s daily routine with the radio.',
    storyLines: [
      'Mi abuelo siempre escuchaba la radio por la mañana.',
      'Se sentaba en su sillón favorito.',
      'Un día la radio se rompió y se puso triste.'
    ],
    storyTranslations: [
      'My grandfather always listened to the radio in the morning.',
      'He sat in his favorite armchair.',
      'One day the radio broke and he became sad.'
    ],
    vocabulary: [
      { word: 'radio', meaning: 'radio', pronunciation: 'RRAH-dyoh' },
      { word: 'escuchaba', meaning: 'used to listen', pronunciation: 'ehs-koo-CHAH-bah' },
      { word: 'sillón', meaning: 'armchair', pronunciation: 'see-LYOHN' }
    ],
    grammarNotes: [
      { title: 'Habitual Imperfect vs Interrupting Preterite', explanation: 'Escuchaba = habitual past; se rompió = sudden interruption in preterite.', exampleFromStory: 'Un día la radio se rompió y se puso triste.' }
    ],
    lines: [
      { text: "Mi abuelo siempre escuchaba la radio por la mañana.", formula: "Mi (Verb) + abuelo siempre escuchab (Object) + a la radio por la (Place) + mañana (Time)" },
      { text: "Se sentaba en su sillón favorito.", formula: "Se (Verb) + sentaba (Object) + en su sillón favorito (Place)" },
      { text: "Un día la radio se rompió y se puso triste.", formula: "Un (Verb) + dí (Object) + a la radio se rompió y se puso triste (Place)" }
    ],
    grammar_note: {
      term: "Habitual Imperfect vs Interrupting Preterite",
      translation: "Habitual Imperfect vs Interrupting Preterite",
      explanation: "Escuchaba = habitual past; se rompió = sudden interruption in preterite.",
      example: "Un día la radio se rompió y se puso triste."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 4: comparatives + future tense
  {
    id: 's22',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'La Maleta Perdida',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['maleta', 'equipaje', 'tamaño'],
    recycled_vocab: ['grande', 'negro', 'roja'],
    mascot_line: 'Lost luggage is scary, but you handled it smoothly!',
    word_encounters_seed: ['maleta', 'equipaje', 'tamaño'],
    description: 'Reporting a lost luggage suitcase at the airport counter.',
    storyLines: [
      'Mi maleta es más grande que la maleta azul.',
      'Mañana buscaré mi equipaje en la estación.',
      'Llamaré al centro si no la encuentran pronto.'
    ],
    storyTranslations: [
      'My suitcase is bigger than the blue suitcase.',
      'Tomorrow I will search for my luggage at the station.',
      'I will call the center if they don\'t find it soon.'
    ],
    vocabulary: [
      { word: 'maleta', meaning: 'suitcase', pronunciation: 'mah-LEH-tah' },
      { word: 'equipaje', meaning: 'luggage', pronunciation: 'eh-kee-PAH-heh' },
      { word: 'tamaño', meaning: 'size', pronunciation: 'tah-MAH-nyoh' }
    ],
    grammarNotes: [
      { title: 'Comparatives & Simple Future (Más grande que / Buscaré)', explanation: '"Más [adj] que" forms comparisons. Simple future ends in -é for yo (buscaré/llamaré).', exampleFromStory: 'Más grande que la maleta... Mañana buscaré...' }
    ],
    lines: [
      { text: "Mi maleta es más grande que la maleta azul.", formula: "Mi (Verb) + maleta es más grande que la maleta azul (Object)" },
      { text: "Mañana buscaré mi equipaje en la estación.", formula: "buscaré (Verb) + mi equipaje (Object) + en la estación (Place) + mañana (Time)" },
      { text: "Llamaré al centro si no la encuentran pronto.", formula: "Llamaré (Verb) + al centro si no la encuentran pronto (Place)" }
    ],
    grammar_note: {
      term: "Comparatives & Simple Future (Más grande que / Buscaré)",
      translation: "Comparatives & Simple Future (Más grande que / Buscaré)",
      explanation: "\"Más [adj] que\" forms comparisons. Simple future ends in -é for yo (buscaré/llamaré).",
      example: "Más grande que la maleta... Mañana buscaré..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's23',
    lesson: 3,
    cefr_badge: 'Pre-A1',
    title: 'El Mapa Turístico',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['catedral', 'palacio', 'cuestas'],
    recycled_vocab: ['mapa', 'ciudad', 'camino'],
    mascot_line: 'Exploring ancient cathedrals with a map in hand.',
    word_encounters_seed: ['catedral', 'palacio', 'cuestas'],
    description: 'A traveler planning a route through old town landmarks.',
    storyLines: [
      'La catedral es más antigua que el palacio real.',
      'Mañana caminaré por el centro histórico.',
      'Visitaré la catedral antigua por la mañana.'
    ],
    storyTranslations: [
      'The cathedral is older than the royal palace.',
      'Tomorrow I will walk through the historic center.',
      'I will visit the ancient cathedral in the morning.'
    ],
    vocabulary: [
      { word: 'catedral', meaning: 'cathedral', pronunciation: 'kah-teh-DRAL' },
      { word: 'palacio', meaning: 'palace', pronunciation: 'pah-LAH-thyoh' },
      { word: 'cuestas', meaning: 'slopes/hills', pronunciation: 'KWEHS-tahs' }
    ],
    grammarNotes: [
      { title: 'Future Tense (Caminaré, Visitaré)', explanation: 'Infinitives plus ending -é express future plans in the simple future.', exampleFromStory: 'Mañana caminaré... Visitaré la catedral...' }
    ],
    lines: [
      { text: "La catedral es más antigua que el palacio real.", formula: "La (Verb) + catedr (Object) + al es más antigua que el palacio real (Place)" },
      { text: "Mañana caminaré por el centro histórico.", formula: "caminaré (Verb) + por el centro histórico (Object) + mañana (Time)" },
      { text: "Visitaré la catedral antigua por la mañana.", formula: "Visitaré (Verb) + la catedr (Object) + al antigua por la (Place) + mañana (Time)" }
    ],
    grammar_note: {
      term: "Future Tense (Caminaré, Visitaré)",
      translation: "Future Tense (Caminaré, Visitaré)",
      explanation: "Infinitives plus ending -é express future plans in the simple future.",
      example: "Mañana caminaré... Visitaré la catedral..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's135',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'El Hotel y la Playa',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['piscina', 'mejor', 'reservaré'],
    recycled_vocab: ['hotel', 'playa', 'habitación'],
    mascot_line: 'Choosing the best hotel near the beach!',
    word_encounters_seed: ['piscina', 'mejor', 'reservaré'],
    description: 'Comparing hotels for a beach vacation.',
    storyLines: [
      'Este hotel es mejor que el otro porque tiene piscina.',
      'Reservaré una habitación con vistas al mar.',
      'Será más barato si reservo hoy.'
    ],
    storyTranslations: [
      'This hotel is better than the other one because it has a pool.',
      'I will reserve a room with sea views.',
      'It will be cheaper if I book today.'
    ],
    vocabulary: [
      { word: 'piscina', meaning: 'pool', pronunciation: 'pees-THEE-nah' },
      { word: 'mejor', meaning: 'better', pronunciation: 'meh-HOHR' },
      { word: 'reservaré', meaning: 'I will reserve', pronunciation: 'rreh-sehr-bah-REH' }
    ],
    grammarNotes: [
      { title: 'Mejor Que (Better Than)', explanation: 'Mejor = better (irregular comparative of bueno). No "más" needed.', exampleFromStory: 'Este hotel es mejor que el otro.' }
    ],
    lines: [
      { text: "Este hotel es mejor que el otro porque tiene piscina.", formula: "Este (Verb) + hotel es mejor que el otro porque tiene piscina (Object)" },
      { text: "Reservaré una habitación con vistas al mar.", formula: "Reservaré (Verb) + una habitación con vistas (Object) + al mar (Place)" },
      { text: "Será más barato si reservo hoy.", formula: "Será (Verb) + más barato si reservo (Object) + hoy (Time)" }
    ],
    grammar_note: {
      term: "Mejor Que (Better Than)",
      translation: "Mejor Que (Better Than)",
      explanation: "Mejor = better (irregular comparative of bueno). No \"más\" needed.",
      example: "Este hotel es mejor que el otro."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's136',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'Comprando un Móvil',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['móvil', 'rápido', 'pantalla'],
    recycled_vocab: ['tienda', 'compraré', 'mejor'],
    mascot_line: 'Comparing phones to find the fastest one!',
    word_encounters_seed: ['móvil', 'rápido', 'pantalla'],
    description: 'Comparing mobile phones at a shop.',
    storyLines: [
      'Este móvil es más rápido que el negro.',
      'La pantalla es más grande también.',
      'Compraré este móvil la próxima semana.'
    ],
    storyTranslations: [
      'This phone is faster than the black one.',
      'The screen is bigger too.',
      'I will buy this phone next week.'
    ],
    vocabulary: [
      { word: 'móvil', meaning: 'mobile phone', pronunciation: 'MOH-beel' },
      { word: 'rápido', meaning: 'fast', pronunciation: 'RRAH-pee-doh' },
      { word: 'pantalla', meaning: 'screen', pronunciation: 'pahn-TAH-lyah' }
    ],
    grammarNotes: [
      { title: 'Más + Adjective + Que', explanation: 'Más rápido que = faster than. Standard comparative structure.', exampleFromStory: 'Este móvil es más rápido que el negro.' }
    ],
    lines: [
      { text: "Este móvil es más rápido que el negro.", formula: "Este (Verb) + móvil es más rápido que el negro (Object)" },
      { text: "La pantalla es más grande también.", formula: "La (Verb) + pantalla es más grande también (Object)" },
      { text: "Compraré este móvil la próxima semana.", formula: "Compraré (Verb) + este móvil la próxima semana (Object)" }
    ],
    grammar_note: {
      term: "Más + Adjective + Que",
      translation: "Más + Adjective + Que",
      explanation: "Más rápido que = faster than. Standard comparative structure.",
      example: "Este móvil es más rápido que el negro."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's137',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'Planes para el Verano',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['aprenderé', 'surf', 'divertido'],
    recycled_vocab: ['verano', 'nadar', 'playa'],
    mascot_line: 'Learning to surf this summer at the beach!',
    word_encounters_seed: ['aprenderé', 'surf', 'divertido'],
    description: 'Making summer plans.',
    storyLines: [
      'Este verano aprenderé a hacer surf.',
      'Será más divertido que nadar en la piscina.',
      'Practicaré todos los días en la playa.'
    ],
    storyTranslations: [
      'This summer I will learn to surf.',
      'It will be more fun than swimming in the pool.',
      'I will practice every day at the beach.'
    ],
    vocabulary: [
      { word: 'aprenderé', meaning: 'I will learn', pronunciation: 'ah-prehn-deh-REH' },
      { word: 'surf', meaning: 'surfing', pronunciation: 'soorf' },
      { word: 'divertido', meaning: 'fun', pronunciation: 'dee-behr-TEE-doh' }
    ],
    grammarNotes: [
      { title: 'Future Tense (Aprenderé, Será, Practicaré)', explanation: 'Infinitive + -é/-á endings for simple future: aprenderé, será, practicaré.', exampleFromStory: 'Este verano aprenderé a hacer surf.' }
    ],
    lines: [
      { text: "Este verano aprenderé a hacer surf.", formula: "Este (Verb) + verano aprenderé a hacer surf (Object)" },
      { text: "Será más divertido que nadar en la piscina.", formula: "Será (Verb) + más divertido que nadar (Object) + en la piscina (Place)" },
      { text: "Practicaré todos los días en la playa.", formula: "Practicaré (Verb) + todos los días (Object) + en la playa (Place)" }
    ],
    grammar_note: {
      term: "Future Tense (Aprenderé, Será, Practicaré)",
      translation: "Future Tense (Aprenderé, Será, Practicaré)",
      explanation: "Infinitive + -é/-á endings for simple future: aprenderé, será, practicaré.",
      example: "Este verano aprenderé a hacer surf."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's138',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'El Nuevo Trabajo',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['salario', 'horario', 'flexible'],
    recycled_vocab: ['trabajo', 'oficina', 'mejor'],
    mascot_line: 'A new job with better pay and flexible hours!',
    word_encounters_seed: ['salario', 'horario', 'flexible'],
    description: 'Comparing a new job opportunity.',
    storyLines: [
      'El nuevo trabajo tiene un salario mejor que el anterior.',
      'El horario será más flexible.',
      'Empezaré el próximo lunes en la nueva oficina.'
    ],
    storyTranslations: [
      'The new job has a better salary than the previous one.',
      'The schedule will be more flexible.',
      'I will start next Monday at the new office.'
    ],
    vocabulary: [
      { word: 'salario', meaning: 'salary', pronunciation: 'sah-LAH-ryoh' },
      { word: 'horario', meaning: 'schedule', pronunciation: 'oh-RAH-ryoh' },
      { word: 'flexible', meaning: 'flexible', pronunciation: 'flehk-SEE-bleh' }
    ],
    grammarNotes: [
      { title: 'Comparative + Future Combined', explanation: 'Mejor que compares; empezaré states a future action.', exampleFromStory: 'El nuevo trabajo tiene un salario mejor que el anterior.' }
    ],
    lines: [
      { text: "El nuevo trabajo tiene un salario mejor que el anterior.", formula: "El (Verb) + nuevo trabajo tiene un salario mejor que el anterior (Object)" },
      { text: "El horario será más flexible.", formula: "El (Verb) + horario será más flexible (Object)" },
      { text: "Empezaré el próximo lunes en la nueva oficina.", formula: "Empezaré (Verb) + el próximo lunes (Object) + en la nueva oficina (Place)" }
    ],
    grammar_note: {
      term: "Comparative + Future Combined",
      translation: "Comparative + Future Combined",
      explanation: "Mejor que compares; empezaré states a future action.",
      example: "El nuevo trabajo tiene un salario mejor que el anterior."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's139',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'Las Dos Ciudades',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['ruidosa', 'tranquila', 'mudaré'],
    recycled_vocab: ['ciudad', 'pueblo', 'vivir'],
    mascot_line: 'Choosing between a noisy city and a quiet town!',
    word_encounters_seed: ['ruidosa', 'tranquila', 'mudaré'],
    description: 'Comparing two cities.',
    storyLines: [
      'Madrid es más ruidosa que mi pueblo.',
      'Mi pueblo es más tranquilo que la ciudad.',
      'El año que viene me mudaré a Barcelona.'
    ],
    storyTranslations: [
      'Madrid is noisier than my town.',
      'My town is quieter than the city.',
      'Next year I will move to Barcelona.'
    ],
    vocabulary: [
      { word: 'ruidosa', meaning: 'noisy', pronunciation: 'rrwee-DOH-sah' },
      { word: 'tranquila', meaning: 'quiet', pronunciation: 'trahn-KEE-lah' },
      { word: 'mudaré', meaning: 'I will move', pronunciation: 'moo-dah-REH' }
    ],
    grammarNotes: [
      { title: 'Opposite Comparatives', explanation: 'Más ruidosa vs más tranquila — opposite comparatives using the same structure.', exampleFromStory: 'Madrid es más ruidosa que mi pueblo.' }
    ],
    lines: [
      { text: "Madrid es más ruidosa que mi pueblo.", formula: "Madrid (Verb) + es más ruidosa que mi pueblo (Object)" },
      { text: "Mi pueblo es más tranquilo que la ciudad.", formula: "Mi (Verb) + pueblo es más tranquilo que la ciudad (Object)" },
      { text: "El año que viene me mudaré a Barcelona.", formula: "El (Verb) + año que viene me mudaré a Barcelona (Object)" }
    ],
    grammar_note: {
      term: "Opposite Comparatives",
      translation: "Opposite Comparatives",
      explanation: "Más ruidosa vs más tranquila — opposite comparatives using the same structure.",
      example: "Madrid es más ruidosa que mi pueblo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's140',
    lesson: 28,
    cefr_badge: 'B1',
    title: 'El Examen Final',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    tier: 4,
    new_grammar_point: 'comparatives + future tense',
    new_vocab: ['difícil', 'aprobaré', 'nota'],
    recycled_vocab: ['examen', 'estudiar', 'clase'],
    mascot_line: 'Studying hard to pass the final exam!',
    word_encounters_seed: ['difícil', 'aprobaré', 'nota'],
    description: 'Preparing for a difficult final exam.',
    storyLines: [
      'Este examen será más difícil que el anterior.',
      'Estudiaré más esta vez para sacar buena nota.',
      'Aprobaré si estudio todos los días.'
    ],
    storyTranslations: [
      'This exam will be harder than the previous one.',
      'I will study more this time to get a good grade.',
      'I will pass if I study every day.'
    ],
    vocabulary: [
      { word: 'difícil', meaning: 'difficult', pronunciation: 'dee-FEE-theel' },
      { word: 'aprobaré', meaning: 'I will pass', pronunciation: 'ah-proh-bah-REH' },
      { word: 'nota', meaning: 'grade', pronunciation: 'NOH-tah' }
    ],
    grammarNotes: [
      { title: 'Si + Present, Future', explanation: 'Si + present tense, future tense: Si estudio, aprobaré.', exampleFromStory: 'Aprobaré si estudio todos los días.' }
    ],
    lines: [
      { text: "Este examen será más difícil que el anterior.", formula: "Este (Verb) + examen será más difícil que el anterior (Object)" },
      { text: "Estudiaré más esta vez para sacar buena nota.", formula: "Estudiaré (Verb) + más esta vez para sacar buena nota (Object)" },
      { text: "Aprobaré si estudio todos los días.", formula: "Aprobaré (Verb) + si estudio todos los días (Object)" }
    ],
    grammar_note: {
      term: "Si + Present, Future",
      translation: "Si + Present, Future",
      explanation: "Si + present tense, future tense: Si estudio, aprobaré.",
      example: "Aprobaré si estudio todos los días."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  // ── B1 LEVEL ──
  // Tier 1: present perfect
  {
    id: 's29',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'Una Carta a un Amigo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['salud', 'adaptado', 'principio'],
    recycled_vocab: ['espero', 'ciudad', 'rutina'],
    mascot_line: 'Adapting to a new city takes heart and patience.',
    word_encounters_seed: ['salud', 'adaptado', 'principio'],
    description: 'Writing to a friend about adapting to a new city life.',
    storyLines: [
      'Espero que te encuentres bien de salud.',
      'Te escribo para contarte que me he adaptado a esta nueva ciudad.',
      'He comenzado a disfrutar de mi rutina diaria.'
    ],
    storyTranslations: [
      'I hope you are in good health.',
      'I am writing to tell you that I have adapted to this new city.',
      'I have begun to enjoy my daily routine.'
    ],
    vocabulary: [
      { word: 'salud', meaning: 'health', pronunciation: 'sah-LOOD' },
      { word: 'adaptado', meaning: 'adapted', pronunciation: 'ah-dahp-TAH-doh' },
      { word: 'principio', meaning: 'beginning', pronunciation: 'preen-THEE-pyoh' }
    ],
    grammarNotes: [
      { title: 'Present Perfect (He adaptado / He comenzado)', explanation: 'Formed with auxiliary verb "haber" + past participle (-ado/-ido).', exampleFromStory: 'Me he adaptado... He comenzado...' }
    ],
    lines: [
      { text: "Espero que te encuentres bien de salud.", formula: "Espero (Verb) + que te encuentres bien de salud (Object)" },
      { text: "Te escribo para contarte que me he adaptado a esta nueva ciudad.", formula: "Te (Verb) + escribo para contarte que me he adaptado a esta nueva ciudad (Object)" },
      { text: "He comenzado a disfrutar de mi rutina diaria.", formula: "He (Verb) + comenzado a disfrutar de mi rutina diaria (Object)" }
    ],
    grammar_note: {
      term: "Present Perfect (He adaptado / He comenzado)",
      translation: "Present Perfect (He adaptado / He comenzado)",
      explanation: "Formed with auxiliary verb \"haber\" + past participle (-ado/-ido).",
      example: "Me he adaptado... He comenzado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's31',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'El Festival del Pueblo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['bailes', 'costumbres', 'ancestrales'],
    recycled_vocab: ['asistí', 'festival', 'comunidad'],
    mascot_line: 'Local village festivals bring communities together.',
    word_encounters_seed: ['bailes', 'costumbres', 'ancestrales'],
    description: 'Describing the colors, dances, and local dishes of a traditional town fair.',
    storyLines: [
      'Esta semana he asistido al festival anual de mi comunidad.',
      'Hemos visto bailes folclóricos en la calle principal.',
      'Hemos probado platos tradicionales y deliciosos.'
    ],
    storyTranslations: [
      'This week I have attended the annual festival of my community.',
      'We have seen folk dances on the main street.',
      'We have tried traditional and delicious dishes.'
    ],
    vocabulary: [
      { word: 'bailes', meaning: 'dances', pronunciation: 'BY-lehs' },
      { word: 'costumbres', meaning: 'customs', pronunciation: 'kohs-TOOM-brehs' },
      { word: 'ancestrales', meaning: 'ancestral', pronunciation: 'ahn-thehs-TRAH-lehs' }
    ],
    grammarNotes: [
      { title: 'Present Perfect Plural (Hemos visto / Hemos probado)', explanation: 'Use "hemos" for "we have" followed by the past participle.', exampleFromStory: 'Hemos visto bailes... Hemos probado...' }
    ],
    lines: [
      { text: "Esta semana he asistido al festival anual de mi comunidad.", formula: "Esta (Verb) + semana he asistido (Object) + al festival anual de mi comunidad (Place)" },
      { text: "Hemos visto bailes folclóricos en la calle principal.", formula: "Hemos (Verb) + visto bailes folclóricos (Object) + en la calle principal (Place)" },
      { text: "Hemos probado platos tradicionales y deliciosos.", formula: "Hemos (Verb) + probado platos tradicionales y deliciosos (Object)" }
    ],
    grammar_note: {
      term: "Present Perfect Plural (Hemos visto / Hemos probado)",
      translation: "Present Perfect Plural (Hemos visto / Hemos probado)",
      explanation: "Use \"hemos\" for \"we have\" followed by the past participle.",
      example: "Hemos visto bailes... Hemos probado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 2: subjunctive after quiero que / es importante que
  {
    id: 's32',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'Un Consejo de Salud',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive after quiero que / es importante que',
    new_vocab: ['estrés', 'recomiendo', 'libre'],
    recycled_vocab: ['caminar', 'agua', 'descansar'],
    mascot_line: 'Great advice: rest, hydrate, and walk outdoors.',
    word_encounters_seed: ['estrés', 'recomiendo', 'libre'],
    description: 'Giving friendly advice on stress relief, hydration, and walking.',
    storyLines: [
      'Para reducir el estrés, quiero que camines al aire libre.',
      'Es importante que bebas suficiente agua y descanses.',
      'Quiero que disfrutes de tu tiempo libre.'
    ],
    storyTranslations: [
      'To reduce stress, I want you to walk outdoors.',
      'It is important that you drink enough water and rest.',
      'I want you to enjoy your free time.'
    ],
    vocabulary: [
      { word: 'estrés', meaning: 'stress', pronunciation: 'ehs-TREHS' },
      { word: 'recomiendo', meaning: 'recommend', pronunciation: 'reh-koh-MYEHN-doh' },
      { word: 'libre', meaning: 'free', pronunciation: 'LEE-breh' }
    ],
    grammarNotes: [
      { title: 'Subjunctive Mood (Quiero que camines / Es importante que bebas)', explanation: 'Expressions of desire ("quiero que") or impersonal importance ("es importante que") require the subjunctive verb form.', exampleFromStory: 'Quiero que camines... Es importante que bebas...' }
    ],
    lines: [
      { text: "Para reducir el estrés, quiero que camines al aire libre.", formula: "Para (Verb) + reducir el estrés, quiero que camines (Object) + al aire libre (Place)" },
      { text: "Es importante que bebas suficiente agua y descanses.", formula: "Es (Verb) + importante que bebas suficiente agua y descanses (Object)" },
      { text: "Quiero que disfrutes de tu tiempo libre.", formula: "Quiero (Verb) + que disfrutes de tu tiempo libre (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive Mood (Quiero que camines / Es importante que bebas)",
      translation: "Subjunctive Mood (Quiero que camines / Es importante que bebas)",
      explanation: "Expressions of desire (\"quiero que\") or impersonal importance (\"es importante que\") require the subjunctive verb form.",
      example: "Quiero que camines... Es importante que bebas..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's33',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'La Decisión de Mudarme',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive after quiero que / es importante que',
    new_vocab: ['mudarme', 'campo', 'paz'],
    recycled_vocab: ['tranquilo', 'ciudad', 'necesito'],
    mascot_line: 'Moving to the countryside for peace of mind.',
    word_encounters_seed: ['mudarme', 'campo', 'paz'],
    description: 'Weighing the pros and cons of moving from a busy city to the countryside.',
    storyLines: [
      'Es importante que busque una casa en el campo.',
      'Quiero que mi familia tenga más tranquilidad y aire puro.',
      'Es necesario que esta decisión nos traiga paz.'
    ],
    storyTranslations: [
      'It is important that I search for a house in the countryside.',
      'I want my family to have more quiet and pure air.',
      'It is necessary that this decision brings us peace.'
    ],
    vocabulary: [
      { word: 'mudarme', meaning: 'to move (residence)', pronunciation: 'moo-DAR-meh' },
      { word: 'campo', meaning: 'countryside', pronunciation: 'KAM-poh' },
      { word: 'paz', meaning: 'peace', pronunciation: 'path' }
    ],
    grammarNotes: [
      { title: 'Subjunctive of Desire (Tenga / Traiga)', explanation: 'The subjunctive expresses wishes, goals, or impersonal necessities.', exampleFromStory: 'Quiero que mi familia tenga... Es necesario que traiga...' }
    ],
    lines: [
      { text: "Es importante que busque una casa en el campo.", formula: "Es (Verb) + importante que busque una casa (Object) + en el campo (Place)" },
      { text: "Quiero que mi familia tenga más tranquilidad y aire puro.", formula: "Quiero (Verb) + que mi familia tenga más tranquilidad y aire puro (Object)" },
      { text: "Es necesario que esta decisión nos traiga paz.", formula: "Es (Verb) + necesario que esta decisión nos traiga paz (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive of Desire (Tenga / Traiga)",
      translation: "Subjunctive of Desire (Tenga / Traiga)",
      explanation: "The subjunctive expresses wishes, goals, or impersonal necessities.",
      example: "Quiero que mi familia tenga... Es necesario que traiga..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 3: conditional + hypothetical si clauses
  {
    id: 's27',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'Mi Sueño de Viajar',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional + hypothetical si clauses',
    new_vocab: ['suficiente', 'ruinas', 'comprender'],
    recycled_vocab: ['viajaría', 'tiempo', 'América'],
    mascot_line: 'Exploring Mayan ruins is a dream adventure!',
    word_encounters_seed: ['suficiente', 'ruinas', 'comprender'],
    description: 'Discussing personal dreams of exploring Latin American ruins.',
    storyLines: [
      'Si tuviera suficiente tiempo, viajaría por toda América Latina.',
      'Si pudiera elegir, exploraría las antiguas ruinas mayas.',
      'Viajar nos ayudaría a comprender mejor el mundo.'
    ],
    storyTranslations: [
      'If I had enough time, I would travel all over Latin America.',
      'If I could choose, I would explore ancient Mayan ruins.',
      'Traveling would help us better understand the world.'
    ],
    vocabulary: [
      { word: 'suficiente', meaning: 'enough', pronunciation: 'soo-fee-THYEHN-teh' },
      { word: 'ruinas', meaning: 'ruins', pronunciation: 'RWEH-nahs' },
      { word: 'comprender', meaning: 'to understand', pronunciation: 'kom-prehn-DEHR' }
    ],
    grammarNotes: [
      { title: 'Hypothetical Si Clauses (Si tuviera... viajaría...)', explanation: 'Combines imperfect subjunctive (tuviera/pudiera) with the conditional (viajaría/exploraría).', exampleFromStory: 'Si tuviera tiempo, viajaría...' }
    ],
    lines: [
      { text: "Si tuviera suficiente tiempo, viajaría por toda América Latina.", formula: "Si (Verb) + tuviera suficiente tiempo, viajaría por toda América Latina (Object)" },
      { text: "Si pudiera elegir, exploraría las antiguas ruinas mayas.", formula: "Si (Verb) + pudiera elegir, exploraría las antiguas ruinas mayas (Object)" },
      { text: "Viajar nos ayudaría a comprender mejor el mundo.", formula: "Viajar (Verb) + nos ayudaría a comprender mejor el mundo (Object)" }
    ],
    grammar_note: {
      term: "Hypothetical Si Clauses (Si tuviera... viajaría...)",
      translation: "Hypothetical Si Clauses (Si tuviera... viajaría...)",
      explanation: "Combines imperfect subjunctive (tuviera/pudiera) with the conditional (viajaría/exploraría).",
      example: "Si tuviera tiempo, viajaría..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's28',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'El Recuerdo de la Infancia',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional + hypothetical si clauses',
    new_vocab: ['solía', 'vacaciones', 'olor'],
    recycled_vocab: ['pueblo', 'abuelos', 'feliz'],
    mascot_line: 'Nostalgic summers at grandparents’ village.',
    word_encounters_seed: ['solía', 'vacaciones', 'olor'],
    description: 'Nostalgic storytelling about spending summer holidays in a small village.',
    storyLines: [
      'Si pudiera volver al pasado, iría al pueblo de mis abuelos.',
      'Recordaría el olor a pan recién hecho y los paseos.',
      'Esos momentos me harían verdaderamente feliz.'
    ],
    storyTranslations: [
      'If I could return to the past, I would go to my grandparents\' town.',
      'I would remember the smell of freshly made bread and walks.',
      'Those moments would make me truly happy.'
    ],
    vocabulary: [
      { word: 'solía', meaning: 'used to', pronunciation: 'soh-LEE-ah' },
      { word: 'vacaciones', meaning: 'holidays', pronunciation: 'bah-kah-THYOH-nehs' },
      { word: 'olor', meaning: 'smell', pronunciation: 'oh-LOHR' }
    ],
    grammarNotes: [
      { title: 'Conditional Verbs (Iría, Recordaría, Harían)', explanation: 'Used to state hypothetical outcomes in hypothetical situations.', exampleFromStory: 'Si pudiera volver... iría al pueblo...' }
    ],
    lines: [
      { text: "Si pudiera volver al pasado, iría al pueblo de mis abuelos.", formula: "Si (Verb) + pudiera volver (Object) + al pasado, iría al pueblo de mis abuelos (Place)" },
      { text: "Recordaría el olor a pan recién hecho y los paseos.", formula: "Recordaría (Verb) + el olor a pan recién hecho y los paseos (Object)" },
      { text: "Esos momentos me harían verdaderamente feliz.", formula: "Esos (Verb) + momentos me harían verdaderamente feliz (Object)" }
    ],
    grammar_note: {
      term: "Conditional Verbs (Iría, Recordaría, Harían)",
      translation: "Conditional Verbs (Iría, Recordaría, Harían)",
      explanation: "Used to state hypothetical outcomes in hypothetical situations.",
      example: "Si pudiera volver... iría al pueblo..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // Tier 4: relative clauses + reported speech
  {
    id: 's30',
    lesson: 4,
    cefr_badge: 'Pre-A1',
    title: 'La Primera Caminata',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['caminata', 'cima', 'logro'],
    recycled_vocab: ['montaña', 'cansados', 'camino'],
    mascot_line: 'Reaching the mountain summit feels amazing!',
    word_encounters_seed: ['caminata', 'cima', 'logro'],
    description: 'Going on a mountain trek and feeling the satisfaction of reaching the summit.',
    storyLines: [
      'La chica que vive aquí dijo que subiría la montaña.',
      'Dijo que la caminata era difícil pero hermosa.',
      'Llegar a la cima que tanto buscábamos nos dio un gran logro.'
    ],
    storyTranslations: [
      'The girl who lives here said she would climb the mountain.',
      'She said that the hike was difficult but beautiful.',
      'Reaching the summit that we sought so much gave us a great achievement.'
    ],
    vocabulary: [
      { word: 'caminata', meaning: 'hike/trek', pronunciation: 'kah-mee-NAH-tah' },
      { word: 'cima', meaning: 'summit/peak', pronunciation: 'THEE-mah' },
      { word: 'logro', meaning: 'achievement', pronunciation: 'LOH-groh' }
    ],
    grammarNotes: [
      { title: 'Relative Pronouns & Reported Speech (La chica que... dijo que...)', explanation: '"Que" connects relative clauses and introduces reported speech clauses.', exampleFromStory: 'La chica que vive aquí dijo que...' }
    ],
    lines: [
      { text: "La chica que vive aquí dijo que subiría la montaña.", formula: "La (Verb) + chica que vive aquí dijo que subirí (Object) + a la montaña (Place)" },
      { text: "Dijo que la caminata era difícil pero hermosa.", formula: "Dijo (Verb) + que la caminata era difícil pero hermosa (Object)" },
      { text: "Llegar a la cima que tanto buscábamos nos dio un gran logro.", formula: "Llegar (Verb) + a la cima que tanto buscábamos nos dio un gran logro (Place)" }
    ],
    grammar_note: {
      term: "Relative Pronouns & Reported Speech (La chica que... dijo que...)",
      translation: "Relative Pronouns & Reported Speech (La chica que... dijo que...)",
      explanation: "\"Que\" connects relative clauses and introduces reported speech clauses.",
      example: "La chica que vive aquí dijo que..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's34',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'El Libro de Aventuras',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['novela', 'trama', 'codicia'],
    recycled_vocab: ['libro', 'final', 'pasado'],
    mascot_line: 'A good adventure novel you can’t put down!',
    word_encounters_seed: ['novela', 'trama', 'codicia'],
    description: 'Reviewing a novel that transport the reader into ancient civilizations.',
    storyLines: [
      'El autor dijo que escribiría una novela fantástica.',
      'El libro que leí ayer tiene una trama atrapante.',
      'Dijo que la historia nos hace reflexionar sobre el pasado.'
    ],
    storyTranslations: [
      'The author said that he would write a fantastic novel.',
      'The book that I read yesterday has a gripping plot.',
      'He said that the story makes us reflect on the past.'
    ],
    vocabulary: [
      { word: 'novela', meaning: 'novel', pronunciation: 'noh-BEH-lah' },
      { word: 'trama', meaning: 'plot', pronunciation: 'TRAH-mah' },
      { word: 'codicia', meaning: 'greed', pronunciation: 'koh-DEE-thyah' }
    ],
    grammarNotes: [
      { title: 'Reported Speech (Dijo que escribiría)', explanation: 'Reported speech with "dijo que" shifts present verbs into the past or conditional.', exampleFromStory: 'El autor dijo que escribiría...' }
    ],
    lines: [
      { text: "El autor dijo que escribiría una novela fantástica.", formula: "El (Verb) + autor dijo que escribiría una novela fantástica (Object)" },
      { text: "El libro que leí ayer tiene una trama atrapante.", formula: "El (Verb) + libro que leí  tiene una trama atrapante (Object) + ayer (Time)" },
      { text: "Dijo que la historia nos hace reflexionar sobre el pasado.", formula: "Dijo (Verb) + que la historia nos hace reflexionar sobre el pasado (Object)" }
    ],
    grammar_note: {
      term: "Reported Speech (Dijo que escribiría)",
      translation: "Reported Speech (Dijo que escribiría)",
      explanation: "Reported speech with \"dijo que\" shifts present verbs into the past or conditional.",
      example: "El autor dijo que escribiría..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B1 Tier 1: Present Perfect
  {
    id: 's141',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'El Viaje a Galicia',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['paisajes', 'recorrido', 'gastronomía'],
    recycled_vocab: ['hemos', 'viaje', 'disfrutado'],
    mascot_line: 'Exploring green landscapes and delicious cuisine in Galicia!',
    word_encounters_seed: ['paisajes', 'recorrido', 'gastronomía'],
    description: 'Recounting a recent trip through northern Spain.',
    storyLines: [
      'Hemos recorrido los bellos paisajes del norte de España.',
      'He probado el marisco fresco y la gastronomía local.',
      'Ha sido una experiencia inolvidable para todos.'
    ],
    storyTranslations: [
      'We have traveled through the beautiful landscapes of northern Spain.',
      'I have tried fresh seafood and local gastronomy.',
      'It has been an unforgettable experience for everyone.'
    ],
    vocabulary: [
      { word: 'paisajes', meaning: 'landscapes', pronunciation: 'py-SAH-hehs' },
      { word: 'recorrido', meaning: 'traveled through/traversed', pronunciation: 'rreh-koh-RREE-doh' },
      { word: 'gastronomía', meaning: 'gastronomy/cuisine', pronunciation: 'gahs-troh-noh-MEE-ah' }
    ],
    grammarNotes: [
      { title: 'Present Perfect with Experience (He probado / Ha sido)', explanation: 'Used to talk about life experiences that connect to the present.', exampleFromStory: 'He probado el marisco... Ha sido una experiencia...' }
    ],
    lines: [
      { text: "Hemos recorrido los bellos paisajes del norte de España.", formula: "Hemos (Verb) + recorrido los bellos paisajes del norte de España (Object)" },
      { text: "He probado el marisco fresco y la gastronomía local.", formula: "He (Verb) + probado el marisco fresco y la gastronomía local (Object)" },
      { text: "Ha sido una experiencia inolvidable para todos.", formula: "Ha (Verb) + sido una experiencia inolvidable para todos (Object)" }
    ],
    grammar_note: {
      term: "Present Perfect with Experience (He probado / Ha sido)",
      translation: "Present Perfect with Experience (He probado / Ha sido)",
      explanation: "Used to talk about life experiences that connect to the present.",
      example: "He probado el marisco... Ha sido una experiencia..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's142',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'Un Logro Profesional',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['conseguido', 'ascenso', 'esfuerzo'],
    recycled_vocab: ['trabajo', 'empresa', 'reconocido'],
    mascot_line: 'Hard work pays off with a well-deserved promotion!',
    word_encounters_seed: ['conseguido', 'ascenso', 'esfuerzo'],
    description: 'Celebrating a recent promotion at work.',
    storyLines: [
      'Por fin he conseguido el ascenso que tanto deseaba.',
      'La empresa ha reconocido mi esfuerzo de este año.',
      'Mis compañeros me han felicitado con una comida.'
    ],
    storyTranslations: [
      'I have finally achieved the promotion I wanted so much.',
      'The company has recognized my hard work this year.',
      'My colleagues have congratulated me with a lunch.'
    ],
    vocabulary: [
      { word: 'conseguido', meaning: 'achieved/gotten', pronunciation: 'kohn-seh-GEE-doh' },
      { word: 'ascenso', meaning: 'promotion', pronunciation: 'ahs-THEHN-soh' },
      { word: 'esfuerzo', meaning: 'effort', pronunciation: 'ehs-FWEHR-thoh' }
    ],
    grammarNotes: [
      { title: 'Irregular Past Participle (Ha reconocido)', explanation: 'Reconocer uses standard -ido: reconocido.', exampleFromStory: 'La empresa ha reconocido mi esfuerzo.' }
    ],
    lines: [
      { text: "Por fin he conseguido el ascenso que tanto deseaba.", formula: "Por (Verb) + fin he conseguido el ascenso que tanto deseaba (Object)" },
      { text: "La empresa ha reconocido mi esfuerzo de este año.", formula: "La (Verb) + empresa ha reconocido mi esfuerzo de (Object) + este año (Time)" },
      { text: "Mis compañeros me han felicitado con una comida.", formula: "Mis (Verb) + compañeros me han felicitado con una comida (Object)" }
    ],
    grammar_note: {
      term: "Irregular Past Participle (Ha reconocido)",
      translation: "Irregular Past Participle (Ha reconocido)",
      explanation: "Reconocer uses standard -ido: reconocido.",
      example: "La empresa ha reconocido mi esfuerzo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's143',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'El Aprendizaje de Idiomas',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['avanzado', 'fluidez', 'constancia'],
    recycled_vocab: ['español', 'estudiado', 'meses'],
    mascot_line: 'Consistent study leads to amazing speaking fluency!',
    word_encounters_seed: ['avanzado', 'fluidez', 'constancia'],
    description: 'Reflecting on progress in Spanish language learning.',
    storyLines: [
      'He estudiado español durante seis meses seguidos.',
      'Mi comprensión auditiva ha mejorado considerablemente.',
      'He ganado fluidez gracias a la práctica diaria.'
    ],
    storyTranslations: [
      'I have studied Spanish for six straight months.',
      'My listening comprehension has improved considerably.',
      'I have gained fluency thanks to daily practice.'
    ],
    vocabulary: [
      { word: 'avanzado', meaning: 'advanced', pronunciation: 'ah-bahn-THAH-doh' },
      { word: 'fluidez', meaning: 'fluency', pronunciation: 'floo-ee-DEHTH' },
      { word: 'constancia', meaning: 'perseverance/consistency', pronunciation: 'kohns-TAHN-thyah' }
    ],
    grammarNotes: [
      { title: 'Present Perfect Time Duration (He estudiado durante...)', explanation: 'Combines present perfect with duration expressions to highlight ongoing results.', exampleFromStory: 'He estudiado español durante seis meses...' }
    ],
    lines: [
      { text: "He estudiado español durante seis meses seguidos.", formula: "He (Verb) + estudiado español durante seis meses seguidos (Object)" },
      { text: "Mi comprensión auditiva ha mejorado considerablemente.", formula: "Mi (Verb) + comprensión auditiva ha mejorado considerablemente (Object)" },
      { text: "He ganado fluidez gracias a la práctica diaria.", formula: "He (Verb) + ganado fluidez gracias (Object) + a la práctica diaria (Place)" }
    ],
    grammar_note: {
      term: "Present Perfect Time Duration (He estudiado durante...)",
      translation: "Present Perfect Time Duration (He estudiado durante...)",
      explanation: "Combines present perfect with duration expressions to highlight ongoing results.",
      example: "He estudiado español durante seis meses..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's144',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'La Renovación del Hogar',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['reformado', 'muebles', 'decoración'],
    recycled_vocab: ['casa', 'pintado', 'hemos'],
    mascot_line: 'Freshly painted walls and new furniture make home bright!',
    word_encounters_seed: ['reformado', 'muebles', 'decoración'],
    description: 'Renovating and redecorating the living room.',
    storyLines: [
      'Hemos reformado el salón de nuestra casa.',
      'Hemos pintado las paredes de color blanco cálido.',
      'He comprado muebles nuevos en la tienda del centro.'
    ],
    storyTranslations: [
      'We have renovated the living room of our house.',
      'We have painted the walls a warm white color.',
      'I have bought new furniture in the downtown store.'
    ],
    vocabulary: [
      { word: 'reformado', meaning: 'renovated/remodeled', pronunciation: 'rreh-fohr-MAH-doh' },
      { word: 'muebles', meaning: 'furniture', pronunciation: 'MWEH-blehs' },
      { word: 'decoración', meaning: 'decoration', pronunciation: 'deh-koh-rah-THYOHN' }
    ],
    grammarNotes: [
      { title: 'Multiple Present Perfect Verbs', explanation: 'Combining multiple present perfect actions to summarize a completed project.', exampleFromStory: 'Hemos reformado... Hemos pintado... He comprado...' }
    ],
    lines: [
      { text: "Hemos reformado el salón de nuestra casa.", formula: "Hemos (Verb) + reformado el salón de nuestra casa (Object)" },
      { text: "Hemos pintado las paredes de color blanco cálido.", formula: "Hemos (Verb) + pintado las paredes de color blanco cálido (Object)" },
      { text: "He comprado muebles nuevos en la tienda del centro.", formula: "He (Verb) + comprado muebles nuevos (Object) + en la tienda del centro (Place)" }
    ],
    grammar_note: {
      term: "Multiple Present Perfect Verbs",
      translation: "Multiple Present Perfect Verbs",
      explanation: "Combining multiple present perfect actions to summarize a completed project.",
      example: "Hemos reformado... Hemos pintado... He comprado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's145',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'El Concierto Inolvidable',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['actuado', 'emoción', 'entradas'],
    recycled_vocab: ['concierto', 'música', 'visto'],
    mascot_line: 'Live music concerts fill the heart with joy!',
    word_encounters_seed: ['actuado', 'emoción', 'entradas'],
    description: 'Attending a memorable live concert.',
    storyLines: [
      'He comprado entradas para el concierto de mi banda favorita.',
      'El grupo ha actuado durante más de dos horas sin parar.',
      'Nunca he sentido tanta emoción en un evento musical.'
    ],
    storyTranslations: [
      'I have bought tickets for my favorite band\'s concert.',
      'The group has performed for more than two hours non-stop.',
      'I have never felt so much excitement at a musical event.'
    ],
    vocabulary: [
      { word: 'actuado', meaning: 'performed/acted', pronunciation: 'ahk-TWAH-doh' },
      { word: 'emoción', meaning: 'excitement/emotion', pronunciation: 'eh-moh-THYOHN' },
      { word: 'entradas', meaning: 'tickets', pronunciation: 'ehn-TRAH-dahs' }
    ],
    grammarNotes: [
      { title: 'Nunca + Present Perfect', explanation: 'Used to state that something has never occurred until now: "Nunca he sentido...".', exampleFromStory: 'Nunca he sentido tanta emoción...' }
    ],
    lines: [
      { text: "He comprado entradas para el concierto de mi banda favorita.", formula: "He (Verb) + comprado entradas para el concierto de mi banda favorita (Object)" },
      { text: "El grupo ha actuado durante más de dos horas sin parar.", formula: "El (Verb) + grupo ha actuado durante más de dos horas sin parar (Object)" },
      { text: "Nunca he sentido tanta emoción en un evento musical.", formula: "he (Verb) + sentido tanta emoción en un evento musical (Object) + nunca (Time)" }
    ],
    grammar_note: {
      term: "Nunca + Present Perfect",
      translation: "Nunca + Present Perfect",
      explanation: "Used to state that something has never occurred until now: \"Nunca he sentido...\".",
      example: "Nunca he sentido tanta emoción..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's146',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'Una Receta Familiar',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['preparado', 'secreto', 'sabor'],
    recycled_vocab: ['receta', 'abuela', 'cocinado'],
    mascot_line: 'Passing down secret family recipes across generations!',
    word_encounters_seed: ['preparado', 'secreto', 'sabor'],
    description: 'Cooking a family dish following a grandma\'s recipe.',
    storyLines: [
      'Hoy he preparado el guiso tradicional de mi abuela.',
      'He seguido todos los pasos de su libreta secreta.',
      'El sabor ha quedado exactamente como el de mi infancia.'
    ],
    storyTranslations: [
      'Today I have prepared my grandmother\'s traditional stew.',
      'I have followed all the steps from her secret notebook.',
      'The flavor has turned out exactly like that of my childhood.'
    ],
    vocabulary: [
      { word: 'preparado', meaning: 'prepared', pronunciation: 'preh-pah-RAH-doh' },
      { word: 'secreto', meaning: 'secret', pronunciation: 'seh-KREH-toh' },
      { word: 'sabor', meaning: 'flavor/taste', pronunciation: 'sah-BOHR' }
    ],
    grammarNotes: [
      { title: 'Past Participle with Quedar (Ha quedado)', explanation: 'Quedar + past participle expresses resulting state after an action.', exampleFromStory: 'El sabor ha quedado exactamente igual.' }
    ],
    lines: [
      { text: "Hoy he preparado el guiso tradicional de mi abuela.", formula: "he (Verb) + preparado el guiso tradicion (Object) + al de mi abuela (Place) + hoy (Time)" },
      { text: "He seguido todos los pasos de su libreta secreta.", formula: "He (Verb) + seguido todos los pasos de su libreta secreta (Object)" },
      { text: "El sabor ha quedado exactamente como el de mi infancia.", formula: "El (Verb) + sabor ha quedado exactamente como el de mi infancia (Object)" }
    ],
    grammar_note: {
      term: "Past Participle with Quedar (Ha quedado)",
      translation: "Past Participle with Quedar (Ha quedado)",
      explanation: "Quedar + past participle expresses resulting state after an action.",
      example: "El sabor ha quedado exactamente igual."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's147',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'La Maratón de la Ciudad',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['entrenado', 'meta', 'medalla'],
    recycled_vocab: ['carrera', 'correr', 'conseguido'],
    mascot_line: 'Crossing the marathon finish line after months of training!',
    word_encounters_seed: ['entrenado', 'meta', 'medalla'],
    description: 'Completing a city marathon after months of preparation.',
    storyLines: [
      'He entrenado durante meses para esta maratón.',
      'Por fin he cruzado la línea de meta con orgullo.',
      'La organización me ha entregado una medalla conmemorativa.'
    ],
    storyTranslations: [
      'I have trained for months for this marathon.',
      'I have finally crossed the finish line with pride.',
      'The organizers have awarded me a commemorative medal.'
    ],
    vocabulary: [
      { word: 'entrenado', meaning: 'trained', pronunciation: 'ehn-treh-NAH-doh' },
      { word: 'meta', meaning: 'finish line/goal', pronunciation: 'MEH-tah' },
      { word: 'medalla', meaning: 'medal', pronunciation: 'meh-DAH-lyah' }
    ],
    grammarNotes: [
      { title: 'Recent Completion with Por Fin', explanation: '"Por fin" combined with present perfect emphasizes long-awaited accomplishments.', exampleFromStory: 'Por fin he cruzado la línea de meta.' }
    ],
    lines: [
      { text: "He entrenado durante meses para esta maratón.", formula: "He (Verb) + entrenado durante meses para esta maratón (Object)" },
      { text: "Por fin he cruzado la línea de meta con orgullo.", formula: "Por (Verb) + fin he cruzado la línea de meta con orgullo (Object)" },
      { text: "La organización me ha entregado una medalla conmemorativa.", formula: "La (Verb) + organización me ha entregado una medalla conmemorativa (Object)" }
    ],
    grammar_note: {
      term: "Recent Completion with Por Fin",
      translation: "Recent Completion with Por Fin",
      explanation: "\"Por fin\" combined with present perfect emphasizes long-awaited accomplishments.",
      example: "Por fin he cruzado la línea de meta."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's148',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'El Exposición de Fotografía',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 1,
    new_grammar_point: 'present perfect',
    new_vocab: ['exposición', 'galería', 'obras'],
    recycled_vocab: ['fotos', 'visitado', 'artistas'],
    mascot_line: 'Discovering inspiring photo galleries in town!',
    word_encounters_seed: ['exposición', 'galería', 'obras'],
    description: 'Visiting a local photography exhibition.',
    storyLines: [
      'Esta tarde he visitado una galería de arte contemporáneo.',
      'El fotógrafo ha presentado sus obras más recientes.',
      'Muchas personas han acudido a la inauguración.'
    ],
    storyTranslations: [
      'This afternoon I have visited a contemporary art gallery.',
      'The photographer has presented his most recent works.',
      'Many people have attended the opening.'
    ],
    vocabulary: [
      { word: 'exposición', meaning: 'exhibition', pronunciation: 'ehks-poh-see-THYOHN' },
      { word: 'galería', meaning: 'gallery', pronunciation: 'gah-leh-REE-ah' },
      { word: 'obras', meaning: 'works/artworks', pronunciation: 'OH-brahs' }
    ],
    grammarNotes: [
      { title: 'Present Perfect for Today\'s Events (Esta tarde he...)', explanation: 'Used in Spanish for events within a time frame that includes the present day.', exampleFromStory: 'Esta tarde he visitado una galería...' }
    ],
    lines: [
      { text: "Esta tarde he visitado una galería de arte contemporáneo.", formula: "he (Verb) + visitado una galería de arte contemporáneo (Object) + esta tarde (Time)" },
      { text: "El fotógrafo ha presentado sus obras más recientes.", formula: "El (Verb) + fotógrafo ha presentado sus obras más recientes (Object)" },
      { text: "Muchas personas han acudido a la inauguración.", formula: "Muchas (Verb) + personas han acudido (Object) + a la inauguración (Place)" }
    ],
    grammar_note: {
      term: "Gramática",
      translation: "Grammar Note",
      explanation: "Practice structure and vocabulary in context.",
      example: "Práctica de español"
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B1 Tier 2: Subjunctive Introduction (Duda / Deseo / Petición)
  {
    id: 's149',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'El Consejo del Amigo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['recomiendo', 'descanses', 'estrés'],
    recycled_vocab: ['amigo', 'trabajo', 'salud'],
    mascot_line: 'Friendship means looking out for each other\'s well-being!',
    word_encounters_seed: ['recomiendo', 'descanses', 'estrés'],
    description: 'Giving friendly advice on stress management.',
    storyLines: [
      'Te recomiendo que descanses más durante el fin de semana.',
      'Es importante que evites el estrés del trabajo.',
      'Quiero que te sientas mejor muy pronto.'
    ],
    storyTranslations: [
      'I recommend that you rest more during the weekend.',
      'It is important that you avoid work stress.',
      'I want you to feel better very soon.'
    ],
    vocabulary: [
      { word: 'recomiendo', meaning: 'I recommend', pronunciation: 'rreh-koh-MYEHN-doh' },
      { word: 'descanses', meaning: 'you rest (subjunctive)', pronunciation: 'dehs-KAHN-sehs' },
      { word: 'estrés', meaning: 'stress', pronunciation: 'ehs-TREHS' }
    ],
    grammarNotes: [
      { title: 'Subjunctive with Recomendar / Querer (Recomiendo que descanses)', explanation: 'Verbs of recommendation and wish trigger subjunctive in dependent clauses.', exampleFromStory: 'Te recomiendo que descanses más...' }
    ],
    lines: [
      { text: "Te recomiendo que descanses más durante el fin de semana.", formula: "Te (Verb) + recomiendo que descanses más durante el fin de semana (Object)" },
      { text: "Es importante que evites el estrés del trabajo.", formula: "Es (Verb) + importante que evites el estrés del trabajo (Object)" },
      { text: "Quiero que te sientas mejor muy pronto.", formula: "Quiero (Verb) + que te sientas mejor muy pronto (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive with Recomendar / Querer (Recomiendo que descanses)",
      translation: "Subjunctive with Recomendar / Querer (Recomiendo que descanses)",
      explanation: "Verbs of recommendation and wish trigger subjunctive in dependent clauses.",
      example: "Te recomiendo que descanses más..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's150',
    lesson: 29,
    cefr_badge: 'B1',
    title: 'Dudas sobre la Mudanza',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['dudo', 'convenga', 'alquiler'],
    recycled_vocab: ['casa', 'ciudad', 'precio'],
    mascot_line: 'Weighing pros and cons before a big relocation!',
    word_encounters_seed: ['dudo', 'convenga', 'alquiler'],
    description: 'Expressing doubts about moving to another apartment.',
    storyLines: [
      'Dudo que ese piso sea la mejor opción para nosotros.',
      'No creo que el precio del alquiler sea razonable.',
      'Ojalá encontremos una alternativa más barata.'
    ],
    storyTranslations: [
      'I doubt that apartment is the best option for us.',
      'I don\'t think the rental price is reasonable.',
      'I hope we find a cheaper alternative.'
    ],
    vocabulary: [
      { word: 'dudo', meaning: 'I doubt', pronunciation: 'DOO-doh' },
      { word: 'convenga', meaning: 'suits/is suitable (subjunctive)', pronunciation: 'kohn-BEHN-gah' },
      { word: 'alquiler', meaning: 'rent', pronunciation: 'ahl-kee-LEHR' }
    ],
    grammarNotes: [
      { title: 'Subjunctive of Doubt (Dudo que sea / No creo que sea)', explanation: 'Dudar que and negative belief (no creer que) trigger present subjunctive.', exampleFromStory: 'Dudo que ese piso sea... No creo que sea...' }
    ],
    lines: [
      { text: "Dudo que ese piso sea la mejor opción para nosotros.", formula: "Dudo (Verb) + que ese piso se (Object) + a la mejor opción para nosotros (Place)" },
      { text: "No creo que el precio del alquiler sea razonable.", formula: "No (Verb) + creo que el precio del alquiler sea razonable (Object)" },
      { text: "Ojalá encontremos una alternativa más barata.", formula: "Ojalá (Verb) + encontremos una alternativa más barata (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive of Doubt (Dudo que sea / No creo que sea)",
      translation: "Subjunctive of Doubt (Dudo que sea / No creo que sea)",
      explanation: "Dudar que and negative belief (no creer que) trigger present subjunctive.",
      example: "Dudo que ese piso sea... No creo que sea..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's151',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Deseos de Cumpleaños',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['cumplas', 'logres', 'sueños'],
    recycled_vocab: ['fiesta', 'amigo', 'felicidad'],
    mascot_line: 'Wishing all your dreams come true on your birthday!',
    word_encounters_seed: ['cumplas', 'logres', 'sueños'],
    description: 'Wishing well to a close friend on their birthday.',
    storyLines: [
      'Espero que cumplas muchos años más con salud.',
      'Deseo que logres todos tus proyectos este año.',
      '¡Ojalá la pases de maravilla en tu fiesta!'
    ],
    storyTranslations: [
      'I hope you celebrate many more years in good health.',
      'I wish that you achieve all your projects this year.',
      'May you have a wonderful time at your party!'
    ],
    vocabulary: [
      { word: 'cumplas', meaning: 'you celebrate/reach (subjunctive)', pronunciation: 'KOOM-plahs' },
      { word: 'logres', meaning: 'you achieve (subjunctive)', pronunciation: 'LOH-grehs' },
      { word: 'sueños', meaning: 'dreams', pronunciation: 'SWEH-nyohs' }
    ],
    grammarNotes: [
      { title: 'Subjunctive with Ojalá / Desear', explanation: 'Ojalá and desear take subjunctive to express hopes and good wishes.', exampleFromStory: '¡Ojalá la pases de maravilla!' }
    ],
    lines: [
      { text: "Espero que cumplas muchos años más con salud.", formula: "Espero (Verb) + que cumplas muchos años más con salud (Object)" },
      { text: "Deseo que logres todos tus proyectos este año.", formula: "Deseo (Verb) + que logres todos tus proyectos (Object) + este año (Time)" },
      { text: "¡Ojalá la pases de maravilla en tu fiesta!", formula: "¡Ojalá (Verb) + la pases de maravilla en tu fiesta! (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive with Ojalá / Desear",
      translation: "Subjunctive with Ojalá / Desear",
      explanation: "Ojalá and desear take subjunctive to express hopes and good wishes.",
      example: "¡Ojalá la pases de maravilla!"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's152',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Planes Ecológicos en el Trabajo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['reduzcamos', 'plástico', 'reciclemos'],
    recycled_vocab: ['oficina', 'medio ambiente', 'empresa'],
    mascot_line: 'Green workplace initiatives help protect our planet!',
    word_encounters_seed: ['reduzcamos', 'plástico', 'reciclemos'],
    description: 'Proposing eco-friendly changes in the office.',
    storyLines: [
      'Es necesario que reduzcamos el consumo de papel.',
      'Sugiero que reciclemos todas las botellas de plástico.',
      'Espero que el equipo apoye esta iniciativa verde.'
    ],
    storyTranslations: [
      'It is necessary that we reduce paper consumption.',
      'I suggest that we recycle all plastic bottles.',
      'I hope the team supports this green initiative.'
    ],
    vocabulary: [
      { word: 'reduzcamos', meaning: 'we reduce (subjunctive)', pronunciation: 'rreh-dooth-KAH-mohs' },
      { word: 'plástico', meaning: 'plastic', pronunciation: 'PLAHS-tee-koh' },
      { word: 'reciclemos', meaning: 'we recycle (subjunctive)', pronunciation: 'rreh-thee-KLEH-mohs' }
    ],
    grammarNotes: [
      { title: 'Impersonal Expressions + Subjunctive (Es necesario que...)', explanation: 'Impersonal evaluation expressions take subjunctive when referring to a subject.', exampleFromStory: 'Es necesario que reduzcamos el papel.' }
    ],
    lines: [
      { text: "Es necesario que reduzcamos el consumo de papel.", formula: "Es (Verb) + necesario que reduzcamos el consumo de papel (Object)" },
      { text: "Sugiero que reciclemos todas las botellas de plástico.", formula: "Sugiero (Verb) + que reciclemos todas las botellas de plástico (Object)" },
      { text: "Espero que el equipo apoye esta iniciativa verde.", formula: "Espero (Verb) + que el equipo apoye esta iniciativa verde (Object)" }
    ],
    grammar_note: {
      term: "Impersonal Expressions + Subjunctive (Es necesario que...)",
      translation: "Impersonal Expressions + Subjunctive (Es necesario que...)",
      explanation: "Impersonal evaluation expressions take subjunctive when referring to a subject.",
      example: "Es necesario que reduzcamos el papel."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's153',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Organizando el Evento',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['asistan', 'confirmen', 'asistencia'],
    recycled_vocab: ['invitados', 'evento', 'mañana'],
    mascot_line: 'Smooth event planning requires timely RSVPs!',
    word_encounters_seed: ['asistan', 'confirmen', 'asistencia'],
    description: 'Organizing an event and requesting RSVPs.',
    storyLines: [
      'Pedimos a los invitados que confirmen su asistencia pronto.',
      'Es importante que lleguen a tiempo a la presentación.',
      'Ojalá asistan todas las personas convocadas.'
    ],
    storyTranslations: [
      'We ask the guests to confirm their attendance soon.',
      'It is important that they arrive on time for the presentation.',
      'Hopefully all invited people will attend.'
    ],
    vocabulary: [
      { word: 'asistan', meaning: 'they attend (subjunctive)', pronunciation: 'ah-SEES-tahn' },
      { word: 'confirmen', meaning: 'they confirm (subjunctive)', pronunciation: 'kohn-FEER-mehn' },
      { word: 'asistencia', meaning: 'attendance', pronunciation: 'ah-sees-TEHN-thyah' }
    ],
    grammarNotes: [
      { title: 'Subjunctive with Pedir (Pedimos que confirmen)', explanation: 'Verbs of request (pedir, rogar) require subjunctive for the requested action.', exampleFromStory: 'Pedimos a los invitados que confirmen...' }
    ],
    lines: [
      { text: "Pedimos a los invitados que confirmen su asistencia pronto.", formula: "Pedimos (Verb) + a los invitados que confirm (Object) + en su asistencia pronto (Place)" },
      { text: "Es importante que lleguen a tiempo a la presentación.", formula: "Es (Verb) + importante que lleguen a tiempo (Object) + a la presentación (Place)" },
      { text: "Ojalá asistan todas las personas convocadas.", formula: "Ojalá (Verb) + asistan todas las personas convocadas (Object)" }
    ],
    grammar_note: {
      term: "Subjunctive with Pedir (Pedimos que confirmen)",
      translation: "Subjunctive with Pedir (Pedimos que confirmen)",
      explanation: "Verbs of request (pedir, rogar) require subjunctive for the requested action.",
      example: "Pedimos a los invitados que confirmen..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's154',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'La Salud y la Nutrición',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['coma', 'beba', 'saludable'],
    recycled_vocab: ['doctor', 'agua', 'ejercicio'],
    mascot_line: 'Doctor\'s orders: balanced diet and plenty of water!',
    word_encounters_seed: ['coma', 'beba', 'saludable'],
    description: 'Nutritionist recommending healthier dietary habits.',
    storyLines: [
      'El nutricionista recomienda que coma más verduras frescas.',
      'Es fundamental que beba dos litros de agua al día.',
      'Duda que el azúcar en exceso sea bueno para mí.'
    ],
    storyTranslations: [
      'The nutritionist recommends that I eat more fresh vegetables.',
      'It is fundamental that I drink two liters of water a day.',
      'He doubts that excess sugar is good for me.'
    ],
    vocabulary: [
      { word: 'coma', meaning: 'I/he/she eat (subjunctive)', pronunciation: 'KOH-mah' },
      { word: 'beba', meaning: 'I/he/she drink (subjunctive)', pronunciation: 'BEH-bah' },
      { word: 'saludable', meaning: 'healthy', pronunciation: 'sah-loo-DAH-bleh' }
    ],
    grammarNotes: [
      { title: '-er Verbs in Present Subjunctive (Coma / Beba)', explanation: '-er verbs take -a endings in present subjunctive (comer → coma; beber → beba).', exampleFromStory: 'Recomienda que coma... Es fundamental que beba...' }
    ],
    lines: [
      { text: "El nutricionista recomienda que coma más verduras frescas.", formula: "El (Verb) + nutricionista recomienda que coma más verduras frescas (Object)" },
      { text: "Es fundamental que beba dos litros de agua al día.", formula: "Es (Verb) + fundament (Object) + al que beba dos litros de agua al día (Place)" },
      { text: "Duda que el azúcar en exceso sea bueno para mí.", formula: "Duda (Verb) + que el azúcar en exceso sea bueno para mí (Object)" }
    ],
    grammar_note: {
      term: "-er Verbs in Present Subjunctive (Coma / Beba)",
      translation: "-er Verbs in Present Subjunctive (Coma / Beba)",
      explanation: "-er verbs take -a endings in present subjunctive (comer → coma; beber → beba).",
      example: "Recomienda que coma... Es fundamental que beba..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's155',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Buscando Trabajo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['llamen', 'entrevista', 'currículum'],
    recycled_vocab: ['empresa', 'trabajo', 'esperanza'],
    mascot_line: 'Fingers crossed for that upcoming job interview call!',
    word_encounters_seed: ['llamen', 'entrevista', 'currículum'],
    description: 'Applying for jobs and waiting for interview callbacks.',
    storyLines: [
      'He enviado mi currículum a tres empresas diferentes.',
      'Ojalá me llamen para una entrevista la semana que viene.',
      'Espero que valoren mi experiencia en el sector.'
    ],
    storyTranslations: [
      'I have sent my resume to three different companies.',
      'Hopefully they call me for an interview next week.',
      'I hope they value my experience in the sector.'
    ],
    vocabulary: [
      { word: 'llamen', meaning: 'they call (subjunctive)', pronunciation: 'LYAH-mehn' },
      { word: 'entrevista', meaning: 'interview', pronunciation: 'ehn-treh-BEES-tah' },
      { word: 'currículum', meaning: 'resume/CV', pronunciation: 'koo-RREE-koo-loom' }
    ],
    grammarNotes: [
      { title: 'Subjunctive with Hopes (Ojalá llamen / Espero que valoren)', explanation: 'Uncertain future events after hoping expressions take subjunctive.', exampleFromStory: 'Ojalá me llamen... Espero que valoren...' }
    ],
    lines: [
      { text: "He enviado mi currículum a tres empresas diferentes.", formula: "He (Verb) + enviado mi currículum a tres empresas diferentes (Object)" },
      { text: "Ojalá me llamen para una entrevista la semana que viene.", formula: "Ojalá (Verb) + me llamen para una entrevist (Object) + a la semana que viene (Place)" },
      { text: "Espero que valoren mi experiencia en el sector.", formula: "Espero (Verb) + que valoren mi experiencia (Object) + en el sector (Place)" }
    ],
    grammar_note: {
      term: "Subjunctive with Hopes (Ojalá llamen / Espero que valoren)",
      translation: "Subjunctive with Hopes (Ojalá llamen / Espero que valoren)",
      explanation: "Uncertain future events after hoping expressions take subjunctive.",
      example: "Ojalá me llamen... Espero que valoren..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's156',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Permisos de Conducir',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 2,
    new_grammar_point: 'subjunctive intro (duda, deseo, recomendación)',
    new_vocab: ['apruebe', 'coche', 'práctico'],
    recycled_vocab: ['examen', 'estudiado', 'conducir'],
    mascot_line: 'Passing the driving test opens doors to road trips!',
    word_encounters_seed: ['apruebe', 'coche', 'práctico'],
    description: 'Taking the practical driving exam.',
    storyLines: [
      'He practicado mucho para el examen de conducir.',
      'Mi examinador espera que cumpla todas las normas de tráfico.',
      'Dudo que apruebe a la primera, pero lo intentaré.'
    ],
    storyTranslations: [
      'I have practiced a lot for the driving test.',
      'My examiner expects me to obey all traffic rules.',
      'I doubt I will pass on the first try, but I will try.'
    ],
    vocabulary: [
      { word: 'apruebe', meaning: 'I pass (subjunctive)', pronunciation: 'ah-PRWEH-beh' },
      { word: 'coche', meaning: 'car', pronunciation: 'KOH-cheh' },
      { word: 'práctico', meaning: 'practical', pronunciation: 'PRAHK-tee-koh' }
    ],
    grammarNotes: [
      { title: 'Stem-Changing Subjunctive (Apruebe)', explanation: 'Aprobar changes o→ue in subjunctive singular forms (yo apruebe).', exampleFromStory: 'Dudo que apruebe a la primera.' }
    ],
    lines: [
      { text: "He practicado mucho para el examen de conducir.", formula: "He (Verb) + practicado mucho para el examen de conducir (Object)" },
      { text: "Mi examinador espera que cumpla todas las normas de tráfico.", formula: "Mi (Verb) + examinador espera que cumpla todas las normas de tráfico (Object)" },
      { text: "Dudo que apruebe a la primera, pero lo intentaré.", formula: "Dudo (Verb) + que apruebe (Object) + a la primera, pero lo intentaré (Place)" }
    ],
    grammar_note: {
      term: "Stem-Changing Subjunctive (Apruebe)",
      translation: "Stem-Changing Subjunctive (Apruebe)",
      explanation: "Aprobar changes o→ue in subjunctive singular forms (yo apruebe).",
      example: "Dudo que apruebe a la primera."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B1 Tier 3: Conditional Tense
  {
    id: 's157',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'El Viaje Soñado',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['viajaría', 'Japón', 'gastaría'],
    recycled_vocab: ['dinero', 'mundo', 'vacaciones'],
    mascot_line: 'Dreaming of bullet trains and cherry blossoms in Japan!',
    word_encounters_seed: ['viajaría', 'Japón', 'gastaría'],
    description: 'Describing what one would do with unlimited time and money.',
    storyLines: [
      'Si tuviera más tiempo, viajaría a Japón este año.',
      'Visitaría templos antiguos y probaría el sushi local.',
      'No me importaría gastar mis ahorros en esa aventura.'
    ],
    storyTranslations: [
      'If I had more time, I would travel to Japan this year.',
      'I would visit ancient temples and try local sushi.',
      'I wouldn\'t mind spending my savings on that adventure.'
    ],
    vocabulary: [
      { word: 'viajaría', meaning: 'I would travel', pronunciation: 'byah-hah-REE-ah' },
      { word: 'Japón', meaning: 'Japan', pronunciation: 'hah-POHN' },
      { word: 'gastaría', meaning: 'I would spend', pronunciation: 'gahs-tah-REE-ah' }
    ],
    grammarNotes: [
      { title: 'Conditional -ar/-er/-ir (-ía)', explanation: 'Conditional tense adds -ía, -ías, -ía, -íamos to the infinitive form.', exampleFromStory: 'Viajaría a Japón... Visitaría templos...' }
    ],
    lines: [
      { text: "Si tuviera más tiempo, viajaría a Japón este año.", formula: "Si (Verb) + tuviera más tiempo, viajaría a Japón (Object) + este año (Time)" },
      { text: "Visitaría templos antiguos y probaría el sushi local.", formula: "Visitaría (Verb) + templos antiguos y probaría el sushi local (Object)" },
      { text: "No me importaría gastar mis ahorros en esa aventura.", formula: "No (Verb) + me importaría gastar mis ahorros en esa aventura (Object)" }
    ],
    grammar_note: {
      term: "Conditional -ar/-er/-ir (-ía)",
      translation: "Conditional -ar/-er/-ir (-ía)",
      explanation: "Conditional tense adds -ía, -ías, -ía, -íamos to the infinitive form.",
      example: "Viajaría a Japón... Visitaría templos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's158',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'El Trabajo Ideal',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['trabajaría', 'remoto', 'horarios'],
    recycled_vocab: ['empresa', 'oficina', 'vida'],
    mascot_line: 'Remote work lets you design your own perfect schedule!',
    word_encounters_seed: ['trabajaría', 'remoto', 'horarios'],
    description: 'Imagining the ideal work arrangements.',
    storyLines: [
      'Me gustaría trabajar al cien por cien de forma remota.',
      'Organizaría mis horarios para tener más tiempo libre.',
      'Podría vivir en cualquier ciudad del mundo.'
    ],
    storyTranslations: [
      'I would like to work one hundred percent remotely.',
      'I would organize my schedule to have more free time.',
      'I could live in any city in the world.'
    ],
    vocabulary: [
      { word: 'trabajaría', meaning: 'I would work', pronunciation: 'trah-bah-hah-REE-ah' },
      { word: 'remoto', meaning: 'remote', pronunciation: 'rreh-MOH-toh' },
      { word: 'horarios', meaning: 'schedules', pronunciation: 'oh-RAH-ryohs' }
    ],
    grammarNotes: [
      { title: 'Me Gustaría + Infinitive', explanation: 'Polite way to express wishes and hypotheticals using conditional of gustar.', exampleFromStory: 'Me gustaría trabajar... de forma remota.' }
    ],
    lines: [
      { text: "Me gustaría trabajar al cien por cien de forma remota.", formula: "Me (Verb) + gustaría trabajar (Object) + al cien por cien de forma remota (Place)" },
      { text: "Organizaría mis horarios para tener más tiempo libre.", formula: "Organizaría (Verb) + mis horarios para tener más tiempo libre (Object)" },
      { text: "Podría vivir en cualquier ciudad del mundo.", formula: "Podría (Verb) + vivir en cualquier ciudad del mundo (Object)" }
    ],
    grammar_note: {
      term: "Me Gustaría + Infinitive",
      translation: "Me Gustaría + Infinitive",
      explanation: "Polite way to express wishes and hypotheticals using conditional of gustar.",
      example: "Me gustaría trabajar... de forma remota."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's159',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'Una Decisión Difícil',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['haría', 'situación', 'consejo'],
    recycled_vocab: ['amigo', 'problema', 'pensaría'],
    mascot_line: 'Putting yourself in someone else\'s shoes gives perspective!',
    word_encounters_seed: ['haría', 'situación', 'consejo'],
    description: 'Giving conditional advice on a dilemma.',
    storyLines: [
      '¿Qué harías tú en mi situación actual?',
      'Yo en tu lugar hablaría directamente con el director.',
      'Explicaría los hechos con tranquilidad y claridad.'
    ],
    storyTranslations: [
      'What would you do in my current situation?',
      'In your place, I would speak directly with the director.',
      'I would explain the facts with calm and clarity.'
    ],
    vocabulary: [
      { word: 'haría', meaning: 'I/he/she would do', pronunciation: 'ah-REE-ah' },
      { word: 'situación', meaning: 'situation', pronunciation: 'see-twah-THYOHN' },
      { word: 'consejo', meaning: 'advice', pronunciation: 'kohn-SEH-hoh' }
    ],
    grammarNotes: [
      { title: 'Irregular Conditional (Hacer → Haría)', explanation: 'Hacer drops the -ce- stem in conditional: haría, harías, haríamos.', exampleFromStory: '¿Qué harías tú en mi situación?' }
    ],
    lines: [
      { text: "¿Qué harías tú en mi situación actual?", formula: "¿Qué (Verb) + harías tú (Object) + en mi situación actual? (Place)" },
      { text: "Yo en tu lugar hablaría directamente con el director.", formula: "Yo (Subject) + en (Verb) + tu lugar hablaría directamente con el director (Object)" },
      { text: "Explicaría los hechos con tranquilidad y claridad.", formula: "Explicaría (Verb) + los hechos con tranquilidad y claridad (Object)" }
    ],
    grammar_note: {
      term: "Irregular Conditional (Hacer → Haría)",
      translation: "Irregular Conditional (Hacer → Haría)",
      explanation: "Hacer drops the -ce- stem in conditional: haría, harías, haríamos.",
      example: "¿Qué harías tú en mi situación?"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's160',
    lesson: 30,
    cefr_badge: 'B1',
    title: 'La Casa en la Montaña',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['compraría', 'cabaña', 'chimenea'],
    recycled_vocab: ['montaña', 'bosque', 'tranquilidad'],
    mascot_line: 'A cozy log cabin with a roaring fireplace in winter!',
    word_encounters_seed: ['compraría', 'cabaña', 'chimenea'],
    description: 'Describing a hypothetical mountain home.',
    storyLines: [
      'Si pudiera, compraría una cabaña en la montaña.',
      'Pondría una chimenea grande en la sala de estar.',
      'Pasaría los inviernos leyendo junto al fuego.'
    ],
    storyTranslations: [
      'If I could, I would buy a cabin in the mountain.',
      'I would put a big fireplace in the living room.',
      'I would spend winters reading next to the fire.'
    ],
    vocabulary: [
      { word: 'compraría', meaning: 'I would buy', pronunciation: 'kohm-prah-REE-ah' },
      { word: 'cabaña', meaning: 'cabin', pronunciation: 'kah-BAH-nyah' },
      { word: 'chimenea', meaning: 'fireplace', pronunciation: 'chee-meh-NEH-ah' }
    ],
    grammarNotes: [
      { title: 'Irregular Conditional (Poner → Pondría)', explanation: 'Poner changes stem to pondr- in conditional: pondría, pondrías.', exampleFromStory: 'Pondría una chimenea grande...' }
    ],
    lines: [
      { text: "Si pudiera, compraría una cabaña en la montaña.", formula: "Si (Verb) + pudiera, compraría una cabaña (Object) + en la montaña (Place)" },
      { text: "Pondría una chimenea grande en la sala de estar.", formula: "Pondría (Verb) + una chimenea grande (Object) + en la sala de estar (Place)" },
      { text: "Pasaría los inviernos leyendo junto al fuego.", formula: "Pasaría (Verb) + los inviernos leyendo junto (Object) + al fuego (Place)" }
    ],
    grammar_note: {
      term: "Irregular Conditional (Poner → Pondría)",
      translation: "Irregular Conditional (Poner → Pondría)",
      explanation: "Poner changes stem to pondr- in conditional: pondría, pondrías.",
      example: "Pondría una chimenea grande..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's161',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'Cambios en la Ciudad',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['construiría', 'peatonal', 'carriles'],
    recycled_vocab: ['ciudad', 'parque', 'coches'],
    mascot_line: 'More green zones and bike lanes make cities liveable!',
    word_encounters_seed: ['construiría', 'peatonal', 'carriles'],
    description: 'Hypothesizing urban planning improvements.',
    storyLines: [
      'Si fuera alcalde, construiría más parques urbanos.',
      'Haría peatonal todo el centro histórico de la ciudad.',
      'Añadiría carriles para bicicletas en cada avenida.'
    ],
    storyTranslations: [
      'If I were mayor, I would build more urban parks.',
      'I would make the entire historic center pedestrian-only.',
      'I would add bike lanes on every avenue.'
    ],
    vocabulary: [
      { word: 'construiría', meaning: 'I would build', pronunciation: 'kohns-trwee-REE-ah' },
      { word: 'peatonal', meaning: 'pedestrian', pronunciation: 'peh-ah-toh-NAL' },
      { word: 'carriles', meaning: 'lanes', pronunciation: 'kah-RREE-lehs' }
    ],
    grammarNotes: [
      { title: 'Hypothetical Conditional (Construiría, Haría, Añadiría)', explanation: 'Describes ideal outcome of hypothetical scenarios.', exampleFromStory: 'Construiría más parques... Haría peatonal...' }
    ],
    lines: [
      { text: "Si fuera alcalde, construiría más parques urbanos.", formula: "Si (Verb) + fuera alcalde, construiría más parques urbanos (Object)" },
      { text: "Haría peatonal todo el centro histórico de la ciudad.", formula: "Haría (Verb) + peaton (Object) + al todo el centro histórico de la ciudad (Place)" },
      { text: "Añadiría carriles para bicicletas en cada avenida.", formula: "Añadiría (Verb) + carriles para bicicletas en cada avenida (Object)" }
    ],
    grammar_note: {
      term: "Hypothetical Conditional (Construiría, Haría, Añadiría)",
      translation: "Hypothetical Conditional (Construiría, Haría, Añadiría)",
      explanation: "Describes ideal outcome of hypothetical scenarios.",
      example: "Construiría más parques... Haría peatonal..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's162',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'Planes de Fin de Semana',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['saldríamos', 'lloviera', 'plan'],
    recycled_vocab: ['fin de semana', 'amigos', 'cine'],
    mascot_line: 'Rainy days call for cozy indoor plans!',
    word_encounters_seed: ['saldríamos', 'lloviera', 'plan'],
    description: 'Planning backup activities in case of rain.',
    storyLines: [
      'Si no lloviera, saldríamos a pasear por el campo.',
      'En lugar de eso, iríamos al cine a ver un estreno.',
      'Cenaríamos en nuestro restaurante italiano preferido.'
    ],
    storyTranslations: [
      'If it weren\'t raining, we would go for a walk in the countryside.',
      'Instead of that, we would go to the cinema to see a release.',
      'We would have dinner at our favorite Italian restaurant.'
    ],
    vocabulary: [
      { word: 'saldríamos', meaning: 'we would go out', pronunciation: 'sahl-DREE-ah-mohs' },
      { word: 'lloviera', meaning: 'it were raining (subjunctive)', pronunciation: 'lyoh-BYEHR-ah' },
      { word: 'plan', meaning: 'plan', pronunciation: 'plahn' }
    ],
    grammarNotes: [
      { title: 'Irregular Conditional (Salir → Saldríamos)', explanation: 'Salir changes stem to saldr- in conditional: saldría, saldríamos.', exampleFromStory: 'Saldríamos a pasear por el campo.' }
    ],
    lines: [
      { text: "Si no lloviera, saldríamos a pasear por el campo.", formula: "Si (Verb) + no lloviera, saldríamos a pasear por el campo (Object)" },
      { text: "En lugar de eso, iríamos al cine a ver un estreno.", formula: "En (Verb) + lugar de eso, iríamos (Object) + al cine a ver un estreno (Place)" },
      { text: "Cenaríamos en nuestro restaurante italiano preferido.", formula: "Cenaríamos (Verb) + en nuestro restaurante italiano preferido (Object)" }
    ],
    grammar_note: {
      term: "Irregular Conditional (Salir → Saldríamos)",
      translation: "Irregular Conditional (Salir → Saldríamos)",
      explanation: "Salir changes stem to saldr- in conditional: saldría, saldríamos.",
      example: "Saldríamos a pasear por el campo."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's163',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'El Menú de la Fiesta',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['serviría', 'platos', 'maridaje'],
    recycled_vocab: ['cena', 'invitados', 'vino'],
    mascot_line: 'Designing a gourmet menu for dinner guests!',
    word_encounters_seed: ['serviría', 'platos', 'maridaje'],
    description: 'Planning a dinner menu for guests.',
    storyLines: [
      'Para la cena de gala, serviría tres platos principales.',
      'Elegiría un vino tinto de la Rioja para el maridaje.',
      'Ofrecería un postre casero de chocolate amargo.'
    ],
    storyTranslations: [
      'For the gala dinner, I would serve three main courses.',
      'I would choose a red wine from Rioja for the pairing.',
      'I would offer a homemade dark chocolate dessert.'
    ],
    vocabulary: [
      { word: 'serviría', meaning: 'I would serve', pronunciation: 'sehr-bee-REE-ah' },
      { word: 'platos', meaning: 'dishes/courses', pronunciation: 'PLAH-tohs' },
      { word: 'maridaje', meaning: 'pairing (wine)', pronunciation: 'mah-ree-DAH-heh' }
    ],
    grammarNotes: [
      { title: 'Conditional -ir Verbs (Serviría, Elegiría)', explanation: '-ir verbs retain their full infinitive stem in regular conditional.', exampleFromStory: 'Serviría tres platos... Elegiría un vino...' }
    ],
    lines: [
      { text: "Para la cena de gala, serviría tres platos principales.", formula: "Par (Verb) + a la cena de gala, serviría tres platos principales (Place)" },
      { text: "Elegiría un vino tinto de la Rioja para el maridaje.", formula: "Elegiría (Verb) + un vino tinto (Object) + de la Rioja para el maridaje (Place)" },
      { text: "Ofrecería un postre casero de chocolate amargo.", formula: "Ofrecería (Verb) + un postre casero de chocolate amargo (Object)" }
    ],
    grammar_note: {
      term: "Conditional -ir Verbs (Serviría, Elegiría)",
      translation: "Conditional -ir Verbs (Serviría, Elegiría)",
      explanation: "-ir verbs retain their full infinitive stem in regular conditional.",
      example: "Serviría tres platos... Elegiría un vino..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's164',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'El Superpoder Elegido',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 3,
    new_grammar_point: 'conditional tense',
    new_vocab: ['volaría', 'invisibilidad', 'superpoder'],
    recycled_vocab: ['mundo', 'tiempo', 'ayudaría'],
    mascot_line: 'Flying across the skies would be the ultimate power!',
    word_encounters_seed: ['volaría', 'invisibilidad', 'superpoder'],
    description: 'Fun conversation about choosing a superpower.',
    storyLines: [
      'Si pudiera elegir un superpoder, me gustaría volar.',
      'Volaría sobre las montañas y los océanos del mundo.',
      'Ayudaría a las personas en situaciones de peligro.'
    ],
    storyTranslations: [
      'If I could choose a superpower, I would like to fly.',
      'I would fly over the mountains and oceans of the world.',
      'I would help people in dangerous situations.'
    ],
    vocabulary: [
      { word: 'volaría', meaning: 'I would fly', pronunciation: 'boh-lah-REE-ah' },
      { word: 'invisibilidad', meaning: 'invisibility', pronunciation: 'een-bee-see-bee-lee-DAD' },
      { word: 'superpoder', meaning: 'superpower', pronunciation: 'soo-pehr-poh-DEHR' }
    ],
    grammarNotes: [
      { title: 'Conditional for Imaginary Scenarios', explanation: 'Conditional is ideal for discussing impossible or fantasy scenarios.', exampleFromStory: 'Volaría sobre las montañas... Ayudaría a las personas...' }
    ],
    lines: [
      { text: "Si pudiera elegir un superpoder, me gustaría volar.", formula: "Si (Verb) + pudiera elegir un superpoder, me gustaría volar (Object)" },
      { text: "Volaría sobre las montañas y los océanos del mundo.", formula: "Volaría (Verb) + sobre las montañas y los océanos del mundo (Object)" },
      { text: "Ayudaría a las personas en situaciones de peligro.", formula: "Ayudaría (Verb) + a las personas en situaciones de peligro (Object)" }
    ],
    grammar_note: {
      term: "Conditional for Imaginary Scenarios",
      translation: "Conditional for Imaginary Scenarios",
      explanation: "Conditional is ideal for discussing impossible or fantasy scenarios.",
      example: "Volaría sobre las montañas... Ayudaría a las personas..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B1 Tier 4: Relative Clauses & Reported Speech
  {
    id: 's165',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'La Noticia del Día',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['anunció', 'construiría', 'periodista'],
    recycled_vocab: ['noticias', 'alcalde', 'ciudad'],
    mascot_line: 'Staying informed through reliable daily news reporting!',
    word_encounters_seed: ['anunció', 'construiría', 'periodista'],
    description: 'Reporting what the mayor announced in the news.',
    storyLines: [
      'El periodista dijo que el alcalde había firmado el acuerdo.',
      'Anunció que construirían un nuevo centro cultural en el barrio.',
      'La comunidad celebró la noticia que publicaron los diarios.'
    ],
    storyTranslations: [
      'The journalist said that the mayor had signed the agreement.',
      'He announced that they would build a new cultural center in the neighborhood.',
      'The community celebrated the news that the newspapers published.'
    ],
    vocabulary: [
      { word: 'anunció', meaning: 'announced', pronunciation: 'ah-noon-THYOH' },
      { word: 'construiría', meaning: 'would build', pronunciation: 'kohns-trwee-REE-ah' },
      { word: 'periodista', meaning: 'journalist', pronunciation: 'peh-ryoh-DEES-tah' }
    ],
    grammarNotes: [
      { title: 'Reported Speech Backshift (Dijo que había firmado)', explanation: 'Direct past events shift to past perfect (había firmado) in reported speech.', exampleFromStory: 'Dijo que el alcalde había firmado...' }
    ],
    lines: [
      { text: "El periodista dijo que el alcalde había firmado el acuerdo.", formula: "El (Verb) + periodista dijo que el alcalde había firmado el acuerdo (Object)" },
      { text: "Anunció que construirían un nuevo centro cultural en el barrio.", formula: "Anunció (Verb) + que construirían un nuevo centro cultural (Object) + en el barrio (Place)" },
      { text: "La comunidad celebró la noticia que publicaron los diarios.", formula: "La (Verb) + comunidad celebró la noticia que publicaron los diarios (Object)" }
    ],
    grammar_note: {
      term: "Reported Speech Backshift (Dijo que había firmado)",
      translation: "Reported Speech Backshift (Dijo que había firmado)",
      explanation: "Direct past events shift to past perfect (había firmado) in reported speech.",
      example: "Dijo que el alcalde había firmado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's166',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'El Mensaje Perdido',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['afirmó', 'enviado', 'receptor'],
    recycled_vocab: ['correo', 'mensaje', 'llegado'],
    mascot_line: 'Verifying sent messages to avoid misunderstandings!',
    word_encounters_seed: ['afirmó', 'enviado', 'receptor'],
    description: 'Passing along information about an unreceived email.',
    storyLines: [
      'María afirmó que ya había enviado el documento importante.',
      'El cliente al que llamé dijo que no había recibido nada.',
      'Revisamos el correo que enviamos para corregir la dirección.'
    ],
    storyTranslations: [
      'María stated that she had already sent the important document.',
      'The client whom I called said that he had received nothing.',
      'We checked the email that we sent to correct the address.'
    ],
    vocabulary: [
      { word: 'afirmó', meaning: 'stated/asserted', pronunciation: 'ah-feer-MOH' },
      { word: 'enviado', meaning: 'sent', pronunciation: 'ehn-BYAH-doh' },
      { word: 'receptor', meaning: 'recipient', pronunciation: 'rreh-thehp-TOHR' }
    ],
    grammarNotes: [
      { title: 'Relative Pronoun with Preposition (Al que llamé)', explanation: '"Al que" (to whom / which) introduces prepositional relative clauses.', exampleFromStory: 'El cliente al que llamé dijo que...' }
    ],
    lines: [
      { text: "María afirmó que ya había enviado el documento importante.", formula: "María (Subject) + afirmó (Verb) + que ya había enviado el documento importante (Object)" },
      { text: "El cliente al que llamé dijo que no había recibido nada.", formula: "El (Verb) + cliente (Object) + al que llamé dijo que no había recibido nada (Place)" },
      { text: "Revisamos el correo que enviamos para corregir la dirección.", formula: "Revisamos (Verb) + el correo que enviamos para corregir la dirección (Object)" }
    ],
    grammar_note: {
      term: "Relative Pronoun with Preposition (Al que llamé)",
      translation: "Relative Pronoun with Preposition (Al que llamé)",
      explanation: "\"Al que\" (to whom / which) introduces prepositional relative clauses.",
      example: "El cliente al que llamé dijo que..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's167',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'El Informe del Proyecto',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['explicó', 'conclusiones', 'datos'],
    recycled_vocab: ['informe', 'reunión', 'presentó'],
    mascot_line: 'Presenting clear data analysis to key stakeholders!',
    word_encounters_seed: ['explicó', 'conclusiones', 'datos'],
    description: 'Summarizing a project meeting report.',
    storyLines: [
      'El director explicó que el proyecto avanzaba según lo previsto.',
      'Los datos que presentaron en la reunión confirman el éxito.',
      'Comentó que el equipo entregaría el informe final el viernes.'
    ],
    storyTranslations: [
      'The director explained that the project was advancing as planned.',
      'The data that they presented in the meeting confirm the success.',
      'He commented that the team would deliver the final report on Friday.'
    ],
    vocabulary: [
      { word: 'explicó', meaning: 'explained', pronunciation: 'ehks-plee-KOH' },
      { word: 'conclusiones', meaning: 'conclusions', pronunciation: 'kohn-kloo-SYOH-nehs' },
      { word: 'datos', meaning: 'data/figures', pronunciation: 'DAH-tohs' }
    ],
    grammarNotes: [
      { title: 'Reported Future as Conditional (Entregaría)', explanation: 'Future plans in direct speech become conditional in reported past speech.', exampleFromStory: 'Comentó que el equipo entregaría el informe...' }
    ],
    lines: [
      { text: "El director explicó que el proyecto avanzaba según lo previsto.", formula: "El (Verb) + director explicó que el proyecto avanzaba según lo previsto (Object)" },
      { text: "Los datos que presentaron en la reunión confirman el éxito.", formula: "Los (Verb) + datos que presentaron (Object) + en la reunión confirman el éxito (Place)" },
      { text: "Comentó que el equipo entregaría el informe final el viernes.", formula: "Comentó (Verb) + que el equipo entregaría el informe final (Object) + el viernes (Time)" }
    ],
    grammar_note: {
      term: "Reported Future as Conditional (Entregaría)",
      translation: "Reported Future as Conditional (Entregaría)",
      explanation: "Future plans in direct speech become conditional in reported past speech.",
      example: "Comentó que el equipo entregaría el informe..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's168',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'Historias del Viajero',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['relató', 'aventuras', 'pueblos'],
    recycled_vocab: ['viajero', 'historias', 'visitó'],
    mascot_line: 'Travelers share incredible tales of far-away lands!',
    word_encounters_seed: ['relató', 'aventuras', 'pueblos'],
    description: 'Listening to tales told by an experienced traveler.',
    storyLines: [
      'El viajero nos relató que había recorrido más de treinta países.',
      'Las historias que contó sobre las tribus locales nos fascinaron.',
      'Dijo que la hospitalidad que encontró en cada lugar fue increíble.'
    ],
    storyTranslations: [
      'The traveler related to us that he had traveled over thirty countries.',
      'The stories that he told about local tribes fascinated us.',
      'He said that the hospitality that he found in each place was incredible.'
    ],
    vocabulary: [
      { word: 'relató', meaning: 'recounted/related', pronunciation: 'rreh-lah-TOH' },
      { word: 'aventuras', meaning: 'adventures', pronunciation: 'ah-behn-TOO-rahs' },
      { word: 'pueblos', meaning: 'peoples/towns', pronunciation: 'PWEH-blohs' }
    ],
    grammarNotes: [
      { title: 'Relative Pronoun Que (Las historias que contó)', explanation: '"Que" connects the main noun with a descriptive clause.', exampleFromStory: 'Las historias que contó... Dijo que la hospitalidad que encontró...' }
    ],
    lines: [
      { text: "El viajero nos relató que había recorrido más de treinta países.", formula: "El (Verb) + viajero nos relató que había recorrido más de treinta países (Object)" },
      { text: "Las historias que contó sobre las tribus locales nos fascinaron.", formula: "Las (Verb) + historias que contó sobre las tribus locales nos fascinaron (Object)" },
      { text: "Dijo que la hospitalidad que encontró en cada lugar fue increíble.", formula: "Dijo (Verb) + que la hospitalidad que encontró en cada lugar fue increíble (Object)" }
    ],
    grammar_note: {
      term: "Relative Pronoun Que (Las historias que contó)",
      translation: "Relative Pronoun Que (Las historias que contó)",
      explanation: "\"Que\" connects the main noun with a descriptive clause.",
      example: "Las historias que contó... Dijo que la hospitalidad que encontró..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's169',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'La Recomendación del Médico',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['indicó', 'tratamiento', 'especialista'],
    recycled_vocab: ['médico', 'salud', 'receta'],
    mascot_line: 'Following medical advice keeps recovery on track!',
    word_encounters_seed: ['indicó', 'tratamiento', 'especialista'],
    description: 'Relaying medical instructions to family members.',
    storyLines: [
      'El especialista indicó que el tratamiento debía durar dos semanas.',
      'La medicina que me recetó redujo el dolor inmediatamente.',
      'Me aseguró que me recuperaría totalmente en pocos días.'
    ],
    storyTranslations: [
      'The specialist indicated that the treatment was to last two weeks.',
      'The medicine that he prescribed for me reduced the pain immediately.',
      'He assured me that I would recover fully in a few days.'
    ],
    vocabulary: [
      { word: 'indicó', meaning: 'indicated/instructed', pronunciation: 'een-dee-KOH' },
      { word: 'tratamiento', meaning: 'treatment', pronunciation: 'trah-tah-MYEHN-toh' },
      { word: 'especialista', meaning: 'specialist', pronunciation: 'ehs-peh-thyah-LEES-tah' }
    ],
    grammarNotes: [
      { title: 'Imperfect in Reported Speech (Debía durar)', explanation: 'Must/should obligations in direct speech shift to imperfect in reported speech.', exampleFromStory: 'El especialista indicó que el tratamiento debía durar...' }
    ],
    lines: [
      { text: "El especialista indicó que el tratamiento debía durar dos semanas.", formula: "El (Verb) + especialista indicó que el tratamiento debía durar dos semanas (Object)" },
      { text: "La medicina que me recetó redujo el dolor inmediatamente.", formula: "La (Verb) + medicina que me recetó redujo el dolor inmediatamente (Object)" },
      { text: "Me aseguró que me recuperaría totalmente en pocos días.", formula: "Me (Verb) + aseguró que me recuperaría totalmente en pocos días (Object)" }
    ],
    grammar_note: {
      term: "Imperfect in Reported Speech (Debía durar)",
      translation: "Imperfect in Reported Speech (Debía durar)",
      explanation: "Must/should obligations in direct speech shift to imperfect in reported speech.",
      example: "El especialista indicó que el tratamiento debía durar..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's170',
    lesson: 31,
    cefr_badge: 'C1',
    title: 'El Secreto Revelado',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    tier: 4,
    new_grammar_point: 'relative clauses + reported speech',
    new_vocab: ['confesó', 'oculto', 'verdad'],
    recycled_vocab: ['secreto', 'historia', 'amigo'],
    mascot_line: 'Truth always comes to light in due time!',
    word_encounters_seed: ['confesó', 'oculto', 'verdad'],
    description: 'Learning a secret that was hidden for years.',
    storyLines: [
      'Mi amigo confesó que había guardado el secreto durante años.',
      'La verdad que nos reveló cambió nuestra perspectiva por completo.',
      'Dijo que se sentía aliviado tras contar la historia real.'
    ],
    storyTranslations: [
      'My friend confessed that he had kept the secret for years.',
      'The truth that he revealed to us changed our perspective completely.',
      'He said that he felt relieved after telling the real story.'
    ],
    vocabulary: [
      { word: 'confesó', meaning: 'confessed', pronunciation: 'kohn-feh-SOH' },
      { word: 'oculto', meaning: 'hidden/concealed', pronunciation: 'oh-KOOL-toh' },
      { word: 'verdad', meaning: 'truth', pronunciation: 'behr-DAD' }
    ],
    grammarNotes: [
      { title: 'Past Perfect in Reported Speech (Había guardado)', explanation: 'Había + past participle marks events prior to the confession.', exampleFromStory: 'Confesó que había guardado el secreto...' }
    ],
    lines: [
      { text: "Mi amigo confesó que había guardado el secreto durante años.", formula: "Mi (Verb) + amigo confesó que había guardado el secreto durante años (Object)" },
      { text: "La verdad que nos reveló cambió nuestra perspectiva por completo.", formula: "La (Verb) + verdad que nos reveló cambió nuestra perspectiva por completo (Object)" },
      { text: "Dijo que se sentía aliviado tras contar la historia real.", formula: "Dijo (Verb) + que se sentía aliviado tras contar la historia real (Object)" }
    ],
    grammar_note: {
      term: "Past Perfect in Reported Speech (Había guardado)",
      translation: "Past Perfect in Reported Speech (Había guardado)",
      explanation: "Había + past participle marks events prior to the confession.",
      example: "Confesó que había guardado el secreto..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // ── B2 LEVEL ──
  {
    id: 's35',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'La Entrevista de Trabajo',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'A candidate detailing project coordination in a job interview.',
    storyLines: [
      'Hábleme de su experiencia previa liderando equipos multiculturales.',
      'He gestionado proyectos internacionales con éxito durante tres años en Madrid.',
      'Buscamos a un candidato idóneo capaz de resolver conflictos laborales.'
    ],
    storyTranslations: [
      'Tell me about your previous experience leading multicultural teams.',
      'I have successfully managed international projects for three years in Madrid.',
      'We are looking for a suitable candidate capable of resolving workplace conflicts.'
    ],
    vocabulary: [
      { word: 'experiencia', meaning: 'experience', pronunciation: 'ehks-peh-RYEHN-thyah' },
      { word: 'gestionado', meaning: 'managed', pronunciation: 'hehs-tyoh-NAH-doh' },
      { word: 'conflictos', meaning: 'conflicts', pronunciation: 'kon-FLEEK-tohs' }
    ],
    grammarNotes: [
      { title: 'Formal Address (Su, Hábleme)', explanation: 'Using the "Usted" pronouns and imperatives to show professional respect.',
        exampleFromStory: 'Hábleme de su experiencia previa...' }
    ],
    lines: [
      { text: "Hábleme de su experiencia previa liderando equipos multiculturales.", formula: "Hábleme (Verb) + de su experiencia previa liderando equipos multiculturales (Object)" },
      { text: "He gestionado proyectos internacionales con éxito durante tres años en Madrid.", formula: "He (Verb) + gestionado proyectos internacionales con éxito durante tres años en Madrid (Object)" },
      { text: "Buscamos a un candidato idóneo capaz de resolver conflictos laborales.", formula: "Buscamos (Verb) + a un candidato idóneo capaz de resolver conflictos laborales (Object)" }
    ],
    grammar_note: {
      term: "Formal Address (Su, Hábleme)",
      translation: "Formal Address (Su, Hábleme)",
      explanation: "Using the \"Usted\" pronouns and imperatives to show professional respect.",
      example: "Hábleme de su experiencia previa..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's36',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'El Debate del Cambio Climático',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'A formal debate about green energy subsidies and emissions.',
    storyLines: [
      'Es innegable que las emisiones de carbono están acelerando el calentamiento global.',
      'Debemos subsidiar las energías renovables para incentivar la transición ecológica.',
      'Los costos de no actuar ahora serán devastadores para la economía mundial.'
    ],
    storyTranslations: [
      'It is undeniable that carbon emissions are accelerating global warming.',
      'We must subsidize renewable energies to incentivize the ecological transition.',
      'The costs of not acting now will be devastating for the global economy.'
    ],
    vocabulary: [
      { word: 'emisiones', meaning: 'emissions', pronunciation: 'eh-mee-SYOH-nehs' },
      { word: 'subsidiar', meaning: 'to subsidize', pronunciation: 'soob-see-DYAHR' },
      { word: 'ecológica', meaning: 'ecological', pronunciation: 'eh-koh-LOH-hee-kah' }
    ],
    grammarNotes: [
      { title: 'Infinitive after Verbs of Obligation', explanation: '"Debemos" (we must) is followed directly by the infinitive verb form.', exampleFromStory: 'Debemos subsidiar las energías...' }
    ],
    lines: [
      { text: "Es innegable que las emisiones de carbono están acelerando el calentamiento global.", formula: "Es (Verb) + innegable que las emisiones de carbono están acelerando el calentamiento global (Object)" },
      { text: "Debemos subsidiar las energías renovables para incentivar la transición ecológica.", formula: "Debemos (Verb) + subsidiar las energías renovables para incentivar la transición ecológica (Object)" },
      { text: "Los costos de no actuar ahora serán devastadores para la economía mundial.", formula: "Los (Verb) + costos de no actuar  serán devastadores par (Object) + a la economía mundial (Place) + ahora (Time)" }
    ],
    grammar_note: {
      term: "Infinitive after Verbs of Obligation",
      translation: "Infinitive after Verbs of Obligation",
      explanation: "\"Debemos\" (we must) is followed directly by the infinitive verb form.",
      example: "Debemos subsidiar las energías..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's37',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'La Reunión de Negocios',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Analyzing quarterly sales figures and supply chain blockages.',
    storyLines: [
      'Analicemos las cifras de ventas correspondientes al último trimestre.',
      'Hemos observado un incremento del diez por ciento en las exportaciones.',
      'Sin embargo, el bloqueo logístico en el puerto retrasa nuestras entregas.'
    ],
    storyTranslations: [
      'Let\'s analyze the sales figures corresponding to the last quarter.',
      'We have observed a ten percent increase in exports.',
      'However, the logistical blockage at the port delays our deliveries.'
    ],
    vocabulary: [
      { word: 'cifras', meaning: 'figures/numbers', pronunciation: 'THEE-frahs' },
      { word: 'trimestre', meaning: 'quarter (three months)', pronunciation: 'tree-MEHS-treh' },
      { word: 'bloqueo', meaning: 'blockage', pronunciation: 'bloh-KEH-oh' }
    ],
    grammarNotes: [
      { title: 'Subjunctive of Suggestion (Analicemos)', explanation: 'First-person plural subjunctive used as an imperative ("Let\'s analyze").', exampleFromStory: 'Analicemos las cifras...' }
    ],
    lines: [
      { text: "Analicemos las cifras de ventas correspondientes al último trimestre.", formula: "Analicemos (Verb) + las cifras de ventas correspondientes (Object) + al último trimestre (Place)" },
      { text: "Hemos observado un incremento del diez por ciento en las exportaciones.", formula: "Hemos (Verb) + observado un incremento del diez por ciento en las exportaciones (Object)" },
      { text: "Sin embargo, el bloqueo logístico en el puerto retrasa nuestras entregas.", formula: "Sin (Verb) + embargo, el bloqueo logístico (Object) + en el puerto retrasa nuestras entregas (Place)" }
    ],
    grammar_note: {
      term: "Gramática",
      translation: "Grammar Note",
      explanation: "Practice structure and vocabulary in context.",
      example: "Práctica de español"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's38',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'El Proyecto Tecnológico',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Discussing database migration milestones and developer coordination.',
    storyLines: [
      'La migración de la base de datos se ha completado según los plazos previstos.',
      'El equipo de desarrollo está optimizando las peticiones de la API.',
      'Implementaremos el entorno de producción una vez superadas las pruebas de carga.'
    ],
    storyTranslations: [
      'The database migration has been completed according to the planned schedule.',
      'The development team is optimizing the API requests.',
      'We will deploy the production environment once the load tests are passed.'
    ],
    vocabulary: [
      { word: 'migración', meaning: 'migration', pronunciation: 'mee-grah-THYOHN' },
      { word: 'optimizando', meaning: 'optimizing', pronunciation: 'op-tee-mee-THAN-doh' },
      { word: 'pruebas', meaning: 'tests', pronunciation: 'PRWEH-bahs' }
    ],
    grammarNotes: [
      { title: 'Future Tense (Implementaremos)', explanation: 'Used to state planned actions that will happen in the future.', exampleFromStory: 'Implementaremos el entorno...' }
    ],
    lines: [
      { text: "La migración de la base de datos se ha completado según los plazos previstos.", formula: "La (Verb) + migración (Object) + de la base de datos se ha completado según los plazos previstos (Place)" },
      { text: "El equipo de desarrollo está optimizando las peticiones de la API.", formula: "El (Verb) + equipo de desarrollo está optimizando las peticiones (Object) + de la API (Place)" },
      { text: "Implementaremos el entorno de producción una vez superadas las pruebas de carga.", formula: "Implementaremos (Verb) + el entorno de producción una vez superadas las pruebas de carga (Object)" }
    ],
    grammar_note: {
      term: "Future Tense (Implementaremos)",
      translation: "Future Tense (Implementaremos)",
      explanation: "Used to state planned actions that will happen in the future.",
      example: "Implementaremos el entorno..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's39',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'El Consumo Sostenible',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Advocating for reducing plastic usage and local commerce supporting.',
    storyLines: [
      'Reducir el plástico de un solo uso es un deber de todos los ciudadanos.',
      'Fomentar el comercio local minimiza la huella de carbono del transporte.',
      'A menos que cambiemos los hábitos de consumo, la contaminación aumentará.'
    ],
    storyTranslations: [
      'Reducing single-use plastic is a duty of all citizens.',
      'Promoting local commerce minimizes the carbon footprint of transport.',
      'Unless we change consumption habits, pollution will increase.'
    ],
    vocabulary: [
      { word: 'ciudadanos', meaning: 'citizens', pronunciation: 'thyoo-dah-DAH-nohs' },
      { word: 'huella', meaning: 'footprint', pronunciation: 'WEH-lyah' },
      { word: 'contaminación', meaning: 'pollution', pronunciation: 'kon-tah-mee-nah-THYOHN' }
    ],
    grammarNotes: [
      { title: 'A menos que (Unless)', explanation: 'Conjunction of condition that always requires the subjunctive mood.', exampleFromStory: 'A menos que cambiemos los hábitos...' }
    ],
    lines: [
      { text: "Reducir el plástico de un solo uso es un deber de todos los ciudadanos.", formula: "Reducir (Verb) + el plástico de un solo uso es un deber de todos los ciudadanos (Object)" },
      { text: "Fomentar el comercio local minimiza la huella de carbono del transporte.", formula: "Fomentar (Verb) + el comercio local minimiz (Object) + a la huella de carbono del transporte (Place)" },
      { text: "A menos que cambiemos los hábitos de consumo, la contaminación aumentará.", formula: "A (Verb) + menos que cambiemos los hábitos de consumo, la contaminación aumentará (Object)" }
    ],
    grammar_note: {
      term: "A menos que (Unless)",
      translation: "A menos que (Unless)",
      explanation: "Conjunction of condition that always requires the subjunctive mood.",
      example: "A menos que cambiemos los hábitos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's40',
    lesson: 5,
    cefr_badge: 'Pre-A1',
    title: 'Un Problema de Logística',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Solving a distribution error regarding customs documentation.',
    storyLines: [
      'Surgió una discrepancia en la documentación aduanera del cargamento.',
      'Las autoridades retienen las mercancías en la aduana fronteriza.',
      'Es urgente enviar la factura original firmada para agilizar el trámite.'
    ],
    storyTranslations: [
      'A discrepancy arose in the customs documentation of the shipment.',
      'Authorities are holding the goods at the border customs.',
      'It is urgent to send the signed original invoice to speed up the process.'
    ],
    vocabulary: [
      { word: 'aduanera', meaning: 'customs (adjective)', pronunciation: 'ah-dwah-NEH-rah' },
      { word: 'mercancías', meaning: 'goods/merchandise', pronunciation: 'mehr-kahn-THEE-ahs' },
      { word: 'trámite', meaning: 'process/procedure', pronunciation: 'TRAH-mee-teh' }
    ],
    grammarNotes: [
      { title: 'Es urgente (It is urgent)', explanation: 'Impersonal expression followed by infinitive or subjunctive clauses.', exampleFromStory: 'Es urgente enviar la factura...' }
    ],
    lines: [
      { text: "Surgió una discrepancia en la documentación aduanera del cargamento.", formula: "Surgió (Verb) + una discrepancia (Object) + en la documentación aduanera del cargamento (Place)" },
      { text: "Las autoridades retienen las mercancías en la aduana fronteriza.", formula: "Las (Verb) + autoridades retienen las mercancías (Object) + en la aduana fronteriza (Place)" },
      { text: "Es urgente enviar la factura original firmada para agilizar el trámite.", formula: "Es (Verb) + urgente enviar la factura origin (Object) + al firmada para agilizar el trámite (Place)" }
    ],
    grammar_note: {
      term: "Es urgente (It is urgent)",
      translation: "Es urgente (It is urgent)",
      explanation: "Impersonal expression followed by infinitive or subjunctive clauses.",
      example: "Es urgente enviar la factura..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's41',
    lesson: 6,
    cefr_badge: 'A1',
    title: 'La Campaña de Marketing',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Reviewing a advertising campaign and its conversion metrics.',
    storyLines: [
      'La campaña publicitaria se centrará en el público joven del mercado europeo.',
      'El análisis de las métricas muestra un retorno de inversión muy favorable.',
      'Ajustaremos el presupuesto si los anuncios no alcanzan el objetivo mensual.'
    ],
    storyTranslations: [
      'The advertising campaign will focus on the young public of the European market.',
      'The analysis of metrics shows a very favorable return on investment.',
      'We will adjust the budget if the ads do not reach the monthly target.'
    ],
    vocabulary: [
      { word: 'campaña', meaning: 'campaign', pronunciation: 'kam-PAH-nyah' },
      { word: 'métricas', meaning: 'metrics', pronunciation: 'MEH-tree-kahs' },
      { word: 'presupuesto', meaning: 'budget', pronunciation: 'preh-soo-PWEHS-toh' }
    ],
    grammarNotes: [
      { title: 'Conditional Clause (Si + Present + Future)', explanation: 'Expresses real or likely conditions in the present/future.', exampleFromStory: 'Ajustaremos el presupuesto si los anuncios...' }
    ],
    lines: [
      { text: "La campaña publicitaria se centrará en el público joven del mercado europeo.", formula: "La (Verb) + campaña publicitaria se centrará (Object) + en el público joven del mercado europeo (Place)" },
      { text: "El análisis de las métricas muestra un retorno de inversión muy favorable.", formula: "El (Verb) + análisis de las métricas muestra un retorno de inversión muy favorable (Object)" },
      { text: "Ajustaremos el presupuesto si los anuncios no alcanzan el objetivo mensual.", formula: "Ajustaremos (Verb) + el presupuesto si los anuncios no alcanzan el objetivo mensual (Object)" }
    ],
    grammar_note: {
      term: "Conditional Clause (Si + Present + Future)",
      translation: "Conditional Clause (Si + Present + Future)",
      explanation: "Expresses real or likely conditions in the present/future.",
      example: "Ajustaremos el presupuesto si los anuncios..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's42',
    lesson: 6,
    cefr_badge: 'A1',
    title: 'El Auge del Teletrabajo',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    description: 'Analyzing the flexibility and work-life balance of remote work.',
    storyLines: [
      'El teletrabajo ofrece mayor flexibilidad horaria y reduce los desplazamientos.',
      'Muchos empleados afirman conciliar mejor la vida laboral y la personal.',
      'No obstante, exige autodisciplina para evitar el aislamiento profesional.'
    ],
    storyTranslations: [
      'Teleworking offers greater schedule flexibility and reduces commutes.',
      'Many employees claim to better balance work and personal life.',
      'Nonetheless, it demands self-discipline to avoid professional isolation.'
    ],
    vocabulary: [
      { word: 'desplazamientos', meaning: 'commutes/travels', pronunciation: 'dehs-plah-thah-MYEHN-tohs' },
      { word: 'conciliar', meaning: 'to balance/reconcile', pronunciation: 'kon-thee-LYAHR' },
      { word: 'aislamiento', meaning: 'isolation', pronunciation: 'ice-lah-MYEHN-toh' }
    ],
    grammarNotes: [
      { title: 'No obstante (Nonetheless)', explanation: 'Adversative connector used in formal Spanish to introduce contrast.', exampleFromStory: 'No obstante, exige autodisciplina...' }
    ],
    lines: [
      { text: "El teletrabajo ofrece mayor flexibilidad horaria y reduce los desplazamientos.", formula: "El (Verb) + teletrabajo ofrece mayor flexibilidad horaria y reduce los desplazamientos (Object)" },
      { text: "Muchos empleados afirman conciliar mejor la vida laboral y la personal.", formula: "Muchos (Verb) + empleados afirman conciliar mejor la vida labor (Object) + al y la personal (Place)" },
      { text: "No obstante, exige autodisciplina para evitar el aislamiento profesional.", formula: "No (Verb) + obstante, exige autodisciplina para evitar el aislamiento profesional (Object)" }
    ],
    grammar_note: {
      term: "No obstante (Nonetheless)",
      translation: "No obstante (Nonetheless)",
      explanation: "Adversative connector used in formal Spanish to introduce contrast.",
      example: "No obstante, exige autodisciplina..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B2 Tier 1: Imperfect Subjunctive + Conditional
  {
    id: 's171',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'La Oportunidad de Inversión',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['inversión', 'capital', 'riesgo'],
    recycled_vocab: ['empresa', 'mercado', 'futuro'],
    mascot_line: 'Weighing financial risks before taking major investments!',
    word_encounters_seed: ['inversión', 'capital', 'riesgo'],
    description: 'Evaluating a business investment opportunity under hypothetical conditions.',
    storyLines: [
      'Si tuviéramos más capital disponible, invertiríamos en nuevas tecnologías.',
      'Si el mercado fuera más estable, los inversores asumirían mayores riesgos.',
      'Aceptaría la propuesta si la empresa garantizase un retorno seguro.'
    ],
    storyTranslations: [
      'If we had more available capital, we would invest in new technologies.',
      'If the market were more stable, investors would assume greater risks.',
      'I would accept the proposal if the company guaranteed a secure return.'
    ],
    vocabulary: [
      { word: 'inversión', meaning: 'investment', pronunciation: 'een-behr-SYOHN' },
      { word: 'capital', meaning: 'capital/funds', pronunciation: 'kah-pee-TAL' },
      { word: 'riesgo', meaning: 'risk', pronunciation: 'RYEHS-goh' }
    ],
    grammarNotes: [
      { title: 'Hypothetical Conditionals (Si + Imp. Subjunctive + Conditional)', explanation: 'Combines imperfect subjunctive in the "if" clause with conditional in the result clause.', exampleFromStory: 'Si tuviéramos más capital, invertiríamos...' }
    ],
    lines: [
      { text: "Si tuviéramos más capital disponible, invertiríamos en nuevas tecnologías.", formula: "Si (Verb) + tuviéramos más capit (Object) + al disponible, invertiríamos en nuevas tecnologías (Place)" },
      { text: "Si el mercado fuera más estable, los inversores asumirían mayores riesgos.", formula: "Si (Verb) + el mercado fuera más estable, los inversores asumirían mayores riesgos (Object)" },
      { text: "Aceptaría la propuesta si la empresa garantizase un retorno seguro.", formula: "Aceptarí (Verb) + a la propuesta si la empresa garantizase un retorno seguro (Place)" }
    ],
    grammar_note: {
      term: "Hypothetical Conditionals (Si + Imp. Subjunctive + Conditional)",
      translation: "Hypothetical Conditionals (Si + Imp. Subjunctive + Conditional)",
      explanation: "Combines imperfect subjunctive in the \"if\" clause with conditional in the result clause.",
      example: "Si tuviéramos más capital, invertiríamos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's172',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'El Proyecto de Conservación',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['conservación', 'especies', 'hábitat'],
    recycled_vocab: ['medio ambiente', 'bosque', 'proteger'],
    mascot_line: 'Protecting natural habitats ensures species survival!',
    word_encounters_seed: ['conservación', 'especies', 'hábitat'],
    description: 'Discussing environmental conservation policies.',
    storyLines: [
      'Si los gobiernos protegieran más bosques, reduciríamos la extinción de especies.',
      'Si existieran leyes más estrictas, las industrias no contaminarían los ríos.',
      'Apoyaríamos la iniciativa si la comunidad local participara en ella.'
    ],
    storyTranslations: [
      'If governments protected more forests, we would reduce species extinction.',
      'If stricter laws existed, industries would not pollute rivers.',
      'We would support the initiative if the local community participated in it.'
    ],
    vocabulary: [
      { word: 'conservación', meaning: 'conservation', pronunciation: 'kohn-sehr-bah-THYOHN' },
      { word: 'especies', meaning: 'species', pronunciation: 'ehs-PEH-thyahs' },
      { word: 'hábitat', meaning: 'habitat', pronunciation: 'AH-bee-taht' }
    ],
    grammarNotes: [
      { title: '-ra vs -se Imperfect Subjunctive (Protegieran / Participara)', explanation: 'Both -ra (protegieran) and -se (protegiesen) are correct forms of imperfect subjunctive.', exampleFromStory: 'Si los gobiernos protegieran... si la comunidad participara...' }
    ],
    lines: [
      { text: "Si los gobiernos protegieran más bosques, reduciríamos la extinción de especies.", formula: "Si (Verb) + los gobiernos protegieran más bosques, reduciríamos la extinción de especies (Object)" },
      { text: "Si existieran leyes más estrictas, las industrias no contaminarían los ríos.", formula: "Si (Verb) + existieran leyes más estrictas, las industrias no contaminarían los ríos (Object)" },
      { text: "Apoyaríamos la iniciativa si la comunidad local participara en ella.", formula: "Apoyaríamos (Verb) + la iniciativa si la comunidad loc (Object) + al participara en ella (Place)" }
    ],
    grammar_note: {
      term: "-ra vs -se Imperfect Subjunctive (Protegieran / Participara)",
      translation: "-ra vs -se Imperfect Subjunctive (Protegieran / Participara)",
      explanation: "Both -ra (protegieran) and -se (protegiesen) are correct forms of imperfect subjunctive.",
      example: "Si los gobiernos protegieran... si la comunidad participara..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's173',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'La Elección de Carrera',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['vocación', 'carrera', 'estudiaría'],
    recycled_vocab: ['universidad', 'futuro', 'trabajo'],
    mascot_line: 'Following your true passion leads to a fulfilling career!',
    word_encounters_seed: ['vocación', 'carrera', 'estudiaría'],
    description: 'Reflecting hypothetically on alternative career choices.',
    storyLines: [
      'Si pudiera volver a empezar, estudiaría arquitectura en la universidad.',
      'Si tuviera más talento artístico, me dedicaría al diseño gráfico.',
      'Sería más feliz si mi trabajo coincidiera exactamente con mi vocación.'
    ],
    storyTranslations: [
      'If I could start over, I would study architecture at the university.',
      'If I had more artistic talent, I would dedicate myself to graphic design.',
      'I would be happier if my job matched my vocation exactly.'
    ],
    vocabulary: [
      { word: 'vocación', meaning: 'vocation/calling', pronunciation: 'boh-kah-THYOHN' },
      { word: 'carrera', meaning: 'career/degree', pronunciation: 'kah-RREH-rah' },
      { word: 'estudiaría', meaning: 'I would study', pronunciation: 'ehs-too-dyah-REE-ah' }
    ],
    grammarNotes: [
      { title: 'Pudiera (Imperfect Subjunctive of Poder)', explanation: '"Si pudiera..." is the standard trigger for hypothetical desire.', exampleFromStory: 'Si pudiera volver a empezar, estudiaría...' }
    ],
    lines: [
      { text: "Si pudiera volver a empezar, estudiaría arquitectura en la universidad.", formula: "Si (Verb) + pudiera volver a empezar, estudiaría arquitectura (Object) + en la universidad (Place)" },
      { text: "Si tuviera más talento artístico, me dedicaría al diseño gráfico.", formula: "Si (Verb) + tuviera más talento artístico, me dedicaría (Object) + al diseño gráfico (Place)" },
      { text: "Sería más feliz si mi trabajo coincidiera exactamente con mi vocación.", formula: "Sería (Verb) + más feliz si mi trabajo coincidiera exactamente con mi vocación (Object)" }
    ],
    grammar_note: {
      term: "Pudiera (Imperfect Subjunctive of Poder)",
      translation: "Pudiera (Imperfect Subjunctive of Poder)",
      explanation: "\"Si pudiera...\" is the standard trigger for hypothetical desire.",
      example: "Si pudiera volver a empezar, estudiaría..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's174',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'El Intercambio Cultural',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['beca', 'extranjero', 'adaptaría'],
    recycled_vocab: ['estudiar', 'cultura', 'país'],
    mascot_line: 'Studying abroad broadens horizons and cultural perspective!',
    word_encounters_seed: ['beca', 'extranjero', 'adaptaría'],
    description: 'Considering an overseas study exchange scholarship.',
    storyLines: [
      'Si me concedieran la beca, viajaría al extranjero por un año entero.',
      'Si viviera en otro país, aprendería la cultura local más rápido.',
      'Me adaptaría sin problemas si tuviera una familia de acogida.'
    ],
    storyTranslations: [
      'If they granted me the scholarship, I would travel abroad for a whole year.',
      'If I lived in another country, I would learn the local culture faster.',
      'I would adapt without problems if I had a host family.'
    ],
    vocabulary: [
      { word: 'beca', meaning: 'scholarship/grant', pronunciation: 'BEH-kah' },
      { word: 'extranjero', meaning: 'abroad/foreign', pronunciation: 'ehks-trahn-HEH-roh' },
      { word: 'adaptaría', meaning: 'I would adapt', pronunciation: 'ah-dahp-tah-REE-ah' }
    ],
    grammarNotes: [
      { title: 'Concedieran (Grant)', explanation: 'Imperfect subjunctive third-person plural of conceder.', exampleFromStory: 'Si me concedieran la beca...' }
    ],
    lines: [
      { text: "Si me concedieran la beca, viajaría al extranjero por un año entero.", formula: "Si (Verb) + me concedieran la beca, viajaría (Object) + al extranjero por un año entero (Place)" },
      { text: "Si viviera en otro país, aprendería la cultura local más rápido.", formula: "Si (Verb) + viviera en otro país, aprenderí (Object) + a la cultura local más rápido (Place)" },
      { text: "Me adaptaría sin problemas si tuviera una familia de acogida.", formula: "Me (Verb) + adaptaría sin problemas si tuviera una familia de acogida (Object)" }
    ],
    grammar_note: {
      term: "Concedieran (Grant)",
      translation: "Concedieran (Grant)",
      explanation: "Imperfect subjunctive third-person plural of conceder.",
      example: "Si me concedieran la beca..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's175',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'Negociaciones de Paz',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['acuerdo', 'firmaran', 'cesarían'],
    recycled_vocab: ['paz', 'conflicto', 'países'],
    mascot_line: 'Diplomacy and dialogue paving the path to peaceful resolutions!',
    word_encounters_seed: ['acuerdo', 'firmaran', 'cesarían'],
    description: 'Analyzing peace negotiations between conflicting parties.',
    storyLines: [
      'Si los representantes firmaran el tratado, cesarían las hostilidades.',
      'Si ambas partes cedieran en sus pretensiones, alcanzarían un acuerdo duradero.',
      'La población viviría en tranquilidad si se respetaran las fronteras.'
    ],
    storyTranslations: [
      'If representatives signed the treaty, hostilities would cease.',
      'If both parties yielded in their demands, they would reach a lasting agreement.',
      'The population would live in tranquility if borders were respected.'
    ],
    vocabulary: [
      { word: 'acuerdo', meaning: 'agreement/deal', pronunciation: 'ah-KWEHR-doh' },
      { word: 'firmaran', meaning: 'they signed (subjunctive)', pronunciation: 'FEER-mah-rahn' },
      { word: 'cesarían', meaning: 'they would cease', pronunciation: 'theh-sah-REE-ahn' }
    ],
    grammarNotes: [
      { title: 'Plural Conditional & Subjunctive (Firmaran / Cesarían)', explanation: 'Conjugating both verbs in third-person plural for collective subjects.', exampleFromStory: 'Si los representantes firmaran... cesarían las hostilidades.' }
    ],
    lines: [
      { text: "Si los representantes firmaran el tratado, cesarían las hostilidades.", formula: "Si (Verb) + los representantes firmaran el tratado, cesarían las hostilidades (Object)" },
      { text: "Si ambas partes cedieran en sus pretensiones, alcanzarían un acuerdo duradero.", formula: "Si (Verb) + ambas partes cedieran en sus pretensiones, alcanzarían un acuerdo duradero (Object)" },
      { text: "La población viviría en tranquilidad si se respetaran las fronteras.", formula: "La (Verb) + población viviría en tranquilidad si se respetaran las fronteras (Object)" }
    ],
    grammar_note: {
      term: "Plural Conditional & Subjunctive (Firmaran / Cesarían)",
      translation: "Plural Conditional & Subjunctive (Firmaran / Cesarían)",
      explanation: "Conjugating both verbs in third-person plural for collective subjects.",
      example: "Si los representantes firmaran... cesarían las hostilidades."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's176',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'Rediseño de la Ciudad',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['urbanismo', 'aprovecharía', 'espacios'],
    recycled_vocab: ['ciudad', 'parques', 'transporte'],
    mascot_line: 'Rethinking urban spaces for better living quality!',
    word_encounters_seed: ['urbanismo', 'aprovecharía', 'espacios'],
    description: 'Envisioning modern urban redesigns.',
    storyLines: [
      'Si se diseñara la ciudad desde cero, se priorizaría el transporte público.',
      'Se aprovecharían mejor los espacios verdes si no hubiera tantos vehículos.',
      'La contaminación disminuiría drásticamente si se usaran vehículos eléctricos.'
    ],
    storyTranslations: [
      'If the city were designed from scratch, public transport would be prioritized.',
      'Green spaces would be better utilized if there weren\'t so many vehicles.',
      'Pollution would decrease dramatically if electric vehicles were used.'
    ],
    vocabulary: [
      { word: 'urbanismo', meaning: 'urban planning', pronunciation: 'oor-bah-NEES-moh' },
      { word: 'aprovecharía', meaning: 'would make use of', pronunciation: 'ah-proh-beh-chah-REE-ah' },
      { word: 'espacios', meaning: 'spaces', pronunciation: 'ehs-PAH-thyohs' }
    ],
    grammarNotes: [
      { title: 'Passive Reflexive + Conditional (Se priorizaría)', explanation: 'Se + conditional expresses passive hypothetical actions.', exampleFromStory: 'Se priorizaría el transporte público...' }
    ],
    lines: [
      { text: "Si se diseñara la ciudad desde cero, se priorizaría el transporte público.", formula: "Si (Verb) + se diseñar (Object) + a la ciudad desde cero, se priorizaría el transporte público (Place)" },
      { text: "Se aprovecharían mejor los espacios verdes si no hubiera tantos vehículos.", formula: "Se (Verb) + aprovecharían mejor los espacios verdes si no hubiera tantos vehículos (Object)" },
      { text: "La contaminación disminuiría drásticamente si se usaran vehículos eléctricos.", formula: "La (Verb) + contaminación disminuiría drásticamente si se usaran vehículos eléctricos (Object)" }
    ],
    grammar_note: {
      term: "Passive Reflexive + Conditional (Se priorizaría)",
      translation: "Passive Reflexive + Conditional (Se priorizaría)",
      explanation: "Se + conditional expresses passive hypothetical actions.",
      example: "Se priorizaría el transporte público..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's177',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'El Sistema Educativo',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['metodología', 'fomentara', 'creatividad'],
    recycled_vocab: ['estudiantes', 'escuela', 'aprenderían'],
    mascot_line: 'Innovative teaching methods spark lifelong curiosity!',
    word_encounters_seed: ['metodología', 'fomentara', 'creatividad'],
    description: 'Reimagining educational methods for students.',
    storyLines: [
      'Si la escuela fomentara el pensamiento crítico, los alumnos aprenderían más.',
      'Si se aplicaran metodologías prácticas, las clases serían más motivadoras.',
      'Los estudiantes desarrollarían su creatividad si tuvieran más tiempo libre.'
    ],
    storyTranslations: [
      'If school encouraged critical thinking, students would learn more.',
      'If practical methodologies were applied, classes would be more motivating.',
      'Students would develop their creativity if they had more free time.'
    ],
    vocabulary: [
      { word: 'metodología', meaning: 'methodology', pronunciation: 'meh-toh-doh-loh-HEE-ah' },
      { word: 'fomentara', meaning: 'encouraged (subjunctive)', pronunciation: 'foh-mehn-TAH-rah' },
      { word: 'creatividad', meaning: 'creativity', pronunciation: 'kreh-ah-tee-bee-DAD' }
    ],
    grammarNotes: [
      { title: 'Fomentara (Encouraged)', explanation: 'Imperfect subjunctive of fomentar (to promote/encourage).', exampleFromStory: 'Si la escuela fomentara el pensamiento crítico...' }
    ],
    lines: [
      { text: "Si la escuela fomentara el pensamiento crítico, los alumnos aprenderían más.", formula: "Si (Verb) + la escuela fomentara el pensamiento crítico, los alumnos aprenderían más (Object)" },
      { text: "Si se aplicaran metodologías prácticas, las clases serían más motivadoras.", formula: "Si (Verb) + se aplicaran metodologías prácticas, las clases serían más motivadoras (Object)" },
      { text: "Los estudiantes desarrollarían su creatividad si tuvieran más tiempo libre.", formula: "Los (Verb) + estudiantes desarrollarían su creatividad si tuvieran más tiempo libre (Object)" }
    ],
    grammar_note: {
      term: "Fomentara (Encouraged)",
      translation: "Fomentara (Encouraged)",
      explanation: "Imperfect subjunctive of fomentar (to promote/encourage).",
      example: "Si la escuela fomentara el pensamiento crítico..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's178',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'La Salud Pública',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 1,
    new_grammar_point: 'imperfect subjunctive + conditional',
    new_vocab: ['prevención', 'invirtiera', 'enfermedades'],
    recycled_vocab: ['salud', 'hospitales', 'sistema'],
    mascot_line: 'Investing in preventive medicine saves lives!',
    word_encounters_seed: ['prevención', 'invirtiera', 'enfermedades'],
    description: 'Discussing improvements to public healthcare systems.',
    storyLines: [
      'Si el estado invirtiera más en prevención, se reducirían las enfermedades.',
      'Los hospitales funcionarían mejor si contaran con más personal médico.',
      'La atención sería más rápida si se digitalizaran los expedientes.'
    ],
    storyTranslations: [
      'If the state invested more in prevention, diseases would be reduced.',
      'Hospitals would function better if they counted on more medical staff.',
      'Care would be faster if records were digitized.'
    ],
    vocabulary: [
      { word: 'prevención', meaning: 'prevention', pronunciation: 'preh-behn-THYOHN' },
      { word: 'invirtiera', meaning: 'invested (subjunctive)', pronunciation: 'een-beer-TYEHR-ah' },
      { word: 'enfermedades', meaning: 'diseases/illnesses', pronunciation: 'ehn-fehr-meh-DAH-dehs' }
    ],
    grammarNotes: [
      { title: 'Invirtiera (Invertir Stem Change)', explanation: 'Invertir changes e→i in imperfect subjunctive (invirtiera).', exampleFromStory: 'Si el estado invirtiera más en prevención...' }
    ],
    lines: [
      { text: "Si el estado invirtiera más en prevención, se reducirían las enfermedades.", formula: "Si (Verb) + el estado invirtiera más en prevención, se reducirían las enfermedades (Object)" },
      { text: "Los hospitales funcionarían mejor si contaran con más personal médico.", formula: "Los (Verb) + hospitales funcionarían mejor si contaran con más person (Object) + al médico (Place)" },
      { text: "La atención sería más rápida si se digitalizaran los expedientes.", formula: "La (Verb) + atención sería más rápida si se digitalizaran los expedientes (Object)" }
    ],
    grammar_note: {
      term: "Invirtiera (Invertir Stem Change)",
      translation: "Invirtiera (Invertir Stem Change)",
      explanation: "Invertir changes e→i in imperfect subjunctive (invirtiera).",
      example: "Si el estado invirtiera más en prevención..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B2 Tier 2: Passive Voice & Impersonal Se
  {
    id: 's179',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'La Inauguración del Edificio',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['inaugurado', 'diseñado', 'arquitecto'],
    recycled_vocab: ['edificio', 'construido', 'ciudad'],
    mascot_line: 'Stunning architecture unveiled at the ribbon cutting!',
    word_encounters_seed: ['inaugurado', 'diseñado', 'arquitecto'],
    description: 'Describing the formal opening of an architectural landmark.',
    storyLines: [
      'El nuevo centro cultural fue inaugurado por el alcalde ayer por la mañana.',
      'El edificio fue diseñado por un célebre arquitecto internacional.',
      'Se consideran las instalaciones como un hito de la arquitectura moderna.'
    ],
    storyTranslations: [
      'The new cultural center was inaugurated by the mayor yesterday morning.',
      'The building was designed by a famous international architect.',
      'The facilities are considered a landmark of modern architecture.'
    ],
    vocabulary: [
      { word: 'inaugurado', meaning: 'inaugurated/opened', pronunciation: 'ee-now-goo-RAH-doh' },
      { word: 'diseñado', meaning: 'designed', pronunciation: 'dee-seh-NYAH-doh' },
      { word: 'arquitecto', meaning: 'architect', pronunciation: 'ahr-kee-TEHK-toh' }
    ],
    grammarNotes: [
      { title: 'Passive Voice with Ser (Fue inaugurado / Fue diseñado)', explanation: 'Formed with "ser" + past participle matching gender and number.', exampleFromStory: 'Fue inaugurado por el alcalde... Fue diseñado por...' }
    ],
    lines: [
      { text: "El nuevo centro cultural fue inaugurado por el alcalde ayer por la mañana.", formula: "El (Verb) + nuevo centro cultur (Object) + al fue inaugurado por el alcalde  por la mañana (Place) + ayer (Time)" },
      { text: "El edificio fue diseñado por un célebre arquitecto internacional.", formula: "El (Verb) + edificio fue diseñado por un célebre arquitecto internacional (Object)" },
      { text: "Se consideran las instalaciones como un hito de la arquitectura moderna.", formula: "Se (Verb) + consideran las instalaciones como un hito (Object) + de la arquitectura moderna (Place)" }
    ],
    grammar_note: {
      term: "Passive Voice with Ser (Fue inaugurado / Fue diseñado)",
      translation: "Passive Voice with Ser (Fue inaugurado / Fue diseñado)",
      explanation: "Formed with \"ser\" + past participle matching gender and number.",
      example: "Fue inaugurado por el alcalde... Fue diseñado por..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's180',
    lesson: 32,
    cefr_badge: 'C1',
    title: 'Regulaciones del Mercado',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['prohíbe', 'normativa', 'cumplimiento'],
    recycled_vocab: ['leyes', 'empresa', 'mercado'],
    mascot_line: 'Clear regulatory guidelines protect consumer safety!',
    word_encounters_seed: ['prohíbe', 'normativa', 'cumplimiento'],
    description: 'Explaining market regulations and legal prohibitions.',
    storyLines: [
      'En este sector se prohíbe la venta de productos sin certificación.',
      'Las normativas fueron aprobadas por la comisión de comercio europea.',
      'Se exige el cumplimiento estricto de los estándares de calidad.'
    ],
    storyTranslations: [
      'In this sector, the sale of non-certified products is prohibited.',
      'The regulations were approved by the European trade commission.',
      'Strict compliance with quality standards is required.'
    ],
    vocabulary: [
      { word: 'prohíbe', meaning: 'is prohibited', pronunciation: 'proh-EE-beh' },
      { word: 'normativa', meaning: 'regulations/rules', pronunciation: 'nohr-mah-TEE-bah' },
      { word: 'cumplimiento', meaning: 'compliance/fulfillment', pronunciation: 'koom-plee-MYEHN-toh' }
    ],
    grammarNotes: [
      { title: 'Impersonal Se (Se prohíbe / Se exige)', explanation: 'Se + 3rd person singular verb expresses impersonal rules ("It is prohibited...").', exampleFromStory: 'Se prohíbe la venta... Se exige el cumplimiento...' }
    ],
    lines: [
      { text: "En este sector se prohíbe la venta de productos sin certificación.", formula: "En (Verb) + este sector se prohíbe la venta de productos sin certificación (Object)" },
      { text: "Las normativas fueron aprobadas por la comisión de comercio europea.", formula: "Las (Verb) + normativas fueron aprobadas (Object) + por la comisión de comercio europea (Place)" },
      { text: "Se exige el cumplimiento estricto de los estándares de calidad.", formula: "Se (Verb) + exige el cumplimiento estricto de los estándares de calidad (Object)" }
    ],
    grammar_note: {
      term: "Impersonal Se (Se prohíbe / Se exige)",
      translation: "Impersonal Se (Se prohíbe / Se exige)",
      explanation: "Se + 3rd person singular verb expresses impersonal rules (\"It is prohibited...\").",
      example: "Se prohíbe la venta... Se exige el cumplimiento..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's181',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'El Descubrimiento Arqueológico',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['hallados', 'restos', 'excavación'],
    recycled_vocab: ['antiguo', 'historia', 'equipo'],
    mascot_line: 'Unearthing ancient ruins lost for thousands of years!',
    word_encounters_seed: ['hallados', 'restos', 'excavación'],
    description: 'Reporting a major archaeological discovery.',
    storyLines: [
      'Fueron hallados valiosos restos romanos durante la excavación del túnel.',
      'Las piezas arqueológicas fueron trasladadas al museo nacional.',
      'Se estima que el asentamiento data del siglo primero antes de Cristo.'
    ],
    storyTranslations: [
      'Valuable Roman remains were found during the tunnel excavation.',
      'The archaeological pieces were moved to the national museum.',
      'It is estimated that the settlement dates back to the first century BC.'
    ],
    vocabulary: [
      { word: 'hallados', meaning: 'found/discovered', pronunciation: 'ah-LYAH-dohs' },
      { word: 'restos', meaning: 'remains/ruins', pronunciation: 'RREHS-tohs' },
      { word: 'excavación', meaning: 'excavation', pronunciation: 'ehks-kah-bah-THYOHN' }
    ],
    grammarNotes: [
      { title: 'Plural Passive Voice (Fueron hallados / Fueron trasladadas)', explanation: 'Fueron + plural past participle matching gender (hallados / trasladadas).', exampleFromStory: 'Fueron hallados valiosos restos... Fueron trasladadas las piezas...' }
    ],
    lines: [
      { text: "Fueron hallados valiosos restos romanos durante la excavación del túnel.", formula: "Fueron (Verb) + hallados valiosos restos romanos durante la excavación del túnel (Object)" },
      { text: "Las piezas arqueológicas fueron trasladadas al museo nacional.", formula: "Las (Verb) + piezas arqueológicas fueron trasladadas (Object) + al museo nacional (Place)" },
      { text: "Se estima que el asentamiento data del siglo primero antes de Cristo.", formula: "Se (Verb) + estima que el asentamiento data del siglo primero antes de Cristo (Object)" }
    ],
    grammar_note: {
      term: "Plural Passive Voice (Fueron hallados / Fueron trasladadas)",
      translation: "Plural Passive Voice (Fueron hallados / Fueron trasladadas)",
      explanation: "Fueron + plural past participle matching gender (hallados / trasladadas).",
      example: "Fueron hallados valiosos restos... Fueron trasladadas las piezas..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's182',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'La Producción Industrial',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['fabrican', 'ensamblan', 'exportan'],
    recycled_vocab: ['fábrica', 'productos', 'mercado'],
    mascot_line: 'Advanced manufacturing robotics streamlining production!',
    word_encounters_seed: ['fabrican', 'ensamblan', 'exportan'],
    description: 'Describing automated assembly line procedures.',
    storyLines: [
      'En esta fábrica se fabrican componentes electrónicos de alta precisión.',
      'Los dispositivos son ensamblados por robots automatizados.',
      'Se exportan miles de unidades semanalmente a todo el mundo.'
    ],
    storyTranslations: [
      'In this factory, high-precision electronic components are manufactured.',
      'The devices are assembled by automated robots.',
      'Thousands of units are exported weekly worldwide.'
    ],
    vocabulary: [
      { word: 'fabrican', meaning: 'are manufactured', pronunciation: 'fah-BREE-kahn' },
      { word: 'ensamblan', meaning: 'are assembled', pronunciation: 'ehn-SAM-blahn' },
      { word: 'exportan', meaning: 'are exported', pronunciation: 'ehks-POHR-tahn' }
    ],
    grammarNotes: [
      { title: 'Passive Se vs Present Ser (Se fabrican vs Son ensamblados)', explanation: 'Se + 3rd person plural (se fabrican) is interchangeable with son + participle (son ensamblados).', exampleFromStory: 'Se fabrican componentes... Son ensamblados por robots...' }
    ],
    lines: [
      { text: "En esta fábrica se fabrican componentes electrónicos de alta precisión.", formula: "En (Verb) + esta fábrica se fabrican componentes electrónicos de alta precisión (Object)" },
      { text: "Los dispositivos son ensamblados por robots automatizados.", formula: "Los (Verb) + dispositivos son ensamblados por robots automatizados (Object)" },
      { text: "Se exportan miles de unidades semanalmente a todo el mundo.", formula: "Se (Verb) + exportan miles de unidades semanalmente a todo el mundo (Object)" }
    ],
    grammar_note: {
      term: "Passive Se vs Present Ser (Se fabrican vs Son ensamblados)",
      translation: "Passive Se vs Present Ser (Se fabrican vs Son ensamblados)",
      explanation: "Se + 3rd person plural (se fabrican) is interchangeable with son + participle (son ensamblados).",
      example: "Se fabrican componentes... Son ensamblados por robots..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's183',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'Tradiciones Populares',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['celebra', 'viste', 'sirve'],
    recycled_vocab: ['fiesta', 'pueblo', 'tradición'],
    mascot_line: 'Town celebrations where traditional dishes are served!',
    word_encounters_seed: ['celebra', 'viste', 'sirve'],
    description: 'Explaining local festival customs in impersonal Spanish.',
    storyLines: [
      'En este pueblo se celebra la fiesta patronal cada mes de agosto.',
      'Se viste la gente con trajes regionales de gran colorido.',
      'Se sirve vino de la región y platos típicos a todos los visitantes.'
    ],
    storyTranslations: [
      'In this town, the patron festival is celebrated every August.',
      'People dress in colorful regional costumes.',
      'Regional wine and typical dishes are served to all visitors.'
    ],
    vocabulary: [
      { word: 'celebra', meaning: 'is celebrated', pronunciation: 'theh-LEH-brah' },
      { word: 'viste', meaning: 'dresses/is dressed', pronunciation: 'BEES-teh' },
      { word: 'sirve', meaning: 'is served', pronunciation: 'SEER-beh' }
    ],
    grammarNotes: [
      { title: 'Impersonal Se for Cultural Customs', explanation: 'Se + singular verb describes traditional practices without attributing to a specific subject.', exampleFromStory: 'Se celebra la fiesta... Se viste la gente... Se sirve vino...' }
    ],
    lines: [
      { text: "En este pueblo se celebra la fiesta patronal cada mes de agosto.", formula: "En (Verb) + este pueblo se celebr (Object) + a la fiesta patronal cada mes de agosto (Place)" },
      { text: "Se viste la gente con trajes regionales de gran colorido.", formula: "Se (Verb) + viste la gente con trajes regionales de gran colorido (Object)" },
      { text: "Se sirve vino de la región y platos típicos a todos los visitantes.", formula: "Se (Verb) + sirve vino (Object) + de la región y platos típicos a todos los visitantes (Place)" }
    ],
    grammar_note: {
      term: "Impersonal Se for Cultural Customs",
      translation: "Impersonal Se for Cultural Customs",
      explanation: "Se + singular verb describes traditional practices without attributing to a specific subject.",
      example: "Se celebra la fiesta... Se viste la gente... Se sirve vino..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's184',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'El Lanzamiento del Satélite',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['lanzado', 'órbita', 'transmitidos'],
    recycled_vocab: ['espacio', 'datos', 'científicos'],
    mascot_line: 'Satellite launches expanding space exploration knowledge!',
    word_encounters_seed: ['lanzado', 'órbita', 'transmitidos'],
    description: 'Covering the launch of a scientific satellite.',
    storyLines: [
      'El satélite científico fue lanzado con éxito desde la base espacial.',
      'Fue puesto en órbita a una altitud de quinientos kilómetros.',
      'Los primeros datos atmosféricos ya han sido transmitidos a la Tierra.'
    ],
    storyTranslations: [
      'The scientific satellite was successfully launched from the space base.',
      'It was placed in orbit at an altitude of five hundred kilometers.',
      'The first atmospheric data have already been transmitted to Earth.'
    ],
    vocabulary: [
      { word: 'lanzado', meaning: 'launched', pronunciation: 'lahn-THAH-doh' },
      { word: 'órbita', meaning: 'orbit', pronunciation: 'OHR-bee-tah' },
      { word: 'transmitidos', meaning: 'transmitted', pronunciation: 'trahns-mee-TEE-dohs' }
    ],
    grammarNotes: [
      { title: 'Present Perfect Passive (Han sido transmitidos)', explanation: 'Haber + sido + past participle creates the present perfect passive voice.', exampleFromStory: 'Los datos han sido transmitidos...' }
    ],
    lines: [
      { text: "El satélite científico fue lanzado con éxito desde la base espacial.", formula: "El (Verb) + satélite científico fue lanzado con éxito des (Object) + de la base espacial (Place)" },
      { text: "Fue puesto en órbita a una altitud de quinientos kilómetros.", formula: "Fue (Verb) + puesto en órbita a una altitud de quinientos kilómetros (Object)" },
      { text: "Los primeros datos atmosféricos ya han sido transmitidos a la Tierra.", formula: "Los (Verb) + primeros datos atmosféricos ya han sido transmitidos (Object) + a la Tierra (Place)" }
    ],
    grammar_note: {
      term: "Present Perfect Passive (Han sido transmitidos)",
      translation: "Present Perfect Passive (Han sido transmitidos)",
      explanation: "Haber + sido + past participle creates the present perfect passive voice.",
      example: "Los datos han sido transmitidos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's185',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'Noticias del Periódico',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['anunciaron', 'medidas', 'aplicarán'],
    recycled_vocab: ['gobierno', 'ley', 'ciudadanos'],
    mascot_line: 'Government policy announcements reported in headlines!',
    word_encounters_seed: ['anunciaron', 'medidas', 'aplicarán'],
    description: 'Reading newspaper articles on economic policy changes.',
    storyLines: [
      'Ayer fueron anunciadas nuevas medidas para reducir la inflación.',
      'Se aplicarán impuestos reducidos a los productos de primera necesidad.',
      'Las reformas serán debatidas mañana en el congreso.'
    ],
    storyTranslations: [
      'Yesterday new measures to reduce inflation were announced.',
      'Reduced taxes will be applied to essential products.',
      'The reforms will be debated tomorrow in congress.'
    ],
    vocabulary: [
      { word: 'anunciaron', meaning: 'were announced', pronunciation: 'ah-noon-THYAH-ron' },
      { word: 'medidas', meaning: 'measures/policies', pronunciation: 'meh-DEE-dahs' },
      { word: 'aplicarán', meaning: 'will be applied', pronunciation: 'ah-plee-kah-RAHN' }
    ],
    grammarNotes: [
      { title: 'Future Passive (Serán debatidas / Se aplicarán)', explanation: 'Future tense of ser + participle or se + future verb for upcoming actions.', exampleFromStory: 'Se aplicarán impuestos... Las reformas serán debatidas...' }
    ],
    lines: [
      { text: "Ayer fueron anunciadas nuevas medidas para reducir la inflación.", formula: "fueron (Verb) + anunciadas nuevas medidas para reducir la inflación (Object) + ayer (Time)" },
      { text: "Se aplicarán impuestos reducidos a los productos de primera necesidad.", formula: "Se (Verb) + aplicarán impuestos reducidos a los productos de primera necesidad (Object)" },
      { text: "Las reformas serán debatidas mañana en el congreso.", formula: "Las (Verb) + reformas serán debatidas (Object) + en el congreso (Place) + mañana (Time)" }
    ],
    grammar_note: {
      term: "Future Passive (Serán debatidas / Se aplicarán)",
      translation: "Future Passive (Serán debatidas / Se aplicarán)",
      explanation: "Future tense of ser + participle or se + future verb for upcoming actions.",
      example: "Se aplicarán impuestos... Las reformas serán debatidas..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's186',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'Investigación Científica',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 2,
    new_grammar_point: 'passive voice & impersonal se',
    new_vocab: ['publicado', 'estudio', 'demuestra'],
    recycled_vocab: ['científicos', 'revista', 'resultados'],
    mascot_line: 'Peer-reviewed research publishing groundbreaking findings!',
    word_encounters_seed: ['publicado', 'estudio', 'demuestra'],
    description: 'Summarizing a scientific study published in a journal.',
    storyLines: [
      'El estudio fue publicado en una prestigiosa revista científica.',
      'Se analizaron muestras de más de mil pacientes durante dos años.',
      'Los resultados han sido confirmados por varios laboratorios independientes.'
    ],
    storyTranslations: [
      'The study was published in a prestigious scientific journal.',
      'Samples from over one thousand patients were analyzed over two years.',
      'The results have been confirmed by several independent laboratories.'
    ],
    vocabulary: [
      { word: 'publicado', meaning: 'published', pronunciation: 'poo-blee-KAH-doh' },
      { word: 'estudio', meaning: 'study/research', pronunciation: 'ehs-TOO-dyoh' },
      { word: 'demuestra', meaning: 'shows/demonstrates', pronunciation: 'deh-MWEHS-trah' }
    ],
    grammarNotes: [
      { title: 'Preterite Passive Se (Se analizaron muestras)', explanation: 'Se + preterite plural verb for completed actions on plural objects.', exampleFromStory: 'Se analizaron muestras de más de mil pacientes...' }
    ],
    lines: [
      { text: "El estudio fue publicado en una prestigiosa revista científica.", formula: "El (Verb) + estudio fue publicado en una prestigiosa revista científica (Object)" },
      { text: "Se analizaron muestras de más de mil pacientes durante dos años.", formula: "Se (Verb) + analizaron muestras de más de mil pacientes durante dos años (Object)" },
      { text: "Los resultados han sido confirmados por varios laboratorios independientes.", formula: "Los (Verb) + resultados han sido confirmados por varios laboratorios independientes (Object)" }
    ],
    grammar_note: {
      term: "Preterite Passive Se (Se analizaron muestras)",
      translation: "Preterite Passive Se (Se analizaron muestras)",
      explanation: "Se + preterite plural verb for completed actions on plural objects.",
      example: "Se analizaron muestras de más de mil pacientes..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B2 Tier 3: Complex Connectors
  {
    id: 's187',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'El Debate Económico',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['sin embargo', 'por lo tanto', 'obstáculos'],
    recycled_vocab: ['crecimiento', 'mercado', 'estrategia'],
    mascot_line: 'Navigating economic obstacles with solid strategy!',
    word_encounters_seed: ['sin embargo', 'por lo tanto', 'obstáculos'],
    description: 'Analyzing business growth despite market challenges.',
    storyLines: [
      'La empresa creció durante el primer semestre; sin embargo, las ventas cayeron en otoño.',
      'A pesar de los obstáculos financieros, mantuvimos el nivel de empleo.',
      'Por lo tanto, ajustaremos la estrategia de ventas para el próximo ejercicio.'
    ],
    storyTranslations: [
      'The company grew during the first semester; however, sales dropped in autumn.',
      'Despite financial obstacles, we maintained the level of employment.',
      'Therefore, we will adjust the sales strategy for the next fiscal year.'
    ],
    vocabulary: [
      { word: 'sin embargo', meaning: 'however/nevertheless', pronunciation: 'seen ehm-BAR-goh' },
      { word: 'por lo tanto', meaning: 'therefore/consequently', pronunciation: 'pohr loh TAHN-toh' },
      { word: 'obstáculos', meaning: 'obstacles', pronunciation: 'ohbs-TAH-koo-lohs' }
    ],
    grammarNotes: [
      { title: 'Adversative & Consecutive Connectors', explanation: '"Sin embargo" introduces contrast; "por lo tanto" denotes logical result.', exampleFromStory: '...sin embargo, las ventas cayeron... Por lo tanto, ajustaremos...' }
    ],
    lines: [
      { text: "La empresa creció durante el primer semestre; sin embargo, las ventas cayeron en otoño.", formula: "La (Verb) + empresa creció durante el primer semestre; sin embargo, las ventas cayeron en otoño (Object)" },
      { text: "A pesar de los obstáculos financieros, mantuvimos el nivel de empleo.", formula: "A (Verb) + pesar de los obstáculos financieros, mantuvimos el nivel de empleo (Object)" },
      { text: "Por lo tanto, ajustaremos la estrategia de ventas para el próximo ejercicio.", formula: "Por (Verb) + lo tanto, ajustaremos la estrategia de ventas para el próximo ejercicio (Object)" }
    ],
    grammar_note: {
      term: "Adversative & Consecutive Connectors",
      translation: "Adversative & Consecutive Connectors",
      explanation: "\"Sin embargo\" introduces contrast; \"por lo tanto\" denotes logical result.",
      example: "...sin embargo, las ventas cayeron... Por lo tanto, ajustaremos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's188',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'El Clima y la Agricultura',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['a pesar de', 'sequía', 'cosecha'],
    recycled_vocab: ['lluvia', 'campo', 'agricultores'],
    mascot_line: 'Farmers adapting resiliently against severe droughts!',
    word_encounters_seed: ['a pesar de', 'sequía', 'cosecha'],
    description: 'Discussing agricultural yields during severe droughts.',
    storyLines: [
      'A pesar de la intensa sequía, la cosecha de oliva fue abundante.',
      'No llovió lo suficiente en primavera; no obstante, los sistemas de riego funcionaron.',
      'En consecuencia, los agricultores pudieron salvar la producción del año.'
    ],
    storyTranslations: [
      'Despite the intense drought, the olive harvest was abundant.',
      'It did not rain enough in spring; nevertheless, irrigation systems worked.',
      'Consequently, farmers were able to save the year\'s production.'
    ],
    vocabulary: [
      { word: 'a pesar de', meaning: 'despite/in spite of', pronunciation: 'ah peh-SAR deh' },
      { word: 'sequía', meaning: 'drought', pronunciation: 'seh-KEE-ah' },
      { word: 'cosecha', meaning: 'harvest/crop', pronunciation: 'koh-SEH-chah' }
    ],
    grammarNotes: [
      { title: 'Concession Connector (A pesar de + Noun)', explanation: '"A pesar de" takes a noun phrase to show contrast between expectation and result.', exampleFromStory: 'A pesar de la intensa sequía, la cosecha fue...' }
    ],
    lines: [
      { text: "A pesar de la intensa sequía, la cosecha de oliva fue abundante.", formula: "A (Verb) + pesar (Object) + de la intensa sequía, la cosecha de oliva fue abundante (Place)" },
      { text: "No llovió lo suficiente en primavera; no obstante, los sistemas de riego funcionaron.", formula: "No (Verb) + llovió lo suficiente en primavera; no obstante, los sistemas de riego funcionaron (Object)" },
      { text: "En consecuencia, los agricultores pudieron salvar la producción del año.", formula: "En (Verb) + consecuencia, los agricultores pudieron salvar la producción del año (Object)" }
    ],
    grammar_note: {
      term: "Concession Connector (A pesar de + Noun)",
      translation: "Concession Connector (A pesar de + Noun)",
      explanation: "\"A pesar de\" takes a noun phrase to show contrast between expectation and result.",
      example: "A pesar de la intensa sequía, la cosecha fue..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's189',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'La Tecnología en la Educación',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['así como', 'además', 'herramientas'],
    recycled_vocab: ['estudiantes', 'clase', 'aprender'],
    mascot_line: 'Digital tools transforming classrooms and learning access!',
    word_encounters_seed: ['así como', 'además', 'herramientas'],
    description: 'Evaluating digital tools in educational systems.',
    storyLines: [
      'Las pantallas digitales facilitan el aprendizaje; además, motivan a los alumnos.',
      'Se incorporaron ordenadores portátiles, así como acceso a internet de alta velocidad.',
      'Dado que la tecnología avanza rápido, los docentes deben actualizarse continuamente.'
    ],
    storyTranslations: [
      'Digital screens facilitate learning; furthermore, they motivate students.',
      'Laptops were incorporated, as well as high-speed internet access.',
      'Given that technology advances fast, teachers must continually update their skills.'
    ],
    vocabulary: [
      { word: 'así como', meaning: 'as well as', pronunciation: 'ah-SEE koh-moh' },
      { word: 'además', meaning: 'furthermore/in addition', pronunciation: 'ah-deh-MAHS' },
      { word: 'herramientas', meaning: 'tools', pronunciation: 'eh-rrah-MYEHN-tahs' }
    ],
    grammarNotes: [
      { title: 'Additive Connectors (Además, Así como)', explanation: 'Used to add supplementary information or points to a formal argument.', exampleFromStory: '...además, motivan a los alumnos... así como acceso...' }
    ],
    lines: [
      { text: "Las pantallas digitales facilitan el aprendizaje; además, motivan a los alumnos.", formula: "Las (Verb) + pantallas digitales facilitan el aprendizaje; además, motivan a los alumnos (Object)" },
      { text: "Se incorporaron ordenadores portátiles, así como acceso a internet de alta velocidad.", formula: "Se (Verb) + incorporaron ordenadores portátiles, así como acceso a internet de alta velocidad (Object)" },
      { text: "Dado que la tecnología avanza rápido, los docentes deben actualizarse continuamente.", formula: "Dado (Verb) + que la tecnología avanza rápido, los docentes deben actualizarse continuamente (Object)" }
    ],
    grammar_note: {
      term: "Additive Connectors (Además, Así como)",
      translation: "Additive Connectors (Además, Así como)",
      explanation: "Used to add supplementary information or points to a formal argument.",
      example: "...además, motivan a los alumnos... así como acceso..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's190',
    lesson: 33,
    cefr_badge: 'C1',
    title: 'El Desarrollo Urbano',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['mientras que', 'en cambio', 'zonas'],
    recycled_vocab: ['ciudad', 'vivienda', 'barrio'],
    mascot_line: 'Balancing modern housing developments with historic preservation!',
    word_encounters_seed: ['mientras que', 'en cambio', 'zonas'],
    description: 'Comparing growth patterns between city districts.',
    storyLines: [
      'El norte de la ciudad atrae grandes inversiones, mientras que el sur sufre despoblación.',
      'El centro histórico conserva su arquitectura tradicional; en cambio, la periferia se moderniza.',
      'Por consiguiente, el ayuntamiento aplicará un plan de desarrollo equilibrado.'
    ],
    storyTranslations: [
      'The north of the city attracts major investment, while the south suffers depopulation.',
      'The historic center preserves its traditional architecture; in contrast, the outskirts modernize.',
      'Consequently, city hall will apply a balanced development plan.'
    ],
    vocabulary: [
      { word: 'mientras que', meaning: 'while/whereas', pronunciation: 'MYEHN-trahs keh' },
      { word: 'en cambio', meaning: 'on the other hand / in contrast', pronunciation: 'ehn KAHM-byoh' },
      { word: 'zonas', meaning: 'zones/areas', pronunciation: 'THOH-nahs' }
    ],
    grammarNotes: [
      { title: 'Contrast Connectors (Mientras que, En cambio)', explanation: 'Used to highlight opposing trends between two subjects.', exampleFromStory: '...mientras que el sur sufre... en cambio, la periferia...' }
    ],
    lines: [
      { text: "El norte de la ciudad atrae grandes inversiones, mientras que el sur sufre despoblación.", formula: "El (Verb) + norte (Object) + de la ciudad atrae grandes inversiones, mientras que el sur sufre despoblación (Place)" },
      { text: "El centro histórico conserva su arquitectura tradicional; en cambio, la periferia se moderniza.", formula: "El (Verb) + centro histórico conserva su arquitectura tradicional; en cambio, la periferia se moderniza (Object)" },
      { text: "Por consiguiente, el ayuntamiento aplicará un plan de desarrollo equilibrado.", formula: "Por (Verb) + consiguiente, el ayuntamiento aplicará un plan de desarrollo equilibrado (Object)" }
    ],
    grammar_note: {
      term: "Contrast Connectors (Mientras que, En cambio)",
      translation: "Contrast Connectors (Mientras que, En cambio)",
      explanation: "Used to highlight opposing trends between two subjects.",
      example: "...mientras que el sur sufre... en cambio, la periferia..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's191',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'La Salud Mental',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['debido a', 'por consiguiente', 'bienestar'],
    recycled_vocab: ['estrés', 'vida', 'trabajo'],
    mascot_line: 'Prioritizing mental well-being creates happier lives!',
    word_encounters_seed: ['debido a', 'por consiguiente', 'bienestar'],
    description: 'Discussing the impacts of work stress on mental health.',
    storyLines: [
      'Muchas personas sufren ansiedad debido al ritmo de vida actual.',
      'A pesar de los avances médicos, la salud mental sigue siendo un reto social.',
      'Por consiguiente, es vital promover hábitos de descanso y desconexión.'
    ],
    storyTranslations: [
      'Many people suffer anxiety due to the current pace of life.',
      'Despite medical advances, mental health remains a social challenge.',
      'Consequently, it is vital to promote rest and disconnection habits.'
    ],
    vocabulary: [
      { word: 'debido a', meaning: 'due to / owing to', pronunciation: 'deh-BEE-doh ah' },
      { word: 'por consiguiente', meaning: 'consequently', pronunciation: 'pohr kohn-see-GYEHN-teh' },
      { word: 'bienestar', meaning: 'well-being', pronunciation: 'byehn-ehs-TAR' }
    ],
    grammarNotes: [
      { title: 'Causal Connector (Debido a)', explanation: 'Introduces the cause or reason behind a state or condition.', exampleFromStory: '...sufren ansiedad debido al ritmo de vida...' }
    ],
    lines: [
      { text: "Muchas personas sufren ansiedad debido al ritmo de vida actual.", formula: "Muchas (Verb) + personas sufren ansiedad debido (Object) + al ritmo de vida actual (Place)" },
      { text: "A pesar de los avances médicos, la salud mental sigue siendo un reto social.", formula: "A (Verb) + pesar de los avances médicos, la salud ment (Object) + al sigue siendo un reto social (Place)" },
      { text: "Por consiguiente, es vital promover hábitos de descanso y desconexión.", formula: "Por (Verb) + consiguiente, es vit (Object) + al promover hábitos de descanso y desconexión (Place)" }
    ],
    grammar_note: {
      term: "Causal Connector (Debido a)",
      translation: "Causal Connector (Debido a)",
      explanation: "Introduces the cause or reason behind a state or condition.",
      example: "...sufren ansiedad debido al ritmo de vida..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's192',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'El Comercio Internacional',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['ya que', 'puesto que', 'aranceles'],
    recycled_vocab: ['exportación', 'mercado', 'países'],
    mascot_line: 'Trade agreements facilitating cross-border commerce!',
    word_encounters_seed: ['ya que', 'puesto que', 'aranceles'],
    description: 'Explaining international trade shifts and tariff rules.',
    storyLines: [
      'Las exportaciones aumentaron un quince por ciento, ya que bajaron los aranceles.',
      'Puesto que la demanda exterior es fuerte, aumentaremos la producción fabril.',
      'Sin embargo, debemos vigilara la fluctuación de las divisas internacionales.'
    ],
    storyTranslations: [
      'Exports increased by fifteen percent, since tariffs fell.',
      'Since external demand is strong, we will increase factory production.',
      'However, we must monitor international currency fluctuations.'
    ],
    vocabulary: [
      { word: 'ya que', meaning: 'since / as', pronunciation: 'yah keh' },
      { word: 'puesto que', meaning: 'given that / since', pronunciation: 'PWEHS-toh keh' },
      { word: 'aranceles', meaning: 'tariffs/customs duties', pronunciation: 'ah-rahn-THEH-lehs' }
    ],
    grammarNotes: [
      { title: 'Explanatory Causal Connectors (Ya que / Puesto que)', explanation: 'Used to state known reasons justifying a decision or outcome.', exampleFromStory: '...ya que bajaron los aranceles. Puesto que la demanda es fuerte...' }
    ],
    lines: [
      { text: "Las exportaciones aumentaron un quince por ciento, ya que bajaron los aranceles.", formula: "Las (Verb) + exportaciones aumentaron un quince por ciento, ya que bajaron los aranceles (Object)" },
      { text: "Puesto que la demanda exterior es fuerte, aumentaremos la producción fabril.", formula: "Puesto (Verb) + que la demanda exterior es fuerte, aumentaremos la producción fabril (Object)" },
      { text: "Sin embargo, debemos vigilara la fluctuación de las divisas internacionales.", formula: "Sin (Verb) + embargo, debemos vigilar (Object) + a la fluctuación de las divisas internacionales (Place)" }
    ],
    grammar_note: {
      term: "Explanatory Causal Connectors (Ya que / Puesto que)",
      translation: "Explanatory Causal Connectors (Ya que / Puesto que)",
      explanation: "Used to state known reasons justifying a decision or outcome.",
      example: "...ya que bajaron los aranceles. Puesto que la demanda es fuerte..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's193',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'La Conservación del Patrimonio',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['a fin de que', 'con el objeto de', 'patrimonio'],
    recycled_vocab: ['monumentos', 'restaurar', 'ciudad'],
    mascot_line: 'Preserving historical heritage for future generations!',
    word_encounters_seed: ['a fin de que', 'con el objeto de', 'patrimonio'],
    description: 'Restoring historic monuments for cultural heritage.',
    storyLines: [
      'El ayuntamiento restaurará el palacio antiguo con el objeto de atraer turismo.',
      'Se han instalado alarmas de seguridad a fin de que las obras sufran daños.',
      'Pese a los altos costes de mantenimiento, la inversión cultural merece la pena.'
    ],
    storyTranslations: [
      'City hall will restore the old palace in order to attract tourism.',
      'Security alarms have been installed so that the works do not suffer damage.',
      'Despite high maintenance costs, cultural investment is worth it.'
    ],
    vocabulary: [
      { word: 'a fin de que', meaning: 'so that / in order that', pronunciation: 'ah feen deh keh' },
      { word: 'con el objeto de', meaning: 'with the aim of / in order to', pronunciation: 'kohn ehly ohb-HEH-toh deh' },
      { word: 'patrimonio', meaning: 'heritage/patrimony', pronunciation: 'pah-tree-MOH-nyoh' }
    ],
    grammarNotes: [
      { title: 'Purpose Connectors + Subjunctive (A fin de que + Subjunctive)', explanation: '"A fin de que" expresses purpose and requires subjunctive.', exampleFromStory: '...a fin de que las obras sufran daños.' }
    ],
    lines: [
      { text: "El ayuntamiento restaurará el palacio antiguo con el objeto de atraer turismo.", formula: "El (Verb) + ayuntamiento restaurará el palacio antiguo con el objeto de atraer turismo (Object)" },
      { text: "Se han instalado alarmas de seguridad a fin de que las obras sufran daños.", formula: "Se (Verb) + han instalado alarmas de seguridad a fin de que las obras sufran daños (Object)" },
      { text: "Pese a los altos costes de mantenimiento, la inversión cultural merece la pena.", formula: "Pese (Verb) + a los altos costes de mantenimiento, la inversión cultur (Object) + al merece la pena (Place)" }
    ],
    grammar_note: {
      term: "Purpose Connectors + Subjunctive (A fin de que + Subjunctive)",
      translation: "Purpose Connectors + Subjunctive (A fin de que + Subjunctive)",
      explanation: "\"A fin de que\" expresses purpose and requires subjunctive.",
      example: "...a fin de que las obras sufran daños."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's194',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'Energías Renovables',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 3,
    new_grammar_point: 'complex connectors (sin embargo, por lo tanto, a pesar de)',
    new_vocab: ['en lugar de', 'en vez de', 'solar'],
    recycled_vocab: ['energía', 'eficiencia', 'futuro'],
    mascot_line: 'Solar and wind energy leading the clean energy transition!',
    word_encounters_seed: ['en lugar de', 'en vez de', 'solar'],
    description: 'Transitioning from fossil fuels to renewable solar energy.',
    storyLines: [
      'Debemos instalar paneles solares en vez de depender de combustibles fósiles.',
      'En lugar de construir nuevas centrales térmicas, invertiremos en parques eólicos.',
      'De este modo, reduciríamos la huella ecológica de nuestra comunidad.'
    ],
    storyTranslations: [
      'We must install solar panels instead of relying on fossil fuels.',
      'Instead of building new thermal plants, we will invest in wind farms.',
      'In this way, we would reduce the ecological footprint of our community.'
    ],
    vocabulary: [
      { word: 'en lugar de', meaning: 'instead of', pronunciation: 'ehn loo-GAR deh' },
      { word: 'en vez de', meaning: 'instead of / in place of', pronunciation: 'ehn behth deh' },
      { word: 'solar', meaning: 'solar', pronunciation: 'soh-LAR' }
    ],
    grammarNotes: [
      { title: 'Substitutive Connectors (En vez de / En lugar de)', explanation: 'Takes infinitive or noun phrase to show chosen alternative.', exampleFromStory: '...en vez de depender de combustibles... En lugar de construir...' }
    ],
    lines: [
      { text: "Debemos instalar paneles solares en vez de depender de combustibles fósiles.", formula: "Debemos (Verb) + instalar paneles solares en vez de depender de combustibles fósiles (Object)" },
      { text: "En lugar de construir nuevas centrales térmicas, invertiremos en parques eólicos.", formula: "En (Verb) + lugar de construir nuevas centrales térmicas, invertiremos en parques eólicos (Object)" },
      { text: "De este modo, reduciríamos la huella ecológica de nuestra comunidad.", formula: "De (Verb) + este modo, reduciríamos la huella ecológica de nuestra comunidad (Object)" }
    ],
    grammar_note: {
      term: "Substitutive Connectors (En vez de / En lugar de)",
      translation: "Substitutive Connectors (En vez de / En lugar de)",
      explanation: "Takes infinitive or noun phrase to show chosen alternative.",
      example: "...en vez de depender de combustibles... En lugar de construir..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // B2 Tier 4: Advanced Subjunctive & Past Feelings
  {
    id: 's195',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'El Reencuentro Inesperado',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['alegró', 'hubieras', 'venido'],
    recycled_vocab: ['amigo', 'fiesta', 'tiempo'],
    mascot_line: 'Warm reunions with old friends make moments unforgettable!',
    word_encounters_seed: ['alegró', 'hubieras', 'venido'],
    description: 'Expressing joy over a friend attending a gathering.',
    storyLines: [
      'Me alegró mucho que hubieras venido a la celebración.',
      'Temía que no pudieras asistir debido a tus compromisos laborales.',
      'Fue una sorpresa maravillosa que nos encontráramos de nuevo.'
    ],
    storyTranslations: [
      'I was very glad that you had come to the celebration.',
      'I feared that you couldn\'t attend due to your work commitments.',
      'It was a wonderful surprise that we met again.'
    ],
    vocabulary: [
      { word: 'alegró', meaning: 'gladdened/pleased (past)', pronunciation: 'ah-leh-GROH' },
      { word: 'hubieras', meaning: 'you had (subjunctive)', pronunciation: 'oo-BYEH-rahs' },
      { word: 'venido', meaning: 'come', pronunciation: 'beh-NEE-doh' }
    ],
    grammarNotes: [
      { title: 'Pluperfect Subjunctive for Past Feelings (Me alegró que hubieras...)', explanation: 'Past emotion verb + que + pluperfect subjunctive (hubieras + participle) for past occurrences.', exampleFromStory: 'Me alegró mucho que hubieras venido...' }
    ],
    lines: [
      { text: "Me alegró mucho que hubieras venido a la celebración.", formula: "Me (Verb) + alegró mucho que hubieras venido (Object) + a la celebración (Place)" },
      { text: "Temía que no pudieras asistir debido a tus compromisos laborales.", formula: "Temía (Verb) + que no pudieras asistir debido a tus compromisos laborales (Object)" },
      { text: "Fue una sorpresa maravillosa que nos encontráramos de nuevo.", formula: "Fue (Verb) + una sorpresa maravillosa que nos encontráramos de nuevo (Object)" }
    ],
    grammar_note: {
      term: "Pluperfect Subjunctive for Past Feelings (Me alegró que hubieras...)",
      translation: "Pluperfect Subjunctive for Past Feelings (Me alegró que hubieras...)",
      explanation: "Past emotion verb + que + pluperfect subjunctive (hubieras + participle) for past occurrences.",
      example: "Me alegró mucho que hubieras venido..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's196',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'La Decisión de la Junta',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['sorprendió', 'hayan', 'tomado'],
    recycled_vocab: ['decisión', 'empresa', 'reunión'],
    mascot_line: 'Corporate board decisions shaping strategic roadmap!',
    word_encounters_seed: ['sorprendió', 'hayan', 'tomado'],
    description: 'Reacting to a surprising board of directors decision.',
    storyLines: [
      'Nos sorprendió que la junta haya tomado esa decisión de forma tan rápida.',
      'Lamentamos que no se hayan considerado las opiniones de los empleados.',
      'Esperamos que la resolución no afecte negativamente al proyecto.'
    ],
    storyTranslations: [
      'We were surprised that the board has taken that decision so quickly.',
      'We regret that the employees\' opinions have not been considered.',
      'We hope the resolution does not negatively affect the project.'
    ],
    vocabulary: [
      { word: 'sorprendió', meaning: 'surprised', pronunciation: 'sohr-prehn-DYOH' },
      { word: 'hayan', meaning: 'they have (subjunctive)', pronunciation: 'AH-yahn' },
      { word: 'tomado', meaning: 'taken', pronunciation: 'toh-MAH-doh' }
    ],
    grammarNotes: [
      { title: 'Present Perfect Subjunctive (Haya tomado / Hayan considerado)', explanation: 'Present subjunctive of haber (haya/hayan) + past participle for recent past actions.', exampleFromStory: '...que la junta haya tomado... que no se hayan considerado...' }
    ],
    lines: [
      { text: "Nos sorprendió que la junta haya tomado esa decisión de forma tan rápida.", formula: "Nos (Verb) + sorprendió que la junta haya tomado esa decisión de forma tan rápida (Object)" },
      { text: "Lamentamos que no se hayan considerado las opiniones de los empleados.", formula: "Lamentamos (Verb) + que no se hayan considerado las opiniones de los empleados (Object)" },
      { text: "Esperamos que la resolución no afecte negativamente al proyecto.", formula: "Esperamos (Verb) + que la resolución no afecte negativamente (Object) + al proyecto (Place)" }
    ],
    grammar_note: {
      term: "Present Perfect Subjunctive (Haya tomado / Hayan considerado)",
      translation: "Present Perfect Subjunctive (Haya tomado / Hayan considerado)",
      explanation: "Present subjunctive of haber (haya/hayan) + past participle for recent past actions.",
      example: "...que la junta haya tomado... que no se hayan considerado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's197',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'Preocupaciones del Proyecto',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['preocupaba', 'tardaran', 'entrega'],
    recycled_vocab: ['proyecto', 'tiempo', 'equipo'],
    mascot_line: 'Overcoming project deadline delays through team coordination!',
    word_encounters_seed: ['preocupaba', 'tardaran', 'entrega'],
    description: 'Expressing concern over potential project delays.',
    storyLines: [
      'Nos preocupaba que los proveedores tardaran en entregar los materiales.',
      'Era necesario que el equipo revisara los informes antes del viernes.',
      'Nos alivió que el cliente aceptara la prórroga sin penalizaciones.'
    ],
    storyTranslations: [
      'We were worried that suppliers would take long to deliver materials.',
      'It was necessary that the team review the reports before Friday.',
      'We were relieved that the client accepted the extension without penalties.'
    ],
    vocabulary: [
      { word: 'preocupaba', meaning: 'worried/concerned (imperfect)', pronunciation: 'preh-oh-koo-PAH-bah' },
      { word: 'tardaran', meaning: 'they delayed (subjunctive)', pronunciation: 'tahr-DAH-rahn' },
      { word: 'entrega', meaning: 'delivery', pronunciation: 'ehn-TREH-gah' }
    ],
    grammarNotes: [
      { title: 'Imperfect Subjunctive after Past Emotion (Preocupaba que tardaran)', explanation: 'Past emotion trigger + que + imperfect subjunctive.', exampleFromStory: 'Nos preocupaba que los proveedores tardaran...' }
    ],
    lines: [
      { text: "Nos preocupaba que los proveedores tardaran en entregar los materiales.", formula: "Nos (Verb) + preocupaba que los proveedores tardaran en entregar los materiales (Object)" },
      { text: "Era necesario que el equipo revisara los informes antes del viernes.", formula: "Era (Verb) + necesario que el equipo revisara los informes antes del viernes (Object)" },
      { text: "Nos alivió que el cliente aceptara la prórroga sin penalizaciones.", formula: "Nos (Verb) + alivió que el cliente aceptar (Object) + a la prórroga sin penalizaciones (Place)" }
    ],
    grammar_note: {
      term: "Imperfect Subjunctive after Past Emotion (Preocupaba que tardaran)",
      translation: "Imperfect Subjunctive after Past Emotion (Preocupaba que tardaran)",
      explanation: "Past emotion trigger + que + imperfect subjunctive.",
      example: "Nos preocupaba que los proveedores tardaran..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's198',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'El Espectáculo Teatral',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['emocionó', 'aplaudiera', 'obra'],
    recycled_vocab: ['teatro', 'público', 'final'],
    mascot_line: 'Standing ovations at the theater bring actors to tears!',
    word_encounters_seed: ['emocionó', 'aplaudiera', 'obra'],
    description: 'Reflecting on an emotional theater performance.',
    storyLines: [
      'A los actores les emocionó que el público aplaudiera de pie al final.',
      'Fue increíble que la obra transmitiera emociones tan intensas.',
      'Dudo que hayamos visto un espectáculo tan conmovedor este año.'
    ],
    storyTranslations: [
      'The actors were moved that the audience gave a standing ovation at the end.',
      'It was incredible that the play conveyed such intense emotions.',
      'I doubt we have seen such a touching show this year.'
    ],
    vocabulary: [
      { word: 'emocionó', meaning: 'moved/thrilled', pronunciation: 'eh-moh-thyoh-NOH' },
      { word: 'aplaudiera', meaning: 'applauded (subjunctive)', pronunciation: 'ah-plow-DYEH-rah' },
      { word: 'obra', meaning: 'play/work', pronunciation: 'OH-brah' }
    ],
    grammarNotes: [
      { title: 'Subjunctive with Emotion Verbs (Emocionó que aplaudiera)', explanation: 'Verbs of feeling (emocionar, encantar) trigger subjunctive in past narrative.', exampleFromStory: 'Les emocionó que el público aplaudiera...' }
    ],
    lines: [
      { text: "A los actores les emocionó que el público aplaudiera de pie al final.", formula: "A (Verb) + los actores les emocionó que el público aplaudiera de pie (Object) + al final (Place)" },
      { text: "Fue increíble que la obra transmitiera emociones tan intensas.", formula: "Fue (Verb) + increíble que la obra transmitiera emociones tan intensas (Object)" },
      { text: "Dudo que hayamos visto un espectáculo tan conmovedor este año.", formula: "Dudo (Verb) + que hayamos visto un espectáculo tan conmovedor (Object) + este año (Time)" }
    ],
    grammar_note: {
      term: "Subjunctive with Emotion Verbs (Emocionó que aplaudiera)",
      translation: "Subjunctive with Emotion Verbs (Emocionó que aplaudiera)",
      explanation: "Verbs of feeling (emocionar, encantar) trigger subjunctive in past narrative.",
      example: "Les emocionó que el público aplaudiera..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's199',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'El Error Administrativo',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['molestó', 'cometieran', 'solución'],
    recycled_vocab: ['documentos', 'oficina', 'corregido'],
    mascot_line: 'Patience and quick thinking resolve administrative errors!',
    word_encounters_seed: ['molestó', 'cometieran', 'solución'],
    description: 'Dealing with annoyance over administrative paperwork mistakes.',
    storyLines: [
      'Al cliente le molestó que cometieran un error en la factura.',
      'No parecía justo que tuviéramos que pagar tasas adicionales por el retraso.',
      'Afortunadamente, agradeció que hubiéramos solucionado el problema tan rápido.'
    ],
    storyTranslations: [
      'The client was annoyed that they made a mistake on the invoice.',
      'It didn\'t seem fair that we had to pay additional fees for the delay.',
      'Fortunately, he appreciated that we had solved the problem so fast.'
    ],
    vocabulary: [
      { word: 'molestó', meaning: 'annoyed/bothered', pronunciation: 'moh-lehs-TOH' },
      { word: 'cometieran', meaning: 'they committed/made (subjunctive)', pronunciation: 'koh-meh-TYEHR-ahn' },
      { word: 'solución', meaning: 'solution', pronunciation: 'soh-loo-THYOHN' }
    ],
    grammarNotes: [
      { title: 'Molestó que + Subjunctive', explanation: 'Molestar in preterite + que + imperfect/pluperfect subjunctive for past complaints.', exampleFromStory: 'Al cliente le molestó que cometieran un error...' }
    ],
    lines: [
      { text: "Al cliente le molestó que cometieran un error en la factura.", formula: "Al (Verb) + cliente le molestó que cometieran un error (Object) + en la factura (Place)" },
      { text: "No parecía justo que tuviéramos que pagar tasas adicionales por el retraso.", formula: "No (Verb) + parecía justo que tuviéramos que pagar tasas adicionales por el retraso (Object)" },
      { text: "Afortunadamente, agradeció que hubiéramos solucionado el problema tan rápido.", formula: "Afortunadamente, (Verb) + agradeció que hubiéramos solucionado el problema tan rápido (Object)" }
    ],
    grammar_note: {
      term: "Molestó que + Subjunctive",
      translation: "Molestó que + Subjunctive",
      explanation: "Molestar in preterite + que + imperfect/pluperfect subjunctive for past complaints.",
      example: "Al cliente le molestó que cometieran un error..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's200',
    lesson: 34,
    cefr_badge: 'C1',
    title: 'La Graduación Universitaria',
    level: 'B2',
    levelLabel: 'B2 / Avanzado',
    tier: 4,
    new_grammar_point: 'advanced subjunctive & past feelings',
    new_vocab: ['orgullosos', 'hayas', 'alcanzado'],
    recycled_vocab: ['estudios', 'universidad', 'familia'],
    mascot_line: 'Graduation day celebrating years of dedication and growth!',
    word_encounters_seed: ['orgullosos', 'hayas', 'alcanzado'],
    description: 'Celebrating university graduation with family pride.',
    storyLines: [
      'Nuestros padres están muy orgullosos de que hayas alcanzado este logro.',
      'Nos alegraba que pudieras compartir este día tan especial con nosotros.',
      'Esperamos que este título te abra muchas puertas en el ámbito laboral.'
    ],
    storyTranslations: [
      'Our parents are very proud that you have reached this achievement.',
      'We were glad that you could share this special day with us.',
      'We hope this degree opens many doors for you in the professional field.'
    ],
    vocabulary: [
      { word: 'orgullosos', meaning: 'proud', pronunciation: 'ohr-goo-LYOH-sohs' },
      { word: 'hayas', meaning: 'you have (subjunctive)', pronunciation: 'AH-yahs' },
      { word: 'alcanzado', meaning: 'reached/attained', pronunciation: 'ahl-kahn-THAH-doh' },
    ],
    grammarNotes: [
      { title: 'Estar Orgulloso De Que + Subjunctive', explanation: 'Estar orgulloso de que triggers subjunctive for person\'s achievements.', exampleFromStory: 'Orgullosos de que hayas alcanzado este logro.' }
    ],
    lines: [
      { text: "Nuestros padres están muy orgullosos de que hayas alcanzado este logro.", formula: "Nuestros (Verb) + padres están muy orgullosos de que hayas alcanzado este logro (Object)" },
      { text: "Nos alegraba que pudieras compartir este día tan especial con nosotros.", formula: "Nos (Verb) + alegraba que pudieras compartir este día tan especi (Object) + al con nosotros (Place)" },
      { text: "Esperamos que este título te abra muchas puertas en el ámbito laboral.", formula: "Esperamos (Verb) + que este título te abra muchas puertas (Object) + en el ámbito laboral (Place)" }
    ],
    grammar_note: {
      term: "Gramática",
      translation: "Grammar Note",
      explanation: "Practice structure and vocabulary in context.",
      example: "Práctica de español"
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // ── C1 LEVEL ──
  {
    id: 's43',
    lesson: 6,
    cefr_badge: 'A1',
    title: 'El Secreto del Archivo',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'A researcher discovers a controversial document in historical archives.',
    storyLines: [
      'Tras escudriñar los legajos polvorientos, halló el testamento original.',
      'Aquel pergamino desmentía categóricamente las crónicas oficiales de la dinastía.',
      'La verdad, sepultada durante siglos, saldría por fin a la luz pública.'
    ],
    storyTranslations: [
      'After scrutinizing the dusty files, he found the original will.',
      'That parchment categorically refuted the official chronicles of the dynasty.',
      'The truth, buried for centuries, would finally emerge into the public light.'
    ],
    vocabulary: [
      { word: 'escudriñar', meaning: 'to scrutinize/examine closely', pronunciation: 'ehs-koo-dree-NYAHR' },
      { word: 'legajos', meaning: 'folders/bundles of papers', pronunciation: 'leh-GAH-hos' },
      { word: 'testamento', meaning: 'will/testament', pronunciation: 'tehs-tah-MEHN-toh' }
    ],
    grammarNotes: [
      { title: 'Preterite vs Conditional (halló, saldría)', explanation: 'Narrative structure linking past actions with future events from the past\'s perspective.', exampleFromStory: 'Halló el testamento... saldría por fin...' }
    ],
    lines: [
      { text: "Tras escudriñar los legajos polvorientos, halló el testamento original.", formula: "Tras (Verb) + escudriñar los legajos polvorientos, halló el testamento original (Object)" },
      { text: "Aquel pergamino desmentía categóricamente las crónicas oficiales de la dinastía.", formula: "Aquel (Verb) + pergamino desmentía categóricamente las crónicas oficiales (Object) + de la dinastía (Place)" },
      { text: "La verdad, sepultada durante siglos, saldría por fin a la luz pública.", formula: "La (Verb) + verdad, sepultada durante siglos, saldría por fin (Object) + a la luz pública (Place)" }
    ],
    grammar_note: {
      term: "Gramática",
      translation: "Grammar Note",
      explanation: "Practice structure and vocabulary in context.",
      example: "Práctica de español"
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's44',
    lesson: 7,
    cefr_badge: 'A1',
    title: 'La Negociación Comercial',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'Corporate lawyers debating fine clauses of a merger agreement.',
    storyLines: [
      'Exigimos cláusulas de blindaje frente a posibles fluctuaciones arancelarias.',
      'De no mediar un acuerdo de confidencialidad, rescindiremos la oferta comercial.',
      'Esperamos que su junta directiva actúe con la debida diligencia debida.'
    ],
    storyTranslations: [
      'We demand shielding clauses against potential tariff fluctuations.',
      'Failing a confidentiality agreement, we will rescind the commercial offer.',
      'We expect your board of directors to act with due diligence.'
    ],
    vocabulary: [
      { word: 'blindaje', meaning: 'shielding/protection', pronunciation: 'bleen-DAH-heh' },
      { word: 'arancelarias', meaning: 'tariff-related', pronunciation: 'ah-rahn-theh-LAH-ryahs' },
      { word: 'rescindiremos', meaning: 'we will rescind/terminate', pronunciation: 'rehs-theen-dee-REH-mohs' }
    ],
    grammarNotes: [
      { title: 'De no + Infinitive', explanation: 'Formal conditional construction equivalent to "Si no..." (If... does not occur).', exampleFromStory: 'De no mediar un acuerdo...' }
    ],
    lines: [
      { text: "Exigimos cláusulas de blindaje frente a posibles fluctuaciones arancelarias.", formula: "Exigimos (Verb) + cláusulas de blindaje frente a posibles fluctuaciones arancelarias (Object)" },
      { text: "De no mediar un acuerdo de confidencialidad, rescindiremos la oferta comercial.", formula: "De (Verb) + no mediar un acuerdo de confidencialidad, rescindiremos la oferta comercial (Object)" },
      { text: "Esperamos que su junta directiva actúe con la debida diligencia debida.", formula: "Esperamos (Verb) + que su junta directiva actúe con la debida diligencia debida (Object)" }
    ],
    grammar_note: {
      term: "De no + Infinitive",
      translation: "De no + Infinitive",
      explanation: "Formal conditional construction equivalent to \"Si no...\" (If... does not occur).",
      example: "De no mediar un acuerdo..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's45',
    lesson: 7,
    cefr_badge: 'A1',
    title: 'El Espejo del Tiempo',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'A poetic description of autumn leaves in an abandoned courtyard.',
    storyLines: [
      'Las hojas otoñales alfombraban el patio abandonado del palacio en ruinas.',
      'El viento susurraba una vieja melodía olvidada entre las columnas de mármol.',
      'Todo rastro de gloria efímera se había desvanecido en la penumbra.'
    ],
    storyTranslations: [
      'The autumn leaves carpeted the abandoned courtyard of the ruined palace.',
      'The wind whispered an old forgotten melody among the marble columns.',
      'Every trace of ephemeral glory had faded into the twilight.'
    ],
    vocabulary: [
      { word: 'alfombraban', meaning: 'carpeted/covered', pronunciation: 'ahl-fom-BRAH-bahn' },
      { word: 'efímera', meaning: 'ephemeral/short-lived', pronunciation: 'eh-FEE-meh-rah' },
      { word: 'desvanecido', meaning: 'faded/vanished', pronunciation: 'dehs-bah-neh-THEE-doh' }
    ],
    grammarNotes: [
      { title: 'Pluperfect Tense (había desvanecido)', explanation: 'Used to describe actions that occurred prior to another past action.', exampleFromStory: 'Todo rastro... se había desvanecido...' }
    ],
    lines: [
      { text: "Las hojas otoñales alfombraban el patio abandonado del palacio en ruinas.", formula: "Las (Verb) + hojas otoñales alfombraban el patio abandonado del palacio en ruinas (Object)" },
      { text: "El viento susurraba una vieja melodía olvidada entre las columnas de mármol.", formula: "El (Verb) + viento susurraba una vieja melodía olvidada entre las columnas de mármol (Object)" },
      { text: "Todo rastro de gloria efímera se había desvanecido en la penumbra.", formula: "Todo (Verb) + rastro de gloria efímera se había desvanecido (Object) + en la penumbra (Place)" }
    ],
    grammar_note: {
      term: "Pluperfect Tense (había desvanecido)",
      translation: "Pluperfect Tense (había desvanecido)",
      explanation: "Used to describe actions that occurred prior to another past action.",
      example: "Todo rastro... se había desvanecido..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's46',
    lesson: 7,
    cefr_badge: 'A1',
    title: 'El Discurso de Apertura',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'A presidential speech on historical transitions and democracy.',
    storyLines: [
      'Es un honor inaugurar este simposio sobre transiciones democráticas.',
      'La consolidación de nuestras instituciones requiere un amplio consenso civil.',
      'No claudicaremos ante los desafíos que amenazan nuestra cohesión social.'
    ],
    storyTranslations: [
      'It is an honor to inaugurate this symposium on democratic transitions.',
      'The consolidation of our institutions requires a broad civil consensus.',
      'We will not yield to the challenges that threaten our social cohesion.'
    ],
    vocabulary: [
      { word: 'simposio', meaning: 'symposium', pronunciation: 'seem-POH-syoh' },
      { word: 'consenso', meaning: 'consensus', pronunciation: 'kon-SEHN-soh' },
      { word: 'claudicaremos', meaning: 'we will yield/give up', pronunciation: 'klaw-dee-kah-REH-mohs' }
    ],
    grammarNotes: [
      { title: 'Consolidación (Consolidation)', explanation: 'Abstract noun ending in "-ción" signifying process completion.', exampleFromStory: 'La consolidación de nuestras instituciones...' }
    ],
    lines: [
      { text: "Es un honor inaugurar este simposio sobre transiciones democráticas.", formula: "Es (Verb) + un honor inaugurar este simposio sobre transiciones democráticas (Object)" },
      { text: "La consolidación de nuestras instituciones requiere un amplio consenso civil.", formula: "La (Verb) + consolidación de nuestras instituciones requiere un amplio consenso civil (Object)" },
      { text: "No claudicaremos ante los desafíos que amenazan nuestra cohesión social.", formula: "No (Verb) + claudicaremos ante los desafíos que amenazan nuestra cohesión social (Object)" }
    ],
    grammar_note: {
      term: "Consolidación (Consolidation)",
      translation: "Consolidación (Consolidation)",
      explanation: "Abstract noun ending in \"-ción\" signifying process completion.",
      example: "La consolidación de nuestras instituciones..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's47',
    lesson: 7,
    cefr_badge: 'A1',
    title: 'El Manuscrito de Toledo',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'Decrypting a medieval codex describing astronomic stellar mappings.',
    storyLines: [
      'El monje tradujo el manuscrito medieval con infinita minuciosidad.',
      'El códice detallaba alineaciones celestes insólitas y conjunciones estelares.',
      'Tales hallazgos desafiaban los dogmas astronómicos vigentes en su época.'
    ],
    storyTranslations: [
      'The monk translated the medieval manuscript with infinite meticulousness.',
      'The codex detailed unusual celestial alignments and stellar conjunctions.',
      'Such findings challenged the astronomical dogmas in force in his time.'
    ],
    vocabulary: [
      { word: 'minuciosidad', meaning: 'meticulousness/detail', pronunciation: 'mee-noo-thyoh-see-DAD' },
      { word: 'códice', meaning: 'codex/manuscript', pronunciation: 'KOH-dee-theh' },
      { word: 'hallazgos', meaning: 'discoveries', pronunciation: 'ah-LYATH-gohs' }
    ],
    grammarNotes: [
      { title: 'Adjectives from Nouns (vigentes)', explanation: 'Adjective meaning active or in force, derived from verb "viger".', exampleFromStory: 'Los dogmas astronómicos vigentes...' }
    ],
    lines: [
      { text: "El monje tradujo el manuscrito medieval con infinita minuciosidad.", formula: "El (Verb) + monje tradujo el manuscrito mediev (Object) + al con infinita minuciosidad (Place)" },
      { text: "El códice detallaba alineaciones celestes insólitas y conjunciones estelares.", formula: "El (Verb) + códice detallaba alineaciones celestes insólitas y conjunciones estelares (Object)" },
      { text: "Tales hallazgos desafiaban los dogmas astronómicos vigentes en su época.", formula: "Tales (Verb) + hallazgos desafiaban los dogmas astronómicos vigentes (Object) + en su época (Place)" }
    ],
    grammar_note: {
      term: "Adjectives from Nouns (vigentes)",
      translation: "Adjectives from Nouns (vigentes)",
      explanation: "Adjective meaning active or in force, derived from verb \"viger\".",
      example: "Los dogmas astronómicos vigentes..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's48',
    lesson: 8,
    cefr_badge: 'A1',
    title: 'La Reforma Constitucional',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'Legal debate on constitutional amendments and senate voting.',
    storyLines: [
      'La enmienda constitucional fue aprobada tras un enconado debate parlamentario.',
      'Se busca salvaguardar los derechos fundamentales de las minorías étnicas.',
      'El texto jurídico será sometido a un plebiscito ratificatorio vinculante.'
    ],
    storyTranslations: [
      'The constitutional amendment was approved after a bitter parliamentary debate.',
      'It seeks to safeguard the fundamental rights of ethnic minorities.',
      'The legal text will be submitted to a binding ratifying plebiscite.'
    ],
    vocabulary: [
      { word: 'enmienda', meaning: 'amendment', pronunciation: 'ehn-MYEHN-dah' },
      { word: 'enconado', meaning: 'heated/bitter', pronunciation: 'ehn-koh-NAH-doh' },
      { word: 'plebiscito', meaning: 'plebiscite/referendum', pronunciation: 'pleh-bee-THEE-toh' }
    ],
    grammarNotes: [
      { title: 'Passive Voice (fue aprobada)', explanation: 'Formed with "ser" + past participle, matching the subject in gender and number.', exampleFromStory: 'La enmienda constitucional fue aprobada...' }
    ],
    lines: [
      { text: "La enmienda constitucional fue aprobada tras un enconado debate parlamentario.", formula: "La (Verb) + enmienda constitucion (Object) + al fue aprobada tras un enconado debate parlamentario (Place)" },
      { text: "Se busca salvaguardar los derechos fundamentales de las minorías étnicas.", formula: "Se (Verb) + busca salvaguardar los derechos fundamentales de las minorías étnicas (Object)" },
      { text: "El texto jurídico será sometido a un plebiscito ratificatorio vinculante.", formula: "El (Verb) + texto jurídico será sometido a un plebiscito ratificatorio vinculante (Object)" }
    ],
    grammar_note: {
      term: "Passive Voice (fue aprobada)",
      translation: "Passive Voice (fue aprobada)",
      explanation: "Formed with \"ser\" + past participle, matching the subject in gender and number.",
      example: "La enmienda constitucional fue aprobada..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's49',
    lesson: 8,
    cefr_badge: 'A1',
    title: 'Ensayo sobre la Memoria',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'A philosophical text detailing memory as a subjective filter.',
    storyLines: [
      'La memoria no es un registro fidedigno, sino un tamiz subjetivo.',
      'Reescribimos nuestro pasado para dotar de coherencia a la identidad presente.',
      'El olvido es, por ende, una condición indispensable de la cordura.'
    ],
    storyTranslations: [
      'Memory is not a reliable record, but a subjective sieve.',
      'We rewrite our past to provide coherence to the present identity.',
      'Forgetfulness is, therefore, an indispensable condition of sanity.'
    ],
    vocabulary: [
      { word: 'fidedigno', meaning: 'reliable/trustworthy', pronunciation: 'fee-deh-DEEG-noh' },
      { word: 'tamiz', meaning: 'sieve/sifter', pronunciation: 'tah-MEETH' },
      { word: 'cordura', meaning: 'sanity', pronunciation: 'kor-DOO-rah' }
    ],
    grammarNotes: [
      { title: 'Por ende (Therefore)', explanation: 'Formal discourse connector denoting consequence.', exampleFromStory: 'El olvido es, por ende, una condición...' }
    ],
    lines: [
      { text: "La memoria no es un registro fidedigno, sino un tamiz subjetivo.", formula: "La (Verb) + memoria no es un registro fidedigno, sino un tamiz subjetivo (Object)" },
      { text: "Reescribimos nuestro pasado para dotar de coherencia a la identidad presente.", formula: "Reescribimos (Verb) + nuestro pasado para dotar de coherencia (Object) + a la identidad presente (Place)" },
      { text: "El olvido es, por ende, una condición indispensable de la cordura.", formula: "El (Verb) + olvido es, por ende, una condición indispensable (Object) + de la cordura (Place)" }
    ],
    grammar_note: {
      term: "Por ende (Therefore)",
      translation: "Por ende (Therefore)",
      explanation: "Formal discourse connector denoting consequence.",
      example: "El olvido es, por ende, una condición..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's50',
    lesson: 8,
    cefr_badge: 'A1',
    title: 'El Retorno del Explorador',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    description: 'Literary description of an old explorer returning home.',
    storyLines: [
      'Aquejado por los estragos de la malaria, regresó a su patria natal.',
      'Nadie le reconoció al desembarcar en el muelle bajo la llovizna.',
      'Sus hazañas memorables yacían sepultadas en periódicos viejos.'
    ],
    storyTranslations: [
      'Afflicted by the ravages of malaria, he returned to his native land.',
      'No one recognized him upon disembarking on the dock in the drizzle.',
      'His memorable deeds lay buried in old newspapers.'
    ],
    vocabulary: [
      { word: 'estragos', meaning: 'ravages/havoc', pronunciation: 'ehs-TRAH-gohs' },
      { word: 'muelle', meaning: 'dock/pier', pronunciation: 'MWEH-lyeh' },
      { word: 'hazañas', meaning: 'deeds/feats', pronunciation: 'ah-THAH-nyahs' }
    ],
    grammarNotes: [
      { title: 'Yacían (Lay)', explanation: 'Imperfect of the verb "yacer" (to lie down / be buried), typical of literary descriptions.', exampleFromStory: 'Sus hazañas memorables yacían sepultadas...' }
    ],
    lines: [
      { text: "Aquejado por los estragos de la malaria, regresó a su patria natal.", formula: "Aquejado (Verb) + por los estragos (Object) + de la malaria, regresó a su patria natal (Place)" },
      { text: "Nadie le reconoció al desembarcar en el muelle bajo la llovizna.", formula: "Nadie (Verb) + le reconoció al desembarcar (Object) + en el muelle bajo la llovizna (Place)" },
      { text: "Sus hazañas memorables yacían sepultadas en periódicos viejos.", formula: "Sus (Verb) + hazañas memorables yacían sepultadas en periódicos viejos (Object)" }
    ],
    grammar_note: {
      term: "Yacían (Lay)",
      translation: "Yacían (Lay)",
      explanation: "Imperfect of the verb \"yacer\" (to lie down / be buried), typical of literary descriptions.",
      example: "Sus hazañas memorables yacían sepultadas..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // C1 Tier 1: Pluperfect Subjunctive & Counterfactual Conditionals
  {
    id: 's201',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'La Oportunidad Perdida',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['habría', 'hubiera', 'asumido'],
    recycled_vocab: ['empresa', 'decisión', 'riesgo'],
    mascot_line: 'Hindsight reveals the paths not taken in life!',
    word_encounters_seed: ['habría', 'hubiera', 'asumido'],
    description: 'Reflecting counterfactually on a missed business opportunity.',
    storyLines: [
      'Si hubiera sabido la magnitud del mercado, habría invertido sin vacilar.',
      'Si el equipo hubiera previsto los cambios normativos, habría evitado las sanciones.',
      'Habríamos alcanzado el liderazgo del sector si hubiéramos lanzado el producto antes.'
    ],
    storyTranslations: [
      'If I had known the market magnitude, I would have invested without hesitation.',
      'If the team had foreseen the regulatory changes, it would have avoided penalties.',
      'We would have reached sector leadership if we had launched the product earlier.'
    ],
    vocabulary: [
      { word: 'habría', meaning: 'I/he/she would have', pronunciation: 'ah-BREE-ah' },
      { word: 'hubiera', meaning: 'I/he/she had (subjunctive)', pronunciation: 'oo-BYEH-rah' },
      { word: 'asumido', meaning: 'assumed/taken on', pronunciation: 'ah-soo-MEE-doh' }
    ],
    grammarNotes: [
      { title: 'Counterfactual Conditionals (Si hubiera + Participle, habría + Participle)', explanation: 'Si + pluperfect subjunctive paired with compound conditional expresses past unfulfilled hypotheses.', exampleFromStory: 'Si hubiera sabido... habría invertido sin vacilar.' }
    ],
    lines: [
      { text: "Si hubiera sabido la magnitud del mercado, habría invertido sin vacilar.", formula: "Si (Verb) + hubiera sabido la magnitud del mercado, habría invertido sin vacilar (Object)" },
      { text: "Si el equipo hubiera previsto los cambios normativos, habría evitado las sanciones.", formula: "Si (Verb) + el equipo hubiera previsto los cambios normativos, habría evitado las sanciones (Object)" },
      { text: "Habríamos alcanzado el liderazgo del sector si hubiéramos lanzado el producto antes.", formula: "Habríamos (Verb) + alcanzado el liderazgo del sector si hubiéramos lanzado el producto antes (Object)" }
    ],
    grammar_note: {
      term: "Counterfactual Conditionals (Si hubiera + Participle, habría + Participle)",
      translation: "Counterfactual Conditionals (Si hubiera + Participle, habría + Participle)",
      explanation: "Si + pluperfect subjunctive paired with compound conditional expresses past unfulfilled hypotheses.",
      example: "Si hubiera sabido... habría invertido sin vacilar."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's202',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'El Análisis Histórico',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['desenlace', 'acontecimientos', 'habrían'],
    recycled_vocab: ['historia', 'conflicto', 'tratado'],
    mascot_line: 'Counterfactual history analyzing alternative historical outcomes!',
    word_encounters_seed: ['desenlace', 'acontecimientos', 'habrían'],
    description: 'Analyzing alternative historical outcomes had events differed.',
    storyLines: [
      'Si los diplomáticos hubiesen ratificado el tratado, el desenlace habría sido pacífico.',
      'Los acontecimientos habrían tomado otro rumbo si se hubiera negociado con firmeza.',
      'La crisis económica se habría mitigado si los bancos hubieran intervenido a tiempo.'
    ],
    storyTranslations: [
      'If diplomats had ratified the treaty, the outcome would have been peaceful.',
      'Events would have taken another course had there been firm negotiation.',
      'The economic crisis would have been mitigated if banks had intervened in time.'
    ],
    vocabulary: [
      { word: 'desenlace', meaning: 'outcome/denouement', pronunciation: 'dehs-ehn-LAH-theh' },
      { word: 'acontecimientos', meaning: 'events/occurrences', pronunciation: 'ah-kohn-teh-thee-MYEHN-tohs' },
      { word: 'habrían', meaning: 'they would have', pronunciation: 'ah-BREE-ahn' }
    ],
    grammarNotes: [
      { title: 'Hubiesen vs Hubieran in Counterfactuals', explanation: 'Pluperfect subjunctive using -se (hubiesen) is stylistic equivalent to -ra (hubieran).', exampleFromStory: 'Si los diplomáticos hubiesen ratificado... habría sido pacífico.' }
    ],
    lines: [
      { text: "Si los diplomáticos hubiesen ratificado el tratado, el desenlace habría sido pacífico.", formula: "Si (Verb) + los diplomáticos hubiesen ratificado el tratado, el desenlace habría sido pacífico (Object)" },
      { text: "Los acontecimientos habrían tomado otro rumbo si se hubiera negociado con firmeza.", formula: "Los (Verb) + acontecimientos habrían tomado otro rumbo si se hubiera negociado con firmeza (Object)" },
      { text: "La crisis económica se habría mitigado si los bancos hubieran intervenido a tiempo.", formula: "La (Verb) + crisis económica se habría mitigado si los bancos hubieran intervenido a tiempo (Object)" }
    ],
    grammar_note: {
      term: "Hubiesen vs Hubieran in Counterfactuals",
      translation: "Hubiesen vs Hubieran in Counterfactuals",
      explanation: "Pluperfect subjunctive using -se (hubiesen) is stylistic equivalent to -ra (hubieran).",
      example: "Si los diplomáticos hubiesen ratificado... habría sido pacífico."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's203',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'El Descubrimiento Científico Tardío',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['hallazgo', 'salvado', 'hipótesis'],
    recycled_vocab: ['investigación', 'laboratorio', 'medicina'],
    mascot_line: 'Scientific breakthroughs that could have changed medical history!',
    word_encounters_seed: ['hallazgo', 'salvado', 'hipótesis'],
    description: 'Reflecting on delayed scientific discoveries and lives saved.',
    storyLines: [
      'Si los investigadores hubieran verificado la hipótesis antes, habrían salvado miles de vidas.',
      'El hallazgo habría sido publicado un decenio atrás si hubieran contado con financiación.',
      'La vacuna se habría distribuido globalmente si no se hubieran presentado trabas logísticas.'
    ],
    storyTranslations: [
      'If researchers had verified the hypothesis earlier, they would have saved thousands of lives.',
      'The discovery would have been published a decade ago had they had funding.',
      'The vaccine would have been distributed globally had logistic obstacles not arisen.'
    ],
    vocabulary: [
      { word: 'hallazgo', meaning: 'discovery/finding', pronunciation: 'ah-LYATH-goh' },
      { word: 'salvado', meaning: 'saved', pronunciation: 'sahl-BAH-doh' },
      { word: 'hipótesis', meaning: 'hypothesis', pronunciation: 'ee-POH-teh-sees' }
    ],
    grammarNotes: [
      { title: 'Compound Conditional (Habría sido publicado)', explanation: 'Habría + sido + past participle forms the passive compound conditional.', exampleFromStory: 'El hallazgo habría sido publicado...' }
    ],
    lines: [
      { text: "Si los investigadores hubieran verificado la hipótesis antes, habrían salvado miles de vidas.", formula: "Si (Verb) + los investigadores hubieran verificado la hipótesis antes, habrían salvado miles de vidas (Object)" },
      { text: "El hallazgo habría sido publicado un decenio atrás si hubieran contado con financiación.", formula: "El (Verb) + hallazgo habría sido publicado un decenio atrás si hubieran contado con financiación (Object)" },
      { text: "La vacuna se habría distribuido globalmente si no se hubieran presentado trabas logísticas.", formula: "La (Verb) + vacuna se habría distribuido globalmente si no se hubieran presentado trabas logísticas (Object)" }
    ],
    grammar_note: {
      term: "Compound Conditional (Habría sido publicado)",
      translation: "Compound Conditional (Habría sido publicado)",
      explanation: "Habría + sido + past participle forms the passive compound conditional.",
      example: "El hallazgo habría sido publicado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's204',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'La Catástrofe Evitada',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['advertido', 'alerta', 'colapso'],
    recycled_vocab: ['seguridad', 'sistema', 'evitado'],
    mascot_line: 'Early warning sensors preventing major industrial disasters!',
    word_encounters_seed: ['advertido', 'alerta', 'colapso'],
    description: 'Analyzing how safety protocol warnings averted a structural disaster.',
    storyLines: [
      'Si los sensores no hubiesen advertido el fallo, la estructura habría colapsado.',
      'El equipo de ingenieros habría evacuado la zona si la alerta hubiese sonado minutos antes.',
      'Se habría producido una tragedia si las autoridades no hubieran reaccionado con presteza.'
    ],
    storyTranslations: [
      'If the sensors had not warned of the fault, the structure would have collapsed.',
      'The engineering team would have evacuated the zone had the alarm sounded minutes earlier.',
      'A tragedy would have occurred if authorities had not reacted with promptness.'
    ],
    vocabulary: [
      { word: 'advertido', meaning: 'warned/noticed', pronunciation: 'ahd-behr-TEE-doh' },
      { word: 'alerta', meaning: 'alert/warning', pronunciation: 'ah-LEHR-tah' },
      { word: 'colapso', meaning: 'collapse', pronunciation: 'koh-LAHP-soh' }
    ],
    grammarNotes: [
      { title: 'Se Habría Producido (Passive Reflexive Compound Conditional)', explanation: 'Se + habría + participle for passive hypothetical events.', exampleFromStory: 'Se habría producido una tragedia si...' }
    ],
    lines: [
      { text: "Si los sensores no hubiesen advertido el fallo, la estructura habría colapsado.", formula: "Si (Verb) + los sensores no hubiesen advertido el fallo, la estructura habría colapsado (Object)" },
      { text: "El equipo de ingenieros habría evacuado la zona si la alerta hubiese sonado minutos antes.", formula: "El (Verb) + equipo de ingenieros habría evacuado la zona si la alerta hubiese sonado minutos antes (Object)" },
      { text: "Se habría producido una tragedia si las autoridades no hubieran reaccionado con presteza.", formula: "Se (Verb) + habría producido una tragedia si las autoridades no hubieran reaccionado con presteza (Object)" }
    ],
    grammar_note: {
      term: "Se Habría Producido (Passive Reflexive Compound Conditional)",
      translation: "Se Habría Producido (Passive Reflexive Compound Conditional)",
      explanation: "Se + habría + participle for passive hypothetical events.",
      example: "Se habría producido una tragedia si..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's205',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'Negociaciones de Fusión',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['cláusulas', 'hubiesen', 'firmado'],
    recycled_vocab: ['acuerdo', 'empresa', 'abogados'],
    mascot_line: 'Detailed merger contract clauses ensuring corporate protection!',
    word_encounters_seed: ['cláusulas', 'hubiesen', 'firmado'],
    description: 'Reviewing failed corporate merger talks.',
    storyLines: [
      'Si las partes hubieran aceptado las cláusulas de confidencialidad, la fusión se habría concretado.',
      'Los abogados habrían redactado un contrato definitivo si se hubiesen aclarado las valoraciones.',
      'La operación habría sido altamente lucrativa si no hubieran intervenido los reguladores.'
    ],
    storyTranslations: [
      'If the parties had accepted the confidentiality clauses, the merger would have materialized.',
      'Lawyers would have drafted a final contract had valuations been clarified.',
      'The transaction would have been highly lucrative had regulators not intervened.'
    ],
    vocabulary: [
      { word: 'cláusulas', meaning: 'clauses', pronunciation: 'KLAW-soo-lahs' },
      { word: 'hubiesen', meaning: 'they had (subjunctive)', pronunciation: 'oo-BYEH-sehn' },
      { word: 'firmado', meaning: 'signed', pronunciation: 'feer-MAH-doh' }
    ],
    grammarNotes: [
      { title: 'Se Habría Concretado', explanation: 'Concretar in reflexive compound conditional for materialized agreements.', exampleFromStory: '...la fusión se habría concretado.' }
    ],
    lines: [
      { text: "Si las partes hubieran aceptado las cláusulas de confidencialidad, la fusión se habría concretado.", formula: "Si (Verb) + las partes hubieran aceptado las cláusulas de confidencialidad, la fusión se habría concretado (Object)" },
      { text: "Los abogados habrían redactado un contrato definitivo si se hubiesen aclarado las valoraciones.", formula: "Los (Verb) + abogados habrían redactado un contrato definitivo si se hubiesen aclarado las valoraciones (Object)" },
      { text: "La operación habría sido altamente lucrativa si no hubieran intervenido los reguladores.", formula: "La (Verb) + operación habría sido altamente lucrativa si no hubieran intervenido los reguladores (Object)" }
    ],
    grammar_note: {
      term: "Se Habría Concretado",
      translation: "Se Habría Concretado",
      explanation: "Concretar in reflexive compound conditional for materialized agreements.",
      example: "...la fusión se habría concretado."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's206',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'La Expedición Ártica',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['víveres', 'perecido', 'temperaturas'],
    recycled_vocab: ['expedición', 'frío', 'rescatado'],
    mascot_line: 'Extreme arctic survival where every preparation counts!',
    word_encounters_seed: ['víveres', 'perecido', 'temperaturas'],
    description: 'Surviving an arctic expedition thanks to emergency supplies.',
    storyLines: [
      'Si la expedición no hubiera llevado víveres de reserva, habría perecido en la ventisca.',
      'Los exploradores habrían alcanzado el polo si las temperaturas no hubiesen descendido drásticamente.',
      'El equipo de rescate los habría localizado antes si el transmisor hubiera funcionado.'
    ],
    storyTranslations: [
      'If the expedition had not carried backup supplies, it would have perished in the blizzard.',
      'Explorers would have reached the pole had temperatures not dropped drastically.',
      'The rescue team would have located them sooner if the transmitter had worked.'
    ],
    vocabulary: [
      { word: 'víveres', meaning: 'provisions/supplies', pronunciation: 'BEE-beht-ehs' },
      { word: 'perecido', meaning: 'perished', pronunciation: 'peh-reh-THEE-doh' },
      { word: 'temperaturas', meaning: 'temperatures', pronunciation: 'tehm-peh-rah-TOO-rahs' }
    ],
    grammarNotes: [
      { title: 'Perecido (Past Participle of Perecer)', explanation: 'Perecer (to perish) forms past participle perecido.', exampleFromStory: '...habría perecido en la ventisca.' }
    ],
    lines: [
      { text: "Si la expedición no hubiera llevado víveres de reserva, habría perecido en la ventisca.", formula: "Si (Verb) + la expedición no hubiera llevado víveres de reserva, habría perecido (Object) + en la ventisca (Place)" },
      { text: "Los exploradores habrían alcanzado el polo si las temperaturas no hubiesen descendido drásticamente.", formula: "Los (Verb) + exploradores habrían alcanzado el polo si las temperaturas no hubiesen descendido drásticamente (Object)" },
      { text: "El equipo de rescate los habría localizado antes si el transmisor hubiera funcionado.", formula: "El (Verb) + equipo de rescate los habría localizado antes si el transmisor hubiera funcionado (Object)" }
    ],
    grammar_note: {
      term: "Perecido (Past Participle of Perecer)",
      translation: "Perecido (Past Participle of Perecer)",
      explanation: "Perecer (to perish) forms past participle perecido.",
      example: "...habría perecido en la ventisca."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's207',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'La Obra Maestra Inconclusa',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['inconclusa', 'fallecido', 'partitura'],
    recycled_vocab: ['música', 'compositor', 'obra'],
    mascot_line: 'Unfinished musical masterpieces completed by pupils!',
    word_encounters_seed: ['inconclusa', 'fallecido', 'partitura'],
    description: 'Speculating on a famous composer\'s unfinished symphony.',
    storyLines: [
      'Si el compositor no hubiera fallecido tan joven, habría completado su novena sinfonía.',
      'La partitura habría cambiado el curso de la música si se hubiera publicado en vida.',
      'Sus discípulos no habrían tenido que reconstruir el final si existieran bocetos originales.'
    ],
    storyTranslations: [
      'If the composer had not passed away so young, he would have completed his ninth symphony.',
      'The score would have changed the course of music had it been published during his lifetime.',
      'His pupils would not have had to reconstruct the ending if original sketches existed.'
    ],
    vocabulary: [
      { word: 'inconclusa', meaning: 'unfinished/incomplete', pronunciation: 'een-kohn-KLOO-sah' },
      { word: 'fallecido', meaning: 'passed away/deceased', pronunciation: 'fah-lyeh-THEE-doh' },
      { word: 'partitura', meaning: 'sheet music/score', pronunciation: 'pahr-tee-TOO-rah' }
    ],
    grammarNotes: [
      { title: 'En Vida (In Lifetime)', explanation: 'Idiomatic prepositional phrase meaning while still alive.', exampleFromStory: '...si se hubiera publicado en vida.' }
    ],
    lines: [
      { text: "Si el compositor no hubiera fallecido tan joven, habría completado su novena sinfonía.", formula: "Si (Verb) + el compositor no hubiera fallecido tan joven, habría completado su novena sinfonía (Object)" },
      { text: "La partitura habría cambiado el curso de la música si se hubiera publicado en vida.", formula: "La (Verb) + partitura habría cambiado el curso (Object) + de la música si se hubiera publicado en vida (Place)" },
      { text: "Sus discípulos no habrían tenido que reconstruir el final si existieran bocetos originales.", formula: "Sus (Verb) + discípulos no habrían tenido que reconstruir el fin (Object) + al si existieran bocetos originales (Place)" }
    ],
    grammar_note: {
      term: "En Vida (In Lifetime)",
      translation: "En Vida (In Lifetime)",
      explanation: "Idiomatic prepositional phrase meaning while still alive.",
      example: "...si se hubiera publicado en vida."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's208',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'El Juicio Histórico',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 1,
    new_grammar_point: 'pluperfect subjunctive & counterfactual conditionals',
    new_vocab: ['veredicto', 'pruebas', 'absolvuelto'],
    recycled_vocab: ['tribunal', 'juez', 'justicia'],
    mascot_line: 'Crucial evidence turning the tide of historic trials!',
    word_encounters_seed: ['veredicto', 'pruebas', 'absolvuelto'],
    description: 'Analyzing a court verdict in light of newly discovered evidence.',
    storyLines: [
      'Si el tribunal hubiera admitido las pruebas testimoniales, el veredicto habría sido distinto.',
      'El acusado habría sido absuelto de todos los cargos si la defensa hubiese presentado los documentos.',
      'La sentencia se habría anulado si el juez hubiera detectado irregularidades en el proceso.'
    ],
    storyTranslations: [
      'If the court had admitted the witness evidence, the verdict would have been different.',
      'The defendant would have been acquitted of all charges had the defense presented the documents.',
      'The sentence would have been overturned if the judge had detected process irregularities.'
    ],
    vocabulary: [
      { word: 'veredicto', meaning: 'verdict', pronunciation: 'beh-reh-DEEK-toh' },
      { word: 'pruebas', meaning: 'evidence/proof', pronunciation: 'PRWEH-bahs' },
      { word: 'absuelto', meaning: 'acquitted/absolved', pronunciation: 'ahb-SWEHL-toh' }
    ],
    grammarNotes: [
      { title: 'Absuelto (Irregular Participle of Absolver)', explanation: 'Absolver takes irregular past participle absuelto (not absolvido).', exampleFromStory: 'El acusado habría sido absuelto...' }
    ],
    lines: [
      { text: "Si el tribunal hubiera admitido las pruebas testimoniales, el veredicto habría sido distinto.", formula: "Si (Verb) + el tribun (Object) + al hubiera admitido las pruebas testimoniales, el veredicto habría sido distinto (Place)" },
      { text: "El acusado habría sido absuelto de todos los cargos si la defensa hubiese presentado los documentos.", formula: "El (Verb) + acusado habría sido absuelto de todos los cargos si la defensa hubiese presentado los documentos (Object)" },
      { text: "La sentencia se habría anulado si el juez hubiera detectado irregularidades en el proceso.", formula: "La (Verb) + sentencia se habría anulado si el juez hubiera detectado irregularidades (Object) + en el proceso (Place)" }
    ],
    grammar_note: {
      term: "Absuelto (Irregular Participle of Absolver)",
      translation: "Absuelto (Irregular Participle of Absolver)",
      explanation: "Absolver takes irregular past participle absuelto (not absolvido).",
      example: "El acusado habría sido absuelto..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // C1 Tier 2: Specialized Register & Formal Prose
  {
    id: 's209',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'El Dictamen Jurídico',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['jurisprudencia', 'promulgada', 'preámbulo'],
    recycled_vocab: ['ley', 'derechos', 'artículo'],
    mascot_line: 'Rigorous legal analysis grounded in constitutional precedent!',
    word_encounters_seed: ['jurisprudencia', 'promulgada', 'preámbulo'],
    description: 'Formal legal analysis of a newly promulgated statute.',
    storyLines: [
      'Conforme a la jurisprudencia constitucional vigente, la norma promulgada adolece de inconstitucionalidad.',
      'El preámbulo de la ley estipula la salvaguarda de los principios de equidad y seguridad jurídica.',
      'A tenor de lo expuesto en el artículo quinto, se procede al sobreseimiento de las actuaciones.'
    ],
    storyTranslations: [
      'In accordance with current constitutional jurisprudence, the promulgated norm suffers from unconstitutionality.',
      'The preamble of the law stipulates the safeguarding of principles of equity and legal certainty.',
      'Pursuant to what is set forth in article five, dismissal of the proceedings is initiated.'
    ],
    vocabulary: [
      { word: 'jurisprudencia', meaning: 'jurisprudence/precedent', pronunciation: 'hoo-rees-proo-DEHN-thyah' },
      { word: 'promulgada', meaning: 'promulgated/enacted', pronunciation: 'proh-mool-GAH-dah' },
      { word: 'preámbulo', meaning: 'preamble', pronunciation: 'preh-AHM-boo-loh' }
    ],
    grammarNotes: [
      { title: 'A tenor de (Pursuant to / In accordance with)', explanation: 'Formal legal locution introducing supporting statutory citation.', exampleFromStory: 'A tenor de lo expuesto en el artículo quinto...' }
    ],
    lines: [
      { text: "Conforme a la jurisprudencia constitucional vigente, la norma promulgada adolece de inconstitucionalidad.", formula: "Conforme (Verb) + a la jurisprudencia constitucional vigente, la norma promulgada adolece de inconstitucionalidad (Place)" },
      { text: "El preámbulo de la ley estipula la salvaguarda de los principios de equidad y seguridad jurídica.", formula: "El (Verb) + preámbulo de la ley estipul (Object) + a la salvaguarda de los principios de equidad y seguridad jurídica (Place)" },
      { text: "A tenor de lo expuesto en el artículo quinto, se procede al sobreseimiento de las actuaciones.", formula: "A (Verb) + tenor de lo expuesto (Object) + en el artículo quinto, se procede al sobreseimiento de las actuaciones (Place)" }
    ],
    grammar_note: {
      term: "A tenor de (Pursuant to / In accordance with)",
      translation: "A tenor de (Pursuant to / In accordance with)",
      explanation: "Formal legal locution introducing supporting statutory citation.",
      example: "A tenor de lo expuesto en el artículo quinto..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's210',
    lesson: 35,
    cefr_badge: 'C1',
    title: 'La Memoria Académica',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['epistemología', 'paradigma', 'empírico'],
    recycled_vocab: ['investigación', 'análisis', 'teoría'],
    mascot_line: 'Academic research exploring shifts in scientific paradigms!',
    word_encounters_seed: ['epistemología', 'paradigma', 'empírico'],
    description: 'An academic dissertation intro examining epistemological models.',
    storyLines: [
      'La presente investigación aborda la evolución del paradigma científico desde una perspectiva epistemológica.',
      'El análisis empírico evidencia una correlación significativa entre las variables objeto de estudio.',
      'Se concluye que los hallazgos redefinen el marco teórico imperante en la disciplina.'
    ],
    storyTranslations: [
      'The present research addresses the evolution of the scientific paradigm from an epistemological perspective.',
      'Empirical analysis demonstrates a significant correlation between the variables under study.',
      'It is concluded that the findings redefine the prevailing theoretical framework in the discipline.'
    ],
    vocabulary: [
      { word: 'epistemología', meaning: 'epistemology', pronunciation: 'eh-pees-teh-moh-loh-HEE-ah' },
      { word: 'paradigma', meaning: 'paradigm', pronunciation: 'pah-rah-DEEG-mah' },
      { word: 'empírico', meaning: 'empirical', pronunciation: 'ehm-PEE-ree-koh' }
    ],
    grammarNotes: [
      { title: 'Impersonal Academic Passive (Se concluye / Aborda)', explanation: 'Academic style uses formal impersonal passive constructions to maintain objective distance.', exampleFromStory: 'La presente investigación aborda... Se concluye que...' }
    ],
    lines: [
      { text: "La presente investigación aborda la evolución del paradigma científico desde una perspectiva epistemológica.", formula: "La (Verb) + presente investigación abord (Object) + a la evolución del paradigma científico desde una perspectiva epistemológica (Place)" },
      { text: "El análisis empírico evidencia una correlación significativa entre las variables objeto de estudio.", formula: "El (Verb) + análisis empírico evidencia una correlación significativa entre las variables objeto de estudio (Object)" },
      { text: "Se concluye que los hallazgos redefinen el marco teórico imperante en la disciplina.", formula: "Se (Verb) + concluye que los hallazgos redefinen el marco teórico imperante (Object) + en la disciplina (Place)" }
    ],
    grammar_note: {
      term: "Impersonal Academic Passive (Se concluye / Aborda)",
      translation: "Impersonal Academic Passive (Se concluye / Aborda)",
      explanation: "Academic style uses formal impersonal passive constructions to maintain objective distance.",
      example: "La presente investigación aborda... Se concluye que..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's211',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'El Informe de Auditoría',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['auditados', 'salvedades', 'patrimonial'],
    recycled_vocab: ['empresa', 'financiero', 'balances'],
    mascot_line: 'Thorough financial auditing reporting state of corporate solvency!',
    word_encounters_seed: ['auditados', 'salvedades', 'patrimonial'],
    description: 'A formal corporate financial audit summary report.',
    storyLines: [
      'Los estados financieros auditados reflejan fielmente la situación patrimonial de la entidad.',
      'No obstante, se han formulado salvedades relevantes en lo tocante a la valoración del inmovilizado.',
      'La dirección deberá subsanar las deficiencias detectadas antes del cierre del ejercicio.'
    ],
    storyTranslations: [
      'The audited financial statements faithfully reflect the entity\'s equity position.',
      'However, relevant qualifications have been formulated regarding fixed asset valuation.',
      'Management must correct the detected deficiencies prior to the fiscal year close.'
    ],
    vocabulary: [
      { word: 'auditados', meaning: 'audited', pronunciation: 'ow-dee-TAH-dohs' },
      { word: 'salvedades', meaning: 'qualifications/exceptions', pronunciation: 'sahl-beh-DAH-dehs' },
      { word: 'patrimonial', meaning: 'equity/patrimonial', pronunciation: 'pah-tree-moh-NYAL' }
    ],
    grammarNotes: [
      { title: 'En lo tocante a (Regarding / As regards)', explanation: 'Formal register prepositional connector used in financial/legal prose.', exampleFromStory: '...en lo tocante a la valoración del inmovilizado.' }
    ],
    lines: [
      { text: "Los estados financieros auditados reflejan fielmente la situación patrimonial de la entidad.", formula: "Los (Verb) + estados financieros auditados reflejan fielmente la situación patrimoni (Object) + al de la entidad (Place)" },
      { text: "No obstante, se han formulado salvedades relevantes en lo tocante a la valoración del inmovilizado.", formula: "No (Verb) + obstante, se han formulado salvedades relevantes en lo tocante (Object) + a la valoración del inmovilizado (Place)" },
      { text: "La dirección deberá subsanar las deficiencias detectadas antes del cierre del ejercicio.", formula: "La (Verb) + dirección deberá subsanar las deficiencias detectadas antes del cierre del ejercicio (Object)" }
    ],
    grammar_note: {
      term: "En lo tocante a (Regarding / As regards)",
      translation: "En lo tocante a (Regarding / As regards)",
      explanation: "Formal register prepositional connector used in financial/legal prose.",
      example: "...en lo tocante a la valoración del inmovilizado."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's212',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'El Manifiesto Eco-Filosófico',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['antropocentrismo', 'sostenibilidad', 'degradez'],
    recycled_vocab: ['naturaleza', 'humanidad', 'planeta'],
    mascot_line: 'Philosophical essays questioning human impact on nature!',
    word_encounters_seed: ['antropocentrismo', 'sostenibilidad', 'degradez'],
    description: 'An excerpt from a philosophical essay on ecological ethics.',
    storyLines: [
      'El modelo antropocéntrico dominante ha precipitado una crisis ecológica de proporciones inéditas.',
      'Es imperioso transitar hacia una ética biocéntrica que reconozca el valor intrínseco de la naturaleza.',
      'La sostenibilidad no es una mera opción técnica, sino la premisa existencial de nuestra era.'
    ],
    storyTranslations: [
      'The dominant anthropocentric model has precipitated an ecological crisis of unprecedented proportions.',
      'It is imperative to transition toward a biocentric ethic recognizing nature\'s intrinsic value.',
      'Sustainability is not a mere technical option, but the existential premise of our era.'
    ],
    vocabulary: [
      { word: 'antropocentrismo', meaning: 'anthropocentrism', pronunciation: 'ahn-troh-poh-thehn-TREES-moh' },
      { word: 'sostenibilidad', meaning: 'sustainability', pronunciation: 'sohs-teh-nee-bee-lee-DAD' },
      { word: 'degradez', meaning: 'degradation', pronunciation: 'deh-grah-DEHTH' }
    ],
    grammarNotes: [
      { title: 'Es imperioso + Infinitive', explanation: 'Formal evaluative structure expressing absolute urgency.', exampleFromStory: 'Es imperioso transitar hacia una ética...' }
    ],
    lines: [
      { text: "El modelo antropocéntrico dominante ha precipitado una crisis ecológica de proporciones inéditas.", formula: "El (Verb) + modelo antropocéntrico dominante ha precipitado una crisis ecológica de proporciones inéditas (Object)" },
      { text: "Es imperioso transitar hacia una ética biocéntrica que reconozca el valor intrínseco de la naturaleza.", formula: "Es (Verb) + imperioso transitar hacia una ética biocéntrica que reconozca el valor intrínseco (Object) + de la naturaleza (Place)" },
      { text: "La sostenibilidad no es una mera opción técnica, sino la premisa existencial de nuestra era.", formula: "La (Verb) + sostenibilidad no es una mera opción técnica, sino la premisa existenci (Object) + al de nuestra era (Place)" }
    ],
    grammar_note: {
      term: "Es imperioso + Infinitive",
      translation: "Es imperioso + Infinitive",
      explanation: "Formal evaluative structure expressing absolute urgency.",
      example: "Es imperioso transitar hacia una ética..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's213',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'El Ensayo Historiográfico',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['historiografía', 'hegemonía', 'coyuntura'],
    recycled_vocab: ['siglo', 'imperio', 'sociedad'],
    mascot_line: 'Historiographical analysis dissecting imperial power shifts!',
    word_encounters_seed: ['historiografía', 'hegemonía', 'coyuntura'],
    description: 'An excerpt from a history paper on Mediterranean geopolitics.',
    storyLines: [
      'La historiografía contemporánea ha reevaluado la coyuntura política del siglo dieciséis.',
      'La hegemonía imperial se sustentaba en una compleja red de alianzas dinásticas y navales.',
      'Tales factores precipitaron el declive económico de las potencias mediterráneas.'
    ],
    storyTranslations: [
      'Contemporary historiography has reevaluated the political juncture of the sixteenth century.',
      'Imperial hegemony was sustained on a complex network of dynastic and naval alliances.',
      'Such factors precipitated the economic decline of Mediterranean powers.'
    ],
    vocabulary: [
      { word: 'historiografía', meaning: 'historiography', pronunciation: 'ees-toh-ryoh-grah-FEE-ah' },
      { word: 'hegemonía', meaning: 'hegemony', pronunciation: 'eh-heh-moh-NEE-ah' },
      { word: 'coyuntura', meaning: 'juncture/situation', pronunciation: 'koh-yoon-TOO-rah' }
    ],
    grammarNotes: [
      { title: 'Sustentaba (Imperfect of Sustentar)', explanation: 'Formal verb used in academic discourse to describe structural backing.', exampleFromStory: 'La hegemonía imperial se sustentaba en...' }
    ],
    lines: [
      { text: "La historiografía contemporánea ha reevaluado la coyuntura política del siglo dieciséis.", formula: "La (Verb) + historiografía contemporánea ha reevaluado la coyuntura política del siglo dieciséis (Object)" },
      { text: "La hegemonía imperial se sustentaba en una compleja red de alianzas dinásticas y navales.", formula: "La (Verb) + hegemonía imperi (Object) + al se sustentaba en una compleja red de alianzas dinásticas y navales (Place)" },
      { text: "Tales factores precipitaron el declive económico de las potencias mediterráneas.", formula: "Tales (Verb) + factores precipitaron el declive económico de las potencias mediterráneas (Object)" }
    ],
    grammar_note: {
      term: "Sustentaba (Imperfect of Sustentar)",
      translation: "Sustentaba (Imperfect of Sustentar)",
      explanation: "Formal verb used in academic discourse to describe structural backing.",
      example: "La hegemonía imperial se sustentaba en..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's214',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'La Ponencia de Neurociencia',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['neuroplasticidad', 'sináptica', 'córtex'],
    recycled_vocab: ['cerebro', 'memoria', 'investigación'],
    mascot_line: 'Neuroscience lectures unveiling the mysteries of brain plasticity!',
    word_encounters_seed: ['neuroplasticidad', 'sináptica', 'córtex'],
    description: 'Keynote speech excerpts from a neuroscience conference.',
    storyLines: [
      'Los recientes avances en neuroplasticidad demuestran la capacidad adaptativa del córtex cerebral.',
      'Las conexiones sinápticas se reconfiguran mediante la estimulación cognitiva continuada.',
      'Este fenómeno abre perspectivas prometedoras en el tratamiento de patologías neurodegenerativas.'
    ],
    storyTranslations: [
      'Recent advances in neuroplasticity demonstrate the adaptive capacity of the cerebral cortex.',
      'Synaptic connections are reconfigured through continuous cognitive stimulation.',
      'This phenomenon opens promising perspectives in treating neurodegenerative pathologies.'
    ],
    vocabulary: [
      { word: 'neuroplasticidad', meaning: 'neuroplasticity', pronunciation: 'neh-wroh-plahs-tee-thee-DAD' },
      { word: 'sináptica', meaning: 'synaptic', pronunciation: 'see-NAHP-tee-kah' },
      { word: 'córtex', meaning: 'cortex', pronunciation: 'KOHR-tehks' }
    ],
    grammarNotes: [
      { title: 'Mediante (By means of / Through)', explanation: 'Formal preposition used extensively in scientific registers.', exampleFromStory: '...mediante la estimulación cognitiva continuada.' }
    ],
    lines: [
      { text: "Los recientes avances en neuroplasticidad demuestran la capacidad adaptativa del córtex cerebral.", formula: "Los (Verb) + recientes avances en neuroplasticidad demuestran la capacidad adaptativa del córtex cerebral (Object)" },
      { text: "Las conexiones sinápticas se reconfiguran mediante la estimulación cognitiva continuada.", formula: "Las (Verb) + conexiones sinápticas se reconfiguran mediante la estimulación cognitiva continuada (Object)" },
      { text: "Este fenómeno abre perspectivas prometedoras en el tratamiento de patologías neurodegenerativas.", formula: "Este (Verb) + fenómeno abre perspectivas prometedoras (Object) + en el tratamiento de patologías neurodegenerativas (Place)" }
    ],
    grammar_note: {
      term: "Mediante (By means of / Through)",
      translation: "Mediante (By means of / Through)",
      explanation: "Formal preposition used extensively in scientific registers.",
      example: "...mediante la estimulación cognitiva continuada."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's215',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'La Crítica Literaria',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['prosa', 'verosimilitud', 'intertextualidad'],
    recycled_vocab: ['novela', 'autor', 'estilo'],
    mascot_line: 'Literary criticism exploring deep themes of narrative realism!',
    word_encounters_seed: ['prosa', 'verosimilitud', 'intertextualidad'],
    description: 'A literary critique analyzing a prize-winning novel.',
    storyLines: [
      'La prosa del autor destaca por su depurada polifonía y rigurosa verosimilitud histórica.',
      'El uso magistral de la intertextualidad enriquece la trama con resonancias del barroco.',
      'Nos hallamos ante una obra cumbre que consolida la madurez narrativa de su creador.'
    ],
    storyTranslations: [
      'The author\'s prose stands out for its refined polyphony and rigorous historical verisimilitude.',
      'The masterful use of intertextuality enriches the plot with Baroque resonances.',
      'We find ourselves before a masterpiece that consolidates the narrative maturity of its creator.'
    ],
    vocabulary: [
      { word: 'prosa', meaning: 'prose', pronunciation: 'PROH-sah' },
      { word: 'verosimilitud', meaning: 'verisimilitude/plausibility', pronunciation: 'beh-roh-see-mee-lee-TOOD' },
      { word: 'intertextualidad', meaning: 'intertextuality', pronunciation: 'een-tehr-tehks-twah-lee-DAD' }
    ],
    grammarNotes: [
      { title: 'Nos hallamos ante (We find ourselves before)', explanation: 'Elevated literary expression used in reviews and essays.', exampleFromStory: 'Nos hallamos ante una obra cumbre...' }
    ],
    lines: [
      { text: "La prosa del autor destaca por su depurada polifonía y rigurosa verosimilitud histórica.", formula: "La (Verb) + prosa del autor destaca por su depurada polifonía y rigurosa verosimilitud histórica (Object)" },
      { text: "El uso magistral de la intertextualidad enriquece la trama con resonancias del barroco.", formula: "El (Verb) + uso magistr (Object) + al de la intertextualidad enriquece la trama con resonancias del barroco (Place)" },
      { text: "Nos hallamos ante una obra cumbre que consolida la madurez narrativa de su creador.", formula: "Nos (Verb) + hallamos ante una obra cumbre que consolid (Object) + a la madurez narrativa de su creador (Place)" }
    ],
    grammar_note: {
      term: "Nos hallamos ante (We find ourselves before)",
      translation: "Nos hallamos ante (We find ourselves before)",
      explanation: "Elevated literary expression used in reviews and essays.",
      example: "Nos hallamos ante una obra cumbre..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's216',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'El Comunicado Diplomático',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 2,
    new_grammar_point: 'specialized register & formal prose',
    new_vocab: ['soberanía', 'plenipotenciario', 'despliegue'],
    recycled_vocab: ['naciones', 'paz', 'tratado'],
    mascot_line: 'Official diplomatic communiqués addressing international relations!',
    word_encounters_seed: ['soberanía', 'plenipotenciario', 'despliegue'],
    description: 'An official diplomatic press release on international border treaties.',
    storyLines: [
      'El embajador plenipotenciario reafirmó el compromiso inquebrantable con la soberanía nacional.',
      'Se condena enérgicamente cualquier intento de desestabilización en la región fronteriza.',
      'Ambas naciones apelan al diálogo multilateral en el marco del derecho internacional.'
    ],
    storyTranslations: [
      'The plenipotentiary ambassador reaffirmed unwavering commitment to national sovereignty.',
      'Any destabilization attempt in the border region is strongly condemned.',
      'Both nations appeal to multilateral dialogue within the framework of international law.'
    ],
    vocabulary: [
      { word: 'soberanía', meaning: 'sovereignty', pronunciation: 'soh-beh-rah-NEE-ah' },
      { word: 'plenipotenciario', meaning: 'plenipotentiary', pronunciation: 'pleh-nee-poh-tehn-THYAH-ryoh' },
      { word: 'despliegue', meaning: 'deployment', pronunciation: 'dehs-PLYEH-geh' }
    ],
    grammarNotes: [
      { title: 'En el marco de (Within the framework of)', explanation: 'Standard formal diplomatic connector referencing legal treaties or bodies.', exampleFromStory: '...en el marco del derecho internacional.' }
    ],
    lines: [
      { text: "El embajador plenipotenciario reafirmó el compromiso inquebrantable con la soberanía nacional.", formula: "El (Verb) + embajador plenipotenciario reafirmó el compromiso inquebrantable con la soberanía nacional (Object)" },
      { text: "Se condena enérgicamente cualquier intento de desestabilización en la región fronteriza.", formula: "Se (Verb) + condena enérgicamente cualquier intento de desestabilización (Object) + en la región fronteriza (Place)" },
      { text: "Ambas naciones apelan al diálogo multilateral en el marco del derecho internacional.", formula: "Ambas (Verb) + naciones apelan al diálogo multilateral (Object) + en el marco del derecho internacional (Place)" }
    ],
    grammar_note: {
      term: "En el marco de (Within the framework of)",
      translation: "En el marco de (Within the framework of)",
      explanation: "Standard formal diplomatic connector referencing legal treaties or bodies.",
      example: "...en el marco del derecho internacional."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // C1 Tier 3: Complex Subjunctive Clauses & Idiomatic Expressions
  {
    id: 's217',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'Por Mucho que Esfuerces',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['por mucho que', 'logrará', 'convencer'],
    recycled_vocab: ['esfuerzo', 'opinión', 'razón'],
    mascot_line: 'Stand firm in your beliefs regardless of opposition!',
    word_encounters_seed: ['por mucho que', 'logrará', 'convencer'],
    description: 'Expressing firmness despite persistent opposition.',
    storyLines: [
      'Por mucho que insistas en tu postura, no lograrás convencer al comité.',
      'Por más que intenten ocultar la verdad, los hechos saldrán a la luz.',
      'Haga lo que haga, la junta mantendrá la decisión adoptada.'
    ],
    storyTranslations: [
      'No matter how much you insist on your stance, you will not manage to convince the committee.',
      'No matter how much they try to hide the truth, facts will emerge to light.',
      'Whatever he does, the board will maintain the adopted decision.'
    ],
    vocabulary: [
      { word: 'por mucho que', meaning: 'no matter how much', pronunciation: 'pohr MOO-choh keh' },
      { word: 'logrará', meaning: 'will achieve/manage', pronunciation: 'loh-grah-RAH' },
      { word: 'convencer', meaning: 'to convince', pronunciation: 'kohn-behn-THEHR' }
    ],
    grammarNotes: [
      { title: 'Por Mucho Que / Por Más Que + Subjunctive', explanation: 'Concessive structures expressing "no matter how much" requiring subjunctive mood.', exampleFromStory: 'Por mucho que insistas... Por más que intenten...' }
    ],
    lines: [
      { text: "Por mucho que insistas en tu postura, no lograrás convencer al comité.", formula: "Por (Verb) + mucho que insistas en tu postura, no lograrás convencer (Object) + al comité (Place)" },
      { text: "Por más que intenten ocultar la verdad, los hechos saldrán a la luz.", formula: "Por (Verb) + más que intenten ocultar la verdad, los hechos saldrán (Object) + a la luz (Place)" },
      { text: "Haga lo que haga, la junta mantendrá la decisión adoptada.", formula: "Haga (Verb) + lo que haga, la junta mantendrá la decisión adoptada (Object)" }
    ],
    grammar_note: {
      term: "Por Mucho Que / Por Más Que + Subjunctive",
      translation: "Por Mucho Que / Por Más Que + Subjunctive",
      explanation: "Concessive structures expressing \"no matter how much\" requiring subjunctive mood.",
      example: "Por mucho que insistas... Por más que intenten..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's218',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'Sea Cual Sea el Resultado',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['sea cual sea', 'consecuencias', 'asumiremos'],
    recycled_vocab: ['resultado', 'equipo', 'esfuerzo'],
    mascot_line: 'Face any outcome with unwavering dedication and courage!',
    word_encounters_seed: ['sea cual sea', 'consecuencias', 'asumiremos'],
    description: 'Commitment to a course of action regardless of consequences.',
    storyLines: [
      'Sea cual sea el resultado de la votación, asumiremos la responsabilidad colectiva.',
      'Cueste lo que cueste, culminaremos el proyecto dentro del plazo fijado.',
      'Venga quien venga a la dirección, los principios de la empresa no cambiarán.'
    ],
    storyTranslations: [
      'Whatever the voting result may be, we will assume collective responsibility.',
      'Whatever it costs, we will complete the project within the set deadline.',
      'Whoever comes to management, the company\'s principles will not change.'
    ],
    vocabulary: [
      { word: 'sea cual sea', meaning: 'whatever ... may be', pronunciation: 'SEH-ah kwahl SEH-ah' },
      { word: 'consecuencias', meaning: 'consequences', pronunciation: 'kohn-seh-KWEHN-thyahs' },
      { word: 'asumiremos', meaning: 'we will assume', pronunciation: 'ah-soo-mee-REH-mohs' }
    ],
    grammarNotes: [
      { title: 'Reduplicative Subjunctive (Sea cual sea / Cueste lo que cueste)', explanation: 'Idiomatic expressions repeating verb in subjunctive to express unyielding resolution.', exampleFromStory: 'Sea cual sea el resultado... Cueste lo que cueste...' }
    ],
    lines: [
      { text: "Sea cual sea el resultado de la votación, asumiremos la responsabilidad colectiva.", formula: "Sea (Verb) + cu (Object) + al sea el resultado de la votación, asumiremos la responsabilidad colectiva (Place)" },
      { text: "Cueste lo que cueste, culminaremos el proyecto dentro del plazo fijado.", formula: "Cueste (Verb) + lo que cueste, culminaremos el proyecto dentro del plazo fijado (Object)" },
      { text: "Venga quien venga a la dirección, los principios de la empresa no cambiarán.", formula: "Venga (Verb) + quien venga (Object) + a la dirección, los principios de la empresa no cambiarán (Place)" }
    ],
    grammar_note: {
      term: "Reduplicative Subjunctive (Sea cual sea / Cueste lo que cueste)",
      translation: "Reduplicative Subjunctive (Sea cual sea / Cueste lo que cueste)",
      explanation: "Idiomatic expressions repeating verb in subjunctive to express unyielding resolution.",
      example: "Sea cual sea el resultado... Cueste lo que cueste..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's219',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'Tan Pronto Como Llegue',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['tan pronto como', 'apenas', 'comunicado'],
    recycled_vocab: ['noticia', 'reunión', 'director'],
    mascot_line: 'Prompt communication ensures rapid response to developments!',
    word_encounters_seed: ['tan pronto como', 'apenas', 'comunicado'],
    description: 'Setting temporal conditions for future actions in formal context.',
    storyLines: [
      'Tan pronto como se apruebe la resolución, emitiremos un comunicado oficial.',
      'En cuanto tengamos confirmación del ministerio, iniciaremos las obras.',
      'Apenas termine la reunión del consejo, os informaré de los acuerdos.'
    ],
    storyTranslations: [
      'As soon as the resolution is approved, we will issue an official statement.',
      'As soon as we have confirmation from the ministry, we will start the works.',
      'As soon as the board meeting ends, I will inform you of the agreements.'
    ],
    vocabulary: [
      { word: 'tan pronto como', meaning: 'as soon as', pronunciation: 'tahn PROHN-toh koh-moh' },
      { word: 'apenas', meaning: 'as soon as / barely', pronunciation: 'ah-PEH-nahs' },
      { word: 'comunicado', meaning: 'statement/release', pronunciation: 'koh-moo-nee-KAH-doh' }
    ],
    grammarNotes: [
      { title: 'Temporal Connectors + Subjunctive (Tan pronto como / En cuanto)', explanation: 'Future temporal clauses require present subjunctive for expected actions.', exampleFromStory: 'Tan pronto como se apruebe... En cuanto tengamos...' }
    ],
    lines: [
      { text: "Tan pronto como se apruebe la resolución, emitiremos un comunicado oficial.", formula: "Tan (Verb) + pronto como se apruebe la resolución, emitiremos un comunicado oficial (Object)" },
      { text: "En cuanto tengamos confirmación del ministerio, iniciaremos las obras.", formula: "En (Verb) + cuanto tengamos confirmación del ministerio, iniciaremos las obras (Object)" },
      { text: "Apenas termine la reunión del consejo, os informaré de los acuerdos.", formula: "Apenas (Verb) + termine la reunión del consejo, os informaré de los acuerdos (Object)" }
    ],
    grammar_note: {
      term: "Temporal Connectors + Subjunctive (Tan pronto como / En cuanto)",
      translation: "Temporal Connectors + Subjunctive (Tan pronto como / En cuanto)",
      explanation: "Future temporal clauses require present subjunctive for expected actions.",
      example: "Tan pronto como se apruebe... En cuanto tengamos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's220',
    lesson: 36,
    cefr_badge: 'C1',
    title: 'A Menos que Haya Cambios',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['a menos que', 'a no ser que', 'imprevistos'],
    recycled_vocab: ['plan', 'calendario', 'firmado'],
    mascot_line: 'Solid plans standing firm unless unforeseen events arise!',
    word_encounters_seed: ['a menos que', 'a no ser que', 'imprevistos'],
    description: 'Stating conditional exceptions to established schedules.',
    storyLines: [
      'El calendario de entregas se mantendrá, a menos que surjan imprevistos graves.',
      'A no ser que la contraparte modifique su postura, firmaremos el contrato mañana.',
      'Salvo que dispongamos de nuevos datos, daremos por concluida la investigación.'
    ],
    storyTranslations: [
      'The delivery schedule will be maintained, unless serious unforeseen issues arise.',
      'Unless the counterparty modifies its stance, we will sign the contract tomorrow.',
      'Unless we have new data, we will consider the investigation concluded.'
    ],
    vocabulary: [
      { word: 'a menos que', meaning: 'unless', pronunciation: 'ah MEH-nohs keh' },
      { word: 'a no ser que', meaning: 'unless / except if', pronunciation: 'ah noh SEHR keh' },
      { word: 'imprevistos', meaning: 'unforeseen events', pronunciation: 'eem-preh-BEES-tohs' }
    ],
    grammarNotes: [
      { title: 'Negative Condition (A menos que / A no ser que)', explanation: 'Always triggers subjunctive mood to introduce conditional exceptions.', exampleFromStory: '...a menos que surjan imprevistos... A no ser que modifique...' }
    ],
    lines: [
      { text: "El calendario de entregas se mantendrá, a menos que surjan imprevistos graves.", formula: "El (Verb) + calendario de entregas se mantendrá, a menos que surjan imprevistos graves (Object)" },
      { text: "A no ser que la contraparte modifique su postura, firmaremos el contrato mañana.", formula: "A (Verb) + no ser que la contraparte modifique su postura, firmaremos el contrato (Object) + mañana (Time)" },
      { text: "Salvo que dispongamos de nuevos datos, daremos por concluida la investigación.", formula: "Salvo (Verb) + que dispongamos de nuevos datos, daremos por concluid (Object) + a la investigación (Place)" }
    ],
    grammar_note: {
      term: "Negative Condition (A menos que / A no ser que)",
      translation: "Negative Condition (A menos que / A no ser que)",
      explanation: "Always triggers subjunctive mood to introduce conditional exceptions.",
      example: "...a menos que surjan imprevistos... A no ser que modifique..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's221',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'Como Si Nada Hubiera Pasado',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['como si', 'apariencia', 'disimulo'],
    recycled_vocab: ['situación', 'tensión', 'calma'],
    mascot_line: 'Maintaining calm appearances despite inner tension!',
    word_encounters_seed: ['como si', 'apariencia', 'disimulo'],
    description: 'Describing composed behavior despite an underlying crisis.',
    storyLines: [
      'El director continuó la presentación como si nada hubiera ocurrido.',
      'Hablaba con total naturalidad, como si ignorara por completo el escándalo.',
      'Mantuvo la compostura como si se tratara de una simple anécdota.'
    ],
    storyTranslations: [
      'The director continued the presentation as if nothing had happened.',
      'He spoke with complete naturalness, as if he completely ignored the scandal.',
      'He maintained composure as if it were a simple anecdote.'
    ],
    vocabulary: [
      { word: 'como si', meaning: 'as if / as though', pronunciation: 'KOH-moh see' },
      { word: 'apariencia', meaning: 'appearance', pronunciation: 'ah-pah-RYEHN-thyah' },
      { word: 'disimulo', meaning: 'dissemble/feigning', pronunciation: 'dee-see-MOO-loh' }
    ],
    grammarNotes: [
      { title: 'Como Si + Subjunctive (Como si hubiera / Como si ignorara)', explanation: 'Como si always requires imperfect or pluperfect subjunctive.', exampleFromStory: '...como si nada hubiera ocurrido... como si ignorara...' }
    ],
    lines: [
      { text: "El director continuó la presentación como si nada hubiera ocurrido.", formula: "El (Verb) + director continuó la presentación como si nada hubiera ocurrido (Object)" },
      { text: "Hablaba con total naturalidad, como si ignorara por completo el escándalo.", formula: "Hablaba (Verb) + con tot (Object) + al naturalidad, como si ignorara por completo el escándalo (Place)" },
      { text: "Mantuvo la compostura como si se tratara de una simple anécdota.", formula: "Mantuvo (Verb) + la compostura como si se tratara de una simple anécdota (Object)" }
    ],
    grammar_note: {
      term: "Como Si + Subjunctive (Como si hubiera / Como si ignorara)",
      translation: "Como Si + Subjunctive (Como si hubiera / Como si ignorara)",
      explanation: "Como si always requires imperfect or pluperfect subjunctive.",
      example: "...como si nada hubiera ocurrido... como si ignorara..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's222',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'Por Más que Digan lo Contrario',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['por más que', 'evidencia', 'innegable'],
    recycled_vocab: ['datos', 'informe', 'verdad'],
    mascot_line: 'Overwhelming evidence disproving contrary claims!',
    word_encounters_seed: ['por más que', 'evidencia', 'innegable'],
    description: 'Relying on clear evidence despite conflicting opinions.',
    storyLines: [
      'Por más que pretendan desmentir las cifras, la evidencia empírica es innegable.',
      'Digan lo que digan los críticos, el proyecto ha demostrado su rentabilidad.',
      'Opinaren lo que opinaren los analistas, el mercado seguirá su propio curso.'
    ],
    storyTranslations: [
      'No matter how much they pretend to refute the figures, empirical evidence is undeniable.',
      'Whatever critics say, the project has demonstrated its profitability.',
      'Whatever analysts may think, the market will follow its own course.'
    ],
    vocabulary: [
      { word: 'por más que', meaning: 'no matter how much', pronunciation: 'pohr MAHS keh' },
      { word: 'evidencia', meaning: 'evidence', pronunciation: 'eh-bee-DEHN-thyah' },
      { word: 'innegable', meaning: 'undeniable', pronunciation: 'een-neh-GAH-bleh' }
    ],
    grammarNotes: [
      { title: 'Digan lo que digan (Say what they say)', explanation: 'Popular fixed expression of concession using present subjunctive.', exampleFromStory: 'Digan lo que digan los críticos...' }
    ],
    lines: [
      { text: "Por más que pretendan desmentir las cifras, la evidencia empírica es innegable.", formula: "Por (Verb) + más que pretendan desmentir las cifras, la evidencia empírica es innegable (Object)" },
      { text: "Digan lo que digan los críticos, el proyecto ha demostrado su rentabilidad.", formula: "Digan (Verb) + lo que digan los críticos, el proyecto ha demostrado su rentabilidad (Object)" },
      { text: "Opinaren lo que opinaren los analistas, el mercado seguirá su propio curso.", formula: "Opinaren (Verb) + lo que opinar (Object) + en los analistas, el mercado seguirá su propio curso (Place)" }
    ],
    grammar_note: {
      term: "Digan lo que digan (Say what they say)",
      translation: "Digan lo que digan (Say what they say)",
      explanation: "Popular fixed expression of concession using present subjunctive.",
      example: "Digan lo que digan los críticos..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's223',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'Antes de que Sea Tarde',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['antes de que', 'medidas', 'irreversible'],
    recycled_vocab: ['urgente', 'tiempo', 'solución'],
    mascot_line: 'Taking urgent action before damage becomes irreversible!',
    word_encounters_seed: ['antes de que', 'medidas', 'irreversible'],
    description: 'Urging preventive action before damage becomes permanent.',
    storyLines: [
      'Debemos adoptar medidas correctoras antes de que el deterioro sea irreversible.',
      'Conviene intervenir de inmediato antes de que el conflicto se agrave.',
      'Es preciso actuar con celeridad antes de que se agoten los recursos.'
    ],
    storyTranslations: [
      'We must adopt corrective measures before the deterioration becomes irreversible.',
      'It is advisable to intervene immediately before the conflict escalates.',
      'It is necessary to act with swiftness before resources are depleted.'
    ],
    vocabulary: [
      { word: 'antes de que', meaning: 'before', pronunciation: 'AHN-tehs deh keh' },
      { word: 'medidas', meaning: 'measures', pronunciation: 'meh-DEE-dahs' },
      { word: 'irreversible', meaning: 'irreversible', pronunciation: 'ee-rreh-behr-SEE-bleh' }
    ],
    grammarNotes: [
      { title: 'Antes de que + Subjunctive', explanation: '"Antes de que" always requires the subjunctive mood, regardless of timeframe.', exampleFromStory: '...antes de que el deterioro sea irreversible.' }
    ],
    lines: [
      { text: "Debemos adoptar medidas correctoras antes de que el deterioro sea irreversible.", formula: "Debemos (Verb) + adoptar medidas correctoras antes de que el deterioro sea irreversible (Object)" },
      { text: "Conviene intervenir de inmediato antes de que el conflicto se agrave.", formula: "Conviene (Verb) + intervenir de inmediato antes de que el conflicto se agrave (Object)" },
      { text: "Es preciso actuar con celeridad antes de que se agoten los recursos.", formula: "Es (Verb) + preciso actuar con celeridad antes de que se agot (Object) + en los recursos (Place)" }
    ],
    grammar_note: {
      term: "Antes de que + Subjunctive",
      translation: "Antes de que + Subjunctive",
      explanation: "\"Antes de que\" always requires the subjunctive mood, regardless of timeframe.",
      example: "...antes de que el deterioro sea irreversible."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's224',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'En Caso de que Ocurra',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 3,
    new_grammar_point: 'complex subjunctive clauses & idiomatic expressions',
    new_vocab: ['en caso de que', 'contingencia', 'activará'],
    recycled_vocab: ['protocolo', 'emergencia', 'equipo'],
    mascot_line: 'Emergency contingency plans ready for quick deployment!',
    word_encounters_seed: ['en caso de que', 'contingencia', 'activará'],
    description: 'Detailing emergency contingency procedures.',
    storyLines: [
      'Se ha diseñado un plan de contingencia en caso de que falle el sistema principal.',
      'En el supuesto de que se produzca una interrupción, el generador auxiliar arrancará.',
      'Pondremos en marcha el protocolo de emergencia en caso de que sea necesario.'
    ],
    storyTranslations: [
      'A contingency plan has been designed in case the main system fails.',
      'In the event that an outage occurs, the auxiliary generator will start up.',
      'We will launch the emergency protocol in case it is necessary.'
    ],
    vocabulary: [
      { word: 'en caso de que', meaning: 'in case / in the event that', pronunciation: 'ehn KAH-soh deh keh' },
      { word: 'contingencia', meaning: 'contingency', pronunciation: 'kohn-teen-HEHN-thyah' },
      { word: 'activará', meaning: 'will activate', pronunciation: 'ahk-tee-bah-RAH' }
    ],
    grammarNotes: [
      { title: 'En Caso de Que + Subjunctive', explanation: 'Conditional expression of hypothetical precaution requiring subjunctive.', exampleFromStory: '...en caso de que falle el sistema... en el supuesto de que se produzca...' }
    ],
    lines: [
      { text: "Se ha diseñado un plan de contingencia en caso de que falle el sistema principal.", formula: "Se (Verb) + ha diseñado un plan de contingencia en caso de que falle el sistema principal (Object)" },
      { text: "En el supuesto de que se produzca una interrupción, el generador auxiliar arrancará.", formula: "En el supuesto de que se produzca una interrupción, el generador auxiliar arrancará (Place)" },
      { text: "Pondremos en marcha el protocolo de emergencia en caso de que sea necesario.", formula: "Pondremos (Verb) + en marcha el protocolo de emergencia en caso de que sea necesario (Object)" }
    ],
    grammar_note: {
      term: "En Caso de Que + Subjunctive",
      translation: "En Caso de Que + Subjunctive",
      explanation: "Conditional expression of hypothetical precaution requiring subjunctive.",
      example: "...en caso de que falle el sistema... en el supuesto de que se produzca..."
    },
    mascot_asset_id: 'yuki-chibi'
  },

  // C1 Tier 4: Literary Tenses & Nuanced Discourse
  {
    id: 's225',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'La Noche en la Altiplanicie',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo terminado', 'penumbra', 'silencio'],
    recycled_vocab: ['noche', 'viento', 'montaña'],
    mascot_line: 'Poetic prose capturing quiet mountain nights!',
    word_encounters_seed: ['hubo terminado', 'penumbra', 'silencio'],
    description: 'Literary description of nightfall in high mountain plateaus.',
    storyLines: [
      'No bien hubo terminado el crepúsculo, un silencio sepulcral envolvió la altiplanicie.',
      'Apenas hubo cerrado la noche, las estrellas centellearon con fulgor helado.',
      'El caminante, exhausto tras la jornada, se cobijó al abrigo de las rocas.'
    ],
    storyTranslations: [
      'No sooner had twilight finished than a sepulchral silence enveloped the plateau.',
      'Barely had night fallen than the stars sparkled with icy brilliance.',
      'The traveler, exhausted after the journey, took shelter under the rocks.'
    ],
    vocabulary: [
      { word: 'hubo terminado', meaning: 'had finished (preterite anterior)', pronunciation: 'OO-boh tehr-mee-NAH-doh' },
      { word: 'penumbra', meaning: 'gloom/twilight', pronunciation: 'peh-NOOM-brah' },
      { word: 'silencio', meaning: 'silence', pronunciation: 'see-LEHN-thyoh' }
    ],
    grammarNotes: [
      { title: 'Pretérito Anterior (No bien hubo terminado)', explanation: 'Literary tense formed with "hubo" + participle used after temporal adverbs (no bien, apenas).', exampleFromStory: 'No bien hubo terminado el crepúsculo...' }
    ],
    lines: [
      { text: "No bien hubo terminado el crepúsculo, un silencio sepulcral envolvió la altiplanicie.", formula: "No (Verb) + bien hubo terminado el crepúsculo, un silencio sepulcr (Object) + al envolvió la altiplanicie (Place)" },
      { text: "Apenas hubo cerrado la noche, las estrellas centellearon con fulgor helado.", formula: "Apenas (Verb) + hubo cerrado la noche, las estrellas centellearon con fulgor helado (Object)" },
      { text: "El caminante, exhausto tras la jornada, se cobijó al abrigo de las rocas.", formula: "El (Verb) + caminante, exhausto tras la jornada, se cobijó (Object) + al abrigo de las rocas (Place)" }
    ],
    grammar_note: {
      term: "Pretérito Anterior (No bien hubo terminado)",
      translation: "Pretérito Anterior (No bien hubo terminado)",
      explanation: "Literary tense formed with \"hubo\" + participle used after temporal adverbs (no bien, apenas).",
      example: "No bien hubo terminado el crepúsculo..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's226',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'El Relato del Viejo Marino',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo zarpado', 'navío', 'tempestad'],
    recycled_vocab: ['mar', 'marino', 'olas'],
    mascot_line: 'Epic sea voyages battling fierce ocean storms!',
    word_encounters_seed: ['hubo zarpado', 'navío', 'tempestad'],
    description: 'A sailor recounting an ancient sea voyage storm.',
    storyLines: [
      'Tan pronto como hubo zarpado la fragata, desencadenose una furiosa tempestad.',
      'Las olas gigantescas arremetían sin piedad contra el maderamen del navío.',
      'El capitán, impávido ante el peligro, mantuvo el rumbo con mano firme.'
    ],
    storyTranslations: [
      'As soon as the frigate had set sail, a furious storm broke out.',
      'Gigantic waves pounded mercilessly against the vessel\'s woodwork.',
      'The captain, undaunted by danger, kept the course with a steady hand.'
    ],
    vocabulary: [
      { word: 'hubo zarpado', meaning: 'had set sail', pronunciation: 'OO-boh thahr-PAH-doh' },
      { word: 'navío', meaning: 'ship/vessel', pronunciation: 'nah-BEE-oh' },
      { word: 'tempestad', meaning: 'tempest/storm', pronunciation: 'tehm-pehs-TAD' }
    ],
    grammarNotes: [
      { title: 'Enclitic Pronoun Placement (Desencadenose)', explanation: 'Literary style attaching object pronouns to the end of conjugated preterite verbs.', exampleFromStory: '...desencadenose una furiosa tempestad.' }
    ],
    lines: [
      { text: "Tan pronto como hubo zarpado la fragata, desencadenose una furiosa tempestad.", formula: "Tan (Verb) + pronto como hubo zarpado la fragata, desencadenose una furiosa tempestad (Object)" },
      { text: "Las olas gigantescas arremetían sin piedad contra el maderamen del navío.", formula: "Las (Verb) + olas gigantescas arremetían sin piedad contra el maderamen del navío (Object)" },
      { text: "El capitán, impávido ante el peligro, mantuvo el rumbo con mano firme.", formula: "El (Verb) + capitán, impávido ante el peligro, mantuvo el rumbo con mano firme (Object)" }
    ],
    grammar_note: {
      term: "Enclitic Pronoun Placement (Desencadenose)",
      translation: "Enclitic Pronoun Placement (Desencadenose)",
      explanation: "Literary style attaching object pronouns to the end of conjugated preterite verbs.",
      example: "...desencadenose una furiosa tempestad."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's227',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'El Secreto de los Antiguos',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo expuesto', 'pergamino', 'asombrados'],
    recycled_vocab: ['sabio', 'historia', 'misterio'],
    mascot_line: 'Unveiling lost wisdom from forgotten scrolls!',
    word_encounters_seed: ['hubo expuesto', 'pergamino', 'asombrados'],
    description: 'Unveiling ancient wisdom before a council of scholars.',
    storyLines: [
      'Una vez que el anciano sabio hubo expuesto el pergamino, los eruditos enmudecieron.',
      'Las inscripciones cuneiformes revelaban un conocimiento astronómico insólito.',
      'Quedó al descubierto un misterio celosamente guardado durante milenios.'
    ],
    storyTranslations: [
      'Once the old sage had presented the parchment, the scholars fell silent.',
      'Cuneiform inscriptions revealed unusual astronomical knowledge.',
      'A mystery zealously guarded for millennia was uncovered.'
    ],
    vocabulary: [
      { word: 'hubo expuesto', meaning: 'had presented/exposed', pronunciation: 'OO-boh ehks-PWEHS-toh' },
      { word: 'pergamino', meaning: 'parchment/scroll', pronunciation: 'pehr-gah-MEE-noh' },
      { word: 'asombrados', meaning: 'astonished/amazed', pronunciation: 'ah-sohm-BRAH-dohs' }
    ],
    grammarNotes: [
      { title: 'Una Vez Que + Pretérito Anterior', explanation: 'Formal literary construction marking immediate temporal sequence in past storytelling.', exampleFromStory: 'Una vez que el anciano sabio hubo expuesto...' }
    ],
    lines: [
      { text: "Una vez que el anciano sabio hubo expuesto el pergamino, los eruditos enmudecieron.", formula: "Una (Verb) + vez que el anciano sabio hubo expuesto el pergamino, los eruditos enmudecieron (Object)" },
      { text: "Las inscripciones cuneiformes revelaban un conocimiento astronómico insólito.", formula: "Las (Verb) + inscripciones cuneiformes revelaban un conocimiento astronómico insólito (Object)" },
      { text: "Quedó al descubierto un misterio celosamente guardado durante milenios.", formula: "Quedó (Verb) + al descubierto un misterio celosamente guardado durante milenios (Place)" }
    ],
    grammar_note: {
      term: "Una Vez Que + Pretérito Anterior",
      translation: "Una Vez Que + Pretérito Anterior",
      explanation: "Formal literary construction marking immediate temporal sequence in past storytelling.",
      example: "Una vez que el anciano sabio hubo expuesto..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's228',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'El Último Banquete',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo pronunciado', 'brindis', 'salón'],
    recycled_vocab: ['rey', 'palacio', 'silencio'],
    mascot_line: 'Solemn royal toasts echoing in grand palace halls!',
    word_encounters_seed: ['hubo pronunciado', 'brindis', 'salón'],
    description: 'A solemn royal toast delivered at a farewell banquet.',
    storyLines: [
      'Así que el monarca hubo pronunciado el brindis, los cortesanos alzaron sus copas.',
      'Un murmullo de solemnidad recorrió los espejos y tapices del gran salón.',
      'Aquel acto simbolizaba el fin de una era próspera y el inicio de la incertidumbre.'
    ],
    storyTranslations: [
      'As soon as the monarch had spoken the toast, courtiers raised their glasses.',
      'A murmur of solemnity ran through the mirrors and tapestries of the great hall.',
      'That act symbolized the end of a prosperous era and the start of uncertainty.'
    ],
    vocabulary: [
      { word: 'hubo pronunciado', meaning: 'had spoken/delivered', pronunciation: 'OO-boh proh-noon-THYAH-doh' },
      { word: 'brindis', meaning: 'toast', pronunciation: 'BREEN-dees' },
      { word: 'salón', meaning: 'hall/salon', pronunciation: 'sah-LOHN' }
    ],
    grammarNotes: [
      { title: 'Así Que + Pretérito Anterior', explanation: 'Literary usage of "así que" with pretérito anterior for immediate sequence.', exampleFromStory: 'Así que el monarca hubo pronunciado el brindis...' }
    ],
    lines: [
      { text: "Así que el monarca hubo pronunciado el brindis, los cortesanos alzaron sus copas.", formula: "Así (Verb) + que el monarca hubo pronunciado el brindis, los cortesanos alzaron sus copas (Object)" },
      { text: "Un murmullo de solemnidad recorrió los espejos y tapices del gran salón.", formula: "Un (Verb) + murmullo de solemnidad recorrió los espejos y tapices del gran salón (Object)" },
      { text: "Aquel acto simbolizaba el fin de una era próspera y el inicio de la incertidumbre.", formula: "Aquel (Verb) + acto simbolizaba el fin de una era próspera y el inicio (Object) + de la incertidumbre (Place)" }
    ],
    grammar_note: {
      term: "Así Que + Pretérito Anterior",
      translation: "Así Que + Pretérito Anterior",
      explanation: "Literary usage of \"así que\" with pretérito anterior for immediate sequence.",
      example: "Así que el monarca hubo pronunciado el brindis..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's229',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'El Vuelo sobre los Andes',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo cruzado', 'cordillera', 'abismo'],
    recycled_vocab: ['avión', 'montañas', 'cielo'],
    mascot_line: 'Majestic aerial views crossing mountain peaks!',
    word_encounters_seed: ['hubo cruzado', 'cordillera', 'abismo'],
    description: 'Literary narrative of flying over the Andes range.',
    storyLines: [
      'Apenas la aeronave hubo cruzado la cumbre de la cordillera, la niebla se disipó.',
      'Ante la vista de los pasajeros desplegose la inmensidad de los valles andinos.',
      'Los picos nevados resplandecían bajo el sol matutino como diamantes gigantescos.'
    ],
    storyTranslations: [
      'Barely had the aircraft crossed the mountain range peak than fog dissipated.',
      'Before passengers\' eyes unfolded the immensity of Andean valleys.',
      'Snowy peaks gleamed under the morning sun like giant diamonds.'
    ],
    vocabulary: [
      { word: 'hubo cruzado', meaning: 'had crossed', pronunciation: 'OO-boh kroo-THAH-doh' },
      { word: 'cordillera', meaning: 'mountain range', pronunciation: 'kohr-dee-LYEH-rah' },
      { word: 'abismo', meaning: 'chasm/abyss', pronunciation: 'ah-BEES-moh' }
    ],
    grammarNotes: [
      { title: 'Apenas + Pretérito Anterior', explanation: '"Apenas" + pretérito anterior for sudden past events.', exampleFromStory: 'Apenas la aeronave hubo cruzado...' }
    ],
    lines: [
      { text: "Apenas la aeronave hubo cruzado la cumbre de la cordillera, la niebla se disipó.", formula: "Apenas la aeronave (Subject) + hubo (Verb) + cruzado la cumbre (Object) + de la cordillera, la niebla se disipó (Place)" },
      { text: "Ante la vista de los pasajeros desplegose la inmensidad de los valles andinos.", formula: "Ante (Verb) + la vista de los pasajeros desplegose la inmensidad de los valles andinos (Object)" },
      { text: "Los picos nevados resplandecían bajo el sol matutino como diamantes gigantescos.", formula: "Los (Verb) + picos nevados resplandecían bajo el sol matutino como diamantes gigantescos (Object)" }
    ],
    grammar_note: {
      term: "Apenas + Pretérito Anterior",
      translation: "Apenas + Pretérito Anterior",
      explanation: "\"Apenas\" + pretérito anterior for sudden past events.",
      example: "Apenas la aeronave hubo cruzado..."
    },
    mascot_asset_id: 'yuki-chibi'
  },
  {
    id: 's230',
    lesson: 37,
    cefr_badge: 'C1',
    title: 'La Firma del Armisticio',
    level: 'C1',
    levelLabel: 'C1 / Experto',
    tier: 4,
    new_grammar_point: 'literary tenses & nuanced discourse',
    new_vocab: ['hubo estampado', 'firmas', 'armisticio'],
    recycled_vocab: ['paz', 'guerra', 'naciones'],
    mascot_line: 'Signing historic peace armistice treaties!',
    word_encounters_seed: ['hubo estampado', 'firmas', 'armisticio'],
    description: 'The moment an armistice treaty was signed ending hostilities.',
    storyLines: [
      'Luego que el delegado hubo estampado su firma en el documento, sonaron las campanas.',
      'Las tropas en el frente depusieron las armas al recibir la noticia de la paz.',
      'Se iniciaba así una nueva etapa de reconstrucción y reconciliación nacional.'
    ],
    storyTranslations: [
      'After the delegate had stamped his signature on the document, bells rang out.',
      'Troops at the front laid down weapons upon receiving news of peace.',
      'Thus began a new era of national reconstruction and reconciliation.'
    ],
    vocabulary: [
      { word: 'hubo estampado', meaning: 'had stamped/affixed', pronunciation: 'OO-boh ehs-tahm-PAH-doh' },
      { word: 'firmas', meaning: 'signatures', pronunciation: 'FEER-mahs' },
      { word: 'armisticio', meaning: 'armistice/truce', pronunciation: 'ahr-mees-TEE-thyoh' }
    ],
    grammarNotes: [
      { title: 'Luego Que + Pretérito Anterior', explanation: '"Luego que" (after / as soon as) with pretérito anterior in solemn historical prose.', exampleFromStory: 'Luego que el delegado hubo estampado su firma...' }
    ],
    lines: [
      { text: "Luego que el delegado hubo estampado su firma en el documento, sonaron las campanas.", formula: "Luego que el delegado (Subject) + hubo (Verb) + estampado su firma (Object) + en el documento, sonaron las campanas (Place)" },
      { text: "Las tropas en el frente depusieron las armas al recibir la noticia de la paz.", formula: "Las (Verb) + tropas (Object) + en el frente depusieron las armas al recibir la noticia de la paz (Place)" },
      { text: "Se iniciaba así una nueva etapa de reconstrucción y reconciliación nacional.", formula: "Se (Verb) + iniciaba así una nueva etapa de reconstrucción y reconciliación nacional (Object)" }
    ],
    grammar_note: {
      term: "Luego Que + Pretérito Anterior",
      translation: "Luego Que + Pretérito Anterior",
      explanation: "\"Luego que\" (after / as soon as) with pretérito anterior in solemn historical prose.",
      example: "Luego que el delegado hubo estampado su firma..."
    },
    mascot_asset_id: 'yuki-chibi'
  }
];

