'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReactSVG } from 'react-svg';
import completed_course_mockdata from './completed_course_mock_data';
import Ongoing_courses_mock_data from './ongoing_courses_mock_data';
import My_course from '../_components/my-courses/my_course';
import All_courses_mock_data from './all_courses';
import { Course_status } from './types';

const Page = () => {
   const [activeTab, setActiveTab] = useState<Course_status>(Course_status.all);
   return (
      <section className="p-5">
         <div className="flex justify-between h-12 items-center">
            <div className=" flex gap-3 items-center">
               {['All', 'Ongoing', 'Completed'].map((_, index) => (
                  <Button
                     className={` border  rounded-[500px] h-full  py-3 px-4 font-normal  ${activeTab === _ ? 'border-primary text-primary' : 'border-neutral-500 text-neutral-600'}`}
                     variant={'outline'}
                     onClick={() => setActiveTab(_ as Course_status)}
                  >
                     {_}
                  </Button>
               ))}
            </div>
            <div className=" basis-[50%] max-w-[463px]">
               {' '}
               <Button
                  className=" md:hidden hover:text-white float-right"
                  variant={'ghost'}
               >
                  <ReactSVG
                     src="/icons/search-outline.svg"
                     width={25}
                     height={25}
                  />
               </Button>
               <div
                  className={`hidden md:flex items-center gap-3 border-2 border-neutral-500  p-2 rounded-full h-[53px]  `}
               >
                  <ReactSVG
                     src="/icons/search-outline.svg"
                     width={25}
                     height={25}
                  />
                  <input
                     type="search"
                     placeholder="Search for courses"
                     className="w-full border-none outline-none"
                  />
               </div>
            </div>
         </div>

         {/* All Courses Tab */}
         {activeTab === 'All' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 mt-9">
               {All_courses_mock_data.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}

         {/* Completed Course Tab */}
         {activeTab === 'Completed' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 mt-9">
               {completed_course_mockdata.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}

         {/* Ongoing Courses Tab*/}
         {activeTab === 'Ongoing' && (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 mt-9">
               {Ongoing_courses_mock_data.map((data, index) => (
                  <My_course key={index} {...data} />
               ))}
            </div>
         )}
      </section>
   );
};

export default Page;
