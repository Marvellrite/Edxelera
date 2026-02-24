"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroSlides } from "@/types/website.types"
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

interface Props {
    slides: HeroSlides[],
    mode?: 'landing' | 'about'
}


export function HeroSection({slides, mode='landing'}:Props) {

  const heroSec = useRef<HTMLElement|null>(null)

  useGSAP(()=>{
    if (slides.length==1) return ;

      gsap.delayedCall(0.1, () => {
    const t1 = gsap.timeline({defaults:{ duration: 1.5}, repeat: -1})
    slides.forEach((_, i)=>{

      const next = i==slides.length-1? 0 : i+1 ;
      t1.to(`.hero-slide-${i} img`, {
        scale: 1.3,
        duration: 8,
      }, '+=2')

      t1.to(`.hero-slide-${i}`, {
        opacity: 0,
        duration: 0.8
      })

      t1.to(`.hero-slide-${next}`, {
        opacity: 1,
        duration: 0.8
      }, '<')

      t1.set(`.hero-slide-${i} img`, {
        scale: 1,
      })

    })
  });


  }, {scope:heroSec})

  return (
    <section ref={heroSec} className=' relative sm-md:h-[578px] h-[735px] overflow-hidden'>
      {
        slides.map((_, i)=>{
          return (
      <div key={i} className={`absolute inset-0 flex items-center hero-slide-${i} ${i==0 ? 'opacity-100': 'opacity-0'}`}>

      <Image src={slides[i].imgSrc}
        alt="Students learning together"
        fill
        className={`object-cover w-fit ${i==1 && "transform-[rotateY(180deg)]"}`}
        priority
        style={{transformOrigin: "center center"}}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/72 via-black/45 to-black/25" />

      <div className="relative max-w-[658px] mx-6 sm-md:mx-[52px] lg:mx-[150px] w-full">
        <div className="rounded-3xl border border-white/25 bg-white/8 px-5 py-8 backdrop-blur-sm shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:px-7 sm:py-9">
          <div className="space-y-6 max-sm-md:text-center">
            <h1 className="text-white text-[40px] leading-[120%] sm-md:text-[48px]  sm-md:leading-[120%] lg:text-[56px] sm-md:font-semibold font-bold">
              {slides[i].title}
            </h1>

            <p className="text-white text-lg leading-[27px] ">
              {slides[i].paragraph}
            </p>
          </div>

          {
            (()=>{switch(mode){
              case 'about':
            return (<div className="flex flex-wrap flex-col sm-md:flex-row gap-4 pt-4 mt-6">
              <Button
                variant="outline"
                className="bg-white hover:bg-neutral-50 text-neutral-900 border-white px-8 h-14 rounded-full text-base"
              >
                Explore our Courses
              </Button>
              <Button variant={"secondary"} className=" hover:bg-primary px-8 h-14 rounded-full text-base">
                Start Learning
              </Button>
            </div>)

            default:
              return (<div className="flex flex-wrap flex-col sm-md:flex-row gap-4 pt-4 mt-6">
              <Button
                variant="outline"
                className="bg-white hover:bg-neutral-50 text-neutral-900 border-white px-8 h-14 rounded-full text-base"
              >
                Explore our Courses
              </Button>
              <Button className="bg-primary hover:bg-primary-700 text-white px-8 h-14 rounded-full text-base">
                Start Learning
              </Button>
            </div>)

            }})()
          }

          <div className="mt-8 flex flex-wrap items-center gap-3 text-white/95">
            <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm">⭐ 4.8 learner rating</span>
            <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm">12k+ active learners</span>
            <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm">Live mentor feedback</span>
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
