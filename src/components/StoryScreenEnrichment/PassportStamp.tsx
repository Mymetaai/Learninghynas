import { useState, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
import { Check, Coins } from 'lucide-react';
import { useStoryProgressStore } from '../../state/storyProgressStore';

interface PassportStampProps {
  storyId: string;
  storyTitle: string;
  isCompleted: boolean;
  isLibrary?: boolean;
  vocabulary?: { word: string }[];
}

export const PassportStamp: FC<PassportStampProps> = ({
  storyId,
  storyTitle,
  isCompleted,
  isLibrary = true,
  vocabulary = [],
}) => {
  const getStoryStatus = useStoryProgressStore((s) => s.getStoryStatus);
  const markStoryStamped = useStoryProgressStore((s) => s.markStoryStamped);

  const status = getStoryStatus(storyId);
  const isAlreadyStamped = status === 'stamped';
  const [justStamped, setJustStamped] = useState(false);
  const [showCoinsReward, setShowCoinsReward] = useState(false);

  useEffect(() => {
    if (isCompleted && !isAlreadyStamped) {
      const awarded = markStoryStamped(storyId, storyTitle, vocabulary);
      if (awarded) {
        setJustStamped(true);
        setShowCoinsReward(true);
        const timer = setTimeout(() => setShowCoinsReward(false), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [isCompleted, isAlreadyStamped, storyId, storyTitle, vocabulary, markStoryStamped]);

  const isStampedNow = isAlreadyStamped || justStamped;

  return (
    <div className="relative flex items-center gap-2">
      {/* Coins tick-up popup when stamp is awarded */}
      {showCoinsReward && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -20, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          className="absolute -left-20 top-1/2 -translate-y-1/2 flex items-center gap-1 font-mono text-xs font-bold text-[#8B6E4E] bg-[#D4A574]/20 border border-[#D4A574]/40 px-2 py-0.5 rounded-full shadow-xs"
        >
          <Coins className="h-3.5 w-3.5 text-amber-500 animate-spin" />
          <span>+15 coins</span>
        </motion.div>
      )}

      {/* Two-Tone Ink Passport Stamp Seal */}
      <motion.div
        initial={false}
        animate={
          justStamped
            ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -12, 4, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed font-mono text-xs font-bold select-none transition-colors duration-300 relative ${
          isStampedNow
            ? 'bg-[#7D927D]/20 border-[#7D927D] text-[#5E735E] shadow-xs'
            : 'border-[#DDD0B5] text-[#777775] opacity-60 bg-transparent'
        }`}
        title={isStampedNow ? 'Historia Sellada en tu Pasaporte' : 'Sello de Historia'}
      >
        {isStampedNow ? (
          <div className="flex items-center justify-center">
            <Check className="h-5 w-5 text-[#5E735E]" />
          </div>
        ) : (
          <span>{isLibrary ? 'LIB' : 'QST'}</span>
        )}
      </motion.div>
    </div>
  );
};
