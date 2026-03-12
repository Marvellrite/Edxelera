"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { navLinks } from '@/lib/landing-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean,
    setIsOpen: (isaOpen:boolean)=>void
}

const Sidebar = ({isOpen, setIsOpen}:Props) => {
  return (
     <aside className={cn('lg:hidden bg-white border-t border-neutral-100 w-full sm-md:w-[362px] sm-md:top-0 transition-transform duration-700 ease-out fixed', isOpen?"max-sm-md:translate-y-0 sm-md:translate-x-0":"max-sm-md:-translate-y-[140%] sm-md:-translate-x-full")}>
            <div className=' max-sm-md:hidden flex justify-between p-6 pb-3'>
                <Image 
                src={"https://res.cloudinary.com/dx5iohojj/image/upload/v1773340637/repo-images/public/images/edx_logo_1.png"} 
                alt="Edxelera's Logo"
                width={148}
                height={32}/> 

                <button
                className="lg:hidden p-2"
                onClick={() => setIsOpen(false)}
                aria-label="Toggle menu"
            >
                    <X className="w-6 h-6 text-neutral-900" />
                </button>
            </div>
          <div className="px-6 py-4 max-sm-md:h-[610px] sm-md:h-screen sm-md:gap-6 flex flex-col items-center sm-md:items-start max-sm-md:justify-around">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-base font-medium hover:text-primary transition-colors py-2 text-inherit"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className=' flex gap-3 w-full justify-between sm-md:flex-col'>

            <Button variant={"outline"} className=" h-12 rounded-full grow max-w-[200px] sm-md:w-[123px]">
              Login
            </Button>

            <Button className=" h-12 rounded-full grow max-w-[200px] sm-md:w-[123px]">
              Sign up
            </Button>

            </div>
          </div>
        </aside>
 
  )
}

export default Sidebar