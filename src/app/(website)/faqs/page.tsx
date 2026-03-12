'use client'

import { features } from '@/lib/landing-data';
import { Button } from '@/components/ui/button';
import { ReactSVG } from 'react-svg';
import { cn } from '@/lib/utils';

export default function FeaturesSection() {

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden featuresSection "  >
      <div className="max-w-[1440px] mx-auto px-4 sm-md:px-[50px] lg:px-[150px]">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-neutral-900 text-5xl font-semibold max-sm-md:leading-[150%]">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-800 text-lg max-w-[700px] mx-auto">
            Stuck on something? We’re here to help with all your questions and answers in one place
          </p>
        </div>


          <div className=" grid gap-3 max-sm-md:grid-cols-1 sm-md:grid-cols-2">
            {[1,2,3,4,5,6,7,8].map((feature, index, array) => (
              <div
                key={index}
                className={cn("bg-neutral-50 rounded-[10px] p-6 space-y-5 feature", index===array.length-2 && "bg-secondary text-white", index===array.length-1 && "bg-primary text-white")}
              >
                <ReactSVG
                  src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340463/repo-images/public/icons/chat.svg'
                  className=" mb-5"
                />
                <div className="space-y-2.5">
                  <h3 className={cn("text-neutral-900 text-[28px] font-medium", index===array.length-2 && "bg-secondary text-white", index===array.length-1 && "bg-primary text-white")}>What courses do you offer?</h3>
                  <p className={cn("text-neutral-800 text-base leading-6", index===array.length-2 && "bg-secondary text-white", index===array.length-1 && "bg-primary text-white")}>With projects, quizzes, discussions, and hands-on activities, you stay engaged and retain more, making your learning journey both practical and enjoyable</p>
                </div>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
}