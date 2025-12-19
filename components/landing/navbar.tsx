'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/lib/landing-data';
import { cn } from '@/lib/utils';
import SearchInput from '../common/search_input';
import { ReactSVG } from 'react-svg';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <nav
  className={cn(" top-0 left-0 right-0 z-50 text-base text-neutral-900 font-medium sticky bg-white sm-md:order-0 max-sm-md:-order-1")}
>
      {/* Nav For Tablet Size */}
      <div  className={cn("max-w-[1440px] mx-auto px-6 lg:px-10 container flex items-center justify-center  max-sm-md:h-13 sm:h-16 lg:h-[108px] max-sm-md:hidden lg:hidden")}>
        <div className="flex justify-between w-full items-center">

          <Menu className="w-6 h-6 text-neutral-900" />

          {/* Logo */}
          <Link href="/" className=" w-[197px] ">
            <Image
              src="/images/edx_logo_1.png"
              alt="Edxelera"
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
      <div  className={cn("max-w-[1440px] mx-auto px-6 lg:px-10 container flex items-center justify-center  max-sm-md:h-13 sm:h-16 lg:h-[108px] sm-md:hidden lg:flex")}>
        <div className="flex justify-between w-full items-center">
          {/* Logo */}
          <Link href="/" className=" w-[197px] ">
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
              width={197}
              height={50}
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
            <Button variant={"outline"} className=" hover:bg-primary-700 px-6 h-12 w-[138px] rounded-full">
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary-700 text-white px-6 h-12 w-[138px] rounded-full">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-900" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-base font-medium hover:text-primary transition-colors py-2 text-inherit"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full bg-primary hover:bg-primary-700 text-white h-12 rounded-full">
              Start Learning
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}