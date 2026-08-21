import { useState, type FC } from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import { useStoryProgressStore } from '../../state/storyProgressStore';
import { playSpanishPronunciation, fetchWordDefinition } from '../../services/dictionaryService';

interface WordPopupMemoryProps {
  word: string;
  currentStoryTitle?: string;
}

export const WordPopupMemory: FC<WordPopupMemoryProps> = ({ word, currentStoryTitle }) => {
  const getWordEncounter = useStoryProgressStore((s) => s.getWordEncounter);
  const encounter = word ? getWordEncounter(word) : undefined;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPronunciation = async () => {
    if (!word || isPlaying) return;
    setIsPlaying(true);
    try {
      const def = await fetchWordDefinition(word);
      playSpanishPronunciation(word, def?.audioUrl);
    } catch {
      playSpanishPronunciation(word);
    } finally {
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  return (
    <div className="mt-3 pt-2.5 border-t border-structural/40 flex flex-col gap-2">
      {/* Pronunciation audio button */}
      {word && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePlayPronunciation}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#7D927D]/10 hover:bg-[#7D927D]/20 text-[#5E735E] dark:text-[#A3B899] border border-[#7D927D]/30 font-mono text-[11px] font-bold transition-all cursor-pointer"
            title="Listen to Spanish pronunciation"
          >
            <Volume2 className={`h-3.5 w-3.5 ${isPlaying ? 'animate-bounce text-[#7D927D]' : ''}`} />
            <span>Escuchar Pronunciación</span>
          </button>
        </div>
      )}

      {encounter && (!currentStoryTitle || encounter.storyTitle !== currentStoryTitle) && (
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-tertiary">
          <BookOpen className="h-3 w-3 text-[#7D927D] shrink-0" />
          <span>You first met this in <strong>{encounter.storyTitle}</strong>.</span>
        </div>
      )}
    </div>
  );
};
