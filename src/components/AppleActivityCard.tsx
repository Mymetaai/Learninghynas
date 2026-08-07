import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface ActivityRingData {
  label: string;
  sublabel?: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  endColor: string;
  icon?: React.ReactNode;
}

export interface AppleActivityCardProps {
  title?: string;
  subtitle?: string;
  level?: string;
  levelName?: string;
  xpData?: ActivityRingData;
  modulesData?: ActivityRingData;
  vocabData?: ActivityRingData;
  className?: string;
}

const defaultXpData: ActivityRingData = {
  label: "XP PROGRESS",
  sublabel: "Level 14 Journey",
  current: 0,
  target: 1200,
  unit: "XP",
  color: "#D97706",
  endColor: "#F59E0B",
};

const defaultModulesData: ActivityRingData = {
  label: "COURSE MASTERY",
  sublabel: "Modules Completed",
  current: 18,
  target: 24,
  unit: "MODS",
  color: "#10B981",
  endColor: "#34D399",
};

const defaultVocabData: ActivityRingData = {
  label: "VOCAB MASTERED",
  sublabel: "B2 Lexicon Set",
  current: 42,
  target: 60,
  unit: "WORDS",
  color: "#0EA5E9",
  endColor: "#38BDF8",
};

/*
 * Ring geometry (viewBox 220×220, center 110,110):
 *   Outer  → radius 97, stroke 11  → inner edge at 91.5
 *   Middle → radius 82, stroke 11  → inner edge at 76.5
 *   Inner  → radius 67, stroke 11  → inner edge at 61.5
 *
 * Center clear zone = 61.5 px radius → plenty of room for
 * "B2" (≈30px) + "Intermediate" (≈70px wide × 11px tall).
 */
export default function AppleActivityCard({
  title = "Course Level",
  subtitle = "CEFR Assessment Standard",
  level = "B2",
  levelName = "Intermediate",
  xpData = defaultXpData,
  modulesData = defaultModulesData,
  vocabData = defaultVocabData,
  className,
}: AppleActivityCardProps) {
  const SVG_SIZE = 220;
  const CENTER = SVG_SIZE / 2; // 110
  const STROKE = 11;
  const GAP = 15; // space between ring centers

  const rings = [
    { ...xpData,      radius: CENTER - STROKE / 2 - 2,            id: "xp-ring" },      // 97
    { ...modulesData, radius: CENTER - STROKE / 2 - 2 - GAP,      id: "modules-ring" }, // 82
    { ...vocabData,   radius: CENTER - STROKE / 2 - 2 - GAP * 2,  id: "vocab-ring" },   // 67
  ];

  const mainXpPercent = Math.min(
    100,
    Math.round((xpData.current / xpData.target) * 100)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-3xl p-6 flex flex-col gap-5 text-slate-100 transition-all duration-300 hover:shadow-amber-500/10",
        className
      )}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#F8FAFC]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs text-[#94A3B8] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-[#F8FAFC]">
            {level}
          </span>
        </div>
      </div>

      {/* ── Concentric Rings + Center Label ──────────────────────── */}
      <div className="flex items-center justify-center py-2">
        <div
          className="relative shrink-0"
          style={{ width: SVG_SIZE, height: SVG_SIZE }}
        >
          <svg
            width={SVG_SIZE}
            height={SVG_SIZE}
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            className="-rotate-90"
            aria-label={`Activity rings – ${level} ${levelName}`}
          >
            <defs>
              {rings.map((r) => (
                <linearGradient
                  key={r.id}
                  id={`g-${r.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={r.color} />
                  <stop offset="100%" stopColor={r.endColor} />
                </linearGradient>
              ))}
            </defs>

            {rings.map((ring, idx) => {
              const C = 2 * Math.PI * ring.radius;
              const pct = Math.min(100, Math.max(0, (ring.current / ring.target) * 100));
              const offset = C - (C * pct) / 100;

              return (
                <g key={ring.id}>
                  {/* Dark Slate Track */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={ring.radius}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth={STROKE}
                  />
                  {/* High-Contrast Progress Circle */}
                  <motion.circle
                    cx={CENTER}
                    cy={CENTER}
                    r={ring.radius}
                    fill="none"
                    stroke={`url(#g-${ring.id})`}
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{
                      duration: 1.4,
                      delay: 0.25 + idx * 0.15,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{ filter: `drop-shadow(0 0 6px ${ring.color}80)` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <span className="font-serif text-4xl font-bold text-[#F8FAFC] leading-none drop-shadow-[0_0_12px_rgba(217,119,6,0.35)]">
              {level}
            </span>
            <span className="font-sans text-[11px] font-semibold text-[#94A3B8] mt-1.5 uppercase tracking-widest">
              {levelName}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Ring Legend / Breakdown ──────────────────────────────── */}
      <div className="flex flex-col gap-2.5">
        {rings.map((ring, idx) => {
          const pct = Math.min(100, Math.round((ring.current / ring.target) * 100));

          return (
            <motion.div
              key={ring.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 + idx * 0.08 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              {/* Glowing accent dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: ring.color, color: ring.color }}
              />

              {/* Labels */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-sans text-[11px] font-bold text-[#F8FAFC] tracking-wide uppercase truncate">
                  {ring.label}
                </span>
                {ring.sublabel && (
                  <span className="font-sans text-[10px] text-[#94A3B8] truncate">
                    {ring.sublabel}
                  </span>
                )}
              </div>

              {/* Value */}
              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-[#F8FAFC]">
                  {ring.current}
                  <span className="text-[#94A3B8] font-normal text-[10px]">
                    /{ring.target}
                  </span>
                </span>
              </div>

              {/* Percentage pill */}
              <span
                className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 border border-slate-700/80"
                style={{
                  color: ring.color,
                  backgroundColor: `${ring.color}20`,
                }}
              >
                {pct}%
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ── Footer: XP Advancement bar ──────────────────────────── */}
      <div className="space-y-2 border-t border-slate-700/80 pt-3">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="font-semibold text-[#F8FAFC] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            Level Advancement
          </span>
          <span className="font-mono text-[11px] font-bold text-[#F8FAFC]">
            {xpData.current}/{xpData.target} XP
          </span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] shadow-[0_0_10px_rgba(217,119,6,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${mainXpPercent}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
