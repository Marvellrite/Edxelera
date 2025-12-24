"use client"

import { courses } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import Video_card from '@/app/home/components/video_card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)

export function CoursesSection() {
  const CourseSec = useRef(null);
  useGSAP(
    ()=>{
      gsap.from(CourseSec.current, {
        y: 80,
        opacity: 0,
        ease:"power2.out",
        duration: 0.8,
        scrollTrigger: {
        start: "top 60%",
        once: true,
        trigger: CourseSec.current
      }})
    },
    {scope:CourseSec}
  )


  return (
    <section  ref={CourseSec} id="courses" className="relative py-16 lg:py-20 bg-linear-to-b from-neutral-50 to-white overflow-hidden courses">
      {/* Decorative Circle */}
      <div className="absolute top-0 left-0 w-full h-[389px] bg-linear-to-b from-neutral-50 to-white -z-10" />

      <div className="max-w-[1440px] mx-auto max-sm:px-4 sm:px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 max-sm-md:text-[32px] max-sm-md:leading-[120%] text-5xl font-semibold">
            Explore Our Variety of Courses
          </h2>
          <p className="text-neutral-800 text-lg max-w-[689px] mx-auto">
            A simple, guided learning journey designed to keep you motivated and help you finish
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid max-lg:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course) => (
            <Video_card key={course._id} {...course} hideCta={true}/>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white h-12 rounded-full px-8"
          >
            More Courses
          </Button>
          <Button className="bg-primary hover:bg-primary-700 text-white h-12 rounded-full px-8">
            Start Learning
          </Button>
        </div>
      </div>
    </section>
  );
}