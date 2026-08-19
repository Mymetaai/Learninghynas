import { useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStatsStore } from '../../state/statsStore';
import { useDailyQuestStore } from '../../state/dailyQuestStore';
import { audioFeedback } from '../../utils/audioFeedback';

interface BeltRankStampProps {
  onDone: () => void;
}

export const BeltRankStamp: FC<BeltRankStampProps> = ({ onDone }) => {
  const learnedVocabCount = useStatsStore((s) => s.learnedVocab.length);

  // Determine Belt Rank based on vocabulary mastered
  const getBeltDetails = (count: number) => {
    if (count >= 200) return { rank: 'Black Belt', fill: '#0F172A', text: 'Master Rank (200+ Words)' };
    if (count >= 100) return { rank: 'Brown Belt', fill: '#78350F', text: 'Advanced Rank (100–199 Words)' };
    if (count >= 50) return { rank: 'Green Belt', fill: '#166534', text: 'Intermediate Rank (50–99 Words)' };
    if (count >= 20) return { rank: 'Yellow Belt', fill: '#A16207', text: 'Basic Rank (20–49 Words)' };
    return { rank: 'White Belt', fill: '#475569', text: 'Novice Rank (0–19 Words)' };
  };

  const belt = getBeltDetails(learnedVocabCount);

  useEffect(() => {
    // 1. Dispatch consolidated rewards (+50 XP, +25 KC)
    useStatsStore.getState().addRewards(50, 25);

    // 2. Dispatch task progress update
    useDailyQuestStore.getState().updateTaskProgress('vocab_review', 5);

    // 3. Audio celebration fanfare
    audioFeedback.playFeedback('success');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full bg-white dark:bg-bg-elevated border border-[#7D927D]/30 rounded-3xl p-8 shadow-xl relative overflow-hidden space-y-6"
      >
        {/* Background ambient glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#7D927D]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Dojo Seal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7D927D]/15 border border-[#7D927D]/30 text-[#5E735E] font-mono text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" /> Dojo Session Completed
        </div>

        {/* Animated Martial Arts Belt Stamp */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-[#F9F7F2] dark:bg-bg-base border border-[#7D927D]/20 shadow-inner"
        >
          {/* Belt Icon SVG */}
          <div
            className="w-20 h-20 flex items-center justify-center rounded-2xl text-4xl shadow-md border border-white/20"
            style={{ backgroundColor: belt.fill }}
          >
            🥋
          </div>

          <h3 className="font-serif text-2xl font-bold text-text-primary mt-2">
            {belt.rank} Stamp
          </h3>
          <p className="font-mono text-xs font-semibold text-text-secondary">
            {belt.text}
          </p>
        </motion.div>

        {/* Consolidated Rewards Display */}
        <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-[#7D927D]/10 border border-[#7D927D]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="font-mono text-lg font-bold text-[#5E735E]">+50 XP</span>
          </div>
          <div className="h-6 w-px bg-structural/40" />
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">
              +25 KC
            </span>
          </div>
        </div>

        {/* Return Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDone}
          className="w-full py-4 rounded-2xl bg-[#7D927D] hover:bg-[#6B826B] text-white font-serif font-bold text-base shadow-lg shadow-[#7D927D]/30 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <span>Return to Training Grounds</span>
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BeltRankStamp;
