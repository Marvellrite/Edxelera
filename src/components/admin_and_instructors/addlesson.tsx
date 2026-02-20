"use client"
import { AddCircle, Edit, Trash, VideoSquare } from "@/components/admin_and_instructors/icons/modified"
import { Button } from "@/components/ui/button"
import CreateLesson from "./courses/create-lesson"
import CreateModules from "./courses/create-modules"
import { useState } from "react"
import { Lesson } from "@/types/courses"
import { useCourseCreationStore } from "@/stores/course-creation-store"



const AddLesson = () => {
    const  [showModuleFields, setShowModuleFields] = useState(false)
    const  [showLessonFields, setShowLessonFields] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const courseId = useCourseCreationStore((state) => state.courseId);

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
                <input className=" py-4 px-3 w-full border border-neutral-500 rounded-xl" type="text" placeholder="Module  title" />

                <div role="Holds the courses that have been added">
                    {
                    lessons.map((_, i)=> (<div key={i} className=" grid grid-cols-[1fr_70px] grid-rows-2 ">
                        <div >{_.name}</div> <div className="flex gap-3 -mt-6"> <button><Edit/> </button> <button><Trash/></button>  </div>
                        <div className=" flex gap-1.5 items-center -mt-4"><VideoSquare/> <span>Video name</span></div>
                    </div>)) 
                    }
                </div>

                {/* The section for creating lessons */}
                {showLessonFields &&
                <CreateLesson />
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
                            <Button className='border rounded-full py-2 px-4'>Add module</Button>
                        </div>
            </div>}
            <CreateModules setShowModuleFields={setShowModuleFields}/>
        </form>
    </div>
  )
}

export default AddLesson
