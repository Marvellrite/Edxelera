"use client";

import { create } from "zustand";

type CourseCreationState = {
  courseId: string | null;
  setCourseId: (courseId: string | null) => void;
  resetCourseCreation: () => void;
};

export const useCourseCreationStore = create<CourseCreationState>((set) => ({
  courseId: null,
  setCourseId: (courseId) => set({ courseId }),
  resetCourseCreation: () => set({ courseId: null }),
}));
