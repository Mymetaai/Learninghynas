import { useState, useEffect } from 'react';
import type { VocabItem } from '../content/types';

export function useVocabDeck(items: VocabItem[]) {
  const [deck, setDeck] = useState<VocabItem[]>(items);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'revealed' | 'correct' | 'incorrect'>('idle');

  // Sync deck when items change (e.g. category/level filter changes)
  useEffect(() => {
    setDeck(items);
    setIndex(0);
    setStatus('idle');
  }, [items]);

  const current = deck[index] || null;

  function advance() {
    setStatus('idle');
    if (deck.length > 0) {
      setIndex((i) => (i + 1) % deck.length);
    }
  }

  // Normalizes input to remove accents/diacritics for a more lenient matching
  const normalizeText = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  function reveal(userAnswer?: string) {
    if (!current) return;
    if (userAnswer !== undefined) {
      const uNorm = normalizeText(userAnswer);
      const cNorm = normalizeText(current.es);
      
      const isCorrect = uNorm === cNorm;
      setStatus(isCorrect ? 'correct' : 'incorrect');
    } else {
      setStatus('revealed');
    }
  }

  function shuffle() {
    if (deck.length === 0) return;
    setDeck((d) => [...d].sort(() => Math.random() - 0.5));
    setIndex(0);
    setStatus('idle');
  }

  function reset() {
    setIndex(0);
    setStatus('idle');
  }

  return { current, index, setIndex, deck, status, advance, reveal, shuffle, reset, setDeck };
}
