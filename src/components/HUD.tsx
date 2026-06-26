// Persistent top HUD bar with stats + navigation tabs.
// Row 1: brand, XP/coins/streak stats.
// Row 2: horizontally-scrollable nav tabs for all primary screens.
import type { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_TABS } from '../app/routes';
import { useStatsStore } from '../state/statsStore';
import { useSettingsStore } from '../state/settingsStore';

const HUD: FC = () => {
  const xp = useStatsStore((s) => s.xp);
  const coins = useStatsStore((s) => s.coins);
  const streak = useStatsStore((s) => s.streak);
  const { language, setLanguage } = useSettingsStore();

  return (
    <header className="sticky top-0 z-40 border-b border-pencil/20 bg-ink/95 backdrop-blur">
      <div className="mx-auto max-w-3xl">
        {/* Row 1 — Brand + stats */}
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          {/* Brand / home link */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Go to Home"
          >
            <img
              src="/hyena-logo-marigold.png"
              alt="TheLearningHyena Logo"
              className="h-7 w-7 object-contain"
            />
            <span className="hidden font-display text-sm font-semibold text-paper sm:inline">
              TheLearningHyena
            </span>
          </Link>

          {/* Stats cluster — HUD/data font */}
          <div className="flex items-center gap-2 font-hud text-xs sm:gap-4 sm:text-sm">
            <Stat
              label="XP"
              value={xp}
              className="text-paper"
              title={`${xp} experience points`}
            />
            <Stat
              label="coins"
              value={coins}
              className="text-marigold"
              title={`${coins} coins`}
            />
            <Stat
              label="day streak"
              value={streak}
              className="text-terracotta"
              title={`${streak}-day streak`}
              icon="🔥"
            />
            <Link
              to="/daily"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-pencil/30 text-paper transition-colors hover:border-pencil/60 hover:bg-pencil/10"
              aria-label="Daily Quests"
              title="Daily Quests"
            >
              📜
            </Link>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="h-8 rounded-md border border-pencil/30 bg-ink/90 text-[11px] font-hud text-paper px-2 transition-colors hover:border-pencil/60 focus:border-pencil/60 focus:outline-none cursor-pointer"
              aria-label="Select translation language"
              title="Select Translation Language"
            >
              <option value="en">EN</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>

        {/* Row 2 — Navigation tabs */}
        <nav
          aria-label="Main navigation"
          className="border-t border-pencil/10"
        >
          <div className="flex gap-1 overflow-x-auto px-2 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {NAV_TABS.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                end={tab.id === 'dashboard'}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-2.5 py-1 font-hud text-[11px] transition-colors ${
                    isActive
                      ? 'bg-terracotta text-paper'
                      : 'text-pencil hover:bg-pencil/10 hover:text-paper'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

interface StatProps {
  label: string;
  value: number;
  className?: string;
  title?: string;
  icon?: string;
}

const Stat: FC<StatProps> = ({ label, value, className, title, icon }) => (
  <span
    className={`flex items-center gap-1 whitespace-nowrap ${className ?? ''}`}
    title={title}
  >
    {icon ? <span aria-hidden>{icon}</span> : null}
    <span className="font-semibold tabular-nums">{value}</span>
    <span className="hidden text-pencil/80 sm:inline">{label}</span>
  </span>
);

export default HUD;
