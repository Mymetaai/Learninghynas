export interface SyllabusLessonData {
  lessonNumber: number;
  partNumber: number;
  title: string;
  subtitle: string;
  professorNote: string;
  objectives: string[];
  grammarSections: {
    title: string;
    explanation?: string;
    rules?: string[];
    table?: { headers: string[]; rows: string[][] };
    acronym?: { name: string; items: { letter: string; meaning: string; example: string }[] };
    callout?: string;
  }[];
  vocabularyTable: {
    spanish: string;
    phonetic: string;
    english: string;
    usage: string;
  }[];
  exampleSentences: {
    spanish: string;
    english: string;
    breakdown: string;
  }[];
  dialogue: {
    speaker: string;
    spanish: string;
    english: string;
  }[];
  quickPractice: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export const ALL_SYLLABUS_LESSONS: Record<string, SyllabusLessonData> = {
  lesson1: {
    lessonNumber: 1,
    partNumber: 1,
    title: 'Intro to Spanish & Vowel Pronunciation',
    subtitle: 'Vowels, Greetings, and Polite Address',
    professorNote: 'Welcome to Spanish! Unlike English where vowels have multiple shifting sounds, Spanish has exactly 5 pure, consistent vowel sounds.',
    objectives: [
      'Master pure pronunciation of Spanish vowels (A, E, I, O, U)',
      'Learn time-appropriate greetings and polite farewells',
      'Distinguish informal (tú) vs formal (usted) address'
    ],
    grammarSections: [
      {
        title: 'The 5 Pure Spanish Vowels',
        explanation: 'Spanish vowels never glide into diphthongs like English vowels. Keep your jaw steady when pronouncing them.',
        table: {
          headers: ['Vowel', 'Phonetic Sound', 'English Keyword Equivalent', 'Spanish Example Words'],
          rows: [
            ['A', 'ah', 'like "a" in father', 'casa (house), cantar (to sing)'],
            ['E', 'eh', 'like "e" in met', 'mesa (table), el (the)'],
            ['I', 'ee', 'like "ee" in machine', 'isla (island), libro (book)'],
            ['O', 'oh', 'like "o" in door (pure)', 'sol (sun), gato (cat)'],
            ['U', 'oo', 'like "oo" in boot', 'uno (one), luna (moon)']
          ]
        },
        callout: 'Tip: Vowels ending words are crisp and short. Never add an "w" or "y" off-glide to Spanish "o" or "e".'
      },
      {
        title: 'Greetings & Formal Register (Tú vs Usted)',
        explanation: 'Greeting someone depends on the time of day and your social relationship.',
        rules: [
          'Buenos días — Used from sunrise until noon (12:00 PM).',
          'Buenas tardes — Used from noon (12:00 PM) until sunset/darkness.',
          'Buenas noches — Used after dark as both a greeting and goodnight.',
          '¿Cómo estás? (Tú) — Informal. Use with peers, children, friends, and family.',
          '¿Cómo está usted? (Usted) — Formal. Use with professors, elders, strangers, and superiors.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: '¡Hola!', phonetic: 'OH-lah', english: 'Hello! / Hi!', usage: 'Universal friendly greeting' },
      { spanish: 'Buenos días', phonetic: 'BWEH-nohs DEE-ahs', english: 'Good morning', usage: 'Used before noon' },
      { spanish: 'Buenas tardes', phonetic: 'BWEH-nahs TAR-dehs', english: 'Good afternoon', usage: 'Used between 12 PM and dark' },
      { spanish: 'Buenas noches', phonetic: 'BWEH-nahs NOH-chehs', english: 'Good evening / Good night', usage: 'Used after dark' },
      { spanish: '¿Cómo te llamas?', phonetic: 'KOH-moh teh YAH-mahs', english: 'What is your name? (informal)', usage: 'Asking a peer' },
      { spanish: 'Me llamo...', phonetic: 'Meh YAH-moh', english: 'My name is...', usage: 'Stating your name' },
      { spanish: 'Mucho gusto', phonetic: 'MOO-choh GOOS-toh', english: 'Nice to meet you', usage: 'Polite initial reply' },
      { spanish: 'Hasta luego', phonetic: 'AHS-tah LWEH-goh', english: 'See you later', usage: 'Most common farewell' }
    ],
    exampleSentences: [
      { spanish: '¡Hola! Buenos días, ¿cómo está usted?', english: 'Hello! Good morning, how are you (formal)?', breakdown: 'Formal greeting to a professor or elder.' },
      { spanish: 'Me llamo Elena. Mucho gusto en conocerte.', english: 'My name is Elena. Nice to meet you.', breakdown: 'Standard introduction pairing.' },
      { spanish: 'Hasta mañana, nos vemos en la escuela.', english: 'See you tomorrow, we see each other at school.', breakdown: 'Friendly goodbye between students.' }
    ],
    dialogue: [
      { speaker: 'Profesor Worden', spanish: '¡Buenos días, estudiante! ¿Cómo estás?', english: 'Good morning, student! How are you?' },
      { speaker: 'Estudiante', spanish: 'Buenos días, profesor. Muy bien, gracias. ¿Y usted?', english: 'Good morning, professor. Very well, thank you. And you?' },
      { speaker: 'Profesor Worden', spanish: 'Excelente, gracias. ¡Mucho gusto!', english: 'Excellent, thank you. Pleased to meet you!' }
    ],
    quickPractice: {
      question: 'How do you politely ask a professor for their name in Spanish?',
      options: ['¿Cómo te llamas?', '¿Cómo se llama usted?', '¿Qué tal bro?', '¿Quién es tú?'],
      correctAnswer: '¿Cómo se llama usted?',
      explanation: 'Usted is used for formal address with professors and authority figures.'
    }
  },

  lesson2: {
    lessonNumber: 2,
    partNumber: 1,
    title: 'Nouns & Definite Articles',
    subtitle: 'Grammatical Gender, Singular & Plural Articles (El, La, Los, Las)',
    professorNote: 'Every noun in Spanish has a grammatical gender (masculine or feminine). It does not mean objects are male or female, but they belong to grammatical agreements.',
    objectives: [
      'Understand masculine (-o) and feminine (-a, -ción, -dad) noun patterns',
      'Master definite articles: EL, LA, LOS, LAS',
      'Learn key masculine/feminine exception nouns (el mapa, la mano, el agua)'
    ],
    grammarSections: [
      {
        title: 'Definite Articles & Gender Concordance',
        explanation: 'Articles must match both the gender and number of the noun they describe.',
        table: {
          headers: ['Number', 'Masculine Article', 'Feminine Article', 'Examples'],
          rows: [
            ['Singular ("The")', 'EL', 'LA', 'el libro (the book) / la casa (the house)'],
            ['Plural ("The")', 'LOS', 'LAS', 'los libros (the books) / las casas (the houses)']
          ]
        }
      },
      {
        title: 'Noun Endings & Major Exceptions',
        explanation: 'While -o is usually masculine and -a feminine, memorize these crucial exceptions from the syllabus workbook.',
        rules: [
          'Nouns ending in -o are typically masculine: el chico, el gato, el carro.',
          'Nouns ending in -a, -ción, -sión, -dad, -tad are feminine: la casa, la lección, la ciudad, la libertad.',
          'EXCEPTION 1 (Greek origin -ma/-pa endings): el mapa (the map), el problema (the problem), el tema (the topic), el día (the day).',
          'EXCEPTION 2 (Shortened forms): la mano (hand), la foto (fotografía), la moto (motocicleta).',
          'STRESSED "A" RULE: Feminine singular nouns starting with stressed "a" use EL in singular to prevent awkward sound, but remain feminine in plural: el agua -> las aguas, el hacha -> las hachas.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'el libro', phonetic: 'ehl LEE-broh', english: 'the book', usage: 'Masculine singular' },
      { spanish: 'la mesa', phonetic: 'lah MEH-sah', english: 'the table', usage: 'Feminine singular' },
      { spanish: 'el mapa', phonetic: 'ehl MAH-pah', english: 'the map', usage: 'Masculine exception (-a ending)' },
      { spanish: 'la mano', phonetic: 'lah MAH-noh', english: 'the hand', usage: 'Feminine exception (-o ending)' },
      { spanish: 'el agua', phonetic: 'ehl AH-gwah', english: 'the water', usage: 'Stressed "a" feminine noun' },
      { spanish: 'la lección', phonetic: 'lah lehks-YOHN', english: 'the lesson', usage: 'Feminine ending in -ción' },
      { spanish: 'los libros', phonetic: 'lohs LEE-brohs', english: 'the books', usage: 'Masculine plural' },
      { spanish: 'las casas', phonetic: 'lahs KAH-sahs', english: 'the houses', usage: 'Feminine plural' }
    ],
    exampleSentences: [
      { spanish: 'El mapa está en la mesa.', english: 'The map is on the table.', breakdown: 'Uses masculine "el mapa" and feminine "la mesa".' },
      { spanish: 'Las universidades son grandes.', english: 'The universities are large.', breakdown: 'Plural feminine agreement: las universidades.' },
      { spanish: 'El agua fría es buena.', english: 'The cold water is good.', breakdown: 'El agua uses "el" singular, but adjective "fría" remains feminine!' }
    ],
    dialogue: [
      { speaker: 'Estudiante 1', spanish: '¿Tienes el mapa de la ciudad?', english: 'Do you have the map of the city?' },
      { speaker: 'Estudiante 2', spanish: 'Sí, el mapa y las lecciones están en el libro.', english: 'Yes, the map and the lessons are in the book.' }
    ],
    quickPractice: {
      question: 'What is the correct singular article for "problema"?',
      options: ['la problema', 'el problema', 'las problema', 'los problema'],
      correctAnswer: 'el problema',
      explanation: 'Nouns ending in Greek -ma (problema, tema, sistema) are masculine exceptions taking "el".'
    }
  },

  lesson3: {
    lessonNumber: 3,
    partNumber: 1,
    title: 'Subject Pronouns & Verb SER',
    subtitle: 'Conjugating SER (Identity, Origin & Characteristics)',
    professorNote: 'SER is one of Spanish\'s most essential irregular verbs. It defines who you are, where you are from, and your inherent traits.',
    objectives: [
      'Learn all 12 Spanish subject pronouns',
      'Master the full present tense conjugation of SER (soy, eres, es, somos, sois, son)',
      'Apply the DOCTOR acronym for when to use SER'
    ],
    grammarSections: [
      {
        title: 'Spanish Subject Pronouns Table',
        explanation: 'Subject pronouns replace names. Note that Spanish often omits the pronoun because verb endings clarify who is speaking.',
        table: {
          headers: ['Person', 'Singular', 'Plural'],
          rows: [
            ['1st Person', 'Yo (I)', 'Nosotros / Nosotras (We)'],
            ['2nd Person (Informal)', 'Tú (You)', 'Vosotros / Vosotras (You all - Spain)'],
            ['2nd Person (Formal)', 'Usted / Ud. (You)', 'Ustedes / Uds. (You all - LatAm & Spain)'],
            ['3rd Person', 'Él (He) / Ella (She)', 'Ellos (They m.) / Ellas (They f.)']
          ]
        }
      },
      {
        title: 'Full Conjugation Matrix of SER',
        explanation: 'SER is irregular. You must memorize these forms by heart.',
        table: {
          headers: ['Pronoun', 'SER Form', 'English Meaning', 'Example Sentence'],
          rows: [
            ['Yo', 'soy', 'I am', 'Yo soy estudiante.'],
            ['Tú', 'eres', 'You are (informal)', 'Tú eres inteligente.'],
            ['Él / Ella / Ud.', 'es', 'He/She/You formal is', 'Ella es profesora.'],
            ['Nosotros/as', 'somos', 'We are', 'Nosotros somos amigos.'],
            ['Vosotros/as', 'sois', 'You all are (Spain)', 'Vosotros sois de Madrid.'],
            ['Ellos / Ellas / Uds.', 'son', 'They / You all are', 'Ellos son de México.']
          ]
        }
      },
      {
        title: 'The D.O.C.T.O.R. Rule for SER',
        explanation: 'Use SER when describing Permanent or Essential attributes:',
        acronym: {
          name: 'D.O.C.T.O.R.',
          items: [
            { letter: 'D', meaning: 'Description', example: 'Él es alto y simpático.' },
            { letter: 'O', meaning: 'Occupation', example: 'Soy médico en el hospital.' },
            { letter: 'C', meaning: 'Characteristic', example: 'El perro es inteligente.' },
            { letter: 'T', meaning: 'Time & Date', example: 'Hoy es lunes, son las dos.' },
            { letter: 'O', meaning: 'Origin', example: 'Nosotros somos de España.' },
            { letter: 'R', meaning: 'Relationship', example: 'María es mi hermana.' }
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'estudiante', phonetic: 'ehs-too-DYAHN-teh', english: 'student', usage: 'Occupation/Role' },
      { spanish: 'profesor / profesora', phonetic: 'proh-feh-SOHR', english: 'teacher / professor', usage: 'Occupation' },
      { spanish: 'amigo / amiga', phonetic: 'ah-MEE-goh', english: 'friend', usage: 'Relationship' },
      { spanish: 'de', phonetic: 'deh', english: 'from / of', usage: 'Origin preposition' },
      { spanish: 'inteligente', phonetic: 'een-teh-lee-HEHN-teh', english: 'intelligent', usage: 'Description' },
      { spanish: 'simpático / a', phonetic: 'seem-PAH-tee-koh', english: 'nice / friendly', usage: 'Personality trait' }
    ],
    exampleSentences: [
      { spanish: 'Tú y yo somos estudiantes de español.', english: 'You and I are Spanish students.', breakdown: 'Tú y yo = nosotros -> somos.' },
      { spanish: '¿De dónde eres tú? Yo soy de los Estados Unidos.', english: 'Where are you from? I am from the United States.', breakdown: 'Origin question with ser.' },
      { spanish: 'Ellas son mis hermanas.', english: 'They are my sisters.', breakdown: 'Relationship classification uses son.' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: '¡Hola! ¿Eres tú el nuevo estudiante?', english: 'Hi! Are you the new student?' },
      { speaker: 'Mateo', spanish: 'Sí, yo soy Mateo. Soy de Colombia. ¿Y tú?', english: 'Yes, I am Mateo. I am from Colombia. And you?' },
      { speaker: 'Ana', spanish: 'Yo soy Ana, soy de Madrid. ¡Mucho gusto!', english: 'I am Ana, I am from Madrid. Nice to meet you!' }
    ],
    quickPractice: {
      question: 'Which form of SER completes: "Mis padres ___ de México"?',
      options: ['es', 'somos', 'son', 'sois'],
      correctAnswer: 'son',
      explanation: '"Mis padres" (my parents) corresponds to "ellos" (they), taking "son".'
    }
  },

  lesson4: {
    lessonNumber: 4,
    partNumber: 1,
    title: 'Regular -AR Verbs in Present Tense',
    subtitle: 'Conjugating Action Verbs (Hablar, Estudiar, Trabajar)',
    professorNote: 'Verbs are the engine of Spanish! -AR verbs are the largest verb family in Spanish. Master the endings to speak hundreds of sentences.',
    objectives: [
      'Drop the -AR infinitive ending to find the verb root',
      'Attach present tense endings: -o, -as, -a, -amos, -áis, -an',
      'Build negative sentences using NO before the verb'
    ],
    grammarSections: [
      {
        title: 'Present Tense -AR Verb Endings',
        explanation: 'To conjugate any regular -AR verb, drop the "-ar" from the infinitive (e.g. hablar -> habl-) and add the ending matching the subject.',
        table: {
          headers: ['Subject', 'Ending', 'Hablar (to speak)', 'Estudiar (to study)', 'Trabajar (to work)'],
          rows: [
            ['Yo', '-o', 'hablo', 'estudio', 'trabajo'],
            ['Tú', '-as', 'hablas', 'estudias', 'trabajas'],
            ['Él / Ella / Ud.', '-a', 'habla', 'estudia', 'trabaja'],
            ['Nosotros/as', '-amos', 'hablamos', 'estudiamos', 'trabajamos'],
            ['Vosotros/as', '-áis', 'habláis', 'estudiáis', 'trabajáis'],
            ['Ellos / Ellas / Uds.', '-an', 'hablan', 'estudian', 'trabajan']
          ]
        }
      },
      {
        title: 'Forming Negative Sentences',
        explanation: 'To make a sentence negative in Spanish, place "NO" directly BEFORE the conjugated verb.',
        rules: [
          'Positive: Yo hablo español. (I speak Spanish.)',
          'Negative: Yo NO hablo francés. (I do not speak French.)',
          'Question: ¿Estudias tú mucho? (Do you study a lot?)',
          'Negative Answer: No, no estudio mucho. (No, I do not study a lot.)'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'hablar', phonetic: 'ah-BLAHR', english: 'to speak / talk', usage: 'Core -AR verb' },
      { spanish: 'estudiar', phonetic: 'ehs-too-DYAHR', english: 'to study', usage: 'Core -AR verb' },
      { spanish: 'trabajar', phonetic: 'trah-bah-HAHR', english: 'to work', usage: 'Core -AR verb' },
      { spanish: 'buscar', phonetic: 'boos-KAHR', english: 'to search / look for', usage: 'Direct object without preposition' },
      { spanish: 'necesitar', phonetic: 'neh-seh-see-TAHR', english: 'to need', usage: 'Needs infinitive or noun' },
      { spanish: 'comprar', phonetic: 'kohm-PRAHR', english: 'to buy', usage: 'Shopping verb' },
      { spanish: 'escuchar', phonetic: 'ehs-koo-CHAHR', english: 'to listen to', usage: 'Includes "to"' },
      { spanish: 'practicar', phonetic: 'prahk-tee-KAHR', english: 'to practice', usage: 'Skill practice' }
    ],
    exampleSentences: [
      { spanish: 'Nosotros estudiamos español todos los días.', english: 'We study Spanish every day.', breakdown: 'Estudiar conjugated for nosotros (-amos).' },
      { spanish: '¿Trabajas tú en un hospital?', english: 'Do you work in a hospital?', breakdown: 'Question format by swapping pronoun and verb.' },
      { spanish: 'No, yo no compro el libro caro.', english: 'No, I do not buy the expensive book.', breakdown: 'Double "no": first answers question, second negates verb.' }
    ],
    dialogue: [
      { speaker: 'María', spanish: '¿Qué estudias tú en la universidad?', english: 'What do you study at university?' },
      { speaker: 'Juan', spanish: 'Estudio literatura. ¿Y tú? ¿Trabajas?', english: 'I study literature. And you? Do you work?' },
      { speaker: 'María', spanish: 'Sí, trabajo en una biblioteca y hablo español con los clientes.', english: 'Yes, I work in a library and speak Spanish with clients.' }
    ],
    quickPractice: {
      question: 'Conjugate "buscar" for "Ellos":',
      options: ['busco', 'buscas', 'busca', 'buscan'],
      correctAnswer: 'buscan',
      explanation: 'Ellos uses ending "-an": buscan.'
    }
  },

  lesson5: {
    lessonNumber: 5,
    partNumber: 2,
    title: 'Indefinite Articles & Numbers 0–100',
    subtitle: 'Un, Una, Unos, Unas & Counting in Spanish',
    professorNote: 'Indefinite articles introduce unspecific items ("a book", "some girls"). Pair them with Spanish numbers to quantify everything around you.',
    objectives: [
      'Master indefinite articles: UN, UNA, UNOS, UNAS',
      'Learn numbers 0 to 100 with accurate spelling',
      'Apply the "tens + y + units" rule for numbers 31–99'
    ],
    grammarSections: [
      {
        title: 'Indefinite Articles (A, An, Some)',
        explanation: 'Indefinite articles agree with nouns in gender and number.',
        table: {
          headers: ['Gender / Number', 'Singular ("A / An")', 'Plural ("Some / A few")', 'Example'],
          rows: [
            ['Masculine', 'UN', 'UNOS', 'un chico (a boy) / unos chicos (some boys)'],
            ['Feminine', 'UNA', 'UNAS', 'una manzana (an apple) / unas manzanas (some apples)']
          ]
        }
      },
      {
        title: 'Numbers 0 to 100 Construction Rules',
        explanation: 'Learn the base tens and combining formulas.',
        rules: [
          '0-15: Unique words: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince.',
          '16-29: Combined single words: dieciséis, diecisiete, dieciocho, diecinueve, veinte, veintiuno, veintidós, veintitrés... veintinueve.',
          '30-90 (Tens): treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien.',
          '31-99 Formula: Three separate words: [Ten] + Y + [Unit] (e.g. 35 = treinta y cinco, 74 = setenta y cuatro).'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'un / una', phonetic: 'oon / OO-nah', english: 'a / an', usage: 'Singular indefinite article' },
      { spanish: 'unos / unas', phonetic: 'OO-nohs / OO-nahs', english: 'some / a few', usage: 'Plural indefinite article' },
      { spanish: 'diez', phonetic: 'DYEHS', english: 'ten (10)', usage: 'Number' },
      { spanish: 'veinte', phonetic: 'VAYN-teh', english: 'twenty (20)', usage: 'Number' },
      { spanish: 'treinta', phonetic: 'TRAYN-tah', english: 'thirty (30)', usage: 'Number' },
      { spanish: 'cuarenta', phonetic: 'kwah-REHN-tah', english: 'forty (40)', usage: 'Number' },
      { spanish: 'cincuenta', phonetic: 'seen-KWEHN-tah', english: 'fifty (50)', usage: 'Number' },
      { spanish: 'cien', phonetic: 'SYEHN', english: 'one hundred (100)', usage: 'Used before nouns or exactly 100' }
    ],
    exampleSentences: [
      { spanish: 'Tengo unos libros y una pluma.', english: 'I have some books and a pen.', breakdown: 'Uses masculine plural "unos" and feminine singular "una".' },
      { spanish: 'Hay cuarenta y cinco estudiantes en la clase.', english: 'There are forty-five students in the class.', breakdown: 'Cuarenta y cinco follows the 31-99 three-word rule.' }
    ],
    dialogue: [
      { speaker: 'Vendedor', spanish: '¿Cuánto cuesta esa camisa?', english: 'How much does that shirt cost?' },
      { speaker: 'Comprador', spanish: 'Cuesta treinta y cinco dólares.', english: 'It costs thirty-five dollars.' }
    ],
    quickPractice: {
      question: 'How do you write "58" in Spanish?',
      options: ['cincuenta y ocho', 'cincuentaocho', 'veintiocho', 'cincuenta u ocho'],
      correctAnswer: 'cincuenta y ocho',
      explanation: 'Numbers 31-99 use 3 separate words: tens + y + units.'
    }
  },

  lesson6: {
    lessonNumber: 6,
    partNumber: 2,
    title: 'Verb ESTAR & Numbers Over 100',
    subtitle: 'Conjugating ESTAR, PLACE Acronym & Counting >100',
    professorNote: 'Unlike SER (permanent nature), ESTAR expresses temporary conditions, emotional states, and physical locations.',
    objectives: [
      'Master the conjugation of ESTAR (estoy, estás, está, estamos, estáis, están)',
      'Apply the P.L.A.C.E. mnemonic for when to use ESTAR',
      'Learn numbers above 100 (ciento, quinientos, mil)'
    ],
    grammarSections: [
      {
        title: 'Conjugation Table of ESTAR',
        explanation: 'Note the accent marks on estás, está, estáis, and están!',
        table: {
          headers: ['Subject', 'ESTAR Form', 'English', 'Example'],
          rows: [
            ['Yo', 'estoy', 'I am', 'Yo estoy en casa.'],
            ['Tú', 'estás', 'You are', '¿Dónde estás tú?'],
            ['Él / Ella / Ud.', 'está', 'He/She/You formal is', 'Él está cansado.'],
            ['Nosotros/as', 'estamos', 'We are', 'Estamos listos.'],
            ['Vosotros/as', 'estáis', 'You all are', 'Vosotros estáis aquí.'],
            ['Ellos / Ellas / Uds.', 'están', 'They / You all are', 'Ellos están felices.']
          ]
        }
      },
      {
        title: 'The P.L.A.C.E. Rule for ESTAR',
        acronym: {
          name: 'P.L.A.C.E.',
          items: [
            { letter: 'P', meaning: 'Position', example: 'El libro está en la mesa.' },
            { letter: 'L', meaning: 'Location', example: 'Madrid está en España.' },
            { letter: 'A', meaning: 'Action (Progressive)', example: 'Estoy estudiando ahora.' },
            { letter: 'C', meaning: 'Condition', example: 'La puerta está cerrada.' },
            { letter: 'E', meaning: 'Emotion', example: 'Ella está contenta hoy.' }
          ]
        }
      },
      {
        title: 'Numbers Over 100 Reference',
        explanation: 'Notice irregular hundred forms like 500 (quinientos), 700 (setecientos), 900 (novecientos).',
        rules: [
          '100 exact = cien. 101-199 = ciento uno, ciento dos...',
          '200 = doscientos / doscientas',
          '500 = quinientos / quinientas (IRREGULAR)',
          '700 = setecientos / setecientas (IRREGULAR)',
          '900 = novecientos / novecientas (IRREGULAR)',
          '1,000 = mil. 2,000 = dos mil.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'estoy', phonetic: 'ehs-TOY', english: 'I am (location/state)', usage: 'ESTAR 1st person' },
      { spanish: 'estás', phonetic: 'ehs-TAHS', english: 'you are (location/state)', usage: 'ESTAR 2nd person' },
      { spanish: 'cansado / a', phonetic: 'kahn-SAH-doh', english: 'tired', usage: 'Condition (Estar)' },
      { spanish: 'ocupado / a', phonetic: 'oh-koo-PAH-doh', english: 'busy', usage: 'Condition (Estar)' },
      { spanish: 'feliz / contento', phonetic: 'feh-LEES', english: 'happy / content', usage: 'Emotion (Estar)' },
      { spanish: 'quinientos', phonetic: 'kee-NYEHN-tohs', english: 'five hundred (500)', usage: 'Irregular hundred' },
      { spanish: 'mil', phonetic: 'meel', english: 'one thousand (1,000)', usage: 'Number' }
    ],
    exampleSentences: [
      { spanish: '¿Dónde están Uds.? Estamos en la biblioteca.', english: 'Where are you all? We are at the library.', breakdown: 'Location rule uses estar.' },
      { spanish: 'El hotel cuesta quinientos dólares.', english: 'The hotel costs five hundred dollars.', breakdown: 'Quinientos = 500.' }
    ],
    dialogue: [
      { speaker: 'Carlos', spanish: '¡Hola Laura! ¿Cómo estás hoy?', english: 'Hi Laura! How are you today?' },
      { speaker: 'Laura', spanish: 'Estoy muy ocupada pero feliz. ¿Y tú?', english: 'I am very busy but happy. And you?' }
    ],
    quickPractice: {
      question: 'Which sentence correctly describes temporary emotion?',
      options: ['Ella es triste hoy.', 'Ella está triste hoy.', 'Ella somos triste hoy.', 'Ella estar triste hoy.'],
      correctAnswer: 'Ella está triste hoy.',
      explanation: 'Emotions are temporary states governed by ESTAR.'
    }
  },

  lesson7: {
    lessonNumber: 7,
    partNumber: 2,
    title: 'Regular -ER & -IR Verbs in Present',
    subtitle: 'Conjugating Comer, Beber, Vivir & Escribir',
    professorNote: '-ER and -IR verbs share almost identical present tense endings, differing only in the nosotros (-emos vs -imos) and vosotros (-éis vs -ís) forms.',
    objectives: [
      'Conjugate regular -ER verbs (-o, -es, -e, -emos, -éis, -en)',
      'Conjugate regular -IR verbs (-o, -es, -e, -imos, -ís, -en)',
      'Expand vocabulary with common daily action verbs'
    ],
    grammarSections: [
      {
        title: 'Side-by-Side Endings Comparison',
        explanation: 'Compare how -ER and -IR verbs conjugate.',
        table: {
          headers: ['Subject', '-ER Ending (Comer)', '-IR Ending (Vivir)', 'Comer Example', 'Vivir Example'],
          rows: [
            ['Yo', '-o', '-o', 'como (I eat)', 'vivo (I live)'],
            ['Tú', '-es', '-es', 'comes (you eat)', 'vives (you live)'],
            ['Él / Ella / Ud.', '-e', '-e', 'come (he eats)', 'vive (she lives)'],
            ['Nosotros/as', '-emos', '-imos', 'comemos (we eat)', 'vivimos (we live)'],
            ['Vosotros/as', '-éis', '-ís', 'coméis (you all eat)', 'vivís (you all live)'],
            ['Ellos / Ellas / Uds.', '-en', '-en', 'comen (they eat)', 'viven (they live)']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'comer', phonetic: 'koh-MEHR', english: 'to eat', usage: 'Regular -ER verb' },
      { spanish: 'beber', phonetic: 'beh-BEHR', english: 'to drink', usage: 'Regular -ER verb' },
      { spanish: 'aprender', phonetic: 'ah-prehn-DEHR', english: 'to learn', usage: 'Regular -ER verb' },
      { spanish: 'comprender', phonetic: 'kohm-prehn-DEHR', english: 'to understand', usage: 'Regular -ER verb' },
      { spanish: 'vivir', phonetic: 'vee-VEER', english: 'to live', usage: 'Regular -IR verb' },
      { spanish: 'escribir', phonetic: 'ehs-kree-BEER', english: 'to write', usage: 'Regular -IR verb' },
      { spanish: 'abrir', phonetic: 'ah-BREER', english: 'to open', usage: 'Regular -IR verb' }
    ],
    exampleSentences: [
      { spanish: 'Nosotros comemos tacos y bebemos agua.', english: 'We eat tacos and drink water.', breakdown: 'Comer (-emos) and beber (-emos).' },
      { spanish: '¿Dónde vives tú? Vivo en Madrid.', english: 'Where do you live? I live in Madrid.', breakdown: 'Vivir conjugated for tú and yo.' }
    ],
    dialogue: [
      { speaker: 'Pedro', spanish: '¿Comes tú carne?', english: 'Do you eat meat?' },
      { speaker: 'Sofía', spanish: 'No, no como carne. Bebo leche y como frutas.', english: 'No, I don\'t eat meat. I drink milk and eat fruits.' }
    ],
    quickPractice: {
      question: 'What is the "nosotros" form of "escribir"?',
      options: ['escribemos', 'escribimos', 'escriben', 'escribo'],
      correctAnswer: 'escribimos',
      explanation: '-IR verbs take "-imos" for nosotros: escribimos.'
    }
  },

  lesson8: {
    lessonNumber: 8,
    partNumber: 2,
    title: 'Irregular Verb IR & Near Future',
    subtitle: 'Conjugating IR, Destinations & Question Words',
    professorNote: 'IR (to go) is highly irregular. Combined with "a + infinitive", it unlocks the near future tense ("I am going to study").',
    objectives: [
      'Conjugate irregular verb IR (voy, vas, va, vamos, vais, van)',
      'Form near future sentences using IR + A + INFINITIVE',
      'Master essential Spanish question words (¿Qué?, ¿Dónde?, ¿Adónde?)'
    ],
    grammarSections: [
      {
        title: 'Conjugation Matrix of IR (To Go)',
        explanation: 'IR has no "i" in its present tense forms!',
        table: {
          headers: ['Subject', 'IR Conjugation', 'English', 'Destination Example'],
          rows: [
            ['Yo', 'voy', 'I go / am going', 'Yo voy al parque.'],
            ['Tú', 'vas', 'You go', '¿Vas a la clase?'],
            ['Él / Ella / Ud.', 'va', 'He / She goes', 'Ella va al cine.'],
            ['Nosotros/as', 'vamos', 'We go', 'Vamos a la playa.'],
            ['Vosotros/as', 'vais', 'You all go', 'Vosotros vais a casa.'],
            ['Ellos / Ellas / Uds.', 'van', 'They go', 'Ellos van a España.']
          ]
        },
        callout: 'Contraction Rule: A + EL contracts into AL. (e.g. voy a + el parque -> voy al parque).'
      },
      {
        title: 'Near Future Formula & Interrogatives Grid',
        explanation: 'Formula: [Conjugated IR] + A + [Infinitive Verb]',
        rules: [
          'Voy a comer = I am going to eat.',
          'Vamos a estudiar = We are going to study.',
          '¿Qué? = What?',
          '¿Quién? / ¿Quiénes? = Who?',
          '¿Dónde? = Where (location)?',
          '¿Adónde? = Where to (destination)?',
          '¿Cuándo? = When?',
          '¿Por qué? = Why? (Answer: Porque... = Because...)'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'voy', phonetic: 'voy', english: 'I go / am going', usage: 'IR 1st person' },
      { spanish: 'al (a + el)', phonetic: 'ahl', english: 'to the (masculine singular)', usage: 'Mandatory contraction' },
      { spanish: 'a la', phonetic: 'ah lah', english: 'to the (feminine singular)', usage: 'Preposition + article' },
      { spanish: '¿Adónde?', phonetic: 'ah-DOHN-deh', english: 'Where to?', usage: 'Destination question' },
      { spanish: '¿Por qué?', phonetic: 'pohr KEH', english: 'Why?', usage: 'Question (two words, accent)' },
      { spanish: 'porque', phonetic: 'pohr-keh', english: 'because', usage: 'Answer (one word, no accent)' }
    ],
    exampleSentences: [
      { spanish: '¿Adónde vas tú? Voy al supermercado.', english: 'Where are you going? I am going to the supermarket.', breakdown: 'Uses ¿Adónde? for destination and contraction "al".' },
      { spanish: 'Esta noche vamos a estudiar para el examen.', english: 'Tonight we are going to study for the exam.', breakdown: 'Near future: vamos + a + estudiar.' }
    ],
    dialogue: [
      { speaker: 'Diego', spanish: '¿Adónde van Uds. este fin de semana?', english: 'Where are you all going this weekend?' },
      { speaker: 'Lucía', spanish: 'Vamos a viajar a México. ¡Vamos a comer tacos!', english: 'We are going to travel to Mexico. We are going to eat tacos!' }
    ],
    quickPractice: {
      question: 'Which formula correctly expresses "We are going to play"?',
      options: ['Vamos jugar', 'Vamos a jugar', 'Va a jugar', 'Iremos jugar'],
      correctAnswer: 'Vamos a jugar',
      explanation: 'Near future requires IR + A + Infinitive.'
    }
  },

  lesson9: {
    lessonNumber: 9,
    partNumber: 3,
    title: 'Days, Months, Seasons & Date Format',
    subtitle: 'Calendar Vocabulary & Date Syntax',
    professorNote: 'Dates in Spanish follow a logical numeric structure: "the [day] of [month]". Months and days are NOT capitalized in Spanish unless starting a sentence.',
    objectives: [
      'Learn days of the week, months, and 4 seasons',
      'Format dates accurately using: Es el [day] de [month]',
      'Understand capitalization rules for calendar terms'
    ],
    grammarSections: [
      {
        title: 'Days, Months & Seasons Reference Table',
        explanation: 'All days of the week are masculine in Spanish (el lunes, los martes).',
        table: {
          headers: ['Days of Week', 'Months of Year', 'Seasons'],
          rows: [
            ['lunes (Monday)', 'enero, febrero, marzo', 'la primavera (Spring)'],
            ['martes (Tuesday)', 'abril, mayo, junio', 'el verano (Summer)'],
            ['miércoles (Wednesday)', 'julio, agosto, septiembre', 'el otoño (Autumn)'],
            ['jueves (Thursday)', 'octubre, noviembre', 'el invierno (Winter)'],
            ['viernes (Friday)', 'diciembre', '-'],
            ['sábado, domingo', '-', '-']
          ]
        }
      },
      {
        title: 'Date Construction Syntax',
        explanation: 'Formula: [Es el] + [number] + [de] + [month]',
        rules: [
          'Today is May 5th -> Hoy es el cinco de mayo.',
          'The first of the month uses "el primero": El primero de enero (New Year\'s Day).',
          'Notice months and days are written in lowercase: mayo, lunes.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'el lunes', phonetic: 'ehl LOO-nehs', english: 'Monday', usage: 'Day of week' },
      { spanish: 'el viernes', phonetic: 'ehl VYEHR-nehs', english: 'Friday', usage: 'Day of week' },
      { spanish: 'enero', phonetic: 'eh-NEH-roh', english: 'January', usage: 'Month' },
      { spanish: 'mayo', phonetic: 'MAH-yoh', english: 'May', usage: 'Month' },
      { spanish: 'el verano', phonetic: 'ehl veh-RAH-noh', english: 'summer', usage: 'Season' },
      { spanish: 'la primavera', phonetic: 'lah pree-mah-VEH-rah', english: 'spring', usage: 'Season' }
    ],
    exampleSentences: [
      { spanish: 'Hoy es viernes, el cuatro de julio.', english: 'Today is Friday, the fourth of July.', breakdown: 'Full date structure.' },
      { spanish: 'En el invierno hace mucho frío.', english: 'In the winter it is very cold.', breakdown: 'Combines season with weather expression.' }
    ],
    dialogue: [
      { speaker: 'Estudiante', spanish: '¿Cuál es la fecha de hoy?', english: 'What is today\'s date?' },
      { speaker: 'Profesor', spanish: 'Hoy es el quince de octubre.', english: 'Today is the fifteenth of October.' }
    ],
    quickPractice: {
      question: 'How do you state "December 25th" in Spanish?',
      options: ['el 25 de Diciembre', 'el veinticinco de diciembre', 'el diciembre 25', 'el 25 en diciembre'],
      correctAnswer: 'el veinticinco de diciembre',
      explanation: 'Dates use el + number + de + lowercase month.'
    }
  },

  lesson10: {
    lessonNumber: 10,
    partNumber: 3,
    title: 'Telling Time in Spanish',
    subtitle: 'Es la una vs Son las..., Minutes & Time of Day',
    professorNote: 'Telling time uses the verb SER. Use "Es la una" for 1:00 (singular) and "Son las..." for all other hours (2 through 12).',
    objectives: [
      'Master time questions: ¿Qué hora es? vs ¿A qué hora es...?',
      'Add minutes using "y" and subtract using "menos"',
      'Specify time of day: de la mañana, de la tarde, de la noche'
    ],
    grammarSections: [
      {
        title: 'Telling Time Rules & Structure',
        explanation: 'Time uses feminine agreement matching "la hora" (the hour).',
        table: {
          headers: ['Time Category', 'Spanish Expression', 'English Equivalent'],
          rows: [
            ['1:00 (Singular)', 'Es la una.', 'It is 1:00.'],
            ['2:00-12:00 (Plural)', 'Son las dos / Son las tres...', 'It is 2:00 / It is 3:00...'],
            ['Quarter past (:15)', 'Son las cuatro y cuarto.', 'It is 4:15.'],
            ['Half past (:30)', 'Son las cinco y media.', 'It is 5:30.'],
            ['Minutes to next hour', 'Son las seis menos diez.', 'It is 5:50 (ten to six).']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: '¿Qué hora es?', phonetic: 'keh OH-rah ehs', english: 'What time is it?', usage: 'Current time question' },
      { spanish: 'y cuarto', phonetic: 'ee KWAHR-toh', english: 'quarter past (:15)', usage: 'Adding 15 mins' },
      { spanish: 'y media', phonetic: 'ee MEH-dyah', english: 'half past (:30)', usage: 'Adding 30 mins' },
      { spanish: 'menos', phonetic: 'MEH-nohs', english: 'minus / to (minutes)', usage: 'Subtracting minutes' },
      { spanish: 'de la mañana', phonetic: 'deh lah mah-NYAH-nah', english: 'in the morning (with time)', usage: 'AM indicator' },
      { spanish: 'de la noche', phonetic: 'deh lah NOH-cheh', english: 'at night (with time)', usage: 'PM indicator' }
    ],
    exampleSentences: [
      { spanish: 'Es la una y diez de la tarde.', english: 'It is 1:10 in the afternoon.', breakdown: 'Singular es la una.' },
      { spanish: 'La clase es a las ocho y media.', english: 'The class is at eight thirty.', breakdown: 'Event time uses "a las".' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: 'Disculpe, ¿qué hora es?', english: 'Excuse me, what time is it?' },
      { speaker: 'Luis', spanish: 'Son las nueve menos cuarto de la noche.', english: 'It is a quarter to nine at night (8:45 PM).' }
    ],
    quickPractice: {
      question: 'How do you say "It is 2:30"?',
      options: ['Es la dos y media', 'Son las dos y media', 'Son las dos y treinta', 'Es las dos y media'],
      correctAnswer: 'Son las dos y media',
      explanation: 'Hours 2-12 take plural "Son las...".'
    }
  },

  lesson11: {
    lessonNumber: 11,
    partNumber: 3,
    title: 'Verb TENER & Idiomatic Expressions',
    subtitle: 'Conjugating TENER, Physical Idioms & Tener Que',
    professorNote: 'In Spanish, you don\'t "be" hungry or cold — you "have" hunger or cold! TENER is a fundamental verb for expressing feelings and obligations.',
    objectives: [
      'Master present tense conjugation of TENER (tengo, tienes, tiene...)',
      'Learn 8 essential physical & mental TENER idioms',
      'Form obligations using TENER QUE + INFINITIVE'
    ],
    grammarSections: [
      {
        title: 'Conjugation Matrix of TENER (To Have)',
        explanation: 'TENER is both a yo-go verb (tengo) and an e->ie stem changer (tienes, tiene, tienen).',
        table: {
          headers: ['Subject', 'TENER Conjugation', 'Example Sentence'],
          rows: [
            ['Yo', 'tengo', 'Tengo 20 años.'],
            ['Tú', 'tienes', '¿Tienes hambre?'],
            ['Él / Ella / Ud.', 'tiene', 'Él tiene frío.'],
            ['Nosotros/as', 'tenemos', 'Tenemos prisa.'],
            ['Vosotros/as', 'tenéis', 'Vosotros tenéis razón.'],
            ['Ellos / Ellas / Uds.', 'tienen', 'Ellos tienen miedo.']
          ]
        }
      },
      {
        title: 'TENER Idioms & Obligation Formula',
        explanation: 'Because these idioms use nouns, modify them with MUCHO/A (a lot of) instead of MUY (very).',
        rules: [
          'Tener frío / calor = To be cold / hot (Tengo mucho frío = I am very cold).',
          'Tener hambre / sed = To be hungry / thirsty (Tiene mucha hambre).',
          'Tener prisa / miedo = To be in a hurry / afraid.',
          'Tener razón = To be right / correct.',
          'Tener X años = To be X years old.',
          'OBLIGATION FORMULA: TENER + QUE + INFINITIVE (e.g., Tengo que estudiar = I have to study).'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'tengo', phonetic: 'TEHN-goh', english: 'I have', usage: 'TENER 1st person' },
      { spanish: 'tienes', phonetic: 'TYEH-nehs', english: 'you have', usage: 'TENER 2nd person' },
      { spanish: 'tener hambre', phonetic: 'teh-NEHR AHM-breh', english: 'to be hungry', usage: 'Idiom with noun' },
      { spanish: 'tener sed', phonetic: 'teh-NEHR SEHD', english: 'to be thirsty', usage: 'Idiom with noun' },
      { spanish: 'tener prisa', phonetic: 'teh-NEHR PREE-sah', english: 'to be in a hurry', usage: 'Idiom with noun' },
      { spanish: 'tener que', phonetic: 'teh-NEHR keh', english: 'must / to have to', usage: 'Obligation auxiliary' }
    ],
    exampleSentences: [
      { spanish: 'Tengo mucha sed, necesito beber agua.', english: 'I am very thirsty, I need to drink water.', breakdown: 'Uses mucho with noun sed.' },
      { spanish: 'Los estudiantes tienen que estudiar mucho.', english: 'The students have to study a lot.', breakdown: 'Obligation formula tener + que + inf.' }
    ],
    dialogue: [
      { speaker: 'Mamá', spanish: '¿Tienes hambre, Carlos?', english: 'Are you hungry, Carlos?' },
      { speaker: 'Carlos', spanish: 'Sí, tengo mucha hambre y tengo que comer ahora.', english: 'Yes, I am very hungry and I have to eat now.' }
    ],
    quickPractice: {
      question: 'How do you say "I am 20 years old" in Spanish?',
      options: ['Soy 20 años', 'Estoy 20 años', 'Tengo 20 años', 'Hago 20 años'],
      correctAnswer: 'Tengo 20 años',
      explanation: 'Age is expressed using TENER in Spanish.'
    }
  },

  lesson13: {
    lessonNumber: 13,
    partNumber: 4,
    title: 'Stem-Changing Boot Verbs (Present Tense)',
    subtitle: 'E->IE, O->UE, E->I & U->UE Boot Mechanics',
    professorNote: 'Boot verbs change their stem vowel in all forms EXCEPT nosotros and vosotros. Visualize drawing a boot around the changing forms on a conjugation chart!',
    objectives: [
      'Understand boot verb mechanics (changes in Yo, Tú, Él, Ellos)',
      'Master E->IE verbs (querer, pensar, preferir)',
      'Master O->UE verbs (poder, almorzar, dormir) and E->I (pedir)'
    ],
    grammarSections: [
      {
        title: 'The 4 Boot Change Categories',
        explanation: 'Stem changes happen in the stressed syllable of the root.',
        table: {
          headers: ['Category', 'Infinitive', 'Yo Form', 'Nosotros Form (NO CHANGE!)', 'They Form'],
          rows: [
            ['E -> IE', 'querer (to want)', 'quiero', 'queremos', 'quieren'],
            ['O -> UE', 'poder (can / to be able)', 'puedo', 'podemos', 'pueden'],
            ['E -> I', 'pedir (to request)', 'pido', 'pedimos', 'piden'],
            ['U -> UE', 'jugar (to play)', 'juego', 'jugamos', 'juegan']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'querer (e->ie)', phonetic: 'keh-REHR', english: 'to want / to love', usage: 'Boot verb' },
      { spanish: 'poder (o->ue)', phonetic: 'poh-DEHR', english: 'to be able to / can', usage: 'Boot verb' },
      { spanish: 'pedir (e->i)', phonetic: 'peh-DEER', english: 'to ask for / order', usage: 'Boot verb' },
      { spanish: 'jugar (u->ue)', phonetic: 'hoo-GAHR', english: 'to play (sports/games)', usage: 'Boot verb' }
    ],
    exampleSentences: [
      { spanish: 'Yo quiero comer pero nosotros preferimos estudiar.', english: 'I want to eat but we prefer to study.', breakdown: 'Yo changes (quiero), nosotros does not (preferimos).' }
    ],
    dialogue: [
      { speaker: 'Elena', spanish: '¿Puedes tú ir al cine hoy?', english: 'Can you go to the movies today?' },
      { speaker: 'Pablo', spanish: 'No, no puedo porque quiero dormir.', english: 'No, I can\'t because I want to sleep.' }
    ],
    quickPractice: {
      question: 'Conjugate "poder" for "Nosotros":',
      options: ['puedemos', 'podemos', 'pidemos', 'puedan'],
      correctAnswer: 'podemos',
      explanation: 'Nosotros and vosotros forms NEVER undergo stem change.'
    }
  },

  lesson14: {
    lessonNumber: 14,
    partNumber: 4,
    title: 'Yo-Go Verbs & Irregular Yo Forms',
    subtitle: 'Pongo, Salgo, Traigo, Hago, Digo, Conozco',
    professorNote: 'Some verbs are completely regular in all forms EXCEPT the "Yo" form, which adds a "-go" or "-zco".',
    objectives: [
      'Master top Yo-Go verbs (poner, salir, traer, hacer, decir, venir)',
      'Learn -ZCO ending verbs (conocer, conducir, ofrecer)',
      'Conjugate remaining forms regularly'
    ],
    grammarSections: [
      {
        title: 'Top Yo-Go Verbs Reference Table',
        table: {
          headers: ['Infinitive', 'Yo Form (-GO)', 'Tú Form', 'Ellos Form'],
          rows: [
            ['poner (to put)', 'pongo', 'pones', 'ponen'],
            ['salir (to exit/go out)', 'salgo', 'sales', 'salen'],
            ['traer (to bring)', 'traigo', 'traes', 'traen'],
            ['hacer (to do/make)', 'hago', 'haces', 'hacen'],
            ['decir (to say/tell)', 'digo (also e->i)', 'dices', 'dicen'],
            ['venir (to come)', 'vengo (also e->ie)', 'vienes', 'vienen']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'pongo', phonetic: 'POHN-goh', english: 'I put / set', usage: 'Yo-go of poner' },
      { spanish: 'salgo', phonetic: 'SAHL-goh', english: 'I exit / go out', usage: 'Yo-go of salir' },
      { spanish: 'traigo', phonetic: 'TRY-goh', english: 'I bring', usage: 'Yo-go of traer' },
      { spanish: 'hago', phonetic: 'AH-goh', english: 'I do / make', usage: 'Yo-go of hacer' }
    ],
    exampleSentences: [
      { spanish: 'Yo pongo los libros en la mesa y salgo con amigos.', english: 'I put the books on the table and go out with friends.', breakdown: 'Two yo-go verbs: pongo & salgo.' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: '¿Qué haces tú los fines de semana?', english: 'What do you do on weekends?' },
      { speaker: 'Mario', spanish: 'Hago la tarea y salgo a bailar.', english: 'I do homework and go out dancing.' }
    ],
    quickPractice: {
      question: 'What is the "Yo" form of "traer"?',
      options: ['trao', 'traigo', 'trajo', 'trogo'],
      correctAnswer: 'traigo',
      explanation: 'Traer takes irregular yo-go form: traigo.'
    }
  },

  lesson15: {
    lessonNumber: 15,
    partNumber: 4,
    title: 'Present Progressive Tense',
    subtitle: 'Estar + Gerundio (-ando, -iendo)',
    professorNote: 'The present progressive describes an action happening right now at this exact moment.',
    objectives: [
      'Form the present participle (gerundio): -AR -> -ando, -ER/-IR -> -iendo',
      'Combine ESTAR + Gerundio',
      'Identify irregular gerunds (leyendo, oyendo, trayendo)'
    ],
    grammarSections: [
      {
        title: 'Formula & Irregular Gerunds',
        explanation: 'Formula: [ESTAR conjugated] + [Present Participle]',
        rules: [
          'hablar -> hablando (speaking)',
          'comer -> comiendo (eating)',
          'vivir -> viviendo (living)',
          'Vowel root rule (-er/-ir verbs whose root ends in a vowel change -iendo to -yendo): leer -> leyendo, oír -> oyendo, traer -> trayendo.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'hablando', phonetic: 'ah-BLAHN-doh', english: 'speaking', usage: 'Gerund' },
      { spanish: 'comiendo', phonetic: 'koh-MYEHN-doh', english: 'eating', usage: 'Gerund' },
      { spanish: 'leyendo', phonetic: 'leh-YEHN-doh', english: 'reading', usage: 'Irregular gerund' }
    ],
    exampleSentences: [
      { spanish: 'Ahora mismo estoy estudiando español.', english: 'Right now I am studying Spanish.', breakdown: 'Estar (estoy) + gerundio (estudiando).' }
    ],
    dialogue: [
      { speaker: 'Carlos', spanish: '¿Qué estás haciendo?', english: 'What are you doing?' },
      { speaker: 'Sofía', spanish: 'Estoy leyendo un libro interesante.', english: 'I am reading an interesting book.' }
    ],
    quickPractice: {
      question: 'What is the gerund of "leer"?',
      options: ['leiendo', 'leyendo', 'leando', 'leido'],
      correctAnswer: 'leyendo',
      explanation: 'Vowel-ending roots change -iendo to -yendo.'
    }
  },

  lesson16: {
    lessonNumber: 16,
    partNumber: 4,
    title: 'Direct Object Pronouns & Adverbs',
    subtitle: 'Me, Te, Lo, La, Nos, Os, Los, Las & -mente Adverbs',
    professorNote: 'Direct object pronouns replace nouns that directly receive the action of the verb.',
    objectives: [
      'Master the 8 Direct Object Pronouns (DOPs)',
      'Position DOPs BEFORE conjugated verbs',
      'Create adverbs by adding -mente to feminine singular adjectives'
    ],
    grammarSections: [
      {
        title: 'Direct Object Pronouns Grid',
        table: {
          headers: ['Person', 'Singular DOP', 'Plural DOP'],
          rows: [
            ['1st Person', 'me (me)', 'nos (us)'],
            ['2nd Person', 'te (you)', 'os (you all - Spain)'],
            ['3rd Person (Masc)', 'lo (him / it)', 'los (them m.)'],
            ['3rd Person (Fem)', 'la (her / it)', 'las (them f.)']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'lo', phonetic: 'loh', english: 'him / it (masc)', usage: 'Singular DOP' },
      { spanish: 'la', phonetic: 'lah', english: 'her / it (fem)', usage: 'Singular DOP' },
      { spanish: 'rápidamente', phonetic: 'rah-pee-dah-MEHN-teh', english: 'quickly', usage: 'Adverb in -mente' }
    ],
    exampleSentences: [
      { spanish: '¿Tienes el libro? Sí, lo tengo.', english: 'Do you have the book? Yes, I have it.', breakdown: 'Lo replaces masculine noun el libro and goes BEFORE tengo.' }
    ],
    dialogue: [
      { speaker: 'Pedro', spanish: '¿Ves a María?', english: 'Do you see María?' },
      { speaker: 'Juan', spanish: 'Sí, la veo en la biblioteca.', english: 'Yes, I see her at the library.' }
    ],
    quickPractice: {
      question: 'Which pronoun replaces "las manzanas"?',
      options: ['los', 'las', 'la', 'les'],
      correctAnswer: 'las',
      explanation: 'Feminine plural direct object noun uses "las".'
    }
  },

  lesson17: {
    lessonNumber: 17,
    partNumber: 5,
    title: 'Possessives & Demonstratives',
    subtitle: 'Mi, Tu, Su, Este, Ese, Aquel',
    professorNote: 'Demonstratives indicate spatial distance between speaker and listener. Learn the famous rhyme: "This and these have T\'s, that and those don\'t!"',
    objectives: [
      'Master short possessives (mi, tu, su, nuestro)',
      'Learn demonstratives by distance (este, ese, aquel)',
      'Distinguish neuter demonstratives (esto, eso, aquello)'
    ],
    grammarSections: [
      {
        title: 'Demonstratives Distance Grid',
        table: {
          headers: ['Distance', 'Masculine Sing/Pl', 'Feminine Sing/Pl', 'Rhyme / Memory Key'],
          rows: [
            ['Here (Close)', 'este / estos', 'esta / estas', '"This and these have T\'s"'],
            ['There (Medium)', 'ese / esos', 'esa / esas', '"That and those don\'t"'],
            ['Far away', 'aquel / aquellos', 'aquella / aquellas', '"Far over there"']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'este / esta', phonetic: 'EHS-teh', english: 'this', usage: 'Close distance' },
      { spanish: 'ese / esa', phonetic: 'EHS-eh', english: 'that', usage: 'Medium distance' },
      { spanish: 'aquel / aquella', phonetic: 'ah-KEHL', english: 'that over there', usage: 'Far distance' }
    ],
    exampleSentences: [
      { spanish: 'Este libro es mío, pero esa pluma es tuya.', english: 'This book is mine, but that pen is yours.', breakdown: 'Demonstratives and stressed possessives.' }
    ],
    dialogue: [
      { speaker: 'Rosa', spanish: '¿De quién es esta chaqueta?', english: 'Whose is this jacket?' },
      { speaker: 'Luis', spanish: 'Esa chaqueta es de Mateo.', english: 'That jacket is Mateo\'s.' }
    ],
    quickPractice: {
      question: 'Which demonstrative means "this" (close to speaker)?',
      options: ['este', 'ese', 'aquel', 'mío'],
      correctAnswer: 'este',
      explanation: 'Este/esta means "this" (near speaker).'
    }
  },

  lesson18: {
    lessonNumber: 18,
    partNumber: 5,
    title: 'Affirmatives & Negatives',
    subtitle: 'Algo/Nada, Alguien/Nadie, Siempre/Nunca',
    professorNote: 'Spanish permits and requires double negatives! Saying "No tengo nada" is grammatically correct.',
    objectives: [
      'Learn opposite word pairs (algo/nada, alguien/nadie)',
      'Master the Spanish double negative structure',
      'Position negative words correctly'
    ],
    grammarSections: [
      {
        title: 'Affirmative vs Negative Pairs',
        table: {
          headers: ['Affirmative', 'Negative', 'English Meaning'],
          rows: [
            ['algo (something)', 'nada (nothing)', 'Something <-> Nothing'],
            ['alguien (someone)', 'nadie (no one)', 'Someone <-> No one'],
            ['siempre (always)', 'nunca / jamás (never)', 'Always <-> Never'],
            ['también (also/too)', 'tampoco (neither)', 'Also <-> Neither']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'algo', phonetic: 'AHL-goh', english: 'something', usage: 'Affirmative' },
      { spanish: 'nada', phonetic: 'NAH-dah', english: 'nothing', usage: 'Negative' },
      { spanish: 'alguien', phonetic: 'AHL-gyehn', english: 'someone', usage: 'Affirmative' },
      { spanish: 'nadie', phonetic: 'NAH-dyeh', english: 'no one', usage: 'Negative' }
    ],
    exampleSentences: [
      { spanish: 'No tengo nada en la mochila.', english: 'I have nothing in the backpack.', breakdown: 'Spanish double negative rule.' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: '¿Hay alguien en la clase?', english: 'Is someone in the class?' },
      { speaker: 'Beto', spanish: 'No, no hay nadie aquí.', english: 'No, there is no one here.' }
    ],
    quickPractice: {
      question: 'What is the negative opposite of "siempre"?',
      options: ['nada', 'nadie', 'nunca', 'tampoco'],
      correctAnswer: 'nunca',
      explanation: 'Siempre (always) <-> Nunca (never).'
    }
  },

  lesson19: {
    lessonNumber: 19,
    partNumber: 5,
    title: 'Indirect Objects & Verb Gustar',
    subtitle: 'Me, Te, Le, Nos, Os, Les + Gustar Mechanics',
    professorNote: 'Gustar does not mean "to like" directly — it means "to be pleasing to someone". The subject is the thing being liked!',
    objectives: [
      'Master Indirect Object Pronouns (me, te, le, nos, os, les)',
      'Use gusta (singular) vs gustan (plural)',
      'Add clarification phrases (A mí me gusta, A él le gusta)'
    ],
    grammarSections: [
      {
        title: 'Gustar Sentence Structure',
        explanation: 'Structure: [Clarification] + [IOP] + GUSTA/GUSTAN + [Thing liked]',
        rules: [
          'Me gusta el libro. (The book is pleasing to me -> I like the book).',
          'Me gustan los libros. (The books are pleasing to me -> I like the books).',
          'IOPs: me (to me), te (to you), le (to him/her/ud), nos (to us), les (to them).'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'me gusta', phonetic: 'meh GOOS-tah', english: 'I like (sing. item)', usage: 'Gustar 1st person' },
      { spanish: 'me gustan', phonetic: 'meh GOOS-tahn', english: 'I like (plural items)', usage: 'Gustar plural' },
      { spanish: 'encantar', phonetic: 'ehn-kahn-TAHR', english: 'to love / delight in', usage: 'Functions like gustar' }
    ],
    exampleSentences: [
      { spanish: 'A mí me gustan los tacos.', english: 'I love tacos.', breakdown: 'Plural noun tacos requires gustan.' }
    ],
    dialogue: [
      { speaker: 'Maria', spanish: '¿Te gusta la música española?', english: 'Do you like Spanish music?' },
      { speaker: 'Carlos', spanish: '¡Sí, me encanta!', english: 'Yes, I love it!' }
    ],
    quickPractice: {
      question: 'Fill in: "A ellos le/les ___ los libros."',
      options: ['gusta', 'gustan', 'gustas', 'gusto'],
      correctAnswer: 'gustan',
      explanation: 'Plural subject "los libros" requires "gustan".'
    }
  },

  lesson20: {
    lessonNumber: 20,
    partNumber: 5,
    title: 'Double Object Pronouns & "Se La" Rule',
    subtitle: 'Indirect Before Direct / Le->Se Rule',
    professorNote: 'When combining both direct and indirect object pronouns in one sentence, Indirect ALWAYS comes first (People before Things).',
    objectives: [
      'Order pronouns: Indirect before Direct',
      'Apply the "Se La" rule (change le/les to SE before lo/la)',
      'Place combined pronouns before conjugated verbs'
    ],
    grammarSections: [
      {
        title: 'The "Se La" Rule Explained',
        explanation: 'You cannot say "le lo" in Spanish because of awkward phonetic overlap. "Le" changes to "SE".',
        rules: [
          'Incorrect: Yo le lo doy. (I give it to him)',
          'Correct: Yo SE lo doy. (I give it to him)',
          'Formula: SE + lo / la / los / las'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'se lo', phonetic: 'seh loh', english: 'it to him/her/them', usage: 'DOP+IOP combo' }
    ],
    exampleSentences: [
      { spanish: '¿Le diste el libro a Juan? Sí, se lo di.', english: 'Did you give the book to Juan? Yes, I gave it to him.', breakdown: 'Le lo becomes se lo.' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: '¿Me compras el café?', english: 'Will you buy me the coffee?' },
      { speaker: 'Beto', spanish: 'Sí, te lo compro ahora.', english: 'Yes, I buy it for you now.' }
    ],
    quickPractice: {
      question: 'What does "le lo" change to?',
      options: ['me lo', 'te lo', 'se lo', 'nos lo'],
      correctAnswer: 'se lo',
      explanation: 'Le/les changes to SE before lo/la/los/las.'
    }
  },

  lesson21: {
    lessonNumber: 21,
    partNumber: 5,
    title: 'Reflexive Verbs & Daily Routine',
    subtitle: 'Me, Te, Se, Nos, Os, Se + Routine Verbs',
    professorNote: 'Reflexive verbs show that the subject performs and receives the action.',
    objectives: [
      'Learn reflexive pronouns (me, te, se, nos, os, se)',
      'Conjugate daily routine verbs (lavarse, levantarse, acostarse)',
      'Use definite articles with body parts (Me lavo las manos)'
    ],
    grammarSections: [
      {
        title: 'Reflexive Pronouns & Verb Matrix',
        table: {
          headers: ['Subject', 'Reflexive Pronoun', 'Lavarse (to wash)', 'Levantarse (to get up)'],
          rows: [
            ['Yo', 'me', 'me lavo', 'me levanto'],
            ['Tú', 'te', 'te lavas', 'te levantas'],
            ['Él/Ella/Ud.', 'se', 'se lava', 'se levanta'],
            ['Nosotros/as', 'nos', 'nos lavamos', 'nos levantamos'],
            ['Ellos/as/Uds.', 'se', 'se lavan', 'se levantan']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'lavarse', phonetic: 'lah-VAHR-seh', english: 'to wash oneself', usage: 'Reflexive verb' },
      { spanish: 'levantarse', phonetic: 'leh-vahn-TAHR-seh', english: 'to get up', usage: 'Reflexive verb' }
    ],
    exampleSentences: [
      { spanish: 'Yo me levanto a las siete de la mañana.', english: 'I get up at seven in the morning.', breakdown: 'Reflexive me levanto.' }
    ],
    dialogue: [
      { speaker: 'Pedro', spanish: '¿A qué hora te levantas?', english: 'What time do you get up?' },
      { speaker: 'Juan', spanish: 'Me levanto a las seis y me lavo la cara.', english: 'I get up at six and wash my face.' }
    ],
    quickPractice: {
      question: 'What is the reflexive pronoun for "nosotros"?',
      options: ['me', 'te', 'se', 'nos'],
      correctAnswer: 'nos',
      explanation: 'Nosotros takes reflexive pronoun "nos".'
    }
  },

  lesson22: {
    lessonNumber: 22,
    partNumber: 6,
    title: 'Recent Past & Duration Formulas',
    subtitle: 'Acabar de + Infinitive & Hace + Time + Que',
    professorNote: 'Express recent past ("just done") and duration ("have been doing for X time") effortlessly without complex past tenses.',
    objectives: [
      'Use ACABAR DE + INFINITIVE for recent past',
      'Use HACE + time + QUE + Present for ongoing duration',
      'Form alternate duration sentences with desde hace'
    ],
    grammarSections: [
      {
        title: 'Recent Past & Duration Rules',
        rules: [
          'Acabar de + Infinitive = To have just done something (Acabo de comer = I have just eaten).',
          'Hace + [time] + que + Present = Have been doing for [time] (Hace dos años que estudio español).',
          'Present + desde hace + [time] = Estudio español desde hace dos años.'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'acabo de', phonetic: 'ah-KAH-boh deh', english: 'I have just', usage: 'Recent past auxiliary' },
      { spanish: 'hace dos años', phonetic: 'AH-seh dohs AH-nyohs', english: 'for two years', usage: 'Duration phrase' }
    ],
    exampleSentences: [
      { spanish: 'Acabamos de llegar a la universidad.', english: 'We have just arrived at university.', breakdown: 'Acabar (nosotros) + de + llegar.' }
    ],
    dialogue: [
      { speaker: 'Luis', spanish: '¿Tienes hambre?', english: 'Are you hungry?' },
      { speaker: 'Ana', spanish: 'No, acabo de comer una manzana.', english: 'No, I have just eaten an apple.' }
    ],
    quickPractice: {
      question: 'Translate "I have just eaten":',
      options: ['Acabo de comer', 'Como reciente', 'Hago comer', 'Fui a comer'],
      correctAnswer: 'Acabo de comer',
      explanation: 'Acabar de + infinitive expresses recent past.'
    }
  },

  lesson23: {
    lessonNumber: 23,
    partNumber: 6,
    title: 'Present Duration & Time Queries',
    subtitle: '¿Desde cuándo...? & Hay Que + Infinitive',
    professorNote: 'Hay que expresses general impersonal necessity ("one must / it is necessary to").',
    objectives: [
      'Query duration with ¿Desde cuándo...?',
      'Use impersonal obligation: HAY QUE + INFINITIVE',
      'Contrast personal (tener que) vs impersonal (hay que)'
    ],
    grammarSections: [
      {
        title: 'Hay Que vs Tener Que',
        explanation: 'Tener que is personal (Tengo que estudiar = I must study). Hay que is universal (Hay que estudiar = One must study).',
        rules: [
          'Hay que practicar todos los días. (It is necessary to practice every day).',
          '¿Desde cuándo estudias español? (Since when have you been studying Spanish?)'
        ]
      }
    ],
    vocabularyTable: [
      { spanish: 'hay que', phonetic: 'ey keh', english: 'one must / it is necessary to', usage: 'Impersonal obligation' }
    ],
    exampleSentences: [
      { spanish: 'Hay que hablar en español en la clase.', english: 'One must speak in Spanish in class.', breakdown: 'Impersonal rule.' }
    ],
    dialogue: [
      { speaker: 'Profesor', spanish: 'Para aprender, hay que estudiar mucho.', english: 'To learn, one must study a lot.' },
      { speaker: 'Alumno', spanish: 'Sí, profesor, tengo que practicar.', english: 'Yes, professor, I have to practice.' }
    ],
    quickPractice: {
      question: 'Which phrase expresses general impersonal necessity?',
      options: ['Tengo que', 'Hay que', 'Debo que', 'Quiero que'],
      correctAnswer: 'Hay que',
      explanation: 'Hay que + infinitive is impersonal.'
    }
  },

  lesson24: {
    lessonNumber: 24,
    partNumber: 6,
    title: 'Formal Commands & Unequal Comparisons',
    subtitle: 'Usted Mandatos & Más... Que Expressions',
    professorNote: 'Formal commands swap vowel endings: -AR verbs take -e/-en, -ER/-IR verbs take -a/-an.',
    objectives: [
      'Form formal Usted/Ustedes commands',
      'Apply vowel swap rules (-AR -> -e, -ER/-IR -> -a)',
      'Construct unequal comparisons (más... que / menos... que)'
    ],
    grammarSections: [
      {
        title: 'Formal Command Vowel Swap Table',
        table: {
          headers: ['Verb Type', 'Infinitive', 'Usted Command (Singular)', 'Ustedes Command (Plural)'],
          rows: [
            ['-AR Verbs', 'hablar', '¡Hable!', '¡Hablen!'],
            ['-ER Verbs', 'comer', '¡Coma!', '¡Coman!'],
            ['-IR Verbs', 'escribir', '¡Escriba!', '¡Escriban!']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: '¡Hable!', phonetic: 'AH-bleh', english: 'Speak! (formal)', usage: 'Usted command' },
      { spanish: 'más... que', phonetic: 'mahs keh', english: 'more... than', usage: 'Comparison' }
    ],
    exampleSentences: [
      { spanish: '¡Coma la sopa, por favor!', english: 'Eat the soup, please (formal)!', breakdown: 'Formal command from comer.' }
    ],
    dialogue: [
      { speaker: 'Doctor', spanish: '¡Beba más agua y descanse!', english: 'Drink more water and rest (formal)!' },
      { speaker: 'Paciente', spanish: 'Sí doctor, voy a hacerlo.', english: 'Yes doctor, I will do it.' }
    ],
    quickPractice: {
      question: 'Form formal Usted command for "hablar":',
      options: ['¡Habla!', '¡Hable!', '¡Hablo!', '¡Hablen!'],
      correctAnswer: '¡Hable!',
      explanation: '-AR verbs change to -e for formal singular command.'
    }
  },

  lesson25: {
    lessonNumber: 25,
    partNumber: 6,
    title: 'Informal Tú Commands (Mandatos)',
    subtitle: '8 Irregular Tú Commands: Haz, Ten, Pon, Sal, Ve, Di, Ven, Sé',
    professorNote: 'Affirmative informal commands use the 3rd person singular present form (Habla, Come). Memorize the 8 irregular command words!',
    objectives: [
      'Form affirmative informal tú commands',
      'Memorize the 8 irregular command short forms',
      'Form negative tú commands with no + sub'
    ],
    grammarSections: [
      {
        title: 'The 8 Irregular Affirmative Tú Commands',
        table: {
          headers: ['Infinitive', 'Irregular Tú Command', 'English Command'],
          rows: [
            ['hacer', 'Haz', 'Do! / Make!'],
            ['tener', 'Ten', 'Have! / Hold!'],
            ['poner', 'Pon', 'Put! / Set!'],
            ['salir', 'Sal', 'Exit! / Leave!'],
            ['ir', 'Ve', 'Go!'],
            ['decir', 'Di', 'Say! / Tell!'],
            ['venir', 'Ven', 'Come!'],
            ['ser', 'Sé', 'Be!']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: '¡Haz!', phonetic: 'ahs', english: 'Do! / Make!', usage: 'Irregular command' },
      { spanish: '¡Pon!', phonetic: 'pohn', english: 'Put! / Set!', usage: 'Irregular command' }
    ],
    exampleSentences: [
      { spanish: '¡Haz la tarea y pon los libros aquí!', english: 'Do the homework and put the books here!', breakdown: 'Two irregular commands.' }
    ],
    dialogue: [
      { speaker: 'Madre', spanish: '¡Haz tu cama y sal a jugar!', english: 'Make your bed and go out to play!' },
      { speaker: 'Hijo', spanish: '¡Ya voy, mamá!', english: 'I\'m coming, mom!' }
    ],
    quickPractice: {
      question: 'What is the irregular tú command for "hacer"?',
      options: ['hace', 'haz', 'haga', 'hazas'],
      correctAnswer: 'haz',
      explanation: 'Hacer irregular command is Haz.'
    }
  },

  lesson26: {
    lessonNumber: 26,
    partNumber: 6,
    title: 'Preterite Past Tense Regulars',
    subtitle: '-é, -aste, -ó, -amos, -aron & -í, -iste, -ió, -imos, -ieron',
    professorNote: 'The preterite tense narrates completed past actions that occurred at a specific point in time.',
    objectives: [
      'Master regular -AR preterite endings (-é, -aste, -ó, -amos, -aron)',
      'Master regular -ER/-IR preterite endings (-í, -iste, -ió, -imos, -ieron)',
      'Identify past time markers (ayer, anoche, la semana pasada)'
    ],
    grammarSections: [
      {
        title: 'Preterite Regular Endings Matrix',
        table: {
          headers: ['Subject', '-AR Preterite (Hablar)', '-ER/-IR Preterite (Comer / Vivir)'],
          rows: [
            ['Yo', 'hablé (I spoke)', 'comí / viví (I ate / lived)'],
            ['Tú', 'hablaste', 'comiste / viviste'],
            ['Él/Ella/Ud.', 'habló', 'comió / vivió'],
            ['Nosotros/as', 'hablamos', 'comimos / vivimos'],
            ['Ellos/as/Uds.', 'hablaron', 'comieron / vivieron']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'ayer', phonetic: 'ah-YEHR', english: 'yesterday', usage: 'Preterite time marker' },
      { spanish: 'anoche', phonetic: 'ah-NOH-cheh', english: 'last night', usage: 'Preterite time marker' }
    ],
    exampleSentences: [
      { spanish: 'Ayer hablé con el profesor y comí tacos.', english: 'Yesterday I spoke with the professor and ate tacos.', breakdown: 'Preterite past actions.' }
    ],
    dialogue: [
      { speaker: 'Juan', spanish: '¿Qué hiciste ayer? ¿Hablaste con Ana?', english: 'What did you do yesterday? Did you speak with Ana?' },
      { speaker: 'Pedro', spanish: 'Sí, hablé con ella anoche.', english: 'Yes, I spoke with her last night.' }
    ],
    quickPractice: {
      question: 'What is the "Yo" preterite form of "hablar"?',
      options: ['habló', 'hablé', 'hablaste', 'hablo'],
      correctAnswer: 'hablé',
      explanation: 'Regular -AR verbs take "-é" for Yo preterite.'
    }
  },

  lesson27: {
    lessonNumber: 27,
    partNumber: 7,
    title: 'Imperfect Tense & Only 3 Irregulars',
    subtitle: '-aba & -ía Endings + Era, Iba, Veía',
    professorNote: 'The imperfect describes past habits, ongoing background actions, age, and weather. Best news: ONLY 3 irregular verbs exist in the entire imperfect tense!',
    objectives: [
      'Master regular imperfect -AR (-aba) and -ER/-IR (-ía) endings',
      'Memorize the ONLY 3 irregular imperfect verbs (ser->era, ir->iba, ver->veía)',
      'Describe background scenes and past habits'
    ],
    grammarSections: [
      {
        title: 'The 3 Imperfect Irregular Verbs Table',
        table: {
          headers: ['Subject', 'SER (was/were)', 'IR (used to go)', 'VER (used to see)'],
          rows: [
            ['Yo', 'era', 'iba', 'veía'],
            ['Tú', 'eras', 'ibas', 'veías'],
            ['Él/Ella/Ud.', 'era', 'iba', 'veía'],
            ['Nosotros/as', 'éramos', 'íbamos', 'veíamos'],
            ['Ellos/as/Uds.', 'eran', 'iban', 'veían']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'era', phonetic: 'EH-rah', english: 'I was / used to be', usage: 'SER imperfect' },
      { spanish: 'iba', phonetic: 'EE-bah', english: 'I went / used to go', usage: 'IR imperfect' }
    ],
    exampleSentences: [
      { spanish: 'Cuando era niño, iba al parque todos los días.', english: 'When I was a child, I used to go to the park every day.', breakdown: 'Imperfect past habits.' }
    ],
    dialogue: [
      { speaker: 'Abuelo', spanish: 'Cuando yo era joven, no había teléfonos.', english: 'When I was young, there were no phones.' },
      { speaker: 'Nieto', spanish: '¡Increíble! ¿Qué hacías tú?', english: 'Incredible! What did you use to do?' }
    ],
    quickPractice: {
      question: 'How many irregular verbs exist in Spanish imperfect tense?',
      options: ['None', 'Only 3 (ser, ir, ver)', '12 verbs', 'Over 50'],
      correctAnswer: 'Only 3 (ser, ir, ver)',
      explanation: 'Only ser (era), ir (iba), and ver (veía) are irregular in imperfect.'
    }
  },

  lesson28: {
    lessonNumber: 28,
    partNumber: 7,
    title: 'Preterite Past Tense Irregulars',
    subtitle: 'Fui, Tuve, Estuve, Hice, Pude, Dije',
    professorNote: 'Irregular preterite verbs share a special set of endings without accents: -e, -iste, -o, -imos, -isteis, -ieron.',
    objectives: [
      'Learn shared Ser/Ir preterite (fui, fuiste, fue...)',
      'Master U-stems (tuve, estuve, pude, puse)',
      'Master I-stems (hice) and J-stems (dije, traje)'
    ],
    grammarSections: [
      {
        title: 'Irregular Preterite Stems Matrix',
        table: {
          headers: ['Infinitive', 'Irregular Stem', 'Yo Form', 'They Form'],
          rows: [
            ['ser / ir', 'fui-', 'fui (I was/went)', 'fueron'],
            ['estar', 'estuv-', 'estuve', 'estuvieron'],
            ['tener', 'tuv-', 'tuve', 'tuvieron'],
            ['hacer', 'hic- (hiz in 3rd)', 'hice', 'hicieron'],
            ['poder', 'pud-', 'pude', 'pudieron'],
            ['decir', 'dij-', 'dije', 'dijeron']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'fui', phonetic: 'fwee', english: 'I went / was', usage: 'Preterite of ir/ser' },
      { spanish: 'tuve', phonetic: 'TOO-veh', english: 'I had', usage: 'Preterite of tener' }
    ],
    exampleSentences: [
      { spanish: 'Ayer fui al mercado y estuve allí dos horas.', english: 'Yesterday I went to the market and was there two hours.', breakdown: 'Irregular preterite.' }
    ],
    dialogue: [
      { speaker: 'Ana', spanish: '¿Adónde fuiste ayer?', english: 'Where did you go yesterday?' },
      { speaker: 'Beto', spanish: 'Fui al cine y tuve una gran tarde.', english: 'I went to the movies and had a great afternoon.' }
    ],
    quickPractice: {
      question: 'What is the "Yo" preterite form of "tener"?',
      options: ['tenía', 'tuve', 'tuviera', 'tení'],
      correctAnswer: 'tuve',
      explanation: 'Tener preterite stem is tuv- -> tuve.'
    }
  },

  lesson29: {
    lessonNumber: 29,
    partNumber: 7,
    title: 'Preterite vs Imperfect Master Rules',
    subtitle: 'S.I.M.B.A. vs W.A.T.E.R.S. Framework',
    professorNote: 'Preterite tells WHAT happened (completed events). Imperfect sets the SCENE (what was going on).',
    objectives: [
      'Apply S.I.M.B.A. for Preterite triggers',
      'Apply W.A.T.E.R.S. for Imperfect triggers',
      'Form interrupted past sentences (Imperfect + CUANDO + Preterite)'
    ],
    grammarSections: [
      {
        title: 'SIMBA vs WATERS Framework',
        table: {
          headers: ['Preterite (S.I.M.B.A.)', 'Imperfect (W.A.T.E.R.S.)'],
          rows: [
            ['S - Single completed action', 'W - Weather in past (Hacía frío)'],
            ['I - Interrupting action', 'A - Age in past (Tenía 10 años)'],
            ['M - Main event of story', 'T - Time in past (Eran las dos)'],
            ['B - Beginning or End of action', 'E - Emotion / Mental state'],
            ['A - Arrival / Departure', 'R - Repetitive / Habitual action'],
            ['-', 'S - Setting the background scene']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'cuando', phonetic: 'KWAHN-doh', english: 'when (interruption connector)', usage: 'Preterite connector' }
    ],
    exampleSentences: [
      { spanish: 'Yo estudiaba (imperfect) cuando sonó (preterite) el teléfono.', english: 'I was studying when the phone rang.', breakdown: 'Ongoing background interrupted by completed event.' }
    ],
    dialogue: [
      { speaker: 'Elena', spanish: '¿Qué hacías cuando empezó la lluvia?', english: 'What were you doing when the rain started?' },
      { speaker: 'Carlos', spanish: 'Caminaba en el parque cuando empezó a llover.', english: 'I was walking in the park when it started raining.' }
    ],
    quickPractice: {
      question: 'Which tense describes ongoing background weather in the past?',
      options: ['Preterite', 'Imperfect', 'Present Progressive', 'Future'],
      correctAnswer: 'Imperfect',
      explanation: 'Background weather uses imperfect (WATERS rule).'
    }
  },

  lesson30: {
    lessonNumber: 30,
    partNumber: 7,
    title: 'Superlatives & Grand Synthesis',
    subtitle: 'El más..., -ísimo & Course Graduation',
    professorNote: 'Congratulations on reaching Lesson 30! Master absolute superlatives (-ísimo) and irregular comparisons to conclude your Spanish foundation.',
    objectives: [
      'Form relative superlatives (el más + adj + de)',
      'Add suffix -ísimo/a for absolute superlatives',
      'Master irregular comparatives (mejor, peor, mayor, menor)'
    ],
    grammarSections: [
      {
        title: 'Superlatives & Irregular Comparatives Table',
        table: {
          headers: ['Base Adjective', 'Comparative Form', 'Superlative Form', 'Absolute (-ísimo)'],
          rows: [
            ['bueno (good)', 'mejor (better)', 'el mejor (the best)', 'buenísimo (super good)'],
            ['malo (bad)', 'peor (worse)', 'el peor (the worst)', 'malísimo (super bad)'],
            ['grande (big/old)', 'mayor (older)', 'el mayor (the oldest)', 'grandísimo'],
            ['pequeño (small/young)', 'menor (younger)', 'el menor (the youngest)', 'pequeñísimo']
          ]
        }
      }
    ],
    vocabularyTable: [
      { spanish: 'mejor', phonetic: 'meh-HOHR', english: 'better', usage: 'Irregular comparative' },
      { spanish: 'el mejor', phonetic: 'ehl meh-HOHR', english: 'the best', usage: 'Superlative' },
      { spanish: 'altísimo', phonetic: 'ahl-TEE-see-moh', english: 'extremely tall', usage: 'Absolute superlative' }
    ],
    exampleSentences: [
      { spanish: 'Este curso de español es el mejor del mundo.', english: 'This Spanish course is the best in the world.', breakdown: 'Relative superlative el mejor de.' }
    ],
    dialogue: [
      { speaker: 'Profesor Worden', spanish: '¡Felicitaciones! Has completado todas las 30 lecciones de español.', english: 'Congratulations! You have completed all 30 Spanish lessons.' },
      { speaker: 'Estudiante', spanish: '¡Muchas gracias, profesor! ¡Ahora hablo español muchísimo mejor!', english: 'Thank you very much, professor! Now I speak Spanish so much better!' }
    ],
    quickPractice: {
      question: 'What is the absolute superlative for "alto" (extremely tall)?',
      options: ['más alto', 'altísimo', 'el más alto', 'altamente'],
      correctAnswer: 'altísimo',
      explanation: 'Adding suffix -ísimo forms absolute superlatives.'
    }
  }
};
