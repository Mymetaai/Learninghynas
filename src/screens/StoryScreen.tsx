// STEP 6→7 — Story Chapter screen and Stories Library catalog.
// Core reading experience with ink-reveal vocab animation (Step 7).
// Can load a quest story via ?quest= id OR a standalone library story via ?story= id.
// If neither is specified, displays a beautiful 50-story library catalog grouped by level.
import { useMemo, useState, useCallback, type FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQuest } from '../content';
import { LIBRARY_STORIES } from '../content/stories';
import TypewriterText from '../components/TypewriterText';
import InkRevealCard from '../components/InkRevealCard';
import { 
  BookOpen, 
  ArrowLeft, 
  Award, 
  Search, 
  FileText,
  Languages
} from 'lucide-react';
import { useSettingsStore } from '../state/settingsStore';
import { translateToHinglish, translateWordToHinglish } from '../utils/hinglish';

const StoryScreen: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const questId = params.get('quest') ?? '';
  const storyId = params.get('story') ?? '';

  // 1. Resolve Quest-based story
  const quest = useMemo(() => (questId ? getQuest(questId) : null), [questId]);

  // 2. Resolve Library-based story
  const libraryStory = useMemo(() => (storyId ? LIBRARY_STORIES.find((s) => s.id === storyId) : null), [storyId]);

  // 3. Render reader if either story type is active
  if (quest) {
    return (
      <StoryChapter
        questTitle={quest.title}
        lines={quest.storyLines}
        vocabulary={quest.vocabulary}
        grammarNotes={quest.grammarNotes}
        questId={questId}
        subtitle="Quest Chapter"
        onContinue={() => navigate(`/training?quest=${questId}`)}
      />
    );
  }

  if (libraryStory) {
    return (
      <StoryChapter
        questTitle={libraryStory.title}
        lines={libraryStory.storyLines}
        storyTranslations={libraryStory.storyTranslations}
        vocabulary={libraryStory.vocabulary}
        grammarNotes={libraryStory.grammarNotes}
        questId={libraryStory.levelLabel}
        subtitle="Library Story"
        onContinue={() => navigate('/stories')}
        isLibrary
      />
    );
  }

  // 4. Otherwise, render the Stories Library Catalog
  return <StoriesLibrary />;
};

/* ── STORIES LIBRARY CATALOG COMPONENT ────────────────────────────────────── */

const StoriesLibrary: FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = ['All', 'Nursery', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const filteredStories = useMemo(() => {
    return LIBRARY_STORIES.filter((story) => {
      const matchesLevel = selectedLevel === 'All' || story.level === selectedLevel;
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.levelLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [selectedLevel, searchQuery]);

  const getLevelBadgeStyles = (level: string) => {
    switch (level) {
      case 'Nursery':
        return 'bg-teal-deep/10 text-teal-deep border-teal-deep/20';
      case 'A1':
        return 'bg-marigold/10 text-marigold border-marigold/20';
      case 'A2':
        return 'bg-terracotta/10 text-terracotta border-terracotta/20';
      case 'B1':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'B2':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'C1':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-pencil/10 text-pencil border-pencil/20';
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-body py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-pencil/20 pb-4">
          <div>
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
              Biblioteca de Lectura
            </p>
            <h1 className="font-display text-2xl font-bold text-text-primary">Stories Library</h1>
            <p className="font-body text-xs text-pencil mt-1">
              Explore 50 hand-crafted stories designed to build Spanish proficiency from Starter to Expert level.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-paper/5 border border-pencil/25 rounded-xl px-3 py-1.5 w-full md:w-64 max-w-sm">
            <Search className="h-4 w-4 text-pencil" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-text-primary focus:outline-none w-full placeholder:text-pencil/50"
            />
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-lg border text-xs font-hud transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-terracotta text-text-primary border-terracotta shadow-md scale-105'
                  : 'bg-paper/5 border-pencil/20 text-pencil hover:bg-paper/10 hover:text-text-primary'
              }`}
            >
              {lvl === 'All' ? 'Todos' : lvl}
            </button>
          ))}
        </div>

        {/* Grid Catalog */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-pencil/25 rounded-2xl bg-paper/5">
            <BookOpen className="h-8 w-8 text-pencil/40 mx-auto mb-2 animate-pulse" />
            <p className="font-display text-base text-pencil">No stories match your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <button
                key={story.id}
                onClick={() => navigate(`/stories?story=${story.id}`)}
                className="w-full text-left rounded-2xl border border-pencil/30 bg-paper/5 p-5 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:border-pencil/50 group flex flex-col justify-between h-48 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`font-hud text-[9px] uppercase px-2 py-0.5 rounded-full border ${getLevelBadgeStyles(story.level)}`}>
                      {story.levelLabel}
                    </span>
                    <span className="font-hud text-[10px] text-pencil group-hover:text-text-primary transition-colors">
                      {story.storyLines.length} líneas
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-terracotta transition-colors line-clamp-1">
                    {story.title}
                  </h3>
                  <p className="font-body text-xs text-pencil mt-2 line-clamp-3 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pencil/10 flex items-center justify-between">
                  <span className="font-hud text-[10px] text-pencil flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {story.vocabulary.length} vocablos
                  </span>
                  <span className="font-display text-xs text-terracotta font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Leer Historia →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

/* ── STORY READER CHAPTER COMPONENT ───────────────────────────────────────── */

interface StoryChapterProps {
  questTitle: string;
  lines: string[];
  storyTranslations?: string[];
  vocabulary: { word: string; meaning: string; pronunciation: string }[];
  grammarNotes: { title: string; explanation: string; exampleFromStory: string }[];
  questId: string;
  subtitle: string;
  onContinue: () => void;
  isLibrary?: boolean;
}

const StoryChapter: FC<StoryChapterProps> = ({
  questTitle,
  lines,
  storyTranslations,
  vocabulary,
  grammarNotes,
  questId,
  subtitle,
  onContinue,
  isLibrary = false,
}) => {
  const { language } = useSettingsStore();
  const [storyComplete, setStoryComplete] = useState(false);
  const [showFullTranslation, setShowFullTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
    pronunciation: string;
  } | null>(null);
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());

  const handleComplete = useCallback(() => setStoryComplete(true), []);

  const vocabLookup = useMemo(() => {
    const map = new Map<string, (typeof vocabulary)[number]>();
    vocabulary.forEach((v) => map.set(v.word.toLowerCase(), v));
    return map;
  }, [vocabulary]);

  const handleWordTap = useCallback(
    (vocab: typeof vocabulary[number]) => {
      setSelectedWord(vocab);
      setRevealedWords((prev) => new Set(prev).add(vocab.word.toLowerCase()));
    },
    [],
  );

  const renderLine = useCallback(
    (text: string, lineIndex: number, fullyRevealed: boolean) => {
      const parts = text.split(/(\b\w+\b)/g);
      const rawTranslation = storyTranslations ? storyTranslations[lineIndex] : null;
      const translation = (language === 'hinglish' && rawTranslation) ? translateToHinglish(rawTranslation) : rawTranslation;
      return (
        <div key={lineIndex} className="mb-4">
          <p className="font-body text-lg leading-relaxed text-ink">
            {parts.map((part, pi) => {
              const vocab = vocabLookup.get(part.toLowerCase());
              if (vocab && fullyRevealed) {
                const isRevealed = revealedWords.has(vocab.word.toLowerCase());
                return (
                  <button
                    key={pi}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWordTap(vocab);
                    }}
                    className={`border-b-2 border-dashed transition-colors cursor-pointer ${
                      isRevealed
                        ? 'border-marigold/60 text-marigold hover:bg-marigold/20 font-medium'
                        : 'border-terracotta/60 text-ink hover:bg-terracotta/20 hover:text-marigold font-medium'
                    }`}
                    aria-label={`${vocab.word}: ${vocab.meaning}`}
                  >
                    {part}
                  </button>
                );
              }
              return <span key={pi}>{part}</span>;
            })}
          </p>
          {showFullTranslation && translation && fullyRevealed && (
            <p className="font-body text-sm italic text-pencil/80 mt-1 animate-fadeIn leading-relaxed">
              {translation}
            </p>
          )}
        </div>
      );
    },
    [vocabLookup, revealedWords, handleWordTap, showFullTranslation, storyTranslations],
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-8">
      <div className="mx-auto max-w-lg">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
              {subtitle} · {questId}
            </p>
            <h1 className="font-display text-2xl font-bold text-text-primary mt-1">{questTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            {storyTranslations && storyTranslations.length > 0 && (
              <button
                onClick={() => setShowFullTranslation(!showFullTranslation)}
                className={`flex items-center gap-1.5 text-xs font-hud px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                  showFullTranslation 
                    ? 'bg-terracotta text-text-primary border-terracotta'
                    : 'bg-paper/5 border-pencil/20 text-pencil hover:bg-paper/10 hover:text-text-primary'
                }`}
              >
                <Languages className="h-3.5 w-3.5" />
                {showFullTranslation ? 'Ocultar' : 'Traducir'}
              </button>
            )}
            {isLibrary && (
              <button
                onClick={onContinue}
                className="flex items-center gap-1 font-hud text-xs text-pencil hover:text-text-primary transition-colors cursor-pointer border border-pencil/20 rounded px-2.5 py-1 bg-paper/5 hover:bg-paper/10 shadow"
              >
                <ArrowLeft className="h-3 w-3" /> Biblioteca
              </button>
            )}
          </div>
        </div>

        {/* Story parchment card */}
        <div className="rounded-2xl border-2 border-[#DDD0B5] bg-[#FAF6EE] p-6 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative">
          
          {/* Postmark stamp detail */}
          <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full border border-[#DDD0B5] border-dashed text-xs text-pencil select-none font-hud opacity-60">
            {isLibrary ? 'LIB' : 'QST'}
          </div>

          <TypewriterText
            lines={lines}
            speed={25}
            onComplete={handleComplete}
            renderLine={renderLine}
          />
        </div>

        {/* Audio helper tool */}
        <div className="mt-4 rounded-xl border border-pencil/20 bg-paper/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl" role="img" aria-hidden="true">🔊</span>
            <span className="font-hud text-[10px] text-pencil">
              Toca las palabras subrayadas para escuchar y ver su significado.
            </span>
          </div>
        </div>

        {/* Grammar notes panel */}
        {storyComplete && grammarNotes.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="font-hud text-[10px] uppercase tracking-[0.25em] text-marigold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" /> Notas Gramaticales
            </p>
            {grammarNotes.map((gn, i) => (
              <div
                key={i}
                className="rounded-xl border border-pencil/20 bg-paper/5 p-4 relative"
              >
                <h3 className="font-display text-sm font-semibold text-text-primary">
                  {gn.title}
                </h3>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-text-primary/85">
                  {gn.explanation}
                </p>
                <p className="mt-2.5 font-body text-xs italic text-terracotta bg-terracotta/5 border border-terracotta/10 rounded px-2.5 py-1">
                  Ejemplo: "{gn.exampleFromStory}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Final Actions */}
        {storyComplete && (
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 w-full rounded-xl bg-terracotta px-4 py-3 font-display text-base font-semibold text-text-primary shadow-lg hover:bg-terracotta/90 transition-colors cursor-pointer text-center block"
          >
            {isLibrary ? 'Volver a la Biblioteca' : 'Continuar a Ejercicios →'}
          </button>
        )}
      </div>

      {/* Ink-reveal modal */}
      <InkRevealCard
        word={selectedWord?.word ?? ''}
        pronunciation={selectedWord?.pronunciation ?? ''}
        meaning={selectedWord ? (language === 'hinglish' ? translateWordToHinglish(selectedWord.meaning) : selectedWord.meaning) : ''}
        visible={selectedWord !== null}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
};

export default StoryScreen;
