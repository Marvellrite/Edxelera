'use client';

import Image from "next/image";
import { Bell, SearchOutline } from "@/components/icons/modified";
import toTitleCase from "@/utils/toTitleCase";
import { useCurrentUserSession } from '@/features/auth/me/hooks';
import { ThemeToggler as ThemeTogglerComponent } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Course_status } from "@/types/my-courses/course-status";
import { useMyCoursesActiveCategoryStore } from "@/stores";
import SearchBar from "@/components/data/nav-search-bar";
import useFixedAnchoredElement from "@/hooks/useFixedAnchoredElement";


const Header = () => {

           const { user } = useCurrentUserSession();
           console.log(user)
       
           const displayName = user?.fullname || 'Student';
       
           const hour = new Date().getHours();
           const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
           const activeTab = useMyCoursesActiveCategoryStore((state) => state.activeCategory);
           const setActiveTab = useMyCoursesActiveCategoryStore((state) => state.setActiveCategory);
           const { anchorRef, fixedRef, fixedStyle, spacerHeight } = useFixedAnchoredElement<HTMLElement>();

  return (
      <div ref={anchorRef}>
      <div aria-hidden style={{ height: spacerHeight }} />
      <header
        ref={fixedRef}
        style={fixedStyle}
        className="bg-background/95 backdrop-blur py-5 h-fit w-full text-neutral-700 "
      >

        <div className=" space-y-7.5">

             {/* TODO: Make only top half of the header fixed */}
            <div className='hidden md:flex '>

                    {/* Top half of the navbar */}

                    <h1 className=' font-medium text-[40px] text-neutral-900 grow basis-1/2'>My Courses</h1>

                    <div className=" flex justify-end w-full gap-x-5 grow basis-1/2">
                        
                        <div className=' flex gap-3 items-center ms-3'>  
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
                
                
                        {/* Notification + theme toggler component */}
                        <button className="p-0">
                        <Bell className='text-primary' />
                        </button>   
                        
                        <ThemeTogglerComponent/>


                    </div>
            </div>



            <div className='flex items-center justify-between'>
            {/* Bottom Half of the navbar */}

            <div className="flex justify-between h-12 items-center w-full">
            <div className=" flex gap-3 items-center">
               {['All', 'Ongoing', 'Completed'].map((tab, index) => (
                  <Button
                     key={index}
                     className={` border  rounded-[500px] h-full  py-3 px-4 font-normal  ${activeTab === tab ? 'border-primary text-primary' : 'border-neutral-500 text-neutral-600'}`}
                     variant={'outline'}
                     onClick={() => setActiveTab(tab as Course_status)}
                  >
                     {tab}
                  </Button>
               ))}
            </div>
            <div className=" basis-[50%] max-w-115.75">
               {' '}
               <Button
                  className=" md:hidden hover:text-white float-right"
                  variant={'ghost'}
               >
                  <SearchOutline
                     width={25}
                     height={25}
                  />
               </Button>
               <div
                  className='hidden md:block'
               >
                  <SearchBar/>
               </div>
            </div>
         </div>
            </div>
        </div>

   

      </header>
      </div>
   );
}

export default Header
