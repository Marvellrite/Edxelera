"use client"
import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";

        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;

        const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
        
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = (prop: 'light' | 'dark') => {
        setTheme(prop);
        localStorage.setItem("theme", prop);
    };

    return { theme, toggleTheme };
}