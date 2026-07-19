import { useState, useRef, useEffect, type FC } from 'react';
import { useCompanionStore } from '../state/companionStore';
import { COMPANIONS } from '../content/companions';
import { SCENARIOS } from '../content/scenarios';
import { useScenarioStore } from '../state/scenarioStore';
import InkRevealCard from '../components/InkRevealCard';
import { lookupCompanionWord } from '../content/dictionary';
import { useSettingsStore } from '../state/settingsStore';
import { translateToHinglish, translateWordToHinglish } from '../utils/hinglish';
import { isGeminiAvailable } from '../utils/geminiService';
import { 
  Send, 
  Languages, 
  Heart, 
  RefreshCw, 
  PenTool, 
  Sparkles,
  BrainCircuit,
  Compass,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  BookCheck,
  Target
} from 'lucide-react';

const ConversationScreen: FC = () => {
  // Mode selection: 'scenarios' | 'classic'
  const [tabMode, setTabMode] = useState<'scenarios' | 'classic'>('scenarios');

  // Scenario Store
  const {
    activeScenarioId,
    conversations: scenarioConversations,
    isTyping: isScenarioTyping,
    selectScenario,
    backToSelection,
    sendUserMessage: sendScenarioMessage,
    restartScenario,
    addLearnedWord
  } = useScenarioStore();

  // Classic Companion Store
  const { 
    activeCompanionId, 
    conversations: classicConversations, 
    isTyping: isClassicTyping, 
    setActiveCompanion, 
    sendUserMessage: sendClassicMessage, 
    resetConversations: resetClassicConversations 
  } = useCompanionStore();

  const { language } = useSettingsStore();
  
  const [inputText, setInputText] = useState('');
  const [revealedTranslations, setRevealedTranslations] = useState<Set<string>>(new Set());
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showLearnedWordsModal, setShowLearnedWordsModal] = useState(false);

  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
    pronunciation: string;
  } | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  // Active Scenario object & active conversation
  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId);
  const activeScenarioConv = activeScenarioId ? scenarioConversations[activeScenarioId] : null;

  // Active Classic Companion
  const activeCompanion = COMPANIONS[activeCompanionId] || COMPANIONS.elena;
  const activeClassicConv = classicConversations[activeCompanionId] || {
    messages: [],
    letterCount: 0,
    friendshipExp: 0,
    friendshipLevel: 1
  };

  const isTyping = tabMode === 'scenarios' ? isScenarioTyping : isClassicTyping;

  // Auto-scroll feed on new messages
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [activeScenarioConv?.messages, activeClassicConv?.messages, isTyping]);

  const handleSendScenario = (text: string) => {
    if (!text.trim() || isScenarioTyping || !activeScenario) return;
    sendScenarioMessage(activeScenario, text.trim());
    setInputText('');
  };

  const handleSendClassic = (text: string, nextNodeId?: string) => {
    if (!text.trim() || isClassicTyping) return;
    sendClassicMessage(activeCompanionId, text.trim(), nextNodeId);
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

  const renderInteractiveSpanishText = (text: string, newVocab?: { word: string; meaning: string }[]) => {
    const parts = text.split(/(\b\w+\b)/g);
    return (
      <span className="leading-relaxed">
        {parts.map((part, pi) => {
          const lowerPart = part.toLowerCase();
          const vocabMatch = newVocab?.find((v) => v.word.toLowerCase() === lowerPart);
          const dictEntry = lookupCompanionWord(part);

          if (vocabMatch) {
            return (
              <button
                key={pi}
                type="button"
                onClick={() => {
                  if (activeScenarioId) {
                    addLearnedWord(activeScenarioId, vocabMatch.word, vocabMatch.meaning);
                  }
                  setSelectedWord({
                    word: vocabMatch.word,
                    meaning: `${vocabMatch.meaning} (Nueva palabra clave del escenario)`,
                    pronunciation: 'Escenario recomendado'
                  });
                }}
                className="inline-flex items-center gap-0.5 bg-emerald-500/15 border-b-2 border-emerald-500 text-emerald-800 font-bold px-1 py-0.5 rounded hover:bg-emerald-500/25 cursor-pointer transition-colors"
                title={`Nueva palabra: ${vocabMatch.word} (${vocabMatch.meaning})`}
              >
                {part} ✨
              </button>
            );
          } else if (dictEntry) {
            return (
              <button
                key={pi}
                type="button"
                onClick={() => setSelectedWord({
                  word: part,
                  meaning: dictEntry.meaning,
                  pronunciation: dictEntry.pronunciation
                })}
                className="border-b border-dashed border-accent-action/50 hover:bg-accent-action/10 text-text-primary cursor-pointer font-medium transition-colors"
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
                  meaning: "Presiona 'Traducir Carta' abajo para ver el significado en contexto.",
                  pronunciation: "Pronunciación estándar en español."
                })}
                className="hover:bg-structural/30 text-text-primary cursor-pointer transition-colors"
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

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-body pb-12">
      
      {/* Upper Mode Header */}
      <div className="border-b border-structural bg-bg-base/80 backdrop-blur-md px-4 py-4 sm:px-6 sticky top-0 z-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-hud text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Conversación interactiva con IA
              </span>
              {isGeminiAvailable() && (
                <span className="flex items-center gap-1 bg-accent-action/10 text-accent-action px-2 py-0.5 rounded-full text-[10px] font-hud border border-accent-action/25 animate-pulse">
                  <BrainCircuit className="h-3 w-3" /> Gemini 3.5
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl font-bold text-text-primary">AI Companion</h1>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-bg-elevated p-1 rounded-xl border border-structural shadow-sm">
            <button
              onClick={() => setTabMode('scenarios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                tabMode === 'scenarios'
                  ? 'bg-accent-action text-bg-base shadow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Compass className="h-4 w-4" /> Escenarios Reales (15 Temas)
            </button>
            <button
              onClick={() => setTabMode('classic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                tabMode === 'classic'
                  ? 'bg-accent-action text-bg-base shadow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen className="h-4 w-4" /> Amigos por Carta
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6">

        {/* ----------------- MODE 1: SCENARIOS (15 TOPICS) ----------------- */}
        {tabMode === 'scenarios' && (
          <>
            {/* SCENARIO SELECTION GRID VIEW */}
            {!activeScenarioId || !activeScenario ? (
              <div className="space-y-6">
                <div className="bg-bg-elevated border border-structural rounded-2xl p-6 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Compass className="w-48 h-48 text-accent-action" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-text-primary mb-1">
                    🎯 Elige un Escenario de la Vida Real
                  </h2>
                  <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
                    Practica español conversacional con un personaje impulsado por IA en 15 situaciones cotidianas. 
                    Gana XP, aprende vocabulario en contexto y recibe correcciones amables en tiempo real.
                  </p>
                </div>

                {/* 15 Scenarios Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SCENARIOS.map((scen) => {
                    const session = scenarioConversations[scen.id];
                    const msgCount = session ? session.messages.length : 0;
                    const learnedCount = session ? session.learnedWords.length : 0;

                    return (
                      <div
                        key={scen.id}
                        className="bg-bg-elevated border border-structural hover:border-accent-action/50 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Header badges */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-hud text-[10px] font-bold text-text-tertiary bg-bg-elevated-2 px-2 py-0.5 rounded border border-structural">
                              Tema #{scen.topicNumber}
                            </span>
                            <span className={`font-hud text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              scen.cefr === 'A1'
                                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                            }`}>
                              Nivel CEFR {scen.cefr}
                            </span>
                          </div>

                          {/* Icon & Title */}
                          <div className="flex items-start gap-3 mb-3">
                            <span className="text-3xl p-2 bg-bg-elevated-2 rounded-xl border border-structural shadow-inner group-hover:scale-110 transition-transform">
                              {scen.icon}
                            </span>
                            <div>
                              <h3 className="font-display text-base font-bold text-text-primary leading-snug group-hover:text-accent-action transition-colors">
                                {scen.title}
                              </h3>
                              <p className="font-body text-xs text-text-secondary mt-0.5">
                                {scen.characterName} • <span className="italic">{scen.characterRole}</span>
                              </p>
                            </div>
                          </div>

                          {/* Goal */}
                          <div className="bg-bg-elevated-2/80 rounded-xl p-3 border border-structural/60 mb-4">
                            <p className="text-[11px] text-text-secondary font-medium flex items-center gap-1.5">
                              <Target className="h-3.5 w-3.5 text-accent-action shrink-0" />
                              <span><strong className="text-text-primary">Meta:</strong> {scen.goal}</span>
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-3 border-t border-structural flex items-center justify-between gap-2">
                          <div className="text-[10px] font-hud text-text-tertiary">
                            {session ? (
                              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                                <CheckCircle2 className="h-3 w-3" /> {msgCount} msgs • {learnedCount} palabras
                              </span>
                            ) : (
                              <span>Sin iniciar</span>
                            )}
                          </div>

                          <button
                            onClick={() => selectScenario(scen.id)}
                            className="bg-accent-action hover:bg-accent-action-hover text-bg-base rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md cursor-pointer border-none flex items-center gap-1 group-hover:translate-x-1"
                          >
                            {session ? 'Continuar →' : 'Iniciar →'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ACTIVE SCENARIO CHAT VIEW */
              <div className="flex flex-col h-[75vh] min-h-[550px] border border-structural rounded-2xl overflow-hidden shadow-2xl bg-bg-elevated">
                
                {/* Active Scenario Header Bar */}
                <div className="bg-bg-elevated-2 p-4 border-b border-structural flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={backToSelection}
                      className="p-2 rounded-xl bg-bg-elevated border border-structural text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-colors cursor-pointer"
                      title="Volver a los 15 escenarios"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="text-3xl">{activeScenario.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-lg font-bold text-text-primary leading-tight">
                          {activeScenario.title}
                        </h2>
                        <span className="text-[10px] font-hud font-bold px-2 py-0.5 rounded-full bg-accent-action/10 text-accent-action border border-accent-action/20">
                          {activeScenario.cefr}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        Hablando con <strong>{activeScenario.characterName}</strong> ({activeScenario.characterRole})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setShowLearnedWordsModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors cursor-pointer"
                    >
                      <BookCheck className="h-4 w-4 text-emerald-600" />
                      <span>{activeScenarioConv?.learnedWords.length || 0} Aprendidas</span>
                    </button>

                    <button
                      onClick={() => restartScenario(activeScenario)}
                      className="p-2 rounded-xl border border-structural text-text-tertiary hover:text-accent-action hover:bg-bg-elevated transition-colors cursor-pointer"
                      title="Reiniciar esta conversación"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Scenario Goal Banner */}
                <div className="bg-accent-action/5 px-4 py-2 border-b border-accent-action/15 flex items-center justify-between text-xs text-text-secondary font-medium">
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-accent-action" />
                    <span><strong>Objetivo del escenario:</strong> {activeScenario.goal}</span>
                  </div>
                  <span className="text-[10px] font-hud text-text-tertiary hidden md:inline">
                    Puntos de recompensa: +10 XP • +5 Monedas por mensaje
                  </span>
                </div>

                {/* Chat Feed */}
                <div 
                  ref={feedRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin]"
                  style={{ backgroundImage: 'radial-gradient(rgba(122, 112, 102, 0.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                >
                  {activeScenarioConv?.messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    const showTranslation = revealedTranslations.has(msg.id);

                    if (isUser) {
                      return (
                        <div key={msg.id} className="flex justify-end pl-12">
                          <div className="max-w-lg bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-4 shadow-md text-sm border-l-4 border-l-accent-action/60">
                            <p className="font-hud text-[9px] uppercase tracking-wider text-accent-action mb-1">
                              Tu Respuesta
                            </p>
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={msg.id} className="flex justify-start pr-12">
                          <div className="relative max-w-xl bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-5 shadow-lg flex flex-col">
                            
                            {/* Avatar header */}
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-structural/50">
                              <span className="text-xl">{activeScenario.avatar.startsWith('http') ? activeScenario.icon : activeScenario.avatar}</span>
                              <span className="font-display font-bold text-xs text-text-primary">
                                {activeScenario.characterName}
                              </span>
                              <span className="text-[10px] text-text-tertiary italic">
                                ({activeScenario.characterRole})
                              </span>
                            </div>

                            {/* Message Body with interactive words */}
                            <div className="space-y-3 leading-relaxed text-sm pr-4">
                              <p>{renderInteractiveSpanishText(msg.text, msg.newVocabWords)}</p>

                              {/* Newly introduced vocabulary highlight card */}
                              {msg.newVocabWords && msg.newVocabWords.length > 0 && (
                                <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 space-y-1">
                                  <p className="text-[10px] font-hud uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" /> Vocabulario Clave del Escenario:
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    {msg.newVocabWords.map((v, vi) => (
                                      <button
                                        key={vi}
                                        onClick={() => {
                                          if (activeScenarioId) {
                                            addLearnedWord(activeScenarioId, v.word, v.meaning);
                                          }
                                          setSelectedWord({
                                            word: v.word,
                                            meaning: v.meaning,
                                            pronunciation: 'Guardado a tu vocabulario'
                                          });
                                        }}
                                        className="text-xs bg-bg-elevated px-2.5 py-1 rounded-lg border border-emerald-500/40 text-emerald-900 font-bold hover:bg-emerald-50 cursor-pointer shadow-sm flex items-center gap-1"
                                      >
                                        <span>{v.word}</span>
                                        <span className="text-[10px] font-normal text-text-secondary">({v.meaning})</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Translation text */}
                              {showTranslation && (
                                <div className="mt-3 pt-3 border-t border-structural text-text-secondary italic text-xs animate-fadeIn leading-relaxed">
                                  {language === 'hinglish' ? translateToHinglish(msg.translation || '') : msg.translation}
                                </div>
                              )}
                            </div>

                            {/* Signoff */}
                            {msg.signOff && (
                              <p className="font-display italic text-xs text-accent-action text-right mt-3">
                                — {msg.signOff}
                              </p>
                            )}

                            {/* Action bar */}
                            <div className="mt-4 pt-3 border-t border-structural/50 flex items-center justify-between">
                              <button
                                onClick={() => toggleTranslation(msg.id)}
                                className={`flex items-center gap-1.5 text-[11px] font-hud px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                  showTranslation
                                    ? 'bg-accent-action/10 text-accent-action font-semibold'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
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

                  {/* Typing Indicator */}
                  {isScenarioTyping && (
                    <div className="flex justify-start pr-12">
                      <div className="bg-bg-elevated-2 border border-structural rounded-xl p-4 shadow flex items-center gap-2.5">
                        <BrainCircuit className="h-4 w-4 text-accent-action animate-pulse" />
                        <span className="font-hud text-xs text-text-secondary">
                          {activeScenario.characterName} está respondiendo en vivo...
                        </span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-accent-action rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-accent-action rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-accent-action rounded-full animate-bounce" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Input Area */}
                <div className="bg-bg-elevated-2 border-t border-structural p-4 space-y-3">
                  
                  {/* Quick replies */}
                  {activeScenarioConv && activeScenarioConv.messages.length > 0 && (
                    (() => {
                      const lastMsg = [...activeScenarioConv.messages].reverse().find((m) => m.sender === 'assistant');
                      if (!lastMsg || !lastMsg.quickReplies || lastMsg.quickReplies.length === 0) return null;
                      return (
                        <div className="space-y-1.5">
                          <p className="font-hud text-[9px] uppercase tracking-wider text-text-tertiary px-1">
                            Respuestas rápidas sugeridas:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {lastMsg.quickReplies.map((qr, qri) => (
                              <button
                                key={qri}
                                onClick={() => handleSendScenario(qr.text)}
                                disabled={isScenarioTyping}
                                className="cursor-pointer text-left rounded-xl border border-structural bg-bg-elevated hover:bg-bg-elevated-2 px-3 py-1.5 font-body text-xs text-text-primary transition-all hover:border-accent-action shadow-sm flex flex-col group disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="font-semibold text-text-primary group-hover:text-accent-action">{qr.text}</span>
                                <span className="text-[10px] text-text-secondary/80 italic">{qr.translation}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {/* Input Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendScenario(inputText);
                    }}
                    className="flex gap-3"
                  >
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      disabled={isScenarioTyping}
                      placeholder={`Responde a ${activeScenario.characterName} en español o inglés...`}
                      className="flex-1 bg-bg-elevated border border-structural text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-action focus:border-accent-action placeholder:text-text-tertiary disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isScenarioTyping}
                      className="bg-accent-action text-bg-base rounded-xl px-5 py-3 hover:bg-accent-action-hover transition-colors flex items-center justify-center gap-1.5 shadow font-body text-sm font-bold border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      <Send className="h-4 w-4" /> Enviar
                    </button>
                  </form>
                </div>

              </div>
            )}
          </>
        )}

        {/* ----------------- MODE 2: CLASSIC PEN PALS (ELENA, MATEO, DIEGO) ----------------- */}
        {tabMode === 'classic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left column: Companion selection */}
            <section className="lg:col-span-4 space-y-4">
              <h2 className="font-hud text-xs uppercase tracking-wider text-text-secondary px-1">
                Amigos por Carta
              </h2>

              <div className="space-y-3">
                {Object.values(COMPANIONS).map((comp) => {
                  const isActive = comp.id === activeCompanionId;
                  const compConv = activeClassicConv;
                  const currentExpNeeded = compConv.friendshipLevel * 100;
                  const currentPercent = (compConv.friendshipExp / currentExpNeeded) * 100;

                  return (
                    <button
                      key={comp.id}
                      onClick={() => setActiveCompanion(comp.id)}
                      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow ${
                        isActive
                          ? 'bg-bg-elevated border-accent-action text-text-primary scale-[1.01] ring-1 ring-accent-action/30'
                          : 'bg-bg-elevated/40 border-structural text-text-primary hover:bg-bg-elevated'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl" role="img" aria-label={comp.name}>
                          {comp.avatar}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display font-bold text-base truncate">{comp.name}</h3>
                            <span className={`font-hud text-[9px] uppercase px-1.5 py-0.5 rounded border ${
                              comp.speed === 'Fácil' 
                                ? 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30'
                                : comp.speed === 'Intermedio'
                                  ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                                  : 'bg-rose-500/15 text-rose-800 border-rose-500/30'
                            }`}>
                              {comp.speed}
                            </span>
                          </div>
                          <p className="font-body text-xs text-text-secondary mt-0.5 truncate">
                            {comp.role}
                          </p>
                        </div>
                      </div>

                      {/* Friendship bar */}
                      <div className="mt-3 pt-3 border-t border-structural/40">
                        <div className="flex items-center justify-between text-[10px] font-hud mb-1">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-accent-action fill-accent-action" />
                            Nivel {compConv.friendshipLevel}
                          </span>
                          <span>{compConv.friendshipExp} / {currentExpNeeded} XP</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full overflow-hidden bg-structural/30">
                          <div 
                            className="h-full rounded-full transition-all duration-300 bg-accent-action"
                            style={{ width: `${currentPercent}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Reset Panel */}
              <div className="rounded-xl border border-structural bg-bg-elevated/40 p-4 text-center">
                {showConfirmReset ? (
                  <div className="space-y-3">
                    <p className="font-body text-xs text-text-secondary">
                      ¿Seguro? Se borrará el historial de cartas.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          resetClassicConversations();
                          setShowConfirmReset(false);
                        }}
                        className="rounded bg-accent-action hover:bg-accent-action-hover px-3 py-1 font-display text-xs text-bg-base shadow transition-colors cursor-pointer border-none"
                      >
                        Sí, borrar
                      </button>
                      <button
                        onClick={() => setShowConfirmReset(false)}
                        className="rounded border border-structural hover:bg-bg-elevated px-3 py-1 font-display text-xs text-text-primary transition-colors cursor-pointer"
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
                    <RefreshCw className="h-3.5 w-3.5" /> Reiniciar Historial Clásico
                  </button>
                )}
              </div>
            </section>

            {/* Right column: Classic Correspondence Board */}
            <section className="lg:col-span-8 flex flex-col h-[70vh] min-h-[500px] border border-structural rounded-2xl overflow-hidden shadow-2xl bg-bg-elevated">
              
              <div className="bg-bg-elevated-2 text-text-primary p-4 border-b border-structural flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeCompanion.avatar}</span>
                  <div>
                    <h2 className="font-display text-lg font-bold leading-tight">{activeCompanion.name}</h2>
                    <p className="font-body text-xs text-text-secondary italic">{activeCompanion.role}</p>
                  </div>
                </div>
                <span className="font-body text-xs text-accent-action bg-accent-action/10 px-2.5 py-1 rounded-full border border-accent-action/20">
                  📬 {activeClassicConv.letterCount} cartas
                </span>
              </div>

              {/* Classic messages feed */}
              <div 
                ref={feedRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin]"
              >
                {activeClassicConv.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const showTranslation = revealedTranslations.has(msg.id);

                  if (isUser) {
                    return (
                      <div key={msg.id} className="flex justify-end pl-12">
                        <div className="max-w-lg bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-4 shadow-md text-sm border-l-4 border-l-accent-action/60">
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={msg.id} className="flex justify-start pr-12">
                        <div className="relative max-w-xl bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-5 shadow-lg flex flex-col">
                          <p className="font-display italic text-sm font-semibold mb-3">Estimado estudiante,</p>
                          <div className="space-y-3 leading-relaxed text-sm pr-6">
                            <p>{renderInteractiveSpanishText(msg.text)}</p>
                            {showTranslation && (
                              <div className="mt-3 pt-3 border-t border-structural text-text-secondary italic text-xs animate-fadeIn">
                                {language === 'hinglish' ? translateToHinglish(msg.translation) : msg.translation}
                              </div>
                            )}
                          </div>
                          {msg.signOff && (
                            <p className="font-display italic text-base text-accent-action text-right mt-4 self-end">
                              — {msg.signOff}
                            </p>
                          )}
                          <div className="mt-4 pt-3 border-t border-structural flex items-center justify-between">
                            <button
                              onClick={() => toggleTranslation(msg.id)}
                              className="flex items-center gap-1.5 text-[11px] font-hud text-text-secondary hover:text-text-primary cursor-pointer"
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

                {isClassicTyping && (
                  <div className="flex justify-start pr-12">
                    <div className="bg-bg-elevated-2 border border-structural rounded-xl p-4 shadow flex items-center gap-2.5">
                      <PenTool className="h-4 w-4 text-accent-action animate-bounce" />
                      <span className="font-hud text-xs text-text-secondary">
                        {activeCompanion.name} está escribiendo...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-bg-elevated-2 border-t border-structural p-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendClassic(inputText);
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isClassicTyping}
                    placeholder={`Escribe una carta a ${activeCompanion.name}...`}
                    className="flex-1 bg-bg-elevated border border-structural text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-action"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isClassicTyping}
                    className="bg-accent-action text-bg-base rounded-xl px-5 py-3 hover:bg-accent-action-hover transition-colors font-bold border-none cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </section>
          </div>
        )}

      </div>

      {/* Learned Words Modal */}
      {showLearnedWordsModal && activeScenarioConv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-bg-elevated border border-structural rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-structural pb-3">
              <div className="flex items-center gap-2">
                <BookCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="font-display font-bold text-lg text-text-primary">
                  Vocabulario Aprendido ({activeScenarioConv.learnedWords.length})
                </h3>
              </div>
              <button
                onClick={() => setShowLearnedWordsModal(false)}
                className="text-text-tertiary hover:text-text-primary p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-text-secondary">
              Estas son las palabras clave guardadas durante tus conversaciones en el escenario <strong>{activeScenario?.title}</strong>:
            </p>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 [scrollbar-width:thin]">
              {activeScenarioConv.learnedWords.length === 0 ? (
                <p className="text-xs text-text-tertiary italic text-center py-6">
                  Aún no has guardado palabras en este escenario. Conversa con {activeScenario?.characterName} para descubrir nuevas palabras.
                </p>
              ) : (
                activeScenarioConv.learnedWords.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-bg-elevated-2 border border-structural rounded-xl p-3 text-xs"
                  >
                    <span className="font-bold text-emerald-800 text-sm">{item.word}</span>
                    <span className="text-text-secondary">{item.meaning}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowLearnedWordsModal(false)}
              className="w-full bg-accent-action text-bg-base rounded-xl py-2.5 text-xs font-bold hover:bg-accent-action-hover transition-colors cursor-pointer border-none shadow"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Interactive Word Ink Reveal Card */}
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
