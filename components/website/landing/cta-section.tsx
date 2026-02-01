"use client"

import { Button } from '@/components/ui/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {

    const ctaRef = useRef(null)
  useGSAP( ()=>
    gsap.from(ctaRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "bounce.out",
      scrollTrigger:{
        trigger: ctaRef.current,
        start: "top 70%",
        once: true
      }
    }),
  )

  return (
    <section ref={ctaRef} className="bg-white py-16 lg:py-14 cta">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px] text-center space-y-3">
        <h2 className="text-black max-sm-md:text-[32px] max-sm-md:leading-[120%] text-[48px] leading-[150%] font-semibold">Teach on Edxelera</h2>
        <div className="space-y-6">
          <p className="text-neutral-800 text-md max-w-[646px] mx-auto">
            Share your expertise, inspire thousands of learners, and earn by creating high-quality courses that make a real impact
          </p>
          <Button  
            className="  h-14  px-10 "
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}