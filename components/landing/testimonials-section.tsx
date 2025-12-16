'use client';

import { useState } from 'react';
import { testimonials } from '@/lib/landing-data';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection() {
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
    <section className="bg-primary-100 py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold">
            Success Stories From Our Community
          </h2>
          <p className="text-neutral-800 text-lg max-w-[787px] mx-auto">
            See how guided learning, peer support, and hands-on practice are transforming learners&apos; careers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-lg border border-neutral-300 p-6 space-y-5"
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
                  <h3 className="text-neutral-900 text-xl font-medium">{testimonial.name}</h3>
                  <p className="text-neutral-700 text-sm font-light">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-neutral-800 text-base leading-6">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-900" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-neutral-900" />
          </button>
        </div>
      </div>
    </section>
  );
}