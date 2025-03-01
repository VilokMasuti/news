'use client';

import type React from 'react';

import type { NewsCategory } from '@/types';
import { createContext, useContext, useState } from 'react';

interface NewsContextType {
  selectedCategory: NewsCategory | null;
  searchQuery: string;
  setSelectedCategory: (category: NewsCategory | null) => void;
  setSearchQuery: (query: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <NewsContext.Provider
      value={{
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}
