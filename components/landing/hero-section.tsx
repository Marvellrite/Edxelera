import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-[760px] flex items-center">
      {/* Background Image */}
      <Image
        src="/images/landing/hero-bg.png"
        alt="Students learning together"
        fill
        className="object-cover"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/69 to-transparent" />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[150px] w-full">
        <div className="max-w-[549px] space-y-6">
          <h1 className="text-white text-[56px] font-extrabold leading-[84px]">
            Learn Tech Skills. Build Real Projects. Become Job-Ready
          </h1>
          
          <p className="text-white text-lg leading-[27px]">
            Edxelera is a cohort-based learning platform helping beginners gain practical, employable tech skills with weekly modules, peer reviews, and hands-on projects
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-neutral-50 text-neutral-900 border-white px-8 h-14 rounded-full text-base font-medium"
            >
              Explore our Courses
            </Button>
            <Button className="bg-primary hover:bg-primary-700 text-white px-8 h-14 rounded-full text-base font-medium">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}