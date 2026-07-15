import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Fingerprint, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../state/authStore';
import './LampLogin.css';

// Realistic switch click sound
const playSwitchSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Metallic click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);

    // Spring clack
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(400, ctx.currentTime + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.06, ctx.currentTime + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc2.start(ctx.currentTime + 0.04);
    osc2.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.log("Audio blocked", e);
  }
};

const LoginScreen: React.FC = () => {
  const login = useAuthStore((s) => s.login);
  const [isOn, setIsOn] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'passkey'>('password');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passkeyScanning, setPasskeyScanning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const stringControls = useAnimation();
  const lampControls = useAnimation();

  const handleToggle = async () => {
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
  };

  const handleTraditionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login(email || 'wayfarer@learninghyena.org', 'Traditional Password');
      }, 1500);
    }, 2000);
  };

  const handlePasskeySubmit = () => {
    setPasskeyScanning(true);
    setIsVerifying(true);
    setTimeout(() => {
      setPasskeyScanning(false);
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('wayfarer@learninghyena.org', 'Passkey Biometrics');
      }, 1500);
    }, 3000);
  };

  const handleQuickEnter = () => {
    if (isVerifying || isSuccess) return;
    setIsVerifying(true);
    setIsOn(true);
    playSwitchSound();

    stringControls.start({
      y: [null, 100, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    });

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('wayfarer@learninghyena.org', 'Pulled String Quick Entry');
      }, 1500);
    }, 1800);
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
            onTap={() => {
              handleToggle();
            }}
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
            Pull the chain to illuminate
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
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
              {isSuccess ? (
                <motion.div
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
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
                </motion.div>
              ) : (
                <>
                  <div className="card-header">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">
                      {loginMethod === 'password' 
                        ? "Sign in to continue your journey" 
                        : "Use your device biometrics"}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {loginMethod === 'password' ? (
                      <motion.form
                        key="password-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25 }}
                        onSubmit={handleTraditionalSubmit}
                      >
                        <div className="input-field">
                          <label>Email</label>
                          <div className="input-wrap">
                            <input 
                              type="email" 
                              required 
                              placeholder="you@example.com" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={isVerifying}
                            />
                          </div>
                        </div>

                        <div className="input-field">
                          <label>Password</label>
                          <div className="input-wrap">
                            <input 
                              type={showPassword ? "text" : "password"}
                              required 
                              placeholder="••••••••" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              disabled={isVerifying}
                            />
                            <button 
                              type="button"
                              className="eye-btn"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div className="forgot-row">
                          <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button 
                          type="submit" 
                          className="submit-btn"
                          disabled={isVerifying}
                        >
                          {isVerifying ? (
                            <>
                              <div className="spinner" />
                              Signing in...
                            </>
                          ) : (
                            <>
                              Sign In <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="passkey-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="passkey-section"
                      >
                        {passkeyScanning ? (
                          <div className="scanning-state">
                            <div className="scanner-ring">
                              <motion.div
                                className="scanner-beam"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              />
                              <Fingerprint className="scan-icon" size={40} />
                            </div>
                            <p className="scan-text">
                              <span className="spinner-sm" />
                              Verifying your identity...
                            </p>
                          </div>
                        ) : (
                          <div className="passkey-ready">
                            <div className="passkey-icon-wrap">
                              <Fingerprint size={36} />
                            </div>
                            <p className="passkey-desc">
                              Sign in securely with your device's biometric authentication
                            </p>
                            <button
                              type="button"
                              onClick={handlePasskeySubmit}
                              className="submit-btn passkey-btn"
                            >
                              <Fingerprint size={18} /> 
                              Authenticate with Passkey
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="divider">
                    <span>or</span>
                  </div>

                  <button
                    type="button"
                    className="toggle-method"
                    onClick={() => {
                      if (!isVerifying) {
                        setLoginMethod(loginMethod === 'password' ? 'passkey' : 'password');
                      }
                    }}
                    disabled={isVerifying}
                  >
                    {loginMethod === 'password' ? (
                      <span><Fingerprint size={14} /> Sign in with Passkey</span>
                    ) : (
                      <span><Mail size={14} /> Use email & password</span>
                    )}
                  </button>
                </>
              )}
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
