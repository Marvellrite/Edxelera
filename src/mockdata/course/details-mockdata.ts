import { type CourseModuleLesson, type CourseModulesAccordionItem } from '@/types/course';

const INFO_LESSON_TITLE = 'What is UX design? What is UI design? How do they work?';

const createInfoLessons = (count: number): CourseModuleLesson[] =>
   Array.from({ length: count }, () => ({
      title: INFO_LESSON_TITLE,
      contentType: 'Video Lesson',
      iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
   }));

const createLearningLessons = (moduleIndex: number): CourseModuleLesson[] => {
   if (moduleIndex === 0) {
      return [
         {
            title: INFO_LESSON_TITLE,
            contentType: 'Video Lesson',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
            learningStage: 'completed',
         },
         {
            title: INFO_LESSON_TITLE,
            contentType: 'Video Lesson',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
            learningStage: 'completed',
         },
         {
            title: INFO_LESSON_TITLE,
            contentType: 'Video Lesson',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
            learningStage: 'in-progress',
            isActive: true,
         },
         {
            title: INFO_LESSON_TITLE,
            contentType: 'Video Lesson',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
            learningStage: 'not-started',
         },
         {
            title: INFO_LESSON_TITLE,
            contentType: 'Video Lesson',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
            learningStage: 'not-started',
         },
         {
            title: 'Module 1 Test',
            contentType: 'Assessment',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340535/repo-images/public/icons/message-question.svg',
            showProgressIndicator: false,
         },
         {
            title: "Analyze a product's UX",
            contentType: 'Task',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340535/repo-images/public/icons/message-question.svg',
            showProgressIndicator: false,
         },
      ];
   }

   return Array.from({ length: 5 }, (): CourseModuleLesson => ({
      title: INFO_LESSON_TITLE,
      contentType: 'Video Lesson',
      iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg',
      learningStage: 'not-started',
   }));
};

export const COURSE_MODULE_ITEMS_INFO: CourseModulesAccordionItem[] = [
   {
      value: 'item-1',
      title: 'WEEK 1 - Introduction & Foundations',
      iconVariant: 'note',
      lessons: [
         ...createInfoLessons(5),
         {
            title: 'Module 1 Test',
            contentType: 'Assessment',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340535/repo-images/public/icons/message-question.svg',
         },
         {
            title: "Analyze a product's UX",
            contentType: 'Task',
            iconSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340535/repo-images/public/icons/message-question.svg',
         },
      ],
   },
   {
      value: 'item-2',
      title: 'WEEK 2 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createInfoLessons(5),
   },
   {
      value: 'item-3',
      title: 'WEEK 3 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createInfoLessons(5),
   },
   {
      value: 'item-4',
      title: 'WEEK 4 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createInfoLessons(5),
   },
];

export const COURSE_MODULE_ITEMS_LEARNING: CourseModulesAccordionItem[] = [
   {
      value: 'item-1',
      title: 'WEEK 1 - Introduction & Foundations',
      iconVariant: 'note',
      lessons: createLearningLessons(0),
      learningStage: 'in-progress',
      isSelected: true,
   },
   {
      value: 'item-2',
      title: 'WEEK 2 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLearningLessons(1),
      learningStage: 'not-started',
   },
   {
      value: 'item-3',
      title: 'WEEK 3 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLearningLessons(2),
      learningStage: 'not-started',
   },
   {
      value: 'item-4',
      title: 'WEEK 4 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLearningLessons(3),
      learningStage: 'not-started',
   },
   {
      value: 'item-5',
      title: 'WEEK 5 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLearningLessons(4),
      learningStage: 'not-started',
   },
];
