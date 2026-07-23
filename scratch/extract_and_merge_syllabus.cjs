const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../src/data/vocab');

// Load target JSON files
const a1Path = path.join(vocabDir, 'a1.json');
const a2Path = path.join(vocabDir, 'a2.json');
const b1Path = path.join(vocabDir, 'b1.json');
const b2Path = path.join(vocabDir, 'b2.json');
const c1Path = path.join(vocabDir, 'c1.json');

const a1Data = JSON.parse(fs.readFileSync(a1Path, 'utf8'));
const a2Data = JSON.parse(fs.readFileSync(a2Path, 'utf8'));
const b1Data = JSON.parse(fs.readFileSync(b1Path, 'utf8'));
const b2Data = JSON.parse(fs.readFileSync(b2Path, 'utf8'));
const c1Data = JSON.parse(fs.readFileSync(c1Path, 'utf8'));

// Helper to build dedupe key
const getDedupeKey = (level, category, es) => `${level.toUpperCase()}_${category}_${es.toLowerCase().trim()}`;

// Build existing keys set
const existingKeys = new Set();
const addExisting = (data) => {
  data.forEach(item => {
    existingKeys.add(getDedupeKey(item.level, item.category, item.es));
  });
};

addExisting(a1Data);
addExisting(a2Data);
addExisting(b1Data);
addExisting(b2Data);
addExisting(c1Data);

console.log(`Initial Existing Dedupe Keys count: ${existingKeys.size}`);

// Extended Extracted Syllabus Items per Part (Lessons 5 to 30)
// PART 2 (Lessons 5-8) -> A1
const part2Raw = [
  // Lesson 5: Articles & Numbers 0-100
  { category: 'Sustantivos', es: 'el mapa', en: 'the map', example: 'El mapa muestra la ciudad.', exampleTranslation: 'The map shows the city.' },
  { category: 'Sustantivos', es: 'el día', en: 'the day', example: 'El día está soleado.', exampleTranslation: 'The day is sunny.' },
  { category: 'Sustantivos', es: 'el agua', en: 'the water', example: 'El agua está muy fría.', exampleTranslation: 'The water is very cold.' },
  { category: 'Sustantivos', es: 'el hacha', en: 'the axe', example: 'El hacha es peligrosa.', exampleTranslation: 'The axe is dangerous.' },
  { category: 'Sustantivos', es: 'el alma', en: 'the soul', example: 'El alma es inmortal.', exampleTranslation: 'The soul is immortal.' },
  { category: 'Sustantivos', es: 'el problema', en: 'the problem', example: 'Tenemos un problema serio.', exampleTranslation: 'We have a serious problem.' },
  { category: 'Sustantivos', es: 'el sistema', en: 'the system', example: 'El sistema funciona bien.', exampleTranslation: 'The system works well.' },
  { category: 'Sustantivos', es: 'el tema', en: 'the theme / topic', example: 'El tema de hoy es gramática.', exampleTranslation: 'Today\'s topic is grammar.' },
  { category: 'Sustantivos', es: 'el idioma', en: 'the language', example: 'El español es un hermoso idioma.', exampleTranslation: 'Spanish is a beautiful language.' },
  { category: 'Sustantivos', es: 'la mano', en: 'the hand', example: 'Levanta la mano derecha.', exampleTranslation: 'Raise your right hand.' },
  { category: 'Hora', es: 'treinta y cinco', en: 'thirty-five', example: 'Son las tres y treinta y cinco.', exampleTranslation: 'It is three thirty-five.' },
  { category: 'Hora', es: 'cuarenta y dos', en: 'forty-two', example: 'Tiene cuarenta y dos años.', exampleTranslation: 'He is forty-two years old.' },
  { category: 'Hora', es: 'cincuenta y ocho', en: 'fifty-eight', example: 'Cuesta cincuenta y ocho euros.', exampleTranslation: 'It costs fifty-eight euros.' },

  // Lesson 6: Estar, PLACE & Numbers >100
  { category: 'Verbos', es: 'estar cansado', en: 'to be tired', example: 'Estoy cansado después de trabajar.', exampleTranslation: 'I am tired after working.' },
  { category: 'Verbos', es: 'estar emocionado', en: 'to be excited', example: 'Ella está emocionada por el viaje.', exampleTranslation: 'She is excited about the trip.' },
  { category: 'Verbos', es: 'estar contento', en: 'to be happy / content', example: 'Estamos muy contentos aquí.', exampleTranslation: 'We are very happy here.' },
  { category: 'Verbos', es: 'estar ocupado', en: 'to be busy', example: 'El profesor está ocupado ahora.', exampleTranslation: 'The professor is busy now.' },
  { category: 'Hora', es: 'ciento uno', en: 'one hundred and one', example: 'Hay ciento uno estudiantes.', exampleTranslation: 'There are one hundred and one students.' },
  { category: 'Hora', es: 'doscientos', en: 'two hundred', example: 'El libro tiene doscientos páginas.', exampleTranslation: 'The book has two hundred pages.' },
  { category: 'Hora', es: 'quinientos', en: 'five hundred', example: 'Son quinientos kilómetros.', exampleTranslation: 'It is five hundred kilometers.' },
  { category: 'Hora', es: 'setecientos', en: 'seven hundred', example: 'Setecientos personas asistieron.', exampleTranslation: 'Seven hundred people attended.' },
  { category: 'Hora', es: 'novecientos', en: 'nine hundred', example: 'Cuesta novecientos dólares.', exampleTranslation: 'It costs nine hundred dollars.' },

  // Lesson 7: Regular -ER/-IR Verbs
  { category: 'Verbos', es: 'comer', en: 'to eat', example: 'Nosotros comemos en el restaurante.', exampleTranslation: 'We eat at the restaurant.' },
  { category: 'Verbos', es: 'beber', en: 'to drink', example: 'Ellos beben jugo de naranja.', exampleTranslation: 'They drink orange juice.' },
  { category: 'Verbos', es: 'aprender', en: 'to learn', example: 'Quiero aprender español rápidamente.', exampleTranslation: 'I want to learn Spanish quickly.' },
  { category: 'Verbos', es: 'comprender', en: 'to understand', example: '¿Comprendes la lección?', exampleTranslation: 'Do you understand the lesson?' },
  { category: 'Verbos', es: 'vender', en: 'to sell', example: 'Él vende frutas frescas.', exampleTranslation: 'He sells fresh fruits.' },
  { category: 'Verbos', es: 'vivir', en: 'to live', example: 'Vivo en una ciudad grande.', exampleTranslation: 'I live in a large city.' },
  { category: 'Verbos', es: 'escribir', en: 'to write', example: 'Ella escribe una carta larga.', exampleTranslation: 'She writes a long letter.' },
  { category: 'Verbos', es: 'abrir', en: 'to open', example: 'Abrimos las ventanas por la mañana.', exampleTranslation: 'We open the windows in the morning.' },
  { category: 'Verbos', es: 'recibir', en: 'to receive', example: 'Recibo muchos mensajes hoy.', exampleTranslation: 'I receive many messages today.' },

  // Lesson 8: Ir & Questions
  { category: 'Verbos', es: 'ir a la playa', en: 'to go to the beach', example: 'Vamos a la playa este fin de semana.', exampleTranslation: 'We are going to the beach this weekend.' },
  { category: 'Verbos', es: 'ir de compras', en: 'to go shopping', example: 'Mis amigos van de compras hoy.', exampleTranslation: 'My friends are going shopping today.' },
  { category: 'General', es: '¿Adónde?', en: 'Where to?', example: '¿Adónde vas tan rápido?', exampleTranslation: 'Where are you going so fast?' },
  { category: 'General', es: '¿De dónde?', en: 'Where from?', example: '¿De dónde eres tú?', exampleTranslation: 'Where are you from?' },
  { category: 'General', es: '¿Cuándo?', en: 'When?', example: '¿Cuándo empieza la clase?', exampleTranslation: 'When does the class start?' },
  { category: 'General', es: '¿Por qué?', en: 'Why?', example: '¿Por qué estudias español?', exampleTranslation: 'Why do you study Spanish?' },
  { category: 'General', es: 'porque', en: 'because', example: 'Estudio porque quiero viajar.', exampleTranslation: 'I study because I want to travel.' }
];

// PART 3 (Lessons 9-12) -> A2
const part3Raw = [
  // Lesson 9: Dates & Calendar
  { category: 'Hora', es: 'el día festivo', en: 'the holiday', example: 'Hoy es un día festivo en España.', exampleTranslation: 'Today is a holiday in Spain.' },
  { category: 'Hora', es: 'el fin de semana', en: 'the weekend', example: 'Descanso durante el fin de semana.', exampleTranslation: 'I rest during the weekend.' },
  { category: 'Hora', es: 'el siglo', en: 'the century', example: 'Estamos en el siglo veintiuno.', exampleTranslation: 'We are in the twenty-first century.' },
  { category: 'Hora', es: 'la estación', en: 'the season', example: 'La primavera es mi estación favorita.', exampleTranslation: 'Spring is my favorite season.' },
  { category: 'Hora', es: 'la primavera', en: 'spring', example: 'Las flores florecen en primavera.', exampleTranslation: 'Flowers bloom in spring.' },
  { category: 'Hora', es: 'el verano', en: 'summer', example: 'Hace calor en el verano.', exampleTranslation: 'It is hot in the summer.' },
  { category: 'Hora', es: 'el otoño', en: 'autumn / fall', example: 'Las hojas caen en otoño.', exampleTranslation: 'Leaves fall in autumn.' },
  { category: 'Hora', es: 'el invierno', en: 'winter', example: 'Nieva mucho en invierno.', exampleTranslation: 'It snows a lot in winter.' },

  // Lesson 10: Telling Time
  { category: 'Hora', es: 'Es la una y media', en: 'It is 1:30', example: 'Es la una y media de la tarde.', exampleTranslation: 'It is 1:30 in the afternoon.' },
  { category: 'Hora', es: 'Son las dos y cuarto', en: 'It is 2:15', example: 'Son las dos y cuarto en punto.', exampleTranslation: 'It is 2:15 sharp.' },
  { category: 'Hora', es: 'Son las tres menos cuarto', en: 'It is 2:45 (quarter to three)', example: 'La película empieza a las tres menos cuarto.', exampleTranslation: 'The movie starts at quarter to three.' },
  { category: 'Hora', es: 'al mediodía', en: 'at noon', example: 'Almorzamos al mediodía.', exampleTranslation: 'We eat lunch at noon.' },
  { category: 'Hora', es: 'a la medianoche', en: 'at midnight', example: 'La fiesta termina a la medianoche.', exampleTranslation: 'The party ends at midnight.' },

  // Lesson 11: Tener Idioms
  { category: 'Verbos', es: 'tener frío', en: 'to be cold', example: 'Tengo frío, necesito una chaqueta.', exampleTranslation: 'I am cold, I need a jacket.' },
  { category: 'Verbos', es: 'tener calor', en: 'to be hot', example: 'Los niños tienen calor en la playa.', exampleTranslation: 'The children are hot on the beach.' },
  { category: 'Verbos', es: 'tener hambre', en: 'to be hungry', example: '¿Tienes hambre para cenar?', exampleTranslation: 'Are you hungry for dinner?' },
  { category: 'Verbos', es: 'tener sed', en: 'to be thirsty', example: 'Tengo mucha sed después de correr.', exampleTranslation: 'I am very thirsty after running.' },
  { category: 'Verbos', es: 'tener sueño', en: 'to be sleepy', example: 'Ella tiene sueño porque es tarde.', exampleTranslation: 'She is sleepy because it is late.' },
  { category: 'Verbos', es: 'tener miedo de', en: 'to be afraid of', example: 'Tengo miedo de las arañas.', exampleTranslation: 'I am afraid of spiders.' },
  { category: 'Verbos', es: 'tener prisa', en: 'to be in a hurry', example: 'No puedo hablar, tengo prisa.', exampleTranslation: 'I can\'t talk, I\'m in a hurry.' },
  { category: 'Verbos', es: 'tener razón', en: 'to be right / correct', example: 'Tú tienes razón en este asunto.', exampleTranslation: 'You are right about this matter.' },
  { category: 'Verbos', es: 'tener suerte', en: 'to be lucky', example: '¡Qué suerte tienes! Ganaste el premio.', exampleTranslation: 'How lucky you are! You won the prize.' },
  { category: 'Verbos', es: 'tener ganas de + inf', en: 'to feel like (doing something)', example: 'Tengo ganas de comer helado.', exampleTranslation: 'I feel like eating ice cream.' },
  { category: 'Verbos', es: 'tener que + inf', en: 'to have to (do something)', example: 'Tengo que estudiar para el examen.', exampleTranslation: 'I have to study for the exam.' },

  // Lesson 12: Hacer, Weather & Saber vs Conocer
  { category: 'Clima', es: 'hacer buen tiempo', en: 'to be good weather', example: 'Hoy hace buen tiempo en el parque.', exampleTranslation: 'Today it is good weather in the park.' },
  { category: 'Clima', es: 'hacer mal tiempo', en: 'to be bad weather', example: 'Hace mal tiempo, mejor nos quedamos.', exampleTranslation: 'It is bad weather, we better stay.' },
  { category: 'Clima', es: 'hacer sol', en: 'to be sunny', example: 'En verano hace mucho sol.', exampleTranslation: 'In summer it is very sunny.' },
  { category: 'Clima', es: 'hacer viento', en: 'to be windy', example: 'Hace viento cerca del mar.', exampleTranslation: 'It is windy near the sea.' },
  { category: 'Clima', es: 'llover (o->ue)', en: 'to rain', example: 'Llueve mucho en el norte.', exampleTranslation: 'It rains a lot in the north.' },
  { category: 'Clima', es: 'nevar (e->ie)', en: 'to snow', example: 'Nieva en las montañas en invierno.', exampleTranslation: 'It snows in the mountains in winter.' },
  { category: 'Verbos', es: 'saber la respuesta', en: 'to know the answer', example: 'Yo sé la respuesta correcta.', exampleTranslation: 'I know the correct answer.' },
  { category: 'Verbos', es: 'saber + inf', en: 'to know how to (do something)', example: 'Ella sabe nadar muy bien.', exampleTranslation: 'She knows how to swim very well.' },
  { category: 'Verbos', es: 'conocer a alguien', en: 'to know / meet someone', example: 'Conozco a María desde hace años.', exampleTranslation: 'I have known María for years.' }
];

// PART 4 (Lessons 13-16) -> A2
const part4Raw = [
  // Lesson 13: Stem-Changing Boot Verbs
  { category: 'Verbos', es: 'pensar (e->ie)', en: 'to think / plan', example: 'Pienso viajar a España pronto.', exampleTranslation: 'I plan to travel to Spain soon.' },
  { category: 'Verbos', es: 'cerrar (e->ie)', en: 'to close', example: 'El comerciante cierra la tienda a las ocho.', exampleTranslation: 'The shopkeeper closes the shop at eight.' },
  { category: 'Verbos', es: 'empezar (e->ie)', en: 'to begin / start', example: 'La película empieza ahora mismo.', exampleTranslation: 'The movie begins right now.' },
  { category: 'Verbos', es: 'entender (e->ie)', en: 'to understand', example: 'No entiendo esta regla gramatical.', exampleTranslation: 'I don\'t understand this grammar rule.' },
  { category: 'Verbos', es: 'preferir (e->ie)', en: 'to prefer', example: 'Prefiero tomar café sin azúcar.', exampleTranslation: 'I prefer to drink coffee without sugar.' },
  { category: 'Verbos', es: 'dormir (o->ue)', en: 'to sleep', example: 'Los niños duermen ocho horas.', exampleTranslation: 'The children sleep eight hours.' },
  { category: 'Verbos', es: 'encontrar (o->ue)', en: 'to find', example: 'No encuentro mis llaves de casa.', exampleTranslation: 'I can\'t find my house keys.' },
  { category: 'Verbos', es: 'volver (o->ue)', en: 'to return', example: 'Vuelvo a casa a las seis de la tarde.', exampleTranslation: 'I return home at six in the evening.' },
  { category: 'Verbos', es: 'poder (o->ue)', en: 'to be able to / can', example: '¿Puedes ayudarme con esto?', exampleTranslation: 'Can you help me with this?' },
  { category: 'Verbos', es: 'pedir (e->i)', en: 'to ask for / order', example: 'Pido una ensalada de la carta.', exampleTranslation: 'I order a salad from the menu.' },
  { category: 'Verbos', es: 'servir (e->i)', en: 'to serve', example: 'El camarero sirve la comida caliente.', exampleTranslation: 'The waiter serves hot food.' },
  { category: 'Verbos', es: 'repetir (e->i)', en: 'to repeat', example: 'El profesor repite la pregunta.', exampleTranslation: 'The professor repeats the question.' },
  { category: 'Verbos', es: 'jugar (u->ue)', en: 'to play (sports/games)', example: 'Jugamos al fútbol los domingos.', exampleTranslation: 'We play soccer on Sundays.' },

  // Lesson 14: Yo-Go Verbs
  { category: 'Verbos', es: 'poner', en: 'to put / place', example: 'Pongo los libros sobre la mesa.', exampleTranslation: 'I put the books on the table.' },
  { category: 'Verbos', es: 'salir', en: 'to leave / go out', example: 'Salgo con mis amigos esta noche.', exampleTranslation: 'I am going out with my friends tonight.' },
  { category: 'Verbos', es: 'traer', en: 'to bring', example: 'Traigo el postre para la cena.', exampleTranslation: 'I bring dessert for dinner.' },
  { category: 'Verbos', es: 'hacer la tarea', en: 'to do homework', example: 'Hago la tarea antes de cenar.', exampleTranslation: 'I do homework before eating dinner.' },
  { category: 'Verbos', es: 'oír', en: 'to hear', example: 'Oigo música en mi habitación.', exampleTranslation: 'I hear music in my room.' },
  { category: 'Verbos', es: 'caer', en: 'to fall', example: 'Me caigo si no tengo cuidado.', exampleTranslation: 'I fall if I am not careful.' },

  // Lesson 15: Present Progressive
  { category: 'Verbos', es: 'estar hablando', en: 'to be speaking', example: 'Estoy hablando por teléfono ahora.', exampleTranslation: 'I am speaking on the phone now.' },
  { category: 'Verbos', es: 'estar comiendo', en: 'to be eating', example: 'Ellos están comiendo en el comedor.', exampleTranslation: 'They are eating in the dining room.' },
  { category: 'Verbos', es: 'estar escribiendo', en: 'to be writing', example: 'Ella está escribiendo un informe.', exampleTranslation: 'She is writing a report.' },
  { category: 'Verbos', es: 'estar leyendo', en: 'to be reading', example: 'Estamos leyendo un libro fascinante.', exampleTranslation: 'We are reading a fascinating book.' },
  { category: 'Verbos', es: 'estar oyendo', en: 'to be hearing', example: '¿Estás oyendo ese ruido afuera?', exampleTranslation: 'Are you hearing that noise outside?' },

  // Lesson 16: Direct Object Pronouns & Adverbs in -mente
  { category: 'Pronombres', es: 'lo / la', en: 'him / her / it (direct object)', example: 'Compro el libro y lo leo.', exampleTranslation: 'I buy the book and read it.' },
  { category: 'Pronombres', es: 'los / las', en: 'them (direct object)', example: 'Veo las fotos y las guardo.', exampleTranslation: 'I see the photos and save them.' },
  { category: 'Adverbios', es: 'rápidamente', en: 'quickly / rapidly', example: 'Él corre rápidamente para ganar.', exampleTranslation: 'He runs quickly to win.' },
  { category: 'Adverbios', es: 'lentamente', en: 'slowly', example: 'Camina lentamente por el parque.', exampleTranslation: 'She walks slowly through the park.' },
  { category: 'Adverbios', es: 'fácilmente', en: 'easily', example: 'Resolvemos el problema fácilmente.', exampleTranslation: 'We solve the problem easily.' },
  { category: 'Adverbios', es: 'afortunadamente', en: 'fortunately', example: 'Afortunadamente todos llegaron bien.', exampleTranslation: 'Fortunately everyone arrived safely.' }
];

// PART 5 (Lessons 17-21) -> B1
const part5Raw = [
  // Lesson 17: Possessives & Demonstratives
  { category: 'Pronombres', es: 'este / esta / estos / estas', en: 'this / these (near speaker)', example: 'Este coche es muy rápido.', exampleTranslation: 'This car is very fast.' },
  { category: 'Pronombres', es: 'ese / esa / esos / esas', en: 'that / those (near listener)', example: 'Esa casa es grande y bonita.', exampleTranslation: 'That house is large and pretty.' },
  { category: 'Pronombres', es: 'aquel / aquella / aquellos / aquellas', en: 'that over there / those over there (distant)', example: 'Aquellas montañas están cubiertas de nieve.', exampleTranslation: 'Those mountains over there are covered in snow.' },
  { category: 'Pronombres', es: 'el mío / la mía', en: 'mine (possessive pronoun)', example: 'Mi libro es nuevo, ¿y el tuyo? El mío es viejo.', exampleTranslation: 'My book is new, and yours? Mine is old.' },

  // Lesson 18: Indefinites & Negatives
  { category: 'General', es: 'algo', en: 'something / anything', example: '¿Quieres comer algo delicioso?', exampleTranslation: 'Do you want to eat something delicious?' },
  { category: 'General', es: 'nada', en: 'nothing / not anything', example: 'No hay nada en el refrigerador.', exampleTranslation: 'There is nothing in the refrigerator.' },
  { category: 'General', es: 'alguien', en: 'someone / anybody', example: '¿Hay alguien en la oficina?', exampleTranslation: 'Is there someone in the office?' },
  { category: 'General', es: 'nadie', en: 'no one / nobody', example: 'Nadie vino a la reunión hoy.', exampleTranslation: 'Nobody came to the meeting today.' },
  { category: 'General', es: 'algún / alguno', en: 'some / any', example: '¿Tienes algún consejo para mí?', exampleTranslation: 'Do you have any advice for me?' },
  { category: 'General', es: 'ningún / ninguno', en: 'no / none / not any', example: 'No tengo ningún problema con eso.', exampleTranslation: 'I have no problem with that.' },
  { category: 'General', es: 'siempre', en: 'always', example: 'Siempre llego a tiempo al trabajo.', exampleTranslation: 'I always arrive on time to work.' },
  { category: 'General', es: 'nunca / jamás', en: 'never', example: 'Nunca he visitado ese país.', exampleTranslation: 'I have never visited that country.' },
  { category: 'General', es: 'también', en: 'also / too', example: 'Ella también quiere venir con nosotros.', exampleTranslation: 'She also wants to come with us.' },
  { category: 'General', es: 'tampoco', en: 'neither / not either', example: 'Yo tampoco sé la respuesta.', exampleTranslation: 'I don\'t know the answer either.' },

  // Lesson 19: Indirect Objects & Gustar
  { category: 'Pronombres', es: 'le / les', en: 'to him / to her / to them (indirect object)', example: 'Le escribo una carta a mi abuela.', exampleTranslation: 'I write a letter to my grandmother.' },
  { category: 'Verbos', es: 'gustar', en: 'to be pleasing to', example: 'Me gustan las manzanas frescas.', exampleTranslation: 'Fresh apples are pleasing to me (I like fresh apples).' },
  { category: 'Verbos', es: 'encantar', en: 'to love / delight in', example: 'Me encanta escuchar música clásica.', exampleTranslation: 'I love listening to classical music.' },
  { category: 'Verbos', es: 'interesar', en: 'to interest', example: 'A él le interesa la historia de España.', exampleTranslation: 'History of Spain interests him.' },
  { category: 'Verbos', es: 'importar', en: 'to matter / care about', example: 'No me importa la lluvia.', exampleTranslation: 'The rain does not matter to me.' },
  { category: 'Verbos', es: 'quedar', en: 'to remain / fit', example: 'Esta camisa me queda bien.', exampleTranslation: 'This shirt fits me well.' },
  { category: 'Verbos', es: 'doler (o->ue)', en: 'to hurt / pain', example: 'Me duele la cabeza hoy.', exampleTranslation: 'My head hurts today.' },

  // Lesson 20: Double Object Pronouns
  { category: 'Pronombres', es: 'se lo / se la', en: 'it to him/her/them (double object substitution)', example: '¿El libro? Se lo di a Juan ayer.', exampleTranslation: 'The book? I gave it to Juan yesterday.' },
  { category: 'Pronombres', es: 'se los / se las', en: 'them to him/her/them', example: '¿Las llaves? Se las entregué al recepcionista.', exampleTranslation: 'The keys? I handed them to the receptionist.' },

  // Lesson 21: Reflexive Verbs & Routine
  { category: 'Verbos', es: 'lavarse las manos', en: 'to wash one\'s hands', example: 'Me lavo las manos antes de comer.', exampleTranslation: 'I wash my hands before eating.' },
  { category: 'Verbos', es: 'levantarse', en: 'to get up', example: 'Nos levantamos temprano los lunes.', exampleTranslation: 'We get up early on Mondays.' },
  { category: 'Verbos', es: 'despertarse (e->ie)', en: 'to wake up', example: 'Me despierto a las siete de la mañana.', exampleTranslation: 'I wake up at seven in the morning.' },
  { category: 'Verbos', es: 'acostarse (o->ue)', en: 'to go to bed', example: 'Se acuestan tarde los fines de semana.', exampleTranslation: 'They go to bed late on weekends.' },
  { category: 'Verbos', es: 'vestirse (e->i)', en: 'to get dressed', example: 'Ella se viste elegantemente para la fiesta.', exampleTranslation: 'She gets dressed elegantly for the party.' },
  { category: 'Verbos', es: 'ducharse', en: 'to shower', example: 'Me ducho después de hacer ejercicio.', exampleTranslation: 'I shower after exercising.' },
  { category: 'Verbos', es: 'afeitarse', en: 'to shave', example: 'Él se afeita la barba cada mañana.', exampleTranslation: 'He shaves his beard every morning.' }
];

// PART 6 (Lessons 22-26) -> B1
const part6Raw = [
  // Lesson 22: Recent Past & Duration
  { category: 'Verbos', es: 'acabar de + inf', en: 'to have just (done something)', example: 'Acabo de terminar la lección.', exampleTranslation: 'I have just finished the lesson.' },
  { category: 'Hora', es: 'hace + tiempo + que', en: 'it has been (time) since / for', example: 'Hace dos años que estudio español.', exampleTranslation: 'I have been studying Spanish for two years.' },

  // Lesson 23: Present Duration & Time Queries
  { category: 'Hora', es: '¿Desde cuándo...?', en: 'Since when...?', example: '¿Desde cuándo vives en esta ciudad?', exampleTranslation: 'Since when have you lived in this city?' },
  { category: 'Hora', es: 'desde hace', en: 'for (duration of time)', example: 'Trabajo aquí desde hace cinco meses.', exampleTranslation: 'I have been working here for five months.' },

  // Lesson 24: Formal Commands & Comparisons
  { category: 'Verbos', es: '¡Hable usted!', en: 'Speak! (formal command)', example: '¡Hable usted con el director ahora mismo!', exampleTranslation: 'Speak with the director right now!' },
  { category: 'Verbos', es: '¡Coma usted!', en: 'Eat! (formal command)', example: '¡Coma usted toda la verdura fresca!', exampleTranslation: 'Eat all the fresh vegetables!' },
  { category: 'Verbos', es: '¡Escriba usted!', en: 'Write! (formal command)', example: '¡Escriba usted su dirección aquí!', exampleTranslation: 'Write your address here!' },
  { category: 'Adjetivos', es: 'más... que', en: 'more... than (comparison)', example: 'Este libro es más interesante que la película.', exampleTranslation: 'This book is more interesting than the movie.' },
  { category: 'Adjetivos', es: 'menos... que', en: 'less... than', example: 'Esta sopa está menos caliente que la otra.', exampleTranslation: 'This soup is less hot than the other.' },
  { category: 'Adjetivos', es: 'tan... como', en: 'as... as (equality)', example: 'María es tan inteligente como su hermano.', exampleTranslation: 'María is as intelligent as her brother.' },
  { category: 'Sustantivos', es: 'tanto... como', en: 'as much / many... as', example: 'Tengo dinero tanto como necesito.', exampleTranslation: 'I have as much money as I need.' },

  // Lesson 25: Informal Tú Commands
  { category: 'Verbos', es: '¡Haz!', en: 'Do / Make! (tú command)', example: '¡Haz la tarea de español ahora!', exampleTranslation: 'Do your Spanish homework now!' },
  { category: 'Verbos', es: '¡Pon!', en: 'Put / Place! (tú command)', example: '¡Pon los platos en la mesa!', exampleTranslation: 'Put the plates on the table!' },
  { category: 'Verbos', es: '¡Sal!', en: 'Leave / Go out! (tú command)', example: '¡Sal de la habitación inmediatamente!', exampleTranslation: 'Leave the room immediately!' },
  { category: 'Verbos', es: '¡Di!', en: 'Say / Tell! (tú command)', example: '¡Di la verdad a tus padres!', exampleTranslation: 'Tell the truth to your parents!' },
  { category: 'Verbos', es: '¡Ven!', en: 'Come! (tú command)', example: '¡Ven aquí un momento, por favor!', exampleTranslation: 'Come here for a moment, please!' },
  { category: 'Verbos', es: '¡Ten!', en: 'Have / Take! (tú command)', example: '¡Ten paciencia con los niños!', exampleTranslation: 'Have patience with the children!' },
  { category: 'Verbos', es: '¡Ve!', en: 'Go! (tú command)', example: '¡Ve a la tienda a comprar leche!', exampleTranslation: 'Go to the store to buy milk!' },
  { category: 'Verbos', es: '¡Sé!', en: 'Be! (tú command)', example: '¡Sé amigable con los nuevos vecinos!', exampleTranslation: 'Be friendly with the new neighbors!' },

  // Lesson 26: Preterite Past Regulars
  { category: 'Pasado', es: 'hablé', en: 'I spoke (preterite)', example: 'Ayer hablé con el profesor.', exampleTranslation: 'Yesterday I spoke with the professor.' },
  { category: 'Pasado', es: 'comió', en: 'he / she ate (preterite)', example: 'Ella comió una ensalada fresca.', exampleTranslation: 'She ate a fresh salad.' },
  { category: 'Pasado', es: 'vivimos', en: 'we lived (preterite)', example: 'Vivimos tres años en Madrid.', exampleTranslation: 'We lived three years in Madrid.' },
  { category: 'Pasado', es: 'escribieron', en: 'they wrote (preterite)', example: 'Ellos escribieron una carta formal.', exampleTranslation: 'They wrote a formal letter.' }
];

// PART 7 (Lessons 27-30) -> B2
const part7Raw = [
  // Lesson 27: Imperfect Tense
  { category: 'Pasado', es: 'hablaba', en: 'I / he / she used to speak (imperfect)', example: 'Cuando era niño, hablaba español en casa.', exampleTranslation: 'When I was a child, I used to speak Spanish at home.' },
  { category: 'Pasado', es: 'comía', en: 'I / he / she used to eat (imperfect)', example: 'Cada domingo comíamos en casa de la abuela.', exampleTranslation: 'Every Sunday we used to eat at grandma\'s house.' },
  { category: 'Pasado', es: 'vivía', en: 'I / he / she used to live (imperfect)', example: 'Ella vivía cerca de la playa.', exampleTranslation: 'She used to live near the beach.' },
  { category: 'Pasado', es: 'era', en: 'was / used to be (ser imperfect)', example: 'Mi casa vieja era grande y azul.', exampleTranslation: 'My old house was big and blue.' },
  { category: 'Pasado', es: 'iba', en: 'was going / used to go (ir imperfect)', example: 'Todos los veranos ibamos a las montañas.', exampleTranslation: 'Every summer we used to go to the mountains.' },
  { category: 'Pasado', es: 'veía', en: 'was seeing / used to watch (ver imperfect)', example: 'Veía dibujos animados de pequeño.', exampleTranslation: 'I used to watch cartoons when small.' },

  // Lesson 28: Preterite Irregulars
  { category: 'Pasado', es: 'fui', en: 'I went / I was (ir/ser preterite)', example: 'Ayer fui al centro comercial.', exampleTranslation: 'Yesterday I went to the shopping mall.' },
  { category: 'Pasado', es: 'estuve', en: 'I was (estar preterite)', example: 'Estuve enfermo todo el fin de semana.', exampleTranslation: 'I was sick all weekend.' },
  { category: 'Pasado', es: 'tuve', en: 'I had (tener preterite)', example: 'Tuve una idea excelente durante la clase.', exampleTranslation: 'I had an excellent idea during class.' },
  { category: 'Pasado', es: 'hice', en: 'I did / made (hacer preterite)', example: 'Hice la cena para la familia.', exampleTranslation: 'I made dinner for the family.' },
  { category: 'Pasado', es: 'pude', en: 'I managed to / could (poder preterite)', example: 'Pude terminar el trabajo a tiempo.', exampleTranslation: 'I managed to finish the job on time.' },
  { category: 'Pasado', es: 'puse', en: 'I put / placed (poner preterite)', example: 'Puse las llaves sobre el escritorio.', exampleTranslation: 'I put the keys on the desk.' },
  { category: 'Pasado', es: 'supe', en: 'I found out / learned (saber preterite)', example: 'Ayer supe la verdad de lo ocurrido.', exampleTranslation: 'Yesterday I found out the truth of what happened.' },
  { category: 'Pasado', es: 'quise', en: 'I tried / wanted (querer preterite)', example: 'Quise comprar la entrada pero se agotó.', exampleTranslation: 'I tried to buy the ticket but it sold out.' },
  { category: 'Pasado', es: 'dije', en: 'I said / told (decir preterite)', example: 'Le dije la verdad a mi amigo.', exampleTranslation: 'I told the truth to my friend.' },
  { category: 'Pasado', es: 'vine', en: 'I came (venir preterite)', example: 'Vine lo más rápido posible.', exampleTranslation: 'I came as fast as possible.' },

  // Lesson 29: Preterite vs Imperfect Contrast
  { category: 'Pasado', es: 'mientras', en: 'while (imperfect background indicator)', example: 'Mientras estudiaba, sonó el teléfono.', exampleTranslation: 'While I was studying, the phone rang.' },
  { category: 'Pasado', es: 'de repente', en: 'suddenly (preterite action indicator)', example: 'Caminaba por la calle cuando de repente empezó a llover.', exampleTranslation: 'I was walking along the street when suddenly it started raining.' },

  // Lesson 30: Superlatives & Synthesis
  { category: 'Adjetivos', es: 'el más... de', en: 'the most... of (superlative)', example: 'Es la ciudad más hermosa del mundo.', exampleTranslation: 'It is the most beautiful city in the world.' },
  { category: 'Adjetivos', es: 'el menos... de', en: 'the least... of', example: 'Es el coche menos caro de la tienda.', exampleTranslation: 'It is the least expensive car in the store.' },
  { category: 'Adjetivos', es: '-ísimo / -ísima', en: 'extremely / super (absolute superlative)', example: 'La comida estuvo riquísima.', exampleTranslation: 'The food was extremely delicious.' },
  { category: 'Adjetivos', es: 'altísimo', en: 'extremely tall / high', example: 'El rascacielos es altísimo.', exampleTranslation: 'The skyscraper is extremely tall.' },
  { category: 'Adjetivos', es: 'buenísimo', en: 'extremely good', example: 'Este concierto fue buenísimo.', exampleTranslation: 'This concert was extremely good.' }
];

// Combine and map into respective target JSON data structures
const additions = { a1: [], a2: [], b1: [], b2: [] };

// Continuous ID counter tracking per level
let a1Counter = a1Data.length + 1;
let a2Counter = a2Data.length + 1; // Used across Part 3 & 4 continuously!
let b1Counter = b1Data.length + 1; // Used across Part 5 & 6 continuously!
let b2Counter = b2Data.length + 1;

// Part 2 -> A1
part2Raw.forEach(item => {
  const key = getDedupeKey('A1', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-a1-${String(a1Counter++).padStart(3, '0')}`,
      level: 'A1',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    a1Data.push(newItem);
    additions.a1.push(newItem);
  }
});

// Part 3 -> A2
part3Raw.forEach(item => {
  const key = getDedupeKey('A2', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-a2-${String(a2Counter++).padStart(3, '0')}`,
      level: 'A2',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    a2Data.push(newItem);
    additions.a2.push(newItem);
  }
});

// Part 4 -> A2 (continuing a2Counter without restarting)
part4Raw.forEach(item => {
  const key = getDedupeKey('A2', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-a2-${String(a2Counter++).padStart(3, '0')}`,
      level: 'A2',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    a2Data.push(newItem);
    additions.a2.push(newItem);
  }
});

// Part 5 -> B1
part5Raw.forEach(item => {
  const key = getDedupeKey('B1', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-b1-${String(b1Counter++).padStart(3, '0')}`,
      level: 'B1',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    b1Data.push(newItem);
    additions.b1.push(newItem);
  }
});

// Part 6 -> B1 (continuing b1Counter without restarting)
part6Raw.forEach(item => {
  const key = getDedupeKey('B1', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-b1-${String(b1Counter++).padStart(3, '0')}`,
      level: 'B1',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    b1Data.push(newItem);
    additions.b1.push(newItem);
  }
});

// Part 7 -> B2
part7Raw.forEach(item => {
  const key = getDedupeKey('B2', item.category, item.es);
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    const newItem = {
      id: `sys-b2-${String(b2Counter++).padStart(3, '0')}`,
      level: 'B2',
      category: item.category,
      es: item.es,
      en: item.en,
      example: item.example,
      exampleTranslation: item.exampleTranslation
    };
    b2Data.push(newItem);
    additions.b2.push(newItem);
  }
});

// Write updated JSON files
fs.writeFileSync(a1Path, JSON.stringify(a1Data, null, 2), 'utf8');
fs.writeFileSync(a2Path, JSON.stringify(a2Data, null, 2), 'utf8');
fs.writeFileSync(b1Path, JSON.stringify(b1Data, null, 2), 'utf8');
fs.writeFileSync(b2Path, JSON.stringify(b2Data, null, 2), 'utf8');

console.log('=== SUMMARY OF ADDITIONS ===');
console.log(`A1 additions: ${additions.a1.length} (New total: ${a1Data.length})`);
console.log(`A2 additions: ${additions.a2.length} (New total: ${a2Data.length})`);
console.log(`B1 additions: ${additions.b1.length} (New total: ${b1Data.length})`);
console.log(`B2 additions: ${additions.b2.length} (New total: ${b2Data.length})`);
console.log(`C1 total: ${c1Data.length}`);

