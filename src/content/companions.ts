// Authored Spanish companions for the AI Companion tab.
// Each has unique background, avatar, bio, and branching conversation tree.
// Flows are structured to scale from Starter (simple greetings) to Pro (ecological and technical discussions).

export interface QuickReply {
  text: string;
  translation: string;
  nextNodeId: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  translation: string;
  quickReplies: QuickReply[];
  /** Sign-off phrase used at the end of the letter, e.g. "Con cariño, Elena" */
  signOff: string;
  /** Fallback message returned if the user types custom free-text at this node */
  fallbackReply: {
    text: string;
    translation: string;
    nextNodeId: string;
  };
}

export interface Companion {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  speed: 'Fácil' | 'Intermedio' | 'Avanzado';
  greetingNodeId: string;
  dialogueNodes: Record<string, DialogueNode>;
}

export const COMPANIONS: Record<string, Companion> = {
  elena: {
    id: 'elena',
    name: 'Elena',
    role: 'La Botánica',
    avatar: '🌿',
    bio: 'Researches rare plants in the Andes. Warm, observant, and scales from beginner chats to ecological preservation.',
    speed: 'Fácil',
    greetingNodeId: 'start',
    dialogueNodes: {
      // ── LEVEL 1: STARTER (Greetings, basic descriptions, direct questions) ──
      start: {
        id: 'start',
        text: '¡Hola, TheLearningHyena! Qué alegría recibir tu carta. Estoy en las montañas de los Andes buscando una flor roja muy rara. El aire aquí es muy frío, pero la vista es hermosa. ¿Te gusta explorar la naturaleza?',
        translation: 'Hello, TheLearningHyena! What a joy to receive your letter. I am in the Andes mountains looking for a very rare red flower. The air here is very cold, but the view is beautiful. Do you like exploring nature?',
        signOff: 'Un abrazo cálido, Elena',
        quickReplies: [
          { text: 'Sí, me encanta caminar en el bosque.', translation: 'Yes, I love walking in the forest.', nextNodeId: 'nature_love' },
          { text: 'Prefiero quedarme en la ciudad.', translation: 'I prefer to stay in the city.', nextNodeId: 'city_love' },
          { text: '¿Qué tipo de plantas estudias?', translation: 'What kind of plants do you study?', nextNodeId: 'study_plants' },
        ],
        fallbackReply: {
          text: '¡Qué carta tan interesante! Las montañas me inspiran a pensar en la vida salvaje. ¿Prefieres las montañas o las playas cálidas?',
          translation: 'What an interesting letter! The mountains inspire me to think of wildlife. Do you prefer mountains or warm beaches?',
          nextNodeId: 'beach_or_mountain',
        },
      },
      // ── LEVEL 2: INTERMEDIATE (Complex nouns, simple past tenses, longer sentences) ──
      nature_love: {
        id: 'nature_love',
        text: '¡Qué bien! El bosque tiene secretos maravillosos. Ayer vi un colibrí verde brillante cerca de un arroyo silvestre. ¿Cuál es tu animal favorito del bosque?',
        translation: 'Great! The forest has wonderful secrets. Yesterday I saw a bright green hummingbird near a wild stream. What is your favorite forest animal?',
        signOff: 'Tu amiga de los valles, Elena',
        quickReplies: [
          { text: 'Me gustan mucho los pájaros cantarines.', translation: 'I like singing birds very much.', nextNodeId: 'birds' },
          { text: 'Los zorros son mis favoritos.', translation: 'Foxes are my favorites.', nextNodeId: 'foxes' },
          { text: 'Me dan miedo los osos grandes.', translation: 'I am afraid of big bears.', nextNodeId: 'bears' },
        ],
        fallbackReply: {
          text: 'Los animales del bosque son muy tímidos. A veces solo los escucho por la noche. ¿Te gustaría acampar en el bosque algún día?',
          translation: 'The forest animals are very shy. Sometimes I only hear them at night. Would you like to camp in the forest someday?',
          nextNodeId: 'camping',
        },
      },
      city_love: {
        id: 'city_love',
        text: 'Las ciudades tienen museos y parques hermosos, pero la montaña tiene una gran paz. Aquí el aire es puro y las flores crecen lentas. ¿Tienes plantas o flores en tu casa?',
        translation: 'Cities have beautiful museums and parks, but the mountain has a great peace. Here the air is pure and flowers grow slow. Do you have plants or flowers at home?',
        signOff: 'Con afecto botánico, Elena',
        quickReplies: [
          { text: 'Sí, tengo muchas flores de colores.', translation: 'Yes, I have many colorful flowers.', nextNodeId: 'has_plants' },
          { text: 'No tengo plantas, se mueren rápido.', translation: 'I don\'t have plants, they die quickly.', nextNodeId: 'dead_plants' },
        ],
        fallbackReply: {
          text: 'Incluso una pequeña ventana con sol puede ser un hogar para una flor. ¿Cuál es tu flor de color favorita?',
          translation: 'Even a small sunny window can be a home for a flower. What is your favorite colored flower?',
          nextNodeId: 'favorite_flower',
        },
      },
      study_plants: {
        id: 'study_plants',
        text: 'Estudio plantas medicinales. Muchas flores silvestres curan dolores de cabeza y ayudan a dormir mejor. ¿Te gustan las infusiones de hierbas y los tés?',
        translation: 'I study medicinal plants. Many wild flowers cure headaches and help you sleep better. Do you like herbal infusions and teas?',
        signOff: 'Deseándote salud, Elena',
        quickReplies: [
          { text: 'Sí, bebo té de manzanilla por la noche.', translation: 'Yes, I drink chamomile tea at night.', nextNodeId: 'tea_lover' },
          { text: 'No, prefiero tomar café fuerte.', translation: 'No, I prefer to drink strong coffee.', nextNodeId: 'coffee_lover' },
        ],
        fallbackReply: {
          text: 'La medicina de la tierra es antigua y sabia. Hay que respetarla. ¿Alguna vez has hecho té con hojas frescas?',
          translation: 'The medicine of the earth is ancient and wise. One must respect it. Have you ever made tea with fresh leaves?',
          nextNodeId: 'fresh_tea',
        },
      },
      birds: {
        id: 'birds',
        text: '¡Los pájaros son hermosos! Su canto me despierta cada mañana. Aquí hay cóndores gigantescos que vuelan muy alto. ¿Te preocupa la desaparición de las aves silvestres por el cambio climático?',
        translation: 'Birds are beautiful! Their song wakes me up every morning. Here there are giant condors that fly very high. Does the disappearance of wild birds due to climate change worry you?',
        signOff: 'Tu observadora de aves, Elena',
        quickReplies: [
          { text: 'Sí, debemos proteger sus ecosistemas.', translation: 'Yes, we must protect their ecosystems.', nextNodeId: 'eco_preservation' },
          { text: 'Me interesa saber cómo las clasifican.', translation: 'I am interested in knowing how they classify them.', nextNodeId: 'scientific_naming' },
        ],
        fallbackReply: {
          text: 'Las aves nos indican el estado de salud de nuestro entorno. Debemos escucharlas.',
          translation: 'Birds indicate the state of health of our environment. We must listen to them.',
          nextNodeId: 'start',
        },
      },
      foxes: {
        id: 'foxes',
        text: 'Los zorros son astutos y muy juguetones. A veces los veo correr entre las rocas rojas. Son depredadores vitales en este entorno. ¿Sabías que controlan la sobrepoblación de roedores?',
        translation: 'Foxes are clever and very playful. Sometimes I see them running among the red rocks. They are vital predators in this environment. Did you know they control the overpopulation of rodents?',
        signOff: 'Elena, desde los riscos altos',
        quickReplies: [
          { text: 'Es fascinante el equilibrio del ecosistema.', translation: 'The balance of the ecosystem is fascinating.', nextNodeId: 'predators_ecosystem' },
          { text: 'Prefiero animales herbívoros.', translation: 'I prefer herbivorous animals.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Cada criatura, por pequeña que sea, cumple una función esencial en la naturaleza.',
          translation: 'Every creature, no matter how small, fulfills an essential function in nature.',
          nextNodeId: 'start',
        },
      },
      has_plants: {
        id: 'has_plants',
        text: '¡Qué alegría! Las plantas purifican el aire. Es asombroso cómo convierten la luz solar en energía mediante la fotosíntesis. ¿Te gustaría saber más sobre la biología de tus plantas domésticas?',
        translation: 'What a joy! Plants purify the air. It is amazing how they convert sunlight into energy through photosynthesis. Would you like to know more about the biology of your domestic plants?',
        signOff: 'Con fascinación científica, Elena',
        quickReplies: [
          { text: 'Sí, explícame la fotosíntesis en detalle.', translation: 'Yes, explain photosynthesis to me in detail.', nextNodeId: 'photosynthesis' },
          { text: 'Prefiero simplemente cuidarlas con agua.', translation: 'I prefer to simply care for them with water.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La fotosíntesis es el motor de la vida en nuestro planeta. Genera el oxígeno que respiramos.',
          translation: 'Photosynthesis is the engine of life on our planet. It generates the oxygen we breathe.',
          nextNodeId: 'start',
        },
      },
      dead_plants: {
        id: 'dead_plants',
        text: '¡Oh, no te preocupes! El cactus es una planta xerófila excelente para empezar. Conserva el agua en sus tallos carnosos para sobrevivir a sequías prolongadas. ¿Quieres aprender sobre plantas en zonas áridas?',
        translation: 'Oh, don\'t worry! The cactus is an excellent xerophytic plant to start with. It conserves water in its fleshy stems to survive prolonged droughts. Do you want to learn about plants in arid zones?',
        signOff: 'Tu guía de botánica, Elena',
        quickReplies: [
          { text: 'Sí, explícame sobre el xerofitismo.', translation: 'Yes, explain to me about xerophytism.', nextNodeId: 'xeriscaping' },
          { text: 'Es mejor comprar plantas artificiales.', translation: 'It is better to buy artificial plants.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La adaptación al clima seco es uno de los mayores logros evolutivos del reino vegetal.',
          translation: 'Adaptation to dry climate is one of the greatest evolutionary achievements of the plant kingdom.',
          nextNodeId: 'start',
        },
      },
      tea_lover: {
        id: 'tea_lover',
        text: 'La manzanilla calma el sistema nervioso. La herbolaria extrae aceites esenciales que contienen compuestos orgánicos beneficiosos para la salud. ¿Te interesa la química natural de las plantas medicinales?',
        translation: 'Chamomile calms the nervous system. Herbal medicine extracts essential oils containing organic compounds beneficial to health. Are you interested in the natural chemistry of medicinal plants?',
        signOff: 'Deseándote sabiduría y salud, Elena',
        quickReplies: [
          { text: 'Sí, me interesa la extracción botánica.', translation: 'Yes, I am interested in botanical extraction.', nextNodeId: 'alchemy_nature' },
          { text: 'Prefiero solo disfrutar de su sabor.', translation: 'I prefer to just enjoy its taste.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La fitoterapia es una ciencia milenaria que combina la observación tradicional con la química moderna.',
          translation: 'Phytotherapy is a millennial science that combines traditional observation with modern chemistry.',
          nextNodeId: 'start',
        },
      },
      coffee_lover: {
        id: 'coffee_lover',
        text: '¡El café montañés es excelente! Sin embargo, el cultivo intensivo de café a veces destruye bosques nativos. ¿Crees que las certificaciones de comercio justo y cultivo sostenible marcan la diferencia en el consumo?',
        translation: 'Mountain coffee is excellent! However, intensive coffee cultivation sometimes destroys native forests. Do you think fair trade and sustainable farming certifications make a difference in consumption?',
        signOff: 'Elena, a favor de los bosques',
        quickReplies: [
          { text: 'Sí, el consumo ético es fundamental.', translation: 'Yes, ethical consumption is fundamental.', nextNodeId: 'fair_trade' },
          { text: 'Prefiero no pensar en la economía.', translation: 'I prefer not to think about the economy.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Nuestras decisiones de compra diarias tienen un impacto directo en la biodiversidad global.',
          translation: 'Our daily purchasing decisions have a direct impact on global biodiversity.',
          nextNodeId: 'start',
        },
      },

      // ── LEVEL 3: PRO (Sophisticated terminology, complex grammar, ecology, science, philosophy) ──
      eco_preservation: {
        id: 'eco_preservation',
        text: 'Coincido plenamente. La preservación de ecosistemas andinos es crítica para la supervivencia de especies paraguas como el cóndor. La fragmentación de hábitats debido a la minería y ganadería extensiva altera los ciclos tróficos. Debemos promover reservas naturales integrales. ¿Qué medidas de conservación ecológica consideras prioritarias?',
        translation: 'I fully agree. The preservation of Andean ecosystems is critical for the survival of umbrella species like the condor. Habitat fragmentation due to mining and extensive ranching alters trophic cycles. We must promote comprehensive nature reserves. What ecological conservation measures do you consider priority?',
        signOff: 'Comprometida con la biodiversidad, Elena',
        quickReplies: [
          { text: 'Debemos reforestar con especies nativas.', translation: 'We must reforest with native species.', nextNodeId: 'start' },
          { text: 'Es crucial legislar contra la minería.', translation: 'It is crucial to legislate against mining.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La restauración ecológica requiere la participación activa de las comunidades locales y marcos jurídicos rigurosos.',
          translation: 'Ecological restoration requires the active participation of local communities and rigorous legal frameworks.',
          nextNodeId: 'start',
        },
      },
      scientific_naming: {
        id: 'scientific_naming',
        text: 'La taxonomía botánica se rige por la nomenclatura binomial establecida por Linneo. Clasificar plantas según sus caracteres morfológicos y análisis moleculares de ADN nos permite entender sus relaciones evolutivas y filogenéticas. Es un campo en constante revisión científica. ¿Te agrada la catalogación taxonómica?',
        translation: 'Botanical taxonomy is governed by the binomial nomenclature established by Linnaeus. Classifying plants according to their morphological features and molecular DNA analysis allows us to understand their evolutionary and phylogenetic relationships. It is a field under constant scientific revision. Do you like taxonomic cataloging?',
        signOff: 'Desde el laboratorio de campo, Elena',
        quickReplies: [
          { text: 'Sí, la filogenia molecular es fascinante.', translation: 'Yes, molecular phylogeny is fascinating.', nextNodeId: 'start' },
          { text: 'Es un vocabulario muy complejo.', translation: 'It is a very complex vocabulary.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Aunque los nombres científicos parezcan áridos, aportan una precisión universal indispensable para la investigación.',
          translation: 'Although scientific names may seem dry, they provide a universal precision indispensable for research.',
          nextNodeId: 'start',
        },
      },
      predators_ecosystem: {
        id: 'predators_ecosystem',
        text: 'Efectivamente. Los depredadores alfa mantienen la integridad estructural de las comunidades biológicas al mitigar el sobrepastoreo mediante cascadas tróficas. Sin zorros ni pumas, los herbívoros diezmarían la vegetación endémica, provocando erosión del suelo y pérdida de biodiversidad vegetal. Es un equilibrio ecosistémico frágil.',
        translation: 'Indeed. Alpha predators maintain the structural integrity of biological communities by mitigating overgrazing through trophic cascades. Without foxes or pumas, herbivores would decimate endemic vegetation, causing soil erosion and loss of plant biodiversity. It is a fragile ecosystem balance.',
        signOff: 'Estudiando las redes tróficas, Elena',
        quickReplies: [
          { text: 'La ecología de poblaciones es clave.', translation: 'Population ecology is key.', nextNodeId: 'start' },
          { text: 'Es asombroso cómo se conecta todo.', translation: 'It is amazing how everything connects.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La naturaleza funciona como una red interconectada; cuando se altera un nodo, todo el sistema sufre repercusiones.',
          translation: 'Nature functions as an interconnected web; when one node is altered, the entire system suffers repercussions.',
          nextNodeId: 'start',
        },
      },
      photosynthesis: {
        id: 'photosynthesis',
        text: 'La fotosíntesis consta de una fase luminosa en los tilacoides de los cloroplastos, donde se hidroliza el agua y se genera ATP y NADPH, y una fase oscura o ciclo de Calvin, donde la enzima RuBisCO cataliza la fijación del dióxido de carbono para sintetizar hexosas. Este proceso físico-químico sustenta casi toda la biosfera terrestre.',
        translation: 'Photosynthesis consists of a light phase in the thylagoids of chloroplasts, where water is hydrolyzed and ATP and NADPH are generated, and a dark phase or Calvin cycle, where the enzyme RuBisCO catalyzes carbon dioxide fixation to synthesize hexoses. This physical-chemical process sustains almost all terrestrial biosphere.',
        signOff: 'Maravillada por la bioenergética, Elena',
        quickReplies: [
          { text: 'La RuBisCO es una enzima fundamental.', translation: 'RuBisCO is a fundamental enzyme.', nextNodeId: 'start' },
          { text: 'La síntesis de glucosa es muy elegante.', translation: 'Glucose synthesis is very elegant.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Transformar energía electromagnética solar en enlaces químicos de materia orgánica es el mayor milagro biofísico de la Tierra.',
          translation: 'Transforming solar electromagnetic energy into chemical bonds of organic matter is Earth\'s greatest biophysical miracle.',
          nextNodeId: 'start',
        },
      },
      xeriscaping: {
        id: 'xeriscaping',
        text: 'Las plantas xerófitas presentan adaptaciones anatómicas y metabólicas extremas, como la fotosíntesis CAM (Metabolismo Ácido de las Crasuláceas), que les permite abrir los estomas solo de noche para evitar la evapotranspiración. Además, sustituyen hojas por espinas para reducir la superficie foliar expuesta a la radiación solar. Es una evolución morfológica óptima.',
        translation: 'Xerophytic plants exhibit extreme anatomical and metabolic adaptations, such as CAM photosynthesis (Crassulacean Acid Metabolism), which allows them to open stomata only at night to prevent evapotranspiration. In addition, they replace leaves with spines to reduce the foliar surface exposed to solar radiation. It is an optimal morphological evolution.',
        signOff: 'Estudiando adaptaciones climáticas, Elena',
        quickReplies: [
          { text: 'El metabolismo CAM es muy ingenioso.', translation: 'CAM metabolism is very ingenious.', nextNodeId: 'start' },
          { text: 'Es admirable su resistencia térmica.', translation: 'Their thermal resistance is admirable.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Estas adaptaciones nos demuestran cómo la presión de selección natural moldea la vida ante entornos climáticos hostiles.',
          translation: 'These adaptations show us how natural selection pressure shapes life in hostile climatic environments.',
          nextNodeId: 'start',
        },
      },
      alchemy_nature: {
        id: 'alchemy_nature',
        text: 'La química de los metabolitos secundarios, como terpenos, flavonoides y alcaloides, constituye el sistema defensivo y de comunicación de los vegetales. Extraer estos principios activos mediante destilación por arrastre de vapor o extracción con disolventes orgánicos nos permite sintetizar fitofármacos con dianas terapéuticas precisas en medicina.',
        translation: 'The chemistry of secondary metabolites, such as terpenes, flavonoids, and alkaloids, constitutes the defense and communication system of plants. Extracting these active principles through steam distillation or organic solvent extraction allows us to synthesize phytopharmaceuticals with precise therapeutic targets in medicine.',
        signOff: 'Entre probetas y alambiques, Elena',
        quickReplies: [
          { text: 'La síntesis molecular orgánica es clave.', translation: 'Organic molecular synthesis is key.', nextNodeId: 'start' },
          { text: 'La fitofarmacología es indispensable.', translation: 'Phytopharmacology is indispensable.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La sinergia de compuestos orgánicos en una planta a menudo supera la eficacia de moléculas aisladas artificialmente.',
          translation: 'The synergy of organic compounds in a plant often exceeds the efficacy of artificially isolated molecules.',
          nextNodeId: 'start',
        },
      },
      fair_trade: {
        id: 'fair_trade',
        text: 'Absolutamente. La agricultura sostenible y el comercio justo mitigan la degradación de suelos y garantizan salarios dignos para pequeños agricultores. Fomentar el cultivo bajo sombra preserva los corredores de biodiversidad aviaria y mitiga el monocultivo intensivo, que erosiona el suelo y contamina acuíferos por pesticidas. Es un deber ético.',
        translation: 'Absolutely. Sustainable agriculture and fair trade mitigate soil degradation and guarantee decent wages for small farmers. Promoting shade-grown coffee preserves avian biodiversity corridors and mitigates intensive monoculture, which erodes soil and pollutes aquifers with pesticides. It is an ethical duty.',
        signOff: 'Abogando por la agroecología, Elena',
        quickReplies: [
          { text: 'Apoyo la agroforestería sostenible.', translation: 'I support sustainable agroforestry.', nextNodeId: 'start' },
          { text: 'El consumo responsable cambia mercados.', translation: 'Responsible consumption changes markets.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La soberanía alimentaria y la ecología agraria son pilares para un futuro de coexistencia armónica con la naturaleza.',
          translation: 'Food sovereignty and agricultural ecology are pillars for a future of harmonic coexistence with nature.',
          nextNodeId: 'start',
        },
      },
    },
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    role: 'El Cartógrafo',
    avatar: '🧭',
    bio: 'Draws ancient trails and hidden routes. Scales from compass basics to geodetic projections and jungle archaeology.',
    speed: 'Intermedio',
    greetingNodeId: 'start',
    dialogueNodes: {
      // ── LEVEL 1: STARTER ──
      start: {
        id: 'start',
        text: '¡Hola, TheLearningHyena! Estoy trazando un mapa antiguo de un templo escondido en la selva. Los caminos están llenos de fango y árboles gigantes. ¿Tienes tu brújula lista para la aventura?',
        translation: 'Hello, TheLearningHyena! I am drawing an ancient map of a temple hidden in the jungle. The paths are full of mud and giant trees. Do you have your compass ready for the adventure?',
        signOff: 'Buen camino, Mateo',
        quickReplies: [
          { text: 'Sí, mi brújula siempre me guía.', translation: 'Yes, my compass always guides me.', nextNodeId: 'compass_yes' },
          { text: 'No, prefiero usar mapas digitales.', translation: 'No, I prefer to use digital maps.', nextNodeId: 'digital_maps' },
          { text: '¿Qué peligros hay en esa selva?', translation: 'What dangers are in that jungle?', nextNodeId: 'jungle_dangers' },
        ],
        fallbackReply: {
          text: 'Dibujar mapas requiere buen ojo y paciencia. ¿Te gusta dibujar o prefieres leer historias de aventuras?',
          translation: 'Drawing maps requires a good eye and patience. Do you like to draw or do you prefer to read adventure stories?',
          nextNodeId: 'draw_or_read',
        },
      },
      // ── LEVEL 2: INTERMEDIATE ──
      compass_yes: {
        id: 'compass_yes',
        text: '¡Excelente! Una buena brújula magnética nunca se queda sin batería. El magnetismo de la tierra es fascinante. Ayer me perdí cerca de una cascada, pero el norte me salvó. ¿Te gusta caminar cerca del agua?',
        translation: 'Excellent! A good magnetic compass never runs out of battery. Earth\'s magnetism is fascinating. Yesterday I got lost near a waterfall, but the north saved me. Do you like walking near water?',
        signOff: 'Hacia el norte, Mateo',
        quickReplies: [
          { text: 'Me encantan las cascadas y los ríos.', translation: 'I love waterfalls and rivers.', nextNodeId: 'waterfalls' },
          { text: 'Prefiero los senderos secos de montaña.', translation: 'I prefer dry mountain trails.', nextNodeId: 'dry_trails' },
        ],
        fallbackReply: {
          text: 'El sonido del agua es relajante, pero los caminos húmedos son resbaladizos. ¡Hay que tener cuidado!',
          translation: 'The sound of water is relaxing, but wet paths are slippery. One must be careful!',
          nextNodeId: 'start',
        },
      },
      digital_maps: {
        id: 'digital_maps',
        text: 'Ja, ¡los teléfonos son útiles! Pero en la selva profunda no hay señal telefónica ni satélites claros por el follaje espeso. Por eso mis mapas de papel son valiosos. ¿Sabes leer un mapa físico de papel?',
        translation: 'Ha, phones are useful! But in the deep jungle there is no phone signal or clear satellites because of the thick canopy. That is why my paper maps are valuable. Do you know how to read a physical paper map?',
        signOff: 'Tu cartógrafo de confianza, Mateo',
        quickReplies: [
          { text: 'Sí, sé leer curvas de nivel.', translation: 'Yes, I know how to read contour lines.', nextNodeId: 'map_expert' },
          { text: 'No, me parece muy confuso.', translation: 'No, it seems very confusing to me.', nextNodeId: 'map_novice' },
        ],
        fallbackReply: {
          text: 'Puedo enseñarte las líneas de contorno y los símbolos la próxima vez que nos veamos. ¡Es como descifrar un código!',
          translation: 'I can teach you contour lines and symbols next time we meet. It\'s like deciphering a code!',
          nextNodeId: 'start',
        },
      },
      jungle_dangers: {
        id: 'jungle_dangers',
        text: '¡Uf! Serpientes venenosas, jaguares silenciosos y mosquitos gigantes. Pero el mayor peligro es perderse y quedarse sin agua potable. ¿Qué llevas siempre en tu mochila de exploración?',
        translation: 'Whew! Venomous snakes, silent jaguars, and giant mosquitoes. But the biggest danger is getting lost and running out of drinking water. What do you always carry in your exploration backpack?',
        signOff: 'Con cautela en la selva, Mateo',
        quickReplies: [
          { text: 'Llevo mucha agua y herramientas.', translation: 'I carry plenty of water and tools.', nextNodeId: 'gear_backpack' },
          { text: 'Solo comida y mi saco de dormir.', translation: 'Only food and my sleeping bag.', nextNodeId: 'gear_camping' },
        ],
        fallbackReply: {
          text: 'Preparar la mochila es un arte. Cada gramo cuenta cuando escalas colinas empinadas.',
          translation: 'Preparing the backpack is an art. Every gram counts when you climb steep hills.',
          nextNodeId: 'start',
        },
      },
      waterfalls: {
        id: 'waterfalls',
        text: '¡Las cascadas de la selva son espectaculares! El agua cae con tanta fuerza que el aire tiembla. A veces hay cuevas ocultas detrás de la cortina de agua. ¿Te atreverías a explorar una cueva oscura y misteriosa?',
        translation: 'Jungle waterfalls are spectacular! The water falls with so much force that the air shakes. Sometimes there are hidden caves behind the water curtain. Would you dare to explore a dark and mysterious cave?',
        signOff: 'Explorando abismos, Mateo',
        quickReplies: [
          { text: 'Sí, quiero estudiar sus galerías.', translation: 'Yes, I want to study its galleries.', nextNodeId: 'speleology' },
          { text: 'Me interesa buscar restos históricos.', translation: 'I am interested in searching for historical remains.', nextNodeId: 'ancient_glyphs' },
        ],
        fallbackReply: {
          text: 'Las cavernas son mundos subterráneos fascinantes, pero requieren equipo adecuado.',
          translation: 'Caverns are fascinating underground worlds, but they require proper equipment.',
          nextNodeId: 'start',
        },
      },
      dry_trails: {
        id: 'dry_trails',
        text: 'Los senderos secos de altura exigen una buena condición física. A gran altitud, la presión atmosférica disminuye, lo que limita el oxígeno disponible. ¿Alguna vez has sufrido de mal de montaña?',
        translation: 'High dry trails demand good physical condition. At high altitude, atmospheric pressure decreases, limiting available oxygen. Have you ever suffered from altitude sickness?',
        signOff: 'Desde la cordillera, Mateo',
        quickReplies: [
          { text: 'Sí, he sufrido hipoxia leve.', translation: 'Yes, I have suffered mild hypoxia.', nextNodeId: 'altitude_sickness' },
          { text: 'No, me aclimato bastante bien.', translation: 'No, I acclimatize fairly well.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La aclimatación gradual es vital cuando nos adentramos en cordilleras elevadas.',
          translation: 'Gradual acclimatization is vital when we venture into high mountain ranges.',
          nextNodeId: 'start',
        },
      },
      map_expert: {
        id: 'map_expert',
        text: '¡Estupendo! Saber interpretar la altitud mediante curvas de nivel equidistantes es crucial. No obstante, proyectar un elipsoide terrestre bidimensionalmente genera distorsiones inevitables. ¿Qué opinas sobre las diferentes proyecciones cartográficas?',
        translation: 'Great! Knowing how to interpret altitude through equidistant contour lines is crucial. However, projecting a terrestrial ellipsoid two-dimensionally generates inevitable distortions. What do you think about different cartographic projections?',
        signOff: 'Proyectando mundos, Mateo',
        quickReplies: [
          { text: 'Prefiero proyecciones conformes.', translation: 'I prefer conformal projections.', nextNodeId: 'cartographic_projection' },
          { text: 'Prefiero proyecciones equivalentes.', translation: 'I prefer equivalent projections.', nextNodeId: 'cartographic_projection' },
        ],
        fallbackReply: {
          text: 'La elección de la proyección geométrica depende del uso analítico o de navegación que requiera el mapa.',
          translation: 'The choice of geometric projection depends on the analytical or navigational use required by the map.',
          nextNodeId: 'start',
        },
      },
      map_novice: {
        id: 'map_novice',
        text: 'No te preocupes, la cartografía requiere práctica. Para orientarse sin brújula ni tecnología, el método clásico consiste en trazar líneas de visuales a puntos de referencia conocidos. ¿Sabes cómo realizar una triangulación manual?',
        translation: 'Don\'t worry, cartography takes practice. To orient oneself without a compass or technology, the classic method consists in drawing sightlines to known landmarks. Do you know how to perform a manual triangulation?',
        signOff: 'Calculando rumbos, Mateo',
        quickReplies: [
          { text: 'Sí, enséñame la triangulación.', translation: 'Yes, teach me triangulation.', nextNodeId: 'triangulation' },
          { text: 'Prefiero orientarme por el sol.', translation: 'I prefer to orient myself by the sun.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La triangulación geométrica permite determinar tu posición exacta con solo tres puntos visibles.',
          translation: 'Geometric triangulation allows you to determine your exact position with only three visible points.',
          nextNodeId: 'start',
        },
      },
      gear_backpack: {
        id: 'gear_backpack',
        text: 'Herramientas y agua son el pilar de la supervivencia forestal. En entornos tropicales espesos, a veces es necesario improvisar refugios y purificar agua pluvial. ¿Conoces técnicas avanzadas de supervivencia en la selva?',
        translation: 'Tools and water are the pillar of forest survival. In thick tropical environments, it is sometimes necessary to improvise shelters and purify rainwater. Do you know advanced survival techniques in the jungle?',
        signOff: 'Mateo, listo para lo inesperado',
        quickReplies: [
          { text: 'Sí, sé construir refugios.', translation: 'Yes, I know how to build shelters.', nextNodeId: 'jungle_survival' },
          { text: 'Me interesa más la bioacústica.', translation: 'I am more interested in bioacoustics.', nextNodeId: 'nocturnal_jungle' },
        ],
        fallbackReply: {
          text: 'La selva te provee de todo si sabes leer las señales biológicas correctas.',
          translation: 'The jungle provides everything if you know how to read the correct biological signs.',
          nextNodeId: 'start',
        },
      },

      // ── LEVEL 3: PRO ──
      speleology: {
        id: 'speleology',
        text: 'La espeleología es una disciplina científica rigurosa. Estas cavernas calcáreas albergan estructuras kársticas complejas, formadas durante millones de años por la disolución química del carbonato de calcio. Estalactitas y estalagmitas registran paleoclimas históricos de gran valor geológico. ¿Te fascina la hidrogeología subterránea?',
        translation: 'Speleology is a rigorous scientific discipline. These calcareous caverns house complex karst structures, formed over millions of years by the chemical dissolution of calcium carbonate. Stalactites and stalagmites record historical paleoclimates of great geological value. Does underground hydrogeology fascinate you?',
        signOff: 'Desde la penumbra geológica, Mateo',
        quickReplies: [
          { text: 'El karst es un relieve asombroso.', translation: 'Karst is an amazing relief.', nextNodeId: 'start' },
          { text: 'Prefiero cartografiar la superficie.', translation: 'I prefer mapping the surface.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'El estudio del modelado kárstico revela cómo las aguas subterráneas esculpen continentes enteros por debajo de nuestros pies.',
          translation: 'The study of karst modeling reveals how groundwater sculpts entire continents below our feet.',
          nextNodeId: 'start',
        },
      },
      ancient_glyphs: {
        id: 'ancient_glyphs',
        text: 'Es fascinante. Los petroglifos y glifos líticos que hallé documentan rutas comerciales prehispánicas y observaciones astronómicas complejas. La epigrafía arqueológica requiere descifrar signos pictográficos grabados sobre roca volcánica. Representa la cartografía cultural del pasado. ¿Qué método arqueológico aplicarías para datar estas inscripciones?',
        translation: 'It is fascinating. The petroglyphs and lithic glyphs I found document pre-Hispanic trade routes and complex astronomical observations. Archaeological epigraphy requires deciphering pictographic signs carved on volcanic rock. It represents the cultural cartography of the past. What archaeological method would you apply to date these inscriptions?',
        signOff: 'Investigando vestigios, Mateo',
        quickReplies: [
          { text: 'Dataría por estratigrafía asociada.', translation: 'I would date by associated stratigraphy.', nextNodeId: 'start' },
          { text: 'El análisis de líquenes es útil.', translation: 'Lichen analysis is useful.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La datación cronológica relativa y absoluta nos permite reconstruir los flujos migratorios de civilizaciones extintas.',
          translation: 'Relative and absolute chronological dating allows us to reconstruct migratory flows of extinct civilizations.',
          nextNodeId: 'start',
        },
      },
      altitude_sickness: {
        id: 'altitude_sickness',
        text: 'La hipoxia por altitud ocurre debido a la reducción de la presión parcial de oxígeno a partir de los 2500 metros sobre el nivel del mar. Provoca hiperventilación compensatoria y alcalosis respiratoria. El tratamiento definitivo es el descenso inmediato, aunque fármacos como la acetazolamida ayudan a acelerar la aclimatación renal. Es fisiología pura.',
        translation: 'Altitude hypoxia occurs due to the reduction of partial pressure of oxygen starting at 2500 meters above sea level. It triggers compensatory hyperventilation and respiratory alkalosis. Definitive treatment is immediate descent, although drugs like acetazolamide help accelerate renal acclimatization. It is pure physiology.',
        signOff: 'Mateo, escalando con prudencia',
        quickReplies: [
          { text: 'El mal de montaña agudo es peligroso.', translation: 'Acute mountain sickness is dangerous.', nextNodeId: 'start' },
          { text: 'La aclimatación fisiológica es clave.', translation: 'Physiological acclimatization is key.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Afrontar altitudes elevadas sin la debida progresión puede resultar en edema pulmonar o cerebral fatal. Prudencia ante todo.',
          translation: 'Facing high altitudes without proper progression can result in fatal pulmonary or cerebral edema. Prudence above all.',
          nextNodeId: 'start',
        },
      },
      cartographic_projection: {
        id: 'cartographic_projection',
        text: 'Exacto. La proyección de Mercator preserva los ángulos y formas locales (conforme) siendo idónea para la navegación marítima, pero distorsiona severamente las áreas polares. Alternativas como la proyección homolosina de Goode o la de Robinson buscan un compromiso geométrico reduciendo la deformación de masas continentales. Es el dilema del cartógrafo.',
        translation: 'Exactly. The Mercator projection preserves local angles and shapes (conformal) being ideal for marine navigation, but severely distorts polar areas. Alternatives like Goode\'s homolosine or Robinson\'s projection seek a geometric compromise by reducing deformation of continental masses. It\'s the cartographer\'s dilemma.',
        signOff: 'Dibujando geometrías terrestres, Mateo',
        quickReplies: [
          { text: 'La distorsión es inevitable.', translation: 'Distortion is inevitable.', nextNodeId: 'start' },
          { text: 'Prefiero mapas tridimensionales.', translation: 'I prefer three-dimensional maps.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Representar un geoide irregular en un plano tridimensional siempre requerirá aceptar ciertas distorsiones geométricas.',
          translation: 'Representing an irregular geoid on a three-dimensional plane will always require accepting certain geometric distortions.',
          nextNodeId: 'start',
        },
      },
      triangulation: {
        id: 'triangulation',
        text: 'La triangulación geodésica se basa en la trigonometría. Al medir con precisión la longitud de una base de referencia y los ángulos angulares hacia un vértice distante desde ambos extremos, aplicamos el teorema del seno para deducir distancias y coordenadas sin necesidad de mediciones físicas directas. Es la base de la topografía clásica.',
        translation: 'Geodetic triangulation is based on trigonometry. By accurately measuring the length of a baseline and angular angles toward a distant vertex from both ends, we apply the law of sines to deduce distances and coordinates without direct physical measurements. It is the basis of classical surveying.',
        signOff: 'Entre teodolitos virtuales, Mateo',
        quickReplies: [
          { text: 'El teorema del seno es muy útil.', translation: 'The law of sines is very useful.', nextNodeId: 'start' },
          { text: 'La trigonometría fundó la geodesia.', translation: 'Trigonometry founded geodesy.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La geometría elemental nos capacita para cartografiar extensiones continentales colosales con herramientas ópticas simples.',
          translation: 'Elementary geometry empowers us to map colossal continental expanses with simple optical tools.',
          nextNodeId: 'start',
        },
      },
      jungle_survival: {
        id: 'jungle_survival',
        text: 'Construir un refugio sobreelevado evita el contacto con animales rastreros y la humedad del suelo selvático. Además, para la desinfección hídrica recurrimos a la filtración por capas de carbón, arena y grava, seguido de ebullición prolongada para eliminar protozoos y bacterias patógenas. La termorregulación y la hidratación son críticas.',
        translation: 'Building an elevated shelter avoids contact with crawling animals and forest soil moisture. In addition, for water disinfection we resort to filtration through layers of charcoal, sand, and gravel, followed by prolonged boiling to eliminate protozoa and pathogenic bacteria. Thermoregulation and hydration are critical.',
        signOff: 'Superviviente de la selva, Mateo',
        quickReplies: [
          { text: 'El carbón vegetal filtra toxinas.', translation: 'Charcoal filters toxins.', nextNodeId: 'start' },
          { text: 'Evitar patógenos es prioritario.', translation: 'Avoiding pathogens is priority.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La autosuficiencia en ecosistemas hostiles radica en aplicar principios físicos y biológicos prácticos.',
          translation: 'Self-sufficiency in hostile ecosystems lies in applying practical physical and biological principles.',
          nextNodeId: 'start',
        },
      },
      nocturnal_jungle: {
        id: 'nocturnal_jungle',
        text: 'La bioacústica de la selva nocturna es compleja. El dosel forestal actúa como resonador natural. Especies nocturnas adaptan sus frecuencias sonoras para evitar la interferencia acústica. Estudiar estos espectrogramas de audio nos revela la densidad de población de primates y aves rapaces sin invadir sus nichos ecológicos.',
        translation: 'The bioacoustics of the night jungle is complex. The forest canopy acts as a natural resonator. Nocturnal species adapt their sound frequencies to avoid acoustic interference. Studying these audio spectrograms reveals the population density of primates and birds of prey without invading their ecological niches.',
        signOff: 'Escuchando el murmullo de la noche, Mateo',
        quickReplies: [
          { text: 'La bioacústica es no invasiva.', translation: 'Bioacoustics is non-invasive.', nextNodeId: 'start' },
          { text: 'Los espectrogramas revelan patrones.', translation: 'Spectrograms reveal patterns.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'El paisaje sonoro nocturno aporta datos ecológicos cuantitativos invisibles a los métodos de observación visual tradicionales.',
          translation: 'The nocturnal soundscape provides quantitative ecological data invisible to traditional visual observation methods.',
          nextNodeId: 'start',
        },
      },
    },
  },
  diego: {
    id: 'diego',
    name: 'Diego',
    role: 'El Panadero',
    avatar: '🍞',
    bio: 'Bakes sourdough and pastries in Seville. Cozy, food-loving, and scales from breakfast chats to gluten biochemistry.',
    speed: 'Avanzado',
    greetingNodeId: 'start',
    dialogueNodes: {
      // ── LEVEL 1: STARTER ──
      start: {
        id: 'start',
        text: '¡Buenas, TheLearningHyena! Acabo de sacar del horno de piedra unas hogazas de pan de masa madre crujientes y unos cruasanes dorados. Huele de maravilla en todo el barrio. ¿Te apetece desayunar un pan tradicional con aceite de oliva y tomate?',
        translation: 'Hello, TheLearningHyena! I just took some crusty sourdough loaves and golden croissants out of the stone oven. It smells wonderful throughout the neighborhood. Would you like to have a traditional bread with olive oil and tomato for breakfast?',
        signOff: 'Un abrazo con harina, Diego',
        quickReplies: [
          { text: '¡Sí, por favor! Suena delicioso.', translation: 'Yes, please! It sounds delicious.', nextNodeId: 'breakfast_yes' },
          { text: 'Prefiero pan dulce con mantequilla.', translation: 'I prefer sweet bread with butter.', nextNodeId: 'sweet_bread' },
          { text: '¿Cómo preparas la masa madre?', translation: 'How do you prepare the sourdough starter?', nextNodeId: 'sourdough_secrets' },
        ],
        fallbackReply: {
          text: 'Hornear pan requiere harina, agua, sal y mucho tiempo. La paciencia es el ingrediente principal del buen pan. ¿Te gusta cocinar en casa?',
          translation: 'Baking bread requires flour, water, salt, and lots of time. Patience is the main ingredient of good bread. Do you like to cook at home?',
          nextNodeId: 'cooking_love',
        },
      },
      // ── LEVEL 2: INTERMEDIATE ──
      breakfast_yes: {
        id: 'breakfast_yes',
        text: '¡Excelente elección! El pan con aceite de oliva virgen extra y tomate rallado es el desayuno andaluz tradicional. Sencillo, sano y delicioso. ¿Tomas zumo de naranja natural o café caliente?',
        translation: 'Excellent choice! Bread with extra virgin olive oil and grated tomato is the traditional Andalusian breakfast. Simple, healthy, and delicious. Do you drink fresh orange juice or hot coffee?',
        signOff: 'Buen provecho, Diego',
        quickReplies: [
          { text: 'Prefiero un zumo de naranja fresco.', translation: 'I prefer a fresh orange juice.', nextNodeId: 'citrus_agriculture' },
          { text: 'Un café con leche bien caliente.', translation: 'A coffee with milk, very hot.', nextNodeId: 'roasting_profile' },
        ],
        fallbackReply: {
          text: 'Comenzar el día con buena comida nos da la energía necesaria para caminar largas distancias. ¡Disfruta de la mañana!',
          translation: 'Starting the day with good food gives us the energy needed to walk long distances. Enjoy the morning!',
          nextNodeId: 'start',
        },
      },
      sweet_bread: {
        id: 'sweet_bread',
        text: '¡Ah, los golosos! Los cruasanes de mantequilla y las ensaimadas de Mallorca son mi especialidad dulce. Los horneo muy temprano, a las cuatro de la mañana. ¿Te gustan más los rellenos de chocolate o de frutas?',
        translation: 'Ah, the sweet tooths! Butter croissants and Mallorcan ensaimadas are my sweet specialty. I bake them very early, at four in the morning. Do you like chocolate or fruit fillings more?',
        signOff: 'Endulzando tu día, Diego',
        quickReplies: [
          { text: 'El chocolate es mi debilidad.', translation: 'Chocolate is my weakness.', nextNodeId: 'cacao_origin' },
          { text: 'Prefiero el sabor de las frutas silvestres.', translation: 'I prefer the taste of wild fruits.', nextNodeId: 'seasonal_baking' },
        ],
        fallbackReply: {
          text: 'El azúcar nos alegra el alma, pero siempre con moderación. ¿Cuál es tu postre favorito de tu país?',
          translation: 'Sugar cheers up the soul, but always in moderation. What is your favorite dessert from your country?',
          nextNodeId: 'start',
        },
      },
      sourdough_secrets: {
        id: 'sourdough_secrets',
        text: 'La masa madre es una simbiosis de levaduras silvestres y bacterias lácticas que fermentan los azúcares de la harina de forma natural. Mi fermento tiene ya cinco años. ¿Has tenido problemas de dureza al hornear pan?',
        translation: 'Sourdough is a symbiosis of wild yeasts and lactic bacteria that ferment flour sugars naturally. My starter is already five years old. Have you had hardness issues when baking bread?',
        signOff: 'Tu panadero de cabecera, Diego',
        quickReplies: [
          { text: 'Sí, mi pan queda duro como piedra.', translation: 'Yes, my bread turns out hard as a rock.', nextNodeId: 'gluten_development' },
          { text: 'Nunca he horneado, me da respeto.', translation: 'I have never baked, I respect the process.', nextNodeId: 'baking_history' },
        ],
        fallbackReply: {
          text: 'La fermentación lenta es la clave para un pan digerible y con buena corteza. ¡No dejes de experimentar!',
          translation: 'Slow fermentation is the key to digestible bread with a good crust. Don\'t stop experimenting!',
          nextNodeId: 'start',
        },
      },

      // ── LEVEL 3: PRO ──
      citrus_agriculture: {
        id: 'citrus_agriculture',
        text: 'Las naranjas de Sevilla tienen una acidez muy marcada. El cultivo ecológico en las huertas andaluzas previene la salinización del suelo y optimiza el riego por goteo en períodos estivales severos. La pulpa se utiliza para mermeladas de exportación británica y el zumo aporta vitamina C indispensable. ¿Apoyas la producción agrícola local y libre de pesticidas?',
        translation: 'Seville oranges have a very marked acidity. Organic farming in Andalusian orchards prevents soil salinization and optimizes drip irrigation in severe summer periods. The pulp is used for British export marmalades and the juice provides indispensable vitamin C. Do you support pesticide-free local agricultural production?',
        signOff: 'Diego, defensor de la huerta',
        quickReplies: [
          { text: 'Sí, la agroecología es vital hoy.', translation: 'Yes, agroecology is vital today.', nextNodeId: 'start' },
          { text: 'Prefiero consumir fruta de temporada.', translation: 'I prefer to consume seasonal fruit.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La agricultura respetuosa con el ciclo hidrológico garantiza la sostenibilidad de nuestros recursos agrícolas.',
          translation: 'Agriculture respecting the hydrological cycle guarantees the sustainability of our agricultural resources.',
          nextNodeId: 'start',
        },
      },
      roasting_profile: {
        id: 'roasting_profile',
        text: 'La infusión perfecta exige granos con un perfil de tueste medio para preservar los terpenos florales y ácidos frutales. Durante el tueste, la reacción de Maillard carameliza los azúcares naturales del grano, generando compuestos aromáticos complejos. Combinarlo con leche fresca emulsionada a 60 grados resalta su dulzor sin quemar las proteínas. ¿Cómo prefieres la curva de tueste de tu café?',
        translation: 'The perfect brew demands beans with a medium roast profile to preserve floral terpenes and fruit acids. During roasting, the Maillard reaction caramelizes the bean\'s natural sugars, generating complex aromatic compounds. Combining it with fresh milk emulsified at 60 degrees highlights its sweetness without burning proteins. How do you prefer your coffee\'s roast curve?',
        signOff: 'Diego, barista y panadero',
        quickReplies: [
          { text: 'Tueste ligero con alta acidez.', translation: 'Light roast with high acidity.', nextNodeId: 'start' },
          { text: 'Tueste oscuro, achocolatado y con cuerpo.', translation: 'Dark roast, chocolatey and full-bodied.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'El café de especialidad es un arte que abarca desde la recolección manual del cerezo hasta la extracción barométrica.',
          translation: 'Specialty coffee is an art spanning from manual cherry harvesting to barometric extraction.',
          nextNodeId: 'start',
        },
      },
      cacao_origin: {
        id: 'cacao_origin',
        text: 'Excelente gusto. Yo importo habas de cacao de origen Mesoamericano. Las someto a una fermentación anaeróbica controlada y a un tostado suave antes del conchado. El templado del chocolate alinea los cristales de grasa de la manteca de cacao, otorgándole ese brillo característico y un quiebre crujiente. Es química organoléptica pura.',
        translation: 'Excellent taste. I import cacao beans of Mesoamerican origin. I subject them to a controlled anaerobic fermentation and a gentle roasting before conching. Tempering the chocolate aligns the fat crystals of the cacao butter, giving it that characteristic shine and a crisp snap. It is pure organoleptic chemistry.',
        signOff: 'Entre chocolates y harinas, Diego',
        quickReplies: [
          { text: 'El templado preciso es un arte químico.', translation: 'Precise tempering is a chemical art.', nextNodeId: 'start' },
          { text: 'El porcentaje de pureza define el sabor.', translation: 'The purity percentage defines the flavor.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'El cacao fino de aroma posee una complejidad aromática superior a cualquier chocolate comercial refinado.',
          translation: 'Fine aroma cacao possesses an aromatic complexity superior to any commercial refined chocolate.',
          nextNodeId: 'start',
        },
      },
      seasonal_baking: {
        id: 'seasonal_baking',
        text: 'Hornear según el calendario de cosechas locales es mi filosofía. En primavera utilizo fresas silvestres fermentadas; en otoño, higos frescos e infusiones de calabaza asada con especias. Adaptar el nivel de hidratación de las masas según la humedad ambiental estacional evita que el gluten se debilite. ¿Fomentas el consumo culinario de kilómetro cero?',
        translation: 'Baking according to the local harvest calendar is my philosophy. In spring I use fermented wild strawberries; in autumn, fresh figs and roasted pumpkin infusions with spices. Adapting dough hydration levels according to seasonal environmental humidity prevents gluten weakening. Do you promote kilometer-zero culinary consumption?',
        signOff: 'Estacionalmente tuyo, Diego',
        quickReplies: [
          { text: 'Sí, la cocina de cercanía es sostenible.', translation: 'Yes, local sourcing cuisine is sustainable.', nextNodeId: 'start' },
          { text: 'La globalización culinaria aporta variedad.', translation: 'Culinary globalization brings variety.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'Respetar la temporalidad de los ingredientes agrícolas locales enriquece nuestra cultura gastronómica y protege el ecosistema.',
          translation: 'Respecting the temporality of local agricultural ingredients enriches our gastronomic culture and protects the ecosystem.',
          nextNodeId: 'start',
        },
      },
      gluten_development: {
        id: 'gluten_development',
        text: 'La dureza excesiva se debe a una hidratación insuficiente o a un sobreamasado que satura la red de gluten. Las proteínas gliadina y glutenina requieren agua y tiempo (autólisis) para polimerizarse y formar una malla elástica capaz de retener el dióxido de carbono liberado por las levaduras. Te aconsejo una hidratación mínima del 75% y fermentación en frío durante 24 horas. ¿Aplicas autólisis en tus masas?',
        translation: 'Excessive hardness is due to insufficient hydration or overkneading that saturates the gluten network. The proteins gliadin and glutenin require water and time (autolysis) to polymerize and form an elastic mesh capable of retaining carbon dioxide released by yeasts. I advise a minimum hydration of 75% and cold fermentation for 24 hours. Do you apply autolysis in your doughs?',
        signOff: 'Diego, analizando almidones',
        quickReplies: [
          { text: 'Sí, la autólisis mejora la extensibilidad.', translation: 'Yes, autolysis improves extensibility.', nextNodeId: 'start' },
          { text: 'Probaré la fermentación retardada en frío.', translation: 'I will try retarded cold fermentation.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'La bioquímica panadera nos enseña que el tiempo y la temperatura sustituyen con creces al esfuerzo físico del amasado.',
          translation: 'Baking biochemistry teaches us that time and temperature amply replace the physical effort of kneading.',
          nextNodeId: 'start',
        },
      },
      baking_history: {
        id: 'baking_history',
        text: 'La panadería estructuró los primeros asentamientos humanos en el Neolítico. El horno comunitario era el eje social y económico de las villas medievales, donde cada familia marcaba su masa con un sello único para distinguirla. Volver a la masa madre y al horno de leña es recuperar una herencia civilizatoria indispensable. ¿Te interesa la historia de la alimentación humana?',
        translation: 'Baking structured the first human settlements in the Neolithic. The community oven was the social and economic hub of medieval villages, where each family marked their dough with a unique stamp to distinguish it. Returning to sourdough and wood-fired oven is retrieving an indispensable civilizing heritage. Are you interested in the history of human nutrition?',
        signOff: 'Diego, guardián del fuego y la masa',
        quickReplies: [
          { text: 'La sociología alimentaria es apasionante.', translation: 'Food sociology is exciting.', nextNodeId: 'start' },
          { text: 'El pan unió comunidades agrarias.', translation: 'Bread united agricultural communities.', nextNodeId: 'start' },
        ],
        fallbackReply: {
          text: 'El pan es más que alimento; es un símbolo antropológico de hospitalidad y comunidad compartido por toda la humanidad.',
          translation: 'Bread is more than food; it is an anthropological symbol of hospitality and community shared by all humanity.',
          nextNodeId: 'start',
        },
      },
    },
  },
};
