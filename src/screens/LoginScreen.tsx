import React, { useState } from 'react';
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
import { useAuthStore } from '../state/authStore';
import './LampLogin.css';

// ---------------------------------------------------------------------------
// Lamp geometry — measured proportions (flat capsule shade, thin pole, flat
// capsule base) live inside a shared 220x300 coordinate space so the fixture
// SVG and the cord SVG always line up, at any rendered size.
// ---------------------------------------------------------------------------
const ATTACH = { x: 144, y: 24 }; // where the cord leaves the underside of the shade
const REST_BEAD = { x: 152, y: 100 }; // resting bead position — already off-axis, so the
// cord reads as a hanging, slightly slack line rather than a rigid straight rod
const BEAD_RADIUS = 9;
const PULL_THRESHOLD = 34; // drag distance (SVG units) needed to actually toggle
const DRAG_CONSTRAINTS = { top: -6, bottom: 66, left: -34, right: 34 };

// Synthesize retro pull-chain toggle click sound using Web Audio API
const playSwitchSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // First high click (metallic contact)
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

    // Second lower clack slightly delayed (spring release)
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

const LoginScreen: React.FC = () => {
  const login = useAuthStore((s) => s.login);
  const prefersReducedMotion = useReducedMotion();

  const [isOn, setIsOn] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Bead offset from its resting position. Driving the curve off these two
  // values (instead of rotating a rigid div) is what makes the cord bend
  // like an actual piece of string rather than swinging as a straight rod.
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const pathD = useTransform([dragX, dragY], (latest) => {
    const [dx, dy] = latest as number[];
    const bx = REST_BEAD.x + dx;
    const by = REST_BEAD.y + dy;
    const midX = (ATTACH.x + bx) / 2;
    const midY = (ATTACH.y + by) / 2;
    // Bow the control point outward so the line reads as slack rope, and
    // bow it further the more the bead is pulled sideways.
    const bow = (bx - ATTACH.x) * 0.5 + 10;
    return `M ${ATTACH.x} ${ATTACH.y} Q ${(midX + bow).toFixed(1)} ${midY.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  });

  const springBack = () => {
    const config = prefersReducedMotion
      ? { type: 'tween' as const, duration: 0.15 }
      : { type: 'spring' as const, stiffness: 170, damping: 9, mass: 0.7 };
    animate(dragX, 0, config);
    animate(dragY, 0, config);
  };

  const playCordKick = () => {
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
  };

  const triggerLoginFlow = () => {
    setIsVerifying(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('wayfarer@learninghyena.org', 'Pulled String Quick Entry');
      }, 1500);
    }, 1200);
  };

  const triggerToggle = () => {
    if (isVerifying || isSuccess) return;
    const newState = !isOn;
    setIsOn(newState);
    setHasToggled(true);
    playSwitchSound();

    if (newState) {
      triggerLoginFlow();
    }
  };

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
    if (isVerifying || isSuccess) {
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
  const cardExit = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 };
  const cardTransition = prefersReducedMotion
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 130, damping: 16, mass: 0.8 };

  return (
    <div className={`lamp-container ${isOn ? 'light-on' : 'light-off'}`}>
      <div className="ambient-glow" aria-hidden="true" />

      <div className="scene">
        {/* ------------------------------------------------------------- */}
        {/* Lamp: cone (behind) -> fixture (middle) -> cord + bead (front) */}
        {/* ------------------------------------------------------------- */}
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
              drag={!(isVerifying || isSuccess)}
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.35}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              whileHover={isVerifying || isSuccess ? {} : { scale: 1.1 }}
              whileDrag={isVerifying || isSuccess ? {} : { scale: 1.18 }}
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
                💡 Pull the cord to sign in
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Login card                                                    */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              className="login-card"
              initial={cardInitial}
              animate={cardAnimate}
              exit={cardExit}
              transition={cardTransition}
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success border border-success/30"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>
                  <h2>Welcome Back!</h2>
                  <p className="login-card-subtitle">Preparing your notebook profile...</p>
                  <div className="login-loading-spinner mt-2" style={{ borderTopColor: '#e64833' }} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center justify-center"
                >
                  <div className="login-loading-spinner mb-4" style={{ borderTopColor: '#e64833', width: '32px', height: '32px', borderWidth: '3px' }} />
                  <h2>Connecting</h2>
                  <p className="login-card-subtitle">Verifying quick entry session...</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginScreen;
