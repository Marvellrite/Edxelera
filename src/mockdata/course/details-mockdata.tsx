import { CourseModulesAccordionItem } from "@/types/course";

const DEFAULT_MODULE_LESSON = {
   title: 'What is UX design? What is UI design? How do they work?',
   contentType: 'Video Lesson',
   iconSrc: '/icons/video-square.svg',
} as const;

const createLessons = (count: number) =>
   Array.from({ length: count }, () => ({ ...DEFAULT_MODULE_LESSON }));

const COURSE_MODULE_ITEMS: CourseModulesAccordionItem[] = [
   {
      value: 'item-1',
      title: 'WEEK 1 - Introduction & Foundations',
      iconVariant: 'note',
      lessons: createLessons(5),
   },
   {
      value: 'item-2',
      title: 'WEEK 2 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-3',
      title: 'WEEK 3 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-4',
      title: 'WEEK 4 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-5',
      title: 'WEEK 5 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-6',
      title: 'WEEK 6 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-7',
      title: 'WEEK 7 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-8',
      title: 'WEEK 8 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
];


export default COURSE_MODULE_ITEMS