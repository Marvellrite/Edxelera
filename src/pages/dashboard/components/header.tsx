import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='flex items-center justify-between px-5 h-24 w-full'>
      <div className='flex items-center gap-3 border-2 w-1/3 h-12 p-2 rounded-full'>
        <img src="/icons/search-outline.svg" alt="search" />
        <input type="search" placeholder='Search for Courses' className='w-full border-none outline-none' />
      </div>

      <div className='flex gap-2 items-center'>
        <div className='flex gap-3 items-center'>
          <img src="/icons/notification.svg" alt="notification" />
          <div className='flex gap-3 items-center border-l border-neutral-50 px-3'>
            <div>
              <p className='font-semibold'>Nkechi Johnson</p>
              <p>nkechij112@gmail.com</p>
            </div>
            <img src="/icons/photo.png" alt="user image" className='h-10 w-10 rounded-full' />
            <img src="/icons/dropdown.svg" alt="dropdown" />
          </div>
        </div>

        <div className='flex gap-2 border rounded-full p-1'>
          <img src="/public/icons/sun.svg" alt="light-mode" className='bg-primary rounded-full h-7 w-7 p-1.5' />
          <img src="/public/icons/moon-outline.svg" alt="dark-mode" className='rounded-full h-7 w-7 p-1.5 text-black' />
        </div>
      </div>
    </header>
  )
}

export default Header