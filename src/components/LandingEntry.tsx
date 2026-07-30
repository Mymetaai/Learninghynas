import { useState, useEffect, type FC, type ReactNode } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

interface LandingEntryProps {
  children?: ReactNode;
}

export const LandingEntry: FC<LandingEntryProps> = ({ children }) => {
  const [isLampOn, setIsLampOn] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  return (
    <div className="min-h-screen font-sans">
      {/* ── SCENE 1: SIGNED OUT (THE DARK ROOM) ────────────────────────────── */}
      <SignedOut>
        <div
          className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700 ${
            isLampOn
              ? 'bg-gradient-to-b from-[#2C221B] via-[#1C1613] to-[#111111]'
              : 'bg-[#111111]'
          }`}
        >
          {/* THE LAMP UI WITH WARM AMBER CONE PROJECTION */}
          <div className="relative flex flex-col items-center justify-center mb-8">
            
            {/* Illuminated Cone Light Beam (Visible when Lamp is ON) */}
            <div
              className={`absolute top-16 w-72 h-80 bg-gradient-to-b from-[#F5A991]/30 via-[#7D927D]/10 to-transparent blur-xl rounded-full transition-opacity duration-700 pointer-events-none ${
                isLampOn ? 'opacity-100 scale-110' : 'opacity-0 scale-95'
              }`}
            />

            {/* SVG Desk Lamp */}
            <div className="relative z-10">
              <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
                {/* Lamp Base */}
                <ellipse cx="70" cy="165" rx="35" ry="8" fill="#333333" stroke="#555555" strokeWidth="2" />
                {/* Lamp Arm */}
                <path d="M70 165 C70 110, 95 90, 85 45" stroke="#777777" strokeWidth="6" strokeLinecap="round" />
                {/* Lamp Shade */}
                <path
                  d="M50 45 L120 45 L105 15 L65 15 Z"
                  fill={isLampOn ? '#7D927D' : '#333333'}
                  stroke={isLampOn ? '#95AC95' : '#444444'}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                {/* Bulb Glow */}
                <circle
                  cx="85"
                  cy="46"
                  r={isLampOn ? '14' : '6'}
                  fill={isLampOn ? '#FFF3D6' : '#222222'}
                  className="transition-all duration-500"
                />
                {/* Pull Cord */}
                <line x1="100" y1="45" x2="100" y2="95" stroke="#999999" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="100" cy="98" r="4" fill="#F5A991" />
              </svg>
            </div>
          </div>

          {/* THE TRIGGER: PULL THE CORD TO SIGN IN */}
          <div className="relative z-20 text-center space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
              Serene Lexicon Entry
            </h2>
            <p className="font-sans text-xs text-[#999999] max-w-sm">
              Illuminate your quiet reading room to resume your Spanish learning journey.
            </p>

            <SignInButton mode="modal">
              <button
                onClick={() => setIsLampOn(true)}
                className="mt-4 bg-[#7D927D] hover:bg-[#6B826B] text-white font-sans text-xs font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer border-none transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <span>💡</span> Pull the cord to sign in
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* ── SCENE 2 & 3: SIGNED IN ─────────────────────────────────────────── */}
      <SignedIn>
        {!showDashboard ? (
          <WelcomeTransition onTimeout={() => setShowDashboard(true)} />
        ) : (
          <div className="animate-fade-in transition-opacity duration-500">
            {children}
          </div>
        )}
      </SignedIn>
    </div>
  );
};

// ── WELCOME TRANSITION COMPONENT (SCENE 2) ──────────────────────────────────

interface WelcomeTransitionProps {
  onTimeout: () => void;
}

const WelcomeTransition: FC<WelcomeTransitionProps> = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 2500); // 2.5 seconds cinematic transition

    return () => clearTimeout(timer);
  }, [onTimeout]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C221B] via-[#1C1613] to-[#111111] flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16">
      {/* LAMP ON THE LEFT */}
      <div className="relative flex flex-col items-center justify-center shrink-0">
        <div className="absolute w-72 h-80 bg-gradient-to-b from-[#F5A991]/35 via-[#7D927D]/15 to-transparent blur-2xl rounded-full" />
        <div className="relative z-10">
          <svg width="150" height="190" viewBox="0 0 140 180" fill="none">
            <ellipse cx="70" cy="165" rx="35" ry="8" fill="#333333" stroke="#555555" strokeWidth="2" />
            <path d="M70 165 C70 110, 95 90, 85 45" stroke="#777777" strokeWidth="6" strokeLinecap="round" />
            <path d="M50 45 L120 45 L105 15 L65 15 Z" fill="#7D927D" stroke="#95AC95" strokeWidth="2" />
            <circle cx="85" cy="46" r="14" fill="#FFF3D6" />
            <line x1="100" y1="45" x2="100" y2="95" stroke="#999999" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="100" cy="98" r="4" fill="#F5A991" />
          </svg>
        </div>
      </div>

      {/* WELCOME BACK CARD ON THE RIGHT */}
      <div className="bg-white border border-[#777775]/20 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center space-y-4 animate-scale-up">
        <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-full bg-[#7D927D]/10 text-[#7D927D]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2F353B]">
          Welcome Back!
        </h2>
        <p className="font-sans text-xs text-[#777775] leading-relaxed">
          Preparing your notebook profile...
        </p>
        <div className="w-full h-1.5 bg-[#F9F7F2] rounded-full overflow-hidden">
          <div className="h-full bg-[#7D927D] rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default LandingEntry;
