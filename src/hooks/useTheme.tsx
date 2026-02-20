// "use client"
// import { useEffect, useState } from "react";

import { useContext } from "react";
import { ThemeContext } from "@/app/context/theme.context";

// export const useTheme = () => {
//     const [theme, setTheme] = useState<"light" | "dark">(() => {
//         if (typeof window === "undefined") return "light";

//         const saved = localStorage.getItem("theme");
//         if (saved === "light" || saved === "dark") return saved;

//         const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
        
//         return prefersDark ? "dark" : "light";
//     });

//     useEffect(() => {
//         document.documentElement.classList.toggle("dark", theme === "dark");
//     }, [theme]);

//     const toggleTheme = (prop: 'light' | 'dark') => {
//         setTheme(prop);
//         localStorage.setItem("theme", prop);
//     };

//     return { theme, toggleTheme };
// }

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
