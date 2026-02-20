import { SearchOutline } from '@/components/icons/modified'
import React from 'react'

const SearchBar = () => {
  return (
       <div
                className={` flex items-center gap-3 bg-white grow h-14 py-2 px-5 rounded-full focus-within:ring-primary/60 ring-2 ring-transparent text-[14px]  `}
             >
                {/* Search component */}
    
                <SearchOutline width={25} height={25} />
                <input
                   type="search"
                   placeholder="Search for Courses"
                   className="w-full border-none outline-none text-neutral-900 font-medium"
                />
             </div>
  )
}

export default SearchBar