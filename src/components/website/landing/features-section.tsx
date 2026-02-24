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
              duration: 1.2,
              ease: "power2.out",

            }
          )

          features.forEach((_, i)=>{
            t1.from(
              _, {
                y: 45,
                opacity: 0,
                ease: "power1.out",
                duration: 0.45
              }, i === 0 ? "-=0.6" : "-=0.25"
            );
          }
        )


        },  {scope: sectionRef}
  )


  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-linear-to-b from-white to-surface overflow-hidden featuresSection"  >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold max-sm-md:text-[32px] max-sm-md:leading-[120%]">
            Why Learners Choose <span className="text-secondary name inline-block">Edxelera</span>
          </h2>
          <p className="text-neutral-800 text-lg max-w-[700px] mx-auto">
            Experience high-quality, structured and immersive learning designed to help you grow faster and achieve more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-6">
          <div className=" grid lg:grid-cols-2 lg:grid-rows-1 gap-3 max-sm:grid-cols-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn("bg-white rounded-2xl border border-neutral-200 p-6 space-y-5 feature shadow-[0_8px_24px_rgba(4,5,6,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(4,5,6,0.08)] transition-all duration-200", index==2&&" col-span-2 py-9 max-sm:col-span-1")}
              >
                <div className=' rounded-full border flex justify-center items-center p-3 border-neutral-200 w-fit bg-primary/5'>
                  <ReactSVG
                    src={feature.icon}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-neutral-900 text-[20px] sm-md:text-[26px] font-semibold leading-[120%]">{feature.title}</h3>
                  <p className="text-neutral-800 text-base leading-6">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className=" rounded-2xl border border-primary/30 p-8 flex flex-col justify-between space-y-10 bg-primary feature shadow-[0_16px_40px_rgba(0,17,70,0.25)]">
            <div className="space-y-5">
              <div className=' rounded-full border-[1.5px] border-white/70 size-12 flex items-center justify-center bg-white/10'>

                <ReactSVG
                  src="/icons/landing/lock.svg"
                  width={20}
                  height={20}
                  className="w-5 h-5 text-white"
                />
              </div>
              <div className="space-y-2.5 ">
                <h3 className="text-white text-[28px] font-semibold leading-[130%] max-sm-md:text-[20px] max-sm-md:leading-[120%]">
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
