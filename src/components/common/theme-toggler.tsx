"use client";

import { Moon, Sun } from "@/components/icons/modified";
import { useTheme } from "@/hooks/useTheme";

const ThemeTogglerComponent = () => {
   const { theme, toggleTheme } = useTheme();
   const isDark = theme === "dark";

   const onToggleTheme = () => {
      toggleTheme(isDark ? "light" : "dark");
   };

   return (
      <div className="flex items-center md:hidden md:border-l md:border-border/60 md:pl-4 lg:flex">
         <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-muted/50 px-2 py-1.5 shadow-sm backdrop-blur">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
               Theme
            </span>

            <button
               aria-checked={isDark}
               aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
               className={`group relative h-8 w-16 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  isDark
                     ? "border-primary/50 bg-primary/20"
                     : "border-border/80 bg-background"
               }`}
               onClick={onToggleTheme}
               role="switch"
               type="button"
            >
               <span
                  aria-hidden
                  className={`absolute top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-md transition-transform duration-300 ${
                     isDark ? "translate-x-[2.05rem]" : "translate-x-0.5"
                  }`}
               >
                  {isDark ? <Moon /> : <Sun />}
               </span>
            </button>

            <span className="min-w-[3rem] text-xs font-medium text-foreground/85">
               {isDark ? "Dark" : "Light"}
            </span>
         </div>
      </div>
   );
};

export default ThemeTogglerComponent;
