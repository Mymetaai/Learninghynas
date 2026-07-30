export type RarityRank = 'SSR' | 'SS' | 'S' | 'Epic' | 'Rare' | 'Common';

export interface GachaCardData {
  id: string;
  name: string;
  anime: 'One Piece' | 'Demon Slayer';
  rank: RarityRank;
  quote: string;
  imagePlaceholderColor: string;
  imageUrl?: string;
  emoji?: string;
  specialMove?: string;
}

export const GACHA_CARDS: GachaCardData[] = [
  // ── SSR (Top 1%) ───────────────────────────────────────────────────────────
  {
    id: 'op-luffy-g5',
    name: 'Monkey D. Luffy (Gear 5)',
    anime: 'One Piece',
    rank: 'SSR',
    quote: 'This is my peak! The warrior of liberation has awakened!',
    imagePlaceholderColor: '#D4AF37',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/0/06/Nika_Anime_Infobox.png',
    emoji: '👒🌩️',
    specialMove: 'Gomu Gomu no Bajrang Gun'
  },
  {
    id: 'op-roger',
    name: 'Gol D. Roger',
    anime: 'One Piece',
    rank: 'SSR',
    quote: 'My treasure? If you want it, you can have it! Search for it!',
    imagePlaceholderColor: '#B8860B',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/2/24/Gol_D._Roger_Anime_Infobox.png',
    emoji: '🏴‍☠️👑',
    specialMove: 'Divine Departure (Kamusari)'
  },
  {
    id: 'ds-yoriichi',
    name: 'Yoriichi Tsugikuni',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'All things have an order. I am no exception.',
    imagePlaceholderColor: '#C59B27',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/08/Yoriichi_Tsugikuni_%28Anime%29.png',
    emoji: '☀️⚔️',
    specialMove: 'Sun Breathing: Dragon Sun Halo Head Dance'
  },
  {
    id: 'ds-muzan',
    name: 'Muzan Kibutsuji',
    anime: 'Demon Slayer',
    rank: 'SSR',
    quote: 'Change your perspective. I am an absolute natural disaster.',
    imagePlaceholderColor: '#990000',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/0e/Muzan_Kibutsuji_Full_Body_%28Anime%29.png',
    emoji: '🎩🩸',
    specialMove: 'Blood Demon Art: Biokinesis & Whiplash'
  },

  // ── SS (Top 5%) ────────────────────────────────────────────────────────────
  {
    id: 'op-shanks',
    name: 'Red-Haired Shanks',
    anime: 'One Piece',
    rank: 'SS',
    quote: 'I came to put an end to this war.',
    imagePlaceholderColor: '#A9A9A9',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/6/66/Shanks_Anime_Infobox.png',
    emoji: '⚔️🔴',
    specialMove: 'Gryphon Haki Slash'
  },
  {
    id: 'op-whitebeard',
    name: 'Edward Newgate',
    anime: 'One Piece',
    rank: 'SS',
    quote: 'THE ONE PIECE IS REAL!',
    imagePlaceholderColor: '#C0C0C0',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/b7/Edward_Newgate_Anime_Infobox.png',
    emoji: '🌊👨‍🦳',
    specialMove: 'Gekishin (Severe Earthquake)'
  },
  {
    id: 'ds-kokushibo',
    name: 'Kokushibo',
    anime: 'Demon Slayer',
    rank: 'SS',
    quote: 'You have opened the path to your own demise.',
    imagePlaceholderColor: '#4B0082',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/5/5f/Kokushibo_back_facing.png',
    emoji: '👁️⚔️',
    specialMove: 'Moon Breathing: Catastrophe - Tenman Sengetsu'
  },
  {
    id: 'ds-tanjiro',
    name: 'Tanjiro Kamado',
    anime: 'Demon Slayer',
    rank: 'SS',
    quote: 'No matter how many people you lose, you must go on living.',
    imagePlaceholderColor: '#1488E0',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/05/Tanjiro_anime_right_face.png',
    emoji: '🎴🔥',
    specialMove: 'Hinokami Kagura: Clear Blue Sky'
  },
  {
    id: 'ds-rengoku',
    name: 'Kyojuro Rengoku',
    anime: 'Demon Slayer',
    rank: 'SS',
    quote: 'Set your heart ablaze! Go beyond your limits!',
    imagePlaceholderColor: '#D97706',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/de/Kyojuro_anime_right_face.png',
    emoji: '🔥🦉',
    specialMove: 'Flame Breathing Ninth Form: Rengoku'
  },

  // ── S (Top 10%) ────────────────────────────────────────────────────────────
  {
    id: 'op-zoro',
    name: 'Roronoa Zoro',
    anime: 'One Piece',
    rank: 'S',
    quote: 'Nothing happened.',
    imagePlaceholderColor: '#10B981',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/5/52/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png',
    emoji: '⚔️🟢',
    specialMove: 'Santoryu Ogi: Ichidai Sanzen Daisen Sekai'
  },
  {
    id: 'op-law',
    name: 'Trafalgar D. Water Law',
    anime: 'One Piece',
    rank: 'S',
    quote: "The weak don't get to decide how they die.",
    imagePlaceholderColor: '#0EA5E9',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/4/4d/Trafalgar_D._Water_Law_Anime_Post_Timeskip_Infobox.png',
    emoji: '🩺🟡',
    specialMove: 'Kroom: Radio Knife'
  },
  {
    id: 'op-ace',
    name: 'Portgas D. Ace',
    anime: 'One Piece',
    rank: 'S',
    quote: 'Thank you for loving me!',
    imagePlaceholderColor: '#F97316',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/4/4f/Portgas_D._Ace_Anime_Infobox.png',
    emoji: '🔥🤠',
    specialMove: 'Enkai: Hibashira (Fire Pillar)'
  },
  {
    id: 'ds-doma',
    name: 'Doma',
    anime: 'Demon Slayer',
    rank: 'S',
    quote: "I'm just so happy to meet someone who understands true emotion!",
    imagePlaceholderColor: '#E0F2FE',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/2/24/Anime_Doma%27s_cult_wear.png',
    emoji: '🪭❄️',
    specialMove: 'Blood Demon Art: Crystalline Divine Bodhisattva'
  },
  {
    id: 'ds-tomioka',
    name: 'Giyu Tomioka',
    anime: 'Demon Slayer',
    rank: 'S',
    quote: 'Feel the rage. The powerful, pure rage of not being able to forgive.',
    imagePlaceholderColor: '#2563EB',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/b/b8/Giyu_anime_right_face.png',
    emoji: '🌊⚔️',
    specialMove: 'Water Breathing Eleventh Form: Dead Calm'
  },

  // ── EPIC ───────────────────────────────────────────────────────────────────
  {
    id: 'op-luffy',
    name: 'Monkey D. Luffy',
    anime: 'One Piece',
    rank: 'Epic',
    quote: "I'm gonna be the Pirate King!",
    imagePlaceholderColor: '#8A79AF',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png',
    emoji: '👒🍖',
    specialMove: 'Gomu Gomu no Red Hawk'
  },
  {
    id: 'op-yamato',
    name: 'Yamato',
    anime: 'One Piece',
    rank: 'Epic',
    quote: 'I live as Kozuki Oden!',
    imagePlaceholderColor: '#D946EF',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/bd/Yamato_Anime_Infobox.png',
    emoji: '📿❄️',
    specialMove: 'Raimei Hakka (Thunder Bagua)'
  },
  {
    id: 'ds-nezuko',
    name: 'Nezuko Kamado',
    anime: 'Demon Slayer',
    rank: 'Epic',
    quote: 'Mm-mm! (Protect humans from all demons!)',
    imagePlaceholderColor: '#EC4899',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/89/Nezuko_anime_design.png',
    emoji: '🎋🌸',
    specialMove: 'Blood Demon Art: Exploding Blood'
  },
  {
    id: 'ds-zenitsu',
    name: 'Zenitsu Agatsuma',
    anime: 'Demon Slayer',
    rank: 'Epic',
    quote: 'Thunder Breathing First Form: Thunderclap and Flash Sixfold!',
    imagePlaceholderColor: '#EAB308',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/c/c5/Zenitsu_anime_design.png',
    emoji: '⚡🌩️',
    specialMove: 'Thunderclap and Flash: God Speed'
  },
  {
    id: 'ds-inosuke',
    name: 'Inosuke Hashibira',
    anime: 'Demon Slayer',
    rank: 'Epic',
    quote: 'Lord Inosuke is coming through!',
    imagePlaceholderColor: '#3B82F6',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/f/fe/Inosuke_anime_design.png',
    emoji: '🐗⚔️',
    specialMove: 'Beast Breathing Third Fang: Devour'
  },

  // ── RARE ───────────────────────────────────────────────────────────────────
  {
    id: 'op-nami',
    name: 'Nami',
    anime: 'One Piece',
    rank: 'Rare',
    quote: "What good is treasure if I'm all alone?",
    imagePlaceholderColor: '#7D927D',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/6/68/Nami_Anime_Post_Timeskip_Infobox.png',
    emoji: '🍊⚡',
    specialMove: 'Zeus Tempo: Lightning Blast'
  },
  {
    id: 'op-sanji',
    name: 'Vinsmoke Sanji',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'Cooking is a gift from the gods; spices are a gift from the devil.',
    imagePlaceholderColor: '#7D927D',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/b6/Sanji_Anime_Post_Timeskip_Infobox.png',
    emoji: '🚬🔥',
    specialMove: 'Diable Jambe: Concasser'
  },
  {
    id: 'op-robin',
    name: 'Nico Robin',
    anime: 'One Piece',
    rank: 'Rare',
    quote: 'I want to live! Take me out to sea with you!',
    imagePlaceholderColor: '#7D927D',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/bc/Nico_Robin_Anime_Post_Timeskip_Infobox.png',
    emoji: '👁️🌸',
    specialMove: 'Mil Fleur: Giganteresco Mano'
  },
  {
    id: 'ds-shinobu',
    name: 'Shinobu Kocho',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'I may be small, but my wisteria poison is fatal.',
    imagePlaceholderColor: '#7D927D',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/f/f8/Shinobu_anime_design.png',
    emoji: '🦋🟣',
    specialMove: 'Insect Breathing: Dance of the Bee Sting'
  },
  {
    id: 'ds-mitsuri',
    name: 'Mitsuri Kanroji',
    anime: 'Demon Slayer',
    rank: 'Rare',
    quote: 'Is it okay for a girl to be this strong?',
    imagePlaceholderColor: '#7D927D',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/5/52/Mitsuri_anime_design.png',
    emoji: '💖🍡',
    specialMove: 'Love Breathing Fifth Form: Wavering Love'
  },

  // ── COMMON ─────────────────────────────────────────────────────────────────
  {
    id: 'op-koby',
    name: 'Koby',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'I will become a brave Marine Admiral!',
    imagePlaceholderColor: '#2F353B',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/b8/Koby_Anime_Post_Timeskip_Infobox.png',
    emoji: '⚓👓',
    specialMove: 'Honesty Impact'
  },
  {
    id: 'op-buggy',
    name: 'Buggy the Clown',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'Flashily, of course!',
    imagePlaceholderColor: '#2F353B',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/f/f7/Buggy_Anime_Post_Timeskip_Infobox.png',
    emoji: '🤡🔴',
    specialMove: 'Mugen Bara Bara (Infinite Chop)'
  },
  {
    id: 'op-usopp',
    name: 'Usopp',
    anime: 'One Piece',
    rank: 'Common',
    quote: 'I have 8,000 followers behind me!',
    imagePlaceholderColor: '#2F353B',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/3/35/Usopp_Anime_Post_Timeskip_Infobox.png',
    emoji: '🎯👃',
    specialMove: 'Green Star Pop Green'
  },
  {
    id: 'op-chopper',
    name: 'Tony Tony Chopper',
    anime: 'One Piece',
    rank: 'Common',
    quote: "Complimenting me won't make me happy, you bastard!",
    imagePlaceholderColor: '#2F353B',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/a/af/Tony_Tony_Chopper_Anime_Post_Timeskip_Infobox.png',
    emoji: '🩺🦌',
    specialMove: 'Monster Point Heavy Gon'
  },
  {
    id: 'ds-murata',
    name: 'Murata',
    anime: 'Demon Slayer',
    rank: 'Common',
    quote: 'I survived Mount Natagumo! Never underestimate a senior slayer!',
    imagePlaceholderColor: '#2F353B',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/89/Murata_anime_design.png',
    emoji: '🗡️🧑',
    specialMove: 'Water Breathing Basic Slash'
  }
];

// Weighted Random Selection Helper
export const getRandomGachaCard = (): GachaCardData => {
  const roll = Math.random() * 100; // 0 to 100

  let targetRank: RarityRank = 'Common';
  if (roll < 1.5) {
    targetRank = 'SSR'; // 1.5% chance
  } else if (roll < 6.5) {
    targetRank = 'SS'; // 5% chance
  } else if (roll < 16.5) {
    targetRank = 'S'; // 10% chance
  } else if (roll < 40) {
    targetRank = 'Epic'; // 23.5% chance
  } else if (roll < 70) {
    targetRank = 'Rare'; // 30% chance
  } else {
    targetRank = 'Common'; // 30% chance
  }

  const matchingCards = GACHA_CARDS.filter((c) => c.rank === targetRank);
  if (matchingCards.length === 0) {
    return GACHA_CARDS[Math.floor(Math.random() * GACHA_CARDS.length)];
  }

  return matchingCards[Math.floor(Math.random() * matchingCards.length)];
};
