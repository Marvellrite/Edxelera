import { CourseModuleLesson, CourseModulesAccordionItem } from '@/types/course';

const createLessons = (count: number, moduleIndex: number): CourseModuleLesson[] =>
   Array.from({ length: count }, (_, lessonIndex): CourseModuleLesson => ({
      title: 'What is UX design? What is UI design? How do they work?',
      contentType: 'Video Lesson',
      iconSrc: '/icons/video-square.svg',
      learningStage:
         moduleIndex === 0
            ? lessonIndex === 0
               ? 'in-progress'
               : lessonIndex < 3
                  ? 'completed'
                  : 'not-started'
            : 'not-started',
      isActive: moduleIndex === 0 && lessonIndex === 0,
   }));

const COURSE_MODULE_ITEMS: CourseModulesAccordionItem[] = [
   {
      value: 'item-1',
      title: 'WEEK 1 - Introduction & Foundations',
      iconVariant: 'note',
      lessons: [
         ...createLessons(5, 0),
         {
            title: 'Module 1 Test',
            contentType: 'Assessment',
            iconSrc: '/icons/message-question.svg',
            showProgressIndicator: false,
         },
         {
            title: 'Analyze a product\'s UX',
            contentType: 'Task',
            iconSrc: '/icons/message-question.svg',
            showProgressIndicator: false,
         },
      ],
      isSelected: true,
      isLearned: true,
      learningStage: 'completed',
   },
   {
      value: 'item-2',
      title: 'WEEK 2 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 1),
      learningStage: 'in-progress',
   },
   {
      value: 'item-3',
      title: 'WEEK 3 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 2),
      learningStage: 'locked',
   },
   {
      value: 'item-4',
      title: 'WEEK 4 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 3),
      learningStage: 'not-started',
   },
   {
      value: 'item-5',
      title: 'WEEK 5 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 4),
   },
   {
      value: 'item-6',
      title: 'WEEK 6 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 5),
   },
   {
      value: 'item-7',
      title: 'WEEK 7 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 6),
   },
   {
      value: 'item-8',
      title: 'WEEK 8 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5, 7),
   },
];

export default COURSE_MODULE_ITEMS;
