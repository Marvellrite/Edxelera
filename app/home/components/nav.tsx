"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ReactSVG } from 'react-svg'

export const Sidebar: React.FC = () => {
  const pathname = usePathname()

  const activeLink = 'text-primary font-bold'

  const home = pathname === '/home'
  const explore = pathname === '/home/explore'
  const myCourses = pathname === '/home/my-courses'
  const community = pathname === '/home/community'
  const myProfile = pathname === '/home/my-profile'
  const settings = pathname === '/home/settings'

  return (
    <aside className='col-span-2 hidden md:block border-r-2 border-neutral-100 h-screen px-5 text-neutral-700'>
      <Image src="/assets/logo.webp" alt="tbc-logo" width={100} height={100} />

      <nav className='grid gap-8 mt-5'>
        <div className='flex justify-between'>
          <Link href='/home' className={`flex gap-5 hover:cursor-pointer ${home ? activeLink : ''}`}>
            <ReactSVG src={`/icons/home${home ? '' : '-outline'}.svg`} width={25} height={25} />
            <span>Home</span>
          </Link>

          <ReactSVG src='/icons/toggle.svg' className='hover:cursor-pointer' width={25} height={25} />
        </div>
        <Link href='/home/explore' className={`flex gap-5 hover:cursor-pointer ${explore ? activeLink : ''}`}>
          <ReactSVG src={`/icons/search${explore ? '' : '-outline'}.svg`} width={25} height={25} />
          <span>Explore</span>
        </Link>
        <Link href='/home/my-courses' className={`flex gap-5 hover:cursor-pointer ${myCourses ? activeLink : ''}`}>
          <ReactSVG src={`/icons/book${myCourses ? '' : '-outline'}.svg`} width={25} height={25} />
          <span>My Courses</span>
        </Link>
        <Link href='/home/community' className={`flex gap-5 hover:cursor-pointer ${community ? activeLink : ''}`}>
          <ReactSVG src={`/icons/people${community ? '' : '-outline'}.svg`} width={25} height={25} />
          <span>Community</span>
        </Link>
        <Link href='/home/my-profile' className={`flex gap-5 hover:cursor-pointer ${myProfile ? activeLink : ''}`}>
          <ReactSVG src={`/icons/user${myProfile ? '' : '-outline'}.svg`} width={25} height={25}/>
          <span>My Profile</span>
        </Link>
        <Link href='/home/settings' className={`flex gap-5 hover:cursor-pointer ${settings ? activeLink : ''}`}>
          <ReactSVG src={`/icons/setting${settings ? '' : '-outline'}.svg`} width={25} height={25} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

// THIS TAB IS THE MOBILE TABS
export const Tabs: React.FC = () => {
    const pathname = usePathname()

    const activeLink = '*:text-primary *:font-bold'

    const home = pathname === '/home'
    const explore = pathname === '/home/explore'
    const myCourses = pathname === '/home/my-courses'
    const community = pathname === '/home/community'
    const myProfile = pathname === '/home/my-profile'
    
    return (
        <aside className='grid md:hidden grid-cols-5 h-20 items-center justify-center *:flex *:flex-col *:justify-center *:items-center *:text-tab border-t border-neutral-100'>
          <Link href="/home" className={`flex gap-1 hover:cursor-pointer ${home ? activeLink : '*:text-neutral-700'}`}>
            <ReactSVG src={`/icons/home${home ? '' : '-outline'}.svg`} width={25} height={25} />
            <span className='text-nowrap'>Home</span>
          </Link>
          <Link href="/home/explore" className={`flex gap-1 hover:cursor-pointer ${explore ? activeLink : '*:text-neutral-700'}`}>
            <ReactSVG src={`/icons/search${explore ? '' : '-outline'}.svg`} width={25} height={25} />
            <span className='text-nowrap'>Explore</span>
          </Link>
          <Link href="/home/my-courses" className={`flex gap-1 hover:cursor-pointer ${myCourses ? activeLink : '*:text-neutral-700'}`}>
            <ReactSVG src={`/icons/book${myCourses ? '' : '-outline'}.svg`} width={25} height={25} />
            <span className='text-nowrap'>My Courses</span>
          </Link>
          <Link href="/home/community" className={`flex gap-1 hover:cursor-pointer ${community ? activeLink : '*:text-neutral-700'}`}>
            <ReactSVG src={`/icons/people${community ? '' : '-outline'}.svg`} width={25} height={25} />
            <span className='text-nowrap'>Community</span>
          </Link>
          <Link href="/home/my-profile" className={`flex gap-1 hover:cursor-pointer ${myProfile ? activeLink : '*:text-neutral-700'}`}>
            <ReactSVG src={`/icons/user${myProfile ? '' : '-outline'}.svg`} width={25} height={25}/>
            <span className='text-nowrap'>Profile</span>
          </Link>
        </aside>
    )
}