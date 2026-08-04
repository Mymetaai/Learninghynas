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
      return <Wand2 className="h-8 w-8 text-[#7D927D]" />;
    case 'clock':
      return <Clock className="h-8 w-8 text-[#7D927D]" />;
    case 'plane':
      return <Plane className="h-8 w-8 text-[#7D927D]" />;
    default:
      return <BookOpen className="h-8 w-8 text-[#7D927D]" />;
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
    () => Math.max(...weeklyActivity.map((d) => d.minutes), 30),
    [weeklyActivity]
  );

  // ── SKELETON LOADER (Serene Lexicon Style) ──────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full text-[#2F353B] font-sans py-2 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-[#777775]/20">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-white rounded-xl border border-[#777775]/10" />
            <div className="h-4 w-72 bg-white/70 rounded-lg border border-[#777775]/10" />
          </div>
          <div className="h-14 w-44 bg-white rounded-2xl border border-[#777775]/20" />
        </div>

        {/* Dashboard Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 h-[420px] bg-white rounded-2xl border border-[#777775]/20 p-6 flex flex-col justify-between" />
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="h-44 bg-white rounded-2xl border border-[#777775]/20 p-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-44 bg-white rounded-2xl border border-[#777775]/20 p-6" />
              <div className="h-44 bg-[#2F353B]/10 rounded-2xl border border-[#777775]/20 p-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-[#2F353B] font-sans space-y-8 py-2">
        
        {/* ── HERO HEADER SECTION ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-[#777775]/20">
          <div className="flex items-center gap-4">
            {userAvatar && (
              <img
                src={userAvatar}
                alt={displayName}
                className="w-12 h-12 rounded-full border-2 border-[#7D927D]/40 shadow-sm object-cover shrink-0"
              />
            )}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2F353B]">
                Welcome, {displayName}
              </h1>
              <p className="font-sans text-xs md:text-sm text-[#777775] mt-1 max-w-xl leading-relaxed">
                The path to fluency is paved with consistency. Track your growth and master new patterns today.
              </p>
            </div>
          </div>

          {/* Right Aligned Widgets & Reset Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-rose-600 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 rounded-2xl transition-all shadow-sm shrink-0 cursor-pointer"
              title="Reset XP and Coins to restart your journey"
            >
              <RotateCcw size={14} />
              <span>Reset Progress</span>
            </button>

            <div className="flex items-center gap-3 bg-white border border-[#777775]/20 rounded-2xl px-5 py-3 shadow-sm">
              <div className="relative shrink-0 flex items-center justify-center">
                <svg width="44" height="44" className="transform -rotate-90">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    className="stroke-[#F9F7F2] fill-none"
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
                <span className="absolute font-sans text-[10px] font-bold text-[#2F353B]">
                  {userData.userProgress.dailyGoalPercentage}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#777775] font-semibold">
                  DAILY GOAL
                </span>
                <span className="font-sans text-xs font-bold text-[#2F353B]">
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
                color: "#C4796B",
                endColor: "#E09385",
              }}
              modulesData={{
                label: "COURSE MASTERY",
                sublabel: "Modules Completed",
                current: 18,
                target: 24,
                unit: "MODS",
                color: "#7D927D",
                endColor: "#9BB39B",
              }}
              vocabData={{
                label: "VOCAB MASTERED",
                sublabel: "B2 Lexicon Set",
                current: 42,
                target: 60,
                unit: "WORDS",
                color: "#4A7B9D",
                endColor: "#679ABF",
              }}
            />
          </div>

          {/* Right: Weekly Activity + small widgets (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Weekly Activity */}
            <div className="bg-white border border-[#777775]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#777775]/15 pb-3 mb-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#2F353B]">Weekly Activity</h2>
                  <p className="font-sans text-xs text-[#777775] mt-0.5">Study minutes tracked this week</p>
                </div>
                <span className="font-sans text-[11px] font-semibold text-[#7D927D] bg-[#F9F7F2] border border-[#777775]/20 px-3 py-1 rounded-full shrink-0">
                  Avg {avgDailyMinutes}m / day
                </span>
              </div>
              <div className="flex items-end justify-between gap-3 h-28">
                {weeklyActivity.map((d) => {
                  const heightPercent = Math.round((d.minutes / maxWeeklyMinutes) * 100);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                      <span className="font-mono text-[10px] text-[#777775] opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.minutes}m
                      </span>
                      <div
                        className="w-full bg-[#7D927D] rounded-t-md group-hover:bg-[#6B826B] transition-colors duration-200"
                        style={{ height: `${Math.max(heightPercent, 8)}%` }}
                        title={`${d.day}: ${d.minutes} mins`}
                      />
                      <span className="font-sans text-[11px] text-[#777775] group-hover:text-[#2F353B] font-medium transition-colors">
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
              <div className="bg-white border border-[#777775]/20 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                <div className="border-b border-[#777775]/15 pb-2.5">
                  <h2 className="font-serif text-base font-bold text-[#2F353B]">Lexicon Growth</h2>
                  <p className="font-sans text-[11px] text-[#777775] mt-0.5">Mastered vocabulary by tier</p>
                </div>
                <div className="space-y-2">
                  {userData.lexiconStats.map((item) => (
                    <div key={item.level} className="flex items-center justify-between text-xs font-sans p-2 rounded-lg bg-[#F9F7F2]/60 border border-[#777775]/10">
                      <span className="text-[#2F353B] font-medium">{item.level}</span>
                      <span className="text-[#7D927D] font-mono font-semibold">{item.words} words</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#777775]/15 pt-2.5">
                  <span className="font-sans text-[11px] text-[#777775]">
                    Total: <strong className="text-[#2F353B]">26 Words</strong> mastered
                  </span>
                </div>
              </div>

              {/* Vault Insights */}
              <div
                onMouseEnter={() => setIsInsightHovered(true)}
                onMouseLeave={() => setIsInsightHovered(false)}
                className="bg-[#2F353B] border border-[#777775]/20 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between text-white group transition-all"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                  <Lightbulb className="w-28 h-28 text-white" />
                </div>
                <div className={`transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#7D927D]">
                      {currentInsight.tag}
                    </span>
                    <span className="font-sans text-[9px] font-medium text-white/70 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 shrink-0">
                      {currentInsight.category}
                    </span>
                  </div>
                  <p className="font-serif italic text-sm text-white/95 leading-relaxed min-h-[52px]">
                    &ldquo;{currentInsight.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10 mt-2">
                  <span className="text-[10px] font-sans text-white/60">
                    Vault Insight #{insightIndex + 1}
                  </span>
                  <div
                    className="flex items-center gap-1.5 text-[#7D927D]"
                    title={isInsightHovered ? "Paused on hover" : "Vault shuffling insights..."}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isInsightHovered ? '' : 'animate-pulse'}`} />
                    <span className="text-[9px] font-mono text-white/40">95 INSIGHTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. MIDDLE SECTION: RECOMMENDED NEXT LESSONS ────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#2F353B]">
              Recommended next lessons
            </h2>
            <button
              onClick={() => navigate('/library')}
              className="font-sans text-xs font-semibold text-[#7D927D] hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              View curriculum &gt;
            </button>
          </div>

          {/* Dynamic 3-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.recommendedLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white border border-[#777775]/20 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                {/* Top half */}
                <div className="bg-[#F9F7F2] p-6 flex flex-col justify-between h-32 border-b border-[#777775]/20 relative">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#777775] font-semibold">
                    {lesson.tag}
                  </span>
                  <div className="flex items-center justify-center my-auto">
                    {renderLessonIcon(lesson.iconType)}
                  </div>
                </div>

                {/* Bottom half */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#2F353B]">
                      {lesson.title}
                    </h3>
                    <p className="font-sans text-xs text-[#777775] mt-1 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/training')}
                    className="w-full bg-[#7D927D] hover:bg-[#6B826B] text-white rounded-full py-2.5 font-sans text-xs font-semibold transition-all cursor-pointer border-none shadow-sm"
                  >
                    Start Lesson &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. BOTTOM SECTION: RECENT SLIP-UPS ─────────────────────── */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#2F353B]">
              Recent Slip-ups
            </h2>
            <AlertTriangle className="h-4 w-4 text-[#777775]" />
          </div>

          {/* Dynamic 2-Column Grid Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.slipUps.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#777775]/20 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-[#F9F7F2] border border-[#777775]/20 flex items-center justify-center text-[#777775] shrink-0 mt-0.5">
                    <Repeat className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#2F353B] truncate">
                      {item.phrase}
                    </h4>
                    <p className="font-sans text-xs text-[#777775] mt-0.5 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/training')}
                  className="p-2 rounded-full text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2] transition-colors cursor-pointer shrink-0 border-none"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-[#777775]/20 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <RotateCcw size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2F353B]">
                Restart Your Journey?
              </h3>
              <p className="text-xs text-[#777775] leading-relaxed">
                Are you sure you want to reset your progress? This will reset your XP to 0, coins to 100, and unlock status so you can collect rewards and practice all over again with full enthusiasm!
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#777775]/20 text-xs font-semibold text-[#2F353B] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await resetAllUserProgress();
                    setShowResetModal(false);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-colors shadow-sm cursor-pointer"
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
