"use client"
import { Moon, MoonOutline, Bell } from '@/components/icons/modified'
import Image from 'next/image'
import { ReactSVG } from 'react-svg'

const Header = () => {
  return (
    <header className='bg-white w-full col-span-1 md:col-span-12 md:row-span-2 rounded-2xl py-2 px-3 md:px-4 flex justify-between items-center gap-3'>
        <Image src="/logo.png" alt='logo' height={30} width={200} placeholder='empty' quality={100} className='object-contain h-auto w-32 sm:w-40 md:w-auto' />

        <section className='flex items-center gap-2 md:gap-5'>
            

            <div className='flex gap-2 md:gap-3 items-center'>

                <div className='flex items-center gap-3'>
                    <Image src="/photo.png" alt='logo' height={100} width={100} className='h-10 w-10 object-contain' />
                    {/* <ReactSVG src='/icons/dropdown.svg' /> */}
                </div>

                <div className='hidden sm:block'>
                    <p className=' text-neutral-700 text-[14px] font-light'>Good morning</p>
                    <p className=' font-medium text-black'>David David</p>
                </div>

                <div className='border-r px-3 text-primary'>
                    <Bell />
                </div>

                <div className="hidden md:flex gap-2 border border-neutral-500 rounded-full p-1 focus-within:ring-2 focus-within:text-neutral-300 transition-all duration-300 items-center ">
                     <ReactSVG
                        src="/icons/sun.svg"
                        width={5}
                        height={5}
                        className="bg-primary rounded-full p-1 hover:cursor-pointer"
                        // onClick={() => toggleTheme('light')}
                     />
                     <MoonOutline className=' text-neutral-700'/>
                  </div>
            </div>
            
        </section>
    </header>
  )
}

export default Header
