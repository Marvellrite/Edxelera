'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import SearchInput from '@/components/common/search_input';
import { ReactSVG } from 'react-svg';
import Sidebar from './sidebar';

export function Navbar() {
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);


  return (
    <nav
  className={cn(" top-0 left-0 right-0 z-50 text-base text-neutral-900 font-medium sticky bg-white/95 backdrop-blur-md border-b border-neutral-100/80 sm-md:order-0 max-sm-md:-order-1")}
>
      {/* Nav For Tablet Size */}
      <div  className={cn("max-w-360 mx-auto px-6 lg:px-10 container flex items-center justify-center  sm-md:h-16 lg:h-22 max-sm-md:hidden lg:hidden")}>
        <div className="flex justify-between w-full items-center">

           <button
            className="lg:hidden p-2"
            onClick={() => setSidebarMenuOpen(!sidebarMenuOpen)}
            aria-label="Toggle menu"
          >
            {sidebarMenuOpen ? (
              <X className="w-6 h-6 text-neutral-900" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-900" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className=" w-49.25 ">
            <Image
              src="/images/edx_logo_1.png"
              alt="Edxelera's Logo"
              width={148}
              height={32}
              className=" h-auto max-sm-md:hidden"
            />
          </Link>

          <div className=' flex gap-4 text-black'>
            <button className=' p-0'>
            <ReactSVG className='text-neutral-800' src='/icons/landing/search.svg' />
            </button>
            <button className=' p-0'>
            <ReactSVG className='text-neutral-800' src='/icons/landing/shopping-cart.svg'/>
            </button>
          </div>

        </div>
      </div>

      {/* Nav for Phone and Laptop Scren Size */}
      <div  className={cn("max-w-360 mx-auto px-6 lg:px-10 container flex items-center justify-center  max-sm-md:h-13 sm:h-16 lg:h-27 sm-md:hidden lg:flex")}>
        <div className="flex justify-between w-full items-center">
          {/* Logo */}
          <Link href="/" className=" w-36.75 ">
            <Image
              src="/images/edx_logo_1.png"
              alt="Edxelera"
              width={148}
              height={32}
              className=" h-auto max-sm-md:hidden"
            />
            <Image
              src="/images/edx_logo-1-submark.png"
              alt="Edxelera"
              width={382}
              height={340}
              className=" h-auto sm-md:hidden w-9"
            />
          </Link>

          <div className=' flex gap-6 items-center max-sm-md:hidden mr-3'>
            <Link href={'/explore'}>Explore</Link>
            <SearchInput className='text-normal placeholder:text-neutral-800' placeholder='Search'/>
            <Link className=' pl-2 whitespace-nowrap' href={"Teach"}>Teach on Edxelera</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex gap-2 max-sm-md:hidden">
            <button className="p-0 mr-4">
              <ReactSVG src="/icons/landing/shopping-cart.svg"/>
            </button>
            <Button variant={"outline"} className="  px-6 h-12 w-34.5">
              Login
            </Button>
            <Button className=" px-6 h-12 w-34.5 shadow-[0_8px_20px_rgba(0,17,70,0.2)]">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarMenuOpen(!sidebarMenuOpen)}
            aria-label="Toggle menu"
          >
            {sidebarMenuOpen ? (
              <X className="w-6 h-6 text-neutral-900" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile amd Tablet Sidebar Menu */}
      <Sidebar isOpen={sidebarMenuOpen} setIsOpen={setSidebarMenuOpen}/>
    </nav>
  );
}