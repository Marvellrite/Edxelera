"use client";

import { Moon, Sun } from "@/components/icons/modified";
import { useTheme } from "@/hooks/useTheme";

const ThemeTogglerComponent = () => {
   const { theme, mounted, toggleTheme } = useTheme();
   const isDark = theme === "dark";

   const onToggleTheme = () => {
      toggleTheme(isDark ? "light" : "dark");
   };

   if (!mounted) {
      return null;
   }

   return (
      <div className="hidden items-center md:border-l md:border-border/60 md:pl-4 lg:flex">
         <div className="flex items-center gap-2 rounded-2xl border border-primary-300/35 bg-[var(--surface-overlay)] px-2 py-1.5 shadow-[var(--shadow-soft)] backdrop-blur-md">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/85">
               Theme
            </span>

            <button
               aria-checked={isDark}
               aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
               className={`group relative h-8 w-16 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
                  isDark
                     ? "border-primary/55 bg-[linear-gradient(145deg,rgba(var(--primary-bare),0.22),rgba(77,107,255,0.18))]"
                     : "border-primary-200/60 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface-raised)_82%,white_18%),color-mix(in_srgb,var(--surface-tint-blue)_76%,transparent))]"
               }`}
               onClick={onToggleTheme}
               role="switch"
               type="button"
            >
               <span
                  aria-hidden
                  className={`absolute top-0.5 flex h-7 w-7 items-center justify-center rounded-full shadow-[0_8px_16px_-10px_rgba(var(--primary-bare),0.85)] transition-transform duration-300 ${
                     isDark
                        ? "translate-x-[2.05rem] bg-primary text-white"
                        : "translate-x-0.5 bg-primary text-white"
                  }`}
               >
                  {isDark ? <Moon /> : <Sun />}
               </span>
            </button>

            <span className="min-w-[3rem] text-xs font-medium text-text-default">
               {isDark ? "Dark" : "Light"}
            </span>
         </div>
      </div>
   );
};

export default ThemeTogglerComponent;
