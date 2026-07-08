# Implementation plan: A1-C1 vocabulary system + unified flashcard / fill-in-the-blank flow

## Instructions for the agent (Antigravity)

This file is a handoff spec, not just data. Do the following, in order:

1. **Locate the existing vocab folder** in this project (the user has already pasted one in). Read every file in it and log the schema currently in use — field names, file format (JSON/TS/CSV), and how items are grouped (by level, by category, or flat).
2. **Merge, don't overwrite.** Take the `VocabItem` dataset in section 3 below and merge it into the existing folder using the existing schema if one is already established. Only adopt the schema in section 2 if no existing schema is found. Deduplicate on a normalized key: `level + category + es.toLowerCase().trim()`.
3. **Build the unified card flow** described in section 4 — the Fill in the Blanks exercise (see the uploaded UI screenshot) should reuse the same deck/advance/progress logic as the Flashcard Shuffle screen, not a separate implementation.
4. **Upgrade the flashcard back face** per section 5 — animated with Framer Motion, using a 21st.dev component as the base primitive rather than building the flip from scratch.
5. Flag anything in section 3 that conflicts with real-world usage or regional variants — this seed data is a starting point, not a final authority.

---

## 1. Current scope

The project already has a Flashcard Shuffle screen and a Sentence Practice / Fill in the Blanks screen (see screenshot: categories are Greetings, Action Verbs, Household, Telling Time). Today these appear to be built as separate flows. The goal here is to:

- extend the vocab data from A1 up through C1
- unify the two exercise types around one shared deck/progress model
- make the flashcard's back face feel alive (not just a text swap)

## 2. Data schema

Adopt this shape unless the existing vocab folder already defines one — in that case, map these fields onto the existing ones instead of introducing a second schema.

```ts
export interface VocabItem {
  id: string;                    // stable slug, e.g. "a1-042"
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;               // e.g. "Saludos", "Subjuntivo"
  es: string;                     // Spanish term or phrase
  en: string;                     // English translation
  example?: string;               // Spanish example sentence
  exampleTranslation?: string;    // English translation of the example
  tags?: string[];                // e.g. ["verb", "irregular", "regional:Spain"]
}
```

Suggested file layout:

```
src/data/vocab/
  a1.json
  a2.json
  b1.json
  b2.json
  c1.json
  index.ts   // exports a flattened VocabItem[] + helpers (byLevel, byCategory)
```

## 3. Seed dataset (merge this in)

### A1 — foundations (77 items across 5 categories)

```json
[
  {"id":"a1-001","level":"A1","category":"Saludos","es":"Hola","en":"Hello"},
  {"id":"a1-002","level":"A1","category":"Saludos","es":"Buenos días","en":"Good morning"},
  {"id":"a1-003","level":"A1","category":"Saludos","es":"Buenas tardes","en":"Good afternoon"},
  {"id":"a1-004","level":"A1","category":"Saludos","es":"Buenas noches","en":"Good night / evening"},
  {"id":"a1-005","level":"A1","category":"Saludos","es":"¿Cómo estás?","en":"How are you? (informal)"},
  {"id":"a1-006","level":"A1","category":"Saludos","es":"¿Cómo está usted?","en":"How are you? (formal)"},
  {"id":"a1-007","level":"A1","category":"Saludos","es":"Muy bien, gracias","en":"Very well, thanks"},
  {"id":"a1-008","level":"A1","category":"Saludos","es":"¿Y tú?","en":"And you? (informal)"},
  {"id":"a1-009","level":"A1","category":"Saludos","es":"¿Y usted?","en":"And you? (formal)"},
  {"id":"a1-010","level":"A1","category":"Saludos","es":"Me llamo...","en":"My name is..."},
  {"id":"a1-011","level":"A1","category":"Saludos","es":"¿Cómo te llamas?","en":"What's your name?"},
  {"id":"a1-012","level":"A1","category":"Saludos","es":"Mucho gusto","en":"Nice to meet you"},
  {"id":"a1-013","level":"A1","category":"Saludos","es":"Encantado/a","en":"Pleased to meet you"},
  {"id":"a1-014","level":"A1","category":"Saludos","es":"Adiós","en":"Goodbye"},
  {"id":"a1-015","level":"A1","category":"Saludos","es":"Hasta luego","en":"See you later"},
  {"id":"a1-016","level":"A1","category":"Saludos","es":"Hasta mañana","en":"See you tomorrow"},
  {"id":"a1-017","level":"A1","category":"Saludos","es":"Nos vemos","en":"See you around"},
  {"id":"a1-018","level":"A1","category":"Verbos","es":"trabajar","en":"to work"},
  {"id":"a1-019","level":"A1","category":"Verbos","es":"comer","en":"to eat"},
  {"id":"a1-020","level":"A1","category":"Verbos","es":"estudiar","en":"to study"},
  {"id":"a1-021","level":"A1","category":"Verbos","es":"dormir","en":"to sleep"},
  {"id":"a1-022","level":"A1","category":"Verbos","es":"despertarse","en":"to wake up"},
  {"id":"a1-023","level":"A1","category":"Verbos","es":"levantarse","en":"to get up"},
  {"id":"a1-024","level":"A1","category":"Verbos","es":"desayunar","en":"to have breakfast"},
  {"id":"a1-025","level":"A1","category":"Verbos","es":"almorzar","en":"to have lunch"},
  {"id":"a1-026","level":"A1","category":"Verbos","es":"cenar","en":"to have dinner"},
  {"id":"a1-027","level":"A1","category":"Verbos","es":"leer","en":"to read"},
  {"id":"a1-028","level":"A1","category":"Verbos","es":"escribir","en":"to write"},
  {"id":"a1-029","level":"A1","category":"Verbos","es":"hablar","en":"to speak"},
  {"id":"a1-030","level":"A1","category":"Verbos","es":"escuchar","en":"to listen"},
  {"id":"a1-031","level":"A1","category":"Verbos","es":"caminar","en":"to walk"},
  {"id":"a1-032","level":"A1","category":"Verbos","es":"conducir","en":"to drive"},
  {"id":"a1-033","level":"A1","category":"Verbos","es":"limpiar","en":"to clean"},
  {"id":"a1-034","level":"A1","category":"Verbos","es":"cocinar","en":"to cook"},
  {"id":"a1-035","level":"A1","category":"Verbos","es":"descansar","en":"to rest"},
  {"id":"a1-036","level":"A1","category":"Verbos","es":"salir","en":"to go out"},
  {"id":"a1-037","level":"A1","category":"Verbos","es":"llegar","en":"to arrive"},
  {"id":"a1-038","level":"A1","category":"Casa","es":"la mesa","en":"the table"},
  {"id":"a1-039","level":"A1","category":"Casa","es":"la silla","en":"the chair"},
  {"id":"a1-040","level":"A1","category":"Casa","es":"el televisor","en":"the TV set"},
  {"id":"a1-041","level":"A1","category":"Casa","es":"la cama","en":"the bed"},
  {"id":"a1-042","level":"A1","category":"Casa","es":"el sofá","en":"the sofa"},
  {"id":"a1-043","level":"A1","category":"Casa","es":"la cocina","en":"the kitchen"},
  {"id":"a1-044","level":"A1","category":"Casa","es":"el baño","en":"the bathroom"},
  {"id":"a1-045","level":"A1","category":"Casa","es":"la nevera","en":"the fridge"},
  {"id":"a1-046","level":"A1","category":"Casa","es":"la puerta","en":"the door"},
  {"id":"a1-047","level":"A1","category":"Casa","es":"la ventana","en":"the window"},
  {"id":"a1-048","level":"A1","category":"Casa","es":"el armario","en":"the closet"},
  {"id":"a1-049","level":"A1","category":"Casa","es":"la lámpara","en":"the lamp"},
  {"id":"a1-050","level":"A1","category":"Casa","es":"el espejo","en":"the mirror"},
  {"id":"a1-051","level":"A1","category":"Casa","es":"la almohada","en":"the pillow"},
  {"id":"a1-052","level":"A1","category":"Casa","es":"la manta","en":"the blanket"},
  {"id":"a1-053","level":"A1","category":"Casa","es":"el fregadero","en":"the sink"},
  {"id":"a1-054","level":"A1","category":"Casa","es":"la estufa","en":"the stove"},
  {"id":"a1-055","level":"A1","category":"Casa","es":"el microondas","en":"the microwave"},
  {"id":"a1-056","level":"A1","category":"Hora","es":"¿Qué hora es?","en":"What time is it?"},
  {"id":"a1-057","level":"A1","category":"Hora","es":"Es la una","en":"It's one o'clock"},
  {"id":"a1-058","level":"A1","category":"Hora","es":"Son las dos","en":"It's two o'clock"},
  {"id":"a1-059","level":"A1","category":"Hora","es":"Son las tres y media","en":"It's 3:30"},
  {"id":"a1-060","level":"A1","category":"Hora","es":"Son las cuatro y cuarto","en":"It's 4:15"},
  {"id":"a1-061","level":"A1","category":"Hora","es":"Son las cinco menos cuarto","en":"It's 4:45"},
  {"id":"a1-062","level":"A1","category":"Hora","es":"de la mañana","en":"in the morning"},
  {"id":"a1-063","level":"A1","category":"Hora","es":"de la tarde","en":"in the afternoon"},
  {"id":"a1-064","level":"A1","category":"Hora","es":"de la noche","en":"at night"},
  {"id":"a1-065","level":"A1","category":"Hora","es":"en punto","en":"on the dot"},
  {"id":"a1-066","level":"A1","category":"Hora","es":"mediodía","en":"noon"},
  {"id":"a1-067","level":"A1","category":"Hora","es":"medianoche","en":"midnight"},
  {"id":"a1-068","level":"A1","category":"Clima","es":"Hace sol","en":"It's sunny"},
  {"id":"a1-069","level":"A1","category":"Clima","es":"Hace calor","en":"It's hot"},
  {"id":"a1-070","level":"A1","category":"Clima","es":"Hace frío","en":"It's cold"},
  {"id":"a1-071","level":"A1","category":"Clima","es":"Hace viento","en":"It's windy"},
  {"id":"a1-072","level":"A1","category":"Clima","es":"Llueve","en":"It's raining"},
  {"id":"a1-073","level":"A1","category":"Clima","es":"Nieva","en":"It's snowing"},
  {"id":"a1-074","level":"A1","category":"Clima","es":"Está nublado","en":"It's cloudy"},
  {"id":"a1-075","level":"A1","category":"Clima","es":"Hace buen tiempo","en":"The weather's nice"},
  {"id":"a1-076","level":"A1","category":"Clima","es":"Hace mal tiempo","en":"The weather's bad"},
  {"id":"a1-077","level":"A1","category":"Clima","es":"Hay tormenta","en":"There's a storm"}
]
```

### A2 — past tense, shopping, directions (28 items)

```json
[
  {"id":"a2-001","level":"A2","category":"Pasado","es":"comí","en":"I ate (preterite)"},
  {"id":"a2-002","level":"A2","category":"Pasado","es":"comía","en":"I used to eat (imperfect)"},
  {"id":"a2-003","level":"A2","category":"Pasado","es":"fui","en":"I went / I was (preterite)"},
  {"id":"a2-004","level":"A2","category":"Pasado","es":"era","en":"I was (imperfect)"},
  {"id":"a2-005","level":"A2","category":"Pasado","es":"hice","en":"I did / made (preterite)"},
  {"id":"a2-006","level":"A2","category":"Pasado","es":"hacía","en":"I used to do (imperfect)"},
  {"id":"a2-007","level":"A2","category":"Pasado","es":"dije","en":"I said (preterite)"},
  {"id":"a2-008","level":"A2","category":"Pasado","es":"tuve","en":"I had (preterite, event)"},
  {"id":"a2-009","level":"A2","category":"Pasado","es":"tenía","en":"I had / used to have (imperfect)"},
  {"id":"a2-010","level":"A2","category":"Pasado","es":"viví","en":"I lived (preterite)"},
  {"id":"a2-011","level":"A2","category":"Compras","es":"la tienda","en":"the store"},
  {"id":"a2-012","level":"A2","category":"Compras","es":"el precio","en":"the price"},
  {"id":"a2-013","level":"A2","category":"Compras","es":"¿Cuánto cuesta?","en":"How much does it cost?"},
  {"id":"a2-014","level":"A2","category":"Compras","es":"barato","en":"cheap"},
  {"id":"a2-015","level":"A2","category":"Compras","es":"caro","en":"expensive"},
  {"id":"a2-016","level":"A2","category":"Compras","es":"la talla","en":"the size"},
  {"id":"a2-017","level":"A2","category":"Compras","es":"probarse","en":"to try on"},
  {"id":"a2-018","level":"A2","category":"Compras","es":"pagar","en":"to pay"},
  {"id":"a2-019","level":"A2","category":"Compras","es":"el recibo","en":"the receipt"},
  {"id":"a2-020","level":"A2","category":"Compras","es":"la tarjeta de crédito","en":"the credit card"},
  {"id":"a2-021","level":"A2","category":"Direcciones","es":"a la derecha","en":"to the right"},
  {"id":"a2-022","level":"A2","category":"Direcciones","es":"a la izquierda","en":"to the left"},
  {"id":"a2-023","level":"A2","category":"Direcciones","es":"todo recto","en":"straight ahead"},
  {"id":"a2-024","level":"A2","category":"Direcciones","es":"la esquina","en":"the corner"},
  {"id":"a2-025","level":"A2","category":"Direcciones","es":"el semáforo","en":"the traffic light"},
  {"id":"a2-026","level":"A2","category":"Direcciones","es":"cerca de","en":"near"},
  {"id":"a2-027","level":"A2","category":"Direcciones","es":"lejos de","en":"far from"},
  {"id":"a2-028","level":"A2","category":"Direcciones","es":"cruzar","en":"to cross"}
]
```

### B1 — opinions, travel, subjunctive triggers, connectors (24 items)

```json
[
  {"id":"b1-001","level":"B1","category":"Opiniones","es":"Creo que...","en":"I think that..."},
  {"id":"b1-002","level":"B1","category":"Opiniones","es":"En mi opinión","en":"In my opinion"},
  {"id":"b1-003","level":"B1","category":"Opiniones","es":"Estoy de acuerdo","en":"I agree"},
  {"id":"b1-004","level":"B1","category":"Opiniones","es":"No estoy de acuerdo","en":"I disagree"},
  {"id":"b1-005","level":"B1","category":"Opiniones","es":"Depende","en":"It depends"},
  {"id":"b1-006","level":"B1","category":"Opiniones","es":"Por un lado... por otro lado...","en":"On one hand... on the other hand..."},
  {"id":"b1-007","level":"B1","category":"Viajes","es":"el vuelo","en":"the flight"},
  {"id":"b1-008","level":"B1","category":"Viajes","es":"el equipaje","en":"the luggage"},
  {"id":"b1-009","level":"B1","category":"Viajes","es":"facturar","en":"to check in"},
  {"id":"b1-010","level":"B1","category":"Viajes","es":"el alojamiento","en":"the accommodation"},
  {"id":"b1-011","level":"B1","category":"Viajes","es":"la reserva","en":"the reservation"},
  {"id":"b1-012","level":"B1","category":"Viajes","es":"perderse","en":"to get lost"},
  {"id":"b1-013","level":"B1","category":"Subjuntivo","es":"Es importante que...","en":"It's important that... (+ subjunctive)"},
  {"id":"b1-014","level":"B1","category":"Subjuntivo","es":"Quiero que...","en":"I want... (+ subjunctive)"},
  {"id":"b1-015","level":"B1","category":"Subjuntivo","es":"Espero que...","en":"I hope that... (+ subjunctive)"},
  {"id":"b1-016","level":"B1","category":"Subjuntivo","es":"Ojalá","en":"I hope / if only (+ subjunctive)"},
  {"id":"b1-017","level":"B1","category":"Subjuntivo","es":"Dudo que...","en":"I doubt that... (+ subjunctive)"},
  {"id":"b1-018","level":"B1","category":"Conectores","es":"sin embargo","en":"however"},
  {"id":"b1-019","level":"B1","category":"Conectores","es":"además","en":"furthermore"},
  {"id":"b1-020","level":"B1","category":"Conectores","es":"por lo tanto","en":"therefore"},
  {"id":"b1-021","level":"B1","category":"Conectores","es":"aunque","en":"although"},
  {"id":"b1-022","level":"B1","category":"Conectores","es":"mientras tanto","en":"meanwhile"},
  {"id":"b1-023","level":"B1","category":"Conectores","es":"a pesar de","en":"despite"},
  {"id":"b1-024","level":"B1","category":"Conectores","es":"sin duda","en":"undoubtedly"}
]
```

### B2 — abstract topics, reported speech, conditional (18 items)

```json
[
  {"id":"b2-001","level":"B2","category":"Temas abstractos","es":"el desempleo","en":"unemployment"},
  {"id":"b2-002","level":"B2","category":"Temas abstractos","es":"la desigualdad","en":"inequality"},
  {"id":"b2-003","level":"B2","category":"Temas abstractos","es":"el medio ambiente","en":"the environment"},
  {"id":"b2-004","level":"B2","category":"Temas abstractos","es":"la sostenibilidad","en":"sustainability"},
  {"id":"b2-005","level":"B2","category":"Temas abstractos","es":"el envejecimiento","en":"aging (of a population)"},
  {"id":"b2-006","level":"B2","category":"Temas abstractos","es":"la globalización","en":"globalization"},
  {"id":"b2-007","level":"B2","category":"Temas abstractos","es":"el reto","en":"the challenge"},
  {"id":"b2-008","level":"B2","category":"Estilo indirecto","es":"Dijo que...","en":"He/she said that..."},
  {"id":"b2-009","level":"B2","category":"Estilo indirecto","es":"Me preguntó si...","en":"He/she asked me if..."},
  {"id":"b2-010","level":"B2","category":"Estilo indirecto","es":"Afirmó que...","en":"He/she stated that..."},
  {"id":"b2-011","level":"B2","category":"Condicional","es":"Si tuviera tiempo...","en":"If I had time... (+ conditional)"},
  {"id":"b2-012","level":"B2","category":"Condicional","es":"Me gustaría...","en":"I would like..."},
  {"id":"b2-013","level":"B2","category":"Condicional","es":"Habría hecho...","en":"I would have done..."},
  {"id":"b2-014","level":"B2","category":"Conectores avanzados","es":"no obstante","en":"nevertheless"},
  {"id":"b2-015","level":"B2","category":"Conectores avanzados","es":"en cuanto a","en":"regarding"},
  {"id":"b2-016","level":"B2","category":"Conectores avanzados","es":"de hecho","en":"in fact"},
  {"id":"b2-017","level":"B2","category":"Conectores avanzados","es":"cabe destacar que","en":"it's worth noting that"},
  {"id":"b2-018","level":"B2","category":"Conectores avanzados","es":"teniendo en cuenta que","en":"taking into account that"}
]
```

### C1 — idioms, register, discourse markers, false friends (18 items)

```json
[
  {"id":"c1-001","level":"C1","category":"Modismos","es":"meter la pata","en":"to mess up / put your foot in it"},
  {"id":"c1-002","level":"C1","category":"Modismos","es":"no tener pelos en la lengua","en":"to speak bluntly"},
  {"id":"c1-003","level":"C1","category":"Modismos","es":"estar en las nubes","en":"to be daydreaming"},
  {"id":"c1-004","level":"C1","category":"Modismos","es":"tirar la toalla","en":"to give up"},
  {"id":"c1-005","level":"C1","category":"Modismos","es":"costar un ojo de la cara","en":"to cost an arm and a leg"},
  {"id":"c1-006","level":"C1","category":"Modismos","es":"ponerse las pilas","en":"to get one's act together"},
  {"id":"c1-007","level":"C1","category":"Registro","es":"acorde a","en":"in accordance with (formal)"},
  {"id":"c1-008","level":"C1","category":"Registro","es":"o sea","en":"that is / I mean (informal filler)"},
  {"id":"c1-009","level":"C1","category":"Registro","es":"a día de hoy","en":"nowadays (formal)"},
  {"id":"c1-010","level":"C1","category":"Registro","es":"tío/tía","en":"dude/mate (very informal, Spain)"},
  {"id":"c1-011","level":"C1","category":"Marcadores","es":"ahora bien","en":"now then / however"},
  {"id":"c1-012","level":"C1","category":"Marcadores","es":"dicho esto","en":"that being said"},
  {"id":"c1-013","level":"C1","category":"Marcadores","es":"en definitiva","en":"in short / ultimately"},
  {"id":"c1-014","level":"C1","category":"Marcadores","es":"huelga decir que","en":"needless to say"},
  {"id":"c1-015","level":"C1","category":"Falsos amigos","es":"actualmente","en":"currently (NOT 'actually')"},
  {"id":"c1-016","level":"C1","category":"Falsos amigos","es":"embarazada","en":"pregnant (NOT 'embarrassed')"},
  {"id":"c1-017","level":"C1","category":"Falsos amigos","es":"realizar","en":"to carry out / achieve (NOT just 'realize')"},
  {"id":"c1-018","level":"C1","category":"Falsos amigos","es":"sensible","en":"sensitive (NOT 'sensible' as in reasonable)"}
]
```

This is a starting seed (165 items total), not exhaustive — treat it as the first merge pass, and keep extending each level over time, especially B2/C1 where nuance matters more than raw word count.

## 4. Unifying Flashcard + Fill in the Blanks

Right now these look like two separate screens (per the screenshot). Rebuild them on one shared hook so behavior, progress, and level/category filtering stay in sync:

```ts
// useVocabDeck.ts
function useVocabDeck(items: VocabItem[]) {
  const [deck, setDeck] = useState(items);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'revealed' | 'correct' | 'incorrect'>('idle');

  const current = deck[index];

  function advance() {
    setStatus('idle');
    setIndex((i) => (i + 1) % deck.length);
  }

  function reveal(userAnswer?: string) {
    if (userAnswer !== undefined) {
      const isCorrect = userAnswer.trim().toLowerCase() === current.es.toLowerCase();
      setStatus(isCorrect ? 'correct' : 'incorrect');
    } else {
      setStatus('revealed');
    }
  }

  function shuffle() {
    setDeck((d) => [...d].sort(() => Math.random() - 0.5));
    setIndex(0);
    setStatus('idle');
  }

  return { current, index, deck, status, advance, reveal, shuffle, setDeck };
}
```

- **Flashcard mode**: tap card → `reveal()` with no argument → shows back face → tap again or wait → `advance()`.
- **Fill in the Blanks mode**: same `current` item, blank is `current.es` (or a word inside `current.example`), user types → `reveal(userAnswer)` → show correct/incorrect state with the same animated back face → auto-`advance()` after ~900ms, matching the flashcard's rhythm instead of requiring a separate "next" click.

This means: one deck, one progress bar, one animation system, two thin presentational wrappers (`FlashcardFace`, `FillBlankFace`) that both consume `useVocabDeck`.

## 5. Animated back face (Framer Motion + 21st.dev)

Don't build the flip from scratch — pull a flip-card or 3D-card primitive from the [21st.dev](https://21st.dev) component registry (search "flip card" / "3d card") as the base, then wire in the vocab data and the `status` states above (idle / revealed / correct / incorrect) as visual variants.

Framer Motion specifics:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

function VocabCard({ item, flipped, onFlip }: { item: VocabItem; flipped: boolean; onFlip: () => void }) {
  return (
    <div style={{ perspective: 1000 }} onClick={onFlip}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-2xl font-medium">{item.es}</span>
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            transform: 'rotateY(180deg)',
          }}
        >
          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-xl font-medium">{item.en}</p>
                {item.example && (
                  <p className="text-sm text-muted-foreground mt-2">{item.example}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
```

Design notes:
- Keep `stiffness: 260, damping: 20` as a starting spring — it lands with a slight settle rather than a hard stop.
- Stagger the back-face content in (translation first, then example sentence ~150ms later) rather than revealing everything at once.
- Reserve a color accent per CEFR level (e.g. one hue per level, muted, not a full rainbow) so the learner has an ambient sense of "this word is B1" without reading a badge.
- For the `correct`/`incorrect` states in Fill in the Blanks, animate a subtle border-color and a small checkmark/x icon rather than a jarring color flash — respect `prefers-reduced-motion` and fall back to an instant, non-animated state change.
- Keep motion under ~300ms per step; the point is responsiveness, not spectacle.

## 6. Open items for Antigravity to resolve against the real codebase

- [ ] Confirm the existing vocab folder's actual schema and adjust section 2 mapping if needed
- [ ] Merge datasets from section 3, dedupe against existing entries
- [ ] Implement `useVocabDeck` and refactor both screens to consume it
- [ ] Wire the Fill in the Blanks auto-advance timing to feel consistent with the flashcard tap-to-advance rhythm
- [ ] Source and adapt a 21st.dev flip/3D card primitive for the back face
- [ ] Add a per-level accent color token set
- [ ] QA keyboard/focus behavior and reduced-motion fallback
