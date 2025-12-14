import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (obj: any) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');

  // Title translations
  const titleTranslations = {
    zh: "Eleanore's 作品集",
    en: "Eleanore's Portfolio"
  };

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Update document title when language changes
  useEffect(() => {
    document.title = titleTranslations[language];
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Helper to get string based on current language
  const t = (obj: any): any => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj['en'] || '';
  };

  return (
    <AppContext.Provider value={{ language, setLanguage: handleSetLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};