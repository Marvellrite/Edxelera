import My_course from "@/app/home/components/my-courses/my_course";
import { useMyCoursesActiveCategoryStore } from "@/stores";
import all_courses_mock_data  from "@/mock/my-courses/all_courses";
import completed_courses_mock_data  from "@/mock/my-courses/completed_course_mock_data";
import ongoing_courses_mock_data  from "@/mock/my-courses/ongoing_courses_mock_data";


const CourseTabs = () => {
   const activeTab = useMyCoursesActiveCategoryStore((state) => state.activeCategory);

   return (
      <section className="">
        

         {/* All Courses Tab */}
         {activeTab === 'All' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
               {all_courses_mock_data.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}

         {/* Completed Course Tab */}
         {activeTab === 'Completed' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
               {completed_courses_mock_data.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}

         {/* Ongoing Courses Tab*/}
         {activeTab === 'Ongoing' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
               {ongoing_courses_mock_data.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}
      </section>
   );
};

export default CourseTabs
