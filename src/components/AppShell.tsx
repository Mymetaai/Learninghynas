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
    <div className="flex min-h-screen flex-col bg-bg-base">
      {/* Ambient blobs — subtle Serene Lexicon sage/cream depth */}
      <div className="ambient-blob-container" aria-hidden="true">
        <div className="ambient-blob ambient-blob--sage" />
        <div className="ambient-blob ambient-blob--cream" />
        <div className="ambient-blob ambient-blob--sage-light" />
      </div>
      <HUD />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <ChibiPet />
      <GlobalSpanishKeyboard />
    </div>
  );
};

export default AppShell;
