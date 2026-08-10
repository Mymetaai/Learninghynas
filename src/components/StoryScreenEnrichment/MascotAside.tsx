import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getStoryMascotLine } from '../../data/storyMascotLines';

interface MascotAsideProps {
  storyId: string;
}

export const MascotAside: FC<MascotAsideProps> = ({ storyId }) => {
  const [dismissed, setDismissed] = useState(false);
  const mascotLine = getStoryMascotLine(storyId);

  // Fail quiet: if no authored line exists for this story, render nothing
  if (!mascotLine || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="mt-5 rounded-2xl border border-[#7D927D]/30 bg-bg-elevated p-4 shadow-xs relative flex items-start gap-3"
      >
        {/* Hyena Mascot Avatar */}
        <div className="w-10 h-10 rounded-full border border-[#DDD0B5] overflow-hidden shrink-0 bg-[#FAF6EE] flex items-center justify-center shadow-xs">
          <img
            src="/hyena-logo-marigold.png"
            alt="Mascot"
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Mascot Speech Bubble */}
        <div className="flex-1 space-y-0.5 pr-5">
          <p className="font-mono text-[10px] uppercase font-bold text-[#7D927D]">
            Yuki & Hyena Kit
          </p>
          <p className="font-sans text-xs text-text-primary leading-relaxed">
            "{mascotLine}"
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer p-0.5 rounded-md"
          title="Dismiss comment"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
