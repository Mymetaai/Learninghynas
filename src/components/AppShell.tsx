// App shell layout.
// Persistent HUD (stats + nav tabs) on top, the active screen below.
// Ambient gradient blobs provide depth for glass refraction effects.
import { useEffect, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import HUD from './HUD';
import ChibiPet from './ChibiPet';
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
      {/* Ambient blobs — executive dark slate & warm amber gradient blobs */}
      <div className="ambient-blob-container" aria-hidden="true">
        <div className="ambient-blob ambient-blob--slate" />
        <div className="ambient-blob ambient-blob--amber" />
        <div className="ambient-blob ambient-blob--slate-dark" />
      </div>
      <HUD />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <ChibiPet />
    </div>
  );
};

export default AppShell;
