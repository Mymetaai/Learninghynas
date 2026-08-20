// App shell layout.
// Persistent HUD (stats + nav tabs) on top, the active screen below.
// Ambient gradient blobs provide depth for glass refraction effects.
import { useEffect, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import HUD from './HUD';
import ChibiPet from './ChibiPet';
import GlobalSpanishKeyboard from './GlobalSpanishKeyboard';
import { useActiveStudyTimer } from '../hooks/useActiveStudyTimer';
import { useShopStore } from '../state/shopStore';

const AppShell: FC = () => {
  useActiveStudyTimer();

  useEffect(() => {
    const activeTheme = useShopStore.getState().inventory?.activeThemeId;
    if (activeTheme && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary relative overflow-x-hidden">
      {/* Ambient blobs — subtle Serene Lexicon sage/cream depth strictly as background (z-0) */}
      <div className="ambient-blob-container" aria-hidden="true">
        <div className="ambient-blob ambient-blob--sage" />
        <div className="ambient-blob ambient-blob--cream" />
        <div className="ambient-blob ambient-blob--sage-light" />
      </div>
      {/* Persistent Top Navigation / HUD (z-40) */}
      <HUD />
      {/* Main Screen Outlet with clean layering and clearance (z-10) */}
      <main className="flex-1 w-full relative z-10 overflow-y-auto pb-20 sm:pb-8">
        <Outlet />
      </main>
      <ChibiPet />
      <GlobalSpanishKeyboard />
    </div>
  );
};

export default AppShell;
