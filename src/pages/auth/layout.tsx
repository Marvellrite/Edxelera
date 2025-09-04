import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout: React.FC = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-9 grid-rows-1 h-screen w-full relative'>
      <div className='relative hidden md:flex col-span-4'>
        <img src="/assets/auth.webp" alt="side image" className='w-full h-full' />
        <div className='absolute w-full h-full bg-gradient-to-b from-text/75 to-text/40'></div>
      </div>
      <div className='col-span-5 w-full'>
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout