"use client"
import { ReactNode } from "react";
import { create } from "zustand";

interface SidebarState {
    toggle: boolean
    setToggle: (next: boolean | ((prev: boolean) => boolean)) => void
    resetToggle: () => void
}

const useSidebarStore = create<SidebarState>((set) => ({
    toggle: false,
    setToggle: (next) =>
        set((state) => ({
            toggle: typeof next === "function" ? next(state.toggle) : next,
        })),
    resetToggle: () => set({ toggle: false }),
}));

export const SidebarProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const useSidebar = useSidebarStore;
