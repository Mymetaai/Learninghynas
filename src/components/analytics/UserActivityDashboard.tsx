// src/components/analytics/UserActivityDashboard.tsx
// Unified User Activity Analytics — 7-Day / 30-Day / All-Time views
// Single source of truth: statsStore (weeklyActivity + dailyHistory)
import React, { useState, useMemo } from 'react';
import { useStatsStore, DEFAULT_WEEKLY_ACTIVITY, type DailyActivityRecord } from '../../state/statsStore';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── Tab definitions ────────────────────────────────────── */
const tabs = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: 'allTime', label: 'All Time' },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─── Helper: build last-30-days array from dailyHistory ── */
const buildLast30Days = (dailyHistory: Record<string, { minutes?: number; xpEarned?: number }>) => {
  const list: { date: string; dayLabel: string; minutes: number; xp: number }[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateKey = `${y}-${m}-${day}`;
    const rec = dailyHistory[dateKey];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    list.push({
      date: dateKey,
      dayLabel,
      minutes: rec?.minutes || 0,
      xp: rec?.xpEarned || 0,
    });
  }
  return list;
};

/* ─── Framer Motion variants ─────────────────────────────── */
const panelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

/* ═══════════════════════════════════════════════════════════
   Main Exported Component
   ═══════════════════════════════════════════════════════════ */
export const UserActivityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('7d');

  // ─ Pull live data from statsStore ─
  const weeklyActivity = useStatsStore((s) => s.weeklyActivity) || DEFAULT_WEEKLY_ACTIVITY;
  const dailyHistory = useStatsStore((s) => s.dailyHistory) || {};

  // ─ Derived metrics ─
  const last30DaysActivity = useMemo(() => buildLast30Days(dailyHistory), [dailyHistory]);

  const totalWeeklyMinutes = useMemo(
    () => weeklyActivity.reduce((acc, curr) => acc + curr.minutes, 0),
    [weeklyActivity],
  );

  const total30DayMinutes = useMemo(
    () => last30DaysActivity.reduce((acc, curr) => acc + curr.minutes, 0),
    [last30DaysActivity],
  );

  const allTimeStats = useMemo(() => {
    const records = Object.values(dailyHistory) as DailyActivityRecord[];
    const totalMinutes = records.reduce((acc, r) => acc + (r.minutes ?? 0), 0);
    const bestMinutes = records.reduce((best, r) => Math.max(best, r.minutes ?? 0), 0);
    const activeDaysCount = records.filter(
      (r) => (r.minutes ?? 0) > 0 || (r.xpEarned ?? 0) > 0,
    ).length;
    return {
      totalMinutes: Math.max(totalMinutes, totalWeeklyMinutes),
      bestSession: Math.max(bestMinutes, ...weeklyActivity.map((d) => d.minutes), 0),
      activeDaysCount: Math.max(
        activeDaysCount,
        weeklyActivity.filter((d) => d.minutes > 0).length,
      ),
    };
  }, [dailyHistory, totalWeeklyMinutes, weeklyActivity]);

  const maxWeeklyMinutes = useMemo(
    () => Math.max(...weeklyActivity.map((d) => d.minutes), 15),
    [weeklyActivity],
  );

  const max30DayMinutes = useMemo(
    () => Math.max(...last30DaysActivity.map((d) => d.minutes), 15),
    [last30DaysActivity],
  );

  // ─ Summary row values per tab ─
  const summaryLabel =
    activeTab === '7d' ? 'Total Week' : activeTab === '30d' ? 'Total 30-Day' : 'All-Time Total';
  const summaryMinutes =
    activeTab === '7d'
      ? totalWeeklyMinutes
      : activeTab === '30d'
        ? total30DayMinutes
        : allTimeStats.totalMinutes;
  const bestSession =
    activeTab === '7d'
      ? Math.max(...weeklyActivity.map((d) => d.minutes), 0)
      : activeTab === '30d'
        ? Math.max(...last30DaysActivity.map((d) => d.minutes), 0)
        : allTimeStats.bestSession;
  const activeDays =
    activeTab === '7d'
      ? weeklyActivity.filter((d) => d.minutes > 0).length
      : activeTab === '30d'
        ? last30DaysActivity.filter((d) => d.minutes > 0).length
        : allTimeStats.activeDaysCount;

  return (
    <div className="bg-bg-elevated/90 backdrop-blur-xl border border-structural/40 shadow-sm rounded-3xl p-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7D927D]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#D4A574]/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header + Tab Pill Toggle ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-1 relative z-10 gap-3">
        <div>
          <h2 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
            {activeTab === '7d'
              ? 'Weekly Activity'
              : activeTab === '30d'
                ? '30-Day Activity'
                : 'All-Time Analytics'}
            <span className="inline-flex h-2 w-2 rounded-full bg-[#5E735E] animate-pulse" />
          </h2>
          <p className="font-sans text-xs text-text-secondary mt-0.5">
            {activeTab === '7d'
              ? 'Study minutes tracked this week'
              : activeTab === '30d'
                ? 'Study minutes tracked over past 30 days'
                : 'Comprehensive all-time study statistics'}
          </p>
        </div>

        {/* Pill toggle with animated indicator */}
        <div className="flex items-center gap-1 bg-bg-elevated-2 border border-structural/40 p-1 rounded-2xl shrink-0 w-full sm:w-auto justify-between sm:justify-start relative">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative z-10 flex-1 sm:flex-none px-3.5 sm:px-2.5 py-1.5 sm:py-1 text-xs sm:text-[11px] font-sans font-bold rounded-xl transition-colors cursor-pointer border-none text-center ${
                activeTab === t.id
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary bg-transparent'
              }`}
            >
              {t.label}
              {activeTab === t.id && (
                <motion.div
                  layoutId="activeAnalyticTab"
                  className="absolute inset-0 rounded-xl bg-[#7D927D] shadow-xs -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Summary Stats Row ── */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-5 relative z-10">
        <div className="flex-1 bg-gradient-to-r from-[#7D927D]/10 to-transparent border border-[#7D927D]/20 rounded-xl px-2 sm:px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-text-tertiary">
            {summaryLabel}
          </p>
          <p className="font-serif text-sm sm:text-base font-bold text-text-primary">
            {summaryMinutes}
            <span className="text-[10px] sm:text-xs font-sans text-text-secondary ml-0.5">min</span>
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-[#D4A574]/10 to-transparent border border-[#D4A574]/20 rounded-xl px-2 sm:px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-text-tertiary">
            Best Session
          </p>
          <p className="font-serif text-sm sm:text-base font-bold text-text-primary">
            {bestSession}
            <span className="text-[10px] sm:text-xs font-sans text-text-secondary ml-0.5">min</span>
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-[#5E735E]/10 to-transparent border border-[#5E735E]/20 rounded-xl px-2 sm:px-3 py-2 text-center sm:text-left">
          <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-text-tertiary">
            Active Days
          </p>
          <p className="font-serif text-sm sm:text-base font-bold text-text-primary">
            {activeDays}
            <span className="text-[10px] sm:text-xs font-sans text-text-secondary ml-0.5">days</span>
          </p>
        </div>
      </div>

      {/* ── Chart Area with AnimatePresence ── */}
      <AnimatePresence mode="wait">
        {activeTab === '7d' && (
          <motion.div key="7d" variants={panelVariants} initial="initial" animate="animate" exit="exit">
            <WeeklyBarChart data={weeklyActivity} maxMinutes={maxWeeklyMinutes} />
          </motion.div>
        )}
        {activeTab === '30d' && (
          <motion.div key="30d" variants={panelVariants} initial="initial" animate="animate" exit="exit">
            <ThirtyDayBarChart data={last30DaysActivity} maxMinutes={max30DayMinutes} />
          </motion.div>
        )}
        {activeTab === 'allTime' && (
          <motion.div key="allTime" variants={panelVariants} initial="initial" animate="animate" exit="exit">
            <AllTimeHeatmap
              data={last30DaysActivity}
              totalMinutes={allTimeStats.totalMinutes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Sub-Components
   ═══════════════════════════════════════════════════════════ */

/* ── 7-Day Weekly Bar Chart ─────────────────────────────── */
interface WeeklyBarChartProps {
  data: { day: string; minutes: number }[];
  maxMinutes: number;
}

const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ data, maxMinutes }) => {
  const todayDayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][
    (new Date().getDay() + 6) % 7
  ];
  const bestMinutes = Math.max(...data.map((x) => x.minutes));

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3 h-44 relative z-10">
      {data.map((d, i) => {
        const hasActivity = d.minutes > 0;
        const calculatedPct = Math.round((d.minutes / maxMinutes) * 100);
        const barHeight = hasActivity ? Math.max(calculatedPct, 20) : 6;
        const isToday = d.day === todayDayName;
        const isBestDay = d.minutes === bestMinutes && d.minutes > 0;

        return (
          <div
            key={d.day}
            className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer h-full justify-end"
          >
            {/* Minute label above bar */}
            <div
              className={`transition-all duration-300 transform ${
                hasActivity
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 group-hover:opacity-70 translate-y-1 group-hover:translate-y-0'
              }`}
            >
              <span
                className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all ${
                  isBestDay
                    ? 'text-[#D4A574] bg-[#D4A574]/15 border border-[#D4A574]/30'
                    : hasActivity
                      ? 'text-[#5E735E] bg-[#7D927D]/15 border border-[#7D927D]/25'
                      : 'text-text-tertiary'
                }`}
              >
                {d.minutes}m
              </span>
            </div>

            {/* Bar container */}
            <div
              className={`w-full flex-1 rounded-2xl overflow-hidden flex flex-col justify-end relative transition-all duration-300 ${
                isToday
                  ? 'ring-2 ring-[#7D927D]/40 ring-offset-1 ring-offset-bg-elevated'
                  : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/60 to-[#EDE8DF]/80 border border-structural/30 rounded-2xl" />
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
                {hasActivity && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-white/40 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                  </div>
                )}
              </div>
            </div>

            {/* Day label */}
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`font-sans text-[11px] transition-all duration-300 ${
                  isToday
                    ? 'font-extrabold text-[#5E735E]'
                    : hasActivity
                      ? 'font-semibold text-text-primary group-hover:text-[#5E735E]'
                      : 'text-text-tertiary font-medium group-hover:text-text-secondary'
                }`}
              >
                {d.day}
              </span>
              {isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E735E] animate-pulse shadow-[0_0_6px_rgba(94,115,94,0.5)]" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── 30-Day Bar Chart ────────────────────────────────────── */
interface ThirtyDayBarChartProps {
  data: { date: string; dayLabel: string; minutes: number; xp: number }[];
  maxMinutes: number;
}

const ThirtyDayBarChart: React.FC<ThirtyDayBarChartProps> = ({ data, maxMinutes }) => {
  const [selectedDay, setSelectedDay] = useState<{ date: string; minutes: number } | null>(null);

  return (
    <div className="space-y-2">
      {selectedDay && (
        <div className="bg-[#7D927D]/15 border border-[#7D927D]/30 rounded-xl px-3 py-1.5 text-center font-sans text-xs text-[#5E735E] font-bold animate-in fade-in duration-200 flex items-center justify-between">
          <span>{selectedDay.date}</span>
          <span>{selectedDay.minutes} min logged</span>
        </div>
      )}
      <div className="flex items-end justify-between gap-1 h-44 relative z-10 pt-2 overflow-x-auto">
        {data.map((d, i) => {
          const hasActivity = d.minutes > 0;
          const pct = Math.round((d.minutes / maxMinutes) * 100);
          const barHeight = hasActivity ? Math.max(pct, 15) : 4;
          const isToday = i === 29;
          const isSelected = selectedDay?.date === d.date;

          return (
            <div
              key={d.date}
              onClick={() => setSelectedDay(isSelected ? null : { date: d.date, minutes: d.minutes })}
              className="flex-1 flex flex-col items-center gap-1 group cursor-pointer h-full justify-end min-w-[8px] select-none"
              title={`${d.date}: ${d.minutes} study minutes`}
            >
              <div
                className={`w-full flex-1 rounded-lg overflow-hidden flex flex-col justify-end relative ${
                  isSelected
                    ? 'ring-2 ring-[#5E735E]'
                    : isToday
                      ? 'ring-1 ring-[#7D927D]'
                      : ''
                }`}
              >
                <div className="absolute inset-0 bg-structural/20 rounded-lg" />
                <div
                  className={`relative w-full rounded-lg transition-all duration-500 ${
                    hasActivity
                      ? 'bg-gradient-to-t from-[#4A5E4A] to-[#7D927D]'
                      : 'bg-transparent'
                  }`}
                  style={{ height: `${barHeight}%` }}
                />
              </div>
              <span className="font-mono text-[8px] text-text-tertiary">
                {i % 5 === 0 ? d.date.slice(8) : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── All-Time Heatmap (GitHub-style contribution grid) ─── */
interface AllTimeHeatmapProps {
  data: { date: string; dayLabel: string; minutes: number; xp: number }[];
  totalMinutes: number;
}

const AllTimeHeatmap: React.FC<AllTimeHeatmapProps> = ({ data, totalMinutes }) => {
  const [selectedCell, setSelectedCell] = useState<{ date: string; minutes: number } | null>(null);

  return (
    <div className="space-y-3 relative z-10 py-2">
      <div className="flex items-center justify-between text-xs font-sans text-text-secondary">
        <span>30-Day Activity Contribution Grid</span>
        <span className="font-mono font-bold text-[#5E735E]">{totalMinutes} total minutes</span>
      </div>

      {selectedCell && (
        <div className="bg-[#7D927D]/15 border border-[#7D927D]/30 rounded-xl px-3 py-1.5 text-center font-sans text-xs text-[#5E735E] font-bold animate-in fade-in duration-200 flex items-center justify-between">
          <span>{selectedCell.date}</span>
          <span>{selectedCell.minutes} study minutes</span>
        </div>
      )}

      <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-bg-elevated-2 border border-structural/40 rounded-2xl">
        {data.map((d) => {
          const mins = d.minutes;
          const isSelected = selectedCell?.date === d.date;
          const bgClass =
            mins > 30
              ? 'bg-[#5E735E] border-[#4A5E4A] text-white'
              : mins > 15
                ? 'bg-[#7D927D] border-[#6B826B] text-white'
                : mins > 0
                  ? 'bg-[#7D927D]/40 border-[#7D927D]/50 text-text-primary'
                  : 'bg-structural/20 border-structural/30 text-text-tertiary';

          return (
            <div
              key={d.date}
              onClick={() => setSelectedCell(isSelected ? null : { date: d.date, minutes: d.minutes })}
              className={`h-9 sm:h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${bgClass} ${
                isSelected ? 'ring-2 ring-[#5E735E] shadow-sm' : ''
              }`}
              title={`${d.date}: ${d.minutes} mins recorded`}
            >
              <span className="font-mono text-[10px] sm:text-[9px] font-bold">
                {d.date.slice(8)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 text-[10px] font-sans text-text-tertiary">
        <span>Less</span>
        <span className="w-2.5 h-2.5 rounded bg-structural/20 border border-structural/30" />
        <span className="w-2.5 h-2.5 rounded bg-[#7D927D]/40 border border-[#7D927D]/50" />
        <span className="w-2.5 h-2.5 rounded bg-[#7D927D]" />
        <span className="w-2.5 h-2.5 rounded bg-[#5E735E]" />
        <span>More</span>
      </div>
    </div>
  );
};

export default UserActivityDashboard;
