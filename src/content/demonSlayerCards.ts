export interface DemonSlayerCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emoji: string;
  imageUrl: string;
  bounty: string; // Used for Slayer Rank / Level
  description: string;
  specialMove: string;
  color: string; // Gradient class
  glowColor: string; // Glow shadow class
}

export const DEMON_SLAYER_CARDS: DemonSlayerCard[] = [
  // Legendary
  {
    id: 'ds-yoriichi',
    name: 'Yoriichi Tsugikuni',
    rarity: 'legendary',
    emoji: '☀️⚔️',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/08/Yoriichi_Tsugikuni_%28Anime%29.png',
    bounty: 'Sun Breathing Creator (Legendary)',
    description: 'The strongest Demon Slayer to have ever existed. He invented the Sun Breathing style, which all other breathing styles are derived from.',
    specialMove: 'Sun Breathing: Dragon Sun Halo Head Dance',
    color: 'from-amber-600 via-red-500 to-yellow-500 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(239,68,68,0.8)] border-red-500'
  },
  {
    id: 'ds-muzan',
    name: 'Muzan Kibutsuji',
    rarity: 'legendary',
    emoji: '🎩🩸',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/0e/Muzan_Kibutsuji_Full_Body_%28Anime%29.png',
    bounty: 'The Demon King (Legendary)',
    description: 'The first and progenitor of all demons. He is cold-hearted, ruthless, and obsessed with attaining absolute perfection and immortality.',
    specialMove: 'Blood Demon Art: Biokinesis & Whiplash',
    color: 'from-slate-900 via-rose-950 to-zinc-950 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(225,29,72,0.8)] border-rose-600'
  },
  {
    id: 'ds-kokushibo',
    name: 'Kokushibo',
    rarity: 'legendary',
    emoji: '👁️⚔️',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/5/5f/Kokushibo_back_facing.png',
    bounty: 'Upper Moon One (Legendary)',
    description: 'The highest-ranking demon of the Twelve Kizuki. Formerly a Demon Slayer named Michikatsu, he uses Moon Breathing combined with demon arts.',
    specialMove: 'Moon Breathing: Catastrophe - Tenman Sengetsu',
    color: 'from-purple-900 via-indigo-950 to-black text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(147,51,234,0.8)] border-purple-500'
  },
  {
    id: 'ds-tanjiro',
    name: 'Tanjiro Kamado',
    rarity: 'legendary',
    emoji: '🎴🔥',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/05/Tanjiro_anime_right_face.png',
    bounty: 'Sun Breathing User (Legendary)',
    description: 'A kind-hearted boy who becomes a Demon Slayer to cure his sister Nezuko and avenge his family. Inherited the Hinokami Kagura (Sun Breathing).',
    specialMove: 'Hinokami Kagura: Clear Blue Sky',
    color: 'from-teal-600 via-red-600 to-amber-500 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(20,184,166,0.8)] border-teal-500'
  },
  // Epic
  {
    id: 'ds-rengoku',
    name: 'Kyojuro Rengoku',
    rarity: 'epic',
    emoji: '🔥🦉',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/de/Kyojuro_anime_right_face.png',
    bounty: 'Flame Hashira (Epic)',
    description: 'The charismatic and enthusiastic Flame Hashira. Possesses an unwavering sense of justice and duty, promising to protect all humans.',
    specialMove: 'Flame Breathing Ninth Form: Rengoku',
    color: 'from-orange-600 via-amber-500 to-red-700 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(249,115,22,0.7)] border-orange-500'
  },
  {
    id: 'ds-giyu',
    name: 'Giyu Tomioka',
    rarity: 'epic',
    emoji: '🌊⚔️',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/43/Giyu_anime_design.png',
    bounty: 'Water Hashira (Epic)',
    description: 'The reserved and stoic Water Hashira. He was the first Demon Slayer Tanjiro met, sparing Nezuko and directing Tanjiro to Urokodaki.',
    specialMove: 'Water Breathing Eleventh Form: Dead Calm',
    color: 'from-blue-700 via-indigo-600 to-slate-900 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(29,78,216,0.7)] border-blue-500'
  },
  {
    id: 'ds-akaza',
    name: 'Akaza',
    rarity: 'epic',
    emoji: '❄️👊',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/99/Akaza_IC_anime_render.png',
    bounty: 'Upper Moon Three (Epic)',
    description: 'A powerful martial artist demon who respects strength and offers his opponents demonhood to continue training forever.',
    specialMove: 'Destructive Death: Compass Needle',
    color: 'from-pink-600 via-purple-700 to-sky-950 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(219,39,119,0.7)] border-pink-500'
  },
  {
    id: 'ds-nezuko',
    name: 'Nezuko Kamado',
    rarity: 'epic',
    emoji: '🎋🌸',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/0e/Nezuko_anime_right_face.png',
    bounty: 'Demonized Sister (Epic)',
    description: 'Tanjiros sister who was transformed into a demon. She retains her human emotions, protecting humans and utilizing exploding blood.',
    specialMove: 'Blood Demon Art: Exploding Blood',
    color: 'from-rose-500 via-pink-400 to-slate-900 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(244,63,94,0.7)] border-rose-500'
  },
  {
    id: 'ds-zenitsu',
    name: 'Zenitsu Agatsuma',
    rarity: 'epic',
    emoji: '⚡🐦',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/4f/Zenitsu_anime_right_face.png',
    bounty: 'Thunder Breathing User (Epic)',
    description: 'A cowardly Demon Slayer who only fights when unconscious. When asleep, he becomes lightning fast and deadly.',
    specialMove: 'Thunderclap and Flash: Six Fold',
    color: 'from-amber-400 via-yellow-300 to-amber-700 text-ink',
    glowColor: 'shadow-[0_0_15px_rgba(251,191,36,0.7)] border-yellow-400'
  },
  // Rare
  {
    id: 'ds-inosuke',
    name: 'Inosuke Hashibira',
    rarity: 'rare',
    emoji: '🐗⚔️',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/d4/Inosuke_anime.png',
    bounty: 'Beast Breathing Creator (Rare)',
    description: 'A wild, hot-blooded boy raised by boars. Wields dual jagged swords and created his own Beast Breathing style.',
    specialMove: 'Beast Breathing: Spatial Awareness',
    color: 'from-cyan-700 via-sky-500 to-slate-800 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(6,182,212,0.5)] border-cyan-500'
  },
  {
    id: 'ds-shinobu',
    name: 'Shinobu Kocho',
    rarity: 'rare',
    emoji: '🦋🧪',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/e/e5/Shinobu_anime.png',
    bounty: 'Insect Hashira (Rare)',
    description: 'The cheerful but secretly angry Insect Hashira. Lacking the strength to cut off demon heads, she uses wisteria poisons to kill them.',
    specialMove: 'Insect Breathing: Dance of the Bee Sting',
    color: 'from-fuchsia-600 via-purple-500 to-slate-900 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(192,38,211,0.5)] border-fuchsia-500'
  },
  {
    id: 'ds-tengen',
    name: 'Tengen Uzui',
    rarity: 'rare',
    emoji: '💎🔊',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/07/Tengen_anime.png',
    bounty: 'Sound Hashira (Rare)',
    description: 'The flashy and flamboyant Sound Hashira. A former ninja who uses giant twin cleavers explosive blades and sound score analysis.',
    specialMove: 'Sound Breathing: Symphony of Shrill Strings',
    color: 'from-emerald-500 via-teal-400 to-indigo-950 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(16,185,129,0.5)] border-emerald-500'
  },
  {
    id: 'ds-rui',
    name: 'Rui',
    rarity: 'rare',
    emoji: '🕷️🕸️',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/95/Rui_anime_2.png',
    bounty: 'Lower Moon Five (Rare)',
    description: 'A spider demon of Mount Natagumo who forces other demons to act as his family in a twisted web of terror.',
    specialMove: 'Blood Demon Art: Cutting Thread Cage',
    color: 'from-slate-500 via-red-900 to-zinc-900 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(239,68,68,0.5)] border-red-800'
  },
  // Common
  {
    id: 'ds-kanao',
    name: 'Kanao Tsuyuri',
    rarity: 'common',
    emoji: '🦋🪙',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/02/Kanao_anime_right_face.png',
    bounty: 'Tsuguko Slayer (Common)',
    description: 'Shinobu\'s silent disciple who makes decisions by flipping a coin. Possesses incredible kinetic vision.',
    specialMove: 'Flower Breathing: Equinoctial Vermilion Eye',
    color: 'from-stone-400 to-stone-600 text-paper',
    glowColor: 'shadow-md border-stone-400'
  },
  {
    id: 'ds-genya',
    name: 'Genya Shinazugawa',
    rarity: 'common',
    emoji: '🔫🩸',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/c/cb/Genya_Shinazugawa_Full_Body_%28Anime%29.png',
    bounty: 'Demon Eater Slayer (Common)',
    description: 'The Wind Hashiras brother. He cannot use breathing styles but possesses the unique ability to eat demon flesh to temporarily gain powers.',
    specialMove: 'Flesh Gun Blast',
    color: 'from-slate-400 to-slate-600 text-paper',
    glowColor: 'shadow-md border-slate-400'
  },
  {
    id: 'ds-murata',
    name: 'Murata',
    rarity: 'common',
    emoji: '🛡️👨',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/8d/Murata_IC_anime_render.png',
    bounty: 'Senior Demon Slayer (Common)',
    description: 'A standard Demon Slayer who survived the spider mountain. Possesses faint water breathing effects and legendary luck.',
    specialMove: 'Water Breathing: Water Splash',
    color: 'from-gray-400 to-gray-600 text-paper',
    glowColor: 'shadow-md border-gray-400'
  },
  {
    id: 'ds-enmu',
    name: 'Enmu',
    rarity: 'common',
    emoji: '😴🚂',
    imageUrl: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/7/79/Enmu_anime.png',
    bounty: 'Lower Moon One (Common)',
    description: 'A sadistic demon who manipulates sleep and dreams, merging with the Mugen Train to devour hundreds of passengers.',
    specialMove: 'Forced Unconscious Hypnosis',
    color: 'from-zinc-400 to-zinc-600 text-paper',
    glowColor: 'shadow-md border-zinc-400'
  }
];
