// Daily Quest Dashboard — Dynamic, personalized daily quests driven by Supabase user progress data.
import { useEffect, useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Flame,
  CheckCircle2,
  Trophy,
  Sparkles,
  Zap,
  Coins,
  Star,
  BookOpen,
  Brain,
  ArrowRight,
  Target,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { useDailyQuestStore, type QuestTask, type QuestTaskType } from '../state/dailyQuestStore';
import { useStatsStore } from '../state/statsStore';
import { useUserData } from '../hooks/useUserData';
import Confetti from '../components/Confetti';

interface DailyQuestScreenProps {
  onActiveQuestChange?: (active: boolean) => void;
}

const TASK_ICONS: Record<QuestTaskType, React.ReactNode> = {
  streak_maintain: <Flame className="h-5 w-5 text-streak-warm" />,
  vocab_review: <BookOpen className="h-5 w-5 text-[#7D927D]" />,
  sentence_builder: <Target className="h-5 w-5 text-[#D4A574]" />,
  lesson_progress: <Zap className="h-5 w-5 text-[#5E735E]" />,
  ai_companion: <Brain className="h-5 w-5 text-accent-action" />,
};

const TASK_BADGES: Record<QuestTaskType, { label: string; color: string }> = {
  streak_maintain: { label: 'Racha', color: 'bg-streak-warm/15 text-streak-warm border-streak-warm/30' },
  vocab_review: { label: 'Vocabulario', color: 'bg-[#7D927D]/15 text-[#5E735E] border-[#7D927D]/30' },
  sentence_builder: { label: 'Gramática', color: 'bg-[#D4A574]/15 text-[#8B6E4E] border-[#D4A574]/30' },
  lesson_progress: { label: 'Lección', color: 'bg-[#5E735E]/15 text-[#5E735E] border-[#5E735E]/30' },
  ai_companion: { label: 'Compañero IA', color: 'bg-accent-action/15 text-accent-action border-accent-action/30' },
};

const DailyQuestScreen: FC<DailyQuestScreenProps> = () => {
  const navigate = useNavigate();
  const { userData, resetAllUserProgress } = useUserData();
  const { streak: rawStreak, coins, xp, weeklyActivity } = useStatsStore();
  const hasActiveHistory = xp > 0 || (weeklyActivity && weeklyActivity.some((d) => d.minutes > 0));
  const streak = hasActiveHistory ? Math.max(1, rawStreak) : rawStreak;

  const loadTodayQuest = useDailyQuestStore((s) => s.loadTodayQuest);
  const currentQuest = useDailyQuestStore((s) => s.currentQuest);
  const dailyBonusClaimed = useDailyQuestStore((s) => s.dailyBonusClaimed);
  const isLoading = useDailyQuestStore((s) => s.isLoading);

  const [confetti, setConfetti] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleConfirmReset = async () => {
    setIsResetting(true);
    await resetAllUserProgress();
    await loadTodayQuest(userData?.user_id || null);
    setIsResetting(false);
    setShowResetConfirm(false);
  };

  useEffect(() => {
    loadTodayQuest(userData?.user_id || null);
  }, [userData?.user_id, loadTodayQuest]);

  useEffect(() => {
    if (currentQuest?.all_completed) {
      setConfetti(true);
      const timer = setTimeout(() => setConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentQuest?.all_completed]);

  const tasks = currentQuest?.tasks || [];
  const completedTasks = tasks.filter((t) => t.completed);
  const doneCount = completedTasks.length;
  const totalTasks = tasks.length;
  const progressPct = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  const earnedXP = completedTasks.reduce((sum, t) => sum + t.xp_reward, 0);
  const totalXP = currentQuest?.total_xp_reward || tasks.reduce((sum, t) => sum + t.xp_reward, 0);
  const userLevel = Math.max(1, Math.floor((xp || 0) / 600) + 1);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-sans">
      <Confetti fire={confetti} />

      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-structural bg-gradient-to-br from-accent-action/10 via-bg-base to-streak-warm/10 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-accent-action" />
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent-action font-semibold">
              Misión Diaria Personalizada
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
            <h1 className="font-serif text-3xl font-bold text-text-primary">
              Today's Quest
            </h1>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#7D927D]/15 text-[#5E735E] border border-[#7D927D]/30">
                Level {userLevel} • {currentQuest?.quest_date || 'Today'}
              </span>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-streak-warm/15 text-streak-warm border border-streak-warm/30 hover:bg-streak-warm/25 transition-all cursor-pointer flex items-center gap-1"
                title="Reset All Progress & Quests"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            </div>
          </div>

          <p className="mt-2 font-sans text-sm text-text-secondary">
            Fresh personalized tasks generated from your real lesson progress, vocabulary, and streak. Complete them all for a bonus!
          </p>

          {/* Live stats cluster */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <DashStat
              icon={<Flame size={14} className="text-streak-warm animate-pulse" />}
              label="Streak"
              value={`${streak} days`}
            />
            <DashStat
              icon={<Star size={14} className="text-accent-action" />}
              label="Tasks Done"
              value={`${doneCount}/${totalTasks}`}
            />
            <DashStat
              icon={<Zap size={14} className="text-[#5E735E]" />}
              label="XP Earned Today"
              value={`${earnedXP}/${totalXP}`}
            />
            <DashStat
              icon={<Coins size={14} className="text-accent-action" />}
              label="Coins"
              value={`${coins}`}
            />
          </div>

          {/* Daily progress bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="uppercase tracking-wider text-text-secondary font-bold">
                Daily Completion Progress
              </span>
              <span className="text-accent-action font-bold">
                {progressPct}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-structural/40 overflow-hidden">
              <motion.div
                className="h-2.5 rounded-full bg-gradient-to-r from-accent-action via-[#7D927D] to-streak-warm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Task list container */}
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        {isLoading ? (
          <div className="text-center py-12 space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-text-tertiary border-t-[#7D927D] mx-auto" />
            <p className="font-mono text-xs text-text-tertiary">Generating today's personalized quest...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-bg-elevated rounded-2xl border border-structural p-6">
            <p className="font-sans text-sm text-text-secondary">No quest tasks found for today.</p>
            <button
              onClick={() => loadTodayQuest(userData?.user_id)}
              className="mt-3 font-mono text-xs text-[#7D927D] underline cursor-pointer"
            >
              Retry Quest Generation
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <AnimatePresence>
              {tasks.map((task, idx) => (
                <TaskCard
                  key={task.id || `task-${idx}`}
                  task={task}
                  index={idx}
                  onNavigate={(route) => navigate(route)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Daily Bonus Banner */}
        <div className="mt-6">
          {currentQuest?.all_completed || dailyBonusClaimed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-[#7D927D]/40 bg-[#7D927D]/10 p-5 text-center space-y-1.5 shadow-xs"
            >
              <Trophy size={26} className="mx-auto text-[#7D927D]" />
              <p className="font-serif text-base font-bold text-[#5E735E]">
                ¡Felicidades! Daily Quest Completed 🎉
              </p>
              <p className="font-mono text-xs font-bold text-[#8B6E4E]">
                Bonus Claimed: +75 XP • +30 Coins
              </p>
              <p className="font-sans text-xs text-text-secondary pt-1">
                You've completed all tasks for today. Come back tomorrow for a fresh custom quest set!
              </p>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#7D927D]/30 bg-bg-elevated/50 p-4 text-center space-y-1">
              <Sparkles size={18} className="mx-auto text-amber-500" />
              <p className="font-sans text-xs text-text-secondary">
                Complete all tasks today to claim your <strong className="text-text-primary">+75 XP & +30 Coins</strong> daily completion bonus!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reset Progress Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-structural bg-bg-elevated p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3 text-streak-warm">
                <div className="p-2.5 rounded-xl bg-streak-warm/15 border border-streak-warm/30">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text-primary">
                    Reset All Progress & Quests?
                  </h3>
                  <p className="font-mono text-xs text-text-tertiary">
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>

              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Pressing reset will wipe your daily quests, XP, level, coins, learned vocabulary, immersion messages, and lesson progress from <strong>Supabase</strong>, <strong>Zustand stores</strong>, and <strong>local storage</strong> across the entire app.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  disabled={isResetting}
                  className="px-4 py-2 rounded-xl font-mono text-xs font-bold border border-structural bg-bg-base hover:bg-bg-elevated-2 text-text-primary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReset}
                  disabled={isResetting}
                  className="px-5 py-2 rounded-xl font-mono text-xs font-bold bg-streak-warm text-white hover:bg-streak-warm/90 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  {isResetting ? (
                    <span>Resetting...</span>
                  ) : (
                    <>
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Confirm Reset All</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Task Route Resolver ──────────────────────────────────────────────────── */

const resolveTaskRoute = (task: QuestTask): string => {
  switch (task.type) {
    case 'vocab_review':
      return '/practice';
    case 'sentence_builder':
    case 'lesson_progress':
      return '/basic-espanol';
    case 'ai_companion':
      if (task.description.includes('Active Immersion') || task.description.includes('Escenarios')) {
        return '/companion';
      }
      return '/practice';
    case 'streak_maintain':
    default:
      return task.action_route && task.action_route !== '/learn' ? task.action_route : '/basic-espanol';
  }
};

/* ── Task Card Component ─────────────────────────────────────────────────── */

interface TaskCardProps {
  task: QuestTask;
  index: number;
  onNavigate: (route: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, index, onNavigate }) => {
  const badge = TASK_BADGES[task.type] || { label: 'Misión', color: 'bg-structural/30 text-text-primary' };
  const icon = TASK_ICONS[task.type] || <Star className="h-5 w-5 text-accent-action" />;
  const pct = Math.round((task.current_count / task.target_count) * 100);
  const targetRoute = resolveTaskRoute(task);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl border p-5 sm:p-6 transition-all shadow-xs relative overflow-hidden flex flex-col justify-between gap-4 ${
        task.completed
          ? 'bg-[#7D927D]/10 border-[#7D927D]/30 opacity-90'
          : 'bg-bg-elevated/90 backdrop-blur-md border-structural/60 hover:border-[#7D927D]/50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left side: Icon + Content */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className={`p-3 rounded-2xl shrink-0 border shadow-xs ${task.completed ? 'bg-[#7D927D]/20 border-[#7D927D]/40 text-[#5E735E]' : 'bg-bg-base border-structural/60'}`}>
            {task.completed ? <CheckCircle2 className="h-5 w-5 text-[#5E735E]" /> : icon}
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md border ${badge.color}`}>
                {badge.label}
              </span>
              {task.completed && (
                <span className="font-mono text-[10px] font-bold text-[#5E735E] bg-[#7D927D]/15 px-2 py-0.5 rounded-md border border-[#7D927D]/30">
                  Completed ✓
                </span>
              )}
            </div>

            <h3 className="font-sans text-sm sm:text-base font-bold text-text-primary leading-snug">
              {task.description}
            </h3>

            <div className="flex items-center gap-2 font-mono text-[11px] text-text-tertiary pt-0.5">
              <span>Progress: {task.current_count} / {task.target_count}</span>
            </div>
          </div>
        </div>

        {/* Right side: XP Reward + Go Button */}
        <div className="flex flex-col items-end justify-between gap-3 shrink-0">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#D4A574]/15 text-[#8B6E4E] border border-[#D4A574]/30 shadow-xs">
            +{task.xp_reward} XP
          </span>

          <button
            onClick={() => onNavigate(targetRoute)}
            className={`font-mono text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border ${
              task.completed
                ? 'bg-bg-base border-structural/40 text-text-tertiary hover:bg-bg-elevated-2'
                : 'bg-[#7D927D] hover:bg-[#6B826B] text-white border-transparent shadow-sm'
            }`}
          >
            <span>{task.completed ? 'Review' : 'Go'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Task Progress Bar */}
      <div className="h-2 w-full rounded-full bg-structural/30 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${task.completed ? 'bg-[#5E735E]' : 'bg-gradient-to-r from-[#7D927D] to-[#D4A574]'}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </motion.div>
  );
};

/* ── Live DashStat widget ─────────────────────────────────────────────────── */

interface DashStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DashStat: FC<DashStatProps> = ({ icon, label, value }) => (
  <div className="rounded-xl border border-structural bg-bg-elevated/70 p-3 shadow-xs flex items-center gap-2.5">
    <div className="shrink-0">{icon}</div>
    <div className="space-y-0.5 overflow-hidden">
      <p className="font-mono text-[10px] uppercase text-text-tertiary truncate">{label}</p>
      <p className="font-sans text-xs font-bold text-text-primary truncate">{value}</p>
    </div>
  </div>
);

export default DailyQuestScreen;
