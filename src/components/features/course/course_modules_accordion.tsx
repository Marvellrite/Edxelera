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
import {
   type CourseModuleLearningStage,
   type CourseModuleLesson,
   type CourseModulesAccordionItem,
   type CourseModulesAccordionProps,
} from '@/types/course';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const LOCKED_MODULE_TEXT_CLASS = 'text-neutral-600';

export default function CourseModulesAccordion({
   items,
   className,
   mode = 'info',
}: CourseModulesAccordionProps) {
   const [isMounted, setIsMounted] = React.useState(false);
   const isLearningMode = mode === 'learning';
   const [openLearningModule, setOpenLearningModule] = React.useState<string>('');
   const [activeLesson, setActiveLesson] = React.useState<{
      moduleValue: string;
      lessonIndex: number;
   } | null>(null);

   React.useEffect(() => {
      setIsMounted(true);
   }, []);

   const getModuleStage = (
      item: CourseModulesAccordionItem
   ): CourseModuleLearningStage => {
      if (item.learningStage) return item.learningStage;
      if (item.isLearned) return 'completed';
      if (item.isSelected) return 'in-progress';
      return 'locked';
   };

   const isModuleLocked = (item: CourseModulesAccordionItem) =>
      isLearningMode && getModuleStage(item) === 'locked';

   const getLessonStage = (lesson: CourseModuleLesson): CourseModuleLearningStage =>
      lesson.learningStage ?? 'not-started';

   const isLessonLocked = (
      lesson: CourseModuleLesson,
      module: CourseModulesAccordionItem
   ) => isModuleLocked(module) || getLessonStage(lesson) === 'locked';

   const renderModuleIcon = (
      item: CourseModulesAccordionItem,
      isLocked: boolean
   ) => {
      if (item.iconVariant === 'note') {
         return <Note className={cn('size-6', isLocked && 'opacity-70')} />;
      }

      return (
         <ReactSVG
            src="/icons/note.svg"
            beforeInjection={
               isLocked
                  ? (svg) => {
                       const paths = svg.querySelectorAll('path');
                       paths.forEach((path) => {
                          path.setAttribute('fill', '#525252');
                       });
                    }
                  : undefined
            }
         />
      );
   };

   const isLessonCompleted = (lesson: CourseModuleLesson) =>
      getLessonStage(lesson) === 'completed';

   const shouldShowLessonRadio = (lesson: CourseModuleLesson) => {
      if (typeof lesson.showProgressIndicator === 'boolean') {
         return lesson.showProgressIndicator;
      }

      const normalizedContentType = (lesson.contentType ?? '').toLowerCase();
      return !['assessment', 'task'].includes(normalizedContentType);
   };

   React.useEffect(() => {
      if (!isLearningMode || items.length === 0) return;

      const currentModule =
         items.find((item) => getModuleStage(item) === 'in-progress') ??
         items.find((item) => item.isSelected) ??
         items[0];
      setOpenLearningModule(currentModule.value);

      const activeItem = items
         .flatMap((item) => item.lessons.map((lesson, lessonIndex) => ({ item, lesson, lessonIndex })))
         .find(({ lesson }) => lesson.isActive);

      if (activeItem && !isLessonLocked(activeItem.lesson, activeItem.item)) {
         setActiveLesson({
            moduleValue: activeItem.item.value,
            lessonIndex: activeItem.lessonIndex,
         });
         return;
      }

      const firstPlayable = items
         .flatMap((item) => item.lessons.map((lesson, lessonIndex) => ({ item, lesson, lessonIndex })))
         .find(({ lesson, item }) => !isLessonLocked(lesson, item));

      if (firstPlayable) {
         setActiveLesson({
            moduleValue: firstPlayable.item.value,
            lessonIndex: firstPlayable.lessonIndex,
         });
      }
   }, [isLearningMode, items]);

   const renderLessonRow = (
      lesson: CourseModuleLesson,
      item: CourseModulesAccordionItem,
      index: number
   ) => {
      const showRadio = shouldShowLessonRadio(lesson);
      const isCompleted = isLessonCompleted(lesson);
      const lessonLocked = isLessonLocked(lesson, item);
      const isCurrentLesson =
         activeLesson?.moduleValue === item.value && activeLesson.lessonIndex === index;
      const shouldHighlight = isCurrentLesson || lesson.isActive;
      const activateLesson = () => {
         if (lessonLocked) return;
         setActiveLesson({
            moduleValue: item.value,
            lessonIndex: index,
         });
      };

      return (
         <div
            key={`${item.value}-lesson-${index}`}
            role="button"
            tabIndex={lessonLocked ? -1 : 0}
            aria-disabled={lessonLocked}
            onClick={activateLesson}
            onKeyDown={(event) => {
               if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  activateLesson();
               }
            }}
            className={cn(
               'flex w-full items-start gap-2.5 rounded-md text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
               !lessonLocked && 'hover:bg-neutral-100/70 cursor-pointer',
               lessonLocked && 'cursor-not-allowed opacity-70'
            )}
         >
            {showRadio && (
               <RadioGroup
                  value={isCompleted ? 'done' : isCurrentLesson ? 'current' : undefined}
                  className="pointer-events-none space-y-0"
               >
                  <RadioGroupItem
                     value={isCompleted ? 'done' : 'current'}
                     id={`${item.value}-lesson-progress-${index}`}
                     className={cn(
                        'size-5 border-neutral-400',
                        (isCompleted || isCurrentLesson) && 'border-primary text-primary'
                     )}
                     aria-label={`Lesson ${index + 1} progress`}
                  />
               </RadioGroup>
            )}

            <div className="space-y-2">
               <p className={cn(shouldHighlight && 'text-primary')}>{lesson.title}</p>
               <div className="flex items-center gap-2">
                  <ReactSVG src={lesson.iconSrc ?? '/icons/video-square.svg'} />
                  <span>{lesson.contentType ?? 'Video Lesson'}</span>
               </div>
            </div>
         </div>
      );
   };

   const renderFallbackItem = (item: CourseModulesAccordionItem) => {
      const isLocked = isModuleLocked(item);

      return (
         <div
            key={item.value}
            className={cn(
               'border-b border-neutral-400 px-2.5 py-4 last:border-b-0 md:py-7',
               isLocked && LOCKED_MODULE_TEXT_CLASS
            )}
         >
            <div className="flex items-center gap-x-1.5">
               {renderModuleIcon(item, isLocked)}
               <span className="text-sm font-medium">{item.title}</span>
            </div>
         </div>
      );
   };

   if (!isMounted) {
      return (
         <div
            className={cn(
               'border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none',
               className
            )}
         >
            {items.map(renderFallbackItem)}
            <hr className="border-none text-neutral-400 md:hidden" />
         </div>
      );
   }

   if (isLearningMode) {
      return (
         <Accordion
            type="single"
            collapsible
            value={openLearningModule}
            onValueChange={(value) => setOpenLearningModule(value)}
            className={cn(
               'border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0',
               className
            )}
         >
            {items.map((item) => {
               const isLocked = isModuleLocked(item);

               return (
                  <AccordionItem
                     key={item.value}
                     value={item.value}
                     className={cn(
                        'border-b border-neutral-400 px-0 py-0 md:py-3.5',
                        isLocked && LOCKED_MODULE_TEXT_CLASS
                     )}
                  >
                     <AccordionTrigger
                        aria-disabled={isLocked}
                        className={cn(
                           'px-2.5 hover:no-underline',
                           !isLocked && 'hover:bg-neutral-400/30',
                           isLocked && LOCKED_MODULE_TEXT_CLASS
                        )}
                     >
                        <div className="flex items-center gap-x-1.5">
                           {renderModuleIcon(item, isLocked)}
                           <span>{item.title}</span>
                        </div>
                     </AccordionTrigger>

                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="space-y-6 border-y border-neutral-200 px-3 py-3.5">
                           {item.lessons.map((lesson, index) =>
                              renderLessonRow(lesson, item, index)
                           )}
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               );
            })}
            <hr className="border-none text-neutral-400 md:hidden" />
         </Accordion>
      );
   }

   return (
      <Accordion
         type="multiple"
         className={cn(
            'border border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0',
            className
         )}
      >
         {items.map((item) => (
            <AccordionItem
               key={item.value}
               value={item.value}
               className="border-b border-neutral-400 px-0 py-0 md:py-3.5"
            >
               <AccordionTrigger className="px-2.5 hover:bg-neutral-400/30 hover:no-underline">
                  <div className="flex items-center gap-x-1.5">
                     {renderModuleIcon(item, false)}
                     <span>{item.title}</span>
                  </div>
               </AccordionTrigger>

               <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="space-y-6 px-6 pt-3">
                     {item.lessons.map((lesson, index) => (
                        <div key={`${item.value}-lesson-${index}`} className="space-y-2.5">
                           <p>{lesson.title}</p>
                           <div className="flex items-center gap-2">
                              <ReactSVG src={lesson.iconSrc ?? '/icons/video-square.svg'} />
                              <span>{lesson.contentType ?? 'Video Lesson'}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </AccordionContent>
            </AccordionItem>
         ))}
         <hr className="border-none text-neutral-400 md:hidden" />
      </Accordion>
   );
}
