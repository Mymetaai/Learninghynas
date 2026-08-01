import React, { createContext, useContext, useEffect } from 'react';
import { useEntitlementStore } from '../state/entitlementStore';
import { getCatalogItem } from '../data/shopCatalog';

interface ThemeContextType {
  activeThemeId: string;
  setActiveTheme: (themeId: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  activeThemeId: 'theme_parchment',
  setActiveTheme: () => false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const activeThemeId = useEntitlementStore((state) => state.activeThemeId);
  const setActiveTheme = useEntitlementStore((state) => state.setActiveTheme);

  useEffect(() => {
    const themeItem = getCatalogItem(activeThemeId);
    if (!themeItem || !themeItem.cssVariables) return;

    const root = document.documentElement;
    Object.entries(themeItem.cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [activeThemeId]);

  return (
    <ThemeContext.Provider value={{ activeThemeId, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
