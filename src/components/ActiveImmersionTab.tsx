import { useState, useRef, useEffect, type FC } from 'react';
import { useActiveImmersionStore } from '../state/activeImmersionStore';
import type { ImmersionMode } from '../utils/geminiService';
import { isGeminiAvailable } from '../utils/geminiService';
import {
  Send,
  Languages,
  Sparkles,
  BrainCircuit,
  CalendarDays,
  MessageSquare,
  Brain,
  Drama,
  ArrowLeft,
  RefreshCw,
  BookCheck,
  MapPin,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

/* ─── Mode Definitions ─────────────────────────────────────────────────────── */

interface ModeDefinition {
  id: ImmersionMode;
  label: string;
  icon: FC<{ className?: string }>;
  description: string;
  emoji: string;
}

const MODES: ModeDefinition[] = [
  {
    id: 'daily',
    label: 'Daily Immersion Plan',
    icon: CalendarDays,
    description: 'A personalized 7-day study plan with phrases, grammar, and quizzes.',
    emoji: '📅',
  },
  {
    id: 'conversation',
    label: 'Real Conversation Practice',
    icon: MessageSquare,
    description: 'Free-form conversation on any topic — like chatting with a friend.',
    emoji: '💬',
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary That Sticks',
    icon: Brain,
    description: 'Learn 20 words in groups of 5 with quizzes after each group.',
    emoji: '🧠',
  },
  {
    id: 'roleplay',
    label: 'Role Play Real Life',
    icon: Drama,
    description: 'Practice real-world scenarios with slang, idioms, and corrections.',
    emoji: '🎭',
  },
];

/* ─── Topic Presets ────────────────────────────────────────────────────────── */

const TOPIC_PRESETS: Record<ImmersionMode, string[]> = {
  daily: ['Travel', 'Work', 'Social Life', 'Food & Cooking', 'Family', 'Hobbies', 'Health', 'Culture'],
  conversation: ['Work', 'Travel', 'Social', 'Food', 'Family', 'Hobbies', 'Weather', 'Sports'],
  vocabulary: ['Restaurant', 'Airport', 'Hospital', 'Shopping', 'Office', 'Home', 'Nature', 'Technology'],
  roleplay: ['Ordering Food', 'Job Interview', 'Asking Directions', 'Hotel Check-in', 'Doctor Visit', 'Making Friends', 'Buying Clothes', 'Phone Call'],
};

/* ─── Accent Presets (conversation mode only) ──────────────────────────────── */

const ACCENT_OPTIONS = [
  { id: null, label: 'Neutral / Latin American', flag: '🌎' },
  { id: 'Madrid', label: 'Madrid', flag: '🇪🇸' },
  { id: 'Mexico City', label: 'Mexico City', flag: '🇲🇽' },
  { id: 'Buenos Aires', label: 'Buenos Aires', flag: '🇦🇷' },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

const ActiveImmersionTab: FC = () => {
  const {
    activeMode,
    selectedTopic,
    selectedAccent,
    selectedLevel,
    sessions,
    isTyping,
    setMode,
    setTopic,
    setAccent,
    setSelectedLevel,
    startSession,
    sendMessage,
    retryLastMessage,
    resetSession,
    addLearnedWord,
  } = useActiveImmersionStore();

  const [inputText, setInputText] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [revealedTranslations, setRevealedTranslations] = useState<Set<string>>(new Set());
  const [showLearnedWordsModal, setShowLearnedWordsModal] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Session key & data
  const sessionKey = activeMode && selectedTopic ? `${activeMode}-${selectedTopic}` : null;
  const currentSession = sessionKey ? sessions[sessionKey] : null;

  // Auto-scroll on new messages
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [currentSession?.messages, isTyping, currentSession?.error]);

  const toggleTranslation = (msgId: string) => {
    setRevealedTranslations((prev) => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping || !activeMode || !selectedTopic) return;
    sendMessage(activeMode, selectedTopic, text.trim(), selectedAccent);
    setInputText('');
  };

  const handleStartSession = (topic: string) => {
    if (!activeMode || !topic.trim()) return;
    setTopic(topic.trim());
    startSession(activeMode, topic.trim(), selectedAccent);
  };

  const handleBackToModes = () => {
    setMode(null);
    setTopic(null);
    setAccent(null);
  };

  const handleBackToTopics = () => {
    setTopic(null);
  };

  const currentModeConfig = MODES.find((m) => m.id === activeMode);

  /* ═══════════════════════════════════════════════════════════════════════════
   * VIEW 1 — Mode Selection
   * ═══════════════════════════════════════════════════════════════════════════ */
  if (!activeMode) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-bg-elevated border border-structural rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48 text-accent-action" />
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary mb-1">
            🔥 Active Immersion
          </h2>
          <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
            Four powerful modes to immerse yourself in Spanish. Choose your coaching style below —
            your AI coach adapts to your level in real time.
          </p>
          {isGeminiAvailable() && (
            <span className="inline-flex items-center gap-1 mt-3 bg-accent-action/10 text-accent-action px-2.5 py-1 rounded-full text-[10px] font-hud border border-accent-action/25 animate-pulse">
              <BrainCircuit className="h-3 w-3" /> Powered by Gemini 3.5
            </span>
          )}
        </div>

        {/* Mode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODES.map((mode) => {
            const ModeIcon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setMode(mode.id)}
                className="cursor-pointer text-left bg-bg-elevated border border-structural hover:border-accent-action/50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl p-3 bg-bg-elevated-2 rounded-xl border border-structural shadow-inner group-hover:scale-110 transition-transform">
                    {mode.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <ModeIcon className="h-4 w-4 text-accent-action shrink-0" />
                      <h3 className="font-display text-base font-bold text-text-primary group-hover:text-accent-action transition-colors">
                        {mode.label}
                      </h3>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-text-tertiary group-hover:text-accent-action group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * VIEW 2 — Topic Selection (+ Level Selection & Accent Picker)
   * ═══════════════════════════════════════════════════════════════════════════ */
  if (!selectedTopic || !currentSession) {
    const presets = TOPIC_PRESETS[activeMode] || [];
    const showAccentPicker = activeMode === 'conversation';
    const showLevelToggle = activeMode === 'conversation' || activeMode === 'roleplay';

    return (
      <div className="space-y-6">
        {/* Back + Mode Header */}
        <div className="bg-bg-elevated border border-structural rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <button
            onClick={handleBackToModes}
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary mb-4 cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to modes
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentModeConfig?.emoji}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                {currentModeConfig?.label}
              </h2>
              <p className="text-xs text-text-secondary">{currentModeConfig?.description}</p>
            </div>
          </div>
        </div>

        {/* Level Selection Toggle */}
        {showLevelToggle && (
          <div className="bg-bg-elevated border border-structural rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent-action" />
              <h3 className="font-display text-sm font-bold text-text-primary">Select Practice Level</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedLevel('beginner')}
                className={`cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedLevel === 'beginner'
                    ? 'bg-accent-action text-bg-base border-accent-action shadow-md scale-[1.02]'
                    : 'bg-bg-elevated-2 text-text-secondary border-structural hover:border-accent-action/50 hover:text-text-primary'
                }`}
              >
                <span>🌱</span> Beginner (A1-A2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('intermediate')}
                className={`cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedLevel === 'intermediate'
                    ? 'bg-accent-action text-bg-base border-accent-action shadow-md scale-[1.02]'
                    : 'bg-bg-elevated-2 text-text-secondary border-structural hover:border-accent-action/50 hover:text-text-primary'
                }`}
              >
                <span>⚡</span> Intermediate (B1-B2)
              </button>
            </div>
          </div>
        )}

        {/* Accent Picker (conversation mode only) */}
        {showAccentPicker && (
          <div className="bg-bg-elevated border border-structural rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-accent-action" />
              <h3 className="font-display text-sm font-bold text-text-primary">Accent / Persona</h3>
              <span className="text-[10px] text-text-tertiary font-hud">(optional)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id ?? 'neutral'}
                  onClick={() => setAccent(opt.id)}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedAccent === opt.id
                      ? 'bg-accent-action text-bg-base border-accent-action shadow'
                      : 'bg-bg-elevated-2 text-text-secondary border-structural hover:border-accent-action/50 hover:text-text-primary'
                  }`}
                >
                  <span>{opt.flag}</span> {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Topic Chips */}
        <div className="bg-bg-elevated border border-structural rounded-2xl p-5 shadow-md">
          <h3 className="font-display text-sm font-bold text-text-primary mb-1">Choose a Topic</h3>
          <p className="text-[11px] text-text-secondary mb-4">Pick a preset or type your own below.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {presets.map((topic) => (
              <button
                key={topic}
                onClick={() => handleStartSession(topic)}
                className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold border border-structural bg-bg-elevated-2 text-text-primary hover:border-accent-action hover:bg-accent-action/10 transition-all shadow-sm"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Custom topic input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customTopic.trim()) handleStartSession(customTopic.trim());
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Or type a custom topic..."
              className="flex-1 bg-bg-elevated-2 border border-structural text-text-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-action focus:border-accent-action placeholder:text-text-tertiary"
            />
            <button
              type="submit"
              disabled={!customTopic.trim()}
              className="bg-accent-action text-bg-base rounded-xl px-5 py-2.5 text-xs font-bold hover:bg-accent-action-hover transition-colors shadow cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start →
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * VIEW 3 — Active Chat / Structured Content View
   * ═══════════════════════════════════════════════════════════════════════════ */
  const isStructuredMode = activeMode === 'daily' || activeMode === 'vocabulary';
  const lastAssistantMsg = [...currentSession.messages].reverse().find((m) => m.sender === 'assistant');

  return (
    <div className="flex flex-col h-[75vh] min-h-[550px] border border-structural rounded-2xl overflow-hidden shadow-2xl bg-bg-elevated">
      {/* ── Session Header ─────────────────────────────────────────────── */}
      <div className="bg-bg-elevated-2 p-4 border-b border-structural flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToTopics}
            className="p-2 rounded-xl bg-bg-elevated border border-structural text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-colors cursor-pointer"
            title="Back to topic selection"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-3xl">{currentModeConfig?.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-text-primary leading-tight">
                {currentModeConfig?.label}
              </h2>
              <span className="text-[10px] font-hud font-bold px-2 py-0.5 rounded-full bg-accent-action/10 text-accent-action border border-accent-action/20">
                {selectedLevel === 'intermediate' ? '⚡ Intermediate' : '🌱 Beginner'}
              </span>
              {selectedAccent && (
                <span className="text-[10px] font-hud font-bold px-2 py-0.5 rounded-full bg-info/10 text-info border border-info/20">
                  {ACCENT_OPTIONS.find((a) => a.id === selectedAccent)?.flag} {selectedAccent}
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary">
              Topic: <strong>{selectedTopic}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setShowLearnedWordsModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors cursor-pointer"
          >
            <BookCheck className="h-4 w-4 text-emerald-600" />
            <span>{currentSession.learnedWords.length} Aprendidas</span>
          </button>
          <button
            onClick={() => {
              if (activeMode && selectedTopic) resetSession(activeMode, selectedTopic);
            }}
            className="p-2 rounded-xl border border-structural text-text-tertiary hover:text-accent-action hover:bg-bg-elevated transition-colors cursor-pointer"
            title="Restart session"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Reward Banner ──────────────────────────────────────────────── */}
      <div className="bg-accent-action/5 px-4 py-2 border-b border-accent-action/15 flex items-center justify-between text-xs text-text-secondary font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-accent-action" />
          <span>
            <strong>Active Immersion:</strong> {isStructuredMode ? 'Structured coaching mode' : 'Free-form chat mode'}
          </span>
        </div>
        <span className="text-[10px] font-hud text-text-tertiary hidden md:inline">
          +10 XP • +5 Coins per message
        </span>
      </div>

      {/* ── Visible Error Banner UI ────────────────────────────────────── */}
      {currentSession.error && (
        <div className="m-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 flex items-center justify-between gap-3 shadow-md animate-fadeIn shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
            <div>
              <strong className="font-bold">Gemini API Error:</strong>{' '}
              <span>
                {typeof currentSession.error === 'string'
                  ? currentSession.error
                  : currentSession.error.message || 'An error occurred during Gemini API call.'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (activeMode && selectedTopic) {
                retryLastMessage(activeMode, selectedTopic, selectedAccent);
              }
            }}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow cursor-pointer border-none shrink-0 flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </div>
      )}

      {/* ── Message Feed ───────────────────────────────────────────────── */}
      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin]"
        style={{
          backgroundImage: 'radial-gradient(rgba(122, 112, 102, 0.05) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        {currentSession.messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const showTranslation = revealedTranslations.has(msg.id);

          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end pl-12">
                <div className="max-w-lg bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-4 shadow-md text-sm border-l-4 border-l-accent-action/60">
                  <p className="font-hud text-[9px] uppercase tracking-wider text-accent-action mb-1">
                    Tu Mensaje
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }

          // Assistant message
          return (
            <div key={msg.id} className="flex justify-start pr-12">
              <div className="relative max-w-xl bg-bg-elevated-2 border border-structural text-text-primary rounded-xl p-5 shadow-lg flex flex-col">
                {/* Avatar header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-structural/50">
                  <span className="text-xl">{currentModeConfig?.emoji}</span>
                  <span className="font-display font-bold text-xs text-text-primary">
                    Spanish Coach
                  </span>
                  <span className="text-[10px] text-text-tertiary italic">
                    ({currentModeConfig?.label})
                  </span>
                </div>

                {/* Message Body */}
                <div className="space-y-3 leading-relaxed text-sm pr-4">
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Structured Content Rendering */}
                  {msg.structuredContent && msg.structuredContent.items.length > 0 && (
                    <div className="mt-3 bg-bg-elevated rounded-xl border border-structural p-4 space-y-2">
                      <p className="text-[10px] font-hud uppercase tracking-wider font-bold text-accent-action flex items-center gap-1">
                        {msg.structuredContent.type === 'plan' && '📋 Plan'}
                        {msg.structuredContent.type === 'quiz' && '📝 Quiz'}
                        {msg.structuredContent.type === 'vocab-group' && '📚 Vocabulary Group'}
                        {msg.structuredContent.type === 'exercise' && '🏋️ Exercise'}
                      </p>
                      <div className="space-y-2">
                        {msg.structuredContent.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-bg-elevated-2 rounded-lg p-3 border border-structural/60"
                          >
                            <p className="font-bold text-xs text-text-primary">{item.label}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{item.detail}</p>
                            {item.example && (
                              <p className="text-xs text-accent-action italic mt-1">
                                → {item.example}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Vocabulary Highlight */}
                  {msg.newVocabWords && msg.newVocabWords.length > 0 && (
                    <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 space-y-1">
                      <p className="text-[10px] font-hud uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> New Vocabulary:
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.newVocabWords.map((v, vi) => (
                          <button
                            key={vi}
                            onClick={() => {
                              if (sessionKey) addLearnedWord(sessionKey, v.word, v.meaning);
                            }}
                            className="text-xs bg-bg-elevated px-2.5 py-1 rounded-lg border border-emerald-500/40 text-emerald-900 font-bold hover:bg-emerald-50 cursor-pointer shadow-sm flex items-center gap-1"
                          >
                            <span>{v.word}</span>
                            <span className="text-[10px] font-normal text-text-secondary">
                              ({v.meaning})
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Translation */}
                  {showTranslation && msg.translation && (
                    <div className="mt-3 pt-3 border-t border-structural text-text-secondary italic text-xs animate-fadeIn leading-relaxed">
                      {msg.translation}
                    </div>
                  )}
                </div>

                {/* Action bar */}
                {msg.translation && (
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
                      {showTranslation ? 'Hide Translation' : 'Show Translation'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start pr-12">
            <div className="bg-bg-elevated-2 border border-structural rounded-xl p-4 shadow flex items-center gap-2.5">
              <BrainCircuit className="h-4 w-4 text-accent-action animate-pulse" />
              <span className="font-hud text-xs text-text-secondary">
                Your coach is thinking...
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

      {/* ── Footer Input Area ──────────────────────────────────────────── */}
      <div className="bg-bg-elevated-2 border-t border-structural p-4 space-y-3">
        {/* Quick Replies */}
        {lastAssistantMsg?.quickReplies && lastAssistantMsg.quickReplies.length > 0 && (
          <div className="space-y-1.5">
            <p className="font-hud text-[9px] uppercase tracking-wider text-text-tertiary px-1">
              Suggested replies:
            </p>
            <div className="flex flex-wrap gap-2">
              {lastAssistantMsg.quickReplies.map((qr, qri) => (
                <button
                  key={qri}
                  onClick={() => handleSend(qr.text)}
                  disabled={isTyping}
                  className="cursor-pointer text-left rounded-xl border border-structural bg-bg-elevated hover:bg-bg-elevated-2 px-3 py-1.5 font-body text-xs text-text-primary transition-all hover:border-accent-action shadow-sm flex flex-col group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-semibold text-text-primary group-hover:text-accent-action">
                    {qr.text}
                  </span>
                  <span className="text-[10px] text-text-secondary/80 italic">
                    {qr.translation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={
              isStructuredMode
                ? 'Ask a follow-up question or continue...'
                : 'Type in Spanish or English...'
            }
            className="flex-1 bg-bg-elevated border border-structural text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-action focus:border-accent-action placeholder:text-text-tertiary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="bg-accent-action text-bg-base rounded-xl px-5 py-3 hover:bg-accent-action-hover transition-colors flex items-center justify-center gap-1.5 shadow font-body text-sm font-bold border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>

      {/* ── Learned Words Modal ────────────────────────────────────────── */}
      {showLearnedWordsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-bg-elevated border border-structural rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
                <BookCheck className="h-5 w-5 text-emerald-600" />
                Learned Words ({currentSession.learnedWords.length})
              </h3>
              <button
                onClick={() => setShowLearnedWordsModal(false)}
                className="text-text-tertiary hover:text-text-primary cursor-pointer bg-transparent border-none text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {currentSession.learnedWords.length === 0 ? (
              <p className="text-sm text-text-secondary italic">
                No words collected yet. Tap highlighted vocabulary in the chat to save them!
              </p>
            ) : (
              <div className="space-y-2">
                {currentSession.learnedWords.map((w, i) => (
                  <div
                    key={i}
                    className="bg-bg-elevated-2 rounded-xl p-3 border border-structural flex items-center justify-between"
                  >
                    <span className="font-bold text-sm text-emerald-800">{w.word}</span>
                    <span className="text-xs text-text-secondary">{w.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveImmersionTab;
