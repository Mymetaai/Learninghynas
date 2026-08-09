import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, ArrowUp } from 'lucide-react';

const LOWERCASE_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
const UPPERCASE_CHARS = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü', '¿', '¡'];

export const GlobalSpanishKeyboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isUppercase, setIsUppercase] = useState(false);
  const lastActiveElementRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

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
    <aside aria-label="Global Spanish Keyboard" className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-1 select-none font-sans">
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-amber-500/40 shadow-2xl transition-all">
        {/* Main Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            isOpen
              ? 'bg-amber-600 text-white shadow-sm border border-amber-400/40'
              : 'bg-slate-800 text-slate-200 border border-slate-700 hover:text-white hover:border-amber-500/50'
          }`}
          title={isOpen ? 'Collapse Spanish Keyboard' : 'Open Global Spanish Keyboard'}
        >
          <Keyboard className="h-4 w-4 text-amber-300" />
          <span>⌨️ Teclado Español</span>
        </button>

        {isOpen && (
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
            <div className="flex items-center gap-1 overflow-x-auto max-w-[calc(100vw-180px)] sm:max-w-none py-0.5 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          </>
        )}
      </div>
    </aside>
  );
};

export default GlobalSpanishKeyboard;
