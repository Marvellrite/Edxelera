'use client'


import { Rating } from "@/components/common";
import Textarea from "@/components/data/textarea-no-hook";
import { Button } from "@/components/ui/button";
import { useHeaderTitleStore } from "@/stores";
import {useEffect} from 'react'


const CourseReview = () => {

  const setHeaderTitle = useHeaderTitleStore(state=>state.setHeaderTitle)

  
  useEffect(()=> {
    setHeaderTitle('Write a Review')
    
  }, [setHeaderTitle])


  return (
    <div className=" top-0 left-0 w-full h-full bg-white">
      <div className="flex items-center justify-center w-full h-full ">
        <div className="grow">
          <div className="mx-auto max-w-[480px] rounded-[20px] border border-neutral-400 p-5 min-[870px]:w-[90%] max-[870px]:max-w-none max-[870px]:border-0 max-[870px]:px-0">
            <div className="space-y-6 max-[870px]:mx-auto max-[870px]:w-[70vw] max-[530px]:w-full max-[480px]:px-3">
              
              <p className="text-md font-normal text-left">Kindly write a review and rate the course</p>

              <div className="max-w-[500px] max-[870px]:mx-auto max-[870px]:w-full">
                <Rating gap={12} size={58} value={0} />
              </div>
              <Textarea minHeight={"88px"} className="" placeholder="Review" name="review" id="review" />

              <Button className="h-[50px] w-full rounded-[500px] text-medium text-white" type="submit">
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
