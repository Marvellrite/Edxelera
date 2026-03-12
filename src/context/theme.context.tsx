"use client";
import { ReactNode, useEffect } from "react";
import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

const resolveInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  mounted: false,
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      applyTheme(theme);
    }
  },
  toggleTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      applyTheme(theme);
    }
  },
  initializeTheme: () => {
    if (typeof window === "undefined") return;
    const theme = resolveInitialTheme();
    set({ theme, mounted: true });
    applyTheme(theme);
  },
}));

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    useThemeStore.getState().initializeTheme();
  }, []);

  return <>{children}</>;
};
