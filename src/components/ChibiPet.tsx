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
              className="absolute bottom-32 w-80 h-96 glass-surface rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl pointer-events-auto"
              style={{ 
                left: `calc(${position}% - 140px)`,
                transition: 'left 0.1s ease-out'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-accent-action/10 via-info/10 to-success/10 px-4 py-3 border-b border-structural flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="h-6 w-6 rounded-full bg-bg-elevated-2 flex items-center justify-center text-xs shrink-0 select-none">
                    🦊
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-body text-xs font-semibold text-text-primary shrink-0">Yuki</h3>
                      {apiError ? (
                        <span className="text-[8px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded truncate font-bold" title={`AI Disconnected: ${apiError}`}>
                          AI Disconnected: {apiError}
                        </span>
                      ) : isGeminiAvailable() ? (
                        <span className="text-[7px] font-hud bg-accent-action/25 text-accent-action px-1 rounded border border-accent-action/30 animate-pulse font-bold shrink-0">
                          AI
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded truncate font-bold" title="AI Disconnected: Missing API Key">
                          AI Disconnected: Missing API Key
                        </span>
                      )}
                    </div>
                    <span className="font-body text-[8px] text-text-secondary font-semibold tracking-wider uppercase block leading-none mt-0.5">Nine-Tailed Guide</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer ml-2 shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Error Badge Banner */}
              {apiError && (
                <div className="bg-red-500/15 border-b border-red-500/30 px-3 py-1.5 text-[10px] text-red-300 flex items-center justify-between font-mono shrink-0">
                  <span className="truncate">AI Disconnected: {apiError}</span>
                  <button onClick={() => setApiError(null)} className="text-xs hover:text-white font-bold cursor-pointer ml-2 shrink-0">&times;</button>
                </div>
              )}

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
