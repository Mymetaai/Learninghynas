export type RarityRank = 'UR' | 'SSR' | 'SR' | 'Rare' | 'Common';

export interface GachaCardData {
  id: string;
  name: string;
  anime: 'One Piece' | 'Demon Slayer';
  rank: RarityRank;
  quote: string;
  attack: number;
  defense: number;
  imagePlaceholderColor: string;
  imageUrl?: string;
  emoji?: string;
  specialMove?: string;
}

export const GACHA_CARDS: GachaCardData[] = [
  // ── UR (Top 1%) ───────────────────────────────────────────────────────────
  {
    id: 'ds-yoriichi',
    name: 'Yoriichi Tsugikuni',
    anime: 'Demon Slayer',
    rank: 'UR',
    quote: 'All things have an order. I am no exception.',
    attack: 300,
    defense: 285,
    imagePlaceholderColor: '#C59B27',
    emoji: '☀️⚔️',
    specialMove: 'Sun Breathing: Dragon Sun Halo Head Dance'
  },
  {
    id: 'op-luffy-g5',
    name: 'Monkey D. Luffy (Gear 5)',
    anime: 'One Piece',
    rank: 'UR',
    quote: 'This is my peak! The warrior of liberation has awakened!',
    attack: 295,
    defense: 280,
    imagePlaceholderColor: '#D4AF37',
    imageUrl: '/cards/luffy.png',
    emoji: '👒🌩️',
    specialMove: 'Gomu Gomu no Bajrang Gun'
  },
  {
    id: 'ds-gyomei',
    name: 'Gyomei Himejima',
    anime: 'Demon Slayer',
    rank: 'UR',
    quote: 'Namu Amida Butsu. We shall eliminate the demons.',
    attack: 295,
    defense: 295,
    imagePlaceholderColor: '#78716C',
    emoji: '📿🪨',
    specialMove: 'Stone Breathing Fifth Form: Arcs of Justice'
  },
  {
    id: 'op-kaido',
    name: 'Kaido of the Beasts',
    anime: 'One Piece',
    rank: 'UR',
    quote: 'If it is one-on-one, Kaido will win.',
    attack: 298,
    defense: 290,
    imagePlaceholderColor: '#4C1D95',
    emoji: '🐉🌩️',
    specialMove: 'Koso Volcanic Flame Dragon'
  },
  {
    id: 'ds-zenitsu-ur',
    name: 'Zenitsu Agatsuma',
    anime: 'Demon Slayer',
    rank: 'UR',
    quote: "I've mastered only one thing...",
    attack: 280,
    defense: 150,
    imagePlaceholderColor: '#EAB308',
    imageUrl: '/cards/zenitsu.png',
    emoji: '⚡🌩️',
    specialMove: 'Thunderclap and Flash: God Speed'
  },
  {
    id: 'op-roger',
    name: 'Gol D. Roger',
    anime: 'One Piece',
    rank: 'UR',
    quote: 'My treasure? If you want it, you can have it! Search for it!',
    attack: 290,
    defense: 275,
    imagePlaceholderColor: '#B8860B',
    emoji: '🏴‍☠️👑',
    specialMove: 'Divine Departure (Kamusari)'
  },
  {
    id: 'ds-muzan',
    name: 'Muzan Kibutsuji',
    anime: 'Demon Slayer',
    rank: 'UR',
    quote: 'I am an absolute natural disaster.',
    attack: 285,
    defense: 290,
    imagePlaceholderColor: '#990000',
    emoji: '🎩🩸',
    specialMove: 'Blood Demon Art: Biokinesis'
  },

  // ── SSR (Top 5%) ────────────────────────────────────────────────────────────
  {
    id: 'ds-sanemi',
    name: 'Sanemi Shinazugawa',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'I will shred every single demon into pieces!',
    attack: 270,
    defense: 220,
    imagePlaceholderColor: '#059669',
    emoji: '🌪️⚔️',
    specialMove: 'Wind Breathing Eighth Form: Primary Gale Slash'
  },
  {
    id: 'ds-tokito',
    name: 'Muichiro Tokito',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'The mist will clear, revealing the truth.',
    attack: 265,
    defense: 210,
    imagePlaceholderColor: '#0D9488',
    emoji: '🌫️⚔️',
    specialMove: 'Mist Breathing Seventh Form: Obscuring Clouds'
  },
  {
    id: 'ds-tanjiro',
    name: 'Tanjiro Kamado',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'I will never give up!',
    attack: 250,
    defense: 220,
    imagePlaceholderColor: '#1488E0',
    imageUrl: '/cards/tanjiro.png',
    emoji: '🎴🔥',
    specialMove: 'Hinokami Kagura: Clear Blue Sky'
  },
  {
    id: 'op-shanks',
    name: 'Red-Haired Shanks',
    anime: 'One Piece',
    rank: 'SSR',
    quote: 'I came to put an end to this war.',
    attack: 270,
    defense: 240,
    imagePlaceholderColor: '#A9A9A9',
    imageUrl: '/cards/shanks.png',
    emoji: '⚔️🔴',
    specialMove: 'Gryphon Haki Slash'
  },
  {
    id: 'op-whitebeard',
    name: 'Edward Newgate',
    anime: 'One Piece',
    rank: 'SSR',
    quote: 'THE ONE PIECE IS REAL!',
    attack: 275,
    defense: 260,
    imagePlaceholderColor: '#C0C0C0',
    emoji: '🌊👨‍🦳',
    specialMove: 'Gekishin (Severe Earthquake)'
  },
  {
    id: 'op-bigmom',
    name: 'Charlotte Linlin (Big Mom)',
    anime: 'One Piece',
    rank: 'SSR',
    quote: 'Life or treat?!',
    attack: 272,
    defense: 275,
    imagePlaceholderColor: '#DB2777',
    emoji: '👑🍬',
    specialMove: 'Maser Cannon / Ikoku Sovereignty'
  },
  {
    id: 'ds-kokushibo',
    name: 'Kokushibo',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'You have opened the path to your own demise.',
    attack: 265,
    defense: 250,
    imagePlaceholderColor: '#4B0082',
    emoji: '👁️⚔️',
    specialMove: 'Moon Breathing: Catastrophe'
  },
  {
    id: 'ds-rengoku',
    name: 'Kyojuro Rengoku',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'Set your heart ablaze! Go beyond your limits!',
    attack: 260,
    defense: 215,
    imagePlaceholderColor: '#D97706',
    imageUrl: '/cards/rengoku.png',
    emoji: '🔥🦉',
    specialMove: 'Flame Breathing Ninth Form: Rengoku'
  },
  {
    id: 'ds-doma',
    name: 'Doma',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'I am so happy to meet someone who understands true emotion!',
    attack: 255,
    defense: 235,
    imagePlaceholderColor: '#E0F2FE',
    emoji: '🪭❄️',
    specialMove: 'Crystalline Divine Bodhisattva'
  },

  // ── SR (Top 10%) ────────────────────────────────────────────────────────────
  {
    id: 'ds-obanai',
    name: 'Obanai Iguro',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'I want to die defeating Muzan, and be reborn in a peaceful world.',
    attack: 225,
    defense: 210,
    imagePlaceholderColor: '#475569',
    emoji: '🐍⚔️',
    specialMove: 'Serpent Breathing Fifth Form: Slithering Serpent'
  },
  {
    id: 'ds-nezuko',
    name: 'Nezuko Kamado',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'Mmmph!',
    attack: 210,
    defense: 260,
    imagePlaceholderColor: '#EC4899',
    imageUrl: '/cards/nezuko.png',
    emoji: '🎋🌸',
    specialMove: 'Blood Demon Art: Exploding Blood'
  },
  {
    id: 'op-zoro',
    name: 'Roronoa Zoro',
    anime: 'One Piece',
    rank: 'SR',
    quote: 'Nothing happened.',
    attack: 235,
    defense: 210,
    imagePlaceholderColor: '#10B981',
    imageUrl: '/cards/zoro.png',
    emoji: '⚔️🟢',
    specialMove: 'Santoryu Ogi: Ichidai Sanzen Daisen Sekai'
  },
  {
    id: 'op-law',
    name: 'Trafalgar D. Water Law',
    anime: 'One Piece',
    rank: 'SR',
    quote: "The weak don't get to decide how they die.",
    attack: 225,
    defense: 200,
    imagePlaceholderColor: '#0EA5E9',
    emoji: '🩺🟡',
    specialMove: 'Kroom: Radio Knife'
  },
  {
    id: 'op-ace',
    name: 'Portgas D. Ace',
    anime: 'One Piece',
    rank: 'SR',
    quote: 'Thank you for loving me!',
    attack: 230,
    defense: 185,
    imagePlaceholderColor: '#F97316',
    emoji: '🔥🤠',
    specialMove: 'Enkai: Hibashira (Fire Pillar)'
  },
  {
    id: 'op-jinbe',
    name: 'Jinbe',
    anime: 'One Piece',
    rank: 'SR',
    quote: 'I am a man who wants to join the future Pirate King!',
    attack: 215,
    defense: 240,
    imagePlaceholderColor: '#0284C7',
    emoji: '🦈🌊',
    specialMove: 'Fishman Karate: Vagabond Drill'
  },
  {
    id: 'ds-gyutaro',
    name: 'Gyutaro',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'I will destroy everyone who has it better than us!',
    attack: 230,
    defense: 190,
    imagePlaceholderColor: '#15803D',
    emoji: '🪓🐍',
    specialMove: 'Flying Blood Sickles'
  },
  {
    id: 'ds-tomioka',
    name: 'Giyu Tomioka',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'Feel the rage. The powerful, pure rage of not being able to forgive.',
    attack: 220,
    defense: 230,
    imagePlaceholderColor: '#2563EB',
    emoji: '🌊⚔️',
    specialMove: 'Water Breathing Eleventh Form: Dead Calm'
  },
  {
    id: 'ds-akaza',
    name: 'Akaza',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'Become a demon, Kyojuro! Continue to train forever!',
    attack: 240,
    defense: 210,
    imagePlaceholderColor: '#DB2777',
    emoji: '❄️👊',
    specialMove: 'Destructive Death: Compass Needle'
  },
  {
    id: 'ds-tengen',
    name: 'Tengen Uzui',
    anime: 'Demon Slayer',
    rank: 'SR',
    quote: 'Starting right now, things are gonna get real flashy!',
    attack: 225,
    defense: 195,
    imagePlaceholderColor: '#10B981',
    emoji: '💎🔊',
    specialMove: 'Sound Breathing: Roar'
  },

  // ── Rare ───────────────────────────────────────────────────────────────────
  {
    id: 'op-luffy',
    name: 'Monkey D. Luffy',
    anime: 'One Piece',
    rank: 'Rare',
    quote: "I'm gonna be the Pirate King!",
    attack: 180,
    defense: 165,
    imagePlaceholderColor: '#8A79AF',
    imageUrl: '/cards/luffy.png',
    emoji: '👒🍖',
    specialMove: 'Gomu Gomu no Red Hawk'
  },
  {
    id: 'op-yamato',
    name: 'Yamato',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'I live as Kozuki Oden!',
    attack: 185,
    defense: 170,
    imagePlaceholderColor: '#D946EF',
    emoji: '📿❄️',
    specialMove: 'Raimei Hakka (Thunder Bagua)'
  },
  {
    id: 'ds-inosuke',
    name: 'Inosuke Hashibira',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'Lord Inosuke is coming through!',
    attack: 175,
    defense: 150,
    imagePlaceholderColor: '#3B82F6',
    emoji: '🐗⚔️',
    specialMove: 'Beast Breathing Third Fang: Devour'
  },
  {
    id: 'op-nami',
    name: 'Nami',
    anime: 'One Piece',
    rank: 'Rare',
    quote: "What good is treasure if I'm all alone?",
    attack: 155,
    defense: 140,
    imagePlaceholderColor: '#7D927D',
    emoji: '🍊⚡',
    specialMove: 'Zeus Tempo: Lightning Blast'
  },
  {
    id: 'op-sanji',
    name: 'Vinsmoke Sanji',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'Spices are a gift from the devil.',
    attack: 180,
    defense: 160,
    imagePlaceholderColor: '#7D927D',
    emoji: '🚬🔥',
    specialMove: 'Diable Jambe: Concasser'
  },
  {
    id: 'op-robin',
    name: 'Nico Robin',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'I want to live! Take me out to sea with you!',
    attack: 165,
    defense: 155,
    imagePlaceholderColor: '#7D927D',
    emoji: '👁️🌸',
    specialMove: 'Mil Fleur: Giganteresco Mano'
  },
  {
    id: 'op-franky',
    name: 'Franky',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'SUUUPER!',
    attack: 170,
    defense: 180,
    imagePlaceholderColor: '#0284C7',
    emoji: '🦾🤖',
    specialMove: 'Radical Beam'
  },
  {
    id: 'op-brook',
    name: 'Brook',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'Yo-ho-ho-ho!',
    attack: 160,
    defense: 145,
    imagePlaceholderColor: '#475569',
    emoji: '🎻💀',
    specialMove: 'Soul Solid Blizzard'
  },
  {
    id: 'ds-kanao',
    name: 'Kanao Tsuyuri',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'I will follow my heart and protect my friends.',
    attack: 170,
    defense: 160,
    imagePlaceholderColor: '#A21CAF',
    emoji: '🦋🪙',
    specialMove: 'Flower Breathing: Equinoctial Vermilion Eye'
  },
  {
    id: 'ds-genya',
    name: 'Genya Shinazugawa',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'I will do whatever it takes to become stronger!',
    attack: 165,
    defense: 170,
    imagePlaceholderColor: '#431407',
    emoji: '🔫🩸',
    specialMove: 'Demon Repulsion Flesh Gun'
  },
  {
    id: 'ds-shinobu',
    name: 'Shinobu Kocho',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'My wisteria poison is fatal.',
    attack: 170,
    defense: 145,
    imagePlaceholderColor: '#7D927D',
    emoji: '🦋🟣',
    specialMove: 'Insect Breathing: Dance of the Bee Sting'
  },
  {
    id: 'ds-mitsuri',
    name: 'Mitsuri Kanroji',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'Is it okay for a girl to be this strong?',
    attack: 175,
    defense: 150,
    imagePlaceholderColor: '#7D927D',
    emoji: '💖🍡',
    specialMove: 'Love Breathing Fifth Form'
  },

  // ── Common ─────────────────────────────────────────────────────────────────
  {
    id: 'op-koby',
    name: 'Koby',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'I will become a brave Marine Admiral!',
    attack: 120,
    defense: 110,
    imagePlaceholderColor: '#2F353B',
    emoji: '⚓👓',
    specialMove: 'Honesty Impact'
  },
  {
    id: 'op-buggy',
    name: 'Buggy the Clown',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'Flashily, of course!',
    attack: 115,
    defense: 105,
    imagePlaceholderColor: '#2F353B',
    emoji: '🤡🔴',
    specialMove: 'Mugen Bara Bara'
  },
  {
    id: 'op-usopp',
    name: 'Usopp',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'I have 8,000 followers behind me!',
    attack: 110,
    defense: 95,
    imagePlaceholderColor: '#2F353B',
    emoji: '🎯👃',
    specialMove: 'Green Star Pop Green'
  },
  {
    id: 'op-chopper',
    name: 'Tony Tony Chopper',
    anime: 'One Piece',
    rank: 'Common',
    quote: "Complimenting me won't make me happy!",
    attack: 105,
    defense: 125,
    imagePlaceholderColor: '#2F353B',
    emoji: '🩺🦌',
    specialMove: 'Monster Point Heavy Gon'
  },
  {
    id: 'ds-murata',
    name: 'Murata',
    anime: 'Demon Slayer',
    rank: 'Common',
    quote: 'Never underestimate a senior slayer!',
    attack: 95,
    defense: 100,
    imagePlaceholderColor: '#2F353B',
    emoji: '🗡️🧑',
    specialMove: 'Water Breathing Basic Slash'
  },
  {
    id: 'ds-rui',
    name: 'Rui',
    anime: 'Demon Slayer',
    rank: 'Common',
    quote: 'A family built on fear is unbreakable.',
    attack: 130,
    defense: 120,
    imagePlaceholderColor: '#475569',
    emoji: '🕷️🕸️',
    specialMove: 'Cutting Thread Cage'
  },
  {
    id: 'ds-enmu',
    name: 'Enmu',
    anime: 'Demon Slayer',
    rank: 'Common',
    quote: 'Sleep sweet dreams and die in your nightmare.',
    attack: 125,
    defense: 115,
    imagePlaceholderColor: '#334155',
    emoji: '😴🚂',
    specialMove: 'Forced Hypnosis Whispers'
  }
];

// Weighted Random Selection Helper
export const getRandomGachaCard = (): GachaCardData => {
  const roll = Math.random() * 100; // 0 to 100

  let targetRank: RarityRank = 'Common';
  if (roll < 1.0) {
    targetRank = 'UR'; // 1% chance
  } else if (roll < 6.0) {
    targetRank = 'SSR'; // 5% chance
  } else if (roll < 16.0) {
    targetRank = 'SR'; // 10% chance
  } else if (roll < 45.0) {
    targetRank = 'Rare'; // 29% chance
  } else {
    targetRank = 'Common'; // 55% chance
  }

  const matchingCards = GACHA_CARDS.filter((c) => c.rank === targetRank);
  if (matchingCards.length === 0) {
    return GACHA_CARDS[Math.floor(Math.random() * GACHA_CARDS.length)];
  }

  return matchingCards[Math.floor(Math.random() * matchingCards.length)];
};
