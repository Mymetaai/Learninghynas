// Dictionary of Spanish-to-English translations for words used in AI Companion dialogues.
// Allows users to tap on any word in the companion letters to see its translation and pronunciation.

export interface DictionaryEntry {
  meaning: string;
  pronunciation: string;
}

export const COMPANION_DICTIONARY: Record<string, DictionaryEntry> = {
  // Greetings & Basics
  hola: { meaning: 'hello', pronunciation: 'OH-lah' },
  viajero: { meaning: 'traveler', pronunciation: 'byah-HEH-roh' },
  carta: { meaning: 'letter', pronunciation: 'KAR-tah' },
  caminante: { meaning: 'walker / traveler', pronunciation: 'kah-mee-NAN-teh' },
  amigo: { meaning: 'friend', pronunciation: 'ah-MEE-goh' },
  amiga: { meaning: 'friend (female)', pronunciation: 'ah-MEE-gah' },
  buenos: { meaning: 'good (plural, masculine)', pronunciation: 'BWEH-nohs' },
  buenas: { meaning: 'good / hello', pronunciation: 'BWEH-nahs' },
  días: { meaning: 'days', pronunciation: 'DEE-ahs' },
  tardes: { meaning: 'afternoons', pronunciation: 'TAR-dehs' },
  cómo: { meaning: 'how', pronunciation: 'KOH-moh' },
  estás: { meaning: 'are you (informal)', pronunciation: 'ehs-TAS' },
  bien: { meaning: 'well / good', pronunciation: 'byehn' },
  gracias: { meaning: 'thank you', pronunciation: 'GRAH-syahs' },
  tú: { meaning: 'you (informal)', pronunciation: 'too' },
  adiós: { meaning: 'goodbye', pronunciation: 'ah-DYOHS' },
  hambriento: { meaning: 'hungry', pronunciation: 'ahm-BRYEHN-toh' },

  // Elena's Vocabulary (Plants, Nature, Mountains)
  montañas: { meaning: 'mountains', pronunciation: 'mon-TAH-nyahs' },
  andes: { meaning: 'Andes (mountain range)', pronunciation: 'AHN-dehs' },
  flor: { meaning: 'flower', pronunciation: 'flor' },
  flores: { meaning: 'flowers', pronunciation: 'FLOH-rehs' },
  roja: { meaning: 'red', pronunciation: 'ROH-hah' },
  rara: { meaning: 'rare', pronunciation: 'RAH-rah' },
  aire: { meaning: 'air', pronunciation: 'EYE-reh' },
  frío: { meaning: 'cold', pronunciation: 'FREE-oh' },
  vista: { meaning: 'view', pronunciation: 'BEES-tah' },
  hermosa: { meaning: 'beautiful', pronunciation: 'ehr-MOH-sah' },
  naturaleza: { meaning: 'nature', pronunciation: 'nah-too-rah-LEH-thah' },
  bosque: { meaning: 'forest', pronunciation: 'BOHS-keh' },
  colibrí: { meaning: 'hummingbird', pronunciation: 'koh-lee-BREE' },
  arroyo: { meaning: 'stream', pronunciation: 'ah-RROH-yoh' },
  animal: { meaning: 'animal', pronunciation: 'ah-nee-MAL' },
  animales: { meaning: 'animals', pronunciation: 'ah-nee-MAH-lehs' },
  pájaros: { meaning: 'birds', pronunciation: 'PAH-hah-rohs' },
  cantarines: { meaning: 'singing / musical', pronunciation: 'kan-tah-REE-nehs' },
  canto: { meaning: 'song / singing', pronunciation: 'KAN-toh' },
  aves: { meaning: 'birds', pronunciation: 'AH-behs' },
  desaparición: { meaning: 'disappearance', pronunciation: 'dehs-ah-pah-ree-THYOHN' },
  zorros: { meaning: 'foxes', pronunciation: 'THOH-rrohs' },
  osos: { meaning: 'bears', pronunciation: 'OH-sohs' },
  montaña: { meaning: 'mountain', pronunciation: 'mon-TAH-nyah' },
  paz: { meaning: 'peace', pronunciation: 'path' },
  casa: { meaning: 'house', pronunciation: 'KAH-sah' },
  plantas: { meaning: 'plants', pronunciation: 'PLAN-tahs' },
  planta: { meaning: 'plant', pronunciation: 'PLAN-tah' },
  medicinales: { meaning: 'medicinal', pronunciation: 'meh-dee-thee-NAH-lehs' },
  infusiones: { meaning: 'infusions / herbal teas', pronunciation: 'een-foo-SYOH-nehs' },
  tés: { meaning: 'teas', pronunciation: 'tehs' },
  té: { meaning: 'tea', pronunciation: 'teh' },
  manzanilla: { meaning: 'chamomile', pronunciation: 'man-thah-NEE-lyah' },
  miel: { meaning: 'honey', pronunciation: 'myel' },
  cactus: { meaning: 'cactus', pronunciation: 'KAK-toos' },
  suculenta: { meaning: 'succulent', pronunciation: 'soo-koo-LEN-tah' },
  ecosistemas: { meaning: 'ecosystems', pronunciation: 'eh-koh-sees-TEH-mahs' },
  fotosíntesis: { meaning: 'photosynthesis', pronunciation: 'foh-toh-SEEN-teh-sees' },
  química: { meaning: 'chemistry', pronunciation: 'KEE-mee-kah' },
  fitoterapia: { meaning: 'phytotherapy / herbal medicine', pronunciation: 'fee-toh-teh-RAH-pyah' },
  biodiversidad: { meaning: 'biodiversity', pronunciation: 'byoh-dee-behr-see-DAD' },
  ecología: { meaning: 'ecology', pronunciation: 'eh-koh-loh-HEE-ah' },
  preservación: { meaning: 'preservation', pronunciation: 'preh-sehr-bah-THYOHN' },

  // Mateo's Vocabulary (Adventure, Cartography, Maps, Jungle)
  trazando: { meaning: 'tracing / drawing', pronunciation: 'trah-THAN-doh' },
  mapa: { meaning: 'map', pronunciation: 'MAH-pah' },
  mapas: { meaning: 'maps', pronunciation: 'MAH-pahs' },
  antiguo: { meaning: 'ancient / old', pronunciation: 'ahn-TEE-gwoh' },
  templo: { meaning: 'temple', pronunciation: 'TEHM-ploh' },
  escondido: { meaning: 'hidden', pronunciation: 'ehs-kon-DEE-doh' },
  selva: { meaning: 'jungle / rainforest', pronunciation: 'SEL-bah' },
  caminos: { meaning: 'paths / roads', pronunciation: 'kah-MEE-nohs' },
  fango: { meaning: 'mud', pronunciation: 'FAN-goh' },
  árboles: { meaning: 'trees', pronunciation: 'AR-boh-lehs' },
  gigantes: { meaning: 'giants', pronunciation: 'hee-GAN-tehs' },
  brújula: { meaning: 'compass', pronunciation: 'BROO-hoo-lah' },
  norte: { meaning: 'north', pronunciation: 'NOR-teh' },
  cascada: { meaning: 'waterfall', pronunciation: 'kahs-KAH-dah' },
  cueva: { meaning: 'cave', pronunciation: 'KWEH-bah' },
  cuevas: { meaning: 'caves', pronunciation: 'KWEH-bahs' },
  senderos: { meaning: 'trails / paths', pronunciation: 'sehn-DEH-rohs' },
  secos: { meaning: 'dry (plural)', pronunciation: 'SEH-kohs' },
  cumbres: { meaning: 'summits / peaks', pronunciation: 'KOOM-brehs' },
  valle: { meaning: 'valley', pronunciation: 'BAH-lyeh' },
  valles: { meaning: 'valleys', pronunciation: 'BAH-lyehs' },
  geodesia: { meaning: 'geodesy', pronunciation: 'heh-oh-DEH-syah' },
  triangulación: { meaning: 'triangulation', pronunciation: 'tryahn-goo-lah-THYOHN' },
  proyecciones: { meaning: 'projections', pronunciation: 'proh-yek-THYOH-nehs' },
  distorsión: { meaning: 'distortion', pronunciation: 'dees-tor-SYOHN' },
  espeleología: { meaning: 'speleology / cave study', pronunciation: 'ehs-peh-leh-oh-loh-HEE-ah' },
  petroglifos: { meaning: 'petroglyphs', pronunciation: 'peh-troh-GLEE-fohs' },
  glifos: { meaning: 'glyphs', pronunciation: 'GLEE-fohs' },
  arqueología: { meaning: 'archaeology', pronunciation: 'ar-keh-oh-loh-HEE-ah' },
  datación: { meaning: 'dating / age determination', pronunciation: 'dah-tah-THYOHN' },
  hipoxia: { meaning: 'hypoxia / oxygen lack', pronunciation: 'ee-POK-syah' },
  refugio: { meaning: 'shelter', pronunciation: 'reh-FOO-hyoh' },
  supervivencia: { meaning: 'survival', pronunciation: 'soo-pehr-bee-BEN-thyah' },
  bioacústica: { meaning: 'bioacoustics', pronunciation: 'byoh-ah-KOOS-tee-kah' },
  peligros: { meaning: 'dangers', pronunciation: 'peh-LEE-grohs' },
  mochila: { meaning: 'backpack', pronunciation: 'moh-CHEE-lah' },

  // Diego's Vocabulary (Baking, Food, Seville, Kitchen)
  horno: { meaning: 'oven', pronunciation: 'OR-noh' },
  piedra: { meaning: 'stone', pronunciation: 'PYEH-drah' },
  hogazas: { meaning: 'loaves', pronunciation: 'oh-GAH-thahs' },
  pan: { meaning: 'bread', pronunciation: 'pan' },
  masa: { meaning: 'dough', pronunciation: 'MAH-sah' },
  madre: { meaning: 'mother (masa madre = sourdough)', pronunciation: 'MAH-dreh' },
  cruasanes: { meaning: 'croissants', pronunciation: 'krwah-SAH-nehs' },
  aceite: { meaning: 'oil', pronunciation: 'ah-THEY-teh' },
  oliva: { meaning: 'olive', pronunciation: 'oh-LEE-bah' },
  tomate: { meaning: 'tomato', pronunciation: 'toh-MAH-teh' },
  desayuno: { meaning: 'breakfast', pronunciation: 'deh-sah-YOO-noh' },
  zumo: { meaning: 'juice', pronunciation: 'THOO-moh' },
  naranja: { meaning: 'orange', pronunciation: 'nah-RAHN-hah' },
  naranjas: { meaning: 'oranges', pronunciation: 'nah-RAHN-hahs' },
  café: { meaning: 'coffee', pronunciation: 'kah-FEH' },
  leche: { meaning: 'milk', pronunciation: 'LEH-cheh' },
  chocolate: { meaning: 'chocolate', pronunciation: 'choh-koh-LAH-teh' },
  frutas: { meaning: 'fruits', pronunciation: 'FROO-tahs' },
  gluten: { meaning: 'gluten', pronunciation: 'GLOO-tehn' },
  harina: { meaning: 'flour', pronunciation: 'ah-REE-nah' },
  fermentación: { meaning: 'fermentation', pronunciation: 'fehr-mehn-tah-THYOHN' },
  trigo: { meaning: 'wheat', pronunciation: 'TREE-goh' },
  cacao: { meaning: 'cacao / cocoa', pronunciation: 'kah-KAH-oh' },
  templado: { meaning: 'tempering / warm', pronunciation: 'tehm-PLAH-doh' },
  historia: { meaning: 'history', pronunciation: 'ees-TOH-ryah' },
  comunidad: { meaning: 'community', pronunciation: 'koh-moo-nee-DAD' },
  dulce: { meaning: 'sweet', pronunciation: 'DOOL-theh' },
  mantequilla: { meaning: 'butter', pronunciation: 'man-teh-KEE-lyah' },
  recetas: { meaning: 'recipes', pronunciation: 'reh-THEH-tahs' },

  // Verbs & Common Helpers
  recibir: { meaning: 'to receive', pronunciation: 'reh-thee-BEER' },
  recibí: { meaning: 'I received', pronunciation: 'reh-thee-BEE' },
  buscando: { meaning: 'searching / looking for', pronunciation: 'boos-KAN-doh' },
  encuentro: { meaning: 'I find', pronunciation: 'ehn-KWEHN-troh' },
  corre: { meaning: 'runs', pronunciation: 'KOH-rreh' },
  duerme: { meaning: 'sleeps', pronunciation: 'DWER-meh' },
  canta: { meaning: 'sings', pronunciation: 'KAN-tah' },
  vuela: { meaning: 'flies', pronunciation: 'BWEH-lah' },
  ayuda: { meaning: 'helps / aid', pronunciation: 'ah-YOO-dah' },
  dormir: { meaning: 'to sleep', pronunciation: 'dor-MEER' },
  curan: { meaning: 'they cure / heal', pronunciation: 'KOO-rahn' },
  bebo: { meaning: 'I drink', pronunciation: 'BEH-boh' },
  tomar: { meaning: 'to drink / to take', pronunciation: 'toh-MAR' },
  preparas: { meaning: 'you prepare', pronunciation: 'preh-PAH-rahs' },
  trazar: { meaning: 'to trace / draw', pronunciation: 'trah-THAR' },
  perderse: { meaning: 'to get lost', pronunciation: 'pehr-DEHR-seh' },
  guiar: { meaning: 'to guide', pronunciation: 'gyahr' },
  aprender: { meaning: 'to learn', pronunciation: 'ah-prehn-DEHR' },
  cocinar: { meaning: 'to cook', pronunciation: 'koh-thee-NAR' },
  hornear: { meaning: 'to bake', pronunciation: 'or-neh-AR' },
  alimentar: { meaning: 'to feed', pronunciation: 'ah-lee-mehn-TAR' },
  proteger: { meaning: 'to protect', pronunciation: 'proh-teh-HEHR' }
};

/**
 * Sanitizes a word by removing common Spanish punctuation marks
 * and converts it to lower case.
 */
export const sanitizeWordForLookup = (word: string): string => {
  return word
    .toLowerCase()
    .replace(/[¿?¡!,\.:;\(\)"']/g, '')
    .trim();
};

/**
 * Looks up a word translation in our curated companion dictionary.
 */
export const lookupCompanionWord = (word: string): DictionaryEntry | null => {
  const clean = sanitizeWordForLookup(word);
  return COMPANION_DICTIONARY[clean] || null;
};
