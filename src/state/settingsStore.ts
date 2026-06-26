import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TranslationLanguage = 'en' | 'hinglish';

interface SettingsState {
  language: TranslationLanguage;
  setLanguage: (lang: TranslationLanguage) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'thelearninghyena-settings',
    }
  )
);
