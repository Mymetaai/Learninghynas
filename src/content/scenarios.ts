export interface Scenario {
  id: string;
  topicNumber: number;
  title: string;
  icon: string;
  cefr: 'A1' | 'A2' | 'A1–A2';
  goal: string;
  characterName: string;
  characterRole: string;
  avatar: string;
  bgGradient: string;
  initialMessage: {
    text: string;
    translation: string;
    signOff: string;
    quickReplies: { text: string; translation: string }[];
  };
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'greetings',
    topicNumber: 1,
    title: 'Greetings & Introductions',
    icon: '👋',
    cefr: 'A1',
    goal: 'Introduce yourself and meet new people',
    characterName: 'Mateo',
    characterRole: 'Un nuevo amigo en Madrid',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    initialMessage: {
      text: '¡Hola! Me llamo Mateo. Soy de Madrid. ¿Cómo te llamas y de dónde eres?',
      translation: 'Hello! My name is Mateo. I am from Madrid. What is your name and where are you from?',
      signOff: 'Un gusto conocerte, Mateo',
      quickReplies: [
        { text: '¡Hola Mateo! Me llamo Alex y soy de Estados Unidos.', translation: 'Hello Mateo! My name is Alex and I am from the US.' },
        { text: 'Hola, soy estudiante de español. ¿Cómo estás?', translation: 'Hello, I am a Spanish student. How are you?' },
        { text: '¡Mucho gusto! Me llamo Sam.', translation: 'Nice to meet you! My name is Sam.' }
      ]
    }
  },
  {
    id: 'school',
    topicNumber: 2,
    title: 'At School',
    icon: '🏫',
    cefr: 'A1',
    goal: 'Talk to a teacher or classmate',
    characterName: 'Profesora Carmen',
    characterRole: 'Profesora de español',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-blue-500/20 to-indigo-500/20',
    initialMessage: {
      text: '¡Buenos días! Bienvenidos a la clase de español. ¿Tienes tu cuaderno preparado?',
      translation: 'Good morning! Welcome to the Spanish class. Do you have your notebook ready?',
      signOff: 'Con cariño, Profesora Carmen',
      quickReplies: [
        { text: 'Sí, profesora, tengo mi cuaderno y bolígrafo.', translation: 'Yes, teacher, I have my notebook and pen.' },
        { text: '¿Qué vamos a aprender hoy en clase?', translation: 'What are we going to learn today in class?' },
        { text: 'Tengo una pregunta sobre los deberes.', translation: 'I have a question about the homework.' }
      ]
    }
  },
  {
    id: 'food',
    topicNumber: 3,
    title: 'Ordering Food & Drinks',
    icon: '☕',
    cefr: 'A1',
    goal: 'Order at a café or restaurant',
    characterName: 'Carlos',
    characterRole: 'Camarero en El Café Sol',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-amber-600/20 to-yellow-500/20',
    initialMessage: {
      text: '¡Hola! Bienvenido a El Café Sol. ¿Qué te gustaría tomar hoy?',
      translation: 'Hello! Welcome to El Café Sol. What would you like to have today?',
      signOff: 'A tu servicio, Carlos',
      quickReplies: [
        { text: 'Un café con leche y un cruasán, por favor.', translation: 'A coffee with milk and a croissant, please.' },
        { text: '¿Tienen la carta en inglés o menú del día?', translation: 'Do you have the menu in English or a daily special?' },
        { text: 'Quisiera una copa de agua y un bocadillo.', translation: 'I would like a glass of water and a sandwich.' }
      ]
    }
  },
  {
    id: 'shopping',
    topicNumber: 4,
    title: 'Shopping',
    icon: '🛒',
    cefr: 'A1',
    goal: 'Ask about prices, sizes, and pay',
    characterName: 'Lucía',
    characterRole: 'Vendedora de moda',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    initialMessage: {
      text: '¡Hola! ¿Buscas alguna prenda en particular o necesitas ayuda con las tallas?',
      translation: 'Hello! Are you looking for a specific item or need help with sizes?',
      signOff: 'Saludos, Lucía',
      quickReplies: [
        { text: 'Busco una chaqueta roja. ¿Cuánto cuesta esta?', translation: 'I am looking for a red jacket. How much does this one cost?' },
        { text: '¿Tienen esta camiseta en talla M?', translation: 'Do you have this t-shirt in size M?' },
        { text: '¿Puedo pagar con tarjeta de crédito?', translation: 'Can I pay by credit card?' }
      ]
    }
  },
  {
    id: 'transport',
    topicNumber: 5,
    title: 'Public Transport',
    icon: '🚌',
    cefr: 'A1',
    goal: 'Buy a ticket and ask about buses or trains',
    characterName: 'Fernando',
    characterRole: 'Agente de estación',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-cyan-500/20 to-teal-500/20',
    initialMessage: {
      text: '¡Buenos días! Estación Central. ¿A dónde deseas viajar hoy?',
      translation: 'Good morning! Central Station. Where do you wish to travel today?',
      signOff: 'Atentamente, Fernando',
      quickReplies: [
        { text: 'Quisiera un billete de ida y vuelta a Barcelona, por favor.', translation: 'I would like a round-trip ticket to Barcelona, please.' },
        { text: '¿A qué hora sale el próximo autobús para el centro?', translation: 'What time does the next bus for downtown leave?' },
        { text: '¿De qué andén sale el tren?', translation: 'Which platform does the train leave from?' }
      ]
    }
  },
  {
    id: 'directions',
    topicNumber: 6,
    title: 'Asking for Directions',
    icon: '🗺️',
    cefr: 'A1–A2',
    goal: 'Find places in a city',
    characterName: 'Sofía',
    characterRole: 'Vecina amable',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-emerald-500/20 to-green-500/20',
    initialMessage: {
      text: '¡Hola! Te ves algo perdido. ¿Buscas algún lugar en el barrio?',
      translation: 'Hello! You look a bit lost. Are you looking for a place in the neighborhood?',
      signOff: 'Un saludo, Sofía',
      quickReplies: [
        { text: 'Disculpe, ¿dónde está el museo de arte más cercano?', translation: 'Excuse me, where is the nearest art museum?' },
        { text: '¿Cómo llego a la Plaza Mayor desde aquí?', translation: 'How do I get to Plaza Mayor from here?' },
        { text: '¿Hay una farmacia o cajero automático cerca?', translation: 'Is there a pharmacy or ATM nearby?' }
      ]
    }
  },
  {
    id: 'hotel',
    topicNumber: 7,
    title: 'Hotel Check-in',
    icon: '🏨',
    cefr: 'A2',
    goal: 'Book a room and ask for hotel services',
    characterName: 'Alejandro',
    characterRole: 'Recepcionista del Hotel Real',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-violet-500/20 to-purple-500/20',
    initialMessage: {
      text: '¡Buenas tardes! Bienvenido al Hotel Real. ¿Tiene una reserva a su nombre?',
      translation: 'Good afternoon! Welcome to Hotel Real. Do you have a reservation under your name?',
      signOff: 'Cordialmente, Alejandro',
      quickReplies: [
        { text: 'Sí, tengo una reserva para dos noches a nombre de Alex.', translation: 'Yes, I have a reservation for two nights under the name Alex.' },
        { text: '¿A qué hora se sirve el desayuno mañana?', translation: 'What time is breakfast served tomorrow?' },
        { text: '¿Tienen servicio de Wi-Fi gratuito en la habitación?', translation: 'Do you have free Wi-Fi in the room?' }
      ]
    }
  },
  {
    id: 'airport',
    topicNumber: 8,
    title: 'Airport & Travel',
    icon: '✈️',
    cefr: 'A2',
    goal: 'Check in, board a flight, ask for information',
    characterName: 'Isabel',
    characterRole: 'Agente de facturación',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-sky-500/20 to-blue-600/20',
    initialMessage: {
      text: '¡Hola! Por favor, muestre su pasaporte y tarjeta de embarque. ¿Factura alguna maleta?',
      translation: 'Hello! Please show your passport and boarding pass. Are you checking in any bags?',
      signOff: 'Buen viaje, Isabel',
      quickReplies: [
        { text: 'Aquí tiene mi pasaporte. Solo tengo esta maleta de mano.', translation: 'Here is my passport. I only have this carry-on bag.' },
        { text: '¿A qué hora empieza el embarque de mi vuelo?', translation: 'What time does boarding start for my flight?' },
        { text: '¿Dónde está la puerta de salida número 14?', translation: 'Where is departure gate number 14?' }
      ]
    }
  },
  {
    id: 'doctor',
    topicNumber: 9,
    title: 'Visiting the Doctor',
    icon: '🏥',
    cefr: 'A2',
    goal: 'Describe simple health problems',
    characterName: 'Doctora Elena',
    characterRole: 'Médica de cabecera',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-red-500/20 to-pink-600/20',
    initialMessage: {
      text: '¡Hola! Pasa y toma asiento. ¿Qué síntoma tienes hoy o cómo te sientes?',
      translation: 'Hello! Come in and take a seat. What symptom do you have today or how are you feeling?',
      signOff: 'Cuídate mucho, Doctora Elena',
      quickReplies: [
        { text: 'Tengo dolor de cabeza y fiebre desde ayer por la noche.', translation: 'I have a headache and fever since yesterday evening.' },
        { text: 'Me duele la garganta cuando trago comida.', translation: 'My throat hurts when I swallow food.' },
        { text: '¿Necesito tomar algún medicamento o descansar?', translation: 'Do I need to take any medicine or rest?' }
      ]
    }
  },
  {
    id: 'family',
    topicNumber: 10,
    title: 'Talking About Family',
    icon: '👨‍👩‍👧',
    cefr: 'A1',
    goal: 'Describe family members and relationships',
    characterName: 'Diego',
    characterRole: 'Amigo compartiendo fotos',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-emerald-600/20 to-teal-600/20',
    initialMessage: {
      text: '¡Mira esta foto de mi familia! Tengo dos hermanos y una hermana menor. ¿Tienes una familia grande?',
      translation: 'Look at this photo of my family! I have two brothers and a younger sister. Do you have a big family?',
      signOff: 'Un abrazo, Diego',
      quickReplies: [
        { text: 'Tengo una familia pequeña: mis padres, mi hermano y yo.', translation: 'I have a small family: my parents, my brother, and me.' },
        { text: '¿Cuántos años tienen tus hermanos?', translation: 'How old are your siblings?' },
        { text: 'Vivo con mis abuelos y mi perro.', translation: 'I live with my grandparents and my dog.' }
      ]
    }
  },
  {
    id: 'plans',
    topicNumber: 11,
    title: 'Making Plans with Friends',
    icon: '🎉',
    cefr: 'A2',
    goal: 'Invite someone and arrange a meeting',
    characterName: 'Javier',
    characterRole: 'Amigo entusiasta',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-purple-500/20 to-indigo-600/20',
    initialMessage: {
      text: '¡Oye! Este fin de semana hay un concierto al aire libre en el parque. ¿Te apetece venir conmigo?',
      translation: 'Hey! This weekend there is an outdoor concert in the park. Do you feel like coming with me?',
      signOff: '¡Hablamos pronto! Javier',
      quickReplies: [
        { text: '¡Me encantaría! ¿A qué hora quedamos el sábado?', translation: 'I would love to! What time are we meeting on Saturday?' },
        { text: '¿Cuánto cuesta la entrada para el evento?', translation: 'How much is the ticket for the event?' },
        { text: 'Lo siento, este fin de semana estoy ocupado.', translation: 'I am sorry, this weekend I am busy.' }
      ]
    }
  },
  {
    id: 'work',
    topicNumber: 12,
    title: 'First Day at Work',
    icon: '💼',
    cefr: 'A2',
    goal: 'Meet coworkers and ask workplace questions',
    characterName: 'Marta',
    characterRole: 'Compañera de equipo',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-slate-600/20 to-gray-600/20',
    initialMessage: {
      text: '¡Bienvenido a la oficina! Soy Marta del equipo de diseño. Te enseñaré tu mesa de trabajo.',
      translation: 'Welcome to the office! I am Marta from the design team. I will show you your desk.',
      signOff: 'Mucho éxito, Marta',
      quickReplies: [
        { text: '¡Hola Marta! Muchas gracias. ¿Dónde está la cocina o la máquina de café?', translation: 'Hello Marta! Thank you very much. Where is the kitchen or coffee machine?' },
        { text: '¿A qué hora suele comer el equipo?', translation: 'What time does the team usually have lunch?' },
        { text: 'Estoy muy entusiasmado por empezar a trabajar aquí.', translation: 'I am very excited to start working here.' }
      ]
    }
  },
  {
    id: 'weather',
    topicNumber: 13,
    title: 'Talking About Weather',
    icon: '🌤️',
    cefr: 'A1',
    goal: 'Discuss today weather and suitable activities',
    characterName: 'Gabriel',
    characterRole: 'Guía turístico local',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-yellow-400/20 to-amber-500/20',
    initialMessage: {
      text: '¡Hace un día maravilloso y muy soleado! ¿Qué planes tienes para disfrutar del buen tiempo?',
      translation: 'It is a wonderful and very sunny day! What plans do you have to enjoy the good weather?',
      signOff: 'Saludos soleados, Gabriel',
      quickReplies: [
        { text: 'Voy a dar un paseo por la playa y tomar un helado.', translation: 'I am going for a walk on the beach and to have an ice cream.' },
        { text: '¿Crees que va a llover esta tarde?', translation: 'Do you think it is going to rain this afternoon?' },
        { text: 'Prefiero estar dentro porque hace demasiado calor.', translation: 'I prefer to stay inside because it is too hot.' }
      ]
    }
  },
  {
    id: 'hobbies',
    topicNumber: 14,
    title: 'Hobbies & Free Time',
    icon: '🎮',
    cefr: 'A1',
    goal: 'Talk about interests and favorite activities',
    characterName: 'Valeria',
    characterRole: 'Compañera de aficiones',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-fuchsia-500/20 to-pink-500/20',
    initialMessage: {
      text: '¡Hola! En mi tiempo libre me encanta escuchar música y jugar videojuegos. ¿Qué te gusta hacer a ti?',
      translation: 'Hello! In my free time I love listening to music and playing video games. What do you like to do?',
      signOff: 'Un abrazo creativo, Valeria',
      quickReplies: [
        { text: 'Me gusta mucho leer libros de misterio y hacer deporte.', translation: 'I really like reading mystery books and doing sports.' },
        { text: 'Mi afición favorita es cocinar platos italianos.', translation: 'My favorite hobby is cooking Italian dishes.' },
        { text: 'Suelo ver series y películas los fines de semana.', translation: 'I usually watch series and movies on weekends.' }
      ]
    }
  },
  {
    id: 'services',
    topicNumber: 15,
    title: 'Everyday Services',
    icon: '🏦',
    cefr: 'A2',
    goal: 'Visit a bank, post office, or pharmacy for help',
    characterName: 'Manuel',
    characterRole: 'Atención al cliente',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bgGradient: 'from-blue-600/20 to-slate-700/20',
    initialMessage: {
      text: '¡Buenos días! Bienvenido a la oficina de correos y servicios. ¿En qué le puedo asistir hoy?',
      translation: 'Good morning! Welcome to the post office and services center. How can I assist you today?',
      signOff: 'A su disposición, Manuel',
      quickReplies: [
        { text: 'Quisiera enviar este paquete a México por correo certificado.', translation: 'I would like to send this package to Mexico by registered mail.' },
        { text: '¿Necesito algún documento para abrir una cuenta bancaria?', translation: 'Do I need any document to open a bank account?' },
        { text: 'Busco medicina para el dolor de cabeza sin receta.', translation: 'I am looking for over-the-counter headache medicine.' }
      ]
    }
  }
];
