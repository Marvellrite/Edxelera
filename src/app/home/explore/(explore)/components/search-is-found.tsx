import CourseList from './course-list'
import Pagination from '@/components/common/pagination'

const SearchIsFound = () => {
  return (
    <div className=' h-full pt-6'>
        <div className=' mb-4 text-neutral-800'>Best Match</div>
       <CourseList/>
       <div className=' w-full'>
            <Pagination/>

       </div>
    </div>
  )
}

export default SearchIsFound