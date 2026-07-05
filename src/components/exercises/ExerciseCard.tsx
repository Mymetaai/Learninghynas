// STEP 8 — Exercise Card wrapper.
// Reads the exercise type and dispatches to the correct exercise renderer.
// Each exercise renders inside a parchment card with consistent chrome.
import { type FC } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '../../content/types';
import MultipleChoice from './MultipleChoice';
import FillBlank from './FillBlank';
import MatchPairs from './MatchPairs';
import ReorderList from './ReorderList';
import TranslationInput from './TranslationInput';
import ListeningExercise from './ListeningExercise';
import DragDrop from './DragDrop';

interface ExerciseCardProps {
  exercise: Exercise;
  /** 1-based index shown in the header. */
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
  onAnswerStart?: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'fill-blank': 'Fill in the Blank',
  match: 'Match the Pairs',
  reorder: 'Put in Order',
  translation: 'Translation',
  listening: 'Listening',
  'drag-drop': 'Select the Correct Items',
};

const ExerciseCard: FC<ExerciseCardProps> = ({
  exercise,
  index,
  total,
  onAnswer,
  onAnswerStart,
}) => {
  const handleAnswer = (correct: boolean) => {
    if (onAnswerStart) onAnswerStart();
    // Brief delay so the user sees feedback before moving on
    setTimeout(() => onAnswer(correct), 1200);
  };

  return (
    <motion.div
      key={exercise.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-structural bg-bg-elevated p-6 text-text-primary shadow-2xl"
    >
      {/* Exercise header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-accent-action">
          {TYPE_LABELS[exercise.type] ?? exercise.type}
        </p>
        <p className="font-body text-[10px] text-text-secondary">
          {index} / {total}
        </p>
      </div>

      {/* Dispatch to the correct renderer */}
      <ExerciseRenderer exercise={exercise} onAnswer={handleAnswer} />
    </motion.div>
  );
};

/** Inner dispatcher — kept separate for clarity. */
const ExerciseRenderer: FC<{
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}> = ({ exercise, onAnswer }) => {
  const { type, prompt, answer, options, direction, context, distractorPool } =
    exercise;

  const commonProps = { context, onAnswer };

  switch (type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          {...commonProps}
          prompt={prompt}
          options={options ?? []}
          answer={answer}
        />
      );
    case 'fill-blank':
      return (
        <FillBlank
          {...commonProps}
          prompt={prompt}
          answer={answer}
          distractorPool={distractorPool}
        />
      );
    case 'match':
      return (
        <MatchPairs
          {...commonProps}
          prompt={prompt}
          answer={answer}
          options={options ?? []}
        />
      );
    case 'reorder':
      return (
        <ReorderList
          {...commonProps}
          prompt={prompt}
          answer={answer}
          options={options ?? []}
        />
      );
    case 'translation':
      return (
        <TranslationInput
          {...commonProps}
          prompt={prompt}
          answer={answer}
          direction={direction}
          distractorPool={distractorPool}
        />
      );
    case 'listening':
      return (
        <ListeningExercise
          {...commonProps}
          prompt={prompt}
          options={options ?? []}
          answer={answer}
        />
      );
    case 'drag-drop':
      return (
        <DragDrop
          {...commonProps}
          prompt={prompt}
          answer={answer}
          options={options ?? []}
        />
      );
    default:
      return (
        <p className="font-body text-sm text-pencil">
          Unknown exercise type: {type}
        </p>
      );
  }
};

export default ExerciseCard;
