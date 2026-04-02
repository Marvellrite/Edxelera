import { useThemeStore } from "@/context/theme.context";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const selectedTheme = useThemeStore((state) => state.selectedTheme);
  const hasExplicitTheme = useThemeStore((state) => state.hasExplicitTheme);
  const mounted = useThemeStore((state) => state.mounted);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    theme,
    selectedTheme,
    hasExplicitTheme,
    mounted,
    toggleTheme,
    setTheme,
  };
};
