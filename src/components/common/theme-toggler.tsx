import React from 'react'
import { Sun } from '../admin_and_instructors/icons/modified'
import { MoonOutline } from '../icons/modified'
import { useTheme } from '@/hooks/useTheme';

const ThemeTogglerComponent = () => {

      const { toggleTheme } = useTheme();

  return (
     <div className="flex  gap-3 items-center md:border-l-2 border-neutral-100 md:px-4 md:hidden lg:flex">
                     
                      
        <div className="hidden md:flex gap-2 border border-neutral-500 rounded-full p-1 focus-within:ring-2 focus-within:text-neutral-100 transition-all duration-300 px-2.5">
            {/* Theme toggler component */}
            <button className="bg-primary rounded-full p-1 hover:cursor-pointer"
                onClick={() => toggleTheme('light')}>
            <Sun/>
            </button>
            <button className=" rounded-full p-1 hover:cursor-pointer" onClick={() => toggleTheme('dark')}>
            <MoonOutline/>       
            </button>
        </div>
    </div>
  )
}

export default ThemeTogglerComponent