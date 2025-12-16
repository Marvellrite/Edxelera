"use client"

import { benefits } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';

export function LearnersSection() {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left - Image Collage */}
          <div className="relative">
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
              <h2 className="text-white text-5xl font-semibold leading-[72px]">
                Built for Learners Who Want More
              </h2>
              <p className="text-neutral-50 text-lg">
                We give you more than videos — we give you a true learning experience
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-primary-400 rounded-xl p-6 flex items-center gap-6"
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

            <Button variant="secondary" className="hover:bg-secondary-700 text-white rounded-full mt-4 w-[188px] h-14">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}