import Course_poster_bought from "./course_poster_bought"
import Course_arrangement from "./course_arrangement"
import { Button } from "@/components/ui/button"

const CourseBought = () => {

     return (
      <section className="px-8 xl:px-15 py-10 max-md:px-0 max-md:py-0 ">
         <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
         
            <Course_poster_bought />
            <Course_arrangement />

            <div className=" flex justify-center mt-10">
               <Button className=" mx-auto py-3 px-2.5 w-[292px] h-[42px] rounded-[500px]">
                  Purchase Course
               </Button>
            </div>
         </div>
      </section>
  )
}

export default CourseBought
