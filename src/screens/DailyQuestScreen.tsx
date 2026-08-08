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
  const { userData } = useUserData();
  const { streak, coins, xp } = useStatsStore();

  const loadTodayQuest = useDailyQuestStore((s) => s.loadTodayQuest);
  const currentQuest = useDailyQuestStore((s) => s.currentQuest);
  const dailyBonusClaimed = useDailyQuestStore((s) => s.dailyBonusClaimed);
  const isLoading = useDailyQuestStore((s) => s.isLoading);

  const [confetti, setConfetti] = useState(false);

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
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#7D927D]/15 text-[#5E735E] border border-[#7D927D]/30 self-start sm:self-auto">
              Level {userLevel} • {currentQuest?.quest_date || 'Today'}
            </span>
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
    </div>
  );
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl border p-4.5 transition-all shadow-xs relative overflow-hidden ${
        task.completed
          ? 'bg-[#7D927D]/10 border-[#7D927D]/30 opacity-90'
          : 'bg-bg-elevated border-structural hover:border-[#7D927D]/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-xl shrink-0 border ${task.completed ? 'bg-[#7D927D]/20 border-[#7D927D]/40 text-[#5E735E]' : 'bg-bg-base border-structural'}`}>
            {task.completed ? <CheckCircle2 className="h-5 w-5 text-[#5E735E]" /> : icon}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${badge.color}`}>
                {badge.label}
              </span>
              {task.completed && (
                <span className="font-mono text-[10px] font-bold text-[#5E735E]">
                  Completed ✓
                </span>
              )}
            </div>

            <p className="font-sans text-xs sm:text-sm font-bold text-text-primary leading-snug">
              {task.description}
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-text-tertiary pt-0.5">
              <span>Progress: {task.current_count} / {task.target_count}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#D4A574]/15 text-[#8B6E4E] border border-[#D4A574]/30">
            +{task.xp_reward} XP
          </span>

          {!task.completed && task.action_route && (
            <button
              onClick={() => onNavigate(task.action_route!)}
              className="font-mono text-[11px] font-bold text-[#5E735E] hover:text-[#4A5E4A] bg-[#7D927D]/10 hover:bg-[#7D927D]/20 border border-[#7D927D]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Go</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Task Progress Bar */}
      <div className="mt-3.5 h-1.5 w-full rounded-full bg-structural/30 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${task.completed ? 'bg-[#5E735E]' : 'bg-gradient-to-r from-[#7D927D] to-[#D4A574]'}`}
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
