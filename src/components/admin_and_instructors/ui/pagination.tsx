import React from 'react'
import { LeftArrow, RightArrow } from '../icons/modified'

const Pagination = () => {
  return (
    <div className=' flex item-baseline gap-[26px] mt-[36px]'>
        <button className=' text-primary size-5 flex justify-center items-center text'> <LeftArrow/></button>
    <div className=' flex *:w-10'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>...</button>
        <button>19</button>
        <button>20</button>
        <button>21</button>
        <button>22</button>
    </div>
      <button className=' text-primary size-5 flex justify-center items-center text'> <RightArrow/></button>
    </div>
  )
}

export default Pagination