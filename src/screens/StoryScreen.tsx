// STEP 6→7 — Story Chapter screen and Stories Library catalog.
// Core reading experience with ink-reveal vocab animation & psychological engagement garnishes.
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
import { PassportStamp } from '../components/StoryScreenEnrichment/PassportStamp';
import { RecallChip } from '../components/StoryScreenEnrichment/RecallChip';
import { MascotAside } from '../components/StoryScreenEnrichment/MascotAside';
import { TranslateFlip } from '../components/StoryScreenEnrichment/TranslateFlip';
import { useSceneReact } from '../components/StoryScreenEnrichment/SceneReact';
import { useStoryProgressStore } from '../state/storyProgressStore';

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
        storyId={questId}
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
    const rawLines = libraryStory.lines ? libraryStory.lines.map((l) => l.text) : (libraryStory.storyLines ?? []);
    const grammarNotesList = libraryStory.grammar_note
      ? [{ title: libraryStory.grammar_note.term, explanation: libraryStory.grammar_note.explanation, exampleFromStory: libraryStory.grammar_note.example }]
      : (libraryStory.grammarNotes ?? []);

    return (
      <StoryChapter
        storyId={libraryStory.id}
        questTitle={libraryStory.title}
        lines={rawLines}
        storyTranslations={libraryStory.storyTranslations}
        vocabulary={libraryStory.vocabulary}
        grammarNotes={grammarNotesList}
        questId={libraryStory.levelLabel ?? `Lección ${libraryStory.lesson}`}
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
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const getStoryStatus = useStoryProgressStore((s) => s.getStoryStatus);

  const levels = ['All Stories', 'Pre-A1', 'A1', 'A2', 'B1', 'C1'];
  const subTiers = ['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'];

  const filteredStories = useMemo(() => {
    return LIBRARY_STORIES.filter((story) => {
      const levelKey = selectedLevel === 'All Stories' ? 'All' : selectedLevel;
      const badge = story.cefr_badge || story.level || 'A1';
      const matchesLevel = levelKey === 'All' || badge === levelKey;
      
      const tierNum = selectedTier === 'All Tiers' ? null : parseInt(selectedTier.replace('Tier ', ''), 10);
      const matchesTier = tierNum === null || story.tier === tierNum;

      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.new_grammar_point && story.new_grammar_point.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (story.levelLabel && story.levelLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
        `leccion ${story.lesson}`.includes(searchQuery.toLowerCase());

      return matchesLevel && matchesTier && matchesSearch;
    });
  }, [selectedLevel, selectedTier, searchQuery]);

  // Compute recommended story ID (lowest unstamped story in catalog)
  const recommendedStoryId = useMemo(() => {
    const unstamped = LIBRARY_STORIES.find((s) => getStoryStatus(s.id) !== 'stamped');
    return unstamped ? unstamped.id : null;
  }, [getStoryStatus]);



  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-sans py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-text-primary/20 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-accent-action">
              📚 Biblioteca de Lectura · 15 Tiers Curriculum
            </p>
            <h1 className="font-serif text-3xl font-bold text-text-primary">Stories Library</h1>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Explore 50 hand-crafted stories built with deliberate, slow grammar progression across 15 curriculum tiers.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-bg-elevated border border-text-primary rounded-full px-4 py-2 w-full md:w-72 shadow-sm">
            <Search className="h-4 w-4 text-text-secondary shrink-0" />
            <input
              type="text"
              placeholder="Search title, grammar rule, or tier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-text-primary focus:outline-none w-full placeholder:text-text-tertiary"
            />
          </div>
        </div>

        {/* Level Filters & Sub-Tier Filters */}
        <div className="space-y-3">
          {/* Main Level Bar */}
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#7D927D] text-white hover:bg-[#6B826B] border-[#7D927D] shadow-sm scale-105'
                    : 'bg-bg-elevated border-structural text-text-secondary hover:border-text-primary hover:text-text-primary'
                }`}
              >
                {lvl === 'All Stories' ? '📚 All Stories' : lvl}
              </button>
            ))}
          </div>

          {/* Sub-Tier Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] pt-1 border-t border-structural/40">
            <span className="font-mono text-[11px] font-semibold text-text-tertiary uppercase tracking-wider shrink-0 mr-1">
              Sub-Tier:
            </span>
            {subTiers.map((tierLabel) => (
              <button
                key={tierLabel}
                onClick={() => setSelectedTier(tierLabel)}
                className={`px-3 py-1 rounded-full border text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                  selectedTier === tierLabel
                    ? 'bg-[#5E735E] text-white border-[#5E735E] shadow-xs'
                    : 'bg-bg-elevated-2 border-structural text-text-secondary hover:text-text-primary hover:border-text-secondary'
                }`}
              >
                {tierLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 3x4 Grid Booklet Catalog */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-text-primary/30 rounded-2xl bg-bg-elevated p-8">
            <BookOpen className="h-10 w-10 text-text-tertiary mx-auto mb-3 animate-bounce" />
            <p className="font-serif text-lg font-bold text-text-primary">No stories match your filter combination.</p>
            <p className="font-sans text-xs text-text-secondary mt-1">Try resetting the tier filter or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => {
              const status = getStoryStatus(story.id);
              const isStamped = status === 'stamped';
              const isRecommended = story.id === recommendedStoryId;

              return (
                <button
                  key={story.id}
                  onClick={() => navigate(`/stories?story=${story.id}`)}
                  className={`w-full text-left rounded-2xl border bg-bg-elevated p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0.5 active:shadow-sm group flex flex-col justify-between h-64 cursor-pointer relative overflow-hidden ${
                    isRecommended ? 'border-[#7D927D] ring-2 ring-[#7D927D]/30' : 'border-structural'
                  }`}
                >
                  {/* Book Cover Decorative Tint Header */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#7D927D] via-[#A8BFA8] to-[#D4DCD4] border-b border-structural" />

                  <div className="pt-2">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {story.cefr_badge && (
                          <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border bg-[#5E735E] text-white border-[#5E735E]">
                            {story.cefr_badge}
                          </span>
                        )}
                        {story.lesson && (
                          <span className="font-mono text-[10px] font-bold text-text-primary bg-bg-elevated-2 px-2 py-0.5 rounded-full border border-structural">
                            Lección {story.lesson}
                          </span>
                        )}
                        {story.lines && story.lines.length > 0 && (
                          <span className="font-mono text-[9px] text-[#5E735E] bg-[#7D927D]/10 px-1.5 py-0.5 rounded border border-[#7D927D]/20">
                            🎰 Fórmula
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isRecommended && (
                          <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300">
                            ⭐ Recomendado
                          </span>
                        )}
                        {isStamped && (
                          <span className="font-mono text-[10px] font-bold text-[#5E735E] bg-[#7D927D]/15 px-2 py-0.5 rounded-full border border-[#7D927D]/30">
                            ✓ Sellado
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-text-primary group-hover:text-[#7D927D] transition-colors line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                      {story.description}
                    </p>

                    {/* Target Grammar Pill */}
                    {story.new_grammar_point && (
                      <div className="mt-2.5">
                        <span className="font-mono text-[10px] text-[#5E735E] bg-[#7D927D]/10 px-2 py-1 rounded-md border border-[#7D927D]/20 inline-block line-clamp-1">
                          🎯 Gramática: {story.new_grammar_point}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-structural flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-text-primary bg-bg-elevated-2 border border-structural rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-[#7D927D]" />
                      {story.vocabulary.length} vocab
                    </span>
                    <span className="font-sans text-xs text-white font-bold bg-[#7D927D] hover:bg-[#6B826B] px-3.5 py-1.5 rounded-full border border-[#7D927D] shadow-sm flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                      Leer Historia →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

/* ── STORY READER CHAPTER COMPONENT ───────────────────────────────────────── */

interface StoryChapterProps {
  storyId: string;
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
  storyId,
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
  const [showFormula, setShowFormula] = useState(true);
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
    pronunciation: string;
  } | null>(null);
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());

  const { activeWordKey, triggerReact } = useSceneReact();
  const recordWordEncounter = useStoryProgressStore((s) => s.recordWordEncounter);

  const handleComplete = useCallback(() => setStoryComplete(true), []);

  const activeStoryObj = useMemo(() => {
    return LIBRARY_STORIES.find((s) => s.id === storyId);
  }, [storyId]);

  const vocabLookup = useMemo(() => {
    const map = new Map<string, (typeof vocabulary)[number]>();
    vocabulary.forEach((v) => map.set(v.word.toLowerCase(), v));
    return map;
  }, [vocabulary]);

  const handleWordTap = useCallback(
    (vocab: typeof vocabulary[number]) => {
      setSelectedWord(vocab);
      triggerReact(vocab.word);
      recordWordEncounter(vocab.word, storyId, questTitle);
      setRevealedWords((prev) => new Set(prev).add(vocab.word.toLowerCase()));
    },
    [triggerReact, recordWordEncounter, storyId, questTitle],
  );

  const renderLine = useCallback(
    (text: string, lineIndex: number, fullyRevealed: boolean) => {
      const parts = text.split(/(\b\w+\b)/g);
      const rawTranslation = storyTranslations ? storyTranslations[lineIndex] : null;
      const translation = (language === 'hinglish' && rawTranslation) ? translateToHinglish(rawTranslation) : rawTranslation;
      const lineFormula = activeStoryObj?.lines?.[lineIndex]?.formula;

      return (
        <div key={lineIndex} className="mb-4">
          <p className="font-sans text-lg leading-relaxed text-[#2F353B]">
            {parts.map((part, pi) => {
              const vocab = vocabLookup.get(part.toLowerCase());
              if (vocab && fullyRevealed) {
                const isRevealed = revealedWords.has(vocab.word.toLowerCase());
                const isReacting = activeWordKey === vocab.word.toLowerCase();
                return (
                  <button
                    key={pi}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWordTap(vocab);
                    }}
                    className={`border-b border-dashed transition-all cursor-pointer inline-block ${
                      isReacting ? 'scale-110 -translate-y-0.5 text-[#5E735E] font-bold' : ''
                    } ${
                      isRevealed
                        ? 'border-[#7D927D]/60 text-[#7D927D] hover:bg-[#7D927D]/20 font-medium'
                        : 'border-[#7D927D]/40 text-[#2F353B] hover:bg-[#7D927D]/10 hover:text-[#7D927D] font-medium'
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

          {/* Sentence Formula Engine (Slot-Machine Labels) */}
          {showFormula && lineFormula && fullyRevealed && (
            <div className="mt-1.5 font-mono text-[11px] text-[#4F644F] bg-[#7D927D]/15 border border-[#7D927D]/30 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
              <span className="shrink-0 font-bold text-[#3B4D3B]">🎰 Fórmula:</span>
              <span className="truncate">{lineFormula}</span>
            </div>
          )}

          {showFullTranslation && translation && fullyRevealed && (
            <TranslateFlip showTranslation={showFullTranslation}>
              <p className="font-sans text-sm italic text-[#777775]/80 mt-1 animate-fadeIn leading-relaxed">
                {translation}
              </p>
            </TranslateFlip>
          )}
        </div>
      );
    },
    [vocabLookup, revealedWords, handleWordTap, showFullTranslation, showFormula, storyTranslations, language, activeWordKey, activeStoryObj],
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-8">
      <div className="mx-auto max-w-lg">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#777775]">
                {subtitle} · {questId}
              </p>
              {activeStoryObj?.lesson && (
                <span className="font-mono text-[9px] font-bold text-text-primary bg-bg-elevated px-2 py-0.5 rounded-full border border-structural">
                  Lección {activeStoryObj.lesson}
                </span>
              )}
              {activeStoryObj?.cefr_badge && (
                <span className="font-mono text-[9px] font-bold text-white bg-[#5E735E] px-2 py-0.5 rounded-full border border-[#5E735E]">
                  {activeStoryObj.cefr_badge}
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl font-bold text-text-primary mt-1">{questTitle}</h1>
            {activeStoryObj?.new_grammar_point && (
              <p className="font-mono text-[10px] text-[#5E735E] mt-1">
                🎯 Gramática: {activeStoryObj.new_grammar_point}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className={`flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                showFormula 
                  ? 'bg-[#5E735E] text-white border-[#5E735E]'
                  : 'bg-white/5 border-[#7D927D]/20 text-[#777775] hover:bg-white/10 hover:text-text-primary'
              }`}
              title="Toggle Sentence Slot-Machine Formula Breakdown"
            >
              🎰 {showFormula ? 'Fórmula ON' : 'Fórmula OFF'}
            </button>
            {storyTranslations && storyTranslations.length > 0 && (
              <button
                onClick={() => setShowFullTranslation(!showFullTranslation)}
                className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                  showFullTranslation 
                    ? 'bg-[#7D927D] text-white border-[#7D927D]'
                    : 'bg-white/5 border-[#7D927D]/20 text-[#777775] hover:bg-white/10 hover:text-text-primary'
                }`}
              >
                <Languages className="h-3.5 w-3.5" />
                {showFullTranslation ? 'Ocultar' : 'Traducir'}
              </button>
            )}
            {isLibrary && (
              <button
                onClick={onContinue}
                className="flex items-center gap-1 font-mono text-xs text-[#777775] hover:text-text-primary transition-colors cursor-pointer border border-[#7D927D]/20 rounded px-2.5 py-1 bg-white/5 hover:bg-white/10 shadow"
              >
                <ArrowLeft className="h-3 w-3" /> Biblioteca
              </button>
            )}
          </div>
        </div>

        {/* Story parchment card */}
        <div className="rounded-2xl border border-[#DDD0B5] bg-[#FAF6EE] p-6 text-[#2F353B] shadow-sm relative">
          
          {/* Passport Stamp in Corner */}
          <div className="absolute top-4 right-4 z-10">
            <PassportStamp
              storyId={storyId}
              storyTitle={questTitle}
              isCompleted={storyComplete}
              isLibrary={isLibrary}
              vocabulary={vocabulary}
            />
          </div>

          <TypewriterText
            lines={lines}
            speed={25}
            onComplete={handleComplete}
            renderLine={renderLine}
          />
        </div>

        {/* Audio helper tool */}
        <div className="mt-4 rounded-xl border border-[#7D927D]/20 bg-white/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl" role="img" aria-hidden="true">🔊</span>
            <span className="font-mono text-[10px] text-[#777775]">
              Toca las palabras subrayadas para escuchar y ver su significado.
            </span>
          </div>
        </div>

        {/* Grammar notes panel */}
        {storyComplete && grammarNotes.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D927D] flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" /> Notas Gramaticales
            </p>
            {grammarNotes.map((gn, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#7D927D]/20 bg-white/5 p-4 relative"
              >
                <h3 className="font-serif text-sm font-semibold text-text-primary">
                  {gn.title}
                </h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-text-primary/85">
                  {gn.explanation}
                </p>
                <p className="mt-2.5 font-sans text-xs italic text-text-primary bg-[#7D927D]/10 border border-[#7D927D]/20 rounded px-2.5 py-1">
                  Ejemplo: "{gn.exampleFromStory}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mascot Commentary (Authored lines per-story; fails quiet if none) */}
        {storyComplete && <MascotAside storyId={storyId} />}

        {/* Quick Recall Chip (Optional invitation) */}
        {storyComplete && <RecallChip vocabulary={vocabulary} />}

        {/* Final Actions */}
        {storyComplete && (
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 w-full rounded-xl bg-[#7D927D] text-white hover:bg-[#6B826B] border border-[#7D927D] shadow-sm px-4 py-3 font-serif text-base font-bold transition-all cursor-pointer text-center block"
          >
            {isLibrary ? 'Volver a la Biblioteca' : 'Continuar a Ejercicios →'}
          </button>
        )}
      </div>

      {/* Ink-reveal modal with self-reference memory line */}
      <InkRevealCard
        word={selectedWord?.word ?? ''}
        pronunciation={selectedWord?.pronunciation ?? ''}
        meaning={selectedWord ? (language === 'hinglish' ? translateWordToHinglish(selectedWord.meaning) : selectedWord.meaning) : ''}
        currentStoryTitle={questTitle}
        visible={selectedWord !== null}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
};

export default StoryScreen;
