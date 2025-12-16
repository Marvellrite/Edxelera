"use client"

import { steps } from '@/lib/landing-data';

export function ProcessSection() {
  return (
    <section className="relative from-20% t0-20% bg-linear-to-r from-primary to-secondary py-12 lg:py-16 overflow-hidden">
      {/* Decorative Elements */}
 
      {/* <ReactSVG
        src="/images/landing/dashed-circle.svg"
        width={92}
        height={110}
        className="absolute bottom-0 left-[51px] hidden lg:block"
      /> */}

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-white text-5xl font-semibold">Learn the Smart Way</h2>
          <p className="text-neutral-50 text-lg max-w-[689px] mx-auto">
            A simple, guided learning journey designed to keep you motivated and help you finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14">
          {steps.map((step) => (
            <div key={step.number} className="space-y-5">
              {/* Number with dashed lines */}
              <div className="flex items-center gap-4">
                <div className="hidden md:block flex-1 border-t-2 border-dashed border-neutral-50" />
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[36px] font-extrabold text-neutral-800">{step.number}</span>
                </div>
                <div className="hidden md:block flex-1 border-t-2 border-dashed border-neutral-50" />
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="text-white text-[32px] font-bold">{step.title}</h3>
                <p className="text-neutral-50 text-lg leading-[27px]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}