// Route definitions — single source of truth for navigation and routing.
// Primary tabs appear in the top navigation. Flow-only routes are accessible
// via in-app navigation but not shown in the top nav bar.

import type { FC, LazyExoticComponent } from 'react';
import { lazy } from 'react';

// ── Lazy-loaded screen components ────────────────────────────────────────────

const DashboardScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/HomeScreen'));
const WorldMapScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/WorldMapScreen'));
const QuestPreviewScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestPreviewScreen'));
const QuestJourneyScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestJourneyScreen'));
const StoryScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/StoryScreen'));
const TrainingScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/PracticeScreen'));
const AICompanionScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ConversationScreen'));
const VoiceArenaScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/SpeakingScreen'));
const DailyQuestScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/DailyQuestScreen'));
const AchievementsScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ProfileScreen'));
const ProfileSettingsScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/ProfileScreen'));
const QuestCompletionScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/QuestCompletionScreen'));
const BossBattleScreen: LazyExoticComponent<FC> = lazy(() => import('../screens/BossBattleScreen'));

// ── Types ────────────────────────────────────────────────────────────────────

export type RouteId =
  | 'dashboard'
  | 'map'
  | 'quests'
  | 'quest-journey'
  | 'stories'
  | 'training'
  | 'companion'
  | 'voice'
  | 'daily'
  | 'achievements'
  | 'profile'
  | 'quest-complete'
  | 'boss';

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
    id: 'dashboard',
    path: '/',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    component: DashboardScreen,
    showInNav: true,
    navOrder: 0,
  },
  {
    id: 'map',
    path: '/map',
    label: 'Adventure Map',
    icon: 'Map',
    component: WorldMapScreen,
    showInNav: true,
    navOrder: 1,
  },
  {
    id: 'quests',
    path: '/quests',
    label: 'Quests',
    icon: 'ScrollText',
    component: QuestPreviewScreen,
    showInNav: true,
    navOrder: 2,
  },
  {
    id: 'quest-journey',
    path: '/quest-journey',
    label: 'Quest Journey',
    icon: 'Swords',
    component: QuestJourneyScreen,
    showInNav: true,
    navOrder: 3,
  },
  {
    id: 'stories',
    path: '/stories',
    label: 'Stories',
    icon: 'BookOpen',
    component: StoryScreen,
    showInNav: true,
    navOrder: 3,
  },
  {
    id: 'training',
    path: '/training',
    label: 'Training Grounds',
    icon: 'Dumbbell',
    component: TrainingScreen,
    showInNav: true,
    navOrder: 4,
  },
  {
    id: 'companion',
    path: '/companion',
    label: 'AI Companion',
    icon: 'MessageCircle',
    component: AICompanionScreen,
    showInNav: true,
    navOrder: 5,
  },
  {
    id: 'voice',
    path: '/voice',
    label: 'Voice Arena',
    icon: 'Mic',
    component: VoiceArenaScreen,
    showInNav: true,
    navOrder: 6,
  },
  {
    id: 'daily',
    path: '/daily',
    label: "Today's Quest",
    icon: 'Sun',
    component: DailyQuestScreen,
    showInNav: true,
    navOrder: 7,
  },
  {
    id: 'achievements',
    path: '/achievements',
    label: 'Achievements',
    icon: 'Trophy',
    component: AchievementsScreen,
    showInNav: true,
    navOrder: 8,
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Profile',
    icon: 'User',
    component: ProfileSettingsScreen,
    showInNav: true,
    navOrder: 9,
  },
  {
    id: 'quest-complete',
    path: '/quest-complete',
    label: 'Quest Completion',
    icon: 'Award',
    component: QuestCompletionScreen,
    showInNav: false,
    navOrder: 0,
  },
  {
    id: 'boss',
    path: '/boss',
    label: 'Boss Battle',
    icon: 'Sword',
    component: BossBattleScreen,
    showInNav: false,
    navOrder: 0,
  },
];

// ── Navigation tabs (ordered subset for the top nav bar) ──────────────────────

export const NAV_TABS: RouteDef[] = ROUTES
  .filter((r) => r.showInNav)
  .sort((a, b) => a.navOrder - b.navOrder);
