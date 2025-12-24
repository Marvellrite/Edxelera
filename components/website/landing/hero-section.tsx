"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroSlides } from "@/types/website.types"
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

interface Props {
    slides: HeroSlides[]
}


export function HeroSection({slides}:Props) {

  const heroSec = useRef<HTMLElement|null>(null)

  useGSAP(()=>{
    const t1 = gsap.timeline({defaults:{ duration: 1.5}, repeat: -1})
    slides.forEach((_, i)=>{

      const next = i==slides.length-1? 0 : i+1 ;
      console.log("prsent valu:", i)
      console.log("next valu:", next)

      // Scale only the image excluding the text content
      t1.to(`.hero-slide-${i} img`, {
        scale: 1.3,
        duration: 8,
      }, '+=2')
     
      // Fade out the current image gradually
      t1.to(`.hero-slide-${i}`, {
        opacity: 0,
        duration: 0.8
      })

      // Bring in the next frame by fading in (using opacity)
      t1.to(`.hero-slide-${next}`, {
        opacity: 1,
        duration: 0.8
      }, '<')
     

      // Ensure the present image resets to original scale after fade out (using opacity)
      t1.set(`.hero-slide-${i} img`, {
        scale: 1,
      })

    })
  }, {scope:heroSec})

  return (
    <section ref={heroSec} className=' relative sm-md:h-[578px] h-[735px] overflow-hidden'>
      {
        slides.map((_, i)=>{
          return (
      <div key={i} className={`absolute inset-0 flex items-center hero-slide-${i} ${i==0 ? 'opacity-100': 'opacity-0'}`}>
      {/* Background Image */}

      <Image src={slides[i].imgSrc}
        alt="Students learning together"
        fill
        className="object-cover w-fit "
        priority
        style={{transformOrigin: "center center"}}
      />

      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/69 to-transparent" />

      {/* Content */}
      <div className="relative max-w-[562px] mx-6 sm-md:mx-[52px] lg:mx-[150px] w-full">
        <div className=" space-y-6 max-sm-md:text-center">
          <h1 className="text-white text-[40px] leading-[120%] sm-md:text-[48px]  sm-md:leading-[120%] lg:text-[56px] sm-md:font-semibold font-bold">
            {slides[i].title}
          </h1>
          
          <p className="text-white text-lg leading-[27px] ">
            {slides[i].paragraph}
          </p>

          <div className="flex flex-wrap flex-col sm-md:flex-row gap-4 pt-4">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-neutral-50 text-neutral-900 border-white px-8 h-14 rounded-full text-base font-medium"
            >
              Explore our Courses
            </Button>
            <Button className="bg-primary hover:bg-primary-700 text-white px-8 h-14 rounded-full text-base font-medium">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
      </div>

          )
        })

      }

    </section>
  );
}