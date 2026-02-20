"use client";

import { type PresignedUrlData, useCreateCourse, useGetPresignedUrl } from "@/api/course";
import { useState } from "react";
import { type SubmitHandler, type UseFormClearErrors, type UseFormReset, type UseFormSetError } from "react-hook-form";
import { useCourseCreationStore } from "../stores/course-creation-store";

export type AddModuleFormValues = {
  title: string;
  duration: number;
  price: number;
  instructor: string;
  overview: string;
  thumbnail: FileList;
};

type UseAddCourseSubmitParams = {
  reset: UseFormReset<AddModuleFormValues>;
  setError: UseFormSetError<AddModuleFormValues>;
  clearErrors: UseFormClearErrors<AddModuleFormValues>;
};

const uploadPosterToAWS = async (file: File, presignedData: PresignedUrlData) => {
  if (!presignedData.upload_url) {
    throw new Error("Presigned url was not returned by the server.");
  }

  // Some backends return a POST policy (url + fields), others return a direct PUT url.
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
      throw new Error("Failed to upload poster image to storage.");
    }
  } else {
    const uploadResponse = await fetch(presignedData.upload_url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload poster image to storage.");
    }
  }

  if (presignedData.key) {
    const normalizedBaseUrl = presignedData.upload_url.split("?")[0];
    if (normalizedBaseUrl.includes(presignedData.key)) {
      return normalizedBaseUrl;
    }
    return `${normalizedBaseUrl.replace(/\/$/, "")}/${presignedData.key}`;
  }

  return presignedData.upload_url.split("?")[0];
};

export const useAddCourseSubmit = ({ reset, setError, clearErrors }: UseAddCourseSubmitParams) => {
  const createdCourseId = useCourseCreationStore((state) => state.courseId);
  const setCourseId = useCourseCreationStore((state) => state.setCourseId);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync: createCourse, isPending: isCreatingCourse } = useCreateCourse();
  const { mutateAsync: getPresignedUrl, isPending: isGettingPresignedUrl } = useGetPresignedUrl();
  const isSubmitting = isCreatingCourse || isGettingPresignedUrl;

  const onSubmit: SubmitHandler<AddModuleFormValues> = async (data) => {
    clearErrors("root.serverError");
    setSuccessMessage(null);

    const posterFile = data.thumbnail?.[0];
    if (!posterFile) {
      setError("thumbnail", { type: "required", message: "Cover image is required" });
      return;
    }

    try {


       const presignedResponse = await getPresignedUrl({
        file_type: posterFile.type,
        title: data.title,
      });

      const presignedData = presignedResponse.data;
      if (!presignedData) {
        throw new Error("Presigned response did not include upload data.");
      }

      const posterUploadUrl = await uploadPosterToAWS(
        posterFile,
        presignedData
      );

      const createCourseResponse = await createCourse({
        title: data.title,
        duration: data.duration,
        price: data.price,
        overview: data.overview,
        poster: posterUploadUrl,
      });

      const courseId = createCourseResponse.data?.course_id;
      if (!courseId) {
        throw new Error("Course was created but course id was not returned.");
      }
      setCourseId(courseId);

      reset();
      clearErrors("root");
      setSuccessMessage("Course details and poster uploaded successfully.");
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Unable to create course. Please try again.",
      });
      setSuccessMessage(null);
    }
  };

  return {
    onSubmit,
    isSubmitting,
    createdCourseId,
    successMessage,
  };
};
