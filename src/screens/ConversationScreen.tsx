import { useState, useRef, useEffect, type FC } from 'react';
import { useCompanionStore } from '../state/companionStore';
import { COMPANIONS } from '../content/companions';
import InkRevealCard from '../components/InkRevealCard';
import { lookupCompanionWord } from '../content/dictionary';
import { useSettingsStore } from '../state/settingsStore';
import { translateToHinglish, translateWordToHinglish } from '../utils/hinglish';
import { 
  Send, 
  Languages, 
  Heart, 
  RefreshCw, 
  PenTool, 
  Sparkles,
  BookMarked
} from 'lucide-react';

const ConversationScreen: FC = () => {
  const { 
    activeCompanionId, 
    conversations, 
    isTyping, 
    setActiveCompanion, 
    sendUserMessage, 
    resetConversations 
  } = useCompanionStore();
  const { language } = useSettingsStore();
  
  const [inputText, setInputText] = useState('');
  const [revealedTranslations, setRevealedTranslations] = useState<Set<string>>(new Set());
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
    pronunciation: string;
  } | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  const activeCompanion = COMPANIONS[activeCompanionId] || COMPANIONS.elena;
  const conversation = conversations[activeCompanionId] || {
    messages: [],
    letterCount: 0,
    friendshipExp: 0,
    friendshipLevel: 1
  };

  // Scroll to bottom on new messages or typing state change
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [conversation.messages, isTyping]);

  const handleSend = (text: string, nextNodeId?: string) => {
    if (!text.trim() || isTyping) return;
    sendUserMessage(activeCompanionId, text.trim(), nextNodeId);
    setInputText('');
  };

  const toggleTranslation = (msgId: string) => {
    setRevealedTranslations((prev) => {
      const next = new Set(prev);
      if (next.has(msgId)) {
        next.delete(msgId);
      } else {
        next.add(msgId);
      }
      return next;
    });
  };

  const handleReset = () => {
    resetConversations();
    setRevealedTranslations(new Set());
    setShowConfirmReset(false);
  };

  const renderCompanionText = (text: string) => {
    const parts = text.split(/(\b\w+\b)/g);
    return (
      <span className="leading-relaxed">
        {parts.map((part, pi) => {
          const entry = lookupCompanionWord(part);
          if (entry) {
            return (
              <button
                key={pi}
                type="button"
                onClick={() => setSelectedWord({
                  word: part,
                  meaning: entry.meaning,
                  pronunciation: entry.pronunciation
                })}
                className="border-b border-dashed border-terracotta/50 hover:bg-terracotta/10 text-ink cursor-pointer font-medium transition-colors"
                title={`Ver traducción de: ${part}`}
              >
                {part}
              </button>
            );
          } else if (part.trim() && /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/.test(part)) {
            return (
              <button
                key={pi}
                type="button"
                onClick={() => setSelectedWord({
                  word: part,
                  meaning: "Please check the full letter translation below (Traducir Carta) for context.",
                  pronunciation: "Pronunciation depends on context."
                })}
                className="hover:bg-pencil/10 text-ink cursor-pointer transition-colors"
                title={`Palabra: ${part}`}
              >
                {part}
              </button>
            );
          }
          return <span key={pi}>{part}</span>;
        })}
      </span>
    );
  };


  // Get the latest companion message to render its quick replies
  const lastCompanionMsg = [...conversation.messages]
    .reverse()
    .find((m) => m.sender === 'companion');

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-body">
      {/* Upper header */}
      <div className="border-b border-pencil/20 bg-bg-base px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-6xl mx-auto">
          <div>
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
              Correspondencia Escrita
            </p>
            <h1 className="font-display text-2xl font-bold text-text-primary">AI Companion</h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-hud text-pencil">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-marigold" /> +10 XP por carta
            </span>
            <span className="flex items-center gap-1">
              <BookMarked className="h-3.5 w-3.5 text-terracotta" /> +5 Monedas por carta
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Companion selection */}
        <section className="lg:col-span-4 space-y-4">
          <h2 className="font-hud text-xs uppercase tracking-wider text-pencil px-1">
            Elige un Compañero
          </h2>

          <div className="space-y-3">
            {Object.values(COMPANIONS).map((comp) => {
              const isActive = comp.id === activeCompanionId;
              const compConv = conversations[comp.id] || { friendshipLevel: 1, friendshipExp: 0 };
              const currentExpNeeded = compConv.friendshipLevel * 100;
              const currentPercent = (compConv.friendshipExp / currentExpNeeded) * 100;

              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveCompanion(comp.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow ${
                    isActive
                      ? 'bg-paper border-terracotta text-ink scale-[1.01] ring-1 ring-terracotta/30'
                      : 'bg-paper/5 border-pencil/20 text-text-primary hover:bg-paper/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={comp.name}>
                      {comp.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-bold text-base truncate">{comp.name}</h3>
                        <span className={`font-hud text-[9px] uppercase px-1.5 py-0.5 rounded ${
                          comp.speed === 'Fácil' 
                            ? 'bg-teal-deep/15 text-teal-deep border border-teal-deep/30'
                            : comp.speed === 'Intermedio'
                              ? 'bg-marigold/15 text-marigold border border-marigold/30'
                              : 'bg-terracotta/15 text-terracotta border border-terracotta/30'
                        } ${isActive ? '' : 'brightness-125'}`}>
                          {comp.speed}
                        </span>
                      </div>
                      <p className={`font-body text-xs mt-0.5 truncate ${isActive ? 'text-pencil' : 'text-pencil/80'}`}>
                        {comp.role}
                      </p>
                    </div>
                  </div>

                  {/* Friendship bar */}
                  <div className="mt-3 pt-3 border-t border-pencil/10">
                    <div className="flex items-center justify-between text-[10px] font-hud mb-1">
                      <span className="flex items-center gap-1">
                        <Heart className={`h-3 w-3 ${isActive ? 'text-terracotta fill-terracotta' : 'text-pencil'}`} />
                        Nivel {compConv.friendshipLevel}
                      </span>
                      <span>{compConv.friendshipExp} / {currentExpNeeded} XP</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isActive ? 'bg-pencil/20' : 'bg-paper/10'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isActive ? 'bg-terracotta' : 'bg-pencil'
                        }`}
                        style={{ width: `${currentPercent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reset Panel */}
          <div className="rounded-xl border border-pencil/25 bg-paper/5 p-4 text-center">
            {showConfirmReset ? (
              <div className="space-y-3">
                <p className="font-body text-xs text-pencil">
                  ¿Seguro? Se borrará todo el historial de cartas.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleReset}
                    className="rounded bg-terracotta hover:bg-terracotta/90 px-3 py-1 font-display text-xs text-text-primary shadow transition-colors cursor-pointer"
                  >
                    Sí, borrar
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="rounded border border-pencil/30 hover:bg-paper/10 px-3 py-1 font-display text-xs text-text-primary transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center justify-center gap-2 mx-auto text-text-secondary hover:text-text-primary font-body text-xs transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reiniciar Historial
              </button>
            )}
          </div>
        </section>

        {/* Right column: Correspondence Board */}
        <section className="lg:col-span-8 flex flex-col h-[70vh] min-h-[500px] border border-structural rounded-2xl overflow-hidden shadow-2xl bg-bg-elevated">
          
          {/* Active Companion Header */}
          <div className="bg-bg-elevated-2 text-text-primary p-4 border-b border-structural flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-hidden="true">
                {activeCompanion.avatar}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold leading-tight">{activeCompanion.name}</h2>
                <p className="font-body text-xs text-text-secondary italic">{activeCompanion.role}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-body text-xs text-accent-action bg-accent-action/10 px-2.5 py-1 rounded-full border border-accent-action/20">
                📬 {conversation.letterCount} cartas
              </span>
            </div>
          </div>

          {/* Letter stack / message history */}
          <div 
            ref={feedRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin]"
            style={{ backgroundImage: 'radial-gradient(rgba(122, 112, 102, 0.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          >
            {conversation.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const showTranslation = revealedTranslations.has(msg.id);

              if (isUser) {
                // User's letter: styled like a quick notebook entry
                return (
                  <div key={msg.id} className="flex justify-end pl-12">
                    <div className="relative max-w-lg bg-bg-elevated-2 border border-structural text-text-primary rounded-lg p-4 shadow-md font-body text-sm border-l-4 border-l-accent-action/60">
                      <div className="absolute top-2 right-2 text-[10px] font-body text-text-secondary/80">
                        {msg.timestamp}
                      </div>
                      
                      <p className="font-body text-[9px] uppercase tracking-wider text-accent-action/80 mb-2">
                        Carta de TheLearningHyena
                      </p>
                      
                      <p className="whitespace-pre-wrap leading-relaxed pr-8">{msg.text}</p>
                    </div>
                  </div>
                );
              } else {
                // Companion's letter: styled like a folded handwritten document
                return (
                  <div key={msg.id} className="flex justify-start pr-12">
                    <div className="relative max-w-xl bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-5 shadow-lg flex flex-col">
                      
                      {/* Postage stamp / postmark decoration */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-80 pointer-events-none select-none">
                        <div className="w-8 h-8 border border-dashed border-structural rounded flex items-center justify-center font-display text-xs text-text-secondary select-none">
                          {activeCompanion.avatar}
                        </div>
                        <div className="w-6 h-6 rounded-full border border-structural border-dashed flex items-center justify-center text-[7px] text-text-secondary font-body rotate-12">
                          REC
                        </div>
                      </div>

                      {/* Header date */}
                      <div className="font-body text-[10px] text-text-secondary mb-3">
                        {msg.timestamp}
                      </div>

                      {/* Salutation */}
                      <p className="font-display italic text-sm font-semibold mb-3 text-text-primary">
                        Estimado TheLearningHyena,
                      </p>

                      {/* Body */}
                      <div className="space-y-3 leading-relaxed text-sm pr-6">
                        <p>{renderCompanionText(msg.text)}</p>
                        
                        {/* Translation block */}
                        {showTranslation && (
                          <div className="mt-3 pt-3 border-t border-[#EFE8D8] text-pencil italic text-xs animate-fadeIn leading-relaxed">
                            {language === 'hinglish' ? translateToHinglish(msg.translation) : msg.translation}
                          </div>
                        )}
                      </div>

                      {/* Closing Sign-off */}
                      {msg.signOff && (
                        <p className="font-display italic text-base text-terracotta text-right mt-4 self-end">
                          — {msg.signOff}
                        </p>
                      )}

                      {/* Translation and assist buttons */}
                      <div className="mt-4 pt-3 border-t border-[#EFE8D8] flex items-center justify-between">
                        <button
                          onClick={() => toggleTranslation(msg.id)}
                          className={`flex items-center gap-1.5 text-[11px] font-hud px-2 py-1 rounded transition-colors cursor-pointer ${
                            showTranslation
                              ? 'bg-terracotta/10 text-terracotta font-semibold'
                              : 'text-pencil hover:text-ink hover:bg-[#F2EADA]'
                          }`}
                        >
                          <Languages className="h-3.5 w-3.5" />
                          {showTranslation ? 'Ocultar Traducción' : 'Traducir Carta'}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              }
            })}

            {/* Simulated typing indicator */}
            {isTyping && (
              <div className="flex justify-start pr-12">
                <div className="bg-[#FAF6EE]/80 border border-[#DDD0B5] rounded-xl p-4 shadow flex items-center gap-2.5">
                  <PenTool className="h-4 w-4 text-pencil animate-bounce" />
                  <span className="font-hud text-xs text-pencil">
                    {activeCompanion.name} está redactando una respuesta...
                  </span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-pencil rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-pencil rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-pencil rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop/Writing Desk drawer input section */}
          <div className="bg-[#FAF6EE] text-ink border-t border-pencil/30 p-4 space-y-4">
            
            {/* Quick replies chips */}
            {lastCompanionMsg && lastCompanionMsg.quickReplies && lastCompanionMsg.quickReplies.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-hud text-[9px] uppercase tracking-wider text-pencil px-1">
                  Respuestas Rápidas Sugeridas (Toca para enviar)
                </p>
                <div className="flex flex-wrap gap-2">
                  {lastCompanionMsg.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(reply.text, reply.nextNodeId)}
                      disabled={isTyping}
                      className="cursor-pointer text-left rounded-lg border border-structural bg-bg-elevated hover:bg-bg-elevated-2 px-3 py-1.5 font-body text-xs text-text-primary transition-all hover:border-accent-action hover:scale-[1.02] shadow-sm flex flex-col group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="font-semibold text-text-primary group-hover:text-accent-action">{reply.text}</span>
                      <span className="text-[10px] text-text-secondary/80 italic">
                        {language === 'hinglish' ? translateToHinglish(reply.translation) : reply.translation}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom message box */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="flex gap-3"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isTyping}
                  placeholder={`Escribe una carta a ${activeCompanion.name} en español...`}
                  className="w-full bg-bg-elevated border border-structural text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-action focus:border-accent-action placeholder:text-text-tertiary disabled:opacity-50"
                />
                <span className="absolute right-3 top-3.5 text-xs opacity-40 pointer-events-none">
                  ✍️
                </span>
              </div>
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-accent-action text-bg-base rounded-xl px-5 py-3 hover:bg-accent-action-hover transition-colors flex items-center justify-center gap-1.5 shadow font-body text-sm font-bold border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" /> Enviar
              </button>
            </form>
          </div>

        </section>

      </div>
      <InkRevealCard
        word={selectedWord?.word ?? ''}
        pronunciation={selectedWord?.pronunciation ?? ''}
        meaning={selectedWord ? (language === 'hinglish' ? translateWordToHinglish(selectedWord.meaning) : selectedWord.meaning) : ''}
        visible={selectedWord !== null}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
};

export default ConversationScreen;
