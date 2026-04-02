"use client";
import { ReactNode, useEffect } from "react";
import { create } from "zustand";

export type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "theme";
const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

interface ThemeState {
  theme: Theme;
  selectedTheme: Theme | null;
  hasExplicitTheme: boolean;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: (theme?: Theme) => void;
  initializeTheme: () => void;
  syncWithSystemTheme: (theme?: Theme) => void;
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

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document.documentElement.dataset.theme = theme;
};

const persistThemePreference = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const clearThemePreference = () => {
  localStorage.removeItem(THEME_STORAGE_KEY);
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  selectedTheme: null,
  hasExplicitTheme: false,
  mounted: false,
  setTheme: (theme) => {
    set({
      theme,
      selectedTheme: theme,
      hasExplicitTheme: true,
    });

    if (typeof window !== "undefined") {
      applyTheme(theme);
      persistThemePreference(theme);
    }
  },
  toggleTheme: (theme) => {
    const nextTheme =
      theme ??
      (useThemeStore.getState().theme === "dark" ? "light" : "dark");

    set({
      theme: nextTheme,
      selectedTheme: nextTheme,
      hasExplicitTheme: true,
    });

    if (typeof window !== "undefined") {
      applyTheme(nextTheme);
      persistThemePreference(nextTheme);
    }
  },
  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const selectedTheme = getStoredTheme();
    const resolvedTheme = selectedTheme ?? getSystemTheme();

    set({
      theme: resolvedTheme,
      selectedTheme,
      hasExplicitTheme: selectedTheme !== null,
      mounted: true,
    });

    applyTheme(resolvedTheme);

    if (selectedTheme) {
      persistThemePreference(selectedTheme);
      return;
    }

    clearThemePreference();
  },
  syncWithSystemTheme: (theme) => {
    const { hasExplicitTheme } = useThemeStore.getState();

    if (hasExplicitTheme || typeof window === "undefined") {
      return;
    }

    const resolvedTheme = theme ?? getSystemTheme();

    set({
      theme: resolvedTheme,
      selectedTheme: null,
      hasExplicitTheme: false,
    });

    applyTheme(resolvedTheme);
    clearThemePreference();
  },
}));

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    useThemeStore.getState().initializeTheme();

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      useThemeStore.getState().syncWithSystemTheme(
        event.matches ? "dark" : "light"
      );
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return <>{children}</>;
};
