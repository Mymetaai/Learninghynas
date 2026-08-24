import { useState, useRef, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number; // Duration in seconds per loop
}

export const MarqueeText: FC<MarqueeTextProps> = ({ text, className = '', speed = 10 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        // Measure if text width exceeds container width
        setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  if (!isOverflowing) {
    return (
      <div ref={containerRef} className={`truncate ${className}`}>
        <span ref={textRef}>{text}</span>
      </div>
    );
  }

  // Calculate dynamic speed based on text length for consistent scrolling velocity
  const duration = Math.max(speed, text.length * 0.25);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative whitespace-nowrap group/marquee ${className}`}
      title={text}
    >
      <motion.div
        className="inline-flex min-w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration,
        }}
      >
        <span ref={textRef} className="pr-8">
          {text}
        </span>
        <span className="pr-8">{text}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
