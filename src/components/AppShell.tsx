// App shell layout.
// Persistent HUD (stats + nav tabs) on top, the active screen below.
// Ambient gradient blobs provide depth for glass refraction effects.
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import HUD from './HUD';
import ChibiPet from './ChibiPet';

const AppShell: FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      {/* Ambient blobs — gives backdrop-filter something to refract */}
      <div className="ambient-blob-container" aria-hidden="true">
        <div className="ambient-blob ambient-blob--terracotta" />
        <div className="ambient-blob ambient-blob--teal" />
        <div className="ambient-blob ambient-blob--marigold" />
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
