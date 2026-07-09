import { useState, useEffect, useRef, useCallback, useMemo, type FC } from 'react';
import { useStatsStore } from '../state/statsStore';
import { useSettingsStore } from '../state/settingsStore';
import { translateToHinglish } from '../utils/hinglish';
import {
  CEFR_LEVEL_META,
  CEFR_LEVELS,
  getChallengesByLevel,
  type CEFRLevel,
} from '../data/speakingChallenges';
import {
  Mic,
  MicOff,
  Volume2,
  Trophy,
  AlertTriangle,
  HelpCircle,
  Shuffle,
  Zap,
  SkipForward,
  Eye,
  CheckCircle2,
  Flame,
  ChevronRight,
  Target,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────── */
/*  SpeakingScreen — Voice Arena                                        */
/* ────────────────────────────────────────────────────────────────────── */

const SpeakingScreen: FC = () => {
  const addRewards = useStatsStore((s) => s.addRewards);
  const { language } = useSettingsStore();

  // ── CEFR level & exercise state ──
  const [activeLevel, setActiveLevel] = useState<CEFRLevel>('A1');
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);

  // ── Recording state ──
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedbackWords, setFeedbackWords] = useState<{ word: string; correct: boolean }[]>([]);
  const [speakingError, setSpeakingError] = useState<string | null>(null);
  const [hasEarnedBonus, setHasEarnedBonus] = useState(false);

  // ── Feature toggles ──
  const [speedMode, setSpeedMode] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [speedTimer, setSpeedTimer] = useState<number | null>(null);

  // ── Session state ──
  const [sessionStreak, setSessionStreak] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  // ── Animation keys ──
  const [phraseKey, setPhraseKey] = useState(0);
  const [listKey, setListKey] = useState(0);

  // ── Tab indicator refs ──
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // ── Recognition ref ──
  const recognitionRef = useRef<any>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Compute challenges for active level ──
  const levelChallenges = useMemo(() => {
    const challenges = getChallengesByLevel(activeLevel);
    if (isShuffled) {
      const shuffled = [...challenges];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    return challenges;
  }, [activeLevel, isShuffled]);

  const activeChallenge = levelChallenges[activeChallengeIndex] || levelChallenges[0];
  const levelMeta = CEFR_LEVEL_META[activeLevel];

  // ── Completed count for this level ──
  const completedCount = useMemo(() => {
    return levelChallenges.filter((ch) => completedExercises.has(ch.id)).length;
  }, [levelChallenges, completedExercises]);

  // ── Tab indicator position ──
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const activeTab = tabRefs.current[activeLevel];
    const container = tabContainerRef.current;
    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      setIndicatorStyle({
        left: `${tabRect.left - containerRect.left}px`,
        width: `${tabRect.width}px`,
        background: `${levelMeta.bgColor}`,
        border: `1px solid ${levelMeta.borderColor}`,
      });
    }
  }, [activeLevel, levelMeta]);

  // ── Text helpers ──
  const cleanWord = useCallback(
    (w: string) => w.toLowerCase().trim().replace(/[¡!¿?,/#!$%^&*;:{}=\-_`~()]/g, ''),
    []
  );

  const getTranslation = useCallback(
    (text: string) => (language === 'hinglish' ? translateToHinglish(text) : text),
    [language]
  );

  // ── Speech evaluation ──
  const evaluateSpeech = useCallback(
    (userText: string) => {
      const targetPhrase = activeChallenge.phrase;
      const targetWords = targetPhrase.split(/\s+/);
      const userWords = userText.split(/\s+/).map(cleanWord);

      let matchCount = 0;
      const evaluated = targetWords.map((word) => {
        const cleanTarget = cleanWord(word);
        const isMatch = userWords.includes(cleanTarget);
        if (isMatch) matchCount++;
        return { word, correct: isMatch };
      });

      const accuracyScore = Math.round((matchCount / targetWords.length) * 100);
      setScore(accuracyScore);
      setFeedbackWords(evaluated);

      if (accuracyScore >= 80) {
        setHasEarnedBonus(true);
        setSessionStreak((prev) => prev + 1);
        setCompletedExercises((prev) => new Set(prev).add(activeChallenge.id));
        addRewards(10, 5);

        // Auto-advance
        if (autoAdvance && activeChallengeIndex < levelChallenges.length - 1) {
          autoAdvanceTimerRef.current = setTimeout(() => {
            handleSelectChallenge(activeChallengeIndex + 1);
          }, 2000);
        }
      } else {
        setSessionStreak(0);
      }
    },
    [activeChallenge, cleanWord, addRewards, autoAdvance, activeChallengeIndex, levelChallenges.length]
  );

  // ── Speech recognition ──
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'es-ES';

      rec.onstart = () => {
        setTranscript('');
        setScore(null);
        setFeedbackWords([]);
        setSpeakingError(null);
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeakingError('Microphone access denied. Enable permissions in your browser.');
        } else {
          setSpeakingError(`Speech recognition error: ${event.error}`);
        }
        setIsRecording(false);
        setSpeedTimer(null);
      };

      rec.onend = () => {
        setIsRecording(false);
        setSpeedTimer(null);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        evaluateSpeech(text);
      };

      recognitionRef.current = rec;
    }
  }, [activeChallengeIndex, evaluateSpeech, activeLevel]);

  // ── Speed mode timer ──
  useEffect(() => {
    if (!isRecording || !speedMode) return;
    let remaining = 5;
    setSpeedTimer(remaining);
    const interval = setInterval(() => {
      remaining--;
      setSpeedTimer(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        stopRecording();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording, speedMode]);

  // ── Cleanup auto-advance on unmount ──
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  // ── Simulation fallback ──
  const simulateSpeechInput = () => {
    setIsRecording(true);
    setSpeakingError(null);
    setTranscript('');
    setTimeout(() => {
      setIsRecording(false);
      const rand = Math.random();
      let mockText = activeChallenge.phrase;
      if (rand < 0.25) {
        // perfect
      } else if (rand < 0.6) {
        mockText = mockText
          .replace('¿Cómo estás?', 'como esta')
          .replace('café', 'cafe')
          .replace('estación', 'estacion');
      } else {
        mockText = 'hola como va la cosa';
      }
      setTranscript(mockText);
      evaluateSpeech(mockText);
    }, 2500);
  };

  const startRecording = () => {
    setSpeakingError(null);
    setHasEarnedBonus(false);
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        setIsRecording(true);
        recognitionRef.current.start();
      } catch {
        simulateSpeechInput();
      }
    } else {
      simulateSpeechInput();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setIsRecording(false);
    setSpeedTimer(null);
  };

  const playTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeChallenge.phrase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectChallenge = (idx: number) => {
    setActiveChallengeIndex(idx);
    setTranscript('');
    setScore(null);
    setFeedbackWords([]);
    setSpeakingError(null);
    setHasEarnedBonus(false);
    setSpeedTimer(null);
    setPhraseKey((k) => k + 1);
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  const handleLevelChange = (level: CEFRLevel) => {
    setActiveLevel(level);
    setActiveChallengeIndex(0);
    setTranscript('');
    setScore(null);
    setFeedbackWords([]);
    setSpeakingError(null);
    setHasEarnedBonus(false);
    setSpeedTimer(null);
    setPhraseKey((k) => k + 1);
    setListKey((k) => k + 1);
  };

  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev);
    setActiveChallengeIndex(0);
    setListKey((k) => k + 1);
  };

  // ── Waveform bars data ──
  const waveformBars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        height: 8 + Math.random() * 28,
        duration: 0.3 + Math.random() * 0.6,
        delay: i * 0.05,
      })),
    [isRecording]
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* ═══ Header ═══ */}
        <div className="mb-6">
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
            Desafío de Pronunciación
          </p>
          <div className="flex items-center justify-between mt-1">
            <h1 className="font-display text-2xl font-bold text-text-primary">Voice Arena</h1>
            {/* Session Streak */}
            {sessionStreak > 0 && (
              <div className="flex items-center gap-1.5 streak-glow">
                <Flame className="h-5 w-5 text-accent-action" />
                <span className="font-display text-lg font-bold text-accent-action">
                  {sessionStreak}
                </span>
                <span className="font-body text-[10px] text-pencil uppercase tracking-wider">
                  Streak
                </span>
              </div>
            )}
          </div>
          <p className="text-pencil text-xs mt-1 max-w-xl">
            Master Spanish pronunciation from simple greetings to academic discourse. Select your
            CEFR level, listen to native speech, and record yourself for instant feedback.
          </p>
        </div>

        {/* ═══ CEFR Level Tab Bar ═══ */}
        <div className="mb-6">
          <div
            ref={tabContainerRef}
            className="glass-nav-capsule inline-flex items-center p-1 gap-0.5 relative"
          >
            {/* Sliding Indicator */}
            <div className="cefr-tab-indicator" style={indicatorStyle} />

            {CEFR_LEVELS.map((level) => {
              const meta = CEFR_LEVEL_META[level];
              const isActive = level === activeLevel;
              return (
                <button
                  key={level}
                  ref={(el) => { tabRefs.current[level] = el; }}
                  onClick={() => handleLevelChange(level)}
                  className={`relative z-10 px-3 py-1.5 rounded-full font-hud text-[11px] tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={isActive ? { color: meta.color } : undefined}
                >
                  <span className="font-bold">{level}</span>
                  <span className="hidden sm:inline ml-1 font-normal">· {meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Level Progress Bar ═══ */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 h-2 bg-structural/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-bar-fill"
              style={{
                width: `${(completedCount / 25) * 100}%`,
                background: `linear-gradient(90deg, ${levelMeta.color}, ${levelMeta.color}88)`,
              }}
            />
          </div>
          <span className="font-body text-[11px] text-text-secondary whitespace-nowrap">
            {completedCount}/25 completed
          </span>
        </div>

        {/* ═══ Feature Controls Bar ═══ */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSpeedMode((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-hud tracking-wider transition-all cursor-pointer border ${
              speedMode
                ? 'bg-accent-action/15 border-accent-action/30 text-accent-action'
                : 'bg-bg-elevated-2 border-structural text-text-secondary hover:text-text-primary'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            Speed Mode
          </button>
          <button
            onClick={() => setAutoAdvance((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-hud tracking-wider transition-all cursor-pointer border ${
              autoAdvance
                ? 'bg-success/15 border-success/30 text-success'
                : 'bg-bg-elevated-2 border-structural text-text-secondary hover:text-text-primary'
            }`}
          >
            <SkipForward className="h-3.5 w-3.5" />
            Auto-Advance
          </button>
          <button
            onClick={toggleShuffle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-hud tracking-wider transition-all cursor-pointer border ${
              isShuffled
                ? 'bg-info/15 border-info/30 text-info'
                : 'bg-bg-elevated-2 border-structural text-text-secondary hover:text-text-primary'
            }`}
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── Left Column: Exercise Sidebar ─── */}
          <section className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-hud text-[10px] uppercase tracking-wider text-pencil">
                Speaking Exercises
              </h2>
              <span
                className="font-body text-[9px] px-2 py-0.5 rounded-full border"
                style={{
                  color: levelMeta.color,
                  borderColor: levelMeta.borderColor,
                  background: levelMeta.bgColor,
                }}
              >
                {activeLevel} · {levelMeta.label}
              </span>
            </div>

            <div
              key={listKey}
              className="space-y-2 max-h-[55vh] overflow-y-auto pr-1 exercise-scroll"
            >
              {levelChallenges.map((ch, idx) => {
                const isActive = idx === activeChallengeIndex;
                const isCompleted = completedExercises.has(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChallenge(idx)}
                    className={`stagger-item card-hover-lift w-full text-left rounded-xl border p-3 transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-bg-elevated border-accent-action/40 text-text-primary shadow-md'
                        : 'bg-bg-elevated-2 border-structural text-text-primary hover:bg-structural/50'
                    }`}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-body text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{
                            color: levelMeta.color,
                            borderColor: levelMeta.borderColor,
                            background: levelMeta.bgColor,
                            border: `1px solid ${levelMeta.borderColor}`,
                          }}
                        >
                          {activeLevel}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        )}
                      </div>
                      <span className="font-body text-[9px] text-text-secondary">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="font-target text-sm font-bold mt-1.5 truncate">{ch.phrase}</p>
                    {/* Hover-to-reveal translation */}
                    <div className="relative mt-1">
                      <p
                        className={`font-body text-[11px] truncate transition-all duration-300 ${
                          isActive ? 'text-text-secondary' : 'text-text-tertiary'
                        } blur-reveal-light`}
                      >
                        {getTranslation(ch.translation)}
                      </p>
                      <span className="absolute inset-0 flex items-center font-body text-[9px] text-text-tertiary/60 pointer-events-none group-hover:opacity-0 transition-opacity">
                        <Eye className="h-3 w-3 mr-1 opacity-40" />
                        Hover to reveal
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ─── Right Column: Speaking Arena ─── */}
          <section className="lg:col-span-8 glass-surface rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[520px]">
            {/* Active Challenge Display */}
            <div
              key={phraseKey}
              className="text-center py-5 bg-paper/[0.02] border border-pencil/10 rounded-xl p-5 fade-slide-in"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="font-hud text-[9px] uppercase tracking-widest text-pencil">
                  Spanish Phrase to Speak
                </span>
                {speedMode && isRecording && speedTimer !== null && (
                  <span className="font-display text-sm font-bold text-accent-action animate-pulse">
                    {speedTimer}s
                  </span>
                )}
              </div>

              {/* Key Focus badge */}
              <div className="flex justify-center mb-3">
                <span
                  className="inline-flex items-center gap-1 font-body text-[10px] px-2.5 py-1 rounded-full border"
                  style={{
                    color: levelMeta.color,
                    borderColor: levelMeta.borderColor,
                    background: levelMeta.bgColor,
                  }}
                >
                  <Target className="h-3 w-3" />
                  {activeChallenge.keyFocus.replace('🎯 ', '')}
                </span>
              </div>

              {/* Animated phrase — word by word */}
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-wide leading-relaxed">
                {activeChallenge.phrase.split(/\s+/).map((word, i) => (
                  <span
                    key={`${phraseKey}-${i}`}
                    className="word-pop-item mr-2"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {word}
                  </span>
                ))}
              </p>

              {/* Hover-to-reveal translation */}
              <div className="mt-3 relative inline-block group cursor-help">
                <p className="font-body text-sm text-pencil/90 italic blur-reveal">
                  "{getTranslation(activeChallenge.translation)}"
                </p>
                <span className="absolute inset-0 flex items-center justify-center font-body text-[10px] text-text-tertiary/70 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                  <Eye className="h-3.5 w-3.5 mr-1.5 opacity-50" />
                  Hover to reveal meaning
                </span>
              </div>

              {/* TTS play button */}
              <button
                onClick={playTTS}
                className="mt-4 mx-auto flex items-center gap-2 bg-teal-deep/10 border border-teal-deep/20 hover:bg-teal-deep/20 text-teal-deep font-hud text-xs px-4 py-2 rounded-xl transition-all cursor-pointer hover:scale-105"
                title="Listen to native voice pronunciation"
              >
                <Volume2 className="h-4.5 w-4.5" />
                Listen Pronunciation
              </button>
            </div>

            {/* Pronunciation Tip Box */}
            <div className="my-4 p-4 rounded-xl border border-marigold/20 bg-marigold/5 flex items-start gap-3 fade-slide-in"
              style={{ animationDelay: '0.15s' }}
            >
              <HelpCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
              <div>
                <h4 className="font-body text-[10px] uppercase tracking-wider text-info font-bold">
                  Pronunciation Tip
                </h4>
                <p className="font-body text-xs text-text-primary mt-1 leading-relaxed">
                  {activeChallenge.pronunciationTip}
                </p>
              </div>
            </div>

            {/* ─── Recording Controls ─── */}
            <div className="flex flex-col items-center justify-center gap-4 py-6 border-t border-b border-structural">
              {isRecording ? (
                <div className="flex flex-col items-center gap-4 w-full fade-slide-in">
                  {/* Waveform */}
                  <div className="flex items-end justify-center gap-1 h-10 w-full max-w-[280px]">
                    {waveformBars.map((bar, i) => (
                      <div
                        key={i}
                        className="waveform-bar"
                        style={{
                          height: `${bar.height}px`,
                          animationDuration: `${bar.duration}s`,
                          animationDelay: `${bar.delay}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Stop button */}
                  <button
                    onClick={stopRecording}
                    className="relative h-16 w-16 rounded-full bg-error flex items-center justify-center text-bg-base cursor-pointer recording-pulse"
                  >
                    <MicOff className="h-7 w-7 relative z-10" />
                  </button>
                  <p className="font-body text-xs text-error animate-pulse font-bold">
                    Listening... Say the phrase in Spanish
                    {speedMode && speedTimer !== null && (
                      <span className="ml-2 text-accent-action">({speedTimer}s left)</span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 fade-slide-in">
                  {/* Mic button with pulse rings */}
                  <div className="relative">
                    <div className="pulse-ring" />
                    <div className="pulse-ring pulse-ring-2" />
                    <div className="pulse-ring pulse-ring-3" />
                    <button
                      onClick={startRecording}
                      className="relative z-10 h-16 w-16 rounded-full bg-accent-action hover:bg-accent-action-hover flex items-center justify-center text-bg-base hover:scale-105 transition-transform cursor-pointer shadow-lg"
                    >
                      <Mic className="h-7 w-7" />
                    </button>
                  </div>
                  <p className="font-body text-xs text-text-secondary">
                    Tap the microphone to speak
                    {speedMode && (
                      <span className="ml-1 text-accent-action font-bold">(5s timer)</span>
                    )}
                  </p>
                </div>
              )}

              {/* Error display */}
              {speakingError && (
                <div className="mt-2 p-3 bg-error/10 border border-error/20 rounded-xl flex items-center gap-2.5 max-w-md text-center text-xs text-error fade-slide-in">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{speakingError}</span>
                </div>
              )}
            </div>

            {/* ─── Results Panel ─── */}
            {(transcript || score !== null) && (
              <div className="mt-5 p-4 rounded-xl bg-bg-elevated border border-structural space-y-4 fade-slide-in">
                {/* Word-by-word feedback */}
                <div>
                  <span className="font-body text-[9px] uppercase tracking-widest text-text-secondary">
                    Pronunciation Feedback
                  </span>
                  <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5 text-lg font-target tracking-[0.015em]">
                    {feedbackWords.length > 0 ? (
                      feedbackWords.map((item, idx) => (
                        <span
                          key={idx}
                          className={`relative font-semibold word-pop-item ${
                            item.correct
                              ? 'text-success'
                              : 'text-error underline decoration-wavy decoration-error/70'
                          }`}
                          style={{ animationDelay: `${idx * 0.06}s` }}
                          title={item.correct ? 'Correct pronunciation' : 'Mispronounced / Not heard'}
                        >
                          {item.word}
                        </span>
                      ))
                    ) : (
                      <span className="text-text-secondary italic text-sm font-body">
                        Evaluating...
                      </span>
                    )}
                  </div>
                </div>

                {/* Score + Award */}
                {score !== null && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-structural">
                    <div className="flex items-center gap-3 score-reveal">
                      {/* Score Ring */}
                      <div className="relative w-14 h-14 shrink-0">
                        <svg width="56" height="56" className="transform -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r="23"
                            className="stroke-structural fill-none"
                            strokeWidth="4"
                          />
                          <circle
                            cx="28"
                            cy="28"
                            r="23"
                            className={`fill-none ${score >= 80 ? 'stroke-success' : 'stroke-error'}`}
                            strokeWidth="4"
                            strokeDasharray="144.5"
                            strokeDashoffset={144.5 - (144.5 * score) / 100}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-body text-xs font-bold text-text-primary">
                          {score}%
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-text-primary">
                          {score >= 80 ? '¡Excelente Trabajo!' : 'Inténtalo de Nuevo'}
                        </h4>
                        <p className="text-text-secondary text-xs mt-0.5">
                          {score >= 80
                            ? 'Your pronunciation matches native speech!'
                            : 'Focus on the pronunciation tips and try again.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Bonus */}
                      {hasEarnedBonus && (
                        <div className="bg-accent-action/10 border border-accent-action/20 rounded-xl px-3 py-2 flex items-center gap-2 text-accent-action fade-slide-in shrink-0">
                          <Trophy className="h-4.5 w-4.5 shrink-0" />
                          <div className="font-body text-[10px] leading-tight">
                            <p className="font-bold uppercase tracking-wider">Bonus</p>
                            <p className="mt-0.5 text-text-primary">+10 XP · +5 Coins</p>
                          </div>
                        </div>
                      )}

                      {/* Auto-advance hint */}
                      {autoAdvance &&
                        hasEarnedBonus &&
                        activeChallengeIndex < levelChallenges.length - 1 && (
                          <div className="flex items-center gap-1 text-success text-[10px] font-body animate-pulse">
                            <ChevronRight className="h-3.5 w-3.5" />
                            Next in 2s...
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpeakingScreen;
