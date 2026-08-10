import { type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TranslateFlipProps {
  showTranslation: boolean;
  children: ReactNode;
}

export const TranslateFlip: FC<TranslateFlipProps> = ({ showTranslation, children }) => {
  return (
    <motion.div
      key={showTranslation ? 'translated' : 'spanish'}
      initial={{ opacity: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};
