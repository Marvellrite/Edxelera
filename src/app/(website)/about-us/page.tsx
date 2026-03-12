'use client'

import React from 'react'
import { HeroSection } from '@/components/website/landing/hero-section'
import { hero_slides } from '@/lib/about'
import { ReactSVG } from 'react-svg'
import { FeaturesSection } from '@/components/website/landing/features-section'
import { TestimonialsSection } from '@/components/website/landing/testimonials-section'

const AboutUs = () => {
  return (
    <main className=' flex flex-col'>

      <HeroSection slides={hero_slides} mode='about'/>

      <section className=' py-12'>
        <div className="max-w-[1440px] mx-auto px-4 sm-md:px-[50px] lg:px-[150px]">
                <div className="text-center mb-10 space-y-4">
                  <h2 className="text-neutral-900 text-5xl font-semibold max-sm-md:leading-[150%]">
                    Our Vision and Mission
                  </h2>
                  <p className="text-neutral-800 text-lg max-w-[700px] mx-auto">
                    A clear look at what drives Edxelera and the future we’re building for learners across Africa
                  </p>
                </div>
                 
                 <div className=' flex flex-col sm-md:flex-row gap-3 '>
                      
                        <div
                          className=" rounded-[10px] p-6 space-y-5 feature bg-secondary text-white"
                        >
                          <ReactSVG
                            src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340463/repo-images/public/icons/chat.svg'
                            className=" mb-5"
                          />
                          <div className="space-y-2.5">
                            <h3 className="text-[28px] font-medium bg-secondary text-white">What courses do you offer?</h3>
                            <p className=" text-base leading-6 bg-secondary text-white">With projects, quizzes, discussions, and hands-on activities, you stay engaged and retain more, making your learning journey both practical and enjoyable</p>
                          </div>
                        </div>
                      
                        <div
                          className=" rounded-[10px] p-6 space-y-5 feature bg-primary text-white"
                        >
                          <ReactSVG
                            src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340463/repo-images/public/icons/chat.svg'
                            className=" mb-5"
                          />
                          <div className="space-y-2.5">
                            <h3 className="text-[28px] font-medium bg-primary text-white">What courses do you offer?</h3>
                            <p className=" text-base leading-6 bg-primary text-white">With projects, quizzes, discussions, and hands-on activities, you stay engaged and retain more, making your learning journey both practical and enjoyable</p>
                          </div>
                        </div>
                      
                    

                 </div>
        
              </div>
      </section>
      <FeaturesSection/>
      <TestimonialsSection/>
    </main>
  )
}

export default AboutUs