"use client";

import { create } from "zustand";

type CourseCreationState = {
  courseId: string | null;
  moduleId: string | null;
  setCourseId: (courseId: string | null) => void;
  setModuleId: (moduleId: string | null) => void;
  resetCourseCreation: () => void;
};

export const useCourseCreationStore = create<CourseCreationState>((set) => ({
  courseId: null,
  moduleId: null,
  setCourseId: (courseId) => set({ courseId }),
  setModuleId: (moduleId) => set({ moduleId }),
  resetCourseCreation: () => set({ courseId: null, moduleId: null }),
}));
