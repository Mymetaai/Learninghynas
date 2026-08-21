import { useEffect, useState, useCallback } from 'react';
import { fetchDailyInspiration, type DailyQuote } from '../../services/quoteService';
import { Sparkles, Quote, Copy, Check, RotateCw } from 'lucide-react';

export default function DailyProverbCard() {
  const [quoteData, setQuoteData] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadQuote = useCallback(async (force = false) => {
    if (force) setIsRefreshing(true);
    try {
      const data = await fetchDailyInspiration(force);
      setQuoteData(data);
    } catch (err) {
      console.warn('Failed to load daily inspiration:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadQuote(false);
  }, [loadQuote]);

  const handleCopy = () => {
    if (!quoteData) return;
    const textToCopy = quoteData.spanishTranslation
      ? `"${quoteData.spanishTranslation}"\n"${quoteData.quote}"\n— ${quoteData.author}`
      : `"${quoteData.quote}"\n— ${quoteData.author}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading && !quoteData) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-bg-elevated/70 backdrop-blur-md border border-[#7D927D]/30 p-5 shadow-xs animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-32 bg-[#7D927D]/20 rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-structural/30 rounded-md" />
          <div className="h-4 w-1/2 bg-structural/20 rounded-md" />
        </div>
      </div>
    );
  }

  if (!quoteData) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-bg-elevated/80 backdrop-blur-md border border-[#7D927D]/30 p-5 shadow-xs transition-all duration-300 hover:border-[#7D927D]/60 group">
      {/* Top Bar: Title Badge & Action Buttons */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-[#7D927D] dark:text-[#A3B899]">
          <Sparkles className="w-4 h-4 text-[#7D927D]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            Inspiración Diaria
          </span>
        </div>

        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy quote to clipboard"}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#7D927D]/10 dark:hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#7D927D]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => loadQuote(true)}
            disabled={isRefreshing}
            title="Refresh inspiration"
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#7D927D]/10 dark:hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#7D927D]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quote Body */}
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-[#7D927D]/10 border border-[#7D927D]/20 text-[#7D927D] shrink-0 mt-0.5">
          <Quote className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          {quoteData.spanishTranslation && (
            <p className="font-serif italic text-base md:text-lg font-medium text-text-primary leading-relaxed">
              &ldquo;{quoteData.spanishTranslation}&rdquo;
            </p>
          )}
          <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
            &ldquo;{quoteData.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-px w-4 bg-[#7D927D]/40" />
            <span className="font-mono text-[11px] font-semibold text-[#5E735E] dark:text-[#A3B899]">
              {quoteData.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
