// Persistent top HUD bar with stats + navigation tabs.
// Row 1: brand, XP/coins/streak stats.
// Row 2: horizontally-scrollable nav tabs inside a Liquid Glass capsule
//         with a sliding glass indicator that tracks the active tab.
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_TABS } from '../app/routes';
import { useStatsStore } from '../state/statsStore';
import { useSettingsStore } from '../state/settingsStore';

const HUD: FC = () => {
  const xp = useStatsStore((s) => s.xp);
  const coins = useStatsStore((s) => s.coins);
  const streak = useStatsStore((s) => s.streak);
  const { language, setLanguage } = useSettingsStore();
  const location = useLocation();

  // ── Sliding indicator state ──────────────────────────────────────────
  const navScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const setTabRef = useCallback(
    (id: string) => (el: HTMLAnchorElement | null) => {
      if (el) tabRefs.current.set(id, el);
      else tabRefs.current.delete(id);
    },
    [],
  );

  // Measure the active tab and position the indicator
  useLayoutEffect(() => {
    const scrollContainer = navScrollRef.current;
    if (!scrollContainer) return;

    // Find the active NavLink by aria-current
    const activeTab = scrollContainer.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    if (activeTab) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - containerRect.left + scrollContainer.scrollLeft,
        width: tabRect.width,
        visible: true,
      });
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [location.pathname]);

  return (
    <header className="glass-surface sticky top-0 z-40 border-b border-white/[0.08]">
      <div className="relative z-10 mx-auto max-w-3xl">
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

        {/* Row 2 — Navigation tabs in a glass capsule */}
        <nav aria-label="Main navigation" className="px-3 pb-2 pt-0.5">
          <div className="glass-nav-capsule">
            <div
              ref={navScrollRef}
              className="relative flex gap-1 overflow-x-auto px-2 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Sliding glass indicator */}
              {indicator.visible && (
                <span
                  className="glass-tab-indicator"
                  style={{
                    left: `${indicator.left}px`,
                    width: `${indicator.width}px`,
                  }}
                />
              )}

              {NAV_TABS.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.id === 'dashboard'}
                  ref={setTabRef(tab.id)}
                  className={({ isActive }) =>
                    `relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 font-hud text-[11px] transition-colors duration-200 ${
                      isActive
                        ? 'text-paper'
                        : 'text-pencil hover:text-paper/80'
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
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
