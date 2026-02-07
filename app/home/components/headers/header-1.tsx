import SearchBar from "../search-bar";
import Image from "next/image";
import { Notification } from "@/components/icons/modified";
import { useTheme } from "@/app/hooks/useTheme";
import { Sun, MoonOutline } from "@/components/icons/modified";


const Header = () => {

       const { theme, toggleTheme } = useTheme();

  return (
      <header className=" px-4 pt-5 h-fit w-full text-neutral-700 flex flex-col gap-6 lg:gap-0">

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
                  Good Morning
               </p>
               <p className="font-medium text-neutral-900">
                  Nkechi Johnson
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

               {/* Notification + theme toggler component */}

               <Notification className='text-primary' />

               <div className="flex  gap-3 items-center md:border-l-2 border-neutral-100 md:px-3 md:hidden lg:flex">
                 
                  
                  <div className="hidden md:flex gap-2 border border-neutral-500 rounded-full p-1 focus-within:ring-2 focus-within:text-neutral-100 transition-all duration-300 ">
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