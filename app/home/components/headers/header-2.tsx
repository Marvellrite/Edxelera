import SearchBar from "../search-bar";
import Image from "next/image";
import { Notification, ArrowDown, Sort } from "@/components/icons/modified";
import { useTheme } from "@/app/hooks/useTheme";
import { } from "@/components/icons/modified";


const Header = () => {

       const { theme, toggleTheme } = useTheme();

  return (
      <header className=" px-4 pt-5 h-fit w-full text-neutral-700 ">

         <div className='flex items-center justify-between'>

         <div className=' basis-1/2 grow'>
         {/* First half of the header */}

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
   

      </header>
   );
}

export default Header