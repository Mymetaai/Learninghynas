import { useState } from 'react';
import PracticeScreen from './PracticeScreen';
import SpeakingScreen from './SpeakingScreen';
import ConversationScreen from './ConversationScreen';
import WorldMapScreen from './WorldMapScreen';
import DojoFloor from '../components/effects/DojoFloor';
import Kitsune3D from '../components/Kitsune3D';
import { useStatsStore } from '../state/statsStore';
import { useTrainingStore } from '../state/trainingStore';
import { Flame, BookOpen, Target, Sparkles } from 'lucide-react';

type PracticeSubView = 'training' | 'voice' | 'companion' | 'adventure-map';

export default function PracticeViewScreen() {
  const [activeSubView, setActiveSubView] = useState<PracticeSubView>('training');

  const streak = useStatsStore((s) => s.streak);
  const learnedVocabCount = useStatsStore((s) => s.learnedVocab.length);
  const mistakesCount = useTrainingStore((s) => s.mistakes.length);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary pb-12 relative overflow-hidden">
      {/* 1. Dojo Floor Ambient Canvas (z-0 background layer) */}
      <DojoFloor />

      {/* Top Sub-navigation Bar for Practice View */}
      <div className="sticky top-14 z-30 bg-bg-base/90 backdrop-blur-md border-b border-structural py-2.5 px-4 mb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveSubView('training')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'training'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            Training Grounds
          </button>
          <button
            onClick={() => setActiveSubView('voice')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'voice'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            Voice Arena
          </button>
          <button
            onClick={() => setActiveSubView('companion')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'companion'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            AI Companion
          </button>
          <button
            onClick={() => setActiveSubView('adventure-map')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'adventure-map'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            Adventure Map
          </button>
        </div>
      </div>

      {/* Sub-view Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-2 sm:pt-4">
        {/* Step 2: Hero Section (Chibi Sensei Dojo Banner) */}
        {activeSubView === 'training' && (
          <div className="mb-6">
            <div className="bg-white/80 dark:bg-bg-elevated/80 backdrop-blur-md rounded-3xl border border-[#7D927D]/20 p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 relative z-10">
              {/* Left: 3D Kitsune / Chibi Avatar */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center bg-gradient-to-b from-[#7D927D]/10 to-[#D4AF37]/10 rounded-2xl border border-[#7D927D]/20 shadow-inner">
                <Kitsune3D direction="right" mode="idle" />
              </div>

              {/* Center: Dialogue Speech Bubble & Title */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7D927D]/15 border border-[#7D927D]/30 text-[#5E735E] font-mono text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-[#5E735E]" /> Chibi Sensei's Dojo
                </div>

                <div className="relative bg-[#F9F7F2] dark:bg-bg-base/80 p-4 rounded-2xl border border-[#7D927D]/20 shadow-xs">
                  <p className="font-serif text-base font-bold text-text-primary">
                    "¡Bienvenido al Dojo! Ready for today's workout?"
                  </p>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    Sharpen your recall with adaptive drills or focus on active weak spots below.
                  </p>
                </div>

                {/* Summary Chips */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
                    <Flame className="h-3.5 w-3.5 text-orange-500" />
                    <span>{streak} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                    <span>{learnedVocabCount} Words Mastered</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                    <Target className="h-3.5 w-3.5 text-rose-500" />
                    <span>{mistakesCount} Open Mistakes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubView === 'training' && <PracticeScreen />}
        {activeSubView === 'voice' && <SpeakingScreen />}
        {activeSubView === 'companion' && <ConversationScreen />}
        {activeSubView === 'adventure-map' && <WorldMapScreen />}
      </div>
    </div>
  );
}
