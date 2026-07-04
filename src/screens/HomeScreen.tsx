import { useState, useMemo, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatsStore } from '../state/statsStore';
import { useProgressStore } from '../state/progressStore';
import { useSettingsStore } from '../state/settingsStore';
import { useTrainingStore } from '../state/trainingStore';
import { translateWordToHinglish } from '../utils/hinglish';
import {
  Sparkles,
  Target,
  Compass,
  Activity,
  BookOpen,
  Lightbulb,
  Headphones,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  Volume2,
  Trophy,
  Flame
} from 'lucide-react';

const HomeScreen: FC = () => {
  const navigate = useNavigate();
  const xp = useStatsStore((s) => s.xp);
  const streak = useStatsStore((s) => s.streak);
  const learnedVocab = useStatsStore((s) => s.learnedVocab);
  const addRewards = useStatsStore((s) => s.addRewards);
  
  const completedQuests = useProgressStore((s) => s.completedQuestIds);
  const { language } = useSettingsStore();
  const mistakeCount = useTrainingStore((s) => s.mistakes.length);

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress, stats, and conversations? This cannot be undone.")) {
      // Wipe all persisted state keys from localStorage
      localStorage.removeItem('wayfarer-progress');
      localStorage.removeItem('wayfarer-stats');
      localStorage.removeItem('wayfarer-companions');
      localStorage.removeItem('wayfarer-training');
      localStorage.removeItem('wayfarer-daily-quest');
      
      alert("All progress, stats, and conversations have been reset! Ready to start again.");
      window.location.reload();
    }
  };

  // Local state for interactive overlays
  const [activeModal, setActiveModal] = useState<'review' | 'progress' | 'listening' | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [revealedReviewAnswer, setRevealedReviewAnswer] = useState(false);
  const [listeningAnswer, setListeningAnswer] = useState('');
  const [listeningFeedback, setListeningFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Derived metrics from user state with default mock fallback for visual preview
  const currentStreak = streak || 3;
  const totalMasteredWords = learnedVocab.length || 26; // Mock total to render populated donut chart
  const currentXP = xp || 350;
  const xpNeeded = 1200;
  const xpPercentage = Math.min(Math.round((currentXP / xpNeeded) * 100), 100);

  // Weekly activity metrics — always return demo values to visualize bars
  const weeklyData = useMemo(() => {
    return [
      { day: 'Mon', mins: 20 },
      { day: 'Tue', mins: 35 },
      { day: 'Wed', mins: 45 },
      { day: 'Thu', mins: 30 },
      { day: 'Fri', mins: 25 },
      { day: 'Sat', mins: 15 },
      { day: 'Sun', mins: 40 }
    ];
  }, []);

  // Vocab breakdowns based on real user state or demo fallback
  const vocabBreakdown = useMemo(() => {
    if (learnedVocab.length > 0) {
      // Dynamically segment based on vocabulary list if populated
      const beginner = Math.round(learnedVocab.length * 0.49);
      const basic = Math.round(learnedVocab.length * 0.35);
      const intermediate = learnedVocab.length - beginner - basic;
      return { beginner, basic, intermediate };
    }
    return { beginner: 12, basic: 9, intermediate: 5 }; // Sums to 26
  }, [learnedVocab]);

  // Review Words list
  const wordsToReview = useMemo(() => {
    if (learnedVocab.length > 0) {
      return learnedVocab.map(v => ({
        word: v.word,
        meaning: 'Learned word', // Fallback, or we can look up from dictionary.ts
        pronunciation: 'Tap to read'
      }));
    }
    return [];
  }, [learnedVocab]);

  // Donut segments computed dynamically
  const donutSegments = useMemo(() => {
    const total = totalMasteredWords;
    if (total === 0) {
      return {
        beginner: { dash: '0 188.5', offset: '0' },
        basic: { dash: '0 188.5', offset: '0' },
        intermediate: { dash: '0 188.5', offset: '0' },
        isEmpty: true
      };
    }
    const begShare = vocabBreakdown.beginner / total;
    const basShare = vocabBreakdown.basic / total;
    const intShare = vocabBreakdown.intermediate / total;

    const begLen = begShare * 188.5;
    const basLen = basShare * 188.5;
    const intLen = intShare * 188.5;

    return {
      beginner: { dash: `${begLen} 188.5`, offset: '0' },
      basic: { dash: `${basLen} 188.5`, offset: `-${begLen}` },
      intermediate: { dash: `${intLen} 188.5`, offset: `-${begLen + basLen}` },
      isEmpty: false
    };
  }, [totalMasteredWords, vocabBreakdown]);

  const activeReviewWord = wordsToReview[currentReviewIndex % wordsToReview.length];

  const handleReviewNext = () => {
    setRevealedReviewAnswer(false);
    if (currentReviewIndex + 1 >= wordsToReview.length) {
      // Completed the review batch! Grant rewards
      addRewards(15, 10);
      setActiveModal(null);
      setCurrentReviewIndex(0);
      alert('Review Complete! You earned +15 XP and +10 Coins! 🎉');
    } else {
      setCurrentReviewIndex(prev => prev + 1);
    }
  };

  const handleVerifyListening = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = listeningAnswer.trim().toLowerCase();
    if (cleanInput.includes('hola') || cleanInput.includes('hello') || cleanInput.includes('namaste')) {
      setListeningFeedback('correct');
      addRewards(10, 5);
    } else {
      setListeningFeedback('incorrect');
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        
        {/* ── HEADER SECTION ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-text-primary flex items-center gap-2">
              ¡Hola! 👋
            </h1>
            <p className="font-body text-xs text-text-secondary mt-1">
              Yo, you're back! Time to level up your Spanish. Vamos!
            </p>
          </div>
          
          {/* Day Streak Badge */}
          <div className="flex items-center gap-3 bg-bg-elevated border border-structural rounded-xl px-4 py-2.5 shadow-md">
            <Flame className="h-6 w-6 text-streak-warm animate-pulse" />
            <div className="flex flex-col">
              <span className="font-body text-lg font-bold leading-none text-streak-warm">
                {currentStreak}
              </span>
              <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">
                Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 1: PROGRESS, INSIGHTS & RECOMMENDED NEXT ────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Card 1: Your Progress */}
          <div className="bg-bg-elevated border-2 border-structural rounded-2xl p-5 shadow-lg flex flex-col justify-between h-[340px]">
            <div className="flex items-center justify-between border-b border-structural pb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-info" />
                <h2 className="font-display text-base font-bold text-text-primary">Your Progress</h2>
              </div>
              <button
                onClick={handleResetProgress}
                className="text-[10px] uppercase font-body tracking-wider text-text-secondary hover:text-error hover:underline cursor-pointer bg-transparent border-none p-0 transition-colors"
              >
                Reset Progress
              </button>
            </div>

            <div className="flex items-center gap-4 py-4 flex-1">
              {/* Circular SVG Progress Ring */}
              <div className="relative shrink-0">
                <svg width="88" height="88" className="transform -rotate-90">
                  <circle
                    cx="44"
                    cy="44"
                    r="36"
                    style={{ stroke: 'var(--structural)', fill: 'none' }}
                    strokeWidth="7"
                  />
                  <circle
                    cx="44"
                    cy="44"
                    r="36"
                    style={{ stroke: 'var(--info)', fill: 'none' }}
                    strokeWidth="7"
                    strokeDasharray="226.2" // 2 * PI * 36
                    strokeDashoffset={226.2 - (226.2 * xpPercentage) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-lg font-bold text-text-primary">A1</span>
                  <span className="font-body text-[9px] uppercase tracking-wider text-text-secondary leading-none mt-0.5">Level</span>
                </div>
              </div>

              {/* Progress Detail */}
              <div className="flex-1 space-y-3">
                <div>
                  <p className="font-display text-sm font-semibold text-text-primary">{xpPercentage}% toward A2</p>
                  <div className="w-full h-2 bg-bg-elevated-2 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-info rounded-full" style={{ width: `${xpPercentage}%` }} />
                  </div>
                </div>
                <div>
                  <p className="font-body text-[9px] uppercase tracking-wider text-text-secondary">XP this week</p>
                  <p className="font-body text-xs text-text-primary mt-0.5 font-semibold">
                    {currentXP} <span className="text-text-secondary/60">/ {xpNeeded} XP</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('progress')}
              className="w-full text-center bg-accent-action text-bg-base hover:bg-accent-action-hover rounded-xl py-2.5 font-body text-xs font-semibold transition-colors cursor-pointer border-none shadow-md"
            >
              View Detailed Progress →
            </button>
          </div>

          {/* Card 2: AI Study Insights */}
          <div className="bg-bg-elevated border-2 border-structural rounded-2xl p-5 shadow-lg flex flex-col justify-between h-[340px]">
            <div className="flex items-center gap-2 border-b border-structural pb-3">
              <Sparkles className="h-5 w-5 text-info" />
              <h2 className="font-display text-base font-bold text-text-primary">AI Study Insights</h2>
            </div>

            <p className="text-xs text-text-secondary mt-2 mb-3">
              You're doing great! 👍 Focus on these areas to level up faster.
            </p>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {/* Weak Area Pill */}
              <div className="bg-error/10 border border-error/45 rounded-xl p-3 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-7 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                     <p className="font-body text-xs font-semibold text-text-primary truncate">{mistakeCount > 0 ? `${mistakeCount} weak spot${mistakeCount !== 1 ? 's' : ''} to review` : 'Weak area: Past Tense Verbs'}</p>
                     <p className="font-body text-[10px] text-text-secondary truncate">{mistakeCount > 0 ? 'Practice these to level up faster!' : 'Keep practicing to track your weak areas.'}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/training')}
                  className="bg-error text-bg-elevated hover:bg-error/90 font-body text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-lg shrink-0 transition-all duration-200 cursor-pointer border-none shadow-sm hover:scale-[1.03]"
                >
                  Practice Now
                </button>
              </div>

              {/* Strong Area Pill */}
              <div className="bg-success/10 border border-success/45 rounded-xl p-3 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-7 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-semibold text-text-primary truncate">Strong area: Vocabulary</p>
                    <p className="font-body text-[10px] text-text-secondary truncate">
                      {totalMasteredWords > 0 ? `You've mastered ${totalMasteredWords} words! 🎉` : 'Start learning to master words!'}
                    </p>
                  </div>
                </div>
                <button
                  disabled={totalMasteredWords === 0}
                  onClick={() => setActiveModal('review')}
                  className={`font-body text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-lg shrink-0 transition-all duration-200 cursor-pointer border-none shadow-sm hover:scale-[1.03] ${
                    totalMasteredWords > 0
                      ? 'bg-success text-bg-elevated hover:bg-success/90'
                      : 'bg-bg-elevated-2 text-text-tertiary cursor-not-allowed border border-structural'
                  }`}
                >
                  Review Words
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Recommended Next */}
          <div className="bg-bg-elevated border-2 border-structural rounded-2xl p-5 shadow-lg flex flex-col justify-between h-[340px]">
            <div className="flex items-center gap-2 border-b border-structural pb-3">
              <Compass className="h-5 w-5 text-info" />
              <h2 className="font-display text-base font-bold text-text-primary">Recommended Next</h2>
            </div>

            <div className="space-y-2.5 py-2 flex-1 flex flex-col justify-center">
              
              {/* Item 1: Continue Learning */}
              <div className="flex items-center justify-between gap-3 p-2 hover:bg-bg-elevated-2/30 rounded-xl transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-info/10 border border-info/20 flex items-center justify-center text-info text-lg shrink-0">
                    📖
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Continue Learning</p>
                    <p className="font-display text-xs font-bold text-text-primary truncate">Daily Routine · Lesson 8 / 12</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/stories')}
                  className="h-7 w-7 rounded-full bg-info hover:bg-info/90 flex items-center justify-center text-bg-base hover:scale-105 transition-all border-none cursor-pointer shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Item 2: Practice */}
              <div className="flex items-center justify-between gap-3 p-2 hover:bg-bg-elevated-2/30 rounded-xl transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-accent-action/10 border border-accent-action/20 flex items-center justify-center text-accent-action text-lg shrink-0">
                    🏋️
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Practice</p>
                    <p className="font-display text-xs font-bold text-text-primary truncate">Verb Conjugation · 10 min</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/training')}
                  className="h-7 w-7 rounded-full bg-accent-action hover:bg-accent-action-hover flex items-center justify-center text-bg-base hover:scale-105 transition-all border-none cursor-pointer shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Item 3: Conversation */}
              <div className="flex items-center justify-between gap-3 p-2 hover:bg-bg-elevated-2/30 rounded-xl transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center text-success text-lg shrink-0">
                    💬
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Conversation</p>
                    <p className="font-display text-xs font-bold text-text-primary truncate">Talk about your day · 5 min</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/companion')}
                  className="h-7 w-7 rounded-full bg-success hover:bg-success/90 flex items-center justify-center text-bg-base hover:scale-105 transition-all border-none cursor-pointer shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ── ROW 2: WEEKLY ACTIVITY & WORDS MASTERED BREAKDOWN ────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          
          {/* Card 4: Weekly Activity Chart (7 Columns) */}
          <div className="bg-text-primary border-2 border-structural/40 rounded-2xl p-5 shadow-lg md:col-span-7 flex flex-col justify-between h-[300px]">
            <div className="flex items-center gap-2 border-b border-structural/20 pb-3 mb-2">
              <Activity className="h-5 w-5 text-accent-action" />
              <h2 className="font-display text-base font-bold text-bg-elevated">Weekly Activity</h2>
            </div>

            {/* Bar Chart Container */}
            <div className="flex items-end justify-between gap-2 h-44 px-2 pt-6">
              {weeklyData.map((d) => {
                // Max mins is 45m. Let's make that 100% height (h-36 max)
                const heightPercent = Math.round((d.mins / 45) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="font-body text-[9px] font-semibold text-bg-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {d.mins}m
                    </span>
                    <div 
                      className="w-full bg-accent-action rounded-t-md hover:bg-accent-action-hover transition-all duration-300 shadow-[0_0_12px_rgba(230,72,51,0.3)]" 
                      style={{ height: `${Math.max((heightPercent * 110) / 100, 10)}px` }}
                    />
                    <span className="font-body text-[10px] text-bg-elevated/75 mt-1">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 5: Words Mastered Breakdown (5 Columns) */}
          <div className="bg-bg-elevated border-2 border-structural rounded-2xl p-5 shadow-lg md:col-span-5 flex flex-col justify-between h-[300px]">
            <div className="flex items-center gap-2 border-b border-structural pb-3 mb-3">
              <BookOpen className="h-5 w-5 text-info" />
              <h2 className="font-display text-base font-bold text-text-primary">Words Mastered</h2>
            </div>

            <div className="flex items-center gap-4 py-3 flex-1 justify-between">
              {/* Left Column: Stats */}
              <div className="space-y-1">
                <p className="font-display text-4xl font-extrabold text-text-primary tracking-tight">
                  {totalMasteredWords}
                </p>
                <p className="font-body text-[10px] uppercase tracking-wider text-text-secondary">Total Words</p>
                <p className="font-body text-xs font-semibold text-success mt-2">
                  +{totalMasteredWords > 0 ? 18 : 0} this week
                </p>
              </div>

              {/* Right Column: Donut Chart SVG */}
              <div className="relative shrink-0">
                <svg width="88" height="88" viewBox="0 0 80 80" className="transform -rotate-90">
                  {donutSegments.isEmpty ? (
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      style={{ stroke: 'var(--structural)', fill: 'none' }}
                      strokeWidth="9"
                    />
                  ) : (
                    <>
                      {/* Beginner Segment (Muted Gray/Text-Secondary) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        style={{ stroke: 'var(--text-secondary)', fill: 'none' }}
                        strokeWidth="9"
                        strokeDasharray={donutSegments.beginner.dash}
                        strokeDashoffset={donutSegments.beginner.offset}
                        strokeLinecap="round"
                      />
                      {/* Basic Segment (Teal/Info) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        style={{ stroke: 'var(--info)', fill: 'none' }}
                        strokeWidth="9"
                        strokeDasharray={donutSegments.basic.dash}
                        strokeDashoffset={donutSegments.basic.offset}
                        strokeLinecap="round"
                      />
                      {/* Intermediate Segment (Green/Success) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        style={{ stroke: 'var(--success)', fill: 'none' }}
                        strokeWidth="9"
                        strokeDasharray={donutSegments.intermediate.dash}
                        strokeDashoffset={donutSegments.intermediate.offset}
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Legend breakdown lists */}
            <div className="grid grid-cols-3 gap-1 pt-3 border-t border-structural font-body text-[10px] text-text-secondary">
              <div className="flex items-center gap-1.5 justify-center">
                <span className="h-2 w-2 rounded-full bg-text-secondary shrink-0" />
                <span className="text-text-primary truncate">Beg: {vocabBreakdown.beginner}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="h-2 w-2 rounded-full bg-info shrink-0" />
                <span className="text-text-primary truncate">Bas: {vocabBreakdown.basic}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="h-2 w-2 rounded-full bg-success shrink-0" />
                <span className="text-text-primary truncate">Int: {vocabBreakdown.intermediate}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── ROW 3: AI SUGGESTIONS JUST FOR YOU ─────────────────────── */}
        <div className="bg-bg-elevated border border-structural rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 border-b border-structural pb-3 mb-4">
            <Sparkles className="h-5 w-5 text-info" />
            <h2 className="font-display text-base font-bold text-text-primary">AI Suggestions Just For You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Suggestion 1: Spaced Repetition */}
            <div className="bg-bg-elevated-2/30 border border-structural hover:border-text-secondary/30 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent-action/10 border border-accent-action/20 flex items-center justify-center text-accent-action text-lg shrink-0 mt-0.5">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-text-primary">Review Spaced Repetition</h3>
                  <p className="font-body text-xs text-text-secondary mt-1">
                    {totalMasteredWords > 0
                      ? `You have ${Math.min(12, totalMasteredWords)} words due for review. Keep your memory sharp!`
                      : 'No words due for review. Start a quest to learn new words!'}
                  </p>
                </div>
              </div>
              <button
                disabled={totalMasteredWords === 0}
                onClick={() => setActiveModal('review')}
                className={`text-left font-body text-xs font-bold transition-colors mt-2 cursor-pointer inline-flex items-center gap-1 ${
                  totalMasteredWords > 0
                    ? 'text-accent-action hover:text-accent-action-hover hover:underline'
                    : 'text-text-tertiary/50 cursor-not-allowed'
                }`}
              >
                {totalMasteredWords > 0 ? 'Review Now →' : 'No words to review'}
              </button>
            </div>

            {/* Suggestion 2: Focus Practice */}
            <div className="bg-bg-elevated-2/30 border border-structural hover:border-text-secondary/30 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-error/10 border border-error/20 flex items-center justify-center text-error text-lg shrink-0 mt-0.5">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-text-primary">Focus Practice</h3>
                  <p className="font-body text-xs text-text-secondary mt-1">
                    {mistakeCount > 0
                      ? `Practice your ${mistakeCount} weak spots to overcome errors.`
                      : 'No weak spots yet. Keep studying on the map to find your areas of focus!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/training')}
                className="text-left font-body text-xs font-bold text-error hover:text-error/80 hover:underline transition-colors mt-2 cursor-pointer inline-flex items-center gap-1"
              >
                {mistakeCount > 0 ? 'Start Practice →' : 'Go to Training Grounds →'}
              </button>
            </div>

            {/* Suggestion 3: Listening Boost */}
            <div className="bg-bg-elevated-2/30 border border-structural hover:border-text-secondary/30 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-info/10 border border-info/20 flex items-center justify-center text-info text-lg shrink-0 mt-0.5">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-text-primary">Listening Boost</h3>
                  <p className="font-body text-xs text-text-secondary mt-1">Try a custom listening exercise about local daily conversations.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal('listening')}
                className="text-left font-body text-xs font-bold text-info hover:text-info/80 hover:underline transition-colors mt-2 cursor-pointer inline-flex items-center gap-1"
              >
                Start Listening →
              </button>
            </div>

          </div>
        </div>

        {/* ── ROW 4: WHY US — PROMOTIONAL BANNER ───────────────────── */}
        <div
          onClick={() => navigate('/why-us')}
          className="relative overflow-hidden bg-gradient-to-r from-accent-action/10 via-info/5 to-success/10 border border-structural rounded-2xl p-5 shadow-lg cursor-pointer group hover:border-text-secondary/40 transition-all duration-300 mb-6"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-text-primary/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-action/15 border border-accent-action/30 flex items-center justify-center text-accent-action shrink-0">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-text-primary">Why We Stand Out</h2>
                <p className="font-body text-xs text-text-secondary mt-0.5 max-w-md">
                  See how TheLearningHyena compares to Duolingo, Preply & Babbel — plus calculate ROI savings for your school or organization.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-accent-action/15 border border-accent-action/30 text-accent-action font-body text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shrink-0 group-hover:bg-accent-action/25 transition-colors">
              Explore
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

      </div>

      {/* ── INTERACTIVE MODAL OVERLAYS ─────────────────────────────── */}

      {/* Modal 1: Vocabulary Spaced Repetition Review */}
      {activeModal === 'review' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-bg-elevated border border-structural rounded-2xl shadow-2xl p-6 text-text-primary flex flex-col justify-between min-h-[350px]">
            {/* Close */}
            <button
              onClick={() => {
                setActiveModal(null);
                setCurrentReviewIndex(0);
                setRevealedReviewAnswer(false);
              }}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <div>
              <p className="font-body text-[10px] uppercase tracking-wider text-text-secondary">Vocab Spaced Repetition</p>
              <h2 className="font-display text-xl font-bold mt-1 text-accent-action">Review Learned Words</h2>
              <p className="text-[11px] text-text-secondary mt-0.5">Word {currentReviewIndex + 1} of {wordsToReview.length}</p>
            </div>

            {/* Word Display — Atkinson Hyperlegible Next for target language */}
            <div className="my-8 text-center bg-bg-elevated-2 border border-structural rounded-2xl p-6">
              <span className="font-body text-[9px] uppercase tracking-widest text-text-secondary">Spanish Word</span>
              <p className="font-target text-3xl font-extrabold text-text-primary mt-1 italic tracking-wide">
                {activeReviewWord.word}
              </p>
              <p className="font-body text-[11px] text-text-secondary italic mt-1.5">
                Pronunciation: {activeReviewWord.pronunciation}
              </p>

              {/* Reveal Card details */}
              {revealedReviewAnswer ? (
                <div className="mt-5 pt-5 border-t border-structural animate-fadeIn">
                  <span className="font-body text-[9px] uppercase tracking-widest text-text-secondary">Translation</span>
                  <p className="font-display text-lg font-bold text-success mt-1">
                    {language === 'hinglish' ? translateWordToHinglish(activeReviewWord.meaning) : activeReviewWord.meaning}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setRevealedReviewAnswer(true)}
                  className="mt-6 bg-accent-action text-bg-base rounded-xl px-4 py-2 font-body text-xs font-semibold hover:bg-accent-action-hover transition-colors cursor-pointer border-none"
                >
                  Reveal Translation
                </button>
              )}
            </div>

            {/* Navigation buttons */}
            {revealedReviewAnswer && (
              <button
                onClick={handleReviewNext}
                className="w-full bg-accent-action text-bg-base rounded-xl py-3 font-body text-sm font-semibold hover:bg-accent-action-hover transition-colors cursor-pointer border-none shadow-md"
              >
                {currentReviewIndex + 1 === wordsToReview.length ? 'Complete Review' : 'Next Word →'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Listening Practice Modal */}
      {activeModal === 'listening' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-bg-elevated border border-structural rounded-2xl shadow-2xl p-6 text-text-primary flex flex-col justify-between min-h-[350px]">
            <button
              onClick={() => {
                setActiveModal(null);
                setListeningAnswer('');
                setListeningFeedback(null);
              }}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <p className="font-body text-[10px] uppercase tracking-wider text-text-secondary">Custom Practice</p>
              <h2 className="font-display text-xl font-bold mt-1 text-info">Listening Exercise</h2>
            </div>

            <div className="my-6 text-center">
              {/* Play simulated Audio Button */}
              <button
                type="button"
                onClick={() => {
                  const speech = new SpeechSynthesisUtterance("¡Hola! ¿Cómo estás?");
                  speech.lang = 'es-ES';
                  window.speechSynthesis.speak(speech);
                }}
                className="h-16 w-16 mx-auto rounded-full bg-info/10 hover:bg-info/20 text-info border border-info/30 flex items-center justify-center transition-colors cursor-pointer animate-pulse"
                title="Play Audio"
              >
                <Volume2 className="h-8 w-8" />
              </button>
              <p className="text-xs text-text-secondary mt-3">Click the button to listen to the Spanish voice.</p>
            </div>

            {/* Answer Field */}
            <form onSubmit={handleVerifyListening} className="space-y-4">
              <div>
                <label className="font-body text-[9px] uppercase tracking-widest text-text-secondary block mb-1">
                  Type what you hear (Spanish or translation)
                </label>
                <input
                  type="text"
                  required
                  value={listeningAnswer}
                  onChange={(e) => setListeningAnswer(e.target.value)}
                  placeholder="e.g. Hola / Hello / Aap kaise ho?"
                  className="w-full bg-bg-elevated-2 border border-structural rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-info placeholder:text-text-tertiary"
                />
              </div>

              {listeningFeedback === 'correct' && (
                <p className="text-xs font-semibold text-success text-center bg-success/10 py-2 rounded-lg border border-success/20">
                  ✓ Correct! You earned +10 XP and +5 Coins!
                </p>
              )}
              {listeningFeedback === 'incorrect' && (
                <p className="text-xs font-semibold text-error text-center bg-error/10 py-2 rounded-lg border border-error/20">
                  ✗ Incorrect. Try listening again (Hint: "¡Hola!")
                </p>
              )}

              {listeningFeedback !== 'correct' && (
                <button
                  type="submit"
                  className="w-full bg-accent-action text-bg-base rounded-xl py-3 font-body text-sm font-semibold hover:bg-accent-action-hover transition-colors cursor-pointer border-none shadow-md"
                >
                  Verify Answer
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Detailed Progress Modal */}
      {activeModal === 'progress' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FAF6EE] border border-[#DDD0B5] rounded-2xl shadow-2xl p-6 text-ink flex flex-col justify-between min-h-[350px]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-pencil hover:text-ink transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <p className="font-hud text-[10px] uppercase tracking-wider text-pencil">Learning Analytics</p>
              <h2 className="font-display text-xl font-bold mt-1 text-terracotta">Detailed Progress Report</h2>
            </div>

            <div className="my-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-paper/40 p-3 rounded-xl border border-[#DDD0B5]">
                  <p className="font-hud text-[9px] uppercase text-pencil">Current Level</p>
                  <p className="font-display text-xl font-bold text-ink mt-0.5">A1 / Beginner</p>
                </div>
                <div className="bg-paper/40 p-3 rounded-xl border border-[#DDD0B5]">
                  <p className="font-hud text-[9px] uppercase text-pencil">Completed Quests</p>
                  <p className="font-display text-xl font-bold text-ink mt-0.5">{completedQuests.length} Quests</p>
                </div>
              </div>

              <div className="bg-paper/40 p-4 rounded-xl border border-[#DDD0B5] space-y-2">
                <h4 className="font-hud text-[10px] uppercase tracking-wider text-pencil border-b border-[#DDD0B5] pb-1.5 font-bold">
                  Quest Completion Log
                </h4>
                {completedQuests.length > 0 ? (
                  <div className="space-y-1 text-xs">
                    {completedQuests.map((qId: string) => (
                      <p key={qId} className="flex items-center gap-1.5 text-ink font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-deep shrink-0" />
                        Quest: <span className="font-mono text-[10px]">{qId}</span> - Complete
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-pencil italic">No quests completed yet. Go back to Adventure Map to begin!</p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                navigate('/map');
              }}
              className="w-full bg-terracotta text-text-primary rounded-xl py-3 font-display text-sm font-semibold hover:bg-terracotta/90 transition-colors cursor-pointer"
            >
              Go to Adventure Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomeScreen;
