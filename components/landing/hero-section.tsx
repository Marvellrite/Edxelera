import { Button } from '@/components/ui/button';
import AnimatedHeroslide from './animated-hero-slide';

export function HeroSection() {

  return (
    <section className="relative h-[640px] overflow-hidden flex items-center sm-md:h-[578px] ">
      {/* Background Image */}

            <AnimatedHeroslide/>

      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/69 to-transparent" />

      {/* Content */}
      <div className="relative max-w-[562px] mx-6 sm-md:mx-[52px] lg:mx-[150px] w-full">
        <div className=" space-y-6 max-sm-md:text-center">
          <h1 className="text-white text-[40px] leading-[150%] sm-md:text-[48px]  sm-md:leading-[120%] lg:text-[56px] sm-md:font-semibold font-bold">
            Learn Tech Skills. Build Real Projects. Become Job-Ready
          </h1>
          
          <p className="text-white text-lg leading-[27px] ">
            Edxelera is a cohort-based learning platform helping beginners gain practical, employable tech skills with weekly modules, peer reviews, and hands-on projects
          </p>

          <div className="flex flex-wrap flex-col sm-md:flex-row gap-4 pt-4">
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