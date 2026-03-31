"use client";
import { ReactNode, useEffect } from "react";
import { create } from "zustand";

export type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "theme";
const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

interface ThemeState {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: (theme?: Theme) => void;
  initializeTheme: () => void;
}

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : null;
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
};

const applyTheme = (theme: Theme, persistPreference: boolean) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;

  if (persistPreference) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    return;
  }

  document.documentElement.removeAttribute("data-theme");
  localStorage.removeItem(THEME_STORAGE_KEY);
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  mounted: false,
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      applyTheme(theme, true);
    }
  },
  toggleTheme: (theme) => {
    const nextTheme =
      theme ??
      (useThemeStore.getState().theme === "dark" ? "light" : "dark");

    set({ theme: nextTheme });
    if (typeof window !== "undefined") {
      applyTheme(nextTheme, true);
    }
  },
  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const storedTheme = getStoredTheme();
    const theme = storedTheme ?? getSystemTheme();
    set({ theme, mounted: true });
    applyTheme(theme, Boolean(storedTheme));
  },
}));

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const store = useThemeStore.getState();
    store.initializeTheme();

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    const syncWithSystemTheme = (event?: MediaQueryListEvent) => {
      if (getStoredTheme()) {
        return;
      }

      const nextTheme = event?.matches ? "dark" : getSystemTheme();
      useThemeStore.setState({ theme: nextTheme });
      applyTheme(nextTheme, false);
    };

    mediaQuery.addEventListener("change", syncWithSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", syncWithSystemTheme);
    };
  }, []);

  return <>{children}</>;
};
