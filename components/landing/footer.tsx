'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactSVG } from 'react-svg';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#0F0F0F] text-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_auto] gap-9 mb-20">
          {/* Left - Brand & Newsletter */}
          <div className="space-y-6 max-w-[389px]">
            <h3 className="text-[46.87px] font-medium">Edxelera</h3>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity rounded-full size-8 bg-primary flex p-0 items-center justify-center"
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
              <h4 className="text-lg font-semibold text-neutral-100">Quick Links</h4>
              <nav className="space-y-3">
                <Link href="#courses" className="block text-base text-neutral-100 hover:text-white transition-colors">
                  Courses
                </Link>
                <Link href="#about" className="block text-base text-neutral-100 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="#contact" className="block text-base text-neutral-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="#faqs" className="block text-base text-neutral-100 hover:text-white transition-colors">
                  FAQs
                </Link>
              </nav>
            </div>

            {/* Contact Us */}
            <div className="space-y-3 max-w-[282px]">
              <h4 className="text-lg font-semibold text-neutral-100">Contact Us</h4>
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
              </div>
            </div>

            {/* Download App */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-neutral-100">Download App</h4>
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