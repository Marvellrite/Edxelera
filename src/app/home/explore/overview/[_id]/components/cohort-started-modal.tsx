'use client'
import { Button } from "@/components/ui/button";
import { ReactSVG } from "react-svg"
import { useState } from "react";

const CohortStartedModal = () => {

  const [isModalOpen, setIsModalOpen ] = useState(false);

  return (
    <div className={` backdrop-blur-xs fixed bg-transparent w-full h-full top-0 left-0 flex items-center justify-center ${!isModalOpen && "hidden"} md:px-6`}>
      <div className=' max-md:h-full max-md:rounded-none flex items-start bg-primary rounded-3xl p-7 w-full max-w-[829px] md:h-[412px] justify-between max-md:items-stretch max-md:justify-center'>
        <div className=" max-md:hidden"></div>
        <div className="space-y- max-w-[462px] h-full relative  max-md:flex flex-col justify-between ">

          <div className=" md:hidden"></div>

          <div>
            <ReactSVG className=" mx-auto w-20" beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='/icons/confetti-desktop.svg'/>
            <div className=" text-white  max-w-[762px] mx-auto text-center">
              <h1 className=" mt-8 font-medium md:text-[40px] max-md:text-[24px] max-md:font-bold">Your Cohort Has Started!</h1>
              <div className=" mt-8 text-md font-normal max-md:mt-3">Welcome to Module 1. Your classroom is now open — let’s begin your learning journey.</div>
            </div>
          </div>
            
            <Button className=" hover:bg-white text-medium text-primary mx-auto  w-full bg-white rounded-[500px] h-[50px] mx-w-[440px] md:absolute bottom-0 max-md:static" onClick={()=>setIsModalOpen((_)=>!_)}>Start Course</Button>

            
        </div>


        <button className=" p-0 max-md:hidden" onClick={()=>setIsModalOpen((_)=>!_)}>
        <ReactSVG wrapper="span" beforeInjection={(svg)=>{
          const paths =svg.querySelectorAll("path");
          paths.forEach((_)=>{
            _.setAttribute("stroke", "white");
          })
        }} className="text-white" src="/icons/x.svg"/>
          
        </button>

      </div>
    </div>
  )
}

export default CohortStartedModal
