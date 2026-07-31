// STEP 5 — Quest Preview card.
// A bottom-sheet-style card showing quest details before the player commits.
// Reads the quest id from the `?quest=` query parameter (set by the World
// Map pin tap). Shows: chapter title, estimated time, XP/coin reward, topic
// tags, and a "Begin Quest" button that navigates to the Story screen.
import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQuest } from '../content';
import { useProgressStore } from '../state/progressStore';
import ScreenPlaceholder from '../components/ScreenPlaceholder';
import { useSettingsStore } from '../state/settingsStore';
import { translateWordToHinglish } from '../utils/hinglish';

const QuestPreviewScreen = () => {
  const [params] = useSearchParams();
  const { language } = useSettingsStore();
  const navigate = useNavigate();
  const questId = params.get('quest') ?? '';
  const quest = useMemo(() => getQuest(questId), [questId]);

  // Guard: no quest id provided (e.g. direct nav without query param).
  if (!quest) {
    return (
      <ScreenPlaceholder
        title="Quest Preview"
        builtIn="Step 5"
        description="Select a quest from the World Map to preview it here."
      />
    );
  }

  const completed = useProgressStore((s) => s.completedQuestIds.includes(questId));
  const unlocked = useProgressStore((s) => s.isQuestUnlocked(questId));

  const handleBegin = () => {
    navigate(`/stories?quest=${questId}`);
  };

  const handleBack = () => {
    navigate('/map');
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-end pb-6 px-4">
      {/* Dim backdrop — click to go back */}
      <button
        type="button"
        className="absolute inset-0 z-0 bg-bg-base/60"
        onClick={handleBack}
        aria-label="Go back to map"
      />

      {/* Card — slides up from bottom */}
      <div className="relative z-10 w-full max-w-lg rounded-t-2xl border border-[#7D927D]/30 bg-white p-6 shadow-sm">
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#777775]/30" />

        {/* Topic badge */}
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D927D]">
          {quest.topicFocus.join(' · ')}
        </p>

        {/* Title */}
        <h1 className="mt-1 font-serif text-2xl font-bold text-[#2F353B]">
          {quest.title}
        </h1>
        <p className="mt-1 font-sans text-sm text-[#777775]">{quest.subtitle}</p>

        {/* Stats row */}
        <div className="mt-5 flex items-center gap-6 rounded-xl border border-[#7D927D]/20 bg-bg-base/5 px-4 py-3">
          <Stat icon="⏱" label="Est. time" value={`${quest.estimatedMinutes} min`} />
          <Stat icon="✨" label="XP" value={`${quest.rewards.xp}`} />
          <Stat icon="🪙" label="Coins" value={`${quest.rewards.coins}`} />
          <Stat icon="📝" label="Exercises" value={`${quest.exercises.length}`} />
          <Stat icon="📖" label="Words" value={`${quest.vocabulary.length}`} />
        </div>

        {/* Vocabulary preview — first 5 words */}
        {quest.vocabulary.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#777775]">
              New words in this quest
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quest.vocabulary.slice(0, 5).map((v) => (
                <span
                  key={v.word}
                  className="inline-flex items-center gap-1 rounded-full border border-[#7D927D]/20 bg-bg-base/5 px-2.5 py-1 font-sans text-xs text-[#2F353B]"
                >
                  {v.word}
                  <span className="text-[#777775]">({language === 'hinglish' ? translateWordToHinglish(v.meaning) : v.meaning})</span>
                </span>
              ))}
              {quest.vocabulary.length > 5 && (
                <span className="inline-flex items-center rounded-full border border-[#7D927D]/20 bg-bg-base/5 px-2.5 py-1 font-sans text-xs text-[#777775]">
                  +{quest.vocabulary.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 rounded-xl border border-[#7D927D]/30 bg-white px-4 py-3 font-serif text-sm font-semibold text-[#2F353B] transition-colors hover:bg-[#777775]/10"
          >
            ← Back
          </button>
          {completed ? (
            <button
              type="button"
              onClick={handleBegin}
              className="flex-1 rounded-xl border border-[#7D927D]/40 bg-[#7D927D] px-4 py-3 font-serif text-sm font-semibold text-white transition-colors hover:bg-[#7D927D]/90"
            >
              ✓ Replay
            </button>
          ) : (
            <button
              type="button"
              disabled={!unlocked}
              onClick={handleBegin}
              className={`flex-1 rounded-xl px-4 py-3 font-serif text-sm font-semibold transition-colors ${
                unlocked
                  ? 'bg-[#7D927D] text-white hover:bg-[#7D927D]/90'
                  : 'cursor-not-allowed border border-[#7D927D]/30 bg-white text-[#777775]'
              }`}
            >
              {unlocked ? 'Begin Quest →' : '🔒 Locked'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatProps {
  icon: string;
  label: string;
  value: string;
}

const Stat = ({ icon, label, value }: StatProps) => (
  <div className="flex flex-col items-center">
    <span aria-hidden>{icon}</span>
    <span className="mt-0.5 font-mono text-xs font-semibold text-[#2F353B]">{value}</span>
    <span className="font-sans text-[9px] text-[#777775]">{label}</span>
  </div>
);

export default QuestPreviewScreen;
