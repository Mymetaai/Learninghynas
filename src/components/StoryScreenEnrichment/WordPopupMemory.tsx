import { type FC } from 'react';
import { BookOpen } from 'lucide-react';
import { useStoryProgressStore } from '../../state/storyProgressStore';

interface WordPopupMemoryProps {
  word: string;
  currentStoryTitle?: string;
}

export const WordPopupMemory: FC<WordPopupMemoryProps> = ({ word, currentStoryTitle }) => {
  const getWordEncounter = useStoryProgressStore((s) => s.getWordEncounter);
  const encounter = word ? getWordEncounter(word) : undefined;

  // Don't display memory line if word hasn't been met in another story or matches current story
  if (!encounter || (currentStoryTitle && encounter.storyTitle === currentStoryTitle)) {
    return null;
  }

  return (
    <div className="mt-3 pt-2.5 border-t border-structural/40 flex items-center gap-1.5 font-mono text-[11px] text-text-tertiary">
      <BookOpen className="h-3 w-3 text-[#7D927D] shrink-0" />
      <span>You first met this in <strong>{encounter.storyTitle}</strong>.</span>
    </div>
  );
};
