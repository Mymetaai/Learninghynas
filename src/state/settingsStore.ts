import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TranslationLanguage = 'en' | 'hinglish';

export type LogoVariant = 'executive' | 'uploaded' | 'chibi';

export interface LogoOption {
  label: string;
  src: string;
}

export const LOGO_VARIANTS: Record<LogoVariant, LogoOption> = {
  executive: { label: 'Executive Emblem', src: '/adult-hyena-logo.jpg' },
  uploaded: { label: 'Uploaded Mascot', src: '/uploaded-hyena-logo.png' },
  chibi: { label: 'Cute Chibi', src: '/ai-hyena-logo.jpg' },
};

interface SettingsState {
  language: TranslationLanguage;
  setLanguage: (lang: TranslationLanguage) => void;
  logoVariant: LogoVariant;
  setLogoVariant: (variant: LogoVariant) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      logoVariant: 'executive',
      setLogoVariant: (logoVariant) => set({ logoVariant }),
    }),
    {
      name: 'thelearninghyena-settings',
    }
  )
);

