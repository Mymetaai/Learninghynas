const fs = require('fs');
const path = require('path');

const c1Path = path.join(__dirname, '../src/data/vocab/c1.json');
let c1Data = JSON.parse(fs.readFileSync(c1Path, 'utf8'));

// Filter out any previous 'sys-c1' entries to re-run cleanly
c1Data = c1Data.filter(i => !i.id.startsWith('sys-c1-'));

// Build existing keys set
const existingKeys = new Set();
c1Data.forEach(item => {
  existingKeys.add(`${item.level}_${item.category}_${item.es.toLowerCase().trim()}`);
});

console.log(`Base C1 total items: ${c1Data.length}`);

let c1Counter = c1Data.length + 1;

// Refined C1 Lessons with non-duplicate replacement items
const lesson31_Modismos = [
  {
    category: 'Modismos',
    es: 'hacer borrón y cuenta nueva',
    en: 'to turn over a new leaf / make a fresh start',
    example: 'Tras la discusión, decidieron hacer borrón y cuenta nueva.',
    exampleTranslation: 'After the argument, they decided to make a fresh start.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Modismos',
    es: 'dar la lata',
    en: 'to pester / to annoy / to be a nuisance',
    example: 'No me des la lata mientras estoy estudiando para el examen.',
    exampleTranslation: 'Don\'t pester me while I am studying for the exam.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Modismos',
    es: 'estar entre la espada y la pared',
    en: 'to be between a rock and a hard place',
    example: 'Se sintió entre la espada y la pared al elegir entre ambas ofertas.',
    exampleTranslation: 'He felt between a rock and a hard place choosing between both offers.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Modismos',
    es: 'quedarse en blanco',
    en: 'to go blank / draw a blank',
    example: 'Al empezar la presentación me quedé en blanco por un momento.',
    exampleTranslation: 'When starting the presentation I went blank for a moment.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Modismos',
    es: 'dorar la píldora',
    en: 'to sugarcoat something',
    example: 'El director no intentó dorar la píldora al dar las noticias.',
    exampleTranslation: 'The director did not try to sugarcoat the news when giving it.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Modismos',
    es: 'estar en el quinto pino',
    en: 'to be in the middle of nowhere / far away',
    example: 'Su casa nueva está en el quinto pino y cuesta llegar.',
    exampleTranslation: 'Her new house is in the middle of nowhere and hard to reach.',
    tags: ['regional:Spain'],
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  }
];

const lesson32_Registro = [
  {
    category: 'Registro',
    es: 'poner de manifiesto',
    en: 'to highlight / to bring to light / to make clear',
    example: 'El informe puso de manifiesto la necesidad de reformas estructurales.',
    exampleTranslation: 'The report highlighted the need for structural reforms.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Registro',
    es: 'hacer hincapié',
    en: 'to emphasize / to stress',
    example: 'La ponente hizo hincapié en la importancia de la sostenibilidad.',
    exampleTranslation: 'The speaker stressed the importance of sustainability.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Registro',
    es: 'llevar a cabo',
    en: 'to carry out / to execute',
    example: 'El equipo llevó a cabo una investigación rigurosa.',
    exampleTranslation: 'The team carried out a rigorous investigation.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Registro',
    es: 'a tenor de lo dispuesto',
    en: 'in accordance with / pursuant to',
    example: 'A tenor de lo dispuesto en el artículo tres, se suspende la sesión.',
    exampleTranslation: 'Pursuant to article three, the session is suspended.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Registro',
    es: 'suscitar debate',
    en: 'to spark / provoke debate',
    example: 'La nueva ley ha suscitado un intenso debate público.',
    exampleTranslation: 'The new law has sparked intense public debate.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Registro',
    es: 'surtir efecto',
    en: 'to take effect / be effective',
    example: 'Las medidas económicas comenzaron a surtir efecto positivo.',
    exampleTranslation: 'The economic measures began to take positive effect.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  }
];

const lesson33_Marcadores = [
  {
    category: 'Marcadores',
    es: 'no obstante',
    en: 'nevertheless / nonetheless',
    example: 'Había pocas probabilidades; no obstante, el equipo logró vencer.',
    exampleTranslation: 'Odds were low; nevertheless, the team managed to win.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Marcadores',
    es: 'por consiguiente',
    en: 'consequently / therefore',
    example: 'Aumentaron los costos; por consiguiente, debió ajustarse el presupuesto.',
    exampleTranslation: 'Costs increased; consequently, the budget had to be adjusted.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Marcadores',
    es: 'de ahí que + subjuntivo',
    en: 'hence why / that is why (+ subjunctive)',
    example: 'Llovió torrencialmente; de ahí que se cancelara el concierto.',
    exampleTranslation: 'It rained heavily; hence why the concert was cancelled.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Marcadores',
    es: 'en resumidas cuentas',
    en: 'in short / in a nutshell',
    example: 'En resumidas cuentas, la estrategia fue un éxito total.',
    exampleTranslation: 'In a nutshell, the strategy was a total success.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Marcadores',
    es: 'a saber',
    en: 'namely / to wit',
    example: 'Se trataron tres temas principales, a saber: economía, educación y salud.',
    exampleTranslation: 'Three main topics were addressed, namely: economy, education and health.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Marcadores',
    es: 'en vista de que',
    en: 'in view of the fact that / given that',
    example: 'En vista de que no hay quórum, posponemos la votación.',
    exampleTranslation: 'In view of the fact that there is no quorum, we postpone the vote.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  }
];

const lesson34_VocabularioAcademico = [
  {
    category: 'Vocabulario Académico',
    es: 'corroborar',
    en: 'to corroborate / to confirm',
    example: 'Los resultados experimentales sirvieron para corroborar la hipótesis inicial.',
    exampleTranslation: 'Experimental results served to corroborate the initial hypothesis.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Vocabulario Académico',
    es: 'refutar',
    en: 'to refute / to disprove',
    example: 'El investigador presentó pruebas sólidas para refutar la teoría.',
    exampleTranslation: 'The researcher presented solid evidence to refute the theory.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Vocabulario Académico',
    es: 'la hipótesis',
    en: 'the hypothesis',
    example: 'Formularon una hipótesis basada en datos estadísticos.',
    exampleTranslation: 'They formulated a hypothesis based on statistical data.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Vocabulario Académico',
    es: 'el paradigma',
    en: 'the paradigm',
    example: 'Este descubrimiento representa un cambio de paradigma en la física.',
    exampleTranslation: 'This discovery represents a paradigm shift in physics.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Vocabulario Académico',
    es: 'la discrepancia',
    en: 'the discrepancy / disagreement',
    example: 'Existe una gran discrepancia entre ambos informes financieros.',
    exampleTranslation: 'There is a major discrepancy between both financial reports.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Vocabulario Académico',
    es: 'extrapolar',
    en: 'to extrapolate',
    example: 'No es riguroso extrapolar estos resultados a toda la población.',
    exampleTranslation: 'It is not rigorous to extrapolate these results to the entire population.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  }
];

const lesson35_VariacionRegional = [
  {
    category: 'Variación Regional',
    es: 'el ordenador',
    en: 'the computer (Spain)',
    example: 'Compré un ordenador portátil para trabajar desde casa.',
    exampleTranslation: 'I bought a laptop computer to work from home.',
    tags: ['regional:Spain'],
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Variación Regional',
    es: 'la computadora',
    en: 'the computer (Latin America)',
    example: 'Mi computadora se actualizó anoche.',
    exampleTranslation: 'My computer updated last night.',
    tags: ['regional:LatAm'],
    sources: ['RAE DLE (dle.rae.es)', 'Asociación de Academias de la Lengua Española (asale.org)']
  },
  {
    category: 'Variación Regional',
    es: 'el coche',
    en: 'the car (Spain)',
    example: 'Aparqué el coche en el garaje.',
    exampleTranslation: 'I parked the car in the garage.',
    tags: ['regional:Spain'],
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Variación Regional',
    es: 'el carro',
    en: 'the car (Latin America)',
    example: 'Manejé el carro por la autopista.',
    exampleTranslation: 'I drove the car on the highway.',
    tags: ['regional:LatAm'],
    sources: ['RAE DLE (dle.rae.es)', 'ASALE (asale.org)']
  },
  {
    category: 'Variación Regional',
    es: 'coger',
    en: 'to grab / take / catch (Spain)',
    example: 'Voy a coger el autobús de las ocho.',
    exampleTranslation: 'I am going to catch the eight o\'clock bus.',
    tags: ['regional:Spain'],
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Variación Regional',
    es: 'tomar',
    en: 'to take / drink / catch (Latin America)',
    example: 'Vamos a tomar el metro en la estación central.',
    exampleTranslation: 'We are going to take the subway at the central station.',
    tags: ['regional:LatAm'],
    sources: ['RAE DLE (dle.rae.es)', 'ASALE (asale.org)']
  }
];

const lesson36_SubjuntivoAvanzado = [
  {
    category: 'Subjuntivo Avanzado',
    es: 'por mucho que + subjuntivo',
    en: 'no matter how much / however much (+ subjunctive)',
    example: 'Por mucho que intente convencerme, no cambiaré de opinión.',
    exampleTranslation: 'No matter how much he tries to convince me, I won\'t change my mind.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Subjuntivo Avanzado',
    es: 'a condición de que',
    en: 'on condition that / provided that',
    example: 'Te prestaré el libro a condición de que me lo devuelvas mañana.',
    exampleTranslation: 'I will lend you the book on condition that you return it to me tomorrow.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Subjuntivo Avanzado',
    es: 'salvo que',
    en: 'unless / except if',
    example: 'Iremos al parque salvo que empiece a llover.',
    exampleTranslation: 'We will go to the park unless it starts raining.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Subjuntivo Avanzado',
    es: 'como si + imperfecto de subjuntivo',
    en: 'as if / as though (+ imperfect subjunctive)',
    example: 'Hablaba sobre el tema como si fuera un experto mundial.',
    exampleTranslation: 'He was talking about the topic as if he were a world expert.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Subjuntivo Avanzado',
    es: 'en el supuesto de que',
    en: 'in the event that / assuming that',
    example: 'En el supuesto de que aprueben el crédito, iniciaremos la obra.',
    exampleTranslation: 'Assuming that they approve the credit, we will start the construction.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Subjuntivo Avanzado',
    es: 'quiera que no',
    en: 'whether one likes it or not',
    example: 'Quiera que no, tendrá que asumir la responsabilidad.',
    exampleTranslation: 'Whether he likes it or not, he will have to assume responsibility.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  }
];

const lesson37_FalsosAmigos = [
  {
    category: 'Falsos amigos',
    es: 'pretender',
    en: 'to intend / to claim / to aspire to (NOT to pretend)',
    example: 'No pretendo ofender a nadie con mis palabras.',
    exampleTranslation: 'I do not intend to offend anyone with my words.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Falsos amigos',
    es: 'constipado',
    en: 'having a cold / stuffed up (NOT constipated)',
    example: 'Tengo dolor de garganta porque estoy constipado.',
    exampleTranslation: 'I have a sore throat because I have a cold.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Falsos amigos',
    es: 'desgracia',
    en: 'misfortune / tragedy (NOT disgrace)',
    example: 'El accidente fue una gran desgracia para la familia.',
    exampleTranslation: 'The accident was a major misfortune for the family.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Falsos amigos',
    es: 'remover',
    en: 'to stir / to mix / to agitate (NOT to remove)',
    example: 'Debes remover la salsa constantemente mientras se cocina.',
    exampleTranslation: 'You must stir the sauce constantly while it cooks.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  },
  {
    category: 'Falsos amigos',
    es: 'compromiso',
    en: 'commitment / obligation / engagement (NOT compromise)',
    example: 'Asumió el compromiso de entregar el informe el viernes.',
    exampleTranslation: 'She assumed the commitment to deliver the report on Friday.',
    sources: ['RAE DLE (dle.rae.es)', 'Instituto Cervantes (cvc.cervantes.es)']
  },
  {
    category: 'Falsos amigos',
    es: 'carpetas',
    en: 'binders / file folders (NOT carpets)',
    example: 'Guardo los documentos importantes en tres carpetas rojas.',
    exampleTranslation: 'I keep important documents in three red file folders.',
    sources: ['RAE DLE (dle.rae.es)', 'FundéuRAE (fundeu.es)']
  }
];

// Master Sourced Lessons Map
const allLessonBatches = [
  { lessonNum: 31, name: 'Lesson 31: Advanced Idiomatic Expressions', items: lesson31_Modismos },
  { lessonNum: 32, name: 'Lesson 32: Formal & Diplomatic Register', items: lesson32_Registro },
  { lessonNum: 33, name: 'Lesson 33: Nuanced Discourse Markers', items: lesson33_Marcadores },
  { lessonNum: 34, name: 'Lesson 34: Academic Argumentation', items: lesson34_VocabularioAcademico },
  { lessonNum: 35, name: 'Lesson 35: Regional Lexical Variations', items: lesson35_VariacionRegional },
  { lessonNum: 36, name: 'Lesson 36: Complex Subjunctive Clauses', items: lesson36_SubjuntivoAvanzado },
  { lessonNum: 37, name: 'Lesson 37: Advanced Deceptive Cognates', items: lesson37_FalsosAmigos }
];

const newlyAdded = [];
const skipped = [];
const provenanceLog = [];

allLessonBatches.forEach(batch => {
  batch.items.forEach(item => {
    const key = `C1_${item.category}_${item.es.toLowerCase().trim()}`;
    if (existingKeys.has(key)) {
      skipped.push({ lesson: batch.name, es: item.es, category: item.category, reason: 'Already exists in c1.json' });
    } else {
      existingKeys.add(key);
      const newItem = {
        id: `sys-c1-${String(c1Counter++).padStart(3, '0')}`,
        level: 'C1',
        category: item.category,
        es: item.es,
        en: item.en,
        example: item.example,
        exampleTranslation: item.exampleTranslation,
        ...(item.tags ? { tags: item.tags } : {})
      };
      c1Data.push(newItem);
      newlyAdded.push({ lesson: batch.name, item: newItem });
      provenanceLog.push({
        id: newItem.id,
        es: newItem.es,
        en: newItem.en,
        category: newItem.category,
        tags: newItem.tags || [],
        sources: item.sources
      });
    }
  });
});

// Save updated c1.json
fs.writeFileSync(c1Path, JSON.stringify(c1Data, null, 2), 'utf8');

console.log('=== SOURCING AND MERGE SUMMARY ===');
console.log(`Newly Added C1 Items: ${newlyAdded.length}`);
console.log(`Skipped Duplicates: ${skipped.length}`);
console.log(`New C1 Total Count: ${c1Data.length}`);

// Write Provenance Log to a scratch JSON for reporting
fs.writeFileSync(
  path.join(__dirname, 'c1_provenance_log.json'),
  JSON.stringify({ newlyAdded, skipped, provenanceLog }, null, 2),
  'utf8'
);
