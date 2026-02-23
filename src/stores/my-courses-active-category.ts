import { create } from "zustand";
import { Course_status } from "@/types/my-courses/course-status";

type MyCoursesActiveCategoryState = {
  activeCategory: Course_status;
  setActiveCategory: (category: Course_status) => void;
  resetActiveCategory: () => void;
};

export const useMyCoursesActiveCategoryStore = create<MyCoursesActiveCategoryState>(
  (set) => ({
    activeCategory: Course_status.all,
    setActiveCategory: (category) => set({ activeCategory: category }),
    resetActiveCategory: () => set({ activeCategory: Course_status.all }),
  })
);
