'use client'

import { useState } from 'react';
import CourseList from './components/course-list';
import IsSearching from './components/is-searching';
import CourseNotFound from './components/search-not-found';

const Page: React.FC = () => {
   const [ isSearching, setIssearching ] = useState(false)
   const [ isNotFound, setIsNotFound ] = useState(true)

   return(
      <>
      { isSearching?
         <IsSearching/>:
         isNotFound?
         <CourseNotFound/>:
         <CourseList/>

      }
      
      </>
   )
};

export default Page;
