// App shell layout.
// Persistent HUD (stats + nav tabs) on top, the active screen below.
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import HUD from './HUD';

const AppShell: FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <HUD />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
