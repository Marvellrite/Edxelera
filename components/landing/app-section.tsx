"use client"

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)

export function AppSection() {

  const appSection = useRef(null)

  useGSAP(()=>{
    const t1 = gsap.timeline({scrollTrigger:{
      trigger: appSection.current,
      start: "top 50%",
    }})

    t1.from(".leftText", {
      opacity: 0,
      scale: 0,
      duration: 1.2,
      ease: "elastic.out",
    })
  }, {scope: appSection})

  return (
    <section ref={appSection} className="bg-white py-16 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] lg:px-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left - Content */}
          <div className="space-y-6 leftText">
            <h2 className="text-neutral-900  max-lg:text-[32px] lg:text-[48px] font-semibold leading-[150%]">
              Learn Anywhere with the Edxelera App
            </h2>
            <div className="space-y-6">
              <p className="text-neutral-800 max-lg:text-base lg:text-lg">
                Stay connected to your classes, track your progress, and continue learning on the go — anytime, anywhere
              </p>
              <Image
                src="/images/landing/app-badges.svg"
                alt="Download on App Store and Google Play"
                width={640}
                height={524}
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/images/landing/iphone-mockup.png"
              alt="Edxelera mobile app"
              width={640}
              height={480}
              className="w-full max-w-[640px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}