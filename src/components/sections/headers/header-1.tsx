'use client'

import SearchBar from '@/components/data/nav-search-bar';
import Image from "next/image";
import { Bell } from "@/components/icons/modified";
import { useTheme } from "@/hooks/useTheme";
import { Sun, MoonOutline } from "@/components/icons/modified";
import { useStudentSession } from "@/hooks/useStudentSession";
import toTitleCase from "@/utils/toTitleCase";
import ThemeTogglerComponent from "@/components/common/theme-toggler";
import useFixedAnchoredElement from "@/hooks/useFixedAnchoredElement";

const Header = () => {
    const { user } = useStudentSession();
    const { toggleTheme } = useTheme();
    const { anchorRef, fixedRef, fixedStyle, spacerHeight } = useFixedAnchoredElement<HTMLElement>();
    console.log(user)

    const displayName = user?.fullname || 'Student';

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
      <div ref={anchorRef}>
      <div aria-hidden style={{ height: spacerHeight }} />
      <header
         ref={fixedRef}
         style={fixedStyle}
         className="bg-background/95 bg-surface-home px-4 py-5 h-fit w-full text-neutral-700 flex flex-col gap-6 lg:gap-0"
      >

         <div className='flex items-center justify-between'>

         <div className=' basis-1/2 grow'>
         {/* First half of the header */}

            <div className=' flex gap-2 items-center'>  
            <Image
               src="/icons/photo.png"
               alt="user image"
               className="h-10 w-10 rounded-full"
               width={25}
               height={25}
            />

            <div>
               <p className="hidden md:flex text-neutral-600">
                  {toTitleCase(greeting)}
               </p>
               <p className="font-medium text-neutral-900 ">
                  {toTitleCase(displayName)}
               </p>
            </div>
         </div>

         </div>


         
         <div
            className={`  flex gap-2 items-center basis-1/2 grow lg:justify-between justify-end`}
         >
            {/* 2nd Half of the header */}
            <div
               className={`
                   flex flex-row-reverse md:flex-row  gap-3 items-center w-full  `}
            >

            <div className='lg:flex hidden grow'>

            {/* Search component */}

            <SearchBar/>

            </div>

            <div className=' flex items-center md:gap-0 lg:gap-2'>

               {/* Bell + theme toggler component */}
         
               <button>

               <Bell className='text-primary' />
               </button>

                  <ThemeTogglerComponent/>

            </div>
            </div>
         </div>
         </div>

         <div className=' block lg:hidden'>
         {/* Search Bar to be displayed on screens less than lg size */}
            <SearchBar/>

         </div>
         
   

      </header>
      </div>
   );
}

export default Header
