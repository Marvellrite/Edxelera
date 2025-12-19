"use client"

import { steps } from "@/lib/landing-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import ScrollToTop from "./scroll-to-top"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

useGSAP(
  () => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        once: true,
      },
    })

      tl.from(".process-item", {
        opacity: 0,
        x: -50,
        duration: 0.5,
        ease: "bounce.out",
        stagger: 0.6,
      })

  },
  { scope: sectionRef }
)


  return (
    <section className="relative from-20% to-80% bg-linear-to-r max-sm-md:bg-linear-to-br from-primary to-secondary py-12 lg:py-16 overflow-hidden">
      <div
        ref={sectionRef}
        className="relative max-w-[1440px] mx-auto px-4 lg:px-[150px]"
      >
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-white text-5xl font-semibold">
            Learn the Smart Way
          </h2>
          <p className="text-neutral-50 text-lg max-w-[689px] mx-auto">
            A simple, guided learning journey designed to keep you motivated and help you finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14">
          {steps.map((step) => (
            <div key={step.number} className="process-item space-y-5 max-sm:space-y-10">
              {/* Number with dashed lines */}
              <div>

                <div className="flex items-center gap-4 ">
                  <div className=" flex-1 border-t-3 border-dashed border-neutral-50" />

                  <div className="process-number w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[36px] font-extrabold text-neutral-800">
                      {step.number}
                    </span>
                  </div>

                  <div className=" flex-1 border-t-3 border-dashed border-neutral-50" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="text-white text-[32px] font-bold">
                  {step.title}
                </h3>
                <p className="text-neutral-50 text-lg leading-[27px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTop observed={sectionRef}/>
    </section>
  )
}
