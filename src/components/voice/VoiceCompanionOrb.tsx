import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, Sparkles, Loader2, Square } from 'lucide-react';

export type VoiceOrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface VoiceCompanionOrbProps {
  state: VoiceOrbState;
  companionName?: string;
  onMicClick: () => void;
  onStopSpeaking?: () => void;
  disabled?: boolean;
  errorMessage?: string | null;
  compact?: boolean;
}

export const VoiceCompanionOrb: FC<VoiceCompanionOrbProps> = ({
  state,
  companionName = 'Elena',
  onMicClick,
  onStopSpeaking,
  disabled = false,
  errorMessage,
  compact = true,
}) => {
  const getStatusLabel = () => {
    switch (state) {
      case 'listening':
        return 'Listening... Speak in Spanish';
      case 'thinking':
        return 'Thinking... Procesando';
      case 'speaking':
        return `${companionName} is speaking...`;
      case 'idle':
      default:
        return 'Push-to-Talk · Speak Spanish';
    }
  };

  const getStatusBadgeColor = () => {
    switch (state) {
      case 'listening':
        return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40';
      case 'thinking':
        return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/40';
      case 'speaking':
        return 'bg-[#7D927D]/20 text-[#5E735E] dark:text-[#A3B899] border-[#7D927D]/40';
      case 'idle':
      default:
        return 'bg-structural/20 text-text-secondary border-structural/40';
    }
  };

  if (compact) {
    return (
      <div className="w-full flex items-center justify-between gap-3 px-3 py-2 select-none">
        {/* Left: Companion Info & Live Audio Wave */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#7D927D]/20 text-[#5E735E] font-bold text-sm shrink-0 border border-[#7D927D]/30">
            <span>{companionName[0]}</span>
            {(state === 'listening' || state === 'speaking') && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xs font-bold text-text-primary truncate">
                {companionName}
              </span>
              <span className="text-[10px] font-mono text-text-tertiary">· Voice Companion</span>
            </div>
            {/* Dynamic Status / Error */}
            {errorMessage ? (
              <p className="text-[11px] text-rose-500 font-medium truncate">{errorMessage}</p>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-secondary">
                {state === 'thinking' && <Sparkles className="w-3 h-3 text-amber-500 animate-spin shrink-0" />}
                {state === 'speaking' && <Volume2 className="w-3 h-3 text-[#7D927D] animate-bounce shrink-0" />}
                {state === 'listening' && <Mic className="w-3 h-3 text-emerald-600 animate-pulse shrink-0" />}
                <span className="truncate">{getStatusLabel()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Mic / Audio Control */}
        <div className="flex items-center gap-2 shrink-0">
          {state === 'speaking' && onStopSpeaking && (
            <button
              type="button"
              onClick={onStopSpeaking}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-bg-elevated hover:bg-bg-elevated-2 border border-structural text-text-secondary hover:text-text-primary text-[11px] font-mono transition-colors cursor-pointer"
              title="Stop audio playback"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Stop</span>
            </button>
          )}

          <div className="relative flex items-center justify-center">
            {/* Ripple rings */}
            <AnimatePresence>
              {(state === 'listening' || state === 'speaking') && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [1, 1.45, 1.8], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  className={`absolute inset-0 rounded-full pointer-events-none ${
                    state === 'listening' ? 'bg-emerald-400/40' : 'bg-[#7D927D]/40'
                  }`}
                />
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={state === 'speaking' ? onStopSpeaking : onMicClick}
              disabled={disabled || state === 'thinking'}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm border cursor-pointer ${
                state === 'listening'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-300 text-white shadow-emerald-500/20'
                  : state === 'thinking'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300 text-white shadow-amber-500/20'
                  : state === 'speaking'
                  ? 'bg-gradient-to-r from-[#7D927D] to-[#5E735E] border-[#A3B899] text-white shadow-[#7D927D]/20'
                  : 'bg-bg-elevated hover:bg-accent-action/10 border-structural hover:border-accent-action text-text-primary'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={state === 'speaking' ? 'Stop audio' : 'Push to talk'}
            >
              {state === 'listening' ? (
                <>
                  <Mic className="w-4 h-4 animate-pulse text-white" />
                  <span>Listening...</span>
                </>
              ) : state === 'thinking' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Thinking...</span>
                </>
              ) : state === 'speaking' ? (
                <>
                  <Volume2 className="w-4 h-4 animate-bounce text-white" />
                  <span>Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-accent-action" />
                  <span>Push to Talk</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Full-size Orb View (if compact is false)
  return (
    <div className="flex flex-col items-center justify-center py-3 select-none">
      <div className="relative flex items-center justify-center w-28 h-28">
        <AnimatePresence>
          {(state === 'listening' || state === 'speaking') && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: [1, 1.4, 1.7], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              className={`absolute inset-0 rounded-full pointer-events-none ${
                state === 'listening' ? 'bg-emerald-400/30' : 'bg-[#7D927D]/30'
              }`}
            />
          )}
        </AnimatePresence>

        {state === 'thinking' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-1 rounded-full border-2 border-dashed border-amber-400/70 pointer-events-none"
          />
        )}

        <motion.button
          type="button"
          onClick={state === 'speaking' ? onStopSpeaking : onMicClick}
          disabled={disabled || state === 'thinking'}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center transition-colors duration-300 shadow-md border-2 cursor-pointer ${
            state === 'listening'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-300 text-white'
              : state === 'thinking'
              ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-300 text-white'
              : state === 'speaking'
              ? 'bg-gradient-to-br from-[#7D927D] to-[#5E735E] border-[#A3B899] text-white'
              : 'bg-gradient-to-br from-[#7D927D] to-[#5E735E] hover:from-[#6B826B] hover:to-[#4D624D] border-[#7D927D]/40 text-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {state === 'listening' ? (
            <Mic className="w-7 h-7 animate-pulse text-white" />
          ) : state === 'thinking' ? (
            <Loader2 className="w-7 h-7 animate-spin text-white" />
          ) : state === 'speaking' ? (
            <Volume2 className="w-7 h-7 text-white animate-bounce" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </motion.button>
      </div>

      <div className="mt-2 flex flex-col items-center gap-1">
        <div className={`flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${getStatusBadgeColor()}`}>
          <span>{getStatusLabel()}</span>
        </div>
        {errorMessage && (
          <p className="text-xs text-rose-500 font-medium font-sans mt-0.5">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default VoiceCompanionOrb;
