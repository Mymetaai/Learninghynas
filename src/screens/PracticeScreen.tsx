// STEP 8 — Practice / Exercise screen.
// Loads exercises from the current quest (via ?quest= query param) and
// presents them using the ExerciseEngine. If no quest id is provided,
// shows a placeholder with a link back to the map.
import { useMemo, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQuest } from '../content';
import ScreenPlaceholder from '../components/ScreenPlaceholder';
import ExerciseEngine from '../components/exercises/ExerciseEngine';

const PracticeScreen: FC = () => {
  const [params] = useSearchParams();
  const questId = params.get('quest') ?? '';
  const quest = useMemo(() => getQuest(questId), [questId]);

  if (!quest) {
    return (
      <ScreenPlaceholder
        title="Training Grounds"
        builtIn="Step 8"
        description="Start a quest and complete the story to unlock exercises."
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
          Training · {questId}
        </p>
        <h1 className="font-display text-2xl font-bold text-paper">{quest.title}</h1>
        <p className="mt-1 font-body text-sm text-pencil">{quest.subtitle}</p>
      </div>

      {/* Exercise engine */}
      <ExerciseEngine
        exercises={quest.exercises}
        questId={questId}
        questTitle={quest.title}
      />
    </div>
  );
};

export default PracticeScreen;
