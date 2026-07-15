import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useAuthStore } from '../state/authStore';
import './LampLogin.css';

// Realistic switch click sound
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
    console.log("AudioContext click synthesis blocked or unsupported", e);
  }
};

const LoginScreen: React.FC = () => {
  const login = useAuthStore((s) => s.login);
  const [isOn, setIsOn] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stringControls = useAnimation();
  const lampControls = useAnimation();

  const handleToggle = async () => {
    if (isVerifying || isSuccess) return;
    
    const newState = !isOn;
    setIsOn(newState);
    setHasToggled(true);
    playSwitchSound();

    // String physics - pull down then swing
    await stringControls.start({
      y: [0, 18, 0],
      rotate: [0, -2, 2, -1, 0.5, 0],
      transition: { duration: 0.8, ease: "easeOut" }
    });

    // Lamp subtle bounce
    lampControls.start({
      rotate: [0, -0.5, 0.3, -0.2, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    });

    if (newState) {
      triggerLoginFlow();
    }
  };

  const handleQuickEnter = () => {
    if (isVerifying || isSuccess) return;
    setIsOn(true);
    setHasToggled(true);
    playSwitchSound();

    stringControls.start({
      y: [null, 100, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    });

    triggerLoginFlow();
  };

  const triggerLoginFlow = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('wayfarer@learninghyena.org', 'Pulled String Quick Entry');
      }, 1500);
    }, 1200);
  };

  return (
    <div className={`lamp-scene ${isOn ? 'light-on' : 'light-off'}`}>
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      {/* Floor reflection */}
      <div className="floor-reflection" />

      {/* Main Lamp Assembly */}
      <motion.div 
        className="lamp-assembly"
        animate={lampControls}
        style={{ transformOrigin: "top center" }}
      >
        {/* Ceiling mount */}
        <div className="ceiling-mount" />

        {/* Lamp pole */}
        <div className="lamp-pole" />

        {/* Lamp shade */}
        <div className="lamp-shade">
          <div className="shade-inner" />
          <div className="shade-glow" />
        </div>

        {/* Bulb glow */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              className="bulb-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Pull string assembly */}
        <motion.div 
          className="pull-string-container"
          drag="y"
          dragConstraints={{ top: 0, bottom: 120 }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.y > 50) {
              handleQuickEnter();
            } else {
              stringControls.start({
                y: 0,
                transition: { type: 'spring', stiffness: 300, damping: 25 }
              });
            }
          }}
          animate={stringControls}
        >
          <div className="string-chain">
            <div className="chain-link" />
            <div className="chain-link" />
            <div className="chain-link" />
            <div className="chain-link" />
            <div className="chain-link" />
          </div>
          <motion.div 
            className="string-bead"
            whileHover={{ scale: 1.15 }}
            onTap={handleToggle}
          />
        </motion.div>

        {/* Lamp base/stand bottom */}
        <div className="lamp-stand-base" />
      </motion.div>

      {/* Volumetric Light Cone - Multiple layers for depth */}
      <AnimatePresence>
        {isOn && (
          <>
            <motion.div
              className="light-cone-outer"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 0.08, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="light-cone-mid"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 0.15, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            />
            <motion.div
              className="light-cone-inner"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 0.25, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            />
            <motion.div
              className="light-cone-core"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 0.4, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.3 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Hint tooltip */}
      <AnimatePresence>
        {!hasToggled && !isOn && (
          <motion.div
            className="pull-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="hint-icon">✦</span>
            Pull the cord to sign in
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphic redirect card in the light cone */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            className="login-card-wrapper"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2 
            }}
          >
            <div className="login-card">
              <div className="success-state">
                <motion.div
                  className="success-ring"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <motion.circle
                      cx="24" cy="24" r="22"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.path
                      d="M16 24l5 5 11-11"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Redirecting to your dashboard...</p>
                <div className="loading-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle particles in light */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            className="dust-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [-20, -100],
                  x: [0, (i % 2 === 0 ? 20 : -20)],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                style={{
                  left: `${45 + i * 3}%`,
                  top: `${55 + i * 5}%`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;
