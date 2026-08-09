import { useState, useMemo, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useUserData } from '../hooks/useUserData';
import { useStatsStore, DEFAULT_WEEKLY_ACTIVITY, type WeeklyActivityItem } from '../state/statsStore';
import { useDailyQuestStore } from '../state/dailyQuestStore';
import {
  Lightbulb,
  AlertTriangle,
  RotateCw,
  RotateCcw,
  Repeat,
  Wand2,
  Clock,
  Plane,
  BookOpen,
  Sparkles,
  Target
} from 'lucide-react';
import { vaultInsights } from '../data/vaultInsightsData';
import AppleActivityCard from '../components/AppleActivityCard';

// ── 1. MOCK DATA STORE (Simulated API Response) ─────────────────────────────

export interface UserProgressData {
  currentXp: number;
  maxXp: number;
  level: string;
  levelName: string;
  dailyGoalPercentage: number;
}


export interface LexiconStatItem {
  level: string;
  words: number;
}

export interface RecommendedLessonItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  iconType: 'wand' | 'clock' | 'plane' | 'book';
}

export interface SlipUpItem {
  id: string;
  phrase: string;
  explanation: string;
}

export interface MockUserData {
  userProgress: UserProgressData;
  weeklyActivity: WeeklyActivityItem[];
  lexiconStats: LexiconStatItem[];
  dynamicFact: string;
  recommendedLessons: RecommendedLessonItem[];
  slipUps: SlipUpItem[];
}

export const initialMockUserData: MockUserData = {
  userProgress: {
    currentXp: 0,
    maxXp: 1200,
    level: 'B2',
    levelName: 'Intermediate',
    dailyGoalPercentage: 85
  },
  weeklyActivity: [
    { day: 'Mon', minutes: 20 },
    { day: 'Tue', minutes: 35 },
    { day: 'Wed', minutes: 45 },
    { day: 'Thu', minutes: 30 },
    { day: 'Fri', minutes: 25 },
    { day: 'Sat', minutes: 15 },
    { day: 'Sun', minutes: 40 }
  ],
  lexiconStats: [
    { level: 'Beginner', words: 12 },
    { level: 'Basic', words: 9 },
    { level: 'Intermediate', words: 5 }
  ],
  dynamicFact: 'Spanish is the second most spoken native language in the world, with over 460 million native speakers.',
  recommendedLessons: [
    {
      id: 'lesson-1',
      tag: 'B2 | ADVANCED',
      title: 'Subjunctive Mood',
      description: 'Master expressing doubts, wishes, and hypothetical situations in complex sentences.',
      iconType: 'wand'
    },
    {
      id: 'lesson-2',
      tag: 'B1 | INTERMEDIATE',
      title: 'Past Tense Irregulars',
      description: 'Conjugate high-frequency irregular preterite verbs seamlessly in conversation.',
      iconType: 'clock'
    },
    {
      id: 'lesson-3',
      tag: 'A2 | ELEMENTARY',
      title: 'Travel Essentials',
      description: 'Key phrases for navigating airports, hotel check-in, and local transport.',
      iconType: 'plane'
    }
  ],
  slipUps: [
    {
      id: 'slip-1',
      phrase: 'Ojalá que...',
      explanation: 'Confused indicative vs subjunctive usage after expressions of hope.'
    },
    {
      id: 'slip-2',
      phrase: 'Por vs Para',
      explanation: 'Used "por" instead of "para" when indicating deadline or purpose.'
    }
  ]
};

// Helper for rendering lesson icons dynamically
const renderLessonIcon = (iconType: string) => {
  switch (iconType) {
    case 'wand':
      return <Wand2 className="h-6 w-6" />;
    case 'clock':
      return <Clock className="h-6 w-6" />;
    case 'plane':
      return <Plane className="h-6 w-6" />;
    default:
      return <BookOpen className="h-6 w-6" />;
  }
};

// ── 2. REACT COMPONENT ──────────────────────────────────────────────────────

const HomeScreen: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { userData: liveUserData, isLoading, resetAllUserProgress } = useUserData();
  const statsXp = useStatsStore((s) => s.xp);
  const learnedVocab = useStatsStore((s) => s.learnedVocab);
  const completedLessons = useStatsStore((s) => s.completedLessons);

  // Component State
  const [userData] = useState<MockUserData>(initialMockUserData);
  const [showResetModal, setShowResetModal] = useState(false);

  // User details derived from Clerk & Supabase user_progress
  const displayName = user?.firstName || user?.fullName || 'Traveler';
  const userAvatar = user?.imageUrl;
  const currentXp = Math.max(liveUserData?.xp ?? 0, statsXp ?? 0);
  const levelNumber = Math.max(1, Math.floor(currentXp / 600) + 1);
  const maxXp = levelNumber * 600;

  const levelBadge =
    levelNumber >= 5 ? 'C1' :
    levelNumber === 4 ? 'B2' :
    levelNumber === 3 ? 'B1' :
    levelNumber === 2 ? 'A2' : 'A1';

  const levelName =
    levelNumber >= 5 ? 'Advanced' :
    levelNumber === 4 ? 'Upper Intermediate' :
    levelNumber === 3 ? 'Intermediate' :
    levelNumber === 2 ? 'Elementary' : 'Beginner';

  // ── Live Dashboard Metrics (derived from statsStore) ──
  const vocabCount = learnedVocab.length;
  const completedLessonCount = Object.values(completedLessons).filter(Boolean).length;
  const totalLessons = 37;

  // Categorize learned vocab by level tiers based on questId/lesson progression
  const liveLexiconStats = useMemo(() => {
    // Map words to difficulty tiers based on when they were learned
    const beginner = learnedVocab.filter((v) => {
      const num = parseInt(v.questId.replace(/\D/g, ''), 10);
      return !isNaN(num) && num <= 10;
    }).length;
    const basic = learnedVocab.filter((v) => {
      const num = parseInt(v.questId.replace(/\D/g, ''), 10);
      return !isNaN(num) && num > 10 && num <= 20;
    }).length;
    const intermediate = learnedVocab.filter((v) => {
      const num = parseInt(v.questId.replace(/\D/g, ''), 10);
      return !isNaN(num) && num > 20 && num <= 30;
    }).length;
    const advanced = learnedVocab.filter((v) => {
      const num = parseInt(v.questId.replace(/\D/g, ''), 10);
      return !isNaN(num) && num > 30;
    }).length;

    const stats: { level: string; words: number }[] = [];
    if (beginner > 0) stats.push({ level: 'Beginner (A1)', words: beginner });
    if (basic > 0) stats.push({ level: 'Basic (A2)', words: basic });
    if (intermediate > 0) stats.push({ level: 'Intermediate (B1)', words: intermediate });
    if (advanced > 0) stats.push({ level: 'Advanced (B2+)', words: advanced });

    // If no vocab learned yet, show encouraging placeholder
    if (stats.length === 0) {
      stats.push({ level: 'Getting Started', words: 0 });
    }
    return stats;
  }, [learnedVocab]);

  const currentQuest = useDailyQuestStore((s) => s.currentQuest);
  const pendingQuestTask = useMemo(() => {
    return currentQuest?.tasks.find((t) => !t.completed);
  }, [currentQuest]);

  const nextUncompletedLessonNum = useMemo(() => {
    for (let i = 1; i <= 37; i++) {
      if (!completedLessons[`lesson${i}`]) return i;
    }
    return 1;
  }, [completedLessons]);

  // Vault Insights Randomized Shuffle State (95 items from vaultInsightsData)
  const [insightIndex, setInsightIndex] = useState<number>(() =>
    Math.floor(Math.random() * vaultInsights.length)
  );
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isInsightHovered, setIsInsightHovered] = useState<boolean>(false);

  // Interval timer for 3.5s randomized shuffle
  useEffect(() => {
    if (isInsightHovered) return;

    const interval = setInterval(() => {
      setFadeState('fade-out');

      setTimeout(() => {
        setInsightIndex((prevIndex) => {
          if (vaultInsights.length <= 1) return prevIndex;
          let nextIndex = Math.floor(Math.random() * vaultInsights.length);
          while (nextIndex === prevIndex) {
            nextIndex = Math.floor(Math.random() * vaultInsights.length);
          }
          return nextIndex;
        });
        setFadeState('fade-in');
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [isInsightHovered]);

  const currentInsight = vaultInsights[insightIndex] || vaultInsights[0];

  // Dynamic Goal Circumference: Circumference = 2 * PI * 18 = 113.1
  const goalDashOffset = useMemo(() => {
    const circumference = 113.1;
    const percentage = userData.userProgress.dailyGoalPercentage;
    return circumference - (circumference * percentage) / 100;
  }, [userData.userProgress.dailyGoalPercentage]);

  const weeklyActivity = useStatsStore((s) => s.weeklyActivity) || DEFAULT_WEEKLY_ACTIVITY;

  const totalWeeklyMinutes = useMemo(
    () => weeklyActivity.reduce((acc, curr) => acc + curr.minutes, 0),
    [weeklyActivity]
  );

  const avgDailyMinutes = useMemo(
    () => Math.round(totalWeeklyMinutes / 7),
    [totalWeeklyMinutes]
  );

  const maxWeeklyMinutes = useMemo(
    () => Math.max(...weeklyActivity.map((d) => d.minutes), 15),
    [weeklyActivity]
  );

  // ── SKELETON LOADER (Executive Dark Glass Style) ──────────────────────────
  if (isLoading) {
    return (
      <div className="w-full text-slate-100 font-sans py-2 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-slate-800 rounded-xl border border-slate-700" />
            <div className="h-4 w-72 bg-slate-800/70 rounded-lg border border-slate-700" />
          </div>
          <div className="h-14 w-44 bg-slate-800 rounded-2xl border border-slate-700" />
        </div>

        {/* Dashboard Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 h-[420px] bg-slate-900/80 rounded-3xl border border-slate-700/80 p-6 flex flex-col justify-between" />
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="h-44 bg-slate-900/80 rounded-3xl border border-slate-700/80 p-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-44 bg-slate-900/80 rounded-3xl border border-slate-700/80 p-6" />
              <div className="h-44 bg-slate-900/80 rounded-3xl border border-slate-700/80 p-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-text-primary font-sans space-y-8 py-2">
        
        {/* ── HERO HEADER SECTION ─────────────────────────────────── */}
        <div className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {userAvatar && (
              <img
                src={userAvatar}
                alt={displayName}
                className="w-14 h-14 rounded-full border-2 border-[#7D927D]/60 shadow-md object-cover shrink-0"
              />
            )}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">
                Welcome, {displayName}
              </h1>
              <p className="font-sans text-xs md:text-sm text-text-secondary mt-1 max-w-xl leading-relaxed">
                The path to fluency is paved with consistency. Track your growth and master new patterns today.
              </p>
            </div>
          </div>

          {/* Right Aligned Widgets & Reset Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer"
              title="Reset XP and Coins to restart your journey"
            >
              <RotateCcw size={14} />
              <span>Reset Progress</span>
            </button>

            <div className="flex items-center gap-3.5 bg-bg-elevated-2 border border-structural/40 rounded-2xl px-5 py-3 shadow-xs">
              <div className="relative shrink-0 flex items-center justify-center">
                <svg width="44" height="44" className="transform -rotate-90">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    className="stroke-structural fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    className="stroke-[#7D927D] fill-none"
                    strokeWidth="4"
                    strokeDasharray="113.1"
                    strokeDashoffset={goalDashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-sans text-[10px] font-bold text-text-primary">
                  {userData.userProgress.dailyGoalPercentage}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#7D927D] font-bold">
                  DAILY GOAL
                </span>
                <span className="font-sans text-xs font-bold text-text-primary">
                  {userData.userProgress.dailyGoalPercentage}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN DASHBOARD GRID ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Course Level Activity Rings (5 of 12 cols) */}
          <div className="lg:col-span-5">
            <AppleActivityCard
              level={levelBadge}
              levelName={levelName}
              xpData={{
                label: "XP PROGRESS",
                sublabel: `Level ${levelNumber} Journey`,
                current: currentXp,
                target: maxXp,
                unit: "XP",
                color: "#D97706",
                endColor: "#F59E0B",
              }}
              modulesData={{
                label: "COURSE MASTERY",
                sublabel: "Modules Completed",
                current: completedLessonCount,
                target: totalLessons,
                unit: "MODS",
                color: "#10B981",
                endColor: "#34D399",
              }}
              vocabData={{
                label: "VOCAB MASTERED",
                sublabel: `${levelBadge} Lexicon Set`,
                current: vocabCount,
                target: Math.max(vocabCount + 10, 60),
                unit: "WORDS",
                color: "#0EA5E9",
                endColor: "#38BDF8",
              }}
            />
          </div>

          {/* Right: Weekly Activity + small widgets (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Weekly Activity — Dynamic Aesthetic */}
            <div className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 shadow-sm rounded-3xl p-6 relative overflow-hidden">
              {/* Subtle ambient glow behind chart */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7D927D]/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#D4A574]/6 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-1 relative z-10">
                <div>
                  <h2 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
                    Weekly Activity
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#5E735E] animate-pulse" />
                  </h2>
                  <p className="font-sans text-xs text-text-secondary mt-0.5">Study minutes tracked this week</p>
                </div>
                <span className="font-sans text-[11px] font-bold text-[#5E735E] bg-[#7D927D]/15 border border-[#7D927D]/30 px-3 py-1.5 rounded-full shrink-0 shadow-xs backdrop-blur-sm">
                  Avg {avgDailyMinutes}m / day
                </span>
              </div>

              {/* Summary Stats Row */}
              <div className="flex items-center gap-2 mb-5 relative z-10">
                <div className="flex-1 bg-gradient-to-r from-[#7D927D]/10 to-transparent border border-[#7D927D]/20 rounded-xl px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Total</p>
                  <p className="font-serif text-base font-bold text-text-primary">{totalWeeklyMinutes}<span className="text-xs font-sans text-text-secondary ml-0.5">min</span></p>
                </div>
                <div className="flex-1 bg-gradient-to-r from-[#D4A574]/10 to-transparent border border-[#D4A574]/20 rounded-xl px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Best Day</p>
                  <p className="font-serif text-base font-bold text-text-primary">
                    {Math.max(...weeklyActivity.map(d => d.minutes))}<span className="text-xs font-sans text-text-secondary ml-0.5">min</span>
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-r from-[#5E735E]/10 to-transparent border border-[#5E735E]/20 rounded-xl px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Active</p>
                  <p className="font-serif text-base font-bold text-text-primary">
                    {weeklyActivity.filter(d => d.minutes > 0).length}<span className="text-xs font-sans text-text-secondary ml-0.5">days</span>
                  </p>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="flex items-end justify-between gap-2 sm:gap-3 h-44 relative z-10">
                {weeklyActivity.map((d, i) => {
                  const hasActivity = d.minutes > 0;
                  const calculatedPct = Math.round((d.minutes / maxWeeklyMinutes) * 100);
                  const barHeight = hasActivity ? Math.max(calculatedPct, 20) : 6;
                  const todayDayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(new Date().getDay() + 6) % 7];
                  const isToday = d.day === todayDayName;
                  const isBestDay = d.minutes === Math.max(...weeklyActivity.map(x => x.minutes)) && d.minutes > 0;

                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer h-full justify-end"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {/* Minutes label — appears on hover or when active */}
                      <div className={`transition-all duration-300 transform ${
                        hasActivity
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 group-hover:opacity-70 translate-y-1 group-hover:translate-y-0'
                      }`}>
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all ${
                          isBestDay
                            ? 'text-[#D4A574] bg-[#D4A574]/15 border border-[#D4A574]/30'
                            : hasActivity
                              ? 'text-[#5E735E] bg-[#7D927D]/15 border border-[#7D927D]/25'
                              : 'text-text-tertiary'
                        }`}>
                          {d.minutes}m
                        </span>
                      </div>

                      {/* Bar Column */}
                      <div className={`w-full flex-1 rounded-2xl overflow-hidden flex flex-col justify-end relative transition-all duration-300 ${
                        isToday
                          ? 'ring-2 ring-[#7D927D]/40 ring-offset-1 ring-offset-bg-elevated'
                          : ''
                      }`}>
                        {/* Track background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/60 to-[#EDE8DF]/80 border border-structural/30 rounded-2xl" />
                        
                        {/* Filled bar with gradient */}
                        <div
                          className={`relative w-full rounded-2xl transition-all duration-700 ease-out group-hover:scale-x-105 ${
                            hasActivity
                              ? isBestDay
                                ? 'bg-gradient-to-t from-[#8B6E4E] via-[#D4A574] to-[#E8C9A0] shadow-[0_-4px_20px_rgba(212,165,116,0.3)]'
                                : 'bg-gradient-to-t from-[#4A5E4A] via-[#5E735E] to-[#7D927D] shadow-[0_-4px_20px_rgba(125,146,125,0.25)]'
                              : 'bg-structural/20'
                          }`}
                          style={{
                            height: `${barHeight}%`,
                            transitionDelay: `${i * 60}ms`,
                          }}
                        >
                          {/* Shine effect on active bars */}
                          {hasActivity && (
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-white/40 rounded-full" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Day Label */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className={`font-sans text-[11px] transition-all duration-300 ${
                          isToday
                            ? 'font-extrabold text-[#5E735E]'
                            : hasActivity
                              ? 'font-semibold text-text-primary group-hover:text-[#5E735E]'
                              : 'text-text-tertiary font-medium group-hover:text-text-secondary'
                        }`}>
                          {d.day}
                        </span>
                        {/* Today dot indicator */}
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5E735E] animate-pulse shadow-[0_0_6px_rgba(94,115,94,0.5)]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lexicon Growth + Vault Insights side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Lexicon Growth */}
              <div className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 text-text-primary shadow-sm rounded-3xl p-5 flex flex-col gap-3">
                <div className="border-b border-structural/40 pb-2.5">
                  <h2 className="font-serif text-base font-bold text-text-primary">Lexicon Growth</h2>
                  <p className="font-sans text-[11px] text-text-secondary mt-0.5">Mastered vocabulary by tier</p>
                </div>
                <div className="space-y-2">
                  {liveLexiconStats.map((item) => (
                    <div key={item.level} className="flex items-center justify-between text-xs font-sans p-2.5 rounded-xl bg-bg-elevated-2 border border-structural/40 text-text-primary">
                      <span className="text-text-primary font-medium">{item.level}</span>
                      <span className="bg-[#7D927D]/15 text-[#5E735E] font-mono font-semibold border border-[#7D927D]/30 px-2.5 py-0.5 rounded-lg text-[11px]">
                        {item.words} words
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-structural/40 pt-2.5">
                  <span className="font-sans text-[11px] text-text-secondary">
                    Total: <strong className="text-text-primary">{vocabCount} Words</strong> mastered
                  </span>
                </div>
              </div>

              {/* Vault Insights */}
              <div
                onMouseEnter={() => setIsInsightHovered(true)}
                onMouseLeave={() => setIsInsightHovered(false)}
                className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 shadow-sm rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between text-text-primary group transition-all"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-[#7D927D]">
                  <Lightbulb className="w-28 h-28 text-[#7D927D]" />
                </div>
                <div className={`transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#5E735E] bg-[#7D927D]/15 border border-[#7D927D]/30 px-2.5 py-0.5 rounded-full">
                      {currentInsight.tag}
                    </span>
                    <span className="font-sans text-[9px] font-medium text-text-secondary bg-bg-elevated-2 border border-structural/40 px-2 py-0.5 rounded-full shrink-0">
                      {currentInsight.category}
                    </span>
                  </div>
                  <p className="font-serif italic text-sm text-[#2C1E11] leading-relaxed min-h-[52px]">
                    &ldquo;{currentInsight.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-structural/40 mt-2">
                  <span className="text-[10px] font-sans text-text-secondary">
                    Vault Insight #{insightIndex + 1}
                  </span>
                  <div
                    className="flex items-center gap-1.5 text-[#5E735E]"
                    title={isInsightHovered ? "Paused on hover" : "Vault shuffling insights..."}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isInsightHovered ? '' : 'animate-pulse'}`} />
                    <span className="text-[9px] font-mono text-[#5E735E]/80">100 INSIGHTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. MIDDLE SECTION: RECOMMENDED NEXT LESSONS & CONTINUITY HERO ────────────── */}
        <div className="space-y-6">
          {/* Dynamic "Next Up For You" Hero Card */}
          <div className="bg-gradient-to-r from-[#7D927D]/20 via-[#5E735E]/15 to-transparent border border-[#7D927D]/40 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-[#7D927D]/20 border border-[#7D927D]/40 text-[#5E735E] rounded-2xl shrink-0 shadow-xs">
                <Target className="h-7 w-7 text-[#5E735E]" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#5E735E] bg-[#7D927D]/15 border border-[#7D927D]/30 px-2.5 py-0.5 rounded-full">
                  NEXT RECOMMENDED STEP FOR YOU
                </span>
                <h3 className="font-serif text-xl font-bold text-text-primary mt-1.5">
                  {pendingQuestTask
                    ? pendingQuestTask.description
                    : `Continue Lesson ${nextUncompletedLessonNum} in Basic Español`}
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-1 max-w-xl leading-relaxed">
                  Connected to your personal history ({vocabCount} vocabulary words mastered, {completedLessonCount} lessons done). Pick up right where you left off!
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(pendingQuestTask?.action_route || '/practice')}
              className="bg-[#7D927D] hover:bg-[#6B826B] text-white font-bold px-6 py-3 rounded-2xl font-sans text-xs transition-all shadow-md cursor-pointer border-none shrink-0 flex items-center gap-2"
            >
              <span>Resume Activity &gt;</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-text-primary">
              Recommended next lessons
            </h2>
            <button
              onClick={() => navigate('/library')}
              className="font-sans text-xs font-semibold text-[#5E735E] hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              View curriculum &gt;
            </button>
          </div>

          {/* Dynamic 3-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.recommendedLessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 hover:border-[#7D927D]/50 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300"
              >
                {/* Top half */}
                <div className="bg-bg-elevated-2 p-6 flex flex-col justify-between h-32 border-b border-structural/40 relative">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#5E735E] font-bold">
                    {lesson.tag}
                  </span>
                  <div className="flex items-center justify-center my-auto">
                    <div className={`p-3 rounded-2xl border shadow-xs ${
                      idx % 2 === 0
                        ? 'bg-[#7D927D]/15 border-[#7D927D]/30 text-[#5E735E]'
                        : 'bg-[#5E735E]/15 border-[#5E735E]/30 text-[#2C1E11]'
                    }`}>
                      {renderLessonIcon(lesson.iconType)}
                    </div>
                  </div>
                </div>

                {/* Bottom half */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-text-primary">
                      {lesson.title}
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/training')}
                    className="w-full bg-[#7D927D] hover:bg-[#6B826B] text-white font-bold rounded-full py-2.5 font-sans text-xs transition-all cursor-pointer border-none flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Start Lesson &gt;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. BOTTOM SECTION: RECENT SLIP-UPS ─────────────────────── */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Recent Slip-ups
            </h2>
            <AlertTriangle className="h-4 w-4 text-[#C4796B]" />
          </div>

          {/* Dynamic 2-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.slipUps.map((item) => (
              <div
                key={item.id}
                className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 hover:border-[#7D927D]/50 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-[#C4796B]/15 border border-[#C4796B]/30 flex items-center justify-center text-[#C4796B] shrink-0 mt-0.5 shadow-xs">
                    <Repeat className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-text-primary truncate">
                      {item.phrase}
                    </h4>
                    <p className="font-sans text-xs text-text-secondary mt-0.5 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/training')}
                  className="p-2.5 rounded-xl text-[#7D927D] hover:bg-bg-elevated-2 border border-structural/40 transition-colors cursor-pointer shrink-0"
                  title="Review phrase"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── RESET PROGRESS CONFIRMATION MODAL ──────────────────────── */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 max-w-md w-full rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4 text-center text-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mx-auto shadow-md">
                <RotateCcw size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">
                Restart Your Journey?
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Are you sure you want to reset your progress? This will reset your XP to 0, coins to 100, and unlock status so you can collect rewards and practice all over again with full enthusiasm!
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 text-xs font-semibold text-[#F8FAFC] bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await resetAllUserProgress();
                    setShowResetModal(false);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors shadow-lg shadow-rose-950/50 cursor-pointer border-none"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default HomeScreen;
