"use client"

import { Button } from '@/components/ui/button';
import CoursesGrid from '@/components/website/explore/courses-grid';

export default function CoursesSection() {

  return (
    <section  id="courses" className="relative py-16 lg:py-20 bg-linear-to-b from-neutral-50 to-white overflow-hidden courses">
      {/* Decorative Circle */}
      <div className="absolute top-0 left-0 w-full h-[389px] bg-linear-to-b from-neutral-50 to-white -z-10" />

      <div className="max-w-[1440px] mx-auto max-sm:px-4 sm:px-6 lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold">
            Explore Our Variety of Courses
          </h2>
          <p className="text-neutral-800 text-lg max-w-[689px] mx-auto">
            A simple, guided learning journey designed to keep you motivated and help you finish
          </p>
        </div>

        {/* Course Grid */}
        <CoursesGrid/>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center mt-10">
          <Button 
            variant="secondary" 
            className=" hover:bg-primary hover:text-white h-14 rounded-full px-8"
          >
            Start Learning
          </Button>
        </div>
      </div>
    </section>
  );
}