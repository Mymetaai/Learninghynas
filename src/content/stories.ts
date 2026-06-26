// Database of 50 progressive Spanish stories from Nursery to Expert (C1) level.
// Each story contains translation, dynamic vocabulary terms, and detailed grammar notes.

export interface StoryVocab {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface StoryGrammarNote {
  title: string;
  explanation: string;
  exampleFromStory: string;
}

export interface LibraryStory {
  id: string;
  title: string;
  level: 'Nursery' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  levelLabel: string;
  description: string;
  storyLines: string[];
  storyTranslations: string[]; // Parallel English translations
  vocabulary: StoryVocab[];
  grammarNotes: StoryGrammarNote[];
}

export const LIBRARY_STORIES: LibraryStory[] = [
  // ── NURSERY LEVEL (Pre-A1) ──
  {
    id: 's1',
    title: 'El Perro Alegre',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'A simple story about a happy dog playing in the park.',
    storyLines: [
      'Tengo un perro pequeño.',
      'El perro corre mucho en el parque.',
      'Es muy alegre y juega con una pelota.'
    ],
    storyTranslations: [
      'I have a small dog.',
      'The dog runs a lot in the park.',
      'It is very happy and plays with a ball.'
    ],
    vocabulary: [
      { word: 'perro', meaning: 'dog', pronunciation: 'PEH-rroh' },
      { word: 'corre', meaning: 'runs', pronunciation: 'KOH-rreh' },
      { word: 'pelota', meaning: 'ball', pronunciation: 'peh-LOH-tah' }
    ],
    grammarNotes: [
      { title: 'Tengo (I have)', explanation: 'The first-person singular of the verb "tener" (to have).', exampleFromStory: 'Tengo un perro pequeño.' }
    ]
  },
  {
    id: 's2',
    title: 'La Manzana Roja',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'Enjoying a sweet, fresh red apple in the morning.',
    storyLines: [
      'La manzana es roja.',
      'Es una fruta muy dulce y fresca.',
      'Me gusta comer manzanas por la mañana.'
    ],
    storyTranslations: [
      'The apple is red.',
      'It is a very sweet and fresh fruit.',
      'I like to eat apples in the morning.'
    ],
    vocabulary: [
      { word: 'manzana', meaning: 'apple', pronunciation: 'mahn-THAH-nah' },
      { word: 'dulce', meaning: 'sweet', pronunciation: 'DOOL-theh' },
      { word: 'mañana', meaning: 'morning', pronunciation: 'mah-NYAH-nah' }
    ],
    grammarNotes: [
      { title: 'Noun-Adjective Agreement', explanation: 'Adjectives in Spanish must match the gender of the noun. "Manzana" is feminine, so it is "roja" (not rojo).', exampleFromStory: 'La manzana es roja.' }
    ]
  },
  {
    id: 's3',
    title: 'El Gato Dormilón',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'A sleepy cat that loves to sleep under the warm sun.',
    storyLines: [
      'El gato duerme bajo el sol.',
      'El sol está caliente hoy.',
      'El gato abre un ojo y sonríe.'
    ],
    storyTranslations: [
      'The cat sleeps under the sun.',
      'The sun is hot today.',
      'The cat opens one eye and smiles.'
    ],
    vocabulary: [
      { word: 'gato', meaning: 'cat', pronunciation: 'GAH-toh' },
      { word: 'sol', meaning: 'sun', pronunciation: 'sol' },
      { word: 'ojo', meaning: 'eye', pronunciation: 'OH-hoh' }
    ],
    grammarNotes: [
      { title: 'Bajo (Under)', explanation: 'Preposition indicating position beneath something.', exampleFromStory: 'El gato duerme bajo el sol.' }
    ]
  },
  {
    id: 's4',
    title: 'El Pájaro Azul',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'A blue bird singing a beautiful song in a green tree.',
    storyLines: [
      'Un pájaro azul canta.',
      'Canta en un árbol grande y verde.',
      'El canto es muy bonito.'
    ],
    storyTranslations: [
      'A blue bird sings.',
      'It sings in a big, green tree.',
      'The song is very pretty.'
    ],
    vocabulary: [
      { word: 'pájaro', meaning: 'bird', pronunciation: 'PAH-hah-roh' },
      { word: 'árbol', meaning: 'tree', pronunciation: 'AR-bohl' },
      { word: 'verde', meaning: 'green', pronunciation: 'BEHR-deh' }
    ],
    grammarNotes: [
      { title: 'Azul (Blue)', explanation: 'Adjectives usually follow nouns in Spanish.', exampleFromStory: 'Un pájaro azul canta.' }
    ]
  },
  {
    id: 's5',
    title: 'La Mariposa Bonita',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'A beautiful butterfly flying over yellow flowers.',
    storyLines: [
      'La mariposa vuela alto.',
      'Vuela sobre las flores amarillas.',
      'Tiene alas de muchos colores.'
    ],
    storyTranslations: [
      'The butterfly flies high.',
      'It flies over the yellow flowers.',
      'It has wings of many colors.'
    ],
    vocabulary: [
      { word: 'mariposa', meaning: 'butterfly', pronunciation: 'mah-ree-POH-sah' },
      { word: 'vuela', meaning: 'flies', pronunciation: 'BWEH-lah' },
      { word: 'flores', meaning: 'flowers', pronunciation: 'FLOH-rehs' }
    ],
    grammarNotes: [
      { title: 'Sobre (Over/On)', explanation: 'Preposition indicating location above or on top of something.', exampleFromStory: 'Vuela sobre las flores amarillas.' }
    ]
  },
  {
    id: 's6',
    title: 'Mi Casa Grande',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'Describing a big house with a white door and green garden.',
    storyLines: [
      'Esta es mi casa.',
      'Tiene una puerta blanca y ventanas.',
      'El jardín de la casa es verde.'
    ],
    storyTranslations: [
      'This is my house.',
      'It has a white door and windows.',
      'The garden of the house is green.'
    ],
    vocabulary: [
      { word: 'casa', meaning: 'house', pronunciation: 'KAH-sah' },
      { word: 'puerta', meaning: 'door', pronunciation: 'PWER-tah' },
      { word: 'jardín', meaning: 'garden', pronunciation: 'har-DEEN' }
    ],
    grammarNotes: [
      { title: 'Esta (This)', explanation: 'Feminine demonstrative pronoun representing something close to the speaker.', exampleFromStory: 'Esta es mi casa.' }
    ]
  },
  {
    id: 's7',
    title: 'El Pez Pequeño',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'A small fish swimming quickly in the blue water.',
    storyLines: [
      'Un pez nada en el río.',
      'El agua es fría y azul.',
      'El pez nada muy rápido.'
    ],
    storyTranslations: [
      'A fish swims in the river.',
      'The water is cold and blue.',
      'The fish swims very quickly.'
    ],
    vocabulary: [
      { word: 'pez', meaning: 'fish', pronunciation: 'peth' },
      { word: 'agua', meaning: 'water', pronunciation: 'AH-gwah' },
      { word: 'rápido', meaning: 'quickly', pronunciation: 'RAH-pee-doh' }
    ],
    grammarNotes: [
      { title: 'Muy (Very)', explanation: 'Adverb used to intensify adjectives or other adverbs.', exampleFromStory: 'El pez nada muy rápido.' }
    ]
  },
  {
    id: 's8',
    title: 'La Luna Blanca',
    level: 'Nursery',
    levelLabel: 'Pre-A1 / Nursery',
    description: 'The white moon shining brightly in the dark night.',
    storyLines: [
      'La luna brilla en la noche.',
      'La noche está oscura y silenciosa.',
      'La luna es blanca como la nieve.'
    ],
    storyTranslations: [
      'The moon shines in the night.',
      'The night is dark and silent.',
      'The moon is white like snow.'
    ],
    vocabulary: [
      { word: 'luna', meaning: 'moon', pronunciation: 'LOO-nah' },
      { word: 'noche', meaning: 'night', pronunciation: 'NOH-cheh' },
      { word: 'blanca', meaning: 'white', pronunciation: 'BLAHN-kah' }
    ],
    grammarNotes: [
      { title: 'Como (Like/As)', explanation: 'Used to make comparisons between two things.', exampleFromStory: 'La luna es blanca como la nieve.' }
    ]
  },

  // ── A1 LEVEL ──
  {
    id: 's9',
    title: 'Una Taza de Café',
    level: 'A1',
    levelLabel: 'A1 / Básico',
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
    ]
  },
  {
    id: 's10',
    title: 'El Desayuno con Amigos',
    level: 'A1',
    levelLabel: 'A1 / Básico',
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
    id: 's11',
    title: 'El Supermercado',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'Buying fresh fruit and milk at the neighborhood store.',
    storyLines: [
      'Voy al supermercado por la tarde.',
      'Necesito comprar naranjas, plátanos y leche.',
      'Pago diez euros en la caja.'
    ],
    storyTranslations: [
      'I go to the supermarket in the afternoon.',
      'I need to buy oranges, bananas, and milk.',
      'I pay ten euros at the register.'
    ],
    vocabulary: [
      { word: 'tarde', meaning: 'afternoon', pronunciation: 'TAR-deh' },
      { word: 'naranjas', meaning: 'oranges', pronunciation: 'nah-RAHN-hahs' },
      { word: 'euros', meaning: 'euros', pronunciation: 'EW-rohs' }
    ],
    grammarNotes: [
      { title: 'Voy al (I go to the)', explanation: 'Contraction of "a" + "el" (to the) combined with the verb "ir" (to go).', exampleFromStory: 'Voy al supermercado por la tarde.' }
    ]
  },
  {
    id: 's12',
    title: 'La Clase de Español',
    level: 'A1',
    levelLabel: 'A1 / Básico',
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
    ]
  },
  {
    id: 's13',
    title: '¿Qué Hora Es?',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'Asking for the time to make sure you are not late for the train.',
    storyLines: [
      'Perdone, señor, ¿tiene hora?',
      'Sí, son las diez y media de la mañana.',
      '¡Gracias! Mi tren sale a las once menos cuarto.'
    ],
    storyTranslations: [
      'Excuse me, sir, do you have the time?',
      'Yes, it is half past ten in the morning.',
      'Thank you! My train leaves at quarter to eleven.'
    ],
    vocabulary: [
      { word: 'perdone', meaning: 'excuse me', pronunciation: 'pehr-DOH-neh' },
      { word: 'tren', meaning: 'train', pronunciation: 'trehn' },
      { word: 'once', meaning: 'eleven', pronunciation: 'OHN-theh' }
    ],
    grammarNotes: [
      { title: 'Telling Time', explanation: '"Diez y media" means half past ten. "Once menos cuarto" means quarter to eleven.', exampleFromStory: 'Son las diez y media de la mañana.' }
    ]
  },
  {
    id: 's14',
    title: 'El Fin de Semana',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'A relaxing weekend plans including cinema and dining.',
    storyLines: [
      'El sábado voy al cine con mi familia.',
      'Vemos una película divertida y comemos palomitas.',
      'El domingo descansamos en casa.'
    ],
    storyTranslations: [
      'On Saturday I go to the cinema with my family.',
      'We watch a funny movie and eat popcorn.',
      'On Sunday we rest at home.'
    ],
    vocabulary: [
      { word: 'sábado', meaning: 'Saturday', pronunciation: 'SAH-bah-doh' },
      { word: 'cine', meaning: 'cinema', pronunciation: 'THEE-neh' },
      { word: 'domingo', meaning: 'Sunday', pronunciation: 'doh-MEEN-goh' }
    ],
    grammarNotes: [
      { title: 'Days of the Week', explanation: 'Days of the week are masculine in Spanish and do not require capitalization.', exampleFromStory: 'El sábado voy al cine...' }
    ]
  },
  {
    id: 's15',
    title: 'Un Regalo Especial',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'Buying a birthday book gift for a close friend.',
    storyLines: [
      'Es el cumpleaños de mi mejor amigo.',
      'Compro un libro de aventuras para él.',
      'Escribo una carta bonita con mis deseos.'
    ],
    storyTranslations: [
      'It is my best friend\'s birthday.',
      'I buy an adventure book for him.',
      'I write a pretty letter with my wishes.'
    ],
    vocabulary: [
      { word: 'cumpleaños', meaning: 'birthday', pronunciation: 'koom-pleh-AH-nyohs' },
      { word: 'libro', meaning: 'book', pronunciation: 'LEE-broh' },
      { word: 'deseos', meaning: 'wishes', pronunciation: 'deh-SEH-ohs' }
    ],
    grammarNotes: [
      { title: 'Para (For)', explanation: 'Preposition indicating recipient, purpose, or destination.', exampleFromStory: 'Compro un libro de aventuras para él.' }
    ]
  },
  {
    id: 's16',
    title: 'La Ropa Nueva',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'Shopping for a warm jacket for the cold winter weather.',
    storyLines: [
      'El invierno está muy frío este año.',
      'Necesito comprar una chaqueta de lana.',
      'Busco una chaqueta azul en la tienda.'
    ],
    storyTranslations: [
      'The winter is very cold this year.',
      'I need to buy a wool jacket.',
      'I look for a blue jacket in the shop.'
    ],
    vocabulary: [
      { word: 'invierno', meaning: 'winter', pronunciation: 'een-BYEHR-noh' },
      { word: 'chaqueta', meaning: 'jacket', pronunciation: 'chah-KEH-tah' },
      { word: 'tienda', meaning: 'store', pronunciation: 'TYEHN-dah' }
    ],
    grammarNotes: [
      { title: 'Este (This)', explanation: 'Masculine singular demonstrative adjective.', exampleFromStory: 'El invierno está muy frío este año.' }
    ]
  },
  {
    id: 's17',
    title: 'En la Estación',
    level: 'A1',
    levelLabel: 'A1 / Básico',
    description: 'Buying a travel ticket at the train station counter.',
    storyLines: [
      'Quiero un billete para Madrid, por favor.',
      '¿De ida y vuelta, o sólo ida?',
      'De ida y vuelta. ¿Cuánto cuesta?'
    ],
    storyTranslations: [
      'I want a ticket to Madrid, please.',
      'Round trip, or one way?',
      'Round trip. How much does it cost?'
    ],
    vocabulary: [
      { word: 'billete', meaning: 'ticket', pronunciation: 'bee-LYEH-teh' },
      { word: 'vuelta', meaning: 'return', pronunciation: 'BWEL-tah' },
      { word: 'cuesta', meaning: 'costs', pronunciation: 'KWEHS-tah' }
    ],
    grammarNotes: [
      { title: 'Ida y Vuelta (Round Trip)', explanation: 'Common idiom meaning go and return.', exampleFromStory: '¿De ida y vuelta, o sólo ida?' }
    ]
  },

  // ── A2 LEVEL ──
  {
    id: 's18',
    title: 'Llegada al Hotel',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Checking in at a hotel desk and asking for room keys.',
    storyLines: [
      'Hola, buenas tardes. Tengo una reserva a nombre de Juan Gómez.',
      'Bienvenido. Sí, aquí está. Habitación doscientos cuatro, con vistas al mar.',
      'Perfecto. ¿A qué hora se sirve el desayuno mañana por la mañana?'
    ],
    storyTranslations: [
      'Hello, good afternoon. I have a reservation under the name of Juan Gomez.',
      'Welcome. Yes, here it is. Room two hundred and four, with sea views.',
      'Perfect. What time is breakfast served tomorrow morning?'
    ],
    vocabulary: [
      { word: 'reserva', meaning: 'reservation', pronunciation: 'reh-SEHR-bah' },
      { word: 'habitación', meaning: 'room', pronunciation: 'ah-bee-tah-THYOHN' },
      { word: 'vistas', meaning: 'views', pronunciation: 'BEES-tahs' }
    ],
    grammarNotes: [
      { title: 'A nombre de (Under the name of)', explanation: 'Prepositional phrase indicating possession or reservation registry.', exampleFromStory: 'Tengo una reserva a nombre de Juan Gómez.' }
    ]
  },
  {
    id: 's19',
    title: 'Buscando la Estación',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Asking a passerby for directions to the nearby subway station.',
    storyLines: [
      'Disculpe, ¿sabe dónde está la estación de metro más cercana?',
      'Sí, siga recto por esta calle y gire a la izquierda en la esquina.',
      'Está al lado del banco grande de color gris.'
    ],
    storyTranslations: [
      'Excuse me, do you know where the nearest metro station is?',
      'Yes, go straight along this street and turn left at the corner.',
      'It is next to the large gray bank.'
    ],
    vocabulary: [
      { word: 'estación', meaning: 'station', pronunciation: 'ehs-tah-THYOHN' },
      { word: 'recto', meaning: 'straight ahead', pronunciation: 'REK-toh' },
      { word: 'esquina', meaning: 'corner', pronunciation: 'ehs-KEE-nah' }
    ],
    grammarNotes: [
      { title: 'Formal Imperative (Siga, Gire)', explanation: 'Used to give polite directions in Spanish (Usted form).', exampleFromStory: 'Siga recto y gire a la izquierda...' }
    ]
  },
  {
    id: 's20',
    title: 'El Taxi a Madrid',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Hailing a taxi cab to the airport and discussing the traffic.',
    storyLines: [
      'Lléveme al aeropuerto de Barajas, por favor.',
      'Claro. Hay un poco de tráfico hoy por las obras en la autovía.',
      'No hay prisa, mi vuelo sale en tres horas.'
    ],
    storyTranslations: [
      'Take me to Barajas airport, please.',
      'Sure. There is a bit of traffic today due to construction on the highway.',
      'There is no rush, my flight leaves in three hours.'
    ],
    vocabulary: [
      { word: 'aeropuerto', meaning: 'airport', pronunciation: 'ah-eh-roh-PWER-toh' },
      { word: 'tráfico', meaning: 'traffic', pronunciation: 'TRAH-fee-koh' },
      { word: 'vuelo', meaning: 'flight', pronunciation: 'BWEL-oh' }
    ],
    grammarNotes: [
      { title: 'Pronoun Attachment (Lléveme)', explanation: 'Object pronouns attach directly to the end of affirmative imperative verbs.', exampleFromStory: 'Lléveme al aeropuerto...' }
    ]
  },
  {
    id: 's21',
    title: 'Una Cena en Barcelona',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Ordering traditional tapas and wine in Barcelona.',
    storyLines: [
      'Para cenar, queremos una ración de patatas bravas y calamares.',
      '¿Para beber? Les recomiendo el vino tinto de la casa.',
      'Muy bien, traiga una botella de vino y agua mineral.'
    ],
    storyTranslations: [
      'For dinner, we want a portion of patatas bravas and squid.',
      'To drink? I recommend the house red wine.',
      'Very well, bring a bottle of wine and mineral water.'
    ],
    vocabulary: [
      { word: 'ración', meaning: 'portion/plate', pronunciation: 'rah-THYOHN' },
      { word: 'vino', meaning: 'wine', pronunciation: 'BEE-noh' },
      { word: 'botella', meaning: 'bottle', pronunciation: 'boh-TEH-lyah' }
    ],
    grammarNotes: [
      { title: 'Queremos (We want)', explanation: 'First-person plural of "querer" (to want).', exampleFromStory: 'Queremos una ración de patatas...' }
    ]
  },
  {
    id: 's22',
    title: 'La Maleta Perdida',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Reporting a lost luggage suitcase at the airport counter.',
    storyLines: [
      'Mi maleta no ha salido en la cinta de equipaje.',
      '¿De qué color y tamaño es, señora?',
      'Es una maleta grande, de color negro y tiene una cinta roja.'
    ],
    storyTranslations: [
      'My suitcase has not come out on the baggage belt.',
      'What color and size is it, ma\'am?',
      'It is a large black suitcase and it has a red ribbon.'
    ],
    vocabulary: [
      { word: 'maleta', meaning: 'suitcase', pronunciation: 'mah-LEH-tah' },
      { word: 'equipaje', meaning: 'luggage', pronunciation: 'eh-kee-PAH-heh' },
      { word: 'tamaño', meaning: 'size', pronunciation: 'tah-MAH-nyoh' }
    ],
    grammarNotes: [
      { title: 'Present Perfect (No ha salido)', explanation: 'Used to talk about recent actions connected to the present.', exampleFromStory: 'Mi maleta no ha salido...' }
    ]
  },
  {
    id: 's23',
    title: 'El Mapa Turístico',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'A traveler planning a route through old town landmarks.',
    storyLines: [
      'Tengo el mapa de la ciudad en la mano.',
      'Quiero visitar la catedral antigua y el palacio real.',
      'El camino parece fácil pero hay muchas cuestas.'
    ],
    storyTranslations: [
      'I have the city map in my hand.',
      'I want to visit the ancient cathedral and the royal palace.',
      'The path seems easy but there are many slopes.'
    ],
    vocabulary: [
      { word: 'catedral', meaning: 'cathedral', pronunciation: 'kah-teh-DRAL' },
      { word: 'palacio', meaning: 'palace', pronunciation: 'pah-LAH-thyoh' },
      { word: 'cuestas', meaning: 'slopes/hills', pronunciation: 'KWEHS-tahs' }
    ],
    grammarNotes: [
      { title: 'Parece (Seems)', explanation: 'From verb "parecer" (to seem/look like).', exampleFromStory: 'El camino parece fácil...' }
    ]
  },
  {
    id: 's24',
    title: 'La Llave Perdida',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Searching the pockets and bag for a missing room key.',
    storyLines: [
      'No encuentro la llave de mi habitación.',
      '¿La buscaste en el bolso o en los bolsillos?',
      'Sí, busqué en todas partes y no está. La perdí.'
    ],
    storyTranslations: [
      'I can\'t find my room key.',
      'Did you look for it in your bag or in your pockets?',
      'Yes, I looked everywhere and it is not there. I lost it.'
    ],
    vocabulary: [
      { word: 'llave', meaning: 'key', pronunciation: 'LYAH-beh' },
      { word: 'bolso', meaning: 'bag/purse', pronunciation: 'BOL-soh' },
      { word: 'bolsillos', meaning: 'pockets', pronunciation: 'bol-SEE-lyohs' }
    ],
    grammarNotes: [
      { title: 'Preterite Tense (Busqué, Perdí)', explanation: 'Used to describe completed actions in the past.', exampleFromStory: 'La busqué y no está. La perdí.' }
    ]
  },
  {
    id: 's25',
    title: 'Comprando Recuerdos',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Buying local postcards and souvenirs at a market stand.',
    storyLines: [
      'Quiero comprar recuerdos para mi familia.',
      'Esta tienda vende postales y figuras de cerámica hermosas.',
      'Compro tres postales y una taza decorada.'
    ],
    storyTranslations: [
      'I want to buy souvenirs for my family.',
      'This shop sells beautiful postcards and ceramic figures.',
      'I buy three postcards and a decorated mug.'
    ],
    vocabulary: [
      { word: 'recuerdos', meaning: 'souvenirs/memories', pronunciation: 'reh-KWER-dohs' },
      { word: 'postales', meaning: 'postcards', pronunciation: 'pohs-TAH-lehs' },
      { word: 'cerámica', meaning: 'ceramics', pronunciation: 'theh-RAH-mee-kah' }
    ],
    grammarNotes: [
      { title: 'Demonstrative Adjectives (Esta)', explanation: 'Modifies feminine nouns close to the speaker.', exampleFromStory: 'Esta tienda vende...' }
    ]
  },
  {
    id: 's26',
    title: 'El Clima en España',
    level: 'A2',
    levelLabel: 'A2 / Viajero',
    description: 'Checking the weather forecast to plan a trip pack list.',
    storyLines: [
      '¿Qué tiempo hace en el norte de España ahora?',
      'Está lloviendo bastante y las temperaturas son bajas.',
      'Debo llevar paraguas y un buen abrigo para mi viaje.'
    ],
    storyTranslations: [
      'What is the weather like in the north of Spain now?',
      'It is raining quite a bit and temperatures are low.',
      'I must bring an umbrella and a good coat for my trip.'
    ],
    vocabulary: [
      { word: 'paraguas', meaning: 'umbrella', pronunciation: 'pah-RAH-gwahs' },
      { word: 'abrigo', meaning: 'coat', pronunciation: 'ah-BREE-goh' },
      { word: 'viaje', meaning: 'trip', pronunciation: 'BYAH-heh' }
    ],
    grammarNotes: [
      { title: 'Weather Expressions (Hace)', explanation: 'Using the verb "hacer" to describe weather conditions.', exampleFromStory: '¿Qué tiempo hace?' }
    ]
  },

  // ── B1 LEVEL ──
  {
    id: 's27',
    title: 'Mi Sueño de Viajar',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Discussing personal dreams of exploring Latin American ruins.',
    storyLines: [
      'Si tuviera suficiente tiempo, viajaría por toda América Latina.',
      'Me encantaría explorar las antiguas ruinas mayas y aprender sus mitos.',
      'Creo que viajar nos ayuda a comprender mejor el mundo y a nosotros mismos.'
    ],
    storyTranslations: [
      'If I had enough time, I would travel all over Latin America.',
      'I would love to explore the ancient Mayan ruins and learn their myths.',
      'I believe traveling helps us better understand the world and ourselves.'
    ],
    vocabulary: [
      { word: 'suficiente', meaning: 'enough', pronunciation: 'soo-fee-THYEHN-teh' },
      { word: 'ruinas', meaning: 'ruins', pronunciation: 'RWEH-nahs' },
      { word: 'comprender', meaning: 'to understand', pronunciation: 'kom-prehn-DEHR' }
    ],
    grammarNotes: [
      { title: 'Imperfect Subjunctive + Conditional', explanation: 'Used to express hypothetical situations ("Si tuviera... viajaría...").', exampleFromStory: 'Si tuviera tiempo, viajaría...' }
    ]
  },
  {
    id: 's28',
    title: 'El Recuerdo de la Infancia',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Nostalgic storytelling about spending summer holidays in a small village.',
    storyLines: [
      'Cuando era niño, solía pasar las vacaciones en el pueblo de mis abuelos.',
      'Recuerdo el olor a pan recién hecho y los paseos por los campos.',
      'Esos momentos simples eran los que me hacían verdaderamente feliz.'
    ],
    storyTranslations: [
      'When I was a child, I used to spend vacations in my grandparents\' town.',
      'I remember the smell of freshly made bread and walks through the fields.',
      'Those simple moments were what made me truly happy.'
    ],
    vocabulary: [
      { word: 'solía', meaning: 'used to', pronunciation: 'soh-LEE-ah' },
      { word: 'vacaciones', meaning: 'holidays', pronunciation: 'bah-kah-THYOH-nehs' },
      { word: 'olor', meaning: 'smell', pronunciation: 'oh-LOHR' }
    ],
    grammarNotes: [
      { title: 'Imperfect Tense (solía, eran, hacían)', explanation: 'Used to describe habitual actions or states in the past.', exampleFromStory: 'Solía pasar las vacaciones... eran los que...' }
    ]
  },
  {
    id: 's29',
    title: 'Una Carta a un Amigo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Writing to a friend about adapting to a new city life.',
    storyLines: [
      'Espero que te encuentres bien de salud.',
      'Te escribo para contarte que por fin me he adaptado a esta nueva ciudad.',
      'Aunque al principio fue difícil, ahora disfruto de mi rutina diaria.'
    ],
    storyTranslations: [
      'I hope you are in good health.',
      'I am writing to tell you that I have finally adapted to this new city.',
      'Although it was difficult at first, now I enjoy my daily routine.'
    ],
    vocabulary: [
      { word: 'salud', meaning: 'health', pronunciation: 'sah-LOOD' },
      { word: 'adaptado', meaning: 'adapted', pronunciation: 'ah-dahp-TAH-doh' },
      { word: 'principio', meaning: 'beginning', pronunciation: 'preen-THEE-pyoh' }
    ],
    grammarNotes: [
      { title: 'Subjunctive after Hope Expressions', explanation: 'Verbs expressing wishes or hopes (e.g. "Espero que") require the subjunctive mood.', exampleFromStory: 'Espero que te encuentres bien...' }
    ]
  },
  {
    id: 's30',
    title: 'La Primera Caminata',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Going on a mountain trek and feeling the satisfaction of reaching the summit.',
    storyLines: [
      'Decidimos subir la montaña a pesar de las malas condiciones climáticas.',
      'A mitad de camino, nos sentimos cansados pero seguimos adelante.',
      'Llegar a la cima nos dio una enorme sensación de logro.'
    ],
    storyTranslations: [
      'We decided to climb the mountain despite the bad weather conditions.',
      'Halfway there, we felt tired but we kept going forward.',
      'Reaching the summit gave us a huge sense of achievement.'
    ],
    vocabulary: [
      { word: 'caminata', meaning: 'hike/trek', pronunciation: 'kah-mee-NAH-tah' },
      { word: 'cima', meaning: 'summit/peak', pronunciation: 'THEE-mah' },
      { word: 'logro', meaning: 'achievement', pronunciation: 'LOH-groh' }
    ],
    grammarNotes: [
      { title: 'A pesar de (In spite of)', explanation: 'Prepositional phrase indicating obstacle concession.', exampleFromStory: 'A pesar de las malas condiciones...' }
    ]
  },
  {
    id: 's31',
    title: 'El Festival del Pueblo',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Describing the colors, dances, and local dishes of a traditional town fair.',
    storyLines: [
      'La semana pasada asistí al festival anual de mi comunidad.',
      'Había bailes folclóricos en la calle principal y platos tradicionales.',
      'Me alegro de que todavía conservemos estas costumbres ancestrales.'
    ],
    storyTranslations: [
      'Last week I attended the annual festival of my community.',
      'There were folk dances on the main street and traditional dishes.',
      'I am glad that we still preserve these ancestral customs.'
    ],
    vocabulary: [
      { word: 'bailes', meaning: 'dances', pronunciation: 'BY-lehs' },
      { word: 'costumbres', meaning: 'customs', pronunciation: 'kohs-TOOM-brehs' },
      { word: 'ancestrales', meaning: 'ancestral', pronunciation: 'ahn-thehs-TRAH-lehs' }
    ],
    grammarNotes: [
      { title: 'Subjunctive of Emotion (Me alegro de que...)', explanation: 'Expressions of emotion followed by "que" trigger the subjunctive mood.', exampleFromStory: 'Me alegro de que todavía conservemos...' }
    ]
  },
  {
    id: 's32',
    title: 'Un Consejo de Salud',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Giving friendly advice on stress relief, hydration, and walking.',
    storyLines: [
      'Para reducir el estrés, te recomiendo caminar al aire libre.',
      'Es importante beber suficiente agua y descansar ocho horas.',
      'No dejes que el trabajo consuma todo tu tiempo libre.'
    ],
    storyTranslations: [
      'To reduce stress, I recommend walking outdoors.',
      'It is important to drink enough water and rest for eight hours.',
      'Do not let work consume all of your free time.'
    ],
    vocabulary: [
      { word: 'estrés', meaning: 'stress', pronunciation: 'ehs-TREHS' },
      { word: 'recomiendo', meaning: 'recommend', pronunciation: 'reh-koh-MYEHN-doh' },
      { word: 'libre', meaning: 'free', pronunciation: 'LEE-breh' }
    ],
    grammarNotes: [
      { title: 'Negative Imperative (No dejes)', explanation: 'Used to give orders or advice telling someone not to do something. Uses present subjunctive forms.', exampleFromStory: 'No dejes que el trabajo...' }
    ]
  },
  {
    id: 's33',
    title: 'La Decisión de Mudarme',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Weighing the pros and cons of moving from a busy city to the countryside.',
    storyLines: [
      'Llevaba meses pensando en mudarme al campo para estar más tranquilo.',
      'Aunque extrañaré la oferta cultural de la ciudad, valoro el aire puro.',
      'Ojalá esta decisión me traiga la paz mental que tanto necesito.'
    ],
    storyTranslations: [
      'I spent months thinking about moving to the countryside to have more quiet.',
      'Although I will miss the cultural offers of the city, I value the pure air.',
      'Hopefully this decision brings me the peace of mind that I need so much.'
    ],
    vocabulary: [
      { word: 'mudarme', meaning: 'to move (residence)', pronunciation: 'moo-DAR-meh' },
      { word: 'campo', meaning: 'countryside', pronunciation: 'KAM-poh' },
      { word: 'paz', meaning: 'peace', pronunciation: 'path' }
    ],
    grammarNotes: [
      { title: 'Ojalá (Hopefully)', explanation: 'Arabic-origin word that always triggers the subjunctive mood ("Ojalá... traiga...").', exampleFromStory: 'Ojalá esta decisión me traiga...' }
    ]
  },
  {
    id: 's34',
    title: 'El Libro de Aventuras',
    level: 'B1',
    levelLabel: 'B1 / Intermedio',
    description: 'Reviewing a novel that transport the reader into ancient civilizations.',
    storyLines: [
      'Ayer terminé de leer una novela fantástica sobre exploradores antiguos.',
      'La trama es tan atrapante que no pude dejar el libro hasta el final.',
      'Nos hace reflexionar sobre la codicia y el misterio del pasado.'
    ],
    storyTranslations: [
      'Yesterday I finished reading a fantastic novel about ancient explorers.',
      'The plot is so gripping that I could not put down the book until the end.',
      'It makes us reflect on greed and the mystery of the past.'
    ],
    vocabulary: [
      { word: 'novela', meaning: 'novel', pronunciation: 'noh-BEH-lah' },
      { word: 'trama', meaning: 'plot', pronunciation: 'TRAH-mah' },
      { word: 'codicia', meaning: 'greed', pronunciation: 'koh-DEE-thyah' }
    ],
    grammarNotes: [
      { title: 'Hasta (Until)', explanation: 'Preposition indicating limit in time, space, or action.', exampleFromStory: 'No pude dejar el libro hasta el final.' }
    ]
  },

  // ── B2 LEVEL ──
  {
    id: 's35',
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
    ]
  },
  {
    id: 's36',
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
    ]
  },
  {
    id: 's37',
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
    ]
  },
  {
    id: 's38',
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
    ]
  },
  {
    id: 's39',
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
    ]
  },
  {
    id: 's40',
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
    ]
  },
  {
    id: 's41',
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
    ]
  },
  {
    id: 's42',
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
    ]
  },

  // ── C1 LEVEL ──
  {
    id: 's43',
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
    ]
  },
  {
    id: 's44',
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
    ]
  },
  {
    id: 's45',
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
    ]
  },
  {
    id: 's46',
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
    ]
  },
  {
    id: 's47',
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
    ]
  },
  {
    id: 's48',
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
    ]
  },
  {
    id: 's49',
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
    ]
  },
  {
    id: 's50',
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
    ]
  }
];
