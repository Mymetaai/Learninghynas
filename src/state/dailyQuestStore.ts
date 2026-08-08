// Daily Quest store — dynamic user-level progress driven quest generation & live task tracking.
// Generates personalized daily quests based on user level, lesson progress, vocab, AI companion, and streak.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';
import { getCurrentUserId, fetchTodayDailyQuest, syncDailyQuest } from '../lib/supabaseClient';

export type QuestTaskType =
  | 'vocab_review'
  | 'sentence_builder'
  | 'lesson_progress'
  | 'ai_companion'
  | 'streak_maintain';

export interface QuestTask {
  id: string;
  type: QuestTaskType;
  description: string;
  target_count: number;
  current_count: number;
  xp_reward: number;
  completed: boolean;
  action_route?: string;
}

export interface UserDailyQuest {
  id?: string;
  user_id?: string;
  quest_date: string; // YYYY-MM-DD
  tasks: QuestTask[];
  total_xp_reward: number;
  completed_task_ids: string[];
  all_completed: boolean;
  generated_at: string;
}

/** Local timezone date string helper YYYY-MM-DD */
export const getLocalTodayKey = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Deterministic hashing for daily rotation */
function hashDateString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * CORE GENERATION LOGIC: generateDailyQuest
 * Scales task targets and XP rewards according to user's real stats & level.
 */
export function generateDailyQuest(
  userId: string = 'guest',
  dateStr: string = getLocalTodayKey()
): UserDailyQuest {
  const stats = useStatsStore.getState();
  const xp = stats.xp || 0;
  const userLevel = Math.max(1, Math.floor(xp / 600) + 1);
  const streak = stats.streak || 1;
  const completedLessons = stats.completedLessons || {};
  const learnedVocabCount = stats.learnedVocab?.length || 0;

  // Derive CEFR level & base XP reward
  let cefrLevel = 'A1';
  if (userLevel >= 16) cefrLevel = 'C1';
  else if (userLevel >= 11) cefrLevel = 'B2';
  else if (userLevel >= 7) cefrLevel = 'B1';
  else if (userLevel >= 4) cefrLevel = 'A2';

  const baseTaskXP = Math.round(20 + Math.min(30, (userLevel - 1) * 3));

  // Determine current lesson number
  let currentLessonNum = 1;
  for (let i = 1; i <= 37; i++) {
    if (!completedLessons[`lesson${i}`]) {
      currentLessonNum = i;
      break;
    }
  }

  const tasks: QuestTask[] = [];
  const seed = hashDateString(`${userId}-${dateStr}`);

  // 1. Streak Maintenance Task
  tasks.push({
    id: 'task_streak_maintain',
    type: 'streak_maintain',
    description: `Log in and complete 1 activity today (${streak}-day streak)`,
    target_count: 1,
    current_count: 1, // Auto-marked 1 on daily login
    xp_reward: Math.round(baseTaskXP * 0.7),
    completed: true,
    action_route: '/learn',
  });

  // 2. Vocab Review Task
  const vocabTarget = Math.max(5, Math.min(20, 5 + Math.floor(userLevel * 1.5)));
  tasks.push({
    id: 'task_vocab_review',
    type: 'vocab_review',
    description: `Review ${vocabTarget} vocabulary words in Training Grounds (${learnedVocabCount} learned)`,
    target_count: vocabTarget,
    current_count: 0,
    xp_reward: Math.round(baseTaskXP * 1.2),
    completed: false,
    action_route: '/practice',
  });

  // 3. Sentence Builder Task
  const sentenceTarget = Math.max(3, Math.min(10, 3 + Math.floor(userLevel * 0.8)));
  tasks.push({
    id: 'task_sentence_builder',
    type: 'sentence_builder',
    description: `Build ${sentenceTarget} Spanish sentences in Lesson ${currentLessonNum} (${cefrLevel})`,
    target_count: sentenceTarget,
    current_count: 0,
    xp_reward: Math.round(baseTaskXP * 1.3),
    completed: false,
    action_route: '/learn',
  });

  // 4. Lesson Progress Task
  const hasStartedLesson = completedLessons[`lesson${currentLessonNum}`];
  tasks.push({
    id: 'task_lesson_progress',
    type: 'lesson_progress',
    description: hasStartedLesson
      ? `Start Lesson ${currentLessonNum + 1} in Basic Español`
      : `Finish Lesson ${currentLessonNum} in Basic Español`,
    target_count: 1,
    current_count: 0,
    xp_reward: Math.round(baseTaskXP * 1.5),
    completed: false,
    action_route: '/learn',
  });

  // 5. AI Companion / Feynman Drill Task (rotates)
  const aiModes = [
    { title: 'Practice 1 conversation in Active Immersion AI', route: '/ai-immersion' },
    { title: 'Teach the Chibi mascot 1 concept using Feynman Technique', route: '/practice' },
    { title: 'Complete 1 Escenarios Reales dialogue with Yuki', route: '/scenarios' },
  ];
  const selectedAiMode = aiModes[seed % aiModes.length];

  tasks.push({
    id: 'task_ai_companion',
    type: 'ai_companion',
    description: selectedAiMode.title,
    target_count: 1,
    current_count: 0,
    xp_reward: Math.round(baseTaskXP * 1.4),
    completed: false,
    action_route: selectedAiMode.route,
  });

  const totalXP = tasks.reduce((sum, t) => sum + t.xp_reward, 0);

  return {
    user_id: userId,
    quest_date: dateStr,
    tasks,
    total_xp_reward: totalXP,
    completed_task_ids: tasks.filter((t) => t.completed).map((t) => t.id),
    all_completed: false,
    generated_at: new Date().toISOString(),
  };
}

export interface DailyQuestState {
  currentQuest: UserDailyQuest | null;
  isLoading: boolean;
  dailyBonusClaimed: boolean;

  /** Fetch existing quest for today or generate new dynamic quest */
  loadTodayQuest: (userId?: string | null) => Promise<UserDailyQuest>;

  /** Update current count for a specific task type */
  updateTaskProgress: (type: QuestTaskType, increment?: number) => void;

  /** Claim daily completion bonus */
  claimDailyBonus: () => void;

  /** Reset daily quest store state */
  resetDailyQuests: () => void;
}

export const useDailyQuestStore = create<DailyQuestState>()(
  persist(
    (set, get) => ({
      currentQuest: null,
      isLoading: false,
      dailyBonusClaimed: false,

      resetDailyQuests: () => set({ currentQuest: null, dailyBonusClaimed: false, isLoading: false }),

      loadTodayQuest: async (userId?: string | null) => {
        const uid = userId || getCurrentUserId() || 'guest';
        const today = getLocalTodayKey();

        set({ isLoading: true });

        // 1. Check local state
        const local = get().currentQuest;
        if (local && local.quest_date === today) {
          set({ isLoading: false });
          return local;
        }

        // 2. Try fetching from Supabase daily_quests table if authenticated
        let remoteQuest: any = null;
        if (uid !== 'guest') {
          remoteQuest = await fetchTodayDailyQuest(uid, today);
        }

        if (remoteQuest && remoteQuest.tasks) {
          const loadedQuest: UserDailyQuest = {
            id: remoteQuest.id,
            user_id: remoteQuest.user_id,
            quest_date: remoteQuest.quest_date,
            tasks: remoteQuest.tasks as QuestTask[],
            total_xp_reward: remoteQuest.total_xp_reward || 100,
            completed_task_ids: remoteQuest.completed_task_ids || [],
            all_completed: remoteQuest.all_completed || false,
            generated_at: remoteQuest.generated_at || new Date().toISOString(),
          };

          set({
            currentQuest: loadedQuest,
            dailyBonusClaimed: loadedQuest.all_completed,
            isLoading: false,
          });
          return loadedQuest;
        }

        // 3. Generate new personalized daily quest
        const newQuest = generateDailyQuest(uid, today);

        set({
          currentQuest: newQuest,
          dailyBonusClaimed: false,
          isLoading: false,
        });

        // Persist to Supabase in background
        if (uid !== 'guest') {
          syncDailyQuest(newQuest, uid);
        }

        return newQuest;
      },

      updateTaskProgress: (type: QuestTaskType, increment: number = 1) => {
        const state = get();
        const quest = state.currentQuest;
        if (!quest) return;

        const today = getLocalTodayKey();
        if (quest.quest_date !== today) return; // Expired quest

        let updatedAny = false;
        let xpToAward = 0;

        const updatedTasks = quest.tasks.map((task) => {
          if (task.type !== type || task.completed) return task;

          const newCount = Math.min(task.target_count, task.current_count + increment);
          const nowCompleted = newCount >= task.target_count;

          if (nowCompleted && !task.completed) {
            xpToAward += task.xp_reward;
            updatedAny = true;
          } else if (newCount !== task.current_count) {
            updatedAny = true;
          }

          return {
            ...task,
            current_count: newCount,
            completed: nowCompleted,
          };
        });

        if (!updatedAny) return;

        const completedIds = updatedTasks.filter((t) => t.completed).map((t) => t.id);
        const allCompleted = updatedTasks.every((t) => t.completed);

        const updatedQuest: UserDailyQuest = {
          ...quest,
          tasks: updatedTasks,
          completed_task_ids: completedIds,
          all_completed: allCompleted,
        };

        set({ currentQuest: updatedQuest });

        // Award XP once on transition
        if (xpToAward > 0) {
          useStatsStore.getState().addRewards(xpToAward, Math.round(xpToAward / 3));
        }

        // Auto-award bonus if all completed
        if (allCompleted && !state.dailyBonusClaimed) {
          useStatsStore.getState().addRewards(75, 30);
          set({ dailyBonusClaimed: true });
        }

        // Sync to Supabase
        const uid = quest.user_id || getCurrentUserId() || 'guest';
        if (uid !== 'guest') {
          syncDailyQuest(updatedQuest, uid);
        }
      },

      claimDailyBonus: () => {
        const state = get();
        if (state.currentQuest?.all_completed && !state.dailyBonusClaimed) {
          useStatsStore.getState().addRewards(75, 30);
          set({ dailyBonusClaimed: true });
        }
      },
    }),
    {
      name: 'wayfarer-daily-quest-store',
      partialize: (s) => ({
        currentQuest: s.currentQuest,
        dailyBonusClaimed: s.dailyBonusClaimed,
      }),
    }
  )
);
