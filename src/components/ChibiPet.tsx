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
      text: "¡Hola! I'm Yuki, your executive Spanish language advisor. I'm here to accelerate your fluency with tailored grammar insights and daily immersion strategy.",
      timestamp: new Date()
    }
  ]);
  const [history, setHistory] = useState<YukiHistoryTurn[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>("Executive Spanish Strategy 🇪🇸");
  
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
      "¡Hola! Ready for executive Spanish strategy? 🇪🇸",
      "Review Ser vs. Estar nuances ⚖️",
      "Track your executive daily goals 🎯",
      "Analyze vocabulary progress & insights 💡",
      "Accelerating your Spanish fluency ⚡"
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

        const fallbackText = "I'm temporarily experiencing connectivity issues. Please try asking again in a moment.";
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

      const fallbackText = "I'm temporarily experiencing connectivity issues. Please try asking again in a moment.";
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
              className="absolute bottom-28 sm:bottom-32 w-[calc(100vw-32px)] sm:w-80 h-96 bg-[#0F172A]/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-2xl flex flex-col overflow-hidden pointer-events-auto left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"
              style={{
                left: window.innerWidth > 640 ? `calc(${Math.max(15, Math.min(position, 85))}% - 140px)` : '50%',
                transition: 'left 0.1s ease-out'
              }}
            >
              {/* Header */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="relative flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm shrink-0 select-none shadow-md">
                      🦊
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-xs font-bold text-slate-100 truncate">
                        Yuki — Executive AI Companion / Senior Language Advisor
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="inline-flex items-center gap-1 text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        EXECUTIVE SPANISH STRATEGIST
                      </span>
                      {apiError ? (
                        <span className="text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded truncate font-bold" title={apiError}>
                          Offline ({apiError})
                        </span>
                      ) : isGeminiAvailable() ? (
                        <span className="text-[7px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/40 font-bold shrink-0 shadow-xs">
                          AI ONLINE
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded truncate font-bold" title="Missing API Key">
                          Offline (No Key)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer ml-2 shrink-0 p-1"
                  aria-label="Close Advisor"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Error Badge Banner */}
              {apiError && (
                <div className="bg-amber-500/10 border-b border-amber-500/30 px-3 py-1.5 text-[10px] text-amber-300 flex items-center justify-between font-mono shrink-0">
                  <span className="truncate" title={apiError}>⚠️ {apiError}</span>
                  <button onClick={() => setApiError(null)} className="text-xs hover:text-amber-100 font-bold cursor-pointer ml-2 shrink-0">&times;</button>
                </div>
              )}

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60 [scrollbar-width:thin] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-sans whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-amber-600/90 text-amber-50 border border-amber-500/50 shadow-md font-semibold rounded-tr-none' 
                        : 'bg-slate-800/90 border border-slate-700 text-slate-100 shadow-md rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/90 border border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex gap-1 items-center shadow-md">
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested quick buttons */}
              <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-slate-900/80 border-t border-slate-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button 
                  onClick={() => { setInputValue('Ser vs Estar nuances'); }}
                  className="text-[10px] font-sans bg-amber-600/90 hover:bg-amber-500 border border-amber-500/50 text-white px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-semibold shadow-sm"
                >
                  Ser vs Estar
                </button>
                <button 
                  onClick={() => { setInputValue('Executive daily strategy'); }}
                  className="text-[10px] font-sans bg-amber-600/90 hover:bg-amber-500 border border-amber-500/50 text-white px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-semibold shadow-sm"
                >
                  Daily Strategy
                </button>
                <button 
                  onClick={() => { setInputValue('Fluency assessment insights'); }}
                  className="text-[10px] font-sans bg-amber-600/90 hover:bg-amber-500 border border-amber-500/50 text-white px-3 py-1 rounded-full cursor-pointer shrink-0 transition-all font-semibold shadow-sm"
                >
                  Fluency Insights
                </button>
              </div>

              {/* Input Footer */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Yuki..."
                  className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-amber-500 placeholder:text-slate-500 shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  className="h-9 w-9 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-white border border-amber-500/50 shadow-md flex items-center justify-center transition-all cursor-pointer shrink-0"
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
                className="bg-slate-800/90 text-slate-200 font-sans text-[10px] font-semibold px-3 py-2 rounded-xl rounded-br-none shadow-xl border border-slate-700 max-w-[160px] relative select-none shrink-0 backdrop-blur-md"
              >
                {bubbleText}
                <div className="absolute right-0 bottom-[-5px] w-2 h-2 bg-slate-800/90 border-r border-b border-slate-700 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Kitsune Character Wrapper */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            onClick={() => setIsOpen(!isOpen)}
            className="h-28 w-28 cursor-pointer drop-shadow-sm hover:drop-shadow-sm transition-all duration-300 relative select-none shrink-0"
          >
            <Kitsune3D direction={direction} mode={isOpen ? 'wag' : 'idle'} />
            {/* Notification bubble if there is a pending tip - positioned lower relative to the fox geometry */}
            {!isOpen && (
              <span className="absolute top-12 right-2 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ChibiPet;
