import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('ecotrack-theme') || 'light');
  const [fontScale, setFontScale] = useState(Number(localStorage.getItem('ecotrack-font-scale') || 1));
  const [highContrast, setHighContrast] = useState(localStorage.getItem('ecotrack-contrast') === 'true');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'normal';
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
    localStorage.setItem('ecotrack-theme', theme);
    localStorage.setItem('ecotrack-font-scale', String(fontScale));
    localStorage.setItem('ecotrack-contrast', String(highContrast));
  }, [theme, fontScale, highContrast]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    fontScale,
    increaseFont: () => setFontScale((prev) => Math.min(prev + 0.1, 1.4)),
    decreaseFont: () => setFontScale((prev) => Math.max(prev - 0.1, 0.9)),
    highContrast,
    setHighContrast
  }), [theme, fontScale, highContrast]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
