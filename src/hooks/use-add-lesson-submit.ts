"use client";

import {
  type ExternalResource,
  type PresignedUrlData,
  useCreateLesson,
  useGetLessonPresignedUrl,
} from "@/api/course";
import { useCourseCreationStore } from "@/stores/course-creation-store";
import { useState } from "react";

export type LessonResourceInput = {
  title: string;
  url: string;
  description?: string;
};

export type AddLessonPayload = {
  title: string;
  video: FileList;
  resources: LessonResourceInput[];
};

const uploadVideoToAWS = async (file: File, presignedData: PresignedUrlData) => {
  if (!presignedData.upload_url) {
    throw new Error("Presigned upload url was not returned by the server.");
  }

  if (presignedData.fields && Object.keys(presignedData.fields).length > 0) {
    const formData = new FormData();
    Object.entries(presignedData.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file);

    const uploadResponse = await fetch(presignedData.upload_url, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload lesson video to storage.");
    }

    return presignedData.key;
  }

  const uploadResponse = await fetch(presignedData.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload lesson video to storage.");
  }

  return presignedData.key;
};

const normalizeResources = (resources: LessonResourceInput[]): ExternalResource[] =>
  resources
    .map((resource) => ({
      title: resource.title.trim(),
      url: resource.url.trim(),
      description: resource.description?.trim() || undefined,
    }))
    .filter((resource) => resource.title && resource.url);

export const useAddLessonSubmit = () => {
  const moduleId = useCourseCreationStore((state) => state.moduleId);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [lessonSuccess, setLessonSuccess] = useState<string | null>(null);

  const { mutateAsync: getLessonPresignedUrl, isPending: isGettingPresignedUrl } =
    useGetLessonPresignedUrl();
  const { mutateAsync: createLesson, isPending: isCreatingLesson } = useCreateLesson();

  const onSubmit = async (data: AddLessonPayload) => {
    setLessonError(null);
    setLessonSuccess(null);

    if (!moduleId) {
      setLessonError("Create a module first before adding lessons.");
      return null;
    }

    if (!data.title.trim()) {
      setLessonError("Lesson title is required.");
      return null;
    }

    const lessonVideo = data.video?.[0];
    if (!lessonVideo) {
      setLessonError("Lesson video is required.");
      return null;
    }

    try {
      const presignedResponse = await getLessonPresignedUrl({
        file_type: lessonVideo.type,
        title: data.title.trim(),
      });

      const presignedData = presignedResponse.data;
      if (!presignedData) {
        throw new Error("Presigned response did not include upload data.");
      }

      const videoKey = await uploadVideoToAWS(lessonVideo, presignedData);
      if (!videoKey) {
        throw new Error("Video upload completed but no video key was returned.");
      }

      const createLessonResponse = await createLesson({
        title: data.title.trim(),
        module_id: moduleId,
        video_key: videoKey,
        video_size: lessonVideo.size,
        resources: normalizeResources(data.resources ?? []),
      });

      const lessonId = createLessonResponse.data?.lesson_id;
      if (!lessonId) {
        throw new Error("Lesson was created but lesson id was not returned.");
      }

      setLessonSuccess("Lesson created successfully.");
      return {
        lessonId,
        title: data.title.trim(),
        videoName: lessonVideo.name,
      };
    } catch (error) {
      setLessonError(
        error instanceof Error
          ? error.message
          : "Unable to create lesson. Please try again."
      );
      return null;
    }
  };

  return {
    onSubmit,
    isSubmittingLesson: isGettingPresignedUrl || isCreatingLesson,
    lessonError,
    lessonSuccess,
  };
};
