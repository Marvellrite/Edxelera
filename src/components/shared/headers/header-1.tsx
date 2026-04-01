'use client'

import SearchBar from '@/components/data/nav-search-bar';
import Image from "next/image";
import { useStudentSession } from "@/hooks/useStudentSession";
import toTitleCase from "@/utils/toTitleCase";
import { ThemeToggler as ThemeTogglerComponent } from "@/components/common";
import NotificationBellButton from "@/components/features/cart/notification-bell-button";

const Header = () => {
    const { user } = useStudentSession();
    console.log(user)

    const displayName = user?.fullname || 'Student';

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
     <header
         className="bg-background/95 bg-surface-home px-4 py-5 h-fit w-full text-neutral-700 flex flex-col gap-6 lg:gap-0 mt-23 lg:mt-0"
      >

      <div className='fixed z-20 flex items-center justify-between bg-surface-home lg:static w-[calc(100vw-40px)] md:w-[calc(100vw-200px)] lg:w-full top-0 left-1/2 md:left-0  -translate-x-1/2 md:translate-x-50 lg:translate-x-0 lg:py-0 lg:px-0 py-5 px-4'>

         <div className=' basis-1/2 grow'>
         {/* First half of the header */}

            <div className=' flex gap-2 items-center'>  
            <Image
               src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340563/repo-images/public/icons/photo.png"
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
                   flex flex-row-reverse md:flex-row  gap-3 items-center lg:w-full  justify-end lg:justify-normal`}
            >

            <div className='lg:flex hidden grow '>

            {/* Search component */}

            <SearchBar/>

            </div>

            <div className=' flex items-center md:gap-0 lg:gap-2 '>

               {/* Bell + theme toggler component */}
         
               <NotificationBellButton />

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
   );
}

export default Header

