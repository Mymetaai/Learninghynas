import { useState, useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Kitsune3D from './Kitsune3D';

interface Message {
  sender: 'user' | 'pet';
  text: string;
  timestamp: Date;
}

// Comprehensive response matcher covering academy features, workbook data, and Spanish grammar tips
const getYukiResponse = (input: string): string => {
  const query = input.toLowerCase().trim();

  // 1. GREETINGS & WHO IS YUKI
  if (query.includes('hola') || query.includes('hello') || query.includes('hi') || query.includes('greet')) {
    return "¡Hola, amigo! I'm Yuki, your 3D Nine-Tailed Kitsune spirit guide! 🦊✨ I'm here to help you master Spanish and navigate this academy. How can I help you train today? Dattebayo!";
  }
  if (query.includes('who are you') || query.includes('what are you') || query.includes('yuki') || query.includes('kitsune') || query.includes('fox')) {
    return "I am Yuki, a legendary Nine-Tailed Kitsune! I'm your loyal study companion. When we chat, I wag my tails because I'm excited about your progress! Ask me anything about Spanish or how to use this app! 🦊💙";
  }

  // 2. REWARDS: COINS & XP
  if (query.includes('coin') || query.includes('gold') || query.includes('xp') || query.includes('earn') || query.includes('reward')) {
    return "You can earn Gold Coins and XP by: \n1. Completing interactive drills in 'Basic Español'.\n2. Passing the Course Exam (rewards up to 50 coins!).\n3. Finishing quests in the 'Daily Quests' menu (click the calendar icon in the top right!). 🪙✨";
  }
  if (query.includes('daily') || query.includes('quest') || query.includes('calendar') || query.includes('task')) {
    return "Daily Quests reset every day! Click the checklist icon in the top right header to see your active tasks (e.g. practicing pronunciation, completing a lesson, or maintaining your streak) and claim your rewards! 📅🎯";
  }

  // 3. SHOP & CARDS
  if (query.includes('shop') || query.includes('card') || query.includes('collectible') || query.includes('buy') || query.includes('unlock') || query.includes('one piece') || query.includes('demon slayer')) {
    return "In the Shop, you can spend your earned gold coins to unlock legendary cards from One Piece and Demon Slayer! Complete quests to earn coins, then expand your deck! ⚔️🏴‍☠️";
  }

  // 4. SPANISH LESSONS (Workbook-Aligned Data!)
  if (query.includes('lesson 1') || query.includes('alphabet') || query.includes('pronunciation') || query.includes('greeting')) {
    return "Lesson 1 covers Spanish Pronunciation & Greetings. Key tips: \n• 'H' is always silent (like in 'hola'). \n• 'Ñ' sounds like 'ny' in canyon. \n• 'Buenos días' = Good morning. \n• '¿Cómo estás?' = How are you? 🗣️";
  }
  if (query.includes('lesson 2') || query.includes('pronoun') || query.includes('subject')) {
    return "Lesson 2 covers Subject Pronouns: Yo (I), Tú (you, informal), Él/Ella (he/she), Nosotros (we), Vosotros (you all, Spain), and Ellos/Ellas (they). Master these to start forming sentences! 👥";
  }
  if (query.includes('ser') || query.includes('estar') || query.includes('to be')) {
    return "Ah, the golden rule of Spanish! Both mean 'To Be', but:\n• SER: Used for permanent qualities (D.O.C.T.O.R: Description, Occupation, Characteristics, Time, Origin, Relation).\n• ESTAR: Used for temporary states/locations (P.L.A.C.E: Position, Location, Action, Condition, Emotion). ⚖️";
  }
  if (query.includes('lesson 3') || query.includes('noun') || query.includes('article') || query.includes('gender')) {
    return "Lesson 3 covers Nouns & Articles. All nouns are Masculine (use 'el' / 'un') or Feminine (use 'la' / 'una'). Usually, nouns ending in -o are masculine (el libro) and -a are feminine (la mesa). 📚";
  }
  if (query.includes('lesson 4') || query.includes('phrase') || query.includes('simple sentence') || query.includes('sentence')) {
    return "Lesson 4 teaches you to build Everyday Sentences! For example: 'Yo hablo español' (I speak Spanish) or '¿Dónde está el baño?' (Where is the bathroom?). Keep it subject-verb-object! 💬";
  }
  if (query.includes('exam') || query.includes('test') || query.includes('quiz')) {
    return "The Workbook Exam is at the bottom of the 'Basic Español' screen. It contains 8 interactive questions summarizing the entire workbook. Scoring 100% awards you 50 coins and a legendary achievement badge! 🏆📝";
  }

  // 5. APP NAVIGATION & TABS
  if (query.includes('dashboard') || query.includes('home') || query.includes('stats')) {
    return "The Dashboard (1st tab) is your command center! Here you can check your weekly study hours, current streak, active quests, and see your overall academy rank. Keep an eye on it to track your progress! 📊";
  }
  if (query.includes('basic espanol') || query.includes('espanol') || query.includes('course') || query.includes('workbook')) {
    return "The 'Basic Español' tab contains 4 complete lessons based on the course workbook: alphabet/greetings, pronouns, articles, and phrases. Complete drills there to earn coins! 📖✨";
  }
  if (query.includes('adventure') || query.includes('map') || query.includes('world')) {
    return "The 'Adventure Map' lets you embark on learning quests across different worlds! Complete lessons to unlock nodes, defeat bosses, and advance your Spanish journey! 🗺️⚔️";
  }
  if (query.includes('why us') || query.includes('pitch') || query.includes('about')) {
    return "The 'Why Us' tab showcases what makes our academy unique: our beautiful Glassmorphic interface, interactive 3D elements (like me!), gamified rewards, and workbook-aligned materials! 🌟💎";
  }

  // 6. NARRATIVE STUDY TIPS
  if (query.includes('tip') || query.includes('advice') || query.includes('help') || query.includes('study')) {
    const tips = [
      "Kitsune Tip: Try speaking Spanish words out loud! Pronouncing them helps cement the neural pathways in your brain. 🗣️",
      "Kitsune Tip: Don't rush! Spend 10 minutes a day on the 'Basic Español' drills rather than 1 hour all at once. Consistency is key! 📅",
      "Kitsune Tip: Use the Shop cards as motivation. Tell yourself: 'If I finish this lesson, I'll buy a One Piece card!' 🏴‍☠️",
      "Kitsune Tip: Review Lesson 2's Ser vs Estar differences—it's the most common mistake for beginners! ⚖️"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  // DEFAULT FALLBACK
  return "Dattebayo! I'm not fully sure about that spell. You can ask me about 'Lesson 1', 'Ser vs Estar', 'how to earn coins', 'how the Shop works', or for a 'study tip'! I'm here to help you guide your learning chakra! 🦊🌀";
};

const ChibiPet: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'pet',
      text: "¡Hola! I'm Yuki, your 3D Nine-Tailed Kitsune companion! Let's master Spanish together. Ask me for a 'tip', about 'cards', or just say 'hola'! Dattebayo! 🦊✨",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>("Let's study! 🇪🇸");
  
  // Roaming states
  const [position, setPosition] = useState(80);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Roaming Loop (fox walks left and right across the screen)
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (direction === 'right') {
          if (prev >= 90) {
            setDirection('left');
            return prev - 0.25;
          }
          return prev + 0.25;
        } else {
          if (prev <= 10) {
            setDirection('right');
            return prev + 0.25;
          }
          return prev - 0.25;
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, [direction, isOpen]);

  // Periodic random speech bubble texts
  useEffect(() => {
    const speechOptions = [
      "Let's practice Spanish! 🇪🇸",
      "Ask me about Ser vs Estar! ⚖️",
      "Have you checked your daily tasks? 🎯",
      "Need a study tip? 💡",
      "Wagging my tails for you! 🦊"
    ];

    const interval = setInterval(() => {
      if (!isOpen) {
        const randomText = speechOptions[Math.floor(Math.random() * speechOptions.length)];
        setBubbleText(randomText);
        setTimeout(() => setBubbleText(null), 5000);
      }
    }, 18000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, timestamp: new Date() }
    ]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getYukiResponse(userMsg);
      setMessages((prev) => [
        ...prev,
        { sender: 'pet', text: reply, timestamp: new Date() }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '440px' }}
    >
      <div className="relative w-full h-full max-w-7xl mx-auto px-4">
        
        {/* Chat Window Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-32 w-80 h-96 glass-surface rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl pointer-events-auto"
              style={{ 
                left: `calc(${position}% - 140px)`,
                transition: 'left 0.1s ease-out'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-accent-action/10 via-info/10 to-success/10 px-4 py-3 border-b border-structural flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-bg-elevated-2 flex items-center justify-center text-xs shrink-0 select-none">
                    🦊
                  </div>
                  <div>
                    <h3 className="font-body text-xs font-semibold text-text-primary">Yuki</h3>
                    <span className="font-body text-[8px] text-text-secondary font-semibold tracking-wider uppercase block leading-none mt-0.5">Nine-Tailed Guide</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 [scrollbar-width:thin] scrollbar-thin scrollbar-thumb-text-tertiary/20 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-body whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-accent-action/15 border border-accent-action/30 text-text-primary rounded-tr-none' 
                        : 'bg-bg-elevated border border-structural text-text-primary/95 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-bg-elevated border border-structural rounded-2xl rounded-tl-none px-4 py-3 text-xs text-text-secondary flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested quick buttons */}
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button 
                  onClick={() => { setInputValue('Ser vs Estar'); }}
                  className="text-[9px] font-body bg-bg-elevated hover:bg-bg-elevated-2 border border-structural text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  ⚖️ Ser vs Estar
                </button>
                <button 
                  onClick={() => { setInputValue('How to earn coins'); }}
                  className="text-[9px] font-body bg-bg-elevated hover:bg-bg-elevated-2 border border-structural text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  🪙 Earn Rewards
                </button>
                <button 
                  onClick={() => { setInputValue('Workbook exam'); }}
                  className="text-[9px] font-body bg-bg-elevated hover:bg-bg-elevated-2 border border-structural text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  📝 Final Exam
                </button>
              </div>

              {/* Input Footer */}
              <div className="p-3 border-t border-structural bg-bg-base/40 flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Yuki..."
                  className="flex-1 bg-bg-elevated border border-structural rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-text-secondary/40 placeholder-text-tertiary"
                />
                <button 
                  onClick={handleSend}
                  className="h-8 w-8 rounded-xl bg-accent-action text-bg-base flex items-center justify-center hover:bg-accent-action-hover transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Pet Wrapper */}
        <div 
          className="absolute bottom-0 flex items-center gap-3 pointer-events-auto"
          style={{ 
            left: `${position}%`,
            transform: 'translateX(-50%)',
            transition: isOpen ? 'none' : 'left 0.04s linear'
          }}
        >
          {/* Speech Bubble */}
          <AnimatePresence>
            {bubbleText && !isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="bg-bg-elevated text-text-primary font-body text-[10px] font-semibold px-3 py-2 rounded-xl rounded-br-none shadow-lg border border-structural max-w-[145px] relative select-none shrink-0"
              >
                {bubbleText}
                <div className="absolute right-0 bottom-[-5px] w-2 h-2 bg-bg-elevated border-r border-b border-structural rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Kitsune Character Wrapper */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            onClick={() => setIsOpen(!isOpen)}
            className="h-28 w-28 cursor-pointer drop-shadow-[0_8px_20px_rgba(74,151,242,0.3)] hover:drop-shadow-[0_12px_32px_rgba(74,151,242,0.5)] transition-all duration-300 relative select-none shrink-0"
          >
            <Kitsune3D direction={direction} mode={isOpen ? 'wag' : 'walk'} />
            {/* Notification bubble if there is a pending tip - positioned lower relative to the fox geometry */}
            {!isOpen && (
              <span className="absolute top-12 right-2 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-action opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent-action"></span>
              </span>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ChibiPet;
