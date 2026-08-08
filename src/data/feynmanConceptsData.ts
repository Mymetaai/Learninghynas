export interface FeynmanConcept {
  id: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;
  title: string;
  promptQuestion: string;
  keyConceptsToCheck: string[]; // Keywords/ideas the AI parser validates in the user's simple explanation
  simpleExample: string;
}

export const feynmanConcepts: FeynmanConcept[] = [
  // --- A1 LEVEL (BEGINNER) ---
  {
    id: "fey_a1_1",
    cefrLevel: "A1",
    category: "Verbs",
    title: "Ser vs. Estar (Basics)",
    promptQuestion: "Explain to your Chibi when you should use 'Ser' versus when you should use 'Estar'.",
    keyConceptsToCheck: ["permanent", "temporary", "identity", "location", "condition", "origin", "who", "where", "feel"],
    simpleExample: "Use Ser for who you are or where you are from. Use Estar for how you feel or where you are right now."
  },
  {
    id: "fey_a1_2",
    cefrLevel: "A1",
    category: "Nouns & Gender",
    title: "Noun Gender Rules",
    promptQuestion: "How do you know if a Spanish noun is masculine or feminine?",
    keyConceptsToCheck: ["o ends", "a ends", "masculine", "feminine", "el", "la", "exceptions"],
    simpleExample: "Nouns ending in -o are usually masculine (el chico), and nouns ending in -a are usually feminine (la chica)."
  },
  {
    id: "fey_a1_3",
    cefrLevel: "A1",
    category: "Verbs",
    title: "Tener vs. Haber (Hay)",
    promptQuestion: "Explain the difference between 'Tengo' and 'Hay'.",
    keyConceptsToCheck: ["possession", "existence", "there is", "there are", "to have", "own"],
    simpleExample: "Tengo means 'I have' something I own. Hay means 'there is' or 'there are' something in a place."
  },
  {
    id: "fey_a1_4",
    cefrLevel: "A1",
    category: "Questions",
    title: "Qué vs. Cuál",
    promptQuestion: "How do you decide between 'Qué' and 'Cuál' when asking 'What'?",
    keyConceptsToCheck: ["definition", "choice", "selection", "which one", "options", "open"],
    simpleExample: "Use Qué for definitions or open questions. Use Cuál when choosing from a specific group or options."
  },
  {
    id: "fey_a1_5",
    cefrLevel: "A1",
    category: "Adjectives",
    title: "Possessive Adjectives",
    promptQuestion: "Explain how 'mi', 'tu', and 'su' change when talking about multiple items.",
    keyConceptsToCheck: ["plural", "mis", "tus", "sus", "match", "noun", "add -s"],
    simpleExample: "If the item is singular use 'mi libro', but if it is plural add an -s like 'mis libros'."
  },
  {
    id: "fey_a1_6",
    cefrLevel: "A1",
    category: "Articles",
    title: "Definite vs. Indefinite Articles",
    promptQuestion: "Explain when to use 'el/la' versus 'un/una' to your Chibi.",
    keyConceptsToCheck: ["specific", "general", "the", "a", "an", "known", "unknown"],
    simpleExample: "Use 'el/la' (the) when referring to a specific item both people know. Use 'un/una' (a/an) for any general item."
  },
  {
    id: "fey_a1_7",
    cefrLevel: "A1",
    category: "Pronouns",
    title: "Subject Pronouns (Tú vs. Usted)",
    promptQuestion: "When do you use 'tú' vs 'usted' when speaking to someone in Spanish?",
    keyConceptsToCheck: ["informal", "formal", "friend", "stranger", "respect", "polite", "elder"],
    simpleExample: "Use 'tú' with friends, family, and kids. Use 'usted' with strangers, elders, or to show formal respect."
  },
  {
    id: "fey_a1_8",
    cefrLevel: "A1",
    category: "Verbs",
    title: "-AR Verb Conjugation",
    promptQuestion: "Explain how to conjugate regular -AR verbs in the present tense.",
    keyConceptsToCheck: ["drop ar", "o", "as", "a", "amos", "an", "stem", "ending"],
    simpleExample: "Drop the -ar ending and add -o, -as, -a, -amos, -an depending on who is doing the action (hablo, hablas, habla)."
  },

  // --- A2 LEVEL (ELEMENTARY) ---
  {
    id: "fey_a2_1",
    cefrLevel: "A2",
    category: "Past Tense",
    title: "Preterite vs. Imperfect (Intro)",
    promptQuestion: "Explain the main difference between Preterite and Imperfect past tenses.",
    keyConceptsToCheck: ["completed action", "ongoing", "beginning", "end", "background", "habit", "used to"],
    simpleExample: "Preterite is a completed event with a clear start/end. Imperfect describes ongoing background habits or states."
  },
  {
    id: "fey_a2_2",
    cefrLevel: "A2",
    category: "Pronouns",
    title: "Direct Object Pronouns",
    promptQuestion: "How do 'lo', 'la', 'los', and 'las' replace nouns in a sentence?",
    keyConceptsToCheck: ["replaces", "noun", "directly", "action", "before verb", "gender", "number"],
    simpleExample: "Instead of saying 'I read the book', replace 'the book' with 'lo' and put it before the verb: 'Lo leo'."
  },
  {
    id: "fey_a2_3",
    cefrLevel: "A2",
    category: "Verbs",
    title: "Verbs Like Gustar",
    promptQuestion: "Why doesn't 'Me gusta' literally mean 'I like'?",
    keyConceptsToCheck: ["pleasing to me", "subject", "item", "indirect", "gustan", "plural"],
    simpleExample: "It literally means 'it is pleasing to me'. If the thing you like is plural, the verb changes to 'gustan'."
  },
  {
    id: "fey_a2_4",
    cefrLevel: "A2",
    category: "Verbs",
    title: "Reflexive Verbs",
    promptQuestion: "What is a reflexive verb and what does the pronoun 'se' or 'me' signify?",
    keyConceptsToCheck: ["oneself", "me", "te", "se", "routine", "subject equals object", "doing to self"],
    simpleExample: "A reflexive verb means the person doing the action is also the one receiving it, like washing oneself."
  },
  {
    id: "fey_a2_5",
    cefrLevel: "A2",
    category: "Comparatives",
    title: "Making Comparisons",
    promptQuestion: "How do you say something is 'more than' or 'less than' in Spanish?",
    keyConceptsToCheck: ["más que", "menos que", "tan como", "equality", "more", "less", "as"],
    simpleExample: "Use 'más [adjective] que' for more than, 'menos [adjective] que' for less than, and 'tan [adjective] como' for equal."
  },
  {
    id: "fey_a2_6",
    cefrLevel: "A2",
    category: "Verbs",
    title: "Present Progressive (Estar + -ando/-iendo)",
    promptQuestion: "How do you express an action happening right now in Spanish?",
    keyConceptsToCheck: ["estar", "ando", "iendo", "ing", "right now", "progressive", "currently"],
    simpleExample: "Combine Estar + the gerund: 'Estoy hablando' (I am speaking right now)."
  },
  {
    id: "fey_a2_7",
    cefrLevel: "A2",
    category: "Verbs",
    title: "Stem-Changing Verbs (Boot Verbs)",
    promptQuestion: "Explain what a stem-changing verb is and which forms do NOT change.",
    keyConceptsToCheck: ["stem", "vowel change", "e to ie", "o to ue", "nosotros", "boot", "outside boot"],
    simpleExample: "The middle vowel changes (e->ie, o->ue) for yo/tú/él/ellos, but never changes for nosotros!"
  },

  // --- B1 LEVEL (INTERMEDIATE) ---
  {
    id: "fey_b1_1",
    cefrLevel: "B1",
    category: "Prepositions",
    title: "Por vs. Para",
    promptQuestion: "Explain the fundamental difference between 'Por' and 'Para'.",
    keyConceptsToCheck: ["cause", "effect", "destination", "deadline", "exchange", "reason", "purpose", "goal"],
    simpleExample: "Use Para for destinations, goals, and deadlines (looking forward). Use Por for causes, travel paths, and exchanges (looking back)."
  },
  {
    id: "fey_b1_2",
    cefrLevel: "B1",
    category: "Subjunctive",
    title: "Subjunctive Triggers (WEIRDO)",
    promptQuestion: "When do you switch from Indicative to Subjunctive mood?",
    keyConceptsToCheck: ["doubt", "wishes", "emotions", "uncertainty", "not factual", "weirdo", "desire"],
    simpleExample: "Switch to subjunctive when expressing wishes, doubts, feelings, or non-realities rather than plain facts."
  },
  {
    id: "fey_b1_3",
    cefrLevel: "B1",
    category: "Pronouns",
    title: "Double Object Pronouns (Se lo)",
    promptQuestion: "Why does 'le lo' turn into 'se lo' in Spanish sentences?",
    keyConceptsToCheck: ["two L words", "sound", "phonetics", "le changes to se", "indirect before direct", "alliteration"],
    simpleExample: "Spanish avoids putting two 'L' sounds together like 'le lo', so 'le' changes to 'se' to sound smoother."
  },
  {
    id: "fey_b1_4",
    cefrLevel: "B1",
    category: "Commands",
    title: "Formal vs. Informal Commands",
    promptQuestion: "How do command endings flip depending on whether you talk to a friend (Tú) or a stranger (Usted)?",
    keyConceptsToCheck: ["opposite vowel", "ar to e", "er ir to a", "respect", "familiar", "flip"],
    simpleExample: "For formal commands (Usted) or negative commands, use the 'opposite vowel' ending."
  },
  {
    id: "fey_b1_5",
    cefrLevel: "B1",
    category: "Relative Clauses",
    title: "Que vs. Quien vs. Lo Que",
    promptQuestion: "Explain when to use 'que', 'quien', and 'lo que' when linking sentences.",
    keyConceptsToCheck: ["que for things", "quien for people after preposition", "lo que for abstract idea", "what/that"],
    simpleExample: "Use 'que' for things/people, 'quien' after prepositions for people, and 'lo que' for abstract ideas ('what/that which')."
  },

  // --- B2 LEVEL (UPPER INTERMEDIATE) ---
  {
    id: "fey_b2_1",
    cefrLevel: "B2",
    category: "Subjunctive",
    title: "Subjunctive in Adverbial Clauses",
    promptQuestion: "Why do phrases like 'Antes de que' or 'A menos que' always trigger the Subjunctive?",
    keyConceptsToCheck: ["hasn't happened", "hypothetical", "condition", "time clause", "pending action", "future"],
    simpleExample: "Because they introduce events that have not yet occurred or are conditional on something else happening."
  },
  {
    id: "fey_b2_2",
    cefrLevel: "B2",
    category: "Conditionals",
    title: "Hypothetical If Clauses",
    promptQuestion: "How do you form a 'Si' clause for imaginary situations (e.g., 'If I were rich...')?",
    keyConceptsToCheck: ["imperfect subjunctive", "conditional", "si tuviera", "compraría", "unreal", "imaginary"],
    simpleExample: "Pair 'Si' + Imperfect Subjunctive with the Conditional tense: 'Si tuviera dinero, viajaría'."
  },
  {
    id: "fey_b2_3",
    cefrLevel: "B2",
    category: "Verbs",
    title: "Preterite vs. Imperfect Meaning Shifts",
    promptQuestion: "Explain how verbs like 'Saber' or 'Conocer' change meaning in the Preterite.",
    keyConceptsToCheck: ["saber = found out", "conocer = met", "point in time", "state vs event", "discovered"],
    simpleExample: "In the preterite, 'Supe' means 'I found out' (a moment) while 'Sabía' means 'I knew' (a background state)."
  },
  {
    id: "fey_b2_4",
    cefrLevel: "B2",
    category: "Passive Voice",
    title: "Passive 'Se' vs. True Passive",
    promptQuestion: "Explain why native speakers prefer 'Se habla español' over 'Español es hablado'.",
    keyConceptsToCheck: ["passive se", "impersonal", "natural", "agent unknown", "avoid ser + participle"],
    simpleExample: "Native speakers prefer 'Se' + verb because it sounds active and natural without naming who performs the action."
  },

  // --- C1 LEVEL (ADVANCED) ---
  {
    id: "fey_c1_1",
    cefrLevel: "C1",
    category: "Nuance & Style",
    title: "Sino vs. Sino Que",
    promptQuestion: "Explain the subtle difference between 'sino' and 'sino que' when correcting a statement.",
    keyConceptsToCheck: ["noun contrast", "conjugated verb", "but rather", "negation first", "clause"],
    simpleExample: "Use 'sino' when contrasting with a noun (no azul sino rojo), and 'sino que' when followed by a new conjugated verb."
  },
  {
    id: "fey_c1_2",
    cefrLevel: "C1",
    category: "Advanced Subjunctive",
    title: "Concessive Clauses (Por más que...)",
    promptQuestion: "How does 'Por más que' take Subjunctive vs. Indicative depending on certainty?",
    keyConceptsToCheck: ["matter how much", "indicative for fact", "subjunctive for future", "hypothetical", "certainty"],
    simpleExample: "Use indicative if stating a proven struggle ('Por más que estudio, no apruebo'), and subjunctive if hypothetical ('Por más que estudie, no aprobaré')."
  },
  {
    id: "fey_c1_3",
    cefrLevel: "C1",
    category: "Discourse Markers",
    title: "Formal Transition Markers",
    promptQuestion: "Explain to your Chibi how to use 'sin embargo', 'no obstante', and 'por ende' in academic Spanish.",
    keyConceptsToCheck: ["however", "nevertheless", "therefore", "register", "formal", "transition"],
    simpleExample: "'Sin embargo' and 'no obstante' mean however/nevertheless. 'Por ende' means therefore/as a consequence."
  }
];
