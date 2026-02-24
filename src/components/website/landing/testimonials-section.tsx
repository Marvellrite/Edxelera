'use client';

import { useState } from 'react';
import { testimonials } from '@/lib/landing-data';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';
import { useEmblaHelpers } from '@/hooks/carousel/carousel-hook';

gsap.registerPlugin(ScrollTrigger)

export function TestimonialsSection() {

  const TestimonialsSec = useRef<HTMLDivElement|null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree:true
  })
  const {nextDisabled, prevDisabled, scrollNext, scrollPrev} = useEmblaHelpers(emblaApi!)
  
    useGSAP(
      ()=>{
    
  
        gsap.from(TestimonialsSec.current, {
                opacity: 0,
                y: 100,
                ease: "power2.out",
                duration: 1.2,
                scrollTrigger:{
                  trigger: TestimonialsSec.current,
                  start: "top 60%",

                }
              })
      
      },
      {scope: TestimonialsSec}
    )


  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section ref={TestimonialsSec} className="bg-primary-100 py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto max-sm-md:ps-4 sm-md:ps-6 lg:ps-[150px] lg:pe-[21px]">
        <div className=" mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold max-sm-md:text-[32px] max-sm-md:leading-[120%]">
            Success Stories From Our Community
          </h2>
          <p className="text-neutral-800 text-lg mx-auto ">
            See how guided learning, peer support, and hands-on practice are transforming learners&apos; careers.
          </p>
        </div>

        <div ref={emblaRef} className=' overflow-x-hidden'>
          {/* Testimonials Container */}
          <div className="flex gap-6 mb-8 pr-3 flex-nowrap">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5 basis-[438px] flex-none shadow-premium-sm hover:shadow-premium-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-neutral-900 text-lg font-semibold max-sm-md:text-base">{testimonial.name}</h3>
                    <p className="text-neutral-600 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-neutral-700 text-base leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-6">
          <button
            onClick={scrollPrev}
            disabled={prevDisabled}
            className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-primary-100" />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextDisabled}
            className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-primary-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
