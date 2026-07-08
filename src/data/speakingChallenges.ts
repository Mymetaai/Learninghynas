// ═══════════════════════════════════════════════════════════════════════════════
// Voice Arena — CEFR Speaking Challenges
// 150 challenges (25 per CEFR level: A1, A2, B1, B2, C1, C2)
// ═══════════════════════════════════════════════════════════════════════════════

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface SpeakingChallenge {
  id: string;
  phrase: string;
  translation: string;
  cefrLevel: CEFRLevel;
  difficultyLabel: string;
  pronunciationTip: string;
  keyFocus: string;
}

export const CEFR_LEVEL_META: Record<CEFRLevel, { label: string; color: string; bgColor: string; borderColor: string }> = {
  A1: { label: 'Principiante', color: '#2E7D32', bgColor: 'rgba(46,125,50,0.12)', borderColor: 'rgba(46,125,50,0.3)' },
  A2: { label: 'Elemental', color: '#1B5E20', bgColor: 'rgba(27,94,32,0.12)', borderColor: 'rgba(27,94,32,0.3)' },
  B1: { label: 'Intermedio', color: '#0277BD', bgColor: 'rgba(2,119,189,0.12)', borderColor: 'rgba(2,119,189,0.3)' },
  B2: { label: 'Intermedio Alto', color: '#1565C0', bgColor: 'rgba(21,101,192,0.12)', borderColor: 'rgba(21,101,192,0.3)' },
  C1: { label: 'Avanzado', color: '#6A1B9A', bgColor: 'rgba(106,27,154,0.12)', borderColor: 'rgba(106,27,154,0.3)' },
  C2: { label: 'Maestría', color: '#4A148C', bgColor: 'rgba(74,20,140,0.12)', borderColor: 'rgba(74,20,140,0.3)' },
};

export const SPEAKING_CHALLENGES: SpeakingChallenge[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // A1 — PRINCIPIANTE (25 challenges: basic greetings, needs, 3-6 words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'a1-01', phrase: '¡Hola! ¿Cómo estás?', translation: 'Hello! How are you?',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "Pronounce 'hola' without the 'h': OH-lah. Roll the 'r' slightly in 'cómo'.",
    keyFocus: '🎯 Basic Greetings'
  },
  {
    id: 'a1-02', phrase: 'Me llamo María.', translation: 'My name is María.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "Double 'll' in 'llamo' is pronounced like 'y' (YAH-moh).",
    keyFocus: '🎯 Introductions'
  },
  {
    id: 'a1-03', phrase: 'Buenos días.', translation: 'Good morning.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Buenos' is pronounced BWEH-nohs. 'Días' is DEE-ahs.",
    keyFocus: '🎯 Greetings'
  },
  {
    id: 'a1-04', phrase: 'Buenas noches.', translation: 'Good night.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Noches' is NOH-chehs. The 'ch' is like English 'ch'.",
    keyFocus: '🎯 Greetings'
  },
  {
    id: 'a1-05', phrase: 'Sí, por favor.', translation: 'Yes, please.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Sí' has a stressed 'i'. 'Favor' sounds like fah-BOHR.",
    keyFocus: '🎯 Polite Phrases'
  },
  {
    id: 'a1-06', phrase: 'No, gracias.', translation: 'No, thank you.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Gracias' is GRAH-syahs. The 'c' before 'i' is like 'th' in Spain or 's' in Latin America.",
    keyFocus: '🎯 Polite Phrases'
  },
  {
    id: 'a1-07', phrase: '¿Cómo te llamas?', translation: 'What is your name?',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Llamas' is YAH-mahs. Stress falls on the first syllable.",
    keyFocus: '🎯 Questions'
  },
  {
    id: 'a1-08', phrase: 'Mucho gusto.', translation: 'Nice to meet you.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Mucho' is MOO-choh. 'Gusto' is GOOS-toh.",
    keyFocus: '🎯 Introductions'
  },
  {
    id: 'a1-09', phrase: 'Tengo hambre.', translation: 'I am hungry.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Tengo' is TEHN-goh. 'Hambre' — the 'h' is silent: AHM-breh.",
    keyFocus: '🎯 Basic Needs'
  },
  {
    id: 'a1-10', phrase: 'Quiero agua.', translation: 'I want water.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Quiero' is KYEH-roh. 'Agua' is AH-gwah.",
    keyFocus: '🎯 Basic Needs'
  },
  {
    id: 'a1-11', phrase: '¿Dónde está el baño?', translation: 'Where is the bathroom?',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Baño' is BAH-nyoh. The 'ñ' is like 'ny' in canyon.",
    keyFocus: '🎯 Essential Questions'
  },
  {
    id: 'a1-12', phrase: 'Adiós, hasta luego.', translation: 'Goodbye, see you later.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Adiós' is ah-DYOHS. 'Luego' is LWEH-goh.",
    keyFocus: '🎯 Farewells'
  },
  {
    id: 'a1-13', phrase: 'Yo soy estudiante.', translation: 'I am a student.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Estudiante' is ehs-too-DYAHN-teh. Stress on the penultimate syllable.",
    keyFocus: '🎯 Self Description'
  },
  {
    id: 'a1-14', phrase: 'La casa es grande.', translation: 'The house is big.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Casa' is KAH-sah. 'Grande' is GRAHN-deh.",
    keyFocus: '🎯 Descriptions'
  },
  {
    id: 'a1-15', phrase: 'El perro es pequeño.', translation: 'The dog is small.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Perro' has a rolled 'rr': PEH-rroh. 'Pequeño' is peh-KEH-nyoh.",
    keyFocus: '🎯 Rolling RR'
  },
  {
    id: 'a1-16', phrase: 'Me gusta el café.', translation: 'I like coffee.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Gusta' is GOOS-tah. 'Café' is kah-FEH, stress on last syllable.",
    keyFocus: '🎯 Preferences'
  },
  {
    id: 'a1-17', phrase: 'Hace mucho calor.', translation: 'It is very hot.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Hace' is AH-seh (silent h). 'Calor' is kah-LOHR.",
    keyFocus: '🎯 Weather'
  },
  {
    id: 'a1-18', phrase: 'La cuenta, por favor.', translation: 'The bill, please.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Cuenta' is KWEHN-tah. The 'v' in 'favor' sounds like a soft 'b'.",
    keyFocus: '🎯 Restaurant'
  },
  {
    id: 'a1-19', phrase: 'Hoy es lunes.', translation: 'Today is Monday.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Hoy' is oy (silent h). 'Lunes' is LOO-nehs.",
    keyFocus: '🎯 Days of Week'
  },
  {
    id: 'a1-20', phrase: 'Tengo veinte años.', translation: 'I am twenty years old.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Veinte' is BAYN-teh. 'Años' is AH-nyohs.",
    keyFocus: '🎯 Numbers & Age'
  },
  {
    id: 'a1-21', phrase: '¿Cuánto cuesta?', translation: 'How much does it cost?',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Cuánto' is KWAHN-toh. 'Cuesta' is KWEHS-tah.",
    keyFocus: '🎯 Shopping'
  },
  {
    id: 'a1-22', phrase: 'Yo vivo en Madrid.', translation: 'I live in Madrid.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Vivo' is BEE-boh (v sounds like b). 'Madrid' — the final 'd' is very soft.",
    keyFocus: '🎯 Location'
  },
  {
    id: 'a1-23', phrase: 'El gato es negro.', translation: 'The cat is black.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Gato' is GAH-toh. 'Negro' is NEH-groh.",
    keyFocus: '🎯 Colors'
  },
  {
    id: 'a1-24', phrase: 'Necesito ayuda.', translation: 'I need help.',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Necesito' is neh-seh-SEE-toh. 'Ayuda' is ah-YOO-dah.",
    keyFocus: '🎯 Essential Phrases'
  },
  {
    id: 'a1-25', phrase: '¡Feliz cumpleaños!', translation: 'Happy birthday!',
    cefrLevel: 'A1', difficultyLabel: 'Principiante',
    pronunciationTip: "'Feliz' is feh-LEETH. 'Cumpleaños' is koom-pleh-AH-nyohs.",
    keyFocus: '🎯 Celebrations'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // A2 — ELEMENTAL (25 challenges: daily life, 6-10 words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'a2-01', phrase: 'Quiero un café con leche, por favor.', translation: 'I want a coffee with milk, please.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Leche' is LEH-cheh. The phrase flows naturally when linked together.",
    keyFocus: '🎯 Ordering Food'
  },
  {
    id: 'a2-02', phrase: '¿Dónde está la estación de tren?', translation: 'Where is the train station?',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Estación' is ehs-tah-SYOHN. Accent the final syllable.",
    keyFocus: '🎯 Asking Directions'
  },
  {
    id: 'a2-03', phrase: 'Mi familia vive en una casa grande.', translation: 'My family lives in a big house.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Familia' is fah-MEE-lyah. 'Vive' is BEE-beh.",
    keyFocus: '🎯 Family Description'
  },
  {
    id: 'a2-04', phrase: 'El hotel está cerca de la playa.', translation: 'The hotel is near the beach.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Cerca' is SEHR-kah. 'Playa' is PLAH-yah.",
    keyFocus: '🎯 Travel Vocabulary'
  },
  {
    id: 'a2-05', phrase: 'Me gusta mucho la música española.', translation: 'I like Spanish music a lot.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Música' is MOO-see-kah. 'Española' is ehs-pah-NYOH-lah.",
    keyFocus: '🎯 Expressing Likes'
  },
  {
    id: 'a2-06', phrase: 'El coche azul corre muy rápido.', translation: 'The blue car runs very fast.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Coche' is KOH-cheh. 'Rápido' is RRAH-pee-doh with a rolled initial R.",
    keyFocus: '🎯 Rolling R'
  },
  {
    id: 'a2-07', phrase: 'Trabajo en una oficina todos los días.', translation: 'I work in an office every day.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Trabajo' is trah-BAH-hoh. 'Oficina' is oh-fee-SEE-nah.",
    keyFocus: '🎯 Daily Routine'
  },
  {
    id: 'a2-08', phrase: '¿Cuál es tu película favorita?', translation: 'What is your favorite movie?',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Cuál' is kwal. 'Película' is peh-LEE-koo-lah.",
    keyFocus: '🎯 Opinions'
  },
  {
    id: 'a2-09', phrase: 'Los niños juegan en el parque.', translation: 'The children play in the park.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Niños' is NEE-nyohs. 'Juegan' is HWEH-gahn.",
    keyFocus: '🎯 Ñ Sound'
  },
  {
    id: 'a2-10', phrase: 'Hace mucho calor hoy en la tarde.', translation: 'It is very hot today in the afternoon.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Tarde' is TAHR-deh. Link 'hoy en' smoothly.",
    keyFocus: '🎯 Weather Description'
  },
  {
    id: 'a2-11', phrase: 'Voy al supermercado a comprar fruta.', translation: 'I go to the supermarket to buy fruit.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Supermercado' is soo-pehr-mehr-KAH-doh. Break it into syllables.",
    keyFocus: '🎯 Shopping'
  },
  {
    id: 'a2-12', phrase: 'Mi hermano tiene dos gatos bonitos.', translation: 'My brother has two pretty cats.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Hermano' is ehr-MAH-noh (silent h). 'Bonitos' is boh-NEE-tohs.",
    keyFocus: '🎯 Family & Pets'
  },
  {
    id: 'a2-13', phrase: 'La primavera trae muchas flores hermosas.', translation: 'Spring brings many beautiful flowers.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Primavera' is pree-mah-BEH-rah. 'Hermosas' is ehr-MOH-sahs.",
    keyFocus: '🎯 Seasons'
  },
  {
    id: 'a2-14', phrase: '¿Aceptan tarjetas de crédito aquí?', translation: 'Do you accept credit cards here?',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Tarjetas' is tahr-HEH-tahs. The 'j' sounds like English 'h'.",
    keyFocus: '🎯 J Sound'
  },
  {
    id: 'a2-15', phrase: 'Estudio español porque me gusta mucho.', translation: 'I study Spanish because I like it a lot.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Estudio' is ehs-TOO-dyoh. 'Porque' is POHR-keh.",
    keyFocus: '🎯 Giving Reasons'
  },
  {
    id: 'a2-16', phrase: 'El restaurante está al lado del cine.', translation: 'The restaurant is next to the cinema.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Restaurante' is rehs-tow-RAHN-teh. 'Cine' is SEE-neh.",
    keyFocus: '🎯 Locations'
  },
  {
    id: 'a2-17', phrase: 'Disculpe, ¿dónde está el baño público?', translation: 'Excuse me, where is the public restroom?',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Disculpe' is dees-KOOL-peh. Stress the second syllable.",
    keyFocus: '🎯 Polite Requests'
  },
  {
    id: 'a2-18', phrase: 'Mañana voy a visitar a mis abuelos.', translation: 'Tomorrow I am going to visit my grandparents.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Abuelos' is ah-BWEH-lohs. 'Visitar' is bee-see-TAHR.",
    keyFocus: '🎯 Future Plans'
  },
  {
    id: 'a2-19', phrase: 'El libro está sobre la mesa.', translation: 'The book is on the table.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Sobre' is SOH-breh. 'Mesa' is MEH-sah.",
    keyFocus: '🎯 Prepositions'
  },
  {
    id: 'a2-20', phrase: 'Siempre desayuno a las ocho de la mañana.', translation: 'I always have breakfast at eight in the morning.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Siempre' is SYEHM-preh. 'Desayuno' is deh-sah-YOO-noh.",
    keyFocus: '🎯 Time Expressions'
  },
  {
    id: 'a2-21', phrase: 'Necesito comprar un billete de autobús.', translation: 'I need to buy a bus ticket.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Billete' is bee-YEH-teh. 'Autobús' is ow-toh-BOOS.",
    keyFocus: '🎯 Transport'
  },
  {
    id: 'a2-22', phrase: 'Mi madre cocina una paella deliciosa.', translation: 'My mother cooks a delicious paella.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Paella' is pah-EH-yah (ll = y sound). 'Deliciosa' is deh-lee-SYOH-sah.",
    keyFocus: '🎯 LL Sound'
  },
  {
    id: 'a2-23', phrase: 'Los domingos vamos al mercado central.', translation: 'On Sundays we go to the central market.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Domingos' is doh-MEEN-gohs. 'Mercado' is mehr-KAH-doh.",
    keyFocus: '🎯 Weekly Routine'
  },
  {
    id: 'a2-24', phrase: 'El gato duerme bajo el sol cálido.', translation: 'The cat sleeps under the warm sun.',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Duerme' is DWEHR-meh. 'Cálido' is KAH-lee-doh.",
    keyFocus: '🎯 Descriptions'
  },
  {
    id: 'a2-25', phrase: '¿Qué planes tienes para el fin de semana?', translation: 'What plans do you have for the weekend?',
    cefrLevel: 'A2', difficultyLabel: 'Elemental',
    pronunciationTip: "'Planes' is PLAH-nehs. 'Semana' is seh-MAH-nah.",
    keyFocus: '🎯 Making Plans'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // B1 — INTERMEDIO (25 challenges: opinions & descriptions, 10-15 words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'b1-01', phrase: 'Me gustaría reservar una mesa para cuatro personas, por favor.', translation: 'I would like to reserve a table for four people, please.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Gustaría' is goos-tah-REE-ah. Practice the conditional ending '-ía'.",
    keyFocus: '🎯 Conditional Tense'
  },
  {
    id: 'b1-02', phrase: 'El museo tiene una colección impresionante de arte moderno.', translation: 'The museum has an impressive collection of modern art.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Colección' is koh-lehk-SYOHN. 'Impresionante' is eem-preh-syoh-NAHN-teh.",
    keyFocus: '🎯 Cultural Vocabulary'
  },
  {
    id: 'b1-03', phrase: 'Prefiero viajar en tren porque es más cómodo.', translation: 'I prefer to travel by train because it is more comfortable.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Prefiero' is preh-FYEH-roh. 'Cómodo' is KOH-moh-doh.",
    keyFocus: '🎯 Expressing Preferences'
  },
  {
    id: 'b1-04', phrase: 'Cuando era niño, jugaba al fútbol todos los días.', translation: 'When I was a child, I used to play soccer every day.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Jugaba' is hoo-GAH-bah. Practice the imperfect tense rhythm.",
    keyFocus: '🎯 Imperfect Tense'
  },
  {
    id: 'b1-05', phrase: 'Creo que el cambio climático es un problema muy grave.', translation: 'I believe that climate change is a very serious problem.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Climático' is klee-MAH-tee-koh. 'Grave' is GRAH-beh.",
    keyFocus: '🎯 Expressing Opinions'
  },
  {
    id: 'b1-06', phrase: 'Me he perdido, ¿puede indicarme cómo llegar al centro?', translation: 'I am lost, can you tell me how to get to the center?',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Indicarme' is een-dee-KAHR-meh. 'Llegar' is yeh-GAHR.",
    keyFocus: '🎯 Asking for Help'
  },
  {
    id: 'b1-07', phrase: 'La práctica constante es la clave para aprender un idioma.', translation: 'Constant practice is the key to learning a language.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Constante' is kohns-TAHN-teh. 'Idioma' is ee-DYOH-mah.",
    keyFocus: '🎯 Abstract Concepts'
  },
  {
    id: 'b1-08', phrase: '¿Puedes recomendarme un buen restaurante por esta zona?', translation: 'Can you recommend a good restaurant around this area?',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Recomendarme' is rreh-koh-mehn-DAHR-meh. Roll the initial 'r'.",
    keyFocus: '🎯 Initial Rolling R'
  },
  {
    id: 'b1-09', phrase: 'El concierto de anoche fue absolutamente increíble.', translation: 'Last night\'s concert was absolutely incredible.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Concierto' is kohn-SYEHR-toh. 'Increíble' is een-kreh-EE-bleh.",
    keyFocus: '🎯 Past Events'
  },
  {
    id: 'b1-10', phrase: 'Necesito ir al médico porque no me siento bien.', translation: 'I need to go to the doctor because I don\'t feel well.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Médico' is MEH-dee-koh. 'Siento' is SYEHN-toh.",
    keyFocus: '🎯 Health Vocabulary'
  },
  {
    id: 'b1-11', phrase: 'Me encanta cocinar platos tradicionales de mi país.', translation: 'I love cooking traditional dishes from my country.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Tradicionales' is trah-dee-syoh-NAH-lehs. Pace yourself through the syllables.",
    keyFocus: '🎯 Hobbies & Culture'
  },
  {
    id: 'b1-12', phrase: 'Estoy buscando un apartamento amueblado en el centro.', translation: 'I am looking for a furnished apartment in the center.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Amueblado' is ah-mweh-BLAH-doh. The 'b' is soft between vowels.",
    keyFocus: '🎯 Housing Vocabulary'
  },
  {
    id: 'b1-13', phrase: 'El problema es que no tenemos suficiente tiempo libre.', translation: 'The problem is that we don\'t have enough free time.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Suficiente' is soo-fee-SYEHN-teh. 'Libre' is LEE-breh.",
    keyFocus: '🎯 Explaining Problems'
  },
  {
    id: 'b1-14', phrase: 'A mi hermana le gusta leer novelas de ciencia ficción.', translation: 'My sister likes to read science fiction novels.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Novelas' is noh-BEH-lahs. 'Ciencia' is SYEHN-syah.",
    keyFocus: '🎯 Talking About Others'
  },
  {
    id: 'b1-15', phrase: 'Es importante hacer ejercicio al menos tres veces por semana.', translation: 'It is important to exercise at least three times a week.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Ejercicio' is eh-hehr-SEE-syoh. 'Semana' is seh-MAH-nah.",
    keyFocus: '🎯 Health Advice'
  },
  {
    id: 'b1-16', phrase: 'Ayer fui al mercado y compré frutas y verduras frescas.', translation: 'Yesterday I went to the market and bought fresh fruits and vegetables.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Verduras' is behr-DOO-rahs. 'Frescas' is FREHS-kahs.",
    keyFocus: '🎯 Past Tense Narration'
  },
  {
    id: 'b1-17', phrase: '¿Podrías hablar más despacio, por favor? No entiendo bien.', translation: 'Could you speak more slowly, please? I don\'t understand well.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Despacio' is dehs-PAH-syoh. 'Podrías' is poh-DREE-ahs.",
    keyFocus: '🎯 Polite Conditional'
  },
  {
    id: 'b1-18', phrase: 'La comida mexicana es una de mis favoritas del mundo.', translation: 'Mexican food is one of my favorites in the world.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Mexicana' is meh-hee-KAH-nah. The 'x' in Mexican Spanish is like 'h'.",
    keyFocus: '🎯 Cultural Topics'
  },
  {
    id: 'b1-19', phrase: 'Estamos planeando un viaje a Barcelona para las vacaciones.', translation: 'We are planning a trip to Barcelona for the holidays.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Planeando' is plah-neh-AHN-doh. 'Vacaciones' is bah-kah-SYOH-nehs.",
    keyFocus: '🎯 Present Progressive'
  },
  {
    id: 'b1-20', phrase: 'Llevo estudiando español desde hace dos años y medio.', translation: 'I have been studying Spanish for two and a half years.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Llevo' is YEH-boh. 'Medio' is MEH-dyoh.",
    keyFocus: '🎯 Duration Expressions'
  },
  {
    id: 'b1-21', phrase: 'Me molesta cuando la gente no recicla la basura correctamente.', translation: 'It bothers me when people don\'t recycle trash correctly.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Recicla' is rreh-SEE-klah. 'Basura' is bah-SOO-rah.",
    keyFocus: '🎯 Expressing Annoyance'
  },
  {
    id: 'b1-22', phrase: 'El transporte público de esta ciudad es bastante eficiente.', translation: 'The public transportation in this city is quite efficient.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Transporte' is trahns-POHR-teh. 'Eficiente' is eh-fee-SYEHN-teh.",
    keyFocus: '🎯 City Life'
  },
  {
    id: 'b1-23', phrase: 'Me encantaría aprender a tocar la guitarra algún día.', translation: 'I would love to learn to play the guitar someday.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Encantaría' is ehn-kahn-tah-REE-ah. 'Guitarra' has a rolled 'rr'.",
    keyFocus: '🎯 Wishes & Dreams'
  },
  {
    id: 'b1-24', phrase: 'Según las noticias, mañana va a llover toda la mañana.', translation: 'According to the news, tomorrow it will rain all morning.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Según' is seh-GOON. 'Llover' is yoh-BEHR.",
    keyFocus: '🎯 Reporting Information'
  },
  {
    id: 'b1-25', phrase: 'Antes de salir de casa, siempre verifico que las ventanas estén cerradas.', translation: 'Before leaving home, I always check that the windows are closed.',
    cefrLevel: 'B1', difficultyLabel: 'Intermedio',
    pronunciationTip: "'Verifico' is beh-ree-FEE-koh. 'Cerradas' is seh-RRAH-dahs.",
    keyFocus: '🎯 Habits & Routines'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // B2 — INTERMEDIO ALTO (25 challenges: arguments & hypotheticals, 12-20 words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'b2-01', phrase: 'Si tuviera más tiempo, viajaría por toda Sudamérica sin pensarlo dos veces.', translation: 'If I had more time, I would travel all over South America without thinking twice.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Tuviera' is too-BYEH-rah. 'Viajaría' is byah-hah-REE-ah. Practice subjunctive flow.",
    keyFocus: '🎯 Subjunctive Mood'
  },
  {
    id: 'b2-02', phrase: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', translation: 'Education is the most powerful weapon you can use to change the world.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Educación' is eh-doo-kah-SYOHN. 'Poderosa' is poh-deh-ROH-sah.",
    keyFocus: '🎯 Persuasive Speech'
  },
  {
    id: 'b2-03', phrase: 'Aunque el examen fue difícil, creo que obtuve una buena calificación.', translation: 'Although the exam was difficult, I believe I got a good grade.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Aunque' is OWN-keh. 'Calificación' is kah-lee-fee-kah-SYOHN.",
    keyFocus: '🎯 Concessive Clauses'
  },
  {
    id: 'b2-04', phrase: 'El éxito requiere no solo talento, sino también esfuerzo constante y disciplina.', translation: 'Success requires not only talent, but also constant effort and discipline.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Éxito' is EK-see-toh. 'Disciplina' is dees-see-PLEE-nah.",
    keyFocus: '🎯 Complex Connectors'
  },
  {
    id: 'b2-05', phrase: 'Deberíamos tomar medidas urgentes para proteger el medio ambiente.', translation: 'We should take urgent measures to protect the environment.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Deberíamos' is deh-beh-REE-ah-mohs. 'Medio ambiente' is MEH-dyoh ahm-BYEHN-teh.",
    keyFocus: '🎯 Modal Verbs'
  },
  {
    id: 'b2-06', phrase: 'A pesar de las dificultades, el equipo logró completar el proyecto a tiempo.', translation: 'Despite the difficulties, the team managed to complete the project on time.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Dificultades' is dee-fee-kool-TAH-dehs. 'Logró' is loh-GROH.",
    keyFocus: '🎯 Narrative Connectors'
  },
  {
    id: 'b2-07', phrase: 'Me sorprendió mucho que decidieran cancelar el evento sin avisar a nadie.', translation: 'It surprised me a lot that they decided to cancel the event without telling anyone.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Decidieran' is deh-see-DYEH-rahn. Practice the subjunctive ending.",
    keyFocus: '🎯 Past Subjunctive'
  },
  {
    id: 'b2-08', phrase: 'La inteligencia artificial está transformando la manera en que vivimos y trabajamos.', translation: 'Artificial intelligence is transforming the way we live and work.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Inteligencia' is een-teh-lee-HEHN-syah. 'Transformando' is trahns-fohr-MAHN-doh.",
    keyFocus: '🎯 Technology Topics'
  },
  {
    id: 'b2-09', phrase: 'No estoy de acuerdo con tu opinión, pero respeto tu punto de vista.', translation: 'I don\'t agree with your opinion, but I respect your point of view.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Acuerdo' is ah-KWEHR-doh. 'Respeto' is rrehs-PEH-toh.",
    keyFocus: '🎯 Debating'
  },
  {
    id: 'b2-10', phrase: 'Hubiera preferido quedarme en casa en vez de salir con este frío.', translation: 'I would have preferred to stay at home instead of going out in this cold.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Hubiera' is oo-BYEH-rah. 'Preferido' is preh-feh-REE-doh.",
    keyFocus: '🎯 Past Conditional'
  },
  {
    id: 'b2-11', phrase: 'Es fundamental que los jóvenes participen activamente en la política de su país.', translation: 'It is essential that young people actively participate in their country\'s politics.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Participen' is pahr-tee-SEE-pehn. 'Activamente' is ahk-tee-bah-MEHN-teh.",
    keyFocus: '🎯 Present Subjunctive'
  },
  {
    id: 'b2-12', phrase: 'Si hubiera sabido que estabas enfermo, te habría visitado en el hospital.', translation: 'If I had known you were sick, I would have visited you at the hospital.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Hubiera sabido' flows as oo-BYEH-rah sah-BEE-doh. Practice the conditional perfect.",
    keyFocus: '🎯 Third Conditional'
  },
  {
    id: 'b2-13', phrase: 'La diversidad cultural enriquece a las sociedades y fomenta la tolerancia mutua.', translation: 'Cultural diversity enriches societies and promotes mutual tolerance.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Enriquece' is ehn-ree-KEH-seh. 'Tolerancia' is toh-leh-RAHN-syah.",
    keyFocus: '🎯 Academic Register'
  },
  {
    id: 'b2-14', phrase: 'Mientras trabajaba en la empresa, aprovechaba cada oportunidad para aprender algo nuevo.', translation: 'While working at the company, I took advantage of every opportunity to learn something new.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Aprovechaba' is ah-proh-beh-CHAH-bah. 'Oportunidad' is oh-pohr-too-nee-DAHD.",
    keyFocus: '🎯 Imperfect Narration'
  },
  {
    id: 'b2-15', phrase: 'Lo más importante no es ganar, sino aprender de cada experiencia que enfrentamos.', translation: 'The most important thing is not to win, but to learn from every experience we face.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Enfrentamos' is ehn-frehn-TAH-mohs. Practice the sino...sino structure.",
    keyFocus: '🎯 Contrast Structures'
  },
  {
    id: 'b2-16', phrase: 'El gobierno anunció nuevas medidas económicas para reducir la tasa de desempleo.', translation: 'The government announced new economic measures to reduce the unemployment rate.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Económicas' is eh-koh-NOH-mee-kahs. 'Desempleo' is deh-sehm-PLEH-oh.",
    keyFocus: '🎯 Political Vocabulary'
  },
  {
    id: 'b2-17', phrase: 'Cuando termines de leer ese libro, me gustaría que me lo prestaras.', translation: 'When you finish reading that book, I would like you to lend it to me.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Termines' is tehr-MEE-nehs. 'Prestaras' is prehs-TAH-rahs.",
    keyFocus: '🎯 Subjunctive After Cuando'
  },
  {
    id: 'b2-18', phrase: 'La película que vimos anoche abordaba temas sociales de forma muy profunda.', translation: 'The movie we watched last night addressed social themes in a very deep way.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Abordaba' is ah-bohr-DAH-bah. 'Profunda' is proh-FOON-dah.",
    keyFocus: '🎯 Film Discussion'
  },
  {
    id: 'b2-19', phrase: 'Cada vez hay más personas que trabajan de forma remota desde diferentes países.', translation: 'There are more and more people who work remotely from different countries.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Remota' is rreh-MOH-tah. 'Diferentes' is dee-feh-REHN-tehs.",
    keyFocus: '🎯 Modern Life Topics'
  },
  {
    id: 'b2-20', phrase: 'Es probable que lleguemos tarde a la reunión si no salimos ahora mismo.', translation: 'It is probable that we will arrive late to the meeting if we don\'t leave right now.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Lleguemos' is yeh-GEH-mohs. 'Reunión' is rreh-oo-NYOHN.",
    keyFocus: '🎯 Probability Expressions'
  },
  {
    id: 'b2-21', phrase: 'La música tiene el poder de conectar a personas de culturas completamente diferentes.', translation: 'Music has the power to connect people from completely different cultures.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Conectar' is koh-nehk-TAHR. 'Completamente' is kohm-pleh-tah-MEHN-teh.",
    keyFocus: '🎯 Abstract Discussion'
  },
  {
    id: 'b2-22', phrase: 'Ojalá pudiera dedicar más horas al estudio sin tener que preocuparme por el trabajo.', translation: 'I wish I could dedicate more hours to studying without having to worry about work.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Ojalá' is oh-hah-LAH. 'Preocuparme' is preh-oh-koo-PAHR-meh.",
    keyFocus: '🎯 Wishes with Ojalá'
  },
  {
    id: 'b2-23', phrase: 'Han pasado muchos años desde la última vez que visité mi pueblo natal.', translation: 'Many years have passed since the last time I visited my hometown.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Visité' is bee-see-TEH. 'Natal' is nah-TAHL.",
    keyFocus: '🎯 Present Perfect'
  },
  {
    id: 'b2-24', phrase: 'Me resulta difícil concentrarme cuando hay mucho ruido a mi alrededor.', translation: 'I find it hard to concentrate when there is a lot of noise around me.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Concentrarme' is kohn-sehn-TRAHR-meh. 'Alrededor' is ahl-rreh-deh-DOHR.",
    keyFocus: '🎯 Reflexive Verbs'
  },
  {
    id: 'b2-25', phrase: 'Por mucho que lo intente, no consigo entender las reglas de la gramática española.', translation: 'No matter how much I try, I can\'t manage to understand the rules of Spanish grammar.',
    cefrLevel: 'B2', difficultyLabel: 'Intermedio Alto',
    pronunciationTip: "'Intente' is een-TEHN-teh. 'Gramática' is grah-MAH-tee-kah.",
    keyFocus: '🎯 Concessive Subjunctive'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // C1 — AVANZADO (25 challenges: nuanced/abstract topics, 15-25 words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c1-01', phrase: 'Es fundamental que la sociedad promueva la igualdad de oportunidades sin importar el origen socioeconómico de cada individuo.', translation: 'It is essential that society promotes equal opportunities regardless of each individual\'s socioeconomic background.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Socioeconómico' is soh-syoh-eh-koh-NOH-mee-koh. Break into syllable groups.",
    keyFocus: '🎯 Social Justice Vocabulary'
  },
  {
    id: 'c1-02', phrase: 'La investigación científica ha demostrado que el bilingüismo mejora significativamente las capacidades cognitivas.', translation: 'Scientific research has shown that bilingualism significantly improves cognitive abilities.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Bilingüismo' is bee-leen-GWEES-moh. The 'ü' with dieresis means the 'u' is pronounced.",
    keyFocus: '🎯 Ü Dieresis Sound'
  },
  {
    id: 'c1-03', phrase: 'Resulta imprescindible que adoptemos estrategias sostenibles para garantizar el futuro de las próximas generaciones.', translation: 'It is essential that we adopt sustainable strategies to guarantee the future of the next generations.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Imprescindible' is eem-prehs-seen-DEE-bleh. 'Sostenibles' is sohs-teh-NEE-blehs.",
    keyFocus: '🎯 Environmental Discourse'
  },
  {
    id: 'c1-04', phrase: 'A medida que avanza la tecnología, surgen nuevos dilemas éticos que debemos abordar como sociedad.', translation: 'As technology advances, new ethical dilemmas arise that we must address as a society.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Dilemas' is dee-LEH-mahs. 'Éticos' is EH-tee-kohs. 'Abordar' is ah-bohr-DAHR.",
    keyFocus: '🎯 Ethics & Technology'
  },
  {
    id: 'c1-05', phrase: 'Habría sido conveniente que nos hubieran informado con antelación sobre los cambios en la normativa vigente.', translation: 'It would have been convenient if they had informed us in advance about the changes in current regulations.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Hubieran' is oo-BYEH-rahn. 'Normativa vigente' is nohr-mah-TEE-bah bee-HEHN-teh.",
    keyFocus: '🎯 Past Perfect Subjunctive'
  },
  {
    id: 'c1-06', phrase: 'El patrimonio cultural inmaterial constituye una herencia invaluable que debemos preservar para la posteridad.', translation: 'Intangible cultural heritage constitutes an invaluable legacy that we must preserve for posterity.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Patrimonio' is pah-tree-MOH-nyoh. 'Posteridad' is pohs-teh-ree-DAHD.",
    keyFocus: '🎯 Cultural Heritage'
  },
  {
    id: 'c1-07', phrase: 'Cabe destacar que las desigualdades estructurales perpetúan ciclos de pobreza difíciles de romper.', translation: 'It is worth noting that structural inequalities perpetuate cycles of poverty that are difficult to break.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Desigualdades' is deh-see-gwahl-DAH-dehs. 'Perpetúan' is pehr-peh-TOO-ahn.",
    keyFocus: '🎯 Academic Discourse'
  },
  {
    id: 'c1-08', phrase: 'La globalización ha traído consigo tanto beneficios innegables como consecuencias imprevistas que merecen análisis.', translation: 'Globalization has brought both undeniable benefits and unforeseen consequences that deserve analysis.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Globalización' is gloh-bah-lee-sah-SYOHN. 'Imprevistas' is eem-preh-BEES-tahs.",
    keyFocus: '🎯 Balanced Arguments'
  },
  {
    id: 'c1-09', phrase: 'Sería deseable que se implementaran políticas públicas más inclusivas y equitativas en todos los niveles.', translation: 'It would be desirable to implement more inclusive and equitable public policies at all levels.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Implementaran' is eem-pleh-mehn-TAH-rahn. 'Equitativas' is eh-kee-tah-TEE-bahs.",
    keyFocus: '🎯 Policy Discussion'
  },
  {
    id: 'c1-10', phrase: 'No cabe duda de que la literatura hispanoamericana ha ejercido una influencia profunda en la narrativa mundial contemporánea.', translation: 'There is no doubt that Latin American literature has exerted a profound influence on contemporary world narrative.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Hispanoamericana' is ees-pah-noh-ah-meh-ree-KAH-nah. Take breaths between clauses.",
    keyFocus: '🎯 Literary Discussion'
  },
  {
    id: 'c1-11', phrase: 'El fenómeno migratorio contemporáneo plantea retos que exigen soluciones multilaterales y cooperación internacional.', translation: 'The contemporary migratory phenomenon poses challenges that require multilateral solutions and international cooperation.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Migratorio' is mee-grah-TOH-ryoh. 'Multilaterales' is mool-tee-lah-teh-RAH-lehs.",
    keyFocus: '🎯 Migration & Politics'
  },
  {
    id: 'c1-12', phrase: 'Desde un punto de vista epistemológico, el conocimiento nunca es completamente objetivo ni libre de sesgos culturales.', translation: 'From an epistemological point of view, knowledge is never completely objective nor free from cultural biases.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Epistemológico' is eh-pees-teh-moh-LOH-hee-koh. Maintain steady pace through long words.",
    keyFocus: '🎯 Philosophical Register'
  },
  {
    id: 'c1-13', phrase: 'La neurociencia ha revelado que el cerebro humano posee una plasticidad extraordinaria a lo largo de toda la vida.', translation: 'Neuroscience has revealed that the human brain possesses extraordinary plasticity throughout life.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Neurociencia' is neh-oo-roh-SYEHN-syah. 'Plasticidad' is plahs-tee-see-DAHD.",
    keyFocus: '🎯 Scientific Vocabulary'
  },
  {
    id: 'c1-14', phrase: 'Convendría analizar detenidamente las implicaciones a largo plazo antes de tomar cualquier decisión precipitada.', translation: 'It would be advisable to carefully analyze the long-term implications before making any hasty decision.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Detenidamente' is deh-teh-nee-dah-MEHN-teh. 'Precipitada' is preh-see-pee-TAH-dah.",
    keyFocus: '🎯 Formal Recommendations'
  },
  {
    id: 'c1-15', phrase: 'A raíz de la pandemia, se hizo evidente la necesidad de fortalecer los sistemas de salud pública a nivel global.', translation: 'As a result of the pandemic, the need to strengthen public health systems at a global level became evident.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Raíz' is rrah-EETH. 'Fortalecer' is fohr-tah-leh-SEHR.",
    keyFocus: '🎯 Health Policy'
  },
  {
    id: 'c1-16', phrase: 'Resulta paradójico que, en la era de la información, la desinformación se propague con tanta facilidad y rapidez.', translation: 'It is paradoxical that, in the information age, misinformation spreads with such ease and speed.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Paradójico' is pah-rah-DOH-hee-koh. 'Desinformación' is dehs-een-fohr-mah-SYOHN.",
    keyFocus: '🎯 Media Criticism'
  },
  {
    id: 'c1-17', phrase: 'Las negociaciones diplomáticas entre ambos países atraviesan un momento particularmente delicado y sensible.', translation: 'The diplomatic negotiations between both countries are going through a particularly delicate and sensitive moment.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Negociaciones' is neh-goh-syah-SYOH-nehs. 'Particularmente' is pahr-tee-koo-lahr-MEHN-teh.",
    keyFocus: '🎯 Diplomatic Language'
  },
  {
    id: 'c1-18', phrase: 'El arte abstracto desafía las convenciones estéticas tradicionales e invita al espectador a buscar su propia interpretación.', translation: 'Abstract art challenges traditional aesthetic conventions and invites the viewer to seek their own interpretation.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Convenciones' is kohn-behn-SYOH-nehs. 'Estéticas' is ehs-TEH-tee-kahs.",
    keyFocus: '🎯 Art Criticism'
  },
  {
    id: 'c1-19', phrase: 'En lo que respecta a la economía circular, todavía queda mucho camino por recorrer para alcanzar los objetivos planteados.', translation: 'Regarding the circular economy, there is still a long way to go to achieve the proposed objectives.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Economía circular' is eh-koh-noh-MEE-ah seer-koo-LAHR. 'Recorrer' is rreh-koh-RREHR.",
    keyFocus: '🎯 Economic Discourse'
  },
  {
    id: 'c1-20', phrase: 'Los avances en biotecnología plantean cuestiones bioéticas sin precedentes que requieren un debate público informado.', translation: 'Advances in biotechnology raise unprecedented bioethical questions that require an informed public debate.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Biotecnología' is byoh-tehk-noh-loh-HEE-ah. 'Bioéticas' is byoh-EH-tee-kahs.",
    keyFocus: '🎯 Bioethics Vocabulary'
  },
  {
    id: 'c1-21', phrase: 'Es menester reconocer que la brecha digital constituye uno de los mayores obstáculos para el desarrollo equitativo.', translation: 'It is necessary to recognize that the digital divide constitutes one of the greatest obstacles to equitable development.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Menester' is meh-nehs-TEHR. 'Obstáculos' is ohbs-TAH-koo-lohs.",
    keyFocus: '🎯 Formal Register'
  },
  {
    id: 'c1-22', phrase: 'La interconexión de las economías globales implica que una crisis en un país puede tener repercusiones a escala mundial.', translation: 'The interconnection of global economies implies that a crisis in one country can have repercussions on a global scale.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Interconexión' is een-tehr-koh-nehk-SYOHN. 'Repercusiones' is rreh-pehr-koo-SYOH-nehs.",
    keyFocus: '🎯 Global Economics'
  },
  {
    id: 'c1-23', phrase: 'Cabría preguntarse si las redes sociales han fortalecido o debilitado los vínculos interpersonales en la sociedad actual.', translation: 'One might wonder whether social networks have strengthened or weakened interpersonal bonds in today\'s society.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Cabría' is kah-BREE-ah. 'Interpersonales' is een-tehr-pehr-soh-NAH-lehs.",
    keyFocus: '🎯 Rhetorical Questions'
  },
  {
    id: 'c1-24', phrase: 'La preservación de los ecosistemas marinos es indispensable para mantener el equilibrio ecológico del planeta entero.', translation: 'The preservation of marine ecosystems is indispensable to maintain the ecological balance of the entire planet.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Ecosistemas' is eh-koh-sees-TEH-mahs. 'Indispensable' is een-dees-pehn-SAH-bleh.",
    keyFocus: '🎯 Environmental Science'
  },
  {
    id: 'c1-25', phrase: 'Sin lugar a dudas, el pensamiento crítico constituye una herramienta imprescindible en la formación integral del ciudadano.', translation: 'Without a doubt, critical thinking constitutes an essential tool in the comprehensive education of citizens.',
    cefrLevel: 'C1', difficultyLabel: 'Avanzado',
    pronunciationTip: "'Herramienta' is eh-rrah-MYEHN-tah. 'Imprescindible' is eem-prehs-seen-DEE-bleh.",
    keyFocus: '🎯 Education Philosophy'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // C2 — MAESTRÍA (25 challenges: literary/academic register, 20-30+ words)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c2-01', phrase: 'La complejidad inherente a las relaciones diplomáticas internacionales exige un enfoque multifacético que contemple aspectos geopolíticos, económicos y culturales simultáneamente.', translation: 'The complexity inherent to international diplomatic relations demands a multifaceted approach that simultaneously considers geopolitical, economic, and cultural aspects.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Multifacético' is mool-tee-fah-SEH-tee-koh. 'Geopolíticos' is heh-oh-poh-LEE-tee-kohs. Breathe between clauses.",
    keyFocus: '🎯 Geopolitical Discourse'
  },
  {
    id: 'c2-02', phrase: 'Sería pretencioso afirmar que hemos logrado comprender plenamente los mecanismos neurológicos subyacentes a la conciencia humana y su relación con la percepción subjetiva.', translation: 'It would be pretentious to claim that we have fully understood the neurological mechanisms underlying human consciousness and its relationship with subjective perception.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Subyacentes' is soob-yah-SEHN-tehs. 'Percepción' is pehr-sehp-SYOHN. Maintain steady rhythm.",
    keyFocus: '🎯 Neuroscience & Philosophy'
  },
  {
    id: 'c2-03', phrase: 'El paradigma epistemológico postmoderno cuestiona la existencia de verdades absolutas y propone una aproximación hermenéutica a la interpretación de los fenómenos sociales.', translation: 'The postmodern epistemological paradigm questions the existence of absolute truths and proposes a hermeneutic approach to the interpretation of social phenomena.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Epistemológico' is eh-pees-teh-moh-LOH-hee-koh. 'Hermenéutica' is ehr-meh-NEH-oo-tee-kah.",
    keyFocus: '🎯 Philosophical Terminology'
  },
  {
    id: 'c2-04', phrase: 'Las vicisitudes de la historia han demostrado reiteradamente que las civilizaciones más resilientes son aquellas que logran adaptarse a circunstancias adversas sin renunciar a sus principios fundamentales.', translation: 'The vicissitudes of history have repeatedly demonstrated that the most resilient civilizations are those that manage to adapt to adverse circumstances without giving up their fundamental principles.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Vicisitudes' is bee-see-see-TOO-dehs. 'Reiteradamente' is rreh-ee-teh-rah-dah-MEHN-teh.",
    keyFocus: '🎯 Historical Narrative'
  },
  {
    id: 'c2-05', phrase: 'La yuxtaposición de elementos barrocos y minimalistas en esta obra arquitectónica genera una tensión estética que interpela al observador desde múltiples perspectivas.', translation: 'The juxtaposition of baroque and minimalist elements in this architectural work generates an aesthetic tension that challenges the observer from multiple perspectives.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Yuxtaposición' is yooks-tah-poh-see-SYOHN. 'Interpela' is een-tehr-PEH-lah.",
    keyFocus: '🎯 Architectural Criticism'
  },
  {
    id: 'c2-06', phrase: 'Cabría cuestionarse si la proliferación indiscriminada de algoritmos predictivos no está socavando sutilmente los cimientos de la autonomía individual y la privacidad.', translation: 'One might question whether the indiscriminate proliferation of predictive algorithms is not subtly undermining the foundations of individual autonomy and privacy.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Proliferación' is proh-lee-feh-rah-SYOHN. 'Socavando' is soh-kah-BAHN-doh.",
    keyFocus: '🎯 Technology Ethics'
  },
  {
    id: 'c2-07', phrase: 'La transmutación de los valores culturales a través de las generaciones constituye un proceso dinámico que desafía cualquier intento de categorización rígida o definitiva.', translation: 'The transmutation of cultural values across generations constitutes a dynamic process that defies any attempt at rigid or definitive categorization.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Transmutación' is trahns-moo-tah-SYOHN. 'Categorización' is kah-teh-goh-ree-sah-SYOHN.",
    keyFocus: '🎯 Anthropological Discourse'
  },
  {
    id: 'c2-08', phrase: 'En el ámbito de la jurisprudencia internacional, la interpretación de los tratados multilaterales requiere una comprensión exhaustiva del contexto histórico y las intenciones originales de las partes signatarias.', translation: 'In the field of international jurisprudence, the interpretation of multilateral treaties requires an exhaustive understanding of the historical context and the original intentions of the signatory parties.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Jurisprudencia' is hoo-rees-proo-DEHN-syah. 'Signatarias' is seeg-nah-TAH-ryahs.",
    keyFocus: '🎯 Legal Terminology'
  },
  {
    id: 'c2-09', phrase: 'La dicotomía entre el determinismo biológico y el constructivismo social continúa alimentando debates académicos apasionados en los campos de la psicología y la sociología contemporáneas.', translation: 'The dichotomy between biological determinism and social constructivism continues to fuel passionate academic debates in the fields of contemporary psychology and sociology.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Dicotomía' is dee-koh-toh-MEE-ah. 'Constructivismo' is kohns-trook-tee-BEES-moh.",
    keyFocus: '🎯 Social Sciences'
  },
  {
    id: 'c2-10', phrase: 'Resulta ineludible reconocer que la obsolescencia programada de los dispositivos tecnológicos contribuye significativamente a la crisis medioambiental que enfrentamos como civilización.', translation: 'It is unavoidable to recognize that the planned obsolescence of technological devices significantly contributes to the environmental crisis we face as a civilization.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Ineludible' is ee-neh-loo-DEE-bleh. 'Obsolescencia' is ohb-soh-lehs-SEHN-syah.",
    keyFocus: '🎯 Environmental Philosophy'
  },
  {
    id: 'c2-11', phrase: 'La fenomenología husserliana nos invita a suspender nuestros prejuicios para acceder a la esencia de las experiencias vividas tal como se presentan ante la conciencia.', translation: 'Husserlian phenomenology invites us to suspend our prejudices to access the essence of lived experiences as they present themselves to consciousness.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Fenomenología' is feh-noh-meh-noh-loh-HEE-ah. 'Husserliana' is oo-sehr-LYAH-nah.",
    keyFocus: '🎯 Phenomenology'
  },
  {
    id: 'c2-12', phrase: 'La intertextualidad que permea las obras de Borges establece un diálogo fascinante con la tradición literaria universal, trascendiendo las fronteras geográficas y temporales.', translation: 'The intertextuality that permeates Borges\' works establishes a fascinating dialogue with the universal literary tradition, transcending geographical and temporal boundaries.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Intertextualidad' is een-tehr-tehks-twah-lee-DAHD. 'Trascendiendo' is trahs-sehn-DYEHN-doh.",
    keyFocus: '🎯 Literary Criticism'
  },
  {
    id: 'c2-13', phrase: 'El imperativo categórico kantiano presupone la existencia de una racionalidad universal que fundamenta la moralidad independientemente de las contingencias empíricas particulares.', translation: 'The Kantian categorical imperative presupposes the existence of a universal rationality that grounds morality independently of particular empirical contingencies.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Categórico' is kah-teh-GOH-ree-koh. 'Kantiano' is kahn-TYAH-noh. 'Contingencias' is kohn-teen-HEHN-syahs.",
    keyFocus: '🎯 Kantian Ethics'
  },
  {
    id: 'c2-14', phrase: 'La metamorfosis urbana experimentada por las megalópolis latinoamericanas durante las últimas décadas refleja las contradicciones inherentes al modelo de desarrollo capitalista periférico.', translation: 'The urban metamorphosis experienced by Latin American megacities during the last decades reflects the contradictions inherent to the peripheral capitalist development model.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Metamorfosis' is meh-tah-mohr-FOH-sees. 'Megalópolis' is meh-gah-LOH-poh-lees.",
    keyFocus: '🎯 Urban Studies'
  },
  {
    id: 'c2-15', phrase: 'Quien pretenda abarcar la vastedad de la condición humana a través de una sola disciplina académica se verá inevitablemente confrontado con las limitaciones de su propia perspectiva.', translation: 'Whoever attempts to encompass the vastness of the human condition through a single academic discipline will inevitably be confronted with the limitations of their own perspective.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Vastedad' is bahs-teh-DAHD. 'Inevitablemente' is ee-neh-bee-TAH-bleh-mehn-teh.",
    keyFocus: '🎯 Interdisciplinary Thinking'
  },
  {
    id: 'c2-16', phrase: 'La dialéctica hegeliana entre tesis, antítesis y síntesis proporciona un marco conceptual fecundo para comprender la evolución de los procesos históricos y sociales.', translation: 'The Hegelian dialectic between thesis, antithesis, and synthesis provides a fruitful conceptual framework for understanding the evolution of historical and social processes.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Dialéctica' is dyah-LEHK-tee-kah. 'Hegeliana' is eh-heh-LYAH-nah. 'Fecundo' is feh-KOON-doh.",
    keyFocus: '🎯 Hegelian Philosophy'
  },
  {
    id: 'c2-17', phrase: 'La biodiversidad constituye un patrimonio insustituible cuya preservación exige la concertación de esfuerzos transnacionales y la implementación de marcos regulatorios vinculantes.', translation: 'Biodiversity constitutes an irreplaceable heritage whose preservation demands the coordination of transnational efforts and the implementation of binding regulatory frameworks.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Insustituible' is een-soos-tee-TOO-ee-bleh. 'Vinculantes' is been-koo-LAHN-tehs.",
    keyFocus: '🎯 Environmental Law'
  },
  {
    id: 'c2-18', phrase: 'La confluencia de factores macroeconómicos, sociodemográficos y geopolíticos configura un escenario de incertidumbre que demanda respuestas institucionales innovadoras y coordinadas.', translation: 'The confluence of macroeconomic, sociodemographic, and geopolitical factors shapes a scenario of uncertainty that demands innovative and coordinated institutional responses.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Confluencia' is kohn-floo-EHN-syah. 'Macroeconómicos' is mah-kroh-eh-koh-NOH-mee-kohs.",
    keyFocus: '🎯 Macroeconomics'
  },
  {
    id: 'c2-19', phrase: 'El realismo mágico garciamarquiano disuelve las fronteras entre lo cotidiano y lo extraordinario, creando un universo narrativo donde lo imposible se naturaliza con asombrosa fluidez.', translation: 'García Márquez\'s magical realism dissolves the boundaries between the everyday and the extraordinary, creating a narrative universe where the impossible is naturalized with astonishing fluidity.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Garciamarquiano' is gahr-syah-mahr-KYAH-noh. 'Naturaliza' is nah-too-rah-LEE-sah.",
    keyFocus: '🎯 Literary Analysis'
  },
  {
    id: 'c2-20', phrase: 'La implementación de mecanismos de gobernanza participativa requiere no solamente voluntad política, sino también la creación de espacios deliberativos accesibles a toda la ciudadanía.', translation: 'The implementation of participatory governance mechanisms requires not only political will, but also the creation of deliberative spaces accessible to all citizens.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Gobernanza' is goh-behr-NAHN-sah. 'Deliberativos' is deh-lee-beh-rah-TEE-bohs.",
    keyFocus: '🎯 Political Science'
  },
  {
    id: 'c2-21', phrase: 'La verosimilitud del relato depende en gran medida de la habilidad del narrador para construir personajes psicológicamente complejos cuyas motivaciones resulten comprensibles para el lector.', translation: 'The verisimilitude of the narrative depends largely on the narrator\'s ability to construct psychologically complex characters whose motivations are understandable to the reader.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Verosimilitud' is beh-roh-see-mee-lee-TOOD. 'Psicológicamente' is see-koh-LOH-hee-kah-mehn-teh.",
    keyFocus: '🎯 Narrative Theory'
  },
  {
    id: 'c2-22', phrase: 'Las reverberaciones del existencialismo sartreano continúan resonando en el pensamiento filosófico contemporáneo, particularmente en lo que concierne a la libertad radical y la responsabilidad individual.', translation: 'The reverberations of Sartrean existentialism continue to resonate in contemporary philosophical thought, particularly regarding radical freedom and individual responsibility.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Reverberaciones' is rreh-behr-beh-rah-SYOH-nehs. 'Sartreano' is sahr-treh-AH-noh.",
    keyFocus: '🎯 Existentialist Philosophy'
  },
  {
    id: 'c2-23', phrase: 'La semiótica peirceana distingue entre signos icónicos, indiciales y simbólicos, proporcionando herramientas analíticas fundamentales para la deconstrucción de los discursos mediáticos contemporáneos.', translation: 'Peircean semiotics distinguishes between iconic, indexical, and symbolic signs, providing fundamental analytical tools for the deconstruction of contemporary media discourses.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Semiótica' is seh-MYOH-tee-kah. 'Peirceana' is pehr-SYAH-nah. 'Deconstrucción' is deh-kohns-trook-SYOHN.",
    keyFocus: '🎯 Semiotics'
  },
  {
    id: 'c2-24', phrase: 'La convergencia de las biotecnologías, la nanotecnología, la informática y las ciencias cognitivas está reconfigurando los horizontes de lo humanamente posible de maneras que hubieran sido inconcebibles apenas una generación atrás.', translation: 'The convergence of biotechnologies, nanotechnology, computing, and cognitive sciences is reconfiguring the horizons of what is humanly possible in ways that would have been inconceivable just one generation ago.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Nanotecnología' is nah-noh-tehk-noh-loh-HEE-ah. 'Inconcebibles' is een-kohn-seh-BEE-blehs. Take strategic breaths.",
    keyFocus: '🎯 Transhumanism'
  },
  {
    id: 'c2-25', phrase: 'El cosmopolitismo kantiano, entendido como la aspiración a una comunidad mundial regida por principios de hospitalidad universal, adquiere una relevancia renovada en el contexto de los desafíos transfronterizos del siglo veintiuno.', translation: 'Kantian cosmopolitanism, understood as the aspiration for a world community governed by principles of universal hospitality, acquires renewed relevance in the context of the transborder challenges of the twenty-first century.',
    cefrLevel: 'C2', difficultyLabel: 'Maestría',
    pronunciationTip: "'Cosmopolitismo' is kohs-moh-poh-lee-TEES-moh. 'Transfronterizos' is trahns-frohn-teh-REE-sohs. This is the ultimate speaking challenge!",
    keyFocus: '🎯 Cosmopolitan Philosophy'
  },
];

/** Get challenges filtered by CEFR level */
export const getChallengesByLevel = (level: CEFRLevel): SpeakingChallenge[] =>
  SPEAKING_CHALLENGES.filter((c) => c.cefrLevel === level);

/** Get all available CEFR levels */
export const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
