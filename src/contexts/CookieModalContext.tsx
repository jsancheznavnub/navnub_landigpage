
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

type CookieModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const CookieModalContext = createContext<CookieModalContextType | undefined>(undefined);

export function CookieModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <CookieModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </CookieModalContext.Provider>
  );
}

export function useCookieModal() {
  const context = useContext(CookieModalContext);
  if (context === undefined) {
    throw new Error('useCookieModal must be used within a CookieModalProvider');
  }
  return context;
}
