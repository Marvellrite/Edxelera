'use client';
import { useTheme } from '@/hooks/useTheme';
// import { useTheme } from '@/app/hooks/useTheme'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ReactSVG } from 'react-svg';

interface HeaderPropsType {
   children?: React.ReactNode;
}

const Header = ({ children }: HeaderPropsType) => {
   const pathname = usePathname();

   // const activeLink = 'text-primary font-bold'

   const home = pathname === '/home';
   const explore = pathname === '/home/explore';
   const myCourses = pathname === '/home/my-courses';
   const community = pathname === '/home/community';
   const myProfile = pathname === '/home/my-profile';
   const settings = pathname === '/home/settings';

   const { theme, toggleTheme } = useTheme();

   return (
      <header className="flex items-center justify-between max-md:px-4 px-5 pt-5 h-fit w-full text-neutral-700">
         <div className="flex text-xl lg:text-5xl font-bold text-neutral-900 mx-auto lg:mx-0 gap-x-5 grow shrink">
            <button className=" hover:bg-neutral-300 rounded-[500px]">
               <ReactSVG src="/icons/back-arrow.svg" />
            </button>

            {children}
         </div>

         <div
            className={`${!home && !explore ? 'hidden' : ''} grid lg:flex gap-2 items-center w-full md:w-auto`}
         >
            <div
               className={`${!home ? 'hidden md:flex' : ''} flex flex-row-reverse md:flex-row justify-between md:justify-normal gap-3 items-center w-full`}
            >
               <ReactSVG
                  src="/icons/notification.svg"
                  width={25}
                  height={25}
                  className="hover:cursor-pointer"
               />
               <div className="flex flex-row-reverse md:flex-row gap-3 items-center md:border-l-2 border-neutral-100 md:px-3">
                  <div>
                     <p className="flex md:hidden text-sm text-neutral-600">
                        Good Morning
                     </p>
                     <p className="font-medium text-neutral-900">
                        Nkechi Johnson
                     </p>
                     <p className="hidden md:flex text-neutral-600">
                        nkechij112@gmail.com
                     </p>
                  </div>
                  <Image
                     src="/icons/photo.png"
                     alt="user image"
                     className="h-10 w-10 rounded-full"
                     width={25}
                     height={25}
                  />
                  <ReactSVG
                     src="/icons/dropdown.svg"
                     width={25}
                     height={25}
                     className="hidden md:flex"
                  />
                  <div className="hidden md:flex gap-2 border border-neutral-500 rounded-full p-1 focus-within:ring-2 focus-within:text-neutral-300 transition-all duration-300 ">
                     <ReactSVG
                        src="/icons/sun.svg"
                        width={5}
                        height={5}
                        className="bg-primary rounded-full p-1 hover:cursor-pointer"
                        onClick={() => toggleTheme('light')}
                     />
                     <ReactSVG
                        src="/icons/moon-outline.svg"
                        width={5}
                        height={5}
                        className=" rounded-full p-1 hover:cursor-pointer"
                        onClick={() => toggleTheme('dark')}
                     />
                  </div>
               </div>
            </div>

            <div
               className={`${explore || home ? 'flex md:hidden' : 'hidden'} items-center gap-3 border-2 border-neutral-500 w-full h-12 p-2 rounded-full focus-within:ring-2 focus-within:text-neutral-300 transition-all duration-300 `}
            >
               <ReactSVG
                  src="/icons/search-outline.svg"
                  width={25}
                  height={25}
               />
               <input
                  type="search"
                  placeholder="Search for courses"
                  className="w-full border-none outline-none"
               />
            </div>

            {/* <div className="hidden md:flex gap-2 border border-neutral-500 rounded-full p-1 focus-within:ring-2 focus-within:text-neutral-300 transition-all duration-300 ">
               <ReactSVG
                  src="/icons/sun.svg"
                  width={5}
                  height={5}
                  className="bg-primary rounded-full p-1 hover:cursor-pointer"
                  onClick={() => toggleTheme('light')}
               />
               <ReactSVG
                  src="/icons/moon-outline.svg"
                  width={5}
                  height={5}
                  className="bg-primary rounded-full p-1 hover:cursor-pointer"
                  onClick={() => toggleTheme('dark')}
               />
            </div> */}
         </div>
      </header>
   );
};

export default Header;
