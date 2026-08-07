import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useState, useEffect, useCallback, type FC } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import AppShell from './components/AppShell';
import DynamicText from './components/DynamicText';
import ShimmerText from './components/ShimmerText';
import { ROUTES } from './app/routes';
import './screens/LampLogin.css';

// ============================================================================
// CLERK AUTHENTICATION CONFIGURATION
// ============================================================================
const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_Y2hvaWNlLWNpY2FkYS04NS5jbGVyay5hY2NvdW50cy5kZXYk";

/** Minimal loading state while lazy screens resolve. */
const ScreenLoader = () => (
  <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#777775]/30 border-t-[#7D927D]" />
  </div>
);

// ============================================================================
// LAMP GEOMETRY — measured proportions (flat capsule shade, thin pole, flat
// capsule base) live inside a shared 220x300 coordinate space so the fixture
// SVG and the cord SVG always line up, at any rendered size.
// ============================================================================
const ATTACH = { x: 144, y: 24 };
const REST_BEAD = { x: 144, y: 100 };
const BEAD_RADIUS = 9;
const PULL_THRESHOLD = 34;
const DRAG_CONSTRAINTS = { top: -6, bottom: 66, left: -34, right: 34 };

// Synthesize retro pull-chain toggle click sound using Web Audio API
const playSwitchSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(450, ctx.currentTime + 0.035);
    osc2.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
    gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.035);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc2.start(ctx.currentTime + 0.035);
    osc2.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.log('AudioContext click synthesis blocked or unsupported', e);
  }
};

// ============================================================================
// LAMP LANDING — Full interactive pull-cord lamp with Clerk sign-in
// ============================================================================
const LampLanding: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [isOn, setIsOn] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Bead offset from its resting position
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const pathD = useTransform([dragX, dragY], (latest) => {
    const [dx, dy] = latest as number[];
    const bx = REST_BEAD.x + dx;
    const by = REST_BEAD.y + dy;
    const midX = (ATTACH.x + bx) / 2;
    const midY = (ATTACH.y + by) / 2;
    const bow = (bx - ATTACH.x) * 0.5;
    return `M ${ATTACH.x} ${ATTACH.y} Q ${(midX + bow).toFixed(1)} ${midY.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  });

  const springBack = useCallback(() => {
    const config = prefersReducedMotion
      ? { type: 'tween' as const, duration: 0.15 }
      : { type: 'spring' as const, stiffness: 170, damping: 9, mass: 0.7 };
    animate(dragX, 0, config);
    animate(dragY, 0, config);
  }, [prefersReducedMotion, dragX, dragY]);

  const playCordKick = useCallback(() => {
    if (prefersReducedMotion) return;
    animate(dragY, [0, 50, 32, 10, -5, 3, -1, 0], {
      duration: 1.05,
      ease: 'easeInOut',
      times: [0, 0.16, 0.36, 0.56, 0.72, 0.85, 0.94, 1],
    });
    animate(dragX, [0, 9, -12, 8, -5, 3, -1, 0], {
      duration: 1.05,
      ease: 'easeInOut',
      times: [0, 0.16, 0.36, 0.56, 0.72, 0.85, 0.94, 1],
    });
  }, [prefersReducedMotion, dragX, dragY]);

  const triggerToggle = useCallback(() => {
    if (showSignIn) return;
    const newState = !isOn;
    setIsOn(newState);
    setHasToggled(true);
    playSwitchSound();

    if (newState) {
      // After lamp illuminates, show the sign-in card
      setTimeout(() => setShowSignIn(true), 600);
    }
  }, [isOn, showSignIn]);

  const handleFixtureClick = () => {
    triggerToggle();
    playCordKick();
  };

  const handleFixtureKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFixtureClick();
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (showSignIn) {
      springBack();
      return;
    }
    const pulled = Math.hypot(info.offset.x, info.offset.y);
    if (pulled > PULL_THRESHOLD) {
      triggerToggle();
    }
    springBack();
  };

  const cardInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -22, scale: 0.96 };
  const cardAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const cardTransition = prefersReducedMotion
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 130, damping: 16, mass: 0.8 };

  return (
    <div className={`lamp-container ${isOn ? 'light-on' : 'light-off'}`}>
      <div className="ambient-glow" aria-hidden="true" />

      <div className="scene">
        {/* ── LAMP: cone (behind) -> fixture (middle) -> cord + bead (front) ── */}
        <div className="lamp-visual">
          <svg
            className="light-cone-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="coneGrad" cx="50%" cy="0%" r="85%">
                <stop offset="0%" stopColor="#ffedbb" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#d9a25a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d9a25a" stopOpacity="0" />
              </radialGradient>
              <filter id="coneSoft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
            <polygon points="50,0 88,100 12,100" fill="url(#coneGrad)" filter="url(#coneSoft)" />
          </svg>

          <motion.div
            className="lamp-fixture-hit"
            role="switch"
            aria-checked={isOn}
            aria-label={isOn ? 'Turn off the lamp' : 'Turn on the lamp to sign in'}
            tabIndex={0}
            onClick={handleFixtureClick}
            onKeyDown={handleFixtureKeyDown}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="lamp-fixture-svg" viewBox="0 0 220 300" aria-hidden="true">
              <defs>
                <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#18181b" />
                  <stop offset="45%" stopColor="#2c2c31" />
                  <stop offset="55%" stopColor="#48484f" />
                  <stop offset="100%" stopColor="#18181b" />
                </linearGradient>
              </defs>
              <ellipse className="lamp-contact-shadow" cx="110" cy="270" rx="58" ry="7" />
              <rect className="fixture-shape" x="106" y="24" width="8" height="216" rx="4" fill="url(#metalGrad)" />
              <rect className="fixture-shape" x="63" y="240" width="94" height="15" rx="7.5" fill="url(#metalGrad)" />
              <rect className="fixture-shape" x="52" y="7" width="116" height="17" rx="8.5" fill="url(#metalGrad)" />
            </svg>
          </motion.div>

          <svg className="cord-svg" viewBox="0 0 220 300" aria-hidden="true">
            <defs>
              <radialGradient id="beadGrad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#f3d089" />
                <stop offset="55%" stopColor="#d9a83f" />
                <stop offset="100%" stopColor="#8f691c" />
              </radialGradient>
            </defs>
            <motion.path className="cord-line" d={pathD} />
            <motion.circle
              className="cord-bead"
              cx={REST_BEAD.x}
              cy={REST_BEAD.y}
              r={BEAD_RADIUS}
              fill="url(#beadGrad)"
              style={{ x: dragX, y: dragY }}
              drag={!showSignIn}
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.35}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              whileHover={showSignIn ? {} : { scale: 1.1 }}
              whileDrag={showSignIn ? {} : { scale: 1.18 }}
            />
          </svg>

          <AnimatePresence>
            {!hasToggled && !isOn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="pull-hint"
              >
                Pull the cord to sign in
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── BRANDING TEXT (visible before cord pull) ── */}
        <AnimatePresence>
          {!showSignIn && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mt-4"
              style={{ maxWidth: '400px' }}
            >
              <DynamicText />
              <div className="flex items-center justify-center gap-3 mt-1">
                <h1
                  className="font-serif text-3xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Fraunces', 'Playfair Display', ui-serif, Georgia, serif" }}
                >
                  TheLearningHyena
                </h1>
              </div>
              <ShimmerText text="The Unearthly Vault" />
              <p
                className="font-sans text-xs mt-4 leading-relaxed"
                style={{ color: '#777775' }}
              >
                Pull the glowing cord to unlock the unearthly vault. Ancient Spanish secrets and mystical adventures await in the dark...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SIGN IN CARD (appears after cord pull illuminates the room) ── */}
        <AnimatePresence>
          {isOn && showSignIn && (
            <motion.div
              className="login-card"
              initial={cardInitial}
              animate={cardAnimate}
              transition={cardTransition}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: 'rgba(125,146,125,0.15)', color: '#7D927D', border: '1px solid rgba(125,146,125,0.3)' }}
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h2>The Learning Hyenas</h2>
                <p className="login-card-subtitle">Sign in to unlock your learning journey</p>

                <SignInButton mode="modal">
                  <button
                    className="login-btn"
                    style={{
                      background: 'linear-gradient(135deg, #7D927D 0%, #5C7A5C 100%)',
                      marginTop: '16px',
                    }}
                  >
                    Sign In to Continue
                  </button>
                </SignInButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ============================================================================
// WELCOME TRANSITION — cinematic 2.5s bridge after Clerk auth
// ============================================================================
const WelcomeTransition: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`lamp-container light-on`}>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="scene">
        <div className="lamp-visual">
          <svg
            className="light-cone-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ opacity: 1 }}
          >
            <defs>
              <radialGradient id="coneGrad2" cx="50%" cy="0%" r="85%">
                <stop offset="0%" stopColor="#ffedbb" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#d9a25a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d9a25a" stopOpacity="0" />
              </radialGradient>
              <filter id="coneSoft2" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
            <polygon points="50,0 88,100 12,100" fill="url(#coneGrad2)" filter="url(#coneSoft2)" />
          </svg>

          <div className="lamp-fixture-hit">
            <svg className="lamp-fixture-svg" viewBox="0 0 220 300" aria-hidden="true">
              <defs>
                <linearGradient id="metalGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#18181b" />
                  <stop offset="45%" stopColor="#2c2c31" />
                  <stop offset="55%" stopColor="#48484f" />
                  <stop offset="100%" stopColor="#18181b" />
                </linearGradient>
              </defs>
              <ellipse className="lamp-contact-shadow" cx="110" cy="270" rx="58" ry="7" />
              <rect className="fixture-shape" x="106" y="24" width="8" height="216" rx="4" fill="url(#metalGrad2)" />
              <rect className="fixture-shape" x="63" y="240" width="94" height="15" rx="7.5" fill="url(#metalGrad2)" />
              <rect className="fixture-shape" x="52" y="7" width="116" height="17" rx="8.5" fill="url(#metalGrad2)" />
            </svg>
          </div>

          <div className="pull-hint" style={{ opacity: 0.4 }}>
            Signed in successfully
          </div>
        </div>

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: -22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 130, damping: 16, mass: 0.8 }}
        >
          <div className="text-center py-6 flex flex-col items-center justify-center">
            <div
              className="login-loading-spinner mb-4"
              style={{ borderTopColor: '#7D927D', width: '32px', height: '32px', borderWidth: '3px' }}
            />
            <h2>Welcome Back!</h2>
            <p className="login-card-subtitle">Preparing your notebook profile...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      {/* Signed Out: Full-screen interactive Lamp Landing */}
      <SignedOut>
        <LampLanding />
      </SignedOut>

      {/* Signed In: Welcome Transition -> Dashboard */}
      <SignedIn>
        {!showDashboard ? (
          <WelcomeTransition onComplete={() => setShowDashboard(true)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                {ROUTES.map((r) => (
                  <Route
                    key={r.id}
                    path={r.path}
                    element={
                      <Suspense fallback={<ScreenLoader />}>
                        <r.component />
                      </Suspense>
                    }
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </SignedIn>
    </ClerkProvider>
  );
};

export default App;
