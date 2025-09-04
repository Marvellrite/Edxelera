import React from 'react'

export const Sidebar: React.FC = () => {
  return (
    <aside className='col-span-2 hidden md:block border-r-2 border-neutral-100 h-screen px-5'>
      <img src="/assets/logo.webp" alt="tbc-logo" className='w-1/2' />

      <ul className='grid gap-8 mt-5'>
        <li className='flex justify-between'>
          <p className='flex gap-5 hover:cursor-pointer'>
            <img src="/icons/home-outline.svg" alt="home" />
            <span>Home</span>
          </p>
        </li>
        <li className='flex gap-5 hover:cursor-pointer'>
          <img src="/icons/search-outline.svg" alt="explore" />
          <span>Explore</span>
        </li>
        <li className='flex gap-5 hover:cursor-pointer'>
          <img src="/icons/people-outline.svg" alt="community" />
          <span>Community</span>
        </li>
        <li className='flex gap-5 hover:cursor-pointer'>
          <img src="/public/icons/user-outline.svg" alt="profile" />
          <span>My Profile</span>
        </li>
        <li className='flex gap-5 hover:cursor-pointer'>
          <img src="/public/icons/setting-outline.svg" alt="setting" />
          <span>Settings</span>
        </li>
      </ul>
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