import { useThemeStore } from "@/context/theme.context";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const mounted = useThemeStore((state) => state.mounted);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { theme, mounted, toggleTheme };
};
