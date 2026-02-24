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
    <section ref={ctaRef} className="bg-linear-to-r from-primary-50 to-neutral-50 py-20 lg:py-24 cta shadow-premium-md">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px] text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-neutral-900 max-sm-md:text-3xl max-sm-md:leading-tight text-4xl lg:text-5xl leading-tight font-semibold">
            Teach on Edxelera
          </h2>
          <p className="text-neutral-700 text-base lg:text-lg max-w-[646px] mx-auto leading-relaxed">
            Share your expertise, inspire thousands of learners, and earn by creating high-quality courses that make a real impact
          </p>
        </div>
        <Button  
          className="h-14 px-10 rounded-xl font-medium shadow-premium-md hover:shadow-premium-lg transition-all"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
}
