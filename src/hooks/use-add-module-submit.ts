"use client";

import { useCreateModule } from "@/api/course";
import { useCourseCreationStore } from "@/stores";
import { useState } from "react";

export type AddModulePayload = {
  title: string;
};

export const useAddModuleSubmit = () => {
  const courseId = useCourseCreationStore((state) => state.courseId);
  const moduleId = useCourseCreationStore((state) => state.moduleId);
  const setModuleId = useCourseCreationStore((state) => state.setModuleId);
  const [moduleError, setModuleError] = useState<string | null>(null);
  const [moduleSuccess, setModuleSuccess] = useState<string | null>(null);

  const { mutateAsync: createModule, isPending: isCreatingModule } = useCreateModule();

  const onSubmit = async (data: AddModulePayload) => {
    setModuleError(null);
    setModuleSuccess(null);

    if (!courseId) {
      setModuleError("Create course details first to get a course reference.");
      return null;
    }

    if (!data.title.trim()) {
      setModuleError("Module title is required.");
      return null;
    }

    if (moduleId) {
      setModuleError("This module has already been created.");
      return moduleId;
    }

    try {
      const response = await createModule({
        course_id: courseId,
        title: data.title.trim(),
      });

      const createdModuleId = response.data?.module_id;
      if (!createdModuleId) {
        throw new Error("Module was created but module id was not returned.");
      }

      setModuleId(createdModuleId);
      setModuleSuccess("Module created successfully.");
      return createdModuleId;
    } catch (error) {
      setModuleError(
        error instanceof Error
          ? error.message
          : "Unable to create module. Please try again."
      );
      return null;
    }
  };

  return {
    onSubmit,
    isCreatingModule,
    moduleId,
    moduleError,
    moduleSuccess,
  };
};
