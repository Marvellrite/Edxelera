'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import * as Icons from '@/components/icons/modified';
import { useSidebar } from '../context/sidebar-context';
import { cn } from '@/lib/utils';

const IconsMap = Icons as Record<string, React.ComponentType<{ width: number; height: number, className?:string }>>;

/**
 * Sidebar navigation component for the main application layout.
 * 
 * Renders a collapsible sidebar with navigation links including Home, Explore,
 * My Courses, Community, My Profile, and Settings. The sidebar can be toggled
 * between expanded (200-291px) and collapsed (80px) states.
 * 
 * @component
 * @returns {React.ReactElement} A responsive sidebar with icon-based navigation
 * 
 * @remarks
 * - Only visible on medium screens and above (md breakpoint)
 * - Uses dynamic icon switching based on the active route
 * - Icons object must be a record/object with string keys corresponding to icon names
 * - The Icons object structure should resemble: `{ Home: ComponentA, HomeOutline: ComponentB, ... }`
 * - Icons are accessed via computed property access (Icons[iconName]) using string keys
 * 
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
export const Sidebar: React.FC = () => {
   const pathname = usePathname();
   const activeLink = 'text-primary font-bold';
   const { isOpen, toggleSidebar } = useSidebar();
   const links = [
      {
         href: '/home',
         label: 'Home',
         icon: 'Home',
         outline: 'HomeOutline',
      },
      {
         href: '/home/explore',
         label: 'Explore',
         icon: 'Search',
         outline: 'SearchOutline',
      },
      {
         href: '/home/my-courses',
         label: 'My Courses',
         icon: 'Book',
         outline: 'BookOutline',
      },
      {
         href: '/home/community',
         label: 'Community',
         icon: 'People',
         outline: 'PeopleOutline',
      },
      {
         href: '/home/my-profile',
         label: 'My Profile',
         icon: 'User',
         outline: 'UserOutline',
      },
      {
         href: '/home/settings',
         label: 'Settings',
         icon: 'Setting',
         outline: 'SettingOutline',
      },
   ];

   const [showToggleButton, setShowToggleButton] = useState(false)

   return (
      <aside className={`col-span-2 hidden md:block border-r border-neutral-100 h-screen px-5 text-neutral space-y-8.5 overflow-x-hidden bg-white shadow-premium-sm ${isOpen ? 'md:w-50 lg:w-67.5' : 'md:w-18 lg:w-18'} transition-all duration-300`}> 
      <div className={cn(' flex justify-between pt-5 gap-0 *:inline-block transition-all duration-600', isOpen?'scale-x-100':'scale-x-[20px]')}>

         <div onMouseEnter={()=>{if(!isOpen){
            setShowToggleButton(true)
         }}}
         onMouseLeave={()=>{if(!isOpen){
            setShowToggleButton(false)
         }}}>
            <div className="relative">
         <Image
            src="/assets/logo-submark-primary.png"
            loading="eager"
            alt="tbc-logo"
            width={382}
            height={300}
            className={cn(` w-7.5 aspect-191/150 `, showToggleButton ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto')}
         />

         <button
                  type="button"
                  aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                  onClick={()=>{
                     setShowToggleButton(false)
                     toggleSidebar()}}
                  className={cn("absolute top-0 left-0 hover:cursor-pointer bg-transparent border-none p-0 translate-x-0.5", showToggleButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}
               >
                  {React.createElement(IconsMap['Toggle'], { width: 25, height: 25 })}
               </button>
            </div>
         </div>

           <button
                  type="button"
                  aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                  onClick={toggleSidebar}
                  className={cn("hover:cursor-pointer bg-transparent border-none p-0 transition-all duration-600", isOpen?'opacity-100 w-6.25':'opacity-0 w-0 pointer-events-none')}
               >
                  {React.createElement(IconsMap['Toggle'], { width: 25, height: 25 })}
               </button>

      </div>

         <nav className="grid gap-8 ">
            <div className="flex justify-between items-center">
               <Link
                  href={links[0].href}
                  className={cn(`flex gap-3 hover:cursor-pointer items-center duration-300 transition-all rounded-lg px-3 py-2 font-medium text-sm ${pathname === links[0].href ? 'bg-primary text-white shadow-premium-sm' : 'text-neutral-700 hover:bg-neutral-50'}`, isOpen?'gap-3':'gap-0 justify-center')}
               >
                  {React.createElement(
                     IconsMap[pathname === links[0].href ? links[0].icon : links[0].outline],
                     { width: 22, height: 22, className: 'flex-shrink-0' }
                  )}
                  <span className={cn('duration-300 transition-all whitespace-nowrap', isOpen?' opacity-100':' opacity-0 w-0')}>{links[0].label}</span>
               </Link>

             
            </div>
            {links.slice(1).map((link) => (
               <Link
                  key={link.href}
                  href={link.href}
                  className={cn('flex gap-3 hover:cursor-pointer items-center duration-300 transition-all rounded-lg px-3 py-2 font-medium text-sm', pathname === link.href ? 'bg-primary text-white shadow-premium-sm' : 'text-neutral-700 hover:bg-neutral-50', isOpen?'gap-3':'gap-0 justify-center')}
               >
                  {React.createElement(
                     IconsMap[pathname === link.href ? link.icon : link.outline],
                     { width: 22, height: 22, className: 'flex-shrink-0' }
                  )}
                   <span className={cn('duration-300 transition-all text-nowrap', isOpen?' opacity-100':' opacity-0 w-0')}>{link.label}</span>
               </Link>
            ))}
         </nav>
      </aside>
   );
};

// THIS TAB IS THE MOBILE TABS
export const Tabs: React.FC = () => {
   const pathname = usePathname();
   const activeLink = '*:text-primary *:font-bold';
   const isCourseOverviewPage = /^\/home\/explore\/overview\/\d+$/.test(pathname);
   const links = [
      {
         href: '/home',
         label: 'Home',
         icon: 'Home',
         outline: 'HomeOutline',
      },
      {
         href: '/home/explore',
         label: 'Explore',
         icon: 'Search',
         outline: 'SearchOutline',
      },
      {
         href: '/home/my-courses',
         label: 'My Courses',
         icon: 'Book',
         outline: 'BookOutline',
      },
      {
         href: '/home/community',
         label: 'Community',
         icon: 'People',
         outline: 'PeopleOutline',
      },
      {
         href: '/home/my-profile',
         label: 'Profile',
         icon: 'User',
         outline: 'UserOutline',
      },
   ];

   return (
      <footer className={` ${isCourseOverviewPage && "hidden"} grid md:hidden grid-cols-5 h-20 items-center justify-center border-t border-neutral-100 bg-white shadow-premium-md `}>
         {links.map((link) => (
            <Link
               key={link.href}
               href={link.href}
               className={`flex flex-col gap-1 justify-center items-center text-center py-2 px-1 rounded-lg transition-all duration-200 ${pathname === link.href ? 'text-primary font-bold bg-primary-50 shadow-premium-sm' : 'text-neutral-700 hover:bg-neutral-50'}`}
            >
               {React.createElement(
                  IconsMap[pathname === link.href ? link.icon : link.outline],
                  { width: 24, height: 24 }
               )}
               <span className="text-xs font-medium text-nowrap">{link.label}</span>
            </Link>
         ))}
      </footer>
   );
};
