import Course_poster_bought from "./course_poster_bought"
import CourseDetailsSections from "../../../../../../components/features/course/course-details-section"
import CohortStartedModal from "./cohort-started-modal"
import { Button } from "@/components/ui/button"

const CourseBought = () => {

     return (
      <section className="px-8 xl:px-15 py-10 max-md:px-0 max-md:py-0 ">
         <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
         
            <Course_poster_bought />
            <CourseDetailsSections />

            <div className=" flex justify-center mt-10">
            <Button
              
               className="  mt-7 bg-neutral-100 hover:bg-neutral-100 text-neutral font-medium flex items-center justify-center rounded-[500px] px-2.5 py-3 w-[292px] h-[45px] md:hidden"
            >
               <span>Course Starts in <span>36:48:32</span></span>
            </Button>
            </div>
         </div>
         <CohortStartedModal/>
      </section>
  )
}

export default CourseBought
