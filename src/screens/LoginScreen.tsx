import React, { useState } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Fingerprint, Mail, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../state/authStore';
import './LampLogin.css';

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
    console.log("AudioContext click synthesis blocked or unsupported", e);
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const stringControls = useAnimationControls();

  const handleToggle = async () => {
    setIsOn(!isOn);
    setHasToggled(true);
    playSwitchSound();

    // Natural pendulum swing with a decay effect when clicked
    await stringControls.start({
      rotate: [0, -18, 14, -9, 5, -2, 0],
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
    }, 1800);
  };

  const handlePasskeySubmit = () => {
    setPasskeyScanning(true);
    setIsVerifying(true);

    setTimeout(() => {
      setPasskeyScanning(false);
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('biometric.user@domain.local', 'Passkey (Biometric)');
      }, 1500);
    }, 2500);
  };

  return (
    <div className={`lamp-container ${isOn ? 'light-on' : 'light-off'}`}>
      {/* Background Subtle Gradient Blobs for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-accent-action blur-[90px]"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Fixture Parts */}
      <div className="lamp-wire" />
      <div className="lamp-base" />
      
      {/* Interactive Physics Pull Cord */}
      <motion.div 
        className="pull-string" 
        onClick={handleToggle}
        animate={stringControls}
        style={{ transformOrigin: "top center" }} 
        whileHover={{ scale: 1.03 }}
        whileTap={{ y: 16 }} 
        aria-label="Toggle Light Switch"
        title="Pull Cord"
      >
        <div className="string-line" />
        <div className="string-bead" />
      </motion.div>

      {/* Helper text tooltip for new visitors */}
      <AnimatePresence>
        {!hasToggled && !isOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="string-hint"
          >
            💡 Pull the cord to sign in
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Cone Projection Geometry */}
      <motion.div 
        className="light-cone" 
        animate={{ opacity: isOn ? 1 : 0, scale: isOn ? 1 : 0.95 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* Elastic Drop-Down UI Card */}
      <AnimatePresence>
        {isOn && (
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: -160, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -120, scale: 0.85 }}
            transition={{
              type: "spring",
              stiffness: 125, 
              damping: 11.5,    
              mass: 0.85
            }}
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
              <>
                <h2>Welcome Back</h2>
                <p className="login-card-subtitle">
                  {loginMethod === 'password' 
                    ? "Enter your credentials to continue" 
                    : "Sign in instantly using your device biometrics"}
                </p>

                <AnimatePresence mode="wait">
                  {loginMethod === 'password' ? (
                    <motion.form
                      key="password-form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleTraditionalSubmit}
                    >
                      <div className="input-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="name@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isVerifying}
                        />
                      </div>
                      <div className="input-group">
                        <label>Password</label>
                        <input 
                          type="password" 
                          required 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isVerifying}
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="login-btn"
                        disabled={isVerifying}
                      >
                        {isVerifying ? (
                          <>
                            <div className="login-loading-spinner" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="passkey-form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center py-4"
                    >
                      {passkeyScanning ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-structural bg-bg-elevated-2 overflow-hidden shadow-inner mb-4">
                            {/* Scanning laser animation */}
                            <motion.div
                              animate={{ y: [-5, 95, -5] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute left-0 right-0 h-0.5 bg-accent-action shadow-[0_0_8px_#e64833]"
                            />
                            <Fingerprint className="h-12 w-12 text-accent-action/70" />
                          </div>
                          <p className="font-body text-xs font-semibold text-text-primary flex items-center gap-1.5">
                            <span className="login-loading-spinner" style={{ borderTopColor: '#e64833', width: '12px', height: '12px' }} />
                            Authenticating Passkey...
                          </p>
                        </div>
                      ) : (
                        <div className="text-center w-full">
                          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-action/5 border border-accent-action/10 text-accent-action/60">
                            <Fingerprint className="h-10 w-10" />
                          </div>
                          <button
                            type="button"
                            onClick={handlePasskeySubmit}
                            className="login-btn"
                          >
                            <Fingerprint className="h-4 w-4" /> Authenticate via Passkey
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle Passwordless vs Traditional */}
                <div className="login-toggle-mode">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isVerifying) {
                        setLoginMethod(loginMethod === 'password' ? 'passkey' : 'password');
                      }
                    }}
                    disabled={isVerifying}
                  >
                    {loginMethod === 'password' ? (
                      <span className="flex items-center justify-center gap-1">
                        <Fingerprint className="h-3.5 w-3.5" /> Sign in without password
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <Mail className="h-3.5 w-3.5" /> Use traditional password
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;
