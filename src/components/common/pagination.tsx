import React from 'react'
import { LeftArrow, RightArrow } from '../admin_and_instructors/icons/modified'
import PaginationBtn from './pagination-btn'

const Pagination = () => {
  return (
    <div className=' flex items-center gap-6.5 mt-9 justify-center'>
        <button className=' text-primary size-5 flex justify-center items-center text'> <LeftArrow/></button>
    <div className=' flex *:w-10'>
        <PaginationBtn>1</PaginationBtn>
        <PaginationBtn>2</PaginationBtn>
        <PaginationBtn isActive>3</PaginationBtn>
        <PaginationBtn>4</PaginationBtn>
        <PaginationBtn>5</PaginationBtn>
        <PaginationBtn>...</PaginationBtn>
        <PaginationBtn>19</PaginationBtn>
        <PaginationBtn>20</PaginationBtn>
        <PaginationBtn>21</PaginationBtn>
        <PaginationBtn>22</PaginationBtn>
    </div>
      <button className=' text-primary size-5 flex justify-center items-center text'> <RightArrow/></button>
    </div>
  )
}

export default Pagination