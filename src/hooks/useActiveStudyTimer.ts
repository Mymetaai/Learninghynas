import { useEffect, useRef } from 'react';
import { useStatsStore } from '../state/statsStore';

/**
 * Hook that tracks active study time when the application is visible and focused.
 * Ticks active seconds to `useStatsStore` via 1-second interval timestamp deltas.
 */
export const useActiveStudyTimer = (): void => {
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    lastTickRef.current = Date.now();

    const resetTimestamp = () => {
      lastTickRef.current = Date.now();
    };

    window.addEventListener('focus', resetTimestamp);
    window.addEventListener('blur', resetTimestamp);
    document.addEventListener('visibilitychange', resetTimestamp);

    const intervalId = setInterval(() => {
      const now = Date.now();
      const deltaMs = now - lastTickRef.current;
      lastTickRef.current = now;

      if (document.visibilityState === 'visible') {
        const deltaSec = Math.floor(deltaMs / 1000);
        if (deltaSec > 0 && deltaSec < 10) {
          useStatsStore.getState().tickActiveStudyTime(deltaSec);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('focus', resetTimestamp);
      window.removeEventListener('blur', resetTimestamp);
      document.removeEventListener('visibilitychange', resetTimestamp);
      clearInterval(intervalId);
    };
  }, []);
};

export default useActiveStudyTimer;
