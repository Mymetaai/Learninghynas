import { useState } from 'react';
import PracticeScreen from './PracticeScreen';
import SpeakingScreen from './SpeakingScreen';
import ConversationScreen from './ConversationScreen';
import WorldMapScreen from './WorldMapScreen';

type PracticeSubView = 'training' | 'voice' | 'companion' | 'adventure-map';

export default function PracticeViewScreen() {
  const [activeSubView, setActiveSubView] = useState<PracticeSubView>('training');

  return (
    <div className="min-h-screen bg-bg-base text-text-primary pb-12">
      {/* Top Sub-navigation Bar for Practice View */}
      <div className="sticky top-14 z-30 bg-bg-base/90 backdrop-blur-md border-b border-structural py-2.5 px-4 mb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveSubView('training')}
            className={`px-5 py-2 rounded-full font-body text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'training'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            Training Grounds
          </button>
          <button
            onClick={() => setActiveSubView('voice')}
            className={`px-5 py-2 rounded-full font-body text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'voice'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            Voice Arena
          </button>
          <button
            onClick={() => setActiveSubView('companion')}
            className={`px-5 py-2 rounded-full font-body text-xs font-bold transition-all cursor-pointer ${
              activeSubView === 'companion'
                ? 'bg-[#7D927D] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
            }`}
          >
            AI Companion
          </button>
          <button
            onClick={() => setActiveSubView('adventure-map')}
            className={`px-5 py-2 rounded-full font-body text-xs font-bold transition-all cursor-pointer ${
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
      <div className="max-w-6xl mx-auto px-4">
        {activeSubView === 'training' && <PracticeScreen />}
        {activeSubView === 'voice' && <SpeakingScreen />}
        {activeSubView === 'companion' && <ConversationScreen />}
        {activeSubView === 'adventure-map' && <WorldMapScreen />}
      </div>
    </div>
  );
}
