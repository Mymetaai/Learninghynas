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
      {/* Top Sub-navigation Capsule Bar - Clean Inline Flow (No Sticky Backdrop-Blur Overlay) */}
      {!isQuestActive && (
        <div className="py-4 px-4 mb-2">
          <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 bg-white border border-[#777775]/20 rounded-full p-1.5 shadow-xs">
            <button
              onClick={() => setActiveSubView('dashboard')}
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer border-none ${
                activeSubView === 'dashboard'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'bg-transparent text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSubView('daily-quest')}
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer border-none ${
                activeSubView === 'daily-quest'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'bg-transparent text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2]'
              }`}
            >
              Today's Quests
            </button>
            <button
              onClick={() => setActiveSubView('quest-journey')}
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer border-none ${
                activeSubView === 'quest-journey'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'bg-transparent text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2]'
              }`}
            >
              Quest Journey
            </button>
            <button
              onClick={() => setActiveSubView('basic-espanol')}
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer border-none ${
                activeSubView === 'basic-espanol'
                  ? 'bg-[#7D927D] text-white shadow-sm'
                  : 'bg-transparent text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2]'
              }`}
            >
              Basic Español
            </button>
          </div>
        </div>
      )}

      {/* Sub-view Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
