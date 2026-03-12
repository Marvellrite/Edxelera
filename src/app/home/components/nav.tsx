'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import * as Icons from '@/components/icons/modified';

const IconsMap = Icons as Record<string, React.ComponentType<{ width: number; height: number; className?: string }>>;

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
      <footer className={` ${isCourseOverviewPage && 'hidden'} grid md:hidden grid-cols-5 h-20 items-center justify-center *:flex *:flex-col *:justify-center *:items-center *:text-tab border-t border-neutral-100 `}>
         {links.map((link) => (
            <Link
               key={link.href}
               href={link.href}
               className={`flex gap-1 hover:cursor-pointer items-center ${pathname === link.href ? activeLink : '*:text-neutral-700'}`}
            >
               {React.createElement(IconsMap[pathname === link.href ? link.icon : link.outline], { width: 25, height: 25 })}
               <span className="text-nowrap">{link.label}</span>
            </Link>
         ))}
      </footer>
   );
};
