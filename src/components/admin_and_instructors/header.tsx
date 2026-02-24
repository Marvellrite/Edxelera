"use client"
import { Moon, MoonOutline, Bell } from '@/components/icons/modified'
import Image from 'next/image'
import { ReactSVG } from 'react-svg'

const Header = () => {
  return (
    <header className='bg-white h-full w-full col-span-12 row-span-2 rounded-2xl py-4 px-6 flex justify-between items-center shadow-premium-md border border-neutral-100'>
        <Image src="/logo.png" alt='logo' height={30} width={200} placeholder='empty' quality={100} className='object-contain h-auto' />

        <section className='flex items-center gap-6'>
            <div className='flex gap-4 items-center'>
                <div className='flex items-center gap-3'>
                    <Image src="/photo.png" alt='user avatar' height={100} width={100} className='h-11 w-11 rounded-full object-cover border-2 border-neutral-100' />
                </div>

                <div className='border-r border-neutral-200 pr-4'>
                    <p className='text-neutral-600 text-xs font-medium uppercase tracking-wider'>Good morning</p>
                    <p className='font-semibold text-neutral-900'>David David</p>
                </div>

                <button className='text-primary hover:text-primary-700 transition-colors p-2 hover:bg-primary-50 rounded-lg'>
                    <Bell />
                </button>

                <div className="hidden md:flex gap-2 border border-neutral-200 rounded-full p-1 focus-within:ring-2 focus-within:ring-primary-300 transition-all duration-300 items-center bg-neutral-50">
                     <ReactSVG
                        src="/icons/sun.svg"
                        width={5}
                        height={5}
                        className="bg-primary rounded-full p-1 hover:cursor-pointer text-white"
                        // onClick={() => toggleTheme('light')}
                     />
                     <MoonOutline className='text-neutral-600 hover:text-neutral-900 transition-colors'/>
                  </div>
            </div>
        </section>
    </header>
  )
}

export default Header
