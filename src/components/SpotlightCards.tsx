import { useState, useRef, type FC, type MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  BookOpen,
  MessageCircle,
  Calendar,
  Sparkles,
  CheckCircle,
  Repeat,
  Scale,
  GraduationCap,
  Trophy,
  type LucideIcon
} from 'lucide-react';
import type { CoursePart } from '../screens/BasicEspanolScreen';

export interface CurriculumItem {
  id: CoursePart;
  part: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const CURRICULUM_ITEMS: CurriculumItem[] = [
  {
    id: 'part1',
    part: 'PART 1',
    icon: BookOpen,
    title: 'Part 1: Greetings & -AR Verbs (Lessons 1-4)',
    description: 'Pronunciation, Articles, SER & -AR Verbs',
    color: '#7D927D'
  },
  {
    id: 'part2',
    part: 'PART 2',
    icon: MessageCircle,
    title: 'Part 2: Estar, IR & Numbers (Lessons 5-8)',
    description: 'Indefinite Articles, ESTAR, -ER/-IR Verbs & IR',
    color: '#F5A991'
  },
  {
    id: 'part3',
    part: 'PART 3',
    icon: Calendar,
    title: 'Part 3: Dates, Time, Tener & Hacer (Lessons 9-12)',
    description: 'Calendar, Telling Time, Tener Idioms & Weather',
    color: '#7D927D'
  },
  {
    id: 'part4',
    part: 'PART 4',
    icon: Sparkles,
    title: 'Part 4: Stem Changers & Progressive (Lessons 13-16)',
    description: 'Boot Verbs, Yo-Go Verbs & Present Progressive',
    color: '#F5A991'
  },
  {
    id: 'part5',
    part: 'PART 5',
    icon: CheckCircle,
    title: 'Part 5: Pronouns & Affirmatives (Lessons 17-21)',
    description: 'Possessives, Demonstratives, DOPs, IOPs & Gustar',
    color: '#7D927D'
  },
  {
    id: 'part6',
    part: 'PART 6',
    icon: Repeat,
    title: 'Part 6: Double Objects & Preterite (Lessons 22-26)',
    description: 'Double Objects, Reflexives, Commands & Preterite',
    color: '#F5A991'
  },
  {
    id: 'part7',
    part: 'PART 7',
    icon: Scale,
    title: 'Part 7: Imperfect & Comparisons (Lessons 27-30)',
    description: 'Imperfect Tense, Preterite vs Imperfect & Superlatives',
    color: '#7D927D'
  },
  {
    id: 'part8',
    part: 'PART 8',
    icon: GraduationCap,
    title: 'Part 8: C1 Advanced Mastery (Lessons 31-37)',
    description: 'Idioms, Register Shifts, Academic Debate, Subjunctive & Regional Variants',
    color: '#F5A991'
  }
];

interface SpotlightCardsProps {
  onSelectPart: (partId: CoursePart) => void;
  earnedBadges?: Record<string, boolean>;
}

export const SpotlightCards: FC<SpotlightCardsProps> = ({ onSelectPart, earnedBadges = {} }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
      {CURRICULUM_ITEMS.map((item) => {
        const isHovered = hoveredId === item.id;
        const isDimmed = hoveredId !== null && !isHovered;
        const hasBadge = !!earnedBadges[item.id];

        return (
          <SpotlightCardItem
            key={item.id}
            item={item}
            isHovered={isHovered}
            isDimmed={isDimmed}
            hasBadge={hasBadge}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelectPart(item.id)}
          />
        );
      })}
    </div>
  );
};

// ── INDIVIDUAL 3D SPOTLIGHT CARD ITEM ──────────────────────────────────────

interface SpotlightCardItemProps {
  item: CurriculumItem;
  isHovered: boolean;
  isDimmed: boolean;
  hasBadge: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const SpotlightCardItem: FC<SpotlightCardItemProps> = ({
  item,
  isHovered,
  isDimmed,
  hasBadge,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt motion values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Spotlight radial cursor positions
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Smooth springs for 3D rotation
  const rotateX = useSpring(useTransform(rawMouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 25
  });
  const rotateY = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 25
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Set normalized mouse pos [-0.5, 0.5]
    rawMouseX.set(clientX / width - 0.5);
    rawMouseY.set(clientY / height - 0.5);

    // Set spotlight pixel pos
    spotX.set(clientX);
    spotY.set(clientY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
    onMouseLeave();
  };

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      animate={{
        scale: isHovered ? 1.02 : isDimmed ? 0.97 : 1,
        opacity: isDimmed ? 0.45 : 1,
        filter: isDimmed ? 'blur(0.5px)' : 'none'
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative rounded-3xl p-6 cursor-pointer overflow-hidden border border-[#777775]/20 bg-white shadow-sm group transition-all duration-300 select-none"
    >
      {/* ── AURORA AMBIENT GLOW BEHIND CARD ───────────────────────────────── */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.color}40, transparent 70%)`
        }}
      />

      {/* ── DYNAMIC SPOTLIGHT BEAM ────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(350px circle at ${x}px ${y}px, ${item.color}25, transparent 80%)`
          )
        }}
      />

      {/* ── CARD CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(20px)' }}>
        {/* Top bar: Icon + Part Badge */}
        <div className="flex items-center justify-between">
          <div
            className="h-10 w-10 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${item.color}15`,
              borderColor: `${item.color}30`,
              color: item.color
            }}
          >
            <IconComponent className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: `${item.color}10`,
                borderColor: `${item.color}30`,
                color: item.color
              }}
            >
              {item.part}
            </span>
            {hasBadge && <Trophy className="h-4 w-4 text-[#D9A83F]" />}
          </div>
        </div>

        {/* Title + Description */}
        <div>
          <h4
            className="font-serif text-base font-bold text-[#2F353B] group-hover:text-[#7D927D] transition-colors leading-snug"
          >
            {item.title}
          </h4>
          <p className="font-sans text-xs text-[#777775] mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom CTA Arrow */}
        <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#7D927D] opacity-80 group-hover:opacity-100 transition-opacity">
          <span>Explore curriculum</span>
          <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpotlightCards;
