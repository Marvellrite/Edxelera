'use client';

import CourseTabs from '@/components/sections/my-courses/course-tabs';
import { NotFound as CourseNotFound } from '@/components/common';
import { useState } from 'react';

const Page = () => {

   const [noActiveCourse] = useState(true)

   return (

      
         noActiveCourse?
         <CourseNotFound msg={<>You don&apos;t have any active course.<br />Start a course now.</>} ctaText='Explore Courses'/>:
         <CourseTabs/>
      
   );
};

export default Page;
