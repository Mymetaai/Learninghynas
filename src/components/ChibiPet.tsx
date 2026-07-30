import { useState, useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Kitsune3D from './Kitsune3D';
import { isGeminiAvailable, getYukiGeminiResponse, type YukiHistoryTurn } from '../utils/geminiService';
import { useStatsStore } from '../state/statsStore';
import { useProgressStore } from '../state/progressStore';
interface Message {
  sender: 'user' | 'pet';
  text: string;
  timestamp: Date;
}

const ChibiPet: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'pet',
      text: "¡Hola! I'm Yuki, your 3D Nine-Tailed Kitsune companion! Let's master Spanish together. Ask me for a 'tip', about 'cards', or just say 'hola'! Dattebayo! 🦊✨",
      timestamp: new Date()
    }
  ]);
  const [history, setHistory] = useState<YukiHistoryTurn[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>("Let's study! 🇪🇸");
  
  // Stable position on the right side
  const [position] = useState(85);
  const [direction] = useState<'left' | 'right'>('left');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

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

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setApiError(null);

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, timestamp: new Date() }
    ]);

    const updatedHistory: YukiHistoryTurn[] = [
      ...history,
      { role: 'user', text: userMsg }
    ];

    setIsTyping(true);

    const stats = useStatsStore.getState();
    const progress = useProgressStore.getState();

    const userState = {
      level: Math.floor((stats.xp || 0) / 1000) + 1,
      streak: stats.streak || 0,
      coins: stats.coins || 0,
      xp: stats.xp || 0,
      region: progress.completedQuestIds?.length > 0 ? `Region ${progress.completedQuestIds.length}` : 'Starting Region',
      tailsCollected: stats.collectedCardIds?.length || 0,
    };

    try {
      const res = await getYukiGeminiResponse(userMsg, history, userState);
      setIsTyping(false);

      if (res.success) {
        const responseText = res.data.text;
        setMessages((prev) => [
          ...prev,
          { sender: 'pet', text: responseText, timestamp: new Date() }
        ]);
        setHistory([
          ...updatedHistory,
          { role: 'model', text: responseText }
        ]);
      } else {
        const errMessage = res.error.message || res.error.code || 'Connection Error';
        setApiError(errMessage);

        const fallbackText = "Hmm, my fox senses are a little foggy right now — try asking again in a moment.";
        setMessages((prev) => [
          ...prev,
          { sender: 'pet', text: fallbackText, timestamp: new Date() }
        ]);
        setHistory([
          ...updatedHistory,
          { role: 'model', text: fallbackText }
        ]);
      }
    } catch (err: any) {
      setIsTyping(false);
      const errMessage = err?.message || 'Connection Error';
      setApiError(errMessage);

      const fallbackText = "Hmm, my fox senses are a little foggy right now — try asking again in a moment.";
      setMessages((prev) => [
        ...prev,
        { sender: 'pet', text: fallbackText, timestamp: new Date() }
      ]);
      setHistory([
        ...updatedHistory,
        { role: 'model', text: fallbackText }
      ]);
    }
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
              className="absolute bottom-28 sm:bottom-32 w-[calc(100vw-32px)] sm:w-80 h-96 bg-[#FAF6F0] rounded-2xl flex flex-col overflow-hidden border-2 border-[#D9BCF2] shadow-2xl pointer-events-auto left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"
              style={{
                left: window.innerWidth > 640 ? `calc(${Math.max(15, Math.min(position, 85))}% - 140px)` : '50%',
                transition: 'left 0.1s ease-out'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#F5A991]/20 via-[#D9BCF2]/20 to-[#A0B392]/20 px-4 py-3 border-b-2 border-[#D9BCF2] flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="h-7 w-7 rounded-full bg-[#FAF6F0] border-2 border-[#2C1E11] flex items-center justify-center text-xs shrink-0 select-none shadow-[0_2px_0_#5C524E]">
                    🦊
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-xs font-bold text-[#2C1E11] shrink-0">Yuki</h3>
                      {apiError ? (
                        <span className="text-[8px] font-mono bg-[#F5A991]/20 text-[#2C1E11] border border-[#F5A991] px-1.5 py-0.5 rounded truncate font-bold" title={apiError}>
                          Offline ({apiError})
                        </span>
                      ) : isGeminiAvailable() ? (
                        <span className="text-[7px] font-hud bg-[#F5A991] text-[#2C1E11] px-1.5 py-0.5 rounded-full border border-[#2C1E11] font-bold shrink-0 shadow-sm">
                          AI
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono bg-[#F5A991]/20 text-[#2C1E11] border border-[#F5A991] px-1.5 py-0.5 rounded truncate font-bold" title="Missing API Key">
                          Offline (No Key)
                        </span>
                      )}
                    </div>
                    <span className="font-hud text-[8px] text-[#8F8683] font-bold tracking-wider uppercase block leading-none mt-0.5">Nine-Tailed Spirit Guide</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#8F8683] hover:text-[#2C1E11] transition-colors cursor-pointer ml-2 shrink-0 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Error Badge Banner */}
              {apiError && (
                <div className="bg-[#F5A991]/15 border-b border-[#F5A991]/30 px-3 py-1.5 text-[10px] text-[#2C1E11] flex items-center justify-between font-mono shrink-0">
                  <span className="truncate" title={apiError}>⚠️ {apiError}</span>
                  <button onClick={() => setApiError(null)} className="text-xs hover:text-[#2C1E11] font-bold cursor-pointer ml-2 shrink-0">&times;</button>
                </div>
              )}

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF6F0] [scrollbar-width:thin] scrollbar-thin scrollbar-thumb-text-tertiary/20 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs font-body whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-[#F5A991] text-[#2C1E11] border-2 border-[#2C1E11] shadow-[0_2px_0_#5C524E] font-semibold rounded-tr-none' 
                        : 'bg-white border-2 border-[#2C1E11] text-[#2C1E11] shadow-[0_2px_0_#5C524E] rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border-2 border-[#2C1E11] rounded-2xl rounded-tl-none px-4 py-3 text-xs text-[#8F8683] flex gap-1 items-center shadow-[0_2px_0_#5C524E]">
                      <span className="h-1.5 w-1.5 bg-[#2C1E11] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-[#2C1E11] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-[#2C1E11] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested quick buttons */}
              <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-[#FAF6F0] border-t border-[#D9BCF2]/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button 
                  onClick={() => { setInputValue('Ser vs Estar'); }}
                  className="text-[10px] font-body bg-[#E8DDF2] hover:bg-[#D9BCF2] border-2 border-[#2C1E11] text-[#2C1E11] px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-bold shadow-[0_2px_0_#5C524E]"
                >
                  Ser vs Estar
                </button>
                <button 
                  onClick={() => { setInputValue('How to earn coins'); }}
                  className="text-[10px] font-body bg-[#E8DDF2] hover:bg-[#D9BCF2] border-2 border-[#2C1E11] text-[#2C1E11] px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-bold shadow-[0_2px_0_#5C524E]"
                >
                  Earn Rewards
                </button>
                <button 
                  onClick={() => { setInputValue('Workbook exam'); }}
                  className="text-[10px] font-body bg-[#E8DDF2] hover:bg-[#D9BCF2] border-2 border-[#2C1E11] text-[#2C1E11] px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-bold shadow-[0_2px_0_#5C524E]"
                >
                  Final Exam
                </button>
              </div>

              {/* Input Footer */}
              <div className="p-3 border-t-2 border-[#D9BCF2] bg-[#FAF6F0] flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Yuki..."
                  className="flex-1 bg-[#F4F9F4] border-2 border-[#A0B392] rounded-xl px-3 py-2 text-xs text-[#2C1E11] font-semibold focus:outline-none focus:border-[#F5A991] placeholder:text-[#8F8683] shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  className="h-9 w-9 rounded-xl bg-[#F5A991] text-[#2C1E11] hover:bg-[#EAA088] border-2 border-[#2C1E11] shadow-[0_2px_0_#5C524E] flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Send className="h-4 w-4" />
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
            <Kitsune3D direction={direction} mode={isOpen ? 'wag' : 'idle'} />
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
