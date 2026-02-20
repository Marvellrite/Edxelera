"use client"
import { Moon, MoonOutline, Notification } from '@/components/icons/modified'
import Image from 'next/image'
import { ReactSVG } from 'react-svg'

const Header = () => {
  return (
    <header className='bg-white h-full w-full col-span-12 row-span-2 rounded-2xl py-2 px-4 flex justify-between items-center'>
        <Image src="/logo.png" alt='logo' height={30} width={200} placeholder='empty' quality={100} className='object-contain h-auto' />

        <section className='flex items-center gap-5'>
            

            <div className='flex gap-3 items-center'>

                <div className='flex items-center gap-3'>
                    <Image src="/photo.png" alt='logo' height={100} width={100} className='h-10 w-10 object-contain' />
                    {/* <ReactSVG src='/icons/dropdown.svg' /> */}
                </div>

                <div>
                    <p className=' text-neutral-700 text-[14px] font-light'>Good morning</p>
                    <p className=' font-medium text-black'>David David</p>
                </div>

                <div className='border-r px-3 text-primary'>
                    <Notification />
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
