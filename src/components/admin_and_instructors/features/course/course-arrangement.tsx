'use client';

import React, { useState, useEffect } from 'react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactSVG } from 'react-svg';
import { Button } from '@/components/ui/button';
import { Note2 } from '@/components/icons/modified';

const Course_arrangement = () => {
   const [expandText, setExpandText] = useState(false);
   const [activeSection, setActiveSection] = useState<'overview' | 'modules'>('overview');

   // Scroll to section with offset
  const scrollToSection = (elementId: string, offset: number) => {
   const container = document.getElementById('scroll-container');
   const element = document.getElementById(elementId);
   console.log(container)

   if (!container || !element) return;

   const containerTop = container.getBoundingClientRect().top;
   const elementTop = element.getBoundingClientRect().top;

   const scrollPosition =
      elementTop - containerTop + container.scrollTop - offset;

   container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
   });
};


   // Handle navigation button clicks
   const handleNavClick = (section: 'overview' | 'modules') => {
      const offsets = {
         overview: 100,
         modules: 80,
      };
      
      const elementIds = {
         overview: 'overview',
         modules: 'moduleContainer',
      };

      scrollToSection(elementIds[section], offsets[section]);
      setActiveSection(section);
   };

   // Handle responsive text expansion
   useEffect(() => {
      const handleResize = () => {
         const isDesktop = window.matchMedia('(min-width: 768px)').matches;
         setExpandText(isDesktop);
      };

      handleResize(); // Call on mount
      window.addEventListener('resize', handleResize);
      
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   // Track scroll position to update active section
   useEffect(() => {
      const handleScroll = () => {
         const overviewEl = document.getElementById('overview');
         const modulesEl = document.getElementById('moduleContainer');

         if (!overviewEl || !modulesEl) return;

         const scrollPosition = window.scrollY + 200;
         const modulesTop = modulesEl.offsetTop;

         setActiveSection(scrollPosition >= modulesTop ? 'modules' : 'overview');
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="space-y-7 max-md:px-4 relative max-md:mt-10">
         {/* Sticky Navigation */}
         <div className="sticky top-0 w-full bg-white pt-10 max-md:hidden z-10">
            <nav className="w-fit gap-x-4 flex mx-auto">
               <NavButton
                  onClick={() => handleNavClick('overview')}
                  isActive={activeSection === 'overview'}
                  text="Overview"
               />
               <NavButton
                  onClick={() => handleNavClick('modules')}
                  isActive={activeSection === 'modules'}
                  text="Modules"
               />
            </nav>
         </div>

         <div>
            {/* Overview Section */}
            <section id="overview">
               <h2 className="md:hidden text-neutral-800 mb-3">Overview</h2>
               <p
                  className={`text-md font-normal text-[18px] ${
                     expandText ? '' : 'line-clamp-3'
                  }`}
               >
                  This course is a hands-on introduction to the full spectrum of
                  product design, combining UX strategy with UI execution. You
                  will learn how to research user needs, define problems, design
                  intuitive user flows, and bring ideas to life with stunning
                  interfaces using Figma. By the end of the course, you will
                  have the skills to create user-centered digital products and a
                  portfolio to showcase your work.{' '}
                  {expandText && (
                     <Button
                        onClick={() => setExpandText(false)}
                        variant="link"
                        className="hover:no-underline p-0 md:hidden"
                     >
                        read less
                     </Button>
                  )}
               </p>
               {!expandText && (
                  <Button
                     onClick={() => setExpandText(true)}
                     variant="link"
                     className="hover:no-underline p-0"
                  >
                     read more
                  </Button>
               )}
            </section>

            {/* Modules Section */}
            <section id="moduleContainer" className="mt-3.5">
               <h2 className="md:hidden text-neutral-800 mb-1">Modules</h2>
               <Accordion
                  type="multiple"
                  className="border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0"
               >
                  {Array.from({ length: 8 }).map((_, i) => (
                     <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="px-0 py-0 md:py-3.5 border-b border-neutral-400"
                     >
                        <AccordionTrigger className="hover:no-underline hover:bg-neutral-400/30 px-5">
                           <div className="flex gap-x-1.5 items-center">
                              <Note2 className="size-6" />
                              <span className="text-[20px] font-normal">
                                 WEEK {i + 1} - Introduction & Foundations
                              </span>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-[18px]">
                           <div className="pt-3 space-y-6 px-6">
                              {Array.from({ length: 5 }).map((_, j) => (
                                 <LessonItem key={j} />
                              ))}
                           </div>
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </section>
         </div>
      </div>
   );
};

// Navigation Button Component
const NavButton = ({
   isActive = false,
   text,
   onClick,
}: {
   isActive?: boolean;
   text: string;
   onClick?: () => void;
}) => (
   <button
      onClick={onClick}
      className={`rounded-[20px] h-[36px] flex items-center justify-center py-1.5 px-5 transition-colors ${
         isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-black hover:bg-gray-100'
      }`}
   >
      <span>{text}</span>
   </button>
);

// Lesson Item Component
const LessonItem = () => (
   <div className="space-y-2.5">
      <p>What is UX design? What is UI design? How do they work?</p>
      <div className="flex gap-2 items-center">
         <ReactSVG src="/icons/video-square.svg" />
         <span>Video Lesson</span>
      </div>
   </div>
);

export default Course_arrangement;