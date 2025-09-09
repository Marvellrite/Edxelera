import React from 'react'
import { Link, useLocation } from 'react-router'

export const Sidebar: React.FC = () => {
  const location = useLocation()

  const activeLink = 'text-primary font-bold'

  const home = location.pathname === '/home'
  const explore = location.pathname === '/home/explore'
  const myCourses = location.pathname === '/home/my-courses'
  const community = location.pathname === '/home/community'
  const myProfile = location.pathname === '/home/my-profile'
  const settings = location.pathname === '/home/settings'

  return (
    <aside className='col-span-2 hidden md:block border-r-2 border-neutral-100 h-screen px-5'>
      <img src="/assets/logo.webp" alt="tbc-logo" className='w-1/2' />

      <nav className='grid gap-8 mt-5'>
        <div className='flex justify-between'>
          <Link to='/home' className={`flex gap-5 hover:cursor-pointer ${home ? activeLink : ''}`}>
            <img src={`/icons/home${home ? '' : '-outline'}.svg`} alt="home" />
            <span>Home</span>
          </Link>

          <img src='/icons/toggle.svg' alt="home" className='hover:cursor-pointer ' />
        </div>
        <Link to='explore' className={`flex gap-5 hover:cursor-pointer ${explore ? activeLink : ''}`}>
          <img src={`/icons/search${explore ? '' : '-outline'}.svg`} alt="explore" />
          <span>Explore</span>
        </Link>
        <Link to='my-courses' className={`flex gap-5 hover:cursor-pointer ${myCourses ? activeLink : ''}`}>
          <img src={`/icons/book${myCourses ? '' : '-outline'}.svg`} alt="my-courses" />
          <span>My Courses</span>
        </Link>
        <Link to='community' className={`flex gap-5 hover:cursor-pointer ${community ? activeLink : ''}`}>
          <img src={`/icons/people${community ? '' : '-outline'}.svg`} alt="community" />
          <span>Community</span>
        </Link>
        <Link to='my-profile' className={`flex gap-5 hover:cursor-pointer ${myProfile ? activeLink : ''}`}>
          <img src={`/icons/user${myProfile ? '' : '-outline'}.svg`} alt="profile" />
          <span>My Profile</span>
        </Link>
        <Link to='settings' className={`flex gap-5 hover:cursor-pointer ${settings ? activeLink : ''}`}>
          <img src={`/icons/setting${settings ? '' : '-outline'}.svg`} alt="setting" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

// THIS TAB IS THE MOBILE TABS
export const Tabs: React.FC = () => {
    return (
        <aside className='grid md:hidden grid-cols-5 bg-primary h-14 items-center *:flex *:justify-center'>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
        </aside>
    )
}