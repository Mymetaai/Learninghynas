import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, ArrowUp, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../state/settingsStore';

const LOWERCASE_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
const UPPERCASE_CHARS = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü', '¿', '¡'];

export const GlobalSpanishKeyboard: React.FC = () => {
  const { showGlobalKeyboard, setShowGlobalKeyboard } = useSettingsStore();
  const [isOpen, setIsOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('wayfarer-keyboard-open');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [isUppercase, setIsUppercase] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const lastActiveElementRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wayfarer-keyboard-open', JSON.stringify(isOpen));
    } catch {}
  }, [isOpen]);

  // Auto-dismiss the temporary hide notification
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Track last focused input/textarea across the document
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        lastActiveElementRef.current = target;
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  const insertChar = (char: string) => {
    let target = document.activeElement;

    // Fall back to stored reference if activeElement shifted during mouse down
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLTextAreaElement)
    ) {
      target = lastActiveElementRef.current;
    }

    if (
      target &&
      (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
    ) {
      const input = target;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const val = input.value;
      const newVal = val.substring(0, start) + char + val.substring(end);

      // Native setter hack to ensure React controlled inputs receive the change event properly
      const prototype =
        input instanceof HTMLInputElement
          ? window.HTMLInputElement.prototype
          : window.HTMLTextAreaElement.prototype;
      const valueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

      if (valueSetter) {
        valueSetter.call(input, newVal);
      } else {
        input.value = newVal;
      }

      // Dispatch native input & change events for React
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // Restore caret position & focus
      requestAnimationFrame(() => {
        input.focus();
        const newPos = start + char.length;
        input.setSelectionRange(newPos, newPos);
      });
    }
  };

  const charList = isUppercase ? UPPERCASE_CHARS : LOWERCASE_CHARS;

  return (
    <>
      <AnimatePresence>
        {showGlobalKeyboard && (
          <motion.aside
            key="global-spanish-keyboard"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-label="Global Spanish Keyboard"
            className="fixed bottom-20 sm:bottom-4 left-3 sm:left-4 z-40 flex flex-col items-start gap-1 select-none font-sans"
          >
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-amber-500/40 shadow-2xl transition-all duration-200">
              {/* Main Toggle / Minimized Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isOpen
                    ? 'bg-amber-600 text-white shadow-sm border border-amber-400/40'
                    : 'bg-slate-950/90 text-amber-300 border border-amber-500/50 hover:bg-slate-900 hover:text-white hover:scale-[1.02] shadow-lg'
                }`}
                title={isOpen ? 'Minimize Spanish Keyboard' : 'Expand Spanish Accent Keyboard'}
              >
                <Keyboard className="h-4 w-4 text-amber-300 shrink-0" />
                <span>Teclado Español</span>
                {!isOpen && <ChevronUp className="h-3.5 w-3.5 text-amber-400 ml-0.5 animate-pulse" />}
              </button>

              {isOpen ? (
                <>
                  {/* Shift Uppercase Button */}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsUppercase(!isUppercase)}
                    className={`p-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isUppercase
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                    }`}
                    title="Toggle Uppercase"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>

                  {/* Accent Character Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto max-w-[calc(100vw-250px)] sm:max-w-none py-0.5 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {charList.map((char) => (
                      <button
                        key={char}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          insertChar(char);
                        }}
                        className="h-8 min-w-[32px] px-2 rounded-xl bg-amber-600/90 hover:bg-amber-500 active:scale-95 text-amber-50 font-bold text-sm border border-amber-400/40 shadow-xs flex items-center justify-center transition-all cursor-pointer"
                      >
                        {char}
                      </button>
                    ))}
                  </div>

                  {/* Minimize Button (collapses back to pill) */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 ml-0.5 rounded-xl bg-slate-800/90 text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700/80 transition-all cursor-pointer flex items-center justify-center shrink-0"
                    title="Minimize Keyboard (Minimizar)"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Hide Completely Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowGlobalKeyboard(false);
                      setShowToast(true);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800/90 text-slate-400 border border-slate-700 hover:text-rose-300 hover:bg-rose-950/50 hover:border-rose-800/40 transition-all cursor-pointer flex items-center justify-center shrink-0"
                    title="Hide Spanish Keyboard (Ocultar Teclado)"
                    aria-label="Hide Spanish Keyboard"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                /* Close / Hide Button on Minimized Pill */
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGlobalKeyboard(false);
                    setShowToast(true);
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-slate-800/90 border border-transparent hover:border-slate-700 transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="Hide Spanish Keyboard (Ocultar Teclado)"
                  aria-label="Hide Spanish Keyboard"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Temporary Toast when Hidden */}
      <AnimatePresence>
        {showToast && !showGlobalKeyboard && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-6 left-3 sm:left-4 z-50 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 text-slate-200 text-xs rounded-2xl shadow-2xl font-sans"
          >
            <div className="h-6 w-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Keyboard className="h-3.5 w-3.5 text-amber-300" />
            </div>
            <span className="text-[11px] sm:text-xs">
              Keyboard hidden. Restore anytime via <strong>⌨️</strong> in header.
            </span>
            <button
              type="button"
              onClick={() => {
                setShowGlobalKeyboard(true);
                setShowToast(false);
              }}
              className="ml-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer shrink-0"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 cursor-pointer ml-0.5 shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSpanishKeyboard;
