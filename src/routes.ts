// STEP 2 — single source of truth for screen routes.
// The 12 screens required by the spec, in stable order. Adding/removing a
// screen means changing exactly this list (and creating the screen file).
export type RouteId =
  | 'onboarding'
  | 'home'
  | 'map'
  | 'quest-preview'
  | 'story'
  | 'practice'
  | 'conversation'
  | 'speaking'
  | 'quest-complete'
  | 'boss'
  | 'profile'
  | 'daily';

export interface RouteDef {
  id: RouteId;
  /** Path used by React Router. */
  path: string;
  /** Human label for nav + page headers. */
  label: string;
  /** One-line role hint, shown on the placeholder. */
  blurb: string;
}

export const ROUTES: RouteDef[] = [
  { id: 'onboarding', path: '/', label: 'Onboarding', blurb: 'First-run welcome + language intro.' },
  { id: 'home', path: '/home', label: 'Home Dashboard', blurb: 'Personal summary + AI suggestion (built Step 13).' },
  { id: 'map', path: '/map', label: 'World Map', blurb: 'Explorable region/quest view (built Step 4).' },
  { id: 'quest-preview', path: '/quest-preview', label: 'Quest Preview', blurb: 'Card before committing to a quest (built Step 5).' },
  { id: 'story', path: '/story', label: 'Story Chapter', blurb: 'Core reading experience (built Step 6).' },
  { id: 'practice', path: '/practice', label: 'Practice / Exercise', blurb: 'Reusable exercise engine (built Step 8).' },
  { id: 'conversation', path: '/conversation', label: 'Conversation Mode', blurb: 'Companion roleplay (built Step 14).' },
  { id: 'speaking', path: '/speaking', label: 'Speaking Challenge', blurb: 'Pronunciation practice (built Step 15).' },
  { id: 'quest-complete', path: '/quest-complete', label: 'Quest Completion', blurb: 'Signature completion animation (built Step 9).' },
  { id: 'boss', path: '/boss', label: 'Boss Battle', blurb: 'Set-piece encounter (built Step 16).' },
  { id: 'profile', path: '/profile', label: 'Profile / Achievements', blurb: 'Stamp collection + avatar (built Step 11).' },
  { id: 'daily', path: '/daily', label: 'Daily Quest Dashboard', blurb: 'Return-every-day page (built Step 12).' },
];

export const ROUTE_BY_ID: Record<RouteId, RouteDef> = Object.fromEntries(
  ROUTES.map((r) => [r.id, r]),
) as Record<RouteId, RouteDef>;
