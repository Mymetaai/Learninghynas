import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  Award,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { feynmanConcepts, type FeynmanConcept } from '../data/feynmanConceptsData';
import { useStatsStore } from '../state/statsStore';

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

const LEVEL_COLORS: Record<CEFRLevel, { bg: string; text: string; border: string }> = {
  A1: { bg: 'bg-[#7D927D]/10', text: 'text-[#5E735E]', border: 'border-[#7D927D]/30' },
  A2: { bg: 'bg-[#7D927D]/15', text: 'text-[#4A5E4A]', border: 'border-[#7D927D]/40' },
  B1: { bg: 'bg-[#D4A574]/15', text: 'text-[#8B6E4E]', border: 'border-[#D4A574]/40' },
  B2: { bg: 'bg-[#D4A574]/25', text: 'text-[#735738]', border: 'border-[#D4A574]/50' },
  C1: { bg: 'bg-[#C4796B]/15', text: 'text-[#A05648]', border: 'border-[#C4796B]/40' },
};

interface FeynmanDrillProps {
  onComplete?: () => void;
  className?: string;
}

export default function FeynmanDrill({ onComplete, className = '' }: FeynmanDrillProps) {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  
  // Concepts for the active level
  const filteredConcepts = useMemo(() => {
    return feynmanConcepts.filter((c) => c.cefrLevel === selectedLevel);
  }, [selectedLevel]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentConcept: FeynmanConcept = filteredConcepts[currentIndex] || filteredConcepts[0] || feynmanConcepts[0];

  const [userExplanation, setUserExplanation] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<{
    isSuccess: boolean;
    matchedKeywords: string[];
    missingKeywords: string[];
    scorePct: number;
  } | null>(null);

  const [showIdealExample, setShowIdealExample] = useState<boolean>(false);
  const addRewards = useStatsStore((s) => s.addRewards);

  // Switch level
  const handleLevelChange = (level: CEFRLevel) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setUserExplanation('');
    setEvalResult(null);
    setShowIdealExample(false);
  };

  // Next concept in current level
  const handleNextConcept = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredConcepts.length);
    setUserExplanation('');
    setEvalResult(null);
    setShowIdealExample(false);
  };

  // Speech Recognition (Voice Input)
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recording is not supported on this browser. You can type your explanation below!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; // User explains concept in English (or Spanish)
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserExplanation((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    } catch {
      setIsRecording(false);
    }
  };

  // Evaluate Explanation
  const handleSubmitExplanation = useCallback(() => {
    if (!userExplanation.trim()) return;

    const normalizedText = userExplanation.toLowerCase();
    const keywords = currentConcept.keyConceptsToCheck;

    const matched = keywords.filter((kw) => normalizedText.includes(kw.toLowerCase()));
    const missing = keywords.filter((kw) => !normalizedText.includes(kw.toLowerCase()));

    const threshold = Math.min(2, Math.ceil(keywords.length * 0.3));
    const isSuccess = matched.length >= threshold;
    const scorePct = Math.round((matched.length / keywords.length) * 100);

    if (isSuccess) {
      // Award XP & Coins
      addRewards(25, 10);
      setShowIdealExample(true);
      onComplete?.();
    }

    setEvalResult({
      isSuccess,
      matchedKeywords: matched,
      missingKeywords: missing,
      scorePct
    });
  }, [userExplanation, currentConcept, addRewards, onComplete]);

  return (
    <div className={`bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden ${className}`}>
      {/* Background ambient decorative element */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#7D927D]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-structural/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#7D927D]/15 border border-[#7D927D]/30 rounded-2xl text-[#5E735E]">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-text-primary">Teach the Chibi</h2>
              <span className="font-mono text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-[#7D927D]/15 text-[#5E735E] border border-[#7D927D]/30">
                Feynman Technique
              </span>
            </div>
            <p className="font-sans text-xs text-text-secondary mt-0.5">
              Explain grammar & vocabulary concepts in your own simple words. If you can explain it simply, you master it!
            </p>
          </div>
        </div>

        {/* Rewards pill */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto font-mono text-xs font-bold text-[#8B6E4E] bg-[#D4A574]/15 border border-[#D4A574]/30 px-3 py-1.5 rounded-full shadow-xs">
          <Award className="h-3.5 w-3.5 text-[#D4A574]" />
          <span>+25 XP</span>
        </div>
      </div>

      {/* Level Selector Pills */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
          Select CEFR Level
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {CEFR_LEVELS.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`font-mono text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#5E735E] text-white shadow-sm scale-105'
                    : 'bg-[#F9F7F2] text-text-secondary border border-structural/40 hover:bg-[#7D927D]/10 hover:text-text-primary'
                }`}
              >
                <span>{lvl}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concept Card */}
      <div className="bg-[#F9F7F2] border border-[#7D927D]/20 rounded-2xl p-5 sm:p-6 space-y-4 relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${LEVEL_COLORS[currentConcept.cefrLevel].bg} ${LEVEL_COLORS[currentConcept.cefrLevel].text} ${LEVEL_COLORS[currentConcept.cefrLevel].border}`}>
              {currentConcept.cefrLevel} • {currentConcept.category}
            </span>
            <span className="font-sans text-xs text-text-tertiary">
              Concept {currentIndex + 1} of {filteredConcepts.length}
            </span>
          </div>

          {filteredConcepts.length > 1 && (
            <button
              onClick={handleNextConcept}
              className="font-mono text-xs font-bold text-[#5E735E] hover:text-[#4A5E4A] bg-[#7D927D]/10 hover:bg-[#7D927D]/20 border border-[#7D927D]/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Prompt Question */}
        <div>
          <h3 className="font-serif text-lg font-bold text-text-primary">
            {currentConcept.title}
          </h3>
          <p className="font-serif italic text-sm text-[#5E735E] mt-1 bg-white/70 p-3.5 rounded-xl border border-[#7D927D]/15 shadow-xs">
            💬 "{currentConcept.promptQuestion}"
          </p>
        </div>

        {/* Mascot Prompt */}
        <div className="flex items-start gap-3 bg-white/90 p-4 rounded-xl border border-structural/30">
          <div className="w-10 h-10 rounded-full bg-[#7D927D]/20 border border-[#7D927D]/40 flex items-center justify-center text-lg shrink-0">
            🐾
          </div>
          <div className="space-y-0.5">
            <p className="font-sans text-xs font-bold text-text-primary">Yuki Chibi Mascot</p>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              "Explain it to me like I'm 5 years old! Use your own simple rules, examples, or memory tricks."
            </p>
          </div>
        </div>
      </div>

      {/* Explanation Input Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-sans text-xs font-bold text-text-primary flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-[#7D927D]" />
            Your Simple Explanation:
          </label>

          <button
            onClick={handleToggleRecording}
            className={`font-mono text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
              isRecording
                ? 'bg-[#C4796B] text-white border-[#C4796B] animate-pulse'
                : 'bg-white text-text-secondary border-structural/40 hover:bg-[#F9F7F2]'
            }`}
          >
            {isRecording ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5 text-[#7D927D]" />}
            <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
          </button>
        </div>

        <textarea
          value={userExplanation}
          onChange={(e) => setUserExplanation(e.target.value)}
          placeholder="Write your explanation here... (e.g. 'Use Ser for permanent things like who you are, and Estar for temporary states like how you feel right now.')"
          rows={4}
          className="w-full bg-[#F9F7F2]/80 border border-structural/40 focus:border-[#7D927D] focus:ring-2 focus:ring-[#7D927D]/20 rounded-2xl p-4 text-xs font-sans text-text-primary placeholder:text-text-tertiary transition-all resize-none shadow-inner"
        />

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={() => {
              setUserExplanation('');
              setEvalResult(null);
              setShowIdealExample(false);
            }}
            className="font-mono text-xs font-bold text-text-tertiary hover:text-text-secondary px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleSubmitExplanation}
            disabled={!userExplanation.trim()}
            className="font-sans text-xs font-bold bg-[#5E735E] hover:bg-[#4A5E4A] disabled:opacity-40 text-white px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Submit Explanation to Mascot</span>
          </button>
        </div>
      </div>

      {/* AI Evaluation Result Banner */}
      <AnimatePresence>
        {evalResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border space-y-3 ${
              evalResult.isSuccess
                ? 'bg-[#7D927D]/10 border-[#7D927D]/40'
                : 'bg-[#C4796B]/10 border-[#C4796B]/40'
            }`}
          >
            <div className="flex items-start gap-3">
              {evalResult.isSuccess ? (
                <div className="p-2 bg-[#7D927D]/20 text-[#5E735E] rounded-xl shrink-0">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              ) : (
                <div className="p-2 bg-[#C4796B]/20 text-[#A05648] rounded-xl shrink-0">
                  <AlertCircle className="h-6 w-6" />
                </div>
              )}

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-text-primary">
                    {evalResult.isSuccess ? '¡Excelente! Concept Mastered 🎉' : 'Needs a bit more detail'}
                  </h4>
                  {evalResult.isSuccess && (
                    <span className="font-mono text-xs font-extrabold text-[#5E735E] bg-white px-2.5 py-1 rounded-full border border-[#7D927D]/30 shadow-xs">
                      +25 XP • +10 Coins
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  {evalResult.isSuccess
                    ? "Your explanation hit the key concepts! Yuki understood your explanation perfectly."
                    : "You're on the right track! To unlock full mastery, try including key concepts in your explanation."}
                </p>

                {/* Key Concepts matched chips */}
                <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="font-mono text-[10px] text-text-tertiary font-bold uppercase">Key Ideas:</span>
                  {currentConcept.keyConceptsToCheck.map((kw) => {
                    const isMatched = evalResult.matchedKeywords.includes(kw);
                    return (
                      <span
                        key={kw}
                        className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          isMatched
                            ? 'bg-[#7D927D]/20 text-[#4A5E4A] border-[#7D927D]/30'
                            : 'bg-white/60 text-text-tertiary border-structural/30'
                        }`}
                      >
                        {isMatched ? `✓ ${kw}` : kw}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {!evalResult.isSuccess && (
              <p className="font-sans text-xs text-[#A05648] font-semibold border-t border-[#C4796B]/20 pt-2.5">
                💡 Tip: Mention key ideas like "{evalResult.missingKeywords.slice(0, 3).join('", "')}" in simple words!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ideal Breakdown Accordion / Card */}
      {(showIdealExample || evalResult?.isSuccess) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border border-[#7D927D]/30 rounded-2xl p-5 space-y-2 shadow-xs"
        >
          <div className="flex items-center gap-2 text-[#5E735E] font-bold text-xs font-mono uppercase tracking-wider">
            <Lightbulb className="h-4 w-4" />
            <span>Ideal Feynman Breakdown:</span>
          </div>
          <p className="font-serif italic text-sm text-text-primary leading-relaxed pl-6 border-l-2 border-[#7D927D]/50">
            "{currentConcept.simpleExample}"
          </p>
        </motion.div>
      )}
    </div>
  );
}
