import { useState, useMemo, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  AlertTriangle,
  RotateCw,
  Repeat,
  Wand2,
  Clock,
  Plane,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { vaultInsights } from '../data/vaultInsightsData';

// ── 1. MOCK DATA STORE (Simulated API Response) ─────────────────────────────

export interface UserProgressData {
  currentXp: number;
  maxXp: number;
  level: string;
  levelName: string;
  dailyGoalPercentage: number;
}

export interface WeeklyActivityItem {
  day: string;
  minutes: number;
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
    currentXp: 350,
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

  // Component State (Simulating live data fetched from API)
  const [userData] = useState<MockUserData>(initialMockUserData);

  // Vault Insights Randomized Shuffle State (95 items from vaultInsightsData)
  const [insightIndex, setInsightIndex] = useState<number>(() =>
    Math.floor(Math.random() * vaultInsights.length)
  );
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isInsightHovered, setIsInsightHovered] = useState<boolean>(false);

  // Interval timer for 3.5s randomized shuffle (no-repeat logic + hover pause + 300ms fade)
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

  // Dynamic Progress Calculation
  const progressPercentage = useMemo(() => {
    const { currentXp, maxXp } = userData.userProgress;
    return Math.min(Math.round((currentXp / maxXp) * 100), 100);
  }, [userData.userProgress]);

  // Dynamic Goal Circumference: Circumference = 2 * PI * 18 = 113.1
  const goalDashOffset = useMemo(() => {
    const circumference = 113.1;
    const percentage = userData.userProgress.dailyGoalPercentage;
    return circumference - (circumference * percentage) / 100;
  }, [userData.userProgress.dailyGoalPercentage]);

  // Dynamic Level Ring Circumference: Circumference = 2 * PI * 60 = 377
  const levelDashOffset = useMemo(() => {
    const circumference = 377;
    return circumference - (circumference * progressPercentage) / 100;
  }, [progressPercentage]);

  // Dynamic Max Weekly Minutes for relative bar height
  const maxWeeklyMinutes = useMemo(() => {
    return Math.max(...userData.weeklyActivity.map((d) => d.minutes), 45);
  }, [userData.weeklyActivity]);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2F353B] font-sans p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* ── HERO HEADER SECTION ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-[#777775]/20">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2F353B]">
              Your Journey
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#777775] mt-1 max-w-xl leading-relaxed">
              The path to fluency is paved with consistency. Track your growth and master new patterns today.
            </p>
          </div>

          {/* Right Aligned Daily Goal Widget */}
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

        {/* ── TOP GRID LAYOUT (3 Columns, 2 Rows) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column (Spans 2 Rows): Course Level Card */}
          <div className="md:row-span-2 bg-white border border-[#777775]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[360px]">
            <div className="border-b border-[#777775]/15 pb-3">
              <h2 className="font-serif text-lg font-bold text-[#2F353B]">Course Level</h2>
              <p className="font-sans text-xs text-[#777775] mt-0.5">CEFR Assessment Standard</p>
            </div>

            {/* Centerpiece: Large Thin Circular Ring */}
            <div className="flex flex-col items-center justify-center py-6 my-auto">
              <div className="relative flex items-center justify-center">
                <svg width="140" height="140" className="transform -rotate-90">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    className="stroke-[#F9F7F2] fill-none"
                    strokeWidth="5"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    className="stroke-[#7D927D] fill-none"
                    strokeWidth="5"
                    strokeDasharray="377"
                    strokeDashoffset={levelDashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-3xl font-bold text-[#2F353B]">
                    {userData.userProgress.level}
                  </span>
                  <span className="font-sans text-xs text-[#777775] mt-0.5">
                    {userData.userProgress.levelName}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Thin Linear Progress Bar */}
            <div className="space-y-2 border-t border-[#777775]/15 pt-4">
              <div className="w-full h-2 bg-[#F9F7F2] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7D927D] rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
              <div className="flex items-center justify-between font-sans text-xs text-[#777775] font-medium">
                <span>{userData.userProgress.currentXp} XP</span>
                <span>{userData.userProgress.maxXp} XP</span>
              </div>
            </div>
          </div>

          {/* Top Right (Spans 2 Columns): Weekly Activity Card */}
          <div className="md:col-span-2 bg-white border border-[#777775]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div className="flex items-center justify-between border-b border-[#777775]/15 pb-3">
              <h2 className="font-serif text-lg font-bold text-[#2F353B]">Weekly Activity</h2>
              <span className="font-sans text-xs text-[#777775]">Average 30m / day</span>
            </div>

            {/* Flat Bar Chart Dynamically Mapped */}
            <div className="flex items-end justify-between gap-3 h-28 pt-4">
              {userData.weeklyActivity.map((d) => {
                const heightPercent = Math.round((d.minutes / maxWeeklyMinutes) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div 
                      className="w-full bg-[#7D927D] rounded-t-md hover:opacity-90 transition-all duration-300"
                      style={{ height: `${Math.max(heightPercent, 10)}%` }}
                      title={`${d.day}: ${d.minutes} mins`}
                    />
                    <span className="font-sans text-xs text-[#777775] group-hover:text-[#2F353B] transition-colors">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Middle: Lexicon Growth Card */}
          <div className="bg-white border border-[#777775]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[170px]">
            <div className="border-b border-[#777775]/15 pb-3">
              <h2 className="font-serif text-base font-bold text-[#2F353B]">Lexicon Growth</h2>
            </div>
            
            {/* Dynamic Lexicon List Mapping */}
            <div className="space-y-2.5 py-2">
              {userData.lexiconStats.map((item) => (
                <div key={item.level} className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#2F353B] font-medium">{item.level}</span>
                  <span className="text-[#777775] font-semibold">{item.words} words</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Right: Whimsical Vault Insights Widget */}
          <div
            onMouseEnter={() => setIsInsightHovered(true)}
            onMouseLeave={() => setIsInsightHovered(false)}
            className="bg-[#2F353B] border border-[#777775]/20 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between text-white min-h-[180px] group transition-all"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <Lightbulb className="w-32 h-32 text-white" />
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
              <p className="font-serif italic text-sm text-white/95 leading-relaxed min-h-[56px]">
                &ldquo;{currentInsight.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
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

      </div>
    </div>
  );
};

export default HomeScreen;
