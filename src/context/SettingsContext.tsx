import React, { createContext, useContext, useState } from 'react';

interface AppSettings {
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const SettingsContext = createContext<AppSettings>({
  geminiApiKey: '',
  setGeminiApiKey: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [geminiApiKey, setGeminiApiKeyState] = useState(() => {
    return localStorage.getItem('murdle_gemini_key') || '';
  });

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('murdle_gemini_key', key);
  };

  return (
    <SettingsContext.Provider value={{ geminiApiKey, setGeminiApiKey }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
