import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut,
  User,
  Mail,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Flame,
  Trophy,
  UserPlus,
} from 'lucide-react';
import { useAuthStore } from '../state/authStore';
import { useStatsStore } from '../state/statsStore';
import { AccountUpgradeModal } from '../components/AccountUpgradeModal';

const ProfileScreen: React.FC = () => {
  const { userEmail, loginMethod, isAnonymous, logout } = useAuthStore();
  const xp = useStatsStore((s) => s.xp);
  const coins = useStatsStore((s) => s.coins);
  const streak = useStatsStore((s) => s.streak);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const isUnregistered = isAnonymous || !userEmail;

  // Mock achievements list
  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Completed the basic Español intro.', earned: true, icon: '🐣' },
    { id: 2, title: 'Word Weaver', desc: 'Learned 50 Spanish words.', earned: true, icon: '📚' },
    { id: 3, title: 'Guardian Defeater', desc: 'Defeated Yuki in the first Boss Battle.', earned: false, icon: '⚔️' },
    { id: 4, title: 'Speaking Star', desc: 'Scored 90%+ in a Speaking Arena challenge.', earned: true, icon: '🌟' },
    { id: 5, title: 'Unstoppable', desc: 'Maintained a 7-day learning streak.', earned: true, icon: '🔥' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Account Upgrade Banner for Anonymous Users */}
      {isUnregistered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-accent-action/30 bg-accent-action/10 p-5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-action text-white shadow-md shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-text-primary">
                  Save Your Progress / Create Account
                </h3>
                <p className="font-body text-xs text-text-secondary mt-0.5">
                  You are currently using an anonymous session. Link an email to save your stats & progress!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-accent-action px-4 py-2.5 font-body text-xs font-bold text-white shadow-md hover:bg-accent-action/90 transition-all"
            >
              <UserPlus className="h-4 w-4" />
              <span>Save Progress</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-structural bg-bg-elevated p-6 shadow-md mb-8"
      >
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accent-action/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {/* Avatar frame */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-bg-elevated-2 border border-structural text-accent-action shadow-inner">
            <User className="h-10 w-10" />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white text-[10px] border border-bg-elevated font-semibold">
              ✓
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Wayfarer {userEmail ? userEmail.split('@')[0] : 'Guest'}
            </h2>
            <p className="font-body text-xs text-text-secondary mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="h-3 w-3" /> {userEmail || 'Anonymous Guest Session'}
            </p>
            <p className="font-body text-xs text-text-secondary mt-1 flex items-center justify-center sm:justify-start gap-1">
              <KeyRound className="h-3 w-3" /> Method: {isUnregistered ? 'Anonymous Local Session' : loginMethod || 'Email & Password'}
            </p>

            {isUnregistered ? (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-action/10 px-3 py-1 font-body text-[10px] font-semibold text-accent-action border border-accent-action/20 hover:bg-accent-action hover:text-white transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" /> Save Progress / Create Account
              </button>
            ) : (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 font-body text-[10px] font-semibold text-success border border-success/20">
                <ShieldCheck className="h-3.5 w-3.5" /> Account Saved & Verified
              </div>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={() => logout()}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-error/20 bg-bg-elevated px-4 py-2 font-body text-xs font-semibold text-error hover:bg-error/5 transition-all shadow-sm self-center"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out / Lock
          </button>
        </div>
      </motion.div>

      {/* Grid of quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'XP Points', value: xp, icon: <Sparkles className="h-4 w-4 text-accent-action" />, bg: 'bg-accent-action/5' },
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
            <h4 className="mt-2 font-hud text-lg font-bold text-text-primary tabular-nums">{stat.value}</h4>
            <p className="font-body text-[10px] text-text-secondary font-medium tracking-wider uppercase mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-structural bg-bg-elevated p-6 shadow-md"
      >
        <div className="mb-6 flex items-center justify-between border-b border-structural/30 pb-4">
          <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent-action" /> Stamp Achievements
          </h3>
          <span className="font-body text-xs font-semibold text-text-secondary">
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
                <h4 className="font-body text-xs font-semibold text-text-primary">{a.title}</h4>
                <p className="font-body text-[11px] text-text-secondary mt-0.5">{a.desc}</p>
              </div>
              {a.earned ? (
                <div className="rounded-full bg-success/10 px-2 py-0.5 font-body text-[9px] font-bold text-success border border-success/20">
                  Earned
                </div>
              ) : (
                <div className="rounded-full bg-text-tertiary/10 px-2 py-0.5 font-body text-[9px] font-bold text-text-secondary border border-structural">
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Account Upgrade Modal */}
      <AccountUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
};

export default ProfileScreen;

