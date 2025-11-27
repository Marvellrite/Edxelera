'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactSVG } from 'react-svg';
import { Button } from '@/components/ui/button';
import Review from '../components/review';

const Course_arrangement = () => {
   const [expandText, setExpandText] = useState(false);
   const [isBtnActive, setIsBtnActive] = useState({
      overview: true,
      modules: false,
      reviews: false,
   });

   const onBtnClick = (activeStateKey: keyof typeof isBtnActive) => {
      setIsBtnActive({
         overview: false,
         modules: false,
         reviews: false,
         [activeStateKey]: true,
      });
   };

   const Btn = ({
      isActive = false,
      text,
      ...rest
   }: {
      isActive?: boolean;
      text: string;
   } & React.ComponentProps<'button'>) => (
      <button
         className={`rounded-[20px] flex items-center justify-center py-1.5 px-5  ${isActive ? 'bg-primary text-primary-foreground' : 'bg-initial text-black'}`}
         onClick={() =>
            onBtnClick(text.toLowerCase() as keyof typeof isBtnActive)
         }
         {...rest}
      >
         <span>{text}</span>
      </button>
   );

   useEffect(() => {
      const responsiveLineClamper = () => {
         const isNotDesktop = window.matchMedia('(max-width:768px)').matches;
         setExpandText(!isNotDesktop);
      };
      window.addEventListener('resize', responsiveLineClamper);
      return () => {
         window.removeEventListener('resize', responsiveLineClamper);
      };
   }, []);

   return (
      <div className=" space-y-7">
         <div>
            <div className=" w-fit gap-x-4 flex mx-auto  animate-accordion-down">
               <Btn isActive={isBtnActive.overview} text="Overview" />
               <Btn isActive={isBtnActive.modules} text="Modules" />
               <Btn isActive={isBtnActive.reviews} text="Reviews" />
            </div>
         </div>
         <div>
            <div>
               <p
                  className={` text-md font-normal animate-in ${expandText ? '' : 'line-clamp-3'}`}
               >
                  This course is a hands-on introduction to the full spectrum of
                  product design, combining UX strategy with UI execution. You
                  will learn how to research user needs, define problems, design
                  intuitive user flows, and bring ideas to life with stunning
                  interfaces using Figma. By the end of the course, you will
                  have the skills to create user-centered digital products and a
                  portfolio to showcase your work.{' '}
                  <Button
                     onClick={() => setExpandText(false)}
                     variant="link"
                     className=" hover:no-underline p-0"
                  >
                     read less
                  </Button>
               </p>
               {!expandText && (
                  <Button
                     onClick={() => setExpandText(true)}
                     variant="link"
                     className=" hover:no-underline p-0"
                  >
                     read more
                  </Button>
               )}
            </div>
            <div className=" mt-3.5 ">
               {/* To contain the accordion */}
               <Accordion
                  type="multiple"
                  className=" border border-neutral-400 rounded-lg px-3.5 max-md:border-none max-md:rounded-none "
               >
                  <AccordionItem
                     value="item-1"
                     className="  px-0 py-3.5 border-b border-neutral-400"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg" />
                           <span>WEEK 1 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className=" pt-3 space-y-6 px-6 ">
                           {/* An Item in the Accordion Content */}
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                     value="item-2"
                     className="  px-0 py-3.5 border-b border-neutral-400"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg" />
                           <span>WEEK 2 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className=" pt-3 space-y-6 px-6 ">
                           {/* An Item in the Accordion Content */}
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                     value="item-3"
                     className="  px-0 py-3.5 border-b border-neutral-400"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg" />
                           <span>WEEK 3 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className=" pt-3 space-y-6 px-6 ">
                           {/* An Item in the Accordion Content */}
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                           <div className=" space-y-2.5">
                              <p>
                                 What is UX design? What is UI design? How do
                                 they work?
                              </p>
                              <div className=" flex gap-2 items-center">
                                 <ReactSVG src="/icons/video-square.svg" />
                                 <span>Video Lesson</span>
                              </div>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
                  <hr className="text-neutral-400 border-none " />
               </Accordion>
            </div>
            <div className=" flex gap-x-3 overflow-x-auto scroll-smooth max-md:px-4 mt-3.5">
               <Review />
               <Review />
               <Review />
               <Review />
               <Review />
               <Review />
            </div>
         </div>
      </div>
   );
};

export default Course_arrangement;
