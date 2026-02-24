export interface Lesson {
    name: string
}

export type CourseModuleLesson = {
   title: string;
   contentType?: string;
   iconSrc?: string;
};

export type CourseModulesAccordionItem = {
   value: string;
   title: string;
   iconVariant?: 'note' | 'svg-note';
   lessons: CourseModuleLesson[];
};

export type CourseModulesAccordionProps = {
   items: CourseModulesAccordionItem[];
};


export type CourseMode = "marketing" | "waiting" | "live" | "completed";

export interface CourseHeroSectionProps {
  mode: CourseMode;
  price: number;
  title: string;
  description: string;

  // optional: for countdown
  cohortStartsAt?: Date | string;
  courseSlug?: string;
}