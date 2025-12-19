"use client"

import { benefits } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

export function LearnersSection() {
  const learnersSec = useRef<HTMLDivElement|null>(null)

  useGSAP(
    ()=>{

      const t1 = gsap.timeline( {
            scrollTrigger:{
          start: "top 70%",
          trigger: learnersSec.current,
        }});
        

 

      t1.from(".leftImage", {
        x:-100,
        opacity:0,

      })

      t1.fromTo(".text-animate1", 
        {text:""},
        {text:"Built for Learners Who Want More",
        ease: "none", duration:1.7 ,}
      )

      t1.from(".experience", {
        y: -50,
        opacity: 0,
        duration: 0.4
      });
      t1.from(".benefit", {
        y: -50,
        opacity: 0,
        stagger: 0.7,
        duration: 0.4,
        ease: "elastic.out"
      })
      t1.to("button.learn", {
              opacity: 1,
              x: 0,
              ease: "elastic.out",
            })
    
    },
    {scope: learnersSec}
  )

  return (
    <section ref={learnersSec} className="bg-primary py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 max-sm-md:px-4 sm-md:px-[50px] lg:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left - Image Collage */}
          <div className="relative leftImage">
            <Image
              src="/images/landing/learning-collage.svg"
              alt="Students learning in various settings"
              width={542}
              height={590}
              className="w-full h-auto"
            />
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-white sm-md:text-[32px] lg:text-[48px] font-semibold leading-[150%] text-animate1 ">
                Built for Learners Who Want More
              </h2>
              <p className="text-neutral-50 text-base experience">
                We give you more than videos — we give you a true learning experience
              </p>
            </div>

            <div className=" benefits flex flex-col sm-md:gap-3 sm-md:flex-row lg:flex-col lg:gap-6 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-primary-400 rounded-xl p-6 flex items-start gap-6 benefit"
                >
                  <ReactSVG
                    src={benefit.icon}
                    width={24}
                    height={24}
                    className="w-5 h-5 shrink-0 text-secondary"
                  />
                  <p className="text-white text-base">{benefit.text}</p>
                </div>
              ))}
            </div>

            <Button variant="secondary" className="hover:bg-secondary-700 text-white rounded-full mt-4 w-[188px] h-14 learn opacity-0 translate-x-[-50px] ">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}