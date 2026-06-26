// Hinglish Translation Helper
// Maps English sentences and words to Hinglish (Hindi written in Latin script mixed with English).

const SENTENCE_TRANSLATIONS: Record<string, string> = {
  // Companion greetings (Elena, Mateo, Diego)
  "Hello, TheLearningHyena! What a joy to receive your letter. I am in the Andes mountains looking for a very rare red flower. The air here is very cold, but the view is beautiful. Do you like exploring nature?":
    "Hello, TheLearningHyena! Aapka letter receive karke bahut khushi hui. Main Andes mountains mein ek bahut rare red flower dhoond rahi hoon. Yahan ki hawa bahut thandi hai, par view bahut beautiful hai. Kya aapko nature explore karna pasand hai?",

  "Hello, TheLearningHyena! I am drawing an ancient map of a temple hidden in the jungle. The paths are full of mud and giant trees. Do you have your compass ready for the adventure?":
    "Hello, TheLearningHyena! Main jungle mein chhupe ek ancient temple ka map bana raha hoon. Raste keechad aur bade-bade trees se bhare hain. Kya aapki compass adventure ke liye ready hai?",

  "Hello, TheLearningHyena! I just took some crusty sourdough loaves and golden croissants out of the stone oven. It smells wonderful throughout the neighborhood. Would you like to have a traditional bread with olive oil and tomato for breakfast?":
    "Hello, TheLearningHyena! Maine abhi stone oven se garam sourdough loaves aur golden croissants nikale hain. Poore neighborhood mein bahut acchi khushbu aa rahi hai. Kya aap breakfast mein olive oil aur tomato ke sath traditional bread khana pasand karenge?",

  // Quest 1 Lines
  "¡Hola! TheLearningHyena arrives at the village.":
    "¡Hola! TheLearningHyena village mein pahunchta hai.",
  "A woman smiles and says: \"¡Hola! ¡Buenos días!\"":
    "Ek woman smile karti hai aur bolti hai: \"¡Hola! ¡Buenos días!\"",
  "You answer: \"¡Hola! ¿Cómo estás?\"":
    "Aap answer karte hain: \"¡Hola! ¿Cómo estás?\"",
  "She laughs: \"Muy bien, gracias. ¿Y tú?\"":
    "Woh hasti hai: \"Muy bien, gracias. ¿Y tú?\"",
  "You say: \"Bien.\" Then you add: \"¡Adiós!\"":
    "Aap bolte hain: \"Bien.\" Phir add karte hain: \"¡Adiós!\"",
  "The villagers wave. \"¡Hasta mañana!\" they call.":
    "Villagers wave karte hain. \"¡Hasta mañana!\" woh bolte hain.",

  // Story 1: El Perro Alegre
  "I have a small dog.": "Mere paas ek chota dog hai.",
  "The dog runs a lot in the park.": "Dog park mein bahut bhaagta hai.",
  "It is very happy and plays with a ball.": "Woh bahut khush hai aur ek ball ke sath khelta hai.",

  // Story 2: La Manzana Roja
  "I see a red apple on the table.": "Mujhe table par ek red apple dikh raha hai.",
  "The apple is big and sweet.": "Apple bada aur meetha hai.",
  "I eat the apple in the morning.": "Main subah apple khata hoon.",

  // Story 3: El Gato Dormilón
  "The cat sleeps on the warm sofa.": "Cat garam sofa par so rahi hai.",
  "The sun shines through the window.": "Khidki se dhoop aa rahi hai.",
  "The cat wakes up and plays.": "Cat uthti hai aur khelti hai.",

  // Story 4: El Libro Perdido
  "I look for my Spanish book.": "Main apni Spanish book dhoond raha hoon.",
  "The book is not under the bed.": "Book bed ke neeche nahi hai.",
  "Ah, it is on the kitchen table!": "Ah, yeh toh kitchen table par hai!",

  // Story 5: El Café Caliente
  "I drink a cup of coffee.": "Main ek cup coffee peeta hoon.",
  "The coffee is very hot and black.": "Coffee bahut garam aur black hai.",
  "It gives me energy for the day.": "Isse mujhe poore din ke liye energy milti hai.",

  // Dialogues / general companion fallbacks
  "What an interesting letter! The mountains inspire me to think of wildlife. Do you prefer mountains or warm beaches?":
    "Bahut hi interesting letter hai! Mountains mujhe wildlife ke baare mein sochne ke liye inspire karte hain. Kya aapko mountains pasand hain ya warm beaches?",

  "Yes, I love walking in the forest.": "Haan, mujhe jungle mein walk karna bahut pasand hai.",
  "I prefer to stay in the city.": "Main city mein rehna prefer karta hoon.",
  "What kind of plants do you study?": "Aap kis type ke plants study karte ho?",

  "Yes, my compass always guides me.": "Haan, meri compass hamesha mujhe guide karti hai.",
  "No, I prefer to use digital maps.": "Nahi, main digital maps use karna prefer karta hoon.",
  "What dangers are in that jungle?": "Uss jungle mein kya-kya dangers hain?",

  "Yes, please! It sounds delicious.": "Haan, please! Yeh bahut delicious lag raha hai.",
  "I prefer sweet bread with butter.": "Mujhe butter ke sath sweet bread prefer hai.",
  "How do you prepare the sourdough starter?": "Aap sourdough starter kaise prepare karte ho?"
};

const WORD_TRANSLATIONS: Record<string, string> = {
  // Vocabulary translations
  "dog": "kutta (dog)",
  "runs": "bhaagta hai",
  "ball": "ball (gaind)",
  "apple": "seb (apple)",
  "big": "bada",
  "sweet": "meetha",
  "morning": "subah",
  "cat": "billi (cat)",
  "sleeps": "soti hai",
  "sofa": "sofa",
  "sun": "suraj",
  "window": "khidki",
  "book": "kitaab (book)",
  "bed": "bed (bistar)",
  "table": "table / mez",
  "kitchen": "kitchen / rasoi",
  "coffee": "coffee",
  "hot": "garam",
  "black": "black (kali)",
  "energy": "energy",
  "day": "din",
  "water": "paani (water)",
  "cold": "thanda",
  "house": "ghar (house)",
  "family": "family (parivar)",
  "yellow": "peela",
  "blue": "neela",
  "red": "lal",
  "green": "hara",
  "white": "safed",
  "car": "car / gaadi",
  "fast": "tez",
  "street": "sadak / street",
  "flower": "phool (flower)",
  "garden": "garden (bageecha)",
  "beautiful": "sundar (beautiful)",
  "sky": "aasmaan",
  "clouds": "baadal (clouds)",
  "bird": "chidiya (bird)",
  "sing": "gaana",
  "milk": "doodh (milk)",
  "drinks": "peeta hai",
  "night": "raat",
  "bread": "bread (double roti)",
  "forest": "jungle",
  "tree": "ped (tree)",
  "river": "nadi (river)",
  "mountain": "pahaad",
  "rain": "baarish",
  "umbrella": "chata (umbrella)",
  "tea": "chai (tea)",
  "sugar": "cheeni / shakkar",
  "school": "school",
  "teacher": "teacher",
  "friend": "dost (friend)",
  "city": "city / shehar",
  "sea": "samundar (sea)",
  "fish": "machli (fish)",
  "swim": "taerna",
  "wind": "hawa",
  "office": "office",
  "busy": "busy (vyast)",
  "brother": "bhai",
  "sister": "behen",
  "mother": "mummy / maa",
  "father": "papa / pita",
  "breakfast": "breakfast (nashta)",
  "traditional": "traditional",
  "jungle": "jungle",
  "compass": "compass",
  "adventure": "adventure",
  "map": "map (naksha)",
  "temple": "temple (mandir)",
  "nature": "nature (prakriti)",
  "explore": "explore (khoj)"
};

/**
 * Translates an English word/meaning to Hinglish.
 */
export const translateWordToHinglish = (englishWord: string): string => {
  const clean = englishWord.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (WORD_TRANSLATIONS[clean]) {
    return WORD_TRANSLATIONS[clean];
  }
  return englishWord;
};

/**
 * Translates a complete English sentence or phrase into Hinglish.
 */
export const translateToHinglish = (englishText: string): string => {
  const trimmed = englishText.trim();
  
  // 1. Direct sentence lookup
  if (SENTENCE_TRANSLATIONS[trimmed]) {
    return SENTENCE_TRANSLATIONS[trimmed];
  }

  // Check case-insensitive match
  for (const [en, hing] of Object.entries(SENTENCE_TRANSLATIONS)) {
    if (en.toLowerCase() === trimmed.toLowerCase()) {
      return hing;
    }
  }

  // 2. Simple word-by-word fallback if it's a short text (less than 4 words)
  const words = trimmed.split(/\s+/);
  if (words.length <= 3) {
    const translated = words.map(w => {
      const cleanWord = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      const trans = WORD_TRANSLATIONS[cleanWord.toLowerCase()];
      if (trans) {
        // Keep punctuation
        return w.replace(cleanWord, trans);
      }
      return w;
    });
    return translated.join(" ");
  }

  // 3. Fallback to English but let's do a couple of common regex replacements
  let processed = trimmed
    .replace(/\bI have a\b/gi, "Mere paas ek")
    .replace(/\bDo you like\b/gi, "Kya aapko pasand hai")
    .replace(/\bI prefer to\b/gi, "Main prefer karta hoon");

  return processed;
};
