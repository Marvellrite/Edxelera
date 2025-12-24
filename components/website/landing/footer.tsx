'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const [email, setEmail] = useState('');
  const footerSection = useRef(null)
  useGSAP( ()=>{
    gsap.from(
      ".social-links > *", {
        scale: 0.5,
        opacity: 0.4,
        ease: "elastic.out",
        stagger: 0.4,
        scrollTrigger:{
          start: "top 60%",
          trigger: footerSection.current
        }
      }
    )
}, {scope: footerSection}
  )


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer ref={footerSection} className="bg-primary text-white py-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_auto] gap-9 mb-20">
          {/* Left - Brand & Newsletter */}
          <div className="space-y-6 ">
            <Image width={288} height={57} src={"/images/edxelera-white-logo.png"} alt='Edxlera logo' />
            <p className="text-base font-medium leading-6">
              Subscribe to our newsletter to get the latest updates and offers from us
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] bg-transparent border border-neutral-500 rounded-lg px-4 text-sm text-neutral-600 placeholder:text-neutral-600 focus:outline-none focus:border-white"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity rounded-full size-8 bg-secondary flex p-0 items-center justify-center"
                aria-label="Subscribe"
              >
                <ReactSVG src='/icons/landing/chevron-right.svg' className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* Right - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(3,auto)] gap-12 items-start justify-content-start">
            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-neutral-100 text-md">Quick Links</h4>
              <nav className="space-y-3">
                <Link href="#courses" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  Explore Courses
                </Link>
                <Link href="#about" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  Teach on Edxelera
                </Link>
                <Link href="#contact" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  About Us
                </Link>
                <Link href="/contact-us" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  Contact Us
                </Link>
                <Link href="/faqs" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  FAQs
                </Link>
                <Link href="#faqs" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link href="#faqs" className="block text-base text-neutral-100 hover:text-white transition-colors font-medium">
                  Sign Up
                </Link>
              </nav>
            </div>

            {/* Contact Us */}
            <div className="space-y-3 max-w-[282px]">
              <h4 className="text-lg font-semibold text-neutral-100 text-md">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <ReactSVG
                    src="/icons/landing/location.svg"
                    width={18}
                    height={20}
                    className="w-[18px] h-5 shrink-0 mt-1"
                  />
                  <p className="text-base text-neutral-100 leading-6">
                    The Em Hub, 17 Ihunwo Street, Gbalajam, Woji, Port Harcourt
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <ReactSVG
                    src="/icons/landing/phone.svg"
                    width={20}
                    height={20}
                    className="w-5 h-5 shrink-0"
                  />
                  <p className="text-base text-neutral-100">+234 8152 537 473</p>
                </div>
                <div className="flex gap-3 items-center">
                  <ReactSVG
                    src="/icons/landing/email.svg"
                    width={20}
                    height={17}
                    className="w-5 h-[17px] shrink-0"
                  />
                  <p className="text-base text-neutral-100">info@edxelera.com</p>
                </div>
                <div className='flex gap-1.5 social-links'>
                <Link target='_blank' className="p-0 text-primary" href='https://www.facebook.com/profile.php?id=61584359654837'>
                  <ReactSVG src="/icons/social-links/facebook.svg"/>
                </Link>
                <Link target='_blank' href='https://www.linkedin.com/company/edxelera/about/' className=' text-primary'>
                  <ReactSVG src="/icons/social-links/linkedin.svg"/>
                </Link>
                <Link target='_blank' href='https://www.instagram.com/edxelera/'>
                  <ReactSVG src="/icons/social-links/instagram.svg"/>
                </Link>
                <Link target='_blank' href={''}>
                  <ReactSVG src="/icons/social-links/twitter-x.svg"/>
                </Link>

                </div>
              </div>
            </div>

            {/* Download App */}
            <div className="space-y-3 max-sm-md:w-[161px]">
              <h4 className="text-lg font-semibold text-neutral-100 text-md ">Download App</h4>
              <Image
                src="/images/landing/app-badges-footer.svg"
                alt="Download on App Store and Google Play"
                width={161}
                height={103}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-8 border-t border-neutral-700">
          <p className="text-center text-base text-neutral-100">
            Powered by <Link target='_blank' href="https://www.techbridgecity.com">Tech Bridge-City</Link>. Copyright 2025 ©
          </p>
        </div>
      </div>
    </footer>
  );
}