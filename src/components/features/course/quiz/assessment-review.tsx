"use client";

import { Dispatch, SetStateAction } from "react";
import { ReactSVG } from "react-svg";

import { Rating } from "@/components/common";
import Textarea from "@/components/data/textarea-no-hook";
import { Button } from "@/components/ui/button";

type AssessmentReviewProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const AssessmentReview = ({ onClose }: AssessmentReviewProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-white">
      <div className="flex items-center justify-center w-full h-full ">
        <div className="grow">
          <div className="mx-auto max-w-[480px] rounded-[20px] border border-neutral-400 p-5 min-[870px]:w-[90%] max-[870px]:max-w-none max-[870px]:border-0 max-[870px]:px-0">
            <div className="space-y-6 max-[870px]:mx-auto max-[870px]:w-[70vw] max-[530px]:w-full max-[480px]:px-3">
              <h1 className="mx-auto mb-5.5 flex w-full justify-between text-center text-[40px] text-medium text-black min-[870px]:hidden">
                <button className="p-0" onClick={() => onClose((state) => !state)}>
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340455/repo-images/public/icons/back-arrow.svg" />
                </button>
                <span>Write a Review</span>
                <span></span>
              </h1>
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

export default AssessmentReview;
