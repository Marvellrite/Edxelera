"use client"

import { steps } from '@/lib/landing-data';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';

export function ProcessSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#D62829] to-[#701515] py-12 lg:py-16 overflow-hidden">
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
          {steps.map((step, index) => (
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

      <div className=' absolute bottom-0 left-0 -translate-x-1/2 translate-y-[60%]'>
        <div className='size-[279px] rounded-full  bg-primary-700'></div>
      <ReactSVG
        src="/images/landing/dashed-circle.svg"
        width={92}
        height={110}
        className="absolute top-0 right-0 translate-x-[18%] -translate-y-[86%] hidden lg:block"
      />
      </div>

    <div className=' absolute top-0 right-0 translate-x-[50%]  -translate-y-[30%]  rounded-full '>
      <div className=' blur-[60px] bg-primary size-[279px]  '>
      </div>
        <ReactSVG
        src="/images/landing/dashed-circle.svg"
        width={92}
        height={110}
        className="absolute bottom-0 left-0 z-20 rotate-180 -translate-y-[18%]"
      />

    </div>
    </section>
  );
}