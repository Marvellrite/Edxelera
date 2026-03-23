"use client";

import { useState } from "react";

import { AddCircle, Edit, Trash, VideoSquare } from "@/components/admin_and_instructors/icons/modified";
import { Button } from "@/components/ui/button";
import { useAddModuleSubmit } from "@/hooks/use-add-module-submit";
import { useCourseCreationStore } from "@/stores/course-creation-store";

import CreateLesson from "./courses/create-lesson";
import CreateModules from "./courses/create-modules";

type ModuleLesson = {
  id: string;
  title: string;
  videoName?: string;
};

type AddLessonProps = {
  previewHref: string;
};

const AddLesson = ({ previewHref }: AddLessonProps) => {
  const [showModuleFields, setShowModuleFields] = useState(false);
  const [showLessonFields, setShowLessonFields] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<ModuleLesson[]>([]);
  const courseId = useCourseCreationStore((state) => state.courseId);
  const moduleId = useCourseCreationStore((state) => state.moduleId);
  const { onSubmit, isCreatingModule, moduleError, moduleSuccess } = useAddModuleSubmit();

  const onCreateModule = async () => {
    const createdModuleId = await onSubmit({ title: moduleTitle });
    if (createdModuleId) {
      setShowLessonFields(true);
    }
  };

  const isModuleCreated = Boolean(moduleId);
  const canCreateModule = Boolean(courseId) && moduleTitle.trim().length > 0 && !isModuleCreated;

  return (
    <div className="h-fit space-y-4 rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
      <div className="space-y-1">
        <p className="text-lg font-semibold text-neutral-900">Add modules</p>
        {courseId ? (
          <p className="text-xs text-neutral-500">Course reference: {courseId}</p>
        ) : (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Create course details first to get a course reference.
          </p>
        )}
      </div>

      <form className="grid gap-3">
        <p className="text-sm font-medium text-neutral-700">Create module</p>

        {showModuleFields && (
          <div className="space-y-3 rounded-xl border border-border/70 bg-neutral-50/40 p-3">
            <input
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-neutral-100"
              type="text"
              placeholder="Module title"
              value={moduleTitle}
              onChange={(event) => setModuleTitle(event.target.value)}
              disabled={isModuleCreated || isCreatingModule}
            />

            <div role="Holds the courses that have been added" className="space-y-2">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="rounded-xl border border-border bg-white px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-neutral-800">{lesson.title}</p>
                    <div className="flex items-center gap-2">
                      <button type="button" className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800">
                        <Edit />
                      </button>
                      <button type="button" className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800">
                        <Trash />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                    <VideoSquare />
                    <span>{lesson.videoName ?? "Video uploaded"}</span>
                  </div>
                </div>
              ))}
            </div>

            {showLessonFields && (
              <CreateLesson
                disabled={!isModuleCreated}
                onLessonCreated={(lesson) =>
                  setLessons((current) => [...current, { id: lesson.id, title: lesson.title, videoName: lesson.videoName }])
                }
              />
            )}

            <div
              className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white py-3.5 transition-colors hover:bg-neutral-50"
              onClick={() => setShowLessonFields(true)}
            >
              <div className="text-center text-neutral-700">
                <AddCircle />
              </div>
              <div className="mt-2 text-center text-sm text-neutral-700">Add a lesson</div>
            </div>

            <div className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white py-3.5 transition-colors hover:bg-neutral-50">
              <div className="text-center text-neutral-700">
                <AddCircle />
              </div>
              <div className="mt-2 text-center text-sm text-neutral-700">Add a test</div>
            </div>

            <div className="mt-1 flex w-full justify-end">
              <Button
                type="button"
                onClick={onCreateModule}
                disabled={!canCreateModule || isCreatingModule}
                className="h-10 rounded-full px-4"
              >
                {isCreatingModule ? "Creating module..." : "Create a module"}
              </Button>
            </div>

            {moduleId && <p className="text-xs text-neutral-500">Module reference: {moduleId}</p>}
            {moduleError && <p className="text-xs text-red-600">{moduleError}</p>}
            {moduleSuccess && <p className="text-xs text-green-600">{moduleSuccess}</p>}
          </div>
        )}

        <CreateModules setShowModuleFields={setShowModuleFields} previewHref={previewHref} disabled={!courseId} />
      </form>
    </div>
  );
};

export default AddLesson;
