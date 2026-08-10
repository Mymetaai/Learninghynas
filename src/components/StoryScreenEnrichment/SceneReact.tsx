import { useState, useCallback } from 'react';

/**
 * Custom hook providing lightweight ~150ms micro-animation state for tapped words.
 */
export function useSceneReact() {
  const [activeWordKey, setActiveWordKey] = useState<string | null>(null);

  const triggerReact = useCallback((word: string) => {
    const key = word.toLowerCase();
    setActiveWordKey(key);
    setTimeout(() => setActiveWordKey(null), 200);
  }, []);

  return { activeWordKey, triggerReact };
}
