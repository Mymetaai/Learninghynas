import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  DollarSign,
  Clock,
  Gamepad2,
  Bot,
  Mic,
  BookOpenCheck,
  BarChart3,
  PiggyBank,
  Sparkles,
  Users,
  School,
  ArrowRight,
  Check,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardHover = {
  rest: { scale: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.35)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */

const Section: FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => (
  <section id={id} className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION TITLE
   ═══════════════════════════════════════════════════════════════════════════ */

const SectionTitle: FC<{
  label?: string;
  title: string;
  subtitle?: string;
}> = ({ label, title, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeUp}
    custom={0}
    className="mb-12 text-center"
  >
    {label && (
      <p className="mb-2 font-hud text-[10px] uppercase tracking-[0.3em] text-marigold">
        {label}
      </p>
    )}
    <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl font-body text-base text-pencil">
        {subtitle}
      </p>
    )}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const HeroSection: FC = () => {
  const statBadges = [
    { icon: <DollarSign size={16} />, label: 'Zero Tutor Cost' },
    { icon: <Clock size={16} />, label: '24/7 AI Practice' },
    { icon: <Sparkles size={16} />, label: 'Anime Collectibles' },
  ];

  return (
    <Section className="pt-20 pb-12">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          <span className="glitter-text">Why TheLearningHyena?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-6 max-w-3xl font-body text-lg text-pencil sm:text-xl"
        >
          The only platform that combines anime-powered engagement with AI
          conversation practice — at{' '}
          <span className="font-semibold text-marigold">zero tutor cost</span>.
        </motion.p>

        {/* Stat Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {statBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              variants={fadeUp}
              custom={i + 2}
              className="glass-nav-capsule flex items-center gap-2 px-5 py-2.5 font-hud text-xs text-paper"
            >
              <span className="text-marigold">{badge.icon}</span>
              {badge.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. THE PROBLEM SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const problems = [
  {
    icon: <Gamepad2 size={28} />,
    competitor: 'Passive Apps',
    tag: 'Duolingo',
    description:
      "Translation-matching games don't build real fluency. 1000-day streaks, still can't order food.",
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
    border: 'border-terracotta/20',
  },
  {
    icon: <Users size={28} />,
    competitor: 'Expensive Tutors',
    tag: 'Preply',
    description:
      '$20–50/hour for live tutors. High anxiety speaking with strangers. Scheduling friction kills consistency.',
    color: 'text-marigold',
    bg: 'bg-marigold/10',
    border: 'border-marigold/20',
  },
  {
    icon: <AlertTriangle size={28} />,
    competitor: 'Digital Textbooks',
    tag: 'Babbel',
    description:
      'Structured but boring. No gamification, no adaptive weak-spot tracking. 70% abandon within 30 days.',
    color: 'text-pencil',
    bg: 'bg-pencil/10',
    border: 'border-pencil/20',
  },
];

const ProblemSection: FC = () => (
  <Section>
    <SectionTitle
      label="The Challenge"
      title="The Language Learning Problem"
      subtitle="Billions spent, yet most learners quit. Here's why existing tools fail."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="grid gap-6 sm:grid-cols-3"
    >
      {problems.map((p, i) => (
        <motion.div
          key={p.tag}
          variants={fadeUp}
          custom={i}
          className={`glass-surface rounded-2xl p-6 ${p.border} border`}
        >
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${p.bg} ${p.color}`}
          >
            {p.icon}
          </div>
          <h3 className="font-display text-lg font-bold text-paper">
            {p.competitor}
          </h3>
          <span
            className={`mt-1 inline-block font-hud text-[10px] uppercase tracking-widest ${p.color}`}
          >
            {p.tag}
          </span>
          <p className="mt-3 font-body text-sm leading-relaxed text-pencil">
            {p.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   3. COMPETITOR COMPARISON MATRIX
   ═══════════════════════════════════════════════════════════════════════════ */

interface ComparisonRow {
  feature: string;
  duolingo: string;
  preply: string;
  babbel: string;
  hyena: string;
  hyenaHighlight?: boolean;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Engagement Hook',
    duolingo: 'Streaks & Leagues',
    preply: 'Human Connection',
    babbel: 'None (Linear)',
    hyena: 'Anime TCG Cards & Boss Battles',
    hyenaHighlight: true,
  },
  {
    feature: 'Conversational AI',
    duolingo: '❌',
    preply: '❌ (Human only)',
    babbel: '❌',
    hyena: '✅ Zero-Stress AI Companion',
    hyenaHighlight: true,
  },
  {
    feature: 'Speaking Assessment',
    duolingo: 'Basic',
    preply: 'Subjective',
    babbel: 'Basic',
    hyena: '✅ Voice Arena',
    hyenaHighlight: true,
  },
  {
    feature: 'Cost Per Hour',
    duolingo: 'Free/cheap',
    preply: '$20+/hr',
    babbel: 'Subscription',
    hyena: 'Free / AI-Scalable',
    hyenaHighlight: true,
  },
  {
    feature: 'Curricular Customization',
    duolingo: '❌',
    preply: 'Tutor-dependent',
    babbel: '❌',
    hyena: '✅ Custom Syllabus',
    hyenaHighlight: true,
  },
  {
    feature: 'Weak-Spot Recovery',
    duolingo: 'Generic',
    preply: 'Tutor-dependent',
    babbel: '❌',
    hyena: '✅ Auto Mistake Tracking',
    hyenaHighlight: true,
  },
];

const CellValue: FC<{ value: string; highlight?: boolean }> = ({
  value,
  highlight,
}) => {
  const isCheck = value.startsWith('✅');
  const isCross = value.startsWith('❌');

  return (
    <span
      className={`font-body text-sm leading-snug ${
        highlight
          ? 'font-semibold text-paper'
          : isCross
            ? 'text-terracotta/80'
            : isCheck
              ? 'text-teal-deep'
              : 'text-pencil'
      }`}
    >
      {value}
    </span>
  );
};

const ComparisonSection: FC = () => (
  <Section>
    <SectionTitle
      label="Side-by-Side"
      title="How We Stack Up"
      subtitle="Feature-by-feature, TheLearningHyena outperforms every alternative."
    />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="glass-surface overflow-hidden rounded-2xl"
    >
      {/* Desktop / wide table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-pencil/20">
              <th className="px-6 py-4 font-display text-sm font-bold text-pencil">
                Feature
              </th>
              <th className="px-4 py-4 font-display text-sm font-bold text-pencil">
                Duolingo 🦉
              </th>
              <th className="px-4 py-4 font-display text-sm font-bold text-pencil">
                Preply 👥
              </th>
              <th className="px-4 py-4 font-display text-sm font-bold text-pencil">
                Babbel 📘
              </th>
              <th className="relative px-4 py-4 font-display text-sm font-bold text-marigold">
                {/* Glow column indicator */}
                <span className="absolute inset-0 -z-10 bg-marigold/[0.04]" />
                TheLearningHyena 🐆
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-pencil/10 ${
                  i % 2 === 0 ? 'bg-paper/[0.02]' : ''
                }`}
              >
                <td className="px-6 py-4 font-display text-sm font-semibold text-paper">
                  {row.feature}
                </td>
                <td className="px-4 py-4">
                  <CellValue value={row.duolingo} />
                </td>
                <td className="px-4 py-4">
                  <CellValue value={row.preply} />
                </td>
                <td className="px-4 py-4">
                  <CellValue value={row.babbel} />
                </td>
                <td className="relative px-4 py-4">
                  <span className="absolute inset-0 -z-10 bg-marigold/[0.04]" />
                  <CellValue
                    value={row.hyena}
                    highlight={row.hyenaHighlight}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-4 p-4 lg:hidden">
        {comparisonRows.map((row) => (
          <div
            key={row.feature}
            className="rounded-xl border border-pencil/15 bg-paper/[0.03] p-4"
          >
            <p className="mb-3 font-display text-sm font-bold text-paper">
              {row.feature}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-hud text-[10px] text-pencil/60">
                  🦉 Duolingo
                </span>
                <p className="mt-0.5 text-pencil">{row.duolingo}</p>
              </div>
              <div>
                <span className="font-hud text-[10px] text-pencil/60">
                  👥 Preply
                </span>
                <p className="mt-0.5 text-pencil">{row.preply}</p>
              </div>
              <div>
                <span className="font-hud text-[10px] text-pencil/60">
                  📘 Babbel
                </span>
                <p className="mt-0.5 text-pencil">{row.babbel}</p>
              </div>
              <div className="rounded-lg bg-marigold/10 p-2">
                <span className="font-hud text-[10px] text-marigold">
                  🐆 Hyena
                </span>
                <p className="mt-0.5 font-semibold text-paper">{row.hyena}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   4. OUR SOLUTION SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const solutions = [
  {
    icon: <Gamepad2 size={28} />,
    title: 'Anime & TCG Collectibles',
    description:
      'Unlock rare Demon Slayer and One Piece cards as you learn. Boss battles test your knowledge. Streaks feel epic, not tedious.',
    accentColor: 'text-terracotta',
    bg: 'bg-terracotta/10',
    borderGlow: 'hover:border-terracotta/40',
  },
  {
    icon: <Bot size={28} />,
    title: 'Zero-Stress AI Companion',
    description:
      'Practice conversations 24/7 with our AI chatbot. No judgment, no scheduling, no anxiety. Just real practice.',
    accentColor: 'text-teal-deep',
    bg: 'bg-teal-deep/10',
    borderGlow: 'hover:border-teal-deep/40',
  },
  {
    icon: <Mic size={28} />,
    title: 'Voice Arena',
    description:
      'Get instant pronunciation feedback. Compete with yourself. No awkward tutor sessions.',
    accentColor: 'text-marigold',
    bg: 'bg-marigold/10',
    borderGlow: 'hover:border-marigold/40',
  },
];

const SolutionSection: FC = () => (
  <Section>
    <SectionTitle
      label="Our Approach"
      title="How We Do It Differently"
      subtitle="Three pillars that make language learning stick."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="grid gap-6 sm:grid-cols-3"
    >
      {solutions.map((s, i) => (
        <motion.div
          key={s.title}
          variants={fadeUp}
          custom={i}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div
            variants={cardHover}
            className={`glass-surface cursor-default rounded-2xl border border-pencil/15 p-6 transition-colors ${s.borderGlow}`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} ${s.accentColor}`}
            >
              {s.icon}
            </div>
            <h3 className="font-display text-lg font-bold text-paper">
              {s.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-pencil">
              {s.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   5. FOR INSTITUTIONS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const institutionBenefits = [
  {
    icon: <BookOpenCheck size={28} />,
    title: 'Custom Syllabus Integration',
    description:
      'Upload your own curriculum. Exercises, stories, and AI conversations align with your class modules.',
    color: 'text-teal-deep',
    bg: 'bg-teal-deep/10',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Student Progress Dashboard',
    description:
      "Track every student's weak spots, XP, and completion rates in real-time.",
    color: 'text-marigold',
    bg: 'bg-marigold/10',
  },
  {
    icon: <PiggyBank size={28} />,
    title: 'Massive Cost Savings',
    description:
      'Replace $20/hr tutoring with unlimited AI practice for a flat platform fee.',
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
  },
];

const InstitutionsSection: FC = () => (
  <Section>
    <SectionTitle
      label="For Schools & Corporates"
      title="Built for Schools & Organizations"
      subtitle="Deploy AI-powered language learning at scale — no per-hour tutor costs."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="grid gap-6 sm:grid-cols-3"
    >
      {institutionBenefits.map((b, i) => (
        <motion.div
          key={b.title}
          variants={fadeUp}
          custom={i}
          className="glass-surface rounded-2xl border border-pencil/15 p-6"
        >
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${b.bg} ${b.color}`}
          >
            {b.icon}
          </div>
          <div className="flex items-center gap-2">
            <School size={14} className="text-pencil/60" />
            <h3 className="font-display text-lg font-bold text-paper">
              {b.title}
            </h3>
          </div>
          <p className="mt-3 font-body text-sm leading-relaxed text-pencil">
            {b.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   6. ROI CALCULATOR
   ═══════════════════════════════════════════════════════════════════════════ */

const ROICalculator: FC = () => {
  const [students, setStudents] = useState(100);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);

  const traditionalMonthlyCost = students * hoursPerWeek * 20 * 4;
  const hyenaMonthlyCost = 299;
  const monthlySavings = traditionalMonthlyCost - hyenaMonthlyCost;
  const annualSavings = monthlySavings * 12;

  const formatCurrency = (n: number) =>
    '$' + n.toLocaleString('en-US');

  return (
    <Section className="bg-paper/[0.02]">
      <SectionTitle
        label="ROI Calculator"
        title="Calculate Your Savings"
        subtitle="See how much your institution saves by switching to AI-powered practice."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="glass-surface mx-auto max-w-3xl rounded-2xl p-6 sm:p-8"
      >
        {/* Sliders */}
        <div className="space-y-8">
          {/* Students slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-display text-sm font-semibold text-paper">
                Number of Students
              </label>
              <span className="font-hud text-lg tabular-nums text-marigold">
                {students}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={5}
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-pencil/20 accent-terracotta"
            />
            <div className="mt-1 flex justify-between font-hud text-[10px] text-pencil/50">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Hours slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-display text-sm font-semibold text-paper">
                Practice Hours / Week per Student
              </label>
              <span className="font-hud text-lg tabular-nums text-marigold">
                {hoursPerWeek}h
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-pencil/20 accent-terracotta"
            />
            <div className="mt-1 flex justify-between font-hud text-[10px] text-pencil/50">
              <span>1h</span>
              <span>10h</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-pencil/15" />

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Traditional Cost */}
          <motion.div
            key={`trad-${traditionalMonthlyCost}`}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-xl border border-terracotta/20 bg-terracotta/10 p-5 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingDown size={16} className="text-terracotta" />
              <p className="font-hud text-[10px] uppercase tracking-widest text-terracotta">
                Traditional Tutoring
              </p>
            </div>
            <p className="mt-2 font-hud text-3xl font-bold tabular-nums text-terracotta">
              {formatCurrency(traditionalMonthlyCost)}
            </p>
            <p className="mt-1 font-body text-xs text-pencil">/month</p>
          </motion.div>

          {/* Hyena Cost */}
          <div className="rounded-xl border border-teal-deep/20 bg-teal-deep/10 p-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <Check size={16} className="text-teal-deep" />
              <p className="font-hud text-[10px] uppercase tracking-widest text-teal-deep">
                With TheLearningHyena
              </p>
            </div>
            <p className="mt-2 font-hud text-3xl font-bold tabular-nums text-teal-deep">
              $299
            </p>
            <p className="mt-1 font-body text-xs text-pencil">/month flat</p>
          </div>

          {/* Monthly Savings */}
          <motion.div
            key={`save-${monthlySavings}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="rounded-xl border border-marigold/30 bg-marigold/10 p-5 text-center"
          >
            <p className="font-hud text-[10px] uppercase tracking-widest text-marigold">
              Monthly Savings
            </p>
            <p className="mt-2 font-hud text-4xl font-bold tabular-nums text-marigold">
              {formatCurrency(monthlySavings)}
            </p>
          </motion.div>

          {/* Annual Savings */}
          <motion.div
            key={`annual-${annualSavings}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 22,
              delay: 0.05,
            }}
            className="rounded-xl border border-marigold/20 bg-paper/[0.04] p-5 text-center"
          >
            <p className="font-hud text-[10px] uppercase tracking-widest text-pencil">
              Annual Savings
            </p>
            <p className="mt-2 font-display text-3xl font-bold tabular-nums text-paper">
              {formatCurrency(annualSavings)}
            </p>
            <p className="mt-1 font-body text-xs text-marigold">per year</p>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   7. CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const CTASection: FC = () => (
  <Section className="pb-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
        Ready to Transform Language Learning?
      </h2>
      <p className="mx-auto mt-4 max-w-xl font-body text-base text-pencil">
        Join thousands of learners and institutions already using
        TheLearningHyena to build real fluency — faster and cheaper.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl bg-terracotta px-8 py-3.5 font-display text-base font-semibold text-paper shadow-lg transition-colors hover:bg-terracotta/90"
        >
          <Zap size={18} />
          Start Free Trial
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glass-nav-capsule flex items-center gap-2 rounded-xl px-8 py-3.5 font-display text-base font-semibold text-paper transition-colors hover:bg-paper/10"
        >
          <School size={18} className="text-marigold" />
          Contact for Schools
          <ArrowRight size={16} className="text-pencil" />
        </motion.button>
      </div>
    </motion.div>
  </Section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */

const WhyUsScreen: FC = () => {
  return (
    <div className="min-h-screen bg-ink">
      {/* Ambient background blobs for depth */}
      <div className="ambient-blob-container" aria-hidden>
        <div className="ambient-blob ambient-blob--terracotta" />
        <div className="ambient-blob ambient-blob--teal" />
        <div className="ambient-blob ambient-blob--marigold" />
      </div>

      <HeroSection />
      <ProblemSection />
      <ComparisonSection />
      <SolutionSection />
      <InstitutionsSection />
      <ROICalculator />
      <CTASection />
    </div>
  );
};

export default WhyUsScreen;
