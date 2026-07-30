export type RarityRank = 'UR' | 'SSR' | 'SR' | 'R' | 'C' | 'Rare' | 'Common';

export interface GachaCardData {
  id: string;
  name: string;
  anime: string;
  rank: string;
  attack: number;
  defense: number;
  quote: string;
  themeColor: string;
  imageUrl?: string;
  imagePlaceholderColor?: string;
  specialMove?: string;
}

export const gachaData: GachaCardData[] = [
  // DEMON SLAYER
  { id: "ds1", name: "Tanjiro Kamado", anime: "Demon Slayer", rank: "UR", attack: 250, defense: 220, quote: "I will never give up!", themeColor: "from-blue-500 to-green-500", imageUrl: "/assets/gacha/ds1.png" },
  { id: "ds2", name: "Nezuko Kamado", anime: "Demon Slayer", rank: "UR", attack: 240, defense: 230, quote: "Mmmph!", themeColor: "from-pink-400 to-pink-600", imageUrl: "/assets/gacha/ds2.png" },
  { id: "ds3", name: "Zenitsu Agatsuma", anime: "Demon Slayer", rank: "UR", attack: 260, defense: 150, quote: "Thunderclap and Flash!", themeColor: "from-yellow-300 to-yellow-600", imageUrl: "/assets/gacha/ds3.png" },
  { id: "ds4", name: "Muzan Kibutsuji", anime: "Demon Slayer", rank: "UR", attack: 300, defense: 250, quote: "Does my complexion look terrible to you?", themeColor: "from-red-900 to-black", imageUrl: "/assets/gacha/ds4.png" },
  { id: "ds5", name: "Kyojuro Rengoku", anime: "Demon Slayer", rank: "SSR", attack: 280, defense: 200, quote: "Set your heart ablaze!", themeColor: "from-red-500 to-orange-500", imageUrl: "/assets/gacha/ds5.png" },
  { id: "ds6", name: "Giyu Tomioka", anime: "Demon Slayer", rank: "SSR", attack: 260, defense: 260, quote: "Dead calm.", themeColor: "from-blue-700 to-blue-900", imageUrl: "/assets/gacha/ds6.png" },
  { id: "ds7", name: "Akaza", anime: "Demon Slayer", rank: "SSR", attack: 290, defense: 210, quote: "Become a demon, Kyojuro!", themeColor: "from-pink-500 to-blue-500", imageUrl: "/assets/gacha/ds7.png" },
  { id: "ds8", name: "Shinobu Kocho", anime: "Demon Slayer", rank: "SR", attack: 200, defense: 210, quote: "I'm the only Hashira who can't cut off a demon's head.", themeColor: "from-purple-400 to-purple-700", imageUrl: "/assets/gacha/ds8.png" },
  { id: "ds9", name: "Gyomei Himejima", anime: "Demon Slayer", rank: "SSR", attack: 310, defense: 290, quote: "Namu Amida Butsu.", themeColor: "from-stone-500 to-stone-700", imageUrl: "/assets/gacha/ds9.png" },
  { id: "ds10", name: "Sanemi Shinazugawa", anime: "Demon Slayer", rank: "SSR", attack: 285, defense: 220, quote: "I'll exterminate every last one of them!", themeColor: "from-green-300 to-green-600", imageUrl: "/assets/gacha/ds10.png" },
  { id: "ds11", name: "Inosuke Hashibira", anime: "Demon Slayer", rank: "SR", attack: 240, defense: 190, quote: "Comin' through!", themeColor: "from-blue-300 to-gray-400", imageUrl: "/assets/gacha/ds11.png" },
  { id: "ds12", name: "Tengen Uzui", anime: "Demon Slayer", rank: "SSR", attack: 270, defense: 230, quote: "I am the god of festivals!", themeColor: "from-fuchsia-500 to-red-500", imageUrl: "/assets/gacha/ds12.png" },
  { id: "ds13", name: "Mitsuri Kanroji", anime: "Demon Slayer", rank: "SR", attack: 250, defense: 200, quote: "Is it okay for a girl to be this strong?", themeColor: "from-pink-300 to-green-300", imageUrl: "/assets/gacha/ds13.png" },
  { id: "ds14", name: "Muichiro Tokito", anime: "Demon Slayer", rank: "SSR", attack: 275, defense: 210, quote: "What was the shape of that cloud again?", themeColor: "from-teal-200 to-teal-500", imageUrl: "/assets/gacha/ds14.png" },
  { id: "ds15", name: "Daki", anime: "Demon Slayer", rank: "SR", attack: 220, defense: 180, quote: "Ugly people shouldn't even exist!", themeColor: "from-pink-500 to-green-500", imageUrl: "/assets/gacha/ds15.png" },
  { id: "ds16", name: "Kokushibo", anime: "Demon Slayer", rank: "UR", attack: 320, defense: 280, quote: "Be thankful for the blood...", themeColor: "from-purple-800 to-black", imageUrl: "/assets/gacha/ds16.png" },
  { id: "ds17", name: "Doma", anime: "Demon Slayer", rank: "SSR", attack: 280, defense: 270, quote: "I just want to save everyone.", themeColor: "from-red-200 to-yellow-100", imageUrl: "/assets/gacha/ds17.png" },
  { id: "ds18", name: "Enmu", anime: "Demon Slayer", rank: "R", attack: 180, defense: 150, quote: "Sleep sweet dreams and die in your nightmare.", themeColor: "from-slate-600 to-slate-800", imageUrl: "/assets/gacha/ds18.png" },
  { id: "ds19", name: "Rui", anime: "Demon Slayer", rank: "SR", attack: 210, defense: 190, quote: "I want a real family.", themeColor: "from-gray-100 to-red-600", imageUrl: "/assets/gacha/ds19.png" },
  { id: "ds20", name: "Murata", anime: "Demon Slayer", rank: "C", attack: 90, defense: 110, quote: "I'm a Demon Slayer too, you know!", themeColor: "from-gray-400 to-gray-500", imageUrl: "/assets/gacha/ds20.png" },

  // ONE PIECE
  { id: "op1", name: "Monkey D. Luffy (Gear 5)", anime: "One Piece", rank: "UR", attack: 350, defense: 300, quote: "This is my peak!", themeColor: "from-amber-200 to-amber-500", imageUrl: "/assets/gacha/op1.png" },
  { id: "op2", name: "Gol D. Roger", anime: "One Piece", rank: "UR", attack: 400, defense: 350, quote: "I left everything I gathered together in one place.", themeColor: "from-red-700 to-yellow-500", imageUrl: "/assets/gacha/op2.png" },
  { id: "op3", name: "Edward Newgate", anime: "One Piece", rank: "UR", attack: 380, defense: 380, quote: "The One Piece is real!", themeColor: "from-yellow-100 to-gray-400", imageUrl: "/assets/gacha/op3.png" },
  { id: "op4", name: "Roronoa Zoro", anime: "One Piece", rank: "SSR", attack: 290, defense: 240, quote: "Nothing happened.", themeColor: "from-green-600 to-green-900", imageUrl: "/assets/gacha/op4.png" },
  { id: "op5", name: "Trafalgar D. Water Law", anime: "One Piece", rank: "SSR", attack: 270, defense: 250, quote: "Room. Shambles.", themeColor: "from-blue-500 to-yellow-400", imageUrl: "/assets/gacha/op5.png" },
  { id: "op6", name: "Portgas D. Ace", anime: "One Piece", rank: "SSR", attack: 280, defense: 200, quote: "Thank you for loving me!", themeColor: "from-orange-500 to-red-600", imageUrl: "/assets/gacha/op6.png" },
  { id: "op7", name: "Yamato", anime: "One Piece", rank: "SSR", attack: 285, defense: 260, quote: "I am Kozuki Oden!", themeColor: "from-cyan-100 to-red-500", imageUrl: "/assets/gacha/op7.png" },
  { id: "op8", name: "Vinsmoke Sanji", anime: "One Piece", rank: "SSR", attack: 275, defense: 230, quote: "I'll never kick a woman.", themeColor: "from-yellow-400 to-blue-600", imageUrl: "/assets/gacha/op8.png" },
  { id: "op9", name: "Nico Robin", anime: "One Piece", rank: "SR", attack: 220, defense: 240, quote: "I want to live!", themeColor: "from-purple-600 to-indigo-900", imageUrl: "/assets/gacha/op9.png" },
  { id: "op10", name: "Franky", anime: "One Piece", rank: "SR", attack: 250, defense: 280, quote: "Suuuuper!", themeColor: "from-cyan-400 to-blue-600", imageUrl: "/assets/gacha/op10.png" },
  { id: "op11", name: "Nami", anime: "One Piece", rank: "R", attack: 155, defense: 140, quote: "What good is treasure if I'm all alone?", themeColor: "from-orange-400 to-yellow-300", imageUrl: "/assets/gacha/op11.png" },
  { id: "op12", name: "Usopp", anime: "One Piece", rank: "R", attack: 140, defense: 120, quote: "I am a brave warrior of the sea!", themeColor: "from-yellow-600 to-green-600", imageUrl: "/assets/gacha/op12.png" },
  { id: "op13", name: "Tony Tony Chopper", anime: "One Piece", rank: "R", attack: 160, defense: 180, quote: "That doesn't make me happy, you jerk!", themeColor: "from-pink-300 to-blue-300", imageUrl: "/assets/gacha/op13.png" },
  { id: "op14", name: "Jinbe", anime: "One Piece", rank: "SR", attack: 260, defense: 270, quote: "You can't bring back what you've lost!", themeColor: "from-blue-600 to-cyan-800", imageUrl: "/assets/gacha/op14.png" },
  { id: "op15", name: "Brook", anime: "One Piece", rank: "SR", attack: 210, defense: 190, quote: "May I see your panties?", themeColor: "from-gray-800 to-black", imageUrl: "/assets/gacha/op15.png" },
  { id: "op16", name: "Buggy the Clown", anime: "One Piece", rank: "C", attack: 120, defense: 100, quote: "I'm going to be the Pirate King!", themeColor: "from-red-500 to-blue-500", imageUrl: "/assets/gacha/op16.png" },
  { id: "op17", name: "Monkey D. Luffy", anime: "One Piece", rank: "SSR", attack: 280, defense: 250, quote: "I'm going to be King of the Pirates!", themeColor: "from-red-500 to-yellow-400", imageUrl: "/assets/gacha/op17.png" },
  { id: "op18", name: "Silvers Rayleigh", anime: "One Piece", rank: "SSR", attack: 330, defense: 300, quote: "Maybe nothing in this world happens by accident.", themeColor: "from-gray-300 to-gray-500", imageUrl: "/assets/gacha/op18.png" }
];

export const GACHA_CARDS = gachaData;

export const getRandomGachaCard = (): GachaCardData => {
  return gachaData[Math.floor(Math.random() * gachaData.length)];
};
