'use client';

import SearchBar from "@/components/data/nav-search-bar";
import Image from "next/image";
import { Bell, ArrowDown, Sort,  } from "@/components/icons/modified";
import { useTheme } from "@/hooks/useTheme";
import { } from "@/components/icons/modified";
import toTitleCase from "@/utils/toTitleCase";
import { useStudentSession } from "@/hooks/useStudentSession";
import { ThemeToggler as ThemeTogglerComponent } from "@/components/common";
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
        className="bg-background/95 bg-surface-home py-5 h-fit w-full text-neutral-700 "
      >

        <div className=" space-y-7.5">


            <div className='hidden md:flex justify-between'>

                    {/* Top half of the navbar */}

                    <h1 className=' font-medium text-[40px] text-neutral-900'>Explore</h1>

                    <div className=" flex justify-end w-full gap-x-5">
                        
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
                
                
                        {/* Bell + theme toggler component */}
                        <button className="p-0">
                        <Bell className='text-primary' />
                        </button>   
                        
                        <ThemeTogglerComponent/>


                    </div>
            </div>



            <div className='flex items-center justify-between'>
            {/* Bottom Half of the navbar */}

            <div className=' basis-1/2 grow'>
            {/* First half of the bottom of the header */}

            <SearchBar/>

            </div>


            
            <div
                className={`basis-1/2 grow lg:justify-between justify-end hidden lg:block`}
            >
                {/* 2nd Half of the header */}
                <div className=" flex justify-end gap-2 w-full">
                    <button className=" bg-surface-foreground h-[56px] px-4 gap-1 flex items-center rounded-full">
                        <span>Category</span> <ArrowDown/>
                    </button>
                    <button className=" bg-surface-foreground h-[56px] px-4 gap-1 flex items-center rounded-full">
                        <span>Filter</span> <Sort/>
                    </button>
                </div>
            </div>
            </div>
        </div>

   

      </header>
      </div>
   );
}

export default Header
