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
  color: "#C4796B",
  endColor: "#E09385",
};

const defaultModulesData: ActivityRingData = {
  label: "COURSE MASTERY",
  sublabel: "Modules Completed",
  current: 18,
  target: 24,
  unit: "MODS",
  color: "#7D927D",
  endColor: "#9BB39B",
};

const defaultVocabData: ActivityRingData = {
  label: "VOCAB MASTERED",
  sublabel: "B2 Lexicon Set",
  current: 42,
  target: 60,
  unit: "WORDS",
  color: "#4A7B9D",
  endColor: "#679ABF",
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
        "relative w-full rounded-2xl bg-white border border-[#777775]/20",
        "p-5 sm:p-6 shadow-sm flex flex-col gap-5",
        "text-[#2F353B] transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#777775]/15 pb-3">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#2F353B]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs text-[#777775] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F9F7F2] border border-[#777775]/20 rounded-full shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#7D927D] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-[#2F353B]">
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
                  {/* Track */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={ring.radius}
                    fill="none"
                    stroke={`${ring.color}18`}
                    strokeWidth={STROKE}
                  />
                  {/* Progress */}
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
                    style={{ filter: `drop-shadow(0 1px 3px ${ring.color}30)` }}
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
            <span className="font-serif text-4xl font-bold text-[#2F353B] leading-none">
              {level}
            </span>
            <span className="font-sans text-[11px] font-semibold text-[#777775] mt-1.5 uppercase tracking-widest">
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
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F9F7F2]/50 border border-[#777775]/10 hover:bg-[#F9F7F2] transition-colors"
            >
              {/* Colour dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: ring.color }}
              />

              {/* Labels */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-sans text-[11px] font-bold text-[#2F353B] tracking-wide uppercase truncate">
                  {ring.label}
                </span>
                {ring.sublabel && (
                  <span className="font-sans text-[10px] text-[#777775] truncate">
                    {ring.sublabel}
                  </span>
                )}
              </div>

              {/* Value */}
              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-[#2F353B]">
                  {ring.current}
                  <span className="text-[#777775] font-normal text-[10px]">
                    /{ring.target}
                  </span>
                </span>
              </div>

              {/* Percentage pill */}
              <span
                className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  color: ring.color,
                  backgroundColor: `${ring.color}14`,
                }}
              >
                {pct}%
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ── Footer: XP Advancement bar ──────────────────────────── */}
      <div className="space-y-2 border-t border-[#777775]/15 pt-3">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="font-semibold text-[#2F353B] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7D927D]" />
            Level Advancement
          </span>
          <span className="font-mono text-[11px] font-bold text-[#2F353B]">
            {xpData.current}/{xpData.target} XP
          </span>
        </div>

        <div className="w-full h-2 bg-[#F9F7F2] rounded-full overflow-hidden border border-[#777775]/10">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: xpData.color }}
            initial={{ width: 0 }}
            animate={{ width: `${mainXpPercent}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
