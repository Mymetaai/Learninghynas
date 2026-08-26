// Mistake History — full record of active slip-ups and mastered ones.
// Reads directly from trainingStore; no mock data.
import { useMemo, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  RotateCw,
  Trophy,
  Trash2,
} from 'lucide-react';
import { useTrainingStore } from '../state/trainingStore';

type Tab = 'active' | 'mastered';

const EXERCISE_TYPE_LABEL: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'fill-blank': 'Fill in the Blank',
  match: 'Matching',
  translation: 'Translation',
  listening: 'Listening',
  reorder: 'Reorder',
  'drag-drop': 'Drag & Drop',
};

const MistakeHistoryScreen: FC = () => {
  const navigate = useNavigate();
  const mistakes = useTrainingStore((s) => s.mistakes);
  const resolvedMistakes = useTrainingStore((s) => s.resolvedMistakes);
  const clearResolvedMistakes = useTrainingStore((s) => s.clearResolvedMistakes);

  const [tab, setTab] = useState<Tab>('active');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const sortedActive = useMemo(
    () => [...mistakes].sort((a, b) => b.date.localeCompare(a.date)),
    [mistakes],
  );
  const sortedResolved = useMemo(
    () => [...resolvedMistakes].sort((a, b) => b.resolvedDate.localeCompare(a.resolvedDate)),
    [resolvedMistakes],
  );

  const totalEverMissed = mistakes.length + resolvedMistakes.length;
  const masteryRate =
    totalEverMissed > 0 ? Math.round((resolvedMistakes.length / totalEverMissed) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-20 sm:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl border border-structural/40 text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-serif text-xl font-bold text-text-primary">Mistake History</h1>
          <p className="font-sans text-xs text-text-secondary mt-0.5">
            Everything you've slipped up on — and everything you've already fixed.
          </p>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-structural/80 bg-[#C4796B]/5 p-4 text-center shadow-sm">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated shadow-inner">
            <AlertTriangle className="h-4 w-4 text-[#C4796B]" />
          </div>
          <h4 className="mt-2 font-mono text-lg font-bold text-text-primary tabular-nums">
            {mistakes.length}
          </h4>
          <p className="font-sans text-[10px] text-text-secondary font-medium tracking-wider uppercase mt-0.5">
            Still Active
          </p>
        </div>
        <div className="rounded-2xl border border-structural/80 bg-[#7D927D]/5 p-4 text-center shadow-sm">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated shadow-inner">
            <Trophy className="h-4 w-4 text-[#7D927D]" />
          </div>
          <h4 className="mt-2 font-mono text-lg font-bold text-text-primary tabular-nums">
            {resolvedMistakes.length}
          </h4>
          <p className="font-sans text-[10px] text-text-secondary font-medium tracking-wider uppercase mt-0.5">
            Mastered
          </p>
        </div>
        <div className="rounded-2xl border border-structural/80 bg-bg-elevated-2 p-4 text-center shadow-sm">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated shadow-inner">
            <CheckCircle2 className="h-4 w-4 text-[#7D927D]" />
          </div>
          <h4 className="mt-2 font-mono text-lg font-bold text-text-primary tabular-nums">
            {masteryRate}%
          </h4>
          <p className="font-sans text-[10px] text-text-secondary font-medium tracking-wider uppercase mt-0.5">
            Mastery Rate
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-structural/40">
        {([
          { id: 'active' as Tab, label: `Active (${mistakes.length})` },
          { id: 'mastered' as Tab, label: `Mastered (${resolvedMistakes.length})` },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 font-sans text-xs font-semibold cursor-pointer border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? 'border-[#7D927D] text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active list */}
      <AnimatePresence mode="wait">
        {tab === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {sortedActive.length === 0 ? (
              <div className="bg-bg-elevated/90 border border-structural/40 rounded-2xl p-8 text-center">
                <p className="font-sans text-sm text-text-secondary">
                  No active slip-ups right now — nice work. Keep practicing and anything
                  you miss will show up here.
                </p>
              </div>
            ) : (
              sortedActive.map((item, idx) => (
                <div
                  key={`${item.word}-${idx}`}
                  className="bg-bg-elevated/90 border border-structural/40 hover:border-[#7D927D]/50 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#C4796B]/15 border border-[#C4796B]/30 flex items-center justify-center text-[#C4796B] shrink-0 mt-0.5">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-bold text-text-primary line-clamp-2">
                        {item.word}
                      </h4>
                      <p className="font-sans text-xs text-text-secondary mt-0.5">
                        Correct answer: <span className="text-text-primary font-medium">{item.correctAnswer}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-sans text-[9px] font-bold uppercase tracking-wider rounded-full bg-bg-elevated-2 border border-structural/40 px-2 py-0.5 text-text-secondary">
                          {EXERCISE_TYPE_LABEL[item.exerciseType] ?? item.exerciseType}
                        </span>
                        <span className="font-sans text-[10px] text-text-secondary">
                          {item.reviewedCorrectly === 1 ? '1 correct review — almost cleared' : `Missed ${item.date}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/training?mode=weak-spots&word=${encodeURIComponent(item.word)}`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#7D927D] hover:bg-[#6B826B] text-white font-sans text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" /> Drill this
                  </button>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Mastered list */}
        {tab === 'mastered' && (
          <motion.div
            key="mastered"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {sortedResolved.length === 0 ? (
              <div className="bg-bg-elevated/90 border border-structural/40 rounded-2xl p-8 text-center">
                <p className="font-sans text-sm text-text-secondary">
                  Nothing mastered yet — once you answer a slip-up correctly twice,
                  it'll graduate here.
                </p>
              </div>
            ) : (
              <>
                {sortedResolved.map((item, idx) => (
                  <div
                    key={`${item.word}-${idx}`}
                    className="bg-[#7D927D]/5 border border-[#7D927D]/20 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="h-9 w-9 rounded-xl bg-[#7D927D]/15 border border-[#7D927D]/30 flex items-center justify-center text-[#7D927D] shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-bold text-text-primary line-clamp-2">
                        {item.word}
                      </h4>
                      <p className="font-sans text-xs text-text-secondary mt-0.5">
                        {item.correctAnswer} · mastered {item.resolvedDate}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-text-secondary hover:text-[#C4796B] font-sans text-xs font-medium cursor-pointer transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear mastered history
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear confirm modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-bg-elevated max-w-sm w-full rounded-2xl p-6 border border-structural shadow-xl space-y-4 text-center">
            <h3 className="font-serif text-lg font-bold text-text-primary">
              Clear mastered history?
            </h3>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              This only removes the record of what you've already fixed. It won't
              affect your active slip-ups above.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-structural text-xs font-semibold text-text-primary hover:bg-bg-elevated-2 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearResolvedMistakes();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#C4796B] hover:bg-[#b06a5d] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MistakeHistoryScreen;
