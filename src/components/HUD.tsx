import { useRef, useCallback, useEffect, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_TABS } from '../app/routes';
import { useStatsStore } from '../state/statsStore';
import { useSettingsStore } from '../state/settingsStore';
import { useUserData } from '../hooks/useUserData';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/clerk-react';

const HUD: FC = () => {
  const { userData } = useUserData();
  const statsXp = useStatsStore((s) => s.xp);
  const statsCoins = useStatsStore((s) => s.coins);
  const statsStreak = useStatsStore((s) => s.streak);

  const xp = typeof statsXp === 'number' ? statsXp : (userData?.xp ?? 0);
  const coins = typeof statsCoins === 'number' ? statsCoins : (userData?.kitsune_coins ?? 100);
  const streak = typeof statsStreak === 'number' ? statsStreak : (userData?.streak_days ?? 0);
  const { language, setLanguage } = useSettingsStore();

  // ── Edge-Hover Auto-Scrolling ─────────────────────────────────────────
  const navScrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = navScrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scrollSpeed = 5;

    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    const scroll = () => {
      const containerCurrent = navScrollRef.current;
      if (!containerCurrent) return;

      if (mouseX < 60) {
        containerCurrent.scrollLeft -= scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      } else if (mouseX > rect.width - 60) {
        containerCurrent.scrollLeft += scrollSpeed;
        scrollIntervalRef.current = requestAnimationFrame(scroll);
      }
    };

    if (mouseX < 60 || mouseX > rect.width - 60) {
      scrollIntervalRef.current = requestAnimationFrame(scroll);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <header className="nav-glass sticky top-0 z-40">
      <div className="relative z-10 mx-auto max-w-6xl w-full px-2 sm:px-4">
        {/* Row 1 — Brand + stats + Clerk Auth */}
        <div className="flex h-14 items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4">
          {/* Brand / home link */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 whitespace-nowrap transition-opacity hover:opacity-80"
            aria-label="Go to Home"
          >
            <img
              src="/hyena-logo-marigold.png"
              alt="TheLearningHyena Logo"
              className="h-7 w-7 object-contain shrink-0"
            />
            <span className="font-serif text-base font-bold text-text-primary tracking-tight">
              TheLearningHyena
            </span>
          </Link>

          {/* Stats cluster + Clerk Auth Buttons */}
          <div className="flex items-center gap-2 font-sans text-xs sm:gap-4 sm:text-sm">
            <Stat
              label="XP"
              value={xp}
              className="text-text-primary font-bold"
              title={`${xp} experience points`}
            />
            <Stat
              label="coins"
              value={coins}
              className="text-text-primary font-bold"
              title={`${coins} coins`}
              icon={
                <div className="coin-3d-container" aria-hidden="true">
                  <div className="coin-3d">
                    <div className="coin-front" />
                    <div className="coin-back" />
                  </div>
                </div>
              }
            />
            <Stat
              label="day streak"
              value={streak}
              className="text-text-primary font-bold"
              title={`${streak}-day streak`}
              icon={
                <div className="flame-3d-container" aria-hidden="true">
                  <div className="flame-3d">
                    <div className="flame-layer flame-layer-1" />
                    <div className="flame-layer flame-layer-2" />
                    <div className="flame-layer flame-layer-3" />
                  </div>
                </div>
              }
            />
            <Link
              to="/daily"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-structural text-text-primary transition-colors hover:border-text-secondary hover:bg-bg-elevated-2"
              aria-label="Daily Quests"
              title="Daily Quests"
            >
              📜
            </Link>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="h-8 rounded-md border border-structural bg-bg-elevated text-[11px] font-sans text-text-primary px-2 transition-colors hover:border-text-secondary focus:border-text-secondary focus:outline-none cursor-pointer"
              aria-label="Select translation language"
              title="Select Translation Language"
            >
              <option value="en">EN</option>
              <option value="hinglish">Hinglish</option>
            </select>

            {/* Clerk Auth Integration: Logged Out State */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#7D927D] hover:bg-[#6B826B] text-white font-sans text-xs font-semibold px-4 py-2 rounded-full shadow-sm cursor-pointer border-none transition-all">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Clerk Auth Integration: Logged In State */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 rounded-full border border-[#7D927D]/30 shadow-sm"
                  }
                }}
              />
            </SignedIn>

          </div>
        </div>

        {/* Row 2 — Navigation tabs in a glass capsule */}
        <nav aria-label="Main navigation" className="px-3 pb-2 pt-0.5">
          <div className="glass-nav-capsule">
            <div
              ref={navScrollRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex gap-2 overflow-x-auto justify-center px-3 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {NAV_TABS.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) =>
                    `relative z-10 whitespace-nowrap rounded-full px-4 py-2 font-sans text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#7D927D] text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
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
  icon?: React.ReactNode;
}

const Stat: FC<StatProps> = ({ label, value, className, title, icon }) => (
  <span
    className={`flex items-center gap-1 whitespace-nowrap ${className ?? ''}`}
    title={title}
  >
    {icon}
    <span className="font-semibold tabular-nums">{value}</span>
    <span className="hidden text-[#777775]/80 sm:inline">{label}</span>
  </span>
);

export default HUD;
