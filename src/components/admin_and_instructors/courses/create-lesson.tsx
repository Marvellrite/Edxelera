"use client";

import { AddCircle, Video } from "@/components/admin_and_instructors/icons/modified";
import { Button } from "@/components/ui/button";
import { useAddLessonSubmit, type LessonResourceInput } from "@/hooks/use-add-lesson-submit";
import { useFieldArray, useForm } from "react-hook-form";

type LessonFormValues = {
  title: string;
  video: FileList;
  resources: LessonResourceInput[];
};

interface CreateLessonProps {
  disabled?: boolean;
  onLessonCreated?: (lesson: { id: string; title: string; videoName?: string }) => void;
}

const CreateLesson = ({ disabled = false, onLessonCreated }: CreateLessonProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonFormValues>({
    defaultValues: {
      title: "",
      resources: [{ title: "", url: "", description: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "resources",
  });

  const { onSubmit, isSubmittingLesson, lessonError, lessonSuccess } = useAddLessonSubmit();

  const submitLesson = handleSubmit(async (formValues) => {
    const result = await onSubmit(formValues);
    if (result) {
      onLessonCreated?.({
        id: result.lessonId,
        title: result.title,
        videoName: result.videoName,
      });
      reset({
        title: "",
        resources: [{ title: "", url: "", description: "" }],
      });
    }
  });

  return (
    <div className="space-y-3">
      <p className="mb-2 text-[14px] font-normal text-neutral-700">Create lesson</p>

      <div className="space-y-1">
        <input
          className={`w-full rounded-xl border px-3 py-4 ${errors.title ? "border-red-600" : "border-neutral-500"}`}
          type="text"
          placeholder="Lesson title"
          {...register("title", { required: "Lesson title is required" })}
          disabled={disabled || isSubmittingLesson}
        />
        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <fieldset className={`relative flex h-36 flex-col rounded-lg border px-2 py-1 ${errors.video ? "border-red-600" : "border-neutral-500"}`}>
          <span className="text-neutral-700">Lesson Video</span>
          <div className="grow text-center">
            <div className="mb-3 flex justify-center">
              <Video />
            </div>
            <div className="mb-1 text-[14px] text-neutral-800">Click or drag and drop your video</div>
            <div className="text-[12px] font-normal text-neutral-600">MP4, WEBM (200MB max)</div>
          </div>
          <label className="absolute h-full w-full" htmlFor="lesson-video"></label>
          <input
            id="lesson-video"
            type="file"
            accept="video/mp4,video/webm"
            {...register("video", { required: "Lesson video is required" })}
            disabled={disabled || isSubmittingLesson}
            className="fixed h-0 w-0 pointer-events-none opacity-0 outline-none border-none"
          />
        </fieldset>
        {errors.video && <p className="text-xs text-red-600">{errors.video.message}</p>}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-800">External Resources</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-2 rounded-xl border border-neutral-300 p-3">
            <input
              className="w-full rounded-xl border border-neutral-500 px-3 py-3"
              type="text"
              placeholder="Resource Title"
              {...register(`resources.${index}.title` as const)}
              disabled={disabled || isSubmittingLesson}
            />
            <input
              className="w-full rounded-xl border border-neutral-500 px-3 py-3"
              type="url"
              placeholder="Resource URL"
              {...register(`resources.${index}.url` as const)}
              disabled={disabled || isSubmittingLesson}
            />
            <input
              className="w-full rounded-xl border border-neutral-500 px-3 py-3"
              type="text"
              placeholder="Description"
              {...register(`resources.${index}.description` as const)}
              disabled={disabled || isSubmittingLesson}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "", url: "", description: "" })}
          disabled={disabled || isSubmittingLesson}
          className="flex items-center gap-1 text-sm text-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <AddCircle />
          <span>+ Add Resource</span>
        </button>
      </div>

      {lessonError && <p className="text-sm text-red-600">{lessonError}</p>}
      {lessonSuccess && <p className="text-sm text-green-600">{lessonSuccess}</p>}

      <div className="mt-1 flex w-full justify-end">
        <Button
          type="button"
          onClick={submitLesson}
          disabled={disabled || isSubmittingLesson}
          className="border rounded-full py-2 px-4"
        >
          {isSubmittingLesson ? "Saving lesson..." : "Save lesson"}
        </Button>
      </div>
    </div>
  );
};

export default CreateLesson;
