import { useState, useMemo, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useUserData } from '../hooks/useUserData';
import { useStatsStore, DEFAULT_WEEKLY_ACTIVITY, type WeeklyActivityItem } from '../state/statsStore';
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
  Sparkles
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
    <div className="w-full text-slate-100 font-sans space-y-8 py-2">
        
        {/* ── HERO HEADER SECTION ─────────────────────────────────── */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {userAvatar && (
              <img
                src={userAvatar}
                alt={displayName}
                className="w-14 h-14 rounded-full border-2 border-amber-500/60 shadow-lg shadow-amber-500/20 object-cover shrink-0"
              />
            )}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#F8FAFC]">
                Welcome, {displayName}
              </h1>
              <p className="font-sans text-xs md:text-sm text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
                The path to fluency is paved with consistency. Track your growth and master new patterns today.
              </p>
            </div>
          </div>

          {/* Right Aligned Widgets & Reset Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-2xl transition-all shadow-sm shrink-0 cursor-pointer"
              title="Reset XP and Coins to restart your journey"
            >
              <RotateCcw size={14} />
              <span>Reset Progress</span>
            </button>

            <div className="flex items-center gap-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl px-5 py-3 shadow-md">
              <div className="relative shrink-0 flex items-center justify-center">
                <svg width="44" height="44" className="transform -rotate-90">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    className="stroke-slate-700 fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    className="stroke-[#D97706] fill-none drop-shadow-[0_0_6px_rgba(217,119,6,0.6)]"
                    strokeWidth="4"
                    strokeDasharray="113.1"
                    strokeDashoffset={goalDashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-sans text-[10px] font-bold text-[#F8FAFC]">
                  {userData.userProgress.dailyGoalPercentage}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] uppercase tracking-wider text-amber-400/90 font-semibold">
                  DAILY GOAL
                </span>
                <span className="font-sans text-xs font-bold text-[#F8FAFC]">
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
                current: 18,
                target: 24,
                unit: "MODS",
                color: "#10B981",
                endColor: "#34D399",
              }}
              vocabData={{
                label: "VOCAB MASTERED",
                sublabel: "B2 Lexicon Set",
                current: 42,
                target: 60,
                unit: "WORDS",
                color: "#0EA5E9",
                endColor: "#38BDF8",
              }}
            />
          </div>

          {/* Right: Weekly Activity + small widgets (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Weekly Activity */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl p-6">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-5">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#F8FAFC]">Weekly Activity</h2>
                  <p className="font-sans text-xs text-[#94A3B8] mt-0.5">Study minutes tracked this week</p>
                </div>
                <span className="font-sans text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full shrink-0 shadow-sm">
                  Avg {avgDailyMinutes}m / day
                </span>
              </div>
              
              <div className="flex items-end justify-between gap-3 h-36 pt-2">
                {weeklyActivity.map((d) => {
                  const hasActivity = d.minutes > 0;
                  const calculatedPct = Math.round((d.minutes / maxWeeklyMinutes) * 100);
                  // Ensure active days get a tall, clearly readable bar (minimum 35% height)
                  const barHeight = hasActivity ? Math.max(calculatedPct, 35) : 8;
                  const todayDayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(new Date().getDay() + 6) % 7];
                  const isToday = d.day === todayDayName;

                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                      {/* Minutes badge above bar */}
                      <span className={`font-mono text-[10px] transition-all duration-300 ${
                        hasActivity
                          ? 'font-black text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)] px-2 py-0.5 rounded-md scale-105'
                          : 'font-semibold text-slate-500 group-hover:text-slate-300'
                      }`}>
                        {d.minutes}m
                      </span>

                      {/* Bar Track Container */}
                      <div className="w-full h-24 bg-slate-800/80 border border-slate-700/60 rounded-xl overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                        <div
                          className={`w-full transition-all duration-500 rounded-lg ${
                            hasActivity
                              ? 'bg-gradient-to-t from-amber-500 via-amber-600 to-emerald-500 shadow-[0_0_12px_rgba(245,158,11,0.3)] border-t border-amber-300/40'
                              : 'bg-slate-700/40 rounded-md'
                          }`}
                          style={{ height: `${barHeight}%` }}
                          title={`${d.day}: ${d.minutes} mins`}
                        />
                      </div>

                      {/* Day Label */}
                      <span className={`font-sans text-[11px] transition-all ${
                        isToday
                          ? 'font-extrabold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-md'
                          : 'text-[#94A3B8] font-semibold group-hover:text-[#F8FAFC]'
                      }`}>
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lexicon Growth + Vault Insights side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Lexicon Growth */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 text-slate-100 shadow-2xl rounded-3xl p-5 flex flex-col gap-3">
                <div className="border-b border-slate-700/80 pb-2.5">
                  <h2 className="font-serif text-base font-bold text-[#F8FAFC]">Lexicon Growth</h2>
                  <p className="font-sans text-[11px] text-[#94A3B8] mt-0.5">Mastered vocabulary by tier</p>
                </div>
                <div className="space-y-2">
                  {userData.lexiconStats.map((item) => (
                    <div key={item.level} className="flex items-center justify-between text-xs font-sans p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-100">
                      <span className="text-[#F8FAFC] font-medium">{item.level}</span>
                      <span className="bg-slate-800/80 text-emerald-400 font-mono font-semibold border border-emerald-500/30 px-2.5 py-0.5 rounded-lg text-[11px]">
                        {item.words} words
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-700/80 pt-2.5">
                  <span className="font-sans text-[11px] text-[#94A3B8]">
                    Total: <strong className="text-[#F8FAFC]">26 Words</strong> mastered
                  </span>
                </div>
              </div>

              {/* Vault Insights */}
              <div
                onMouseEnter={() => setIsInsightHovered(true)}
                onMouseLeave={() => setIsInsightHovered(false)}
                className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between text-slate-100 group transition-all"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-amber-500">
                  <Lightbulb className="w-28 h-28 text-amber-500" />
                </div>
                <div className={`transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      {currentInsight.tag}
                    </span>
                    <span className="font-sans text-[9px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-2 py-0.5 rounded-full shrink-0">
                      {currentInsight.category}
                    </span>
                  </div>
                  <p className="font-serif italic text-sm text-amber-200/95 leading-relaxed min-h-[52px]">
                    &ldquo;{currentInsight.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-700/80 mt-2">
                  <span className="text-[10px] font-sans text-[#94A3B8]">
                    Vault Insight #{insightIndex + 1}
                  </span>
                  <div
                    className="flex items-center gap-1.5 text-amber-400"
                    title={isInsightHovered ? "Paused on hover" : "Vault shuffling insights..."}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isInsightHovered ? '' : 'animate-pulse'}`} />
                    <span className="text-[9px] font-mono text-amber-400/60">95 INSIGHTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. MIDDLE SECTION: RECOMMENDED NEXT LESSONS ────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#F8FAFC]">
              Recommended next lessons
            </h2>
            <button
              onClick={() => navigate('/library')}
              className="font-sans text-xs font-semibold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              View curriculum &gt;
            </button>
          </div>

          {/* Dynamic 3-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.recommendedLessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-amber-500/10"
              >
                {/* Top half */}
                <div className="bg-slate-800/60 p-6 flex flex-col justify-between h-32 border-b border-slate-700/60 relative">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400/90 font-bold">
                    {lesson.tag}
                  </span>
                  <div className="flex items-center justify-center my-auto">
                    <div className={`p-3 rounded-2xl border shadow-lg ${
                      idx % 2 === 0
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-amber-500/10'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10'
                    }`}>
                      {renderLessonIcon(lesson.iconType)}
                    </div>
                  </div>
                </div>

                {/* Bottom half */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#F8FAFC]">
                      {lesson.title}
                    </h3>
                    <p className="font-sans text-xs text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/training')}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 rounded-full py-2.5 font-sans text-xs transition-all cursor-pointer border-none flex items-center justify-center gap-1"
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
            <h2 className="font-serif text-xl font-bold text-[#F8FAFC]">
              Recent Slip-ups
            </h2>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>

          {/* Dynamic 2-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.slipUps.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-5 shadow-2xl flex items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-sm">
                    <Repeat className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#F8FAFC] truncate">
                      {item.phrase}
                    </h4>
                    <p className="font-sans text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/training')}
                  className="p-2.5 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-slate-800/80 border border-slate-700/60 transition-colors cursor-pointer shrink-0"
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
