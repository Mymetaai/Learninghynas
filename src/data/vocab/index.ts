import type { VocabItem } from '../../content/types';
import a1Data from './a1.json';
import a2Data from './a2.json';
import b1Data from './b1.json';
import b2Data from './b2.json';
import c1Data from './c1.json';

const rawVocabItems: VocabItem[] = [
  ...(a1Data as VocabItem[]),
  ...(a2Data as VocabItem[]),
  ...(b1Data as VocabItem[]),
  ...(b2Data as VocabItem[]),
  ...(c1Data as VocabItem[]),
];

// Helper to normalize the spanish text for comparison
const normalizeKey = (item: VocabItem) => {
  return `${item.level}_${item.category}_${item.es.toLowerCase().trim()}`;
};

// Deduplicate
const uniqueMap = new Map<string, VocabItem>();
rawVocabItems.forEach((item) => {
  const key = normalizeKey(item);
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, item);
  }
});

export const ALL_VOCAB_ITEMS: VocabItem[] = Array.from(uniqueMap.values());

export const getVocabByLevel = (level: VocabItem['level']): VocabItem[] => {
  return ALL_VOCAB_ITEMS.filter((item) => item.level === level);
};

export const getVocabCategories = (level: VocabItem['level']): string[] => {
  const categories = ALL_VOCAB_ITEMS.filter((item) => item.level === level).map(
    (item) => item.category,
  );
  return Array.from(new Set(categories));
};

export const getVocabByLevelAndCategory = (
  level: VocabItem['level'],
  category: string,
): VocabItem[] => {
  return ALL_VOCAB_ITEMS.filter(
    (item) => item.level === level && item.category === category,
  );
};
