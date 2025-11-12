
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AppContent } from '../types';
import { initialData } from '../initialData';

const CONTENT_STORAGE_KEY = 'djSparkContent';

interface ContentContextType {
  content: AppContent;
  setContent: React.Dispatch<React.SetStateAction<AppContent>>;
  resetContent: () => void;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(() => {
    try {
      const storedContent = window.localStorage.getItem(CONTENT_STORAGE_KEY);
      if (storedContent) {
        return JSON.parse(storedContent);
      }
    } catch (error) {
      console.error("Failed to parse content from localStorage", error);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      console.error("Failed to save content to localStorage", error);
    }
  }, [content]);

  const resetContent = () => {
      if(window.confirm('Er du sikker på at du vil tilbakestille alt innhold til de opprinnelige standardene? Dette kan ikke angres.')) {
        setContent(initialData);
      }
  }

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};
