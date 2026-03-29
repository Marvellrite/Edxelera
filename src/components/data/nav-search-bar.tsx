import { SearchOutline } from '@/components/icons/modified'
import { cn } from '@/lib/utils'
import React from 'react'

const SearchBar = () => {
  return (
       <div
                className={cn(`flex items-center gap-3 grow h-14 rounded-full bg-white px-5 py-2 text-[14px] ring-2 ring-transparent transition-[background-color,box-shadow,ring-color] duration-200 hover:bg-[rgba(255,255,255,0.98)] hover:ring-primary/20 focus-within:ring-primary/60 focus-within:hover:ring-primary/60`)}
             >
                {/* Search component */}
    
                <SearchOutline width={25} height={25} />
                <input
                   type="search"
                   placeholder="Search for Courses"
                   className="w-full border-none outline-none text-neutral-900 font-medium h-full"
                />
             </div>
  )
}

export default SearchBar
