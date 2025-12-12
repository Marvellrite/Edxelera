import { benefits } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function LearnersSection() {
  return (
    <section className="bg-black py-16 lg:py-20">
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
                  className="bg-neutral-900 rounded-xl p-6 flex items-center gap-6"
                >
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p className="text-white text-base">{benefit.text}</p>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary-700 text-white h-12 rounded-full px-8 mt-4">
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}