"use client"
import { useTheme } from '@/app/hooks/useTheme'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ReactSVG } from 'react-svg'

const Header: React.FC = () => {
  const pathname = usePathname()
  
  // const activeLink = 'text-primary font-bold'
  
  const home = pathname === '/home'
  const explore = pathname === '/home/explore'
  const myCourses = pathname === '/home/my-courses'
  const community = pathname === '/home/community'
  const myProfile = pathname === '/home/my-profile'
  const settings = pathname === '/home/settings'

  const { theme, toggleTheme } = useTheme();

  console.log(theme)

  return (
    <header className='flex items-center justify-between px-5 h-24 w-full text-neutral-700'>
      <div className={`${ myCourses || community || myProfile || settings ? 'md:hidden' : 'md:flex'} hidden md:flex items-center gap-3 border-2 border-neutral-500 w-1/3 h-12 p-2 rounded-full`}>
        <ReactSVG src="/icons/search-outline.svg" width={25} height={25} />
        <input type="search" placeholder='Search for Courses' className='w-full border-none outline-none' />
      </div>
      
      <p className='hidden md:flex text-4xl font-bold text-neutral-900'>{
        home ? '' :
        explore ? '':
        myCourses ? 'My Courses':
        community ? 'Community':
        myProfile ? 'My Profile':
        settings ? 'Settings' : ''
      }</p>

      <div className='flex gap-2 items-center w-full md:w-auto'>
        <div className='flex flex-row-reverse md:flex-row justify-between md:justify-normal gap-3 items-center w-full'>
          <ReactSVG src="/icons/notification.svg" width={25} height={25} className='hover:cursor-pointer' />
          <div className='flex flex-row-reverse md:flex-row gap-3 items-center md:border-l-2 border-neutral-100 md:px-3'>
            <div>
              <p className='flex md:hidden text-sm text-neutral-600'>Good Morning</p>
              <p className='font-semibold text-neutral-900'>Nkechi Johnson</p>
              <p className='hidden md:flex text-neutral-600'>nkechij112@gmail.com</p>
            </div>
            <Image src="/icons/photo.png" alt="user image" className='h-10 w-10 rounded-full' width={25} height={25} />
            <ReactSVG src="/icons/dropdown.svg" width={25} height={25} className='hidden md:flex' />
          </div>
        </div>

        <div className='hidden md:flex gap-2 border border-neutral-500 rounded-full p-1'>
          <ReactSVG src="/icons/sun.svg" width={5} height={5} className='bg-primary rounded-full p-1 hover:cursor-pointer' onClick={() => toggleTheme("light")} />
          <ReactSVG src="/icons/moon-outline.svg" width={5} height={5} className='bg-primary rounded-full p-1 hover:cursor-pointer' onClick={() => toggleTheme("dark")} />
        </div>
      </div>
    </header>
  )
}

export default Header