import { useState } from 'react';
import HomeScreen from './HomeScreen';
import DailyQuestScreen from './DailyQuestScreen';
import QuestJourneyScreen from './QuestJourneyScreen';
import BasicEspanolScreen from './BasicEspanolScreen';

type LearnSubView = 'dashboard' | 'daily-quest' | 'quest-journey' | 'basic-espanol';

export default function LearnScreen() {
  const [activeSubView, setActiveSubView] = useState<LearnSubView>('dashboard');
  const [isQuestActive, setIsQuestActive] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary pb-12">
      {/* Top Sub-navigation Bar for Learn View - Hidden when an active micro-quest is being played */}
      {!isQuestActive && (
        <div className="sticky top-[92px] z-30 bg-bg-base/95 backdrop-blur-md border-b border-structural py-2.5 px-4 mb-6 shadow-xs">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveSubView('dashboard')}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                activeSubView === 'dashboard'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSubView('daily-quest')}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                activeSubView === 'daily-quest'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
              }`}
            >
              Today's Quests
            </button>
            <button
              onClick={() => setActiveSubView('quest-journey')}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                activeSubView === 'quest-journey'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
              }`}
            >
              Quest Journey
            </button>
            <button
              onClick={() => setActiveSubView('basic-espanol')}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                activeSubView === 'basic-espanol'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2'
              }`}
            >
              Basic Español
            </button>
          </div>
        </div>
      )}

      {/* Sub-view Content */}
      <div className="max-w-6xl mx-auto px-4">
        {activeSubView === 'dashboard' && <HomeScreen />}
        {activeSubView === 'daily-quest' && (
          <DailyQuestScreen onActiveQuestChange={setIsQuestActive} />
        )}
        {activeSubView === 'quest-journey' && <QuestJourneyScreen />}
        {activeSubView === 'basic-espanol' && <BasicEspanolScreen />}
      </div>
    </div>
  );
}
