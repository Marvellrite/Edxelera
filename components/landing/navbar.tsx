'use client';

import { useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/lib/landing-data';
import { cn, throttle } from '@/lib/utils';
import { useNavScrollStore } from '@/stores/scroll-observer-store';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navScrolled = useNavScrollStore((state)=>state.isNavScrolled);
  const navContainer = useRef<HTMLDivElement|null>(null)
  const navDiv = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    const handleWindowScroll = ()=>{
      if(!navContainer || !navDiv) return;
      const distance = window.scrollY;
      if(distance>100){
        navContainer.current?.classList.add("bg-white")
        navContainer.current?.classList.remove("bg-transparent")

        navDiv.current?.classList.add("text-black", "navHeight2")
        navDiv.current?.classList.remove("text-white", "navHeight1")
      }
      else{
        navContainer.current?.classList.remove("bg-white")
        navContainer.current?.classList.add("bg-transparent")
  
        navDiv.current?.classList.remove("text-black", "navHeight2")
        navDiv.current?.classList.add("text-white", "navHeight1")

      }
    }

    window.addEventListener("scroll", throttle(handleWindowScroll, 0.3))

    return ()=>window.removeEventListener("scroll", handleWindowScroll)
  })


  return (
    <nav
    ref={navContainer}
  className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-transparent")}
>
      <div ref={navDiv} className={cn("max-w-[1440px] mx-auto px-6 lg:px-[150px] container flex items-center justify-center transitionall duration-700 text-white navHeight1")}>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className=" w-[197px] ">
            <Image
              src="/images/landing/edx-logo.png"
              alt="Edxelera"
              width={197}
              height={50}
              className=" h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium  hover:text-primary transition-colors p-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-primary hover:bg-primary-700 text-white px-6 h-12 rounded-full">
              Start Learning
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