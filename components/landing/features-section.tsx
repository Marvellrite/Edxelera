'use client'

import { features } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import { ReactSVG } from 'react-svg';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger)

export function FeaturesSection() {

  const sectionRef = useRef<HTMLDivElement|null>(null)

  useGSAP(()=>{

    const features = gsap.utils.toArray<HTMLElement>(".feature")

        const t1 = gsap.timeline({
          scrollTrigger:{
            trigger: sectionRef.current,
            start: "top 70%",
            once: true
          }})
        
          t1.from(
            sectionRef.current, {
              y: 50,
              opacity: 0,
              duration: 1.5,
              ease: "elastic.out",
              
            }
          )

          features.forEach((_, i)=>{
            switch(i){
              case 0: t1.from(
                _, {
                  x: -100,
                  opacity: 0,
                  ease: "power1.out",
                  duration: 0.5
                }, "-=0.6"
              );
              break;
              case 1: t1.from(
                _, {
                  x: 100,
                  opacity: 0,
                  ease: "power1.out",
                  duration: 0.5
                }, "+=0.2"
              );
              break;
              case 2: t1.from(
                _, {
                  y: 100,
                  opacity: 0,
                  ease: "power1.out",
                  duration: 0.5
                }, "+=0.2"
              );
              break;
              case 3: t1.from(
                _, {
                  x: 100,
                  opacity: 0,
                  ease: "power1.out",
                  duration: 0.5
                }, "+=0.2"
              );

              break;
              }
            }
          )


        },  {scope: sectionRef}
  )


  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white featuresSection"  >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold">
            Why Learners Choose <span className="text-secondary name inline-block">Edxelera</span>
          </h2>
          <p className="text-neutral-800 text-lg max-w-[700px] mx-auto">
            Experience high-quality, structured and immersive learning designed to help you grow faster and achieve more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-6">
          {/* Left Column - 3 Feature Cards */}
          <div className=" grid lg:grid-cols-2 lg:grid-rows-1 gap-3 max-sm:grid-cols-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn("bg-neutral-50 rounded-[10px] p-6 space-y-5 feature", index==2&&" col-span-2 py-9 max-sm:col-span-1")}
              >
                <ReactSVG
                  src={feature.icon}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <div className="space-y-2.5">
                  <h3 className="text-neutral-900 text-[28px] font-medium">{feature.title}</h3>
                  <p className="text-neutral-800 text-base leading-6">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Dark Card */}
          <div className=" rounded-[10px] p-8 flex flex-col justify-between space-y-10 bg-primary feature">
            <div className="space-y-5">
              <div className=' rounded-full border-[1.5px] border-white size-12 flex items-center justify-center'>

                <ReactSVG
                  src="/icons/landing/lock.svg"
                  width={20}
                  height={20}
                  className="w-5 h-5 text-white"
                />
              </div>
              <div className="space-y-2.5 ">
                <h3 className="text-white text-[28px] font-medium leading-[42px]">
                  A Real Classroom Experience Online
                </h3>
                <p className="text-neutral-50 text-base leading-6">
                  Edxelera delivers a structured, university-style learning environment—complete with guided lessons, discussions, assignments, and instructor presence.
                  <br /><br />
                  You learn alongside peers, engage in conversations, and follow a clear path that feels like a real classroom, but with the flexibility of being online
                </p>
              </div>
            </div>
            <Button variant={"secondary"} className=" h-12 rounded-full w-fit px-8">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}