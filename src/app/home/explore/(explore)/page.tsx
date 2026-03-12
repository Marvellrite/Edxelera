'use client'

import { useState } from 'react';
import CourseList from './components/course-list';
import IsSearching from './components/is-searching';
import CourseNotFound from './components/search-not-found';
import SearchIsFound from './components/search-is-found';
import { Pagination } from '@/components/common';


const Page: React.FC = () => {
   const [ isSearching ] = useState(false)
   const [ isNotFound] = useState(false)
   const [ isFound ] = useState(false)

   return(
      <div>
      { isSearching?
         <IsSearching/>:
         isFound?
         <SearchIsFound/>:
         isNotFound?
         <CourseNotFound/>:
         <div>
            <CourseList/>
            <Pagination/>

         </div>
      }
      
      </div>
   )
};

export default Page;
