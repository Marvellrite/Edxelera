"use client"
import { AddCircle, Edit, Trash, VideoSquare } from "@/components/admin_and_instructors/icons/modified"
import { Button } from "@/components/ui/button"
import CreateLesson from "./courses/create-lesson"
import CreateModules from "./courses/create-modules"
import { useState } from "react"
import { useCourseCreationStore } from "@/stores/course-creation-store"
import { useAddModuleSubmit } from "@/hooks/use-add-module-submit"

type ModuleLesson = {
    id: string
    title: string
    videoName?: string
}

type AddLessonProps = {
    previewHref: string
}

const AddLesson = ({ previewHref }: AddLessonProps) => {
    const  [showModuleFields, setShowModuleFields] = useState(false)
    const  [showLessonFields, setShowLessonFields] = useState(false)
    const [moduleTitle, setModuleTitle] = useState("")
    const [lessons, setLessons] = useState<ModuleLesson[]>([])
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
    <div className=' bg-white border border-neutral-50 rounded-2xl p-3 space-y-3 h-fit'>
        <p>Course Module</p>
        {courseId ? (
          <p className="text-xs text-neutral-500">Course reference: {courseId}</p>
        ) : (
          <p className="text-xs text-amber-600">Create course details first to get a course reference.</p>
        )}

        <form className='grid gap-2 px-2'>
             <p className=" text-[14px] font-normal text-neutral-700">Create module</p>

            {showModuleFields && <div className=" space-y-3">
                <input
                  className=" py-4 px-3 w-full border border-neutral-500 rounded-xl"
                  type="text"
                  placeholder="Module  title"
                  value={moduleTitle}
                  onChange={(event) => setModuleTitle(event.target.value)}
                  disabled={isModuleCreated || isCreatingModule}
                />

                <div role="Holds the courses that have been added">
                    {
                    lessons.map((_, i)=> (<div key={i} className=" grid grid-cols-[1fr_70px] grid-rows-2 ">
                        <div >{_.title}</div> <div className="flex gap-3 -mt-6"> <button type="button"><Edit/> </button> <button type="button"><Trash/></button>  </div>
                        <div className=" flex gap-1.5 items-center -mt-4"><VideoSquare/> <span>{_.videoName ?? "Video uploaded"}</span></div>
                    </div>)) 
                    }
                </div>

                {/* The section for creating lessons */}
                {showLessonFields &&
                <CreateLesson
                  disabled={!isModuleCreated}
                  onLessonCreated={(lesson) =>
                    setLessons((current) => [
                      ...current,
                      { id: lesson.id, title: lesson.title, videoName: lesson.videoName },
                    ])
                  }
                />
                }

            <div className=" border rounded-xl border-neutral-500 h-20.25 flex flex-col justify-center items-center py-3.5 cursor-pointer" onClick={()=>setShowLessonFields(true)}>
                <div className=" text-neutral-800 text-center"><AddCircle/></div>
                <div className=" text-center mt-2.5 text-neutral-800 " >Add a lesson</div>
            </div>

            <div className=" border rounded-xl border-neutral-500 h-20.25 flex flex-col justify-center items-center py-3.5 cursor-pointer">
                <div className=" text-neutral-800 text-center"><AddCircle/></div>
                <div className=" text-center mt-2.5 text-neutral-800">Add a test</div>
            </div>
            <div className='flex justify-end w-full mt-3.5'>
                            <Button
                              type="button"
                              onClick={onCreateModule}
                              disabled={!canCreateModule || isCreatingModule}
                              className='border rounded-full py-2 px-4'
                            >
                              {isCreatingModule ? "Creating module..." : "Create a module"}
                            </Button>
                        </div>
            {moduleId && <p className="text-xs text-neutral-500">Module reference: {moduleId}</p>}
            {moduleError && <p className="text-xs text-red-600">{moduleError}</p>}
            {moduleSuccess && <p className="text-xs text-green-600">{moduleSuccess}</p>}
            </div>}
            <CreateModules setShowModuleFields={setShowModuleFields} previewHref={previewHref} />
        </form>
    </div>
  )
}

export default AddLesson
