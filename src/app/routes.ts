// Route definitions — single source of truth for navigation and routing.
// Primary tabs appear in the top navigation. Flow-only routes are accessible
// via in-app navigation but not shown in the top nav bar.

import type { FC, LazyExoticComponent } from 'react';
import { lazy } from 'react';

// ── Lazy-loaded screen components ────────────────────────────────────────────

const LearnScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/LearnScreen'));
const PracticeViewScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/PracticeViewScreen'));
const WorldMapScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/WorldMapScreen'));
const QuestPreviewScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestPreviewScreen'));
const QuestJourneyScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestJourneyScreen'));
const StoryScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/StoryScreen'));
const TrainingScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/PracticeScreen'));
const AICompanionScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ConversationScreen'));
const VoiceArenaScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/SpeakingScreen'));
const DailyQuestScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/DailyQuestScreen'));
const ShopScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ShopScreen'));
const ProfileSettingsScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ProfileScreen'));
const QuestCompletionScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestCompletionScreen'));
const BossBattleScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/BossBattleScreen'));
const BasicEspanolScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/BasicEspanolScreen'));
const WhyUsScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/WhyUsScreen'));

// ── Types ────────────────────────────────────────────────────────────────────

export type RouteId =
  | 'learn'
  | 'practice'
  | 'library'
  | 'shop'
  | 'dashboard'
  | 'map'
  | 'quests'
  | 'quest-journey'
  | 'stories'
  | 'training'
  | 'companion'
  | 'voice'
  | 'daily'
  | 'profile'
  | 'quest-complete'
  | 'boss'
  | 'basic-espanol'
  | 'why-us';

export interface RouteDef {
  id: RouteId;
  path: string;
  label: string;
  /** Lucide icon name used for the navigation tab. */
  icon: string;
  /** The screen component rendered for this route. */
  component: LazyExoticComponent<FC>;
  /** Whether this route appears in the top navigation. */
  showInNav: boolean;
  /** Display order in the top navigation (lower = leftmost). */
  navOrder: number;
}

// ── All routes ────────────────────────────────────────────────────────────────

export const ROUTES: RouteDef[] = [
  {
    id: 'learn',
    path: '/learn',
    label: 'Learn',
    icon: 'Home',
    component: LearnScreen,
    showInNav: true,
    navOrder: 0,
  },
  {
    id: 'practice',
    path: '/practice',
    label: 'Practice',
    icon: 'Swords',
    component: PracticeViewScreen,
    showInNav: true,
    navOrder: 1,
  },
  {
    id: 'library',
    path: '/library',
    label: 'Library',
    icon: 'BookOpen',
    component: StoryScreen,
    showInNav: true,
    navOrder: 2,
  },
  {
    id: 'shop',
    path: '/shop',
    label: 'Gacha Shrine',
    icon: 'ShoppingBag',
    component: ShopScreen,
    showInNav: true,
    navOrder: 3,
  },
  {
    id: 'dashboard',
    path: '/',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    component: LearnScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'map',
    path: '/map',
    label: 'Adventure Map',
    icon: 'Map',
    component: WorldMapScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'basic-espanol',
    path: '/basic-espanol',
    label: 'Basic Español',
    icon: 'GraduationCap',
    component: BasicEspanolScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'quests',
    path: '/quests',
    label: 'Quests',
    icon: 'ScrollText',
    component: QuestPreviewScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'quest-journey',
    path: '/quest-journey',
    label: 'Quest Journey',
    icon: 'Swords',
    component: QuestJourneyScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'stories',
    path: '/stories',
    label: 'Stories',
    icon: 'BookOpen',
    component: StoryScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'training',
    path: '/training',
    label: 'Training Grounds',
    icon: 'Dumbbell',
    component: TrainingScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'companion',
    path: '/companion',
    label: 'AI Companion',
    icon: 'MessageCircle',
    component: AICompanionScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'voice',
    path: '/voice',
    label: 'Voice Arena',
    icon: 'Mic',
    component: VoiceArenaScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'daily',
    path: '/daily',
    label: "Today's Quest",
    icon: 'Sun',
    component: DailyQuestScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Profile',
    icon: 'User',
    component: ProfileSettingsScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'quest-complete',
    path: '/quest-complete',
    label: 'Quest Completion',
    icon: 'Award',
    component: QuestCompletionScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'boss',
    path: '/boss',
    label: 'Boss Battle',
    icon: 'Sword',
    component: BossBattleScreen,
    showInNav: false,
    navOrder: 99,
  },
  {
    id: 'why-us',
    path: '/why-us',
    label: 'Why Us',
    icon: 'Trophy',
    component: WhyUsScreen,
    showInNav: false,
    navOrder: 99,
  },
];

// ── Navigation tabs (ordered subset for the top nav bar) ──────────────────────

export const NAV_TABS: RouteDef[] = ROUTES
  .filter((r) => r.showInNav)
  .sort((a, b) => a.navOrder - b.navOrder);
