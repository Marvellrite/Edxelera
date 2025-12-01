'use client'

import React from "react"
import { ReactSVG } from "react-svg"

const Comment = ({children, isChild=true}:{children?:React.ReactNode, isChild?:boolean})=>{

    return (
    <div className="">
        <div className={` px-4 ${isChild? "border-l border-l-neutral-400": ""}`}>
            <div className=" flex gap-x-2 mb-3.5">
                {/* TODO Insert the Passport And user name here */}
                <div>
                    <img src="/assets/person_1.png" alt="User's passport" className=" size-[45px] rounded-[500px]"/>
                </div>
                <div className=" ">
                    <div>Utange Kevin</div>
                    <div className=" text-[14px] font-normal text-neutral-700">Instructor</div>
                </div>
            </div>
            <div className=" font-normal">
                Welcome to the Product Design forum. You can discuss all things product design here and ask questions and you will get answers fro either the instructor, your fellow students, or past TBC students of product Design. Kindly be respectful in the chat. Cheers.

            </div>
            <div className="flex justify-between mt-4 p-3">
                <div className=" flex gap-4.5 text-[14px] font-normal text-neutral-700">
                    {/* TODO: To Insert like and reply icons and text here  */}
                    <button className=" flex gap-1.5 p-0 hover:cursor-pointer">
                        {/* Like Icon and text will be here */}
                        <span><ReactSVG src="/icons/like.svg"/></span>
                        <span >Like</span>
                    </button> 
                    <button className=" flex gap-1.5 p-0 hover:cursor-pointer">
                        {/* Like Icon and text will be here */}
                        <span><ReactSVG src="/icons/reply.svg"/></span>
                        <span>Reply</span>
                    </button> 
                </div>
                <div className=" flex gap-x-2 font-normal text-[14px] text-neutral-600">
                    {/* TODO: To Insert number of likes and replies here here  */}
                    <div className=" flex gap-1 ">
                        {/* Number of likes and text will be here */}
                        <span>400</span>
                        <span>Likes</span>
                    </div> 
                    <div className=" flex gap-1">
                        {/* Number of replies and text will be here */}
                        <span>30</span>
                        <span>replies</span>
                    </div> 

                </div>
            </div>
        </div>
        <div className=' mt-5 px-4'>{children}</div>
    </div>)

}

export default Comment