"use client"
import Image from 'next/image'
import { ThemeToggler } from '@/components/common'
import NotificationBellButton from '../../features/cart/notification-bell-button'

const Header = () => {
  return (
    <header className='admin-topbar sticky top-0 z-20 h-24 w-full col-span-1 md:col-span-12 rounded-2xl px-3 py-2.5 md:px-5 flex justify-between items-center gap-3'>
        <div className='admin-topbar-brand'>
            <Image src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340672/repo-images/public/images/logos/logo-dark.png" alt='logo' height={63} width={256} placeholder='empty' quality={100} className='h-[32px] w-auto aspect-191/47' />
        </div>

        <section className='flex items-center gap-2 md:gap-5'>
            <div className='admin-topbar-user'>
                <div className='admin-avatar-ring'>
                    <Image src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340674/repo-images/public/photo.png" alt='logo' height={100} width={100} className='h-10 w-10 rounded-full object-contain' />
                </div>

                <div className='hidden sm:block'>
                    <p className='admin-topbar-greeting text-[13px]'>Good morning</p>
                    <p className='admin-topbar-name text-[15px]'>David David</p>
                </div>

                <NotificationBellButton/>

                <ThemeToggler/>
            </div>
            
        </section>
    </header>
  )
}

export default Header
