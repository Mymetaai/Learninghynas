// STEP 6 — Typewriter text effect.
// Renders story lines progressively with a typing animation that can be
// skipped by tapping/clicking. Used by the Story Chapter screen.
import { useState, useEffect, useCallback, useRef, type FC } from 'react';

interface TypewriterTextProps {
  lines: string[];
  /** Milliseconds per character reveal (default 30). */
  speed?: number;
  /** Called when all lines have been revealed. */
  onComplete?: () => void;
  /**
   * Render callback for each line — receives the text up to the revealed
   * point and whether all text is showing. The parent (StoryScreen) uses
   * this to render tappable vocab words inline.
   */
  renderLine: (text: string, lineIndex: number, isFullyRevealed: boolean) => React.ReactNode;
}

const TypewriterText: FC<TypewriterTextProps> = ({
  lines,
  speed = 30,
  onComplete,
  renderLine,
}) => {
  const [revealedCount, setRevealedCount] = useState(0); // chars revealed so far
  const [skipped, setSkipped] = useState(false);
  const totalChars = lines.join('').length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Progressive reveal
  useEffect(() => {
    if (skipped || revealedCount >= totalChars) {
      if (revealedCount >= totalChars) onComplete?.();
      return;
    }
    timerRef.current = setTimeout(() => {
      setRevealedCount((c) => Math.min(c + 1, totalChars));
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [revealedCount, skipped, totalChars, speed, onComplete]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    setRevealedCount(totalChars);
  }, [totalChars]);

  // Distribute `revealedCount` across lines
  let remaining = revealedCount;
  const lineStates = lines.map((line, i) => {
    const charsForLine = Math.min(remaining, line.length);
    remaining -= charsForLine;
    return {
      text: line.slice(0, charsForLine),
      isFullyRevealed: charsForLine >= line.length,
      index: i,
    };
  });

  return (
    <div onClick={handleSkip} role="button" tabIndex={0} aria-label="Tap to skip typing animation">
      {lineStates.map((ls) => (
        <div key={ls.index} className="min-h-[1.5em]">
          {ls.text.length > 0 ? renderLine(ls.text, ls.index, ls.isFullyRevealed) : null}
          {/* Blinking cursor on the currently-typing line */}
          {!skipped && !ls.isFullyRevealed && ls.text.length > 0 && (
            <span className="inline-block w-0.5 animate-pulse bg-bg-base/60 align-middle" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TypewriterText;
