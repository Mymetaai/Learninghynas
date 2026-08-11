import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Sparkles,
  Flame,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { useStatsStore } from '../state/statsStore';
import { useUserData } from '../hooks/useUserData';
import { UserActivityDashboard } from '../components/analytics/UserActivityDashboard';

const ProfileScreen: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { userData: liveUserData, resetAllUserProgress } = useUserData();
  const [showResetModal, setShowResetModal] = useState(false);
  const statsXp = useStatsStore((s) => s.xp);
  const statsCoins = useStatsStore((s) => s.coins);
  const statsStreak = useStatsStore((s) => s.streak);

  const xp = Math.max(liveUserData?.xp ?? 0, statsXp ?? 0);
  const coins = Math.max(liveUserData?.kitsune_coins ?? 0, statsCoins ?? 0);
  const streak = Math.max(liveUserData?.streak_days ?? 0, statsStreak ?? 0);

  // Achievements list
  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Completed the basic Español intro.', earned: true, icon: '🐣' },
    { id: 2, title: 'Word Weaver', desc: 'Learned 50 Spanish words.', earned: true, icon: '📚' },
    { id: 3, title: 'Guardian Defeater', desc: 'Defeated Yuki in the first Boss Battle.', earned: false, icon: '⚔️' },
    { id: 4, title: 'Speaking Star', desc: 'Scored 90%+ in a Speaking Arena challenge.', earned: true, icon: '🌟' },
    { id: 5, title: 'Unstoppable', desc: 'Maintained a 7-day learning streak.', earned: true, icon: '🔥' },
  ];

  const userDisplayName = isLoaded && user ? (user.fullName || user.primaryEmailAddress?.emailAddress || 'Wayfarer Learner') : 'Wayfarer Guest';
  const userEmailAddress = isLoaded && user ? user.primaryEmailAddress?.emailAddress : 'Guest Session';
  const userAvatarUrl = isLoaded && user ? user.imageUrl : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-structural bg-bg-elevated p-6 shadow-sm mb-8"
      >
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#7D927D]/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {/* Avatar frame */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-bg-elevated-2 border border-structural text-[#7D927D] shadow-inner overflow-hidden">
            {userAvatarUrl ? (
              <img src={userAvatarUrl} alt={userDisplayName} className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>

          {/* User info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-serif text-xl font-bold text-text-primary">
              {userDisplayName}
            </h2>
            <p className="font-sans text-xs text-text-secondary mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="h-3 w-3" /> {userEmailAddress}
            </p>
          </div>

          {/* Account action buttons */}
          <div className="flex items-center gap-2 self-center">
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 font-sans text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Progress
            </button>

            {isSignedIn && (
              <SignOutButton>
                <button className="flex items-center justify-center gap-1.5 rounded-full border border-structural bg-bg-elevated px-4 py-2 font-sans text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-all shadow-sm border-none cursor-pointer">
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </motion.div>

      {/* Grid of quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'XP Points', value: xp, icon: <Sparkles className="h-4 w-4 text-[#7D927D]" />, bg: 'bg-[#7D927D]/5' },
          { label: 'Gold Coins', value: coins, icon: '🪙', bg: 'bg-bg-elevated-2' },
          { label: 'Day Streak', value: streak, icon: <Flame className="h-4 w-4 text-streak-warm" />, bg: 'bg-streak-warm/5' },
        ].map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className={`rounded-2xl border border-structural/80 p-4 text-center shadow-sm ${stat.bg}`}
          >
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated text-xs shadow-inner">
              {stat.icon}
            </div>
            <h4 className="mt-2 font-mono text-lg font-bold text-text-primary tabular-nums">{stat.value}</h4>
            <p className="font-sans text-[10px] text-text-secondary font-medium tracking-wider uppercase mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Activity Analytics Dashboard (7D / 30D / All-Time) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <UserActivityDashboard />
      </motion.div>

      {/* Achievements Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-structural bg-bg-elevated p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center justify-between border-b border-structural/30 pb-4">
          <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#7D927D]" /> Stamp Achievements
          </h3>
          <span className="font-sans text-xs font-semibold text-text-secondary">
            {achievements.filter((a) => a.earned).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="space-y-4">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${
                a.earned
                  ? 'border-structural bg-bg-elevated-2/50'
                  : 'border-dashed border-structural/60 opacity-60 bg-transparent'
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-elevated text-lg shadow-sm border border-structural/40 select-none">
                {a.earned ? a.icon : '🔒'}
              </div>
              <div className="flex-1">
                <h4 className="font-sans text-xs font-semibold text-text-primary">{a.title}</h4>
                <p className="font-sans text-[11px] text-text-secondary mt-0.5">{a.desc}</p>
              </div>
              {a.earned ? (
                <div className="rounded-full bg-[#7D927D]/10 px-2 py-0.5 font-sans text-[9px] font-bold text-[#7D927D] border border-[#7D927D]/20">
                  Earned
                </div>
              ) : (
                <div className="rounded-full bg-text-tertiary/10 px-2 py-0.5 font-sans text-[9px] font-bold text-text-secondary border border-structural">
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-[#777775]/20 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw size={24} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2F353B]">
              Restart Your Journey?
            </h3>
            <p className="text-xs text-[#777775] leading-relaxed">
              Are you sure you want to reset your progress? This will reset your XP to 0, coins to 100, and unlock status so you can collect rewards and practice all over again with full enthusiasm!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#777775]/20 text-xs font-semibold text-[#2F353B] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await resetAllUserProgress();
                  setShowResetModal(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-colors shadow-sm cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
