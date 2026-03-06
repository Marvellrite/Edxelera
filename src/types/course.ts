export interface Lesson {
    name: string
}

export type CourseModuleLesson = {
   title: string;
   contentType?: string;
   iconSrc?: string;
   learningStage?: CourseModuleLearningStage;
   showProgressIndicator?: boolean;
   isActive?: boolean;
};

export type CourseModuleLearningStage =
   | 'completed'
   | 'in-progress'
   | 'locked'
   | 'not-started';

export type CourseModulesAccordionItem = {
   value: string;
   title: string;
   iconVariant?: 'note' | 'svg-note';
   lessons: CourseModuleLesson[];
   isSelected?: boolean;
   isLearned?: boolean;
   learningStage?: CourseModuleLearningStage;
};

export type CourseModulesAccordionMode = 'info' | 'learning';

export type CourseModulesAccordionProps = {
   items: CourseModulesAccordionItem[];
   className?: string;
   mode?: CourseModulesAccordionMode;
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
