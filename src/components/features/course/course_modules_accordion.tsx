'use client';

import React from 'react';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactSVG } from 'react-svg';
import { CheckCircleIcon, Note } from '@/components/icons/modified';
import {
   type CourseModuleLearningStage,
   type CourseModuleLesson,
   type CourseModulesAccordionItem,
   type CourseModulesAccordionProps,
} from '@/types/course';
import { cn } from '@/lib/utils';

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

   const currentLearningModuleIndex = React.useMemo(() => {
      if (!isLearningMode || items.length === 0) return -1;

      if (activeLesson) {
         const activeLessonModuleIndex = items.findIndex(
            (item) => item.value === activeLesson.moduleValue
         );
         if (activeLessonModuleIndex !== -1) return activeLessonModuleIndex;
      }

      const lessonActiveModuleIndex = items.findIndex((item) =>
         item.lessons.some((lesson) => lesson.isActive)
      );
      if (lessonActiveModuleIndex !== -1) return lessonActiveModuleIndex;

      const inProgressModuleIndex = items.findIndex(
         (item) => getModuleStage(item) === 'in-progress' || item.isSelected
      );
      return inProgressModuleIndex !== -1 ? inProgressModuleIndex : 0;
   }, [activeLesson, isLearningMode, items]);

   const isModuleLocked = (item: CourseModulesAccordionItem, moduleIndex: number) => {
      if (!isLearningMode) return false;

      const isStageLocked = getModuleStage(item) === 'locked';
      const isFutureModule =
         currentLearningModuleIndex !== -1 && moduleIndex > currentLearningModuleIndex;

      return isStageLocked || isFutureModule;
   };

   const getLessonStage = (lesson: CourseModuleLesson): CourseModuleLearningStage =>
      lesson.learningStage ?? 'not-started';

   const isLessonLocked = (
      lesson: CourseModuleLesson,
      module: CourseModulesAccordionItem,
      moduleIndex: number
   ) => isModuleLocked(module, moduleIndex) || getLessonStage(lesson) === 'locked';

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

   const shouldShowLessonProgress = (lesson: CourseModuleLesson) => {
      if (typeof lesson.showProgressIndicator === 'boolean') {
         return lesson.showProgressIndicator;
      }

      const normalizedContentType = (lesson.contentType ?? '').toLowerCase();
      return !['assessment', 'task'].includes(normalizedContentType);
   };

   const canLessonBeCurrent = (
      module: CourseModulesAccordionItem,
      moduleIndex: number,
      lessonIndex: number
   ) => {
      const lesson = module.lessons[lessonIndex];
      if (!lesson) return false;
      if (!shouldShowLessonProgress(lesson)) return false;
      if (isLessonCompleted(lesson)) return false;
      if (isLessonLocked(lesson, module, moduleIndex)) return false;

      const hasUncompletedTrackedLessonBefore = module.lessons
         .slice(0, lessonIndex)
         .filter(shouldShowLessonProgress)
         .some((previousLesson) => !isLessonCompleted(previousLesson));

      return !hasUncompletedTrackedLessonBefore;
   };

   React.useEffect(() => {
      if (!isLearningMode || items.length === 0) return;

      const currentModule =
         items.find((item) => getModuleStage(item) === 'in-progress') ??
         items.find((item) => item.isSelected) ??
         items[0];
      setOpenLearningModule(currentModule.value);

      const activeItem = items
         .flatMap((item, moduleIndex) =>
            item.lessons.map((lesson, lessonIndex) => ({
               item,
               lesson,
               lessonIndex,
               moduleIndex,
            }))
         )
         .find(({ lesson, item, moduleIndex, lessonIndex }) => {
            if (!lesson.isActive) return false;
            return canLessonBeCurrent(item, moduleIndex, lessonIndex);
         });

      if (
         activeItem &&
         !isLessonLocked(activeItem.lesson, activeItem.item, activeItem.moduleIndex)
      ) {
         setActiveLesson({
            moduleValue: activeItem.item.value,
            lessonIndex: activeItem.lessonIndex,
         });
         return;
      }

      const firstPlayable = items
         .flatMap((item, moduleIndex) =>
            item.lessons.map((lesson, lessonIndex) => ({
               item,
               lesson,
               lessonIndex,
               moduleIndex,
            }))
         )
         .find(({ lesson, item, moduleIndex, lessonIndex }) =>
            !isLessonLocked(lesson, item, moduleIndex) &&
            canLessonBeCurrent(item, moduleIndex, lessonIndex)
         );

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
      moduleIndex: number,
      index: number
   ) => {
      const showProgress = shouldShowLessonProgress(lesson);
      const isCompleted = isLessonCompleted(lesson);
      const lessonLocked = isLessonLocked(lesson, item, moduleIndex);
      const canBeCurrentLesson = canLessonBeCurrent(item, moduleIndex, index);
      const isCurrentLesson =
         activeLesson?.moduleValue === item.value &&
         activeLesson.lessonIndex === index &&
         canBeCurrentLesson;
      const shouldHighlight = isCurrentLesson;
      const shouldShowCheck = isCompleted;
      const activateLesson = () => {
         if (lessonLocked) return;
         if (!canBeCurrentLesson) return;
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
               !lessonLocked && 'cursor-pointer',
               lessonLocked && 'cursor-not-allowed opacity-70'
            )}
         >
            {showProgress && (
               <span
                  aria-label={`Lesson ${index + 1} progress`}
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center"
               >
                  {shouldShowCheck ? (
                     <CheckCircleIcon size={20} />
                  ) : (
                     <span className="size-5 rounded-full border border-neutral-400" />
                  )}
               </span>
            )}

            <div className="space-y-2">
               <p className={cn(shouldHighlight && 'text-secondary')}>{lesson.title}</p>
               <div className="flex items-center gap-2">
                  <ReactSVG src={lesson.iconSrc ?? '/icons/video-square.svg'} />
                  <span>{lesson.contentType ?? 'Video Lesson'}</span>
               </div>
            </div>
         </div>
      );
   };

   const renderFallbackItem = (
      item: CourseModulesAccordionItem,
      moduleIndex: number
   ) => {
      const isLocked = isModuleLocked(item, moduleIndex);

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
            {items.map((item, moduleIndex) => renderFallbackItem(item, moduleIndex))}
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
            {items.map((item, moduleIndex) => {
               const isLocked = isModuleLocked(item, moduleIndex);

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
                              renderLessonRow(lesson, item, moduleIndex, index)
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
