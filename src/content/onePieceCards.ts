export interface OnePieceCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emoji: string;
  imageUrl: string; // Direct transparent character render URL
  bounty: string;
  description: string;
  specialMove: string;
  color: string; // Gradient class
  glowColor: string; // Glow shadow class
}

export const ONE_PIECE_CARDS: OnePieceCard[] = [
  // Legendary
  {
    id: 'op-luffy-g5',
    name: 'Monkey D. Luffy (Gear 5)',
    rarity: 'legendary',
    emoji: '👒🌩️',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/5/5a/Monkey_D._Luffy_Gear_5_Infobox.png',
    bounty: '3,000,000,000 Belly',
    description: 'The warrior of liberation. His ridiculous power allows him to fight in whatever way he can imagine, bringing smiles to people.',
    specialMove: 'Gomu Gomu no Bajrang Gun',
    color: 'from-amber-400 via-yellow-200 to-white text-ink',
    glowColor: 'shadow-[0_0_25px_rgba(251,191,36,0.8)] border-yellow-400'
  },
  {
    id: 'op-roger',
    name: 'Gol D. Roger',
    rarity: 'legendary',
    emoji: '🏴‍☠️👑',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/5/50/Gol_D._Roger_Anime_Infobox.png',
    bounty: '5,564,800,000 Belly',
    description: 'The legendary Pirate King who conquered the Grand Line and acquired the ultimate treasure, One Piece.',
    specialMove: 'Divine Departure (Kamusari)',
    color: 'from-yellow-600 via-amber-500 to-red-700 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(217,119,6,0.8)] border-amber-500'
  },
  {
    id: 'op-shanks',
    name: 'Red-Haired Shanks',
    rarity: 'legendary',
    emoji: '⚔️🔴',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/6/66/Shanks_Anime_Infobox.png',
    bounty: '4,048,900,000 Belly',
    description: 'One of the Four Emperors of the Sea. A master of Conqueror\'s Haki who inspired Luffy to set sail.',
    specialMove: 'Gryphon Haki Slash',
    color: 'from-red-600 via-amber-500 to-rose-900 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(220,38,38,0.8)] border-red-500'
  },
  {
    id: 'op-whitebeard',
    name: 'Edward Newgate (Whitebeard)',
    rarity: 'legendary',
    emoji: '🌊👨‍🦳',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/5/5f/Edward_Newgate_Anime_Infobox.png',
    bounty: '5,046,000,000 Belly',
    description: 'The Strongest Man in the World and captain of the Whitebeard Pirates. Possessor of the quake power.',
    specialMove: 'Gekishin (Severe Earthquake)',
    color: 'from-blue-900 via-amber-500 to-slate-800 text-paper',
    glowColor: 'shadow-[0_0_25px_rgba(59,130,246,0.8)] border-blue-500'
  },
  // Epic
  {
    id: 'op-luffy',
    name: 'Monkey D. Luffy',
    rarity: 'epic',
    emoji: '👒🍖',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/a/af/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png',
    bounty: '1,500,000,000 Belly',
    description: 'Captain of the Straw Hat Pirates. Aspires to find the One Piece and become the free-est person on the sea.',
    specialMove: 'Gomu Gomu no Red Hawk',
    color: 'from-purple-600 via-red-500 to-pink-600 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(168,85,247,0.7)] border-purple-500'
  },
  {
    id: 'op-zoro',
    name: 'Roronoa Zoro',
    rarity: 'epic',
    emoji: '⚔️🟢',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/5/52/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png',
    bounty: '1,111,000,000 Belly',
    description: 'The formidable combatant and pirate hunter who fights using the legendary Three-Sword Style.',
    specialMove: 'Santoryu Ogi: Ichidai Sanzen Daisen Sekai',
    color: 'from-emerald-700 via-teal-500 to-green-900 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(16,185,129,0.7)] border-emerald-500'
  },
  {
    id: 'op-law',
    name: 'Trafalgar D. Water Law',
    rarity: 'epic',
    emoji: '🩺🟡',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/be/Trafalgar_D._Water_Law_Anime_Post_Timeskip_Infobox.png',
    bounty: '3,000,000,000 Belly',
    description: 'The Surgeon of Death and captain of the Heart Pirates. Wields the Op-Op Fruit room ability.',
    specialMove: 'Kroom: Radio Knife',
    color: 'from-sky-700 via-indigo-600 to-slate-900 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(14,165,233,0.7)] border-sky-500'
  },
  {
    id: 'op-ace',
    name: 'Portgas D. Ace',
    rarity: 'epic',
    emoji: '🔥🤠',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/f/f6/Portgas_D._Ace_Anime_Infobox.png',
    bounty: '550,000,000 Belly',
    description: 'Luffy\'s sworn brother and Commander of Whitebeard\'s Second Division. Wielder of the Flame-Flame Fruit.',
    specialMove: 'Enkai: Hibashira (Fire Pillar)',
    color: 'from-orange-600 via-red-500 to-yellow-500 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(249,115,22,0.7)] border-orange-500'
  },
  {
    id: 'op-yamato',
    name: 'Yamato',
    rarity: 'epic',
    emoji: '📿❄️',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/ba/Yamato_Anime_Infobox.png',
    bounty: 'Unknown Bounty',
    description: 'Kaido\'s daughter who identifies as Kozuki Oden. A powerful warrior who uses Haki-infused club strikes.',
    specialMove: 'Raimei Hakka (Thunder Bagua)',
    color: 'from-fuchsia-700 via-cyan-400 to-slate-800 text-paper',
    glowColor: 'shadow-[0_0_15px_rgba(217,70,239,0.7)] border-fuchsia-500'
  },
  // Rare
  {
    id: 'op-nami',
    name: 'Nami',
    rarity: 'rare',
    emoji: '🍊⚡',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/0/04/Nami_Anime_Post_Timeskip_Infobox.png',
    bounty: '366,000,000 Belly',
    description: 'The cat burglar navigator of the Straw Hat Pirates. Masters weather controls with her Sorcery Clima-Tact.',
    specialMove: 'Zeus Tempo: Lightning Blast',
    color: 'from-sky-400 via-orange-400 to-teal-500 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(56,189,248,0.5)] border-sky-400'
  },
  {
    id: 'op-sanji',
    name: 'Vinsmoke Sanji',
    rarity: 'rare',
    emoji: '🚬🔥',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/6/6a/Sanji_Anime_Post_Timeskip_Infobox.png',
    bounty: '1,032,000,000 Belly',
    description: 'The chivalrous cook of the Straw Hat Pirates. Uses his black-leg style kicks fueled by burning passion.',
    specialMove: 'Diable Jambe: Concasser',
    color: 'from-amber-500 via-rose-500 to-indigo-900 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(245,158,11,0.5)] border-amber-500'
  },
  {
    id: 'op-robin',
    name: 'Nico Robin',
    rarity: 'rare',
    emoji: '👁️🌸',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/c/c5/Nico_Robin_Anime_Post_Timeskip_Infobox.png',
    bounty: '930,000,000 Belly',
    description: 'The archaeologist of the Straw Hat Pirates. The only living person who can decipher the ancient Poneglyphs.',
    specialMove: 'Mil Fleur: Giganteresco Mano',
    color: 'from-fuchsia-900 via-purple-600 to-slate-900 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(192,38,211,0.5)] border-fuchsia-600'
  },
  {
    id: 'op-franky',
    name: 'Franky',
    rarity: 'rare',
    emoji: '🦾🤖',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/7/77/Franky_Anime_Post_Timeskip_Infobox.png',
    bounty: '394,000,000 Belly',
    description: 'The cyborg shipwright of the Straw Hat Pirates. Builder of the Thousand Sunny, fueled by cola.',
    specialMove: 'Franky Shogun: Radical Beam',
    color: 'from-cyan-600 via-blue-500 to-indigo-800 text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(6,182,212,0.5)] border-cyan-500'
  },
  {
    id: 'op-brook',
    name: 'Brook',
    rarity: 'rare',
    emoji: '🎻💀',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/e/ea/Brook_Anime_Post_Timeskip_Infobox.png',
    bounty: '383,000,000 Belly',
    description: 'The soul king musician of the Straw Hats. A skeleton who utilizes ice-infused sword play and music.',
    specialMove: 'Soul Parade: Hanauta Sancho',
    color: 'from-violet-950 via-slate-700 to-black text-paper',
    glowColor: 'shadow-[0_0_10px_rgba(109,40,217,0.5)] border-violet-700'
  },
  // Common
  {
    id: 'op-koby',
    name: 'Koby',
    rarity: 'common',
    emoji: '眼镜⚓',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/b/bd/Koby_Anime_Post_Timeskip_Infobox.png',
    bounty: 'None (Marine)',
    description: 'A former slave who trained under Vice Admiral Garp to become a courageous Marine captain.',
    specialMove: 'Honesty Impact',
    color: 'from-slate-400 to-slate-600 text-paper',
    glowColor: 'shadow-md border-slate-400'
  },
  {
    id: 'op-buggy',
    name: 'Buggy the Clown',
    rarity: 'common',
    emoji: '🤡🔴',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/e/e0/Buggy_Anime_Infobox.png',
    bounty: '3,189,000,000 Belly',
    description: 'Leader of Buggy\'s Delivery and an accidental Emperor. Possesses Chop-Chop Fruit splitter powers.',
    specialMove: 'Mugen Bara Bara (Infinite Chop)',
    color: 'from-zinc-400 to-zinc-600 text-paper',
    glowColor: 'shadow-md border-zinc-400'
  },
  {
    id: 'op-usopp',
    name: 'Usopp',
    rarity: 'common',
    emoji: '🎯👃',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/8/87/Usopp_Anime_Post_Timeskip_Infobox.png',
    bounty: '500,000,000 Belly',
    description: 'The sniper of the Straw Hats. Despite his fears, he strives to become a brave warrior of the sea.',
    specialMove: 'Special Attack: Green Star Pop Green',
    color: 'from-stone-400 to-stone-600 text-paper',
    glowColor: 'shadow-md border-stone-400'
  },
  {
    id: 'op-chopper',
    name: 'Tony Tony Chopper',
    rarity: 'common',
    emoji: '🩺🦌',
    imageUrl: 'https://static.wikia.nocookie.net/onepiece/images/a/a2/Tony_Tony_Chopper_Anime_Post_Timeskip_Infobox.png',
    bounty: '1,000 Belly',
    description: 'The blue-nosed reindeer doctor. He can transform into multiple combat forms using Rumble Balls.',
    specialMove: 'Monster Point Smash',
    color: 'from-gray-400 to-gray-600 text-paper',
    glowColor: 'shadow-md border-gray-400'
  }
];
