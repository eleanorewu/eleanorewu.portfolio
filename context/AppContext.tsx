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

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme') as Theme;
    const htmlElement = document.documentElement;
    
    // 移除 light 和 dark class，重新設置
    htmlElement.classList.remove('light', 'dark');
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.add('light');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.add('light');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const htmlElement = document.documentElement;
    // 移除所有主題 class，然後添加正確的 class
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(newTheme);
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