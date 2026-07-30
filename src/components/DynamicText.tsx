import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GreetingItem {
  text: string;
  language: string;
}

const GREETINGS: GreetingItem[] = [
  { text: '¡Hola!', language: 'Spanish' },
  { text: 'Hello', language: 'English' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Ciao', language: 'Italian' },
  { text: 'Konnichiwa', language: 'Japanese' },
  { text: 'Olá', language: 'Portuguese' },
  { text: 'Namaste', language: 'Hindi' },
  { text: 'Willkommen', language: 'German' },
  { text: 'Nǐ Hǎo', language: 'Mandarin' },
  { text: 'Ahlan', language: 'Arabic' }
];

export const DynamicText: FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === GREETINGS.length - 1 ? 0 : prevIndex + 1));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const currentGreeting = GREETINGS[index];

  return (
    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-3">
      {/* Sage Green Accent Dot */}
      <span className="h-2 w-2 rounded-full bg-[#7D927D] animate-pulse shrink-0" />

      {/* Dynamic Animated Greeting Text */}
      <div className="relative h-5 overflow-hidden flex items-center justify-center font-serif italic text-sm font-medium text-[#F9F7F2]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentGreeting.text}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="whitespace-nowrap"
          >
            {currentGreeting.text}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="text-[10px] font-sans font-normal text-[#777775] tracking-wider uppercase ml-1">
        • {currentGreeting.language}
      </span>
    </div>
  );
};

export default DynamicText;
