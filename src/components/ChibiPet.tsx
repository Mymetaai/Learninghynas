import { useState, useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Witch3D from './Witch3D';

interface Message {
  sender: 'user' | 'pet';
  text: string;
  timestamp: Date;
}

const NARRATIVE_RESPONSES = {
  hello: "¡Hola! I am Luna, your 3D Dark Witch companion! Ready to cast some Spanish learning spells today? Dattebayo! 🧙‍♀️✨",
  greet: "¡Hola! Ready to train your Spanish? Let's level up together, believe it! 🌟",
  tip: "Witchy Study Tip: Repetition is like brewing a perfect potion. Check out 'Training Grounds' to review your weak spots! 🧪",
  cards: "Unlocking legendary Demon Slayer cards is like mastering a high-level magic spell! Keep completing quests and check the Shop! ⚔️",
  spanish: "Spanish is magical! For example, 'amigo' means friend, and 'fuego' means fire (perfect for casting fire spells!). 🔥",
  default: "Dattebayo! Keep practicing every day. You're building a massive reserve of learning mana! Ask me for a 'tip', about 'cards', or 'Spanish'!"
};

const ChibiPet: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'pet',
      text: "¡Hola! I'm Luna, your 3D Dark Witch companion! Let's master Spanish together. Ask me for a 'tip', about 'cards', or just say 'hola'! Dattebayo! 🧙‍♀️✨",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>("Let's study! 🇪🇸");
  
  // Roaming states
  const [position, setPosition] = useState(80); // percentage (starts near bottom-right)
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Roaming Loop (witch walks left and right across the screen)
  useEffect(() => {
    if (isOpen) return; // Freeze roaming when chat is open

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
    }, 40); // 40ms interval for extremely smooth walking

    return () => clearInterval(interval);
  }, [direction, isOpen]);

  // Periodic random speech bubble texts
  useEffect(() => {
    const speechOptions = [
      "Let's practice Spanish! 🇪🇸",
      "Cast a learning spell! 🪄",
      "Have you checked your weak spots today? 🎯",
      "Brew some study potions! 🧪",
      "Check out the 3D gold coins! 🪙"
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
      let reply = NARRATIVE_RESPONSES.default;
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('hola') || lowerMsg.includes('hello') || lowerMsg.includes('greet') || lowerMsg.includes('hi')) {
        reply = NARRATIVE_RESPONSES.hello;
      } else if (lowerMsg.includes('tip') || lowerMsg.includes('advice') || lowerMsg.includes('study')) {
        reply = NARRATIVE_RESPONSES.tip;
      } else if (lowerMsg.includes('card') || lowerMsg.includes('shop') || lowerMsg.includes('demon slayer') || lowerMsg.includes('one piece')) {
        reply = NARRATIVE_RESPONSES.cards;
      } else if (lowerMsg.includes('spanish') || lowerMsg.includes('language') || lowerMsg.includes('espanol')) {
        reply = NARRATIVE_RESPONSES.spanish;
      }

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
        
        {/* Chat Window Panel (floats above the current x position of the pet) */}
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
              <div className="bg-gradient-to-r from-terracotta/20 via-marigold/10 to-teal-deep/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-paper/10 flex items-center justify-center text-xs shrink-0 select-none">
                    🧙‍♀️
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold text-paper">Luna</h3>
                    <span className="font-hud text-[8px] text-teal-deep font-semibold tracking-wider uppercase block leading-none">Dark Witch Guide</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-pencil hover:text-paper transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 [scrollbar-width:thin] scrollbar-thin scrollbar-thumb-pencil/20 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-body ${
                      msg.sender === 'user' 
                        ? 'bg-terracotta/20 border border-terracotta/30 text-paper rounded-tr-none' 
                        : 'bg-paper/5 border border-white/5 text-paper/90 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-paper/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-pencil flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 bg-pencil rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-pencil rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-pencil rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested quick buttons */}
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button 
                  onClick={() => { setInputValue('Give me a study tip'); }}
                  className="text-[9px] font-hud bg-paper/5 hover:bg-paper/10 border border-white/10 text-pencil hover:text-paper px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  💡 Study Tip
                </button>
                <button 
                  onClick={() => { setInputValue('Tell me about cards'); }}
                  className="text-[9px] font-hud bg-paper/5 hover:bg-paper/10 border border-white/10 text-pencil hover:text-paper px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  ⚔️ Collectibles
                </button>
                <button 
                  onClick={() => { setInputValue('Spanish magic style'); }}
                  className="text-[9px] font-hud bg-paper/5 hover:bg-paper/10 border border-white/10 text-pencil hover:text-paper px-2.5 py-1 rounded-full cursor-pointer shrink-0 transition-colors"
                >
                  🔥 Spanish
                </button>
              </div>

              {/* Input Footer */}
              <div className="p-3 border-t border-white/10 bg-ink/40 flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Luna..."
                  className="flex-1 bg-paper/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-paper focus:outline-none focus:border-pencil/40 placeholder-pencil/50"
                />
                <button 
                  onClick={handleSend}
                  className="h-8 w-8 rounded-xl bg-terracotta/20 border border-terracotta/30 text-terracotta flex items-center justify-center hover:bg-terracotta/30 transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Pet Wrapper (moves edge-to-edge horizontally) */}
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
                className="bg-[#FAF6EE] text-ink font-body text-[10px] font-semibold px-3 py-2 rounded-xl rounded-br-none shadow-lg border border-[#DDD0B5] max-w-[145px] relative select-none shrink-0"
              >
                {bubbleText}
                <div className="absolute right-0 bottom-[-5px] w-2 h-2 bg-[#FAF6EE] border-r border-b border-[#DDD0B5] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Witch Character Wrapper */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            onClick={() => setIsOpen(!isOpen)}
            className="h-28 w-28 cursor-pointer drop-shadow-[0_8px_20px_rgba(130,50,240,0.5)] hover:drop-shadow-[0_12px_32px_rgba(130,50,240,0.7)] transition-all duration-300 relative select-none shrink-0"
          >
            <Witch3D direction={direction} isWalking={!isOpen} />
            {/* Notification bubble if there is a pending tip */}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marigold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-marigold"></span>
              </span>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ChibiPet;
