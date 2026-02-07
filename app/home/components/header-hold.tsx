'use client';
import { useTheme } from '@/app/hooks/useTheme';
// import { useTheme } from '@/app/hooks/useTheme'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ReactSVG } from 'react-svg';

const Header: React.FC = () => {
   const pathname = usePathname();

   // const activeLink = 'text-primary font-bold'

   const home = pathname === '/home';
   const explore = pathname === '/home/explore';
   const myCourses = pathname === '/home/my-courses';
   const community = pathname === '/home/community';
   const myProfile = pathname === '/home/my-profile';
   const settings = pathname === '/home/settings';

   const { theme, toggleTheme } = useTheme();

   console.log(theme);

   return (
      <header className="flex items-center justify-between px-5 pt-5 h-fit w-full text-neutral-700">

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

         <p className="flex text-xl lg:text-5xl font-bold text-neutral-900 mx-auto lg:mx-0">
            {home
               ? ''
               : explore
                 ? ''
                 : myCourses
                   ? 'My Courses'
                   : community
                     ? 'Community'
                     : myProfile
                       ? 'My Profile'
                       : settings
                         ? 'Settings'
                         : ''}
         </p>

         <div
            className={`${!home && !explore ? 'hidden' : ''} grid lg:flex gap-2 items-center w-full md:w-auto`}
         >
            <div
               className={`${!home ? 'hidden md:flex' : ''} flex flex-row-reverse md:flex-row justify-between md:justify-normal gap-3 items-center w-full`}
            >

                <div
            className={`${myCourses || community || myProfile || settings ? 'md:hidden' : 'md:flex'} hidden md:flex items-center gap-3 bg-white w-1/3 h-14 p-2 rounded-full focus-within:ring-primary/60 ring-2 ring-transparent `}
         >
            <ReactSVG src="/icons/search-outline.svg" width={25} height={25} />
            <input
               type="search"
               placeholder="Search for Courses"
               className="w-full border-none outline-none"
            />
         </div>

               <ReactSVG
                  src="/icons/notification.svg"
                  width={25}
                  height={25}
                  className="hover:cursor-pointer"
               />
               <div className="flex flex-row-reverse md:flex-row gap-3 items-center md:border-l-2 border-neutral-100 md:px-3">
                 
                  {/* <ReactSVG
                     src="/icons/dropdown.svg"
                     width={25}
                     height={25}
                     className="hidden md:flex"
                  /> */}
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
