"use client"
import Image from 'next/image'
import { ThemeToggler } from '@/components/common'
import NotificationBellButton from '../../features/cart/notification-bell-button'

const Header = () => {
  return (
    <header className='bg-white h-24 w-full col-span-1 md:col-span-12 rounded-2xl py-2 px-3 md:px-4 flex justify-between items-center gap-3'>
        <Image src="/images/logos/logo-dark.png" alt='logo' height={63} width={256} placeholder='empty' quality={100} className=' h-[32px] w-auto aspect-191/47' />

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

                <NotificationBellButton/>

                <ThemeToggler/>
            </div>
            
        </section>
    </header>
  )
}

export default Header
