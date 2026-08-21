import React, { useState } from 'react';
import { Keyboard, ArrowUp, ChevronDown } from 'lucide-react';

export interface SpanishVirtualKeyboardProps {
  onInsert: (char: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  className?: string;
  compact?: boolean;
}

const LOWERCASE_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
const UPPERCASE_CHARS = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü', '¿', '¡'];

export const SpanishVirtualKeyboard: React.FC<SpanishVirtualKeyboardProps> = ({
  onInsert,
  inputRef,
  className = '',
  compact = false,
}) => {
  const [isUppercase, setIsUppercase] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const charList = isUppercase ? UPPERCASE_CHARS : LOWERCASE_CHARS;

  const handleCharClick = (e: React.MouseEvent, char: string) => {
    e.preventDefault(); // Prevent input blur

    if (inputRef && inputRef.current) {
      const input = inputRef.current;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const val = input.value;
      const newVal = val.substring(0, start) + char + val.substring(end);

      onInsert(newVal);

      // Restore caret position & focus
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const newPos = start + char.length;
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      });
    } else {
      onInsert(char);
    }
  };

  return (
    <div className={`inline-flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-amber-500/30 shadow-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Toggle Collapse/Expand Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer select-none ${
            isOpen
              ? 'bg-amber-600/90 text-white border border-amber-500/50 shadow-xs'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
          }`}
          title={isOpen ? 'Ocultar Teclado Español' : 'Mostrar Teclado Español'}
        >
          <Keyboard className="h-3 w-3 text-amber-300" />
          <span>{compact ? 'ES' : 'Teclado ES'}</span>
        </button>

        {isOpen && (
          <>
            {/* Shift Case Toggle */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsUppercase(!isUppercase)}
              className={`p-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer select-none flex items-center justify-center ${
                isUppercase
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
              title="Alternar Mayúsculas"
            >
              <ArrowUp className="h-3 w-3" />
            </button>

            {/* Character Buttons */}
            {charList.map((char) => (
              <button
                key={char}
                type="button"
                onMouseDown={(e) => handleCharClick(e, char)}
                className="h-7 min-w-[28px] px-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-amber-50 font-semibold text-xs border border-amber-500/40 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 select-none"
              >
                {char}
              </button>
            ))}

            {/* Minimize Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700/80 transition-all cursor-pointer select-none flex items-center justify-center shrink-0"
              title="Minimizar Teclado"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SpanishVirtualKeyboard;
