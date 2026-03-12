'use client';
import React, { ReactNode } from 'react';
import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  resetSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  resetSidebar: () => set({ isOpen: true }),
}));

export const useSidebar = useSidebarStore;

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
