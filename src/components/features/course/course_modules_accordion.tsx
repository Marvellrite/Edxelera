'use client';

import React from 'react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactSVG } from 'react-svg';
import { Note } from '@/components/icons/modified';
import { type CourseModulesAccordionProps } from '@/types/course';

export default function CourseModulesAccordion({
   items,
}: CourseModulesAccordionProps) {
   const [isMounted, setIsMounted] = React.useState(false);

   React.useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return (
         <div className=" border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none">
            {items.map((item) => (
               <div
                  key={item.value}
                  className="px-2.5 py-4 md:py-7 border-b border-neutral-400 last:border-b-0"
               >
                  <div className=" flex gap-x-1.5 items-center">
                     {item.iconVariant === 'note' ? (
                        <Note className="size-6" />
                     ) : (
                        <ReactSVG src="/icons/note.svg" />
                     )}
                     <span className="text-sm font-medium">{item.title}</span>
                  </div>
               </div>
            ))}
            <hr className="text-neutral-400 border-none md:hidden" />
         </div>
      );
   }

   return (
      <Accordion
         type="multiple"
         className=" border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0"
      >
         {items.map((item) => (
            <AccordionItem
               key={item.value}
               value={item.value}
               className="  px-0 py-0  md:py-3.5 border-b border-neutral-400"
            >
               <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                  <div className=" flex gap-x-1.5 items-center">
                     {item.iconVariant === 'note' ? (
                        <Note className="size-6" />
                     ) : (
                        <ReactSVG src="/icons/note.svg" />
                     )}
                     <span>{item.title}</span>
                  </div>
               </AccordionTrigger>
               <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className=" pt-3 space-y-6 px-6 ">
                     {item.lessons.map((lesson, index) => (
                        <div key={`${item.value}-lesson-${index}`} className=" space-y-2.5">
                           <p>{lesson.title}</p>
                           <div className=" flex gap-2 items-center">
                              <ReactSVG src={lesson.iconSrc ?? '/icons/video-square.svg'} />
                              <span>{lesson.contentType ?? 'Video Lesson'}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </AccordionContent>
            </AccordionItem>
         ))}
         <hr className="text-neutral-400 border-none md:hidden" />
      </Accordion>
   );
}
