import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    span: ({ children, ...props }: any) => React.createElement('span', props, children),
    button: ({ children, ...props }: any) => React.createElement('button', props, children),
    p: ({ children, ...props }: any) => React.createElement('p', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
  useReducedMotion: () => false,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
}));

// Mock lucide-react icons
const createIcon = (name: string) => () => React.createElement('svg', { 'data-testid': name.toLowerCase() });

vi.mock('lucide-react', () => ({
  Check: createIcon('check'),
  X: createIcon('x'),
  HelpCircle: createIcon('help-circle'),
  RefreshCw: createIcon('refresh-cw'),
  Sparkles: createIcon('sparkles'),
  Shuffle: createIcon('shuffle'),
  ArrowRight: createIcon('arrow-right'),
  CheckCircle2: createIcon('check-circle-2'),
  XCircle: createIcon('x-circle'),
  Target: createIcon('target'),
  BookOpen: createIcon('book-open'),
  Headphones: createIcon('headphones'),
  Mic: createIcon('mic'),
  ArrowLeft: createIcon('arrow-left'),
  Zap: createIcon('zap'),
  Flame: createIcon('flame'),
  Lightbulb: createIcon('lightbulb'),
  AlertTriangle: createIcon('alert-triangle'),
  RotateCw: createIcon('rotate-cw'),
  RotateCcw: createIcon('rotate-ccw'),
  Repeat: createIcon('repeat'),
  Wand2: createIcon('wand-2'),
  Clock: createIcon('clock'),
  Plane: createIcon('plane'),
  User: createIcon('user'),
  Mail: createIcon('mail'),
  Trophy: createIcon('trophy'),
  Download: createIcon('download'),
  Smartphone: createIcon('smartphone'),
}));

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  useUser: () => ({
    user: null,
    isLoaded: true,
    isSignedIn: false,
  }),
  SignOutButton: ({ children }: any) => children,
  ClerkProvider: ({ children }: any) => children,
}));

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      upsert: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  }),
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
  useParams: () => ({}),
  Link: ({ children, to }: any) => React.createElement('a', { href: to }, children),
}));

// Mock Zustand stores
const mockAddRewards = vi.fn();
const mockSpendCoins = vi.fn().mockImplementation((cost: number) => {
  if (mockStatsState.coins >= cost) {
    mockStatsState.coins -= cost;
    return true;
  }
  return false;
});
let mockStatsState = {
  xp: 1000,
  coins: 500,
  streak: 5,
  learnedVocab: [],
  addRewards: mockAddRewards,
  spendCoins: mockSpendCoins,
};

const mockStatsStore = Object.assign(
  () => mockStatsState,
  {
    getState: () => mockStatsState,
    setState: (update: any) => {
      mockStatsState = {
        ...mockStatsState,
        ...(typeof update === 'function' ? update(mockStatsState) : update),
      };
    },
  },
);
vi.mock('../state/statsStore', () => ({ useStatsStore: mockStatsStore }));

vi.mock('../state/progressStore', () => ({
  useProgressStore: () => ({
    completeQuest: vi.fn(),
  }),
}));

vi.mock('../state/dailyQuestStore', () => ({
  useDailyQuestStore: () => ({
    dailyQuests: [],
    completeQuest: vi.fn(),
  }),
}));

vi.mock('../state/questStore', () => ({
  useQuestStore: () => ({
    currentQuest: null,
    startQuest: vi.fn(),
  }),
}));

vi.mock('../state/authStore', () => ({
  useAuthStore: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock hooks
vi.mock('../hooks/useVocabDeck', () => ({
  useVocabDeck: (items: any[]) => ({
    current: items[0] || null,
    index: 0,
    deck: items,
    status: 'idle',
    advance: vi.fn(),
    reveal: vi.fn(),
    shuffle: vi.fn(),
    reset: vi.fn(),
  }),
}));

vi.mock('../hooks/useUserData', () => ({
  useUserData: () => ({
    userData: null,
    isLoading: false,
    resetAllUserProgress: vi.fn(),
  }),
}));

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// MatchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Navigator mock
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

Object.defineProperty(navigator, 'serviceWorker', {
  writable: true,
  value: {
    register: vi.fn().mockResolvedValue({}),
  },
});

// Console mock to reduce noise in tests
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('Warning: ReactDOM.render is no longer supported')) return;
  if (args[0]?.includes?.('act(...)')) return;
  originalError.call(console, ...args);
};